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
          "habite"
        ],
        "context": "Ich spreche Deutsch und Englisch.",
        "tag": "Sprachen",
        "explanation": "Je parle allemand et anglais. = Ich spreche Deutsch und Englisch."
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
          "bien"
        ],
        "context": "Dieses Viertel ist besser für Kinder.",
        "tag": "meilleur",
        "explanation": "Bon → meilleur: Plus bon gibt es nicht."
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
          "Votre appartement coûte combien de pièces ?",
          "Vous avez combien d’étages dans la pièce ?"
        ],
        "answer": "Votre appartement a combien de pièces ?",
        "explanation": "Nach der Zahl der Zimmer fragt combien de pièces.",
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
          "fais"
        ],
        "context": "Ich brauche zwanzig Minuten.",
        "tag": "mettre",
        "explanation": "Mettre + Dauer: Je mets vingt minutes."
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
          "Je prends le travail à vélo."
        ],
        "answer": "Je vais au travail à vélo.",
        "explanation": "À vélo = mit dem Fahrrad.",
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
        "context": "Ich werde es ihnen morgen sagen.",
        "tag": "leur",
        "explanation": "Je vais leur dire demain. = Ich werde es ihnen morgen sagen."
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
          "Bravo"
        ],
        "context": "Hallo, guten Tag! Hier ist Julie.",
        "tag": "Telefon",
        "explanation": "Allô, bonjour ! C’est Julie. = Hallo, guten Tag! Hier ist Julie."
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
        "q": "« Désolé, Monique est sortie. Vous voulez qu’elle vous rappelle ? » Was bietet der Mann an?",
        "o": [
          "Monique ruft zurück.",
          "Er gibt dir Moniques Handynummer.",
          "Du sollst morgen wieder anrufen."
        ],
        "answer": "Monique ruft zurück.",
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
        "prompt": "Hier, j’___ acheté des fruits.",
        "answer": "ai",
        "o": [
          "ai",
          "suis",
          "as"
        ],
        "context": "Gestern habe ich Obst gekauft.",
        "tag": "avoir",
        "explanation": "Hier, j’ai acheté des fruits. = Gestern habe ich Obst gekauft."
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
          "vé",
          "voi"
        ],
        "context": "Ich habe deine Nachricht nicht gesehen.",
        "tag": "Partizip",
        "explanation": "Voir → vu."
      },
      {
        "type": "gap",
        "unit": "u1",
        "prompt": "Je ___ allé au cinéma.",
        "answer": "suis",
        "o": [
          "suis",
          "ai",
          "vais"
        ],
        "context": "Ich bin ins Kino gegangen.",
        "tag": "être",
        "explanation": "Je suis allé au cinéma. = Ich bin ins Kino gegangen."
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
        "q": "Du hast gestern keinen Fernseher geschaut.",
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
          "a fait"
        ],
        "context": "Es war sehr heiß.",
        "tag": "imparfait",
        "explanation": "Il faisait très chaud. = Es war sehr heiß."
      },
      {
        "type": "gap",
        "unit": "u0",
        "prompt": "J’___ une petite chambre. (avoir)",
        "answer": "avais",
        "o": [
          "avais",
          "avait",
          "ai eu"
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
        "prompt": "J’étais fatigué, alors je ___ rentré.",
        "answer": "suis",
        "o": [
          "suis",
          "étais",
          "ai"
        ],
        "context": "Ich war müde, also bin ich zurückgegangen.",
        "tag": "Ereignis",
        "explanation": "J’étais fatigué, alors je suis rentré. = Ich war müde, also bin ich zurückgegangen."
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
          "Il m’a bien plu de pleuvoir.",
          "Ça m’a bien plaisé."
        ],
        "answer": "Ça m’a bien plu.",
        "explanation": "Plaire → plu.",
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
        "prompt": "Chaque jour, je ___ à la plage. (aller, imparfait)",
        "answer": "allais",
        "accept": [],
        "context": "Jeden Tag gingst du an den Strand.",
        "explanation": "Chaque jour, je allais à la plage.",
        "audio": "Chaque jour, je allais à la plage.",
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
  }
};
