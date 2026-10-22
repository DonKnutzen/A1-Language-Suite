/* A1 teaching prerequisites, shown before the opening quiz. No task IDs or saved progress change. */
(() => {
  'use strict';
  const content = {
  "fr": {
    "1": [
      [
        "Personen und Anrede",
        "Je = ich, tu = du, il/elle = er/sie, on = man/wir, nous = wir, vous = ihr/Sie, ils/elles = sie (Mehrzahl). Tu und toi gehören zum Duzen, vous zum Siezen oder zu mehreren Personen. Paul et moi wird durch nous ersetzt; zwei Namen durch ils oder elles.",
        "Et toi ? Et vous ? Comment allez-vous ? Ça va bien, merci.",
        "People and forms of address",
        "Je = I, tu = you (informal singular), il/elle = he/she, on = one/we, nous = we, vous = you (formal or plural), ils/elles = they. Tu and toi address one familiar person. Paul et moi becomes nous; two names become ils or elles."
      ],
      [
        "Artikel und Herkunft",
        "Un ist männlich, une weiblich; des bezeichnet mehrere. Le, la und les sind bestimmte Artikel. Vor einem Vokal oder stummen h steht l’. Mon ami heißt mein Freund. Die Sprache steht in je parle allemand ohne Artikel. Städte stehen hier mit à; aus Frankreich heißt de France, aus Deutschland d’Allemagne, aus Kanada du Canada. Die Länderregeln werden später vertieft.  Nomen erhalten im Plural meistens ein s: un ami → des amis.",
        "un ami · une amie · des amis · le prénom · la ville · les langues · l’ami · Je viens du Canada.",
        "Articles and origin",
        "Un is masculine, une feminine; des introduces a plural. Le, la and les are definite articles. Before a vowel or silent h, use l’. Mon ami means my friend. Use no article in je parle allemand. Here cities follow à; origin is de France, d’Allemagne or du Canada. Country rules are developed later. Most nouns add s in the plural: un ami → des amis."
      ],
      [
        "Ein Nein verstehen",
        "Non heißt nein. Ne … pas bedeutet nicht: ne steht vor dem konjugierten Verb, pas dahinter. Vor einem Vokal wird ne zu n’. Hier genügt es, diese Verneinung zu erkennen; die Mengenregel folgt in Lektion 4.",
        "Je parle français. → Je ne parle pas français. · Elle va bien. → Elle ne va pas bien.",
        "Understanding a negative",
        "Non means no. Ne … pas means not: ne comes before the conjugated verb, pas after it. Before a vowel, ne becomes n’. For now recognise the negative; the quantity rule follows in lesson 4."
      ]
    ],
    "2": [
      [
        "Bitten und Schreibweise",
        "Nach pouvoir steht die Grundform. Vous pouvez … ? und Pouvez-vous … ? sind zwei Möglichkeiten derselben höflichen Frage. Prénom = Vorname, nom de famille = Nachname; adresse = Adresse. Écrire heißt schreiben; ça s’écrit ist ein fester Baustein für die Schreibweise.",
        "Vous pouvez épeler ? Pouvez-vous répéter ? Ça s’écrit L-E-A. Les informations sont correctes ?",
        "Requests and spelling",
        "Use an infinitive after pouvoir. Vous pouvez … ? and Pouvez-vous … ? are two ways to ask the same polite question. Prénom = first name, nom de famille = surname, adresse = address. Écrire means to write; ça s’écrit is a fixed spelling phrase."
      ],
      [
        "Sonderzeichen",
        "É heißt e accent aigu, è heißt e accent grave, ê heißt e accent circonflexe, ë heißt e tréma und ç heißt c cédille. Buchstabiere zuerst die Buchstaben und nenne danach das Zeichen. Correct / correcte bedeutet richtig; die Frage nach korrekten Angaben kannst du als ganzen Baustein lernen.",
        "é · è · ê · ë · ç · Mon prénom est Léa.",
        "Special characters",
        "É is e accent aigu, è is e accent grave, ê is e accent circonflexe, ë is e tréma and ç is c cédille. Spell the letters and name any special mark. Correct / correcte means correct; learn the question about correct information as a complete phrase."
      ]
    ],
    "3": [
      [
        "Alter und Geburtsdatum",
        "Ein Alter braucht avoir, nicht être: j’ai, tu as, il/elle/on a, nous avons, vous avez, ils/elles ont. Vor ai wird je zu j’. Beim Geburtsdatum steht le vor dem Tag; né bezeichnet einen Mann, née eine Frau. Avril = April, mai = Mai, juin = Juni. Naissance bedeutet Geburt, code postal Postleitzahl.",
        "J’ai vingt ans. Tu as trente ans. Je suis né le cinq mai. Je suis née le dix-sept avril.",
        "Age and birth date",
        "Age uses avoir, not être: j’ai, tu as, il/elle/on a, nous avons, vous avez, ils/elles ont. Je becomes j’ before ai. Use le before the day of birth; né refers to a man, née to a woman. Avril = April, mai = May, juin = June. Naissance means birth; code postal means postcode."
      ],
      [
        "Zahlen lesen",
        "Zéro, un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix; onze, douze, treize, quatorze, quinze, seize; danach dix-sept, dix-huit, dix-neuf. Die Zehner sind vingt, trente, quarante, cinquante, soixante; 70 = soixante-dix, 80 = quatre-vingts, 90 = quatre-vingt-dix, 100 = cent. Pas vor einer Zahl korrigiert sie: pas trente bedeutet nicht dreißig.",
        "21 : vingt et un · 71 : soixante et onze · 81 : quatre-vingt-un · 92 : quatre-vingt-douze",
        "Reading numbers",
        "Learn zéro to seize, then dix-sept, dix-huit and dix-neuf. Tens are vingt, trente, quarante, cinquante, soixante; 70 = soixante-dix, 80 = quatre-vingts, 90 = quatre-vingt-dix, 100 = cent. Pas before a number rejects that number: pas trente means not thirty."
      ]
    ],
    "4": [
      [
        "Zeit und Termin",
        "Il est nennt die Uhrzeit; à nennt den Zeitpunkt. Demie heißt halb, et quart Viertel nach, moins le quart Viertel vor. Midi = Mittag/12 Uhr, minuit = Mitternacht/0 Uhr, libre = verfügbar, devant = vor. À partir de heißt ab. On se voit ist ein fester Baustein für eine Verabredung. Du lundi au vendredi heißt von Montag bis Freitag; de neuf heures à midi von neun Uhr bis mittags. Für ein Datum steht le, für einen Monat ohne Tageszahl en.",
        "Il est une heure. Le cours est à neuf heures. On se voit devant la gare ? Je suis libre à partir de midi.",
        "Time and appointments",
        "Il est tells the time; à introduces the time of an event. Demie means half past, et quart quarter past, moins le quart quarter to. Midi = noon, minuit = midnight, libre = available, devant = in front of. À partir de means from. Learn on se voit as an appointment phrase. Du lundi au vendredi means from Monday to Friday; de neuf heures à midi means from nine until noon. A date takes le; a month without a day takes en."
      ],
      [
        "Nicht und kein unterscheiden",
        "Ne … pas verneint das konjugierte Verb; vor Vokal steht n’. Il y a heißt es gibt. Bei verneinter Existenz wird un, une oder des zu de; vor Vokal zu d’. Nach être bleibt der Artikel dagegen erhalten. Diese Regel brauchst du auch bei Wohnungen und Gesundheit.",
        "Le cours n’est pas mardi. Il y a un cours. → Il n’y a pas de cours. Je n’ai pas d’adresse. Ce n’est pas un cours.",
        "Distinguishing not and no",
        "Ne … pas surrounds the conjugated verb; before a vowel use n’. Il y a means there is/are. When existence is negated, un, une or des becomes de, or d’ before a vowel. After être the article stays. This rule will also be useful for housing and health."
      ]
    ],
    "5": [
      [
        "Besitz und Personen",
        "Mon/ma/mes richten sich nach dem besessenen Nomen, nicht nach dem Besitzer. Dasselbe gilt für ton/ta/tes und son/sa/ses. Notre/nos, votre/vos und leur/leurs unterscheiden Einzahl und Mehrzahl des Besitzes. Vor weiblichem Nomen mit Vokal steht mon, ton oder son. C’est stellt eine Person/Sache vor; ce sont mehrere.",
        "mon père · ma mère · mes parents · mon amie · leur mère · leurs enfants · C’est ma sœur. Ce sont mes frères.",
        "Possession and people",
        "Mon/ma/mes agree with the possessed noun, not its owner; so do ton/ta/tes and son/sa/ses. Notre/nos, votre/vos and leur/leurs distinguish a singular from a plural possession. Before a feminine noun beginning with a vowel, use mon, ton or son. C’est introduces one person/thing; ce sont introduces several."
      ],
      [
        "Familie beschreiben",
        "Célibataire = ledig, marié/mariée = verheiratet, divorcé/divorcée = geschieden. Bei diesen Personenbeschreibungen kommt für eine Frau ein e hinzu. Calme = ruhig, sympa = nett; diese beiden Wörter ändern sich im weiblichen Singular nicht.",
        "Il est marié. Elle est mariée. Elle est calme et sympa.",
        "Describing family",
        "Célibataire = single, marié/mariée = married, divorcé/divorcée = divorced. In these descriptions add e for a woman. Calme = calm, sympa = nice; these two words do not change in the feminine singular."
      ]
    ],
    "6": [
      [
        "Bestellen und Mengen",
        "Je voudrais bedeutet ich möchte; lerne es zunächst als höflichen Baustein. Un/une bezeichnet eine einzelne Portion. Eine unbestimmte Menge steht mit du (männlich), de la (weiblich), de l’ (vor Vokal), des (Mehrzahl). Nach pas wird daraus de/d’.",
        "un café · une salade · du pain · de la soupe · de l’eau · des pommes · pas de café",
        "Ordering and quantities",
        "Learn je voudrais as a polite phrase meaning I would like. Un/une is one portion. An unspecified amount uses du (masculine), de la (feminine), de l’ (before a vowel), des (plural). After pas these become de/d’."
      ],
      [
        "Wichtige Bausteine",
        "Prendre heißt nehmen: je prends, tu prends, il/elle prend, nous prenons, vous prenez, ils/elles prennent. Sans = ohne, préféré = Lieblings-, comme dessert = als Nachtisch, une glace = ein Eis, l’addition = die Rechnung. Vous voulez … ? fragt Möchten Sie …?; dafür genügt vorerst dieser ganze Baustein.",
        "Je prends la soupe sans viande. Mon plat préféré, c’est la pizza. L’addition, s’il vous plaît !",
        "Useful phrases",
        "Prendre means to take: je prends, tu prends, il/elle prend, nous prenons, vous prenez, ils/elles prennent. Sans = without, préféré = favourite, comme dessert = for dessert, une glace = an ice cream, l’addition = the bill. Learn vous voulez … ? as the complete phrase Would you like …? for now."
      ]
    ],
    "7": [
      [
        "Menge und Preis",
        "Nach kilo, grammes, bouteille und litre steht de, vor Vokal d’. Cent erhält ein s, wenn es vervielfacht wird und keine weitere Zahl folgt: deux cents, aber deux cent dix. Ein Preis von 650 Euro heißt six cent cinquante euros.",
        "un kilo de pommes · deux cents grammes de fromage · deux bouteilles d’eau · six euros cinquante",
        "Quantities and prices",
        "Use de after kilo, grammes, bouteille and litre; d’ before a vowel. Cent takes s when multiplied and not followed by another number: deux cents, but deux cent dix. 650 euros is six cent cinquante euros."
      ],
      [
        "Im Geschäft",
        "Par carte = mit Karte, en espèces = bar, taille = Größe, trop petit/grand = zu klein/groß. Je paie = ich bezahle, je prends = ich nehme. Est-ce que leitet eine Ja/Nein-Frage ein, ohne die folgende Wortstellung zu ändern. Ce pantalon / cette taille sind zunächst Bausteine für diese Hose / diese Größe; die vollständige Übersicht folgt in Lektion 13.",
        "Je peux payer par carte ? Est-ce que vous avez cette taille ? Je prends l’autre.",
        "In a shop",
        "Par carte = by card, en espèces = in cash, taille = size, trop petit/grand = too small/big. Je paie = I pay, je prends = I take. Est-ce que introduces a yes/no question without changing the word order after it. Learn ce pantalon / cette taille as this pair of trousers / this size; the full table comes in lesson 13."
      ]
    ],
    "8": [
      [
        "Eine Wohnung beschreiben",
        "Il y a bedeutet es gibt. Bei der Verneinung steht n’ vor y a und pas dahinter; aus un/une/des wird de. Verbinde positive und negative Ausstattung mit mais (aber). Pièce = Zimmer, chambre = Schlafzimmer, loyer = Miete, par mois = monatlich.",
        "Il y a une cuisine. Il n’y a pas de balcon. Il y a un jardin, mais il n’y a pas de garage.",
        "Describing a home",
        "Il y a means there is/are. In the negative n’ comes before y a, pas after it, and un/une/des becomes de. Link present and absent features with mais (but). Pièce = room, chambre = bedroom, loyer = rent, par mois = per month."
      ],
      [
        "Ort und Lage",
        "Sur = auf, sous = unter, dans = in, devant = vor, derrière = hinter, près de = in der Nähe von. À + le wird au, à + les wird aux; à la und à l’ bleiben getrennt. Visiter heißt hier besichtigen.",
        "sur la table · sous la chaise · derrière la maison · au centre · à la gare · aux toilettes",
        "Location and position",
        "Sur = on, sous = under, dans = in, devant = in front of, derrière = behind, près de = near. À + le becomes au, à + les becomes aux; à la and à l’ stay separate. Here visiter means to view a property."
      ]
    ],
    "9": [
      [
        "Eine Anweisung verstehen",
        "Der höfliche Imperativ verwendet die vous-Verbform ohne vous. Aller und prendre sind unregelmäßig; lerne Allez und Prenez ausdrücklich. Tourner ist regelmäßig: Tournez. Où fragt wo, puis bedeutet dann, à pied zu Fuß, quai Bahnsteig, retard Verspätung. Faut-il prendre … ? kannst du als Was muss man nehmen? im Kontext verstehen.",
        "Allez tout droit. Puis tournez à gauche. Prenez la ligne huit. Le train part du quai quatre.",
        "Understanding directions",
        "The polite imperative uses the vous verb form without vous. Aller and prendre are irregular: learn Allez and Prenez. Tourner is regular: Tournez. Où = where, puis = then, à pied = on foot, quai = platform, retard = delay. In context, learn faut-il prendre … ? as must one take …?"
      ]
    ],
    "10": [
      [
        "Verben und Beruf",
        "Travailler (arbeiten) und étudier (lernen/studieren) folgen den bekannten -er-Endungen. Commencer (beginnen) erhält bei nous ein ç für den weichen Laut. Bei être + Beruf steht gewöhnlich kein Artikel. Je dois faire mes devoirs ist zunächst der Baustein ich muss Hausaufgaben machen; devoir wird später vollständig erklärt.",
        "je travaille · tu travailles · il travaille · nous travaillons · vous travaillez · ils travaillent · nous commençons · Je suis médecin.",
        "Verbs and work",
        "Travailler (work) and étudier (study) use the familiar -er endings. Commencer (begin) has ç in the nous form to keep the soft sound. Normally use no article with être + profession. Learn je dois faire mes devoirs as I must do my homework; the full devoir table comes later."
      ]
    ],
    "11": [
      [
        "Reflexiv und gerade jetzt",
        "Se lever verbindet die Person mit me/te/se/nous/vous/se. Se coucher = ins Bett gehen folgt bei je dem Muster je me couche. Être en train de + Grundform beschreibt etwas, das gerade geschieht; vor Vokal wird de zu d’.",
        "je me lève · tu te lèves · elle se lève · nous nous levons · vous vous levez · ils se lèvent · Je suis en train d’écrire.",
        "Reflexive verbs and right now",
        "Se lever uses me/te/se/nous/vous/se with the matching person. Se coucher (go to bed) gives je me couche. Être en train de + infinitive describes something happening right now; de becomes d’ before a vowel."
      ],
      [
        "Tagesablauf",
        "Prendre wurde in Lektion 6 eingeführt. Für den Tagesablauf brauchst du außerdem je vais (ich gehe/fahre), je pars (ich gehe los), je rentre (ich komme zurück), tôt (früh), d’habitude (gewöhnlich), d’abord (zuerst), ensuite/puis (danach), enfin (schließlich).",
        "Je prends le petit-déjeuner. Je pars à huit heures. Je vais au travail. Le soir, je me couche.",
        "Daily routine",
        "Prendre was introduced in lesson 6. Useful routine phrases are je vais (I go), je pars (I leave), je rentre (I return), tôt (early), d’habitude (usually), d’abord (first), ensuite/puis (then), enfin (finally)."
      ]
    ],
    "12": [
      [
        "Schmerzen und Dauer",
        "J’ai mal à … nennt Schmerzen. À + le wird au, à + les wird aux; à la bleibt. Chez bezeichnet den Ort bei einer Person. Depuis quand fragt seit wann; depuis nennt hier einen noch andauernden Zustand. Contre = gegen, deux fois par jour = zweimal täglich, pendant trois jours = drei Tage lang.",
        "J’ai mal à la tête, au dos, aux dents. J’ai rendez-vous chez le médecin. Je suis malade depuis lundi.",
        "Pain and duration",
        "J’ai mal à … describes pain. À + le becomes au, à + les becomes aux; à la stays unchanged. Chez refers to someone’s home or premises. Depuis quand asks since when; depuis introduces an ongoing state. Contre = against, deux fois par jour = twice daily, pendant trois jours = for three days."
      ]
    ],
    "13": [
      [
        "Wetter und Zukunft",
        "Il fait + Wetter/Zahl und il pleut sind feste Wetterausdrücke. Il va + Grundform kündigt etwas an: va ist die il-Form von aller. Das ist ein erster Zukunftsbaustein; die vollständigen aller-Formen folgen in Lektion 15. Il va y avoir heißt es wird geben.",
        "Il fait froid. Il pleut. Il y a du vent. Demain, il va faire beau. Il va y avoir du vent.",
        "Weather and future",
        "Il fait + weather/number and il pleut are fixed weather expressions. Il va + infinitive predicts something: va is the il form of aller. This first future pattern is expanded with all aller forms in lesson 15. Il va y avoir means there will be."
      ],
      [
        "Begleiter und Farben",
        "Ce steht vor männlichem Nomen, cet vor männlichem Nomen mit Vokal/stummem h, cette vor weiblichem Nomen, ces im Plural. Regelmäßige Farben erhalten im weiblichen Singular e und im Plural zusätzlich s; rouge hat schon ein e. Petit steht vor dem Nomen, die Farbe dahinter.",
        "ce pantalon · cet hôtel · cette veste · ces chaussures · vert/verte/verts/vertes · bleu/bleue/bleus/bleues · noir/noire/noirs/noires · une petite veste bleue",
        "Determiners and colours",
        "Ce goes before a masculine noun, cet before a masculine noun beginning with a vowel/silent h, cette before a feminine noun, ces before a plural. Regular colours add e in the feminine and s in the plural; rouge already ends in e. Petit comes before the noun, the colour after it."
      ]
    ],
    "14": [
      [
        "Vorlieben und Aktivitäten",
        "Nach aimer, adorer oder préférer kann eine Grundform stehen. Bei allgemeinen Vorlieben für eine Sache steht meist le/la/les. Jouer à + Sport ergibt jouer au tennis; faire du sport ist Sport treiben. Faire ist unregelmäßig.",
        "je fais · tu fais · il/elle fait · nous faisons · vous faites · ils/elles font · J’aime le football. Je préfère lire.",
        "Preferences and activities",
        "Aimer, adorer and préférer may be followed by an infinitive. General preferences for a thing usually use le/la/les. Jouer à + sport gives jouer au tennis; faire du sport means to do sport. Faire is irregular."
      ],
      [
        "Préférer und Vorschläge",
        "Bei préférer wechselt der Akzent in je/tu/il/elle/ils/elles; nous und vous behalten é. On va … ? bedeutet Gehen wir …?; danach kann au cinéma oder eine Grundform stehen. On kann im Alltag wir bedeuten.",
        "je préfère · tu préfères · elle préfère · nous préférons · vous préférez · ils préfèrent · On va au cinéma ?",
        "Préférer and suggestions",
        "Préférer changes its accent in je/tu/il/elle/ils/elles; nous and vous keep é. On va … ? means Shall we go …? It can be followed by au cinéma or an infinitive. In everyday speech on can mean we."
      ]
    ],
    "15": [
      [
        "Pläne mit aller",
        "Konjugiere aller und lasse das zweite Verb in der Grundform. So unterscheidest du einen Plan von einem vergangenen Erlebnis. Nuit = Übernachtung/Nacht, inclus/compris = inbegriffen, aller simple = einfache Fahrt, aller-retour = Hin- und Rückfahrt.",
        "je vais · tu vas · il/elle va · nous allons · vous allez · ils/elles vont · Nous allons arriver lundi.",
        "Plans with aller",
        "Conjugate aller and keep the second verb in the infinitive. This distinguishes a future plan from a past experience. Nuit = night, inclus/compris = included, aller simple = one-way, aller-retour = return ticket."
      ]
    ],
    "16": [
      [
        "Einladen und absagen",
        "Pouvoir aus Lektion 2 steht mit Grundform. Ne … pas umschließt nur das konjugierte Verb, nicht die Grundform. Vouloir heißt wollen: die Einladung nutzt tu veux. Apporter = mitbringen, reporter = verschieben, rappeler = zurückrufen, désolé/désolée = es tut mir leid.",
        "je veux · tu veux · il/elle veut · nous voulons · vous voulez · ils/elles veulent · Tu veux venir ? Je ne peux pas venir. Ça te va ?",
        "Invitations and declining",
        "Pouvoir from lesson 2 takes an infinitive. Ne … pas surrounds only the conjugated verb, not the infinitive. Vouloir means to want: invitations use tu veux. Apporter = bring, reporter = postpone, rappeler = call back, désolé/désolée = sorry."
      ]
    ],
    "17": [
      [
        "Fragewörter und Nachricht",
        "Quel (männlich), quelle (weiblich), quels (männliche/gemischte Mehrzahl) und quelles (weibliche Mehrzahl) richten sich nach dem erfragten Nomen. Horaires ist Mehrzahl, adresse und nationalité sind weiblich. Écrivez und signez sind höfliche Anweisungen; en bas bedeutet unten.",
        "Quel est le prix ? Quelle est la date de début ? Quels sont les horaires ? Quelles sont les dates ? Je vous écris pour demander des informations. Merci de me répondre.",
        "Question words and messages",
        "Quel (masculine), quelle (feminine), quels (masculine/mixed plural) and quelles (feminine plural) agree with the noun asked about. Horaires is plural; adresse and nationalité are feminine. Écrivez and signez are polite instructions; en bas means at the bottom."
      ]
    ],
    "18": [
      [
        "Höfliche Bausteine",
        "Lerne diese höflichen Formen als ganze Wendungen; du musst noch keine allgemeine Konditionalbildung ableiten. Comprendre = verstehen, expliquer = erklären, dernière = letzte, avance = Voraus. Qu’est-ce que ça veut dire ? fragt nach der Bedeutung, nicht der Schreibweise.",
        "Je ne comprends pas. Pourriez-vous expliquer avec un exemple ? J’aimerais des informations. Je voudrais poser une question. On pourrait regarder ensemble. Merci d’avance.",
        "Polite phrases",
        "Learn these polite forms as complete phrases; you do not yet need a general rule for forming the conditional. Comprendre = understand, expliquer = explain, dernière = last, avance = advance. Qu’est-ce que ça veut dire ? asks for meaning, not spelling."
      ]
    ],
    "19": [
      [
        "Artikel wiederholen und Plural bilden",
        "Die Artikel aus Lektion 1 werden jetzt systematisch vertieft. Un/une wird im Plural des, le/la/l’ wird les; die meisten Nomen erhalten s. Ein Nomen auf -s, -x oder -z bleibt im Plural gleich, etwa prix. C’est wird für mehrere Dinge zu ce sont. Voici zeigt hier, voilà dort.",
        "un livre → des livres · une clé → des clés · un prix → des prix · l’hôtel → les hôtels · Voici mon passeport.",
        "Articles and plural forms",
        "The articles introduced in lesson 1 are now studied systematically. Un/une becomes des in the plural; le/la/l’ becomes les. Most nouns add s. Nouns ending in -s, -x or -z stay unchanged, such as prix. For several things c’est becomes ce sont. Voici points here; voilà points there."
      ]
    ],
    "20": [
      [
        "Verneinung und Regeln",
        "Ne … pas heißt nicht, ne … jamais heißt nie. Jamais ersetzt dabei pas. Il faut + Grundform drückt eine Pflicht aus, il ne faut pas + Grundform ein Verbot. Ne pas devoir und ne pas pouvoir sind damit nicht beliebig austauschbar.",
        "Je ne travaille pas. Je ne regarde jamais la télévision. Il faut réserver. Il ne faut pas fumer.",
        "Negation and rules",
        "Ne … pas means not, ne … jamais means never. Jamais replaces pas in this pattern. Il faut + infinitive expresses an obligation; il ne faut pas + infinitive expresses a prohibition. These are not interchangeable with ne pas devoir or ne pas pouvoir."
      ]
    ],
    "21": [
      [
        "Fragen und Bezug",
        "Où = wo, quand = wann, depuis quand = seit wann, pourquoi = warum, comment = wie, combien = wie viel. Combien de steht vor einer zählbaren Menge. Est-ce que lässt die Aussagewortstellung unverändert. Bei Inversion steht das Pronomen mit Bindestrich hinter dem Verb.",
        "Où habitez-vous ? Depuis quand habites-tu ici ? Est-ce que tu travailles ? Combien de personnes viennent ?",
        "Questions and reference",
        "Où = where, quand = when, depuis quand = since when, pourquoi = why, comment = how, combien = how much. Use combien de before a countable quantity. Est-ce que keeps statement word order. In inversion the pronoun follows the verb with a hyphen."
      ],
      [
        "Betonte Pronomen",
        "Nach einer Präposition oder zur Betonung stehen moi, toi, lui, elle, nous, vous, eux, elles. Eux bezeichnet mehrere Männer oder eine gemischte Gruppe, elles nur Frauen. Ses bedeutet sein/ihr mit mehreren besessenen Dingen; leur/leurs zeigt mehrere Besitzer.",
        "avec lui · avec elle · avec eux · avec elles · leur mère · leurs enfants · Moi, j’habite ici. Et toi ?",
        "Stressed pronouns",
        "After a preposition or for emphasis use moi, toi, lui, elle, nous, vous, eux, elles. Eux refers to several men or a mixed group; elles to women only. Ses means his/her with plural possessions; leur/leurs indicates several owners."
      ]
    ],
    "22": [
      [
        "Vergangenheit aufbauen",
        "Das passé composé braucht avoir oder bei den hier geübten Bewegungsverben être plus Partizip. Regelmäßiges -er wird -é; prendre hat das unregelmäßige Partizip pris, faire hat fait. Bei être stimmen Geschlecht und Zahl überein; bei einer rein weiblichen Mehrzahl kommen e und s zusammen.",
        "J’ai visité. J’ai pris le bus. Tu as fait quoi ? Il est arrivé. Elle est arrivée. Ils sont arrivés. Elles sont arrivées.",
        "Building the past tense",
        "The passé composé uses avoir, or être with the movement verbs practised here, plus a past participle. Regular -er becomes -é; prendre has irregular pris and faire has fait. With être, the participle agrees in gender and number; an all-female plural adds both e and s."
      ],
      [
        "Zeitbezug unterscheiden",
        "Venir de + Grundform bedeutet gerade etwas getan haben; aller + Grundform kündigt einen Plan an. Il y a + Dauer bedeutet vor, dans + Dauer in; depuis beschreibt einen noch andauernden Zustand mit Präsens.",
        "Je viens de manger. Je vais partir. Je suis arrivée il y a deux semaines. Je pars dans trois jours. J’habite ici depuis janvier.",
        "Distinguishing time references",
        "Venir de + infinitive means to have just done something; aller + infinitive introduces a future plan. Il y a + duration means ago, dans + duration means in; depuis describes an ongoing state with the present tense."
      ]
    ],
    "23": [
      [
        "Rezept und Anweisung",
        "Nach genauer Menge und nach un peu, beaucoup oder trop steht de/d’. Nach einer Verneinung wird aus du/de la/de l’/des meist de/d’. Beim höflichen Imperativ fällt vous weg. Bei mélanger bleibt das e vor z erhalten.",
        "couper → Coupez · ajouter → Ajoutez · mélanger → Mélangez · un couteau pour couper · une cuillère pour mélanger",
        "Recipes and instructions",
        "Use de/d’ after an exact amount and after un peu, beaucoup or trop. After a negative, du/de la/de l’/des usually becomes de/d’. The polite imperative omits vous. In mélanger the e before z stays."
      ],
      [
        "Zutaten und Geräte",
        "Farine = Mehl, lait = Milch, œuf/œufs = Ei/Eier, carotte = Karotte, pomme de terre = Kartoffel, légumes = Gemüse, sel = Salz, couteau = Messer, cuillère = Löffel. Pour + Grundform nennt den Zweck.",
        "trois œufs · deux cents grammes de farine · un peu de lait · pas de sucre · trop de sel",
        "Ingredients and utensils",
        "Farine = flour, lait = milk, œuf/œufs = egg/eggs, carotte = carrot, pomme de terre = potato, légumes = vegetables, sel = salt, couteau = knife, cuillère = spoon. Pour + infinitive expresses purpose."
      ]
    ],
    "24": [
      [
        "Länder und Pflicht",
        "Beim Ziel: à + Stadt, en + weibliches Land oder Land mit Vokal, au + männliches Land mit Konsonant, aux + Ländermehrzahl. Bei der Herkunft: de/d’, du, des. Devoir steht mit Grundform und drückt müssen aus.",
        "à Lyon · en France · en Allemagne · au Canada · aux États-Unis · de France · d’Allemagne · du Canada · des États-Unis · je dois · tu dois · il doit · nous devons · vous devez · ils doivent",
        "Countries and obligation",
        "Destinations: à + city, en + feminine country or country beginning with a vowel, au + masculine country beginning with a consonant, aux + plural country. Origin uses de/d’, du, des. Devoir takes an infinitive and expresses must."
      ],
      [
        "Abreise und Rückkehr",
        "Partir ist unregelmäßig: je pars, tu pars, il/elle part, nous partons, vous partez, ils/elles partent. Rester und rentrer folgen den bekannten -er-Endungen. En train/en bus/en voiture benennt das Verkehrsmittel; à pied bedeutet zu Fuß.",
        "Nous partons lundi. Nous restons trois jours. Je rentre vendredi. Je vais visiter Lyon.",
        "Leaving and returning",
        "Partir is irregular: je pars, tu pars, il/elle part, nous partons, vous partez, ils/elles partent. Rester and rentrer use the familiar -er endings. En train/en bus/en voiture specifies transport; à pied means on foot."
      ]
    ]
  },
  "de": {
    "1": [
      [
        "Personnes, présent et questions",
        "Ich = je, du = tu, er/sie/es = il/elle/ce, wir = nous, ihr = vous (plusieurs proches), sie = ils/elles, Sie = vous de politesse. Le verbe dépend du sujet. Deux noms ou ma mère et mon père donnent sie (pluriel). Paul und ich donne wir. Avec un verbe régulier, retire -en et ajoute -e, -st, -t, -en, -t, -en. Le verbe conjugué vient en deuxième position dans une déclaration, en première position dans une question oui/non.",
        "ich komme · du kommst · er kommt · wir kommen · ihr kommt · sie/Sie kommen · Wohnen Sie in Bonn?"
      ],
      [
        "Formes irrégulières à apprendre",
        "Sein (être), haben (avoir), heißen (s’appeler) et sprechen (parler) ne suivent pas tous le modèle régulier. Avec heißen, du prend -t, et non -st; sprechen change e en i avec du et er/sie/es. Pour l’âge, utilise sein + nombre + Jahre alt.",
        "sein: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind · haben: ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben · heißen: ich heiße, du heißt, er/sie/es heißt, wir heißen, ihr heißt, sie/Sie heißen · sprechen: ich spreche, du sprichst, er/sie/es spricht, wir sprechen, ihr sprecht, sie/Sie sprechen"
      ],
      [
        "Petits mots utiles",
        "Mein = mon devant un nom masculin ou neutre; meine = ma ou mes. Un nom allemand prend une majuscule. Und = et, aber = mais, ein bisschen = un peu. Deutsch et Französisch sont ici des noms de langues. Nein signifie non; nicht nie une information ou une action.",
        "Mein Name ist Nora. Meine Stadt ist Bonn. Ich spreche Deutsch. Ich wohne nicht in Paris."
      ]
    ],
    "2": [
      [
        "Demander de répéter",
        "Können se conjugue avec le sujet; le second verbe reste à l’infinitif en fin de proposition. La politesse emploie Sie avec une majuscule. Buchstabieren = épeler, wiederholen = répéter, langsamer = plus lentement, Umlaut = tréma allemand, Bindestrich = trait d’union, Doppel-n = deux n.",
        "ich kann · du kannst · er/sie kann · wir können · ihr könnt · sie/Sie können · Können Sie Ihren Namen bitte buchstabieren?"
      ]
    ],
    "3": [
      [
        "Coordonnées et dates",
        "Postleitzahl = code postal, Telefonnummer = numéro de téléphone, Geburtsort = lieu de naissance, Geburtsdatum = date de naissance. Dans une date : der erste, der zweite, der dritte, der vierte; après am : am ersten, am zweiten, am dritten, am vierten. April = avril. Pour une année 19xx, neunzehnhundert est suivi des deux derniers chiffres. Pour les jours 1–19, ajoute généralement -te au nombre; exceptions : erste, dritte, siebte. À partir de 20, ajoute -ste. Après am ou der dans une date, la terminaison change : der siebzehnte, am siebzehnten. Zweitausend signifie 2000.",
        "der dritte April · am dritten April · neunzehnhundertsechsundneunzig · Ich bin dreißig Jahre alt. · der siebzehnte April · am siebzehnten April · der zwanzigste April · am zwanzigsten April"
      ],
      [
        "Construire un nombre",
        "De 21 à 99, l’unité précède la dizaine avec und. L’unité de 21 est ein, pas eins. Les centaines peuvent se combiner : sechshundert = six cents. Pour un code postal, écoute chaque chiffre séparément.",
        "einundzwanzig · zweiunddreißig · neunundneunzig · hundert · sechshundert · null, eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun"
      ]
    ],
    "4": [
      [
        "Temps et négation",
        "Um + heure, am + jour, im + mois. Halb fünf est 4 h 30, pas 5 h 30; Viertel nach vier est 4 h 15, Viertel vor vier est 3 h 45. Nicht nie une action; kein/keine nie un nom sans article défini. Zeit est féminin : keine Zeit. Ich möchte dich treffen est un bloc utile pour proposer une rencontre; wir treffen uns signifie nous nous retrouvons. Wann demande quand; welcher Tag demande quel jour (Tag est masculin).",
        "Am Freitag im Juli um halb fünf. Ich kann nicht kommen. Ich habe keine Zeit. Hast du Zeit? Wir treffen uns vor der Bibliothek."
      ]
    ],
    "5": [
      [
        "Possession et famille",
        "Le possessif dépend du possesseur et du nom possédé. Devant un masculin/neutre au nominatif : mein, dein, sein, ihr, unser, euer, ihr/Ihr. Devant un féminin ou un pluriel : meine, deine, seine, ihre, unsere, eure, ihre/Ihre. Ihr avec majuscule marque la politesse.",
        "mein Vater · meine Mutter · meine Eltern · deine Bücher · seine Freunde · ihre Kinder · unsere Mutter · Ihre Telefonnummer"
      ],
      [
        "Après haben et avec une personne",
        "Haben demande un complément à l’accusatif : der → den, ein → einen; die/eine et das/ein restent identiques. Mit signifie avec et demande le datif. Apprends mit meiner Frau comme avec ma femme; l’accusatif ne s’applique pas après mit. Ledig = célibataire, verheiratet = marié, geschieden = divorcé.",
        "Ich habe einen Bruder und eine Schwester. Ich wohne mit meiner Frau in Bonn."
      ]
    ],
    "6": [
      [
        "Demander au singulier et au pluriel",
        "Hätte gern et möchte sont des demandes polies. Apprends les formes nécessaires; il n’est pas encore demandé de former le conditionnel en général. L’objet commandé est à l’accusatif. Bezahlen = payer, zusammen = au total.",
        "ich hätte · du hättest · er/sie hätte · wir hätten · ihr hättet · sie/Sie hätten · ich möchte · du möchtest · er/sie möchte · wir möchten · ihr möchtet · sie/Sie möchten"
      ],
      [
        "Article et précisions",
        "Au masculin, un objet prend einen; au féminin eine; au neutre ein. Ohne = sans, mit = avec; les demandes courtes ohne Milch ou mit Zucker sont des blocs. Frühstück = petit-déjeuner; zum Frühstück = au petit-déjeuner.",
        "einen Kaffee · eine Suppe · ein Wasser · Wir hätten gern zwei Kaffees. Ich möchte bezahlen."
      ]
    ],
    "7": [
      [
        "Prix et choix",
        "Un sujet singulier demande kostet, un pluriel kosten. Wie viel demande une quantité ou un prix; wie viele + pluriel demande un nombre. Devant un nom, les couleurs prennent une terminaison : apprends ici die rote Jacke et die blaue Jacke comme des groupes. Rot = rouge; blau = bleu. Die rote / die blaue peut ensuite remplacer Jacke.",
        "eine Flasche Wasser · zwei Flaschen Wasser · Wie viel kostet das? Wie viele Äpfel? Die blaue Jacke ist zu klein."
      ],
      [
        "Taille et étage",
        "In Größe … = en taille …; im ersten/zweiten Stock = au premier/deuxième étage. Zu + adjectif signifie trop : zu teuer, zu klein, zu groß, zu lang. Mit Karte bezahlen signifie payer par carte.",
        "Haben Sie das in Größe vierzig? Die Kasse ist im ersten Stock. Ich möchte mit Karte bezahlen."
      ]
    ],
    "8": [
      [
        "Articles et absence",
        "Après haben, suchen et brauchen, le complément direct est à l’accusatif. Un masculin demande einen/keinen, un féminin eine/keine, un neutre ein/kein. Kein Balkon décrit l’absence au nominatif; keinen Balkon suit hat/es gibt. Mit zwei Zimmern est un groupe au datif : après mit le pluriel Zimmer reçoit n.",
        "Die Wohnung hat einen Balkon. Die Wohnung hat keinen Balkon. Ich suche eine Wohnung. Ich möchte kein Haus kaufen."
      ],
      [
        "Annonce et visite",
        "Wohnung frei signifie disponible, pas gratuit. Miete = loyer, Nebenkosten inklusive = charges comprises, Besichtigung = visite. Sehen signifie voir et permet de demander une visite.",
        "Wie hoch ist die Miete? Kann ich die Wohnung am Dienstag um zehn Uhr sehen?"
      ]
    ],
    "9": [
      [
        "Consignes avec Sie ou du",
        "À la forme polie, utilise verbe + Sie : Gehen Sie, Nehmen Sie. Avec du, les consignes ici sont Geh, Nimm et Bring. Ne mélange pas les deux façons de t’adresser à la même personne. Mitbringen signifie apporter : Bring … mit.",
        "Gehen Sie geradeaus. Nehmen Sie die Linie acht. Geh nach links. Nimm den Bus. Bring bitte Wasser mit."
      ],
      [
        "Transport et lieu",
        "Fahren est irrégulier : ich fahre, du fährst, er/sie fährt, wir fahren, ihr fahrt, sie/Sie fahren. Zum = zu dem, zur = zu der. Neben = à côté de; links/rechts = à gauche/droite, zurück = en arrière. Muss ich … kaufen? est ici le bloc Dois-je acheter …? Mit demande le datif : der Bus → mit dem Bus; die Bahn → mit der Bahn. Welche Linie et welches Gleis sont les questions quelle ligne et quelle voie.",
        "zum Bahnhof · zur Schule · neben der Apotheke · Die Linie acht fährt zum Markt."
      ]
    ],
    "10": [
      [
        "Présent et ordre des mots",
        "Avec arbeiten (travailler), le radical finit en t : ajoute un e avant -st et -t pour faciliter la prononciation. Beginnen (commencer) suit le modèle régulier. Im = in dem; als + métier décrit le travail. Après heute ou am Montag, le verbe reste en deuxième position.",
        "ich arbeite · du arbeitest · er arbeitet · wir arbeiten · ihr arbeitet · sie/Sie arbeiten · Heute komme ich später."
      ],
      [
        "Prévenir",
        "Später = plus tard, pünktlich = à l’heure, bis = jusqu’à, der Kollege = le collègue. Bitte informieren Sie meinen Kollegen est une demande polie à apprendre comme bloc.",
        "Ich arbeite als Verkäuferin. Ich bin um neun Uhr im Büro. Bitte informieren Sie meinen Kollegen."
      ]
    ],
    "11": [
      [
        "Apprendre et lire",
        "Lernen = apprendre, machen = faire, brauchen = avoir besoin de : ils suivent les terminaisons régulières. Lesen est irrégulier : e devient ie avec du et er/sie/es. Seit + durée décrit une situation qui continue, au présent; après seit, le pluriel prend ici n.",
        "ich lese · du liest · er/sie liest · wir lesen · ihr lest · sie/Sie lesen · Ich lerne seit drei Monaten Deutsch."
      ],
      [
        "Demander du matériel",
        "Das Buch = livre; das Wörterbuch = dictionnaire; Hausaufgaben machen = faire ses devoirs. Avec können, mitbringen reste entier à la fin; sans modal, mit se détache. Ce verbe a été rencontré en leçon 9.",
        "Kannst du dein Wörterbuch mitbringen? Ich bringe mein Buch mit. Was brauchst du?"
      ]
    ],
    "12": [
      [
        "Loisirs et rencontre",
        "Spielen suit le modèle régulier : ich spiele, du spielst, er spielt, wir spielen, ihr spielt, sie spielen. Gern indique un goût; lieber une préférence; nicht gern une activité que l’on n’aime pas faire. Wollen wir … ? est un bloc pour proposer une activité; le second verbe reste à la fin.",
        "Ich spiele gern Tennis. Ich spiele lieber Volleyball. Wollen wir zusammen spielen? Wir treffen uns im Park."
      ]
    ],
    "13": [
      [
        "Réserver et partir",
        "Einzelzimmer = chambre individuelle, Doppelzimmer = chambre double, Familienzimmer = chambre familiale. Zwei Nächte = deux nuits, inklusive = compris, pro Nacht = par nuit. Abfahren et ankommen se séparent dans une déclaration; fahren conserve le changement de voyelle de la leçon 9. Vom ersten bis zum dritten August signifie du premier au trois août; vom = von dem et zum = zu dem. Dauern signifie durer : die Fahrt dauert zwei Stunden.",
        "Der Zug fährt um neun Uhr ab. Wir kommen um zehn Uhr an. Wir möchten ein Doppelzimmer reservieren."
      ]
    ],
    "14": [
      [
        "Symptômes et durée",
        "Avec un nom de symptôme, utilise haben : Fieber, Husten, Kopfschmerzen, Halsschmerzen. Avec krank ou müde, utilise sein. Depuis deux jours se dit seit zwei Tagen avec présent; seit demande ici le datif et le pluriel Tage reçoit n. Beim = bei dem.",
        "Ich habe Husten. Ich bin krank. Ich bin seit zwei Tagen krank. Ich habe einen Termin beim Arzt."
      ]
    ],
    "15": [
      [
        "Inviter, accepter et refuser",
        "Müssen signifie devoir : ich muss, du musst, er/sie muss, wir müssen, ihr müsst, sie/Sie müssen. Le second verbe reste à l’infinitif à la fin. Soll ich … ? demande Dois-je …? Mitbringen se sépare sans modal. Bei mir = chez moi, für = pour.",
        "Ich muss arbeiten. Soll ich einen Salat mitbringen? Ich bringe einen Kuchen mit. Vielen Dank für deine Einladung."
      ],
      [
        "Écrire à un proche",
        "Lieber Paul / Liebe Anna ouvre un message amical; Viele Grüße le termine. Bitte schreib mir est le bloc Écris-moi, s’il te plaît. Ich freue mich auf die Feier est un bloc facultatif pour Je me réjouis de la fête.",
        "Hallo Anna! Ich komme gern. Bitte schreib mir. Viele Grüße!"
      ]
    ],
    "16": [
      [
        "Permission et interdiction",
        "Dürfen exprime une permission : ich darf, du darfst, er/sie darf, wir dürfen, ihr dürft, sie/Sie dürfen. Man signifie on et prend la forme du singulier. Nicht dürfen signifie ne pas avoir le droit, pas ne pas être obligé. Verboten = interdit, erlaubt = autorisé, nur = seulement.",
        "Darf ich fotografieren? Hier darf man nicht rauchen. Fotografieren ist verboten. Essen ist nur im Café erlaubt."
      ],
      [
        "Lire les horaires",
        "Geöffnet = ouvert, geschlossen = fermé; von … bis … = de … à …, ab = à partir de. Ausfallen est séparable : le train est annulé se dit der Zug fällt aus.",
        "Geöffnet von neun bis achtzehn Uhr. Der Zug fällt heute aus."
      ]
    ],
    "17": [
      [
        "À moi ou me",
        "Mir est employé avec geben (donner), helfen (aider) et antworten (répondre). Mich est employé avec zurückrufen (rappeler). Ce sont des constructions à apprendre avec leur verbe. L’objet donné reste à l’accusatif. Nett = gentil, natürlich = bien sûr, einen Moment = un instant.",
        "Können Sie mir den Stift geben? Können Sie mir helfen? Können Sie mich zurückrufen? Das ist sehr nett."
      ]
    ],
    "18": [
      [
        "Consignes et étapes",
        "Les infinitifs sont lesen (lire), hören (écouter), schreiben (écrire), prüfen (vérifier), vergleichen (comparer), ankreuzen (cocher). Schreiben, prüfen et vergleichen suivent ici le modèle régulier. À la forme polie, place le verbe avant Sie; ankreuzen se sépare.",
        "Lesen Sie. Hören Sie. Schreiben Sie. Prüfen Sie. Kreuzen Sie die Antwort an."
      ],
      [
        "Verbe en deuxième position",
        "Zuerst = d’abord, dann/danach = ensuite, zum Schluss = pour finir. Une expression au début compte comme un seul groupe; le verbe conjugué suit, puis le sujet. Oder signifie ou.",
        "Zuerst lese ich. Dann schreibe ich. Danach vergleichen wir die Antworten. Zum Schluss prüfe ich den Text."
      ]
    ],
    "19": [
      [
        "Douleurs et pluriel",
        "Une seule partie du corps demande tut weh; plusieurs demandent tun weh. Le possessif suit le nom : mein Kopf, meine Hand, meine Hände. Arm/Arme = bras, Bein/Beine = jambe(s), Bauch = ventre, Rücken = dos, Hals = gorge.",
        "Mein Kopf tut weh. Meine Arme tun weh. Meine Hände tun weh. Seit wann tut es weh?"
      ],
      [
        "Demander une aide",
        "Avec brauchen, le nom demandé est à l’accusatif : einen Arzt, eine Apotheke. Helfen (aider) s’emploie avec mir comme en leçon 17. Nächste Apotheke = pharmacie la plus proche.",
        "Ich brauche einen Arzt. Können Sie mir helfen? Wo ist die nächste Apotheke?"
      ]
    ],
    "20": [
      [
        "Météo et vêtements",
        "Es ist + état : kalt, warm, sonnig, windig. Pour les précipitations : es regnet, es schneit. Après heute/morgen, le verbe reste deuxième. Im Winter = en hiver. Pour un projet futur, morgen suffit ici avec le présent.",
        "Heute regnet es. Morgen ist es windig. Im Winter trage ich einen Mantel."
      ],
      [
        "Conseiller un objet",
        "Brauchen demande l’accusatif. Der Mantel et der Regenschirm donnent einen Mantel / einen Regenschirm; die Jacke donne eine Jacke; das Hemd donne ein Hemd. Mitnehmen se sépare; l’impératif avec du est nimm … mit. Eine warme Jacke est ici un groupe utile, pas une nouvelle table de déclinaison à déduire.",
        "Ich nehme einen Regenschirm mit. Nimm einen Mantel mit. Bring eine warme Jacke mit."
      ]
    ],
    "21": [
      [
        "Sortie et billets",
        "Lesen et ses formes viennent de la leçon 11. Ins = in das pour une destination : ins Kino, ins Museum, ins Konzert. Vor + lieu indique le point de rencontre. Die Karte / die Karten désigne ici le billet / les billets; der Eintritt le prix d’entrée.",
        "Wollen wir ins Museum gehen? Treffen wir uns vor dem Kino? Ich kaufe zwei Karten."
      ]
    ],
    "22": [
      [
        "Appeler et écrire",
        "Anrufen et zurückrufen se séparent sans modal. Avec können, garde l’infinitif entier à la fin. Rufen Sie … zurück est la forme polie; ruf … zurück s’adresse à un proche. Répète la distinction mir/mich de la leçon 17; dir = à toi, Ihnen = à vous de politesse.",
        "Ich rufe dich an. Ich rufe Sie zurück. Bitte ruf mich zurück. Ich schicke dir ein Foto. Bitte antworten Sie mir."
      ]
    ],
    "23": [
      [
        "Au guichet",
        "Briefmarke = timbre, Umschlag = enveloppe, Ausweis = pièce d’identité, bekommen = obtenir, unterschreiben = signer, Anmeldung = inscription. Sich anmelden utilise mich avec ich; avec möchte l’infinitif reste entier à la fin. Ausfüllen se sépare dans une consigne.",
        "Ich möchte mich anmelden. Füllen Sie das Formular aus. Wo bekomme ich einen Ausweis? Wo kann ich unterschreiben?"
      ],
      [
        "Champs et consignes",
        "Geboren in indique le lieu de naissance; ce n’est pas forcément la ville où l’on habite. Geburtsdatum indique la date. Übertragen signifie reporter une information. Mitbringen, déjà connu, se retrouve dans bringen Sie … mit.",
        "Familienname · Vorname · Geburtsort · Geburtsdatum · Straße · Hausnummer · Bitte bringen Sie Ihren Ausweis mit."
      ]
    ],
    "24": [
      [
        "Combiner les acquis",
        "Reprends les personnes et les terminaisons de la leçon 1 : du kommst, wir kommen, ihr kommt, wir sprechen, er wohnt. Und ajoute une information, aber marque une opposition. Après aber, la proposition garde sujet + verbe.",
        "Ich komme gern, aber ich komme erst um acht Uhr. Ich wohne in Bonn und spreche Deutsch. Danke für deine Einladung."
      ]
    ]
  }
};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const translations={
    'Vor der ersten Übung':'Before the first exercise',
    'Regeln aus dem Einstieg':'Rules from the introduction',
    'Hier werden neue Formen erklärt. Die Vertiefung danach übt sie Schritt für Schritt.':'New forms are explained here. The following grammar section practises them step by step.'
  };
  for(const facts of Object.values(content.fr))for(const [title,rule,,enTitle,enRule]of facts){translations[title]=enTitle;translations[rule]=enRule;}
  function render(course,id,{review=false}={}){
    const facts=content[course]?.[id];if(!facts)return '';
    const french=course==='fr';
    const title=french?(review?'Regeln aus dem Einstieg':'Vor der ersten Übung'):(review?'Règles de l’introduction':'Avant le premier exercice');
    const body=facts.map(([heading,rule,forms])=>`<div class="lesson-foundation-rule"><h4>${esc(heading)}</h4><p>${esc(rule)}</p><p class="lesson-foundation-forms" lang="${course}" data-i18n-ignore>${esc(forms)}</p></div>`).join('');
    const inner=review?`<summary>${esc(title)}</summary>${body}`:`<h3>${esc(title)}</h3><p class="muted">${french?'Hier werden neue Formen erklärt. Die Vertiefung danach übt sie Schritt für Schritt.':'Les formes nouvelles sont expliquées ici. La partie grammaire les fait ensuite pratiquer pas à pas.'}</p>${body}`;
    const tag=review?'details':'section';
    return `<${tag} class="lesson-foundations${review?' is-review':''}" data-foundations="${course}-${Number(id)}">${inner}</${tag}>`;
  }
  window.A1LessonFoundations=Object.freeze({content,translations,render});
})();
