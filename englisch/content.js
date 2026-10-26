/* Original adult A1 course. German is the explanation language; English is the target.
 * Topic rows 1–10 are practice; rows 11–16 are independent transfer questions.
 * Every contrast is authored. No arbitrary words are used as distractors. */
(() => {
  'use strict';
  const lessons=[];
  const lines=s=>s.trim().split('\n').map(s=>s.trim()).filter(Boolean).map(s=>s.split('|'));
  const words=s=>s.split(';').map(s=>s.trim().split('=')).filter(p=>p.length===2);
  const topic=(title,rule,examples,rows)=>({title,rule,examples:lines(examples),rows:lines(rows)});
  function add(id,title,goals,vocabulary,phrases,topics,situation,points,model,cloze,contexts){
    lessons.push({id,title,topic:title,skills:['Hören','Sprechen','Lesen','Schreiben'],goals,
      vocabulary:words(vocabulary),phraseRows:lines(phrases),phrases:lines(phrases).map(p=>p.slice(0,2)),topics,
      transfer:{speaking:situation,writing:'Schreibe '+(id<4?'15–25':'25–40')+' Wörter. '+situation},points,model,cloze,contexts:lines(contexts)});
  }
  add(1,'Hallo! Ich stelle mich vor',
    ['Begrüßen und sich verabschieden','Name, Herkunft und Wohnort nennen','I, you, he, she und die Formen von be verstehen'],
    'hello=hallo;good morning=guten Morgen;good evening=guten Abend;goodbye=auf Wiedersehen;name=Name;first name=Vorname;from=aus;Germany=Deutschland;Canada=Kanada;English=Englisch;German=Deutsch;I=ich;you=du / ihr / Sie;he=er;she=sie (Einzahl);we=wir;they=sie (Mehrzahl);be=sein;in=in;and=und',
    `Hello!|Hallo!|Auf Wiedersehen!|Gute Nacht!
Good morning!|Guten Morgen!|Guten Abend!|Gute Nacht!
Good evening!|Guten Abend!|Guten Morgen!|Bis morgen!
My name is Anna.|Ich heiße Anna.|Sie heißt Anna.|Mein Name ist Emma.
I am from Germany.|Ich komme aus Deutschland.|Ich bin in Deutschland.|Ich komme aus Kanada.
I am in London.|Ich bin in London.|Ich komme aus London.|Sie ist in London.
You are Tom.|Du bist Tom.|Er ist Tom.|Wir sind Tom und Anna.
She is from Canada.|Sie kommt aus Kanada.|Er kommt aus Kanada.|Sie kommt aus Deutschland.
We are Anna and Tom.|Wir sind Anna und Tom.|Sie sind Anna und Tom.|Ihr seid Anna und Tom.
Goodbye!|Auf Wiedersehen!|Guten Abend!|Guten Morgen!`,
    [topic('Personalpronomen','I steht immer groß. You bedeutet du, ihr oder Sie; die Situation zeigt, wer gemeint ist. He = er, she = sie (eine Person), it = es. We = wir, they = sie (mehrere Personen). Im Englischen braucht ein Aussagesatz normalerweise ein Subjekt. In My name is … bedeutet my name „mein Name“; die Besitzwörter lernst du in Lektion 4 genauer.',
      `I am Anna.|Ich bin Anna.
She is Emma.|Sie ist Emma.
They are Tom and Emma.|Sie sind Tom und Emma.`,
      `___ am Anna.|I|You|She|Ich bin Anna.
___ are Tom.|You|He|I|Du bist Tom.
___ is Emma.|She|He|They|Sie ist Emma.
___ is Ben.|He|She|We|Er ist Ben.
___ are Anna and Tom.|We|I|He|Wir sind Anna und Tom.
___ are Ben and Emma.|They|She|He|Sie sind Ben und Emma.
___ am from Germany.|I|He|We|Ich komme aus Deutschland.
___ is from Canada.|She|They|I|Sie kommt aus Kanada.
___ are in London.|We|He|She|Wir sind in London.
___ is in Berlin.|He|We|They|Er ist in Berlin.
___ am Mia.|I|They|He|Ich bin Mia.
___ is Leo.|He|We|They|Er ist Leo.
___ are Mia and Leo.|They|She|He|Sie sind Mia und Leo.
___ are in Canada.|You|He|I|Ihr seid in Kanada.
___ is in Germany.|She|I|They|Sie ist in Deutschland.
___ are from London.|We|He|She|Wir kommen aus London.`),
    topic('Be: am, is und are','Be ist unregelmäßig: I am; you are; he/she/it is; we are; they are. Die Kurzformen sind I’m, you’re, he’s, she’s, it’s, we’re und they’re. Hier übst du die ausgeschriebenen Formen.',
      `I am from Germany.|Ich komme aus Deutschland.
He is Tom.|Er ist Tom.
We are in Canada.|Wir sind in Kanada.`,
      `I ___ Anna.|am|is|are|Ich bin Anna.
You ___ Tom.|are|am|is|Du bist Tom.
He ___ Ben.|is|are|am|Er ist Ben.
She ___ Emma.|is|am|are|Sie ist Emma.
We ___ in London.|are|is|am|Wir sind in London.
They ___ in Berlin.|are|am|is|Sie sind in Berlin.
I ___ from Canada.|am|are|is|Ich komme aus Kanada.
You ___ from Germany.|are|is|am|Sie kommen aus Deutschland.
Anna ___ in Canada.|is|are|am|Anna ist in Kanada.
Tom and Anna ___ in London.|are|is|am|Tom und Anna sind in London.
Mia ___ from Germany.|is|are|am|Mia kommt aus Deutschland.
Leo and I ___ in Berlin.|are|am|is|Leo und ich sind in Berlin.
I ___ Leo.|am|is|are|Ich bin Leo.
You ___ in Canada.|are|is|am|Ihr seid in Kanada.
They ___ from London.|are|am|is|Sie kommen aus London.
He ___ from Berlin.|is|am|are|Er kommt aus Berlin.`)],
    'Stelle dich mit Name, Herkunft und Wohnort vor. Du darfst Angaben erfinden.',
    ['Nenne deinen Namen.','Nenne dein Herkunftsland.','Nenne die Stadt, in der du bist.'],
    'Hello! My name is Anna. I am from Germany. I am in London. Tom is from Canada. We are in London. Goodbye!',
    'Hello! My name {is|Form von be} Anna. {I|ich} am from Germany. Tom {is|Form von be} from Canada. {He|er} is in London. Emma is in London. {She|sie, eine Person} is from Canada. Tom and I {are|Form von be} in London. {We|wir} are Anna and Tom. Emma and Ben are from Germany. {They|sie, mehrere Personen} are in Canada.',
    `Du begrüßt jemanden am Morgen.|Good morning!|Good evening!|Goodbye!
Du stellst dich als Ben vor.|My name is Ben.|My name is Anna.|He is Ben.
Du sagst, dass du aus Kanada kommst.|I am from Canada.|I am in Canada.|She is from Canada.
Du verabschiedest dich.|Goodbye!|Good morning!|Good evening!`);
  add(2,'Nachfragen & buchstabieren',
    ['Mit be Fragen stellen und verneinen','Name und Herkunft erfragen','Buchstaben verstehen und um Wiederholung bitten'],
    'what=was;where=wo / woher;not=nicht;yes=ja;no=nein;please=bitte;thank you=danke;sorry=Entschuldigung;spell=buchstabieren;repeat=wiederholen;slowly=langsam;letter=Buchstabe;surname=Nachname;again=noch einmal;correct=richtig;here=hier;there=dort;fine=gut (Befinden);how=wie;alphabet=Alphabet;country=Land;city=Stadt;address=Adresse',
    `What is your name?|Wie heißt du?|Wie geht es dir?|Wo bist du?
Where are you from?|Woher kommst du?|Wo bist du?|Wie heißt du?
Are you from Canada?|Kommst du aus Kanada?|Bist du in Kanada?|Kommt sie aus Kanada?
Yes, I am.|Ja, das bin ich.|Nein, das bin ich nicht.|Ja, das sind sie.
No, I am not.|Nein, das bin ich nicht.|Ja, das bin ich.|Nein, das ist er nicht.
I am not Tom.|Ich bin nicht Tom.|Er ist nicht Tom.|Ich bin Tom.
How are you?|Wie geht es dir?|Wie heißt du?|Wo bist du?
I am fine, thank you.|Mir geht es gut, danke.|Mir geht es nicht gut, danke.|Ihr geht es gut, danke.
Spell your name, please.|Buchstabiere bitte deinen Namen.|Wiederhole bitte deinen Namen.|Schreibe bitte deinen Namen.
Repeat, please.|Wiederhole bitte.|Buchstabiere bitte.|Langsamer, bitte.`,
    [topic('Fragen mit be','Bei Ja/Nein-Fragen steht am/is/are vor dem Subjekt: You are → Are you? Die kurze Antwort wiederholt be: Yes, I am. / No, I am not. Nach what und where folgt ebenfalls be vor dem Subjekt. What is your name? fragt nach dem Namen; Where are you from? nach der Herkunft. Your name = dein/Ihr Name, her name = ihr Name, his name = sein Name. Diese festen Wortgruppen helfen dir beim Nachfragen.',
      `Are you Anna?|Bist du Anna?
Is he from Canada?|Kommt er aus Kanada?
Where are you from?|Woher kommst du?`,
      `___ you Anna?|Are|Is|Am|Bist du Anna?
___ he Tom?|Is|Are|Am|Ist er Tom?
___ she from Canada?|Is|Am|Are|Kommt sie aus Kanada?
___ they in London?|Are|Is|Am|Sind sie in London?
___ I correct?|Am|Are|Is|Liege ich richtig?
What ___ your name?|is|are|am|Wie heißt du?
Where ___ you from?|are|is|am|Woher kommst du?
Are you Anna? Yes, I ___.|am|are|is|Ja, das bin ich.
Is he Tom? Yes, he ___.|is|are|am|Ja, das ist er.
Are they here? Yes, they ___.|are|is|am|Ja, sie sind hier.
___ Mia in Berlin?|Is|Are|Am|Ist Mia in Berlin?
Where ___ Leo from?|is|are|am|Woher kommt Leo?
___ we in London?|Are|Am|Is|Sind wir in London?
What ___ her name?|is|am|are|Wie heißt sie?
Is Anna here? No, she ___ not.|is|are|am|Nein, sie ist nicht hier.
Are you from London? No, I ___ not.|am|are|is|Nein, ich komme nicht aus London.`),
    topic('Verneinen und unterscheiden','Bei be steht not nach dem Verb: I am not; she is not; they are not. Is not kann isn’t heißen, are not kann aren’t heißen. I am not wird I’m not, niemals I amn’t. What = was, where = wo/woher und how = wie.',
      `She is not Anna.|Sie ist nicht Anna.
They are not from Germany.|Sie kommen nicht aus Deutschland.
How are you?|Wie geht es dir?`,
      `I am ___ Tom.|not|no|yes|Ich bin nicht Tom.
She ___ not from Canada.|is|are|am|Sie kommt nicht aus Kanada.
We ___ not in Berlin.|are|is|am|Wir sind nicht in Berlin.
He is not here. He ___ here.|isn't|aren't|am not|Er ist nicht hier. Verwende die Kurzform.
They are not here. They ___ here.|aren't|isn't|am not|Sie sind nicht hier. Verwende die Kurzform.
___ is your name?|What|Where|How|Wie heißt du?
___ are you from?|Where|What|How|Woher kommst du?
___ are you?|How|What|Where|Wie geht es dir?
I ___ not Anna.|am|is|are|Ich bin nicht Anna.
You ___ not Tom.|are|am|is|Du bist nicht Tom.
Leo ___ not from Germany.|is|are|am|Leo kommt nicht aus Deutschland.
Mia and I ___ not in Canada.|are|is|am|Mia und ich sind nicht in Kanada.
She is not Mia. She ___ Mia.|isn't|aren't|am not|Sie ist nicht Mia. Verwende die Kurzform.
We are not there. We ___ there.|aren't|isn't|am not|Wir sind nicht dort. Verwende die Kurzform.
___ is his name?|What|Where|How|Wie heißt er?
___ is Anna from?|Where|What|How|Woher kommt Anna?`)],
    'Stelle dich vor, buchstabiere deinen Nachnamen und frage die andere Person nach ihrem Namen.',
    ['Nenne deinen Vor- und Nachnamen.','Buchstabiere den Nachnamen.','Frage nach dem Namen der anderen Person.'],
    'Hello! My name is Ben Hill. Hill: H, I, L, L. I am from Canada. What is your name? Where are you from?',
    'Hello! {What|was} is your name? My name {is|Form von be} Emma. {Are|Frage mit be} you from Canada? No, I {am|Form von be} not. I am from Germany. {Where|woher} are you from? Tom is from Canada. He {is|Form von be} not from Germany. {How|wie} are you? I am fine, thank {you|Danke: thank …}.',
    `Du möchtest den Namen erfahren.|What is your name?|How are you?|Where are you from?
Du möchtest die Herkunft erfahren.|Where are you from?|Where are you?|What is your name?
Du hast den Namen nicht verstanden.|Repeat, please.|Goodbye, please.|Thank you, please.
Du fragst, ob Emma aus Kanada kommt.|Are you from Canada?|You are from Canada.|Where is Canada?`);
  add(3,'Zahlen & Dinge benennen',
    ['Zahlen bis 100 und das Alter verstehen','A und an nach dem Laut auswählen','Einzahl und Mehrzahl unterscheiden'],
    'zero=null;one=eins;two=zwei;three=drei;four=vier;five=fünf;six=sechs;seven=sieben;eight=acht;nine=neun;ten=zehn;eleven=elf;twelve=zwölf;thirteen=dreizehn;thirty=dreißig;hundred=hundert;year=Jahr;old=alt;book=Buch;phone=Telefon;apple=Apfel;orange=Orange;bag=Tasche;umbrella=Regenschirm;child=Kind;person=Person;sixteen=sechzehn;seventeen=siebzehn;eighteen=achtzehn;nineteen=neunzehn;twenty=zwanzig;forty=vierzig;fifty=fünfzig;sixty=sechzig;seventy=siebzig;eighty=achtzig;ninety=neunzig',
    `I am twenty years old.|Ich bin zwanzig Jahre alt.|Ich bin zwölf Jahre alt.|Er ist zwanzig Jahre alt.
She is thirty.|Sie ist dreißig.|Sie ist dreizehn.|Er ist dreißig.
Thirteen, fourteen, fifteen.|Dreizehn, vierzehn, fünfzehn.|Dreißig, vierzig, fünfzig.|Drei, vier, fünf.
Thirty, forty, fifty.|Dreißig, vierzig, fünfzig.|Dreizehn, vierzehn, fünfzehn.|Drei, vier, fünf.
This is a book.|Das ist ein Buch.|Das ist eine Tasche.|Das sind Bücher.
This is an apple.|Das ist ein Apfel.|Das ist eine Orange.|Das sind Äpfel.
Two books.|Zwei Bücher.|Zwölf Bücher.|Zwei Taschen.
Three children.|Drei Kinder.|Dreizehn Kinder.|Drei Personen.
My number is twenty-one.|Meine Nummer ist einundzwanzig.|Meine Nummer ist zwölf.|Meine Nummer ist einunddreißig.
How old are you?|Wie alt bist du?|Wie geht es dir?|Woher kommst du?`,
    [topic('A, an und Alter mit be','A und an bedeuten ein/eine. The bedeutet der/die/das und verweist auf etwas Bestimmtes. Wenn die deutsche Bedeutung ein/eine lautet, wählst du hier a oder an. Entscheidend ist der nächste Laut: a book, an apple, an umbrella. Vor einem gesprochenen Konsonanten steht a; vor einem gesprochenen Vokal an. Das Alter steht mit be: I am twenty, nicht I have twenty. One bis nine, ten bis nineteen und die Zehner werden getrennt geübt. This is … heißt „Das ist …“. Bei 21 bis 99 verbindet ein Bindestrich Zehner und Einer: twenty-one; one hundred bedeutet einhundert.',
      `a phone / an apple|ein Telefon / ein Apfel
I am twenty-one years old.|Ich bin einundzwanzig Jahre alt.
thirteen / thirty|dreizehn / dreißig`,
      `This is ___ book.|a|an|the|Das ist ein Buch.
This is ___ apple.|an|a|the|Das ist ein Apfel.
This is ___ phone.|a|an|the|Das ist ein Telefon.
This is ___ orange.|an|a|the|Das ist eine Orange.
This is ___ bag.|a|an|the|Das ist eine Tasche.
This is ___ umbrella.|an|a|the|Das ist ein Regenschirm.
I ___ twenty years old.|am|is|are|Ich bin zwanzig Jahre alt.
She ___ thirty years old.|is|am|are|Sie ist dreißig Jahre alt.
We ___ twenty-one.|are|am|is|Wir sind einundzwanzig.
He is ___.|thirteen|thirty|three|Er ist dreizehn.
This is ___ English book.|an|a|the|Das ist ein englisches Buch.
This is ___ German phone.|a|an|the|Das ist ein deutsches Telefon.
Mia ___ forty.|is|are|am|Mia ist vierzig.
Leo and Mia ___ thirty.|are|am|is|Leo und Mia sind dreißig.
My number is ___.|twenty-two|twelve|thirty-two|Meine Nummer ist zweiundzwanzig.
Anna is ___.|fifty|fifteen|five|Anna ist fünfzig.`),
    topic('Mehrzahl bilden','Meistens kommt -s hinzu: book → books. Nach s, sh, ch und x meist -es: bus → buses. Nach Konsonant + y wird y zu -ies: city → cities. Einige Formen sind unregelmäßig: child → children, person → people, man → men, woman → women. Vor der Mehrzahl steht kein a/an. Ein Apostroph bildet keine Mehrzahl: apples, nicht apple’s.',
      `one book → two books|ein Buch → zwei Bücher
one city → two cities|eine Stadt → zwei Städte
one child → two children|ein Kind → zwei Kinder`,
      `Two ___.|books|book|book’s|Zwei Bücher.
Three ___.|phones|phone|phone’s|Drei Telefone.
Four ___.|bags|bag|bag’s|Vier Taschen.
Two ___.|apples|apple|apple’s|Zwei Äpfel.
Three ___.|oranges|orange|orange’s|Drei Orangen.
Two ___.|buses|bus|bus’s|Zwei Busse. Bus = Bus.
Two ___.|cities|city’s|city|Zwei Städte. City = Stadt.
Three ___.|children|child’s|child|Drei Kinder.
Four ___.|people|person’s|person|Vier Personen. Verwende die alltägliche unregelmäßige Mehrzahl.
Two ___.|women|woman’s|woman|Zwei Frauen. Woman = Frau.
Five ___.|umbrellas|umbrella|umbrella’s|Fünf Regenschirme.
Six ___.|books|book|book’s|Sechs Bücher.
Seven ___.|phones|phone|phone’s|Sieben Telefone.
Two ___.|men|man’s|man|Zwei Männer. Man = Mann.
Five ___.|children|child’s|child|Fünf Kinder.
Three ___.|cities|city’s|city|Drei Städte.`)],
    'Nenne deinen Namen und dein Alter. Beschreibe zwei Dinge in deiner Tasche mit Zahlen.',
    ['Nenne Name und Alter.','Nenne eine Sache in der Einzahl.','Nenne eine Sache in der Mehrzahl.'],
    'Hello! My name is Emma. I am thirty years old. This is a bag. One phone and two books are in my bag.',
    'My name is Ben. I {am|Form von be} thirty years old. Emma {is|Form von be} twenty-one. This is {a|ein: book} book. This is {an|ein: apple} apple. Two {books|book: Mehrzahl} are in my bag. Three {children|child: Mehrzahl} are here. My number is {thirteen|13 in Worten}. Emma is {thirty|30 in Worten}.',
    `Du sagst dein Alter: 40.|I am forty.|I am fourteen.|I am four.
Du nennst 18.|eighteen|eighty|eight
Du nennst 60.|sixty|sixteen|six
Du fragst nach dem Alter.|How old are you?|How are you?|What is your name?`);
  add(4,'Familie & Besitz',
    ['Familienmitglieder vorstellen','Have und has für Besitz verwenden','My, your, his, her, our und their unterscheiden'],
    'family=Familie;mother=Mutter;father=Vater;parent=Elternteil;sister=Schwester;brother=Bruder;daughter=Tochter;son=Sohn;wife=Ehefrau;husband=Ehemann;friend=Freund / Freundin;have=haben;my=mein;your=dein / euer / Ihr;his=sein (Besitzer männlich);her=ihr (Besitzerin weiblich);our=unser;their=ihr (mehrere Besitzer);car=Auto;dog=Hund;cat=Katze;its=sein / ihr (bei Sachen und Tieren)',
    `This is my sister.|Das ist meine Schwester.|Das ist meine Mutter.|Das ist deine Schwester.
Her name is Emma.|Sie heißt Emma.|Er heißt Emma.|Du heißt Emma.
His name is Ben.|Er heißt Ben.|Sie heißt Ben.|Ich heiße Ben.
I have two brothers.|Ich habe zwei Brüder.|Ich habe zwei Schwestern.|Er hat zwei Brüder.
She has a daughter.|Sie hat eine Tochter.|Sie hat einen Sohn.|Sie haben eine Tochter.
We have a dog.|Wir haben einen Hund.|Sie haben einen Hund.|Wir haben eine Katze.
This is our house.|Das ist unser Haus.|Das ist ihr Haus.|Das ist mein Haus.
Their son is ten.|Ihr Sohn ist zehn.|Ihr Sohn ist zwölf.|Unsere Tochter ist zehn.
My parents are in Berlin.|Meine Eltern sind in Berlin.|Deine Eltern sind in Berlin.|Meine Eltern kommen aus Berlin.
Our family is here.|Unsere Familie ist hier.|Ihre Familie ist hier.|Unsere Familie ist dort.`,
    [topic('Have und has','Have bedeutet haben. I, you, we und they verwenden have. He, she und it verwenden has. Auch ein einzelner Name verwendet has: Anna has a cat. Verwechsle has nicht mit is: She has a daughter, aber She is a mother. This is … heißt „Das ist …“, these are … heißt „Das sind …“. The bezeichnet etwas Bestimmtes: the cat = die Katze.',
      `I have a brother.|Ich habe einen Bruder.
She has a sister.|Sie hat eine Schwester.
We have two children.|Wir haben zwei Kinder.`,
      `I ___ a sister.|have|has|am|Ich habe eine Schwester.
You ___ a brother.|have|has|are|Du hast einen Bruder.
He ___ a daughter.|has|have|is|Er hat eine Tochter.
She ___ a son.|has|have|is|Sie hat einen Sohn.
We ___ two children.|have|has|are|Wir haben zwei Kinder.
They ___ a dog.|have|has|are|Sie haben einen Hund.
Anna ___ a cat.|has|have|is|Anna hat eine Katze.
Ben and Emma ___ a car.|have|has|are|Ben und Emma haben ein Auto.
My father ___ a phone.|has|have|is|Mein Vater hat ein Telefon.
My parents ___ a house.|have|has|are|Meine Eltern haben ein Haus.
Our son ___ a book.|has|have|is|Unser Sohn hat ein Buch.
Their children ___ a dog.|have|has|are|Ihre Kinder haben einen Hund.
I ___ a car.|have|has|am|Ich habe ein Auto.
Her brother ___ a cat.|has|have|is|Ihr Bruder hat eine Katze.
His sisters ___ a phone.|have|has|are|Seine Schwestern haben ein Telefon.
You ___ three books.|have|has|are|Ihr habt drei Bücher.`),
    topic('Possessivbegleiter','My, your, his, her, its, our und their stehen vor dem Nomen. Sie richten sich nach dem Besitzer: Ben → his sister, Emma → her brother. Die Form ändert sich nicht mit der Mehrzahl: my book / my books. Me heißt mich/mir und steht nicht vor einem Nomen; yours steht allein für deinen Besitz: This book is yours = Dieses Buch gehört dir. Its zeigt Besitz bei einer Sache oder einem Tier; it’s bedeutet it is.',
      `Ben has a sister. His sister is Emma.|Ben hat eine Schwester. Seine Schwester ist Emma.
Emma has a brother. Her brother is Ben.|Emma hat einen Bruder. Ihr Bruder ist Ben.
We have a dog. Our dog is here.|Wir haben einen Hund. Unser Hund ist hier.`,
      `This is ___ mother.|my|your|their|Das ist meine Mutter.
This is ___ father.|your|my|our|Das ist dein Vater.
Ben is here. ___ sister is Anna.|His|Her|Their|Ben ist hier. Seine Schwester ist Anna.
Emma is here. ___ brother is Tom.|Her|His|Their|Emma ist hier. Ihr Bruder ist Tom.
We have a dog. ___ dog is here.|Our|Their|My|Wir haben einen Hund. Unser Hund ist hier.
They have a cat. ___ cat is here.|Their|Our|Your|Sie haben eine Katze. Ihre Katze ist hier.
These are ___ books.|my|me|I|Das sind meine Bücher. These = diese.
Anna has a phone. ___ phone is here.|Her|His|Our|Anna hat ein Telefon. Ihr Telefon ist hier.
Tom has a car. ___ car is here.|His|Her|Their|Tom hat ein Auto. Sein Auto ist hier.
The cat is in ___ house.|its|it's|it|Die Katze ist in ihrem Haus. The = der/die/das.
Mia has a son. ___ son is five.|Her|His|Our|Mia hat einen Sohn. Ihr Sohn ist fünf.
Leo has a daughter. ___ daughter is ten.|His|Her|Their|Leo hat eine Tochter. Seine Tochter ist zehn.
We are here. ___ parents are here.|Our|Their|Your|Wir sind hier. Unsere Eltern sind hier.
They are in Canada. ___ house is in Canada.|Their|Our|My|Sie sind in Kanada. Ihr Haus ist in Kanada.
This is ___ sister.|your|you|yours|Das ist deine Schwester.
This is ___ brother.|my|I|me|Das ist mein Bruder.`)],
    'Stelle zwei Personen aus deiner Familie vor. Nenne eine Sache oder ein Tier, das einer Person gehört.',
    ['Stelle zwei Familienmitglieder vor.','Nenne einen Namen und ein Alter.','Beschreibe Besitz mit have oder has.'],
    'This is my family. My sister is Emma. She is twenty. My brother is Ben. He has a dog. His dog is in our house.',
    'This is {my|mein} family. I {have|Form von have} a sister. {Her|ihr, Besitzerin weiblich} name is Anna. She {has|Form von have} a cat. My brother is Ben. {His|sein} dog is here. We {have|Form von have} two children. {Our|unser} son is ten. Anna and Ben have a house. {Their|ihr, mehrere Besitzer} house is in Berlin.',
    `Dein Bruder hat eine Tochter.|My brother has a daughter.|My brother has a son.|My sister has a daughter.
Das Auto gehört deinen Eltern. Du sagst: Das ist ihr Auto.|This is their car.|This is our car.|This is her car.
Emma besitzt einen Hund. Du sprichst über ihren Hund.|Her dog is here.|His dog is here.|Their dog is here.
Du und Ben habt eine Katze.|We have a cat.|They have a cat.|We have a dog.`);
  add(5,'Alltag: wohnen, arbeiten, lernen',
    ['Einfache Gewohnheiten beschreiben','Present Simple mit I/you/we/they bilden','Aussagen mit and, but und because verbinden'],
    'live=wohnen;work=arbeiten;study=lernen / studieren;speak=sprechen;read=lesen;eat=essen;drink=trinken;like=mögen;coffee=Kaffee;tea=Tee;water=Wasser;bread=Brot;office=Büro;home=Zuhause;student=Student / Studentin;teacher=Lehrer / Lehrerin;but=aber;because=weil;at home=zu Hause;together=zusammen',
    `I live in London.|Ich wohne in London.|Ich arbeite in London.|Ich komme aus London.
We work in an office.|Wir arbeiten in einem Büro.|Sie arbeiten in einem Büro.|Wir lernen in einem Büro.
I study English.|Ich lerne Englisch.|Ich spreche Englisch.|Ich lerne Deutsch.
You speak German.|Du sprichst Deutsch.|Du lernst Deutsch.|Du sprichst Englisch.
They read books.|Sie lesen Bücher.|Wir lesen Bücher.|Sie haben Bücher.
I drink tea.|Ich trinke Tee.|Ich trinke Kaffee.|Er trinkt Tee.
We eat bread.|Wir essen Brot.|Sie essen Brot.|Wir haben Brot.
I work at home.|Ich arbeite zu Hause.|Ich wohne hier.|Ich lerne zu Hause.
I like tea, but I drink coffee.|Ich mag Tee, trinke aber Kaffee.|Ich mag Kaffee, trinke aber Tee.|Ich mag Tee und trinke Tee.
We study together.|Wir lernen zusammen.|Sie lernen zusammen.|Wir arbeiten zusammen.`,
    [topic('Present Simple: Grundform','Für Gewohnheiten und allgemeine Tatsachen nutzt du das Present Simple. Mit I, you, we und they steht die Grundform des Verbs: I live, you work, we study, they speak. Kein zusätzliches am/are: I work, nicht I am work. Bei he/she/it kommt eine Endung hinzu; das lernst du als Nächstes.',
      `I live in Berlin.|Ich wohne in Berlin.
We study English.|Wir lernen Englisch.
They work at home.|Sie arbeiten zu Hause.`,
      `I ___ in London.|live|lives|living|Ich wohne in London.
You ___ in an office.|work|works|working|Du arbeitest in einem Büro.
We ___ English.|study|studies|studying|Wir lernen Englisch.
They ___ German.|speak|speaks|speaking|Sie sprechen Deutsch.
I ___ books.|read|reads|reading|Ich lese Bücher.
We ___ bread.|eat|eats|eating|Wir essen Brot.
You ___ tea.|drink|drinks|drinking|Du trinkst Tee.
They ___ coffee.|like|likes|liking|Sie mögen Kaffee.
I ___ at home.|work|works|working|Ich arbeite zu Hause.
We ___ together.|study|studies|studying|Wir lernen zusammen.
You ___ in Berlin.|live|lives|living|Ihr wohnt in Berlin.
My parents ___ at home.|work|works|working|Meine Eltern arbeiten zu Hause.
Ben and I ___ German.|speak|speaks|speaking|Ben und ich sprechen Deutsch.
Anna and Tom ___ tea.|drink|drinks|drinking|Anna und Tom trinken Tee.
I ___ English books.|read|reads|reading|Ich lese englische Bücher.
They ___ bread at home.|eat|eats|eating|Sie essen zu Hause Brot.`),
    topic('And, but und because','And fügt hinzu, but zeigt einen Gegensatz, because nennt einen Grund. Nach because bleibt die englische Reihenfolge Subjekt + Verb: because I work here. Für einen Beruf mit be steht meist a/an: I am a teacher. Bei Nationalitäten steht kein Artikel: I am German.',
      `I work and I study.|Ich arbeite und ich lerne.
I like tea, but I drink coffee.|Ich mag Tee, aber ich trinke Kaffee.
I am here because I work here.|Ich bin hier, weil ich hier arbeite.`,
      `I work ___ I study.|and|but|because|Ich arbeite und ich lerne.
I like coffee, ___ I drink tea.|but|and|because|Ich mag Kaffee, aber ich trinke Tee.
I am here ___ I work here.|because|but|and|Ich bin hier, weil ich hier arbeite.
I am ___ teacher.|a|an|the|Ich bin Lehrer.
She is ___ English teacher.|an|a|the|Sie ist Englischlehrerin.
We speak German ___ English.|and|because|but|Wir sprechen Deutsch und Englisch.
They live here, ___ they work in Berlin.|but|because|and|Sie wohnen hier, aber sie arbeiten in Berlin.
I drink water ___ I like water.|because|but|and|Ich trinke Wasser, weil ich Wasser mag.
He is ___ student.|a|an|the|Er ist Student.
I study English ___ I work in London.|because|but|and|Ich lerne Englisch, weil ich in London arbeite.
You work ___ you study.|and|because|but|Du arbeitest und du lernst.
We like tea, ___ we drink water.|but|and|because|Wir mögen Tee, aber wir trinken Wasser.
They study English ___ they live in Canada.|because|and|but|Sie lernen Englisch, weil sie in Kanada wohnen.
Ben is ___ teacher.|a|an|the|Ben ist Lehrer.
Emma is ___ English student.|an|a|the|Emma ist Englischstudentin.
I read ___ I like books.|because|and|but|Ich lese, weil ich Bücher mag.`)],
    'Beschreibe deinen Alltag: Wohnort, Arbeit oder Lernen und ein Getränk, das du magst.',
    ['Nenne Wohnort und Tätigkeit.','Nenne ein Getränk.','Verbinde zwei Aussagen mit and, but oder because.'],
    'I live in London. I work in an office and I study English. I like coffee, but I drink tea at home. We study together.',
    'I {live|wohnen: I} in Berlin. I {work|arbeiten: I} at home {and|und} I study English. My parents {speak|sprechen: they} German. We {read|lesen: we} books together. I like coffee, {but|aber} I drink tea. I am here {because|weil} I work here. We {study|lernen: we} English together.',
    `Du beschreibst deinen Wohnort.|I live in Berlin.|I work in Berlin.|I am from Berlin.
Du sagst: Ich lerne Englisch.|I study English.|I speak English.|I study German.
Du magst Kaffee, trinkst aber Tee.|I like coffee, but I drink tea.|I like tea, but I drink coffee.|I drink coffee because I like tea.
Du nennst deinen Beruf: Lehrer.|I am a teacher.|I have a teacher.|I study with a teacher.`);
  add(6,'Andere Menschen beschreiben',
    ['Gewohnheiten anderer beschreiben','Die Endungen -s, -es und -ies bilden','Be, have und Tätigkeitsverben unterscheiden'],
    'go=gehen / fahren;watch=ansehen;wash=waschen;finish=beenden;start=anfangen;teach=unterrichten;do=machen;bus=Bus;school=Schule;shop=Laden;breakfast=Frühstück;dinner=Abendessen;television=Fernsehen;every day=jeden Tag;morning=Morgen;evening=Abend;job=Beruf / Arbeit;early=früh;late=spät;at night=nachts',
    `She works in a shop.|Sie arbeitet in einem Laden.|Sie arbeitet in einer Schule.|Sie wohnt in einem Laden.
He lives in Berlin.|Er wohnt in Berlin.|Er arbeitet in Berlin.|Sie wohnt in Berlin.
She studies English.|Sie lernt Englisch.|Sie unterrichtet Englisch.|Sie spricht Englisch.
He goes to work by bus.|Er fährt mit dem Bus zur Arbeit.|Er fährt mit dem Zug zur Arbeit.|Er geht zu Fuß zur Arbeit.
She watches television.|Sie sieht fern.|Sie liest ein Buch.|Sie arbeitet am Fernseher.
He washes the car.|Er wäscht das Auto.|Er hat das Auto.|Er fährt das Auto.
She teaches English.|Sie unterrichtet Englisch.|Sie lernt Englisch.|Sie spricht Englisch.
He has breakfast at home.|Er frühstückt zu Hause.|Er isst zu Hause zu Abend.|Er arbeitet zu Hause.
She starts early.|Sie fängt früh an.|Sie hört früh auf.|Sie fängt spät an.
He finishes late.|Er hört spät auf.|Er fängt spät an.|Er hört früh auf.`,
    [topic('He, she, it: die -s-Regel','Im Present Simple bekommen he, she, it und einzelne Namen meist -s: work → works. Nach -s, -sh, -ch, -x und oft -o steht -es: watches, washes, goes, does. Nach Konsonant + y wird y zu -ies: study → studies. Nach Vokal + y nur -s: play → plays.',
      `I work. She works.|Ich arbeite. Sie arbeitet.
I watch television. He watches television.|Ich sehe fern. Er sieht fern.
I study English. Anna studies English.|Ich lerne Englisch. Anna lernt Englisch.`,
      `She ___ in an office.|works|work|working|Sie arbeitet in einem Büro.
He ___ in London.|lives|live|living|Er wohnt in London.
Emma ___ English.|studies|studying|study|Emma lernt Englisch.
Ben ___ television.|watches|watching|watch|Ben sieht fern.
She ___ the car.|washes|washing|wash|Sie wäscht das Auto.
He ___ to work.|goes|going|go|Er geht zur Arbeit.
Anna ___ English.|teaches|teaching|teach|Anna unterrichtet Englisch.
Tom ___ early.|starts|start|starting|Tom fängt früh an.
She ___ late.|finishes|finishing|finish|Sie hört spät auf.
He ___ his work.|does|doing|do|Er macht seine Arbeit.
My sister ___ German.|studies|studying|study|Meine Schwester lernt Deutsch.
Her father ___ in a shop.|works|work|working|Ihr Vater arbeitet in einem Laden.
Our son ___ television.|watches|watching|watch|Unser Sohn sieht fern.
Their mother ___ English.|teaches|teaching|teach|Ihre Mutter unterrichtet Englisch.
My brother ___ the car.|washes|washing|wash|Mein Bruder wäscht das Auto.
Mia ___ to school.|goes|going|go|Mia geht zur Schule.`),
    topic('Be, have und andere Verben','Be beschreibt Identität und Zustand: She is a teacher. Have beschreibt Besitz, aber auch feste Wendungen wie have breakfast = frühstücken. Tätigkeiten verwenden ihr eigenes Verb: She teaches English. In normalen Present-Simple-Aussagen steht kein zusätzliches is vor works, lives oder studies. Feste Wendungen: go to work = zur Arbeit gehen, by bus = mit dem Bus, in the evening = am Abend.',
      `She is a teacher.|Sie ist Lehrerin.
She has a job.|Sie hat eine Arbeit.
She teaches English.|Sie unterrichtet Englisch.`,
      `Anna ___ a teacher.|is|has|teaches|Anna ist Lehrerin.
Ben ___ a car.|has|is|works|Ben hat ein Auto.
Emma ___ English.|teaches|is|has|Emma unterrichtet Englisch.
Tom ___ breakfast at home.|has|is|goes|Tom frühstückt zu Hause.
She ___ from Germany.|is|has|lives|Sie kommt aus Deutschland.
He ___ in Canada.|lives|has|is from|Er wohnt in Kanada.
My father ___ a phone.|has|is|goes|Mein Vater hat ein Telefon.
My mother ___ in a shop.|works|has|teaches|Meine Mutter arbeitet in einem Laden.
She ___ thirty.|is|has|works|Sie ist dreißig.
He ___ dinner at home.|has|is|goes|Er isst zu Hause zu Abend.
Leo ___ a student.|is|has|studies|Leo ist Student.
Mia ___ a brother.|has|is|lives|Mia hat einen Bruder.
Her brother ___ German.|speaks|is|has|Ihr Bruder spricht Deutsch.
Our daughter ___ at home.|studies|has|is from|Unsere Tochter lernt zu Hause.
Their son ___ twenty.|is|has|goes|Ihr Sohn ist zwanzig.
My sister ___ dinner early.|has|is|goes|Meine Schwester isst früh zu Abend.`)],
    'Beschreibe den Alltag einer Person: Tätigkeit, Arbeitsort und eine Gewohnheit am Morgen oder Abend.',
    ['Stelle die Person vor.','Beschreibe Tätigkeit und Ort.','Nenne eine weitere Gewohnheit.'],
    'My sister is Emma. She is a teacher. She teaches English in London. She starts early and has breakfast at home. She watches television in the evening.',
    'My brother {is|Form von be} Ben. He {has|Form von have} a job in London. He {works|arbeiten: he} in a shop. He {goes|gehen: he} to work by bus. He {has|have breakfast} breakfast at home. My sister {studies|lernen: she} English. She {watches|ansehen: she} television in the evening. She {finishes|beenden: she} work late.',
    `Anna unterrichtet Englisch. Du beschreibst ihre Tätigkeit.|She teaches English.|She studies English.|She speaks English at home.
Du sagst, dass Ben spät Feierabend hat.|He finishes late.|He starts late.|He finishes early.
Du beschreibst Frühstück zu Hause.|She has breakfast at home.|She has dinner at home.|She works at home.
Du sagst, dass dein Bruder in Kanada wohnt.|My brother lives in Canada.|My brother is from Canada.|My brother works in Canada.`);

  window.EN_A1_AUTHORING={lessons,add,topic};
})();
