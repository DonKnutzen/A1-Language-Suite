# Vertiefung: Seitenlast (DE-A1)

Ziel: Auf jeder Vertiefungsseite kommt man nach kurzem Lesen zur ersten Übung („Commencer le mini-test“).
Der Inhalt bleibt erhalten. Er wird nur eingeklappt, und wo etwas doppelt war, gekürzt.

## Messung

So gemessen, wie Lernende die Seite sehen: Kurstest-Umgebung plus `lesson-foundations`, Vokabelplan und `deepening-tidy`.
Gezählt werden die sichtbaren Wörter bis `#topicPracticeStart`. Text in geschlossenen `<details>` zählt nicht, ihre Überschrift schon.
Ebenfalls nicht gezählt wird Text auf Buttons, also die Wort-Buttons in Tabellen.

## Zielwerte (festgehalten in `tests/deutsch-a1-page-load.test.cjs`)

| | L1–3 | ab L4 |
|---|---|---|
| Wörter bis zur ersten Übung | ca. 80, Grenze **90** | **120** |
| offene Tabellen vor der Übung | 1 | 1 |
| offene Beispielzeilen vor der Übung | 6 | 6 |

Begründung: Vorher lag der Median bei 137 Wörtern, die schlimmste Seite hatte 284 (L15 T2), und auf 41 von 60 Seiten lag die Übung hinter dem Ziel.
Die Last kam fast nie aus der Regel selbst. Sie kam aus zusätzlichen Hinweisen, langen Beispiellisten und dem Aussprache-Bonus vor der Übung.
Bei L1–3 lässt die Grenze 90 Spielraum für L1 T6 (88) und L3 T1 (90). Dort bleiben nur noch Kerntabelle, Regel und zwei bis drei Beispiele offen, und nichts davon ist doppelt.
Wortreihen wie Wochentage oder Monate (`.deepening-vocabulary`) sind ein einziges Raster und zählen nicht als Beispielzeilen. Die Monate in L4 T3 sind der Lernstoff selbst.

## Generische Regel (`deutsch/study.js` → `foldPage`, aufgerufen aus `compactPage`)

1. Offen bleiben die Regel, die Tabelle und die ersten Beispiele: 3 in L1–3, 4 ab L4.
   Eine einzelne überzählige Zeile wird nicht eingeklappt.
2. Weitere Beispiele kommen in `<details>` „Plus d’exemples (n)“.
3. Jeder Hinweis aus `lesson-foundations` wird ein eigenes `<details>`, sein Titel ist die Überschrift.
   Die Hinweise stehen weiterhin vor der Übung.
4. Der Kasten „sie ou Sie ?“ (L1) wird ein eigenes `<details>`.
5. Der Aussprache-Bonus bleibt an seinem Platz, ist aber eingeklappt („Prononciation · …“).
   Das Alphabet in L2 T1 und das Abspielen des eigenen Namens funktionieren unverändert.
6. Unverändert bleiben „Mots pour les exercices“ (war schon eingeklappt) und „Autres expressions · référence“ (schon hinter der Übung).

Alle neuen Blöcke haben die Klasse `.deepening-more`.
`expandContent` in `lesson-flow.js` lässt sie geschlossen, und `tests/german-course.test.cjs` erlaubt sie neben Wortliste und Referenz.
Das hebt die frühere Festlegung „Erklärungen bleiben offen“ aus 5c70b8a bewusst auf, für die Zusatzblöcke, nicht für die Regel.
Weil alles nur eingeklappt und nichts gelöscht ist, bleibt jeder Audio-Text im Panel-Text.
Gestaltet ist das in `deutsch/deepening.css`: Rahmen wie bei der Referenz, dazu +/− rechts.

## Handkürzungen (nur Doppeltes)

| Seite | entfernt | steht schon in |
|---|---|---|
| L1 T2 | „Sie avec majuscule est le vous de politesse“, „Une question attend une réponse …“ | Hinweis „Vous : Sie ou Ihnen ?“, Regel L1 T1 |
| L1 T6 (`shared/grammar-ui.js`) | „(du sprichst, er spricht)“, „ihr sprecht“ | Konjugationstabelle |
| L2 T2 | „ihr könnt …“, doppelte Höflichkeitsbemerkung | Tabelle. „sie kann / Sie können“ bleibt, das ist eine bewusste Festlegung in `german-deepening-layout.test.cjs` |
| L3 T1 | „21 = einundzwanzig“, „Compare treize/dreizehn et trente/dreißig“ | erste Beispielzeilen |
| L3 T2 | Bedeutungen von Geburtsdatum, Geburtsort, Telefonnummer, Postleitzahl | Beispielzeilen |

Aufgaben, IDs und `practiceCount` sind unverändert.

## Vorher / nachher pro Seite

| Seite | Thema | vor Übung vorher | nachher | Tabellen offen | Beispiele offen vorher → nachher |
|---|---|---|---|---|---|
| L1 T1 | Se présenter | 85 | 79 | 0 | 5 → 3 |
| L1 T2 | Poser les premières questions | 193 | 68 | 0 | 6 → 4 |
| L1 T3 | Pronoms personnels | 89 | 39 | 1 | 3 → 0 |
| L1 T4 | sein – conjugaison | 117 | 58 | 1 | 4 → 2 |
| L1 T5 | Verbes réguliers au présent | 68 | 68 | 1 | 0 → 0 |
| L1 T6 | heißen et sprechen – conjugaison | 127 | 88 | 1 | 2 → 2 |
| L2 T1 | Lettres et signes | 183 | 79 | 0 | 7 → 3 |
| L2 T2 | Faire épeler et répéter | 209 | 84 | 1 | 4 → 1 |
| L3 T1 | Construire les nombres | 135 | 90 | 1 | 7 → 3 |
| L3 T2 | Dates et coordonnées | 258 | 68 | 0 | 9 → 3 |
| L4 T1 | Lire et dire l’heure | 91 | 91 | 0 | 4 → 4 |
| L4 T2 | Jours de la semaine | 64 | 64 | 0 | 7 → 7 |
| L4 T3 | Mois et dates | 160 | 90 | 0 | 16 → 14 |
| L4 T4 | Fixer un rendez-vous | 227 | 101 | 0 | 8 → 4 |
| L5 T1 | Présenter sa famille | 192 | 87 | 0 | 5 → 3 |
| L5 T2 | Informations personnelles | 77 | 66 | 0 | 6 → 4 |
| L5 T3 | Possessifs utiles | 88 | 88 | 1 | 0 → 0 |
| L5 T4 | haben – conjugaison | 86 | 50 | 1 | 0 → 0 |
| L6 T1 | Commander un repas | 202 | 102 | 0 | 10 → 5 |
| L6 T2 | Préciser et payer | 108 | 80 | 0 | 4 → 4 |
| L7 T1 | Prix et quantités | 107 | 107 | 0 | 4 → 4 |
| L7 T2 | Trouver un article | 227 | 102 | 0 | 8 → 4 |
| L8 T1 | Décrire un logement | 213 | 91 | 0 | 9 → 4 |
| L8 T2 | Demander une visite | 115 | 87 | 0 | 7 → 4 |
| L8 T3 | Articles à l’accusatif | 72 | 35 | 1 | 0 → 0 |
| L9 T1 | Expliquer un chemin | 239 | 90 | 0 | 11 → 4 |
| L9 T2 | Comprendre les transports | 248 | 84 | 0 | 8 → 4 |
| L10 T1 | Métier et horaires | 126 | 70 | 0 | 4 → 2 |
| L10 T2 | Prévenir au travail | 165 | 90 | 0 | 6 → 4 |
| L10 T3 | Verbes réguliers au présent | 135 | 48 | 1 | 2 → 0 |
| L11 T1 | Parler du cours | 143 | 100 | 0 | 5 → 4 |
| L11 T2 | Apprendre et demander de l’aide | 236 | 88 | 0 | 12 → 4 |
| L12 T1 | Dire ce qu’on aime | 100 | 58 | 0 | 3 → 2 |
| L12 T2 | Organiser le week-end | 182 | 74 | 0 | 6 → 3 |
| L13 T1 | Réserver une chambre | 146 | 103 | 0 | 6 → 5 |
| L13 T2 | Départs et arrivées | 109 | 77 | 0 | 3 → 3 |
| L14 T1 | Décrire des symptômes | 126 | 69 | 0 | 5 → 3 |
| L14 T2 | Prendre rendez-vous et prévenir | 159 | 82 | 0 | 4 → 3 |
| L15 T1 | Inviter et préciser | 133 | 74 | 0 | 4 → 3 |
| L15 T2 | Répondre à une invitation | 284 | 98 | 0 | 9 → 3 |
| L16 T1 | Lire panneaux et restrictions | 170 | 69 | 0 | 7 → 4 |
| L16 T2 | Horaires et annonces | 163 | 85 | 0 | 4 → 3 |
| L17 T1 | Formuler une demande | 152 | 81 | 0 | 3 → 1 |
| L17 T2 | Accepter et refuser | 124 | 75 | 0 | 6 → 4 |
| L18 T1 | Comprendre les consignes | 137 | 77 | 0 | 7 → 4 |
| L18 T2 | Décrire une méthode simple | 139 | 112 | 0 | 5 → 5 |
| L19 T1 | Nommer les douleurs | 70 | 70 | 0 | 2 → 2 |
| L19 T2 | Demander une aide médicale | 161 | 85 | 0 | 4 → 3 |
| L20 T1 | Décrire la météo | 154 | 69 | 0 | 5 → 3 |
| L20 T2 | Choisir ses vêtements | 135 | 86 | 0 | 7 → 5 |
| L20 T3 | Articles à l’accusatif | 67 | 37 | 1 | 0 → 0 |
| L21 T1 | Parler de ses goûts | 83 | 83 | 0 | 5 → 5 |
| L21 T2 | Proposer une sortie | 168 | 100 | 0 | 5 → 4 |
| L22 T1 | Laisser un message | 163 | 88 | 0 | 6 → 3 |
| L22 T2 | Écrire un SMS clair | 189 | 91 | 0 | 6 → 3 |
| L23 T1 | À la poste et au guichet | 141 | 80 | 0 | 8 → 4 |
| L23 T2 | Remplir un formulaire | 107 | 67 | 0 | 6 → 4 |
| L24 T1 | Répondre et se faire comprendre | 99 | 76 | 0 | 6 → 4 |
| L24 T2 | Préparer un message complet | 80 | 80 | 0 | 3 → 3 |
| L24 T3 | Ordre des mots | 67 | 33 | 1 | 0 → 0 |

Median vor der Übung: 137 → 81 Wörter; Summe 8593 → 4711.

„Beispiele offen“ zählt hier auch die Wortreihen mit, zum Beispiel 14 in L4 T3 (Monate). Der Test zählt sie nicht.

## Offen

- **Bildschirmhöhe:** Bei 390 px liegt der Übungs-Button auf einigen Seiten noch knapp unter der ersten Bildschirmhöhe, zum Beispiel L1 T2 bei ca. 890 px und L2 T1 bei ca. 980 px.
  Kopf, Fortschrittsleiste und Themenleiste belegen zusammen etwa 280 px. Eine kompaktere Kopfzeile wäre ein eigener Schritt.
- **L2 T1:** Die Regel sagt „Écoute l’alphabet“, das Alphabet ist jetzt aber eingeklappt (eine Zeile direkt darüber).
  Falls das stört, wäre die Ausnahme, den Aussprache-Block nur in L2 T1 offen zu lassen. Die Seite läge dann bei etwa 150 Wörtern.
- **Pro Seite eine Übung:** Jede Seite hat weiterhin genau eine Übung am Ende. Ein echtes Wechselspiel Erklärung → Übung → Erklärung innerhalb einer Seite würde neue Aufgabenblöcke brauchen.
  Das lag außerhalb dieses Auftrags, denn der Aufgabenbestand sollte unverändert bleiben.
