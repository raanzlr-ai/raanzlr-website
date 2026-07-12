# Agent Access — Raanzlr

Raanzlr (https://raanzlr.com) is a public marketing and content website for an
AI automation and software engineering agency.

## Authentication

**No registration or authentication is required.** All published content —
pages, the blog, sitemaps, `llms.txt`, and the agent-skills index — is public
and read-only.

There are currently **no agent-accessible protected APIs** on this domain.
The OAuth metadata published under `/.well-known/oauth-protected-resource`
and `/.well-known/oauth-authorization-server` is reserved for future use;
no token issuance is available today.

## What agents can do here

- Read structured site information: `/llms.txt`
- Discover skills: `/.well-known/agent-skills/index.json`
- Discover the API catalog: `/.well-known/api-catalog`
- Crawl content via `/sitemap.xml` (`/sitemap-en.xml`, `/sitemap-ar.xml`)

## Contact

For API partnerships, integrations, or agent-related requests, email
**info@raanzlr.com**. A human replies within one business day.
