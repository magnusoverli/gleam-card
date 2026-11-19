# Publish Gleam Cards

Submit **one Dashboard package** (`plugin` in the catalog). The root `hacs.json`
names `gleam-card.js`. The stable Energy Graph and experimental Thermostat and Cover cards use
the same bundle and release; there is no integration manifest or hassfest job.

1. **Prepare the candidate.** Set the package and lockfile version together with
   `npm version patch --no-git-tag-version` (or specify the desired version).
   Run `npm ci`, `npm test`, and `npm run test:browser`
   (install Playwright Chromium first on a fresh machine). The browser suite builds
   the production module. Commit the resulting `dist/gleam-card.js` with its source:
   this gives the validator an installable file even before the first release.
   The local development loader and hash manifest are not Marketplace assets.
2. **Prepare GitHub.** Make a deliberate visibility change to public when ready.
   Keep issues enabled, the repository unarchived, a meaningful description and
   topics, screenshots in the README, and the root Marketplace metadata.
3. **Validate the published candidate commit.** Push the candidate and check
   [Marketplace validation runs](https://github.com/magnusoverli/gleam-card/actions/workflows/marketplace.yml).
   Require a green run without skipped checks; save the run permalink.
4. **Release that validated commit.** Run **Actions → Publish release → Run workflow**
   on `main`. It checks the package version against the lockfile, requires a passing
   Marketplace validation for the same commit, then creates a regular `vX.Y.Z`
   release with the exact committed `gleam-card.js` attached. Test the README installation link on a clean dashboard and
    verify that all three picker entries appear after a reload.
5. **Request catalog inclusion.** As owner or major contributor, fork
   [`hacs/default`](https://github.com/hacs/default) under your personal account.
   Branch from `master`, insert `magnusoverli/gleam-card` alphabetically in the
   `plugin` JSON list, and complete the upstream PR template with the full release
   and successful validation run links. Allow maintainer edits; do not request
   reviewers. Acceptance is a maintainer decision and can take months. The public
   custom repository link works during review.

References: [catalog requirements](https://contributors.home-assistant.io/marketplace/guides/catalog/),
[dashboard packaging](https://contributors.home-assistant.io/marketplace/guides/dashboard/),
[validation checks](https://contributors.home-assistant.io/marketplace/reference/validation/),
and the [live submission checklist](https://github.com/hacs/default/blob/master/.github/PULL_REQUEST_TEMPLATE.md).
