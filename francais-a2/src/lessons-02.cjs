/* Français A2, lessons 7–12. Format: see tools/build-francais-a2.cjs (correct option first). */
module.exports=[
{
 id:7,
 phrases:[
  ['Samedi prochain, je ferai les courses.','Nächsten Samstag werde ich einkaufen.'],
  ['Nous irons chez mes parents dimanche.','Wir werden am Sonntag zu meinen Eltern fahren.'],
  ['Il fera beau ce week-end.','Dieses Wochenende wird es schön.'],
  ['Je te raconterai tout à mon retour.','Ich werde dir bei meiner Rückkehr alles erzählen.'],
  ['On se verra la semaine prochaine.','Wir sehen uns nächste Woche.'],
  ['Quand tu arriveras, je t’appellerai.','Wenn du ankommst, rufe ich dich an.'],
  ['Je vais partir vendredi soir.','Ich fahre Freitagabend weg.'],
  ['Nous aurons le temps de visiter le musée.','Wir werden Zeit haben, das Museum zu besuchen.'],
  ['Tu seras là samedi ?','Wirst du am Samstag da sein?'],
  ['Je pourrai venir après le travail.','Ich werde nach der Arbeit kommen können.']
 ],
 quiz:[
  ['Samedi prochain, je ___ les courses. (faire, Futur)',['ferai','faisais','fais'],'Samedi prochain, je ferai les courses.','Faire hat den Futurstamm fer-: je ferai.'],
  ['Was bedeutet „On se verra la semaine prochaine“?',['Wir sehen uns nächste Woche.','Wir haben uns letzte Woche gesehen.','Wir würden uns nächste Woche sehen.'],'On se verra la semaine prochaine.','Verra ist futur simple von voir (Stamm verr-).'],
  ['Il ___ beau ce week-end. (faire, Futur)',['fera','faisait','ferait'],'Il fera beau ce week-end.','Wetter in der Zukunft: il fera beau. Ferait wäre conditionnel.'],
  ['Nous ___ chez mes parents. (aller, Futur)',['irons','allerons','allons'],'Nous irons chez mes parents dimanche.','Aller hat den Futurstamm ir-: nous irons.'],
  ['Quand tu ___, je t’appellerai. (arriver)',['arriveras','arrives','arrivais'],'Quand tu arriveras, je t’appellerai.','Nach quand steht im Französischen Futur, wenn die Handlung in der Zukunft liegt.'],
  ['Welche Endung hat das futur simple bei je?',['-ai','-ais','-é'],'Je te raconterai tout à mon retour.','Futur: Infinitiv + -ai, -as, -a, -ons, -ez, -ont.'],
  ['Tu ___ là samedi ? (être, Futur)',['seras','sera','serais'],'Tu seras là samedi ?','Être hat den Futurstamm ser-: tu seras.'],
  ['Was bedeutet „Je vais partir vendredi“?',['Ich fahre am Freitag weg.','Ich bin am Freitag weggefahren.','Ich fuhr freitags weg.'],'Je vais partir vendredi soir.','Futur proche: aller + Infinitiv für nahe Pläne.'],
  ['Nous ___ le temps. (avoir, Futur)',['aurons','avons','avions'],'Nous aurons le temps de visiter le musée.','Avoir hat den Futurstamm aur-: nous aurons.'],
  ['Welche Zeitangabe zeigt auf die Zukunft?',['la semaine prochaine','la semaine dernière','il y a une semaine'],'On se verra la semaine prochaine.','Prochain = nächster, dernier = letzter.']
 ],
 dialogue:['Qu’est-ce que tu feras le week-end prochain ?','Samedi, j’irai à la piscine avec ma fille.','Et dimanche ?','Nous irons chez mes parents, s’il fait beau.','Tu seras libre lundi soir ?','Oui, on se verra au café. Je te raconterai tout !'],
 pron:['je ferai / je ferais','Je ferai (Futur) endet auf [e], je ferais (conditionnel) auf [ɛ]. Viele Sprecher unterscheiden das kaum – achte deshalb beim Lesen auf die Endung -ai oder -ais.'],
 transfer:['Erzähle, was du nächstes Wochenende machen wirst, und frage deinen Partner nach seinen Plänen.','Schreibe eine kurze Nachricht über deine Pläne mit mindestens drei Verben im futur simple.'],
 domains:['Mündliche Produktion','Mündliche Interaktion','Schriftliche Produktion'],
 app:{speak:'Le week-end prochain, je ferai beaucoup de choses. Samedi matin, j’irai au marché. L’après-midi, je verrai des amis en ville. Dimanche, s’il fait beau, nous irons à la campagne. Et vous, qu’est-ce que vous ferez le week-end prochain ?',
  write:'Samedi, j’irai au marché.\nL’après-midi, je verrai des amis.\nDimanche, nous ferons une promenade.\nQuand je rentrerai, je t’appellerai.',
  placeholder:'Schreibe über deine Pläne …',help:'Verwende Futurstämme wie ir-, fer-, ser-, aur- und verr-.',
  hints:[['Samedi, j’irai …','Am Samstag werde ich … gehen.'],['Nous ferons …','Wir werden … machen.'],['Quand …, je …','Wenn …, werde ich …']]},
 goals:['Über Pläne für das Wochenende sprechen und nachfragen.','Das futur simple regelmäßiger und wichtiger unregelmäßiger Verben bilden.','quand + Futur und futur proche passend verwenden.'],
 units:[
  {title:'Das futur simple',rule:'Das futur simple bildest du meist aus dem Infinitiv + Endung: je -ai, tu -as, il -a, nous -ons, vous -ez, ils -ont: je parlerai, nous finirons. Bei -re fällt das e weg: prendre → je prendrai. Wichtige unregelmäßige Stämme: être → ser-, avoir → aur-, aller → ir-, faire → fer-, voir → verr-, venir → viendr-, pouvoir → pourr-.',
   pairs:[['Je parlerai à Paul.','Ich werde mit Paul sprechen.'],['Nous prendrons le train.','Wir werden den Zug nehmen.'],['Elle sera contente.','Sie wird zufrieden sein.'],['Ils viendront à huit heures.','Sie werden um acht Uhr kommen.'],['Tu pourras m’aider ?','Wirst du mir helfen können?']],
   emphasis:['Infinitiv','-ai','-as','-ons','-ez','-ont','ser-','aur-','ir-','fer-','verr-']},
  {title:'quand + Futur, futur proche',rule:'Im Deutschen sagt man „Wenn du ankommst, rufe ich an“ im Präsens. Im Französischen stehen nach quand beide Teile im Futur: Quand tu arriveras, je t’appellerai. Für feste, nahe Pläne benutzt man oft das futur proche: aller + Infinitiv – je vais partir.',
   pairs:[['Quand tu arriveras, je t’appellerai.','Wenn du ankommst, rufe ich dich an.'],['Quand il fera beau, nous sortirons.','Wenn es schön ist, gehen wir raus.'],['Je vais partir ce soir.','Ich fahre heute Abend weg.'],['On va manger au restaurant.','Wir gehen essen.'],['Quand je serai à Paris, je t’écrirai.','Wenn ich in Paris bin, schreibe ich dir.']],
   emphasis:['quand','beide Teile im Futur','futur proche','aller + Infinitiv']}
 ],
 tasks:[
  [0,'Je ___ à Paul demain. (parler)','parlerai',['parlerais','parlais'],'Ich werde morgen mit Paul sprechen.','futur'],
  [0,'Nous ___ le train. (prendre)','prendrons',['prenderons','prendront'],'Wir werden den Zug nehmen.','futur','Bei -re fällt das e weg: prendr- + ons. Prendront gehört zu ils.'],
  [0,'Elle ___ contente. (être)','sera',['serait','seras'],'Sie wird zufrieden sein.','futur','Être → ser-; zu elle gehört -a: elle sera. Serait ist conditionnel.'],
  [0,'Ils ___ à huit heures. (venir)','viendront',['venront','viendrons'],'Sie werden um acht kommen.','futur','Venir → viendr-; zu ils gehört -ont.'],
  [0,'Tu ___ m’aider ? (pouvoir)','pourras',['pouvras','pourra'],'Wirst du mir helfen können?','futur','Pouvoir → pourr-; zu tu gehört -as.'],
  [0,'On se ___ demain. (voir)','verra',['voira','verrait'],'Wir werden uns morgen sehen.','futur','Voir → verr-: on se verra. Verrait ist conditionnel.'],
  [1,'Quand tu ___, je t’appellerai. (arriver)','arriveras',['arrives','arriverais'],'Wenn du ankommst, rufe ich dich an.','quand'],
  [1,'Quand il ___ beau, nous sortirons. (faire)','fera',['fait','faisait'],'Wenn es schön ist, gehen wir raus.','quand'],
  [1,'Je ___ partir ce soir. (futur proche)','vais',['vas','suis'],'Ich fahre heute Abend weg.','futur proche'],
  [1,'Quand je ___ à Paris, je t’écrirai. (être)','serai',['suis','serais'],'Wenn ich in Paris bin, schreibe ich dir.','quand']
 ],
 check:[
  ['« Je te montrerai les photos quand on se verra samedi. » Wann siehst du die Fotos?',['beim Treffen am Samstag','sofort per E-Mail','gar nicht'],'Quand on se verra = wenn wir uns sehen werden.','verra'],
  ['Du sagst: Wenn ich nach Hause komme, rufe ich dich an.',['Quand je rentrerai, je t’appellerai.','Quand je rentre, je t’appelais.','Quand je rentrais, je t’appellerai.'],'Nach quand + Zukunft steht im Französischen Futur.','quand','Quand je rentrerai, je t’appellerai.'],
  ['« Demain, il fera beau le matin, mais il pleuvra l’après-midi. » Wann regnet es?',['morgen Nachmittag','morgen früh','heute Nachmittag'],'Il pleuvra = es wird regnen; l’après-midi = am Nachmittag.','meteo'],
  ['Welche Form ist das futur simple von aller (nous)?',['nous irons','nous allerons','nous allions'],'Aller → ir-.','aller'],
  ['Dein Partner fragt nach deinem nächsten Wochenende. Welche Frage stellt er?',['Qu’est-ce que tu feras le week-end prochain ?','Qu’est-ce que tu as fait le week-end prochain ?','Qu’est-ce que tu faisais le week-end prochain ?'],'Für die Zukunft: futur simple (tu feras).','question','Qu’est-ce que tu feras le week-end prochain ?'],
  ['Du versprichst, am Samstag da zu sein.',['Je serai là samedi.','J’étais là samedi.','Je serais là samedi.'],'Être → ser-: je serai.','etre','Je serai là samedi.'],
  ['« Nous aurons le temps de visiter le château. » Was bedeutet das?',['Wir werden Zeit haben, das Schloss zu besichtigen.','Wir hatten Zeit, das Schloss zu besichtigen.','Wir haben keine Zeit für das Schloss.'],'Aurons = futur simple von avoir.','avoir'],
  ['« Ce soir, je vais rester à la maison. » Welche Zeitform ist das?',['futur proche','futur simple','passé composé'],'Aller + Infinitiv = futur proche.','proche']
 ],
 transfers:[
  ['regulier','Demain, je ___ à ma mère. (téléphoner)','téléphonerai','Morgen rufst du deine Mutter an. Setze das Futur ein.'],
  ['etre','Vous ___ à l’heure ? (être)','serez','Werdet ihr pünktlich sein?'],
  ['aller','Samedi, nous ___ à la mer. (aller)','irons','Am Samstag fahrt ihr ans Meer.'],
  ['faire','Il ___ chaud demain. (faire)','fera','Morgen wird es heiß.'],
  ['voir','On se ___ lundi. (voir)','verra','Ihr seht euch am Montag.'],
  ['quand','Quand tu ___ à Lyon, écris-moi ! (être)','seras','Wenn du in Lyon bist, schreib mir!'],
  ['venir','Mes amis ___ dimanche. (venir)','viendront','Deine Freunde kommen am Sonntag.'],
  ['avoir','J’___ trente ans en mai. (avoir)','aurai','Du wirst im Mai dreißig.']
 ],
 comp:{voices:{A:'female',B:'male'},turns:[
  ['A','Tu as des projets pour le week-end ?'],['B','Oui ! Vendredi soir, je vais au concert avec Julien.'],
  ['A','Et samedi ?'],['B','Samedi, j’irai voir mes grands-parents à Dijon. Je prendrai le train de neuf heures.'],
  ['A','Tu rentreras quand ?'],['B','Dimanche soir. Quand je serai rentré, je t’appellerai.'],
  ['A','D’accord. On pourra aller au cinéma lundi ?'],['B','Bonne idée ! On se verra devant le cinéma à vingt heures.']],
  fields:[['Freitagabend',['Konzert','Kino','Restaurant']],['Samstag besucht er',['seine Großeltern','seine Eltern','Julien']],['Stadt',['Dijon','Dieppe','Lyon']],['Zug um',['9 Uhr','19 Uhr','10 Uhr']],['Rückkehr',['Sonntagabend','Samstagabend','Montag früh']],['Treffen am Montag',['20 Uhr vor dem Kino','18 Uhr im Café','20 Uhr am Bahnhof']]]},
 intro:['On se verra la semaine prochaine.',['On se voit la semaine prochaine.','On se verra le week-end prochain.']],
 hard:{
  obj:[['futur','futur simple bilden'],['irreg','Unregelmäßige Futurstämme'],['quand','quand + Futur'],['comprendre','Pläne hörend verstehen']],
  text:'Salut Hugo ! Voici le programme de notre week-end à Lyon. Vendredi soir, je t’{attendrai|warten, je|futur} à la gare à dix-neuf heures. Nous {irons|aller, nous|irreg} directement chez moi. Samedi matin, nous {visiterons|besichtigen, nous|futur} la vieille ville. L’après-midi, tu {pourras|pouvoir, tu|irreg} te reposer. Le soir, ma sœur {sera|être, elle|irreg} là et nous {mangerons|essen, nous|futur} au restaurant. Dimanche, il {fera|faire, il|irreg} beau, alors nous {prendrons|prendre, nous|futur} des vélos. Mes amis {viendront|venir, ils|irreg} avec nous. Quand tu {seras|être, tu|quand} dans le train, envoie-moi un message. Quand tu {arriveras|arriver, tu|quand}, je t’{appellerai|anrufen, je|futur}. Si tu as faim, on {verra|voir, on|irreg} un petit marché près de la gare. Quand nous {aurons|avoir, nous|quand} le temps, nous irons au musée. À vendredi ! Léa',
  listen:[
   {text:'Ce week-end, il fera beau sur toute la France. Samedi, il fera vingt-cinq degrés à Paris. Dimanche, il y aura des nuages dans le Nord, mais il ne pleuvra pas.',voice:'male',
    q:[['Quel temps fera-t-il ce week-end ?','Il fera beau.',['Il fera beau.','Il pleuvra.','Il neigera.'],'futur'],['Combien de degrés fera-t-il samedi à Paris ? Réponds en chiffres.','25',null,'comprendre'],['Qu’est-ce qu’il y aura dimanche dans le Nord ?','des nuages',['des nuages','de la pluie','du vent'],'irreg']]},
   {turns:[['A','Tu viendras à ma fête samedi ?'],['B','Oui, mais j’arriverai tard. Je travaille jusqu’à huit heures.'],['A','Pas de problème. Quand tu seras là, on mangera.'],['B','Super, j’apporterai le dessert !']],voices:{A:'female',B:'female'},
    q:[['Est-ce qu’elle viendra à la fête ?','Oui, mais tard.',['Oui, mais tard.','Non, elle travaille.','Oui, très tôt.'],'futur'],['Jusqu’à quelle heure travaille-t-elle ? Réponds en chiffres.',['8','20'],null,'comprendre'],['Qu’est-ce qu’elle apportera ?','le dessert',['le dessert','les boissons','le pain'],'quand']]}
  ],
  writing:{situation:'Une amie française veut savoir ce que tu feras pendant tes prochaines vacances. Réponds-lui.',points:['Dis où tu iras, quand et avec qui.','Explique ce que vous ferez sur place.','Propose de vous voir à ton retour avec quand + futur.'],
   model:'Chère Élise,\nEn juillet, j’irai deux semaines en Italie avec mon copain. Nous prendrons le train jusqu’à Milan. Ensuite, nous visiterons Venise et nous ferons du vélo au bord d’un lac. Il fera chaud, j’espère ! Quand je rentrerai, je t’appellerai et on se verra pour un café. Je te raconterai tout.\nBises,\nNina'}
 },
 words:[['prochain / prochaine','nächster / nächste','next'],['le futur simple','das Futur','future tense'],['je serai','ich werde sein','I will be'],['j’irai','ich werde gehen','I will go'],['je ferai','ich werde machen','I will do'],['on se verra','wir sehen uns','we will see each other'],['raconter','erzählen','to tell'],['le retour','die Rückkehr','return']],
 vocab:[['prochain / prochaine','nächster / nächste'],['le projet','der Plan'],['raconter','erzählen'],['le retour','die Rückkehr'],['la surprise','die Überraschung'],['la nouvelle','die Neuigkeit'],['réserver','reservieren'],['la campagne','das Land'],['libre','frei'],['peut-être','vielleicht'],['fêter','feiern'],['apporter','mitbringen']]
},
{
 id:8,
 phrases:[
  ['J’ai un chien qui s’appelle Filou.','Ich habe einen Hund, der Filou heißt.'],
  ['C’est le chat que ma sœur a adopté.','Das ist die Katze, die meine Schwester adoptiert hat.'],
  ['Mon chien adore courir dans le parc.','Mein Hund liebt es, im Park zu rennen.'],
  ['Je le promène deux fois par jour.','Ich gehe zweimal am Tag mit ihm spazieren.'],
  ['Il est petit, noir et très gentil.','Er ist klein, schwarz und sehr lieb.'],
  ['Je dois lui donner à manger le matin.','Ich muss ihm morgens zu fressen geben.'],
  ['Vous avez un animal de compagnie ?','Haben Sie ein Haustier?'],
  ['Les animaux sont interdits dans l’immeuble.','Tiere sind im Wohnhaus verboten.'],
  ['Mon voisin garde mon chat pendant les vacances.','Mein Nachbar passt in den Ferien auf meine Katze auf.'],
  ['Je suis allergique aux chats.','Ich bin allergisch gegen Katzen.']
 ],
 quiz:[
  ['J’ai un chien ___ s’appelle Filou.',['qui','que','où'],'J’ai un chien qui s’appelle Filou.','Qui ersetzt das Subjekt des Relativsatzes: der Hund heißt Filou.'],
  ['C’est le chat ___ ma sœur a adopté.',['que','qui','dont'],'C’est le chat que ma sœur a adopté.','Que ersetzt das Objekt: ma sœur a adopté le chat.'],
  ['Was ist „un animal de compagnie“?',['ein Haustier','ein Zootier','ein Tierarzt'],'Vous avez un animal de compagnie ?','Animal de compagnie = Haustier. Der Tierarzt heißt le vétérinaire.'],
  ['Je ___ promène deux fois par jour. (den Hund)',['le','lui','la'],'Je le promène deux fois par jour.','Promener quelqu’un ohne à → direktes Objekt le.'],
  ['Was bedeutet „Mon voisin garde mon chat“?',['Mein Nachbar passt auf meine Katze auf.','Mein Nachbar mag meine Katze.','Mein Nachbar sucht meine Katze.'],'Mon voisin garde mon chat pendant les vacances.','Garder un animal = auf ein Tier aufpassen.'],
  ['Was bedeutet „interdit“?',['verboten','erlaubt','selten'],'Les animaux sont interdits dans l’immeuble.','Interdit = verboten; autorisé = erlaubt.'],
  ['Mon chien adore ___ dans le parc.',['courir','court','couru'],'Mon chien adore courir dans le parc.','Nach adorer / aimer steht der Infinitiv.'],
  ['Wie sagst du „Ich bin allergisch gegen Katzen“?',['Je suis allergique aux chats.','J’ai allergique les chats.','Je suis allergique de chats.'],'Je suis allergique aux chats.','Allergique à; à + les = aux.'],
  ['Le perroquet ___ je t’ai montré parle !',['que','qui','où'],'Le perroquet que je t’ai montré parle !','Je t’ai montré le perroquet → Objekt → que.'],
  ['Welche Beschreibung passt zu einem Hund?',['Il est petit, noir et très gentil.','Il est petite, noire et très gentille.','Il est petits, noirs et très gentils.'],'Il est petit, noir et très gentil.','Le chien ist männlich Singular: petit, noir, gentil.']
 ],
 dialogue:['Vous avez un animal de compagnie ?','Oui, j’ai un chien qui s’appelle Filou.','Il est comment ?','Il est petit et très gentil. Il adore courir.','Qui le garde pendant les vacances ?','C’est mon voisin, un monsieur que je connais bien.'],
 pron:['chien / chat','Ch spricht man im Französischen [ʃ] wie deutsch „sch“: chien [ʃjɛ̃], chat [ʃa]. Das t von chat bleibt stumm. Qui [ki] und que [kə] klar unterscheiden.'],
 transfer:['Sprich über ein Haustier (eigenes oder von Bekannten): Art, Name, Aussehen, Pflege. Stelle zwei Fragen dazu.','Beschreibe ein Tier in vier Sätzen mit qui und que.'],
 domains:['Mündliche Interaktion','Mündliche Produktion','Schriftliche Produktion'],
 app:{speak:'J’ai une chatte qui s’appelle Mimi. C’est une chatte que j’ai trouvée dans la rue il y a trois ans. Elle est grise et très calme. Je lui donne à manger le matin et le soir. Pendant les vacances, c’est ma voisine qui la garde. Et vous, vous avez un animal ?',
  write:'J’ai un chien qui s’appelle Rex.\nC’est un chien que j’ai adopté l’année dernière.\nIl est grand et très gentil.\nJe le promène tous les soirs.',
  placeholder:'Beschreibe ein Tier …',help:'Verbinde Sätze mit qui (Subjekt) und que (Objekt).',
  hints:[['J’ai un … qui …','Ich habe einen …, der …'],['C’est un … que …','Das ist ein …, den …'],['Je le / la promène …','Ich gehe mit ihm / ihr …']]},
 goals:['Über Haustiere sprechen und sie beschreiben.','Sätze mit den Relativpronomen qui und que verbinden.','Fragen zu Pflege und Alltag mit einem Tier stellen und beantworten.'],
 units:[
  {title:'Relativpronomen qui und que',rule:'Mit qui und que verbindest du zwei Sätze. Qui ersetzt das Subjekt; danach folgt direkt ein Verb: un chien qui aime courir. Que ersetzt das direkte Objekt; danach folgt ein Subjekt: le chat que j’ai adopté. Vor Vokal wird que zu qu’, qui wird nie verkürzt.',
   pairs:[['J’ai un chien qui s’appelle Filou.','Ich habe einen Hund, der Filou heißt.'],['C’est le chat que ma sœur a adopté.','Das ist die Katze, die meine Schwester adoptiert hat.'],['La voisine qui garde mon chat est sympa.','Die Nachbarin, die auf meine Katze aufpasst, ist nett.'],['Le livre que je lis parle des chiens.','Das Buch, das ich lese, handelt von Hunden.'],['C’est un animal qu’on voit souvent.','Das ist ein Tier, das man oft sieht.']],
   emphasis:['qui','que','Subjekt','direkte Objekt','qu’']},
  {title:'Tiere beschreiben und versorgen',rule:'Aussehen beschreibst du mit être + Adjektiv: il est petit, elle est grise. Das Adjektiv passt sich an: un chat noir, une chatte noire. Für die Pflege: promener le chien, donner à manger à …, garder un animal. Mit Pronomen: je le promène, je lui donne à manger.',
   pairs:[['Ma chatte est grise et calme.','Meine Katze ist grau und ruhig.'],['Je promène le chien le soir.','Ich gehe abends mit dem Hund raus.'],['Je lui donne à manger.','Ich gebe ihm / ihr zu fressen.'],['Qui garde ton lapin ?','Wer passt auf dein Kaninchen auf?'],['Les chiens sont interdits ici.','Hunde sind hier verboten.']],
   emphasis:['être + Adjektiv','promener','donner à manger','garder','le','lui']}
 ],
 tasks:[
  [0,'J’ai un chat ___ dort toute la journée.','qui',['que','qu’'],'Ich habe eine Katze, die den ganzen Tag schläft.','qui'],
  [0,'C’est le chien ___ j’ai trouvé.','que',['qui','où'],'Das ist der Hund, den ich gefunden habe.','que'],
  [0,'La dame ___ promène le chien est ma voisine.','qui',['que','qu’'],'Die Frau, die den Hund ausführt, ist meine Nachbarin.','qui'],
  [0,'Le lapin ___ il a acheté est blanc.','qu’',['qui','que'],'Das Kaninchen, das er gekauft hat, ist weiß.','que','Vor Vokal wird que zu qu’: qu’il.'],
  [0,'C’est un animal ___ aime l’eau.','qui',['que','qu’'],'Das ist ein Tier, das Wasser liebt.','qui'],
  [1,'Ma chatte est ___. (noir)','noire',['noir','noirs'],'Meine Katze ist schwarz.','Adjektiv'],
  [1,'Je ___ promène tous les soirs. (den Hund)','le',['lui','la'],'Ich gehe jeden Abend mit ihm raus.','Pronomen'],
  [1,'Je ___ donne à manger. (dem Hund)','lui',['le','leur'],'Ich gebe ihm zu fressen.','Pronomen','Donner à quelqu’un → lui.'],
  [1,'Les chiens sont ___ dans le magasin.','interdits',['interdit','autorisé'],'Hunde sind im Geschäft verboten.','Adjektiv'],
  [1,'Qui ___ ton chat pendant les vacances ?','garde',['regarde','promène'],'Wer passt in den Ferien auf deine Katze auf?','Pflege']
 ],
 check:[
  ['« Mon fils a un hamster qui dort le jour et qui joue la nuit. » Wann spielt der Hamster?',['nachts','tagsüber','morgens'],'Qui joue la nuit = der nachts spielt.','qui'],
  ['Welcher Satz ist richtig?',['Le chat que nous avons adopté est très calme.','Le chat qui nous avons adopté est très calme.','Le chat que a adopté est très calme.'],'Nous avons adopté le chat → Objekt → que.','que','Le chat que nous avons adopté est très calme.'],
  ['« Les animaux sont interdits dans l’hôtel. » Darfst du deinen Hund mitnehmen?',['Nein, Tiere sind verboten.','Ja, aber nur kleine Hunde.','Ja, gegen Aufpreis.'],'Interdit = verboten.','interdit'],
  ['Du fragst deinen Partner in der Prüfung nach Haustieren.',['Tu as un animal de compagnie ?','Tu as un animal de compagnon ?','Tu as une animale de compagnie ?'],'Un animal de compagnie = ein Haustier; animal ist männlich, le compagnon ist der Begleiter.','question','Tu as un animal de compagnie ?'],
  ['Du sagst, dass deine Nachbarin auf deine Katze aufpasst.',['Ma voisine garde mon chat.','Ma voisine regarde mon chat.','Ma voisine promène mon chat.'],'Garder = aufpassen auf.','garder','Ma voisine garde mon chat.'],
  ['« Je promène mon chien trois fois par jour. » Wie oft geht die Person mit dem Hund raus?',['dreimal täglich','dreimal pro Woche','jeden dritten Tag'],'Trois fois par jour = dreimal am Tag.','frequence'],
  ['Du beschreibst deine Hündin.',['Ma chienne est petite et blanche.','Ma chienne est petit et blanc.','Ma chienne est petits et blancs.'],'La chienne ist weiblich: petite, blanche.','accord','Ma chienne est petite et blanche.'],
  ['« C’est la voisine qui me donne des œufs. » Wer gibt die Eier?',['die Nachbarin','die Person, die spricht','beide'],'Qui ersetzt la voisine als Subjekt.','sujet']
 ],
 transfers:[
  ['qui','J’ai un chien ___ adore jouer.','qui','Ich habe einen Hund, der gern spielt.'],
  ['qui','C’est la dame ___ habite en face.','qui','Das ist die Frau, die gegenüber wohnt.'],
  ['que','Voici le chat ___ j’ai adopté.','que','Hier ist die Katze, die ich adoptiert habe.'],
  ['quelide','Le chien ___ il promène est énorme.','qu’','Der Hund, mit dem er spazieren geht, ist riesig.'],
  ['accord','Ma chatte est très ___. (gentil)','gentille','Deine Katze ist sehr lieb.'],
  ['pronom','Mon chien ? Je ___ promène le soir.','le','Deinen Hund führst du abends aus.'],
  ['lui','Je ___ donne à manger à sept heures. (à mon chat)','lui','Du fütterst deine Katze um sieben.']
 ],
 comp:{voices:{A:'male',B:'female'},turns:[
  ['A','Vous avez un animal de compagnie ?'],['B','Oui, deux ! Un chien qui s’appelle Oscar et un chat.'],
  ['A','Et le chat, il s’appelle comment ?'],['B','Caramel. C’est un chat que mes enfants ont trouvé dans le jardin.'],
  ['A','Ils sont faciles ?'],['B','Le chat, oui. Mais le chien, je dois le promener trois fois par jour.'],
  ['A','Et pendant les vacances ?'],['B','C’est ma mère qui les garde. Elle habite à la campagne.']],
  fields:[['Name des Hundes',['Oscar','Caramel','Filou']],['Name der Katze',['Caramel','Oscar','Mimi']],['Katze gefunden von',['den Kindern','der Mutter','dem Nachbarn']],['Fundort',['im Garten','auf der Straße','im Park']],['Spaziergänge täglich',['dreimal','zweimal','einmal']],['Urlaubsbetreuung',['die Mutter','die Nachbarin','eine Tierpension']]]},
 intro:['J’ai un chien qui s’appelle Filou.',['J’ai un chat qui s’appelle Filou.','J’avais un chien qui s’appelait Filou.']],
 hard:{
  obj:[['relatif','qui und que unterscheiden'],['decrire','Ein Tier beschreiben'],['soin','Über Pflege sprechen'],['comprendre','Ein Gespräch über Tiere verstehen']],
  text:'Bonjour ! J’ai un chien {qui|Relativpronomen, Subjekt|relatif} s’appelle Bruno. C’est un chien {que|Relativpronomen, Objekt|relatif} j’ai adopté il y a deux ans. Il est grand, {noir|schwarz|decrire} et très {gentil|lieb|decrire}. Ma fille a une chatte {qui|Relativpronomen, Subjekt|relatif} dort toute la journée. Elle est {grise|grau, weiblich|decrire}. Le matin, je {promène|ausführen, je|soin} Bruno dans le parc. Il adore {courir|rennen|soin}. Le soir, je {lui|ihm (donner à)|soin} donne à manger. Pendant les vacances, c’est ma voisine {qui|Relativpronomen, Subjekt|relatif} garde les animaux. C’est une dame {que|Relativpronomen, Objekt|relatif} je connais depuis longtemps. Malheureusement, les animaux sont {interdits|verboten, Plural|soin} dans beaucoup d’hôtels. Mon frère, lui, ne peut pas avoir de chat : il est {allergique|allergisch|decrire} aux chats.',
  listen:[
   {text:'Perdu : petit chien blanc qui s’appelle Pompon. Il porte un collier rouge. On l’a vu pour la dernière fois près de la gare, samedi soir. Merci d’appeler le 06 45 12 78 90.',voice:'female',
    q:[['De quelle couleur est le chien ?','blanc',['blanc','noir','rouge'],'decrire'],['Où a-t-on vu le chien pour la dernière fois ?','près de la gare',['près de la gare','dans le parc','devant l’école'],'comprendre'],['Quand a-t-on vu le chien ?','samedi soir',['samedi soir','dimanche matin','vendredi soir'],'comprendre']]},
   {turns:[['A','Tu peux garder mon chat ce week-end ?'],['B','Oui, bien sûr. Qu’est-ce qu’il mange ?'],['A','Les croquettes que je laisse dans la cuisine. Deux fois par jour.'],['B','D’accord. Et le poisson qui est dans le salon ?']],voices:{A:'female',B:'male'},
    q:[['Qu’est-ce que la femme demande ?','de garder son chat',['de garder son chat','d’acheter un chat','de promener son chien'],'soin'],['Combien de fois par jour le chat mange-t-il ? Réponds en chiffres.','2',null,'soin'],['Où sont les croquettes ?','dans la cuisine',['dans la cuisine','dans le salon','dans le jardin'],'relatif']]}
  ],
  writing:{situation:'Tu pars en vacances. Une voisine française va garder ton animal. Écris-lui un message.',points:['Présente ton animal (nom, description) avec qui ou que.','Explique ce qu’il mange et quand.','Dis ce qu’il aime faire et ce qui est interdit.'],
   model:'Chère Madame Lefèvre,\nMerci beaucoup de garder Moustache ! C’est un chat qui est très calme, mais un peu timide. Il mange les croquettes que j’ai mises dans la cuisine, le matin et le soir. Il aime dormir sur le canapé. Attention : il est interdit de lui donner du lait. Je rentre dimanche.\nBien cordialement,\nTim Becker'}
 },
 words:[['l’animal de compagnie (m.)','das Haustier','pet'],['le chien / la chienne','der Hund / die Hündin','dog'],['le chat / la chatte','der Kater / die Katze','cat'],['qui','der / die / das (Subjekt)','who, which'],['que','den / die / das (Objekt)','whom, which'],['promener','spazieren führen','to walk'],['garder','aufpassen auf','to look after'],['interdit / interdite','verboten','forbidden']],
 vocab:[['l’animal de compagnie (m.)','das Haustier'],['le chien','der Hund'],['le chat','die Katze'],['le lapin','das Kaninchen'],['le poisson','der Fisch'],['promener','spazieren führen'],['garder','aufpassen auf'],['adopter','adoptieren'],['interdit / interdite','verboten'],['allergique','allergisch'],['gentil / gentille','lieb, nett'],['le voisin / la voisine','der Nachbar / die Nachbarin']]
},
{
 id:9,
 phrases:[
  ['Mon plat préféré, c’est la ratatouille.','Mein Lieblingsgericht ist Ratatouille.'],
  ['Il faut des tomates, des courgettes et des oignons.','Man braucht Tomaten, Zucchini und Zwiebeln.'],
  ['Des tomates ? J’en prends un kilo.','Tomaten? Ich nehme ein Kilo davon.'],
  ['Du fromage ? Non merci, je n’en mange pas.','Käse? Nein danke, ich esse keinen.'],
  ['Tu veux de la salade ? Oui, j’en veux bien.','Möchtest du Salat? Ja, gern.'],
  ['On coupe les légumes en petits morceaux.','Man schneidet das Gemüse in kleine Stücke.'],
  ['Ça cuit pendant quarante minutes.','Das kocht vierzig Minuten lang.'],
  ['Je mange de la viande une fois par semaine.','Ich esse einmal pro Woche Fleisch.'],
  ['C’est un plat typique de ma région.','Das ist ein typisches Gericht meiner Region.'],
  ['C’est délicieux, mais un peu épicé.','Es ist köstlich, aber etwas scharf.']
 ],
 quiz:[
  ['Des tomates ? J’___ prends un kilo.',['en','les','y'],'Des tomates ? J’en prends un kilo.','En ersetzt eine Mengenangabe mit de: des tomates → en.'],
  ['Du fromage ? Je n’___ mange pas.',['en','le','y'],'Du fromage ? Non merci, je n’en mange pas.','Du / de la / des + Nomen → en, auch in der Verneinung: je n’en mange pas.'],
  ['Was bedeutet „Mon plat préféré“?',['mein Lieblingsgericht','mein Lieblingsteller','meine Lieblingsspeisekarte'],'Mon plat préféré, c’est la ratatouille.','Le plat = das Gericht; l’assiette = der Teller.'],
  ['Il faut ___ tomates.',['des','les','de les'],'Il faut des tomates, des courgettes et des oignons.','Für eine unbestimmte Menge steht der Teilungsartikel des. Les stünde für bestimmte Tomaten.','Im Rezept: Man braucht Tomaten.'],
  ['Was bedeutet „épicé“?',['scharf gewürzt','stark gesüßt','leicht gesalzen'],'C’est délicieux, mais un peu épicé.','Épicé = scharf / stark gewürzt; sucré = süß; salé = salzig.'],
  ['Tu veux de la salade ? — Oui, j’___ veux bien.',['en','la','lui'],'Oui, j’en veux bien.','De la salade → en.'],
  ['Was bedeutet „Ça cuit pendant quarante minutes“?',['Das kocht vierzig Minuten lang.','Das kostet vierzig Euro.','Das ist in vierzig Minuten fertig gegessen.'],'Ça cuit pendant quarante minutes.','Cuire = kochen, garen; pendant = während, lang.'],
  ['On coupe les légumes en petits ___.',['morceaux','morceau','morcels'],'On coupe les légumes en petits morceaux.','Le morceau → les morceaux (Plural auf -x).'],
  ['Wie oft? « une fois par semaine »',['einmal pro Woche','einmal am Tag','jede zweite Woche'],'Je mange de la viande une fois par semaine.','Une fois par semaine = einmal pro Woche.'],
  ['Des œufs ? J’en voudrais ___.',['six','les six','de six'],'Des œufs ? J’en voudrais six.','Mit en steht die Zahl allein am Ende: j’en voudrais six.']
 ],
 dialogue:['Quel est ton plat préféré ?','La ratatouille, c’est un plat de ma région.','Qu’est-ce qu’il faut ?','Des tomates, des courgettes, des aubergines et des oignons.','Tu mets de l’ail ?','Oui, j’en mets beaucoup. C’est délicieux !'],
 pron:['en / un','En [ɑ̃] und un [œ̃] / [ɛ̃] sind verschiedene Nasale. Bei j’en‿ai, n’en‿ai wird gebunden: [ʒɑ̃ne]. Sprich je n’en mange pas zusammenhängend: [ʒənɑ̃mɑ̃ʒpa].'],
 transfer:['Beschreibe dein Lieblingsgericht: Zutaten, Mengen, Zubereitung und wann du es isst.','Schreibe ein kurzes Rezept (Zutaten + drei Schritte) mit mindestens zwei Sätzen mit en.'],
 domains:['Mündliche Produktion','Mündliche Interaktion','Schriftliche Produktion'],
 app:{speak:'Mon plat préféré, c’est la quiche lorraine. Il faut des œufs, de la crème, du lard et une pâte. Des œufs, j’en mets trois. On mélange tout et ça cuit pendant trente minutes. Je la mange souvent le dimanche avec une salade. Et vous, quel est votre plat préféré ?',
  write:'Mon plat préféré, c’est la soupe de légumes.\nIl faut des carottes, des pommes de terre et un oignon.\nDes carottes ? J’en prends quatre.\nÇa cuit pendant vingt minutes.',
  placeholder:'Beschreibe dein Lieblingsgericht …',help:'Nenne Zutaten mit des / du / de la und ersetze eine Menge durch en.',
  hints:[['Il faut des / du / de la …','Man braucht …'],['J’en prends / mets …','Ich nehme / gebe … davon.'],['Ça cuit pendant …','Das kocht … lang.']]},
 goals:['Das Lieblingsgericht beschreiben, Zutaten und Mengen nennen.','Mengenangaben mit dem Pronomen en ersetzen.','Nach Essgewohnheiten fragen und antworten.'],
 units:[
  {title:'Das Pronomen en',rule:'En ersetzt ein Nomen mit du, de la, de l’, des oder de (Teilungsartikel, unbestimmte Menge): Tu veux du pain ? – Oui, j’en veux. Bei einer Zahl oder Menge bleibt diese am Satzende: Des œufs ? J’en prends six. / J’en prends un kilo. En steht vor dem Verb, in der Verneinung zwischen ne und Verb: je n’en mange pas.',
   pairs:[['Du pain ? J’en achète tous les jours.','Brot? Ich kaufe jeden Tag welches.'],['Des tomates ? J’en prends un kilo.','Tomaten? Ich nehme ein Kilo.'],['Des enfants ? J’en ai deux.','Kinder? Ich habe zwei.'],['De la viande ? Je n’en mange pas.','Fleisch? Ich esse keines.'],['Du sucre ? Il en met beaucoup.','Zucker? Er nimmt viel davon.']],
   emphasis:['en','du','de la','des','vor dem Verb','je n’en mange pas']},
  {title:'Rezepte und Essgewohnheiten',rule:'In Rezepten benutzt man oft on oder den Imperativ: On coupe les légumes. / Coupez les légumes. Zutaten nennst du mit il faut + Teilungsartikel. Häufigkeit: une fois par semaine, tous les jours, souvent, rarement, ne … jamais.',
   pairs:[['Il faut de la farine et du lait.','Man braucht Mehl und Milch.'],['On coupe les oignons.','Man schneidet die Zwiebeln.'],['Faites cuire pendant dix minutes.','Lassen Sie es zehn Minuten kochen.'],['Je mange du poisson une fois par semaine.','Ich esse einmal pro Woche Fisch.'],['Je ne mange jamais de viande.','Ich esse nie Fleisch.']],
   emphasis:['on','il faut','une fois par semaine','souvent','ne … jamais']}
 ],
 tasks:[
  [0,'Du pain ? J’___ achète tous les jours.','en',['le','y'],'Brot? Ich kaufe jeden Tag welches.','en'],
  [0,'Des tomates ? J’en prends un ___.','kilo',['litre','morceau'],'Tomaten? Ich nehme ein Kilo.','Menge'],
  [0,'De la viande ? Je n’___ mange pas.','en',['la','y'],'Fleisch? Ich esse keines.','en'],
  [0,'Des enfants ? Elle ___ a trois.','en',['les','y'],'Kinder? Sie hat drei.','en'],
  [0,'Du sucre ? Il en met ___.','beaucoup',['beaucoup de','très'],'Zucker? Er nimmt viel davon.','Menge','Mit en steht beaucoup allein.'],
  [1,'Il faut ___ farine.','de la',['du','des'],'Man braucht Mehl.','Teilungsartikel','La farine ist weiblich: de la farine.'],
  [1,'Il faut ___ lait.','du',['de la','des'],'Man braucht Milch.','Teilungsartikel'],
  [1,'On ___ les oignons. (couper)','coupe',['coupes','coupent'],'Man schneidet die Zwiebeln.','on'],
  [1,'Je ne mange jamais ___ viande.','de',['de la','la'],'Ich esse nie Fleisch.','Verneinung','Nach ne … jamais wird de la zu de.'],
  [1,'Je mange du poisson une fois ___ semaine.','par',['pour','à la'],'Ich esse einmal pro Woche Fisch.','Häufigkeit']
 ],
 check:[
  ['Am Markt: « Des pommes ? Combien ? » Du möchtest zwei Kilo.',['J’en voudrais deux kilos.','Je les voudrais deux kilos.','J’y voudrais deux kilos.'],'Des pommes → en; die Menge steht am Ende.','en','J’en voudrais deux kilos.'],
  ['« Du café ? Non merci, je n’en bois jamais le soir. » Was stimmt?',['Die Person trinkt abends nie Kaffee.','Die Person trinkt nur abends Kaffee.','Die Person trinkt abends wenig Kaffee.'],'Ne … jamais = nie; en = Kaffee.','jamais'],
  ['Dein Partner fragt in der Prüfung nach deinem Lieblingsgericht.',['Quel est ton plat préféré ?','Quelle est ta assiette préférée ?','Qu’est-ce que tu cuisines hier ?'],'Le plat préféré = das Lieblingsgericht.','question','Quel est ton plat préféré ?'],
  ['« Pour la soupe, il faut trois carottes et un oignon. » Wie viele Karotten braucht man?',['drei','eine','zwei'],'Trois carottes = drei Karotten.','quantite'],
  ['Du sagst, dass du einmal pro Woche Fleisch isst.',['Je mange de la viande une fois par semaine.','Je mange la viande une fois la semaine.','Je mange de viande une semaine par fois.'],'Teilungsartikel de la + une fois par semaine.','frequence','Je mange de la viande une fois par semaine.'],
  ['« Ça cuit pendant une heure à feu doux. » Wie lange kocht das Gericht?',['eine Stunde','eine halbe Stunde','zehn Minuten'],'Pendant une heure = eine Stunde lang.','cuire'],
  ['Du isst keinen Käse.',['Je ne mange pas de fromage.','Je ne mange pas du fromage.','Je ne mange pas des fromage.'],'Nach der Verneinung wird du zu de.','negation','Je ne mange pas de fromage.'],
  ['« C’est délicieux, mais trop épicé pour moi. » Was stört die Person?',['Es ist zu scharf.','Es ist zu salzig.','Es ist zu süß.'],'Épicé = scharf gewürzt.','gout']
 ],
 transfers:[
  ['en','Des fraises ? J’___ achète un kilo.','en','Erdbeeren? Du kaufst ein Kilo davon.'],
  ['en','Du thé ? Oui, j’___ veux bien.','en','Tee? Ja, gern.'],
  ['negation','Des œufs ? Je n’___ ai plus.','en','Eier? Du hast keine mehr.'],
  ['partitif','Il faut ___ crème. (Sahne)','de la','Man braucht Sahne.'],
  ['partitif','Je bois ___ eau.','de l’','Du trinkst Wasser.'],
  ['jamais','Je ne bois jamais ___ alcool.','d’','Du trinkst nie Alkohol.'],
  ['recette','On ___ le riz pendant dix minutes. (cuire)','cuit','Man kocht den Reis zehn Minuten.']
 ],
 comp:{voices:{A:'female',B:'male'},turns:[
  ['A','Pour la fête, tu fais ta salade de pâtes ?'],['B','Oui ! Il faut des pâtes, des tomates, du jambon et du fromage.'],
  ['A','Des pâtes, tu en as ?'],['B','Oui, j’en ai deux paquets. Mais je n’ai plus de tomates.'],
  ['A','Je peux en acheter. Combien ?'],['B','Un kilo, s’il te plaît. Et du basilic, si tu en trouves.'],
  ['A','D’accord. Et le jambon ?'],['B','Non, pas de jambon : Laura ne mange pas de viande. On met des olives.']],
  fields:[['Gericht',['Nudelsalat','Ratatouille','Suppe']],['Nudeln vorhanden',['zwei Packungen','eine Packung','keine']],['Fehlt',['Tomaten','Käse','Nudeln']],['Menge Tomaten',['1 Kilo','2 Kilo','500 Gramm']],['Kraut',['Basilikum','Petersilie','Thymian']],['Statt Schinken',['Oliven','Käse','Thunfisch']]]},
 intro:['Des tomates ? J’en prends un kilo.',['Des tomates ? J’en prends deux kilos.','Des pommes ? J’en prends un kilo.']],
 hard:{
  obj:[['en','Das Pronomen en'],['quantite','Mengen und Teilungsartikel'],['recette','Ein Rezept verstehen und erklären'],['comprendre','Ein Gespräch übers Essen verstehen']],
  text:'Mon plat préféré, c’est la ratatouille. C’est un {plat|Gericht|recette} typique du sud de la France. Il faut {des|Teilungsartikel, Plural|quantite} tomates, des courgettes, des aubergines et {de l’|Teilungsartikel vor Vokal|quantite}huile d’olive. Des tomates ? J’{en|Pronomen für eine Menge|en} prends un {kilo|Kilo|quantite}. De l’ail ? J’{en|Pronomen für eine Menge|en} mets beaucoup. D’abord, on {coupe|schneiden, on|recette} les légumes en petits {morceaux|Stücke|recette}. Ensuite, ça {cuit|kochen, ça|recette} pendant quarante minutes. Mon mari ne mange pas {de|kein (nach Verneinung)|quantite} viande, alors c’est parfait pour lui. Du pain ? Oui, il {en|Pronomen für eine Menge|en} faut avec la ratatouille ! Je fais ce plat une fois {par|pro|quantite} semaine en été. Des légumes, nous n’{en|Pronomen für eine Menge|en} achetons jamais au supermarché : nous allons au marché.',
  listen:[
   {text:'Pour la crêpe, il faut deux cent cinquante grammes de farine, quatre œufs, un demi-litre de lait et une pincée de sel. On mélange tout et on laisse reposer une heure.',voice:'female',
    q:[['Combien d’œufs faut-il ? Réponds en chiffres.','4',null,'quantite'],['Combien de lait faut-il ?','un demi-litre',['un demi-litre','un litre','deux litres'],'quantite'],['Combien de temps laisse-t-on reposer la pâte ?','une heure',['une heure','une demi-heure','dix minutes'],'recette']]},
   {turns:[['A','Tu manges souvent du poisson ?'],['B','Oui, j’en mange deux fois par semaine.'],['A','Et de la viande ?'],['B','Non, je n’en mange presque jamais.']],voices:{A:'male',B:'female'},
    q:[['Combien de fois par semaine mange-t-elle du poisson ? Réponds en chiffres.','2',null,'en'],['Est-ce qu’elle mange souvent de la viande ?','Non, presque jamais.',['Non, presque jamais.','Oui, tous les jours.','Oui, une fois par semaine.'],'en'],['Qu’est-ce qu’elle ne mange presque jamais ?','de la viande',['de la viande','du poisson','des légumes'],'en']]}
  ],
  writing:{situation:'Un ami français veut cuisiner un plat de ton pays. Écris-lui la recette.',points:['Dis quel plat c’est et pourquoi tu l’aimes.','Donne les ingrédients avec les quantités (utilise en au moins une fois).','Explique la préparation en trois étapes.'],
   model:'Salut Lucas,\nVoici la recette de ma soupe préférée, la soupe de pommes de terre ! Il faut un kilo de pommes de terre, deux oignons, du lard et un litre d’eau. Des oignons ? Prends-en des gros. D’abord, tu coupes les légumes. Ensuite, tu mets tout dans l’eau. Enfin, ça cuit pendant trente minutes. C’est simple et délicieux !\nBon appétit,\nJonas'}
 },
 words:[['le plat (préféré)','das (Lieblings-)Gericht','(favourite) dish'],['en','davon','some, of it'],['un kilo de','ein Kilo','a kilo of'],['le morceau','das Stück','piece'],['cuire','kochen, garen','to cook'],['épicé / épicée','scharf gewürzt','spicy'],['une fois par semaine','einmal pro Woche','once a week'],['la recette','das Rezept','recipe']],
 vocab:[['le plat','das Gericht'],['préféré / préférée','Lieblings-'],['la recette','das Rezept'],['la courgette','die Zucchini'],['l’oignon (m.)','die Zwiebel'],['l’ail (m.)','der Knoblauch'],['le morceau','das Stück'],['couper','schneiden'],['cuire','kochen, garen'],['épicé / épicée','scharf gewürzt'],['délicieux / délicieuse','köstlich'],['la viande','das Fleisch']]
},
{
 id:10,
 phrases:[
  ['Je suis très contente pour toi !','Ich freue mich sehr für dich!'],
  ['Quelle chance !','Was für ein Glück!'],
  ['Félicitations pour ton nouveau travail !','Herzlichen Glückwunsch zur neuen Arbeit!'],
  ['Il faut fêter ça ensemble.','Das müssen wir zusammen feiern.'],
  ['Je t’invite au restaurant samedi soir.','Ich lade dich am Samstagabend ins Restaurant ein.'],
  ['Dis-moi si ça te va.','Sag mir, ob dir das passt.'],
  ['Écris-moi de préférence par SMS.','Schreib mir am besten eine SMS.'],
  ['Moi aussi, j’ai quelque chose à te raconter.','Ich habe dir auch etwas zu erzählen.'],
  ['Quel beau cadeau !','Was für ein schönes Geschenk!'],
  ['Merci pour l’invitation, je viens avec plaisir.','Danke für die Einladung, ich komme gern.']
 ],
 quiz:[
  ['___ chance ! (Ausruf)',['Quelle','Quel','Quels'],'Quelle chance !','La chance ist weiblich → Quelle chance !'],
  ['___ beau cadeau !',['Quel','Quelle','Quelles'],'Quel beau cadeau !','Le cadeau ist männlich → Quel.'],
  ['Je t’invite ___ restaurant.',['au','à le','à la'],'Je t’invite au restaurant samedi soir.','À + le wird zu au.'],
  ['Was bedeutet „Il faut fêter ça ensemble“?',['Das müssen wir zusammen feiern.','Wir haben das schon gefeiert.','Das feiert man allein.'],'Il faut fêter ça ensemble.','Fêter = feiern; ensemble = zusammen.'],
  ['Was bedeutet „Dis-moi si ça te va“?',['Sag mir, ob dir das passt.','Sag mir, wie es dir geht.','Sag mir, wohin du gehst.'],'Dis-moi si ça te va.','Ça te va ? = Passt dir das? Ça va ? allein fragt nach dem Befinden.'],
  ['Wie gratulierst du zur neuen Arbeit?',['Félicitations pour ton nouveau travail !','Bon courage pour ton nouveau travail !','Désolé pour ton nouveau travail !'],'Félicitations pour ton nouveau travail !','Félicitations = herzlichen Glückwunsch. Bon courage wünscht Kraft für etwas Schweres, désolé bedauert etwas.'],
  ['Écris-moi de préférence ___ SMS.',['par','avec','en'],'Écris-moi de préférence par SMS.','Par SMS, par e-mail = per SMS, per E-Mail. De préférence = am besten.'],
  ['Was bedeutet „J’ai quelque chose à te raconter“?',['Ich habe dir etwas zu erzählen.','Ich muss dir etwas zeigen.','Ich habe etwas für dich gekauft.'],'Moi aussi, j’ai quelque chose à te raconter.','Raconter = erzählen; quelque chose = etwas.'],
  ['Du nimmst eine Einladung an. Was sagst du?',['Merci, je viens avec plaisir.','Merci, je suis désolé.','Merci, ce n’est pas possible.'],'Merci pour l’invitation, je viens avec plaisir.','Avec plaisir = gern.'],
  ['Je suis très ___ pour toi ! (Frau)',['contente','content','contents'],'Je suis très contente pour toi !','Eine Frau sagt contente; das Adjektiv richtet sich nach der Sprecherin.']
 ],
 dialogue:['J’ai réussi mon permis de conduire !','Félicitations ! Quelle bonne nouvelle !','Merci ! Je suis très contente.','Il faut fêter ça. Je t’invite au restaurant vendredi.','Avec plaisir ! À quelle heure ?','Vers vingt heures. Dis-moi si ça te va !'],
 pron:['quel / quelle','Quel, quelle, quels und quelles klingen alle gleich: [kɛl]. Den Unterschied siehst du nur in der Schrift. Ausrufe sprichst du mit fallender Melodie und Betonung am Ende: Quelle chance !'],
 transfer:['Reagiere auf eine gute Nachricht, gratuliere und lade jemanden zum Feiern ein (Ort, Tag, Uhrzeit).','Schreibe eine persönliche Einladung per E-Mail mit Anrede, Glückwunsch, Vorschlag und Grußformel.'],
 domains:['Schriftliche Produktion','Schriftliche Interaktion','Mündliche Interaktion'],
 app:{speak:'Tu as réussi ton examen ? Félicitations, quelle bonne nouvelle ! Il faut fêter ça ensemble. Je t’invite au restaurant vendredi soir, vers vingt heures. Dis-moi si ça te va. Écris-moi de préférence par SMS.',
  write:'Chère Léa,\nFélicitations pour ton examen ! Quelle bonne nouvelle !\nIl faut fêter ça : je t’invite au restaurant vendredi soir.\nDis-moi si ça te va.\nJe t’embrasse,\nAnna',
  placeholder:'Schreibe eine Einladung …',help:'Beginne mit Chère / Cher, gratuliere, lade ein und beende mit einer Grußformel.',
  hints:[['Félicitations pour …','Herzlichen Glückwunsch zu …'],['Je t’invite au / à la …','Ich lade dich ins / in die … ein.'],['Je t’embrasse / Bises','Liebe Grüße']]},
 goals:['Auf eine gute Nachricht reagieren und gratulieren.','Jemanden schriftlich und mündlich einladen und um Antwort bitten.','Ausrufe mit quel / quelle und Präpositionen wie au / à la richtig verwenden.'],
 units:[
  {title:'Ausrufe mit quel / quelle',rule:'Mit quel + Nomen drückst du Freude oder Überraschung aus. Quel richtet sich nach dem Nomen: quel (m. Sg.), quelle (f. Sg.), quels (m. Pl.), quelles (f. Pl.). Ein Adjektiv kann dazwischen stehen: Quel beau cadeau ! Ohne Nomen sagt man: C’est super ! / Génial !',
   pairs:[['Quelle chance !','Was für ein Glück!'],['Quel beau cadeau !','Was für ein schönes Geschenk!'],['Quelle bonne nouvelle !','Was für eine gute Nachricht!'],['Quels beaux enfants !','Was für schöne Kinder!'],['Quelles jolies fleurs !','Was für hübsche Blumen!']],
   emphasis:['quel','quelle','quels','quelles']},
  {title:'Einladen, annehmen, gratulieren',rule:'Einladen: inviter quelqu’un à + Ort / Anlass: je t’invite au restaurant, à mon anniversaire, à la piscine (à + le = au, à + les = aux). Gratulieren: Félicitations ! / Bravo ! Annehmen: avec plaisir, volontiers. Um Antwort bitten: Dis-moi si ça marche.',
   pairs:[['Je t’invite à mon anniversaire.','Ich lade dich zu meinem Geburtstag ein.'],['On va au cinéma ?','Gehen wir ins Kino?'],['Félicitations pour ton examen !','Glückwunsch zur Prüfung!'],['Avec plaisir !','Gern!'],['Réponds-moi avant jeudi.','Antworte mir bis Donnerstag.']],
   emphasis:['inviter','à + le = au','Félicitations','avec plaisir','volontiers']}
 ],
 tasks:[
  [0,'___ chance !','Quelle',['Quel','Quels'],'Was für ein Glück!','quel'],
  [0,'___ beau cadeau !','Quel',['Quelle','Quelles'],'Was für ein schönes Geschenk!','quel'],
  [0,'___ bonne nouvelle !','Quelle',['Quel','Quelles'],'Was für eine gute Nachricht!','quel'],
  [0,'___ jolies fleurs !','Quelles',['Quels','Quelle'],'Was für hübsche Blumen!','quel','Les fleurs ist weiblich Plural → Quelles.'],
  [0,'___ beaux enfants !','Quels',['Quelles','Quel'],'Was für schöne Kinder!','quel'],
  [1,'Je t’invite ___ restaurant.','au',['à la','aux'],'Ich lade dich ins Restaurant ein.','à + Artikel'],
  [1,'On va ___ piscine ?','à la',['au','aux'],'Gehen wir ins Schwimmbad?','à + Artikel'],
  [1,'Je vous invite ___ mon anniversaire.','à',['au','chez'],'Ich lade euch zu meinem Geburtstag ein.','à','Inviter à + Possessiv: à mon anniversaire. Au enthält schon le, chez steht nur vor Personen.'],
  [1,'___ pour ton examen !','Félicitations',['Désolé','Bon courage'],'Glückwunsch zur Prüfung!','gratulieren','Félicitations gratuliert. Bon courage wünscht Kraft vor der Prüfung, désolé bedauert.'],
  [1,'Merci, je viens avec ___ !','plaisir',['chance','surprise'],'Danke, ich komme gern!','annehmen']
 ],
 check:[
  ['Deine Freundin schreibt: « J’ai trouvé un appartement près du parc ! » Wie reagierst du?',['Quelle chance !','Quel dommage !','Bon courage !'],'Quelle chance = Was für ein Glück – passt zu einer guten Nachricht.','reaction','Quelle chance !'],
  ['« Je t’invite à la crêperie jeudi soir. Dis-moi si ça te va. » Was sollst du tun?',['antworten, ob dir der Termin passt','die Crêperie reservieren','am Donnerstag anrufen'],'Dis-moi si ça te va = sag mir, ob es dir passt.','repondre'],
  ['Du lädst einen Kollegen zu deinem Geburtstag ein.',['Je t’invite à mon anniversaire.','Je t’invite au mon anniversaire.','Je t’invite chez mon anniversaire.'],'Inviter à + Possessiv: à mon anniversaire.','inviter','Je t’invite à mon anniversaire.'],
  ['Welcher Ausruf ist richtig?',['Quelle belle surprise !','Quel belle surprise !','Quels belle surprise !'],'La surprise ist weiblich: Quelle belle surprise.','quel','Quelle belle surprise !'],
  ['« Écris-moi de préférence par SMS, je ne lis pas souvent mes e-mails. » Warum soll man eine SMS schicken?',['Die Person liest selten E-Mails.','Ihr Handy ist kaputt.','Eine SMS ist billiger.'],'Ne … pas souvent = nicht oft.','sms'],
  ['Du nimmst eine Einladung gern an.',['Merci, avec plaisir !','Merci, quel dommage !','Merci, ce n’est pas grave !'],'Avec plaisir = gern.','accepter','Merci, avec plaisir !'],
  ['« J’ai aussi quelque chose à te raconter, mais je te le dirai au restaurant. » Wann erfährst du es?',['im Restaurant','in der nächsten E-Mail','gleich am Telefon'],'Je te le dirai au restaurant = ich sage es dir im Restaurant.','surprise'],
  ['Du gratulierst zur bestandenen Prüfung.',['Félicitations pour ton examen !','Désolé pour ton examen !','Bon courage pour ton examen !'],'Félicitations = herzlichen Glückwunsch. Bon courage sagt man vor der Prüfung.','feliciter','Félicitations pour ton examen !']
 ],
 transfers:[
  ['quelle','___ bonne idée ! (Ausruf)','Quelle','Was für eine gute Idee!'],
  ['quel','___ temps magnifique ! (Ausruf)','Quel','Was für ein herrliches Wetter!'],
  ['quels','___ beaux souvenirs ! (Ausruf)','Quels','Was für schöne Erinnerungen!'],
  ['au','On se retrouve ___ café ? (à + le)','au','Treffen wir uns im Café?'],
  ['aux','Je t’invite ___ Jeux olympiques ! (à + les)','aux','Du lädst jemanden zu den Olympischen Spielen ein.'],
  ['feliciter','___ pour ton mariage ! (Glückwunsch)','Félicitations','Du gratulierst zur Hochzeit.'],
  ['fete','Il faut ___ ça ensemble ! (feiern)','fêter','Das müssen wir zusammen feiern.']
 ],
 comp:{voices:{A:'female',B:'female'},turns:[
  ['A','Allô Inès ? C’est Clara. J’ai une bonne nouvelle : j’ai réussi mon examen !'],['B','Bravo ! Félicitations ! Quelle bonne nouvelle !'],
  ['A','Merci ! Je fais une petite fête samedi. Tu viens ?'],['B','Avec plaisir ! C’est où ?'],
  ['A','Chez moi, à partir de dix-neuf heures.'],['B','Je peux apporter quelque chose ?'],
  ['A','Un dessert, si tu veux. Paul apporte les boissons.'],['B','D’accord, je ferai une tarte aux pommes.']],
  fields:[['Gute Nachricht',['bestandene Prüfung','neue Wohnung','neuer Job']],['Fest am',['Samstag','Sonntag','Freitag']],['Ort',['bei Clara','im Restaurant','bei Inès']],['Beginn',['ab 19 Uhr','ab 17 Uhr','ab 20 Uhr']],['Inès bringt',['einen Nachtisch','Getränke','einen Salat']],['Kuchen',['Apfelkuchen','Schokoladenkuchen','Erdbeertorte']]]},
 intro:['Je t’invite au restaurant samedi soir.',['Je t’invite au cinéma samedi soir.','Je t’invite au restaurant dimanche soir.']],
 hard:{
  obj:[['exclam','Ausrufe mit quel / quelle'],['inviter','Einladen und annehmen'],['lettre','Persönlicher Brief: Formeln'],['comprendre','Eine Einladung hörend verstehen']],
  text:'{Cher|Anrede, männlich|lettre} Mathis, ta mère m’a dit que tu as réussi ton bac. {Quelle|Ausruf, weiblich|exclam} bonne nouvelle ! {Félicitations|Glückwunsch|inviter} ! Je suis très {fière|stolz, weiblich|lettre} de toi. On va fêter ça {ensemble|zusammen|inviter} : je t’{invite|einladen, je|inviter} {à la|à + la|inviter} crêperie du port dimanche midi. Ta sœur viendra aussi. Dis-moi si ça te {va|passen (ça te …)|inviter}. Écris-moi de {préférence|am besten (de …)|lettre} par SMS, je ne regarde pas {souvent|oft|lettre} mes e-mails. {Quel|Ausruf, männlich|exclam} plaisir de te revoir bientôt ! J’ai aussi un petit {cadeau|Geschenk|lettre} pour toi. Je t’{embrasse|umarmen (Grußformel)|lettre}, ta tante Julie',
  listen:[
   {text:'Salut Tom, c’est Julie. Pour mon anniversaire, je t’invite à une soirée vendredi prochain, chez moi, à partir de vingt heures. Apporte quelque chose à boire si tu veux. Réponds-moi avant mercredi !',voice:'female',
    q:[['Pourquoi Julie fait-elle une soirée ?','pour son anniversaire',['pour son anniversaire','pour son nouveau travail','pour son examen'],'inviter'],['La soirée commence à quelle heure ? Réponds en chiffres.','20',null,'comprendre'],['Avant quel jour Tom doit-il répondre ?','avant mercredi',['avant mercredi','avant vendredi','avant lundi'],'inviter']]},
   {turns:[['A','Regarde, mon fiancé m’a offert cette bague !'],['B','Oh, quelle belle bague ! Félicitations !'],['A','Merci ! Nous nous marions en juin.'],['B','Quelle bonne nouvelle ! Il faut fêter ça.']],voices:{A:'female',B:'male'},
    q:[['Qu’est-ce que la femme a reçu ?','une bague',['une bague','une montre','des fleurs'],'comprendre'],['Quand se marient-ils ?','en juin',['en juin','en juillet','en janvier'],'comprendre'],['Que dit l’homme pour réagir ?','Quelle bonne nouvelle !',['Quelle bonne nouvelle !','Quel dommage !','Quelle surprise désagréable !'],'exclam']]}
  ],
  writing:{situation:'Ton ami Mathieu a trouvé un nouveau travail. Écris-lui un e-mail.',points:['Félicite-le et réagis à la nouvelle.','Invite-le à fêter ça (où, quand).','Demande-lui de répondre et dis comment te contacter.'],
   model:'Cher Mathieu,\nQuelle bonne nouvelle ! Félicitations pour ton nouveau travail ! Je suis très content pour toi. Il faut fêter ça : je t’invite au restaurant italien près de la gare, vendredi soir à vingt heures. Dis-moi si ça te va. Tu peux m’appeler ou m’écrire un SMS.\nÀ bientôt,\nDaniel'}
 },
 words:[['Quelle chance !','Was für ein Glück!','How lucky!'],['Félicitations !','Herzlichen Glückwunsch!','Congratulations!'],['fêter','feiern','to celebrate'],['inviter à / au','einladen zu / in','to invite to'],['ensemble','zusammen','together'],['ça te va ?','passt dir das?','does that suit you?'],['de préférence','am besten','preferably'],['avec plaisir','gern','with pleasure']],
 vocab:[['la chance','das Glück'],['les félicitations (f.)','die Glückwünsche'],['fêter','feiern'],['inviter','einladen'],['l’invitation (f.)','die Einladung'],['ensemble','zusammen'],['le cadeau','das Geschenk'],['le portable','das Handy'],['de préférence','am besten'],['l’anniversaire (m.)','der Geburtstag'],['heureux / heureuse','glücklich'],['enfin','endlich']]
},
{
 id:11,
 phrases:[
  ['Voici nos offres spéciales de la semaine.','Hier sind unsere Sonderangebote der Woche.'],
  ['Le kilo de pommes est à deux euros seulement.','Das Kilo Äpfel kostet nur zwei Euro.'],
  ['Le fromage est à dix-huit euros le kilo.','Der Käse kostet achtzehn Euro das Kilo.'],
  ['Au rayon fruits et légumes, les fraises sont en promotion.','In der Obst- und Gemüseabteilung sind die Erdbeeren im Angebot.'],
  ['Profitez de nos offres jusqu’à demain !','Nutzen Sie unsere Angebote bis morgen!'],
  ['Je ne prends qu’une bouteille d’eau.','Ich nehme nur eine Flasche Wasser.'],
  ['C’est combien, la pièce ?','Wie viel kostet das Stück?'],
  ['Deux paquets pour le prix d’un.','Zwei Packungen zum Preis von einer.'],
  ['Où se trouve le rayon boulangerie ?','Wo ist die Bäckereiabteilung?'],
  ['Vous payez à la caisse numéro trois.','Sie zahlen an Kasse drei.']
 ],
 quiz:[
  ['Was bedeutet „le kilo de pommes est à deux euros“?',['Ein Kilo Äpfel kostet zwei Euro.','Zwei Kilo Äpfel kosten einen Euro.','Die Äpfel wiegen zwei Kilo.'],'Le kilo de pommes est à deux euros seulement.','Être à + Preis: etwas kostet …'],
  ['Le fromage est à dix-huit euros ___ kilo.',['le','un','par le'],'Le fromage est à dix-huit euros le kilo.','Preis pro Einheit: … euros le kilo (auch: au kilo), … euros la pièce.'],
  ['Was ist „le rayon“ im Supermarkt?',['die Abteilung','die Kasse','der Einkaufswagen'],'Au rayon fruits et légumes…','Le rayon = die Abteilung, das Regal; la caisse = die Kasse.'],
  ['Was bedeutet „en promotion“?',['im Angebot','ausverkauft','neu im Sortiment'],'Les fraises sont en promotion.','En promotion / en promo = im Sonderangebot.'],
  ['Je ___ prends qu’une bouteille.',['ne','n’','pas'],'Je ne prends qu’une bouteille d’eau.','Ne … que = nur: Je ne prends qu’une bouteille.'],
  ['Was bedeutet „Je ne prends qu’une bouteille“?',['Ich nehme nur eine Flasche.','Ich nehme keine Flasche.','Ich nehme noch eine Flasche.'],'Je ne prends qu’une bouteille d’eau.','Ne … que ist keine Verneinung, sondern bedeutet „nur“.'],
  ['C’est combien, ___ pièce ?',['la','le','une'],'C’est combien, la pièce ?','Preis pro Stück: la pièce.'],
  ['Was bedeutet „deux paquets pour le prix d’un“?',['zwei Packungen zum Preis von einer','zwei Packungen für zwei Euro','eine Packung gratis ab drei'],'Deux paquets pour le prix d’un.','Le prix = der Preis.'],
  ['Profitez de nos offres ___ demain !',['jusqu’à','depuis','pendant'],'Profitez de nos offres jusqu’à demain !','Jusqu’à = bis.'],
  ['Wo bezahlst du?',['à la caisse','au rayon','à l’entrée'],'Vous payez à la caisse numéro trois.','Payer à la caisse = an der Kasse zahlen.']
 ],
 dialogue:['Excusez-moi, où se trouve le rayon fromages ?','Au fond du magasin, à gauche.','Et le camembert est en promotion ?','Oui, deux pour le prix d’un cette semaine.','Super ! Je n’en prends qu’un, quand même.','Vous payez à la caisse, à l’entrée.'],
 pron:['euros / un euro','Bei Zahlen + euros wird gebunden: deux‿euros [døzøʁo], trois‿euros [tʁwazøʁo], six‿euros [sizøʁo], dix‿euros [dizøʁo]. Neuf euros: [nœvøʁo]. In Durchsagen kommen Preise oft schnell – höre auf die Zahl direkt vor euros.'],
 transfer:['Spiele ein Gespräch im Supermarkt: nach einer Abteilung fragen, nach dem Angebot und dem Preis pro Kilo oder Stück.','Schreibe eine kurze Einkaufsliste mit Mengen und Preisen und einem Satz mit ne … que.'],
 domains:['Mündliche Rezeption','Schriftliche Rezeption','Mündliche Interaktion'],
 app:{speak:'Excusez-moi, où se trouve le rayon fruits et légumes ? Les tomates sont en promotion ? Le kilo est à combien ? Je ne prends qu’un kilo, s’il vous plaît. Et le fromage, c’est combien la pièce ?',
  write:'Liste de courses :\n1 kilo de tomates (5 € le kilo)\n2 paquets de pâtes (en promotion)\n6 œufs\nJe ne prends qu’une bouteille d’eau.',
  placeholder:'Schreibe deine Einkaufsliste …',help:'Nenne Mengen und Preise und benutze einmal ne … que.',
  hints:[['… est à … euros le kilo.','… kostet … Euro das Kilo.'],['… sont en promotion.','… sind im Angebot.'],['Je ne prends que …','Ich nehme nur …']]},
 goals:['Sonderangebote und Durchsagen im Supermarkt verstehen.','Preise pro Kilo oder Stück verstehen und vergleichen.','Mit ne … que und seulement „nur“ ausdrücken.'],
 units:[
  {title:'Preise pro Menge',rule:'Preis pro Einheit: être à + Preis + Artikel + Einheit: Les tomates sont à 3 € le kilo, les melons à 2 € la pièce. In Durchsagen steht oft: le kilo de tomates à 5 € seulement. Mengen: un kilo de, un litre de, une bouteille de, un paquet de – danach immer de ohne Artikel.',
   pairs:[['Les tomates sont à trois euros le kilo.','Die Tomaten kosten drei Euro das Kilo.'],['Le melon est à deux euros la pièce.','Die Melone kostet zwei Euro das Stück.'],['Un litre de lait, s’il vous plaît.','Einen Liter Milch, bitte.'],['Un paquet de café coûte quatre euros.','Eine Packung Kaffee kostet vier Euro.'],['Le saumon est à dix-huit euros le kilo.','Der Lachs kostet achtzehn Euro das Kilo.']],
   emphasis:['être à','le kilo','la pièce','un litre de','un paquet de']},
  {title:'nur: ne … que und seulement',rule:'„Nur“ heißt seulement oder ne … que. Bei ne … que steht ne vor dem Verb und que direkt vor dem, was eingeschränkt wird: Je ne prends qu’un kilo. Es ist keine Verneinung: Der Teilungsartikel bleibt (je ne bois que du thé). Seulement kann nach dem Verb oder am Ende stehen: à cinq euros seulement.',
   pairs:[['Je ne prends qu’un kilo.','Ich nehme nur ein Kilo.'],['Il n’y a que deux caisses ouvertes.','Es sind nur zwei Kassen offen.'],['Je ne bois que du thé.','Ich trinke nur Tee.'],['C’est à cinq euros seulement.','Es kostet nur fünf Euro.'],['Nous n’avons que dix minutes.','Wir haben nur zehn Minuten.']],
   emphasis:['seulement','ne … que','keine Verneinung','que']}
 ],
 tasks:[
  [0,'Les tomates sont ___ trois euros le kilo.','à',['de','pour'],'Die Tomaten kosten drei Euro das Kilo.','Preis'],
  [0,'Le melon est à deux euros ___ pièce.','la',['le','une'],'Die Melone kostet zwei Euro das Stück.','Preis'],
  [0,'Un litre ___ lait, s’il vous plaît.','de',['du','de la'],'Einen Liter Milch, bitte.','Menge','Nach einer Mengenangabe steht nur de.'],
  [0,'Un paquet ___ café coûte quatre euros.','de',['du','des'],'Eine Packung Kaffee kostet vier Euro.','Menge'],
  [0,'Le jambon est à quinze euros ___ kilo.','le',['du','un'],'Der Schinken kostet fünfzehn Euro das Kilo.','Preis','Preis pro Einheit mit bestimmtem Artikel: quinze euros le kilo (auch: au kilo).'],
  [1,'Je ___ prends qu’un kilo.','ne',['n’','pas'],'Ich nehme nur ein Kilo.','ne … que'],
  [1,'Il n’y a ___ deux caisses ouvertes.','que',['pas','plus'],'Es sind nur zwei Kassen offen.','ne … que'],
  [1,'Je ne bois que ___ thé.','du',['de','le'],'Ich trinke nur Tee.','ne … que','Ne … que ist keine Verneinung: du bleibt.'],
  [1,'C’est à cinq euros ___.','seulement',['que','environ'],'Es kostet nur fünf Euro.','seulement','Am Satzende steht für „nur“ seulement; que braucht ne davor, environ heißt ungefähr.'],
  [1,'Nous n’avons ___ dix minutes.','que',['pas','jamais'],'Wir haben nur zehn Minuten.','ne … que']
 ],
 check:[
  ['Durchsage: « Les poires à trois euros le kilo seulement ; le saumon à dix-huit euros le kilo. » Was kostet ein Kilo Birnen?',['3 €','18 €','13 €'],'Die 18 € gehören zum Lachs.','prix'],
  ['« Profitez de nos offres spéciales jusqu’à demain ! » Wie lange gelten die Angebote?',['bis morgen','ab morgen','eine Woche lang'],'Jusqu’à demain = bis morgen.','jusqua'],
  ['Du willst nur ein Baguette.',['Je ne prends qu’une baguette.','Je ne prends pas une baguette.','Je ne prends qu’un baguette.'],'Ne … que = nur.','neque','Je ne prends qu’une baguette.'],
  ['« Les yaourts : deux paquets pour le prix d’un ! » Wie viele Packungen bezahlst du, wenn du zwei nimmst?',['eine','zwei','keine'],'Pour le prix d’un = zum Preis von einer.','offre'],
  ['Du suchst Käse im Supermarkt.',['Excusez-moi, où est le rayon fromages ?','Excusez-moi, où est la caisse fromages ?','Excusez-moi, combien est le rayon fromages ?'],'Le rayon = die Abteilung.','rayon','Excusez-moi, où est le rayon fromages ?'],
  ['« Il n’y a que deux caisses ouvertes. » Was bedeutet das?',['Es sind nur zwei Kassen offen.','Zwei Kassen sind geschlossen.','Es gibt keine offene Kasse.'],'Ne … que = nur, keine Verneinung.','sens'],
  ['Du fragst nach dem Preis pro Stück.',['C’est combien, la pièce ?','C’est combien de pièces ?','C’est quelle pièce ?'],'La pièce = das Stück.','piece','C’est combien, la pièce ?'],
  ['« Les fraises sont en promotion au rayon fruits et légumes. » Was stimmt?',['Erdbeeren sind im Angebot.','Erdbeeren sind ausverkauft.','Erdbeeren gibt es an der Kasse.'],'En promotion = im Angebot.','promo']
 ],
 transfers:[
  ['prix','Les pommes sont ___ deux euros le kilo.','à','Die Äpfel kosten zwei Euro das Kilo.'],
  ['unite','Les avocats sont à un euro ___ pièce.','la','Die Avocados kosten einen Euro das Stück.'],
  ['quantite','Je voudrais une bouteille ___ jus d’orange.','de','Du möchtest eine Flasche Orangensaft.'],
  ['neque','Je n’ai ___ dix euros sur moi.','que','Du hast nur zehn Euro dabei.'],
  ['neque','Elle ___ mange que des légumes.','ne','Sie isst nur Gemüse.'],
  ['seulement','Le pain est à un euro ___. (nur)','seulement','Das Brot kostet nur einen Euro.'],
  ['jusqua','L’offre est valable ___ samedi.','jusqu’à','Das Angebot gilt bis Samstag.']
 ],
 comp:{voices:{A:'male',B:'female'},turns:[
  ['A','Chers clients, bonjour ! Voici nos offres de la semaine.'],['A','Au rayon boucherie, le poulet est à huit euros le kilo.'],
  ['A','Au rayon fruits, les oranges sont à deux euros cinquante le kilo.'],['A','Et à la boulangerie : trois croissants pour deux euros seulement.'],
  ['B','Excusez-moi, l’offre sur les croissants, c’est jusqu’à quand ?'],['A','Jusqu’à dimanche, madame.'],
  ['B','Et il n’y a qu’une caisse ouverte ?'],['A','Non, la caisse numéro quatre ouvre maintenant.']],
  fields:[['Hähnchen pro Kilo',['8 €','18 €','4 €']],['Orangen pro Kilo',['2,50 €','5,20 €','2 €']],['Croissant-Angebot',['3 für 2 €','2 für 3 €','3 für 3 €']],['Angebot gilt bis',['Sonntag','Samstag','morgen']],['Problem der Kundin',['nur eine Kasse offen','Croissants ausverkauft','Preis falsch']],['Neue Kasse',['Nummer 4','Nummer 3','Nummer 14']]]},
 intro:['Le kilo de pommes est à deux euros seulement.',['Le kilo de pommes est à douze euros seulement.','Le kilo de poires est à deux euros seulement.']],
 hard:{
  obj:[['prix','Preise pro Einheit'],['quantite','Mengen mit de'],['neque','ne … que und seulement'],['comprendre','Durchsagen im Geschäft verstehen']],
  text:'Bonjour à tous ! Découvrez nos offres {spéciales|besondere, Plural f.|prix} du week-end. Au {rayon|Abteilung|prix} fruits, les pêches sont {à|kosten (être …)|prix} trois euros le kilo seulement. Les ananas sont à deux euros la {pièce|Stück|prix}. À la fromagerie, le comté est à vingt euros le {kilo|Kilo|prix}. Les yaourts sont en {promotion|Angebot|prix} : deux paquets {pour|zum (Preis)|prix} le prix d’un. Une bouteille {d’|Menge vor Vokal|quantite}huile d’olive coûte six euros. Un litre {de|Menge|quantite} lait : un euro. Attention : il n’y a {que|nur (ne …)|neque} cent bouteilles. Ce n’est {que|nur (ne …)|neque} pour aujourd’hui ! L’offre est valable {jusqu’à|bis|prix} lundi. Vous payez à la {caisse|Kasse|prix}. Le café est à trois euros {seulement|nur (am Ende)|neque} !',
  listen:[
   {text:'Chers clients, notre magasin fermera dans quinze minutes. Merci de vous diriger vers les caisses. La caisse numéro deux est réservée aux petits achats, moins de dix articles.',voice:'male',
    q:[['Le magasin ferme dans combien de minutes ? Réponds en chiffres.','15',null,'comprendre'],['Où faut-il aller ?','vers les caisses',['vers les caisses','vers la sortie de secours','au rayon boulangerie'],'comprendre'],['La caisse numéro deux est pour qui ?','pour moins de dix articles',['pour moins de dix articles','pour plus de dix articles','pour les familles'],'neque']]},
   {turns:[['A','Les fraises sont à combien ?'],['B','Quatre euros la barquette, mais deux barquettes pour sept euros.'],['A','Je n’en prends qu’une.'],['B','Alors ça fait quatre euros.']],voices:{A:'female',B:'male'},
    q:[['Combien coûte une barquette ? Réponds en chiffres.','4',null,'prix'],['Combien coûtent deux barquettes ?','sept euros',['sept euros','huit euros','six euros'],'prix'],['Combien de barquettes la femme prend-elle ?','une seule',['une seule','deux','trois'],'neque']]}
  ],
  writing:{situation:'Tu fais les courses pour un ami français qui est malade. Écris-lui un message.',points:['Dis ce que tu as trouvé en promotion et à quel prix.','Dis ce que tu n’as pas trouvé ou ce que tu n’as pris qu’en petite quantité.','Demande-lui s’il a besoin d’autre chose.'],
   model:'Salut Karim,\nJe suis au supermarché. Les oranges sont en promotion : deux euros le kilo, alors j’en prends deux kilos. Le jus de fruits est à un euro cinquante la bouteille. Il n’y a plus de pain complet, je ne prends qu’une baguette. Tu as besoin d’autre chose ? Réponds-moi vite, je passe à la caisse dans dix minutes.\nLéo'}
 },
 words:[['l’offre spéciale (f.)','das Sonderangebot','special offer'],['le rayon','die Abteilung','department, aisle'],['en promotion','im Angebot','on special offer'],['… euros le kilo','… Euro das Kilo','… euros a kilo'],['la pièce','das Stück','piece'],['ne … que','nur','only'],['seulement','nur','only'],['la caisse','die Kasse','checkout']],
 vocab:[['l’offre (f.)','das Angebot'],['spécial / spéciale','besonders, Sonder-'],['le rayon','die Abteilung'],['la promotion','das Sonderangebot'],['la caisse','die Kasse'],['le prix','der Preis'],['le paquet','die Packung'],['la bouteille','die Flasche'],['le jambon','der Schinken'],['seulement','nur'],['profiter de','nutzen, genießen'],['le client / la cliente','der Kunde / die Kundin']]
},
{
 id:12,
 phrases:[
  ['Allô Camille ? C’est Romain.','Hallo Camille? Hier ist Romain.'],
  ['Je suis désolé, mais je ne pourrai pas venir demain.','Es tut mir leid, aber ich kann morgen nicht kommen.'],
  ['J’ai mal à la gorge et de la fièvre.','Ich habe Halsschmerzen und Fieber.'],
  ['Je ne me sens pas bien.','Ich fühle mich nicht gut.'],
  ['Je t’appelle dès que ça va mieux.','Ich rufe dich an, sobald es mir besser geht.'],
  ['Dis bonjour à tout le monde !','Grüß alle von mir!'],
  ['Excuse-moi pour le retard.','Entschuldige die Verspätung.'],
  ['Je dois annuler notre rendez-vous.','Ich muss unseren Termin absagen.'],
  ['On peut le reporter à jeudi ?','Können wir ihn auf Donnerstag verschieben?'],
  ['Ce n’est pas grave.','Das ist nicht schlimm.']
 ],
 quiz:[
  ['Nous ne ___ pas venir samedi. (pouvoir, Futur)',['pourrons','pouvrons','pouvons'],'Nous ne pourrons pas venir samedi.','Pouvoir hat den Futurstamm pourr-: nous pourrons. Pouvons ist Präsens.'],
  ['Was bedeutet „J’ai mal à la gorge“?',['Ich habe Halsschmerzen.','Ich habe Kopfschmerzen.','Ich habe Bauchschmerzen.'],'J’ai mal à la gorge et de la fièvre.','La gorge = der Hals; la tête = der Kopf; le ventre = der Bauch.'],
  ['Wie entschuldigst du dich höflich?',['Je suis désolé.','Je suis excusé.','C’est dommage.'],'Je suis désolé, mais…','Je suis désolé(e) = es tut mir leid. Je suis excusé heißt „ich bin entschuldigt“, c’est dommage „schade“.'],
  ['Was bedeutet „annuler“?',['absagen','verschieben','bestätigen'],'Je dois annuler notre rendez-vous.','Annuler = absagen; reporter = verschieben.'],
  ['On peut le ___ à jeudi ? (verschieben)',['reporter','annuler','rappeler'],'On peut le reporter à jeudi ?','Reporter à = verschieben auf.'],
  ['Was antwortest du auf eine Entschuldigung, wenn es kein Problem ist?',['Ce n’est pas grave.','Ce n’est pas possible.','Ce n’est pas vrai.'],'Ce n’est pas grave.','Ce n’est pas grave = das ist nicht schlimm.'],
  ['Je ne viens pas ___ je suis malade.',['parce que','pourtant','donc'],'Je ne viens pas parce que je suis malade.','Parce que leitet einen Grund ein.'],
  ['Was bedeutet „Je ne me sens pas bien“?',['Ich fühle mich nicht gut.','Ich höre nicht gut.','Ich rieche nichts.'],'Je ne me sens pas bien.','Se sentir bien / mal = sich gut / schlecht fühlen.'],
  ['Excuse-moi ___ le retard.',['pour','de','avec'],'Excuse-moi pour le retard.','Excuser pour + Nomen: pour le retard. De steht nur vor einem Infinitiv: excuse-moi d’être en retard.'],
  ['Was bedeutet „Dis bonjour à tout le monde !“ am Ende einer Nachricht?',['Grüß alle von mir!','Sag allen guten Tag, wenn du kommst!','Alle grüßen dich.'],'Dis bonjour à tout le monde !','Dire bonjour à quelqu’un = jemanden grüßen.']
 ],
 dialogue:['Allô Camille ? C’est Romain.','Salut Romain ! Tu viens demain ?','Je suis désolé, je ne pourrai pas venir. J’ai de la fièvre.','Oh, dommage ! Ce n’est pas grave. Soigne-toi bien.','Merci. On peut reporter à la semaine prochaine ?','Bien sûr. Je t’appelle lundi.'],
 pron:['désolé / désolée','Désolé und désolée klingen gleich. Sprich je ne pourrai pas venir zusammenhängend: [ʒənpuʁepavəniʁ]. Bei pourrai hört man das doppelte r nicht länger.'],
 transfer:['Sage am Telefon eine Verabredung ab: entschuldige dich, nenne einen Grund und schlage einen neuen Termin vor.','Schreibe eine kurze Absage-Nachricht (ca. 40 Wörter) mit Entschuldigung, Grund und neuem Vorschlag.'],
 domains:['Mündliche Rezeption','Schriftliche Produktion','Mündliche Interaktion'],
 app:{speak:'Allô Camille ? C’est Romain. Je suis désolé, mais je ne pourrai pas venir à notre dîner demain. J’ai mal à la gorge et de la fièvre. Est-ce qu’on peut reporter à jeudi prochain ? Je t’appelle dès que ça va mieux. Dis bonjour à tout le monde !',
  write:'Chère Camille,\nJe suis désolé, mais je ne pourrai pas venir demain.\nJ’ai de la fièvre.\nOn peut reporter à jeudi prochain ?\nBises,\nRomain',
  placeholder:'Schreibe eine Absage …',help:'Entschuldige dich, nenne einen Grund mit parce que oder car und schlage einen neuen Termin vor.',
  hints:[['Je suis désolé(e), mais je ne pourrai pas …','Es tut mir leid, aber ich kann nicht …'],['… parce que / car …','… weil / denn …'],['On peut reporter à … ?','Können wir auf … verschieben?']]},
 goals:['Eine Nachricht auf dem Anrufbeantworter verstehen.','Absagen, sich entschuldigen und einen Grund nennen.','Einen Termin verschieben und auf Entschuldigungen reagieren.'],
 units:[
  {title:'Absagen mit Futur und Begründung',rule:'Für eine Absage in der Zukunft passt das futur simple: je ne pourrai pas venir, je ne serai pas là. Den Grund nennst du mit parce que oder car (denn): parce que je suis malade. Höflich beginnt man mit je suis désolé(e) oder excuse-moi / excusez-moi.',
   pairs:[['Je ne pourrai pas venir ce soir.','Ich kann heute Abend nicht kommen.'],['Je ne serai pas là samedi.','Ich bin am Samstag nicht da.'],['Je suis désolé, j’ai trop de travail.','Tut mir leid, ich habe zu viel Arbeit.'],['Je reste à la maison parce que je suis malade.','Ich bleibe zu Hause, weil ich krank bin.'],['Je ne viens pas, car mon fils est malade.','Ich komme nicht, denn mein Sohn ist krank.']],
   emphasis:['futur simple','je ne pourrai pas','parce que','car','je suis désolé(e)']},
  {title:'Verschieben und reagieren',rule:'Annuler heißt absagen, reporter à verschieben auf: On peut reporter à jeudi ? Auf eine Entschuldigung reagierst du mit ce n’est pas grave (nicht schlimm), pas de problème oder dommage ! (schade). Gute Besserung wünschst du mit soigne-toi bien oder bon rétablissement.',
   pairs:[['Je dois annuler le rendez-vous.','Ich muss den Termin absagen.'],['On peut reporter à demain ?','Können wir auf morgen verschieben?'],['Ce n’est pas grave.','Das ist nicht schlimm.'],['Dommage !','Schade!'],['Soigne-toi bien !','Gute Besserung!']],
   emphasis:['annuler','reporter à','ce n’est pas grave','dommage','soigne-toi bien']}
 ],
 tasks:[
  [0,'Je ne ___ pas venir ce soir. (pouvoir, Futur)','pourrai',['pouvrai','pourrais'],'Ich kann heute Abend nicht kommen.','futur'],
  [0,'Je ne ___ pas là samedi. (être, Futur)','serai',['suis','serais'],'Ich bin am Samstag nicht da.','futur'],
  [0,'Je reste à la maison ___ je suis malade.','parce que',['pourtant','mais'],'Ich bleibe zu Hause, weil ich krank bin.','Grund'],
  [0,'Je ne viens pas, ___ mon fils est malade. (denn)','car',['donc','mais'],'Ich komme nicht, denn mein Sohn ist krank.','Grund'],
  [0,'Je suis ___, j’ai trop de travail.','désolé',['dommage','grave'],'Tut mir leid, ich habe zu viel Arbeit.','Entschuldigung'],
  [1,'Je dois ___ le rendez-vous. (absagen)','annuler',['reporter','rappeler'],'Ich muss den Termin absagen.','Termin'],
  [1,'On peut ___ à demain ? (verschieben)','reporter',['annuler','arriver'],'Können wir auf morgen verschieben?','Termin'],
  [1,'Ce n’est pas ___. (nicht schlimm)','grave',['dommage','désolé'],'Das ist nicht schlimm.','reagieren'],
  [1,'___ ! Je voulais te voir. (schade)','Dommage',['Bravo','Volontiers'],'Schade! Ich wollte dich sehen.','reagieren'],
  [1,'Soigne-___ bien !','toi',['te','moi'],'Gute Besserung!','reagieren','Imperativ mit reflexivem Verb: soigne-toi.']
 ],
 check:[
  ['Anrufbeantworter: « Désolé, je ne pourrai pas venir au cours de yoga jeudi. Je dois travailler tard. » Was stimmt?',['Die Person kommt am Donnerstag nicht.','Die Person kommt etwas später.','Die Person kommt am Donnerstag früher.'],'Je ne pourrai pas venir = ich kann nicht kommen.','absence'],
  ['Warum kommt sie nicht? « J’ai de la fièvre et mal à la tête. »',['Sie ist krank.','Sie hat keine Zeit.','Sie hat den Bus verpasst.'],'De la fièvre = Fieber; mal à la tête = Kopfschmerzen.','raison'],
  ['Du willst den Termin auf Freitag verschieben.',['On peut reporter le rendez-vous à vendredi ?','On peut annuler le rendez-vous à vendredi ?','On peut rappeler le rendez-vous vendredi ?'],'Reporter à = verschieben auf.','reporter','On peut reporter le rendez-vous à vendredi ?'],
  ['Ein Freund entschuldigt sich, dass er fünf Minuten zu spät ist. Du reagierst freundlich.',['Ce n’est pas grave.','C’est très grave.','Ce n’est pas possible.'],'Ce n’est pas grave = nicht schlimm.','reagir','Ce n’est pas grave.'],
  ['Du sagst ab, weil du arbeiten musst.',['Je ne pourrai pas venir parce que je dois travailler.','Je ne pourrai pas venir pour je dois travailler.','Je ne pourrai pas venir donc je dois travailler.'],'Parce que leitet den Grund ein.','parceque','Je ne pourrai pas venir parce que je dois travailler.'],
  ['« Je te rappelle la semaine prochaine. » Wann ruft die Person an?',['nächste Woche','heute Abend','letzte Woche'],'La semaine prochaine = nächste Woche.','rappeler'],
  ['Deine Freundin ist krank. Was wünschst du ihr?',['Soigne-toi bien !','Bonne fête !','Bon voyage !'],'Soigne-toi bien = gute Besserung. Bonne fête wünscht man zum Fest, bon voyage vor einer Reise.','souhait','Soigne-toi bien !'],
  ['Welche Form ist richtig? « Nous ne ___ pas là dimanche. »',['serons','sommes été','serions'],'Être im futur simple: nous serons.','futur','Nous ne serons pas là dimanche.']
 ],
 transfers:[
  ['pouvoir','Je ne ___ pas venir demain. (pouvoir, Futur)','pourrai','Du kannst morgen nicht kommen.'],
  ['etre','Nous ne ___ pas là ce week-end. (être, Futur)','serons','Ihr seid dieses Wochenende nicht da.'],
  ['parceque','Je reste au lit ___ j’ai de la fièvre. (weil)','parce que','Du bleibst im Bett, weil du Fieber hast.'],
  ['car','Il n’est pas venu, ___ il était malade. (denn)','car','Er ist nicht gekommen, denn er war krank.'],
  ['reporter','On peut ___ le cours à mardi ? (verschieben)','reporter','Kann man den Kurs auf Dienstag verschieben?'],
  ['annuler','Je dois ___ ma réservation. (absagen)','annuler','Du musst deine Reservierung stornieren.'],
  ['desole','Je suis ___, je suis en retard. (Frau)','désolée','Eine Frau entschuldigt sich für die Verspätung.']
 ],
 comp:{voices:{A:'male',B:'female'},turns:[
  ['A','Bonjour, ici Marc Lambert. Je vous appelle pour notre rendez-vous de demain à dix heures.'],['A','Je suis désolé, mais je ne pourrai pas venir : mon fils est malade.'],
  ['A','Est-ce qu’on peut reporter le rendez-vous à vendredi matin ?'],['A','Rappelez-moi, s’il vous plaît, au 06 33 42 18 90. Merci et bonne journée.'],
  ['B','Allô, monsieur Lambert ? Ici Sophie Roux. J’ai eu votre message.'],['B','Ce n’est pas grave. Vendredi, c’est possible à neuf heures trente.'],
  ['A','Parfait, merci beaucoup !'],['B','De rien. J’espère que votre fils ira mieux. À vendredi !']],
  fields:[['Ursprünglicher Termin',['morgen 10 Uhr','heute 10 Uhr','morgen 9 Uhr']],['Grund der Absage',['der Sohn ist krank','er ist krank','er hat einen anderen Termin']],['Gewünschter Tag',['Freitagvormittag','Donnerstag','Samstag']],['Neue Uhrzeit',['9:30 Uhr','10 Uhr','9 Uhr']],['Reaktion von Frau Roux',['nicht schlimm','schade','unmöglich']],['Wünscht',['Besserung für den Sohn','eine gute Reise','viel Erfolg']]]},
 intro:['Je suis désolé, mais je ne pourrai pas venir demain.',['Je suis désolé, mais je ne pourrai pas venir ce soir.','Je suis désolé, mais je pourrai venir demain.']],
 hard:{
  obj:[['excuse','Sich entschuldigen und absagen'],['futur','Absage im futur simple'],['raison','Einen Grund nennen'],['comprendre','Eine Nachricht auf dem Anrufbeantworter verstehen']],
  text:'Bonjour Madame Morel, c’est Élodie Petit. Je suis {désolée|Entschuldigung, weiblich|excuse}, mais je ne {pourrai|pouvoir, Futur, je|futur} pas venir au cours de piano mercredi. J’ai {attrapé|sich holen, Partizip|raison} la grippe et j’ai mal à la {gorge|Hals|raison}. Je ne me sens pas bien du {tout|überhaupt (pas du …)|raison}. Le médecin m’a dit de me {reposer|sich ausruhen|raison}. Je ne {serai|être, Futur, je|futur} pas au bureau demain non plus, {car|denn|raison} j’ai de la fièvre. Est-ce qu’on peut {reporter|verschieben|excuse} le cours à la semaine prochaine ? Je vous {rappelle|zurückrufen, je|excuse} lundi. Ma fille non plus ne {pourra|pouvoir, Futur, elle|futur} pas venir. Ce n’est pas {grave|schlimm|excuse}, j’espère ! Merci et bonne journée. Je dis bonjour {aux|an die (à + les)|excuse} autres élèves. Je reste à la maison {parce que|weil|raison} je dois guérir.',
  listen:[
   {text:'Bonjour, c’est Nicolas. Je suis désolé, je serai en retard ce soir. Mon train a une heure de retard. Commencez à manger sans moi. J’arriverai vers neuf heures.',voice:'male',
    q:[['Pourquoi Nicolas sera-t-il en retard ?','Son train a du retard.',['Son train a du retard.','Il est malade.','Il travaille tard.'],'raison'],['Combien de retard a le train ?','une heure',['une heure','une demi-heure','deux heures'],'comprendre'],['Vers quelle heure arrivera-t-il ? Réponds en chiffres.',['9','21'],null,'futur']]},
   {turns:[['A','Excuse-moi, je ne pourrai pas venir au match samedi.'],['B','Ah, dommage ! Pourquoi ?'],['A','Parce que ma grand-mère fête ses quatre-vingts ans.'],['B','Ce n’est pas grave. On ira au prochain match ensemble.']],voices:{A:'female',B:'male'},
    q:[['Qu’est-ce qu’elle annule ?','le match de samedi',['le match de samedi','le cinéma de samedi','le dîner de dimanche'],'excuse'],['Pourquoi ne peut-elle pas venir ?','Sa grand-mère a son anniversaire.',['Sa grand-mère a son anniversaire.','Sa grand-mère est malade.','Elle doit travailler.'],'raison'],['Comment réagit l’homme ?','Ce n’est pas grave.',['Ce n’est pas grave.','Il est fâché.','Il annule aussi.'],'excuse']]}
  ],
  writing:{situation:'Tu ne peux pas aller au rendez-vous avec ta professeure de français. Écris-lui un e-mail.',points:['Excuse-toi et dis que tu ne pourras pas venir.','Explique pourquoi.','Propose un autre jour et une autre heure.'],
   model:'Chère Madame Dupuis,\nJe suis désolée, mais je ne pourrai pas venir à notre rendez-vous de mercredi. Je dois aller chez le médecin parce que ma fille est malade. Est-ce qu’on peut reporter le rendez-vous à vendredi, à quinze heures ? Si ce n’est pas possible, je peux aussi venir lundi matin.\nBien cordialement,\nEva Schneider'}
 },
 words:[['je suis désolé(e)','es tut mir leid','I’m sorry'],['je ne pourrai pas','ich werde nicht können','I won’t be able to'],['la fièvre','das Fieber','fever'],['annuler','absagen','to cancel'],['reporter à','verschieben auf','to postpone to'],['parce que / car','weil / denn','because'],['ce n’est pas grave','das ist nicht schlimm','it doesn’t matter'],['dommage','schade','what a pity']],
 vocab:[['désolé / désolée','es tut mir leid'],['le rhume','die Erkältung'],['attraper','sich holen, fangen'],['annuler','absagen'],['reporter','verschieben'],['le retard','die Verspätung'],['grave','schlimm'],['la fièvre','das Fieber'],['se reposer','sich ausruhen'],['car','denn'],['le copain / la copine','der Freund / die Freundin'],['la fête','das Fest']]
}
];
