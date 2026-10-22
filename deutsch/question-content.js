/* Authored German A1 questions, revision 149.
 * Separate practice and transfer banks; no arbitrary neighbouring-sentence distractors.
 * Format: prompt | answer | distractors/context | learning objective.
 */
(() => {
  'use strict';
  const revision=149;
  const parse=source=>{
    const groups={};let key;
    for(const line of source.trim().split('\n')){
      if(line.startsWith('#')){key=line.slice(1);groups[key]=[];}
      else if(line.trim())groups[key].push(line.split('|'));
    }
    return groups;
  };
  const practice=parse(`
#1.0
Du ___ aus Kanada.|kommst|komme|kommen|Tu viens du Canada.
Wir ___ in Berlin.|wohnen|wohnt|wohnst|Nous habitons à Berlin.
Anna ___ Deutsch.|spricht|spreche|sprechen|Anna parle allemand.
Ich komme ___ Kanada.|aus|in|am|Je viens du Canada.
Ich wohne ___ Berlin.|in|aus|am|J’habite à Berlin.
Ich ___ Paul.|heiße|heißt|heißen|Je m’appelle Paul.
#1.1
___ heißen Sie?|Wie|Wo|Woher|Comment vous appelez-vous ?
___ kommen Sie?|Woher|Wo|Wie|D’où venez-vous ?
___ wohnen Sie?|Wo|Woher|Wie|Où habitez-vous ?
Welche Sprachen ___ du?|sprichst|sprechen|sprecht|Quelles langues parles-tu ?
Wie ___ es Ihnen?|geht|gehen|gehst|Comment allez-vous ?
___|Woher kommen Sie?|Woher Sie kommen?|Woher kommt Sie?|Pose une question neutre : D’où venez-vous ?
#2.0
Müller schreibt man ___ Umlaut.|mit|ohne|für|Müller s’écrit avec un tréma.
Mueller schreibt man ___ Umlaut.|ohne|mit|für|Mueller s’écrit sans tréma.
Anna-Maria schreibt man mit ___.|Bindestrich|Doppel-s|Eszett|Anna-Maria s’écrit avec un trait d’union.
Weiß schreibt man mit ___.|Eszett|Doppel-s|Bindestrich|Weiß s’écrit avec un ß.
Meier schreibt man ___ Doppel-s.|ohne|mit|für|Meier s’écrit sans double s.
Anna: Bitte mit ___.|Doppel-n|Doppel-s|Doppel-m|Précise la consonne doublée dans Anna.
#2.1
Kannst du den Namen ___?|buchstabieren|buchstabierst|buchstabiert|Peux-tu épeler le nom ?
Wir können das ___.|wiederholen|wiederholt|wiederhole|Nous pouvons répéter cela.
___|Ich kann Deutsch sprechen.|Ich können Deutsch sprechen.|Ich kann spreche Deutsch.|Je peux parler allemand.
Bitte ___ einmal.|noch|nicht|nur|Encore une fois, s’il vous plaît.
Können Sie bitte langsamer ___?|sprechen|spricht|sprecht|Pouvez-vous parler plus lentement ?
Ihr könnt den Namen ___.|schreiben|schreibt|schreibst|Vous pouvez écrire le nom (plusieurs proches).
#3.0
16 = ___|sechzehn|sechzig|sechsundsechzig|Écris le nombre indiqué.
17 = ___|siebzehn|siebzig|siebenundzehn|Écris le nombre indiqué.
28 = ___|achtundzwanzig|zweiundachtzig|achtzehn|Écris le nombre indiqué.
82 = ___|zweiundachtzig|achtundzwanzig|zweiundzwanzig|Écris le nombre indiqué.
31 = ___|einunddreißig|dreizehn|dreiundzwanzig|Écris le nombre indiqué.
23 = ___|dreiundzwanzig|zweiunddreißig|dreizehn|Écris le nombre indiqué.
#3.1
Berlin gehört in das Feld ___.|Geburtsort|Geburtsdatum|Postleitzahl|Le formulaire demande la ville de naissance.
2000 schreibt man ___.|zweitausend|zweihundert|zwanzig|Écris l’année en lettres.
17.04. = am siebzehnten ___.|April|August|Oktober|Donne le mois de cette date.
10115 ist eine ___.|Postleitzahl|Telefonnummer|Hausnummer|L’adresse est à Berlin, 10115. Nomme le champ de ces cinq chiffres.
null drei null = ___|030|300|003|Transcris chaque chiffre dans le même ordre.
Die Telefonnummer beginnt mit null eins: ___.|01|10|11|Transcris les deux premiers chiffres.
#4.0
04:45 = Viertel ___ fünf.|vor|nach|um|Il est quatre heures quarante-cinq.
04:15 = Viertel ___ vier.|nach|vor|um|Il est quatre heures quinze.
04:30 = halb ___.|fünf|vier|drei|Donne l’heure courante.
10:30 = halb ___.|elf|zehn|neun|Il est dix heures trente.
16:30 = sechzehn Uhr ___.|dreißig|dreizehn|zwanzig|Lis l’heure sur vingt-quatre heures.
Der Termin ist ___ zehn Uhr.|um|am|im|Le rendez-vous est à dix heures.
#4.1
___ Mittwoch habe ich Zeit.|Am|Um|Im|Mercredi, j’ai le temps.
Von Montag ___ Freitag arbeite ich.|bis|am|um|Je travaille du lundi au vendredi.
___ ist Dienstag.|Morgen|Gestern|Heute|Heute ist Montag. Quel jour est demain ?
Heute ist ___.|Samstag|Sonntag|Donnerstag|Aujourd’hui, c’est samedi.
___ Tag ist heute?|Welcher|Welche|Welches|Quel jour sommes-nous ?
Am ___ habe ich Zeit.|Donnerstag|Dienstag|Mittwoch|J’ai le temps jeudi.
#4.2
___ April habe ich Zeit.|Im|Am|Um|En avril, j’ai le temps.
___ siebzehnten April komme ich.|Am|Im|Um|Je viens le dix-sept avril.
Vom ersten ___ zum dritten August.|bis|am|im|Du premier au trois août.
Der zweite Monat ist ___.|Februar|Januar|März|Nomme le deuxième mois.
Der sechste Monat ist ___.|Juni|Juli|Mai|Nomme le sixième mois.
Der zwölfte Monat ist ___.|Dezember|November|September|Nomme le douzième mois.
Der dritte Monat ist ___.|März|Mai|April|Nomme le troisième mois.
Der fünfte Monat ist ___.|Mai|März|Juni|Nomme le cinquième mois.
Der achte Monat ist ___.|August|Juli|September|Nomme le huitième mois.
Der neunte Monat ist ___.|September|Oktober|August|Nomme le neuvième mois.
Der elfte Monat ist ___.|November|Oktober|Dezember|Nomme le onzième mois.
#4.3
Haben Sie ___ Freitag Zeit?|am|um|im|Avez-vous le temps vendredi ?
Wir treffen uns ___ elf Uhr.|um|am|im|Nous nous retrouvons à onze heures.
Der Termin ist ___ Juli.|im|am|um|Le rendez-vous est en juillet.
___|Haben Sie morgen Zeit?|Sie haben morgen Zeit?|Haben morgen Sie Zeit?|Pose une question neutre : Avez-vous le temps demain ?
Ich komme ___.|später|heute|morgen|J’arrive plus tard.
___ ist der Termin?|Wann|Wo|Woher|Demande quand le rendez-vous a lieu.
#5.0
Das sind ___ Kinder.|meine|mein|meinen|Ce sont mes enfants.
Ich habe ___ Bruder.|einen|ein|eine|J’ai un frère.
Ich habe ___ Schwester.|eine|ein|einen|J’ai une sœur.
Ich sehe ___ Vater.|meinen|mein|meine|Je vois mon père.
Meine Mutter ___ dreißig Jahre alt.|ist|hat|sind|Ma mère a trente ans.
Mein Bruder und meine Schwester ___ hier.|sind|ist|seid|Mon frère et ma sœur sont ici.
#5.1
Frau Klein ist nicht verheiratet. Sie ist ___.|ledig|verheiratet|geschieden|Elle est célibataire et n’a jamais été mariée.
Sie ist nicht mehr verheiratet. Sie ist ___.|geschieden|ledig|verheiratet|Elle est divorcée.
Wir ___ zwei Kinder.|haben|habt|hat|Nous avons deux enfants.
Paul Klein: Klein ist der ___.|Familienname|Vorname|Geburtsort|Indique le champ du nom Klein.
Anna Klein: Anna ist der ___.|Vorname|Familienname|Familienstand|Indique le champ du prénom Anna.
Der Geburtsort ist ___.|Berlin|17.04.2000|ledig|Le lieu de naissance est Berlin.
#6.0
Wir ___ gern zwei Suppen.|hätten|hätte|hättest|Nous voudrions deux soupes.
Du ___ einen Tee.|möchtest|möchte|möchten|Tu voudrais un thé.
Ich nehme ___ Suppe.|die|der|das|Je prends la soupe.
Ich möchte ___ Tee.|einen|ein|eine|Je voudrais un thé.
___|Ich hätte gern ein Wasser.|Ich hätten gern ein Wasser.|Ich hätte ein gern Wasser.|Je voudrais une eau.
Möchten ___ einen Kaffee?|Sie|du|ihr|Demande poliment à un client s’il veut un café.
#6.1
Einen Kaffee ___ Milch, bitte.|mit|ohne|für|Un café avec du lait, s’il vous plaît.
Die ___, bitte.|Rechnung|Speisekarte|Suppe|Tu as fini de manger et tu demandes l’addition.
Die ___, bitte.|Speisekarte|Rechnung|Suppe|Tu veux choisir ton repas et demandes le menu.
Noch ___ Wasser, bitte.|ein|eine|einen|Encore une eau, s’il vous plaît.
___ Frühstück nehme ich einen Tee.|Zum|Am|Um|Au petit-déjeuner, je prends un thé.
Ich möchte ___.|bezahlen|bezahle|bezahlt|Je voudrais payer.
#7.0
Wie viel ___ das Brot?|kostet|kosten|kostest|Combien coûte le pain ?
Wie viel ___ die Schuhe?|kosten|kostet|kostest|Combien coûtent les chaussures ?
___ kostet das?|Wie viel|Wie viele|Wie lange|Combien cela coûte-t-il ?
___ Äpfel möchten Sie?|Wie viele|Wie viel|Wie lange|Combien de pommes voulez-vous ?
Ich nehme eine ___ Wasser.|Flasche|Flaschen|Flasches|Je prends une bouteille d’eau.
19,95 Euro = neunzehn Euro ___.|fünfundneunzig|neunundfünfzig|fünfzehn|Lis la partie après la virgule.
#7.1
Haben Sie das ___ Größe vierzig?|in|im|am|L’avez-vous en taille quarante ?
Die Kasse ist im ___ Stock.|zweiten|zwei|zweite|La caisse est au deuxième étage.
Ich ___ das.|nehme|nimmt|nehmen|Je prends cela.
Ich ___ einen Mantel.|suche|sucht|suchen|Je cherche un manteau.
Das ist ___ teuer.|zu|zum|zur|C’est trop cher.
___ ist die Kasse?|Wo|Wann|Woher|Où est la caisse ?
#8.0
Die Wohnung ___ drei Zimmer.|hat|haben|hast|L’appartement a trois pièces.
Das Haus hat ___ Balkon.|einen|ein|eine|La maison a un balcon.
Das Haus hat ___ Küche.|eine|ein|einen|La maison a une cuisine.
Das Haus hat ___ Bad.|ein|eine|einen|La maison a une salle de bains.
Die Miete ist ___ Euro.|sechshundert|sechzig|sechzehn|Le loyer est de six cents euros.
Die Wohnung ist im ___ Stock.|ersten|eins|erste|L’appartement est au premier étage.
#8.1
Wir suchen ___ Zimmer.|ein|eine|einen|Nous cherchons une chambre.
Wir suchen ___ Wohnung.|eine|ein|einen|Nous cherchons un appartement.
Wann ___ ich die Wohnung sehen?|kann|können|kannst|Quand puis-je visiter l’appartement ?
Wie ___ ist die Miete?|hoch|viel|viele|Quel est le loyer ?
Nebenkosten ___.|inklusive|frei|geschlossen|Les charges sont comprises.
___|Kann ich am Dienstag kommen?|Kann ich komme am Dienstag?|Kann am Dienstag ich kommen?|Pose une question neutre : Puis-je venir mardi ?
#9.0
___ Sie zuerst geradeaus.|Gehen|Geht|Gehst|Allez d’abord tout droit.
Nehmen ___ die erste Straße links.|Sie|du|ihr|Adresse-toi poliment à un client.
Wie komme ich ___ Bahnhof?|zum|zur|zu|Comment aller à la gare ?
Wie komme ich ___ Post?|zur|zum|zu|Comment aller à la poste ?
Gehen Sie zuerst geradeaus und ___ nach rechts.|dann|zuerst|gestern|Allez d’abord tout droit et ensuite à droite.
___|Gehen Sie nach links.|Gehen nach links Sie.|Geht Sie nach links.|Donne une consigne polie : Allez à gauche.
#9.1
Ich fahre mit ___ Bus.|dem|der|den|Je prends le bus.
Ich fahre mit ___ Bahn.|der|dem|den|Je prends le train.
Der Zug hat ___.|Verspätung|Umstieg|Abfahrt|Le train a du retard.
Sie müssen ___.|umsteigen|umsteigt|umsteigst|Vous devez changer de transport.
Welches ___?|Gleis|Linie|Bahn|Demande sur quelle voie.
Welche ___ fährt zum Bahnhof?|Linie|Gleis|Zug|Demande quelle ligne va à la gare.
#10.0
Ich arbeite ___ Verkäuferin.|als|im|um|Je travaille comme vendeuse.
Er ___ Lehrer.|ist|hat|sind|Il est enseignant.
Ich arbeite ___ der Schule.|in|im|am|Je travaille à l’école.
Ich arbeite von acht ___ sechzehn Uhr.|bis|ab|um|Je travaille de huit à seize heures.
Wir ___ im Büro.|arbeiten|arbeitet|arbeitest|Nous travaillons au bureau.
___|Heute arbeite ich im Supermarkt.|Heute ich arbeite im Supermarkt.|Heute arbeiten ich im Supermarkt.|Aujourd’hui, je travaille au supermarché.
#10.1
Heute ___ ich später.|komme|kommst|kommen|Aujourd’hui, j’arrive plus tard.
Ich komme ___ Freitag später.|am|um|im|Vendredi, j’arrive plus tard.
Ich habe heute ___.|frei|später|spät|Je suis en congé aujourd’hui.
Ich komme ___ neun Uhr.|um|am|im|J’arrive à neuf heures.
___|Morgen komme ich später.|Morgen ich komme später.|Morgen kommen ich später.|Demain, j’arrive plus tard.
Entschuldigung, ich ___ später.|komme|kommen|kommst|Excusez-moi, j’arrive plus tard.
#11.0
Ich lerne ___ sechs Monaten Deutsch.|seit|um|am|J’apprends l’allemand depuis six mois.
Der Kurs ist ___ Abend.|am|im|um|Le cours est le soir.
Der Kurs ist ___ Wochenende.|am|im|um|Le cours est le week-end.
___ lange lernen Sie Deutsch?|Wie|Wo|Wer|Depuis combien de temps apprenez-vous l’allemand ?
Seit sechs Monaten ___ ich Deutsch.|lerne|lernt|lernen|J’apprends l’allemand depuis six mois.
Der Kurs beginnt ___ zehn Uhr.|um|am|im|Le cours commence à dix heures.
#11.1
Was ___ das Wort?|bedeutet|bedeuten|bedeutest|Que signifie ce mot ?
Können Sie das ___?|wiederholen|wiederholt|wiederholst|Pouvez-vous répéter cela ?
Wir ___ die Hausaufgaben.|machen|macht|machst|Nous faisons les devoirs.
Du ___ ein Buch.|liest|lese|lesen|Tu lis un livre.
Wir ___ ein Wörterbuch.|brauchen|braucht|brauchst|Nous avons besoin d’un dictionnaire.
___|Heute lerne ich Deutsch.|Heute ich lerne Deutsch.|Heute lernen ich Deutsch.|Aujourd’hui, j’apprends l’allemand.
#12.0
Ich spiele ___ gern Tennis.|nicht|kein|keine|Je n’aime pas jouer au tennis.
Ich gehe ___ ins Kino.|lieber|liebe|lieben|Je préfère aller au cinéma.
Wir ___ gern.|schwimmen|schwimmt|schwimmst|Nous aimons nager.
Du ___ gern Fußball.|spielst|spiele|spielen|Tu aimes jouer au football.
Ich ___ gern Bücher.|lese|liest|lesen|J’aime lire des livres.
___|Ich schwimme nicht gern.|Ich nicht gern schwimme.|Ich schwimmen nicht gern.|Je n’aime pas nager.
#12.1
Am Samstag ___ ich Tennis.|spiele|spielt|spielen|Samedi, je joue au tennis.
___ du am Sonntag Zeit?|Hast|Hat|Habt|As-tu le temps dimanche ?
Wollen wir schwimmen ___?|gehen|geht|gehst|On va nager ?
___|Am Sonntag gehe ich ins Kino.|Am Sonntag ich gehe ins Kino.|Am Sonntag gehen ich ins Kino.|Dimanche, je vais au cinéma.
Wir treffen uns ___ achtzehn Uhr.|um|am|im|Nous nous retrouvons à dix-huit heures.
Wollen ___ am Sonntag spielen?|wir|ich|du|Propose une activité que vous ferez ensemble : On joue dimanche ?
#13.0
Ich möchte zwei Zimmer ___.|reservieren|reserviert|reserviere|Je voudrais réserver deux chambres.
Für zwei ___.|Nächte|Nacht|Nachts|Pour deux nuits.
Vom ersten bis ___ dritten August.|zum|am|im|Du premier au trois août.
___ zwei Personen, bitte.|Für|Von|Um|Pour deux personnes, s’il vous plaît.
Ist das Frühstück ___?|inklusive|reservieren|geschlossen|Le petit-déjeuner est-il compris ?
Ich ___ gern ein Einzelzimmer.|hätte|hätten|hättest|Je voudrais une chambre individuelle.
#13.1
Der Zug fährt um neun Uhr ___.|ab|an|mit|Le train part à neuf heures : abfahren.
Der Zug kommt um elf Uhr ___.|an|ab|mit|Le train arrive à onze heures : ankommen.
Wann ___ der Zug ab?|fährt|fahren|fährst|Quand le train part-il ?
Wann ___ der Zug an?|kommt|kommen|kommst|Quand le train arrive-t-il ?
Die Fahrt ___ zwei Stunden.|dauert|dauern|dauerst|Le trajet dure deux heures.
___|Um zehn Uhr fährt der Zug ab.|Um zehn Uhr der Zug fährt ab.|Um zehn Uhr fährt ab der Zug.|À dix heures, le train part. Choisis l’ordre neutre.
#14.0
Ich ___ krank.|bin|habe|ist|Je suis malade.
Ich ___ Fieber.|habe|bin|ist|J’ai de la fièvre.
Ich habe ___ gestern Husten.|seit|am|um|Je tousse depuis hier.
Seit ___ Tagen bin ich krank.|zwei|zweite|zweiten|Je suis malade depuis deux jours.
___ wann haben Sie Fieber?|Seit|Am|Um|Depuis quand avez-vous de la fièvre ?
Meine Schwester ___ müde.|ist|hat|bin|Ma sœur est fatiguée.
#14.1
Ich kann heute nicht ___.|kommen|komme|kommt|Je ne peux pas venir aujourd’hui.
Ich brauche ___ Termin.|einen|ein|eine|J’ai besoin d’un rendez-vous.
Ich bin ___ Arzt.|beim|zum|vom|Je suis chez le médecin.
Ich ___ zwei Tage krank.|bin|habe|bist|Je suis malade pour deux jours.
___|Heute kann ich nicht kommen.|Heute ich kann nicht kommen.|Heute kann ich komme nicht.|Aujourd’hui, je ne peux pas venir.
Gute ___!|Besserung|Besserungen|Bessern|Bon rétablissement !
#15.0
Die Party ist ___ mir.|bei|mit|von|La fête est chez moi.
___ du kommen?|Kannst|Kann|Könnt|Peux-tu venir ?
Ich feiere ___ Freitag Geburtstag.|am|um|im|Je fête mon anniversaire vendredi.
Die Party beginnt ___ achtzehn Uhr.|um|am|im|La fête commence à dix-huit heures.
___|Am Sonntag feiere ich Geburtstag.|Am Sonntag ich feiere Geburtstag.|Am Sonntag feiern ich Geburtstag.|Dimanche, je fête mon anniversaire.
Liebe Anna, viele ___!|Grüße|Grüß|Grüßen|Chère Anna, amitiés !
#15.1
Vielen Dank ___ die Einladung.|für|mit|bei|Merci pour l’invitation.
Ich muss leider ___.|arbeiten|arbeite|arbeitet|Je dois malheureusement travailler.
Ich bringe einen Salat ___.|mit|an|ab|J’apporte une salade : mitbringen.
Ich ___ gern.|komme|kommen|kommst|Je viens avec plaisir.
___|Leider kann ich nicht kommen.|Leider ich kann nicht kommen.|Leider kann ich nicht komme.|Malheureusement, je ne peux pas venir.
Kann ich einen Kuchen ___?|mitbringen|bringe mit|mitbringt|Puis-je apporter un gâteau ?
#16.0
Hier darf man nicht rauchen: Rauchen ist ___.|verboten|erlaubt|geöffnet|Interprète le panneau.
Hier darf man parken: Parken ist ___.|erlaubt|verboten|geschlossen|Interprète le panneau.
___ für Kunden.|Nur|Nicht|Kein|Réservé aux clients.
Bitte ___ aussteigen.|nicht|kein|keine|Ne descendez pas, s’il vous plaît.
Das ist ___ Eingang.|kein|nicht|keine|Ce n’est pas une entrée.
Hier ist der ___, dort ist der Ausgang.|Eingang|Ausgang|Umstieg|L’entrée est ici ; la sortie est là-bas.
#16.1
Geöffnet ___ neun bis achtzehn Uhr.|von|ab|um|Ouvert de neuf à dix-huit heures.
Geöffnet von neun ___ achtzehn Uhr.|bis|ab|von|Ouvert de neuf à dix-huit heures.
Heute ___ der Zug aus.|fällt|fallen|fällst|Le train est annulé aujourd’hui.
Ab neun Uhr: Das Geschäft öffnet ___ neun Uhr.|um|von|bis|À partir de neuf heures, le magasin est ouvert.
___|Morgen ist das Geschäft geschlossen.|Morgen das Geschäft ist geschlossen.|Morgen sind das Geschäft geschlossen.|Demain, le magasin est fermé.
Heute ist das Geschäft ___ geöffnet.|nicht|kein|keine|Aujourd’hui, le magasin n’est pas ouvert.
#17.0
Können Sie ___ bitte helfen?|mir|mich|mein|Pouvez-vous m’aider, s’il vous plaît ?
Können Sie mir bitte den Stift ___?|geben|gibt|gebt|Pouvez-vous me donner le stylo ?
___ ich das Fenster öffnen?|Kann|Kannst|Könnt|Puis-je ouvrir la fenêtre ?
Können Sie mir bitte ___ Buch geben?|das|den|die|Pouvez-vous me donner le livre ?
Können Sie mir bitte ___ Tasche geben?|die|den|das|Pouvez-vous me donner le sac ?
___|Können Sie mir helfen?|Können Sie helfen mir?|Könnt Sie mir helfen?|Pose une question neutre : Pouvez-vous m’aider ?
#17.1
___.|Tut mir leid, das geht nicht|Tut mir leid, das geht gern|Tut mir leid, das geht natürlich|Choisis le refus poli.
Ja, ___.|natürlich|vielleicht|später|Choisis une acceptation nette.
___ einmal, bitte.|Noch|Nur|Nicht|Demande de répéter.
Leider ___.|nicht|gern|natürlich|Refuse la demande.
___ Moment, bitte.|Einen|Ein|Eine|Demande de patienter.
___, hier bitte.|Gern|Leider|Vielleicht|Accepte de donner l’objet.
#18.0
___ Sie bitte die Aufgabe.|Lesen|Liest|Lest|Lisez la consigne, s’il vous plaît.
___ Sie bitte die Antwort.|Schreiben|Schreibt|Schreibst|Écrivez la réponse, s’il vous plaît.
Kreuzen Sie die Antwort ___.|an|ab|mit|Cochez la réponse : ankreuzen.
Sie hören den Text ___.|zweimal|zweite|zwei|Vous écoutez le texte deux fois.
___|Hören Sie den Dialog.|Hört Sie den Dialog.|Hören den Dialog Sie.|Donne une consigne polie : Écoutez le dialogue.
Richtig ___ falsch?|oder|und|aber|Vrai ou faux ?
#18.1
Zuerst ___ wir die Aufgabe.|lesen|liest|lest|D’abord, nous lisons la consigne.
Dann ___ du die Antwort.|schreibst|schreibt|schreiben|Ensuite, tu écris la réponse.
Zum Schluss ___ wir den Text.|prüfen|prüft|prüfst|Pour finir, nous vérifions le texte.
___|Danach vergleiche ich die Antworten.|Danach ich vergleiche die Antworten.|Danach vergleichen ich die Antworten.|Après, je compare les réponses.
Ein kurzer Text hat eine Anrede und einen ___.|Gruß|Grüße|Grüßen|Un court message a une salutation et une formule de fin.
Zuerst lesen, ___ schreiben.|dann|zuerst|gestern|D’abord lire, ensuite écrire.
#19.0
Mein Rücken ___ weh.|tut|tun|tust|J’ai mal au dos.
Meine Arme ___ weh.|tun|tut|tust|J’ai mal aux bras.
___ Hand tut weh.|Meine|Mein|Meinen|J’ai mal à la main.
___ Kopf tut weh.|Mein|Meine|Meinen|J’ai mal à la tête.
Ich ___ Kopfschmerzen.|habe|bin|ist|J’ai mal à la tête.
Meine Beine ___ seit gestern weh.|tun|tut|tust|J’ai mal aux jambes depuis hier.
#19.1
Ich brauche ___ Termin beim Arzt.|einen|ein|eine|J’ai besoin d’un rendez-vous chez le médecin.
Wir brauchen ___ Apotheke.|eine|ein|einen|Nous avons besoin d’une pharmacie.
Wo ist die ___ Apotheke?|nächste|nächsten|nächstes|Où est la pharmacie la plus proche ?
Ich habe ___ gestern Kopfschmerzen.|seit|am|um|J’ai mal à la tête depuis hier.
___ Sie diese Tabletten.|Nehmen|Nimmt|Nehmt|Prenez ces comprimés.
___|Seit gestern habe ich Kopfschmerzen.|Seit gestern ich habe Kopfschmerzen.|Seit gestern haben ich Kopfschmerzen.|Depuis hier, j’ai mal à la tête.
#20.0
Es ___.|regnet|regnen|regnest|Il pleut.
Es ___.|schneit|schneien|schneist|Il neige.
___|Morgen ist es warm.|Morgen es ist warm.|Morgen sind es warm.|Demain, il fera chaud.
Heute ___ es kalt.|ist|sind|bist|Aujourd’hui, il fait froid.
Im Winter ___ es oft.|schneit|schneien|schneist|En hiver, il neige souvent.
Wie ___ das Wetter?|ist|sind|hat|Quel temps fait-il ?
#20.1
Ich nehme einen Regenschirm ___.|mit|ab|an|Je prends un parapluie : mitnehmen.
Im Winter ___ ich einen Mantel.|trage|trägt|tragen|En hiver, je porte un manteau.
Wir brauchen ___ Jacke.|eine|ein|einen|Nous avons besoin d’une veste.
Du brauchst ___ Hemd.|ein|eine|einen|Tu as besoin d’une chemise.
___ Winter ist es kalt.|Im|Am|Um|En hiver, il fait froid.
___|Ich nehme einen Mantel mit.|Ich mitnehme einen Mantel.|Ich nehme mit einen Mantel.|Je prends un manteau. Choisis l’ordre neutre.
#21.0
Du ___ gern Bücher.|liest|lese|lesen|Tu aimes lire des livres.
Anna ___ gern.|liest|lese|lesen|Anna aime lire.
Wir ___ gern Musik.|hören|hört|hörst|Nous aimons écouter de la musique.
Ich gehe ___ ins Museum.|lieber|liebe|lieben|Je préfère aller au musée.
Ich spiele ___ gern Tennis.|nicht|kein|keine|Je n’aime pas jouer au tennis.
Ich gehe gern ___ Kino.|ins|im|in der|J’aime aller au cinéma.
#21.1
Wollen wir ins Museum ___?|gehen|geht|gehst|On va au musée ?
Das Konzert ___ um zwanzig Uhr.|beginnt|beginnen|beginnst|Le concert commence à vingt heures.
Der Eintritt ___ zehn Euro.|kostet|kosten|kostest|L’entrée coûte dix euros.
Wir treffen ___ vor dem Museum.|uns|mir|dir|Nous nous retrouvons devant le musée.
Treffen wir uns ___ neunzehn Uhr?|um|am|im|On se retrouve à dix-neuf heures ?
___|Wollen wir ins Kino gehen?|Wollen wir gehen ins Kino?|Wollt wir ins Kino gehen?|Pose une question neutre : On va au cinéma ?
#22.0
Ich rufe Sie morgen ___.|zurück|an|mit|Je vous rappelle demain : zurückrufen.
Können Sie mich ___?|zurückrufen|rufen zurück|zurückruft|Pouvez-vous me rappeler ?
Bitte rufen Sie ___ zurück.|mich|mir|mein|Rappelez-moi, s’il vous plaît.
Mein Handy ___ kaputt.|ist|hat|sind|Mon téléphone est cassé.
___|Morgen rufe ich Sie zurück.|Morgen ich rufe Sie zurück.|Morgen rufe zurück ich Sie.|Demain, je vous rappelle. Choisis l’ordre neutre.
Hallo, hier ___ Marie.|ist|bin|sind|Allô, ici Marie.
#22.1
Ich schicke ___ eine Nachricht.|dir|du|dich|Je t’envoie un message.
Ich schicke ___ eine E-Mail.|Ihnen|Sie|Ihr|Je vous envoie un e-mail (politesse).
Bitte ___ mir.|antworte|antwortet|antworten|Réponds-moi, s’il te plaît.
Können Sie bitte langsamer ___?|sprechen|spricht|sprecht|Pouvez-vous parler plus lentement ?
Wir treffen uns ___ der Bibliothek.|vor|vom|für|Nous nous retrouvons devant la bibliothèque.
___|Treffen wir uns morgen?|Treffen uns wir morgen?|Trifft wir uns morgen?|Pose une question neutre : On se retrouve demain ?
#23.0
Wo muss ich ___?|unterschreiben|unterschreibt|unterschreibe|Où dois-je signer ?
Wo ___ ich eine Briefmarke?|bekomme|bekommt|bekommen|Où est-ce que je peux avoir un timbre ?
Ich möchte mich ___.|anmelden|melde an|anmeldet|Je voudrais m’inscrire.
Er braucht ___ Umschlag.|einen|ein|eine|Il a besoin d’une enveloppe.
Wir brauchen ___ Formular.|ein|eine|einen|Nous avons besoin d’un formulaire.
Wann ___ die Post geöffnet?|ist|hat|sind|Quand la poste est-elle ouverte ?
#23.1
Bitte füllen Sie das Formular ___.|aus|an|ab|Veuillez remplir le formulaire : ausfüllen.
Bitte ___ Sie hier.|unterschreiben|unterschreibt|unterschreibst|Veuillez signer ici.
Berlin ist der ___.|Geburtsort|Geburtsdatum|Familienstand|Le formulaire demande la ville où la personne est née.
030 123456 gehört zur ___.|Telefonnummer|Postleitzahl|Hausnummer|Dans quel champ faut-il reporter ce numéro de téléphone ?
Musterstraße 8 gehört zur ___.|Adresse|Geburtsort|Familienstand|Dans quel champ faut-il reporter la rue et le numéro ?
___|Wo muss ich unterschreiben?|Wo ich muss unterschreiben?|Wo muss ich unterschreibt?|Pose une question neutre : Où dois-je signer ?
#24.0
Ich komme gern, ___ ich komme später.|aber|oder|denn|Je viens avec plaisir, mais j’arrive plus tard.
Ich wohne in Bonn ___ spreche Deutsch.|und|aber|oder|J’habite à Bonn et je parle allemand.
Können Sie das bitte ___?|wiederholen|wiederholt|wiederholst|Pouvez-vous répéter cela, s’il vous plaît ?
___ kommen Sie?|Woher|Wo|Wie|D’où venez-vous ?
___|Ich heiße Anna und wohne in Bonn.|Ich heißen Anna und wohne in Bonn.|Ich heiße Anna und wohnen in Bonn.|Je m’appelle Anna et j’habite à Bonn.
Sprechen Sie bitte ___.|langsamer|langsame|langsamere|Parlez plus lentement, s’il vous plaît.
#24.1
Vielen Dank für ___ Einladung.|deine|dein|deinen|Merci pour ton invitation.
Kann ich einen Kuchen ___?|mitbringen|bringe mit|mitbringt|Puis-je apporter un gâteau ?
Ich komme ___ Freitag um sieben Uhr.|am|um|im|Je viens vendredi à sept heures.
___|Vielen Dank. Ich komme gern.|Vielen Dank. Ich kommen gern.|Vielen Dank. Ich kommst gern.|Remercie puis accepte l’invitation.
___ ich einen Salat mitbringen?|Kann|Kannst|Könnt|Puis-je apporter une salade ?
Viele ___!|Grüße|Gruß|Grüßen|Amitiés !
`);
  const checks=parse(`
#1
C|Une personne répond « Ich komme aus Kanada. » Quelle question convient ?|Woher kommen Sie?|Wo wohnen Sie?|Welche Sprachen sprechen Sie?|origine
C|« Ich wohne in Berlin, aber ich komme aus Kanada. » Où habite la personne ?|In Berlin.|In Kanada.|In Halifax.|ville
C|Tu demandes le nom d’une cliente. Choisis la question neutre et polie.|Wie heißen Sie?|Wie heißt Sie?|Wie heißen du?|nom-politesse
C|« Mein Name ist Anna. Ich spreche Deutsch und Französisch. » Que dit Anna ?|Elle parle deux langues.|Elle habite en France.|Elle vient d’Allemagne.|langues
C|Tu rencontres une personne le matin. Quelle salutation convient ?|Guten Morgen.|Guten Abend.|Auf Wiedersehen.|salutation
C|Complète « Wir ___ aus Kanada. »|kommen|kommt|kommst|kommen-pluriel
G|Ich ___ Deutsch und Französisch.|spreche|Je parle allemand et français.|sprechen
G|Wo ___ du?|wohnst|Demande à un proche où il habite.|wohnen-du
G|Wie ___ du?|heißt|Demande son nom à un proche.|heißen-du
G|___ heißen Sie bitte?|Wie|Demande le nom poliment.|question-nom
G|Ich komme ___ Kanada und wohne in Berlin.|aus|Je viens du Canada et j’habite à Berlin.|préposition-origine
G|Ich wohne ___ Halifax und spreche Französisch.|in|J’habite à Halifax et je parle français.|préposition-ville
C|Anna et Paul sont à la maison. Choisis la phrase qui parle d’eux.|Sie sind zu Hause.|Sie ist zu Hause.|Ihr seid zu Hause.|sein-pronoms
G|Ich ___ dreißig Jahre alt.|bin|J’ai trente ans.|sein-âge
G|Ihr ___ zwei Kinder.|habt|Vous avez deux enfants, vous deux mes amis.|haben-ihr
G|Anna und ich ___ Deutsch.|sprechen|Anna et moi parlons allemand.|sprechen-wir
#2
C|Tu ne comprends pas un nom prononcé rapidement. Demande de l’épeler.|Können Sie den Namen buchstabieren?|Können Sie den Namen wiederholen?|Können Sie den Namen schreiben?|épeler
C|« Müller, mit Umlaut. » Quelle écriture correspond ?|Müller|Muller|Mülller|umlaut
C|« Weiß, mit Eszett. » Quelle écriture correspond ?|Weiß|Weiss|Weis|eszett
C|Tu as besoin d’entendre la phrase encore une fois.|Bitte noch einmal.|Bitte ohne Umlaut.|Bitte mit Bindestrich.|répéter
C|Choisis la phrase correcte pour « Vous pouvez écrire le nom » (plusieurs proches).|Ihr könnt den Namen schreiben.|Ihr können den Namen schreiben.|Ihr könnt den Namen schreibt.|modal-ihr
C|« Anna kann Deutsch sprechen. » Remplace Anna par elle.|Sie kann Deutsch sprechen.|Sie können Deutsch sprechen.|Sie könnt Deutsch sprechen.|modal-elle
G|___ Sie das Wort bitte wiederholen?|Können|Demande poliment de répéter le mot.|modal-formel
G|Du ___ den Namen schreiben.|kannst|Tu peux écrire le nom.|modal-du
G|Wir ___ den Namen schreiben.|können|Nous pouvons écrire le nom.|modal-wir
G|Anna-Maria schreibt man mit ___.|Bindestrich|Nomme le signe entre Anna et Maria.|signe
G|Bitte sprechen Sie ___.|langsamer|Demande de parler plus lentement.|débit
G|Ich kann das Wort ___.|buchstabieren|Je peux épeler le mot. Écris seulement l’infinitif.|infinitif
#3
C|« Nummer dreißig, nicht dreizehn. » Quel numéro faut-il noter ?|30|13|33|13-30
C|Le numéro de rue est zweiundachtzig. Quelle adresse correspond ?|Hausnummer 82.|Hausnummer 28.|Hausnummer 22.|inversion
C|Le formulaire demande Geburtsort. Quelle donnée convient ?|Halifax|17.04.2000|10115|lieu-naissance
C|Le champ est Geburtsdatum. Que faut-il reporter ?|17.04.2000|Berlin|030 555 1840|date-naissance
C|Tu dois noter un téléphone dit chiffre par chiffre : null, drei, null, eins, acht. Quelle suite est correcte ?|03018|03081|30018|ordre-chiffres
C|Une adresse indique « 10115 Berlin ». Que représente 10115 ?|Die Postleitzahl.|Die Hausnummer.|Die Telefonnummer.|code-postal
G|Die Hausnummer ist ___.|einundzwanzig|Le numéro est 21. Écris-le en lettres.|nombre-21
G|Die Nummer ist ___.|zweiunddreißig|Le numéro est 32. Écris-le en lettres.|nombre-32
G|Die Nummer ist ___.|sechzehn|Le numéro est 16. Écris-le en lettres.|nombre-16
G|Das Jahr ist ___.|zweitausend|L’année est 2000. Écris-la en lettres.|année
G|Das Feld für den Ort der Geburt heißt ___.|Geburtsort|Écris le nom allemand du champ pour le lieu de naissance.|champ-lieu
G|030 123456 gehört zum Feld ___.|Telefonnummer|Écris le nom allemand du champ pour le téléphone.|champ-téléphone
#4
C|Le rendez-vous est à « halb neun ». Quelle heure faut-il retenir ?|08:30|09:30|08:15|halb
C|« Viertel vor elf » correspond à quelle heure ?|10:45|11:15|11:45|viertel-vor
C|« Dienstag, 10 Uhr » : quelle confirmation reprend les deux informations ?|Am Dienstag um zehn Uhr.|Am Dienstag um elf Uhr.|Am Donnerstag um zehn Uhr.|jour-heure
C|Tu es disponible le week-end : samedi et dimanche. Quelle paire convient ?|Samstag und Sonntag.|Freitag und Samstag.|Sonntag und Montag.|jours
C|Le rendez-vous est le 17 avril. Quelle formulation convient ?|Am siebzehnten April.|Im siebzehnten April.|Um siebzehnten April.|date
C|« Vom ersten bis zum dritten August » : quelle période est correcte ?|1.–3. August|1.–3. April|3.–5. August|période
C|« Heute ist Mittwoch. Morgen habe ich Zeit. » Quand la personne a-t-elle le temps ?|Am Donnerstag.|Am Dienstag.|Am Mittwoch.|jour-suivant
C|Le calendrier indique le mois 07. Quel nom convient ?|Juli|Juni|Januar|mois
G|Wir treffen uns ___ Montag.|am|Nous nous retrouvons lundi.|am
G|Ich habe ___ Dezember Zeit.|im|J’ai le temps en décembre.|im
G|Der Kurs beginnt ___ zwölf Uhr.|um|Le cours commence à midi.|um
G|Es ist Viertel ___ zehn.|nach|Il est dix heures et quart.|viertel-nach
G|Von Dienstag ___ Freitag arbeite ich.|bis|Je travaille de mardi à vendredi.|von-bis
G|Im ___ komme ich nach Berlin.|November|Je viens à Berlin en novembre.|mois-novembre
G|Der Kurs beginnt im ___.|März|Le cours commence en mars.|mois-märz
G|___ Sie am Donnerstag Zeit?|Haben|Demande poliment une disponibilité jeudi.|question-disponibilité
#5
C|« Anna ist meine Schwester. Paul ist mein Vater. » Qui est Anna ?|Die Schwester.|Die Mutter.|Die Tochter.|famille
C|« Ich habe einen Sohn und eine Tochter. » Combien d’enfants a la personne ?|Zwei Kinder.|Ein Kind.|Drei Kinder.|enfants
C|Tu présentes ta mère. Choisis la phrase correcte.|Das ist meine Mutter.|Das ist mein Mutter.|Das ist meinen Mutter.|possessif-féminin
C|Tu écris « J’ai mon frère ici ». Quel groupe est à l’accusatif ?|meinen Bruder|mein Bruder|meine Bruder|accusatif-possessif
C|« Anna Klein, ledig, geboren in Bonn. » Quel est son nom de famille ?|Klein|Anna|Bonn|identité
C|Le formulaire indique Familienstand: verheiratet. Que sait-on ?|La personne est mariée.|La personne est célibataire.|La personne est divorcée.|état-civil
G|Meine Schwester ___ einundzwanzig Jahre alt.|ist|Ma sœur a vingt et un ans.|âge-sein
G|Das sind ___ Eltern.|meine|Ce sont mes parents.|possessif-pluriel
G|Ich habe ___ Sohn.|einen|J’ai un fils.|article-masculin
G|Ich habe ___ Tochter.|eine|J’ai une fille.|article-féminin
G|Paul und Anna ___ zwei Kinder.|haben|Paul et Anna ont deux enfants.|haben-pluriel
G|Der ___ ist Paul.|Vorname|Le prénom est Paul.|prénom
G|Das Datum der Geburt heißt ___.|Geburtsdatum|Écris le nom du champ en allemand.|date
G|Meine Mutter und mein Vater ___ hier.|sind|Ma mère et mon père sont ici.|sein-pluriel
C|Tu présentes votre mère, à toi et à ton frère. Choisis le possessif correct.|Das ist unsere Mutter.|Das ist unser Mutter.|Das ist unseren Mutter.|possessif-wir
G|Wie ist ___ Telefonnummer, Frau Klein?|Ihre|Demande son téléphone à Madame Klein en employant le possessif de politesse.|possessif-formel
#6
C|Commande une soupe et une eau.|Eine Suppe und ein Wasser, bitte.|Ein Suppe und eine Wasser, bitte.|Einen Suppe und einen Wasser, bitte.|articles
C|Tu veux une salade sans viande.|Einen Salat ohne Fleisch, bitte.|Einen Salat mit Fleisch, bitte.|Eine Suppe ohne Fleisch, bitte.|restriction
C|Tu n’as pas encore choisi et veux lire la carte.|Die Speisekarte, bitte.|Die Rechnung, bitte.|Noch ein Wasser, bitte.|menu
C|Tu as fini ton repas et veux payer.|Ich möchte bezahlen.|Ich möchte bestellen.|Ich möchte frühstücken.|payer
C|« Einen Tee mit Zucker, aber ohne Milch. » Quelle commande correspond ?|Thé sucré sans lait.|Thé sans sucre avec lait.|Thé sans sucre ni lait.|lecture-commande
C|Deux personnes commandent ensemble. Choisis la formulation correcte.|Wir hätten gern zwei Kaffees.|Wir hätte gern zwei Kaffees.|Wir hätten zwei gern Kaffees.|politesse-wir
G|Ich ___ gern eine Suppe und einen Tee.|hätte|Je voudrais une soupe et un thé.|hätte
G|Wir ___ einen Salat, bitte.|möchten|Nous voudrions une salade.|möchten
G|Ich nehme ___ Kaffee.|einen|Je prends un café.|accusatif
G|Ohne Fleisch, ___.|bitte|Sans viande, s’il vous plaît.|politesse
G|Einen Tee ___ Milch, bitte.|ohne|Un thé sans lait, s’il vous plaît.|ohne
G|Noch ___ Suppe, bitte.|eine|Encore une soupe, s’il vous plaît.|encore
G|Ich möchte einen Kaffee ___ Zucker.|mit|Je voudrais un café avec du sucre.|mit
G|___ Frühstück nehme ich ein Wasser.|Zum|Au petit-déjeuner, je prends une eau.|repas
#7
C|« Ein Brot kostet drei Euro. Zwei Äpfel kosten zusammen zwei Euro. » Combien coûte le pain seul ?|Drei Euro.|Zwei Euro.|Fünf Euro.|prix-lecture
C|Un client demande le prix de plusieurs chaussures. Quelle question convient ?|Wie viel kosten die Schuhe?|Wie viel kostet die Schuhe?|Wie viele kosten die Schuhe?|prix-pluriel
C|Le prix affiché est 19,95 €. Quelle lecture convient ?|Neunzehn Euro fünfundneunzig.|Neunzehn Euro neunundfünfzig.|Neunzig Euro fünfzehn.|centimes
C|« Größe vierzig ist zu klein. Haben Sie Größe zweiundvierzig? » Que veut le client ?|Une taille plus grande.|Une taille plus petite.|Un prix plus petit.|taille-transfert
C|« Die Kasse ist im ersten Stock, die Schuhe im zweiten. » Où payer ?|Im ersten Stock.|Im zweiten Stock.|Im dritten Stock.|étage
C|Tu décides d’acheter l’article. Quelle phrase convient ?|Ich nehme das.|Ich suche das.|Ich habe das nicht.|décision
G|Wie viel ___ eine Flasche Wasser?|kostet|Demande le prix d’une bouteille d’eau.|coûter-singulier
G|Wie viel ___ zwei Brote?|kosten|Demande le prix de deux pains.|coûter-pluriel
G|Wie ___ Äpfel möchten Sie?|viele|Demande combien de pommes le client veut.|quantité
G|Ich nehme zwei ___ Wasser.|Flaschen|Je prends deux bouteilles d’eau.|unité-pluriel
G|Haben Sie den Mantel ___ Größe vierzig?|in|Demande la taille quarante.|taille-préposition
G|Das ist ___ groß.|zu|C’est trop grand.|trop
G|Die Schuhe sind im ___ Stock.|zweiten|Les chaussures sont au deuxième étage.|ordinal
G|Nein, ___.|danke|Non, merci.|refus
#8
C|« Drei Zimmer, eine Küche, ein Bad. Kein Balkon. » Quelle description est exacte ?|Trois pièces sans balcon.|Trois chambres avec balcon.|Deux pièces sans balcon.|logement-lecture
C|Une annonce dit « Wohnung frei ». Dans ce contexte, que signifie frei ?|Disponible.|Gratuite.|Sans charges.|annonce
C|« Miete 600 Euro. Nebenkosten inklusive. » Quel est le loyer indiqué ?|600 euros, charges comprises.|600 euros, charges en plus.|60 euros, charges comprises.|loyer
C|Tu souhaites visiter. Quelle demande convient ?|Wann kann ich das Zimmer sehen?|Wann kann ich das Zimmer sieht?|Wann ich kann das Zimmer sehen?|visite-modal
C|Tu cherches une maison. Choisis la phrase correcte.|Ich suche ein Haus.|Ich suche einen Haus.|Ich suche eine Haus.|article-maison
C|« Kommen Sie am Dienstag um elf Uhr. » Quelle confirmation est exacte ?|Dienstag, 11 Uhr.|Dienstag, 10 Uhr.|Donnerstag, 11 Uhr.|rendez-vous
G|Das Haus ___ ein Bad und eine Küche.|hat|La maison a une salle de bains et une cuisine.|haben
G|Das Zimmer hat ___ Balkon.|einen|La chambre a un balcon.|accusatif-balkon
G|Ich suche ___ Wohnung mit zwei Zimmern.|eine|Je cherche un appartement avec deux pièces.|accusatif-wohnung
G|Ich möchte das Haus ___.|sehen|Je voudrais visiter la maison.|infinitif
G|Wie ___ ist die Miete für das Zimmer?|hoch|Demande le montant du loyer de la chambre.|loyer-question
G|Kann ich ___ Mittwoch kommen?|am|Demande si tu peux venir mercredi.|visite-jour
G|Meine ___ ist 030 123456.|Telefonnummer|Complète le nom du champ : mon numéro de téléphone.|coordonnées
G|Das Zimmer ist im ___ Stock.|ersten|La chambre est au premier étage.|étage
#9
C|« Zuerst geradeaus, dann rechts. » Quel itinéraire correspond ?|Tout droit, puis à droite.|À droite, puis tout droit.|Tout droit, puis à gauche.|ordre-trajet
C|Tu demandes comment aller à la poste.|Wie komme ich zur Post?|Wie komme ich zum Post?|Wie komme ich die Post?|destination-féminin
C|« Linie 13 zum Bahnhof, Linie 18 zur Post. » Quelle ligne prend-on pour la gare ?|Linie dreizehn.|Linie achtzehn.|Linie drei.|ligne
C|« Der Zug fährt von Gleis drei ab. » Que représente drei ?|La voie de départ.|La ligne de bus.|L’heure de départ.|gleis
C|« Sie müssen am Bahnhof umsteigen. » Que faut-il faire à la gare ?|Changer de transport.|Rester dans le même train.|Attendre le lendemain.|umsteigen
C|« Der Zug hat zehn Minuten Verspätung. » Que comprend-on ?|Le train est en retard.|Le train est annulé.|Le train part d’une autre voie.|retard
G|Gehen ___ bitte nach rechts.|Sie|Adresse-toi poliment à une personne.|impératif-politesse
G|Wie komme ich ___ Bahnhof?|zum|Demande comment aller à la gare.|destination-masculin
G|Wir fahren mit ___ Bahn.|der|Nous prenons le train.|datif-féminin
G|Anna fährt mit ___ Bus.|dem|Anna prend le bus.|datif-masculin
G|Nehmen Sie die Linie ___.|achtzehn|Indique la ligne 18 en lettres.|nombre
G|Sie müssen am Bahnhof ___.|umsteigen|Vous devez changer à la gare.|modal-infinitif
G|Gehen Sie zuerst geradeaus und ___ nach links.|dann|Allez d’abord tout droit, ensuite à gauche.|enchaînement
G|Welches ___ hat der Zug?|Gleis|Demande sur quelle voie est le train.|question-voie
#10
C|« Ich bin Lehrer und arbeite in der Schule. » Quel métier est indiqué ?|Lehrer|Verkäufer|Arzt|métier
C|« Ich arbeite von neun bis siebzehn Uhr. » Quand finit la journée de travail ?|Um siebzehn Uhr.|Um neun Uhr.|Um acht Uhr.|fin-horaire
C|Tu annonces que tu arriveras plus tard demain.|Morgen komme ich später.|Morgen ich komme später.|Morgen kommen ich später.|v2
C|« Heute habe ich frei. Morgen arbeite ich. » Quand la personne ne travaille-t-elle pas ?|Heute.|Morgen.|Übermorgen.|congé
C|Une vendeuse indique son métier. Choisis la formulation correcte.|Ich arbeite als Verkäuferin.|Ich arbeite im Verkäuferin.|Ich arbeite am Verkäuferin.|als
C|« Ich komme um neun, nicht um acht. » Quel horaire est confirmé ?|09:00|08:00|19:00|arrivée
G|Ich arbeite ___ Büro.|im|Je travaille au bureau.|lieu
G|Anna arbeitet in ___ Schule.|der|Anna travaille à l’école.|lieu-féminin
G|Meine Schwester ___ Lehrerin.|ist|Ma sœur est enseignante.|sein-métier
G|Wir arbeiten von zehn ___ achtzehn Uhr.|bis|Nous travaillons de dix à dix-huit heures.|plage
G|Am Montag ___ wir später.|kommen|Lundi, nous arrivons plus tard.|v2-pluriel
G|Ich komme heute ___.|später|Aujourd’hui, j’arrive plus tard.|plus-tard
G|___, ich komme später.|Entschuldigung|Excusez-moi, j’arrive plus tard.|excuse
G|Ich ___ morgen frei.|habe|Demain, je suis en congé.|haben-frei
#11
C|« Mein Kurs ist am Vormittag. Am Nachmittag arbeite ich. » Quand a lieu le cours ?|Le matin.|L’après-midi.|Le soir.|moment-journée
C|« Ich lerne seit sechs Monaten Deutsch. » Que signifie seit ?|L’apprentissage a commencé il y a six mois et continue.|Le cours commencera dans six mois.|Le cours dure six minutes.|depuis-présent
C|Tu ne comprends pas un mot. Quelle question convient ?|Was bedeutet dieses Wort?|Können Sie dieses Wort buchstabieren?|Können Sie dieses Wort wiederholen?|sens
C|Choisis une demande polie de répétition.|Können Sie den Satz wiederholen?|Können Sie den Satz wiederholt?|Können Sie den Satz wiederholst?|répétition
C|« Ich lese ein Buch und mache dann die Hausaufgaben. » Quelle action vient en premier ?|Lire un livre.|Faire les devoirs.|Chercher un dictionnaire.|ordre-lecture
C|Tu indiques ce que tu fais aujourd’hui.|Heute mache ich die Hausaufgaben.|Heute ich mache die Hausaufgaben.|Heute machen ich die Hausaufgaben.|ordre-v2
G|Wir lernen ___ drei Monaten Deutsch.|seit|Nous apprenons l’allemand depuis trois mois.|depuis
G|Unser Kurs ist ___ Nachmittag.|am|Notre cours est l’après-midi.|préposition
G|Du ___ die Hausaufgaben.|machst|Tu fais les devoirs.|machen-du
G|Anna ___ ein Wörterbuch.|braucht|Anna a besoin d’un dictionnaire.|brauchen
G|Ich ___ heute ein Buch.|lese|Je lis un livre aujourd’hui.|lesen-ich
G|Du ___ den Text.|liest|Tu lis le texte.|lesen-du
G|Wie lange ___ Sie Deutsch?|lernen|Depuis combien de temps apprenez-vous l’allemand ?|question-formelle
G|Können Sie das Wort ___?|erklären|Pouvez-vous expliquer le mot ?|aide
#12
C|« Ich spiele nicht gern Tennis, aber ich schwimme gern. » Quelle activité plaît à la personne ?|Schwimmen.|Tennis.|Fußball.|goût-négation
C|« Ich gehe lieber ins Kino. » Que dit la personne ?|Elle préfère aller au cinéma.|Elle n’aime pas aller au cinéma.|Elle va au cinéma tous les jours.|préférence
C|« Samstag kann ich nicht. Sonntag habe ich Zeit. » Quand est-elle disponible ?|Am Sonntag.|Am Samstag.|Am Montag.|disponibilité
C|Propose une activité à faire ensemble.|Wollen wir Tennis spielen?|Wollen wir spielen Tennis?|Wollt wir Tennis spielen?|proposition
C|Choisis la phrase correcte après un complément de temps.|Am Freitag spiele ich Basketball.|Am Freitag ich spiele Basketball.|Am Freitag spielen ich Basketball.|v2
C|« Wir treffen uns Sonntag um zehn Uhr im Kino. » Quel rendez-vous est exact ?|Sonntag, 10 Uhr, Kino.|Samstag, 10 Uhr, Kino.|Sonntag, 11 Uhr, Kino.|rendez-vous
G|Ich spiele ___ gern Volleyball.|nicht|Je n’aime pas jouer au volleyball.|négation
G|Wir ___ gern Fußball.|spielen|Nous aimons jouer au football.|conjugaison
G|___ du morgen Zeit?|Hast|As-tu le temps demain ?|disponibilité-du
G|Ich gehe ___ ins Kino als ins Museum.|lieber|Je préfère aller au cinéma plutôt qu’au musée.|comparaison
G|Am Sonntag ___ wir schwimmen.|gehen|Dimanche, nous allons nager.|v2-pluriel
G|Wollen wir am Freitag Fußball ___?|spielen|On joue au football vendredi ?|infinitif
G|Wir treffen uns ___ Samstag.|am|Nous nous retrouvons samedi.|jour
G|Wir treffen uns ___ zehn Uhr.|um|Nous nous retrouvons à dix heures.|heure
#13
C|« Ein Doppelzimmer für zwei Personen und drei Nächte. » Quelle réservation correspond ?|Une chambre double, deux personnes, trois nuits.|Deux chambres, trois personnes, une nuit.|Une chambre individuelle, deux personnes, trois nuits.|réservation
C|« Vom zweiten bis zum vierten August. » Combien de nuits cela fait-il ?|Zwei Nächte.|Drei Nächte.|Vier Nächte.|dates-nuits
C|« Abfahrt 08:00, Ankunft 10:00. » Quel est le départ ?|08:00|10:00|02:00|départ-durée
C|« Der Zug kommt um elf Uhr an. » Que se passe-t-il à onze heures ?|Le train arrive.|Le train part.|Le trajet dure onze heures.|arrivée
C|Demande si le petit-déjeuner est compris.|Ist das Frühstück inklusive?|Wie viel kostet das Frühstück?|Wann beginnt das Frühstück?|prestation
C|Choisis la phrase avec le verbe séparable correctement placé.|Um acht Uhr fährt der Zug ab.|Um acht Uhr der Zug fährt ab.|Um acht Uhr abfährt der Zug.|séparable-v2
G|Ich möchte ein Doppelzimmer ___.|reservieren|Je voudrais réserver une chambre double.|infinitif
G|Für drei ___, bitte.|Nächte|Pour trois nuits, s’il vous plaît.|pluriel
G|Vom zweiten bis ___ vierten August.|zum|Du deux au quatre août.|période
G|Das Zimmer ist ___ zwei Personen.|für|La chambre est pour deux personnes.|personnes
G|Der Zug fährt um sieben Uhr ___.|ab|Le train part à sept heures : abfahren.|abfahren
G|Wann kommt der Bus ___?|an|Quand le bus arrive-t-il : ankommen ?|ankommen
G|Die Fahrt ___ drei Stunden.|dauert|Le trajet dure trois heures.|durée
G|Der Bus ___ um acht Uhr ab.|fährt|Le bus part à huit heures.|irrégulier
#14
C|« Ich habe seit Montag Fieber. Heute ist Dienstag. » Depuis quand la fièvre dure-t-elle ?|Seit Montag.|Seit Dienstag.|Seit Mittwoch.|durée
C|« Ich bin müde und habe Husten. » Quels symptômes ou états sont indiqués ?|Fatigue et toux.|Fièvre et toux.|Fatigue et mal de tête.|symptômes
C|Choisis la phrase correcte pour décrire ton état.|Ich bin krank.|Ich habe krank.|Ich sind krank.|sein-haben
C|Tu préviens le cours que tu seras absent aujourd’hui.|Ich kann heute nicht kommen.|Ich kann heute nicht komme.|Ich heute kann nicht kommen.|absence
C|« Ich brauche morgen einen Termin beim Arzt. » Que demande la personne ?|Un rendez-vous médical demain.|Une absence aujourd’hui.|Une pharmacie ouverte demain.|besoin
C|Que souhaites-tu à une personne malade ?|Gute Besserung!|Guten Appetit!|Gute Reise!|formule
G|Ich ___ seit Montag Husten.|habe|Je tousse depuis lundi.|haben
G|Meine Schwester ___ krank.|ist|Ma sœur est malade.|sein
G|Ich bin seit zwei ___ krank.|Tagen|Je suis malade depuis deux jours.|seit-datif
G|Ich kann morgen nicht ___.|kommen|Je ne peux pas venir demain.|modal
G|Ich brauche morgen ___ Termin.|einen|J’ai besoin d’un rendez-vous demain.|article
G|Seit ___ haben Sie Kopfschmerzen?|wann|Depuis quand avez-vous mal à la tête ?|question-durée
G|Ich bin heute ___ Arzt.|beim|Je suis chez le médecin aujourd’hui.|lieu
G|Ich wünsche Ihnen gute ___!|Besserung|Je vous souhaite un bon rétablissement.|souhait
#15
C|« Ich feiere am Freitag um neunzehn Uhr bei mir. » Quelle invitation reprend tous les détails ?|Vendredi, 19 h, chez la personne.|Samedi, 19 h, chez la personne.|Vendredi, 18 h, au café.|invitation
C|Tu acceptes une invitation. Quelle réponse est claire ?|Vielen Dank, ich komme gern.|Vielen Dank, ich kann nicht kommen.|Vielen Dank, vielleicht später.|acceptation
C|Tu dois travailler et refuses poliment.|Leider kann ich nicht kommen. Ich muss arbeiten.|Leider kann ich kommen. Ich muss nicht arbeiten.|Leider kann ich nicht arbeite. Ich muss kommen.|refus-raison
C|Tu proposes d’apporter du pain.|Kann ich Brot mitbringen?|Kann ich Brot bringe mit?|Kann ich mitbringt Brot?|modal-séparable
C|« Ich bringe Wasser mit. Anna bringt einen Kuchen mit. » Qu’apporte Anna ?|Einen Kuchen.|Wasser.|Einen Salat.|contribution
C|Choisis une question adressée à un ami.|Kannst du am Freitag kommen?|Können du am Freitag kommen?|Kannst Sie am Freitag kommen?|du
G|Die Party ist morgen ___ mir.|bei|La fête est chez moi demain.|lieu
G|Ich feiere ___ Donnerstag Geburtstag.|am|Je fête mon anniversaire jeudi.|jour
G|Die Party beginnt ___ neunzehn Uhr.|um|La fête commence à dix-neuf heures.|heure
G|Danke ___ deine Einladung.|für|Merci pour ton invitation.|remerciement
G|Ich bringe Brot ___.|mit|J’apporte du pain : mitbringen.|séparable
G|Ich ___ leider arbeiten.|muss|Je dois malheureusement travailler.|müssen
G|___ du einen Salat mitbringen?|Kannst|Peux-tu apporter une salade ?|können
G|Lieber Paul, viele ___!|Grüße|Cher Paul, amitiés !|formule-finale
#16
C|« Parken nur für Kunden. » Qui peut se garer ici ?|Les clients.|Tout le monde.|Personne.|restriction
C|« Fotografieren verboten, Essen erlaubt. » Quelle action est autorisée ?|Essen.|Fotografieren.|Rauchen.|permission
C|« Montag geschlossen. Dienstag ab 10 Uhr geöffnet. » Quand peut-on entrer ?|Dienstag um 11 Uhr.|Dienstag um 9 Uhr.|Montag um 11 Uhr.|horaires-inférence
C|« Geöffnet von 9 bis 18 Uhr. » À quelle heure le magasin ferme-t-il ?|18 Uhr.|9 Uhr.|19 Uhr.|fermeture
C|« Der Zug fällt aus. » Que se passe-t-il ?|Le train est annulé.|Le train a du retard.|Le train change de voie.|annonce
C|Choisis la phrase correcte pour « Ce n’est pas une entrée ».|Das ist kein Eingang.|Das ist nicht Eingang.|Das ist keine Eingang.|kein
G|Bitte steigen Sie ___ aus.|nicht|Ne descendez pas, s’il vous plaît.|nicht
G|Rauchen ist hier ___.|verboten|Il est interdit de fumer ici.|interdit
G|Parken ist hier ___.|erlaubt|Il est autorisé de se garer ici.|autorisé
G|Nur ___ Kunden.|für|Réservé aux clients.|restriction-préposition
G|Wir haben von zehn ___ siebzehn Uhr geöffnet.|bis|Nous sommes ouverts de dix à dix-sept heures.|plage
G|Das Geschäft ist ___ neun Uhr geöffnet.|ab|Le magasin est ouvert à partir de neuf heures.|ab
G|Der Zug ___ heute aus.|fällt|Le train est annulé aujourd’hui.|séparable
G|Heute ist das Geschäft ___.|geschlossen|Aujourd’hui, le magasin est fermé.|fermé
#17
C|Tu demandes une permission d’ouvrir la fenêtre.|Kann ich bitte das Fenster öffnen?|Können ich bitte das Fenster öffnen?|Kann ich bitte das Fenster öffne?|permission
C|Tu demandes poliment qu’on te donne un livre.|Können Sie mir bitte das Buch geben?|Können Sie mich bitte das Buch geben?|Können Sie mir bitte das Buch gibt?|demande-objet
C|« Tut mir leid, das geht nicht. » La réponse est-elle positive ?|Non, c’est un refus.|Oui, c’est une acceptation.|Elle demande de répéter.|refus
C|« Einen Moment, bitte. » Que demande la personne ?|D’attendre un instant.|De répéter la question.|De revenir demain.|attente
C|Tu veux entendre la demande à nouveau.|Noch einmal, bitte.|Einen Moment, bitte.|Ja, natürlich.|répéter
C|Choisis une acceptation sans ambiguïté.|Ja, natürlich. Hier, bitte.|Vielleicht, aber nicht heute.|Tut mir leid, leider nicht.|acceptation
G|Können Sie ___ das Glas geben?|mir|Pouvez-vous me donner le verre ?|mir
G|Können Sie mir ___ Stift geben?|den|Pouvez-vous me donner le stylo ?|accusatif
G|Kann ich das Fenster ___?|öffnen|Puis-je ouvrir la fenêtre ?|infinitif
G|Tut mir leid, das geht ___.|nicht|Désolé, ce n’est pas possible.|négation
G|Noch ___, bitte.|einmal|Encore une fois, s’il vous plaît.|répétition
G|Einen Moment, ___.|bitte|Un instant, s’il vous plaît.|politesse
G|Ja, ___. Hier bitte.|natürlich|Oui, bien sûr. Voilà.|acceptation-formule
G|___ Sie mir bitte helfen?|Können|Pouvez-vous m’aider ? Adresse-toi poliment à une personne.|modal-formel
#18
C|« Kreuzen Sie die richtige Antwort an. » Que dois-tu faire ?|Cocher la bonne réponse.|Écrire un texte libre.|Écouter une seconde fois.|consigne
C|« Sie hören den Dialog zweimal. » Combien d’écoutes sont prévues ?|Deux.|Une.|Trois.|quantité
C|« Zuerst lesen, dann hören, zum Schluss schreiben. » Quelle action vient en dernier ?|Schreiben.|Lesen.|Hören.|séquence
C|Choisis une consigne polie.|Schreiben Sie bitte Ihren Namen.|Schreibt Sie bitte Ihren Namen.|Schreiben Ihren Namen Sie bitte.|impératif
C|Après Danach, choisis l’ordre neutre.|Danach prüfe ich den Text.|Danach ich prüfe den Text.|Danach prüfen ich den Text.|v2
C|Un message doit répondre à trois points. Quel plan est complet ?|Salutation, trois points, formule de fin.|Salutation, un point, formule de fin.|Trois points sans salutation ni formule de fin.|plan
G|Bitte ___ Sie den Dialog.|hören|Écoutez le dialogue, s’il vous plaît.|consigne-écouter
G|Kreuzen Sie die richtige Antwort ___.|an|Cochez la bonne réponse : ankreuzen.|séparable
G|Dann ___ ich einen kurzen Text.|schreibe|Ensuite, j’écris un court texte.|schreiben
G|Zum Schluss ___ ich meine Antworten.|prüfe|Pour finir, je vérifie mes réponses.|prüfen
G|___ lese ich die Aufgabe, dann höre ich den Text.|Zuerst|D’abord, je lis la consigne ; ensuite, j’écoute le texte.|séquence-début
G|Ist die Antwort richtig ___ falsch?|oder|La réponse est-elle vraie ou fausse ?|alternative
G|Danach ___ wir die Antworten.|vergleichen|Après, nous comparons les réponses.|pluriel
G|Bitte ___ Sie die Aufgabe.|lesen|Lisez la consigne, s’il vous plaît.|consigne-lire
#19
C|« Meine Arme tun weh, mein Rücken tut nicht weh. » Où la personne a-t-elle mal ?|Die Arme.|Der Rücken.|Der Bauch.|douleur-lecture
C|Choisis la phrase correcte pour plusieurs jambes.|Meine Beine tun weh.|Meine Beine tut weh.|Meine Beine tust weh.|pluriel-tun
C|« Seit gestern habe ich Kopfschmerzen. » Depuis quand a-t-elle mal ?|Seit gestern.|Seit heute.|Seit morgen.|durée
C|Tu cherches la pharmacie la plus proche.|Wo ist die nächste Apotheke?|Wann ist die nächste Apotheke?|Woher ist die nächste Apotheke?|localiser
C|Une personne dit « Nehmen Sie diese Tabletten. » Que demande-t-elle ?|De prendre ces comprimés.|De chercher un rendez-vous.|De décrire la durée.|consigne
C|Demande un rendez-vous chez le médecin.|Ich brauche einen Termin beim Arzt.|Ich brauche ein Termin beim Arzt.|Ich brauche einen Termin zum Arzt.|demande
G|Mein Bauch ___ seit heute weh.|tut|J’ai mal au ventre depuis aujourd’hui.|singulier
G|Meine Hände ___ weh.|tun|J’ai mal aux mains.|pluriel
G|___ Hand tut seit gestern weh.|Meine|J’ai mal à la main depuis hier.|possessif-féminin
G|Ich habe seit gestern ___.|Kopfschmerzen|J’ai mal à la tête depuis hier.|symptôme
G|Anna braucht ___ Arzt.|einen|Anna a besoin d’un médecin.|accusatif-masculin
G|Ich suche ___ Apotheke.|eine|Je cherche une pharmacie.|accusatif-féminin
G|___ wann tut Ihr Kopf weh?|Seit|Depuis quand avez-vous mal à la tête ?|question
G|Wo ist die nächste ___?|Apotheke|Où est la pharmacie la plus proche ?|vocabulaire
#20
C|« Heute regnet es. Morgen ist es sonnig. » Quel temps est prévu demain ?|Du soleil.|De la pluie.|De la neige.|météo-temps
C|« Es ist kalt und windig. » Quelle description correspond ?|Froid et vent.|Chaud et vent.|Froid et soleil.|météo-description
C|Tu prends un parapluie parce qu’il pleut. Choisis la phrase correcte.|Ich nehme einen Regenschirm mit.|Ich mitnehme einen Regenschirm.|Ich nehme einen Regenschirm an.|séparable
C|Choisis la phrase avec l’ordre correct.|Heute schneit es.|Heute es schneit.|Heute schneien es.|v2
C|Tu dis avoir besoin d’une veste.|Ich brauche eine Jacke.|Ich brauche einen Jacke.|Ich brauche ein Jacke.|accusatif-féminin
C|« Im Winter trage ich einen Mantel. » À quelle saison porte-t-elle un manteau ?|Im Winter.|Im Sommer.|Im Frühling.|saison
G|Heute ___ es.|regnet|Aujourd’hui, il pleut.|regnen
G|Morgen ___ es kalt.|ist|Demain, il fera froid.|sein
G|Ich brauche heute ___ Mantel.|einen|J’ai besoin d’un manteau aujourd’hui.|accusatif-masculin
G|Wir brauchen ___ Hemd.|ein|Nous avons besoin d’une chemise.|accusatif-neutre
G|Nimm bitte einen Regenschirm ___.|mit|Prends un parapluie : mitnehmen.|particule
G|___ Winter schneit es.|Im|En hiver, il neige.|préposition-saison
G|Anna ___ eine Jacke.|braucht|Anna a besoin d’une veste.|brauchen
G|Morgen ist es ___.|windig|Demain, il y aura du vent.|adjectif
#21
C|« Ich lese gern, aber ich höre lieber Musik. » Quelle activité préfère la personne ?|Musik hören.|Bücher lesen.|Tennis spielen.|préférence
C|« Treffen wir uns um 18 Uhr? Das Konzert beginnt um 19 Uhr. » À quelle heure est le rendez-vous ?|18 Uhr.|19 Uhr.|20 Uhr.|rencontre-début
C|« Eintritt: 13 Euro. Beginn: 20 Uhr. » Combien coûte l’entrée ?|Dreizehn Euro.|Zwanzig Euro.|Dreißig Euro.|prix
C|Propose d’aller au musée.|Wollen wir morgen ins Museum gehen?|Wollen wir morgen im Museum gehen?|Wollen wir morgen ins Museum geht?|proposition
C|Choisis la phrase correcte au présent.|Du liest gern.|Du lest gern.|Du lese gern.|lesen-du
C|« Wir treffen uns vor dem Kino, nicht vor dem Museum. » Où se retrouvent-ils ?|Vor dem Kino.|Vor dem Museum.|Im Museum.|lieu-rencontre
G|Anna ___ gern Bücher.|liest|Anna aime lire des livres.|lesen-elle
G|Ich ___ gern Musik.|höre|J’aime écouter de la musique.|hören
G|Wir gehen ___ ins Kino.|lieber|Nous préférons aller au cinéma.|préférence-production
G|Der Eintritt ___ dreizehn Euro.|kostet|L’entrée coûte treize euros.|prix-verbe
G|Das Konzert ___ um neunzehn Uhr.|beginnt|Le concert commence à dix-neuf heures.|beginnen
G|Treffen wir ___ um achtzehn Uhr?|uns|On se retrouve à dix-huit heures ?|réfléchi
G|Wollen wir am Freitag ins Kino ___?|gehen|On va au cinéma vendredi ?|infinitif
G|Ich lese ___ gern.|nicht|Je n’aime pas lire.|négation
#22
C|« Hallo, hier ist Paul. Können Sie mich heute zurückrufen? » Qui demande un rappel ?|Paul.|Marie.|Anna.|appelant
C|« Heute kann ich nicht. Ich rufe Sie morgen zurück. » Quand le rappel aura-t-il lieu ?|Morgen.|Heute.|Übermorgen.|rappel-temps
C|Choisis la bonne phrase avec zurückrufen.|Ich rufe Sie am Freitag zurück.|Ich zurückrufe Sie am Freitag.|Ich rufe zurück Sie am Freitag.|séparable
C|Tu écris à Madame Klein. Quelle formulation respecte la politesse ?|Ich schicke Ihnen eine E-Mail.|Ich schicke dir eine E-Mail.|Ich schicke du eine E-Mail.|registre
C|« Treffen wir uns morgen um elf Uhr vor der Bibliothek? » Quelle réponse confirme correctement ?|Ja, morgen um elf vor der Bibliothek.|Ja, heute um elf vor der Bibliothek.|Ja, morgen um zehn vor der Bibliothek.|sms-compréhension
C|Ton téléphone est cassé. Quelle annonce convient ?|Mein Handy ist kaputt.|Mein Handy hat kaputt.|Mein Handy sind kaputt.|problème
G|Kannst du mich morgen ___?|zurückrufen|Peux-tu me rappeler demain ?|modal-infinitif
G|Wir rufen Sie heute ___.|zurück|Nous vous rappelons aujourd’hui.|particule
G|Ich schicke ___ ein Foto.|dir|Je t’envoie une photo, à toi mon ami.|datif-informel
G|Bitte antworten Sie ___.|mir|Répondez-moi, s’il vous plaît.|mir
G|Können Sie mich am Montag ___?|zurückrufen|Pouvez-vous me rappeler lundi ?|infinitif-complet
G|Hallo, hier ___ Anna.|ist|Allô, ici Anna.|formule-téléphone
G|Wir treffen uns morgen ___ der Bibliothek.|vor|Nous nous retrouvons demain devant la bibliothèque.|lieu
G|Bitte sprechen Sie etwas ___.|langsamer|Parlez un peu plus lentement, s’il vous plaît.|clarification
#23
C|Tu as besoin d’un timbre et demandes où en obtenir un.|Wo bekomme ich eine Briefmarke?|Wann bekomme ich eine Briefmarke?|Woher komme ich mit einer Briefmarke?|guichet
C|« Bitte hier unterschreiben. » Que faut-il faire ?|Signer ici.|Écrire son adresse ici.|Cocher la réponse ici.|consigne-signer
C|« Anna Klein, geboren in Bonn, wohnt in Berlin. » Que faut-il écrire dans Geburtsort ?|Bonn|Berlin|Klein|formulaire-lieu
C|« Paul Weber, Hauptstraße 8, 10115 Berlin. » Que faut-il écrire dans Familienname ?|Weber|Paul|Hauptstraße|formulaire-nom
C|Tu veux t’inscrire. Choisis la phrase correcte.|Ich möchte mich anmelden.|Ich möchte mich melde an.|Ich möchte mich anmeldet.|modal-réfléchi
C|« Die Post ist von 9 bis 17 Uhr geöffnet. » Quand peux-tu y aller ?|Um 16 Uhr.|Um 8 Uhr.|Um 18 Uhr.|horaire
G|Ich brauche bitte ___ Briefmarke.|eine|J’ai besoin d’un timbre.|article-féminin
G|Ich möchte bitte ___ Ausweis.|einen|Je voudrais une pièce d’identité.|article-masculin
G|Wo kann ich ___?|unterschreiben|Où puis-je signer ?|infinitif
G|Füllen Sie bitte das Formular ___.|aus|Remplissez le formulaire : ausfüllen.|séparable
G|Wie ist Ihr ___?|Vorname|Demande le prénom poliment.|champ-prénom
G|Straße und Hausnummer gehören zur ___.|Adresse|La rue et le numéro font partie de l’adresse.|champ-adresse
G|Das Datum der Geburt heißt ___.|Geburtsdatum|Écris le nom du champ de la date de naissance.|champ-date
G|Wo ___ ich ein Formular?|bekomme|Où est-ce que je peux avoir un formulaire ?|bekommen
#24
C|« Ich komme aus Kanada und wohne jetzt in Bonn. » Quelle information concerne l’origine ?|Kanada.|Bonn.|Berlin.|présentation
C|« Ich komme gern, aber erst um acht. » Que signifie la réponse ?|La personne accepte et arrivera à huit heures.|La personne refuse de venir.|La personne demande de venir à sept heures.|opposition
C|Tu ne comprends pas et demandes de répéter poliment.|Können Sie das noch einmal sagen?|Können Sie das noch einmal sagt?|Können Sie das noch einmal sagst?|clarification
C|Un message doit remercier, confirmer vendredi à 19 h et demander si l’on peut apporter du pain. Quel texte remplit les trois points ?|Danke! Ich komme Freitag um 19 Uhr. Kann ich Brot mitbringen?|Danke! Ich komme Freitag um 19 Uhr. Viele Grüße!|Danke! Ich komme Samstag um 19 Uhr. Kann ich Brot mitbringen?|message-complet
C|Quelle phrase relie deux informations sans opposition ?|Ich wohne in Berlin und spreche Deutsch.|Ich wohne in Berlin aber spreche Deutsch.|Ich wohne in Berlin oder spreche Deutsch.|liaison
C|Tu termines un message à un ami. Quelle formule convient ?|Viele Grüße!|Sehr geehrte Frau Klein!|Liebe Anna!|fin-message
G|Ich heiße Paul und ___ in Halifax.|wohne|Je m’appelle Paul et j’habite à Halifax.|présentation-ville
G|Woher ___ du, Anna?|kommst|D’où viens-tu, Anna ?|question-du
G|Ich komme gern, ___ ich komme um acht Uhr.|aber|Je viens avec plaisir, mais j’arrive à huit heures.|opposition-production
G|Danke für ___ Einladung, Anna.|deine|Merci pour ton invitation, Anna.|possessif
G|Ich kann am Freitag nicht ___.|kommen|Je ne peux pas venir vendredi.|modal
G|Kann ich Brot ___?|mitbringen|Puis-je apporter du pain ?|séparable-modal
G|Die Party ist ___ Samstag.|am|La fête est samedi.|jour
G|Vielen Dank und viele ___!|Grüße|Merci beaucoup et amitiés !|salutation-finale
`);
  const content=window.DE_A1_STUDY_CONTENT;
  const remask=(id,u,i,marked,wrong)=>{content[id][u].rows[i][0]=marked;content[id][u].practice[i].wrong=wrong;};
  // The gap targets the stated grammar; the unchanged sentence stays in the reference.
  remask(2,1,0,'Können Sie das bitte |buchstabieren|?',['buchstabiert','buchstabierst']);
  remask(2,1,1,'Können Sie das bitte |wiederholen|?',['wiederholt','wiederholst']);
  remask(2,1,2,'Können Sie bitte langsamer |sprechen|?',['spricht','sprecht']);
  remask(4,0,3,'Es ist |fünf| Uhr.',['vier','sechs']);
  remask(4,3,2,'Der Termin ist am |Mittwoch| um zehn Uhr.',['Dienstag','Donnerstag']);
  remask(4,3,3,'Der Termin ist am Freitag um |elf| Uhr.',['zehn','zwölf']);
  remask(5,0,2,'Das ist |mein| Bruder.',['meine','meinen']);
  remask(5,0,3,'Das ist |meine| Schwester.',['mein','meinen']);
  remask(8,0,0,'Die Wohnung hat |zwei| Zimmer.',['drei','vier']);
  remask(8,0,1,'Die Wohnung hat |einen| Balkon.',['ein','eine']);
  remask(8,0,2,'Die Wohnung hat |eine| Küche.',['ein','einen']);
  remask(8,0,3,'Die Wohnung hat |ein| Bad.',['eine','einen']);
  remask(8,1,0,'Ich suche |eine| Wohnung.',['ein','einen']);
  remask(8,1,1,'Ich suche |ein| Zimmer.',['eine','einen']);
  remask(8,1,2,'Ich suche |ein| Haus.',['eine','einen']);
  remask(10,0,2,'Ich arbeite |in der| Schule.',['im','in dem']);
  for(const id of [10,14])for(let i=0;i<2;i++)content[id][1].practice[i].wrong=['am Montag','am Dienstag'];
  remask(13,0,3,'Ich möchte |zwei| Zimmer reservieren.',['drei','vier']);
  // Keep number reading here; transfer questions additionally test the separable verbs.
  remask(15,1,0,'Ich bringe |einen| Kuchen mit.',['ein','eine']);
  remask(15,1,1,'Ich bringe |einen| Salat mit.',['ein','eine']);
  remask(15,1,2,'Ich bringe Brot |mit|.',['an','ab']);
  remask(15,1,3,'Ich bringe Wasser |mit|.',['an','ab']);
  content[16][1].practice[0].wrong=['offen','geöffnet'];
  // offen is a correct alternative to geöffnet and is accepted when typing.
  content[16][1].practice[1].wrong=['geschlossen','zu'];
  content[16][1].practice[2].wrong=['heute','übermorgen'];
  for(const [i,article,noun] of [[0,'den','Stift'],[1,'das','Buch'],[2,'die','Tasche'],[3,'das','Glas']])
    remask(17,0,i,`Können Sie mir bitte |${article}| ${noun} geben?`,['den','die','das'].filter(a=>a!==article));
  remask(19,0,2,'Mein Hals |tut| weh.',['tun','tust']);
  remask(19,0,3,'Mein Bauch |tut| weh.',['tun','tust']);
  remask(19,1,0,'Ich brauche |einen| Termin.',['ein','eine']);
  remask(19,1,1,'Ich brauche |einen| Arzt.',['ein','eine']);
  remask(19,1,2,'Ich brauche |eine| Apotheke.',['ein','einen']);
  content[19][1].practice[3].wrong=['Brot','Milch'];
  for(let i=0;i<2;i++)content[22][0].practice[i].wrong=['am Montag','am Dienstag'];
  for(let i=2;i<4;i++)content[22][0].practice[i].wrong=['Mittwoch','Freitag'];
  remask(22,1,0,'Ich schicke dir |eine| Nachricht.',['ein','einen']);
  remask(22,1,1,'Ich schicke dir |eine| E-Mail.',['ein','einen']);
  remask(22,1,2,'Ich schicke dir |ein| Foto.',['eine','einen']);
  remask(22,1,3,'Ich schicke dir |meine| Adresse.',['mein','meinen']);
  remask(23,0,0,'Ich brauche |eine| Briefmarke.',['ein','einen']);
  remask(23,0,1,'Ich brauche |ein| Formular.',['eine','einen']);
  remask(23,0,2,'Ich brauche |einen| Umschlag.',['ein','eine']);
  remask(23,0,3,'Ich brauche |einen| Ausweis.',['ein','eine']);
  // Previously absent prerequisites are explicitly taught before they are tested.
  content[2][0].extra.push(['Anna schreibt man mit Doppel-n.','Anna s’écrit avec deux n.']);
  content[7][0].rule+=' **Wie viele Äpfel?** demande un nombre de pommes ; **Wie viel kostet …?** demande un prix. Une bouteille = eine Flasche, deux bouteilles = zwei Flaschen.';
  content[7][0].extra.push(['zwei Flaschen Wasser','deux bouteilles d’eau']);
  content[11][1].extra.push(['Können Sie das Wort erklären?','Pouvez-vous expliquer le mot ?'],['Du liest ein Buch.','Tu lis un livre.']);
  content[21][0].extra.push(['Du liest gern.','Tu aimes lire.'],['Anna liest gern.','Anna aime lire.']);
  content[17][0].rule+=' Après helfen et geben, **mir** signifie à moi ; **mich** est employé notamment dans Können Sie mich zurückrufen? Le sujet ich devient **Kann ich …?**, sans terminaison -st.';
  const key=s=>String(s??'').normalize('NFC').replace(/[’‘ʼ]/g,"'").trim().replace(/\s+/g,' ');
  function matchesAnswer(value,q){
    // Umlauts carry meaning: konnte and könnte must remain different.
    const normalize=s=>{let t=key(s);if(!q.marking?.caseSensitive)t=t.toLocaleLowerCase('de');return t.replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/Ä/g,'Ae').replace(/Ö/g,'Oe').replace(/Ü/g,'Ue').replace(/ß/g,'ss').replace(/[.!?]+$/,'').trim();};
    return [q.answer,...(q.accept||[])].some(a=>normalize(value)===normalize(a));
  }
  const choice=(row,focus)=>{
    const [prompt,answer,w1,w2,context]=row;
    return {type:'choice',q:`« ${context} » — Complète : ${prompt}`,o:[answer,w1,w2],a:0,answer,audio:prompt.replace('___',answer),context,explanation:prompt.replace('___',answer)+' = '+context,skill:'application',qualityRevision:revision,focus};
  };
  function practiceTasks(id,index){return practice[id+'.'+index].map((r,i)=>choice(r,'practice:'+id+':'+index+':'+i));}
  // Interpretive choices are in French; their replay remains an authored German phrase.
  const checkAudio={
    '1:langues':'Ich spreche Deutsch und Französisch.',
    '5:état-civil':'Die Person ist verheiratet.',
    '6:lecture-commande':'Einen Tee mit Zucker, aber ohne Milch, bitte.',
    '7:taille-transfert':'Größe vierzig ist zu klein. Haben Sie Größe zweiundvierzig?',
    '8:logement-lecture':'Drei Zimmer, eine Küche, ein Bad. Kein Balkon.',
    '8:annonce':'Die Wohnung ist frei.',
    '8:loyer':'Die Miete ist sechshundert Euro. Nebenkosten inklusive.',
    '9:ordre-trajet':'Gehen Sie zuerst geradeaus und dann nach rechts.',
    '9:gleis':'Der Zug fährt von Gleis drei ab.',
    '9:umsteigen':'Sie müssen am Bahnhof umsteigen.',
    '9:retard':'Der Zug hat zehn Minuten Verspätung.',
    '11:moment-journée':'Mein Kurs ist am Vormittag.',
    '11:depuis-présent':'Ich lerne seit sechs Monaten Deutsch.',
    '11:ordre-lecture':'Ich lese ein Buch und mache dann die Hausaufgaben.',
    '12:préférence':'Ich gehe lieber ins Kino.',
    '13:réservation':'Ein Doppelzimmer für zwei Personen und drei Nächte, bitte.',
    '13:arrivée':'Der Zug kommt um elf Uhr an.',
    '14:symptômes':'Ich bin müde und habe Husten.',
    '14:besoin':'Ich brauche morgen einen Termin beim Arzt.',
    '15:invitation':'Ich feiere am Freitag um neunzehn Uhr bei mir.',
    '16:restriction':'Parken nur für Kunden.',
    '16:annonce':'Der Zug fällt aus.',
    '17:refus':'Tut mir leid, das geht nicht.',
    '17:attente':'Einen Moment, bitte.',
    '18:consigne':'Kreuzen Sie die richtige Antwort an.',
    '18:quantité':'Sie hören den Dialog zweimal.',
    '18:plan':'Anrede, drei Punkte, Gruß.',
    '19:consigne':'Nehmen Sie diese Tabletten.',
    '20:météo-temps':'Morgen ist es sonnig.',
    '20:météo-description':'Es ist kalt und windig.',
    '23:consigne-signer':'Bitte hier unterschreiben.',
    '24:opposition':'Ich komme gern, aber erst um acht.'
  };
  function checkTasks(id){
    return checks[id].map(row=>{
      const [type,prompt,answer,x,y,focus]=row;
      if(type==='C')return {type:'choice',q:prompt,o:[answer,x,y],a:0,answer,audio:checkAudio[id+':'+focus]||answer,answerLang:checkAudio[id+':'+focus]?'fr':'de',context:'',explanation:checkAudio[id+':'+focus]||answer,skill:'transfer',focus,qualityRevision:revision};
      return {type:'gap',q:`« ${x} » — Complète : ${prompt}`,prompt,context:x,answer,accept:[],audio:prompt.replace('___',answer),explanation:prompt.replace('___',answer)+' = '+x,skill:'transfer',focus:y,marking:{strictAccents:true},qualityRevision:revision};
    });
  }
  window.DE_A1_QUESTIONS={revision,practiceTasks,checkTasks,matchesAnswer,practice,checks};
})();
