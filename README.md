# Nightshift Studio Website

Statische Website von SD Nightshift Studio auf Deutsch und Englisch. Dieses
Verzeichnis enthält die veröffentlichbaren Website-Dateien; `CNAME` legt die
bevorzugte Domain `www.sdnightshiftstudio.com` fest.

Die App-Seiten liegen unter `apps/`, die Rechtstexte der Website unter `legal/`.
Seitentitel, Beschreibungen, Sprachversionen und strukturierte Daten stehen
direkt in den jeweiligen HTML-Dateien.

## Lokale Vorschau

Aus diesem Verzeichnis starten:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Danach `http://127.0.0.1:8765/` im Browser öffnen.

## SEO pflegen

Nach neuen Seiten oder geänderten Canonical-URLs die Sitemap aktualisieren:

```sh
python3 scripts/generate_sitemap.py
```

Die [SEO-Dokumentation](docs/seo.md) beschreibt die vorhandenen Angaben,
Crawler-Regeln und die Schritte in Search Console und Bing Webmaster Tools
nach der Veröffentlichung.
