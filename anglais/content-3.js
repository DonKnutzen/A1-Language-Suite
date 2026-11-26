(() => {
  'use strict';
  const {add,topic}=window.EN_A1_AUTHORING;
  add(13,'Nourriture et courses',
    ['Nommer des aliments et des quantités','Distinguer les noms dénombrables et indénombrables','Utiliser some et any'],
    'food=nourriture;milk=lait;rice=riz;cheese=fromage;meat=viande;fish=poisson;vegetable=légume;potato=pomme de terre;egg=œuf;tomato=tomate;banana=banane;some=du / de la / des / quelques;any=du / des (questions et négations);bottle=bouteille;glass=verre;cup=tasse;kilo=kilo;litre=litre;need=avoir besoin de;buy=acheter;shopping=courses',
    `I need some milk.|J’ai besoin de lait.|J’ai besoin de riz.|J’ai du lait.
Do you have any eggs?|Tu as des œufs ?|Tu as du lait ?|Tu as besoin d’œufs ?
We don't have any rice.|Nous n’avons pas de riz.|Nous n’avons pas besoin de riz.|Nous avons du riz.
Two bottles of water, please.|Deux bouteilles d’eau, s’il vous plaît.|Deux verres d’eau, s’il vous plaît.|Une bouteille d’eau, s’il vous plaît.
A kilo of potatoes.|Un kilo de pommes de terre.|Un kilo de tomates.|Deux kilos de pommes de terre.
I eat fish and vegetables.|Je mange du poisson et des légumes.|Je mange de la viande et des légumes.|J’achète du poisson et des légumes.
There is some cheese.|Il y a du fromage.|Il n’y a pas de fromage.|Il y a de la viande.
There are some tomatoes.|Il y a quelques tomates.|Il y a quelques pommes de terre.|Il n’y a pas de tomates.
A cup of tea.|Une tasse de thé.|Un verre de thé.|Une tasse de café.
I don't eat meat.|Je ne mange pas de viande.|Je ne mange pas de poisson.|Je n’achète pas de viande.`,
    [topic('Dénombrable ou indénombrable','Les noms dénombrables ont un singulier et un pluriel : an egg, two eggs.\n\nMilk, water, rice et bread sont indénombrables dans leur sens alimentaire habituel : pas de a milk ni de two rices. Le français dit « du lait, du riz » ; l’anglais dit some milk, some rice.\n\nPour compter, il faut une unité : a bottle of milk, two cups of tea.\n\nSome milk s’emploie avec is, some eggs avec are.\n\nDevant un nom, no peut vouloir dire « pas de » : no rice = pas de riz.',
      `an egg / two eggs|un œuf / deux œufs
some rice|du riz
two bottles of water|deux bouteilles d’eau`,
      `I need two ___.|eggs|egg|an egg|J’ai besoin de deux œufs.
There ___ some milk.|is|are|am|Il y a du lait.
There ___ some eggs.|are|is|am|Il y a quelques œufs.
Two bottles ___ water.|of|for|at|Deux bouteilles d’eau.
A cup ___ tea.|of|on|in|Une tasse de thé.
I need ___ apple.|an|a|the|J’ai besoin d’une pomme.
We need some ___.|rice|rices|a rice|Nous avons besoin de riz.
Two ___ of milk.|litres|litre|milks|Deux litres de lait.
I need ___ egg.|an|a|the|J’ai besoin d’un œuf.
Three ___ of tea.|cups|cup|cup of tea|Trois tasses de thé.
There ___ some cheese.|is|are|am|Il y a du fromage.
There ___ some bananas.|are|is|am|Il y a quelques bananes.
Four glasses ___ water.|of|at|on|Quatre verres d’eau.
We buy two ___.|tomatoes|a tomato|tomato|Nous achetons deux tomates.
I need a bottle ___ milk.|of|in|on|J’ai besoin d’une bouteille de lait.
She eats some ___.|bread|breads|a bread|Elle mange du pain.`),
    topic('Some et any','Dans une phrase affirmative, on met le plus souvent some. Dans une question neutre et dans une phrase négative, on met le plus souvent any.\n\nCela vaut pour les indénombrables et pour le pluriel : some milk, any eggs. Jamais les deux mots ensemble.\n\nDans les offres et les demandes, some peut aussi apparaître dans une question ; tu verras ces formules polies dans la leçon suivante.\n\nSelon ce qu’on attend, some et any peuvent tous les deux apparaître dans une question. Ici, pour une question explicitement neutre, tu choisis la forme habituelle any ; pour « pas du tout », any aussi.',
      `We have some eggs.|Nous avons quelques œufs.
Do you have any milk?|Tu as du lait ?
We don't have any rice.|Nous n’avons pas de riz.`,
      `We have ___ milk.|some|any|an|Nous avons du lait. Phrase affirmative sur nos provisions.
We don't have ___ milk.|any|some|an|Nous n’avons pas du tout de lait.
Do you have ___ eggs?|any|some|an|Tu as des œufs ? Choisis la forme habituelle pour une question neutre, sans réponse « oui » attendue.
There are ___ tomatoes.|some|any|an|Il y a quelques tomates. Phrase affirmative sur les provisions.
There aren't ___ potatoes.|any|some|an|Il n’y a pas du tout de pommes de terre.
Is there ___ cheese?|any|some|an|Il y a du fromage ? Choisis la forme habituelle pour une question neutre, sans réponse « oui » attendue.
I need ___ rice.|some|any|an|J’ai besoin de riz. Une quantité indéterminée.
He doesn't eat ___ meat.|any|some|an|Il ne mange pas du tout de viande.
Are there ___ bananas?|any|some|an|Il y a des bananes ? Choisis la forme habituelle pour une question neutre, sans réponse « oui » attendue.
She buys ___ vegetables.|some|any|an|Elle achète des légumes. Phrase affirmative sur ses achats.
There is ___ bread.|some|any|an|Il y a du pain. Phrase affirmative sur les provisions.
We don't need ___ water.|any|some|an|Nous n’avons pas du tout besoin d’eau.
Does she have ___ oranges?|any|some|an|Elle a des oranges ? Choisis la forme habituelle pour une question neutre, sans réponse « oui » attendue.
They buy ___ fish.|some|any|an|Ils achètent du poisson à manger. Une quantité indéterminée, pas des animaux entiers.
There isn't ___ tea.|any|some|an|Il n’y a pas du tout de thé.
I have ___ apples.|some|any|an|J’ai quelques pommes. Phrase affirmative sur mes provisions.`)],
    'Écris une liste de courses sous forme de court message. Nomme des aliments, une quantité et quelque chose qui manque.',
    ['Nomme trois aliments.','Donne une quantité avec une unité.','Dis ce qui manque.'],
    "We need some milk, rice and eggs. Please buy two bottles of water and a kilo of potatoes. We don't have any cheese. Do we have any tomatoes?",
    'We need {some|du / de la} milk. There {are|be : pluriel} some eggs, but there {is|be : indénombrable} no rice. We do not have {any|des : négation} tomatoes. Please buy two bottles {of|bouteilles de} water and three {cups|cup : pluriel} of tea. I need {an|un : egg} egg and {some|du : bread} bread.',
    `Tu as besoin de deux bouteilles d’eau.|I need two bottles of water.|I need two glasses of water.|I need a bottle of water.
Tu dis qu’il n’y a pas de riz.|We don't have any rice.|We don't need any rice.|We have some rice.
Tu demandes de façon neutre s’il y a des œufs.|Do you have any eggs?|Do you need any eggs?|Do you have any milk?
Tu demandes un kilo de tomates.|A kilo of tomatoes.|A kilo of potatoes.|Two kilos of tomatoes.`);
  add(14,'Au café et au restaurant',
    ['Commander poliment','Demander une quantité avec how much et how many','Comprendre les prix et l’addition'],
    'would like=voudrais (poli);menu=carte / menu;bill=addition;order=commander;restaurant=restaurant;café=café (lieu);soup=soupe;salad=salade;sandwich=sandwich;chicken=poulet;dessert=dessert;without=sans;with=avec;how much=combien (indénombrable / prix);how many=combien (dénombrable);pound=livre (monnaie);euro=euro;dollar=dollar;cost=coûter;pay=payer;cash=espèces / liquide;lunch=déjeuner',
    `I'd like a coffee, please.|Je voudrais un café, s’il vous plaît.|Je voudrais un thé, s’il vous plaît.|J’aime le café.
Would you like some water?|Tu veux de l’eau ?|Tu bois parfois de l’eau ?|Tu n’as pas besoin d’eau ?
How much is the soup?|Combien coûte la soupe ?|Il y a combien de soupe ?|Combien coûte la salade ?
How many sandwiches do you need?|Tu as besoin de combien de sandwichs ?|Tu as combien de sandwichs ?|Tu as besoin de combien de pain ?
Without meat, please.|Sans viande, s’il vous plaît.|Avec de la viande, s’il vous plaît.|Sans poisson, s’il vous plaît.
The bill, please.|L’addition, s’il vous plaît.|La carte, s’il vous plaît.|La commande, s’il vous plaît.
Can I have the menu, please?|Je peux avoir la carte, s’il vous plaît ?|Je peux avoir l’addition, s’il vous plaît ?|Je peux commander, s’il vous plaît ?
It is twelve pounds.|Ça coûte douze livres.|Ça coûte vingt livres.|Ça coûte douze euros.
I'd like some soup.|Je voudrais de la soupe.|J’aime la soupe.|Je voudrais de la salade.
Can I pay by card?|Je peux payer par carte ?|Je peux payer en espèces ?|Je peux payer plus tard ?`,
    [topic('Would like pour exprimer un souhait','I would like ou I’d like veut dire « je voudrais ».\n\nC’est une façon polie de commander.\n\nI like, en revanche, exprime un goût général : j’aime.\n\nWould reste identique pour toutes les personnes.\n\nLes questions commencent par Would : Would you like …?\n\nDans une offre, on utilise souvent some : Would you like some tea?',
      `I'd like a sandwich, please.|Je voudrais un sandwich, s’il vous plaît.
I like sandwiches.|J’aime les sandwichs en général.
Would you like some tea?|Tu veux du thé ?`,
      `I ___ like a coffee.|would|am|do|Je voudrais un café.
She would ___ a salad.|like|likes|to like|Elle voudrait une salade.
___ you like some tea?|Would|Do|Are|Tu veux du thé ? Offre polie.
I'd ___ some soup.|like|likes|to like|Je voudrais de la soupe.
He ___ like a sandwich.|would|does|is would|Il voudrait un sandwich.
I ___ tea.|like|would like|am like|J’aime le thé en général.
We ___ like the bill, please.|would|are|do|Nous voudrions l’addition.
Would she ___ some water?|like|likes|to like|Elle veut de l’eau ?
I ___ like meat in my soup.|wouldn't|don't would|am not would|Je ne voudrais pas de viande dans ma soupe. Wouldn't = would not.
They would ___ two coffees.|like|likes|to like|Ils voudraient deux cafés. Ici : deux tasses de café.
Mia ___ like a dessert.|would|does|is|Mia voudrait un dessert.
___ you like a sandwich?|Would|Are|Have|Tu veux un sandwich ? Offre polie.
Leo would ___ some rice.|like|likes|to like|Leo voudrait du riz.
I ___ coffee.|like|would like|am like|J’aime le café en général.
We'd ___ the menu, please.|like|likes|to like|Nous voudrions la carte.
Would your friends ___ some soup?|like|likes|to like|Tes amis veulent de la soupe ?`),
    topic('How much et how many','Le français dit toujours « combien » ; l’anglais distingue. How many se place devant un pluriel dénombrable : How many eggs?\n\nHow much se place devant un nom indénombrable : How much water?\n\nPour les prix : How much is it? / How much are they?\n\nAu café, two coffees veut dire deux tasses de café.\n\nCard = carte ; cash = espèces. By card = par carte, in cash = en espèces.\n\nWouldn’t like veut dire « ne voudrait pas » ; la négation va avec would.',
      `How many sandwiches?|Combien de sandwichs ?
How much water?|Combien d’eau ?
How much is the salad?|Combien coûte la salade ?`,
      `How ___ sandwiches do you need?|many|much|any|Tu as besoin de combien de sandwichs ?
How ___ water do you drink?|much|many|some|Tu bois combien d’eau ?
How ___ is the soup?|much|many|any|Combien coûte la soupe ?
How much ___ the sandwich?|is|are|do|Combien coûte le sandwich ?
How much ___ the two salads?|are|is|does|Combien coûtent les deux salades ?
How ___ eggs do we need?|many|much|some|Nous avons besoin de combien d’œufs ?
How ___ rice is there?|much|many|any|Il y a combien de riz ?
How ___ cups do you need?|many|much|any|Tu as besoin de combien de tasses ?
How ___ milk is there?|much|many|some|Il y a combien de lait ?
How much ___ it cost?|does|do|is|Combien ça coûte ?
How ___ bottles do we need?|many|much|any|Nous avons besoin de combien de bouteilles ?
How ___ cheese do you want?|much|many|some|Tu veux combien de fromage ? Want = vouloir.
How much ___ the desserts?|are|is|does|Combien coûtent les desserts ?
How ___ bread is there?|much|many|any|Il y a combien de pain ?
How ___ tomatoes does she need?|many|much|some|Elle a besoin de combien de tomates ?
How much ___ the sandwich cost?|does|do|is|Combien coûte le sandwich ?`)],
    'Commande un plat et une boisson. Exprime un souhait et demande le prix ou l’addition.',
    ['Commande avec would like.','Exprime un souhait avec with ou without.','Demande le prix ou l’addition.'],
    "Hello! I'd like some soup without meat and a sandwich, please. I'd also like a glass of water. How much is the soup? Can I pay by card?",
    'I {would|souhait poli} like a sandwich. My friend would {like|forme de base} some soup. How {much|prix} is the soup? How {many|pluriel dénombrable} sandwiches do we need? We would like two glasses {of|verres de} water. The soup is {without|sans} meat. Can I {pay|payer} by card? The {bill|addition}, please.',
    `Tu commandes poliment un thé.|I'd like a tea, please.|I like tea.|Would you like a tea?
Tu veux l’addition.|The bill, please.|The menu, please.|The soup, please.
Tu demandes le prix de deux salades.|How much are the two salads?|How many salads are there?|How much is one salad?
Tu veux une soupe sans viande.|I'd like soup without meat.|I'd like soup with meat.|I'd like soup without fish.`);
  add(15,'Les vêtements et les comparaisons',
    ['Demander la taille et le prix','Former le comparatif des adjectifs courts','Utiliser more et les comparatifs irréguliers'],
    'clothes=vêtements;trousers=pantalon;shoes=chaussures;coat=manteau;jacket=veste;dress=robe;size=taille;cheap=bon marché / pas cher;expensive=cher;long=long;short=court;warm=chaud;cold=froid;good=bon;bad=mauvais;better=meilleur / mieux;worse=pire / moins bon;than=que (comparaison);try on=essayer (un vêtement);cash=espèces / liquide',
    `Do you have this in size ten?|Vous avez ça en taille dix ?|Vous avez ça en taille douze ?|Vous en avez dix ?
Can I try this on?|Je peux l’essayer ?|Je peux l’acheter ?|Je peux le rapporter ?
This coat is cheaper.|Ce manteau est moins cher.|Ce manteau est plus cher.|Cette veste est moins chère.
Those shoes are more expensive.|Ces chaussures-là sont plus chères.|Ces chaussures-là sont moins chères.|Cette chaussure-ci est plus chère.
This jacket is warmer than that one.|Cette veste-ci est plus chaude que celle-là.|Cette veste-ci est plus froide que celle-là.|Ce manteau-ci est plus chaud que celui-là.
The blue shirt is smaller.|La chemise bleue est plus petite.|La chemise bleue est plus grande.|La chemise verte est plus petite.
This size is better.|Cette taille est meilleure.|Cette taille est moins bonne.|Cette couleur est meilleure.
It is too big.|C’est trop grand.|C’est trop petit.|C’est assez grand.
I'd like the smaller one.|Je voudrais le plus petit.|Je voudrais le plus grand.|Je voudrais le moins cher.
I can pay in cash.|Je peux payer en espèces.|Je peux payer par carte.|Je ne peux pas payer en espèces.`,
    [topic('Adjectifs courts : -er et than','Pour comparer, un adjectif court prend le plus souvent -er : small → smaller, cheap → cheaper. Le français dit « plus petit » ; l’anglais ajoute une terminaison.\n\nAprès un e final, seulement -r : large → larger.\n\nAprès une voyelle courte accentuée + consonne finale, la consonne est souvent doublée : big → bigger.\n\nConsonne + y devient -ier : happy → happier.\n\nThan veut dire « que ». Pas de more avec -er.',
      `This bag is smaller than that bag.|Ce sac-ci est plus petit que celui-là.
The red coat is cheaper.|Le manteau rouge est moins cher.
This room is bigger.|Cette pièce est plus grande.`,
      `This bag is ___ than that bag.|smaller|small|more small|Ce sac-ci est plus petit que celui-là.
The red coat is ___.|cheaper|cheap|more cheap|Le manteau rouge est moins cher.
This room is ___.|bigger|big|more big|Cette pièce est plus grande.
The jacket is ___ than the shirt.|warmer|warm|more warm|La veste est plus chaude que la chemise.
This dress is ___.|longer|long|more long|Cette robe est plus longue.
These trousers are ___.|shorter|short|more short|Ce pantalon est plus court.
This room is larger ___ that room.|than|then|as|Cette pièce-ci est plus grande que cette pièce-là.
The water is ___.|colder|cold|more cold|L’eau est plus froide.
This house is ___.|older|old|more old|Cette maison est plus vieille.
The shirt is ___.|newer|new|more new|La chemise est plus neuve.
This chair is ___ than that chair.|smaller|small|more small|Cette chaise-ci est plus petite que celle-là.
The blue bag is ___.|bigger|big|more big|Le sac bleu est plus grand.
These shoes are ___.|cheaper|cheap|more cheap|Ces chaussures sont moins chères.
This coat is ___ than my coat.|warmer|warm|more warm|Ce manteau est plus chaud que mon manteau.
Her jacket is ___.|longer|long|more long|Sa veste (à elle) est plus longue.
This phone is newer ___ my phone.|than|then|as|Ce téléphone est plus récent que mon téléphone.`),
    topic('More, better et worse','Les adjectifs plus longs forment le plus souvent le comparatif avec more : expensive → more expensive.\n\nGood devient better, bad devient worse. C’est comme « bon → meilleur » en français.\n\nNe combine pas ces formes avec more.\n\nToo veut dire « trop » : too big = trop grand.\n\nOne peut remplacer un nom déjà mentionné : the smaller one = le plus petit (de ceux-là).\n\nOurs s’emploie sans nom après lui pour dire « le nôtre / les nôtres » : our coats → ours.',
      `This coat is more expensive.|Ce manteau est plus cher.
This size is better.|Cette taille est meilleure.
I'd like the smaller one.|Je voudrais le plus petit.`,
      `This coat is ___ expensive.|more|most|very more|Ce manteau est plus cher.
This size is ___.|better|good|more good|Cette taille est meilleure.
That phone is ___.|worse|bad|more bad|Ce téléphone-là est moins bon.
These shoes are ___ expensive than those.|more|most|expensive|Ces chaussures-ci sont plus chères que celles-là.
This coat is ___ big.|too|two|to|Ce manteau est trop grand.
I'd like the smaller ___.|one|ones|a|Je voudrais le plus petit.
The blue shirt is ___ than the red shirt.|better|good|more better|La chemise bleue est meilleure que la rouge.
This jacket is more expensive ___ that coat.|than|then|as|Cette veste est plus chère que ce manteau-là.
These trousers are ___ short.|too|to|two|Ce pantalon est trop court.
That bag is ___ than this bag.|worse|more worse|bad|Ce sac-là est moins bon que celui-ci.
Her dress is ___ expensive.|more|most|expensive|Sa robe (à elle) est plus chère.
These shoes are ___ than my shoes.|better|more better|good|Ces chaussures sont meilleures que les miennes.
This size is ___ small.|too|to|two|Cette taille est trop petite.
The red phone is ___.|worse|more worse|bad|Le téléphone rouge est moins bon.
I'd like the cheaper ___.|one|ones|a|Je voudrais le moins cher.
Their coats are more expensive ___ ours.|than|then|as|Leurs manteaux sont plus chers que les nôtres. Ours = les nôtres.`)],
    'Compare deux vêtements. Dis la taille ou la couleur et demande le prix ou si tu peux essayer.',
    ['Nomme les vêtements souhaités.','Formule une comparaison.','Demande le prix ou si tu peux essayer.'],
    "I'd like a blue jacket in size ten. This jacket is warmer than the red jacket, but it is more expensive. Can I try it on? How much is it?",
    'This coat is {cheaper|cheap : comparatif} than that coat. The blue jacket is {warmer|warm : comparatif}. These shoes are {more|comparatif devant expensive} expensive. This size is {better|good : comparatif}. That shirt is {too|trop} small. I would like the smaller {one|celui-là}. This bag is bigger {than|que} my bag. That phone is {worse|bad : comparatif}.',
    `Tu veux essayer une veste.|Can I try this jacket on?|Can I buy this jacket?|Can I wash this jacket?
Tu veux les chaussures les moins chères.|I'd like the cheaper shoes.|I'd like the more expensive shoes.|I'd like the smaller shoes.
Tu demandes la taille douze.|Do you have this in size twelve?|Do you have twelve of these?|Do you have this in size twenty?
Tu dis que le manteau est trop petit.|This coat is too small.|This coat is smaller.|This coat is too big.`);
  add(16,'En route : chemins et transports',
    ['Indiquer un chemin simple','Donner des consignes et des interdictions','Comprendre les moyens de transport et les arrêts'],
    'station=gare;stop=arrêt;train=train;bus=bus;airport=aéroport;platform=quai;street=rue;left=gauche;right=droite;straight on=tout droit;turn=tourner;cross=traverser;road=route / rue;traffic lights=feux (de circulation);next=prochain;first=premier;second=deuxième;third=troisième;on foot=à pied;by bus=en bus;taxi=taxi',
    `Go straight on.|Va tout droit.|Tourne à gauche.|Tourne à droite.
Turn left at the traffic lights.|Tourne à gauche aux feux.|Tourne à droite aux feux.|Retourne jusqu’aux feux.
Don't cross here.|Ne traverse pas ici.|Traverse ici.|N’attends pas ici.
Take bus eight.|Prends le bus huit.|Prends le bus dix-huit.|Prends le bus trois.
The train leaves at ten.|Le train part à dix heures.|Le train arrive à dix heures.|Le bus part à dix heures.
Which platform?|Quel quai ?|Quel arrêt ?|Quelle rue ?
The station is on the right.|La gare est à droite.|La gare est à gauche.|L’arrêt est à droite.
I go to work on foot.|Je vais au travail à pied.|Je vais au travail en bus.|Je vais au travail en train.
Get off at the next stop.|Descends au prochain arrêt.|Monte au premier arrêt.|Attends au prochain arrêt.
Is this bus for the airport?|Ce bus va à l’aéroport ?|Ce bus va à la gare ?|C’est l’aéroport ?`,
    [topic('Consignes et interdictions','Pour donner une consigne, on utilise la forme de base sans sujet : Go straight on. C’est l’impératif.\n\nUne interdiction commence par don’t : Don’t cross here.\n\nTu connais déjà cette forme de base dans des demandes figées comme Repeat, please.\n\nPlease rend la consigne plus polie.\n\nLet’s + forme de base propose de faire quelque chose ensemble : Let’s take the bus. = Prenons le bus.\n\nGet on = monter (dans un véhicule), get off = descendre.',
      `Turn right, please.|Tourne à droite, s’il te plaît.
Don't cross here.|Ne traverse pas ici.
Let's take the train.|Prenons le train.`,
      `___ straight on.|Go|Goes|Going|Va tout droit.
___ left.|Turn|Turns|To turn|Tourne à gauche.
___ cross here.|Don't|Doesn't|Not|Ne traverse pas ici.
___ bus eight.|Take|Takes|Taking|Prends le bus huit.
___ at the station, please.|Wait|Waits|To wait|Attends à la gare, s’il te plaît.
Let's ___ the train.|take|takes|to take|Prenons le train.
Don't ___ here.|sit|sits|to sit|Ne t’assieds pas ici.
___ off at the next stop.|Get|Gets|To get|Descends au prochain arrêt.
Don't ___ left.|turn|turns|to turn|Ne tourne pas à gauche.
Let's ___ on foot.|go|goes|to go|Allons-y à pied.
___ right at the station.|Turn|Turns|To turn|Tourne à droite à la gare.
Don't ___ the road here.|cross|crosses|to cross|Ne traverse pas la rue ici.
___ the next bus.|Take|Takes|To take|Prends le prochain bus.
Let's ___ here.|wait|waits|to wait|Attendons ici.
___ on at this stop.|Get|Gets|To get|Monte à cet arrêt.
Don't ___ the door.|open|opens|to open|N’ouvre pas la porte.`),
    topic('Lieu, direction et moyens de transport','To indique une destination : go to the station.\n\nAt indique un lieu : wait at the station. En français, « à la gare » couvre les deux ; en anglais, il faut choisir.\n\nLes moyens de transport se disent souvent avec by sans article : by bus, by train ; à pied se dit on foot.\n\nPour les quais : from platform three.\n\nFirst/second/third indiquent l’ordre. Which demande un choix : « quel », « quelle », « lequel ».',
      `I go to work by bus.|Je vais au travail en bus.
Wait at the station.|Attends à la gare.
The train leaves from platform three.|Le train part du quai trois.`,
      `I go to work ___ bus.|by|on|at|Je vais au travail en bus.
We go ___ foot.|on|by|in|Nous y allons à pied.
Go ___ the station.|to|at|on|Va à la gare.
Wait ___ the station.|at|to|by|Attends à la gare.
The train leaves ___ platform three.|from|to|on|Le train part du quai trois.
The shop is on the ___.|right|straight|third|Le magasin est à droite.
Take the ___ street on the left.|second|two|twice|Prends la deuxième rue à gauche.
I go ___ train.|by|on|at|J’y vais en train.
___ platform is it?|Which|Who|Why|C’est quel quai ?
Turn right ___ the traffic lights.|at|to|by|Tourne à droite aux feux.
She goes to school ___ bus.|by|on|at|Elle va à l’école en bus.
They go to the shop ___ foot.|on|by|in|Ils vont au magasin à pied.
Come ___ the airport.|to|at|on|Viens à l’aéroport.
We are ___ the bus stop.|at|to|by|Nous sommes à l’arrêt de bus.
The train leaves ___ platform five.|from|to|on|Le train part du quai cinq.
Take the ___ street on the right.|third|three|thirty|Prends la troisième rue à droite.`)],
    'Explique le chemin de la gare à un lieu de rendez-vous. Donne deux indications de direction et un numéro de bus ou un temps de marche.',
    ['Nomme le lieu de rendez-vous.','Donne deux consignes dans l’ordre.','Nomme le moyen de transport ou le temps de marche.'],
    'The café is near the station. Go straight on and turn left at the traffic lights. The café is on the right. You can take bus eight or go on foot.',
    '{Go|aller : impératif} straight on. {Turn|tourner : impératif} left at the traffic lights. Do not {cross|traverser, forme de base} here. {Take|prendre : impératif} bus eight. Get {off|descendre : get …} at the next stop. We go {to|vers la destination} the station. We can go {by|en bus} bus or {on|à pied} foot.',
    `Tu dis : deuxième rue à droite.|Take the second street on the right.|Take the third street on the right.|Take the second street on the left.
Tu veux connaître le numéro du quai.|Which platform?|Which bus stop?|What time?
Tu dis à quelqu’un où descendre.|Get off at the next stop.|Get on at the next stop.|Wait at the next stop.
Tu décris un trajet à pied.|Go on foot.|Go by bus.|Go by train.`);
  add(17,'Qu’est-ce qui se passe en ce moment ?',
    ['Décrire des actions en cours','Former le présent continu avec be + -ing','Poser des questions et dire non sur une action en cours'],
    'now=maintenant;at the moment=en ce moment;write=écrire;make=faire / préparer;run=courir;wear=porter (des vêtements);talk=parler;wait for=attendre;look at=regarder;send=envoyer;message=message;email=e-mail;picture=image / photo;phone call=appel téléphonique;clean=nettoyer;rain=pleuvoir;outside=dehors;inside=dedans / à l’intérieur;busy=occupé;right now=tout de suite / à l’instant même',
    `I am writing a message.|Je suis en train d’écrire un message.|Je suis en train de lire un message.|J’écris des messages tous les jours.
She is making dinner.|Elle est en train de préparer le dîner.|Elle est en train de dîner.|Elle prépare toujours le dîner.
They are waiting for the bus.|Ils sont en train d’attendre le bus.|Ils sont en train de prendre le bus.|Ils sont en train d’attendre le train.
He is wearing a blue shirt.|Il porte une chemise bleue en ce moment.|Il porte une chemise verte en ce moment.|Il est en train d’acheter une chemise bleue.
Are you working now?|Tu es en train de travailler ?|Tu travailles tous les jours ?|Elle est en train de travailler ?
I am not watching television.|Je ne suis pas en train de regarder la télévision.|Je ne regarde jamais la télévision.|Je n’ai pas de télévision.
What are you doing?|Qu’est-ce que tu es en train de faire ?|Qu’est-ce que tu fais d’habitude ?|Où es-tu en ce moment ?
We are cleaning the kitchen.|Nous sommes en train de nettoyer la cuisine.|Nous sommes en train de nettoyer la salle de bains.|Nous sommes en train de cuisiner dans la cuisine.
It is raining.|Il pleut en ce moment.|Il fait froid.|Il pleut souvent.
She is talking on the phone.|Elle est au téléphone en ce moment.|Elle est en train d’écrire sur son téléphone.|Elle est en train d’écouter de la musique.`,
    [topic('Be + verbe en -ing','Le présent continu décrit ce qui se passe en ce moment. En français, on dit « je suis en train de … » ; en anglais, cette forme est très fréquente.\n\nIl faut am/is/are + -ing : I am working.\n\nUn e final tombe en général : write → writing, make → making.\n\nAvec run et sit, la dernière consonne est doublée : running, sitting.\n\nNe confonds pas avec une habitude au présent simple.',
      `I am working now.|Je suis en train de travailler.
She is writing a message.|Elle est en train d’écrire un message.
They are running.|Ils sont en train de courir.`,
      `I ___ writing a message.|am|is|are|Je suis en train d’écrire un message.
She ___ making dinner.|is|am|are|Elle est en train de préparer le dîner.
They ___ waiting for the bus.|are|is|am|Ils sont en train d’attendre le bus.
He is ___.|running|run|runs|Il est en train de courir.
We are ___.|sitting|sit|sits|Nous sommes assis en ce moment.
Anna is ___ an email.|writing|write|writes|Anna est en train d’écrire un e-mail.
Ben is ___ dinner.|making|make|makes|Ben est en train de préparer le dîner.
You ___ wearing a blue shirt.|are|am|is|Tu portes une chemise bleue en ce moment.
It ___ raining.|is|are|am|Il pleut en ce moment.
We are ___ the kitchen.|cleaning|clean|cleans|Nous sommes en train de nettoyer la cuisine.
Mia ___ talking on the phone.|is|are|am|Mia est au téléphone en ce moment.
Leo and I ___ reading.|are|is|am|Leo et moi sommes en train de lire.
My sister is ___ outside.|running|run|runs|Ma sœur est en train de courir dehors.
They are ___ a message.|sending|send|sends|Ils sont en train d’envoyer un message.
He is ___ at the picture.|looking|look|looks|Il est en train de regarder l’image.
I ___ waiting at the station.|am|are|is|Je suis en train d’attendre à la gare.`),
    topic('Questions et négations au présent continu','Dans une question, be se place devant le sujet : Are you working?\n\nLe verbe garde -ing.\n\nPour dire non, not se place après be : She isn’t working.\n\nOn n’utilise pas do/does ici.\n\nSwim double aussi la consonne finale : swimming.\n\nWhat are you doing? demande ce que la personne est en train de faire.',
      `Are you waiting?|Tu es en train d’attendre ?
She isn't working now.|Elle n’est pas en train de travailler.
What are they doing?|Qu’est-ce qu’ils sont en train de faire ?`,
      `___ you working now?|Are|Do|Does|Tu es en train de travailler ?
___ she writing?|Is|Does|Do|Elle est en train d’écrire ?
What ___ they doing?|are|do|does|Qu’est-ce qu’ils sont en train de faire ?
He ___ not watching television.|is|does|do|Il n’est pas en train de regarder la télévision.
We ___ not waiting for the train.|are|do|does|Nous ne sommes pas en train d’attendre le train.
Is Anna ___ dinner?|making|make|makes|Anna est en train de préparer le dîner ?
Are they ___ the kitchen?|cleaning|clean|cleans|Ils sont en train de nettoyer la cuisine ?
Is he reading? Yes, he ___.|is|does|are|Oui, il est en train de lire.
Are you working? No, I ___ not.|am|do|are|Non, je ne suis pas en train de travailler.
She ___ wearing a coat.|isn't|doesn't|don't|Elle ne porte pas de manteau en ce moment.
___ Leo talking on the phone?|Is|Does|Do|Leo est au téléphone en ce moment ?
What ___ Mia writing?|is|does|do|Qu’est-ce que Mia est en train d’écrire ?
They ___ not running.|are|do|does|Ils ne sont pas en train de courir.
Are we waiting here? Yes, we ___.|are|do|is|Oui, nous sommes en train d’attendre ici.
Is she swimming? No, she ___.|isn't|doesn't|don't|Non, elle n’est pas en train de nager.
Why ___ you sitting here?|are|do|does|Pourquoi es-tu assis ici en ce moment ?`)],
    'Décris ce que toi et deux autres personnes êtes en train de faire. Pose une question sur une action en cours.',
    ['Décris ce que tu es en train de faire.','Décris deux autres personnes.','Pose une question avec be + -ing.'],
    'I am waiting for the bus. Anna is writing a message. Ben is talking on the phone. We are not working now. What are you doing? Are you coming here?',
    'I {am|be : I} waiting for the bus. Anna {is|be : she} writing a message. Ben and Tom {are|be : they} talking. My sister is {making|make : -ing} dinner. I am not {watching|watch : -ing} television. {Are|question : you} you working? What is Emma {doing|do : -ing}? She is {running|run : -ing} in the park.',
    `Tu demandes ce que quelqu’un est en train de faire.|What are you doing?|What do you do on Sunday?|Where do you work?
Ben est au téléphone en ce moment.|Ben is talking on the phone.|Ben talks on the phone every day.|Ben is writing a message.
Tu es en train d’attendre le train.|I am waiting for the train.|I am waiting for the bus.|I wait for the train every day.
Tu dis qu’Anna n’est pas en train de travailler.|Anna isn't working now.|Anna doesn't work on Monday.|Anna isn't at work every day.`);
  add(18,'Habitude ou en ce moment ?',
    ['Distinguer le présent simple et le présent continu','Se servir des indications de temps','Utiliser simplement like, want et need'],
    'usually=d’habitude;every morning=tous les matins;right now=à l’instant même;at the moment=en ce moment;want=vouloir;need=avoir besoin de;know=savoir / connaître;understand=comprendre;believe=croire;remember=se souvenir;prefer=préférer;different=différent;same=même / pareil;each=chaque;this week=cette semaine;every week=chaque semaine;break=pause;tonight=ce soir;normally=normalement;again=encore une fois',
    `I usually work at home.|D’habitude, je travaille à la maison.|En ce moment, je travaille à la maison.|Je ne travaille jamais à la maison.
Today I am working in the office.|Aujourd’hui, je travaille au bureau.|Aujourd’hui, je ne travaille pas au bureau.|Je travaille au bureau tous les jours.
She drinks tea every morning.|Elle boit du thé tous les matins.|Elle est en train de boire du thé.|Elle boit du thé tous les soirs.
She is drinking coffee now.|Elle est en train de boire du café.|Elle boit toujours du café.|Elle est en train de boire du thé.
I like this book.|J’aime ce livre.|Je suis en train de lire ce livre.|J’ai besoin de ce livre.
I don't understand.|Je ne comprends pas.|Je ne sais pas.|Je ne me souviens pas.
Do you know her name?|Tu connais son nom (à elle) ?|Tu connais son nom (à lui) ?|Tu comprends son nom (à elle) ?
We need a break.|Nous avons besoin d’une pause.|Nous sommes en train de faire une pause.|Nous ne voulons pas de pause.
What do you want?|Qu’est-ce que tu veux ?|De quoi as-tu besoin ?|Qu’est-ce que tu sais ?
He is wearing a coat today.|Il porte un manteau aujourd’hui.|Il porte toujours un manteau.|Il achète un manteau aujourd’hui.`,
    [topic('Habitude et action en cours','Le présent simple décrit des habitudes : every day, usually, often.\n\nLe présent continu décrit des actions en cours ou temporaires : now, at the moment.\n\nEn français, « je travaille » peut vouloir dire les deux ; en anglais, il faut choisir.\n\nUne indication de temps seule n’est pas une règle rigide ; lis la situation.\n\nI work here = je travaille ici (en général) ; I am working = je suis en train de travailler.',
      `I read every evening.|Je lis tous les soirs.
I am reading now.|Je suis en train de lire.
She usually walks, but today she is taking the bus.|D’habitude, elle marche, mais aujourd’hui elle prend le bus.`,
      `I ___ at home every day.|work|am working|working|Mon travail habituel, chaque jour, se fait à la maison.
I ___ in the office right now.|am working|work|works|Je suis en train de travailler au bureau, à l’instant même.
She ___ tea every morning.|drinks|is drinking|drink|C’est son habitude quotidienne.
She ___ coffee at the moment.|is drinking|drinks|drink|Elle est en train de boire un café, à l’instant même.
They ___ on Sundays.|swim|are swimming|swims|C’est leur activité régulière du dimanche.
They ___ in the park now.|are running|run|runs|Ils sont en train de courir, à l’instant même.
He usually ___ to work.|walks|is walking|walk|C’est son trajet habituel pour aller au travail.
He ___ the bus right now.|is taking|takes|take|Il est en train de prendre le bus.
We ___ books every evening.|read|are reading|reads|C’est notre activité régulière du soir.
We ___ television at the moment.|are watching|watch|watches|Nous sommes en train de regarder la télévision.
Mia ___ in a shop every Saturday.|works|is working|work|C’est le travail régulier de Mia le samedi.
Leo ___ dinner right now.|is making|makes|make|Leo est en train de préparer le dîner.
My parents usually ___ tea.|drink|are drinking|drinks|C’est leur habitude normale.
Our daughter ___ an email now.|is writing|writes|write|Elle est en train d’écrire, à l’instant même.
Ben often ___ his friends.|visits|is visiting|visit|Ben rend régulièrement visite à ses amis.
Anna ___ for the train at the moment.|is waiting|waits|wait|Anna est en train d’attendre le train.`),
    topic('États : like, know, want et need','Certains verbes fréquents décrivent des états, des souhaits ou des connaissances.\n\nDans leur sens courant au niveau A1, tu les utilises le plus souvent au présent simple : I like it, I know, I want water, I need help.\n\nMême si le besoin existe maintenant : I need help, et non I am needing help.\n\nHe/she/it garde le -s ; les questions et les négations utilisent do/does.\n\nHim est la forme complément de he : help him = l’aider.\n\nNeed to help veut dire « devoir aider » ; need help veut dire « avoir besoin d’aide ».',
      `I need help now.|J’ai besoin d’aide maintenant.
She knows my name.|Elle connaît mon nom.
Do you understand?|Tu comprends ?`,
      `I ___ this book.|like|am liking|likes|J’aime ce livre.
She ___ your name.|knows|is knowing|know|Elle connaît ton nom.
I ___ some water now.|want|am wanting|wants|Je veux de l’eau maintenant.
We ___ help.|need|are needing|needs|Nous avons besoin d’aide.
___ you understand?|Do|Are|Does|Tu comprends ?
He ___ know her name.|doesn't|isn't|don't|Il ne connaît pas son nom (à elle).
She ___ a break.|needs|is needing|need|Elle a besoin d’une pause.
I ___ remember.|don't|am not|doesn't|Je ne me souviens pas.
___ she like coffee?|Does|Is|Do|Elle aime le café ?
They ___ tea.|prefer|are preferring|prefers|Ils préfèrent le thé.
Mia ___ this colour.|likes|is liking|like|Mia aime cette couleur.
Leo ___ a new phone.|wants|is wanting|want|Leo veut un nouveau téléphone.
We ___ the question.|understand|are understanding|understands|Nous comprenons la question.
Does your sister ___ his name?|know|knows|knowing|Ta sœur connaît son nom (à lui) ?
I ___ a ticket now.|need|am needing|needs|J’ai besoin d’un billet maintenant.
They ___ want coffee.|don't|aren't|doesn't|Ils ne veulent pas de café.`)],
    'Compare ton quotidien habituel avec ce que tu es en train de faire. Dis aussi un souhait ou un besoin.',
    ['Dis une habitude normale.','Décris une action en cours.','Dis ce dont tu as besoin ou ce que tu veux.'],
    'I usually work at home, but today I am working in the office. I drink tea every morning. Right now I am drinking water. I need a break. What are you doing?',
    'I usually {work|travailler, habitude} at home. Today I {am|be : I} working in an office. Anna {drinks|boire : she, habitude} tea every morning. She is {drinking|drink : -ing} coffee now. I {like|aimer, état} coffee. We {need|avoir besoin, état} a break. Ben {knows|savoir : he} my name. Do you {understand|comprendre, forme de base}?',
    `Tu demandes une activité régulière.|What do you do on Sundays?|What are you doing now?|Where are you right now?
Tu as besoin d’aide maintenant.|I need help now.|I am helping now.|I need to help him now.
Tu décris ta boisson habituelle.|I usually drink tea.|I am drinking tea now.|I don't drink tea.
Tu décris ce que Ben est en train de faire.|Ben is writing an email now.|Ben writes emails every day.|Ben reads emails every day.`);
})();
