/**
 * Date normalisation for structured data and meta tags.
 *
 * Content dates arrive in two shapes. Supabase `published_at` / `updated_at`
 * are full timestamptz values ("2026-08-22T00:00:00+00:00"); the static seed in
 * src/data/posts.ts and src/data/cases.ts stores date-only strings
 * ("2025-03-15").
 *
 * Both used to be handled by appending "T00:00:00Z", which produced a valid
 * string for the date-only case and the invalid
 * "2026-08-22T00:00:00+00:00T00:00:00Z" for the timestamptz case — shipped on
 * 46 pages as `datePublished`. Everything that emits a date now goes through
 * `toIsoDateTime` so the two paths cannot diverge again.
 */

/**
 * Normalise any supported date input to a full ISO 8601 UTC datetime.
 *
 * Returns `undefined` for empty, malformed, or unparseable input so callers can
 * omit the property rather than emit a broken one — an absent `dateModified` is
 * valid structured data, an invalid one is not.
 */
export function toIsoDateTime(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;

  const raw = value.trim();
  if (!raw) return undefined;

  // A date-only value has no timezone, so it would otherwise be read as local
  // midnight and can shift a day either way. Pin it to UTC explicitly.
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(raw) ? `${raw}T00:00:00Z` : raw;

  const parsed = new Date(dateOnly);
  if (Number.isNaN(parsed.getTime())) return undefined;

  return parsed.toISOString();
}

/**
 * The `dateModified` to publish, or `undefined` when there is no evidence the
 * content changed after publication.
 *
 * Google reads `dateModified` as a freshness claim, so it is only emitted when
 * a real modification timestamp exists and is genuinely later than publication.
 * Echoing `datePublished` back as `dateModified` — the previous behaviour —
 * asserts an update that never happened.
 */
export function toIsoDateModified(
  updatedAt: unknown,
  publishedAt: unknown,
): string | undefined {
  const updated = toIsoDateTime(updatedAt);
  if (!updated) return undefined;

  const published = toIsoDateTime(publishedAt);
  if (!published) return updated;

  return new Date(updated).getTime() > new Date(published).getTime() ? updated : undefined;
}
