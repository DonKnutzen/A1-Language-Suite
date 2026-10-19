# Lektionscheck: vielfältige Anwendung statt doppelter Abfrage

Ausgangspunkt: `main` bei `ee0f1e24116d7f560774184fe6256d33d2fdd2c0`, geprüft am 19.10.2026. Nur Français A1 wurde geändert.

## Bestätigte Ursachen

- `makeLessonTest()` kombinierte die bereits bekannten Quizfragen mit zusätzlichen Grammatikaufgaben. Dadurch wurden beispielsweise die Kaffeebestellung, die Bedeutung von „ledig“, Preisfragen und identische Verneinungen mehrfach abgefragt, teils nur als Übersetzung in Gegenrichtung.
- Die bisherige Entzerrung verglich vor allem identische Antworten und Audios, nicht das wiederholte Muster.
- `runTasks()` mischte den fertig geordneten Check erneut. Die geplante Reihenfolge war deshalb im tatsächlichen Ablauf nicht verlässlich.
- Manche Ablenkantworten waren offensichtlich sachfremd oder unnatürlich, zum Beispiel „Je suis un café“ bei einer Bestellung oder „Je suis un médicament“ bei der Apotheke. Die weiterhin für andere Übungen vorhandenen Ausgangsfragen wurden nicht pauschal verändert.
- Bei Auswahlaufgaben verglich der Ablauf Antworten ohne Akzente. Dadurch konnten Zoé/Zoè/Zoê zusammenfallen. Auswahlwerte werden jetzt exakt in Unicode-Normalform verglichen; die tolerante Prüfung getippter normaler Grammatikantworten bleibt getrennt davon.

## Änderung

`mastery-specs.js` enthält einen eigenen redaktionell formulierten Bestand für die 24 Lektionschecks. Die 192 Kontextaufgaben ersetzen im Lektionscheck das direkte Wiederverwenden des normalen Zehn-Fragen-Quiz. Jede Aufgabe besitzt einen eindeutigen Schwerpunkt, plausible Alternativen und eine kurze Erklärung. Die Inhalte unterscheiden unter anderem Herkunft und Wohnort, Lieblingsgericht und heutige Bestellung, Personen- und Nächtezahl, Beginn und Ende einer Tätigkeit, Korrekturen, Verneinungen und Personenbezüge.

Die Auswahlantworten sind bei Bedeutungsfragen möglichst alle natürlich formuliert und aus demselben Alltagsthema. Bei ausdrücklich geprüfter Schriftform/Grammatik dürfen Ablenkantworten typische Lernfehler enthalten. Es gibt immer eine nach dem genauen Auftrag richtige Antwort. Die situativen Fragen verlangen überwiegend Anwendung statt bloßer Einwortübersetzung. Das bleibt ein normaler A1-Lektionscheck; der umfassendere dreiteilige Hard Mode ist unverändert.

Aus dem Grammatikbestand werden ergänzend eigenständige Tippaufgaben gewählt: höchstens zwei verschiedene Antworten desselben Musters, in Lektion 1 eine pro Verbgruppe. Das verhindert komplette Konjugationsblöcke im gemischten Check. Wo nötig wurden sinnvolle produktive Aufgaben ergänzt, etwa aux dents, à la gare, par carte und Formularangaben. Die vollständige wiederholte Formenübung bleibt in der Vertiefung und im Hard Mode möglich. Der Umfang folgt den vertretenen Gruppen und liegt aktuell bei 10–16 Aufgaben; keine Laufzeitregel füllt auf eine starre Gesamtzahl auf.

Die Reihenfolge berücksichtigt die letzten drei Fragen: gleicher Schwerpunkt, gleiche Antwort, sehr ähnlicher Satz und einseitige Aufgabenart werden auseinandergezogen. Der Einstieg und die ausgewählten Grammatikformen variieren zwischen neuen Versuchen. Diese Reihenfolge und die Positionen der Antwortoptionen bleiben nach Start gespeichert und werden beim Fortsetzen nicht neu gemischt.

Bereits laufende Versuche behalten ihren gespeicherten Aufgabenstand, Antworten und Punkte. Ein kurzer Hinweis erklärt dort, dass die neuen Fragen beim nächsten Versuch erscheinen. Bestwerte und die Freischaltung des Hard Mode ab 80 % werden weiterverwendet. Es gibt keine neue kostenpflichtige Abhängigkeit.

## Prüfung

```sh
node --test francais/tests/*.test.cjs tests/french-listening.test.cjs
```

Die ergänzende Suite prüft alle 24 Checks mit mehreren Zufallsfolgen auf eindeutige Aufgaben/Antworten und auf direkt benachbarte Wiederholungen von Antwort oder Muster. Sie beantwortet außerdem alle 24 Checks vollständig im DOM, unterbricht und setzt jeden fort und kontrolliert 100 %, genau eine Abschlusszählung und das unveränderte gespeicherte Fragen-/Optionsformat. Weitere Gegenbeispiele prüfen Akzent-Auswahlwerte und Variation neuer Versuche. Diese Tests beweisen nicht die sprachliche Qualität von Ablenkantworten; die Texte wurden zusätzlich redaktionell geprüft.

38 Tests laufen erfolgreich. Die englischen Fragen, Auswahltexte und Erklärungen sind ergänzt; die Übersetzung verändert weder französische Antwortwerte noch gespeicherte Auswahlpositionen. Die bestehende Suite für normale Übungen, Unterbrechung, alte Versuche und Hard Mode bleibt Teil der Regression. Eine Browserprüfung des normalen Lektionschecks einschließlich Freischaltung, Startseiten-Fortsetzung, Sprachwechsel und Neuladen ergänzt die DOM-Tests. Sprachqualität, zufällige Variation und Lernwirksamkeit sind unterschiedliche Prüfgegenstände; die Verbesserung der Lernwirksamkeit ist ohne Lernerstudie nicht empirisch belegt.
