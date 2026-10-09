/* Ten distinct, contextualised questions per German grammar drill. */
(() => {
  'use strict';
  const topics={};
  const gap=(sentence,answer,wrong,context='')=>({q:`${context?`« ${context} » — `:''}Complète : ${sentence}`,o:[answer,...wrong],a:0,audio:sentence.replace('___',answer)});
  const add=(title,setId,tasks)=>{topics[title]={setId,tasks:tasks.slice(0,10).map((q,i)=>{const shift=i%q.o.length,o=[...q.o.slice(shift),...q.o.slice(0,shift)];return {...q,o,a:o.indexOf(q.o[q.a])};})};};
  const persons=['Ich','Du','Er','Wir','Ihr','Sie'];
  const personContext=['Je','Tu','Il','Nous','Vous (plusieurs personnes, informel)','Ils'];
  function conjugation(title,verbs){
    const tasks=[];
    for(const {forms,ends,meaning} of verbs)for(let i=0;i<6;i++){
      const wrong=[...new Set(forms)].filter(f=>f!==forms[i]).slice(0,2);
      tasks.push(gap(`${persons[i]} ___ ${ends[i]}.`,forms[i],wrong,`${personContext[i]} ${meaning[i]}`));
    }
    add(title,'g1',tasks);
  }
  conjugation('sein – conjugaison',[
    {forms:['bin','bist','ist','sind','seid','sind'],ends:Array(6).fill('zu Hause'),meaning:['suis à la maison','es à la maison','est à la maison','sommes à la maison','êtes à la maison','sont à la maison']},
    {forms:['bin','bist','ist','sind','seid','sind'],ends:Array(6).fill('heute im Museum'),meaning:['suis au musée aujourd’hui','es au musée aujourd’hui','est au musée aujourd’hui','sommes au musée aujourd’hui','êtes au musée aujourd’hui','sont au musée aujourd’hui']}
  ]);
  conjugation('haben – conjugaison',[
    {forms:['habe','hast','hat','haben','habt','haben'],ends:Array(6).fill('Zeit'),meaning:['ai du temps','as du temps','a du temps','avons du temps','avez du temps','ont du temps']},
    {forms:['habe','hast','hat','haben','habt','haben'],ends:Array(6).fill('heute frei'),meaning:['suis en congé aujourd’hui','es en congé aujourd’hui','est en congé aujourd’hui','sommes en congé aujourd’hui','êtes en congé aujourd’hui','sont en congé aujourd’hui']}
  ]);
  conjugation('Verbes réguliers au présent',[
    {forms:['wohne','wohnst','wohnt','wohnen','wohnt','wohnen'],ends:Array(6).fill('in Berlin'),meaning:['habite à Berlin','habites à Berlin','habite à Berlin','habitons à Berlin','habitez à Berlin','habitent à Berlin']},
    {forms:['arbeite','arbeitest','arbeitet','arbeiten','arbeitet','arbeiten'],ends:Array(6).fill('heute'),meaning:['travaille aujourd’hui','travailles aujourd’hui','travaille aujourd’hui','travaillons aujourd’hui','travaillez aujourd’hui','travaillent aujourd’hui']}
  ]);
  conjugation('heißen et sprechen – conjugaison',[
    {forms:['heiße','heißt','heißt','heißen','heißt','heißen'],ends:['Anna','Paul','Tom','Müller','Schmidt','Weber'],meaning:['m’appelle Anna','t’appelles Paul','s’appelle Tom','nous appelons Müller','vous appelez Schmidt','s’appellent Weber']},
    {forms:['spreche','sprichst','spricht','sprechen','sprecht','sprechen'],ends:Array(6).fill('Deutsch'),meaning:['parle allemand','parles allemand','parle allemand','parlons allemand','parlez allemand','parlent allemand']}
  ]);
  const rows=(title,setId,data)=>add(title,setId,data.map(([s,a,w,c])=>gap(s,a,w,c)));
  rows('Articles au nominatif','g2',[
    ['___ Bahnhof ist groß.','Der',['Die','Das']],['___ Wohnung ist klein.','Die',['Der','Das']],['___ Hotel ist neu.','Das',['Der','Die']],
    ['Das ist ___ Bus.','ein',['eine','einen']],['Das ist ___ Straße.','eine',['ein','einen']],['Das ist ___ Zimmer.','ein',['eine','einen']],
    ['___ Tisch ist frei.','Der',['Die','Das']],['___ Tasche ist schwer.','Die',['Der','Das']],['___ Kind ist müde.','Das',['Der','Die']],
    ['Das ist ___ Stuhl.','ein',['eine','einen']],['Das ist ___ Lampe.','eine',['ein','einen']],['Das ist ___ Buch.','ein',['eine','einen']]
  ]);
  const plurals=[['Kind','Kinder',['Kinds','Kindern']],['Buch','Bücher',['Buche','Buchs']],['Auto','Autos',['Auten','Auto']],['Zimmer','Zimmer',['Zimmers','Zimmern']],['Tisch','Tische',['Tischs','Tischen']],['Stuhl','Stühle',['Stuhle','Stuhls']],['Tag','Tage',['Tags','Tagen']],['Freund','Freunde',['Freunds','Freunden']],['Wohnung','Wohnungen',['Wohnungs','Wohnunge']],['Straße','Straßen',['Straßes','Straße']],['Frau','Frauen',['Fraus','Fraue']],['Mann','Männer',['Manne','Manns']]];
  add('Pluriel: formes importantes','g2',plurals.map(([word,answer,wrong])=>({q:`Quel est le pluriel au nominatif de « ${word} » ?`,o:[answer,...wrong],a:0,audio:answer})));
  rows('Possessif au pluriel','g2',[
    ['Das sind ___ Freunde.','meine',['mein','meinen'],'Ce sont mes amis.'],['Das sind ___ Bücher.','deine',['dein','deinen'],'Ce sont tes livres.'],
    ['Das sind ___ Kinder.','seine',['sein','seinen'],'Ce sont ses enfants (à lui).'],['Das sind ___ Taschen.','ihre',['ihr','ihren'],'Ce sont ses sacs (à elle).'],
    ['Das sind ___ Eltern.','unsere',['unser','unseren'],'Ce sont nos parents.'],['Das sind ___ Zimmer.','eure',['euer','euren'],'Ce sont vos chambres (informel).'],
    ['___ Freunde kommen heute.','Meine',['Mein','Meinen'],'Mes amis viennent aujourd’hui.'],['___ Bücher sind neu.','Deine',['Dein','Deinen'],'Tes livres sont neufs.'],
    ['___ Kinder sind zu Hause.','Seine',['Sein','Seinen'],'Ses enfants (à lui) sont à la maison.'],['___ Taschen sind hier.','Ihre',['Ihr','Ihren'],'Ses sacs (à elle) sont ici.'],
    ['___ Eltern wohnen in Bonn.','Unsere',['Unser','Unseren'],'Nos parents habitent à Bonn.'],['___ Zimmer sind groß.','Eure',['Euer','Euren'],'Vos chambres (informel) sont grandes.']
  ]);
  rows('Articles à l’accusatif','g3',[
    ['Ich möchte ___ Kaffee.','einen',['ein','eine']],['Ich kaufe ___ Zeitung.','eine',['ein','einen']],['Er braucht ___ Wörterbuch.','ein',['eine','einen']],
    ['Wir suchen ___ Wohnung.','eine',['ein','einen']],['Sie kauft ___ Mantel.','einen',['ein','eine']],['Ich nehme ___ Brötchen.','ein',['eine','einen']],
    ['Ich sehe ___ Bahnhof.','den',['der','dem']],['Ich nehme ___ Suppe.','die',['der','das']],['Ich lese ___ Buch.','das',['der','die']],
    ['Haben Sie ___ Stadtplan?','einen',['ein','eine']],['Ich brauche ___ Fahrkarte.','eine',['ein','einen']],['Wir besuchen ___ Museum.','ein',['eine','einen']]
  ]);
  rows('Commander poliment','g3',[
    ['Ich ___ gern einen Kaffee.','hätte',['hätten','hättest']],['Wir ___ gern die Rechnung.','hätten',['hätte','hättest']],
    ['Ich ___ eine Suppe, bitte.','möchte',['möchten','möchtest']],['Wir ___ zwei Brötchen, bitte.','möchten',['möchte','möchtet']],
    ['___ Sie mir bitte die Speisekarte geben?','Könnten',['Könntest','Könnte']],['___ ich bitte ein Glas Wasser haben?','Kann',['Kannst','Können']],
    ['Ich hätte ___ einen Tee.','gern',['gestern','dort']],['Die Rechnung, ___.','bitte',['morgen','hier'],'L’addition, s’il vous plaît.'],
    ['Ich ___ einen Salat, bitte.','nehme',['nimmt','nehmen']],['Wir ___ zwei Kaffees, bitte.','nehmen',['nehme','nehmt']],
    ['___ Sie noch etwas?','Möchten',['Möchtest','Möchtet']],['Ich ___ gern bezahlen.','würde',['würden','würdest']]
  ]);
  rows('Mots interrogatifs utiles','g4',[
    ['___ kostet das?','Wie viel',['Wie viele','Wie lange'],'Combien cela coûte-t-il ?'],['___ ist der Bahnhof?','Wo',['Wer','Wann'],'Où est la gare ?'],
    ['___ beginnt der Kurs?','Wann',['Wer','Wohin'],'Quand commence le cours ?'],['___ heißen Sie?','Wie',['Wo','Wer'],'Comment vous appelez-vous ?'],
    ['___ kommen Sie?','Woher',['Wohin','Wann'],'D’où venez-vous ?'],['___ fahren Sie?','Wohin',['Woher','Wer'],'Où allez-vous ?'],
    ['___ Personen kommen?','Wie viele',['Wie viel','Wie lange'],'Combien de personnes viennent ?'],['___ dauert der Kurs?','Wie lange',['Wie alt','Wie viel'],'Combien de temps dure le cours ?'],
    ['___ sind Sie?','Wie alt',['Wie lange','Wie viele'],'Quel âge avez-vous ?'],['___ ist das?','Wer',['Wann','Wohin'],'Qui est-ce ?'],
    ['___ ist Ihre Telefonnummer?','Wie',['Wer','Wohin'],'Quel est votre numéro de téléphone ?'],['___ fahren Sie nach Berlin?','Warum',['Woher','Wer'],'Pourquoi allez-vous à Berlin ?']
  ]);
  const order=[
    ['Aujourd’hui, je travaille.','Heute arbeite ich.','Heute ich arbeite.','Heute arbeiten ich.'],['Demain, nous venons.','Morgen kommen wir.','Morgen wir kommen.','Morgen kommt wir.'],
    ['J’habite à Berlin.','Ich wohne in Berlin.','Ich in Berlin wohne.','Ich wohnen in Berlin.'],['Elle apprend l’allemand.','Sie lernt Deutsch.','Sie Deutsch lernt.','Sie lernen Deutsch.'],
    ['À huit heures, le cours commence.','Um acht Uhr beginnt der Kurs.','Um acht Uhr der Kurs beginnt.','Um acht Uhr beginnen der Kurs.'],['Le lundi, nous travaillons.','Am Montag arbeiten wir.','Am Montag wir arbeiten.','Am Montag arbeitet wir.'],
    ['Venez-vous demain ?','Kommen Sie morgen?','Sie kommen morgen?','Kommen morgen Sie?'],['Habites-tu à Bonn ?','Wohnst du in Bonn?','Du wohnst in Bonn?','Wohnen du in Bonn?'],
    ['Est-il à la maison ?','Ist er zu Hause?','Er ist zu Hause?','Sind er zu Hause?'],['Quand commence le cours ?','Wann beginnt der Kurs?','Wann der Kurs beginnt?','Wann beginnen der Kurs?'],
    ['Où habites-tu ?','Wo wohnst du?','Wo du wohnst?','Wo wohnen du?'],['D’où venez-vous ?','Woher kommen Sie?','Woher Sie kommen?','Woher kommt Sie?']
  ];
  add('Ordre des mots','g4',order.map(([fr,a,b,c])=>({q:`Choisis l’ordre standard des mots : « ${fr} »`,o:[a,b,c],a:0,audio:a})));
  rows('Prépositions de temps','g5',[
    ['___ Montag habe ich frei.','Am',['Um','Im']],['Der Termin ist ___ zehn Uhr.','um',['am','im']],['___ Sommer fahre ich ans Meer.','Im',['Am','Um']],
    ['___ Wochenende bin ich zu Hause.','Am',['Um','Im']],['Ich komme ___ Dienstag.','am',['um','im']],['Der Kurs beginnt ___ Abend.','am',['um','im']],
    ['___ Oktober besuche ich Berlin.','Im',['Am','Um']],['Wir treffen uns ___ halb acht.','um',['am','im']],['___ Winter ist es kalt.','Im',['Am','Um']],
    ['Das Museum öffnet ___ neun Uhr.','um',['am','im']],['___ Freitag arbeite ich.','Am',['Um','Im']],['___ Morgen trinke ich Kaffee.','Am',['Um','Im']]
  ]);
  const times=[['halb fünf','4:30',['5:30','5:00']],['halb acht','7:30',['8:30','8:00']],['Viertel nach drei','3:15',['2:45','3:45']],['Viertel vor sechs','5:45',['6:15','6:45']],['zehn nach neun','9:10',['8:50','9:50']],['zehn vor elf','10:50',['11:10','11:50']],['fünf nach zwei','2:05',['1:55','2:55']],['fünf vor vier','3:55',['4:05','4:55']],['zwanzig nach sieben','7:20',['6:40','7:40']],['zwanzig vor zehn','9:40',['10:20','10:40']],['drei Uhr','3:00',['3:30','3:15']],['zwölf Uhr','12:00',['12:30','12:15']]];
  add('Lire l’heure','g5',times.map(([time,a,w])=>({q:`Quelle heure indique « ${time} » ?`,o:[a,...w],a:0,audio:time})));
  const expressions=[
    ['morgen früh','demain matin',['ce matin','demain soir']],['heute Abend','ce soir',['hier soir','demain soir']],
    ['am Wochenende','le week-end',['le matin','le lundi']],['morgen Abend','demain soir',['ce soir','demain matin']],
    ['heute Morgen','ce matin',['demain matin','ce soir']],['gestern Abend','hier soir',['ce soir','hier matin']],
    ['gestern Morgen','hier matin',['demain matin','hier soir']],['heute Nachmittag','cet après-midi',['demain après-midi','ce matin']],
    ['morgen Nachmittag','demain après-midi',['cet après-midi','demain matin']],['heute Nacht','cette nuit',['la nuit dernière','demain matin']]
  ];
  add('Autres expressions','g5',expressions.map(([word,a,w])=>({q:`Que signifie « ${word} » ?`,o:[a,...w],a:0,audio:word})));
  rows('Modalverben – formes utiles','g6',[
    ['Ich ___ schwimmen.','kann',['kannst','können']],['Du ___ Deutsch sprechen.','kannst',['kann','könnt']],
    ['Wir ___ hier warten.','können',['kann','könnt']],['Ihr ___ jetzt gehen.','könnt',['können','kann']],
    ['Ich ___ arbeiten.','muss',['musst','müssen']],['Ihr ___ warten.','müsst',['müssen','muss']],
    ['Er ___ einen Kaffee.','möchte',['möchten','möchtest']],['Wir ___ bezahlen.','möchten',['möchte','möchtet']],
    ['Du ___ hier nicht rauchen.','darfst',['dürfen','darf']],['Sie ___ hier parken.','dürfen',['darf','dürft'],'Ils ont le droit de se garer ici.']
  ]);
  rows('Structure avec un modal','g6',[
    ['Ich kann Deutsch ___.','sprechen',['spreche','spricht']],['Du musst heute ___.','arbeiten',['arbeitest','arbeitet']],['Er möchte Kaffee ___.','trinken',['trinkt','trinkst']],
    ['Wir können morgen ___.','kommen',['kommt','komme']],['Ihr müsst früh ___.','aufstehen',['steht auf','stehen auf']],['Sie dürfen hier ___.','parken',['parkt','parke']],
    ['Ich möchte ein Buch ___.','lesen',['lese','liest']],['Du kannst die Rechnung ___.','bezahlen',['bezahlst','bezahlt']],['Er muss Deutsch ___.','lernen',['lernt','lerne']],
    ['Wir wollen das Museum ___.','besuchen',['besucht','besuche']],['Ihr könnt hier ___.','warten',['wartet','warte']],['Sie müssen den Bus ___.','nehmen',['nimmt','nehmt']]
  ]);
  rows('Verbes séparables','g6',[
    ['Ich stehe um sieben Uhr ___.','auf',['an','ein']],['Du stehst früh ___.','auf',['mit','ein']],['Wir stehen um acht Uhr ___.','auf',['an','mit']],
    ['Ich kaufe heute ___.','ein',['auf','an']],['Du kaufst am Samstag ___.','ein',['mit','auf']],['Wir kaufen morgen ___.','ein',['an','mit']],
    ['Der Zug kommt um zehn Uhr ___.','an',['auf','ein']],['Wann kommt der Bus ___?','an',['ein','auf']],['Wir kommen morgen ___.','an',['mit','auf'],'Nous arrivons demain.'],
    ['Ich bringe Wasser ___.','mit',['auf','an']],['Bringst du Brot ___?','mit',['an','auf']],['Bitte bringen Sie ein Buch ___.','mit',['ein','auf']]
  ]);
  rows('kein – nominatif et accusatif','g7',[
    ['Ich habe ___ Auto.','kein',['keine','keinen']],['Ich trinke ___ Kaffee.','keinen',['kein','keine']],['Wir haben ___ Kinder.','keine',['kein','keinen']],
    ['Das ist ___ Problem.','kein',['keine','keinen']],['Das ist ___ Tasche.','keine',['kein','keinen']],['Das ist ___ Bus.','kein',['keine','keinen']],
    ['Ich brauche ___ Fahrkarte.','keine',['kein','keinen']],['Er hat ___ Bruder.','keinen',['kein','keine']],['Sie hat ___ Buch.','kein',['keine','keinen']],
    ['Wir kaufen ___ Äpfel.','keine',['kein','keinen']],['Das sind ___ Freunde.','keine',['kein','keinen']],['Ich möchte ___ Tee.','keinen',['kein','keine']]
  ]);
  rows('nicht – exemples','g7',[
    ['Ich komme heute ___.','nicht',['kein','keine']],['Ich verstehe das ___.','nicht',['kein','keinen']],['Das ist ___ teuer.','nicht',['kein','keine']],
    ['Er wohnt ___ in Berlin.','nicht',['kein','keinen']],['Wir arbeiten heute ___.','nicht',['kein','keine']],['Sie spricht ___ Deutsch.','nicht',['kein','keinen']],
    ['Ich bin ___ müde.','nicht',['kein','keine']],['Der Bus kommt ___.','nicht',['kein','keinen']],['Das Zimmer ist ___ groß.','nicht',['kein','keine']],
    ['Wir können heute ___ kommen.','nicht',['kein','keine']],['Du musst ___ warten.','nicht',['kein','keinen']],['Ich möchte ___ bezahlen.','nicht',['kein','keine']]
  ]);
  rows('Possessifs utiles','g7',[
    ['Das ist ___ Bruder.','mein',['meine','meinen'],'C’est mon frère.'],['Das ist ___ Schwester.','deine',['dein','deinen'],'C’est ta sœur.'],
    ['Das ist ___ Buch.','sein',['seine','seinen'],'C’est son livre (à lui).'],['Das ist ___ Tasche.','ihre',['ihr','ihren'],'C’est son sac (à elle).'],
    ['Das ist ___ Haus.','unser',['unsere','unseren'],'C’est notre maison.'],['Das ist ___ Auto.','euer',['eure','euren'],'C’est votre voiture (informel).'],
    ['Ich sehe ___ Bruder.','meinen',['mein','meine'],'Je vois mon frère.'],['Du suchst ___ Tasche.','deine',['dein','deinen'],'Tu cherches ton sac.'],
    ['Er liest ___ Buch.','sein',['seine','seinen'],'Il lit son livre.'],['Sie besucht ___ Eltern.','ihre',['ihr','ihren'],'Elle rend visite à ses parents.'],
    ['Wir suchen ___ Schlüssel.','unseren',['unser','unsere'],'Nous cherchons notre clé.'],['Ihr besucht ___ Schwester.','eure',['euer','euren'],'Vous rendez visite à votre sœur (informel).']
  ]);
  function extendSets(sets){
    for(const {setId,tasks} of Object.values(topics)){
      const set=sets.find(s=>s.id===setId);if(!set)continue;
      for(const task of tasks)if(!set.questions.some(q=>q.q===task.q&&JSON.stringify(q.o)===JSON.stringify(task.o)))set.questions.push(task);
    }
  }
  window.DE_A1_GRAMMAR_DRILLS={topics,extendSets};
})();
