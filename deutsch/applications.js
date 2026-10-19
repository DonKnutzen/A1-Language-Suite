/* Task-specific models and comprehension tasks; free responses are self-assessed. */
window.DE_A1_APPLICATIONS = {
  "1": {
    "speakModel": "Guten Tag! Ich heiße Claire. Ich komme aus Kanada. Ich wohne in Halifax. Ich spreche Französisch. Wie heißen Sie? Wo wohnen Sie?",
    "writeModel": "Ich heiße Claire.\nIch komme aus Kanada.\nIch wohne in Halifax.\nIch spreche Französisch.",
    "hints": [
      [
        "Ich heiße …",
        "Je m’appelle …"
      ],
      [
        "Ich komme aus …",
        "Je viens de …"
      ],
      [
        "Ich wohne in …",
        "J’habite à …"
      ],
      [
        "Ich spreche …",
        "Je parle …"
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Wo wohnen Sie? / Ich wohne in Halifax.\nWo wohnt die Person?",
      "o": [
        "In Halifax.",
        "In Berlin.",
        "In Paris."
      ],
      "a": 0,
      "answer": "In Halifax.",
      "audio": "Die Person wohnt in Halifax.",
      "explanation": "La réponse à « Wo wohnen Sie? » est « Ich wohne in Halifax ». La ville est donc Halifax.",
      "type": "choice"
    },
    "review": {
      "text": "Guten Tag! Wie heißen Sie? / Ich heiße Léa. Ich komme aus Frankreich und wohne in Bonn.",
      "fields": [
        {
          "q": "Wie heißt die Person?",
          "o": [
            "Léa",
            "Lena",
            "Lisa"
          ],
          "answer": "Léa"
        },
        {
          "q": "Wo wohnt sie?",
          "o": [
            "Bonn",
            "Berlin",
            "Halifax"
          ],
          "answer": "Bonn"
        },
        {
          "q": "Woher kommt sie?",
          "o": [
            "Frankreich",
            "Kanada",
            "Deutschland"
          ],
          "answer": "Frankreich"
        }
      ]
    }
  },
  "2": {
    "speakModel": "Mein Vorname ist Claire: C, L, A, I, R, E. Mein Familienname ist Martin: M, A, R, T, I, N.",
    "writeModel": "Wie schreibt man das?\nKönnen Sie das bitte buchstabieren?",
    "hints": [
      [
        "Wie schreibt man das?",
        "Comment cela s’écrit-il ?"
      ],
      [
        "Können Sie das bitte buchstabieren?",
        "Pouvez-vous épeler cela, s’il vous plaît ?"
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Wie ist Ihr Familienname? / Martin. M, A, R, T, I, N.\nWie heißt die Person mit Familiennamen?",
      "o": [
        "Martin",
        "Mertin",
        "Martel"
      ],
      "a": 0,
      "answer": "Martin",
      "audio": "Martin.",
      "explanation": "Les lettres M, A, R, T, I, N forment Martin. Les deux autres noms ont une autre orthographe.",
      "type": "choice"
    },
    "review": {
      "text": "Wie ist Ihr Familienname? / Müller, mit Umlaut. Mein Vorname ist Anna: A, N, N, A.",
      "fields": [
        {
          "q": "Wie ist der Familienname?",
          "o": [
            "Müller",
            "Muller",
            "Möller"
          ],
          "answer": "Müller"
        },
        {
          "q": "Wie schreibt man den Vornamen?",
          "o": [
            "A-N-N-A",
            "A-N-A",
            "A-N-N-E"
          ],
          "answer": "A-N-N-A"
        },
        {
          "q": "Welches Zeichen hat der Familienname?",
          "o": [
            "Umlaut",
            "Bindestrich",
            "Doppel-s"
          ],
          "answer": "Umlaut"
        }
      ]
    }
  },
  "3": {
    "speakModel": "Einundzwanzig, zweiunddreißig, dreiundvierzig, vierundfünfzig, fünfundsechzig. Meine Telefonnummer ist null drei null, fünf fünf fünf, eins acht vier null.",
    "writeModel": "Geburtsdatum: 17.04.2000\nTelefonnummer: 030 555 1840\nPostleitzahl: 12345",
    "hints": [
      [
        "Geburtsdatum",
        "Date de naissance"
      ],
      [
        "Telefonnummer",
        "Numéro de téléphone"
      ],
      [
        "Postleitzahl",
        "Code postal"
      ]
    ],
    "writingTask": "Lies die Angaben und fülle das Formular aus: Nina ist am siebzehnten April zweitausend geboren. Ihre Telefonnummer ist 030 555 1840. Ihre Postleitzahl ist 12345.",
    "fields": [
      [
        "birthDate",
        "Geburtsdatum"
      ],
      [
        "phone",
        "Telefonnummer"
      ],
      [
        "postalCode",
        "Postleitzahl"
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Wie ist Ihre Hausnummer? / Meine Hausnummer ist achtundzwanzig.\nWelche Hausnummer hat die Person?",
      "o": [
        "achtzehn",
        "achtundzwanzig",
        "zweiundachtzig"
      ],
      "a": 1,
      "answer": "achtundzwanzig",
      "audio": "Die Hausnummer ist achtundzwanzig.",
      "explanation": "Achtundzwanzig = vingt-huit : on entend l’unité acht avant la dizaine zwanzig.",
      "type": "choice"
    },
    "review": {
      "text": "Wie alt sind Sie? / Ich bin dreiundzwanzig. Meine Hausnummer ist zweiunddreißig, meine Postleitzahl ist 10405.",
      "fields": [
        {
          "q": "Wie alt ist die Person?",
          "o": [
            "23",
            "32",
            "13"
          ],
          "answer": "23"
        },
        {
          "q": "Wie ist die Hausnummer?",
          "o": [
            "32",
            "23",
            "22"
          ],
          "answer": "32"
        },
        {
          "q": "Wie ist die Postleitzahl?",
          "o": [
            "10405",
            "10504",
            "10450"
          ],
          "answer": "10405"
        }
      ]
    }
  },
  "4": {
    "speakModel": "Haben Sie am Mittwoch um zehn Uhr Zeit? Oder am Donnerstag um elf Uhr? Gut, der Termin ist am Mittwoch um zehn Uhr. Treffpunkt: Bibliothek.",
    "writeModel": "Hallo Anna, der Termin ist am Mittwoch um zehn Uhr. Wir treffen uns vor der Bibliothek. Hast du Zeit? Viele Grüße, Claire",
    "hints": [
      [
        "Der Termin ist am … um …",
        "Le rendez-vous est … à …"
      ],
      [
        "Wir treffen uns vor der Bibliothek.",
        "Nous nous retrouvons devant la bibliothèque."
      ],
      [
        "Hast du Zeit?",
        "As-tu le temps ?"
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Haben Sie am Mittwoch um zehn Uhr Zeit? / Ja, der Termin ist am Mittwoch um zehn Uhr.\nWann ist der Termin?",
      "o": [
        "Mittwoch um elf Uhr.",
        "Donnerstag um zehn Uhr.",
        "Mittwoch um zehn Uhr."
      ],
      "a": 2,
      "answer": "Mittwoch um zehn Uhr.",
      "audio": "Der Termin ist am Mittwoch um zehn Uhr.",
      "explanation": "Les deux personnes confirment mercredi à dix heures : am Mittwoch um zehn Uhr.",
      "type": "choice"
    },
    "review": {
      "text": "Wann ist unser Termin? / Am Donnerstag, am siebzehnten April, um halb fünf.",
      "fields": [
        {
          "q": "An welchem Wochentag ist der Termin?",
          "o": [
            "Donnerstag",
            "Dienstag",
            "Freitag"
          ],
          "answer": "Donnerstag"
        },
        {
          "q": "An welchem Datum ist er?",
          "o": [
            "17. April",
            "7. April",
            "17. Juli"
          ],
          "answer": "17. April"
        },
        {
          "q": "Um wie viel Uhr ist er?",
          "o": [
            "16:30",
            "17:30",
            "16:15"
          ],
          "answer": "16:30"
        }
      ]
    }
  },
  "5": {
    "speakModel": "Das ist meine Mutter. Sie heißt Anne und wohnt in Paris. Das ist mein Vater. Er heißt Paul. Das ist meine Schwester. Sie ist zwanzig Jahre alt.",
    "writeModel": "Familienname: Martin\nVorname: Claire\nFamilienstand: ledig\nGeburtsdatum: 17.04.2000\nGeburtsort: Montréal",
    "hints": [
      [
        "Sie heißt Anne und wohnt in Paris.",
        "Elle s’appelle Anne et habite à Paris."
      ],
      [
        "Sie ist zwanzig Jahre alt.",
        "Elle a vingt ans."
      ],
      [
        "ledig",
        "célibataire"
      ],
      [
        "Geburtsort",
        "Lieu de naissance"
      ]
    ],
    "writingTask": "Lies den Text und fülle das Formular aus: Claire Martin ist ledig. Sie ist am siebzehnten April zweitausend in Montréal geboren.",
    "fields": [
      [
        "lastName",
        "Familienname"
      ],
      [
        "firstName",
        "Vorname"
      ],
      [
        "maritalStatus",
        "Familienstand"
      ],
      [
        "birthDate",
        "Geburtsdatum"
      ],
      [
        "birthPlace",
        "Geburtsort"
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Wie heißt Ihre Schwester? / Meine Schwester heißt Anne. Meine Mutter heißt Claire.\nWie heißt die Schwester?",
      "o": [
        "Claire",
        "Anne",
        "Clara"
      ],
      "a": 1,
      "answer": "Anne",
      "audio": "Die Schwester heißt Anne.",
      "explanation": "Anne est la sœur (Schwester). Claire est la mère (Mutter).",
      "type": "choice"
    },
    "review": {
      "text": "Wer ist das auf dem Foto? / Das ist mein Bruder Paul. Meine Schwester heißt Anne. Wir haben zwei Brüder und eine Schwester.",
      "fields": [
        {
          "q": "Wer ist Paul?",
          "o": [
            "der Bruder",
            "der Vater",
            "der Sohn"
          ],
          "answer": "der Bruder"
        },
        {
          "q": "Wie heißt die Schwester?",
          "o": [
            "Anne",
            "Anna",
            "Claire"
          ],
          "answer": "Anne"
        },
        {
          "q": "Wie viele Brüder gibt es?",
          "o": [
            "zwei",
            "einen",
            "drei"
          ],
          "answer": "zwei"
        }
      ]
    }
  },
  "6": {
    "speakModel": "Guten Tag! Ich hätte gern einen Salat und ein Wasser, bitte. Den Salat ohne Fleisch, bitte. Die Rechnung, bitte. Vielen Dank!",
    "writeModel": "Ich hätte gern einen Kaffee, eine Suppe und ein Wasser, bitte.",
    "hints": [
      [
        "Ich hätte gern …",
        "Je voudrais …"
      ],
      [
        "Ohne Fleisch, bitte.",
        "Sans viande, s’il vous plaît."
      ],
      [
        "Die Rechnung, bitte.",
        "L’addition, s’il vous plaît."
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Was möchten Sie? / Einen Salat ohne Fleisch und ein Wasser, bitte.\nWas bestellt die Person?",
      "o": [
        "Salat ohne Fleisch und Wasser.",
        "Salat mit Fleisch und Wasser.",
        "Suppe ohne Fleisch und Wasser."
      ],
      "a": 0,
      "answer": "Salat ohne Fleisch und Wasser.",
      "audio": "Die Person bestellt einen Salat ohne Fleisch und ein Wasser.",
      "explanation": "La commande comprend une salade sans viande (ohne Fleisch) et une eau.",
      "type": "choice"
    },
    "review": {
      "text": "Was möchten Sie? / Einen Tee ohne Zucker und einen Salat, bitte. / Mit Fleisch? / Nein, ohne Fleisch.",
      "fields": [
        {
          "q": "Was trinkt die Person?",
          "o": [
            "Tee",
            "Kaffee",
            "Wasser"
          ],
          "answer": "Tee"
        },
        {
          "q": "Was möchte sie nicht im Getränk?",
          "o": [
            "Zucker",
            "Milch",
            "Eis"
          ],
          "answer": "Zucker"
        },
        {
          "q": "Wie möchte sie den Salat?",
          "o": [
            "ohne Fleisch",
            "mit Fleisch",
            "mit Käse"
          ],
          "answer": "ohne Fleisch"
        }
      ]
    }
  },
  "7": {
    "speakModel": "Wie viel kostet die Jacke? Haben Sie die Jacke in Größe vierzig? Wie viel kosten die Schuhe? Haben Sie die Schuhe in Größe zweiundvierzig?",
    "writeModel": "Zwei Äpfel: zwei Euro.\nEin Brot: drei Euro.\nEine Flasche Wasser: ein Euro.",
    "hints": [
      [
        "zwei Äpfel: zwei Euro",
        "deux pommes : deux euros"
      ],
      [
        "ein Brot: drei Euro",
        "un pain : trois euros"
      ],
      [
        "eine Flasche Wasser: ein Euro",
        "une bouteille d’eau : un euro"
      ],
      [
        "Haben Sie das in Größe vierzig?",
        "L’avez-vous en taille quarante ?"
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Was kostet das Brot? / Drei Euro. Zwei Äpfel kosten zwei Euro.\nWie viel kostet das Brot?",
      "o": [
        "zwei Euro",
        "drei Euro",
        "fünf Euro"
      ],
      "a": 1,
      "answer": "drei Euro",
      "audio": "Das Brot kostet drei Euro.",
      "explanation": "Le pain coûte trois euros. Les deux euros concernent les pommes.",
      "type": "choice"
    },
    "review": {
      "text": "Was kosten die Äpfel? / Ein Kilo kostet drei Euro. / Dann nehme ich zwei Kilo. Und wo ist die Kasse? / Im ersten Stock.",
      "fields": [
        {
          "q": "Was kostet ein Kilo?",
          "o": [
            "drei Euro",
            "zwei Euro",
            "sechs Euro"
          ],
          "answer": "drei Euro"
        },
        {
          "q": "Wie viel kauft die Person?",
          "o": [
            "zwei Kilo",
            "ein Kilo",
            "drei Kilo"
          ],
          "answer": "zwei Kilo"
        },
        {
          "q": "Wo ist die Kasse?",
          "o": [
            "im ersten Stock",
            "im zweiten Stock",
            "im dritten Stock"
          ],
          "answer": "im ersten Stock"
        }
      ]
    }
  },
  "8": {
    "speakModel": "Die Wohnung hat zwei Zimmer. Sie hat eine Küche und einen Balkon. Die Wohnung ist frei. Wie hoch ist die Miete? Wann kann ich die Wohnung sehen?",
    "writeModel": "Guten Tag, ich suche eine Wohnung. Kann ich am Montag um zehn Uhr zur Besichtigung kommen? Meine Telefonnummer ist 030 555 1840. Viele Grüße, Claire Martin",
    "hints": [
      [
        "Kann ich am Montag um zehn Uhr zur Besichtigung kommen?",
        "Puis-je venir pour une visite lundi à dix heures ?"
      ],
      [
        "Meine Telefonnummer ist …",
        "Mon numéro de téléphone est …"
      ],
      [
        "Mit freundlichen Grüßen",
        "Cordialement"
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Hat die Wohnung zwei Zimmer? / Ja, und einen Balkon.\nWas hat die Wohnung?",
      "o": [
        "Zwei Zimmer ohne Balkon.",
        "Drei Zimmer mit Balkon.",
        "Zwei Zimmer mit Balkon."
      ],
      "a": 2,
      "answer": "Zwei Zimmer mit Balkon.",
      "audio": "Die Wohnung hat zwei Zimmer und einen Balkon.",
      "explanation": "La réponse confirme deux pièces et un balcon. Elle ne dit pas trois pièces.",
      "type": "choice"
    },
    "review": {
      "text": "Wie ist die Wohnung? / Sie hat drei Zimmer und einen Balkon. Die Miete ist siebenhundert Euro.",
      "fields": [
        {
          "q": "Wie viele Zimmer hat die Wohnung?",
          "o": [
            "drei",
            "zwei",
            "vier"
          ],
          "answer": "drei"
        },
        {
          "q": "Was hat sie außerdem?",
          "o": [
            "einen Balkon",
            "einen Garten",
            "eine Garage"
          ],
          "answer": "einen Balkon"
        },
        {
          "q": "Wie hoch ist die Miete?",
          "o": [
            "700 Euro",
            "600 Euro",
            "750 Euro"
          ],
          "answer": "700 Euro"
        }
      ]
    }
  },
  "9": {
    "speakModel": "Gehen Sie zuerst geradeaus. Gehen Sie dann nach links. Gehen Sie dann nach rechts. Welche Linie fährt zum Bahnhof?",
    "writeModel": "Gehen Sie von meinem Haus geradeaus. Gehen Sie dann nach rechts. Die Bibliothek ist links.",
    "hints": [
      [
        "Gehen Sie von meinem Haus geradeaus.",
        "Allez tout droit depuis ma maison."
      ],
      [
        "Die Bibliothek ist links.",
        "La bibliothèque est à gauche."
      ],
      [
        "Welche Linie fährt zum Bahnhof?",
        "Quelle ligne va à la gare ?"
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Welche Linie fährt zum Bahnhof? / Nehmen Sie die Linie acht, nicht die Linie achtzehn.\nWelche Linie fährt zum Bahnhof?",
      "o": [
        "Linie acht.",
        "Linie achtzehn.",
        "Linie drei."
      ],
      "a": 0,
      "answer": "Linie acht.",
      "audio": "Die Linie acht fährt zum Bahnhof.",
      "explanation": "Le dialogue précise Linie acht et exclut explicitement Linie achtzehn.",
      "type": "choice"
    },
    "review": {
      "text": "Wie komme ich zum Bahnhof? / Gehen Sie zuerst nach rechts und dann geradeaus. Nehmen Sie dort die Linie drei.",
      "fields": [
        {
          "q": "Was macht die Person zuerst?",
          "o": [
            "nach rechts gehen",
            "nach links gehen",
            "geradeaus gehen"
          ],
          "answer": "nach rechts gehen"
        },
        {
          "q": "Was kommt danach?",
          "o": [
            "geradeaus gehen",
            "zurückgehen",
            "nach links gehen"
          ],
          "answer": "geradeaus gehen"
        },
        {
          "q": "Welche Linie soll sie nehmen?",
          "o": [
            "Linie drei",
            "Linie dreizehn",
            "Linie acht"
          ],
          "answer": "Linie drei"
        }
      ]
    }
  },
  "10": {
    "speakModel": "Ich arbeite als Verkäuferin. Ich arbeite im Supermarkt. Ich arbeite von acht bis sechzehn Uhr.",
    "writeModel": "Guten Morgen, ich komme heute später ins Büro. Ich bin um neun Uhr da. Entschuldigung für die Verspätung. Viele Grüße, Claire",
    "hints": [
      [
        "Ich komme heute später ins Büro.",
        "J’arrive plus tard au bureau aujourd’hui."
      ],
      [
        "Ich bin um neun Uhr da.",
        "Je serai là à neuf heures."
      ],
      [
        "Entschuldigung für die Verspätung.",
        "Désolé(e) pour le retard."
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Wann kommen Sie heute? / Ich komme später. Ich bin um neun Uhr da.\nWann kommt die Person heute?",
      "o": [
        "um acht Uhr",
        "um neun Uhr",
        "um sechzehn Uhr"
      ],
      "a": 1,
      "answer": "um neun Uhr",
      "audio": "Die Person kommt um neun Uhr.",
      "explanation": "La personne annonce un retard puis donne l’heure exacte : um neun Uhr.",
      "type": "choice"
    },
    "review": {
      "text": "Wo arbeiten Sie? / Ich arbeite im Supermarkt, von acht bis sechzehn Uhr. Morgen habe ich frei.",
      "fields": [
        {
          "q": "Wo arbeitet die Person?",
          "o": [
            "im Supermarkt",
            "im Büro",
            "im Krankenhaus"
          ],
          "answer": "im Supermarkt"
        },
        {
          "q": "Wann beginnt sie?",
          "o": [
            "um acht Uhr",
            "um neun Uhr",
            "um sechzehn Uhr"
          ],
          "answer": "um acht Uhr"
        },
        {
          "q": "Wann hat sie frei?",
          "o": [
            "morgen",
            "heute",
            "am Montag"
          ],
          "answer": "morgen"
        }
      ]
    }
  },
  "11": {
    "speakModel": "Ich lerne seit sechs Monaten Deutsch. Mein Kurs ist am Vormittag. Wie lange lernst du Deutsch? Wann beginnt dein Kurs?",
    "writeModel": "Ich lerne jeden Tag Deutsch. Ich mache Hausaufgaben. Am Abend lese ich ein Buch. Können Sie das Wort bitte erklären?",
    "hints": [
      [
        "Ich lerne jeden Tag Deutsch.",
        "J’apprends l’allemand chaque jour."
      ],
      [
        "Am Abend lese ich ein Buch.",
        "Le soir, je lis un livre."
      ],
      [
        "Können Sie das Wort bitte erklären?",
        "Pouvez-vous expliquer ce mot, s’il vous plaît ?"
      ],
      [
        "Wann beginnt dein Kurs?",
        "Quand ton cours commence-t-il ?"
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Wann ist Ihr Kurs? / Am Vormittag. Ich lerne seit sechs Monaten Deutsch.\nWann ist der Kurs?",
      "o": [
        "Am Nachmittag.",
        "Am Abend.",
        "Am Vormittag."
      ],
      "a": 2,
      "answer": "Am Vormittag.",
      "audio": "Der Kurs ist am Vormittag.",
      "explanation": "Am Vormittag signifie le matin, pas l’après-midi ni le soir.",
      "type": "choice"
    },
    "review": {
      "text": "Wann ist Ihr Deutschkurs? / Am Abend. Ich lerne seit drei Monaten Deutsch und brauche ein Wörterbuch.",
      "fields": [
        {
          "q": "Wann ist der Kurs?",
          "o": [
            "am Abend",
            "am Vormittag",
            "am Nachmittag"
          ],
          "answer": "am Abend"
        },
        {
          "q": "Wie lange lernt die Person Deutsch?",
          "o": [
            "seit drei Monaten",
            "seit sechs Monaten",
            "seit zwei Monaten"
          ],
          "answer": "seit drei Monaten"
        },
        {
          "q": "Was braucht sie?",
          "o": [
            "ein Wörterbuch",
            "ein Heft",
            "ein Buch"
          ],
          "answer": "ein Wörterbuch"
        }
      ]
    }
  },
  "12": {
    "speakModel": "Ich spiele gern Fußball und lese gern Bücher. Hast du am Samstag Zeit? Wollen wir schwimmen gehen?",
    "writeModel": "Am Samstag spiele ich Fußball. Am Abend lese ich ein Buch. Am Sonntag schwimme ich. Ich gehe auch gern ins Kino.",
    "hints": [
      [
        "Am Samstag spiele ich Fußball.",
        "Samedi, je joue au football."
      ],
      [
        "Am Abend lese ich ein Buch.",
        "Le soir, je lis un livre."
      ],
      [
        "Am Sonntag schwimme ich.",
        "Dimanche, je nage."
      ],
      [
        "Hast du am Samstag Zeit?",
        "As-tu le temps samedi ?"
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Hast du am Samstag Zeit? / Nein, aber am Sonntag können wir schwimmen gehen.\nWann können die Personen schwimmen gehen?",
      "o": [
        "Am Sonntag.",
        "Am Samstag.",
        "Am Montag."
      ],
      "a": 0,
      "answer": "Am Sonntag.",
      "audio": "Die Personen können am Sonntag schwimmen gehen.",
      "explanation": "Le samedi est refusé. La proposition acceptée est le dimanche, am Sonntag.",
      "type": "choice"
    },
    "review": {
      "text": "Hast du am Samstag Zeit? / Nein, am Sonntag. Wir können Tennis spielen. / Am Vormittag? / Lieber am Nachmittag.",
      "fields": [
        {
          "q": "An welchem Tag treffen sie sich?",
          "o": [
            "Sonntag",
            "Samstag",
            "Montag"
          ],
          "answer": "Sonntag"
        },
        {
          "q": "Was wollen sie machen?",
          "o": [
            "Tennis spielen",
            "Fußball spielen",
            "schwimmen"
          ],
          "answer": "Tennis spielen"
        },
        {
          "q": "Wann am Tag treffen sie sich?",
          "o": [
            "am Nachmittag",
            "am Vormittag",
            "am Abend"
          ],
          "answer": "am Nachmittag"
        }
      ]
    }
  },
  "13": {
    "speakModel": "Guten Tag, ich möchte ein Doppelzimmer für zwei Personen reservieren. Vom ersten bis zum dritten August, für zwei Nächte, bitte.",
    "writeModel": "Guten Tag, ich möchte vom ersten bis zum dritten August ein Doppelzimmer für zwei Personen reservieren. Ist das Frühstück inklusive? Vielen Dank. Mit freundlichen Grüßen, Claire Martin",
    "hints": [
      [
        "Ich möchte … reservieren.",
        "Je voudrais réserver …"
      ],
      [
        "Vom ersten bis zum dritten August.",
        "Du premier au trois août."
      ],
      [
        "Für zwei Personen und zwei Nächte.",
        "Pour deux personnes et deux nuits."
      ],
      [
        "Ist das Frühstück inklusive?",
        "Le petit-déjeuner est-il compris ?"
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Für wie viele Nächte möchten Sie ein Zimmer? / Für zwei Nächte, vom ersten bis zum dritten August.\nWie viele Nächte bleibt die Person?",
      "o": [
        "eine Nacht",
        "zwei Nächte",
        "drei Nächte"
      ],
      "a": 1,
      "answer": "zwei Nächte",
      "audio": "Die Person bleibt zwei Nächte.",
      "explanation": "Du premier au trois août correspond à deux nuits, comme indiqué explicitement.",
      "type": "choice"
    },
    "review": {
      "text": "Was möchten Sie reservieren? / Ein Doppelzimmer für zwei Nächte und zwei Personen, bitte.",
      "fields": [
        {
          "q": "Was für ein Zimmer möchte die Person?",
          "o": [
            "ein Doppelzimmer",
            "ein Einzelzimmer",
            "ein Familienzimmer"
          ],
          "answer": "ein Doppelzimmer"
        },
        {
          "q": "Für wie viele Nächte?",
          "o": [
            "zwei",
            "eine",
            "drei"
          ],
          "answer": "zwei"
        },
        {
          "q": "Für wie viele Personen?",
          "o": [
            "zwei",
            "eine",
            "vier"
          ],
          "answer": "zwei"
        }
      ]
    }
  },
  "14": {
    "speakModel": "Guten Tag, ich brauche einen Termin beim Arzt. Ich habe seit gestern Fieber und Husten. Haben Sie heute einen Termin frei?",
    "writeModel": "Guten Morgen, ich bin krank. Ich habe seit gestern Fieber und Husten. Ich kann heute nicht kommen. Viele Grüße, Claire",
    "hints": [
      [
        "Ich brauche einen Termin beim Arzt.",
        "J’ai besoin d’un rendez-vous chez le médecin."
      ],
      [
        "Haben Sie heute einen Termin frei?",
        "Avez-vous un rendez-vous disponible aujourd’hui ?"
      ],
      [
        "Ich habe seit gestern Fieber und Husten.",
        "J’ai de la fièvre et de la toux depuis hier."
      ],
      [
        "Ich kann heute nicht kommen.",
        "Je ne peux pas venir aujourd’hui."
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Seit wann haben Sie Fieber? / Seit gestern. Heute habe ich auch Husten.\nSeit wann hat die Person Fieber?",
      "o": [
        "Seit heute.",
        "Seit zwei Tagen.",
        "Seit gestern."
      ],
      "a": 2,
      "answer": "Seit gestern.",
      "audio": "Die Person hat seit gestern Fieber.",
      "explanation": "La fièvre dure depuis hier (seit gestern). La toux commence aujourd’hui.",
      "type": "choice"
    },
    "review": {
      "text": "Was fehlt Ihnen? / Ich habe seit gestern Husten. Heute habe ich auch Fieber. Ich kann morgen nicht arbeiten.",
      "fields": [
        {
          "q": "Was hat die Person seit gestern?",
          "o": [
            "Husten",
            "Fieber",
            "Halsschmerzen"
          ],
          "answer": "Husten"
        },
        {
          "q": "Was hat sie seit heute?",
          "o": [
            "Fieber",
            "Husten",
            "Kopfschmerzen"
          ],
          "answer": "Fieber"
        },
        {
          "q": "Wann kann sie nicht arbeiten?",
          "o": [
            "morgen",
            "heute",
            "am Montag"
          ],
          "answer": "morgen"
        }
      ]
    }
  },
  "15": {
    "speakModel": "Ich feiere am Samstag Geburtstag. Die Party ist um achtzehn Uhr bei mir. Kannst du kommen? Ja, gern! Um wie viel Uhr soll ich kommen?",
    "writeModel": "Liebe Anna, vielen Dank für die Einladung. Ich komme gern am Samstag um achtzehn Uhr. Ich bringe einen Kuchen mit. Ist das gut? Viele Grüße, Claire",
    "hints": [
      [
        "Vielen Dank für die Einladung.",
        "Merci pour l’invitation."
      ],
      [
        "Ich komme gern.",
        "Je viens avec plaisir."
      ],
      [
        "Ich bringe einen Kuchen mit.",
        "J’apporte un gâteau."
      ],
      [
        "Um wie viel Uhr soll ich kommen?",
        "À quelle heure dois-je venir ?"
      ],
      [
        "Viele Grüße",
        "Amitiés"
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Ich feiere am Samstag um achtzehn Uhr Geburtstag. Kannst du kommen? / Ja, gern. Ich bringe einen Kuchen mit.\nWas bringt die Person mit?",
      "o": [
        "Einen Kuchen.",
        "Einen Salat.",
        "Ein Brot."
      ],
      "a": 0,
      "answer": "Einen Kuchen.",
      "audio": "Die Person bringt einen Kuchen mit.",
      "explanation": "La personne dit « Ich bringe einen Kuchen mit » : elle apporte un gâteau.",
      "type": "choice"
    },
    "review": {
      "text": "Ich feiere am Freitag um neunzehn Uhr Geburtstag. Kannst du kommen? / Ja, ich bringe einen Salat mit.",
      "fields": [
        {
          "q": "An welchem Tag ist die Feier?",
          "o": [
            "Freitag",
            "Samstag",
            "Sonntag"
          ],
          "answer": "Freitag"
        },
        {
          "q": "Um wie viel Uhr beginnt sie?",
          "o": [
            "19:00",
            "18:00",
            "20:00"
          ],
          "answer": "19:00"
        },
        {
          "q": "Was bringt die zweite Person mit?",
          "o": [
            "einen Salat",
            "einen Kuchen",
            "Brot"
          ],
          "answer": "einen Salat"
        }
      ]
    }
  },
  "16": {
    "speakModel": "Rauchen verboten: Hier darf man nicht rauchen. Nur für Kunden: Der Eingang ist nur für Kunden. Heute geschlossen: Das Geschäft ist heute nicht geöffnet.",
    "writeModel": "Geöffnet von neun bis achtzehn Uhr.\nParken verboten.",
    "hints": [
      [
        "Hier darf man nicht rauchen.",
        "Ici, on n’a pas le droit de fumer."
      ],
      [
        "Der Eingang ist nur für Kunden.",
        "L’entrée est réservée aux clients."
      ],
      [
        "Das Geschäft ist heute nicht geöffnet.",
        "Le magasin n’est pas ouvert aujourd’hui."
      ],
      [
        "Geöffnet von neun bis achtzehn Uhr.",
        "Ouvert de neuf à dix-huit heures."
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Ist das Geschäft heute geöffnet? / Nein, heute ist es geschlossen. Morgen ist es von neun bis achtzehn Uhr geöffnet.\nWann ist das Geschäft geöffnet?",
      "o": [
        "Heute von neun bis achtzehn Uhr.",
        "Morgen von neun bis achtzehn Uhr.",
        "Morgen von acht bis neunzehn Uhr."
      ],
      "a": 1,
      "answer": "Morgen von neun bis achtzehn Uhr.",
      "audio": "Das Geschäft ist morgen von neun bis achtzehn Uhr geöffnet.",
      "explanation": "Le magasin est fermé aujourd’hui et ouvert demain de neuf à dix-huit heures.",
      "type": "choice"
    },
    "review": {
      "text": "Ist das Geschäft heute geöffnet? / Nein. Morgen ist es von zehn bis achtzehn Uhr geöffnet. Der Eingang ist nur für Kunden.",
      "fields": [
        {
          "q": "Wann ist das Geschäft geschlossen?",
          "o": [
            "heute",
            "morgen",
            "übermorgen"
          ],
          "answer": "heute"
        },
        {
          "q": "Wann öffnet es morgen?",
          "o": [
            "um zehn Uhr",
            "um neun Uhr",
            "um achtzehn Uhr"
          ],
          "answer": "um zehn Uhr"
        },
        {
          "q": "Für wen ist der Eingang?",
          "o": [
            "für Kunden",
            "für Mitarbeiter",
            "für alle"
          ],
          "answer": "für Kunden"
        }
      ]
    }
  },
  "17": {
    "speakModel": "Können Sie mir bitte den Stift geben? Können Sie mir bitte helfen? Kann ich das Fenster öffnen? Ja, natürlich.",
    "writeModel": "Können Sie mir bitte helfen?\nJa, natürlich.\nTut mir leid, das geht nicht.",
    "hints": [
      [
        "Können Sie mir bitte … geben?",
        "Pouvez-vous me donner …, s’il vous plaît ?"
      ],
      [
        "Kann ich das Fenster öffnen?",
        "Puis-je ouvrir la fenêtre ?"
      ],
      [
        "Ja, natürlich.",
        "Oui, bien sûr."
      ],
      [
        "Tut mir leid, das geht nicht.",
        "Désolé(e), ce n’est pas possible."
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Können Sie mir bitte den Stift geben? / Ja, natürlich. Hier, bitte.\nWas möchte die erste Person?",
      "o": [
        "Das Buch.",
        "Das Glas.",
        "Den Stift."
      ],
      "a": 2,
      "answer": "Den Stift.",
      "audio": "Die erste Person möchte den Stift.",
      "explanation": "La demande porte sur den Stift, le stylo, et non le livre ou le verre.",
      "type": "choice"
    },
    "review": {
      "text": "Können Sie mir bitte das Buch geben? / Ja, natürlich. / Kann ich auch das Fenster öffnen? / Leider nicht.",
      "fields": [
        {
          "q": "Was möchte die erste Person?",
          "o": [
            "das Buch",
            "den Stift",
            "die Tasche"
          ],
          "answer": "das Buch"
        },
        {
          "q": "Bekommt sie das Buch?",
          "o": [
            "Ja, natürlich.",
            "Leider nicht.",
            "Erst morgen."
          ],
          "answer": "Ja, natürlich."
        },
        {
          "q": "Was darf sie nicht machen?",
          "o": [
            "das Fenster öffnen",
            "das Buch nehmen",
            "den Stift geben"
          ],
          "answer": "das Fenster öffnen"
        }
      ]
    }
  },
  "18": {
    "speakModel": "Zuerst lese ich die Aufgabe. Dann höre ich den Text. Dann schreibe ich die Antwort.",
    "writeModel": "Zuerst lese ich die Aufgabe.\nDann höre ich den Text.\nDann schreibe ich die Antwort.\nZum Schluss prüfe ich den Text.",
    "hints": [
      [
        "Zuerst lese ich die Aufgabe.",
        "D’abord, je lis la consigne."
      ],
      [
        "Dann höre ich den Text.",
        "Ensuite, j’écoute le texte."
      ],
      [
        "Dann schreibe ich die Antwort.",
        "Ensuite, j’écris la réponse."
      ],
      [
        "Zum Schluss prüfe ich den Text.",
        "Pour finir, je vérifie le texte."
      ]
    ],
    "writingTask": "Écris en allemand quatre étapes : lire la consigne, écouter le texte, écrire la réponse, vérifier le texte.",
    "reading": {
      "q": "Lies den Dialog: Was mache ich zuerst? / Lesen Sie zuerst die Aufgabe. Hören Sie dann den Text.\nWas kommt zuerst?",
      "o": [
        "Die Aufgabe lesen.",
        "Den Text hören.",
        "Die Antwort schreiben."
      ],
      "a": 0,
      "answer": "Die Aufgabe lesen.",
      "audio": "Zuerst lesen Sie die Aufgabe.",
      "explanation": "Zuerst indique la première étape : lire la consigne. L’écoute vient ensuite.",
      "type": "choice"
    },
    "review": {
      "text": "Was mache ich zuerst? / Lesen Sie zuerst die Aufgabe. Dann hören Sie den Text zweimal. Zum Schluss kreuzen Sie die Antwort an.",
      "fields": [
        {
          "q": "Was kommt zuerst?",
          "o": [
            "die Aufgabe lesen",
            "den Text hören",
            "die Antwort ankreuzen"
          ],
          "answer": "die Aufgabe lesen"
        },
        {
          "q": "Wie oft hört man den Text?",
          "o": [
            "zweimal",
            "einmal",
            "dreimal"
          ],
          "answer": "zweimal"
        },
        {
          "q": "Was macht man zum Schluss?",
          "o": [
            "die Antwort ankreuzen",
            "den Text lesen",
            "die Aufgabe hören"
          ],
          "answer": "die Antwort ankreuzen"
        }
      ]
    }
  },
  "19": {
    "speakModel": "Mein Hals tut weh. Meine Beine tun weh. Ich habe seit gestern Schmerzen.",
    "writeModel": "Mein Kopf tut weh. Meine Beine tun weh. Ich habe seit gestern Schmerzen und brauche einen Termin beim Arzt.",
    "hints": [
      [
        "Mein Kopf tut weh.",
        "J’ai mal à la tête."
      ],
      [
        "Meine Beine tun weh.",
        "J’ai mal aux jambes."
      ],
      [
        "Ich habe seit gestern Schmerzen.",
        "J’ai des douleurs depuis hier."
      ],
      [
        "Ich brauche einen Termin beim Arzt.",
        "J’ai besoin d’un rendez-vous chez le médecin."
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Was tut Ihnen weh? / Meine Beine tun weh. Mein Kopf tut nicht weh.\nWas tut weh?",
      "o": [
        "Der Kopf.",
        "Die Beine.",
        "Der Hals."
      ],
      "a": 1,
      "answer": "Die Beine.",
      "audio": "Die Beine tun weh.",
      "explanation": "La personne a mal aux jambes. Elle précise qu’elle n’a pas mal à la tête.",
      "type": "choice"
    },
    "review": {
      "text": "Was tut Ihnen weh? / Mein Rücken und meine Beine. Mein Kopf tut nicht weh. Ich brauche einen Termin beim Arzt.",
      "fields": [
        {
          "q": "Welcher Körperteil tut weh?",
          "o": [
            "der Rücken",
            "der Kopf",
            "der Hals"
          ],
          "answer": "der Rücken"
        },
        {
          "q": "Was tut nicht weh?",
          "o": [
            "der Kopf",
            "die Beine",
            "der Rücken"
          ],
          "answer": "der Kopf"
        },
        {
          "q": "Was braucht die Person?",
          "o": [
            "einen Termin beim Arzt",
            "eine Apotheke",
            "ein Glas Wasser"
          ],
          "answer": "einen Termin beim Arzt"
        }
      ]
    }
  },
  "20": {
    "speakModel": "Heute ist es kalt. Ich brauche einen Mantel. Morgen regnet es. Ich nehme einen Regenschirm mit.",
    "writeModel": "Morgen ist es kalt. Ich brauche eine Jacke. Es regnet. Ich nehme einen Regenschirm mit.",
    "hints": [
      [
        "Morgen ist es kalt.",
        "Demain, il fera froid."
      ],
      [
        "Ich brauche eine Jacke.",
        "J’ai besoin d’une veste."
      ],
      [
        "Es regnet.",
        "Il pleut."
      ],
      [
        "Ich nehme einen Regenschirm mit.",
        "Je prends un parapluie."
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Wie ist das Wetter morgen? / Es ist kalt und es regnet. Nimm einen Regenschirm mit.\nWas soll die Person mitnehmen?",
      "o": [
        "Ein Hemd.",
        "Einen Mantel.",
        "Einen Regenschirm."
      ],
      "a": 2,
      "answer": "Einen Regenschirm.",
      "audio": "Die Person soll einen Regenschirm mitnehmen.",
      "explanation": "La consigne dit « Nimm einen Regenschirm mit » : prends un parapluie.",
      "type": "choice"
    },
    "review": {
      "text": "Wie ist das Wetter heute? / Es regnet und es ist kalt. / Dann nehme ich einen Mantel und einen Regenschirm mit.",
      "fields": [
        {
          "q": "Wie ist das Wetter?",
          "o": [
            "Es regnet.",
            "Es schneit.",
            "Es ist sonnig."
          ],
          "answer": "Es regnet."
        },
        {
          "q": "Wie ist die Temperatur?",
          "o": [
            "kalt",
            "warm",
            "heiß"
          ],
          "answer": "kalt"
        },
        {
          "q": "Was nimmt die Person zusätzlich zum Mantel mit?",
          "o": [
            "einen Regenschirm",
            "einen Mantel",
            "ein Hemd"
          ],
          "answer": "einen Regenschirm"
        }
      ]
    }
  },
  "21": {
    "speakModel": "Wollen wir am Samstag ins Museum gehen? Treffen wir uns um siebzehn Uhr vor dem Museum? Ja, gern.",
    "writeModel": "Ich gehe gern ins Kino. Ich höre gern Musik. Am Wochenende lese ich gern Bücher. Wollen wir am Samstag ins Museum gehen?",
    "hints": [
      [
        "Ich gehe gern ins Kino.",
        "J’aime aller au cinéma."
      ],
      [
        "Ich höre gern Musik.",
        "J’aime écouter de la musique."
      ],
      [
        "Am Wochenende lese ich gern Bücher.",
        "Le week-end, j’aime lire des livres."
      ],
      [
        "Wollen wir am Samstag ins Museum gehen?",
        "On va au musée samedi ?"
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Das Konzert beginnt um zwanzig Uhr. Treffen wir uns um neunzehn Uhr? / Ja, gern.\nWann treffen sich die Personen?",
      "o": [
        "Um neunzehn Uhr.",
        "Um zwanzig Uhr.",
        "Um einundzwanzig Uhr."
      ],
      "a": 0,
      "answer": "Um neunzehn Uhr.",
      "audio": "Die Personen treffen sich um neunzehn Uhr.",
      "explanation": "Le rendez-vous est à dix-neuf heures. Le concert commence une heure plus tard.",
      "type": "choice"
    },
    "review": {
      "text": "Wollen wir am Samstag ins Museum gehen? / Gern. Der Eintritt kostet zwölf Euro. Treffen wir uns um vierzehn Uhr? / Ja, vor dem Museum.",
      "fields": [
        {
          "q": "Wohin gehen sie?",
          "o": [
            "ins Museum",
            "ins Kino",
            "ins Theater"
          ],
          "answer": "ins Museum"
        },
        {
          "q": "Was kostet der Eintritt?",
          "o": [
            "zwölf Euro",
            "zehn Euro",
            "zwanzig Euro"
          ],
          "answer": "zwölf Euro"
        },
        {
          "q": "Wann treffen sie sich?",
          "o": [
            "14:00",
            "15:00",
            "16:00"
          ],
          "answer": "14:00"
        }
      ]
    }
  },
  "22": {
    "speakModel": "Hallo, hier ist Marie. Mein Handy ist kaputt. Bitte rufen Sie mich heute zurück. Meine Telefonnummer ist 030 555 1840. Vielen Dank!",
    "writeModel": "Hallo Anna, treffen wir uns morgen um zehn Uhr vor der Bibliothek? Bitte antworte mir. Viele Grüße, Claire",
    "hints": [
      [
        "Hallo, hier ist Marie.",
        "Allô, ici Marie."
      ],
      [
        "Mein Handy ist kaputt.",
        "Mon téléphone est cassé."
      ],
      [
        "Bitte rufen Sie mich heute zurück.",
        "Rappelez-moi aujourd’hui, s’il vous plaît."
      ],
      [
        "Bitte antworte mir.",
        "Réponds-moi, s’il te plaît."
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Hallo, hier ist Marie. Können Sie mich morgen zurückrufen? / Ja, ich rufe Sie morgen zurück.\nWann soll Marie einen Rückruf bekommen?",
      "o": [
        "Heute.",
        "Morgen.",
        "Gestern."
      ],
      "a": 1,
      "answer": "Morgen.",
      "audio": "Marie bekommt morgen einen Rückruf.",
      "explanation": "Marie demande un rappel demain (morgen), et l’autre personne confirme demain.",
      "type": "choice"
    },
    "review": {
      "text": "Hallo, hier ist Paul. Bitte rufen Sie mich am Dienstag zurück. Meine Nummer ist 030 555 1840.",
      "fields": [
        {
          "q": "Wer spricht?",
          "o": [
            "Paul",
            "Peter",
            "Marie"
          ],
          "answer": "Paul"
        },
        {
          "q": "Wann soll man zurückrufen?",
          "o": [
            "am Dienstag",
            "am Montag",
            "heute"
          ],
          "answer": "am Dienstag"
        },
        {
          "q": "Wie ist die Telefonnummer?",
          "o": [
            "030 555 1840",
            "030 555 1480",
            "030 555 1804"
          ],
          "answer": "030 555 1840"
        }
      ]
    }
  },
  "23": {
    "speakModel": "Guten Tag, ich möchte mich anmelden. Wo bekomme ich das Formular? Was muss ich bei Geburtsort schreiben?",
    "writeModel": "Familienname: Martin\nVorname: Claire\nAdresse: Gartenstraße 12\nGeburtsdatum: 17.04.2000\nTelefonnummer: 030 555 1840",
    "hints": [
      [
        "Familienname / Vorname",
        "Nom de famille / prénom"
      ],
      [
        "Adresse",
        "Adresse"
      ],
      [
        "Geburtsdatum",
        "Date de naissance"
      ],
      [
        "Telefonnummer",
        "Numéro de téléphone"
      ],
      [
        "Was muss ich bei Geburtsort schreiben?",
        "Que dois-je écrire dans la case lieu de naissance ?"
      ]
    ],
    "writingTask": "Lies den Text und fülle das Formular aus: Claire Martin wohnt in der Gartenstraße 12. Sie ist am siebzehnten April zweitausend geboren. Ihre Telefonnummer ist 030 555 1840.",
    "fields": [
      [
        "lastName",
        "Familienname"
      ],
      [
        "firstName",
        "Vorname"
      ],
      [
        "address",
        "Adresse"
      ],
      [
        "birthDate",
        "Geburtsdatum"
      ],
      [
        "phone",
        "Telefonnummer"
      ]
    ],
    "reading": {
      "q": "Lies den Dialog: Was schreibe ich bei Geburtsort? / Schreiben Sie die Stadt. Sie sind dort geboren.\nWas gehört in das Feld Geburtsort?",
      "o": [
        "Die Adresse.",
        "Das Datum.",
        "Die Stadt der Geburt."
      ],
      "a": 2,
      "answer": "Die Stadt der Geburt.",
      "audio": "In das Feld Geburtsort gehört die Stadt der Geburt.",
      "explanation": "Geburtsort est le lieu de naissance : on écrit la ville, pas la date ou l’adresse.",
      "type": "choice"
    },
    "review": {
      "text": "Können Sie mir helfen? / Ja. Bei Familienname schreiben Sie Müller, bei Vorname Anna. Ihr Geburtsdatum ist der siebzehnte April 2000.",
      "fields": [
        {
          "q": "Was ist der Familienname?",
          "o": [
            "Müller",
            "Anna",
            "Martin"
          ],
          "answer": "Müller"
        },
        {
          "q": "Was ist der Vorname?",
          "o": [
            "Anna",
            "Anne",
            "Müller"
          ],
          "answer": "Anna"
        },
        {
          "q": "Was ist das Geburtsdatum?",
          "o": [
            "17.04.2000",
            "07.04.2000",
            "17.07.2000"
          ],
          "answer": "17.04.2000"
        }
      ]
    }
  },
  "24": {
    "speakModel": "Guten Tag! Ich heiße Claire Martin und komme aus Kanada. Ich wohne in Halifax. Ich spreche Französisch und lerne Deutsch. Ich arbeite im Büro. In meiner Freizeit lese ich gern und spiele Fußball. Wie heißen Sie? Wo wohnen Sie? Können Sie mir bitte den Stift geben?",
    "writeModel": "Liebe Anna, vielen Dank für deine Einladung. Ich komme am Samstag um sechs Uhr zu dir. Kann ich einen Kuchen mitbringen? Bitte antworte mir. Viele Grüße, Claire",
    "hints": [
      [
        "Vielen Dank für deine Einladung.",
        "Merci pour ton invitation."
      ],
      [
        "Ich komme am Samstag um sechs Uhr zu dir.",
        "Je viens chez toi samedi à six heures."
      ],
      [
        "Kann ich einen Kuchen mitbringen?",
        "Puis-je apporter un gâteau ?"
      ],
      [
        "Bitte antworte mir.",
        "Réponds-moi, s’il te plaît."
      ],
      [
        "Viele Grüße",
        "Amitiés"
      ]
    ],
    "writingTask": "Écris un message d’environ 30 mots à Anna : remercie-la pour l’invitation, indique quand tu viens et demande si tu peux apporter un gâteau.",
    "minWords": 25,
    "reading": {
      "q": "Lies den Dialog: Vielen Dank für deine Einladung. Ich komme am Samstag um sechs Uhr. Kann ich einen Kuchen mitbringen? / Ja, gern.\nWann kommt die Person?",
      "o": [
        "Am Samstag um sechs Uhr.",
        "Am Sonntag um sechs Uhr.",
        "Am Samstag um sieben Uhr."
      ],
      "a": 0,
      "answer": "Am Samstag um sechs Uhr.",
      "audio": "Die Person kommt am Samstag um sechs Uhr.",
      "explanation": "La personne annonce samedi à six heures : am Samstag um sechs Uhr.",
      "type": "choice"
    },
    "review": {
      "text": "Danke für deine Einladung! Ich komme am Sonntag um achtzehn Uhr. Kann ich Brot mitbringen? / Ja, gern.",
      "fields": [
        {
          "q": "An welchem Tag kommt die Person?",
          "o": [
            "Sonntag",
            "Samstag",
            "Freitag"
          ],
          "answer": "Sonntag"
        },
        {
          "q": "Um wie viel Uhr kommt sie?",
          "o": [
            "18:00",
            "17:00",
            "19:00"
          ],
          "answer": "18:00"
        },
        {
          "q": "Was möchte sie mitbringen?",
          "o": [
            "Brot",
            "einen Kuchen",
            "einen Salat"
          ],
          "answer": "Brot"
        }
      ]
    }
  }
};
