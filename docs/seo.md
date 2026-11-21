# SEO und Auffindbarkeit in AI-Suchdiensten

Die Website bündelt alle Apps unter `https://www.sdnightshiftstudio.com`.
Jede App hat eine eigene deutsche und englische Produktseite sowie eigene
Datenschutz- und Nutzungsbedingungen. Die vorhandenen HTML-Adressen bleiben
erreichbar. Als bevorzugte Adresse der deutschen Startseite ist `/` angegeben.

## Eingebaute Angaben pro Seite

Die Angaben stehen direkt im HTML und benötigen kein JavaScript:

- Individueller Seitentitel und eine zum Inhalt passende Meta-Beschreibung.
- Eine selbstreferenzierende Canonical-URL auf dem bevorzugten `www`-Host.
- Gegenseitige `hreflang`-Links für Deutsch und Englisch. `x-default` verweist
  auf die deutsche Fassung. Jede Übersetzung hat ihre eigene Canonical-URL.
- Open-Graph- und Twitter-Metadaten mit absoluten Bildadressen und den
  tatsächlichen Abmessungen der Logos.
- Strukturierte Daten für Website, Herausgeber, Seiten und Apps; auf den
  App-Seiten auch ein Navigationspfad.

Die App-Seiten und die Startseite beantworten häufige Fragen als lesbares HTML.
Die aufklappbaren Antworten funktionieren ohne JavaScript und lassen sich mit
der Tastatur bedienen. Bei unveröffentlichten Apps sind Status und geplanter
Funktionsumfang ausdrücklich gekennzeichnet.

Die strukturierten App-Daten beschreiben die Produkte. Es werden keine Preise,
Bewertungen, Sterne oder Veröffentlichungstermine erfunden. Das vollständige
Google-App-Rich-Result setzt zusätzliche belegbare Angebots- und Bewertungsdaten
voraus; das vorhandene Markup garantiert diese Darstellung nicht. Die sichtbaren
FAQs erhalten kein spezielles FAQ-Rich-Result-Markup.

Die Rechtstexte selbst werden durch diese SEO-Ergänzungen nicht geändert.
Die beiden 404-Seiten tragen `noindex, follow` und haben weder Canonical-URLs
noch Spracheinträge für die Indexierung. Die Google-Verifizierungsdatei bleibt
unverändert.

## robots.txt und Sitemap

`robots.txt` erlaubt das Crawlen der öffentlichen Website. `OAI-SearchBot`, der
Crawler für ChatGPT Search, ist ausdrücklich zugelassen. Der interne
`website_context.txt`-Snapshot ist in beiden Crawler-Gruppen ausgeschlossen,
weil er vollständige Seiten als teilweise veraltete Kopien enthält. Diese Regel
ist eine Crawler-Anweisung und keine Zugriffssperre.

Für `GPTBot` gibt es keine gesonderte Regel. Die Entscheidung über das Crawlen
für mögliches Modelltraining ist unabhängig vom Zugriff für ChatGPT Search.
Wenn Modelltraining ausgeschlossen werden soll, kann eine eigene Gruppe
ergänzt werden:

```txt
User-agent: GPTBot
Disallow: /
```

`sitemap.xml` enthält die 36 bevorzugten URLs der öffentlichen Seiten,
einschließlich der deutschen und englischen Rechtstexte. Fehlerseiten und die
Verifizierungsdatei sind nicht enthalten. Auf pauschale Änderungsdaten,
`priority` und `changefreq` wird verzichtet.

Bei neuen Seiten oder geänderten Canonical-URLs die Sitemap aus dem
Website-Verzeichnis aktualisieren:

```sh
python3 scripts/generate_sitemap.py
```

Das Skript benötigt nur die Python-Standardbibliothek. Es liest Canonical-URLs
und `noindex` aus den HTML-Dateien. Neue reguläre Seiten ohne eindeutige
Canonical-URL müssen zuerst ergänzt werden; in diesem Fall wird die bestehende
Sitemap nicht überschrieben.

## Nach der Veröffentlichung

1. Das Website-Verzeichnis als Domain-Wurzel veröffentlichen. Die Dateien
   müssen unter `/robots.txt` und `/sitemap.xml` erreichbar sein.
2. In der Google Search Console und in Bing Webmaster Tools die Domain
   bestätigen und `https://www.sdnightshiftstudio.com/sitemap.xml` einreichen.
   Die vorhandene Google-Verifizierungsdatei kann weiterhin verwendet werden.
3. Mit der URL-Prüfung die Startseite und die App-Seiten prüfen. Reguläre Seiten
   müssen HTTP 200 liefern, fehlende Seiten HTTP 404. Hosting oder CDN dürfen
   die gewünschten Crawler nicht durch Bot-Challenges oder Sperren abweisen.
4. Suchanfragen, Indexierungsstatus und relevante Besucher auf den App-Seiten
   beobachten. Bei neuen Funktionen, geänderten Preisen oder Veröffentlichung
   einer App die Angaben in beiden Sprachen und in den strukturierten Daten
   gemeinsam pflegen.

Für diese Schritte ist Zugriff auf die Hosting- und Webmaster-Konten nötig.
Die lokalen Dateien allein reichen noch keine Sitemap bei einem Dienst ein.
Indexierung, Rankings und Erwähnungen in AI-Antworten werden von den jeweiligen
Suchdiensten bestimmt und sind nicht garantiert.

## Offizielle Dokumentation

- [Google: SEO-Grundlagen](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google: Mehrsprachige Seiten](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google: Sitemaps erstellen und einreichen](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: Strukturierte Daten für Software-Apps](https://developers.google.com/search/docs/appearance/structured-data/software-app)
- [Google: Sichtbarkeit in generativen Suchfunktionen](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [OpenAI Docs: Crawler und robots.txt](https://developers.openai.com/api/docs/bots)

Eine zusätzliche `llms.txt` ist für Googles AI-Suchergebnisse laut dessen
Dokumentation nicht erforderlich. Die Grundlage dieser Umsetzung sind öffentlich
lesbare Inhalte, konsistente Metadaten und erlaubter Crawler-Zugriff.
