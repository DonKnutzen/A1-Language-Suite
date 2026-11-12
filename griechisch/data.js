/* Eigene Inhalte für erwachsene Anfänger. Keine übernommenen Buch- oder Prüfungsaufgaben. */
(() => {
  'use strict';
  const lessons=[];
  // phrase = Greek | German | optional, deliberately approximate reading aid.
  function add(title,goal,rule,phrases,dialogue,grammar,reading,listening,writing,speaking,model){
    lessons.push({id:lessons.length+1,title,goal,rule,phrases:phrases.split('\n').map(s=>{const [el,de,hint]=s.split('|');return {el,de,hint};}),dialogue:dialogue.split('|'),grammar,reading,listening,writing,speaking,model});
  }
  const q=(prompt,answer,other1,other2,explanation)=>({prompt,answer,options:[answer,other1,other2],explanation});
  const text=(body,questions)=>({body,questions});
  add('Begrüßen & sich vorstellen','Ich kann grüßen, meinen Namen nennen und nach dem Namen fragen.',
    'Γεια σου ist informell zu einer Person, Γεια σας höflich oder an mehrere. Με λένε … heißt wörtlich „Sie nennen mich …“. Das griechische Fragezeichen sieht aus wie ein Semikolon (;). Lerne die Wendungen zunächst als Ganzes. Der Tonos (´) zeigt die betonte Silbe.',
    `Γεια σου!|Hallo! (du)|ja su
Γεια σας!|Guten Tag! (Sie/ihr)|ja sas
Καλημέρα!|Guten Morgen!|kaliméra
Καλησπέρα!|Guten Abend!|kalispéra
Με λένε Άννα.|Ich heiße Anna.|me léne Ána
Πώς σε λένε;|Wie heißt du?|pos se léne
Χάρηκα!|Freut mich!|chárika
Αντίο!|Auf Wiedersehen!|adío`,
    'Καλημέρα! Με λένε Άννα. Πώς σε λένε;|Με λένε Νίκο. Χάρηκα!|Χάρηκα! Γεια σου!',
    [q('Du begrüßt eine fremde Person höflich.', 'Γεια σας!','Γεια σου!','Αντίο!','σας ist die höfliche Anrede und zugleich die Mehrzahl.'),q('Με ___ Άννα.','λένε','λέω','λες','Die feste Vorstellung lautet Με λένε + Name.'),q('Welches Zeichen beendet eine griechische Frage?',';','?','!','Das griechische Fragezeichen wird als ; geschrieben.')],
    text('Καλημέρα! Με λένε Ελένη. Πώς σε λένε;', [q('Was möchte Eleni erfahren?','Deinen Namen','Dein Alter','Deine Adresse','Πώς σε λένε; fragt nach dem Namen.'),q('Welche Tageszeit passt zum Gruß?','Morgen','Abend','Nacht','Καλημέρα wird morgens und tagsüber als Begrüßung verwendet.')]),
    text('Γεια σας! Με λένε Μαρία. Χάρηκα!',[q('Wie heißt die Sprecherin?','Μαρία','Άννα','Ελένη','Nach Με λένε folgt der Name Μαρία.'),q('Wie spricht sie ihr Gegenüber an?','Höflich oder im Plural','Nur mit du','Gar nicht','Γεια σας verwendet σας für Sie oder mehrere Personen.')]),
    'Schreibe einen Gruß, deinen Namen und eine Frage nach dem Namen. Verwende die griechische Tastatur unten.',
    'Begrüße eine fremde Person höflich. Stelle dich vor. Frage anschließend eine gleichaltrige Person nach ihrem Namen.',
    'Γεια σας! Με λένε Άννα. Πώς σε λένε;');
  add('Schrift lesen: erste Buchstaben','Ich erkenne alle 24 Buchstaben und lese erste kurze Wörter.',
    'Lerne im Schrifttrainer die vier Gruppen nacheinander. Groß- und Kleinbuchstaben gehören zusammen. Ρ/ρ klingt wie r, nicht p; Β/β wie w in Wasser, nicht b; Η/η wie i. σ steht im Wort, ς am Wortende. Buchstabenname und Laut sind verschieden: β heißt βήτα, klingt aber /v/.',
    `το όνομα|der Name|to ónoma
η μαμά|die Mama|i mamá
το νερό|das Wasser|to neró
το ένα|die Eins|to éna
η μέρα|der Tag|i méra
το σπίτι|das Haus|to spíti
το βιβλίο|das Buch|to vivlío
ο φίλος|der Freund|o fílos`,
    'Πώς σε λένε;|Με λένε Άννα.|Άννα;|Ναι, Άννα.',
    [q('Welche Kleinbuchstaben gehören zu Α Μ Ν;','α μ ν','α η π','δ μ υ','Α/α, Μ/μ und Ν/ν sind drei gut wiedererkennbare Paare.'),q('Welcher Buchstabe steht am Ende von φίλο_;','ς','σ','ζ','Das Sigma wird am Wortende als ς geschrieben.'),q('Welchen Laut hat Β in βιβλίο;','w wie Wasser','b wie Ball','p wie Park','Im Neugriechischen steht β für /v/.')],
    text('Άννα: το όνομα. Νερό: το νερό.',[q('Welches Wort bezeichnet Wasser?','νερό','όνομα','μαμά','νερό bedeutet Wasser; das ο ist betont.'),q('Was bezeichnet όνομα;','Name','Tag','Haus','όνομα ist das Wort für Name.')]),
    text('νερό, μαμά, βιβλίο',[q('Welches Wort hörst du zuerst?','νερό','βιβλίο','μαμά','Die Reihe beginnt mit νερό.'),q('Welches Wort endet auf den Laut o?','βιβλίο','μαμά','μέρα','βιβλίο endet auf ο; der Akzent steht auf ί.')]),
    'Schreibe deinen Namen, wenn möglich in griechischen Buchstaben, sowie νερό und βιβλίο ab. Vergleiche jeden Buchstaben.',
    'Sprich νερό, μαμά und βιβλίο. Zeige jeweils auf die betonte Silbe.', 'το νερό, η μαμά, το βιβλίο');
  add('Laute, Betonung & Nachfragen','Ich lese häufige Buchstabenkombinationen und bitte um Wiederholung.',
    'αι klingt wie e, ει/οι/υι wie i und ου wie u. αυ wird /av/ oder vor stimmlosen Lauten /af/, ευ entsprechend /ev/ oder /ef/. μπ, ντ, γκ ergeben häufig b, d, g (im Wort teils mit Nasal). γ ist vor e/i weich, sonst ein stimmhafter Reibelaut; χ vor e/i wie in „ich“, sonst wie in „Bach“. δ = stimmhaftes englisches th, θ = stimmloses th. Das Trema trennt Vokale: μαϊμού. Hilfsumschrift ist nur eine Annäherung.',
    `Ναι.|Ja.|ne
Όχι.|Nein.|óchi
Ευχαριστώ.|Danke.|efcharistó
Παρακαλώ.|Bitte.|parakaló
Συγγνώμη.|Entschuldigung.|singnómi
Δεν καταλαβαίνω.|Ich verstehe nicht.|den katalavéno
Πιο αργά, παρακαλώ.|Langsamer, bitte.|pjo argá parakaló
Μπορείτε να το πείτε ξανά;|Können Sie das noch einmal sagen?|boríte na to píte xaná`,
    'Συγγνώμη, δεν καταλαβαίνω.|Πιο αργά;|Ναι, παρακαλώ. Ευχαριστώ!',
    [q('Wie klingt ου in σου;','u','o','i','ου bezeichnet gemeinsam den Laut /u/.'),q('Welches Wort ist auf der letzten Silbe betont?','νερό','όνομα','άνθρωπος','Der Tonos in νερό steht auf dem letzten Vokal.'),q('Was sagst du bei Verständnisproblemen?','Δεν καταλαβαίνω.','Χάρηκα!','Καλημέρα!','Δεν verneint; καταλαβαίνω bedeutet verstehen.')],
    text('Πιο αργά, παρακαλώ. Δεν καταλαβαίνω.',[q('Was wird erbeten?','Langsamer sprechen','Lauter singen','Schneller lesen','Πιο αργά heißt langsamer.'),q('Was ist das Problem?','Verständnis','Hunger','Verspätung','Δεν καταλαβαίνω benennt ein Verständnisproblem.')]),
    text('Συγγνώμη. Μπορείτε να το πείτε ξανά; Ευχαριστώ.',[q('Was soll die andere Person tun?','Etwas wiederholen','Sich vorstellen','Den Weg zeigen','ξανά bedeutet noch einmal.'),q('Welches Höflichkeitswort beendet die Bitte?','Danke','Bitte','Guten Abend','Ευχαριστώ ist die Dankesformel.')]),
    'Schreibe zwei höfliche Bitten: um langsameres Sprechen und um Wiederholung.',
    'Spiele ein Gespräch, in dem du zweimal nachfragen musst. Sprich dann ευχαριστώ mit betonter letzter Silbe.', 'Πιο αργά, παρακαλώ. Μπορείτε να το πείτε ξανά;');
  add('Herkunft, Wohnort & sein','Ich kann Herkunft und Wohnort nennen und danach fragen.',
    'είμαι: εγώ είμαι, εσύ είσαι, αυτός/αυτή/αυτό είναι, εμείς είμαστε, εσείς είστε, αυτοί/αυτές/αυτά είναι. Das Pronomen darf meist wegfallen. από = aus/von. σε + Artikel verschmilzt: σε την → στην, σε το → στο, σε τον → στον. Αθήνα ist weiblich: στην Αθήνα.',
    `Είμαι από τη Γερμανία.|Ich komme aus Deutschland.
Από πού είσαι;|Woher kommst du?
Μένω στην Αθήνα.|Ich wohne in Athen.
Πού μένεις;|Wo wohnst du?
Είμαι από την Ελλάδα.|Ich komme aus Griechenland.
Μιλάω γερμανικά.|Ich spreche Deutsch.
Μιλάτε αγγλικά;|Sprechen Sie Englisch?
Μαθαίνω ελληνικά.|Ich lerne Griechisch.`,
    'Από πού είσαι;|Είμαι από τη Γερμανία. Μένω στην Αθήνα.|Μιλάς ελληνικά;|Μαθαίνω ελληνικά.',
    [q('Εσύ ___ από την Ελλάδα;','είσαι','είμαι','είμαστε','εσύ (du) verlangt είσαι.'),q('Εμείς ___ από τη Γερμανία.','είμαστε','είστε','είναι','εμείς bedeutet wir; dazu gehört είμαστε.'),q('Μένω ___ Αθήνα.','στην','στο','στον','σε + την verschmilzt zu στην vor dem weiblichen Ortsnamen.')],
    text('Με λένε Πέτρο. Είμαι από την Ελλάδα. Μένω στο Βερολίνο. Μιλάω ελληνικά και γερμανικά.',[q('Wo wohnt Petros?','Berlin','Athen','Patras','Μένω στο Βερολίνο nennt Berlin als Wohnort.'),q('Woher kommt er?','Griechenland','Deutschland','Österreich','Είμαι από την Ελλάδα nennt die Herkunft.')]),
    text('Είμαι η Σοφία. Είμαι από τη Γερμανία. Μένω στην Πάτρα.',[q('Wo wohnt Sofia?','Patras','Berlin','Athen','στην Πάτρα nennt den Wohnort.'),q('Woher kommt sie?','Deutschland','Griechenland','Zypern','από τη Γερμανία bezeichnet die Herkunft.')]),
    'Schreibe Name, Herkunft, Wohnort und die Sprachen, die du sprichst.', 'Frage nach Herkunft und Wohnort. Beantworte dieselben Fragen selbst.', 'Με λένε Άννα. Είμαι από τη Γερμανία. Μένω στην Αθήνα.');
  add('Zahlen & persönliche Daten','Ich nenne Alter und Telefonnummer und verstehe Zahlen bis 100.',
    '0–10: μηδέν, ένα, δύο, τρία, τέσσερα, πέντε, έξι, επτά, οκτώ, εννέα, δέκα. 11 έντεκα, 12 δώδεκα; 13 δεκατρία bis 19 δεκαεννέα. Zehner: είκοσι, τριάντα, σαράντα, πενήντα, εξήντα, εβδομήντα, ογδόντα, ενενήντα, εκατό. 21 = είκοσι ένα. Alter mit είμαι: Είμαι είκοσι χρονών. Telefonnummern können ziffernweise gesprochen werden.',
    `Πόσων χρονών είσαι;|Wie alt bist du?
Είμαι είκοσι χρονών.|Ich bin zwanzig Jahre alt.
Ποιο είναι το τηλέφωνό σου;|Wie ist deine Telefonnummer?
Το τηλέφωνό μου είναι 210 345 6789.|Meine Telefonnummer ist 210 345 6789.
ένα, δύο, τρία|eins, zwei, drei
δέκα, είκοσι, τριάντα|zehn, zwanzig, dreißig
Το όνομά μου είναι Άννα.|Mein Name ist Anna.
Το επώνυμό μου είναι Μίλερ.|Mein Nachname ist Müller.`,
    'Πόσων χρονών είσαι;|Είμαι είκοσι πέντε χρονών.|Ποιο είναι το τηλέφωνό σου;|Είναι 210 345 6789.',
    [q('Welche Zahl ist δεκατρία;','13','30','3','δεκα- steht hier für zehn plus τρία (drei).'),q('Wie sagt man 42?','σαράντα δύο','είκοσι τέσσερα','δεκατέσσερα','σαράντα = vierzig; danach steht δύο.'),q('Είμαι είκοσι ___.','χρονών','χρόνος','χρόνιας','Beim Alter steht die feste Form χρονών nach der Zahl.')],
    text('Όνομα: Λένα. Επώνυμο: Παπά. Ηλικία: 28. Τηλέφωνο: 210 765 4321.',[q('Wie alt ist Lena?','28','18','82','Ηλικία ist das Formularfeld für Alter.'),q('Was ist Παπά;','Nachname','Vorname','Wohnort','Επώνυμο kennzeichnet den Nachnamen.')]),
    text('Με λένε Μάριο. Είμαι τριάντα δύο χρονών. Το τηλέφωνό μου είναι δύο, ένα, μηδέν, πέντε, έξι.',[q('Wie alt ist Mario?','32','23','13','τριάντα δύο setzt sich aus dreißig und zwei zusammen.'),q('Wie beginnt die Nummer?','210','201','120','δύο, ένα, μηδέν entspricht zwei, eins, null.')]),
    'Fülle mit erfundenen Daten aus: Όνομα, Επώνυμο, Ηλικία, Τηλέφωνο.', 'Sage dein Alter und eine erfundene Telefonnummer langsam Ziffer für Ziffer.', 'Όνομα: Άννα. Επώνυμο: Μίλερ. Ηλικία: 25. Τηλέφωνο: 210 123 4567.');
  add('Uhrzeit, Wochentage & Termine','Ich verstehe Uhrzeiten und vereinbare einen Termin.',
    'Τι ώρα είναι; = Wie spät ist es? μία für ein Uhr; sonst δύο, τρεις, τέσσερις usw. και μισή = halb nach der genannten Stunde: τρεις και μισή = 3:30. στις + Uhrzeit = um, aber στη μία. Tage: Δευτέρα, Τρίτη, Τετάρτη, Πέμπτη, Παρασκευή, Σάββατο, Κυριακή. την + Tag für einen konkreten Termin.',
    `Τι ώρα είναι;|Wie spät ist es?
Είναι μία.|Es ist ein Uhr.
Είναι τρεις και μισή.|Es ist halb vier.
Στις πέντε.|Um fünf Uhr.
Τη Δευτέρα.|Am Montag.
Σήμερα είναι Τρίτη.|Heute ist Dienstag.
Αύριο στις δέκα;|Morgen um zehn?
Έχω ραντεβού.|Ich habe einen Termin.`,
    'Έχεις χρόνο αύριο;|Ναι. Στις πέντε;|Στις πέντε και μισή, παρακαλώ.|Εντάξει!',
    [q('τρεις και μισή ist …','3:30','2:30','3:15','Griechisch zählt die halbe Stunde nach drei; Deutsch sagt halb vier.'),q('___ πέντε έχω ραντεβού.','Στις','Στο','Στον','Uhrzeitangaben ab zwei verwenden στις.'),q('Welcher Tag folgt auf Δευτέρα;','Τρίτη','Κυριακή','Σάββατο','Auf Montag folgt Dienstag: Τρίτη.')],
    text('Ραντεβού: Παρασκευή, στις δέκα και μισή. Οδός Αθηνάς 8.',[q('Wann ist der Termin?','Freitag','Montag','Dienstag','Παρασκευή ist Freitag.'),q('Um welche Uhrzeit?','10:30','10:00','11:30','δέκα και μισή bedeutet zehn Uhr dreißig.')]),
    text('Σήμερα είναι Τετάρτη. Αύριο έχω ραντεβού στις εννέα.',[q('An welchem Tag ist der Termin?','Donnerstag','Mittwoch','Freitag','Heute Mittwoch, αύριο morgen, also Donnerstag.'),q('Um wie viel Uhr?','9:00','8:00','10:00','εννέα bedeutet neun.')]),
    'Schreibe eine kurze Terminbestätigung mit Tag, Uhrzeit und Ort.', 'Vereinbare einen Termin und schlage dann eine andere Uhrzeit vor.', 'Την Παρασκευή στις δέκα και μισή, στην Αθήνα. Εντάξει;');
  add('Familie & Zugehörigkeit','Ich stelle meine Familie vor und benutze Possessivformen.',
    'μου, σου, του, της, μας, σας, τους stehen nach dem Nomen: η μητέρα μου. Die Artikel ο, η, το zeigen männlich, weiblich, sächlich. Plural: οι für männlich/weiblich, τα für sächlich. Bei μου/σου kann ein zusätzlicher Akzent nötig werden: το όνομά μου. έχω: έχω, έχεις, έχει, έχουμε, έχετε, έχουν.',
    `η μητέρα μου|meine Mutter
ο πατέρας μου|mein Vater
ο αδερφός μου|mein Bruder
η αδερφή μου|meine Schwester
Έχω δύο παιδιά.|Ich habe zwei Kinder.
Αυτή είναι η οικογένειά μου.|Das ist meine Familie.
Είσαι παντρεμένος;|Bist du verheiratet? (zu einem Mann)
Είμαι παντρεμένη.|Ich bin verheiratet. (als Frau)`,
    'Έχεις αδέρφια;|Ναι, έχω μία αδερφή.|Πώς τη λένε;|Τη λένε Ελένη.',
    [q('η μητέρα ___ = unsere Mutter','μας','σας','τους','μας bedeutet unser; es steht nach dem Nomen.'),q('Εσείς ___ παιδιά;','έχετε','έχουμε','έχουν','εσείς verlangt die Form έχετε.'),q('Welcher Artikel passt zu παιδιά;','τα','οι','το','παιδιά ist sächlicher Plural; dafür steht τα.')],
    text('Ο Νίκος έχει δύο παιδιά. Η κόρη του είναι δέκα χρονών. Ο γιος του είναι έξι.',[q('Wie viele Kinder hat Nikos?','Zwei','Drei','Eins','δύο παιδιά nennt zwei Kinder.'),q('Wie alt ist die Tochter?','10','6','12','Η κόρη του ist seine Tochter; sie ist δέκα.')]),
    text('Αυτή είναι η αδερφή μου. Τη λένε Μαρία. Έχει ένα παιδί.',[q('Wer wird vorgestellt?','Schwester','Mutter','Tochter','η αδερφή μου ist meine Schwester.'),q('Wie viele Kinder hat sie?','Eins','Zwei','Keine','ένα παιδί bezeichnet ein Kind.')]),
    'Stelle eine echte oder erfundene Familie in vier Sätzen vor.', 'Beschreibe drei Familienmitglieder und frage nach Geschwistern.', 'Έχω μία αδερφή. Τη λένε Λένα. Η αδερφή μου έχει δύο παιδιά.');
  add('Personen & Eigenschaften','Ich beschreibe Menschen mit passenden Adjektivformen.',
    'Adjektive passen zu Geschlecht und Zahl: καλός φίλος, καλή φίλη, καλό παιδί; καλοί φίλοι, καλές φίλες, καλά παιδιά. Der Artikel hilft beim Erkennen. Die häufige Reihe -ος/-η/-ο ist ein Muster, keine Regel für jedes Adjektiv. Nach είμαι bleibt die beschriebene Person die Bezugsform.',
    `Είναι καλός φίλος.|Er ist ein guter Freund.
Είναι καλή φίλη.|Sie ist eine gute Freundin.
Είναι μικρό παιδί.|Es ist ein kleines Kind.
Ο Νίκος είναι ψηλός.|Nikos ist groß.
Η Άννα είναι ψηλή.|Anna ist groß.
Έχει καστανά μάτια.|Er/Sie hat braune Augen.
Έχει μαύρα μαλλιά.|Er/Sie hat schwarze Haare.
Είναι πολύ ευγενική.|Sie ist sehr freundlich.`,
    'Ποια είναι αυτή;|Είναι η φίλη μου, η Άννα.|Είναι πολύ ευγενική.|Ναι, είναι καλή φίλη.',
    [q('Η Μαρία είναι ___.','ψηλή','ψηλός','ψηλό','Μαρία ist weiblich, daher ψηλή.'),q('Το παιδί είναι ___.','μικρό','μικρή','μικρός','παιδί ist sächlich; das Adjektiv endet hier auf -ό.'),q('οι ___ φίλοι','καλοί','καλές','καλά','φίλοι ist männlicher Plural, dazu gehört καλοί.')],
    text('Η Ελένη είναι ψηλή. Έχει καστανά μάτια και μαύρα μαλλιά. Είναι πολύ ευγενική.',[q('Welche Augenfarbe hat Eleni?','Braun','Blau','Grün','καστανά μάτια bezeichnet braune Augen.'),q('Wie wird sie beschrieben?','Freundlich','Unhöflich','Müde','ευγενική bedeutet freundlich/höflich.')]),
    text('Ο φίλος μου είναι ψηλός. Έχει μαύρα μαλλιά. Τον λένε Πέτρο.',[q('Wie heißt der Freund?','Petros','Nikos','Mario','Τον λένε Πέτρο nennt den Namen.'),q('Welche Haarfarbe hat er?','Schwarz','Blond','Braun','μαύρα μαλλιά bedeutet schwarze Haare.')]),
    'Beschreibe zwei Personen in je zwei Sätzen. Achte auf männliche und weibliche Adjektivformen.', 'Beschreibe eine Person, damit dein Gegenüber sie erkennen kann.', 'Η φίλη μου είναι ψηλή. Έχει καστανά μάτια. Είναι πολύ ευγενική.');
  add('Café & höflich bestellen','Ich bestelle ein Getränk und bitte um die Rechnung.',
    'Θα ήθελα … ist eine höfliche feste Wendung: Ich hätte gern. Nach θέλω/θα ήθελα steht das Objekt im Akkusativ: ο καφές → έναν καφέ, η σαλάτα → μία σαλάτα, το νερό → ένα νερό. Maskuline Formen verändern sich oft; sächliche bleiben im Akkusativ gleich. με = mit, χωρίς = ohne.',
    `Θα ήθελα έναν καφέ.|Ich hätte gern einen Kaffee.
Ένα νερό, παρακαλώ.|Ein Wasser, bitte.
Με γάλα.|Mit Milch.
Χωρίς ζάχαρη.|Ohne Zucker.
Θέλετε κάτι άλλο;|Möchten Sie noch etwas?
Όχι, ευχαριστώ.|Nein, danke.
Τον λογαριασμό, παρακαλώ.|Die Rechnung, bitte.
Πόσο κάνει;|Wie viel kostet es?`,
    'Καλημέρα! Τι θα θέλατε;|Έναν καφέ με γάλα, παρακαλώ.|Με ζάχαρη;|Όχι, χωρίς ζάχαρη. Ευχαριστώ!',
    [q('Θα ήθελα ___ καφέ.','έναν','ένας','ένα','καφές ist männlich; als Objekt heißt es έναν καφέ.'),q('Was heißt „ohne Milch“?','χωρίς γάλα','με γάλα','και γάλα','χωρίς drückt ohne aus; με bedeutet mit.'),q('Du möchtest bezahlen.','Τον λογαριασμό, παρακαλώ.','Θέλετε κάτι άλλο;','Καλημέρα σας.','λογαριασμός ist die Rechnung; die Bitte verwendet den Akkusativ τον λογαριασμό.')],
    text('Καφές: 3 €. Τσάι: 2 €. Νερό: 1 €. Καφές με γάλα: 3,50 €.',[q('Wie viel kostet Tee?','2 €','3 €','1 €','Τσάι bezeichnet Tee; daneben steht 2 €.'),q('Was kostet 3,50 €?','Kaffee mit Milch','Schwarzer Kaffee','Ein Wasser','Καφές με γάλα ist Kaffee mit Milch.')]),
    text('Θα ήθελα ένα τσάι χωρίς ζάχαρη και ένα νερό, παρακαλώ.',[q('Was bestellt die Person außer Wasser?','Tee','Kaffee','Saft','ένα τσάι bedeutet einen Tee.'),q('Wie möchte sie den Tee?','Ohne Zucker','Mit Zucker','Mit Milch','χωρίς ζάχαρη schließt Zucker aus.')]),
    'Schreibe eine Bestellung mit zwei Getränken und einem Zusatzwunsch.', 'Spiele Gast und Bedienung: bestellen, nachfragen, Rechnung erbitten.', 'Θα ήθελα έναν καφέ χωρίς ζάχαρη και ένα νερό. Τον λογαριασμό, παρακαλώ.');
  add('Essen & Restaurant','Ich verstehe eine einfache Speisekarte und nenne Wünsche.',
    'θέλω: θέλω, θέλεις, θέλει, θέλουμε, θέλετε, θέλουν. δεν steht vor dem Verb: Δεν θέλω κρέας. Für Vorlieben: μου αρέσει + Einzahl/Verbhandlung, μου αρέσουν + Mehrzahl. Μου αρέσει η σαλάτα, μου αρέσουν οι πατάτες. Allergien klar benennen und bei Unsicherheit nachfragen.',
    `Θα ήθελα το μενού.|Ich hätte gern die Speisekarte.
Θέλω μία σαλάτα.|Ich möchte einen Salat.
Δεν τρώω κρέας.|Ich esse kein Fleisch.
Έχω αλλεργία στους ξηρούς καρπούς.|Ich habe eine Nussallergie.
Έχει γάλα;|Ist Milch darin?
Μου αρέσει το ψάρι.|Ich mag Fisch.
Μου αρέσουν οι πατάτες.|Ich mag Kartoffeln.
Καλή όρεξη!|Guten Appetit!`,
    'Τι θέλετε;|Μία σαλάτα, παρακαλώ. Δεν τρώω κρέας.|Κάτι να πιείτε;|Ένα νερό.',
    [q('Εμείς ___ μία σαλάτα.','θέλουμε','θέλετε','θέλουν','εμείς (wir) verlangt θέλουμε.'),q('Μου ___ οι πατάτες.','αρέσουν','αρέσει','αρέσω','οι πατάτες ist Mehrzahl, daher αρέσουν.'),q('___ θέλω κρέας.','Δεν','Όχι','Μην','Aussagen im Präsens verneint man mit δεν vor dem Verb.')],
    text('Σήμερα: σαλάτα 6 €, ψάρι με πατάτες 14 €, σούπα 5 €. Η σούπα έχει γάλα.',[q('Welches Gericht enthält Milch?','Suppe','Salat','Fisch','Η σούπα έχει γάλα sagt ausdrücklich, dass die Suppe Milch enthält.'),q('Was kostet der Fisch mit Kartoffeln?','14 €','6 €','5 €','ψάρι με πατάτες ist mit 14 € ausgezeichnet.')]),
    text('Δεν τρώω ψάρι. Θέλω μία σαλάτα και πατάτες. Ένα νερό, παρακαλώ.',[q('Was isst die Person nicht?','Fisch','Kartoffeln','Salat','Δεν τρώω ψάρι verneint Fisch.'),q('Was möchte sie trinken?','Wasser','Milch','Tee','Ένα νερό ist ein Wasser.')]),
    'Schreibe eine Bestellung und sage, was du nicht isst.', 'Frage nach einer Zutat und bestelle ein passendes Gericht.', 'Δεν τρώω κρέας. Θα ήθελα μία σαλάτα. Έχει γάλα;');
  add('Einkaufen, Mengen & Preise','Ich kaufe Lebensmittel ein und verstehe Mengen und Preise.',
    'Häufige Mehrzahlmuster: το μήλο → τα μήλα, η ντομάτα → οι ντομάτες, ο χυμός → οι χυμοί. Nach einer Mengenangabe steht das Lebensmittel meist ohne Artikel: ένα κιλό μήλα. πόσο für Menge/Preis, πόσα für zählbare sächliche Dinge: Πόσα μήλα; Geld: ευρώ bleibt unverändert.',
    `Ένα κιλό μήλα, παρακαλώ.|Ein Kilo Äpfel, bitte.
Μισό κιλό τυρί.|Ein halbes Kilo Käse.
Δύο μπουκάλια νερό.|Zwei Flaschen Wasser.
Πόσο κάνουν;|Wie viel kosten sie?
Κάνουν πέντε ευρώ.|Sie kosten fünf Euro.
Είναι ακριβό.|Es ist teuer.
Έχετε ψωμί;|Haben Sie Brot?
Μπορώ να πληρώσω με κάρτα;|Kann ich mit Karte bezahlen?`,
    'Τι θέλετε;|Ένα κιλό μήλα και μισό κιλό τυρί.|Επτά ευρώ.|Μπορώ να πληρώσω με κάρτα;',
    [q('το μήλο → τα ___','μήλα','μήλοι','μήλες','Das sächliche Muster -ο bildet den Plural auf -α.'),q('___ κιλό τυρί = ein halbes Kilo Käse','Μισό','Μισή','Μισός','κιλό ist sächlich; die Mengenform ist μισό.'),q('Wie fragt man nach mehreren Preisen zusammen?','Πόσο κάνουν;','Πού μένουν;','Πότε φεύγουν;','κάνουν steht hier für den Gesamtpreis mehrerer Waren.')],
    text('Μήλα: 2 € το κιλό. Τυρί: 10 € το κιλό. Ψωμί: 1 €. Πληρωμή με κάρτα: ναι.',[q('Was kostet ein halbes Kilo Käse?','5 €','10 €','2 €','Die Hälfte von 10 € pro Kilo sind 5 €.'),q('Ist Kartenzahlung möglich?','Ja','Nein','Nur morgens','Πληρωμή με κάρτα: ναι bestätigt Kartenzahlung.')]),
    text('Θα ήθελα δύο κιλά μήλα και ένα ψωμί. Πόσο κάνουν; Πέντε ευρώ.',[q('Wie viele Kilo Äpfel?','Zwei','Eins','Drei','δύο κιλά bezeichnet zwei Kilo.'),q('Wie hoch ist der Gesamtpreis?','5 €','2 €','10 €','Πέντε ευρώ nennt den Preis fünf Euro.')]),
    'Schreibe eine Einkaufsliste mit vier Mengenangaben.', 'Kaufe auf einem Markt ein und frage nach Preis und Kartenzahlung.', 'Ένα κιλό μήλα, μισό κιλό τυρί και δύο μπουκάλια νερό, παρακαλώ.');
  add('Wohnen & Ortsangaben','Ich beschreibe eine Wohnung und sage, wo Dinge stehen.',
    'υπάρχει + Einzahl, υπάρχουν + Mehrzahl = es gibt. πάνω στο = auf dem, κάτω από το = unter dem, δίπλα στο = neben dem. Nach diesen Ortsausdrücken steht der Akkusativ. η πόρτα → την πόρτα; ο καναπές → τον καναπέ. στον/στην/στο sind σε + bestimmten Artikel.',
    `Μένω σε ένα διαμέρισμα.|Ich wohne in einer Wohnung.
Έχει δύο δωμάτια.|Sie hat zwei Zimmer.
Η κουζίνα είναι μικρή.|Die Küche ist klein.
Υπάρχει ένα τραπέζι.|Es gibt einen Tisch.
Υπάρχουν δύο καρέκλες.|Es gibt zwei Stühle.
Το βιβλίο είναι πάνω στο τραπέζι.|Das Buch liegt auf dem Tisch.
Το μπάνιο είναι δίπλα στην κουζίνα.|Das Bad ist neben der Küche.
Ποια είναι η διεύθυνσή σου;|Wie ist deine Adresse?`,
    'Πού μένεις;|Σε ένα μικρό διαμέρισμα.|Πόσα δωμάτια έχει;|Δύο δωμάτια και μία κουζίνα.',
    [q('___ δύο καρέκλες.','Υπάρχουν','Υπάρχει','Είμαι','Zwei Stühle sind Mehrzahl; dafür steht υπάρχουν.'),q('πάνω ___ τραπέζι','στο','στην','στον','τραπέζι ist sächlich; σε + το = στο.'),q('Η κουζίνα είναι ___.','μικρή','μικρός','μικρό','κουζίνα ist weiblich, daher μικρή.')],
    text('Μικρό διαμέρισμα: δύο δωμάτια, κουζίνα και μπάνιο. Το μπάνιο είναι δίπλα στην κουζίνα. Ενοίκιο: 450 ευρώ.',[q('Wie viele Zimmer sind angegeben?','Zwei','Drei','Vier','δύο δωμάτια nennt zwei Zimmer.'),q('Was liegt neben der Küche?','Bad','Balkon','Treppe','Το μπάνιο ist das Bad.')]),
    text('Το βιβλίο είναι πάνω στο τραπέζι. Η τσάντα είναι κάτω από την καρέκλα.',[q('Wo liegt das Buch?','Auf dem Tisch','Unter dem Stuhl','Neben der Tür','πάνω στο τραπέζι bedeutet auf dem Tisch.'),q('Wo ist die Tasche?','Unter dem Stuhl','Auf dem Tisch','Neben dem Bett','κάτω από την καρέκλα bedeutet unter dem Stuhl.')]),
    'Beschreibe deine Wohnung und den Standort von zwei Dingen.', 'Führe jemanden mit einfachen Sätzen durch eine Wohnung.', 'Μένω σε ένα διαμέρισμα. Έχει δύο δωμάτια. Το βιβλίο είναι πάνω στο τραπέζι.');
  add('Stadt & Wegbeschreibung','Ich frage nach dem Weg und verstehe einfache Anweisungen.',
    'πού = wo, πώς = wie. Für Wege lerne feste Aufforderungen: πηγαίνετε ευθεία (gehen Sie geradeaus), στρίψτε δεξιά/αριστερά. απέναντι από = gegenüber von. κοντά/μακριά = nah/weit. Das Fragewort bleibt auch in kurzen Fragen am Anfang; das Verb kann fehlen: Πού είναι η στάση;',
    `Πού είναι η στάση;|Wo ist die Haltestelle?
Πού είναι το φαρμακείο;|Wo ist die Apotheke?
Πηγαίνετε ευθεία.|Gehen Sie geradeaus.
Στρίψτε δεξιά.|Biegen Sie rechts ab.
Στρίψτε αριστερά.|Biegen Sie links ab.
Είναι απέναντι από την τράπεζα.|Es ist gegenüber der Bank.
Είναι κοντά;|Ist es in der Nähe?
Είναι μακριά.|Es ist weit weg.`,
    'Συγγνώμη, πού είναι το φαρμακείο;|Πηγαίνετε ευθεία και στρίψτε δεξιά.|Είναι κοντά;|Ναι, δίπλα στην τράπεζα.',
    [q('Du suchst einen Ort. Welches Fragewort passt?','Πού','Πότε','Πόσο','πού fragt nach einem Ort; πότε nach Zeit.'),q('Was bedeutet στρίψτε αριστερά;','Links abbiegen','Rechts abbiegen','Geradeaus gehen','αριστερά bedeutet links.'),q('απέναντι ___ την τράπεζα','από','με','για','Die feste Ortsverbindung lautet απέναντι από.')],
    text('Το φαρμακείο είναι στην οδό Ερμού. Είναι δίπλα στην τράπεζα και απέναντι από το πάρκο.',[q('Was liegt neben der Apotheke?','Bank','Park','Bahnhof','δίπλα στην τράπεζα nennt die Bank als Nachbarin.'),q('Was liegt gegenüber?','Park','Bank','Café','απέναντι από το πάρκο bedeutet gegenüber dem Park.')]),
    text('Πηγαίνετε ευθεία. Στρίψτε αριστερά. Η στάση είναι δεξιά, δίπλα στο πάρκο.',[q('Wohin soll man zuerst gehen?','Geradeaus','Nach rechts','Zurück','Die erste Anweisung ist Πηγαίνετε ευθεία.'),q('Auf welcher Seite liegt die Haltestelle?','Rechts','Links','Hinter dir','Η στάση είναι δεξιά nennt die rechte Seite.')]),
    'Beschreibe den Weg von einem Platz zu einer Haltestelle in drei Schritten.', 'Frage nach der Apotheke und bitte bei Bedarf um Wiederholung.', 'Πηγαίνετε ευθεία και στρίψτε αριστερά. Η στάση είναι δίπλα στο πάρκο.');
  add('Verkehr & Fahrkarten','Ich kaufe eine Fahrkarte und verstehe Abfahrtsinformationen.',
    'πάω/πηγαίνω = gehen/fahren: πάω, πας, πάει, πάμε, πάτε, πάνε. με + Verkehrsmittel: με το λεωφορείο. για + Ziel/Zweck: εισιτήριο για την Αθήνα. από … μέχρι … = von … bis …. 100 εκατό, 200 διακόσια, 1000 χίλια (hier als neutrale Zahlen).',
    `Ένα εισιτήριο για την Αθήνα.|Eine Fahrkarte nach Athen.
Με επιστροφή, παρακαλώ.|Hin und zurück, bitte.
Πότε φεύγει το λεωφορείο;|Wann fährt der Bus ab?
Από ποια στάση;|Von welcher Haltestelle?
Πάω με το τρένο.|Ich fahre mit dem Zug.
Φεύγει στις οκτώ.|Es fährt um acht ab.
Φτάνει στις δέκα.|Es kommt um zehn an.
Πρέπει να αλλάξω;|Muss ich umsteigen?`,
    'Ένα εισιτήριο για την Αθήνα, παρακαλώ.|Με επιστροφή;|Ναι. Πότε φεύγει;|Στις οκτώ.',
    [q('Εμείς ___ με το τρένο.','πάμε','πάτε','πάνε','εμείς ist wir; dazu gehört πάμε.'),q('εισιτήριο ___ την Αθήνα','για','χωρίς','πάνω','για leitet das Ziel der Fahrkarte ein.'),q('Was bedeutet φτάνει;','Kommt an','Fährt ab','Steigt um','φτάνω bedeutet ankommen; φεύγω bedeutet abfahren/weggehen.')],
    text('Αθήνα → Πάτρα. Αναχώρηση: 08:00. Άφιξη: 11:00. Τιμή: 20 €. Στάση: 4.',[q('Wann kommt der Bus an?','11:00','08:00','04:00','Άφιξη bezeichnet die Ankunft.'),q('Wie teuer ist die Fahrt?','20 €','4 €','8 €','Τιμή ist der Preis.')]),
    text('Το τρένο για την Αθήνα φεύγει στις επτά και φτάνει στις εννέα. Το εισιτήριο κάνει δώδεκα ευρώ.',[q('Wann fährt der Zug ab?','7:00','9:00','12:00','φεύγει στις επτά nennt sieben Uhr als Abfahrt.'),q('Was kostet die Fahrkarte?','12 €','7 €','9 €','δώδεκα bedeutet zwölf.')]),
    'Schreibe eine Anfrage nach Fahrkarte, Abfahrtszeit und Preis.', 'Kaufe eine Fahrkarte hin und zurück und frage nach der Ankunft.', 'Θα ήθελα ένα εισιτήριο για την Πάτρα με επιστροφή. Πότε φεύγει το λεωφορείο;');
  add('Arbeit & Lernen','Ich nenne meinen Beruf und beschreibe einen einfachen Arbeitstag.',
    'Regelmäßiges Präsens auf -ω: δουλεύω, δουλεύεις, δουλεύει, δουλεύουμε, δουλεύετε, δουλεύουν. Gleiches Muster z. B. für γράφω und διαβάζω. Berufe stehen nach είμαι häufig ohne Artikel: Είμαι γιατρός. σε γιατρό und σε σχολείο beschreiben unterschiedliche Orte; Artikel und Bedeutung beachten.',
    `Τι δουλειά κάνεις;|Was arbeitest du?
Είμαι γιατρός.|Ich bin Arzt/Ärztin.
Είμαι δάσκαλος.|Ich bin Lehrer.
Είμαι δασκάλα.|Ich bin Lehrerin.
Δουλεύω σε ένα σχολείο.|Ich arbeite in einer Schule.
Διαβάζω ελληνικά.|Ich lerne/lese Griechisch.
Γράφω ένα μήνυμα.|Ich schreibe eine Nachricht.
Δουλεύω από τις εννέα μέχρι τις πέντε.|Ich arbeite von neun bis fünf.`,
    'Τι δουλειά κάνεις;|Είμαι δασκάλα. Δουλεύω σε ένα σχολείο.|Πότε δουλεύεις;|Από τις οκτώ μέχρι τις δύο.',
    [q('Εσύ ___ ελληνικά.','διαβάζεις','διαβάζω','διαβάζουν','Die du-Form regelmäßiger -ω-Verben endet auf -εις.'),q('Εμείς ___ σε σχολείο.','δουλεύουμε','δουλεύετε','δουλεύουν','Die wir-Form endet auf -ουμε.'),q('Αυτοί ___ ένα μήνυμα.','γράφουν','γράφει','γράφεις','αυτοί ist sie (Mehrzahl); dazu gehört γράφουν.')],
    text('Η Μαρία είναι δασκάλα. Δουλεύει από τις οκτώ μέχρι τις δύο. Το απόγευμα διαβάζει ελληνικά.',[q('Was ist Marias Beruf?','Lehrerin','Ärztin','Verkäuferin','δασκάλα ist die weibliche Berufsbezeichnung Lehrerin.'),q('Wann endet ihre Arbeitszeit?','14:00','08:00','17:00','μέχρι τις δύο nennt das Ende um zwei am Nachmittag.')]),
    text('Είμαι γιατρός. Δουλεύω τη Δευτέρα και την Τρίτη. Σήμερα γράφω ένα μήνυμα.',[q('An welchen Tagen arbeitet die Person?','Montag und Dienstag','Mittwoch und Donnerstag','Samstag und Sonntag','Δευτέρα und Τρίτη sind Montag und Dienstag.'),q('Was schreibt die Person heute?','Nachricht','Buch','Rechnung','ένα μήνυμα ist eine Nachricht.')]),
    'Beschreibe einen echten oder erfundenen Beruf, Arbeitsort und Arbeitszeit.', 'Frage jemanden nach Beruf und Arbeitszeit. Erzähle dann von dir.', 'Είμαι δασκάλα. Δουλεύω σε ένα σχολείο από τις οκτώ μέχρι τις δύο.');
  add('Tagesablauf & Häufigkeit','Ich beschreibe einen Tag und einfache Gewohnheiten.',
    'Häufigkeit: πάντα = immer, συνήθως = gewöhnlich, μερικές φορές = manchmal, ποτέ = nie (mit δεν: Δεν … ποτέ). Uhrzeiten mit στις. Reflexive/passive Formen als Wendungen lernen: ξυπνάω (ich wache auf), σηκώνομαι (ich stehe auf), κοιμάμαι (ich schlafe). Nicht alle Verben folgen -ω.',
    `Ξυπνάω στις επτά.|Ich wache um sieben auf.
Σηκώνομαι νωρίς.|Ich stehe früh auf.
Τρώω πρωινό.|Ich frühstücke.
Πίνω έναν καφέ.|Ich trinke einen Kaffee.
Μετά πάω στη δουλειά.|Danach gehe ich zur Arbeit.
Το βράδυ μένω στο σπίτι.|Abends bleibe ich zu Hause.
Συνήθως κοιμάμαι στις έντεκα.|Gewöhnlich schlafe ich um elf.
Δεν πίνω ποτέ τσάι.|Ich trinke nie Tee.`,
    'Τι ώρα ξυπνάς;|Στις επτά. Μετά τρώω πρωινό.|Πίνεις καφέ;|Ναι, πάντα.',
    [q('Δεν πίνω ___ τσάι. = Ich trinke nie Tee.','ποτέ','πάντα','συνήθως','ποτέ mit δεν drückt nie aus.'),q('Was verbindet eine zeitliche Reihenfolge?','μετά','χωρίς','απέναντι','μετά bedeutet danach.'),q('Εγώ ___ έναν καφέ.','πίνω','πίνει','πίνεις','Die ich-Form lautet πίνω; πίνεις gehört zu du.')],
    text('Ο Πέτρος ξυπνάει στις έξι. Τρώει πρωινό και μετά πάει στη δουλειά. Το βράδυ βλέπει τηλεόραση.',[q('Was tut Petros nach dem Frühstück?','Zur Arbeit gehen','Schlafen','Einkaufen','μετά πάει στη δουλειά beschreibt den nächsten Schritt.'),q('Wann wacht er auf?','6:00','7:00','8:00','στις έξι bedeutet um sechs.')]),
    text('Συνήθως ξυπνάω στις οκτώ. Πίνω τσάι. Δεν πίνω ποτέ καφέ.',[q('Welches Getränk trinkt die Person?','Tee','Kaffee','Milch','Πίνω τσάι ist eine positive Aussage über Tee.'),q('Wie oft trinkt sie Kaffee?','Nie','Immer','Manchmal','Δεν πίνω ποτέ καφέ bedeutet nie Kaffee trinken.')]),
    'Beschreibe deinen Tag mit vier Uhrzeiten und zwei Häufigkeitsangaben.', 'Erzähle deinen Tagesablauf ohne Vorlage und frage nach dem deines Gegenübers.', 'Ξυπνάω στις επτά. Μετά τρώω πρωινό. Το βράδυ μένω στο σπίτι.');
  add('Freizeit, Vorlieben & können','Ich spreche über Hobbys und sage, was ich kann.',
    'μου αρέσει + να + Verb beschreibt eine gern ausgeübte Tätigkeit: Μου αρέσει να διαβάζω. μπορώ: μπορώ, μπορείς, μπορεί, μπορούμε, μπορείτε, μπορούν. Nach μπορώ folgt να + gebeugtes Verb, kein Infinitiv: Μπορείς να έρθεις; Die Form nach να kann sich ändern; lerne hier έρθω/έρθεις als Wendung.',
    `Τι κάνεις στον ελεύθερο χρόνο σου;|Was machst du in deiner Freizeit?
Μου αρέσει να διαβάζω.|Ich lese gern.
Ακούω μουσική.|Ich höre Musik.
Παίζω ποδόσφαιρο.|Ich spiele Fußball.
Πάω για περίπατο.|Ich gehe spazieren.
Μπορώ να κολυμπήσω.|Ich kann schwimmen.
Δεν μπορώ σήμερα.|Ich kann heute nicht.
Θέλεις να πάμε σινεμά;|Möchtest du mit mir ins Kino gehen?`,
    'Τι κάνεις το Σάββατο;|Παίζω ποδόσφαιρο. Θέλεις να έρθεις;|Δεν μπορώ. Μου αρέσει να διαβάζω.|Εντάξει!',
    [q('Μπορείς ___ έρθεις;','να','το','από','Auf μπορώ folgt να und ein konjugiertes Verb.'),q('Εμείς ___ να πάμε.','μπορούμε','μπορείτε','μπορεί','εμείς (wir) verlangt μπορούμε.'),q('Μου αρέσει ___ διαβάζω.','να','σε','για','Für „gern etwas tun“ steht μου αρέσει να + Verb.')],
    text('Η Λένα ακούει μουσική και διαβάζει βιβλία. Το Σάββατο παίζει ποδόσφαιρο. Δεν της αρέσει το σινεμά.',[q('Was macht Lena samstags?','Fußball spielen','Ins Kino gehen','Schwimmen','Το Σάββατο παίζει ποδόσφαιρο nennt die Samstagsaktivität.'),q('Was mag sie nicht?','Kino','Musik','Bücher','Δεν της αρέσει το σινεμά verneint ihre Vorliebe fürs Kino.')]),
    text('Σήμερα δεν μπορώ να έρθω. Αύριο μπορούμε να πάμε σινεμά στις οκτώ.',[q('Wann ist Kino möglich?','Morgen','Heute','Gestern','Αύριο bedeutet morgen.'),q('Um welche Uhrzeit?','20:00','18:00','19:00','στις οκτώ bedeutet um acht, beim Kino hier abends.')]),
    'Schreibe drei Freizeitaktivitäten, eine Vorliebe und etwas, das du nicht kannst.', 'Frage nach Hobbys und schlage eine gemeinsame Aktivität vor.', 'Μου αρέσει να διαβάζω και να ακούω μουσική. Θέλεις να πάμε σινεμά;');
  add('Wetter, Monate & Kleidung','Ich verstehe eine einfache Wetterangabe und wähle Kleidung.',
    'Wetterwendungen: κάνει ζέστη/κρύο, έχει ήλιο, βρέχει. Monate: Ιανουάριος, Φεβρουάριος, Μάρτιος, Απρίλιος, Μάιος, Ιούνιος, Ιούλιος, Αύγουστος, Σεπτέμβριος, Οκτώβριος, Νοέμβριος, Δεκέμβριος. Jahreszeiten: άνοιξη, καλοκαίρι, φθινόπωρο, χειμώνας. Farben passen sich an: κόκκινος/κόκκινη/κόκκινο; μπλε bleibt unverändert.',
    `Τι καιρό κάνει;|Wie ist das Wetter?
Κάνει ζέστη.|Es ist heiß.
Κάνει κρύο.|Es ist kalt.
Βρέχει.|Es regnet.
Έχει ήλιο.|Es ist sonnig.
Φοράω ένα μπλε παντελόνι.|Ich trage eine blaue Hose.
Θέλω μία κόκκινη μπλούζα.|Ich möchte ein rotes Oberteil.
Τον Ιούλιο κάνει ζέστη.|Im Juli ist es heiß.`,
    'Τι καιρό κάνει σήμερα;|Βρέχει και κάνει κρύο.|Έχεις μπουφάν;|Ναι, έχω ένα μπλε μπουφάν.',
    [q('μία ___ μπλούζα','κόκκινη','κόκκινος','κόκκινο','μπλούζα ist weiblich; dazu passt κόκκινη.'),q('Welcher Monat ist Ιούλιος;','Juli','Juni','Januar','Ιούλιος ist Juli; Ιούνιος ist Juni.'),q('Welche Form ist korrekt?','μπλε παντελόνι','μπλος παντελόνι','μπλη παντελόνι','μπλε ist eine unveränderliche Farbbezeichnung.')],
    text('Αθήνα, Ιούλιος: 32 βαθμοί, ήλιος. Θεσσαλονίκη: 25 βαθμοί, βροχή.',[q('Wo regnet es?','Thessaloniki','Athen','Patras','βροχή ist das Nomen Regen.'),q('Welche Temperatur hat Athen?','32 Grad','25 Grad','23 Grad','32 βαθμοί nennt die Temperatur in Athen.')]),
    text('Σήμερα κάνει κρύο και βρέχει. Φοράω ένα μπουφάν και παίρνω μία ομπρέλα.',[q('Wie ist das Wetter?','Kalt und regnerisch','Heiß und sonnig','Warm und trocken','κρύο bedeutet kalt und βρέχει es regnet.'),q('Was nimmt die Person mit?','Regenschirm','Sonnenbrille','Badehose','ομπρέλα ist der Regenschirm.')]),
    'Schreibe eine Wettermitteilung und nenne zwei passende Kleidungsstücke.', 'Beschreibe Wetter und Kleidung heute sowie in deiner Lieblingsjahreszeit.', 'Σήμερα βρέχει και κάνει κρύο. Φοράω ένα μπλε μπουφάν.');
  add('Gesundheit & Hilfe','Ich benenne einfache Beschwerden und bitte um Hilfe.',
    'πονάει + ein Körperteil: Πονάει το κεφάλι μου. Mehrzahl: Πονάνε τα πόδια μου. έχω πυρετό = ich habe Fieber. πρέπει να … = ich muss/soll …; πρέπει bleibt unverändert, das Verb nach να passt zur Person. In echten Notfällen Hilfe holen; die Lektion bietet Sprachübung und keine medizinische Beratung.',
    `Δεν αισθάνομαι καλά.|Ich fühle mich nicht gut.
Πονάει το κεφάλι μου.|Mein Kopf tut weh.
Πονάει η κοιλιά μου.|Mein Bauch tut weh.
Έχω πυρετό.|Ich habe Fieber.
Χρειάζομαι έναν γιατρό.|Ich brauche einen Arzt.
Πού είναι το νοσοκομείο;|Wo ist das Krankenhaus?
Χρειάζομαι βοήθεια.|Ich brauche Hilfe.
Πρέπει να ξεκουραστώ.|Ich muss mich ausruhen.`,
    'Δεν αισθάνομαι καλά.|Τι έχετε;|Πονάει το κεφάλι μου και έχω πυρετό.|Χρειάζεστε έναν γιατρό.',
    [q('___ τα πόδια μου.','Πονάνε','Πονάει','Πονάω','τα πόδια ist Mehrzahl; dazu gehört πονάνε.'),q('Πρέπει ___ ξεκουραστώ.','να','με','στο','πρέπει verbindet sich mit να + Verb.'),q('Χρειάζομαι ___ γιατρό.','έναν','ένας','ένα','γιατρό ist ein männliches Akkusativobjekt; dazu gehört έναν.')],
    text('Ιατρείο: Δευτέρα–Παρασκευή 09:00–17:00. Ραντεβού: τηλέφωνο 210 234 5678. Σάββατο: κλειστά.',[q('Wann ist die Praxis geschlossen?','Samstag','Montag','Freitag','Σάββατο: κλειστά bedeutet samstags geschlossen.'),q('Wie vereinbart man einen Termin?','Telefonisch','Nur per Brief','Ohne Anmeldung','Zum Feld Ραντεβού wird eine Telefonnummer genannt.')]),
    text('Δεν αισθάνομαι καλά. Πονάει η κοιλιά μου. Χρειάζομαι έναν γιατρό σήμερα.',[q('Was tut weh?','Bauch','Kopf','Beine','η κοιλιά ist der Bauch.'),q('Wann braucht die Person einen Arzt?','Heute','Morgen','Am Montag','σήμερα bedeutet heute.')]),
    'Schreibe eine kurze Bitte um einen Arzttermin mit einer Beschwerde und einem Zeitwunsch.', 'Bitte um Hilfe und beschreibe zwei Beschwerden.', 'Δεν αισθάνομαι καλά. Έχω πυρετό. Χρειάζομαι έναν γιατρό σήμερα.');
  add('Reise, Hotel & Datum','Ich frage ein Zimmer an und nenne Reisedaten.',
    'θέλω να + Verb = ich möchte etwas tun. Für Reservierungen als Wendung: Θέλω να κλείσω ένα δωμάτιο. μία νύχτα / δύο νύχτες. Datum häufig mit στις + Zahl: στις δέκα Ιουνίου. Monate haben dabei Genitivformen (Ιούνιος → Ιουνίου). από … μέχρι … markiert den Aufenthalt.',
    `Θέλω να κλείσω ένα δωμάτιο.|Ich möchte ein Zimmer buchen.
Για δύο άτομα.|Für zwei Personen.
Για τρεις νύχτες.|Für drei Nächte.
Από τις δέκα μέχρι τις δεκατρείς Ιουνίου.|Vom zehnten bis dreizehnten Juni.
Έχετε ελεύθερο δωμάτιο;|Haben Sie ein freies Zimmer?
Πόσο κάνει η βραδιά;|Wie viel kostet eine Nacht?
Το πρωινό περιλαμβάνεται;|Ist das Frühstück enthalten?
Έχω μία κράτηση.|Ich habe eine Reservierung.`,
    'Καλησπέρα! Έχετε ελεύθερο δωμάτιο;|Για πόσα άτομα;|Για δύο άτομα και τρεις νύχτες.|Ναι, εξήντα ευρώ η βραδιά.',
    [q('για τρεις ___','νύχτες','νύχτα','νύχτας','Nach drei steht die Mehrzahl νύχτες.'),q('Θέλω ___ κλείσω ένα δωμάτιο.','να','το','από','θέλω να verbindet den Wunsch mit einer Handlung.'),q('Τον Ιούνιο reist du in welchem Monat?','Juni','Juli','Januar','Ιούνιος/Ιούνιο bezeichnet Juni.')],
    text('Κράτηση: Άννα Μίλερ. Δύο άτομα. 10–13 Ιουνίου. 60 € η βραδιά. Πρωινό: ναι.',[q('Wie viele Nächte sind gebucht?','Drei','Zwei','Vier','Anreise am 10., Abreise am 13. ergibt drei Nächte.'),q('Ist Frühstück enthalten?','Ja','Nein','Nur sonntags','Πρωινό: ναι bestätigt das Frühstück.')]),
    text('Έχουμε ένα δωμάτιο για δύο άτομα. Κάνει εβδομήντα ευρώ η βραδιά. Το πρωινό δεν περιλαμβάνεται.',[q('Was kostet eine Nacht?','70 €','60 €','17 €','εβδομήντα bedeutet siebzig.'),q('Ist Frühstück im Preis?','Nein','Ja','Nur heute','δεν περιλαμβάνεται bedeutet ist nicht enthalten.')]),
    'Verfasse eine Zimmeranfrage mit Personen, Zeitraum und einer Frage zum Frühstück.', 'Spiele ein Gespräch an der Rezeption: Reservierung, Preis, Frühstück.', 'Θέλω να κλείσω ένα δωμάτιο για δύο άτομα, από τις δέκα μέχρι τις δεκατρείς Ιουνίου.');
  add('Einladen, zusagen & absagen','Ich mache Vorschläge und begründe eine einfache Absage.',
    'θέλεις να …; lädt ein. να πάμε = lass uns gehen / dass wir gehen. γιατί = weil oder warum (je nach Satz). αλλά = aber, και = und. να + Verb wird mit μην verneint, eine normale Aussage mit δεν. Für Anfänger zuerst feste Wendungen sicher verwenden: Δεν μπορώ να έρθω.',
    `Θέλεις να έρθεις;|Möchtest du kommen?
Να πάμε για καφέ;|Wollen wir einen Kaffee trinken gehen?
Ναι, με χαρά!|Ja, gern!
Λυπάμαι, δεν μπορώ.|Tut mir leid, ich kann nicht.
Δεν μπορώ γιατί δουλεύω.|Ich kann nicht, weil ich arbeite.
Μπορούμε αύριο;|Können wir morgen?
Στο καφέ στις έξι.|Im Café um sechs.
Χρόνια πολλά!|Alles Gute!`,
    'Να πάμε για καφέ σήμερα;|Λυπάμαι, δεν μπορώ γιατί δουλεύω.|Μπορούμε αύριο;|Ναι, με χαρά! Στις έξι;',
    [q('Δεν μπορώ ___ δουλεύω.','γιατί','αλλά','ή','γιατί leitet hier die Begründung ein.'),q('Να ___ για καφέ; (wir)','πάμε','πάτε','πάνε','Die Einladung umfasst uns beide; wir = πάμε.'),q('Welcher Ausdruck ist eine Zusage?','Ναι, με χαρά!','Λυπάμαι, δεν μπορώ.','Δεν μπορώ σήμερα.','με χαρά bedeutet mit Freude, also gern.')],
    text('Γεια σου, Άννα! Έχω γενέθλια το Σάββατο. Θέλεις να έρθεις στο σπίτι μου στις επτά; Νίκος', [q('Wozu lädt Nikos ein?','Geburtstag','Arbeitstreffen','Zugfahrt','γενέθλια bedeutet Geburtstag.'),q('Wo findet die Feier statt?','Bei Nikos zu Hause','Im Café','In der Schule','στο σπίτι μου bezeichnet das Zuhause des Absenders.')]),
    text('Ευχαριστώ για την πρόσκληση. Δεν μπορώ το Σάββατο γιατί δουλεύω. Μπορούμε την Κυριακή;', [q('Warum wird abgesagt?','Arbeit','Krankheit','Reise','γιατί δουλεύω gibt die Arbeit als Grund an.'),q('Welcher andere Tag wird vorgeschlagen?','Sonntag','Montag','Freitag','Κυριακή ist Sonntag.')]),
    'Antworte auf eine Einladung: sage ab, nenne einen einfachen Grund und schlage eine Alternative vor.', 'Lade jemanden ein, vereinbare Zeit und Ort und reagiere auf eine Absage.', 'Ευχαριστώ! Δεν μπορώ το Σάββατο γιατί δουλεύω. Μπορούμε την Κυριακή;');
  add('Gestern & einfache Erlebnisse','Ich berichte mit häufigen Vergangenheitsformen kurz von gestern.',
    'Für ein abgeschlossenes Ereignis werden häufig Aoristformen benutzt: πάω → πήγα, τρώω → έφαγα, πίνω → ήπια, βλέπω → είδα, κάνω → έκανα. Gestern: χθες. Einfache Reihe: πήγα, πήγες, πήγε, πήγαμε, πήγατε, πήγαν. Diese Formen sind kein allgemeines Muster für alle Verben. ήμουν = ich war; είχα = ich hatte (andere Vergangenheitsform).',
    `Χθες πήγα στην Αθήνα.|Gestern bin ich nach Athen gefahren.
Πήγα με το τρένο.|Ich bin mit dem Zug gefahren.
Έφαγα μία σαλάτα.|Ich habe einen Salat gegessen.
Ήπια έναν καφέ.|Ich habe einen Kaffee getrunken.
Είδα έναν φίλο.|Ich habe einen Freund gesehen.
Τι έκανες χθες;|Was hast du gestern gemacht?
Ήμουν στο σπίτι.|Ich war zu Hause.
Είχα χρόνο.|Ich hatte Zeit.`,
    'Τι έκανες χθες;|Πήγα στην Αθήνα και είδα μία φίλη.|Πήγες με το τρένο;|Ναι. Μετά ήπιαμε έναν καφέ.',
    [q('Χθες εγώ ___ στην Πάτρα.','πήγα','πάω','πάμε','χθες verlangt hier das abgeschlossene vergangene Ereignis: πήγα.'),q('Εσύ ___ με το τρένο; (gestern)','πήγες','πήγε','πήγατε','Die du-Form im Aorist ist πήγες.'),q('Welche Form heißt „ich habe gegessen“?','έφαγα','ήπια','είδα','έφαγα gehört zu τρώω; ήπια zu πίνω und είδα zu βλέπω.')],
    text('Χθες η Μαρία πήγε στην Πάτρα. Είδε μία φίλη και έφαγε μία σαλάτα. Γύρισε στο σπίτι στις οκτώ.',[q('Wen hat Maria getroffen?','Eine Freundin','Einen Arzt','Ihre Mutter','Είδε μία φίλη bedeutet sie sah eine Freundin.'),q('Was hat sie gegessen?','Salat','Fisch','Suppe','έφαγε μία σαλάτα nennt den Salat.')]),
    text('Χθες ήμουν στο σπίτι. Είδα έναν φίλο. Ήπιαμε καφέ και μετά φάγαμε.',[q('Wo war die Person gestern?','Zu Hause','In der Schule','Im Zug','ήμουν στο σπίτι bedeutet ich war zu Hause.'),q('Was haben beide getrunken?','Kaffee','Tee','Saft','Ήπιαμε καφέ bedeutet wir tranken Kaffee.')]),
    'Schreibe vier Sätze über einen erfundenen gestrigen Tag mit πήγα, έφαγα, ήπια oder είδα.', 'Frage nach gestern und erzähle ein kurzes Erlebnis in zeitlicher Reihenfolge.', 'Χθες πήγα στην Αθήνα. Είδα μία φίλη. Ήπια έναν καφέ και έφαγα μία σαλάτα.');
  add('Morgen, Pläne & Verpflichtungen','Ich nenne einfache Pläne und sage, was ich tun muss.',
    'θα + Verb bildet Zukunftsaussagen. Häufig für einzelne geplante Handlungen: θα πάω, θα φάω, θα πιω, θα δω, θα κάνω. Verneinung: δεν θα πάω. Für eine regelmäßig fortdauernde Handlung gibt es θα + Präsensform: θα δουλεύω. Hier üben wir zuerst konkrete Einzelpläne. πρέπει να bleibt unpersönlich: Πρέπει να πάμε.',
    `Αύριο θα πάω στην Πάτρα.|Morgen werde ich nach Patras fahren.
Θα δω μία φίλη.|Ich werde eine Freundin sehen.
Θα φάμε μαζί.|Wir werden zusammen essen.
Θα πιω ένα τσάι.|Ich werde einen Tee trinken.
Δεν θα έρθω σήμερα.|Ich werde heute nicht kommen.
Πρέπει να φύγω.|Ich muss los.
Θα μείνω δύο μέρες.|Ich werde zwei Tage bleiben.
Τι θα κάνεις αύριο;|Was wirst du morgen machen?`,
    'Τι θα κάνεις αύριο;|Θα πάω στην Πάτρα. Θα δω μία φίλη.|Θα μείνεις δύο μέρες;|Όχι, πρέπει να γυρίσω αύριο.',
    [q('Αύριο ___ πάω στην Αθήνα.','θα','να','το','θα markiert in einer Aussage die Zukunft.'),q('Wie verneinst du θα έρθω;','Δεν θα έρθω.','Θα δεν έρθω.','Όχι θα έρθω.','δεν steht vor θα + Verb.'),q('Πρέπει να ___ μαζί. (wir gehen)','πάμε','πάτε','πάνε','Das Verb nach να passt zur handelnden Person, hier wir.')],
    text('Αύριο θα πάω στη Θεσσαλονίκη. Θα μείνω δύο μέρες. Θα δω τον αδερφό μου και θα φάμε μαζί.',[q('Wie lange bleibt die Person?','Zwei Tage','Drei Tage','Eine Woche','δύο μέρες nennt die Aufenthaltsdauer.'),q('Wen wird sie treffen?','Bruder','Freundin','Vater','τον αδερφό μου ist meinen Bruder.')]),
    text('Αύριο δεν θα πάω στη δουλειά. Θα μείνω στο σπίτι και θα δω μία φίλη.',[q('Wohin geht die Person morgen nicht?','Zur Arbeit','Nach Hause','Zur Freundin','δεν θα πάω στη δουλειά verneint den Weg zur Arbeit.'),q('Wen wird sie sehen?','Freundin','Bruder','Lehrer','μία φίλη bezeichnet eine Freundin.')]),
    'Schreibe eine Nachricht mit drei Plänen für morgen und einer Verpflichtung.', 'Vergleiche gestern, heute und morgen mit drei passenden Verbformen.', 'Αύριο θα πάω στην Πάτρα. Θα δω μία φίλη. Πρέπει να φύγω στις οκτώ.');
  add('Formulare, Nachrichten & A1-Transfer','Ich verbinde persönliche Daten und Alltagssätze zu einer verständlichen Nachricht.',
    'Eine kurze Nachricht braucht Anrede, Anlass, konkrete Angaben und Schluss: Γεια σου … / Ευχαριστώ / Τα λέμε! Fragewörter wiederholen: ποιος/ποια/ποιο (wer/welcher), πού (wo), πότε (wann), πόσο (wie viel), γιατί (warum). Prüfe Endungen, Tonos, δεν vor dem Verb und das griechische Fragezeichen. Eine verständliche eigene Nachricht zählt mehr als ein auswendig gelernter Text.',
    `Όνομα και επώνυμο|Vor- und Nachname
Ημερομηνία γέννησης|Geburtsdatum
Διεύθυνση|Adresse
Τηλέφωνο|Telefon
Ηλεκτρονική διεύθυνση|E-Mail-Adresse
Ευχαριστώ για το μήνυμα.|Danke für die Nachricht.
Τα λέμε αύριο!|Bis morgen!
Με εκτίμηση|Mit freundlichen Grüßen`,
    'Ποιο είναι το όνομά σας;|Άννα Μίλερ.|Ποια είναι η διεύθυνσή σας;|Οδός Αθηνάς 8, Αθήνα.',
    [q('Welches Formularfeld fragt nach dem Geburtsdatum?','Ημερομηνία γέννησης','Ηλεκτρονική διεύθυνση','Όνομα και επώνυμο','γέννηση bedeutet Geburt; ημερομηνία bedeutet Datum.'),q('Du fragst nach dem Grund.','Γιατί;','Πότε;','Πού;','γιατί fragt nach dem Warum.'),q('Welcher Schluss passt zu einem Freund?','Τα λέμε αύριο!','Πόσο κάνει;','Τι ώρα είναι;','Τα λέμε ist ein informeller Abschiedsgruß; αύριο ergänzt morgen.')],
    text('Γεια σου, Νίκο! Αύριο θα είμαι στην Αθήνα. Θέλεις να πάμε για καφέ στις έξι; Δεν μπορώ νωρίτερα γιατί δουλεύω. Τα λέμε! Άννα', [q('Warum kann Anna nicht früher?','Sie arbeitet','Sie reist nachts','Sie ist krank','γιατί δουλεύω gibt die Arbeit als Grund an.'),q('Welchen Treffpunkt-Typ schlägt sie vor?','Café','Bahnhof','Praxis','να πάμε για καφέ schlägt gemeinsames Kaffeetrinken vor.')]),
    text('Γεια σου, Άννα! Ευχαριστώ για το μήνυμα. Αύριο δεν μπορώ. Μπορούμε την Παρασκευή στις επτά;', [q('Wird der ursprüngliche Termin angenommen?','Nein','Ja','Ohne Antwort','Αύριο δεν μπορώ sagt den morgigen Termin ab.'),q('Welche Alternative wird genannt?','Freitag um sieben','Samstag um sechs','Sonntag um acht','την Παρασκευή στις επτά nennt Freitag um sieben.')]),
    'Schreibe eine eigene Nachricht von etwa 30–50 Wörtern: Stelle dich kurz vor, lade jemanden ein, nenne Zeit und Ort und stelle eine Frage.', 'Stelle dich vor, kaufe etwas ein und vereinbare einen Termin. Reagiere auf zwei Rückfragen ohne Vorlage.', 'Γεια σου, Νίκο! Με λένε Άννα και είμαι από τη Γερμανία. Μένω στην Αθήνα. Αύριο έχω χρόνο. Θέλεις να πάμε για καφέ στις έξι; Μπορούμε να πάμε στο καφέ δίπλα στην τράπεζα. Τα λέμε!');

  const alphabet=[
    ['Α','α','άλφα','a','μαμά','Mama'],['Ε','ε','έψιλον','e','νερό','Wasser'],['Ι','ι','γιώτα','i','τι','was'],['Ο','ο','όμικρον','o','όνομα','Name'],['Μ','μ','μι','m','μαμά','Mama'],['Ν','ν','νι','n','ναι','ja'],
    ['Κ','κ','κάπα','k','κακό','schlecht'],['Τ','τ','ταυ','t','το','der Artikel (sächlich)'],['Π','π','πι','p','παπί','Entchen'],['Λ','λ','λάμδα','l','γάλα','Milch'],['Ρ','ρ','ρο','gerolltes r','νερό','Wasser'],['Σ','σ/ς','σίγμα','stimmloses s','σας','Ihnen/euch'],
    ['Β','β','βήτα','w wie Wasser','βιβλίο','Buch'],['Δ','δ','δέλτα','stimmhaftes englisches th','δύο','zwei'],['Ζ','ζ','ζήτα','stimmhaftes s','ζάχαρη','Zucker'],['Θ','θ','θήτα','stimmloses englisches th','θέλω','ich möchte'],['Φ','φ','φι','f','φίλος','Freund'],['Χ','χ','χι','ch: vor e/i weich, sonst rau','χαρά','Freude'],
    ['Η','η','ήτα','i','η','der Artikel (weiblich)'],['Υ','υ','ύψιλον','i (allein)','τυρί','Käse'],['Ω','ω','ωμέγα','o','ώρα','Stunde'],['Γ','γ','γάμμα','weiches j vor e/i, sonst Reibelaut','γάλα','Milch'],['Ξ','ξ','ξι','ks','έξι','sechs'],['Ψ','ψ','ψι','ps','ψάρι','Fisch']
  ].map((a,i)=>({upper:a[0],lower:a[1],name:a[2],sound:a[3],word:a[4],meaning:a[5],group:Math.floor(i/6)}));
  const combinations=[['αι','e','ναι'],['ει','i','είμαι'],['οι','i','φίλοι'],['ου','u','σου'],['αυ','av / af','αύριο / αυτό'],['ευ','ev / ef','Ευρώπη / ευχαριστώ'],['μπ','b (teils mb)','μπανάνα'],['ντ','d (teils nd)','ντομάτα'],['γκ','g (teils ng)','γκολ'],['τσ','ts','τσάι'],['τζ','ds, stimmhaft','τζάμι'],['ϊ / ϋ','getrennte Vokale','μαϊμού']];
  window.EL_A1_DATA={lessons,alphabet,combinations};
})();
