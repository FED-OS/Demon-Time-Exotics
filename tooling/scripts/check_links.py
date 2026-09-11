#!/usr/bin/env python3
"""Relative-link checker for the DTE monorepo markdown docs.

Scans every tracked markdown file for relative (non-http) links and image
references, then verifies each target exists on disk. GitHub conventions
are respected: wiki pages are linked extensionless, and site-relative URLs
like ../../issues resolve against github.com. Exits non-zero on misses.
"""

import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LINK_RE = re.compile(r"\[[^\]]*\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
# GitHub-site-relative URLs: ../../issues, ../../discussions, /login, /, ../
SITE_RELATIVE_RE = re.compile(r"^(?:\.\./+)+[a-zA-Z0-9_-]+/?$|^/+[a-zA-Z0-9_./-]*/?$")

SKIP_DIRS = {
    "node_modules", ".turbo", "dist", "target", ".git",
    ".browser_data", ".psiphon_data", ".agent_hooks",
    "outputs", "summarized_conversations", ".expo", ".tauri",
    "preview",
}

md_files = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames
                   if d not in SKIP_DIRS and not d.startswith("dist")]
    for name in filenames:
        if name.endswith(".md") or name.endswith(".markdown"):
            md_files.append(Path(dirpath) / name)

broken = []
checked = 0
for md in sorted(md_files):
    text = md.read_text(encoding="utf-8", errors="replace")
    for match in LINK_RE.finditer(text):
        href = match.group(1).strip()
        if href.startswith(("http://", "https://", "mailto:", "data:")):
            continue
        checked += 1
        target = href.split("#", 1)[0]
        if not target:
            continue  # pure in-page anchor
        # GitHub-site-relative URLs resolve against github.com, not the
        # local checkout (e.g. ../../issues, ../../discussions, /login).
        if SITE_RELATIVE_RE.match(target):
            continue
        # GitHub wiki pages are linked extensionless (Home, Getting-Started).
        candidates = [md.parent / target]
        if md.parent.name == "wiki" and not target.startswith((".", "/", "http")):
            candidates.append(md.parent / (target + ".md"))
        if not any(c.resolve().exists() for c in candidates):
            broken.append(f"{md.relative_to(ROOT)} -> {href}")

print(f"Scanned {len(md_files)} markdown files, checked {checked} relative links.")
if broken:
    print(f"\n{len(broken)} BROKEN LINKS:")
    for b in broken:
        print(f"  {b}")
    sys.exit(1)
print("All relative links resolve. OK.")
