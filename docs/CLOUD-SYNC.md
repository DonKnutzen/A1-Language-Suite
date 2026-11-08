# Cloud-Sync

Fortschritt gehört zu genau einem Cloud-Konto und einem Kurs. Benutzername und PIN müssen auf allen Geräten identisch sein. `daniel` und `daniel2` sind zwei getrennte Konten; sie werden nicht automatisch zusammengeführt. A1, A2, Englisch B1 und Deutsch C1 behalten getrennte Kurskennungen.

## Kompatibilität mit der produktiven Datenbank

Ein anschließender echter Schreibtest hat einen übersehenen Fehler bestätigt: Die produktive CHECK-Beschränkung `course_progress_course_check` lehnt unter anderem `fr-a2`, `en-b1`, `de-c1-tr` und `a1-daily-streak` mit HTTP 400 / SQLSTATE 23514 ab. Erfolgreiche Anmeldung und leere Leseabfragen konnten diesen Fehler nicht erkennen. Das ursprüngliche Testmodell bildete diese Beschränkung nicht ab; das wurde korrigiert.

Zusätzliche Kurse werden deshalb in getrennten `_suiteCourses[course]`-Feldern innerhalb der eigenen vorhandenen `fr`-Zeile gespeichert. Französisch A1 behält seinen bisherigen Inhalt und Prozentwert auf der obersten Ebene, Deutsch A1 seine eigene `de`-Zeile. Jeder Schreibvorgang schützt die gesamte betroffene Zeile mit dem gelesenen Änderungszeitpunkt. Gleichzeitige Änderungen verschiedener Kurse werden dadurch ebenfalls erneut zusammengeführt. Das Zurücksetzen eines Kurses bewahrt die anderen Kurse und die Lernserie. Vorhandene direkte Kurszeilen aus neueren Datenbankschemata werden beim Lesen weiterhin berücksichtigt.

Die Kursidentitäten in App und lokalen Browserdaten ändern sich nicht. Eine Datenbankmigration oder ein erneutes Anlegen der Lernkonten ist für diese kompatible Speicherung nicht nötig. Eine abgelaufene Anmeldung wird jetzt getrennt vom Netzwerkfehler angezeigt; „Neu anmelden“ behält den Benutzernamen und die ausstehenden lokalen Uploads.

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

Das Modell erlaubt nun wie die geprüfte alte Datenbank nur `de` und `fr` als physische Schreibkennungen. Zusätzliche Tests decken alle aktuellen Kurse, gleichzeitige A1-/A2-/Lernserien-Updates, getrennte Resets, bestehende native Daten und die erneute Anmeldung ab.

`node tools/check-cloud-health.cjs` prüft ausschließlich die veröffentlichte Startseite, den Login-Dienst und den regulären Endpunkt für das Vorhandensein von `daniel` und `daniel2`. Es liest keine privaten Lernstände und ändert keine Konten.

`node tools/live-cloud-probe.cjs --create-test-profile --app-sync` erstellt ausdrücklich ein eigenes Diagnosekonto und prüft den tatsächlichen App-Code gegen die produktive Datenbank. Zwei unabhängige Anmeldesitzungen speichern gleichzeitig A2-Fortschritt; ein frischer Browser-Speicher stellt die vereinigten Abschlüsse wieder her. A1-Erhalt, Lernserie und ein Reset mit anschließendem veraltetem Upload werden ebenfalls geprüft. Dieser Test hat vollständig bestanden. PIN und Tokens bleiben im Prozessspeicher; die Diagnose-Sitzungen werden danach abgemeldet und der öffentliche Diagnose-Ranglisteneintrag auf null gesetzt. Lernkonten werden nicht verwendet.

## Grenzen der Überprüfung

Am 8. November 2026 wurden die veröffentlichte App und beide genannten Profilnamen erfolgreich über die öffentlichen App-Endpunkte geprüft. Der verbundene Supabase-Verwaltungszugriff berechtigt nicht zum Projekt `ufuwxtshfoqiddvyptgn`; private Kontenstände und die tatsächlichen Handy-/Mac-Sitzungen konnten daher nicht überprüft werden.

Die Reparatur verwendet die vorhandenen Tabellen und eigenen SELECT-/INSERT-/UPDATE-Berechtigungen; eine Schemaänderung ist nicht erforderlich. Bereits laufende alte App-Tabs müssen die neue Version laden, bevor sie die neue Konfliktbehandlung verwenden. Kursseiten und Offline-Caches sind dafür neu versioniert. Ohne Netzwerk kann noch nicht hochgeladener Fortschritt erst nach Wiederverbindung auf anderen Geräten ankommen. Lokale Browserdaten dürfen bis zur bestätigten Synchronisierung nicht gelöscht werden.

Der unveränderte Ausgangsstand `2f5257e` hat im vollständigen Testlauf 22 bestehende Fehler (585 Tests, 563 erfolgreich). Diese betreffen unter anderem Inhalts- und alte Versionsprüfungen und sind von der Sync-Reparatur getrennt zu beurteilen.

Der aktuelle reparierte Stand hat 600 Tests: 578 erfolgreich und dieselben 22 bestehenden Fehler, ohne neu hinzugekommene Fehler. Die gezielte Prüfung oben besteht vollständig (37 Tests). `node tools/verify-cloud-release.cjs` vergleicht nach der Veröffentlichung die ausgelieferten Profil-, Kurs- und Cache-Dateien mit dem lokal geprüften Quellcode.
