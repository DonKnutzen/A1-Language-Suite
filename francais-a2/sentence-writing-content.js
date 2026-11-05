/* Français A2 self-written sentences per lesson (generated from src/sentences.cjs). */
window.FR_A2_SENTENCE_CONTENT = {
  "1": [
    {
      "id": "A2L1-s1",
      "goal": "Sich mit Familienstand, Adresse, Beruf, Sprachen und Hobbys ausführlich vorstellen.",
      "de": "Stell dich kurz vor: Wie heißt du, und was machst du beruflich?",
      "model": "Je m’appelle Sophie et je suis infirmière.",
      "need": [
        [
          "je m'appelle|mon nom est",
          "Nenne deinen Namen: Je m’appelle …"
        ],
        [
          "je suis|je travaille|je fais",
          "Nenne deinen Beruf: je suis … oder je travaille comme …"
        ]
      ],
      "avoid": [
        [
          "je appelle|je m'apelle|je m'appele",
          "Es heißt: je m’appelle, mit Apostroph und zwei l."
        ],
        [
          "je suis (un|une)",
          "Beim Beruf steht kein Artikel: je suis infirmière."
        ]
      ]
    },
    {
      "id": "A2L1-s2",
      "goal": "Mit depuis + Präsens sagen, seit wann etwas andauert.",
      "de": "Schreib mit depuis, seit wann du in deiner Stadt wohnst.",
      "model": "J’habite à Strasbourg depuis cinq ans.",
      "need": [
        [
          "(j'habite|je vis) ~depuis|depuis ~(j'habite|je vis)",
          "Verbinde j’habite und depuis: J’habite à … depuis …"
        ]
      ],
      "avoid": [
        [
          "j'ai habité|je suis habité|j'ai vécu",
          "Mit depuis steht das Präsens: j’habite."
        ],
        [
          "depuis il y a",
          "Nimm nur depuis, ohne il y a."
        ],
        [
          "je habite|je ai",
          "Vor einem Vokal: j’habite."
        ]
      ]
    }
  ],
  "2": [
    {
      "id": "A2L2-s1",
      "goal": "Eine Wohnung mit Zimmern, Stockwerk und Lage beschreiben.",
      "de": "Beschreib deine Wohnung oder dein Haus: Wie viele Zimmer, und wo liegt sie?",
      "model": "J’habite dans un appartement de trois pièces au deuxième étage.",
      "need": [
        [
          "appartement|maison|studio",
          "Sag, worum es geht: un appartement, une maison oder un studio."
        ],
        [
          "pièces?|chambres?",
          "Nenne die Zimmer: trois pièces."
        ],
        [
          "étage|centre|quartier|banlieue|campagne|ville|rue|près|loin",
          "Sag auch, wo sie liegt: au deuxième étage, au centre …"
        ]
      ],
      "avoid": [
        [
          "sur le \\S+ étage",
          "Beim Stockwerk: au deuxième étage."
        ]
      ]
    },
    {
      "id": "A2L2-s2",
      "goal": "Mit plus / moins / aussi … que vergleichen; meilleur korrekt verwenden.",
      "de": "Vergleiche deine Wohnung mit der alten: mit plus, moins oder aussi … que.",
      "model": "Mon appartement est plus grand que l’ancien.",
      "need": [
        [
          "(plus|moins|aussi) \\S+ (que|qu')",
          "Vergleiche so: plus grand que, moins cher que oder aussi calme que."
        ],
        [
          "est|sont|coûte",
          "Dein Satz braucht ein Verb: Mon appartement est …"
        ]
      ],
      "avoid": [
        [
          "plus \\S+ comme",
          "Beim Vergleich steht que, nicht comme."
        ],
        [
          "plus bon",
          "Es heißt meilleur, nicht plus bon."
        ],
        [
          "moins \\S+ que l'avant",
          "Es heißt: qu’avant."
        ]
      ]
    }
  ],
  "3": [
    {
      "id": "A2L3-s1",
      "goal": "Schritte mit d’abord, ensuite, après ordnen und jusqu’à, en face de verwenden.",
      "de": "Beschreib einer Freundin den Weg in zwei Schritten: mit d’abord und ensuite.",
      "model": "D’abord, tu vas tout droit jusqu’au feu, ensuite tu tournes à gauche.",
      "need": [
        [
          "d'abord",
          "Beginne mit d’abord."
        ],
        [
          "ensuite",
          "Der zweite Schritt beginnt mit ensuite."
        ],
        [
          "tu (vas|tournes|prends|traverses|continues|passes)|vous (allez|tournez|prenez|traversez|continuez)|va|tourne|prends|traverse|continue|allez|tournez|prenez|traversez|continuez",
          "Sag, was sie tun soll: tu vas, tu tournes, tu prends …"
        ]
      ],
      "avoid": [
        [
          "tu (tourne|va|continue|traverse|prend)",
          "Nach tu endet das Verb hier auf -s: tu vas, tu tournes, tu prends."
        ]
      ],
      "min": 7
    },
    {
      "id": "A2L3-s2",
      "goal": "Den eigenen Weg zur Arbeit mit Verkehrsmittel und Dauer beschreiben.",
      "de": "Schreib, wie du zur Arbeit oder zum Kurs kommst: Verkehrsmittel und Dauer.",
      "model": "Je vais au travail en bus et ça dure vingt minutes.",
      "need": [
        [
          "je vais|je viens|je prends|je pars|je mets|j'arrive",
          "Beginne mit dir selbst: Je vais au travail …"
        ],
        [
          "en (bus|train|métro|voiture|tram|tramway|vélo)|à (pied|vélo)|le (bus|train|métro|tram|tramway)|ma voiture|mon vélo",
          "Nenne das Verkehrsmittel: en bus, en train, à pied, à vélo."
        ],
        [
          "minutes?|heures?|demi heure|quart d'heure",
          "Nenne die Dauer: vingt minutes."
        ]
      ],
      "avoid": [
        [
          "avec le (bus|train|métro|tram)",
          "Das Verkehrsmittel steht meist so: en bus, en train, en métro."
        ]
      ]
    }
  ],
  "4": [
    {
      "id": "A2L4-s1",
      "goal": "Ein Telefongespräch beginnen, nach einer Person fragen und reagieren, wenn sie nicht da ist.",
      "de": "Du rufst an: Grüße und frag höflich nach Madame Dubois.",
      "model": "Bonjour, est-ce que je pourrais parler à Madame Dubois, s’il vous plaît ?",
      "need": [
        [
          "bonjour|allô|bonsoir",
          "Grüße zuerst: Bonjour."
        ],
        [
          "parler à madame dubois|madame dubois est (là|elle là)",
          "Frag nach ihr: Je pourrais parler à Madame Dubois ?"
        ]
      ],
      "avoid": [
        [
          "parler madame",
          "Es heißt: parler à Madame Dubois."
        ]
      ]
    },
    {
      "id": "A2L4-s2",
      "goal": "Indirekte Objektpronomen lui / leur vor dem Verb verwenden.",
      "de": "Pierre ist nicht da. Schreib mit lui: Du sagst ihm, dass Marie angerufen hat.",
      "model": "Je lui dis que Marie a téléphoné.",
      "need": [
        [
          "lui (dis|dirai|dire|ai dit)",
          "Stell lui vor das Verb: je lui dis …"
        ],
        [
          "que marie|qu'elle",
          "Verbinde mit que: … que Marie …"
        ],
        [
          "a (téléphoné|appelé)",
          "Marie hat angerufen: a téléphoné oder a appelé."
        ]
      ],
      "avoid": [
        [
          "je le dis|je dis lui|je dis à lui",
          "Ihm heißt lui und steht vor dem Verb: je lui dis."
        ],
        [
          "a (téléphonée|appelée)",
          "Mit avoir bleibt das Partizip ohne -e: a téléphoné."
        ]
      ]
    }
  ],
  "5": [
    {
      "id": "A2L5-s1",
      "goal": "Erzählen, was man gestern oder am letzten Wochenende gemacht hat.",
      "de": "Schreib, dass du gestern Abend mit Freunden gegessen hast.",
      "model": "Hier soir, j’ai mangé avec des amis.",
      "need": [
        [
          "hier",
          "Sag, wann: hier soir."
        ],
        [
          "(j'ai|nous avons|on a) ~(mangé|dîné)",
          "Passé composé: j’ai mangé."
        ],
        [
          "amis|amies|copains|copines",
          "Sag, mit wem: avec des amis."
        ]
      ],
      "avoid": [
        [
          "j'ai manger|j'ai dîner",
          "Hier brauchst du das Partizip: j’ai mangé."
        ],
        [
          "je mange",
          "Das war gestern: j’ai mangé."
        ]
      ]
    },
    {
      "id": "A2L5-s2",
      "goal": "Das Partizip bei être und reflexiven Verben an das Subjekt angleichen.",
      "de": "Schreib, dass du gestern ins Kino gegangen bist.",
      "model": "Hier, je suis allée au cinéma.",
      "need": [
        [
          "hier",
          "Sag, wann: hier."
        ],
        [
          "(je suis|nous sommes|on est) allée?s?",
          "aller bildet das passé composé mit être: je suis allé oder je suis allée."
        ],
        [
          "au cinéma|au ciné",
          "Es heißt: au cinéma."
        ]
      ],
      "avoid": [
        [
          "j'ai allé",
          "aller bildet das passé composé mit être: je suis allé."
        ],
        [
          "je suis aller",
          "Hier brauchst du das Partizip: allé."
        ],
        [
          "à le cinéma",
          "Aus à + le wird au."
        ]
      ]
    }
  ],
  "6": [
    {
      "id": "A2L6-s1",
      "goal": "Das imparfait von être, avoir, faire und regelmäßigen Verben bilden.",
      "de": "Schreib im imparfait, wie das Wetter im Urlaub war und wo ihr wart.",
      "model": "Il faisait beau et nous étions à la mer.",
      "need": [
        [
          "il faisait|il pleuvait|il neigeait|il y avait|c'était",
          "Das Wetter steht im imparfait: il faisait beau."
        ],
        [
          "nous étions|j'étais|on était",
          "Der Ort steht auch im imparfait: nous étions à …"
        ]
      ],
      "avoid": [
        [
          "il a fait|nous avons été|j'ai été",
          "Hintergrund steht im imparfait: il faisait, nous étions."
        ]
      ]
    },
    {
      "id": "A2L6-s2",
      "goal": "Imparfait (Hintergrund, Gewohnheit) und passé composé (Ereignis) unterscheiden.",
      "de": "Das Wetter war schön, und ihr habt ein Dorf besucht. Nimm imparfait und passé composé.",
      "model": "Il faisait beau, alors nous avons visité un village.",
      "need": [
        [
          "il faisait (beau|chaud)|il y avait du soleil",
          "Der Hintergrund steht im imparfait: il faisait beau."
        ],
        [
          "(nous avons|on a|j'ai) visité",
          "Das Ereignis steht im passé composé: nous avons visité."
        ],
        [
          "village",
          "Nenne das Dorf: un village."
        ]
      ],
      "avoid": [
        [
          "nous visitions|il a fait beau",
          "Wetter im imparfait, Ereignis im passé composé."
        ]
      ]
    }
  ],
  "7": [
    {
      "id": "A2L7-s1",
      "goal": "Das futur simple regelmäßiger und wichtiger unregelmäßiger Verben bilden.",
      "de": "Schreib im futur simple: Am Samstag gehst du auf den Markt.",
      "model": "Samedi, j’irai au marché.",
      "need": [
        [
          "samedi",
          "Sag, wann: samedi."
        ],
        [
          "j'irai|nous irons|on ira",
          "aller ist unregelmäßig: j’irai."
        ],
        [
          "au marché",
          "Es heißt: au marché."
        ]
      ],
      "avoid": [
        [
          "j'allerai|je irai",
          "aller ist unregelmäßig: j’irai."
        ],
        [
          "je vais aller",
          "Hier ist das futur simple gefragt: j’irai."
        ]
      ]
    },
    {
      "id": "A2L7-s2",
      "goal": "Das futur simple regelmäßiger und wichtiger unregelmäßiger Verben bilden.",
      "de": "Schreib im futur simple: Morgen siehst du Freunde.",
      "model": "Demain, je verrai des amis.",
      "need": [
        [
          "demain",
          "Sag, wann: demain."
        ],
        [
          "je verrai|nous verrons|on verra",
          "voir ist unregelmäßig: je verrai."
        ],
        [
          "amis|amies|copains|copines",
          "Sag, wen: des amis."
        ]
      ],
      "avoid": [
        [
          "je voirai",
          "voir ist unregelmäßig: je verrai."
        ]
      ]
    },
    {
      "id": "A2L7-s3",
      "goal": "quand + Futur und futur proche passend verwenden.",
      "de": "Schreib mit quand: Wenn du nach Hause kommst, rufst du mich an. Beide Teile im Futur.",
      "model": "Quand je rentrerai, je t’appellerai.",
      "need": [
        [
          "quand je (rentrerai|reviendrai|arriverai|serai)",
          "Nach quand steht das Futur: quand je rentrerai."
        ],
        [
          "je t'appellerai|je te téléphonerai",
          "Auch der zweite Teil steht im Futur: je t’appellerai."
        ]
      ],
      "avoid": [
        [
          "quand je (rentre|reviens|arrive|suis)",
          "Nach quand steht im Französischen das Futur: quand je rentrerai."
        ],
        [
          "appelerai",
          "Das Futur hat zwei l: je t’appellerai."
        ]
      ]
    }
  ],
  "8": [
    {
      "id": "A2L8-s1",
      "goal": "Sätze mit den Relativpronomen qui und que verbinden.",
      "de": "Verbinde mit qui: Du hast einen Hund, der Rex heißt.",
      "model": "J’ai un chien qui s’appelle Rex.",
      "need": [
        [
          "chien qui",
          "Der Hund ist Subjekt des zweiten Teils: un chien qui …"
        ],
        [
          "s'appelle rex",
          "Nenne seinen Namen: s’appelle Rex."
        ]
      ],
      "avoid": [
        [
          "chien que",
          "Vor dem Verb ohne eigenes Subjekt steht qui."
        ]
      ]
    },
    {
      "id": "A2L8-s2",
      "goal": "Sätze mit den Relativpronomen qui und que verbinden.",
      "de": "Verbinde mit que: Das ist der Kater, den du letztes Jahr adoptiert hast.",
      "model": "C’est le chat que j’ai adopté l’année dernière.",
      "need": [
        [
          "chat|chatte",
          "Nenne das Tier: le chat."
        ],
        [
          "(que|qu') ~(adopté|adoptée)",
          "Das Tier ist Objekt: le chat que j’ai adopté."
        ],
        [
          "année dernière|an dernier",
          "Sag, wann: l’année dernière."
        ]
      ],
      "avoid": [
        [
          "chat qui j'ai|chatte qui j'ai",
          "Mit eigenem Subjekt steht que: le chat que j’ai adopté."
        ]
      ]
    },
    {
      "id": "A2L8-s3",
      "goal": "Fragen zu Pflege und Alltag mit einem Tier stellen und beantworten.",
      "de": "Dein Hund: Schreib mit dem Pronomen le, dass du ihn jeden Abend ausführst.",
      "model": "Je le promène tous les soirs.",
      "need": [
        [
          "je le (promène|sors)",
          "Das Pronomen steht vor dem Verb: je le promène."
        ],
        [
          "tous les soirs|chaque soir",
          "Sag, wann: tous les soirs."
        ]
      ],
      "avoid": [
        [
          "je promène le|je lui promène",
          "Ihn heißt le und steht vor dem Verb: je le promène."
        ]
      ]
    }
  ],
  "9": [
    {
      "id": "A2L9-s1",
      "goal": "Das Lieblingsgericht beschreiben, Zutaten und Mengen nennen.",
      "de": "Nenne dein Lieblingsgericht und zwei Zutaten.",
      "model": "Mon plat préféré, c’est la soupe de légumes avec des carottes et des oignons.",
      "need": [
        [
          "mon plat préféré",
          "Beginne mit: Mon plat préféré …"
        ],
        [
          "et",
          "Nenne zwei Zutaten, verbunden mit et."
        ]
      ],
      "avoid": [
        [
          "mon préféré plat|ma plat",
          "Es heißt: mon plat préféré."
        ]
      ],
      "min": 7
    },
    {
      "id": "A2L9-s2",
      "goal": "Mengenangaben mit dem Pronomen en ersetzen.",
      "de": "Des carottes ? Antworte mit en: Du nimmst vier.",
      "model": "J’en prends quatre.",
      "need": [
        [
          "j'en (prends|mets|veux|achète)",
          "Ersetze die Karotten durch en: j’en prends."
        ],
        [
          "quatre|4",
          "Nenne die Menge: quatre."
        ]
      ],
      "avoid": [
        [
          "je en",
          "Vor einem Vokal: j’en."
        ],
        [
          "carottes",
          "en ersetzt das Nomen: carottes fällt weg."
        ]
      ],
      "min": 3
    },
    {
      "id": "A2L9-s3",
      "goal": "Nach Essgewohnheiten fragen und antworten.",
      "de": "Trinkst du Kaffee? Antworte mit en: Ja, ich trinke jeden Morgen welchen.",
      "model": "Oui, j’en bois tous les matins.",
      "need": [
        [
          "j'en bois",
          "Ersetze du café durch en: j’en bois."
        ],
        [
          "tous les matins|chaque matin",
          "Sag, wann: tous les matins."
        ]
      ],
      "avoid": [
        [
          "je bois du café",
          "Ersetze du café durch en: j’en bois."
        ],
        [
          "je en",
          "Vor einem Vokal: j’en."
        ]
      ]
    }
  ],
  "10": [
    {
      "id": "A2L10-s1",
      "goal": "Auf eine gute Nachricht reagieren und gratulieren.",
      "de": "Gratuliere Léa zur bestandenen Prüfung.",
      "model": "Félicitations pour ton examen, Léa !",
      "need": [
        [
          "félicitations|bravo",
          "Gratuliere: Félicitations."
        ],
        [
          "examen",
          "Sag, wofür: pour ton examen."
        ]
      ],
      "avoid": [
        [
          "félicitation pour",
          "Das Wort steht im Plural: félicitations."
        ]
      ]
    },
    {
      "id": "A2L10-s2",
      "goal": "Jemanden schriftlich und mündlich einladen und um Antwort bitten.",
      "de": "Lade sie für Freitagabend ins Restaurant ein.",
      "model": "Je t’invite au restaurant vendredi soir.",
      "need": [
        [
          "je t'invite|on t'invite|nous t'invitons|t'inviter|tu veux venir",
          "Lade sie ein: je t’invite."
        ],
        [
          "au restaurant",
          "Es heißt: au restaurant."
        ],
        [
          "vendredi",
          "Sag, wann: vendredi soir."
        ]
      ],
      "avoid": [
        [
          "je te invite|je invite",
          "Vor einem Vokal: je t’invite."
        ],
        [
          "à le restaurant",
          "Aus à + le wird au."
        ]
      ]
    },
    {
      "id": "A2L10-s3",
      "goal": "Ausrufe mit quel / quelle und Präpositionen wie au / à la richtig verwenden.",
      "de": "Ruf mit quelle aus: Was für eine gute Nachricht!",
      "model": "Quelle bonne nouvelle !",
      "need": [
        [
          "quelle (bonne|belle|super|grande) nouvelle",
          "nouvelle ist weiblich: Quelle bonne nouvelle !"
        ]
      ],
      "avoid": [
        [
          "quel (bonne|belle|bon)|quelle bon",
          "nouvelle ist weiblich: quelle bonne."
        ]
      ],
      "min": 3
    }
  ],
  "11": [
    {
      "id": "A2L11-s1",
      "goal": "Preise pro Kilo oder Stück verstehen und vergleichen.",
      "de": "Schreib, dass die Tomaten drei Euro pro Kilo kosten.",
      "model": "Les tomates coûtent trois euros le kilo.",
      "need": [
        [
          "tomates (coûtent|sont à|font)",
          "Mehrere Tomaten: les tomates coûtent."
        ],
        [
          "trois|3",
          "Nenne den Preis: trois euros."
        ],
        [
          "(le|du|au|par) kilo",
          "Der Preis gilt pro Kilo: trois euros le kilo."
        ]
      ],
      "avoid": [
        [
          "tomates coûte",
          "Plural: les tomates coûtent."
        ],
        [
          "pour kilo",
          "Pro Kilo heißt: le kilo."
        ]
      ]
    },
    {
      "id": "A2L11-s2",
      "goal": "Mit ne … que und seulement „nur“ ausdrücken.",
      "de": "Schreib mit ne … que: Du nimmst nur eine Flasche Wasser.",
      "model": "Je ne prends qu’une bouteille d’eau.",
      "need": [
        [
          "(ne (prends|veux)|n'achète) qu'une",
          "Nur heißt hier ne … qu’: je ne prends qu’une …"
        ],
        [
          "bouteille d'eau",
          "Nenne die Flasche: une bouteille d’eau."
        ]
      ],
      "avoid": [
        [
          "que une",
          "Vor einem Vokal: qu’une."
        ],
        [
          "je prends qu",
          "Das ne fehlt: je ne prends qu’une."
        ],
        [
          "seulement",
          "Nimm hier ne … que."
        ]
      ]
    },
    {
      "id": "A2L11-s3",
      "goal": "Sonderangebote und Durchsagen im Supermarkt verstehen.",
      "de": "Schreib, dass die Eier heute im Angebot sind.",
      "model": "Les œufs sont en promotion aujourd’hui.",
      "need": [
        [
          "oeufs",
          "Mehrere Eier: les œufs."
        ],
        [
          "sont",
          "Plural: sont."
        ],
        [
          "en promotion|en promo",
          "Im Angebot heißt: en promotion."
        ],
        [
          "aujourd'hui",
          "Sag, wann: aujourd’hui."
        ]
      ],
      "avoid": [
        [
          "dans l'offre|dans la promotion",
          "Im Angebot heißt: en promotion."
        ]
      ]
    }
  ],
  "12": [
    {
      "id": "A2L12-s1",
      "goal": "Absagen, sich entschuldigen und einen Grund nennen.",
      "de": "Sag mit Bedauern ab: Es tut dir leid, du kannst morgen nicht kommen.",
      "model": "Je suis désolé, mais je ne pourrai pas venir demain.",
      "need": [
        [
          "désolée?|excuse|pardon|regrette",
          "Entschuldige dich zuerst: Je suis désolé."
        ],
        [
          "ne (pourrai|peux) pas venir|ne vais pas pouvoir venir",
          "Sag ab: je ne pourrai pas venir."
        ],
        [
          "demain",
          "Sag, wann: demain."
        ]
      ],
      "avoid": [
        [
          "je (pourrai|peux) pas",
          "Das ne gehört dazu: je ne pourrai pas."
        ]
      ]
    },
    {
      "id": "A2L12-s2",
      "goal": "Absagen, sich entschuldigen und einen Grund nennen.",
      "de": "Nenne den Grund mit parce que: Du kommst nicht, weil du Fieber hast.",
      "model": "Je ne viens pas parce que j’ai de la fièvre.",
      "need": [
        [
          "parce que|parce qu'",
          "Verbinde mit parce que."
        ],
        [
          "j'ai (de la|la) fièvre",
          "Fieber haben: j’ai de la fièvre."
        ]
      ],
      "avoid": [
        [
          "je suis fièvre|je ai",
          "Fieber haben: j’ai de la fièvre."
        ]
      ]
    },
    {
      "id": "A2L12-s3",
      "goal": "Einen Termin verschieben und auf Entschuldigungen reagieren.",
      "de": "Schlag vor, den Termin auf nächsten Donnerstag zu verschieben.",
      "model": "On peut reporter à jeudi prochain ?",
      "need": [
        [
          "on peut|on pourrait|nous pouvons|tu peux|je propose|je voudrais|j'aimerais|peut on",
          "Formuliere einen Vorschlag: On peut …"
        ],
        [
          "(reporter|remettre|déplacer) ~(à|au) jeudi",
          "Verschieben auf: reporter à jeudi."
        ],
        [
          "prochain",
          "Nächsten Donnerstag: jeudi prochain."
        ]
      ],
      "avoid": [
        [
          "reporter jeudi",
          "Mit Präposition: reporter à jeudi."
        ]
      ]
    }
  ],
  "13": [
    {
      "id": "A2L13-s1",
      "goal": "Einen Arzttermin vereinbaren und Beschwerden beschreiben.",
      "de": "Ruf in der Praxis an und bitte höflich um einen Termin.",
      "model": "Bonjour, je voudrais prendre rendez-vous, s’il vous plaît.",
      "need": [
        [
          "je voudrais|j'aimerais|je peux|je pourrais|puis je|je souhaite",
          "Bitte höflich: je voudrais …"
        ],
        [
          "(prendre|avoir) (un )?rendez vous",
          "Einen Termin vereinbaren: prendre rendez-vous."
        ]
      ],
      "avoid": [
        [
          "faire (un )?rendez vous",
          "Im Französischen nimmt man ihn: prendre rendez-vous."
        ]
      ]
    },
    {
      "id": "A2L13-s2",
      "goal": "Ausdrücke wie avoir mal à, en raison de, en cas de verwenden.",
      "de": "Beschreib: Du hast seit gestern Kopfschmerzen.",
      "model": "J’ai mal à la tête depuis hier.",
      "need": [
        [
          "j'ai ~mal à la tête",
          "Kopfschmerzen: j’ai mal à la tête."
        ],
        [
          "depuis hier",
          "Seit gestern: depuis hier."
        ]
      ],
      "avoid": [
        [
          "mal au tête|mal à le",
          "tête ist weiblich: mal à la tête."
        ],
        [
          "je suis mal",
          "Schmerzen hat man: j’ai mal."
        ]
      ]
    },
    {
      "id": "A2L13-s3",
      "goal": "Ausdrücke wie avoir mal à, en raison de, en cas de verwenden.",
      "de": "Schreib wie auf einer Bandansage: Im Notfall rufen Sie die 15 an.",
      "model": "En cas d’urgence, appelez le 15.",
      "need": [
        [
          "en cas d'urgence",
          "Im Notfall: en cas d’urgence."
        ],
        [
          "appelez|téléphonez|composez",
          "Sprich die Anrufer an: appelez."
        ],
        [
          "15|quinze",
          "Nenne die Nummer: le 15."
        ]
      ],
      "avoid": [
        [
          "en cas de urgence",
          "Vor einem Vokal: d’urgence."
        ]
      ]
    }
  ],
  "14": [
    {
      "id": "A2L14-s1",
      "goal": "Fahrkarten kaufen und nach Gleis, Anschluss und Verspätung fragen.",
      "de": "Am Schalter: Du möchtest eine einfache Fahrkarte nach Lyon.",
      "model": "Je voudrais un aller simple pour Lyon, s’il vous plaît.",
      "need": [
        [
          "aller simple",
          "Nur hin: un aller simple."
        ],
        [
          "pour lyon",
          "Das Ziel: pour Lyon."
        ]
      ],
      "avoid": [
        [
          "aller retour",
          "Du willst nur hin: un aller simple."
        ],
        [
          "aller simple à lyon",
          "Das Ziel steht mit pour: pour Lyon."
        ]
      ]
    },
    {
      "id": "A2L14-s2",
      "goal": "Fahrkarten kaufen und nach Gleis, Anschluss und Verspätung fragen.",
      "de": "Frag, von welchem Gleis der Zug nach Lyon abfährt.",
      "model": "De quel quai part le train pour Lyon ?",
      "need": [
        [
          "quel quai|quelle voie",
          "Frag nach dem Gleis: de quel quai oder de quelle voie."
        ],
        [
          "train",
          "Sag, worum es geht: le train."
        ],
        [
          "lyon",
          "Nenne das Ziel: Lyon."
        ]
      ],
      "avoid": [
        [
          "quelle quai|quel voie",
          "quai ist männlich, voie ist weiblich: quel quai, quelle voie."
        ]
      ]
    },
    {
      "id": "A2L14-s3",
      "goal": "Ankündigungen im futur simple und mit en raison de verstehen.",
      "de": "Schreib wie eine Durchsage: Wegen eines Streiks wird der Zug 30 Minuten Verspätung haben.",
      "model": "En raison d’une grève, le train aura trente minutes de retard.",
      "need": [
        [
          "en raison d'une grève",
          "Wegen eines Streiks: en raison d’une grève."
        ],
        [
          "aura",
          "Durchsagen stehen im Futur: le train aura."
        ],
        [
          "(trente|30) minutes de retard",
          "Die Verspätung: trente minutes de retard."
        ]
      ],
      "avoid": [
        [
          "en raison de une",
          "Vor einem Vokal: d’une."
        ],
        [
          "a trente minutes|a 30 minutes",
          "Durchsagen stehen im Futur: le train aura."
        ]
      ]
    }
  ],
  "15": [
    {
      "id": "A2L15-s1",
      "goal": "être prié(e) de + Infinitiv und en raison de verwenden.",
      "de": "Schreib wie eine Durchsage: Der Fahrer wird gebeten, sein Auto wegzufahren.",
      "model": "Le conducteur est prié de déplacer sa voiture.",
      "need": [
        [
          "conducteur|propriétaire",
          "Nenne den Fahrer: le conducteur."
        ],
        [
          "est prié de",
          "Wird gebeten: est prié de."
        ],
        [
          "déplacer|enlever|retirer",
          "Wegfahren: déplacer."
        ],
        [
          "voiture|véhicule",
          "Nenne das Auto: sa voiture."
        ]
      ],
      "avoid": [
        [
          "est prié à|est prié déplacer",
          "Danach folgt de + Infinitiv: est prié de déplacer."
        ],
        [
          "est prié de (déplace|déplacé)",
          "Nach de steht der Infinitiv: déplacer."
        ]
      ]
    },
    {
      "id": "A2L15-s2",
      "goal": "être prié(e) de + Infinitiv und en raison de verwenden.",
      "de": "Schreib mit en raison de: Wegen eines Unfalls gibt es einen Stau auf der A7.",
      "model": "En raison d’un accident, il y a un bouchon sur l’A7.",
      "need": [
        [
          "en raison d'un accident",
          "Wegen eines Unfalls: en raison d’un accident."
        ],
        [
          "bouchon|embouteillage",
          "Stau: un bouchon."
        ],
        [
          "sur l'a7|sur l'autoroute a7",
          "Auf der Autobahn: sur l’A7."
        ]
      ],
      "avoid": [
        [
          "en raison de un",
          "Vor einem Vokal: d’un."
        ]
      ]
    },
    {
      "id": "A2L15-s3",
      "goal": "Verkehrsmeldungen im Radio verstehen und die richtige Handlung ableiten.",
      "de": "Schreib im Futur: Ihr kommt ungefähr um 20 Uhr an.",
      "model": "Nous arriverons vers vingt heures.",
      "need": [
        [
          "nous arriverons|on arrivera",
          "Im Futur: nous arriverons."
        ],
        [
          "vers (vingt heures|20 heures|20 h|20h)|à peu près à (vingt heures|20 heures|20 h|20h)",
          "Ungefähr um 20 Uhr: vers vingt heures."
        ]
      ],
      "avoid": [
        [
          "nous arrivons",
          "Das Ankommen liegt in der Zukunft: nous arriverons."
        ]
      ]
    }
  ],
  "16": [
    {
      "id": "A2L16-s1",
      "goal": "Wetter in Vergangenheit, Gegenwart und Zukunft beschreiben.",
      "de": "Schreib im passé composé: Gestern hat es den ganzen Tag geregnet.",
      "model": "Hier, il a plu toute la journée.",
      "need": [
        [
          "hier",
          "Sag, wann: hier."
        ],
        [
          "il a plu",
          "Das Partizip von pleuvoir ist plu: il a plu."
        ],
        [
          "toute la journée",
          "Den ganzen Tag: toute la journée."
        ]
      ],
      "avoid": [
        [
          "il a pleuvé|il a plut",
          "Das Partizip von pleuvoir ist plu: il a plu."
        ]
      ]
    },
    {
      "id": "A2L16-s2",
      "goal": "Wetter in Vergangenheit, Gegenwart und Zukunft beschreiben.",
      "de": "Schreib im Präsens: Heute ist es grau und kühl.",
      "model": "Aujourd’hui, il fait gris et frais.",
      "need": [
        [
          "aujourd'hui",
          "Sag, wann: aujourd’hui."
        ],
        [
          "il fait (gris|frais)",
          "Wetter steht mit il fait: il fait gris."
        ],
        [
          "gris",
          "Grau heißt: gris."
        ],
        [
          "frais",
          "Kühl heißt: frais."
        ]
      ],
      "avoid": [
        [
          "il est (gris|frais)",
          "Wetter steht mit il fait: il fait gris."
        ]
      ]
    },
    {
      "id": "A2L16-s3",
      "goal": "Tageszeitangaben wie en fin de matinée, en début d’après-midi verwenden.",
      "de": "Schreib im futur simple: Morgen wird es am Ende des Vormittags schön.",
      "model": "Demain, il fera beau en fin de matinée.",
      "need": [
        [
          "demain",
          "Sag, wann: demain."
        ],
        [
          "il fera beau",
          "Im futur simple: il fera beau."
        ],
        [
          "en fin de matinée",
          "Am Ende des Vormittags: en fin de matinée."
        ]
      ],
      "avoid": [
        [
          "il va faire",
          "Hier ist das futur simple gefragt: il fera."
        ],
        [
          "à la fin de la matinée",
          "Im Wetterbericht kürzer: en fin de matinée."
        ]
      ]
    }
  ],
  "17": [
    {
      "id": "A2L17-s1",
      "goal": "Die eigene Meinung äußern, zustimmen und widersprechen.",
      "de": "Sag deine Meinung: Du findest, dass das Handy praktisch ist.",
      "model": "Je trouve que le portable est pratique.",
      "need": [
        [
          "je trouve (que|qu')|je pense (que|qu')|à mon avis|selon moi",
          "Leite deine Meinung ein: Je trouve que …"
        ],
        [
          "portable|téléphone|smartphone",
          "Nenne das Handy: le portable."
        ],
        [
          "pratique",
          "Sag, wie du es findest: pratique."
        ]
      ],
      "avoid": [
        [
          "je trouve le portable est",
          "Nach je trouve steht que: je trouve que le portable …"
        ]
      ]
    },
    {
      "id": "A2L17-s2",
      "goal": "Mit ne … plus, avoir envie de und ça me gêne arbeiten.",
      "de": "Schreib: Im Restaurant stört es dich.",
      "model": "Ça me gêne au restaurant.",
      "need": [
        [
          "(ça|cela) me gêne",
          "Es stört mich: ça me gêne."
        ],
        [
          "au restaurant",
          "Es heißt: au restaurant."
        ]
      ],
      "avoid": [
        [
          "ça gêne moi",
          "Das Pronomen steht vor dem Verb: ça me gêne."
        ]
      ]
    },
    {
      "id": "A2L17-s3",
      "goal": "Die eigene Meinung äußern, zustimmen und widersprechen.",
      "de": "Widersprich: Du bist nicht einverstanden. Man muss es im Kino ausschalten.",
      "model": "Je ne suis pas d’accord : il faut l’éteindre au cinéma.",
      "need": [
        [
          "je ne suis pas ~d'accord",
          "Widersprich: Je ne suis pas d’accord."
        ],
        [
          "il faut l'éteindre|il faut éteindre",
          "Man muss es ausschalten: il faut l’éteindre."
        ],
        [
          "au cinéma",
          "Es heißt: au cinéma."
        ]
      ],
      "avoid": [
        [
          "je suis pas d'accord",
          "Das ne gehört dazu: je ne suis pas d’accord."
        ]
      ],
      "min": 6
    },
    {
      "id": "A2L17-s4",
      "goal": "Mit ne … plus, avoir envie de und ça me gêne arbeiten.",
      "de": "Schreib mit ne … plus: Dein Großvater hat kein Handy mehr.",
      "model": "Mon grand-père n’a plus de portable.",
      "need": [
        [
          "grand père",
          "Nenne ihn: mon grand-père."
        ],
        [
          "n'a plus de",
          "Nicht mehr: n’a plus de."
        ],
        [
          "portable|téléphone|smartphone",
          "Nenne das Handy: portable."
        ]
      ],
      "avoid": [
        [
          "n'a plus (un|le|mon|son)",
          "Nach ne … plus steht de: n’a plus de portable."
        ],
        [
          "(grand père|il) a plus de",
          "Das n’ gehört dazu: n’a plus de."
        ]
      ]
    }
  ],
  "18": [
    {
      "id": "A2L18-s1",
      "goal": "Anteile und Entwicklungen ausdrücken: … sur …, pour cent, de plus en plus, augmenter, baisser.",
      "de": "Schreib wie in einer Meldung: Immer mehr Jugendliche fahren Rad.",
      "model": "De plus en plus de jeunes font du vélo.",
      "need": [
        [
          "de plus en plus de jeunes",
          "Immer mehr: de plus en plus de jeunes."
        ],
        [
          "font du vélo|vont à vélo|prennent le vélo|utilisent le vélo",
          "Mehrere fahren: font du vélo."
        ]
      ],
      "avoid": [
        [
          "plus et plus",
          "Immer mehr: de plus en plus."
        ],
        [
          "fait du vélo",
          "Plural: font du vélo."
        ]
      ]
    },
    {
      "id": "A2L18-s2",
      "goal": "Anteile und Entwicklungen ausdrücken: … sur …, pour cent, de plus en plus, augmenter, baisser.",
      "de": "Schreib mit pour cent: 30 Prozent der Jugendlichen gehen mit dem Rad zur Schule.",
      "model": "Trente pour cent des jeunes vont à l’école à vélo.",
      "need": [
        [
          "(trente|30) (pour cent|%)",
          "Prozent: trente pour cent."
        ],
        [
          "des jeunes",
          "Der Jugendlichen: des jeunes."
        ],
        [
          "vont",
          "Plural: vont."
        ],
        [
          "à l'école",
          "Zur Schule: à l’école."
        ],
        [
          "à vélo|en vélo",
          "Mit dem Rad: à vélo."
        ]
      ],
      "avoid": [
        [
          "de les jeunes",
          "Aus de + les wird des."
        ]
      ],
      "min": 6
    },
    {
      "id": "A2L18-s3",
      "goal": "Anteile und Entwicklungen ausdrücken: … sur …, pour cent, de plus en plus, augmenter, baisser.",
      "de": "Schreib mit sur: Zwei von zehn Personen arbeiten zu Hause.",
      "model": "Deux personnes sur dix travaillent à la maison.",
      "need": [
        [
          "(deux|2) personnes sur (dix|10)",
          "Zwei von zehn: deux personnes sur dix."
        ],
        [
          "travaillent",
          "Plural: travaillent."
        ],
        [
          "à la maison|chez elles|à domicile",
          "Zu Hause: à la maison."
        ]
      ],
      "avoid": [
        [
          "personnes de dix",
          "Anteile stehen mit sur: deux personnes sur dix."
        ]
      ]
    },
    {
      "id": "A2L18-s4",
      "goal": "Anteile und Entwicklungen ausdrücken: … sur …, pour cent, de plus en plus, augmenter, baisser.",
      "de": "Schreib: Die Zahl der Radwege ist gestiegen.",
      "model": "Le nombre de pistes cyclables a augmenté.",
      "need": [
        [
          "le nombre de",
          "Die Zahl: le nombre de."
        ],
        [
          "pistes",
          "Radwege: des pistes cyclables."
        ],
        [
          "a ~augmenté",
          "Ist gestiegen heißt hier: a augmenté."
        ]
      ],
      "avoid": [
        [
          "est augmenté",
          "augmenter steht mit avoir: a augmenté."
        ],
        [
          "a augmentée",
          "Mit avoir bleibt das Partizip ohne -e: a augmenté."
        ]
      ]
    }
  ],
  "19": [
    {
      "id": "A2L19-s1",
      "goal": "Orte mit dem Superlativ beschreiben (le plus, le moins, le meilleur).",
      "de": "Schreib mit dem Superlativ: Dieses Schloss ist das bekannteste der Region.",
      "model": "Ce château est le plus connu de la région.",
      "need": [
        [
          "château",
          "Nenne das Schloss: ce château."
        ],
        [
          "le plus (connu|célèbre)",
          "Superlativ: le plus connu."
        ],
        [
          "de la région|de ma région|de notre région",
          "Der Region: de la région."
        ]
      ],
      "avoid": [
        [
          "la plus connue",
          "château ist männlich: le plus connu."
        ],
        [
          "le plus connu dans",
          "Nach dem Superlativ steht de: de la région."
        ]
      ]
    },
    {
      "id": "A2L19-s2",
      "goal": "Orte mit dem Superlativ beschreiben (le plus, le moins, le meilleur).",
      "de": "Schreib: Der beste Moment ist im September.",
      "model": "Le meilleur moment, c’est en septembre.",
      "need": [
        [
          "le meilleur moment|la meilleure période|la meilleure saison",
          "Der beste: le meilleur moment."
        ],
        [
          "en septembre",
          "Im September: en septembre."
        ]
      ],
      "avoid": [
        [
          "le plus bon|la plus bonne",
          "Es heißt meilleur: le meilleur moment."
        ],
        [
          "au septembre|dans septembre",
          "Im September: en septembre."
        ]
      ]
    },
    {
      "id": "A2L19-s3",
      "goal": "Aktivitäten mit on peut / il faut + Infinitiv empfehlen.",
      "de": "Empfiehl mit on peut: Man kann in den Alpen wandern.",
      "model": "On peut faire de la randonnée dans les Alpes.",
      "need": [
        [
          "on peut",
          "Man kann: on peut."
        ],
        [
          "faire de la randonnée|faire une randonnée|faire des randonnées|randonner",
          "Wandern: faire de la randonnée."
        ],
        [
          "dans les alpes",
          "In den Alpen: dans les Alpes."
        ]
      ],
      "avoid": [
        [
          "on peut (fait|fais|faites)",
          "Nach on peut steht der Infinitiv: faire."
        ],
        [
          "en les alpes",
          "In den Alpen: dans les Alpes."
        ]
      ]
    },
    {
      "id": "A2L19-s4",
      "goal": "Aktivitäten mit on peut / il faut + Infinitiv empfehlen.",
      "de": "Empfiehl mit il faut: Man muss das Museum besuchen.",
      "model": "Il faut visiter le musée.",
      "need": [
        [
          "il faut",
          "Man muss: il faut."
        ],
        [
          "visiter",
          "Nach il faut steht der Infinitiv: visiter."
        ],
        [
          "musée",
          "Nenne das Museum: le musée."
        ]
      ],
      "avoid": [
        [
          "il faut (visite|visité|visitez)",
          "Nach il faut steht der Infinitiv: visiter."
        ]
      ]
    }
  ],
  "20": [
    {
      "id": "A2L20-s1",
      "goal": "Vorschläge machen, annehmen und ablehnen.",
      "de": "Schlag mit on pourrait vor, am Samstag Rad zu fahren.",
      "model": "Samedi, on pourrait faire du vélo.",
      "need": [
        [
          "samedi",
          "Sag, wann: samedi."
        ],
        [
          "on pourrait",
          "Vorschlag: on pourrait."
        ],
        [
          "faire du vélo",
          "Rad fahren: faire du vélo."
        ]
      ],
      "avoid": [
        [
          "on pourrait (fait|fais)",
          "Nach on pourrait steht der Infinitiv: faire."
        ]
      ]
    },
    {
      "id": "A2L20-s2",
      "goal": "Vorlieben vergleichen und begründen: je préfère … plutôt que …, parce que.",
      "de": "Begründe mit parce que: Ihr fahrt Rad, weil das Wetter schön sein wird.",
      "model": "On fera du vélo parce qu’il fera beau.",
      "need": [
        [
          "parce qu'il (fera|va faire) beau",
          "Begründe im Futur: parce qu’il fera beau."
        ],
        [
          "vélo",
          "Nenne den Plan: du vélo."
        ]
      ],
      "avoid": [
        [
          "parce que il",
          "Vor einem Vokal: parce qu’il."
        ],
        [
          "parce qu'il fait beau",
          "Das Wetter liegt in der Zukunft: il fera beau."
        ]
      ]
    },
    {
      "id": "A2L20-s3",
      "goal": "Vorlieben vergleichen und begründen: je préfère … plutôt que …, parce que.",
      "de": "Du gehst lieber ins Konzert als ins Kino. Nimm je préfère … plutôt que.",
      "model": "Je préfère aller au concert plutôt qu’au cinéma.",
      "need": [
        [
          "je préfère",
          "Lieber: je préfère."
        ],
        [
          "concert ~plutôt (que|qu')",
          "Vergleich: plutôt que."
        ],
        [
          "cinéma",
          "Nenne das Kino: cinéma."
        ]
      ],
      "avoid": [
        [
          "plutôt que au",
          "Vor einem Vokal: plutôt qu’au."
        ],
        [
          "plutôt comme",
          "Es heißt: plutôt que."
        ]
      ]
    },
    {
      "id": "A2L20-s4",
      "goal": "Sich auf zwei Aktivitäten, Zeit und Treffpunkt einigen.",
      "de": "Schlag einen Treffpunkt vor: Ihr trefft euch um 9 Uhr am Bahnhof.",
      "model": "On se retrouve à neuf heures à la gare.",
      "need": [
        [
          "on se (retrouve|voit|rejoint)|nous nous retrouvons",
          "Wir treffen uns: on se retrouve."
        ],
        [
          "à (neuf heures|9 heures|9 h|9h)",
          "Die Uhrzeit: à neuf heures."
        ],
        [
          "(à|devant) la gare",
          "Der Ort: à la gare."
        ]
      ],
      "avoid": [
        [
          "on retrouve",
          "Treffen ist hier reflexiv: on se retrouve."
        ]
      ]
    }
  ],
  "21": [
    {
      "id": "A2L21-s1",
      "goal": "Ratschläge im Imperativ (auch verneint), mit il faut und recommander de geben.",
      "de": "Gib im höflichen Imperativ einen Tipp: Notieren Sie fünf Wörter pro Tag.",
      "model": "Notez cinq mots par jour.",
      "need": [
        [
          "notez|écrivez",
          "Höflicher Imperativ: Notez."
        ],
        [
          "cinq mots|5 mots",
          "Fünf Wörter: cinq mots."
        ],
        [
          "par jour|chaque jour|tous les jours",
          "Pro Tag: par jour."
        ]
      ],
      "avoid": [
        [
          "vous notez|vous écrivez",
          "Der Imperativ steht ohne vous: Notez."
        ],
        [
          "note cinq|note 5",
          "Höflich endet er auf -ez: Notez."
        ]
      ]
    },
    {
      "id": "A2L21-s2",
      "goal": "Ratschläge im Imperativ (auch verneint), mit il faut und recommander de geben.",
      "de": "Gib den Tipp verneint: Übersetzen Sie nicht jedes Wort.",
      "model": "Ne traduisez pas chaque mot.",
      "need": [
        [
          "ne traduisez pas",
          "Verneinter Imperativ: Ne traduisez pas."
        ],
        [
          "chaque mot|tous les mots",
          "Jedes Wort: chaque mot."
        ]
      ],
      "avoid": []
    },
    {
      "id": "A2L21-s3",
      "goal": "Ratschläge im Imperativ (auch verneint), mit il faut und recommander de geben.",
      "de": "Rate mit il faut: Man muss jeden Tag Französisch sprechen.",
      "model": "Il faut parler français tous les jours.",
      "need": [
        [
          "il faut",
          "Man muss: il faut."
        ],
        [
          "parler français|parler le français|parler en français",
          "Nach il faut steht der Infinitiv: parler français."
        ],
        [
          "tous les jours|chaque jour",
          "Jeden Tag: tous les jours."
        ]
      ],
      "avoid": [
        [
          "il faut parle|il faut parlez",
          "Nach il faut steht der Infinitiv: parler."
        ]
      ]
    },
    {
      "id": "A2L21-s4",
      "goal": "Über einen Sprachkurs sprechen: Dauer, Unterkunft, Angebote.",
      "de": "Schreib mit recommander de: Ich empfehle dir, einen Intensivkurs zu machen.",
      "model": "Je te recommande de suivre un cours intensif.",
      "need": [
        [
          "je (te|vous) recommande de",
          "Empfehlen: je te recommande de."
        ],
        [
          "suivre|faire|prendre",
          "Dann der Infinitiv: suivre."
        ],
        [
          "cours",
          "Nenne den Kurs: un cours intensif."
        ]
      ],
      "avoid": [
        [
          "recommande à (suivre|faire|prendre)|recommande (suivre|faire|prendre)",
          "Nach recommander steht de: recommande de suivre."
        ],
        [
          "je recommande te",
          "Das Pronomen steht vor dem Verb: je te recommande."
        ]
      ]
    }
  ],
  "22": [
    {
      "id": "A2L22-s1",
      "goal": "Einen persönlichen Brief mit passender Anrede und Grußformel schreiben.",
      "de": "Beginne einen Brief an Paul und Marie mit Anrede und der Frage, wie es ihnen geht.",
      "model": "Chers Paul et Marie, j’espère que vous allez bien.",
      "need": [
        [
          "chers paul et marie|cher paul et chère marie|chère marie et cher paul",
          "Die Anrede an beide: Chers Paul et Marie."
        ],
        [
          "vous allez bien|allez vous",
          "Frag nach ihnen: j’espère que vous allez bien."
        ]
      ],
      "avoid": [
        [
          "cher paul et marie",
          "An beide: Chers Paul et Marie."
        ],
        [
          "tu vas bien",
          "Du schreibst zwei Personen: vous allez bien."
        ]
      ]
    },
    {
      "id": "A2L22-s2",
      "goal": "Höfliche Bitten mit dem Conditionnel formulieren (pourriez, voudrais, aimerais) und Sätze mit et, mais, parce que verbinden.",
      "de": "Bitte höflich: Könntet ihr eine Sprachschule für mich suchen?",
      "model": "Est-ce que vous pourriez chercher une école de langues pour moi ?",
      "need": [
        [
          "vous pourriez|pourriez vous",
          "Höfliche Bitte im Conditionnel: vous pourriez."
        ],
        [
          "chercher|trouver",
          "Dann der Infinitiv: chercher."
        ],
        [
          "école",
          "Nenne die Schule: une école de langues."
        ]
      ],
      "avoid": [
        [
          "vous pouvez|pouvez vous",
          "Höflicher im Conditionnel: vous pourriez."
        ],
        [
          "pourriez (cherchez|trouvez)",
          "Nach pourriez steht der Infinitiv: chercher."
        ]
      ]
    },
    {
      "id": "A2L22-s3",
      "goal": "Höfliche Bitten mit dem Conditionnel formulieren (pourriez, voudrais, aimerais) und Sätze mit et, mais, parce que verbinden.",
      "de": "Verbinde mit parce que: Du möchtest einen Kurs machen, weil du in Frankreich arbeiten willst.",
      "model": "Je voudrais suivre un cours parce que je veux travailler en France.",
      "need": [
        [
          "je voudrais|j'aimerais",
          "Höflich: je voudrais."
        ],
        [
          "cours",
          "Nenne den Kurs: un cours."
        ],
        [
          "parce que",
          "Verbinde mit parce que."
        ],
        [
          "travailler",
          "Dann der Infinitiv: travailler."
        ],
        [
          "en france",
          "In Frankreich: en France."
        ]
      ],
      "avoid": [
        [
          "à la france|dans la france|au france",
          "In Frankreich: en France."
        ]
      ],
      "min": 7
    },
    {
      "id": "A2L22-s4",
      "goal": "Einen persönlichen Brief mit passender Anrede und Grußformel schreiben.",
      "de": "Beende den Brief: Bedanke dich im Voraus und verabschiede dich.",
      "model": "Merci d’avance et à bientôt !",
      "need": [
        [
          "merci",
          "Bedanke dich: merci d’avance."
        ],
        [
          "à bientôt|je vous embrasse|bises|amicalement|cordialement|bien à vous",
          "Verabschiede dich: à bientôt."
        ]
      ],
      "avoid": [
        [
          "bonjour",
          "Am Briefende verabschiedest du dich: à bientôt."
        ]
      ]
    }
  ],
  "23": [
    {
      "id": "A2L23-s1",
      "goal": "le / la / les, lui / leur, y und en unterscheiden.",
      "de": "Gehst du ins Schwimmbad? Antworte mit y: Ja, jeden Mittwoch.",
      "model": "Oui, j’y vais tous les mercredis.",
      "need": [
        [
          "j'y vais",
          "Ersetze den Ort durch y: j’y vais."
        ],
        [
          "mercredi|mercredis",
          "Sag, wann: tous les mercredis."
        ]
      ],
      "avoid": [
        [
          "je y",
          "Vor einem Vokal: j’y."
        ],
        [
          "je vais à la piscine",
          "Ersetze den Ort durch y: j’y vais."
        ]
      ]
    },
    {
      "id": "A2L23-s2",
      "goal": "le / la / les, lui / leur, y und en unterscheiden.",
      "de": "Isst du Obst? Antworte mit en: Ja, ich esse viel davon.",
      "model": "Oui, j’en mange beaucoup.",
      "need": [
        [
          "j'en mange beaucoup",
          "Ersetze die Früchte durch en: j’en mange beaucoup."
        ]
      ],
      "avoid": [
        [
          "beaucoup de fruits",
          "en ersetzt das Nomen: fruits fällt weg."
        ],
        [
          "je en",
          "Vor einem Vokal: j’en."
        ]
      ],
      "min": 3
    },
    {
      "id": "A2L23-s3",
      "goal": "le / la / les, lui / leur, y und en unterscheiden.",
      "de": "Schreibst du deinen Freunden? Antworte mit leur: Ja, ich schreibe ihnen oft.",
      "model": "Oui, je leur écris souvent.",
      "need": [
        [
          "je leur écris",
          "Ihnen heißt leur: je leur écris."
        ],
        [
          "souvent",
          "Oft: souvent."
        ]
      ],
      "avoid": [
        [
          "je leurs",
          "leur vor dem Verb bekommt kein -s."
        ],
        [
          "je les écris|je lui écris",
          "Mehrere Personen, an die man schreibt: je leur écris."
        ]
      ]
    },
    {
      "id": "A2L23-s4",
      "goal": "Ortsangaben (près de, à côté de, en face de, contre) und Häufigkeitsadverbien (toujours, jamais, quelquefois, ensemble) richtig verwenden.",
      "de": "Schreib mit en face de: Die Bäckerei liegt gegenüber der Post.",
      "model": "La boulangerie est en face de la poste.",
      "need": [
        [
          "boulangerie",
          "Nenne die Bäckerei: la boulangerie."
        ],
        [
          "est|se trouve",
          "Dein Satz braucht ein Verb: est."
        ],
        [
          "en face de la poste",
          "Gegenüber: en face de la poste."
        ]
      ],
      "avoid": [
        [
          "en face la poste",
          "Es heißt: en face de."
        ],
        [
          "en face du poste",
          "poste ist hier weiblich: de la poste."
        ]
      ]
    }
  ],
  "24": [
    {
      "id": "A2L24-s1",
      "goal": "Strategien für richtig/falsch, Zuordnung, Lückentext, Brief und Gespräch anwenden.",
      "de": "Deine Strategie: Du liest zuerst die Fragen.",
      "model": "Je lis d’abord les questions.",
      "need": [
        [
          "je lis",
          "Ich lese: je lis."
        ],
        [
          "d'abord",
          "Zuerst: d’abord."
        ],
        [
          "les questions",
          "Die Fragen: les questions."
        ]
      ],
      "avoid": [
        [
          "je lit|je lire",
          "Ich lese: je lis."
        ]
      ]
    },
    {
      "id": "A2L24-s2",
      "goal": "Strategien für richtig/falsch, Zuordnung, Lückentext, Brief und Gespräch anwenden.",
      "de": "Deine Strategie: Du suchst die Schlüsselwörter im Text.",
      "model": "Je cherche les mots-clés dans le texte.",
      "need": [
        [
          "je cherche",
          "Ich suche: je cherche."
        ],
        [
          "mots clés",
          "Schlüsselwörter: les mots-clés."
        ],
        [
          "dans le texte",
          "Im Text: dans le texte."
        ]
      ],
      "avoid": [
        [
          "je cherche pour",
          "chercher steht ohne Präposition: je cherche les mots-clés."
        ]
      ]
    },
    {
      "id": "A2L24-s3",
      "goal": "Strategien für richtig/falsch, Zuordnung, Lückentext, Brief und Gespräch anwenden.",
      "de": "Deine Strategie: Im Brief behandelst du drei Punkte.",
      "model": "Dans ma lettre, je traite trois points.",
      "need": [
        [
          "dans ma lettre|dans la lettre",
          "Im Brief: dans ma lettre."
        ],
        [
          "je traite|je réponds à",
          "Ich behandle: je traite."
        ],
        [
          "trois points|3 points",
          "Drei Punkte: trois points."
        ]
      ],
      "avoid": [
        [
          "je traites",
          "Nach je ohne -s: je traite."
        ]
      ]
    },
    {
      "id": "A2L24-s4",
      "goal": "Strategien für richtig/falsch, Zuordnung, Lückentext, Brief und Gespräch anwenden.",
      "de": "Deine Strategie: Du vergisst die Grußformeln nicht.",
      "model": "Je n’oublie pas les formules.",
      "need": [
        [
          "je n'oublie pas",
          "Ich vergesse nicht: je n’oublie pas."
        ],
        [
          "formules?",
          "Die Grußformeln: les formules."
        ]
      ],
      "avoid": [
        [
          "je oublie",
          "Vor einem Vokal: je n’oublie pas."
        ]
      ]
    }
  ]
};
