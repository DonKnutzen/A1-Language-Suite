(() => {
  'use strict';
  const {add,topic}=window.EN_A1_AUTHORING;
  add(19,'La météo, les lieux et choisir le meilleur',
    ['Décrire la météo','Distinguer it pour la météo et there pour ce qui existe','Former des superlatifs simples'],
    'weather=temps (météo);sun=soleil;sunny=ensoleillé;cloud=nuage;cloudy=nuageux;wind=vent;windy=venteux;rain=pluie / pleuvoir;snow=neige / neiger;hot=chaud (très);dry=sec;wet=mouillé / humide;spring=printemps;summer=été;autumn=automne;winter=hiver;best=le meilleur;worst=le pire;most=le plus;holiday=vacances;beach=plage',
    `What is the weather like?|Quel temps fait-il ?|Quel temps faisait-il ?|Quand est-ce que le temps change ?
It is sunny and warm.|Il fait beau et chaud.|C’est nuageux et il fait chaud.|Il fait beau et froid.
It is raining now.|Il pleut en ce moment.|Il pleut souvent.|Il neige en ce moment.
It is cold in winter.|En hiver, il fait froid.|En été, il fait froid.|En hiver, il fait chaud.
There are clouds.|Il y a des nuages.|Il pleut.|Il n’y a pas de nuages.
This is the cheapest room.|C’est la chambre la moins chère.|C’est une chambre moins chère.|C’est la chambre la plus chère.
This is the biggest bag.|C’est le plus grand sac.|C’est le plus petit sac.|Ce sac est plus grand.
It is the best day.|C’est le meilleur jour.|C’est un meilleur jour.|C’est le pire jour.
This is the most expensive hotel.|C’est l’hôtel le plus cher.|Cet hôtel est plus cher.|C’est l’hôtel le moins cher.
I like summer best.|C’est l’été que je préfère.|C’est l’hiver que je préfère.|Je n’aime pas l’été.`,
    [topic('La météo avec it, les choses avec there','Pour la météo, on utilise it : It is cold / sunny / windy. Le français dit « il fait froid » ; l’anglais dit « it is cold », avec be et pas avec make.\n\nPour une météo en cours, on met is + -ing : It is raining.\n\nThere is/are dit ce qui existe : There are clouds.\n\nIn summer et in winter s’emploient sans the quand tu parles de la saison en général.',
      `It is cloudy.|C’est nuageux.
It is raining now.|Il pleut en ce moment.
There are clouds in the sky.|Il y a des nuages dans le ciel. Sky = ciel.`,
      `___ is sunny.|It|There|They|Il fait beau.
It ___ cold.|is|are|does|Il fait froid.
It is ___.|raining|rain|rains|Il pleut en ce moment.
___ are clouds.|There|It|This|Il y a des nuages.
It is cold ___ winter.|in|on|at|En hiver, il fait froid.
It is ___ today.|windy|wind|winds|Aujourd’hui, il y a du vent.
There ___ snow.|is|are|does|Il y a de la neige.
What ___ the weather like?|is|does|are|Quel temps fait-il ?
It is ___ now.|snowing|snow|snows|Il neige en ce moment.
It is hot ___ summer.|in|on|at|En été, il fait chaud.
___ is cloudy today.|It|There|They|Aujourd’hui, c’est nuageux.
There ___ two clouds.|are|is|does|Il y a deux nuages.
It ___ raining now.|is|does|are|Il pleut en ce moment.
It is warm ___ spring.|in|on|at|Au printemps, il fait doux.
It is ___ outside.|wet|a wet|wets|Dehors, c’est mouillé.
What is the weather ___?|like|likes|liking|Quel temps fait-il ?`),
    topic('Superlatifs : the smallest et the best','Pour dire qu’une chose est la plus petite ou la plus grande d’un groupe, on utilise the + -est : the smallest = le plus petit.\n\nLes règles d’orthographe sont les mêmes que pour le comparatif : big → biggest, happy → happiest.\n\nAdjectifs plus longs : the most expensive.\n\nGood → the best ; bad → the worst.\n\nPour comparer deux choses : -er + than ; pour la première place d’un groupe : -est.',
      `small → smaller → the smallest|petit → plus petit → le plus petit
expensive → more expensive → the most expensive|cher → plus cher → le plus cher
good → better → the best|bon → meilleur → le meilleur`,
      `This is the ___ room.|smallest|smaller|most small|C’est la plus petite chambre.
This is the ___ bag.|biggest|bigger|most big|C’est le plus grand sac.
This is the ___ coat.|cheapest|cheaper|most cheap|C’est le manteau le moins cher.
This is ___ best day.|the|a|an|C’est le meilleur jour.
That is the ___ hotel.|most expensive|more expensive|expensive|C’est l’hôtel le plus cher.
It is the ___ weather.|worst|worse|bad|C’est le pire temps.
This is the ___ jacket.|warmest|warmer|most warm|C’est la veste la plus chaude.
That is the ___ house.|oldest|older|most old|C’est la maison la plus vieille.
She is the ___ person here.|youngest|younger|most young|Elle est la plus jeune personne ici. Young = jeune.
This is the ___ day.|best|better|good|C’est le meilleur jour.
This is the ___ table.|largest|larger|most large|C’est la plus grande table. Large = grand.
It is the ___ month.|coldest|colder|most cold|C’est le mois le plus froid.
That is the ___ phone.|most expensive|more expensive|expensive|C’est le téléphone le plus cher.
This is the ___ street.|shortest|shorter|most short|C’est la rue la plus courte.
This is ___ worst room.|the|a|an|C’est la pire chambre.
It is the ___ day.|hottest|hotter|most hot|C’est le jour le plus chaud.`)],
    'Décris la météo et choisis un lieu ou un objet parmi trois. Justifie ton choix simplement.',
    ['Décris la météo d’aujourd’hui.','Fais ton choix avec un superlatif.','Donne une raison simple.'],
    'It is cold and windy today. I need a warm coat. The blue coat is the warmest, but it is the most expensive. I like the red coat best because it is cheaper.',
    '{It|sujet de la météo} is cold today. It is {raining|rain : -ing} now. There {are|be : pluriel} clouds. In {winter|hiver} it is often cold. This coat is the {warmest|warm : superlatif}. That bag is the {biggest|big : superlatif}. This is the {best|good : superlatif} room. It is the {most|superlatif devant expensive} expensive hotel.',
    `Tu demandes le temps qu’il fait aujourd’hui.|What is the weather like today?|What is the weather like in winter?|When is the weather cold?
Tu choisis la chambre la moins chère des trois.|This is the cheapest room.|This room is cheaper than my room.|This is an expensive room.
Il neige en ce moment.|It is snowing now.|It snows every winter.|There is rain now.
Tu nommes le meilleur jour.|This is the best day.|This is a better day.|This is the worst day.`);
  add(20,'La santé et des règles simples',
    ['Nommer des problèmes de santé simples et les parties du corps','Comprendre have got pour la possession et les maux','Utiliser must et mustn’t pour les règles'],
    'head=tête;hand=main;arm=bras;leg=jambe;foot=pied;feet=pieds;tooth=dent;teeth=dents;stomach=ventre / estomac;headache=mal de tête;stomach ache=mal de ventre;cold=rhume / froid;ill=malade;tired=fatigué;doctor=médecin;pharmacy=pharmacie;medicine=médicament;must=devoir;mustn’t=ne pas avoir le droit de;rule=règle;rest=se reposer;reception=accueil / réception',
    `I've got a headache.|J’ai mal à la tête.|J’ai mal au ventre.|Je suis fatigué.
She has got a cold.|Elle a un rhume.|Elle a froid.|Elle a mal à la tête.
Have you got a headache?|Tu as mal à la tête ?|Tu as mal au ventre ?|Tu es fatigué ?
I am tired.|Je suis fatigué.|Je suis malade.|J’ai faim.
I need a doctor.|J’ai besoin d’un médecin.|Je suis médecin.|J’ai besoin d’un médicament.
Where is the pharmacy?|Où est la pharmacie ?|Où est le médecin ?|Quand la pharmacie ouvre-t-elle ?
You must wait here.|Tu dois attendre ici.|Tu n’as pas le droit d’attendre ici.|Tu peux attendre ici.
You mustn't eat here.|Tu n’as pas le droit de manger ici.|Tu n’es pas obligé de manger ici.|Tu dois manger ici.
He hasn't got a phone.|Il n’a pas de téléphone.|Il n’utilise pas de téléphone.|Il n’a pas besoin de téléphone.
Can I have an appointment?|Je peux avoir un rendez-vous ?|J’ai un rendez-vous ?|Je peux annuler le rendez-vous ?`,
    [topic('Have got et has got','Have got veut dire avoir et est très fréquent en anglais britannique : I have got / I’ve got ; she has got / she’s got.\n\nQuestions : Have you got …? / Has she got …?\n\nNégation : haven’t got / hasn’t got.\n\nN’utilise pas do avec got.\n\nShe’s got veut dire she has got ; she’s ill veut dire she is ill.\n\nAttention : « avoir froid » se dit be cold (I am cold), mais « avoir un rhume » se dit have got a cold.',
      `I've got a headache.|J’ai mal à la tête.
Has she got a cold?|Elle a un rhume ?
He hasn't got a phone.|Il n’a pas de téléphone.`,
      `I ___ got a headache.|have|has|am|J’ai mal à la tête.
She ___ got a cold.|has|have|is|Elle a un rhume.
___ you got a headache?|Have|Do|Are|Tu as mal à la tête ?
___ he got a phone?|Has|Does|Is|Il a un téléphone ?
We ___ got an appointment.|have|has|are|Nous avons un rendez-vous.
He ___ got a car.|hasn't|haven't|doesn't|Il n’a pas de voiture.
They ___ got any medicine.|haven't|hasn't|don't|Ils n’ont pas de médicament.
Has she got a cold? Yes, she ___.|has|does|is|Oui, elle a un rhume.
Have you got a phone? No, I ___.|haven't|don't|am not|Non, je n’ai pas de téléphone.
Anna ___ got a stomach ache.|has|have|is|Anna a mal au ventre.
Leo ___ got a headache.|has|have|is|Leo a mal à la tête.
___ Mia got an appointment?|Has|Does|Is|Mia a un rendez-vous ?
My parents ___ got a car.|have|has|are|Mes parents ont une voiture.
I ___ got a cold.|haven't|hasn't|don't|Je n’ai pas de rhume.
Have they got a phone? Yes, they ___.|have|do|are|Oui, ils ont un téléphone.
Our son ___ got any medicine.|hasn't|haven't|doesn't|Notre fils n’a pas de médicament.`),
    topic('Must et mustn’t','Must + forme de base exprime une obligation : devoir.\n\nMustn’t exprime une interdiction : ne pas avoir le droit de. Attention, ça ne veut pas dire « ne pas être obligé ».\n\nLa forme est la même pour toutes les personnes, sans -s et sans to.\n\nIci, tu t’entraînes avec des règles de la maison et des consignes, pas avec des instructions médicales.\n\nPour une consigne, tu peux aussi utiliser une forme de base avec please.',
      `You must wait here.|Tu dois attendre ici.
You mustn't eat here.|Tu n’as pas le droit de manger ici.
Please sit here.|Assieds-toi ici, s’il te plaît.`,
      `You ___ wait here.|must|mustn't|can't|Tu dois attendre ici. Règle de l’accueil.
You ___ eat here.|mustn't|must|can|Tu n’as pas le droit de manger ici. Panneau d’interdiction.
She must ___ here.|sit|sits|to sit|Elle doit s’asseoir ici.
We ___ be quiet.|must|does|are must|Nous devons être silencieux. Quiet = silencieux.
He mustn't ___ the door.|open|opens|to open|Il n’a pas le droit d’ouvrir la porte.
You ___ use your phone here.|mustn't|must|can|Tu n’as pas le droit d’utiliser ton téléphone ici. Interdiction.
They must ___ outside.|wait|waits|to wait|Ils doivent attendre dehors.
Anna ___ show her ticket.|must|does|is must|Anna doit montrer son billet. Show = montrer.
You mustn't ___ here.|run|runs|to run|Tu n’as pas le droit de courir ici. Interdiction.
We must ___ on time.|come|comes|to come|Nous devons arriver à l’heure. On time = à l’heure.
Leo must ___ his hands.|wash|washes|to wash|Leo doit se laver les mains. Règle.
You ___ park here.|mustn't|must|can|Tu n’as pas le droit de te garer ici. Park = se garer.
Mia ___ wait for the doctor.|must|does|is must|Mia doit attendre le médecin.
They mustn't ___ here.|sit|sits|to sit|Ils n’ont pas le droit de s’asseoir ici.
We must ___ the door.|close|closes|to close|Nous devons fermer la porte.
You ___ buy a ticket.|must|mustn't|can't|Tu dois acheter un billet. Obligation.`)],
    'Demande un rendez-vous. Décris comment tu te sens et cite une règle simple de la salle d’attente.',
    ['Demande un rendez-vous.','Dis un problème de santé simple.','Cite une règle ou demande où tu peux attendre.'],
    "Hello! I've got a headache and I am tired. Can I have an appointment with the doctor, please? Can I wait here? I mustn't use my phone in this room.",
    'I {have|have got : I} got a headache. My sister {has|have got : she} got a cold. {Have|question : you} you got an appointment? Yes, I {have|réponse courte}. We {must|devoir} wait here. We {must not~mustn’t~mustn\'t|ne pas avoir le droit} eat here. The doctor is {in|dans} the next room. Please {sit|s’asseoir : impératif} here.',
    `Tu décris un mal de tête.|I've got a headache.|I've got a stomach ache.|I've got a cold.
Un panneau interdit de manger.|You mustn't eat here.|You must eat here.|You don't need to eat here.
Tu veux un rendez-vous chez le médecin.|Can I have an appointment with the doctor?|Can I work with the doctor?|Have you got an appointment with the doctor?
Tu demandes si Emma a un rhume.|Has Emma got a cold?|Is Emma cold?|Has Emma got a headache?`);
  add(21,'Hier : was et were',
    ['Parler de lieux et d’états passés','Utiliser was et were','Comprendre there was et there were'],
    'yesterday=hier;last week=la semaine dernière;last night=hier soir / la nuit dernière;last year=l’année dernière;ago=il y a (durée);before=avant;after=après;born=né;was=étais / était;were=étais (you) / étions / étiez / étaient;wasn’t=was not;weren’t=were not;hotel=hôtel;beach=plage;town=ville;village=village;hospital=hôpital;meeting=réunion;happy=heureux / content;hungry=affamé',
    `I was at home yesterday.|Hier, j’étais à la maison.|Aujourd’hui, je suis à la maison.|Hier, j’étais au travail.
We were in London last week.|La semaine dernière, nous étions à Londres.|Cette semaine, nous sommes à Londres.|La semaine dernière, ils étaient à Londres.
She wasn't at work.|Elle n’était pas au travail.|Elle n’est pas au travail.|Elle était au travail.
Were you at the station?|Tu étais à la gare ?|Tu es à la gare ?|Il était à la gare ?
Where were you yesterday?|Où étais-tu hier ?|Où es-tu aujourd’hui ?|Quand étais-tu là-bas ?
The weather was good.|Il faisait beau.|Il fait beau.|Il faisait mauvais.
There was a café.|Il y avait un café.|Il y a un café.|Il y avait deux cafés.
There were two rooms.|Il y avait deux chambres.|Il y a deux chambres.|Il y avait une chambre.
I was born in Germany.|Je suis né en Allemagne.|J’habite en Allemagne.|Hier, j’étais en Allemagne.
They were tired last night.|Hier soir, ils étaient fatigués.|Ce soir, ils sont fatigués.|Hier soir, nous étions fatigués.`,
    [topic('Be au passé','I/he/she/it utilisent was.\n\nYou/we/they utilisent were.\n\nNégation : wasn’t / weren’t.\n\nDans les questions, was/were se place devant le sujet : Were you here? Pas besoin d’autre auxiliaire.\n\nYesterday = hier, last week = la semaine dernière, two days ago = il y a deux jours. Attention à l’ordre : ago vient après la durée.\n\nBorn s’emploie avec be : I was born in Berlin = je suis né à Berlin.',
      `I was tired yesterday.|Hier, j’étais fatigué.
They were at home.|Ils étaient à la maison.
Was she in London?|Elle était à Londres ?`,
      `I ___ at home yesterday.|was|were|am|Hier, j’étais à la maison.
She ___ at work.|was|were|is|Elle était au travail.
We ___ in London last week.|were|was|are|La semaine dernière, nous étions à Londres.
___ you at the station?|Were|Was|Is|Tu étais à la gare ?
___ he in Berlin?|Was|Were|Is|Il était à Berlin ?
They ___ tired last night.|were|was|are|Hier soir, ils étaient fatigués.
Anna ___ at home.|wasn't|weren't|isn't|Anna n’était pas à la maison.
We ___ at the beach.|weren't|wasn't|aren't|Nous n’étions pas à la plage.
I ___ born in Germany.|was|were|am|Je suis né en Allemagne.
Was she here? Yes, she ___.|was|were|is|Oui, elle était ici.
Leo ___ at the hospital yesterday.|was|were|is|Hier, Leo était à l’hôpital.
Mia and I ___ happy.|were|was|are|Mia et moi étions contents.
Where ___ your parents last week?|were|was|is|Où étaient tes parents la semaine dernière ?
___ the weather cold?|Was|Were|Is|Il faisait froid ?
They ___ here two days ago.|were|was|are|Ils étaient ici il y a deux jours.
Were you tired? No, I ___.|wasn't|weren't|isn't|Non, je n’étais pas fatigué.`),
    topic('There was et there were','There was + singulier et there were + pluriel veulent dire « il y avait ».\n\nQuestions : Was there …? / Were there …?\n\nNégation : There wasn’t … / There weren’t … .\n\nAvec un nom indénombrable, on met was : There was some water.\n\nCes formes décrivent une situation passée.\n\nLa possession avec un nom se forme avec ’s : my sister’s house = la maison de ma sœur. L’ordre est inversé par rapport au français.',
      `There was a café near the hotel.|Il y avait un café près de l’hôtel.
There were two bedrooms.|Il y avait deux chambres.
Was there a kitchen?|Il y avait une cuisine ?`,
      `There ___ a café.|was|were|is|Il y avait un café.
There ___ two rooms.|were|was|are|Il y avait deux chambres.
___ there a kitchen?|Was|Were|Is|Il y avait une cuisine ?
___ there three chairs?|Were|Was|Is|Il y avait trois chaises ?
There ___ any water.|wasn't|weren't|isn't|Il n’y avait pas d’eau.
There ___ any eggs.|weren't|wasn't|aren't|Il n’y avait pas d’œufs.
There ___ some milk.|was|were|are|Il y avait du lait.
Was there a bus? Yes, there ___.|was|were|is|Oui, il y avait un bus.
Were there two beds? Yes, there ___.|were|was|is|Oui, il y avait deux lits.
There ___ a phone in the room.|wasn't|weren't|isn't|Il n’y avait pas de téléphone dans la chambre.
There ___ a shop near the station.|was|were|is|Il y avait un magasin près de la gare.
There ___ four people.|were|was|are|Il y avait quatre personnes.
___ there any bread?|Was|Were|Is|Il y avait du pain ?
___ there any tomatoes?|Were|Was|Is|Il y avait des tomates ?
There ___ any coffee.|wasn't|weren't|isn't|Il n’y avait pas de café.
Were there three rooms? No, there ___.|weren't|wasn't|aren't|Non, il n’y avait pas trois chambres.`)],
    'Décris une journée ou un séjour passé : le lieu, comment tu te sentais et quelque chose qu’il y avait sur place.',
    ['Dis un moment passé.','Dis le lieu et comment tu te sentais.','Décris avec there was/were ce qu’il y avait.'],
    'Last week I was in London. The weather was cold, but I was happy. There was a café near the hotel. There were two chairs in my room. Were you there too?',
    'Yesterday I {was|be, passé : I} at home. My parents {were|be, passé : they} in London. My sister {was|be, passé : she} tired. There {was|il y avait, singulier} a café near the hotel. There {were|il y avait, pluriel} two rooms. {Were|question : you} you there? No, I {was not~wasn’t~wasn\'t|négation : I}. I was {born|né} in Berlin.',
    `Tu demandes où la personne était hier.|Where were you yesterday?|Where are you today?|When were you at home?
Tu décris deux chambres du passé.|There were two rooms.|There was one room.|There are two rooms.
Tu dis qu’Anna n’était pas au travail hier.|Anna wasn't at work yesterday.|Anna isn't at work today.|Anna was at work yesterday.
Tu dis ton lieu de naissance.|I was born in Berlin.|I was in Berlin yesterday.|I live in Berlin.`);
  add(22,'Raconter son week-end',
    ['Décrire des actions passées simples','Utiliser les formes régulières et des formes irrégulières fréquentes','Poser des questions et dire non avec did'],
    'visited=a rendu visite / a visité;worked=a travaillé;played=a joué;watched=a regardé;cooked=a cuisiné;went=est allé;had=a eu / a pris;ate=a mangé;drank=a bu;saw=a vu;bought=a acheté;did=a fait / auxiliaire du passé;didn’t=did not;enjoy=apprécier / aimer;walked=a marché;stayed=est resté;cleaned=a nettoyé;called=a appelé;travelled=a voyagé;returned=est revenu',
    `I visited my parents.|J’ai rendu visite à mes parents.|Je suis en train de rendre visite à mes parents.|Mes parents m’ont rendu visite.
She worked on Saturday.|Elle a travaillé samedi.|Elle travaille tous les samedis.|Elle a travaillé dimanche.
We went to the beach.|Nous sommes allés à la plage.|Nous sommes en train d’aller à la plage.|Nous étions à l’hôtel.
He had breakfast at eight.|Il a pris son petit-déjeuner à huit heures.|Il prend son petit-déjeuner à huit heures.|Il a dîné à huit heures.
They bought a new phone.|Ils ont acheté un nouveau téléphone.|Ils achètent un nouveau téléphone.|Ils ont vendu un nouveau téléphone.
Did you enjoy the weekend?|Tu as passé un bon week-end ?|Tu passes un bon week-end en ce moment ?|C’était quand, le week-end ?
I didn't watch television.|Je n’ai pas regardé la télévision.|Je ne regarde jamais la télévision.|J’ai regardé la télévision.
What did you do yesterday?|Qu’est-ce que tu as fait hier ?|Qu’est-ce que tu fais aujourd’hui ?|Où étais-tu hier ?
We ate fish and drank water.|Nous avons mangé du poisson et bu de l’eau.|Nous mangeons du poisson et buvons de l’eau.|Nous avons mangé de la viande et bu de l’eau.
She called her brother.|Elle a appelé son frère.|Son frère l’a appelée.|Elle est en train d’appeler son frère.`,
    [topic('Prétérit : phrases affirmatives','Le prétérit (past simple) correspond souvent au passé composé français : I worked = j’ai travaillé.\n\nLes verbes réguliers prennent -ed : work → worked.\n\nAprès un e final, seulement -d : live → lived.\n\nConsonne + y devient -ied : study → studied.\n\nAprès une voyelle, le y reste : stay → stayed.\n\nEn anglais britannique, on écrit travel → travelled.\n\nIl faut apprendre les formes irrégulières fréquentes : go → went, have → had, eat → ate, drink → drank, see → saw, buy → bought.\n\nDans les phrases affirmatives, la forme du prétérit est la même pour toutes les personnes.',
      `I worked. She worked.|J’ai travaillé. Elle a travaillé.
We went to London.|Nous sommes allés à Londres.
He bought a phone.|Il a acheté un téléphone.`,
      `I ___ my parents yesterday.|visited|visit|visits|Hier, j’ai rendu visite à mes parents.
She ___ on Saturday.|worked|work|works|Elle a travaillé samedi.
We ___ to the beach.|went|go|goes|Nous sommes allés à la plage.
He ___ breakfast at eight.|had|has|have|Il a pris son petit-déjeuner à huit heures.
They ___ fish.|ate|eat|eats|Ils ont mangé du poisson.
I ___ water.|drank|drink|drinks|J’ai bu de l’eau.
She ___ a new phone.|bought|buy|buys|Elle a acheté un nouveau téléphone.
We ___ our friends.|saw|see|sees|Nous avons vu nos amis.
Ben ___ English yesterday.|studied|study|studies|Hier, Ben a étudié l’anglais.
Anna ___ her brother.|called|call|calls|Anna a appelé son frère.
Leo ___ dinner last night.|cooked|cook|cooks|Hier soir, Leo a préparé le dîner.
Mia ___ television yesterday.|watched|watch|watches|Hier, Mia a regardé la télévision.
My parents ___ to London last week.|went|goes|go|La semaine dernière, mes parents sont allés à Londres.
I ___ a sandwich yesterday.|ate|eats|eat|Hier, j’ai mangé un sandwich.
We ___ some milk.|bought|buys|buy|Nous avons acheté du lait.
He ___ in Berlin last year.|lived|live|lives|L’année dernière, il habitait à Berlin.`),
    topic('Did et didn’t + forme de base','Dans les questions et les négations, c’est did qui montre le passé.\n\nLe verbe d’action est donc à la forme de base : Did you go? / I didn’t go.\n\nPas de went ni de -ed après did.\n\nRéponses courtes : Yes, I did. / No, I didn’t.\n\nAvec be, on garde was/were sans did.',
      `Did you work yesterday?|Tu as travaillé hier ?
She didn't go to London.|Elle n’est pas allée à Londres.
Where did he live?|Où habitait-il ?`,
      `___ you work yesterday?|Did|Do|Were|Tu as travaillé hier ?
Did she ___ to London?|go|went|goes|Elle est allée à Londres ?
I didn't ___ television.|watch|watched|watches|Je n’ai pas regardé la télévision.
He didn't ___ breakfast.|have|had|has|Il n’a pas pris de petit-déjeuner.
Where did they ___?|live|lived|lives|Où habitaient-ils ?
Did you enjoy it? Yes, I ___.|did|do|was|Oui, ça m’a plu.
Did she call? No, she ___.|didn't|doesn't|wasn't|Non, elle n’a pas appelé.
We didn't ___ any milk.|buy|bought|buys|Nous n’avons pas acheté de lait.
What did he ___?|eat|ate|eats|Qu’est-ce qu’il a mangé ?
___ she at home yesterday?|Was|Did|Does|Elle était à la maison hier ?
___ Leo visit his parents?|Did|Was|Does|Leo a rendu visite à ses parents ? Passé.
Mia didn't ___ coffee.|drink|drank|drinks|Mia n’a pas bu de café.
When did your friends ___?|come|came|comes|Quand tes amis sont-ils venus ? Come = venir, came = est venu.
Did you see Ben? No, I ___.|didn't|don't|wasn't|Non, je n’ai pas vu Ben.
Where ___ they last night?|were|did|was|Où étaient-ils hier soir ?
They didn't ___ dinner at home.|have|had|has|Ils n’ont pas dîné à la maison.`)],
    'Raconte ton dernier week-end. Dis deux choses que tu as faites, une chose que tu n’as pas faite et pose une question.',
    ['Dis deux actions passées.','Formule une négation avec didn’t.','Pose une question avec did.'],
    "Last Saturday I visited my parents. We went to the beach and ate fish. I didn't work on Sunday. I watched television in the evening. What did you do last weekend?",
    'Last Saturday I {visited|visit : passé} my parents. We {went|go : passé} to the beach. My sister {had|have : passé} breakfast at home. We {ate|eat : passé} fish and {drank|drink : passé} water. I did not {watch|après did not} television. {Did|question au passé} you work? No, I {did not~didn’t~didn\'t|réponse courte négative}.',
    `Tu demandes ce que la personne a fait le week-end dernier.|What did you do last weekend?|What do you do every weekend?|What are you doing this weekend?
Tu dis que tu n’as pas travaillé hier.|I didn't work yesterday.|I don't work on Mondays.|I wasn't tired yesterday.
Tu dis que tu as acheté un téléphone.|I bought a phone.|I have a phone.|I buy phones.
Tu demandes si Anna était à la maison hier.|Was Anna at home yesterday?|Did Anna go home yesterday?|Is Anna at home today?`);
  add(23,'Envies et rendez-vous entre amis',
    ['Exprimer une envie avec want to et would like to','Proposer quelque chose avec let’s et can','Accepter ou refuser une invitation'],
    'want to=vouloir + action;would like to=voudrais + action;let’s=allons… / faisons… (proposition);meet=se retrouver;invite=inviter;party=fête;birthday=anniversaire;free=libre / disponible;busy=occupé;great=génial;sounds good=ça me va / bonne idée;sorry=désolé;another=un autre;idea=idée;plan=projet / plan;next week=la semaine prochaine;tonight=ce soir;after work=après le travail;before dinner=avant le dîner;see you=à plus tard',
    `I'd like to meet on Friday.|J’aimerais qu’on se voie vendredi.|On se voit tous les vendredis.|J’aimerais qu’on se voie jeudi.
Do you want to come?|Tu veux venir ?|Tu peux venir ?|Tu dois venir ?
Let's go to the cinema.|Allons au cinéma.|Allons au parc.|Nous allons souvent au cinéma.
Are you free tonight?|Tu es libre ce soir ?|Tu étais libre hier soir ?|Tu es libre demain matin ?
Sorry, I'm busy.|Désolé, je suis occupé.|Désolé, je suis libre.|Désolé, je suis en avance.
Friday is good for me.|Vendredi, ça me va.|Jeudi, ça me va.|Vendredi, ça ne me va pas.
Can we meet after work?|On peut se voir après le travail ?|On peut se voir avant le travail ?|On peut rester au travail ?
That sounds good.|Bonne idée.|C’est trop tard.|Ça ne marche pas.
I can't come on Saturday.|Je ne peux pas venir samedi.|Je ne peux pas venir dimanche.|Je ne veux pas venir samedi.
See you at half past six.|À six heures et demie.|À cinq heures et demie.|À six heures et quart.`,
    [topic('Want to et would like to','Devant une action souhaitée, on met want to ou would like to + forme de base : I want to go, I’d like to go.\n\nDevant un nom, pas de to : I want water.\n\nHe/she/it utilise wants ; après would, like ne change pas.\n\nWant et would like expriment un souhait ; ce ne sont pas des formes du futur.',
      `I want to meet on Friday.|Je veux qu’on se voie vendredi.
She wants to come.|Elle veut venir.
I'd like to visit London.|J’aimerais visiter Londres.`,
      `I want ___ meet on Friday.|to|for|at|Je veux qu’on se voie vendredi.
She ___ to come.|wants|want|wanting|Elle veut venir.
I'd like ___ visit London.|to|for|at|J’aimerais visiter Londres.
He would ___ to go.|like|likes|to like|Il aimerait y aller.
We want to ___ dinner.|cook|cooks|cooking|Nous voulons préparer le dîner.
Do you want to ___?|come|comes|coming|Tu veux venir ?
She doesn't ___ to go.|want|wants|wanting|Elle ne veut pas y aller.
I want ___ water.|some|to|a|Je veux de l’eau.
Would you like to ___?|dance|dances|dancing|Tu veux danser ?
He ___ to buy a ticket.|wants|want|wanting|Il veut acheter un billet.
Mia wants to ___ her parents.|visit|visits|visiting|Mia veut rendre visite à ses parents.
Leo would ___ to meet tonight.|like|likes|to like|Leo aimerait qu’on se voie ce soir.
They want ___ go to the park.|to|for|at|Ils veulent aller au parc.
Does your sister ___ to come?|want|wants|wanting|Ta sœur veut venir ?
We'd like to ___ on Monday.|meet|meets|meeting|Nous aimerions qu’on se voie lundi.
I ___ want to work tonight.|don't|doesn't|am not|Je ne veux pas travailler ce soir.`),
    topic('Proposer et réagir','Let’s veut dire let us ; avec la forme de base, il propose de faire quelque chose ensemble, comme l’impératif « allons, faisons » en français.\n\nCan we …? demande si une chose est possible ensemble.\n\nAre you free …? demande si la personne a le temps.\n\nSi tu ne peux pas venir, tu peux ajouter une autre proposition avec but.\n\nMe est la forme complément de I : for me = pour moi. Après une préposition, on ne met pas I.',
      `Let's meet after work.|Retrouvons-nous après le travail.
Can we meet on Tuesday?|On peut se voir mardi ?
Friday is good for me.|Vendredi, ça me va.`,
      `Let's ___ to the cinema.|go|goes|to go|Allons au cinéma.
Can we ___ after work?|meet|meets|to meet|On peut se voir après le travail ?
___ you free tonight?|Are|Do|Does|Tu es libre ce soir ?
Friday is good for ___.|me|I|my|Vendredi, ça me va.
I can't come on Saturday, ___ Sunday is good.|but|because|or|Je ne peux pas venir samedi, mais dimanche, ça me va.
Let's ___ dinner together.|cook|cooks|to cook|Préparons le dîner ensemble.
___ she free on Monday?|Is|Does|Do|Elle est libre lundi ?
Can we meet ___ six?|at|on|in|On peut se voir à six heures ?
Let's meet ___ Friday.|on|at|in|Voyons-nous vendredi.
That ___ good.|sounds|sound|sounding|Bonne idée.
Let's ___ our friends.|visit|visits|to visit|Rendons visite à nos amis.
Can we ___ the train?|take|takes|to take|On peut prendre le train ?
Tuesday is good for ___.|me|I|my|Mardi, ça me va.
___ your parents free tonight?|Are|Do|Does|Tes parents sont libres ce soir ?
Let's meet ___ work.|after|because|than|Retrouvons-nous après le travail.
That ___ like a good idea.|sounds|sound|sounding|Ça a l’air d’être une bonne idée.`)],
    'Invite quelqu’un à une activité commune. Donne le jour, l’heure et le lieu de rendez-vous, et demande si la personne est libre.',
    ['Propose une activité commune.','Donne le jour, l’heure et le lieu.','Demande si la personne peut venir.'],
    "Hi Ben! I'd like to go to the cinema on Friday. Are you free? Let's meet at half past six at the station. Can you come? Friday is good for me.",
    'I would {like|souhait poli} to meet on Friday. Do you want {to|devant une action} come? Let us {go|après let us : forme de base} to the cinema. {Are|question avec be : you} you free tonight? Friday is good for {me|forme complément de I}. We can meet {after|après} work. Let us meet {at|à : heure} six. That {sounds|sembler : that} good.',
    `Tu proposes de cuisiner ensemble.|Let's cook dinner together.|I cook dinner every day.|You must cook dinner.
Tu veux savoir si quelqu’un est libre.|Are you free on Friday?|Do you work every Friday?|Were you free last Friday?
Tu refuses samedi et tu proposes dimanche.|I can't come on Saturday, but Sunday is good.|I can come on Saturday, but not on Sunday.|I can't come on Saturday or Sunday.
Tu confirmes 18 h 30.|See you at half past six.|See you at half past five.|See you at quarter past six.`);
  add(24,'L’A1 au quotidien : voyage et contact',
    ['Demander et comprendre des informations en voyage','Écrire un court message avec un motif, des informations et une demande','Appliquer la grammaire connue à de nouvelles situations'],
    'reservation=réservation;reception=réception / accueil;single room=chambre simple;double room=chambre double;night=nuit;passport=passeport;address=adresse;postcode=code postal;number=numéro;arrival=arrivée;departure=départ;included=compris / inclus;available=disponible;problem=problème;confirmation=confirmation;contact=contact;information=information(s);answer=réponse;check=vérifier;stay=rester / séjour',
    `I've got a reservation.|J’ai une réservation.|Je voudrais réserver.|Je n’ai pas de réservation.
I'd like a single room.|Je voudrais une chambre simple.|Je voudrais une chambre double.|Je voudrais deux chambres.
Is breakfast included?|Le petit-déjeuner est compris ?|Le dîner est compris ?|Le petit-déjeuner est disponible ?
Can you confirm the time?|Vous pouvez confirmer l’heure ?|Vous pouvez confirmer le prix ?|Vous pouvez changer l’heure ?
My arrival is on Friday.|Mon arrivée est vendredi.|Mon départ est vendredi.|Mon arrivée est jeudi.
I stayed for two nights.|Je suis resté deux nuits.|Je reste deux nuits.|Je suis resté trois nuits.
The room was too small.|La chambre était trop petite.|La chambre est trop petite.|La chambre était trop grande.
Can you repeat the number?|Vous pouvez répéter le numéro ?|Vous pouvez épeler le nom ?|Vous pouvez changer le numéro ?
Here is my address.|Voici mon adresse.|Voici mon numéro.|Voilà mon adresse là-bas.
Please send a confirmation.|Envoyez-moi une confirmation, s’il vous plaît.|Envoyez-moi une facture, s’il vous plaît.|Envoyez-moi un message demain, s’il vous plaît.`,
    [topic('Réutiliser ce que tu sais : souhaits et informations','Tu combines des structures connues : I’d like + nom ; I’d like to + verbe ; Can you + forme de base ; Have you got …? et Is there …? .\n\nUne chambre simple se dit single room, une chambre double double room.\n\nPour une durée, on met for : for two nights = pour deux nuits.\n\nTu n’apprends pas de nouveau temps ici.',
      `I'd like a room for two nights.|Je voudrais une chambre pour deux nuits.
Can you confirm the price?|Vous pouvez confirmer le prix ?
Is there a bathroom?|Il y a une salle de bains ?`,
      `I'd like ___ single room.|a|an|the|Je voudrais une chambre simple.
I'd like ___ book a room.|to|for|at|Je voudrais réserver une chambre. Book = réserver.
Can you ___ the time?|confirm|confirms|to confirm|Vous pouvez confirmer l’heure ?
Have you ___ a reservation?|got|get|getting|Vous avez une réservation ?
___ breakfast included?|Is|Does|Are|Le petit-déjeuner est compris ?
I'd like a room ___ two nights.|for|at|on|Je voudrais une chambre pour deux nuits.
___ there a bathroom near reception?|Is|Does|Are|Il y a une salle de bains près de la réception ?
Can you ___ the number?|repeat|repeats|to repeat|Vous pouvez répéter le numéro ?
My arrival is ___ Friday.|on|in|at|Mon arrivée est vendredi.
The train leaves ___ ten.|at|on|in|Le train part à dix heures.
I'd like ___ double room.|a|an|the|Je voudrais une chambre double.
Can you ___ a confirmation?|send|sends|to send|Vous pouvez envoyer une confirmation ?
Our reservation is ___ three nights.|for|on|at|Notre réservation est pour trois nuits.
___ there two single rooms?|Are|Is|Do|Il y a deux chambres simples ?
My departure is ___ Monday.|on|in|at|Mon départ est lundi.
I'd ___ to check the address.|like|likes|to like|Je voudrais vérifier l’adresse.`),
    topic('Réutiliser ce que tu sais : aujourd’hui et hier','Avant de répondre, vérifie le moment et le type de phrase.\n\nHabitude : présent simple.\n\nEn ce moment : be + -ing.\n\nBe au passé : was/were.\n\nAction passée : prétérit ; après did, de nouveau la forme de base.\n\nLes souhaits polis restent would like.\n\nCette page résume les différences que tu as déjà apprises.\n\nAutres formes irrégulières dans les choix de réponse : take → took, send → sent.\n\nAprès didn’t et did, tu utilises toujours take et send.',
      `I usually stay here.|D’habitude, je loge ici.
I am waiting now.|Je suis en train d’attendre.
I stayed here last week.|La semaine dernière, j’ai logé ici.`,
      `The room ___ small last week.|was|were|is|La semaine dernière, la chambre était petite.
We ___ here yesterday.|were|was|are|Hier, nous étions ici.
I ___ for the bus now.|am waiting|wait|waited|Je suis en train d’attendre le bus.
She usually ___ here.|stays|is staying|stayed|D’habitude, elle loge ici.
I ___ for two nights last week.|stayed|stay|stays|La semaine dernière, je suis resté deux nuits.
Did you ___ breakfast?|have|had|has|Tu as pris ton petit-déjeuner ?
We didn't ___ the train.|take|took|takes|Nous n’avons pas pris le train. Took = a pris.
He ___ a ticket yesterday.|bought|buy|buys|Hier, il a acheté un billet.
She ___ writing an email now.|is|does|was|Elle est en train d’écrire un e-mail.
Where ___ you last night?|were|did|are|Où étais-tu hier soir ?
The hotel ___ good last year.|was|were|is|L’année dernière, l’hôtel était bien.
Mia ___ her passport yesterday.|had|has|have|Hier, Mia avait son passeport.
Leo ___ at reception right now.|is waiting|waits|waited|Leo est en train d’attendre à la réception.
They didn't ___ the room.|book|booked|books|Ils n’ont pas réservé la chambre.
Did you ___ the message?|send|sent|sends|Tu as envoyé le message ? Sent = a envoyé.
We usually ___ by train.|travel|are travelling|travelled|D’habitude, nous voyageons en train. Travel = voyager.`)],
    'Écris à un hôtel. Dis quelle chambre tu veux, ton arrivée et la durée du séjour, et demande une confirmation.',
    ['Dis quelle chambre tu veux et pour combien de temps.','Donne le jour et l’heure d’arrivée.','Demande une information et une confirmation.'],
    "Hello! I'd like a single room for two nights. My arrival is on Friday at six. Is breakfast included? Can you send a confirmation, please? My name is Anna Hill. Thank you!",
    'I would {like|souhait poli} a single room {for|pour une durée} two nights. My arrival is {on|jour} Friday {at|heure} six. {Is|question : be} breakfast included? Can you {send|envoyer, forme de base} a confirmation? Last week I {was|be, passé : I} in London. I did not {have|après did not} a reservation.',
    `Tu veux rester deux nuits dans une chambre simple.|I'd like a single room for two nights.|I'd like a double room for two nights.|I'd like a single room for three nights.
Tu demandes si le petit-déjeuner est compris.|Is breakfast included?|Is dinner included?|Is breakfast available?
Tu demandes à l’hôtel de t’envoyer une confirmation de réservation.|Please send a confirmation.|Please send the bill.|Please confirm my surname.
Tu décris une chambre trop petite, au passé.|The room was too small.|The room is too small.|The room was too big.`);
})();
