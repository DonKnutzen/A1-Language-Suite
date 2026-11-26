/* Original B1 curriculum. Internal EN_A1 names preserve the proven UI contracts;
   storage and cloud identity are independently versioned as English B1. */
(() => {
  'use strict';
  const lessons=[];
  const rows=s=>s.trim().split('\n').map(x=>x.trim().split('|'));
  const topic=(title,rule,data)=>({title,rule,rows:rows(data),examples:rows(data).slice(0,3).map(([q,a,,,m])=>[q.replace('___',a),m])});
  function add(id,title,goals,words,phrases,topics,contexts,cloze){
    const pairs=rows(phrases), meanings=pairs.map(p=>p[1]);
    lessons.push({id,title,topic:title,skills:['Hören','Sprechen','Lesen','Schreiben'],goals:goals.split('|'),
      vocabulary:words.split(';').map(x=>x.split('=')),phrases:pairs,
      phraseRows:pairs.map(([p,m],i)=>[p,m,meanings[(i+1)%pairs.length],meanings[(i+2)%pairs.length]]),
      topics,contexts:rows(contexts),cloze});
  }
  add(1,'Mein Leben, meine Interessen',
  'Gewohnheiten und vorübergehende Aktivitäten unterscheiden|Interessen beschreiben und Gründe verbinden|Ein persönliches Profil zusammenhängend verfassen',
  'be keen on=begeistert sein von;be interested in=interessiert sein an;currently=derzeit;usually=gewöhnlich;occasionally=gelegentlich;rarely=selten;neighbourhood=Nachbarschaft;belong to=angehören;join=beitreten;improve=verbessern;although=obwohl;however=allerdings;therefore=deshalb;while=während;prefer=bevorzugen;experience=Erfahrung;confident=selbstsicher;challenge=Herausforderung;regularly=regelmäßig;temporary=vorübergehend',
  `I'm keen on live music.|Ich bin begeistert von Livemusik.
  I'm currently taking a course.|Ich mache derzeit einen Kurs.
  I usually work from home.|Ich arbeite normalerweise von zu Hause.
  Although it's difficult, I enjoy it.|Obwohl es schwierig ist, macht es mir Spaß.
  What do you do in your free time?|Was machst du in deiner Freizeit?
  I'd like to become more confident.|Ich möchte selbstsicherer werden.`,
  [topic('Gewohnheit oder gerade jetzt?',`Present simple beschreibt Gewohnheiten und Zustände: I work; she works. Present continuous (am/is/are + -ing) beschreibt laufende oder vorübergehende Handlungen. Signalwörter helfen, aber die Bedeutung entscheidet. Zustandsverben wie know, want und belong stehen normalerweise nicht in der Verlaufsform.\n\nFragen: Do you work? / Are you working? Verneinung: she does not work / she is not working.`,
  `I usually ___ at seven.|start|am starting|starts|Ich fange normalerweise um sieben an.
  This week she ___ from home.|is working|worked|working|Diese Woche arbeitet sie vorübergehend zu Hause.
  My brother ___ to a running club.|belongs|is belonging|belong|Mein Bruder gehört einem Laufverein an.
  Listen! Someone ___ the piano.|is playing|play|played|Hör zu! Jemand spielt gerade Klavier.
  How often ___ you exercise?|do|are|does|Wie oft treibst du Sport?
  I ___ what you mean.|understand|am understanding|understands|Ich verstehe, was du meinst.
  At the moment we ___ for a concert.|are practising|practises|practised|Im Moment proben wir für ein Konzert.
  Rosa ___ the bus every morning.|takes|is take|take|Rosa nimmt jeden Morgen den Bus.
  ___ he studying right now?|Is|Does|Do|Lernt er gerade?
  We ___ any help right now.|do not need|are not needing|does not need|Wir brauchen gerade keine Hilfe.`),
  topic('Gründe, Gegensatz und Folge',`Because leitet einen Grund ein; so eine Folge. Although verbindet einen Gegensatz mit einem vollständigen Nebensatz. However ist ein Satzadverb: zwei selbstständige Sätze werden mit Punkt oder Semikolon getrennt.\n\nNach because folgt Subjekt + Verb, nach because of eine Nomengruppe. Vermeide although … but im selben Satz. Damit verknüpfst du Aussagen klar, statt nur einzelne Sätze aufzuzählen.`,
  `I practise ___ I want to improve.|because|although|so|Ich übe, weil ich besser werden möchte.
  ___ it was raining, we went out.|Although|Because of|Despite of|Obwohl es regnete, gingen wir hinaus.
  The club was full, ___ we tried another one.|so|because|although|Der Verein war voll, deshalb versuchten wir einen anderen.
  I stayed home because ___ the storm.|of|for|to|Ich blieb wegen des Sturms zu Hause.
  I like running. ___, I dislike competitions.|However|Because|Although|Ich laufe gerne. Allerdings mag ich Wettkämpfe nicht.
  We arrived late ___ the bus broke down.|because|so|because of|Wir kamen spät an, weil der Bus eine Panne hatte.
  ___ she was tired, she finished the lesson.|Although|So|Because of|Obwohl sie müde war, beendete sie die Lektion.
  The tickets were expensive, ___ we saved up.|so|because|although|Die Karten waren teuer, deshalb sparten wir.
  He missed training because ___ an injury.|of|to|at|Er verpasste das Training wegen einer Verletzung.
  I enjoy the course. ___, the homework takes time.|However|Although|Because|Ich mag den Kurs. Allerdings kostet die Hausaufgabe Zeit.`)],
  `Deine Freundin fragt nach einer vorübergehenden Aktivität. Welche Antwort passt?|I'm learning to cook this month.|I learned to cook in 2015.|I never cook.
  Du willst trotz Schwierigkeit Interesse ausdrücken.|Although it's challenging, I enjoy it.|It's challenging, so I gave up.|I enjoy it because it's easy.
  Du fragst nach einer Gewohnheit.|How often do you go running?|Are you running right now?|Where did you run yesterday?`,
  `I usually {work|work: Gewohnheit} in an office, but this month I {am working|work: vorübergehend} at home. My sister {belongs|belong} to a music club. I {do not know~don't know|know: verneinen} its members yet. {Although|Obwohl} I am shy, I want to join. I practise {because|weil} I enjoy music. The club is nearby, {so|deshalb} I can walk there. We missed a rehearsal because {of|wegen + Nomen} the snow.`);

  add(2,'Arbeit, Lernen und Erfahrungen',
  'Erfahrungen von abgeschlossenen Ereignissen unterscheiden|Dauer und aktuelle Neuigkeiten ausdrücken|Im Vorstellungsgespräch Beispiele geben',
  'apply for=sich bewerben um;qualification=Qualifikation;achievement=Leistung;colleague=Kollege oder Kollegin;deadline=Frist;training=Ausbildung oder Schulung;skill=Fähigkeit;salary=Gehalt;shift=Schicht;since=seit einem Zeitpunkt;for=seit einer Dauer;already=bereits;yet=schon oder noch;recently=kürzlich;ever=jemals;never=niemals;so far=bisher;graduate=den Abschluss machen;interview=Vorstellungsgespräch;responsible for=verantwortlich für',
  `I've worked in a team before.|Ich habe schon in einem Team gearbeitet.
  I worked there last summer.|Ich habe letzten Sommer dort gearbeitet.
  I've lived here for three years.|Ich wohne seit drei Jahren hier.
  Have you finished yet?|Bist du schon fertig?
  I've just sent my application.|Ich habe gerade meine Bewerbung abgeschickt.
  I'm responsible for customer service.|Ich bin für den Kundenservice verantwortlich.`,
  [topic('Present perfect oder past simple?',`Present perfect: have/has + past participle; die Erfahrung oder das Ergebnis ist jetzt wichtig, ohne abgeschlossenen Vergangenheitszeitpunkt. Past simple steht bei einem abgeschlossenen Zeitpunkt wie yesterday, last year oder in 2020.\n\nHave you ever worked abroad? I worked in Dublin in 2022. Unregelmäßig: go–went–gone, write–wrote–written, see–saw–seen, lead–led–led, have–had–had. Been bedeutet hier besucht und zurück; gone bedeutet hingegangen und noch dort.`,
  `I ___ three jobs so far.|have had|have have|has had|Ich hatte bisher drei Arbeitsstellen.
  She ___ in Rome in 2021.|worked|has worked|work|Sie arbeitete 2021 in Rom.
  Have you ever ___ a team?|led|lead|leading|Hast du jemals ein Team geleitet?
  We ___ the course last Friday.|finished|have finished|has finished|Wir beendeten den Kurs letzten Freitag.
  He has ___ to the bank; he isn't back.|gone|been|went|Er ist zur Bank gegangen und noch nicht zurück.
  I have never ___ this software.|used|use|using|Ich habe diese Software noch nie verwendet.
  ___ you attend the interview yesterday?|Did|Have|Has|Warst du gestern beim Vorstellungsgespräch?
  They ___ their results yet.|have not received|did not received|has not received|Sie haben ihre Ergebnisse noch nicht erhalten.
  She ___ her degree two years ago.|completed|has completed|completes now|Sie schloss ihr Studium vor zwei Jahren ab.
  I have ___ to Scotland twice and returned.|been|gone|went|Ich war zweimal in Schottland und bin zurückgekehrt.`),
  topic('For, since, just, already und yet',`For nennt eine Zeitdauer; since den Anfang: for six months, since January. Für einen Zustand, der bis jetzt andauert, benutzt du das present perfect. How long have you …? fragt nach der Dauer.\n\nJust bedeutet gerade eben und steht zwischen have und Partizip. Already steht oft dort ebenfalls. Yet steht meist am Ende von Fragen oder Verneinungen. Ever fragt nach Erfahrung, never verneint sie ohne zusätzliches not.`,
  `I've known her ___ 2018.|since|for|during|Ich kenne sie seit 2018.
  We've studied together ___ six months.|for|since|ago|Wir lernen seit sechs Monaten zusammen.
  I've ___ finished; I clicked send a moment ago.|just|yet|ever|Ich bin gerade fertig geworden.
  Has the course started ___?|yet|since|never|Hat der Kurs schon angefangen?
  She has ___ passed; she needs no retake.|already|yet|ever|Sie hat bereits bestanden und braucht keine Wiederholung.
  How ___ have you worked here?|long|much|many|Wie lange arbeitest du hier schon?
  I haven't met the manager ___.|yet|ever|since|Ich habe die Leitung noch nicht getroffen.
  Have you ___ applied for a job abroad?|ever|yet|since|Hast du dich jemals im Ausland beworben?
  He has lived here ___ he left school.|since|for|during|Er lebt hier, seit er die Schule verlassen hat.
  We have ___ had a company car: not once.|never|ever|yet|Wir hatten noch nie einen Firmenwagen.`)],
  `Du berichtest über Erfahrung ohne Zeitpunkt.|I've organised events before.|I organise one yesterday.|I have organise before.
  Du fragst nach der Dauer im jetzigen Job.|How long have you worked here?|When have you worked yesterday?|How many work here?
  Du nennst ein abgeschlossenes Ereignis.|I started the course in March 2023.|I've started it in March 2023.|I starting in March 2023.`,
  `I {have worked|'work': Erfahrung bis jetzt} in several offices. I {started|start: abgeschlossen} my first job in 2019. I have known my colleague {since|seit 2021} 2021, and we have shared an office {for|Dauer} four years. She has {just|gerade eben} become a manager. I haven't applied for promotion {yet|noch nicht}. Have you {ever|jemals} led a project? I have {never|noch nie} managed one alone.`);

  add(3,'Essen planen und Wünsche äußern',
  'Mengen und fehlende Zutaten beschreiben|Höflich bestellen und Vorschläge aushandeln|Eine gemeinsame Mahlzeit organisieren',
  'ingredient=Zutat;portion=Portion;recipe=Rezept;vegetarian=vegetarisch;allergy=Allergie;available=verfügbar;book a table=einen Tisch reservieren;instead=stattdessen;avoid=vermeiden;recommend=empfehlen;bill=Rechnung;tip=Trinkgeld;a few=ein paar;a little=ein wenig;plenty of=reichlich;run out of=keinen Vorrat mehr haben an;grilled=gegrillt;spicy=scharf;starter=Vorspeise;main course=Hauptgericht',
  `Could we have the bill, please?|Könnten wir bitte die Rechnung bekommen?
  How about making soup?|Wie wäre es mit Suppe kochen?
  Shall we book a table?|Sollen wir einen Tisch reservieren?
  I'd rather eat outside.|Ich würde lieber draußen essen.
  There's very little milk left.|Es ist nur noch sehr wenig Milch da.
  I'm allergic to nuts.|Ich bin gegen Nüsse allergisch.`,
  [topic('Zählbare Mengen und Vorräte',`Many und (a) few stehen mit zählbaren Pluralnomen; much und (a) little mit nicht zählbaren Nomen. A few/a little bedeutet etwas vorhanden; few/little betont einen Mangel. A lot of und plenty of passen zu beiden Gruppen.\n\nSome ist in Angeboten und Bitten üblich: Would you like some tea? Any steht oft in neutralen Fragen und Verneinungen. Advice, information und bread sind nicht zählbar; verwende a piece of oder eine passende Einheit.`,
  `How ___ guests are coming?|many|much|little|Wie viele Gäste kommen?
  We haven't got ___ rice left.|much|many|a few|Wir haben nicht mehr viel Reis.
  There are ___ eggs, enough for two people.|a few|a little|much|Es gibt ein paar Eier, genug für zwei.
  I need ___ advice about the menu.|some|an|many|Ich brauche etwas Rat zum Menü.
  Would you like ___ water?|some|many|a few|Möchtest du etwas Wasser?
  We have very ___ time; let's order now.|little|few|many|Wir haben sehr wenig Zeit; bestellen wir jetzt.
  There isn't ___ bread in the cupboard.|any|many|a few|Im Schrank ist kein Brot.
  How ___ sugar does the recipe need?|much|many|few|Wie viel Zucker braucht das Rezept?
  Only ___ people replied, so the room is nearly empty.|a few|a little|much|Nur ein paar Leute antworteten, deshalb ist der Raum fast leer.
  We need two ___ of milk.|bottles|milks|pieces|Wir brauchen zwei Flaschen Milch.`),
  topic('Höfliche Bitten und Vorschläge',`Could I/we + Grundform formuliert eine höfliche Bitte. Would you mind + -ing bittet die andere Person um etwas. How about/What about + -ing macht einen Vorschlag; Shall we und Why don't we verlangen die Grundform.\n\nI'd rather + Grundform nennt eine Vorliebe. Prefer steht mit Nomen oder -ing, etwa I prefer tea to coffee. Begründe eine Ablehnung freundlich und biete eine Alternative an.`,
  `Could we ___ a quieter table?|have|having|to have|Könnten wir einen ruhigeren Tisch bekommen?
  How about ___ a vegetarian dish?|cooking|cook|to cook|Wie wäre es, ein vegetarisches Gericht zu kochen?
  Shall we ___ the restaurant?|call|calling|to call|Sollen wir das Restaurant anrufen?
  Would you mind ___ the window?|closing|close|to close|Würdest du bitte das Fenster schließen?
  I'd rather ___ at home tonight.|eat|eating|to eat|Ich würde heute lieber zu Hause essen.
  Why don't we ___ the salad?|share|sharing|to share|Warum teilen wir nicht den Salat?
  I prefer tea ___ coffee.|to|than|as|Ich ziehe Tee dem Kaffee vor.
  What about ___ a table for six?|booking|book|to book|Wie wäre es, einen Tisch für sechs zu reservieren?
  Would you mind ___ us some water?|bringing|bring|to bring|Würdest du uns bitte etwas Wasser bringen?
  I'd rather ___ fish because of my allergy.|not have|don't have|not having|Wegen meiner Allergie würde ich lieber keinen Fisch nehmen.`)],
  `Du bittest die Bedienung höflich um Hilfe.|Could you explain this dish, please?|You explain now.|Why did you cook it?
  Ein Freund schlägt Fleisch vor, du bevorzugst Gemüse.|I'd rather have vegetables. How about a curry?|I hate your idea. End of discussion.|I ate vegetables last year.
  Du warnst vor einem gefährlichen Lebensmittel für dich.|I'm allergic to nuts.|I'm keen on nuts.|There are a few nuts.`,
  `How {many|wie viele} people are coming? We only have a {little|ein wenig: unzählbar} rice and a {few|ein paar: zählbar} eggs. We haven't got {any|keine Menge} bread. How about {making|make nach how about} soup? I'd rather {order|order nach would rather} pizza. Shall we {call|call nach shall} the restaurant? Could we have some water {instead|stattdessen}?`);

  add(4,'Begegnungen und Geschichten',
  'Hintergrund und Ereignisse in der Vergangenheit verbinden|Eine Geschichte zeitlich ordnen|Über eine unerwartete Begegnung erzählen',
  'while=während;as soon as=sobald;suddenly=plötzlich;eventually=schließlich;meanwhile=inzwischen;fortunately=glücklicherweise;unfortunately=leider;realise=bemerken;recognise=wiedererkennen;stranger=fremde Person;journey=Reise;break down=eine Panne haben;pick up=abholen;turn up=auftauchen;by the time=als schließlich;afterwards=danach;at first=anfangs;in the end=am Ende;miss=verpassen;unexpected=unerwartet',
  `I was waiting when she called.|Ich wartete gerade, als sie anrief.
  While we were talking, it started to rain.|Während wir redeten, fing es an zu regnen.
  At first, I didn't recognise him.|Anfangs erkannte ich ihn nicht.
  Suddenly, the lights went out.|Plötzlich ging das Licht aus.
  Fortunately, nobody was hurt.|Glücklicherweise wurde niemand verletzt.
  What happened next?|Was passierte danach?`,
  [topic('Past simple und past continuous',`Past continuous: was/were + -ing beschreibt eine Handlung, die zu einem vergangenen Zeitpunkt im Gang war. Past simple erzählt ein abgeschlossenes Ereignis, das etwa diese Handlung unterbricht.\n\nI was walking when I saw him. While verbindet häufig zwei gleichzeitige längere Handlungen. Was/were richtet sich nach dem Subjekt. Zustände wie know bleiben meist im past simple.`,
  `I ___ dinner when the phone rang.|was cooking|cooked|am cooking|Ich kochte gerade, als das Telefon klingelte.
  We were waiting when the bus ___.|arrived|was arrive|arrives|Wir warteten, als der Bus ankam.
  While she ___, I made tea.|was studying|is studying|studies|Während sie lernte, machte ich Tee.
  What ___ you doing at eight last night?|were|was|did|Was hast du gestern Abend um acht gerade gemacht?
  I ___ the answer immediately.|knew|was knowing|am knowing|Ich wusste die Antwort sofort.
  They ___ sleeping when the alarm sounded.|were|was|did|Sie schliefen gerade, als der Alarm ertönte.
  The taxi ___ down while we were crossing the bridge.|broke|was break|breaks tomorrow|Das Taxi hatte eine Panne, als wir die Brücke überquerten.
  At nine yesterday, she ___ a report.|was writing|is writing|writes|Gestern um neun schrieb sie gerade einen Bericht.
  ___ he talking when you entered?|Was|Were|Did|Redete er gerade, als du hereinkamst?
  I ___ my keys while I was running.|lost|was lose|lose now|Ich verlor meine Schlüssel beim Laufen.`),
  topic('Eine Geschichte verständlich ordnen',`At first beschreibt den Anfang einer Entwicklung; then und afterwards die nächsten Schritte. Suddenly kündigt etwas Unerwartetes an. Eventually und in the end nennen das spätere Ergebnis. Meanwhile verbindet parallele Ereignisse.\n\nAfter und before können vor einem Satz oder einer -ing-Form stehen: after we arrived / after arriving. As soon as heißt sobald; until markiert die Grenze einer andauernden Handlung.`,
  `___, I was nervous, but later I relaxed.|At first|At last of|Since tomorrow|Anfangs war ich nervös, später entspannte ich mich.
  We searched for hours. ___, we found the hotel.|Eventually|Before|While|Wir suchten stundenlang. Schließlich fanden wir das Hotel.
  I called home as soon ___ I arrived.|as|than|to|Ich rief zu Hause an, sobald ich angekommen war.
  After ___ the station, we took a taxi.|leaving|leave|left|Nachdem wir den Bahnhof verlassen hatten, nahmen wir ein Taxi.
  She waited ___ the rain stopped.|until|during|because of|Sie wartete, bis der Regen aufhörte.
  The train stopped. ___, the lights went out.|Suddenly|Because of|During|Der Zug hielt. Plötzlich ging das Licht aus.
  I bought tickets. ___, my friend checked the map.|Meanwhile|Because|Although|Ich kaufte Karten. Inzwischen prüfte mein Freund die Karte.
  Before ___, check your bag.|leaving|leave|left|Prüfe vor dem Aufbrechen deine Tasche.
  We missed the bus. ___, a neighbour gave us a lift.|Fortunately|During|Until|Wir verpassten den Bus. Glücklicherweise nahm uns ein Nachbar mit.
  We had dinner and went home ___.|afterwards|meanwhile before|during|Wir aßen zu Abend und gingen danach nach Hause.`)],
  `Du schilderst eine unterbrochene Handlung.|I was reading when the doorbell rang.|I read when the doorbell was ring.|I am reading yesterday.
  Du fragst nach dem nächsten Ereignis.|What happened next?|What happens every day?|How often does it happen?
  Eine Geschichte endete nach Schwierigkeiten gut.|In the end, we got home safely.|At first, we haven't left.|Meanwhile, tomorrow was sunny.`,
  `Yesterday I {was walking|walk: gerade dabei} home when I {noticed|notice: Ereignis} a lost dog. It {was waiting|wait: Hintergrund} outside a shop. {While|Während} I was checking its collar, the owner arrived. At {first|Anfangs} he looked worried. As soon {as|sobald} he saw the dog, he smiled. After {thanking|thank nach after} me, he took it home. {Fortunately|Glücklicherweise}, the dog was safe.`);

  add(5,'Geld, Regeln und guter Rat',
  'Pflichten, Verbote und fehlende Notwendigkeit unterscheiden|Ratschläge begründen|Zahlungsprobleme höflich klären',
  'cash=Bargeld;withdraw=abheben;cash machine=Geldautomat;charge=Gebühr;receipt=Kassenbeleg;refund=Rückerstattung;account=Konto;afford=sich leisten können;save up=ansparen;borrow=ausleihen von;lend=verleihen an;owe=schulden;exchange rate=Wechselkurs;compulsory=verpflichtend;permission=Erlaubnis;allowed=erlaubt;ought to=sollte;ought not to=sollte nicht;budget=Budget;PIN=Geheimzahl',
  `You mustn't share your PIN.|Du darfst deine Geheimzahl nicht weitergeben.
  You don't have to pay today.|Du musst heute nicht bezahlen.
  Could I have a receipt?|Könnte ich einen Beleg bekommen?
  You should check the exchange rate.|Du solltest den Wechselkurs prüfen.
  Can you lend me ten pounds?|Kannst du mir zehn Pfund leihen?
  I'd like to request a refund.|Ich möchte eine Rückerstattung beantragen.`,
  [topic('Must, have to und dürfen',`Must und have to drücken Pflicht aus. Für Vergangenheit benutzt du had to, für Zukunft will have to. Mustn't ist ein Verbot; don't have to bedeutet nicht nötig und erlaubt die Handlung trotzdem.\n\nBe allowed to drückt Erlaubnis aus. Can kann ebenfalls Erlaubnis meinen. Nach must/can steht die Grundform, nach have to und allowed to ebenfalls der Infinitiv. Fragen mit have to brauchen do/does/did.`,
  `You ___ enter your PIN to withdraw money.|have to|mustn't|don't have to|Du musst zum Abheben deine PIN eingeben.
  You ___ tell anyone your password: it's forbidden.|mustn't|don't have to|have to|Du darfst niemandem dein Passwort sagen.
  The museum is free, so we ___ pay.|don't have to|mustn't|must|Das Museum ist kostenlos, also müssen wir nicht bezahlen.
  Yesterday I ___ show my ID.|had to|must|have to tomorrow|Gestern musste ich meinen Ausweis zeigen.
  ___ she have to sign the form?|Does|Must|Has|Muss sie das Formular unterschreiben?
  Are visitors allowed ___ photos?|to take|taking|take|Dürfen Besucher Fotos machen?
  Next year we will ___ renew the card.|have to|must|had to|Nächstes Jahr werden wir die Karte erneuern müssen.
  You ___ borrow my pen; I give you permission.|can|mustn't|have forbidden|Du darfst meinen Stift ausleihen.
  We ___ queue because we booked online.|don't have to|mustn't|must|Wir müssen nicht anstehen, weil wir online gebucht haben.
  ___ you have to pay a fee yesterday?|Did|Must|Have|Musstest du gestern eine Gebühr bezahlen?`),
  topic('Ratschläge und finanzielle Wendungen',`Should/shouldn't und ought to/ought not to geben Rat. Had better + Grundform ist ein stärkerer Rat für eine konkrete Situation mit möglichen Folgen. Nach should steht kein to.\n\nBorrow something from somebody bedeutet etwas von jemandem leihen; lend something to somebody bedeutet jemandem etwas leihen. Spend money on, pay for und save up for sind feste Verbindungen.`,
  `You should ___ your receipts.|keep|keeping|to keep|Du solltest deine Belege aufbewahren.
  You ought ___ compare prices.|to|for|at|Du solltest Preise vergleichen.
  We'd better ___ now or the bank will close.|leave|to leave|leaving|Wir sollten jetzt gehen, sonst schließt die Bank.
  Can I borrow some money ___ you?|from|to|at|Kann ich von dir Geld leihen?
  I lent twenty pounds ___ my brother.|to|from|at|Ich lieh meinem Bruder zwanzig Pfund.
  She spends too much money ___ clothes.|on|for|to|Sie gibt zu viel Geld für Kleidung aus.
  You shouldn't ___ more than you can afford.|spend|to spend|spent|Du solltest nicht mehr ausgeben, als du dir leisten kannst.
  He is saving up ___ a bicycle.|for|on|from|Er spart auf ein Fahrrad.
  We paid ___ the tickets by card.|for|on|to|Wir bezahlten die Karten mit Karte.
  You had better ___ lose this receipt.|not|don't|to not|Du solltest diesen Beleg besser nicht verlieren.`)],
  `Der Eintritt ist freiwillig kostenlos. Welche Aussage stimmt?|You don't have to pay.|You mustn't enter.|You must pay in cash.
  Ein Freund gibt dir vorübergehend Geld. Du sagst:|Can I borrow some money from you?|Can I lend money from you?|Can I owe from you?
  Du warnst vor verbotener Weitergabe der PIN.|You mustn't share your PIN.|You don't have to keep it secret.|You ought share it.`,
  `You {have to|Pflicht, zwei Wörter} show ID to open an account. You {must not~mustn't|Verbot} share your PIN. You {do not have to~don't have to|nicht nötig} pay for this free service. Yesterday I {had to|Pflicht Vergangenheit} visit the bank. You should {keep|keep nach should} your receipt. I borrowed money {from|von jemandem leihen} my sister and paid {for|bezahlen für} the repair. Now I'm saving up {for|sparen auf} a new bike.`);

  add(6,'Gesund leben und vergleichen',
  'Alternativen differenziert vergleichen|Über zu große und ausreichende Mengen sprechen|Vorlieben mit Gründen beschreiben',
  'fit=fit;exhausted=erschöpft;balanced=ausgewogen;habit=Gewohnheit;routine=Routine;chores=Hausarbeit;convenient=praktisch;effective=wirksam;crowded=überfüllt;affordable=bezahlbar;far less=weit weniger;slightly=etwas;nearly=fast;as fit as=so fit wie;enough=genug;too much=zu viel;fitness centre=Fitnessstudio;prefer=bevorzugen;rather than=statt;membership=Mitgliedschaft',
  `Cycling is much cheaper than driving.|Radfahren ist viel günstiger als Autofahren.
  It isn't as crowded as the other gym.|Es ist nicht so voll wie das andere Studio.
  I'm not fit enough yet.|Ich bin noch nicht fit genug.
  The class is too expensive for me.|Der Kurs ist zu teuer für mich.
  I'd rather walk than take the bus.|Ich würde lieber gehen als den Bus nehmen.
  I prefer swimming to running.|Ich ziehe Schwimmen dem Laufen vor.`,
  [topic('Vergleiche und ihre Abstufung',`Kurze Adjektive bilden meist -er/-est; längere more/most. Unregelmäßig: good–better–best, bad–worse–worst. Than vergleicht Unterschiede, as … as Gleichheit; not as … as bedeutet weniger.\n\nMuch/far/a lot verstärken einen Komparativ; a little/slightly schwächen ihn ab. Very steht nicht direkt vor einem Komparativ. Superlative haben meist the: the most convenient option.`,
  `Walking is much ___ than driving.|healthier|healthy|healthiest|Gehen ist viel gesünder als Autofahren.
  This is the ___ expensive membership.|most|more|much|Das ist die teuerste Mitgliedschaft.
  The pool isn't as busy ___ the gym.|as|than|to|Das Schwimmbad ist nicht so voll wie das Studio.
  My new routine is slightly ___.|better|best|good|Meine neue Routine ist etwas besser.
  Today is ___ than yesterday.|worse|worst|bad|Heute ist schlechter als gestern.
  This route is far ___ convenient.|more|most|very|Diese Route ist viel praktischer.
  Cycling is ___ expensive than taking taxis.|less|least|little|Radfahren ist weniger teuer als Taxifahren.
  It is the ___ crowded time of day.|least|less|little|Es ist die am wenigsten volle Tageszeit.
  I'm as fit ___ my brother.|as|than|to|Ich bin so fit wie mein Bruder.
  The new class is a little ___ than the old one.|harder|hardest|hard|Der neue Kurs ist etwas schwieriger als der alte.`),
  topic('Too, enough und Vorlieben',`Too + Adjektiv bedeutet mehr als gut oder möglich ist. Adjektiv + enough bedeutet ausreichend. Bei Nomen steht enough davor: enough time. Too much passt zu unzählbaren, too many zu zählbaren Pluralnomen.\n\nPrefer + -ing + to + -ing; would rather + Grundform + than + Grundform. Would prefer kann mit to + Infinitiv stehen. Vergleiche ihre Formen, statt sie zu mischen.`,
  `The water is too cold ___ swim in.|to|for swimming to|than|Das Wasser ist zu kalt, um darin zu schwimmen.
  I don't have ___ time to exercise.|enough|too|many|Ich habe nicht genug Zeit zum Sport.
  She isn't old ___ to join.|enough|too|much|Sie ist noch nicht alt genug, um beizutreten.
  There are too ___ people in this class.|many|much|little|In diesem Kurs sind zu viele Leute.
  I prefer cycling to ___.|driving|drive|to drive|Ich ziehe Radfahren dem Autofahren vor.
  I'd rather ___ than run.|walk|walking|to walk|Ich würde lieber gehen als laufen.
  We spend too ___ time sitting.|much|many|few|Wir verbringen zu viel Zeit im Sitzen.
  Is this bag light ___ for you to carry?|enough|too|many|Ist diese Tasche leicht genug für dich zum Tragen?
  I'd prefer ___ at home today.|to exercise|exercise|exercised|Ich würde heute lieber zu Hause trainieren.
  I prefer swimming ___ running.|to|than|as|Ich ziehe Schwimmen dem Laufen vor.`)],
  `Du vergleichst zwei ähnliche Preise.|This one is slightly cheaper.|This is the most cheaper.|This one is very cheaper.
  Der Kurs kostet mehr, als du zahlen kannst.|It's too expensive for me.|It's expensive enough to afford.|It's enough expensive.
  Du äußerst eine Vorliebe richtig.|I'd rather walk than drive.|I'd rather walking than driving.|I prefer walk than drive.`,
  `The new gym is {cheaper|cheap: Komparativ} than my old one, but not as close {as|so nah wie} the pool. It is much {more|Komparativ mit convenient} convenient than driving across town. I don't have {enough|genug vor Nomen} time for long journeys. The evening class is {too|zu} crowded, with too {many|zu viele Menschen} people. I'd rather {swim|swim nach would rather} than run. I prefer cycling {to|prefer … to …} driving.`);
  window.EN_B1_AUTHORING={lessons,add,topic};
})();
