# Qualitätsaudit: Griechisch A1

Datum: 12. November 2026. Geprüfter Ausgangsstand: `bc897398ee6376884b505fabb1bdf57c1841f89a`.

## Urteil

**Der Kurs ist ein verwendbares A1-Einstiegsgerüst, erreicht aber noch nicht die Lerntiefe des Französisch-A1-Kurses. Eine Freigabe als gleichwertiger, vollständig ausgearbeiteter A1-Kurs ist nach diesem Audit nicht gerechtfertigt.**

Die Alltagsthemen passen grundsätzlich zum Zielniveau. Die Kernformulierungen sind überwiegend brauchbar. Die entscheidenden Schwächen liegen in der didaktischen Ausarbeitung und der Aussagekraft der Lernstandschecks. Außerdem hat die inhaltliche Prüfung Fehler gefunden, die die bisherigen Strukturtests nicht erkennen konnten. Diese konkreten Fehler wurden korrigiert; die offenen Ausbauarbeiten werden unten getrennt ausgewiesen.

Dieses Audit ist eine technische und redaktionelle Eigenprüfung mit offiziellen Referenzen. Es ersetzt kein unabhängiges muttersprachliches Lektorat und keinen Lernversuch mit Anfängern. Wegen der laufenden PC-Nutzung fanden keine weiteren UI-Aktionen statt. Visuelle Darstellung und tatsächlich gehörte Audioqualität wurden nicht als geprüft bewertet.

## Methode und Umfang

Alle 24 Lektionen wurden anhand ihrer Lernziele, Regeln, Kernwendungen, Dialoge, Aufgaben, Lösungen, Mustertexte und Selbstchecks durchgesehen. Zusätzlich wurden Aufgabenherstellung, Eingabeprüfung, Hörfreigabe, Entwürfe, Wiederholung und Fortschrittsaussagen anhand des Codes und gezielter JSDOM-Tests geprüft.

Reproduzierbare Bestandsaufnahme:

```text
node tools/audit-greek-a1.cjs > docs/greek-a1-quality-inventory.json
node --test tests/greek-a1.test.cjs tests/french-voice-fallback.test.cjs tests/cloud-sync.test.cjs
```

Die [JSON-Bestandsaufnahme](greek-a1-quality-inventory.json) enthält Werte je Lektion, mögliche Längenhinweise in Auswahlfragen und SHA-256-Werte der auf LF normalisierten Inhaltsdateien. Sie vergibt ausdrücklich keine automatische Sprachnote.

| Merkmal | Befund |
|---|---:|
| Lektionen | 24 |
| Kernwendungen/Wortgruppen | 192 |
| unterschiedliche Aufgabenkennungen insgesamt | 660 |
| Trainingsaufgaben | 552, vollständig mit Auswahlantworten |
| direkte Grammatikfragen | 72, je 3 pro Lektion |
| zusätzliche Transferfragen | 48, je 2 pro Lektion |
| Verständnisfragen | 96, je 2 pro Lese- und Hörtext |
| Buchstaben-/Orthographieaufgaben | 60 |
| Aufgaben in Lektionschecks | 408, davon 192 Eingaben; überwiegend Wiederverwendung des Lernstoffs |
| griechische Wörter pro Lesetext | 5–23; Namen mitgezählt, Ziffern nicht |
| griechische Wörter pro Hörtext | 3–17 |
| Eingabevarianten nach Korrektur | 45 Kernwendungen mit mindestens einer Alternative |

Wiederverwendete Aufgaben in Training, Check und A1-Block zählen nicht mehrfach als neuer Inhalt. Reine Mengenvergleiche belegen keine Qualität. Zum Vergleich enthält Französisch A1 252 Kernwendungen, zwölf gesonderte Grammatiksets mit 120 Fragen und eine zusätzliche explizite Mastery-Spezifikation. Diese getrennten Übungs- und Abdeckungsebenen fehlen Griechisch bislang.

## Behobene Befunde

P1 bezeichnet einen Fehler, der Antworten oder die Interpretation des Lernergebnisses wesentlich verfälscht. P2 bezeichnet eine deutliche Schwäche beim Lernen oder beim Erhalt von Arbeit.

| ID | Priorität | Ursprünglicher Befund | Korrektur |
|---|---|---|---|
| F01 | P1 | 13 Mustertexte erfüllten den eigenen Auftrag nicht vollständig: L2, 4, 7, 8, 11, 12, 14, 16, 17, 18, 20, 22, 23. Beispielsweise verlangte L16 vier Uhrzeiten und zwei Häufigkeitsangaben, zeigte aber nur eine Uhrzeit ohne Häufigkeitsangaben. | Die Mustertexte erfüllen nun die verlangten Angaben und Mengen. Die Vorgaben wurden nicht abgeschwächt. |
| F02 | P1 | In einer Auswahlfrage zu νερό konnte die falsche Option ο statt ό einen kostenlosen weiteren Versuch auslösen. Ein Hinweis für Texteingaben wurde auf Auswahlantworten angewendet. | Auswahlantworten werden direkt bewertet. Ein Akzenthinweis mit Korrekturversuch bleibt nur bei eigenen Texteingaben möglich. |
| F03 | P1 | Das Antippen des Hörbuttons schaltete Antworten sofort frei. Auch eine danach fehlschlagende Sprach-Engine erlaubte Antworten ohne abgespielten Text. | Freigabe erst nach dem vollständigen Abspielen. Fehler und verspätete Rückmeldungen eines alten Abspielvorgangs geben keine Frage frei. |
| F04 | P2 | Schreibentwürfe wurden erst nach 350 ms gespeichert. Sofortiges Verlassen oder Neuladen konnte die letzte Eingabe verlieren. | Der Entwurf wird bei jeder Eingabe unmittelbar gespeichert. Die vorhandene Cloud-Funktion übernimmt weiterhin die gebündelte Übertragung. |
| F05 | P1 | Korrekte Varianten wie Εγώ μαθαίνω ελληνικά. wurden gegenüber Μαθαίνω ελληνικά. als falsch bewertet, obwohl der Kurs die Weglassbarkeit des Pronomens erklärt. | Begrenzte, grammatisch bestimmte Varianten für anfängliche Ich-Prädikate sowie alternative Namensformulierungen. Kein pauschales Entfernen von Pronomen oder Akzenten. |
| F06 | P2 | Das Schreibbeispiel in L1 kombinierte Γεια σας mit Πώς σε λένε ohne Wechsel des Gesprächspartners. | Durchgängig informelle Anrede im Beispiel. Die höfliche Anrede bleibt als eigene Wendung erhalten. |
| F07 | P2 | L13 kündigte ein ausgelassenes Verb an, zeigte aber einen Satz mit είναι. L15 erklärte σε γιατρό und σε σχολείο pauschal als unterschiedliche Orte. | Passendes Beispiel einer verkürzten Nachfrage; für Arbeitsorte ein verständlicher Vergleich zwischen bestimmtem und unbestimmtem Artikel. |
| F08 | P2 | Einzelne falsche Optionen waren künstliche Formen wie μπλος/μπλη. | Reale Wortformen mit überprüfbarer Kongruenz; außerdem χρόνος/χρόνια als echte Alternativen zur Altersform χρονών. |
| F09 | P2 | Δεν μπορώ ___ δουλεύω gab nicht an, welche logische Verknüpfung gesucht wurde. | Der Auftrag verlangt ausdrücklich eine Begründung mit „weil“. |
| F10 | P1 | Zwei ausgelassene Hörfragen ließen im Lektionscheck weiterhin 15/17 = 88 % zu. Die allgemeine Erfolgsmeldung konnte als bestandener Hörteil verstanden werden. | Deutlicher Hinweis „Hörteil offen“, auch beim späteren Öffnen des Checks. Der Gesamtwert bleibt ein Wissens-/Selbstcheckwert, kein Hörnachweis. |
| F11 | P2 | Gespeicherte Fehleraufgaben enthielten eingefrorene Texte und Lösungen. Inhaltliche Korrekturen erreichten diese Wiederholungen nicht. | Wiederholungen laden die aktuelle Aufgabe über ihre Kennung. Fehlergeschichte bleibt erhalten; entfernte Aufgaben werden nicht weiter angeboten. |
| F12 | P2 | Sechs Auswahlaufgaben hatten einen deutlich längeren oder formal einzigartigen richtigen Antworttext. Beispiele: lange Wiederholungsbitte gegen „Ja“/„Danke“; σ/ς als einzige mehrteilige Option. | Situationsnahe Alternativen ähnlicher Länge; Ziffern in allen Telefonnummer-Optionen; Sigmafrage prüft ausdrücklich die Endform. |

Ein verbleibender Längenhinweis betrifft die Ortsnamen „Thessaloniki“, „Athen“, „Patras“. Das wurde redaktionell akzeptiert: Alle drei sind plausible Ortsantworten, und die Frage verlangt die Zuordnung des Wetters zu einer Stadt. Ortsnamen wurden nicht künstlich verlängert.

Auch die Aufgabenbeschriftung wurde präzisiert: Auswahltraining verlangt „Wähle“, eigene Eingaben verlangen „Schreibe“. Der Lektionscheck behauptet keine vollständige Grammatikabdeckung mehr.

## Noch offene wesentliche Lücken

### O1 · P1 · Schrift- und Grammatikstoff werden nicht ausreichend abgesichert

L2 nennt das Erkennen aller 24 Buchstaben als Ziel, ihr Lektionscheck kontrolliert aber nur wenige Zeichen. Das zusätzliche Schriftlabor prüft Groß-/Kleinschreibung und Abschreiben; es belegt keine selbstständige Dekodierung unbekannter Wörter. Der Lektionsabschluss ist nicht mit der Bearbeitung der Schriftgruppen verknüpft. Beispiele in frühen Buchstabengruppen enthalten teilweise Zeichen aus späteren Gruppen.

Ähnlich werden in L5 Zahlen bis 100, in L6 alle Wochentage und in L18 alle Monate aufgeführt, jedoch nur sehr begrenzt aktiv geübt. Pro Lektion drei Regel- und zwei Transferfragen reichen nicht als vollständige Abdeckung des erklärten Stoffes.

**Erforderlich:** kleine aufeinander aufbauende Leseschritte, Hör-/Schriftzuordnung, Abschreiben getrennt von Lesen aus dem Gedächtnis, eigene Zahlen-/Zeit-/Datumsübungen und eine explizite Matrix „erklärt → angeleitet geübt → selbstständig angewendet → geprüft“. Dafür sind keine Zugangssperren zwischen Lektionen nötig.

### O2 · P1 · Hör-/Lesematerial und Transferdiagnostik bleiben zu schmal

Die sehr kurzen Texte sind für den Einstieg sinnvoll. Bis L24 bleibt der Hörtext jedoch bei 15 griechischen Wörtern mit zwei Fragen. Der Großteil fragt einzelne ausdrücklich genannte Fakten ab. Die Checks wiederholen dieselben Hör-/Lesetexte und Verständnisfragen; nur zwei Transferfragen je Lektion kommen hinzu. Ein A1-Block wählt außerdem immer die erste Kernwendung und die erste Regel-/Verständnisfrage der zugehörigen Lektion.

**Erforderlich:** eine wachsende Vielfalt eigener Texte und neuer Situationen: etwa Hinweise, Öffnungszeiten, Nachrichten, Ansagen und Wegangaben; zusätzlich mehrere unabhängige Transferaufgaben pro Fertigkeit. Es wird hier keine angebliche offizielle Mindestwortzahl für Texte angesetzt.

### O3 · P1 · Audio ist auf manchen Geräten nicht verfügbar

Griechisch besitzt keine eigenen vorproduzierten Tondateien und benötigt eine vom Browser angebotene griechische Stimme. Ohne diese Stimme fällt das gesamte Hörtraining aus. Der neu korrigierte Fehlerhinweis löst die Verfügbarkeit nicht. Im bestehenden Französischkurs gibt es unter anderem vorproduzierte Radioaufnahmen als geräteunabhängige Alternative.

**Erforderlich:** eigene oder entsprechend lizenzierte, tatsächlich angehörte griechische Aufnahmen für Kernmaterial; wenigstens ein geprüfter Audiofallback. Die aktuelle Hörübung nutzt ein festes Übungstempo von 0,8; die allgemeine Tempoauswahl betrifft nicht diesen neuen vollständigen Abspielnachweis.

### O4 · P1 · Kursabschluss bestätigt keine vier bewerteten Fertigkeiten

Sprechen und Schreiben sind Selbstchecks. Der Schreibbutton prüft technisch nur griechische Zeichen und drei Bestätigungen; weder Inhalt noch Sprachrichtigkeit werden festgestellt. Auch mit den verbesserten Mustertexten ist der Prozentwert kein unabhängig erhobener A1-Nachweis. Die Hörwarnung macht die Einschränkung sichtbarer, ändert diese Bedeutung aber nicht.

**Erforderlich:** aufgabenspezifische Selbstkriterien, nachvollziehbare Vergleichspunkte und unabhängige Rückmeldung für eine echte Niveaueinschätzung. Automatische KI-Bewertung ist dafür keine zwingende Voraussetzung. Hinweise und reine Übung sollten von einem unabhängigen Abschlusstest unterscheidbar bleiben.

### O5 · P2 · Wortschatz und Formen brauchen mehr Unterstützung

Einzelne zentrale Wörter erscheinen erst im Prüf-/Verstehenstext, beispielsweise κόρη/γιος in L7 oder Αναχώρηση/Άφιξη/Τιμή in L14. Bedeutungen stehen teilweise erst in der Antworterklärung. Unbekannte Wörter sind im Hör-/Leseverstehen grundsätzlich erlaubt; bei den ausdrücklich angezielten Schlüsselwörtern fehlt aber ein verlässlicher Lernschritt davor. Ein durchgängiges Lektionsglossar mit Artikel, Bedeutung und hörbarem Beispiel fehlt.

Die behandelten Themen sind außerdem breiter überschrieben, als sie ausgearbeitet sind. Wohnen, Kleidung, Ausbildung/Beruf und Hilfe im Alltag benötigen weitere eigene Szenarien. Natur/Umgebung und öffentliche Dienste sind besonders schwach vertreten. Das ist eine redaktionelle Abdeckungsbewertung, keine Behauptung, jedes Beispiel einer offiziellen Themenliste sei ein Pflichtwort.

### O6 · P1 · Unabhängige Sprach- und Nutzungsprüfung fehlt

Keine muttersprachliche Person hat sämtliche griechischen Inhalte, Aussprachehilfen und Aufnahmen redigiert. Ein Anfänger-Lernversuch und eine visuelle Mobil-/Desktopprüfung stehen aus. Die Eigenprüfung kann deshalb keine Fehlerfreiheit der gesamten Sprache oder tatsächliche Lernwirksamkeit bescheinigen.

## Durchsicht aller Lektionen

„Offen“ bezeichnet Ausbau nach den obigen Kriterien, nicht eine automatisch falsche griechische Form.

| L | Schwerpunkt | Korrektur bzw. noch nötige Arbeit |
|---|---|---|
| 1 | Begrüßen | Register im Modell korrigiert; Varianten beim Namen zugelassen. |
| 2 | Schrift | Modell korrigiert; Gesamtalphabet-Ziel durch aktuellen Lektionscheck nicht belegt. |
| 3 | Laute/Nachfragen | Bedeutungsoptionen verbessert; echte auditive Lautunterscheidung fehlt. |
| 4 | Herkunft/είμαι | Sprachangabe im Modell ergänzt; Pronomenvarianten zugelassen; Formen stärker einüben. |
| 5 | Zahlen/Daten | Altersdistraktor und Bedeutungsoptionen korrigiert; Zahlenaufbau und Zahlendiktat offen. |
| 6 | Zeit/Tage | Uhrzeitbeispiele grundsätzlich stimmig; alle Tage und weitere Zeitkontraste gezielt üben. |
| 7 | Familie | Modell auf vier Sätze ergänzt; κόρη/γιος und Besitzformen stärker vorbereiten. |
| 8 | Personen | Modell enthält jetzt zwei Personen mit je zwei Sätzen. |
| 9 | Café | Bestellung und Akkusativ passen grundsätzlich; mehr Reaktionen und neue Bestellsituationen nötig. |
| 10 | Restaurant | Grundsituationen vorhanden; Zutatenwortschatz und eigene Rückfragen ausbauen. |
| 11 | Einkaufen | Modell auf vier Mengenangaben ergänzt; Mengen und Preise produktiver üben. |
| 12 | Wohnen | Zweite Gegenstandsposition im Modell ergänzt; Wohnungs-/Umgebungswortschatz offen. |
| 13 | Weg | Erklärung der verkürzten Nachfrage korrigiert; neue Wege mit visueller Stütze fehlen. |
| 14 | Verkehr | Preisfrage im Modell ergänzt; Fahrplan-Schlüsselwörter vorentlasten. |
| 15 | Arbeit | Artikel-/Ortsbeispiel korrigiert; einfache Arbeits-/Lernmitteilungen fehlen. |
| 16 | Tagesablauf | Modell erfüllt vier Uhrzeiten und zwei Häufigkeitsangaben. |
| 17 | Freizeit | Modell enthält drei Tätigkeiten und eine Nicht-können-Aussage; mehr freie Interaktion nötig. |
| 18 | Wetter/Kleidung | Künstliche Formen entfernt, zweites Kleidungsstück ergänzt; Monate und Kleidung vertiefen. |
| 19 | Gesundheit | Sprachlich einfache Hilfeformeln vorhanden; Wortschatz und Verständnis einfacher Alltagshinweise offen. |
| 20 | Hotel/Datum | Frühstücksfrage ergänzt; Datum und Reservierungsvarianten gezielt weiterüben. |
| 21 | Einladen | Begründungsauftrag und Bedeutungsoptionen präzisiert. |
| 22 | Gestern | Modell auf vier Sätze berichtigt; häufige Formen mit neuen Situationen festigen. |
| 23 | Morgen | Dritten Plan ergänzt; Zukunftsformen und Personenwechsel vertiefen. |
| 24 | Transfer | Zusammenhängendes Schreibmodell vorhanden; unabhängige Aufgaben je Fertigkeit fehlen. |

## Ergänzung: Oberfläche nach Nutzerrückmeldung

Während des Audits wurde zusätzlich die Angleichung an Französisch A1 beauftragt. Griechisch verwendet jetzt tatsächlich dessen Basisstil sowie die gemeinsamen Styles für Kursstart und Lektionen. Fortsetzen-Karte, Lernbaum, Lektionsliste, Statusanzeigen, Karten und Schaltflächen folgen denselben Komponenten.

Die acht dauerhaft sichtbaren Reiter wurden entfernt. Eine Lektion zeigt den aktuellen Schritt, eine Positionsanzeige und eine benannte Weiter-Schaltfläche; direkte Sprünge sind im anfangs geschlossenen Inhaltsverzeichnis möglich. Hörbeispiele erscheinen zu viert, das Schriftlabor zeigt eine Gruppe mit sechs Buchstaben statt aller Gruppen gleichzeitig. Die griechische Eingabehilfe ist aufklappbar und bietet eine Umschaltung zwischen Klein- und Großbuchstaben.

Buchstabengruppen, Aussprache, griechische Inhalte und Speicherkennungen bleiben erhalten. Vier zusätzliche Funktionstests prüfen die Komponenten, Schrittnavigation, Seitenaufteilung, Rückkehr aus dem Schriftlabor und Eingabehilfe. Diese Prüfungen belegen keine abschließende visuelle Kontrolle auf echten Mobilgeräten.

## Quellen und Abgrenzung

- [Zentrum für griechische Sprache: A1 für Jugendliche und Erwachsene](https://www.greek-language.gr/certification/node/97.html): Referenz für Fertigkeiten und kommunikative Breite. Dazu gehören elementare Schriftkenntnisse, alltagsbezogene Informationen, kurze Texte und einfache Interaktion. Die offizielle Beschreibung wird nicht als starre Wortliste ausgelegt.
- [Offizielle A1-Modellprüfungen](https://www.greek-language.gr/certification/node/137.html): externe Referenz; die Appchecks bilden diese Prüfung nicht vollständig nach.
- [NEOHEL-Curriculum](https://old.neohel.com/wp-content/uploads/2022/05/1.6.CURRICULUM-GREEK-FOR-YOU-A1-GREEK.pdf), insbesondere Einleitung und Übersicht ab PDF-Seite 15: Schrift, Aussprache, Buchstabenkombinationen und handschriftliche Formen als eigenes Fundament; Verbindung von Kommunikation und Grammatik. Die App übernimmt diese Struktur nur teilweise. Keine Gleichwertigkeit oder vollständige NEOHEL-Abdeckung wird bescheinigt.
- [ΚΛΙΚ A1, offizielles Angebot](https://www.greek-language.gr/certification/node/a1.html): Referenz für die Verbindung der Fertigkeiten und begleitende Wortschatzhilfe. Es wurde kein vollständiger Aufgaben-für-Aufgaben-Abgleich mit dem käuflichen Lehrwerk vorgenommen.
- [Griechisches Schulministerium: Personalpronomen](https://ebooks.edu.gr/ebooks/v/html/8547/2009/Grammatiki_E-ST-Dimotikou_html-apli/index_C8a.html): sprachlicher Gegencheck zu verwendeten und weggelassenen Subjektpronomen.
- [Offizielles Schulwörterbuch, Anhang](https://ebooks.edu.gr/ebooks/v/html/8547/2332/Ermineutiko-Lexiko-Neas-Ellinikis_A-B-G-Gymnasiou_html-apli/index_parartima.htm): Gegencheck von Alphabet, Tages-/Monatsnamen und grundlegenden Zahlformen.

Keine Fremdtexte, Übungen, Bilder oder Audioaufnahmen wurden für die Korrekturen übernommen.

## Nachweise und nächster Ausbau

Nach den Korrekturen und der Oberflächenangleichung bestehen 48 gezielte Tests. Acht neue inhaltlich-technische Auditprüfungen schlagen mit den ursprünglichen Kursdateien fehl und bestehen mit den Korrekturen. Dazu kommen vier Prüfungen für den überarbeiteten Lernablauf. Die Gegenprobe wurde ohne Änderungen am offenen Arbeitsordner durchgeführt. Die zusätzlichen Prüfungen ersetzen weder Sprachredaktion noch einen Nutzertest.

Der vorherige vollständige Projektlauf hatte 649 bestandene und 24 bereits auf dem Ausgangsstand reproduzierbare Fehlschläge. Für dieses Audit wurde der gezielte Kurs-/Audio-/Profiltestlauf erweitert; es wird kein neuer vollständig grüner Projektlauf behauptet.

Die sinnvolle weitere Reihenfolge ist: (1) L1–6 als durchgängigen Anfängerpfad einschließlich Wortschatz und Audio fertigstellen, (2) eine Abdeckungsmatrix für alle Lektionen aufbauen und fehlende aktive Übungen ergänzen, (3) Hör-/Lesematerial und unabhängige Transferaufgaben ausbauen, (4) muttersprachlich redigieren und mit Anfängern erproben. Erst danach sollte die Gleichwertigkeit zum Französischkurs erneut bewertet werden.
