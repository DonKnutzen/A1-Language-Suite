(() => {
  'use strict';
  const {add,topic}=window.EN_A1_AUTHORING;
  add(13,'Essen & Einkaufen',
    ['Lebensmittel und Mengen nennen','Zählbare und nicht zählbare Nomen unterscheiden','Some und any verwenden'],
    'food=Essen;milk=Milch;rice=Reis;cheese=Käse;meat=Fleisch;fish=Fisch;vegetable=Gemüse (einzelne Sorte / Stück);potato=Kartoffel;egg=Ei;tomato=Tomate;banana=Banane;some=etwas / einige;any=etwas / welche (Fragen und Verneinungen);bottle=Flasche;glass=Glas;cup=Tasse;kilo=Kilo;litre=Liter;need=brauchen;buy=kaufen;shopping=Einkaufen',
    `I need some milk.|Ich brauche etwas Milch.|Ich brauche etwas Reis.|Ich habe etwas Milch.
Do you have any eggs?|Hast du Eier?|Hast du Milch?|Brauchst du Eier?
We don't have any rice.|Wir haben keinen Reis.|Wir brauchen keinen Reis.|Wir haben etwas Reis.
Two bottles of water, please.|Zwei Flaschen Wasser, bitte.|Zwei Gläser Wasser, bitte.|Eine Flasche Wasser, bitte.
A kilo of potatoes.|Ein Kilo Kartoffeln.|Ein Kilo Tomaten.|Zwei Kilo Kartoffeln.
I eat fish and vegetables.|Ich esse Fisch und Gemüse.|Ich esse Fleisch und Gemüse.|Ich kaufe Fisch und Gemüse.
There is some cheese.|Es gibt etwas Käse.|Es gibt keinen Käse.|Es gibt etwas Fleisch.
There are some tomatoes.|Es gibt einige Tomaten.|Es gibt einige Kartoffeln.|Es gibt keine Tomaten.
A cup of tea.|Eine Tasse Tee.|Ein Glas Tee.|Eine Tasse Kaffee.
I don't eat meat.|Ich esse kein Fleisch.|Ich esse keinen Fisch.|Ich kaufe kein Fleisch.`,
    [topic('Zählbar oder nicht zählbar','Zählbare Nomen haben Einzahl und Mehrzahl: an egg, two eggs. Milk, water, rice und bread gelten in der üblichen Lebensmittelbedeutung als nicht zählbar: kein a milk oder two rices. Zum Zählen brauchst du eine Einheit: a bottle of milk, two cups of tea. Some milk steht mit is, some eggs mit are.',
      `an egg / two eggs|ein Ei / zwei Eier
some rice|etwas Reis
two bottles of water|zwei Flaschen Wasser`,
      `I need two ___.|eggs|egg|egges|Ich brauche zwei Eier.
There ___ some milk.|is|are|am|Es gibt etwas Milch.
There ___ some eggs.|are|is|am|Es gibt einige Eier.
Two bottles ___ water.|of|for|at|Zwei Flaschen Wasser.
A cup ___ tea.|of|on|in|Eine Tasse Tee.
I need ___ apple.|an|a|two|Ich brauche einen Apfel.
We need some ___.|rice|rices|a rice|Wir brauchen etwas Reis.
Two ___ of milk.|litres|litre|milks|Zwei Liter Milch.
I need ___ egg.|an|a|some eggs|Ich brauche ein Ei.
Three ___ of tea.|cups|cup|teas of cups|Drei Tassen Tee.
There ___ some cheese.|is|are|am|Es gibt etwas Käse.
There ___ some bananas.|are|is|am|Es gibt einige Bananen.
Four glasses ___ water.|of|at|on|Vier Gläser Wasser.
We buy two ___.|tomatoes|tomatos|tomato|Wir kaufen zwei Tomaten.
I need a bottle ___ milk.|of|in|on|Ich brauche eine Flasche Milch.
She eats some ___.|bread|breads|a bread|Sie isst etwas Brot.`),
    topic('Some und any','In bejahten Aussagen steht meistens some. In neutralen Fragen und Verneinungen steht meistens any. Das gilt für nicht zählbare Nomen und Mehrzahl: some milk, any eggs. Nicht beide Wörter gleichzeitig. Bei Angeboten und Bitten kann some auch in Fragen stehen; solche höflichen Muster lernst du in der nächsten Lektion.',
      `We have some eggs.|Wir haben einige Eier.
Do you have any milk?|Hast du Milch?
We don't have any rice.|Wir haben keinen Reis.`,
      `We have ___ milk.|some|a|an|Wir haben etwas Milch.
We don't have ___ milk.|any|a|an|Wir haben keine Milch.
Do you have ___ eggs?|any|a|an|Hast du Eier? Neutrale Frage.
There are ___ tomatoes.|some|a|an|Es gibt einige Tomaten.
There aren't ___ potatoes.|any|a|an|Es gibt keine Kartoffeln.
Is there ___ cheese?|any|a|an|Gibt es Käse? Neutrale Frage.
I need ___ rice.|some|a|an|Ich brauche etwas Reis.
He doesn't eat ___ meat.|any|a|an|Er isst kein Fleisch.
Are there ___ bananas?|any|a|an|Gibt es Bananen? Neutrale Frage.
She buys ___ vegetables.|some|a|an|Sie kauft etwas Gemüse.
There is ___ bread.|some|a|an|Es gibt etwas Brot.
We don't need ___ water.|any|a|an|Wir brauchen kein Wasser.
Does she have ___ oranges?|any|a|an|Hat sie Orangen? Neutrale Frage.
They buy ___ fish.|some|a|an|Sie kaufen etwas Fisch zum Essen.
There isn't ___ tea.|any|a|an|Es gibt keinen Tee.
I have ___ apples.|some|a|an|Ich habe einige Äpfel.`)],
    'Schreibe eine Einkaufsliste als kurze Nachricht. Nenne Lebensmittel, eine Menge und etwas, das fehlt.',
    ['Nenne drei Lebensmittel.','Nenne eine Menge mit einer Einheit.','Sage, was nicht vorhanden ist.'],
    "We need some milk, rice and eggs. Please buy two bottles of water and a kilo of potatoes. We don't have any cheese. Do we have any tomatoes?",
    'We need {some|etwas} milk. There {are|be: Mehrzahl} some eggs, but there {is|be: nicht zählbar} no rice. We do not have {any|welche: Verneinung} tomatoes. Please buy two bottles {of|Flaschen von} water and three {cups|cup: Mehrzahl} of tea. I need {an|ein: egg} egg and {some|etwas: bread} bread.',
    `Du brauchst zwei Flaschen Wasser.|I need two bottles of water.|I need two glasses of water.|I need a bottle of water.
Du sagst, dass kein Reis da ist.|We don't have any rice.|We don't need any rice.|We have some rice.
Du fragst neutral nach Eiern.|Do you have any eggs?|Do you need any eggs?|Do you have any milk?
Du nennst ein Kilo Tomaten.|A kilo of tomatoes.|A kilo of potatoes.|Two kilos of tomatoes.`);
  add(14,'Im Café & Restaurant',
    ['Eine Bestellung höflich formulieren','Mit how much und how many nach Mengen fragen','Preise und die Rechnung verstehen'],
    'would like=möchte (höflich);menu=Speisekarte;bill=Rechnung;order=bestellen;restaurant=Restaurant;café=Café;soup=Suppe;salad=Salat;sandwich=Sandwich;chicken=Hähnchen;dessert=Nachspeise;without=ohne;with=mit;how much=wie viel;how many=wie viele;pound=Pfund (Währung);euro=Euro;dollar=Dollar;cost=kosten;pay=bezahlen;cash=Bargeld;lunch=Mittagessen',
    `I'd like a coffee, please.|Ich hätte gern einen Kaffee.|Ich hätte gern einen Tee.|Ich mag Kaffee.
Would you like some water?|Möchtest du etwas Wasser?|Trinkst du manchmal Wasser?|Brauchst du kein Wasser?
How much is the soup?|Wie viel kostet die Suppe?|Wie viel Suppe gibt es?|Wie viel kostet der Salat?
How many sandwiches do you need?|Wie viele Sandwiches brauchst du?|Wie viele Sandwiches hast du?|Wie viel Brot brauchst du?
Without meat, please.|Ohne Fleisch, bitte.|Mit Fleisch, bitte.|Ohne Fisch, bitte.
The bill, please.|Die Rechnung, bitte.|Die Speisekarte, bitte.|Die Bestellung, bitte.
Can I have the menu, please?|Kann ich bitte die Speisekarte haben?|Kann ich bitte die Rechnung haben?|Kann ich bitte bestellen?
It is twelve pounds.|Es kostet zwölf Pfund.|Es kostet zwanzig Pfund.|Es kostet zwölf Euro.
I'd like some soup.|Ich hätte gern etwas Suppe.|Ich mag Suppe.|Ich hätte gern etwas Salat.
Can I pay by card?|Kann ich mit Karte bezahlen?|Kann ich bar bezahlen?|Kann ich später bezahlen?`,
    [topic('Would like für Wünsche','I would like oder I’d like bedeutet ich möchte / ich hätte gern. Es ist eine höfliche Bestellung. I like beschreibt dagegen eine allgemeine Vorliebe. Would bleibt für alle Personen gleich. Fragen beginnen mit Would: Would you like …? Bei Angeboten ist some üblich: Would you like some tea?',
      `I'd like a sandwich, please.|Ich hätte gern ein Sandwich.
I like sandwiches.|Ich mag Sandwiches allgemein.
Would you like some tea?|Möchtest du etwas Tee?`,
      `I ___ like a coffee.|would|am|do|Ich hätte gern einen Kaffee.
She would ___ a salad.|like|likes|to like|Sie hätte gern einen Salat.
___ you like some tea?|Would|Do|Are|Möchtest du etwas Tee? Höfliches Angebot.
I'd ___ some soup.|like|likes|to like|Ich hätte gern etwas Suppe.
He ___ like a sandwich.|would|woulds|is would|Er hätte gern ein Sandwich.
I ___ tea.|like|would like|am like|Ich mag Tee allgemein.
We ___ like the bill, please.|would|are|do|Wir hätten gern die Rechnung.
Would she ___ some water?|like|likes|to like|Möchte sie etwas Wasser?
I ___ like meat in my soup.|wouldn't|don't would|am not would|Ich möchte kein Fleisch in meiner Suppe. Wouldn't = would not.
They would ___ two coffees.|like|likes|to like|Sie hätten gern zwei Kaffee. Hier: zwei Tassen Kaffee.
Mia ___ like a dessert.|would|woulds|is|Mia hätte gern eine Nachspeise.
___ you like a sandwich?|Would|Are|Have|Möchtest du ein Sandwich? Höfliches Angebot.
Leo would ___ some rice.|like|likes|to like|Leo hätte gern etwas Reis.
I ___ coffee.|like|would like|am like|Ich mag Kaffee im Allgemeinen.
We'd ___ the menu, please.|like|likes|to like|Wir hätten gern die Speisekarte.
Would your friends ___ some soup?|like|likes|to like|Möchten deine Freunde etwas Suppe?`),
    topic('How much und how many','How many steht vor zählbarer Mehrzahl: How many eggs? How much steht vor nicht zählbaren Nomen: How much water? Für Preise: How much is it? / How much are they? Two coffees bedeutet im Café zwei Tassen Kaffee. Card = Karte; cash = Bargeld.',
      `How many sandwiches?|Wie viele Sandwiches?
How much water?|Wie viel Wasser?
How much is the salad?|Wie viel kostet der Salat?`,
      `How ___ sandwiches do you need?|many|much|any|Wie viele Sandwiches brauchst du?
How ___ water do you drink?|much|many|some|Wie viel Wasser trinkst du?
How ___ is the soup?|much|many|any|Wie viel kostet die Suppe?
How much ___ the sandwich?|is|are|do|Wie viel kostet das Sandwich?
How much ___ the two salads?|are|is|does|Wie viel kosten die zwei Salate?
How ___ eggs do we need?|many|much|some|Wie viele Eier brauchen wir?
How ___ rice is there?|much|many|any|Wie viel Reis gibt es?
How ___ cups do you need?|many|much|any|Wie viele Tassen brauchst du?
How ___ milk is there?|much|many|some|Wie viel Milch gibt es?
How much ___ it cost?|does|do|is|Wie viel kostet es?
How ___ bottles do we need?|many|much|any|Wie viele Flaschen brauchen wir?
How ___ cheese do you want?|much|many|some|Wie viel Käse möchtest du? Want = wollen.
How much ___ the desserts?|are|is|does|Wie viel kosten die Nachspeisen?
How ___ bread is there?|much|many|any|Wie viel Brot gibt es?
How ___ tomatoes does she need?|many|much|some|Wie viele Tomaten braucht sie?
How much ___ the sandwich cost?|does|do|is|Wie viel kostet das Sandwich?`)],
    'Bestelle ein Essen und ein Getränk. Nenne einen Wunsch und frage nach dem Preis oder der Rechnung.',
    ['Bestelle mit would like.','Nenne einen Wunsch mit with oder without.','Frage nach Preis oder Rechnung.'],
    "Hello! I'd like some soup without meat and a sandwich, please. I'd also like a glass of water. How much is the soup? Can I pay by card?",
    'I {would|höflicher Wunsch} like a sandwich. My friend would {like|Grundform} some soup. How {much|Preis} is the soup? How {many|zählbare Mehrzahl} sandwiches do we need? We would like two glasses {of|Gläser von} water. The soup is {without|ohne} meat. Can I {pay|bezahlen} by card? The {bill|Rechnung}, please.',
    `Du bestellst höflich einen Tee.|I'd like a tea, please.|I like tea.|Would you like a tea?
Du möchtest die Rechnung.|The bill, please.|The menu, please.|The soup, please.
Du fragst nach dem Preis von zwei Salaten.|How much are the two salads?|How many salads are there?|How much is one salad?
Du möchtest eine Suppe ohne Fleisch.|I'd like soup without meat.|I'd like soup with meat.|I'd like soup without fish.`);
  add(15,'Kleidung & Vergleiche',
    ['Nach Größe und Preis fragen','Kurze Adjektive steigern','More und unregelmäßige Vergleiche verwenden'],
    'clothes=Kleidung;trousers=Hose;shoes=Schuhe;coat=Mantel;jacket=Jacke;dress=Kleid;size=Größe;cheap=günstig;expensive=teuer;long=lang;short=kurz;warm=warm;cold=kalt;good=gut;bad=schlecht;better=besser;worse=schlechter;than=als (Vergleich);try on=anprobieren;cash=Bargeld',
    `Do you have this in size ten?|Haben Sie das in Größe zehn?|Haben Sie das in Größe zwölf?|Haben Sie zehn davon?
Can I try this on?|Kann ich das anprobieren?|Kann ich das kaufen?|Kann ich das zurückbringen?
This coat is cheaper.|Dieser Mantel ist günstiger.|Dieser Mantel ist teurer.|Diese Jacke ist günstiger.
Those shoes are more expensive.|Jene Schuhe sind teurer.|Jene Schuhe sind günstiger.|Dieser Schuh ist teurer.
This jacket is warmer than that one.|Diese Jacke ist wärmer als jene.|Diese Jacke ist kälter als jene.|Dieser Mantel ist wärmer als jener.
The blue shirt is smaller.|Das blaue Hemd ist kleiner.|Das blaue Hemd ist größer.|Das grüne Hemd ist kleiner.
This size is better.|Diese Größe ist besser.|Diese Größe ist schlechter.|Diese Farbe ist besser.
It is too big.|Es ist zu groß.|Es ist zu klein.|Es ist groß genug.
I'd like the smaller one.|Ich hätte gern das kleinere.|Ich hätte gern das größere.|Ich hätte gern das günstigere.
I can pay in cash.|Ich kann bar bezahlen.|Ich kann mit Karte bezahlen.|Ich kann nicht bar bezahlen.`,
    [topic('Kurze Adjektive: -er und than','Für einen Vergleich bekommt ein kurzes Adjektiv meistens -er: small → smaller, cheap → cheaper. Nach End-e nur -r: large → larger. Bei kurzem betontem Vokal + Endkonsonant wird der Konsonant oft verdoppelt: big → bigger. Konsonant + y wird -ier: happy → happier. Than bedeutet als. Kein more zusammen mit -er.',
      `This bag is smaller than that bag.|Diese Tasche ist kleiner als jene.
The red coat is cheaper.|Der rote Mantel ist günstiger.
This room is bigger.|Dieses Zimmer ist größer.`,
      `This bag is ___ than that bag.|smaller|small|more small|Diese Tasche ist kleiner als jene.
The red coat is ___.|cheaper|cheap|more cheap|Der rote Mantel ist günstiger.
This room is ___.|bigger|biger|more big|Dieses Zimmer ist größer.
The jacket is ___ than the shirt.|warmer|warm|more warm|Die Jacke ist wärmer als das Hemd.
This dress is ___.|longer|long|more long|Dieses Kleid ist länger.
These trousers are ___.|shorter|short|more short|Diese Hose ist kürzer.
This room is larger ___ that room.|than|then|as|Dieses Zimmer ist größer als jenes Zimmer.
The water is ___.|colder|cold|more cold|Das Wasser ist kälter.
This house is ___.|older|old|more old|Dieses Haus ist älter.
The shirt is ___.|newer|new|more new|Das Hemd ist neuer.
This chair is ___ than that chair.|smaller|small|more small|Dieser Stuhl ist kleiner als jener.
The blue bag is ___.|bigger|biger|more big|Die blaue Tasche ist größer.
These shoes are ___.|cheaper|cheap|more cheap|Diese Schuhe sind günstiger.
This coat is ___ than my coat.|warmer|warm|more warm|Dieser Mantel ist wärmer als mein Mantel.
Her jacket is ___.|longer|long|more long|Ihre Jacke ist länger.
This phone is newer ___ my phone.|than|then|as|Dieses Telefon ist neuer als mein Telefon.`),
    topic('More, better und worse','Längere Adjektive bilden den Vergleich meistens mit more: expensive → more expensive. Good wird better, bad wird worse. Diese Formen nicht mit more kombinieren. Too heißt zu: too big = zu groß. One kann ein bereits genanntes Nomen ersetzen: the smaller one = das kleinere Exemplar.',
      `This coat is more expensive.|Dieser Mantel ist teurer.
This size is better.|Diese Größe ist besser.
I'd like the smaller one.|Ich hätte gern das kleinere Exemplar.`,
      `This coat is ___ expensive.|more|most|very more|Dieser Mantel ist teurer.
This size is ___.|better|gooder|more good|Diese Größe ist besser.
That phone is ___.|worse|badder|more bad|Jenes Telefon ist schlechter.
These shoes are ___ expensive than those.|more|most|expensiver|Diese Schuhe sind teurer als jene.
This coat is ___ big.|too|two|to|Dieser Mantel ist zu groß.
I'd like the smaller ___.|one|ones|a|Ich hätte gern das kleinere Exemplar.
The blue shirt is ___ than the red shirt.|better|gooder|more better|Das blaue Hemd ist besser als das rote.
This jacket is more expensive ___ that coat.|than|then|as|Diese Jacke ist teurer als jener Mantel.
These trousers are ___ short.|too|to|two|Diese Hose ist zu kurz.
That bag is ___ than this bag.|worse|more worse|badder|Jene Tasche ist schlechter als diese.
Her dress is ___ expensive.|more|most|expensiver|Ihr Kleid ist teurer.
These shoes are ___ than my shoes.|better|more better|gooder|Diese Schuhe sind besser als meine.
This size is ___ small.|too|to|two|Diese Größe ist zu klein.
The red phone is ___.|worse|more worse|badder|Das rote Telefon ist schlechter.
I'd like the cheaper ___.|one|ones|a|Ich hätte gern das günstigere Exemplar.
Their coats are more expensive ___ ours.|than|then|as|Ihre Mäntel sind teurer als unsere. Ours = unsere.`)],
    'Vergleiche zwei Kleidungsstücke. Nenne Größe oder Farbe und frage nach Preis oder Anprobe.',
    ['Nenne die gewünschten Kleidungsstücke.','Formuliere einen Vergleich.','Frage nach Preis oder Anprobe.'],
    "I'd like a blue jacket in size ten. This jacket is warmer than the red jacket, but it is more expensive. Can I try it on? How much is it?",
    'This coat is {cheaper|cheap: Vergleich} than that coat. The blue jacket is {warmer|warm: Vergleich}. These shoes are {more|Vergleich vor expensive} expensive. This size is {better|good: Vergleich}. That shirt is {too|zu} small. I would like the smaller {one|Exemplar}. This bag is bigger {than|als} my bag. That phone is {worse|bad: Vergleich}.',
    `Du möchtest eine Jacke anprobieren.|Can I try this jacket on?|Can I buy this jacket?|Can I wash this jacket?
Du möchtest die günstigeren Schuhe.|I'd like the cheaper shoes.|I'd like the more expensive shoes.|I'd like the smaller shoes.
Du fragst nach Größe zwölf.|Do you have this in size twelve?|Do you have twelve of these?|Do you have this in size twenty?
Du sagst, dass der Mantel zu klein ist.|This coat is too small.|This coat is smaller.|This coat is too big.`);
  add(16,'Unterwegs: Wege & Verkehr',
    ['Einfache Wegbeschreibungen geben','Aufforderungen und Verbote bilden','Verkehrsmittel und Haltestellen verstehen'],
    'station=Bahnhof;stop=Haltestelle;train=Zug;bus=Bus;airport=Flughafen;platform=Bahnsteig;street=Straße;left=links;right=rechts;straight on=geradeaus;turn=abbiegen;cross=überqueren;road=Straße;traffic lights=Ampel;next=nächster;first=erster;second=zweiter;third=dritter;on foot=zu Fuß;by bus=mit dem Bus;taxi=Taxi',
    `Go straight on.|Geh geradeaus.|Biege links ab.|Biege rechts ab.
Turn left at the traffic lights.|Biege an der Ampel links ab.|Biege an der Ampel rechts ab.|Gehe bis zur Ampel zurück.
Don't cross here.|Überquere hier nicht die Straße.|Überquere hier die Straße.|Warte hier nicht.
Take bus eight.|Nimm Bus acht.|Nimm Bus achtzehn.|Nimm Bus drei.
The train leaves at ten.|Der Zug fährt um zehn ab.|Der Zug kommt um zehn an.|Der Bus fährt um zehn ab.
Which platform?|Welcher Bahnsteig?|Welche Haltestelle?|Welche Straße?
The station is on the right.|Der Bahnhof ist rechts.|Der Bahnhof ist links.|Die Haltestelle ist rechts.
I go to work on foot.|Ich gehe zu Fuß zur Arbeit.|Ich fahre mit dem Bus zur Arbeit.|Ich fahre mit dem Zug zur Arbeit.
Get off at the next stop.|Steig an der nächsten Haltestelle aus.|Steig an der ersten Haltestelle ein.|Warte an der nächsten Haltestelle.
Is this bus for the airport?|Fährt dieser Bus zum Flughafen?|Fährt dieser Bus zum Bahnhof?|Ist das der Flughafen?`,
    [topic('Aufforderungen und Verbote','Für eine Aufforderung steht die Grundform ohne Subjekt: Go straight on. Ein Verbot beginnt mit don’t: Don’t cross here. Please macht die Aufforderung höflicher. Let’s + Grundform schlägt etwas Gemeinsames vor: Let’s take the bus. Get on = einsteigen, get off = aussteigen.',
      `Turn right, please.|Biege bitte rechts ab.
Don't cross here.|Überquere hier nicht die Straße.
Let's take the train.|Nehmen wir den Zug.`,
      `___ straight on.|Go|Goes|Going|Geh geradeaus.
___ left.|Turn|Turns|To turn|Biege links ab.
___ cross here.|Don't|Doesn't|Not|Überquere hier nicht die Straße.
___ bus eight.|Take|Takes|Taking|Nimm Bus acht.
___ at the station, please.|Wait|Waits|To wait|Warte bitte am Bahnhof.
Let's ___ the train.|take|takes|to take|Nehmen wir den Zug.
Don't ___ here.|sit|sits|to sit|Setz dich nicht hierhin.
___ off at the next stop.|Get|Gets|To get|Steig an der nächsten Haltestelle aus.
Don't ___ left.|turn|turns|to turn|Biege nicht links ab.
Let's ___ on foot.|go|goes|to go|Gehen wir zu Fuß.
___ right at the station.|Turn|Turns|To turn|Biege am Bahnhof rechts ab.
Don't ___ the road here.|cross|crosses|to cross|Überquere die Straße hier nicht.
___ the next bus.|Take|Takes|To take|Nimm den nächsten Bus.
Let's ___ here.|wait|waits|to wait|Warten wir hier.
___ on at this stop.|Get|Gets|To get|Steig an dieser Haltestelle ein.
Don't ___ the door.|open|opens|to open|Öffne die Tür nicht.`),
    topic('Ort, Richtung und Verkehrsmittel','To bezeichnet ein Ziel: go to the station. At bezeichnet einen Ort: wait at the station. Verkehrsmittel meist mit by ohne Artikel: by bus, by train; zu Fuß heißt on foot. Für Bahnsteige: from platform three. First/second/third benennen die Reihenfolge. Which fragt nach einer Auswahl.',
      `I go to work by bus.|Ich fahre mit dem Bus zur Arbeit.
Wait at the station.|Warte am Bahnhof.
The train leaves from platform three.|Der Zug fährt von Bahnsteig drei ab.`,
      `I go to work ___ bus.|by|on|at|Ich fahre mit dem Bus zur Arbeit.
We go ___ foot.|on|by|in|Wir gehen zu Fuß.
Go ___ the station.|to|at|on|Geh zum Bahnhof.
Wait ___ the station.|at|to|by|Warte am Bahnhof.
The train leaves ___ platform three.|from|to|on|Der Zug fährt von Bahnsteig drei ab.
The shop is on the ___.|right|straight|third|Der Laden ist rechts.
Take the ___ street on the left.|second|two|twice|Nimm die zweite Straße links.
I go ___ train.|by|on|at|Ich fahre mit dem Zug.
___ platform is it?|Which|Who|Why|Welcher Bahnsteig ist es?
Turn right ___ the traffic lights.|at|to|by|Biege an der Ampel rechts ab.
She goes to school ___ bus.|by|on|at|Sie fährt mit dem Bus zur Schule.
They go to the shop ___ foot.|on|by|in|Sie gehen zu Fuß zum Laden.
Come ___ the airport.|to|at|on|Komm zum Flughafen.
We are ___ the bus stop.|at|to|by|Wir sind an der Bushaltestelle.
The train leaves ___ platform five.|from|to|on|Der Zug fährt von Bahnsteig fünf ab.
Take the ___ street on the right.|third|three|thirty|Nimm die dritte Straße rechts.`)],
    'Erkläre den Weg vom Bahnhof zu einem Treffpunkt. Nenne zwei Richtungsangaben und eine Busnummer oder Gehzeit.',
    ['Nenne den Treffpunkt.','Gib zwei Anweisungen in Reihenfolge.','Nenne Verkehrsmittel oder Gehzeit.'],
    'The café is near the station. Go straight on and turn left at the traffic lights. The café is on the right. You can take bus eight or go on foot.',
    '{Go|gehen: Aufforderung} straight on. {Turn|abbiegen: Aufforderung} left at the traffic lights. Do not {cross|überqueren, Grundform} here. {Take|nehmen: Aufforderung} bus eight. Get {off|aussteigen: get …} at the next stop. We go {to|zum Ziel} the station. We can go {by|mit dem Bus} bus or {on|zu Fuß} foot.',
    `Du sagst: zweite Straße rechts.|Take the second street on the right.|Take the third street on the right.|Take the second street on the left.
Du möchtest die Bahnsteignummer wissen.|Which platform?|Which bus stop?|What time?
Du möchtest aussteigen lassen.|Get off at the next stop.|Get on at the next stop.|Wait at the next stop.
Du beschreibst einen Fußweg.|Go on foot.|Go by bus.|Go by train.`);
  add(17,'Was passiert gerade?',
    ['Laufende Tätigkeiten beschreiben','Present Continuous mit be + -ing bilden','Aktuelle Handlungen erfragen und verneinen'],
    'now=jetzt;at the moment=im Moment;write=schreiben;make=machen / herstellen;run=laufen;wear=tragen (Kleidung);talk=sprechen;wait for=warten auf;look at=ansehen;send=senden;message=Nachricht;email=E-Mail;picture=Bild;phone call=Telefonanruf;clean=putzen;rain=regnen;outside=draußen;inside=drinnen;busy=beschäftigt;right now=genau jetzt',
    `I am writing a message.|Ich schreibe gerade eine Nachricht.|Ich lese gerade eine Nachricht.|Ich schreibe jeden Tag Nachrichten.
She is making dinner.|Sie macht gerade Abendessen.|Sie isst gerade Abendessen.|Sie macht immer Abendessen.
They are waiting for the bus.|Sie warten gerade auf den Bus.|Sie fahren gerade mit dem Bus.|Sie warten gerade auf den Zug.
He is wearing a blue shirt.|Er trägt gerade ein blaues Hemd.|Er trägt gerade ein grünes Hemd.|Er kauft gerade ein blaues Hemd.
Are you working now?|Arbeitest du gerade?|Arbeitest du jeden Tag?|Arbeitet sie gerade?
I am not watching television.|Ich sehe gerade nicht fern.|Ich sehe nie fern.|Ich habe keinen Fernseher.
What are you doing?|Was machst du gerade?|Was machst du normalerweise?|Wo bist du gerade?
We are cleaning the kitchen.|Wir putzen gerade die Küche.|Wir putzen gerade das Badezimmer.|Wir kochen gerade in der Küche.
It is raining.|Es regnet gerade.|Es ist kalt.|Es regnet oft.
She is talking on the phone.|Sie telefoniert gerade.|Sie schreibt gerade auf dem Telefon.|Sie hört gerade Musik.`,
    [topic('Be + Verb mit -ing','Das Present Continuous beschreibt etwas, das gerade geschieht. Du brauchst am/is/are + -ing: I am working. Ein End-e fällt meist weg: write → writing, make → making. Bei run und sit wird der letzte Konsonant verdoppelt: running, sitting. Verwechsle dies nicht mit einer Gewohnheit im Present Simple.',
      `I am working now.|Ich arbeite gerade.
She is writing a message.|Sie schreibt gerade eine Nachricht.
They are running.|Sie laufen gerade.`,
      `I ___ writing a message.|am|is|are|Ich schreibe gerade eine Nachricht.
She ___ making dinner.|is|am|are|Sie macht gerade Abendessen.
They ___ waiting for the bus.|are|is|am|Sie warten gerade auf den Bus.
He is ___.|running|runing|runs|Er läuft gerade.
We are ___.|sitting|siting|sits|Wir sitzen gerade.
Anna is ___ an email.|writing|writeing|writes|Anna schreibt gerade eine E-Mail.
Ben is ___ dinner.|making|makeing|makes|Ben macht gerade Abendessen.
You ___ wearing a blue shirt.|are|am|is|Du trägst gerade ein blaues Hemd.
It ___ raining.|is|are|am|Es regnet gerade.
We are ___ the kitchen.|cleaning|cleanning|cleans|Wir putzen gerade die Küche.
Mia ___ talking on the phone.|is|are|am|Mia telefoniert gerade.
Leo and I ___ reading.|are|is|am|Leo und ich lesen gerade.
My sister is ___ outside.|running|runing|runs|Meine Schwester läuft gerade draußen.
They are ___ a message.|sending|sendding|sends|Sie senden gerade eine Nachricht.
He is ___ at the picture.|looking|lookking|looks|Er sieht sich gerade das Bild an.
I ___ waiting at the station.|am|are|is|Ich warte gerade am Bahnhof.`),
    topic('Fragen und Verneinungen im Continuous','Bei Fragen steht be vor dem Subjekt: Are you working? Das Verb behält -ing. Zum Verneinen steht not nach be: She isn’t working. Du benutzt dabei kein do/does. What are you doing? fragt nach der gerade ausgeführten Tätigkeit.',
      `Are you waiting?|Wartest du gerade?
She isn't working now.|Sie arbeitet gerade nicht.
What are they doing?|Was machen sie gerade?`,
      `___ you working now?|Are|Do|Does|Arbeitest du gerade?
___ she writing?|Is|Does|Do|Schreibt sie gerade?
What ___ they doing?|are|do|does|Was machen sie gerade?
He ___ not watching television.|is|does|do|Er sieht gerade nicht fern.
We ___ not waiting for the train.|are|do|does|Wir warten gerade nicht auf den Zug.
Is Anna ___ dinner?|making|make|makes|Macht Anna gerade Abendessen?
Are they ___ the kitchen?|cleaning|clean|cleans|Putzen sie gerade die Küche?
Is he reading? Yes, he ___.|is|does|are|Ja, er liest gerade.
Are you working? No, I ___ not.|am|do|are|Nein, ich arbeite gerade nicht.
She ___ wearing a coat.|isn't|doesn't|don't|Sie trägt gerade keinen Mantel.
___ Leo talking on the phone?|Is|Does|Do|Telefoniert Leo gerade?
What ___ Mia writing?|is|does|do|Was schreibt Mia gerade?
They ___ not running.|are|do|does|Sie laufen gerade nicht.
Are we waiting here? Yes, we ___.|are|do|is|Ja, wir warten gerade hier.
Is she swimming? No, she ___.|isn't|doesn't|don't|Nein, sie schwimmt gerade nicht.
Why ___ you sitting here?|are|do|does|Warum sitzt du gerade hier?`)],
    'Beschreibe, was du und zwei andere Personen gerade tun. Stelle eine Frage zu einer aktuellen Tätigkeit.',
    ['Beschreibe deine aktuelle Tätigkeit.','Beschreibe zwei andere Personen.','Stelle eine Frage mit be + -ing.'],
    'I am waiting for the bus. Anna is writing a message. Ben is talking on the phone. We are not working now. What are you doing? Are you coming here?',
    'I {am|be: I} waiting for the bus. Anna {is|be: she} writing a message. Ben and Tom {are|be: they} talking. My sister is {making|make: -ing} dinner. I am not {watching|watch: -ing} television. {Are|Frage: you} you working? What is Emma {doing|do: -ing}? She is {running|run: -ing} in the park.',
    `Du fragst nach einer aktuellen Tätigkeit.|What are you doing?|What do you do on Sunday?|Where do you work?
Ben telefoniert gerade.|Ben is talking on the phone.|Ben talks on the phone every day.|Ben is writing a message.
Du wartest gerade auf den Zug.|I am waiting for the train.|I am waiting for the bus.|I wait for the train every day.
Du sagst, dass Anna gerade nicht arbeitet.|Anna isn't working now.|Anna doesn't work on Monday.|Anna isn't at work every day.`);
  add(18,'Gewohnheit oder gerade jetzt?',
    ['Present Simple und Continuous unterscheiden','Zeitangaben als Hilfe nutzen','Like, want und need einfach verwenden'],
    'usually=normalerweise;every morning=jeden Morgen;right now=genau jetzt;at the moment=im Moment;want=wollen;need=brauchen;know=wissen / kennen;understand=verstehen;believe=glauben;remember=sich erinnern;prefer=bevorzugen;different=anders;same=gleich;each=jeder;this week=diese Woche;every week=jede Woche;break=Pause;tonight=heute Abend;normally=normalerweise;again=noch einmal',
    `I usually work at home.|Ich arbeite normalerweise zu Hause.|Ich arbeite gerade zu Hause.|Ich arbeite nie zu Hause.
Today I am working in the office.|Heute arbeite ich gerade im Büro.|Heute arbeite ich nicht im Büro.|Ich arbeite jeden Tag im Büro.
She drinks tea every morning.|Sie trinkt jeden Morgen Tee.|Sie trinkt gerade Tee.|Sie trinkt jeden Abend Tee.
She is drinking coffee now.|Sie trinkt gerade Kaffee.|Sie trinkt immer Kaffee.|Sie trinkt gerade Tee.
I like this book.|Ich mag dieses Buch.|Ich lese dieses Buch gerade.|Ich brauche dieses Buch.
I don't understand.|Ich verstehe nicht.|Ich weiß nicht.|Ich erinnere mich nicht.
Do you know her name?|Kennst du ihren Namen?|Kennst du seinen Namen?|Verstehst du ihren Namen?
We need a break.|Wir brauchen eine Pause.|Wir machen gerade eine Pause.|Wir wollen keine Pause.
What do you want?|Was möchtest du?|Was brauchst du?|Was weißt du?
He is wearing a coat today.|Er trägt heute gerade einen Mantel.|Er trägt immer einen Mantel.|Er kauft heute einen Mantel.`,
    [topic('Gewohnheit und laufende Handlung','Present Simple beschreibt Gewohnheiten: every day, usually, often. Present Continuous beschreibt laufende oder vorübergehende Handlungen: now, at the moment. Eine Zeitangabe allein ist keine starre Regel; lies die Situation. I work here heißt ich arbeite hier grundsätzlich, I am working heißt ich bin gerade am Arbeiten.',
      `I read every evening.|Ich lese jeden Abend.
I am reading now.|Ich lese gerade.
She usually walks, but today she is taking the bus.|Sie geht normalerweise zu Fuß, nimmt heute aber gerade den Bus.`,
      `I ___ at home every day.|work|am working|working|Meine normale tägliche Arbeit ist zu Hause.
I ___ in the office right now.|am working|work|works|Ich bin gerade jetzt im Büro am Arbeiten.
She ___ tea every morning.|drinks|is drinking|drink|Das ist ihre tägliche Gewohnheit.
She ___ coffee at the moment.|is drinking|drinks|drink|Sie ist gerade jetzt beim Kaffeetrinken.
They ___ on Sundays.|swim|are swimming|swims|Das ist ihre regelmäßige Sonntagsaktivität.
They ___ in the park now.|are running|run|runs|Sie sind gerade jetzt am Laufen.
He usually ___ to work.|walks|is walking|walk|Das ist sein normaler Arbeitsweg.
He ___ the bus right now.|is taking|takes|take|Er steigt gerade in den Bus und fährt damit.
We ___ books every evening.|read|are reading|reads|Das ist unsere regelmäßige Abendaktivität.
We ___ television at the moment.|are watching|watch|watches|Wir sehen gerade jetzt fern.
Mia ___ in a shop every Saturday.|works|is working|work|Das ist Mias regelmäßiger Samstagsjob.
Leo ___ dinner right now.|is making|makes|make|Leo bereitet gerade jetzt Abendessen zu.
My parents usually ___ tea.|drink|are drinking|drinks|Das ist ihre normale Gewohnheit.
Our daughter ___ an email now.|is writing|writes|write|Sie ist gerade jetzt am Schreiben.
Ben often ___ his friends.|visits|is visiting|visit|Ben besucht regelmäßig seine Freunde.
Anna ___ for the train at the moment.|is waiting|waits|wait|Anna wartet gerade jetzt auf den Zug.`),
    topic('Zustände: like, know, want und need','Einige häufige Verben beschreiben Zustände, Wünsche oder Wissen. In ihrer gewöhnlichen A1-Bedeutung nutzt du meist das Present Simple: I like it, I know, I want water, I need help. Auch wenn der Wunsch jetzt besteht: I need help, nicht I am needing help. He/she/it behält -s; Fragen und Verneinungen verwenden do/does.',
      `I need help now.|Ich brauche jetzt Hilfe.
She knows my name.|Sie kennt meinen Namen.
Do you understand?|Verstehst du?`,
      `I ___ this book.|like|am liking|likes|Ich mag dieses Buch.
She ___ your name.|knows|is knowing|know|Sie kennt deinen Namen.
I ___ some water now.|want|am wanting|wants|Ich möchte jetzt etwas Wasser.
We ___ help.|need|are needing|needs|Wir brauchen Hilfe.
___ you understand?|Do|Are|Does|Verstehst du?
He ___ know her name.|doesn't|isn't|don't|Er kennt ihren Namen nicht.
She ___ a break.|needs|is needing|need|Sie braucht eine Pause.
I ___ remember.|don't|am not|doesn't|Ich erinnere mich nicht.
___ she like coffee?|Does|Is|Do|Mag sie Kaffee?
They ___ tea.|prefer|are preferring|prefers|Sie bevorzugen Tee.
Mia ___ this colour.|likes|is liking|like|Mia mag diese Farbe.
Leo ___ a new phone.|wants|is wanting|want|Leo möchte ein neues Telefon.
We ___ the question.|understand|are understanding|understands|Wir verstehen die Frage.
Does your sister ___ his name?|know|knows|knowing|Kennt deine Schwester seinen Namen?
I ___ a ticket now.|need|am needing|needs|Ich brauche jetzt eine Fahrkarte.
They ___ want coffee.|don't|aren't|doesn't|Sie möchten keinen Kaffee.`)],
    'Vergleiche deinen normalen Alltag mit dem, was du gerade machst. Nenne auch einen Wunsch oder Bedarf.',
    ['Nenne eine normale Gewohnheit.','Beschreibe eine aktuelle Handlung.','Sage, was du brauchst oder möchtest.'],
    'I usually work at home, but today I am working in the office. I drink tea every morning. Right now I am drinking water. I need a break. What are you doing?',
    'I usually {work|arbeiten, Gewohnheit} at home. Today I {am|be: I} working in an office. Anna {drinks|trinken: she, Gewohnheit} tea every morning. She is {drinking|drink: -ing} coffee now. I {like|mögen, Zustand} coffee. We {need|brauchen, Zustand} a break. Ben {knows|wissen: he} my name. Do you {understand|verstehen, Grundform}?',
    `Du fragst nach einer regelmäßigen Tätigkeit.|What do you do on Sundays?|What are you doing now?|Where are you right now?
Du brauchst jetzt Hilfe.|I need help now.|I am helping now.|I need to help him now.
Du beschreibst dein übliches Getränk.|I usually drink tea.|I am drinking tea now.|I don't drink tea.
Du beschreibst Bens aktuelle Tätigkeit.|Ben is writing an email now.|Ben writes emails every day.|Ben likes writing emails.`);
})();
