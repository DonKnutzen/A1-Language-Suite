# Fachliche und funktionale Prüfung des Hard Mode

Geprüfter Ausgangsstand: `27a712e2dc43f878b3537b3d872cb6c23baddeb4` auf `main`, 19. Oktober 2026. Dieser Bericht beschreibt zunächst die Befunde vor der Korrektur; die abschließende Umsetzung und Validierung werden unten dokumentiert.

## Gesamturteil

Die Dreiteilung, selbst eingegebene Antworten und kurzen Alltagstexte sind eine brauchbare Grundlage für anspruchsvolles A1-Training. Die Erstfassung weist jedoch noch keine vollständige Abdeckung der tatsächlich vermittelten Lernziele nach. Besonders die stets gleiche richtige Auswahlposition, ungeeignete Antwortnormalisierung und ein reproduzierbarer Fehler beim Wechsel der Inhaltsversion beeinträchtigen die Aussagekraft. Eine feste Zahl von 15–18 Aufgaben ist dafür kein geeignetes Qualitätsziel. Der Umfang muss aus den wesentlichen Fähigkeiten der jeweiligen Lektion folgen.

Die französischen Musterantworten sind überwiegend grammatisch richtig und verständlich. Größere Probleme sind fehlende Prüfhandlungen, einzelne nicht vorbereitete Formen und kontextlose Satzreihen. Der rote Einstieg kann erhalten bleiben; ein grundlegender Neuentwurf ist nicht erforderlich.

## Prüfgrundlage und Grenzen

Gelesen wurden alle 24 Datensätze einschließlich Lücken, Hinweise, Hörskripte, Auswahlantworten, Lösungen, Schreibaufträge und Musterantworten. Der Abgleich berücksichtigt `data.js`, die tatsächlich eingebundenen `GRAMMAR_GUIDES` und `LESSON_GRAMMAR_REFS` in `app.js`, `lesson1-practice.js`, `deepening-content.js`, `mastery-specs.js` sowie die eingebundenen Hinweise aus `shared/lesson-topic-info.js`. Eine reine Suche nach Wörtern wäre dafür unzureichend: Beispielsweise zeigt die Grammatikseite von Lektion 5 bereits die ganze Possessivtabelle.

Das bereitgestellte telc-Français-A1-Beispiel, Ausgabe 2016, dient als Einordnung: kurze Alltagskommunikation, selektive Hörinformationen und eine Nachricht mit drei Inhaltspunkten und ungefähr 30 Wörtern (S. 15). Das Bewertungsbeispiel toleriert verständliche A1-Fehler (S. 27). Daraus folgt weder eine offizielle Gleichwertigkeit noch eine Zertifizierung.

Code und DOM-Gegenbeispiele wurden praktisch geprüft. Der Ausgangsstand wurde im echten Chromium-Browser auf Desktop und mit 320 px Breite durchlaufen; die gezielte Barrierefreiheitsprüfung des Hard-Mode-Bereichs meldete bei Lückentext und Hören keine axe-Verstöße. Das beweist weder vollständige Barrierefreiheit noch gute Didaktik. Die tatsächliche Audioqualität bleibt ungeprüft: Der verfügbare Browser meldet **null Sprachausgabestimmen**. Hörlimits und Fehlerzustände lassen sich mit kontrollierten Ersatzsignalen prüfen, Aussprache, Pausen und Verständlichkeit damit nicht.

## Übersicht aller Lektionen

Alle Zeilen wurden textlich mit den Unterrichtsinhalten abgeglichen. Die Spalte nennt die wesentlichen lokalen Befunde; die übergreifenden Bewertungs- und Zustandsfehler betreffen zusätzlich alle Lektionen.

| L. | Thema | Wesentliche Auffälligkeit / notwendige Prüfhandlung |
|---|---|---|
| 1 | Vorstellung | Begrüßung, Befindlichkeit und angemessene Reaktion werden kaum aktiv geprüft; Verbformen sind nur punktuell vertreten. |
| 2 | Buchstabieren | Akzent/Cedille werden trotz ausdrücklichem Auftrag nicht verbindlich bewertet; die tatsächlich vermittelte pouvoir-Tabelle bleibt fast ungeprüft. |
| 3 | Zahlen und Daten | Telefon und Alter passen. Gesprochene 69003 und 1996 setzen Zahlwörter jenseits des eingeführten Bereichs bis 100 voraus. Zahlbildung benötigt mehr kontrastive Beispiele. |
| 4 | Termine | Halb/Viertel vor werden erfasst; Singular heure, Mittag/Mitternacht und ein vollständiger Termin mit Datum sind nicht ausreichend gefordert. |
| 5 | Familie | C’est/Ce sont und Besitzwechsel aus der tatsächlichen Grammatikseite fehlen weitgehend als Prüfhandlung. Die Personenreferenz bei „Nous avons…“ bleibt lose. |
| 6 | Restaurant | Teilungsartikel werden sinnvoll getippt; die Vorliebe und die passende Reaktion auf eine Bestellfrage brauchen zusätzliche Evidenz. |
| 7 | Einkauf | Preise und Mengen sind brauchbar; de/d’ und Bezahlvarianten sollten gezielt unterschieden werden. 10,5 wird trotz gleichen Geldbetrags wie 10,50 abgelehnt. |
| 8 | Wohnen | Einige Lagewörter sind erfasst, sur/sous und aux fehlen. Eine präzise Raum-/Möbelbeziehung kann besser geprüft werden. |
| 9 | Weg | Die Schreibvorlage verlangt „va/tourne“, obwohl die Lektion die vous-Imperative vermittelt. Die Prüfaufgabe sollte diese gelehrten Formen nutzen. |
| 10 | Arbeit | „sans article“ verrät die Berufsregel. Nous commençons mit ç fehlt. „Je suis un médecin“ darf nicht pauschal als grammatisch falsch gelten. |
| 11 | Tagesablauf | Alle sechs Reflexivformen werden geprüft. Dagegen verlangt „en ___ de“ nur das Wort train und keine Bildung der Gesamtkonstruktion. |
| 12 | Gesundheit | Beschwerden und Termin sind verständlich. aux dents, Hilfsbitte und die eingeführte Häufigkeitsangabe in der Apotheke brauchen eigene Prüfhandlungen. |
| 13 | Wetter/Kleidung | Demonstrativformen sind vorhanden. Adjektivstellung wird nur gezeigt; die freie Nachricht erzwingt keine passende Kleidungsbeschreibung. |
| 14 | Freizeit | ne…jamais erscheint vor seiner Einführung in Lektion 20. „mon frère“ wird bei einer Frage über Marc akzeptiert, obwohl das ohne Zitat den Bezug verändert. |
| 15 | Hotel/Reise | Alle aller-Personen sind im Lückentext vertreten. Die Reservierung braucht konkrete Aufenthaltsdaten und die selbst formulierte Abfahrtsfrage. |
| 16 | Einladen | pouvoir ist vollständig vertreten. „On pourrait y aller“ verlangt vor Lektion 18 eine noch nicht eingeführte höfliche Form. Kompliment/Glückwunsch bleiben schwach vertreten. |
| 17 | Formular | Signature wird erwähnt, aber nicht geprüft. Eine kurze Formularübertragung und das Startdatum der Informationsanfrage fehlen als konkrete Handlung. |
| 18 | Höflichkeit | Höfliche Formen sind passend. Die Position der ganzen Verneinung wird überwiegend vorgegeben, statt selbst gebildet zu werden. |
| 19 | Artikel/Plural | l’, les und Pluralbildung brauchen mehr eigene Eingaben. Voici/voilà stehen im Text, ohne eine Entscheidung des Lernenden zu verlangen. |
| 20 | Präsens/Negation | Sechs Verbformen sind vertreten. ne…pas/jamais sind schon fertig eingesetzt; damit ist gerade die Negationsbildung zu schwach geprüft. |
| 21 | Fragen/Besitz | est-ce que, mehrere zentrale Fragewörter und die betonten Pronomen werden nur zum kleinen Teil produktiv geprüft. „ma sœur“ ist als Antwort über Julie unklar/falsch bezogen. |
| 22 | Zeitformen | Die wichtigsten Zeiten sind vorhanden. Auxiliarwahl, être-Pluralangleichung und der Gegensatz il y a/dans/depuis benötigen kontrastive, selbst einzutragende Lösungen. |
| 23 | Rezept | beaucoup de und der Zweckausdruck werden nicht ausreichend gebildet. Die Vorlage wechselt zu nicht vorbereiteten tu-Imperativen; eine kalte Salatvorlage wäre als Kurzrezept vollständig ausführbar. |
| 24 | Länder/Pläne | Die Herkunftsformen de/d’/des sowie das Stadtziel à bleiben weitgehend ungetestet. Je/elle bei devoir werden nur in Hörtext/Muster erwähnt. |

## Priorisierte Befunde und konkrete Korrekturen

### Dringend – bestätigte Fehler

**F1 – Vorhersehbare richtige Auswahlposition.** In `hard-mode-content.js` liegt bei allen 48 Auswahlfragen die richtige Antwort an Index 1. Beispiel: L1/Hörtext 1, „Luc vient de Paris et habite à Berlin.“ Der gesamte Auswahlanteil ist ohne Hörverständnis lösbar. Korrektur: Antwortreihenfolge je Versuch mischen, im Versuch speichern und beim Sprachwechsel/Neuladen unverändert wiederherstellen. Die Kontrolle muss über Antwortwerte, nicht über einen festen Index erfolgen.

**F2 – Falscher Bewertungsmaßstab für Schriftmerkmale.** `matches()` entfernt grundsätzlich Akzente. „Zoe“ besteht die ausdrücklich verlangte Akzentaufgabe mit Lösung „Zoé“, „Francois“ die Cedille-Aufgabe. Korrektur: aufgabenbezogene Prüfregeln. Bei ausdrücklichem Buchstabieren/Akzentauftrag muss beispielsweise **Zoé** bzw. **François** stehen; bei einer gewöhnlichen Hörfrage darf „medecin“ als verständliche Wiedergabe von „médecin“ gelten. E-Mail-Adressen müssen ohne Entfernen von Akzenten geprüft werden.

**F3 – Versionsschutz durch Sprachwechsel umgehbar.** Nach einem Versuch mit abweichender Inhaltsversion zeigt `render()` zunächst den alten Text. Ein `a1suite:languagechange` ruft danach `draw()` mit den neuen Aufgaben auf; der Versionshinweis verschwindet. Das wurde im DOM reproduziert. Auswirkung: alte Antwortindizes können still auf andere Fragen bezogen werden. Korrektur: Prüfdatensatz an den Versuch binden, alte Versionen eindeutig kennzeichnen und erhalten; neue aktuelle Versuche getrennt starten. Der Versionsschutz muss für jeden Darstellungsweg gelten.

### Wichtig – bestätigte Inhalts-/Bedienprobleme und didaktische Korrekturen

**F4 – Lernzielabdeckung statt gleicher Länge.** Besonders L11, L19–21 und L24 zeigen das Problem: Ein bereits fertig geschriebenes Muster ist keine nachgewiesene Leistung. Beispiel L20: „Ils ne ___ jamais…“ prüft die Konjugation, nicht die Stellung von ne…jamais. Vollständige Ersatzaufgabe: **« Le dimanche, nous ___ . » – „Wir arbeiten nie“; erwartete Wortgruppe: « ne travaillons jamais ».** Jede zentrale Fähigkeit erhält eine nachvollziehbare Zuordnung zu einer tatsächlichen Antwort oder einem verpflichtenden Schreibpunkt. Keine Mindest-/Höchstzahl als Inhaltsziel.

**F5 – Vorbereiteter Lernstand und Aufgabenmuster.** L3 verlangt unbekannte große Zahlwörter; L9/23 wechseln auf nicht vorbereitete tu-Imperative; L14 nimmt jamais, L16 pourrait vorweg. Vollständige Korrekturen: **« Mon code postal est B, trois, V, un, L, deux. »**; **« Bonjour ! Allez tout droit après la gare. Puis tournez à gauche. Mon appartement est au 12, rue Victor-Hugo. C’est à cinq minutes à pied. Au revoir ! »**; **« Je ne joue pas au football. »**; **« On peut aller au cinéma dimanche à seize heures. »** Ein Rezept verwendet entsprechend **« Coupez… Ajoutez… Mélangez… »** oder bereits bekannte Infinitive.

**F6 – Zu enge oder sachlich unpassende Antwortvarianten.** 10,5/10,50 sollten beim Preis gleichwertig sein; „à Berlin“ ist eine passende kurze Ortsantwort; „à l’extérieur“ passt zu dehors. Umgekehrt dürfen „mon frère“ und „ma sœur“ nicht beliebig in Antworten über andere Personen akzeptiert werden. Korrektur: begrenzte, fachlich kuratierte Varianten und eigene Prüfregeln für Zahl, Uhrzeit, Telefon, E-Mail und ausdrücklich verlangte Schreibweise. Keine unkontrollierte Teilzeichenfolgen- oder Ähnlichkeitssuche. Bei einer Preisfrage lautet eine faire Lösungsmenge beispielsweise **10,50 / 10,5 / 10.50**.

**F7 – Unzureichend sichtbare Regeln und kompensierbare Teildefizite.** Die Einleitung nennt 80 % insgesamt, verschweigt aber die zusätzliche 50%-Teilgrenze; große Lückenteile können einen schwachen Hörteil ausgleichen. Die Prüfung verwendet außerdem den gerundeten Prozentwert. Korrekturvorschlag für dieses Vertiefungstraining: **mindestens 80 % in jedem automatisch geprüften Teil**, Vergleich mit dem ungerundeten Verhältnis; Schreiben bleibt getrennt selbst bewertet. Der Ergebnistext heißt **„Trainingsziel erreicht – Schreiben selbst geprüft“**, nicht allein „Hard Mode bestanden“. Das ist eine pädagogische Regeländerung, keine TELC-Vorgabe.

**F8 – Abgabe und Fortschritt.** Leere Antworten blockieren die Abgabe ohne „weiß ich nicht“-Weg. Die drei Navigationsteile zeigen keinen Beantwortungsstand. Korrektur: pro Teil den Bearbeitungsstand zeigen, unbekannte Antworten nach ausdrücklicher Bestätigung leer abgeben lassen und als unbeantwortet zählen. Kurzer/unvollständiger Freitext darf gespeichert und selbst geprüft werden, erfüllt aber das Schreibziel nicht. Vor Abgabe bleiben alle Lösungen verborgen.

**F9 – Fokus springt bei Audio zum Seitenanfang.** `play()` zeichnet die ganze Seite neu und `mount()` fokussiert immer `hardHeading`. Im Browser ist nach Klick auf Anhören das aktive Element tatsächlich die Überschrift. Das erschwert Tastatur- und Screenreaderbedienung während des Hörens. Korrektur: Audioanzeige gezielt aktualisieren, Fokus behalten, laufende Wiedergabe und Stoppen erkennbar machen; ein Sprachwechsel soll die Wiedergabe nicht unbegründet abbrechen. Gestartete Teilwiedergaben und echte Abspielfehler sind transparent unterschiedlich zu behandeln.

**F10 – Gleichförmiger Umfang und pauschale Zeitangabe.** 25–35 Minuten sind ohne Nutzertest keine validierte Dauer. Die ursprünglichen Hörtexte haben meist 19–38 Wörter; ein größerer Grammatikteil benötigt entsprechend mehr Zeit. Korrektur: unverbindlichen Richtwert aus dem tatsächlichen Umfang ableiten und „ohne Zeitlimit“ anzeigen. Die richtige Aufgabenzahl wird erst nach dem Lernzielabgleich berechnet. Schwierigkeit entsteht über Kombination, kontrastive Details und eigenständige Produktion, nicht über immer längere Hörtexte.

### Optional – Empfehlungen / Designpräferenzen

**D1 – Lesbarkeit der Lückenhinweise.** Rund 10,6 px sind auf dem 320-px-Bildschirm unnötig klein. Das ist ein nachvollziehbares Lesbarkeitsproblem, kein nachgewiesener axe-Verstoß. Hinweise vergrößern und Eingabebreiten nicht aus der Länge der Lösung berechnen. Die vorhandene Farbwelt, Dreiteilung und reduzierte Bewegung bleiben erhalten.

**D2 – Glanz und Textmenge (Designpräferenz, anschließend ausdrücklich beauftragt).** Der Nutzer wünscht einen kompakten roten Schlossbutton statt einer großen Informationsbox. Im gesperrten Zustand bleibt ausschließlich der kurze Freischalthinweis sichtbar. Nach Freischaltung erscheinen die drei Teile, tatsächlicher Umfang und unverbindliche Dauer. Ein langsamer roter Lichtimpuls und ein wandernder Glanzstreifen sitzen am Button, ähnlich dem vorhandenen Fortsetzen-Einstieg. Die freigeschaltete Variante leuchtet stärker; die Umgebung bleibt ruhig. Reduzierte Bewegung schaltet die Animationen ab. Diese Änderung folgt dem Nutzerwunsch und behebt keinen behaupteten fachlichen Fehler.

## Die fünf Änderungen mit dem größten Nutzen

1. Nachweisbare Lernzielabdeckung pro Lektion, variable Aufgabenzahl und echte Produktion der bislang nur gezeigten Strukturen.
2. Gemischte, gespeicherte Auswahlreihenfolge und faire aufgabenbezogene Antwortprüfung.
3. An einen festen Inhaltsstand gebundene Versuche mit sicherer Fortsetzung und erhaltener Historie.
4. Ehrliche getrennte Ergebnisse, sichtbare Teilgrenzen und ungerundete Bestehensentscheidung.
5. Erkennbarer Bearbeitungsstand, erreichbare Abgabe unbekannter Antworten und stabile Audiobedienung ohne Fokusverlust.

## Umsetzung und abschließende Validierung

Die Befunde F1–F10 wurden für neue Versuche in Inhaltsversion 2 umgesetzt. Die Grundstruktur bleibt erhalten. Wesentliche Lernziele werden nun über mehr selbst einzutragende Formen und Wortgruppen sowie ergänzende Hördetails geprüft. Weitere vollständige Korrekturbeispiele: L8 **« Bonjour, je cherche un appartement avec deux pièces et une cuisine. Quel est le loyer par mois ? Est-ce qu’il y a un balcon ? Je peux visiter jeudi à dix-sept heures. Merci ! »** erfüllt jetzt auch das verlangte Wohnungsmerkmal. L13 **« Tu peux prendre une petite veste bleue et un parapluie. »** vermeidet den vorgezogenen tu-Imperativ. L23 verlangt die gesamte Zweckgruppe **« pour couper »**. L4 fragt jetzt **« À quelle heure est le rendez-vous ? Écris en chiffres (heures:minutes). »**, statt mit dem Formatbeispiel 08:45 versehentlich die richtige Uhrzeit zu verraten.

Gespeicherte v1-Versuche behalten die ursprünglichen Inhalte und Regeln. Neue Versuche archivieren die bisherigen Antworten; Bestleistungen bleiben erhalten. Ein älterer Versuch kann eine bereits erreichte aktuelle Version nicht zurückstufen. Nicht verfügbare Versionen zeigen alle gespeicherten Antworten an und werden nicht umgedeutet. Damit ist die nötige Zustandsänderung auf das konkrete Versionsproblem begrenzt.

**Automatisiert praktisch geprüft:** 33 erfolgreiche Tests mit `node --test francais/tests/*.test.cjs tests/french-listening.test.cjs`. Die vollständige Abgabe, Sperrung, Selbstprüfung und Wiederholung wird für alle 24 Lektionen durchlaufen. Zusätzliche Gegenbeispiele prüfen Akzentpflicht, tolerierte Hörantworten, Dezimalpreise, internationale Telefonformatierung, ungültige Zeiten, unveränderte E-Mail-Zeichen, Teilgrenzen ohne Aufrunden, Versionswechsel samt Sprachwechsel, gespeicherte Auswahlreihenfolge, leere Abgabe nach Bestätigung, Fehler beim Speichern und idempotente Audiofehler. Diese Tests beweisen keine semantische Vollständigkeit beliebiger Freitextantworten.

**Im echten Chromium praktisch geprüft:** Ein normaler Lektionscheck schaltet den Einstieg frei; Unterbrechung über die Startseite, Fortsetzen, Sprachwechsel, Abgabe, Ergebnis und Neuladen funktionieren ohne doppelte Abschlusszählung. Alle drei Prüfungsteile wurden bei 320 px und 1100 px jeweils hell/dunkel auf Überlauf und gezielt mit axe geprüft; die acht Kombinationen des gesperrten/freigeschalteten Einstiegs ebenfalls. Dabei wurden ein mobiler Überlauf der neuen Zähler und zwei Kontrastprobleme gefunden und behoben. Anschließend keine gemeldeten axe-Verstöße in diesen Bereichen und kein horizontaler Überlauf. Reduzierte Bewegung deaktiviert Lichtimpuls und Glanzstreifen. Visuell geprüft wurden die real gerenderten Einstiege und Prüfungsseiten. Der gesperrte Einstieg misst im Test etwa 115 px Höhe, der freigeschaltete etwa 169 px am Desktop und 195 px bei 320 px Breite.

**Nicht verifiziert:** tatsächliche französische Audioausgabe, Aussprache, unterschiedliche installierte Stimmen und subjektive Verständlichkeit bei zwei Wiedergaben. Der Browser stellt keine Stimmen bereit. Audioablauf und Rückerstattung werden mit kontrollierten Rückmeldungen geprüft. Ebenso fehlen Lernerstudien zur benötigten Zeit und Schwierigkeit; die Dauer ist ausdrücklich nur Orientierung ohne Zeitlimit. Zwei Hörwiedergaben bleiben für selektive kurze A1-Texte vertretbar, sollten aber mit Lernenden erprobt werden. Ein Akzent-/Formfehler kann bei gewöhnlichen Inhaltsfragen toleriert werden; ausdrücklich geprüfte Buchstabierung bleibt streng.

Die neuen Lückentexte sind teilweise verdichtete Alltagsszenen, um mehrere Formen sichtbar zu prüfen. Besonders die umfangreiche Fragen-/Pronomenlektion 21 ist eher ein Kursgespräch als eine einzige Nachricht. Das ist ein verbleibender didaktischer Kompromiss. Die französischen Aufgabenstellungen können in frühen Lektionen zusätzliche Leselast verursachen; die wiederkehrenden Arbeitsmuster und deutschen Lückenhinweise stützen sie. Eine pauschale offizielle A1-Gleichwertigkeit oder vollständige Beherrschung wird daraus nicht abgeleitet.

Alle Änderungen verwenden vorhandene Browserfunktionen und lokale Daten; es entsteht keine kostenpflichtige Abhängigkeit.

### Umfang nach der Korrektur (Inhaltsversion 2)

Die Lernziele sind im Datensatz mit tatsächlichen Eingaben/Hörfragen verknüpft; die drei Schreibpunkte bleiben zusätzlich selbst geprüft. Diese Zuordnung ist eine redaktionelle Prüfhilfe, kein empirischer Kompetenznachweis. Die Zahlen sind der aktuelle Umfang, keine neue Vorgabe.

| Lektion | Lücken | Hörfragen | Schreibauftrag | Gesamt | Status nach Korrektur |
|---|---:|---:|---:|---:|---|
| 1 | 15 | 8 | 1 | 24 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 2 | 14 | 7 | 1 | 22 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 3 | 14 | 8 | 1 | 23 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 4 | 12 | 8 | 1 | 21 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 5 | 17 | 7 | 1 | 25 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 6 | 11 | 8 | 1 | 20 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 7 | 11 | 8 | 1 | 20 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 8 | 14 | 8 | 1 | 23 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 9 | 11 | 8 | 1 | 20 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 10 | 12 | 8 | 1 | 21 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 11 | 12 | 7 | 1 | 20 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 12 | 11 | 7 | 1 | 19 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 13 | 14 | 8 | 1 | 23 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 14 | 11 | 6 | 1 | 18 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 15 | 12 | 8 | 1 | 21 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 16 | 12 | 9 | 1 | 22 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 17 | 12 | 8 | 1 | 21 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 18 | 12 | 6 | 1 | 19 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 19 | 15 | 6 | 1 | 22 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 20 | 13 | 6 | 1 | 20 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 21 | 22 | 7 | 1 | 30 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 22 | 15 | 7 | 1 | 23 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 23 | 14 | 7 | 1 | 22 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
| 24 | 18 | 8 | 1 | 27 | Inhalte abgeglichen; Muster/Schema und vollständiger DOM-Durchlauf geprüft |
