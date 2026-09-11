Templates for the DTE app generator live inline in `index.js` as the
`tpl*` functions (tplPackageJson, tplTsconfig, tplViteConfig,
tplIndexHtml, tplStyles, tplMain, tplLib, tplBarrel). Keeping them as
code instead of loose files lets the generator interpolate the app
name, kebab-case slug and ports directly into each template without a
second templating dependency.

If a future template grows too large to read inline, split it into
this directory as `templates/<name>.tpl` and load it with
`fs.readFile` — the generator's `FILES()` plan array is the only place
that needs to change.
