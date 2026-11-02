/* Français A2, lessons 1–6. Compact source; see tools/build-francais-a2.cjs for the format.
   Options are written correct answer first; the build shuffles them deterministically. */
module.exports=[
{
 id:1,
 phrases:[
  ['Je m’appelle Sophie Martin, j’ai trente-quatre ans.','Ich heiße Sophie Martin, ich bin 34 Jahre alt.'],
  ['Je suis mariée et j’ai deux enfants.','Ich bin verheiratet und habe zwei Kinder.'],
  ['Je suis célibataire.','Ich bin ledig.'],
  ['J’habite 12, rue des Lilas, à Strasbourg.','Ich wohne in der Rue des Lilas 12 in Straßburg.'],
  ['Je travaille comme infirmière dans un hôpital.','Ich arbeite als Krankenpflegerin in einem Krankenhaus.'],
  ['Je parle allemand, anglais et un peu français.','Ich spreche Deutsch, Englisch und ein bisschen Französisch.'],
  ['J’apprends le français depuis deux ans.','Ich lerne seit zwei Jahren Französisch.'],
  ['Pendant mon temps libre, je fais de la randonnée.','In meiner Freizeit wandere ich.'],
  ['Depuis quand habitez-vous ici ?','Seit wann wohnen Sie hier?'],
  ['Qu’est-ce que vous faites dans la vie ?','Was machen Sie beruflich?']
 ],
 quiz:[
  ['Was bedeutet „Je suis célibataire“?',['Ich bin ledig.','Ich bin verheiratet.','Ich bin geschieden.'],'Je suis célibataire.','Célibataire heißt ledig, marié(e) verheiratet, divorcé(e) geschieden.'],
  ['Wie sagst du „Ich lerne seit zwei Jahren Französisch“?',['J’apprends le français depuis deux ans.','J’ai appris le français il y a deux ans.','J’apprends le français pendant deux ans.'],'J’apprends le français depuis deux ans.','Für etwas, das noch andauert, steht im Französischen das Präsens mit depuis. Il y a bedeutet „vor“.'],
  ['Sophie ist verheiratet. Welche Form ist richtig?',['Je suis mariée.','Je suis marié.','Je suis mariés.'],'Je suis mariée.','Eine Frau schreibt mariée mit -e. Gesprochen klingen marié und mariée gleich.'],
  ['Was fragt „Qu’est-ce que vous faites dans la vie ?“?',['Was machen Sie beruflich?','Was machen Sie am Wochenende?','Wo wohnen Sie?'],'Qu’est-ce que vous faites dans la vie ?','Dans la vie steht hier für den Beruf. Für die Freizeit fragt man: Qu’est-ce que vous faites le week-end ?'],
  ['Je travaille ___ infirmière.',['comme','pour','depuis'],'Je travaille comme infirmière.','Travailler comme + Beruf: als … arbeiten. Der Beruf steht ohne Artikel.'],
  ['Welche Frage passt zu „Depuis trois ans.“?',['Depuis quand habitez-vous ici ?','Où habitez-vous ?','Avec qui habitez-vous ?'],'Depuis quand habitez-vous ici ?','Depuis quand …? fragt nach dem Beginn bis heute; die Antwort beginnt ebenfalls mit depuis.'],
  ['Was bedeutet „Pendant mon temps libre“?',['In meiner Freizeit','Während meiner Arbeit','In meinem Urlaub'],'Pendant mon temps libre, je fais de la randonnée.','Le temps libre ist die Freizeit; les vacances sind die Ferien.'],
  ['Wie nennst du deine Adresse richtig?',['J’habite 12, rue des Lilas.','J’habite à la 12 rue des Lilas.','J’habite dans 12, rue des Lilas.'],'J’habite 12, rue des Lilas.','Vor einer Hausnummer mit Straße steht keine Präposition: J’habite 12, rue …'],
  ['J’ai deux ___ : un fils et une fille.',['enfants','frères','parents'],'J’ai deux enfants : un fils et une fille.','Un fils und une fille sind des enfants. Les parents sind die Eltern.'],
  ['Welche Antwort passt zu „Vous parlez quelles langues ?“',['Je parle allemand et un peu français.','Je suis allemande et française.','J’habite en Allemagne.'],'Je parle allemand et un peu français.','Nach den Sprachen fragt quelles langues; die Antwort nutzt parler + Sprache.']
 ],
 dialogue:['Bonjour, je m’appelle Sophie. Et vous ?','Je m’appelle Marc. Vous habitez ici depuis longtemps ?','Depuis cinq ans. Je travaille comme infirmière à l’hôpital.','Moi, je suis professeur. Vous êtes mariée ?','Oui, et j’ai deux enfants. Et vous ?','Je suis célibataire. Pendant mon temps libre, je joue de la guitare.'],
 pron:['depuis / deux ans','Bei deux ans wird das x als [z] gebunden: deu-z‿ans. Bei depuis spricht man das s am Ende nicht. Sprich die Angaben zu deiner Person in kurzen Gruppen mit kleiner Pause.'],
 transfer:['Stelle dich mit Name, Alter, Familienstand, Wohnort, Beruf, Sprachen und Hobbys vor und stelle zwei Fragen zurück.','Schreibe eine kurze Vorstellung von dir mit fünf Angaben und einer Angabe mit depuis.'],
 domains:['Mündliche Produktion','Mündliche Interaktion','Schriftliche Produktion'],
 app:{speak:'Je m’appelle Sophie Martin, j’ai trente-quatre ans. Je suis mariée et j’ai deux enfants. J’habite à Strasbourg depuis cinq ans. Je travaille comme infirmière. Je parle allemand, anglais et un peu français. Pendant mon temps libre, je fais de la randonnée. Et vous, qu’est-ce que vous faites dans la vie ?',
  write:'Je m’appelle Sophie Martin et j’ai trente-quatre ans. Je suis mariée et j’ai deux enfants. J’habite à Strasbourg depuis cinq ans. Je travaille comme infirmière. J’apprends le français depuis deux ans.',
  placeholder:'Stelle dich in fünf Sätzen vor …',help:'Nutze die Satzmuster und ersetze die Angaben durch deine eigenen.',
  hints:[['J’habite à … depuis … ans.','Ich wohne seit … Jahren in …'],['Je travaille comme …','Ich arbeite als …'],['Pendant mon temps libre, je …','In meiner Freizeit …']]},
 goals:['Sich mit Familienstand, Adresse, Beruf, Sprachen und Hobbys ausführlich vorstellen.','Mit depuis + Präsens sagen, seit wann etwas andauert.','Zusatzfragen der Prüferin oder des Partners verstehen und beantworten.'],
 units:[
  {title:'Seit wann? – depuis + Präsens',rule:'Wenn etwas in der Vergangenheit begonnen hat und heute noch andauert, benutzt das Französische das Präsens mit depuis: J’habite ici depuis cinq ans. Im Deutschen sagt man ebenfalls „seit“. Il y a bedeutet dagegen „vor“ und steht mit einer abgeschlossenen Handlung: Je suis arrivé il y a cinq ans. Fragen: Depuis quand …? oder Depuis combien de temps …?',
   pairs:[['J’habite à Strasbourg depuis cinq ans.','Ich wohne seit fünf Jahren in Straßburg.'],['Je travaille ici depuis 2019.','Ich arbeite hier seit 2019.'],['J’apprends le français depuis deux ans.','Ich lerne seit zwei Jahren Französisch.'],['Depuis quand êtes-vous mariée ?','Seit wann sind Sie verheiratet?'],['Je suis arrivé il y a trois ans.','Ich bin vor drei Jahren angekommen.']],
   emphasis:['depuis','Präsens','il y a','Depuis quand','Depuis combien de temps']},
  {title:'Angaben zur Person',rule:'Familienstand: je suis célibataire, marié(e), divorcé(e). Bei einer Frau bekommt das Adjektiv ein -e: Je suis mariée. Beruf: je suis infirmier / infirmière oder je travaille comme … – jeweils ohne Artikel. Sprachen stehen mit parler: Je parle anglais.',
   pairs:[['Je suis divorcé.','Ich bin geschieden.'],['Elle est mariée.','Sie ist verheiratet.'],['Je suis infirmier.','Ich bin Krankenpfleger.'],['Il travaille comme cuisinier.','Er arbeitet als Koch.'],['Nous parlons espagnol à la maison.','Wir sprechen zu Hause Spanisch.']],
   emphasis:['célibataire','marié(e)','divorcé(e)','ohne Artikel','parler']}
 ],
 tasks:[
  [0,'J’habite ici ___ cinq ans.','depuis',['il y a','pendant'],'Ich wohne seit fünf Jahren hier.','depuis'],
  [0,'Je suis arrivé ___ trois ans.','il y a',['depuis','dans'],'Ich bin vor drei Jahren angekommen.','il y a'],
  [0,'J’___ le français depuis deux ans.','apprends',['ai appris','apprenais'],'Ich lerne seit zwei Jahren Französisch.','depuis','Was heute noch andauert, steht mit depuis im Präsens: J’apprends le français depuis deux ans.'],
  [0,'___ quand travaillez-vous ici ?','Depuis',['Il y a','Pendant'],'Seit wann arbeiten Sie hier?','depuis'],
  [0,'Elle ___ à Lyon depuis 2020.','habite',['a habité','habitait'],'Sie wohnt seit 2020 in Lyon.','depuis','Sie wohnt heute noch dort, deshalb Präsens: Elle habite à Lyon depuis 2020.'],
  [1,'Sophie : « Je suis ___. »','mariée',['marié','mariés'],'Sophie: „Ich bin verheiratet.“','Familienstand','Sophie ist eine Frau, deshalb mariée.'],
  [1,'Je travaille ___ cuisinier.','comme',['pour','en'],'Ich arbeite als Koch.','Beruf'],
  [1,'Il est ___ : il n’est pas marié.','célibataire',['divorcé','veuf'],'Er ist ledig: er ist nicht verheiratet.','Familienstand','Célibataire = noch nie verheiratet. Divorcé = geschieden.'],
  [1,'Je ___ allemand et anglais.','parle',['suis','dis'],'Ich spreche Deutsch und Englisch.','Sprachen','Sprachen sprechen: parler + Sprache. Je suis allemand hieße „Ich bin Deutscher“; dire heißt sagen.'],
  [1,'Marc est ___ : il travaille à l’hôpital.','infirmier',['infirmière','un infirmier'],'Marc ist Krankenpfleger: er arbeitet im Krankenhaus.','Beruf','Nach être steht der Beruf ohne Artikel; für einen Mann infirmier.']
 ],
 check:[
  ['Die Prüferin fragt: « Vous êtes mariée ? » Du bist nicht verheiratet und warst es nie.',['Non, je suis célibataire.','Non, je suis divorcée.','Oui, je suis mariée.'],'Célibataire = ledig, noch nie verheiratet. Divorcée hieße geschieden.','famille','Non, je suis célibataire.'],
  ['« J’habite à Lille depuis quatre ans. » Was stimmt?',['Die Person wohnt noch heute in Lille.','Die Person ist vor vier Jahren aus Lille weggezogen.','Die Person zieht in vier Jahren nach Lille.'],'Depuis + Präsens: etwas dauert bis heute an.','depuis'],
  ['Du möchtest wissen, seit wann dein Partner Französisch lernt.',['Depuis quand apprenez-vous le français ?','Quand avez-vous appris le français ?','Pourquoi apprenez-vous le français ?'],'Depuis quand …? fragt nach dem Beginn bis heute.','question','Depuis quand apprenez-vous le français ?'],
  ['« Je suis arrivé en France il y a deux ans. » Was bedeutet il y a hier?',['vor','seit','in'],'Il y a + Zeitraum bedeutet „vor“ und steht mit dem passé composé.','ilya'],
  ['Du sagst, dass du als Verkäufer arbeitest.',['Je travaille comme vendeur.','Je travaille comme un vendeur.','Je travaille pour vendeur.'],'Travailler comme + Beruf ohne Artikel.','metier','Je travaille comme vendeur.'],
  ['Die Prüferin fragt: « Qu’est-ce que vous faites pendant votre temps libre ? » Welche Antwort passt?',['Je fais du vélo et je lis beaucoup.','Je travaille dans un bureau.','J’habite près de la gare.'],'Temps libre = Freizeit; gefragt sind Hobbys.','loisirs'],
  ['« Mon mari et moi, nous avons trois enfants : deux filles et un fils. » Wie viele Söhne hat die Familie?',['einen','zwei','drei'],'Un fils = ein Sohn; deux filles = zwei Töchter.','enfants'],
  ['Du nennst deine Adresse.',['J’habite 8, rue Victor Hugo.','J’habite à 8, rue Victor Hugo.','J’habite dans la 8 rue Victor Hugo.'],'Vor Hausnummer und Straße steht keine Präposition.','adresse','J’habite 8, rue Victor Hugo.']
 ],
 transfers:[
  ['depuis','J’habite à Bordeaux ___ six ans.','depuis','Du wohnst seit sechs Jahren in Bordeaux.'],
  ['depuis','Je joue au tennis ___ dix ans.','depuis','Du spielst seit zehn Jahren Tennis.'],
  ['present','J’___ le français depuis un an. (apprendre)','apprends','Du lernst seit einem Jahr Französisch. Setze die passende Form ein.'],
  ['present','Nous ___ ici depuis 2018. (travailler)','travaillons','Ihr arbeitet seit 2018 hier. Setze die passende Form ein.'],
  ['ilya','Elle est partie ___ deux jours.','il y a','Sie ist vor zwei Tagen abgereist.'],
  ['etat','Claire est ___ : elle a un mari. (marié)','mariée','Claire ist verheiratet. Achte auf die weibliche Form.'],
  ['metier','Il travaille ___ professeur.','comme','Er arbeitet als Lehrer.'],
  ['question','___ quand habitez-vous à Paris ?','Depuis','Frage, seit wann jemand in Paris wohnt.']
 ],
 comp:{voices:{A:'female',B:'male'},turns:[
  ['A','Bonjour, vous pouvez vous présenter, s’il vous plaît ?'],['B','Oui. Je m’appelle Karim Benali, j’ai quarante et un ans.'],
  ['A','Vous êtes marié ?'],['B','Oui, je suis marié et nous avons une fille de huit ans.'],
  ['A','Et qu’est-ce que vous faites dans la vie ?'],['B','Je travaille comme mécanicien dans un garage à Nantes.'],
  ['A','Vous habitez à Nantes depuis longtemps ?'],['B','Depuis douze ans. Le week-end, je fais du football avec des amis.']],
  fields:[['Alter',['41','31','44']],['Familienstand',['verheiratet','ledig','geschieden']],['Kind',['eine Tochter von 8 Jahren','ein Sohn von 8 Jahren','zwei Töchter']],['Beruf',['Mechaniker','Koch','Lehrer']],['In Nantes seit',['12 Jahren','2 Jahren','20 Jahren']],['Hobby am Wochenende',['Fußball','Radfahren','Tennis']]]},
 intro:['J’apprends le français depuis deux ans.',['J’apprends le français depuis douze ans.','J’ai appris le français il y a deux ans.']],
 hard:{
  obj:[['presenter','Sich ausführlich vorstellen'],['depuis','depuis + Präsens anwenden'],['etat','Familienstand und Beruf korrekt nennen'],['comprendre','Eine Vorstellung hörend verstehen']],
  text:'Bonjour ! Je {m’appelle|s’appeler|presenter} Nadia et j’{ai|avoir: Alter|presenter} vingt-neuf ans. Je suis {mariée|verheiratet, weiblich|etat} et j’ai un {fils|Sohn|etat}. J’{habite|habiter|presenter} à Grenoble {depuis|seit|depuis} trois ans. Je {travaille|travailler|etat} {comme|als (Beruf)|etat} pharmacienne. Je {parle|parler|presenter} arabe, français et un peu anglais. J’{apprends|apprendre, andauernd|depuis} l’allemand depuis six mois. Pendant mon {temps|Zeit (Freizeit)|presenter} libre, je fais de la natation. Mon mari {est|être|etat} cuisinier. Il {travaille|travailler|depuis} dans un restaurant depuis 2021. Et vous, {depuis|seit wann|depuis} quand habitez-vous ici ? Qu’est-ce que vous {faites|faire|presenter} dans la vie ?',
  listen:[
   {text:'Bonjour, je m’appelle Thomas Weber. J’ai trente-six ans et je suis divorcé. J’habite à Metz depuis huit ans. Je travaille comme électricien. Je parle allemand et français. Le soir, je fais de la musique.',voice:'male',
    q:[['Quel âge a Thomas ? Réponds en chiffres.','36',null,'comprendre'],['Quelle est la situation de Thomas ?','Il est divorcé.',['Il est divorcé.','Il est marié.','Il est célibataire.'],'etat'],['Depuis combien de temps habite-t-il à Metz ?','depuis huit ans',['depuis huit ans','il y a huit ans','depuis dix-huit ans'],'depuis']]},
   {turns:[['A','Vous êtes étudiante ?'],['B','Non, je travaille comme secrétaire dans une école.'],['A','Depuis quand ?'],['B','Depuis septembre. Avant, j’étais étudiante à Lyon.']],voices:{A:'male',B:'female'},
    q:[['Quel est le métier de la femme ?','secrétaire',['secrétaire','étudiante','professeure'],'etat'],['Depuis quand travaille-t-elle à l’école ?','depuis septembre',['depuis septembre','depuis décembre','il y a un an'],'depuis'],['Qu’est-ce qu’elle faisait avant ?','Elle était étudiante.',['Elle était étudiante.','Elle était secrétaire.','Elle habitait à Paris.'],'comprendre']]}
  ],
  writing:{situation:'Tu t’inscris à un cours de français en France. Écris un petit texte pour te présenter au groupe.',points:['Dis ton nom, ton âge et ta situation de famille.','Dis où tu habites et depuis quand.','Parle de ton métier, de tes langues et de tes loisirs.'],
   model:'Bonjour à tous ! Je m’appelle Anna Keller, j’ai trente et un ans et je suis célibataire. J’habite à Fribourg depuis quatre ans. Je travaille comme graphiste dans une petite entreprise. Je parle allemand et anglais, et j’apprends le français depuis un an. Pendant mon temps libre, je fais du vélo et je cuisine avec des amis. À bientôt !'}
 },
 words:[['célibataire','ledig','single'],['marié / mariée','verheiratet','married'],['divorcé / divorcée','geschieden','divorced'],['depuis','seit','since, for'],['le temps libre','die Freizeit','free time'],['travailler comme …','arbeiten als …','to work as …'],['l’infirmier / l’infirmière','der Krankenpfleger / die Krankenpflegerin','nurse'],['la randonnée','das Wandern','hiking']],
 vocab:[['célibataire','ledig'],['marié / mariée','verheiratet'],['divorcé / divorcée','geschieden'],['depuis','seit'],['il y a (+ Zeit)','vor + Zeitangabe'],['le temps libre','die Freizeit'],['la randonnée','das Wandern'],['l’infirmier / l’infirmière','der Krankenpfleger / die Krankenpflegerin'],['le fils','der Sohn'],['la fille','die Tochter'],['apprendre','lernen'],['la langue','die Sprache']]
},
{
 id:2,
 phrases:[
  ['J’habite dans un appartement de trois pièces.','Ich wohne in einer Dreizimmerwohnung.'],
  ['L’appartement est au deuxième étage.','Die Wohnung liegt im zweiten Stock.'],
  ['Il y a un balcon et une grande cuisine.','Es gibt einen Balkon und eine große Küche.'],
  ['Le salon est très clair.','Das Wohnzimmer ist sehr hell.'],
  ['Mon nouvel appartement est plus grand que l’ancien.','Meine neue Wohnung ist größer als die alte.'],
  ['Le loyer est moins cher qu’avant.','Die Miete ist billiger als vorher.'],
  ['La chambre est aussi calme que le salon.','Das Schlafzimmer ist genauso ruhig wie das Wohnzimmer.'],
  ['C’est près du centre-ville.','Es ist in der Nähe der Innenstadt.'],
  ['Il n’y a pas d’ascenseur.','Es gibt keinen Aufzug.'],
  ['Le quartier est plus animé que le mien.','Das Viertel ist belebter als meines.']
 ],
 quiz:[
  ['Was bedeutet „un appartement de trois pièces“?',['eine Dreizimmerwohnung','eine Wohnung im dritten Stock','eine Wohnung mit drei Bädern'],'J’habite dans un appartement de trois pièces.','Une pièce ist ein Zimmer. Das Stockwerk heißt l’étage.'],
  ['Mon appartement est ___ grand que l’ancien.',['plus','très','le plus'],'Mon appartement est plus grand que l’ancien.','Vergleich: plus + Adjektiv + que = größer als.'],
  ['Was bedeutet „Le loyer est moins cher“?',['Die Miete ist billiger.','Die Miete ist teurer.','Die Miete ist genauso teuer.'],'Le loyer est moins cher qu’avant.','Moins … que = weniger … als; moins cher heißt also billiger.'],
  ['La chambre est aussi calme ___ le salon.',['que','comme','de'],'La chambre est aussi calme que le salon.','Auch beim Gleichheitsvergleich steht que: aussi … que = genauso … wie.'],
  ['Wie sagst du „Es gibt keinen Aufzug“?',['Il n’y a pas d’ascenseur.','Il n’y a pas un ascenseur.','Il n’est pas d’ascenseur.'],'Il n’y a pas d’ascenseur.','Nach der Verneinung wird un / une zu de bzw. d’: pas d’ascenseur.'],
  ['Was ist „le deuxième étage“?',['der zweite Stock','das zweite Zimmer','das Erdgeschoss'],'L’appartement est au deuxième étage.','Das Erdgeschoss heißt le rez-de-chaussée.'],
  ['Welches Wort passt? Le salon est très ___ : il a deux grandes fenêtres.',['clair','sombre','bruyant'],'Le salon est très clair.','Clair = hell; sombre = dunkel; bruyant = laut.'],
  ['Mein Viertel ist besser. Welche Form ist richtig?',['Mon quartier est meilleur.','Mon quartier est plus bon.','Mon quartier est le plus bon.'],'Mon quartier est meilleur.','Bon hat einen eigenen Komparativ: meilleur (besser). Plus bon ist falsch.'],
  ['Was bedeutet „près du centre-ville“?',['in der Nähe der Innenstadt','weit weg von der Innenstadt','mitten in der Innenstadt'],'C’est près du centre-ville.','Près de = in der Nähe von; loin de = weit weg von; de + le = du.'],
  ['Il y a un ___ : on peut manger dehors.',['balcon','couloir','garage'],'Il y a un balcon.','Auf dem Balkon kann man draußen essen; le couloir ist der Flur.']
 ],
 dialogue:['Tu as un nouvel appartement ?','Oui, depuis un mois. Il a trois pièces et un balcon.','Il est plus grand que l’ancien ?','Oui, et le loyer est moins cher.','C’est à quel étage ?','Au quatrième, mais il n’y a pas d’ascenseur !'],
 pron:['plus grand que','Vor einem Konsonanten spricht man plus ohne s: [ply] grand. Achte auf die Bindung in plus‿agréable [plyz]. Que wird kurz und unbetont gesprochen.'],
 transfer:['Beschreibe deine Wohnung (Zimmer, Stockwerk, Lage) und vergleiche sie mit einer früheren Wohnung.','Schreibe vier Sätze über deine Wohnung mit mindestens zwei Vergleichen.'],
 domains:['Mündliche Produktion','Mündliche Interaktion','Schriftliche Produktion'],
 app:{speak:'J’habite dans un appartement de trois pièces au deuxième étage. Il y a une grande cuisine et un balcon. Mon nouvel appartement est plus grand que l’ancien et le loyer est moins cher. Le quartier est aussi calme qu’avant. Et vous, vous habitez où ?',
  write:'J’habite dans un appartement de trois pièces.\nIl est plus grand que l’ancien.\nLe loyer est moins cher qu’avant.\nLe quartier est aussi calme que le centre.',
  placeholder:'Beschreibe deine Wohnung in vier Sätzen …',help:'Nutze je einmal plus … que, moins … que und aussi … que.',
  hints:[['… est plus … que …','… ist …er als …'],['… est moins … que …','… ist weniger … als …'],['… est aussi … que …','… ist genauso … wie …']]},
 goals:['Eine Wohnung mit Zimmern, Stockwerk und Lage beschreiben.','Mit plus / moins / aussi … que vergleichen; meilleur korrekt verwenden.','Fragen zur Wohnung im Gespräch stellen und beantworten.'],
 units:[
  {title:'Vergleichen: plus, moins, aussi … que',rule:'Der Vergleich hat drei Stufen: plus + Adjektiv + que (mehr … als), moins + Adjektiv + que (weniger … als) und aussi + Adjektiv + que (genauso … wie). Das Adjektiv richtet sich nach dem Nomen: La cuisine est plus grande que la salle de bains. Bon wird zu meilleur / meilleure (besser).',
   pairs:[['Mon appartement est plus grand que l’ancien.','Meine Wohnung ist größer als die alte.'],['La cuisine est plus petite que le salon.','Die Küche ist kleiner als das Wohnzimmer.'],['Le loyer est moins cher qu’à Paris.','Die Miete ist billiger als in Paris.'],['La chambre est aussi calme que le salon.','Das Schlafzimmer ist genauso ruhig wie das Wohnzimmer.'],['Ce quartier est meilleur pour les enfants.','Dieses Viertel ist besser für Kinder.']],
   emphasis:['plus','moins','aussi','que','meilleur']},
  {title:'Die Wohnung beschreiben',rule:'Une pièce ist jedes Zimmer, la chambre das Schlafzimmer, le salon das Wohnzimmer. Das Stockwerk steht mit au: au premier étage, au rez-de-chaussée. Was es gibt, sagst du mit il y a; verneint wird un / une zu de: il n’y a pas de garage.',
   pairs:[['L’appartement a quatre pièces.','Die Wohnung hat vier Zimmer.'],['J’habite au rez-de-chaussée.','Ich wohne im Erdgeschoss.'],['Il y a deux chambres.','Es gibt zwei Schlafzimmer.'],['Il n’y a pas de jardin.','Es gibt keinen Garten.'],['La salle de bains est petite.','Das Bad ist klein.']],
   emphasis:['une pièce','la chambre','au','il y a','pas de']}
 ],
 tasks:[
  [0,'Mon appartement est ___ grand que l’ancien. (+)','plus',['moins','aussi'],'Meine Wohnung ist größer als die alte.','Komparativ'],
  [0,'Le loyer est ___ cher qu’avant. (−)','moins',['plus','aussi'],'Die Miete ist billiger als vorher.','Komparativ'],
  [0,'La chambre est ___ calme que le salon. (=)','aussi',['plus','moins'],'Das Schlafzimmer ist genauso ruhig wie das Wohnzimmer.','Komparativ'],
  [0,'La cuisine est plus grande ___ la salle de bains.','que',['comme','de'],'Die Küche ist größer als das Bad.','Komparativ'],
  [0,'Ce quartier est ___ pour les enfants.','meilleur',['plus bon','meilleure'],'Dieses Viertel ist besser für Kinder.','meilleur','Bon → meilleur: Plus bon gibt es nicht. Le quartier ist männlich, deshalb meilleur ohne -e.'],
  [0,'La terrasse est plus ___ que le balcon.','grande',['grand','grands'],'Die Terrasse ist größer als der Balkon.','Angleichung','La terrasse ist weiblich: grande.'],
  [1,'J’habite ___ troisième étage.','au',['à la','dans le'],'Ich wohne im dritten Stock.','Stockwerk'],
  [1,'Il n’y a pas ___ ascenseur.','d’',['un','l’'],'Es gibt keinen Aufzug.','Verneinung'],
  [1,'L’appartement a trois ___ : un salon et deux chambres.','pièces',['étages','fenêtres'],'Die Wohnung hat drei Zimmer.','Wohnung'],
  [1,'___ un grand balcon.','Il y a',['C’est','Il est'],'Es gibt einen großen Balkon.','il y a']
 ],
 check:[
  ['« Avant, mon loyer était de 900 euros. Maintenant, je paie 750 euros. » Welcher Satz stimmt?',['Le loyer est moins cher maintenant.','Le loyer est plus cher maintenant.','Le loyer est aussi cher qu’avant.'],'750 € sind weniger als 900 €: moins cher.','comparer','Le loyer est moins cher maintenant.'],
  ['Die alte Wohnung hatte 50 m², die neue hat 50 m². Welcher Satz passt?',['Le nouvel appartement est aussi grand que l’ancien.','Le nouvel appartement est plus grand que l’ancien.','Le nouvel appartement est moins grand que l’ancien.'],'Gleich groß: aussi … que.','egalite'],
  ['Du findest dein neues Viertel besser.',['Mon nouveau quartier est meilleur.','Mon nouveau quartier est plus bon.','Mon nouveau quartier est plus bien.'],'Bon hat den eigenen Komparativ meilleur.','meilleur','Mon nouveau quartier est meilleur.'],
  ['« Nous habitons au rez-de-chaussée. » Wo wohnt die Familie?',['im Erdgeschoss','im ersten Stock','im Dachgeschoss'],'Le rez-de-chaussée ist das Erdgeschoss.','etage'],
  ['Deine Wohnung hat keinen Balkon.',['Il n’y a pas de balcon.','Il n’y a pas un balcon.','Il y a pas balcon.'],'Nach pas wird un zu de.','negation','Il n’y a pas de balcon.'],
  ['« L’appartement a trois pièces : un salon et deux chambres. » Wie viele Schlafzimmer gibt es?',['zwei','drei','eins'],'Trois pièces = drei Zimmer insgesamt; davon sind deux chambres Schlafzimmer.','pieces'],
  ['Dein Partner fragt in der Prüfung nach deiner Wohnung. Welche Frage stellt er?',['Votre appartement a combien de pièces ?','Votre appartement a combien pièces ?','Votre appartement a combien des pièces ?'],'Nach einer Anzahl fragt combien de + Nomen ohne Artikel: combien de pièces. Ohne de oder mit des ist die Frage falsch.','question'],
  ['Die Küche ist kleiner als das Wohnzimmer.',['La cuisine est plus petite que le salon.','La cuisine est plus petit que le salon.','La cuisine est moins petite que le salon.'],'La cuisine ist weiblich: petite; kleiner = plus petite.','accord','La cuisine est plus petite que le salon.']
 ],
 transfers:[
  ['plus','Paris est ___ grand que Lyon. (+)','plus','Paris ist größer als Lyon.'],
  ['moins','Ce studio est ___ cher que l’appartement. (−)','moins','Diese Einzimmerwohnung ist billiger als die Wohnung.'],
  ['aussi','Ma chambre est ___ claire que le salon. (=)','aussi','Mein Schlafzimmer ist genauso hell wie das Wohnzimmer.'],
  ['que','Le jardin est plus grand ___ la terrasse.','que','Der Garten ist größer als die Terrasse.'],
  ['meilleur','Cette école est ___ que l’autre. (bon, +)','meilleure','Diese Schule ist besser als die andere. Achte auf die weibliche Form.'],
  ['etage','J’habite ___ cinquième étage.','au','Du wohnst im fünften Stock.'],
  ['negation','Il n’y a pas ___ garage.','de','Es gibt keine Garage.']
 ],
 comp:{voices:{A:'female',B:'male'},turns:[
  ['A','Alors, ton nouvel appartement, il te plaît ?'],['B','Oui, beaucoup ! Il a quatre pièces.'],
  ['A','C’est plus grand que ton ancien studio ?'],['B','Oui, beaucoup plus grand. Mais le loyer est aussi plus cher : 850 euros.'],
  ['A','Et c’est à quel étage ?'],['B','Au troisième. Il y a un ascenseur, heureusement.'],
  ['A','Il y a un jardin ?'],['B','Non, il n’y a pas de jardin, mais il y a une grande terrasse.']],
  fields:[['Zimmerzahl',['vier','drei','zwei']],['Im Vergleich zur alten Wohnung',['größer','kleiner','genauso groß']],['Miete',['850 €','750 €','580 €']],['Stockwerk',['dritter Stock','vierter Stock','Erdgeschoss']],['Aufzug',['ja','nein','kaputt']],['Draußen',['eine große Terrasse','ein Garten','ein kleiner Balkon']]]},
 intro:['Mon nouvel appartement est plus grand que l’ancien.',['Mon nouvel appartement est moins grand que l’ancien.','Mon nouvel appartement est aussi grand que l’ancien.']],
 hard:{
  obj:[['decrire','Eine Wohnung beschreiben'],['comparer','plus / moins / aussi … que anwenden'],['ilya','il y a und Verneinung mit de'],['comprendre','Eine Wohnungsbeschreibung hörend verstehen']],
  text:'Depuis mars, j’habite dans un nouvel appartement. Il a trois {pièces|Zimmer|decrire} et il est au {deuxième|zweiter (Stock)|decrire} étage. Il y {a|avoir|ilya} une grande cuisine et un balcon. Il n’y a pas {d’|kein (vor Vokal)|ilya}ascenseur. Mon nouvel appartement est {plus|mehr (+)|comparer} grand que l’ancien. Le loyer est {moins|weniger (−)|comparer} cher qu’avant. La chambre est {aussi|genauso (=)|comparer} calme que le salon. La cuisine est plus {grande|groß, weiblich|comparer} que la salle de bains. Le quartier est {meilleur|besser|comparer} pour les enfants. Il est plus calme {que|als|comparer} le centre-ville. C’est {près|in der Nähe|decrire} du parc. Il n’y a pas {de|kein (vor Konsonant)|ilya} jardin, mais le salon est très {clair|hell|decrire}.',
  listen:[
   {text:'Nous cherchons un appartement de trois pièces près de l’école. Notre appartement actuel est trop petit : il a seulement deux pièces. Nous voulons un loyer de 900 euros maximum.',voice:'female',
    q:[['Combien de pièces cherche la famille ? Réponds en chiffres.','3',null,'decrire'],['Pourquoi la famille cherche un appartement ?','L’appartement actuel est trop petit.',['L’appartement actuel est trop petit.','L’appartement actuel est trop cher.','L’appartement actuel est trop loin.'],'comprendre'],['Quel est le loyer maximum ?','900 euros',['900 euros','800 euros','1 900 euros'],'comprendre']]},
   {turns:[['A','Ta nouvelle chambre est grande ?'],['B','Elle est aussi grande que l’ancienne, mais elle est plus claire.'],['A','Et le quartier ?'],['B','Il est moins animé, mais plus calme.']],voices:{A:'male',B:'female'},
    q:[['Comment est la nouvelle chambre ?','aussi grande et plus claire',['aussi grande et plus claire','plus grande et plus claire','moins grande et plus sombre'],'comparer'],['Comment est le nouveau quartier ?','plus calme',['plus calme','plus animé','aussi animé'],'comparer'],['Quelle chambre est plus claire ?','la nouvelle',['la nouvelle','l’ancienne','les deux'],'comparer']]}
  ],
  writing:{situation:'Tu as déménagé. Écris un e-mail à une amie française pour décrire ton nouvel appartement.',points:['Décris les pièces et l’étage.','Compare le nouvel appartement avec l’ancien.','Dis ce qu’il y a et ce qu’il n’y a pas dans le quartier.'],
   model:'Chère Julie,\nDepuis deux semaines, j’habite dans un nouvel appartement ! Il a trois pièces et il est au premier étage. Il est plus grand que l’ancien et le loyer est moins cher. La cuisine est aussi grande que le salon. Il y a un petit parc près de chez moi, mais il n’y a pas de supermarché. Viens me voir bientôt !\nBises,\nLena'}
 },
 words:[['la pièce','das Zimmer','room'],['l’étage (m.)','das Stockwerk','floor'],['le rez-de-chaussée','das Erdgeschoss','ground floor'],['le loyer','die Miete','rent'],['l’ascenseur (m.)','der Aufzug','lift'],['plus … que','mehr … als','more … than'],['moins … que','weniger … als','less … than'],['aussi … que','genauso … wie','as … as']],
 vocab:[['la pièce','das Zimmer'],['l’étage (m.)','das Stockwerk'],['le rez-de-chaussée','das Erdgeschoss'],['le loyer','die Miete'],['l’ascenseur (m.)','der Aufzug'],['le balcon','der Balkon'],['le salon','das Wohnzimmer'],['la salle de bains','das Badezimmer'],['clair / claire','hell'],['meilleur / meilleure','besser'],['le quartier','das Viertel'],['l’ancien / l’ancienne','der / die frühere']]
},
{
 id:3,
 phrases:[
  ['Excusez-moi, je cherche la route d’Annecy.','Entschuldigung, ich suche die Straße nach Annecy.'],
  ['D’abord, vous allez tout droit jusqu’au feu rouge.','Zuerst fahren Sie geradeaus bis zur roten Ampel.'],
  ['Ensuite, vous tournez à gauche.','Dann biegen Sie links ab.'],
  ['Après le pont, prenez la première à droite.','Nehmen Sie nach der Brücke die erste rechts.'],
  ['Vous traversez la place.','Sie überqueren den Platz.'],
  ['C’est en face de la poste.','Es ist gegenüber der Post.'],
  ['Pour aller au travail, je prends le tram.','Um zur Arbeit zu fahren, nehme ich die Straßenbahn.'],
  ['Je mets vingt minutes à vélo.','Ich brauche zwanzig Minuten mit dem Fahrrad.'],
  ['Je descends à l’arrêt Mairie.','Ich steige an der Haltestelle Mairie aus.'],
  ['C’est pas compliqué.','Das ist nicht kompliziert.']
 ],
 quiz:[
  ['Was bedeutet „jusqu’au feu rouge“?',['bis zur roten Ampel','an der roten Ampel vorbei','nach der roten Ampel'],'Vous allez tout droit jusqu’au feu rouge.','Jusqu’à = bis; à + le wird zu au: jusqu’au feu.'],
  ['Welches Wort ordnet den ersten Schritt einer Wegbeschreibung?',['d’abord','ensuite','enfin'],'D’abord, vous allez tout droit.','D’abord = zuerst; ensuite = dann; enfin = schließlich.'],
  ['___, vous tournez à gauche. (zweiter Schritt)',['Ensuite','D’abord','Enfin'],'Ensuite, vous tournez à gauche.','Ensuite oder puis verbindet den zweiten Schritt.'],
  ['Was bedeutet „la première à droite“?',['die erste Straße rechts','das erste Haus rechts','zuerst rechts'],'Prenez la première à droite.','La première steht für la première rue.'],
  ['Wie sagst du „Ich brauche zwanzig Minuten mit dem Fahrrad“?',['Je mets vingt minutes à vélo.','Je prends vingt minutes à vélo.','Je dure vingt minutes à vélo.'],'Je mets vingt minutes à vélo.','Mettre + Zeit = für einen Weg brauchen. Prendre steht für Verkehrsmittel, durer nur für Sachen: le trajet dure vingt minutes.'],
  ['C’est en face ___ la poste.',['de','à','par'],'C’est en face de la poste.','En face de = gegenüber von.'],
  ['Was bedeutet „Vous traversez la place“?',['Sie überqueren den Platz.','Sie suchen einen Parkplatz.','Sie bleiben auf dem Platz.'],'Vous traversez la place.','Traverser = überqueren; une place ist ein Platz in der Stadt.'],
  ['Je descends ___ l’arrêt Mairie.',['à','de','sur'],'Je descends à l’arrêt Mairie.','Descendre à + Haltestelle: an der Haltestelle aussteigen.'],
  ['Welche Bitte ist höflich, wenn du den Weg suchst?',['Excusez-moi, je cherche la gare.','Hé, la gare, c’est où ?','Tu sais où est la gare ?'],'Excusez-moi, je cherche la gare.','Fremde spricht man mit Excusez-moi an und siezt sie. Tu sais … duzt, Hé, … c’est où ? ist salopp.'],
  ['Pour aller au travail, je ___ le bus.',['prends','vais','monte'],'Pour aller au travail, je prends le bus.','Verkehrsmittel benutzen: prendre le bus, le train, le tram.']
 ],
 dialogue:['Excusez-moi, je cherche la gare.','D’abord, allez tout droit jusqu’au feu.','Et ensuite ?','Ensuite, tournez à droite et traversez le pont.','C’est loin ?','Non, c’est à dix minutes. La gare est en face du cinéma.'],
 pron:['d’abord / ensuite','D’abord wird zu einer Silbe verbunden: da-bor. Bei ensuite ist en ein Nasal [ɑ̃]. Mach nach jedem Schritt einer Wegbeschreibung eine kleine Pause.'],
 transfer:['Beschreibe in drei Schritten den Weg vom Bahnhof zu deiner Wohnung und deinen Weg zur Arbeit.','Schreibe einer Freundin eine Wegbeschreibung mit d’abord, ensuite und après.'],
 domains:['Mündliche Interaktion','Mündliche Rezeption','Schriftliche Produktion'],
 app:{speak:'Pour aller chez moi, c’est simple. D’abord, vous allez tout droit jusqu’au feu. Ensuite, vous tournez à gauche. Après le pont, vous prenez la première à droite. J’habite en face de la boulangerie. Moi, pour aller au travail, je prends le tram et je mets vingt minutes.',
  write:'D’abord, tu vas tout droit jusqu’au feu.\nEnsuite, tu tournes à gauche.\nAprès le pont, tu prends la première à droite.\nJ’habite en face de la poste.',
  placeholder:'Beschreibe den Weg in vier Schritten …',help:'Ordne die Schritte mit d’abord, ensuite und après.',
  hints:[['D’abord, tu vas tout droit jusqu’à …','Zuerst gehst du geradeaus bis …'],['Ensuite, tu tournes à …','Dann biegst du … ab.'],['C’est en face de …','Es ist gegenüber von …']]},
 goals:['Nach dem Weg fragen und eine Wegbeschreibung in Schritten verstehen.','Schritte mit d’abord, ensuite, après ordnen und jusqu’à, en face de verwenden.','Den eigenen Weg zur Arbeit mit Verkehrsmittel und Dauer beschreiben.'],
 units:[
  {title:'Einen Weg in Schritten beschreiben',rule:'Eine Wegbeschreibung ordnest du mit d’abord (zuerst), ensuite oder puis (dann), après + Ort (nach …) und enfin (schließlich). Du kannst den Imperativ benutzen (Tournez à gauche) oder höflich das Präsens: Vous tournez à gauche. Jusqu’à heißt „bis“; à + le wird zu au: jusqu’au feu.',
   pairs:[['D’abord, vous allez tout droit.','Zuerst gehen Sie geradeaus.'],['Ensuite, vous tournez à gauche.','Dann biegen Sie links ab.'],['Après le pont, prenez la première à droite.','Nehmen Sie nach der Brücke die erste rechts.'],['Allez jusqu’au feu rouge.','Gehen Sie bis zur roten Ampel.'],['Enfin, vous traversez la place.','Schließlich überqueren Sie den Platz.']],
   emphasis:['d’abord','ensuite','puis','après','enfin','jusqu’à','jusqu’au']},
  {title:'Mein Weg zur Arbeit',rule:'Für Verkehrsmittel benutzt man prendre: Je prends le bus. Wie lange der Weg dauert, sagt man mit mettre: Je mets vingt minutes. Zu Fuß heißt à pied, mit dem Fahrrad à vélo, mit dem Auto en voiture. Aussteigen: descendre à …',
   pairs:[['Je prends le métro.','Ich nehme die U-Bahn.'],['Je mets un quart d’heure.','Ich brauche eine Viertelstunde.'],['Je vais au travail à pied.','Ich gehe zu Fuß zur Arbeit.'],['Mon collègue vient en voiture.','Mein Kollege kommt mit dem Auto.'],['Je descends à la troisième station.','Ich steige an der dritten Station aus.']],
   emphasis:['prendre','mettre','à pied','à vélo','en voiture','descendre à']}
 ],
 tasks:[
  [0,'___, allez tout droit. (zuerst)','D’abord',['Ensuite','Enfin'],'Zuerst gehen Sie geradeaus.','Reihenfolge'],
  [0,'___, tournez à gauche. (dann)','Ensuite',['D’abord','Avant'],'Dann biegen Sie links ab.','Reihenfolge'],
  [0,'Allez tout droit ___ feu rouge.','jusqu’au',['jusqu’à le','à le'],'Gehen Sie bis zur roten Ampel.','jusqu’à','À + le wird zu au: jusqu’au feu.'],
  [0,'___ le pont, prenez la première à droite.','Après',['Ensuite','Depuis'],'Nehmen Sie nach der Brücke die erste rechts.','Reihenfolge'],
  [0,'Vous ___ la place. (traverser)','traversez',['traverses','traversent'],'Sie überqueren den Platz.','vous-Form'],
  [0,'C’est en face ___ la mairie.','de',['à','du'],'Es ist gegenüber dem Rathaus.','Ort'],
  [1,'Je ___ le tram pour aller au travail.','prends',['mets','vais'],'Ich nehme die Straßenbahn zur Arbeit.','prendre'],
  [1,'Je ___ vingt minutes.','mets',['prends','dure'],'Ich brauche zwanzig Minuten.','mettre','Mettre + Dauer: Je mets vingt minutes. Durer sagt man von Sachen (le trajet dure …), prendre von Verkehrsmitteln.'],
  [1,'Je vais au bureau ___ pied.','à',['en','par'],'Ich gehe zu Fuß ins Büro.','Verkehrsmittel'],
  [1,'Il vient ___ voiture.','en',['à','par'],'Er kommt mit dem Auto.','Verkehrsmittel','En voiture, en bus, en train; aber à pied und à vélo.']
 ],
 check:[
  ['« D’abord, allez tout droit jusqu’à la boulangerie. Ensuite, tournez à droite. » Was machst du zuerst?',['Geradeaus bis zur Bäckerei gehen.','Rechts abbiegen.','In die Bäckerei gehen.'],'D’abord markiert den ersten Schritt.','ordre'],
  ['« Après le pont, prenez la deuxième à gauche. » Wo biegst du ab?',['in die zweite Straße links nach der Brücke','in die zweite Straße links vor der Brücke','an der zweiten Brücke links'],'Après le pont = nach der Brücke; la deuxième = die zweite Straße.','apres'],
  ['Ein Tourist fragt nach dem Bahnhof. Er steht genau davor. Was sagst du?',['C’est juste en face de vous.','C’est loin d’ici.','Prenez la première à droite.'],'En face de vous = direkt gegenüber.','enface','C’est juste en face de vous.'],
  ['« Je prends le bus et je mets une demi-heure. » Wie lange dauert der Weg?',['30 Minuten','15 Minuten','eine Stunde'],'Une demi-heure ist eine halbe Stunde.','duree'],
  ['Du sagst, dass du mit dem Fahrrad zur Arbeit fährst.',['Je vais au travail à vélo.','Je vais au travail en pied.','Je vais au travail par vélo.'],'À vélo = mit dem Fahrrad, wie à pied. En pied und par vélo gibt es nicht.','transport','Je vais au travail à vélo.'],
  ['« Vous descendez à l’arrêt Gambetta. » Was machst du an der Haltestelle Gambetta?',['aussteigen','einsteigen','umsteigen'],'Descendre = aussteigen; monter = einsteigen; changer = umsteigen.','descendre'],
  ['Du möchtest höflich fragen, wie man zum Museum kommt.',['Excusez-moi, pour aller au musée, s’il vous plaît ?','Excusez-moi, le musée, il coûte combien ?','Excusez-moi, vous allez au musée ?'],'Pour aller à … ? ist die übliche Frage nach dem Weg.','demander','Excusez-moi, pour aller au musée, s’il vous plaît ?'],
  ['« Allez tout droit jusqu’au feu, puis tournez à gauche. » Was bedeutet puis?',['dann','bis','zuerst'],'Puis hat dieselbe Bedeutung wie ensuite.','puis']
 ],
 transfers:[
  ['dabord','___, vous tournez à droite. (zuerst)','D’abord','Beginne eine Wegbeschreibung mit „zuerst“.'],
  ['ensuite','___, vous traversez le pont. (dann)','Ensuite','Verbinde den zweiten Schritt mit „dann“.',['Puis']],
  ['jusqua','Allez tout droit ___ la place. (bis zu)','jusqu’à','Gehen Sie geradeaus bis zum Platz.'],
  ['jusqua','Continuez ___ carrefour. (bis zu + le)','jusqu’au','Fahren Sie weiter bis zur Kreuzung.'],
  ['mettre','Je ___ dix minutes à pied. (mettre)','mets','Du brauchst zehn Minuten zu Fuß.'],
  ['prendre','Nous ___ le train tous les matins. (prendre)','prenons','Ihr nehmt jeden Morgen den Zug.'],
  ['enface','La pharmacie est en face ___ la gare.','de','Die Apotheke liegt gegenüber dem Bahnhof.'],
  ['transport','Elle va au travail ___ voiture.','en','Sie fährt mit dem Auto zur Arbeit.']
 ],
 comp:{voices:{A:'male',B:'female'},turns:[
  ['A','Pardon madame, je cherche l’hôpital.'],['B','Ce n’est pas loin. D’abord, vous allez tout droit jusqu’à la place.'],
  ['A','Jusqu’à la place, d’accord.'],['B','Ensuite, vous traversez la place et vous prenez la rue à gauche.'],
  ['A','La rue à gauche…'],['B','Oui. Après la pharmacie, c’est la deuxième à droite.'],
  ['A','Je peux y aller à pied ?'],['B','Oui, vous mettez dix minutes. L’hôpital est en face du parc.']],
  fields:[['Gesuchter Ort',['das Krankenhaus','die Apotheke','der Park']],['Erster Schritt',['geradeaus bis zum Platz','links bis zur Apotheke','über die Brücke']],['Nach dem Platz',['die Straße links','die Straße rechts','geradeaus']],['Nach der Apotheke',['die zweite rechts','die erste rechts','die zweite links']],['Dauer zu Fuß',['10 Minuten','20 Minuten','5 Minuten']],['Gegenüber',['dem Park','der Apotheke','dem Platz']]]},
 intro:['D’abord, vous allez tout droit jusqu’au feu rouge.',['D’abord, vous allez tout droit jusqu’au pont.','Ensuite, vous allez tout droit jusqu’au feu rouge.']],
 hard:{
  obj:[['ordre','Schritte mit d’abord / ensuite / après ordnen'],['lieu','Orts- und Richtungsangaben'],['trajet','Den Weg zur Arbeit beschreiben'],['comprendre','Eine Wegbeschreibung hörend verstehen']],
  text:'Salut Marie ! Pour venir chez moi, c’est simple. {D’abord|zuerst|ordre}, tu sors de la gare et tu vas tout droit {jusqu’au|bis zum (à + le)|lieu} feu rouge. {Ensuite|dann|ordre}, tu tournes à {gauche|links|lieu}. Tu {traverses|überqueren (tu)|lieu} le pont. {Après|nach|ordre} le pont, tu prends la {première|erste|lieu} rue à droite. J’habite en {face|gegenüber|lieu} de la boulangerie. Moi, pour aller au travail, je {prends|nehmen (je)|trajet} le tram. Je {mets|brauchen (Zeit)|trajet} vingt minutes. Je {descends|aussteigen (je)|trajet} à l’arrêt Mairie. Le soir, je rentre {à|mit (Fahrrad)|trajet} vélo. Si tu viens en {voiture|Auto|trajet}, il y a un parking {près|in der Nähe|lieu} de chez moi.',
  listen:[
   {text:'Pour aller à la bibliothèque, vous allez tout droit jusqu’à l’église. Ensuite, vous tournez à droite. La bibliothèque est à côté de la banque, en face du jardin public.',voice:'female',
    q:[['Où faut-il aller d’abord ?','jusqu’à l’église',['jusqu’à l’église','jusqu’à la banque','jusqu’au jardin public'],'ordre'],['Ensuite, il faut tourner où ?','à droite',['à droite','à gauche','tout droit'],'lieu'],['La bibliothèque est en face de quoi ?','du jardin public',['du jardin public','de la banque','de l’église'],'comprendre']]},
   {turns:[['A','Comment tu vas au travail ?'],['B','Je prends le métro, puis le bus.'],['A','Tu mets combien de temps ?'],['B','Quarante minutes. Le vendredi, je vais au travail à vélo.']],voices:{A:'female',B:'male'},
    q:[['Combien de minutes met l’homme ? Réponds en chiffres.','40',null,'trajet'],['Qu’est-ce qu’il prend d’abord ?','le métro',['le métro','le bus','le tram'],'ordre'],['Comment va-t-il au travail le vendredi ?','à vélo',['à vélo','à pied','en voiture'],'trajet']]}
  ],
  writing:{situation:'Un ami français vient te voir pour la première fois. Il arrive à la gare. Écris-lui un message.',points:['Explique le chemin de la gare à chez toi en trois étapes.','Dis à côté ou en face de quoi tu habites.','Propose un autre moyen de transport et dis combien de temps il met.'],
   model:'Salut Paul,\nC’est facile ! D’abord, tu sors de la gare et tu vas tout droit jusqu’à la place. Ensuite, tu tournes à gauche. Après la pharmacie, tu prends la deuxième rue à droite. J’habite au numéro 5, en face du cinéma. Tu peux aussi prendre le bus 12 : tu mets dix minutes. À samedi !\nJonas'}
 },
 words:[['d’abord','zuerst','first'],['ensuite','dann','then'],['jusqu’à','bis','as far as'],['le feu (rouge)','die (rote) Ampel','traffic light'],['le pont','die Brücke','bridge'],['traverser','überqueren','to cross'],['en face de','gegenüber','opposite'],['mettre (+ Zeit)','(Zeit) brauchen','to take (time)']],
 vocab:[['d’abord','zuerst'],['ensuite','dann'],['enfin','schließlich'],['jusqu’à','bis'],['le feu','die Ampel'],['le pont','die Brücke'],['traverser','überqueren'],['en face de','gegenüber'],['la place','der Platz'],['le tram','die Straßenbahn'],['descendre','aussteigen'],['tourner','abbiegen']]
},
{
 id:4,
 phrases:[
  ['Allô, bonjour, je suis bien chez Madame Lefort ?','Hallo, guten Tag, bin ich richtig bei Frau Lefort?'],
  ['Est-ce que je peux parler à Hélène, s’il vous plaît ?','Kann ich bitte Hélène sprechen?'],
  ['C’est de la part de qui ?','Wer ist am Apparat?'],
  ['Désolé, elle n’est pas là.','Tut mir leid, sie ist nicht da.'],
  ['Vous voulez laisser un message ?','Möchten Sie eine Nachricht hinterlassen?'],
  ['Je lui dirai que vous avez appelé.','Ich sage ihr, dass Sie angerufen haben.'],
  ['Elle peut me rappeler avant six heures ?','Kann sie mich vor sechs Uhr zurückrufen?'],
  ['Ne quittez pas, je vous la passe.','Bleiben Sie dran, ich gebe sie Ihnen.'],
  ['Je leur téléphone ce soir.','Ich rufe sie heute Abend an.'],
  ['Vous pouvez répéter le numéro ?','Können Sie die Nummer wiederholen?']
 ],
 quiz:[
  ['Womit meldest du dich am Telefon?',['Allô ?','Salut ?','Pardon ?'],'Allô ?','Allô benutzt man nur am Telefon. Salut grüßt Freunde, Pardon ist eine Entschuldigung.'],
  ['Was fragt „C’est de la part de qui ?“?',['Wer ist am Apparat?','Für wen ist das?','Wann rufen Sie an?'],'C’est de la part de qui ?','So fragt man höflich nach dem Namen des Anrufers.'],
  ['Je ___ dirai que vous avez appelé. (ihr)',['lui','la','leur'],'Je lui dirai que vous avez appelé.','Dire à quelqu’un → lui (ihm / ihr). La wäre ein direktes Objekt.'],
  ['Was bedeutet „Ne quittez pas“?',['Bleiben Sie dran.','Rufen Sie später an.','Legen Sie bitte auf.'],'Ne quittez pas, je vous la passe.','Am Telefon: Ne quittez pas = Bleiben Sie in der Leitung, legen Sie nicht auf.'],
  ['Je ___ téléphone ce soir. (ihnen, mehrere Personen)',['leur','lui','les'],'Je leur téléphone ce soir.','Téléphoner à des personnes → leur. Leur bekommt hier kein -s.'],
  ['Was bedeutet „rappeler“?',['zurückrufen','sich erinnern','noch einmal schreiben'],'Elle peut me rappeler avant six heures ?','Rappeler quelqu’un = jemanden zurückrufen.'],
  ['Welche Antwort passt zu „Je peux parler à Hélène ?“, wenn sie nicht da ist?',['Désolé, elle n’est pas là.','Désolé, c’est un faux numéro.','Oui, c’est moi.'],'Désolé, elle n’est pas là.','Elle n’est pas là = Sie ist nicht da.'],
  ['Vous voulez ___ un message ?',['laisser','prendre','quitter'],'Vous voulez laisser un message ?','Der Anrufer laisse un message (hinterlässt); wer abnimmt, prend un message (nimmt sie auf).','Du nimmst für eine Kollegin ab und fragst den Anrufer.'],
  ['Was bedeutet „Vous pouvez répéter le numéro ?“',['Können Sie die Nummer wiederholen?','Können Sie die Nummer aufschreiben?','Können Sie die Nummer ändern?'],'Vous pouvez répéter le numéro ?','Répéter = wiederholen.'],
  ['Pierre möchte seine Schwester sprechen. Du sagst: « Ne quitte pas, je ___ passe. » (sie dir)',['te la','te lui','lui la'],'Ne quitte pas, je te la passe.','Je te la passe = Ich gebe sie dir (ans Telefon). Te steht vor la.']
 ],
 dialogue:['Allô, bonjour. Est-ce que je peux parler à Hélène ?','C’est de la part de qui ?','C’est Julie, une collègue.','Désolé, elle est à la piscine.','Ah bon. Vous pouvez lui dire de me rappeler ?','Bien sûr, je lui dirai. Elle a votre numéro ?','Oui. Ce soir, si possible. Merci et au revoir !'],
 pron:['allô / lui','In allô liegt die Betonung auf der letzten Silbe. Bei lui gleitet das u schnell in das i: [lɥi]. Sprich am Telefon langsam und deutlich, vor allem Namen und Nummern.'],
 transfer:['Spiele ein Telefongespräch: Du möchtest eine Person sprechen, sie ist nicht da, du hinterlässt eine Nachricht.','Schreibe eine kurze Telefonnotiz: wer angerufen hat, warum, und wann die Person zurückrufen soll.'],
 domains:['Mündliche Interaktion','Mündliche Rezeption','Schriftliche Produktion'],
 app:{speak:'Allô, bonjour. Ici Julie Bernard. Est-ce que je peux parler à Hélène, s’il vous plaît ? Ah, elle n’est pas là. Vous pouvez lui dire que j’ai appelé ? Elle peut me rappeler avant six heures au 06 12 34 56 78. Merci beaucoup, au revoir !',
  write:'Message pour Hélène :\nJulie a téléphoné à 15 heures.\nElle veut te parler du cours de samedi.\nRappelle-la avant six heures, s’il te plaît.',
  placeholder:'Schreibe eine Telefonnotiz …',help:'Nenne Anrufer, Uhrzeit, Grund und Rückrufwunsch.',
  hints:[['… a téléphoné à … heures.','… hat um … Uhr angerufen.'],['Il / Elle veut te parler de …','Er / Sie möchte mit dir über … sprechen.'],['Rappelle-le / -la avant …','Ruf ihn / sie vor … zurück.']]},
 goals:['Ein Telefongespräch beginnen, nach einer Person fragen und reagieren, wenn sie nicht da ist.','Eine Nachricht hinterlassen oder aufnehmen.','Indirekte Objektpronomen lui / leur vor dem Verb verwenden.'],
 units:[
  {title:'lui und leur – wem?',rule:'Viele Verben stehen mit à + Person: parler à, téléphoner à, dire à, écrire à, répondre à. Diese Person ersetzt du durch lui (ihm / ihr) oder leur (ihnen). Das Pronomen steht vor dem konjugierten Verb: Je lui téléphone. In der Verneinung: Je ne lui téléphone pas. Mit Modalverb steht es vor dem Infinitiv: Je vais lui dire.',
   pairs:[['Je téléphone à Paul. → Je lui téléphone.','Ich rufe Paul an. → Ich rufe ihn an.'],['Tu parles à Marie ? → Tu lui parles ?','Sprichst du mit Marie? → Sprichst du mit ihr?'],['J’écris à mes parents. → Je leur écris.','Ich schreibe meinen Eltern. → Ich schreibe ihnen.'],['Je ne lui réponds pas.','Ich antworte ihm / ihr nicht.'],['Je vais lui dire.','Ich werde es ihm / ihr sagen.']],
   emphasis:['à + Person','lui','leur','vor dem konjugierten Verb','vor dem Infinitiv']},
  {title:'Telefonieren: feste Wendungen',rule:'Am Telefon meldet man sich mit Allô. Der Anrufer fragt: Je peux parler à … ? Die angerufene Person fragt: C’est de la part de qui ? Ist die Person nicht da: Elle n’est pas là. Dann bietet man an: Vous voulez laisser un message ? oder Elle peut vous rappeler.',
   pairs:[['Allô, c’est Julie.','Hallo, hier ist Julie.'],['Je peux parler à Monsieur Petit ?','Kann ich Herrn Petit sprechen?'],['Il est en réunion.','Er ist in einer Besprechung.'],['Je peux laisser un message ?','Kann ich eine Nachricht hinterlassen?'],['Je rappellerai plus tard.','Ich rufe später noch einmal an.']],
   emphasis:['Allô','C’est de la part de qui ?','laisser un message','rappeler']}
 ],
 tasks:[
  [0,'Je téléphone à Paul. → Je ___ téléphone.','lui',['le','leur'],'Ich rufe ihn an.','lui'],
  [0,'J’écris à mes parents. → Je ___ écris.','leur',['les','lui'],'Ich schreibe ihnen.','leur','Mehrere Personen mit à → leur.'],
  [0,'Tu parles à Marie ? → Tu ___ parles ?','lui',['la','elle'],'Sprichst du mit ihr?','lui','Parler à quelqu’un → lui, auch für eine Frau.'],
  [0,'Je ne ___ réponds pas. (ihm)','lui',['le','il'],'Ich antworte ihm nicht.','lui'],
  [0,'Je vais ___ dire demain. (ihnen)','leur',['les','lui'],'Ich werde ihnen morgen Bescheid sagen.','leur'],
  [0,'Vous ___ donnez le numéro ? (ihr)','lui',['la','leur'],'Geben Sie ihr die Nummer?','lui'],
  [1,'___, bonjour ! C’est Julie.','Allô',['Salut','Pardon'],'Hallo, guten Tag! Hier ist Julie.','Telefon','Am Telefon meldet man sich mit Allô. Salut grüßt Freunde, Pardon ist eine Entschuldigung.'],
  [1,'C’est de la ___ de qui ?','part',['place','fois'],'Wer ist am Apparat?','Telefon'],
  [1,'Vous voulez ___ un message ?','laisser',['quitter','donner'],'Möchten Sie eine Nachricht hinterlassen?','Telefon'],
  [1,'Elle peut vous ___ demain.','rappeler',['répéter','répondre'],'Sie kann Sie morgen zurückrufen.','Telefon']
 ],
 check:[
  ['Am Telefon fragt man dich: « C’est de la part de qui ? » Was antwortest du?',['C’est Lucas Meyer.','C’est pour demain.','C’est à six heures.'],'Gefragt ist der Name des Anrufers.','partde','C’est Lucas Meyer.'],
  ['« Désolé, Hélène est sortie. Vous voulez qu’elle vous rappelle ? » Was bietet der Mann an?',['Hélène ruft zurück.','Er gibt dir Hélènes Handynummer.','Du sollst morgen wieder anrufen.'],'Rappeler = zurückrufen.','rappeler'],
  ['Du willst sagen: „Ich rufe ihn heute Abend an.“',['Je lui téléphone ce soir.','Je le téléphone ce soir.','Je téléphone lui ce soir.'],'Téléphoner à quelqu’un → lui, vor dem Verb.','lui','Je lui téléphone ce soir.'],
  ['Du willst sagen: „Ich schreibe ihnen eine E-Mail.“',['Je leur écris un e-mail.','Je les écris un e-mail.','Je lui écris un e-mail.'],'Écrire à des personnes → leur.','leur','Je leur écris un e-mail.'],
  ['Die Person, die du suchst, ist nicht da. Du möchtest eine Nachricht hinterlassen.',['Est-ce que je peux laisser un message ?','Est-ce que je peux prendre un message ?','Est-ce que je peux quitter un message ?'],'Der Anrufer hinterlässt: laisser un message.','message','Est-ce que je peux laisser un message ?'],
  ['« Ne quittez pas, je vous le passe. » Was passiert gleich?',['Du wirst mit ihm verbunden.','Das Gespräch wird beendet.','Du sollst später zurückrufen.'],'Je vous le passe = ich gebe ihn Ihnen (verbinde).','passer'],
  ['Du hast die Telefonnummer nicht verstanden.',['Vous pouvez répéter le numéro, s’il vous plaît ?','Vous pouvez changer le numéro, s’il vous plaît ?','Vous pouvez appeler le numéro, s’il vous plaît ?'],'Répéter = wiederholen.','repeter','Vous pouvez répéter le numéro, s’il vous plaît ?'],
  ['« Je ne lui ai pas encore répondu. » Was bedeutet das?',['Ich habe ihm noch nicht geantwortet.','Er hat mir noch nicht geantwortet.','Ich habe ihn noch nicht angerufen.'],'Lui ist hier das Objekt: ihm. Ne … pas encore = noch nicht.','negation']
 ],
 transfers:[
  ['lui','Je téléphone à ma sœur. → Je ___ téléphone.','lui','Ersetze „à ma sœur“ durch ein Pronomen.'],
  ['lui','Tu écris à ton professeur ? → Tu ___ écris ?','lui','Ersetze „à ton professeur“ durch ein Pronomen.'],
  ['leur','Nous parlons aux voisins. → Nous ___ parlons.','leur','Ersetze „aux voisins“ durch ein Pronomen.'],
  ['negation','Je ne ___ réponds pas. (à Marc)','lui','Ich antworte Marc nicht. Setze das Pronomen ein.'],
  ['infinitif','Je vais ___ dire la nouvelle. (à mes amis)','leur','Ich werde meinen Freunden die Neuigkeit sagen.'],
  ['telephone','Vous voulez laisser un ___ ?','message','Möchten Sie eine Nachricht hinterlassen?'],
  ['rappeler','Elle peut me ___ ce soir ? (zurückrufen)','rappeler','Kann sie mich heute Abend zurückrufen?']
 ],
 comp:{voices:{A:'female',B:'male'},turns:[
  ['A','Allô, bonjour. Je peux parler à Madame Roux, s’il vous plaît ?'],['B','C’est de la part de qui ?'],
  ['A','Claire Dubois, de l’école de langues.'],['B','Je suis désolé, Madame Roux est en réunion jusqu’à quinze heures.'],
  ['A','Ah, dommage. Vous pouvez lui dire que le cours de jeudi commence à dix-huit heures ?'],['B','Oui, bien sûr. Elle peut vous rappeler ?'],
  ['A','Oui, au zéro six, quarante-cinq, vingt-deux, dix-huit, trente.'],['B','D’accord, je lui dirai. Au revoir, madame.']],
  fields:[['Anruferin',['Claire Dubois','Madame Roux','Claire Roux']],['Gesuchte Person ist',['in einer Besprechung','auf einer Dienstreise','im Urlaub']],['Bis wann',['15 Uhr','13 Uhr','18 Uhr']],['Kurs am',['Donnerstag','Dienstag','Samstag']],['Kursbeginn',['18 Uhr','16 Uhr','19 Uhr']],['Telefonnummer endet auf',['… 18 30','… 30 18','… 13 30']]]},
 intro:['Je lui dirai que vous avez appelé.',['Je leur dirai que vous avez appelé.','Je lui dirai que vous allez appeler.']],
 hard:{
  obj:[['telephone','Am Telefon die passenden Wendungen benutzen'],['pronom','lui / leur korrekt einsetzen'],['message','Eine Nachricht hinterlassen und weitergeben'],['comprendre','Ein Telefongespräch hörend verstehen']],
  text:'— {Allô|Telefongruß|telephone}, bonjour. Est-ce que je peux {parler|sprechen|telephone} à Lucie, s’il vous plaît ? — C’est de la {part|von wem? (de la … de qui)|telephone} de qui ? — C’est Paul, un ami. — Désolée, elle n’est pas {là|da|telephone}. Vous voulez {laisser|hinterlassen|message} un message ? — Oui. Vous pouvez {lui|ihr|pronom} dire que la fête commence à huit heures ? — Bien sûr, je {lui|ihr|pronom} dirai. Elle peut vous {rappeler|zurückrufen|message} ? — Oui, ce soir. Et ses parents ? Je {leur|ihnen|pronom} téléphone demain. — D’accord. Vous pouvez aussi {leur|ihnen|pronom} écrire un SMS au 06 12 34 56 78. — Merci ! Vous pouvez {répéter|wiederholen|telephone} le numéro ? — Oui : zéro six, douze, trente-quatre, cinquante-six, soixante-dix-huit. — Merci, au {revoir|Abschied|telephone} !',
  listen:[
   {text:'Bonjour, ici le cabinet du docteur Martin. Votre rendez-vous de mardi est déplacé à jeudi, à dix heures. Si ce n’est pas possible, rappelez-nous avant mercredi midi. Merci.',voice:'female',
    q:[['Le rendez-vous est déplacé à quel jour ?','jeudi',['jeudi','mardi','mercredi'],'comprendre'],['À quelle heure ? Réponds en chiffres.','10',null,'message'],['Qu’est-ce qu’il faut faire si ce n’est pas possible ?','Rappeler avant mercredi midi.',['Rappeler avant mercredi midi.','Venir mardi à dix heures.','Écrire un e-mail jeudi.'],'message']]},
   {turns:[['A','Allô, je peux parler à Léo ?'],['B','Il n’est pas là. Je lui dis de te rappeler ?'],['A','Non, je lui envoie un message. Et dis à ses frères que le match est annulé.'],['B','D’accord, je leur dis tout de suite.']],voices:{A:'male',B:'female'},
    q:[['Est-ce que Léo est là ?','Non, il n’est pas là.',['Non, il n’est pas là.','Oui, il est là.','Il est au match.'],'comprendre'],['Que fait l’homme pour Léo ?','Il lui envoie un message.',['Il lui envoie un message.','Il le rappelle plus tard.','Il passe chez lui.'],'pronom'],['Quelle nouvelle est pour les frères ?','Le match est annulé.',['Le match est annulé.','Le match commence plus tôt.','Le match est demain.'],'message']]}
  ],
  writing:{situation:'Tu as répondu au téléphone pour ta colocataire Inès. Écris-lui un message sur la table.',points:['Dis qui a téléphoné et quand.','Explique pourquoi la personne a appelé.','Dis quand et à quel numéro Inès doit rappeler.'],
   model:'Inès,\nTon collègue Marc a téléphoné à 14 heures. Il veut te parler de la réunion de lundi : elle commence à neuf heures et pas à dix heures. Je lui ai dit que tu étais au sport. Rappelle-le avant 19 heures au 06 21 43 65 87, s’il te plaît.\nBisous,\nCamille'}
 },
 words:[['allô','hallo (am Telefon)','hello (on the phone)'],['de la part de','von (im Auftrag von)','on behalf of'],['laisser un message','eine Nachricht hinterlassen','to leave a message'],['rappeler','zurückrufen','to call back'],['lui','ihm / ihr','(to) him / her'],['leur','ihnen','(to) them'],['ne quittez pas','bleiben Sie dran','hold the line'],['passer quelqu’un','jemanden verbinden','to put someone through']],
 vocab:[['allô','hallo am Telefon'],['de la part de','im Auftrag von'],['laisser','lassen, hinterlassen'],['le message','die Nachricht'],['rappeler','zurückrufen'],['répondre','antworten'],['téléphoner','telefonieren'],['le numéro','die Nummer'],['la réunion','die Besprechung'],['dommage','schade'],['volontiers','gern'],['bien sûr','natürlich']]
},
{
 id:5,
 phrases:[
  ['Hier, je suis allé au marché.','Gestern bin ich auf den Markt gegangen.'],
  ['J’ai acheté des fruits et du fromage.','Ich habe Obst und Käse gekauft.'],
  ['L’après-midi, nous avons regardé un film.','Am Nachmittag haben wir einen Film angeschaut.'],
  ['Ma sœur est partie à huit heures.','Meine Schwester ist um acht Uhr abgefahren.'],
  ['Mes amis sont arrivés en retard.','Meine Freunde sind zu spät angekommen.'],
  ['Je me suis levé tôt.','Ich bin früh aufgestanden.'],
  ['Elle s’est couchée à minuit.','Sie ist um Mitternacht ins Bett gegangen.'],
  ['Le week-end dernier, j’ai fait du sport.','Letztes Wochenende habe ich Sport gemacht.'],
  ['Il n’a pas arrêté de pleuvoir.','Es hat nicht aufgehört zu regnen.'],
  ['Qu’est-ce que tu as fait hier soir ?','Was hast du gestern Abend gemacht?']
 ],
 quiz:[
  ['Hier, Paul ___ allé au marché.',['est','a','avait'],'Hier, Paul est allé au marché.','Aller bildet das passé composé mit être: il est allé. A und avait sind Formen von avoir.'],
  ['Hier, nous ___ acheté du fromage.',['avons','sommes','avez'],'Hier, nous avons acheté du fromage.','Die meisten Verben bilden das passé composé mit avoir; zu nous gehört avons.'],
  ['Ma sœur est ___ à huit heures.',['partie','parti','partis'],'Ma sœur est partie à huit heures.','Mit être richtet sich das Partizip nach dem Subjekt: ma sœur → partie.'],
  ['Mes amis sont ___ en retard.',['arrivés','arrivé','arrivée'],'Mes amis sont arrivés en retard.','Mehrere Personen, männlich oder gemischt → arrivés.'],
  ['Was bedeutet „Il n’a pas arrêté de pleuvoir“?',['Es hat nicht aufgehört zu regnen.','Es hat nicht geregnet.','Es hat kurz geregnet.'],'Il n’a pas arrêté de pleuvoir.','Arrêter de + Infinitiv = aufhören zu …'],
  ['Welches Partizip gehört zu „faire“?',['fait','faisé','fais'],'Le week-end dernier, j’ai fait du sport.','Faire ist unregelmäßig: j’ai fait.'],
  ['Elle s’est ___ à minuit.',['couchée','couché','couchés'],'Elle s’est couchée à minuit.','Reflexive Verben bilden das passé composé mit être; das Partizip passt sich an: couchée.'],
  ['Wie fragst du „Was hast du gestern Abend gemacht?“',['Qu’est-ce que tu as fait hier soir ?','Qu’est-ce que tu fais hier soir ?','Qu’est-ce que tu es fait hier soir ?'],'Qu’est-ce que tu as fait hier soir ?','Faire bildet das passé composé mit avoir: tu as fait.'],
  ['Welche Zeitangabe passt zum passé composé?',['le week-end dernier','le week-end prochain','demain'],'Le week-end dernier, j’ai fait du sport.','Dernier = letzter; prochain = nächster.'],
  ['Vous ___ regardé le match ?',['avez','êtes','avons'],'Vous avez regardé le match ?','Regarder bildet das passé composé mit avoir: vous avez regardé.']
 ],
 dialogue:['Qu’est-ce que tu as fait hier ?','Le matin, je suis allée au marché et j’ai acheté des légumes.','Et l’après-midi ?','Mes parents sont arrivés et nous avons fait une promenade.','Il a fait beau ?','Non, il n’a pas arrêté de pleuvoir !'],
 pron:['j’ai / je suis','J’ai [ʒe] und je suis [ʒəsɥi] klingen deutlich verschieden. Bei nous avons und ils ont bindet man: nous‿avons [nuzavɔ̃], ils‿ont [ilzɔ̃]. Ils sont hat dagegen ein scharfes s: [ilsɔ̃].'],
 transfer:['Erzähle, was du gestern oder am letzten Wochenende gemacht hast: morgens, nachmittags, abends.','Schreibe fünf Sätze über deinen gestrigen Tag mit mindestens zwei Verben mit être.'],
 domains:['Mündliche Produktion','Mündliche Interaktion','Schriftliche Produktion'],
 app:{speak:'Hier, je me suis levée à sept heures. Le matin, je suis allée au marché et j’ai acheté des fruits. L’après-midi, mes amis sont arrivés et nous avons regardé un film. Le soir, j’ai fait la cuisine. Et vous, qu’est-ce que vous avez fait hier ?',
  write:'Hier, je me suis levé à sept heures.\nLe matin, je suis allé au travail.\nÀ midi, j’ai mangé avec un collègue.\nLe soir, mes amis sont venus chez moi.\nNous avons joué aux cartes.',
  placeholder:'Erzähle in fünf Sätzen von gestern …',help:'Wähle avoir oder être und achte bei être auf die Angleichung.',
  hints:[['Hier, je suis allé(e) …','Gestern bin ich … gegangen.'],['J’ai acheté / mangé / regardé …','Ich habe … gekauft / gegessen / angeschaut.'],['Nous sommes rentré(e)s à …','Wir sind um … zurückgekommen.']]},
 goals:['Erzählen, was man gestern oder am letzten Wochenende gemacht hat.','Das passé composé mit avoir oder être bilden.','Das Partizip bei être und reflexiven Verben an das Subjekt angleichen.'],
 units:[
  {title:'passé composé mit avoir',rule:'Das passé composé beschreibt abgeschlossene Handlungen: avoir im Präsens + Partizip. Regelmäßige -er-Verben enden auf -é: acheter → acheté. Wichtige unregelmäßige Partizipien: faire → fait, prendre → pris, voir → vu, lire → lu, boire → bu. Verneinung um avoir herum: Je n’ai pas mangé.',
   pairs:[['J’ai acheté du pain.','Ich habe Brot gekauft.'],['Nous avons regardé un film.','Wir haben einen Film angeschaut.'],['Tu as fait tes devoirs ?','Hast du deine Hausaufgaben gemacht?'],['Ils ont pris le train.','Sie haben den Zug genommen.'],['Je n’ai pas vu Paul.','Ich habe Paul nicht gesehen.']],
   emphasis:['avoir','acheté','fait','pris','vu','n’ai pas']},
  {title:'passé composé mit être und Angleichung',rule:'Verben der Bewegung und des Zustandswechsels bilden das passé composé mit être, z. B. aller, venir, partir, arriver, entrer, sortir, rester, rentrer, naître, mourir, sowie alle reflexiven Verben. Das Partizip richtet sich dann nach dem Subjekt: elle est partie, ils sont partis, elles sont parties. Gesprochen hört man den Unterschied meist nicht.',
   pairs:[['Je suis allé au marché.','Ich bin auf den Markt gegangen.'],['Ma sœur est partie à huit heures.','Meine Schwester ist um acht abgefahren.'],['Ils sont arrivés en retard.','Sie sind zu spät angekommen.'],['Nous sommes restés à la maison.','Wir sind zu Hause geblieben.'],['Elle s’est levée tôt.','Sie ist früh aufgestanden.']],
   emphasis:['être','Bewegung','reflexiven Verben','partie','partis','parties']}
 ],
 tasks:[
  [0,'Hier, Léa ___ acheté des fruits.','a',['est','as'],'Gestern hat Léa Obst gekauft.','avoir','Acheter bildet das passé composé mit avoir; zu elle gehört a.'],
  [0,'Nous ___ regardé un film.','avons',['sommes','ont'],'Wir haben einen Film angeschaut.','avoir'],
  [0,'Tu as ___ du sport ? (faire)','fait',['faisé','fais'],'Hast du Sport gemacht?','Partizip','Faire → fait.'],
  [0,'Ils ont ___ le bus. (prendre)','pris',['prendu','prend'],'Sie haben den Bus genommen.','Partizip','Prendre → pris.'],
  [0,'Je n’ai pas ___ ton message. (voir)','vu',['voyé','vois'],'Ich habe deine Nachricht nicht gesehen.','Partizip','Voir → vu.'],
  [1,'Il ___ allé au cinéma.','est',['a','sont'],'Er ist ins Kino gegangen.','être','Aller bildet das passé composé mit être; zu il gehört est.'],
  [1,'Ma sœur est ___ hier. (partir)','partie',['parti','partis'],'Meine Schwester ist gestern abgereist.','Angleichung'],
  [1,'Mes parents sont ___ à midi. (arriver)','arrivés',['arrivé','arrivée'],'Meine Eltern sind mittags angekommen.','Angleichung'],
  [1,'Nous ___ restés à la maison.','sommes',['avons','êtes'],'Wir sind zu Hause geblieben.','être'],
  [1,'Elle s’est ___ à sept heures. (se lever)','levée',['levé','levés'],'Sie ist um sieben aufgestanden.','reflexiv','Reflexive Verben: être + Angleichung → levée.']
 ],
 check:[
  ['Du erzählst, dass du gestern ins Schwimmbad gegangen bist.',['Hier, je suis allé à la piscine.','Hier, j’ai allé à la piscine.','Hier, je vais à la piscine.'],'Aller bildet das passé composé mit être.','etre','Hier, je suis allé à la piscine.'],
  ['« Ma mère est partie à six heures et mon père est parti à huit heures. » Wer ist zuerst gefahren?',['die Mutter','der Vater','beide zusammen'],'Six heures ist früher als huit heures.','comprendre'],
  ['Welcher Satz ist richtig?',['Mes amies sont venues samedi.','Mes amies sont venu samedi.','Mes amies ont venues samedi.'],'Venir → être; mehrere Frauen → venues.','accord','Mes amies sont venues samedi.'],
  ['« Le week-end dernier, il n’a pas arrêté de pleuvoir. » Wie war das Wetter?',['Es hat die ganze Zeit geregnet.','Es hat nur kurz geregnet.','Es hat nicht geregnet.'],'Ne pas arrêter de = nicht aufhören zu.','arreter'],
  ['Du hast gestern nicht ferngesehen.',['Je n’ai pas regardé la télé.','Je n’ai regardé pas la télé.','Je ne suis pas regardé la télé.'],'Ne … pas umschließt avoir.','negation','Je n’ai pas regardé la télé.'],
  ['Dein Partner fragt dich in der Prüfung nach gestern. Welche Frage stellt er?',['Qu’est-ce que tu as fait hier ?','Qu’est-ce que tu vas faire hier ?','Qu’est-ce que tu fais demain ?'],'Für gestern braucht man das passé composé.','question'],
  ['Eine Frau sagt: Ich bin um 23 Uhr ins Bett gegangen.',['Je me suis couchée à vingt-trois heures.','Je me suis couché à vingt-trois heures.','J’ai couchée à vingt-trois heures.'],'Reflexiv → être; eine Frau → couchée.','reflexif','Je me suis couchée à vingt-trois heures.'],
  ['Welches Partizip ist richtig? « Nous avons ___ une pizza. » (prendre)',['pris','prendu','prit'],'Prendre → pris.','participe','Nous avons pris une pizza.']
 ],
 transfers:[
  ['avoir','Hier soir, nous ___ mangé au restaurant.','avons','Gestern Abend habt ihr im Restaurant gegessen.'],
  ['etre','Elle ___ partie en vacances.','est','Sie ist in den Urlaub gefahren.'],
  ['accord','Mes cousines sont ___ dimanche. (arriver)','arrivées','Deine Cousinen sind am Sonntag angekommen.'],
  ['accord','Paul et Marc sont ___ au cinéma. (aller)','allés','Paul und Marc sind ins Kino gegangen.'],
  ['participe','Tu as ___ ce livre ? (lire)','lu','Hast du dieses Buch gelesen?'],
  ['participe','J’ai ___ du sport samedi. (faire)','fait','Du hast am Samstag Sport gemacht.'],
  ['reflexif','Je me suis ___ tôt. (se lever, Mann)','levé','Ein Mann sagt: Ich bin früh aufgestanden.'],
  ['negation','Je ___ suis pas sorti hier.','ne','Du bist gestern nicht ausgegangen.']
 ],
 comp:{voices:{A:'male',B:'female'},turns:[
  ['A','Salut Emma ! Tu as passé un bon week-end ?'],['B','Oui ! Samedi matin, je suis allée à la piscine avec ma sœur.'],
  ['A','Et l’après-midi ?'],['B','Nous avons fait des courses en ville. J’ai acheté une veste.'],
  ['A','Et dimanche ?'],['B','Mes grands-parents sont venus déjeuner. Ils sont partis à cinq heures.'],
  ['A','Vous êtes sortis le soir ?'],['B','Non, nous sommes restés à la maison et nous avons regardé un film.']],
  fields:[['Samstagmorgen',['Schwimmbad','Supermarkt','Kino']],['Mit wem',['mit ihrer Schwester','mit ihrer Mutter','allein']],['Gekauft',['eine Jacke','Schuhe','ein Buch']],['Sonntagsgäste',['die Großeltern','die Eltern','Freunde']],['Gäste sind gegangen um',['17 Uhr','15 Uhr','19 Uhr']],['Sonntagabend',['zu Hause einen Film geschaut','im Restaurant gegessen','ins Kino gegangen']]]},
 intro:['Ma sœur est partie à huit heures.',['Ma sœur est partie à dix heures.','Ma sœur est arrivée à huit heures.']],
 hard:{
  obj:[['avoir','passé composé mit avoir'],['etre','passé composé mit être'],['accord','Angleichung des Partizips'],['comprendre','Eine Erzählung über gestern hörend verstehen']],
  text:'Samedi dernier, je me {suis|Hilfsverb (se lever)|etre} levée à huit heures. Le matin, je {suis|Hilfsverb (aller)|etre} allée au marché. J’{ai|Hilfsverb (acheter)|avoir} acheté des légumes et du fromage. Ensuite, j’ai {pris|prendre, Partizip|avoir} un café avec Léa. À midi, mes parents sont {arrivés|arriver, Partizip, Plural|accord}. Nous {avons|Hilfsverb (déjeuner), nous|avoir} déjeuné ensemble. L’après-midi, nous avons {fait|faire, Partizip|avoir} une promenade, mais il n’a pas arrêté de {pleuvoir|regnen|avoir}. Mes parents sont {partis|partir, Partizip, Plural|accord} à six heures. Ma sœur est {venue|venir, Partizip, weiblich|accord} le soir. Nous {sommes|Hilfsverb (rester), nous|etre} restées à la maison et nous avons {regardé|regarder, Partizip|avoir} un film. Je me suis {couchée|se coucher, Partizip, weiblich|accord} à minuit.',
  listen:[
   {text:'Hier, Paul a eu une journée difficile. Il s’est levé en retard et il a raté son bus. Il est arrivé au bureau à dix heures. Le soir, il est allé au sport et il s’est couché tôt.',voice:'male',
    q:[['À quelle heure Paul est-il arrivé au bureau ? Réponds en chiffres.','10',null,'comprendre'],['Pourquoi est-il arrivé en retard ?','Il a raté son bus.',['Il a raté son bus.','Il a pris sa voiture.','Il est allé au sport.'],'avoir'],['Qu’est-ce qu’il a fait le soir ?','Il est allé au sport.',['Il est allé au sport.','Il est allé au cinéma.','Il est resté au bureau.'],'etre']]},
   {turns:[['A','Tes amis sont venus samedi ?'],['B','Oui, ils sont arrivés à midi et nous avons fait un barbecue.'],['A','Ils sont restés longtemps ?'],['B','Non, ils sont partis à quatre heures.']],voices:{A:'female',B:'male'},
    q:[['Quand les amis sont-ils arrivés ?','à midi',['à midi','à minuit','à quatre heures'],'comprendre'],['Qu’est-ce qu’ils ont fait ?','un barbecue',['un barbecue','une promenade','un film'],'avoir'],['À quelle heure sont-ils partis ? Réponds en chiffres.',['4','16'],null,'etre']]}
  ],
  writing:{situation:'Ton ami français te demande ce que tu as fait le week-end dernier. Réponds-lui par e-mail.',points:['Raconte ta journée de samedi (matin, après-midi, soir).','Dis qui est venu ou avec qui tu es sorti(e).','Dis ce que tu n’as pas fait et pourquoi.'],
   model:'Salut Hugo,\nSamedi, je me suis levée tard. L’après-midi, je suis allée en ville avec ma cousine et nous avons acheté des cadeaux. Le soir, des amis sont venus chez moi et nous avons fait une pizza. Dimanche, je ne suis pas sortie parce qu’il a plu toute la journée. J’ai lu un bon livre.\nEt toi ?\nMira'}
 },
 words:[['hier','gestern','yesterday'],['dernier / dernière','letzter / letzte','last'],['partir → parti(e)','abfahren → abgefahren','to leave'],['arriver → arrivé(e)','ankommen → angekommen','to arrive'],['faire → fait','machen → gemacht','to do → done'],['prendre → pris','nehmen → genommen','to take → taken'],['arrêter de','aufhören zu','to stop doing'],['se coucher','ins Bett gehen','to go to bed']],
 vocab:[['hier','gestern'],['dernier / dernière','letzter / letzte'],['partir','abfahren, weggehen'],['arriver','ankommen'],['rester','bleiben'],['rentrer','nach Hause kommen'],['sortir','ausgehen'],['se lever','aufstehen'],['se coucher','ins Bett gehen'],['arrêter de','aufhören zu'],['pleuvoir','regnen'],['acheter','kaufen']]
},
{
 id:6,
 phrases:[
  ['L’été dernier, nous sommes partis en Bretagne.','Letzten Sommer sind wir in die Bretagne gefahren.'],
  ['Nous étions dans un petit hôtel près de la mer.','Wir waren in einem kleinen Hotel am Meer.'],
  ['Il faisait beau et il faisait chaud.','Es war schön und es war warm.'],
  ['Un jour, il a plu toute la journée.','An einem Tag hat es den ganzen Tag geregnet.'],
  ['J’espérais avoir beau temps.','Ich hatte auf schönes Wetter gehofft.'],
  ['Nous avons visité un vieux village.','Wir haben ein altes Dorf besichtigt.'],
  ['Le soir, on mangeait au restaurant.','Abends aßen wir im Restaurant.'],
  ['On est partis en train.','Wir sind mit dem Zug gefahren.'],
  ['Les vacances étaient super.','Der Urlaub war super.'],
  ['C’était un peu cher, mais ça m’a beaucoup plu.','Es war etwas teuer, aber es hat mir sehr gefallen.']
 ],
 quiz:[
  ['Nous ___ dans un petit hôtel. (Beschreibung, Imperfekt)',['étions','sommes été','avons été'],'Nous étions dans un petit hôtel.','Für die Beschreibung der Situation in der Vergangenheit steht das imparfait: nous étions.'],
  ['Was bedeutet „Il faisait beau“?',['Es war schönes Wetter.','Es wird schönes Wetter.','Es ist schönes Wetter.'],'Il faisait beau et il faisait chaud.','Faisait ist imparfait: Hintergrund, Wetter in der Vergangenheit.'],
  ['Un jour, il ___ toute la journée. (ein Ereignis)',['a plu','pleuvait','pleut'],'Un jour, il a plu toute la journée.','Un jour markiert ein einzelnes abgeschlossenes Ereignis: passé composé.'],
  ['Was bedeutet „J’espérais avoir beau temps“?',['Ich hatte auf schönes Wetter gehofft.','Ich hoffe auf schönes Wetter.','Ich hatte schönes Wetter.'],'J’espérais avoir beau temps.','Espérer im imparfait: eine Erwartung in der Vergangenheit.'],
  ['Welche Endung hat das imparfait bei nous?',['-ions','-ons','-iez'],'Nous étions dans un petit hôtel.','Imparfait-Endungen: -ais, -ais, -ait, -ions, -iez, -aient.'],
  ['Le soir, on ___ au restaurant. (Gewohnheit)',['mangeait','a mangé','mange'],'Le soir, on mangeait au restaurant.','Wiederholte Gewohnheit in der Vergangenheit: imparfait. Bei manger bleibt das e: mangeait.'],
  ['Wie sagst du „Es war super“?',['C’était super.','C’est été super.','C’étais super.'],'Les vacances étaient super. C’était super.','C’était = es war (imparfait von c’est). Zu ce gehört die Endung -ait.'],
  ['Was bedeutet „ça m’a beaucoup plu“?',['es hat mir sehr gefallen','es hat sehr geregnet','es hat mir sehr gefehlt'],'Ça m’a beaucoup plu.','Plaire → plu: ça m’a plu = es hat mir gefallen. Achtung: il a plu (pleuvoir) = es hat geregnet.'],
  ['Wohin? Nous sommes partis ___ Bretagne.',['en','à','dans'],'Nous sommes partis en Bretagne.','Vor weiblichen Ländern und Regionen steht en.'],
  ['Welcher Satz beschreibt einen Hintergrund?',['Il faisait chaud.','Nous avons visité le musée.','Nous sommes arrivés à midi.'],'Il faisait chaud.','Wetter und Beschreibungen stehen im imparfait, Handlungen im passé composé.']
 ],
 dialogue:['Tu es parti où pendant les vacances ?','En Bretagne, avec ma femme.','Il faisait beau ?','Pas toujours. Le premier jour, il a plu toute la journée.','Vous étiez à l’hôtel ?','Oui, dans un petit hôtel près de la mer. C’était super !'],
 pron:['étais / était / étaient','Die Formen étais, était und étaient klingen gleich: [etɛ]. Nur nous étions [etjɔ̃] und vous étiez [etje] hört man anders. Unterscheide j’ai [ʒe] von j’étais [ʒetɛ].'],
 transfer:['Erzähle von deinen letzten Ferien: wo, wann, mit wem, Unterkunft, Wetter und wie es dir gefallen hat.','Schreibe eine Postkarte (ca. 40 Wörter) über einen vergangenen Urlaub mit imparfait und passé composé.'],
 domains:['Mündliche Produktion','Mündliche Interaktion','Schriftliche Produktion'],
 app:{speak:'L’été dernier, je suis parti en Bretagne avec ma famille. Nous étions dans un petit hôtel près de la mer. En général, il faisait beau, mais un jour, il a plu toute la journée. Nous avons visité un vieux village et nous avons mangé beaucoup de crêpes. C’était un peu cher, mais ça m’a beaucoup plu.',
  write:'L’été dernier, nous sommes partis en Bretagne.\nNous étions dans un petit hôtel.\nIl faisait beau et chaud.\nUn jour, nous avons visité un vieux village.\nC’était super !',
  placeholder:'Erzähle von deinen letzten Ferien …',help:'Beschreibungen und Wetter im imparfait, einzelne Ereignisse im passé composé.',
  hints:[['Nous étions …','Wir waren …'],['Il faisait beau / chaud.','Es war schön / warm.'],['Un jour, nous avons …','An einem Tag haben wir …']]},
 goals:['Von vergangenen Ferien erzählen: Ort, Zeit, Begleitung, Unterkunft, Wetter.','Das imparfait von être, avoir, faire und regelmäßigen Verben bilden.','Imparfait (Hintergrund, Gewohnheit) und passé composé (Ereignis) unterscheiden.'],
 units:[
  {title:'Das imparfait bilden',rule:'Das imparfait bildest du vom Stamm der nous-Form im Präsens: nous faisons → fais-, nous mangeons → mange-. Endungen: je -ais, tu -ais, il / elle / on -ait, nous -ions, vous -iez, ils / elles -aient. Einzige Ausnahme: être → ét-: j’étais, nous étions. Bei avoir: j’avais.',
   pairs:[['J’étais en vacances.','Ich war im Urlaub.'],['Nous avions une petite voiture.','Wir hatten ein kleines Auto.'],['Il faisait très chaud.','Es war sehr heiß.'],['Les enfants jouaient sur la plage.','Die Kinder spielten am Strand.'],['Vous étiez à l’hôtel ?','Wart ihr im Hotel?']],
   emphasis:['nous-Form','-ais','-ait','-ions','-iez','-aient','ét-']},
  {title:'imparfait oder passé composé?',rule:'Das imparfait beschreibt den Hintergrund: Wetter, Ort, Gefühle, Zustände (il faisait beau, j’étais fatigué) und Gewohnheiten (le soir, on mangeait au restaurant). Das passé composé erzählt einzelne, abgeschlossene Ereignisse, oft mit un jour, soudain, samedi: Un jour, il a plu toute la journée.',
   pairs:[['Il faisait beau quand nous sommes arrivés.','Es war schön, als wir angekommen sind.'],['Un jour, nous avons visité un château.','Eines Tages haben wir ein Schloss besichtigt.'],['Tous les matins, je nageais.','Jeden Morgen schwamm ich.'],['J’étais fatigué, alors je suis rentré.','Ich war müde, also bin ich nach Hause gegangen.'],['Soudain, il a commencé à pleuvoir.','Plötzlich hat es angefangen zu regnen.']],
   emphasis:['Hintergrund','Gewohnheiten','passé composé','un jour','soudain','tous les matins']}
 ],
 tasks:[
  [0,'Nous ___ dans un camping. (être)','étions',['étaient','sommes'],'Wir waren auf einem Campingplatz.','imparfait'],
  [0,'Il ___ très chaud. (faire)','faisait',['faisais','fait'],'Es war sehr heiß.','imparfait','Wetter in der Vergangenheit: imparfait, il faisait. Fait ist Präsens, faisais gehört zu je oder tu.'],
  [0,'J’___ une petite chambre. (avoir)','avais',['avait','avions'],'Ich hatte ein kleines Zimmer.','imparfait','Je → -ais: j’avais.'],
  [0,'Les enfants ___ sur la plage. (jouer)','jouaient',['jouait','jouions'],'Die Kinder spielten am Strand.','imparfait'],
  [0,'Vous ___ à l’hôtel ? (être)','étiez',['étais','étions'],'Wart ihr im Hotel?','imparfait'],
  [1,'Un jour, nous ___ un château. (visiter)','avons visité',['visitions','visitons'],'Eines Tages haben wir ein Schloss besichtigt.','passé composé','Un jour = ein einzelnes Ereignis → passé composé.'],
  [1,'Tous les soirs, on ___ au restaurant. (manger)','mangeait',['a mangé','mange'],'Jeden Abend aßen wir im Restaurant.','Gewohnheit','Tous les soirs = Gewohnheit → imparfait.'],
  [1,'Il ___ beau quand nous sommes arrivés. (faire)','faisait',['a fait','fait'],'Es war schön, als wir angekommen sind.','Hintergrund'],
  [1,'Soudain, il ___ à pleuvoir. (commencer)','a commencé',['commençait','commence'],'Plötzlich hat es angefangen zu regnen.','Ereignis'],
  [1,'Il était fatigué, alors il ___ rentré.','est',['a','avait'],'Er war müde, also ist er nach Hause gegangen.','Ereignis','Rentrer bildet das passé composé mit être: il est rentré.']
 ],
 check:[
  ['« Il faisait beau tous les jours, mais le dernier jour, il a plu. » Was stimmt?',['Nur am letzten Tag hat es geregnet.','Es hat jeden Tag geregnet.','Am letzten Tag war schönes Wetter.'],'Il faisait beau = Hintergrund; il a plu = einzelnes Ereignis am letzten Tag.','temps'],
  ['Du beschreibst das Hotel deiner letzten Ferien.',['L’hôtel était petit et calme.','L’hôtel a été petit et calme.','L’hôtel est petit et calme.'],'Beschreibungen in der Vergangenheit: imparfait.','description','L’hôtel était petit et calme.'],
  ['Du erzählst ein einzelnes Ereignis: Eines Tages haben wir eine Insel besucht.',['Un jour, nous avons visité une île.','Un jour, nous visitions une île.','Un jour, nous visitons une île.'],'Un jour + einzelnes Ereignis: passé composé.','evenement','Un jour, nous avons visité une île.'],
  ['« Le matin, je nageais et l’après-midi, je lisais. » Was beschreibt die Person?',['ihre Gewohnheiten im Urlaub','einen einzigen Tag','ihre Pläne'],'Imparfait mit le matin / l’après-midi: Gewohnheit.','habitude'],
  ['« J’espérais avoir beau temps, mais il n’a pas arrêté de pleuvoir. » Wie war das Wetter?',['schlecht, es hat ständig geregnet','schön, wie erhofft','wechselhaft mit Sonne'],'J’espérais = Erwartung; il n’a pas arrêté de pleuvoir = es hörte nicht auf zu regnen.','esperer'],
  ['Dein Partner fragt nach deinem Urlaub. Welche Frage passt zu „wo?“',['Où es-tu parti en vacances ?','Quand es-tu parti en vacances ?','Avec qui es-tu parti en vacances ?'],'Où = wo / wohin.','question','Où es-tu parti en vacances ?'],
  ['Wie sagst du: „Es hat mir gut gefallen“?',['Ça m’a bien plu.','Ça m’est bien plu.','Ça m’a bien plaisé.'],'Plaire bildet das passé composé mit avoir und dem Partizip plu.','plaire','Ça m’a bien plu.'],
  ['Welche Form ist richtig? « Nous ___ fatigués après le voyage. »',['étions','étaient','étiez'],'Nous → -ions: nous étions.','forme','Nous étions fatigués après le voyage.']
 ],
 transfers:[
  ['etre','Nous ___ à la montagne. (être, imparfait)','étions','Ihr wart in den Bergen.'],
  ['faire','Il ___ froid le matin. (faire, imparfait)','faisait','Es war morgens kalt.'],
  ['avoir','Les enfants ___ une grande chambre. (avoir, imparfait)','avaient','Die Kinder hatten ein großes Zimmer.'],
  ['habitude','Chaque jour, j’___ à la plage. (aller, imparfait)','allais','Jeden Tag gingst du an den Strand.'],
  ['evenement','Un soir, nous ___ un concert. (voir, passé composé)','avons vu','An einem Abend habt ihr ein Konzert gesehen.'],
  ['evenement','Samedi, elle ___ à Nice. (arriver, passé composé)','est arrivée','Am Samstag ist sie in Nizza angekommen.'],
  ['cetait','___ super ! (es war)','C’était','Du sagst, dass es super war.']
 ],
 comp:{voices:{A:'female',B:'male'},turns:[
  ['A','Alors, tes vacances en Provence ?'],['B','C’était génial ! Nous étions dans une maison avec un jardin.'],
  ['A','Il faisait chaud ?'],['B','Oui, très chaud, trente-cinq degrés tous les jours.'],
  ['A','Qu’est-ce que vous faisiez ?'],['B','Le matin, on allait au marché et l’après-midi, on se reposait.'],
  ['A','Vous avez visité des villes ?'],['B','Oui, un jour, nous avons visité Avignon. Mais il y avait beaucoup de touristes.']],
  fields:[['Urlaubsort',['Provence','Bretagne','Korsika']],['Unterkunft',['ein Haus mit Garten','ein kleines Hotel','ein Campingplatz']],['Temperatur',['35 Grad','25 Grad','30 Grad']],['Morgens',['Markt','Strand','Museum']],['Besuchte Stadt',['Avignon','Marseille','Nizza']],['Problem dort',['viele Touristen','Regen','hohe Preise']]]},
 intro:['Nous étions dans un petit hôtel près de la mer.',['Nous étions dans un grand hôtel près de la mer.','Nous sommes dans un petit hôtel près de la mer.']],
 hard:{
  obj:[['imparfait','imparfait bilden'],['choix','imparfait und passé composé unterscheiden'],['vacances','Über Ferien sprechen'],['comprendre','Einen Ferienbericht hörend verstehen']],
  text:'Chère Anne, l’été dernier, nous sommes {partis|partir, Partizip, Plural|choix} en Corse. Nous {étions|être, imparfait, nous|imparfait} dans un petit hôtel près de la plage. Il {faisait|faire, imparfait|imparfait} beau et chaud. Tous les matins, les enfants {jouaient|jouer, imparfait, ils|imparfait} dans la mer. Le soir, on {mangeait|manger, imparfait, on|imparfait} au restaurant. J’{espérais|espérer, imparfait, je|imparfait} visiter beaucoup de villages. Un jour, nous {avons|Hilfsverb (visiter)|choix} visité Bonifacio. Mais le lendemain, il a {plu|pleuvoir, Partizip|choix} toute la journée. Nous {sommes|Hilfsverb (rester)|choix} restés à l’hôtel. C’{était|être, imparfait|imparfait} un peu cher, mais ça nous a beaucoup {plu|plaire, Partizip|vacances}. L’année prochaine, nous retournons en {vacances|Ferien|vacances} à la mer !',
  listen:[
   {text:'L’année dernière, je suis partie au Maroc avec une amie. Nous étions dans une petite maison à Marrakech. Il faisait très chaud. Un jour, nous avons fait une excursion dans le désert. C’était magnifique.',voice:'female',
    q:[['Où est-elle partie ?','au Maroc',['au Maroc','en Tunisie','en Espagne'],'vacances'],['Comment était le temps ?','Il faisait très chaud.',['Il faisait très chaud.','Il pleuvait souvent.','Il faisait froid le soir.'],'imparfait'],['Qu’est-ce qu’elles ont fait un jour ?','une excursion dans le désert',['une excursion dans le désert','une promenade à la plage','une visite du musée'],'choix']]},
   {turns:[['A','Vous étiez où cet hiver ?'],['B','À la montagne. On faisait du ski tous les jours.'],['A','Et il y avait de la neige ?'],['B','Beaucoup ! Mais le dernier jour, je suis tombé et je me suis fait mal au bras.']],voices:{A:'male',B:'male'},
    q:[['Où étaient-ils cet hiver ?','à la montagne',['à la montagne','à la mer','à la campagne'],'vacances'],['Qu’est-ce qu’ils faisaient tous les jours ?','du ski',['du ski','de la randonnée','du vélo'],'imparfait'],['Qu’est-ce qui s’est passé le dernier jour ?','Il est tombé.',['Il est tombé.','Il est parti plus tôt.','Il a neigé.'],'choix']]}
  ],
  writing:{situation:'Tu rentres de vacances. Écris une carte postale à un ami français.',points:['Dis où tu étais, avec qui et où tu dormais.','Décris le temps et ce que vous faisiez chaque jour.','Raconte un événement spécial et dis si ça t’a plu.'],
   model:'Cher Antoine,\nJe suis rentrée hier de Normandie ! J’étais avec mon frère dans une petite chambre d’hôtes. Il faisait frais, mais il ne pleuvait pas. Tous les matins, nous faisions du vélo le long de la mer. Un jour, nous avons visité le Mont-Saint-Michel. C’était magnifique et ça m’a beaucoup plu !\nÀ bientôt,\nSarah'}
 },
 words:[['l’imparfait','das Imperfekt','imperfect tense'],['il faisait beau','es war schön','the weather was nice'],['j’étais','ich war','I was'],['espérer','hoffen','to hope'],['un jour','eines Tages','one day'],['tous les jours','jeden Tag','every day'],['plaire → plu','gefallen → gefallen','to please'],['la plage','der Strand','beach']],
 vocab:[['les vacances (f.)','die Ferien, der Urlaub'],['la mer','das Meer'],['la plage','der Strand'],['la montagne','die Berge'],['l’hôtel (m.)','das Hotel'],['espérer','hoffen'],['visiter','besichtigen'],['le village','das Dorf'],['plaire','gefallen'],['tous les jours','jeden Tag'],['soudain','plötzlich'],['l’excursion (f.)','der Ausflug']]
}
];
