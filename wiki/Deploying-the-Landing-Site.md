# Deploying the Landing Site

The landing site is the always-on surface — it deploys automatically, and that automaticity is the whole design. This page covers what happens on a push to `main`, what the workflow does, and the custom-domain notes if you ever want one.

## The automatic path

Every push to `main` triggers `.github/workflows/deploy-landing.yml`. The workflow does what you'd do by hand, minus the forgetting: install with pnpm, build the landing workspace (`pnpm --filter @dte/landing build`), verify the artifact contract held (`apps/landing/dist/index.html` exists — the workflow fails loudly if it doesn't), and publish `dist/` to the `gh-pages` branch, which GitHub Pages serves. From merge to live is typically a couple of minutes. There is no manual deploy step, no button to press, and deliberately no deploy on pull requests — the landing site reflects `main`, and only `main`.

## The URL

The site serves at **https://dtemoney448.github.io/demon-time-exotics/** — that's the GitHub Pages default for a project site under the `DTEMONEY448` account, and it's why the landing Vite config sets `base: '/demon-time-exotics/'`: every asset path in the built site is prefixed so it resolves correctly under the project subpath. The custom-domain escape hatch is the `public/CNAME` file — if a custom domain is ever registered for the brand, the CNAME file goes in `apps/landing/public/`, the Pages settings are updated to match, and the Vite `base` must be revisited in the same PR (a custom domain serves at the root, so the subpath base becomes wrong). Until then, no CNAME, no ceremony.

## What can break it

Three failure modes cover almost everything. The build fails — the workflow logs name the workspace and the TypeScript error; fix on `main` and push, the next run deploys the fix. The artifact contract fails — `dist/index.html` didn't appear where the workflow expects, which means the Vite config changed output paths and the workflow wasn't updated in the same PR; restore the contract or update `deploy-landing.yml` deliberately. Pages itself stutters — GitHub Pages has occasional propagation delays; the workflow being green with the site serving stale content for a minute or two is Pages, not the pipeline. In all three cases the Actions tab is the source of truth, and [Troubleshooting](Troubleshooting.md) collects the local-repro versions of the same problems.
