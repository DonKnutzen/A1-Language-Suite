/* Français A2 lesson checks (generated). */
window.FR_A1_MASTERY_SPECS = {
  "1": {
    "goals": [
      "Sich mit Familienstand, Adresse, Beruf, Sprachen und Hobbys ausführlich vorstellen.",
      "Mit depuis + Präsens sagen, seit wann etwas andauert.",
      "Zusatzfragen der Prüferin oder des Partners verstehen und beantworten."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "J’habite ici ___ cinq ans.",
        "answer": "depuis",
        "o": [
          "depuis",
          "il y a",
          "pendant"
        ],
        "context": "Ich wohne seit fünf Jahren hier.",
        "tag": "depuis",
        "explanation": "J’habite ici depuis cinq ans. = Ich wohne seit fünf Jahren hier."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Je suis arrivé ___ trois ans.",
        "answer": "il y a",
        "o": [
          "il y a",
          "depuis",
          "dans"
        ],
        "context": "Ich bin vor drei Jahren angekommen.",
        "tag": "il y a",
        "explanation": "Je suis arrivé il y a trois ans. = Ich bin vor drei Jahren angekommen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "J’___ le français depuis deux ans.",
        "answer": "apprends",
        "o": [
          "apprends",
          "ai appris",
          "apprenais"
        ],
        "context": "Ich lerne seit zwei Jahren Französisch.",
        "tag": "depuis",
        "explanation": "Was heute noch andauert, steht mit depuis im Präsens: J’apprends le français depuis deux ans."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "___ quand travaillez-vous ici ?",
        "answer": "Depuis",
        "o": [
          "Depuis",
          "Il y a",
          "Pendant"
        ],
        "context": "Seit wann arbeiten Sie hier?",
        "tag": "depuis",
        "explanation": "Depuis quand travaillez-vous ici ? = Seit wann arbeiten Sie hier?"
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Elle ___ à Lyon depuis 2020.",
        "answer": "habite",
        "o": [
          "habite",
          "a habité",
          "habitait"
        ],
        "context": "Sie wohnt seit 2020 in Lyon.",
        "tag": "depuis",
        "explanation": "Sie wohnt heute noch dort, deshalb Präsens: Elle habite à Lyon depuis 2020."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Sophie : « Je suis ___. »",
        "answer": "mariée",
        "o": [
          "mariée",
          "marié",
          "mariés"
        ],
        "context": "Sophie: „Ich bin verheiratet.“",
        "tag": "Familienstand",
        "explanation": "Sophie ist eine Frau, deshalb mariée."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je travaille ___ cuisinier.",
        "answer": "comme",
        "o": [
          "comme",
          "pour",
          "en"
        ],
        "context": "Ich arbeite als Koch.",
        "tag": "Beruf",
        "explanation": "Je travaille comme cuisinier. = Ich arbeite als Koch."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Il est ___ : il n’est pas marié.",
        "answer": "célibataire",
        "o": [
          "célibataire",
          "divorcé",
          "veuf"
        ],
        "context": "Er ist ledig: er ist nicht verheiratet.",
        "tag": "Familienstand",
        "explanation": "Célibataire = noch nie verheiratet. Divorcé = geschieden."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je ___ allemand et anglais.",
        "answer": "parle",
        "o": [
          "parle",
          "suis",
          "dis"
        ],
        "context": "Ich spreche Deutsch und Englisch.",
        "tag": "Sprachen",
        "explanation": "Sprachen sprechen: parler + Sprache. Je suis allemand hieße „Ich bin Deutscher“; dire heißt sagen."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Marc est ___ : il travaille à l’hôpital.",
        "answer": "infirmier",
        "o": [
          "infirmier",
          "infirmière",
          "un infirmier"
        ],
        "context": "Marc ist Krankenpfleger: er arbeitet im Krankenhaus.",
        "tag": "Beruf",
        "explanation": "Nach être steht der Beruf ohne Artikel; für einen Mann infirmier."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "Die Prüferin fragt: « Vous êtes mariée ? » Du bist nicht verheiratet und warst es nie.",
        "o": [
          "Non, je suis célibataire.",
          "Non, je suis divorcée.",
          "Oui, je suis mariée."
        ],
        "answer": "Non, je suis célibataire.",
        "explanation": "Célibataire = ledig, noch nie verheiratet. Divorcée hieße geschieden.",
        "tag": "Anwenden",
        "family": "famille",
        "checkKey": "A2L1-context-famille",
        "audio": "Non, je suis célibataire."
      },
      {
        "type": "choice",
        "q": "« J’habite à Lille depuis quatre ans. » Was stimmt?",
        "o": [
          "Die Person wohnt noch heute in Lille.",
          "Die Person ist vor vier Jahren aus Lille weggezogen.",
          "Die Person zieht in vier Jahren nach Lille."
        ],
        "answer": "Die Person wohnt noch heute in Lille.",
        "explanation": "Depuis + Präsens: etwas dauert bis heute an.",
        "tag": "Anwenden",
        "family": "depuis",
        "checkKey": "A2L1-context-depuis"
      },
      {
        "type": "choice",
        "q": "Du möchtest wissen, seit wann dein Partner Französisch lernt.",
        "o": [
          "Depuis quand apprenez-vous le français ?",
          "Quand avez-vous appris le français ?",
          "Pourquoi apprenez-vous le français ?"
        ],
        "answer": "Depuis quand apprenez-vous le français ?",
        "explanation": "Depuis quand …? fragt nach dem Beginn bis heute.",
        "tag": "Anwenden",
        "family": "question",
        "checkKey": "A2L1-context-question",
        "audio": "Depuis quand apprenez-vous le français ?"
      },
      {
        "type": "choice",
        "q": "« Je suis arrivé en France il y a deux ans. » Was bedeutet il y a hier?",
        "o": [
          "vor",
          "seit",
          "in"
        ],
        "answer": "vor",
        "explanation": "Il y a + Zeitraum bedeutet „vor“ und steht mit dem passé composé.",
        "tag": "Anwenden",
        "family": "ilya",
        "checkKey": "A2L1-context-ilya"
      },
      {
        "type": "choice",
        "q": "Du sagst, dass du als Verkäufer arbeitest.",
        "o": [
          "Je travaille comme vendeur.",
          "Je travaille comme un vendeur.",
          "Je travaille pour vendeur."
        ],
        "answer": "Je travaille comme vendeur.",
        "explanation": "Travailler comme + Beruf ohne Artikel.",
        "tag": "Anwenden",
        "family": "metier",
        "checkKey": "A2L1-context-metier",
        "audio": "Je travaille comme vendeur."
      },
      {
        "type": "choice",
        "q": "Die Prüferin fragt: « Qu’est-ce que vous faites pendant votre temps libre ? » Welche Antwort passt?",
        "o": [
          "Je fais du vélo et je lis beaucoup.",
          "Je travaille dans un bureau.",
          "J’habite près de la gare."
        ],
        "answer": "Je fais du vélo et je lis beaucoup.",
        "explanation": "Temps libre = Freizeit; gefragt sind Hobbys.",
        "tag": "Anwenden",
        "family": "loisirs",
        "checkKey": "A2L1-context-loisirs"
      },
      {
        "type": "choice",
        "q": "« Mon mari et moi, nous avons trois enfants : deux filles et un fils. » Wie viele Söhne hat die Familie?",
        "o": [
          "einen",
          "zwei",
          "drei"
        ],
        "answer": "einen",
        "explanation": "Un fils = ein Sohn; deux filles = zwei Töchter.",
        "tag": "Anwenden",
        "family": "enfants",
        "checkKey": "A2L1-context-enfants"
      },
      {
        "type": "choice",
        "q": "Du nennst deine Adresse.",
        "o": [
          "J’habite 8, rue Victor Hugo.",
          "J’habite à 8, rue Victor Hugo.",
          "J’habite dans la 8 rue Victor Hugo."
        ],
        "answer": "J’habite 8, rue Victor Hugo.",
        "explanation": "Vor Hausnummer und Straße steht keine Präposition.",
        "tag": "Anwenden",
        "family": "adresse",
        "checkKey": "A2L1-context-adresse",
        "audio": "J’habite 8, rue Victor Hugo."
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "J’habite à Bordeaux ___ six ans.",
        "answer": "depuis",
        "accept": [],
        "context": "Du wohnst seit sechs Jahren in Bordeaux.",
        "explanation": "J’habite à Bordeaux depuis six ans.",
        "audio": "J’habite à Bordeaux depuis six ans.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:depuis",
        "checkKey": "A2L1-transfer-depuis-0"
      },
      {
        "type": "gap",
        "prompt": "Je joue au tennis ___ dix ans.",
        "answer": "depuis",
        "accept": [],
        "context": "Du spielst seit zehn Jahren Tennis.",
        "explanation": "Je joue au tennis depuis dix ans.",
        "audio": "Je joue au tennis depuis dix ans.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:depuis",
        "checkKey": "A2L1-transfer-depuis-1"
      },
      {
        "type": "gap",
        "prompt": "J’___ le français depuis un an. (apprendre)",
        "answer": "apprends",
        "accept": [],
        "context": "Du lernst seit einem Jahr Französisch. Setze die passende Form ein.",
        "explanation": "J’apprends le français depuis un an.",
        "audio": "J’apprends le français depuis un an.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:present",
        "checkKey": "A2L1-transfer-present-2"
      },
      {
        "type": "gap",
        "prompt": "Nous ___ ici depuis 2018. (travailler)",
        "answer": "travaillons",
        "accept": [],
        "context": "Ihr arbeitet seit 2018 hier. Setze die passende Form ein.",
        "explanation": "Nous travaillons ici depuis 2018.",
        "audio": "Nous travaillons ici depuis 2018.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:present",
        "checkKey": "A2L1-transfer-present-3"
      },
      {
        "type": "gap",
        "prompt": "Elle est partie ___ deux jours.",
        "answer": "il y a",
        "accept": [],
        "context": "Sie ist vor zwei Tagen abgereist.",
        "explanation": "Elle est partie il y a deux jours.",
        "audio": "Elle est partie il y a deux jours.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:ilya",
        "checkKey": "A2L1-transfer-ilya-4"
      },
      {
        "type": "gap",
        "prompt": "Claire est ___ : elle a un mari. (marié)",
        "answer": "mariée",
        "accept": [],
        "context": "Claire ist verheiratet. Achte auf die weibliche Form.",
        "explanation": "Claire est mariée : elle a un mari.",
        "audio": "Claire est mariée : elle a un mari.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:etat",
        "checkKey": "A2L1-transfer-etat-5"
      },
      {
        "type": "gap",
        "prompt": "Il travaille ___ professeur.",
        "answer": "comme",
        "accept": [],
        "context": "Er arbeitet als Lehrer.",
        "explanation": "Il travaille comme professeur.",
        "audio": "Il travaille comme professeur.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:metier",
        "checkKey": "A2L1-transfer-metier-6"
      },
      {
        "type": "gap",
        "prompt": "___ quand habitez-vous à Paris ?",
        "answer": "Depuis",
        "accept": [],
        "context": "Frage, seit wann jemand in Paris wohnt.",
        "explanation": "Depuis quand habitez-vous à Paris ?",
        "audio": "Depuis quand habitez-vous à Paris ?",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:question",
        "checkKey": "A2L1-transfer-question-7"
      }
    ]
  },
  "2": {
    "goals": [
      "Eine Wohnung mit Zimmern, Stockwerk und Lage beschreiben.",
      "Mit plus / moins / aussi … que vergleichen; meilleur korrekt verwenden.",
      "Fragen zur Wohnung im Gespräch stellen und beantworten."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Mon appartement est ___ grand que l’ancien. (+)",
        "answer": "plus",
        "o": [
          "plus",
          "moins",
          "aussi"
        ],
        "context": "Meine Wohnung ist größer als die alte.",
        "tag": "Komparativ",
        "explanation": "Mon appartement est plus grand que l’ancien. = Meine Wohnung ist größer als die alte."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Le loyer est ___ cher qu’avant. (−)",
        "answer": "moins",
        "o": [
          "moins",
          "plus",
          "aussi"
        ],
        "context": "Die Miete ist billiger als vorher.",
        "tag": "Komparativ",
        "explanation": "Le loyer est moins cher qu’avant. = Die Miete ist billiger als vorher."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "La chambre est ___ calme que le salon. (=)",
        "answer": "aussi",
        "o": [
          "aussi",
          "plus",
          "moins"
        ],
        "context": "Das Schlafzimmer ist genauso ruhig wie das Wohnzimmer.",
        "tag": "Komparativ",
        "explanation": "La chambre est aussi calme que le salon. = Das Schlafzimmer ist genauso ruhig wie das Wohnzimmer."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "La cuisine est plus grande ___ la salle de bains.",
        "answer": "que",
        "o": [
          "que",
          "comme",
          "de"
        ],
        "context": "Die Küche ist größer als das Bad.",
        "tag": "Komparativ",
        "explanation": "La cuisine est plus grande que la salle de bains. = Die Küche ist größer als das Bad."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Ce quartier est ___ pour les enfants.",
        "answer": "meilleur",
        "o": [
          "meilleur",
          "plus bon",
          "meilleure"
        ],
        "context": "Dieses Viertel ist besser für Kinder.",
        "tag": "meilleur",
        "explanation": "Bon → meilleur: Plus bon gibt es nicht. Le quartier ist männlich, deshalb meilleur ohne -e."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "La terrasse est plus ___ que le balcon.",
        "answer": "grande",
        "o": [
          "grande",
          "grand",
          "grands"
        ],
        "context": "Die Terrasse ist größer als der Balkon.",
        "tag": "Angleichung",
        "explanation": "La terrasse ist weiblich: grande."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "J’habite ___ troisième étage.",
        "answer": "au",
        "o": [
          "au",
          "à la",
          "dans le"
        ],
        "context": "Ich wohne im dritten Stock.",
        "tag": "Stockwerk",
        "explanation": "J’habite au troisième étage. = Ich wohne im dritten Stock."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Il n’y a pas ___ ascenseur.",
        "answer": "d’",
        "o": [
          "d’",
          "un",
          "l’"
        ],
        "context": "Es gibt keinen Aufzug.",
        "tag": "Verneinung",
        "explanation": "Il n’y a pas d’ascenseur. = Es gibt keinen Aufzug."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "L’appartement a trois ___ : un salon et deux chambres.",
        "answer": "pièces",
        "o": [
          "pièces",
          "étages",
          "fenêtres"
        ],
        "context": "Die Wohnung hat drei Zimmer.",
        "tag": "Wohnung",
        "explanation": "L’appartement a trois pièces : un salon et deux chambres. = Die Wohnung hat drei Zimmer."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "___ un grand balcon.",
        "answer": "Il y a",
        "o": [
          "Il y a",
          "C’est",
          "Il est"
        ],
        "context": "Es gibt einen großen Balkon.",
        "tag": "il y a",
        "explanation": "Il y a un grand balcon. = Es gibt einen großen Balkon."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "« Avant, mon loyer était de 900 euros. Maintenant, je paie 750 euros. » Welcher Satz stimmt?",
        "o": [
          "Le loyer est moins cher maintenant.",
          "Le loyer est plus cher maintenant.",
          "Le loyer est aussi cher qu’avant."
        ],
        "answer": "Le loyer est moins cher maintenant.",
        "explanation": "750 € sind weniger als 900 €: moins cher.",
        "tag": "Anwenden",
        "family": "comparer",
        "checkKey": "A2L2-context-comparer",
        "audio": "Le loyer est moins cher maintenant."
      },
      {
        "type": "choice",
        "q": "Die alte Wohnung hatte 50 m², die neue hat 50 m². Welcher Satz passt?",
        "o": [
          "Le nouvel appartement est aussi grand que l’ancien.",
          "Le nouvel appartement est plus grand que l’ancien.",
          "Le nouvel appartement est moins grand que l’ancien."
        ],
        "answer": "Le nouvel appartement est aussi grand que l’ancien.",
        "explanation": "Gleich groß: aussi … que.",
        "tag": "Anwenden",
        "family": "egalite",
        "checkKey": "A2L2-context-egalite"
      },
      {
        "type": "choice",
        "q": "Du findest dein neues Viertel besser.",
        "o": [
          "Mon nouveau quartier est meilleur.",
          "Mon nouveau quartier est plus bon.",
          "Mon nouveau quartier est plus bien."
        ],
        "answer": "Mon nouveau quartier est meilleur.",
        "explanation": "Bon hat den eigenen Komparativ meilleur.",
        "tag": "Anwenden",
        "family": "meilleur",
        "checkKey": "A2L2-context-meilleur",
        "audio": "Mon nouveau quartier est meilleur."
      },
      {
        "type": "choice",
        "q": "« Nous habitons au rez-de-chaussée. » Wo wohnt die Familie?",
        "o": [
          "im Erdgeschoss",
          "im ersten Stock",
          "im Dachgeschoss"
        ],
        "answer": "im Erdgeschoss",
        "explanation": "Le rez-de-chaussée ist das Erdgeschoss.",
        "tag": "Anwenden",
        "family": "etage",
        "checkKey": "A2L2-context-etage"
      },
      {
        "type": "choice",
        "q": "Deine Wohnung hat keinen Balkon.",
        "o": [
          "Il n’y a pas de balcon.",
          "Il n’y a pas un balcon.",
          "Il y a pas balcon."
        ],
        "answer": "Il n’y a pas de balcon.",
        "explanation": "Nach pas wird un zu de.",
        "tag": "Anwenden",
        "family": "negation",
        "checkKey": "A2L2-context-negation",
        "audio": "Il n’y a pas de balcon."
      },
      {
        "type": "choice",
        "q": "« L’appartement a trois pièces : un salon et deux chambres. » Wie viele Schlafzimmer gibt es?",
        "o": [
          "zwei",
          "drei",
          "eins"
        ],
        "answer": "zwei",
        "explanation": "Trois pièces = drei Zimmer insgesamt; davon sind deux chambres Schlafzimmer.",
        "tag": "Anwenden",
        "family": "pieces",
        "checkKey": "A2L2-context-pieces"
      },
      {
        "type": "choice",
        "q": "Dein Partner fragt in der Prüfung nach deiner Wohnung. Welche Frage stellt er?",
        "o": [
          "Votre appartement a combien de pièces ?",
          "Votre appartement a combien pièces ?",
          "Votre appartement a combien des pièces ?"
        ],
        "answer": "Votre appartement a combien de pièces ?",
        "explanation": "Nach einer Anzahl fragt combien de + Nomen ohne Artikel: combien de pièces. Ohne de oder mit des ist die Frage falsch.",
        "tag": "Anwenden",
        "family": "question",
        "checkKey": "A2L2-context-question"
      },
      {
        "type": "choice",
        "q": "Die Küche ist kleiner als das Wohnzimmer.",
        "o": [
          "La cuisine est plus petite que le salon.",
          "La cuisine est plus petit que le salon.",
          "La cuisine est moins petite que le salon."
        ],
        "answer": "La cuisine est plus petite que le salon.",
        "explanation": "La cuisine ist weiblich: petite; kleiner = plus petite.",
        "tag": "Anwenden",
        "family": "accord",
        "checkKey": "A2L2-context-accord",
        "audio": "La cuisine est plus petite que le salon."
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "Paris est ___ grand que Lyon. (+)",
        "answer": "plus",
        "accept": [],
        "context": "Paris ist größer als Lyon.",
        "explanation": "Paris est plus grand que Lyon.",
        "audio": "Paris est plus grand que Lyon.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:plus",
        "checkKey": "A2L2-transfer-plus-0"
      },
      {
        "type": "gap",
        "prompt": "Ce studio est ___ cher que l’appartement. (−)",
        "answer": "moins",
        "accept": [],
        "context": "Diese Einzimmerwohnung ist billiger als die Wohnung.",
        "explanation": "Ce studio est moins cher que l’appartement.",
        "audio": "Ce studio est moins cher que l’appartement.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:moins",
        "checkKey": "A2L2-transfer-moins-1"
      },
      {
        "type": "gap",
        "prompt": "Ma chambre est ___ claire que le salon. (=)",
        "answer": "aussi",
        "accept": [],
        "context": "Mein Schlafzimmer ist genauso hell wie das Wohnzimmer.",
        "explanation": "Ma chambre est aussi claire que le salon.",
        "audio": "Ma chambre est aussi claire que le salon.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:aussi",
        "checkKey": "A2L2-transfer-aussi-2"
      },
      {
        "type": "gap",
        "prompt": "Le jardin est plus grand ___ la terrasse.",
        "answer": "que",
        "accept": [],
        "context": "Der Garten ist größer als die Terrasse.",
        "explanation": "Le jardin est plus grand que la terrasse.",
        "audio": "Le jardin est plus grand que la terrasse.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:que",
        "checkKey": "A2L2-transfer-que-3"
      },
      {
        "type": "gap",
        "prompt": "Cette école est ___ que l’autre. (bon, +)",
        "answer": "meilleure",
        "accept": [],
        "context": "Diese Schule ist besser als die andere. Achte auf die weibliche Form.",
        "explanation": "Cette école est meilleure que l’autre.",
        "audio": "Cette école est meilleure que l’autre.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:meilleur",
        "checkKey": "A2L2-transfer-meilleur-4"
      },
      {
        "type": "gap",
        "prompt": "J’habite ___ cinquième étage.",
        "answer": "au",
        "accept": [],
        "context": "Du wohnst im fünften Stock.",
        "explanation": "J’habite au cinquième étage.",
        "audio": "J’habite au cinquième étage.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:etage",
        "checkKey": "A2L2-transfer-etage-5"
      },
      {
        "type": "gap",
        "prompt": "Il n’y a pas ___ garage.",
        "answer": "de",
        "accept": [],
        "context": "Es gibt keine Garage.",
        "explanation": "Il n’y a pas de garage.",
        "audio": "Il n’y a pas de garage.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:negation",
        "checkKey": "A2L2-transfer-negation-6"
      }
    ]
  },
  "3": {
    "goals": [
      "Nach dem Weg fragen und eine Wegbeschreibung in Schritten verstehen.",
      "Schritte mit d’abord, ensuite, après ordnen und jusqu’à, en face de verwenden.",
      "Den eigenen Weg zur Arbeit mit Verkehrsmittel und Dauer beschreiben."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "___, allez tout droit. (zuerst)",
        "answer": "D’abord",
        "o": [
          "D’abord",
          "Ensuite",
          "Enfin"
        ],
        "context": "Zuerst gehen Sie geradeaus.",
        "tag": "Reihenfolge",
        "explanation": "D’abord, allez tout droit. = Zuerst gehen Sie geradeaus."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "___, tournez à gauche. (dann)",
        "answer": "Ensuite",
        "o": [
          "Ensuite",
          "D’abord",
          "Avant"
        ],
        "context": "Dann biegen Sie links ab.",
        "tag": "Reihenfolge",
        "explanation": "Ensuite, tournez à gauche. = Dann biegen Sie links ab."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Allez tout droit ___ feu rouge.",
        "answer": "jusqu’au",
        "o": [
          "jusqu’au",
          "jusqu’à le",
          "à le"
        ],
        "context": "Gehen Sie bis zur roten Ampel.",
        "tag": "jusqu’à",
        "explanation": "À + le wird zu au: jusqu’au feu."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "___ le pont, prenez la première à droite.",
        "answer": "Après",
        "o": [
          "Après",
          "Ensuite",
          "Depuis"
        ],
        "context": "Nehmen Sie nach der Brücke die erste rechts.",
        "tag": "Reihenfolge",
        "explanation": "Après le pont, prenez la première à droite. = Nehmen Sie nach der Brücke die erste rechts."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Vous ___ la place. (traverser)",
        "answer": "traversez",
        "o": [
          "traversez",
          "traverses",
          "traversent"
        ],
        "context": "Sie überqueren den Platz.",
        "tag": "vous-Form",
        "explanation": "Vous traversez la place. = Sie überqueren den Platz."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "C’est en face ___ la mairie.",
        "answer": "de",
        "o": [
          "de",
          "à",
          "du"
        ],
        "context": "Es ist gegenüber dem Rathaus.",
        "tag": "Ort",
        "explanation": "C’est en face de la mairie. = Es ist gegenüber dem Rathaus."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je ___ le tram pour aller au travail.",
        "answer": "prends",
        "o": [
          "prends",
          "mets",
          "vais"
        ],
        "context": "Ich nehme die Straßenbahn zur Arbeit.",
        "tag": "prendre",
        "explanation": "Je prends le tram pour aller au travail. = Ich nehme die Straßenbahn zur Arbeit."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je ___ vingt minutes.",
        "answer": "mets",
        "o": [
          "mets",
          "prends",
          "dure"
        ],
        "context": "Ich brauche zwanzig Minuten.",
        "tag": "mettre",
        "explanation": "Mettre + Dauer: Je mets vingt minutes. Durer sagt man von Sachen (le trajet dure …), prendre von Verkehrsmitteln."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je vais au bureau ___ pied.",
        "answer": "à",
        "o": [
          "à",
          "en",
          "par"
        ],
        "context": "Ich gehe zu Fuß ins Büro.",
        "tag": "Verkehrsmittel",
        "explanation": "Je vais au bureau à pied. = Ich gehe zu Fuß ins Büro."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Il vient ___ voiture.",
        "answer": "en",
        "o": [
          "en",
          "à",
          "par"
        ],
        "context": "Er kommt mit dem Auto.",
        "tag": "Verkehrsmittel",
        "explanation": "En voiture, en bus, en train; aber à pied und à vélo."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "« D’abord, allez tout droit jusqu’à la boulangerie. Ensuite, tournez à droite. » Was machst du zuerst?",
        "o": [
          "Geradeaus bis zur Bäckerei gehen.",
          "Rechts abbiegen.",
          "In die Bäckerei gehen."
        ],
        "answer": "Geradeaus bis zur Bäckerei gehen.",
        "explanation": "D’abord markiert den ersten Schritt.",
        "tag": "Anwenden",
        "family": "ordre",
        "checkKey": "A2L3-context-ordre"
      },
      {
        "type": "choice",
        "q": "« Après le pont, prenez la deuxième à gauche. » Wo biegst du ab?",
        "o": [
          "in die zweite Straße links nach der Brücke",
          "in die zweite Straße links vor der Brücke",
          "an der zweiten Brücke links"
        ],
        "answer": "in die zweite Straße links nach der Brücke",
        "explanation": "Après le pont = nach der Brücke; la deuxième = die zweite Straße.",
        "tag": "Anwenden",
        "family": "apres",
        "checkKey": "A2L3-context-apres"
      },
      {
        "type": "choice",
        "q": "Ein Tourist fragt nach dem Bahnhof. Er steht genau davor. Was sagst du?",
        "o": [
          "C’est juste en face de vous.",
          "C’est loin d’ici.",
          "Prenez la première à droite."
        ],
        "answer": "C’est juste en face de vous.",
        "explanation": "En face de vous = direkt gegenüber.",
        "tag": "Anwenden",
        "family": "enface",
        "checkKey": "A2L3-context-enface",
        "audio": "C’est juste en face de vous."
      },
      {
        "type": "choice",
        "q": "« Je prends le bus et je mets une demi-heure. » Wie lange dauert der Weg?",
        "o": [
          "30 Minuten",
          "15 Minuten",
          "eine Stunde"
        ],
        "answer": "30 Minuten",
        "explanation": "Une demi-heure ist eine halbe Stunde.",
        "tag": "Anwenden",
        "family": "duree",
        "checkKey": "A2L3-context-duree"
      },
      {
        "type": "choice",
        "q": "Du sagst, dass du mit dem Fahrrad zur Arbeit fährst.",
        "o": [
          "Je vais au travail à vélo.",
          "Je vais au travail en pied.",
          "Je vais au travail par vélo."
        ],
        "answer": "Je vais au travail à vélo.",
        "explanation": "À vélo = mit dem Fahrrad, wie à pied. En pied und par vélo gibt es nicht.",
        "tag": "Anwenden",
        "family": "transport",
        "checkKey": "A2L3-context-transport",
        "audio": "Je vais au travail à vélo."
      },
      {
        "type": "choice",
        "q": "« Vous descendez à l’arrêt Gambetta. » Was machst du an der Haltestelle Gambetta?",
        "o": [
          "aussteigen",
          "einsteigen",
          "umsteigen"
        ],
        "answer": "aussteigen",
        "explanation": "Descendre = aussteigen; monter = einsteigen; changer = umsteigen.",
        "tag": "Anwenden",
        "family": "descendre",
        "checkKey": "A2L3-context-descendre"
      },
      {
        "type": "choice",
        "q": "Du möchtest höflich fragen, wie man zum Museum kommt.",
        "o": [
          "Excusez-moi, pour aller au musée, s’il vous plaît ?",
          "Excusez-moi, le musée, il coûte combien ?",
          "Excusez-moi, vous allez au musée ?"
        ],
        "answer": "Excusez-moi, pour aller au musée, s’il vous plaît ?",
        "explanation": "Pour aller à … ? ist die übliche Frage nach dem Weg.",
        "tag": "Anwenden",
        "family": "demander",
        "checkKey": "A2L3-context-demander",
        "audio": "Excusez-moi, pour aller au musée, s’il vous plaît ?"
      },
      {
        "type": "choice",
        "q": "« Allez tout droit jusqu’au feu, puis tournez à gauche. » Was bedeutet puis?",
        "o": [
          "dann",
          "bis",
          "zuerst"
        ],
        "answer": "dann",
        "explanation": "Puis hat dieselbe Bedeutung wie ensuite.",
        "tag": "Anwenden",
        "family": "puis",
        "checkKey": "A2L3-context-puis"
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "___, vous tournez à droite. (zuerst)",
        "answer": "D’abord",
        "accept": [],
        "context": "Beginne eine Wegbeschreibung mit „zuerst“.",
        "explanation": "D’abord, vous tournez à droite.",
        "audio": "D’abord, vous tournez à droite.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:dabord",
        "checkKey": "A2L3-transfer-dabord-0"
      },
      {
        "type": "gap",
        "prompt": "___, vous traversez le pont. (dann)",
        "answer": "Ensuite",
        "accept": [
          "Puis"
        ],
        "context": "Verbinde den zweiten Schritt mit „dann“.",
        "explanation": "Ensuite, vous traversez le pont.",
        "audio": "Ensuite, vous traversez le pont.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:ensuite",
        "checkKey": "A2L3-transfer-ensuite-1"
      },
      {
        "type": "gap",
        "prompt": "Allez tout droit ___ la place. (bis zu)",
        "answer": "jusqu’à",
        "accept": [],
        "context": "Gehen Sie geradeaus bis zum Platz.",
        "explanation": "Allez tout droit jusqu’à la place.",
        "audio": "Allez tout droit jusqu’à la place.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:jusqua",
        "checkKey": "A2L3-transfer-jusqua-2"
      },
      {
        "type": "gap",
        "prompt": "Continuez ___ carrefour. (bis zu + le)",
        "answer": "jusqu’au",
        "accept": [],
        "context": "Fahren Sie weiter bis zur Kreuzung.",
        "explanation": "Continuez jusqu’au carrefour.",
        "audio": "Continuez jusqu’au carrefour.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:jusqua",
        "checkKey": "A2L3-transfer-jusqua-3"
      },
      {
        "type": "gap",
        "prompt": "Je ___ dix minutes à pied. (mettre)",
        "answer": "mets",
        "accept": [],
        "context": "Du brauchst zehn Minuten zu Fuß.",
        "explanation": "Je mets dix minutes à pied.",
        "audio": "Je mets dix minutes à pied.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:mettre",
        "checkKey": "A2L3-transfer-mettre-4"
      },
      {
        "type": "gap",
        "prompt": "Nous ___ le train tous les matins. (prendre)",
        "answer": "prenons",
        "accept": [],
        "context": "Ihr nehmt jeden Morgen den Zug.",
        "explanation": "Nous prenons le train tous les matins.",
        "audio": "Nous prenons le train tous les matins.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:prendre",
        "checkKey": "A2L3-transfer-prendre-5"
      },
      {
        "type": "gap",
        "prompt": "La pharmacie est en face ___ la gare.",
        "answer": "de",
        "accept": [],
        "context": "Die Apotheke liegt gegenüber dem Bahnhof.",
        "explanation": "La pharmacie est en face de la gare.",
        "audio": "La pharmacie est en face de la gare.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:enface",
        "checkKey": "A2L3-transfer-enface-6"
      },
      {
        "type": "gap",
        "prompt": "Elle va au travail ___ voiture.",
        "answer": "en",
        "accept": [],
        "context": "Sie fährt mit dem Auto zur Arbeit.",
        "explanation": "Elle va au travail en voiture.",
        "audio": "Elle va au travail en voiture.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:transport",
        "checkKey": "A2L3-transfer-transport-7"
      }
    ]
  },
  "4": {
    "goals": [
      "Ein Telefongespräch beginnen, nach einer Person fragen und reagieren, wenn sie nicht da ist.",
      "Eine Nachricht hinterlassen oder aufnehmen.",
      "Indirekte Objektpronomen lui / leur vor dem Verb verwenden."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Je téléphone à Paul. → Je ___ téléphone.",
        "answer": "lui",
        "o": [
          "lui",
          "le",
          "leur"
        ],
        "context": "Ich rufe ihn an.",
        "tag": "lui",
        "explanation": "Je téléphone à Paul. → Je lui téléphone. = Ich rufe ihn an."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "J’écris à mes parents. → Je ___ écris.",
        "answer": "leur",
        "o": [
          "leur",
          "les",
          "lui"
        ],
        "context": "Ich schreibe ihnen.",
        "tag": "leur",
        "explanation": "Mehrere Personen mit à → leur."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Tu parles à Marie ? → Tu ___ parles ?",
        "answer": "lui",
        "o": [
          "lui",
          "la",
          "elle"
        ],
        "context": "Sprichst du mit ihr?",
        "tag": "lui",
        "explanation": "Parler à quelqu’un → lui, auch für eine Frau."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Je ne ___ réponds pas. (ihm)",
        "answer": "lui",
        "o": [
          "lui",
          "le",
          "il"
        ],
        "context": "Ich antworte ihm nicht.",
        "tag": "lui",
        "explanation": "Je ne lui réponds pas. = Ich antworte ihm nicht."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Je vais ___ dire demain. (ihnen)",
        "answer": "leur",
        "o": [
          "leur",
          "les",
          "lui"
        ],
        "context": "Ich werde ihnen morgen Bescheid sagen.",
        "tag": "leur",
        "explanation": "Je vais leur dire demain. = Ich werde ihnen morgen Bescheid sagen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Vous ___ donnez le numéro ? (ihr)",
        "answer": "lui",
        "o": [
          "lui",
          "la",
          "leur"
        ],
        "context": "Geben Sie ihr die Nummer?",
        "tag": "lui",
        "explanation": "Vous lui donnez le numéro ? = Geben Sie ihr die Nummer?"
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "___, bonjour ! C’est Julie.",
        "answer": "Allô",
        "o": [
          "Allô",
          "Salut",
          "Pardon"
        ],
        "context": "Hallo, guten Tag! Hier ist Julie.",
        "tag": "Telefon",
        "explanation": "Am Telefon meldet man sich mit Allô. Salut grüßt Freunde, Pardon ist eine Entschuldigung."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "C’est de la ___ de qui ?",
        "answer": "part",
        "o": [
          "part",
          "place",
          "fois"
        ],
        "context": "Wer ist am Apparat?",
        "tag": "Telefon",
        "explanation": "C’est de la part de qui ? = Wer ist am Apparat?"
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Vous voulez ___ un message ?",
        "answer": "laisser",
        "o": [
          "laisser",
          "quitter",
          "donner"
        ],
        "context": "Möchten Sie eine Nachricht hinterlassen?",
        "tag": "Telefon",
        "explanation": "Vous voulez laisser un message ? = Möchten Sie eine Nachricht hinterlassen?"
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Elle peut vous ___ demain.",
        "answer": "rappeler",
        "o": [
          "rappeler",
          "répéter",
          "répondre"
        ],
        "context": "Sie kann Sie morgen zurückrufen.",
        "tag": "Telefon",
        "explanation": "Elle peut vous rappeler demain. = Sie kann Sie morgen zurückrufen."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "Am Telefon fragt man dich: « C’est de la part de qui ? » Was antwortest du?",
        "o": [
          "C’est Lucas Meyer.",
          "C’est pour demain.",
          "C’est à six heures."
        ],
        "answer": "C’est Lucas Meyer.",
        "explanation": "Gefragt ist der Name des Anrufers.",
        "tag": "Anwenden",
        "family": "partde",
        "checkKey": "A2L4-context-partde",
        "audio": "C’est Lucas Meyer."
      },
      {
        "type": "choice",
        "q": "« Désolé, Hélène est sortie. Vous voulez qu’elle vous rappelle ? » Was bietet der Mann an?",
        "o": [
          "Hélène ruft zurück.",
          "Er gibt dir Hélènes Handynummer.",
          "Du sollst morgen wieder anrufen."
        ],
        "answer": "Hélène ruft zurück.",
        "explanation": "Rappeler = zurückrufen.",
        "tag": "Anwenden",
        "family": "rappeler",
        "checkKey": "A2L4-context-rappeler"
      },
      {
        "type": "choice",
        "q": "Du willst sagen: „Ich rufe ihn heute Abend an.“",
        "o": [
          "Je lui téléphone ce soir.",
          "Je le téléphone ce soir.",
          "Je téléphone lui ce soir."
        ],
        "answer": "Je lui téléphone ce soir.",
        "explanation": "Téléphoner à quelqu’un → lui, vor dem Verb.",
        "tag": "Anwenden",
        "family": "lui",
        "checkKey": "A2L4-context-lui",
        "audio": "Je lui téléphone ce soir."
      },
      {
        "type": "choice",
        "q": "Du willst sagen: „Ich schreibe ihnen eine E-Mail.“",
        "o": [
          "Je leur écris un e-mail.",
          "Je les écris un e-mail.",
          "Je lui écris un e-mail."
        ],
        "answer": "Je leur écris un e-mail.",
        "explanation": "Écrire à des personnes → leur.",
        "tag": "Anwenden",
        "family": "leur",
        "checkKey": "A2L4-context-leur",
        "audio": "Je leur écris un e-mail."
      },
      {
        "type": "choice",
        "q": "Die Person, die du suchst, ist nicht da. Du möchtest eine Nachricht hinterlassen.",
        "o": [
          "Est-ce que je peux laisser un message ?",
          "Est-ce que je peux prendre un message ?",
          "Est-ce que je peux quitter un message ?"
        ],
        "answer": "Est-ce que je peux laisser un message ?",
        "explanation": "Der Anrufer hinterlässt: laisser un message.",
        "tag": "Anwenden",
        "family": "message",
        "checkKey": "A2L4-context-message",
        "audio": "Est-ce que je peux laisser un message ?"
      },
      {
        "type": "choice",
        "q": "« Ne quittez pas, je vous le passe. » Was passiert gleich?",
        "o": [
          "Du wirst mit ihm verbunden.",
          "Das Gespräch wird beendet.",
          "Du sollst später zurückrufen."
        ],
        "answer": "Du wirst mit ihm verbunden.",
        "explanation": "Je vous le passe = ich gebe ihn Ihnen (verbinde).",
        "tag": "Anwenden",
        "family": "passer",
        "checkKey": "A2L4-context-passer"
      },
      {
        "type": "choice",
        "q": "Du hast die Telefonnummer nicht verstanden.",
        "o": [
          "Vous pouvez répéter le numéro, s’il vous plaît ?",
          "Vous pouvez changer le numéro, s’il vous plaît ?",
          "Vous pouvez appeler le numéro, s’il vous plaît ?"
        ],
        "answer": "Vous pouvez répéter le numéro, s’il vous plaît ?",
        "explanation": "Répéter = wiederholen.",
        "tag": "Anwenden",
        "family": "repeter",
        "checkKey": "A2L4-context-repeter",
        "audio": "Vous pouvez répéter le numéro, s’il vous plaît ?"
      },
      {
        "type": "choice",
        "q": "« Je ne lui ai pas encore répondu. » Was bedeutet das?",
        "o": [
          "Ich habe ihm noch nicht geantwortet.",
          "Er hat mir noch nicht geantwortet.",
          "Ich habe ihn noch nicht angerufen."
        ],
        "answer": "Ich habe ihm noch nicht geantwortet.",
        "explanation": "Lui ist hier das Objekt: ihm. Ne … pas encore = noch nicht.",
        "tag": "Anwenden",
        "family": "negation",
        "checkKey": "A2L4-context-negation"
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "Je téléphone à ma sœur. → Je ___ téléphone.",
        "answer": "lui",
        "accept": [],
        "context": "Ersetze „à ma sœur“ durch ein Pronomen.",
        "explanation": "Je téléphone à ma sœur. → Je lui téléphone.",
        "audio": "Je téléphone à ma sœur. → Je lui téléphone.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:lui",
        "checkKey": "A2L4-transfer-lui-0"
      },
      {
        "type": "gap",
        "prompt": "Tu écris à ton professeur ? → Tu ___ écris ?",
        "answer": "lui",
        "accept": [],
        "context": "Ersetze „à ton professeur“ durch ein Pronomen.",
        "explanation": "Tu écris à ton professeur ? → Tu lui écris ?",
        "audio": "Tu écris à ton professeur ? → Tu lui écris ?",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:lui",
        "checkKey": "A2L4-transfer-lui-1"
      },
      {
        "type": "gap",
        "prompt": "Nous parlons aux voisins. → Nous ___ parlons.",
        "answer": "leur",
        "accept": [],
        "context": "Ersetze „aux voisins“ durch ein Pronomen.",
        "explanation": "Nous parlons aux voisins. → Nous leur parlons.",
        "audio": "Nous parlons aux voisins. → Nous leur parlons.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:leur",
        "checkKey": "A2L4-transfer-leur-2"
      },
      {
        "type": "gap",
        "prompt": "Je ne ___ réponds pas. (à Marc)",
        "answer": "lui",
        "accept": [],
        "context": "Ich antworte Marc nicht. Setze das Pronomen ein.",
        "explanation": "Je ne lui réponds pas.",
        "audio": "Je ne lui réponds pas.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:negation",
        "checkKey": "A2L4-transfer-negation-3"
      },
      {
        "type": "gap",
        "prompt": "Je vais ___ dire la nouvelle. (à mes amis)",
        "answer": "leur",
        "accept": [],
        "context": "Ich werde meinen Freunden die Neuigkeit sagen.",
        "explanation": "Je vais leur dire la nouvelle.",
        "audio": "Je vais leur dire la nouvelle.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:infinitif",
        "checkKey": "A2L4-transfer-infinitif-4"
      },
      {
        "type": "gap",
        "prompt": "Vous voulez laisser un ___ ?",
        "answer": "message",
        "accept": [],
        "context": "Möchten Sie eine Nachricht hinterlassen?",
        "explanation": "Vous voulez laisser un message ?",
        "audio": "Vous voulez laisser un message ?",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:telephone",
        "checkKey": "A2L4-transfer-telephone-5"
      },
      {
        "type": "gap",
        "prompt": "Elle peut me ___ ce soir ? (zurückrufen)",
        "answer": "rappeler",
        "accept": [],
        "context": "Kann sie mich heute Abend zurückrufen?",
        "explanation": "Elle peut me rappeler ce soir ?",
        "audio": "Elle peut me rappeler ce soir ?",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:rappeler",
        "checkKey": "A2L4-transfer-rappeler-6"
      }
    ]
  },
  "5": {
    "goals": [
      "Erzählen, was man gestern oder am letzten Wochenende gemacht hat.",
      "Das passé composé mit avoir oder être bilden.",
      "Das Partizip bei être und reflexiven Verben an das Subjekt angleichen."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Hier, Léa ___ acheté des fruits.",
        "answer": "a",
        "o": [
          "a",
          "est",
          "as"
        ],
        "context": "Gestern hat Léa Obst gekauft.",
        "tag": "avoir",
        "explanation": "Acheter bildet das passé composé mit avoir; zu elle gehört a."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Nous ___ regardé un film.",
        "answer": "avons",
        "o": [
          "avons",
          "sommes",
          "ont"
        ],
        "context": "Wir haben einen Film angeschaut.",
        "tag": "avoir",
        "explanation": "Nous avons regardé un film. = Wir haben einen Film angeschaut."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Tu as ___ du sport ? (faire)",
        "answer": "fait",
        "o": [
          "fait",
          "faisé",
          "fais"
        ],
        "context": "Hast du Sport gemacht?",
        "tag": "Partizip",
        "explanation": "Faire → fait."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Ils ont ___ le bus. (prendre)",
        "answer": "pris",
        "o": [
          "pris",
          "prendu",
          "prend"
        ],
        "context": "Sie haben den Bus genommen.",
        "tag": "Partizip",
        "explanation": "Prendre → pris."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Je n’ai pas ___ ton message. (voir)",
        "answer": "vu",
        "o": [
          "vu",
          "voyé",
          "vois"
        ],
        "context": "Ich habe deine Nachricht nicht gesehen.",
        "tag": "Partizip",
        "explanation": "Voir → vu."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Il ___ allé au cinéma.",
        "answer": "est",
        "o": [
          "est",
          "a",
          "sont"
        ],
        "context": "Er ist ins Kino gegangen.",
        "tag": "être",
        "explanation": "Aller bildet das passé composé mit être; zu il gehört est."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Ma sœur est ___ hier. (partir)",
        "answer": "partie",
        "o": [
          "partie",
          "parti",
          "partis"
        ],
        "context": "Meine Schwester ist gestern abgereist.",
        "tag": "Angleichung",
        "explanation": "Ma sœur est partie hier. = Meine Schwester ist gestern abgereist."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Mes parents sont ___ à midi. (arriver)",
        "answer": "arrivés",
        "o": [
          "arrivés",
          "arrivé",
          "arrivée"
        ],
        "context": "Meine Eltern sind mittags angekommen.",
        "tag": "Angleichung",
        "explanation": "Mes parents sont arrivés à midi. = Meine Eltern sind mittags angekommen."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Nous ___ restés à la maison.",
        "answer": "sommes",
        "o": [
          "sommes",
          "avons",
          "êtes"
        ],
        "context": "Wir sind zu Hause geblieben.",
        "tag": "être",
        "explanation": "Nous sommes restés à la maison. = Wir sind zu Hause geblieben."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Elle s’est ___ à sept heures. (se lever)",
        "answer": "levée",
        "o": [
          "levée",
          "levé",
          "levés"
        ],
        "context": "Sie ist um sieben aufgestanden.",
        "tag": "reflexiv",
        "explanation": "Reflexive Verben: être + Angleichung → levée."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "Du erzählst, dass du gestern ins Schwimmbad gegangen bist.",
        "o": [
          "Hier, je suis allé à la piscine.",
          "Hier, j’ai allé à la piscine.",
          "Hier, je vais à la piscine."
        ],
        "answer": "Hier, je suis allé à la piscine.",
        "explanation": "Aller bildet das passé composé mit être.",
        "tag": "Anwenden",
        "family": "etre",
        "checkKey": "A2L5-context-etre",
        "audio": "Hier, je suis allé à la piscine."
      },
      {
        "type": "choice",
        "q": "« Ma mère est partie à six heures et mon père est parti à huit heures. » Wer ist zuerst gefahren?",
        "o": [
          "die Mutter",
          "der Vater",
          "beide zusammen"
        ],
        "answer": "die Mutter",
        "explanation": "Six heures ist früher als huit heures.",
        "tag": "Anwenden",
        "family": "comprendre",
        "checkKey": "A2L5-context-comprendre"
      },
      {
        "type": "choice",
        "q": "Welcher Satz ist richtig?",
        "o": [
          "Mes amies sont venues samedi.",
          "Mes amies sont venu samedi.",
          "Mes amies ont venues samedi."
        ],
        "answer": "Mes amies sont venues samedi.",
        "explanation": "Venir → être; mehrere Frauen → venues.",
        "tag": "Anwenden",
        "family": "accord",
        "checkKey": "A2L5-context-accord",
        "audio": "Mes amies sont venues samedi."
      },
      {
        "type": "choice",
        "q": "« Le week-end dernier, il n’a pas arrêté de pleuvoir. » Wie war das Wetter?",
        "o": [
          "Es hat die ganze Zeit geregnet.",
          "Es hat nur kurz geregnet.",
          "Es hat nicht geregnet."
        ],
        "answer": "Es hat die ganze Zeit geregnet.",
        "explanation": "Ne pas arrêter de = nicht aufhören zu.",
        "tag": "Anwenden",
        "family": "arreter",
        "checkKey": "A2L5-context-arreter"
      },
      {
        "type": "choice",
        "q": "Du hast gestern nicht ferngesehen.",
        "o": [
          "Je n’ai pas regardé la télé.",
          "Je n’ai regardé pas la télé.",
          "Je ne suis pas regardé la télé."
        ],
        "answer": "Je n’ai pas regardé la télé.",
        "explanation": "Ne … pas umschließt avoir.",
        "tag": "Anwenden",
        "family": "negation",
        "checkKey": "A2L5-context-negation",
        "audio": "Je n’ai pas regardé la télé."
      },
      {
        "type": "choice",
        "q": "Dein Partner fragt dich in der Prüfung nach gestern. Welche Frage stellt er?",
        "o": [
          "Qu’est-ce que tu as fait hier ?",
          "Qu’est-ce que tu vas faire hier ?",
          "Qu’est-ce que tu fais demain ?"
        ],
        "answer": "Qu’est-ce que tu as fait hier ?",
        "explanation": "Für gestern braucht man das passé composé.",
        "tag": "Anwenden",
        "family": "question",
        "checkKey": "A2L5-context-question"
      },
      {
        "type": "choice",
        "q": "Eine Frau sagt: Ich bin um 23 Uhr ins Bett gegangen.",
        "o": [
          "Je me suis couchée à vingt-trois heures.",
          "Je me suis couché à vingt-trois heures.",
          "J’ai couchée à vingt-trois heures."
        ],
        "answer": "Je me suis couchée à vingt-trois heures.",
        "explanation": "Reflexiv → être; eine Frau → couchée.",
        "tag": "Anwenden",
        "family": "reflexif",
        "checkKey": "A2L5-context-reflexif",
        "audio": "Je me suis couchée à vingt-trois heures."
      },
      {
        "type": "choice",
        "q": "Welches Partizip ist richtig? « Nous avons ___ une pizza. » (prendre)",
        "o": [
          "pris",
          "prendu",
          "prit"
        ],
        "answer": "pris",
        "explanation": "Prendre → pris.",
        "tag": "Anwenden",
        "family": "participe",
        "checkKey": "A2L5-context-participe",
        "audio": "Nous avons pris une pizza."
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "Hier soir, nous ___ mangé au restaurant.",
        "answer": "avons",
        "accept": [],
        "context": "Gestern Abend habt ihr im Restaurant gegessen.",
        "explanation": "Hier soir, nous avons mangé au restaurant.",
        "audio": "Hier soir, nous avons mangé au restaurant.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:avoir",
        "checkKey": "A2L5-transfer-avoir-0"
      },
      {
        "type": "gap",
        "prompt": "Elle ___ partie en vacances.",
        "answer": "est",
        "accept": [],
        "context": "Sie ist in den Urlaub gefahren.",
        "explanation": "Elle est partie en vacances.",
        "audio": "Elle est partie en vacances.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:etre",
        "checkKey": "A2L5-transfer-etre-1"
      },
      {
        "type": "gap",
        "prompt": "Mes cousines sont ___ dimanche. (arriver)",
        "answer": "arrivées",
        "accept": [],
        "context": "Deine Cousinen sind am Sonntag angekommen.",
        "explanation": "Mes cousines sont arrivées dimanche.",
        "audio": "Mes cousines sont arrivées dimanche.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:accord",
        "checkKey": "A2L5-transfer-accord-2"
      },
      {
        "type": "gap",
        "prompt": "Paul et Marc sont ___ au cinéma. (aller)",
        "answer": "allés",
        "accept": [],
        "context": "Paul und Marc sind ins Kino gegangen.",
        "explanation": "Paul et Marc sont allés au cinéma.",
        "audio": "Paul et Marc sont allés au cinéma.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:accord",
        "checkKey": "A2L5-transfer-accord-3"
      },
      {
        "type": "gap",
        "prompt": "Tu as ___ ce livre ? (lire)",
        "answer": "lu",
        "accept": [],
        "context": "Hast du dieses Buch gelesen?",
        "explanation": "Tu as lu ce livre ?",
        "audio": "Tu as lu ce livre ?",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:participe",
        "checkKey": "A2L5-transfer-participe-4"
      },
      {
        "type": "gap",
        "prompt": "J’ai ___ du sport samedi. (faire)",
        "answer": "fait",
        "accept": [],
        "context": "Du hast am Samstag Sport gemacht.",
        "explanation": "J’ai fait du sport samedi.",
        "audio": "J’ai fait du sport samedi.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:participe",
        "checkKey": "A2L5-transfer-participe-5"
      },
      {
        "type": "gap",
        "prompt": "Je me suis ___ tôt. (se lever, Mann)",
        "answer": "levé",
        "accept": [],
        "context": "Ein Mann sagt: Ich bin früh aufgestanden.",
        "explanation": "Je me suis levé tôt.",
        "audio": "Je me suis levé tôt.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:reflexif",
        "checkKey": "A2L5-transfer-reflexif-6"
      },
      {
        "type": "gap",
        "prompt": "Je ___ suis pas sorti hier.",
        "answer": "ne",
        "accept": [],
        "context": "Du bist gestern nicht ausgegangen.",
        "explanation": "Je ne suis pas sorti hier.",
        "audio": "Je ne suis pas sorti hier.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:negation",
        "checkKey": "A2L5-transfer-negation-7"
      }
    ]
  },
  "6": {
    "goals": [
      "Von vergangenen Ferien erzählen: Ort, Zeit, Begleitung, Unterkunft, Wetter.",
      "Das imparfait von être, avoir, faire und regelmäßigen Verben bilden.",
      "Imparfait (Hintergrund, Gewohnheit) und passé composé (Ereignis) unterscheiden."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Nous ___ dans un camping. (être)",
        "answer": "étions",
        "o": [
          "étions",
          "étaient",
          "sommes"
        ],
        "context": "Wir waren auf einem Campingplatz.",
        "tag": "imparfait",
        "explanation": "Nous étions dans un camping. = Wir waren auf einem Campingplatz."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Il ___ très chaud. (faire)",
        "answer": "faisait",
        "o": [
          "faisait",
          "faisais",
          "fait"
        ],
        "context": "Es war sehr heiß.",
        "tag": "imparfait",
        "explanation": "Wetter in der Vergangenheit: imparfait, il faisait. Fait ist Präsens, faisais gehört zu je oder tu."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "J’___ une petite chambre. (avoir)",
        "answer": "avais",
        "o": [
          "avais",
          "avait",
          "avions"
        ],
        "context": "Ich hatte ein kleines Zimmer.",
        "tag": "imparfait",
        "explanation": "Je → -ais: j’avais."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Les enfants ___ sur la plage. (jouer)",
        "answer": "jouaient",
        "o": [
          "jouaient",
          "jouait",
          "jouions"
        ],
        "context": "Die Kinder spielten am Strand.",
        "tag": "imparfait",
        "explanation": "Les enfants jouaient sur la plage. = Die Kinder spielten am Strand."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Vous ___ à l’hôtel ? (être)",
        "answer": "étiez",
        "o": [
          "étiez",
          "étais",
          "étions"
        ],
        "context": "Wart ihr im Hotel?",
        "tag": "imparfait",
        "explanation": "Vous étiez à l’hôtel ? = Wart ihr im Hotel?"
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Un jour, nous ___ un château. (visiter)",
        "answer": "avons visité",
        "o": [
          "avons visité",
          "visitions",
          "visitons"
        ],
        "context": "Eines Tages haben wir ein Schloss besichtigt.",
        "tag": "passé composé",
        "explanation": "Un jour = ein einzelnes Ereignis → passé composé."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Tous les soirs, on ___ au restaurant. (manger)",
        "answer": "mangeait",
        "o": [
          "mangeait",
          "a mangé",
          "mange"
        ],
        "context": "Jeden Abend aßen wir im Restaurant.",
        "tag": "Gewohnheit",
        "explanation": "Tous les soirs = Gewohnheit → imparfait."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Il ___ beau quand nous sommes arrivés. (faire)",
        "answer": "faisait",
        "o": [
          "faisait",
          "a fait",
          "fait"
        ],
        "context": "Es war schön, als wir angekommen sind.",
        "tag": "Hintergrund",
        "explanation": "Il faisait beau quand nous sommes arrivés. = Es war schön, als wir angekommen sind."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Soudain, il ___ à pleuvoir. (commencer)",
        "answer": "a commencé",
        "o": [
          "a commencé",
          "commençait",
          "commence"
        ],
        "context": "Plötzlich hat es angefangen zu regnen.",
        "tag": "Ereignis",
        "explanation": "Soudain, il a commencé à pleuvoir. = Plötzlich hat es angefangen zu regnen."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Il était fatigué, alors il ___ rentré.",
        "answer": "est",
        "o": [
          "est",
          "a",
          "avait"
        ],
        "context": "Er war müde, also ist er nach Hause gegangen.",
        "tag": "Ereignis",
        "explanation": "Rentrer bildet das passé composé mit être: il est rentré."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "« Il faisait beau tous les jours, mais le dernier jour, il a plu. » Was stimmt?",
        "o": [
          "Nur am letzten Tag hat es geregnet.",
          "Es hat jeden Tag geregnet.",
          "Am letzten Tag war schönes Wetter."
        ],
        "answer": "Nur am letzten Tag hat es geregnet.",
        "explanation": "Il faisait beau = Hintergrund; il a plu = einzelnes Ereignis am letzten Tag.",
        "tag": "Anwenden",
        "family": "temps",
        "checkKey": "A2L6-context-temps"
      },
      {
        "type": "choice",
        "q": "Du beschreibst das Hotel deiner letzten Ferien.",
        "o": [
          "L’hôtel était petit et calme.",
          "L’hôtel a été petit et calme.",
          "L’hôtel est petit et calme."
        ],
        "answer": "L’hôtel était petit et calme.",
        "explanation": "Beschreibungen in der Vergangenheit: imparfait.",
        "tag": "Anwenden",
        "family": "description",
        "checkKey": "A2L6-context-description",
        "audio": "L’hôtel était petit et calme."
      },
      {
        "type": "choice",
        "q": "Du erzählst ein einzelnes Ereignis: Eines Tages haben wir eine Insel besucht.",
        "o": [
          "Un jour, nous avons visité une île.",
          "Un jour, nous visitions une île.",
          "Un jour, nous visitons une île."
        ],
        "answer": "Un jour, nous avons visité une île.",
        "explanation": "Un jour + einzelnes Ereignis: passé composé.",
        "tag": "Anwenden",
        "family": "evenement",
        "checkKey": "A2L6-context-evenement",
        "audio": "Un jour, nous avons visité une île."
      },
      {
        "type": "choice",
        "q": "« Le matin, je nageais et l’après-midi, je lisais. » Was beschreibt die Person?",
        "o": [
          "ihre Gewohnheiten im Urlaub",
          "einen einzigen Tag",
          "ihre Pläne"
        ],
        "answer": "ihre Gewohnheiten im Urlaub",
        "explanation": "Imparfait mit le matin / l’après-midi: Gewohnheit.",
        "tag": "Anwenden",
        "family": "habitude",
        "checkKey": "A2L6-context-habitude"
      },
      {
        "type": "choice",
        "q": "« J’espérais avoir beau temps, mais il n’a pas arrêté de pleuvoir. » Wie war das Wetter?",
        "o": [
          "schlecht, es hat ständig geregnet",
          "schön, wie erhofft",
          "wechselhaft mit Sonne"
        ],
        "answer": "schlecht, es hat ständig geregnet",
        "explanation": "J’espérais = Erwartung; il n’a pas arrêté de pleuvoir = es hörte nicht auf zu regnen.",
        "tag": "Anwenden",
        "family": "esperer",
        "checkKey": "A2L6-context-esperer"
      },
      {
        "type": "choice",
        "q": "Dein Partner fragt nach deinem Urlaub. Welche Frage passt zu „wo?“",
        "o": [
          "Où es-tu parti en vacances ?",
          "Quand es-tu parti en vacances ?",
          "Avec qui es-tu parti en vacances ?"
        ],
        "answer": "Où es-tu parti en vacances ?",
        "explanation": "Où = wo / wohin.",
        "tag": "Anwenden",
        "family": "question",
        "checkKey": "A2L6-context-question",
        "audio": "Où es-tu parti en vacances ?"
      },
      {
        "type": "choice",
        "q": "Wie sagst du: „Es hat mir gut gefallen“?",
        "o": [
          "Ça m’a bien plu.",
          "Ça m’est bien plu.",
          "Ça m’a bien plaisé."
        ],
        "answer": "Ça m’a bien plu.",
        "explanation": "Plaire bildet das passé composé mit avoir und dem Partizip plu.",
        "tag": "Anwenden",
        "family": "plaire",
        "checkKey": "A2L6-context-plaire",
        "audio": "Ça m’a bien plu."
      },
      {
        "type": "choice",
        "q": "Welche Form ist richtig? « Nous ___ fatigués après le voyage. »",
        "o": [
          "étions",
          "étaient",
          "étiez"
        ],
        "answer": "étions",
        "explanation": "Nous → -ions: nous étions.",
        "tag": "Anwenden",
        "family": "forme",
        "checkKey": "A2L6-context-forme",
        "audio": "Nous étions fatigués après le voyage."
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "Nous ___ à la montagne. (être, imparfait)",
        "answer": "étions",
        "accept": [],
        "context": "Ihr wart in den Bergen.",
        "explanation": "Nous étions à la montagne.",
        "audio": "Nous étions à la montagne.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:etre",
        "checkKey": "A2L6-transfer-etre-0"
      },
      {
        "type": "gap",
        "prompt": "Il ___ froid le matin. (faire, imparfait)",
        "answer": "faisait",
        "accept": [],
        "context": "Es war morgens kalt.",
        "explanation": "Il faisait froid le matin.",
        "audio": "Il faisait froid le matin.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:faire",
        "checkKey": "A2L6-transfer-faire-1"
      },
      {
        "type": "gap",
        "prompt": "Les enfants ___ une grande chambre. (avoir, imparfait)",
        "answer": "avaient",
        "accept": [],
        "context": "Die Kinder hatten ein großes Zimmer.",
        "explanation": "Les enfants avaient une grande chambre.",
        "audio": "Les enfants avaient une grande chambre.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:avoir",
        "checkKey": "A2L6-transfer-avoir-2"
      },
      {
        "type": "gap",
        "prompt": "Chaque jour, j’___ à la plage. (aller, imparfait)",
        "answer": "allais",
        "accept": [],
        "context": "Jeden Tag gingst du an den Strand.",
        "explanation": "Chaque jour, j’allais à la plage.",
        "audio": "Chaque jour, j’allais à la plage.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:habitude",
        "checkKey": "A2L6-transfer-habitude-3"
      },
      {
        "type": "gap",
        "prompt": "Un soir, nous ___ un concert. (voir, passé composé)",
        "answer": "avons vu",
        "accept": [],
        "context": "An einem Abend habt ihr ein Konzert gesehen.",
        "explanation": "Un soir, nous avons vu un concert.",
        "audio": "Un soir, nous avons vu un concert.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:evenement",
        "checkKey": "A2L6-transfer-evenement-4"
      },
      {
        "type": "gap",
        "prompt": "Samedi, elle ___ à Nice. (arriver, passé composé)",
        "answer": "est arrivée",
        "accept": [],
        "context": "Am Samstag ist sie in Nizza angekommen.",
        "explanation": "Samedi, elle est arrivée à Nice.",
        "audio": "Samedi, elle est arrivée à Nice.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:evenement",
        "checkKey": "A2L6-transfer-evenement-5"
      },
      {
        "type": "gap",
        "prompt": "___ super ! (es war)",
        "answer": "C’était",
        "accept": [],
        "context": "Du sagst, dass es super war.",
        "explanation": "C’était super !",
        "audio": "C’était super !",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:cetait",
        "checkKey": "A2L6-transfer-cetait-6"
      }
    ]
  },
  "7": {
    "goals": [
      "Über Pläne für das Wochenende sprechen und nachfragen.",
      "Das futur simple regelmäßiger und wichtiger unregelmäßiger Verben bilden.",
      "quand + Futur und futur proche passend verwenden."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Je ___ à Paul demain. (parler)",
        "answer": "parlerai",
        "o": [
          "parlerai",
          "parlerais",
          "parlais"
        ],
        "context": "Ich werde morgen mit Paul sprechen.",
        "tag": "futur",
        "explanation": "Je parlerai à Paul demain. = Ich werde morgen mit Paul sprechen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Nous ___ le train. (prendre)",
        "answer": "prendrons",
        "o": [
          "prendrons",
          "prenderons",
          "prendront"
        ],
        "context": "Wir werden den Zug nehmen.",
        "tag": "futur",
        "explanation": "Bei -re fällt das e weg: prendr- + ons. Prendront gehört zu ils."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Elle ___ contente. (être)",
        "answer": "sera",
        "o": [
          "sera",
          "serait",
          "seras"
        ],
        "context": "Sie wird zufrieden sein.",
        "tag": "futur",
        "explanation": "Être → ser-; zu elle gehört -a: elle sera. Serait ist conditionnel."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Ils ___ à huit heures. (venir)",
        "answer": "viendront",
        "o": [
          "viendront",
          "venront",
          "viendrons"
        ],
        "context": "Sie werden um acht kommen.",
        "tag": "futur",
        "explanation": "Venir → viendr-; zu ils gehört -ont."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Tu ___ m’aider ? (pouvoir)",
        "answer": "pourras",
        "o": [
          "pourras",
          "pouvras",
          "pourra"
        ],
        "context": "Wirst du mir helfen können?",
        "tag": "futur",
        "explanation": "Pouvoir → pourr-; zu tu gehört -as."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "On se ___ demain. (voir)",
        "answer": "verra",
        "o": [
          "verra",
          "voira",
          "verrait"
        ],
        "context": "Wir werden uns morgen sehen.",
        "tag": "futur",
        "explanation": "Voir → verr-: on se verra. Verrait ist conditionnel."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Quand tu ___, je t’appellerai. (arriver)",
        "answer": "arriveras",
        "o": [
          "arriveras",
          "arrives",
          "arriverais"
        ],
        "context": "Wenn du ankommst, rufe ich dich an.",
        "tag": "quand",
        "explanation": "Quand tu arriveras, je t’appellerai. = Wenn du ankommst, rufe ich dich an."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Quand il ___ beau, nous sortirons. (faire)",
        "answer": "fera",
        "o": [
          "fera",
          "fait",
          "faisait"
        ],
        "context": "Wenn es schön ist, gehen wir raus.",
        "tag": "quand",
        "explanation": "Quand il fera beau, nous sortirons. = Wenn es schön ist, gehen wir raus."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je ___ partir ce soir. (futur proche)",
        "answer": "vais",
        "o": [
          "vais",
          "vas",
          "suis"
        ],
        "context": "Ich fahre heute Abend weg.",
        "tag": "futur proche",
        "explanation": "Je vais partir ce soir. = Ich fahre heute Abend weg."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Quand je ___ à Paris, je t’écrirai. (être)",
        "answer": "serai",
        "o": [
          "serai",
          "suis",
          "serais"
        ],
        "context": "Wenn ich in Paris bin, schreibe ich dir.",
        "tag": "quand",
        "explanation": "Quand je serai à Paris, je t’écrirai. = Wenn ich in Paris bin, schreibe ich dir."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "« Je te montrerai les photos quand on se verra samedi. » Wann siehst du die Fotos?",
        "o": [
          "beim Treffen am Samstag",
          "sofort per E-Mail",
          "gar nicht"
        ],
        "answer": "beim Treffen am Samstag",
        "explanation": "Quand on se verra = wenn wir uns sehen werden.",
        "tag": "Anwenden",
        "family": "verra",
        "checkKey": "A2L7-context-verra"
      },
      {
        "type": "choice",
        "q": "Du sagst: Wenn ich nach Hause komme, rufe ich dich an.",
        "o": [
          "Quand je rentrerai, je t’appellerai.",
          "Quand je rentre, je t’appelais.",
          "Quand je rentrais, je t’appellerai."
        ],
        "answer": "Quand je rentrerai, je t’appellerai.",
        "explanation": "Nach quand + Zukunft steht im Französischen Futur.",
        "tag": "Anwenden",
        "family": "quand",
        "checkKey": "A2L7-context-quand",
        "audio": "Quand je rentrerai, je t’appellerai."
      },
      {
        "type": "choice",
        "q": "« Demain, il fera beau le matin, mais il pleuvra l’après-midi. » Wann regnet es?",
        "o": [
          "morgen Nachmittag",
          "morgen früh",
          "heute Nachmittag"
        ],
        "answer": "morgen Nachmittag",
        "explanation": "Il pleuvra = es wird regnen; l’après-midi = am Nachmittag.",
        "tag": "Anwenden",
        "family": "meteo",
        "checkKey": "A2L7-context-meteo"
      },
      {
        "type": "choice",
        "q": "Welche Form ist das futur simple von aller (nous)?",
        "o": [
          "nous irons",
          "nous allerons",
          "nous allions"
        ],
        "answer": "nous irons",
        "explanation": "Aller → ir-.",
        "tag": "Anwenden",
        "family": "aller",
        "checkKey": "A2L7-context-aller"
      },
      {
        "type": "choice",
        "q": "Dein Partner fragt nach deinem nächsten Wochenende. Welche Frage stellt er?",
        "o": [
          "Qu’est-ce que tu feras le week-end prochain ?",
          "Qu’est-ce que tu as fait le week-end prochain ?",
          "Qu’est-ce que tu faisais le week-end prochain ?"
        ],
        "answer": "Qu’est-ce que tu feras le week-end prochain ?",
        "explanation": "Für die Zukunft: futur simple (tu feras).",
        "tag": "Anwenden",
        "family": "question",
        "checkKey": "A2L7-context-question",
        "audio": "Qu’est-ce que tu feras le week-end prochain ?"
      },
      {
        "type": "choice",
        "q": "Du versprichst, am Samstag da zu sein.",
        "o": [
          "Je serai là samedi.",
          "J’étais là samedi.",
          "Je serais là samedi."
        ],
        "answer": "Je serai là samedi.",
        "explanation": "Être → ser-: je serai.",
        "tag": "Anwenden",
        "family": "etre",
        "checkKey": "A2L7-context-etre",
        "audio": "Je serai là samedi."
      },
      {
        "type": "choice",
        "q": "« Nous aurons le temps de visiter le château. » Was bedeutet das?",
        "o": [
          "Wir werden Zeit haben, das Schloss zu besichtigen.",
          "Wir hatten Zeit, das Schloss zu besichtigen.",
          "Wir haben keine Zeit für das Schloss."
        ],
        "answer": "Wir werden Zeit haben, das Schloss zu besichtigen.",
        "explanation": "Aurons = futur simple von avoir.",
        "tag": "Anwenden",
        "family": "avoir",
        "checkKey": "A2L7-context-avoir"
      },
      {
        "type": "choice",
        "q": "« Ce soir, je vais rester à la maison. » Welche Zeitform ist das?",
        "o": [
          "futur proche",
          "futur simple",
          "passé composé"
        ],
        "answer": "futur proche",
        "explanation": "Aller + Infinitiv = futur proche.",
        "tag": "Anwenden",
        "family": "proche",
        "checkKey": "A2L7-context-proche"
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "Demain, je ___ à ma mère. (téléphoner)",
        "answer": "téléphonerai",
        "accept": [],
        "context": "Morgen rufst du deine Mutter an. Setze das Futur ein.",
        "explanation": "Demain, je téléphonerai à ma mère.",
        "audio": "Demain, je téléphonerai à ma mère.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:regulier",
        "checkKey": "A2L7-transfer-regulier-0"
      },
      {
        "type": "gap",
        "prompt": "Vous ___ à l’heure ? (être)",
        "answer": "serez",
        "accept": [],
        "context": "Werdet ihr pünktlich sein?",
        "explanation": "Vous serez à l’heure ?",
        "audio": "Vous serez à l’heure ?",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:etre",
        "checkKey": "A2L7-transfer-etre-1"
      },
      {
        "type": "gap",
        "prompt": "Samedi, nous ___ à la mer. (aller)",
        "answer": "irons",
        "accept": [],
        "context": "Am Samstag fahrt ihr ans Meer.",
        "explanation": "Samedi, nous irons à la mer.",
        "audio": "Samedi, nous irons à la mer.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:aller",
        "checkKey": "A2L7-transfer-aller-2"
      },
      {
        "type": "gap",
        "prompt": "Il ___ chaud demain. (faire)",
        "answer": "fera",
        "accept": [],
        "context": "Morgen wird es heiß.",
        "explanation": "Il fera chaud demain.",
        "audio": "Il fera chaud demain.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:faire",
        "checkKey": "A2L7-transfer-faire-3"
      },
      {
        "type": "gap",
        "prompt": "On se ___ lundi. (voir)",
        "answer": "verra",
        "accept": [],
        "context": "Ihr seht euch am Montag.",
        "explanation": "On se verra lundi.",
        "audio": "On se verra lundi.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:voir",
        "checkKey": "A2L7-transfer-voir-4"
      },
      {
        "type": "gap",
        "prompt": "Quand tu ___ à Lyon, écris-moi ! (être)",
        "answer": "seras",
        "accept": [],
        "context": "Wenn du in Lyon bist, schreib mir!",
        "explanation": "Quand tu seras à Lyon, écris-moi !",
        "audio": "Quand tu seras à Lyon, écris-moi !",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:quand",
        "checkKey": "A2L7-transfer-quand-5"
      },
      {
        "type": "gap",
        "prompt": "Mes amis ___ dimanche. (venir)",
        "answer": "viendront",
        "accept": [],
        "context": "Deine Freunde kommen am Sonntag.",
        "explanation": "Mes amis viendront dimanche.",
        "audio": "Mes amis viendront dimanche.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:venir",
        "checkKey": "A2L7-transfer-venir-6"
      },
      {
        "type": "gap",
        "prompt": "J’___ trente ans en mai. (avoir)",
        "answer": "aurai",
        "accept": [],
        "context": "Du wirst im Mai dreißig.",
        "explanation": "J’aurai trente ans en mai.",
        "audio": "J’aurai trente ans en mai.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:avoir",
        "checkKey": "A2L7-transfer-avoir-7"
      }
    ]
  },
  "8": {
    "goals": [
      "Über Haustiere sprechen und sie beschreiben.",
      "Sätze mit den Relativpronomen qui und que verbinden.",
      "Fragen zu Pflege und Alltag mit einem Tier stellen und beantworten."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "J’ai un chat ___ dort toute la journée.",
        "answer": "qui",
        "o": [
          "qui",
          "que",
          "qu’"
        ],
        "context": "Ich habe eine Katze, die den ganzen Tag schläft.",
        "tag": "qui",
        "explanation": "J’ai un chat qui dort toute la journée. = Ich habe eine Katze, die den ganzen Tag schläft."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "C’est le chien ___ j’ai trouvé.",
        "answer": "que",
        "o": [
          "que",
          "qui",
          "où"
        ],
        "context": "Das ist der Hund, den ich gefunden habe.",
        "tag": "que",
        "explanation": "C’est le chien que j’ai trouvé. = Das ist der Hund, den ich gefunden habe."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "La dame ___ promène le chien est ma voisine.",
        "answer": "qui",
        "o": [
          "qui",
          "que",
          "qu’"
        ],
        "context": "Die Frau, die den Hund ausführt, ist meine Nachbarin.",
        "tag": "qui",
        "explanation": "La dame qui promène le chien est ma voisine. = Die Frau, die den Hund ausführt, ist meine Nachbarin."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Le lapin ___ il a acheté est blanc.",
        "answer": "qu’",
        "o": [
          "qu’",
          "qui",
          "que"
        ],
        "context": "Das Kaninchen, das er gekauft hat, ist weiß.",
        "tag": "que",
        "explanation": "Vor Vokal wird que zu qu’: qu’il."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "C’est un animal ___ aime l’eau.",
        "answer": "qui",
        "o": [
          "qui",
          "que",
          "qu’"
        ],
        "context": "Das ist ein Tier, das Wasser liebt.",
        "tag": "qui",
        "explanation": "C’est un animal qui aime l’eau. = Das ist ein Tier, das Wasser liebt."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Ma chatte est ___. (noir)",
        "answer": "noire",
        "o": [
          "noire",
          "noir",
          "noirs"
        ],
        "context": "Meine Katze ist schwarz.",
        "tag": "Adjektiv",
        "explanation": "Ma chatte est noire. = Meine Katze ist schwarz."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je ___ promène tous les soirs. (den Hund)",
        "answer": "le",
        "o": [
          "le",
          "lui",
          "la"
        ],
        "context": "Ich gehe jeden Abend mit ihm raus.",
        "tag": "Pronomen",
        "explanation": "Je le promène tous les soirs. = Ich gehe jeden Abend mit ihm raus."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je ___ donne à manger. (dem Hund)",
        "answer": "lui",
        "o": [
          "lui",
          "le",
          "leur"
        ],
        "context": "Ich gebe ihm zu fressen.",
        "tag": "Pronomen",
        "explanation": "Donner à quelqu’un → lui."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Les chiens sont ___ dans le magasin.",
        "answer": "interdits",
        "o": [
          "interdits",
          "interdit",
          "autorisé"
        ],
        "context": "Hunde sind im Geschäft verboten.",
        "tag": "Adjektiv",
        "explanation": "Les chiens sont interdits dans le magasin. = Hunde sind im Geschäft verboten."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Qui ___ ton chat pendant les vacances ?",
        "answer": "garde",
        "o": [
          "garde",
          "regarde",
          "promène"
        ],
        "context": "Wer passt in den Ferien auf deine Katze auf?",
        "tag": "Pflege",
        "explanation": "Qui garde ton chat pendant les vacances ? = Wer passt in den Ferien auf deine Katze auf?"
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "« Mon fils a un hamster qui dort le jour et qui joue la nuit. » Wann spielt der Hamster?",
        "o": [
          "nachts",
          "tagsüber",
          "morgens"
        ],
        "answer": "nachts",
        "explanation": "Qui joue la nuit = der nachts spielt.",
        "tag": "Anwenden",
        "family": "qui",
        "checkKey": "A2L8-context-qui"
      },
      {
        "type": "choice",
        "q": "Welcher Satz ist richtig?",
        "o": [
          "Le chat que nous avons adopté est très calme.",
          "Le chat qui nous avons adopté est très calme.",
          "Le chat que a adopté est très calme."
        ],
        "answer": "Le chat que nous avons adopté est très calme.",
        "explanation": "Nous avons adopté le chat → Objekt → que.",
        "tag": "Anwenden",
        "family": "que",
        "checkKey": "A2L8-context-que",
        "audio": "Le chat que nous avons adopté est très calme."
      },
      {
        "type": "choice",
        "q": "« Les animaux sont interdits dans l’hôtel. » Darfst du deinen Hund mitnehmen?",
        "o": [
          "Nein, Tiere sind verboten.",
          "Ja, aber nur kleine Hunde.",
          "Ja, gegen Aufpreis."
        ],
        "answer": "Nein, Tiere sind verboten.",
        "explanation": "Interdit = verboten.",
        "tag": "Anwenden",
        "family": "interdit",
        "checkKey": "A2L8-context-interdit"
      },
      {
        "type": "choice",
        "q": "Du fragst deinen Partner in der Prüfung nach Haustieren.",
        "o": [
          "Tu as un animal de compagnie ?",
          "Tu as un animal de compagnon ?",
          "Tu as une animale de compagnie ?"
        ],
        "answer": "Tu as un animal de compagnie ?",
        "explanation": "Un animal de compagnie = ein Haustier; animal ist männlich, le compagnon ist der Begleiter.",
        "tag": "Anwenden",
        "family": "question",
        "checkKey": "A2L8-context-question",
        "audio": "Tu as un animal de compagnie ?"
      },
      {
        "type": "choice",
        "q": "Du sagst, dass deine Nachbarin auf deine Katze aufpasst.",
        "o": [
          "Ma voisine garde mon chat.",
          "Ma voisine regarde mon chat.",
          "Ma voisine promène mon chat."
        ],
        "answer": "Ma voisine garde mon chat.",
        "explanation": "Garder = aufpassen auf.",
        "tag": "Anwenden",
        "family": "garder",
        "checkKey": "A2L8-context-garder",
        "audio": "Ma voisine garde mon chat."
      },
      {
        "type": "choice",
        "q": "« Je promène mon chien trois fois par jour. » Wie oft geht die Person mit dem Hund raus?",
        "o": [
          "dreimal täglich",
          "dreimal pro Woche",
          "jeden dritten Tag"
        ],
        "answer": "dreimal täglich",
        "explanation": "Trois fois par jour = dreimal am Tag.",
        "tag": "Anwenden",
        "family": "frequence",
        "checkKey": "A2L8-context-frequence"
      },
      {
        "type": "choice",
        "q": "Du beschreibst deine Hündin.",
        "o": [
          "Ma chienne est petite et blanche.",
          "Ma chienne est petit et blanc.",
          "Ma chienne est petits et blancs."
        ],
        "answer": "Ma chienne est petite et blanche.",
        "explanation": "La chienne ist weiblich: petite, blanche.",
        "tag": "Anwenden",
        "family": "accord",
        "checkKey": "A2L8-context-accord",
        "audio": "Ma chienne est petite et blanche."
      },
      {
        "type": "choice",
        "q": "« C’est la voisine qui me donne des œufs. » Wer gibt die Eier?",
        "o": [
          "die Nachbarin",
          "die Person, die spricht",
          "beide"
        ],
        "answer": "die Nachbarin",
        "explanation": "Qui ersetzt la voisine als Subjekt.",
        "tag": "Anwenden",
        "family": "sujet",
        "checkKey": "A2L8-context-sujet"
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "J’ai un chien ___ adore jouer.",
        "answer": "qui",
        "accept": [],
        "context": "Ich habe einen Hund, der gern spielt.",
        "explanation": "J’ai un chien qui adore jouer.",
        "audio": "J’ai un chien qui adore jouer.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:qui",
        "checkKey": "A2L8-transfer-qui-0"
      },
      {
        "type": "gap",
        "prompt": "C’est la dame ___ habite en face.",
        "answer": "qui",
        "accept": [],
        "context": "Das ist die Frau, die gegenüber wohnt.",
        "explanation": "C’est la dame qui habite en face.",
        "audio": "C’est la dame qui habite en face.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:qui",
        "checkKey": "A2L8-transfer-qui-1"
      },
      {
        "type": "gap",
        "prompt": "Voici le chat ___ j’ai adopté.",
        "answer": "que",
        "accept": [],
        "context": "Hier ist die Katze, die ich adoptiert habe.",
        "explanation": "Voici le chat que j’ai adopté.",
        "audio": "Voici le chat que j’ai adopté.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:que",
        "checkKey": "A2L8-transfer-que-2"
      },
      {
        "type": "gap",
        "prompt": "Le chien ___ il promène est énorme.",
        "answer": "qu’",
        "accept": [],
        "context": "Der Hund, mit dem er spazieren geht, ist riesig.",
        "explanation": "Le chien qu’il promène est énorme.",
        "audio": "Le chien qu’il promène est énorme.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:quelide",
        "checkKey": "A2L8-transfer-quelide-3"
      },
      {
        "type": "gap",
        "prompt": "Ma chatte est très ___. (gentil)",
        "answer": "gentille",
        "accept": [],
        "context": "Deine Katze ist sehr lieb.",
        "explanation": "Ma chatte est très gentille.",
        "audio": "Ma chatte est très gentille.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:accord",
        "checkKey": "A2L8-transfer-accord-4"
      },
      {
        "type": "gap",
        "prompt": "Mon chien ? Je ___ promène le soir.",
        "answer": "le",
        "accept": [],
        "context": "Deinen Hund führst du abends aus.",
        "explanation": "Mon chien ? Je le promène le soir.",
        "audio": "Mon chien ? Je le promène le soir.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:pronom",
        "checkKey": "A2L8-transfer-pronom-5"
      },
      {
        "type": "gap",
        "prompt": "Je ___ donne à manger à sept heures. (à mon chat)",
        "answer": "lui",
        "accept": [],
        "context": "Du fütterst deine Katze um sieben.",
        "explanation": "Je lui donne à manger à sept heures.",
        "audio": "Je lui donne à manger à sept heures.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:lui",
        "checkKey": "A2L8-transfer-lui-6"
      }
    ]
  },
  "9": {
    "goals": [
      "Das Lieblingsgericht beschreiben, Zutaten und Mengen nennen.",
      "Mengenangaben mit dem Pronomen en ersetzen.",
      "Nach Essgewohnheiten fragen und antworten."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Du pain ? J’___ achète tous les jours.",
        "answer": "en",
        "o": [
          "en",
          "le",
          "y"
        ],
        "context": "Brot? Ich kaufe jeden Tag welches.",
        "tag": "en",
        "explanation": "Du pain ? J’en achète tous les jours. = Brot? Ich kaufe jeden Tag welches."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Des tomates ? J’en prends un ___.",
        "answer": "kilo",
        "o": [
          "kilo",
          "litre",
          "morceau"
        ],
        "context": "Tomaten? Ich nehme ein Kilo.",
        "tag": "Menge",
        "explanation": "Des tomates ? J’en prends un kilo. = Tomaten? Ich nehme ein Kilo."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "De la viande ? Je n’___ mange pas.",
        "answer": "en",
        "o": [
          "en",
          "la",
          "y"
        ],
        "context": "Fleisch? Ich esse keines.",
        "tag": "en",
        "explanation": "De la viande ? Je n’en mange pas. = Fleisch? Ich esse keines."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Des enfants ? Elle ___ a trois.",
        "answer": "en",
        "o": [
          "en",
          "les",
          "y"
        ],
        "context": "Kinder? Sie hat drei.",
        "tag": "en",
        "explanation": "Des enfants ? Elle en a trois. = Kinder? Sie hat drei."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Du sucre ? Il en met ___.",
        "answer": "beaucoup",
        "o": [
          "beaucoup",
          "beaucoup de",
          "très"
        ],
        "context": "Zucker? Er nimmt viel davon.",
        "tag": "Menge",
        "explanation": "Mit en steht beaucoup allein."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Il faut ___ farine.",
        "answer": "de la",
        "o": [
          "de la",
          "du",
          "des"
        ],
        "context": "Man braucht Mehl.",
        "tag": "Teilungsartikel",
        "explanation": "La farine ist weiblich: de la farine."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Il faut ___ lait.",
        "answer": "du",
        "o": [
          "du",
          "de la",
          "des"
        ],
        "context": "Man braucht Milch.",
        "tag": "Teilungsartikel",
        "explanation": "Il faut du lait. = Man braucht Milch."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "On ___ les oignons. (couper)",
        "answer": "coupe",
        "o": [
          "coupe",
          "coupes",
          "coupent"
        ],
        "context": "Man schneidet die Zwiebeln.",
        "tag": "on",
        "explanation": "On coupe les oignons. = Man schneidet die Zwiebeln."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je ne mange jamais ___ viande.",
        "answer": "de",
        "o": [
          "de",
          "de la",
          "la"
        ],
        "context": "Ich esse nie Fleisch.",
        "tag": "Verneinung",
        "explanation": "Nach ne … jamais wird de la zu de."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je mange du poisson une fois ___ semaine.",
        "answer": "par",
        "o": [
          "par",
          "pour",
          "à la"
        ],
        "context": "Ich esse einmal pro Woche Fisch.",
        "tag": "Häufigkeit",
        "explanation": "Je mange du poisson une fois par semaine. = Ich esse einmal pro Woche Fisch."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "Am Markt: « Des pommes ? Combien ? » Du möchtest zwei Kilo.",
        "o": [
          "J’en voudrais deux kilos.",
          "Je les voudrais deux kilos.",
          "J’y voudrais deux kilos."
        ],
        "answer": "J’en voudrais deux kilos.",
        "explanation": "Des pommes → en; die Menge steht am Ende.",
        "tag": "Anwenden",
        "family": "en",
        "checkKey": "A2L9-context-en",
        "audio": "J’en voudrais deux kilos."
      },
      {
        "type": "choice",
        "q": "« Du café ? Non merci, je n’en bois jamais le soir. » Was stimmt?",
        "o": [
          "Die Person trinkt abends nie Kaffee.",
          "Die Person trinkt nur abends Kaffee.",
          "Die Person trinkt abends wenig Kaffee."
        ],
        "answer": "Die Person trinkt abends nie Kaffee.",
        "explanation": "Ne … jamais = nie; en = Kaffee.",
        "tag": "Anwenden",
        "family": "jamais",
        "checkKey": "A2L9-context-jamais"
      },
      {
        "type": "choice",
        "q": "Dein Partner fragt in der Prüfung nach deinem Lieblingsgericht.",
        "o": [
          "Quel est ton plat préféré ?",
          "Quelle est ta assiette préférée ?",
          "Qu’est-ce que tu cuisines hier ?"
        ],
        "answer": "Quel est ton plat préféré ?",
        "explanation": "Le plat préféré = das Lieblingsgericht.",
        "tag": "Anwenden",
        "family": "question",
        "checkKey": "A2L9-context-question",
        "audio": "Quel est ton plat préféré ?"
      },
      {
        "type": "choice",
        "q": "« Pour la soupe, il faut trois carottes et un oignon. » Wie viele Karotten braucht man?",
        "o": [
          "drei",
          "eine",
          "zwei"
        ],
        "answer": "drei",
        "explanation": "Trois carottes = drei Karotten.",
        "tag": "Anwenden",
        "family": "quantite",
        "checkKey": "A2L9-context-quantite"
      },
      {
        "type": "choice",
        "q": "Du sagst, dass du einmal pro Woche Fleisch isst.",
        "o": [
          "Je mange de la viande une fois par semaine.",
          "Je mange la viande une fois la semaine.",
          "Je mange de viande une semaine par fois."
        ],
        "answer": "Je mange de la viande une fois par semaine.",
        "explanation": "Teilungsartikel de la + une fois par semaine.",
        "tag": "Anwenden",
        "family": "frequence",
        "checkKey": "A2L9-context-frequence",
        "audio": "Je mange de la viande une fois par semaine."
      },
      {
        "type": "choice",
        "q": "« Ça cuit pendant une heure à feu doux. » Wie lange kocht das Gericht?",
        "o": [
          "eine Stunde",
          "eine halbe Stunde",
          "zehn Minuten"
        ],
        "answer": "eine Stunde",
        "explanation": "Pendant une heure = eine Stunde lang.",
        "tag": "Anwenden",
        "family": "cuire",
        "checkKey": "A2L9-context-cuire"
      },
      {
        "type": "choice",
        "q": "Du isst keinen Käse.",
        "o": [
          "Je ne mange pas de fromage.",
          "Je ne mange pas du fromage.",
          "Je ne mange pas des fromage."
        ],
        "answer": "Je ne mange pas de fromage.",
        "explanation": "Nach der Verneinung wird du zu de.",
        "tag": "Anwenden",
        "family": "negation",
        "checkKey": "A2L9-context-negation",
        "audio": "Je ne mange pas de fromage."
      },
      {
        "type": "choice",
        "q": "« C’est délicieux, mais trop épicé pour moi. » Was stört die Person?",
        "o": [
          "Es ist zu scharf.",
          "Es ist zu salzig.",
          "Es ist zu süß."
        ],
        "answer": "Es ist zu scharf.",
        "explanation": "Épicé = scharf gewürzt.",
        "tag": "Anwenden",
        "family": "gout",
        "checkKey": "A2L9-context-gout"
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "Des fraises ? J’___ achète un kilo.",
        "answer": "en",
        "accept": [],
        "context": "Erdbeeren? Du kaufst ein Kilo davon.",
        "explanation": "Des fraises ? J’en achète un kilo.",
        "audio": "Des fraises ? J’en achète un kilo.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:en",
        "checkKey": "A2L9-transfer-en-0"
      },
      {
        "type": "gap",
        "prompt": "Du thé ? Oui, j’___ veux bien.",
        "answer": "en",
        "accept": [],
        "context": "Tee? Ja, gern.",
        "explanation": "Du thé ? Oui, j’en veux bien.",
        "audio": "Du thé ? Oui, j’en veux bien.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:en",
        "checkKey": "A2L9-transfer-en-1"
      },
      {
        "type": "gap",
        "prompt": "Des œufs ? Je n’___ ai plus.",
        "answer": "en",
        "accept": [],
        "context": "Eier? Du hast keine mehr.",
        "explanation": "Des œufs ? Je n’en ai plus.",
        "audio": "Des œufs ? Je n’en ai plus.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:negation",
        "checkKey": "A2L9-transfer-negation-2"
      },
      {
        "type": "gap",
        "prompt": "Il faut ___ crème. (Sahne)",
        "answer": "de la",
        "accept": [],
        "context": "Man braucht Sahne.",
        "explanation": "Il faut de la crème.",
        "audio": "Il faut de la crème.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:partitif",
        "checkKey": "A2L9-transfer-partitif-3"
      },
      {
        "type": "gap",
        "prompt": "Je bois ___ eau.",
        "answer": "de l’",
        "accept": [],
        "context": "Du trinkst Wasser.",
        "explanation": "Je bois de l’eau.",
        "audio": "Je bois de l’eau.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:partitif",
        "checkKey": "A2L9-transfer-partitif-4"
      },
      {
        "type": "gap",
        "prompt": "Je ne bois jamais ___ alcool.",
        "answer": "d’",
        "accept": [],
        "context": "Du trinkst nie Alkohol.",
        "explanation": "Je ne bois jamais d’alcool.",
        "audio": "Je ne bois jamais d’alcool.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:jamais",
        "checkKey": "A2L9-transfer-jamais-5"
      },
      {
        "type": "gap",
        "prompt": "On ___ le riz pendant dix minutes. (cuire)",
        "answer": "cuit",
        "accept": [],
        "context": "Man kocht den Reis zehn Minuten.",
        "explanation": "On cuit le riz pendant dix minutes.",
        "audio": "On cuit le riz pendant dix minutes.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:recette",
        "checkKey": "A2L9-transfer-recette-6"
      }
    ]
  },
  "10": {
    "goals": [
      "Auf eine gute Nachricht reagieren und gratulieren.",
      "Jemanden schriftlich und mündlich einladen und um Antwort bitten.",
      "Ausrufe mit quel / quelle und Präpositionen wie au / à la richtig verwenden."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "___ chance !",
        "answer": "Quelle",
        "o": [
          "Quelle",
          "Quel",
          "Quels"
        ],
        "context": "Was für ein Glück!",
        "tag": "quel",
        "explanation": "Quelle chance ! = Was für ein Glück!"
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "___ beau cadeau !",
        "answer": "Quel",
        "o": [
          "Quel",
          "Quelle",
          "Quelles"
        ],
        "context": "Was für ein schönes Geschenk!",
        "tag": "quel",
        "explanation": "Quel beau cadeau ! = Was für ein schönes Geschenk!"
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "___ bonne nouvelle !",
        "answer": "Quelle",
        "o": [
          "Quelle",
          "Quel",
          "Quelles"
        ],
        "context": "Was für eine gute Nachricht!",
        "tag": "quel",
        "explanation": "Quelle bonne nouvelle ! = Was für eine gute Nachricht!"
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "___ jolies fleurs !",
        "answer": "Quelles",
        "o": [
          "Quelles",
          "Quels",
          "Quelle"
        ],
        "context": "Was für hübsche Blumen!",
        "tag": "quel",
        "explanation": "Les fleurs ist weiblich Plural → Quelles."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "___ beaux enfants !",
        "answer": "Quels",
        "o": [
          "Quels",
          "Quelles",
          "Quel"
        ],
        "context": "Was für schöne Kinder!",
        "tag": "quel",
        "explanation": "Quels beaux enfants ! = Was für schöne Kinder!"
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je t’invite ___ restaurant.",
        "answer": "au",
        "o": [
          "au",
          "à la",
          "aux"
        ],
        "context": "Ich lade dich ins Restaurant ein.",
        "tag": "à + Artikel",
        "explanation": "Je t’invite au restaurant. = Ich lade dich ins Restaurant ein."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "On va ___ piscine ?",
        "answer": "à la",
        "o": [
          "à la",
          "au",
          "aux"
        ],
        "context": "Gehen wir ins Schwimmbad?",
        "tag": "à + Artikel",
        "explanation": "On va à la piscine ? = Gehen wir ins Schwimmbad?"
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je vous invite ___ mon anniversaire.",
        "answer": "à",
        "o": [
          "à",
          "au",
          "chez"
        ],
        "context": "Ich lade euch zu meinem Geburtstag ein.",
        "tag": "à",
        "explanation": "Inviter à + Possessiv: à mon anniversaire. Au enthält schon le, chez steht nur vor Personen."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "___ pour ton examen !",
        "answer": "Félicitations",
        "o": [
          "Félicitations",
          "Désolé",
          "Bon courage"
        ],
        "context": "Glückwunsch zur Prüfung!",
        "tag": "gratulieren",
        "explanation": "Félicitations gratuliert. Bon courage wünscht Kraft vor der Prüfung, désolé bedauert."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Merci, je viens avec ___ !",
        "answer": "plaisir",
        "o": [
          "plaisir",
          "chance",
          "surprise"
        ],
        "context": "Danke, ich komme gern!",
        "tag": "annehmen",
        "explanation": "Merci, je viens avec plaisir ! = Danke, ich komme gern!"
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "Deine Freundin schreibt: « J’ai trouvé un appartement près du parc ! » Wie reagierst du?",
        "o": [
          "Quelle chance !",
          "Quel dommage !",
          "Bon courage !"
        ],
        "answer": "Quelle chance !",
        "explanation": "Quelle chance = Was für ein Glück – passt zu einer guten Nachricht.",
        "tag": "Anwenden",
        "family": "reaction",
        "checkKey": "A2L10-context-reaction",
        "audio": "Quelle chance !"
      },
      {
        "type": "choice",
        "q": "« Je t’invite à la crêperie jeudi soir. Dis-moi si ça te va. » Was sollst du tun?",
        "o": [
          "antworten, ob dir der Termin passt",
          "die Crêperie reservieren",
          "am Donnerstag anrufen"
        ],
        "answer": "antworten, ob dir der Termin passt",
        "explanation": "Dis-moi si ça te va = sag mir, ob es dir passt.",
        "tag": "Anwenden",
        "family": "repondre",
        "checkKey": "A2L10-context-repondre"
      },
      {
        "type": "choice",
        "q": "Du lädst einen Kollegen zu deinem Geburtstag ein.",
        "o": [
          "Je t’invite à mon anniversaire.",
          "Je t’invite au mon anniversaire.",
          "Je t’invite chez mon anniversaire."
        ],
        "answer": "Je t’invite à mon anniversaire.",
        "explanation": "Inviter à + Possessiv: à mon anniversaire.",
        "tag": "Anwenden",
        "family": "inviter",
        "checkKey": "A2L10-context-inviter",
        "audio": "Je t’invite à mon anniversaire."
      },
      {
        "type": "choice",
        "q": "Welcher Ausruf ist richtig?",
        "o": [
          "Quelle belle surprise !",
          "Quel belle surprise !",
          "Quels belle surprise !"
        ],
        "answer": "Quelle belle surprise !",
        "explanation": "La surprise ist weiblich: Quelle belle surprise.",
        "tag": "Anwenden",
        "family": "quel",
        "checkKey": "A2L10-context-quel",
        "audio": "Quelle belle surprise !"
      },
      {
        "type": "choice",
        "q": "« Écris-moi de préférence par SMS, je ne lis pas souvent mes e-mails. » Warum soll man eine SMS schicken?",
        "o": [
          "Die Person liest selten E-Mails.",
          "Ihr Handy ist kaputt.",
          "Eine SMS ist billiger."
        ],
        "answer": "Die Person liest selten E-Mails.",
        "explanation": "Ne … pas souvent = nicht oft.",
        "tag": "Anwenden",
        "family": "sms",
        "checkKey": "A2L10-context-sms"
      },
      {
        "type": "choice",
        "q": "Du nimmst eine Einladung gern an.",
        "o": [
          "Merci, avec plaisir !",
          "Merci, quel dommage !",
          "Merci, ce n’est pas grave !"
        ],
        "answer": "Merci, avec plaisir !",
        "explanation": "Avec plaisir = gern.",
        "tag": "Anwenden",
        "family": "accepter",
        "checkKey": "A2L10-context-accepter",
        "audio": "Merci, avec plaisir !"
      },
      {
        "type": "choice",
        "q": "« J’ai aussi quelque chose à te raconter, mais je te le dirai au restaurant. » Wann erfährst du es?",
        "o": [
          "im Restaurant",
          "in der nächsten E-Mail",
          "gleich am Telefon"
        ],
        "answer": "im Restaurant",
        "explanation": "Je te le dirai au restaurant = ich sage es dir im Restaurant.",
        "tag": "Anwenden",
        "family": "surprise",
        "checkKey": "A2L10-context-surprise"
      },
      {
        "type": "choice",
        "q": "Du gratulierst zur bestandenen Prüfung.",
        "o": [
          "Félicitations pour ton examen !",
          "Désolé pour ton examen !",
          "Bon courage pour ton examen !"
        ],
        "answer": "Félicitations pour ton examen !",
        "explanation": "Félicitations = herzlichen Glückwunsch. Bon courage sagt man vor der Prüfung.",
        "tag": "Anwenden",
        "family": "feliciter",
        "checkKey": "A2L10-context-feliciter",
        "audio": "Félicitations pour ton examen !"
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "___ bonne idée ! (Ausruf)",
        "answer": "Quelle",
        "accept": [],
        "context": "Was für eine gute Idee!",
        "explanation": "Quelle bonne idée !",
        "audio": "Quelle bonne idée !",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:quelle",
        "checkKey": "A2L10-transfer-quelle-0"
      },
      {
        "type": "gap",
        "prompt": "___ temps magnifique ! (Ausruf)",
        "answer": "Quel",
        "accept": [],
        "context": "Was für ein herrliches Wetter!",
        "explanation": "Quel temps magnifique !",
        "audio": "Quel temps magnifique !",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:quel",
        "checkKey": "A2L10-transfer-quel-1"
      },
      {
        "type": "gap",
        "prompt": "___ beaux souvenirs ! (Ausruf)",
        "answer": "Quels",
        "accept": [],
        "context": "Was für schöne Erinnerungen!",
        "explanation": "Quels beaux souvenirs !",
        "audio": "Quels beaux souvenirs !",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:quels",
        "checkKey": "A2L10-transfer-quels-2"
      },
      {
        "type": "gap",
        "prompt": "On se retrouve ___ café ? (à + le)",
        "answer": "au",
        "accept": [],
        "context": "Treffen wir uns im Café?",
        "explanation": "On se retrouve au café ?",
        "audio": "On se retrouve au café ?",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:au",
        "checkKey": "A2L10-transfer-au-3"
      },
      {
        "type": "gap",
        "prompt": "Je t’invite ___ Jeux olympiques ! (à + les)",
        "answer": "aux",
        "accept": [],
        "context": "Du lädst jemanden zu den Olympischen Spielen ein.",
        "explanation": "Je t’invite aux Jeux olympiques !",
        "audio": "Je t’invite aux Jeux olympiques !",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:aux",
        "checkKey": "A2L10-transfer-aux-4"
      },
      {
        "type": "gap",
        "prompt": "___ pour ton mariage ! (Glückwunsch)",
        "answer": "Félicitations",
        "accept": [],
        "context": "Du gratulierst zur Hochzeit.",
        "explanation": "Félicitations pour ton mariage !",
        "audio": "Félicitations pour ton mariage !",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:feliciter",
        "checkKey": "A2L10-transfer-feliciter-5"
      },
      {
        "type": "gap",
        "prompt": "Il faut ___ ça ensemble ! (feiern)",
        "answer": "fêter",
        "accept": [],
        "context": "Das müssen wir zusammen feiern.",
        "explanation": "Il faut fêter ça ensemble !",
        "audio": "Il faut fêter ça ensemble !",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:fete",
        "checkKey": "A2L10-transfer-fete-6"
      }
    ]
  },
  "11": {
    "goals": [
      "Sonderangebote und Durchsagen im Supermarkt verstehen.",
      "Preise pro Kilo oder Stück verstehen und vergleichen.",
      "Mit ne … que und seulement „nur“ ausdrücken."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Les tomates sont ___ trois euros le kilo.",
        "answer": "à",
        "o": [
          "à",
          "de",
          "pour"
        ],
        "context": "Die Tomaten kosten drei Euro das Kilo.",
        "tag": "Preis",
        "explanation": "Les tomates sont à trois euros le kilo. = Die Tomaten kosten drei Euro das Kilo."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Le melon est à deux euros ___ pièce.",
        "answer": "la",
        "o": [
          "la",
          "le",
          "une"
        ],
        "context": "Die Melone kostet zwei Euro das Stück.",
        "tag": "Preis",
        "explanation": "Le melon est à deux euros la pièce. = Die Melone kostet zwei Euro das Stück."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Un litre ___ lait, s’il vous plaît.",
        "answer": "de",
        "o": [
          "de",
          "du",
          "de la"
        ],
        "context": "Einen Liter Milch, bitte.",
        "tag": "Menge",
        "explanation": "Nach einer Mengenangabe steht nur de."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Un paquet ___ café coûte quatre euros.",
        "answer": "de",
        "o": [
          "de",
          "du",
          "des"
        ],
        "context": "Eine Packung Kaffee kostet vier Euro.",
        "tag": "Menge",
        "explanation": "Un paquet de café coûte quatre euros. = Eine Packung Kaffee kostet vier Euro."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Le jambon est à quinze euros ___ kilo.",
        "answer": "le",
        "o": [
          "le",
          "du",
          "un"
        ],
        "context": "Der Schinken kostet fünfzehn Euro das Kilo.",
        "tag": "Preis",
        "explanation": "Preis pro Einheit mit bestimmtem Artikel: quinze euros le kilo (auch: au kilo)."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je ___ prends qu’un kilo.",
        "answer": "ne",
        "o": [
          "ne",
          "n’",
          "pas"
        ],
        "context": "Ich nehme nur ein Kilo.",
        "tag": "ne … que",
        "explanation": "Je ne prends qu’un kilo. = Ich nehme nur ein Kilo."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Il n’y a ___ deux caisses ouvertes.",
        "answer": "que",
        "o": [
          "que",
          "pas",
          "plus"
        ],
        "context": "Es sind nur zwei Kassen offen.",
        "tag": "ne … que",
        "explanation": "Il n’y a que deux caisses ouvertes. = Es sind nur zwei Kassen offen."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je ne bois que ___ thé.",
        "answer": "du",
        "o": [
          "du",
          "de",
          "le"
        ],
        "context": "Ich trinke nur Tee.",
        "tag": "ne … que",
        "explanation": "Ne … que ist keine Verneinung: du bleibt."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "C’est à cinq euros ___.",
        "answer": "seulement",
        "o": [
          "seulement",
          "que",
          "environ"
        ],
        "context": "Es kostet nur fünf Euro.",
        "tag": "seulement",
        "explanation": "Am Satzende steht für „nur“ seulement; que braucht ne davor, environ heißt ungefähr."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Nous n’avons ___ dix minutes.",
        "answer": "que",
        "o": [
          "que",
          "pas",
          "jamais"
        ],
        "context": "Wir haben nur zehn Minuten.",
        "tag": "ne … que",
        "explanation": "Nous n’avons que dix minutes. = Wir haben nur zehn Minuten."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "Durchsage: « Les poires à trois euros le kilo seulement ; le saumon à dix-huit euros le kilo. » Was kostet ein Kilo Birnen?",
        "o": [
          "3 €",
          "18 €",
          "13 €"
        ],
        "answer": "3 €",
        "explanation": "Die 18 € gehören zum Lachs.",
        "tag": "Anwenden",
        "family": "prix",
        "checkKey": "A2L11-context-prix"
      },
      {
        "type": "choice",
        "q": "« Profitez de nos offres spéciales jusqu’à demain ! » Wie lange gelten die Angebote?",
        "o": [
          "bis morgen",
          "ab morgen",
          "eine Woche lang"
        ],
        "answer": "bis morgen",
        "explanation": "Jusqu’à demain = bis morgen.",
        "tag": "Anwenden",
        "family": "jusqua",
        "checkKey": "A2L11-context-jusqua"
      },
      {
        "type": "choice",
        "q": "Du willst nur ein Baguette.",
        "o": [
          "Je ne prends qu’une baguette.",
          "Je ne prends pas une baguette.",
          "Je ne prends qu’un baguette."
        ],
        "answer": "Je ne prends qu’une baguette.",
        "explanation": "Ne … que = nur.",
        "tag": "Anwenden",
        "family": "neque",
        "checkKey": "A2L11-context-neque",
        "audio": "Je ne prends qu’une baguette."
      },
      {
        "type": "choice",
        "q": "« Les yaourts : deux paquets pour le prix d’un ! » Wie viele Packungen bezahlst du, wenn du zwei nimmst?",
        "o": [
          "eine",
          "zwei",
          "keine"
        ],
        "answer": "eine",
        "explanation": "Pour le prix d’un = zum Preis von einer.",
        "tag": "Anwenden",
        "family": "offre",
        "checkKey": "A2L11-context-offre"
      },
      {
        "type": "choice",
        "q": "Du suchst Käse im Supermarkt.",
        "o": [
          "Excusez-moi, où est le rayon fromages ?",
          "Excusez-moi, où est la caisse fromages ?",
          "Excusez-moi, combien est le rayon fromages ?"
        ],
        "answer": "Excusez-moi, où est le rayon fromages ?",
        "explanation": "Le rayon = die Abteilung.",
        "tag": "Anwenden",
        "family": "rayon",
        "checkKey": "A2L11-context-rayon",
        "audio": "Excusez-moi, où est le rayon fromages ?"
      },
      {
        "type": "choice",
        "q": "« Il n’y a que deux caisses ouvertes. » Was bedeutet das?",
        "o": [
          "Es sind nur zwei Kassen offen.",
          "Zwei Kassen sind geschlossen.",
          "Es gibt keine offene Kasse."
        ],
        "answer": "Es sind nur zwei Kassen offen.",
        "explanation": "Ne … que = nur, keine Verneinung.",
        "tag": "Anwenden",
        "family": "sens",
        "checkKey": "A2L11-context-sens"
      },
      {
        "type": "choice",
        "q": "Du fragst nach dem Preis pro Stück.",
        "o": [
          "C’est combien, la pièce ?",
          "C’est combien de pièces ?",
          "C’est quelle pièce ?"
        ],
        "answer": "C’est combien, la pièce ?",
        "explanation": "La pièce = das Stück.",
        "tag": "Anwenden",
        "family": "piece",
        "checkKey": "A2L11-context-piece",
        "audio": "C’est combien, la pièce ?"
      },
      {
        "type": "choice",
        "q": "« Les fraises sont en promotion au rayon fruits et légumes. » Was stimmt?",
        "o": [
          "Erdbeeren sind im Angebot.",
          "Erdbeeren sind ausverkauft.",
          "Erdbeeren gibt es an der Kasse."
        ],
        "answer": "Erdbeeren sind im Angebot.",
        "explanation": "En promotion = im Angebot.",
        "tag": "Anwenden",
        "family": "promo",
        "checkKey": "A2L11-context-promo"
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "Les pommes sont ___ deux euros le kilo.",
        "answer": "à",
        "accept": [],
        "context": "Die Äpfel kosten zwei Euro das Kilo.",
        "explanation": "Les pommes sont à deux euros le kilo.",
        "audio": "Les pommes sont à deux euros le kilo.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:prix",
        "checkKey": "A2L11-transfer-prix-0"
      },
      {
        "type": "gap",
        "prompt": "Les avocats sont à un euro ___ pièce.",
        "answer": "la",
        "accept": [],
        "context": "Die Avocados kosten einen Euro das Stück.",
        "explanation": "Les avocats sont à un euro la pièce.",
        "audio": "Les avocats sont à un euro la pièce.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:unite",
        "checkKey": "A2L11-transfer-unite-1"
      },
      {
        "type": "gap",
        "prompt": "Je voudrais une bouteille ___ jus d’orange.",
        "answer": "de",
        "accept": [],
        "context": "Du möchtest eine Flasche Orangensaft.",
        "explanation": "Je voudrais une bouteille de jus d’orange.",
        "audio": "Je voudrais une bouteille de jus d’orange.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:quantite",
        "checkKey": "A2L11-transfer-quantite-2"
      },
      {
        "type": "gap",
        "prompt": "Je n’ai ___ dix euros sur moi.",
        "answer": "que",
        "accept": [],
        "context": "Du hast nur zehn Euro dabei.",
        "explanation": "Je n’ai que dix euros sur moi.",
        "audio": "Je n’ai que dix euros sur moi.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:neque",
        "checkKey": "A2L11-transfer-neque-3"
      },
      {
        "type": "gap",
        "prompt": "Elle ___ mange que des légumes.",
        "answer": "ne",
        "accept": [],
        "context": "Sie isst nur Gemüse.",
        "explanation": "Elle ne mange que des légumes.",
        "audio": "Elle ne mange que des légumes.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:neque",
        "checkKey": "A2L11-transfer-neque-4"
      },
      {
        "type": "gap",
        "prompt": "Le pain est à un euro ___. (nur)",
        "answer": "seulement",
        "accept": [],
        "context": "Das Brot kostet nur einen Euro.",
        "explanation": "Le pain est à un euro seulement.",
        "audio": "Le pain est à un euro seulement.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:seulement",
        "checkKey": "A2L11-transfer-seulement-5"
      },
      {
        "type": "gap",
        "prompt": "L’offre est valable ___ samedi.",
        "answer": "jusqu’à",
        "accept": [],
        "context": "Das Angebot gilt bis Samstag.",
        "explanation": "L’offre est valable jusqu’à samedi.",
        "audio": "L’offre est valable jusqu’à samedi.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:jusqua",
        "checkKey": "A2L11-transfer-jusqua-6"
      }
    ]
  },
  "12": {
    "goals": [
      "Eine Nachricht auf dem Anrufbeantworter verstehen.",
      "Absagen, sich entschuldigen und einen Grund nennen.",
      "Einen Termin verschieben und auf Entschuldigungen reagieren."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Je ne ___ pas venir ce soir. (pouvoir, Futur)",
        "answer": "pourrai",
        "o": [
          "pourrai",
          "pouvrai",
          "pourrais"
        ],
        "context": "Ich kann heute Abend nicht kommen.",
        "tag": "futur",
        "explanation": "Je ne pourrai pas venir ce soir. = Ich kann heute Abend nicht kommen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Je ne ___ pas là samedi. (être, Futur)",
        "answer": "serai",
        "o": [
          "serai",
          "suis",
          "serais"
        ],
        "context": "Ich bin am Samstag nicht da.",
        "tag": "futur",
        "explanation": "Je ne serai pas là samedi. = Ich bin am Samstag nicht da."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Je reste à la maison ___ je suis malade.",
        "answer": "parce que",
        "o": [
          "parce que",
          "pourtant",
          "mais"
        ],
        "context": "Ich bleibe zu Hause, weil ich krank bin.",
        "tag": "Grund",
        "explanation": "Je reste à la maison parce que je suis malade. = Ich bleibe zu Hause, weil ich krank bin."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Je ne viens pas, ___ mon fils est malade. (denn)",
        "answer": "car",
        "o": [
          "car",
          "donc",
          "mais"
        ],
        "context": "Ich komme nicht, denn mein Sohn ist krank.",
        "tag": "Grund",
        "explanation": "Je ne viens pas, car mon fils est malade. = Ich komme nicht, denn mein Sohn ist krank."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Je suis ___, j’ai trop de travail.",
        "answer": "désolé",
        "o": [
          "désolé",
          "dommage",
          "grave"
        ],
        "context": "Tut mir leid, ich habe zu viel Arbeit.",
        "tag": "Entschuldigung",
        "explanation": "Je suis désolé, j’ai trop de travail. = Tut mir leid, ich habe zu viel Arbeit."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je dois ___ le rendez-vous. (absagen)",
        "answer": "annuler",
        "o": [
          "annuler",
          "reporter",
          "rappeler"
        ],
        "context": "Ich muss den Termin absagen.",
        "tag": "Termin",
        "explanation": "Je dois annuler le rendez-vous. = Ich muss den Termin absagen."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "On peut ___ à demain ? (verschieben)",
        "answer": "reporter",
        "o": [
          "reporter",
          "annuler",
          "arriver"
        ],
        "context": "Können wir auf morgen verschieben?",
        "tag": "Termin",
        "explanation": "On peut reporter à demain ? = Können wir auf morgen verschieben?"
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Ce n’est pas ___. (nicht schlimm)",
        "answer": "grave",
        "o": [
          "grave",
          "dommage",
          "désolé"
        ],
        "context": "Das ist nicht schlimm.",
        "tag": "reagieren",
        "explanation": "Ce n’est pas grave. = Das ist nicht schlimm."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "___ ! Je voulais te voir. (schade)",
        "answer": "Dommage",
        "o": [
          "Dommage",
          "Bravo",
          "Volontiers"
        ],
        "context": "Schade! Ich wollte dich sehen.",
        "tag": "reagieren",
        "explanation": "Dommage ! Je voulais te voir. = Schade! Ich wollte dich sehen."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Soigne-___ bien !",
        "answer": "toi",
        "o": [
          "toi",
          "te",
          "moi"
        ],
        "context": "Gute Besserung!",
        "tag": "reagieren",
        "explanation": "Imperativ mit reflexivem Verb: soigne-toi."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "Anrufbeantworter: « Désolé, je ne pourrai pas venir au cours de yoga jeudi. Je dois travailler tard. » Was stimmt?",
        "o": [
          "Die Person kommt am Donnerstag nicht.",
          "Die Person kommt etwas später.",
          "Die Person kommt am Donnerstag früher."
        ],
        "answer": "Die Person kommt am Donnerstag nicht.",
        "explanation": "Je ne pourrai pas venir = ich kann nicht kommen.",
        "tag": "Anwenden",
        "family": "absence",
        "checkKey": "A2L12-context-absence"
      },
      {
        "type": "choice",
        "q": "Warum kommt sie nicht? « J’ai de la fièvre et mal à la tête. »",
        "o": [
          "Sie ist krank.",
          "Sie hat keine Zeit.",
          "Sie hat den Bus verpasst."
        ],
        "answer": "Sie ist krank.",
        "explanation": "De la fièvre = Fieber; mal à la tête = Kopfschmerzen.",
        "tag": "Anwenden",
        "family": "raison",
        "checkKey": "A2L12-context-raison"
      },
      {
        "type": "choice",
        "q": "Du willst den Termin auf Freitag verschieben.",
        "o": [
          "On peut reporter le rendez-vous à vendredi ?",
          "On peut annuler le rendez-vous à vendredi ?",
          "On peut rappeler le rendez-vous vendredi ?"
        ],
        "answer": "On peut reporter le rendez-vous à vendredi ?",
        "explanation": "Reporter à = verschieben auf.",
        "tag": "Anwenden",
        "family": "reporter",
        "checkKey": "A2L12-context-reporter",
        "audio": "On peut reporter le rendez-vous à vendredi ?"
      },
      {
        "type": "choice",
        "q": "Ein Freund entschuldigt sich, dass er fünf Minuten zu spät ist. Du reagierst freundlich.",
        "o": [
          "Ce n’est pas grave.",
          "C’est très grave.",
          "Ce n’est pas possible."
        ],
        "answer": "Ce n’est pas grave.",
        "explanation": "Ce n’est pas grave = nicht schlimm.",
        "tag": "Anwenden",
        "family": "reagir",
        "checkKey": "A2L12-context-reagir",
        "audio": "Ce n’est pas grave."
      },
      {
        "type": "choice",
        "q": "Du sagst ab, weil du arbeiten musst.",
        "o": [
          "Je ne pourrai pas venir parce que je dois travailler.",
          "Je ne pourrai pas venir pour je dois travailler.",
          "Je ne pourrai pas venir donc je dois travailler."
        ],
        "answer": "Je ne pourrai pas venir parce que je dois travailler.",
        "explanation": "Parce que leitet den Grund ein.",
        "tag": "Anwenden",
        "family": "parceque",
        "checkKey": "A2L12-context-parceque",
        "audio": "Je ne pourrai pas venir parce que je dois travailler."
      },
      {
        "type": "choice",
        "q": "« Je te rappelle la semaine prochaine. » Wann ruft die Person an?",
        "o": [
          "nächste Woche",
          "heute Abend",
          "letzte Woche"
        ],
        "answer": "nächste Woche",
        "explanation": "La semaine prochaine = nächste Woche.",
        "tag": "Anwenden",
        "family": "rappeler",
        "checkKey": "A2L12-context-rappeler"
      },
      {
        "type": "choice",
        "q": "Deine Freundin ist krank. Was wünschst du ihr?",
        "o": [
          "Soigne-toi bien !",
          "Bonne fête !",
          "Bon voyage !"
        ],
        "answer": "Soigne-toi bien !",
        "explanation": "Soigne-toi bien = gute Besserung. Bonne fête wünscht man zum Fest, bon voyage vor einer Reise.",
        "tag": "Anwenden",
        "family": "souhait",
        "checkKey": "A2L12-context-souhait",
        "audio": "Soigne-toi bien !"
      },
      {
        "type": "choice",
        "q": "Welche Form ist richtig? « Nous ne ___ pas là dimanche. »",
        "o": [
          "serons",
          "sommes été",
          "serions"
        ],
        "answer": "serons",
        "explanation": "Être im futur simple: nous serons.",
        "tag": "Anwenden",
        "family": "futur",
        "checkKey": "A2L12-context-futur",
        "audio": "Nous ne serons pas là dimanche."
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "Je ne ___ pas venir demain. (pouvoir, Futur)",
        "answer": "pourrai",
        "accept": [],
        "context": "Du kannst morgen nicht kommen.",
        "explanation": "Je ne pourrai pas venir demain.",
        "audio": "Je ne pourrai pas venir demain.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:pouvoir",
        "checkKey": "A2L12-transfer-pouvoir-0"
      },
      {
        "type": "gap",
        "prompt": "Nous ne ___ pas là ce week-end. (être, Futur)",
        "answer": "serons",
        "accept": [],
        "context": "Ihr seid dieses Wochenende nicht da.",
        "explanation": "Nous ne serons pas là ce week-end.",
        "audio": "Nous ne serons pas là ce week-end.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:etre",
        "checkKey": "A2L12-transfer-etre-1"
      },
      {
        "type": "gap",
        "prompt": "Je reste au lit ___ j’ai de la fièvre. (weil)",
        "answer": "parce que",
        "accept": [],
        "context": "Du bleibst im Bett, weil du Fieber hast.",
        "explanation": "Je reste au lit parce que j’ai de la fièvre.",
        "audio": "Je reste au lit parce que j’ai de la fièvre.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:parceque",
        "checkKey": "A2L12-transfer-parceque-2"
      },
      {
        "type": "gap",
        "prompt": "Il n’est pas venu, ___ il était malade. (denn)",
        "answer": "car",
        "accept": [],
        "context": "Er ist nicht gekommen, denn er war krank.",
        "explanation": "Il n’est pas venu, car il était malade.",
        "audio": "Il n’est pas venu, car il était malade.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:car",
        "checkKey": "A2L12-transfer-car-3"
      },
      {
        "type": "gap",
        "prompt": "On peut ___ le cours à mardi ? (verschieben)",
        "answer": "reporter",
        "accept": [],
        "context": "Kann man den Kurs auf Dienstag verschieben?",
        "explanation": "On peut reporter le cours à mardi ?",
        "audio": "On peut reporter le cours à mardi ?",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:reporter",
        "checkKey": "A2L12-transfer-reporter-4"
      },
      {
        "type": "gap",
        "prompt": "Je dois ___ ma réservation. (absagen)",
        "answer": "annuler",
        "accept": [],
        "context": "Du musst deine Reservierung stornieren.",
        "explanation": "Je dois annuler ma réservation.",
        "audio": "Je dois annuler ma réservation.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:annuler",
        "checkKey": "A2L12-transfer-annuler-5"
      },
      {
        "type": "gap",
        "prompt": "Je suis ___, je suis en retard. (Frau)",
        "answer": "désolée",
        "accept": [],
        "context": "Eine Frau entschuldigt sich für die Verspätung.",
        "explanation": "Je suis désolée, je suis en retard.",
        "audio": "Je suis désolée, je suis en retard.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:desole",
        "checkKey": "A2L12-transfer-desole-6"
      }
    ]
  },
  "13": {
    "goals": [
      "Einen Arzttermin vereinbaren und Beschwerden beschreiben.",
      "Bandansagen einer Praxis verstehen (Öffnung, Notfall, Rückruf).",
      "Ausdrücke wie avoir mal à, en raison de, en cas de verwenden."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "J’ai mal ___ dos.",
        "answer": "au",
        "o": [
          "au",
          "à la",
          "aux"
        ],
        "context": "Ich habe Rückenschmerzen.",
        "tag": "avoir mal à",
        "explanation": "J’ai mal au dos. = Ich habe Rückenschmerzen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "J’ai mal ___ gorge.",
        "answer": "à la",
        "o": [
          "à la",
          "au",
          "aux"
        ],
        "context": "Ich habe Halsschmerzen.",
        "tag": "avoir mal à",
        "explanation": "J’ai mal à la gorge. = Ich habe Halsschmerzen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "J’ai mal ___ dents.",
        "answer": "aux",
        "o": [
          "aux",
          "au",
          "à la"
        ],
        "context": "Ich habe Zahnschmerzen.",
        "tag": "avoir mal à",
        "explanation": "Les dents → à + les = aux."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "J’ai de la fièvre ___ hier.",
        "answer": "depuis",
        "o": [
          "depuis",
          "il y a",
          "pendant"
        ],
        "context": "Ich habe seit gestern Fieber.",
        "tag": "depuis",
        "explanation": "J’ai de la fièvre depuis hier. = Ich habe seit gestern Fieber."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Je ___ beaucoup. (tousser)",
        "answer": "tousse",
        "o": [
          "tousse",
          "tousses",
          "toussent"
        ],
        "context": "Ich huste viel.",
        "tag": "Symptome",
        "explanation": "Je tousse beaucoup. = Ich huste viel."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Le cabinet est fermé en ___ de travaux.",
        "answer": "raison",
        "o": [
          "raison",
          "cas",
          "place"
        ],
        "context": "Die Praxis ist wegen Bauarbeiten geschlossen.",
        "tag": "Ansage",
        "explanation": "Le cabinet est fermé en raison de travaux. = Die Praxis ist wegen Bauarbeiten geschlossen."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "En ___ d’urgence, appelez le 15.",
        "answer": "cas",
        "o": [
          "cas",
          "raison",
          "fois"
        ],
        "context": "Im Notfall rufen Sie die 15 an.",
        "tag": "Ansage",
        "explanation": "En cas d’urgence, appelez le 15. = Im Notfall rufen Sie die 15 an."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "___-vous à la pharmacie de garde.",
        "answer": "Adressez",
        "o": [
          "Adressez",
          "Adresse",
          "Adressons"
        ],
        "context": "Wenden Sie sich an die Notdienstapotheke.",
        "tag": "Imperativ",
        "explanation": "Adressez-vous à la pharmacie de garde. = Wenden Sie sich an die Notdienstapotheke."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "___ demain à partir de huit heures. (rappeler)",
        "answer": "Rappelez",
        "o": [
          "Rappelez",
          "Rappellez",
          "Rappelle"
        ],
        "context": "Rufen Sie morgen ab acht wieder an.",
        "tag": "Imperativ",
        "explanation": "Rappelez demain à partir de huit heures. = Rufen Sie morgen ab acht wieder an."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je voudrais ___ rendez-vous.",
        "answer": "prendre",
        "o": [
          "prendre",
          "faire",
          "donner"
        ],
        "context": "Ich möchte einen Termin vereinbaren.",
        "tag": "Termin",
        "explanation": "Je voudrais prendre rendez-vous. = Ich möchte einen Termin vereinbaren."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "Ansage: « Le cabinet est fermé jusqu’au 15 août pour les vacances. Pour une urgence, adressez-vous à la maison médicale de la rue Hoche. » Was machst du im Notfall?",
        "o": [
          "Ich gehe zur Maison médicale in der Rue Hoche.",
          "Ich warte bis zum 15. August.",
          "Ich rufe die Praxis noch einmal an."
        ],
        "answer": "Ich gehe zur Maison médicale in der Rue Hoche.",
        "explanation": "Pour une urgence, adressez-vous à … = im Notfall wenden Sie sich an …",
        "tag": "Anwenden",
        "family": "urgence",
        "checkKey": "A2L13-context-urgence"
      },
      {
        "type": "choice",
        "q": "« La pharmacie est fermée ce matin en raison d’un inventaire. » Warum ist die Apotheke geschlossen?",
        "o": [
          "wegen einer Inventur",
          "wegen Urlaub",
          "wegen Krankheit"
        ],
        "answer": "wegen einer Inventur",
        "explanation": "En raison de = wegen; un inventaire = eine Inventur.",
        "tag": "Anwenden",
        "family": "raison",
        "checkKey": "A2L13-context-raison"
      },
      {
        "type": "choice",
        "q": "Du hast seit drei Tagen Rückenschmerzen.",
        "o": [
          "J’ai mal au dos depuis trois jours.",
          "J’ai mal à le dos depuis trois jours.",
          "J’ai mal au dos il y a trois jours."
        ],
        "answer": "J’ai mal au dos depuis trois jours.",
        "explanation": "Au dos und depuis für eine andauernde Situation.",
        "tag": "Anwenden",
        "family": "douleur",
        "checkKey": "A2L13-context-douleur",
        "audio": "J’ai mal au dos depuis trois jours."
      },
      {
        "type": "choice",
        "q": "Die Ärztin sagt: « Prenez un comprimé matin et soir pendant cinq jours. » Wie oft nimmst du die Tablette?",
        "o": [
          "zweimal am Tag",
          "fünfmal am Tag",
          "einmal am Tag"
        ],
        "answer": "zweimal am Tag",
        "explanation": "Matin et soir = morgens und abends.",
        "tag": "Anwenden",
        "family": "medicament",
        "checkKey": "A2L13-context-medicament"
      },
      {
        "type": "choice",
        "q": "Am Telefon der Praxis: Du möchtest einen Termin für nächste Woche.",
        "o": [
          "Je voudrais prendre rendez-vous pour la semaine prochaine.",
          "Je voudrais prendre rendez-vous la semaine dernière.",
          "Je voudrais un rendez-vous il y a une semaine."
        ],
        "answer": "Je voudrais prendre rendez-vous pour la semaine prochaine.",
        "explanation": "Prochain = nächster.",
        "tag": "Anwenden",
        "family": "rdv",
        "checkKey": "A2L13-context-rdv",
        "audio": "Je voudrais prendre rendez-vous pour la semaine prochaine."
      },
      {
        "type": "choice",
        "q": "« Vous pouvez rappeler demain à partir de huit heures. » Ab wann kannst du morgen anrufen?",
        "o": [
          "ab 8 Uhr",
          "bis 8 Uhr",
          "um 18 Uhr"
        ],
        "answer": "ab 8 Uhr",
        "explanation": "À partir de = ab.",
        "tag": "Anwenden",
        "family": "horaire",
        "checkKey": "A2L13-context-horaire"
      },
      {
        "type": "choice",
        "q": "Die Ärztin fragt: « Qu’est-ce qui ne va pas ? » Du hast Fieber und Husten.",
        "o": [
          "J’ai de la fièvre et je tousse.",
          "Je suis fièvre et je tousse.",
          "J’ai fièvre et tousse."
        ],
        "answer": "J’ai de la fièvre et je tousse.",
        "explanation": "Avoir de la fièvre; tousser.",
        "tag": "Anwenden",
        "family": "symptome",
        "checkKey": "A2L13-context-symptome",
        "audio": "J’ai de la fièvre et je tousse."
      },
      {
        "type": "choice",
        "q": "« Restez au lit et buvez beaucoup d’eau. » Was sollst du tun?",
        "o": [
          "im Bett bleiben und viel trinken",
          "spazieren gehen und Wasser kaufen",
          "zur Arbeit gehen"
        ],
        "answer": "im Bett bleiben und viel trinken",
        "explanation": "Rester au lit = im Bett bleiben; boire = trinken.",
        "tag": "Anwenden",
        "family": "conseil",
        "checkKey": "A2L13-context-conseil"
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "J’ai mal ___ ventre.",
        "answer": "au",
        "accept": [],
        "context": "Du hast Bauchschmerzen.",
        "explanation": "J’ai mal au ventre.",
        "audio": "J’ai mal au ventre.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:malau",
        "checkKey": "A2L13-transfer-malau-0"
      },
      {
        "type": "gap",
        "prompt": "Il a mal ___ tête.",
        "answer": "à la",
        "accept": [],
        "context": "Er hat Kopfschmerzen.",
        "explanation": "Il a mal à la tête.",
        "audio": "Il a mal à la tête.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:malala",
        "checkKey": "A2L13-transfer-malala-1"
      },
      {
        "type": "gap",
        "prompt": "Elle a mal ___ oreilles.",
        "answer": "aux",
        "accept": [],
        "context": "Sie hat Ohrenschmerzen.",
        "explanation": "Elle a mal aux oreilles.",
        "audio": "Elle a mal aux oreilles.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:malaux",
        "checkKey": "A2L13-transfer-malaux-2"
      },
      {
        "type": "gap",
        "prompt": "Le cours est annulé en ___ de la grève.",
        "answer": "raison",
        "accept": [],
        "context": "Der Kurs fällt wegen des Streiks aus.",
        "explanation": "Le cours est annulé en raison de la grève.",
        "audio": "Le cours est annulé en raison de la grève.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:raison",
        "checkKey": "A2L13-transfer-raison-3"
      },
      {
        "type": "gap",
        "prompt": "En ___ de problème, appelez-moi.",
        "answer": "cas",
        "accept": [],
        "context": "Im Fall eines Problems rufen Sie mich an.",
        "explanation": "En cas de problème, appelez-moi.",
        "audio": "En cas de problème, appelez-moi.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:cas",
        "checkKey": "A2L13-transfer-cas-4"
      },
      {
        "type": "gap",
        "prompt": "___-vous à l’accueil. (s’adresser)",
        "answer": "Adressez",
        "accept": [],
        "context": "Wenden Sie sich an den Empfang.",
        "explanation": "Adressez-vous à l’accueil.",
        "audio": "Adressez-vous à l’accueil.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:adresser",
        "checkKey": "A2L13-transfer-adresser-5"
      },
      {
        "type": "gap",
        "prompt": "Je voudrais ___ rendez-vous. (vereinbaren)",
        "answer": "prendre",
        "accept": [],
        "context": "Du möchtest einen Termin vereinbaren.",
        "explanation": "Je voudrais prendre rendez-vous.",
        "audio": "Je voudrais prendre rendez-vous.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:rdv",
        "checkKey": "A2L13-transfer-rdv-6"
      }
    ]
  },
  "14": {
    "goals": [
      "Durchsagen am Bahnhof verstehen und entscheiden, ob sie für mich wichtig sind.",
      "Fahrkarten kaufen und nach Gleis, Anschluss und Verspätung fragen.",
      "Ankündigungen im futur simple und mit en raison de verstehen."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Le train pour Lyon ___ voie 3. (partir)",
        "answer": "partira",
        "o": [
          "partira",
          "partirait",
          "part"
        ],
        "context": "Der Zug nach Lyon wird von Gleis 3 abfahren.",
        "tag": "Futur",
        "explanation": "Le train pour Lyon partira voie 3. = Der Zug nach Lyon wird von Gleis 3 abfahren."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Le TGV ___ avec dix minutes de retard. (arriver)",
        "answer": "arrivera",
        "o": [
          "arrivera",
          "arrivait",
          "arriverait"
        ],
        "context": "Der TGV wird mit zehn Minuten Verspätung ankommen.",
        "tag": "Futur",
        "explanation": "Le TGV arrivera avec dix minutes de retard. = Der TGV wird mit zehn Minuten Verspätung ankommen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Le train de 14 h 10 est ___ . (fällt aus)",
        "answer": "supprimé",
        "o": [
          "supprimé",
          "retardé",
          "composté"
        ],
        "context": "Der Zug um 14.10 Uhr fällt aus.",
        "tag": "Durchsage",
        "explanation": "Le train de 14 h 10 est supprimé . = Der Zug um 14.10 Uhr fällt aus."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "En ___ d’un incident, le trafic est interrompu.",
        "answer": "raison",
        "o": [
          "raison",
          "cas",
          "retard"
        ],
        "context": "Wegen eines Zwischenfalls ist der Verkehr unterbrochen.",
        "tag": "Durchsage",
        "explanation": "En raison d’un incident, le trafic est interrompu. = Wegen eines Zwischenfalls ist der Verkehr unterbrochen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Le train a vingt minutes de ___ .",
        "answer": "retard",
        "o": [
          "retard",
          "avance",
          "voie"
        ],
        "context": "Der Zug hat zwanzig Minuten Verspätung.",
        "tag": "Durchsage",
        "explanation": "Le train a vingt minutes de retard . = Der Zug hat zwanzig Minuten Verspätung."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Un aller ___ pour Nice, s’il vous plaît.",
        "answer": "simple",
        "o": [
          "simple",
          "retour",
          "seul"
        ],
        "context": "Eine einfache Fahrt nach Nizza, bitte.",
        "tag": "Fahrkarte",
        "explanation": "Un aller simple pour Nice, s’il vous plaît. = Eine einfache Fahrt nach Nizza, bitte."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Un ___ en deuxième classe. (hin und zurück)",
        "answer": "aller-retour",
        "o": [
          "aller-retour",
          "aller simple",
          "retour simple"
        ],
        "context": "Hin und zurück, zweite Klasse.",
        "tag": "Fahrkarte",
        "explanation": "Un aller-retour en deuxième classe. = Hin und zurück, zweite Klasse."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Le train part de quelle ___ ?",
        "answer": "voie",
        "o": [
          "voie",
          "voiture",
          "route"
        ],
        "context": "Von welchem Gleis fährt der Zug?",
        "tag": "Gleis",
        "explanation": "Le train part de quelle voie ? = Von welchem Gleis fährt der Zug?"
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "J’ai une ___ à Dijon. (Anschluss)",
        "answer": "correspondance",
        "o": [
          "correspondance",
          "connexion",
          "direction"
        ],
        "context": "Ich habe einen Anschluss in Dijon.",
        "tag": "Anschluss",
        "explanation": "J’ai une correspondance à Dijon. = Ich habe einen Anschluss in Dijon."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Il faut ___ le billet. (entwerten)",
        "answer": "composter",
        "o": [
          "composter",
          "comporter",
          "compter"
        ],
        "context": "Man muss die Fahrkarte entwerten.",
        "tag": "Fahrkarte",
        "explanation": "Il faut composter le billet. = Man muss die Fahrkarte entwerten."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "Du wartest auf den Zug nach Paris. Durchsage: « Le train en direction de Nantes arrivera avec trente minutes de retard. » Ist die Durchsage wichtig für dich?",
        "o": [
          "Nein, sie betrifft den Zug nach Nantes.",
          "Ja, mein Zug hat Verspätung.",
          "Ja, mein Zug fällt aus."
        ],
        "answer": "Nein, sie betrifft den Zug nach Nantes.",
        "explanation": "Die Verspätung gilt nur für die Richtung Nantes.",
        "tag": "Anwenden",
        "family": "important",
        "checkKey": "A2L14-context-important"
      },
      {
        "type": "choice",
        "q": "« Le TER de 9 h 15 pour Rouen est supprimé en raison d’une grève. » Was ist los?",
        "o": [
          "Der Zug fällt wegen eines Streiks aus.",
          "Der Zug hat wegen eines Streiks Verspätung.",
          "Der Zug fährt wegen eines Streiks früher."
        ],
        "answer": "Der Zug fällt wegen eines Streiks aus.",
        "explanation": "Supprimé = fällt aus; une grève = ein Streik.",
        "tag": "Anwenden",
        "family": "supprime",
        "checkKey": "A2L14-context-supprime"
      },
      {
        "type": "choice",
        "q": "Du möchtest nach Lille und zurück, zweite Klasse.",
        "o": [
          "Un aller-retour pour Lille en deuxième classe, s’il vous plaît.",
          "Un aller simple pour Lille en deuxième classe, s’il vous plaît.",
          "Un retour pour Lille en seconde, s’il vous plaît."
        ],
        "answer": "Un aller-retour pour Lille en deuxième classe, s’il vous plaît.",
        "explanation": "Hin und zurück = aller-retour.",
        "tag": "Anwenden",
        "family": "billet",
        "checkKey": "A2L14-context-billet",
        "audio": "Un aller-retour pour Lille en deuxième classe, s’il vous plaît."
      },
      {
        "type": "choice",
        "q": "« Le train pour Strasbourg partira voie 9 et non voie 4. » Wohin gehst du?",
        "o": [
          "zu Gleis 9",
          "zu Gleis 4",
          "zu Gleis 19"
        ],
        "answer": "zu Gleis 9",
        "explanation": "Et non voie 4 = und nicht Gleis 4.",
        "tag": "Anwenden",
        "family": "voie",
        "checkKey": "A2L14-context-voie"
      },
      {
        "type": "choice",
        "q": "« Votre correspondance pour Avignon attendra votre train. » Was heißt das?",
        "o": [
          "Der Anschlusszug wartet.",
          "Der Anschlusszug fällt aus.",
          "Du musst einen anderen Zug nehmen."
        ],
        "answer": "Der Anschlusszug wartet.",
        "explanation": "La correspondance attendra = der Anschluss wird warten.",
        "tag": "Anwenden",
        "family": "correspondance",
        "checkKey": "A2L14-context-correspondance"
      },
      {
        "type": "choice",
        "q": "Du fragst, von welchem Gleis dein Zug fährt.",
        "o": [
          "Le train part de quelle voie ?",
          "Le train part de quelle voiture ?",
          "Le train part de quelle route ?"
        ],
        "answer": "Le train part de quelle voie ?",
        "explanation": "La voie = das Gleis.",
        "tag": "Anwenden",
        "family": "question",
        "checkKey": "A2L14-context-question",
        "audio": "Le train part de quelle voie ?"
      },
      {
        "type": "choice",
        "q": "« Le train arrivera avec un retard d’environ quarante minutes. » Wie groß ist die Verspätung?",
        "o": [
          "etwa 40 Minuten",
          "genau 14 Minuten",
          "etwa 4 Minuten"
        ],
        "answer": "etwa 40 Minuten",
        "explanation": "Environ = ungefähr.",
        "tag": "Anwenden",
        "family": "retard",
        "checkKey": "A2L14-context-retard"
      },
      {
        "type": "choice",
        "q": "Durchsage: « N’oubliez pas de composter votre billet avant de monter dans le train. » Wann entwertest du die Fahrkarte?",
        "o": [
          "vor dem Einsteigen",
          "im Zug",
          "nach der Ankunft"
        ],
        "answer": "vor dem Einsteigen",
        "explanation": "Avant de monter = bevor man einsteigt.",
        "tag": "Anwenden",
        "family": "composter",
        "checkKey": "A2L14-context-composter"
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "Le train pour Nice ___ voie 2. (partir, Futur)",
        "answer": "partira",
        "accept": [],
        "context": "Der Zug nach Nizza fährt von Gleis 2 ab.",
        "explanation": "Le train pour Nice partira voie 2.",
        "audio": "Le train pour Nice partira voie 2.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:futur",
        "checkKey": "A2L14-transfer-futur-0"
      },
      {
        "type": "gap",
        "prompt": "Le TGV ___ à 18 heures. (arriver, Futur)",
        "answer": "arrivera",
        "accept": [],
        "context": "Der TGV kommt um 18 Uhr an.",
        "explanation": "Le TGV arrivera à 18 heures.",
        "audio": "Le TGV arrivera à 18 heures.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:futur",
        "checkKey": "A2L14-transfer-futur-1"
      },
      {
        "type": "gap",
        "prompt": "Le train a quinze minutes de ___ .",
        "answer": "retard",
        "accept": [],
        "context": "Der Zug hat fünfzehn Minuten Verspätung.",
        "explanation": "Le train a quinze minutes de retard .",
        "audio": "Le train a quinze minutes de retard .",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:retard",
        "checkKey": "A2L14-transfer-retard-2"
      },
      {
        "type": "gap",
        "prompt": "Le dernier train est ___ . (fällt aus)",
        "answer": "supprimé",
        "accept": [],
        "context": "Der letzte Zug fällt aus.",
        "explanation": "Le dernier train est supprimé .",
        "audio": "Le dernier train est supprimé .",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:supprime",
        "checkKey": "A2L14-transfer-supprime-3"
      },
      {
        "type": "gap",
        "prompt": "Un aller ___ pour Tours, s’il vous plaît. (einfach)",
        "answer": "simple",
        "accept": [],
        "context": "Du kaufst eine einfache Fahrt nach Tours.",
        "explanation": "Un aller simple pour Tours, s’il vous plaît.",
        "audio": "Un aller simple pour Tours, s’il vous plaît.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:billet",
        "checkKey": "A2L14-transfer-billet-4"
      },
      {
        "type": "gap",
        "prompt": "Le train arrive ___ 6. (Gleis)",
        "answer": "voie",
        "accept": [],
        "context": "Der Zug fährt auf Gleis 6 ein.",
        "explanation": "Le train arrive voie 6.",
        "audio": "Le train arrive voie 6.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:voie",
        "checkKey": "A2L14-transfer-voie-5"
      },
      {
        "type": "gap",
        "prompt": "Le trafic est perturbé en ___ d’une grève.",
        "answer": "raison",
        "accept": [],
        "context": "Der Verkehr ist wegen eines Streiks gestört.",
        "explanation": "Le trafic est perturbé en raison d’une grève.",
        "audio": "Le trafic est perturbé en raison d’une grève.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:raison",
        "checkKey": "A2L14-transfer-raison-6"
      }
    ]
  },
  "15": {
    "goals": [
      "Verkehrsmeldungen im Radio verstehen und die richtige Handlung ableiten.",
      "Durchsagen auf dem Parkplatz verstehen (Fahrer wird gebeten …).",
      "être prié(e) de + Infinitiv und en raison de verwenden."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Vous êtes ___ de quitter l’autoroute.",
        "answer": "priés",
        "o": [
          "priés",
          "prié",
          "priées"
        ],
        "context": "Sie werden gebeten, die Autobahn zu verlassen.",
        "tag": "être prié de",
        "explanation": "Vous an mehrere Autofahrer → priés."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Le conducteur est prié ___ déplacer sa voiture.",
        "answer": "de",
        "o": [
          "de",
          "à",
          "pour"
        ],
        "context": "Der Fahrer wird gebeten, sein Auto wegzufahren.",
        "tag": "être prié de",
        "explanation": "Le conducteur est prié de déplacer sa voiture. = Der Fahrer wird gebeten, sein Auto wegzufahren."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "La propriétaire est ___ de venir à l’accueil.",
        "answer": "priée",
        "o": [
          "priée",
          "prié",
          "priés"
        ],
        "context": "Die Besitzerin wird gebeten, zum Empfang zu kommen.",
        "tag": "être prié de",
        "explanation": "La propriétaire est priée de venir à l’accueil. = Die Besitzerin wird gebeten, zum Empfang zu kommen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Merci ___ ralentir.",
        "answer": "de",
        "o": [
          "de",
          "à",
          "pour"
        ],
        "context": "Bitte langsamer fahren.",
        "tag": "Bitte",
        "explanation": "Merci de ralentir. = Bitte langsamer fahren."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "___ suivre la déviation. (bitte, formell)",
        "answer": "Veuillez",
        "o": [
          "Veuillez",
          "Voulez",
          "Veuille"
        ],
        "context": "Bitte folgen Sie der Umleitung.",
        "tag": "Bitte",
        "explanation": "Veuillez suivre la déviation. = Bitte folgen Sie der Umleitung."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "L’A1 est ___ à la hauteur de Lille. (gesperrt)",
        "answer": "coupée",
        "o": [
          "coupée",
          "coupé",
          "coupés"
        ],
        "context": "Die A1 ist auf Höhe von Lille gesperrt.",
        "tag": "Verkehr",
        "explanation": "L’autoroute ist weiblich → coupée."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Il y a un ___ en direction de Paris. (Stau)",
        "answer": "bouchon",
        "o": [
          "bouchon",
          "bouton",
          "camion"
        ],
        "context": "Es gibt einen Stau Richtung Paris.",
        "tag": "Verkehr",
        "explanation": "Il y a un bouchon en direction de Paris. = Es gibt einen Stau Richtung Paris."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Prenez la ___ 22. (Ausfahrt)",
        "answer": "sortie",
        "o": [
          "sortie",
          "entrée",
          "route"
        ],
        "context": "Nehmen Sie die Ausfahrt 22.",
        "tag": "Verkehr",
        "explanation": "Prenez la sortie 22. = Nehmen Sie die Ausfahrt 22."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Suivez l’itinéraire ___ . (Umleitung)",
        "answer": "bis",
        "o": [
          "bis",
          "bas",
          "biais"
        ],
        "context": "Folgen Sie der Umleitung.",
        "tag": "Verkehr",
        "explanation": "Suivez l’itinéraire bis . = Folgen Sie der Umleitung."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "La route est fermée en ___ de travaux.",
        "answer": "raison",
        "o": [
          "raison",
          "cas",
          "direction"
        ],
        "context": "Die Straße ist wegen Bauarbeiten gesperrt.",
        "tag": "en raison de",
        "explanation": "La route est fermée en raison de travaux. = Die Straße ist wegen Bauarbeiten gesperrt."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "Du fährst auf der A4 Richtung Strasbourg. Radio: « En raison de la neige, l’A4 est coupée à la hauteur de Saverne. Vous êtes priés de sortir à Phalsbourg. » Kannst du auf der A4 bis Strasbourg weiterfahren?",
        "o": [
          "Nein, ich muss bei Phalsbourg abfahren.",
          "Ja, ohne Problem.",
          "Ja, aber langsamer."
        ],
        "answer": "Nein, ich muss bei Phalsbourg abfahren.",
        "explanation": "Coupée = gesperrt; vous êtes priés de quitter = Sie sollen verlassen.",
        "tag": "Anwenden",
        "family": "coupee",
        "checkKey": "A2L15-context-coupee"
      },
      {
        "type": "choice",
        "q": "Supermarkt-Parkplatz: « Le conducteur de la Peugeot grise immatriculée 4521 KB est prié de venir à l’accueil. » Dein Auto ist ein grauer Peugeot mit 4521 KB. Was tust du?",
        "o": [
          "zum Empfang gehen",
          "das Auto wegfahren",
          "nichts, es betrifft mich nicht"
        ],
        "answer": "zum Empfang gehen",
        "explanation": "Est prié de venir à l’accueil = soll zum Empfang kommen.",
        "tag": "Anwenden",
        "family": "parking",
        "checkKey": "A2L15-context-parking"
      },
      {
        "type": "choice",
        "q": "« Il y a un bouchon de quinze kilomètres en direction de Lyon. » Was bedeutet das?",
        "o": [
          "15 km Stau Richtung Lyon",
          "15 km bis Lyon",
          "eine Baustelle 15 km vor Lyon"
        ],
        "answer": "15 km Stau Richtung Lyon",
        "explanation": "Un bouchon = ein Stau.",
        "tag": "Anwenden",
        "family": "bouchon",
        "checkKey": "A2L15-context-bouchon"
      },
      {
        "type": "choice",
        "q": "Du sagst deinem Beifahrer, dass ihr der Umleitung folgen müsst.",
        "o": [
          "On doit suivre la déviation.",
          "On doit suivre la sortie.",
          "On doit suivre le bouchon."
        ],
        "answer": "On doit suivre la déviation.",
        "explanation": "La déviation = die Umleitung.",
        "tag": "Anwenden",
        "family": "deviation",
        "checkKey": "A2L15-context-deviation",
        "audio": "On doit suivre la déviation."
      },
      {
        "type": "choice",
        "q": "« Le parking du centre est complet. Utilisez le parking de la gare. » Wo parkst du?",
        "o": [
          "am Bahnhof",
          "im Zentrum",
          "vor dem Rathaus"
        ],
        "answer": "am Bahnhof",
        "explanation": "Complet = voll.",
        "tag": "Anwenden",
        "family": "complet",
        "checkKey": "A2L15-context-complet"
      },
      {
        "type": "choice",
        "q": "Welche Form ist richtig? « Les automobilistes sont ___ de rouler prudemment. »",
        "o": [
          "priés",
          "prié",
          "priée"
        ],
        "answer": "priés",
        "explanation": "Mehrere Autofahrer → priés.",
        "tag": "Anwenden",
        "family": "prie",
        "checkKey": "A2L15-context-prie",
        "audio": "Les automobilistes sont priés de rouler prudemment."
      },
      {
        "type": "choice",
        "q": "« En raison du verglas, la route est glissante. » Warum ist die Straße glatt?",
        "o": [
          "wegen Glatteis",
          "wegen Regen",
          "wegen Öl auf der Straße"
        ],
        "answer": "wegen Glatteis",
        "explanation": "Le verglas = das Glatteis.",
        "tag": "Anwenden",
        "family": "raison",
        "checkKey": "A2L15-context-raison"
      },
      {
        "type": "choice",
        "q": "Du musst tanken.",
        "o": [
          "Je dois faire le plein.",
          "Je dois faire le péage.",
          "Je dois faire la sortie."
        ],
        "answer": "Je dois faire le plein.",
        "explanation": "Faire le plein = volltanken.",
        "tag": "Anwenden",
        "family": "plein",
        "checkKey": "A2L15-context-plein",
        "audio": "Je dois faire le plein."
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "Vous êtes ___ de ralentir. (mehrere Personen)",
        "answer": "priés",
        "accept": [],
        "context": "Sie werden gebeten, langsamer zu fahren.",
        "explanation": "Vous êtes priés de ralentir.",
        "audio": "Vous êtes priés de ralentir.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:prie",
        "checkKey": "A2L15-transfer-prie-0"
      },
      {
        "type": "gap",
        "prompt": "La conductrice est ___ de venir à la caisse.",
        "answer": "priée",
        "accept": [],
        "context": "Die Fahrerin wird gebeten, zur Kasse zu kommen.",
        "explanation": "La conductrice est priée de venir à la caisse.",
        "audio": "La conductrice est priée de venir à la caisse.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:prie",
        "checkKey": "A2L15-transfer-prie-1"
      },
      {
        "type": "gap",
        "prompt": "Le propriétaire est prié ___ déplacer son véhicule.",
        "answer": "de",
        "accept": [],
        "context": "Der Besitzer soll sein Fahrzeug wegfahren.",
        "explanation": "Le propriétaire est prié de déplacer son véhicule.",
        "audio": "Le propriétaire est prié de déplacer son véhicule.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:de",
        "checkKey": "A2L15-transfer-de-2"
      },
      {
        "type": "gap",
        "prompt": "L’autoroute est ___ après Lyon. (gesperrt)",
        "answer": "coupée",
        "accept": [],
        "context": "Die Autobahn ist nach Lyon gesperrt.",
        "explanation": "L’autoroute est coupée après Lyon.",
        "audio": "L’autoroute est coupée après Lyon.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:coupee",
        "checkKey": "A2L15-transfer-coupee-3"
      },
      {
        "type": "gap",
        "prompt": "Quittez l’autoroute à la ___ 12.",
        "answer": "sortie",
        "accept": [],
        "context": "Verlassen Sie die Autobahn an der Ausfahrt 12.",
        "explanation": "Quittez l’autoroute à la sortie 12.",
        "audio": "Quittez l’autoroute à la sortie 12.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:sortie",
        "checkKey": "A2L15-transfer-sortie-4"
      },
      {
        "type": "gap",
        "prompt": "Il y a un ___ de cinq kilomètres. (Stau)",
        "answer": "bouchon",
        "accept": [],
        "context": "Es gibt fünf Kilometer Stau.",
        "explanation": "Il y a un bouchon de cinq kilomètres.",
        "audio": "Il y a un bouchon de cinq kilomètres.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:bouchon",
        "checkKey": "A2L15-transfer-bouchon-5"
      },
      {
        "type": "gap",
        "prompt": "La route est fermée en ___ d’un accident.",
        "answer": "raison",
        "accept": [],
        "context": "Die Straße ist wegen eines Unfalls gesperrt.",
        "explanation": "La route est fermée en raison d’un accident.",
        "audio": "La route est fermée en raison d’un accident.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:raison",
        "checkKey": "A2L15-transfer-raison-6"
      }
    ]
  },
  "16": {
    "goals": [
      "Einen Wetterbericht verstehen (Region, Zeit, Entwicklung).",
      "Wetter in Vergangenheit, Gegenwart und Zukunft beschreiben.",
      "Tageszeitangaben wie en fin de matinée, en début d’après-midi verwenden."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Hier, il a ___ . (pleuvoir)",
        "answer": "plu",
        "o": [
          "plu",
          "plut",
          "pleuvu"
        ],
        "context": "Gestern hat es geregnet.",
        "tag": "passé composé",
        "explanation": "Pleuvoir → plu."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Aujourd’hui, il ___ . (pleuvoir)",
        "answer": "pleut",
        "o": [
          "pleut",
          "pleuve",
          "plu"
        ],
        "context": "Heute regnet es.",
        "tag": "Präsens",
        "explanation": "Aujourd’hui, il pleut . = Heute regnet es."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Demain, il ___ . (pleuvoir)",
        "answer": "pleuvra",
        "o": [
          "pleuvra",
          "pleuvera",
          "pleuvait"
        ],
        "context": "Morgen wird es regnen.",
        "tag": "Futur",
        "explanation": "Demain, il pleuvra . = Morgen wird es regnen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Demain, il ___ beau. (faire)",
        "answer": "fera",
        "o": [
          "fera",
          "faira",
          "fait"
        ],
        "context": "Morgen wird es schön.",
        "tag": "Futur",
        "explanation": "Demain, il fera beau. = Morgen wird es schön."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Il y ___ du vent demain. (avoir)",
        "answer": "aura",
        "o": [
          "aura",
          "avra",
          "a"
        ],
        "context": "Morgen wird es Wind geben.",
        "tag": "Futur",
        "explanation": "Il y aura du vent demain. = Morgen wird es Wind geben."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Hier, il ___ froid. (faire)",
        "answer": "a fait",
        "o": [
          "a fait",
          "faisait",
          "fera"
        ],
        "context": "Gestern war es kalt.",
        "tag": "passé composé",
        "explanation": "Hier, il a fait froid. = Gestern war es kalt."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Le ciel se ___ en fin de matinée. (se dégager)",
        "answer": "dégagera",
        "o": [
          "dégagera",
          "dégageait",
          "dégage"
        ],
        "context": "Der Himmel klart am späten Vormittag auf.",
        "tag": "Futur",
        "explanation": "Le ciel se dégagera en fin de matinée. = Der Himmel klart am späten Vormittag auf."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "En ___ d’après-midi, le soleil reviendra. (früh)",
        "answer": "début",
        "o": [
          "début",
          "fin",
          "milieu"
        ],
        "context": "Am frühen Nachmittag kommt die Sonne zurück.",
        "tag": "Tageszeit",
        "explanation": "En début d’après-midi, le soleil reviendra. = Am frühen Nachmittag kommt die Sonne zurück."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "En montagne, il ___ . (neiger, Futur)",
        "answer": "neigera",
        "o": [
          "neigera",
          "neigait",
          "neige"
        ],
        "context": "In den Bergen wird es schneien.",
        "tag": "Futur",
        "explanation": "En montagne, il neigera . = In den Bergen wird es schneien."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Les températures ___ . (baisser, Futur)",
        "answer": "baisseront",
        "o": [
          "baisseront",
          "baissent",
          "baissaient"
        ],
        "context": "Die Temperaturen werden sinken.",
        "tag": "Futur",
        "explanation": "Les températures baisseront . = Die Temperaturen werden sinken."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "Du machst Urlaub in den Vogesen. Radio: « Ce matin, il neige sur les Vosges. Les nuages partiront vers midi et il fera beau tout l’après-midi. » Wird es heute Nachmittag schön?",
        "o": [
          "Ja, am Nachmittag ist es schön.",
          "Nein, es schneit den ganzen Tag.",
          "Erst am Abend wird es schön."
        ],
        "answer": "Ja, am Nachmittag ist es schön.",
        "explanation": "Il fera beau tout l’après-midi = den ganzen Nachmittag schön.",
        "tag": "Anwenden",
        "family": "apresmidi",
        "checkKey": "A2L16-context-apresmidi"
      },
      {
        "type": "choice",
        "q": "« Demain, des orages éclateront dans les Alpes en soirée. » Wann gibt es Gewitter?",
        "o": [
          "morgen am Abend",
          "morgen früh",
          "heute Abend"
        ],
        "answer": "morgen am Abend",
        "explanation": "En soirée = am Abend.",
        "tag": "Anwenden",
        "family": "orage",
        "checkKey": "A2L16-context-orage"
      },
      {
        "type": "choice",
        "q": "Du beschreibst das Wetter von gestern: Es hat den ganzen Tag geschneit.",
        "o": [
          "Hier, il a neigé toute la journée.",
          "Hier, il neigera toute la journée.",
          "Hier, il neige toute la journée."
        ],
        "answer": "Hier, il a neigé toute la journée.",
        "explanation": "Gestern → passé composé.",
        "tag": "Anwenden",
        "family": "passe",
        "checkKey": "A2L16-context-passe",
        "audio": "Hier, il a neigé toute la journée."
      },
      {
        "type": "choice",
        "q": "« Sur la côte, le vent soufflera fort. » Was erwartet dich am Meer?",
        "o": [
          "starker Wind",
          "starker Regen",
          "große Hitze"
        ],
        "answer": "starker Wind",
        "explanation": "Le vent soufflera fort = starker Wind.",
        "tag": "Anwenden",
        "family": "vent",
        "checkKey": "A2L16-context-vent"
      },
      {
        "type": "choice",
        "q": "Du sagst, dass es morgen 25 Grad wird.",
        "o": [
          "Demain, il fera vingt-cinq degrés.",
          "Demain, il fait vingt-cinq degrés.",
          "Demain, il a fait vingt-cinq degrés."
        ],
        "answer": "Demain, il fera vingt-cinq degrés.",
        "explanation": "Morgen → futur simple: il fera.",
        "tag": "Anwenden",
        "family": "futur",
        "checkKey": "A2L16-context-futur",
        "audio": "Demain, il fera vingt-cinq degrés."
      },
      {
        "type": "choice",
        "q": "« Les températures baisseront de cinq degrés. » Was passiert?",
        "o": [
          "Es wird um fünf Grad kälter.",
          "Es wird um fünf Grad wärmer.",
          "Es bleibt bei fünf Grad."
        ],
        "answer": "Es wird um fünf Grad kälter.",
        "explanation": "Baisser = sinken.",
        "tag": "Anwenden",
        "family": "baisser",
        "checkKey": "A2L16-context-baisser"
      },
      {
        "type": "choice",
        "q": "Es ist grau und kühl. Was sagst du?",
        "o": [
          "Il fait gris et frais.",
          "Il est gris et frais.",
          "Il a gris et frais."
        ],
        "answer": "Il fait gris et frais.",
        "explanation": "Wetter mit il fait + Adjektiv.",
        "tag": "Anwenden",
        "family": "faire",
        "checkKey": "A2L16-context-faire",
        "audio": "Il fait gris et frais."
      },
      {
        "type": "choice",
        "q": "« Prenez un parapluie si vous sortez ce soir. » Wie wird das Wetter heute Abend?",
        "o": [
          "Es kann regnen.",
          "Es wird sehr heiß.",
          "Es wird schneien."
        ],
        "answer": "Es kann regnen.",
        "explanation": "Un parapluie = ein Regenschirm.",
        "tag": "Anwenden",
        "family": "parapluie",
        "checkKey": "A2L16-context-parapluie"
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "Hier, il a ___ toute la journée. (pleuvoir)",
        "answer": "plu",
        "accept": [],
        "context": "Gestern hat es den ganzen Tag geregnet.",
        "explanation": "Hier, il a plu toute la journée.",
        "audio": "Hier, il a plu toute la journée.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:passe",
        "checkKey": "A2L16-transfer-passe-0"
      },
      {
        "type": "gap",
        "prompt": "Regarde, il ___ ! (neiger, jetzt)",
        "answer": "neige",
        "accept": [],
        "context": "Schau, es schneit!",
        "explanation": "Regarde, il neige !",
        "audio": "Regarde, il neige !",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:present",
        "checkKey": "A2L16-transfer-present-1"
      },
      {
        "type": "gap",
        "prompt": "Ce week-end, il ___ chaud. (faire, Futur)",
        "answer": "fera",
        "accept": [],
        "context": "Dieses Wochenende wird es warm.",
        "explanation": "Ce week-end, il fera chaud.",
        "audio": "Ce week-end, il fera chaud.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:futur",
        "checkKey": "A2L16-transfer-futur-2"
      },
      {
        "type": "gap",
        "prompt": "Il ___ du soleil demain. (y avoir, Futur)",
        "answer": "y aura",
        "accept": [],
        "context": "Morgen wird es Sonne geben.",
        "explanation": "Il y aura du soleil demain.",
        "audio": "Il y aura du soleil demain.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:futur",
        "checkKey": "A2L16-transfer-futur-3"
      },
      {
        "type": "gap",
        "prompt": "Le ciel se ___ cet après-midi. (se dégager, Futur)",
        "answer": "dégagera",
        "accept": [],
        "context": "Der Himmel klart heute Nachmittag auf.",
        "explanation": "Le ciel se dégagera cet après-midi.",
        "audio": "Le ciel se dégagera cet après-midi.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:degager",
        "checkKey": "A2L16-transfer-degager-4"
      },
      {
        "type": "gap",
        "prompt": "En ___ de matinée, il pleuvra. (am späten Vormittag)",
        "answer": "fin",
        "accept": [],
        "context": "Am späten Vormittag wird es regnen.",
        "explanation": "En fin de matinée, il pleuvra.",
        "audio": "En fin de matinée, il pleuvra.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:moment",
        "checkKey": "A2L16-transfer-moment-5"
      },
      {
        "type": "gap",
        "prompt": "Le soleil ___ demain. (revenir, Futur)",
        "answer": "reviendra",
        "accept": [],
        "context": "Die Sonne kommt morgen zurück.",
        "explanation": "Le soleil reviendra demain.",
        "audio": "Le soleil reviendra demain.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:revenir",
        "checkKey": "A2L16-transfer-revenir-6"
      }
    ]
  },
  "17": {
    "goals": [
      "Kurze Meinungen zu einem Alltagsthema verstehen.",
      "Die eigene Meinung äußern, zustimmen und widersprechen.",
      "Mit ne … plus, avoir envie de und ça me gêne arbeiten."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Je ___ que c’est pratique. (finden)",
        "answer": "trouve",
        "o": [
          "trouve",
          "cherche",
          "pense de"
        ],
        "context": "Ich finde das praktisch.",
        "tag": "Meinung",
        "explanation": "Je trouve que c’est pratique. = Ich finde das praktisch."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "À mon ___, c’est trop cher.",
        "answer": "avis",
        "o": [
          "avis",
          "idée",
          "opinion de"
        ],
        "context": "Meiner Meinung nach ist das zu teuer.",
        "tag": "Meinung",
        "explanation": "À mon avis, c’est trop cher. = Meiner Meinung nach ist das zu teuer."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Je suis d’accord ___ toi.",
        "answer": "avec",
        "o": [
          "avec",
          "à",
          "de"
        ],
        "context": "Ich bin deiner Meinung.",
        "tag": "Zustimmung",
        "explanation": "Je suis d’accord avec toi. = Ich bin deiner Meinung."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Ça me ___ au cinéma. (stören)",
        "answer": "gêne",
        "o": [
          "gêne",
          "gêné",
          "gênes"
        ],
        "context": "Im Kino stört mich das.",
        "tag": "Meinung",
        "explanation": "Ça me gêne au cinéma. = Im Kino stört mich das."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Je ne suis pas du ___ d’accord.",
        "answer": "tout",
        "o": [
          "tout",
          "tous",
          "toute"
        ],
        "context": "Ich bin überhaupt nicht einverstanden.",
        "tag": "Widerspruch",
        "explanation": "Je ne suis pas du tout d’accord. = Ich bin überhaupt nicht einverstanden."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je ne téléphone ___ au volant. (nicht mehr)",
        "answer": "plus",
        "o": [
          "plus",
          "pas plus",
          "jamais pas"
        ],
        "context": "Ich telefoniere nicht mehr am Steuer.",
        "tag": "ne … plus",
        "explanation": "Je ne téléphone plus au volant. = Ich telefoniere nicht mehr am Steuer."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Il n’a plus ___ portable.",
        "answer": "de",
        "o": [
          "de",
          "un",
          "le"
        ],
        "context": "Er hat kein Handy mehr.",
        "tag": "ne … plus",
        "explanation": "Nach ne … plus wird un zu de."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Nous ne ___ plus la télé. (regarder)",
        "answer": "regardons",
        "o": [
          "regardons",
          "regardez",
          "regarde"
        ],
        "context": "Wir schauen nicht mehr fern.",
        "tag": "ne … plus",
        "explanation": "Nous ne regardons plus la télé. = Wir schauen nicht mehr fern."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "J’ai ___ de lire dans le train.",
        "answer": "envie",
        "o": [
          "envie",
          "besoin à",
          "plaisir"
        ],
        "context": "Ich habe Lust, im Zug zu lesen.",
        "tag": "avoir envie de",
        "explanation": "J’ai envie de lire dans le train. = Ich habe Lust, im Zug zu lesen."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Elle n’a pas envie ___ smartphone.",
        "answer": "d’un",
        "o": [
          "d’un",
          "un",
          "de le"
        ],
        "context": "Sie hat keine Lust auf ein Smartphone.",
        "tag": "avoir envie de",
        "explanation": "Elle n’a pas envie d’un smartphone. = Sie hat keine Lust auf ein Smartphone."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "« Une montre connectée ? Non merci, je n’en ai pas besoin. Ma vieille montre suffit. » Will die Person eine Smartwatch?",
        "o": [
          "Nein, sie braucht keine.",
          "Ja, eine einfache.",
          "Ja, eine neue."
        ],
        "answer": "Nein, sie braucht keine.",
        "explanation": "Je n’en ai pas besoin = ich brauche keine.",
        "tag": "Anwenden",
        "family": "besoin",
        "checkKey": "A2L17-context-besoin"
      },
      {
        "type": "choice",
        "q": "« À la piscine, nous avons interdit les photos avec les portables. » Was wurde verboten?",
        "o": [
          "mit dem Handy fotografieren",
          "mit dem Handy telefonieren",
          "das Handy aufladen"
        ],
        "answer": "mit dem Handy fotografieren",
        "explanation": "Interdire = verbieten.",
        "tag": "Anwenden",
        "family": "interdire",
        "checkKey": "A2L17-context-interdire"
      },
      {
        "type": "choice",
        "q": "Du findest Handys im Zug störend.",
        "o": [
          "Ça me gêne quand on téléphone dans le train.",
          "Ça me plaît quand on téléphone dans le train.",
          "Ça me gêne de pas téléphoner dans le train."
        ],
        "answer": "Ça me gêne quand on téléphone dans le train.",
        "explanation": "Ça me gêne = es stört mich.",
        "tag": "Anwenden",
        "family": "gener",
        "checkKey": "A2L17-context-gener",
        "audio": "Ça me gêne quand on téléphone dans le train."
      },
      {
        "type": "choice",
        "q": "« Ma fille prend le bus seule. Avec son portable, elle m’envoie un message quand elle arrive. » Wie findet die Mutter das?",
        "o": [
          "Es beruhigt sie.",
          "Es stört sie.",
          "Es ist ihr zu teuer."
        ],
        "answer": "Es beruhigt sie.",
        "explanation": "Sie sieht einen Vorteil: Sie weiß, dass die Tochter angekommen ist.",
        "tag": "Anwenden",
        "family": "rassurant",
        "checkKey": "A2L17-context-rassurant"
      },
      {
        "type": "choice",
        "q": "Dein Partner sagt: « Le portable, c’est indispensable. » Du siehst das ganz anders.",
        "o": [
          "Je ne suis pas du tout d’accord.",
          "Je suis tout à fait d’accord.",
          "C’est vrai, tu as raison."
        ],
        "answer": "Je ne suis pas du tout d’accord.",
        "explanation": "Pas du tout d’accord = überhaupt nicht einverstanden.",
        "tag": "Anwenden",
        "family": "desaccord",
        "checkKey": "A2L17-context-desaccord",
        "audio": "Je ne suis pas du tout d’accord."
      },
      {
        "type": "choice",
        "q": "« Je ne regarde plus mes e-mails le soir. » Was stimmt?",
        "o": [
          "Früher hat die Person abends E-Mails gelesen.",
          "Die Person liest abends immer E-Mails.",
          "Die Person hat kein E-Mail-Konto."
        ],
        "answer": "Früher hat die Person abends E-Mails gelesen.",
        "explanation": "Ne … plus = nicht mehr (früher schon).",
        "tag": "Anwenden",
        "family": "neplus",
        "checkKey": "A2L17-context-neplus"
      },
      {
        "type": "choice",
        "q": "Du sagst deine Meinung.",
        "o": [
          "À mon avis, le portable est utile.",
          "À mon avis que le portable est utile.",
          "Je trouve le portable que est utile."
        ],
        "answer": "À mon avis, le portable est utile.",
        "explanation": "À mon avis + Satz ohne que.",
        "tag": "Anwenden",
        "family": "avis",
        "checkKey": "A2L17-context-avis",
        "audio": "À mon avis, le portable est utile."
      },
      {
        "type": "choice",
        "q": "« Je n’ai pas envie d’être joignable tout le temps. » Was möchte die Person nicht?",
        "o": [
          "immer erreichbar sein",
          "immer telefonieren müssen",
          "immer Nachrichten lesen"
        ],
        "answer": "immer erreichbar sein",
        "explanation": "Joignable = erreichbar.",
        "tag": "Anwenden",
        "family": "envie",
        "checkKey": "A2L17-context-envie"
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "Je ___ que c’est utile. (finden)",
        "answer": "trouve",
        "accept": [],
        "context": "Du findest das nützlich.",
        "explanation": "Je trouve que c’est utile.",
        "audio": "Je trouve que c’est utile.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:trouve",
        "checkKey": "A2L17-transfer-trouve-0"
      },
      {
        "type": "gap",
        "prompt": "À mon ___, c’est dangereux.",
        "answer": "avis",
        "accept": [],
        "context": "Meiner Meinung nach ist das gefährlich.",
        "explanation": "À mon avis, c’est dangereux.",
        "audio": "À mon avis, c’est dangereux.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:avis",
        "checkKey": "A2L17-transfer-avis-1"
      },
      {
        "type": "gap",
        "prompt": "Je suis d’___ avec vous.",
        "answer": "accord",
        "accept": [],
        "context": "Du bist ihrer Meinung.",
        "explanation": "Je suis d’accord avec vous.",
        "audio": "Je suis d’accord avec vous.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:accord",
        "checkKey": "A2L17-transfer-accord-2"
      },
      {
        "type": "gap",
        "prompt": "Le bruit me ___ . (stören)",
        "answer": "gêne",
        "accept": [],
        "context": "Der Lärm stört dich.",
        "explanation": "Le bruit me gêne .",
        "audio": "Le bruit me gêne .",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:gener",
        "checkKey": "A2L17-transfer-gener-3"
      },
      {
        "type": "gap",
        "prompt": "Je n’utilise ___ mon ancien portable. (nicht mehr)",
        "answer": "plus",
        "accept": [],
        "context": "Du benutzt dein altes Handy nicht mehr.",
        "explanation": "Je n’utilise plus mon ancien portable.",
        "audio": "Je n’utilise plus mon ancien portable.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:neplus",
        "checkKey": "A2L17-transfer-neplus-4"
      },
      {
        "type": "gap",
        "prompt": "Je n’ai plus ___ batterie.",
        "answer": "de",
        "accept": [],
        "context": "Du hast keinen Akku mehr.",
        "explanation": "Je n’ai plus de batterie.",
        "audio": "Je n’ai plus de batterie.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:de",
        "checkKey": "A2L17-transfer-de-5"
      },
      {
        "type": "gap",
        "prompt": "Je n’ai pas ___ de sortir ce soir.",
        "answer": "envie",
        "accept": [],
        "context": "Du hast keine Lust, heute Abend auszugehen.",
        "explanation": "Je n’ai pas envie de sortir ce soir.",
        "audio": "Je n’ai pas envie de sortir ce soir.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:envie",
        "checkKey": "A2L17-transfer-envie-6"
      }
    ]
  },
  "18": {
    "goals": [
      "Kurze Zeitungsmeldungen mit Zahlen und Prozenten verstehen.",
      "Einer Meldung die passende Überschrift zuordnen.",
      "Anteile und Entwicklungen ausdrücken: … sur …, pour cent, de plus en plus, augmenter, baisser."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Deux Français ___ trois partent en vacances.",
        "answer": "sur",
        "o": [
          "sur",
          "de",
          "pour"
        ],
        "context": "Zwei von drei Franzosen verreisen.",
        "tag": "Anteil",
        "explanation": "Deux Français sur trois partent en vacances. = Zwei von drei Franzosen verreisen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "La ___ des habitants a moins de trente ans.",
        "answer": "moitié",
        "o": [
          "moitié",
          "demi",
          "milieu"
        ],
        "context": "Die Hälfte der Einwohner ist unter dreißig.",
        "tag": "Anteil",
        "explanation": "La moitié des habitants a moins de trente ans. = Die Hälfte der Einwohner ist unter dreißig."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Les prix ont augmenté ___ trois pour cent.",
        "answer": "de",
        "o": [
          "de",
          "à",
          "par"
        ],
        "context": "Die Preise sind um drei Prozent gestiegen.",
        "tag": "Entwicklung",
        "explanation": "Les prix ont augmenté de trois pour cent. = Die Preise sind um drei Prozent gestiegen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "De moins en ___ de jeunes fument.",
        "answer": "moins",
        "o": [
          "moins",
          "plus",
          "peu"
        ],
        "context": "Immer weniger junge Leute rauchen.",
        "tag": "Entwicklung",
        "explanation": "De moins en moins de jeunes fument. = Immer weniger junge Leute rauchen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Vingt pour cent d’___ elles travaillent à temps partiel.",
        "answer": "entre",
        "o": [
          "entre",
          "eux",
          "parmi"
        ],
        "context": "Zwanzig Prozent von ihnen arbeiten Teilzeit.",
        "tag": "Anteil",
        "explanation": "Vingt pour cent d’entre elles travaillent à temps partiel. = Zwanzig Prozent von ihnen arbeiten Teilzeit."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Le nombre de touristes a ___ . (sinken)",
        "answer": "baissé",
        "o": [
          "baissé",
          "augmenté",
          "monté"
        ],
        "context": "Die Zahl der Touristen ist gesunken.",
        "tag": "Entwicklung",
        "explanation": "Le nombre de touristes a baissé . = Die Zahl der Touristen ist gesunken."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "___ un sondage, les Français dorment moins. (laut)",
        "answer": "Selon",
        "o": [
          "Selon",
          "Pendant",
          "Contre"
        ],
        "context": "Laut einer Umfrage schlafen die Franzosen weniger.",
        "tag": "Meldung",
        "explanation": "Selon un sondage, les Français dorment moins. = Laut einer Umfrage schlafen die Franzosen weniger."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Une loi ___ les magasins à ouvrir le dimanche. (erlauben)",
        "answer": "autorise",
        "o": [
          "autorise",
          "interdit",
          "oblige de"
        ],
        "context": "Ein Gesetz erlaubt Geschäften, sonntags zu öffnen.",
        "tag": "Meldung",
        "explanation": "Une loi autorise les magasins à ouvrir le dimanche. = Ein Gesetz erlaubt Geschäften, sonntags zu öffnen."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "La ville ne compte ___ dix mille habitants.",
        "answer": "que",
        "o": [
          "que",
          "pas",
          "plus"
        ],
        "context": "Die Stadt hat nur zehntausend Einwohner.",
        "tag": "ne … que",
        "explanation": "La ville ne compte que dix mille habitants. = Die Stadt hat nur zehntausend Einwohner."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Les travaux coûtent ___ à la commune.",
        "answer": "cher",
        "o": [
          "cher",
          "chers",
          "chère"
        ],
        "context": "Die Bauarbeiten kosten die Gemeinde viel.",
        "tag": "Meldung",
        "explanation": "Coûter cher: cher bleibt unverändert (Adverb)."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "Meldung: « Le vélo a la cote : selon une étude, de plus en plus de salariés vont au travail à vélo. » Welche Überschrift passt?",
        "o": [
          "Toujours plus de cyclistes au travail",
          "Moins de vélos dans les villes",
          "Les vélos électriques trop chers"
        ],
        "answer": "Toujours plus de cyclistes au travail",
        "explanation": "De plus en plus de salariés à vélo = immer mehr Radfahrer.",
        "tag": "Anwenden",
        "family": "titre",
        "checkKey": "A2L18-context-titre"
      },
      {
        "type": "choice",
        "q": "« Seulement un salarié sur dix déjeune à la cantine. » Was stimmt?",
        "o": [
          "10 % essen in der Kantine.",
          "90 % essen in der Kantine.",
          "Die Hälfte isst in der Kantine."
        ],
        "answer": "10 % essen in der Kantine.",
        "explanation": "Un sur dix = 10 %.",
        "tag": "Anwenden",
        "family": "pourcentage",
        "checkKey": "A2L18-context-pourcentage"
      },
      {
        "type": "choice",
        "q": "« Le village ne compte que huit cents habitants. » Was bedeutet das?",
        "o": [
          "Das Dorf hat nur 800 Einwohner.",
          "Das Dorf hat mehr als 800 Einwohner.",
          "Das Dorf hat 800 Einwohner verloren."
        ],
        "answer": "Das Dorf hat nur 800 Einwohner.",
        "explanation": "Ne … que = nur.",
        "tag": "Anwenden",
        "family": "neque",
        "checkKey": "A2L18-context-neque"
      },
      {
        "type": "choice",
        "q": "Du gibst eine Zahl wieder: Die Mieten sind um 4 % gestiegen.",
        "o": [
          "Les loyers ont augmenté de quatre pour cent.",
          "Les loyers ont baissé de quatre pour cent.",
          "Les loyers ont augmenté à quatre pour cent."
        ],
        "answer": "Les loyers ont augmenté de quatre pour cent.",
        "explanation": "Augmenter de = steigen um.",
        "tag": "Anwenden",
        "family": "augmenter",
        "checkKey": "A2L18-context-augmenter",
        "audio": "Les loyers ont augmenté de quatre pour cent."
      },
      {
        "type": "choice",
        "q": "« Une nouvelle loi autorise les villes à faire payer les parkings le dimanche. » Welche Überschrift passt?",
        "o": [
          "Parkings payants aussi le dimanche",
          "Parkings gratuits toute la semaine",
          "Moins de voitures en ville"
        ],
        "answer": "Parkings payants aussi le dimanche",
        "explanation": "Autoriser à faire payer = erlauben, Gebühren zu verlangen.",
        "tag": "Anwenden",
        "family": "loi",
        "checkKey": "A2L18-context-loi"
      },
      {
        "type": "choice",
        "q": "« Trente pour cent d’entre eux lisent en ligne. » Was bedeutet d’entre eux?",
        "o": [
          "von ihnen",
          "zwischen ihnen",
          "für sie"
        ],
        "answer": "von ihnen",
        "explanation": "D’entre eux = von ihnen.",
        "tag": "Anwenden",
        "family": "entre",
        "checkKey": "A2L18-context-entre"
      },
      {
        "type": "choice",
        "q": "« Le nombre d’accidents a diminué de moitié. » Was ist passiert?",
        "o": [
          "Die Unfälle haben sich halbiert.",
          "Die Unfälle haben sich verdoppelt.",
          "Die Hälfte der Straßen ist gesperrt."
        ],
        "answer": "Die Unfälle haben sich halbiert.",
        "explanation": "Diminuer de moitié = sich halbieren.",
        "tag": "Anwenden",
        "family": "diminuer",
        "checkKey": "A2L18-context-diminuer"
      },
      {
        "type": "choice",
        "q": "Du liest: « Selon un sondage… » Was folgt?",
        "o": [
          "das Ergebnis einer Umfrage",
          "eine Werbung",
          "ein Wetterbericht"
        ],
        "answer": "das Ergebnis einer Umfrage",
        "explanation": "Un sondage = eine Umfrage.",
        "tag": "Anwenden",
        "family": "selon",
        "checkKey": "A2L18-context-selon"
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "Un enfant ___ quatre a un téléphone. (von)",
        "answer": "sur",
        "accept": [],
        "context": "Eines von vier Kindern hat ein Telefon.",
        "explanation": "Un enfant sur quatre a un téléphone.",
        "audio": "Un enfant sur quatre a un téléphone.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:sur",
        "checkKey": "A2L18-transfer-sur-0"
      },
      {
        "type": "gap",
        "prompt": "Trente ___ cent des habitants ont un jardin.",
        "answer": "pour",
        "accept": [],
        "context": "Dreißig Prozent der Einwohner haben einen Garten.",
        "explanation": "Trente pour cent des habitants ont un jardin.",
        "audio": "Trente pour cent des habitants ont un jardin.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:pourcent",
        "checkKey": "A2L18-transfer-pourcent-1"
      },
      {
        "type": "gap",
        "prompt": "La moitié d’___ eux habite en ville.",
        "answer": "entre",
        "accept": [],
        "context": "Die Hälfte von ihnen wohnt in der Stadt.",
        "explanation": "La moitié d’entre eux habite en ville.",
        "audio": "La moitié d’entre eux habite en ville.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:entre",
        "checkKey": "A2L18-transfer-entre-2"
      },
      {
        "type": "gap",
        "prompt": "De plus en ___ de gens travaillent à la maison.",
        "answer": "plus",
        "accept": [],
        "context": "Immer mehr Leute arbeiten zu Hause.",
        "explanation": "De plus en plus de gens travaillent à la maison.",
        "audio": "De plus en plus de gens travaillent à la maison.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:plusenplus",
        "checkKey": "A2L18-transfer-plusenplus-3"
      },
      {
        "type": "gap",
        "prompt": "Les prix ont ___ de deux pour cent. (steigen)",
        "answer": "augmenté",
        "accept": [],
        "context": "Die Preise sind um zwei Prozent gestiegen.",
        "explanation": "Les prix ont augmenté de deux pour cent.",
        "audio": "Les prix ont augmenté de deux pour cent.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:augmenter",
        "checkKey": "A2L18-transfer-augmenter-4"
      },
      {
        "type": "gap",
        "prompt": "Le village ne compte ___ trois cents habitants.",
        "answer": "que",
        "accept": [],
        "context": "Das Dorf hat nur dreihundert Einwohner.",
        "explanation": "Le village ne compte que trois cents habitants.",
        "audio": "Le village ne compte que trois cents habitants.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:neque",
        "checkKey": "A2L18-transfer-neque-5"
      },
      {
        "type": "gap",
        "prompt": "___ une étude, nous mangeons trop de sucre. (laut)",
        "answer": "Selon",
        "accept": [],
        "context": "Laut einer Studie essen wir zu viel Zucker.",
        "explanation": "Selon une étude, nous mangeons trop de sucre.",
        "audio": "Selon une étude, nous mangeons trop de sucre.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:selon",
        "checkKey": "A2L18-transfer-selon-6"
      }
    ]
  },
  "19": {
    "goals": [
      "Einen Reisetext überfliegen und die passende Information für einen Wunsch finden.",
      "Orte mit dem Superlativ beschreiben (le plus, le moins, le meilleur).",
      "Aktivitäten mit on peut / il faut + Infinitiv empfehlen."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "C’est la ville la ___ jolie de la région.",
        "answer": "plus",
        "o": [
          "plus",
          "plus de",
          "très"
        ],
        "context": "Das ist die hübscheste Stadt der Region.",
        "tag": "Superlativ",
        "explanation": "C’est la ville la plus jolie de la région. = Das ist die hübscheste Stadt der Region."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "C’est le musée le ___ cher. (billigste)",
        "answer": "moins",
        "o": [
          "moins",
          "plus",
          "mieux"
        ],
        "context": "Das ist das billigste Museum.",
        "tag": "Superlativ",
        "explanation": "C’est le musée le moins cher. = Das ist das billigste Museum."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Ce sont ___ plages les plus belles.",
        "answer": "les",
        "o": [
          "les",
          "la",
          "des"
        ],
        "context": "Das sind die schönsten Strände.",
        "tag": "Superlativ",
        "explanation": "Ce sont les plages les plus belles. = Das sind die schönsten Strände."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "C’est la ___ crêperie de Rennes. (beste)",
        "answer": "meilleure",
        "o": [
          "meilleure",
          "meilleur",
          "plus bonne"
        ],
        "context": "Das ist die beste Crêperie in Rennes.",
        "tag": "meilleur",
        "explanation": "La crêperie ist weiblich → la meilleure."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "C’est le plus haut sommet ___ France.",
        "answer": "de",
        "o": [
          "de",
          "en",
          "à"
        ],
        "context": "Das ist der höchste Gipfel Frankreichs.",
        "tag": "Superlativ",
        "explanation": "C’est le plus haut sommet de France. = Das ist der höchste Gipfel Frankreichs."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "C’est l’une ___ plus vieilles églises.",
        "answer": "des",
        "o": [
          "des",
          "de",
          "les"
        ],
        "context": "Das ist eine der ältesten Kirchen.",
        "tag": "Superlativ",
        "explanation": "C’est l’une des plus vieilles églises. = Das ist eine der ältesten Kirchen."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "On ___ se baigner dans la rivière.",
        "answer": "peut",
        "o": [
          "peut",
          "peux",
          "faut"
        ],
        "context": "Man kann im Fluss baden.",
        "tag": "on peut",
        "explanation": "On peut se baigner dans la rivière. = Man kann im Fluss baden."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Il ___ visiter le château.",
        "answer": "faut",
        "o": [
          "faut",
          "peut",
          "doit"
        ],
        "context": "Man muss das Schloss besichtigen.",
        "tag": "il faut",
        "explanation": "Il faut visiter le château. = Man muss das Schloss besichtigen."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Nous vous conseillons ___ venir le soir.",
        "answer": "de",
        "o": [
          "de",
          "à",
          "pour"
        ],
        "context": "Wir empfehlen Ihnen, abends zu kommen.",
        "tag": "conseiller de",
        "explanation": "Nous vous conseillons de venir le soir. = Wir empfehlen Ihnen, abends zu kommen."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "On peut faire ___ escalade.",
        "answer": "de l’",
        "o": [
          "de l’",
          "du",
          "de la"
        ],
        "context": "Man kann klettern.",
        "tag": "faire de",
        "explanation": "On peut faire de l’escalade. = Man kann klettern."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "Du liebst Sonnenuntergänge. Welcher Abschnitt passt? a) « Le soir, depuis la plage, le soleil se couche derrière les îles. » b) « Le marché a lieu tous les jeudis matin. »",
        "o": [
          "Abschnitt a",
          "Abschnitt b",
          "keiner"
        ],
        "answer": "Abschnitt a",
        "explanation": "Le soleil se couche = die Sonne geht unter.",
        "tag": "Anwenden",
        "family": "coucher",
        "checkKey": "A2L19-context-coucher"
      },
      {
        "type": "choice",
        "q": "Du möchtest picknicken. Welcher Satz hilft dir?",
        "o": [
          "« On peut manger à l’ombre des arbres, au bord du lac. »",
          "« Le musée est fermé le mardi. »",
          "« La route est étroite et dangereuse. »"
        ],
        "answer": "« On peut manger à l’ombre des arbres, au bord du lac. »",
        "explanation": "Manger à l’ombre au bord du lac = picknicken möglich.",
        "tag": "Anwenden",
        "family": "piquenique",
        "checkKey": "A2L19-context-piquenique"
      },
      {
        "type": "choice",
        "q": "Du sagst, dass Colmar die schönste Stadt im Elsass ist.",
        "o": [
          "Colmar est la plus belle ville d’Alsace.",
          "Colmar est la plus beau ville d’Alsace.",
          "Colmar est la ville plus belle en Alsace."
        ],
        "answer": "Colmar est la plus belle ville d’Alsace.",
        "explanation": "La ville ist weiblich → la plus belle; Bereich mit de.",
        "tag": "Anwenden",
        "family": "superlatif",
        "checkKey": "A2L19-context-superlatif",
        "audio": "Colmar est la plus belle ville d’Alsace."
      },
      {
        "type": "choice",
        "q": "« C’est l’un des villages les plus visités de France. » Was stimmt?",
        "o": [
          "Viele Touristen besuchen das Dorf.",
          "Das Dorf ist unbekannt.",
          "Das Dorf ist das einzige in Frankreich."
        ],
        "answer": "Viele Touristen besuchen das Dorf.",
        "explanation": "L’un des plus visités = eines der meistbesuchten.",
        "tag": "Anwenden",
        "family": "visite",
        "checkKey": "A2L19-context-visite"
      },
      {
        "type": "choice",
        "q": "Du willst klettern gehen. Welcher Hinweis passt?",
        "o": [
          "« Le site est parfait pour l’escalade. »",
          "« Le site est parfait pour la baignade. »",
          "« Le site est parfait pour les enfants qui dorment. »"
        ],
        "answer": "« Le site est parfait pour l’escalade. »",
        "explanation": "L’escalade = das Klettern.",
        "tag": "Anwenden",
        "family": "sport",
        "checkKey": "A2L19-context-sport"
      },
      {
        "type": "choice",
        "q": "Du empfiehlst das beste Restaurant.",
        "o": [
          "C’est le meilleur restaurant de la ville.",
          "C’est le plus bon restaurant de la ville.",
          "C’est le mieux restaurant de la ville."
        ],
        "answer": "C’est le meilleur restaurant de la ville.",
        "explanation": "Bon → le meilleur.",
        "tag": "Anwenden",
        "family": "meilleur",
        "checkKey": "A2L19-context-meilleur",
        "audio": "C’est le meilleur restaurant de la ville."
      },
      {
        "type": "choice",
        "q": "« Attention : en été, le village est plein de touristes. » Wann ist es ruhiger?",
        "o": [
          "außerhalb des Sommers",
          "nur im August",
          "am Wochenende im Sommer"
        ],
        "answer": "außerhalb des Sommers",
        "explanation": "En été = im Sommer viele Touristen.",
        "tag": "Anwenden",
        "family": "saison",
        "checkKey": "A2L19-context-saison"
      },
      {
        "type": "choice",
        "q": "Du interessierst dich für alte Kirchen. Welcher Abschnitt passt?",
        "o": [
          "« On y trouve de belles églises baroques. »",
          "« On y trouve de belles plages de sable. »",
          "« On y trouve de grands centres commerciaux. »"
        ],
        "answer": "« On y trouve de belles églises baroques. »",
        "explanation": "Églises baroques = Barockkirchen.",
        "tag": "Anwenden",
        "family": "eglise",
        "checkKey": "A2L19-context-eglise"
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "C’est le pont le ___ long de la ville.",
        "answer": "plus",
        "accept": [],
        "context": "Das ist die längste Brücke der Stadt.",
        "explanation": "C’est le pont le plus long de la ville.",
        "audio": "C’est le pont le plus long de la ville.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:plus",
        "checkKey": "A2L19-transfer-plus-0"
      },
      {
        "type": "gap",
        "prompt": "C’est l’hôtel le ___ cher. (billigste)",
        "answer": "moins",
        "accept": [],
        "context": "Das ist das billigste Hotel.",
        "explanation": "C’est l’hôtel le moins cher.",
        "audio": "C’est l’hôtel le moins cher.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:moins",
        "checkKey": "A2L19-transfer-moins-1"
      },
      {
        "type": "gap",
        "prompt": "C’est ___ plus belle plage. (die)",
        "answer": "la",
        "accept": [],
        "context": "Das ist der schönste Strand.",
        "explanation": "C’est la plus belle plage.",
        "audio": "C’est la plus belle plage.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:la",
        "checkKey": "A2L19-transfer-la-2"
      },
      {
        "type": "gap",
        "prompt": "C’est le ___ fromage de la région. (beste)",
        "answer": "meilleur",
        "accept": [],
        "context": "Das ist der beste Käse der Region.",
        "explanation": "C’est le meilleur fromage de la région.",
        "audio": "C’est le meilleur fromage de la région.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:meilleur",
        "checkKey": "A2L19-transfer-meilleur-3"
      },
      {
        "type": "gap",
        "prompt": "C’est la plus grande ville ___ Bretagne.",
        "answer": "de",
        "accept": [],
        "context": "Das ist die größte Stadt der Bretagne.",
        "explanation": "C’est la plus grande ville de Bretagne.",
        "audio": "C’est la plus grande ville de Bretagne.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:de",
        "checkKey": "A2L19-transfer-de-4"
      },
      {
        "type": "gap",
        "prompt": "On ___ louer des vélos à la gare.",
        "answer": "peut",
        "accept": [],
        "context": "Man kann am Bahnhof Fahrräder mieten.",
        "explanation": "On peut louer des vélos à la gare.",
        "audio": "On peut louer des vélos à la gare.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:onpeut",
        "checkKey": "A2L19-transfer-onpeut-5"
      },
      {
        "type": "gap",
        "prompt": "Nous vous conseillons ___ réserver.",
        "answer": "de",
        "accept": [],
        "context": "Wir empfehlen Ihnen zu reservieren.",
        "explanation": "Nous vous conseillons de réserver.",
        "audio": "Nous vous conseillons de réserver.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:conseiller",
        "checkKey": "A2L19-transfer-conseiller-6"
      }
    ]
  },
  "20": {
    "goals": [
      "Vorschläge machen, annehmen und ablehnen.",
      "Vorlieben vergleichen und begründen: je préfère … plutôt que …, parce que.",
      "Sich auf zwei Aktivitäten, Zeit und Treffpunkt einigen."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "On ___ aller au cinéma. (könnten)",
        "answer": "pourrait",
        "o": [
          "pourrait",
          "pourra",
          "peut"
        ],
        "context": "Wir könnten ins Kino gehen.",
        "tag": "Vorschlag",
        "explanation": "On pourrait aller au cinéma. = Wir könnten ins Kino gehen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Ça te ___ de faire du vélo ?",
        "answer": "dit",
        "o": [
          "dit",
          "fait",
          "va"
        ],
        "context": "Hast du Lust, Rad zu fahren?",
        "tag": "Vorschlag",
        "explanation": "Ça te dit de faire du vélo ? = Hast du Lust, Rad zu fahren?"
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "J’___ bien voir ce film. (aimer, würde)",
        "answer": "aimerais",
        "o": [
          "aimerais",
          "aimerai",
          "aimais"
        ],
        "context": "Ich würde diesen Film gern sehen.",
        "tag": "Wunsch",
        "explanation": "J’aimerais bien voir ce film. = Ich würde diesen Film gern sehen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Bonne ___ !",
        "answer": "idée",
        "o": [
          "idée",
          "envie",
          "chance"
        ],
        "context": "Gute Idee!",
        "tag": "Zustimmung",
        "explanation": "Bonne idée ! = Gute Idee!"
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Bof, je n’ai pas très ___ .",
        "answer": "envie",
        "o": [
          "envie",
          "idée",
          "besoin"
        ],
        "context": "Na ja, ich habe nicht so große Lust.",
        "tag": "Ablehnung",
        "explanation": "Bof, je n’ai pas très envie . = Na ja, ich habe nicht so große Lust."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je préfère courir ___ aller à la piscine.",
        "answer": "plutôt qu’",
        "o": [
          "plutôt qu’",
          "plus qu’",
          "que plutôt"
        ],
        "context": "Ich gehe lieber laufen als ins Schwimmbad.",
        "tag": "Vorliebe",
        "explanation": "Je préfère courir plutôt qu’aller à la piscine. = Ich gehe lieber laufen als ins Schwimmbad."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je préfère le zoo ___ j’adore les animaux.",
        "answer": "parce que",
        "o": [
          "parce que",
          "pour que",
          "alors"
        ],
        "context": "Ich mag den Zoo lieber, weil ich Tiere liebe.",
        "tag": "Begründung",
        "explanation": "Je préfère le zoo parce que j’adore les animaux. = Ich mag den Zoo lieber, weil ich Tiere liebe."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "On se ___ à dix heures devant la gare.",
        "answer": "retrouve",
        "o": [
          "retrouve",
          "retrouvons",
          "retrouvent"
        ],
        "context": "Wir treffen uns um zehn vor dem Bahnhof.",
        "tag": "Treffpunkt",
        "explanation": "On se retrouve à dix heures devant la gare. = Wir treffen uns um zehn vor dem Bahnhof."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "On se retrouve ___ la gare. (vor)",
        "answer": "devant",
        "o": [
          "devant",
          "derrière",
          "dans"
        ],
        "context": "Wir treffen uns vor dem Bahnhof.",
        "tag": "Treffpunkt",
        "explanation": "On se retrouve devant la gare. = Wir treffen uns vor dem Bahnhof."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "D’accord, on fait comme ___ .",
        "answer": "ça",
        "o": [
          "ça",
          "ce",
          "cela que"
        ],
        "context": "Einverstanden, so machen wir es.",
        "tag": "Einigung",
        "explanation": "D’accord, on fait comme ça . = Einverstanden, so machen wir es."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "Prüfung Teil 3: Dein Partner schlägt vor: « On pourrait faire les magasins samedi ? » Du möchtest lieber draußen sein.",
        "o": [
          "Je préfère faire une sortie à la campagne, parce qu’il fera beau.",
          "Je préfère faire les magasins, parce qu’il fera beau.",
          "Je ne préfère pas, parce que."
        ],
        "answer": "Je préfère faire une sortie à la campagne, parce qu’il fera beau.",
        "explanation": "Du nennst eine Alternative und begründest sie.",
        "tag": "Anwenden",
        "family": "alternative",
        "checkKey": "A2L20-context-alternative",
        "audio": "Je préfère faire une sortie à la campagne, parce qu’il fera beau."
      },
      {
        "type": "choice",
        "q": "« Le zoo ? Bof, ça ne me dit rien. » Wie reagiert die Person?",
        "o": [
          "Sie hat keine Lust auf den Zoo.",
          "Sie kennt den Zoo nicht.",
          "Sie findet den Zoo super."
        ],
        "answer": "Sie hat keine Lust auf den Zoo.",
        "explanation": "Ça ne me dit rien = keine Lust.",
        "tag": "Anwenden",
        "family": "refus",
        "checkKey": "A2L20-context-refus"
      },
      {
        "type": "choice",
        "q": "Du schlägst höflich vor, ins Konzert zu gehen.",
        "o": [
          "On pourrait aller au concert ?",
          "On a pu aller au concert ?",
          "On pourra allé au concert ?"
        ],
        "answer": "On pourrait aller au concert ?",
        "explanation": "On pourrait + Infinitiv.",
        "tag": "Anwenden",
        "family": "proposer",
        "checkKey": "A2L20-context-proposer",
        "audio": "On pourrait aller au concert ?"
      },
      {
        "type": "choice",
        "q": "« Le matin, on court au parc, et le soir, on va au restaurant. » Wann geht ihr laufen?",
        "o": [
          "morgens",
          "abends",
          "mittags"
        ],
        "answer": "morgens",
        "explanation": "Le matin = morgens.",
        "tag": "Anwenden",
        "family": "moment",
        "checkKey": "A2L20-context-moment"
      },
      {
        "type": "choice",
        "q": "Ihr müsst euch auf eine Uhrzeit einigen. Was fragst du?",
        "o": [
          "On se retrouve à quelle heure ?",
          "On se retrouve à quel jour ?",
          "On se trouve quelle heure ?"
        ],
        "answer": "On se retrouve à quelle heure ?",
        "explanation": "Se retrouver à quelle heure = um wie viel Uhr treffen.",
        "tag": "Anwenden",
        "family": "heure",
        "checkKey": "A2L20-context-heure",
        "audio": "On se retrouve à quelle heure ?"
      },
      {
        "type": "choice",
        "q": "Du nimmst den Vorschlag deines Partners an.",
        "o": [
          "Pourquoi pas ? Bonne idée !",
          "Bof, ça ne me dit rien.",
          "Non, je n’ai pas envie."
        ],
        "answer": "Pourquoi pas ? Bonne idée !",
        "explanation": "Pourquoi pas = warum nicht – Zustimmung.",
        "tag": "Anwenden",
        "family": "accepter",
        "checkKey": "A2L20-context-accepter",
        "audio": "Pourquoi pas ? Bonne idée !"
      },
      {
        "type": "choice",
        "q": "« Je préfère le vélo plutôt que la course, parce que j’ai mal au genou. » Warum fährt die Person lieber Rad?",
        "o": [
          "Ihr Knie tut weh.",
          "Sie hat kein Fahrrad.",
          "Sie läuft nicht gern im Regen."
        ],
        "answer": "Ihr Knie tut weh.",
        "explanation": "J’ai mal au genou = das Knie tut weh.",
        "tag": "Anwenden",
        "family": "raison",
        "checkKey": "A2L20-context-raison"
      },
      {
        "type": "choice",
        "q": "Du möchtest gern einmal in den Zoo.",
        "o": [
          "J’aimerais bien aller au zoo.",
          "J’aimerai bien allé au zoo.",
          "J’aimais bien aller au zoo."
        ],
        "answer": "J’aimerais bien aller au zoo.",
        "explanation": "Conditionnel: j’aimerais.",
        "tag": "Anwenden",
        "family": "souhait",
        "checkKey": "A2L20-context-souhait",
        "audio": "J’aimerais bien aller au zoo."
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "On ___ faire un pique-nique. (pouvoir, Vorschlag)",
        "answer": "pourrait",
        "accept": [],
        "context": "Schlage ein Picknick vor.",
        "explanation": "On pourrait faire un pique-nique.",
        "audio": "On pourrait faire un pique-nique.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:pourrait",
        "checkKey": "A2L20-transfer-pourrait-0"
      },
      {
        "type": "gap",
        "prompt": "J’___ bien voir l’exposition. (aimer, Conditionnel)",
        "answer": "aimerais",
        "accept": [],
        "context": "Du würdest die Ausstellung gern sehen.",
        "explanation": "J’aimerais bien voir l’exposition.",
        "audio": "J’aimerais bien voir l’exposition.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:aimerais",
        "checkKey": "A2L20-transfer-aimerais-1"
      },
      {
        "type": "gap",
        "prompt": "Je préfère marcher ___ prendre le bus. (lieber als)",
        "answer": "plutôt que",
        "accept": [],
        "context": "Du gehst lieber zu Fuß, als den Bus zu nehmen.",
        "explanation": "Je préfère marcher plutôt que prendre le bus.",
        "audio": "Je préfère marcher plutôt que prendre le bus.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:plutot",
        "checkKey": "A2L20-transfer-plutot-2"
      },
      {
        "type": "gap",
        "prompt": "On va à la piscine ___ il fait chaud. (weil)",
        "answer": "parce qu’",
        "accept": [],
        "context": "Ihr geht ins Schwimmbad, weil es heiß ist.",
        "explanation": "On va à la piscine parce qu’il fait chaud.",
        "audio": "On va à la piscine parce qu’il fait chaud.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:parceque",
        "checkKey": "A2L20-transfer-parceque-3"
      },
      {
        "type": "gap",
        "prompt": "On se ___ devant le cinéma. (treffen)",
        "answer": "retrouve",
        "accept": [],
        "context": "Ihr trefft euch vor dem Kino.",
        "explanation": "On se retrouve devant le cinéma.",
        "audio": "On se retrouve devant le cinéma.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:retrouver",
        "checkKey": "A2L20-transfer-retrouver-4"
      },
      {
        "type": "gap",
        "prompt": "Ça te ___ d’aller au zoo ?",
        "answer": "dit",
        "accept": [],
        "context": "Hast du Lust, in den Zoo zu gehen?",
        "explanation": "Ça te dit d’aller au zoo ?",
        "audio": "Ça te dit d’aller au zoo ?",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:dit",
        "checkKey": "A2L20-transfer-dit-5"
      },
      {
        "type": "gap",
        "prompt": "Bof, ça ne me dit ___ .",
        "answer": "rien",
        "accept": [],
        "context": "Du hast keine Lust.",
        "explanation": "Bof, ça ne me dit rien .",
        "audio": "Bof, ça ne me dit rien .",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:refus",
        "checkKey": "A2L20-transfer-refus-6"
      }
    ]
  },
  "21": {
    "goals": [
      "Lerntipps und Kursinformationen verstehen und prüfen, was empfohlen wird.",
      "Ratschläge im Imperativ (auch verneint), mit il faut und recommander de geben.",
      "Über einen Sprachkurs sprechen: Dauer, Unterkunft, Angebote."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "___ les mots nouveaux. (noter)",
        "answer": "Notez",
        "o": [
          "Notez",
          "Notes",
          "Notent"
        ],
        "context": "Notieren Sie die neuen Wörter.",
        "tag": "Imperativ",
        "explanation": "Notez les mots nouveaux. = Notieren Sie die neuen Wörter."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Ne ___ pas chaque mot. (traduire)",
        "answer": "traduisez",
        "o": [
          "traduisez",
          "traduisez-pas",
          "traduire"
        ],
        "context": "Übersetzen Sie nicht jedes Wort.",
        "tag": "Imperativ",
        "explanation": "Ne traduisez pas chaque mot. = Übersetzen Sie nicht jedes Wort."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "___ patient ! (être)",
        "answer": "Soyez",
        "o": [
          "Soyez",
          "Êtes",
          "Soyons"
        ],
        "context": "Seien Sie geduldig!",
        "tag": "Imperativ",
        "explanation": "Être → soyez."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "___ toujours un carnet. (avoir)",
        "answer": "Ayez",
        "o": [
          "Ayez",
          "Avez",
          "Aie"
        ],
        "context": "Haben Sie immer ein Notizbuch dabei.",
        "tag": "Imperativ",
        "explanation": "Avoir → ayez."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "On vous conseille ___ lire des BD.",
        "answer": "de",
        "o": [
          "de",
          "à",
          "pour"
        ],
        "context": "Man rät Ihnen, Comics zu lesen.",
        "tag": "conseiller de",
        "explanation": "On vous conseille de lire des BD. = Man rät Ihnen, Comics zu lesen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Il ___ parler tous les jours.",
        "answer": "faut",
        "o": [
          "faut",
          "doit",
          "peut"
        ],
        "context": "Man muss jeden Tag sprechen.",
        "tag": "il faut",
        "explanation": "Il faut parler tous les jours. = Man muss jeden Tag sprechen."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je voudrais m’___ à un cours intensif.",
        "answer": "inscrire",
        "o": [
          "inscrire",
          "écrire",
          "inscris"
        ],
        "context": "Ich möchte mich für einen Intensivkurs anmelden.",
        "tag": "Kurs",
        "explanation": "Je voudrais m’inscrire à un cours intensif. = Ich möchte mich für einen Intensivkurs anmelden."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Le cours ___ trois semaines.",
        "answer": "dure",
        "o": [
          "dure",
          "dur",
          "durée"
        ],
        "context": "Der Kurs dauert drei Wochen.",
        "tag": "Kurs",
        "explanation": "Le cours dure trois semaines. = Der Kurs dauert drei Wochen."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "On peut habiter dans une famille d’___ .",
        "answer": "accueil",
        "o": [
          "accueil",
          "accueillir",
          "acceuil"
        ],
        "context": "Man kann bei einer Gastfamilie wohnen.",
        "tag": "Kurs",
        "explanation": "On peut habiter dans une famille d’accueil . = Man kann bei einer Gastfamilie wohnen."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Le prix ___ les repas.",
        "answer": "comprend",
        "o": [
          "comprend",
          "comprends",
          "comprennent"
        ],
        "context": "Im Preis sind die Mahlzeiten enthalten.",
        "tag": "Kurs",
        "explanation": "Le prix comprend les repas. = Im Preis sind die Mahlzeiten enthalten."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "Lerntipp: « Une moyenne de cinq mots nouveaux par jour suffit. » Was wird empfohlen?",
        "o": [
          "etwa fünf neue Wörter pro Tag",
          "fünf Wörter aus jedem Text",
          "fünfzig Wörter pro Woche"
        ],
        "answer": "etwa fünf neue Wörter pro Tag",
        "explanation": "Une moyenne de … par jour = im Schnitt … pro Tag.",
        "tag": "Anwenden",
        "family": "mots",
        "checkKey": "A2L21-context-mots"
      },
      {
        "type": "choice",
        "q": "« Notez votre programme de la journée en français : 9 h, dentiste ; 12 h, déjeuner. » Was sollst du tun?",
        "o": [
          "den Tagesplan auf Französisch schreiben",
          "einen Zahnarzttermin machen",
          "französische Rezepte lesen"
        ],
        "answer": "den Tagesplan auf Französisch schreiben",
        "explanation": "Notez votre programme = schreiben Sie Ihr Programm auf.",
        "tag": "Anwenden",
        "family": "programme",
        "checkKey": "A2L21-context-programme"
      },
      {
        "type": "choice",
        "q": "Du gibst den Rat, keine Angst vor Fehlern zu haben.",
        "o": [
          "N’ayez pas peur de faire des fautes.",
          "N’avez pas peur de faire des fautes.",
          "Ne pas ayez peur de faire des fautes."
        ],
        "answer": "N’ayez pas peur de faire des fautes.",
        "explanation": "Avoir → ayez; verneint: N’ayez pas.",
        "tag": "Anwenden",
        "family": "imperatif",
        "checkKey": "A2L21-context-imperatif",
        "audio": "N’ayez pas peur de faire des fautes."
      },
      {
        "type": "choice",
        "q": "« Ne cherchez pas chaque mot dans le dictionnaire. » Was sollst du NICHT tun?",
        "o": [
          "jedes Wort nachschlagen",
          "den Text lesen",
          "das Wörterbuch kaufen"
        ],
        "answer": "jedes Wort nachschlagen",
        "explanation": "Ne cherchez pas = suchen Sie nicht.",
        "tag": "Anwenden",
        "family": "negation",
        "checkKey": "A2L21-context-negation"
      },
      {
        "type": "choice",
        "q": "Kursinfo: « Le prix comprend le cours et l’hébergement, mais pas les repas. » Was ist nicht im Preis?",
        "o": [
          "das Essen",
          "die Unterkunft",
          "der Unterricht"
        ],
        "answer": "das Essen",
        "explanation": "Mais pas les repas = aber nicht die Mahlzeiten.",
        "tag": "Anwenden",
        "family": "prix",
        "checkKey": "A2L21-context-prix"
      },
      {
        "type": "choice",
        "q": "Du willst wissen, wie lange der Kurs dauert.",
        "o": [
          "Le cours dure combien de temps ?",
          "Le cours coûte combien de temps ?",
          "Le cours est quelle durée ?"
        ],
        "answer": "Le cours dure combien de temps ?",
        "explanation": "Durer combien de temps = wie lange dauern.",
        "tag": "Anwenden",
        "family": "duree",
        "checkKey": "A2L21-context-duree",
        "audio": "Le cours dure combien de temps ?"
      },
      {
        "type": "choice",
        "q": "« Cherchez les mots qui ressemblent à l’allemand ou à l’anglais : vous comprendrez déjà beaucoup ! » Welcher Rat ist das?",
        "o": [
          "ähnliche Wörter suchen",
          "nur unbekannte Wörter lernen",
          "Texte übersetzen"
        ],
        "answer": "ähnliche Wörter suchen",
        "explanation": "Ressembler à = ähneln.",
        "tag": "Anwenden",
        "family": "ressembler",
        "checkKey": "A2L21-context-ressembler"
      },
      {
        "type": "choice",
        "q": "Du empfiehlst, Filme in Originalfassung zu schauen.",
        "o": [
          "Regardez des films en version originale.",
          "Regardez des films en version allemande.",
          "Regardez pas des films originaux."
        ],
        "answer": "Regardez des films en version originale.",
        "explanation": "Version originale = Originalfassung.",
        "tag": "Anwenden",
        "family": "vo",
        "checkKey": "A2L21-context-vo",
        "audio": "Regardez des films en version originale."
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "___ la radio française. (écouter, vous)",
        "answer": "Écoutez",
        "accept": [],
        "context": "Rate jemandem, französisches Radio zu hören.",
        "explanation": "Écoutez la radio française.",
        "audio": "Écoutez la radio française.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:imperatif",
        "checkKey": "A2L21-transfer-imperatif-0"
      },
      {
        "type": "gap",
        "prompt": "Ne ___ pas trop vite. (parler, vous)",
        "answer": "parlez",
        "accept": [],
        "context": "Rate jemandem, nicht zu schnell zu sprechen.",
        "explanation": "Ne parlez pas trop vite.",
        "audio": "Ne parlez pas trop vite.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:negation",
        "checkKey": "A2L21-transfer-negation-1"
      },
      {
        "type": "gap",
        "prompt": "___ curieux ! (être, vous)",
        "answer": "Soyez",
        "accept": [],
        "context": "Rate jemandem, neugierig zu sein.",
        "explanation": "Soyez curieux !",
        "audio": "Soyez curieux !",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:etre",
        "checkKey": "A2L21-transfer-etre-2"
      },
      {
        "type": "gap",
        "prompt": "___ toujours un dictionnaire. (avoir, vous)",
        "answer": "Ayez",
        "accept": [],
        "context": "Rate jemandem, immer ein Wörterbuch dabeizuhaben.",
        "explanation": "Ayez toujours un dictionnaire.",
        "audio": "Ayez toujours un dictionnaire.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:avoir",
        "checkKey": "A2L21-transfer-avoir-3"
      },
      {
        "type": "gap",
        "prompt": "On vous recommande ___ lire le journal.",
        "answer": "de",
        "accept": [],
        "context": "Man empfiehlt Ihnen, Zeitung zu lesen.",
        "explanation": "On vous recommande de lire le journal.",
        "audio": "On vous recommande de lire le journal.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:recommander",
        "checkKey": "A2L21-transfer-recommander-4"
      },
      {
        "type": "gap",
        "prompt": "Je voudrais m’___ au cours du soir.",
        "answer": "inscrire",
        "accept": [],
        "context": "Du möchtest dich für den Abendkurs anmelden.",
        "explanation": "Je voudrais m’inscrire au cours du soir.",
        "audio": "Je voudrais m’inscrire au cours du soir.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:inscrire",
        "checkKey": "A2L21-transfer-inscrire-5"
      },
      {
        "type": "gap",
        "prompt": "Le stage ___ deux semaines. (dauern)",
        "answer": "dure",
        "accept": [],
        "context": "Das Praktikum dauert zwei Wochen.",
        "explanation": "Le stage dure deux semaines.",
        "audio": "Le stage dure deux semaines.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:durer",
        "checkKey": "A2L21-transfer-durer-6"
      }
    ]
  },
  "22": {
    "goals": [
      "Einen persönlichen Brief mit passender Anrede und Grußformel schreiben.",
      "Drei Punkte einer Anfrage verständlich behandeln.",
      "Höfliche Bitten mit dem Conditionnel formulieren (pourriez, voudrais, aimerais) und Sätze mit et, mais, parce que verbinden."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Est-ce que tu ___ m’aider ? (könntest)",
        "answer": "pourrais",
        "o": [
          "pourrais",
          "pourras",
          "peux"
        ],
        "context": "Könntest du mir helfen?",
        "tag": "Conditionnel",
        "explanation": "Est-ce que tu pourrais m’aider ? = Könntest du mir helfen?"
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Vous ___ chercher une école ? (könntet)",
        "answer": "pourriez",
        "o": [
          "pourriez",
          "pourrez",
          "pouvez"
        ],
        "context": "Könntet ihr eine Schule suchen?",
        "tag": "Conditionnel",
        "explanation": "Vous pourriez chercher une école ? = Könntet ihr eine Schule suchen?"
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Je ___ savoir le prix. (vouloir, höflich)",
        "answer": "voudrais",
        "o": [
          "voudrais",
          "voudrai",
          "veux"
        ],
        "context": "Ich würde gern den Preis wissen.",
        "tag": "Conditionnel",
        "explanation": "Je voudrais savoir le prix. = Ich würde gern den Preis wissen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "J’___ habiter dans une famille. (aimer, würde)",
        "answer": "aimerais",
        "o": [
          "aimerais",
          "aimerai",
          "aimais"
        ],
        "context": "Ich würde gern bei einer Familie wohnen.",
        "tag": "Conditionnel",
        "explanation": "J’aimerais habiter dans une famille. = Ich würde gern bei einer Familie wohnen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Ce ___ super ! (être, wäre)",
        "answer": "serait",
        "o": [
          "serait",
          "sera",
          "était"
        ],
        "context": "Das wäre super!",
        "tag": "Conditionnel",
        "explanation": "Ce serait super ! = Das wäre super!"
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "___ Anne, (Anrede)",
        "answer": "Chère",
        "o": [
          "Chère",
          "Cher",
          "Chers"
        ],
        "context": "Liebe Anne,",
        "tag": "Anrede",
        "explanation": "Anne ist eine Frau → Chère."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "J’espère que tu ___ bien.",
        "answer": "vas",
        "o": [
          "vas",
          "es",
          "fais"
        ],
        "context": "Ich hoffe, es geht dir gut.",
        "tag": "Einstieg",
        "explanation": "J’espère que tu vas bien. = Ich hoffe, es geht dir gut."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je t’écris ___ j’ai une question.",
        "answer": "parce que",
        "o": [
          "parce que",
          "pour",
          "donc"
        ],
        "context": "Ich schreibe dir, weil ich eine Frage habe.",
        "tag": "Grund",
        "explanation": "Je t’écris parce que j’ai une question. = Ich schreibe dir, weil ich eine Frage habe."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Merci d’___ pour ton aide.",
        "answer": "avance",
        "o": [
          "avance",
          "avant",
          "abord"
        ],
        "context": "Danke im Voraus für deine Hilfe.",
        "tag": "Schluss",
        "explanation": "Merci d’avance pour ton aide. = Danke im Voraus für deine Hilfe."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je t’___ , Laura",
        "answer": "embrasse",
        "o": [
          "embrasse",
          "embrassé",
          "embrasses"
        ],
        "context": "Liebe Grüße, Laura",
        "tag": "Gruß",
        "explanation": "Je t’embrasse , Laura = Liebe Grüße, Laura"
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "Schreibauftrag telc: drei von sechs Punkten. Du hast Anrede, Schule und Termine geschrieben, aber keinen Gruß. Was fehlt laut Bewertung?",
        "o": [
          "die passende Grußformel am Ende",
          "ein vierter Punkt",
          "eine Unterschrift mit Adresse"
        ],
        "answer": "die passende Grußformel am Ende",
        "explanation": "Die Briefform (Anrede und Grußformel) wird eigens bewertet.",
        "tag": "Anwenden",
        "family": "forme",
        "checkKey": "A2L22-context-forme"
      },
      {
        "type": "choice",
        "q": "Du bittest deine Freunde höflich, eine Schule zu suchen.",
        "o": [
          "Est-ce que vous pourriez chercher une école pour moi ?",
          "Est-ce que vous pouvez chercher moi une école ?",
          "Cherchez une école, vite !"
        ],
        "answer": "Est-ce que vous pourriez chercher une école pour moi ?",
        "explanation": "Vous pourriez + Infinitiv = höfliche Bitte.",
        "tag": "Anwenden",
        "family": "demande",
        "checkKey": "A2L22-context-demande",
        "audio": "Est-ce que vous pourriez chercher une école pour moi ?"
      },
      {
        "type": "choice",
        "q": "Welche Anrede passt für deinen Freund Luc?",
        "o": [
          "Cher Luc,",
          "Chère Luc,",
          "Chers Luc,"
        ],
        "answer": "Cher Luc,",
        "explanation": "Ein Mann → Cher.",
        "tag": "Anwenden",
        "family": "cher",
        "checkKey": "A2L22-context-cher",
        "audio": "Cher Luc,"
      },
      {
        "type": "choice",
        "q": "Du möchtest wissen, ob man in einer Familie wohnen kann.",
        "o": [
          "Est-ce que je pourrais habiter dans une famille ?",
          "Est-ce que je pourrai habité dans une famille ?",
          "Je pourrais habiter une famille dans ?"
        ],
        "answer": "Est-ce que je pourrais habiter dans une famille ?",
        "explanation": "Je pourrais + Infinitiv.",
        "tag": "Anwenden",
        "family": "famille",
        "checkKey": "A2L22-context-famille",
        "audio": "Est-ce que je pourrais habiter dans une famille ?"
      },
      {
        "type": "choice",
        "q": "Welcher Schluss passt zu einem Brief an Freunde?",
        "o": [
          "Merci d’avance ! Je vous embrasse, Laura",
          "Veuillez agréer mes salutations distinguées.",
          "Fin de la lettre."
        ],
        "answer": "Merci d’avance ! Je vous embrasse, Laura",
        "explanation": "Je vous embrasse = herzliche Grüße an Freunde.",
        "tag": "Anwenden",
        "family": "salutation",
        "checkKey": "A2L22-context-salutation"
      },
      {
        "type": "choice",
        "q": "Du nennst den Zeitraum deines Kurses.",
        "o": [
          "Le cours serait du 3 au 28 juillet.",
          "Le cours serait de 3 à 28 juillet.",
          "Le cours serait le 3 jusqu’au 28 juillet de."
        ],
        "answer": "Le cours serait du 3 au 28 juillet.",
        "explanation": "Du … au … = vom … bis zum …",
        "tag": "Anwenden",
        "family": "dates",
        "checkKey": "A2L22-context-dates",
        "audio": "Le cours serait du 3 au 28 juillet."
      },
      {
        "type": "choice",
        "q": "Du fragst nach dem Preis.",
        "o": [
          "Est-ce que vous savez combien coûte un cours ?",
          "Est-ce que vous savez combien un cours coûtes ?",
          "Combien vous coûte savoir un cours ?"
        ],
        "answer": "Est-ce que vous savez combien coûte un cours ?",
        "explanation": "Combien coûte + Nomen.",
        "tag": "Anwenden",
        "family": "prix",
        "checkKey": "A2L22-context-prix",
        "audio": "Est-ce que vous savez combien coûte un cours ?"
      },
      {
        "type": "choice",
        "q": "Du verbindest zwei Gedanken: Ich möchte bei einer Familie wohnen, aber nicht zu weit vom Zentrum.",
        "o": [
          "J’aimerais habiter dans une famille, mais pas trop loin du centre.",
          "J’aimerais habiter dans une famille, parce que pas trop loin du centre.",
          "J’aimerais habiter dans une famille, donc pas loin trop du centre."
        ],
        "answer": "J’aimerais habiter dans une famille, mais pas trop loin du centre.",
        "explanation": "Mais = aber, für eine Einschränkung.",
        "tag": "Anwenden",
        "family": "mais",
        "checkKey": "A2L22-context-mais",
        "audio": "J’aimerais habiter dans une famille, mais pas trop loin du centre."
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "Tu ___ venir me chercher à la gare ? (pouvoir, Conditionnel)",
        "answer": "pourrais",
        "accept": [],
        "context": "Bitte einen Freund höflich, dich abzuholen.",
        "explanation": "Tu pourrais venir me chercher à la gare ?",
        "audio": "Tu pourrais venir me chercher à la gare ?",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:pourrais",
        "checkKey": "A2L22-transfer-pourrais-0"
      },
      {
        "type": "gap",
        "prompt": "Vous ___ m’envoyer des informations ? (pouvoir, Conditionnel)",
        "answer": "pourriez",
        "accept": [],
        "context": "Bitte höflich um Informationen.",
        "explanation": "Vous pourriez m’envoyer des informations ?",
        "audio": "Vous pourriez m’envoyer des informations ?",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:pourriez",
        "checkKey": "A2L22-transfer-pourriez-1"
      },
      {
        "type": "gap",
        "prompt": "Je ___ réserver une chambre. (vouloir, Conditionnel)",
        "answer": "voudrais",
        "accept": [],
        "context": "Du möchtest höflich ein Zimmer reservieren.",
        "explanation": "Je voudrais réserver une chambre.",
        "audio": "Je voudrais réserver une chambre.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:voudrais",
        "checkKey": "A2L22-transfer-voudrais-2"
      },
      {
        "type": "gap",
        "prompt": "___ Julie, (Anrede)",
        "answer": "Chère",
        "accept": [],
        "context": "Begrüße deine Freundin Julie im Brief.",
        "explanation": "Chère Julie,",
        "audio": "Chère Julie,",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:chere",
        "checkKey": "A2L22-transfer-chere-3"
      },
      {
        "type": "gap",
        "prompt": "Je vous ___ parce que j’ai une question. (écrire)",
        "answer": "écris",
        "accept": [],
        "context": "Du schreibst, weil du eine Frage hast.",
        "explanation": "Je vous écris parce que j’ai une question.",
        "audio": "Je vous écris parce que j’ai une question.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:ecrire",
        "checkKey": "A2L22-transfer-ecrire-4"
      },
      {
        "type": "gap",
        "prompt": "Merci d’___ ! (im Voraus)",
        "answer": "avance",
        "accept": [],
        "context": "Danke im Voraus!",
        "explanation": "Merci d’avance !",
        "audio": "Merci d’avance !",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:avance",
        "checkKey": "A2L22-transfer-avance-5"
      },
      {
        "type": "gap",
        "prompt": "Je t’___ , Marc (Grußformel)",
        "answer": "embrasse",
        "accept": [],
        "context": "Beende den Brief an eine Freundin.",
        "explanation": "Je t’embrasse , Marc",
        "audio": "Je t’embrasse , Marc",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:embrasse",
        "checkKey": "A2L22-transfer-embrasse-6"
      }
    ]
  },
  "23": {
    "goals": [
      "In einem Text die passenden Pronomen, Präpositionen und Adverbien erkennen und einsetzen.",
      "le / la / les, lui / leur, y und en unterscheiden.",
      "Ortsangaben (près de, à côté de, en face de, contre) und Häufigkeitsadverbien (toujours, jamais, quelquefois, ensemble) richtig verwenden."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Le train ? Je ___ prends à huit heures.",
        "answer": "le",
        "o": [
          "le",
          "lui",
          "y"
        ],
        "context": "Den Zug? Ich nehme ihn um acht.",
        "tag": "Pronomen",
        "explanation": "Le train ? Je le prends à huit heures. = Den Zug? Ich nehme ihn um acht."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Ma mère ? Je ___ écris.",
        "answer": "lui",
        "o": [
          "lui",
          "la",
          "en"
        ],
        "context": "Meine Mutter? Ich schreibe ihr.",
        "tag": "Pronomen",
        "explanation": "Ma mère ? Je lui écris. = Meine Mutter? Ich schreibe ihr."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Lyon ? Nous ___ habitons.",
        "answer": "y",
        "o": [
          "y",
          "en",
          "la"
        ],
        "context": "Lyon? Wir wohnen dort.",
        "tag": "Pronomen",
        "explanation": "Lyon ? Nous y habitons. = Lyon? Wir wohnen dort."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Des pommes ? J’___ achète trois.",
        "answer": "en",
        "o": [
          "en",
          "les",
          "y"
        ],
        "context": "Äpfel? Ich kaufe drei.",
        "tag": "Pronomen",
        "explanation": "Des pommes ? J’en achète trois. = Äpfel? Ich kaufe drei."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Les clés ? Je ___ ai oubliées.",
        "answer": "les",
        "o": [
          "les",
          "leur",
          "en"
        ],
        "context": "Die Schlüssel? Ich habe sie vergessen.",
        "tag": "Pronomen",
        "explanation": "Les clés ? Je les ai oubliées. = Die Schlüssel? Ich habe sie vergessen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Mes amis ? Je ___ envoie une carte.",
        "answer": "leur",
        "o": [
          "leur",
          "les",
          "lui"
        ],
        "context": "Meinen Freunden? Ich schicke ihnen eine Karte.",
        "tag": "Pronomen",
        "explanation": "Mes amis ? Je leur envoie une carte. = Meinen Freunden? Ich schicke ihnen eine Karte."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "J’habite près ___ parc.",
        "answer": "du",
        "o": [
          "du",
          "de le",
          "au"
        ],
        "context": "Ich wohne in der Nähe des Parks.",
        "tag": "Präposition",
        "explanation": "De + le = du."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "La pharmacie est en face ___ l’église.",
        "answer": "de",
        "o": [
          "de",
          "à",
          "du"
        ],
        "context": "Die Apotheke ist gegenüber der Kirche.",
        "tag": "Präposition",
        "explanation": "La pharmacie est en face de l’église. = Die Apotheke ist gegenüber der Kirche."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je suis ___ à l’heure. (immer)",
        "answer": "toujours",
        "o": [
          "toujours",
          "jamais",
          "quelquefois"
        ],
        "context": "Ich bin immer pünktlich.",
        "tag": "Adverb",
        "explanation": "Je suis toujours à l’heure. = Ich bin immer pünktlich."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je ne fume ___ . (nie)",
        "answer": "jamais",
        "o": [
          "jamais",
          "toujours",
          "souvent"
        ],
        "context": "Ich rauche nie.",
        "tag": "Adverb",
        "explanation": "Je ne fume jamais . = Ich rauche nie."
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "Lückentext: « Appelle-moi sur mon portable, je l’ai ___ sur moi. » Welches Wort passt?",
        "o": [
          "toujours",
          "jamais",
          "pendant"
        ],
        "answer": "toujours",
        "explanation": "Wer das Handy dabeihat, hat es immer bei sich.",
        "tag": "Anwenden",
        "family": "toujours",
        "checkKey": "A2L23-context-toujours",
        "audio": "Je l’ai toujours sur moi."
      },
      {
        "type": "choice",
        "q": "Lückentext: « Il faut absolument qu’on fête ça ___ . »",
        "o": [
          "ensemble",
          "chacune",
          "quelquefois"
        ],
        "answer": "ensemble",
        "explanation": "Zusammen feiern = fêter ensemble.",
        "tag": "Anwenden",
        "family": "ensemble",
        "checkKey": "A2L23-context-ensemble",
        "audio": "Il faut absolument qu’on fête ça ensemble."
      },
      {
        "type": "choice",
        "q": "« Tu as trouvé un travail, et ___ chez toi en plus ! » (in der Nähe)",
        "o": [
          "près de",
          "contre",
          "à côté"
        ],
        "answer": "près de",
        "explanation": "Près de chez toi = in deiner Nähe. À côté fehlt hier de.",
        "tag": "Anwenden",
        "family": "pres",
        "checkKey": "A2L23-context-pres",
        "audio": "Tu as trouvé un travail, et près de chez toi en plus !"
      },
      {
        "type": "choice",
        "q": "Antwort auf « Tu vas souvent à la piscine ? »",
        "o": [
          "Oui, j’y vais le mardi.",
          "Oui, j’en vais le mardi.",
          "Oui, je la vais le mardi."
        ],
        "answer": "Oui, j’y vais le mardi.",
        "explanation": "Ort → y.",
        "tag": "Anwenden",
        "family": "y",
        "checkKey": "A2L23-context-y",
        "audio": "Oui, j’y vais le mardi."
      },
      {
        "type": "choice",
        "q": "Antwort auf « Tu bois du café ? »",
        "o": [
          "Oui, j’en bois le matin.",
          "Oui, je le bois le matin du.",
          "Oui, j’y bois le matin."
        ],
        "answer": "Oui, j’en bois le matin.",
        "explanation": "Du café → en.",
        "tag": "Anwenden",
        "family": "en",
        "checkKey": "A2L23-context-en",
        "audio": "Oui, j’en bois le matin."
      },
      {
        "type": "choice",
        "q": "Antwort auf « Tu parles à ton voisin ? »",
        "o": [
          "Oui, je lui parle souvent.",
          "Oui, je le parle souvent.",
          "Oui, je leur parle souvent."
        ],
        "answer": "Oui, je lui parle souvent.",
        "explanation": "Parler à + eine Person → lui.",
        "tag": "Anwenden",
        "family": "lui",
        "checkKey": "A2L23-context-lui",
        "audio": "Oui, je lui parle souvent."
      },
      {
        "type": "choice",
        "q": "« La banque est à côté de la mairie. » Wo ist die Bank?",
        "o": [
          "neben dem Rathaus",
          "gegenüber dem Rathaus",
          "im Rathaus"
        ],
        "answer": "neben dem Rathaus",
        "explanation": "À côté de = neben.",
        "tag": "Anwenden",
        "family": "acote",
        "checkKey": "A2L23-context-acote"
      },
      {
        "type": "choice",
        "q": "Du sagst, dass du nie allein reist.",
        "o": [
          "Je ne voyage jamais seul.",
          "Je voyage jamais seul ne.",
          "Je ne voyage pas jamais seul."
        ],
        "answer": "Je ne voyage jamais seul.",
        "explanation": "Ne … jamais umschließt das Verb.",
        "tag": "Anwenden",
        "family": "jamais",
        "checkKey": "A2L23-context-jamais",
        "audio": "Je ne voyage jamais seul."
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "Ce film ? Je ___ ai vu hier.",
        "answer": "l’",
        "accept": [],
        "context": "Den Film hast du gestern gesehen.",
        "explanation": "Ce film ? Je l’ai vu hier.",
        "audio": "Ce film ? Je l’ai vu hier.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:le",
        "checkKey": "A2L23-transfer-le-0"
      },
      {
        "type": "gap",
        "prompt": "Ton frère ? Je ___ donne le livre demain.",
        "answer": "lui",
        "accept": [],
        "context": "Deinem Bruder gibst du morgen das Buch.",
        "explanation": "Ton frère ? Je lui donne le livre demain.",
        "audio": "Ton frère ? Je lui donne le livre demain.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:lui",
        "checkKey": "A2L23-transfer-lui-1"
      },
      {
        "type": "gap",
        "prompt": "Le marché ? J’___ vais le samedi.",
        "answer": "y",
        "accept": [],
        "context": "Auf den Markt gehst du samstags.",
        "explanation": "Le marché ? J’y vais le samedi.",
        "audio": "Le marché ? J’y vais le samedi.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:y",
        "checkKey": "A2L23-transfer-y-2"
      },
      {
        "type": "gap",
        "prompt": "Du pain ? J’___ achète deux.",
        "answer": "en",
        "accept": [],
        "context": "Brot kaufst du zwei.",
        "explanation": "Du pain ? J’en achète deux.",
        "audio": "Du pain ? J’en achète deux.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:en",
        "checkKey": "A2L23-transfer-en-3"
      },
      {
        "type": "gap",
        "prompt": "Tes parents ? Tu ___ écris souvent ?",
        "answer": "leur",
        "accept": [],
        "context": "Schreibst du deinen Eltern oft?",
        "explanation": "Tes parents ? Tu leur écris souvent ?",
        "audio": "Tes parents ? Tu leur écris souvent ?",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:leur",
        "checkKey": "A2L23-transfer-leur-4"
      },
      {
        "type": "gap",
        "prompt": "J’habite ___ de l’école. (in der Nähe)",
        "answer": "près",
        "accept": [],
        "context": "Du wohnst in der Nähe der Schule.",
        "explanation": "J’habite près de l’école.",
        "audio": "J’habite près de l’école.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:pres",
        "checkKey": "A2L23-transfer-pres-5"
      },
      {
        "type": "gap",
        "prompt": "___, nous mangeons au restaurant. (manchmal)",
        "answer": "Quelquefois",
        "accept": [],
        "context": "Manchmal esst ihr im Restaurant.",
        "explanation": "Quelquefois, nous mangeons au restaurant.",
        "audio": "Quelquefois, nous mangeons au restaurant.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:quelquefois",
        "checkKey": "A2L23-transfer-quelquefois-6"
      }
    ]
  },
  "24": {
    "goals": [
      "Aufbau, Zeiten und Punkte der Prüfung telc Français A2 kennen.",
      "Prüfungsanweisungen auf Französisch verstehen.",
      "Strategien für richtig/falsch, Zuordnung, Lückentext, Brief und Gespräch anwenden."
    ],
    "tasks": [
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Vous entendrez chaque texte deux ___ .",
        "answer": "fois",
        "o": [
          "fois",
          "temps",
          "heures"
        ],
        "context": "Sie hören jeden Text zweimal.",
        "tag": "Anweisung",
        "explanation": "Vous entendrez chaque texte deux fois . = Sie hören jeden Text zweimal."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Marquez vos réponses sur la ___ de réponse.",
        "answer": "feuille",
        "o": [
          "feuille",
          "page",
          "fiche"
        ],
        "context": "Markieren Sie Ihre Antworten auf dem Antwortbogen.",
        "tag": "Anweisung",
        "explanation": "Marquez vos réponses sur la feuille de réponse. = Markieren Sie Ihre Antworten auf dem Antwortbogen."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Décidez si les phrases sont vraies ou ___ .",
        "answer": "fausses",
        "o": [
          "fausses",
          "faux",
          "fautes"
        ],
        "context": "Entscheiden Sie, ob die Sätze richtig oder falsch sind.",
        "tag": "Anweisung",
        "explanation": "Les phrases ist weiblich Plural → fausses."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Vous n’utiliserez un mot qu’une ___ fois.",
        "answer": "seule",
        "o": [
          "seule",
          "seul",
          "même"
        ],
        "context": "Sie verwenden jedes Wort nur einmal.",
        "tag": "Anweisung",
        "explanation": "Vous n’utiliserez un mot qu’une seule fois. = Sie verwenden jedes Wort nur einmal."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "Choisissez trois ___ six points.",
        "answer": "des",
        "o": [
          "des",
          "de",
          "sur"
        ],
        "context": "Wählen Sie drei der sechs Punkte.",
        "tag": "Anweisung",
        "explanation": "Choisissez trois des six points. = Wählen Sie drei der sechs Punkte."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Pouvez-vous nous parler ___ vous ?",
        "answer": "de",
        "o": [
          "de",
          "à",
          "sur"
        ],
        "context": "Können Sie uns etwas über sich erzählen?",
        "tag": "mündlich",
        "explanation": "Pouvez-vous nous parler de vous ? = Können Sie uns etwas über sich erzählen?"
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "___ des questions à votre partenaire. (poser)",
        "answer": "Posez",
        "o": [
          "Posez",
          "Posez-vous",
          "Poser"
        ],
        "context": "Stellen Sie Ihrem Partner Fragen.",
        "tag": "mündlich",
        "explanation": "Posez des questions à votre partenaire. = Stellen Sie Ihrem Partner Fragen."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Mettez-vous d’___ sur deux activités.",
        "answer": "accord",
        "o": [
          "accord",
          "avis",
          "idée"
        ],
        "context": "Einigen Sie sich auf zwei Aktivitäten.",
        "tag": "mündlich",
        "explanation": "Mettez-vous d’accord sur deux activités. = Einigen Sie sich auf zwei Aktivitäten."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Faites des ___ ! (Vorschläge)",
        "answer": "propositions",
        "o": [
          "propositions",
          "questions",
          "réponses"
        ],
        "context": "Machen Sie Vorschläge!",
        "tag": "mündlich",
        "explanation": "Faites des propositions ! = Machen Sie Vorschläge!"
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Pardon, vous pouvez ___ ?",
        "answer": "répéter",
        "o": [
          "répéter",
          "répondre",
          "reporter"
        ],
        "context": "Entschuldigung, können Sie das wiederholen?",
        "tag": "Strategie",
        "explanation": "Pardon, vous pouvez répéter ? = Entschuldigung, können Sie das wiederholen?"
      }
    ],
    "checkTasks": [
      {
        "type": "choice",
        "q": "Richtig/falsch-Aufgabe: Satz: « Romain viendra au dîner. » Text: « Désolé, je ne pourrai pas venir demain. » Was markierst du?",
        "o": [
          "− (faux)",
          "+ (vrai)",
          "nichts"
        ],
        "answer": "− (faux)",
        "explanation": "Je ne pourrai pas venir widerspricht dem Satz.",
        "tag": "Anwenden",
        "family": "vraifaux",
        "checkKey": "A2L24-context-vraifaux"
      },
      {
        "type": "choice",
        "q": "Hörtext: « Le kilo de pommes à deux euros ; le fromage à douze euros le kilo. » Satz: « Les pommes coûtent douze euros le kilo. »",
        "o": [
          "− (faux)",
          "+ (vrai)",
          "nicht entscheidbar"
        ],
        "answer": "− (faux)",
        "explanation": "Zwölf Euro gehören zum Käse, nicht zu den Äpfeln.",
        "tag": "Anwenden",
        "family": "chiffres",
        "checkKey": "A2L24-context-chiffres"
      },
      {
        "type": "choice",
        "q": "Strategie im Leseteil 1 (vier Texte, acht Titel): Was machst du zuerst?",
        "o": [
          "die Texte lesen und das Hauptthema suchen",
          "alle Wörter übersetzen",
          "den längsten Titel wählen"
        ],
        "answer": "die Texte lesen und das Hauptthema suchen",
        "explanation": "Laut Anweisung: erst die Texte, dann die Titel.",
        "tag": "Anwenden",
        "family": "titres",
        "checkKey": "A2L24-context-titres"
      },
      {
        "type": "choice",
        "q": "Im Brief schreibst du drei Punkte, aber keine Anrede und keinen Gruß. Was passiert?",
        "o": [
          "Du verlierst Punkte bei der Briefform.",
          "Nichts, nur der Inhalt zählt.",
          "Der ganze Brief zählt 0 Punkte."
        ],
        "answer": "Du verlierst Punkte bei der Briefform.",
        "explanation": "Die Configuration communicative (Anrede/Gruß) wird eigens bewertet.",
        "tag": "Anwenden",
        "family": "forme",
        "checkKey": "A2L24-context-forme"
      },
      {
        "type": "choice",
        "q": "Mündlich Teil 3: Dein Partner sagt nur « Oui ». Was zeigt Initiative?",
        "o": [
          "einen eigenen Vorschlag machen und begründen",
          "schweigen und warten",
          "die Prüferin fragen, was sie denkt"
        ],
        "answer": "einen eigenen Vorschlag machen und begründen",
        "explanation": "Bewertet wird, ob du aktiv beiträgst: Fragen, Vorschläge, Begründungen.",
        "tag": "Anwenden",
        "family": "initiative",
        "checkKey": "A2L24-context-initiative"
      },
      {
        "type": "choice",
        "q": "Du hast eine Frage im Gespräch nicht verstanden.",
        "o": [
          "Pardon, vous pouvez répéter, s’il vous plaît ?",
          "Je ne parle pas français.",
          "Je passe à la question suivante."
        ],
        "answer": "Pardon, vous pouvez répéter, s’il vous plaît ?",
        "explanation": "Nachfragen ist erlaubt und zeigt Interaktion.",
        "tag": "Anwenden",
        "family": "repeter",
        "checkKey": "A2L24-context-repeter",
        "audio": "Pardon, vous pouvez répéter, s’il vous plaît ?"
      },
      {
        "type": "choice",
        "q": "Sprachbausteine Teil 2: Jedes Wort aus dem Kasten …",
        "o": [
          "… benutzt man nur einmal.",
          "… kann man mehrmals benutzen.",
          "… muss man übersetzen."
        ],
        "answer": "… benutzt man nur einmal.",
        "explanation": "Vous n’utiliserez un mot qu’une seule fois.",
        "tag": "Anwenden",
        "family": "unefois",
        "checkKey": "A2L24-context-unefois"
      },
      {
        "type": "choice",
        "q": "Du hast 72 Punkte. Welches Ergebnis ist das?",
        "o": [
          "assez bien (bestanden)",
          "bien",
          "nicht bestanden"
        ],
        "answer": "assez bien (bestanden)",
        "explanation": "70–79,5 Punkte = assez bien.",
        "tag": "Anwenden",
        "family": "note",
        "checkKey": "A2L24-context-note"
      }
    ],
    "checkTransfers": [
      {
        "type": "gap",
        "prompt": "Vous entendrez chaque texte deux ___ .",
        "answer": "fois",
        "accept": [],
        "context": "Anweisung im Hörverstehen.",
        "explanation": "Vous entendrez chaque texte deux fois .",
        "audio": "Vous entendrez chaque texte deux fois .",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:fois",
        "checkKey": "A2L24-transfer-fois-0"
      },
      {
        "type": "gap",
        "prompt": "Marquez vos réponses sur la ___ de réponse.",
        "answer": "feuille",
        "accept": [],
        "context": "Wo markierst du die Antworten?",
        "explanation": "Marquez vos réponses sur la feuille de réponse.",
        "audio": "Marquez vos réponses sur la feuille de réponse.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:feuille",
        "checkKey": "A2L24-transfer-feuille-1"
      },
      {
        "type": "gap",
        "prompt": "Décidez si les phrases sont ___ ou fausses. (richtig)",
        "answer": "vraies",
        "accept": [],
        "context": "Ergänze die Anweisung.",
        "explanation": "Décidez si les phrases sont vraies ou fausses.",
        "audio": "Décidez si les phrases sont vraies ou fausses.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:vrai",
        "checkKey": "A2L24-transfer-vrai-2"
      },
      {
        "type": "gap",
        "prompt": "Choisissez trois des six ___ .",
        "answer": "points",
        "accept": [],
        "context": "Anweisung im Brief.",
        "explanation": "Choisissez trois des six points .",
        "audio": "Choisissez trois des six points .",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:points",
        "checkKey": "A2L24-transfer-points-3"
      },
      {
        "type": "gap",
        "prompt": "Mettez-vous d’___ sur deux activités.",
        "answer": "accord",
        "accept": [],
        "context": "Anweisung im mündlichen Teil 3.",
        "explanation": "Mettez-vous d’accord sur deux activités.",
        "audio": "Mettez-vous d’accord sur deux activités.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:accord",
        "checkKey": "A2L24-transfer-accord-4"
      },
      {
        "type": "gap",
        "prompt": "___ des questions à votre partenaire ! (poser)",
        "answer": "Posez",
        "accept": [],
        "context": "Anweisung im mündlichen Teil 2.",
        "explanation": "Posez des questions à votre partenaire !",
        "audio": "Posez des questions à votre partenaire !",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:poser",
        "checkKey": "A2L24-transfer-poser-5"
      },
      {
        "type": "gap",
        "prompt": "Il faut au moins ___ points pour réussir. (Zahl in Worten)",
        "answer": "soixante",
        "accept": [],
        "context": "Wie viele Punkte braucht man zum Bestehen?",
        "explanation": "Il faut au moins soixante points pour réussir.",
        "audio": "Il faut au moins soixante points pour réussir.",
        "marking": {
          "strictAccents": true,
          "format": null,
          "numberWords": false
        },
        "family": "transfer:soixante",
        "checkKey": "A2L24-transfer-soixante-6"
      }
    ]
  }
};
