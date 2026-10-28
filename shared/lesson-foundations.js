/* Prerequisites are attached to their learning moment. Lexical notes never generate grammar tasks. */
(() => {
  'use strict';
  const content = {
  "fr": {
    "1": {
      "intro": [],
      "topics": {
        "Grundlagen": [
          {
            "title": [
              "Ein Nomen mit seinem Artikel lernen",
              "Learning a noun with its article"
            ],
            "rule": [
              "Un steht vor einem männlichen, une vor einem weiblichen Nomen. Mehrere werden meist mit des und einem s am Nomen bezeichnet. Die bestimmten Artikel sind le, la und les; vor Vokal oder stummem h steht l’.",
              "Use un before a masculine noun and une before a feminine noun. The plural usually uses des and adds s to the noun. Definite articles are le, la and les; before a vowel or silent h use l’."
            ],
            "examples": [
              [
                "un ami → des amis",
                "ein Freund → Freunde",
                "a friend → friends"
              ],
              [
                "une amie / l’amie",
                "eine Freundin / die Freundin",
                "a friend / the friend (female)"
              ]
            ]
          },
          {
            "title": [
              "Eine Aussage verneinen",
              "Making a statement negative"
            ],
            "rule": [
              "Ne … pas bedeutet nicht. Ne steht vor der Verbform, pas dahinter. Vor einem Vokal wird ne zu n’. Fürs Erste erkennst du damit, ob eine Aussage positiv oder negativ ist.",
              "Ne … pas means not. Put ne before the verb form and pas after it. Before a vowel ne becomes n’. For now, use this pattern to recognise whether a statement is positive or negative."
            ],
            "examples": [
              [
                "Elle va bien. → Elle ne va pas bien.",
                "Ihr geht es gut. → Ihr geht es nicht gut.",
                "She is well. → She is not well."
              ]
            ]
          }
        ],
        "venir": [
          {
            "title": [
              "Die Herkunft als Wendung lernen",
              "Learning origin as a phrase"
            ],
            "rule": [
              "Die Präposition gehört zur Ortsangabe. Bei den ersten Ländern lernst du die ganze Verbindung; die vollständige Regel kommt in Lektion 24.",
              "Learn the preposition together with the place. For these first countries, learn the whole phrase; the full rule comes in lesson 24."
            ],
            "examples": [
              [
                "Je viens de France.",
                "Ich komme aus Frankreich.",
                "I come from France."
              ],
              [
                "Je viens d’Allemagne.",
                "Ich komme aus Deutschland.",
                "I come from Germany."
              ],
              [
                "Je viens du Canada.",
                "Ich komme aus Kanada.",
                "I come from Canada."
              ]
            ]
          }
        ],
        "habiter & parler": [
          {
            "title": [
              "Eine Sprache nennen",
              "Naming a language"
            ],
            "rule": [
              "Nach parler steht die Sprache in diesen Sätzen ohne Artikel. Das gilt auch, wenn du einen Teil mit un peu (ein bisschen) einschränkst.",
              "Use the language without an article after parler in these sentences. This also applies when you add un peu (a little)."
            ],
            "examples": [
              [
                "Je parle allemand et un peu français.",
                "Ich spreche Deutsch und ein bisschen Französisch.",
                "I speak German and a little French."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "un ami",
          "ein Freund",
          "a friend"
        ],
        [
          "une amie",
          "eine Freundin",
          "a friend (female)"
        ],
        [
          "maintenant",
          "jetzt",
          "now"
        ],
        [
          "oui",
          "ja",
          "yes"
        ],
        [
          "non",
          "nein",
          "no"
        ],
        [
          "mon ami",
          "mein Freund",
          "my friend"
        ]
      ]
    },
    "2": {
      "intro": [],
      "topics": {
        "Buchstabieren lassen & nachfragen": [
          {
            "title": [
              "Prüfen, ob Angaben stimmen",
              "Checking information"
            ],
            "rule": [
              "Diese Frage kannst du nach dem Buchstabieren oder nach einer Adresse als ganze Wendung verwenden.",
              "Use this complete question to check information after spelling a name or giving an address."
            ],
            "examples": [
              [
                "Les informations sont correctes ?",
                "Sind die Angaben richtig?",
                "Is the information correct?"
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "écrire",
          "schreiben",
          "to write"
        ],
        [
          "correct / correcte",
          "richtig",
          "correct"
        ]
      ]
    },
    "3": {
      "intro": [
        {
          "title": [
            "Das Alter mit avoir",
            "Age with avoir"
          ],
          "rule": [
            "Im Französischen sagt man das Alter mit avoir (haben). Für ich steht j’ai, für du tu as. Das Wort ans bedeutet hier Jahre.",
            "French uses avoir (to have) for age. Use j’ai for I and tu as for you. Here ans means years."
          ],
          "examples": [
            [
              "J’ai vingt ans.",
              "Ich bin zwanzig Jahre alt.",
              "I am twenty years old."
            ],
            [
              "Tu as trente ans.",
              "Du bist dreißig Jahre alt.",
              "You are thirty years old."
            ]
          ]
        }
      ],
      "topics": {
        "Zahlen bis 100": [
          {
            "title": [
              "Eine Zahl korrigieren",
              "Correcting a number"
            ],
            "rule": [
              "Pas direkt vor einer Zahl bedeutet nicht diese Zahl. So kann jemand eine zuvor genannte Zahl verbessern, ohne einen ganzen verneinten Satz zu wiederholen.",
              "Pas directly before a number rejects that number. A speaker can correct an earlier number this way without repeating a whole negative sentence."
            ],
            "examples": [
              [
                "J’ai vingt-six ans, pas trente-six.",
                "Ich bin sechsundzwanzig, nicht sechsunddreißig.",
                "I am twenty-six, not thirty-six."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "la naissance",
          "die Geburt",
          "birth"
        ],
        [
          "avril",
          "April",
          "April"
        ],
        [
          "mai",
          "Mai",
          "May"
        ],
        [
          "juin",
          "Juni",
          "June"
        ],
        [
          "le code postal",
          "die Postleitzahl",
          "postcode"
        ]
      ]
    },
    "4": {
      "intro": [
        {
          "title": [
            "Eine Uhrzeit angeben",
            "Giving a time"
          ],
          "rule": [
            "Um eine Uhrzeit zu nennen, beginnt der Satz mit il est. Der Zeitpunkt eines Termins steht dagegen mit à.",
            "Use il est to tell the time. Use à to introduce the time of an appointment."
          ],
          "examples": [
            [
              "Il est dix heures.",
              "Es ist zehn Uhr.",
              "It is ten o’clock."
            ],
            [
              "Le cours est à dix heures.",
              "Der Kurs ist um zehn Uhr.",
              "The class is at ten o’clock."
            ]
          ]
        }
      ],
      "topics": {
        "Einen Termin vereinbaren & bestätigen": [
          {
            "title": [
              "Sagen, dass es keinen Termin gibt",
              "Saying there is no appointment"
            ],
            "rule": [
              "Il y a heißt es gibt. Für die Verneinung steht n’ vor y a und pas dahinter. Aus un, une oder des wird dabei de; vor Vokal d’. Nach être bleibt der Artikel dagegen erhalten.",
              "Il y a means there is/are. In the negative put n’ before y a and pas after it. Un, une and des become de, or d’ before a vowel. After être the article stays."
            ],
            "examples": [
              [
                "Il y a un cours. → Il n’y a pas de cours.",
                "Es gibt einen Kurs. → Es gibt keinen Kurs.",
                "There is a class. → There is no class."
              ],
              [
                "Je n’ai pas d’adresse.",
                "Ich habe keine Adresse.",
                "I have no address."
              ],
              [
                "Ce n’est pas un cours.",
                "Das ist kein Kurs.",
                "This is not a class."
              ]
            ]
          }
        ],
        "Uhrzeiten verstehen & sagen": [
          {
            "title": [
              "Eine Zeitspanne angeben",
              "Giving a time range"
            ],
            "rule": [
              "De … à … nennt den Anfang und das Ende einer Zeitspanne. Verwende dabei dieselben Uhrzeiten wie beim Ablesen der Uhr.",
              "De … à … introduces the start and end of a time range. Use the same time expressions as when telling the time."
            ],
            "examples": [
              [
                "de neuf heures à midi",
                "von neun Uhr bis mittags",
                "from nine o’clock until noon"
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "midi",
          "Mittag / 12 Uhr",
          "noon"
        ],
        [
          "minuit",
          "Mitternacht / 0 Uhr",
          "midnight"
        ],
        [
          "libre",
          "verfügbar / frei",
          "available / free"
        ],
        [
          "devant",
          "vor",
          "in front of"
        ],
        [
          "à partir de",
          "ab",
          "from (a starting point)"
        ]
      ]
    },
    "5": {
      "intro": [
        {
          "title": [
            "Mein oder meine?",
            "Saying my"
          ],
          "rule": [
            "Der Begleiter richtet sich nach dem französischen Nomen: vor einem männlichen Nomen steht mon, vor einem weiblichen ma. Mehrere Dinge oder Personen bekommen mes.",
            "The determiner agrees with the French noun: mon before a masculine noun, ma before a feminine noun, mes before a plural noun."
          ],
          "examples": [
            [
              "mon père / ma mère / mes parents",
              "mein Vater / meine Mutter / meine Eltern",
              "my father / my mother / my parents"
            ]
          ]
        }
      ],
      "topics": {
        "C’est / Ce sont": [
          {
            "title": [
              "Eine Person beschreiben",
              "Describing a person"
            ],
            "rule": [
              "Bei marié und divorcé bekommt die weibliche Form ein e. Calme und sympa bleiben im weiblichen Singular dagegen gleich. Lerne neue Beschreibungen deshalb mit ihrer Form für eine Frau und einen Mann.",
              "Marié and divorcé add e in the feminine form. Calme and sympa stay unchanged in the feminine singular. Learn new descriptions with their forms for a woman and a man."
            ],
            "examples": [
              [
                "Il est marié. Elle est mariée.",
                "Er ist verheiratet. Sie ist verheiratet.",
                "He is married. She is married."
              ],
              [
                "Il est calme. Elle est calme.",
                "Er ist ruhig. Sie ist ruhig.",
                "He is calm. She is calm."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "célibataire",
          "ledig",
          "single"
        ],
        [
          "marié / mariée",
          "verheiratet",
          "married"
        ],
        [
          "divorcé / divorcée",
          "geschieden",
          "divorced"
        ],
        [
          "calme",
          "ruhig",
          "calm"
        ],
        [
          "sympa",
          "nett",
          "nice"
        ]
      ]
    },
    "6": {
      "intro": [
        {
          "title": [
            "Eine unbestimmte Menge bestellen",
            "Ordering an unspecified amount"
          ],
          "rule": [
            "Bei Essen und Trinken ohne genaue Menge steht du vor männlichen Nomen und de la vor weiblichen. Vor einem Vokal oder stummen h wird daraus de l’. Das ist der Unterschied zur einzelnen Portion mit un oder une.",
            "Use du before a masculine noun and de la before a feminine noun for food or drink without a specified amount. Before a vowel or silent h, use de l’. A single portion instead uses un or une."
          ],
          "examples": [
            [
              "du lait / de la soupe / de l’eau",
              "Milch / Suppe / Wasser",
              "milk / soup / water"
            ],
            [
              "un café / une salade",
              "ein Kaffee / ein Salat",
              "one coffee / one salad"
            ]
          ]
        }
      ],
      "topics": {
        "Höflich bestellen": [
          {
            "title": [
              "Prendre: nehmen oder bestellen",
              "Prendre: taking or ordering"
            ],
            "rule": [
              "Prendre ist unregelmäßig. Wenn sich die Person ändert, brauchst du diese Formen. Im Restaurant bedeutet prendre häufig bestellen oder nehmen.",
              "Prendre is irregular. These forms change with the subject. In a restaurant prendre often means to order or to have."
            ],
            "examples": [
              [
                "je prends · tu prends · il/elle prend",
                "ich nehme · du nimmst · er/sie nimmt",
                "I take · you take · he/she takes"
              ],
              [
                "nous prenons · vous prenez · ils/elles prennent",
                "wir nehmen · ihr nehmt/Sie nehmen · sie nehmen",
                "we take · you take · they take"
              ]
            ]
          },
          {
            "title": [
              "Möchten Sie …?",
              "Would you like …?"
            ],
            "rule": [
              "Diese Frage ist ein höflicher Baustein im Gespräch mit einem Gast. Die vollständigen vouloir-Formen folgen in Lektion 16.",
              "Use this complete polite question with a guest. The full vouloir forms follow in lesson 16."
            ],
            "examples": [
              [
                "Vous voulez un café ?",
                "Möchten Sie einen Kaffee?",
                "Would you like a coffee?"
              ]
            ]
          }
        ],
        "Teilungsartikel": [
          {
            "title": [
              "Eine Menge verneinen",
              "Negating an amount"
            ],
            "rule": [
              "Die Verneinung aus Lektion 4 gilt auch für Teilungsartikel: Aus du, de la, de l’ oder des wird nach ne … pas meist de, vor Vokal d’.",
              "The negative pattern from lesson 4 also applies to partitive articles: after ne … pas, du, de la, de l’ or des usually becomes de, or d’ before a vowel."
            ],
            "examples": [
              [
                "Je prends du café. → Je ne prends pas de café.",
                "Ich nehme Kaffee. → Ich nehme keinen Kaffee.",
                "I am having coffee. → I am not having coffee."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "préféré / préférée",
          "Lieblings-",
          "favourite"
        ],
        [
          "un dessert",
          "ein Nachtisch",
          "a dessert"
        ],
        [
          "une glace",
          "ein Eis",
          "an ice cream"
        ],
        [
          "sans",
          "ohne",
          "without"
        ]
      ]
    },
    "7": {
      "intro": [
        {
          "title": [
            "Nach einer Mengenangabe",
            "After a quantity"
          ],
          "rule": [
            "Nach einer konkreten Menge steht de ohne zusätzlichen Artikel. Beginnt das nächste Wort mit einem Vokal, wird de zu d’.",
            "Use de without an extra article after a specified quantity. Before a vowel, de becomes d’."
          ],
          "examples": [
            [
              "un kilo de pommes",
              "ein Kilo Äpfel",
              "a kilo of apples"
            ],
            [
              "deux bouteilles d’eau",
              "zwei Flaschen Wasser",
              "two bottles of water"
            ]
          ]
        }
      ],
      "topics": {
        "Nach Preis fragen & bezahlen": [
          {
            "title": [
              "Ein bestimmtes Kleidungsstück zeigen",
              "Pointing to a specific item"
            ],
            "rule": [
              "Ce und cette bedeuten hier dieser oder diese. Die Form richtet sich nach dem Nomen: pantalon ist männlich, taille weiblich. Die vollständige Übersicht folgt in Lektion 13.",
              "Here ce and cette mean this. The form agrees with the noun: pantalon is masculine, taille feminine. The full table follows in lesson 13."
            ],
            "examples": [
              [
                "ce pantalon / cette taille",
                "diese Hose / diese Größe",
                "this pair of trousers / this size"
              ]
            ]
          }
        ],
        "Mengen + de": [
          {
            "title": [
              "Cent mit und ohne s",
              "Cent with and without s"
            ],
            "rule": [
              "Wenn cent vervielfacht wird und am Ende der Zahl steht, erhält es ein s. Folgt noch eine weitere Zahl, bleibt cent ohne s.",
              "Cent takes s when multiplied and at the end of the number. If another number follows, cent stays without s."
            ],
            "examples": [
              [
                "deux cents grammes",
                "zweihundert Gramm",
                "two hundred grams"
              ],
              [
                "six cent cinquante euros",
                "sechshundertfünfzig Euro",
                "six hundred and fifty euros"
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "par carte",
          "mit Karte",
          "by card"
        ],
        [
          "en espèces",
          "bar / in bar",
          "in cash"
        ],
        [
          "la taille",
          "die Größe",
          "size"
        ],
        [
          "payer",
          "bezahlen",
          "to pay"
        ]
      ]
    },
    "8": {
      "intro": [
        {
          "title": [
            "Sagen, was es gibt",
            "Saying what there is"
          ],
          "rule": [
            "Il y a bedeutet es gibt. Die Wendung bleibt gleich, ob du eine oder mehrere Sachen nennst.",
            "Il y a means there is or there are. This phrase stays the same for one thing or several things."
          ],
          "examples": [
            [
              "Dans la chambre, il y a un lit.",
              "Im Schlafzimmer gibt es ein Bett.",
              "There is a bed in the bedroom."
            ]
          ]
        }
      ],
      "topics": {
        "Räume & il y a": [
          {
            "title": [
              "Die Verneinung aus Lektion 4 anwenden",
              "Applying the negative from lesson 4"
            ],
            "rule": [
              "Für eine fehlende Ausstattung verwendest du dieselbe Form wie für einen ausfallenden Kurs: il n’y a pas de + Nomen. Mais verbindet hier vorhandene und fehlende Ausstattung.",
              "For a missing feature use the pattern you learned for a class that is not available: il n’y a pas de + noun. Here mais links a feature that exists with one that does not."
            ],
            "examples": [
              [
                "Il y a un jardin, mais il n’y a pas de balcon.",
                "Es gibt einen Garten, aber keinen Balkon.",
                "There is a garden, but there is no balcony."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "derrière",
          "hinter",
          "behind"
        ],
        [
          "une pièce",
          "ein Zimmer",
          "a room"
        ],
        [
          "une chambre",
          "ein Schlafzimmer",
          "a bedroom"
        ],
        [
          "le loyer",
          "die Miete",
          "rent"
        ],
        [
          "par mois",
          "pro Monat",
          "per month"
        ],
        [
          "visiter",
          "besichtigen / besuchen",
          "to view / to visit"
        ]
      ]
    },
    "9": {
      "intro": [],
      "topics": {
        "Orte erfragen": [
          {
            "title": [
              "Nach dem passenden Verkehrsmittel fragen",
              "Asking which transport to take"
            ],
            "rule": [
              "In einer Wegauskunft kannst du diese Frage als ganzen Baustein verstehen. Faut-il prendre heißt hier muss man nehmen; die allgemeine Regel zu il faut folgt in Lektion 20.",
              "In directions, learn this question as a complete phrase. Here faut-il prendre means should one take; the general il faut rule follows in lesson 20."
            ],
            "examples": [
              [
                "Quel bus faut-il prendre ?",
                "Welchen Bus muss man nehmen?",
                "Which bus should one take?"
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "un quai",
          "ein Bahnsteig",
          "a platform"
        ],
        [
          "un arrêt de bus",
          "eine Bushaltestelle",
          "a bus stop"
        ],
        [
          "à pied",
          "zu Fuß",
          "on foot"
        ],
        [
          "le retard",
          "die Verspätung",
          "delay"
        ],
        [
          "puis",
          "dann",
          "then"
        ]
      ]
    },
    "10": {
      "intro": [],
      "topics": {
        "Beruf & Studium": [
          {
            "title": [
              "Eine Pflicht nennen",
              "Stating an obligation"
            ],
            "rule": [
              "Die Wendung je dois faire mes devoirs bedeutet ich muss Hausaufgaben machen. Lerne sie hier als ganzen Baustein; die vollständigen devoir-Formen folgen in Lektion 24.",
              "Learn je dois faire mes devoirs as the complete phrase I must do my homework. The full devoir forms follow in lesson 24."
            ],
            "examples": [
              [
                "Je dois faire mes devoirs.",
                "Ich muss meine Hausaufgaben machen.",
                "I must do my homework."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "étudier",
          "lernen / studieren",
          "to study"
        ],
        [
          "les devoirs",
          "die Hausaufgaben",
          "homework"
        ],
        [
          "le métier",
          "der Beruf",
          "profession"
        ]
      ]
    },
    "11": {
      "intro": [
        {
          "title": [
            "Bei se lever gehört me dazu",
            "Me is part of se lever"
          ],
          "rule": [
            "Se lever heißt aufstehen. Wenn du über dich selbst sprichst, heißt es je me lève: me gehört hier zum Verb und steht zwischen je und lève.",
            "Se lever means to get up. For yourself use je me lève: me is part of the construction and comes between je and lève."
          ],
          "examples": [
            [
              "Je me lève à sept heures.",
              "Ich stehe um sieben Uhr auf.",
              "I get up at seven o’clock."
            ]
          ]
        }
      ],
      "topics": {
        "se lever": [
          {
            "title": [
              "Se coucher: das gleiche Reflexivmuster",
              "Se coucher: the same reflexive pattern"
            ],
            "rule": [
              "Se coucher bedeutet ins Bett gehen. Wie bei se lever gehört das Pronomen me zur Form für ich.",
              "Se coucher means to go to bed. As with se lever, me is part of the form for I."
            ],
            "examples": [
              [
                "Je me couche à vingt-trois heures.",
                "Ich gehe um 23 Uhr ins Bett.",
                "I go to bed at eleven p.m."
              ]
            ]
          }
        ],
        "Zeit- und Reihenfolgewörter": [
          {
            "title": [
              "Losgehen und zur Arbeit fahren",
              "Leaving and going to work"
            ],
            "rule": [
              "Für deinen Tagesablauf kannst du diese beiden Wendungen als ganze Bausteine verwenden. Die genaue Uhrzeit ergänzt du mit à.",
              "Use these two complete phrases for your routine. Add a specific time with à."
            ],
            "examples": [
              [
                "Je pars à huit heures.",
                "Ich gehe um acht Uhr los.",
                "I leave at eight o’clock."
              ],
              [
                "Je vais au travail.",
                "Ich gehe/fahre zur Arbeit.",
                "I go to work."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "tôt",
          "früh",
          "early"
        ],
        [
          "d’habitude",
          "gewöhnlich",
          "usually"
        ],
        [
          "d’abord",
          "zuerst",
          "first"
        ],
        [
          "ensuite",
          "danach",
          "then"
        ],
        [
          "enfin",
          "schließlich",
          "finally"
        ],
        [
          "se coucher",
          "ins Bett gehen",
          "to go to bed"
        ]
      ]
    },
    "12": {
      "intro": [],
      "topics": {},
      "words": [
        [
          "chez",
          "bei einer Person",
          "at someone’s home or premises"
        ],
        [
          "contre",
          "gegen",
          "against"
        ],
        [
          "deux fois par jour",
          "zweimal täglich",
          "twice a day"
        ],
        [
          "pendant trois jours",
          "drei Tage lang",
          "for three days"
        ]
      ]
    },
    "13": {
      "intro": [
        {
          "title": [
            "Dieses Kleid",
            "This dress"
          ],
          "rule": [
            "Vor einem weiblichen Nomen wie robe oder veste steht cette für diese. Die anderen Formen lernst du in der Vertiefung.",
            "Use cette for this before a feminine noun such as robe or veste. The other forms follow in the grammar section."
          ],
          "examples": [
            [
              "Je voudrais cette robe.",
              "Ich möchte dieses Kleid.",
              "I would like this dress."
            ]
          ]
        },
        {
          "title": [
            "Das Wetter morgen",
            "Tomorrow’s weather"
          ],
          "rule": [
            "Für einen Wetterausblick verwendest du il va + Grundform. Bei faire ergibt das il va faire.",
            "Use il va + infinitive for a weather forecast. With faire this gives il va faire."
          ],
          "examples": [
            [
              "Demain, il va faire vingt degrés.",
              "Morgen wird es zwanzig Grad.",
              "It will be twenty degrees tomorrow."
            ]
          ]
        }
      ],
      "topics": {
        "Wetter & Jahreszeiten": [
          {
            "title": [
              "Il va mit anderen Grundformen verbinden",
              "Using il va with other infinitives"
            ],
            "rule": [
              "Im Einstieg hast du il va faire für das Wetter morgen kennengelernt. Das gleiche Muster funktioniert mit y avoir (es geben): Die Wortgruppe bleibt nach va unverändert.",
              "The introduction used il va faire for tomorrow’s weather. The same pattern works with y avoir (there to be): keep that phrase unchanged after va."
            ],
            "examples": [
              [
                "Il va y avoir du vent.",
                "Es wird Wind geben.",
                "It is going to be windy."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "le printemps",
          "der Frühling",
          "spring"
        ],
        [
          "l’été",
          "der Sommer",
          "summer"
        ],
        [
          "l’automne",
          "der Herbst",
          "autumn"
        ],
        [
          "l’hiver",
          "der Winter",
          "winter"
        ],
        [
          "un parapluie",
          "ein Regenschirm",
          "an umbrella"
        ]
      ]
    },
    "14": {
      "intro": [
        {
          "title": [
            "Sport treiben mit faire",
            "Doing sport with faire"
          ],
          "rule": [
            "Faire ist unregelmäßig. Für ich heißt es je fais; für Sie oder ihr heißt es vous faites. Faire du sport ist die Wendung für Sport treiben.",
            "Faire is irregular. Use je fais for I and vous faites for formal or plural you. Faire du sport means to do sport."
          ],
          "examples": [
            [
              "Je fais du sport.",
              "Ich treibe Sport.",
              "I do sport."
            ],
            [
              "Vous faites du sport ?",
              "Treiben Sie Sport? / Treibt ihr Sport?",
              "Do you do sport?"
            ]
          ]
        }
      ],
      "topics": {
        "Aktivitäten & Vorlieben": [
          {
            "title": [
              "Die weiteren Formen von faire",
              "The other forms of faire"
            ],
            "rule": [
              "Je fais und vous faites kennst du aus dem Einstieg. Für andere Personen brauchst du die übrigen Formen; diese sind unregelmäßig.",
              "The introduction used je fais and vous faites. Other subjects need these forms; faire is irregular."
            ],
            "examples": [
              [
                "je fais · tu fais · il/elle fait",
                "ich mache · du machst · er/sie macht",
                "I do · you do · he/she does"
              ],
              [
                "nous faisons · vous faites · ils/elles font",
                "wir machen · ihr macht/Sie machen · sie machen",
                "we do · you do · they do"
              ]
            ]
          },
          {
            "title": [
              "Der Akzent bei préférer",
              "The accent in préférer"
            ],
            "rule": [
              "Der Stamm hat bei je, tu, il/elle und ils/elles ein è. Nur bei nous und vous bleibt é. Die Personenendungen entsprechen den bekannten -er-Endungen.",
              "The stem has è with je, tu, il/elle and ils/elles. Nous and vous keep é. The person endings follow the familiar -er pattern."
            ],
            "examples": [
              [
                "je préfère · tu préfères · il/elle préfère",
                "ich bevorzuge · du bevorzugst · er/sie bevorzugt",
                "I prefer · you prefer · he/she prefers"
              ],
              [
                "nous préférons · vous préférez · ils/elles préfèrent",
                "wir bevorzugen · ihr bevorzugt/Sie bevorzugen · sie bevorzugen",
                "we prefer · you prefer · they prefer"
              ]
            ]
          }
        ],
        "Fragen & Wochenende beschreiben": [
          {
            "title": [
              "Mit on eine Aktivität vorschlagen",
              "Suggesting an activity with on"
            ],
            "rule": [
              "On bedeutet im Alltag oft wir, verwendet aber die Verbform der dritten Person Einzahl. On va … ? ist deshalb ein einfacher Vorschlag an eine andere Person.",
              "In everyday speech on often means we but takes a third-person singular verb. On va … ? is a simple way to suggest an activity."
            ],
            "examples": [
              [
                "On va au cinéma samedi ?",
                "Gehen wir am Samstag ins Kino?",
                "Shall we go to the cinema on Saturday?"
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "faire du sport",
          "Sport treiben",
          "to do sport"
        ],
        [
          "préférer",
          "bevorzugen / lieber mögen",
          "to prefer"
        ]
      ]
    },
    "15": {
      "intro": [
        {
          "title": [
            "Einen Plan ausdrücken",
            "Expressing a plan"
          ],
          "rule": [
            "Ein Plan besteht aus einer Form von aller und einem zweiten Verb in der Grundform. Für ich verwendest du je vais.",
            "A plan uses a form of aller followed by another verb in the infinitive. For I use je vais."
          ],
          "examples": [
            [
              "Demain, je vais visiter Paris.",
              "Morgen werde ich Paris besuchen.",
              "I am going to visit Paris tomorrow."
            ]
          ]
        }
      ],
      "topics": {},
      "words": [
        [
          "une nuit",
          "eine Nacht / Übernachtung",
          "a night"
        ],
        [
          "inclus / incluse",
          "inbegriffen",
          "included"
        ],
        [
          "un aller simple",
          "eine einfache Fahrt",
          "a one-way ticket"
        ],
        [
          "un aller-retour",
          "eine Hin- und Rückfahrt",
          "a return ticket"
        ]
      ]
    },
    "16": {
      "intro": [],
      "topics": {
        "pouvoir": [
          {
            "title": [
              "Wollen und können unterscheiden",
              "Distinguishing want and can"
            ],
            "rule": [
              "Die Einladung Tu veux … ? verwendet vouloir (wollen), nicht pouvoir (können). Beide Verben stehen hier mit einem zweiten Verb in der Grundform.",
              "The invitation Tu veux … ? uses vouloir (want), not pouvoir (can). Here both verbs are followed by another verb in the infinitive."
            ],
            "examples": [
              [
                "je veux · tu veux · il/elle veut",
                "ich will · du willst · er/sie will",
                "I want · you want · he/she wants"
              ],
              [
                "nous voulons · vous voulez · ils/elles veulent",
                "wir wollen · ihr wollt/Sie wollen · sie wollen",
                "we want · you want · they want"
              ],
              [
                "Tu veux venir ? Je peux venir.",
                "Willst du kommen? Ich kann kommen.",
                "Do you want to come? I can come."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "apporter",
          "mitbringen",
          "to bring"
        ],
        [
          "reporter",
          "verschieben",
          "to postpone"
        ],
        [
          "rappeler",
          "zurückrufen",
          "to call back"
        ],
        [
          "désolé / désolée",
          "entschuldigt / tut mir leid",
          "sorry"
        ]
      ]
    },
    "17": {
      "intro": [
        {
          "title": [
            "Nach einer Angabe fragen",
            "Asking for information"
          ],
          "rule": [
            "Quel richtet sich nach dem erfragten Nomen. Adresse ist weiblich: Deshalb beginnt die Frage mit quelle. Bei einem männlichen Nomen steht quel.",
            "Quel agrees with the noun you ask about. Adresse is feminine, so the question begins with quelle. Use quel with a masculine noun."
          ],
          "examples": [
            [
              "Quelle est votre adresse ?",
              "Wie lautet Ihre Adresse?",
              "What is your address?"
            ],
            [
              "Quel est votre prénom ?",
              "Wie lautet Ihr Vorname?",
              "What is your first name?"
            ]
          ]
        }
      ],
      "topics": {
        "Formularfelder verstehen": [
          {
            "title": [
              "Quel auch im Plural verwenden",
              "Using quel in the plural"
            ],
            "rule": [
              "Bei mehreren Angaben steht quels vor männlichen oder gemischten Nomen und quelles vor weiblichen. Weil es mehrere sind, heißt es sont statt est.",
              "For several items use quels with masculine or mixed nouns and quelles with feminine nouns. The plural uses sont instead of est."
            ],
            "examples": [
              [
                "Quels sont les horaires ?",
                "Wie sind die Unterrichtszeiten?",
                "What are the class times?"
              ],
              [
                "Quelles sont les dates ?",
                "Welche Termine gibt es?",
                "What are the dates?"
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "les horaires",
          "die Unterrichts- / Öffnungszeiten",
          "class times / opening hours"
        ],
        [
          "la signature",
          "die Unterschrift",
          "signature"
        ],
        [
          "en bas",
          "unten",
          "at the bottom"
        ],
        [
          "répondre",
          "antworten",
          "to reply"
        ],
        [
          "le courriel",
          "die E-Mail",
          "email"
        ]
      ]
    },
    "18": {
      "intro": [],
      "topics": {},
      "words": [
        [
          "comprendre",
          "verstehen",
          "to understand"
        ],
        [
          "expliquer",
          "erklären",
          "to explain"
        ],
        [
          "dernier / dernière",
          "letzter / letzte",
          "last"
        ],
        [
          "d’avance",
          "im Voraus",
          "in advance"
        ]
      ]
    },
    "19": {
      "intro": [],
      "topics": {
        "Pluralregeln": [
          {
            "title": [
              "Nomen, die im Plural gleich bleiben",
              "Nouns with an unchanged plural"
            ],
            "rule": [
              "Endet ein Nomen schon auf s, x oder z, kommt kein weiteres s hinzu. Am Artikel erkennst du, ob Einzahl oder Mehrzahl gemeint ist.",
              "A noun already ending in s, x or z does not add another s. Its article shows whether it is singular or plural."
            ],
            "examples": [
              [
                "un prix → des prix",
                "ein Preis → Preise",
                "a price → prices"
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "un prix",
          "ein Preis",
          "a price"
        ],
        [
          "une clé",
          "ein Schlüssel",
          "a key"
        ]
      ]
    },
    "20": {
      "intro": [],
      "topics": {},
      "words": [
        [
          "doucement",
          "leise / sanft",
          "quietly / gently"
        ],
        [
          "dehors",
          "draußen",
          "outside"
        ],
        [
          "réserver",
          "reservieren",
          "to reserve"
        ]
      ]
    },
    "21": {
      "intro": [],
      "topics": {},
      "words": [
        [
          "combien",
          "wie viel / wie viele",
          "how much / how many"
        ],
        [
          "pourquoi",
          "warum",
          "why"
        ]
      ]
    },
    "22": {
      "intro": [
        {
          "title": [
            "Über etwas Abgeschlossenes sprechen",
            "Talking about a completed action"
          ],
          "rule": [
            "Das passé composé braucht hier eine Form von avoir und ein Partizip. Bei regelmäßigen -er-Verben ersetzt -é die Endung -er. Mit nous steht avons; mit je heißt es j’ai.",
            "Here the passé composé uses a form of avoir and a past participle. Regular -er verbs replace -er with -é. Use avons with nous and j’ai with je."
          ],
          "examples": [
            [
              "visiter → visité",
              "besuchen → besucht",
              "visit → visited"
            ],
            [
              "J’ai visité Lyon. Nous avons visité Paris.",
              "Ich habe Lyon besucht. Wir haben Paris besucht.",
              "I visited Lyon. We visited Paris."
            ]
          ]
        }
      ],
      "topics": {
        "Passé composé mit avoir": [
          {
            "title": [
              "Zwei unregelmäßige Partizipien",
              "Two irregular past participles"
            ],
            "rule": [
              "Nicht jedes Partizip endet auf -é. Prendre hat pris, faire hat fait. Die Form von avoir zeigt weiterhin die Person.",
              "Not every past participle ends in -é. Prendre has pris and faire has fait. The form of avoir still indicates the subject."
            ],
            "examples": [
              [
                "J’ai pris le bus.",
                "Ich habe den Bus genommen.",
                "I took the bus."
              ],
              [
                "Tu as fait quoi hier ?",
                "Was hast du gestern gemacht?",
                "What did you do yesterday?"
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "prendre",
          "nehmen",
          "to take"
        ],
        [
          "faire",
          "machen",
          "to do"
        ]
      ]
    },
    "23": {
      "intro": [],
      "topics": {},
      "words": [
        [
          "la farine",
          "das Mehl",
          "flour"
        ],
        [
          "le lait",
          "die Milch",
          "milk"
        ],
        [
          "un œuf",
          "ein Ei",
          "an egg"
        ],
        [
          "une carotte",
          "eine Karotte",
          "a carrot"
        ],
        [
          "une pomme de terre",
          "eine Kartoffel",
          "a potato"
        ],
        [
          "les légumes",
          "das Gemüse",
          "vegetables"
        ],
        [
          "le sel",
          "das Salz",
          "salt"
        ],
        [
          "un couteau",
          "ein Messer",
          "a knife"
        ],
        [
          "une cuillère",
          "ein Löffel",
          "a spoon"
        ],
        [
          "couper",
          "schneiden",
          "to cut"
        ],
        [
          "ajouter",
          "hinzufügen",
          "to add"
        ],
        [
          "mélanger",
          "mischen / verrühren",
          "to mix"
        ]
      ]
    },
    "24": {
      "intro": [
        {
          "title": [
            "Ein Reiseziel nennen",
            "Naming a destination"
          ],
          "rule": [
            "Eine Stadt steht mit à. Bei Ländern lernst du die passende Verbindung mit: en France, au Canada, aux États-Unis. Die ausführliche Länderregel folgt in der Vertiefung.",
            "Use à with a city. Learn countries with their destination phrase: en France, au Canada, aux États-Unis. The full country rule follows in the grammar section."
          ],
          "examples": [
            [
              "Je vais à Lyon. Je vais au Canada.",
              "Ich fahre nach Lyon. Ich fahre nach Kanada.",
              "I am going to Lyon. I am going to Canada."
            ]
          ]
        }
      ],
      "topics": {
        "Eine Reisenachricht aufbauen": [
          {
            "title": [
              "Partir: abfahren oder losgehen",
              "Partir: leaving"
            ],
            "rule": [
              "Partir ist unregelmäßig. Rester und rentrer verwendest du dagegen mit den bekannten -er-Endungen. So kannst du Abreise, Aufenthalt und Rückkehr getrennt beschreiben.",
              "Partir is irregular. Rester and rentrer use the familiar -er endings. This lets you describe departure, a stay and return separately."
            ],
            "examples": [
              [
                "je pars · tu pars · il/elle part",
                "ich fahre ab · du fährst ab · er/sie fährt ab",
                "I leave · you leave · he/she leaves"
              ],
              [
                "nous partons · vous partez · ils/elles partent",
                "wir fahren ab · ihr fahrt ab/Sie fahren ab · sie fahren ab",
                "we leave · you leave · they leave"
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "partir",
          "abfahren / losgehen",
          "to leave"
        ],
        [
          "rester",
          "bleiben",
          "to stay"
        ],
        [
          "rentrer",
          "zurückkommen",
          "to return"
        ]
      ]
    }
  },
  "de": {
    "1": {
      "intro": [],
      "topics": {
        "Poser les premières questions": [
          {
            "title": "Répondre avec oui ou non",
            "rule": "Dans une question sans mot interrogatif, le verbe vient avant le sujet. Nein signifie non. Pour rendre la réponse négative, utilise nicht; sa place dépend ici de ce que tu nies.",
            "examples": [
              [
                "Wohnen Sie in Paris? — Nein, ich wohne nicht in Paris.",
                "Habitez-vous à Paris ? — Non, je n’habite pas à Paris."
              ]
            ]
          },
          {
            "title": "Vous : Sie ou Ihnen ?",
            "rule": "Sie est la forme de politesse. Dans la formule Wie geht es Ihnen?, Ihnen désigne aussi la personne à qui tu parles : c’est le pronom au datif, pas un possessif. Apprends cette question comme un bloc; la traduction française ne montre pas ce changement.",
            "examples": [
              [
                "Wie geht es Ihnen? — Gut, danke.",
                "Comment allez-vous ? — Bien, merci."
              ]
            ]
          }
        ],
        "sein": [
          {
            "title": "Être à la maison",
            "rule": "Zu Hause (aussi zuhause) indique le lieu où l’on est : à la maison. Apprends les deux mots ensemble.",
            "examples": [
              [
                "Ich bin zu Hause.",
                "Je suis à la maison."
              ]
            ]
          },
          {
            "title": "Dire son âge",
            "rule": "Pour l’âge, l’allemand utilise sein, pas haben : Ich bin … Jahre alt. Le français utilise avoir. Le nombre change, mais le modèle reste le même.",
            "examples": [
              [
                "Ich bin dreißig Jahre alt.",
                "J’ai trente ans."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "ein bisschen",
          "un peu"
        ],
        [
          "nicht",
          "ne … pas"
        ],
        [
          "zu Hause",
          "à la maison (lieu)"
        ]
      ]
    },
    "2": {
      "intro": [],
      "topics": {
        "Lettres et signes": [
          {
            "title": "Man et mit einem Punkt",
            "rule": "Man signifie on; ce n’est pas Mann (= homme). Avec mit, l’article est au datif : ein Punkt devient einem Punkt. Apprends ici mit einem Punkt comme un groupe; mit Umlaut et mit Bindestrich sont des indications abrégées sans article.",
            "examples": [
              [
                "Anna schreibt man mit Doppel-n.",
                "Anna s’écrit avec deux n."
              ],
              [
                "mit einem Punkt",
                "avec un point"
              ]
            ]
          }
        ],
        "Faire épeler et répéter": [
          {
            "title": "Den Namen : article et terminaison",
            "rule": "Den est ici un article défini à l’accusatif, pas un possessif : il marque ce qu’on écrit ou épelle. Der Name devient den Namen; ce nom prend aussi -n. Retenir ce groupe suffit ici. Mein Name (= mon nom) et Ihr Name (= votre nom, politesse) contiennent, eux, un possessif.",
            "examples": [
              [
                "der Name → den Namen",
                "le nom → le nom (objet direct)"
              ],
              [
                "Ich kann den Namen buchstabieren.",
                "Je peux épeler le nom."
              ]
            ]
          },
          {
            "title": "Das peut remplacer un mot",
            "rule": "Dans Können Sie das buchstabieren?, das signifie cela : il remplace le nom ou le mot déjà mentionné. Ce n’est pas l’article placé devant un nom. Bitte rend la demande polie.",
            "examples": [
              [
                "Können Sie das bitte buchstabieren?",
                "Pouvez-vous épeler cela, s’il vous plaît ?"
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "der Umlaut",
          "le tréma allemand"
        ],
        [
          "der Bindestrich",
          "le trait d’union"
        ],
        [
          "Doppel-n",
          "deux n"
        ],
        [
          "langsamer",
          "plus lentement"
        ]
      ]
    },
    "3": {
      "intro": [],
      "topics": {
        "Dates et coordonnées": [
          {
            "title": "Lire un jour dans une date",
            "rule": "Pour les jours 1–19, ajoute généralement -te au nombre; les exceptions utiles sont erste, dritte et siebte. À partir de 20, ajoute -ste. Après am, la terminaison devient -ten ou -sten. Pour une année 19xx, dis neunzehnhundert puis les deux derniers chiffres.",
            "examples": [
              [
                "der dritte April → am dritten April",
                "le trois avril → le trois avril (dans une phrase avec am)"
              ],
              [
                "der siebzehnte April → am siebzehnten April",
                "le dix-sept avril → le dix-sept avril (avec am)"
              ],
              [
                "neunzehnhundertsechsundneunzig",
                "mille neuf cent quatre-vingt-seize"
              ]
            ]
          },
          {
            "title": "Nommer sa date de naissance",
            "rule": "Dans Ich bin am … geboren, bin … geboren signifie je suis né(e). Apprends cette formule pour ta date de naissance; tu n’as pas à construire une nouvelle conjugaison ici.",
            "examples": [
              [
                "Ich bin am siebzehnten April geboren.",
                "Je suis né(e) le dix-sept avril."
              ]
            ]
          }
        ],
        "Construire les nombres": [
          {
            "title": "Construire les centaines",
            "rule": "Pour plusieurs centaines, place le nombre devant hundert. Le tout s’écrit en un mot. Cette construction servira aussi pour les loyers et les prix.",
            "examples": [
              [
                "zweihundert · sechshundert · sechshundertfünfzig",
                "deux cents · six cents · six cent cinquante"
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "die Postleitzahl",
          "le code postal"
        ],
        [
          "der Geburtsort",
          "le lieu de naissance"
        ],
        [
          "das Geburtsdatum",
          "la date de naissance"
        ],
        [
          "zweitausend",
          "deux mille"
        ]
      ]
    },
    "4": {
      "intro": [],
      "topics": {
        "Fixer un rendez-vous": [
          {
            "title": "Dire que l’on n’est pas disponible",
            "rule": "Nicht nie ici la possibilité de venir. Kein/keine nie un nom sans article défini. Zeit est féminin : utilise keine Zeit pour dire que tu n’as pas le temps.",
            "examples": [
              [
                "Ich kann nicht kommen.",
                "Je ne peux pas venir."
              ],
              [
                "Ich habe keine Zeit.",
                "Je n’ai pas le temps."
              ]
            ]
          },
          {
            "title": "Une proposition de rencontre",
            "rule": "Treffen est ici employé avec uns pour parler d’une rencontre ensemble. Ich möchte dich treffen est une autre phrase utile pour proposer de voir quelqu’un.",
            "examples": [
              [
                "Wir treffen uns vor der Bibliothek.",
                "Nous nous retrouvons devant la bibliothèque."
              ],
              [
                "Ich möchte dich treffen.",
                "Je voudrais te voir."
              ]
            ]
          }
        ],
        "Mois et dates": [
          {
            "title": "Am, im et zum sont des contractions",
            "rule": "Am = an dem, im = in dem, vom = von dem et zum = zu dem. Pour les dates de cette leçon, retiens les groupes entiers : am + jour ou date, im + mois, vom … bis zum … pour une période. Les terminaisons après ces petits mots ne se déduisent pas de la traduction française.",
            "examples": [
              [
                "im April · am siebzehnten April",
                "en avril · le dix-sept avril"
              ],
              [
                "vom ersten bis zum dritten August",
                "du premier au trois août"
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "die Zeit",
          "le temps (disponible)"
        ],
        [
          "die Bibliothek",
          "la bibliothèque"
        ]
      ]
    },
    "5": {
      "intro": [],
      "topics": {
        "Présenter sa famille": [
          {
            "title": "Dire avec ma femme",
            "rule": "Mit demande le datif. Dans ce groupe féminin, meine devient meiner. Apprends la préposition et le groupe ensemble; ce n’est pas la règle de l’accusatif après haben.",
            "examples": [
              [
                "Ich wohne mit meiner Frau in Bonn.",
                "J’habite à Bonn avec ma femme."
              ]
            ]
          },
          {
            "title": "Le possesseur et le nom jouent deux rôles différents",
            "rule": "Mein indique que la personne ou la chose est à moi; la terminaison dépend du nom et de sa fonction. Mein Vater et meine Mutter signifient mon père et ma mère, quel que soit le genre de la personne qui parle. Après haben, mein Vater devient meinen Vater : le nom est l’objet direct.",
            "examples": [
              [
                "mein Vater · meine Mutter · meine Eltern",
                "mon père · ma mère · mes parents"
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "ledig",
          "célibataire"
        ],
        [
          "verheiratet",
          "marié(e)"
        ],
        [
          "geschieden",
          "divorcé(e)"
        ]
      ]
    },
    "6": {
      "intro": [],
      "topics": {
        "Commander un repas": [
          {
            "title": "Une demande pour plusieurs personnes",
            "rule": "Les demandes polies changent avec la personne. Ces formes sont ici des blocs pour commander; tu n’as pas besoin de former le conditionnel de tous les verbes.",
            "examples": [
              [
                "ich hätte · du hättest · er/sie hätte",
                "je voudrais · tu voudrais · il/elle voudrait"
              ],
              [
                "wir hätten · ihr hättet · sie/Sie hätten",
                "nous voudrions · vous voudriez (proches) · ils/elles voudraient / vous voudriez (politesse)"
              ],
              [
                "ich möchte · du möchtest · er/sie möchte",
                "je voudrais · tu voudrais · il/elle voudrait"
              ],
              [
                "wir möchten · ihr möchtet · sie/Sie möchten",
                "nous voudrions · vous voudriez (proches) · ils/elles voudraient / vous voudriez (politesse)"
              ],
              [
                "Wir hätten gern zwei Kaffees.",
                "Nous voudrions deux cafés."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "bezahlen",
          "payer"
        ],
        [
          "zusammen",
          "ensemble / au total"
        ],
        [
          "das Frühstück",
          "le petit-déjeuner"
        ]
      ]
    },
    "7": {
      "intro": [],
      "topics": {
        "Trouver un article": [
          {
            "title": "Distinguer deux articles par leur couleur",
            "rule": "Devant Jacke, les couleurs sont ici rote et blaue. Si Jacke vient d’être nommé, tu peux ensuite omettre le nom : die rote ou die blaue désigne toujours la veste.",
            "examples": [
              [
                "Die rote Jacke ist zu teuer. Ich nehme die blaue.",
                "La veste rouge est trop chère. Je prends la bleue."
              ]
            ]
          },
          {
            "title": "Zu devant un adjectif",
            "rule": "Dans zu teuer, zu klein ou zu groß, zu signifie trop. Ici, il ne désigne pas une destination. Apprends le sens du groupe : ce petit mot n’a pas toujours la même traduction.",
            "examples": [
              [
                "Das ist zu teuer.",
                "C’est trop cher."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "rot",
          "rouge"
        ],
        [
          "blau",
          "bleu"
        ],
        [
          "zu teuer",
          "trop cher"
        ],
        [
          "die Größe",
          "la taille"
        ]
      ]
    },
    "8": {
      "intro": [],
      "topics": {
        "Décrire un logement": [
          {
            "title": "Dire ce qui manque",
            "rule": "Pour nier un nom sans article défini, utilise kein. La forme change avec le nom et sa fonction : au nominatif masculin, kein Balkon; après hat, keinen Balkon. Au féminin, utilise keine; au neutre, kein.",
            "examples": [
              [
                "Die Wohnung hat einen Balkon. → Die Wohnung hat keinen Balkon.",
                "L’appartement a un balcon. → L’appartement n’a pas de balcon."
              ],
              [
                "Die Wohnung hat keine Küche und kein Bad.",
                "L’appartement n’a ni cuisine ni salle de bains."
              ]
            ]
          },
          {
            "title": "Après mit au pluriel",
            "rule": "Mit demande le datif. Au pluriel, Zimmer reçoit ici un n; la forme à apprendre est mit zwei Zimmern.",
            "examples": [
              [
                "Ich suche eine Wohnung mit zwei Zimmern.",
                "Je cherche un appartement de deux pièces."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "die Besichtigung",
          "la visite (d’un logement)"
        ],
        [
          "die Nebenkosten",
          "les charges"
        ],
        [
          "frei",
          "disponible (pour un logement)"
        ]
      ]
    },
    "9": {
      "intro": [],
      "topics": {
        "Expliquer un chemin": [
          {
            "title": "À un proche : Geh ou Nimm",
            "rule": "Gehen Sie et Nehmen Sie sont des consignes polies. Avec un proche, utilise Geh et Nimm, sans du. Nimm est la forme irrégulière de nehmen pour cette consigne. Pour mitbringen (apporter), mit reste à la fin. Garde la même forme d’adresse pendant l’échange.",
            "examples": [
              [
                "Gehen Sie geradeaus. → Geh geradeaus.",
                "Allez tout droit. → Va tout droit."
              ],
              [
                "Nehmen Sie den Bus. → Nimm den Bus.",
                "Prenez le bus. → Prends le bus."
              ],
              [
                "Bring bitte Wasser mit.",
                "Apporte de l’eau, s’il te plaît."
              ]
            ]
          },
          {
            "title": "Zum et zur : une destination",
            "rule": "Avec un nom, zu peut indiquer une destination. Zu + dem devient zum (masculin ou neutre), zu + der devient zur (féminin). Zu Hause reste une expression fixe pour le lieu où l’on est.",
            "examples": [
              [
                "Ich gehe zum Bahnhof.",
                "Je vais à la gare."
              ],
              [
                "Ich gehe zur Post.",
                "Je vais à la poste."
              ]
            ]
          }
        ],
        "Comprendre les transports": [
          {
            "title": "La voyelle de fahren",
            "rule": "Fahren est irrégulier : a devient ä avec du et er/sie/es. Les autres personnes gardent a.",
            "examples": [
              [
                "ich fahre · du fährst · er/sie fährt",
                "je vais (en véhicule) · tu vas · il/elle va"
              ],
              [
                "wir fahren · ihr fahrt · sie/Sie fahren",
                "nous allons · vous allez (proches) · ils/elles vont / vous allez (politesse)"
              ]
            ]
          },
          {
            "title": "Le transport avec mit",
            "rule": "Mit demande le datif : der Bus devient dem Bus; die Bahn devient der Bahn. La préposition ne change pas selon la personne.",
            "examples": [
              [
                "Ich fahre mit dem Bus. Ich fahre mit der Bahn.",
                "Je prends le bus. Je prends le train."
              ]
            ]
          },
          {
            "title": "Müssen dans une consigne",
            "rule": "Sie müssen … signifie vous devez. Avec Sie, müssen garde la forme de base; umsteigen reste à l’infinitif à la fin. Retiens cette consigne ici; les autres formes de müssen sont expliquées en leçon 15.",
            "examples": [
              [
                "Sie müssen am Bahnhof umsteigen.",
                "Vous devez changer à la gare."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "neben",
          "à côté de"
        ],
        [
          "umsteigen",
          "changer de transport"
        ],
        [
          "das Gleis",
          "la voie / le quai"
        ],
        [
          "die Verspätung",
          "le retard"
        ]
      ]
    },
    "10": {
      "intro": [],
      "topics": {
        "Prévenir au travail": [
          {
            "title": "Demander de prévenir un collègue",
            "rule": "Avec Sie, la demande polie commence par le verbe. Cette phrase peut être reprise comme un bloc quand tu annonces un retard.",
            "examples": [
              [
                "Bitte informieren Sie meinen Kollegen.",
                "Veuillez prévenir mon collègue."
              ]
            ]
          },
          {
            "title": "Meinen Kollegen : deux changements",
            "rule": "Dans informieren Sie meinen Kollegen, la personne prévenue est l’objet direct. Mein devient meinen à l’accusatif masculin. Comme Name, le nom masculin Kollege prend aussi -n : der Kollege → den Kollegen. Retiens ici le groupe entier.",
            "examples": [
              [
                "Bitte informieren Sie meinen Kollegen.",
                "Veuillez prévenir mon collègue."
              ]
            ]
          }
        ],
        "Verbes réguliers au présent": [
          {
            "title": "Les terminaisons de arbeiten",
            "rule": "Le radical de arbeiten finit en t. Devant -st et -t, un e facilite la prononciation : arbeitest et arbeitet. Les formes avec wir et Sie se terminent normalement en -en.",
            "examples": [
              [
                "ich arbeite · du arbeitest · er arbeitet",
                "je travaille · tu travailles · il travaille"
              ],
              [
                "wir arbeiten · ihr arbeitet · sie arbeiten",
                "nous travaillons · vous travaillez (proches) · ils/elles travaillent"
              ]
            ]
          }
        ],
        "Métier et horaires": [
          {
            "title": "Im Büro et in der Schule",
            "rule": "Pour le lieu où l’on travaille, in est suivi du datif : das Büro devient dem Büro, et in dem se contracte en im. Die Schule devient der Schule; in der reste séparé. Als introduit le métier, pas le lieu.",
            "examples": [
              [
                "Ich arbeite im Büro.",
                "Je travaille au bureau."
              ],
              [
                "Ich arbeite in der Schule.",
                "Je travaille à l’école."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "später",
          "plus tard"
        ],
        [
          "pünktlich",
          "à l’heure"
        ],
        [
          "der Kollege",
          "le collègue"
        ]
      ]
    },
    "11": {
      "intro": [],
      "topics": {
        "Apprendre et demander de l’aide": [
          {
            "title": "Lire : lesen est irrégulier",
            "rule": "Avec du et er/sie/es, e devient ie. Pour ihr, la forme est lest, sans ie. Les autres personnes gardent la voyelle de lesen.",
            "examples": [
              [
                "ich lese · du liest · er/sie liest",
                "je lis · tu lis · il/elle lit"
              ],
              [
                "wir lesen · ihr lest · sie/Sie lesen",
                "nous lisons · vous lisez (proches) · ils/elles lisent / vous lisez (politesse)"
              ]
            ]
          },
          {
            "title": "Apporter un livre",
            "rule": "Sans modal, mitbringen se sépare. Après können, l’infinitif reste entier à la fin.",
            "examples": [
              [
                "Ich bringe mein Buch mit.",
                "J’apporte mon livre."
              ],
              [
                "Kannst du dein Wörterbuch mitbringen?",
                "Peux-tu apporter ton dictionnaire ?"
              ]
            ]
          }
        ],
        "Parler du cours": [
          {
            "title": "Seit et le pluriel au datif",
            "rule": "Seit signifie depuis et demande le datif. Au pluriel, Monate reçoit un n : seit sechs Monaten. Le présent décrit une activité qui continue; le français utilise aussi le présent dans cette phrase.",
            "examples": [
              [
                "Ich lerne seit sechs Monaten Deutsch.",
                "J’apprends l’allemand depuis six mois."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "das Wörterbuch",
          "le dictionnaire"
        ],
        [
          "mitbringen",
          "apporter"
        ],
        [
          "die Hausaufgaben",
          "les devoirs"
        ]
      ]
    },
    "12": {
      "intro": [],
      "topics": {
        "Organiser le week-end": [
          {
            "title": "Proposer une activité",
            "rule": "Wollen wir … ? sert ici à proposer une activité ensemble. L’autre verbe reste à l’infinitif à la fin; il ne prend pas une terminaison personnelle.",
            "examples": [
              [
                "Wollen wir zusammen spielen?",
                "On joue ensemble ?"
              ]
            ]
          },
          {
            "title": "Lieu ou destination ?",
            "rule": "Wo? demande où l’on est : zu Hause. Wohin? demande où l’on va : nach Hause. Le français dit dans les deux cas « à la maison » ; retiens la phrase allemande entière.",
            "examples": [
              [
                "Ich bin zu Hause.",
                "Je suis à la maison."
              ],
              [
                "Ich gehe nach Hause.",
                "Je rentre à la maison."
              ]
            ]
          }
        ],
        "Dire ce qu’on aime": [
          {
            "title": "Ins Kino : une destination",
            "rule": "Ins = in das. Avec gehen, ins Kino indique où tu vas. Kino est neutre : das Kino. Apprends cette destination comme un groupe; la même contraction reviendra avec ins Museum en leçon 21.",
            "examples": [
              [
                "Ich gehe lieber ins Kino.",
                "Je préfère aller au cinéma."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "gern",
          "volontiers / avec plaisir"
        ],
        [
          "lieber",
          "de préférence"
        ],
        [
          "nach Hause",
          "à la maison (destination)"
        ]
      ]
    },
    "13": {
      "intro": [],
      "topics": {
        "Réserver une chambre": [
          {
            "title": "Für : personnes et durée",
            "rule": "Für signifie ici pour. Nacht devient Nächte au pluriel; les nombres servent à compter les nuits ou les personnes. Une durée comme für zwei Nächte ne donne pas l’heure de départ.",
            "examples": [
              [
                "für zwei Personen · für drei Nächte",
                "pour deux personnes · pour trois nuits"
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "das Einzelzimmer",
          "la chambre individuelle"
        ],
        [
          "das Doppelzimmer",
          "la chambre double"
        ],
        [
          "das Familienzimmer",
          "la chambre familiale"
        ],
        [
          "inklusive",
          "compris"
        ],
        [
          "pro Nacht",
          "par nuit"
        ],
        [
          "dauern",
          "durer"
        ]
      ]
    },
    "14": {
      "intro": [],
      "topics": {
        "Décrire des symptômes": [
          {
            "title": "Depuis combien de temps ?",
            "rule": "Une situation qui continue s’exprime avec seit et le présent. Seit demande le datif : au pluriel, Tage reçoit un n. Ne remplace pas cette durée par deux jours d’absence à venir.",
            "examples": [
              [
                "Ich bin seit zwei Tagen krank.",
                "Je suis malade depuis deux jours."
              ],
              [
                "Ich kann zwei Tage nicht kommen.",
                "Je ne peux pas venir pendant deux jours."
              ]
            ]
          }
        ],
        "Prendre rendez-vous et prévenir": [
          {
            "title": "Beim Arzt : une contraction",
            "rule": "Beim = bei dem. Bei demande le datif : der Arzt devient dem Arzt. Le groupe beim Arzt signifie ici chez le médecin; il ne s’agit pas d’un nouveau verbe ou d’un possessif.",
            "examples": [
              [
                "Ich brauche einen Termin beim Arzt.",
                "J’ai besoin d’un rendez-vous chez le médecin."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "der Husten",
          "la toux"
        ],
        [
          "das Fieber",
          "la fièvre"
        ],
        [
          "müde",
          "fatigué(e)"
        ]
      ]
    },
    "15": {
      "intro": [],
      "topics": {
        "Répondre à une invitation": [
          {
            "title": "Une obligation avec müssen",
            "rule": "Müssen signifie devoir et est irrégulier : muss au singulier avec ich et er/sie, mais müssen avec wir. Il change de forme avec le sujet; le deuxième verbe reste à l’infinitif à la fin. Une obligation de travailler peut expliquer une absence.",
            "examples": [
              [
                "ich muss · du musst · er/sie muss",
                "je dois · tu dois · il/elle doit"
              ],
              [
                "wir müssen · ihr müsst · sie/Sie müssen",
                "nous devons · vous devez (proches) · ils/elles doivent / vous devez (politesse)"
              ],
              [
                "Ich muss leider arbeiten.",
                "Je dois malheureusement travailler."
              ]
            ]
          },
          {
            "title": "Proposer d’apporter quelque chose",
            "rule": "Soll ich … ? peut servir à demander ce que tu dois faire ou à proposer ton aide. Dans cette question, mitbringen reste entier à la fin.",
            "examples": [
              [
                "Soll ich einen Salat mitbringen?",
                "Dois-je apporter une salade ?"
              ]
            ]
          },
          {
            "title": "Une fin de message amicale",
            "rule": "Ces phrases peuvent compléter ton message. Elles ne remplacent pas les informations demandées dans la consigne.",
            "examples": [
              [
                "Bitte schreib mir.",
                "Écris-moi, s’il te plaît."
              ],
              [
                "Ich freue mich auf die Feier.",
                "Je me réjouis de la fête."
              ]
            ]
          }
        ],
        "Inviter et préciser": [
          {
            "title": "Chez moi : bei mir",
            "rule": "Dans cette invitation, bei mir signifie chez moi. Bei demande le datif : le pronom est mir, pas ich. Ce lieu est celui de la fête. Pour indiquer une destination vers quelqu’un, on emploie souvent zu; ces deux mots ne sont pas interchangeables partout.",
            "examples": [
              [
                "Die Party ist um achtzehn Uhr bei mir.",
                "La fête est à dix-huit heures chez moi."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "die Einladung",
          "l’invitation"
        ],
        [
          "die Feier",
          "la fête"
        ]
      ]
    },
    "16": {
      "intro": [],
      "topics": {
        "Lire panneaux et restrictions": [
          {
            "title": "Une permission avec dürfen",
            "rule": "Dürfen signifie avoir le droit de et est irrégulier : ich darf, man darf, mais wir dürfen. Man signifie on et utilise la forme du singulier. Avec nicht, dürfen exprime une interdiction, pas une absence d’obligation.",
            "examples": [
              [
                "ich darf · du darfst · er/sie darf",
                "j’ai le droit · tu as le droit · il/elle a le droit"
              ],
              [
                "wir dürfen · ihr dürft · sie/Sie dürfen",
                "nous avons le droit · vous avez le droit (proches) · ils/elles ont le droit / vous avez le droit (politesse)"
              ],
              [
                "Darf ich fotografieren? Hier darf man nicht fotografieren.",
                "Ai-je le droit de photographier ? Ici, on n’a pas le droit de photographier."
              ]
            ]
          }
        ],
        "Horaires et annonces": [
          {
            "title": "Fällt … aus : annulation",
            "rule": "Ausfallen est séparable. Sans modal, aus se place à la fin et fallen devient fällt avec der Zug : a → ä. La phrase signifie que le train est annulé; aus n’est pas ici une indication de provenance.",
            "examples": [
              [
                "Der Zug fällt heute aus.",
                "Le train est annulé aujourd’hui."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "verboten",
          "interdit"
        ],
        [
          "erlaubt",
          "autorisé"
        ],
        [
          "nur",
          "seulement"
        ],
        [
          "ausfallen",
          "être annulé"
        ]
      ]
    },
    "17": {
      "intro": [],
      "topics": {
        "Formuler une demande": [
          {
            "title": "À qui et quoi ?",
            "rule": "Dans mir den Stift geben, mir (= à moi) désigne le destinataire au datif; den Stift désigne l’objet donné à l’accusatif. Der Stift devient den Stift, tandis que das Buch et die Tasche gardent ici leur article. Helfen demande aussi le datif : mir helfen, pas mich helfen.",
            "examples": [
              [
                "Können Sie mir bitte den Stift geben?",
                "Pouvez-vous me donner le stylo, s’il vous plaît ?"
              ],
              [
                "Können Sie mir bitte helfen?",
                "Pouvez-vous m’aider, s’il vous plaît ?"
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "nett",
          "gentil"
        ],
        [
          "natürlich",
          "bien sûr"
        ],
        [
          "der Moment",
          "l’instant"
        ]
      ]
    },
    "18": {
      "intro": [],
      "topics": {
        "Comprendre les consignes": [
          {
            "title": "Ihren Namen : votre nom comme objet",
            "rule": "Ihr est le possessif de politesse, avec une majuscule. Devant le nom masculin objet direct, il devient Ihren. Name reçoit aussi -n, comme en leçon 2 : Ihr Name → Ihren Namen. Ce n’est pas un pluriel.",
            "examples": [
              [
                "Schreiben Sie bitte Ihren Namen.",
                "Écrivez votre nom, s’il vous plaît."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "prüfen",
          "vérifier"
        ],
        [
          "vergleichen",
          "comparer"
        ],
        [
          "ankreuzen",
          "cocher"
        ],
        [
          "oder",
          "ou"
        ],
        [
          "zweimal",
          "deux fois"
        ]
      ]
    },
    "19": {
      "intro": [],
      "topics": {
        "Demander une aide médicale": [
          {
            "title": "Diese Tabletten : ces comprimés",
            "rule": "Diese signifie ici ces : il s’agit d’un démonstratif, pas d’un possessif. Tablette devient Tabletten au pluriel. Dans cette consigne, diese Tabletten est ce qu’il faut prendre; diese garde la même forme au nominatif et à l’accusatif pluriels.",
            "examples": [
              [
                "Nehmen Sie diese Tabletten.",
                "Prenez ces comprimés."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "der Arm",
          "le bras"
        ],
        [
          "das Bein",
          "la jambe"
        ],
        [
          "der Bauch",
          "le ventre"
        ],
        [
          "der Rücken",
          "le dos"
        ],
        [
          "der Hals",
          "la gorge"
        ],
        [
          "helfen",
          "aider"
        ]
      ]
    },
    "20": {
      "intro": [],
      "topics": {
        "Choisir ses vêtements": [
          {
            "title": "Conseiller quoi emporter",
            "rule": "Mitnehmen se sépare. Pour donner une consigne à un proche, utilise Nimm … mit. Eine warme Jacke est ici un groupe prêt à utiliser; la déclinaison complète des adjectifs n’est pas demandée.",
            "examples": [
              [
                "Nimm einen Regenschirm mit.",
                "Prends un parapluie avec toi."
              ],
              [
                "Bring eine warme Jacke mit.",
                "Apporte une veste chaude."
              ]
            ]
          }
        ],
        "Décrire la météo": [
          {
            "title": "Parler du temps de demain",
            "rule": "Pour une prévision simple, morgen suffit avec le présent. Tu n’as pas besoin d’un nouveau temps verbal pour cette phrase. Le verbe reste en deuxième position.",
            "examples": [
              [
                "Morgen ist es warm.",
                "Demain, il fera chaud."
              ]
            ]
          },
          {
            "title": "Es dans les expressions météo",
            "rule": "Es est le sujet grammatical de es regnet et es schneit; il ne désigne pas une personne. Le français utilise aussi un il impersonnel : il pleut, il neige. Après Heute, le verbe passe devant es, sans changer le sens de es.",
            "examples": [
              [
                "Es regnet. → Heute regnet es.",
                "Il pleut. → Aujourd’hui, il pleut."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "mitnehmen",
          "emporter"
        ],
        [
          "warm",
          "chaud"
        ],
        [
          "der Mantel",
          "le manteau"
        ],
        [
          "das Hemd",
          "la chemise"
        ]
      ]
    },
    "21": {
      "intro": [],
      "topics": {
        "Proposer une sortie": [
          {
            "title": "Ins pour une destination",
            "rule": "Ins est la contraction de in das. Avec gehen, ces expressions indiquent le lieu où tu vas; apprends-les avec le nom neutre correspondant.",
            "examples": [
              [
                "ins Kino · ins Museum · ins Konzert",
                "au cinéma · au musée · au concert"
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "die Karte",
          "le billet (de spectacle)"
        ],
        [
          "der Eintritt",
          "le prix d’entrée"
        ]
      ]
    },
    "22": {
      "intro": [],
      "topics": {
        "Laisser un message": [
          {
            "title": "Rappeler : ruf ou rufen Sie",
            "rule": "Avec un proche, la consigne commence par ruf, sans du. Pour une demande polie, utilise rufen Sie. La particule zurück reste à la fin.",
            "examples": [
              [
                "Ruf mich bitte zurück.",
                "Rappelle-moi, s’il te plaît."
              ],
              [
                "Rufen Sie mich bitte zurück.",
                "Rappelez-moi, s’il vous plaît."
              ]
            ]
          },
          {
            "title": "Le lieu de départ : von zu Hause",
            "rule": "Von zu Hause signifie depuis la maison. Garde l’expression zu Hause après von. Dans anrufen, an se place à la fin de la phrase.",
            "examples": [
              [
                "Ich rufe von zu Hause an.",
                "J’appelle depuis la maison."
              ]
            ]
          }
        ],
        "Écrire un SMS clair": [
          {
            "title": "Dir, Ihnen, mich et Sie",
            "rule": "Dir (= à toi) et Ihnen (= à vous, politesse) désignent le destinataire avec schicken. Avec zurückrufen, la personne rappelée est un objet direct : mich (= me) ou Sie (= vous). Le choix du pronom dépend donc à la fois de la personne et du verbe.",
            "examples": [
              [
                "Ich schicke dir ein Foto.",
                "Je t’envoie une photo."
              ],
              [
                "Ich schicke Ihnen eine E-Mail.",
                "Je vous envoie un e-mail."
              ],
              [
                "Können Sie mich zurückrufen?",
                "Pouvez-vous me rappeler ?"
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "anrufen",
          "appeler"
        ],
        [
          "zurückrufen",
          "rappeler"
        ],
        [
          "kaputt",
          "cassé / en panne"
        ],
        [
          "von zu Hause",
          "depuis la maison"
        ]
      ]
    },
    "23": {
      "intro": [],
      "topics": {
        "À la poste et au guichet": [
          {
            "title": "S’inscrire et remplir un formulaire",
            "rule": "Pour sich anmelden, ich utilise le pronom mich. Avec möchte, l’infinitif reste entier à la fin. Ausfüllen se sépare dans une consigne polie : aus vient à la fin.",
            "examples": [
              [
                "Ich möchte mich anmelden.",
                "Je voudrais m’inscrire."
              ],
              [
                "Füllen Sie bitte das Formular aus.",
                "Remplissez le formulaire, s’il vous plaît."
              ]
            ]
          }
        ]
      },
      "words": [
        [
          "der Umschlag",
          "l’enveloppe"
        ],
        [
          "der Ausweis",
          "la pièce d’identité"
        ],
        [
          "bekommen",
          "obtenir"
        ],
        [
          "unterschreiben",
          "signer"
        ],
        [
          "die Anmeldung",
          "l’inscription"
        ],
        [
          "übertragen",
          "reporter (une information)"
        ],
        [
          "geboren in",
          "né(e) à"
        ]
      ]
    },
    "24": {
      "intro": [],
      "topics": {},
      "words": [
        [
          "und",
          "et"
        ],
        [
          "aber",
          "mais"
        ]
      ]
    }
  }
};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text=value=>Array.isArray(value)?value[0]:value;
  const translations={
    "Mit dem Imperativ gibst du eine Anweisung, etwa eine Wegbeschreibung. Für die höfliche Form nimmst du die Verbform zu vous und lässt das Wort vous weg:": "The imperative gives an instruction, such as directions. For the polite form take the verb form used with vous and leave out vous:",
    ". Genauso werden aus vous tournez → Tournez und aus vous prenez → Prenez. Aller und prendre sind unregelmäßig; ihre vous-Formen lernst du deshalb mit. Die Bildung der Anweisung bleibt gleich.": ". Likewise, vous tournez → Tournez and vous prenez → Prenez. Aller and prendre are irregular, so learn their vous forms explicitly. The instruction is formed in the same way.",

    "Mit dem Imperativ gibst du eine Anweisung, etwa eine Wegbeschreibung. Für die höfliche Form nimmst du die Verbform zu vous und lässt das Wort vous weg: vous allez → Allez. Genauso werden aus vous tournez → Tournez und aus vous prenez → Prenez. Aller und prendre sind unregelmäßig; ihre vous-Formen lernst du deshalb mit. Die Bildung der Anweisung bleibt gleich.": "The imperative gives an instruction, such as directions. For the polite form take the verb form used with vous and leave out vous: vous allez → Allez. Likewise, vous tournez → Tournez and vous prenez → Prenez. Aller and prendre are irregular, so learn their vous forms explicitly. The instruction is formed in the same way.",
    'Neue Vokabeln dieser Lektion':'New lesson vocabulary',
    'Hier stehen nur Wörter, die in dieser Lektion neu hinzukommen. Den gesamten Wortschatz findest du im Vokabeltrainer.':'Only words introduced in this lesson are shown here. Find all words in the vocabulary trainer.',
    'Für den ersten Check':'For the first check',
    'Weitere Wörter':'More words',
    'Zum Nachschlagen – auch für Hörtexte und Hard Mode. Diese Wörter kannst du im Vokabeltrainer der Lektion üben.':'For reference, including listening tasks and Hard Mode. Practise these words in the lesson vocabulary trainer.'
  };
  for(const lesson of Object.values(content.fr)){
    for(const rule of [...lesson.intro,...Object.values(lesson.topics).flat()]){
      for(const value of [rule.title,rule.rule])if(Array.isArray(value))translations[value[0]]=value[1];
      for(const [,meaning,en]of rule.examples)if(en)translations[meaning]=en;
    }
    for(const [,meaning,en]of lesson.words)if(en)translations[meaning]=en;
  }
  function rulesHtml(course,rules){
    return rules.map(rule=>`<section class="lesson-foundation-rule"><h4>${esc(text(rule.title))}</h4><p>${esc(text(rule.rule))}</p><div class="lesson-foundation-examples">${rule.examples.map(([target,meaning])=>`<div class="lesson-foundation-example"><strong lang="${course}" data-i18n-ignore>${esc(target)}</strong><span>${esc(meaning)}</span></div>`).join('')}</div></section>`).join('');
  }
  function render(course,id){
    const rules=content[course]?.[id]?.intro||[];if(!rules.length)return '';
    return `<section class="lesson-foundations is-intro" data-foundations="${course}-${Number(id)}"><h3>${course==='fr'?'Für den ersten Check':'Pour le premier quiz'}</h3>${rulesHtml(course,rules)}</section>`;
  }
  function enhance(course,id,topic,html,topicIndex){
    const rules=content[course]?.[id]?.topics[topic]||[];
    const vocabulary=Number.isInteger(topicIndex)?preparationHtml(course,id,'grammar:'+topicIndex):'';
    if(!rules.length&&!vocabulary)return html;
    const holder=document.createElement('div');holder.innerHTML=html;
    const body=holder.querySelector('.grammar-detail-body')||holder;
    const addition=document.createElement('div');addition.className='lesson-foundations is-topic';addition.dataset.foundationTopic=topic;
    addition.innerHTML=rulesHtml(course,rules);
    const practice=body.querySelector('.deepening-practice,.lesson1-grammar-practice');
    // When the page already has the same translated example, move that row next
    // to its explanation instead of copying it. Its existing audio button is kept.
    const normalized=s=>String(s).replace(/\s+/g,' ').trim();
    for(const example of [...addition.querySelectorAll('.lesson-foundation-example')]){
      const target=normalized(example.querySelector('strong').textContent),meaning=normalized(example.querySelector('span').textContent);
      const row=[...body.querySelectorAll('.phrase-row')].find(row=>normalized(row.querySelector('strong')?.textContent)===target&&normalized(row.querySelector('small')?.textContent)===meaning);
      if(row)example.replaceWith(row);
    }
    if(rules.length){if(practice)practice.before(addition);else body.appendChild(addition);}
    if(vocabulary){const block=document.createElement('div');block.innerHTML=vocabulary;if(practice)practice.before(block);else body.appendChild(block);}
    return holder.innerHTML;
  }
  function vocabularyBank(course){
    if(!window.A1Vocabulary)return [];
    const units=course==='fr'?window.FR_A1_DEEPENING_CONTENT:window.DE_A1_STUDY?.content;
    return window.A1Vocabulary.buildBank({course,lessons:Object.keys(content[course]||{}).map(id=>({id:Number(id)})),units:units||{}});
  }
  function wordAudioButton(course,word){
    const spoken=String(word).replace(/\s*\([^)]*\)/g,'').replace(/\s*\/\s*/g,', ').trim();
    const en=window.A1Profile?.getUiLang()==='en';
    const label=en?(course==='fr'?'Listen in French: ':'Listen in German: '):course==='fr'?'Auf Französisch anhören: ':'Écouter en allemand : ';
    return `<button type="button" class="lesson-vocabulary-audio" data-vocabulary-audio="${esc(spoken)}" data-vocabulary-lang="${course==='fr'?'fr-FR':'de-DE'}" aria-label="${esc(label+word)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m11 5-6 4H2v6h3l6 4V5Z"/><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg></button>`;
  }
  // One delegated listener also covers regenerated pages and Hard Mode preparation.
  document.addEventListener('click',event=>{
    const button=event.target.closest?.('button[data-vocabulary-audio]');
    if(!button||button.disabled||!button.closest('.lesson-extra-vocabulary'))return;
    const lang=button.dataset.vocabularyLang;
    if(!['fr-FR','de-DE'].includes(lang))return;
    event.preventDefault();
    window.A1Voice?.speak(button.dataset.vocabularyAudio,{lang});
  });
  function vocabularyRows(course,bank,targets){
    const display=value=>window.A1Vocabulary.displayText?.(course,value)??value;
    const rows=new Map();
    for(const word of bank){
      const target=word.target.normalize('NFC');if(targets&&!targets.includes(target))continue;
      const pairs=window.A1Vocabulary.displayPairs?.(course,word)||[{target:display(word.target),meaning:display(word.meaning)}];
      for(const pair of pairs)rows.set(JSON.stringify([pair.target,pair.meaning]),pair);
    }
    return `<dl data-i18n-ignore>${[...rows.values()].map(pair=>`<div><dt lang="${course}"><span>${esc(pair.target)}</span>${wordAudioButton(course,pair.target)}</dt><dd lang="${course==='fr'?'de':'fr'}">${esc(pair.meaning)}</dd></div>`).join('')}</dl>`;
  }
  function vocabularyHtml(course,id){
    const bank=vocabularyBank(course).filter(word=>word.lessons.includes(Number(id)));
    const included=window.A1LessonVocabularyPlan?.[course]?.[id]?.regular;
    const regular=included?bank.filter(word=>included.includes(word.target.normalize('NFC'))):bank;if(!regular.length)return '';
    const en=window.A1Profile?.getUiLang()==='en';
    const title=en?'Lesson word list':course==='fr'?'Wortliste der Lektion':'Liste de mots de la leçon';
    const hint=en?'This list is for reference and orientation. You will learn the words step by step through the examples and exercises in this lesson. You do not need to memorise them in advance.':course==='fr'?'Diese Liste dient zur Orientierung und zum Nachschlagen. Du lernst die Wörter im Verlauf der Lektion Schritt für Schritt anhand von Beispielen und Übungen. Du musst sie nicht vorab auswendig lernen.':'Cette liste sert de repère et de référence. Tu apprendras les mots progressivement, avec les exemples et les exercices de la leçon. Tu n’as pas besoin de les mémoriser à l’avance.';
    return `<details class="lesson-extra-vocabulary" data-foundation-words="${course}-${Number(id)}" data-i18n-ignore><summary>${title}</summary><p class="muted">${hint}</p>${vocabularyRows(course,regular)}</details>`;
  }
  function preparationHtml(course,id,stage){
    const plan=window.A1LessonVocabularyPlan?.[course]?.[id];
    const targets=stage==='hard'?plan?.hard:plan?.stages[stage];if(!targets?.length)return '';
    const bank=vocabularyBank(course),en=window.A1Profile?.getUiLang()==='en';
    const title=en?(stage==='hard'?'Additional words for Hard Mode':course==='de'?'Additional words for this lesson':'Words for this activity'):course==='fr'?(stage==='hard'?'Zusätzliche Wörter für den Hard Mode':'Weitere Vokabeln für die Übung'):(stage==='hard'?'Mots supplémentaires pour le Hard Mode':'Mots supplémentaires de cette leçon');
    return `<section class="lesson-extra-vocabulary lesson-vocabulary-preparation" data-vocabulary-stage="${esc(stage)}" data-i18n-ignore><h4>${title}</h4>${vocabularyRows(course,bank,targets)}</section>`;
  }
  function hardInstructionsHtml(course,data){
    if(course!=='fr')return '';
    const prompts=data.listening.flatMap(block=>block.questions.map(q=>q.q)).join(' '),en=window.A1Profile?.getUiLang()==='en';
    const expressions=[[/écris/i,'Écris …','Schreibe …','Write …'],[/réponds.*chiffres/i,'Réponds en chiffres.','Antworte mit Ziffern.','Answer in digits.'],[/choisis/i,'Choisis …','Wähle …','Choose …'],[/quelle phrase est correcte/i,'Quelle phrase est correcte ?','Welcher Satz ist richtig?','Which sentence is correct?']].filter(([pattern])=>pattern.test(prompts));
    if(!expressions.length)return '';
    return `<details class="lesson-extra-vocabulary" data-hard-instructions data-i18n-ignore><summary>${en?'Understanding the instructions':'Die Aufgabenstellung verstehen'}</summary><dl>${expressions.map(([,fr,de,english])=>`<div><dt lang="fr"><span>${esc(fr)}</span>${wordAudioButton('fr',fr)}</dt><dd>${esc(en?english:de)}</dd></div>`).join('')}</dl></details>`;
  }
  window.A1LessonFoundations=Object.freeze({content,translations,render,enhance,vocabularyHtml,preparationHtml,hardInstructionsHtml});
})();
