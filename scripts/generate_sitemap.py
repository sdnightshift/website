#!/usr/bin/env python3
"""Build the sitemap from the canonical URLs in the static HTML pages."""

from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
SITE = "https://www.sdnightshiftstudio.com"
NAMESPACE = "http://www.sitemaps.org/schemas/sitemap/0.9"


class PageMetadata(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonicals = []
        self.noindex = False

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == "link" and "canonical" in attributes.get("rel", "").split():
            self.canonicals.append(attributes.get("href", ""))
        if tag == "meta" and attributes.get("name", "").lower() == "robots":
            directives = attributes.get("content", "").lower()
            self.noindex |= "noindex" in re.split(r"[\s,]+", directives)


def collect_urls():
    urls = set()
    for path in sorted(ROOT.rglob("*.html")):
        relative = path.relative_to(ROOT)
        if any(part.startswith(".") or part == "node_modules" for part in relative.parts):
            continue
        if re.fullmatch(r"google[0-9a-f]+\.html", path.name):
            continue
        metadata = PageMetadata()
        metadata.feed(path.read_text(encoding="utf-8"))
        if metadata.noindex:
            continue
        if len(metadata.canonicals) != 1:
            raise ValueError(f"{relative}: exactly one canonical URL is required")
        canonical = metadata.canonicals[0]
        parsed = urlsplit(canonical)
        if (
            parsed.scheme != "https"
            or parsed.netloc != "www.sdnightshiftstudio.com"
            or parsed.query
            or parsed.fragment
        ):
            raise ValueError(f"{relative}: invalid canonical URL {canonical!r}")
        urls.add(canonical)
    return sorted(urls, key=lambda url: (url != SITE + "/", url))


def main():
    urls = collect_urls()
    if not urls:
        raise ValueError("No indexable pages found; the existing sitemap was not changed")
    ET.register_namespace("", NAMESPACE)
    sitemap = ET.Element(f"{{{NAMESPACE}}}urlset")
    for url in urls:
        entry = ET.SubElement(sitemap, f"{{{NAMESPACE}}}url")
        ET.SubElement(entry, f"{{{NAMESPACE}}}loc").text = url
    ET.indent(sitemap, space="  ")
    output = ET.tostring(sitemap, encoding="utf-8", xml_declaration=True) + b"\n"
    (ROOT / "sitemap.xml").write_bytes(output)
    print(f"sitemap.xml updated: {len(urls)} canonical URLs")


if __name__ == "__main__":
    main()
