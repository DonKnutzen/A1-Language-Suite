/* Three independently authored recordings per lesson. Question labels never name
 * an answer to a different question. Voice roles are explicit, not inferred. */
(() => {
  'use strict';
  const bank={};
  const scene=(speech,rows)=>({turns:speech.split('\n').map((line,i)=>({speaker:line[0].toUpperCase(),gender:line[0]==='f'?'female':'male',text:line.slice(2)})),fields:rows.trim().split('\n').map(line=>{const[q,a,b,c,format]=line.split('|');return {label:q,answer:a.split('~')[0],accept:a.split('~').slice(1),options:[a.split('~')[0],b,c],...(format?{format}:{})};})});
  function add(id,...scenes){bank[id]=scenes;}
  add(1,
    scene('f:Hello! My name is Anna. I am from Germany. I am in London. Tom is from Canada.',`Name der sprechenden Person|Anna|Emma|Mia
Herkunftsland der sprechenden Person|Germany|Canada|England
Stadt der sprechenden Person|London|Berlin|Halifax
Herkunftsland der anderen Person|Canada|Germany|England`),
    scene('m:Good morning! I am Ben. I am from Canada. I am in Berlin. Emma is in London.',`Wie heißt die sprechende Person?|Ben|Tom|Leo
Aus welchem Land kommt sie?|Canada|Germany|England
In welcher Stadt ist sie?|Berlin|London|Halifax
In welcher Stadt ist die andere Person?|London|Berlin|Halifax`),
    scene('f:Good evening! My name is Mia. I am from Germany. I am in Halifax. Leo is from Canada.',`Wie heißt die sprechende Person?|Mia|Anna|Emma
Aus welchem Land kommt sie?|Germany|Canada|England
In welcher Stadt ist sie?|Halifax|London|Berlin
Aus welchem Land kommt die andere Person?|Canada|Germany|England`));
  add(2,
    scene('m:Hello! My first name is Tom. My surname is Hill. Hill: H, I, L, L. I am from Canada.\nf:How are you?\nm:I am fine, thank you.',`Vorname|Tom|Ben|Leo
Nachname|Hill|Hall|Bell
Herkunftsland|Canada|Germany|England
Befinden|fine|not fine|tired`),
    scene('f:My first name is Emma. My surname is Bell. Bell: B, E, L, L. I am from Germany. I am in London.',`Wie lautet der Vorname?|Emma|Anna|Mia
Wie lautet der buchstabierte Nachname?|Bell|Hill|Ball
Aus welchem Land kommt die Person?|Germany|Canada|England
In welcher Stadt ist die Person?|London|Berlin|Halifax`),
    scene('m:My first name is Leo. My surname is Hall. Hall: H, A, L, L. I am not from Canada. I am from Germany. I am in Berlin.',`Wie lautet der Vorname?|Leo|Ben|Tom
Wie lautet der buchstabierte Nachname?|Hall|Hill|Bell
Aus welchem Land kommt die Person?|Germany|Canada|England
In welcher Stadt ist die Person?|Berlin|London|Halifax`));
  add(3,
    scene('f:I am thirty, not thirteen. My number is twenty-one. Two books and three apples are in my bag.',`Alter in Ziffern|30|13|3
Nummer in Ziffern|21|12|31
Anzahl der Bücher|2|3|4
Anzahl der Äpfel|3|2|5`),
    scene('m:I am forty, not fourteen. My number is thirty-two. Five books and two phones are in my bag.',`Wie alt ist die Person? Ziffern.|40|14|4|number
Wie lautet die Nummer? Ziffern.|32|23|22|number
Wie viele Bücher gibt es? Ziffern.|5|4|6|number
Wie viele Telefone gibt es?|2|3|5|number`),
    scene('f:I am fifteen, not fifty. My number is twelve. There are four apples and six books in my bag.',`Wie alt ist die Person? Ziffern.|15|50|5|number
Wie lautet die Nummer? Ziffern.|12|20|21|number
Wie viele Äpfel gibt es? Ziffern.|4|3|6|number
Wie viele Bücher gibt es?|6|4|5|number`));
  add(4,
    scene('f:My sister is Emma. She is twenty. She has a cat. My brother has a dog. My parents are in Berlin.',`Alter der Schwester|20|12|30
Tier der Schwester|cat|dog|fish
Tier des Bruders|dog|cat|fish
Stadt der Eltern|Berlin|London|Halifax`),
    scene('m:My daughter is ten. My son is eight. We have a cat. My parents have a dog.',`Wie alt ist die Tochter? Ziffern.|10|8|12|number
Wie alt ist der Sohn? Ziffern.|8|10|18|number
Welches Tier hat die sprechende Person mit ihrer Familie? Englisch.|cat~a cat|dog|fish
Welches Tier haben die Eltern?|dog|cat|fish`),
    scene('f:My brother is thirty. My sister is twenty-one. My brother has two children. My sister has a dog.',`Wie alt ist der Bruder? Ziffern.|30|13|20|number
Wie alt ist die Schwester? Ziffern.|21|12|31|number
Wie viele Kinder hat der Bruder? Ziffern.|2|3|1|number
Welches Tier hat die Schwester?|dog|cat|fish`));
  add(5,
    scene('m:I live in London. I work at home. I study English. I drink tea, but I like coffee.',`Wohnort|London|Berlin|Halifax
Arbeitsort|at home|in an office|in a shop
Gelernte Sprache|English|German|French
Getränk, das tatsächlich getrunken wird|tea|coffee|water`),
    scene('f:We live in Berlin. We work in an office. We study English together. We drink water at work.',`In welcher Stadt wohnen die Personen?|Berlin|London|Halifax
Wo arbeiten sie? Englisch.|in an office~an office~office|at home|in a shop
Welche Sprache lernen sie? Englisch.|English|German|French
Was trinken sie bei der Arbeit?|water|tea|coffee`),
    scene('m:I live in Halifax. I work at home. I speak German. I study English because I work in Canada.',`In welcher Stadt wohnt die Person?|Halifax|London|Berlin
Wo arbeitet die Person? Englisch.|at home~home|in an office|in a shop
Welche Sprache lernt sie? Englisch.|English|German|French
In welchem Land arbeitet sie?|Canada|Germany|England`));
  add(6,
    scene('f:My brother works in a shop. He starts early. He goes to work by bus. He watches television in the evening.',`Arbeitsort|in a shop|in an office|at home
Arbeitsbeginn|early|late|at night
Verkehrsmittel|bus|train|car
Aktivität am Abend|watches television|studies English|reads books`),
    scene('m:My sister teaches English. She works in London. She has breakfast at home. She finishes late.',`Welche Sprache unterrichtet die Person? Englisch.|English|German|French
In welcher Stadt arbeitet sie?|London|Berlin|Halifax
Wo frühstückt sie? Englisch.|at home~home|at work|in a café
Wann hört sie auf? Wähle die Aussage.|late|early|at night`),
    scene('f:My father works in an office. He has breakfast at home. He goes to work by bus. He studies English in the evening.',`Wo arbeitet die Person? Englisch.|in an office~an office~office|in a shop|at home
Wo frühstückt sie? Englisch.|at home~home|at work|in a café
Welches Verkehrsmittel nutzt sie? Englisch.|bus~by bus|train|car
Welche Sprache lernt sie am Abend?|English|German|French`));
  add(7,
    scene('m:I work on Monday and Tuesday. I do not work on Sunday. I drink tea, but I do not drink coffee. My sister lives in Berlin.',`Erster genannter Arbeitstag|Monday|Wednesday|Sunday
Tag ohne Arbeit|Sunday|Monday|Tuesday
Getränk der Person|tea|coffee|milk
Wohnort der Schwester|Berlin|London|Halifax`),
    scene('f:I do not work on Saturday. I work on Friday. I study English on Monday. I do not drink coffee.',`An welchem Tag arbeitet die Person nicht? Englisch.|Saturday|Friday|Monday
An welchem Tag arbeitet sie? Englisch.|Friday|Sunday|Thursday
An welchem Tag lernt sie Englisch? Englisch.|Monday|Tuesday|Wednesday
Welches Getränk trinkt sie nicht?|coffee|tea|water`),
    scene('m:My brother does not live in London. He lives in Halifax. He works on Tuesday. He studies English on Thursday. He does not work on Sunday.',`In welcher Stadt wohnt die Person?|Halifax|London|Berlin
Welcher Arbeitstag wird genannt? Englisch.|Tuesday|Thursday|Sunday
An welchem Tag lernt sie Englisch? Englisch.|Thursday|Tuesday|Friday
An welchem Tag arbeitet sie nicht?|Sunday|Monday|Tuesday`));
  add(8,
    scene('f:This bag is blue. It is small. These keys are new. Those shirts are white.',`Farbe der Tasche|blue|green|black
Größe der Tasche|small|big|long
Zustand der Schlüssel|new|old|small
Farbe der Hemden|white|blue|black`),
    scene('m:That table is big. It is white. These chairs are red. This phone is old.',`Welche Größe hat der Tisch? Englisch.|big|small|short
Welche Farbe hat der Tisch? Englisch.|white|black|blue
Welche Farbe haben die Stühle? Englisch.|red|green|white
Wie wird das Telefon beschrieben?|old|new|big`),
    scene('f:This shirt is green. It is small. Those bags are black. These books are new.',`Welche Farbe hat das Hemd? Englisch.|green|blue|white
Welche Größe hat das Hemd? Englisch.|small|big|long
Welche Farbe haben die Taschen? Englisch.|black|blue|red
Wie werden die Bücher beschrieben?|new|old|big`));
  add(9,
    scene('m:Our flat has two bedrooms. The kitchen is next to the bathroom. My phone is on the table. My bag is under the bed.',`Anzahl der Schlafzimmer|2|3|1
Raum neben der Küche|bathroom|bedroom|living room
Ort des Telefons|on the table|under the table|on the bed
Ort der Tasche|under the bed|on the bed|under the table`),
    scene('f:There are three rooms in our flat. The bathroom is next to the bedroom. The keys are on the chair. The bag is behind the door.',`Wie viele Zimmer gibt es? Ziffern.|3|2|4|number
Welcher Raum liegt neben dem Badezimmer? Englisch.|bedroom~the bedroom|kitchen|living room
Wo liegen die Schlüssel? Englisch.|on the chair~chair|under the chair|on the table
Wo liegt die Tasche?|behind the door|in front of the door|under the bed`),
    scene('m:There is one bedroom. The kitchen is opposite the bathroom. The phone is under the chair. The books are on the table.',`Wie viele Schlafzimmer gibt es? Ziffern.|1|2|3|number
Welcher Raum liegt gegenüber der Küche? Englisch.|bathroom~the bathroom|bedroom|living room
Wo ist das Telefon? Englisch.|under the chair|on the chair|under the bed
Wo sind die Bücher?|on the table|under the table|on the chair`));
  add(10,
    scene('f:Our appointment is on Thursday, not Tuesday. It is at half past nine. We meet at the office. The course starts in May.',`Tag des Termins|Thursday|Tuesday|Friday
Uhrzeit des Termins|9:30|8:30|9:15
Treffpunkt|office|station|café
Monat des Kursbeginns|May|March|June`),
    scene('m:We meet on Tuesday at quarter past ten. The appointment is at the station. The course starts in September.',`An welchem Tag ist das Treffen? Englisch.|Tuesday|Thursday|Wednesday
Um wie viel Uhr? Format 10:15.|10:15~quarter past ten~ten fifteen|10:45|9:15|time
Wo ist der Treffpunkt? Englisch.|station~the station~at the station|office|café
In welchem Monat beginnt der Kurs?|September|November|December`),
    scene('f:Our appointment is on Friday at quarter to six. We meet at the café. My course starts in April.',`An welchem Tag ist der Termin? Englisch.|Friday|Thursday|Saturday
Um wie viel Uhr? Gemeint ist 17:45 Uhr, Format 17:45.|17:45~5:45~quarter to six~five forty-five|18:15|16:45|time
Wo ist der Treffpunkt? Englisch.|café~cafe~the café~the cafe|office|station
In welchem Monat beginnt der Kurs?|April|August|March`));
  add(11,
    scene('m:I play tennis twice a week. I swim on Sunday. I never drink coffee. I sometimes go to the cinema.',`Tennis pro Woche|twice|once|three times
Tag fürs Schwimmen|Sunday|Saturday|Monday
Kaffee: Häufigkeit|never|often|always
Kino: Häufigkeit|sometimes|always|never`),
    scene('f:I swim once a week, on Friday. I often cook at home. I never play football.',`Wie oft pro Woche schwimmt die Person? Englisch.|once~once a week|twice|three times
An welchem Tag schwimmt sie? Englisch.|Friday|Thursday|Saturday
Wo kocht sie oft? Englisch.|at home~home|at work|at a café
Welche Aktivität macht sie nie?|play football|play tennis|swim`),
    scene('m:I visit my parents twice a week. They live in Berlin. I go there on Tuesday and Saturday. I always go with my sister.',`Wie oft pro Woche besucht die Person ihre Eltern? Englisch.|twice~twice a week|once|three times
In welcher Stadt wohnen die Eltern?|Berlin|London|Halifax
Welcher zweite Besuchstag wird genannt? Englisch.|Saturday|Sunday|Thursday
Mit wem geht die Person immer? Englisch.|sister~my sister~her sister~his sister|brother|mother`));
  add(12,
    scene('f:I can swim, but I cannot drive. My brother can drive. Can you help me with this suitcase? Can I sit here?',`Fähigkeit der sprechenden Person|swim|drive|sing
Was kann sie nicht?|drive|swim|cook
Gegenstand bei der Bitte um Hilfe|suitcase|phone|ticket
Erlaubnisfrage|sit here|use a phone|open a window`),
    scene('m:I can cook, but I cannot sing. My sister can sing. Please help me with this bag. Can I use your phone?',`Was kann die sprechende Person? Englisch.|cook|sing|drive
Was kann sie nicht? Englisch.|sing|cook|swim
Wobei braucht sie Hilfe? Gegenstand auf Englisch.|bag~a bag~this bag|suitcase|ticket
Worum bittet sie am Ende?|use the phone|open the door|sit here`),
    scene('f:I can drive, but I cannot dance. My brother can dance. Can you open the window, please? I cannot carry this suitcase.',`Was kann die sprechende Person? Englisch.|drive|dance|sing
Was kann sie nicht? Englisch.|dance|drive|cook
Was soll geöffnet werden? Englisch.|window~the window|door|bag
Was kann sie nicht tragen?|suitcase|phone|book`));
  add(13,
    scene('m:We need two bottles of milk and a kilo of potatoes. We have some eggs. We do not have any rice.',`Milch: Anzahl Flaschen|2|3|1
Kartoffeln: Menge in Kilo|1|2|3
Schon vorhanden|eggs|rice|milk
Nicht vorhanden|rice|eggs|potatoes`),
    scene('f:Please buy three bottles of water and two kilos of tomatoes. We have some cheese, but we do not have any bread.',`Wie viele Flaschen Wasser? Ziffern.|3|2|4|number
Wie viele Kilo Tomaten? Ziffern.|2|3|1|number
Was ist schon da? Lebensmittel auf Englisch.|cheese~some cheese|bread|rice
Was fehlt?|bread|cheese|tomatoes`),
    scene('m:I need six eggs and one bottle of milk. There are some apples, but there is no rice.',`Wie viele Eier? Ziffern.|6|5|8|number
Wie viele Flaschen Milch? Ziffern.|1|2|3|number
Welches Obst ist schon da? Englisch.|apples~some apples|bananas|oranges
Was fehlt?|rice|milk|eggs`));
  add(14,
    scene('f:I would like soup without meat. I would also like a glass of water. The soup is six pounds. I can pay by card.',`Bestelltes Essen|soup|salad|sandwich
Nicht gewünschte Zutat|meat|fish|cheese
Getränk|water|tea|coffee
Preis der Suppe in Pfund|6|8|5`),
    scene('m:I would like a sandwich with cheese. I would like tea, not coffee. The sandwich is four pounds fifty. I can pay in cash.',`Was wird bestellt? Essen auf Englisch.|sandwich~a sandwich|salad|soup
Welche Zutat ist im Essen? Englisch.|cheese|meat|fish
Wie viel kostet das Essen in Pfund? Format 4.50.|4.50~4,50|4.15|5.40|number
Was wird getrunken?|tea|coffee|water`),
    scene('f:I would like a salad without tomatoes. I would like a coffee. The salad is eight pounds. I can pay by card.',`Was wird bestellt? Essen auf Englisch.|salad~a salad|sandwich|soup
Welche Zutat wird nicht gewünscht? Englisch.|tomatoes|potatoes|cheese
Wie viel kostet das Essen in Pfund? Ziffern.|8|6|18|number
Wie wird bezahlt?|by card|in cash|by phone`));
  add(15,
    scene('m:I would like a blue jacket in size twelve. The blue jacket is thirty pounds. The red jacket is twenty pounds, but it is too small.',`Gewünschte Farbe|blue|red|black
Gewünschte Größe|12|10|20
Preis der gewünschten Jacke in Pfund|30|13|20
Problem bei der anderen Jacke|too small|too big|too expensive`),
    scene('f:I would like black shoes in size six. These shoes are forty pounds. Those shoes are cheaper, but they are too big.',`Welche Farbe wird gewünscht? Englisch.|black|blue|white
Welche Größe? Ziffern.|6|7|8|number
Wie viel kostet das passende Paar in Pfund? Ziffern.|40|14|30|number
Was ist das Problem beim anderen Paar?|too big|too small|too expensive`),
    scene('m:I need a warm coat. The green coat is fifty pounds. It is warmer than the blue coat. I would like the green one in size ten.',`Welche Farbe hat der gewünschte Mantel? Englisch.|green|blue|black
Wie viel kostet er in Pfund? Ziffern.|50|15|40|number
Welche Größe wird gewünscht? Ziffern.|10|12|8|number
Warum wird dieser Mantel gewählt?|warmer|cheaper|smaller`));
  add(16,
    scene('f:Go straight on and turn right at the traffic lights. The station is on the left. Take bus eight to the airport. The train leaves from platform three.',`Abbiegerichtung an der Ampel|right|left|straight on
Seite des Bahnhofs|left|right|opposite
Busnummer zum Flughafen|8|18|3
Bahnsteig des Zuges|3|8|2`),
    scene('m:Turn left after the shop. The café is on the right. Take bus thirteen to the station. The train leaves from platform five.',`In welche Richtung wird abgebogen? Englisch.|left|right|straight on
Auf welcher Seite ist das Café? Englisch.|right|left|opposite
Welche Busnummer? Ziffern.|13|30|3|number
Welcher Bahnsteig?|5|3|4|number`),
    scene('f:Take bus twenty-one. Get off at the second stop. Turn right at the school. The airport bus leaves at half past nine.',`Welche Busnummer wird zuerst genannt? Ziffern.|21|12|31|number
An welcher Haltestelle aussteigen? Englisch.|second~the second|first|third
In welche Richtung an der Schule? Englisch.|right|left|straight on
Wann fährt der Flughafenbus? Format 9:30.|9:30~09:30~half past nine~nine thirty|8:30|9:15|time`));
  add(17,
    scene('m:I am waiting for the train. Anna is writing an email. Ben is talking on the phone. We are not working now.',`Worauf wird gewartet?|train|bus|taxi
Tätigkeit der zweiten Person|writing an email|reading a book|cooking dinner
Tätigkeit der dritten Person|talking on the phone|writing a message|watching television
Arbeiten die Personen gerade?|no|yes|only one`),
    scene('f:I am cooking dinner. My brother is cleaning the kitchen. My sister is writing a message. It is raining outside.',`Welche Mahlzeit wird zubereitet? Englisch.|dinner|breakfast|lunch
Welcher Raum wird geputzt? Englisch.|kitchen~the kitchen|bedroom|bathroom
Was wird geschrieben? Englisch.|message~a message|email|book
Wie ist das Wetter gerade?|raining|snowing|sunny`),
    scene('m:I am reading a book. My friend is wearing a green shirt. She is waiting for the bus. My parents are watching television.',`Was liest die sprechende Person? Englisch.|book~a book|email|message
Welche Farbe hat das Hemd? Englisch.|green|blue|red
Worauf wartet die andere Person? Englisch.|bus~the bus|train|taxi
Was machen die Eltern?|watching television|cooking dinner|cleaning the kitchen`));
  add(18,
    scene('f:I usually work at home. Today I am working in the office. I drink tea every morning, but now I am drinking water.',`Üblicher Arbeitsort|at home|in the office|in a shop
Heutiger Arbeitsort|in the office|at home|in a café
Übliches Getränk|tea|coffee|water
Aktuelles Getränk|water|tea|coffee`),
    scene('m:I usually go to work by bus. Today I am walking. I normally drink coffee, but right now I am drinking tea.',`Übliches Verkehrsmittel? Englisch.|bus~by bus|train|car
Wie ist die Person heute unterwegs? Englisch.|walking~on foot|by bus|by train
Übliches Getränk? Englisch.|coffee|tea|water
Aktuelles Getränk?|tea|coffee|water`),
    scene('f:I usually read in the evening. Right now I am writing an email. I know the address, but I need the phone number.',`Übliche Abendaktivität? Englisch.|read~reading|watch television|cook
Was schreibt die Person jetzt? Englisch.|email~an email|message|book
Welche Kontaktangabe kennt sie schon? Englisch.|address~the address|phone number|postcode
Welche Kontaktangabe braucht sie?|phone number|address|postcode`));
  add(19,
    scene('m:It is cold and windy today. The blue coat is the warmest. The black coat is the cheapest. I like the blue one best.',`Temperatur|cold|warm|hot
Weitere Wetterbeschreibung|windy|sunny|dry
Wärmster Mantel|blue|black|red
Günstigster Mantel|black|blue|green`),
    scene('f:It is sunny and hot. The hotel near the beach is the most expensive. The hotel near the station is the cheapest. I like the cheapest hotel best.',`Wie ist die Temperatur? Englisch.|hot|cold|warm
Wie ist das Wetter außerdem? Englisch.|sunny|windy|cloudy
Wo ist das teuerste Hotel? Englisch.|near the beach~the beach~beach|near the station|near the airport
Welches Hotel wird gewählt?|the cheapest|the most expensive|the biggest`),
    scene('m:It is snowing today. This is the coldest day this week. The red room is the smallest. The green room is the warmest.',`Was passiert beim Wetter? Englisch.|snowing~it is snowing|raining|dry
Wie wird der Tag im Wochenvergleich beschrieben? Englisch.|coldest~the coldest|warmest|hottest
Welche Farbe hat das kleinste Zimmer? Englisch.|red|green|blue
Welche Farbe hat das wärmste Zimmer?|green|red|blue`));
  add(20,
    scene('f:I have got a headache. My appointment is at ten. I must wait in the small room. I must not use my phone here.',`Beschwerde|headache|stomach ache|cold
Uhrzeit des Termins|10:00|12:00|9:00
Warteort|small room|kitchen|outside
Verbot|use the phone|drink water|sit here`),
    scene('m:I have got a cold. My appointment is at quarter past eleven. The doctor is in room three. I must wait outside the room.',`Welche Beschwerde? Englisch.|cold~a cold|headache|stomach ache
Wann ist der Termin? Format 11:15.|11:15~quarter past eleven~eleven fifteen|11:45|10:15|time
Welche Raumnummer? Ziffern.|3|2|4|number
Wo muss die Person warten?|outside the room|inside the room|in the kitchen`),
    scene('f:My son has got a stomach ache. His appointment is on Thursday at half past two. We must wait in room five. We must not eat here.',`Welche Beschwerde? Englisch.|stomach ache~a stomach ache~stomachache|cold|headache
An welchem Tag ist der Termin? Englisch.|Thursday|Tuesday|Friday
Welche Raumnummer? Ziffern.|5|3|4|number
Was ist verboten?|eat here|sit here|wait here`));
  add(21,
    scene('m:I was in London last week. The weather was cold. There was a café near the hotel. There were two beds in my room.',`Stadt des Aufenthalts|London|Berlin|Halifax
Wetter|cold|warm|hot
Ort in der Nähe des Hotels|café|school|hospital
Anzahl der Betten|2|1|3`),
    scene('f:I was in Berlin yesterday. I was at my sister’s house. She was tired. There were three people in the house.',`In welcher Stadt war die Person?|Berlin|London|Halifax
Bei welchem Familienmitglied war sie? Englisch.|sister~my sister~her sister|brother|mother
Wie ging es dem Familienmitglied? Englisch.|tired|hungry|happy
Wie viele Personen waren im Haus?|3|2|4|number`),
    scene('m:We were in Halifax last month. The weather was sunny. Our hotel was near the station. There were four chairs in our room.',`In welcher Stadt waren die Personen?|Halifax|Berlin|London
Wie war das Wetter? Englisch.|sunny|cold|rainy
In der Nähe welches Ortes war das Hotel? Englisch.|station~the station|beach|airport
Wie viele Stühle waren im Zimmer?|4|3|2|number`));
  add(22,
    scene('f:On Saturday I visited my parents. We went to the beach. We ate fish. I did not work on Sunday.',`Tag des Besuchs|Saturday|Sunday|Friday
Ausflugsziel|beach|park|cinema
Essen|fish|meat|soup
Tag ohne Arbeit|Sunday|Saturday|Monday`),
    scene('m:Yesterday I went to London. I bought a jacket. I had lunch at one. In the evening I called my sister.',`In welche Stadt fuhr die Person?|London|Berlin|Halifax
Was kaufte sie? Englisch.|jacket~a jacket|coat|shirt
Um wie viel Uhr aß sie zu Mittag? Format 13:00.|13:00~1:00~one~one o'clock|12:00|14:00|time
Wen rief sie an?|sister|brother|father`),
    scene('f:Last Sunday I stayed at home. I cleaned the kitchen. I cooked soup. I did not watch television. I called my mother.',`Wo war die Person? Englisch.|at home~home|at work|at the beach
Welchen Raum putzte sie? Englisch.|kitchen~the kitchen|bathroom|bedroom
Was kochte sie? Englisch.|soup~some soup|rice|fish
Wen rief sie an?|mother|father|sister`));
  add(23,
    scene('m:Would you like to go to the cinema on Friday? Let’s meet at half past six at the station. Anna cannot come, but Ben can.',`Vorgeschlagene Aktivität|cinema|tennis|dinner
Tag|Friday|Thursday|Saturday
Uhrzeit|6:30|5:30|6:15
Treffpunkt|station|café|office`),
    scene('f:Let’s cook dinner on Saturday. We can meet at seven at my house. I would like to make soup.',`An welchem Tag ist das Treffen? Englisch.|Saturday|Sunday|Friday
Um wie viel Uhr? Gemeint ist abends. Format 19:00.|19:00~7:00~seven~seven o'clock|18:00|20:00|time
Wo ist das Treffen? Englisch.|at my house~my house~house~at her house|at the station|at the café
Was möchte die Person kochen?|soup|fish|rice`),
    scene('m:I can’t come on Tuesday. Wednesday is good for me. Let’s meet at quarter past five at the café. We can go to the park after that.',`An welchem Tag kann die Person kommen? Englisch.|Wednesday|Tuesday|Thursday
Um wie viel Uhr? Gemeint ist nachmittags. Format 17:15.|17:15~5:15~quarter past five~five fifteen|17:45|16:15|time
Wo ist der Treffpunkt? Englisch.|café~cafe~the café~the cafe|station|office
Wohin geht es danach?|park|cinema|beach`));
  add(24,
    scene('f:I have got a reservation for a single room. My arrival is on Friday at six. I am staying for two nights. Is breakfast included?',`Zimmerart|single room|double room|two rooms
Ankunftstag|Friday|Thursday|Saturday
Ankunftszeit|6:00|7:00|5:00
Anzahl der Nächte|2|3|1`),
    scene('m:I would like a double room for three nights. My arrival is on Monday at half past four. My surname is Hill: H, I, L, L.',`Welche Zimmerart? Englisch.|double room~a double room|single room|two single rooms
Wie viele Nächte? Ziffern.|3|2|4|number
An welchem Tag ist die Ankunft? Englisch.|Monday|Tuesday|Sunday
Wie lautet der buchstabierte Nachname?|Hill|Hall|Bell`),
    scene('f:My name is Anna Bell. Bell: B, E, L, L. My phone number is five, five, five, zero, one, four, eight. My postcode is B, three, J, two, K, nine. I would like a single room for one night.',`Wie lautet der Nachname?|Bell|Hill|Hall
Wie lautet die Telefonnummer? Ziffern.|5550148|5550418|5550149|phone
Wie lautet die Postleitzahl?|B3J2K9~B3J 2K9|B3J2K8|B2J3K9|code
Wie viele Nächte werden gewünscht?|1|2|3|number`));
  // The normal section mixes conversations with short personal announcements.
  // Each question uses structures already introduced by its lesson.
  const openings={
    3:'How old are you?',7:'When do you work?',8:'Is this your bag?',
    9:'Where are the keys?',10:'What time is our appointment?',
    11:'How often do you play tennis?',12:'Can you swim?',13:'What do you need?',
    14:'What would you like?',15:'Can I help you?',16:'Where is the station?',
    17:'What are you doing?',18:'Where do you usually work?',
    19:'What is the weather like?',20:'Have you got an appointment?',
    21:'Where were you last week?',22:'What did you do last weekend?',
    23:'Would you like to go to the cinema?',24:'Have you got a reservation?'
  };
  for(const [id,text]of Object.entries(openings)){
    const turns=bank[id][0].turns,gender=turns[0].gender==='female'?'male':'female';
    turns.unshift({speaker:gender==='female'?'F':'M',gender,text});
  }
  bank[1][0].turns=[
    {speaker:'F',gender:'female',text:'Hello! My name is Anna. I am from Germany. I am in London.'},
    {speaker:'M',gender:'male',text:'Hello! My name is Tom. I am from Canada.'}
  ];
  bank[1][0].fields.forEach((f,i)=>f.label=['Name der ersten Person','Herkunftsland der ersten Person','Stadt der ersten Person','Herkunftsland der zweiten Person'][i]);
  window.EN_A1_LISTENING=bank;
})();
