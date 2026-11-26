/* Independent reading material: notices, messages, forms and short descriptions. */
(() => {
  const rows=[
    ['Hello! My name is Leo. I am from Germany. I am in London. Mia is from Canada.','Nom|Leo|Ben|Tom','Origine de la première personne|Germany|Canada|England'],
    ['First name: Mia. Surname: Hill. Country: Canada. City: Halifax.','Nom de famille|Hill|Hall|Bell','Ville|Halifax|London|Berlin'],
    ['My name is Tom. I am fifty years old. My number is sixteen. Two phones are in my bag.','Âge|50|15|5','Numéro|16|60|6'],
    ['My mother is Anna. She has a cat. My father has a dog. My sister is twelve.','Animal de la mère|cat|dog|fish','Âge de la sœur|12|20|21'],
    ['We live in Halifax. We work at home. We study German together. We drink water.','Lieu d’habitation|Halifax|London|Berlin','Langue apprise|German|English|French'],
    ['Mia works in a school. She teaches German. She starts early and has dinner at home.','Langue enseignée|German|English|French','Où dîne-t-elle ?|at home|at school|at a café'],
    ["I work on Wednesday. I don't work on Thursday. I study English on Friday.",'Jour de travail|Wednesday|Thursday|Friday','Jour d’étude|Friday|Wednesday|Thursday'],
    ['These bags are red. Those shirts are blue. This phone is new. That chair is old.','Couleur des sacs|red|blue|green','État du téléphone|new|old|small'],
    ['There are three bedrooms. The kitchen is next to the living room. The keys are under the table.','Chambres|3|2|4','Emplacement des clés|under the table|on the table|under the bed'],
    ['Appointment: Wednesday, at quarter to three. Month: June. Place: office.','Jour|Wednesday|Tuesday|Thursday','Heure|14:45|15:15|13:45'],
    ['I cook every day. I play tennis once a week. I never go to the cinema.','Tennis par semaine|once|twice|every day','Cinéma : fréquence|never|sometimes|often'],
    ["I can sing, but I can't dance. Can you help me with this bag? Please close the window.",'Capacité|sing|dance|drive','Qu’est-ce qu’il faut fermer ?|window|door|bag'],
    ["Shopping: four eggs, two kilos of apples, one bottle of milk. We don't need any bread.",'Œufs|4|2|6','Pas nécessaire|bread|milk|apples'],
    ['Menu: soup £5; salad £7; sandwich £4. Water £2. Tea £3. Pay by card or in cash.','Prix de la salade|£7|£5|£4','Prix de l’eau|£2|£3|£5'],
    ['The black coat is £45. The blue coat is £35. The blue coat is smaller. Sizes: 8, 10, 12.','Couleur la moins chère|blue|black|red','Couleur la plus petite|blue|black|green'],
    ['Bus 18: station to airport. Leaves at 9:15. Get off at the third stop.','Numéro du bus|18|8|13','Arrêt où descendre|third|second|first'],
    ["Hi! I am waiting at the café. I am wearing a white shirt. Ben is reading a book. We aren't working.",'Couleur de la chemise|white|blue|green','Activité de la deuxième personne|reading|writing|cooking'],
    ['I usually walk to work. Today I am taking the train. I need a new ticket.','Moyen de transport utilisé aujourd’hui|train|bus|car','De quoi a-t-on besoin ?|ticket|phone|bag'],
    ['It is warm and sunny. The blue room is the cheapest. The red room is the biggest.','Couleur de la chambre la moins chère|blue|red|green','Couleur de la plus grande chambre|red|blue|black'],
    ["Reception: Please wait in room four. You mustn't use your phone. Your appointment is at 10:45.",'Salle d’attente|4|3|5','Heure|10:45|10:15|11:45'],
    ['Last week we were in a village. There was a small shop. There were three rooms in our house.','Lieu|village|city|beach','Nombre de pièces|3|2|4'],
    ["Yesterday I went to the park. I bought a sandwich and drank tea. I didn't visit my parents.",'Destination|park|beach|station','Boisson|tea|coffee|water'],
    ["Hi Mia! I can't meet on Friday. Let's meet on Saturday at seven at the cinema. Leo.",'Nouveau jour|Saturday|Friday|Sunday','Lieu de rendez-vous|cinema|café|station'],
    ['Reservation confirmed: double room, four nights. Arrival: Thursday at 17:30. Breakfast included.','Nuits|4|3|2','Heure d’arrivée|17:30|16:30|17:15']
  ];
  window.EN_A1_READING=rows.map(([text,...fields],i)=>({id:i+1,text,fields:fields.map(s=>{const[q,a,b,c]=s.split('|');return{q,answer:a,o:[a,b,c]};})}));
})();
