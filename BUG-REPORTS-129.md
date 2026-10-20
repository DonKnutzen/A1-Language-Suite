# Abgleich der neun gemeldeten Aufgaben

Ausgangsstand: `main`, Commit `1e0f5b02ab3bf47a2658bf0e777383535ef729bc`.
Grundlage: der bereitgestellte Export mit neun Meldungen. Der Export und die Meldungsdatenbank werden nicht verändert.

| Meldung | Ergebnis des Abgleichs |
| --- | --- |
| `e4d86a68-ccb1-4182-b154-54e736feeac8` · Französisch 3 | Ersetzt: Statt des zweiten Zahlenpaars der Telefonnummer wird eine Hausnummer aus einer ausdrücklich erfragten Adresse verstanden. Zahlen und die Frage nach der Adresse sind bereits Lernstoff. |
| `1555c97a-1e53-4db8-b0e2-855ba9519eb7` · Französisch 3 | Bereits umgesetzt: sechs getrennte Zeichen der kanadischen Postleitzahl, höchstens Tempo 0,65 und 550 ms Pause zwischen den Zeichen. |
| `a0849f8e-a014-4e12-9a6f-71ade3bf84d3` · Französisch 2 | Ersetzt: „Was soll François wiederholen?“ prüft die gehörte Bitte und die Unterscheidung von Vorname, Nachname und Alphabet. Die isolierte Frage nach dem ersten Buchstaben entfällt. |
| `4776b626-9222-40bc-bb6a-544ba17503e0` · Französisch 1 | Bereits ersetzt: Der neue Lektionscheck prüft eine passende Antwort auf „Comment allez-vous ?“ mit ähnlichen Antwortsätzen. |
| `4bb7bb83-3dab-4d3f-88e7-9f123e046e03` · Französisch 1 | Bereits ersetzt: Herkunft und Wohnort werden im neuen Check anhand einer gemeinsamen Situation unterschieden. |
| `14d38d10-cee5-44f6-94c5-e8bee289a42a` · Französisch 1 | Bereits ersetzt: Die beanstandete Übersetzungsfrage mit Grußformeln als Ablenkantworten ist nicht mehr Teil eines neuen Lektionschecks. |
| `f3477c2a-4624-4177-bd15-aa974cdd8672` · Französisch 1 | Präzisiert: „Sie sind Deutscher. (Höfliche Anrede an einen Mann.)“ macht den Bezug von vous und allemand eindeutig. „Vous êtes allemand“ ist in dieser Situation korrekt. |
| `f52b16ea-3ac9-410c-9633-55f63f8c4383` · Deutsch 3 | Korrigiert: 10115 statt 12345, einschließlich Lernbeispiel und Formular/Musterlösung. Gespräch und Lösungsaudio nennen die Ziffern einzeln. Auch der allgemeine deutsche Audiobutton wandelt eine mit „Postleitzahl“ bezeichnete fünfstellige Zahl in einzelne Ziffernwörter um. |
| `b87864a7-68fd-457f-b7e5-179280a36f16` · Deutsch 1 | Bereits umgesetzt: Die gehörte Frage lässt sich vor und nach einer Antwort beliebig erneut abspielen, auch nach Fortsetzen. Wiedergabe verändert keine Punkte. |

Die französischen Auswahlfelder bleiben an ihren bisherigen Positionen. Gespeicherte, nun ungültige Antworten der zwei ersetzten Fragen werden vom vorhandenen Spieler geleert. Die anderen Antworten, Bestwerte und der erreichte Lektionsabschluss bleiben erhalten. Begonnene Lektionschecks behalten ihren gespeicherten Aufgabenbestand; neue Versuche verwenden den überarbeiteten Bestand.

## Prüfung

57 gezielte Tests bestehen: sämtliche Tests unter `francais/tests/`, `tests/french-listening.test.cjs`, `tests/german-audio.test.cjs` und `tests/reported-exercises.test.cjs`. Die neuen Regressionen prüfen insbesondere alte Antworten auf ersetzte Fragen, erneute Abgabe, gespeicherte Ergebnisse, deutsche Postleitzahlen im Gespräch und in der Lösung sowie die mehrfach abspielbare gemeldete deutsche Frage ohne doppelte Wertung.

Chromium prüft zusätzlich den tatsächlichen mobilen Ablauf und Neuladen mit kontrollierter Sprachausgabe. Der bestehende Browserdurchlauf für 75/100 %, drei Hard-Mode-Wiedergaben und die 24 Aufgaben zu Possessivbegleitern bleibt erfolgreich. Das ist keine akustische Prüfung: Klang und Verständlichkeit der tatsächlich auf einem Nutzergerät installierten Stimme bleiben ungeprüft. Alle Lösungen verwenden kostenlose Browserfunktionen.

Beleg für die gewählte deutsche Postleitzahl: [Adressverzeichnis des Bezirks Mitte auf berlin.de](https://www.berlin.de/stk-mitte/unsere-stadtteilkoordinationen/stadtteilkoordinations-finder/?ipp=100&page=1&postleit=10115).
