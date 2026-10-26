(() => {
  'use strict';
  const {add,topic}=window.EN_A1_AUTHORING;
  add(19,'Wetter, Orte & das Beste auswählen',
    ['Das Wetter beschreiben','It für Wetter und there für Vorhandensein unterscheiden','Einfache Superlative bilden'],
    'weather=Wetter;sun=Sonne;sunny=sonnig;cloud=Wolke;cloudy=bewölkt;wind=Wind;windy=windig;rain=Regen / regnen;snow=Schnee / schneien;hot=heiß;dry=trocken;wet=nass;spring=Frühling;summer=Sommer;autumn=Herbst;winter=Winter;best=beste;worst=schlechteste;most=am meisten;holiday=Urlaub;beach=Strand',
    `What is the weather like?|Wie ist das Wetter?|Wie war das Wetter?|Wann ändert sich das Wetter?
It is sunny and warm.|Es ist sonnig und warm.|Es ist bewölkt und warm.|Es ist sonnig und kalt.
It is raining now.|Es regnet gerade.|Es regnet oft.|Es schneit gerade.
It is cold in winter.|Im Winter ist es kalt.|Im Sommer ist es kalt.|Im Winter ist es warm.
There are clouds.|Es gibt Wolken.|Es regnet.|Es ist wolkenlos.
This is the cheapest room.|Das ist das günstigste Zimmer.|Das ist ein günstigeres Zimmer.|Das ist das teuerste Zimmer.
This is the biggest bag.|Das ist die größte Tasche.|Das ist die kleinste Tasche.|Diese Tasche ist größer.
It is the best day.|Es ist der beste Tag.|Es ist ein besserer Tag.|Es ist der schlechteste Tag.
This is the most expensive hotel.|Das ist das teuerste Hotel.|Dieses Hotel ist teurer.|Das ist das günstigste Hotel.
I like summer best.|Ich mag den Sommer am liebsten.|Ich mag den Winter am liebsten.|Ich mag den Sommer nicht.`,
    [topic('Wetter mit it, Dinge mit there','Für Wetter benutzt du it: It is cold / sunny / windy. Bei einer laufenden Wetterhandlung steht is + -ing: It is raining. There is/are sagt, was vorhanden ist: There are clouds. In summer und in winter stehen ohne the, wenn du allgemein von der Jahreszeit sprichst.',
      `It is cloudy.|Es ist bewölkt.
It is raining now.|Es regnet gerade.
There are clouds in the sky.|Am Himmel sind Wolken. Sky = Himmel.`,
      `___ is sunny.|It|There|They|Es ist sonnig.
It ___ cold.|is|are|does|Es ist kalt.
It is ___.|raining|rain|rains|Es regnet gerade.
___ are clouds.|There|It|This|Es gibt Wolken.
It is cold ___ winter.|in|on|at|Im Winter ist es kalt.
It is ___ today.|windy|wind|winds|Heute ist es windig.
There ___ snow.|is|are|does|Es gibt Schnee.
What ___ the weather like?|is|does|are|Wie ist das Wetter?
It is ___ now.|snowing|snow|snows|Es schneit gerade.
It is hot ___ summer.|in|on|at|Im Sommer ist es heiß.
___ is cloudy today.|It|There|They|Heute ist es bewölkt.
There ___ two clouds.|are|is|does|Es gibt zwei Wolken.
It ___ raining now.|is|does|are|Es regnet gerade.
It is warm ___ spring.|in|on|at|Im Frühling ist es warm.
It is ___ outside.|wet|a wet|wets|Draußen ist es nass.
What is the weather ___?|like|likes|liking|Wie ist das Wetter?`),
    topic('Superlative: the smallest und the best','Wenn du etwas aus einer Gruppe als am kleinsten/größten bezeichnest, verwendest du the + -est: the smallest. Die Schreibregeln entsprechen dem Vergleich: big → biggest, happy → happiest. Längere Adjektive: the most expensive. Good → the best; bad → the worst. Beim Vergleich zweier Dinge steht -er + than; bei der Spitzenposition in der Gruppe -est.',
      `small → smaller → the smallest|klein → kleiner → am kleinsten
expensive → more expensive → the most expensive|teuer → teurer → am teuersten
good → better → the best|gut → besser → am besten`,
      `This is the ___ room.|smallest|smaller|most small|Das ist das kleinste Zimmer.
This is the ___ bag.|biggest|bigger|most big|Das ist die größte Tasche.
This is the ___ coat.|cheapest|cheaper|most cheap|Das ist der günstigste Mantel.
This is ___ best day.|the|a|an|Das ist der beste Tag.
That is the ___ hotel.|most expensive|more expensive|expensive|Das ist das teuerste Hotel.
It is the ___ weather.|worst|worse|bad|Es ist das schlechteste Wetter.
This is the ___ jacket.|warmest|warmer|most warm|Das ist die wärmste Jacke.
That is the ___ house.|oldest|older|most old|Das ist das älteste Haus.
She is the ___ person here.|youngest|younger|most young|Sie ist hier die jüngste Person. Young = jung.
This is the ___ day.|best|better|good|Das ist der beste Tag.
This is the ___ table.|largest|larger|most large|Das ist der größte Tisch. Large = groß.
It is the ___ month.|coldest|colder|most cold|Es ist der kälteste Monat.
That is the ___ phone.|most expensive|more expensive|expensive|Das ist das teuerste Telefon.
This is the ___ street.|shortest|shorter|most short|Das ist die kürzeste Straße.
This is ___ worst room.|the|a|an|Das ist das schlechteste Zimmer.
It is the ___ day.|hottest|hotter|most hot|Es ist der heißeste Tag.`)],
    'Beschreibe das Wetter und wähle aus drei Orten oder Gegenständen einen aus. Begründe deine Auswahl einfach.',
    ['Beschreibe das heutige Wetter.','Wähle mit einem Superlativ.','Nenne einen einfachen Grund.'],
    'It is cold and windy today. I need a warm coat. The blue coat is the warmest, but it is the most expensive. I like the red coat best because it is cheaper.',
    '{It|Wetter-Subjekt} is cold today. It is {raining|rain: -ing} now. There {are|be: Mehrzahl} clouds. In {winter|Winter} it is often cold. This coat is the {warmest|warm: Superlativ}. That bag is the {biggest|big: Superlativ}. This is the {best|good: Superlativ} room. It is the {most|Superlativ vor expensive} expensive hotel.',
    `Du fragst nach dem Wetter heute.|What is the weather like today?|What is the weather like in winter?|When is the weather cold?
Du wählst das günstigste von drei Zimmern.|This is the cheapest room.|This room is cheaper than my room.|This is an expensive room.
Es schneit gerade.|It is snowing now.|It snows every winter.|There is rain now.
Du nennst den besten Tag.|This is the best day.|This is a better day.|This is the worst day.`);
  add(20,'Befinden & einfache Regeln',
    ['Einfache Beschwerden und Körperteile benennen','Have got für Besitz und Beschwerden verstehen','Must und mustn’t für Regeln verwenden'],
    'head=Kopf;hand=Hand;arm=Arm;leg=Bein;foot=Fuß;feet=Füße;tooth=Zahn;teeth=Zähne;stomach=Bauch;headache=Kopfschmerzen;stomach ache=Bauchschmerzen;cold=Erkältung / kalt;ill=krank;tired=müde;doctor=Arzt / Ärztin;pharmacy=Apotheke;medicine=Medikament;must=müssen;mustn’t=nicht dürfen;rule=Regel;rest=sich ausruhen;reception=Rezeption',
    `I've got a headache.|Ich habe Kopfschmerzen.|Ich habe Bauchschmerzen.|Ich bin müde.
She has got a cold.|Sie hat eine Erkältung.|Sie ist kalt.|Sie hat Kopfschmerzen.
Have you got a headache?|Hast du Kopfschmerzen?|Hast du Bauchschmerzen?|Bist du müde?
I am tired.|Ich bin müde.|Ich bin krank.|Ich habe Hunger.
I need a doctor.|Ich brauche einen Arzt.|Ich bin Arzt.|Ich brauche ein Medikament.
Where is the pharmacy?|Wo ist die Apotheke?|Wo ist der Arzt?|Wann öffnet die Apotheke?
You must wait here.|Du musst hier warten.|Du darfst hier nicht warten.|Du kannst hier warten.
You mustn't eat here.|Du darfst hier nicht essen.|Du musst hier nicht essen.|Du musst hier essen.
He hasn't got a phone.|Er hat kein Telefon.|Er benutzt kein Telefon.|Er braucht kein Telefon.
Can I have an appointment?|Kann ich einen Termin bekommen?|Habe ich einen Termin?|Kann ich den Termin absagen?`,
    [topic('Have got und has got','Have got bedeutet haben und ist besonders im britischen Englisch häufig: I have got / I’ve got; she has got / she’s got. Fragen: Have you got …? / Has she got …? Verneinung: haven’t got / hasn’t got. Verwende nicht do zusammen mit got. She’s got bedeutet she has got; she’s ill bedeutet she is ill.',
      `I've got a headache.|Ich habe Kopfschmerzen.
Has she got a cold?|Hat sie eine Erkältung?
He hasn't got a phone.|Er hat kein Telefon.`,
      `I ___ got a headache.|have|has|am|Ich habe Kopfschmerzen.
She ___ got a cold.|has|have|is|Sie hat eine Erkältung.
___ you got a headache?|Have|Do|Are|Hast du Kopfschmerzen?
___ he got a phone?|Has|Does|Is|Hat er ein Telefon?
We ___ got an appointment.|have|has|are|Wir haben einen Termin.
He ___ got a car.|hasn't|haven't|doesn't|Er hat kein Auto.
They ___ got any medicine.|haven't|hasn't|don't|Sie haben kein Medikament.
Has she got a cold? Yes, she ___.|has|does|is|Ja, sie hat eine Erkältung.
Have you got a phone? No, I ___.|haven't|don't|am not|Nein, ich habe kein Telefon.
Anna ___ got a stomach ache.|has|have|is|Anna hat Bauchschmerzen.
Leo ___ got a headache.|has|have|is|Leo hat Kopfschmerzen.
___ Mia got an appointment?|Has|Does|Is|Hat Mia einen Termin?
My parents ___ got a car.|have|has|are|Meine Eltern haben ein Auto.
I ___ got a cold.|haven't|hasn't|don't|Ich habe keine Erkältung.
Have they got a phone? Yes, they ___.|have|do|are|Ja, sie haben ein Telefon.
Our son ___ got any medicine.|hasn't|haven't|doesn't|Unser Sohn hat kein Medikament.`),
    topic('Must und mustn’t','Must + Grundform drückt eine Pflicht aus. Mustn’t bedeutet ein Verbot: nicht dürfen. Es bedeutet nicht nicht müssen. Die Form ist für alle Personen gleich, ohne -s und ohne to. Hier übst du Hausregeln und Hinweise, keine medizinischen Behandlungsanweisungen. Als Aufforderung kannst du auch eine Grundform mit please benutzen.',
      `You must wait here.|Du musst hier warten.
You mustn't eat here.|Du darfst hier nicht essen.
Please sit here.|Setz dich bitte hierhin.`,
      `You ___ wait here.|must|mustn't|can't|Du musst hier warten. Regel der Anmeldung.
You ___ eat here.|mustn't|must|can|Du darfst hier nicht essen. Verbotsschild.
She must ___ here.|sit|sits|to sit|Sie muss hier sitzen.
We ___ be quiet.|must|does|are must|Wir müssen leise sein. Quiet = leise.
He mustn't ___ the door.|open|opens|to open|Er darf die Tür nicht öffnen.
You ___ use your phone here.|mustn't|must|can|Du darfst hier kein Telefon benutzen. Verbot.
They must ___ outside.|wait|waits|to wait|Sie müssen draußen warten.
Anna ___ show her ticket.|must|does|is must|Anna muss ihre Fahrkarte zeigen. Show = zeigen.
You mustn't ___ here.|run|runs|to run|Du darfst hier nicht laufen. Verbot.
We must ___ on time.|come|comes|to come|Wir müssen pünktlich kommen. On time = pünktlich.
Leo must ___ his hands.|wash|washes|to wash|Leo muss seine Hände waschen. Regel.
You ___ park here.|mustn't|must|can|Du darfst hier nicht parken. Park = parken.
Mia ___ wait for the doctor.|must|does|is must|Mia muss auf den Arzt warten.
They mustn't ___ here.|sit|sits|to sit|Sie dürfen hier nicht sitzen.
We must ___ the door.|close|closes|to close|Wir müssen die Tür schließen.
You ___ buy a ticket.|must|mustn't|can't|Du musst eine Fahrkarte kaufen. Pflicht.`)],
    'Bitte um einen Termin. Beschreibe dein Befinden und nenne eine einfache Regel für den Wartebereich.',
    ['Bitte um einen Termin.','Nenne eine einfache Beschwerde.','Nenne eine Regel oder frage, wo du warten kannst.'],
    "Hello! I've got a headache and I am tired. Can I have an appointment with the doctor, please? Can I wait here? I mustn't use my phone in this room.",
    'I {have|have got: I} got a headache. My sister {has|have got: she} got a cold. {Have|Frage: you} you got an appointment? Yes, I {have|kurze Antwort}. We {must|müssen} wait here. We {must not~mustn’t~mustn\'t|nicht dürfen} eat here. The doctor is {in|in} the next room. Please {sit|sitzen: Aufforderung} here.',
    `Du beschreibst Kopfschmerzen.|I've got a headache.|I've got a stomach ache.|I've got a cold.
Ein Schild verbietet Essen.|You mustn't eat here.|You must eat here.|You don't need to eat here.
Du möchtest einen Arzttermin.|Can I have an appointment with the doctor?|Can I work with the doctor?|Have you got an appointment with the doctor?
Du fragst, ob Emma eine Erkältung hat.|Has Emma got a cold?|Is Emma cold?|Has Emma got a headache?`);
  add(21,'Gestern: was & were',
    ['Über frühere Orte und Zustände sprechen','Was und were verwenden','There was und there were verstehen'],
    'yesterday=gestern;last week=letzte Woche;last night=gestern Abend / letzte Nacht;last year=letztes Jahr;ago=vor (Zeitspanne);before=vor / vorher;after=nach / danach;born=geboren;was=war;were=warst / waren / wart;wasn’t=was not;weren’t=were not;hotel=Hotel;beach=Strand;town=Stadt;village=Dorf;hospital=Krankenhaus;meeting=Besprechung;happy=glücklich;hungry=hungrig',
    `I was at home yesterday.|Ich war gestern zu Hause.|Ich bin heute zu Hause.|Ich war gestern bei der Arbeit.
We were in London last week.|Wir waren letzte Woche in London.|Wir sind diese Woche in London.|Sie waren letzte Woche in London.
She wasn't at work.|Sie war nicht bei der Arbeit.|Sie ist nicht bei der Arbeit.|Sie war bei der Arbeit.
Were you at the station?|Warst du am Bahnhof?|Bist du am Bahnhof?|War er am Bahnhof?
Where were you yesterday?|Wo warst du gestern?|Wo bist du heute?|Wann warst du dort?
The weather was good.|Das Wetter war gut.|Das Wetter ist gut.|Das Wetter war schlecht.
There was a café.|Es gab ein Café.|Es gibt ein Café.|Es gab zwei Cafés.
There were two rooms.|Es gab zwei Zimmer.|Es gibt zwei Zimmer.|Es gab ein Zimmer.
I was born in Germany.|Ich wurde in Deutschland geboren.|Ich wohne in Deutschland.|Ich war gestern in Deutschland.
They were tired last night.|Sie waren gestern Abend müde.|Sie sind heute Abend müde.|Wir waren gestern Abend müde.`,
    [topic('Be in der Vergangenheit','I/he/she/it verwendet was. You/we/they verwenden were. Verneinung: wasn’t / weren’t. Fragen stellen was/were vor das Subjekt: Were you here? Fragen mit was/were brauchen kein weiteres Hilfsverb. Yesterday = gestern, last week = letzte Woche, two days ago = vor zwei Tagen. Born steht mit be: I was born in Berlin.',
      `I was tired yesterday.|Ich war gestern müde.
They were at home.|Sie waren zu Hause.
Was she in London?|War sie in London?`,
      `I ___ at home yesterday.|was|were|am|Ich war gestern zu Hause.
She ___ at work.|was|were|is|Sie war bei der Arbeit.
We ___ in London last week.|were|was|are|Wir waren letzte Woche in London.
___ you at the station?|Were|Was|Is|Warst du am Bahnhof?
___ he in Berlin?|Was|Were|Is|War er in Berlin?
They ___ tired last night.|were|was|are|Sie waren gestern Abend müde.
Anna ___ at home.|wasn't|weren't|isn't|Anna war nicht zu Hause.
We ___ at the beach.|weren't|wasn't|aren't|Wir waren nicht am Strand.
I ___ born in Germany.|was|were|am|Ich wurde in Deutschland geboren.
Was she here? Yes, she ___.|was|were|is|Ja, sie war hier.
Leo ___ at the hospital yesterday.|was|were|is|Leo war gestern im Krankenhaus.
Mia and I ___ happy.|were|was|are|Mia und ich waren glücklich.
Where ___ your parents last week?|were|was|is|Wo waren deine Eltern letzte Woche?
___ the weather cold?|Was|Were|Is|War das Wetter kalt?
They ___ here two days ago.|were|was|are|Sie waren vor zwei Tagen hier.
Were you tired? No, I ___.|wasn't|weren't|isn't|Nein, ich war nicht müde.`),
    topic('There was und there were','There was + Einzahl und there were + Mehrzahl bedeuten es gab. Fragen: Was there …? / Were there …? Verneinung: There wasn’t … / There weren’t … . Bei nicht zählbaren Nomen steht was: There was some water. Diese Formen beschreiben eine frühere Situation. Besitz mit einem Namen wird mit ’s gebildet: my sister’s house = das Haus meiner Schwester.',
      `There was a café near the hotel.|Es gab ein Café in der Nähe des Hotels.
There were two bedrooms.|Es gab zwei Schlafzimmer.
Was there a kitchen?|Gab es eine Küche?`,
      `There ___ a café.|was|were|is|Es gab ein Café.
There ___ two rooms.|were|was|are|Es gab zwei Zimmer.
___ there a kitchen?|Was|Were|Is|Gab es eine Küche?
___ there three chairs?|Were|Was|Is|Gab es drei Stühle?
There ___ any water.|wasn't|weren't|isn't|Es gab kein Wasser.
There ___ any eggs.|weren't|wasn't|aren't|Es gab keine Eier.
There ___ some milk.|was|were|are|Es gab etwas Milch.
Was there a bus? Yes, there ___.|was|were|is|Ja, es gab einen Bus.
Were there two beds? Yes, there ___.|were|was|is|Ja, es gab zwei Betten.
There ___ a phone in the room.|wasn't|weren't|isn't|Es gab kein Telefon im Zimmer.
There ___ a shop near the station.|was|were|is|Es gab einen Laden in der Nähe des Bahnhofs.
There ___ four people.|were|was|are|Es gab vier Personen.
___ there any bread?|Was|Were|Is|Gab es Brot?
___ there any tomatoes?|Were|Was|Is|Gab es Tomaten?
There ___ any coffee.|wasn't|weren't|isn't|Es gab keinen Kaffee.
Were there three rooms? No, there ___.|weren't|wasn't|aren't|Nein, es gab nicht drei Zimmer.`)],
    'Beschreibe einen vergangenen Tag oder Aufenthalt: Ort, Befinden und etwas, das dort vorhanden war.',
    ['Nenne einen vergangenen Zeitpunkt.','Nenne Ort und Befinden.','Beschreibe mit there was/were, was vorhanden war.'],
    'Last week I was in London. The weather was cold, but I was happy. There was a café near the hotel. There were two chairs in my room. Were you there too?',
    'Yesterday I {was|be, Vergangenheit: I} at home. My parents {were|be, Vergangenheit: they} in London. My sister {was|be, Vergangenheit: she} tired. There {was|es gab, Einzahl} a café near the hotel. There {were|es gab, Mehrzahl} two rooms. {Were|Frage: you} you there? No, I {was not~wasn’t~wasn\'t|verneinen: I}. I was {born|geboren} in Berlin.',
    `Du fragst nach dem gestrigen Aufenthaltsort.|Where were you yesterday?|Where are you today?|When were you at home?
Du beschreibst zwei frühere Zimmer.|There were two rooms.|There was one room.|There are two rooms.
Du sagst, dass Anna gestern nicht bei der Arbeit war.|Anna wasn't at work yesterday.|Anna isn't at work today.|Anna was at work yesterday.
Du nennst deinen Geburtsort.|I was born in Berlin.|I was in Berlin yesterday.|I live in Berlin.`);
  add(22,'Vom Wochenende erzählen',
    ['Einfache vergangene Tätigkeiten beschreiben','Regelmäßige und häufige unregelmäßige Formen verwenden','Mit did Fragen stellen und verneinen'],
    'visited=besuchte;worked=arbeitete;played=spielte;watched=sah an;cooked=kochte;went=ging / fuhr;had=hatte;ate=aß;drank=trank;saw=sah;bought=kaufte;did=machte / Vergangenheits-Hilfsverb;didn’t=did not;enjoy=genießen;walked=ging zu Fuß;stayed=blieb;cleaned=putzte;called=rief an;travelled=reiste;returned=kehrte zurück',
    `I visited my parents.|Ich besuchte meine Eltern.|Ich besuche meine Eltern gerade.|Meine Eltern besuchten mich.
She worked on Saturday.|Sie arbeitete am Samstag.|Sie arbeitet jeden Samstag.|Sie arbeitete am Sonntag.
We went to the beach.|Wir fuhren zum Strand.|Wir fahren gerade zum Strand.|Wir waren im Hotel.
He had breakfast at eight.|Er frühstückte um acht.|Er frühstückt um acht.|Er aß um acht zu Abend.
They bought a new phone.|Sie kauften ein neues Telefon.|Sie kaufen ein neues Telefon.|Sie verkauften ein neues Telefon.
Did you enjoy the weekend?|Hat dir das Wochenende gefallen?|Gefällt dir das Wochenende gerade?|Wann war das Wochenende?
I didn't watch television.|Ich sah nicht fern.|Ich sehe nie fern.|Ich sah fern.
What did you do yesterday?|Was hast du gestern gemacht?|Was machst du heute?|Wo warst du gestern?
We ate fish and drank water.|Wir aßen Fisch und tranken Wasser.|Wir essen Fisch und trinken Wasser.|Wir aßen Fleisch und tranken Wasser.
She called her brother.|Sie rief ihren Bruder an.|Ihr Bruder rief sie an.|Sie ruft gerade ihren Bruder an.`,
    [topic('Past Simple: Aussagen','Regelmäßige Verben bekommen -ed: work → worked. Nach End-e nur -d: live → lived. Konsonant + y wird -ied: study → studied. Nach einem Vokal bleibt y: stay → stayed. Im britischen Englisch heißt es travel → travelled. Häufige unregelmäßige Formen musst du lernen: go → went, have → had, eat → ate, drink → drank, see → saw, buy → bought. In Aussagen ist die Past-Simple-Form für alle Personen gleich.',
      `I worked. She worked.|Ich arbeitete. Sie arbeitete.
We went to London.|Wir fuhren nach London.
He bought a phone.|Er kaufte ein Telefon.`,
      `I ___ my parents yesterday.|visited|visit|visits|Ich besuchte gestern meine Eltern.
She ___ on Saturday.|worked|work|works|Sie arbeitete am Samstag.
We ___ to the beach.|went|go|goes|Wir fuhren zum Strand.
He ___ breakfast at eight.|had|has|have|Er frühstückte um acht.
They ___ fish.|ate|eat|eats|Sie aßen Fisch.
I ___ water.|drank|drink|drinks|Ich trank Wasser.
She ___ a new phone.|bought|buy|buys|Sie kaufte ein neues Telefon.
We ___ our friends.|saw|see|sees|Wir sahen unsere Freunde.
Ben ___ English yesterday.|studied|study|studies|Ben lernte gestern Englisch.
Anna ___ her brother.|called|call|calls|Anna rief ihren Bruder an.
Leo ___ dinner last night.|cooked|cook|cooks|Leo kochte gestern Abend Abendessen.
Mia ___ television yesterday.|watched|watch|watches|Mia sah gestern fern.
My parents ___ to London last week.|went|goes|go|Meine Eltern fuhren letzte Woche nach London.
I ___ a sandwich yesterday.|ate|eats|eat|Ich aß gestern ein Sandwich.
We ___ some milk.|bought|buys|buy|Wir kauften etwas Milch.
He ___ in Berlin last year.|lived|live|lives|Er wohnte letztes Jahr in Berlin.`),
    topic('Did und didn’t + Grundform','Bei Fragen und Verneinungen zeigt did die Vergangenheit. Das Tätigkeitsverb steht deshalb in der Grundform: Did you go? / I didn’t go. Kein went oder -ed nach did. Kurze Antworten: Yes, I did. / No, I didn’t. Bei be bleibt es bei was/were ohne did.',
      `Did you work yesterday?|Hast du gestern gearbeitet?
She didn't go to London.|Sie fuhr nicht nach London.
Where did he live?|Wo wohnte er?`,
      `___ you work yesterday?|Did|Do|Were|Hast du gestern gearbeitet?
Did she ___ to London?|go|went|goes|Ist sie nach London gefahren?
I didn't ___ television.|watch|watched|watches|Ich sah nicht fern.
He didn't ___ breakfast.|have|had|has|Er frühstückte nicht.
Where did they ___?|live|lived|lives|Wo wohnten sie?
Did you enjoy it? Yes, I ___.|did|do|was|Ja, es hat mir gefallen.
Did she call? No, she ___.|didn't|doesn't|wasn't|Nein, sie rief nicht an.
We didn't ___ any milk.|buy|bought|buys|Wir kauften keine Milch.
What did he ___?|eat|ate|eats|Was hat er gegessen?
___ she at home yesterday?|Was|Did|Does|War sie gestern zu Hause?
___ Leo visit his parents?|Did|Was|Does|Hat Leo seine Eltern besucht? Vergangenheit.
Mia didn't ___ coffee.|drink|drank|drinks|Mia trank keinen Kaffee.
When did your friends ___?|come|came|comes|Wann kamen deine Freunde? Come = kommen, came = kam.
Did you see Ben? No, I ___.|didn't|don't|wasn't|Nein, ich sah Ben nicht.
Where ___ they last night?|were|did|was|Wo waren sie gestern Abend?
They didn't ___ dinner at home.|have|had|has|Sie aßen nicht zu Hause zu Abend.`)],
    'Erzähle von deinem letzten Wochenende. Nenne zwei Tätigkeiten, etwas, das du nicht gemacht hast, und eine Frage.',
    ['Nenne zwei vergangene Tätigkeiten.','Formuliere eine Verneinung mit didn’t.','Stelle eine Frage mit did.'],
    "Last Saturday I visited my parents. We went to the beach and ate fish. I didn't work on Sunday. I watched television in the evening. What did you do last weekend?",
    'Last Saturday I {visited|visit: Vergangenheit} my parents. We {went|go: Vergangenheit} to the beach. My sister {had|have: Vergangenheit} breakfast at home. We {ate|eat: Vergangenheit} fish and {drank|drink: Vergangenheit} water. I did not {watch|nach did not} television. {Did|Frage Vergangenheit} you work? No, I {did not~didn’t~didn\'t|kurze verneinte Antwort}.',
    `Du fragst nach dem vergangenen Wochenende.|What did you do last weekend?|What do you do every weekend?|What are you doing this weekend?
Du sagst, dass du gestern nicht gearbeitet hast.|I didn't work yesterday.|I don't work on Mondays.|I wasn't tired yesterday.
Du sagst, dass du ein Telefon gekauft hast.|I bought a phone.|I have a phone.|I buy phones.
Du fragst, ob Anna gestern zu Hause war.|Was Anna at home yesterday?|Did Anna go home yesterday?|Is Anna at home today?`);
  add(23,'Wünsche & Verabredungen',
    ['Mit want to und would like to einen Wunsch ausdrücken','Mit let’s und can etwas vorschlagen','Einladungen annehmen oder ablehnen'],
    'want to=wollen + Tätigkeit;would like to=möchte + Tätigkeit;let’s=lass uns;meet=sich treffen;invite=einladen;party=Feier;birthday=Geburtstag;free=verfügbar / frei;busy=beschäftigt;great=großartig;sounds good=klingt gut;sorry=Entschuldigung;another=ein anderer;idea=Idee;plan=Plan;next week=nächste Woche;tonight=heute Abend;after work=nach der Arbeit;before dinner=vor dem Abendessen;see you=bis dann',
    `I'd like to meet on Friday.|Ich würde mich gern am Freitag treffen.|Ich treffe mich jeden Freitag.|Ich würde mich gern am Donnerstag treffen.
Do you want to come?|Möchtest du kommen?|Kannst du kommen?|Musst du kommen?
Let's go to the cinema.|Gehen wir ins Kino.|Gehen wir in den Park.|Wir gehen oft ins Kino.
Are you free tonight?|Hast du heute Abend Zeit?|Hattest du gestern Abend Zeit?|Hast du morgen früh Zeit?
Sorry, I'm busy.|Entschuldigung, ich bin beschäftigt.|Entschuldigung, ich bin frei.|Entschuldigung, ich bin zu früh.
Friday is good for me.|Freitag passt mir.|Donnerstag passt mir.|Freitag passt mir nicht.
Can we meet after work?|Können wir uns nach der Arbeit treffen?|Können wir uns vor der Arbeit treffen?|Können wir bei der Arbeit bleiben?
That sounds good.|Das klingt gut.|Das ist zu spät.|Das klappt nicht.
I can't come on Saturday.|Ich kann am Samstag nicht kommen.|Ich kann am Sonntag nicht kommen.|Ich möchte am Samstag nicht kommen.
See you at half past six.|Bis halb sieben.|Bis halb sechs.|Bis Viertel nach sechs.`,
    [topic('Want to und would like to','Vor einer gewünschten Tätigkeit steht want to oder would like to + Grundform: I want to go, I’d like to go. Vor einem Nomen brauchst du kein to: I want water. He/she/it verwendet wants; nach would bleibt like unverändert. Want und would like beschreiben einen Wunsch; sie sind keine eigene Zukunftszeit.',
      `I want to meet on Friday.|Ich möchte mich am Freitag treffen.
She wants to come.|Sie möchte kommen.
I'd like to visit London.|Ich würde gern London besuchen.`,
      `I want ___ meet on Friday.|to|for|at|Ich möchte mich am Freitag treffen.
She ___ to come.|wants|want|wanting|Sie möchte kommen.
I'd like ___ visit London.|to|for|at|Ich würde gern London besuchen.
He would ___ to go.|like|likes|to like|Er würde gern gehen.
We want to ___ dinner.|cook|cooks|cooking|Wir möchten Abendessen kochen.
Do you want to ___?|come|comes|coming|Möchtest du kommen?
She doesn't ___ to go.|want|wants|wanting|Sie möchte nicht gehen.
I want ___ water.|some|to|a|Ich möchte etwas Wasser.
Would you like to ___?|dance|dances|dancing|Möchtest du tanzen?
He ___ to buy a ticket.|wants|want|wanting|Er möchte eine Fahrkarte kaufen.
Mia wants to ___ her parents.|visit|visits|visiting|Mia möchte ihre Eltern besuchen.
Leo would ___ to meet tonight.|like|likes|to like|Leo würde sich gern heute Abend treffen.
They want ___ go to the park.|to|for|at|Sie möchten in den Park gehen.
Does your sister ___ to come?|want|wants|wanting|Möchte deine Schwester kommen?
We'd like to ___ on Monday.|meet|meets|meeting|Wir würden uns gern am Montag treffen.
I ___ want to work tonight.|don't|doesn't|am not|Ich möchte heute Abend nicht arbeiten.`),
    topic('Vorschlagen und reagieren','Let’s bedeutet let us und schlägt mit der Grundform etwas Gemeinsames vor. Can we …? fragt nach einer gemeinsamen Möglichkeit. Are you free …? fragt nach Zeit. Wenn du nicht kommen kannst, kannst du mit but einen anderen Vorschlag anschließen. Me ist die Objektform von I: for me = für mich. Nach Präpositionen steht nicht I.',
      `Let's meet after work.|Treffen wir uns nach der Arbeit.
Can we meet on Tuesday?|Können wir uns am Dienstag treffen?
Friday is good for me.|Freitag passt mir.`,
      `Let's ___ to the cinema.|go|goes|to go|Gehen wir ins Kino.
Can we ___ after work?|meet|meets|to meet|Können wir uns nach der Arbeit treffen?
___ you free tonight?|Are|Do|Does|Hast du heute Abend Zeit?
Friday is good for ___.|me|I|my|Freitag passt mir.
I can't come on Saturday, ___ Sunday is good.|but|because|or|Ich kann am Samstag nicht kommen, aber Sonntag passt.
Let's ___ dinner together.|cook|cooks|to cook|Kochen wir zusammen Abendessen.
___ she free on Monday?|Is|Does|Do|Hat sie am Montag Zeit?
Can we meet ___ six?|at|on|in|Können wir uns um sechs treffen?
Let's meet ___ Friday.|on|at|in|Treffen wir uns am Freitag.
That ___ good.|sounds|sound|sounding|Das klingt gut.
Let's ___ our friends.|visit|visits|to visit|Besuchen wir unsere Freunde.
Can we ___ the train?|take|takes|to take|Können wir den Zug nehmen?
Tuesday is good for ___.|me|I|my|Dienstag passt mir.
___ your parents free tonight?|Are|Do|Does|Haben deine Eltern heute Abend Zeit?
Let's meet ___ work.|after|because|than|Treffen wir uns nach der Arbeit.
That ___ like a good idea.|sounds|sound|sounding|Das klingt nach einer guten Idee.`)],
    'Lade jemanden zu einer gemeinsamen Aktivität ein. Nenne Tag, Uhrzeit und Treffpunkt und frage nach Zeit.',
    ['Schlage eine gemeinsame Aktivität vor.','Nenne Tag, Uhrzeit und Ort.','Frage, ob die Person kommen kann.'],
    "Hi Ben! I'd like to go to the cinema on Friday. Are you free? Let's meet at half past six at the station. Can you come? Friday is good for me.",
    'I would {like|höflicher Wunsch} to meet on Friday. Do you want {to|vor einer Tätigkeit} come? Let us {go|nach let us: Grundform} to the cinema. {Are|be-Frage: you} you free tonight? Friday is good for {me|Objektform von I}. We can meet {after|nach} work. Let us meet {at|um} six. That {sounds|klingen: that} good.',
    `Du schlägst gemeinsames Kochen vor.|Let's cook dinner together.|I cook dinner every day.|You must cook dinner.
Du möchtest wissen, ob jemand Zeit hat.|Are you free on Friday?|Do you work every Friday?|Were you free last Friday?
Du lehnst Samstag ab und schlägst Sonntag vor.|I can't come on Saturday, but Sunday is good.|I can come on Saturday, but not on Sunday.|I can't come on Saturday or Sunday.
Du bestätigst 18:30 Uhr.|See you at half past six.|See you at half past five.|See you at quarter past six.`);
  add(24,'A1 im Alltag: Reise & Kontakt',
    ['Informationen auf einer Reise erfragen und verstehen','Eine kurze Nachricht mit Anlass, Angaben und Bitte schreiben','Bekannte Grammatik in neuen Situationen anwenden'],
    'reservation=Reservierung;reception=Rezeption;single room=Einzelzimmer;double room=Doppelzimmer;night=Nacht;passport=Reisepass;address=Adresse;postcode=Postleitzahl;number=Nummer;arrival=Ankunft;departure=Abfahrt / Abreise;included=inbegriffen;available=verfügbar;problem=Problem;confirmation=Bestätigung;contact=Kontakt;information=Information;answer=Antwort;check=prüfen;stay=bleiben / Aufenthalt',
    `I've got a reservation.|Ich habe eine Reservierung.|Ich möchte reservieren.|Ich habe keine Reservierung.
I'd like a single room.|Ich hätte gern ein Einzelzimmer.|Ich hätte gern ein Doppelzimmer.|Ich hätte gern zwei Zimmer.
Is breakfast included?|Ist Frühstück inbegriffen?|Ist Abendessen inbegriffen?|Ist Frühstück verfügbar?
Can you confirm the time?|Können Sie die Uhrzeit bestätigen?|Können Sie den Preis bestätigen?|Können Sie die Uhrzeit ändern?
My arrival is on Friday.|Meine Ankunft ist am Freitag.|Meine Abreise ist am Freitag.|Meine Ankunft ist am Donnerstag.
I stayed for two nights.|Ich blieb zwei Nächte.|Ich bleibe zwei Nächte.|Ich blieb drei Nächte.
The room was too small.|Das Zimmer war zu klein.|Das Zimmer ist zu klein.|Das Zimmer war zu groß.
Can you repeat the number?|Können Sie die Nummer wiederholen?|Können Sie den Namen buchstabieren?|Können Sie die Nummer ändern?
Here is my address.|Hier ist meine Adresse.|Hier ist meine Nummer.|Dort ist meine Adresse.
Please send a confirmation.|Senden Sie bitte eine Bestätigung.|Senden Sie bitte eine Rechnung.|Senden Sie bitte eine Nachricht morgen.`,
    [topic('Bekanntes anwenden: Wünsche und Informationen','Du verbindest bekannte Muster: I’d like + Nomen; I’d like to + Verb; Can you + Grundform; Have you got …? und Is there …? . Ein Einzelzimmer heißt single room, ein Doppelzimmer double room. Für einen Zeitraum steht for: for two nights. Du lernst hier keine neue Zeitform.',
      `I'd like a room for two nights.|Ich hätte gern ein Zimmer für zwei Nächte.
Can you confirm the price?|Können Sie den Preis bestätigen?
Is there a bathroom?|Gibt es ein Badezimmer?`,
      `I'd like ___ single room.|a|an|the|Ich hätte gern ein Einzelzimmer.
I'd like ___ book a room.|to|for|at|Ich würde gern ein Zimmer buchen. Book = buchen.
Can you ___ the time?|confirm|confirms|to confirm|Können Sie die Uhrzeit bestätigen?
Have you ___ a reservation?|got|get|getting|Haben Sie eine Reservierung?
___ breakfast included?|Is|Does|Are|Ist Frühstück inbegriffen?
I'd like a room ___ two nights.|for|at|on|Ich hätte gern ein Zimmer für zwei Nächte.
___ there a bathroom near reception?|Is|Does|Are|Gibt es ein Badezimmer in der Nähe der Rezeption?
Can you ___ the number?|repeat|repeats|to repeat|Können Sie die Nummer wiederholen?
My arrival is ___ Friday.|on|in|at|Meine Ankunft ist am Freitag.
The train leaves ___ ten.|at|on|in|Der Zug fährt um zehn ab.
I'd like ___ double room.|a|an|the|Ich hätte gern ein Doppelzimmer.
Can you ___ a confirmation?|send|sends|to send|Können Sie eine Bestätigung senden?
Our reservation is ___ three nights.|for|on|at|Unsere Reservierung ist für drei Nächte.
___ there two single rooms?|Are|Is|Do|Gibt es zwei Einzelzimmer?
My departure is ___ Monday.|on|in|at|Meine Abreise ist am Montag.
I'd ___ to check the address.|like|likes|to like|Ich würde gern die Adresse prüfen.`),
    topic('Bekanntes anwenden: heute und gestern','Prüfe vor der Antwort den Zeitpunkt und die Satzart. Gewohnheit: Present Simple. Gerade jetzt: be + -ing. Vergangenes be: was/were. Vergangene Tätigkeit: Past Simple; nach did wieder die Grundform. Höfliche Wünsche bleiben would like. Diese Seite fasst die bereits gelernten Unterschiede zusammen. Zusätzliche unregelmäßige Formen in den Antwortmöglichkeiten: take → took, send → sent. Nach didn’t und did verwendest du weiterhin take und send.',
      `I usually stay here.|Ich übernachte normalerweise hier.
I am waiting now.|Ich warte gerade.
I stayed here last week.|Ich habe letzte Woche hier übernachtet.`,
      `The room ___ small last week.|was|were|is|Das Zimmer war letzte Woche klein.
We ___ here yesterday.|were|was|are|Wir waren gestern hier.
I ___ for the bus now.|am waiting|wait|waited|Ich warte gerade jetzt auf den Bus.
She usually ___ here.|stays|is staying|stayed|Sie übernachtet normalerweise hier.
I ___ for two nights last week.|stayed|stay|stays|Ich blieb letzte Woche zwei Nächte.
Did you ___ breakfast?|have|had|has|Hast du gefrühstückt?
We didn't ___ the train.|take|took|takes|Wir nahmen den Zug nicht. Took = nahm.
He ___ a ticket yesterday.|bought|buy|buys|Er kaufte gestern eine Fahrkarte.
She ___ writing an email now.|is|does|was|Sie schreibt gerade eine E-Mail.
Where ___ you last night?|were|did|are|Wo warst du gestern Abend?
The hotel ___ good last year.|was|were|is|Das Hotel war letztes Jahr gut.
Mia ___ her passport yesterday.|had|has|have|Mia hatte gestern ihren Reisepass.
Leo ___ at reception right now.|is waiting|waits|waited|Leo wartet gerade jetzt an der Rezeption.
They didn't ___ the room.|book|booked|books|Sie buchten das Zimmer nicht.
Did you ___ the message?|send|sent|sends|Hast du die Nachricht gesendet? Sent = sendete.
We usually ___ by train.|travel|are travelling|travelled|Wir reisen normalerweise mit dem Zug. Travel = reisen.`)],
    'Schreibe an ein Hotel. Nenne Zimmerwunsch, Ankunft und Aufenthaltsdauer und bitte um eine Bestätigung.',
    ['Nenne Zimmerwunsch und Aufenthaltsdauer.','Nenne Ankunftstag und Uhrzeit.','Frage nach einer Information und bitte um Bestätigung.'],
    "Hello! I'd like a single room for two nights. My arrival is on Friday at six. Is breakfast included? Can you send a confirmation, please? My name is Anna Hill. Thank you!",
    'I would {like|höflicher Wunsch} a single room {for|für eine Dauer} two nights. My arrival is {on|am: Tag} Friday {at|um: Uhrzeit} six. {Is|Frage: be} breakfast included? Can you {send|senden, Grundform} a confirmation? Last week I {was|be, Vergangenheit: I} in London. I did not {have|nach did not} a reservation.',
    `Du möchtest zwei Nächte in einem Einzelzimmer bleiben.|I'd like a single room for two nights.|I'd like a double room for two nights.|I'd like a single room for three nights.
Du fragst nach eingeschlossenem Frühstück.|Is breakfast included?|Is dinner included?|Is breakfast available?
Du bittest das Hotel, dir eine Reservierungsbestätigung zu senden.|Please send a confirmation.|Please send the bill.|Please confirm my surname.
Du beschreibst ein zu kleines Zimmer in der Vergangenheit.|The room was too small.|The room is too small.|The room was too big.`);
})();
