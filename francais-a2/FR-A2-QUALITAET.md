# Français A2 – Qualitätsprüfung der Aufgaben

Geprüft wird, was Lernende wirklich sehen: ein JSDOM-Dump der Kursseite (Lektionsquiz, generierte Trainingsfragen,
Lektions-Check mit Transfer, Vertiefungs-Pools, Hörverstehen, Intro-Hören, Hard Mode samt `A1_GAME_HARD.build`,
Quiz-Turm `A1_QUIZ_SHOW.generate`, Grammatik-Sets). Geändert wird nur in `francais-a2/src/*.cjs`; danach
`node tools/build-francais-a2.cjs`.

Kriterien: A1–A5 zu offensichtlich · B6–B10 fehlerhaft · C11–C13 sinnlos/falsches Ziel.
Schweregrad: **KRITISCH** = 6, 7, 8, 10 · **MITTEL** = 1–5, 9 · **GERING** = 11–13.
Gute Aufgaben sind nicht aufgeführt.

Automatische Prüfungen: `tests/francais-a2-quality.test.cjs` (Dubletten in Optionen, fehlende oder mit der Lösung
identische Erklärung, Lösung wörtlich in der Frage, Längenausreißer > 1,8 × längster Distraktor, Elision nach „je ___“,
Anteil „richtig“ in den telc-Blöcken 35–65 %). Die strengeren Prüfungen gelten bis `REVIEWED` (jetzt 18) und
wachsen pro Etappe mit.

## Etappe 1 – Lektionen 1–6 (alle Funde behoben)

| ID | Krit. | Problem | Fix |
|---|---|---|---|
| FR-A2 L1 task 9 | A1 | „je habite“ verletzt die Elision, der Distraktor fällt grammatisch weg. | habite → dis; Erklärung: parler + Sprache, je suis allemand = ich bin Deutscher. |
| FR-A2 L2 task 5 | B6 | „Ce quartier est bien pour les enfants“ ist korrekt; im Grammatik-Set fehlt der deutsche Kontext. | bien → meilleure; Erklärung zur Angleichung (le quartier → meilleur). |
| FR-A2 L2 check 7 | A3 | „coûte combien de pièces“, „combien d’étages dans la pièce“ sind absurd. | Distraktoren „a combien pièces ?“ / „a combien des pièces ?“; Erklärung combien de + Nomen ohne Artikel. |
| FR-A2 L2 hard listen 2.3 | C11 | „Qui parle de sa chambre ?“ nur über die Stimme lösbar, ohne Lernwert. | „Quelle chambre est plus claire ?“ – la nouvelle / l’ancienne / les deux. |
| FR-A2 L3 quiz 5 | B6 | „Je fais vingt minutes en vélo“ ist umgangssprachlich vertretbar. | → „Je dure vingt minutes à vélo.“; Erklärung mettre / prendre / durer. |
| FR-A2 L3 task 8 | B6 | „Je fais vingt minutes“ ist vertretbar. | fais → dure; Erklärung mettre / durer / prendre. |
| FR-A2 L3 quiz 9 | A3 | „Donnez-moi la gare.“ / „Où la gare ?“ sind absurd. | Registerfehler als Distraktoren: „Hé, la gare, c’est où ?“ / „Tu sais où est la gare ?“; Erklärung siezen, Excusez-moi. |
| FR-A2 L3 check 5 | A3 | „Je prends le travail à vélo“ ist absurd. | → „Je vais au travail par vélo.“; Erklärung à vélo wie à pied. |
| FR-A2 L4 quiz 1, task 7 | A3 | „Bravo“ als Telefongruß ist absurd. | Bravo → Pardon; Erklärung (task 7 bekam eine eigene). |
| FR-A2 L4 quiz 4 | B6 | „Legen Sie nicht auf, ich rufe zurück“ ist halb richtig, „Gehen Sie nicht weg“ wörtlich vertretbar. | → „Rufen Sie später an.“ / „Legen Sie bitte auf.“ |
| FR-A2 L4 quiz 8 | B6 | Ohne Sprecherrolle ist „prendre un message“ vertretbar. | Kontext: „Du nimmst für eine Kollegin ab und fragst den Anrufer.“ |
| FR-A2 L4 task 5 | B7 | „Ich werde es ihnen morgen sagen“ ≠ „Je vais leur dire demain“ (le fehlt). | Kontext → „Ich werde ihnen morgen Bescheid sagen.“ |
| FR-A2 L4 hard text | B10 | Paul bittet die Abnehmende, ihren Namen zu wiederholen; sie antwortet „Lucie Garnier“ – Lucie ist die Abwesende. | Schluss umgebaut: SMS-Nummer der Eltern, „Vous pouvez répéter le numéro ?“, Nummer ausgeschrieben. Lückenzahl gleich. |
| FR-A2 L4 comp 2 | A2 | „in einer Besprechung“ ist über 1,8 × so lang wie „krank“. | krank → auf einer Dienstreise. |
| FR-A2 L5 quiz 1 | A1 | „je ai“ / „je étais“ verletzen die Elision. | → „Hier, Paul ___ allé au marché.“ est / a / avait. |
| FR-A2 L5 quiz 2 | B6 | „j’avais acheté“ ist korrekt (plus-que-parfait), „j’suis“ orthografisch unmöglich. | → „Hier, nous ___ acheté du fromage.“ avons / sommes / avez. |
| FR-A2 L5 quiz 10 | C13 | Identisch mit task 2 („Nous ___ regardé un film“). | → „Vous ___ regardé le match ?“ avez / êtes / avons. |
| FR-A2 L5 task 1 | A1 | „j’suis“ ist durch die Elision ausgeschlossen. | → „Hier, Léa ___ acheté des fruits.“ a / est / as. |
| FR-A2 L5 task 5 | A3 | „vé“, „voi“ sind keine plausiblen Lernerformen. | voyé / vois. |
| FR-A2 L5 task 6 | A1 | „je ai“ verletzt die Elision. | → „Il ___ allé au cinéma.“ est / a / sont. |
| FR-A2 L5 check 5 | B7 | „keinen Fernseher geschaut“ ist unidiomatisch. | → „Du hast gestern nicht ferngesehen.“ |
| FR-A2 L5 hard listen 2.3 | B6 | Tippaufgabe „Réponds en chiffres“ zu „à quatre heures“ akzeptiert 16 nicht. | 16 zusätzlich akzeptiert. |
| FR-A2 L5 comp 1 | A2 | „Schwimmbad“ gegen „Markt“ / „Kino“ ist ein Längenausreißer. | Markt → Supermarkt. |
| FR-A2 L6 transfer 4 | B7 | Modelltext und Audio „Chaque jour, je allais à la plage.“ | Prompt „j’___“ → „j’allais“. |
| FR-A2 L6 task 2 | B6 | „Il a fait très chaud“ ist korrekt. | a fait → fait; Erklärung imparfait / Präsens / Person. |
| FR-A2 L6 task 3 | B6 | „J’ai eu une petite chambre“ ist korrekt. | ai eu → avions. |
| FR-A2 L6 task 10 | A1 | „je ai“ / „je étais“ verletzen die Elision; „était rentré“ wäre korrekt. | → „Il était fatigué, alors il ___ rentré.“ est / a / avait; Erklärung. |
| FR-A2 L6 quiz 7 | A3 | „Ça a super“ ist sinnlos. | → „C’étais super.“ (falsche Endung); Erklärung -ait. |
| FR-A2 L6 check 7 | A3 | „Il m’a bien plu de pleuvoir“ ist absurd. | → „Ça m’est bien plu.“ (falsches Hilfsverb); Erklärung. |

### Zählung Etappe 1

| Kriterium | L1 | L2 | L3 | L4 | L5 | L6 | Σ |
|---|---|---|---|---|---|---|---|
| A1 Grammatik verrät Lösung | 1 | – | – | – | 3 | 1 | 5 |
| A2 Lösung fällt äußerlich auf | – | – | – | 1 | 1 | – | 2 |
| A3 absurde Distraktoren | – | 1 | 2 | 2 | 1 | 2 | 8 |
| B6 mehrere Optionen vertretbar | – | 1 | 2 | 2 | 2 | 2 | 9 |
| B7 unnatürliche Sprache | – | – | – | 1 | 1 | 1 | 3 |
| B10 Widerspruch im Text | – | – | – | 1 | – | – | 1 |
| C11 ohne Lernwert | – | 1 | – | – | – | – | 1 |
| C13 Dublette | – | – | – | – | 1 | – | 1 |

KRITISCH 13 · MITTEL 15 · GERING 2 – alle behoben.

### Offen (GERING, bewusst nicht geändert)

- L1: Adresse ohne Präposition kommt in quiz 8 und check 8 vor; célibataire in quiz 1, check 1, task 8 (C13).
- L2: meilleur in quiz 8, check 3, task 5 und Hard-Lücke 8; pas de in quiz 5, check 5, task 8 (C13).
- L5: check 8 und task 4 prüfen beide pris / prendu (C13).
- L6: „on mangeait au restaurant“ in quiz 6, task 7 und Hard-Lücke 4 (C13).
- L6 check 6: „Welche Frage passt zu ‚wo?‘“ – où = wo ist A1-Stoff (C12).
- Grammatik-Sets zeigen nur „Ergänze: …“ ohne deutschen Kontext (`tools/build-francais-a2.cjs`). Aufgaben, die dort
  landen, müssen ohne Kontext eindeutig sein; L2 task 5 wurde deshalb geändert.

## Etappe 2 – Lektionen 7–12 (alle Funde behoben)

| ID | Krit. | Problem | Fix |
|---|---|---|---|
| FR-A2 L7 task 2 | B6 | „Nous prenons le train“ ist korrekt (Präsens für Geplantes), im Grammatik-Set ohne Kontext erst recht. | prenons → prendront; Erklärung. |
| FR-A2 L7 task 3 | B6 | „Elle est contente“ ist korrekt. | est → seras; Erklärung ser- / conditionnel. |
| FR-A2 L7 task 4 | B6 | „Ils viennent à huit heures“ ist korrekt. | viennent → viendrons; Erklärung. |
| FR-A2 L7 task 5 | B6 | „Tu peux m’aider ?“ ist korrekt und natürlich. | peux → pourra; Erklärung. |
| FR-A2 L7 task 6 | B6 | Kontext „Wir sehen uns morgen.“ passt genau zu „On se voit demain.“ | voit → verrait; Kontext „Wir werden uns morgen sehen.“; Erklärung. |
| FR-A2 L7 task 9 | A1 | „je irai“ verletzt die Elision. | irai → vas. |
| FR-A2 L7 hard listen 2.2 | B6 | „jusqu’à huit heures“ (abends) – 20 wurde nicht akzeptiert. | 20 zusätzlich akzeptiert. |
| FR-A2 L8 quiz 5 | B6 | „Mein Nachbar behält meine Katze“ ist eine wörtlich vertretbare Übersetzung von garder. | → „Mein Nachbar mag meine Katze.“ |
| FR-A2 L8 check 4 | A3 | „Tu es / Tu fais un animal de compagnie ?“ sind absurd. | → „un animal de compagnon“ / „une animale de compagnie“; Erklärung. |
| FR-A2 L8 transfer 5, task 6 | B7 | „Ma chatte est très gentille .“ – Leerzeichen vor dem Punkt in Prompt, Erklärung und Audio. | Lücken „___ .“ / „___ ,“ in L7–12 ohne Leerzeichen (10 Stellen). |
| FR-A2 L9 quiz 4 | B6 | „Il faut les tomates“ ist ohne Situation grammatisch korrekt. | Kontext „Im Rezept: Man braucht Tomaten.“; Erklärung zu les. |
| FR-A2 L9 quiz 5 | A2 | „scharf gewürzt“ gegen „süß“ / „salzig“ ist ein Längenausreißer. | → „stark gesüßt“ / „leicht gesalzen“. |
| FR-A2 L9 check 7 | A3 | „Je mange pas le fromage de.“ ist Wortsalat. | → „Je ne mange pas des fromage.“ |
| FR-A2 L9 hard listen 2.3 | C11 | „Qui pose les questions ?“ nur über die Stimme lösbar. | → „Qu’est-ce qu’elle ne mange presque jamais ?“ de la viande / du poisson / des légumes. |
| FR-A2 L10 quiz 6, check 8 | A3 | „Bon appétit / Bonne route pour ton nouveau travail / examen“ sind absurd. | Bon courage (Kraft vor etwas Schwerem) und Désolé als Distraktoren; Erklärungen. |
| FR-A2 L10 task 8 | B6 | „Je vous invite pour mon anniversaire“ ist korrekt. | pour → chez; Erklärung. |
| FR-A2 L10 check 3 | A3 | „Je t’invite pour mon anniversaire à.“ ist Wortsalat. | → „Je t’invite chez mon anniversaire.“ |
| FR-A2 L10 task 9 | A2 | „Félicitations“ fast doppelt so lang wie „Désolé“ / „Dommage“. | Dommage → Bon courage; Erklärung. |
| FR-A2 L10 comp 5 | A2 | „einen Nachtisch“ gegen „Brot“ ist ein Längenausreißer. | Brot → einen Salat. |
| FR-A2 L11 quiz 2 | B6 | „dix-huit euros au kilo“ ist korrekt und gebräuchlich. | au → un; Erklärung nennt au kilo als Variante. |
| FR-A2 L11 task 5 | B6 | „quinze euros au kilo“ ist korrekt. | au → du; Erklärung. |
| FR-A2 L11 task 9 | A2 | „seulement“ gegen „que“ / „pas“ ist ein Längenausreißer. | pas → environ; Erklärung. |
| FR-A2 L11 check 3 | A3 | „Je prends que pas une baguette.“ ist Wortsalat. | → „Je ne prends qu’un baguette.“ (Genus). |
| FR-A2 L12 quiz 1 | C13 | Identisch mit task 1 („Je ne ___ pas venir ce soir“). | → „Nous ne ___ pas venir samedi.“ pourrons / pouvrons / pouvons. |
| FR-A2 L12 quiz 3 | A3 | „Je suis dommage.“ / „Je suis pardon.“ sind absurd. | → „Je suis excusé.“ / „C’est dommage.“; Erklärung. |
| FR-A2 L12 quiz 7, task 3 | A2 | „parce que“ gegen „pour“ / „donc“ ist ein Längenausreißer. | pour → pourtant. |
| FR-A2 L12 quiz 9 | A2 | „pour“ gegen „de“ / „à“ ist ein Längenausreißer. | à → avec; Erklärung zu excuse-moi de + Infinitiv. |
| FR-A2 L12 check 7 | A3 | „Bon appétit !“ / „Bonne route !“ für eine Kranke sind absurd. | → „Bonne fête !“ / „Bon voyage !“; Erklärung. (Bon courage bewusst nicht, das passt auch.) |
| FR-A2 L12 hard listen 1.3 | B6 | „vers neuf heures“ am Abend – 21 wurde nicht akzeptiert. | 21 zusätzlich akzeptiert. |

### Zählung Etappe 2

| Kriterium | L7 | L8 | L9 | L10 | L11 | L12 | Σ |
|---|---|---|---|---|---|---|---|
| A1 Grammatik verrät Lösung | 1 | – | – | – | – | – | 1 |
| A2 Lösung fällt äußerlich auf | – | – | 1 | 2 | 1 | 3 | 7 |
| A3 absurde Distraktoren | – | 1 | 1 | 3 | 1 | 2 | 8 |
| B6 mehrere Optionen vertretbar | 6 | 1 | 1 | 1 | 2 | 1 | 12 |
| B7 Typografie / Sprache | – | 2 | – | – | – | – | 2 |
| C11 ohne Lernwert | – | – | 1 | – | – | – | 1 |
| C13 Dublette | – | – | – | – | – | 1 | 1 |

KRITISCH 14 · MITTEL 16 · GERING 2 – alle behoben.

### Offen (GERING)

- L7 check 5: „Qu’est-ce que tu as fait le week-end prochain ?“ – der Distraktor scheitert schon an der Logik, nicht nur an der Zeitform (A4, bewusst belassen: die Zeitangabe ist hier der Lernpunkt).
- L9 check 4: „Wie viele Karotten?“ – trois = drei ist A1-Stoff (C12).
- L11 task 8: „Je ne bois que le thé“ ist ungewöhnlich, aber nicht ganz unmöglich; du bleibt die klare Lösung.

## Etappe 3 – Lektionen 13–18 (alle Funde behoben)

| ID | Krit. | Problem | Fix |
|---|---|---|---|
| FR-A2 L13–18 Lücken | B7 | 13 Lückensätze „___ .“ / „___ ,“ erzeugen Erklärungen und Audio mit Leerzeichen vor dem Satzzeichen. | Leerzeichen entfernt. |
| FR-A2 L14 task 1 | B6 | „Le train pour Lyon part voie 3“ ist als Ansage korrekt (Grammatik-Set ohne Kontext). | part → partiront; Erklärung. |
| FR-A2 L14 comp 2 | A2 | „11“ ist die einzige zweistellige Gleisnummer. | 3 → 13. |
| FR-A2 L14 hard listen 1.1 | C11 | Frage nach dem Ortsnamen (Clermont-Ferrand / Clermont-l’Hérault / Clamart) ist Eigennamen-Trivia. | → „À quelle heure le départ était-il prévu ?“ 11 h 20 / 11 h 02 / 12 h 20. |
| FR-A2 L15 check 1 | A2 | Lösung „Nein, ich muss bei Phalsbourg abfahren.“ ist viel länger als „Ja, ohne Problem.“ | Distraktoren „Ja, nur bei Saverne gibt es Stau.“ / „Ja, aber nur mit Winterreifen.“; Erklärung. |
| FR-A2 L15 task 9 | A3 | „bis / bas / biais“: Distraktoren sind Unsinn, „itinéraire bis“ ist Spezialwortschatz statt des gelernten „de déviation“. | → de déviation / de sortie / de péage; Erklärung nennt itinéraire bis. |
| FR-A2 L15 hard listen 2.3 | C11 | „Est-ce que l’annonce est pour l’homme ?“ hängt an der Stimme. | → „La Citroën noire est-elle la voiture de la personne qui demande ?“ |
| FR-A2 L16 task 4 | B6 | „Demain, il fait beau“ ist umgangssprachlich korrekt. | fait → ferait; Erklärung. |
| FR-A2 L16 task 5 | B6 | „Il y a du vent demain“ ist korrekt. | a → aurait; Erklärung. |
| FR-A2 L16 task 6 | B6 | „Hier, il faisait froid“ ist korrekt. | faisait → fait; Erklärung nennt faisait als Beschreibung. |
| FR-A2 L16 task 7 | B6 | Kontext „Der Himmel klart … auf“ passt zu „se dégage“. | dégage → dégageront; Kontext „wird … aufklaren“; Erklärung. |
| FR-A2 L17 task 3 | A2 | „avec“ gegen „à“ / „de“ ist ein Längenausreißer (auch Grammatik-Set a2g5). | à → pour; Erklärung. |
| FR-A2 L18 quiz 4 | B10 | Die Lücke stand vor „de plus en plus de“ – mit der Lösung hieß der Satz „De plus en plus de de plus en plus de personnes …“. | Prompt → „___ personnes font du sport.“ |
| FR-A2 L18 quiz 5 | B6 | Ohne Kontext sind „ne compte pas / plus deux millions“ korrekt. | Kontext „Die Region hat nur zwei Millionen Einwohner.“; pas → seulement; Erklärung. |
| FR-A2 L18 task 3 | B6 | „augmenté à trois pour cent“ ist korrekt (auf 3 %); im Grammatik-Set ohne Kontext. | à → pour; Erklärung. |
| FR-A2 L18 task 4 | A2 | „De moins en ___“ – die Lösung moins steht schon im Satz. | Lücke umfasst den ganzen Ausdruck: De moins en moins / De plus en moins / Moins et moins. |
| FR-A2 L18 task 5 | A1 | „d’___ parmi“ ist durch die Elision ausgeschlossen. | Lücke → „___ elles“: d’entre / entre / d’eux; Erklärung. |

### Zählung Etappe 3

| Kriterium | L13 | L14 | L15 | L16 | L17 | L18 | Σ |
|---|---|---|---|---|---|---|---|
| A1 Grammatik verrät Lösung | – | – | – | – | – | 1 | 1 |
| A2 Lösung fällt äußerlich auf | – | 1 | 1 | – | 1 | 1 | 4 |
| A3 absurde Distraktoren | – | – | 1 | – | – | – | 1 |
| B6 mehrere Optionen vertretbar | – | 1 | – | 4 | – | 2 | 7 |
| B7 Typografie (L13–18 gesamt) | 1 | | | | | | 1 |
| B10 kaputter Aufgabentext | – | – | – | – | – | 1 | 1 |
| C11 ohne Lernwert | – | 1 | 1 | – | – | – | 2 |

KRITISCH 9 · MITTEL 6 · GERING 2 – alle behoben.

### Offen (GERING)

- L13: mal au / à la / aux kommt in quiz 3, quiz 4, task 1–3 und transfer 1–3 vor (C13, gewollte Drillmenge).
- L13 task 6, L14 task 4, L15 task 10: „en cas de“ statt „en raison de“ wäre grammatisch möglich; der deutsche Kontext („wegen“) entscheidet. Die Aufgaben landen nicht in den Grammatik-Sets.
- L15 check 4: „On doit suivre le bouchon.“ ist schwach, aber eindeutig falsch.

## Funde in `shared/` (für die letzte Etappe gesammelt, nicht geändert)

| ID | Krit. | Problem | Vorschlag |
|---|---|---|---|
| shared/quiz-show.js Stufen 7–12 (z. B. FR-A2 L4) | A3 | Lückensätze bekommen Distraktoren anderer Wortart: „Je ___ téléphone demain. (ihnen)“ → leur / tes / ses / mes. | Für Objektpronomen-Lücken Pronomen-Distraktoren (lui, les, la) statt Possessiva. |
| shared/quiz-show.js Stufen 7–12 (FR-A2 L5, L6) | A3 | Partizip- und Verblücken bekommen Wörter mit ähnlichem Anfang: venue / vendre / ventre / vendeuse; était / est / étage / étapes. | Distraktoren aus demselben Lemma bzw. derselben Wortart ziehen (venu, venus, venir). |
| shared/quiz-show.js Hinweise | GERING | Verschachtelte Klammern im Hinweis: „(als (Beruf))“, „(Hilfsverb (acheter))“. | Innere Klammern beim Anzeigen glätten. |

Nicht gemeldet: Die Reim-Distraktoren der Stufen 1–5 im Quiz-Turm („der Sohn / der Balkon / der Kassenbon“) sind laut
Generator bewusst als Scherzstufen angelegt.

## Nächste Etappen

- ~~Lektionen 7–12~~ erledigt (Etappe 2).
- ~~Lektionen 13–18~~ erledigt (Etappe 3).
- Lektionen 19–24 mit `src/exam.cjs` (3 Modelltests; telc-Richtig-Anteil ist bereits im Rahmen).
- Danach die gesammelten `shared/`-Funde und alle drei Kurse testen.
