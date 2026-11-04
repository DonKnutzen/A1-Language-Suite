/* Short checks placed right after each explanation block of a deepening page.
 * "#lesson key" opens a page; "@R" is the main rule (with its table and examples), "@H0", "@H1" … the notes in page order, "@P" the pronunciation box.
 * Line: prompt | answer | wrong | wrong | French context | explanation. Lines starting with ">" go to the closing practice instead.
 * Prompt prefixes: "=" a French sentence to say in German, "?" a French question with a German answer (played afterwards), "!" a French question without audio; otherwise a gap with ___.
 */
(() => {
  'use strict';
  const source=`
#1 study-1-0
@R
?Le verbe conjugué occupe la deuxième place : quelle phrase est correcte ?|In Berlin wohne ich.|In Berlin ich wohne.|Wohne in Berlin ich.||In Berlin forme le premier groupe ; wohne vient ensuite, puis ich. Dans les deux autres phrases, le verbe n’est pas en deuxième position.
=J’habite à Vienne et je parle anglais.|Ich wohne in Wien und ich spreche Englisch.|Ich wohne in Wien und ich spreche englisch.|Ich wohne in Wien und ich Englisch spreche.||Le nom de la langue prend une majuscule : Englisch. Après ich, le verbe spreche vient avant la langue.
>Aus Kanada ___ ich.|komme|kommen|kommst|Je viens du Canada.|Aus Kanada occupe la première place, komme suit en deuxième position, avant ich. Kommen et kommst ne vont pas avec ich.
>=Je parle allemand et français.|Ich spreche Deutsch und Französisch.|Ich spreche deutsch und französisch.|Ich Deutsch und Französisch spreche.||Les noms de langues prennent une majuscule, et spreche reste en deuxième position.
#1 study-1-1
@R
=Où habitez-vous ?|Wo wohnen Sie?|Wo Sie wohnen?|Wo wohnt Sie?||Mot interrogatif, verbe en -en, puis Sie. Wohnt va avec er ou sie, pas avec Sie.
Woher ___ Sie?|sind|seid|bist|D’où êtes-vous ?|Avec Sie, sein donne sind : c’est l’exception de la règle. Seid va avec ihr, bist avec du.
>!Que demande Woher ?|l’origine|le lieu où l’on habite|le nom||Woher demande d’où l’on vient. Wo demande le lieu où l’on habite, Wie le nom.
@H0
=Habitez-vous à Paris ?|Wohnen Sie in Paris?|Wohnen in Paris Sie?|Wo wohnen Sie in Paris?||Sans mot interrogatif, le verbe vient en premier, avant Sie. Wo pose une autre question : où exactement.
>Nein, ich wohne ___ in Paris.|nicht|kein|nein|Non, je n’habite pas à Paris.|Nicht nie ici le lieu où l’on habite. Nein répond seulement non, et kein va devant un nom sans article.
@H1
Wie geht es ___?|Ihnen|Sie|Ihr|Comment allez-vous ?|La formule fixe utilise Ihnen. Sie et Ihr ne vont pas dans cette question.
>?Quelle réponse convient à « Wie geht es Ihnen? » ?|Gut, danke.|Ich heiße Anna.|Aus Berlin.||Wie geht es Ihnen? demande comment on va. Les autres réponses donnent le nom ou l’origine.
#1 Pronoms personnels
@R
!Dans « Woher kommen Sie? », Sie signifie :|vous, forme de politesse|elle|nous||Au milieu de la phrase, Sie avec majuscule est la forme de politesse. Elle se dit sie, nous se dit wir.
?Der Tisch, la table : quel pronom le remplace ?|er|sie|es||Tisch est masculin en allemand : on le remplace par er, même si table est féminin en français.
>!« Anna und Paul? Sie wohnen in Bonn. » Ici, Sie signifie :|ils|elle|tu||Sie porte une majuscule parce qu’il commence la phrase. Il remplace Anna und Paul, donc ils. Elle serait sie avec un verbe au singulier, tu serait du.
#1 sein – conjugaison
@R
Ich ___ Studentin.|bin|ist|habe|Je suis étudiante.|Avec ich, sein donne bin. Pour dire son métier ou ses études, l’allemand emploie sein, pas haben.
Mein Hobby ___ Volleyball.|ist|bin|sind|Mon hobby, c’est le volley.|Mein Hobby correspond à es : sein donne ist. Bin va avec ich, sind avec un pluriel.
>Anna und Paul ___ Studenten.|sind|ist|seid|Anna et Paul sont étudiants.|Deux personnes correspondent à sie : sind. Ist va avec une seule personne, seid avec ihr.
@H0
=Je suis à la maison.|Ich bin zu Hause.|Ich bin in Hause.|Ich habe zu Hause.||Zu Hause indique le lieu où l’on est, avec sein. In Hause n’existe pas, et haben ne décrit pas un lieu.
>Wir sind zu ___.|Hause|Haus|Häuser|Nous sommes à la maison.|L’expression fixe est zu Hause. Haus et Häuser désignent un bâtiment, sans le sens de chez soi.
@H1
=J’ai trente ans.|Ich bin dreißig Jahre alt.|Ich habe dreißig Jahre alt.|Ich bin dreißig Jahre.||Pour l’âge, l’allemand utilise sein et termine par Jahre alt. Haben suit le français et ne convient pas ; sans alt, la phrase est incomplète.
>Du ___ zwanzig Jahre alt.|bist|hast|bin|Tu as vingt ans.|Avec du, sein donne bist. Hast vient de haben, qui ne sert pas pour l’âge ; bin va avec ich.
#1 Verbes réguliers au présent
@R
Woher ___ du?|kommst|kommt|komme|D’où viens-tu ?|Avec du, la terminaison est -st : kommst. Kommt va avec er, sie ou ihr ; komme avec ich.
Anna ___ in Köln.|wohnt|wohnst|wohnen|Anna habite à Cologne.|Anna correspond à sie : terminaison -t. Wohnst va avec du, wohnen avec wir ou Sie.
>Wir ___ aus Frankreich.|kommen|kommt|komme|Nous venons de France.|Avec wir, la terminaison est -en, comme l’infinitif. Kommt et komme vont avec d’autres personnes.
#1 heißen et sprechen – conjugaison
@R
Mein Name ___ Claire Martin.|ist|heißt|bin|Mon nom est Claire Martin.|Avec Mein Name, on utilise ist. Heißt demande une personne comme sujet, et bin va avec ich.
Paul ___ Englisch und Deutsch.|spricht|sprecht|sprechst|Paul parle anglais et allemand.|Sprechen change e en i avec du et er/sie : spricht. Sprecht va avec ihr ; sprechst n’existe pas.
>Wie ___ du?|heißt|heißst|heiße|Comment t’appelles-tu ?|Le radical finit en ß : avec du, on ajoute seulement -t. Heiße va avec ich.
@P
!Quelle écriture donne le son « aï » dans « h_ßen » ?|ei|ie|ai||Le son « aï » s’écrit ei : heißen. ie se prononce comme un i long (Sie, sieben) ; ai n’est pas l’orthographe de ce mot.
#2 study-2-0
@R
!Comment se nomme la lettre ß ?|Eszett|Umlaut|Bindestrich||ß se nomme Eszett. Umlaut désigne les points sur ä, ö, ü, Bindestrich le trait d’union.
=Mon prénom est Lena.|Mein Vorname ist Lena.|Mein Familienname ist Lena.|Meine Vorname ist Lena.||Vorname = prénom ; der Vorname est masculin : mein Vorname. Familienname désigne le nom de famille.
>?Un nom s’écrit Schröder. Comment préciser le ö ?|mit Umlaut|ohne Umlaut|mit Eszett||ö porte un Umlaut : on dit mit Umlaut. Ohne Umlaut dirait le contraire, et Eszett désigne ß.
@H0
Anna schreibt ___ mit Doppel-n.|man|Mann|mein|Anna s’écrit avec deux n.|Man signifie on. Mann veut dire homme, et mein est un possessif.
>Das schreibt man mit ___ Punkt.|einem|ein|eine|Cela s’écrit avec un point.|Après mit, ein Punkt devient einem Punkt. Ein et eine ne prennent pas la forme du datif.
@P
?Quelle lettre se nomme « faou » ?|V|W|F||En allemand, v se nomme « faou » et w « vé ». F se nomme « eff ».
#2 study-2-1
@R
___ Sie das bitte wiederholen?|Können|Kann|Könnt|Pouvez-vous répéter cela, s’il vous plaît ?|Avec Sie, können garde la forme de base. Kann va avec ich ou er/sie, könnt avec ihr.
=Peux-tu épeler le nom ?|Kannst du den Namen buchstabieren?|Kannst du buchstabieren den Namen?|Kann du den Namen buchstabieren?||Avec du : kannst. Le deuxième verbe reste à l’infinitif à la fin de la phrase.
>Anna ___ gut Deutsch sprechen.|kann|kannst|können|Anna sait bien parler allemand.|Avec er/sie, können devient kann, sans terminaison. Kannst va avec du, können avec wir ou Sie.
@H0
Können Sie ___ bitte buchstabieren?|den Namen|der Name|den Name|Pouvez-vous épeler le nom, s’il vous plaît ?|Le nom est l’objet : der Name devient den Namen, avec -n à la fin. Den Name oublie ce -n.
>=Mon nom est Weber.|Mein Name ist Weber.|Meinen Namen ist Weber.|Den Namen ist Weber.||Ici, Name est le sujet : mein Name reste inchangé. Den Namen et meinen Namen servent quand on écrit ou épelle le nom.
@H1
!Dans « Können Sie das buchstabieren? », das signifie :|cela|le|du||Das remplace ici le mot déjà mentionné ; il n’accompagne aucun nom.
>Können Sie ___ bitte schreiben?|das|der|dem|Pouvez-vous écrire cela, s’il vous plaît ?|Das signifie cela et remplace un mot déjà nommé. Der et dem sont des articles qui demandent un nom.
#3 study-3-0
@R
!Comment dit-on 17 ?|siebzehn|siebenzehn|siebzig||17 = siebzehn : le -en de sieben disparaît. Siebzig signifie 70.
!Comment dit-on 45 ?|fünfundvierzig|vierundfünfzig|vierzigfünf||Unité + und + dizaine, en un seul mot. Vierundfünfzig = 54, et vierzigfünf n’existe pas.
!Comment dit-on 12 ?|zwölf|zweizehn|elf||12 a un nom propre : zwölf. Elf signifie 11, et zweizehn n’existe pas.
>!Comment dit-on 16 ?|sechzehn|sechszehn|sechzig||16 = sechzehn : le s de sechs disparaît. Sechzig signifie 60.
@H0
!Comment dit-on 600 ?|sechshundert|sechzighundert|hundertsechs||Le nombre de centaines se place devant hundert, en un seul mot. Hundertsechs signifie 106.
>!Comment dit-on 250 ?|zweihundertfünfzig|zweihundertfünfundzwanzig|zwanzighundertfünfzig||Zweihundert, puis fünfzig, le tout en un mot. Zweihundertfünfundzwanzig signifie 225.
#3 study-3-1
@R
?Comment dit-on « le dix-sept avril » à l’oral ?|am siebzehnten April|am siebzehn April|im siebzehnten April||À l’oral : am + nombre en -ten + mois. Sans -ten, la date est incomplète ; im va devant un mois seul.
!Que signifie zweitausend ?|2000|200|20 000||zwei + tausend = deux mille. 200 se dit zweihundert.
>!Dans la date 17.04.2000, quel est le mois ?|avril|juillet|janvier||Le deuxième nombre donne le mois : 04 = avril.
@H0
?Comment dit-on « le trois avril » après am ?|am dritten April|am dreiten April|am dreizehnten April||drei devient dritte, puis -ten après am. Dreizehnten signifie le treize.
>?Comment dit-on « le premier mai » ?|am ersten Mai|am einsten Mai|am einten Mai||eins devient erste ; après am : ersten.
@H1
=Je suis née le dix-sept avril.|Ich bin am siebzehnten April geboren.|Ich habe am siebzehnten April geboren.|Ich bin im siebzehnten April geboren.||La formule fixe est Ich bin am … geboren. Haben ne convient pas, et im ne va pas devant une date avec un jour.
>Ich bin am ersten Mai ___.|geboren|Geburt|Geburtstag|Je suis née le premier mai.|La formule se termine par geboren. Geburt signifie naissance, Geburtstag anniversaire.
@P
?Quel nombre signifie 40 ?|vierzig|vierzehn|vier||vierzig = 40, vierzehn = 14. Écoute bien la fin -zig.
#4 study-4-0
@R
=Il est 7 h 30.|Es ist halb acht.|Es ist halb sieben.|Es ist sieben halb.||halb vise l’heure suivante : 7 h 30 = halb acht. Halb sieben signifie 6 h 30.
=Il est 9 h 45.|Es ist Viertel vor zehn.|Es ist Viertel nach neun.|Es ist Viertel vor neun.||Viertel vor + l’heure suivante = moins le quart. Viertel nach neun signifie 9 h 15.
>Der Termin ist ___ zehn Uhr.|um|am|im|Le rendez-vous est à dix heures.|um annonce l’heure. Am va avec un jour, im avec un mois.
>=Il est seize heures trente.|Es ist sechzehn Uhr dreißig.|Es ist sechzehn Uhr halb.|Es ist dreißig nach sechzehn Uhr.||Sur 24 heures : heure, Uhr, puis les minutes. Halb ne se place pas après Uhr.
#4 study-4-1
@R
Ich arbeite ___ Montag.|am|um|im|Je travaille lundi.|Pour un jour précis : am + jour. Um sert pour l’heure, im pour un mois.
=Du lundi au vendredi.|Von Montag bis Freitag.|Am Montag bis Freitag.|Von Montag zu Freitag.||Une période se dit von … bis … . Am indique un seul jour, zu n’indique pas la fin d’une période.
>!Quel jour vient après Samstag ?|Sonntag|Montag|Freitag||Samstag = samedi, Sonntag = dimanche. Montag est lundi, Freitag vendredi.
>!Que demande « Welcher Tag ist heute? » ?|le jour|l’heure|le mois||welcher Tag demande quel jour. L’heure se demande avec Wie spät ist es?
#4 study-4-2
@R
=En juillet.|Im Juli.|Am Juli.|Um Juli.||im + mois. Am va avec un jour ou une date, um avec une heure.
!Quelle écriture est correcte ?|im Mai|im mai|am Mai||Les mois prennent une majuscule, et im va devant un mois seul.
>=Du premier au trois août.|Vom ersten bis zum dritten August.|Von erste bis dritte August.|Am ersten bis zum dritten August.||Pour une période de dates : vom … bis zum … . Am ne marque pas le début d’une période.
@H0
!Am est la contraction de :|an dem|an der|auf dem||Am = an dem. Les autres groupes ne se contractent pas en am.
#4 study-4-3
@R
=Avez-vous le temps mardi ?|Haben Sie am Dienstag Zeit?|Haben Sie um Dienstag Zeit?|Haben Sie im Dienstag Zeit?||am + jour. Um sert pour l’heure, im pour un mois.
!Que signifie übermorgen ?|après-demain|demain|aujourd’hui||heute = aujourd’hui, morgen = demain, übermorgen = après-demain.
>=Le rendez-vous est vendredi à quinze heures.|Der Termin ist am Freitag um fünfzehn Uhr.|Der Termin ist um Freitag am fünfzehn Uhr.|Der Termin ist im Freitag um fünfzehn Uhr.||am + jour, um + heure. Les autres phrases inversent ou remplacent ces petits mots.
@H0
=Je n’ai pas le temps.|Ich habe keine Zeit.|Ich habe nicht Zeit.|Ich habe kein Zeit.||Zeit est un nom féminin sans article : keine Zeit. Nicht ne nie pas un nom ici, et kein n’a pas la terminaison du féminin.
>=Je ne peux pas venir.|Ich kann nicht kommen.|Ich kann kein kommen.|Ich nicht kann kommen.||Nicht nie la possibilité de venir. Kein va seulement devant un nom, et kann doit rester en deuxième position.
@H1
Wir treffen ___ vor der Bibliothek.|uns|wir|unser|Nous nous retrouvons devant la bibliothèque.|Avec treffen, uns indique qu’on se retrouve ensemble. Wir est le sujet, unser un possessif.
>=Je voudrais te voir.|Ich möchte dich treffen.|Ich möchte du treffen.|Ich möchte treffen dich.||Dich est l’objet de treffen, et treffen reste à l’infinitif à la fin. Du est la forme du sujet.
@P
?Laquelle signifie 5 heures ?|fünf Uhr|halb fünf|Viertel vor fünf||halb fünf = 4 h 30, Viertel vor fünf = 4 h 45. Accentue fünf et Uhr.
#5 study-5-0
@R
Das ist ___ Schwester.|meine|mein|meinen|C’est ma sœur.|Schwester est féminin : meine. Mein va avec un masculin ou un neutre, meinen avec un masculin objet.
Ich habe ___ Bruder.|einen|ein|eine|J’ai un frère.|Après haben, le masculin devient einen. Ein ne change pas ici, eine est féminin.
>Das sind ___ Kinder.|meine|mein|meinen|Ce sont mes enfants.|Au pluriel, le possessif prend -e : meine Kinder.
@H0
Ich wohne mit ___ Frau in Bonn.|meiner|meine|meinen|J’habite à Bonn avec ma femme.|Mit demande le datif : meine devient meiner. Meine et meinen ne suivent pas mit ici.
>Ich wohne mit ___ Mutter zusammen.|meiner|meine|mein|J’habite avec ma mère.|Après mit, le groupe féminin prend -er : meiner Mutter.
@H1
=Lena parle de son père : c’est mon père.|Das ist mein Vater.|Das ist meine Vater.|Das ist meinen Vater.||La terminaison dépend du nom Vater, masculin, pas de Lena qui parle. Après das ist, pas d’accusatif.
>Ich besuche ___ Vater.|meinen|mein|meine|Je rends visite à mon père.|Vater est l’objet direct : mein devient meinen.
#5 study-5-1
@R
!Que signifie verheiratet ?|marié|divorcé|célibataire||verheiratet = marié. Ledig signifie célibataire, geschieden divorcé.
!Ton lieu de naissance est Paris. Dans quel champ l’écris-tu ?|Geburtsort|Geburtsdatum|Familienstand||Ort = lieu : Geburtsort. Geburtsdatum attend une date, Familienstand l’état civil.
>!Lena est ton prénom. Dans quel champ l’écris-tu ?|Vorname|Familienname|Familienstand||Vorname = prénom. Familienname est le nom de famille, Familienstand l’état civil.
>!Que signifie ledig ?|célibataire|marié|divorcé||ledig = célibataire. Marié se dit verheiratet, divorcé geschieden.
#5 Possessifs utiles
@R
Paul und ___ Schwester wohnen in Bonn.|seine|ihre|seinen|Paul et sa sœur habitent à Bonn.|Le possesseur est Paul : sein. Schwester est féminin : seine. Ihre renverrait à une femme.
Anna besucht ___ Bruder.|ihren|seinen|ihre|Anna rend visite à son frère.|Le possesseur est Anna : ihr. Bruder masculin objet direct : ihren.
>Wo wohnen ___ Eltern, Herr Weber?|Ihre|Ihr|Ihren|Où habitent vos parents, Monsieur Weber ?|Ihr de politesse prend une majuscule ; Eltern est un pluriel sujet : Ihre.
#5 haben – conjugaison
@R
___ du Zeit?|Hast|Habt|Hat|As-tu le temps ?|Avec du : hast. Habt va avec ihr, hat avec er ou sie.
Anna ___ zwei Kinder.|hat|hast|haben|Anna a deux enfants.|Avec er ou sie : hat. Hast va avec du, haben avec wir ou Sie.
>Habt ___ einen Hund?|ihr|du|wir|Avez-vous un chien, vous deux ?|Habt va avec ihr. Du demande hast, wir demande haben.
@P
?Dans quel mot le ch est-il un souffle léger ?|ich|Kinder|Kaffee||Le ch de ich est un souffle léger. Kinder et Kaffee commencent par un k dur.
>Wir ___ heute keine Zeit.|haben|habt|hat|Nous n’avons pas le temps aujourd’hui.|Avec wir : haben. Habt va avec ihr, hat avec er ou sie.
>Ich ___ eine Frage.|habe|hat|hast|J’ai une question.|Avec ich : habe.
#6 study-6-0
@R
Ich hätte gern ___ Saft.|einen|ein|eine|Je voudrais un jus.|Saft est masculin ; comme objet direct, ein devient einen. Eine est féminin.
Ich nehme ___ Salat.|den|der|die|Je prends la salade.|Der Salat est masculin : den à l’accusatif. Die suivrait le français, mais Salat n’est pas féminin.
>Ich möchte ___ Brot.|ein|einen|eine|Je voudrais un pain.|Brot est neutre : ein ne change pas à l’accusatif.
@H0
Was ___ Sie gern?|hätten|hätte|hättest|Que désirez-vous ?|Avec Sie : hätten. Hätte va avec ich ou er/sie, hättest avec du.
>Wir ___ gern zwei Kaffee.|hätten|hätte|hättet|Nous voudrions deux cafés.|Avec wir : hätten. Hättet va avec ihr.
#6 study-6-1
@R
=Un café sans sucre, s’il vous plaît.|Einen Kaffee ohne Zucker, bitte.|Einen Kaffee mit Zucker, bitte.|Einen Kaffee kein Zucker, bitte.||ohne = sans, mit = avec. Kein ne remplace pas ohne dans une commande.
!Que demandes-tu avec « Die Rechnung, bitte » ?|l’addition|le menu|une autre boisson||Rechnung = addition. Le menu se dit Speisekarte.
>=Encore un thé, s’il vous plaît.|Noch einen Tee, bitte.|Mehr ein Tee, bitte.|Noch keinen Tee, bitte.||Noch + produit demande une unité de plus. Keinen dirait que tu n’en veux pas.
@P
?Dans quel mot entends-tu ü ?|Frühstück|Fleisch|Brot||Frühstück contient ü : lèvres arrondies, comme dans « tu ».
>Ein Brötchen ___ Butter, bitte.|mit|ohne|für|Un petit pain avec du beurre, s’il vous plaît.|mit = avec. Ohne dirait sans beurre, für signifie pour.
#7 study-7-0
@R
=Combien coûte le pain ?|Wie viel kostet das Brot?|Wie viele kostet das Brot?|Wie viel kosten das Brot?||Wie viel demande un prix ; Brot est au singulier : kostet. Wie viele demande un nombre.
!Comment lire 4,50 € ?|vier Euro fünfzig|vierzig Euro fünf|vier Komma fünf Euro||La virgule sépare euros et centimes : vier Euro fünfzig.
>Wie viele ___ möchten Sie?|Flaschen|Flasche|Fläschen|Combien de bouteilles voulez-vous ?|Wie viele demande un nombre : le nom est au pluriel, Flaschen.
>!Que demande « Wie viele Äpfel? » ?|un nombre de pommes|le prix des pommes|la couleur des pommes||Wie viele demande un nombre. Le prix se demande avec Wie viel kostet …?
#7 study-7-1
@R
=Avez-vous cela en taille 38 ?|Haben Sie das in Größe achtunddreißig?|Haben Sie das im Größe achtunddreißig?|Haben Sie das in Größe dreiundachtzig?||in Größe + nombre ; 38 = achtunddreißig. Dreiundachtzig signifie 83.
!Que signifie « im ersten Stock » ?|au premier étage|au premier rayon|à la première caisse||Stock = étage. La caisse se dit Kasse.
>=Je cherche une veste.|Ich suche eine Jacke.|Ich suche einen Jacke.|Ich sucht eine Jacke.||Jacke est féminin : eine. Avec ich, le verbe est suche.
@H0
Die rote Jacke ist zu teuer. Ich nehme die ___.|blaue|blau|blauen|La veste rouge est trop chère. Je prends la bleue.|Après die, la couleur prend -e : die blaue, comme die rote Jacke.
>=La veste rouge est trop chère.|Die rote Jacke ist zu teuer.|Die rot Jacke ist zu teuer.|Die Jacke rote ist zu teuer.||La couleur se place devant le nom et prend -e : die rote Jacke.
@H1
!Dans « Das ist zu klein », zu signifie :|trop|à|pour||Devant un adjectif, zu signifie trop. Il n’indique pas une destination ici.
>=C’est trop grand.|Das ist zu groß.|Das ist sehr groß.|Das ist nach groß.||zu = trop, sehr = très. Nach n’a pas ce sens.
@P
?Dans quel mot entends-tu « oï » ?|teuer|Tee|Tasche||eu se prononce « oï » dans teuer. Tee a un e long, Tasche un a.
#8 study-8-0
@R
Die Wohnung hat ___ Garten.|einen|ein|eine|L’appartement a un jardin.|Garten est masculin : après hat, einen. Eine est féminin.
!Dans une annonce, « Die Wohnung ist frei » signifie :|l’appartement est disponible|l’appartement est gratuit|l’appartement est sans meubles||Dans une annonce, frei signifie disponible, pas forcément gratuit.
>!« zwei Schlafzimmer » signifie :|deux chambres|deux pièces|deux salles de bains||Schlafzimmer = chambre ; Zimmer seul = pièce.
@H0
Die Wohnung hat ___ Garage.|keine|keinen|kein|L’appartement n’a pas de garage.|Garage est féminin en allemand : keine. Keinen est masculin.
>Das Haus hat ___ Bad.|kein|keinen|keine|La maison n’a pas de salle de bains.|Bad est neutre : kein, même après hat.
@H1
Ich suche eine Wohnung mit drei ___.|Zimmern|Zimmer|Zimmers|Je cherche un appartement de trois pièces.|Après mit au pluriel, Zimmer reçoit un n : Zimmern.
>=Je cherche un appartement de quatre pièces.|Ich suche eine Wohnung mit vier Zimmern.|Ich suche eine Wohnung mit vier Zimmer.|Ich suche eine Wohnung von vier Zimmern.||mit + datif pluriel : Zimmern. Von suit le français mais ne convient pas ici.
#8 study-8-1
@R
=Quand puis-je voir la chambre ?|Wann kann ich das Zimmer sehen?|Wann ich kann das Zimmer sehen?|Wann kann ich sehen das Zimmer?||Wann + kann + ich ; sehen reste à la fin.
!« Nebenkosten inklusive » signifie :|charges comprises|charges en plus|sans charges||inklusive = compris : les charges sont dans le prix.
>=Quel est le montant du loyer ?|Wie hoch ist die Miete?|Wie viel ist hoch die Miete?|Wie hoch die Miete ist?||Formule fixe : Wie hoch ist die Miete? Le verbe ist suit directement Wie hoch.
>Wann kann ich ___?|kommen|komme|kommst|Quand puis-je venir ?|Après kann, le deuxième verbe reste à l’infinitif à la fin.
#8 Articles à l’accusatif
@R
Ich habe ___ Tisch.|einen|ein|eine|J’ai une table.|Tisch est masculin : einen à l’accusatif.
Ich sehe ___ Küche.|die|den|der|Je vois la cuisine.|Küche est féminin : die ne change pas à l’accusatif.
>Wir haben ___ Auto.|kein|keinen|keine|Nous n’avons pas de voiture.|Auto est neutre : kein ne change pas à l’accusatif.
@P
?Dans quel mot w se prononce comme le v français ?|Wohnung|viele|Vater||w = v français. Dans viele et Vater, v se prononce f.
>Ich suche ___ Wohnung.|eine|einen|ein|Je cherche un appartement.|Wohnung est féminin en allemand : eine, même si appartement est masculin en français.
#9 study-9-0
@R
=Prenez la deuxième rue à gauche.|Nehmen Sie die zweite Straße links.|Nehmen die zweite Straße links Sie.|Sie nehmen die zweite Straße links?||Consigne polie : le verbe vient en premier, suivi de Sie.
!Que signifie geradeaus ?|tout droit|à droite|en arrière||geradeaus = tout droit, rechts = à droite, zurück = en arrière.
>Gehen Sie ___ geradeaus und dann nach links.|zuerst|dann|zurück|Allez d’abord tout droit, puis à gauche.|zuerst = d’abord, dann = ensuite. La deuxième étape commence déjà par dann.
@H0
Paul, ___ geradeaus!|geh|gehst|gehen Sie|Paul, va tout droit !|Avec un proche : geh, sans du. Gehen Sie est poli, gehst n’est pas une consigne.
>___ den Bus, Lena!|Nimm|Nehm|Nimmst|Prends le bus, Lena !|Pour un proche, nehmen devient nimm.
@H1
Ich gehe ___ Post.|zur|zum|zu|Je vais à la poste.|Post est féminin : zu + der = zur.
>Wie komme ich ___ Hotel?|zum|zur|zu den|Comment aller à l’hôtel ?|Hotel est neutre : zu + dem = zum.
#9 study-9-1
@R
!Que signifie « Der Zug hat Verspätung » ?|le train a du retard|le train est annulé|le train part de la voie trois||Verspätung = retard.
!Que signifie Gleis ?|voie|ligne|arrêt||Gleis = voie, Linie = ligne.
>=Prenez la ligne cinq.|Nehmen Sie die Linie fünf.|Nehmen Sie das Gleis fünf.|Nehmen Sie den Linie fünf.||Linie = ligne, nom féminin : die Linie. Gleis signifie voie.
@H0
Du ___ mit dem Bus.|fährst|fahrst|fahren|Tu prends le bus.|Avec du, a devient ä : fährst.
>Wir ___ nach Berlin.|fahren|fähren|fahrt|Nous allons à Berlin.|Avec wir, pas d’Umlaut : fahren.
@H1
Ich fahre mit ___ Bahn.|der|die|dem|Je prends le train.|Mit demande le datif : die Bahn devient der Bahn.
>Anna fährt mit ___ Bus.|dem|den|der|Anna prend le bus.|Der Bus devient mit dem Bus.
@H2
Sie ___ in Köln umsteigen.|müssen|muss|müsst|Vous devez changer à Cologne.|Avec Sie : müssen ; umsteigen reste à la fin.
>=Vous devez changer ici.|Sie müssen hier umsteigen.|Sie müssen umsteigen hier.|Sie umsteigen hier müssen.||L’infinitif umsteigen se place à la fin, müssen en deuxième position.
@P
?Dans quel mot st se prononce « cht » ?|Straße|Fenster|Post||Au début du mot, st se prononce « cht ». Dans Fenster et Post, st reste « st ».
#10 study-10-0
@R
Ich arbeite ___ Lehrerin.|als|wie|bei|Je travaille comme enseignante.|als introduit le métier. Wie compare, bei indique un lieu ou une entreprise.
=Je suis vendeur.|Ich bin Verkäufer.|Ich bin als Verkäufer.|Ich Verkäufer bin.||Avec sein, le métier vient sans article et sans als.
>=Je travaille de neuf heures à dix-sept heures.|Ich arbeite von neun bis siebzehn Uhr.|Ich arbeite um neun bis siebzehn Uhr.|Ich arbeite von neun zu siebzehn Uhr.||von … bis … indique le début et la fin.
@H0
Anna arbeitet ___ Krankenhaus.|im|in der|am|Anna travaille à l’hôpital.|Das Krankenhaus est neutre : in dem devient im.
>Paul arbeitet ___ Schule.|in der|im|in die|Paul travaille à l’école.|Die Schule devient der Schule après in : in der Schule.
#10 study-10-1
@R
Heute ___ ich später.|komme|kommen|kommst|Aujourd’hui, j’arrive plus tard.|Après Heute, le verbe reste en deuxième position, avant ich.
!« Ich habe heute frei » signifie :|je suis en congé aujourd’hui|je suis libre ce soir|j’arrive en retard aujourd’hui||heute frei haben = être en congé aujourd’hui.
>=Je suis là à huit heures.|Ich bin um acht Uhr da.|Ich bin am acht Uhr da.|Ich da bin um acht Uhr.||um + heure ; le verbe bin reste en deuxième position.
@H0
=Veuillez prévenir mon chef.|Bitte informieren Sie meinen Chef.|Bitte Sie informieren meinen Chef.|Bitte informiert Sie meinen Chef.||Demande polie : le verbe en -en vient avant Sie.
>Bitte ___ Sie Frau Weber.|informieren|informiert|informiere|Veuillez prévenir Madame Weber.|Avec Sie, le verbe garde la forme en -en.
@H1
Bitte informieren Sie meinen ___.|Kollegen|Kollege|Kolleges|Veuillez prévenir mon collègue.|Comme objet direct, der Kollege devient den Kollegen.
>Bitte informieren Sie ___ Kollegen.|meinen|mein|meine|Veuillez prévenir mon collègue.|Accusatif masculin : mein devient meinen.
#10 Verbes réguliers au présent
@R
Wo ___ ihr?|wohnt|wohnen|wohnst|Où habitez-vous, vous deux ?|Avec ihr, la terminaison est -t.
___ Sie aus Italien, Herr Rossi?|Kommen|Kommt|Kommst|Venez-vous d’Italie, Monsieur Rossi ?|Sie de politesse prend la forme en -en.
>Ihr ___ heute.|arbeitet|arbeitest|arbeiten|Vous travaillez aujourd’hui.|Avec ihr : arbeitet, avec le e ajouté après le t du radical.
@H0
Du ___ in Bonn.|arbeitest|arbeitst|arbeiten|Tu travailles à Bonn.|Le radical finit en t : un e s’ajoute devant -st.
>Er ___ im Büro.|arbeitet|arbeit|arbeiten|Il travaille au bureau.|Après le t du radical, on ajoute -et.
@P
?Dans quel mot la fin -er est-elle peu accentuée ?|Lehrer|Berlin|Erika||Dans Lehrer, l’accent tombe sur Leh- et -er final reste faible.
#11 study-11-0
@R
=J’apprends l’allemand depuis lundi.|Ich lerne seit Montag Deutsch.|Ich lerne vor Montag Deutsch.|Ich habe seit Montag Deutsch.||seit + présent : l’action a commencé lundi et continue. Vor signifie il y a.
!Que demande « Wie lange? » ?|une durée|une heure|un lieu||Wie lange demande combien de temps. Wann demande quand, wo demande où.
>Der Kurs ist ___ Nachmittag.|am|im|um|Le cours a lieu l’après-midi.|am Vormittag, am Nachmittag, am Abend.
@H0
Ich lerne seit drei ___ Deutsch.|Monaten|Monate|Monat|J’apprends l’allemand depuis trois mois.|seit + datif pluriel : Monate reçoit un n, Monaten.
>Ich wohne seit zwei ___ in Wien.|Jahren|Jahre|Jahr|J’habite à Vienne depuis deux ans.|seit + datif pluriel : Jahre reçoit un n, Jahren.
#11 study-11-1
@R
=Que veut dire Fenster ?|Was bedeutet Fenster?|Wie bedeutet Fenster?|Was bedeutest Fenster?||Was bedeutet … ? demande le sens d’un mot.
!Hausaufgaben est :|un pluriel : les devoirs|un singulier : un devoir|un verbe : faire les devoirs||Hausaufgaben est pluriel ; on dit Ich mache Hausaufgaben.
>Paul ___ ein Wörterbuch.|braucht|brauche|brauchst|Paul a besoin d’un dictionnaire.|Avec er : braucht.
@H0
Anna ___ die Zeitung.|liest|lest|lesen|Anna lit le journal.|Avec er/sie, e devient ie : liest.
>Ihr ___ den Text.|lest|liest|lesen|Vous lisez le texte.|Avec ihr : lest, sans ie.
@H1
Ich bringe mein Buch ___.|mit|zu|an|J’apporte mon livre.|mitbringen se sépare : mit à la fin.
>=Peux-tu apporter un stylo ?|Kannst du einen Stift mitbringen?|Kannst du einen Stift bringen mit?|Kannst du mitbringen einen Stift?||Après können, mitbringen reste entier à la fin.
@P
?Quel mot se prononce avec « oï » ?|heute|Haus|heiß||eu se prononce « oï » (heute). au se prononce « ao » (Haus), ei « aï » (heiß).
#12 study-12-0
@R
=Je n’aime pas nager.|Ich schwimme nicht gern.|Ich nicht gern schwimme.|Ich schwimme gern nicht.||nicht gern se place après le verbe, dans cet ordre.
=Je préfère lire.|Ich lese lieber.|Ich lieber lese.|Ich lese gern mehr.||lieber marque la préférence et suit le verbe.
>Ich spiele ___ Tennis.|gern|lieb|Liebe|J’aime jouer au tennis.|gern après le verbe signifie aimer faire l’activité.
@H0
Ich gehe ___ Kino.|ins|im|in|Je vais au cinéma.|Destination avec un nom neutre : ins = in das.
>!Ins Kino est la contraction de :|in das Kino|in dem Kino|in den Kino||ins = in das ; Kino est neutre.
#12 study-12-1
@R
Am Sonntag ___ ich Tennis.|spiele|spielst|spielen|Dimanche, je joue au tennis.|Après Am Sonntag, le verbe reste en deuxième position, avant ich.
=Ce soir, je lis un livre.|Heute Abend lese ich ein Buch.|Heute Abend ich lese ein Buch.|Heute Abend lese ein Buch ich.||Verbe en deuxième position, puis ich.
>___ du am Sonntag Zeit?|Hast|Hat|Habt|As-tu le temps dimanche ?|Avec du : hast.
@H0
Wollen wir zusammen ___?|kochen|kochst|kocht|On cuisine ensemble ?|Après wollen, l’autre verbe reste à l’infinitif à la fin.
>=On va nager ?|Wollen wir schwimmen gehen?|Wollen wir gehen schwimmen?|Wollen wir schwimmen gehst?||Les deux infinitifs se placent à la fin, gehen en dernier.
@H1
Ich gehe ___ Hause.|nach|zu|in|Je rentre à la maison.|Direction : nach Hause. Zu Hause indique le lieu où l’on est.
>Ich bin heute ___ Hause.|zu|nach|im|Je suis à la maison aujourd’hui.|Lieu où l’on est : zu Hause.
@P
?Dans quel mot sp se prononce « chp » ?|spielen|Wespe|Espresso||Au début du mot, sp se prononce « chp ». Au milieu d’un mot, il reste souvent « sp ».
#13 study-13-0
@R
=Je voudrais réserver deux chambres individuelles.|Ich möchte zwei Einzelzimmer reservieren.|Ich möchte reservieren zwei Einzelzimmer.|Ich möchte zwei Doppelzimmer reservieren.||reservieren se place à la fin. Doppelzimmer signifie chambre double.
!Une chambre pour une personne s’appelle :|Einzelzimmer|Doppelzimmer|Schlafzimmer||Einzelzimmer = chambre individuelle. Schlafzimmer est la chambre d’un logement.
>=Du trois au cinq mai.|Vom dritten bis zum fünften Mai.|Von dritten bis fünften Mai.|Am dritten bis zum fünften Mai.||Pour une période de dates : vom … bis zum … .
@H0
=Pour trois personnes.|Für drei Personen.|Für drei Person.|Um drei Personen.||für = pour ; au pluriel, Person devient Personen.
>Ich möchte ein Zimmer für vier ___.|Nächte|Nachts|Nachten|Je voudrais une chambre pour quatre nuits.|Nacht devient Nächte au pluriel.
#13 study-13-1
@R
Der Zug fährt um neun Uhr ___.|ab|an|aus|Le train part à neuf heures.|abfahren se sépare : ab à la fin. An servirait pour l’arrivée.
Wann ___ der Bus an?|kommt|kommen|ankommt|Quand le bus arrive-t-il ?|ankommen se sépare : kommt … an.
>!Que demande « Wie lange dauert die Fahrt? » ?|la durée du trajet|l’heure de départ|le prix du billet||dauern = durer ; une heure de départ n’est pas une durée.
@P
?Dans quel mot le a est-il long ?|fahren|Nacht|acht||Dans fahren, a est long. Dans Nacht et acht, a est bref.
>Der Zug kommt um elf Uhr ___.|an|ab|auf|Le train arrive à onze heures.|ankommen se sépare : an à la fin. Ab servirait pour le départ.
#14 study-14-0
@R
=Je suis fatigué.|Ich bin müde.|Ich habe müde.|Ich müde bin.||Un état se dit avec sein : Ich bin müde.
Ich habe ___.|Husten|krank|müde|J’ai de la toux.|Après habe vient un nom de symptôme. Krank et müde vont avec sein.
>=Depuis quand ?|Seit wann?|Vor wann?|Wie seit?||Seit wann? demande depuis quand.
@H0
Ich bin seit drei ___ krank.|Tagen|Tage|Tag|Je suis malade depuis trois jours.|seit + datif pluriel : Tagen.
>!« Ich bin seit zwei Tagen krank » veut dire :|je suis malade depuis deux jours|je serai malade deux jours|j’étais malade il y a deux jours||seit + présent : la situation continue.
#14 study-14-1
@R
=J’ai besoin d’un rendez-vous.|Ich brauche einen Termin.|Ich brauche ein Termin.|Ich brauche eine Termin.||Termin est masculin : einen à l’accusatif.
=Je ne peux pas venir demain.|Ich kann morgen nicht kommen.|Ich kann morgen kommen nicht.|Ich nicht kann morgen kommen.||kann en deuxième position, nicht avant l’infinitif final.
>?Que dit-on à une personne malade ?|Gute Besserung!|Guten Appetit!|Gute Reise!||Gute Besserung = bon rétablissement.
@H0
Ich habe einen Termin ___ Arzt.|beim|bei|bei der|J’ai un rendez-vous chez le médecin.|bei + dem = beim.
>!Beim est la contraction de :|bei dem|bei den|bei der||beim = bei dem.
@P
?Dans quel mot h est-il un souffle audible ?|Hals|weh|Uhr||Au début de Hals, h se prononce. Dans weh et Uhr, h indique une voyelle longue.
#15 study-15-0
@R
=Pouvez-vous venir samedi ?|Können Sie am Samstag kommen?|Können Sie kommen am Samstag?|Kannst Sie am Samstag kommen?||Avec Sie : können ; kommen reste à la fin.
Ich feiere am Freitag ___.|Geburtstag|Geburtsdatum|Geburtsort|Je fête mon anniversaire vendredi.|Geburtstag = anniversaire.
>?Comment commencer un message à ton amie Anna ?|Liebe Anna,|Lieber Anna,|Sehr geehrte Anna,||Liebe pour une femme ; Sehr geehrte est trop formel pour une amie.
@H0
Die Party ist bei ___.|mir|ich|mich|La fête est chez moi.|bei demande le datif : mir.
>!« bei mir » signifie :|chez moi|avec moi|vers moi||bei mir = chez moi.
#15 study-15-1
@R
Ich bringe einen Salat ___.|mit|zu|an|J’apporte une salade.|mitbringen se sépare : mit à la fin.
=Volontiers, je viens.|Ich komme gern.|Ich gern komme.|Gern ich komme.||Le verbe reste en deuxième position ; gern suit le verbe.
>?Quelle phrase refuse une invitation ?|Leider kann ich nicht kommen.|Ich komme gern.|Vielen Dank für die Einladung.||Leider … nicht kommen refuse. Les autres acceptent ou remercient.
@H0
Du ___ heute arbeiten.|musst|muss|müsst|Tu dois travailler aujourd’hui.|Avec du : musst.
>Wir ___ am Samstag arbeiten.|müssen|muss|müsst|Nous devons travailler samedi.|Avec wir : müssen.
@H1
___ ich einen Kuchen mitbringen?|Soll|Sollst|Sollen|Dois-je apporter un gâteau ?|Avec ich : soll, sans terminaison.
>=Dois-je apporter des boissons ?|Soll ich Getränke mitbringen?|Soll ich mitbringen Getränke?|Soll ich Getränke bringen mit?||Après soll, mitbringen reste entier à la fin.
@H2
!« Ich freue mich auf die Feier » signifie :|je me réjouis de la fête|je suis à la fête|j’organise la fête||sich freuen auf = se réjouir de.
>=Écris-moi, s’il te plaît.|Bitte schreib mir.|Bitte schreibst mir.|Bitte schreib mich.||Consigne à un proche : schreib ; à moi = mir.
@P
?Quel mot se termine par -ung ?|Einladung|einladen|eingeladen||Le -ng final de Einladung forme un seul son nasal.
#16 study-16-0
@R
!« Parken verboten » signifie :|interdit de stationner|stationnement autorisé|parking réservé||verboten = interdit.
!« Nur für Mitarbeiter » signifie :|réservé au personnel|interdit au personnel|ouvert à tous||nur limite l’accès.
>!Que signifie Ausgang ?|sortie|entrée|caisse||Ausgang = sortie, Eingang = entrée.
@H0
Hier ___ man nicht rauchen.|darf|dürfen|darfst|Ici, on n’a pas le droit de fumer.|man prend la forme du singulier : darf.
>Wir ___ hier parken.|dürfen|darf|dürft|Nous avons le droit de stationner ici.|Avec wir : dürfen.
#16 study-16-1
@R
!« Geöffnet ab 10 Uhr » signifie :|ouvert à partir de 10 h|ouvert jusqu’à 10 h|fermé à 10 h||ab = à partir de.
!« Am Sonntag geschlossen » signifie :|fermé le dimanche|ouvert le dimanche|fermé à partir de dimanche||geschlossen = fermé ; am Sonntag = le dimanche.
>=Ouvert de huit heures à midi.|Geöffnet von acht bis zwölf Uhr.|Geöffnet ab acht bis zwölf Uhr.|Geöffnet um acht bis zwölf Uhr.||Une plage horaire : von … bis … .
@H0
Der Bus ___ heute aus.|fällt|fallt|fallen|Le bus est annulé aujourd’hui.|Avec der Bus : fällt ; aus à la fin.
>!« Der Kurs fällt aus » signifie :|le cours est annulé|le cours sort|le cours commence||ausfallen = être annulé.
@P
?Dans quel mot entends-tu ö ?|geöffnet|geschlossen|offen||geöffnet contient ö, lèvres arrondies.
#17 study-17-0
@R
___ ich die Tür schließen?|Kann|Kannst|Können|Puis-je fermer la porte ?|Avec ich : kann, sans -st.
Können Sie ___ bitte helfen?|mir|mich|ich|Pouvez-vous m’aider ?|helfen demande le datif : mir.
>=Pouvez-vous me rappeler ?|Können Sie mich zurückrufen?|Können Sie mir zurückrufen?|Können Sie ich zurückrufen?||Avec zurückrufen, la personne est l’objet direct : mich.
@H0
Können Sie mir bitte ___ Schlüssel geben?|den|der|dem|Pouvez-vous me donner la clé, s’il vous plaît ?|Der Schlüssel est masculin ; objet donné : den.
>Kannst du ___ das Buch geben?|mir|mich|ich|Peux-tu me donner le livre ?|Le destinataire est au datif : mir.
#17 study-17-1
@R
?Quelle réponse accepte une demande ?|Ja, natürlich.|Tut mir leid, das geht nicht.|Leider nicht.||Ja, natürlich accepte ; les autres refusent.
?Quelle réponse refuse poliment ?|Tut mir leid, das geht nicht.|Gern, hier bitte.|Ja, natürlich.||Tut mir leid, das geht nicht refuse poliment.
>!« Einen Moment, bitte » signifie :|un instant, s’il vous plaît|encore une fois, s’il vous plaît|oui, bien sûr||Moment = instant.
@P
!Dans « Können Sie mir bitte helfen? », quel mot accentuer ?|helfen|bitte|Sie||Accentue l’action demandée, helfen ; bitte reste léger.
>?Tu n’as pas compris. Que dis-tu ?|Noch einmal, bitte.|Einen Moment, bitte.|Tut mir leid, das geht nicht.||Noch einmal, bitte demande de répéter. Einen Moment, bitte demande d’attendre ; Tut mir leid, das geht nicht refuse une demande.
#18 study-18-0
@R
=Écoutez le dialogue.|Hören Sie den Dialog.|Sie hören den Dialog.|Hört Sie den Dialog.||Une consigne commence par le verbe : Hören Sie.
___ Sie die richtige Antwort an.|Kreuzen|Ankreuzen|Kreuzt|Cochez la bonne réponse.|ankreuzen se sépare : Kreuzen … an.
>!« Richtig oder falsch? » demande :|si une phrase est vraie ou fausse|de choisir une image|d’écrire un texte||richtig = vrai, falsch = faux.
@H0
Schreiben Sie bitte Ihren ___.|Vornamen|Vorname|Vornamens|Écrivez votre prénom, s’il vous plaît.|Comme Name, Vorname prend -n quand il est l’objet.
>Wie ist ___ Name?|Ihr|Ihren|Ihre|Quel est votre nom ?|Name est ici le sujet : Ihr, sans -en.
#18 study-18-1
@R
Zuerst ___ ich den Text.|lese|lesen|liest|D’abord, je lis le texte.|Après Zuerst, le verbe vient avant ich.
=Ensuite, je note les mots.|Dann schreibe ich die Wörter.|Dann ich schreibe die Wörter.|Dann schreibe die Wörter ich.||Après Dann, le verbe vient en deuxième position, puis ich.
>!Que faut-il ajouter aux trois points du message ?|une salutation et une formule de fin|un titre et une date|ton adresse complète||Le message A1 commence par une salutation (Liebe Anna,) et finit par une formule (Viele Grüße). Un titre ou une adresse ne sont pas demandés.
@P
!Dans « Lesen Sie die Aufgabe », quel mot donne l’action ?|Lesen|Sie|die||Repère d’abord l’action : lesen.
>Zum Schluss ___ ich die Antworten.|prüfe|prüfen|prüft|Pour finir, je vérifie les réponses.|Après Zum Schluss, le verbe vient avant ich : prüfe.
#19 study-19-0
@R
Mein Bauch ___ weh.|tut|tun|tust|J’ai mal au ventre.|Au singulier : tut weh.
Meine Füße ___ weh.|tun|tut|tue|J’ai mal aux pieds.|Au pluriel : tun weh.
>___ Rücken tut weh.|Mein|Meine|Meinen|J’ai mal au dos.|Rücken est masculin et sujet : mein.
>=J’ai mal à la tête.|Ich habe Kopfschmerzen.|Ich habe Kopf weh.|Mein Kopf tun weh.||Ich habe Kopfschmerzen convient. Mein Kopf demande tut weh, au singulier.
#19 study-19-1
@R
=J’ai de la fièvre depuis lundi.|Ich habe seit Montag Fieber.|Ich habe vor Montag Fieber.|Ich bin seit Montag Fieber.||seit = depuis ; Fieber se dit avec haben.
!« die nächste Apotheke » signifie :|la pharmacie la plus proche|la prochaine ordonnance|la pharmacie de garde||nächste = la plus proche.
>Ich ___ Tabletten gegen Husten.|brauche|braucht|brauchen|J’ai besoin de comprimés contre la toux.|Avec ich : brauche.
@H0
Nehmen Sie ___ Tabletten zweimal am Tag.|diese|dieser|dies|Prenez ces comprimés deux fois par jour.|Pluriel : diese Tabletten.
>!Dans « diese Tabletten », diese signifie :|ces|mes|vos||diese est un démonstratif, pas un possessif.
@P
?Dans quel mot entends-tu au ?|Bauch|Bein|Buch||Bauch contient au ; Bein contient ei, Buch un u long.
#20 study-20-0
@R
Heute ___ es sonnig.|ist|hat|sind|Aujourd’hui, il fait beau.|Un état se dit avec es ist.
=Il y a du vent.|Es ist windig.|Es windig ist.|Es hat windig.||Es ist + adjectif décrit le temps.
>Heute ___ es.|regnet|ist regnet|regnen|Aujourd’hui, il pleut.|Après Heute, le verbe passe devant es : regnet es.
@H0
Morgen ___ es kalt.|ist|sein|bist|Demain, il fera froid.|Le présent suffit avec morgen : ist.
>=Demain, il pleut.|Morgen regnet es.|Morgen es regnet.|Morgen regnen es.||Verbe en deuxième position, puis es.
@H1
!Dans « Es schneit », es désigne :|un sujet grammatical, comme il dans il neige|la neige|une personne||es est un sujet impersonnel.
>Am Montag schneit ___.|es|er|sie|Lundi, il neige.|Le sujet impersonnel est es.
#20 study-20-1
@R
Ich brauche ___ Pullover.|einen|ein|eine|J’ai besoin d’un pull.|Pullover est masculin : einen après brauchen.
Ich nehme eine Mütze ___.|mit|an|zu|Je prends un bonnet avec moi.|mitnehmen se sépare : mit à la fin.
>Im Sommer trage ich ___ T-Shirt.|ein|einen|eine|En été, je porte un t-shirt.|T-Shirt est neutre : ein.
@H0
___ eine Jacke mit!|Nimm|Nimmst|Nehmen|Prends une veste avec toi !|Consigne à un proche : nimm.
>=Prends une écharpe avec toi.|Nimm einen Schal mit.|Nimm mit einen Schal.|Nimmst einen Schal mit.||Nimm … mit : mit à la fin.
#20 Articles à l’accusatif
@R
Ich brauche ___ Schal.|einen|ein|eine|J’ai besoin d’une écharpe.|Schal est masculin : einen.
Nimm ___ Mütze mit.|die|den|der|Prends le bonnet avec toi.|Mütze est féminin : die.
>Ich habe ___ Regenschirm.|keinen|kein|keine|Je n’ai pas de parapluie.|Regenschirm est masculin : keinen.
@P
?Quel mot contient ei, prononcé « aï » ?|heiß|hier|Bier||heiß contient ei ; hier et Bier ont un i long.
>Ich kaufe ___ Hemd.|ein|einen|eine|J’achète une chemise.|Hemd est neutre en allemand : ein, même si chemise est féminin en français.
#21 study-21-0
@R
Ich ___ lieber Musik.|höre|hören|hörst|Je préfère écouter de la musique.|Avec ich : höre.
Lena ___ gern Romane.|liest|lest|lesen|Lena aime lire des romans.|Avec er/sie : liest.
>!Quel article va avec Museum ?|das|der|die||das Museum est neutre.
>Ich gehe ___ ins Konzert.|gern|lieb|Liebe|J’aime aller au concert.|gern après le verbe dit qu’on aime faire l’activité. Lieb et Liebe ne remplacent pas gern.
#21 study-21-1
@R
___ wir ins Kino gehen?|Wollen|Wollt|Will|On va au cinéma ?|Avec wir : wollen.
!« Das Konzert beginnt um acht » indique :|l’heure de début du concert|l’heure du rendez-vous|le prix d’entrée||beginnen = commencer.
>!Que désigne « der Eintritt » ?|le prix d’entrée|la sortie|le ticket de bus||Eintritt = entrée, prix d’entrée.
@H0
Wir gehen ___ Konzert.|ins|im|in|Nous allons au concert.|Destination : ins = in das.
>=Je vais au musée.|Ich gehe ins Museum.|Ich gehe im Museum.|Ich gehe in Museum.||Destination : ins Museum.
@P
?Dans quel mot entends-tu un i long ?|liest|lesen|lest||liest : ie = i long.
#22 study-22-0
@R
Ich rufe dich morgen ___.|zurück|zurückrufen|rufen|Je te rappelle demain.|zurückrufen se sépare : zurück à la fin.
=Allô, ici Paul.|Hallo, hier ist Paul.|Hallo, hier bin Paul.|Hallo, ich hier Paul.||Formule fixe au téléphone : hier ist + nom.
>Können Sie mich ___?|zurückrufen|zurück rufen|rufen zurück|Pouvez-vous me rappeler ?|Après können, l’infinitif reste entier et en un mot.
@H0
___ mich bitte zurück, Anna!|Ruf|Rufst|Rufen|Rappelle-moi, Anna !|Avec un proche : ruf.
>___ Sie mich bitte zurück, Herr Klein.|Rufen|Ruf|Ruft|Rappelez-moi, Monsieur Klein.|Demande polie : rufen Sie.
@H1
Ich rufe von zu Hause ___.|an|ab|aus|J’appelle depuis la maison.|anrufen : an à la fin.
>!« von zu Hause » signifie :|depuis la maison|vers la maison|à côté de la maison||von = depuis.
#22 study-22-1
@R
=Parlez plus lentement, s’il vous plaît.|Sprechen Sie bitte langsamer.|Sprecht Sie bitte langsamer.|Sprechen bitte Sie langsamer.||Demande polie : Sprechen Sie, puis bitte.
!Que contient un bon SMS de rendez-vous ?|l’heure, le lieu et une demande de réponse|seulement une salutation|une longue présentation||Un SMS clair donne heure, lieu et demande de réponse.
>?Tu écris à un ami. Quelle phrase convient ?|Ich schicke dir eine Nachricht.|Ich schicke Ihnen eine Nachricht.|Ich schicke Sie eine Nachricht.||Avec un proche : dir.
@H0
Ich schicke ___ eine E-Mail, Frau Klein.|Ihnen|Sie|dir|Je vous envoie un e-mail, Madame Klein.|Destinataire formel : Ihnen.
>Kannst du ___ zurückrufen?|mich|mir|ich|Peux-tu me rappeler ?|Objet direct : mich.
@P
!Le z de zurück se prononce :|ts|s|dz||z = « ts ».
#23 study-23-0
@R
Wo ___ ich eine Briefmarke?|bekomme|bekommst|bekommen|Où puis-je obtenir un timbre ?|Avec ich : bekomme.
!Que signifie Ausweis ?|pièce d’identité|formulaire|enveloppe||Ausweis = pièce d’identité.
>Haben Sie ___ Kugelschreiber?|einen|ein|eine|Avez-vous un stylo ?|Kugelschreiber est masculin : einen.
@H0
Ich möchte ___ anmelden.|mich|mir|ich|Je voudrais m’inscrire.|sich anmelden : mich avec ich.
>Füllen Sie bitte die Karte ___.|aus|an|mit|Remplissez la carte, s’il vous plaît.|ausfüllen : aus à la fin.
#23 study-23-1
@R
!« Unterschrift » désigne :|la signature|l’adresse|la date||Unterschrift = signature.
!Que signifie übertragen ?|reporter|signer|lire||übertragen = reporter une information.
>!Pour le champ Geburtsdatum, quelle valeur convient ?|17.04.2000|Paris|0151 234567||Geburtsdatum attend une date.
@P
!Dans ausfüllen, quelle partie porte l’accent ?|aus|fül|len||Le préfixe aus porte l’accent principal.
>!Que signifie unterschreiben ?|signer|remplir|envoyer||unterschreiben = signer. Remplir se dit ausfüllen.
#24 study-24-0
@R
=J’habite à Lyon et je parle français.|Ich wohne in Lyon und ich spreche Französisch.|Ich wohne in Lyon und spreche ich Französisch.|Ich wohne in Lyon aber ich spreche Französisch.||und ajoute une information ; après und, sujet puis verbe.
Ich lerne Deutsch, ___ ich spreche noch nicht gut.|aber|und|oder|J’apprends l’allemand, mais je ne parle pas encore bien.|aber marque une opposition.
>___ kommen Sie? Aus Spanien.|Woher|Wo|Wie|D’où venez-vous ? D’Espagne.|Woher demande l’origine.
>=Je ne comprends pas.|Ich verstehe das nicht.|Ich verstehe nicht das.|Ich nicht verstehe das.||Le verbe reste en deuxième position ; nicht vient en fin de phrase, après das.
#24 study-24-1
@R
!Que faut-il ajouter à la fin d’un message ?|une formule de fin|un titre|une date de naissance||Par exemple Viele Grüße.
=Puis-je apporter une salade ?|Kann ich einen Salat mitbringen?|Kann ich mitbringen einen Salat?|Kann ich einen Salat bringen mit?||Après kann, mitbringen reste entier à la fin.
>!Une réponse à une invitation commence souvent par :|un remerciement|une question sur le prix|le récit de sa journée||On remercie d’abord pour l’invitation.
>Vielen Dank für deine ___.|Einladung|Einladen|eingeladen|Merci pour ton invitation.|Après deine vient un nom : die Einladung.
#24 Ordre des mots
@R
=Demain, je travaille.|Morgen arbeite ich.|Morgen ich arbeite.|Arbeite morgen ich.||Après Morgen, le verbe vient en deuxième position.
=Quand le film commence-t-il ?|Wann beginnt der Film?|Wann der Film beginnt?|Beginnt wann der Film?||Question W : mot interrogatif, verbe, sujet.
>=Habites-tu à Berlin ?|Wohnst du in Berlin?|Wohnt du in Berlin?|Wo wohnst du in Berlin?||Question oui/non : le verbe en premier, puis du ; avec du, le verbe prend -st. Wo pose une autre question (où exactement).
@P
!Où faire une courte pause dans « Ich heiße Claire und komme aus Lyon » ?|avant und|après Ich|entre komme et aus||Une pause sépare deux informations, ici avant und.
`;
  const pages={};let page,anchor;
  for(const line of source.trim().split('\n')){
    if(line.startsWith('#')){const [,lesson,key]=line.match(/^#(\d+) (.+)$/);page=pages[lesson+':'+key]={inline:{},closing:[]};}
    else if(line.startsWith('@'))anchor=line.slice(1);
    else if(line.trim()){
      const closing=line.startsWith('>'),[prompt,answer,w1,w2,context,explanation]=(closing?line.slice(1):line).split('|');
      const kind=prompt[0],text=/[=?!]/.test(kind)?prompt.slice(1):prompt;
      const q=kind==='='?`Choisis la phrase correcte : « ${text} »`:kind==='?'||kind==='!'?text:`${context?`« ${context} » — `:''}Complète : ${text}`;
      const task={type:'choice',q,o:[answer,w1,w2],a:0,answer,explanation,skill:'application',pageCheck:anchor,qualityRevision:149,didacticRevision:162};
      if(kind!=='!')task.audio=kind==='='||kind==='?'?answer:text.replace('___',answer);
      if(context)task.context=context;
      if(closing)page.closing.push(task);else (page.inline[anchor]||=[]).push(task);
    }
  }
  // Drill rows repeat one frame for every person and typed gaps copy the examples just above; the closing practice
  // leaves those gaps to the review, keeps distinct answers and alternates frames.
  const frame=q=>String(q.q).replace(/^.*Complète : /,'').replace(/___|\b(ich|du|er|sie|es|wir|ihr|Ich|Du|Er|Sie|Es|Wir|Ihr)\b/g,'').trim();
  function varied(tasks,cap=8){
    const picked=[],answers=new Set(),frames={},rest=[...tasks];
    while(picked.length<cap){
      const open=rest.filter(q=>!answers.has(q.o[q.a]));if(!open.length)break;
      const next=open.reduce((best,q)=>(frames[frame(q)]||0)<(frames[frame(best)]||0)?q:best);
      picked.push(next);answers.add(next.o[next.a]);frames[frame(next)]=(frames[frame(next)]||0)+1;rest.splice(rest.indexOf(next),1);
    }
    return picked;
  }
  const inline=(lessonId,key)=>pages[lessonId+':'+key]?.inline||null;
  function closing(lessonId,key,tasks){
    // Lesson 1 has six topic pages: a shorter selection keeps the first lesson within one session.
    return [...varied(tasks.filter(q=>q.type!=='gap'),Number(lessonId)===1?5:8),...(pages[lessonId+':'+key]?.closing||[])];
  }
  window.DE_A1_PAGE_CHECKS={pages,inline,closing,varied};
})();
