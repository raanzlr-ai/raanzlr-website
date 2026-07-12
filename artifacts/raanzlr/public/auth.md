# Auth.md

Agent access policy for Raanzlr (https://raanzlr.com) — a public marketing
and content website for an AI automation and software engineering agency.

## Registration

**No agent registration is required.** There is no sign-up flow, credential
issuance, or identity claim process on this domain.

## Authentication

**No registration or authentication is required.** All published content —
pages, the blog, sitemaps, `llms.txt`, and the agent-skills index — is public
and read-only.

There are currently **no agent-accessible protected APIs** on this domain.
The OAuth metadata published under `/.well-known/oauth-protected-resource`
and `/.well-known/oauth-authorization-server` is reserved for future use;
no token issuance is available today.

## agent_auth

The `agent_auth` metadata below mirrors the block published under
`/.well-known/oauth-authorization-server`. **No registration or authentication
is required** — there are no identity types, credentials, claim flows, or
token revocation on this domain. All content is public and read-only.

```json
{
  "agent_auth": {
    "skill": "https://isitagentready.com/.well-known/agent-skills/auth-md/SKILL.md",
    "register_uri": "https://raanzlr.com/auth.md",
    "registration": "open",
    "identity_types": ["none"],
    "credential_types": ["none"],
    "claim_uri": null,
    "revocation_uri": null,
    "notes": "No authentication required; all content is public and read-only. No registration, identity claim, credential issuance, or token revocation is available on this domain."
  }
}
```

## What agents can do here

- Read structured site information: `/llms.txt`
- Discover skills: `/.well-known/agent-skills/index.json`
- Discover the API catalog: `/.well-known/api-catalog`
- Crawl content via `/sitemap.xml` (`/sitemap-en.xml`, `/sitemap-ar.xml`)

## Contact

For API partnerships, integrations, or agent-related requests, email
**info@raanzlr.com**. A human replies within one business day.
