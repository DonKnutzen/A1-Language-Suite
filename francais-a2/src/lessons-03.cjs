/* Français A2, lessons 13–18. Format: see tools/build-francais-a2.cjs (correct option first). */
module.exports=[
{
 id:13,
 phrases:[
  ['Je voudrais prendre rendez-vous avec le docteur Blanc.','Ich möchte einen Termin bei Doktor Blanc vereinbaren.'],
  ['Vous êtes libre jeudi à quinze heures ?','Haben Sie Donnerstag um fünfzehn Uhr Zeit?'],
  ['Qu’est-ce qui ne va pas ?','Was fehlt Ihnen?'],
  ['J’ai mal au ventre depuis hier.','Ich habe seit gestern Bauchschmerzen.'],
  ['J’ai de la fièvre et je tousse.','Ich habe Fieber und huste.'],
  ['Le cabinet est fermé en raison de travaux.','Die Praxis ist wegen Bauarbeiten geschlossen.'],
  ['En cas d’urgence, adressez-vous au docteur Morin.','Im Notfall wenden Sie sich an Doktor Morin.'],
  ['Prenez ce médicament trois fois par jour.','Nehmen Sie dieses Medikament dreimal täglich.'],
  ['Vous avez votre carte Vitale ?','Haben Sie Ihre Versichertenkarte?'],
  ['Restez au lit deux jours.','Bleiben Sie zwei Tage im Bett.']
 ],
 quiz:[
  ['Wie vereinbarst du einen Termin?',['Je voudrais prendre rendez-vous.','Je voudrais donner rendez-vous.','Je voudrais faire un rendez-vous.'],'Je voudrais prendre rendez-vous avec le docteur Blanc.','Einen Termin vereinbaren = prendre rendez-vous.'],
  ['Was fragt der Arzt mit „Qu’est-ce qui ne va pas ?“',['Was fehlt Ihnen?','Wohin gehen Sie?','Was machen Sie nicht?'],'Qu’est-ce qui ne va pas ?','Wörtlich: Was geht nicht? – die typische Frage nach Beschwerden.'],
  ['J’ai mal ___ ventre.',['au','à la','aux'],'J’ai mal au ventre depuis hier.','Le ventre → à + le = au: j’ai mal au ventre.'],
  ['J’ai mal ___ tête.',['à la','au','aux'],'J’ai mal à la tête.','La tête → à la tête.'],
  ['Was bedeutet „en raison de travaux“?',['wegen Bauarbeiten','trotz Bauarbeiten','nach Bauarbeiten'],'Le cabinet est fermé en raison de travaux.','En raison de + Nomen = wegen (in Ansagen und Schreiben).'],
  ['Was bedeutet „En cas d’urgence“?',['im Notfall','im Krankenhaus','in der Sprechstunde'],'En cas d’urgence, adressez-vous au docteur Morin.','Une urgence = ein Notfall; en cas de = im Fall von.'],
  ['Adressez-vous ___ docteur Morin.',['au','à le','chez le'],'En cas d’urgence, adressez-vous au docteur Morin.','S’adresser à quelqu’un = sich an jemanden wenden; à + le = au.'],
  ['Prenez ce médicament trois fois ___ jour.',['par','pour','le'],'Prenez ce médicament trois fois par jour.','Trois fois par jour = dreimal täglich.'],
  ['Was bedeutet „je tousse“?',['ich huste','ich schwitze','ich niese'],'J’ai de la fièvre et je tousse.','Tousser = husten.'],
  ['Restez ___ lit deux jours.',['au','dans','à le'],'Restez au lit deux jours.','Rester au lit = im Bett bleiben.']
 ],
 dialogue:['Cabinet du docteur Blanc, bonjour.','Bonjour, je voudrais prendre rendez-vous, s’il vous plaît.','Qu’est-ce qui ne va pas ?','J’ai mal à la gorge et de la fièvre depuis hier.','Le docteur peut vous recevoir aujourd’hui à dix-sept heures.','Parfait, merci. Je viendrai avec ma carte Vitale.'],
 pron:['j’ai mal au ventre','Au [o] und eau [o] klingen gleich. In ventre ist en ein Nasal [ɑ̃]. Bei urgence [yʁʒɑ̃s] liegt die Betonung auf der letzten Silbe.'],
 transfer:['Rufe in einer Arztpraxis an: vereinbare einen Termin und beschreibe deine Beschwerden seit wann.','Schreibe eine kurze Nachricht an deinen Chef: Du bist krank, warst beim Arzt und bleibst zwei Tage zu Hause.'],
 domains:['Mündliche Interaktion','Mündliche Rezeption','Schriftliche Produktion'],
 app:{speak:'Bonjour, je voudrais prendre rendez-vous avec le docteur Blanc, s’il vous plaît. J’ai mal à la gorge et de la fièvre depuis deux jours. Je tousse beaucoup. Est-ce que je peux venir aujourd’hui ou demain matin ?',
  write:'Bonjour Monsieur Garnier,\nJe suis malade : j’ai de la fièvre depuis hier.\nJe suis allé chez le médecin ce matin.\nJe dois rester au lit deux jours.\nCordialement,\nPaul Weber',
  placeholder:'Schreibe eine Krankmeldung …',help:'Nenne Beschwerden, seit wann und was der Arzt gesagt hat.',
  hints:[['J’ai mal à la / au …','Mir tut … weh.'],['… depuis hier / deux jours','… seit gestern / zwei Tagen'],['Je dois rester au lit …','Ich muss … im Bett bleiben.']]},
 goals:['Einen Arzttermin vereinbaren und Beschwerden beschreiben.','Bandansagen einer Praxis verstehen (Öffnung, Notfall, Rückruf).','Ausdrücke wie avoir mal à, en raison de, en cas de verwenden.'],
 units:[
  {title:'Beschwerden beschreiben',rule:'Schmerzen beschreibst du mit avoir mal à + Körperteil. Achte auf die Verschmelzung: au ventre, au dos, à la tête, à la gorge, aux dents, aux oreilles. Weitere Symptome: avoir de la fièvre, tousser, être fatigué(e). Seit wann: depuis + Zeit.',
   pairs:[['J’ai mal au dos.','Ich habe Rückenschmerzen.'],['J’ai mal à la gorge.','Ich habe Halsschmerzen.'],['J’ai mal aux dents.','Ich habe Zahnschmerzen.'],['J’ai de la fièvre depuis hier.','Ich habe seit gestern Fieber.'],['Je tousse beaucoup.','Ich huste viel.']],
   emphasis:['avoir mal à','au','à la','aux','de la fièvre','depuis']},
  {title:'Ansagen in der Praxis verstehen',rule:'Bandansagen sind oft formell. En raison de + Nomen bedeutet „wegen“: en raison de travaux. En cas de + Nomen heißt „im Fall von“: en cas d’urgence. Mit s’adresser à (sich wenden an) und dem Imperativ der vous-Form: adressez-vous à, rappelez, laissez un message.',
   pairs:[['Le cabinet est fermé en raison de travaux.','Die Praxis ist wegen Bauarbeiten geschlossen.'],['En cas d’urgence, appelez le 15.','Im Notfall rufen Sie die 15 an.'],['Adressez-vous à la pharmacie de garde.','Wenden Sie sich an die Notdienstapotheke.'],['Rappelez demain à partir de huit heures.','Rufen Sie morgen ab acht Uhr wieder an.'],['Le cabinet reste fermé toute la journée.','Die Praxis bleibt den ganzen Tag geschlossen.']],
   emphasis:['en raison de','en cas de','s’adresser à','adressez-vous','rappelez']}
 ],
 tasks:[
  [0,'J’ai mal ___ dos.','au',['à la','aux'],'Ich habe Rückenschmerzen.','avoir mal à'],
  [0,'J’ai mal ___ gorge.','à la',['au','aux'],'Ich habe Halsschmerzen.','avoir mal à'],
  [0,'J’ai mal ___ dents.','aux',['au','à la'],'Ich habe Zahnschmerzen.','avoir mal à','Les dents → à + les = aux.'],
  [0,'J’ai de la fièvre ___ hier.','depuis',['il y a','pendant'],'Ich habe seit gestern Fieber.','depuis'],
  [0,'Je ___ beaucoup. (tousser)','tousse',['tousses','toussent'],'Ich huste viel.','Symptome'],
  [1,'Le cabinet est fermé en ___ de travaux.','raison',['cas','place'],'Die Praxis ist wegen Bauarbeiten geschlossen.','Ansage'],
  [1,'En ___ d’urgence, appelez le 15.','cas',['raison','fois'],'Im Notfall rufen Sie die 15 an.','Ansage'],
  [1,'___-vous à la pharmacie de garde.','Adressez',['Adresse','Adressons'],'Wenden Sie sich an die Notdienstapotheke.','Imperativ'],
  [1,'___ demain à partir de huit heures. (rappeler)','Rappelez',['Rappellez','Rappelle'],'Rufen Sie morgen ab acht wieder an.','Imperativ'],
  [1,'Je voudrais ___ rendez-vous.','prendre',['faire','donner'],'Ich möchte einen Termin vereinbaren.','Termin']
 ],
 check:[
  ['Ansage: « Le cabinet est fermé jusqu’au 15 août pour les vacances. Pour une urgence, adressez-vous à la maison médicale de la rue Hoche. » Was machst du im Notfall?',['Ich gehe zur Maison médicale in der Rue Hoche.','Ich warte bis zum 15. August.','Ich rufe die Praxis noch einmal an.'],'Pour une urgence, adressez-vous à … = im Notfall wenden Sie sich an …','urgence'],
  ['« La pharmacie est fermée ce matin en raison d’un inventaire. » Warum ist die Apotheke geschlossen?',['wegen einer Inventur','wegen Urlaub','wegen Krankheit'],'En raison de = wegen; un inventaire = eine Inventur.','raison'],
  ['Du hast seit drei Tagen Rückenschmerzen.',['J’ai mal au dos depuis trois jours.','J’ai mal à le dos depuis trois jours.','J’ai mal au dos il y a trois jours.'],'Au dos und depuis für eine andauernde Situation.','douleur','J’ai mal au dos depuis trois jours.'],
  ['Die Ärztin sagt: « Prenez un comprimé matin et soir pendant cinq jours. » Wie oft nimmst du die Tablette?',['zweimal am Tag','fünfmal am Tag','einmal am Tag'],'Matin et soir = morgens und abends.','medicament'],
  ['Am Telefon der Praxis: Du möchtest einen Termin für nächste Woche.',['Je voudrais prendre rendez-vous pour la semaine prochaine.','Je voudrais prendre rendez-vous la semaine dernière.','Je voudrais un rendez-vous il y a une semaine.'],'Prochain = nächster.','rdv','Je voudrais prendre rendez-vous pour la semaine prochaine.'],
  ['« Vous pouvez rappeler demain à partir de huit heures. » Ab wann kannst du morgen anrufen?',['ab 8 Uhr','bis 8 Uhr','um 18 Uhr'],'À partir de = ab.','horaire'],
  ['Die Ärztin fragt: « Qu’est-ce qui ne va pas ? » Du hast Fieber und Husten.',['J’ai de la fièvre et je tousse.','Je suis fièvre et je tousse.','J’ai fièvre et tousse.'],'Avoir de la fièvre; tousser.','symptome','J’ai de la fièvre et je tousse.'],
  ['« Restez au lit et buvez beaucoup d’eau. » Was sollst du tun?',['im Bett bleiben und viel trinken','spazieren gehen und Wasser kaufen','zur Arbeit gehen'],'Rester au lit = im Bett bleiben; boire = trinken.','conseil']
 ],
 transfers:[
  ['malau','J’ai mal ___ ventre.','au','Du hast Bauchschmerzen.'],
  ['malala','Il a mal ___ tête.','à la','Er hat Kopfschmerzen.'],
  ['malaux','Elle a mal ___ oreilles.','aux','Sie hat Ohrenschmerzen.'],
  ['raison','Le cours est annulé en ___ de la grève.','raison','Der Kurs fällt wegen des Streiks aus.'],
  ['cas','En ___ de problème, appelez-moi.','cas','Im Fall eines Problems rufen Sie mich an.'],
  ['adresser','___-vous à l’accueil. (s’adresser)','Adressez','Wenden Sie sich an den Empfang.'],
  ['rdv','Je dois ___ rendez-vous chez le dentiste. (vereinbaren)','prendre','Du musst einen Termin beim Zahnarzt vereinbaren.']
 ],
 comp:{voices:{A:'female',B:'male'},turns:[
  ['A','Cabinet médical, bonjour.'],['B','Bonjour madame, je voudrais un rendez-vous avec le docteur Leclerc.'],
  ['A','C’est urgent ?'],['B','Oui, j’ai mal à l’oreille depuis trois jours et j’ai un peu de fièvre.'],
  ['A','Le docteur est absent aujourd’hui, mais il peut vous voir demain à neuf heures.'],['B','Demain matin, c’est parfait.'],
  ['A','Vous êtes déjà venu chez nous ?'],['B','Non, c’est la première fois. J’apporte ma carte Vitale.']],
  fields:[['Arzt',['Doktor Leclerc','Doktor Blanc','Doktor Morin']],['Beschwerde',['Ohrenschmerzen','Halsschmerzen','Rückenschmerzen']],['Seit',['drei Tagen','gestern','einer Woche']],['Zusätzlich',['etwas Fieber','Husten','Schnupfen']],['Termin',['morgen 9 Uhr','heute 9 Uhr','morgen 19 Uhr']],['Patient war schon da',['nein, zum ersten Mal','ja, oft','ja, letzte Woche']]]},
 intro:['En cas d’urgence, adressez-vous au docteur Morin.',['En cas d’urgence, adressez-vous au docteur Moreau.','En raison d’urgence, adressez-vous au docteur Morin.']],
 hard:{
  obj:[['symptome','Beschwerden beschreiben'],['annonce','Ansagen einer Praxis verstehen'],['rdv','Termine vereinbaren'],['comprendre','Ein Gespräch in der Praxis verstehen']],
  text:'Bonjour, vous êtes bien au cabinet du docteur Faure. Le cabinet est fermé aujourd’hui en {raison|wegen (en … de)|annonce} d’une formation. En {cas|im Fall (en … de)|annonce} d’urgence, {adressez|sich wenden, vous|annonce}-vous au cabinet du docteur Lambert, rue Pasteur. Pour prendre {rendez-vous|Termin|rdv}, {rappelez|zurückrufen, vous|annonce} demain à partir de huit heures. — Le lendemain : « Bonjour, j’ai mal {à la|à + la (gorge)|symptome} gorge et j’ai {de la|Teilungsartikel (fièvre)|symptome} fièvre. Je {tousse|husten, je|symptome} aussi beaucoup. » — « Depuis {quand|seit wann|symptome} ? » — « {Depuis|seit|symptome} samedi. » — « Le docteur peut vous recevoir jeudi à dix heures. Ça vous {va|passen (ça vous …)|rdv} ? » — « Oui, merci. J’ai aussi mal {au|à + le (dos)|symptome} dos. » — Le médecin : « Prenez ce sirop trois fois {par|pro|rdv} jour et restez {au|im (Bett)|symptome} lit. »',
  listen:[
   {text:'Bonjour, ici le cabinet dentaire du docteur Simon. Nous sommes ouverts du lundi au vendredi, de huit heures à dix-huit heures. Le samedi, le cabinet est fermé. En cas d’urgence le week-end, appelez le 15.',voice:'female',
    q:[['Quels jours le cabinet est-il ouvert ?','du lundi au vendredi',['du lundi au vendredi','du lundi au samedi','tous les jours'],'annonce'],['Jusqu’à quelle heure ? Réponds en chiffres.','18',null,'annonce'],['Que faire en cas d’urgence le week-end ?','appeler le 15',['appeler le 15','venir au cabinet','laisser un message'],'comprendre']]},
   {turns:[['A','Bonjour docteur. J’ai très mal à la tête depuis lundi.'],['B','Vous avez de la fièvre ?'],['A','Non, mais je dors mal et je suis très fatiguée.'],['B','Je vous donne un médicament. Prenez-le le soir, pendant une semaine.']],voices:{A:'female',B:'male'},
    q:[['Où la patiente a-t-elle mal ?','à la tête',['à la tête','au ventre','au dos'],'symptome'],['Est-ce qu’elle a de la fièvre ?','Non.',['Non.','Oui, beaucoup.','Un peu.'],'symptome'],['Quand faut-il prendre le médicament ?','le soir',['le soir','le matin','à midi'],'comprendre']]}
  ],
  writing:{situation:'Tu es malade et tu ne peux pas aller à ton cours de français. Écris un e-mail à ton professeur.',points:['Dis ce que tu as et depuis quand.','Explique ce que le médecin t’a dit.','Demande ce que tu dois faire pour le prochain cours.'],
   model:'Bonjour Madame Leroy,\nJe ne pourrai pas venir au cours demain, car je suis malade. J’ai mal à la gorge et de la fièvre depuis dimanche. Je suis allée chez le médecin ce matin : je dois rester au lit trois jours et prendre des médicaments. Qu’est-ce que je dois préparer pour le prochain cours ?\nMerci et bonne journée,\nLisa Hoffmann'}
 },
 words:[['prendre rendez-vous','einen Termin vereinbaren','to make an appointment'],['avoir mal à','Schmerzen haben in','to have a pain in'],['la fièvre','das Fieber','fever'],['tousser','husten','to cough'],['en raison de','wegen','due to'],['en cas d’urgence','im Notfall','in an emergency'],['s’adresser à','sich wenden an','to contact'],['le cabinet (médical)','die Arztpraxis','doctor’s surgery']],
 vocab:[['le cabinet médical','die Arztpraxis'],['le rendez-vous','der Termin'],['le ventre','der Bauch'],['le dos','der Rücken'],['la gorge','der Hals'],['tousser','husten'],['l’urgence (f.)','der Notfall'],['en raison de','wegen'],['s’adresser à','sich wenden an'],['le médicament','das Medikament'],['les travaux (m.)','die Bauarbeiten'],['fermé / fermée','geschlossen']]
},
{
 id:14,
 phrases:[
  ['Votre attention, s’il vous plaît.','Ihre Aufmerksamkeit, bitte.'],
  ['Le TGV pour Marseille partira voie 7.','Der TGV nach Marseille fährt von Gleis 7 ab.'],
  ['Le train arrivera avec vingt minutes de retard.','Der Zug wird mit zwanzig Minuten Verspätung ankommen.'],
  ['Nous informons les voyageurs que le train est supprimé.','Wir informieren die Reisenden, dass der Zug ausfällt.'],
  ['En raison d’une grève, le trafic est perturbé.','Wegen eines Streiks ist der Verkehr gestört.'],
  ['Vous avez une correspondance à Lyon.','Sie haben einen Anschluss in Lyon.'],
  ['Un aller simple pour Bordeaux, s’il vous plaît.','Eine einfache Fahrt nach Bordeaux, bitte.'],
  ['Je voudrais un aller-retour en deuxième classe.','Ich möchte eine Hin- und Rückfahrt in der zweiten Klasse.'],
  ['N’oubliez pas de composter votre billet.','Vergessen Sie nicht, Ihre Fahrkarte zu entwerten.'],
  ['Cette annonce est importante pour moi.','Diese Durchsage ist wichtig für mich.']
 ],
 quiz:[
  ['Was bedeutet „la voie 7“ am Bahnhof?',['Gleis 7','Wagen 7','Ausgang 7'],'Le TGV pour Marseille partira voie 7.','La voie = das Gleis; la voiture = der Wagen.'],
  ['Le train ___ avec vingt minutes de retard. (arriver, Futur)',['arrivera','arrive','arrivait'],'Le train arrivera avec vingt minutes de retard.','Durchsagen kündigen mit dem futur simple an: arrivera, partira.'],
  ['Was bedeutet „le train est supprimé“?',['Der Zug fällt aus.','Der Zug ist voll.','Der Zug ist pünktlich.'],'Nous informons les voyageurs que le train est supprimé.','Supprimé = gestrichen, fällt aus.'],
  ['Was ist „une grève“?',['ein Streik','ein Unfall','eine Baustelle'],'En raison d’une grève, le trafic est perturbé.','La grève = der Streik.'],
  ['Was bedeutet „une correspondance“?',['ein Anschlusszug','ein Briefwechsel','ein Sitzplatz'],'Vous avez une correspondance à Lyon.','Am Bahnhof ist la correspondance der Anschluss.'],
  ['Du willst nur hin, nicht zurück.',['un aller simple','un aller-retour','un retour simple'],'Un aller simple pour Bordeaux, s’il vous plaît.','Aller simple = einfache Fahrt; aller-retour = hin und zurück.'],
  ['Was bedeutet „le trafic est perturbé“?',['Der Verkehr ist gestört.','Der Verkehr ist eingestellt.','Der Verkehr ist normal.'],'En raison d’une grève, le trafic est perturbé.','Perturbé = gestört, unregelmäßig.'],
  ['Le train pour Lyon ___ voie 3. (partir, Futur)',['partira','partirait','partait'],'Le train pour Lyon partira voie 3.','Partir → partira (Futur).'],
  ['Was musst du mit dem Ticket tun? « N’oubliez pas de composter votre billet. »',['entwerten','kaufen','zeigen'],'N’oubliez pas de composter votre billet.','Composter = (am Automaten) entwerten.'],
  ['Nous informons les voyageurs ___ le train est en retard.',['que','qui','de'],'Nous informons les voyageurs que le train est en retard.','Informer quelqu’un que … = jemanden informieren, dass …']
 ],
 dialogue:['Bonjour, un aller-retour pour Lyon, s’il vous plaît.','En première ou en deuxième classe ?','En deuxième. Le train part de quelle voie ?','Voie 5, mais attention, il a quinze minutes de retard.','J’ai une correspondance à Lyon. C’est grave ?','Non, votre correspondance attendra.'],
 pron:['voie / voiture','Voie [vwa] ist eine Silbe; voiture [vwatyʁ] hat zwei. In Durchsagen achte auf Zahlen und das Wort retard [ʁətaʁ]. Nach avec folgt oft die Zahl der Minuten.'],
 transfer:['Kaufe am Schalter eine Fahrkarte (Ziel, hin/zurück, Klasse) und frage nach Gleis und Verspätung.','Schreibe einem Freund eine SMS: Dein Zug hat Verspätung, wann du ankommst und wo er dich abholen soll.'],
 domains:['Mündliche Rezeption','Schriftliche Rezeption','Mündliche Interaktion'],
 app:{speak:'Bonjour, je voudrais un aller-retour pour Bordeaux en deuxième classe, s’il vous plaît. Le train part de quelle voie ? Il a du retard ? J’ai une correspondance à Bordeaux pour Arcachon.',
  write:'Salut Pierre,\nMon train a trente minutes de retard.\nJ’arriverai à la gare à 18 h 40.\nTu peux venir me chercher voie 2 ?\nMerci !\nAnna',
  placeholder:'Schreibe eine SMS über deine Verspätung …',help:'Nenne Verspätung, neue Ankunftszeit und Treffpunkt.',
  hints:[['Mon train a … minutes de retard.','Mein Zug hat … Minuten Verspätung.'],['J’arriverai à …','Ich komme um … an.'],['Tu peux venir me chercher … ?','Kannst du mich … abholen?']]},
 goals:['Durchsagen am Bahnhof verstehen und entscheiden, ob sie für mich wichtig sind.','Fahrkarten kaufen und nach Gleis, Anschluss und Verspätung fragen.','Ankündigungen im futur simple und mit en raison de verstehen.'],
 units:[
  {title:'Durchsagen verstehen',rule:'Bahnhofsdurchsagen beginnen oft mit Votre attention, s’il vous plaît. Sie benutzen das futur simple: le train partira, arrivera. Wichtig sind Ziel (pour Lyon / en direction de Lyon), Gleis (voie), Verspätung (avec … minutes de retard) und Ausfall (supprimé). Gründe: en raison de + Nomen.',
   pairs:[['Le train pour Lyon partira voie 3.','Der Zug nach Lyon fährt von Gleis 3 ab.'],['Le TGV arrivera avec dix minutes de retard.','Der TGV kommt mit zehn Minuten Verspätung an.'],['Le train de 14 h 10 est supprimé.','Der Zug um 14.10 Uhr fällt aus.'],['En raison d’un incident, le trafic est interrompu.','Wegen eines Zwischenfalls ist der Verkehr unterbrochen.'],['Les voyageurs en direction de Paris sont priés de changer de quai.','Reisende Richtung Paris werden gebeten, den Bahnsteig zu wechseln.']],
   emphasis:['Votre attention','partira','arrivera','voie','retard','supprimé','en raison de']},
  {title:'Fahrkarten und Anschluss',rule:'Am Schalter: un aller simple (einfach), un aller-retour (hin und zurück), en première / deuxième classe. Le billet ist die Fahrkarte; composter = entwerten. La correspondance ist der Anschluss: J’ai une correspondance à Lyon. Abfahrt: Le train part à quelle heure ? De quelle voie ?',
   pairs:[['Un aller simple pour Nice, s’il vous plaît.','Eine einfache Fahrt nach Nizza, bitte.'],['Un aller-retour en deuxième classe.','Hin und zurück, zweite Klasse.'],['Le train part de quelle voie ?','Von welchem Gleis fährt der Zug?'],['J’ai une correspondance à Dijon.','Ich habe einen Anschluss in Dijon.'],['Il faut composter le billet.','Man muss die Fahrkarte entwerten.']],
   emphasis:['un aller simple','un aller-retour','la correspondance','composter','De quelle voie']}
 ],
 tasks:[
  [0,'Le train pour Lyon ___ voie 3. (partir)','partira',['partirait','partiront'],'Der Zug nach Lyon wird von Gleis 3 abfahren.','Futur','Ankündigung im futur simple: le train partira. Partirait ist conditionnel, partiront gehört zu ils.'],
  [0,'Le TGV ___ avec dix minutes de retard. (arriver)','arrivera',['arrivait','arriverait'],'Der TGV wird mit zehn Minuten Verspätung ankommen.','Futur'],
  [0,'Le train de 14 h 10 est ___. (fällt aus)','supprimé',['retardé','composté'],'Der Zug um 14.10 Uhr fällt aus.','Durchsage'],
  [0,'En ___ d’un incident, le trafic est interrompu.','raison',['cas','retard'],'Wegen eines Zwischenfalls ist der Verkehr unterbrochen.','Durchsage'],
  [0,'Le train a vingt minutes de ___.','retard',['avance','voie'],'Der Zug hat zwanzig Minuten Verspätung.','Durchsage'],
  [1,'Un aller ___ pour Nice, s’il vous plaît.','simple',['retour','seul'],'Eine einfache Fahrt nach Nizza, bitte.','Fahrkarte'],
  [1,'Un ___ en deuxième classe. (hin und zurück)','aller-retour',['aller simple','retour simple'],'Hin und zurück, zweite Klasse.','Fahrkarte'],
  [1,'Le train part de quelle ___ ?','voie',['voiture','route'],'Von welchem Gleis fährt der Zug?','Gleis'],
  [1,'J’ai une ___ à Dijon. (Anschluss)','correspondance',['connexion','direction'],'Ich habe einen Anschluss in Dijon.','Anschluss'],
  [1,'Il faut ___ le billet. (entwerten)','composter',['comporter','compter'],'Man muss die Fahrkarte entwerten.','Fahrkarte']
 ],
 check:[
  ['Du wartest auf den Zug nach Paris. Durchsage: « Le train en direction de Nantes arrivera avec trente minutes de retard. » Ist die Durchsage wichtig für dich?',['Nein, sie betrifft den Zug nach Nantes.','Ja, mein Zug hat Verspätung.','Ja, mein Zug fällt aus.'],'Die Verspätung gilt nur für die Richtung Nantes.','important'],
  ['« Le TER de 9 h 15 pour Rouen est supprimé en raison d’une grève. » Was ist los?',['Der Zug fällt wegen eines Streiks aus.','Der Zug hat wegen eines Streiks Verspätung.','Der Zug fährt wegen eines Streiks früher.'],'Supprimé = fällt aus; une grève = ein Streik.','supprime'],
  ['Du möchtest nach Lille und zurück, zweite Klasse.',['Un aller-retour pour Lille en deuxième classe, s’il vous plaît.','Un aller simple pour Lille en deuxième classe, s’il vous plaît.','Un retour pour Lille en seconde, s’il vous plaît.'],'Hin und zurück = aller-retour.','billet','Un aller-retour pour Lille en deuxième classe, s’il vous plaît.'],
  ['« Le train pour Strasbourg partira voie 9 et non voie 4. » Wohin gehst du?',['zu Gleis 9','zu Gleis 4','zu Gleis 19'],'Et non voie 4 = und nicht Gleis 4.','voie'],
  ['« Votre correspondance pour Avignon attendra votre train. » Was heißt das?',['Der Anschlusszug wartet.','Der Anschlusszug fällt aus.','Du musst einen anderen Zug nehmen.'],'La correspondance attendra = der Anschluss wird warten.','correspondance'],
  ['Du fragst, von welchem Gleis dein Zug fährt.',['Le train part de quelle voie ?','Le train part de quelle voiture ?','Le train part de quelle route ?'],'La voie = das Gleis.','question','Le train part de quelle voie ?'],
  ['« Le train arrivera avec un retard d’environ quarante minutes. » Wie groß ist die Verspätung?',['etwa 40 Minuten','genau 14 Minuten','etwa 4 Minuten'],'Environ = ungefähr.','retard'],
  ['Durchsage: « N’oubliez pas de composter votre billet avant de monter dans le train. » Wann entwertest du die Fahrkarte?',['vor dem Einsteigen','im Zug','nach der Ankunft'],'Avant de monter = bevor man einsteigt.','composter']
 ],
 transfers:[
  ['futur','Le train pour Nice ___ voie 2. (partir, Futur)','partira','Der Zug nach Nizza fährt von Gleis 2 ab.'],
  ['futur','Le TGV ___ à 18 heures. (arriver, Futur)','arrivera','Der TGV kommt um 18 Uhr an.'],
  ['retard','Le train a quinze minutes de ___.','retard','Der Zug hat fünfzehn Minuten Verspätung.'],
  ['supprime','Le dernier train est ___. (fällt aus)','supprimé','Der letzte Zug fällt aus.'],
  ['billet','Un aller ___ pour Tours, s’il vous plaît. (einfach)','simple','Du kaufst eine einfache Fahrt nach Tours.'],
  ['voie','Le train arrive ___ 6. (Gleis)','voie','Der Zug fährt auf Gleis 6 ein.'],
  ['raison','Le trafic est perturbé en ___ d’une grève.','raison','Der Verkehr ist wegen eines Streiks gestört.']
 ],
 comp:{voices:{A:'male',B:'female'},turns:[
  ['A','Votre attention, s’il vous plaît. Le TGV 6107 en direction de Montpellier partira voie 11.'],['A','Ce train a un retard d’environ vingt-cinq minutes.'],
  ['B','Excusez-moi, monsieur, j’ai une correspondance à Nîmes à quinze heures.'],['A','Avec le retard, vous arriverez à Nîmes à quinze heures dix.'],
  ['B','Alors je vais rater ma correspondance ?'],['A','Non, le train pour Arles partira à quinze heures trente.'],
  ['B','Ouf ! Et où je peux acheter un café ?'],['A','Il y a un bar en face de la voie 3.']],
  fields:[['Ziel des TGV',['Montpellier','Marseille','Nîmes']],['Gleis',['11','7','13']],['Verspätung',['etwa 25 Minuten','etwa 15 Minuten','eine Stunde']],['Ankunft in Nîmes',['15:10 Uhr','15:00 Uhr','15:30 Uhr']],['Anschluss fährt nach',['Arles','Avignon','Lyon']],['Café',['gegenüber Gleis 3','im Zug','am Ausgang']]]},
 intro:['Le train arrivera avec vingt minutes de retard.',['Le train arrivera avec dix minutes de retard.','Le train partira avec vingt minutes de retard.']],
 hard:{
  obj:[['annonce','Bahnhofsdurchsagen verstehen'],['billet','Fahrkarten und Gleise'],['futur','Futur in Ankündigungen'],['comprendre','Entscheiden, ob eine Information wichtig ist']],
  text:'Votre {attention|Aufmerksamkeit|annonce}, s’il vous plaît. Le TGV numéro 5210 en direction de Bordeaux {partira|abfahren, Futur|futur} {voie|Gleis|billet} 4. Ce train {arrivera|ankommen, Futur|futur} à Bordeaux avec vingt minutes de {retard|Verspätung|annonce}. Nous {informons|informieren, nous|annonce} les voyageurs que le train de 16 h 05 pour Poitiers est {supprimé|fällt aus|annonce} en {raison|wegen (en … de)|annonce} d’une grève. Les voyageurs pour Poitiers {prendront|nehmen, Futur, ils|futur} le car de remplacement. — Au guichet : « Bonjour, un aller {simple|einfach|billet} pour La Rochelle, s’il vous plaît. » — « En deuxième {classe|Klasse|billet} ? » — « Oui. J’ai une {correspondance|Anschluss|billet} à Bordeaux. » — « Votre train pour La Rochelle {attendra|warten, Futur|futur}. N’oubliez pas de {composter|entwerten|billet} votre billet. »',
  listen:[
   {text:'Votre attention, s’il vous plaît. Le train Intercités pour Clermont-Ferrand, départ prévu à 11 h 20, partira voie 2 au lieu de voie 6. Nous vous remercions de votre compréhension.',voice:'female',
    q:[['À quelle heure le départ était-il prévu ?','11 h 20',['11 h 20','11 h 02','12 h 20'],'annonce'],['De quelle voie part le train ? Réponds en chiffres.','2',null,'billet'],['Qu’est-ce qui change ?','la voie',['la voie','l’heure de départ','la destination'],'comprendre']]},
   {turns:[['A','Pardon, le train pour Lille est à l’heure ?'],['B','Non, il a dix minutes de retard. Il partira à 9 h 25.'],['A','Et il part de quelle voie ?'],['B','Voie 8. Vous avez votre billet ?']],voices:{A:'male',B:'female'},
    q:[['Combien de minutes de retard a le train ? Réponds en chiffres.','10',null,'annonce'],['À quelle heure partira-t-il ?','9 h 25',['9 h 25','9 h 15','9 h 35'],'futur'],['De quelle voie ?','voie 8',['voie 8','voie 18','voie 6'],'billet']]}
  ],
  writing:{situation:'Ton train est supprimé. Écris un e-mail à l’amie française qui t’attend.',points:['Explique ce qui s’est passé à la gare.','Dis quel autre train tu prendras et quand tu arriveras.','Demande-lui de venir te chercher ou propose un autre rendez-vous.'],
   model:'Chère Margot,\nMauvaise nouvelle : mon train de 10 heures est supprimé en raison d’une grève. Je prendrai le train suivant, à 12 h 30. Il arrivera à Tours à 14 h 15. Est-ce que tu pourras venir me chercher à la gare ? Si ce n’est pas possible, je prendrai un taxi.\nÀ tout à l’heure,\nJana'}
 },
 words:[['la voie','das Gleis','platform, track'],['le retard','die Verspätung','delay'],['supprimé / supprimée','gestrichen, fällt aus','cancelled'],['la grève','der Streik','strike'],['la correspondance','der Anschluss','connection'],['un aller simple','eine einfache Fahrt','a single ticket'],['un aller-retour','eine Hin- und Rückfahrt','a return ticket'],['composter','entwerten','to validate']],
 vocab:[['la gare','der Bahnhof'],['la voie','das Gleis'],['le voyageur / la voyageuse','der / die Reisende'],['supprimé / supprimée','gestrichen'],['la grève','der Streik'],['la correspondance','der Anschluss'],['le billet','die Fahrkarte'],['composter','entwerten'],['l’aller simple (m.)','die einfache Fahrt'],['l’aller-retour (m.)','die Hin- und Rückfahrt'],['le guichet','der Schalter'],['perturbé / perturbée','gestört']]
},
{
 id:15,
 phrases:[
  ['Information pour les automobilistes sur l’autoroute A7.','Information für Autofahrer auf der Autobahn A7.'],
  ['En raison d’un accident, l’autoroute est coupée.','Wegen eines Unfalls ist die Autobahn gesperrt.'],
  ['Vous êtes priés de quitter l’autoroute à la sortie 15.','Sie werden gebeten, die Autobahn an der Ausfahrt 15 zu verlassen.'],
  ['Suivez l’itinéraire de déviation.','Folgen Sie der Umleitung.'],
  ['Il y a un bouchon de dix kilomètres.','Es gibt einen Stau von zehn Kilometern.'],
  ['Faites le plein à la prochaine station-service.','Tanken Sie an der nächsten Tankstelle voll.'],
  ['Le conducteur de la voiture bleue est prié de venir à l’accueil.','Der Fahrer des blauen Autos wird gebeten, zum Empfang zu kommen.'],
  ['Le parking est complet.','Der Parkplatz ist voll.'],
  ['Roulez prudemment, la route est glissante.','Fahren Sie vorsichtig, die Straße ist glatt.'],
  ['Vous pouvez continuer jusqu’à Valence.','Sie können bis Valence weiterfahren.']
 ],
 quiz:[
  ['Was bedeutet „l’autoroute est coupée“?',['Die Autobahn ist gesperrt.','Die Autobahn ist kostenlos.','Die Autobahn ist neu.'],'En raison d’un accident, l’autoroute est coupée.','Coupé(e) = gesperrt, unterbrochen.'],
  ['Vous êtes priés ___ quitter l’autoroute.',['de','à','pour'],'Vous êtes priés de quitter l’autoroute à la sortie 15.','Être prié(e) de + Infinitiv = gebeten werden, etwas zu tun.'],
  ['Was ist „la sortie“ auf der Autobahn?',['die Ausfahrt','die Auffahrt','die Raststätte'],'…à la sortie 15.','La sortie = die Ausfahrt; l’entrée = die Auffahrt.'],
  ['Was ist „un bouchon“?',['ein Stau','eine Baustelle','eine Ampel'],'Il y a un bouchon de dix kilomètres.','Un bouchon = ein Stau (auch: ein Korken).'],
  ['Was bedeutet „Suivez l’itinéraire de déviation“?',['Folgen Sie der Umleitung.','Folgen Sie der Autobahn.','Folgen Sie dem Polizeiwagen.'],'Suivez l’itinéraire de déviation.','La déviation = die Umleitung.'],
  ['Le conducteur est ___ de venir à l’accueil.',['prié','prie','priés'],'Le conducteur de la voiture bleue est prié de venir à l’accueil.','Ein Fahrer → prié (Singular, männlich).'],
  ['Was bedeutet „Le parking est complet“?',['Der Parkplatz ist voll.','Der Parkplatz ist kostenlos.','Der Parkplatz ist geschlossen.'],'Le parking est complet.','Complet = voll belegt.'],
  ['Was bedeutet „la route est glissante“?',['Die Straße ist glatt.','Die Straße ist gesperrt.','Die Straße ist frei.'],'Roulez prudemment, la route est glissante.','Glissant(e) = rutschig, glatt.'],
  ['Wo tankst du?',['à la station-service','à l’aire de pique-nique','au péage'],'Faites le plein à la prochaine station-service.','Faire le plein = volltanken; le péage = die Mautstelle.'],
  ['Vous pouvez continuer ___ Valence.',['jusqu’à','depuis','dans'],'Vous pouvez continuer jusqu’à Valence.','Jusqu’à = bis.']
 ],
 dialogue:['Tu as entendu la radio ? L’A4 est coupée.','Pourquoi ?','En raison d’un camion en panne près de Metz.','Alors on fait comment ?','On doit quitter l’autoroute à la prochaine sortie et suivre la déviation.','D’accord. Et on fera le plein à la station-service.'],
 pron:['autoroute / sortie','Au in autoroute spricht man [o]: [otoʁut]. In sortie ist das r hinten im Rachen. Zahlen von Ausfahrten und Kilometern kommen oft am Ende der Meldung.'],
 transfer:['Erkläre deinem Beifahrer eine Verkehrsmeldung: Was ist passiert, wo sollt ihr abfahren, wie geht es weiter?','Schreibe eine Nachricht: Ihr steht im Stau, warum, und wann ihr ungefähr ankommt.'],
 domains:['Mündliche Rezeption','Mündliche Interaktion','Schriftliche Produktion'],
 app:{speak:'La radio dit qu’il y a un accident sur l’autoroute A7. L’autoroute est coupée après Orange. Nous sommes priés de quitter l’autoroute à la sortie 15 et de suivre la déviation. Il y a aussi un bouchon de dix kilomètres. Nous arriverons avec une heure de retard.',
  write:'Salut Julien,\nNous sommes dans un bouchon sur l’A7.\nIl y a eu un accident près d’Orange.\nNous devons suivre la déviation.\nNous arriverons vers vingt heures.',
  placeholder:'Schreibe eine Nachricht aus dem Stau …',help:'Sage, wo ihr seid, warum es dauert und wann ihr ankommt.',
  hints:[['Nous sommes dans un bouchon …','Wir stehen im Stau …'],['En raison de …','Wegen …'],['Nous arriverons vers …','Wir kommen gegen … an.']]},
 goals:['Verkehrsmeldungen im Radio verstehen und die richtige Handlung ableiten.','Durchsagen auf dem Parkplatz verstehen (Fahrer wird gebeten …).','être prié(e) de + Infinitiv und en raison de verwenden.'],
 units:[
  {title:'être prié de + Infinitiv',rule:'In offiziellen Durchsagen bittet man mit être prié(e)(s) de + Infinitiv: Vous êtes priés de quitter l’autoroute. Le conducteur est prié de venir à l’accueil. Das Partizip prié richtet sich nach der Person: priée (eine Frau), priés (mehrere). Im Alltag sagt man eher: Merci de … / Veuillez …',
   pairs:[['Vous êtes priés de quitter l’autoroute.','Sie werden gebeten, die Autobahn zu verlassen.'],['Le conducteur est prié de déplacer sa voiture.','Der Fahrer wird gebeten, sein Auto wegzufahren.'],['La propriétaire est priée de venir à l’accueil.','Die Besitzerin wird gebeten, zum Empfang zu kommen.'],['Merci de ralentir.','Bitte langsamer fahren.'],['Veuillez suivre la déviation.','Bitte folgen Sie der Umleitung.']],
   emphasis:['être prié(e)(s) de','priée','priés','Merci de','Veuillez']},
  {title:'Verkehrsmeldungen',rule:'Typische Wörter: l’autoroute (Autobahn), la sortie (Ausfahrt), coupé(e) (gesperrt), un accident, un bouchon (Stau), la déviation / l’itinéraire bis (Umleitung), à la hauteur de (auf Höhe von). Der Grund steht mit en raison de, die Richtung mit en direction de.',
   pairs:[['L’A1 est coupée à la hauteur de Lille.','Die A1 ist auf Höhe von Lille gesperrt.'],['Il y a un bouchon en direction de Paris.','Es gibt einen Stau Richtung Paris.'],['Prenez la sortie 22.','Nehmen Sie die Ausfahrt 22.'],['Suivez l’itinéraire bis.','Folgen Sie der Umleitung.'],['La circulation est difficile.','Der Verkehr ist dicht.']],
   emphasis:['coupé(e)','un bouchon','la sortie','la déviation','l’itinéraire bis','à la hauteur de','en direction de']}
 ],
 tasks:[
  [0,'Vous êtes ___ de quitter l’autoroute.','priés',['prié','priées'],'Sie werden gebeten, die Autobahn zu verlassen.','être prié de','Vous an mehrere Autofahrer → priés.'],
  [0,'Le conducteur est prié ___ déplacer sa voiture.','de',['à','pour'],'Der Fahrer wird gebeten, sein Auto wegzufahren.','être prié de'],
  [0,'La propriétaire est ___ de venir à l’accueil.','priée',['prié','priés'],'Die Besitzerin wird gebeten, zum Empfang zu kommen.','être prié de'],
  [0,'Merci ___ ralentir.','de',['à','pour'],'Bitte langsamer fahren.','Bitte'],
  [0,'___ suivre la déviation. (bitte, formell)','Veuillez',['Voulez','Veuille'],'Bitte folgen Sie der Umleitung.','Bitte'],
  [1,'L’A1 est ___ à la hauteur de Lille. (gesperrt)','coupée',['coupé','coupés'],'Die A1 ist auf Höhe von Lille gesperrt.','Verkehr','L’autoroute ist weiblich → coupée.'],
  [1,'Il y a un ___ en direction de Paris. (Stau)','bouchon',['bouton','camion'],'Es gibt einen Stau Richtung Paris.','Verkehr'],
  [1,'Prenez la ___ 22. (Ausfahrt)','sortie',['entrée','route'],'Nehmen Sie die Ausfahrt 22.','Verkehr'],
  [1,'Suivez l’itinéraire ___. (Umleitung)','de déviation',['de sortie','de péage'],'Folgen Sie der Umleitung.','Verkehr','L’itinéraire de déviation (auf Schildern auch itinéraire bis) = die Umleitung. La sortie ist die Ausfahrt, le péage die Mautstelle.'],
  [1,'La route est fermée en ___ de travaux.','raison',['cas','direction'],'Die Straße ist wegen Bauarbeiten gesperrt.','en raison de']
 ],
 check:[
  ['Du fährst auf der A4 Richtung Strasbourg. Radio: « En raison de la neige, l’A4 est coupée à la hauteur de Saverne. Vous êtes priés de sortir à Phalsbourg. » Kannst du auf der A4 bis Strasbourg weiterfahren?',['Nein, ich muss bei Phalsbourg abfahren.','Ja, nur bei Saverne gibt es Stau.','Ja, aber nur mit Winterreifen.'],'Coupée = gesperrt: Die A4 ist bei Saverne zu, deshalb sollst du bei Phalsbourg abfahren (vous êtes priés de sortir).','coupee'],
  ['Supermarkt-Parkplatz: « Le conducteur de la Peugeot grise immatriculée 4521 KB est prié de venir à l’accueil. » Dein Auto ist ein grauer Peugeot mit 4521 KB. Was tust du?',['zum Empfang gehen','das Auto wegfahren','nichts, es betrifft mich nicht'],'Est prié de venir à l’accueil = soll zum Empfang kommen.','parking'],
  ['« Il y a un bouchon de quinze kilomètres en direction de Lyon. » Was bedeutet das?',['15 km Stau Richtung Lyon','15 km bis Lyon','eine Baustelle 15 km vor Lyon'],'Un bouchon = ein Stau.','bouchon'],
  ['Du sagst deinem Beifahrer, dass ihr der Umleitung folgen müsst.',['On doit suivre la déviation.','On doit suivre la sortie.','On doit suivre le bouchon.'],'La déviation = die Umleitung.','deviation','On doit suivre la déviation.'],
  ['« Le parking du centre est complet. Utilisez le parking de la gare. » Wo parkst du?',['am Bahnhof','im Zentrum','vor dem Rathaus'],'Complet = voll.','complet'],
  ['Welche Form ist richtig? « Les automobilistes sont ___ de rouler prudemment. »',['priés','prié','priée'],'Mehrere Autofahrer → priés.','prie','Les automobilistes sont priés de rouler prudemment.'],
  ['« En raison du verglas, la route est glissante. » Warum ist die Straße glatt?',['wegen Glatteis','wegen Regen','wegen Öl auf der Straße'],'Le verglas = das Glatteis.','raison'],
  ['Du musst tanken.',['Je dois faire le plein.','Je dois faire le péage.','Je dois faire la sortie.'],'Faire le plein = volltanken.','plein','Je dois faire le plein.']
 ],
 transfers:[
  ['prie','Vous êtes ___ de ralentir. (mehrere Personen)','priés','Sie werden gebeten, langsamer zu fahren.'],
  ['prie','La conductrice est ___ de venir à la caisse.','priée','Die Fahrerin wird gebeten, zur Kasse zu kommen.'],
  ['de','Le propriétaire est prié ___ déplacer son véhicule.','de','Der Besitzer soll sein Fahrzeug wegfahren.'],
  ['coupee','L’autoroute est ___ après Lyon. (gesperrt)','coupée','Die Autobahn ist nach Lyon gesperrt.'],
  ['sortie','Quittez l’autoroute à la ___ 12.','sortie','Verlassen Sie die Autobahn an der Ausfahrt 12.'],
  ['bouchon','Il y a un ___ de cinq kilomètres. (Stau)','bouchon','Es gibt fünf Kilometer Stau.'],
  ['raison','La route est fermée en ___ d’un accident.','raison','Die Straße ist wegen eines Unfalls gesperrt.']
 ],
 comp:{voices:{A:'female',B:'male'},turns:[
  ['A','Bonjour à tous, voici les informations routières de dix-sept heures.'],['A','Sur l’autoroute A10, un camion est en panne à la hauteur d’Orléans, en direction de Paris.'],
  ['A','Il y a un bouchon de huit kilomètres.'],['A','Les automobilistes sont priés de quitter l’autoroute à la sortie 14 et de suivre l’itinéraire bis.'],
  ['B','Huit kilomètres ! On sort à la sortie 14 ?'],['A','Dans l’autre direction, vers Bordeaux, la circulation est normale.'],
  ['B','Bon, on va prendre la sortie et faire le plein.'],['A','Prochain point info à dix-huit heures.']],
  fields:[['Autobahn',['A10','A1','A7']],['Ursache',['ein Lkw mit Panne','ein Unfall','Bauarbeiten']],['Ort',['auf Höhe von Orléans','bei Bordeaux','in Paris']],['Stau',['8 km','18 km','80 km']],['Empfohlene Ausfahrt',['14','4','40']],['Richtung Bordeaux',['normaler Verkehr','auch Stau','gesperrt']]]},
 intro:['Vous êtes priés de quitter l’autoroute à la sortie 15.',['Vous êtes priés de quitter l’autoroute à la sortie 16.','Vous êtes priés de prendre l’autoroute à la sortie 15.']],
 hard:{
  obj:[['prie','être prié de + Infinitiv'],['route','Verkehrswortschatz'],['raison','Gründe mit en raison de'],['comprendre','Verkehrsmeldungen verstehen']],
  text:'Point route de midi sur l’{autoroute|Autobahn|route} A9 en {direction|Richtung|route} de l’Espagne. En {raison|wegen (en … de)|raison} d’un incendie de forêt, l’autoroute est {coupée|gesperrt, weiblich|route} près de Narbonne. Vous êtes {priés|gebeten, Plural|prie} {de|zu (être prié …)|prie} quitter l’autoroute à la {sortie|Ausfahrt|route} 24 et de suivre l’itinéraire {bis|Umleitung (itinéraire …)|route}. Il y a déjà un {bouchon|Stau|route} de six kilomètres. Sur le parking de l’aire de repos, le conducteur de la camionnette blanche est {prié|gebeten, Singular m.|prie} de déplacer son véhicule. La conductrice de la petite voiture rouge est {priée|gebeten, Singular f.|prie} de venir à la boutique. En {raison|wegen (en … de)|raison} de la pluie, la route est {glissante|glatt|route} : roulez {prudemment|vorsichtig|route}.',
  listen:[
   {text:'Information trafic : sur la nationale 7, la route est fermée entre Valence et Montélimar en raison de travaux, jusqu’à vendredi. Une déviation est en place par Crest.',voice:'male',
    q:[['Pourquoi la route est-elle fermée ?','en raison de travaux',['en raison de travaux','en raison d’un accident','en raison de la neige'],'raison'],['Jusqu’à quel jour ?','jusqu’à vendredi',['jusqu’à vendredi','jusqu’à lundi','jusqu’à demain'],'comprendre'],['Par où passe la déviation ?','par Crest',['par Crest','par Valence','par l’autoroute'],'route']]},
   {turns:[['A','Mesdames et messieurs, le propriétaire de la voiture noire garée devant la sortie de secours est prié de la déplacer.'],['B','C’est notre voiture ?'],['A','Il s’agit d’une Citroën noire, immatriculée 72 BL 16.'],['B','Non, la nôtre est une Renault. Ce n’est pas pour nous.']],voices:{A:'female',B:'male'},
    q:[['Où est garée la voiture ?','devant la sortie de secours',['devant la sortie de secours','devant l’entrée','au parking souterrain'],'comprendre'],['Qu’est-ce que le propriétaire doit faire ?','déplacer la voiture',['déplacer la voiture','venir à la caisse','payer une amende'],'prie'],['La Citroën noire est-elle la voiture de la personne qui demande ?','Non.',['Non.','Oui.','On ne sait pas.'],'comprendre']]}
  ],
  writing:{situation:'Tu es en route pour un mariage en France, mais il y a un problème sur l’autoroute. Écris un SMS long à la mariée.',points:['Explique ce qui se passe sur l’autoroute et pourquoi.','Dis ce que la radio vous demande de faire.','Dis quand vous arriverez et excuse-toi.'],
   model:'Chère Pauline,\nNous sommes sur l’A7, mais l’autoroute est coupée en raison d’un incendie. La radio dit que nous sommes priés de quitter l’autoroute à la sortie Orange et de suivre la déviation. Il y a un bouchon de dix kilomètres. Nous arriverons vers seize heures, peut-être après la cérémonie. Nous sommes vraiment désolés !\nGros bisous,\nMax et Ina'}
 },
 words:[['l’autoroute (f.)','die Autobahn','motorway'],['la sortie','die Ausfahrt','exit'],['coupé / coupée','gesperrt','closed'],['le bouchon','der Stau','traffic jam'],['la déviation','die Umleitung','diversion'],['être prié de','gebeten werden zu','to be requested to'],['faire le plein','volltanken','to fill up'],['complet / complète','voll belegt','full']],
 vocab:[['l’autoroute (f.)','die Autobahn'],['l’automobiliste (m./f.)','der Autofahrer / die Autofahrerin'],['la sortie','die Ausfahrt'],['coupé / coupée','gesperrt'],['l’accident (m.)','der Unfall'],['le bouchon','der Stau'],['la déviation','die Umleitung'],['être prié de','gebeten werden zu'],['le conducteur / la conductrice','der Fahrer / die Fahrerin'],['la station-service','die Tankstelle'],['glissant / glissante','glatt'],['prudemment','vorsichtig']]
},
{
 id:16,
 phrases:[
  ['Et maintenant, la météo.','Und jetzt das Wetter.'],
  ['Il pleut actuellement en Bretagne.','Zurzeit regnet es in der Bretagne.'],
  ['Le ciel se dégagera vers midi.','Der Himmel klart gegen Mittag auf.'],
  ['Le soleil brillera en début de soirée.','Am frühen Abend scheint die Sonne.'],
  ['Demain, il fera vingt-deux degrés à Paris.','Morgen wird es in Paris zweiundzwanzig Grad.'],
  ['Il y aura des orages dans les Alpes.','In den Alpen wird es Gewitter geben.'],
  ['Hier, il a neigé en montagne.','Gestern hat es in den Bergen geschneit.'],
  ['Il fait un temps gris et frais.','Es ist grau und kühl.'],
  ['Le vent soufflera fort sur la côte.','An der Küste wird starker Wind wehen.'],
  ['Prenez un parapluie !','Nehmen Sie einen Regenschirm mit!']
 ],
 quiz:[
  ['Was bedeutet „Le ciel se dégagera“?',['Der Himmel wird aufklaren.','Der Himmel wird sich bewölken.','Es wird dunkel.'],'Le ciel se dégagera vers midi.','Se dégager = aufklaren, frei werden.'],
  ['Was bedeutet „en fin de matinée“?',['am späten Vormittag','am frühen Morgen','am Abend'],'Les nuages partiront en fin de matinée.','La matinée = der Vormittag; en fin de = am Ende von.'],
  ['Le soleil ___ jeudi. (revenir, Futur)',['reviendra','revenira','revient'],'Le soleil reviendra jeudi.','Revenir → reviendr- (wie venir).'],
  ['Demain, il ___ vingt-deux degrés. (faire, Futur)',['fera','faisait','fait'],'Demain, il fera vingt-deux degrés à Paris.','Faire → fera im Futur.'],
  ['Hier, il ___ en montagne. (neiger)',['a neigé','neigera','neige'],'Hier, il a neigé en montagne.','Hier → passé composé: il a neigé.'],
  ['Il ___ actuellement en Bretagne. (pleuvoir, jetzt)',['pleut','a plu','pleuvra'],'Il pleut actuellement en Bretagne.','Actuellement = zurzeit → Präsens: il pleut.'],
  ['Was ist „un orage“?',['ein Gewitter','ein Nebel','ein Schauer ohne Donner'],'Il y aura des orages dans les Alpes.','Un orage = ein Gewitter.'],
  ['Il y ___ des orages. (avoir, Futur)',['aura','avait','a eu'],'Il y aura des orages dans les Alpes.','Il y a → il y aura (Futur).'],
  ['Was bedeutet „Il fait frais“?',['Es ist kühl.','Es ist frisch gestrichen.','Es ist heiß.'],'Il fait un temps gris et frais.','Frais = kühl; chaud = warm; froid = kalt.'],
  ['Le vent ___ fort sur la côte. (souffler, Futur)',['soufflera','soufflait','souffle'],'Le vent soufflera fort sur la côte.','Souffler (wehen) → soufflera.']
 ],
 dialogue:['Tu as écouté la météo ?','Oui, ce matin il pleut, mais le ciel se dégagera vers midi.','Et cet après-midi ?','Le soleil reviendra et il fera vingt degrés.','Alors on pourra faire du vélo !','Oui, mais prends quand même un parapluie.'],
 pron:['il pleut / il pleuvra','Pleut [plø] hat einen gerundeten Vokal wie „ö“. Il pleuvra [pløvʁa] (Futur) und il pleuvait [pløvɛ] (Imperfekt) unterscheiden sich am Ende. Degrés [dəɡʁe]: das s ist stumm.'],
 transfer:['Erkläre einem Freund den Wetterbericht für morgen und schlage passend dazu eine Aktivität vor.','Schreibe drei Sätze über das Wetter von gestern, heute und morgen.'],
 domains:['Mündliche Rezeption','Mündliche Produktion','Schriftliche Produktion'],
 app:{speak:'Ce matin, il y a du brouillard en Alsace, mais le ciel se dégagera vers onze heures. Cet après-midi, il fera beau et vingt-trois degrés. Hier, il a fait froid et il a plu toute la journée. Demain, il y aura du vent sur la côte.',
  write:'Hier, il a plu toute la journée.\nAujourd’hui, il fait gris et frais.\nDemain, il fera beau et chaud.',
  placeholder:'Schreibe über das Wetter …',help:'Gestern: passé composé, heute: Präsens, morgen: futur simple.',
  hints:[['Hier, il a plu / il a fait …','Gestern hat es geregnet / war es …'],['Aujourd’hui, il fait …','Heute ist es …'],['Demain, il fera …','Morgen wird es …']]},
 goals:['Einen Wetterbericht verstehen (Region, Zeit, Entwicklung).','Wetter in Vergangenheit, Gegenwart und Zukunft beschreiben.','Tageszeitangaben wie en fin de matinée, en début d’après-midi verwenden.'],
 units:[
  {title:'Wetter in drei Zeiten',rule:'Wetterverben stehen immer mit il: il pleut, il neige, il fait beau. Gestern: passé composé – il a plu, il a neigé, il a fait froid. Heute: Präsens – il pleut, il fait chaud. Morgen: futur simple – il pleuvra, il neigera, il fera beau, il y aura du vent. Beschreibung früher: il faisait beau.',
   pairs:[['Hier, il a plu.','Gestern hat es geregnet.'],['Aujourd’hui, il pleut.','Heute regnet es.'],['Demain, il pleuvra.','Morgen wird es regnen.'],['Il a fait froid ce matin.','Heute Morgen war es kalt.'],['Il y aura du vent.','Es wird Wind geben.']],
   emphasis:['il a plu','il pleut','il pleuvra','il fera','il y aura']},
  {title:'Wetterbericht: Zeit und Ort',rule:'Ein Wetterbericht nennt Regionen (le nord, le sud, l’est, l’ouest, sur la côte, en montagne) und Tageszeiten: en début de matinée (früh am Vormittag), en fin de matinée, en début d’après-midi, en soirée. Entwicklungen: le ciel se dégagera, les nuages arriveront, les températures baisseront.',
   pairs:[['Dans le sud, il fera très chaud.','Im Süden wird es sehr heiß.'],['En montagne, il neigera.','In den Bergen wird es schneien.'],['En début d’après-midi, le soleil reviendra.','Am frühen Nachmittag kommt die Sonne zurück.'],['Les nuages arriveront en soirée.','Die Wolken kommen am Abend.'],['Les températures baisseront.','Die Temperaturen werden sinken.']],
   emphasis:['le nord','le sud','sur la côte','en montagne','en début de','en fin de','en soirée']}
 ],
 tasks:[
  [0,'Hier, il a ___. (pleuvoir)','plu',['plut','pleuvu'],'Gestern hat es geregnet.','passé composé','Pleuvoir → plu.'],
  [0,'Aujourd’hui, il ___. (pleuvoir)','pleut',['pleuve','plu'],'Heute regnet es.','Präsens'],
  [0,'Demain, il ___. (pleuvoir)','pleuvra',['pleuvera','pleuvait'],'Morgen wird es regnen.','Futur'],
  [0,'Demain, il ___ beau. (faire)','fera',['faira','ferait'],'Morgen wird es schön.','Futur','Faire hat den Futurstamm fer-: il fera. Ferait ist conditionnel.'],
  [0,'Il y ___ du vent demain. (avoir)','aura',['avra','aurait'],'Morgen wird es Wind geben.','Futur','Il y a im futur simple: il y aura. Aurait ist conditionnel.'],
  [0,'Hier, il ___ froid. (faire)','a fait',['fait','fera'],'Gestern war es kalt.','passé composé','Für gestern steht die Vergangenheit: il a fait froid (als Beschreibung auch il faisait froid). Fait ist Präsens, fera Futur.'],
  [1,'Le ciel se ___ en fin de matinée. (se dégager)','dégagera',['dégageait','dégageront'],'Der Himmel wird am späten Vormittag aufklaren.','Futur','Vorhersage im futur simple: le ciel se dégagera. Dégageront gehört zu ils.'],
  [1,'En ___ d’après-midi, le soleil reviendra. (früh)','début',['fin','milieu'],'Am frühen Nachmittag kommt die Sonne zurück.','Tageszeit'],
  [1,'En montagne, il ___. (neiger, Futur)','neigera',['neigait','neige'],'In den Bergen wird es schneien.','Futur'],
  [1,'Les températures ___. (baisser, Futur)','baisseront',['baissent','baissaient'],'Die Temperaturen werden sinken.','Futur']
 ],
 check:[
  ['Du machst Urlaub in den Vogesen. Radio: « Ce matin, il neige sur les Vosges. Les nuages partiront vers midi et il fera beau tout l’après-midi. » Wird es heute Nachmittag schön?',['Ja, am Nachmittag ist es schön.','Nein, es schneit den ganzen Tag.','Erst am Abend wird es schön.'],'Il fera beau tout l’après-midi = den ganzen Nachmittag schön.','apresmidi'],
  ['« Demain, des orages éclateront dans les Alpes en soirée. » Wann gibt es Gewitter?',['morgen am Abend','morgen früh','heute Abend'],'En soirée = am Abend.','orage'],
  ['Du beschreibst das Wetter von gestern: Es hat den ganzen Tag geschneit.',['Hier, il a neigé toute la journée.','Hier, il neigera toute la journée.','Hier, il neige toute la journée.'],'Gestern → passé composé.','passe','Hier, il a neigé toute la journée.'],
  ['« Sur la côte, le vent soufflera fort. » Was erwartet dich am Meer?',['starker Wind','starker Regen','große Hitze'],'Le vent soufflera fort = starker Wind.','vent'],
  ['Du sagst, dass es morgen 25 Grad wird.',['Demain, il fera vingt-cinq degrés.','Demain, il fait vingt-cinq degrés.','Demain, il a fait vingt-cinq degrés.'],'Morgen → futur simple: il fera.','futur','Demain, il fera vingt-cinq degrés.'],
  ['« Les températures baisseront de cinq degrés. » Was passiert?',['Es wird um fünf Grad kälter.','Es wird um fünf Grad wärmer.','Es bleibt bei fünf Grad.'],'Baisser = sinken.','baisser'],
  ['Es ist grau und kühl. Was sagst du?',['Il fait gris et frais.','Il est gris et frais.','Il a gris et frais.'],'Wetter mit il fait + Adjektiv.','faire','Il fait gris et frais.'],
  ['« Prenez un parapluie si vous sortez ce soir. » Wie wird das Wetter heute Abend?',['Es kann regnen.','Es wird sehr heiß.','Es wird schneien.'],'Un parapluie = ein Regenschirm.','parapluie']
 ],
 transfers:[
  ['passe','Hier, il a ___ toute la journée. (pleuvoir)','plu','Gestern hat es den ganzen Tag geregnet.'],
  ['present','Regarde, il ___ ! (neiger, jetzt)','neige','Schau, es schneit!'],
  ['futur','Ce week-end, il ___ chaud. (faire, Futur)','fera','Dieses Wochenende wird es warm.'],
  ['futur','Il ___ du soleil demain. (y avoir, Futur)','y aura','Morgen wird es Sonne geben.'],
  ['degager','Le ciel se ___ cet après-midi. (se dégager, Futur)','dégagera','Der Himmel klart heute Nachmittag auf.'],
  ['moment','En ___ de matinée, il pleuvra. (am späten Vormittag)','fin','Am späten Vormittag wird es regnen.'],
  ['revenir','Le soleil ___ demain. (revenir, Futur)','reviendra','Die Sonne kommt morgen zurück.']
 ],
 comp:{voices:{A:'male',B:'female'},turns:[
  ['A','Bonsoir, voici la météo pour demain, samedi.'],['A','Dans l’ouest, il pleuvra le matin, mais le ciel se dégagera en début d’après-midi.'],
  ['A','Dans le sud, il fera très chaud : trente-deux degrés à Marseille.'],['A','En montagne, attention aux orages en soirée.'],
  ['B','Trente-deux degrés ! On va à la plage demain ?'],['A','À Paris, temps gris et frais, avec seulement dix-huit degrés.'],
  ['B','Et dimanche ?'],['A','Dimanche, le soleil reviendra sur toute la France.']],
  fields:[['Westen vormittags',['Regen','Sonne','Schnee']],['Westen Aufklaren',['am frühen Nachmittag','am Abend','am Vormittag']],['Marseille',['32 Grad','22 Grad','23 Grad']],['Berge',['Gewitter am Abend','Schnee am Morgen','starker Wind']],['Paris',['grau und kühl, 18 Grad','sonnig, 28 Grad','Regen, 8 Grad']],['Sonntag',['überall Sonne','überall Regen','Gewitter im Süden']]]},
 intro:['Le soleil brillera en début de soirée.',['Le soleil brillera en fin de soirée.','Le soleil brillera en début de matinée.']],
 hard:{
  obj:[['temps','Wetter in drei Zeiten'],['meteo','Wetterbericht: Orte und Tageszeiten'],['futur','Futur in der Vorhersage'],['comprendre','Einen Wetterbericht verstehen']],
  text:'Bonjour, voici la météo de ce mardi. Ce matin, il {pleut|regnen, jetzt|temps} sur l’Alsace et dans le {nord|Norden|meteo} des Vosges. Le brouillard se {dégagera|aufklaren, Futur|futur} en {fin|Ende (en … de matinée)|meteo} de matinée. Le soleil {reviendra|zurückkommen, Futur|futur} jeudi. Dans le sud, il {fera|machen, Futur (Wetter)|futur} très chaud : trente degrés à Nice. En {montagne|Berge|meteo}, il y {aura|haben, Futur (il y …)|futur} des orages en {soirée|Abend (en …)|meteo}. Sur la {côte|Küste|meteo} atlantique, le vent {soufflera|wehen, Futur|futur} fort. Hier, il a {neigé|schneien, Partizip|temps} dans les Pyrénées et il a {fait|machen, Partizip (Wetter)|temps} froid. Demain, les températures {baisseront|sinken, Futur, Plural|futur}. Prenez un {parapluie|Regenschirm|temps} !',
  listen:[
   {text:'Météo du week-end : samedi, il fera beau sur toute la France avec vingt-cinq degrés à Lyon. Dimanche, des nuages arriveront par l’ouest et il pleuvra en soirée à Paris.',voice:'female',
    q:[['Quel temps fera-t-il samedi ?','Il fera beau.',['Il fera beau.','Il pleuvra.','Il neigera.'],'futur'],['Combien de degrés à Lyon samedi ? Réponds en chiffres.','25',null,'meteo'],['Quand pleuvra-t-il à Paris ?','dimanche soir',['dimanche soir','samedi soir','dimanche matin'],'comprendre']]},
   {turns:[['A','Il a fait beau pendant tes vacances ?'],['B','La première semaine, oui. Mais ensuite, il a plu tous les jours.'],['A','Et maintenant, il fait comment chez toi ?'],['B','Il fait gris, mais demain il fera beau.']],voices:{A:'male',B:'female'},
    q:[['Quel temps a-t-il fait la première semaine ?','beau',['beau','pluvieux','froid'],'temps'],['Et après ?','Il a plu tous les jours.',['Il a plu tous les jours.','Il a neigé.','Il a fait très chaud.'],'temps'],['Quel temps fera-t-il demain ?','beau',['beau','gris','pluvieux'],'futur']]}
  ],
  writing:{situation:'Tu es en vacances en France. Écris une carte à des amis en Allemagne.',points:['Dis quel temps il a fait les premiers jours.','Décris le temps aujourd’hui.','Dis ce que la météo annonce pour demain et ce que tu feras.'],
   model:'Chers amis,\nNous sommes à Biarritz depuis lundi. Les deux premiers jours, il a plu et il a fait frais. Aujourd’hui, il fait beau et vingt-six degrés ! La météo dit que demain, le ciel restera bleu le matin, mais il y aura des orages en soirée. Alors nous irons à la plage le matin et nous visiterons le musée l’après-midi.\nBises,\nTina et Marc'}
 },
 words:[['la météo','der Wetterbericht','weather forecast'],['il pleut / il a plu / il pleuvra','es regnet / hat geregnet / wird regnen','it rains / rained / will rain'],['le ciel se dégage','der Himmel klart auf','the sky clears'],['en fin de matinée','am späten Vormittag','late in the morning'],['en début d’après-midi','am frühen Nachmittag','early in the afternoon'],['l’orage (m.)','das Gewitter','thunderstorm'],['le degré','das Grad','degree'],['frais / fraîche','kühl','cool']],
 vocab:[['la météo','der Wetterbericht'],['le ciel','der Himmel'],['se dégager','aufklaren'],['le nuage','die Wolke'],['l’orage (m.)','das Gewitter'],['neiger','schneien'],['le vent','der Wind'],['souffler','wehen'],['le degré','das Grad'],['la matinée','der Vormittag'],['actuellement','zurzeit'],['le parapluie','der Regenschirm']]
},
{
 id:17,
 phrases:[
  ['Je trouve que le portable est très pratique.','Ich finde, dass das Handy sehr praktisch ist.'],
  ['Ça me gêne quand les gens téléphonent dans le train.','Es stört mich, wenn die Leute im Zug telefonieren.'],
  ['À mon avis, les enfants n’ont pas besoin de portable.','Meiner Meinung nach brauchen Kinder kein Handy.'],
  ['Je ne peux plus vivre sans mon smartphone.','Ich kann nicht mehr ohne mein Smartphone leben.'],
  ['Moi, je n’ai pas envie d’avoir un portable.','Ich habe keine Lust, ein Handy zu haben.'],
  ['C’est rassurant pour les parents.','Das ist beruhigend für die Eltern.'],
  ['Je suis d’accord avec toi.','Ich bin deiner Meinung.'],
  ['Je ne suis pas du tout d’accord.','Ich bin überhaupt nicht einverstanden.'],
  ['Les portables sont interdits pendant le cours.','Handys sind während des Unterrichts verboten.'],
  ['C’est trop compliqué pour moi.','Das ist zu kompliziert für mich.']
 ],
 quiz:[
  ['Wie leitest du deine Meinung ein?',['Je trouve que…','Je cherche que…','Je pense de…'],'Je trouve que le portable est très pratique.','Je trouve que / je pense que + Satz = ich finde / denke, dass …'],
  ['Was bedeutet „Ça me gêne“?',['Das stört mich.','Das gefällt mir.','Das ist mir egal.'],'Ça me gêne quand les gens téléphonent dans le train.','Gêner = stören.'],
  ['Was bedeutet „À mon avis“?',['meiner Meinung nach','nach meiner Erfahrung','zu meinem Glück'],'À mon avis, les enfants n’ont pas besoin de portable.','L’avis = die Meinung.'],
  ['Je ne peux ___ vivre sans mon smartphone. (nicht mehr)',['plus','pas','jamais'],'Je ne peux plus vivre sans mon smartphone.','Ne … plus = nicht mehr.'],
  ['Was bedeutet „Je n’ai pas envie d’avoir un portable“?',['Ich habe keine Lust, ein Handy zu haben.','Ich habe kein Geld für ein Handy.','Ich darf kein Handy haben.'],'Moi, je n’ai pas envie d’avoir un portable.','Avoir envie de = Lust haben auf / zu.'],
  ['Was bedeutet „rassurant“?',['beruhigend','beunruhigend','teuer'],'C’est rassurant pour les parents.','Rassurer = beruhigen.'],
  ['Du teilst die Meinung deines Partners.',['Je suis d’accord avec toi.','Je suis d’accord à toi.','J’ai d’accord avec toi.'],'Je suis d’accord avec toi.','Être d’accord avec quelqu’un.'],
  ['Was bedeutet „Je ne suis pas du tout d’accord“?',['Ich bin überhaupt nicht einverstanden.','Ich bin ganz deiner Meinung.','Ich bin nicht ganz sicher.'],'Je ne suis pas du tout d’accord.','Pas du tout = überhaupt nicht.'],
  ['Les portables sont ___ pendant le cours.',['interdits','interdit','interdites'],'Les portables sont interdits pendant le cours.','Les portables (m. Pl.) → interdits.'],
  ['Il n’a ___ de portable. (nicht mehr)',['plus','pas plus','jamais pas'],'Il n’a plus de portable.','Nach ne … plus wird un zu de.']
 ],
 dialogue:['Tu as un portable depuis longtemps ?','Oui, je ne peux plus vivre sans ! C’est très pratique.','Moi, je trouve que ça gêne souvent.','Pourquoi ?','Dans le train, les gens téléphonent tout le temps. On ne peut même pas lire.','C’est vrai, je suis d’accord avec toi.'],
 pron:['à mon avis','Bei mon‿avis wird gebunden: [mɔ̃navi]. Gêne [ʒɛn] hat ein offenes e. Bei Meinungen betonst du das wichtigste Wort: Je trouve que c’est TRÈS pratique.'],
 transfer:['Sage deine Meinung zu Handys im Alltag (pro und contra) und reagiere auf die Meinung deines Partners.','Schreibe vier Sätze mit deiner Meinung zum Handy: was praktisch ist, was dich stört, und ein Satz mit ne … plus.'],
 domains:['Mündliche Rezeption','Mündliche Interaktion','Schriftliche Produktion'],
 app:{speak:'À mon avis, le portable est très pratique. Je l’utilise pour le travail et pour parler avec ma famille. Mais ça me gêne quand les gens téléphonent fort dans le bus. Je trouve que les enfants de huit ans n’ont pas besoin de portable. Et vous, vous êtes d’accord ?',
  write:'Je trouve que le portable est pratique.\nMais ça me gêne au restaurant.\nÀ mon avis, il faut l’éteindre au cinéma.\nMon grand-père n’a plus de portable.',
  placeholder:'Schreibe deine Meinung …',help:'Benutze je trouve que, à mon avis, ça me gêne und ne … plus.',
  hints:[['Je trouve que …','Ich finde, dass …'],['Ça me gêne quand …','Es stört mich, wenn …'],['À mon avis, …','Meiner Meinung nach …']]},
 goals:['Kurze Meinungen zu einem Alltagsthema verstehen.','Die eigene Meinung äußern, zustimmen und widersprechen.','Mit ne … plus, avoir envie de und ça me gêne arbeiten.'],
 units:[
  {title:'Meinung äußern',rule:'Deine Meinung leitest du ein mit je trouve que …, je pense que …, à mon avis, … oder pour moi, … Zustimmen: je suis d’accord (avec toi), c’est vrai. Widersprechen: je ne suis pas d’accord, je ne suis pas du tout d’accord. Gefühle: ça me gêne (es stört mich), c’est pratique, c’est rassurant.',
   pairs:[['Je trouve que c’est pratique.','Ich finde das praktisch.'],['À mon avis, c’est trop cher.','Meiner Meinung nach ist das zu teuer.'],['Je pense que tu as raison.','Ich denke, du hast recht.'],['Je ne suis pas d’accord avec lui.','Ich bin nicht seiner Meinung.'],['Ça me gêne au cinéma.','Im Kino stört mich das.']],
   emphasis:['je trouve que','je pense que','à mon avis','je suis d’accord','ça me gêne']},
  {title:'ne … plus und avoir envie de',rule:'Ne … plus bedeutet „nicht mehr“: Je ne téléphone plus. Wie bei ne … pas wird un / une / des danach zu de: Il n’a plus de portable. Avoir envie de + Infinitiv oder Nomen heißt „Lust haben“: J’ai envie de lire. Je n’ai pas envie d’un nouveau portable.',
   pairs:[['Je ne peux plus vivre sans mon portable.','Ich kann nicht mehr ohne mein Handy leben.'],['Il n’a plus de portable.','Er hat kein Handy mehr.'],['Nous ne regardons plus la télé.','Wir schauen nicht mehr fern.'],['J’ai envie de lire dans le train.','Ich habe Lust, im Zug zu lesen.'],['Elle n’a pas envie d’un smartphone.','Sie hat keine Lust auf ein Smartphone.']],
   emphasis:['ne … plus','de','avoir envie de']}
 ],
 tasks:[
  [0,'Je ___ que c’est pratique. (finden)','trouve',['cherche','pense de'],'Ich finde das praktisch.','Meinung'],
  [0,'À mon ___, c’est trop cher.','avis',['idée','opinion de'],'Meiner Meinung nach ist das zu teuer.','Meinung'],
  [0,'Je suis d’accord ___ toi.','avec',['pour','de'],'Ich bin deiner Meinung.','Zustimmung','Être d’accord avec quelqu’un = mit jemandem einer Meinung sein.'],
  [0,'Ça me ___ au cinéma. (stören)','gêne',['gêné','gênes'],'Im Kino stört mich das.','Meinung'],
  [0,'Je ne suis pas du ___ d’accord.','tout',['tous','toute'],'Ich bin überhaupt nicht einverstanden.','Widerspruch'],
  [1,'Je ne téléphone ___ au volant. (nicht mehr)','plus',['pas plus','jamais pas'],'Ich telefoniere nicht mehr am Steuer.','ne … plus'],
  [1,'Il n’a plus ___ portable.','de',['un','le'],'Er hat kein Handy mehr.','ne … plus','Nach ne … plus wird un zu de.'],
  [1,'Nous ne ___ plus la télé. (regarder)','regardons',['regardez','regarde'],'Wir schauen nicht mehr fern.','ne … plus'],
  [1,'J’ai ___ de lire dans le train.','envie',['besoin à','plaisir'],'Ich habe Lust, im Zug zu lesen.','avoir envie de'],
  [1,'Elle n’a pas envie ___ smartphone.','d’un',['un','de le'],'Sie hat keine Lust auf ein Smartphone.','avoir envie de']
 ],
 check:[
  ['« Une montre connectée ? Non merci, je n’en ai pas besoin. Ma vieille montre suffit. » Will die Person eine Smartwatch?',['Nein, sie braucht keine.','Ja, eine einfache.','Ja, eine neue.'],'Je n’en ai pas besoin = ich brauche keine.','besoin'],
  ['« À la piscine, nous avons interdit les photos avec les portables. » Was wurde verboten?',['mit dem Handy fotografieren','mit dem Handy telefonieren','das Handy aufladen'],'Interdire = verbieten.','interdire'],
  ['Du findest Handys im Zug störend.',['Ça me gêne quand on téléphone dans le train.','Ça me plaît quand on téléphone dans le train.','Ça me gêne de pas téléphoner dans le train.'],'Ça me gêne = es stört mich.','gener','Ça me gêne quand on téléphone dans le train.'],
  ['« Ma fille prend le bus seule. Avec son portable, elle m’envoie un message quand elle arrive. » Wie findet die Mutter das?',['Es beruhigt sie.','Es stört sie.','Es ist ihr zu teuer.'],'Sie sieht einen Vorteil: Sie weiß, dass die Tochter angekommen ist.','rassurant'],
  ['Dein Partner sagt: « Le portable, c’est indispensable. » Du siehst das ganz anders.',['Je ne suis pas du tout d’accord.','Je suis tout à fait d’accord.','C’est vrai, tu as raison.'],'Pas du tout d’accord = überhaupt nicht einverstanden.','desaccord','Je ne suis pas du tout d’accord.'],
  ['« Je ne regarde plus mes e-mails le soir. » Was stimmt?',['Früher hat die Person abends E-Mails gelesen.','Die Person liest abends immer E-Mails.','Die Person hat kein E-Mail-Konto.'],'Ne … plus = nicht mehr (früher schon).','neplus'],
  ['Du sagst deine Meinung.',['À mon avis, le portable est utile.','À mon avis que le portable est utile.','Je trouve le portable que est utile.'],'À mon avis + Satz ohne que.','avis','À mon avis, le portable est utile.'],
  ['« Je n’ai pas envie d’être joignable tout le temps. » Was möchte die Person nicht?',['immer erreichbar sein','immer telefonieren müssen','immer Nachrichten lesen'],'Joignable = erreichbar.','envie']
 ],
 transfers:[
  ['trouve','Je ___ que c’est utile. (finden)','trouve','Du findest das nützlich.'],
  ['avis','À mon ___, c’est dangereux.','avis','Meiner Meinung nach ist das gefährlich.'],
  ['accord','Je suis d’___ avec vous.','accord','Du bist ihrer Meinung.'],
  ['gener','Le bruit me ___. (stören)','gêne','Der Lärm stört dich.'],
  ['neplus','Je n’utilise ___ mon ancien portable. (nicht mehr)','plus','Du benutzt dein altes Handy nicht mehr.'],
  ['de','Je n’ai plus ___ batterie.','de','Du hast keinen Akku mehr.'],
  ['envie','Je n’ai pas ___ de sortir ce soir.','envie','Du hast keine Lust, heute Abend auszugehen.']
 ],
 comp:{voices:{A:'female',B:'male'},turns:[
  ['A','Monsieur, qu’est-ce que vous pensez des portables à l’école ?'],['B','Je trouve que c’est une mauvaise idée. Les élèves ne travaillent plus.'],
  ['A','Vous êtes professeur ?'],['B','Oui, de mathématiques. Dans ma classe, les portables sont interdits.'],
  ['A','Et vos enfants, ils ont un portable ?'],['B','Ma fille de quinze ans, oui. C’est rassurant pour nous.'],
  ['A','Et vous, vous l’utilisez beaucoup ?'],['B','Pour le travail, oui. Mais le dimanche, je l’éteins.']],
  fields:[['Meinung zu Handys in der Schule',['schlechte Idee','gute Idee','egal']],['Beruf',['Mathelehrer','Schulleiter','Elektriker']],['In seiner Klasse',['Handys verboten','Handys erlaubt','nur in der Pause']],['Tochter',['15 Jahre, hat ein Handy','12 Jahre, kein Handy','15 Jahre, kein Handy']],['Für die Eltern ist das',['beruhigend','teuer','stressig']],['Sonntags',['schaltet er es aus','arbeitet er damit','lädt er es auf']]]},
 intro:['Ça me gêne quand les gens téléphonent dans le train.',['Ça me gêne quand les gens téléphonent dans le bus.','Ça me plaît quand les gens téléphonent dans le train.']],
 hard:{
  obj:[['avis','Meinung äußern'],['accord','Zustimmen und widersprechen'],['neplus','ne … plus und avoir envie de'],['comprendre','Meinungen hörend verstehen']],
  text:'Le portable : pour ou contre ? — Léa, 19 ans : « Je {trouve|finden, je|avis} que c’est génial. Je ne peux {plus|nicht mehr (ne …)|neplus} vivre sans ! » — Bernard, cuisinier : « Moi, je n’ai pas {envie|Lust (avoir …)|neplus} de répondre au travail. Mon nouveau téléphone est trop {compliqué|kompliziert|avis}. » — Sophie, infirmière : « À mon {avis|Meinung|avis}, c’est très pratique pour le travail. Mais ça me {gêne|stören|avis} quand les gens parlent fort dans le métro. » — Ahmed, randonneur : « En montagne, j’ai toujours mon portable. C’est {rassurant|beruhigend|avis}. » — Claire : « Je ne suis pas d’{accord|einverstanden|accord} avec Ahmed. En montagne, on n’a pas {besoin|Bedarf (avoir … de)|avis} de portable, on a besoin d’une carte. » — Paul, bibliothécaire : « Chez nous, les appels sont {interdits|verboten, Plural|avis} dans la salle de lecture. » — Léa : « Je suis d’accord {avec|mit|accord} Sophie. Mon grand-père n’a {plus|nicht mehr|neplus} de téléphone fixe. Il {n’|ne (vor Vokal)|neplus}a plus besoin de cabine ! »',
  listen:[
   {text:'Moi, j’ai acheté mon premier portable il y a seulement un mois. Avant, je ne voulais pas. Mais maintenant, je trouve ça pratique pour appeler mes petits-enfants.',voice:'female',
    q:[['Quand la femme a-t-elle acheté son portable ?','il y a un mois',['il y a un mois','il y a un an','hier'],'comprendre'],['Est-ce qu’elle voulait un portable avant ?','Non.',['Non.','Oui.','On ne sait pas.'],'neplus'],['Pourquoi le trouve-t-elle pratique ?','pour appeler ses petits-enfants',['pour appeler ses petits-enfants','pour prendre des photos','pour son travail'],'avis']]},
   {turns:[['A','Tu ne trouves pas que les gens regardent trop leur portable ?'],['B','Si, je suis d’accord. Au restaurant, plus personne ne parle.'],['A','Moi, je ne prends plus mon portable quand je sors.'],['B','Bonne idée, je vais essayer.']],voices:{A:'male',B:'female'},
    q:[['Est-ce que la femme est d’accord ?','Oui.',['Oui.','Non.','Pas du tout.'],'accord'],['Qu’est-ce qui la gêne au restaurant ?','Plus personne ne parle.',['Plus personne ne parle.','La musique est trop forte.','Les prix sont trop chers.'],'avis'],['Qu’est-ce que l’homme ne fait plus ?','prendre son portable quand il sort',['prendre son portable quand il sort','aller au restaurant','téléphoner à ses amis'],'neplus']]}
  ],
  writing:{situation:'Un forum français demande : « Faut-il interdire les portables à l’école ? » Écris ton message.',points:['Donne ton avis avec je trouve que ou à mon avis.','Donne un avantage et un inconvénient du portable.','Réagis à un autre message : tu es d’accord ou pas ?'],
   model:'Bonjour à tous,\nÀ mon avis, il faut interdire les portables pendant les cours, mais pas à la récréation. Je trouve que le portable est pratique pour appeler les parents. Mais en classe, ça gêne : les élèves ne font plus attention. Je suis d’accord avec Karim : les enfants de dix ans n’ont pas besoin de smartphone.\nMarie, 34 ans'}
 },
 words:[['je trouve que','ich finde, dass','I think that'],['à mon avis','meiner Meinung nach','in my opinion'],['ça me gêne','das stört mich','it bothers me'],['être d’accord','einverstanden sein','to agree'],['ne … plus','nicht mehr','no longer'],['avoir envie de','Lust haben auf','to feel like'],['rassurant / rassurante','beruhigend','reassuring'],['le portable','das Handy','mobile phone']],
 vocab:[['l’avis (m.)','die Meinung'],['trouver que','finden, dass'],['gêner','stören'],['d’accord','einverstanden'],['l’envie (f.)','die Lust'],['avoir besoin de','brauchen'],['rassurant / rassurante','beruhigend'],['pratique','praktisch'],['compliqué / compliquée','kompliziert'],['interdire','verbieten'],['éteindre','ausschalten'],['le smartphone','das Smartphone']]
},
{
 id:18,
 phrases:[
  ['Trois Français sur quatre lisent un journal.','Drei von vier Franzosen lesen eine Zeitung.'],
  ['Trente pour cent d’entre eux le lisent en ligne.','Dreißig Prozent von ihnen lesen sie online.'],
  ['Seulement cinq pour cent achètent un magazine étranger.','Nur fünf Prozent kaufen eine ausländische Zeitschrift.'],
  ['De plus en plus de personnes font du sport.','Immer mehr Menschen treiben Sport.'],
  ['La région ne compte que deux millions d’habitants.','Die Region hat nur zwei Millionen Einwohner.'],
  ['Le nombre de touristes a augmenté.','Die Zahl der Touristen ist gestiegen.'],
  ['Les prix ont baissé de cinq pour cent.','Die Preise sind um fünf Prozent gesunken.'],
  ['Selon une étude, les jeunes lisent moins.','Laut einer Studie lesen junge Leute weniger.'],
  ['Les nouveaux bus coûtent cher à la ville.','Die neuen Busse kosten die Stadt viel.'],
  ['Une nouvelle loi autorise les magasins à ouvrir le dimanche.','Ein neues Gesetz erlaubt den Geschäften, sonntags zu öffnen.']
 ],
 quiz:[
  ['Was bedeutet „trois Français sur quatre“?',['drei von vier Franzosen','drei oder vier Franzosen','vierunddreißig Franzosen'],'Trois Français sur quatre lisent un journal.','… sur … = … von …'],
  ['Was bedeutet „trente pour cent d’entre eux“?',['dreißig Prozent von ihnen','dreißig Prozent zwischen ihnen','dreißig von hundert Ländern'],'Trente pour cent d’entre eux le lisent en ligne.','D’entre eux = von ihnen.'],
  ['Was bedeutet „à l’étranger“?',['im / ins Ausland','in der Nachbarstadt','an der Grenze'],'Ma sœur travaille à l’étranger.','L’étranger = das Ausland; un étranger = ein Ausländer.'],
  ['___ personnes font du sport.',['De plus en plus de','Plus et plus de','Encore plus des'],'De plus en plus de personnes font du sport.','De plus en plus de + Nomen = immer mehr …'],
  ['La région ne compte ___ deux millions d’habitants.',['que','seulement','plus'],'La région ne compte que deux millions d’habitants.','Ne … que = nur. Ne … plus hieße „nicht mehr“; seulement steht ohne ne.','Die Region hat nur zwei Millionen Einwohner.'],
  ['Le nombre de touristes a ___. (gestiegen)',['augmenté','baissé','diminué'],'Le nombre de touristes a augmenté.','Augmenter = steigen; baisser / diminuer = sinken.'],
  ['Was bedeutet „Les prix ont baissé de cinq pour cent“?',['Die Preise sind um 5 % gesunken.','Die Preise sind um 5 % gestiegen.','Die Preise liegen bei 5 %.'],'Les prix ont baissé de cinq pour cent.','Baisser de = sinken um.'],
  ['Was bedeutet „Selon une étude“?',['laut einer Studie','gegen eine Studie','nach einem Studium'],'Selon une étude, les jeunes lisent moins.','Selon = laut, gemäß.'],
  ['Was bedeutet „Une nouvelle loi autorise …“?',['Ein neues Gesetz erlaubt …','Ein neues Gesetz verbietet …','Eine neue Regel empfiehlt …'],'Une nouvelle loi autorise les magasins à ouvrir le dimanche.','Autoriser = erlauben; la loi = das Gesetz.'],
  ['Wie liest du „15 %“?',['quinze pour cent','quinze par cent','quinze cents'],'Quinze pour cent.','% = pour cent.']
 ],
 dialogue:['Tu as lu l’article sur le sommeil ?','Oui. Un Français sur trois dort moins de six heures.','Et les jeunes ?','Quarante pour cent d’entre eux regardent leur portable au lit.','Moi, je dors huit heures par nuit.','Tu fais partie des chanceux, alors !'],
 pron:['pour cent / sur trois','Pour cent spricht man [puʁsɑ̃]; das t von cent ist stumm. Bei vingt pour cent spricht man [vɛ̃puʁsɑ̃]. Millions [miljɔ̃] wird mit j gesprochen.'],
 transfer:['Erzähle die wichtigsten Zahlen aus einer kurzen Meldung nach und sage, was dich überrascht.','Schreibe eine kurze Meldung (3–4 Sätze) mit Zahlen, Prozenten und de plus en plus.'],
 domains:['Schriftliche Rezeption','Mündliche Produktion','Schriftliche Produktion'],
 app:{speak:'J’ai lu un article intéressant. Selon une étude, un Français sur trois dort moins de six heures par nuit. Quarante pour cent des jeunes regardent leur portable au lit. Seulement dix pour cent font une sieste. Ça me surprend un peu : je pensais que c’était plus.',
  write:'Selon une étude, de plus en plus de jeunes font du vélo.\nTrente pour cent d’entre eux vont à l’école à vélo.\nLe nombre de pistes cyclables a augmenté.\nMais les villages n’ont que peu de pistes.',
  placeholder:'Schreibe eine kurze Meldung …',help:'Nutze Prozentangaben, … sur …, de plus en plus und ne … que.',
  hints:[['Selon une étude, …','Laut einer Studie …'],['… pour cent d’entre eux …','… Prozent von ihnen …'],['De plus en plus de …','Immer mehr …']]},
 goals:['Kurze Zeitungsmeldungen mit Zahlen und Prozenten verstehen.','Einer Meldung die passende Überschrift zuordnen.','Anteile und Entwicklungen ausdrücken: … sur …, pour cent, de plus en plus, augmenter, baisser.'],
 units:[
  {title:'Zahlen, Anteile, Entwicklungen',rule:'Anteile: … pour cent (%), deux sur trois (zwei von drei), la moitié (die Hälfte), un quart (ein Viertel). D’entre eux / elles = von ihnen. Entwicklungen: augmenter (steigen), baisser / diminuer (sinken), de plus en plus (immer mehr), de moins en moins (immer weniger). Um wie viel: augmenter de 5 %.',
   pairs:[['Deux Français sur trois partent en vacances.','Zwei von drei Franzosen verreisen.'],['La moitié des habitants a moins de trente ans.','Die Hälfte der Einwohner ist unter dreißig.'],['Les prix ont augmenté de trois pour cent.','Die Preise sind um drei Prozent gestiegen.'],['De moins en moins de jeunes fument.','Immer weniger junge Leute rauchen.'],['Vingt pour cent d’entre elles travaillent à temps partiel.','Zwanzig Prozent von ihnen arbeiten Teilzeit.']],
   emphasis:['pour cent','sur','la moitié','d’entre eux','augmenter','baisser','de plus en plus','de moins en moins']},
  {title:'Meldungen lesen und Überschriften finden',rule:'Für Teil 1 des Leseverstehens suchst du das Hauptthema: Wer? Was? Welche Zahl? Achte auf Signalwörter: selon (laut), une étude (eine Studie), une loi (ein Gesetz), autoriser (erlauben), coûter cher à (teuer sein für). Seulement und ne … que bedeuten „nur“ – oft der Schlüssel für die richtige Überschrift.',
   pairs:[['Selon un sondage, les Français dorment moins.','Laut einer Umfrage schlafen die Franzosen weniger.'],['Une loi autorise les magasins à ouvrir le dimanche.','Ein Gesetz erlaubt Geschäften, sonntags zu öffnen.'],['Les travaux coûtent cher à la commune.','Die Bauarbeiten kosten die Gemeinde viel.'],['La ville ne compte que dix mille habitants.','Die Stadt hat nur zehntausend Einwohner.'],['Seulement un tiers des employés prend le train.','Nur ein Drittel der Angestellten nimmt den Zug.']],
   emphasis:['selon','une étude','une loi','autoriser','coûter cher à','seulement','ne … que']}
 ],
 tasks:[
  [0,'Deux Français ___ trois partent en vacances.','sur',['de','pour'],'Zwei von drei Franzosen verreisen.','Anteil'],
  [0,'La ___ des habitants a moins de trente ans.','moitié',['demi','milieu'],'Die Hälfte der Einwohner ist unter dreißig.','Anteil'],
  [0,'Les prix ont augmenté ___ trois pour cent.','de',['pour','par'],'Die Preise sind um drei Prozent gestiegen.','Entwicklung','Augmenter de + Zahl = um … steigen.'],
  [0,'___ de jeunes fument.','De moins en moins',['De plus en moins','Moins et moins'],'Immer weniger junge Leute rauchen.','Entwicklung','Immer weniger = de moins en moins de + Nomen.'],
  [0,'Vingt pour cent ___ elles travaillent à temps partiel.','d’entre',['entre','d’eux'],'Zwanzig Prozent von ihnen arbeiten Teilzeit.','Anteil','Ein Anteil von einer Gruppe: … pour cent d’entre elles.'],
  [0,'Le nombre de touristes a ___. (sinken)','baissé',['augmenté','monté'],'Die Zahl der Touristen ist gesunken.','Entwicklung'],
  [1,'___ un sondage, les Français dorment moins. (laut)','Selon',['Pendant','Contre'],'Laut einer Umfrage schlafen die Franzosen weniger.','Meldung'],
  [1,'Une loi ___ les magasins à ouvrir le dimanche. (erlauben)','autorise',['interdit','oblige de'],'Ein Gesetz erlaubt Geschäften, sonntags zu öffnen.','Meldung'],
  [1,'La ville ne compte ___ dix mille habitants.','que',['pas','plus'],'Die Stadt hat nur zehntausend Einwohner.','ne … que'],
  [1,'Les travaux coûtent ___ à la commune.','cher',['chers','chère'],'Die Bauarbeiten kosten die Gemeinde viel.','Meldung','Coûter cher: cher bleibt unverändert (Adverb).']
 ],
 check:[
  ['Meldung: « Le vélo a la cote : selon une étude, de plus en plus de salariés vont au travail à vélo. » Welche Überschrift passt?',['Toujours plus de cyclistes au travail','Moins de vélos dans les villes','Les vélos électriques trop chers'],'De plus en plus de salariés à vélo = immer mehr Radfahrer.','titre'],
  ['« Seulement un salarié sur dix déjeune à la cantine. » Was stimmt?',['10 % essen in der Kantine.','90 % essen in der Kantine.','Die Hälfte isst in der Kantine.'],'Un sur dix = 10 %.','pourcentage'],
  ['« Le village ne compte que huit cents habitants. » Was bedeutet das?',['Das Dorf hat nur 800 Einwohner.','Das Dorf hat mehr als 800 Einwohner.','Das Dorf hat 800 Einwohner verloren.'],'Ne … que = nur.','neque'],
  ['Du gibst eine Zahl wieder: Die Mieten sind um 4 % gestiegen.',['Les loyers ont augmenté de quatre pour cent.','Les loyers ont baissé de quatre pour cent.','Les loyers ont augmenté à quatre pour cent.'],'Augmenter de = steigen um.','augmenter','Les loyers ont augmenté de quatre pour cent.'],
  ['« Une nouvelle loi autorise les villes à faire payer les parkings le dimanche. » Welche Überschrift passt?',['Parkings payants aussi le dimanche','Parkings gratuits toute la semaine','Moins de voitures en ville'],'Autoriser à faire payer = erlauben, Gebühren zu verlangen.','loi'],
  ['« Trente pour cent d’entre eux lisent en ligne. » Was bedeutet d’entre eux?',['von ihnen','zwischen ihnen','für sie'],'D’entre eux = von ihnen.','entre'],
  ['« Le nombre d’accidents a diminué de moitié. » Was ist passiert?',['Die Unfälle haben sich halbiert.','Die Unfälle haben sich verdoppelt.','Die Hälfte der Straßen ist gesperrt.'],'Diminuer de moitié = sich halbieren.','diminuer'],
  ['Du liest: « Selon un sondage… » Was folgt?',['das Ergebnis einer Umfrage','eine Werbung','ein Wetterbericht'],'Un sondage = eine Umfrage.','selon']
 ],
 transfers:[
  ['sur','Un enfant ___ quatre a un téléphone. (von)','sur','Eines von vier Kindern hat ein Telefon.'],
  ['pourcent','Trente ___ cent des habitants ont un jardin.','pour','Dreißig Prozent der Einwohner haben einen Garten.'],
  ['entre','La moitié d’___ eux habite en ville.','entre','Die Hälfte von ihnen wohnt in der Stadt.'],
  ['plusenplus','De plus en ___ de gens travaillent à la maison.','plus','Immer mehr Leute arbeiten zu Hause.'],
  ['augmenter','Les prix ont ___ de deux pour cent. (steigen)','augmenté','Die Preise sind um zwei Prozent gestiegen.'],
  ['neque','Le village ne compte ___ trois cents habitants.','que','Das Dorf hat nur dreihundert Einwohner.'],
  ['selon','___ une étude, nous mangeons trop de sucre. (laut)','Selon','Laut einer Studie essen wir zu viel Zucker.']
 ],
 comp:{voices:{A:'female',B:'male'},turns:[
  ['A','Écoute ça : selon un sondage, les Français lisent de moins en moins.'],['B','Ah bon ? Combien de livres par an ?'],
  ['A','En moyenne, cinq livres. Il y a dix ans, c’était huit.'],['B','Et les jeunes ?'],
  ['A','Seulement un jeune sur trois lit un livre par mois.'],['B','Mais ils lisent beaucoup sur leur portable, non ?'],
  ['A','Oui, soixante pour cent d’entre eux lisent des articles en ligne.'],['B','Alors ils ne lisent pas moins, ils lisent autrement !']],
  fields:[['Thema der Umfrage',['Lesen','Sport','Reisen']],['Bücher pro Jahr heute',['5','8','15']],['Vor zehn Jahren',['8','5','10']],['Junge Leute mit einem Buch pro Monat',['einer von drei','zwei von drei','einer von zehn']],['Lesen online',['60 %','16 %','40 %']],['Fazit des Mannes',['sie lesen anders','sie lesen gar nicht','sie lesen mehr Bücher']]]},
 intro:['Trente pour cent d’entre eux le lisent en ligne.',['Treize pour cent d’entre eux le lisent en ligne.','Trente pour cent d’entre eux le lisent au café.']],
 hard:{
  obj:[['chiffres','Zahlen und Anteile'],['evolution','Entwicklungen ausdrücken'],['article','Meldungen verstehen'],['comprendre','Zahlen hörend verstehen']],
  text:'Les Français et le sport. {Selon|laut|article} une étude publiée lundi, de {plus|immer mehr (de … en plus)|evolution} en plus de Français font du sport. Deux Français {sur|von (zwei … drei)|chiffres} trois font du sport une fois par semaine. Trente pour {cent|Prozent (pour …)|chiffres} d’{entre|von (d’… eux)|chiffres} eux font de la marche. Le nombre de clubs de football a {augmenté|steigen, Partizip|evolution} de dix pour cent. Mais les jeunes font de {moins|immer weniger (de … en moins)|evolution} en moins de sport à l’école. La {moitié|Hälfte|chiffres} des enfants ne fait {que|nur (ne …)|article} deux heures de sport par semaine. Les prix des salles de sport ont {baissé|sinken, Partizip|evolution} de cinq pour cent. Une nouvelle {loi|Gesetz|article} {autorise|erlauben, sie|article} les écoles à ouvrir leurs gymnases le week-end. Cela {coûte|kosten, cela|article} cher aux communes, mais les parents sont contents.',
  listen:[
   {text:'Selon l’Institut national de la statistique, la ville de Bordeaux compte maintenant deux cent soixante mille habitants. C’est cinq pour cent de plus qu’il y a dix ans.',voice:'male',
    q:[['Combien d’habitants compte Bordeaux ?','260 000',['260 000','206 000','226 000'],'chiffres'],['De combien la population a-t-elle augmenté ?','de cinq pour cent',['de cinq pour cent','de quinze pour cent','de cinquante pour cent'],'evolution'],['Depuis combien de temps ?','dix ans',['dix ans','cinq ans','deux ans'],'comprendre']]},
   {turns:[['A','Tu savais que la moitié des Français ont un chat ou un chien ?'],['B','La moitié ? C’est beaucoup !'],['A','Oui, et un sur quatre a un chat.'],['B','Moi, je fais partie des autres : je n’ai qu’un poisson !']],voices:{A:'female',B:'male'},
    q:[['Quelle part des Français a un chat ou un chien ?','la moitié',['la moitié','un quart','un tiers'],'chiffres'],['Combien de Français sur quatre ont un chat ?','un sur quatre',['un sur quatre','deux sur quatre','trois sur quatre'],'chiffres'],['Quel animal a l’homme ?','un poisson',['un poisson','un chat','aucun'],'article']]}
  ],
  writing:{situation:'Tu as lu une petite étude dans un journal français. Raconte-la à une amie dans un e-mail.',points:['Dis de quoi parle l’article et selon qui.','Donne deux chiffres importants (pourcentages, sur …).','Dis ce que tu en penses.'],
   model:'Chère Sonia,\nJ’ai lu un article intéressant dans Le Monde. Selon une étude, de plus en plus de Français travaillent à la maison. Un salarié sur quatre fait du télétravail au moins un jour par semaine. Quarante pour cent d’entre eux disent qu’ils sont plus calmes. Je trouve que c’est une bonne chose, mais moi, je préfère aller au bureau.\nÀ bientôt,\nEmma'}
 },
 words:[['pour cent','Prozent','per cent'],['… sur …','… von …','… out of …'],['d’entre eux','von ihnen','of them'],['la moitié','die Hälfte','half'],['de plus en plus','immer mehr','more and more'],['augmenter / baisser','steigen / sinken','to rise / to fall'],['selon','laut','according to'],['la loi','das Gesetz','law']],
 vocab:[['pour cent','Prozent'],['la moitié','die Hälfte'],['l’étranger (m.)','das Ausland'],['l’habitant / l’habitante','der Einwohner / die Einwohnerin'],['augmenter','steigen'],['baisser','sinken'],['diminuer','abnehmen'],['selon','laut'],['l’étude (f.)','die Studie'],['le sondage','die Umfrage'],['la loi','das Gesetz'],['autoriser','erlauben']]
}
];
