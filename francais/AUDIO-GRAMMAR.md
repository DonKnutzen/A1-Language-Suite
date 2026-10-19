# Audio und intensive Grammatikübungen

Geprüfter Ausgangsstand: `main` bei `22d1a096c61672dd26e4c489a857c5c661616646`, 19.10.2026. Änderungen betreffen ausschließlich `francais/`; die gemeinsamen Komponenten und andere Kurse bleiben unverändert.

## Hörverstehen

Hard Mode verwendet jetzt Tempo 75 % und drei Wiedergaben je Text. Anzeige, Sperre, gespeicherte Zähler und Fehler-Rückerstattung verwenden dieselbe Grenze. Das gilt auch für noch gespeicherte ältere Versuche. Die Bestehensgrenzen bleiben unverändert. Neue Hard-Mode-Versuche verwenden Inhaltsversion 3; v1/v2-Datensätze und gespeicherte Antworten bleiben für bestehende Versuche verfügbar. Die Lückentexte wurden nicht umsortiert. Erreichte v2-Trainingsziele bleiben gültig, da abgefragte Fakten, Lösungen und Bestehensgrenzen gleich bleiben.

Der normale Gesprächsspieler gibt im bisherigen Code bereits 0,75 an die Sprachausgabe weiter. Die gemeldete tatsächliche Geschwindigkeit ließ sich in dieser Umgebung nicht akustisch reproduzieren, weil der Browser keine Sprachstimmen anbietet. Der französische Spieler setzt deshalb ausdrücklich 0,75 bzw. 1 auf jeder Äußerung, unabhängig von gespeicherten Stimmeinstellungen und Apple-Vorgaben. Bei 75 % setzt er zusätzliche Pausen an Satz-/Teilsatzgrenzen. Umschalten während der Wiedergabe startet das Gespräch sofort im gewählten Tempo neu. Die Auswahl wird pro Lektion gespeichert.

Telefonnummern werden als einzelne Zahlenpaare gesprochen. Kanadische Postleitzahlen werden in sechs Zeichen zerlegt, Buchstabierungen verwenden französische Buchstabennamen einschließlich Akzent/Cedille. Diese Teile werden zusätzlich verlangsamt (höchstens 0,65) und durch 550-ms-Pausen getrennt. Die Pause ist eine wirkliche Wiedergabepause, keine Hoffnung auf die Wirkung eines Kommas. Stoppen, Navigation oder anderes Audio verwerfen die noch wartenden Teile.

Die 24 normalen Dialoge wurden redaktionell auf Gesprächszusammenhang überarbeitet, ohne die sechs abgefragten Fakten zu ändern. Beispielsweise fragt die Wohnungsinteressentin nun ausdrücklich nach der Lampe auf dem Foto; statt vom Beruf unvermittelt zur Kurszeit zu springen, folgt eine Rückfrage zum Abendunterricht. Die Kontakt-Daten-Szenen im Hard Mode erhalten zusammenhängende Frage-/Antwortfolgen. Echte Monologe bleiben als Nachricht/Ansage gekennzeichnet; sie werden nicht als Zwei-Personen-Gespräch ausgegeben. Verschiedene Stimmen sind nur möglich, soweit das Gerät sie anbietet.

## Grammatik

Die bisherige Begrenzung auf sechs Aufgaben pro Vertiefungsrunde entfällt. Jede Runde enthält alle vorhandenen unterschiedlichen Formaufgaben; identische vorgelesene Lösungssätze werden nicht als vermeintlich zusätzliche Abdeckung verdoppelt. Ergänzende Bedeutungsfragen werden näher nach Satzbau und gemeinsamem Wortschatz ausgewählt. Bei Formaufgaben werden ähnliche vorhandene Formen bevorzugt; es werden keine beliebigen neuen Verbformen erfunden. Mehrere besonders schwache Satzalternativen wurden durch thematisch nahe Antworten ersetzt. Erklärende deutsche Tabellenspalten werden nicht mehr als französische Audioantworten behandelt.

Die Possessivübungen in Lektion 5 und 21 umfassen **24 Aufgaben**: 18 Tabellenfelder (sechs Besitzergruppen × maskulin/feminin/Plural) sowie sechs Anwendungen zu mon/ton/son amie, leur/leurs und dem Bezug auf das besessene Nomen. Die 18 Felder sind keine 18 verschiedenen Wortformen: notre und votre sind zum Beispiel für beide Geschlechter gleich. Der Kontext benennt den Besitzer eindeutig. Es gibt jeweils eine richtige Lösung, nicht mehrere zufällig passende Possessivformen.

Familienbeschreibung/C’est/Ce sont in Lektion 5 und die Farb-Adjektivangleichung in Lektion 13 erhalten jeweils zwölf Formaufgaben. Die anderen Themen verwenden ihre vorhandene Formenabdeckung vollständig. Bereits gestartete kürzere Runden behalten Fragen und Punkte; eine neue Runde verwendet den erweiterten Bestand. Die französischen Lektionschecks und der normale Kursabschluss ändern ihre Regeln nicht.

## Prüfung und Grenzen

Die Regression umfasst vollständige Hard-Mode-Durchläufe aller 24 Lektionen, gespeicherte v2-Versuche mit drei Wiedergaben, 75/100-Weitergabe an die tatsächlichen SpeechSynthesisUtterance-Objekte mit Desktop-/Apple-Kennung und gespeicherter Rate 1,1, Zahlen-/Buchstabensegmentierung, echte Pausenplanung, Abbruch und idempotente Fehler. Alle Grammatikpools der Lektionen 2–24 werden auf eindeutige Optionen, gültige Lösungen und Formenabdeckung kontrolliert. Beide Possessivthemen werden auf sämtliche 18 Felder und Sonderfälle geprüft; eine vollständige 24-Fragen-Runde einschließlich Unterbrechen/Fortsetzen läuft im DOM durch.

Eine technische Prüfung von Rate, Reihenfolge und Pausen beweist keine korrekte Aussprache oder gute Verständlichkeit jeder auf dem Nutzergerät installierten Stimme. Die echte Audioqualität bleibt hier ausdrücklich ungeprüft. Alle Änderungen verwenden kostenlose Browserfunktionen und lokale Daten.

46 Tests und der gezielte Chromium-Durchlauf waren erfolgreich. Der Browserdurchlauf prüft die tatsächlich weitergereichten Tempi, drei Hard-Mode-Wiedergaben und den mobilen 24-Aufgaben-Dialog samt EN-Wechsel mit kontrollierter Sprachausgabe, nicht die akustische Qualität.
