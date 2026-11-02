/* Français A2, lessons 19–24. Format: see tools/build-francais-a2.cjs (correct option first). */
module.exports=[
{
 id:19,
 phrases:[
  ['Colmar est la ville la plus jolie d’Alsace.','Colmar ist die hübscheste Stadt im Elsass.'],
  ['C’est l’un des plus vieux villages de la région.','Das ist eines der ältesten Dörfer der Region.'],
  ['Le Mont-Saint-Michel est le site le plus visité de Normandie.','Der Mont-Saint-Michel ist der meistbesuchte Ort der Normandie.'],
  ['On peut faire du canoë sur la rivière.','Man kann auf dem Fluss Kanu fahren.'],
  ['La vue depuis la tour est magnifique.','Die Aussicht vom Turm ist großartig.'],
  ['Il faut découvrir la ville à pied.','Man muss die Stadt zu Fuß entdecken.'],
  ['L’été, il y a beaucoup de touristes.','Im Sommer gibt es viele Touristen.'],
  ['C’est le meilleur restaurant du quartier.','Das ist das beste Restaurant im Viertel.'],
  ['On peut pique-niquer au bord du lac.','Man kann am Seeufer picknicken.'],
  ['Cette église est la moins connue de la ville.','Diese Kirche ist die am wenigsten bekannte der Stadt.']
 ],
 quiz:[
  ['Colmar est la ville la ___ jolie d’Alsace.',['plus','très','mieux'],'Colmar est la ville la plus jolie d’Alsace.','Superlativ: le / la / les plus + Adjektiv.'],
  ['C’est la ville la plus jolie ___ la région.',['de','à','que'],'Colmar est la ville la plus jolie d’Alsace.','Nach dem Superlativ steht de für den Bereich: de la région, d’Alsace.'],
  ['Was bedeutet „l’un des plus vieux villages“?',['eines der ältesten Dörfer','ein sehr altes Dorf','das älteste Dorf'],'C’est l’un des plus vieux villages de la région.','L’un des + Superlativ = einer / eines der …'],
  ['C’est le ___ restaurant du quartier. (gut, Superlativ)',['meilleur','plus bon','mieux'],'C’est le meilleur restaurant du quartier.','Bon → le meilleur.'],
  ['On peut ___ du canoë.',['faire','jouer','aller'],'On peut faire du canoë sur la rivière.','Sport treiben: faire du canoë, faire de la randonnée.'],
  ['Was bedeutet „au bord du lac“?',['am Seeufer','mitten im See','hinter dem See'],'On peut pique-niquer au bord du lac.','Au bord de = am Rand / Ufer von.'],
  ['Was bedeutet „la moins connue“?',['die am wenigsten bekannte','die bekannteste','die neueste'],'Cette église est la moins connue de la ville.','Le / la moins + Adjektiv = am wenigsten …'],
  ['Was bedeutet „Il faut découvrir la ville à pied“?',['Man muss die Stadt zu Fuß entdecken.','Man darf nicht zu Fuß in die Stadt.','Man findet die Stadt zu Fuß nicht.'],'Il faut découvrir la ville à pied.','Il faut + Infinitiv = man muss.'],
  ['Le Mont-Saint-Michel est le site le plus ___ de Normandie.',['visité','visite','visités'],'Le Mont-Saint-Michel est le site le plus visité de Normandie.','Le site (m. Sg.) → visité.'],
  ['Les plages de Bretagne sont ___ plus belles de France.',['les','la','des'],'Les plages de Bretagne sont les plus belles de France.','Plural → les plus.']
 ],
 dialogue:['Tu connais l’Alsace ?','Oui ! Colmar est la ville la plus jolie de la région.','Qu’est-ce qu’on peut faire là-bas ?','On peut visiter la vieille ville et faire du vélo dans les vignes.','Il y a beaucoup de touristes ?','L’été, oui. Il faut y aller au printemps.'],
 pron:['la plus jolie','Vor einem Konsonanten spricht man plus [ply]; vor Vokal bindet man: les plus‿anciens [plyzɑ̃sjɛ̃]. Le meilleur [məjœʁ] – das ll wird wie j gesprochen.'],
 transfer:['Beschreibe einen Ort, den du besonders magst, mit zwei Superlativen, und sage, was man dort machen kann.','Schreibe eine kurze Empfehlung für Touristen über deine Region (Sehenswürdigkeit, Aktivität, beste Reisezeit).'],
 domains:['Schriftliche Rezeption','Mündliche Produktion','Schriftliche Produktion'],
 app:{speak:'Je vous conseille la Normandie. Le Mont-Saint-Michel est le site le plus visité de la région. On peut aussi faire du vélo au bord de la mer. Le meilleur moment pour y aller, c’est en mai, parce qu’il y a moins de touristes.',
  write:'Ma région, c’est la Bavière.\nLe château de Neuschwanstein est le plus connu.\nOn peut faire de la randonnée dans les Alpes.\nLe meilleur moment, c’est en septembre.',
  placeholder:'Empfiehl deine Region …',help:'Nutze le / la plus …, le meilleur und on peut + Infinitiv.',
  hints:[['… est le / la plus … de …','… ist der / die / das …ste von …'],['On peut + Infinitiv …','Man kann …'],['Le meilleur moment, c’est …','Die beste Zeit ist …']]},
 goals:['Einen Reisetext überfliegen und die passende Information für einen Wunsch finden.','Orte mit dem Superlativ beschreiben (le plus, le moins, le meilleur).','Aktivitäten mit on peut / il faut + Infinitiv empfehlen.'],
 units:[
  {title:'Der Superlativ',rule:'Der Superlativ hat den Artikel vor plus / moins: la ville la plus jolie, le site le plus visité, les plages les plus belles. Der Bereich folgt mit de: le plus haut de France. Bon → le meilleur / la meilleure, l’un des / l’une des + Superlativ = einer / eine der …',
   pairs:[['C’est la ville la plus jolie d’Alsace.','Das ist die hübscheste Stadt im Elsass.'],['C’est le musée le moins cher.','Das ist das billigste Museum.'],['Ce sont les plages les plus belles.','Das sind die schönsten Strände.'],['C’est la meilleure crêperie de Rennes.','Das ist die beste Crêperie in Rennes.'],['C’est l’une des plus vieilles églises.','Das ist eine der ältesten Kirchen.']],
   emphasis:['le plus','la plus','les plus','le moins','de','le meilleur','l’un des']},
  {title:'Empfehlungen im Reisetext',rule:'Reisetexte geben Tipps mit on peut + Infinitiv (man kann), il faut + Infinitiv (man muss / sollte), nous vous conseillons de + Infinitiv. Achte beim Lesen auf Schlüsselwörter für Aktivitäten: se baigner, pique-niquer, faire de l’escalade, visiter les églises, regarder le coucher de soleil.',
   pairs:[['On peut se baigner dans la rivière.','Man kann im Fluss baden.'],['Il faut visiter le château.','Man muss das Schloss besichtigen.'],['Nous vous conseillons de venir le soir.','Wir empfehlen Ihnen, abends zu kommen.'],['On peut faire de l’escalade.','Man kann klettern.'],['Le coucher de soleil est magnifique.','Der Sonnenuntergang ist großartig.']],
   emphasis:['on peut','il faut','nous vous conseillons de','se baigner','pique-niquer','le coucher de soleil']}
 ],
 tasks:[
  [0,'C’est la ville la ___ jolie de la région.','plus',['plus de','très'],'Das ist die hübscheste Stadt der Region.','Superlativ'],
  [0,'C’est le musée le ___ cher. (billigste)','moins',['plus','mieux'],'Das ist das billigste Museum.','Superlativ'],
  [0,'Ce sont des plages magnifiques : ___ plus belles de Bretagne.','les',['la','des'],'Das sind herrliche Strände: die schönsten der Bretagne.','Superlativ','Superlativ im Plural: les plus belles. Des ist kein bestimmter Artikel, la ist Singular.'],
  [0,'C’est la ___ crêperie de Rennes. (beste)','meilleure',['meilleur','plus bonne'],'Das ist die beste Crêperie in Rennes.','meilleur','La crêperie ist weiblich → la meilleure.'],
  [0,'C’est le plus haut sommet ___ France.','de',['dans','à'],'Das ist der höchste Gipfel Frankreichs.','Superlativ','Nach dem Superlativ steht de für den Bereich: le plus haut sommet de France.'],
  [0,'C’est l’une ___ plus vieilles églises.','des',['de','les'],'Das ist eine der ältesten Kirchen.','Superlativ'],
  [1,'On ___ se baigner dans la rivière.','peut',['peux','faut'],'Man kann im Fluss baden.','on peut'],
  [1,'Il ___ visiter le château.','faut',['peut','doit'],'Man muss das Schloss besichtigen.','il faut'],
  [1,'Nous vous conseillons ___ venir le soir.','de',['à','pour'],'Wir empfehlen Ihnen, abends zu kommen.','conseiller de'],
  [1,'On peut faire ___ escalade.','de l’',['du','de la'],'Man kann klettern.','faire de']
 ],
 check:[
  ['Du liebst Sonnenuntergänge. Welcher Abschnitt passt? a) « Le soir, depuis la plage, le soleil se couche derrière les îles. » b) « Le marché a lieu tous les jeudis matin. »',['Abschnitt a','Abschnitt b','keiner'],'Le soleil se couche = die Sonne geht unter.','coucher'],
  ['Du möchtest picknicken. Welcher Satz hilft dir?',['« On peut manger à l’ombre des arbres, au bord du lac. »','« Le musée est fermé le mardi. »','« La route est étroite et dangereuse. »'],'Manger à l’ombre au bord du lac = picknicken möglich.','piquenique'],
  ['Du sagst, dass Colmar die schönste Stadt im Elsass ist.',['Colmar est la plus belle ville d’Alsace.','Colmar est la plus beau ville d’Alsace.','Colmar est la ville plus belle en Alsace.'],'La ville ist weiblich → la plus belle; Bereich mit de.','superlatif','Colmar est la plus belle ville d’Alsace.'],
  ['« C’est l’un des villages les plus visités de France. » Was stimmt?',['Viele Touristen besuchen das Dorf.','Das Dorf ist unbekannt.','Das Dorf ist das einzige in Frankreich.'],'L’un des plus visités = eines der meistbesuchten.','visite'],
  ['Du willst klettern gehen. Welcher Hinweis passt?',['« Le site est parfait pour l’escalade. »','« Le site est parfait pour la baignade. »','« Le site est parfait pour la randonnée. »'],'L’escalade = das Klettern; la baignade = das Baden, la randonnée = das Wandern.','sport'],
  ['Du empfiehlst das beste Restaurant.',['C’est le meilleur restaurant de la ville.','C’est le plus bon restaurant de la ville.','C’est le mieux restaurant de la ville.'],'Bon → le meilleur.','meilleur','C’est le meilleur restaurant de la ville.'],
  ['« Attention : en été, le village est plein de touristes. » Wann ist es ruhiger?',['außerhalb des Sommers','nur im August','am Wochenende im Sommer'],'En été = im Sommer viele Touristen.','saison'],
  ['Du interessierst dich für alte Kirchen. Welcher Abschnitt passt?',['« On y trouve de belles églises baroques. »','« On y trouve de belles plages de sable. »','« On y trouve de grands centres commerciaux. »'],'Églises baroques = Barockkirchen.','eglise']
 ],
 transfers:[
  ['plus','C’est le pont le ___ long de la ville.','plus','Das ist die längste Brücke der Stadt.'],
  ['moins','C’est l’hôtel le ___ cher. (billigste)','moins','Das ist das billigste Hotel.'],
  ['la','C’est ___ plus belle plage. (die)','la','Das ist der schönste Strand.'],
  ['meilleur','C’est le ___ fromage de la région. (beste)','meilleur','Das ist der beste Käse der Region.'],
  ['de','C’est la plus grande ville ___ Bretagne.','de','Das ist die größte Stadt der Bretagne.'],
  ['onpeut','On ___ louer des vélos à la gare.','peut','Man kann am Bahnhof Fahrräder mieten.'],
  ['conseiller','Nous vous conseillons ___ réserver.','de','Wir empfehlen Ihnen zu reservieren.']
 ],
 comp:{voices:{A:'female',B:'male'},turns:[
  ['A','Bonjour, je voudrais des idées pour visiter la région.'],['B','Bien sûr. Vous aimez la nature ou les villes ?'],
  ['A','Plutôt la nature. Et j’adore les couchers de soleil.'],['B','Alors allez aux falaises d’Étretat. Le coucher de soleil y est le plus beau de la côte.'],
  ['A','Et pour faire du sport ?'],['B','On peut faire du kayak sur la Seine, à vingt kilomètres d’ici.'],
  ['A','Il y a un endroit pour pique-niquer ?'],['B','Oui, le parc du château. C’est le plus calme de la ville.']],
  fields:[['Die Touristin mag',['Natur','Städte','Museen']],['Empfehlung für Sonnenuntergang',['die Klippen von Étretat','der Hafen von Honfleur','der Park am Schloss']],['Sport',['Kajak auf der Seine','Klettern an den Felsen','Radfahren am Fluss']],['Entfernung',['20 km','2 km','12 km']],['Picknick',['im Schlosspark','am Strand','im Wald']],['Der Park ist',['der ruhigste der Stadt','der größte der Stadt','der älteste der Stadt']]]},
 intro:['Colmar est la ville la plus jolie d’Alsace.',['Colmar est la ville la plus jolie de France.','Colmar est la ville la moins jolie d’Alsace.']],
 hard:{
  obj:[['superlatif','Den Superlativ bilden'],['conseil','Empfehlungen im Reisetext'],['lecture','Gezielt Informationen finden'],['comprendre','Tipps hörend verstehen']],
  text:'La Normandie en quatre étapes. Étretat : ses falaises sont les {plus|meist (Superlativ)|superlatif} célèbres de la côte. Le soir, nous vous conseillons {de|zu (conseiller …)|conseil} regarder le coucher de soleil. Honfleur : c’est l’un {des|der (l’un … plus)|superlatif} plus jolis ports de France. On {peut|können, on|conseil} manger des fruits de mer sur les quais. Bayeux : sa cathédrale est {la|die (Superlativ, f.)|superlatif} plus grande de la région. Le Mont-Saint-Michel : c’est le site le plus {visité|besucht|superlatif} de Normandie. Il {faut|müssen (il …)|conseil} venir tôt le matin, car l’été, il y a beaucoup de {touristes|Touristen|lecture}. La {meilleure|beste (f.)|superlatif} crêperie se trouve en bas du village. Pour les sportifs, on peut faire du {vélo|Fahrrad|lecture} le long de la baie. Pour pique-niquer, allez au {bord|Rand (au … de)|lecture} de la rivière. Et la région la {moins|am wenigsten|superlatif} connue ? Le Perche, avec ses vieilles {églises|Kirchen|lecture} et ses forêts.',
  listen:[
   {text:'Bienvenue à Annecy ! Le lac d’Annecy est l’un des lacs les plus propres d’Europe. On peut s’y baigner de juin à septembre. Pour la meilleure vue, montez au château.',voice:'female',
    q:[['Comment est le lac d’Annecy ?','l’un des plus propres d’Europe',['l’un des plus propres d’Europe','le plus grand de France','le plus froid des Alpes'],'superlatif'],['Quand peut-on se baigner ?','de juin à septembre',['de juin à septembre','de mai à octobre','toute l’année'],'conseil'],['Où trouve-t-on la meilleure vue ?','au château',['au château','au port','à la gare'],'lecture']]},
   {turns:[['A','Tu me conseilles quoi à Lyon ?'],['B','Il faut aller dans le Vieux-Lyon, c’est le quartier le plus ancien.'],['A','Et pour manger ?'],['B','Les bouchons ! Ce sont les restaurants les plus typiques.']],voices:{A:'male',B:'female'},
    q:[['Quel est le quartier le plus ancien ?','le Vieux-Lyon',['le Vieux-Lyon','la Croix-Rousse','le centre commercial'],'superlatif'],['Qu’est-ce qu’un bouchon ici ?','un restaurant typique',['un restaurant typique','un embouteillage','un musée'],'lecture'],['Pourquoi faut-il aller dans le Vieux-Lyon ?','C’est le quartier le plus ancien.',['C’est le quartier le plus ancien.','C’est le quartier le plus moderne.','C’est le quartier le plus calme.'],'superlatif']]}
  ],
  writing:{situation:'Un ami français veut visiter ta région. Écris-lui un e-mail avec des conseils.',points:['Présente le lieu le plus intéressant de ta région (avec un superlatif).','Dis ce qu’on peut y faire.','Donne un conseil pratique (saison, transport, restaurant).'],
   model:'Cher Théo,\nSi tu viens en Saxe, il faut absolument visiter Dresde. C’est la ville la plus belle de la région, avec ses vieilles églises et son grand fleuve. On peut faire une promenade en bateau sur l’Elbe ou du vélo dans la Suisse saxonne. Le meilleur moment, c’est en mai : il fait beau et il n’y a pas trop de touristes.\nÀ bientôt,\nFelix'}
 },
 words:[['le / la plus …','der / die / das …ste','the most …'],['le / la moins …','am wenigsten …','the least …'],['le meilleur / la meilleure','der / die / das beste','the best'],['l’un des …','einer / eines der …','one of the …'],['on peut + Infinitiv','man kann','you can'],['le coucher de soleil','der Sonnenuntergang','sunset'],['au bord de','am Ufer / Rand von','on the edge of'],['l’escalade (f.)','das Klettern','climbing']],
 vocab:[['la région','die Region'],['le site','die Sehenswürdigkeit, der Ort'],['visiter','besichtigen'],['le touriste / la touriste','der Tourist / die Touristin'],['la vue','die Aussicht'],['le coucher de soleil','der Sonnenuntergang'],['la falaise','die Klippe'],['la rivière','der Fluss'],['se baigner','baden'],['pique-niquer','picknicken'],['l’escalade (f.)','das Klettern'],['célèbre','berühmt']]
},
{
 id:20,
 phrases:[
  ['Qu’est-ce qu’on fait samedi prochain ?','Was machen wir nächsten Samstag?'],
  ['On pourrait faire une sortie à la campagne.','Wir könnten einen Ausflug aufs Land machen.'],
  ['J’aimerais bien aller au zoo.','Ich würde gern in den Zoo gehen.'],
  ['Je préfère faire du vélo plutôt que faire les magasins.','Ich fahre lieber Rad, als einkaufen zu gehen.'],
  ['Pourquoi pas ? C’est une bonne idée.','Warum nicht? Das ist eine gute Idee.'],
  ['Non, ça ne me dit rien.','Nein, dazu habe ich keine Lust.'],
  ['Parce qu’il fera beau, on peut rester dehors.','Weil es schön wird, können wir draußen bleiben.'],
  ['Le matin, on va courir, et le soir, on va au concert.','Morgens gehen wir laufen, abends ins Konzert.'],
  ['On se retrouve à quelle heure ?','Um wie viel Uhr treffen wir uns?'],
  ['D’accord, on fait comme ça !','Einverstanden, so machen wir es!']
 ],
 quiz:[
  ['Wie machst du einen höflichen Vorschlag?',['On pourrait aller au zoo.','On a pu aller au zoo.','On peut allé au zoo.'],'On pourrait faire une sortie à la campagne.','On pourrait + Infinitiv (Conditionnel) = wir könnten …'],
  ['Je préfère faire du vélo ___ faire les magasins.',['plutôt que','plus que','au lieu'],'Je préfère faire du vélo plutôt que faire les magasins.','Préférer … plutôt que … = lieber … als …'],
  ['Was bedeutet „Ça ne me dit rien“?',['Dazu habe ich keine Lust.','Das sagt mir nichts Neues.','Ich sage nichts.'],'Non, ça ne me dit rien.','Ça ne me dit rien = das reizt mich nicht.'],
  ['J’___ bien aller au concert. (aimer, Conditionnel)',['aimerais','aimerai','aime'],'J’aimerais bien aller au concert.','Conditionnel: Futurstamm + Imparfait-Endung: j’aimerais.'],
  ['Wie stimmst du einem Vorschlag zu?',['Pourquoi pas ? C’est une bonne idée.','Pourquoi ? C’est une mauvaise idée.','Parce que non.'],'Pourquoi pas ? C’est une bonne idée.','Pourquoi pas ? = warum nicht?'],
  ['Was bedeutet „faire une sortie à la campagne“?',['einen Ausflug aufs Land machen','vom Land wegziehen','eine Kampagne starten'],'On pourrait faire une sortie à la campagne.','Une sortie = ein Ausflug; la campagne = das Land.'],
  ['On ___ retrouve à quelle heure ?',['se','nous','on'],'On se retrouve à quelle heure ?','Se retrouver = sich treffen; mit on: on se retrouve.'],
  ['Was bedeutet „faire les magasins“?',['einen Einkaufsbummel machen','Geschäfte bauen','im Laden arbeiten'],'…plutôt que faire les magasins.','Faire les magasins = shoppen gehen.'],
  ['Welche Begründung passt? « On va au parc ___ il fera beau. »',['parce qu’','mais','pourtant'],'On va au parc parce qu’il fera beau.','Parce que + Grund; vor il wird es zu parce qu’.'],
  ['Was bedeutet „On fait comme ça“?',['So machen wir es.','Wir machen es anders.','Wie machen wir das?'],'D’accord, on fait comme ça !','Comme ça = so.']
 ],
 dialogue:['Qu’est-ce qu’on fait samedi ?','On pourrait aller au zoo ?','Bof, je préfère faire du vélo plutôt qu’aller au zoo. Il fera beau.','D’accord. Et le soir, on va au concert ?','Pourquoi pas ! On se retrouve à quelle heure ?','À dix heures devant chez moi. On fait comme ça !'],
 pron:['on pourrait / on pourra','On pourrait [puʁɛ] (Vorschlag) endet offen, on pourra [puʁa] (Futur) mit a. Vorschläge sprichst du mit steigender Melodie wie eine Frage: On pourrait aller au zoo ?'],
 transfer:['Plane mit deinem Partner einen gemeinsamen Samstag: macht Vorschläge, begründet, lehnt ab und einigt euch auf zwei Aktivitäten mit Uhrzeit.','Schreibe eine Nachricht mit zwei Vorschlägen für das Wochenende, jeweils mit Begründung.'],
 domains:['Mündliche Interaktion','Mündliche Produktion','Schriftliche Interaktion'],
 app:{speak:'Samedi, on pourrait faire une sortie à la campagne, parce qu’il fera beau. Je préfère faire du vélo plutôt que faire les magasins. Le soir, j’aimerais bien aller au concert. On se retrouve à neuf heures à la gare ? Qu’est-ce que tu en penses ?',
  write:'Salut Lina,\nSamedi, on pourrait faire du vélo à la campagne, parce qu’il fera beau.\nLe soir, j’aimerais bien aller au concert.\nOn se retrouve à neuf heures ?\nBises,\nTom',
  placeholder:'Schreibe zwei Vorschläge …',help:'Vorschlag mit on pourrait, Vorliebe mit je préfère … plutôt que, Grund mit parce que.',
  hints:[['On pourrait …','Wir könnten …'],['Je préfère … plutôt que …','Ich … lieber als …'],['… parce que …','… weil …']]},
 goals:['Vorschläge machen, annehmen und ablehnen.','Vorlieben vergleichen und begründen: je préfère … plutôt que …, parce que.','Sich auf zwei Aktivitäten, Zeit und Treffpunkt einigen.'],
 units:[
  {title:'Vorschlagen und reagieren',rule:'Vorschläge: On pourrait + Infinitiv (Conditionnel von pouvoir), Et si on allait … ?, Ça te dit de + Infinitiv ? Wunsch: j’aimerais bien / je voudrais bien + Infinitiv. Zustimmen: Bonne idée ! Pourquoi pas ? D’accord ! Ablehnen: Bof … / Ça ne me dit rien. / Je n’ai pas très envie.',
   pairs:[['On pourrait aller au cinéma.','Wir könnten ins Kino gehen.'],['Ça te dit de faire du vélo ?','Hast du Lust, Rad zu fahren?'],['J’aimerais bien voir ce film.','Ich würde diesen Film gern sehen.'],['Bonne idée !','Gute Idee!'],['Bof, je n’ai pas très envie.','Na ja, ich habe nicht so große Lust.']],
   emphasis:['On pourrait','Ça te dit de','j’aimerais bien','Bonne idée','Pourquoi pas','Ça ne me dit rien']},
  {title:'Vorlieben begründen und sich einigen',rule:'Vergleiche zwei Aktivitäten mit je préfère A plutôt que B (ich mache lieber A als B). Begründe mit parce que + Satz oder car. Am Ende einigt ihr euch auf Zeit und Ort: On se retrouve à … heures, devant … / Alors, le matin … et l’après-midi …',
   pairs:[['Je préfère courir plutôt qu’aller à la piscine.','Ich gehe lieber laufen als ins Schwimmbad.'],['Je préfère le zoo parce que j’adore les animaux.','Ich mag den Zoo lieber, weil ich Tiere liebe.'],['On se retrouve à dix heures devant la gare.','Wir treffen uns um zehn vor dem Bahnhof.'],['Le matin, on va au marché, et l’après-midi, au parc.','Morgens gehen wir auf den Markt, nachmittags in den Park.'],['D’accord, on fait comme ça.','Einverstanden, so machen wir es.']],
   emphasis:['je préfère','plutôt que','parce que','On se retrouve','le matin','l’après-midi']}
 ],
 tasks:[
  [0,'On ___ aller au cinéma. (könnten)','pourrait',['pourra','peut'],'Wir könnten ins Kino gehen.','Vorschlag'],
  [0,'Ça te ___ de faire du vélo ?','dit',['fait','va'],'Hast du Lust, Rad zu fahren?','Vorschlag'],
  [0,'J’___ bien voir ce film. (aimer, würde)','aimerais',['aimerai','aimais'],'Ich würde diesen Film gern sehen.','Wunsch'],
  [0,'Bonne ___ !','idée',['envie','chance'],'Gute Idee!','Zustimmung'],
  [0,'Bof, je n’ai pas très ___.','envie',['idée','besoin'],'Na ja, ich habe nicht so große Lust.','Ablehnung'],
  [1,'Je préfère courir ___ aller à la piscine.','plutôt qu’',['plus qu’','que plutôt'],'Ich gehe lieber laufen als ins Schwimmbad.','Vorliebe'],
  [1,'Je préfère le zoo ___ j’adore les animaux.','parce que',['pour que','alors'],'Ich mag den Zoo lieber, weil ich Tiere liebe.','Begründung'],
  [1,'On se ___ à dix heures devant la gare.','retrouve',['retrouvons','retrouvent'],'Wir treffen uns um zehn vor dem Bahnhof.','Treffpunkt'],
  [1,'On se retrouve ___ la gare. (vor)','devant',['derrière','dans'],'Wir treffen uns vor dem Bahnhof.','Treffpunkt'],
  [1,'D’accord, on fait comme ___.','ça',['ce','cela que'],'Einverstanden, so machen wir es.','Einigung']
 ],
 check:[
  ['Prüfung Teil 3: Dein Partner schlägt vor: « On pourrait faire les magasins samedi ? » Du möchtest lieber draußen sein.',['Je préfère faire une sortie à la campagne, parce qu’il fera beau.','Je préfère faire les magasins, parce qu’il fera beau.','Je préfère faire une sortie à la campagne, donc il fera beau.'],'Du nennst eine Alternative und begründest sie mit parce que. Donc leitet eine Folge ein, keinen Grund.','alternative','Je préfère faire une sortie à la campagne, parce qu’il fera beau.'],
  ['« Le zoo ? Bof, ça ne me dit rien. » Wie reagiert die Person?',['Sie hat keine Lust auf den Zoo.','Sie kennt den Zoo nicht.','Sie findet den Zoo super.'],'Ça ne me dit rien = keine Lust.','refus'],
  ['Du schlägst höflich vor, ins Konzert zu gehen.',['On pourrait aller au concert ?','On a pu aller au concert ?','On pourra allé au concert ?'],'On pourrait + Infinitiv.','proposer','On pourrait aller au concert ?'],
  ['« Le matin, on court au parc, et le soir, on va au restaurant. » Wann geht ihr laufen?',['morgens','abends','mittags'],'Le matin = morgens.','moment'],
  ['Ihr müsst euch auf eine Uhrzeit einigen. Was fragst du?',['On se retrouve à quelle heure ?','On se retrouve à quel jour ?','On se trouve quelle heure ?'],'Se retrouver à quelle heure = um wie viel Uhr treffen.','heure','On se retrouve à quelle heure ?'],
  ['Du nimmst den Vorschlag deines Partners an.',['Pourquoi pas ? Bonne idée !','Bof, ça ne me dit rien.','Non, je n’ai pas envie.'],'Pourquoi pas = warum nicht – Zustimmung.','accepter','Pourquoi pas ? Bonne idée !'],
  ['« Je préfère le vélo plutôt que la course, parce que j’ai mal au genou. » Warum fährt die Person lieber Rad?',['Ihr Knie tut weh.','Sie hat kein Fahrrad.','Sie läuft nicht gern im Regen.'],'J’ai mal au genou = das Knie tut weh.','raison'],
  ['Du möchtest gern einmal in den Zoo.',['J’aimerais bien aller au zoo.','J’aimerai bien allé au zoo.','J’aimais bien aller au zoo.'],'Conditionnel: j’aimerais.','souhait','J’aimerais bien aller au zoo.']
 ],
 transfers:[
  ['pourrait','On ___ faire un pique-nique. (pouvoir, Vorschlag)','pourrait','Schlage ein Picknick vor.'],
  ['aimerais','J’___ bien voir l’exposition. (aimer, Conditionnel)','aimerais','Du würdest die Ausstellung gern sehen.'],
  ['plutot','Je préfère marcher ___ prendre le bus. (lieber als)','plutôt que','Du gehst lieber zu Fuß, als den Bus zu nehmen.'],
  ['parceque','On va à la piscine ___ il fait chaud. (weil)','parce qu’','Ihr geht ins Schwimmbad, weil es heiß ist.'],
  ['retrouver','On se ___ devant le cinéma. (treffen)','retrouve','Ihr trefft euch vor dem Kino.'],
  ['dit','Ça te ___ d’aller au zoo ?','dit','Hast du Lust, in den Zoo zu gehen?'],
  ['refus','Bof, ça ne me dit ___.','rien','Du hast keine Lust.']
 ],
 comp:{voices:{A:'male',B:'female'},turns:[
  ['A','Alors, samedi prochain, qu’est-ce qu’on fait ensemble ?'],['B','On pourrait aller courir au parc le matin ?'],
  ['A','Courir ? Bof. Je préfère faire du vélo, parce que j’ai mal au genou.'],['B','D’accord, du vélo. On pourrait aller jusqu’au lac.'],
  ['A','Bonne idée ! Et l’après-midi ?'],['B','Faire les magasins ? J’ai besoin de chaussures.'],
  ['A','Ça ne me dit rien. Pourquoi pas un concert le soir ?'],['B','Parfait ! Alors vélo le matin et concert à vingt heures. On se retrouve à neuf heures chez toi.']],
  fields:[['Erster Vorschlag der Frau',['laufen im Park','Fahrrad fahren','Zoo']],['Warum lehnt er ab?',['Knieschmerzen','keine Zeit','schlechtes Wetter']],['Ziel der Radtour',['der See','der Wald','die Stadt']],['Warum will sie shoppen?',['sie braucht Schuhe','sie braucht eine Jacke','es ist Ausverkauf']],['Abendprogramm',['Konzert um 20 Uhr','Kino um 20 Uhr','Restaurant um 19 Uhr']],['Treffpunkt',['9 Uhr bei ihm','9 Uhr am See','10 Uhr bei ihr']]]},
 intro:['On pourrait faire une sortie à la campagne.',['On pourrait faire une sortie à la montagne.','On pourra faire une sortie à la campagne.']],
 hard:{
  obj:[['proposer','Vorschläge machen'],['preferer','Vorlieben vergleichen und begründen'],['accord','Sich einigen'],['comprendre','Ein Planungsgespräch verstehen']],
  text:'— Samedi prochain, qu’est-ce qu’on fait ? — On {pourrait|könnten (pouvoir)|proposer} aller au zoo ? — Bof, ça ne me {dit|sagen (ça ne me … rien)|proposer} rien. Je {préfère|lieber mögen, je|preferer} faire du vélo {plutôt|lieber (… que)|preferer} que voir des animaux. — D’accord, mais pourquoi ? — {Parce qu’|weil (vor il)|preferer}il fera beau et je veux être dehors. — Bonne {idée|Idee|accord} ! On pourrait aller à la campagne. Et l’après-midi, j’{aimerais|gern mögen, Conditionnel|proposer} bien faire les magasins. — Ah non ! Ça te {dit|Lust haben (ça te …)|proposer} plutôt d’aller courir au bord du lac ? — {Pourquoi|warum (… pas)|accord} pas. Et le soir, on va au concert ? — D’{accord|einverstanden|accord} ! On se {retrouve|treffen, on|accord} à quelle heure ? — À neuf heures {devant|vor (Ort)|accord} la gare. — Parfait, on fait comme {ça|so|accord} !',
  listen:[
   {text:'Salut Max ! J’ai une idée pour dimanche : on pourrait faire une randonnée en forêt. Après, on pourrait manger dans le petit restaurant du village. Je préfère partir tôt, vers huit heures, parce qu’il fera chaud l’après-midi.',voice:'female',
    q:[['Qu’est-ce qu’elle propose pour dimanche ?','une randonnée en forêt',['une randonnée en forêt','une promenade en ville','une sortie au zoo'],'proposer'],['Où veut-elle manger ?','dans le restaurant du village',['dans le restaurant du village','au restaurant de la gare','chez des amis au village'],'comprendre'],['Pourquoi veut-elle partir tôt ?','Parce qu’il fera chaud l’après-midi.',['Parce qu’il fera chaud l’après-midi.','Parce qu’il pleuvra le soir.','Parce que le restaurant ferme tôt.'],'preferer']]},
   {turns:[['A','Ça te dit d’aller au cinéma ce soir ?'],['B','Non, je préfère rester à la maison. Je suis fatiguée.'],['A','Alors demain soir ?'],['B','Demain, oui ! À vingt heures trente, d’accord ?']],voices:{A:'male',B:'female'},
    q:[['Est-ce qu’elle veut aller au cinéma ce soir ?','Non.',['Non.','Oui.','Peut-être.'],'accord'],['Pourquoi pas ce soir ?','Elle est fatiguée.',['Elle est fatiguée.','Elle travaille.','Elle n’aime pas le film.'],'preferer'],['À quelle heure demain ?','20 h 30',['20 h 30','20 h','21 h 30'],'accord']]}
  ],
  writing:{situation:'Ton amie française Lou vient te voir samedi. Écris-lui un message pour organiser la journée.',points:['Propose deux activités avec on pourrait.','Dis ce que tu préfères et pourquoi.','Propose une heure et un lieu de rendez-vous.'],
   model:'Salut Lou,\nPour samedi, j’ai deux idées : on pourrait faire du vélo le long de la rivière le matin, ou aller au marché. Je préfère le vélo plutôt que le marché, parce qu’il fera beau. Le soir, on pourrait aller au concert de jazz sur la place. On se retrouve à dix heures devant la gare ? Dis-moi ce que tu en penses !\nBises,\nMia'}
 },
 words:[['on pourrait','wir könnten','we could'],['j’aimerais bien','ich würde gern','I would like'],['préférer … plutôt que','lieber … als','to prefer … rather than'],['ça ne me dit rien','dazu habe ich keine Lust','I don’t fancy it'],['pourquoi pas ?','warum nicht?','why not?'],['se retrouver','sich treffen','to meet up'],['la sortie','der Ausflug','outing'],['faire les magasins','shoppen gehen','to go shopping']],
 vocab:[['la sortie','der Ausflug'],['la campagne','das Land'],['le zoo','der Zoo'],['faire les magasins','shoppen gehen'],['courir','laufen, rennen'],['le concert','das Konzert'],['préférer','vorziehen'],['plutôt que','lieber als'],['l’idée (f.)','die Idee'],['se retrouver','sich treffen'],['proposer','vorschlagen'],['devant','vor']]
},
{
 id:21,
 phrases:[
  ['Notez cinq mots nouveaux par jour.','Schreiben Sie sich jeden Tag fünf neue Wörter auf.'],
  ['Cherchez les mots qui ressemblent à votre langue.','Suchen Sie die Wörter, die Ihrer Sprache ähneln.'],
  ['Il faut parler le plus souvent possible.','Man muss so oft wie möglich sprechen.'],
  ['On vous recommande de regarder des films en version originale.','Man empfiehlt Ihnen, Filme in Originalfassung zu sehen.'],
  ['Écrivez votre liste de courses en français.','Schreiben Sie Ihre Einkaufsliste auf Französisch.'],
  ['Je voudrais suivre un cours intensif à Montpellier.','Ich möchte einen Intensivkurs in Montpellier besuchen.'],
  ['Le cours dure quatre semaines.','Der Kurs dauert vier Wochen.'],
  ['On peut habiter dans une famille d’accueil.','Man kann bei einer Gastfamilie wohnen.'],
  ['N’ayez pas peur de faire des fautes.','Haben Sie keine Angst, Fehler zu machen.'],
  ['Ne traduisez pas chaque mot.','Übersetzen Sie nicht jedes Wort.']
 ],
 quiz:[
  ['___ cinq mots nouveaux par jour. (noter, vous, Imperativ)',['Notez','Notons','Noter'],'Notez cinq mots nouveaux par jour.','Höflicher Imperativ: vous-Form ohne vous: vous notez → Notez.'],
  ['Was bedeutet „Cherchez les mots qui ressemblent à votre langue“?',['Suchen Sie Wörter, die Ihrer Sprache ähneln.','Suchen Sie Wörter, die Sie nicht kennen.','Übersetzen Sie alle Wörter.'],'Cherchez les mots qui ressemblent à votre langue.','Ressembler à = ähneln.'],
  ['On vous recommande ___ regarder des films.',['de','à','pour'],'On vous recommande de regarder des films en version originale.','Recommander de + Infinitiv.'],
  ['Was bedeutet „en version originale“?',['in Originalfassung','in einer neuen Version','mit Untertiteln auf Deutsch'],'…des films en version originale.','La version originale (VO) = Originalfassung.'],
  ['N’___ pas peur de faire des fautes. (avoir, Imperativ)',['ayez','avez','ayons'],'N’ayez pas peur de faire des fautes.','Avoir hat einen unregelmäßigen Imperativ: aie, ayons, ayez.'],
  ['Ne ___ pas chaque mot. (traduire, vous, Imperativ)',['traduisez','traduire','traduis'],'Ne traduisez pas chaque mot.','Verneinter Imperativ mit vous: ne traduisez pas. Traduis ist die du-Form.'],
  ['Il faut parler le plus souvent ___.',['possible','possibles','pouvoir'],'Il faut parler le plus souvent possible.','Le plus souvent possible = so oft wie möglich.'],
  ['Was ist „une famille d’accueil“?',['eine Gastfamilie','eine große Familie','ein Familienhotel'],'On peut habiter dans une famille d’accueil.','Accueillir = empfangen, aufnehmen.'],
  ['Le cours ___ quatre semaines.',['dure','fait durer','est durée'],'Le cours dure quatre semaines.','Durer = dauern.'],
  ['Je voudrais ___ un cours intensif.',['suivre','prendre part','faire partie'],'Je voudrais suivre un cours intensif à Montpellier.','Suivre un cours = einen Kurs besuchen.']
 ],
 dialogue:['Tu as des conseils pour apprendre le français ?','Oui : notez chaque jour quelques mots nouveaux.','Et pour parler ?','Il faut parler le plus souvent possible. N’ayez pas peur des fautes !','Je voudrais aussi suivre un cours en France.','Bonne idée ! Et habitez dans une famille d’accueil, c’est le mieux.'],
 pron:['notez / notes','Notez [nɔte] endet auf [e]; das z ist stumm. Bei ayez [eje] hörst du zwei Silben. Ratschläge sprichst du freundlich mit fallender Melodie am Satzende.'],
 transfer:['Gib einem Freund drei Tipps zum Französischlernen und erzähle, welcher Tipp dir am meisten hilft.','Schreibe eine Liste mit vier Lerntipps im höflichen Imperativ, einer davon verneint.'],
 domains:['Schriftliche Rezeption','Mündliche Interaktion','Schriftliche Produktion'],
 app:{speak:'Pour apprendre le français, il faut pratiquer tous les jours. Notez quelques mots nouveaux par jour. Regardez des séries en version originale. Et n’ayez pas peur de faire des fautes ! Moi, je voudrais suivre un cours intensif en France l’été prochain.',
  write:'Mes conseils :\nNotez cinq mots par jour.\nÉcoutez la radio française.\nParlez le plus souvent possible.\nNe traduisez pas chaque mot.',
  placeholder:'Schreibe vier Lerntipps …',help:'Benutze den Imperativ der vous-Form; ein Tipp ist verneint.',
  hints:[['Notez / Écoutez / Parlez …','Notieren / Hören / Sprechen Sie …'],['Ne … pas …','… Sie nicht …'],['Il faut …','Man muss …']]},
 goals:['Lerntipps und Kursinformationen verstehen und prüfen, was empfohlen wird.','Ratschläge im Imperativ (auch verneint), mit il faut und recommander de geben.','Über einen Sprachkurs sprechen: Dauer, Unterkunft, Angebote.'],
 units:[
  {title:'Ratschläge im Imperativ',rule:'Der höfliche Imperativ ist die vous-Form ohne vous: vous notez → Notez. Verneint: Ne traduisez pas. Unregelmäßig: être → soyez, avoir → ayez. Für allgemeine Ratschläge: il faut + Infinitiv, on vous recommande / conseille de + Infinitiv.',
   pairs:[['Notez les mots nouveaux.','Notieren Sie die neuen Wörter.'],['Ne traduisez pas chaque mot.','Übersetzen Sie nicht jedes Wort.'],['Soyez patient.','Seien Sie geduldig.'],['Ayez toujours un carnet.','Haben Sie immer ein Notizbuch dabei.'],['On vous conseille de lire des BD.','Man rät Ihnen, Comics zu lesen.']],
   emphasis:['vous-Form ohne vous','Ne traduisez pas','soyez','ayez','il faut','recommande de','conseille de']},
  {title:'Einen Sprachkurs wählen',rule:'Wichtige Wörter für einen Kurs: une école de langues, un cours intensif, suivre un cours, durer (dauern), le prix, s’inscrire (sich anmelden), habiter dans une famille d’accueil, prendre ses repas (die Mahlzeiten einnehmen), une visite de la ville. Achte im Text darauf, ob etwas empfohlen, erlaubt oder verlangt wird.',
   pairs:[['Je voudrais m’inscrire à un cours intensif.','Ich möchte mich für einen Intensivkurs anmelden.'],['Le cours dure trois semaines.','Der Kurs dauert drei Wochen.'],['Le prix comprend les repas.','Im Preis sind die Mahlzeiten enthalten.'],['On peut habiter dans une famille d’accueil.','Man kann bei einer Gastfamilie wohnen.'],['L’école organise une visite de la ville.','Die Schule organisiert eine Stadtführung.']],
   emphasis:['une école de langues','un cours intensif','s’inscrire','durer','une famille d’accueil','les repas']}
 ],
 tasks:[
  [0,'___ les mots nouveaux. (noter)','Notez',['Notes','Notent'],'Notieren Sie die neuen Wörter.','Imperativ'],
  [0,'Ne ___ pas chaque mot. (traduire)','traduisez',['traduisez-pas','traduire'],'Übersetzen Sie nicht jedes Wort.','Imperativ'],
  [0,'___ patient ! (être)','Soyez',['Êtes','Soyons'],'Seien Sie geduldig!','Imperativ','Être → soyez.'],
  [0,'___ toujours un carnet. (avoir)','Ayez',['Avez','Avoir'],'Haben Sie immer ein Notizbuch dabei.','Imperativ','Imperativ von avoir mit vous: ayez. Avez ist Präsens.'],
  [0,'On vous conseille ___ lire des BD.','de',['à','pour'],'Man rät Ihnen, Comics zu lesen.','conseiller de'],
  [0,'Il ___ parler tous les jours.','faut',['doit','peut'],'Man muss jeden Tag sprechen.','il faut'],
  [1,'Je voudrais m’___ à un cours intensif.','inscrire',['écrire','inscris'],'Ich möchte mich für einen Intensivkurs anmelden.','Kurs'],
  [1,'Le cours ___ trois semaines.','dure',['dur','durée'],'Der Kurs dauert drei Wochen.','Kurs'],
  [1,'On peut habiter dans une famille d’___.','accueil',['accueillir','acceuil'],'Man kann bei einer Gastfamilie wohnen.','Kurs'],
  [1,'Le prix ___ les repas.','comprend',['comprends','comprennent'],'Im Preis sind die Mahlzeiten enthalten.','Kurs']
 ],
 check:[
  ['Lerntipp: « Une moyenne de cinq mots nouveaux par jour suffit. » Was wird empfohlen?',['etwa fünf neue Wörter pro Tag','fünf Wörter aus jedem Text','fünfzig Wörter pro Woche'],'Une moyenne de … par jour = im Schnitt … pro Tag.','mots'],
  ['« Notez votre programme de la journée en français : 9 h, dentiste ; 12 h, déjeuner. » Was sollst du tun?',['den Tagesplan auf Französisch schreiben','einen Zahnarzttermin machen','französische Rezepte lesen'],'Notez votre programme = schreiben Sie Ihr Programm auf.','programme'],
  ['Du gibst den Rat, keine Angst vor Fehlern zu haben.',['N’ayez pas peur de faire des fautes.','N’avez pas peur de faire des fautes.','Ne pas ayez peur de faire des fautes.'],'Avoir → ayez; verneint: N’ayez pas.','imperatif','N’ayez pas peur de faire des fautes.'],
  ['« Ne cherchez pas chaque mot dans le dictionnaire. » Was sollst du NICHT tun?',['jedes Wort nachschlagen','den Text lesen','das Wörterbuch kaufen'],'Ne cherchez pas = suchen Sie nicht.','negation'],
  ['Kursinfo: « Le prix comprend le cours et l’hébergement, mais pas les repas. » Was ist nicht im Preis?',['das Essen','die Unterkunft','der Unterricht'],'Mais pas les repas = aber nicht die Mahlzeiten.','prix'],
  ['Du willst wissen, wie lange der Kurs dauert.',['Le cours dure combien de temps ?','Le cours coûte combien de temps ?','Le cours est quelle durée ?'],'Durer combien de temps = wie lange dauern.','duree','Le cours dure combien de temps ?'],
  ['« Cherchez les mots qui ressemblent à l’allemand ou à l’anglais : vous comprendrez déjà beaucoup ! » Welcher Rat ist das?',['ähnliche Wörter suchen','nur unbekannte Wörter lernen','Texte übersetzen'],'Ressembler à = ähneln.','ressembler'],
  ['Du empfiehlst, Filme in Originalfassung zu schauen.',['Regardez des films en version originale.','Regardez des films en version allemande.','Regardez pas des films originaux.'],'Version originale = Originalfassung.','vo','Regardez des films en version originale.']
 ],
 transfers:[
  ['imperatif','___ la radio française. (écouter, vous)','Écoutez','Rate jemandem, französisches Radio zu hören.'],
  ['negation','Ne ___ pas trop vite. (parler, vous)','parlez','Rate jemandem, nicht zu schnell zu sprechen.'],
  ['etre','___ curieux ! (être, vous)','Soyez','Rate jemandem, neugierig zu sein.'],
  ['avoir','___ toujours un dictionnaire. (avoir, vous)','Ayez','Rate jemandem, immer ein Wörterbuch dabeizuhaben.'],
  ['recommander','On vous recommande ___ lire le journal.','de','Man empfiehlt Ihnen, Zeitung zu lesen.'],
  ['inscrire','Je voudrais m’___ au cours du soir.','inscrire','Du möchtest dich für den Abendkurs anmelden.'],
  ['durer','Le stage ___ deux semaines. (dauern)','dure','Das Praktikum dauert zwei Wochen.']
 ],
 comp:{voices:{A:'male',B:'female'},turns:[
  ['A','École Soleil, bonjour !'],['B','Bonjour, je voudrais des informations sur vos cours d’été.'],
  ['A','Nous avons des cours intensifs de deux ou quatre semaines, vingt heures par semaine.'],['B','Et le prix ?'],
  ['A','Deux semaines, c’est quatre cent cinquante euros. Quatre semaines, huit cents euros.'],['B','On peut habiter dans une famille ?'],
  ['A','Oui, avec le petit-déjeuner et le dîner. Et le mercredi, nous organisons une visite de la ville.'],['B','Parfait. Je voudrais m’inscrire pour quatre semaines en juillet.']],
  fields:[['Kurslänge',['2 oder 4 Wochen','1 oder 3 Wochen','nur 4 Wochen']],['Stunden pro Woche',['20','25','12']],['Preis 2 Wochen',['450 €','540 €','800 €']],['Gastfamilie mit',['Frühstück und Abendessen','nur Frühstück','allen Mahlzeiten']],['Mittwoch',['Stadtführung','Kochkurs','kein Unterricht']],['Anmeldung',['4 Wochen im Juli','2 Wochen im Juli','4 Wochen im Juni']]]},
 intro:['Notez cinq mots nouveaux par jour.',['Notez cinq phrases nouvelles par jour.','Notez quinze mots nouveaux par jour.']],
 hard:{
  obj:[['imperatif','Höflicher Imperativ'],['conseil','Ratschläge geben'],['cours','Über einen Sprachkurs sprechen'],['comprendre','Kursinformationen verstehen']],
  text:'Dix conseils pour progresser en français. 1. {Écoutez|hören, vous, Imperativ|imperatif} la radio française le matin. 2. {Notez|notieren, vous, Imperativ|imperatif} quelques mots nouveaux chaque jour. 3. Ne {traduisez|übersetzen, vous, verneint|imperatif} pas chaque mot. 4. {Soyez|sein, vous, Imperativ|imperatif} patient avec vous-même. 5. {Ayez|haben, vous, Imperativ|imperatif} toujours un petit carnet. 6. Il {faut|müssen (il …)|conseil} parler le plus souvent possible. 7. On vous recommande {de|zu (recommander …)|conseil} lire des bandes dessinées. 8. Cherchez les mots qui {ressemblent|ähneln, sie|conseil} à votre langue. 9. Si possible, {suivez|besuchen (Kurs), vous|cours} un cours en France. Un cours intensif {dure|dauern, er|cours} souvent deux semaines. On peut habiter dans une famille d’{accueil|Gast- (famille d’…)|cours} et prendre ses {repas|Mahlzeiten|cours} avec elle. 10. N’ayez pas {peur|Angst|conseil} de faire des fautes : c’est normal !',
  listen:[
   {text:'Pour vous inscrire au cours du soir, envoyez-nous le formulaire avant le quinze septembre. Les cours commencent le premier octobre, le mardi et le jeudi, de dix-neuf heures à vingt et une heures.',voice:'female',
    q:[['Avant quelle date faut-il s’inscrire ?','avant le 15 septembre',['avant le 15 septembre','avant le 1er octobre','avant le 5 septembre'],'cours'],['Quels jours ont lieu les cours ?','le mardi et le jeudi',['le mardi et le jeudi','le lundi et le mercredi','le jeudi seulement'],'comprendre'],['À quelle heure commencent-ils ? Réponds en chiffres.','19',null,'cours']]},
   {turns:[['A','Comment tu as appris l’espagnol si vite ?'],['B','J’ai regardé beaucoup de séries en version originale.'],['A','Avec des sous-titres ?'],['B','Au début, oui. Et j’ai parlé avec des collègues tous les jours. N’aie pas peur, essaie !']],voices:{A:'female',B:'male'},
    q:[['Qu’est-ce qu’il a regardé ?','des séries en version originale',['des séries en version originale','des films doublés','des cours en ligne'],'conseil'],['Avec qui a-t-il parlé ?','avec des collègues',['avec des collègues','avec sa famille','avec un professeur'],'comprendre'],['Quel conseil donne-t-il ?','N’aie pas peur, essaie !',['N’aie pas peur, essaie !','Prends un professeur !','Lis des livres !'],'imperatif']]}
  ],
  writing:{situation:'Un nouveau collègue français veut apprendre l’allemand. Écris-lui un e-mail avec des conseils.',points:['Donne-lui trois conseils au futur ou à l’impératif.','Dis-lui ce qu’il ne faut pas faire.','Conseille-lui un cours ou une école.'],
   model:'Cher Arnaud,\nVoici mes conseils pour apprendre l’allemand. Écoute la radio allemande dans la voiture. Note cinq mots nouveaux par jour dans un carnet. Parle avec nous à la pause café ! Ne traduis pas chaque mot, essaie de comprendre le sens. Il y a un bon cours du soir à l’université populaire, le lundi et le mercredi.\nBon courage !\nKatrin'}
 },
 words:[['notez','notieren Sie','write down'],['ne traduisez pas','übersetzen Sie nicht','don’t translate'],['soyez / ayez','seien Sie / haben Sie','be / have'],['recommander de','empfehlen zu','to recommend'],['suivre un cours','einen Kurs besuchen','to take a course'],['s’inscrire','sich anmelden','to enrol'],['la famille d’accueil','die Gastfamilie','host family'],['la faute','der Fehler','mistake']],
 vocab:[['le conseil','der Rat, der Tipp'],['noter','notieren'],['traduire','übersetzen'],['ressembler à','ähneln'],['recommander','empfehlen'],['la faute','der Fehler'],['la peur','die Angst'],['l’école de langues (f.)','die Sprachschule'],['le cours intensif','der Intensivkurs'],['s’inscrire','sich anmelden'],['durer','dauern'],['la famille d’accueil','die Gastfamilie']]
},
{
 id:22,
 phrases:[
  ['Chers amis,','Liebe Freunde,'],
  ['J’espère que vous allez bien.','Ich hoffe, es geht euch gut.'],
  ['Je vous écris parce que j’ai besoin de votre aide.','Ich schreibe euch, weil ich eure Hilfe brauche.'],
  ['Je voudrais suivre un cours de français à Paris.','Ich möchte einen Französischkurs in Paris besuchen.'],
  ['Est-ce que vous pourriez chercher une école de langues ?','Könntet ihr eine Sprachschule suchen?'],
  ['Vous connaissez une famille où je pourrais habiter ?','Kennt ihr eine Familie, bei der ich wohnen könnte?'],
  ['Le cours serait du 3 au 28 juillet.','Der Kurs wäre vom 3. bis 28. Juli.'],
  ['Merci d’avance pour votre réponse.','Danke im Voraus für eure Antwort.'],
  ['J’ai hâte de vous revoir.','Ich freue mich darauf, euch wiederzusehen.'],
  ['Je vous embrasse,','Liebe Grüße,']
 ],
 quiz:[
  ['Wie beginnst du einen Brief an mehrere Freunde?',['Chers amis,','Cher amis,','Mesdames, Messieurs,'],'Chers amis,','Cher richtet sich nach den Empfängern: chers (m. Pl. / gemischt).'],
  ['Est-ce que vous ___ chercher une école ? (könntet)',['pourriez','pouvez','pourrez'],'Est-ce que vous pourriez chercher une école de langues ?','Conditionnel von pouvoir = höfliche Bitte: vous pourriez.'],
  ['Was bedeutet „Merci d’avance“?',['Danke im Voraus','Danke für früher','Danke vielmals'],'Merci d’avance pour votre réponse.','D’avance = im Voraus.'],
  ['Welche Grußformel passt an Freunde?',['Je vous embrasse,','Veuillez agréer mes salutations distinguées.','Salutations commerciales,'],'Je vous embrasse,','Je t’embrasse / je vous embrasse, bises = herzliche Grüße an Freunde.'],
  ['Je vous écris ___ j’ai besoin de votre aide.',['parce que','pourtant','donc'],'Je vous écris parce que j’ai besoin de votre aide.','Parce que nennt den Grund des Schreibens.'],
  ['Was bedeutet „J’ai hâte de vous revoir“?',['Ich freue mich darauf, euch wiederzusehen.','Ich habe keine Zeit, euch zu sehen.','Ich habe euch eilig gesehen.'],'J’ai hâte de vous revoir.','Avoir hâte de = es kaum erwarten können.'],
  ['Le cours ___ du 3 au 28 juillet. (wäre)',['serait','sera','était'],'Le cours serait du 3 au 28 juillet.','Conditionnel von être: serait.'],
  ['Vous connaissez une famille ___ je pourrais habiter ?',['où','que','qui'],'Vous connaissez une famille où je pourrais habiter ?','Où als Relativpronomen für einen Ort.'],
  ['Je voudrais ___ un cours de français.',['suivre','suivi','suis'],'Je voudrais suivre un cours de français à Paris.','Nach je voudrais steht der Infinitiv.'],
  ['Was bedeutet „J’espère que vous allez bien“?',['Ich hoffe, es geht euch gut.','Ich hoffe, ihr kommt gut an.','Ich hoffe, ihr geht gern.'],'J’espère que vous allez bien.','Aller bien = gut gehen (Befinden).']
 ],
 dialogue:['Je dois écrire une lettre à mes amis parisiens.','Pour quoi faire ?','Je voudrais suivre un cours de français à Paris en juillet.','Demande-leur s’ils pourraient chercher une école.','Oui, et aussi une famille où je pourrais habiter.','N’oublie pas : « Chers amis » au début et « Je vous embrasse » à la fin !'],
 pron:['pourriez / pouvez','Vous pourriez [puʁje] (könntet) und vous pouvez [puve] (könnt) unterscheiden sich durch das r und die Endung -iez. Höfliche Bitten sprichst du mit steigender Melodie.'],
 transfer:['Erkläre einem Partner, was in einen persönlichen Brief gehört (Anrede, Grund, Bitten, Gruß), und formuliere zwei höfliche Bitten.','Schreibe einen Brief an Freunde in Frankreich: Du möchtest einen Sprachkurs machen. Behandle drei Punkte (Schule, Termine, Preis, Unterkunft, Essen, Stadtbesichtigung) mit Anrede und Grußformel.'],
 domains:['Schriftliche Produktion','Schriftliche Interaktion'],
 app:{speak:'Chers amis, je vous écris parce que je voudrais suivre un cours de français à Paris en juillet. Est-ce que vous pourriez m’aider à trouver une école de langues ? Vous connaissez peut-être une famille où je pourrais habiter ? Merci d’avance, je vous embrasse !',
  write:'Chers Paul et Marie,\nJ’espère que vous allez bien. Je voudrais suivre un cours de français à Paris du 3 au 28 juillet. Est-ce que vous pourriez chercher une école de langues pour moi ? Vous connaissez aussi une famille où je pourrais habiter ? Et combien coûte un cours, à peu près ?\nMerci d’avance !\nJe vous embrasse,\nLaura',
  placeholder:'Schreibe deinen Brief (ca. 50 Wörter) …',help:'Anrede, Grund des Schreibens, drei Punkte als höfliche Fragen, Dank und Grußformel.',
  hints:[['Chers amis, / Chère Anne,','Liebe Freunde, / Liebe Anne,'],['Est-ce que vous pourriez … ?','Könntet ihr …?'],['Merci d’avance. Je vous embrasse,','Danke im Voraus. Liebe Grüße,']]},
 goals:['Einen persönlichen Brief mit passender Anrede und Grußformel schreiben.','Drei Punkte einer Anfrage verständlich behandeln.','Höfliche Bitten mit dem Conditionnel formulieren (pourriez, voudrais, aimerais) und Sätze mit et, mais, parce que verbinden.'],
 units:[
  {title:'Höfliche Bitten mit dem Conditionnel',rule:'Das Conditionnel macht Bitten höflich. Bildung: Futurstamm + Imparfait-Endungen: je pourrais, tu pourrais, vous pourriez; je voudrais; j’aimerais; ce serait. Typische Bitten: Est-ce que tu pourrais / vous pourriez + Infinitiv ? Je voudrais savoir … J’aimerais bien …',
   pairs:[['Est-ce que tu pourrais m’aider ?','Könntest du mir helfen?'],['Vous pourriez chercher une école ?','Könntet ihr eine Schule suchen?'],['Je voudrais savoir le prix.','Ich würde gern den Preis wissen.'],['J’aimerais habiter dans une famille.','Ich würde gern bei einer Familie wohnen.'],['Ce serait super !','Das wäre super!']],
   emphasis:['Conditionnel','pourrais','pourriez','voudrais','aimerais','serait']},
  {title:'Aufbau eines persönlichen Briefs',rule:'Anrede: Cher Paul, / Chère Anne, / Chers amis, (Komma). Einstieg: J’espère que tu vas bien. Grund: Je t’écris / Je vous écris parce que … Dann die drei Punkte, verbunden mit et, mais, parce que, aussi. Schluss: Merci d’avance, J’ai hâte de te voir. Gruß: Je t’embrasse, / Bises, / À bientôt, + Name. Für telc zählen Inhalt der drei Punkte und die Briefform.',
   pairs:[['Chère Anne,','Liebe Anne,'],['J’espère que tu vas bien.','Ich hoffe, es geht dir gut.'],['Je t’écris parce que j’ai une question.','Ich schreibe dir, weil ich eine Frage habe.'],['Merci d’avance pour ton aide.','Danke im Voraus für deine Hilfe.'],['Bises, à bientôt !','Küsschen, bis bald!']],
   emphasis:['Cher','Chère','Chers','Je t’écris parce que','et','mais','parce que','Merci d’avance','Je t’embrasse']}
 ],
 tasks:[
  [0,'Est-ce que tu ___ m’aider ? (könntest)','pourrais',['pourras','peux'],'Könntest du mir helfen?','Conditionnel'],
  [0,'Vous ___ chercher une école ? (könntet)','pourriez',['pourrez','pouvez'],'Könntet ihr eine Schule suchen?','Conditionnel'],
  [0,'Je ___ savoir le prix. (vouloir, höflich)','voudrais',['voudrai','veux'],'Ich würde gern den Preis wissen.','Conditionnel'],
  [0,'J’___ habiter dans une famille. (aimer, würde)','aimerais',['aimerai','aimais'],'Ich würde gern bei einer Familie wohnen.','Conditionnel'],
  [0,'Ce ___ super ! (être, wäre)','serait',['sera','était'],'Das wäre super!','Conditionnel'],
  [1,'___ Anne, (Anrede)','Chère',['Cher','Chers'],'Liebe Anne,','Anrede','Anne ist eine Frau → Chère.'],
  [1,'J’espère que tu ___ bien.','vas',['es','fais'],'Ich hoffe, es geht dir gut.','Einstieg'],
  [1,'Je t’écris ___ j’ai une question.','parce que',['pourtant','donc'],'Ich schreibe dir, weil ich eine Frage habe.','Grund','Parce que nennt den Grund; donc nennt eine Folge, pourtant einen Gegensatz.'],
  [1,'Merci d’___ pour ton aide.','avance',['avant','abord'],'Danke im Voraus für deine Hilfe.','Schluss'],
  [1,'Je t’___, Laura','embrasse',['embrassé','embrasses'],'Liebe Grüße, Laura','Gruß']
 ],
 check:[
  ['Schreibauftrag telc: drei von sechs Punkten. Du hast Anrede, Schule und Termine geschrieben, aber keinen Gruß. Was fehlt laut Bewertung?',['die passende Grußformel am Ende','ein vierter Punkt','eine Unterschrift mit Adresse'],'Die Briefform (Anrede und Grußformel) wird eigens bewertet.','forme'],
  ['Du bittest deine Freunde höflich, eine Schule zu suchen.',['Est-ce que vous pourriez chercher une école pour moi ?','Est-ce que vous pouvez chercher moi une école ?','Cherchez une école, vite !'],'Vous pourriez + Infinitiv = höfliche Bitte.','demande','Est-ce que vous pourriez chercher une école pour moi ?'],
  ['Welche Anrede passt für deinen Freund Luc?',['Cher Luc,','Chère Luc,','Chers Luc,'],'Ein Mann → Cher.','cher','Cher Luc,'],
  ['Du möchtest wissen, ob man in einer Familie wohnen kann.',['Est-ce que je pourrais habiter dans une famille ?','Est-ce que je pourrai habité dans une famille ?','Est-ce que je pourrais habiter dans un famille ?'],'Je pourrais + Infinitiv; la famille ist weiblich.','famille','Est-ce que je pourrais habiter dans une famille ?'],
  ['Welcher Schluss passt zu einem Brief an Freunde?',['Merci d’avance ! Je vous embrasse, Laura','Veuillez agréer mes salutations distinguées.','Cordialement, Laura Weber'],'Je vous embrasse = herzliche Grüße an Freunde. Veuillez agréer … und Cordialement sind für formelle Briefe.','salutation'],
  ['Du nennst den Zeitraum deines Kurses.',['Le cours serait du 3 au 28 juillet.','Le cours serait de 3 à 28 juillet.','Le cours serait depuis le 3 jusqu’au 28 juillet.'],'Du … au … = vom … bis zum … Depuis heißt seit und passt nicht zu einem Zeitraum in der Zukunft.','dates','Le cours serait du 3 au 28 juillet.'],
  ['Du fragst nach dem Preis.',['Est-ce que vous savez combien coûte un cours ?','Est-ce que vous savez combien un cours coûtes ?','Est-ce que vous savez combien coûte-t-il un cours ?'],'Combien coûte + Nomen. Nach est-ce que vous savez steht keine Inversion; coûtes ist die du-Form.','prix','Est-ce que vous savez combien coûte un cours ?'],
  ['Du verbindest zwei Gedanken: Ich möchte bei einer Familie wohnen, aber nicht zu weit vom Zentrum.',['J’aimerais habiter dans une famille, mais pas trop loin du centre.','J’aimerais habiter dans une famille, parce que pas trop loin du centre.','J’aimerais habiter dans une famille, donc pas trop loin du centre.'],'Mais = aber, für eine Einschränkung. Parce que nennt einen Grund, donc eine Folge.','mais','J’aimerais habiter dans une famille, mais pas trop loin du centre.']
 ],
 transfers:[
  ['pourrais','Tu ___ venir me chercher à la gare ? (pouvoir, Conditionnel)','pourrais','Bitte einen Freund höflich, dich abzuholen.'],
  ['pourriez','Vous ___ m’envoyer des informations ? (pouvoir, Conditionnel)','pourriez','Bitte höflich um Informationen.'],
  ['voudrais','Je ___ réserver une chambre. (vouloir, Conditionnel)','voudrais','Du möchtest höflich ein Zimmer reservieren.'],
  ['chere','___ Julie, (Anrede)','Chère','Begrüße deine Freundin Julie im Brief.'],
  ['ecrire','Je vous ___ parce que j’ai une question. (écrire)','écris','Du schreibst, weil du eine Frage hast.'],
  ['avance','Merci d’___ ! (im Voraus)','avance','Danke im Voraus!'],
  ['embrasse','Je t’___, Marc (Grußformel)','embrasse','Beende den Brief an eine Freundin.']
 ],
 comp:{voices:{A:'female',B:'male'},turns:[
  ['A','Tu as reçu la lettre de Laura ?'],['B','Oui, elle veut suivre un cours de français à Paris en juillet.'],
  ['A','Elle nous demande de chercher une école ?'],['B','Oui, et elle aimerait habiter dans une famille, près du métro.'],
  ['A','On pourrait demander à nos voisins, les Martin. Ils ont une chambre libre.'],['B','Bonne idée. Elle demande aussi le prix des repas.'],
  ['A','Et elle voudrait visiter la ville avec nous le premier week-end.'],['B','Avec plaisir ! Je lui réponds ce soir.']],
  fields:[['Laura möchte',['einen Sprachkurs in Paris','in Paris arbeiten','in Paris Urlaub machen']],['Wann',['im Juli','im Juni','im August']],['Wohnwunsch',['Familie in Metro-Nähe','Hotel im Zentrum','eigene Wohnung']],['Idee für Unterkunft',['die Nachbarn Martin','eine Jugendherberge','bei ihnen selbst']],['Weitere Frage',['Preis der Mahlzeiten','Preis des Kurses','Öffnungszeiten']],['Erstes Wochenende',['Stadtbesichtigung','Ausflug ans Meer','Museumstag']]]},
 intro:['Est-ce que vous pourriez chercher une école de langues ?',['Est-ce que vous pouvez chercher une école de langues ?','Est-ce que vous pourriez chercher une école de danse ?']],
 hard:{
  obj:[['lettre','Briefform: Anrede und Gruß'],['politesse','Höfliche Bitten im Conditionnel'],['contenu','Drei Punkte behandeln'],['comprendre','Eine Antwort verstehen']],
  text:'{Chers|Anrede, Plural|lettre} Sophie et Julien, j’espère que vous {allez|gehen (Befinden), vous|lettre} bien. Je vous {écris|schreiben, je|lettre} parce que j’ai une grande envie : je {voudrais|möchte (Conditionnel)|politesse} suivre un cours de français à Paris cet été. Le cours {serait|wäre (être)|politesse} du 6 au 31 juillet. Est-ce que vous {pourriez|könntet (pouvoir)|politesse} chercher une bonne école de langues près de chez vous ? J’{aimerais|würde gern (aimer)|politesse} aussi habiter dans une famille, {mais|aber|contenu} pas trop loin du centre. Vous savez combien {coûte|kosten, er|contenu} un cours intensif ? Je pourrais prendre mes repas à la cantine de l’école ou avec la famille. Le premier week-end, ce {serait|wäre (être)|politesse} super de visiter la ville avec vous, {parce que|weil|contenu} je ne connais pas Paris. Merci d’{avance|Voraus (d’…)|lettre} pour votre aide ! J’ai {hâte|es kaum erwarten (avoir … de)|lettre} de vous revoir. Je vous {embrasse|umarmen (Gruß)|lettre}, Laura',
  listen:[
   {text:'Chère Laura, merci pour ta lettre ! Nous avons trouvé une école près de la Bastille : le cours intensif coûte six cents euros pour quatre semaines. Nos voisins peuvent te loger. À bientôt ! Sophie',voice:'female',
    q:[['Où se trouve l’école ?','près de la Bastille',['près de la Bastille','près de la tour Eiffel','à la gare du Nord'],'contenu'],['Combien coûte le cours ? Réponds en chiffres.','600',null,'contenu'],['Qui peut loger Laura ?','les voisins',['les voisins','Sophie','l’école'],'comprendre']]},
   {turns:[['A','Tu pourrais relire ma lettre pour l’examen ?'],['B','Bien sûr. Tu as mis une formule au début ?'],['A','Oui, « Chers amis ». Mais j’ai oublié la fin.'],['B','Alors ajoute « Je vous embrasse » et ton prénom.']],voices:{A:'male',B:'female'},
    q:[['Qu’est-ce que l’homme demande ?','de relire sa lettre',['de relire sa lettre','d’écrire sa lettre','de poster sa lettre'],'politesse'],['Qu’est-ce qu’il a oublié ?','la formule de fin',['la formule de fin','la formule du début','la date'],'lettre'],['Que doit-il ajouter ?','« Je vous embrasse » et son prénom',['« Je vous embrasse » et son prénom','« Cordialement » et son nom','« Salut » et son adresse'],'lettre']]}
  ],
  writing:{situation:'Tu aimerais faire un cours de français en France. Écris une courte lettre à des amis qui habitent à Paris et demande-leur de l’aide. Traite trois points au choix : école, dates, prix, logement dans une famille, repas, découverte de la ville.',points:['Commence par une formule adéquate et dis pourquoi tu écris.','Traite trois des six points avec des questions polies.','Termine par un remerciement et une formule adéquate.'],
   model:'Chers Paul et Anne,\nJ’espère que vous allez bien. Je vous écris parce que je voudrais suivre un cours de français à Paris du 4 au 29 août. Est-ce que vous pourriez chercher une école de langues pour moi ? J’aimerais aussi habiter dans une famille française, parce que je veux parler beaucoup. Et le premier week-end, est-ce qu’on pourrait visiter la ville ensemble ?\nMerci d’avance ! Je vous embrasse,\nNora',minWords:40,targetWords:60}
 },
 words:[['Cher / Chère / Chers …,','Lieber / Liebe …,','Dear …,'],['je vous écris parce que','ich schreibe euch, weil','I’m writing because'],['est-ce que vous pourriez … ?','könntet ihr …?','could you …?'],['je voudrais','ich möchte','I would like'],['merci d’avance','danke im Voraus','thanks in advance'],['j’ai hâte de','ich freue mich auf','I can’t wait to'],['je vous embrasse','liebe Grüße','love'],['la formule','die Formel','formula']],
 vocab:[['la lettre','der Brief'],['cher / chère','lieb, in der Anrede'],['l’aide (f.)','die Hilfe'],['l’école de langues (f.)','die Sprachschule'],['chercher','suchen'],['loger','unterbringen'],['les repas (m.)','die Mahlzeiten'],['la visite','die Besichtigung'],['d’avance','im Voraus'],['avoir hâte de','sich freuen auf'],['embrasser','umarmen, küssen'],['la réponse','die Antwort']]
},
{
 id:23,
 phrases:[
  ['Je l’ai toujours sur moi.','Ich habe es immer bei mir.'],
  ['Je ne vais jamais au cinéma seul.','Ich gehe nie allein ins Kino.'],
  ['On fête ça ensemble ?','Feiern wir das zusammen?'],
  ['Quelquefois, je travaille le samedi.','Manchmal arbeite ich samstags.'],
  ['La boulangerie est près de la gare.','Die Bäckerei ist in der Nähe des Bahnhofs.'],
  ['Le café est à côté de la poste.','Das Café ist neben der Post.'],
  ['Le vélo est contre le mur.','Das Fahrrad steht an der Wand.'],
  ['Paris ? J’y vais demain.','Paris? Ich fahre morgen hin.'],
  ['Du thé ? J’en bois souvent.','Tee? Den trinke ich oft.'],
  ['Mes parents ? Je leur téléphone chaque dimanche.','Meine Eltern? Ich rufe sie jeden Sonntag an.']
 ],
 quiz:[
  ['Mon portable ? ___ ai toujours sur moi.',['Je l’','Je lui','J’en'],'Je l’ai toujours sur moi.','Direktes Objekt (le portable) → le, vor Vokal l’. Lui ersetzt à + Person, en eine Menge.'],
  ['Je ne vais ___ au cinéma seul. (nie)',['jamais','toujours','quelquefois'],'Je ne vais jamais au cinéma seul.','Ne … jamais = nie.'],
  ['On fête ça ___ ? (zusammen)',['ensemble','chacune','quelquefois'],'On fête ça ensemble ?','Ensemble = zusammen.'],
  ['La boulangerie est ___ la gare. (in der Nähe)',['près de','contre','à côté'],'La boulangerie est près de la gare.','Près de = in der Nähe von. À côté braucht auch de.'],
  ['Le café est à côté ___ la poste.',['de','à','par'],'Le café est à côté de la poste.','À côté de = neben.'],
  ['Le vélo est ___ le mur. (an, angelehnt)',['contre','près','chez'],'Le vélo est contre le mur.','Contre = gegen, an (berührend).'],
  ['Paris ? ___ vais demain.',['J’y','J’en','Je la'],'Paris ? J’y vais demain.','Y ersetzt einen Ort mit à / en / dans: J’y vais.'],
  ['Du thé ? ___ bois souvent.',['J’en','J’y','Je lui'],'Du thé ? J’en bois souvent.','En ersetzt du / de la / des + Nomen. Y steht für Orte, lui für Personen.'],
  ['Mes parents ? Je ___ téléphone chaque dimanche.',['leur','les','lui'],'Je leur téléphone chaque dimanche.','Téléphoner à + Personen → leur.'],
  ['___, je travaille le samedi. (manchmal)',['Quelquefois','Toujours','Jamais'],'Quelquefois, je travaille le samedi.','Quelquefois = manchmal.']
 ],
 dialogue:['Tu as ton portable ?','Oui, je l’ai toujours sur moi.','Tu vas à la fête de Marc ?','Oui, j’y vais avec Léa. On y va ensemble ?','D’accord. Tu lui as acheté un cadeau ?','Pas encore. Il y a une librairie à côté de la gare.'],
 pron:['j’y vais / j’en ai','J’y vais [ʒivɛ] und j’en ai [ʒɑ̃ne] klingen ähnlich kurz – achte auf den Nasal bei en. Bei Pronomen vor Vokal wird gebunden: on‿y va [ɔ̃niva], les‿ai [lezɛ].'],
 transfer:['Beantworte Fragen deines Partners mit Pronomen statt Nomen (le / lui / y / en) und nenne, wie oft du etwas tust.','Schreibe fünf kurze Antworten auf Fragen und ersetze jedes Mal das Nomen durch ein Pronomen.'],
 domains:['Schriftliche Rezeption','Schriftliche Produktion','Mündliche Interaktion'],
 app:{speak:'Mon portable ? Je l’ai toujours sur moi. Le marché ? J’y vais quelquefois le samedi. Du café ? J’en bois deux tasses le matin. Ma sœur ? Je lui téléphone souvent. Et je ne vais jamais au travail en voiture : la boulangerie est près de chez moi, mon bureau aussi !',
  write:'Mon vélo ? Je le prends tous les jours.\nLa piscine ? J’y vais le mercredi.\nDes fruits ? J’en mange beaucoup.\nMes amis ? Je leur écris souvent.',
  placeholder:'Antworte mit Pronomen …',help:'Ersetze das Nomen durch le / la / les, lui / leur, y oder en.',
  hints:[['… ? Je le / la / les …','… ? Ich … ihn / sie …'],['… ? J’y vais …','… ? Ich gehe / fahre … hin.'],['… ? J’en …','… ? Ich … davon …']]},
 goals:['In einem Text die passenden Pronomen, Präpositionen und Adverbien erkennen und einsetzen.','le / la / les, lui / leur, y und en unterscheiden.','Ortsangaben (près de, à côté de, en face de, contre) und Häufigkeitsadverbien (toujours, jamais, quelquefois, ensemble) richtig verwenden.'],
 units:[
  {title:'Welches Pronomen? le, lui, y, en',rule:'Frage dich, was ersetzt wird: Direktes Objekt ohne Präposition → le / la / les (Je le prends). Person mit à → lui / leur (Je lui téléphone). Ort mit à / en / dans → y (J’y vais). Menge mit du / de la / des oder Zahl → en (J’en bois). Alle stehen vor dem konjugierten Verb.',
   pairs:[['Le train ? Je le prends à huit heures.','Den Zug? Ich nehme ihn um acht.'],['Ma mère ? Je lui écris.','Meine Mutter? Ich schreibe ihr.'],['Lyon ? Nous y habitons.','Lyon? Wir wohnen dort.'],['Des pommes ? J’en achète trois.','Äpfel? Ich kaufe drei.'],['Les clés ? Je les ai oubliées.','Die Schlüssel? Ich habe sie vergessen.']],
   emphasis:['le / la / les','lui / leur','y','en','vor dem konjugierten Verb']},
  {title:'Präpositionen und kleine Adverbien',rule:'Ort: près de (in der Nähe), loin de (weit), à côté de (neben), en face de (gegenüber), contre (an, gegen). De + le = du: à côté du cinéma. Häufigkeit: toujours (immer), souvent (oft), quelquefois (manchmal), ne … jamais (nie). Ensemble = zusammen, chacun / chacune = jeder / jede.',
   pairs:[['J’habite près du parc.','Ich wohne in der Nähe des Parks.'],['La pharmacie est en face de l’église.','Die Apotheke ist gegenüber der Kirche.'],['Je suis toujours à l’heure.','Ich bin immer pünktlich.'],['Nous mangeons souvent ensemble.','Wir essen oft zusammen.'],['Je ne fume jamais.','Ich rauche nie.']],
   emphasis:['près de','à côté de','en face de','contre','du','toujours','souvent','quelquefois','ne … jamais','ensemble']}
 ],
 tasks:[
  [0,'Le train ? Je ___ prends à huit heures.','le',['lui','y'],'Den Zug? Ich nehme ihn um acht.','Pronomen'],
  [0,'Ma mère ? ___ écris.','Je lui',['Je l’','J’en'],'Meine Mutter? Ich schreibe ihr.','Pronomen','Écrire à quelqu’un → lui. Je l’écris hieße „ich schreibe es“.'],
  [0,'Lyon ? Nous ___ habitons.','y',['en','lui'],'Lyon? Wir wohnen dort.','Pronomen','Y ersetzt einen Ort: nous y habitons.'],
  [0,'Des pommes ? ___ achète trois.','J’en',['Je les','J’y'],'Äpfel? Ich kaufe drei.','Pronomen','Mit einer Menge (trois) steht en: j’en achète trois.'],
  [0,'Les clés ? ___ ai oubliées.','Je les',['Je leur','J’en'],'Die Schlüssel? Ich habe sie vergessen.','Pronomen','Direktes Objekt im Plural → les; deshalb auch oubliées mit -es.'],
  [0,'Mes amis ? Je ___ envoie une carte.','leur',['les','lui'],'Meinen Freunden? Ich schicke ihnen eine Karte.','Pronomen'],
  [1,'J’habite près ___ parc.','du',['de le','au'],'Ich wohne in der Nähe des Parks.','Präposition','De + le = du.'],
  [1,'La pharmacie est en face ___ l’église.','de',['à','du'],'Die Apotheke ist gegenüber der Kirche.','Präposition'],
  [1,'Je suis ___ à l’heure. (immer)','toujours',['jamais','quelquefois'],'Ich bin immer pünktlich.','Adverb'],
  [1,'Je ne fume ___. (nie)','jamais',['toujours','souvent'],'Ich rauche nie.','Adverb']
 ],
 check:[
  ['Lückentext: « Appelle-moi sur mon portable, je l’ai ___ sur moi. » Welches Wort passt?',['toujours','jamais','pendant'],'Wer das Handy dabeihat, hat es immer bei sich.','toujours','Je l’ai toujours sur moi.'],
  ['Lückentext: « Il faut absolument qu’on fête ça ___. »',['ensemble','chacune','quelquefois'],'Zusammen feiern = fêter ensemble.','ensemble','Il faut absolument qu’on fête ça ensemble.'],
  ['« Tu as trouvé un travail, et ___ chez toi en plus ! » (in der Nähe)',['près de','contre','à côté'],'Près de chez toi = in deiner Nähe. À côté fehlt hier de.','pres','Tu as trouvé un travail, et près de chez toi en plus !'],
  ['Antwort auf « Tu vas souvent à la piscine ? »',['Oui, j’y vais le mardi.','Oui, j’en vais le mardi.','Oui, je la vais le mardi.'],'Ort → y.','y','Oui, j’y vais le mardi.'],
  ['Antwort auf « Tu bois du café ? »',['Oui, j’en bois le matin.','Oui, je bois en le matin.','Oui, j’y bois le matin.'],'Du café → en.','en','Oui, j’en bois le matin.'],
  ['Antwort auf « Tu parles à ton voisin ? »',['Oui, je lui parle souvent.','Oui, je le parle souvent.','Oui, je leur parle souvent.'],'Parler à + eine Person → lui.','lui','Oui, je lui parle souvent.'],
  ['« La banque est à côté de la mairie. » Wo ist die Bank?',['neben dem Rathaus','gegenüber dem Rathaus','im Rathaus'],'À côté de = neben.','acote'],
  ['Du sagst, dass du nie allein reist.',['Je ne voyage jamais seul.','Je voyage ne jamais seul.','Je ne voyage pas jamais seul.'],'Ne … jamais umschließt das Verb.','jamais','Je ne voyage jamais seul.']
 ],
 transfers:[
  ['le','Ce film ? Je ___ ai vu hier.','l’','Den Film hast du gestern gesehen.'],
  ['lui','Ton frère ? Je ___ donne le livre demain.','lui','Deinem Bruder gibst du morgen das Buch.'],
  ['y','Le marché ? J’___ vais le samedi.','y','Auf den Markt gehst du samstags.'],
  ['en','Du pain ? J’___ achète deux.','en','Brot kaufst du zwei.'],
  ['leur','Tes parents ? Tu ___ écris souvent ?','leur','Schreibst du deinen Eltern oft?'],
  ['pres','J’habite ___ de l’école. (in der Nähe)','près','Du wohnst in der Nähe der Schule.'],
  ['quelquefois','___, nous mangeons au restaurant. (manchmal)','Quelquefois','Manchmal esst ihr im Restaurant.']
 ],
 comp:{voices:{A:'female',B:'male'},turns:[
  ['A','Tu connais la nouvelle librairie ?'],['B','Oui, elle est à côté de la boulangerie, en face de la mairie.'],
  ['A','Tu y vas souvent ?'],['B','Quelquefois, le samedi. J’y achète des BD pour mon fils.'],
  ['A','Il en lit beaucoup ?'],['B','Oh oui, il en lit trois par semaine ! Il ne regarde jamais la télé.'],
  ['A','Et tes parents, ils lisent ?'],['B','Mon père, toujours. Je lui offre un livre à chaque anniversaire.']],
  fields:[['Lage der Buchhandlung',['neben der Bäckerei','neben der Post','neben dem Rathaus']],['Gegenüber',['dem Rathaus','der Bäckerei','der Kirche']],['Wie oft geht er hin',['manchmal samstags','jeden Tag','jeden Sonntag']],['Comics pro Woche',['drei','zwei','dreizehn']],['Fernsehen beim Sohn',['nie','oft','manchmal']],['Geschenk für den Vater',['ein Buch','eine Uhr','eine DVD']]]},
 intro:['Paris ? J’y vais demain.',['Paris ? J’y vais dimanche.','Paris ? J’en viens demain.']],
 hard:{
  obj:[['pronom','Pronomen le / lui / y / en'],['prep','Präpositionen des Ortes'],['adverbe','Adverbien der Häufigkeit'],['comprendre','Einen Text mit Pronomen verstehen']],
  text:'Chère Inès, merci pour ton message ! Ton nouveau travail est {près|in der Nähe (… de)|prep} de chez toi, c’est génial. Il faut qu’on fête ça {ensemble|zusammen|adverbe} ! Tu connais le petit restaurant {à|neben (… côté de)|prep} côté de la gare ? J’{y|dort (Ort)|pronom} vais quelquefois avec mes collègues. Le chef ? Je {le|ihn (direktes Objekt)|pronom} connais bien. Ses desserts ? J’{en|davon (Menge)|pronom} mange toujours deux ! Je ne suis {jamais|nie|adverbe} déçue. On pourrait y aller samedi. Ta sœur ? Tu peux {lui|ihr (à + Person)|pronom} demander de venir aussi. Mes parents ? Je {leur|ihnen (à + Personen)|pronom} ai déjà parlé de toi. Appelle-moi sur mon portable : je l’ai {toujours|immer|adverbe} sur moi. Mon vélo est {contre|an (angelehnt)|prep} le mur devant le restaurant, tu le verras. Le restaurant est en {face|gegenüber (en … de)|prep} de la poste. {Quelquefois|manchmal|adverbe}, il y a de la musique le samedi. Bises, Clara',
  listen:[
   {text:'Mon quartier est très pratique. La boulangerie est en face de chez moi et le supermarché est à côté de l’école. Le parc ? J’y cours tous les matins. Je ne prends jamais la voiture.',voice:'male',
    q:[['Où est la boulangerie ?','en face de chez lui',['en face de chez lui','à côté de l’école','loin de chez lui'],'prep'],['Que fait-il au parc ?','Il y court.',['Il y court.','Il y lit.','Il y travaille.'],'pronom'],['Est-ce qu’il prend souvent la voiture ?','Non, jamais.',['Non, jamais.','Oui, toujours.','Quelquefois.'],'adverbe']]},
   {turns:[['A','Tu as vu mes lunettes ?'],['B','Oui, je les ai vues sur la table, à côté du téléphone.'],['A','Et ma veste ?'],['B','Elle est contre la porte. Tu la mets toujours là !']],voices:{A:'female',B:'male'},
    q:[['Où sont les lunettes ?','sur la table, à côté du téléphone',['sur la table, à côté du téléphone','sous la table, à côté du téléphone','sur la table, à côté de la porte'],'prep'],['Où est la veste ?','contre la porte',['contre la porte','sur la chaise','dans l’armoire'],'prep'],['Que dit l’homme ?','Elle la met toujours là.',['Elle la met toujours là.','Elle ne la met jamais là.','Il l’a cachée.'],'adverbe']]}
  ],
  writing:{situation:'Un ami français va habiter dans ton quartier. Écris-lui un e-mail pour le présenter.',points:['Décris où sont trois endroits utiles (près de, à côté de, en face de).','Dis ce que tu y fais et combien de fois (avec y et un adverbe).','Propose de faire quelque chose ensemble.'],
   model:'Salut Hugo,\nBienvenue dans le quartier ! La boulangerie est juste en face de ton immeuble. Le marché est à côté de la mairie : j’y vais toujours le samedi matin. Il y a aussi une piscine près de la gare ; j’y nage quelquefois le soir. Le petit café du coin ? J’y bois souvent un café. On pourrait y aller ensemble dimanche !\nÀ bientôt,\nMax'}
 },
 words:[['le / la / les','ihn / sie / sie','him / her / them'],['lui / leur','ihm, ihr / ihnen','to him, her / them'],['y','dort, dorthin','there'],['en','davon','some, of it'],['près de','in der Nähe von','near'],['à côté de','neben','next to'],['contre','an, gegen','against'],['quelquefois','manchmal','sometimes']],
 vocab:[['toujours','immer'],['jamais','nie'],['quelquefois','manchmal'],['souvent','oft'],['ensemble','zusammen'],['près de','in der Nähe von'],['à côté de','neben'],['contre','gegen, an'],['loin de','weit weg von'],['chacun / chacune','jeder / jede'],['la librairie','die Buchhandlung'],['le mur','die Wand']]
},
{
 id:24,
 phrases:[
  ['L’examen écrit commence par les éléments langagiers.','Die schriftliche Prüfung beginnt mit den Sprachbausteinen.'],
  ['Vous avez quinze minutes pour cette partie.','Sie haben fünfzehn Minuten für diesen Teil.'],
  ['Vous entendrez chaque texte deux fois.','Sie hören jeden Text zweimal.'],
  ['Marquez vos réponses sur la feuille de réponse.','Markieren Sie Ihre Antworten auf dem Antwortbogen.'],
  ['Décidez si les phrases sont vraies ou fausses.','Entscheiden Sie, ob die Sätze richtig oder falsch sind.'],
  ['Lisez d’abord les titres, puis les textes.','Lesen Sie zuerst die Überschriften, dann die Texte.'],
  ['Choisissez trois des six points.','Wählen Sie drei der sechs Punkte.'],
  ['N’oubliez pas les formules au début et à la fin.','Vergessen Sie die Formeln am Anfang und am Ende nicht.'],
  ['À l’oral, posez des questions à votre partenaire.','Stellen Sie in der mündlichen Prüfung Ihrem Partner Fragen.'],
  ['Il faut au moins soixante points pour réussir.','Man braucht mindestens sechzig Punkte zum Bestehen.']
 ],
 quiz:[
  ['Womit beginnt die schriftliche Prüfung telc Français A2?',['mit den Éléments langagiers','mit dem Hörverstehen','mit dem Brief'],'L’examen écrit commence par les éléments langagiers.','Reihenfolge: Éléments langagiers – Hören – Lesen – Schreiben.'],
  ['Wie oft hörst du jeden Text?',['zweimal','einmal','dreimal'],'Vous entendrez chaque texte deux fois.','Im Hörverstehen hört man jeden Text zweimal.'],
  ['Was bedeutet „la feuille de réponse“?',['der Antwortbogen','das Aufgabenheft','das Wörterbuch'],'Marquez vos réponses sur la feuille de réponse.','Nur Antworten auf dem Antwortbogen zählen.'],
  ['Wie viele Punkte brauchst du zum Bestehen?',['60 von 100','50 von 100','70 von 100'],'Il faut au moins soixante points pour réussir.','Bestanden ab 60 Punkten; ab 90 „très bien“.'],
  ['Wie viele Punkte des Briefs musst du behandeln?',['drei von sechs','alle sechs','zwei von sechs'],'Choisissez trois des six points.','Drei Punkte + Briefform werden bewertet (4 × 3 Punkte).'],
  ['Wie lange dauert das Leseverstehen?',['30 Minuten','15 Minuten','20 Minuten'],'Compréhension de textes écrits : 30 minutes.','Éléments langagiers 15, Hören ca. 20, Lesen 30, Schreiben 15 Minuten.'],
  ['Was bedeutet „vrai ou faux“?',['richtig oder falsch','wahr oder gelogen','leicht oder schwer'],'Décidez si les phrases sont vraies ou fausses.','Auf dem Bogen: + für vrai, − für faux.'],
  ['Wie markierst du „richtig“ auf dem Antwortbogen?',['mit +','mit −','mit x'],'Marquez PLUS pour vrai.','+ = vrai, − = faux.'],
  ['Was zählt im mündlichen Teil 2?',['Informationen austauschen und Fragen stellen','einen kurzen Vortrag über sich halten','einen Text vorlesen und zusammenfassen'],'À l’oral, posez des questions à votre partenaire.','Teil 2: Échanger des informations.'],
  ['Wie lange dauert die Vorbereitung auf die mündliche Prüfung?',['15 Minuten','5 Minuten','30 Minuten'],'Vous avez quinze minutes pour vous préparer.','15 Minuten Vorbereitung, ca. 10 Minuten Prüfung.']
 ],
 dialogue:['Tu passes l’examen telc A2 samedi ?','Oui ! D’abord les éléments langagiers, puis l’écoute et la lecture.','Et l’expression écrite ?','Une lettre : trois points sur six, avec les formules.','Et l’oral ?','À deux : on se présente, on échange des informations et on se met d’accord.'],
 pron:['vrai / faux','Vrai [vʁɛ] und faux [fo] kommen in Anweisungen oft vor. Bei deux fois [døfwa] wird nicht gebunden. Sprich in der mündlichen Prüfung lieber langsam und deutlich als schnell.'],
 transfer:['Erkläre einem Mitlernenden in eigenen Worten den Ablauf der Prüfung telc Français A2 (Teile, Zeiten, Punkte).','Schreibe dir drei persönliche Strategien für den Prüfungstag auf.'],
 domains:['Schriftliche Rezeption','Mündliche Interaktion','Schriftliche Produktion'],
 app:{speak:'L’examen telc Français A2 a une partie écrite et une partie orale. À l’écrit, il y a d’abord les éléments langagiers, ensuite la compréhension orale, la compréhension écrite et une lettre. À l’oral, on se présente, on échange des informations et on se met d’accord sur deux activités. Il faut soixante points pour réussir.',
  write:'Mes stratégies :\nJe lis d’abord les questions.\nJe cherche les mots-clés dans le texte.\nJe traite trois points dans ma lettre.\nJe n’oublie pas les formules.',
  placeholder:'Schreibe deine Strategien …',help:'Formuliere drei bis vier Sätze mit je oder il faut.',
  hints:[['Je lis d’abord …','Ich lese zuerst …'],['Je cherche …','Ich suche …'],['Je n’oublie pas …','Ich vergesse … nicht.']]},
 goals:['Aufbau, Zeiten und Punkte der Prüfung telc Français A2 kennen.','Prüfungsanweisungen auf Französisch verstehen.','Strategien für richtig/falsch, Zuordnung, Lückentext, Brief und Gespräch anwenden.'],
 units:[
  {title:'Die schriftliche Prüfung',rule:'1. Éléments langagiers (15 Min.): Teil 1 Lückentext mit a, b, c (10 Items, je 0,5 P.), Teil 2 Wörter aus einem Kasten in Dialoge einsetzen (8 Items, je 1 P.). 2. Compréhension orale (ca. 20 Min.): drei Teile richtig/falsch, jeder Text zweimal, je 2 P. 3. Compréhension écrite (30 Min.): Text–Titel zuordnen, richtig/falsch, Situation–Textabschnitt zuordnen, je 2 P. 4. Expression écrite (15 Min.): Brief mit drei von sechs Punkten plus Anrede und Gruß (max. 12 P.).',
   pairs:[['Lisez le texte et décidez quel mot manque.','Lesen Sie den Text und entscheiden Sie, welches Wort fehlt.'],['Vous n’utiliserez un mot qu’une seule fois.','Sie verwenden jedes Wort nur einmal.'],['Vous entendrez chaque texte deux fois.','Sie hören jeden Text zweimal.'],['Décidez quel texte correspond à quel titre.','Entscheiden Sie, welcher Text zu welcher Überschrift passt.'],['Vous avez quinze minutes pour écrire votre lettre.','Sie haben fünfzehn Minuten für Ihren Brief.']],
   emphasis:['Éléments langagiers','Compréhension orale','Compréhension écrite','Expression écrite','deux fois','trois von sechs']},
  {title:'Die mündliche Prüfung und Strategien',rule:'Mündlich (ca. 10 Min., 15 Min. Vorbereitung, meist zu zweit): Teil 1 Faire connaissance – sich vorstellen, Zusatzfragen beantworten. Teil 2 Échanger des informations – zu 2–3 Themen Fragen stellen und antworten (wo? wann? mit wem?). Teil 3 Se mettre d’accord – Vorschläge machen, begründen, sich auf zwei Aktivitäten einigen. Strategien: Aufgabe zuerst lesen, Schlüsselwörter suchen, bei richtig/falsch auf Verneinungen und Zahlen achten, im Gespräch aktiv nachfragen.',
   pairs:[['Pouvez-vous nous parler de vous ?','Können Sie uns etwas über sich erzählen?'],['Posez des questions ! Échangez vos informations !','Stellen Sie Fragen! Tauschen Sie Informationen aus!'],['Faites des propositions ! Donnez vos raisons !','Machen Sie Vorschläge! Begründen Sie!'],['Mettez-vous d’accord sur deux activités.','Einigen Sie sich auf zwei Aktivitäten.'],['Pardon, vous pouvez répéter ?','Entschuldigung, können Sie das wiederholen?']],
   emphasis:['Faire connaissance','Échanger des informations','Se mettre d’accord','Schlüsselwörter','Verneinungen','Zahlen']}
 ],
 tasks:[
  [0,'Vous entendrez chaque texte deux ___.','fois',['temps','heures'],'Sie hören jeden Text zweimal.','Anweisung'],
  [0,'Marquez vos réponses sur la ___ de réponse.','feuille',['page','fiche'],'Markieren Sie Ihre Antworten auf dem Antwortbogen.','Anweisung'],
  [0,'Décidez si les phrases sont vraies ou ___.','fausses',['faux','fautes'],'Entscheiden Sie, ob die Sätze richtig oder falsch sind.','Anweisung','Les phrases ist weiblich Plural → fausses.'],
  [0,'Vous n’utiliserez un mot qu’une ___ fois.','seule',['seul','même'],'Sie verwenden jedes Wort nur einmal.','Anweisung'],
  [0,'Choisissez trois ___ six points.','des',['de','sur'],'Wählen Sie drei der sechs Punkte.','Anweisung'],
  [1,'Pouvez-vous nous parler ___ vous ?','de',['à','sur'],'Können Sie uns etwas über sich erzählen?','mündlich'],
  [1,'___ des questions à votre partenaire. (poser)','Posez',['Posez-vous','Poser'],'Stellen Sie Ihrem Partner Fragen.','mündlich'],
  [1,'Mettez-vous d’___ sur deux activités.','accord',['avis','idée'],'Einigen Sie sich auf zwei Aktivitäten.','mündlich'],
  [1,'Faites des ___ ! (Vorschläge)','propositions',['questions','réponses'],'Machen Sie Vorschläge!','mündlich'],
  [1,'Pardon, vous pouvez ___ ?','répéter',['répondre','reporter'],'Entschuldigung, können Sie das wiederholen?','Strategie']
 ],
 check:[
  ['Richtig/falsch-Aufgabe: Satz: « Romain viendra au dîner. » Text: « Désolé, je ne pourrai pas venir demain. » Was markierst du?',['− (faux)','+ (vrai)','nichts'],'Je ne pourrai pas venir widerspricht dem Satz.','vraifaux'],
  ['Hörtext: « Le kilo de pommes à deux euros ; le fromage à douze euros le kilo. » Satz: « Les pommes coûtent douze euros le kilo. »',['− (faux)','+ (vrai)','nicht entscheidbar'],'Zwölf Euro gehören zum Käse, nicht zu den Äpfeln.','chiffres'],
  ['Strategie im Leseteil 1 (vier Texte, acht Titel): Was machst du zuerst?',['die Texte lesen und das Hauptthema suchen','alle Wörter übersetzen','den längsten Titel wählen'],'Laut Anweisung: erst die Texte, dann die Titel.','titres'],
  ['Im Brief schreibst du drei Punkte, aber keine Anrede und keinen Gruß. Was passiert?',['Du verlierst Punkte bei der Briefform.','Nichts, nur der Inhalt zählt.','Der ganze Brief zählt 0 Punkte.'],'Die Configuration communicative (Anrede/Gruß) wird eigens bewertet.','forme'],
  ['Mündlich Teil 3: Dein Partner sagt nur « Oui ». Was zeigt Initiative?',['einen eigenen Vorschlag machen und begründen','schweigen und warten','die Prüferin fragen, was sie denkt'],'Bewertet wird, ob du aktiv beiträgst: Fragen, Vorschläge, Begründungen.','initiative'],
  ['Du hast eine Frage im Gespräch nicht verstanden.',['Pardon, vous pouvez répéter, s’il vous plaît ?','Je ne parle pas français.','Je passe à la question suivante.'],'Nachfragen ist erlaubt und zeigt Interaktion.','repeter','Pardon, vous pouvez répéter, s’il vous plaît ?'],
  ['Sprachbausteine Teil 2: Jedes Wort aus dem Kasten …',['… benutzt man nur einmal.','… kann man mehrmals benutzen.','… muss man übersetzen.'],'Vous n’utiliserez un mot qu’une seule fois.','unefois'],
  ['Du hast 72 Punkte. Welches Ergebnis ist das?',['assez bien (bestanden)','bien','nicht bestanden'],'70–79,5 Punkte = assez bien.','note']
 ],
 transfers:[
  ['fois','Vous entendrez les annonces deux ___.','fois','Anweisung im Hörverstehen.'],
  ['feuille','Écrivez vos réponses sur la ___ de réponse, pas dans le cahier.','feuille','Wo schreibst du die Antworten hin?'],
  ['vrai','Les phrases 1 et 3 sont ___, la phrase 2 est fausse. (richtig)','vraies','Ergänze die Lösung.'],
  ['points','Traitez trois des six ___ dans votre lettre.','points','Anweisung im Brief.'],
  ['accord','Discutez et mettez-vous d’___ sur un cadeau.','accord','Anweisung im mündlichen Teil 3.'],
  ['poser','___ trois questions à l’examinatrice ! (poser)','Posez','Anweisung im mündlichen Teil 2.'],
  ['soixante','Il faut au moins ___ points pour réussir. (Zahl in Worten)','soixante','Wie viele Punkte braucht man zum Bestehen?']
 ],
 comp:{voices:{A:'female',B:'male'},turns:[
  ['A','Bonjour à tous. Nous commençons l’examen par les éléments langagiers. Vous avez quinze minutes.'],['A','Ensuite, la compréhension orale : vous entendrez chaque texte deux fois.'],
  ['B','Excusez-moi, on écrit les réponses dans le livret ?'],['A','Non, sur la feuille de réponse, avec un crayon.'],
  ['A','Après l’écoute, vous avez trente minutes pour la lecture.'],['A','À la fin, vous écrivez une lettre en quinze minutes.'],
  ['B','Et l’oral, c’est quand ?'],['A','Cet après-midi, à deux, avec quinze minutes de préparation.']],
  fields:[['Erster Teil',['Éléments langagiers','Hörverstehen','Brief']],['Zeit dafür',['15 Minuten','20 Minuten','30 Minuten']],['Hörtexte hört man',['zweimal','einmal','dreimal']],['Antworten auf',['den Antwortbogen','das Aufgabenheft','ein Extrablatt']],['Lesen',['30 Minuten','15 Minuten','45 Minuten']],['Mündliche Prüfung',['nachmittags zu zweit','morgens allein','am nächsten Tag']]]},
 intro:['Vous entendrez chaque texte deux fois.',['Vous entendrez chaque texte une fois.','Vous lirez chaque texte deux fois.']],
 hard:{
  obj:[['format','Aufbau der Prüfung'],['consigne','Anweisungen verstehen'],['strategie','Prüfungsstrategien'],['comprendre','Prüfungsinformationen verstehen']],
  text:'Votre examen telc Français A2. L’examen écrit commence par les éléments {langagiers|Sprach- (éléments …)|format}. Vous avez quinze {minutes|Minuten|format} pour cette partie. Dans la partie 2, vous n’utiliserez un mot qu’une {seule|einzige (une … fois)|consigne} fois. Ensuite, vous {entendrez|hören, Futur, vous|consigne} chaque texte deux {fois|Mal|consigne}. Décidez si les phrases sont {vraies|richtig, Plural f.|consigne} ou fausses. {Marquez|markieren, vous, Imperativ|consigne} vos réponses sur la feuille de réponse. Pour la lecture, vous avez {trente|dreißig|format} minutes. Dans la lettre, choisissez {trois|drei|format} des six points et n’oubliez pas les {formules|Formeln|strategie} au début et à la fin. À l’oral, vous parlez avec un {partenaire|Partner|format}. Posez des {questions|Fragen|strategie} et faites des propositions. Si vous ne comprenez pas, demandez : « Vous pouvez {répéter|wiederholen|strategie} ? » Il faut au moins {soixante|sechzig|format} points pour réussir. Bonne chance !',
  listen:[
   {text:'Bonjour. Nous allons commencer la partie trois. Vous et votre partenaire voulez passer dimanche ensemble. Faites des propositions, donnez vos raisons et mettez-vous d’accord sur deux activités.',voice:'female',
    q:[['Quelle partie commence ?','la partie trois',['la partie trois','la partie un','la partie deux'],'format'],['Qu’est-ce qu’il faut faire ?','se mettre d’accord sur deux activités',['se mettre d’accord sur deux activités','présenter son partenaire','raconter ses vacances'],'consigne'],['Pour quel jour ?','dimanche',['dimanche','samedi','lundi'],'comprendre']]},
   {turns:[['A','Tu as eu combien de points ?'],['B','Quatre-vingt-trois ! Et toi ?'],['A','Soixante-quatre. C’est juste, mais j’ai réussi !'],['B','Bravo ! Moi, j’ai « bien ».']],voices:{A:'male',B:'female'},
    q:[['Combien de points a la femme ? Réponds en chiffres.','83',null,'format'],['Est-ce que l’homme a réussi ?','Oui, avec 64 points.',['Oui, avec 64 points.','Non, il lui manque des points.','Oui, avec 74 points.'],'format'],['Quelle note a la femme ?','bien',['bien','très bien','passable'],'strategie']]}
  ],
  writing:{situation:'Un ami français passe bientôt un examen d’allemand. Écris-lui un message avec tes conseils d’examen.',points:['Explique comment tu prépares un examen.','Donne deux conseils pour le jour de l’examen.','Souhaite-lui bonne chance et propose de fêter le résultat.'],
   model:'Salut Lucas,\nTon examen d’allemand, c’est samedi ? Moi, je me prépare toujours avec des tests d’entraînement. Le jour de l’examen, lis d’abord les questions, puis cherche les mots importants dans le texte. Dans la lettre, n’oublie pas les formules au début et à la fin ! Bonne chance ! Après l’examen, on pourrait fêter ça au café.\nBises,\nElena'}
 },
 words:[['les éléments langagiers','die Sprachbausteine','language elements'],['la compréhension orale','das Hörverstehen','listening comprehension'],['la compréhension écrite','das Leseverstehen','reading comprehension'],['l’expression écrite','der schriftliche Ausdruck','written production'],['vrai / faux','richtig / falsch','true / false'],['la feuille de réponse','der Antwortbogen','answer sheet'],['se mettre d’accord','sich einigen','to agree'],['réussir','bestehen','to pass']],
 vocab:[['l’examen (m.)','die Prüfung'],['l’épreuve (f.)','der Prüfungsteil'],['la consigne','die Anweisung'],['vrai / vraie','richtig, wahr'],['faux / fausse','falsch'],['la feuille de réponse','der Antwortbogen'],['le point','der Punkt'],['réussir','bestehen'],['le partenaire / la partenaire','der Partner / die Partnerin'],['se mettre d’accord','sich einigen'],['l’écoute (f.)','das Hören'],['la lecture','das Lesen']]
}
];
