window.FR_A1_MASTERY_SPECS = {
  "1": {
    "goals": [
      "Begrüßungen und Verabschiedungen sicher verstehen.",
      "Sich mit Name, Wohnort, Herkunft und Sprache vorstellen.",
      "Die für eine erste Vorstellung nötigen Formen von être, regelmäßigen -er-Verben, venir und s’appeler verwenden."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "Je ___ allemand.",
        "answer": "suis",
        "tag": "être",
        "context": "Ich bin Deutscher."
      },
      {
        "type": "gap",
        "prompt": "Tu ___ allemand.",
        "answer": "es",
        "tag": "être",
        "context": "Du bist Deutscher."
      },
      {
        "type": "gap",
        "prompt": "Vous ___ allemand.",
        "answer": "êtes",
        "tag": "être",
        "context": "Sie sind Deutscher. (Höfliche Anrede an einen Mann.)"
      },
      {
        "type": "gap",
        "prompt": "J’___ à Halifax.",
        "answer": "habite",
        "tag": "-er-Verben",
        "context": "Ich wohne in Halifax."
      },
      {
        "type": "gap",
        "prompt": "Vous ___ à Paris.",
        "answer": "habitez",
        "tag": "-er-Verben",
        "context": "Sie wohnen in Paris."
      },
      {
        "type": "gap",
        "prompt": "Je ___ d’Allemagne.",
        "answer": "viens",
        "tag": "venir",
        "context": "Ich komme aus Deutschland."
      },
      {
        "type": "gap",
        "prompt": "Vous ___ du Canada.",
        "answer": "venez",
        "tag": "venir",
        "context": "Sie kommen aus Kanada."
      },
      {
        "type": "gap",
        "prompt": "Je m’___ Léa.",
        "answer": "appelle",
        "tag": "s’appeler",
        "context": "Ich heiße Léa."
      },
      {
        "type": "gap",
        "prompt": "Comment vous vous ___ ?",
        "answer": "appelez",
        "tag": "s’appeler",
        "context": "Wie heißen Sie?"
      }
    ]
  },
  "2": {
    "goals": [
      "Vor- und Nachnamen benennen und buchstabieren.",
      "Nach Schreibweise oder Buchstabierung fragen.",
      "é und ç als häufige französische Sonderzeichen erkennen."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "Vous pouvez ___, s’il vous plaît ?",
        "answer": "épeler",
        "tag": "Infinitiv",
        "context": "Können Sie bitte buchstabieren?",
        "explanation": "Nach pouvez steht die Grundform épeler: buchstabieren. Vous pouvez épeler, s’il vous plaît ? bedeutet „Können Sie bitte buchstabieren?“"
      },
      {
        "type": "gap",
        "prompt": "Mon ___ est Sophie.",
        "answer": "prénom",
        "tag": "Persönliche Daten",
        "context": "Mein Vorname ist Sophie.",
        "explanation": "Prénom bedeutet Vorname. Mon prénom est Sophie. = Mein Vorname ist Sophie."
      },
      {
        "type": "gap",
        "prompt": "Mon ___ est Dupont.",
        "answer": "nom de famille",
        "tag": "Persönliche Daten",
        "context": "Mein Familienname ist Dupont.",
        "explanation": "Nom de famille bedeutet Nachname. Mon nom de famille est Dupont. = Mein Nachname ist Dupont."
      },
      {
        "type": "choice",
        "q": "Welches Zeichen ist eine cédille?",
        "o": [
          "é",
          "ç",
          "à"
        ],
        "answer": "ç",
        "tag": "Alphabet",
        "explanation": "Die cédille ist das Zeichen unter dem c: ç."
      },
      {
        "type": "choice",
        "q": "Welches Zeichen trägt hier einen accent aigu?",
        "o": [
          "é",
          "è",
          "ç"
        ],
        "answer": "é",
        "tag": "Alphabet",
        "explanation": "Der accent aigu ist der nach rechts ansteigende Akzent über dem e: é."
      }
    ]
  },
  "3": {
    "goals": [
      "Zahlen bis 100 in typischen A1-Situationen verstehen.",
      "Alter, Telefonnummer, Geburtsdatum und Postleitzahl angeben.",
      "Das Alter mit avoir ausdrücken."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "J’___ vingt-six ans.",
        "answer": "ai",
        "tag": "avoir",
        "context": "Ich bin 26 Jahre alt."
      },
      {
        "type": "gap",
        "prompt": "Tu ___ vingt ans.",
        "answer": "as",
        "tag": "avoir",
        "context": "Du bist 20 Jahre alt."
      },
      {
        "type": "gap",
        "prompt": "Elle a ___ ans.",
        "answer": "trente",
        "tag": "Zahlen",
        "context": "Sie ist 30 Jahre alt."
      },
      {
        "type": "gap",
        "prompt": "Vous ___ quel âge ?",
        "answer": "avez",
        "tag": "avoir",
        "context": "Wie alt sind Sie?"
      },
      {
        "type": "choice",
        "q": "Welche Zahl ist soixante et onze?",
        "o": [
          "61",
          "71",
          "81"
        ],
        "answer": "71",
        "tag": "Zahlen"
      },
      {
        "type": "choice",
        "q": "Welche Zahl ist quatre-vingts?",
        "o": [
          "70",
          "80",
          "90"
        ],
        "answer": "80",
        "tag": "Zahlen"
      },
      {
        "type": "choice",
        "q": "Welche Zahl ist quatre-vingt-onze?",
        "o": [
          "81",
          "91",
          "99"
        ],
        "answer": "91",
        "tag": "Zahlen"
      }
    ]
  },
  "4": {
    "goals": [
      "Volle und häufige umgangssprachliche Uhrzeiten verstehen.",
      "Wochentage und Monate erkennen.",
      "Termine mit Tag, Datum und Uhrzeit ausdrücken."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "Le rendez-vous est mercredi ___ dix heures.",
        "answer": "à",
        "tag": "Uhrzeit",
        "context": "Der Termin ist am Mittwoch um zehn Uhr."
      },
      {
        "type": "gap",
        "prompt": "Nous sommes ___ cinq octobre.",
        "answer": "le",
        "tag": "Datum",
        "context": "Heute ist der fünfte Oktober."
      },
      {
        "type": "choice",
        "q": "Was bedeutet „et demie“ bei einer Uhrzeit?",
        "o": [
          "Viertel nach",
          "halb",
          "Viertel vor"
        ],
        "answer": "halb",
        "tag": "Uhrzeit"
      },
      {
        "type": "choice",
        "q": "Was bedeutet moins le quart?",
        "o": [
          "Viertel vor",
          "halb",
          "Viertel nach"
        ],
        "answer": "Viertel vor",
        "tag": "Uhrzeit"
      }
    ]
  },
  "5": {
    "goals": [
      "Enge Familienmitglieder und Familienstand benennen.",
      "mon, ma und mes passend zum französischen Nomen verwenden.",
      "Den Sonderfall mon amie und einfache Adjektiv-Kongruenz erkennen."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "C’est ___ frère.",
        "answer": "mon",
        "tag": "Possessiv",
        "context": "Das ist mein Bruder."
      },
      {
        "type": "gap",
        "prompt": "C’est ___ sœur.",
        "answer": "ma",
        "tag": "Possessiv",
        "context": "Das ist meine Schwester."
      },
      {
        "type": "gap",
        "prompt": "Ce sont ___ parents.",
        "answer": "mes",
        "tag": "Possessiv",
        "context": "Das sind meine Eltern."
      },
      {
        "type": "gap",
        "prompt": "C’est ___ amie.",
        "answer": "mon",
        "tag": "Possessiv",
        "context": "Das ist meine Freundin."
      },
      {
        "type": "choice",
        "q": "Welche Form passt zu une ___ sœur?",
        "o": [
          "petit",
          "petite",
          "petits"
        ],
        "answer": "petite",
        "tag": "Adjektive"
      },
      {
        "type": "gap",
        "prompt": "___ sont mes parents.",
        "answer": "Ce",
        "tag": "C’est / Ce sont",
        "context": "Das sind meine Eltern."
      }
    ]
  },
  "6": {
    "goals": [
      "Grundnahrungsmittel und Getränke verstehen.",
      "Mit je voudrais höflich bestellen.",
      "du, de la, de l’ und des als Teilungsartikel unterscheiden."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "Je voudrais ___ pain.",
        "answer": "du",
        "tag": "Teilungsartikel",
        "context": "Ich möchte Brot."
      },
      {
        "type": "gap",
        "prompt": "Je voudrais ___ soupe.",
        "answer": "de la",
        "tag": "Teilungsartikel",
        "context": "Ich möchte Suppe."
      },
      {
        "type": "gap",
        "prompt": "Je voudrais ___ eau.",
        "answer": "de l’",
        "accept": [
          "de l'",
          "de l’"
        ],
        "tag": "Teilungsartikel",
        "context": "Ich möchte Wasser."
      },
      {
        "type": "gap",
        "prompt": "Je voudrais ___ pommes.",
        "answer": "des",
        "tag": "Teilungsartikel",
        "context": "Ich möchte Äpfel."
      },
      {
        "type": "choice",
        "q": "Welche Form ist die höfliche Bestellung?",
        "o": [
          "Je voudrais un café.",
          "Je veux café.",
          "J’ai café."
        ],
        "answer": "Je voudrais un café.",
        "tag": "Höflichkeit"
      }
    ]
  },
  "7": {
    "goals": [
      "Nach Preisen fragen und bezahlen.",
      "Mengen mit kilo/grammes + de bilden.",
      "Größe, Preis und einfache Kaufentscheidungen ausdrücken."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "Un kilo ___ pommes, s’il vous plaît.",
        "answer": "de",
        "tag": "Mengen",
        "context": "Ein Kilo Äpfel, bitte."
      },
      {
        "type": "gap",
        "prompt": "Deux cents grammes ___ fromage.",
        "answer": "de",
        "tag": "Mengen",
        "context": "Zweihundert Gramm Käse."
      },
      {
        "type": "choice",
        "q": "Welche Frage fragt nach dem Preis?",
        "o": [
          "Combien ça coûte ?",
          "Quelle heure est-il ?",
          "Où est la gare ?"
        ],
        "answer": "Combien ça coûte ?",
        "tag": "Einkaufen"
      },
      {
        "type": "choice",
        "q": "Wie drückst du „mit Karte“ aus?",
        "o": [
          "par carte",
          "de carte",
          "à carte"
        ],
        "answer": "par carte",
        "tag": "Bezahlen"
      }
    ]
  },
  "8": {
    "goals": [
      "Wohnung, Zimmer, Möbel, Miete und Adresse beschreiben.",
      "il y a für „es gibt“ verwenden.",
      "Einfache Lagewörter und à + Artikel bei Orten unterscheiden."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "___ y a une cuisine.",
        "answer": "Il",
        "tag": "il y a",
        "context": "Es gibt eine Küche."
      },
      {
        "type": "choice",
        "q": "Die Tasse ist auf dem Tisch: La tasse est ___ la table.",
        "o": [
          "sur",
          "sous",
          "derrière"
        ],
        "answer": "sur",
        "tag": "Ort"
      },
      {
        "type": "choice",
        "q": "„unter“ heißt …",
        "o": [
          "sur",
          "sous",
          "devant"
        ],
        "answer": "sous",
        "tag": "Ort"
      },
      {
        "type": "choice",
        "q": "„vor“ heißt …",
        "o": [
          "devant",
          "derrière",
          "dans"
        ],
        "answer": "devant",
        "tag": "Ort"
      },
      {
        "type": "choice",
        "q": "Welche Form ist korrekt?",
        "o": [
          "à la gare",
          "au gare",
          "aux gare"
        ],
        "answer": "à la gare",
        "tag": "à + Artikel"
      },
      {
        "type": "choice",
        "q": "Welche Form ist korrekt?",
        "o": [
          "à le musée",
          "au musée",
          "aux musée"
        ],
        "answer": "au musée",
        "tag": "à + Artikel"
      },
      {
        "type": "choice",
        "q": "Welche Form ist korrekt?",
        "o": [
          "aux toilettes",
          "au toilettes",
          "à la toilettes"
        ],
        "answer": "aux toilettes",
        "tag": "à + Artikel"
      }
    ]
  },
  "9": {
    "goals": [
      "Nach Bahnhof, Haltestelle und anderen Orten fragen.",
      "Einfache Weganweisungen im Imperativ verstehen.",
      "Verkehrsinformationen wie Linie, Gleis und Verspätung verstehen."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "___ tout droit.",
        "answer": "Allez",
        "tag": "Imperativ",
        "context": "Gehen Sie geradeaus."
      },
      {
        "type": "gap",
        "prompt": "___ à gauche.",
        "answer": "Tournez",
        "tag": "Imperativ",
        "context": "Biegen Sie links ab."
      },
      {
        "type": "gap",
        "prompt": "___ la ligne 8.",
        "answer": "Prenez",
        "tag": "Imperativ",
        "context": "Nehmen Sie die Linie 8."
      },
      {
        "type": "gap",
        "prompt": "___ est la gare ?",
        "answer": "Où",
        "tag": "Fragen",
        "context": "Wo ist der Bahnhof?"
      }
    ]
  },
  "10": {
    "goals": [
      "Beruf, Arbeitsort und Arbeitszeiten nennen.",
      "Berufe nach être normalerweise ohne Artikel verwenden.",
      "Häufige regelmäßige -er-Verben in einfachen Aussagen verwenden."
    ],
    "tasks": [
      {
        "type": "choice",
        "q": "Welche Form ist korrekt?",
        "o": [
          "Je suis de médecin.",
          "Je suis médecin.",
          "Je suis de médecin."
        ],
        "answer": "Je suis médecin.",
        "tag": "Beruf"
      },
      {
        "type": "gap",
        "prompt": "Je ___ dans un bureau.",
        "answer": "travaille",
        "tag": "Präsens",
        "context": "Ich arbeite in einem Büro."
      },
      {
        "type": "gap",
        "prompt": "Je ___ à huit heures.",
        "answer": "commence",
        "tag": "Präsens",
        "context": "Ich fange um acht Uhr an."
      },
      {
        "type": "gap",
        "prompt": "Mon cours ___ à neuf heures.",
        "answer": "commence",
        "tag": "Präsens",
        "context": "Mein Kurs beginnt um neun Uhr."
      }
    ]
  },
  "11": {
    "goals": [
      "Einen Tagesablauf beschreiben.",
      "se lever in allen Personen als Modell für ein Reflexivverb konjugieren.",
      "être en train de + Infinitiv für eine gerade laufende Handlung bilden.",
      "d’abord, puis/ensuite und enfin als Reihenfolge verstehen."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "Je ___ lève à sept heures.",
        "answer": "me",
        "tag": "se lever",
        "context": "Ich stehe um sieben Uhr auf."
      },
      {
        "type": "gap",
        "prompt": "Tu ___ lèves tôt.",
        "answer": "te",
        "tag": "se lever",
        "context": "Du stehst früh auf."
      },
      {
        "type": "gap",
        "prompt": "Elle ___ lève à huit heures.",
        "answer": "se",
        "tag": "se lever",
        "context": "Sie steht um acht Uhr auf."
      },
      {
        "type": "gap",
        "prompt": "Nous nous ___.",
        "answer": "levons",
        "tag": "se lever",
        "context": "Wir stehen auf."
      },
      {
        "type": "gap",
        "prompt": "Vous vous ___.",
        "answer": "levez",
        "tag": "se lever",
        "context": "Sie stehen auf."
      },
      {
        "type": "gap",
        "prompt": "Ils se ___.",
        "answer": "lèvent",
        "tag": "se lever",
        "context": "Sie stehen auf."
      },
      {
        "type": "gap",
        "prompt": "Je ___ en train de travailler.",
        "answer": "suis",
        "tag": "être en train de",
        "context": "Ich bin gerade dabei zu arbeiten."
      },
      {
        "type": "gap",
        "prompt": "Nous ___ en train de manger.",
        "answer": "sommes",
        "tag": "être en train de",
        "context": "Wir sind gerade dabei zu essen."
      },
      {
        "type": "choice",
        "q": "Welches Wort bedeutet „zuerst“?",
        "o": [
          "d’abord",
          "enfin",
          "puis"
        ],
        "answer": "d’abord",
        "tag": "Reihenfolge"
      },
      {
        "type": "choice",
        "q": "Welches Wort bedeutet „schließlich“?",
        "o": [
          "ensuite",
          "enfin",
          "d’abord"
        ],
        "answer": "enfin",
        "tag": "Reihenfolge"
      }
    ]
  },
  "12": {
    "goals": [
      "Einfache Beschwerden und Symptome nennen.",
      "Seit wann nach einer Beschwerde fragen.",
      "In Apotheke oder Praxis höflich um Hilfe bzw. ein Medikament bitten."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "J’ai mal ___ la tête.",
        "answer": "à",
        "tag": "Gesundheit",
        "context": "Ich habe Kopfschmerzen."
      },
      {
        "type": "gap",
        "prompt": "___ quand êtes-vous malade ?",
        "answer": "Depuis",
        "tag": "Zeitfrage",
        "context": "Seit wann sind Sie krank?"
      },
      {
        "type": "choice",
        "q": "Welche Bitte ist in der Apotheke passend?",
        "o": [
          "Je voudrais un médicament contre le rhume.",
          "Je prends la gare.",
          "Je suis un médicament."
        ],
        "answer": "Je voudrais un médicament contre le rhume.",
        "tag": "Apotheke"
      }
    ]
  },
  "13": {
    "goals": [
      "Wetter und Jahreszeiten beschreiben.",
      "ce/cet/cette/ces passend zum Nomen unterscheiden.",
      "Einfache Adjektiv-Kongruenz und typische Adjektivstellung anwenden.",
      "aller + Infinitiv für eine nahe Vorhersage verwenden."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "___ livre",
        "answer": "ce",
        "tag": "Demonstrativ",
        "context": "dieses Buch"
      },
      {
        "type": "gap",
        "prompt": "___ hôtel",
        "answer": "cet",
        "tag": "Demonstrativ",
        "context": "dieses Hotel"
      },
      {
        "type": "gap",
        "prompt": "___ veste",
        "answer": "cette",
        "tag": "Demonstrativ",
        "context": "diese Jacke"
      },
      {
        "type": "gap",
        "prompt": "___ chaussures",
        "answer": "ces",
        "tag": "Demonstrativ",
        "context": "diese Schuhe"
      },
      {
        "type": "choice",
        "q": "Welche Form passt zu une veste ___ ?",
        "o": [
          "bleu",
          "bleue",
          "bleus"
        ],
        "answer": "bleue",
        "tag": "Adjektive"
      },
      {
        "type": "choice",
        "q": "Welche Wortstellung ist korrekt?",
        "o": [
          "une bleue petite veste",
          "une petite veste bleue",
          "une veste petite bleue"
        ],
        "answer": "une petite veste bleue",
        "tag": "Adjektive"
      },
      {
        "type": "gap",
        "prompt": "Demain, il ___ faire vingt degrés.",
        "answer": "va",
        "tag": "futur proche",
        "context": "Morgen werden es zwanzig Grad sein."
      }
    ]
  },
  "14": {
    "goals": [
      "Freizeitaktivitäten nennen.",
      "Vorlieben mit aimer, adorer, préférer und ne pas aimer ausdrücken.",
      "Bei allgemeinen Vorlieben häufig den bestimmten Artikel verwenden."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "J’___ le football.",
        "answer": "aime",
        "tag": "Vorlieben",
        "context": "Ich mag Fußball."
      },
      {
        "type": "gap",
        "prompt": "Je ___ lire à la maison.",
        "answer": "préfère",
        "tag": "Vorlieben",
        "context": "Ich lese lieber zu Hause."
      },
      {
        "type": "choice",
        "q": "Welche Form ist für eine allgemeine Vorliebe korrekt?",
        "o": [
          "J’aime le café.",
          "J’aime du café.",
          "J’aime de café."
        ],
        "answer": "J’aime le café.",
        "tag": "Artikel"
      },
      {
        "type": "gap",
        "prompt": "Je n’___ pas courir.",
        "answer": "aime",
        "tag": "Verneinung",
        "context": "Ich laufe nicht gern."
      }
    ]
  },
  "15": {
    "goals": [
      "Hotelzimmer und Fahrkarte höflich reservieren/kaufen.",
      "Reisezeiten erfragen.",
      "aller + Infinitiv als futur proche in allen Personen erkennen und bilden."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "Je ___ visiter Paris.",
        "answer": "vais",
        "tag": "aller",
        "context": "Ich werde Paris besuchen."
      },
      {
        "type": "gap",
        "prompt": "Tu ___ visiter Paris.",
        "answer": "vas",
        "tag": "aller",
        "context": "Du wirst Paris besuchen."
      },
      {
        "type": "gap",
        "prompt": "Elle ___ visiter Paris.",
        "answer": "va",
        "tag": "aller",
        "context": "Sie wird Paris besuchen."
      },
      {
        "type": "gap",
        "prompt": "Nous ___ visiter Paris.",
        "answer": "allons",
        "tag": "aller",
        "context": "Wir werden Paris besuchen."
      },
      {
        "type": "gap",
        "prompt": "Vous ___ visiter Paris.",
        "answer": "allez",
        "tag": "aller",
        "context": "Sie werden Paris besuchen."
      },
      {
        "type": "gap",
        "prompt": "Ils ___ visiter Paris.",
        "answer": "vont",
        "tag": "aller",
        "context": "Sie werden Paris besuchen."
      }
    ]
  },
  "16": {
    "goals": [
      "Einladen, zusagen, absagen und einen Termin verschieben.",
      "Glückwünsche und einfache Komplimente formulieren.",
      "pouvoir in allen Personen als häufiges A1-Modalverb konjugieren."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "Je ___ venir.",
        "answer": "peux",
        "tag": "pouvoir",
        "context": "Ich kann kommen."
      },
      {
        "type": "gap",
        "prompt": "Tu ___ venir.",
        "answer": "peux",
        "tag": "pouvoir",
        "context": "Du kannst kommen."
      },
      {
        "type": "gap",
        "prompt": "Il ___ venir.",
        "answer": "peut",
        "tag": "pouvoir",
        "context": "Er kann kommen."
      },
      {
        "type": "gap",
        "prompt": "Nous ___ venir.",
        "answer": "pouvons",
        "tag": "pouvoir",
        "context": "Wir können kommen."
      },
      {
        "type": "gap",
        "prompt": "Vous ___ venir.",
        "answer": "pouvez",
        "tag": "pouvoir",
        "context": "Sie können kommen."
      },
      {
        "type": "gap",
        "prompt": "Ils ___ venir.",
        "answer": "peuvent",
        "tag": "pouvoir",
        "context": "Sie können kommen."
      },
      {
        "type": "choice",
        "q": "Welche Form verschiebt einen Termin?",
        "o": [
          "On peut reporter le rendez-vous à demain ?",
          "Bon anniversaire !",
          "Je prends le train."
        ],
        "answer": "On peut reporter le rendez-vous à demain ?",
        "tag": "Termin"
      }
    ]
  },
  "17": {
    "goals": [
      "Typische Felder eines einfachen Formulars verstehen.",
      "Eine sehr kurze Informationsanfrage formulieren.",
      "quel/quelle passend zum Nomen verwenden."
    ],
    "tasks": [
      {
        "type": "choice",
        "q": "Welche Form passt vor nom?",
        "o": [
          "quel",
          "quelle",
          "quels"
        ],
        "answer": "quel",
        "tag": "quel / quelle"
      },
      {
        "type": "choice",
        "q": "Welche Form passt vor adresse?",
        "o": [
          "quel",
          "quelle",
          "quels"
        ],
        "answer": "quelle",
        "tag": "quel / quelle"
      },
      {
        "type": "choice",
        "q": "Welche Form leitet eine einfache Informationsanfrage ein?",
        "o": [
          "Je vous écris pour demander des informations.",
          "Je suis une information.",
          "Je prends informations."
        ],
        "answer": "Je vous écris pour demander des informations.",
        "tag": "Schreiben"
      }
    ]
  },
  "18": {
    "goals": [
      "Bei Verständnisproblemen um Wiederholung oder langsameres Sprechen bitten.",
      "ne … pas korrekt bilden und de nach einer verneinten Mengen-/avoir-Struktur erkennen.",
      "je voudrais, j’aimerais, pourriez-vous und on pourrait als höfliche feste A1-Formen verwenden."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "Je ne comprends ___.",
        "answer": "pas",
        "tag": "Verneinung",
        "context": "Ich verstehe nicht."
      },
      {
        "type": "gap",
        "prompt": "Je n’ai pas ___ voiture.",
        "answer": "de",
        "tag": "Verneinung + de",
        "context": "Ich habe kein Auto."
      },
      {
        "type": "choice",
        "q": "Welche Form ist besonders höflich?",
        "o": [
          "Pourriez-vous répéter ?",
          "Répète !",
          "Tu répètes."
        ],
        "answer": "Pourriez-vous répéter ?",
        "tag": "Höflichkeit"
      },
      {
        "type": "gap",
        "prompt": "J’___ des informations, s’il vous plaît.",
        "answer": "aimerais",
        "tag": "Conditionnel",
        "context": "Ich hätte gern Informationen, bitte."
      },
      {
        "type": "gap",
        "prompt": "Je ___ un café, s’il vous plaît.",
        "answer": "voudrais",
        "tag": "Conditionnel",
        "context": "Ich möchte einen Kaffee, bitte."
      },
      {
        "type": "gap",
        "prompt": "On ___ avoir l’addition ?",
        "answer": "pourrait",
        "tag": "Conditionnel",
        "context": "Könnten wir die Rechnung bekommen?"
      }
    ]
  },
  "19": {
    "goals": [
      "Bestimmte und unbestimmte Artikel nach Genus und Numerus wählen.",
      "Regelmäßige Pluralbildung erkennen.",
      "C’est/Ce sont sowie voici/voilà unterscheiden."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "___ café",
        "answer": "un",
        "tag": "Artikel",
        "context": "ein Kaffee"
      },
      {
        "type": "gap",
        "prompt": "___ baguette",
        "answer": "une",
        "tag": "Artikel",
        "context": "ein Baguette"
      },
      {
        "type": "gap",
        "prompt": "___ croissants",
        "answer": "des",
        "tag": "Artikel",
        "context": "Croissants (unbestimmter Plural)"
      },
      {
        "type": "gap",
        "prompt": "___ musée",
        "answer": "le",
        "tag": "Artikel",
        "context": "das Museum"
      },
      {
        "type": "gap",
        "prompt": "___ gare",
        "answer": "la",
        "tag": "Artikel",
        "context": "der Bahnhof"
      },
      {
        "type": "gap",
        "prompt": "___ hôtel",
        "answer": "l’",
        "accept": [
          "l'",
          "l’"
        ],
        "tag": "Artikel",
        "context": "das Hotel"
      },
      {
        "type": "gap",
        "prompt": "___ enfants",
        "answer": "les",
        "tag": "Artikel",
        "context": "die Kinder"
      },
      {
        "type": "choice",
        "q": "Welcher regelmäßige Plural ist korrekt?",
        "o": [
          "une baguette → des baguettes",
          "une baguette → des baguette",
          "une baguette → les baguette"
        ],
        "answer": "une baguette → des baguettes",
        "tag": "Plural"
      },
      {
        "type": "gap",
        "prompt": "___ sont des amis.",
        "answer": "Ce",
        "tag": "C’est / Ce sont",
        "context": "Das sind Freunde."
      },
      {
        "type": "choice",
        "q": "Welche Form bedeutet „Hier ist mein Pass“?",
        "o": [
          "Voici mon passeport.",
          "Voilà la gare.",
          "Ce sont mon passeport."
        ],
        "answer": "Voici mon passeport.",
        "tag": "Voici / voilà"
      }
    ]
  },
  "20": {
    "goals": [
      "Regelmäßige -er-Verben im Präsens in allen sechs Personen konjugieren.",
      "ne … pas und ne … jamais korrekt um das Verb setzen.",
      "il faut / il ne faut pas + Infinitiv für einfache Regeln verwenden."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "Je ___ français. (parler)",
        "answer": "parle",
        "tag": "-er-Verben",
        "context": "Ich spreche Französisch."
      },
      {
        "type": "gap",
        "prompt": "Tu ___ français. (parler)",
        "answer": "parles",
        "tag": "-er-Verben",
        "context": "Du sprichst Französisch."
      },
      {
        "type": "gap",
        "prompt": "Il ___ français. (parler)",
        "answer": "parle",
        "tag": "-er-Verben",
        "context": "Er spricht Französisch."
      },
      {
        "type": "gap",
        "prompt": "Nous ___ français. (parler)",
        "answer": "parlons",
        "tag": "-er-Verben",
        "context": "Wir sprechen Französisch."
      },
      {
        "type": "gap",
        "prompt": "Vous ___ français. (parler)",
        "answer": "parlez",
        "tag": "-er-Verben",
        "context": "Sie sprechen Französisch."
      },
      {
        "type": "gap",
        "prompt": "Ils ___ français. (parler)",
        "answer": "parlent",
        "tag": "-er-Verben",
        "context": "Sie sprechen Französisch."
      },
      {
        "type": "choice",
        "q": "Welche Verneinung ist korrekt?",
        "o": [
          "Je ne travaille pas aujourd’hui.",
          "Je travaille ne pas aujourd’hui.",
          "Je pas travaille aujourd’hui."
        ],
        "answer": "Je ne travaille pas aujourd’hui.",
        "tag": "ne … pas"
      },
      {
        "type": "choice",
        "q": "Welche Form bedeutet „Ich arbeite sonntags nie“?",
        "o": [
          "Je ne travaille jamais le dimanche.",
          "Je jamais travaille le dimanche.",
          "Je ne jamais travaille le dimanche."
        ],
        "answer": "Je ne travaille jamais le dimanche.",
        "tag": "ne … jamais"
      },
      {
        "type": "gap",
        "prompt": "Il ___ réserver.",
        "answer": "faut",
        "tag": "il faut",
        "context": "Man muss reservieren."
      },
      {
        "type": "gap",
        "prompt": "Il ne faut pas ___.",
        "answer": "fumer",
        "tag": "il ne faut pas",
        "context": "Man darf nicht rauchen."
      }
    ]
  },
  "21": {
    "goals": [
      "Ja/Nein-Fragen und wichtige A1-Fragewörter verwenden.",
      "Qui est-ce ? und Qu’est-ce que c’est ? unterscheiden.",
      "Possessivbegleiter in häufigen Formen wählen.",
      "Betonte Personalpronomen zur Hervorhebung und nach et verwenden."
    ],
    "tasks": [
      {
        "type": "choice",
        "q": "Welches Fragewort bedeutet „wo“?",
        "o": [
          "où",
          "quand",
          "pourquoi"
        ],
        "answer": "où",
        "tag": "Fragewörter"
      },
      {
        "type": "choice",
        "q": "Welches Fragewort bedeutet „wann“?",
        "o": [
          "comment",
          "quand",
          "combien"
        ],
        "answer": "quand",
        "tag": "Fragewörter"
      },
      {
        "type": "choice",
        "q": "Welches Fragewort bedeutet „wie viel“?",
        "o": [
          "combien",
          "où",
          "quel"
        ],
        "answer": "combien",
        "tag": "Fragewörter"
      },
      {
        "type": "choice",
        "q": "Welche Frage fragt nach einer Person?",
        "o": [
          "Qui est-ce ?",
          "Qu’est-ce que c’est ?",
          "Combien ça coûte ?"
        ],
        "answer": "Qui est-ce ?",
        "tag": "Fragen"
      },
      {
        "type": "choice",
        "q": "Welche Frage fragt nach einer Sache?",
        "o": [
          "Qui est-ce ?",
          "Qu’est-ce que c’est ?",
          "Où est-ce ?"
        ],
        "answer": "Qu’est-ce que c’est ?",
        "tag": "Fragen"
      },
      {
        "type": "gap",
        "prompt": "C’est ___ frère.",
        "answer": "mon",
        "tag": "Possessiv",
        "context": "Das ist mein Bruder."
      },
      {
        "type": "gap",
        "prompt": "C’est ___ sœur.",
        "answer": "ma",
        "tag": "Possessiv",
        "context": "Das ist meine Schwester."
      },
      {
        "type": "gap",
        "prompt": "Ce sont ___ parents.",
        "answer": "mes",
        "tag": "Possessiv",
        "context": "Das sind meine Eltern."
      },
      {
        "type": "choice",
        "q": "Welche betonte Form gehört zu tu?",
        "o": [
          "moi",
          "toi",
          "lui"
        ],
        "answer": "toi",
        "tag": "Pronomen"
      },
      {
        "type": "choice",
        "q": "Welche betonte Form gehört zu ils?",
        "o": [
          "eux",
          "elles",
          "lui"
        ],
        "answer": "eux",
        "tag": "Pronomen"
      }
    ]
  },
  "22": {
    "goals": [
      "Ein einfaches passé composé mit avoir bilden.",
      "Einige häufige Bewegungsverben im passé composé mit être verwenden.",
      "passé récent mit venir de + Infinitiv bilden.",
      "il y a, dans und depuis zeitlich unterscheiden."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "J’___ visité un musée.",
        "answer": "ai",
        "tag": "passé composé",
        "context": "Ich habe ein Museum besucht."
      },
      {
        "type": "gap",
        "prompt": "Nous ___ mangé au restaurant.",
        "answer": "avons",
        "tag": "passé composé",
        "context": "Wir haben im Restaurant gegessen."
      },
      {
        "type": "gap",
        "prompt": "Elle a ___. (travailler)",
        "answer": "travaillé",
        "tag": "Partizip",
        "context": "Sie hat gearbeitet."
      },
      {
        "type": "gap",
        "prompt": "J’ai ___. (regarder)",
        "answer": "regardé",
        "tag": "Partizip",
        "context": "Ich habe zugesehen."
      },
      {
        "type": "gap",
        "prompt": "Je ___ allé(e) au cinéma.",
        "answer": "suis",
        "tag": "passé composé mit être",
        "context": "Ich bin ins Kino gegangen."
      },
      {
        "type": "gap",
        "prompt": "Elle est ___. (arriver)",
        "answer": "arrivée",
        "tag": "Kongruenz",
        "context": "Sie ist angekommen."
      },
      {
        "type": "gap",
        "prompt": "Nous sommes ___. (partir; gemischte/männliche Gruppe)",
        "answer": "partis",
        "tag": "Kongruenz",
        "context": "Wir sind weggegangen."
      },
      {
        "type": "gap",
        "prompt": "Je ___ de manger.",
        "answer": "viens",
        "tag": "passé récent",
        "context": "Ich habe gerade gegessen."
      },
      {
        "type": "choice",
        "q": "Welche Form bedeutet „vor drei Tagen“?",
        "o": [
          "il y a trois jours",
          "dans trois jours",
          "depuis trois jours"
        ],
        "answer": "il y a trois jours",
        "tag": "Zeit"
      },
      {
        "type": "choice",
        "q": "Welche Form bedeutet „in zwei Tagen“?",
        "o": [
          "il y a deux jours",
          "dans deux jours",
          "depuis deux jours"
        ],
        "answer": "dans deux jours",
        "tag": "Zeit"
      },
      {
        "type": "choice",
        "q": "Welche Form bedeutet „seit zwei Jahren“?",
        "o": [
          "depuis deux ans",
          "dans deux ans",
          "il y a deux ans"
        ],
        "answer": "depuis deux ans",
        "tag": "Zeit"
      }
    ]
  },
  "23": {
    "goals": [
      "Teilungsartikel für unbestimmte Mengen wählen.",
      "Nach Mengen und in typischen Verneinungen de/d’ verwenden.",
      "un peu de und beaucoup de bilden.",
      "pour + Infinitiv sowie il faut / il ne faut pas verwenden."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "___ pain",
        "answer": "du",
        "tag": "Teilungsartikel",
        "context": "Brot (eine unbestimmte Menge)"
      },
      {
        "type": "gap",
        "prompt": "___ farine",
        "answer": "de la",
        "tag": "Teilungsartikel",
        "context": "Mehl (eine unbestimmte Menge)"
      },
      {
        "type": "gap",
        "prompt": "___ œufs",
        "answer": "des",
        "tag": "Teilungsartikel",
        "context": "Eier (eine unbestimmte Menge)"
      },
      {
        "type": "gap",
        "prompt": "Un kilo ___ pommes.",
        "answer": "de",
        "tag": "Mengen",
        "context": "Ein Kilo Äpfel."
      },
      {
        "type": "gap",
        "prompt": "Je n’ai pas ___ sucre.",
        "answer": "de",
        "tag": "Verneinung",
        "context": "Ich habe keinen Zucker."
      },
      {
        "type": "gap",
        "prompt": "Un peu ___ lait.",
        "answer": "de",
        "tag": "Mengen",
        "context": "Ein wenig Milch."
      },
      {
        "type": "gap",
        "prompt": "Un couteau pour ___ les légumes.",
        "answer": "couper",
        "tag": "pour + Infinitiv",
        "context": "Ein Messer, um das Gemüse zu schneiden."
      },
      {
        "type": "gap",
        "prompt": "Il ___ trois œufs.",
        "answer": "faut",
        "tag": "il faut",
        "context": "Man braucht drei Eier."
      },
      {
        "type": "choice",
        "q": "Welche Form ist korrekt?",
        "o": [
          "Il ne faut pas ajouter trop de sel.",
          "Il ne pas faut ajouter trop de sel.",
          "Il pas faut ajouter trop de sel."
        ],
        "answer": "Il ne faut pas ajouter trop de sel.",
        "tag": "il ne faut pas"
      }
    ]
  },
  "24": {
    "goals": [
      "Städte und Länder mit à/en/au/aux als Ziel ausdrücken.",
      "Herkunft mit de/d’/du/des ausdrücken.",
      "devoir als wichtiges Modalverb in allen sechs Personen konjugieren.",
      "Einfache Reisepläne mit futur proche formulieren."
    ],
    "tasks": [
      {
        "type": "gap",
        "prompt": "Je vais ___ Paris.",
        "answer": "à",
        "tag": "Ziel",
        "context": "Ich fahre nach Paris."
      },
      {
        "type": "gap",
        "prompt": "Je vais ___ France.",
        "answer": "en",
        "tag": "Ziel",
        "context": "Ich fahre nach Frankreich."
      },
      {
        "type": "gap",
        "prompt": "Je vais ___ Canada.",
        "answer": "au",
        "tag": "Ziel",
        "context": "Ich fahre nach Kanada."
      },
      {
        "type": "gap",
        "prompt": "Je vais ___ États-Unis.",
        "answer": "aux",
        "tag": "Ziel",
        "context": "Ich fahre in die USA."
      },
      {
        "type": "gap",
        "prompt": "Je viens ___ France.",
        "answer": "de",
        "tag": "Herkunft",
        "context": "Ich komme aus Frankreich."
      },
      {
        "type": "gap",
        "prompt": "Je viens ___ Allemagne.",
        "answer": "d’",
        "accept": [
          "d'",
          "d’"
        ],
        "tag": "Herkunft",
        "context": "Ich komme aus Deutschland."
      },
      {
        "type": "gap",
        "prompt": "Je viens ___ Canada.",
        "answer": "du",
        "tag": "Herkunft",
        "context": "Ich komme aus Kanada."
      },
      {
        "type": "gap",
        "prompt": "Je viens ___ États-Unis.",
        "answer": "des",
        "tag": "Herkunft",
        "context": "Ich komme aus den USA."
      },
      {
        "type": "gap",
        "prompt": "Je ___ partir.",
        "answer": "dois",
        "tag": "devoir",
        "context": "Ich muss gehen."
      },
      {
        "type": "gap",
        "prompt": "Tu ___ partir.",
        "answer": "dois",
        "tag": "devoir",
        "context": "Du musst gehen."
      },
      {
        "type": "gap",
        "prompt": "Elle ___ partir.",
        "answer": "doit",
        "tag": "devoir",
        "context": "Sie muss gehen."
      },
      {
        "type": "gap",
        "prompt": "Nous ___ partir.",
        "answer": "devons",
        "tag": "devoir",
        "context": "Wir müssen gehen."
      },
      {
        "type": "gap",
        "prompt": "Vous ___ partir.",
        "answer": "devez",
        "tag": "devoir",
        "context": "Sie müssen gehen."
      },
      {
        "type": "gap",
        "prompt": "Ils ___ partir.",
        "answer": "doivent",
        "tag": "devoir",
        "context": "Sie müssen gehen."
      }
    ]
  }
};


/* Dedicated lesson checks: contextual decisions, distinct from the practice quiz.
   Each key is one check focus; family separates related tasks in the running test. */
(() => {
  const bank={
    1:[
      ['saluer','Du begrüßt eine unbekannte Person am Abend. Welche Form passt?','Bonsoir, Madame.','Bonjour, Madame.','Au revoir, Madame.','Bonsoir begrüßt am Abend; au revoir verabschiedet.'],
      ['nom','Léa fragt Paul: « Comment vous vous appelez ? » Paul antwortet:','Je m’appelle Paul.','Vous vous appelez Paul.','Je m’appelle Léa.','Paul nennt seinen eigenen Namen mit je.'],
      ['origine','Anna sagt: « Je viens de Berlin, mais j’habite à Lyon. » Welche Aussage stimmt?','Anna wohnt in Lyon und kommt aus Berlin.','Anna wohnt in Berlin und kommt aus Lyon.','Anna wohnt in Lyon und kommt aus Lyon.','Venir de bezeichnet hier die Herkunft, habiter den Wohnort.',false],
      ['langues','Paul spricht Deutsch und nur ein bisschen Französisch. Welche Aussage passt genau?','Je parle allemand et un peu français.','Je parle français et un peu allemand.','Je parle allemand et français.','Un peu bezieht sich hier ausdrücklich auf Französisch.'],
      ['reagir','« Comment allez-vous ? » Du möchtest sagen, dass es dir gut geht, und danken.','Ça va bien, merci.','Ça va, et vous ?','Ça ne va pas bien, merci.','Bien nennt das gute Befinden, merci den Dank.'],
      ['habiter','Du kennst Marcs Namen schon und möchtest seinen Wohnort erfahren.','Vous habitez où ?','Vous venez d’où ?','Comment vous vous appelez ?','Habiter fragt nach dem Wohnort, venir nach der Herkunft.'],
      ['registre','« Salut ! Je m’appelle Léa. Et toi ? » Welche Aussage beschreibt die Anrede?','Léa verwendet die vertrauliche Anrede.','Léa verwendet die höfliche Anrede.','Léa spricht ausdrücklich mehrere Personen an.','Toi ist hier die vertrauliche Anrede an eine Person.',false],
      ['quitter','Du sagst ausdrücklich „Auf Wiedersehen“ zu einer Person, die du siezt.','Au revoir, Monsieur.','Bonsoir, Monsieur.','Enchanté, Monsieur.','Au revoir beendet das Gespräch. Enchanté gehört zum Kennenlernen.']
    ],
    2:[
      ['formulaire','Im Formular steht « Nom de famille : Martin / Prénom : Léa ». Was ist der Vorname?','Léa','Martin','Léa Martin','Prénom bezeichnet den Vornamen.',false],
      ['epeler','Du hast den Nachnamen gehört, weißt aber nicht, welche Buchstaben er enthält.','Vous pouvez épeler votre nom ?','Vous pouvez répéter votre nom ?','Vous pouvez écrire votre nom ?','Épeler bittet darum, die Buchstaben zu nennen.'],
      ['signes','Der Vorname wird Z-O-E buchstabiert; das E trägt einen accent aigu. Welche Schreibweise passt?','Zoé','Zoè','Zoê','Zoé trägt einen accent aigu.'],
      ['cedille','Der Name wird F-R-A-N-C-O-I-S buchstabiert; das C trägt eine Cedille. Welche Schreibweise passt?','François','Francois','Francoïs','Die Cedille sitzt am c: ç. Das i trägt hier kein Sonderzeichen.'],
      ['adresse','« Quelle est votre adresse ? » Welche Antwort enthält die erfragte Information?','12, rue Victor-Hugo, à Paris.','Mon nom est Victor Hugo.','Mon prénom est Victor.','Adresse fragt nach der Anschrift, nicht nach einem Namen.'],
      ['clarifier','Die Person spricht zu schnell. Du möchtest das Sprechtempo ändern.','Vous pouvez parler plus lentement ?','Vous pouvez épeler votre nom ?','Vous pouvez écrire votre adresse ?','Plus lentement bedeutet langsamer.'],
      ['lettres','Der Nachname wird « M-O-R-E-A-U » buchstabiert. Welche Eintragung passt?','Moreau','Moreu','Moreaux','Alle und nur die genannten Buchstaben werden übernommen.'],
      ['intention','« Comment ça s’écrit ? » Was möchte die Person erfahren?','Die Schreibweise eines Wortes.','Die Aussprache eines Wortes.','Die Bedeutung eines Wortes.','S’écrire bezieht sich auf die Schreibweise.',false]
    ],
    3:[
      ['age','« J’ai trente et un ans. Mon frère a treize ans. » Wie alt ist die sprechende Person?','31','13','30','J’ai bezieht sich auf die sprechende Person; mon frère auf den Bruder.',false],
      ['telephone','Du möchtest die Telefonnummer erfragen.','Quel est votre numéro de téléphone ?','Quel est votre code postal ?','Quelle est votre date de naissance ?','Numéro de téléphone fragt nach der Telefonnummer.'],
      ['naissance','Im Formular steht « 17 avril ». Welche Aussage gibt dieses Geburtsdatum wieder?','Je suis né le dix-sept avril.','Je suis né le sept avril.','Je suis né le dix-sept mai.','Dix-sept ist 17; avril ist April.'],
      ['nombres','Welche Zahl entspricht « soixante et onze »?','71','61','81','Soixante et onze bezeichnet 60 + 11.',false],
      ['numero','Eine Nummer endet auf « quatre-vingt-onze, vingt-quatre ». Welche vier Ziffern sind das?','9124','8124','9142','Quatre-vingt-onze ist 91, vingt-quatre ist 24.',false],
      ['donnees','« Paul : B3V 2L1. Léa : B3V 1L2. » Welche Postleitzahl gehört zu Léa?','B3V 1L2','B3V 2L1','B2V 1L3','Die zweite Angabe gehört zu Léa, nicht zu Paul.',false],
      ['quantite','« Nous sommes vingt étudiants. Dix étudiants parlent allemand. » Wie viele Personen sind im Kurs?','20','10','30','Vingt nennt die Gesamtzahl; dix beschreibt nur eine Teilgruppe.',false],
      ['cent','Du sollst die Zahl 100 ausschreiben.','cent','quatre-vingts','quatre-vingt-dix','Cent ist 100; quatre-vingts ist 80, quatre-vingt-dix ist 90.']
    ],
    4:[
      ['heure','Ein Termin ist um 8:45 Uhr. Welche Angabe passt?','À neuf heures moins le quart.','À huit heures et quart.','À neuf heures et quart.','Viertel vor neun ist 8:45 Uhr.'],
      ['rendezvous','« Mardi, je travaille. On se voit mercredi à dix heures. » Wann ist das Treffen?','Mittwoch um 10 Uhr.','Dienstag um 10 Uhr.','Mittwoch um 12 Uhr.','Der erste Satz beschreibt die Arbeit, der zweite das Treffen.',false],
      ['question','Du kennst den Wochentag des Termins und möchtest jetzt die Uhrzeit erfragen.','À quelle heure est le rendez-vous ?','Quel jour est le rendez-vous ?','Quelle heure est-il ?','À quelle heure fragt nach der Uhrzeit eines Ereignisses.'],
      ['date','« Nous sommes le premier mars. » Welches Datum ist gemeint?','1. März','1. Mai','3. Januar','Premier bezeichnet den ersten Tag, mars den März.',false],
      ['ouverture','« Le bureau est ouvert du lundi au vendredi, à partir de neuf heures. » Was stimmt?','Am Mittwoch öffnet das Büro um 9 Uhr.','Am Mittwoch öffnet das Büro erst um 12 Uhr.','Das Büro ist nur montags und freitags offen.','Du lundi au vendredi umfasst die Wochentage dazwischen.',false],
      ['disponible','« Je suis libre le matin, mais pas l’après-midi. » Welcher Vorschlag passt dazu?','On se voit à neuf heures ?','On se voit à quinze heures ?','On se voit à dix-sept heures ?','Neun Uhr liegt am Vormittag, die anderen Zeiten am Nachmittag.'],
      ['retard','Du kündigst an, später zu kommen, ohne einen anderen Tag zu nennen.','Je viens plus tard.','Je viens plus tôt.','Je viens demain.','Plus tard bedeutet später; demain verschiebt auf morgen.'],
      ['demie','« Il est quatre heures et demie. » Welche Uhrzeit entspricht dem genau?','4:30','4:15','5:30','Die halbe Stunde wird zur bereits genannten vier addiert.',false]
    ],
    5:[
      ['parentes','« Paul est mon frère. Sa fille s’appelle Léa. » Wer ist Léa?','Die Tochter von Paul.','Die Schwester von Paul.','Die Mutter von Paul.','Sa fille bezeichnet Pauls Tochter.',false],
      ['etat','« Je suis célibataire. Ma sœur est mariée. » Was sagt die Person über sich selbst?','Sie ist ledig.','Sie ist verheiratet.','Sie ist geschieden.','Je suis célibataire bezieht sich auf die sprechende Person.',false],
      ['description','Du beschreibst deine Schwester als klein und ruhig.','Ma sœur est petite et calme.','Ma sœur est grande et calme.','Ma sœur est petite et sympa.','Petite beschreibt klein, calme ruhig.'],
      ['possession','« Léa habite avec ses parents. » Zu wem gehören die Eltern in diesem Satz?','Zu Léa.','Zur angesprochenen Person.','Zur sprechenden Person.','Ses verweist hier auf Léa.',false],
      ['nombre','« Nous avons deux enfants : un fils et une fille. » Was stimmt?','Die Familie hat einen Sohn und eine Tochter.','Die Familie hat zwei Söhne.','Die Familie hat zwei Töchter.','Un fils und une fille sind zusammen zwei Kinder.',false],
      ['question','Du möchtest wissen, wie viele Geschwister jemand hat.','Vous avez combien de frères et sœurs ?','Vos frères et sœurs ont quel âge ?','Comment s’appellent vos frères et sœurs ?','Combien fragt nach der Anzahl, nicht nach Alter oder Namen.'],
      ['accord','Du stellst Léa und Paul als deine Freunde vor. Welche Aussage ist im geschriebenen Standard korrekt?','Ce sont mes amis.','C’est mes amis.','Ce sont mon ami.','Für die beiden Freunde steht ce sont und mes amis.'],
      ['famille','« Ma mère habite à Paris. Mon père habite à Lyon. » Wen kann man in Lyon besuchen?','Den Vater.','Die Mutter.','Beide Eltern.','Nur mon père wird Lyon zugeordnet.',false]
    ],
    6:[
      ['commander','Du möchtest höflich einen Kaffee bestellen. Welche Bitte passt?','Je voudrais un café, s’il vous plaît.','Je voudrais de l’eau, s’il vous plaît.','Je voudrais un thé, s’il vous plaît.','Die höfliche Form bleibt gleich; nur café erfüllt die Bestellung.'],
      ['sans','« Une soupe sans viande et une salade, s’il vous plaît. » Was darf nicht in der Suppe sein?','Fleisch.','Wasser.','Gemüse.','Sans viande schließt Fleisch aus.',false],
      ['boisson','« Pour boire, je prends de l’eau. Comme dessert, une glace. » Was ist das Getränk?','Wasser.','Eis.','Kaffee.','Pour boire leitet das Getränk ein.',false],
      ['addition','Du hast gegessen und möchtest bezahlen. Was verlangst du?','L’addition, s’il vous plaît.','Le menu, s’il vous plaît.','Une salade, s’il vous plaît.','Die Rechnung ist l’addition; le menu ist die Speisekarte.'],
      ['commande','« Un café et un croissant ? — Non, un thé et un croissant. » Welche Bestellung gilt?','Tee und Croissant.','Kaffee und Croissant.','Tee und Sandwich.','Die zweite Person korrigiert nur das Getränk.',false],
      ['preference','« Mon plat préféré, c’est la pizza. Aujourd’hui, je prends la soupe. » Was isst die Person heute?','Suppe.','Pizza.','Salat.','Lieblingsgericht und heutige Bestellung sind verschieden.',false],
      ['serveur','« Qu’est-ce que vous prenez ? » Du bestellst eine Suppe und einen Salat.','Une soupe et une salade, s’il vous plaît.','Une soupe et un café, s’il vous plaît.','Une salade et un café, s’il vous plaît.','Beide gewünschten Speisen müssen in der Bestellung stehen: soupe und salade.'],
      ['quantite','Du bestellst Wasser. Welche Form des Teilungsartikels passt vor eau?','Je voudrais de l’eau.','Je voudrais du eau.','Je voudrais de la eau.','Eau beginnt mit einem Vokal. Deshalb steht de l’eau.']
    ],
    7:[
      ['total','« Les pommes coûtent trois euros. Le fromage coûte six euros. Ça fait neuf euros. » Was ist der Gesamtpreis?','9 €','6 €','3 €','Ça fait neuf euros nennt den Gesamtbetrag.',false],
      ['prix','Ein Preis beträgt 27,60 €. Welche Aussage stimmt genau?','Ça coûte vingt-sept euros soixante.','Ça coûte dix-sept euros soixante.','Ça coûte vingt-sept euros seize.','Vingt-sept ist 27; soixante bezeichnet hier 60 Cent.'],
      ['taille','« La taille trente-huit est disponible, mais pas la taille quarante-huit. » Welche Größe gibt es?','38','48','36','Die Verneinung gilt nur für quarante-huit, nicht für trente-huit.',false],
      ['carte','Du möchtest mit Karte zahlen und fragst, ob das möglich ist.','Je peux payer par carte ?','Je peux payer en espèces ?','Je ne peux pas payer par carte ?','Payer par carte bedeutet mit Karte bezahlen.'],
      ['cher','Der Preis ist zu hoch. Welche Aussage nennt genau dieses Problem?','C’est trop cher.','C’est très cher.','C’est peu cher.','Trop bedeutet zu, très sehr und peu wenig.'],
      ['commande','« Deux kilos de pommes ? — Non, un kilo de pommes et deux kilos de tomates, s’il vous plaît. » Welche Bestellung gilt nach der Korrektur?','1 kg Äpfel und 2 kg Tomaten.','2 kg Äpfel und 1 kg Tomaten.','1 kg Äpfel und 1 kg Tomaten.','Nach Non wird die ganze Bestellung korrigiert: un kilo de pommes und deux kilos de tomates.',false],
      ['changer','Du änderst deine Bestellung auf 200 Gramm Äpfel. Welche Mengenangabe ist grammatisch korrekt?','Deux cents grammes de pommes, s’il vous plaît.','Deux cents grammes des pommes, s’il vous plaît.','Deux cents grammes du pommes, s’il vous plaît.','Nach der genauen Menge deux cents grammes steht de vor pommes, kein Teilungsartikel.'],
      ['demande','Du fragst nach dem Preis eines einzelnen Artikels. Welche Preisfrage ist grammatisch korrekt?','Combien ça coûte ?','Combien ça coûtent ?','Combien ça coûtes ?','Zu ça gehört die Verbform coûte, nicht coûtent oder coûtes.']
    ],
    8:[
      ['logement','« L’appartement a deux chambres et un salon. » Wie viele Wohnräume werden genannt?','Drei.','Zwei.','Vier.','Zwei Schlafzimmer und ein Wohnzimmer ergeben drei Räume.',false],
      ['loyer','« Le loyer est de six cents euros par mois. » Welche Aussage stimmt?','Die Miete beträgt 600 Euro pro Monat.','Die Miete beträgt 600 Euro pro Woche.','Die Miete beträgt 60 Euro pro Monat.','Six cents ist 600; par mois bedeutet pro Monat.',false],
      ['position','« Le sac est sous la table. La lampe est sur la table. » Wo ist die Tasche?','Unter dem Tisch.','Auf dem Tisch.','Hinter dem Tisch.','Sous bedeutet unter; sur gehört hier zur Lampe.',false],
      ['visite','Du möchtest die Wohnung ansehen, bevor du dich entscheidest.','Quand est-ce que je peux visiter l’appartement ?','Quel est le loyer de l’appartement ?','Quelle est l’adresse de l’appartement ?','Visiter bedeutet hier besichtigen.'],
      ['balcon','« Il y a un jardin, mais il n’y a pas de balcon. » Was gehört zur Wohnung?','Ein Garten ohne Balkon.','Ein Balkon ohne Garten.','Ein Garten und ein Balkon.','Die Verneinung schließt den Balkon aus.',false],
      ['adresse','Du möchtest den Vermieter nach der Anschrift fragen.','Quelle est l’adresse de l’appartement ?','Combien de pièces a l’appartement ?','Quel est le loyer par mois ?','Adresse fragt nach der Anschrift.'],
      ['meubles','« Le lit est dans la chambre. La table est dans la cuisine. » Wo steht der Tisch?','In der Küche.','Im Schlafzimmer.','Im Wohnzimmer.','La table wird der cuisine zugeordnet.',false],
      ['situation','Du suchst eine Wohnung mit zwei Zimmern in der Nähe des Zentrums.','Je cherche un appartement avec deux pièces près du centre.','Je cherche un appartement avec trois pièces près du centre.','Je cherche une chambre près du centre.','Appartement avec deux pièces nennt eine ganze Wohnung mit zwei Zimmern.']
    ],
    9:[
      ['trajet','« Allez tout droit, puis tournez à droite après la pharmacie. » Was machst du nach der Apotheke?','Nach rechts abbiegen.','Nach links abbiegen.','Weiter geradeaus gehen.','Après la pharmacie gehört zur Anweisung tournez à droite.',false],
      ['transport','« Pour le musée, prenez le bus sept, pas le bus quatre. » Welcher Bus fährt zum Museum?','Linie 7.','Linie 4.','Linie 17.','Die genannte falsche Linie wird ausdrücklich ausgeschlossen.',false],
      ['quai','« Le train pour Lyon part du quai quatre. Le train pour Paris part du quai deux. » Du fährst nach Lyon.','Je vais au quai quatre.','Je vais au quai deux.','Je vais au quai trois.','Für Lyon gilt quai quatre.'],
      ['retard','« Le train part à dix heures. Il a vingt minutes de retard. » Welche Aussage stimmt?','Der Zug hat 20 Minuten Verspätung.','Der Zug fährt 20 Minuten früher ab.','Der Zug fährt von Gleis 20 ab.','Retard bezeichnet die Verspätung.',false],
      ['demander','Du möchtest den Bahnhof finden und fragst höflich nach seinem Ort.','Excusez-moi, où est la gare ?','Excusez-moi, c’est quel quai ?','Excusez-moi, à quelle heure part le train ?','Où est la gare fragt nach dem Ort des Bahnhofs.'],
      ['distance','« C’est à cinq minutes à pied et à deux minutes en bus. » Wie lange dauert der Fußweg?','5 Minuten.','2 Minuten.','7 Minuten.','À pied bezeichnet zu Fuß; en bus ist eine andere Möglichkeit.',false],
      ['ordre','Du erklärst: erst geradeaus, dann links.','Allez tout droit, puis tournez à gauche.','Tournez à gauche, puis allez tout droit.','Allez tout droit, puis tournez à droite.','Puis kennzeichnet den zweiten Schritt; gauche heißt links.'],
      ['arret','Du möchtest wissen, wo du den Bus nehmen kannst.','Où est l’arrêt de bus ?','De quel quai part le train ?','À quelle heure part le train ?','Arrêt de bus ist die Bushaltestelle.']
    ],
    10:[
      ['metier','« Je suis étudiante et je travaille dans un café le samedi. » Was stimmt?','Die Person studiert und arbeitet samstags im Café.','Die Person studiert und arbeitet täglich im Café.','Die Person studiert samstags und arbeitet sonst im Café.','Étudiante und die auf Samstag begrenzte Arbeit werden gemeinsam genannt.',false],
      ['horaires','« Je commence à huit heures et je termine à seize heures. » Wann endet die Arbeit?','16 Uhr.','8 Uhr.','18 Uhr.','Terminer nennt das Ende, commencer den Beginn.',false],
      ['question','Du möchtest den Beruf einer Person erfahren.','Quel est votre métier ?','Où travaillez-vous ?','Quels sont vos horaires ?','Métier fragt nach dem Beruf, nicht nach Arbeitsort oder Arbeitszeiten.'],
      ['cours','« J’ai cours le matin et je travaille l’après-midi. » Wann ist Unterricht?','Vormittags.','Nachmittags.','Abends.','J’ai cours steht hier mit le matin.',false],
      ['lieu','Du arbeitest in einem Büro und nicht zu Hause.','Je travaille dans un bureau.','Je travaille à la maison.','Je travaille dans une école.','Dans un bureau benennt das Büro als Arbeitsort.'],
      ['jours','« Je travaille du lundi au jeudi. Le vendredi, j’ai cours. » Was macht die Person freitags?','Sie hat Unterricht.','Sie arbeitet.','Sie beginnt eine neue Stelle.','Der zweite Satz beschreibt ausdrücklich den Freitag.',false],
      ['devoirs','Nach dem Unterricht sagt Léa: « Je dois faire mes devoirs. » Was muss sie tun?','Ihre Hausaufgaben machen.','Ihren Unterricht besuchen.','Ihren Beruf wechseln.','Devoirs bedeutet im Schulkontext Hausaufgaben.',false],
      ['precision','Du möchtest sagen: Der Kurs beginnt um neun, nicht deine Arbeit.','Mon cours commence à neuf heures.','Je commence mon travail à neuf heures.','Mon cours termine à neuf heures.','Cours bezeichnet den Kurs; commence nennt dessen Beginn.']
    ],
    11:[
      ['lever','« Je me lève à six heures et demie et je pars à huit heures. » Wann steht die Person auf?','6:30 Uhr.','8 Uhr.','7:30 Uhr.','Se lever bezeichnet das Aufstehen, partir das Losgehen.',false],
      ['ordre','« D’abord, je prends le petit-déjeuner. Ensuite, je prends le bus. » Was geschieht zuerst?','Frühstücken.','Bus fahren.','Nach Hause kommen.','D’abord kennzeichnet den ersten Schritt.',false],
      ['actuel','« D’habitude, je travaille le matin. Maintenant, je suis en train de lire. » Was macht die Person gerade?','Sie liest.','Sie arbeitet.','Sie frühstückt.','Maintenant und être en train de bezeichnen die aktuelle Tätigkeit.',false],
      ['retour','« Je rentre à dix-huit heures, mais le vendredi, je rentre à seize heures. » Wann kommt die Person freitags zurück?','16 Uhr.','18 Uhr.','17 Uhr.','Mais le vendredi kennzeichnet die Ausnahme.',false],
      ['repas','Du sagst, dass du frühstückst, ohne das Zubereiten des Frühstücks zu behaupten.','Je prends le petit-déjeuner.','Je prépare le petit-déjeuner.','Je prends le déjeuner.','Prendre le petit-déjeuner heißt frühstücken; préparer heißt zubereiten.'],
      ['coucher','« Le soir, je regarde la télé, puis je me couche. » Was geschieht nach dem Fernsehen?','Die Person geht ins Bett.','Die Person steht auf.','Die Person geht zur Arbeit.','Se coucher bedeutet ins Bett gehen.',false],
      ['question','Du kennst die Aufstehzeit und möchtest nach der Zeit der Rückkehr fragen.','Tu rentres à quelle heure ?','Tu te lèves à quelle heure ?','Tu pars à quelle heure ?','Rentrer fragt nach dem Zurückkommen.'],
      ['habitude','Du arbeitest gerade, es geht um diesen Moment.','Je suis en train de travailler.','Je vais au travail.','Je travaille tous les lundis.','Nur être en train de beschreibt ausdrücklich die laufende Tätigkeit.']
    ],
    12:[
      ['symptome','« J’ai mal à la tête, mais je n’ai pas de fièvre. » Was hat die Person?','Kopfschmerzen ohne Fieber.','Fieber ohne Kopfschmerzen.','Kopfschmerzen und Fieber.','Mais je n’ai pas de fièvre schließt Fieber aus.',false],
      ['depuis','« Je suis malade depuis lundi. Mon rendez-vous est jeudi. » Seit wann ist die Person krank?','Seit Montag.','Seit Donnerstag.','Seit Dienstag.','Depuis nennt den Beginn der Beschwerden, jeudi den Termin.',false],
      ['pharmacie','Du möchtest ein Mittel gegen Erkältung kaufen.','Je voudrais un médicament contre le rhume.','Je voudrais un rendez-vous chez le médecin.','Je voudrais l’adresse de la pharmacie.','Contre le rhume nennt den Zweck des gewünschten Mittels.'],
      ['consigne','Auf einer Übungskarte steht: « Deux fois par jour, le matin et le soir. » Welche Angabe stimmt?','Zweimal täglich: morgens und abends.','Zweimal morgens.','Einmal täglich: abends.','Deux fois par jour wird durch zwei Tageszeiten präzisiert.',false],
      ['disponibilite','« Je suis libre jeudi matin, mais pas jeudi après-midi. » Welcher Termin passt?','Jeudi à neuf heures.','Jeudi à quinze heures.','Jeudi à dix-sept heures.','Neun Uhr gehört zum Vormittag.'],
      ['aide','Du brauchst Unterstützung und bittest höflich darum.','Pouvez-vous m’aider, s’il vous plaît ?','Pouvez-vous m’appeler demain ?','Pouvez-vous épeler votre nom ?','M’aider bedeutet mir helfen.'],
      ['lieu','« J’ai rendez-vous chez le médecin. Ensuite, je vais à la pharmacie. » Wohin geht die Person zuerst?','Zum Arzt.','Zur Apotheke.','Nach Hause.','Ensuite stellt den Apothekenbesuch nach den Arzttermin.',false],
      ['corps','Du möchtest sagen, dass du Zahnschmerzen hast.','J’ai mal aux dents.','J’ai mal au dos.','J’ai mal à la tête.','Dents bezeichnet die Zähne; dos den Rücken.']
    ],
    13:[
      ['meteo','« Aujourd’hui, il pleut. Demain, il va faire beau. » Wann ist schönes Wetter angekündigt?','Morgen.','Heute.','Gestern.','Demain gehört zur Vorhersage il va faire beau.',false],
      ['vetement','« Je prends une veste bleue et un pantalon noir. » Welche Farbe hat die Hose?','Schwarz.','Blau.','Rot.','Noir bezieht sich auf pantalon, bleue auf veste.',false],
      ['pluie','Es regnet. Du möchtest sagen, dass du einen Regenschirm brauchst.','J’ai besoin d’un parapluie.','J’ai besoin d’un pantalon.','J’ai besoin d’une veste.','Parapluie ist der Regenschirm.'],
      ['degres','« Il fait douze degrés aujourd’hui et vingt degrés demain. » Wie warm wird es morgen?','20 Grad.','12 Grad.','22 Grad.','Vingt degrés ist die Vorhersage für demain.',false],
      ['saison','« En hiver, il fait froid. En été, il fait chaud. » Welche Jahreszeit ist hier kalt?','Winter.','Sommer.','Frühling.','Hiver ist Winter; été ist Sommer.',false],
      ['accord','Du beschreibst eine kleine blaue Jacke in der üblichen Wortstellung.','Une petite veste bleue.','Une petite veste bleu.','Une petite bleue veste.','Petite steht vor veste, bleue danach und stimmt im Femininum überein.'],
      ['contraste','« Il ne pleut pas, mais il y a du vent. » Was stimmt?','Es ist windig, aber es regnet nicht.','Es regnet, aber es ist windstill.','Es regnet und es ist windig.','Die Verneinung betrifft pleuvoir, nicht den Wind.',false],
      ['choix','Du zeigst auf mehrere Schuhe und sagst ausdrücklich „diese Schuhe“.','Ces chaussures.','Cette chaussures.','Ce chaussures.','Ces bezeichnet den Plural von chaussure.']
    ],
    14:[
      ['preference','« J’aime le tennis, mais je préfère lire le dimanche. » Was macht die Person sonntags lieber?','Lesen.','Tennis spielen.','Kochen.','Préfère nennt die bevorzugte Tätigkeit.',false],
      ['negation','Du magst Reisen, aber nicht Laufen.','J’aime voyager, mais je n’aime pas courir.','J’aime courir, mais je n’aime pas voyager.','J’aime voyager et j’aime courir.','Die Verneinung muss sich auf courir beziehen.'],
      ['programme','« Samedi, je vais au cinéma avec Julie. Dimanche, je fais du sport avec Paul. » Wer geht mit ins Kino?','Julie.','Paul.','Julie und Paul.','Julie wird dem Kino, Paul dem Sport zugeordnet.',false],
      ['hobby','« Mon hobby, c’est la cuisine. » Was macht die Person gern?','Kochen.','Im Restaurant essen.','Lebensmittel einkaufen.','Cuisine bezeichnet hier die Tätigkeit Kochen.',false],
      ['proposer','Du möchtest jemanden für Samstag ins Kino einladen.','On va au cinéma samedi ?','Tu aimes le cinéma ?','Tu vas au cinéma le dimanche ?','On va…samedi ? ist ein konkreter gemeinsamer Vorschlag.'],
      ['gout','« Julie adore voyager. Moi, je préfère lire à la maison. » Was sagt die sprechende Person über sich?','Sie liest lieber zu Hause.','Sie reist am liebsten.','Sie liest nie.','Moi markiert den Wechsel von Julie zur sprechenden Person.',false],
      ['activite','Du möchtest offen fragen, was jemand am Wochenende macht, ohne eine bestimmte Aktivität vorzugeben.','Qu’est-ce que vous faites le week-end ?','Quel sport préférez-vous ?','Vous allez au cinéma samedi ?','Die offene Frage lässt verschiedene Wochenendaktivitäten zu.'],
      ['sport','Du sagst, dass du Tennis spielst, nicht nur dass du Tennis magst.','Je joue au tennis.','J’aime le tennis.','Je préfère le tennis.','Jouer au nennt das tatsächliche Spielen.']
    ],
    15:[
      ['reservation','« Une chambre pour deux personnes, pour trois nuits. » Wie viele Nächte werden gebucht?','Drei.','Zwei.','Fünf.','Trois nuits bezeichnet die Dauer, deux personnes die Gästezahl.',false],
      ['inclus','Du möchtest wissen, ob Frühstück im Zimmerpreis enthalten ist.','Le petit-déjeuner est inclus ?','Le petit-déjeuner est à quelle heure ?','Où est le petit-déjeuner ?','Inclus fragt nach dem Enthaltensein, nicht nach Ort oder Zeit.'],
      ['billet','Du fährst nach Paris und möchtest auch zurückfahren.','Je voudrais un aller-retour pour Paris.','Je voudrais un aller simple pour Paris.','Je voudrais un aller-retour pour Lyon.','Aller-retour umfasst Hin- und Rückfahrt.'],
      ['depart','« Le train part à dix-sept heures et arrive à dix-neuf heures. » Wann fährt er ab?','17 Uhr.','19 Uhr.','7 Uhr.','Partir bezeichnet die Abfahrt, arriver die Ankunft.',false],
      ['futur','« Nous allons arriver lundi. Nous avons une réservation pour deux nuits. » Wann ist die Ankunft geplant?','Montag.','Sonntag.','Mittwoch.','Aller + arriver bezeichnet hier die geplante Ankunft am Montag.',false],
      ['prix','« L’aller simple coûte vingt euros. L’aller-retour coûte trente-six euros. » Was kostet Hin- und Rückfahrt?','36 €','20 €','40 €','Der ausdrücklich genannte Preis des aller-retour ist 36 Euro.',false],
      ['demander','Du möchtest die Abfahrtszeit des Zuges erfragen.','À quelle heure part le train ?','À quelle heure arrive le train ?','De quel quai part le train ?','À quelle heure part… fragt nach der Abfahrtszeit.'],
      ['nuits','Du möchtest ein Zimmer für zwei Nächte reservieren, ohne eine Personenzahl festzulegen.','Je voudrais une chambre pour deux nuits.','Je voudrais une chambre pour deux personnes.','Je voudrais deux chambres pour une nuit.','Nuits beschreibt Nächte; personnes beschreibt Personen.']
    ],
    16:[
      ['reponse','Du nimmst eine Einladung an, kannst aber erst eine Stunde später kommen.','Avec plaisir, mais je vais arriver plus tard.','Je suis désolé, je ne peux pas venir.','Avec plaisir, je vais arriver plus tôt.','Die Antwort nimmt an und nennt gleichzeitig die spätere Ankunft.'],
      ['heure','« Le dîner est à dix-neuf heures. Je peux venir à dix-neuf heures et demie. » Wann kann die Person kommen?','19:30 Uhr.','19 Uhr.','18:30 Uhr.','Die mögliche Ankunft steht bei je peux venir, nicht beim Beginn des Essens.',false],
      ['reporter','Du möchtest das Treffen behalten, aber auf morgen verschieben.','On peut reporter le rendez-vous à demain ?','On peut annuler le rendez-vous ?','On peut garder le rendez-vous aujourd’hui ?','Reporter à demain verschiebt, annuler sagt ab.'],
      ['refus','« Je voudrais venir, mais je travaille samedi. » Welche Antwort gibt den Grund passend wieder?','Je ne peux pas venir samedi, car je travaille.','Je ne veux pas venir samedi, car je travaille.','Je peux venir samedi, car je travaille.','Ne peux pas beschreibt das Hindernis; ne veux pas würde fehlenden Willen ausdrücken.'],
      ['social','Deine Freundin hat heute Geburtstag.','Bon anniversaire !','Bonne année !','Bon appétit !','Anniversaire ist der Geburtstag, année das Jahr.'],
      ['telephone','Du rufst Paul an und stellst dich als Anna vor.','Allô Paul, c’est Anna.','Allô Anna, c’est Paul.','Au revoir Paul, c’est Anna.','Paul ist der Angerufene, Anna die Anrufende.'],
      ['invitation','« Tu veux venir dîner samedi ? — Oui, avec plaisir. » Was ist vereinbart?','Die Person nimmt die Einladung zum Abendessen am Samstag an.','Die Person bittet um ein Treffen am Sonntag.','Die Person sagt das Abendessen am Samstag ab.','Oui, avec plaisir ist eine Zusage.',false],
      ['apporter','« Je peux apporter un dessert, mais pas de boisson. » Was bietet die Person an?','Einen Nachtisch mitzubringen.','Ein Getränk mitzubringen.','Nachtisch und Getränke mitzubringen.','Mais pas de boisson schließt das Getränk aus.',false]
    ],
    17:[
      ['nom','« Nom : Martin / Prénom : Léa ». Welche Angabe gehört in das Feld Nom?','Martin','Léa','Léa Martin','Nom bezeichnet hier den Familiennamen.',false],
      ['formulaire','« Signez en bas du formulaire. Apportez le formulaire lundi. » Wo soll unterschrieben werden?','Unten im Formular.','Oben im Formular.','Auf einem zweiten Formular.','En bas bezeichnet unten.',false],
      ['repondre','Du möchtest ausdrücklich eine Antwort auf deine Nachricht.','Merci de me répondre.','Merci de me rappeler.','Merci de m’aider.','Répondre bedeutet antworten; rappeler zurückrufen.'],
      ['demande','Du schreibst wegen eines Kurses und möchtest zunächst Informationen, keine Anmeldung bestätigen.','Je vous écris pour demander des informations sur le cours.','Je vous écris pour confirmer mon inscription au cours.','Je vous écris pour annuler mon inscription au cours.','Demander des informations ist eine Anfrage; confirmer bestätigt.'],
      ['date','« Le cours commence lundi à neuf heures, dans la salle dix-huit. » Welche Zahl ist die Raumnummer?','18','9','19','Salle dix-huit nennt den Raum; neuf heures ist die Uhrzeit.',false],
      ['courriel','Du sollst deine E-Mail-Adresse angeben. Welche Angabe gehört in dieses Feld?','lea.martin@exemple.fr','12, rue Victor-Hugo','06 12 20 30 40','Die E-Mail-Adresse enthält @ und eine Domain.',false],
      ['nationalite','Welche Frage verlangt die Staatsangehörigkeit und nicht den Wohnort?','Quelle est votre nationalité ?','Quelle est votre adresse ?','Où habitez-vous ?','Nationalité fragt nach der Staatsangehörigkeit.'],
      ['horaires','Du weißt den Preis schon, möchtest aber die Unterrichtszeiten wissen.','Quels sont les horaires du cours ?','Quel est le prix du cours ?','Quelle est l’adresse du cours ?','Horaires sind die Zeiten des Kurses.']
    ],
    18:[
      ['clarifier','Du hast die Frage akustisch gehört, aber nicht verstanden. Du möchtest eine Erklärung mit Beispiel.','Pourriez-vous expliquer avec un exemple ?','Pourriez-vous épeler votre nom ?','Pourriez-vous me rappeler demain ?','Expliquer avec un exemple verlangt eine Erklärung statt Buchstabieren oder Rückruf.'],
      ['lentement','Die Person spricht zu schnell. Du möchtest sie höflich um langsameres Sprechen bitten.','Pourriez-vous parler plus lentement ?','Pourriez-vous parler plus fort ?','Pourriez-vous écrire votre adresse ?','Plus lentement ändert das Tempo, plus fort die Lautstärke.'],
      ['repeter','« Salle douze ? — Non, salle deux. » Welche Raumnummer gilt nach der Korrektur?','2','12','22','Non korrigiert die zuerst verstandene Nummer.',false],
      ['sens','Du möchtest wissen, was ein Wort bedeutet, nicht wie es geschrieben wird.','Qu’est-ce que ça veut dire ?','Comment ça s’écrit ?','Comment ça se prononce ?','Veut dire fragt nach der Bedeutung.'],
      ['politesse','Du möchtest besonders höflich um Informationen bitten.','J’aimerais des informations sur le cours.','J’aimerais confirmer mon inscription au cours.','J’aimerais annuler mon inscription au cours.','J’aimerais + s’il vous plaît formuliert die Bitte höflich.'],
      ['comprendre','« Je comprends la première phrase, mais pas la dernière. » Was muss erklärt werden?','Der letzte Satz.','Der erste Satz.','Beide Sätze.','Mais pas la dernière grenzt den unverstandenen Satz ein.',false],
      ['proposer','Du schlägst höflich vor, die Aufgabe zusammen anzusehen.','On pourrait regarder l’exercice ensemble.','On doit regarder l’exercice ensemble.','On ne peut pas regarder l’exercice ensemble.','Pourrait ist ein höflicher Vorschlag; doit macht eine Verpflichtung daraus.'],
      ['objet','« Je n’ai pas de stylo. Vous pouvez m’aider ? » Was fehlt der Person?','Ein Stift.','Ein Formular.','Eine Adresse.','Je n’ai pas de stylo nennt den fehlenden Gegenstand.',false]
    ],
    19:[
      ['reference','« Voici un hôtel. L’hôtel est près de la gare. » Worauf bezieht sich l’hôtel?','Auf das zuvor genannte Hotel.','Auf die zuvor genannte Bahnhofshalle.','Auf mehrere Hotels.','Der bestimmte Artikel greift das bereits eingeführte Hotel auf.',false],
      ['pluriel','Du möchtest mehrere Baguettes nennen. Welche Form ist im geschriebenen Standard richtig?','Des baguettes.','Des baguette.','Une baguettes.','Im Plural tragen Artikel und Nomen die passende Form.'],
      ['identifier','Du zeigst auf mehrere Freunde. Welche Form passt im geschriebenen Standard?','Ce sont des amis.','C’est des amis.','Ce sont un ami.','Ce sont passt zum Plural des amis; c’est des… ist umgangssprachlich.'],
      ['sens','« La gare est derrière le musée. » Was liegt hinter dem Museum?','Der Bahnhof.','Das Hotel.','Das Café.','Gare ist der Bahnhof.',false],
      ['voici','Du reichst deinen Pass und sagst „Hier ist mein Pass“.','Voici mon passeport.','Voici mon billet.','Voici mes passeports.','Passeport ist der Pass, billet die Fahrkarte.'],
      ['genre','Du bestellst ein Baguette und einen Kaffee. Welche Kombination ist korrekt?','Une baguette et un café.','Un baguette et une café.','Une baguette et une café.','Baguette ist feminin, café maskulin.'],
      ['possesseur','« C’est ton livre ? — Oui, et ce sont mes clés. » Wem gehören die Schlüssel laut Antwort?','Der antwortenden Person.','Der fragenden Person.','Beiden Personen gemeinsam.','Mes ist in der Antwort aus Sicht der antwortenden Person zu verstehen.',false],
      ['elision','Du setzt den bestimmten Artikel vor hôtel.','L’hôtel.','Le hôtel.','La hôtel.','Vor dem stummen h wird der bestimmte Artikel elidiert.']
    ],
    20:[
      ['negation','Du möchtest „Ich arbeite heute nicht“ im geschriebenen Standard sagen.','Je ne travaille pas aujourd’hui.','Je ne travaille jamais le dimanche.','Je travaille aujourd’hui.','Ne…pas verneint die heutige Tätigkeit; jamais würde nie ausdrücken.'],
      ['habitude','« Je travaille du lundi au jeudi. Le vendredi, je ne travaille pas. » Was stimmt?','Freitags arbeitet die Person nicht.','Donnerstags arbeitet die Person nicht.','Die Person arbeitet nur freitags.','Le vendredi, je ne travaille pas nennt die Ausnahme.',false],
      ['jamais','Du möchtest sagen, dass du sonntags nie fernsiehst.','Je ne regarde jamais la télévision le dimanche.','Je ne regarde pas la télévision aujourd’hui.','Je regarde la télévision le dimanche.','Jamais beschreibt nie; aujourd’hui wäre nur heute.'],
      ['interdiction','Ein Schild verbietet das Essen, sagt aber nichts über Trinken.','Il ne faut pas manger ici.','Il ne faut pas boire ici.','Il faut manger ici.','Manger ist essen; ne faut pas formuliert das Verbot.'],
      ['transport','« Je n’ai pas de voiture. Je prends le bus, pas le train. » Welches Verkehrsmittel nutzt die Person?','Den Bus.','Den Zug.','Das Auto.','Die bejahte Angabe ist je prends le bus.',false],
      ['obligation','Für einen Raum ist Reservieren Pflicht. Welche Aussage passt?','Il faut réserver la salle.','On peut réserver la salle.','Il ne faut pas réserver la salle.','Il faut bezeichnet die Pflicht; on peut nur die Möglichkeit.'],
      ['temps','« Nous travaillons le matin. Vous travaillez l’après-midi. » Wer arbeitet nachmittags?','Die angesprochene Person oder Gruppe.','Die sprechende Person mit ihrer Gruppe.','Beide Gruppen arbeiten nur vormittags.','Vous bezeichnet die Angesprochenen.',false],
      ['sens','« Je ne prends jamais la voiture. » Welche Bedeutung ist genau richtig?','Ich nehme nie das Auto.','Ich nehme heute nicht das Auto.','Ich habe kein Auto.','Jamais nennt eine Gewohnheit; der Satz sagt nichts über den Besitz.',false]
    ],
    21:[
      ['lieu','Die Antwort lautet « À Lyon ». Welche Frage passt dazu?','Où habitez-vous ?','Depuis quand habitez-vous ici ?','Pourquoi apprenez-vous le français ?','À Lyon beantwortet die Frage nach einem Ort.'],
      ['depuis','« J’habite ici depuis septembre. » Welche Frage beantwortet dieser Satz?','Depuis quand habitez-vous ici ?','Quand allez-vous partir ?','Combien coûte votre appartement ?','Depuis septembre nennt den Anfang eines noch andauernden Zustands.'],
      ['personne','Du siehst eine Person auf einem Foto und fragst nach ihrer Identität.','Qui est-ce ?','Qu’est-ce que c’est ?','Qu’est-ce que tu fais ?','Qui fragt nach einer Person.'],
      ['possession','« Julie vient avec ses parents. Moi, je viens avec ma sœur. » Mit wem kommt Julie?','Mit ihren Eltern.','Mit ihrer Schwester.','Mit den Eltern der sprechenden Person.','Ses parents bezieht sich auf Julie.',false],
      ['oui-non','Du möchtest nur wissen, ob die Person arbeitet, ohne nach Ort oder Zeit zu fragen.','Est-ce que vous travaillez ?','Où est-ce que vous travaillez ?','Quand est-ce que vous travaillez ?','Ohne zusätzliches Fragewort ist dies eine Ja/Nein-Frage.'],
      ['tonique','« Marc et Paul viennent demain. Je vais avec eux. » Auf wen verweist eux?','Auf Marc und Paul.','Nur auf Marc.','Auf die sprechende Person und Paul.','Eux greift hier die beiden zuvor genannten Männer auf.',false],
      ['prix','Die Antwort soll den Fahrkartenpreis nennen. Welche Frage stellst du?','Combien coûte ce billet ?','Quand est-ce que le train part ?','Qui a ce billet ?','Combien coûte fragt nach dem Preis.'],
      ['repondre','« Moi, j’habite à Lyon. Et toi ? » Du antwortest für dich selbst.','Moi, j’habite à Paris.','Toi, tu habites à Paris.','Lui, il habite à Paris.','Auf Et toi ? antwortest du aus deiner eigenen Sicht mit moi/je.']
    ],
    22:[
      ['hier','« Hier, j’ai visité un musée. Demain, je vais travailler. » Was geschah gestern?','Ein Museumsbesuch.','Ein Arbeitstag.','Eine geplante Abreise.','Hier und passé composé kennzeichnen den vergangenen Museumsbesuch.',false],
      ['recent','Du hast gerade gegessen; das Essen ist beendet.','Je viens de manger.','Je suis en train de manger.','Je vais manger.','Venir de + Infinitiv bezeichnet die gerade abgeschlossene Handlung.'],
      ['marqueur','« Je suis arrivée il y a deux jours. Je vais partir dans trois jours. » Wann war die Ankunft?','Vor zwei Tagen.','In zwei Tagen.','Vor drei Tagen.','Il y a bezieht die vergangene Ankunft auf heute.',false],
      ['ordre','« D’abord, j’ai pris le bus. Ensuite, j’ai visité le musée. Enfin, je suis rentré. » Was geschieht zuletzt?','Die Rückkehr.','Die Busfahrt.','Der Museumsbesuch.','Enfin kennzeichnet den letzten Schritt.',false],
      ['duree','Du wohnst seit Januar noch immer in Lyon.','J’habite à Lyon depuis janvier.','Je vais habiter à Lyon en janvier.','J’ai visité Lyon en janvier.','Depuis bezeichnet den Beginn des noch andauernden Wohnens.'],
      ['personne','Anna berichtet über sich selbst: Gestern ist sie ins Kino gegangen.','Hier, je suis allée au cinéma.','Hier, je suis allé au cinéma.','Demain, je vais aller au cinéma.','Anna braucht im passé composé mit être die feminine Form allée.'],
      ['contraste','« Je travaille maintenant. J’ai travaillé hier aussi. » Welche Tätigkeit ist ausdrücklich abgeschlossen?','Die Arbeit von gestern.','Die Arbeit im jetzigen Moment.','Die Arbeit von morgen.','J’ai travaillé hier bezeichnet die vergangene Handlung.',false],
      ['projet','Du planst, in drei Tagen abzureisen.','Je vais partir dans trois jours.','Je suis parti il y a trois jours.','J’habite ici depuis trois jours.','Futur proche und dans kennzeichnen den Plan für die Zukunft.']
    ],
    23:[
      ['quantite','« Trois cents grammes de fromage et cinq cents grammes de farine. » Wie viel Käse wird benötigt?','300 g','500 g','800 g','Trois cents grammes gehört zu fromage.',false],
      ['negation','« Il faut des carottes et de l’eau, mais pas de lait. » Was wird ausgeschlossen?','Milch.','Wasser.','Karotten.','Pas de lait bedeutet keine Milch.',false],
      ['but','Du benutzt ein Messer, um Gemüse zu schneiden, nicht um Brot zu schneiden.','J’utilise un couteau pour couper les légumes.','J’utilise un couteau pour couper le pain.','J’utilise un couteau pour cuire les légumes.','Couper les légumes nennt genau den beabsichtigten Zweck.'],
      ['ordre','« Coupez les tomates, puis ajoutez le fromage. » Was kommt zuerst?','Die Tomaten schneiden.','Den Käse hinzufügen.','Den Käse schneiden.','Puis kennzeichnet den zweiten Schritt.',false],
      ['sel','Du warnst vor zu viel Salz, verbietest aber nicht jedes Salz.','Il ne faut pas ajouter trop de sel.','Il ne faut pas ajouter de sel.','Il faut ajouter beaucoup de sel.','Trop de schließt die übermäßige Menge aus, nicht jegliches Salz.'],
      ['portion','« La salade est pour quatre personnes. Il faut deux tomates. » Wie viele Portionen sind geplant?','Vier.','Zwei.','Sechs.','Pour quatre personnes beschreibt die Personenanzahl, nicht die Zutatenmenge.',false],
      ['ustensile','« Coupez avec un couteau. Mélangez avec une cuillère. » Womit wird gemischt?','Mit einem Löffel.','Mit einem Messer.','Mit einer Gabel.','Cuillère ist der Löffel und gehört zu mélangez.',false],
      ['peu','Du möchtest eine kleine unbestimmte Menge Milch nennen.','Un peu de lait.','Beaucoup de lait.','Une bouteille de lait.','Un peu de bezeichnet wenig, ohne eine feste Menge zu nennen.']
    ],
    24:[
      ['origine','« Je viens du Canada et je vais en France. » Welche Herkunft nennt die Person?','Kanada.','Frankreich.','Beide Länder.','Venir du bezeichnet die Herkunft; aller en das Reiseziel.',false],
      ['destination','« Paul vient d’Allemagne. Samedi, il va au Canada. » Wohin fährt Paul am Samstag?','Nach Kanada.','Nach Deutschland.','Nach Frankreich.','Il va au Canada nennt das Ziel.',false],
      ['devoir','Du musst um acht aufbrechen; es ist keine bloße Möglichkeit.','Je dois partir à huit heures.','Je peux partir à huit heures.','Je veux partir à huit heures.','Devoir bezeichnet die Verpflichtung, pouvoir die Möglichkeit.'],
      ['retour','« Je pars lundi et je rentre vendredi. » Was geschieht am Freitag?','Die Rückkehr.','Die Abreise.','Der Fahrkartenkauf.','Rentrer bezeichnet die Rückkehr.',false],
      ['transport','« Nous allons à Lyon en train, puis à Paris en bus. » Womit fährt die Gruppe nach Paris?','Mit dem Bus.','Mit dem Zug.','Mit dem Flugzeug.','En bus gehört zum zweiten Reiseziel Paris.',false],
      ['prix','« Mon billet coûte vingt euros. Le billet de Paul coûte trente euros. » Was kostet Pauls Fahrkarte?','30 €','20 €','50 €','Le billet de Paul hat den Preis trente euros.',false],
      ['projet','Du möchtest sagen, dass du Lyon besuchen wirst, ohne einen vergangenen Besuch zu behaupten.','Je vais visiter Lyon.','J’ai visité Lyon.','Je viens de visiter Lyon.','Aller + Infinitiv beschreibt den geplanten Besuch.'],
      ['groupe','« Nous venons d’Allemagne. Nos amis viennent des États-Unis. » Woher kommen die Freunde?','Aus den USA.','Aus Deutschland.','Aus Kanada.','Nos amis ist das Subjekt des zweiten Satzes.',false]
    ]
  };
  for(const [id,rows]of Object.entries(bank)){
    const s=window.FR_A1_MASTERY_SPECS[id];
    s.checkTasks=rows.map(([family,q,answer,w1,w2,explanation,audio=true],i)=>({type:'choice',q,o:[answer,w1,w2],answer,explanation,tag:'Anwenden',family,checkKey:`L${id}-context-${family}`,...(audio?{audio:answer}:{})}));
  }
  const revisedSeven={
    commande:{q:'« Deux kilos de pommes et un kilo de tomates. » Welche Menge Tomaten wird verlangt?',answer:'Ein Kilo.'},
    changer:{q:'Du möchtest statt eines Kilos Äpfel nur zweihundert Gramm bestellen.',answer:'Deux cents grammes de pommes, s’il vous plaît.'},
    demande:{q:'Du kennst die Größe des Kleidungsstücks und möchtest seinen Preis wissen.',answer:'Combien ça coûte ?'}
  };
  for(const t of window.FR_A1_MASTERY_SPECS[7].checkTasks)if(revisedSeven[t.family]){t.legacyTask=revisedSeven[t.family];t.qualityRevision=148;}
  // Dedicated typed transfers supplement the existing grammar pool.
  const additions={
    7:[['Je peux payer ___ carte ?','par','Kann ich mit Karte bezahlen?','Bezahlen']],
    8:[['La pharmacie est ___ la gare.','à la','Die Apotheke ist am Bahnhof.','à + Artikel'],['Le jardin est ___ la maison.','derrière','Der Garten ist hinter dem Haus.','Ort']],
    12:[['J’ai mal ___ dents.','aux','Ich habe Zahnschmerzen.','Gesundheit']],
    17:[['___ sont les horaires du cours ?','Quels','Wie sind die Unterrichtszeiten?','quel / quelle'],['Ma date de ___ est le 3 mai.','naissance','Mein Geburtsdatum ist der 3. Mai.','Formular']],
  };
  for(const [id,rows]of Object.entries(additions))for(const [prompt,answer,context,tag]of rows)window.FR_A1_MASTERY_SPECS[id].tasks.push({type:'gap',prompt,answer,context,tag});
})();


/* Check-only productive transfers. One task per focus; variants change the
   situation without dropping a learning objective. Never used by grammar drills. */
(() => {
  const bank={
    1:[
      ['etre','Paul et moi, nous ___ de Berlin.','sommes','Paul und ich sind aus Berlin.','Paul and I are from Berlin.'],
      ['etre','Léa et Marc ___ de Paris.','sont','Léa und Marc sind aus Paris.','Léa and Marc are from Paris.'],
      ['habiter','Marie et Luc ___ à Berlin. (habiter)','habitent','Marie und Luc wohnen in Berlin.','Marie and Luc live in Berlin.'],
      ['venir','Paul et moi, nous ___ de Lyon. (venir)','venons','Paul und ich kommen aus Lyon.','Paul and I come from Lyon.'],
      ['appeler','Madame Martin, vous vous ___ comment ?','appelez','Du fragst Frau Martin höflich nach ihrem Namen.','Politely ask Mrs Martin her name.']
    ],
    2:[
      ['modal','Madame, ___-vous épeler « Moreau » ? (pouvoir)','pouvez','Du bittest eine Person höflich, Moreau zu buchstabieren.','Politely ask one person to spell Moreau.'],
      ['modal','Monsieur, vous ___ répéter « Dubois » ? (pouvoir)','pouvez','Du bittest eine Person höflich, Dubois zu wiederholen.','Politely ask one person to repeat Dubois.'],
      ['infinitif','Pouvez-vous ___ votre prénom ?','épeler','Du möchtest die einzelnen Buchstaben des Vornamens hören.','You want to hear the individual letters of the first name.'],
      ['identite','Mon ___ est Dubois. Mon prénom est Paul.','nom de famille','Ergänze die Bezeichnung für den Nachnamen.','Insert the term for family name.',['nom']],
      ['alphabet','Nom : ___','Legrand','Der Nachname wird L-E-G-R-A-N-D buchstabiert. Trage ihn ein.','The family name is spelled L-E-G-R-A-N-D. Enter it.']
    ],
    3:[
      ['avoir','Léa et Paul ___ vingt-deux ans.','ont','Léa und Paul sind 22 Jahre alt.','Léa and Paul are 22 years old.'],
      ['avoir','Paul et moi, nous ___ quarante ans.','avons','Paul und ich sind 40 Jahre alt.','Paul and I are 40 years old.'],
      ['age','Mon frère ___ dix-huit ans.','a','Mein Bruder ist 18 Jahre alt.','My brother is 18 years old.'],
      ['nombre','___','quatre-vingt-douze','Schreibe 92 als französisches Zahlwort.','Write 92 in French words.'],
      ['telephone','___','0670148091','Trage als Ziffern ein: zéro six, soixante-dix, quatorze, quatre-vingts, quatre-vingt-onze. Leerzeichen sind erlaubt.','Enter digits: zéro six, soixante-dix, quatorze, quatre-vingts, quatre-vingt-onze. Spaces are allowed.'],
      ['date','Je suis née ___ vingt avril.','le','Eine Frau gibt ihr Geburtsdatum an: 20. April.','A woman gives her date of birth: 20 April.'],
      ['postal','___','B2C 3D4','Im Formular steht: Téléphone : 06 20 30 40 50 / Code postal : B2C 3D4. Trage nur die Postleitzahl ein.','The form says: Téléphone : 06 20 30 40 50 / Code postal : B2C 3D4. Enter only the postal code.']
    ],
    4:[
      ['heure','Il est six heures ___.','et demie','Ergänze die Wendung für 6:30 Uhr, zwei Wörter.','Complete the expression for 6:30, two words.'],
      ['heure','Il est dix heures ___.','moins le quart','Ergänze die Wendung für 9:45 Uhr, drei Wörter.','Complete the expression for 9:45, three words.'],
      ['jour','On se voit ___ à seize heures.','jeudi','Das Treffen ist am Donnerstag um 16 Uhr.','The meeting is on Thursday at 16:00.'],
      ['mois','Le rendez-vous est le trois ___.','mai','Der Termin ist am 3. Mai.','The appointment is on 3 May.'],
      ['premier','Nous sommes le ___ septembre.','premier','Heute ist der 1. September. Schreibe das Ordnungszahlwort.','Today is 1 September. Write the ordinal word.'],
      ['horaire','La visite est vendredi ___ onze heures.','à','Die Besichtigung ist Freitag um 11 Uhr.','The viewing is on Friday at eleven.'],
      ['intervalle','Je travaille du mardi ___ samedi.','au','Ich arbeite von Dienstag bis Samstag.','I work from Tuesday to Saturday.']
    ],
    5:[
      ['mon','Paul parle de lui-même : « Léa est ___ sœur. »','ma','Paul sagt: Léa ist meine Schwester.','Paul says: Léa is my sister.'],
      ['mon','Paul parle de lui-même : « Marc est ___ frère. »','mon','Paul sagt: Marc ist mein Bruder.','Paul says: Marc is my brother.'],
      ['plural','Paul dit : « Léa et Marc sont ___ parents. »','mes','Paul spricht über seine eigenen Eltern.','Paul is talking about his own parents.'],
      ['vowel','Voici ___ amie Julie.','mon','Du stellst deine eigene Freundin Julie vor.','Introduce your own female friend Julie.'],
      ['notre','Paul et moi : « C’est ___ mère. »','notre','Paul und ich sprechen über unsere gemeinsame Mutter.','Paul and I are talking about our mother.'],
      ['leur','Léa et Marc : « Ce sont ___ enfants. »','nos','Léa und Marc sprechen über ihre eigenen Kinder.','Léa and Marc are talking about their own children.'],
      ['accord','Léa est ___, mais Marc est grand.','petite','Léa ist klein, Marc ist groß. Verwende petit in der passenden Form.','Léa is small and Marc is tall. Use the correct form of petit.'],
      ['etat','La sœur de Paul est ___. (marié)','mariée','Pauls Schwester ist verheiratet. Passe marié an.','Paul’s sister is married. Make marié agree.'],
      ['presenter','Léa et Paul ? Ce ___ mes amis.','sont','Das sind meine Freunde, schriftlicher Standard.','These are my friends, standard written French.']
    ],
    6:[
      ['pain','Comme entrée, je prends ___ soupe.','de la','Ergänze den Teilungsartikel: Als Vorspeise nehme ich Suppe.','Insert the partitive article: As a starter, I am having soup.'],
      ['pain','Pour le repas, je prends ___ pain.','du','Ergänze den Teilungsartikel: Zum Essen nehme ich Brot.','Insert the partitive article: I am having bread with the meal.'],
      ['eau','Pour boire, je voudrais ___ eau.','de l’','Ergänze den Teilungsartikel für eine unbestimmte Menge Wasser.','Insert the partitive article for an unspecified amount of water.'],
      ['pommes','Je prends ___ pommes pour le dessert.','des','Ergänze den unbestimmten Pluralartikel: Ich nehme Äpfel als Nachtisch.','Insert the indefinite plural article: I am having apples for dessert.'],
      ['polite','Bonjour, je ___ une salade, s’il vous plaît.','voudrais','Verwende die gelernte höfliche Wendung: Ich hätte gern einen Salat.','Use the polite expression you learned: I would like a salad.'],
      ['exclusion','Un sandwich ___ fromage, s’il vous plaît.','sans','Du möchtest ausdrücklich keinen Käse im Sandwich.','You specifically want no cheese in the sandwich.'],
      ['bill','Pour payer : « L’___, s’il vous plaît. »','addition','Du bittest nach dem Essen um die Rechnung.','Ask for the bill after the meal.']
    ],
    7:[
      ['quantite','Trois kilos ___ tomates, s’il vous plaît.','de','Drei Kilo Tomaten, bitte.','Three kilos of tomatoes, please.'],
      ['quantite','Deux cents grammes ___ fromage, s’il vous plaît.','de','Zweihundert Gramm Käse, bitte.','Two hundred grams of cheese, please.'],
      ['elision','Un litre ___eau, s’il vous plaît.','d’','Ein Liter Wasser, bitte.','A litre of water, please.'],
      ['unite','Deux ___ de lait.','litres','Zwei Liter Milch. Setze die Einheit im Plural ein.','Two litres of milk. Insert the plural unit.'],
      ['prix','Ça fait vingt euros ___.','quinze','Der Gesamtpreis ist 20,15 Euro. Schreibe die Centzahl als Wort.','The total is 20.15 euros. Write the cents in words.'],
      ['taille','Je cherche une ___ trente-huit.','taille','Du suchst Größe 38. Welches Wort fehlt?','You are looking for size 38. Which word is missing?'],
      ['payer','Est-ce que je peux payer ___ carte ?','par','Du fragst nach Kartenzahlung.','Ask about paying by card.']
    ],
    8:[
      ['existence','Dans la chambre, il ___ un lit.','y a','Ergänze „es gibt“, zwei Wörter nach il.','Complete “there is”, two words after il.'],
      ['existence','Dans la cuisine, il ___ une table.','y a','Ergänze „es gibt“, zwei Wörter nach il.','Complete “there is”, two words after il.'],
      ['position','Les clés sont ___ le sac.','dans','Die Schlüssel sind in der Tasche.','The keys are in the bag.'],
      ['contraction','Le rendez-vous est ___ musée.','au','Der Treffpunkt ist am Museum.','The meeting point is at the museum.'],
      ['feminin','Je suis ___ gare pour la visite.','à la','Ich bin für die Besichtigung am Bahnhof.','I am at the station for the viewing.'],
      ['pluriel','La chambre est près des toilettes. Je vais ___ toilettes.','aux','Ergänze à mit dem passenden Artikel.','Complete with à and the correct article.'],
      ['location','Le loyer est de cinq cents euros par ___.','mois','Die Miete beträgt 500 Euro pro Monat.','The rent is 500 euros per month.']
    ],
    9:[
      ['imperatif','Pour la gare : ___ tout droit, puis à gauche. (aller, vous)','Allez','Du erklärst höflich den Weg. Ergänze nur die Befehlsform.','Politely give directions. Insert only the imperative form.'],
      ['imperatif','Pour le musée : ___ à droite après le café. (tourner, vous)','Tournez','Du erklärst höflich den Weg. Ergänze nur die Befehlsform.','Politely give directions. Insert only the imperative form.'],
      ['prendre','Pour la gare, ___ la ligne quatre. (prendre, vous)','prenez','Bitte jemanden höflich, die Linie 4 zu nehmen.','Politely tell someone to take line four.'],
      ['sequence','Allez tout droit, ___ tournez à droite.','puis','Erst geradeaus, dann rechts: Ergänze das Wort für „dann“.','First straight ahead, then right: insert the word for “then”.',['ensuite']],
      ['direction','Tournez à ___.','gauche','Du sagst: Biegen Sie links ab.','Say: Turn left.'],
      ['walk','L’arrêt est à six minutes à ___.','pied','Die Haltestelle ist sechs Minuten zu Fuß entfernt.','The stop is six minutes away on foot.'],
      ['quai','Le train de Paris part du ___ six.','quai','Der Zug aus Paris fährt von Gleis 6 ab.','The train from Paris leaves from platform six.']
    ],
    10:[
      ['verb','Paul et Léa ___ dans un café. (travailler)','travaillent','Paul und Léa arbeiten in einem Café.','Paul and Léa work in a café.'],
      ['verb','Mon frère ___ dans un bureau. (travailler)','travaille','Mein Bruder arbeitet in einem Büro.','My brother works in an office.'],
      ['cedille','Paul et moi, nous ___ à neuf heures. (commencer)','commençons','Paul und ich beginnen um neun Uhr.','Paul and I start at nine.'],
      ['cours','Le cours ___ à dix heures. (commencer)','commence','Der Kurs beginnt um zehn Uhr.','The class starts at ten.'],
      ['plural','Madame, vous ___ le samedi ? (travailler)','travaillez','Du fragst eine Person höflich, ob sie samstags arbeitet.','Politely ask one person whether she works on Saturdays.'],
      ['profession','___','Je suis médecin','Bilde einen kurzen Satz mit être: Ich bin Arzt. (männlicher Sprecher)','Make a short sentence with être: I am a doctor. (male speaker)',['Je suis un médecin','Je suis docteur','Je suis un docteur','Moi, je suis médecin','Moi, je suis un médecin']],
      ['jours','Je travaille ___ lundi au mercredi.','du','Ich arbeite von Montag bis Mittwoch.','I work from Monday to Wednesday.']
    ],
    11:[
      ['reflexif','Paul et moi, nous ___ levons à six heures.','nous','Ergänze das Reflexivpronomen.','Insert the reflexive pronoun.'],
      ['reflexif','Léa et Marc ___ lèvent à huit heures.','se','Ergänze das Reflexivpronomen.','Insert the reflexive pronoun.'],
      ['lever','Léa et Marc se ___ tôt. (se lever)','lèvent','Léa und Marc stehen früh auf.','Léa and Marc get up early.'],
      ['nous','Paul et moi, nous nous ___ à huit heures. (se lever)','levons','Paul und ich stehen um acht Uhr auf.','Paul and I get up at eight.'],
      ['progressif','Paul est en train de ___.','manger','Paul isst gerade. Ergänze die Grundform.','Paul is eating right now. Insert the infinitive.'],
      ['etre','Paul et moi, nous ___ en train de travailler.','sommes','Paul und ich arbeiten gerade.','Paul and I are working right now.'],
      ['elision','Léa est en train ___écrire.','d’','Léa schreibt gerade. Ergänze de in der passenden Form.','Léa is writing right now. Insert the correct form of de.'],
      ['routine','À sept heures, je prends le ___.','petit-déjeuner','Ich frühstücke um sieben Uhr. Ergänze das fehlende Nomen.','I have breakfast at seven. Insert the missing noun.'],
      ['sequence','D’abord, je me lève. Ensuite, je me douche. ___, je pars.','Enfin','Zuerst aufstehen, danach duschen, zum Schluss aufbrechen.','First get up, then shower, finally leave.']
    ],
    12:[
      ['douleur','J’ai mal ___ dos depuis hier.','au','Ich habe seit gestern Rückenschmerzen.','My back has hurt since yesterday.'],
      ['douleur','J’ai mal ___ dents depuis lundi.','aux','Ich habe seit Montag Zahnschmerzen.','My teeth have hurt since Monday.'],
      ['fievre','Mon fils a ___ fièvre.','de la','Mein Sohn hat Fieber. Ergänze den Teilungsartikel.','My son has a fever. Insert the partitive article.'],
      ['duree','___ quand avez-vous mal à la tête ?','Depuis','Du fragst, seit wann die Kopfschmerzen bestehen.','Ask how long the headache has been present.'],
      ['negation','Je suis malade. Je ne peux ___ travailler demain.','pas','Du bist krank und kannst morgen nicht arbeiten.','You are ill and cannot work tomorrow.'],
      ['aide','Madame, pouvez-vous m’___ ?','aider','Du bittest eine Person höflich um Hilfe.','Politely ask one person for help.'],
      ['rhume','Un médicament ___ le rhume, s’il vous plaît.','contre','Du bittest um ein Mittel gegen Erkältung.','Ask for medicine for a cold.']
    ],
    13:[
      ['demonstratif','Regardez ___ veste !','cette','Du zeigst auf diese eine Jacke.','Point out this one jacket.'],
      ['demonstratif','Regardez ___ pantalon !','ce','Du zeigst auf diese eine Hose.','Point out this one pair of trousers.'],
      ['vowel','Je voudrais visiter ___ hôtel.','cet','Du meinst dieses eine Hotel.','You mean this one hotel.'],
      ['plural','Je cherche ___ chaussures.','ces','Du suchst diese Schuhe, Plural.','You are looking for these shoes, plural.'],
      ['accord','Deux vestes ___. (bleu)','bleues','Zwei blaue Jacken: Passe das Farbadjektiv an.','Two blue jackets: make the colour adjective agree.'],
      ['adjectif','Une ___ robe noire. (petit)','petite','Ein kleines schwarzes Kleid: Passe petit an.','A small black dress: use the correct form of petit.'],
      ['meteo','En été, il ___ chaud.','fait','Im Sommer ist es heiß.','It is hot in summer.'],
      ['futur','Demain, il va ___ froid.','faire','Morgen wird es kalt. Ergänze das fehlende Verb im Infinitiv.','It will be cold tomorrow. Insert the missing verb in the infinitive.'],
      ['saison','Il fait froid en ___.','hiver','Ergänze die Jahreszeit „Winter“.','Insert the season “winter”.']
    ],
    14:[
      ['infinitif','Paul aime ___ à la maison.','cuisiner','Paul kocht gern zu Hause.','Paul likes cooking at home.'],
      ['infinitif','Léa adore ___ des films.','regarder','Léa sieht sehr gern Filme.','Léa loves watching films.'],
      ['article','Paul aime ___ football.','le','Paul mag Fußball allgemein. Ergänze den bestimmten Artikel.','Paul likes football in general. Insert the definite article.'],
      ['sport','Le samedi, je joue ___ tennis avec Léa.','au','Samstags spiele ich mit Léa Tennis.','On Saturdays I play tennis with Léa.'],
      ['negation','Je ___ pas voyager. (aimer)','n’aime','Ich reise nicht gern, schriftlicher Standard. Ergänze n’ und die Verbform.','I do not like travelling, standard written French. Insert n’ and the verb.'],
      ['preference','Moi, je ___ lire avec Paul. (préférer)','préfère','Ich lese lieber mit Paul.','I prefer reading with Paul.'],
      ['question','Qu’est-ce que tu ___ le dimanche ? (faire)','fais','Du fragst, was jemand sonntags macht.','Ask what someone does on Sundays.']
    ],
    15:[
      ['futur','Léa et Paul ___ visiter Lyon demain. (aller)','vont','Léa und Paul werden morgen Lyon besuchen.','Léa and Paul are going to visit Lyon tomorrow.'],
      ['futur','Paul et moi, nous ___ réserver une chambre. (aller)','allons','Paul und ich werden ein Zimmer reservieren.','Paul and I are going to book a room.'],
      ['infinitif','Demain, nous allons ___ au musée.','aller','Morgen werden wir ins Museum gehen.','Tomorrow we are going to go to the museum.'],
      ['reservation','Une chambre pour trois ___, du 4 au 7 août.','nuits','Ergänze „Nächte“. Die Ankunft ist am 4., die Abreise am 7. August.','Insert “nights”. Arrival is on 4 August and departure on 7 August.'],
      ['billet','Un billet aller-___, s’il vous plaît.','retour','Du brauchst Hin- und Rückfahrt. Ergänze das fehlende Wort.','You need an outward and a return journey. Insert the missing word.'],
      ['depart','À quelle heure ___ le train pour Paris ? (partir)','part','Du fragst nach der Abfahrtszeit.','Ask about the departure time.'],
      ['prix','Le petit-déjeuner est ___ dans le prix ?','inclus','Du fragst, ob das Frühstück im Preis enthalten ist.','Ask whether breakfast is included in the price.']
    ],
    16:[
      ['pouvoir','Paul et Léa ne ___ pas venir vendredi. (pouvoir)','peuvent','Paul und Léa können Freitag nicht kommen.','Paul and Léa cannot come on Friday.'],
      ['pouvoir','Paul et moi, nous ___ venir dimanche. (pouvoir)','pouvons','Paul und ich können Sonntag kommen.','Paul and I can come on Sunday.'],
      ['polite','Madame, vous ___ venir à dix-huit heures ? (pouvoir)','pouvez','Du fragst höflich, ob jemand um 18 Uhr kommen kann.','Politely ask whether someone can come at 18:00.'],
      ['reporter','On peut ___ le rendez-vous à lundi ?','reporter','Du möchtest den Termin verschieben, nicht absagen.','You want to postpone the appointment, not cancel it.'],
      ['telephone','Allô Marie, ___ Paul.','c’est','Paul ruft Marie an und nennt seinen eigenen Namen.','Paul calls Marie and gives his own name.'],
      ['souhait','Bon ___, Léa !','anniversaire','Léa hat heute Geburtstag.','It is Léa’s birthday today.'],
      ['compliment','C’est très ___ !','joli','Du sagst: Das ist sehr hübsch!','Say: That is very pretty!']
    ],
    17:[
      ['quelle','___ est votre nationalité, Madame ?','Quelle','Du fragst nach der Staatsangehörigkeit.','Ask about nationality.'],
      ['quelle','___ est votre adresse, Monsieur ?','Quelle','Du fragst nach der Anschrift.','Ask about the address.'],
      ['quel','___ est le prix de ce cours ?','Quel','Du fragst nach dem Preis.','Ask about the price.'],
      ['quels','___ sont les horaires de ce cours ?','Quels','Du fragst nach den Unterrichtszeiten.','Ask about class times.'],
      ['reponse','Merci de me ___ demain.','répondre','Du bittest um eine schriftliche Antwort.','Ask for a written reply.'],
      ['naissance','Date de ___ : 12 juin.','naissance','Ergänze das Formularfeld „Geburtsdatum“.','Complete the form field “date of birth”.'],
      ['salutation','___ Madame,','Bonjour','Beginne eine einfache höfliche Nachricht mit „Guten Tag“.','Start a simple polite message with “Hello”.']
    ],
    18:[
      ['negation','Je ___ comprends pas cette phrase.','ne','Ergänze die schriftliche Verneinung.','Complete the standard written negative.'],
      ['negation','Je ___ parle pas allemand.','ne','Ergänze die schriftliche Verneinung.','Complete the standard written negative.'],
      ['de','Je n’ai pas ___ questions.','de','Ich habe keine Fragen. Ergänze die Form nach der Verneinung.','I have no questions. Complete the form after the negative.'],
      ['elision','Je n’ai pas ___adresse.','d’','Ich habe keine Adresse. Ergänze de in der passenden Form.','I have no address. Insert the correct form of de.'],
      ['conditionnel','___-vous parler plus lentement ?','Pourriez','Verwende die besonders höfliche Form „könnten Sie“.','Use the especially polite form “could you”.'],
      ['aimerais','J’___ avoir des informations. (aimer, formule polie)','aimerais','Verwende die gelernte höfliche Form „ich hätte gern“.','Use the polite form you learned: “I would like”.'],
      ['proposition','On ___ regarder la question ensemble. (pouvoir, formule polie)','pourrait','Verwende den höflichen Vorschlag „wir könnten“.','Use the polite suggestion “we could”.']
    ],
    19:[
      ['genre','Sur la table, il y a ___ ordinateur.','un','Ergänze den unbestimmten Singularartikel vor ordinateur.','Insert the indefinite singular article before ordinateur.'],
      ['genre','Dans le sac, il y a ___ clé.','une','Ergänze den unbestimmten Singularartikel vor clé.','Insert the indefinite singular article before clé.'],
      ['elision','___ école est près du musée.','L’','Ergänze den bestimmten Artikel vor école.','Insert the definite article before école.'],
      ['pluriel','Dans le sac : deux ___. (livre)','livres','Schreibe livre im Plural.','Write livre in the plural.'],
      ['indefini','___ croissants sont sur la table.','Des','Ergänze den unbestimmten Pluralartikel.','Insert the indefinite plural article.'],
      ['defini','___ clés de Paul sont ici.','Les','Ergänze den bestimmten Pluralartikel.','Insert the definite plural article.'],
      ['presenter','Paul et Léa ? Ce ___ mes amis.','sont','Ergänze die schriftliche Standardform.','Complete the standard written form.'],
      ['voici','___ mon billet, ici.','Voici','Du reichst deine Fahrkarte: Hier ist meine Fahrkarte.','Hand over your ticket: Here is my ticket.',['Voilà']],
      ['voila','___ la gare, là-bas.','Voilà','Du zeigst auf den Bahnhof dort drüben.','Point out the station over there.',['Voici']]
    ],
    20:[
      ['er','Léa et Marc ___ allemand. (parler)','parlent','Léa und Marc sprechen Deutsch.','Léa and Marc speak German.'],
      ['er','Paul et moi, nous ___ français. (parler)','parlons','Paul und ich sprechen Französisch.','Paul and I speak French.'],
      ['vous','Madame, vous ___ français ? (parler)','parlez','Du fragst höflich, ob jemand Französisch spricht.','Politely ask whether someone speaks French.'],
      ['nous','Paul et moi, nous ___ le soir. (travailler)','travaillons','Paul und ich arbeiten abends.','Paul and I work in the evening.'],
      ['pas','Paul ___ pas le samedi. (travailler)','ne travaille','Paul arbeitet samstags nicht. Ergänze ne und die Verbform.','Paul does not work on Saturdays. Insert ne and the verb.'],
      ['jamais','Léa ne prend ___ le train.','jamais','Léa fährt nie mit dem Zug.','Léa never takes the train.'],
      ['de','Nous n’avons pas ___ voiture.','de','Wir haben kein Auto.','We have no car.'],
      ['obligation','Pour entrer, il faut ___.','réserver','Reservieren ist Pflicht. Setze die Grundform ein.','Booking is required. Insert the infinitive.'],
      ['interdiction','Il ne ___ pas fumer ici.','faut','Hier darf man nicht rauchen.','Smoking is not allowed here.']
    ],
    21:[
      ['question','___ de personnes viennent ? — Trois.','Combien','Du fragst nach der Anzahl der Personen.','Ask how many people are coming.'],
      ['question','___ coûte la chambre ? — Soixante euros.','Combien','Du fragst nach dem Zimmerpreis.','Ask the price of the room.'],
      ['lieu','___ est-ce que Léa habite ? — À Paris.','Où','Du fragst nach einem Wohnort.','Ask where someone lives.'],
      ['objet','___ ? — C’est un ordinateur.','Qu’est-ce que c’est','Schreibe die gelernte vollständige Frage nach einer Sache; das Fragezeichen steht schon da.','Write the complete question you learned for identifying a thing; the question mark is already given.'],
      ['possessif','Madame, ce sont ___ enfants ?','vos','Du fragst eine Person höflich: Sind das Ihre Kinder?','Politely ask one person: Are these your children?'],
      ['leur','Paul et Léa parlent de ___ mère.','leur','Paul und Léa sprechen über ihre gemeinsame Mutter.','Paul and Léa are talking about their mother.'],
      ['leurs','Paul et Léa parlent de ___ enfants.','leurs','Paul und Léa sprechen über ihre eigenen Kinder.','Paul and Léa are talking about their children.'],
      ['tonique','Je vais avec ___.','elles','Du gehst mit Léa und Marie. Ersetze beide Namen durch das betonte Pronomen.','You are going with Léa and Marie. Replace both names with the stressed pronoun.'],
      ['toi','Paul : « Moi, je travaille ici. Et ___, Marie ? »','toi','Paul fragt Marie: Und du?','Paul asks Marie: And you?']
    ],
    22:[
      ['avoir','Hier, Léa et Paul ___ regardé un film.','ont','Setze das passende Hilfsverb ein.','Insert the correct auxiliary.'],
      ['avoir','Hier, Paul et moi, nous ___ visité Lyon.','avons','Setze das passende Hilfsverb ein.','Insert the correct auxiliary.'],
      ['participe','Léa a ___ au restaurant. (manger)','mangé','Léa hat im Restaurant gegessen.','Léa ate at the restaurant.'],
      ['etre','Hier, Léa ___ partie à dix heures.','est','Léa ist gestern um zehn Uhr abgefahren.','Léa left yesterday at ten.'],
      ['accord','Marie et Léa sont ___. (arriver)','arrivées','Marie und Léa sind angekommen. Passe das Partizip an.','Marie and Léa have arrived. Make the participle agree.'],
      ['recent','Paul et moi, nous ___ de manger. (venir)','venons','Paul und ich haben gerade gegessen.','Paul and I have just eaten.'],
      ['depuis','Léa travaille ici ___ trois mois.','depuis','Léa arbeitet seit drei Monaten hier und tut es noch immer.','Léa has worked here for three months and still does.'],
      ['dans','Je vais partir ___ une semaine.','dans','Ich werde in einer Woche abreisen.','I am going to leave in a week.'],
      ['passe','Je suis arrivé ___ une semaine.','il y a','Ich bin vor einer Woche angekommen, männlicher Sprecher.','I arrived a week ago, male speaker.']
    ],
    23:[
      ['partitif','Pour la soupe, il faut ___ farine.','de la','Ergänze den Teilungsartikel für eine unbestimmte Menge Mehl.','Insert the partitive article for an unspecified amount of flour.'],
      ['partitif','Pour la soupe, il faut ___ lait.','du','Ergänze den Teilungsartikel für eine unbestimmte Menge Milch.','Insert the partitive article for an unspecified amount of milk.'],
      ['elision','Pour la soupe, il faut ___ eau.','de l’','Ergänze den Teilungsartikel für eine unbestimmte Menge Wasser.','Insert the partitive article for an unspecified amount of water.'],
      ['quantite','Trois cents grammes ___ légumes.','de','Dreihundert Gramm Gemüse.','Three hundred grams of vegetables.'],
      ['negative','Je ne mets pas ___ sucre.','de','Ich gebe keinen Zucker dazu. Ergänze nur de.','I am not adding sugar. Insert only de.'],
      ['peu','Un peu ___eau.','d’','Ein wenig Wasser.','A little water.'],
      ['beaucoup','Beaucoup ___ tomates.','de','Viele Tomaten.','Lots of tomatoes.'],
      ['but','Une cuillère pour ___ le lait.','mélanger','Ein Löffel zum Mischen der Milch.','A spoon for mixing the milk.'],
      ['imperatif','___ le lait, puis mélangez. (ajouter, vous)','Ajoutez','Du erklärst höflich: Geben Sie die Milch dazu, dann mischen Sie.','Politely instruct: Add the milk, then mix.']
    ],
    24:[
      ['destination','Paul et Léa vont ___ Allemagne.','en','Paul und Léa fahren nach Deutschland.','Paul and Léa are going to Germany.'],
      ['destination','Paul et moi, nous allons ___ France.','en','Paul und ich fahren nach Frankreich.','Paul and I are going to France.'],
      ['masculin','Nous allons ___ Canada en juillet.','au','Wir fahren im Juli nach Kanada.','We are going to Canada in July.'],
      ['plural','Léa va ___ États-Unis.','aux','Léa fährt in die USA.','Léa is going to the USA.'],
      ['origine','Paul vient ___Allemagne.','d’','Paul kommt aus Deutschland.','Paul comes from Germany.'],
      ['origine-pl','Nos amis viennent ___ États-Unis.','des','Unsere Freunde kommen aus den USA.','Our friends come from the USA.'],
      ['devoir','Paul et moi, nous ___ prendre le train. (devoir)','devons','Paul und ich müssen den Zug nehmen.','Paul and I must take the train.'],
      ['modal','Paul et Léa ___ rentrer vendredi. (devoir)','doivent','Paul und Léa müssen am Freitag zurückkommen.','Paul and Léa must return on Friday.'],
      ['transport','Nous partons ___ voiture.','en','Wir fahren mit dem Auto.','We are travelling by car.']
    ]
  };
  for(const [id,rows]of Object.entries(bank)){
    const s=window.FR_A1_MASTERY_SPECS[id];
    s.checkTransfers=rows.map(([focus,prompt,answer,context,contextEn,accept=[]],index)=>{
      const strictAccents=true,accentHint=/[àâçéèêëîïôùûü]/i.test(answer),format=id==='3'&&['telephone','postal'].includes(focus)?focus==='telephone'?'phone':'postal':null,numberWords=id==='3'&&focus==='nombre';
      const explanation=prompt.replace('___',answer).replace(/\s*\([^)]*\)/g,'').replace(/([’'])\s+/g,'$1');
      return {type:'gap',prompt,answer,accept,context:context+(accentHint?' Achte auch auf die Akzente.':''),contextEn:contextEn+(accentHint?' Check the accents too.':''),explanation,audio:format?'':explanation,marking:{strictAccents,format,numberWords},family:'transfer:'+focus,checkKey:`L${id}-transfer-${focus}-${index}`};
    });
  }
})();
