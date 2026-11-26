(() => {
  'use strict';
  const {add,topic}=window.EN_A1_AUTHORING;
  add(7,'Questions sur le quotidien',
    ['Poser des questions sur les habitudes avec do et does','Dire non avec don’t et doesn’t','Donner des réponses courtes'],
    'do=auxiliaire des questions / faire;does=do avec he / she / it;don’t=do not;doesn’t=does not;when=quand;why=pourquoi;who=qui;week=semaine;weekend=week-end;Monday=lundi;Tuesday=mardi;Wednesday=mercredi;Thursday=jeudi;Friday=vendredi;Saturday=samedi;Sunday=dimanche;today=aujourd’hui;tomorrow=demain;every=chaque;with=avec',
    `Do you work here?|Tu travailles ici ?|Tu habites ici ?|Il travaille ici ?
Does she speak English?|Elle parle anglais ?|Elle apprend l’anglais ?|Tu parles anglais ?
I don't drink coffee.|Je ne bois pas de café.|Je ne bois pas de thé.|Elle ne boit pas de café.
He doesn't work on Sunday.|Il ne travaille pas le dimanche.|Il ne travaille pas le samedi.|Il travaille le dimanche.
When do you work?|Quand est-ce que tu travailles ?|Où est-ce que tu travailles ?|Pourquoi est-ce que tu travailles ?
Where does he live?|Où habite-t-il ?|Où travaille-t-il ?|D’où vient-il ?
Yes, I do.|Oui, je le fais.|Non, je ne le fais pas.|Oui, elle le fait.
No, she doesn't.|Non, elle ne le fait pas.|Oui, elle le fait.|Non, ils ne le font pas.
We don't study on Saturday.|Nous n’étudions pas le samedi.|Nous n’étudions pas le dimanche.|Ils n’étudient pas le samedi.
Why do you study English?|Pourquoi est-ce que tu apprends l’anglais ?|Quand est-ce que tu apprends l’anglais ?|Où est-ce que tu apprends l’anglais ?`,
    [topic('Do et does dans les questions','Devant I/you/we/they, on met do ; devant he/she/it, does. Do et does jouent un peu le rôle de « est-ce que » : ils annoncent la question, mais ils sont obligatoires.\n\nEnsuite vient toujours la forme de base : Does she work?, jamais Does she works?\n\nLes mots interrogatifs se placent devant : Where does she work?\n\nAvec be, on n’utilise pas do : Is she here?\n\nIci, on se place devant les jours de la semaine : on Monday = lundi / le lundi.',
      `Do you live here?|Tu habites ici ?
Does she work here?|Elle travaille ici ?
Where does he live?|Où habite-t-il ?`,
      `___ you work here?|Do|Does|Are|Tu travailles ici ?
___ she live in London?|Does|Do|Is|Elle habite à Londres ?
___ they speak German?|Do|Does|Are|Ils parlent allemand ?
Where ___ he work?|does|do|is|Où travaille-t-il ?
When ___ we study?|do|does|are|Quand est-ce que nous étudions ?
Does Anna ___ English?|speak|speaks|speaking|Anna parle anglais ?
Does Tom ___ here?|live|lives|living|Tom habite ici ?
Do you ___ coffee?|like|likes|liking|Tu aimes le café ?
___ he a teacher?|Is|Does|Do|Il est professeur ?
Why does she ___ English?|study|studies|studying|Pourquoi est-ce qu’elle apprend l’anglais ?
___ Leo work on Monday?|Does|Do|Is|Leo travaille le lundi ?
Where ___ your parents live?|do|does|are|Où habitent tes parents ?
Does Mia ___ television?|watch|watches|watching|Mia regarde la télévision ?
When ___ Ben and Emma work?|do|does|are|Quand est-ce que Ben et Emma travaillent ?
___ you from Germany?|Are|Do|Does|Tu viens d’Allemagne ?
Does your sister ___ in Canada?|live|lives|living|Ta sœur habite au Canada ?`),
    topic('Don’t et doesn’t','I/you/we/they don’t + forme de base ; he/she/it doesn’t + forme de base.\n\nLe -s est déjà dans does : He doesn’t drink. On ne le remet pas sur le verbe.\n\nLes réponses courtes utilisent l’auxiliaire : Yes, she does. / No, she doesn’t. En français, on dit simplement « oui » ou « non » ; en anglais, la réponse courte est plus naturelle.\n\nAvec be, la négation reste not : She isn’t here.',
      `I don't drink coffee.|Je ne bois pas de café.
She doesn't drink tea.|Elle ne boit pas de thé.
Does he work here? Yes, he does.|Il travaille ici ? Oui.`,
      `I ___ drink coffee.|don't|doesn't|isn't|Je ne bois pas de café.
She ___ work on Sunday.|doesn't|don't|isn't|Elle ne travaille pas le dimanche.
They ___ live here.|don't|doesn't|aren't|Ils n’habitent pas ici.
He doesn't ___ English.|speak|speaks|speaking|Il ne parle pas anglais.
We don't ___ on Saturday.|study|studies|studying|Nous n’étudions pas le samedi.
Do you work here? Yes, I ___.|do|does|am|Oui, je travaille ici.
Does she live here? Yes, she ___.|does|do|is|Oui, elle habite ici.
Does he study? No, he ___.|doesn't|don't|isn't|Non, il n’étudie pas.
Do they drink tea? No, they ___.|don't|doesn't|aren't|Non, ils ne boivent pas de thé.
She ___ not a teacher.|is|does|do|Elle n’est pas professeure.
Mia ___ eat breakfast here.|doesn't|don't|isn't|Mia ne prend pas son petit-déjeuner ici.
Leo and I ___ work on Friday.|don't|doesn't|aren't|Leo et moi ne travaillons pas le vendredi.
He doesn't ___ television.|watch|watches|watching|Il ne regarde pas la télévision.
Does Ben have a car? No, he ___.|doesn't|don't|isn't|Non, Ben n’a pas de voiture.
Do your parents live here? Yes, they ___.|do|does|are|Oui, tes parents habitent ici.
Anna ___ not from Canada.|is|does|do|Anna ne vient pas du Canada.`)],
    'Décris une habitude et quelque chose que tu ne fais pas. Pose deux questions sur le quotidien.',
    ['Dis une habitude.','Formule une phrase négative.','Pose deux questions avec do ou does.'],
    "I work in London. I don't work on Sunday. I study English on Monday. Do you work here? Where does your sister live? Does she speak English?",
    'I {do not~don’t~don\'t|négation : I} work on Sunday. Anna {does not~doesn’t~doesn\'t|négation : she} work on Saturday. {Do|question : you} you live here? {Does|question : she} she work here? Where does Ben {live|habiter, forme de base}? We do not {drink|boire, forme de base} coffee. Do they study English? Yes, they {do|réponse courte}. Does Anna speak German? Yes, she {does|réponse courte}.',
    `Tu veux savoir où Anna travaille.|Where does Anna work?|When does Anna work?|Why does Anna work?
Ben ne travaille pas le dimanche.|Ben doesn't work on Sunday.|Ben doesn't work on Saturday.|Ben works on Sunday.
Tu demandes à l’autre personne si elle aime le thé.|Do you like tea?|Does she like tea?|Do you drink tea at work?
Tu dis non : je n’habite pas ici.|I don't live here.|I don't work here.|He doesn't live here.`);
  add(8,'Montrer et décrire des objets',
    ['Utiliser this, that, these et those','Placer les adjectifs devant le nom','Distinguer the et a/an'],
    'this=ce … -ci / celui-ci (proche, singulier);that=ce … -là / celui-là (loin, singulier);these=ces … -ci (proches, pluriel);those=ces … -là (loin, pluriel);the=le / la / les (article défini);small=petit;big=grand;new=nouveau / neuf;old=vieux / ancien;red=rouge;blue=bleu;black=noir;white=blanc;green=vert;shirt=chemise;chair=chaise;table=table;key=clé;pen=stylo;colour=couleur',
    `This is my bag.|Voici mon sac. (ici, près de moi)|Voilà mon sac. (là-bas)|Voici mes sacs. (ici)
That is your chair.|Voilà ta chaise. (là-bas)|Voici ta chaise. (ici, près de moi)|Voilà tes chaises. (là-bas)
These are my keys.|Voici mes clés. (ici, près de moi)|Voilà mes clés. (là-bas)|Voici ma clé. (ici)
Those are her books.|Voilà ses livres (à elle). (là-bas)|Voici ses livres (à elle). (ici)|Voilà son livre (à elle). (là-bas)
The bag is blue.|Le sac est bleu.|Le sac est vert.|Les sacs sont bleus.
It is a new phone.|C’est un nouveau téléphone.|C’est un vieux téléphone.|Ce sont de nouveaux téléphones.
The shirts are white.|Les chemises sont blanches.|Les chemises sont noires.|La chemise est blanche.
This table is small.|Cette table-ci est petite.|Cette table-ci est grande.|Cette table-là est petite.
That is a red chair.|Voilà une chaise rouge. (là-bas)|Voilà une chaise bleue. (là-bas)|Voici des chaises rouges. (ici)
What colour is it?|C’est de quelle couleur ?|C’est de quelle taille ?|Ça a quel âge ?`,
    [topic('This, that, these et those','This et these montrent quelque chose de proche ; that et those quelque chose de plus éloigné. C’est comme « -ci » et « -là » en français.\n\nSingulier : this/that + is. Pluriel : these/those + are.\n\nLa forme dépend de la distance et du nombre, pas du genre comme ce/cette en français. Chaque exercice précise si l’objet est proche ou loin.',
      `This is a key.|Voici une clé. (ici)
These are keys.|Voici des clés. (ici)
Those are books.|Voilà des livres. (là-bas)`,
      `___ is my bag.|This|These|Those|Ce seul sac, tout près de moi.
___ is your chair.|That|Those|These|Cette seule chaise, là-bas.
___ are my keys.|These|This|That|Ces plusieurs clés, tout près de moi.
___ are her books.|Those|That|This|Ces plusieurs livres, là-bas.
This ___ a pen.|is|are|am|Voici un stylo.
These ___ books.|are|is|am|Voici des livres.
That ___ a table.|is|are|am|Voilà une table, là-bas.
Those ___ chairs.|are|is|am|Voilà des chaises, là-bas.
___ phone is new.|This|These|Those|Ce seul téléphone-ci est neuf.
___ shirts are blue.|Those|That|This|Ces plusieurs chemises-là sont bleues.
___ is her key.|This|These|Those|Cette seule clé-ci.
___ are our bags.|Those|That|This|Ces plusieurs sacs, là-bas.
___ chairs are red.|These|This|That|Ces plusieurs chaises-ci.
___ is his phone.|That|Those|These|Ce seul téléphone, là-bas.
These keys ___ new.|are|is|am|Ces clés sont neuves.
That bag ___ old.|is|are|am|Ce sac-là est vieux.`),
    topic('Adjectifs et articles','En anglais, l’adjectif se place toujours devant le nom : a blue bag (un sac bleu). En français, la couleur vient après le nom ; en anglais, jamais.\n\nL’adjectif ne prend pas de marque du pluriel : blue bags.\n\nAprès be, il s’emploie sans article : The bag is blue.\n\nThe désigne quelque chose de précis ou déjà mentionné et ne change pas au singulier ni au pluriel.\n\nPour a/an, c’est le son du mot qui suit directement qui décide : an old phone, a new phone.',
      `a blue bag / blue bags|un sac bleu / des sacs bleus
an old phone|un vieux téléphone
A pen is here. The pen is blue.|Un stylo est ici. Le stylo est bleu.`,
      `It is ___ old phone.|an|a|the|C’est un vieux téléphone.
It is ___ new phone.|a|an|the|C’est un nouveau téléphone.
They are ___ bags.|blue|a blue|blue's|Ce sont des sacs bleus.
This is a ___.|red shirt|shirt red|red shirts|C’est une chemise rouge.
The chair is ___.|white|a white|black|La chaise est blanche.
These are ___ tables.|small|big|a small|Ce sont de petites tables.
I have a pen. ___ pen is blue.|The|An|These|J’ai un stylo. Ce stylo déjà mentionné est bleu.
This is ___ big bag.|a|an|the|C’est un grand sac.
It is ___ English book.|an|a|the|C’est un livre anglais.
The phones are ___.|new|old|a new|Les téléphones sont neufs.
That is ___ old chair.|an|a|the|C’est une vieille chaise.
These are ___ shirts.|green|blue|a green|Ce sont des chemises vertes.
She has a bag. ___ bag is black.|The|An|These|Elle a un sac. Ce sac déjà mentionné est noir.
It is a ___.|white table|table white|white tables|C’est une table blanche.
Those chairs are ___.|big|small|a big|Ces chaises-là sont grandes.
This is ___ small key.|a|an|the|C’est une petite clé.`)],
    'Décris trois objets. Dis lesquels sont proches ou plus loin, et donne des couleurs ou des tailles.',
    ['Décris un objet proche.','Décris plusieurs objets plus éloignés.','Donne au moins deux caractéristiques.'],
    'This is my bag. It is blue. These are my keys. That is a new phone. Those are white shirts. The bag is small, but the shirts are big.',
    '{This|ceci, proche, singulier} is my bag. It is {a|un : blue bag} blue bag. {These|ceux-ci, proches, pluriel} are my keys. They {are|forme de be} new. {That|cela, loin, singulier} is a chair. It is {an|une : old chair} old chair. {Those|ceux-là, loin, pluriel} are my shirts. The shirts are {white|blanc}.',
    `Tu montres plusieurs clés dans ta main.|These are my keys.|Those are my keys.|This is my key.
Tu décris un sac loin de toi.|That bag is blue.|This bag is blue.|Those bags are blue.
Tu veux connaître la couleur.|What colour is it?|How old is it?|Where is it?
Tu décris plusieurs téléphones neufs.|They are new phones.|It is a new phone.|They are old phones.`);
  add(9,'Le logement et la position',
    ['Nommer les pièces et les meubles','Dire ce qu’il y a avec there is/are','Décrire une position avec in, on, under, next to et opposite'],
    'house=maison;flat=appartement;room=pièce / chambre;bedroom=chambre à coucher;kitchen=cuisine;bathroom=salle de bains;living room=salon;bed=lit;door=porte;window=fenêtre;floor=sol / étage;on=sur;under=sous;next to=à côté de;behind=derrière;in front of=devant;opposite=en face de;near=près de;there is=il y a (singulier);there are=il y a (pluriel);between=entre',
    `There is a kitchen.|Il y a une cuisine.|Il y a une salle de bains.|Il y a deux cuisines.
There are two bedrooms.|Il y a deux chambres.|Il y a trois chambres.|Il y a deux salles de bains.
Is there a bathroom?|Est-ce qu’il y a une salle de bains ?|Où est la salle de bains ?|Est-ce qu’il y a une chambre ?
The keys are on the table.|Les clés sont sur la table.|Les clés sont sous la table.|La clé est sur la table.
The bag is under the chair.|Le sac est sous la chaise.|Le sac est sur la chaise.|Le sac est à côté de la chaise.
The kitchen is next to the bathroom.|La cuisine est à côté de la salle de bains.|La cuisine est en face de la salle de bains.|La chambre est à côté de la salle de bains.
The bed is in the bedroom.|Le lit est dans la chambre.|Le lit est dans le salon.|Le sac est dans la chambre.
The chair is behind the door.|La chaise est derrière la porte.|La chaise est devant la porte.|La chaise est à côté de la porte.
The table is in front of the window.|La table est devant la fenêtre.|La table est derrière la fenêtre.|La table est à côté de la fenêtre.
Our flat is near the school.|Notre appartement est près de l’école.|Notre appartement est en face de l’école.|Notre appartement est près du magasin.`,
    [topic('There is et there are','There is + singulier et there are + pluriel veulent dire « il y a ». Contrairement au français, la forme change avec le nombre.\n\nDans les questions, l’ordre s’inverse : Is there …? / Are there …?\n\nNégation : There isn’t … / There aren’t … .\n\nNe confonds pas there = là / il y a et their = leur (possession). Ils se prononcent de la même façon.',
      `There is a kitchen.|Il y a une cuisine.
There are two rooms.|Il y a deux pièces.
Is there a bathroom?|Est-ce qu’il y a une salle de bains ?`,
      `There ___ a kitchen.|is|are|am|Il y a une cuisine.
There ___ two bedrooms.|are|is|am|Il y a deux chambres.
___ there a bathroom?|Is|Are|Am|Est-ce qu’il y a une salle de bains ?
___ there three chairs?|Are|Is|Am|Est-ce qu’il y a trois chaises ?
There ___ a bed.|is|are|am|Il y a un lit.
There ___ four windows.|are|is|am|Il y a quatre fenêtres.
There ___ a table.|isn't|aren't|don't|Il n’y a pas de table.
There ___ two kitchens.|aren't|isn't|doesn't|Il n’y a pas deux cuisines.
Is there a bedroom? Yes, there ___.|is|are|am|Oui, il y a une chambre.
Are there two rooms? Yes, there ___.|are|is|am|Oui, il y a deux pièces.
There ___ a living room.|is|are|am|Il y a un salon.
There ___ five doors.|are|is|am|Il y a cinq portes.
___ there a window?|Is|Are|Am|Est-ce qu’il y a une fenêtre ?
___ there two beds?|Are|Is|Am|Est-ce qu’il y a deux lits ?
There ___ a phone in the room.|isn't|aren't|don't|Il n’y a pas de téléphone dans la pièce.
Are there three rooms? No, there ___.|aren't|isn't|don't|Non, il n’y a pas trois pièces.`),
    topic('Les prépositions de lieu','In = dans, on = sur, under = sous, next to = à côté de, behind = derrière, in front of = devant, opposite = en face de et between = entre.\n\nAvec deux repères nommés, and les relie : between the kitchen and the bathroom.\n\nUn pluriel peut regrouper les repères : between the books.\n\nLa préposition décrit la position ; utilise l’indication française pour choisir.',
      `The phone is on the table.|Le téléphone est sur la table.
The bag is under the bed.|Le sac est sous le lit.
The kitchen is between the bedrooms.|La cuisine est entre les chambres.`,
      `The keys are ___ the table.|on|under|behind|Les clés sont sur la table.
The bag is ___ the chair.|under|on|next to|Le sac est sous la chaise.
The kitchen is ___ the bathroom.|next to|behind|in|La cuisine est à côté de la salle de bains.
The chair is ___ the door.|behind|in front of|on|La chaise est derrière la porte.
The table is ___ the window.|in front of|behind|under|La table est devant la fenêtre.
The bed is ___ the bedroom.|in|on|under|Le lit est dans la chambre.
The school is ___ our house.|opposite|in|on|L’école est en face de notre maison.
The flat is ___ the school.|near|under|in|L’appartement est près de l’école.
The pen is ___ the books.|between|behind|under|Le stylo est entre les livres.
The room is between the kitchen ___ the bathroom.|and|but|because|La pièce est entre la cuisine et la salle de bains.
The phone is ___ the bed.|on|under|behind|Le téléphone est sur le lit.
The cat is ___ the table.|under|on|opposite|Le chat est sous la table.
The bathroom is ___ the bedroom.|next to|in|under|La salle de bains est à côté de la chambre.
The door is ___ the table.|behind|in front of|on|La porte est derrière la table.
The chair is ___ the window.|in front of|behind|in|La chaise est devant la fenêtre.
The shop is ___ the school.|opposite|in|on|Le magasin est en face de l’école.`)],
    'Décris un appartement avec deux pièces et dis où se trouvent deux objets.',
    ['Nomme les pièces avec there is/are.','Décris la position de deux objets.','Pose une question sur l’appartement.'],
    'There are two bedrooms in our flat. There is a small kitchen. The kitchen is next to the bathroom. My phone is on the table. Is there a chair in your room?',
    'There {is|be, singulier} a kitchen in our flat. There {are|be, pluriel} two bedrooms. The bathroom is {next to|à côté de} the kitchen. The phone is {on|sur} the table. The bag is {under|sous} the bed. The chair is {behind|derrière} the door. {Is|question, singulier} there a window? Yes, there {is|réponse courte}.',
    `Tu demandes si l’appartement a deux chambres.|Are there two bedrooms?|Is there a bedroom?|Are there two bathrooms?
Ton sac est sous le lit.|My bag is under the bed.|My bag is on the bed.|My bag is next to the bed.
Tu décris la cuisine à côté de la salle de bains.|The kitchen is next to the bathroom.|The kitchen is opposite the bathroom.|The bathroom is in the kitchen.
Il n’y a pas de table dans la pièce.|There isn't a table in the room.|There aren't two tables in the room.|There is a table in the room.`);
  add(10,'L’heure, les jours et les rendez-vous',
    ['Comprendre l’heure et des dates simples','Distinguer at, on et in pour le temps','Fixer un rendez-vous simple'],
    'time=temps / heure;o’clock=heure(s) pile;half past=et demie;quarter past=et quart;quarter to=moins le quart;minute=minute;hour=heure (durée);day=jour;month=mois;January=janvier;February=février;March=mars;April=avril;May=mai;June=juin;July=juillet;August=août;September=septembre;October=octobre;November=novembre;December=décembre;appointment=rendez-vous;at=à (heure);on=le (jour);in=en (mois);meet=se retrouver / se rencontrer;station=gare;café=café (lieu);place=lieu / endroit;free=libre / disponible;afternoon=après-midi',
    `It is half past seven.|Il est sept heures et demie.|Il est six heures et demie.|Il est sept heures et quart.
It is quarter past nine.|Il est neuf heures et quart.|Il est neuf heures moins le quart.|Il est neuf heures et demie.
It is quarter to ten.|Il est dix heures moins le quart.|Il est dix heures et quart.|Il est neuf heures moins le quart.
The appointment is at ten.|Le rendez-vous est à dix heures.|Le rendez-vous est à midi.|Le rendez-vous est le dix.
I work on Monday.|Je travaille lundi.|Je travaille mardi.|Je travaille en mai.
The course starts in May.|Le cours commence en mai.|Le cours commence en mars.|Le cours commence lundi.
Are you free on Friday?|Tu es libre vendredi ?|Tu es libre jeudi ?|Tu n’es pas libre vendredi ?
At half past two, please.|À deux heures et demie, s’il vous plaît.|À une heure et demie, s’il vous plaît.|À deux heures et quart, s’il vous plaît.
What time is it?|Quelle heure est-il ?|Quel jour sommes-nous ?|Quand est-ce que tu travailles ?
See you on Tuesday!|À mardi !|À jeudi !|À demain !`,
    [topic('Bien comprendre l’heure','Seven o’clock = 7 h 00, quarter past seven = 7 h 15, half past seven = 7 h 30 et quarter to eight = 7 h 45.\n\nBonne nouvelle : half past seven = sept heures et demie, comme en français. Past = « et » (après l’heure), to = « moins » (avant l’heure).\n\nLa forme numérique seven thirty est aussi courante.\n\nEn anglais, on utilise rarement 13 h, 14 h … au quotidien : am = avant midi, pm = après midi ; 12 am = minuit, 12 pm = midi.',
      `half past eight = eight thirty|8 h 30, huit heures et demie
quarter to six = five forty-five|5 h 45, six heures moins le quart
ten past three = three ten|3 h 10, trois heures dix`,
      `Half past seven is ___.|7:30|6:30|7:15|Choisis l’heure numérique.
Quarter past nine is ___.|9:15|9:45|8:45|Choisis l’heure numérique.
Quarter to ten is ___.|9:45|10:15|10:45|Choisis l’heure numérique.
Eight o'clock is ___.|8:00|8:15|8:30|Choisis l’heure numérique.
Half past two is ___.|2:30|1:30|2:15|Choisis l’heure numérique.
Quarter to four is ___.|3:45|4:15|4:45|Choisis l’heure numérique.
Ten past six is ___.|6:10|5:50|6:50|Choisis l’heure numérique.
Twenty past five is ___.|5:20|4:40|5:40|Choisis l’heure numérique.
Nine thirty is ___.|9:30|9:13|8:30|Choisis l’heure numérique.
Six forty-five is ___.|6:45|5:45|6:15|Choisis l’heure numérique.
Half past eleven is ___.|11:30|10:30|11:15|Choisis l’heure numérique.
Quarter to seven is ___.|6:45|7:15|7:45|Choisis l’heure numérique.
Quarter past one is ___.|1:15|12:45|1:45|Choisis l’heure numérique.
Twenty past eight is ___.|8:20|7:40|8:40|Choisis l’heure numérique.
Ten past four is ___.|4:10|3:50|4:50|Choisis l’heure numérique.
Three thirty is ___.|3:30|3:13|2:30|Choisis l’heure numérique.`),
    topic('At, on et in pour le temps','At se place devant les heures : at ten, at 9:30 ; aussi at night.\n\nOn se place devant les jours de la semaine et les dates précises : on Monday, on 12 May. En français, on dit « lundi » ou « le 12 mai » sans préposition.\n\nIn se place devant les mois, les années et les moments de la journée : in May, in 2026, in the morning.\n\nThe first/second/third = le premier/deuxième/troisième ; les dates peuvent aussi s’écrire en chiffres.\n\nDans cette leçon, tu lis les dates en chiffres ; à l’oral, on 12 May se dit « on the twelfth of May ». Tu n’as pas encore besoin de prononcer ces dates toi-même.',
      `at nine / on Friday / in June|à neuf heures / vendredi / en juin
on 12 May|le 12 mai
in the evening / at night|le soir / la nuit`,
      `The appointment is ___ ten.|at|on|in|Le rendez-vous est à dix heures.
I work ___ Monday.|on|at|in|Je travaille lundi.
The course starts ___ May.|in|on|at|Le cours commence en mai.
We study ___ the morning.|in|on|at|Nous étudions le matin.
He works ___ night.|at|in|on|Il travaille la nuit.
She starts ___ 8:30.|at|on|in|Elle commence à 8 h 30.
We are free ___ Friday.|on|at|in|Nous sommes libres vendredi.
My appointment is ___ 12 May.|on|in|at|Mon rendez-vous est le 12 mai.
I study ___ the evening.|in|on|at|J’étudie le soir.
The course starts ___ June.|in|at|on|Le cours commence en juin.
The shop opens ___ nine.|at|on|in|Le magasin ouvre à neuf heures. Opens = ouvre.
We work ___ Thursday.|on|in|at|Nous travaillons jeudi.
The course is ___ September.|in|on|at|Le cours a lieu en septembre.
She studies ___ the afternoon.|in|on|at|Elle étudie l’après-midi. Afternoon = après-midi.
The appointment is ___ 3 April.|on|at|in|Le rendez-vous est le 3 avril.
He finishes ___ half past five.|at|on|in|Il finit à cinq heures et demie.`)],
    'Fixe un rendez-vous. Donne le jour, l’heure et le lieu, et demande si l’autre personne est disponible.',
    ['Propose un jour de la semaine.','Donne une heure précise.','Dis le lieu et demande si l’heure convient.'],
    'Hello Ben! Are you free on Friday? Our appointment is at half past two. We are in the office. Is that time good for you? See you on Friday!',
    'Our appointment is {on|jour de la semaine} Friday {at|heure} half past two. The course starts {in|mois} May. I work {in|moment de la journée} the morning. Ben works {at|la nuit} night. We study {on|jour de la semaine} Monday. The appointment is {on|date} 12 May. I finish {at|heure} quarter to six.',
    `Tu confirmes 8 h 30.|At half past eight.|At half past seven.|At quarter past eight.
Tu confirmes mardi.|See you on Tuesday!|See you on Thursday!|See you on Wednesday!
Tu demandes l’heure qu’il est.|What time is it?|When is the appointment?|What day is it?
Tu nommes le mois de mars.|in March|in May|on Monday`);
  add(11,'À quelle fréquence ? Loisirs et habitudes',
    ['Parler des loisirs et de la fréquence','Bien placer always, often, sometimes et never','Demander le jour, le lieu, la raison et la fréquence'],
    'always=toujours;usually=d’habitude;often=souvent;sometimes=parfois;never=jamais;how often=à quelle fréquence / combien de fois;once=une fois;twice=deux fois;play=jouer;football=football;tennis=tennis;music=musique;listen to=écouter;walk=se promener / marcher;swim=nager;cook=cuisiner;visit=rendre visite à / visiter;park=parc;cinema=cinéma;free time=temps libre',
    `I often play tennis.|Je joue souvent au tennis.|Je joue parfois au tennis.|Je ne joue jamais au tennis.
She never drinks coffee.|Elle ne boit jamais de café.|Elle boit souvent du café.|Elle boit parfois du café.
We sometimes go to the cinema.|Nous allons parfois au cinéma.|Nous allons toujours au cinéma.|Nous n’allons jamais au cinéma.
He is always early.|Il est toujours en avance.|Il est souvent en avance.|Il est toujours en retard.
How often do you swim?|Tu nages combien de fois ?|Quand est-ce que tu nages ?|Où est-ce que tu nages ?
I swim twice a week.|Je nage deux fois par semaine.|Je nage une fois par semaine.|Je nage deux fois par jour.
What do you do in your free time?|Qu’est-ce que tu fais pendant ton temps libre ?|Quand est-ce que tu as du temps libre ?|Où est-ce que tu travailles ?
I listen to music.|J’écoute de la musique.|Je fais de la musique.|Je lis sur la musique.
We visit our friends on Sunday.|Nous rendons visite à nos amis le dimanche.|Nous rendons visite à nos amis le samedi.|Nos amis nous rendent visite le dimanche.
Why do you cook at home?|Pourquoi est-ce que tu cuisines à la maison ?|Quand est-ce que tu cuisines à la maison ?|Combien de fois est-ce que tu cuisines à la maison ?`,
    [topic('Les adverbes de fréquence','Always = toujours, usually = d’habitude, often = souvent, sometimes = parfois et never = jamais.\n\nEn général, ils se placent devant le verbe d’action : She often swims. En français, on dit « elle nage souvent » ; en anglais, l’adverbe vient avant le verbe.\n\nAvec be, ils se placent après le verbe : She is often here.\n\nNever contient déjà la négation ; pas de don’t en plus. En français, on dit « ne … jamais » ; en anglais, never suffit.\n\nOnce a week = une fois par semaine, twice a week = deux fois par semaine.',
      `I often cook.|Je cuisine souvent.
He is always early.|Il est toujours en avance.
We swim twice a week.|Nous nageons deux fois par semaine.`,
      `I ___ play tennis.|often|never|always|Je joue souvent au tennis.
She ___ drinks coffee.|never|always|often|Elle ne boit jamais de café.
We ___ go to the cinema.|sometimes|always|never|Nous allons parfois au cinéma.
He is ___ early.|always|never|sometimes|Il est toujours en avance.
She ___ cooks at home.|usually|never|sometimes|D’habitude, elle cuisine à la maison.
I swim ___ a week.|twice|once|never|Je nage deux fois par semaine.
We play football ___ a week.|once|twice|always|Nous jouons au football une fois par semaine.
She ___ music.|often listens to|listens often to|often listen to|Elle écoute souvent de la musique. Utilise la place normale, devant le verbe.
He ___ early.|is never|never is|never are|Il n’est jamais en avance. Utilise la place normale, après be.
She ___ coffee.|never drinks|doesn't never drink|never drink|Elle ne boit jamais de café.
Leo ___ visits his parents.|often|never|always|Leo rend souvent visite à ses parents.
Mia is ___ at home.|usually|never|sometimes|D’habitude, Mia est à la maison.
They ___ cook together.|sometimes|always|never|Ils cuisinent parfois ensemble.
I go to the park ___ a week.|once|twice|never|Je vais au parc une fois par semaine.
He swims ___ a week.|twice|once|always|Il nage deux fois par semaine.
We ___ tea.|never drink|don't never drink|never drinks|Nous ne buvons jamais de thé.`),
    topic('Les mots interrogatifs du quotidien','What demande une chose ou une activité, where un lieu, when un moment, why une raison et how often une fréquence.\n\nAvec les verbes d’action, on ajoute do/does ; avec be, on met am/is/are.\n\nUne réponse avec because correspond à why.\n\nAprès les verbes et les prépositions, on utilise les pronoms compléments : me = me/moi, us = nous, them = les/leur/eux.\n\nWe visit them = Nous leur rendons visite ; they visit us = Ils nous rendent visite.',
      `Where do you play tennis? In the park.|Où est-ce que tu joues au tennis ? Au parc.
When do you cook? On Sunday.|Quand est-ce que tu cuisines ? Le dimanche.
How often do you read? Every day.|Tu lis combien de fois ? Tous les jours.`,
      `___ do you swim? Twice a week.|How often|Where|Why|Tu nages combien de fois ?
___ do you work? In London.|Where|When|Why|Où est-ce que tu travailles ?
___ do you study? On Monday.|When|Where|What|Quand est-ce que tu étudies ?
___ do you cook? Because I like it.|Why|Where|When|Pourquoi est-ce que tu cuisines ?
___ do you do in your free time? I play tennis.|What|Where|When|Qu’est-ce que tu fais pendant ton temps libre ?
How often ___ she swim?|does|do|is|Elle nage combien de fois ?
Where ___ they play football?|do|does|are|Où est-ce qu’ils jouent au football ?
When ___ he at home?|is|does|do|Quand est-ce qu’il est à la maison ?
Why ___ you study English?|do|does|are|Pourquoi est-ce que tu apprends l’anglais ?
What ___ she do on Sunday?|does|do|is|Qu’est-ce qu’elle fait le dimanche ?
___ does Mia live? In Berlin.|Where|When|Why|Où habite Mia ?
___ do they visit us? On Friday.|When|Where|What|Quand est-ce qu’ils nous rendent visite ? Us = nous.
___ does Leo read? Every day.|How often|Where|Why|Leo lit combien de fois ?
___ do you drink water? Because I like it.|Why|When|Where|Pourquoi est-ce que tu bois de l’eau ?
Where ___ your friends work?|do|does|are|Où travaillent tes amis ?
When ___ the appointment?|is|does|do|Quand est le rendez-vous ?`)],
    'Décris deux loisirs et dis à quelle fréquence tu les pratiques. Pose une question adaptée.',
    ['Nomme deux loisirs.','Décris la fréquence ou les jours.','Demande à l’autre personne ce qu’elle fait pendant son temps libre.'],
    'I often play tennis. I swim twice a week, on Monday and Friday. I never play football. On Sunday I visit my friends. What do you do in your free time?',
    'I {often|souvent} play tennis. I swim {twice|deux fois} a week. My sister {never|jamais} drinks coffee. She is {always|toujours} early. We {sometimes|parfois} visit our friends. {Where|où} do they live? In London. {When|quand} do we visit them? On Sunday. {Why|pourquoi} do we go there? Because they are our friends.',
    `Tu demandes la fréquence.|How often do you swim?|Where do you swim?|Why do you swim?
Tu dis que tu ne bois jamais de café.|I never drink coffee.|I sometimes drink coffee.|I don't often drink coffee.
Tu dis que tu joues au tennis deux fois par semaine.|I play tennis twice a week.|I play tennis once a week.|I play tennis twice a day.
Tu veux connaître une raison.|Why do you study English?|When do you study English?|Where do you study English?`);
  add(12,'Savoir faire et demander poliment',
    ['Décrire des capacités avec can','Dire non avec can’t','Formuler des demandes simples et demander la permission'],
    'can=pouvoir / savoir;can’t=cannot;help=aider;open=ouvrir;close=fermer;wait=attendre;come=venir;sit=s’asseoir;stand=être debout;drive=conduire;dance=danser;sing=chanter;use=utiliser;take=prendre;ticket=billet / ticket;carry=porter;suitcase=valise;here=ici;of course=bien sûr;thank you=merci',
    `I can swim.|Je sais nager.|Je nage souvent.|Je ne sais pas nager.
She can drive.|Elle sait conduire.|Elle est en train de conduire.|Elle ne sait pas conduire.
He can't dance.|Il ne sait pas danser.|Il ne danse jamais.|Il sait danser.
Can you help me, please?|Tu peux m’aider, s’il te plaît ?|Je peux t’aider, s’il te plaît ?|Tu m’aides tous les jours ?
Can I sit here?|Je peux m’asseoir ici ?|Tu peux t’asseoir ici ?|Je suis assis ici ?
Can you open the window?|Tu peux ouvrir la fenêtre ?|Tu peux ouvrir la porte ?|Tu peux fermer la fenêtre ?
Can I use your phone?|Je peux utiliser ton téléphone ?|Tu peux utiliser mon téléphone ?|Tu peux utiliser ton téléphone ?
Yes, of course.|Oui, bien sûr.|Non, malheureusement pas.|Oui, parfois.
Sorry, I can't.|Désolé, je ne peux pas.|Désolé, je ne sais pas.|Désolé, je peux.
Can you carry this bag?|Tu peux porter ce sac ?|Tu peux porter cette valise ?|Je peux porter ce sac ?`,
    [topic('Can : la même forme pour tous','Can a la même forme pour toutes les personnes.\n\nEnsuite vient la forme de base sans to : She can drive. Pas de -s sur can ni sur le verbe qui suit.\n\nNégation : cannot ou can’t.\n\nCan traduit à la fois « pouvoir » et « savoir » (une capacité apprise) : I can swim = je sais nager. La fréquence d’une activité est une autre information.\n\nSelon la situation, can’t veut dire « ne peut pas », « ne sait pas » ou « n’a pas le droit » ; cannot est la même négation en forme complète.',
      `I can swim. She can swim.|Je sais nager. Elle sait nager.
He cannot drive.|Il ne sait pas conduire.
We can speak English.|Nous savons parler anglais.`,
      `I ___ swim.|can|does|am can|Je sais nager.
She can ___.|drive|drives|to drive|Elle sait conduire.
He ___ dance.|can't|don't can|doesn't can|Il ne sait pas danser.
We can ___ English.|speak|speaks|to speak|Nous savons parler anglais.
They ___ sing.|can|does|are can|Ils savent chanter.
Anna can ___.|cook|cooks|to cook|Anna sait cuisiner.
Ben ___ drive.|cannot|doesn't can|not can|Ben ne sait pas conduire.
You can ___ here.|wait|waits|to wait|Tu peux attendre ici.
My sister can ___.|dance|dances|to dance|Ma sœur sait danser.
We ___ come on Friday.|can't|don't can|aren't can|Nous ne pouvons pas venir vendredi.
Leo can ___ the bag.|carry|carries|to carry|Leo peut porter le sac.
Mia ___ sing.|can|does|is can|Mia sait chanter.
Our parents can ___ English.|speak|speaks|to speak|Nos parents savent parler anglais.
I ___ drive.|can't|don't can|am not can|Je ne sais pas conduire.
He can ___ the window.|open|opens|to open|Il peut ouvrir la fenêtre.
They can ___ here.|sit|sits|to sit|Ils peuvent s’asseoir ici.`),
    topic('Questions et demandes avec can','Dans une question, can se place devant le sujet : Can you help me?\n\nOn n’ajoute pas do/does.\n\nCan I …? demande souvent la permission ; Can you …? demande souvent un service à l’autre personne.\n\nPlease rend la demande plus polie.\n\nRéponses courtes : Yes, I can. / No, I can’t.',
      `Can I use your phone?|Je peux utiliser ton téléphone ?
Can you open the door, please?|Tu peux ouvrir la porte, s’il te plaît ?
Can she swim? Yes, she can.|Elle sait nager ? Oui.`,
      `___ you help me?|Can|Do can|Does can|Tu peux m’aider ?
___ I sit here?|Can|Do|Am|Je peux m’asseoir ici ?
Can she ___?|drive|drives|to drive|Elle sait conduire ?
Can you swim? Yes, I ___.|can|do|am|Oui, je sais nager.
Can he dance? No, he ___.|can't|doesn't|isn't|Non, il ne sait pas danser.
Can ___ use your phone?|I|me|my|Je peux utiliser ton téléphone ?
Can you ___ the window?|close|closes|to close|Tu peux fermer la fenêtre ?
Can ___ carry this bag?|you|your|yours|Tu peux porter ce sac ?
Can they come? Yes, they ___.|can|do|are|Oui, ils peuvent venir.
Can I ___ the door?|open|opens|to open|Je peux ouvrir la porte ?
___ Mia help us?|Can|Does can|Is can|Mia peut nous aider ? Us = nous.
Can Leo ___ here?|wait|waits|to wait|Leo peut attendre ici ?
Can we sit here? Yes, you ___.|can|do|are|Oui, vous pouvez vous asseoir ici.
Can she sing? No, she ___.|can't|doesn't|isn't|Non, elle ne sait pas chanter.
Can I ___ this ticket?|use|uses|to use|Je peux utiliser ce billet ?
Can you ___ here on Monday?|come|comes|to come|Tu peux venir ici lundi ?`)],
    'Dis quelque chose que tu sais faire et quelque chose que tu ne sais pas faire. Formule ensuite une demande polie.',
    ['Dis une capacité.','Dis une limite.','Demande de l’aide ou une permission.'],
    "I can swim and I can cook. I can't drive. Can you help me with this suitcase, please? Can I sit here? Thank you for your help!",
    'I {can|pouvoir / savoir} swim. My sister can {drive|conduire, forme de base}. I {cannot~can’t~can\'t|ne pas savoir} drive. {Can|question} you help me, please? Can I {use|utiliser, forme de base} your phone? Yes, you {can|réponse courte}. My brother can {carry|porter, forme de base} this bag. He cannot {come|venir, forme de base} on Friday.',
    `Tu veux utiliser toi-même le téléphone.|Can I use your phone?|Can you use my phone?|Do you use your phone?
Tu demandes à quelqu’un de fermer la porte.|Can you close the door, please?|Can I close the door, please?|Can you open the door, please?
Tu dis qu’Anna sait conduire.|Anna can drive.|Anna drives every day.|Anna can't drive.
Tu permets à quelqu’un de s’asseoir ici.|Yes, you can sit here.|Yes, I can sit here.|No, you can't sit here.`);
})();
