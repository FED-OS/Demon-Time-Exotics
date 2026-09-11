Templates for the DTE component generator live inline in `index.js`
as the `templateWeb` and `templateRN` functions. Keeping them as code
lets the generator interpolate the component name, kebab-case class
names and import specifiers directly, and keeps the whole generator a
single dependency-free file.

If a future surface needs a heavier template (for example a Tauri
command pair or an Electron IPC handler), split it into this directory
as `templates/<surface>.tpl` and load it with `fs.readFile` — the
surface map at the top of `index.js` is the only thing that changes.
