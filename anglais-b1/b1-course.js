/* Original B1 curriculum. Internal EN_A1 names preserve the proven UI contracts;
   storage and cloud identity are independently versioned as English B1 for French speakers. */
(() => {
  'use strict';
  const lessons=[];
  const rows=s=>s.trim().split('\n').map(x=>x.trim().split('|'));
  const topic=(title,rule,data)=>({title,rule,rows:rows(data),examples:rows(data).slice(0,3).map(([q,a,,,m])=>[q.replace('___',a),m])});
  function add(id,title,goals,words,phrases,topics,contexts,cloze){
    const pairs=rows(phrases), meanings=pairs.map(p=>p[1]);
    lessons.push({id,title,topic:title,skills:['Écouter','Parler','Lire','Écrire'],goals:goals.split('|'),
      vocabulary:words.split(';').map(x=>x.split('=')),phrases:pairs,
      phraseRows:pairs.map(([p,m],i)=>[p,m,meanings[(i+1)%pairs.length],meanings[(i+2)%pairs.length]]),
      topics,contexts:rows(contexts),cloze});
  }
  add(1,'Ma vie, mes centres d’intérêt',
  'Distinguer les habitudes et les activités temporaires|Décrire ses centres d’intérêt et donner des raisons|Rédiger un profil personnel cohérent',
  'be keen on=être passionné par;be interested in=s’intéresser à;currently=actuellement;usually=d’habitude;occasionally=de temps en temps;rarely=rarement;neighbourhood=quartier;belong to=appartenir à / faire partie de;join=s’inscrire à / rejoindre;improve=s’améliorer;although=bien que;however=cependant;therefore=par conséquent;while=pendant que;prefer=préférer;experience=expérience;confident=sûr de soi;challenge=défi;regularly=régulièrement;temporary=temporaire',
  `I'm keen on live music.|Je suis passionné de musique live.
  I'm currently taking a course.|Je suis actuellement un cours.
  I usually work from home.|D’habitude, je travaille de chez moi.
  Although it's difficult, I enjoy it.|Bien que ce soit difficile, ça me plaît.
  What do you do in your free time?|Qu’est-ce que tu fais pendant ton temps libre ?
  I'd like to become more confident.|J’aimerais avoir plus confiance en moi.`,
  [topic('Habitude ou en ce moment ?',`Le present simple décrit des habitudes et des états : I work ; she works. Le present continuous (am/is/are + -ing) décrit des actions en cours ou temporaires. Le français utilise souvent le même présent pour les deux (« je travaille ») ; en anglais, il faut choisir. Les mots indicateurs aident, mais c’est le sens qui décide. Les verbes d’état comme know, want et belong ne s’emploient normalement pas à la forme progressive.\n\nQuestions : Do you work? / Are you working? Négation : she does not work / she is not working.`,
  `I usually ___ at seven.|start|am starting|starts|D’habitude, je commence à sept heures.
  This week she ___ from home.|is working|worked|working|Cette semaine, elle travaille temporairement de chez elle.
  My brother ___ to a running club.|belongs|is belonging|belong|Mon frère fait partie d’un club de course.
  Listen! Someone ___ the piano.|is playing|play|played|Écoute ! Quelqu’un est en train de jouer du piano.
  How often ___ you exercise?|do|are|does|Tu fais du sport à quelle fréquence ?
  I ___ what you mean.|understand|am understanding|understands|Je comprends ce que tu veux dire.
  At the moment we ___ for a concert.|are practising|practises|practised|En ce moment, nous répétons pour un concert.
  Rosa ___ the bus every morning.|takes|is take|take|Rosa prend le bus tous les matins.
  ___ he studying right now?|Is|Does|Do|Est-ce qu’il est en train d’étudier ?
  We ___ any help right now.|do not need|are not needing|does not need|Nous n’avons pas besoin d’aide pour le moment.`),
  topic('Cause, opposition et conséquence',`Because introduit une cause ; so une conséquence. Although relie une opposition avec une proposition complète, comme « bien que » (mais sans subjonctif en anglais). However est un adverbe de phrase : on sépare deux phrases indépendantes par un point ou un point-virgule.\n\nAprès because, on met sujet + verbe ; après because of, un groupe nominal (« à cause de »). Évite although … but dans la même phrase. Ainsi, tu relies clairement tes idées au lieu d’aligner des phrases isolées.`,
  `I practise ___ I want to improve.|because|although|so|Je m’entraîne parce que je veux progresser.
  ___ it was raining, we went out.|Although|Because of|Despite of|Bien qu’il pleuve, nous sommes sortis.
  The club was full, ___ we tried another one.|so|because|although|Le club était complet, alors nous en avons essayé un autre.
  I stayed home because ___ the storm.|of|for|to|Je suis resté à la maison à cause de la tempête.
  I like running. ___, I dislike competitions.|However|Because|Although|J’aime courir. Cependant, je n’aime pas les compétitions.
  We arrived late ___ the bus broke down.|because|so|because of|Nous sommes arrivés en retard parce que le bus est tombé en panne.
  ___ she was tired, she finished the lesson.|Although|So|Because of|Bien qu’elle soit fatiguée, elle a fini la leçon.
  The tickets were expensive, ___ we saved up.|so|because|although|Les billets étaient chers, alors nous avons économisé.
  He missed training because ___ an injury.|of|to|at|Il a manqué l’entraînement à cause d’une blessure.
  I enjoy the course. ___, the homework takes time.|However|Although|Because|J’aime le cours. Cependant, les devoirs prennent du temps.`)],
  `Ton amie te demande une activité temporaire. Quelle réponse convient ?|I'm learning to cook this month.|I learned to cook in 2015.|I never cook.
  Tu veux exprimer ton intérêt malgré la difficulté.|Although it's challenging, I enjoy it.|It's challenging, so I gave up.|I enjoy it because it's easy.
  Tu poses une question sur une habitude.|How often do you go running?|Are you running right now?|Where did you run yesterday?`,
  `I usually {work|work : habitude} in an office, but this month I {am working|work : temporaire} at home. My sister {belongs|belong} to a music club. I {do not know~don't know|know : négation} its members yet. {Although|bien que} I am shy, I want to join. I practise {because|parce que} I enjoy music. The club is nearby, {so|donc} I can walk there. We missed a rehearsal because {of|à cause de + nom} the snow.`);

  add(2,'Travail, études et expériences',
  'Distinguer les expériences et les événements terminés|Exprimer une durée et des nouvelles récentes|Donner des exemples en entretien d’embauche',
  'apply for=postuler à;qualification=qualification / diplôme;achievement=réussite;colleague=collègue;deadline=date limite;training=formation;skill=compétence;salary=salaire;shift=service / équipe (horaires);since=depuis (un moment précis);for=depuis / pendant (une durée);already=déjà;yet=déjà (question) / encore (négation);recently=récemment;ever=déjà / jamais (question);never=ne … jamais;so far=jusqu’à présent;graduate=obtenir son diplôme;interview=entretien d’embauche;responsible for=responsable de',
  `I've worked in a team before.|J’ai déjà travaillé en équipe.
  I worked there last summer.|J’ai travaillé là-bas l’été dernier.
  I've lived here for three years.|J’habite ici depuis trois ans.
  Have you finished yet?|Tu as déjà fini ?
  I've just sent my application.|Je viens d’envoyer ma candidature.
  I'm responsible for customer service.|Je suis responsable du service client.`,
  [topic('Present perfect ou past simple ?',`Present perfect : have/has + participe passé ; l’expérience ou le résultat compte maintenant, sans moment passé précis. Past simple : pour un moment terminé comme yesterday, last year ou in 2020. Piège pour les francophones : « j’ai travaillé » se traduit soit par I have worked, soit par I worked. Dès qu’il y a une date passée, c’est le past simple.\n\nHave you ever worked abroad? I worked in Dublin in 2022. Formes irrégulières : go–went–gone, write–wrote–written, see–saw–seen, lead–led–led, have–had–had. Been veut dire ici « allé et revenu » ; gone veut dire « parti et encore là-bas ».`,
  `I ___ three jobs so far.|have had|have have|has had|J’ai eu trois emplois jusqu’à présent.
  She ___ in Rome in 2021.|worked|has worked|work|Elle a travaillé à Rome en 2021.
  Have you ever ___ a team?|led|lead|leading|As-tu déjà dirigé une équipe ?
  We ___ the course last Friday.|finished|have finished|has finished|Nous avons terminé le cours vendredi dernier.
  He has ___ to the bank; he isn't back.|gone|been|went|Il est allé à la banque et il n’est pas encore revenu.
  I have never ___ this software.|used|use|using|Je n’ai jamais utilisé ce logiciel.
  ___ you attend the interview yesterday?|Did|Have|Has|Tu es allé à l’entretien hier ?
  They ___ their results yet.|have not received|did not received|has not received|Ils n’ont pas encore reçu leurs résultats.
  She ___ her degree two years ago.|completed|has completed|completes now|Elle a terminé ses études il y a deux ans.
  I have ___ to Scotland twice and returned.|been|gone|went|Je suis allé deux fois en Écosse et je suis revenu.`),
  topic('For, since, just, already et yet',`For indique une durée ; since le point de départ : for six months, since January. Le français dit « depuis » dans les deux cas ; en anglais, il faut choisir. Pour une situation qui dure jusqu’à maintenant, on utilise le present perfect, jamais le présent : « j’habite ici depuis trois ans » = I have lived here for three years. How long have you …? demande la durée.\n\nJust veut dire « venir de » et se place entre have et le participe : I’ve just sent = je viens d’envoyer. Already se place souvent au même endroit. Yet se place en général à la fin des questions ou des négations. Ever demande une expérience ; never la nie sans not en plus.`,
  `I've known her ___ 2018.|since|for|during|Je la connais depuis 2018.
  We've studied together ___ six months.|for|since|ago|Nous étudions ensemble depuis six mois.
  I've ___ finished; I clicked send a moment ago.|just|yet|ever|Je viens de finir.
  Has the course started ___?|yet|since|never|Le cours a déjà commencé ?
  She has ___ passed; she needs no retake.|already|yet|ever|Elle a déjà réussi et n’a pas besoin de repasser l’examen.
  How ___ have you worked here?|long|much|many|Depuis combien de temps travailles-tu ici ?
  I haven't met the manager ___.|yet|ever|since|Je n’ai pas encore rencontré la direction.
  Have you ___ applied for a job abroad?|ever|yet|since|As-tu déjà postulé à un emploi à l’étranger ?
  He has lived here ___ he left school.|since|for|during|Il habite ici depuis qu’il a quitté l’école.
  We have ___ had a company car: not once.|never|ever|yet|Nous n’avons jamais eu de voiture de fonction.`)],
  `Tu parles d’une expérience sans moment précis.|I've organised events before.|I organise one yesterday.|I have organise before.
  Tu demandes depuis combien de temps la personne a son emploi actuel.|How long have you worked here?|When have you worked yesterday?|How many work here?
  Tu cites un événement terminé.|I started the course in March 2023.|I've started it in March 2023.|I starting in March 2023.`,
  `I {have worked|'work' : expérience jusqu’à maintenant} in several offices. I {started|start : terminé} my first job in 2019. I have known my colleague {since|depuis 2021} 2021, and we have shared an office {for|durée} four years. She has {just|venir de} become a manager. I haven't applied for promotion {yet|pas encore}. Have you {ever|déjà} led a project? I have {never|jamais} managed one alone.`);

  add(3,'Organiser un repas et exprimer ses souhaits',
  'Décrire des quantités et des ingrédients manquants|Commander poliment et négocier des propositions|Organiser un repas commun',
  'ingredient=ingrédient;portion=portion;recipe=recette;vegetarian=végétarien;allergy=allergie;available=disponible;book a table=réserver une table;instead=à la place;avoid=éviter;recommend=recommander;bill=addition;tip=pourboire;a few=quelques;a little=un peu;plenty of=beaucoup de / largement assez;run out of=ne plus avoir de;grilled=grillé;spicy=épicé;starter=entrée;main course=plat principal',
  `Could we have the bill, please?|Pourrions-nous avoir l’addition, s’il vous plaît ?
  How about making soup?|Et si on faisait une soupe ?
  Shall we book a table?|On réserve une table ?
  I'd rather eat outside.|Je préférerais manger dehors.
  There's very little milk left.|Il ne reste que très peu de lait.
  I'm allergic to nuts.|Je suis allergique aux noix.`,
  [topic('Quantités et provisions',`Many et (a) few s’emploient avec des noms dénombrables au pluriel ; much et (a) little avec des noms indénombrables. A few/a little = un peu, il y en a ; few/little insiste sur le manque (« peu de »). A lot of et plenty of conviennent aux deux.\n\nSome est courant dans les offres et les demandes : Would you like some tea? Any apparaît souvent dans les questions neutres et les négations. Advice, information et bread sont indénombrables en anglais (alors que « des conseils », « des informations » sont au pluriel en français) ; utilise a piece of ou une unité adaptée.`,
  `How ___ guests are coming?|many|much|little|Combien d’invités viennent ?
  We haven't got ___ rice left.|much|many|a few|Il ne nous reste pas beaucoup de riz.
  There are ___ eggs, enough for two people.|a few|a little|much|Il y a quelques œufs, assez pour deux personnes.
  I need ___ advice about the menu.|some|an|many|J’ai besoin de quelques conseils pour le menu.
  Would you like ___ water?|some|many|a few|Tu veux de l’eau ?
  We have very ___ time; let's order now.|little|few|many|Nous avons très peu de temps ; commandons maintenant.
  There isn't ___ bread in the cupboard.|any|many|a few|Il n’y a pas de pain dans le placard.
  How ___ sugar does the recipe need?|much|many|few|Combien de sucre faut-il pour la recette ?
  Only ___ people replied, so the room is nearly empty.|a few|a little|much|Seules quelques personnes ont répondu, donc la salle est presque vide.
  We need two ___ of milk.|bottles|milks|pieces|Il nous faut deux bouteilles de lait.`),
  topic('Demandes polies et propositions',`Could I/we + forme de base formule une demande polie. Would you mind + -ing demande quelque chose à l’autre personne (« ça te dérangerait de … »). How about/What about + -ing fait une proposition ; Shall we et Why don't we demandent la forme de base.\n\nI'd rather + forme de base exprime une préférence (« je préférerais »). Prefer s’emploie avec un nom ou -ing, par exemple I prefer tea to coffee : attention, c’est to et non than. Justifie un refus aimablement et propose une alternative.`,
  `Could we ___ a quieter table?|have|having|to have|Pourrions-nous avoir une table plus calme ?
  How about ___ a vegetarian dish?|cooking|cook|to cook|Et si on cuisinait un plat végétarien ?
  Shall we ___ the restaurant?|call|calling|to call|On appelle le restaurant ?
  Would you mind ___ the window?|closing|close|to close|Ça te dérangerait de fermer la fenêtre ?
  I'd rather ___ at home tonight.|eat|eating|to eat|Je préférerais manger à la maison ce soir.
  Why don't we ___ the salad?|share|sharing|to share|Pourquoi ne pas partager la salade ?
  I prefer tea ___ coffee.|to|than|as|Je préfère le thé au café.
  What about ___ a table for six?|booking|book|to book|Et si on réservait une table pour six ?
  Would you mind ___ us some water?|bringing|bring|to bring|Ça vous dérangerait de nous apporter de l’eau ?
  I'd rather ___ fish because of my allergy.|not have|don't have|not having|À cause de mon allergie, je préférerais ne pas prendre de poisson.`)],
  `Tu demandes poliment de l’aide au serveur.|Could you explain this dish, please?|You explain now.|Why did you cook it?
  Un ami propose de la viande, tu préfères des légumes.|I'd rather have vegetables. How about a curry?|I hate your idea. End of discussion.|I ate vegetables last year.
  Tu avertis qu’un aliment est dangereux pour toi.|I'm allergic to nuts.|I'm keen on nuts.|There are a few nuts.`,
  `How {many|combien (dénombrable)} people are coming? We only have a {little|un peu : indénombrable} rice and a {few|quelques : dénombrable} eggs. We haven't got {any|aucune quantité} bread. How about {making|make après how about} soup? I'd rather {order|order après would rather} pizza. Shall we {call|call après shall} the restaurant? Could we have some water {instead|à la place}?`);

  add(4,'Rencontres et histoires',
  'Relier l’arrière-plan et les événements au passé|Ordonner une histoire dans le temps|Raconter une rencontre inattendue',
  'while=pendant que;as soon as=dès que;suddenly=soudain;eventually=finalement;meanwhile=pendant ce temps;fortunately=heureusement;unfortunately=malheureusement;realise=se rendre compte;recognise=reconnaître;stranger=inconnu;journey=trajet / voyage;break down=tomber en panne;pick up=aller chercher;turn up=arriver / se pointer;by the time=le temps que;afterwards=ensuite / après;at first=au début;in the end=à la fin;miss=rater / manquer;unexpected=inattendu',
  `I was waiting when she called.|J’étais en train d’attendre quand elle a appelé.
  While we were talking, it started to rain.|Pendant que nous parlions, il s’est mis à pleuvoir.
  At first, I didn't recognise him.|Au début, je ne l’ai pas reconnu.
  Suddenly, the lights went out.|Soudain, la lumière s’est éteinte.
  Fortunately, nobody was hurt.|Heureusement, personne n’a été blessé.
  What happened next?|Que s’est-il passé ensuite ?`,
  [topic('Past simple et past continuous',`Past continuous : was/were + -ing décrit une action en cours à un moment passé, un peu comme l’imparfait ou « être en train de ». Past simple raconte un événement terminé, qui interrompt par exemple cette action, souvent comme le passé composé ou le passé simple.\n\nI was walking when I saw him. While relie souvent deux actions longues simultanées. Was/were s’accorde avec le sujet. Les verbes d’état comme know restent en général au past simple, même là où le français utilise l’imparfait (« je savais » = I knew).`,
  `I ___ dinner when the phone rang.|was cooking|cooked|am cooking|J’étais en train de cuisiner quand le téléphone a sonné.
  We were waiting when the bus ___.|arrived|was arrive|arrives|Nous attendions quand le bus est arrivé.
  While she ___, I made tea.|was studying|is studying|studies|Pendant qu’elle étudiait, j’ai fait du thé.
  What ___ you doing at eight last night?|were|was|did|Que faisais-tu hier soir à huit heures ?
  I ___ the answer immediately.|knew|was knowing|am knowing|Je connaissais la réponse tout de suite.
  They ___ sleeping when the alarm sounded.|were|was|did|Ils dormaient quand l’alarme a sonné.
  The taxi ___ down while we were crossing the bridge.|broke|was break|breaks tomorrow|Le taxi est tombé en panne pendant que nous traversions le pont.
  At nine yesterday, she ___ a report.|was writing|is writing|writes|Hier à neuf heures, elle était en train d’écrire un rapport.
  ___ he talking when you entered?|Was|Were|Did|Il parlait quand tu es entré ?
  I ___ my keys while I was running.|lost|was lose|lose now|J’ai perdu mes clés en courant.`),
  topic('Ordonner clairement une histoire',`At first décrit le début d’une évolution ; then et afterwards les étapes suivantes. Suddenly annonce quelque chose d’inattendu. Eventually et in the end donnent le résultat final. Faux ami : eventually = finalement, et non « éventuellement ». Meanwhile relie des événements parallèles.\n\nAfter et before peuvent précéder une proposition ou une forme en -ing : after we arrived / after arriving. As soon as = dès que ; until marque la limite d’une action qui dure.`,
  `___, I was nervous, but later I relaxed.|At first|At last of|Since tomorrow|Au début, j’étais nerveux, mais ensuite je me suis détendu.
  We searched for hours. ___, we found the hotel.|Eventually|Before|While|Nous avons cherché pendant des heures. Finalement, nous avons trouvé l’hôtel.
  I called home as soon ___ I arrived.|as|than|to|J’ai appelé chez moi dès que je suis arrivé.
  After ___ the station, we took a taxi.|leaving|leave|left|Après avoir quitté la gare, nous avons pris un taxi.
  She waited ___ the rain stopped.|until|during|because of|Elle a attendu jusqu’à ce que la pluie s’arrête.
  The train stopped. ___, the lights went out.|Suddenly|Because of|During|Le train s’est arrêté. Soudain, la lumière s’est éteinte.
  I bought tickets. ___, my friend checked the map.|Meanwhile|Because|Although|J’ai acheté les billets. Pendant ce temps, mon ami a regardé le plan.
  Before ___, check your bag.|leaving|leave|left|Avant de partir, vérifie ton sac.
  We missed the bus. ___, a neighbour gave us a lift.|Fortunately|During|Until|Nous avons raté le bus. Heureusement, un voisin nous a emmenés.
  We had dinner and went home ___.|afterwards|meanwhile before|during|Nous avons dîné, puis nous sommes rentrés.`)],
  `Tu racontes une action interrompue.|I was reading when the doorbell rang.|I read when the doorbell was ring.|I am reading yesterday.
  Tu demandes l’événement suivant.|What happened next?|What happens every day?|How often does it happen?
  Une histoire s’est bien terminée après des difficultés.|In the end, we got home safely.|At first, we haven't left.|Meanwhile, tomorrow was sunny.`,
  `Yesterday I {was walking|walk : en train de} home when I {noticed|notice : événement} a lost dog. It {was waiting|wait : arrière-plan} outside a shop. {While|pendant que} I was checking its collar, the owner arrived. At {first|au début} he looked worried. As soon {as|dès que} he saw the dog, he smiled. After {thanking|thank après after} me, he took it home. {Fortunately|heureusement}, the dog was safe.`);

  add(5,'Argent, règles et bons conseils',
  'Distinguer obligation, interdiction et absence de nécessité|Justifier des conseils|Régler poliment un problème de paiement',
  'cash=espèces / liquide;withdraw=retirer (de l’argent);cash machine=distributeur de billets;charge=frais;receipt=ticket de caisse / reçu;refund=remboursement;account=compte;afford=avoir les moyens de;save up=économiser;borrow=emprunter à;lend=prêter à;owe=devoir (de l’argent);exchange rate=taux de change;compulsory=obligatoire;permission=autorisation;allowed=autorisé;ought to=devrait;ought not to=ne devrait pas;budget=budget;PIN=code secret',
  `You mustn't share your PIN.|Tu ne dois pas communiquer ton code secret.
  You don't have to pay today.|Tu n’es pas obligé de payer aujourd’hui.
  Could I have a receipt?|Pourrais-je avoir un reçu ?
  You should check the exchange rate.|Tu devrais vérifier le taux de change.
  Can you lend me ten pounds?|Tu peux me prêter dix livres ?
  I'd like to request a refund.|Je voudrais demander un remboursement.`,
  [topic('Must, have to et l’autorisation',`Must et have to expriment une obligation. Au passé, on utilise had to, au futur will have to. Mustn't est une interdiction (« il ne faut pas ») ; don't have to veut dire « pas nécessaire » (« tu n’es pas obligé ») et permet quand même l’action. Piège : « tu ne dois pas » peut se traduire par les deux selon le sens.\n\nBe allowed to exprime une autorisation. Can peut aussi exprimer une permission. Après must/can, on met la forme de base ; après have to et allowed to, l’infinitif. Les questions avec have to demandent do/does/did.`,
  `You ___ enter your PIN to withdraw money.|have to|mustn't|don't have to|Tu dois entrer ton code pour retirer de l’argent.
  You ___ tell anyone your password: it's forbidden.|mustn't|don't have to|have to|Tu ne dois dire ton mot de passe à personne : c’est interdit.
  The museum is free, so we ___ pay.|don't have to|mustn't|must|Le musée est gratuit, donc nous ne sommes pas obligés de payer.
  Yesterday I ___ show my ID.|had to|must|have to tomorrow|Hier, j’ai dû montrer ma pièce d’identité.
  ___ she have to sign the form?|Does|Must|Has|Est-ce qu’elle doit signer le formulaire ?
  Are visitors allowed ___ photos?|to take|taking|take|Les visiteurs ont-ils le droit de prendre des photos ?
  Next year we will ___ renew the card.|have to|must|had to|L’année prochaine, nous devrons renouveler la carte.
  You ___ borrow my pen; I give you permission.|can|mustn't|have forbidden|Tu peux emprunter mon stylo.
  We ___ queue because we booked online.|don't have to|mustn't|must|Nous ne sommes pas obligés de faire la queue, car nous avons réservé en ligne.
  ___ you have to pay a fee yesterday?|Did|Must|Have|As-tu dû payer des frais hier ?`),
  topic('Conseils et expressions financières',`Should/shouldn't et ought to/ought not to donnent un conseil (« tu devrais »). Had better + forme de base est un conseil plus fort pour une situation précise, avec des conséquences possibles (« tu ferais mieux de »). Après should, pas de to.\n\nBorrow something from somebody = emprunter quelque chose à quelqu’un ; lend something to somebody = prêter quelque chose à quelqu’un. Attention : le français dit « emprunter à » mais l’anglais dit borrow from. Spend money on, pay for et save up for sont des constructions fixes.`,
  `You should ___ your receipts.|keep|keeping|to keep|Tu devrais garder tes reçus.
  You ought ___ compare prices.|to|for|at|Tu devrais comparer les prix.
  We'd better ___ now or the bank will close.|leave|to leave|leaving|Nous ferions mieux de partir maintenant, sinon la banque va fermer.
  Can I borrow some money ___ you?|from|to|at|Je peux t’emprunter de l’argent ?
  I lent twenty pounds ___ my brother.|to|from|at|J’ai prêté vingt livres à mon frère.
  She spends too much money ___ clothes.|on|for|to|Elle dépense trop d’argent en vêtements.
  You shouldn't ___ more than you can afford.|spend|to spend|spent|Tu ne devrais pas dépenser plus que tes moyens.
  He is saving up ___ a bicycle.|for|on|from|Il économise pour un vélo.
  We paid ___ the tickets by card.|for|on|to|Nous avons payé les billets par carte.
  You had better ___ lose this receipt.|not|don't|to not|Tu ferais mieux de ne pas perdre ce reçu.`)],
  `L’entrée est gratuite et facultative. Quelle phrase est juste ?|You don't have to pay.|You mustn't enter.|You must pay in cash.
  Un ami te prête temporairement de l’argent. Tu dis :|Can I borrow some money from you?|Can I lend money from you?|Can I owe from you?
  Tu mets en garde contre le partage interdit du code.|You mustn't share your PIN.|You don't have to keep it secret.|You ought share it.`,
  `You {have to|obligation, deux mots} show ID to open an account. You {must not~mustn't|interdiction} share your PIN. You {do not have to~don't have to|pas nécessaire} pay for this free service. Yesterday I {had to|obligation au passé} visit the bank. You should {keep|keep après should} your receipt. I borrowed money {from|emprunter à quelqu’un} my sister and paid {for|payer pour} the repair. Now I'm saving up {for|économiser pour} a new bike.`);

  add(6,'Vivre sainement et comparer',
  'Comparer des options avec nuance|Parler de quantités excessives et suffisantes|Décrire ses préférences avec des raisons',
  'fit=en forme;exhausted=épuisé;balanced=équilibré;habit=habitude;routine=routine;chores=tâches ménagères;convenient=pratique;effective=efficace;crowded=bondé;affordable=abordable;far less=beaucoup moins;slightly=légèrement;nearly=presque;as fit as=aussi en forme que;enough=assez;too much=trop;fitness centre=salle de sport;prefer=préférer;rather than=plutôt que;membership=abonnement',
  `Cycling is much cheaper than driving.|Le vélo coûte beaucoup moins cher que la voiture.
  It isn't as crowded as the other gym.|Il n’y a pas autant de monde que dans l’autre salle.
  I'm not fit enough yet.|Je ne suis pas encore assez en forme.
  The class is too expensive for me.|Le cours est trop cher pour moi.
  I'd rather walk than take the bus.|Je préférerais marcher plutôt que prendre le bus.
  I prefer swimming to running.|Je préfère la natation à la course.`,
  [topic('Les comparaisons et leurs nuances',`Les adjectifs courts forment en général -er/-est ; les plus longs more/most. Irréguliers : good–better–best, bad–worse–worst. Than compare des différences (« que »), as … as l’égalité (« aussi … que ») ; not as … as veut dire « moins … que ».\n\nMuch/far/a lot renforcent un comparatif (« beaucoup plus ») ; a little/slightly l’atténuent. Very ne se place pas directement devant un comparatif : on dit much better, pas very better. Les superlatifs ont en général the : the most convenient option.`,
  `Walking is much ___ than driving.|healthier|healthy|healthiest|Marcher est beaucoup plus sain que conduire.
  This is the ___ expensive membership.|most|more|much|C’est l’abonnement le plus cher.
  The pool isn't as busy ___ the gym.|as|than|to|La piscine n’est pas aussi fréquentée que la salle de sport.
  My new routine is slightly ___.|better|best|good|Ma nouvelle routine est un peu meilleure.
  Today is ___ than yesterday.|worse|worst|bad|Aujourd’hui, c’est pire qu’hier.
  This route is far ___ convenient.|more|most|very|Cet itinéraire est bien plus pratique.
  Cycling is ___ expensive than taking taxis.|less|least|little|Le vélo coûte moins cher que les taxis.
  It is the ___ crowded time of day.|least|less|little|C’est le moment de la journée où il y a le moins de monde.
  I'm as fit ___ my brother.|as|than|to|Je suis aussi en forme que mon frère.
  The new class is a little ___ than the old one.|harder|hardest|hard|Le nouveau cours est un peu plus difficile que l’ancien.`),
  topic('Too, enough et les préférences',`Too + adjectif = « trop » : plus que ce qui est bon ou possible. Adjectif + enough = « assez » ; attention à l’ordre : old enough (« assez âgé »). Devant un nom, enough se place avant : enough time. Too much va avec les indénombrables, too many avec les dénombrables au pluriel.\n\nPrefer + -ing + to + -ing ; would rather + forme de base + than + forme de base. Would prefer peut s’employer avec to + infinitif. Compare leurs formes au lieu de les mélanger.`,
  `The water is too cold ___ swim in.|to|for swimming to|than|L’eau est trop froide pour y nager.
  I don't have ___ time to exercise.|enough|too|many|Je n’ai pas assez de temps pour faire du sport.
  She isn't old ___ to join.|enough|too|much|Elle n’est pas encore assez âgée pour s’inscrire.
  There are too ___ people in this class.|many|much|little|Il y a trop de monde dans ce cours.
  I prefer cycling to ___.|driving|drive|to drive|Je préfère le vélo à la voiture.
  I'd rather ___ than run.|walk|walking|to walk|Je préférerais marcher plutôt que courir.
  We spend too ___ time sitting.|much|many|few|Nous passons trop de temps assis.
  Is this bag light ___ for you to carry?|enough|too|many|Ce sac est-il assez léger pour que tu le portes ?
  I'd prefer ___ at home today.|to exercise|exercise|exercised|Aujourd’hui, je préférerais faire du sport à la maison.
  I prefer swimming ___ running.|to|than|as|Je préfère la natation à la course.`)],
  `Tu compares deux prix proches.|This one is slightly cheaper.|This is the most cheaper.|This one is very cheaper.
  Le cours coûte plus que ce que tu peux payer.|It's too expensive for me.|It's expensive enough to afford.|It's enough expensive.
  Tu exprimes correctement une préférence.|I'd rather walk than drive.|I'd rather walking than driving.|I prefer walk than drive.`,
  `The new gym is {cheaper|cheap : comparatif} than my old one, but not as close {as|aussi proche que} the pool. It is much {more|comparatif avec convenient} convenient than driving across town. I don't have {enough|assez devant un nom} time for long journeys. The evening class is {too|trop} crowded, with too {many|trop de personnes} people. I'd rather {swim|swim après would rather} than run. I prefer cycling {to|prefer … to …} driving.`);
  window.EN_B1_AUTHORING={lessons,add,topic};
})();
