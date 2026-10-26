(() => {
  'use strict';
  const {add,topic}=window.EN_A1_AUTHORING;
  add(7,'Fragen zum Alltag',
    ['Mit do und does nach Gewohnheiten fragen','Mit don’t und doesn’t verneinen','Kurze Antworten geben'],
    'do=Hilfsverb für Fragen / machen;does=do bei he / she / it;don’t=do not;doesn’t=does not;when=wann;why=warum;who=wer;week=Woche;weekend=Wochenende;Monday=Montag;Tuesday=Dienstag;Wednesday=Mittwoch;Thursday=Donnerstag;Friday=Freitag;Saturday=Samstag;Sunday=Sonntag;today=heute;tomorrow=morgen;every=jeder;with=mit',
    `Do you work here?|Arbeitest du hier?|Wohnst du hier?|Arbeitet er hier?
Does she speak English?|Spricht sie Englisch?|Lernt sie Englisch?|Sprichst du Englisch?
I don't drink coffee.|Ich trinke keinen Kaffee.|Ich trinke keinen Tee.|Sie trinkt keinen Kaffee.
He doesn't work on Sunday.|Er arbeitet sonntags nicht.|Er arbeitet samstags nicht.|Er arbeitet sonntags.
When do you work?|Wann arbeitest du?|Wo arbeitest du?|Warum arbeitest du?
Where does he live?|Wo wohnt er?|Wo arbeitet er?|Woher kommt er?
Yes, I do.|Ja, das tue ich.|Nein, das tue ich nicht.|Ja, das tut sie.
No, she doesn't.|Nein, das tut sie nicht.|Ja, das tut sie.|Nein, das tun sie nicht.
We don't study on Saturday.|Wir lernen samstags nicht.|Wir lernen sonntags nicht.|Sie lernen samstags nicht.
Why do you study English?|Warum lernst du Englisch?|Wann lernst du Englisch?|Wo lernst du Englisch?`,
    [topic('Do und does in Fragen','Vor I/you/we/they steht do, vor he/she/it does.\n\nDanach folgt immer die Grundform: Does she work?, niemals Does she works?\n\nFragewörter stehen davor: Where does she work?\n\nBei be verwendest du kein do: Is she here?\n\nOn steht hier vor Wochentagen: on Monday = am Montag.',
      `Do you live here?|Wohnst du hier?
Does she work here?|Arbeitet sie hier?
Where does he live?|Wo wohnt er?`,
      `___ you work here?|Do|Does|Are|Arbeitest du hier?
___ she live in London?|Does|Do|Is|Wohnt sie in London?
___ they speak German?|Do|Does|Are|Sprechen sie Deutsch?
Where ___ he work?|does|do|is|Wo arbeitet er?
When ___ we study?|do|does|are|Wann lernen wir?
Does Anna ___ English?|speak|speaks|speaking|Spricht Anna Englisch?
Does Tom ___ here?|live|lives|living|Wohnt Tom hier?
Do you ___ coffee?|like|likes|liking|Magst du Kaffee?
___ he a teacher?|Is|Does|Do|Ist er Lehrer?
Why does she ___ English?|study|studies|studying|Warum lernt sie Englisch?
___ Leo work on Monday?|Does|Do|Is|Arbeitet Leo montags?
Where ___ your parents live?|do|does|are|Wo wohnen deine Eltern?
Does Mia ___ television?|watch|watches|watching|Sieht Mia fern?
When ___ Ben and Emma work?|do|does|are|Wann arbeiten Ben und Emma?
___ you from Germany?|Are|Do|Does|Kommst du aus Deutschland?
Does your sister ___ in Canada?|live|lives|living|Wohnt deine Schwester in Kanada?`),
    topic('Don’t und doesn’t','I/you/we/they don’t + Grundform; he/she/it doesn’t + Grundform.\n\nDie Endung -s steckt bereits in does: He doesn’t drink.\n\nKurze Antworten verwenden das Hilfsverb: Yes, she does. / No, she doesn’t.\n\nVerneine be weiterhin mit not: She isn’t here.',
      `I don't drink coffee.|Ich trinke keinen Kaffee.
She doesn't drink tea.|Sie trinkt keinen Tee.
Does he work here? Yes, he does.|Arbeitet er hier? Ja.`,
      `I ___ drink coffee.|don't|doesn't|isn't|Ich trinke keinen Kaffee.
She ___ work on Sunday.|doesn't|don't|isn't|Sie arbeitet sonntags nicht.
They ___ live here.|don't|doesn't|aren't|Sie wohnen nicht hier.
He doesn't ___ English.|speak|speaks|speaking|Er spricht kein Englisch.
We don't ___ on Saturday.|study|studies|studying|Wir lernen samstags nicht.
Do you work here? Yes, I ___.|do|does|am|Ja, ich arbeite hier.
Does she live here? Yes, she ___.|does|do|is|Ja, sie wohnt hier.
Does he study? No, he ___.|doesn't|don't|isn't|Nein, er lernt nicht.
Do they drink tea? No, they ___.|don't|doesn't|aren't|Nein, sie trinken keinen Tee.
She ___ not a teacher.|is|does|do|Sie ist keine Lehrerin.
Mia ___ eat breakfast here.|doesn't|don't|isn't|Mia frühstückt nicht hier.
Leo and I ___ work on Friday.|don't|doesn't|aren't|Leo und ich arbeiten freitags nicht.
He doesn't ___ television.|watch|watches|watching|Er sieht nicht fern.
Does Ben have a car? No, he ___.|doesn't|don't|isn't|Nein, Ben hat kein Auto.
Do your parents live here? Yes, they ___.|do|does|are|Ja, deine Eltern wohnen hier.
Anna ___ not from Canada.|is|does|do|Anna kommt nicht aus Kanada.`)],
    'Beschreibe eine Gewohnheit und etwas, das du nicht machst. Stelle zwei Fragen zum Alltag.',
    ['Nenne eine Gewohnheit.','Formuliere eine Verneinung.','Stelle zwei Fragen mit do oder does.'],
    "I work in London. I don't work on Sunday. I study English on Monday. Do you work here? Where does your sister live? Does she speak English?",
    'I {do not~don’t~don\'t|verneinen: I} work on Sunday. Anna {does not~doesn’t~doesn\'t|verneinen: she} work on Saturday. {Do|Frage: you} you live here? {Does|Frage: she} she work here? Where does Ben {live|wohnen, Grundform}? We do not {drink|trinken, Grundform} coffee. Do they study English? Yes, they {do|kurze Antwort}. Does Anna speak German? Yes, she {does|kurze Antwort}.',
    `Du möchtest wissen, wo Anna arbeitet.|Where does Anna work?|When does Anna work?|Why does Anna work?
Ben arbeitet sonntags nicht.|Ben doesn't work on Sunday.|Ben doesn't work on Saturday.|Ben works on Sunday.
Du fragst, ob die andere Person Tee mag.|Do you like tea?|Does she like tea?|Do you drink tea at work?
Du verneinst: Ich wohne hier nicht.|I don't live here.|I don't work here.|He doesn't live here.`);
  add(8,'Dinge zeigen & beschreiben',
    ['This, that, these und those verwenden','Adjektive vor Nomen setzen','The von a/an unterscheiden'],
    'this=dieser / diese / dieses (nah, Einzahl);that=jener / jene / jenes (fern, Einzahl);these=diese (nah, Mehrzahl);those=jene (fern, Mehrzahl);the=der / die / das (bestimmter Artikel);small=klein;big=groß;new=neu;old=alt;red=rot;blue=blau;black=schwarz;white=weiß;green=grün;shirt=Hemd;chair=Stuhl;table=Tisch;key=Schlüssel;pen=Stift;colour=Farbe',
    `This is my bag.|Das hier ist meine Tasche.|Das dort ist meine Tasche.|Das hier sind meine Taschen.
That is your chair.|Das dort ist dein Stuhl.|Das hier ist dein Stuhl.|Das dort sind deine Stühle.
These are my keys.|Das hier sind meine Schlüssel.|Das dort sind meine Schlüssel.|Das hier ist mein Schlüssel.
Those are her books.|Das dort sind ihre Bücher.|Das hier sind ihre Bücher.|Das dort ist ihr Buch.
The bag is blue.|Die Tasche ist blau.|Die Tasche ist grün.|Die Taschen sind blau.
It is a new phone.|Es ist ein neues Telefon.|Es ist ein altes Telefon.|Es sind neue Telefone.
The shirts are white.|Die Hemden sind weiß.|Die Hemden sind schwarz.|Das Hemd ist weiß.
This table is small.|Dieser Tisch ist klein.|Dieser Tisch ist groß.|Jener Tisch ist klein.
That is a red chair.|Das dort ist ein roter Stuhl.|Das dort ist ein blauer Stuhl.|Das hier sind rote Stühle.
What colour is it?|Welche Farbe hat es?|Welche Größe hat es?|Wie alt ist es?`,
    [topic('This, that, these und those','This und these zeigen auf etwas Nahes; that und those auf etwas weiter Entferntes.\n\nEinzahl: this/that + is. Mehrzahl: these/those + are.\n\nDie Form hängt von Nähe und Anzahl ab, nicht vom deutschen Geschlecht. Es wird in jeder Aufgabe gesagt, ob etwas nah oder fern ist.',
      `This is a key.|Das hier ist ein Schlüssel.
These are keys.|Das hier sind Schlüssel.
Those are books.|Das dort sind Bücher.`,
      `___ is my bag.|This|These|Those|Diese eine Tasche direkt bei mir.
___ is your chair.|That|Those|These|Jener eine Stuhl dort drüben.
___ are my keys.|These|This|That|Diese mehreren Schlüssel direkt bei mir.
___ are her books.|Those|That|This|Jene mehreren Bücher dort drüben.
This ___ a pen.|is|are|am|Das hier ist ein Stift.
These ___ books.|are|is|am|Das hier sind Bücher.
That ___ a table.|is|are|am|Das dort ist ein Tisch.
Those ___ chairs.|are|is|am|Das dort sind Stühle.
___ phone is new.|This|These|Those|Dieses eine Telefon hier ist neu.
___ shirts are blue.|Those|That|This|Jene mehreren Hemden dort sind blau.
___ is her key.|This|These|Those|Dieser eine Schlüssel hier.
___ are our bags.|Those|That|This|Jene mehreren Taschen dort drüben.
___ chairs are red.|These|This|That|Diese mehreren Stühle hier.
___ is his phone.|That|Those|These|Jenes eine Telefon dort drüben.
These keys ___ new.|are|is|am|Diese Schlüssel sind neu.
That bag ___ old.|is|are|am|Jene Tasche ist alt.`),
    topic('Adjektive und Artikel','Adjektive stehen vor dem Nomen: a blue bag.\n\nSie bekommen keine Mehrzahlendung: blue bags.\n\nNach be stehen sie ohne Artikel: The bag is blue.\n\nThe bezeichnet etwas Bestimmtes oder bereits Genanntes und bleibt in Einzahl und Mehrzahl gleich.\n\nBei a/an entscheidet der Laut des direkt folgenden Wortes: an old phone, a new phone.',
      `a blue bag / blue bags|eine blaue Tasche / blaue Taschen
an old phone|ein altes Telefon
A pen is here. The pen is blue.|Ein Stift ist hier. Der Stift ist blau.`,
      `It is ___ old phone.|an|a|the|Es ist ein altes Telefon.
It is ___ new phone.|a|an|the|Es ist ein neues Telefon.
They are ___ bags.|blue|a blue|blue's|Es sind blaue Taschen.
This is a ___.|red shirt|shirt red|red shirts|Das ist ein rotes Hemd.
The chair is ___.|white|a white|black|Der Stuhl ist weiß.
These are ___ tables.|small|big|a small|Das sind kleine Tische.
I have a pen. ___ pen is blue.|The|An|These|Ich habe einen Stift. Der bereits genannte Stift ist blau.
This is ___ big bag.|a|an|the|Das ist eine große Tasche.
It is ___ English book.|an|a|the|Es ist ein englisches Buch.
The phones are ___.|new|old|a new|Die Telefone sind neu.
That is ___ old chair.|an|a|the|Das ist ein alter Stuhl.
These are ___ shirts.|green|blue|a green|Das sind grüne Hemden.
She has a bag. ___ bag is black.|The|An|These|Sie hat eine Tasche. Die bereits genannte Tasche ist schwarz.
It is a ___.|white table|table white|white tables|Es ist ein weißer Tisch.
Those chairs are ___.|big|small|a big|Jene Stühle sind groß.
This is ___ small key.|a|an|the|Das ist ein kleiner Schlüssel.`)],
    'Beschreibe drei Gegenstände. Sage, welche nah oder weiter weg sind, und nenne Farben oder Größen.',
    ['Beschreibe einen nahen Gegenstand.','Beschreibe mehrere weiter entfernte Gegenstände.','Nenne mindestens zwei Eigenschaften.'],
    'This is my bag. It is blue. These are my keys. That is a new phone. Those are white shirts. The bag is small, but the shirts are big.',
    '{This|dies, nah, Einzahl} is my bag. It is {a|ein: blue bag} blue bag. {These|dies, nah, Mehrzahl} are my keys. They {are|Form von be} new. {That|jenes, fern, Einzahl} is a chair. It is {an|ein: old chair} old chair. {Those|jene, fern, Mehrzahl} are my shirts. The shirts are {white|weiß}.',
    `Du zeigst auf mehrere Schlüssel in deiner Hand.|These are my keys.|Those are my keys.|This is my key.
Du beschreibst eine weit entfernte Tasche.|That bag is blue.|This bag is blue.|Those bags are blue.
Du möchtest die Farbe wissen.|What colour is it?|How old is it?|Where is it?
Du beschreibst mehrere neue Telefone.|They are new phones.|It is a new phone.|They are old phones.`);
  add(9,'Wohnung & Lage',
    ['Räume und Möbel benennen','Mit there is/are sagen, was vorhanden ist','Orte mit in, on, under, next to und opposite beschreiben'],
    'house=Haus;flat=Wohnung;room=Zimmer;bedroom=Schlafzimmer;kitchen=Küche;bathroom=Badezimmer;living room=Wohnzimmer;bed=Bett;door=Tür;window=Fenster;floor=Boden / Stockwerk;on=auf;under=unter;next to=neben;behind=hinter;in front of=vor;opposite=gegenüber;near=in der Nähe von;there is=es gibt (Einzahl);there are=es gibt (Mehrzahl);between=zwischen',
    `There is a kitchen.|Es gibt eine Küche.|Es gibt ein Badezimmer.|Es gibt zwei Küchen.
There are two bedrooms.|Es gibt zwei Schlafzimmer.|Es gibt drei Schlafzimmer.|Es gibt zwei Badezimmer.
Is there a bathroom?|Gibt es ein Badezimmer?|Wo ist das Badezimmer?|Gibt es ein Schlafzimmer?
The keys are on the table.|Die Schlüssel liegen auf dem Tisch.|Die Schlüssel liegen unter dem Tisch.|Der Schlüssel liegt auf dem Tisch.
The bag is under the chair.|Die Tasche liegt unter dem Stuhl.|Die Tasche liegt auf dem Stuhl.|Die Tasche liegt neben dem Stuhl.
The kitchen is next to the bathroom.|Die Küche ist neben dem Badezimmer.|Die Küche ist gegenüber dem Badezimmer.|Das Schlafzimmer ist neben dem Badezimmer.
The bed is in the bedroom.|Das Bett ist im Schlafzimmer.|Das Bett ist im Wohnzimmer.|Die Tasche ist im Schlafzimmer.
The chair is behind the door.|Der Stuhl ist hinter der Tür.|Der Stuhl ist vor der Tür.|Der Stuhl ist neben der Tür.
The table is in front of the window.|Der Tisch ist vor dem Fenster.|Der Tisch ist hinter dem Fenster.|Der Tisch ist neben dem Fenster.
Our flat is near the school.|Unsere Wohnung ist in der Nähe der Schule.|Unsere Wohnung ist gegenüber der Schule.|Unsere Wohnung ist in der Nähe des Ladens.`,
    [topic('There is und there are','There is + Einzahl und there are + Mehrzahl bedeuten es gibt.\n\nFragen drehen die Reihenfolge um: Is there …? / Are there …?\n\nVerneinung: There isn’t … / There aren’t … .\n\nVerwechsle there = dort/es gibt nicht mit their = ihr (Besitz).',
      `There is a kitchen.|Es gibt eine Küche.
There are two rooms.|Es gibt zwei Zimmer.
Is there a bathroom?|Gibt es ein Badezimmer?`,
      `There ___ a kitchen.|is|are|am|Es gibt eine Küche.
There ___ two bedrooms.|are|is|am|Es gibt zwei Schlafzimmer.
___ there a bathroom?|Is|Are|Am|Gibt es ein Badezimmer?
___ there three chairs?|Are|Is|Am|Gibt es drei Stühle?
There ___ a bed.|is|are|am|Es gibt ein Bett.
There ___ four windows.|are|is|am|Es gibt vier Fenster.
There ___ a table.|isn't|aren't|don't|Es gibt keinen Tisch.
There ___ two kitchens.|aren't|isn't|doesn't|Es gibt nicht zwei Küchen.
Is there a bedroom? Yes, there ___.|is|are|am|Ja, es gibt ein Schlafzimmer.
Are there two rooms? Yes, there ___.|are|is|am|Ja, es gibt zwei Zimmer.
There ___ a living room.|is|are|am|Es gibt ein Wohnzimmer.
There ___ five doors.|are|is|am|Es gibt fünf Türen.
___ there a window?|Is|Are|Am|Gibt es ein Fenster?
___ there two beds?|Are|Is|Am|Gibt es zwei Betten?
There ___ a phone in the room.|isn't|aren't|don't|Im Zimmer gibt es kein Telefon.
Are there three rooms? No, there ___.|aren't|isn't|don't|Nein, es gibt nicht drei Zimmer.`),
    topic('Lagepräpositionen','In = in, on = auf, under = unter, next to = neben, behind = hinter, in front of = vor, opposite = gegenüber und between = zwischen.\n\nBei zwei ausdrücklich genannten Bezugspunkten verbindet and die beiden: between the kitchen and the bathroom.\n\nEine Mehrzahl kann die Bezugspunkte zusammenfassen: between the books.\n\nDie Präposition beschreibt die Lage; benutze die deutsche Ortsangabe zur Auswahl.',
      `The phone is on the table.|Das Telefon liegt auf dem Tisch.
The bag is under the bed.|Die Tasche liegt unter dem Bett.
The kitchen is between the bedrooms.|Die Küche ist zwischen den Schlafzimmern.`,
      `The keys are ___ the table.|on|under|behind|Die Schlüssel liegen auf dem Tisch.
The bag is ___ the chair.|under|on|next to|Die Tasche liegt unter dem Stuhl.
The kitchen is ___ the bathroom.|next to|behind|in|Die Küche ist neben dem Badezimmer.
The chair is ___ the door.|behind|in front of|on|Der Stuhl ist hinter der Tür.
The table is ___ the window.|in front of|behind|under|Der Tisch steht vor dem Fenster.
The bed is ___ the bedroom.|in|on|under|Das Bett ist im Schlafzimmer.
The school is ___ our house.|opposite|in|on|Die Schule ist gegenüber unserem Haus.
The flat is ___ the school.|near|under|in|Die Wohnung ist in der Nähe der Schule.
The pen is ___ the books.|between|behind|under|Der Stift liegt zwischen den Büchern.
The room is between the kitchen ___ the bathroom.|and|but|because|Das Zimmer ist zwischen der Küche und dem Badezimmer.
The phone is ___ the bed.|on|under|behind|Das Telefon liegt auf dem Bett.
The cat is ___ the table.|under|on|opposite|Die Katze ist unter dem Tisch.
The bathroom is ___ the bedroom.|next to|in|under|Das Badezimmer ist neben dem Schlafzimmer.
The door is ___ the table.|behind|in front of|on|Die Tür ist hinter dem Tisch.
The chair is ___ the window.|in front of|behind|in|Der Stuhl steht vor dem Fenster.
The shop is ___ the school.|opposite|in|on|Der Laden ist gegenüber der Schule.`)],
    'Beschreibe eine Wohnung mit zwei Räumen und sage, wo zwei Gegenstände sind.',
    ['Nenne vorhandene Räume mit there is/are.','Beschreibe die Lage von zwei Gegenständen.','Stelle eine Frage zur Wohnung.'],
    'There are two bedrooms in our flat. There is a small kitchen. The kitchen is next to the bathroom. My phone is on the table. Is there a chair in your room?',
    'There {is|be, Einzahl} a kitchen in our flat. There {are|be, Mehrzahl} two bedrooms. The bathroom is {next to|neben} the kitchen. The phone is {on|auf} the table. The bag is {under|unter} the bed. The chair is {behind|hinter} the door. {Is|Frage, Einzahl} there a window? Yes, there {is|kurze Antwort}.',
    `Du fragst, ob die Wohnung zwei Schlafzimmer hat.|Are there two bedrooms?|Is there a bedroom?|Are there two bathrooms?
Deine Tasche liegt unter dem Bett.|My bag is under the bed.|My bag is on the bed.|My bag is next to the bed.
Du beschreibst die Küche neben dem Bad.|The kitchen is next to the bathroom.|The kitchen is opposite the bathroom.|The bathroom is in the kitchen.
Im Zimmer steht kein Tisch.|There isn't a table in the room.|There aren't two tables in the room.|There is a table in the room.`);
  add(10,'Uhrzeit, Tage & Termine',
    ['Uhrzeiten und einfache Datumsangaben verstehen','At, on und in für Zeiten unterscheiden','Einen einfachen Termin vereinbaren'],
    'time=Zeit / Uhrzeit;o’clock=Uhr (volle Stunde);half past=halb nach / dreißig nach;quarter past=Viertel nach;quarter to=Viertel vor;minute=Minute;hour=Stunde;day=Tag;month=Monat;January=Januar;February=Februar;March=März;April=April;May=Mai;June=Juni;July=Juli;August=August;September=September;October=Oktober;November=November;December=Dezember;appointment=Termin;at=um (Uhrzeit);on=am (Tag);in=im (Monat);meet=sich treffen;station=Bahnhof;café=Café;place=Ort;free=frei / verfügbar;afternoon=Nachmittag',
    `It is half past seven.|Es ist halb acht.|Es ist halb sieben.|Es ist Viertel nach sieben.
It is quarter past nine.|Es ist Viertel nach neun.|Es ist Viertel vor neun.|Es ist halb zehn.
It is quarter to ten.|Es ist Viertel vor zehn.|Es ist Viertel nach zehn.|Es ist Viertel vor neun.
The appointment is at ten.|Der Termin ist um zehn.|Der Termin ist um zwölf.|Der Termin ist am zehnten.
I work on Monday.|Ich arbeite am Montag.|Ich arbeite am Dienstag.|Ich arbeite im Mai.
The course starts in May.|Der Kurs beginnt im Mai.|Der Kurs beginnt im März.|Der Kurs beginnt am Montag.
Are you free on Friday?|Hast du am Freitag Zeit?|Hast du am Donnerstag Zeit?|Hast du am Freitag keine Zeit?
At half past two, please.|Um halb drei, bitte.|Um halb zwei, bitte.|Um Viertel nach zwei, bitte.
What time is it?|Wie spät ist es?|Welcher Tag ist heute?|Wann arbeitest du?
See you on Tuesday!|Bis Dienstag!|Bis Donnerstag!|Bis morgen!`,
    [topic('Uhrzeiten sicher verstehen','Seven o’clock = 7:00, quarter past seven = 7:15, half past seven = 7:30 und quarter to eight = 7:45.\n\nAchtung: half past seven ist deutsch halb acht.\n\nDie digitale Form seven thirty ist ebenfalls üblich.\n\nAm = vor Mittag, pm = nach Mittag; 12 am ist Mitternacht, 12 pm ist Mittag.',
      `half past eight = eight thirty|8:30, halb neun
quarter to six = five forty-five|5:45, Viertel vor sechs
ten past three = three ten|3:10, zehn nach drei`,
      `Half past seven is ___.|7:30|6:30|7:15|Wähle die digitale Uhrzeit.
Quarter past nine is ___.|9:15|9:45|8:45|Wähle die digitale Uhrzeit.
Quarter to ten is ___.|9:45|10:15|10:45|Wähle die digitale Uhrzeit.
Eight o'clock is ___.|8:00|8:15|8:30|Wähle die digitale Uhrzeit.
Half past two is ___.|2:30|1:30|2:15|Wähle die digitale Uhrzeit.
Quarter to four is ___.|3:45|4:15|4:45|Wähle die digitale Uhrzeit.
Ten past six is ___.|6:10|5:50|6:50|Wähle die digitale Uhrzeit.
Twenty past five is ___.|5:20|4:40|5:40|Wähle die digitale Uhrzeit.
Nine thirty is ___.|9:30|9:13|8:30|Wähle die digitale Uhrzeit.
Six forty-five is ___.|6:45|5:45|6:15|Wähle die digitale Uhrzeit.
Half past eleven is ___.|11:30|10:30|11:15|Wähle die digitale Uhrzeit.
Quarter to seven is ___.|6:45|7:15|7:45|Wähle die digitale Uhrzeit.
Quarter past one is ___.|1:15|12:45|1:45|Wähle die digitale Uhrzeit.
Twenty past eight is ___.|8:20|7:40|8:40|Wähle die digitale Uhrzeit.
Ten past four is ___.|4:10|3:50|4:50|Wähle die digitale Uhrzeit.
Three thirty is ___.|3:30|3:13|2:30|Wähle die digitale Uhrzeit.`),
    topic('At, on und in bei Zeiten','At steht vor Uhrzeiten: at ten, at 9:30; auch at night.\n\nOn steht vor Wochentagen und konkreten Tagen: on Monday, on 12 May.\n\nIn steht vor Monaten, Jahren und Tagesabschnitten: in May, in 2026, in the morning.\n\nThe first/second/third sind der erste/zweite/dritte; Datumsangaben können auch als Ziffern geschrieben werden.\n\nIn dieser Lektion liest du Datumszahlen als Ziffern; gesprochen heißt on 12 May „on the twelfth of May“. Die Datumszahlen musst du hier noch nicht selbst sprechen.',
      `at nine / on Friday / in June|um neun / am Freitag / im Juni
on 12 May|am 12. Mai
in the evening / at night|am Abend / nachts`,
      `The appointment is ___ ten.|at|on|in|Der Termin ist um zehn.
I work ___ Monday.|on|at|in|Ich arbeite am Montag.
The course starts ___ May.|in|on|at|Der Kurs beginnt im Mai.
We study ___ the morning.|in|on|at|Wir lernen am Morgen.
He works ___ night.|at|in|on|Er arbeitet nachts.
She starts ___ 8:30.|at|on|in|Sie fängt um 8:30 an.
We are free ___ Friday.|on|at|in|Wir haben am Freitag Zeit.
My appointment is ___ 12 May.|on|in|at|Mein Termin ist am 12. Mai.
I study ___ the evening.|in|on|at|Ich lerne am Abend.
The course starts ___ June.|in|at|on|Der Kurs beginnt im Juni.
The shop opens ___ nine.|at|on|in|Der Laden öffnet um neun. Opens = öffnet.
We work ___ Thursday.|on|in|at|Wir arbeiten am Donnerstag.
The course is ___ September.|in|on|at|Der Kurs ist im September.
She studies ___ the afternoon.|in|on|at|Sie lernt am Nachmittag. Afternoon = Nachmittag.
The appointment is ___ 3 April.|on|at|in|Der Termin ist am 3. April.
He finishes ___ half past five.|at|on|in|Er hört um halb sechs auf.`)],
    'Vereinbare einen Termin. Nenne Tag, Uhrzeit und Ort und frage, ob die andere Person Zeit hat.',
    ['Schlage einen Wochentag vor.','Nenne eine eindeutige Uhrzeit.','Nenne den Ort und frage nach Zeit.'],
    'Hello Ben! Are you free on Friday? Our appointment is at half past two. We are in the office. Is that time good for you? See you on Friday!',
    'Our appointment is {on|am: Wochentag} Friday {at|um: Uhrzeit} half past two. The course starts {in|im: Monat} May. I work {in|am: Tagesabschnitt} the morning. Ben works {at|nachts} night. We study {on|am: Wochentag} Monday. The appointment is {on|am: Datum} 12 May. I finish {at|um: Uhrzeit} quarter to six.',
    `Du bestätigst 8:30 Uhr.|At half past eight.|At half past seven.|At quarter past eight.
Du bestätigst Dienstag.|See you on Tuesday!|See you on Thursday!|See you on Wednesday!
Du fragst nach der aktuellen Uhrzeit.|What time is it?|When is the appointment?|What day is it?
Du nennst den Monat März.|in March|in May|on Monday`);
  add(11,'Wie oft? Freizeit & Gewohnheiten',
    ['Über Freizeit und Häufigkeit sprechen','Always, often, sometimes und never richtig platzieren','Nach Tag, Ort, Grund und Häufigkeit fragen'],
    'always=immer;usually=normalerweise;often=oft;sometimes=manchmal;never=nie;how often=wie oft;once=einmal;twice=zweimal;play=spielen;football=Fußball;tennis=Tennis;music=Musik;listen to=anhören;walk=spazieren gehen;swim=schwimmen;cook=kochen;visit=besuchen;park=Park;cinema=Kino;free time=Freizeit',
    `I often play tennis.|Ich spiele oft Tennis.|Ich spiele manchmal Tennis.|Ich spiele nie Tennis.
She never drinks coffee.|Sie trinkt nie Kaffee.|Sie trinkt oft Kaffee.|Sie trinkt manchmal Kaffee.
We sometimes go to the cinema.|Wir gehen manchmal ins Kino.|Wir gehen immer ins Kino.|Wir gehen nie ins Kino.
He is always early.|Er ist immer früh dran.|Er ist oft früh dran.|Er ist immer spät dran.
How often do you swim?|Wie oft schwimmst du?|Wann schwimmst du?|Wo schwimmst du?
I swim twice a week.|Ich schwimme zweimal pro Woche.|Ich schwimme einmal pro Woche.|Ich schwimme zweimal pro Tag.
What do you do in your free time?|Was machst du in deiner Freizeit?|Wann hast du Freizeit?|Wo arbeitest du?
I listen to music.|Ich höre Musik.|Ich mache Musik.|Ich lese über Musik.
We visit our friends on Sunday.|Wir besuchen sonntags unsere Freunde.|Wir besuchen samstags unsere Freunde.|Unsere Freunde besuchen uns sonntags.
Why do you cook at home?|Warum kochst du zu Hause?|Wann kochst du zu Hause?|Wie oft kochst du zu Hause?`,
    [topic('Häufigkeitswörter','Always = immer, usually = normalerweise, often = oft, sometimes = manchmal und never = nie.\n\nMeist stehen sie vor dem Tätigkeitsverb: She often swims.\n\nBei be stehen sie nach dem Verb: She is often here.\n\nNever enthält schon die Verneinung; kein zusätzliches don’t.\n\nOnce a week = einmal pro Woche, twice a week = zweimal pro Woche.',
      `I often cook.|Ich koche oft.
He is always early.|Er ist immer früh dran.
We swim twice a week.|Wir schwimmen zweimal pro Woche.`,
      `I ___ play tennis.|often|never|always|Ich spiele oft Tennis.
She ___ drinks coffee.|never|always|often|Sie trinkt nie Kaffee.
We ___ go to the cinema.|sometimes|always|never|Wir gehen manchmal ins Kino.
He is ___ early.|always|never|sometimes|Er ist immer früh dran.
She ___ cooks at home.|usually|never|sometimes|Sie kocht normalerweise zu Hause.
I swim ___ a week.|twice|once|never|Ich schwimme zweimal pro Woche.
We play football ___ a week.|once|twice|always|Wir spielen einmal pro Woche Fußball.
She ___ music.|often listens to|listens often to|often listen to|Sie hört oft Musik. Verwende die normale Stellung vor dem Verb.
He ___ early.|is never|never is|never are|Er ist nie früh dran. Verwende die normale Stellung nach be.
She ___ coffee.|never drinks|doesn't never drink|never drink|Sie trinkt nie Kaffee.
Leo ___ visits his parents.|often|never|always|Leo besucht oft seine Eltern.
Mia is ___ at home.|usually|never|sometimes|Mia ist normalerweise zu Hause.
They ___ cook together.|sometimes|always|never|Sie kochen manchmal zusammen.
I go to the park ___ a week.|once|twice|never|Ich gehe einmal pro Woche in den Park.
He swims ___ a week.|twice|once|always|Er schwimmt zweimal pro Woche.
We ___ tea.|never drink|don't never drink|never drinks|Wir trinken nie Tee.`),
    topic('Fragewörter im Alltag','What fragt nach einer Sache oder Tätigkeit, where nach einem Ort, when nach einer Zeit, why nach einem Grund und how often nach Häufigkeit.\n\nMit Tätigkeitsverben folgt do/does; bei be folgt am/is/are.\n\nEine because-Antwort passt zu why.\n\nNach Verben und Präpositionen stehen Objektformen: me = mich/mir, us = uns, them = sie/ihnen.\n\nWe visit them = Wir besuchen sie; they visit us = Sie besuchen uns.',
      `Where do you play tennis? In the park.|Wo spielst du Tennis? Im Park.
When do you cook? On Sunday.|Wann kochst du? Am Sonntag.
How often do you read? Every day.|Wie oft liest du? Jeden Tag.`,
      `___ do you swim? Twice a week.|How often|Where|Why|Wie oft schwimmst du?
___ do you work? In London.|Where|When|Why|Wo arbeitest du?
___ do you study? On Monday.|When|Where|What|Wann lernst du?
___ do you cook? Because I like it.|Why|Where|When|Warum kochst du?
___ do you do in your free time? I play tennis.|What|Where|When|Was machst du in deiner Freizeit?
How often ___ she swim?|does|do|is|Wie oft schwimmt sie?
Where ___ they play football?|do|does|are|Wo spielen sie Fußball?
When ___ he at home?|is|does|do|Wann ist er zu Hause?
Why ___ you study English?|do|does|are|Warum lernst du Englisch?
What ___ she do on Sunday?|does|do|is|Was macht sie sonntags?
___ does Mia live? In Berlin.|Where|When|Why|Wo wohnt Mia?
___ do they visit us? On Friday.|When|Where|What|Wann besuchen sie uns? Us = uns.
___ does Leo read? Every day.|How often|Where|Why|Wie oft liest Leo?
___ do you drink water? Because I like it.|Why|When|Where|Warum trinkst du Wasser?
Where ___ your friends work?|do|does|are|Wo arbeiten deine Freunde?
When ___ the appointment?|is|does|do|Wann ist der Termin?`)],
    'Beschreibe zwei Freizeitaktivitäten und wie oft du sie machst. Stelle eine passende Frage.',
    ['Nenne zwei Freizeitaktivitäten.','Beschreibe Häufigkeit oder Wochentage.','Frage die andere Person nach ihrer Freizeit.'],
    'I often play tennis. I swim twice a week, on Monday and Friday. I never play football. On Sunday I visit my friends. What do you do in your free time?',
    'I {often|oft} play tennis. I swim {twice|zweimal} a week. My sister {never|nie} drinks coffee. She is {always|immer} early. We {sometimes|manchmal} visit our friends. {Where|wo} do they live? In London. {When|wann} do we visit them? On Sunday. {Why|warum} do we go there? Because they are our friends.',
    `Du fragst nach Häufigkeit.|How often do you swim?|Where do you swim?|Why do you swim?
Du sagst, dass du nie Kaffee trinkst.|I never drink coffee.|I sometimes drink coffee.|I don't often drink coffee.
Du sagst, dass du zweimal pro Woche Tennis spielst.|I play tennis twice a week.|I play tennis once a week.|I play tennis twice a day.
Du möchtest einen Grund erfahren.|Why do you study English?|When do you study English?|Where do you study English?`);
  add(12,'Können & höflich bitten',
    ['Fähigkeiten mit can beschreiben','Mit can’t verneinen','Einfache Bitten und Erlaubnisfragen formulieren'],
    'can=können / dürfen;can’t=cannot;help=helfen;open=öffnen;close=schließen;wait=warten;come=kommen;sit=sitzen;stand=stehen;drive=Auto fahren;dance=tanzen;sing=singen;use=benutzen;take=nehmen;ticket=Fahrkarte / Eintrittskarte;carry=tragen;suitcase=Koffer;here=hier;of course=natürlich;thank you=danke',
    `I can swim.|Ich kann schwimmen.|Ich schwimme oft.|Ich kann nicht schwimmen.
She can drive.|Sie kann Auto fahren.|Sie fährt gerade Auto.|Sie kann nicht Auto fahren.
He can't dance.|Er kann nicht tanzen.|Er tanzt nie.|Er kann tanzen.
Can you help me, please?|Kannst du mir bitte helfen?|Kann ich dir bitte helfen?|Hilfst du mir jeden Tag?
Can I sit here?|Darf ich hier sitzen?|Kannst du hier sitzen?|Sitze ich hier?
Can you open the window?|Kannst du das Fenster öffnen?|Kannst du die Tür öffnen?|Kannst du das Fenster schließen?
Can I use your phone?|Darf ich dein Telefon benutzen?|Darfst du mein Telefon benutzen?|Kannst du dein Telefon benutzen?
Yes, of course.|Ja, natürlich.|Nein, leider nicht.|Ja, manchmal.
Sorry, I can't.|Entschuldigung, ich kann nicht.|Entschuldigung, ich weiß nicht.|Entschuldigung, ich kann.
Can you carry this bag?|Kannst du diese Tasche tragen?|Kannst du diesen Koffer tragen?|Kann ich diese Tasche tragen?`,
    [topic('Can: gleiche Form für alle','Can steht bei allen Personen gleich.\n\nDanach folgt die Grundform ohne to: She can drive. Kein -s an can oder am folgenden Verb.\n\nVerneinung: cannot oder can’t.\n\nCan beschreibt eine Fähigkeit; die Häufigkeit einer Tätigkeit ist eine andere Information.\n\nCan’t bedeutet je nach Situation „kann nicht“ oder „darf nicht“; cannot ist dieselbe Verneinung ausgeschrieben.',
      `I can swim. She can swim.|Ich kann schwimmen. Sie kann schwimmen.
He cannot drive.|Er kann nicht Auto fahren.
We can speak English.|Wir können Englisch sprechen.`,
      `I ___ swim.|can|does|am can|Ich kann schwimmen.
She can ___.|drive|drives|to drive|Sie kann Auto fahren.
He ___ dance.|can't|don't can|doesn't can|Er kann nicht tanzen.
We can ___ English.|speak|speaks|to speak|Wir können Englisch sprechen.
They ___ sing.|can|does|are can|Sie können singen.
Anna can ___.|cook|cooks|to cook|Anna kann kochen.
Ben ___ drive.|cannot|doesn't can|not can|Ben kann nicht Auto fahren.
You can ___ here.|wait|waits|to wait|Du kannst hier warten.
My sister can ___.|dance|dances|to dance|Meine Schwester kann tanzen.
We ___ come on Friday.|can't|don't can|aren't can|Wir können am Freitag nicht kommen.
Leo can ___ the bag.|carry|carries|to carry|Leo kann die Tasche tragen.
Mia ___ sing.|can|does|is can|Mia kann singen.
Our parents can ___ English.|speak|speaks|to speak|Unsere Eltern können Englisch sprechen.
I ___ drive.|can't|don't can|am not can|Ich kann nicht Auto fahren.
He can ___ the window.|open|opens|to open|Er kann das Fenster öffnen.
They can ___ here.|sit|sits|to sit|Sie können hier sitzen.`),
    topic('Fragen und Bitten mit can','Bei Fragen steht can vor dem Subjekt: Can you help me?\n\nEs kommt kein do/does dazu.\n\nCan I …? fragt oft nach Erlaubnis; Can you …? bittet oft die andere Person um etwas.\n\nPlease macht die Bitte höflicher.\n\nKurze Antworten: Yes, I can. / No, I can’t.',
      `Can I use your phone?|Darf ich dein Telefon benutzen?
Can you open the door, please?|Kannst du bitte die Tür öffnen?
Can she swim? Yes, she can.|Kann sie schwimmen? Ja.`,
      `___ you help me?|Can|Do can|Does can|Kannst du mir helfen?
___ I sit here?|Can|Do|Am|Darf ich hier sitzen?
Can she ___?|drive|drives|to drive|Kann sie Auto fahren?
Can you swim? Yes, I ___.|can|do|am|Ja, ich kann schwimmen.
Can he dance? No, he ___.|can't|doesn't|isn't|Nein, er kann nicht tanzen.
Can ___ use your phone?|I|me|my|Darf ich dein Telefon benutzen?
Can you ___ the window?|close|closes|to close|Kannst du das Fenster schließen?
Can ___ carry this bag?|you|your|yours|Kannst du diese Tasche tragen?
Can they come? Yes, they ___.|can|do|are|Ja, sie können kommen.
Can I ___ the door?|open|opens|to open|Darf ich die Tür öffnen?
___ Mia help us?|Can|Does can|Is can|Kann Mia uns helfen? Us = uns.
Can Leo ___ here?|wait|waits|to wait|Kann Leo hier warten?
Can we sit here? Yes, you ___.|can|do|are|Ja, ihr dürft hier sitzen.
Can she sing? No, she ___.|can't|doesn't|isn't|Nein, sie kann nicht singen.
Can I ___ this ticket?|use|uses|to use|Darf ich diese Fahrkarte benutzen?
Can you ___ here on Monday?|come|comes|to come|Kannst du am Montag hierherkommen?`)],
    'Nenne etwas, das du kannst, und etwas, das du nicht kannst. Formuliere anschließend eine höfliche Bitte.',
    ['Nenne eine Fähigkeit.','Nenne eine Einschränkung.','Bitte um Hilfe oder Erlaubnis.'],
    "I can swim and I can cook. I can't drive. Can you help me with this suitcase, please? Can I sit here? Thank you for your help!",
    'I {can|können} swim. My sister can {drive|fahren, Grundform}. I {cannot~can’t~can\'t|nicht können} drive. {Can|Frage} you help me, please? Can I {use|benutzen, Grundform} your phone? Yes, you {can|kurze Antwort}. My brother can {carry|tragen, Grundform} this bag. He cannot {come|kommen, Grundform} on Friday.',
    `Du möchtest selbst das Telefon benutzen.|Can I use your phone?|Can you use my phone?|Do you use your phone?
Du bittest jemanden, die Tür zu schließen.|Can you close the door, please?|Can I close the door, please?|Can you open the door, please?
Du sagst, dass Anna Auto fahren kann.|Anna can drive.|Anna drives every day.|Anna can't drive.
Du erlaubst jemandem, hier zu sitzen.|Yes, you can sit here.|Yes, I can sit here.|No, you can't sit here.`);
})();
