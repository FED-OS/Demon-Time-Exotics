#!/usr/bin/env python3
"""Build a fully self-contained standalone preview of the DTE landing site.

Inlines styles.css, the compiled interaction script, the official logo,
the favicon and the hero background as base64 data URIs so the preview
ships as one HTML file with zero external requests (except Google Fonts).
"""
import base64

from pathlib import Path

ROOT = Path(__file__).parent
OUT = ROOT / "preview" / "index.html"


def b64(path: Path, mime: str) -> str:
    data = base64.b64encode(path.read_bytes()).decode()
    return f"data:{mime};base64,{data}"


def main() -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")

    css = (ROOT / "src/styles/styles.css").read_text(encoding="utf-8")

    # Rewrite asset urls in CSS to embedded data URIs
    hero_uri = b64(Path("/tmp/hero-preview.jpg"), "image/jpeg")
    css = css.replace('url("../assets/hero-bg.png")', f'url("{hero_uri}")')

    js = Path("/tmp/preview_script.js").read_text(encoding="utf-8")

    logo_uri = b64(ROOT / "public/images/logo.png", "image/png")
    icon32_uri = b64(ROOT / "public/icons/logo-32.png", "image/png")
    icon16_uri = b64(ROOT / "public/icons/logo-16.png", "image/png")
    favicon_uri = b64(ROOT / "public/favicon.ico", "image/x-icon")

    # <link rel="stylesheet" href="src/styles/styles.css"> → <style>…</style>
    html = html.replace(
        '<link rel="stylesheet" href="src/styles/styles.css" />',
        f"<style>\n{css}\n</style>",
    )

    # favicon + icon links
    html = html.replace(
        '<link rel="icon" type="image/x-icon" href="favicon.ico" />',
        f'<link rel="icon" type="image/x-icon" href="{favicon_uri}" />',
    )
    html = html.replace(
        '<link rel="icon" type="image/png" sizes="32x32" href="icons/logo-32.png" />',
        f'<link rel="icon" type="image/png" sizes="32x32" href="{icon32_uri}" />',
    )
    html = html.replace(
        '<link rel="icon" type="image/png" sizes="16x16" href="icons/logo-16.png" />',
        f'<link rel="icon" type="image/png" sizes="16x16" href="{icon16_uri}" />',
    )
    html = html.replace(
        '<link rel="apple-touch-icon" sizes="180x180" href="icons/logo-128.png" />',
        f'<link rel="apple-touch-icon" sizes="180x180" href="{icon32_uri}" />',
    )

    # brand logo in navbar
    html = html.replace('src="images/logo.png"', f'src="{logo_uri}"')

    # script tag → inline
    html = html.replace(
        '<script src="src/script.js" type="module"></script>',
        f"<script>\n{js}\n</script>",
    )

    # og:image / twitter:image stay as relative paths on Pages; for the
    # standalone preview they are stripped to keep it self-contained.
    html = html.replace(
        '<meta property="og:image" content="images/social-preview.png" />',
        '<!-- og:image omitted in standalone preview -->',
    )
    html = html.replace(
        '<meta name="twitter:image" content="images/social-preview.png" />',
        '<!-- twitter:image omitted in standalone preview -->',
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    html = html.replace(
        "</head>",
        "<!-- Standalone preview built from apps/landing — see repo for the source of truth -->\n</head>",
    )
    OUT.write_text(html, encoding="utf-8")
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
