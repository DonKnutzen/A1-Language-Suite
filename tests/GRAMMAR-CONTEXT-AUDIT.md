# Grammatik-Kontext und deutsche Dialogstimmen · Revision 166

Ausgangsstand: lokaler Commit `ec9d8ea` / Git-Tree `15a22e97288e2bf3e5aeed365b5ae3968ca47465`, identisch mit dem bisherigen Stand von PR #3.

## Umfang und Befunde

Die tatsächlich gerenderten 136 Vertiefungsseiten der 48 deutschen und französischen A1-Lektionen wurden auf Erklärungen vor den Übungen, wichtige Formbesonderheiten und thematische Passung durchgesehen. Das ist eine Inhaltsprüfung der vorhandenen Lernseiten; sie ersetzt keinen Lerntest mit Anfängern.

| Stelle | Korrektur |
|---|---|
| Deutsch 1, heißen / sprechen | Sprechen ausdrücklich als unregelmäßig mit e → i bei du und er/sie/es; ihr sprecht als Gegenprobe. Heißen als starkes Verb, aber mit unverändertem Präsensstamm; du heißt ohne zusätzliches s nach ß. Die anschließenden Beispiele und alle 13 Übungen beziehen sich auf Namen und Sprachen. |
| Deutsch 1 und 24, Satzstellung | Zweite Position bedeutet zweiter Satzteil, nicht zweites Wort; Satzanfang und Fragetyp werden unterschieden. „Mein Name“ liefert ein bereits bekanntes Beispiel. |
| Deutsch 5, haben und Possessive | Der Ausfall von b in hast/hat wird genannt. Die Tabelle vergleicht Nominativ und Akkusativ; mit meiner Frau wird ausdrücklich als anderes, dativisches Muster abgegrenzt. |
| Deutsch 6 und 8, Akkusativ | Direkte Objektfunktion erklärt; ein → einen und der → den getrennt dargestellt. Höfliche möchte-/hätte-Formen bleiben gezielt gelernte Bausteine mit ihrem Subjekt. |
| Deutsch 9, 13, 15 und 16 | Nimm als unregelmäßige Form benannt; abfahren an das bekannte fahren/fährt aus Lektion 9 angebunden; Infinitiv nach kann bleibt ungeteilt. Müssen und dürfen werden mit ihren tatsächlichen Stammformen als unregelmäßig erklärt. |
| Französisch 1 und 11 | Venir ausdrücklich unregelmäßig; bei s’appeler und se lever werden regelmäßige -er-Endungen von Verdopplung/Akzentänderung unterschieden. Reflexivpronomen werden mit der Person verbunden. |
| Französisch 15, 16, 20 und 24 | Aller, pouvoir, vouloir und devoir ausdrücklich unregelmäßig; konjugiertes Verb und folgender Infinitiv getrennt erklärt. Il faut als feste unpersönliche Form von falloir erklärt. |
| Französisch, gemischte Vorbemerkungen | Die allgemeine Lektionszusammenfassung wird nicht mehr auf die erste, teilweise sachfremde Grammatikseite kopiert. Eigene Erklärungen auf den passenden Themenseiten und die Grundlagen-Seite von Lektion 1 bleiben bestehen. Beispiele: laufende Handlung bei être en train de, Wettervorhersage beim Wetter, Conditionnel bei höflichen Bitten, passé récent auf seiner eigenen Seite. |
| Englische Oberfläche | Neue französische Kurserklärungen sind übersetzt. Konzeptabsätze bleiben als übersetzbare Texteinheit erhalten, statt durch automatische Hervorhebungen in unübersetzte Fragmente zerlegt zu werden. |

Bereits sachlich erklärte Muster wurden beibehalten, etwa fahren/fährt, lesen/liest sowie die vollständigen französischen prendre-, faire- und préférer-Beispiele. Keine Aufgabe wurde gestrichen oder vereinfacht.

Fachliche Gegenprüfung: [Duden: heißen (mit Namen)](https://www.duden.de/rechtschreibung/heiszen_mit_Namen), [IDS: Kongruenz von Subjekt und finitem Verb](https://grammis.ids-mannheim.de/systematische-grammatik/1623), [ConjugArt: appeler](https://nos-langues.canada.ca/fr/conjugart/appeler), [lever](https://nos-langues.canada.ca/fr/conjugart/lever), [venir](https://nos-langues.canada.ca/fr/conjugart/venir) und [devoir](https://nos-langues.canada.ca/fr/conjugart/devoir).

## Normales deutsches Hörverstehen

Alle 24 normalen Dialoge haben ausdrücklich festgelegte Rollen mit je einer Frauen- und Männerstimme. Die beginnende Rolle variiert zwischen den Lektionen. Anna, Paul und Lukas behalten ihre passende Rolle; innerhalb eines Dialogs wechselt die Stimme derselben Person nicht. Texte, Fragen und Antworten bleiben gleich.

Die bisher fehlende deutsche Apple-Stimme Martin wird erkannt, auch anhand der Siri-Stimmenkennung. Name und Kennung werden berücksichtigt; eine geeignete gespeicherte Stimme und die vorhandene Qualitätsauswahl bleiben nutzbar. Fehlt eine bekannte passende Stimme, werden verfügbare nicht zugeordnete Stimmen vor einer erkennbar unpassenden Ersatzstimme berücksichtigt. Die verfügbaren Stimmen werden beim Abspielen neu gelesen.

Ein Browser kann nur die Stimmen verwenden, die er tatsächlich anbietet. Bei nur einer passenden Stimme bleibt die vorhandene ehrliche Ersatzstimmen-Meldung sichtbar. Es wird kein Geschlecht durch künstliche Tonhöhenänderung vorgetäuscht. Kein kostenpflichtiger Dienst wurde eingeführt.

## Verifikation

106 gezielte Tests erfolgreich. Darunter: tatsächlicher Kontext aller 136 Seiten, Deutsch-1-Übungen, englischer Sprachwechsel, bestehende Auswahlfragen und Fortschrittsmigration, Wortlisten, alle 24 normalen deutschen Dialoge bei 75 % und 100 %, alle 48 deutschen Hard-Mode-Aufnahmen sowie Martin-/Einzelstimmen-/spät geladene Stimmen. Ältere Assertions für die bereits eingeführte Hard-Mode-Version 4 und neutrale Wortlistenbeispiele wurden an den vorhandenen Stand angepasst; die Erhaltung ursprünglicher Fragen und abgegebener Versuche wird weiterhin geprüft.

Ein deterministischer Vergleich mit dem Ausgangsstand ergibt identische Aufgaben-, Antwort-, Check- und Hard-Mode-Daten für beide Kurse. Ausgenommen sind ausschließlich Erklärungstexte sowie die hier beabsichtigten Geschlechtsangaben der normalen deutschen Dialogrollen. C1 und Spanisch sind unverändert.

21 Chromium-Prüfungen erfolgreich: 18 Ansichten (drei relevante Grammatikseiten, 320/390/1280 Pixel, Hell/Dunkel) ohne horizontalen Überlauf und drei echte Bedienabläufe der normalen deutschen Hörübung mit beiden zugewiesenen Stimmen. Mobile Ansichten visuell geprüft. Die Wiedergabeschnittstelle wurde mit kontrollierten Browserstimmen geprüft; der tatsächliche Klang auf dem Endgerät wurde nicht beurteilt.

Beide A1-Caches verwenden Revision 166. Alle versionierten Skript- und Stil-URLs der Einstiegsseiten sind mit der Offline-Liste abgeglichen, einschließlich der bereits zuvor geänderten Auswahlfragen.

Die bereits dokumentierten Bestandsabweichungen älterer vollständiger Testsammlungen und des vollständigen Quellfingerabdrucks wurden hier nicht als behoben ausgegeben. Prüfungsantworten, Bewertung, gespeicherte Bestwerte und Sprachaufnahmen wurden durch diese Änderung nicht umgeschrieben.
