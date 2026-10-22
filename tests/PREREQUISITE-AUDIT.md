# Prüfung der Lernvoraussetzungen: Französisch A1 und Deutsch A1

Geprüfter Ausgangsstand: `c15776f6dacd907313146266b5b88a8ad1bdc7f7` (`main`), 22.10.2026.
Umfang: ausschließlich Französisch A1 und Deutsch A1, jeweils 24 Lektionen. Spanisch und die C1-Kurse wurden nicht verändert.

## Gesamturteil

Der Hinweis zu Französisch-Lektion 8 ist berechtigt. Der Check verlangt das Verständnis von **„il n’y a pas de balcon“**, obwohl die systematische Erklärung von **ne/n’ … pas** und **de/d’ nach Verneinung** ursprünglich erst in Lektion 18 steht. Schon Lektion 4 verwendet diese Struktur im Hard-Mode-Hörtext. In Lektion 1 enthalten sogar einzelne Hard-Mode-Ablenkantworten eine Verneinung. Eine Regel muss auch dann vorbereitet sein, wenn man eine falsche Antwort ausschließen soll.

Das ist kein Beleg dafür, dass der gesamte Lehrplan unvollständig ist. Viele zunächst verdächtige Inhalte sind bereits korrekt erklärt: etwa die französischen Possessivbegleiter, die regelmäßige Adjektivangleichung und die deutschen Zeitpräpositionen. Der entscheidende zusätzliche Fehler ist die **Reihenfolge**: Das Einstiegsquiz kommt vor den Grammatikseiten; eine Erklärung auf einer späteren Seite derselben Lektion ist deshalb noch keine Vorbereitung auf dieses Quiz. Auch in einigen deutschen Grammatikseiten werden Formen geübt, deren eigene Übersicht erst weiter hinten erscheint.

Die Korrektur besteht aus einer kurzen, sichtbaren Vorbereitung **vor dem ersten Quiz jeder Lektion**. Die vorhandene Vertiefung bleibt erhalten. Dort lassen sich die Grundlagen des Einstiegs zusätzlich aufklappen. Es gibt keine neue Pflichtstation und keine neuen Abschlussbedingungen.

## Prüfmaßstab und Verfahren

Abgeglichen wurden die tatsächlich verwendeten Daten und die gerenderten Erklärungstexte, nicht nur Themenüberschriften:

- Einstiegsquiz, Grammatikpools einschließlich der gesonderten französischen Übungen in Lektion 1 und zusätzliche deutsche Referenzübungen;
- eigenständige Lektionschecks und deren Schreib-/Transferaufgaben;
- normale Hördialoge sowie Hard-Mode-Lücken, Hörtexte, Fragen, richtige Antworten und Ablenkantworten;
- Schreibaufträge und Musterantworten; auch ein Muster sollte keine unnötig vorgezogene Grammatik suggerieren;
- die Position der Erklärungen im tatsächlichen Lektionsablauf.

Für jede Lektion wurden neue Formen, schon bekannte Formen, feste Wendungen und regelhaft ableitbare Formen unterschieden. Ein neues regelmäßiges Verb braucht nicht bei jeder Person eine neue Tabelle, wenn Bedeutung und Bildungsregel vorher vermittelt sind. Eine unregelmäßige Form braucht dagegen eine Erklärung oder einen ausdrücklich eingeführten Baustein. Zum Beispiel ist `geboren` in einer gelernten Geburtsdatumsformel vertretbar; ein unvermittelt auftauchendes `habe … gefunden` in einem anderen Kontext ist damit nicht automatisch vorbereitet.

Die Bestandsaufnahme und die neuen Regressionstests unterstützen diesen fachlichen Abgleich. Ein Treffer desselben Wortes irgendwo im Kurs wurde ausdrücklich **nicht** als Nachweis einer passenden Vorbereitung gewertet. Umgekehrt ist ein fehlender wortgleicher Beispielsatz noch kein Fehler, wenn eine zuvor erklärte Regel die neue Form eindeutig erschließt.

## Bestätigte Befunde und Korrekturen

### Dringend: französische Verneinung deutlich zu spät

- **Fundstelle:** `francais/mastery-specs.js`, Lektion 8, Check: „Il y a un jardin, mais il n’y a pas de balcon.“ Außerdem `francais/hard-mode-content.js`, Lektion 4: „Il n’y a pas de cours le dimanche.“ Die ausführliche bisherige Referenz steht in Lektion 18.
- **Auswirkung:** Man muss eine nicht erklärte Satzklammer und gleichzeitig einen Artikelwechsel verstehen. Ein Beispielsatz mit Übersetzung reicht dafür nicht.
- **Korrektur:** In Lektion 1 wird `ne … pas` zunächst zum Erkennen erklärt. Lektion 4 erklärt `n’` sowie `un/une/des → de/d’` bei verneinter Existenz. Lektion 8 wiederholt die konkrete Anwendung sichtbar vor dem ersten Quiz.
- **Neue Erklärung:** „Il y a bedeutet es gibt. Bei der Verneinung steht n’ vor y a und pas dahinter; aus un/une/des wird de. Verbinde positive und negative Ausstattung mit mais (aber).“
- **Beispiele:** „Il y a une cuisine. Il n’y a pas de balcon. Il y a un jardin, mais il n’y a pas de garage.“
- **Abgrenzung:** Nach `être` bleibt der Artikel erhalten: „Ce n’est pas un cours.“ Es wird keine falsche Universalregel „nach jedem pas steht de“ eingeführt.

### Wichtig: deutsche Personenformen werden vor ihrer Übersicht benötigt

- **Fundstellen:** `deutsch/question-content.js`, Lektion 1: „Ihr ___ zwei Kinder.“ → `habt`; frühe Übungen mit `sprichst/spricht`. Die bisherige haben-Übersicht ist erst Lektion 5; die eigene sprechen-Referenz erscheint innerhalb von Lektion 1 hinter den ersten Aufgaben.
- **Auswirkung:** Ein Anfänger soll eine unregelmäßige Form ableiten, obwohl die notwendige Grundlage noch nicht an der Reihe war.
- **Korrektur:** Der Einstieg von Lektion 1 zeigt Personalpronomen, regelmäßige Präsensbildung, Satz-/Fragewortstellung sowie die vollständigen Formen von `sein`, `haben`, `heißen` und `sprechen`. Die späteren Tabellen bleiben zur Vertiefung erhalten.
- **Beispiele:** „ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben“; „ich spreche, du sprichst, er/sie/es spricht, wir sprechen, ihr sprecht, sie/Sie sprechen“.

### Wichtig: Wunschformen, Stammwechsel und Anrede bei deutschen Anweisungen

- **Fundstellen:** Lektion 6 verlangt `wir hätten` und `möchten`, obwohl die Erklärung vor allem `ich hätte` / `ich möchte` zeigt. Lektion 11 prüft `du liest`; die deutlichere lesen-Übersicht stand erst in Lektion 21. Der Hard Mode von Lektion 9 fordert in der Musterantwort `Geh` und `Nimm`, während die eigene Erklärung vorwiegend `Gehen Sie` und `Nehmen Sie` vorbereitet.
- **Korrektur:** Die passende Lektion führt die benötigten Personenformen vorab ein. Lektion 9 stellt höfliche und vertraute Anweisungen gegenüber; `Bring … mit` bereitet auch die späteren Hörtexte vor. Lektion 11 erklärt ausdrücklich `e → ie` bei `du` und `er/sie/es` in `lesen`. Lektion 16 erklärt `dürfen` und `nicht dürfen` vor den entsprechenden Hörfragen.
- **Beispiele:** „Wir hätten gern zwei Kaffees.“ / „Du möchtest einen Tee.“ / „Du liest ein Buch.“ / „Gehen Sie geradeaus.“ gegenüber „Geh geradeaus.“ / „Nehmen Sie den Bus.“ gegenüber „Nimm den Bus.“

### Wichtig: unnötige deutsche Grammatikvorgriffe in Hörtexten und Musterantworten

Die geprüften Lektionen verlangen keine eigenständige Perfektbildung für diese Situationen. Die Informationen bleiben im Präsens verständlich; deshalb wurde der Text vereinfacht, statt eine weitere Grammatiklektion vorauszusetzen.

| Lektion | Bisher | Korrigiert |
|---|---|---|
| 7, Hörtext | Ich habe eine Hose für neunzehn Euro gefunden. | Hier ist eine Hose für neunzehn Euro. |
| 7, Musterantwort | Hast du die blaue Jacke in Größe M gesehen? | Hast du die blaue Jacke in Größe M? |
| 8, Hörtext | Ich habe ein Zimmer in Berlin gefunden. | Ich habe ein Zimmer in Berlin. |
| 13, Hörtext | Ich habe ein Doppelzimmer im Hotel Adler reserviert, ohne Frühstück. | Ich möchte ein Doppelzimmer im Hotel Adler, ohne Frühstück. |
| 18, Hörtext | Wenn Sie eine Frage haben, fragen Sie bitte. | Sie haben eine Frage? Fragen Sie bitte. |
| 21, Hörtext | Ich habe schon zwei Karten gekauft. | Ich habe schon zwei Karten. |

Die Änderung in Lektion 18 vermeidet zusätzlich einen nicht vorbereiteten Nebensatz. Hörskript und tatsächliche TTS-Sprechzüge wurden gemeinsam geändert. Die Fragen, Lösungen und bewerteten Sachinformationen bleiben gleich.

### Wichtig: französische Bausteine brauchen erkennbare Einführung

- **Lektionen 7/13:** `ce pantalon` / `cette taille` tauchen vor der vollständigen Demonstrativübersicht auf. Sie werden nun in Lektion 7 ausdrücklich als erste Bausteine eingeführt; die komplette Unterscheidung `ce/cet/cette/ces` bleibt in Lektion 13.
- **Lektion 13:** Der Wetterausblick nutzt `il va faire` und `il va y avoir`, bevor die ganze aller-Tabelle in Lektion 15 kommt. Der Einstieg erklärt jetzt klar `il va + Grundform` als ersten Zukunftsbaustein. Das verlangt noch keine Ableitung unbekannter aller-Personenformen.
- **Lektion 16:** `tu veux` wird jetzt zusammen mit den vouloir-Formen erklärt. Die frühere Formel `je voudrais` ist keine ausreichende Erklärung dieses unregelmäßigen Präsens.
- **Lektion 22:** Die bereits vorhandene e-/s-Regel war richtig. Ergänzt wurden die sichtbare Kombination `Elles sont arrivées` und die unregelmäßigen Partizipien `pris` / `fait`, die in Hör- und Checktexten vorkommen. `arrivées` ist kein eigener neuer Tempusfehler, sondern Anwendung zweier vorhandener Endungsregeln.
- **Lektion 23:** `couper → Coupez`, `ajouter → Ajoutez`, `mélanger → Mélangez` sowie `pour + Grundform` stehen jetzt gebündelt vor der Anwendung. Das ersetzt nicht den vorhandenen Rezeptteil.

## Übersicht Französisch A1

„Vorhanden“ bedeutet: fachlich nachvollziehbare Erklärung oder eingeführter Baustein gefunden. Der neue Einstieg bündelt auch solche Inhalte; das macht sie nicht rückwirkend zu einem bestätigten Inhaltsfehler.

| L. | Thema | Ursprüngliche Vermittlung / Befund | Vorbereitung im korrigierten Ablauf |
|---|---|---|---|
| 1 | Begrüßen, vorstellen | Personen und vier Verbtabellen vorhanden; Verneinung in Hard-Mode-Ablenkantworten nicht erklärt; Artikel erst später systematisch | Personenbezug, Artikel/Herkunftsbausteine und einfache Verneinung vor Quiz; Verbtabellen danach |
| 2 | Alphabet | pouvoir, Buchstabieren und Zeichen vorhanden; `ça s’écrit` als Wendung | Bitte + Infinitiv, Schreibweise und Zeichen vor Quiz; vollständige Vertiefung bleibt |
| 3 | Zahlen, Daten | avoir vorhanden, aber nach der ersten aktiven `tu as`-Lücke; Geburtsmonate vor Monatslektion | avoir/Alter, Geburtsformel und benötigte Monate vor Quiz |
| 4 | Zeit, Termine | Uhrzeit/Tage/Monate gut erklärt; verneinte Existenz im Hard Mode zu früh | `ne/n’ … pas`, `pas de/d’` vor Übungen; Uhrzeitregeln und Terminbausteine gebündelt |
| 5 | Familie | Vollständige Possessivtabelle einschließlich `leur/leurs` und Vokalregel vorhanden | Kompakte Wiederholung, Familienstand und Personenbeschreibung vor Quiz |
| 6 | Essen | Teilungsartikel und höfliche Bestellung vorhanden; prendre zunächst als Satzbaustein | Artikelkontrast und prendre-Formen ausdrücklich zusammengeführt |
| 7 | Einkauf | Mengen-de und Preise vorhanden; Demonstrativbausteine vor Gesamtübersicht | Mengen, Zahlen und Zahlweisen; `ce pantalon/cette taille` ausdrücklich als Bausteine |
| 8 | Wohnen | `il y a` und Orte vorhanden; verneinte Form wird im Check vorausgesetzt | Sichtbare positive/negative Existenzregel mit Artikelwechsel vor Quiz |
| 9 | Weg | Höflicher Imperativ und Richtungen vorhanden | Regel plus unregelmäßige `Allez/Prenez` ausdrücklich benannt |
| 10 | Arbeit | Regelmäßige Verben und `nous commençons` erklärt | Bildungsregel vor Quiz; `je dois faire…` als früher Baustein gekennzeichnet |
| 11 | Tagesablauf | Reflexivformen, `en train de`, Reihenfolge und `je me couche` vorhanden | Bezug zu prendre (L6), Tagesablaufbausteine und Vokalregel gebündelt |
| 12 | Gesundheit | `au/aux`, Symptome und Hilfsbitten vorhanden; Verneinung baut bislang auf späterer Regel auf | Nutzt nun Verneinung aus L4; Schmerzen, `chez`, Dauer und Einnahmeangaben erläutert |
| 13 | Wetter, Kleidung | Farbanpassung erklärt, Pluralformen ableitbar; Zukunft vor aller-Gesamttabelle | `il va + Infinitiv` erklärt; Farbreihen als e-/s-Anwendung sichtbar |
| 14 | Freizeit | Vorlieben, Verbgrundform und Artikel vorhanden; faire nicht als vollständige Übersicht | faire und préférer ausdrücklich im Einstieg; `on va…?` erklärt |
| 15 | Reise, Hotel | aller + Infinitiv vollständig erklärt | Bekannter Zukunftsbaustein wird auf alle Personen erweitert |
| 16 | Einladung | pouvoir gut vorbereitet; `tu veux` braucht eigenen Bezug zu vouloir | vouloir-Formen, Absage und Telefonbausteine vor Quiz |
| 17 | Formulare | quel/quelle und Nachrichtenbau vorhanden; Plural wird ebenfalls geprüft | Alle vier quel-Formen und ihre Bezugsnomen sichtbar; Schreibplan bleibt |
| 18 | Höflichkeit | Verneinung hier erstmals systematisch; Konditional ausdrücklich als Wendungen | Verneinung vertieft nun frühere Einführung; Höflichkeitsbausteine klar abgegrenzt |
| 19 | Artikel, Plural | Artikel-/Genus-/Pluralerklärungen vorhanden | Rückbezug zu L1; unveränderlicher Plural auf -s/-x/-z ausdrücklich erklärt |
| 20 | Verneinung, Regeln | `jamais`, `il faut`, Verbklammer vorhanden | Unterschied nicht/nie/Pflicht/Verbot vor dem ersten Quiz gebündelt |
| 21 | Fragen | Fragewörter, Inversion, Possessive und betonte Pronomen vorhanden | Referenzen und `combien de` ausdrücklich zusammengeführt |
| 22 | Vergangenheit | avoir/être, Endungen und Zeitbezüge vorhanden; einzelne unregelmäßige Partizipien nur im Kontext | `pris/fait`, weiblicher Plural und Zeitkontraste sichtbar erklärt |
| 23 | Rezepte | Mengenregeln und höflicher Imperativ vorhanden, mehrere Erklärungen verteilt | Zutaten, Zweck und drei Imperativformen vor Quiz gebündelt |
| 24 | Reise, Länder | Länderregeln und devoir vorhanden; `nous partons/restons/voulons` in Textbausteinen | Rückbezug auf vouloir (L16), vollständige partir-Formen, regelmäßige rester/rentrer |

## Übersicht Deutsch A1

Der Deutschkurs richtet sich an französischsprachige Lernende; seine neuen Erklärungen sind deshalb auf Französisch, die Beispiele auf Deutsch.

| L. | Thema | Ursprüngliche Vermittlung / Befund | Vorbereitung im korrigierten Ablauf |
|---|---|---|---|
| 1 | Vorstellen | haben-Check vor haben-Lektion; sprechen-Referenz hinter ersten Formenfragen | Personen, regelmäßige Formen sowie sein/haben/heißen/sprechen vor Quiz |
| 2 | Alphabet | Zeichen und vollständige können-Tabelle vorhanden | Bitte, Modalrahmen und Zeichen vor Quiz gebündelt |
| 3 | Zahlen, Daten | Zahlenbildung vorhanden; Datumsformen überwiegend als Beispiel | Ordinalbildung, Ausnahmen, `der/am`, Jahreszahl und Felder ausdrücklich erklärt |
| 4 | Zeit, Termine | am/um/im, Tage und Monate vorhanden; `nicht/keine Zeit` vor späterer Verneinungslektion | Frühe Verneinung und Treffbausteine im Einstieg |
| 5 | Familie | Possessive und haben vorhanden | Rückbezug auf haben (L1); Akkusativ bei haben sowie `mit meiner Frau` erklärt |
| 6 | Essen | Akkusativ vorhanden; Einzelform `ich hätte` reicht nicht für `wir hätten` | Wunschformen für alle Personen; Bezahlen und Artikelkontrast ausdrücklich |
| 7 | Einkauf | Preis-/Mengenregeln vorhanden; neue Farben und Perfektvorgriff im Hard Mode | Farbgruppen eingeführt, Perfekt im Hörtext und Muster ersetzt |
| 8 | Wohnen | Akkusativtabelle vorhanden; kein/keinen nicht zusammenhängend erklärt; Perfekt im Hörtext | Nominalverneinung und `mit zwei Zimmern`; Präsens-Hörtext |
| 9 | Weg | Höflicher Imperativ vorhanden; Hard-Mode-Muster nutzt vertraulichen Imperativ | Sie/du-Kontrast, `Geh/Nimm/Bring`, fahren-Stammwechsel und mit + Datif |
| 10 | Arbeit | Arbeitskontext und V2 vorhanden | Zusätzliches e bei arbeiten ausdrücklich begründet; Verspätungsbausteine |
| 11 | Schule | Regelmäßige Verben vorhanden; `du liest` vor der lesen-Übersicht in L21 | Vollständige lesen-Formen mit Stammwechsel, seit + Dauer, mitbringen |
| 12 | Freizeit | gern/lieber und Treffbausteine vorhanden | Regelmäßiges spielen und `Wollen wir…?` ausdrücklich als Vorschlag |
| 13 | Reise, Hotel | Trennbare Verben vorhanden; fahren-Stammwechsel nur indirekt; Perfekt-Hörsatz | Rückbezug auf fahren (L9), Datumszeitraum, Hörsatz im Präsens |
| 14 | Gesundheit | haben/sein und seit erklärt | Zeitdauer im Präsens und `seit zwei Tagen` begründet; kein neues Tempus nötig |
| 15 | Einladung | `ich muss` und mitbringen als Bausteine vorhanden | müssen-Formen und Rahmen, `Soll ich…?`, Anrede und Gruß erläutert |
| 16 | Hinweise | verboten/erlaubt vorhanden; `darf ich/darf man` braucht Modalbezug | dürfen-Formen und Unterschied Verbot/fehlende Verpflichtung eingeführt |
| 17 | Höfliche Bitten | mir/mich und Infinitivstellung vorhanden | Verben ihren Pronomen zugeordnet; `nett` erklärt |
| 18 | Prüfungsablauf | Imperativ, trennbares ankreuzen und V2 vorhanden; Wenn-Satz im Hörtext | Verben und Reihenfolge zusammengeführt; unnötiger Nebensatz vereinfacht |
| 19 | Körper | tut/tun und Besitzbezug vorhanden | Singular/Plural, Körperteile und Bezug zu helfen (L17) sichtbar |
| 20 | Wetter, Kleidung | Wetter, Akkusativ und mitnehmen vorhanden | `Nimm … mit` mit L9 verknüpft; `eine warme Jacke` als nützlicher Baustein |
| 21 | Kultur | lesen erst hier deutlich, aber L11 fragt es bereits ab; Perfekt-Hörsatz | lesen nun schon L11; Karten/Eintritt/ins erklärt, Hörsatz im Präsens |
| 22 | Telefon | zurückrufen und dir/Ihnen vorhanden | Imperativ ruf/rufen Sie und Rückbezug auf mir/mich ergänzt |
| 23 | Verwaltung | anmelden/ausfüllen vorhanden, aber Muster allein erklärt den Formwechsel nicht | `ich möchte mich anmelden`, trennbares ausfüllen und Felder ausdrücklich erklärt |
| 24 | Wiederholung | bekannte Formen und Nachrichtenbau vorhanden | Rückbezug auf L1, und/aber und Satzbau gebündelt; keine neue Pflichtgrammatik |

## Umsetzung und Schutz vorhandener Lernstände

- Neue Lehrtexte: `shared/lesson-foundations.js`; Einbindung nur in `francais/index.html`, `deutsch/index.html` und deren Lektionsabläufe.
- Die Vorbereitung erscheint sichtbar vor `#startQuiz`. Auf Grammatikseiten ist sie eine eigene, per Tastatur bedienbare Aufklapphilfe. Sie wird nicht als zusätzlicher Grammatikabschnitt und nicht als Fragenquelle eingelesen.
- Vorhandene Aufgaben, Themen-IDs, Lektionsnummern, Bestehensgrenzen und Abschlussbedingungen bleiben unverändert. Lernstände werden nicht zurückgesetzt.
- Die fünf geänderten deutschen Hard-Mode-Datensätze haben Version 3; die bisherigen Version-2-Texte bleiben für frühere Ergebnisse verfügbar. Version 2 bleibt für bestandene Leistungen kompatibel. Bei einem noch laufenden alten Versuch nutzt die vorhandene Migration einen archivierten Stand und setzt für geänderte Aufnahmen das Hörlimit neu; unveränderte Antworten bleiben zugeordnet.
- Die neuen deutschen Erklärungstexte im Französischkurs besitzen englische Anzeigeübersetzungen. Französische Zielformen werden beim Sprachwechsel nicht übersetzt.
- Beide Service Worker enthalten die neuen Dateien und eine neue Cacheversion. Die Umsetzung benötigt keine kostenpflichtigen Dienste.

## Verifikation und Grenzen

**Im Code geprüft:** die Datenquellen, erzeugten Aufgabenpools und zeitliche Zuordnung in beiden A1-Kursen. Der Bericht dokumentiert den fachlichen Befund je Lektion; er ist kein automatischer Beweis, dass jedes mögliche Verständnisproblem eines Lernenden ausgeschlossen wäre.

**Automatisch geprüft:** neue Regressionstests für die tatsächliche Reihenfolge in allen 48 Lektionen, den Zugriff auf die Regeln auf jeder Grammatikseite, unveränderte Themen-/Fortschrittsstruktur, konkrete Problemformen, englische Anzeigetexte, versionierte Hörtexte und passende Offline-Assets. Die bestehende gezielte Prüfgruppe für Checks, Grammatik, Hard Mode, Wiederholung, Bewertung und Vokabeltrainer bestand mit den ersten acht neuen Tests: 208 bestanden, 0 fehlgeschlagen. Nach Ergänzung eines weiteren Migrationstests bestanden alle neun neuen Tests erneut. Damit sind 209 verschiedene Tests erfolgreich ausgeführt. Auch der archivierte Wortlaut der fünf Version-2-Datensätze wurde mit dem geprüften Ausgangsstand verglichen: exakt gleich. Das ist keine Behauptung über sämtliche historischen Tests des Repositories.

**Praktisch im Browser geprüft:** alle 48 Lektionen in lokalem Chromium, jeweils Einstieg vor Quiz und erreichbare Grammatik. Zusätzlich beide Kurse bei 320, 390 und 1280 Pixeln, im hellen und dunklen Design: kein horizontaler Überlauf; die Regelhilfe öffnet per Tastatur. Der Französischkurs wechselt die neuen Hinweise zwischen Deutsch und Englisch und wieder zurück. Die mobilen Ansichten wurden auch anhand von Screenshots angesehen. Keine JavaScript-Seitenfehler im Browserlauf. Anmeldung und Streak wurden für diesen lokalen Test ersetzt; ein echter angemeldeter Produktionslauf wurde damit nicht behauptet.

**Nicht verifiziert:** tatsächliche Aussprache und Stimmenqualität auf dem Gerät des Nutzers; nachhaltiger Lernerfolg mit echten Anfängern; offizielle Gleichwertigkeit mit einer telc-/DELF-Prüfung. Es wurde kein neues offizielles Prüfungsbeispiel herangezogen. Wer Erklärungen überspringt oder gezielt direkt einen Check öffnet, wird nicht durch eine zusätzliche Lesesperre aufgehalten.

## Größter Nutzen

1. Verneinung im Französischen vor dem ersten relevanten Auftreten statt erst in Lektion 18 erklären.
2. Unregelmäßige deutsche Personenformen an ihren ersten tatsächlichen Prüfzeitpunkt ziehen.
3. Zwischen vollständiger Regel und bewusst eingeführtem A1-Satzbaustein unterscheiden.
4. Unnötige Tempus-/Nebensatzvorgriffe in deutschen Hörtexten und Musterantworten entfernen.
5. Die Reihenfolge für alle 48 Lektionen praktisch und mit Regressionstests absichern, ohne Lernstände zu entwerten.
