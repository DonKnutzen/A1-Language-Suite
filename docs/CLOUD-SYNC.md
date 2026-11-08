# Cloud-Sync

Fortschritt gehört zu genau einem Cloud-Konto und einem Kurs. Benutzername und PIN müssen auf allen Geräten identisch sein. `daniel` und `daniel2` sind zwei getrennte Konten; sie werden nicht automatisch zusammengeführt. A1, A2, Englisch B1 und Deutsch C1 behalten getrennte Kurskennungen.

## Speichern und Wiederaufnehmen

- Abgeschlossene Lektionen, bearbeitete Hörtexte und weitere Abschlusslisten werden vereinigt. Bestleistungen werden nicht durch niedrigere Werte ersetzt.
- Aktuelle Antworten und laufende Übungsversuche bleiben zusammengehörige Schnappschüsse. Antwortlisten werden nicht wie Abschlusslisten vereinigt.
- Jeder Upload liest den aktuellen Cloud-Stand. Ein bestehender Datensatz wird nur geändert, wenn sein `updated_at` noch dem gelesenen Wert entspricht. Bei einem Konflikt liest die App neu, führt die Fortschritte zusammen und versucht erneut zu speichern. Neue Datensätze werden mit `ignore-duplicates` angelegt.
- Uploads werden sofort in einer kontogebundenen lokalen Warteschlange abgelegt. Ein Netzwerkfehler, Seitenwechsel oder Neustart entfernt die Warteschlange nicht. Beim erneuten Öffnen mit demselben Konto wird sie auch von der Startseite aus abgearbeitet.
- Laden und Zusammenführen erfolgen beim Login, beim Öffnen des Kurses, nach Rückkehr in die App, nach Wiederherstellung der Verbindung und alle 30 Sekunden bei sichtbarer Seite. Fehlerhafte Uploads werden zusätzlich nach 15 Sekunden erneut versucht.
- Erneuerungen rotierender Login-Tokens werden innerhalb eines Tabs und mit Web Locks auch zwischen Tabs serialisiert. Eine verspätete Antwort darf kein inzwischen gewechseltes Konto verändern.
- Die Anzeige am Profil unterscheidet verbunden, synchronisiert, Speichern ausstehend und nicht erreichbare Cloud. „Lokal gesichert“ bedeutet, dass der Upload noch nicht auf einem anderen Gerät verfügbar ist.
- Ein bewusstes Zurücksetzen erzeugt eine neue Kennung im Fortschritt. Ein ausstehender älterer Stand eines anderen Geräts darf diesen Reset nicht rückgängig machen.

Die Kurse übernehmen neue Cloud-Daten auf der Startansicht sofort. Während einer laufenden Übung bleiben deren Objektverweise erhalten; neue Daten werden beim nächsten Ansichtswechsel angewendet. Der gespeicherte Stand und spätere Uploads enthalten bereits die zusammengeführten Erfolge.

## Prüfung

`node --test tests/cloud-sync.test.cjs tests/pin-recovery.test.cjs tests/streak.test.cjs tests/german-content-cache-regression.test.cjs tests/francais-a2.test.cjs`

Die Sync-Tests verwenden getrennte Browser-Speicher und ein gemeinsames API-Modell mit atomaren bedingten Updates. Geprüft werden vorhandene und neue Cloud-Zeilen, gleichzeitige Geräte, Offline-Wiederaufnahme, neuere Änderungen während laufender Anfragen, Profilisolation, Reset, Token-Erneuerung und Lernserie. Ein zusätzlicher Test verhindert, dass Speichern Referenzen einer laufenden Übung austauscht oder einen neuen Hörverstehensversuch blockiert.

`node tools/check-cloud-health.cjs` prüft ausschließlich die veröffentlichte Startseite, den Login-Dienst und den regulären Endpunkt für das Vorhandensein von `daniel` und `daniel2`. Es liest keine privaten Lernstände und ändert keine Konten.

## Grenzen der Überprüfung

Am 8. November 2026 wurden die veröffentlichte App und beide genannten Profilnamen erfolgreich über die öffentlichen App-Endpunkte geprüft. Der verbundene Supabase-Verwaltungszugriff berechtigt nicht zum Projekt `ufuwxtshfoqiddvyptgn`; private Kontenstände und die tatsächlichen Handy-/Mac-Sitzungen konnten daher nicht überprüft werden.

Die Reparatur verwendet die vorhandenen Tabellen und eigenen SELECT-/INSERT-/UPDATE-Berechtigungen; eine Schemaänderung ist nicht erforderlich. Bereits laufende alte App-Tabs müssen die neue Version laden, bevor sie die neue Konfliktbehandlung verwenden. Kursseiten und Offline-Caches sind dafür neu versioniert. Ohne Netzwerk kann noch nicht hochgeladener Fortschritt erst nach Wiederverbindung auf anderen Geräten ankommen. Lokale Browserdaten dürfen bis zur bestätigten Synchronisierung nicht gelöscht werden.

Der unveränderte Ausgangsstand `2f5257e` hat im vollständigen Testlauf 22 bestehende Fehler (585 Tests, 563 erfolgreich). Diese betreffen unter anderem Inhalts- und alte Versionsprüfungen und sind von der Sync-Reparatur getrennt zu beurteilen.

Der reparierte Stand hat 595 Tests: 573 erfolgreich und dieselben 22 bestehenden Fehler, ohne neu hinzugekommene Fehler. Die gezielte Prüfung oben besteht vollständig (32 Tests). `node tools/verify-cloud-release.cjs` vergleicht nach der Veröffentlichung die ausgelieferten Profil-, Kurs- und Cache-Dateien mit dem lokal geprüften Quellcode.
