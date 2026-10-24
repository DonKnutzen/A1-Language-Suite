# Wortschatz mit den tatsächlich verwendeten Aufgaben abgleichen

Aktueller Nachtrag: [VOCABULARY-PLACEMENT.md](VOCABULARY-PLACEMENT.md) ersetzt die frühere Platzierung vollständiger/neuer Wortlisten am Anfang und korrigiert die vorgezogenen Erklärungen in Deutsch 1.

## Anzeige auf neue Wörter begrenzt (Nachtrag)

Auf Wunsch zeigt die eingeklappte Lektionsliste nur noch **neue Vokabeln dieser Lektion**. Maßgeblich ist die früheste Lektionszuordnung im vollständigen Kurswortschatz, unabhängig vom individuellen Lernfortschritt. Bereits früher eingeführte Wörter erscheinen dort nicht erneut. Gleichlautende Karten mit verschiedenen Übersetzungen werden vor der Auswahl zusammengefasst. Ohne neue Wörter entfällt die Liste. Im Vokabeltrainer bleiben sämtliche Einträge, Lektionszuordnungen und Lernstände erhalten. Die folgende ursprüngliche Beschreibung der vollständigen Inline-Liste ist damit hinsichtlich des Anzeigeumfangs überholt.

65 gezielte Tests bestanden, darunter die exakte Auswahl für alle 48 Lektionen, Quellenabdeckung, unveränderte Kartenidentität und Fehlerstapel sowie Asset-Versionen.

Ausgangsstand: `079803b9783978bbe6fe42c7713187f11896f136` auf `main`.
Nachbearbeitung vom 24.10.2026 für Französisch A1 und Deutsch A1.

## Bestätigte Probleme

Die bisherige Liste „Weitere Wörter“ war nur eine Auswahl der nachgetragenen Wörter. Sie war kein vollständiger Blick auf den Lektionswortschatz. Das war insbesondere bei Hörtexten irreführend. Daneben fehlten wirkliche Einträge und Zuordnungen zu früheren Verwendungsorten.

| Beispiel | Befund | Korrektur |
|---|---|---|
| Französisch: la ligne, Lektion 9 | Im verwendeten Wortschatz, aber ohne Wortkarte | Wortkarte mit „die Linie“, der Lektion zugeordnet |
| Französisch: le plat, Lektion 6 | Fehlender Eintrag | „das Gericht“ ergänzt |
| Französisch: dans, ab Lektion 2 | Fehlender Eintrag | „in“ ergänzt, tatsächlichen Verwendungslektionen zugeordnet |
| Französisch: pouvoir, Lektion 2 | Wortkarte erst einer späteren Lektion zugeordnet | Frühere Verwendung ebenfalls zugeordnet |
| Französisch: se lever, Lektion 11; signer, Lektion 17 | Im vollständigen Trainer vorhanden, in der partiellen Zusatzliste nicht sichtbar | Einheitliche vollständige Lektionsliste statt zweiter Auswahl |
| Deutsch: die Telefonnummer, der Familienname, hören, der Stift | Fehlende selbstständige Wortkarten | Französische Übersetzungen ergänzt und Verwendungslektionen zugeordnet |

Das vom Nutzer gehörte „Sine“ ist ohne genaue Schreibweise oder Lektionsstelle nicht eindeutig identifiziert. Es wird weder mit signer noch mit ligne gleichgesetzt und nicht als erledigter Einzelfehler ausgegeben.

## Umsetzung und Grenzen

`shared/lesson-lexicon.js` enthält geprüfte Zuordnungen und Suchformen für 599 französische und 556 deutsche lexikalische Einträge. Davon ergänzen 116 beziehungsweise 146 Datensätze eine Übersetzung für zuvor fehlende Einträge. Die übrigen ergänzen Verwendungslektionen und auffindbare Formen vorhandener Karten. Dies sind Datensatzanzahlen, keine offizielle A1-Wortzahlnorm.

Die eingeklappte „Wortschatz dieser Lektion“-Liste verwendet jetzt dieselbe vollständige Kursbank wie der Vokabeltrainer und filtert sie nach Lektion. Sie steht im Einstieg und zusätzlich vor dem normalen Hördialog. Artikel, kurze Wendungen und Übersetzungen bleiben sichtbar. Eine neue Liste wird nicht in die abgegebene oder laufende Hard-Mode-Prüfung eingeblendet. Grammatikregeln bleiben bei ihren Themen; die vollständige Wortliste wird nicht als pauschaler Grammatikblock wiederholt.

Konjugierte Suchformen wie „nous nous levons“, „signez“, „ihr habt“ oder „du liest“ führen zur passenden Wortkarte. Diese Erweiterung betrifft ausschließlich die Suche. Antwortkorrektur, Audiolimits, Bestehensregeln und Selbstbewertung sind unverändert.

Bestehende Kartenkennungen, Übersetzungen und bisherige Lektionszuordnungen bleiben erhalten. Damit bleiben Bewertungen und Fehlerstapel gültig. Neue Einträge sind Wörter oder kurze Wendungen; Beispielsätze werden nicht automatisch zu Vokabelkarten.

## Prüfverfahren

Für alle 48 Lektionen wurden die tatsächlich hinterlegten zielsprachlichen Texte gesammelt: Einstiegsbeispiele und -optionen, Grammatikbeispiele und -pools, sämtliche französischen Lektionscheck-Varianten einschließlich Transferaufgaben, deutsche verfasste Aufgaben, normale Hördialoge, Hard-Mode-Lückentexte mit Lösungen, Hörskripte und Optionen sowie Schreib- und Sprechmodelle. Zielsprachliche Ablenkantworten gehören ebenfalls dazu.

Ein lokales Lemmatisierungswerkzeug diente nur zur Kandidatensuche. Die App benötigt dafür weder eine Bibliothek noch einen Dienst. Zuordnungen wurden auf Mehrdeutigkeiten überprüft: etwa reflexives s’appeler gegenüber telefonischem appeler, gehört als Form von gehören, Fahrt gegenüber fahrt sowie feste Wendungen wie pommes de terre. Ein einzelnes „la“, „bon“ oder „es“ darf keine Zuordnung zu la clé, bon marché oder es regnet erzeugen.

Eigennamen, buchstabierte Buchstaben und aus bekannten Regeln zusammengesetzte Zahlen sind keine fehlenden übersetzten Vokabeln. Grammatische Ablenkformen erhalten keine neuen Wortkarten. Erklärwörter in der Unterrichtssprache werden nicht versehentlich als fremdsprachlicher Lernstoff behandelt.

Die Quellen-Fingerabdrücke im Test decken die aktuell gesammelten Texte jeder Lektion ab. Ändern sich diese Texte, verlangt der Test eine erneute Prüfung. Der Fingerabdruck beweist weder die sprachliche Richtigkeit einer neuen Aufgabe noch, dass Lernende eine Wortbedeutung verstanden haben. Ebenso ersetzt ein übersetzter Verbeintrag keine Erklärung seiner Formen. Die bestehende thematische Grammatikvermittlung bleibt deshalb erhalten.

## Verifikation

- 222 gezielte Tests bestanden, 0 Fehler: Wortschatz, Suche, Kartenidentität und Fehlerstapel, Quellenabdeckung, Lektionsvoraussetzungen, Grammatik-/Checkqualität, Audiofreigabe, Wiederholung, Hard Mode und Deutsch-Parität.
- Lokales Chromium: alle 48 Lektionen, Wortliste im Einstieg und vor dem Dialog; 320, 390 und 1280 Pixel; helles und dunkles Design; Tastaturöffnung; tatsächliche Trainersuche; englischer Sprachwechsel. Keine Seitenfehler oder horizontaler Überlauf. Mobile Screenshots visuell kontrolliert.
- Für den lokalen Browserlauf wurden Profil und Streak ersetzt. Eine echte Produktionsanmeldung wurde nicht getestet.
- Die tatsächliche Sprachausgabe auf dem Gerät des Nutzers wurde nicht angehört. „Sine“ bleibt ungeklärt. Globale eigenständige Prüfungssammlungen außerhalb dieser 48 Lektionsabläufe werden nicht als vollständig geprüft ausgegeben.

Die Änderung bleibt kostenlos. C1- und Spanischdateien werden nicht geändert.
