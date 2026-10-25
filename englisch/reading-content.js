/* Independent reading material: notices, messages, forms and short descriptions. */
(() => {
  const rows=[
    ['Hello! My name is Leo. I am from Germany. I am in London. Mia is from Canada.','Name|Leo|Ben|Tom','Herkunft der ersten Person|Germany|Canada|England'],
    ['First name: Mia. Surname: Hill. Country: Canada. City: Halifax.','Nachname|Hill|Hall|Bell','Stadt|Halifax|London|Berlin'],
    ['My name is Tom. I am fifty years old. My number is sixteen. Two phones are in my bag.','Alter|50|15|5','Nummer|16|60|6'],
    ['My mother is Anna. She has a cat. My father has a dog. My sister is twelve.','Tier der Mutter|cat|dog|fish','Alter der Schwester|12|20|21'],
    ['We live in Halifax. We work at home. We study German together. We drink water.','Wohnort|Halifax|London|Berlin','Gelernte Sprache|German|English|French'],
    ['Mia works in a school. She teaches German. She starts early and has dinner at home.','Unterrichtssprache|German|English|French','Wo isst sie zu Abend?|at home|at school|at a café'],
    ["I work on Wednesday. I don't work on Thursday. I study English on Friday.",'Arbeitstag|Wednesday|Thursday|Friday','Lerntag|Friday|Wednesday|Thursday'],
    ['These bags are red. Those shirts are blue. This phone is new. That chair is old.','Farbe der Taschen|red|blue|green','Zustand des Telefons|new|old|small'],
    ['There are three bedrooms. The kitchen is next to the living room. The keys are under the table.','Schlafzimmer|3|2|4','Ort der Schlüssel|under the table|on the table|under the bed'],
    ['Appointment: Wednesday, 16 June, at quarter to three. Place: office.','Tag|Wednesday|Tuesday|Thursday','Uhrzeit|14:45|15:15|13:45'],
    ['I cook every day. I play tennis once a week. I never go to the cinema.','Tennis pro Woche|once|twice|every day','Kino: Häufigkeit|never|sometimes|often'],
    ["I can sing, but I can't dance. Can you help me with this bag? Please close the window.",'Fähigkeit|sing|dance|drive','Was soll geschlossen werden?|window|door|bag'],
    ["Shopping: four eggs, two kilos of apples, one bottle of milk. We don't need any bread.",'Eier|4|2|6','Nicht benötigt|bread|milk|apples'],
    ['Menu: soup £5; salad £7; sandwich £4. Water £2. Tea £3. Pay by card or in cash.','Preis des Salats|£7|£5|£4','Preis des Wassers|£2|£3|£5'],
    ['The black coat is £45. The blue coat is £35. The blue coat is smaller. Sizes: 8, 10, 12.','Günstigere Farbe|blue|black|red','Kleinere Farbe|blue|black|green'],
    ['Bus 18: station to airport. Leaves at 9:15. Get off at the third stop.','Busnummer|18|8|13','Haltestelle zum Aussteigen|third|second|first'],
    ["Hi! I am waiting at the café. I am wearing a white shirt. Ben is reading a book. We aren't working.",'Farbe des Hemds|white|blue|green','Aktivität der zweiten Person|reading|writing|cooking'],
    ['I usually walk to work. Today I am taking the train. I need a new ticket.','Heute genutztes Verkehrsmittel|train|bus|car','Was wird gebraucht?|ticket|phone|bag'],
    ['It is warm and sunny. The blue room is the cheapest. The red room is the biggest.','Günstigste Zimmerfarbe|blue|red|green','Größte Zimmerfarbe|red|blue|black'],
    ["Reception: Please wait in room four. You mustn't use your phone. Your appointment is at 10:45.",'Warteraum|4|3|5','Uhrzeit|10:45|10:15|11:45'],
    ['Last week we were in a village. There was a small shop. There were three rooms in our house.','Ort|village|city|beach','Zimmerzahl|3|2|4'],
    ["Yesterday I went to the park. I bought a sandwich and drank tea. I didn't visit my parents.",'Ziel|park|beach|station','Getränk|tea|coffee|water'],
    ["Hi Mia! I can't meet on Friday. Let's meet on Saturday at seven at the cinema. Leo.",'Neuer Tag|Saturday|Friday|Sunday','Treffpunkt|cinema|café|station'],
    ['Reservation confirmed: double room, four nights. Arrival: Thursday at 17:30. Breakfast included.','Nächte|4|3|2','Ankunftszeit|17:30|16:30|17:15']
  ];
  window.EN_A1_READING=rows.map(([text,...fields],i)=>({id:i+1,text,fields:fields.map(s=>{const[q,a,b,c]=s.split('|');return{q,answer:a,o:[a,b,c]};})}));
})();
