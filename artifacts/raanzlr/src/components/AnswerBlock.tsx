import React from "react";
import { cn } from "../lib/utils";

interface AnswerBlockProps {
  /** The question, verbatim — rendered as the heading. */
  question: string;
  /**
   * A self-contained answer of roughly 40–80 words that still reads correctly
   * when quoted with no surrounding context. Rendered directly under the
   * heading, before any elaboration.
   */
  answer: string;
  /** Optional elaboration rendered below the answer paragraph. */
  children?: React.ReactNode;
  /** Heading level. Default `h2`; use `h3` when nested inside an `h2` section. */
  as?: "h2" | "h3";
  /** Anchor id for the heading, so the answer is directly linkable. */
  id?: string;
  className?: string;
}

/**
 * Answer-first content block for answer-engine optimisation and featured
 * snippets.
 *
 * Renders a real heading followed by a standalone answer paragraph — no
 * accordion, no tabs, nothing behind interaction — so the text is present in
 * the server-rendered DOM where answer engines and Google's snippet extraction
 * can read it. Longer context goes in `children`.
 *
 * Not wired into any page yet; placement lands with the Phase 1 content work.
 */
export default function AnswerBlock({
  question,
  answer,
  children,
  as: Heading = "h2",
  id,
  className,
}: AnswerBlockProps) {
  return (
    <div className={cn(className)}>
      <Heading
        id={id}
        className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-chrome scroll-mt-28"
      >
        {question}
      </Heading>
      <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-foreground/75">
        {answer}
      </p>
      {children ? (
        <div className="mt-4 max-w-3xl space-y-4 leading-relaxed text-foreground/70">
          {children}
        </div>
      ) : null}
    </div>
  );
}
