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
        "context": "Sie sind Deutscher."
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
        "context": "Können Sie bitte buchstabieren?"
      },
      {
        "type": "gap",
        "prompt": "Mon ___ est Sophie.",
        "answer": "prénom",
        "tag": "Persönliche Daten",
        "context": "Mein Vorname ist Sophie."
      },
      {
        "type": "gap",
        "prompt": "Mon nom de ___ est Dupont.",
        "answer": "famille",
        "tag": "Persönliche Daten",
        "context": "Mein Familienname ist Dupont."
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
        "tag": "Alphabet"
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
        "tag": "Alphabet"
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
        "prompt": "Elle ___ trente ans.",
        "answer": "a",
        "tag": "avoir",
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
        "q": "Was bedeutet et demie bei einer Uhrzeit?",
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
          "Je suis un médecin.",
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
          "Il faut ne pas ajouter trop de sel.",
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
