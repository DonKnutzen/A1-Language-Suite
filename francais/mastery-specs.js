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
      ['epeler','Du hast den Nachnamen gehört, weißt aber nicht, welche Buchstaben er enthält.','Vous pouvez épeler votre nom ?','Vous pouvez répéter votre adresse ?','Vous pouvez écrire votre prénom ?','Épeler bittet darum, die Buchstaben zu nennen.'],
      ['signes','Für ein Namensschild wird « Zoé » benötigt. Welche Schreibweise übernimmt genau den Akzent?','Zoé','Zoè','Zoê','Zoé trägt einen accent aigu.'],
      ['cedille','« François » soll abgeschrieben werden. Welche Schreibweise behält die Cedille?','François','Francois','Franç ois','Die Cedille gehört direkt an das c; im Namen steht kein Leerzeichen.'],
      ['adresse','« Quelle est votre adresse ? » Welche Antwort enthält die erfragte Information?','12, rue Victor-Hugo, à Paris.','Mon nom est Victor Hugo.','Mon prénom est Victor.','Adresse fragt nach der Anschrift, nicht nach einem Namen.'],
      ['clarifier','Die Person spricht zu schnell. Du möchtest das Sprechtempo ändern.','Vous pouvez parler plus lentement ?','Vous pouvez épeler votre nom ?','Vous pouvez écrire votre adresse ?','Plus lentement bedeutet langsamer.'],
      ['lettres','Der Nachname wird « M-A-R-T-I-N » buchstabiert. Welche Eintragung passt?','Martin','Marin','Martine','Alle und nur die genannten Buchstaben werden übernommen.'],
      ['intention','« Comment ça s’écrit ? » Was möchte die Person erfahren?','Die Schreibweise eines Wortes.','Die Aussprache eines Wortes.','Die Bedeutung eines Wortes.','S’écrire bezieht sich auf die Schreibweise.',false]
    ],
    3:[
      ['age','« J’ai trente et un ans. Mon frère a treize ans. » Wie alt ist die sprechende Person?','31','13','30','J’ai bezieht sich auf die sprechende Person; mon frère auf den Bruder.',false],
      ['telephone','Du möchtest die Telefonnummer erfragen.','Quel est votre numéro de téléphone ?','Quel est votre code postal ?','Quelle est votre date de naissance ?','Numéro de téléphone fragt nach der Telefonnummer.'],
      ['naissance','Im Formular steht « 17 avril ». Welche Aussage gibt dieses Geburtsdatum wieder?','Je suis né le dix-sept avril.','Je suis né le sept avril.','Je suis né le dix-sept mai.','Dix-sept ist 17; avril ist April.'],
      ['nombres','Welche Zahl entspricht « soixante et onze »?','71','61','81','Soixante et onze bezeichnet 60 + 11.',false],
      ['numero','Eine Nummer endet auf « quatre-vingt-onze, vingt-quatre ». Welche vier Ziffern sind das?','9124','8124','9142','Quatre-vingt-onze ist 91, vingt-quatre ist 24.',false],
      ['donnees','« Mon téléphone est le 06 12 20 30 40. Mon code postal est B3V 1L2. » Welche Angabe ist der Code postal?','B3V 1L2','06 12 20 30 40','06','Die ausdrücklich als code postal bezeichnete Angabe ist B3V 1L2.',false],
      ['quantite','« Nous sommes vingt étudiants. Dix étudiants parlent allemand. » Wie viele Personen sind im Kurs?','20','10','30','Vingt nennt die Gesamtzahl; dix beschreibt nur eine Teilgruppe.',false],
      ['cent','Du sollst die Zahl 100 ausschreiben.','cent','quatre-vingts','quatre-vingt-dix','Cent ist 100; quatre-vingts ist 80, quatre-vingt-dix ist 90.']
    ],
    4:[
      ['heure','Ein Termin ist um 8:45 Uhr. Welche Angabe passt?','À neuf heures moins le quart.','À huit heures et quart.','À neuf heures et quart.','Viertel vor neun ist 8:45 Uhr.'],
      ['rendezvous','« Mardi, je travaille. On se voit mercredi à dix heures. » Wann ist das Treffen?','Mittwoch um 10 Uhr.','Dienstag um 10 Uhr.','Mittwoch um 12 Uhr.','Der erste Satz beschreibt die Arbeit, der zweite das Treffen.',false],
      ['question','Du kennst den Wochentag des Termins und möchtest jetzt die Uhrzeit erfragen.','À quelle heure est le rendez-vous ?','Quel jour est le rendez-vous ?','Quelle heure est-il ?','À quelle heure fragt nach der Uhrzeit eines Ereignisses.'],
      ['date','« Nous sommes le premier juillet. » Welches Datum ist gemeint?','1. Juli','1. Juni','7. Januar','Premier bezeichnet den ersten Tag, juillet den Juli.',false],
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
      ['accord','Du sprichst über deine beiden Eltern. Welche Aussage ist im geschriebenen Standard korrekt?','Ce sont mes parents.','C’est mes parents.','Ce sont mon parent.','Bei mehreren Elternteilen steht ce sont und mes parents.'],
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
      ['prix','Ein Preis beträgt 19,50 €. Welche Aussage stimmt genau?','Ça coûte dix-neuf euros cinquante.','Ça coûte neuf euros cinquante.','Ça coûte dix-neuf euros quinze.','Dix-neuf ist 19 und cinquante bezeichnet hier die 50 Cent.'],
      ['taille','« La taille quarante est disponible, mais pas la taille quarante-deux. » Welche Größe gibt es?','40','42','44','Die Verneinung gilt nur für quarante-deux.',false],
      ['carte','Du möchtest mit Karte zahlen und fragst, ob das möglich ist.','Je peux payer par carte ?','Je dois payer en espèces ?','Combien coûte cette carte ?','Payer par carte bedeutet mit Karte bezahlen.'],
      ['cher','Der Preis ist zu hoch. Welche Aussage nennt genau dieses Problem?','C’est trop cher.','C’est trop grand.','C’est trop petit.','Cher beschreibt den Preis; grand und petit die Größe.'],
      ['commande','« Deux kilos de pommes et un kilo de tomates. » Welche Menge Tomaten wird verlangt?','Ein Kilo.','Zwei Kilo.','Drei Kilo.','Un kilo bezieht sich auf die Tomaten.',false],
      ['changer','Du möchtest statt eines Kilos Äpfel nur zweihundert Gramm bestellen.','Deux cents grammes de pommes, s’il vous plaît.','Deux kilos de pommes, s’il vous plaît.','Deux cents grammes de tomates, s’il vous plaît.','Die erste Antwort ändert die Menge, aber behält das Produkt bei.'],
      ['demande','Du kennst die Größe des Kleidungsstücks und möchtest seinen Preis wissen.','Combien ça coûte ?','Vous avez quelle taille ?','Je peux payer par carte ?','Combien ça coûte fragt nach dem Preis, nicht nach Größe oder Zahlungsart.']
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
      ['transport','« Pour le musée, prenez le bus huit, pas le bus trois. » Welcher Bus fährt zum Museum?','Linie 8.','Linie 3.','Linie 13.','Die genannte falsche Linie wird ausdrücklich ausgeschlossen.',false],
      ['quai','« Le train pour Lyon part du quai quatre. Le train pour Paris part du quai deux. » Du fährst nach Lyon.','Je vais au quai quatre.','Je vais au quai deux.','Je vais au quai trois.','Für Lyon gilt quai quatre.'],
      ['retard','« Le train part à dix heures. Il a vingt minutes de retard. » Welche Aussage stimmt?','Der Zug hat 20 Minuten Verspätung.','Der Zug fährt 20 Minuten früher ab.','Der Zug fährt von Gleis 20 ab.','Retard bezeichnet die Verspätung.',false],
      ['demander','Du möchtest den Bahnhof finden und fragst höflich nach seinem Ort.','Excusez-moi, où est la gare ?','Excusez-moi, c’est quel quai ?','Excusez-moi, à quelle heure part le train ?','Où est la gare fragt nach dem Ort des Bahnhofs.'],
      ['distance','« C’est à cinq minutes à pied et à deux minutes en bus. » Wie lange dauert der Fußweg?','5 Minuten.','2 Minuten.','7 Minuten.','À pied bezeichnet zu Fuß; en bus ist eine andere Möglichkeit.',false],
      ['ordre','Du erklärst: erst geradeaus, dann links.','Allez tout droit, puis tournez à gauche.','Tournez à gauche, puis allez tout droit.','Allez tout droit, puis tournez à droite.','Puis kennzeichnet den zweiten Schritt; gauche heißt links.'],
      ['arret','Du möchtest wissen, wo du den Bus nehmen kannst.','Où est l’arrêt de bus ?','De quel quai part le train ?','À quelle heure part le train ?','Arrêt de bus ist die Bushaltestelle.']
    ],
    10:[
      ['metier','« Je suis étudiante et je travaille dans un café le samedi. » Was stimmt?','Die Person studiert und arbeitet samstags im Café.','Die Person unterrichtet samstags in einer Schule.','Die Person arbeitet jeden Tag im Café.','Étudiante und die auf Samstag begrenzte Arbeit werden gemeinsam genannt.',false],
      ['horaires','« Je commence à huit heures et je termine à seize heures. » Wann endet die Arbeit?','16 Uhr.','8 Uhr.','18 Uhr.','Terminer nennt das Ende, commencer den Beginn.',false],
      ['question','Du möchtest den Beruf einer Person erfahren.','Quel est votre métier ?','Où travaillez-vous ?','Quels sont vos horaires ?','Métier fragt nach dem Beruf, nicht nach Arbeitsort oder Arbeitszeiten.'],
      ['cours','« J’ai cours le matin et je travaille l’après-midi. » Wann ist Unterricht?','Vormittags.','Nachmittags.','Abends.','J’ai cours steht hier mit le matin.',false],
      ['lieu','Du arbeitest in einem Büro und nicht zu Hause.','Je travaille dans un bureau.','Je travaille à la maison.','Je travaille dans une école.','Dans un bureau benennt das Büro als Arbeitsort.'],
      ['jours','« Je travaille du lundi au jeudi. Le vendredi, j’ai cours. » Was macht die Person freitags?','Sie hat Unterricht.','Sie arbeitet.','Sie beginnt eine neue Stelle.','Der zweite Satz beschreibt ausdrücklich den Freitag.',false],
      ['devoirs','Nach dem Unterricht sagt Léa: « Je dois faire mes devoirs. » Was muss sie tun?','Ihre Hausaufgaben machen.','Ihren Unterricht besuchen.','Ihren Beruf wechseln.','Devoirs bedeutet im Schulkontext Hausaufgaben.',false],
      ['precision','Du möchtest sagen: Der Kurs beginnt um neun, nicht deine Arbeit.','Mon cours commence à neuf heures.','Je commence mon travail à neuf heures.','Mon cours termine à neuf heures.','Cours bezeichnet den Kurs; commence nennt dessen Beginn.']
    ],
    11:[
      ['lever','« Je me lève à sept heures et je pars à huit heures. » Wann steht die Person auf?','7 Uhr.','8 Uhr.','6 Uhr.','Se lever bezeichnet das Aufstehen, partir das Losgehen.',false],
      ['ordre','« D’abord, je prends le petit-déjeuner. Ensuite, je prends le bus. » Was geschieht zuerst?','Frühstücken.','Bus fahren.','Nach Hause kommen.','D’abord kennzeichnet den ersten Schritt.',false],
      ['actuel','« D’habitude, je travaille le matin. Maintenant, je suis en train de lire. » Was macht die Person gerade?','Sie liest.','Sie arbeitet.','Sie frühstückt.','Maintenant und être en train de bezeichnen die aktuelle Tätigkeit.',false],
      ['retour','« Je rentre à dix-huit heures, mais le vendredi, je rentre à seize heures. » Wann kommt die Person freitags zurück?','16 Uhr.','18 Uhr.','17 Uhr.','Mais le vendredi kennzeichnet die Ausnahme.',false],
      ['repas','Du sagst, dass du frühstückst, ohne das Zubereiten des Frühstücks zu behaupten.','Je prends le petit-déjeuner.','Je prépare le petit-déjeuner.','Je prends le déjeuner.','Prendre le petit-déjeuner heißt frühstücken; préparer heißt zubereiten.'],
      ['coucher','« Le soir, je regarde la télé, puis je me couche. » Was geschieht nach dem Fernsehen?','Die Person geht ins Bett.','Die Person steht auf.','Die Person geht zur Arbeit.','Se coucher bedeutet ins Bett gehen.',false],
      ['question','Du kennst die Aufstehzeit und möchtest nach der Zeit der Rückkehr fragen.','Tu rentres à quelle heure ?','Tu te lèves à quelle heure ?','Tu pars à quelle heure ?','Rentrer fragt nach dem Zurückkommen.'],
      ['habitude','Du arbeitest gerade, es geht um diesen Moment.','Je suis en train de travailler.','Je vais travailler demain.','Je travaille tous les lundis.','Nur être en train de beschreibt ausdrücklich die laufende Tätigkeit.']
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
      ['choix','Du zeigst auf mehrere Schuhe und sagst ausdrücklich „diese Schuhe“.','Ces chaussures.','Cette chaussure.','Ce pantalon.','Ces bezeichnet den Plural von chaussure.']
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
      ['depart','« Le train part à huit heures et arrive à dix heures. » Wann fährt er ab?','8 Uhr.','10 Uhr.','18 Uhr.','Partir bezeichnet die Abfahrt, arriver die Ankunft.',false],
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
      ['politesse','Du möchtest besonders höflich um Informationen bitten.','J’aimerais des informations, s’il vous plaît.','Je veux des informations maintenant.','Donnez-moi des informations tout de suite.','J’aimerais + s’il vous plaît formuliert die Bitte höflich.'],
      ['comprendre','« Je comprends la première phrase, mais pas la dernière. » Was muss erklärt werden?','Der letzte Satz.','Der erste Satz.','Beide Sätze.','Mais pas la dernière grenzt den unverstandenen Satz ein.',false],
      ['proposer','Du schlägst höflich vor, die Aufgabe zusammen anzusehen.','On pourrait regarder l’exercice ensemble.','On doit regarder l’exercice ensemble.','On ne peut pas regarder l’exercice ensemble.','Pourrait ist ein höflicher Vorschlag; doit macht eine Verpflichtung daraus.'],
      ['objet','« Je n’ai pas de stylo. Vous pouvez m’aider ? » Was fehlt der Person?','Ein Stift.','Ein Formular.','Eine Adresse.','Je n’ai pas de stylo nennt den fehlenden Gegenstand.',false]
    ],
    19:[
      ['reference','« Voici un hôtel. L’hôtel est près de la gare. » Worauf bezieht sich l’hôtel?','Auf das zuvor genannte Hotel.','Auf die zuvor genannte Bahnhofshalle.','Auf mehrere Hotels.','Der bestimmte Artikel greift das bereits eingeführte Hotel auf.',false],
      ['pluriel','Du möchtest mehrere Baguettes nennen. Welche Form ist im geschriebenen Standard richtig?','Des baguettes.','Des baguette.','Une baguettes.','Im Plural tragen Artikel und Nomen die passende Form.'],
      ['identifier','Du zeigst auf mehrere Freunde. Welche Form passt im geschriebenen Standard?','Ce sont des amis.','C’est des amis.','Ce sont un ami.','Ce sont passt zum Plural des amis; c’est des… ist umgangssprachlich.'],
      ['sens','« La gare est derrière le musée. » Was liegt hinter dem Museum?','Der Bahnhof.','Das Hotel.','Das Café.','Gare ist der Bahnhof.',false],
      ['voici','Du reichst deinen Pass und sagst „Hier ist mein Pass“.','Voici mon passeport.','Voici mon billet.','Voici mes clés.','Passeport ist der Pass, billet die Fahrkarte.'],
      ['genre','Du bestellst ein Baguette und einen Kaffee. Welche Kombination ist korrekt?','Une baguette et un café.','Un baguette et une café.','Une baguette et une café.','Baguette ist feminin, café maskulin.'],
      ['possesseur','« C’est ton livre ? — Oui, et ce sont mes clés. » Wem gehören die Schlüssel laut Antwort?','Der antwortenden Person.','Der fragenden Person.','Beiden Personen gemeinsam.','Mes ist in der Antwort aus Sicht der antwortenden Person zu verstehen.',false],
      ['elision','Du setzt den bestimmten Artikel vor hôtel.','L’hôtel.','Le hôtel.','La hôtel.','Vor dem stummen h wird der bestimmte Artikel elidiert.']
    ],
    20:[
      ['negation','Du möchtest „Ich arbeite heute nicht“ im geschriebenen Standard sagen.','Je ne travaille pas aujourd’hui.','Je ne travaille jamais aujourd’hui.','Je travaille aujourd’hui.','Ne…pas verneint die heutige Tätigkeit; jamais würde nie ausdrücken.'],
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
      ['quantite','« Deux cents grammes de fromage et cent grammes de farine. » Wie viel Käse wird benötigt?','200 g','100 g','300 g','Deux cents grammes gehört zu fromage.',false],
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
  // Dedicated typed transfers supplement the existing grammar pool.
  const additions={
    7:[['Je peux payer ___ carte ?','par','Kann ich mit Karte bezahlen?','Bezahlen']],
    8:[['La pharmacie est ___ la gare.','à la','Die Apotheke ist am Bahnhof.','à + Artikel'],['Le jardin est ___ la maison.','derrière','Der Garten ist hinter dem Haus.','Ort']],
    12:[['J’ai mal ___ dents.','aux','Ich habe Zahnschmerzen.','Gesundheit']],
    17:[['___ sont les horaires du cours ?','Quels','Wie sind die Unterrichtszeiten?','quel / quelle'],['Ma date de ___ est le 3 mai.','naissance','Mein Geburtsdatum ist der 3. Mai.','Formular']],
  };
  for(const [id,rows]of Object.entries(additions))for(const [prompt,answer,context,tag]of rows)window.FR_A1_MASTERY_SPECS[id].tasks.push({type:'gap',prompt,answer,context,tag});
})();

