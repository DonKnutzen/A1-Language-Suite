/* Three independently authored recordings per lesson. Question labels never name
 * an answer to a different question. Voice roles are explicit, not inferred. */
(() => {
  'use strict';
  const bank={};
  const scene=(speech,rows)=>({turns:speech.split('\n').map((line,i)=>({speaker:line[0].toUpperCase(),gender:line[0]==='f'?'female':'male',text:line.slice(2)})),fields:rows.trim().split('\n').map(line=>{const[q,a,b,c,format]=line.split('|');return {label:q,answer:a.split('~')[0],accept:a.split('~').slice(1),options:[a.split('~')[0],b,c],...(format?{format}:{})};})});
  function add(id,...scenes){bank[id]=scenes;}
  add(1,
    scene('f:Hello! My name is Anna. I am from Germany. I am in London. Tom is from Canada.',`Nom de la personne qui parle|Anna|Emma|Mia
Pays d’origine de la personne qui parle|Germany|Canada|England
Ville de la personne qui parle|London|Berlin|Halifax
Pays d’origine de l’autre personne|Canada|Germany|England`),
    scene('m:Good morning! I am Ben. I am from Canada. I am in Berlin. Emma is in London.',`Comment s’appelle la personne qui parle ?|Ben|Tom|Leo
De quel pays vient-elle ?|Canada|Germany|England
Dans quelle ville est-elle ?|Berlin|London|Halifax
Dans quelle ville est l’autre personne ?|London|Berlin|Halifax`),
    scene('f:Good evening! My name is Mia. I am from Germany. I am in Halifax. Leo is from Canada.',`Comment s’appelle la personne qui parle ?|Mia|Anna|Emma
De quel pays vient-elle ?|Germany|Canada|England
Dans quelle ville est-elle ?|Halifax|London|Berlin
De quel pays vient l’autre personne ?|Canada|Germany|England`));
  add(2,
    scene('m:Hello! My first name is Tom. My surname is Hill. Hill: H, I, L, L. I am from Canada.\nf:How are you?\nm:I am fine, thank you.',`Prénom|Tom|Ben|Leo
Nom de famille|Hill|Hall|Bell
Pays d’origine|Canada|Germany|England
Comment va la personne|fine|not fine|tired`),
    scene('f:My first name is Emma. My surname is Bell. Bell: B, E, L, L. I am from Germany. I am in London.',`Quel est le prénom ?|Emma|Anna|Mia
Quel est le nom de famille épelé ?|Bell|Hill|Ball
De quel pays vient la personne ?|Germany|Canada|England
Dans quelle ville est la personne ?|London|Berlin|Halifax`),
    scene('m:My first name is Leo. My surname is Hall. Hall: H, A, L, L. I am not from Canada. I am from Germany. I am in Berlin.',`Quel est le prénom ?|Leo|Ben|Tom
Quel est le nom de famille épelé ?|Hall|Hill|Bell
De quel pays vient la personne ?|Germany|Canada|England
Dans quelle ville est la personne ?|Berlin|London|Halifax`));
  add(3,
    scene('f:I am thirty, not thirteen. My number is twenty-one. Two books and three apples are in my bag.',`Âge en chiffres|30|13|3
Numéro en chiffres|21|12|31
Nombre de livres|2|3|4
Nombre de pommes|3|2|5`),
    scene('m:I am forty, not fourteen. My number is thirty-two. Five books and two phones are in my bag.',`Quel âge a la personne ? En chiffres.|40|14|4|number
Quel est le numéro ? En chiffres.|32|23|22|number
Combien y a-t-il de livres ? En chiffres.|5|4|6|number
Combien y a-t-il de téléphones ?|2|3|5|number`),
    scene('f:I am fifteen, not fifty. My number is twelve. Four apples and six books are in my bag.',`Quel âge a la personne ? En chiffres.|15|50|5|number
Quel est le numéro ? En chiffres.|12|20|21|number
Combien y a-t-il de pommes ? En chiffres.|4|3|6|number
Combien y a-t-il de livres ?|6|4|5|number`));
  add(4,
    scene('f:My sister is Emma. She is twenty. She has a cat. My brother has a dog. My parents are in Berlin.',`Âge de la sœur|20|12|30
Animal de la sœur|cat|dog|fish
Animal du frère|dog|cat|fish
Ville des parents|Berlin|London|Halifax`),
    scene('m:My daughter is ten. My son is eight. We have a cat. My parents have a dog.',`Quel âge a la fille ? En chiffres.|10|8|12|number
Quel âge a le fils ? En chiffres.|8|10|18|number
Quel animal la personne qui parle a-t-elle avec sa famille ? En anglais.|cat~a cat|dog|fish
Quel animal ont les parents ?|dog|cat|fish`),
    scene('f:My brother is thirty. My sister is twenty-one. My brother has two children. My sister has a dog.',`Quel âge a le frère ? En chiffres.|30|13|20|number
Quel âge a la sœur ? En chiffres.|21|12|31|number
Combien d’enfants a le frère ? En chiffres.|2|3|1|number
Quel animal a la sœur ?|dog|cat|fish`));
  add(5,
    scene('m:I live in London. I work at home. I study English. I drink tea, but I like coffee.',`Lieu d’habitation|London|Berlin|Halifax
Lieu de travail|at home|in an office|in a shop
Langue apprise|English|German|French
Boisson réellement bue|tea|coffee|water`),
    scene('f:We live in Berlin. We work in an office. We study English together. We drink water at work.',`Dans quelle ville habitent les personnes ?|Berlin|London|Halifax
Où travaillent-ils ? En anglais.|in an office~an office~office|at home|in a shop
Quelle langue apprennent-ils ? En anglais.|English|German|French
Que boivent-ils au travail ?|water|tea|coffee`),
    scene('m:I live in Halifax. I work at home. I speak German. I study English because I work in Canada.',`Dans quelle ville habite la personne ?|Halifax|London|Berlin
Où travaille la personne ? En anglais.|at home~home|in an office|in a shop
Quelle langue apprend-elle ? En anglais.|English|German|French
Dans quel pays travaille-t-elle ?|Canada|Germany|England`));
  add(6,
    scene('f:My brother works in a shop. He starts early. He goes to work by bus. He watches television in the evening.',`Lieu de travail|in a shop|in an office|at home
Début du travail|early|late|at night
Moyen de transport|bus|train|car
Activité du soir|watches television|studies English|reads books`),
    scene('m:My sister teaches English. She works in London. She has breakfast at home. She finishes late.',`Quelle langue la personne enseigne-t-elle ? En anglais.|English|German|French
Dans quelle ville travaille-t-elle ?|London|Berlin|Halifax
Où prend-elle son petit-déjeuner ? En anglais.|at home~home|at work|in a café
Quand finit-elle ? Choisis la phrase.|late|early|at night`),
    scene('f:My father works in an office. He has breakfast at home. He goes to work by bus. He studies English in the evening.',`Où travaille la personne ? En anglais.|in an office~an office~office|in a shop|at home
Où prend-elle son petit-déjeuner ? En anglais.|at home~home|at work|in a café
Quel moyen de transport utilise-t-elle ? En anglais.|bus~by bus|train|car
Quelle langue apprend-elle le soir ?|English|German|French`));
  add(7,
    scene('m:I work on Monday and Tuesday. I do not work on Sunday. I drink tea, but I do not drink coffee. My sister lives in Berlin.',`Premier jour de travail mentionné|Monday|Wednesday|Sunday
Jour sans travail|Sunday|Monday|Tuesday
Boisson de la personne|tea|coffee|milk
Lieu d’habitation de la sœur|Berlin|London|Halifax`),
    scene('f:I do not work on Saturday. I work on Friday. I study English on Monday. I do not drink coffee.',`Quel jour la personne ne travaille-t-elle pas ? En anglais.|Saturday|Friday|Monday
Quel jour travaille-t-elle ? En anglais.|Friday|Sunday|Thursday
Quel jour apprend-elle l’anglais ? En anglais.|Monday|Tuesday|Wednesday
Quelle boisson ne boit-elle pas ?|coffee|tea|water`),
    scene('m:My brother does not live in London. He lives in Halifax. He works on Tuesday. He studies English on Thursday. He does not work on Sunday.',`Dans quelle ville habite la personne ?|Halifax|London|Berlin
Quel jour de travail est cité ? En anglais.|Tuesday|Thursday|Sunday
Quel jour apprend-elle l’anglais ? En anglais.|Thursday|Tuesday|Friday
Quel jour ne travaille-t-elle pas ?|Sunday|Monday|Tuesday`));
  add(8,
    scene('f:This bag is blue. It is small. These keys are new. Those shirts are white.',`Couleur du sac|blue|green|black
Taille du sac|small|big|long
État des clés|new|old|small
Couleur des chemises|white|blue|black`),
    scene('m:That table is big. It is white. These chairs are red. This phone is old.',`De quelle taille est la table ? En anglais.|big|small|short
De quelle couleur est la table ? En anglais.|white|black|blue
De quelle couleur sont les chaises ? En anglais.|red|green|white
Comment le téléphone est-il décrit ?|old|new|big`),
    scene('f:This shirt is green. It is small. Those bags are black. These books are new.',`De quelle couleur est la chemise ? En anglais.|green|blue|white
Quelle taille a la chemise ? En anglais.|small|big|long
De quelle couleur sont les sacs ? En anglais.|black|blue|red
Comment les livres sont-ils décrits ?|new|old|big`));
  add(9,
    scene('m:Yes. Our flat has two bedrooms. The kitchen is next to the bathroom. My phone is on the table. My bag is under the bed.',`Nombre de chambres|2|3|1
Pièce à côté de la cuisine|bathroom|bedroom|living room
Emplacement du téléphone|on the table|under the table|on the bed
Emplacement du sac|under the bed|on the bed|under the table`),
    scene('f:There are three rooms in our flat. The bathroom is next to the bedroom. The keys are on the chair. The bag is behind the door.',`Combien y a-t-il de pièces ? En chiffres.|3|2|4|number
Quelle pièce est à côté de la salle de bains ? En anglais.|bedroom~the bedroom|kitchen|living room
Où sont les clés ? En anglais.|on the chair~chair|under the chair|on the table
Où est le sac ?|behind the door|in front of the door|under the bed`),
    scene('m:There is one bedroom. The kitchen is opposite the bathroom. The phone is under the chair. The books are on the table.',`Combien y a-t-il de chambres ? En chiffres.|1|2|3|number
Quelle pièce est en face de la cuisine ? En anglais.|bathroom~the bathroom|bedroom|living room
Où est le téléphone ? En anglais.|under the chair|on the chair|under the bed
Où sont les livres ?|on the table|under the table|on the chair`));
  add(10,
    scene('f:Our appointment is on Thursday, not Tuesday. It is at half past nine. We meet at the office. The course starts in May.',`Jour du rendez-vous|Thursday|Tuesday|Friday
Heure du rendez-vous|9:30|8:30|9:15
Lieu de rendez-vous|office|station|café
Mois du début du cours|May|March|June`),
    scene('m:We meet on Tuesday at quarter past ten. The appointment is at the station. The course starts in September.',`Quel jour a lieu la rencontre ? En anglais.|Tuesday|Thursday|Wednesday
À quelle heure ? En chiffres, format H:MM.|10:15~quarter past ten~ten fifteen|10:45|9:15|time
Où est le lieu de rendez-vous ? En anglais.|station~the station~at the station|office|café
En quel mois commence le cours ?|September|November|December`),
    scene('f:Our appointment is on Friday at quarter to six. We meet at the café. My course starts in April.',`Quel jour est le rendez-vous ? En anglais.|Friday|Thursday|Saturday
À quelle heure l’après-midi ? En chiffres, format 24 heures H:MM.|17:45~5:45~quarter to six~five forty-five|18:15|16:45|time
Où est le lieu de rendez-vous ? En anglais.|café~cafe~the café~the cafe|office|station
En quel mois commence le cours ?|April|August|March`));
  add(11,
    scene('m:I play tennis twice a week. I swim on Sunday. I never drink coffee. I sometimes go to the cinema.',`Tennis par semaine|twice|once|three times
Jour de natation|Sunday|Saturday|Monday
Café : fréquence|never|often|always
Cinéma : fréquence|sometimes|always|never`),
    scene('f:I swim once a week, on Friday. I often cook at home. I never play football.',`Combien de fois par semaine la personne nage-t-elle ? En anglais.|once~once a week|twice|three times
Quel jour nage-t-elle ? En anglais.|Friday|Thursday|Saturday
Où cuisine-t-elle souvent ? En anglais.|at home~home|at work|at a café
Quelle activité ne fait-elle jamais ?|play football|play tennis|swim`),
    scene('m:I visit my parents twice a week. They live in Berlin. I go there on Tuesday and Saturday. I always go with my sister.',`Combien de fois par semaine la personne rend-elle visite à ses parents ? En anglais.|twice~twice a week|once|three times
Dans quelle ville habitent les parents ?|Berlin|London|Halifax
Quel deuxième jour de visite est cité ? En anglais.|Saturday|Sunday|Thursday
Avec qui la personne y va-t-elle toujours ? En anglais.|sister~my sister~his sister|brother|mother`));
  add(12,
    scene('f:I can swim, but I cannot drive. My brother can drive. Can you help me with this suitcase? Can I sit here?',`Capacité de la personne qui parle|swim|drive|sing
Qu’est-ce qu’elle ne sait pas faire ?|drive|swim|cook
Objet concerné par la demande d’aide|suitcase|phone|ticket
Demande de permission|sit here|use a phone|open a window`),
    scene('m:I can cook, but I cannot sing. My sister can sing. Please help me with this bag. Can I use your phone?',`Que sait faire la personne qui parle ? En anglais.|cook|sing|drive
Qu’est-ce qu’elle ne sait pas faire ? En anglais.|sing|cook|swim
Pour quoi a-t-elle besoin d’aide ? Objet en anglais.|bag~a bag~this bag|suitcase|ticket
Que demande-t-elle à la fin ?|use the phone|open the door|sit here`),
    scene('f:I can drive, but I cannot dance. My brother can dance. Can you open the window, please? I cannot carry this suitcase.',`Que sait faire la personne qui parle ? En anglais.|drive|dance|sing
Qu’est-ce qu’elle ne sait pas faire ? En anglais.|dance|drive|cook
Qu’est-ce qu’il faut ouvrir ? En anglais.|window~the window|door|bag
Qu’est-ce qu’elle ne peut pas porter ?|suitcase|phone|book`));
  add(13,
    scene('m:We need two bottles of milk and a kilo of potatoes. We have some eggs. We do not have any rice.',`Lait : nombre de bouteilles|2|3|1
Pommes de terre : quantité en kilos|1|2|3
Déjà disponible, d’après la personne|eggs|rice|milk
Pas disponible|rice|eggs|potatoes`),
    scene('f:Please buy three bottles of water and two kilos of tomatoes. We have some cheese, but we do not have any bread.',`Combien de bouteilles d’eau ? En chiffres.|3|2|4|number
Combien de kilos de tomates ? En chiffres.|2|3|1|number
Qu’est-ce qu’il y a déjà ? Aliment en anglais.|cheese~some cheese|bread|rice
Qu’est-ce qui manque ?|bread|cheese|tomatoes`),
    scene('m:I need six eggs and one bottle of milk. There are some apples, but there is no rice.',`Combien d’œufs ? En chiffres.|6|5|8|number
Combien de bouteilles de lait ? En chiffres.|1|2|3|number
Quel fruit y a-t-il déjà ? En anglais.|apples~some apples|bananas|oranges
Qu’est-ce qui manque ?|rice|milk|eggs`));
  add(14,
    scene('f:I would like soup without meat. I would also like a glass of water. The soup is six pounds. I can pay by card.',`Plat commandé|soup|salad|sandwich
Ingrédient non souhaité|meat|fish|cheese
Boisson|water|tea|coffee
Prix de la soupe en livres|6|8|5`),
    scene('m:I would like a sandwich with cheese. I would like tea, not coffee. The sandwich is four pounds fifty. I can pay in cash.',`Qu’est-ce qui est commandé ? Plat en anglais.|sandwich~a sandwich|salad|soup
Quel ingrédient y a-t-il dans le plat ? En anglais.|cheese|meat|fish
Combien coûte le repas en livres ? En chiffres, avec deux décimales.|4.50~4,50|4.15|5.40|number
Qu’est-ce qu’on boit ?|tea|coffee|water`),
    scene('f:I would like a salad without tomatoes. I would like a coffee. The salad is eight pounds. I can pay by card.',`Qu’est-ce qui est commandé ? Plat en anglais.|salad~a salad|sandwich|soup
Quel ingrédient n’est pas souhaité ? En anglais.|tomatoes|potatoes|cheese
Combien coûte le repas en livres ? En chiffres.|8|6|18|number
Comment paie-t-on ?|by card|in cash|by phone`));
  add(15,
    scene('m:I would like a blue jacket in size twelve. The blue jacket is thirty pounds. The red jacket is twenty pounds, but it is too small.',`Couleur souhaitée|blue|red|black
Taille souhaitée|12|10|20
Prix de la veste choisie en livres|30|13|20
Problème avec l’autre veste|too small|too big|too expensive`),
    scene('f:I would like black shoes in size six. These shoes are forty pounds. Those shoes are cheaper, but they are too big.',`Quelle couleur est souhaitée ? En anglais.|black|blue|white
Quelle taille ? En chiffres.|6|7|8|number
Combien coûte la bonne paire en livres ? En chiffres.|40|14|30|number
Quel est le problème avec l’autre paire ?|too big|too small|too expensive`),
    scene('m:I need a warm coat. The green coat is fifty pounds. It is warmer than the blue coat. I would like the green one in size ten.',`De quelle couleur est le manteau souhaité ? En anglais.|green|blue|black
Combien coûte-t-il en livres ? En chiffres.|50|15|40|number
Quelle taille est souhaitée ? En chiffres.|10|12|8|number
Pourquoi ce manteau est-il choisi ?|warmer|cheaper|smaller`));
  add(16,
    scene('f:Go straight on and turn right at the traffic lights. The station is on the left. Take bus eight to the airport. The train leaves from platform three.',`Direction à prendre aux feux|right|left|straight on
Côté de la gare|left|right|opposite
Numéro du bus pour l’aéroport|8|18|3
Quai du train|3|8|2`),
    scene('m:Turn left after the shop. The café is on the right. Take bus thirteen to the station. The train leaves from platform five.',`Dans quelle direction faut-il tourner ? En anglais.|left|right|straight on
De quel côté est le café ? En anglais.|right|left|opposite
Quel numéro de bus ? En chiffres.|13|30|3|number
Quel quai ?|5|3|4|number`),
    scene('f:Take bus twenty-one. Get off at the second stop. Turn right at the school. The airport bus leaves at half past nine.',`Quel numéro de bus est cité en premier ? En chiffres.|21|12|31|number
À quel arrêt descendre ? En anglais.|second~the second|first|third
Dans quelle direction à l’école ? En anglais.|right|left|straight on
À quelle heure part le bus pour l’aéroport ? En chiffres, format H:MM.|9:30~09:30~half past nine~nine thirty|8:30|9:15|time`));
  add(17,
    scene('m:I am waiting for the train. Anna is writing an email. Ben is talking on the phone. We are not working now.',`Qu’est-ce qu’on attend ?|train|bus|taxi
Qu’est-ce qu’Anna est en train de faire ?|writing an email|reading a book|cooking dinner
Qu’est-ce que Ben est en train de faire ?|talking on the phone|writing a message|watching television
Les personnes sont-elles en train de travailler ?|no|yes|only one`),
    scene('f:I am cooking dinner. My brother is cleaning the kitchen. My sister is writing a message. It is raining outside.',`Quel repas est en train d’être préparé ? En anglais.|dinner|breakfast|lunch
Quelle pièce est en train d’être nettoyée ? En anglais.|kitchen~the kitchen|bedroom|bathroom
Qu’est-ce qui est en train d’être écrit ? En anglais.|message~a message|email|book
Quel temps fait-il en ce moment ?|raining|snowing|sunny`),
    scene('m:I am reading a book. My friend is wearing a green shirt. She is waiting for the bus. My parents are watching television.',`Que lit la personne qui parle ? En anglais.|book~a book|email|message
De quelle couleur est la chemise ? En anglais.|green|blue|red
Qu’est-ce que l’autre personne attend ? En anglais.|bus~the bus|train|taxi
Que font les parents ?|watching television|cooking dinner|cleaning the kitchen`));
  add(18,
    scene('f:I usually work at home. Today I am working in the office. I drink tea every morning, but now I am drinking water.',`Lieu de travail habituel|at home|in the office|in a shop
Lieu de travail aujourd’hui|in the office|at home|in a café
Boisson habituelle|tea|coffee|water
Boisson du moment|water|tea|coffee`),
    scene('m:I usually go to work by bus. Today I am walking. I normally drink coffee, but right now I am drinking tea.',`Moyen de transport habituel ? En anglais.|bus~by bus|train|car
Comment la personne se déplace-t-elle aujourd’hui ? En anglais.|walking~on foot|by bus|by train
Boisson habituelle ? En anglais.|coffee|tea|water
Boisson du moment ?|tea|coffee|water`),
    scene('f:I usually read in the evening. Right now I am writing an email. I know the address, but I need the phone number.',`Activité habituelle du soir ? En anglais.|read~reading|watch television|cook
Qu’est-ce que la personne est en train d’écrire ? En anglais.|email~an email|message|book
Quelle coordonnée connaît-elle déjà ? En anglais.|address~the address|phone number|postcode
De quelle coordonnée a-t-elle besoin ?|phone number|address|postcode`));
  add(19,
    scene('m:It is cold and windy today. The blue coat is the warmest. The black coat is the cheapest. I like the blue one best.',`Température|cold|warm|hot
Autre description de la météo|windy|sunny|dry
Manteau le plus chaud|blue|black|red
Manteau le moins cher|black|blue|green`),
    scene('f:It is sunny and hot. The hotel near the beach is the most expensive. The hotel near the station is the cheapest. I like the cheapest hotel best.',`Quelle est la température ? En anglais.|hot|cold|warm
Quel temps fait-il en plus ? En anglais.|sunny|windy|cloudy
Où est l’hôtel le plus cher ? En anglais.|near the beach~the beach~beach|near the station|near the airport
Quel hôtel est choisi ?|the cheapest|the most expensive|the biggest`),
    scene('m:It is snowing today. This is the coldest day this week. The red room is the smallest. The green room is the warmest.',`Que se passe-t-il avec la météo ? En anglais.|snowing~it is snowing|raining|dry
Comment ce jour est-il décrit par rapport au reste de la semaine ? En anglais.|coldest~the coldest|warmest|hottest
De quelle couleur est la plus petite chambre ? En anglais.|red|green|blue
De quelle couleur est la chambre la plus chaude ?|green|red|blue`));
  add(20,
    scene('f:I have got a headache. My appointment is at ten. I must wait in the small room. I must not use my phone here.',`Problème de santé|headache|stomach ache|cold
Heure du rendez-vous|10:00|12:00|9:00
Lieu d’attente|small room|kitchen|outside
Interdiction|use the phone|drink water|sit here`),
    scene('m:I have got a cold. My appointment is at quarter past eleven. The doctor is in room three. I must wait outside the room.',`Quel problème de santé ? En anglais.|cold~a cold|headache|stomach ache
À quelle heure est le rendez-vous ? En chiffres, format H:MM.|11:15~quarter past eleven~eleven fifteen|11:45|10:15|time
Quel numéro de salle ? En chiffres.|3|2|4|number
Où la personne doit-elle attendre ?|outside the room|inside the room|in the kitchen`),
    scene('f:My son has got a stomach ache. His appointment is on Thursday at half past two. We must wait in room five. We must not eat here.',`Quel problème de santé ? En anglais.|stomach ache~a stomach ache~stomachache|cold|headache
Quel jour est le rendez-vous ? En anglais.|Thursday|Tuesday|Friday
Quel numéro de salle ? En chiffres.|5|3|4|number
Qu’est-ce qui est interdit ?|eat here|sit here|wait here`));
  add(21,
    scene('m:I was in London last week. The weather was cold. There was a café near the hotel. There were two beds in my room.',`Ville du séjour|London|Berlin|Halifax
Météo|cold|warm|hot
Lieu près de l’hôtel|café|school|hospital
Nombre de lits|2|1|3`),
    scene('f:I was in Berlin yesterday. I was at my sister’s house. She was tired. There were three people in the house.',`Dans quelle ville était la personne ?|Berlin|London|Halifax
Chez quel membre de sa famille était-elle ? En anglais.|sister~my sister~her sister|brother|mother
Comment allait ce membre de la famille ? En anglais.|tired|hungry|happy
Combien de personnes y avait-il dans la maison ?|3|2|4|number`),
    scene('m:We were in Halifax last month. The weather was sunny. Our hotel was near the station. There were four chairs in our room.',`Dans quelle ville étaient les personnes ?|Halifax|Berlin|London
Quel temps faisait-il ? En anglais.|sunny|cold|rainy
Près de quel endroit était l’hôtel ? En anglais.|station~the station|beach|airport
Combien de chaises y avait-il dans la chambre ?|4|3|2|number`));
  add(22,
    scene('f:On Saturday I visited my parents. We went to the beach. We ate fish. I did not work on Sunday.',`Jour de la visite|Saturday|Sunday|Friday
Destination de la sortie|beach|park|cinema
Nourriture|fish|meat|soup
Jour sans travail|Sunday|Saturday|Monday`),
    scene('m:Yesterday I went to London. I bought a jacket. I had lunch at one. In the evening I called my sister.',`Dans quelle ville la personne est-elle allée ?|London|Berlin|Halifax
Qu’est-ce qu’elle a acheté ? En anglais.|jacket~a jacket|coat|shirt
À quelle heure a-t-elle déjeuné ? En chiffres, format H:MM.|13:00~1:00~one~one o'clock|12:00|14:00|time
Qui a-t-elle appelé ?|sister|brother|father`),
    scene('f:Last Sunday I stayed at home. I cleaned the kitchen. I cooked soup. I did not watch television. I called my mother.',`Où était la personne ? En anglais.|at home~home|at work|at the beach
Quelle pièce a-t-elle nettoyée ? En anglais.|kitchen~the kitchen|bathroom|bedroom
Qu’est-ce qu’elle a cuisiné ? En anglais.|soup~some soup|rice|fish
Qui a-t-elle appelé ?|mother|father|sister`));
  add(23,
    scene('m:Yes. Would you like to go to the cinema on Friday? Let’s meet at half past six at the station. Anna cannot come, but Ben can.',`Activité proposée|cinema|tennis|dinner
Jour|Friday|Thursday|Saturday
Heure|6:30|5:30|6:15
Lieu de rendez-vous|station|café|office`),
    scene('f:Let’s cook dinner on Saturday. We can meet at seven at my house. I would like to make soup.',`Quel jour a lieu la rencontre ? En anglais.|Saturday|Sunday|Friday
À quelle heure le soir ? En chiffres, format 24 heures H:MM.|19:00~7:00~seven~seven o'clock|18:00|20:00|time
Où a lieu la rencontre ? En anglais.|at my house~my house~house~at her house|at the station|at the café
Qu’est-ce que la personne veut cuisiner ?|soup|fish|rice`),
    scene('m:I can’t come on Tuesday. Wednesday is good for me. Let’s meet at quarter past five at the café. We can go to the park after that.',`Quel jour la personne peut-elle venir ? En anglais.|Wednesday|Tuesday|Thursday
À quelle heure l’après-midi ? En chiffres, format 24 heures H:MM.|17:15~5:15~quarter past five~five fifteen|17:45|16:15|time
Où est le lieu de rendez-vous ? En anglais.|café~cafe~the café~the cafe|station|office
Où va-t-on ensuite ?|park|cinema|beach`));
  add(24,
    scene('f:I have got a reservation for a single room. My arrival is on Friday at six. I am staying for two nights. Is breakfast included?',`Type de chambre|single room|double room|two rooms
Jour d’arrivée|Friday|Thursday|Saturday
Heure d’arrivée|6:00|7:00|5:00
Nombre de nuits|2|3|1`),
    scene('m:I would like a double room for three nights. My arrival is on Monday at half past four. My surname is Hill: H, I, L, L.',`Quel type de chambre ? En anglais.|double room~a double room|single room|two single rooms
Combien de nuits ? En chiffres.|3|2|4|number
Quel jour est l’arrivée ? En anglais.|Monday|Tuesday|Sunday
Quel est le nom de famille épelé ?|Hill|Hall|Bell`),
    scene('f:My name is Anna Bell. Bell: B, E, L, L. My phone number is five, five, five, zero, one, four, eight. My postcode is B, three, J, two, K, nine. I would like a single room for one night.',`Quel est le nom de famille ?|Bell|Hill|Hall
Quel est le numéro de téléphone ? En chiffres.|5550148|5550418|5550149|phone
Quel est le code postal ?|B3J2K9~B3J 2K9|B3J2K8|B2J3K9|code
Combien de nuits sont demandées ?|1|2|3|number`));
  // The normal section mixes conversations with short personal announcements.
  // Each question uses structures already introduced by its lesson.
  const openings={
    3:'How old are you?',7:'When do you work?',8:'What colour is this bag?',
    9:'Is there a bedroom in your flat?',10:'What time is our appointment?',
    11:'How often do you play tennis?',12:'Can you swim?',13:'What do you need?',
    14:'What would you like?',15:'Can I help you?',16:'Where is the station?',
    17:'What are you doing?',18:'Where do you usually work?',
    19:'What is the weather like?',20:'Have you got an appointment?',
    21:'Where were you last week?',22:'What did you do last weekend?',
    23:'Are you free on Friday?',24:'Have you got a reservation?'
  };
  for(const [id,text]of Object.entries(openings)){
    const turns=bank[id][0].turns,gender=turns[0].gender==='female'?'male':'female';
    turns.unshift({speaker:gender==='female'?'F':'M',gender,text});
  }
  bank[1][0].turns=[
    {speaker:'F',gender:'female',text:'Hello! My name is Anna. I am from Germany. I am in London.'},
    {speaker:'M',gender:'male',text:'Hello! My name is Tom. I am from Canada.'}
  ];
  bank[1][0].fields.forEach((f,i)=>f.label=['Nom de la première personne','Pays d’origine de la première personne','Ville de la première personne','Pays d’origine de la deuxième personne'][i]);
  window.EN_A1_LISTENING=bank;
})();
