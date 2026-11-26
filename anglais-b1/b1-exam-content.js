/* Original Cambridge-oriented format practice. Adaptations are named in the UI. */
(() => {
const packs=[];
const choice=(q,answer,wrong,why)=>({q,answer,options:[answer,...wrong],why});
const gap=(q,answer,why,accept=[])=>({q,answer,accept,why});
const add=(id,title,instructions,text,questions,audio=[])=>packs.push({id,version:['r1','r4','l2','l3'].includes(id)?2:1,title,instructions,text,questions,audio});
add('r1','Reading 1 · Kurze Mitteilungen','Lis chaque message et choisis son idée principale.','',[
choice('Library notice: Return books through the side entrance while repairs continue. The main doors are closed.','Use a different entrance to return books.',['Keep all books until repairs end.','The entire library service has stopped.'],'L’affiche indique une autre entrée, pas la fin des retours.'),
choice('Hi Jo, I can collect you from the station if your train arrives before six. Otherwise, please take a taxi.','Jo needs another way to travel if the train arrives late.',['Jo must take a taxi at any arrival time.','The sender cannot collect Jo before six.'],'Le transfert dépend explicitement de l’heure d’arrivée.'),
choice('Workshop: Materials provided. Bring clothes you do not mind getting dirty.','Participants should wear suitable clothes.',['Participants must buy their own materials.','Only dirty clothes will be accepted.'],'Le matériel est fourni ; la demande concerne les vêtements de travail.'),
choice('Tickets bought online include entry to the garden, but guided tours must be booked separately.','A guided tour requires an additional booking.',['Online tickets exclude the garden.','Every ticket includes a guided tour.'],'Réserver séparément ne veut pas forcément dire un supplément précis.'),
choice('Sam, I have left your parcel with Noor next door. Please collect it before she leaves on Friday.','Sam should get the parcel before the neighbour leaves on Friday.',['The parcel will arrive after Friday.','Noor needs Sam to post the parcel.'],'Le colis a déjà été déposé chez la voisine.')]);
const offers=`A · Riverside Art: Saturday mornings, painting outdoors, all materials supplied. Beginners welcome. £12 per meeting. No indoor alternative in rain.
B · Library Conversation: Tuesday evenings, free English speaking practice for intermediate adults. Step-free access. No written homework.
C · Fast Fitness: Daily lunchtime running group for experienced runners. Free. Routes include steep hills.
D · Kitchen Together: Sunday afternoons, vegetarian cooking for beginners. Work in pairs. Ingredients included in the £15 fee.
E · Online Writing: Thursday evenings, B1 emails and stories with tutor feedback. £20 monthly. Recordings available after meetings.
F · Advanced Art: Wednesday afternoons, professional portfolio preparation. Own materials required. £40 per meeting.
G · Gentle Walks: Monday mornings, short flat routes with regular rest stops. Free. Led by a local volunteer.
H · City History: Friday evenings, expert lectures followed by questions. £8. Requires confident listening; no language teaching.`;
const match=(q,a,why)=>({...choice(q,a,['A','B','C','D','E','F','G','H'].filter(x=>x!==a),why),unique:true});
add('r2','Reading 2 · Passende Angebote','Associe à chaque personne l’offre qui répond à TOUS ses critères. Tu peux consulter les huit offres plusieurs fois.',offers,[
match('Lena works by day, needs free intermediate speaking practice and uses a wheelchair.','B','Seule l’offre B combine horaire du soir, gratuité, entraînement à l’oral et accès sans marches.'),
match('Omar wants feedback on B1 writing after work and sometimes misses live meetings.','E','E propose des retours sur l’écrit et des enregistrements le soir.'),
match('Pia is free on Sunday afternoons and wants to learn vegetarian cooking with someone else.','D','D correspond au jour, au niveau, au thème et au travail en groupe.'),
match('Ray is a beginner who can pay a small fee and wants to paint outside at weekends.','A','A est une offre pour débutants, en plein air, le samedi.'),
match('Bo wants a free weekday-morning walk, cannot manage hills and needs breaks.','G','G propose des parcours courts et plats avec des pauses le lundi matin.')]);
const long=`When I moved to a new town, I thought joining a community project would be a quick way to make friends. A neighbour suggested the repair café, where volunteers help people mend everyday objects. I imagined friendly conversations over coffee. On my first visit, however, everyone seemed too busy to talk. I stood beside a table for twenty minutes and went home feeling that I didn't belong.

A week later, the organiser phoned to ask why I hadn't returned. I explained how I had felt. She was surprised: the team had assumed I was confidently observing because I hadn't asked for a task. She invited me to try again, this time helping her welcome visitors. I agreed, though I wasn't expecting much.

At the entrance, I soon discovered that many visitors felt as uncertain as I did. Some were embarrassed about bringing a cheap broken object. Others worried that they would be expected to repair it themselves. I could explain that the point was to learn together, not to prove anything. It was easier to talk when I had a useful role.

Over the next few months, I learned simple repairs and got to know the team. I still don't understand every tool, and I probably never will. That no longer bothers me. The café needs people who can listen and organise as much as people who can fix machines.

I used to think a welcoming group would notice every newcomer immediately. Now I understand that friendly people can still miss someone who needs help. Our team has introduced a named welcome volunteer for each session. I am glad I returned, but I am also glad I explained what had gone wrong. Giving a place a second chance shouldn't mean pretending the first experience was perfect.`;
add('r3','Reading 3 · Texte long','Lis le témoignage. Fais attention aux détails, à l’évolution et à l’attitude de l’auteur.',long,[
choice('Why did the writer first join?','To make social connections',['To prove technical expertise','To find paid work'],'Le but de départ était de se faire de nouveaux amis.'),
choice('What caused the first misunderstanding?','The team misinterpreted the writer’s silence',['The organiser refused help','The writer criticised the tools'],'Das stille Beobachten wurde als Selbstsicherheit verstanden.'),
choice('Why did the entrance role help?','It provided a clear purpose for conversation',['It avoided all contact with visitors','It required advanced repair skills'],'Une tâche utile et concrète a facilité les conversations.'),
choice('How does the writer now feel about limited technical knowledge?','It does not prevent a valuable contribution',['It makes volunteering pointless','It must be hidden from everyone'],'On a aussi besoin d’organisation et d’écoute.'),
choice('Which statement best represents the writer’s final view?','Trying again and giving honest feedback can improve a group',['Every bad experience should be ignored','Newcomers alone are responsible for feeling welcome'],'Le texte relie la seconde chance et le retour justifié.')]);
const sentences=[
'A · This made it difficult for people who worked during the day to attend.',
'B · The new time was popular, but it created a different problem.',
'C · To solve this, members began working in pairs.',
'D · Seeing those examples helped beginners feel less nervous.',
'E · That is why the group now asks for feedback after every session.',
'F · The building had been demolished ten years earlier.',
'G · Nobody in the town had ever used a camera.',
'H · She therefore sold all the books immediately.'
];
add('r4','Reading 4 · Phrases manquantes','Choisis pour chaque trou une phrase parmi A–H. Trois phrases restent inutilisées.',
`Our photography club originally met at two on Wednesday afternoons. [1] We therefore moved the meetings to the evening. [2] The room was now too crowded for the tutor to help everyone individually. [3] Experienced photographers could then explain simple techniques while the tutor discussed harder questions.
We also put a selection of early attempts beside finished pictures. [4] They could see that progress usually involved mistakes. Not every change worked immediately, and members sometimes had different needs. [5] We have learned that a useful club keeps listening rather than assuming one arrangement will suit everyone forever.

${sentences.join('\n')}`,
['A','B','C','D','E'].map((a,i)=>choice('Trou '+(i+1),a,['A','B','C','D','E','F','G','H'].filter(x=>x!==a),[
'Le moment de la journée explique directement les difficultés des personnes qui travaillent.',
'The new time renvoie au soir ; ensuite vient le nouveau problème de salle.',
'This renvoie au manque d’accompagnement individuel ; le travail en binôme le résout.',
'Those examples renvoie aux premières images et aux images finies qui ont été montrées.',
'That is why relie les besoins différents à des retours réguliers.'
][i])));
add('r5','Reading 5 · Choix du mot en contexte','Choisis le mot qui convient par son sens et par l’expression figée.',
'Last year I decided to [1] part in a local project. At first, I found it difficult to [2] a decision about my role. A volunteer gave me useful [3] and suggested helping at reception. I soon [4] progress because I practised every week. Now I look [5] to each meeting. The experience has had a positive [6] on my confidence.',[
choice('Trou 1','take',['make','do','give'],'take part in = teilnehmen an'),
choice('Trou 2','make',['do','get','hold'],'make a decision = prendre une décision'),
choice('Trou 3','advice',['advise','advices','advising'],'Advice est ici un nom indénombrable ; advise est un verbe.'),
choice('Trou 4','made',['did','took','gave'],'make progress = Fortschritte machen'),
choice('Trou 5','forward',['ahead','after','around'],'look forward to = sich freuen auf'),
choice('Trou 6','effect',['effort','event','affect'],'Have an effect on = avoir un effet sur ; affect est ici le verbe.')]);
add('r6','Reading 6 · Un mot par trou','Écris exactement UN mot par trou. Fais attention à la structure et au contexte.',
'I have lived here [1] 2022. At first, I did not know [2] to meet people. A neighbour invited me to a group [3] meets every Friday. I was nervous, [4] everyone was friendly. If I stayed at home every week, I [5] not know them now. I look forward [6] seeing them each week.',[
gap('Trou 1','since','Avec un point de départ, on utilise since.'),
gap('Trou 2','how','How to meet people = wie man Leute kennenlernen kann.', ['where']),
gap('Trou 3','which','Le pronom relatif est le sujet qui reprend group.', ['that']),
gap('Trou 4','but','L’opposition relie deux propositions principales.', ['yet']),
gap('Trou 5','would','Résultat hypothétique au présent : would not know.'),
gap('Trou 6','to','Feste Verbindung look forward to.')]);
const visual=[
['How will they travel?','m:I planned to drive, but the car is being repaired. The train would be faster, yet the station is too far away. We have decided to take the bus from outside the library.','🚌 Bus','🚆 Train','🚗 Car','La décision finale, c’est le bus.'],
['What will she bring?','f:I was going to bake a cake, but I haven’t got enough time. They already have plenty of bread. I’ll take some apples from our garden instead.','🍎 Apples','🍰 Cake','🍞 Bread','Instead marque le vrai changement : des pommes.'],
['Where will they meet?','m:The café is closed today. Let’s meet outside the library rather than at the cinema, because it’s nearer the bus stop.','📚 Library','☕ Café','🎬 Cinema','Le nouveau lieu de rendez-vous est devant la bibliothèque.'],
['What activity did he choose?','m:I considered swimming, but the pool was crowded. Running felt too tiring after work, so I went for a gentle cycle ride by the river.','🚲 Cycling','🏊 Swimming','🏃 Running','Il raconte la balade à vélo réellement choisie.'],
['What did she buy?','f:The umbrella looked useful, but I already had one. I tried on a hat, then realised I needed gloves more. I bought the warmest pair.','🧤 Gloves','☂️ Umbrella','👒 Hat','A pair renvoie ici aux gants dont on a besoin en dernier.'],
['Which animal was in the garden?','m:I heard a noise and expected to see the neighbour’s dog. It wasn’t the cat either. A fox was standing beside the shed before it ran away.','🦊 Fox','🐕 Dog','🐈 Cat','Le chien et le chat sont exclus.'],
['What is the weather like now?','f:It rained all morning, and snow is possible tonight. At the moment the clouds have cleared and there’s bright sunshine, so let’s go out now.','☀️ Sunny','🌧️ Rainy','🌨️ Snowy','La question porte sur maintenant, pas sur le matin ni la nuit.']
];
add('l1','Listening 1 · Courtes situations d’écoute','Sept textes courts. Ici, des symboles légendés remplacent les images de l’examen. Tu peux lancer chaque enregistrement deux fois.','',visual.map(([q,,a,b,c,why],audioIndex)=>({...choice(q,a,[b,c],why),audioIndex})),visual.map(([,s])=>s));
const selected=[13,14,15,16,17,18].map(id=>window.EN_B1_SKILLS.scenes[id][0]);
add('l2','Listening 2 · Sens et intention','Six courts enregistrements du cours. Choisis la phrase qui convient. Les enregistrements repris du cours servent à s’entraîner au format, pas de test d’examen indépendant.','',selected.map((s,i)=>({...choice(s.fields[0].label,s.fields[0].answer,s.fields[0].options.slice(1),'La réponse découle de l’enregistrement correspondant.'),audioIndex:i})),selected.map(s=>s.turns));
add('l3','Listening 3 · Compléter des notes','Écoute l’annonce deux fois. Complète avec des informations courtes ; tu peux écrire les nombres en chiffres.','Community repair afternoon · Information sheet',[
gap('Day of the event','Saturday','Le jour actuel de l’événement est samedi.'),
gap('Place: community ...','hall','Il a lieu dans la community hall.'),
gap('Starting time','10:30','Der Beginn wurde von zehn auf halb elf verschoben.',['10.30','half past ten','ten thirty']),
gap('If available, bring proof of ... for electrical items','purchase','Kaufbeleg: proof of purchase.'),
gap('Maximum number of items per person','two','Deux objets par personne.',['2']),
gap('Register by','Thursday','Die Anmeldung endet Donnerstag.')],
['f:Here is the final information for our repair afternoon. It will take place on Saturday, not Sunday as first advertised. We are using the community hall because the library is being painted. Doors will open at half past ten; the earlier announcement said ten, but volunteers need more preparation time. If you bring an electrical item, please bring proof of purchase if you still have it. We cannot promise a repair, but we can often explain the problem. Each person may bring a maximum of two items so everyone has a fair chance. There is no entry charge, although donations are welcome. Please register by Thursday. That gives us Friday to arrange the right tools and volunteers. You can register by phone or through the community centre website.']);
add('l4','Listening 4 · Interview et attitude','Écoute l’interview deux fois et fais attention aux raisons, aux sentiments et aux changements d’avis.','Interview: A new walking group',[
choice('Why did Nina first join?','To meet local people',['To train for a race','To learn to read maps'],'Elle parle de nouvelles rencontres, pas de compétition ni de lecture de carte.'),
choice('What surprised her on the first walk?','The relaxed pace',['The expensive equipment','The large distance'],'Elle s’attendait à un rythme plus rapide.'),
choice('Why did she almost stop?','She worried about asking others to wait',['She disliked everyone','She moved abroad'],'Sie hatte Sorge, andere aufzuhalten.'),
choice('What helped her continue?','The leader explained the group’s purpose',['She bought a faster bicycle','A friend paid her to stay'],'L’explication selon laquelle le groupe compte a changé son point de vue.'),
choice('What has she learned about equipment?','Basic suitable items are enough',['The newest equipment is essential','Equipment never matters'],'Elle cite des chaussures adaptées et une protection contre la météo, mais pas de produits chers.'),
choice('What does she recommend to newcomers?','Explain what support they need',['Pretend to be experienced','Avoid asking questions'],'Une communication ouverte permet un soutien adapté.')],
['m:Why did you join the walking group, Nina?\nf:I had just moved here and wanted to meet people. I wasn’t training for anything. I expected everyone to walk quickly, so the relaxed pace surprised me.\nm:Did you feel comfortable straight away?\nf:Not entirely. On the second walk I needed more breaks and worried that I was making everyone wait. I almost stopped going. But the leader explained that the group existed to help people enjoy being outside together, not to finish first.\nm:Did that change your view?\nf:Yes. I realised I could say what I needed instead of pretending I was fine. Other members then admitted they liked the breaks too.\nm:Do people need much equipment?\nf:Suitable shoes and something for the weather matter. But you don’t need the newest or most expensive things. I borrowed a jacket for the first month.\nm:What would you say to a new member?\nf:Tell the leader about any worries. You don’t need to apologise for being new. A useful group can only support people when it understands what they need.']);
window.EN_B1_EXAM={packs};
})();
