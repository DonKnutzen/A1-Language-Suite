/* Two original practice tests in the telc Français A2 format (see plan.cjs → exam).
   Same parts, item counts and task types as the sample; all texts are written for this course. */
const V=(text,statement,a,explanation)=>({text,statement,a,explanation});
module.exports={telc:[
{
 id:'t1',title:'Modelltest 1',
 el1:{text:'Chère Agnès,\nmerci pour ta carte ! Je ne t’ai pas répondu plus tôt, car j’{1} en voyage pour mon travail. Nous {2} rentrer dimanche, mais le train était supprimé. Je suis contente : tes vacances se {3} bien passées. Ici, il fait froid {4} lundi. Ta sœur est venue {5} moi samedi, nous avons fait un gâteau {6}. Le mois prochain, je {7} quelques jours à Nantes. {8} idée géniale : on pourrait se voir ! Écris-moi {9} tu es libre. Je te dirai tout quand on se {10}.\nGrosses bises,\nMarion',
  items:[
   [['étais','suis','serai'],'Hintergrund in der Vergangenheit: imparfait – j’étais en voyage.'],
   [['devions','devons','devrons'],'Ein Plan in der Vergangenheit, der nicht geklappt hat: imparfait – nous devions.'],
   [['sont','ont','étaient'],'Reflexive Verben bilden das passé composé mit être: elles se sont bien passées.'],
   [['depuis','pendant','il y a'],'Es ist seit Montag kalt und noch heute: depuis.'],
   [['chez','à','avec'],'Zu jemandem nach Hause: venir chez quelqu’un.'],
   [['ensemble','chacune','toujours'],'Gemeinsam: ensemble.'],
   [['passerai','passais','passé'],'Le mois prochain → Zukunft: je passerai.'],
   [['Quelle','Quel','Quels'],'Idée ist weiblich: Quelle idée !'],
   [['si','que','quand'],'Indirekte Frage ob: si.'],
   [['verra','voyait','verrait'],'Quand + Zukunft → futur simple: quand on se verra.']
  ]},
 el2:[
  {title:'Dans un magasin',box:['BIEN SÛR','BONNE JOURNÉE','DE RIEN','EXCUSEZ-MOI','VOILÀ','VOLONTIERS'],
   lines:[['A','{11}, vous avez ce pull en taille M ?'],['B','Oui, {12}. Il est là, sur l’étagère.'],['A','Merci beaucoup.'],['B','{13}. Vous voulez l’essayer ?'],['A','Non, je le prends.'],['B','{14}, et merci !']],
   answers:['EXCUSEZ-MOI','BIEN SÛR','DE RIEN','BONNE JOURNÉE'],
   explanations:['Höflich ansprechen: Excusez-moi.','Zustimmen: Bien sûr.','Antwort auf merci: De rien.','Verabschiedung im Geschäft: Bonne journée.']},
  {title:'Une invitation',box:['À BIENTÔT','DOMMAGE','ÇA ME FAIT PLAISIR','PAS DE PROBLÈME','SALUT','ATTENTION'],
   lines:[['C','{15}, Léo ! Tu viens dîner samedi ?'],['D','Oh, {16}, je travaille samedi soir.'],['C','Dimanche, alors ?'],['D','Oui, {17} ! Je peux venir avec ma copine ?'],['C','{18}, il y a de la place.'],['D','Super, merci !']],
   answers:['SALUT','DOMMAGE','ÇA ME FAIT PLAISIR','PAS DE PROBLÈME'],
   explanations:['Begrüßung unter Freunden: Salut.','Bedauern: Dommage.','Freude über die Einladung: Ça me fait plaisir.','Zusage ohne Schwierigkeit: Pas de problème.']}
 ],
 co1:{intro:'Cinq personnes parlent du vélo en ville.',items:[
  V('Moi, je vais au bureau à vélo depuis trois ans. Je ne prends plus jamais la voiture, c’est plus rapide !','Nadia va au travail en voiture.',false,'Sie fährt seit drei Jahren Rad und nie mehr Auto.'),
  V('Le vélo, c’est bien, mais ici il n’y a pas assez de pistes cyclables. Pour les enfants, c’est dangereux.','Pierre trouve qu’il manque des pistes cyclables.',true,'Il n’y a pas assez de pistes = es gibt zu wenige Radwege.'),
  V('À soixante-quinze ans, je fais encore du vélo tous les jours. Mon médecin dit que c’est très bon pour moi.','Simone fait du vélo chaque jour.',true,'Tous les jours = jeden Tag.'),
  V('J’ai acheté un vélo électrique l’année dernière, mais il est resté dans le garage. Je préfère marcher.','Bruno utilise beaucoup son vélo électrique.',false,'Das Rad blieb in der Garage; er geht lieber zu Fuß.'),
  V('Dans notre hôtel, nous prêtons des vélos aux clients. C’est gratuit et ils sont très contents.','À l’hôtel de Claire, les vélos sont gratuits.',true,'C’est gratuit = kostenlos.')
 ]},
 co2:[
  V('Chers clients, cette semaine au rayon boulangerie : la baguette tradition à un euro, et six croissants pour quatre euros cinquante. Offre valable jusqu’à samedi.','Six croissants coûtent quatre euros.',false,'Sechs Croissants kosten 4,50 €.'),
  V('Bonjour Karim, c’est Élise. Je suis désolée, mais le cours de guitare de ce soir est annulé : la professeure est malade. On se voit mardi prochain !','Le cours de guitare n’a pas lieu ce soir.',true,'Annulé = abgesagt.')
 ],
 co3:[
  {situation:'Vous êtes à la gare et vous attendez le train pour Bordeaux.',text:'Votre attention, s’il vous plaît : le TER en direction de Poitiers partira avec quinze minutes de retard, voie 2.',statement:'Cette annonce est importante pour vous.',a:false,explanation:'Die Verspätung betrifft den Zug nach Poitiers, nicht nach Bordeaux.'},
  {situation:'Vous êtes sur l’autoroute A4 en direction de Paris.',text:'Information trafic : sur l’A4 vers Paris, un accident à la hauteur de Reims. La circulation est arrêtée. Quittez l’autoroute à la sortie 23.',statement:'Vous pouvez continuer normalement vers Paris.',a:false,explanation:'Der Verkehr steht; man soll an Ausfahrt 23 abfahren.'},
  {situation:'Vous êtes en vacances en Bretagne. Vous écoutez la radio le matin.',text:'Ce matin, du brouillard sur la Bretagne, mais il disparaîtra vers dix heures. Ensuite, grand soleil et vingt-quatre degrés.',statement:'Il fera beau à partir de la fin de matinée.',a:true,explanation:'Der Nebel verschwindet gegen zehn; danach Sonne.'},
  {situation:'Vous téléphonez à votre dentiste pour un rendez-vous.',text:'Bonjour, vous êtes au cabinet du docteur Arnaud. Nous sommes en vacances jusqu’au vingt août. En cas d’urgence, appelez le cabinet du docteur Faure au 02 41 56 32.',statement:'Vous pouvez avoir un rendez-vous cette semaine au cabinet Arnaud.',a:false,explanation:'Die Praxis ist bis zum 20. August im Urlaub.'},
  {situation:'Vous êtes au supermarché. Votre voiture est une Peugeot grise.',text:'Le propriétaire de la Peugeot grise garée devant l’entrée est prié de venir à l’accueil. Merci.',statement:'Vous devez aller à l’accueil.',a:true,explanation:'Die Durchsage betrifft den grauen Peugeot – dein Auto.'}
 ],
 ce1:{titles:['Le train de nuit revient','Moins de voitures en centre-ville','Les jeunes lisent sur écran','Un village sans commerces','Les Français et le pain','Des musées gratuits le dimanche','Plus de touristes à la montagne','Grève des bus annulée'],
  texts:[
   ['Depuis janvier, la ville de Grenoble interdit les voitures dans les rues du centre le samedi. Résultat : le nombre de voitures a baissé de trente pour cent, et les commerçants sont plutôt contents.',1],
   ['Selon une étude, sept jeunes sur dix lisent maintenant des livres ou des articles sur leur téléphone. Les livres en papier restent populaires, mais surtout chez les plus de cinquante ans.',2],
   ['Bonne nouvelle pour les voyageurs : un train de nuit relie de nouveau Paris à Nice. Il part à vingt heures et arrive le lendemain matin. On peut dormir dans des couchettes.',0],
   ['Chaque premier dimanche du mois, les musées nationaux ouvrent leurs portes gratuitement. Beaucoup de familles profitent de cette offre, surtout en hiver.',5]
  ]},
 ce2:[
  {intro:'Julie reçoit ce message :',text:'Salut Julie,\nje pars demain matin chez mes parents à Lyon et je rentre seulement lundi soir. Tu pourrais arroser mes plantes ce week-end ? La clé est chez la voisine du deuxième étage, Madame Petit.\nMerci mille fois !\nThomas',
   items:[['Thomas sera absent pendant le week-end.',true,'Er fährt morgen weg und kommt erst Montagabend zurück.'],['Julie doit prendre la clé chez Thomas.',false,'Die Schlüssel sind bei der Nachbarin Madame Petit.']]},
  {intro:'Votre école de langues affiche ces informations :',text:'Inscriptions aux cours d’automne\n– Les cours commencent le 2 octobre.\n– Inscrivez-vous en ligne avant le 20 septembre.\n– Un test de niveau gratuit a lieu le 25 septembre.\n– Les cours du soir sont le lundi et le jeudi.',
   items:[['On peut s’inscrire jusqu’au 25 septembre.',false,'Anmeldung bis 20. September; am 25. ist der Einstufungstest.'],['Le test de niveau ne coûte rien.',true,'Gratuit = kostenlos.']]}
 ],
 ce3:{intro:'Vous voulez passer un week-end à Lyon.',
  sections:[
   ['a','Le Vieux-Lyon','Avec ses petites rues et ses maisons de la Renaissance, le Vieux-Lyon est le quartier le plus ancien de la ville. Le soir, les restaurants typiques, les bouchons, servent la cuisine lyonnaise.'],
   ['b','La colline de Fourvière','On monte à pied ou en funiculaire. Depuis la basilique, la vue sur la ville est magnifique, surtout au coucher du soleil.'],
   ['c','Le parc de la Tête d’Or','C’est l’un des plus grands parcs urbains de France. Il y a un lac, un zoo gratuit et de grandes pelouses où les familles pique-niquent.'],
   ['d','Les berges du Rhône','Le long du fleuve, une longue piste permet de faire du vélo ou du roller. On peut louer des vélos à plusieurs stations.'],
   ['e','Le musée des Confluences','Ce musée moderne présente des collections de sciences et d’histoire. Les enfants adorent les squelettes de dinosaures.'],
   ['f','Les halles Paul Bocuse','Dans ce marché couvert, on trouve les meilleurs fromages et la charcuterie de la région. Idéal pour acheter des cadeaux gourmands.']],
  items:[['Vous voulez regarder le coucher du soleil sur la ville.','b'],['Vous aimez faire du vélo.','d'],['Vous voulez acheter des spécialités à manger.','f'],['Vous voulez voir des animaux sans payer.','c']]},
 ee:{task:'Vous allez passer deux semaines en France pour votre travail. Vous écrivez à des amis français qui habitent à Lyon pour leur demander de l’aide.',
  points:['Trouver un logement pour deux semaines','Les dates de votre séjour','Le prix d’une chambre','Les transports en commun','Un restaurant sympa','Une sortie le week-end'],
  model:'Chers Claire et Antoine,\nJ’espère que vous allez bien ! Je vous écris parce que je vais travailler à Lyon du 10 au 24 mars. Est-ce que vous pourriez m’aider à trouver une chambre pour ces deux semaines ? Je cherche quelque chose de pas trop cher, près du métro. Et le week-end, on pourrait faire une sortie ensemble ?\nMerci d’avance ! Je vous embrasse,\nJulia'},
 oral:{part1:['nom ?','âge ?','situation de famille ?','adresse ?','profession ?','langues ?','loisirs ?'],
  part2:[['votre dernière fête','où ? quand ? avec qui ?'],['votre quartier','magasins ? transports ? calme ?'],['votre travail ou vos études','quoi ? depuis quand ? horaires ?'],['votre petit-déjeuner','quoi ? quand ? où ?'],['vos prochaines vacances','où ? avec qui ? comment ?']],
  part3:{task:'Vous et votre partenaire voulez passer dimanche prochain ensemble. Mettez-vous d’accord sur deux activités. Quand faites-vous quoi ?',options:['un brunch au café','visiter un musée','une promenade au bord du lac','aller au cinéma','faire du vélo','un marché aux puces']},
  model:['Moi, je propose un brunch au café le matin, parce que j’adore les croissants.','Bonne idée ! Et l’après-midi, on pourrait faire une promenade au bord du lac, s’il fait beau.','D’accord. On se retrouve à dix heures devant le café ?']}
},
{
 id:'t2',title:'Modelltest 2',
 el1:{text:'Cher Hugo,\nje t’écris de Montréal ! Je suis arrivée {1} une semaine. Le voyage {2} long, mais tout s’est bien passé. Mon appartement est petit, mais il est {3} de l’université. Les gens sont très sympas : ma voisine m’a {4} un café dès le premier jour. Il fait déjà froid : hier, il {5} toute la journée. Je ne {6} pas encore beaucoup de monde, mais ça va venir. Les cours commencent lundi, je suis un peu {7}. Et toi, tu as trouvé {8} stage ? Viens me voir en décembre ! On {9} faire du ski. Réponds-moi {10} !\nBisous,\nChloé',
  items:[
   [['il y a','depuis','pendant'],'Ich bin vor einer Woche angekommen (abgeschlossen): il y a.'],
   [['a été','était','sera'],'Die Reise als Ganzes, abgeschlossen: a été.'],
   [['près','contre','chez'],'Près de = in der Nähe von. Contre und chez stehen nicht mit de.'],
   [['offert','offerte','offrir'],'Avoir + Partizip; das Objekt un café steht dahinter, deshalb keine Angleichung: offert.'],
   [['a neigé','neigeait','neigera'],'Hier toute la journée = abgeschlossenes Ereignis: il a neigé.'],
   [['connais','sais','rencontre'],'Personen kennen: connaître → je ne connais pas.'],
   [['stressée','stressé','stressées'],'Chloé ist eine Frau: stressée.'],
   [['ton','ta','tes'],'Le stage ist männlich: ton stage.'],
   [['pourra','pouvait','peut-être'],'Zukunft in Dezember: on pourra.'],
   [['vite','rapide','tard'],'Adverb zu répondre: vite.']
  ]},
 el2:[
  {title:'À la réception d’un hôtel',box:['AVEC PLAISIR','BIENVENUE','BONNE NUIT','D’ACCORD','JE VOUDRAIS','VOICI'],
   lines:[['A','Bonsoir. {11} une chambre pour deux nuits.'],['B','Vous avez réservé ?'],['A','Oui, au nom de Weber.'],['B','{12} votre clé, chambre 12.'],['A','Le petit-déjeuner est à quelle heure ?'],['B','De sept à dix heures. {13} !']],
   answers:['JE VOUDRAIS','VOICI','BONNE NUIT'],
   explanations:['Höflicher Wunsch: Je voudrais.','Etwas überreichen: Voici.','Abends verabschieden: Bonne nuit.']},
  {title:'Au travail',box:['À TOUT À L’HEURE','BRAVO','ÇA VA','COMMENT','NON MERCI','PARDON'],
   lines:[['C','Salut Inès, {14} ?'],['D','Très bien ! J’ai fini le rapport.'],['C','{15} ! Tu veux un café ?'],['D','{16}, j’en ai déjà bu deux.'],['C','{17}, tu as vu Marc ? Il cherche le dossier.'],['D','Il est en réunion. Je le vois à midi.'],['C','D’accord, {18} !']],
   answers:['ÇA VA','BRAVO','NON MERCI','PARDON','À TOUT À L’HEURE'],
   explanations:['Begrüßung mit Frage nach dem Befinden: ça va ?','Lob: Bravo !','Höflich ablehnen: Non merci.','Unterbrechen / ansprechen: Pardon.','Bis später am selben Tag: À tout à l’heure.']}
 ],
 co1:{intro:'Cinq personnes parlent du télétravail.',items:[
  V('Je travaille à la maison deux jours par semaine. Je gagne une heure de transport : c’est génial !','Léa travaille chez elle deux jours par semaine.',true,'Deux jours par semaine à la maison.'),
  V('Moi, je ne peux pas travailler chez moi : mes enfants sont petits et il y a trop de bruit.','Julien aime travailler à la maison.',false,'Zu Hause ist es ihm zu laut.'),
  V('Je suis boulangère. Le télétravail, pour moi, ce n’est pas possible !','Pour Martine, le télétravail est impossible.',true,'Ce n’est pas possible = unmöglich.'),
  V('Au début, j’étais content. Mais maintenant, mes collègues me manquent. Je préfère aller au bureau.','Samir veut rester à la maison tous les jours.',false,'Er geht lieber ins Büro.'),
  V('Dans notre entreprise, tout le monde peut choisir. La plupart des employés viennent trois jours au bureau.','Chez Anne, les employés peuvent choisir.',true,'Tout le monde peut choisir.')
 ]},
 co2:[
  V('Bonjour madame Klein, ici le garage Martin. Votre voiture est prête. Vous pouvez venir la chercher demain à partir de neuf heures. La réparation coûte deux cent dix euros.','La voiture sera prête seulement après-demain.',false,'Sie ist schon fertig; Abholung morgen ab 9 Uhr.'),
  V('Mesdames et messieurs, la piscine fermera exceptionnellement à dix-huit heures aujourd’hui en raison d’une compétition. Merci de votre compréhension.','Aujourd’hui, la piscine ferme plus tôt.',true,'Exceptionnellement à 18 h wegen eines Wettkampfs.')
 ],
 co3:[
  {situation:'Vous êtes à l’aéroport. Votre vol pour Rome part à 14 h 30.',text:'Les passagers du vol AF 1204 à destination de Rome, départ 14 h 30, sont priés de se présenter à la porte 32. Embarquement immédiat.',statement:'Vous devez aller tout de suite à la porte 32.',a:true,explanation:'Embarquement immédiat = sofortiges Boarding, Gate 32.'},
  {situation:'Vous êtes en voiture près de Lyon.',text:'Sur le périphérique de Lyon, un camion en panne bloque une voie. Ralentissements sur cinq kilomètres. Pas de problème sur l’autoroute A6.',statement:'L’autoroute A6 est bloquée.',a:false,explanation:'Probleme nur auf dem Lyoner Ring; A6 ist frei.'},
  {situation:'Vous voulez faire du vélo demain.',text:'Demain, il pleuvra toute la matinée dans la région. L’après-midi, le soleil reviendra, mais il y aura du vent.',statement:'Demain matin, il fera beau.',a:false,explanation:'Am Vormittag regnet es.'},
  {situation:'Vous appelez votre banque.',text:'Bonjour, bienvenue à la banque Populaire. Nos conseillers sont disponibles du lundi au vendredi de neuf heures à dix-sept heures. Pour bloquer votre carte, tapez 1.',statement:'Vous pouvez parler à un conseiller le samedi.',a:false,explanation:'Nur Montag bis Freitag.'},
  {situation:'Vous êtes au centre commercial avec votre fils de six ans, Lucas.',text:'Le petit Lucas, six ans, attend ses parents à l’accueil, au rez-de-chaussée, à côté de la pharmacie.',statement:'Vous devez aller au rez-de-chaussée.',a:true,explanation:'Lucas wartet am Empfang im Erdgeschoss.'}
 ],
 ce1:{titles:['Les Français dorment moins','Un nouveau tram à Bordeaux','La fin des sacs en plastique','Les vacances coûtent plus cher','Plus de vélos que de voitures','Un festival de musique gratuit','Les Français cuisinent moins','Les écoles ferment plus tôt'],
  texts:[
   ['Selon une enquête, les Français dorment en moyenne six heures quarante par nuit, trente minutes de moins qu’il y a vingt ans. Les écrans le soir seraient une des raisons.',0],
   ['Depuis le premier janvier, les magasins n’ont plus le droit de donner des sacs en plastique aux clients. Les clients apportent maintenant leurs propres sacs.',2],
   ['Du 12 au 15 juillet, le parc de la ville accueille des concerts de jazz et de rock. L’entrée est libre pour tout le monde, même le soir.',5],
   ['Les prix des hôtels et des locations ont augmenté de huit pour cent cette année. Beaucoup de familles partent donc moins longtemps.',3]
  ]},
 ce2:[
  {intro:'Vous recevez ce courriel :',text:'Bonjour,\nvotre commande n° 4521 est arrivée dans notre magasin de la rue Victor-Hugo. Vous pouvez la retirer du mardi au samedi, de dix heures à dix-neuf heures. N’oubliez pas votre carte d’identité.\nL’équipe Livres & Co',
   items:[['On peut retirer la commande le lundi.',false,'Abholung von Dienstag bis Samstag.'],['Il faut montrer une pièce d’identité.',true,'N’oubliez pas votre carte d’identité.']]},
  {intro:'Votre médecin vous donne ces conseils :',text:'Pour bien dormir :\n– Ne buvez pas de café après seize heures.\n– Éteignez les écrans une heure avant de dormir.\n– Faites du sport, mais pas tard le soir.\n– Couchez-vous toujours à la même heure.',
   items:[['On peut boire un café à dix-sept heures.',false,'Kein Kaffee nach 16 Uhr.'],['Il est conseillé de se coucher à la même heure.',true,'Toujours à la même heure.']]}
 ],
 ce3:{intro:'Vous cherchez une activité pour le week-end dans votre région.',
  sections:[
   ['a','Atelier cuisine','Apprenez à faire des macarons avec un chef pâtissier. Samedi de 14 h à 17 h. Vous repartez avec vos gâteaux.'],
   ['b','Randonnée guidée','Une marche de quatre heures dans la forêt avec un guide qui explique les plantes et les animaux. Chaussures de marche obligatoires.'],
   ['c','Concert classique','L’orchestre de la ville joue Mozart dans l’église Saint-Paul. Dimanche à 18 h. Places à partir de douze euros.'],
   ['d','Cours d’escalade','Pour débutants : une séance de deux heures sur le mur d’escalade du gymnase. Le matériel est fourni.'],
   ['e','Visite de la ferme','Les enfants peuvent nourrir les animaux et goûter le lait et le fromage de la ferme. Entrée libre.'],
   ['f','Brocante','Plus de cent vendeurs proposent des meubles anciens, des livres et des vêtements d’occasion sur la place du marché.']],
  items:[['Vous voulez écouter de la musique.','c'],['Vous voulez acheter un vieux meuble.','f'],['Vous voulez faire un sport de montagne sans avoir de matériel.','d'],['Vous voulez préparer des desserts.','a']]},
 ee:{task:'Vous avez trouvé un nouvel appartement. Vous voulez faire une petite fête. Vous écrivez une lettre à vos amis français.',
  points:['La raison de la fête','La date et l’heure','L’adresse et le chemin','Ce qu’ils peuvent apporter','Les autres invités','Où dormir après la fête'],
  model:'Chers amis,\nj’ai une bonne nouvelle : j’ai enfin trouvé un appartement ! Pour fêter ça, je vous invite samedi 14 mai à partir de dix-neuf heures. Mon adresse : 8, rue des Tilleuls, au troisième étage. Du métro République, c’est à cinq minutes : prenez la première rue à gauche. Vous pouvez apporter une boisson ou un dessert, si vous voulez.\nJ’ai hâte de vous voir ! Je vous embrasse,\nSven'},
 oral:{part1:['nom ?','âge ?','pays d’origine ?','ville ?','profession ?','famille ?','sport ?'],
  part2:[['votre dernier week-end','où ? avec qui ? quoi ?'],['votre plat préféré','quoi ? quand ? recette ?'],['votre moyen de transport','lequel ? pourquoi ? combien de temps ?'],['un animal','lequel ? nom ? qui s’en occupe ?'],['votre anniversaire','date ? fête ? cadeaux ?']],
  part3:{task:'Vous et votre partenaire voulez faire une sortie samedi prochain. Mettez-vous d’accord sur deux activités. Donnez vos raisons.',options:['aller à la piscine','faire un pique-nique','visiter un château','aller au zoo','faire les magasins','aller au concert']},
  model:['On pourrait aller au zoo le matin ? J’adore les animaux.','Bof, je préfère visiter un château, parce qu’il va pleuvoir.','D’accord, le château le matin, et le soir un concert. On se retrouve à neuf heures à la gare ?']}
}
]};
