/* Original adult A1 course. French is the explanation language; English is the target.
 * Topic rows 1–10 are practice; rows 11–16 are independent transfer questions.
 * Every contrast is authored. No arbitrary words are used as distractors. */
(() => {
  'use strict';
  const lessons=[];
  const lines=s=>s.trim().split('\n').map(s=>s.trim()).filter(Boolean).map(s=>s.split('|'));
  const words=s=>s.split(';').map(s=>s.trim().split('=')).filter(p=>p.length===2);
  const topic=(title,rule,examples,rows)=>({title,rule,examples:lines(examples),rows:lines(rows)});
  function add(id,title,goals,vocabulary,phrases,topics,situation,points,model,cloze,contexts){
    lessons.push({id,title,topic:title,skills:['Écouter','Parler','Lire','Écrire'],goals,
      vocabulary:words(vocabulary),phraseRows:lines(phrases),phrases:lines(phrases).map(p=>p.slice(0,2)),topics,
      transfer:{speaking:situation,writing:'Écris '+(id<4?'15–25':'25–40')+' mots. '+situation},points,model,cloze,contexts:lines(contexts)});
  }
  add(1,'Bonjour ! Je me présente',
    ['Saluer et prendre congé','Dire son nom, son origine et où l’on est','Comprendre I, you, he, she et les formes de be'],
    'hello=bonjour / salut;good morning=bonjour (le matin);good evening=bonsoir;goodbye=au revoir;name=nom;first name=prénom;from=de (origine);Germany=Allemagne;Canada=Canada;English=anglais;German=allemand;I=je;you=tu / vous;he=il;she=elle;we=nous;they=ils / elles;be=être;in=à / dans / en;and=et',
    `Hello!|Bonjour !|Au revoir !|Bonne nuit !
Good morning!|Bonjour ! (le matin)|Bonsoir !|Bonne nuit !
Good evening!|Bonsoir !|Bonjour ! (le matin)|À demain !
My name is Anna.|Je m’appelle Anna.|Elle s’appelle Anna.|Mon nom est Emma.
I am from Germany.|Je viens d’Allemagne.|Je suis en Allemagne.|Je viens du Canada.
I am in London.|Je suis à Londres.|Je viens de Londres.|Elle est à Londres.
You are Tom.|Tu es Tom.|Il est Tom.|Nous sommes Tom et Anna.
She is from Canada.|Elle vient du Canada.|Il vient du Canada.|Elle vient d’Allemagne.
We are Anna and Tom.|Nous sommes Anna et Tom.|Ils sont Anna et Tom.|Vous êtes Anna et Tom.
Goodbye!|Au revoir !|Bonsoir !|Bonjour ! (le matin)`,
    [topic('Les pronoms personnels','I s’écrit toujours avec une majuscule. You veut dire tu ou vous ; c’est la situation qui montre qui est visé.\n\nHe = il, she = elle, it = il/elle pour une chose ou un animal. We = nous, they = ils ou elles : en anglais, they ne change pas selon le genre.\n\nComme en français, une phrase affirmative anglaise a normalement un sujet.\n\nDans My name is …, my name veut dire « mon nom » ; tu étudieras les possessifs en détail dans la leçon 4.',
      `I am Anna.|Je suis Anna.
She is Emma.|Elle est Emma.
They are Tom and Emma.|Ils sont Tom et Emma.`,
      `___ am Anna.|I|You|She|Je suis Anna.
___ are Tom.|You|He|I|Tu es Tom.
___ is Emma.|She|He|They|Elle est Emma.
___ is Ben.|He|She|We|Il est Ben.
___ are Anna and Tom.|We|I|He|Nous sommes Anna et Tom.
___ are Ben and Emma.|They|She|He|Ils sont Ben et Emma.
___ am from Germany.|I|He|We|Je viens d’Allemagne.
___ is from Canada.|She|They|I|Elle vient du Canada.
___ are in London.|We|He|She|Nous sommes à Londres.
___ is in Berlin.|He|We|They|Il est à Berlin.
___ am Mia.|I|They|He|Je suis Mia.
___ is Leo.|He|We|They|Il est Leo.
___ are Mia and Leo.|They|She|He|Ils sont Mia et Leo.
___ are in Canada.|You|He|I|Vous êtes au Canada.
___ is in Germany.|She|I|They|Elle est en Allemagne.
___ are from London.|We|He|She|Nous venons de Londres.`),
    topic('Be : am, is et are','Be veut dire « être ». Il est irrégulier : la forme dépend du sujet. Le tableau te montre les formes complètes et leurs formes contractées.\n\nIci, tu t’entraînes avec les formes complètes. Les formes contractées ont le même sens et sont surtout courantes à l’oral.\n\nAttention : pour l’origine, l’anglais dit I am from … (« je suis de … ») là où le français dit souvent « je viens de … ».',
      `I am from Germany.|Je viens d’Allemagne.
He is Tom.|Il est Tom.
We are in Canada.|Nous sommes au Canada.`,
      `I ___ Anna.|am|is|are|Je suis Anna.
You ___ Tom.|are|am|is|Tu es Tom.
He ___ Ben.|is|are|am|Il est Ben.
She ___ Emma.|is|am|are|Elle est Emma.
We ___ in London.|are|is|am|Nous sommes à Londres.
They ___ in Berlin.|are|am|is|Ils sont à Berlin.
I ___ from Canada.|am|are|is|Je viens du Canada.
You ___ from Germany.|are|is|am|Vous venez d’Allemagne.
Anna ___ in Canada.|is|are|am|Anna est au Canada.
Tom and Anna ___ in London.|are|is|am|Tom et Anna sont à Londres.
Mia ___ from Germany.|is|are|am|Mia vient d’Allemagne.
Leo and I ___ in Berlin.|are|am|is|Leo et moi sommes à Berlin.
I ___ Leo.|am|is|are|Je suis Leo.
You ___ in Canada.|are|is|am|Vous êtes au Canada.
They ___ from London.|are|am|is|Ils viennent de Londres.
He ___ from Berlin.|is|am|are|Il vient de Berlin.`)],
    'Présente-toi avec ton nom, ton origine et le lieu où tu es. Tu peux inventer les informations.',
    ['Dis ton nom.','Dis ton pays d’origine.','Dis dans quelle ville tu es.'],
    'Hello! My name is Anna. I am from Germany. I am in London. Tom is from Canada. We are in London. Goodbye!',
    'Hello! My name {is|forme de be} Anna. {I|je} am from Germany. Tom {is|forme de be} from Canada. {He|il} is in London. Emma is in London. {She|elle} is from Canada. Tom and I {are|forme de be} in London. {We|nous} are Anna and Tom. Emma and Ben are from Germany. {They|ils, plusieurs personnes} are in Canada.',
    `Tu salues quelqu’un le matin.|Good morning!|Good evening!|Goodbye!
Tu te présentes : tu t’appelles Ben.|My name is Ben.|My name is Anna.|He is Ben.
Tu dis que tu viens du Canada.|I am from Canada.|I am in Canada.|She is from Canada.
Tu prends congé.|Goodbye!|Good morning!|Good evening!`);
  add(2,'Poser des questions et épeler',
    ['Poser des questions et dire non avec be','Demander le nom et l’origine','Comprendre les lettres et faire répéter'],
    'what=que / quel;where=où / d’où;not=ne … pas;yes=oui;no=non;please=s’il te plaît / s’il vous plaît;thank you=merci;sorry=pardon / désolé;spell=épeler;repeat=répéter;slowly=lentement;letter=lettre;surname=nom de famille;again=encore une fois;correct=correct / juste;here=ici;there=là / là-bas;fine=bien (pour dire comment on va);how=comment;alphabet=alphabet;country=pays;city=ville;address=adresse',
    `What is your name?|Comment tu t’appelles ?|Comment ça va ?|Où es-tu ?
Where are you from?|D’où viens-tu ?|Où es-tu ?|Comment tu t’appelles ?
Are you from Canada?|Tu viens du Canada ?|Tu es au Canada ?|Elle vient du Canada ?
Yes, I am.|Oui, c’est moi.|Non, ce n’est pas moi.|Oui, c’est eux.
No, I am not.|Non, ce n’est pas moi.|Oui, c’est moi.|Non, ce n’est pas lui.
I am not Tom.|Je ne suis pas Tom.|Il n’est pas Tom.|Je suis Tom.
How are you?|Comment ça va ?|Comment tu t’appelles ?|Où es-tu ?
I am fine, thank you.|Je vais bien, merci.|Je ne vais pas bien, merci.|Elle va bien, merci.
Spell your name, please.|Épelle ton nom, s’il te plaît.|Répète ton nom, s’il te plaît.|Écris ton nom, s’il te plaît.
Repeat, please.|Répète, s’il te plaît.|Épelle, s’il te plaît.|Plus lentement, s’il te plaît.`,
    [topic('Questions avec be','Dans une question fermée (oui/non), am/is/are se place avant le sujet : You are → Are you? En français, on peut dire « Tu es … ? » sans inverser ; en anglais, l’inversion est obligatoire.\n\nLa réponse courte reprend be : Yes, I am. / No, I am not. Dans une réponse courte affirmative, le verbe reste en forme complète : Yes, I am, et non Yes, I’m.\n\nAprès what et where, be se place aussi avant le sujet. What is your name? demande le nom ; Where are you from? demande l’origine.\n\nYour name = ton/votre nom, her name = son nom (à elle), his name = son nom (à lui). Ces groupes de mots t’aident à poser des questions.',
      `Are you Anna?|Tu es Anna ?
Is he from Canada?|Il vient du Canada ?
Where are you from?|D’où viens-tu ?`,
      `___ you Anna?|Are|Is|Am|Tu es Anna ?
___ he Tom?|Is|Are|Am|Il est Tom ?
___ she from Canada?|Is|Am|Are|Elle vient du Canada ?
___ they in London?|Are|Is|Am|Ils sont à Londres ?
___ I correct?|Am|Are|Is|J’ai raison ?
What ___ your name?|is|are|am|Comment tu t’appelles ?
Where ___ you from?|are|is|am|D’où viens-tu ?
Are you Anna? Yes, I ___.|am|are|is|Oui, c’est moi.
Is he Tom? Yes, he ___.|is|are|am|Oui, c’est lui.
Are they here? Yes, they ___.|are|is|am|Oui, ils sont ici.
___ Mia in Berlin?|Is|Are|Am|Mia est à Berlin ?
Where ___ Leo from?|is|are|am|D’où vient Leo ?
___ we in London?|Are|Am|Is|Nous sommes à Londres ?
What ___ her name?|is|am|are|Comment elle s’appelle ?
Is Anna here? No, she ___ not.|is|are|am|Non, elle n’est pas ici.
Are you from London? No, I ___ not.|am|are|is|Non, je ne viens pas de Londres.`),
    topic('Dire non et distinguer','Avec be, not se place après le verbe : I am not ; she is not ; they are not. Il n’y a pas de deuxième mot comme « ne … pas » : un seul not suffit.\n\nIs not peut devenir isn’t, are not peut devenir aren’t. I am not devient I’m not ; en anglais standard, on ne dit pas I amn’t.\n\nWhat = que/quel, where = où/d’où et how = comment.',
      `She is not Anna.|Elle n’est pas Anna.
They are not from Germany.|Ils ne viennent pas d’Allemagne.
How are you?|Comment ça va ?`,
      `I am ___ Tom.|not|no|yes|Je ne suis pas Tom.
She ___ not from Canada.|is|are|am|Elle ne vient pas du Canada.
We ___ not in Berlin.|are|is|am|Nous ne sommes pas à Berlin.
He is not here. He ___ here.|isn't|aren't|am not|Il n’est pas ici. Utilise la forme contractée.
They are not here. They ___ here.|aren't|isn't|am not|Ils ne sont pas ici. Utilise la forme contractée.
___ is your name?|What|Where|How|Comment tu t’appelles ?
___ are you from?|Where|What|How|D’où viens-tu ?
___ are you?|How|What|Where|Comment ça va ?
I ___ not Anna.|am|is|are|Je ne suis pas Anna.
You ___ not Tom.|are|am|is|Tu n’es pas Tom.
Leo ___ not from Germany.|is|are|am|Leo ne vient pas d’Allemagne.
Mia and I ___ not in Canada.|are|is|am|Mia et moi ne sommes pas au Canada.
She is not Mia. She ___ Mia.|isn't|aren't|am not|Elle n’est pas Mia. Utilise la forme contractée.
We are not there. We ___ there.|aren't|isn't|am not|Nous ne sommes pas là-bas. Utilise la forme contractée.
___ is his name?|What|Where|How|Comment il s’appelle ?
___ is Anna from?|Where|What|How|D’où vient Anna ?`)],
    'Présente-toi, épelle ton nom de famille et demande son nom à l’autre personne.',
    ['Dis ton prénom et ton nom de famille.','Épelle ton nom de famille.','Demande le nom de l’autre personne.'],
    'Hello! My name is Ben Hill. Hill: H, I, L, L. I am from Canada. What is your name? Where are you from?',
    'Hello! {What|que / quel} is your name? My name {is|forme de be} Emma. {Are|question avec be} you from Canada? No, I {am|forme de be} not. I am from Germany. {Where|d’où} are you from? Tom is from Canada. He {is|forme de be} not from Germany. {How|comment} are you? I am fine, thank {you|merci : thank …}.',
    `Tu veux connaître le nom de quelqu’un.|What is your name?|How are you?|Where are you from?
Tu veux connaître l’origine de quelqu’un.|Where are you from?|Where are you?|What is your name?
Tu n’as pas compris le nom.|Repeat, please.|Goodbye, please.|Thank you, please.
Tu demandes à Emma si elle vient du Canada.|Are you from Canada?|You are from Canada.|Where is Canada?`);
  add(3,'Les nombres et les objets',
    ['Comprendre les nombres jusqu’à 100 et l’âge','Choisir a ou an selon le son','Distinguer le singulier et le pluriel'],
    'zero=zéro;one=un;two=deux;three=trois;four=quatre;five=cinq;six=six;seven=sept;eight=huit;nine=neuf;ten=dix;eleven=onze;twelve=douze;thirteen=treize;thirty=trente;hundred=cent;year=an / année;old=vieux / âgé;book=livre;phone=téléphone;apple=pomme;orange=orange;bag=sac;umbrella=parapluie;child=enfant;person=personne;sixteen=seize;seventeen=dix-sept;eighteen=dix-huit;nineteen=dix-neuf;twenty=vingt;forty=quarante;fifty=cinquante;sixty=soixante;seventy=soixante-dix;eighty=quatre-vingts;ninety=quatre-vingt-dix',
    `I am twenty years old.|J’ai vingt ans.|J’ai douze ans.|Il a vingt ans.
She is thirty.|Elle a trente ans.|Elle a treize ans.|Il a trente ans.
Thirteen, fourteen, fifteen.|Treize, quatorze, quinze.|Trente, quarante, cinquante.|Trois, quatre, cinq.
Thirty, forty, fifty.|Trente, quarante, cinquante.|Treize, quatorze, quinze.|Trois, quatre, cinq.
This is a book.|C’est un livre.|C’est un sac.|Ce sont des livres.
This is an apple.|C’est une pomme.|C’est une orange.|Ce sont des pommes.
Two books.|Deux livres.|Douze livres.|Deux sacs.
Three children.|Trois enfants.|Treize enfants.|Trois personnes.
My number is twenty-one.|Mon numéro est le vingt et un.|Mon numéro est le douze.|Mon numéro est le trente et un.
How old are you?|Quel âge as-tu ?|Comment ça va ?|D’où viens-tu ?`,
    [topic('A, an et l’âge avec be','A et an veulent dire un/une. The veut dire le/la/les et désigne quelque chose de précis. Quand le sens français est un/une, tu choisis ici a ou an.\n\nC’est le son suivant qui décide : a book, an apple, an umbrella. Devant une consonne prononcée, on met a ; devant une voyelle prononcée, an.\n\nAttention, piège pour les francophones : l’âge se dit avec be, pas avec have. I am twenty = j’ai vingt ans ; on ne dit jamais I have twenty.\n\nOne à nine, ten à nineteen et les dizaines s’entraînent séparément. This is … veut dire « C’est … ». De 21 à 99, un trait d’union relie les dizaines et les unités : twenty-one ; one hundred veut dire cent.',
      `a phone / an apple|un téléphone / une pomme
I am twenty-one years old.|J’ai vingt et un ans.
thirteen / thirty|treize / trente`,
      `This is ___ book.|a|an|the|C’est un livre.
This is ___ apple.|an|a|the|C’est une pomme.
This is ___ phone.|a|an|the|C’est un téléphone.
This is ___ orange.|an|a|the|C’est une orange.
This is ___ bag.|a|an|the|C’est un sac.
This is ___ umbrella.|an|a|the|C’est un parapluie.
I ___ twenty years old.|am|is|are|J’ai vingt ans.
She ___ thirty years old.|is|am|are|Elle a trente ans.
We ___ twenty-one.|are|am|is|Nous avons vingt et un ans.
He is ___.|thirteen|thirty|three|Il a treize ans.
This is ___ English book.|an|a|the|C’est un livre anglais.
This is ___ German phone.|a|an|the|C’est un téléphone allemand.
Mia ___ forty.|is|are|am|Mia a quarante ans.
Leo and Mia ___ thirty.|are|am|is|Leo et Mia ont trente ans.
My number is ___.|twenty-two|twelve|thirty-two|Mon numéro est le vingt-deux.
Anna is ___.|fifty|fifteen|five|Anna a cinquante ans.`),
    topic('Former le pluriel','Le plus souvent, on ajoute -s : book → books. Contrairement au français, ce -s final se prononce.\n\nAprès s, sh, ch et x, on ajoute en général -es : bus → buses. Après consonne + y, le y devient -ies : city → cities.\n\nCertaines formes sont irrégulières : child → children, person → people, man → men, woman → women.\n\nDevant un pluriel, on ne met pas a/an. Une apostrophe ne forme pas le pluriel : apples, et non apple’s.',
      `one book → two books|un livre → deux livres
one city → two cities|une ville → deux villes
one child → two children|un enfant → deux enfants`,
      `Two ___.|books|book|book’s|Deux livres.
Three ___.|phones|phone|phone’s|Trois téléphones.
Four ___.|bags|bag|bag’s|Quatre sacs.
Two ___.|apples|apple|apple’s|Deux pommes.
Three ___.|oranges|orange|orange’s|Trois oranges.
Two ___.|buses|bus|bus’s|Deux bus. Bus = bus.
Two ___.|cities|city’s|city|Deux villes. City = ville.
Three ___.|children|child’s|child|Trois enfants.
Four ___.|people|person’s|person|Quatre personnes. Utilise le pluriel irrégulier courant.
Two ___.|women|woman’s|woman|Deux femmes. Woman = femme.
Five ___.|umbrellas|umbrella|umbrella’s|Cinq parapluies.
Six ___.|books|book|book’s|Six livres.
Seven ___.|phones|phone|phone’s|Sept téléphones.
Two ___.|men|man’s|man|Deux hommes. Man = homme.
Five ___.|children|child’s|child|Cinq enfants.
Three ___.|cities|city’s|city|Trois villes.`)],
    'Dis ton nom et ton âge. Décris deux choses dans ton sac avec des nombres.',
    ['Dis ton nom et ton âge.','Nomme une chose au singulier.','Nomme une chose au pluriel.'],
    'Hello! My name is Emma. I am thirty years old. This is a bag. One phone and two books are in my bag.',
    'My name is Ben. I {am|forme de be} thirty years old. Emma {is|forme de be} twenty-one. This is {a|un : book} book. This is {an|une : apple} apple. Two {books|book : pluriel} are in my bag. Three {children|child : pluriel} are here. My number is {thirteen|13 en lettres}. Emma is {thirty|30 en lettres}.',
    `Tu dis ton âge : 40 ans.|I am forty.|I am fourteen.|I am four.
Tu dis le nombre 18.|eighteen|eighty|eight
Tu dis le nombre 60.|sixty|sixteen|six
Tu demandes l’âge de quelqu’un.|How old are you?|How are you?|What is your name?`);
  add(4,'La famille et ce qu’on possède',
    ['Présenter les membres de sa famille','Utiliser have et has pour la possession','Distinguer my, your, his, her, our et their'],
    'family=famille;mother=mère;father=père;parent=parent;sister=sœur;brother=frère;daughter=fille (enfant);son=fils;wife=épouse;husband=mari;friend=ami / amie;have=avoir;my=mon / ma / mes;your=ton / ta / tes / votre / vos;his=son / sa / ses (à lui);her=son / sa / ses (à elle);our=notre / nos;their=leur / leurs;car=voiture;dog=chien;cat=chat;its=son / sa / ses (chose ou animal)',
    `This is my sister.|C’est ma sœur.|C’est ma mère.|C’est ta sœur.
Her name is Emma.|Elle s’appelle Emma.|Il s’appelle Emma.|Tu t’appelles Emma.
His name is Ben.|Il s’appelle Ben.|Elle s’appelle Ben.|Je m’appelle Ben.
I have two brothers.|J’ai deux frères.|J’ai deux sœurs.|Il a deux frères.
She has a daughter.|Elle a une fille.|Elle a un fils.|Ils ont une fille.
We have a dog.|Nous avons un chien.|Ils ont un chien.|Nous avons un chat.
This is our house.|C’est notre maison.|C’est leur maison.|C’est ma maison.
Their son is ten.|Leur fils a dix ans.|Leur fils a douze ans.|Notre fille a dix ans.
My parents are in Berlin.|Mes parents sont à Berlin.|Tes parents sont à Berlin.|Mes parents viennent de Berlin.
Our family is here.|Notre famille est ici.|Leur famille est ici.|Notre famille est là-bas.`,
    [topic('Have et has','Have veut dire avoir. I, you, we et they utilisent have. He, she et it utilisent has.\n\nUn seul prénom utilise aussi has : Anna has a cat.\n\nNe confonds pas has et is : She has a daughter, mais She is a mother.\n\nThis is … veut dire « C’est … », these are … veut dire « Ce sont … ». The désigne quelque chose de précis : the cat = le chat.',
      `I have a brother.|J’ai un frère.
She has a sister.|Elle a une sœur.
We have two children.|Nous avons deux enfants.`,
      `I ___ a sister.|have|has|am|J’ai une sœur.
You ___ a brother.|have|has|are|Tu as un frère.
He ___ a daughter.|has|have|is|Il a une fille.
She ___ a son.|has|have|is|Elle a un fils.
We ___ two children.|have|has|are|Nous avons deux enfants.
They ___ a dog.|have|has|are|Ils ont un chien.
Anna ___ a cat.|has|have|is|Anna a un chat.
Ben and Emma ___ a car.|have|has|are|Ben et Emma ont une voiture.
My father ___ a phone.|has|have|is|Mon père a un téléphone.
My parents ___ a house.|have|has|are|Mes parents ont une maison.
Our son ___ a book.|has|have|is|Notre fils a un livre.
Their children ___ a dog.|have|has|are|Leurs enfants ont un chien.
I ___ a car.|have|has|am|J’ai une voiture.
Her brother ___ a cat.|has|have|is|Son frère (à elle) a un chat.
His sisters ___ a phone.|have|has|are|Ses sœurs (à lui) ont un téléphone.
You ___ three books.|have|has|are|Vous avez trois livres.`),
    topic('Les déterminants possessifs','My, your, his, her, its, our et their se placent devant le nom.\n\nGrande différence avec le français : en anglais, le possessif dépend du possesseur, pas du nom possédé. Ben → his sister (sa sœur, à lui), Emma → her brother (son frère, à elle). En français, « son/sa » s’accorde avec le nom ; en anglais, his/her s’accorde avec la personne.\n\nLa forme ne change pas au pluriel : my book / my books (mon livre / mes livres).\n\nMe veut dire me/moi et ne se place pas devant un nom ; yours s’emploie seul : This book is yours = Ce livre est à toi.\n\nIts montre la possession pour une chose ou un animal ; it’s veut dire it is.',
      `Ben has a sister. His sister is Emma.|Ben a une sœur. Sa sœur s’appelle Emma.
Emma has a brother. Her brother is Ben.|Emma a un frère. Son frère s’appelle Ben.
We have a dog. Our dog is here.|Nous avons un chien. Notre chien est ici.`,
      `This is ___ mother.|my|your|their|C’est ma mère.
This is ___ father.|your|my|our|C’est ton père.
Ben is here. ___ sister is Anna.|His|Her|Their|Ben est ici. Sa sœur s’appelle Anna.
Emma is here. ___ brother is Tom.|Her|His|Their|Emma est ici. Son frère s’appelle Tom.
We have a dog. ___ dog is here.|Our|Their|My|Nous avons un chien. Notre chien est ici.
They have a cat. ___ cat is here.|Their|Our|Your|Ils ont un chat. Leur chat est ici.
These are ___ books.|my|me|I|Ce sont mes livres. These = ces / ceux-ci.
Anna has a phone. ___ phone is here.|Her|His|Our|Anna a un téléphone. Son téléphone est ici.
Tom has a car. ___ car is here.|His|Her|Their|Tom a une voiture. Sa voiture est ici.
The cat is in ___ house.|its|it's|it|Le chat est dans sa maison. The = le/la/les.
Mia has a son. ___ son is five.|Her|His|Our|Mia a un fils. Son fils a cinq ans.
Leo has a daughter. ___ daughter is ten.|His|Her|Their|Leo a une fille. Sa fille a dix ans.
We are here. ___ parents are here.|Our|Their|Your|Nous sommes ici. Nos parents sont ici.
They are in Canada. ___ house is in Canada.|Their|Our|My|Ils sont au Canada. Leur maison est au Canada.
This is ___ sister.|your|you|yours|C’est ta sœur.
This is ___ brother.|my|I|me|C’est mon frère.`)],
    'Présente deux personnes de ta famille. Nomme une chose ou un animal qui appartient à une personne.',
    ['Présente deux membres de ta famille.','Dis un nom et un âge.','Décris une possession avec have ou has.'],
    'This is my family. My sister is Emma. She is twenty. My brother is Ben. He has a dog. His dog is in our house.',
    'This is {my|mon / ma} family. I {have|forme de have} a sister. {Her|son / sa, possesseur féminin} name is Anna. She {has|forme de have} a cat. My brother is Ben. {His|son / sa, possesseur masculin} dog is here. We {have|forme de have} two children. {Our|notre} son is ten. Anna and Ben have a house. {Their|leur, plusieurs possesseurs} house is in Berlin.',
    `Ton frère a une fille.|My brother has a daughter.|My brother has a son.|My sister has a daughter.
La voiture appartient à tes parents. Tu dis : C’est leur voiture.|This is their car.|This is our car.|This is her car.
Emma a un chien. Tu parles de son chien.|Her dog is here.|His dog is here.|Their dog is here.
Ben et toi avez un chat.|We have a cat.|They have a cat.|We have a dog.`);
  add(5,'Le quotidien : habiter, travailler, apprendre',
    ['Décrire des habitudes simples','Former le présent simple avec I/you/we/they','Relier des phrases avec and, but et because'],
    'live=habiter;work=travailler;study=apprendre / étudier;speak=parler;read=lire;eat=manger;drink=boire;like=aimer;coffee=café;tea=thé;water=eau;bread=pain;office=bureau;home=maison / chez soi;student=étudiant / étudiante;teacher=professeur / enseignant;but=mais;because=parce que;at home=à la maison;together=ensemble',
    `I live in London.|J’habite à Londres.|Je travaille à Londres.|Je viens de Londres.
We work in an office.|Nous travaillons dans un bureau.|Ils travaillent dans un bureau.|Nous étudions dans un bureau.
I study English.|J’apprends l’anglais.|Je parle anglais.|J’apprends l’allemand.
You speak German.|Tu parles allemand.|Tu apprends l’allemand.|Tu parles anglais.
They read books.|Ils lisent des livres.|Nous lisons des livres.|Ils ont des livres.
I drink tea.|Je bois du thé.|Je bois du café.|Il boit du thé.
We eat bread.|Nous mangeons du pain.|Ils mangent du pain.|Nous avons du pain.
I work at home.|Je travaille à la maison.|J’habite ici.|J’étudie à la maison.
I like tea, but I drink coffee.|J’aime le thé, mais je bois du café.|J’aime le café, mais je bois du thé.|J’aime le thé et je bois du thé.
We study together.|Nous étudions ensemble.|Ils étudient ensemble.|Nous travaillons ensemble.`,
    [topic('Présent simple : forme de base','Pour les habitudes et les faits généraux, tu utilises le présent simple.\n\nAvec I, you, we et they, on utilise la forme de base du verbe : I live, you work, we study, they speak. Bonne nouvelle : pas de terminaison différente comme en français (j’habite, nous habitons).\n\nPas de am/are en plus : I work, et non I am work.\n\nAvec he/she/it, on ajoute une terminaison ; tu verras cela ensuite.',
      `I live in Berlin.|J’habite à Berlin.
We study English.|Nous apprenons l’anglais.
They work at home.|Ils travaillent à la maison.`,
      `I ___ in London.|live|lives|living|J’habite à Londres.
You ___ in an office.|work|works|working|Tu travailles dans un bureau.
We ___ English.|study|studies|studying|Nous apprenons l’anglais.
They ___ German.|speak|speaks|speaking|Ils parlent allemand.
I ___ books.|read|reads|reading|Je lis des livres.
We ___ bread.|eat|eats|eating|Nous mangeons du pain.
You ___ tea.|drink|drinks|drinking|Tu bois du thé.
They ___ coffee.|like|likes|liking|Ils aiment le café.
I ___ at home.|work|works|working|Je travaille à la maison.
We ___ together.|study|studies|studying|Nous étudions ensemble.
You ___ in Berlin.|live|lives|living|Vous habitez à Berlin.
My parents ___ at home.|work|works|working|Mes parents travaillent à la maison.
Ben and I ___ German.|speak|speaks|speaking|Ben et moi parlons allemand.
Anna and Tom ___ tea.|drink|drinks|drinking|Anna et Tom boivent du thé.
I ___ English books.|read|reads|reading|Je lis des livres anglais.
They ___ bread at home.|eat|eats|eating|Ils mangent du pain à la maison.`),
    topic('And, but et because','And ajoute une information, but montre une opposition, because donne une raison.\n\nAprès because, l’ordre anglais reste sujet + verbe : because I work here.\n\nPour un métier avec be, on met en général a/an : I am a teacher. En français, on dit « je suis professeur » sans article ; en anglais, l’article est obligatoire. Pour une nationalité, pas d’article : I am German.',
      `I work and I study.|Je travaille et j’étudie.
I like tea, but I drink coffee.|J’aime le thé, mais je bois du café.
I am here because I work here.|Je suis ici parce que je travaille ici.`,
      `I work ___ I study.|and|but|because|Je travaille et j’étudie.
I like coffee, ___ I drink tea.|but|and|because|J’aime le café, mais je bois du thé.
I am here ___ I work here.|because|but|and|Je suis ici parce que je travaille ici.
I am ___ teacher.|a|an|the|Je suis professeur.
She is ___ English teacher.|an|a|the|Elle est professeure d’anglais.
We speak German ___ English.|and|because|but|Nous parlons allemand et anglais.
They live here, ___ they work in Berlin.|but|because|and|Ils habitent ici, mais ils travaillent à Berlin.
I drink water ___ I like water.|because|but|and|Je bois de l’eau parce que j’aime l’eau.
He is ___ student.|a|an|the|Il est étudiant.
I study English ___ I work in London.|because|but|and|J’apprends l’anglais parce que je travaille à Londres.
You work ___ you study.|and|because|but|Tu travailles et tu étudies.
We like tea, ___ we drink water.|but|and|because|Nous aimons le thé, mais nous buvons de l’eau.
They study English ___ they live in Canada.|because|and|but|Ils apprennent l’anglais parce qu’ils habitent au Canada.
Ben is ___ teacher.|a|an|the|Ben est professeur.
Emma is ___ English student.|an|a|the|Emma est étudiante en anglais.
I read ___ I like books.|because|and|but|Je lis parce que j’aime les livres.`)],
    'Décris ton quotidien : où tu habites, ton travail ou tes études et une boisson que tu aimes.',
    ['Dis où tu habites et ce que tu fais.','Nomme une boisson.','Relie deux phrases avec and, but ou because.'],
    'I live in London. I work in an office and I study English. I like coffee, but I drink tea at home. We study together.',
    'I {live|habiter : I} in Berlin. I {work|travailler : I} at home {and|et} I study English. My parents {speak|parler : they} German. We {read|lire : we} books together. I like coffee, {but|mais} I drink tea. I am here {because|parce que} I work here. We {study|étudier : we} English together.',
    `Tu dis où tu habites.|I live in Berlin.|I work in Berlin.|I am from Berlin.
Tu dis : J’apprends l’anglais.|I study English.|I speak English.|I study German.
Tu aimes le café, mais tu bois du thé.|I like coffee, but I drink tea.|I like tea, but I drink coffee.|I drink coffee because I like tea.
Tu dis ton métier : professeur.|I am a teacher.|I have a teacher.|I study with a teacher.`);
  add(6,'Décrire d’autres personnes',
    ['Décrire les habitudes des autres','Former les terminaisons -s, -es et -ies','Distinguer be, have et les verbes d’action'],
    'go=aller;watch=regarder;wash=laver;finish=finir;start=commencer;teach=enseigner;do=faire;bus=bus;school=école;shop=magasin;breakfast=petit-déjeuner;dinner=dîner;television=télévision;every day=tous les jours;morning=matin;evening=soir;job=métier / travail;early=tôt;late=tard;at night=la nuit',
    `She works in a shop.|Elle travaille dans un magasin.|Elle travaille dans une école.|Elle habite dans un magasin.
He lives in Berlin.|Il habite à Berlin.|Il travaille à Berlin.|Elle habite à Berlin.
She studies English.|Elle apprend l’anglais.|Elle enseigne l’anglais.|Elle parle anglais.
He goes to work by bus.|Il va au travail en bus.|Il va au travail en train.|Il va au travail à pied.
She watches television.|Elle regarde la télévision.|Elle lit un livre.|Elle travaille devant la télévision.
He washes the car.|Il lave la voiture.|Il a la voiture.|Il conduit la voiture.
She teaches English.|Elle enseigne l’anglais.|Elle apprend l’anglais.|Elle parle anglais.
He has breakfast at home.|Il prend son petit-déjeuner à la maison.|Il dîne à la maison.|Il travaille à la maison.
She starts early.|Elle commence tôt.|Elle finit tôt.|Elle commence tard.
He finishes late.|Il finit tard.|Il commence tard.|Il finit tôt.`,
    [topic('He, she, it : la règle du -s','Au présent simple, he, she, it et un seul prénom prennent en général un -s : work → works. Ce -s se prononce, contrairement au -s muet du français.\n\nAprès -s, -sh, -ch, -x et souvent -o, on ajoute -es : watches, washes, goes, does.\n\nAprès consonne + y, le y devient -ies : study → studies.\n\nAprès voyelle + y, seulement -s : play → plays.',
      `I work. She works.|Je travaille. Elle travaille.
I watch television. He watches television.|Je regarde la télévision. Il regarde la télévision.
I study English. Anna studies English.|J’apprends l’anglais. Anna apprend l’anglais.`,
      `She ___ in an office.|works|work|working|Elle travaille dans un bureau.
He ___ in London.|lives|live|living|Il habite à Londres.
Emma ___ English.|studies|studying|study|Emma apprend l’anglais.
Ben ___ television.|watches|watching|watch|Ben regarde la télévision.
She ___ the car.|washes|washing|wash|Elle lave la voiture.
He ___ to work.|goes|going|go|Il va au travail.
Anna ___ English.|teaches|teaching|teach|Anna enseigne l’anglais.
Tom ___ early.|starts|start|starting|Tom commence tôt.
She ___ late.|finishes|finishing|finish|Elle finit tard.
He ___ his work.|does|doing|do|Il fait son travail.
My sister ___ German.|studies|studying|study|Ma sœur apprend l’allemand.
Her father ___ in a shop.|works|work|working|Son père (à elle) travaille dans un magasin.
Our son ___ television.|watches|watching|watch|Notre fils regarde la télévision.
Their mother ___ English.|teaches|teaching|teach|Leur mère enseigne l’anglais.
My brother ___ the car.|washes|washing|wash|Mon frère lave la voiture.
Mia ___ to school.|goes|going|go|Mia va à l’école.`),
    topic('Be, have et les autres verbes','Be décrit l’identité et l’état : She is a teacher.\n\nHave décrit la possession, mais aussi des expressions figées comme have breakfast = prendre le petit-déjeuner.\n\nLes actions utilisent leur propre verbe : She teaches English.\n\nDans une phrase normale au présent simple, il n’y a pas de is en plus devant works, lives ou studies.\n\nExpressions figées : go to work = aller au travail, by bus = en bus, in the evening = le soir.',
      `She is a teacher.|Elle est professeure.
She has a job.|Elle a un travail.
She teaches English.|Elle enseigne l’anglais.`,
      `Anna ___ a teacher.|is|has|teaches|Anna est professeure.
Ben ___ a car.|has|is|works|Ben a une voiture.
Emma ___ English.|teaches|is|has|Emma enseigne l’anglais.
Tom ___ breakfast at home.|has|is|goes|Tom prend son petit-déjeuner à la maison.
She ___ from Germany.|is|has|lives|Elle vient d’Allemagne.
He ___ in Canada.|lives|has|is from|Il habite au Canada.
My father ___ a phone.|has|is|goes|Mon père a un téléphone.
My mother ___ in a shop.|works|has|teaches|Ma mère travaille dans un magasin.
She ___ thirty.|is|has|works|Elle a trente ans.
He ___ dinner at home.|has|is|goes|Il dîne à la maison.
Leo ___ a student.|is|has|studies|Leo est étudiant.
Mia ___ a brother.|has|is|lives|Mia a un frère.
Her brother ___ German.|speaks|is|has|Son frère (à elle) parle allemand.
Our daughter ___ at home.|studies|has|is from|Notre fille étudie à la maison.
Their son ___ twenty.|is|has|goes|Leur fils a vingt ans.
My sister ___ dinner early.|has|is|goes|Ma sœur dîne tôt.`)],
    'Décris le quotidien d’une personne : son activité, son lieu de travail et une habitude du matin ou du soir.',
    ['Présente la personne.','Décris son activité et le lieu.','Nomme une autre habitude.'],
    'My sister is Emma. She is a teacher. She teaches English in London. She starts early and has breakfast at home. She watches television in the evening.',
    'My brother {is|forme de be} Ben. He {has|forme de have} a job in London. He {works|travailler : he} in a shop. He {goes|aller : he} to work by bus. He {has|have breakfast} breakfast at home. My sister {studies|étudier : she} English. She {watches|regarder : she} television in the evening. She {finishes|finir : she} work late.',
    `Anna enseigne l’anglais. Tu décris son activité.|She teaches English.|She studies English.|She speaks English at home.
Tu dis que Ben finit le travail tard.|He finishes late.|He starts late.|He finishes early.
Tu décris le petit-déjeuner à la maison.|She has breakfast at home.|She has dinner at home.|She works at home.
Tu dis que ton frère habite au Canada.|My brother lives in Canada.|My brother is from Canada.|My brother works in Canada.`);

  lessons[0].topics[1].formTable={
    caption:'Be au présent simple',
    headings:['Sens','Forme complète','Forme contractée'],
    rows:[['je suis','I am','I’m'],['tu es / vous êtes','you are','you’re'],['il est','he is','he’s'],['elle est','she is','she’s'],['il/elle est (chose, animal)','it is','it’s'],['nous sommes','we are','we’re'],['ils/elles sont','they are','they’re']]
  };
  window.EN_A1_AUTHORING={lessons,add,topic};
})();
