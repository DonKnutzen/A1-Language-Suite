/* Loaded only by the two A1 courses. State is owned by the existing profile save. */
(function(){
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clean=s=>String(s??'').replace(/\|/g,'').trim();
  const key=s=>clean(s).normalize('NFC').replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();
  const searchKey=s=>key(s).toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ß/g,'ss');
  // Explanatory notes in German headwords belong to the learner's French language.
  // Keep raw words and card IDs unchanged for lesson associations and saved decks.
  const frenchNotes={"Singular":"singulier","Plural":"pluriel","beim Vergleichen":"comparaison","je nach Zusammenhang":"selon le contexte","umgangssprachlich":"familier","Armband":"bracelet","Wand":"murale","unbestimmte Menge":"quantité indéfinie","Frau spricht":"dit par une femme","Mann spricht":"dit par un homme","höflich":"poli","vertraut":"familier","Einzahl":"singulier","Mehrzahl":"pluriel","Besitz, Einzahl":"un possesseur","Besitz, Mehrzahl":"plusieurs possesseurs","Kleidung":"vêtements","Rachen":"gorge","bestimmter Artikel":"article défini","je nach Kontext":"selon le contexte","aus einer Auswahl":"parmi plusieurs","zeitlich":"temps","Kochen":"cuisine","Anrede":"civilité","je nach Stellung":"selon la position","Medikamente":"médicaments","hinweisend":"démonstratif","Mehrzahl, m. oder gemischt":"pluriel, m. ou mixte","Mehrzahl, f.":"pluriel, f.","mehrere Besitzer":"plusieurs possesseurs","Auswahl, m.":"choix, m.","Auswahl, f.":"choix, f."};
  const compactForms={
  "de": {
    "deutsch / Deutscher / Deutsche": "deutsch (adj.) / ein Deutscher (m.) / eine Deutsche (f.)",
    "allemand / allemande": "allemand / allemande (adj.) ; un Allemand (m.) ; une Allemande (f.)",
    "französisch / Franzose / Französin": "französisch (adj.) / ein Franzose (m.) / eine Französin (f.)",
    "français / française": "français / française (adj.) ; un Français (m.) ; une Française (f.)",
    "le médecin": "le médecin / la médecin",
    "le professeur": "le professeur / la professeure",
    "le destinataire": "le destinataire / la destinataire",
    "l’expéditeur (m.)": "l’expéditeur / l’expéditrice",
    "le propriétaire": "le propriétaire / la propriétaire",
    "Sie / ihr": "Sie (politesse) / ihr (plusieurs proches)",
    "vous": "vous (politesse) / vous (plusieurs proches)",
    "ils / elles": "ils (m. ou mixte) / elles (f.)",
    "die Tochter / das Mädchen": "die Tochter (famille) / das Mädchen (enfant)",
    "la fille": "la fille (lien familial) / la fille (jeune fille)",
    "die Frau / die Ehefrau": "die Frau / die Ehefrau (mariage)",
    "la femme": "la femme / l’épouse",
    "le menu": "la carte / le menu",
    "le temps": "le temps (météo) / le temps (durée)",
    "le fruit": "les fruits / un fruit",
    "le feu": "le feu tricolore / le feu",
    "das Zimmer / das Schlafzimmer": "das Zimmer (hôtel) / das Schlafzimmer",
    "la chambre": "la chambre (hôtel) / la chambre à coucher",
    "mein / meine": "mein / meine (selon le nom)",
    "dein / deine": "dein / deine (selon le nom)",
    "sein / ihr (Besitz, Einzahl)": "sein / ihr (un possesseur)",
    "notre / nos": "notre (sing.) / nos (pl.)",
    "votre / vos": "votre (sing.) / vos (pl.)",
    "gehen / fahren": "gehen (à pied) / fahren (en véhicule)",
    "aller": "aller à pied / aller en véhicule",
    "bon / bonne": "bon / bonne (qualité)",
    "bien": "bien (manière / état)"
  },
  "fr": {
    "français / française": "français / française (Adjektiv); un Français / une Française (Person)",
    "französisch / Franzose / Französin": "französisch (Adjektiv); ein Franzose / eine Französin",
    "allemand / allemande": "allemand / allemande (Adjektiv); un Allemand / une Allemande (Person)",
    "deutsch / Deutscher / Deutsche": "deutsch (Adjektiv); ein Deutscher / eine Deutsche",
    "le médecin": "le médecin / la médecin",
    "le professeur": "le professeur / la professeure",
    "le destinataire": "le destinataire / la destinataire",
    "l’expéditeur (m.)": "l’expéditeur / l’expéditrice",
    "le propriétaire": "le propriétaire / la propriétaire",
    "la fille": "la fille (Tochter / Mädchen)",
    "la femme": "la femme (Frau / Ehefrau)",
    "le menu": "la carte / le menu",
    "le temps": "le temps (Wetter / Zeit)",
    "le fruit": "les fruits / un fruit",
    "le feu": "le feu tricolore / le feu",
    "la chambre": "la chambre (Hotelzimmer) / la chambre à coucher",
    "gehen / fahren": "gehen (zu Fuß) / fahren (mit einem Verkehrsmittel)",
    "bon / bonne": "bon / bonne (Qualität)",
    "bien": "bien (Art und Weise / Befinden)"
  }
};
  function displayText(course,value){
    const raw=String(value??''),text=compactForms[course]?.[raw]||raw;
    return course==='de'?text.replace(/\(([^)]+)\)/g,(whole,note)=>frenchNotes[note]?'('+frenchNotes[note]+')':whole):text;
  }
  function displayTarget(course,entry){
    if(course==='de'&&entry.target==='gut'){
      if(entry.meaning==='bon / bonne')return 'gut (qualité)';
      if(entry.meaning==='bien')return 'gut (manière / état)';
    }
    return displayText(course,entry.target);
  }
  // Each row is an authored FR/DE equivalence. Grammar examples avoid equating noun genders.
  // Display only: saved card identities and lesson membership remain unchanged.
  const alignedTranslations={
    "[\"vous\",\"Sie / ihr\"]":[["vous (politesse)","Sie (politesse)"],["vous (plusieurs proches)","ihr (plusieurs proches)"]],
    "[\"ils / elles\",\"sie (Mehrzahl)\"]":[["ils (m. ou mixte)","sie (Mehrzahl, m. oder gemischt)"],["elles (f.)","sie (Mehrzahl, f.)"]],
    "[\"français / française\",\"französisch / Franzose / Französin\"]":[["français (adj. m.)","französisch (adj. m.)"],["française (adj. f.)","französisch (adj. f.)"],["un Français","ein Franzose"],["une Française","eine Französin"]],
    "[\"allemand / allemande\",\"deutsch / Deutscher / Deutsche\"]":[["allemand (adj. m.)","deutsch (adj. m.)"],["allemande (adj. f.)","deutsch (adj. f.)"],["un Allemand","ein Deutscher"],["une Allemande","eine Deutsche"]],
    "[\"né / née\",\"geboren\"]":[["né","geboren"],["née","geboren"]],
    "[\"la fille\",\"die Tochter / das Mädchen\"]":[["la fille (lien familial)","die Tochter"],["la fille (jeune fille)","das Mädchen"]],
    "[\"la femme\",\"die Frau / die Ehefrau\"]":[["la femme","die Frau"],["l’épouse","die Ehefrau"]],
    "[\"l’ami / l’amie\",\"der Freund / die Freundin\"]":[["l’ami","der Freund"],["l’amie","die Freundin"]],
    "[\"marié / mariée\",\"verheiratet\"]":[["marié","verheiratet"],["mariée","verheiratet"]],
    "[\"vieux / vieille\",\"alt\"]":[["vieux","alt"],["vieille","alt"]],
    "[\"grand / grande\",\"groß\"]":[["grand","groß"],["grande","groß"]],
    "[\"petit / petite\",\"klein\"]":[["petit","klein"],["petite","klein"]],
    "[\"mon / ma / mes\",\"mein / meine\"]":[["mon / ma / mes","mein / meine"]],
    "[\"ton / ta / tes\",\"dein / deine\"]":[["ton / ta / tes","dein / deine"]],
    "[\"son / sa / ses\",\"sein / ihr (Besitz, Einzahl)\"]":[["son / sa / ses (à lui)","sein / seine (un possesseur masculin)"],["son / sa / ses (à elle)","ihr / ihre (un possesseur féminin)"]],
    "[\"le fruit\",\"das Obst / die Frucht\"]":[["les fruits","das Obst"],["un fruit","die Frucht"]],
    "[\"le menu\",\"die Speisekarte / das Menü\"]":[["la carte","die Speisekarte"],["le menu","das Menü"]],
    "[\"cher / chère\",\"teuer\"]":[["cher","teuer"],["chère","teuer"]],
    "[\"la chambre\",\"das Zimmer / das Schlafzimmer\"]":[["la chambre (hôtel)","das Zimmer"],["la chambre à coucher","das Schlafzimmer"]],
    "[\"aller\",\"gehen / fahren\"]":[["aller","gehen / fahren"]],
    "[\"le plan\",\"der Plan / der Stadtplan\"]":[["le plan","der Plan"],["le plan de la ville","der Stadtplan"]],
    "[\"le collègue / la collègue\",\"der Kollege / die Kollegin\"]":[["le collègue","der Kollege"],["la collègue","die Kollegin"]],
    "[\"le chef / la cheffe\",\"der Chef / die Chefin\"]":[["le chef","der Chef"],["la cheffe","die Chefin"]],
    "[\"le médecin\",\"der Arzt / die Ärztin\"]":[["le médecin","der Arzt"],["la médecin","die Ärztin"]],
    "[\"le professeur\",\"der Lehrer / die Lehrerin\"]":[["le professeur","der Lehrer"],["la professeure","die Lehrerin"]],
    "[\"le vendeur / la vendeuse\",\"der Verkäufer / die Verkäuferin\"]":[["le vendeur","der Verkäufer"],["la vendeuse","die Verkäuferin"]],
    "[\"l’étudiant / l’étudiante\",\"der Student / die Studentin\"]":[["l’étudiant","der Student"],["l’étudiante","die Studentin"]],
    "[\"l’employé / l’employée\",\"der Angestellte / die Angestellte\"]":[["l’employé","der Angestellte"],["l’employée","die Angestellte"]],
    "[\"occupé / occupée\",\"beschäftigt\"]":[["occupé","beschäftigt"],["occupée","beschäftigt"]],
    "[\"correct / correcte\",\"richtig\"]":[["correct","richtig"],["correcte","richtig"]],
    "[\"faux / fausse\",\"falsch\"]":[["faux","falsch"],["fausse","falsch"]],
    "[\"avant\",\"vor / vorher\"]":[["avant","vor"],["avant","vorher"]],
    "[\"après\",\"nach / danach\"]":[["après","nach"],["après","danach"]],
    "[\"fatigué / fatiguée\",\"müde\"]":[["fatigué","müde"],["fatiguée","müde"]],
    "[\"le temps\",\"das Wetter / die Zeit\"]":[["le temps (météo)","das Wetter"],["le temps (durée)","die Zeit"]],
    "[\"chaud / chaude\",\"warm / heiß\"]":[["chaud / chaude (température agréable)","warm"],["chaud / chaude (température élevée)","heiß"]],
    "[\"froid / froide\",\"kalt\"]":[["froid","kalt"],["froide","kalt"]],
    "[\"blanc / blanche\",\"weiß\"]":[["blanc","weiß"],["blanche","weiß"]],
    "[\"noir / noire\",\"schwarz\"]":[["noir","schwarz"],["noire","schwarz"]],
    "[\"bleu / bleue\",\"blau\"]":[["bleu","blau"],["bleue","blau"]],
    "[\"vert / verte\",\"grün\"]":[["vert","grün"],["verte","grün"]],
    "[\"aimer\",\"mögen / lieben\"]":[["aimer","mögen"],["aimer","lieben"]],
    "[\"intéressant / intéressante\",\"interessant\"]":[["intéressant","interessant"],["intéressante","interessant"]],
    "[\"partir\",\"abfahren / weggehen\"]":[["partir","abfahren"],["partir","weggehen"]],
    "[\"les vacances\",\"die Ferien / der Urlaub\"]":[["les vacances","die Ferien"],["les vacances","der Urlaub"]],
    "[\"complet / complète\",\"ausgebucht / vollständig\"]":[["complet / complète (hôtel)","ausgebucht"],["complet / complète (sans manque)","vollständig"]],
    "[\"je suis désolé / désolée\",\"es tut mir leid\"]":[["je suis désolé","es tut mir leid"],["désolée","es tut mir leid"]],
    "[\"recevoir\",\"bekommen / empfangen\"]":[["recevoir","bekommen"],["recevoir","empfangen"]],
    "[\"le destinataire\",\"der Empfänger / die Empfängerin\"]":[["le destinataire","der Empfänger"],["la destinataire","die Empfängerin"]],
    "[\"l’expéditeur (m.)\",\"der Absender / die Absenderin\"]":[["l’expéditeur","der Absender"],["l’expéditrice","die Absenderin"]],
    "[\"interdit / interdite\",\"verboten\"]":[["interdit","verboten"],["interdite","verboten"]],
    "[\"ouvert / ouverte\",\"geöffnet\"]":[["ouvert","geöffnet"],["ouverte","geöffnet"]],
    "[\"fermé / fermée\",\"geschlossen\"]":[["fermé","geschlossen"],["fermée","geschlossen"]],
    "[\"un / une\",\"ein / eine\"]":[["un","ein"],["une","eine"]],
    "[\"le / la / les\",\"der / die / das (bestimmter Artikel)\"]":[["le / la (singulier)","der / die / das (Singular)"],["les (pluriel)","die (Plural)"]],
    "[\"nouveau / nouvelle\",\"neu\"]":[["nouveau","neu"],["nouvelle","neu"]],
    "[\"beau / belle\",\"schön\"]":[["beau","schön"],["belle","schön"]],
    "[\"bon / bonne\",\"gut\"]":[["bon","gut"],["bonne","gut"]],
    "[\"mauvais / mauvaise\",\"schlecht\"]":[["mauvais","schlecht"],["mauvaise","schlecht"]],
    "[\"là\",\"da / dort\"]":[["là","da"],["là","dort"]],
    "[\"que / quoi\",\"was\"]":[["que / quoi","was"]],
    "[\"quel / quelle\",\"welcher / welche / welches\"]":[["quel / quelle","welcher / welche / welches"]],
    "[\"notre / nos\",\"unser / unsere\"]":[["notre / nos","unser / unsere"]],
    "[\"votre / vos\",\"euer / Ihr / eure / Ihre\"]":[["votre / vos (plusieurs proches)","euer / eure"],["votre / vos (politesse)","Ihr / Ihre"]],
    "[\"leur / leurs\",\"ihr / ihre (Besitz, Mehrzahl)\"]":[["leur / leurs","ihr / ihre (plusieurs possesseurs)"]],
    "[\"à qui ?\",\"wem? / für wen? (je nach Kontext)\"]":[["à qui ? (datif)","wem?"],["pour qui ?","für wen?"]],
    "[\"lequel / laquelle\",\"welcher / welche (aus einer Auswahl)\"]":[["lequel (choix masculin)","welcher (Auswahl, m.)"],["laquelle (choix féminin)","welche (Auswahl, f.)"]],
    "[\"il y a\",\"vor (zeitlich) / es gibt\"]":[["il y a (temps passé)","vor (zeitlich)"],["il y a (existence)","es gibt"]],
    "[\"venir de\",\"gerade etwas getan haben / kommen aus\"]":[["venir de (passé récent)","gerade etwas getan haben"],["venir de (provenance)","kommen aus"]],
    "[\"être allé / allée\",\"gegangen / gefahren sein\"]":[["être allé / allée","gegangen / gefahren sein"]],
    "[\"cuire\",\"garen / kochen\"]":[["cuire","garen"],["cuire","kochen"]],
    "[\"le projet\",\"der Plan / das Vorhaben\"]":[["le projet","der Plan"],["le projet","das Vorhaben"]],
    "[\"la montagne\",\"der Berg / das Gebirge\"]":[["la montagne","der Berg"],["la montagne","das Gebirge"]],
    "[\"visiter\",\"besichtigen / besuchen\"]":[["visiter","besichtigen"],["visiter","besuchen"]],
    "[\"pour\",\"für / um … zu\"]":[["pour (nom)","für"],["pour (infinitif)","um … zu"]],
    "[\"le premier / la première\",\"der erste / die erste\"]":[["le premier","der erste"],["la première","die erste"]],
    "[\"le deuxième / la deuxième\",\"der zweite / die zweite\"]":[["le deuxième","der zweite"],["la deuxième","die zweite"]],
    "[\"le troisième / la troisième\",\"der dritte / die dritte\"]":[["le troisième","der dritte"],["la troisième","die dritte"]],
    "[\"le voisin / la voisine\",\"der Nachbar / die Nachbarin\"]":[["le voisin","der Nachbar"],["la voisine","die Nachbarin"]],
    "[\"le cousin / la cousine\",\"der Cousin / die Cousine\"]":[["le cousin","der Cousin"],["la cousine","die Cousine"]],
    "[\"seul / seule\",\"allein\"]":[["seul","allein"],["seule","allein"]],
    "[\"gentil / gentille\",\"nett\"]":[["gentil","nett"],["gentille","nett"]],
    "[\"le serveur / la serveuse\",\"der Kellner / die Kellnerin\"]":[["le serveur","der Kellner"],["la serveuse","die Kellnerin"]],
    "[\"essayer\",\"anprobieren / versuchen\"]":[["essayer","anprobieren"],["essayer","versuchen"]],
    "[\"changer\",\"wechseln / ändern\"]":[["changer","wechseln"],["changer","ändern"]],
    "[\"le client / la cliente\",\"der Kunde / die Kundin\"]":[["le client","der Kunde"],["la cliente","die Kundin"]],
    "[\"le propriétaire\",\"der Eigentümer / die Eigentümerin\"]":[["le propriétaire","der Eigentümer"],["la propriétaire","die Eigentümerin"]],
    "[\"propre\",\"sauber / eigen (je nach Stellung)\"]":[["propre (après le nom)","sauber"],["propre (avant le nom)","eigen"]],
    "[\"tourner\",\"abbiegen / drehen\"]":[["tourner","abbiegen"],["tourner","drehen"]],
    "[\"le feu\",\"die Ampel / das Feuer\"]":[["le feu tricolore","die Ampel"],["le feu","das Feuer"]],
    "[\"conduire\",\"fahren / ein Fahrzeug führen\"]":[["conduire","fahren"],["conduire","ein Fahrzeug führen"]],
    "[\"le retour\",\"die Rückfahrt / die Rückkehr\"]":[["le retour","die Rückfahrt"],["le retour","die Rückkehr"]],
    "[\"demander\",\"fragen / bitten\"]":[["demander","fragen / bitten"]],
    "[\"mettre\",\"legen / stellen / setzen\"]":[["mettre","legen"],["mettre","stellen"],["mettre","setzen"]],
    "[\"sortir\",\"ausgehen / hinausgehen\"]":[["sortir","ausgehen"],["sortir","hinausgehen"]],
    "[\"le voyageur / la voyageuse\",\"der Reisende / die Reisende\"]":[["le voyageur","der Reisende"],["la voyageuse","die Reisende"]],
    "[\"ce / cet / cette / ces\",\"dieser / diese / dieses (hinweisend)\"]":[["ce / cet / cette / ces","dieser / diese / dieses (hinweisend)"]],
    "[\"tout / toute / tous / toutes\",\"ganz / alle\"]":[["tout / toute / tous / toutes","ganz / alle"]],
    "[\"chaque\",\"jeder / jede / jedes\"]":[["chaque","jeder / jede / jedes"]],
    "[\"autre\",\"anderer / andere / anderes\"]":[["un autre train","ein anderer Zug"],["une autre rue","eine andere Straße"],["un autre livre","ein anderes Buch"]],
    "[\"long / longue\",\"lang\"]":[["long","lang"],["longue","lang"]],
    "[\"court / courte\",\"kurz\"]":[["court","kurz"],["courte","kurz"]],
    "[\"plein / pleine\",\"voll\"]":[["plein","voll"],["pleine","voll"]],
    "[\"lent / lente\",\"langsam\"]":[["lent","langsam"],["lente","langsam"]],
    "[\"important / importante\",\"wichtig\"]":[["important","wichtig"],["importante","wichtig"]],
    "[\"adorer\",\"sehr mögen / lieben\"]":[["adorer","sehr mögen"],["adorer","lieben"]],
    "[\"afficher\",\"anzeigen / aushängen\"]":[["afficher","anzeigen"],["afficher","aushängen"]],
    "[\"affirmer\",\"behaupten / bestätigen\"]":[["affirmer","behaupten"],["affirmer","bestätigen"]],
    "[\"alors\",\"also / dann\"]":[["alors","also"],["alors","dann"]],
    "[\"au\",\"à + le: in / nach / zum\"]":[["au (à + le)","in / nach / zu (je nach Zusammenhang)"]],
    "[\"aux\",\"à + les: in / nach / zu den\"]":[["aux (à + les)","in / nach / zu + Plural"]],
    "[\"besoin\",\"Bedarf / Bedürfnis\"]":[["besoin","Bedarf"],["besoin","Bedürfnis"]],
    "[\"canadien / canadienne\",\"kanadisch\"]":[["canadien","kanadisch"],["canadienne","kanadisch"]],
    "[\"car\",\"denn / weil\"]":[["car","denn"],["car","weil"]],
    "[\"comme\",\"als / wie\"]":[["comme","als"],["comme","wie"]],
    "[\"continuer\",\"weitergehen / fortsetzen\"]":[["continuer","weitergehen"],["continuer","fortsetzen"]],
    "[\"de\",\"von / aus (je nach Zusammenhang)\"]":[["de","von"],["de","aus (je nach Zusammenhang)"]],
    "[\"dernier / dernière\",\"letzter / letzte\"]":[["dernier","letzter"],["dernière","letzte"]],
    "[\"désigner\",\"bezeichnen / sich beziehen auf\"]":[["désigner","bezeichnen"],["désigner","sich beziehen auf"]],
    "[\"désirer\",\"wünschen / möchten\"]":[["désirer","wünschen"],["désirer","möchten"]],
    "[\"désolé / désolée\",\"entschuldigt / tut mir leid\"]":[["désolé (dit par un homme)","tut mir leid (Mann spricht)"],["désolée (dit par une femme)","tut mir leid (Frau spricht)"]],
    "[\"divorcé / divorcée\",\"geschieden\"]":[["divorcé","geschieden"],["divorcée","geschieden"]],
    "[\"doucement\",\"leise / sanft\"]":[["doucement","leise"],["doucement","sanft"]],
    "[\"du\",\"de + le / Teilungsartikel\"]":[["du (de + le)","von / aus / des (je nach Zusammenhang)"],["du (article partitif)","unbestimmte Menge (m.)"]],
    "[\"en\",\"in / nach / mit (je nach Zusammenhang)\"]":[["en","in"],["en","nach"],["en","mit (je nach Zusammenhang)"]],
    "[\"enchanté / enchantée\",\"angenehm / erfreut, Sie kennenzulernen\"]":[["enchanté (dit par un homme)","erfreut, Sie kennenzulernen (Mann spricht)"],["enchantée (dit par une femme)","erfreut, Sie kennenzulernen (Frau spricht)"]],
    "[\"entrer\",\"eintreten / hineingehen\"]":[["entrer","eintreten"],["entrer","hineingehen"]],
    "[\"étudier\",\"lernen / studieren\"]":[["étudier","lernen"],["étudier","studieren"]],
    "[\"exister\",\"existieren / vorhanden sein\"]":[["exister","existieren"],["exister","vorhanden sein"]],
    "[\"fort\",\"laut / stark\"]":[["fort","laut"],["fort","stark"]],
    "[\"garder\",\"behalten / beibehalten\"]":[["garder","behalten"],["garder","beibehalten"]],
    "[\"gratuit / gratuite\",\"kostenlos\"]":[["gratuit","kostenlos"],["gratuite","kostenlos"]],
    "[\"inclus / incluse\",\"inbegriffen\"]":[["inclus","inbegriffen"],["incluse","inbegriffen"]],
    "[\"indiquer\",\"angeben / anzeigen\"]":[["indiquer","angeben"],["indiquer","anzeigen"]],
    "[\"joli / jolie\",\"hübsch\"]":[["joli","hübsch"],["jolie","hübsch"]],
    "[\"la boutique\",\"das Geschäft / die Boutique\"]":[["la boutique","das Geschäft"],["la boutique","die Boutique"]],
    "[\"la case\",\"das Feld / das Kästchen\"]":[["la case","das Feld"],["la case","das Kästchen"]],
    "[\"la salle\",\"der Raum / der Saal\"]":[["la salle","der Raum"],["la salle","der Saal"]],
    "[\"la télé\",\"der Fernseher / das Fernsehen (umgangssprachlich)\"]":[["la télé","der Fernseher"],["la télé","das Fernsehen (umgangssprachlich)"]],
    "[\"là-bas\",\"dort / da drüben\"]":[["là-bas","dort"],["là-bas","da drüben"]],
    "[\"le cabinet\",\"die Praxis / das Büro\"]":[["le cabinet","die Praxis"],["le cabinet","das Büro"]],
    "[\"le développeur / la développeuse\",\"der Entwickler / die Entwicklerin\"]":[["le développeur","der Entwickler"],["la développeuse","die Entwicklerin"]],
    "[\"le quartier\",\"das Viertel / die Wohngegend\"]":[["le quartier","das Viertel"],["le quartier","die Wohngegend"]],
    "[\"les États-Unis\",\"die USA / die Vereinigten Staaten\"]":[["les États-Unis","die USA"],["les États-Unis","die Vereinigten Staaten"]],
    "[\"les horaires\",\"die Unterrichts- / Öffnungszeiten\"]":[["les horaires des cours","die Unterrichtszeiten"],["les horaires d’ouverture","die Öffnungszeiten"]],
    "[\"même\",\"selbst / derselbe\"]":[["même (renforcement)","selbst"],["même (identité)","derselbe / dieselbe / dasselbe"]],
    "[\"midi\",\"Mittag / 12 Uhr\"]":[["midi","Mittag"],["midi","12 Uhr"]],
    "[\"minuit\",\"Mitternacht / 0 Uhr\"]":[["minuit","Mitternacht"],["minuit","0 Uhr"]],
    "[\"nécessaire\",\"nötig / notwendig\"]":[["nécessaire","nötig"],["nécessaire","notwendig"]],
    "[\"on\",\"man / wir (umgangssprachlich)\"]":[["on (général)","man"],["on (familier, nous)","wir (umgangssprachlich)"]],
    "[\"par\",\"durch / pro / mit (je nach Zusammenhang)\"]":[["par","durch"],["par","pro"],["par","mit (je nach Zusammenhang)"]],
    "[\"plus\",\"mehr / -er (beim Vergleichen)\"]":[["plus","mehr / -er (beim Vergleichen)"]],
    "[\"postal / postale\",\"Post- / per Post\"]":[["postal / postale","Post- / per Post"]],
    "[\"préféré / préférée\",\"Lieblings-\"]":[["préféré","Lieblings-"],["préférée","Lieblings-"]],
    "[\"préparer\",\"vorbereiten / zubereiten\"]":[["préparer","vorbereiten"],["préparer","zubereiten"]],
    "[\"près\",\"nah / in der Nähe\"]":[["près","nah"],["près","in der Nähe"]],
    "[\"prochain / prochaine\",\"nächster / nächste\"]":[["prochain","nächster"],["prochaine","nächste"]],
    "[\"si\",\"ob / wenn\"]":[["si","ob"],["si","wenn"]],
    "[\"suivant / suivante\",\"folgender / folgende\"]":[["suivant","folgender"],["suivante","folgende"]],
    "[\"terminer\",\"beenden / aufhören\"]":[["terminer","beenden"],["terminer","aufhören"]],
    "[\"trop\",\"zu / zu viel\"]":[["trop","zu"],["trop","zu viel"]],
    "[\"une nuit\",\"eine Nacht / Übernachtung\"]":[["une nuit","eine Nacht"],["une nuit","Übernachtung"]],
    "[\"vers\",\"gegen (Uhrzeit) / in Richtung\"]":[["vers","gegen (Uhrzeit)"],["vers","in Richtung"]],
    "[\"voici\",\"hier ist / hier sind\"]":[["voici","hier ist"],["voici","hier sind"]],
    "[\"voilà\",\"da ist / da sind\"]":[["voilà","da ist"],["voilà","da sind"]],
    "[\"à partir de / préfixe de départ\",\"ab\"]":[["à partir de (temps)","ab"],["préfixe de départ","ab-"]],
    "[\"comme / en tant que\",\"als\"]":[["comme","als"],["en tant que","als"]],
    "[\"donc / alors\",\"also\"]":[["donc","also"],["alors","also"]],
    "[\"à / contre (selon le contexte)\",\"an\"]":[["à","an"],["contre (selon le contexte)","an"]],
    "[\"chez / près de\",\"bei\"]":[["chez","bei"],["près de","bei"]],
    "[\"bei dem : chez le / au (selon le contexte)\",\"beim\"]":[["chez / pendant (selon le contexte)","beim (bei + dem)"]],
    "[\"la voie / le quai\",\"das Gleis\"]":[["la voie","das Gleis"]],
    "[\"le loisir / le hobby\",\"das Hobby\"]":[["le loisir","das Hobby"],["le hobby","das Hobby"]],
    "[\"car / parce que\",\"denn\"]":[["car","denn"],["parce que","denn"]],
    "[\"la sortie / l’excursion\",\"der Ausflug\"]":[["la sortie","der Ausflug"],["l’excursion","der Ausflug"]],
    "[\"le distributeur / l’automate\",\"der Automat\"]":[["le distributeur","der Automat"],["l’automate","der Automat"]],
    "[\"clairement / distinctement\",\"deutlich\"]":[["clairement","deutlich"],["distinctement","deutlich"]],
    "[\"la consigne / l’exercice\",\"die Aufgabe\"]":[["la consigne","die Aufgabe"],["l’exercice","die Aufgabe"]],
    "[\"le train / le chemin de fer\",\"die Bahn\"]":[["le train","die Bahn"],["le chemin de fer","die Bahn"]],
    "[\"l’horloge / la montre; Uhr = heure dans un horaire\",\"die Uhr\"]":[["l’horloge","die Uhr (Wand)"],["la montre","die Uhr (Armband)"],["trois heures","drei Uhr"]],
    "[\"double / deux fois la même lettre\",\"Doppel-\"]":[["double","Doppel-"],["deux fois la même lettre","Doppel-"]],
    "[\"il / ce (neutre)\",\"es\"]":[["il","es"],["ce (neutre)","es"]],
    "[\"aimable / cordial\",\"freundlich\"]":[["aimable","freundlich"],["cordial","freundlich"]],
    "[\"appartenir / faire partie de\",\"gehören\"]":[["appartenir","gehören"],["faire partie de","gehören"]],
    "[\"haut / élevé\",\"hoch\"]":[["haut","hoch"],["élevé","hoch"]],
    "[\"écouter / entendre\",\"hören\"]":[["écouter","hören"],["entendre","hören"]],
    "[\"in dem : dans le / au\",\"im\"]":[["dans / à (lieu)","im (in + dem)"]],
    "[\"dans / à\",\"in\"]":[["dans","in"],["à","in"]],
    "[\"en ordre / sans problème\",\"in Ordnung\"]":[["en ordre","in Ordnung"],["sans problème","in Ordnung"]],
    "[\"informer / prévenir\",\"informieren\"]":[["informer","informieren"],["prévenir","informieren"]],
    "[\"in das : dans le / au (destination)\",\"ins\"]":[["dans / à (destination)","ins (in + das)"]],
    "[\"cassé / en panne\",\"kaputt\"]":[["cassé","kaputt"],["en panne","kaputt"]],
    "[\"aucun / ne … pas de\",\"kein / keine\"]":[["aucun / aucune / ne … pas de","kein / keine"]],
    "[\"cher / chère (pour s’adresser à quelqu’un)\",\"lieb\"]":[["cher","lieb"],["chère (pour s’adresser à quelqu’un)","lieb"]],
    "[\"prochain / prochaine\",\"nächster / nächste / nächstes\"]":[["prochain / prochaine","nächster / nächste / nächstes"]],
    "[\"aller / être à la bonne taille\",\"passen\"]":[["aller","passen"],["être à la bonne taille","passen"]],
    "[\"Madame / Monsieur (formule d’appel formelle)\",\"sehr geehrte / sehr geehrter\"]":[["Madame (formule d’appel formelle)","sehr geehrte …"],["Monsieur (formule d’appel formelle)","sehr geehrter …"]],
    "[\"être debout / être indiqué\",\"stehen\"]":[["être debout","stehen"],["être indiqué","stehen"]],
    "[\"à (une heure) / autour de\",\"um\"]":[["à (une heure)","um"],["autour de","um"]],
    "[\"sous / à la rubrique\",\"unter\"]":[["sous","unter"],["à la rubrique","unter"]],
    "[\"von dem : du / depuis le\",\"vom\"]":[["de / depuis (provenance)","vom (von + dem)"]],
    "[\"de / depuis\",\"von\"]":[["de / depuis","von"]],
    "[\"passé / terminé\",\"vorbei\"]":[["passé","vorbei"],["terminé","vorbei"]],
    "[\"à / vers / trop (selon le contexte)\",\"zu\"]":[["à / chez / vers (destination)","zu"],["trop","zu"]],
    "[\"zu dem : au / vers le (selon le contexte)\",\"zum\"]":[["à / chez (destination)","zum (zu + dem)"]],
    "[\"zu der : à la / vers la\",\"zur\"]":[["à / chez (destination)","zur (zu + der)"]],
    "[\"en arrière / de retour\",\"zurück\"]":[["en arrière","zurück"],["de retour","zurück"]]
  };
  function displayPairs(course,entry,context={}){
    const fr=course==='fr'?entry.target:entry.meaning,de=course==='de'?entry.target:entry.meaning;
    // Lesson 1 uses these actual phrases, not unrelated noun paradigms.
    const firstLesson=Number(context.lessonId)===1;
    const actual=firstLesson&&((course==='de'&&entry.target==='welcher / welche / welches')?[['Quelles langues ?','Welche Sprachen?']]:
      (course==='de'&&entry.target==='mein / meine')?[['mon nom','mein Name']]:
      ((course==='fr'&&entry.target==='aller')||(course==='de'&&entry.target==='gehen / fahren'))?[['Comment allez-vous ?','Wie geht es Ihnen?']]:null);
    const rows=actual||alignedTranslations[JSON.stringify([fr,de])];
    const notes=course==='de'?frenchNotes:{"politesse":"höfliche Anrede","plusieurs proches":"mehrere vertraute Personen","m. ou mixte":"m. oder gemischt","lien familial":"Familie","jeune fille":"Mädchen","hôtel":"Hotel","météo":"Wetter","durée":"Dauer","température agréable":"angenehme Temperatur","température élevée":"hohe Temperatur","sans manque":"ohne fehlende Teile","choix masculin":"Auswahl, m.","choix féminin":"Auswahl, f.","dit par un homme":"Mann spricht","dit par une femme":"Frau spricht","article partitif":"Teilungsartikel","de + le":"de + le","général":"allgemein","familier, nous":"umgangssprachlich, wir","destination":"Richtung","provenance":"Herkunft","singulier":"Singular","pluriel":"Plural","après le nom":"nach dem Nomen","avant le nom":"vor dem Nomen","lieu":"Ort","renforcement":"Verstärkung","identité":"Identität","temps passé":"Vergangenheit","existence":"Vorhandensein","un possesseur masculin":"ein männlicher Besitzer","un possesseur féminin":"eine weibliche Besitzerin","plusieurs possesseurs":"mehrere Besitzer","datif":"Dativ","nom":"Nomen","infinitif":"Infinitiv","passé récent":"gerade erst vergangen","formule d’appel formelle":"förmliche Anrede"};
    const annotate=value=>value.replace(/\(([^)]+)\)/g,(whole,note)=>notes[note]?'('+notes[note]+')':whole);
    return rows?.map(([f,d])=>({target:course==='de'&&entry.target==='gut'?displayTarget(course,entry):annotate(course==='fr'?f:d),meaning:annotate(course==='fr'?d:f)}))||[{target:displayTarget(course,entry),meaning:displayText(course,entry.meaning)}];
  }
  function buildBank({course,lessons,units={}}){
    const bank=new Map(),target=course==='fr'?'fr':'de',meaning=target==='fr'?'de':'fr';
    function add(a,b,lesson,kind,note=''){
      a=clean(a);b=clean(b);if(!a||!b)return;
      const id=JSON.stringify([kind,key(a),key(b)]);
      if(!bank.has(id))bank.set(id,{id,target:a,meaning:b,kind,note,lessons:[]});
      const e=bank.get(id);if(!e.lessons.includes(+lesson))e.lessons.push(+lesson);
    }
    for(const word of window.A1_VOCABULARY_CONTENT||[])for(const id of word[target+'Lessons'])if(lessons.some(l=>l.id===id))add(word[target],word[meaning],id,'word',word[target+'Plural']||'');
    // Lesson sentences remain in the lesson. Only explicitly authored lexical entries
    // become cards; never infer a vocabulary item by splitting an arbitrary sentence.
    for(const l of lessons)for(const u of units[l.id]||[])for(const pair of u.vocabulary||[])
      add(pair[0],pair[1],l.id,'word');
    // The separate lesson glossary uses the same per-lesson vocabulary/mistake decks.
    const lexical=new Map();for(const item of bank.values())if(item.kind==='word'&&!lexical.has(key(item.target).toLocaleLowerCase()))lexical.set(key(item.target).toLocaleLowerCase(),item);
    for(const lesson of lessons)for(const [word,translation]of window.A1LessonFoundations?.content[course]?.[lesson.id]?.words||[]){
      const known=lexical.get(key(word).toLocaleLowerCase());
      if(known){if(!known.lessons.includes(lesson.id))known.lessons.push(lesson.id);}
      else{add(word,translation,lesson.id,'word','');lexical.set(key(word).toLocaleLowerCase(),[...bank.values()].at(-1));}
    }
    // Use verified occurrences, including earlier lessons and inflected search forms.
    for(const [word,usedIn,forms,translation]of window.A1LessonLexicon?.entries[course]||[]){
      const relevant=usedIn.filter(id=>lessons.some(l=>Number(l.id)===id));if(!relevant.length)continue;
      let entry=lexical.get(key(word).toLocaleLowerCase());
      if(!entry&&translation){add(word,translation,relevant[0],'word','');entry=[...bank.values()].at(-1);lexical.set(key(word).toLocaleLowerCase(),entry);}
      if(!entry)continue;
      for(const id of relevant)if(!entry.lessons.includes(id))entry.lessons.push(id);
      entry.searchForms=[...new Set([...(entry.searchForms||[]),...forms])];
    }
    for(const e of bank.values()){
      e.lessons.sort((a,b)=>a-b);
      const plan=window.A1LessonVocabularyPlan?.[course];
      if(plan)e.studyLessons=e.lessons.filter(id=>[...(plan[id]?.regular||[]),...(plan[id]?.hardOnly||[])].includes(e.target.normalize('NFC')));
    }
    return [...bank.values()].sort((a,b)=>a.target.localeCompare(b.target,target));
  }
  const TEXT={
    de:{title:'Vokabeltrainer',intro:'Wörter und kurze Wendungen aus deinen Lektionen.',scope:'Kurswortschatz · Übersetzungen auf Deutsch. Keine offizielle Prüfungswortliste.',search:'Wort oder Übersetzung suchen',lesson:'Lektion',all:'Alle Lektionen',learned:'Gelernte Lektionen',kind:'Inhalt',word:'Wörter & Wendungen',example:'Satzbeispiele',both:'Alles',status:'Lernstand',any:'Alle',weak:'Noch üben',known:'Sicher',new:'Neu',direction:'Richtung',forward:'Französisch → Deutsch',reverse:'Deutsch → Französisch',size:'Runde',start:'Auswahl üben',resume:'Runde fortsetzen',empty:'Keine passenden Einträge.',more:'Weitere anzeigen',listen:'Aussprache anhören',back:'Zur Wortliste',answer:'Antwort zeigen',input:'Deine Antwort (optional)',again:'Nicht gewusst',yes:'Gewusst',self:'Selbsteinschätzung: Vergleiche Bedeutung, Schreibweise und Artikel. Andere passende Übersetzungen sind möglich.',done:'Runde abgeschlossen',restart:'Neue Runde',reveal:'Deine Antwort',count:'Einträge',round:'Karten',progress:'Sicher nach zwei aufeinanderfolgenden „Gewusst“-Bewertungen.',roundNote:'Die laufende Runde wird ersetzt. Dein Wortschatz-Lernstand bleibt erhalten. Neue Runde starten?',remaining:'Noch offen',result:'Gewusst (selbst bewertet)',other:'Weitere Übungen',lessonLink:'Wortschatz der Lektion',exit:'Zurück zur Lektion'},
    fr:{title:'Vocabulaire',intro:'Mots et expressions courtes de tes leçons.',scope:'Vocabulaire du cours · Traductions en français. Ce n’est pas une liste officielle d’examen.',search:'Chercher un mot ou une traduction',lesson:'Leçon',all:'Toutes les leçons',learned:'Leçons terminées',kind:'Contenu',word:'Mots et expressions',example:'Phrases exemples',both:'Tout',status:'Progression',any:'Tout',weak:'À revoir',known:'Acquis',new:'Nouveau',direction:'Sens',forward:'Allemand → Français',reverse:'Français → Allemand',size:'Série',start:'Pratiquer la sélection',resume:'Reprendre la série',empty:'Aucune entrée correspondante.',more:'Afficher plus',listen:'Écouter la prononciation',back:'Retour à la liste',answer:'Afficher la réponse',input:'Ta réponse (facultatif)',again:'Je ne savais pas',yes:'Je savais',self:'Autoévaluation : compare le sens, l’orthographe et l’article. D’autres traductions peuvent convenir.',done:'Série terminée',restart:'Nouvelle série',reveal:'Ta réponse',count:'entrées',round:'cartes',progress:'Acquis après deux évaluations « Je savais » consécutives.',roundNote:'Remplacer la série en cours ? La progression des mots reste conservée.',remaining:'Restant',result:'Je savais (autoévaluation)',other:'Autres exercices',lessonLink:'Vocabulaire de la leçon',exit:'Retour à la leçon'},
    en:{title:'Vocabulary trainer',intro:'Words and short expressions from your lessons.',scope:'Course vocabulary · Translations stay in the course’s explanation language. This is not an official exam word list.',search:'Search a word or translation',lesson:'Lesson',all:'All lessons',learned:'Completed lessons',kind:'Content',word:'Words & expressions',example:'Example sentences',both:'Everything',status:'Progress',any:'All',weak:'Needs practice',known:'Confident',new:'New',direction:'Direction',forward:'Target language → Translation',reverse:'Translation → Target language',size:'Round',start:'Practise selection',resume:'Resume round',empty:'No matching entries.',more:'Show more',listen:'Listen to pronunciation',back:'Back to word list',answer:'Show answer',input:'Your answer (optional)',again:'I didn’t know it',yes:'I knew it',self:'Self-assessment: compare meaning, spelling and article. Other suitable translations are possible.',done:'Round completed',restart:'New round',reveal:'Your answer',count:'entries',round:'cards',progress:'Confident after two consecutive “I knew it” ratings.',roundNote:'Replace the current round? Your vocabulary learning progress is kept.',remaining:'Remaining',result:'I knew it (self-assessed)',other:'Other exercises',lessonLink:'Lesson vocabulary',exit:'Back to lesson'}
  };
  Object.assign(TEXT.de,{entry:'Eintrag',words:'Wortliste',decks:'Fehlerstapel',openDeck:'Stapel öffnen',practiseDeck:'Fehler üben',deckIntro:'Wähle eine Lektion. Hier stehen nur Vokabeln, die du als „Nicht gewusst“ bewertet hast.',noMistakes:'Keine Vokabelfehler offen.',deckRule:'Nach zweimal „Gewusst“ in Folge verlässt die Karte ihren Fehlerstapel.',legacyDeck:'Frühere Fehler',legacyHint:'Ohne gespeicherte Lektionszuordnung',savedMistake:'Im Fehlerstapel gespeichert',clearedMistake:'Aus dem Fehlerstapel entfernt',lessonWords:'Vokabeln',pickDeck:'Wähle einen Fehlerstapel.',plural:'Plural',selfShort:'Selbst bewertet'});
  Object.assign(TEXT.fr,{entry:'entrée',words:'Liste de mots',decks:'Mots à revoir',openDeck:'Ouvrir la pile',practiseDeck:'Revoir les erreurs',deckIntro:'Choisis une leçon. Ces piles contiennent seulement les mots évalués « Je ne savais pas ».',noMistakes:'Aucune erreur de vocabulaire à revoir.',deckRule:'Deux « Je savais » consécutifs retirent la carte de sa pile.',legacyDeck:'Anciennes erreurs',legacyHint:'Sans leçon enregistrée',savedMistake:'Ajouté à la pile de la leçon',clearedMistake:'Retiré de la pile',lessonWords:'Vocabulaire',pickDeck:'Choisis une pile de mots.',plural:'Pluriel',selfShort:'Autoévaluation'});
  Object.assign(TEXT.en,{entry:'entry',words:'Word list',decks:'Mistake decks',openDeck:'Open deck',practiseDeck:'Practise mistakes',deckIntro:'Choose a lesson. These decks only contain words you rated “I didn’t know it”.',noMistakes:'No vocabulary mistakes pending.',deckRule:'Two consecutive “I knew it” ratings remove the card from its mistake deck.',legacyDeck:'Earlier mistakes',legacyHint:'No saved lesson assignment',savedMistake:'Saved in the mistake deck',clearedMistake:'Removed from the mistake deck',lessonWords:'Vocabulary',pickDeck:'Choose a mistake deck.',plural:'Plural',selfShort:'Self-assessed'});
  function language(course){return window.A1Profile?.getUiLang?.()==='en'?'en':course==='fr'?'de':'fr';}
  function label(course,name){return TEXT[language(course)][name];}
  const copy=value=>JSON.parse(JSON.stringify(value));
  const pending=item=>!!item&&item.wrong>0&&item.streak<2;
  function prepareState(state,bank){
    const root=state.vocabularyTrainer||={version:2,items:{},settings:{},session:null};
    root.items||={};root.settings||={};root.lessonItems||={};
    if(!root.lessonDecksImported){
      // Old records have no lesson provenance. Only a unique lesson can be inferred.
      // Ambiguous old mistakes stay in a small explicitly unassigned legacy deck.
      for(const e of bank){const old=root.items[e.id];if(old?.streak===0&&old.reviews>0&&!old.imported){const lesson=e.lessons.length===1?e.lessons[0]:0;root.lessonItems[lesson]||={};root.lessonItems[lesson][e.id]||={...copy(old),wrong:1,right:0,legacy:true};}}
      root.lessonDecksImported=true;
    }
    const s=root.session;
    if(s?.cards&&s.version===1){
      root.previousSession=copy(s);
      const kept=s.cards.map((e,i)=>bank.some(word=>word.id===e.id)?i:-1).filter(i=>i>=0),same=kept.includes(s.index);
      s.cards=kept.map(i=>({...s.cards[i],lessonId:s.cards[i].lessons.length===1?s.cards[i].lessons[0]:0}));
      s.ratings=kept.filter(i=>i<s.index).map(i=>s.ratings[i]);
      s.index=kept.filter(i=>i<s.index).length;s.version=2;s.mode='words';
      if(!same){s.draft='';s.revealed=false;}
      if(!s.cards.length)delete root.session;
    }
    root.version=2;root.settings.kind='word';
    return root;
  }
  function mistakeDecks(root,bank){
    const words=new Map(bank.map(e=>[e.id,e]));
    return Object.entries(root.lessonItems||{}).map(([id,items])=>({lessonId:Number(id),entries:Object.entries(items).filter(([word,item])=>pending(item)&&words.has(word)&&(Number(id)===0||words.get(word).lessons.includes(Number(id)))).map(([word])=>({...words.get(word),lessonId:Number(id)}))})).filter(d=>d.entries.length).sort((a,b)=>a.lessonId===0?1:b.lessonId===0?-1:a.lessonId-b.lessonId);
  }
  function rate(root,entry,ok){
    const lesson=Number(entry.lessonId),id=entry.id;
    if(!Number.isInteger(lesson)||lesson<0||lesson!==0&&!entry.lessons.includes(lesson))throw new Error('Invalid vocabulary lesson');
    const time=Date.now(),old=root.items[id]||{streak:0};
    root.items[id]={...old,streak:ok?old.streak+1:0,last:time,reviews:(old.reviews||0)+1};
    root.lessonItems[lesson]||={};const before=root.lessonItems[lesson][id]||{streak:0,wrong:0,right:0,reviews:0};
    const wasPending=pending(before),next={...before,streak:ok?before.streak+1:0,wrong:before.wrong+Number(!ok),right:before.right+Number(ok),reviews:before.reviews+1,last:time};
    root.lessonItems[lesson][id]=next;
    return !ok?'savedMistake':wasPending&&!pending(next)?'clearedMistake':null;
  }
  function matchesSearch(entry,query,course,context={}){
    const haystack=searchKey(entry.target+' '+entry.meaning+' '+displayText(course,entry.target)+' '+displayText(course,entry.meaning)+' '+displayPairs(course,entry,context).map(p=>p.target+' '+p.meaning).join(' ')+' '+(entry.searchForms||[]).join(' '));
    if(haystack.includes(query))return true;
    // A learner may copy a heard verb with its pronoun. This is lookup, not marking.
    const prepared=query.replace(/\b(?:j|m|t|s)'/g,' ');
    const stripped=prepared.replace(course==='fr'?/^(?:(?:je|tu|il|elle|on|nous|vous|ils|elles|me|te|se)\s+)+/:/^(?:(?:ich|du|er|sie|es|wir|ihr)\s+)+/,'').trim();
    return stripped!==query&&stripped.length>=2&&(entry.searchForms||[]).some(form=>searchKey(form)===stripped);
  }
  let cleanupLanguage=null;
  function render(opts){
    cleanupLanguage?.();
    const {view,state,save,lessons,speak,course,onExercises,onBack,initialLesson,units}=opts;
    const T=TEXT[language(course)],bank=buildBank({course,lessons,units}),root=prepareState(state,bank),settings=root.settings;
    Object.assign(settings,{lesson:settings.lesson||'all',status:settings.status||'any',direction:settings.direction||'forward',size:[10,20].includes(+settings.size)?+settings.size:10,query:settings.query||'',mode:settings.mode==='mistakes'?'mistakes':'words'});
    if(initialLesson&&lessons.some(l=>l.id===Number(initialLesson))){settings.lesson=String(initialLesson);settings.query='';settings.kind='word';settings.status='any';settings.mode='words';}
    const pairsFor=e=>displayPairs(course,e,{lessonId:e.lessonId||Number(settings.lesson)||undefined});
    let shown=60;
    const decks=()=>mistakeDecks(root,bank);
    const countLabel=n=>n===1?T.entry:T.count;
    const canResume=()=>root.session?.version===2&&root.session.index<root.session.cards.length&&root.session.mode===settings.mode&&(['all','learned'].includes(settings.lesson)||root.session.cards.every(e=>e.lessonId===Number(settings.lesson)));
    const title=id=>Number(id)===0?T.legacyDeck:T.lesson+' '+id+' · '+(lessons.find(l=>l.id===Number(id))?.title||'');
    const progress=e=>root.lessonItems[Number(settings.lesson)]?.[e.id]||root.items[e.id];
    const status=e=>{const s=progress(e);return !s?'new':s.streak>=2?'known':'weak';};
    const isOverview=()=>settings.mode==='mistakes'&&['all','learned'].includes(settings.lesson);
    function selection(){
      const q=searchKey(settings.query),source=settings.mode==='mistakes'?decks().find(d=>d.lessonId===Number(settings.lesson))?.entries||[]:bank;
      return source.filter(e=>(settings.mode==='mistakes'||settings.lesson==='all'||settings.lesson==='learned'&&(e.studyLessons||e.lessons).some(id=>(state.doneLessons||[]).includes(id))||(e.studyLessons||e.lessons).includes(Number(settings.lesson)))&&(settings.mode==='mistakes'||settings.status==='any'||status(e)===settings.status)&&(!q||matchesSearch(e,q,course,{lessonId:e.lessonId||Number(settings.lesson)||undefined})));
    }
    save();
    const audio=e=>`<button class="vt-audio" type="button" data-vt-audio="${esc(e.id)}" aria-label="${esc(T.listen+': '+[...new Set(pairsFor(e).map(p=>p.target))].join('; '))}"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4zM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg></button>`;
    function wireAudio(entries){view.querySelectorAll('[data-vt-audio]').forEach(b=>b.onclick=()=>{const e=entries.find(x=>x.id===b.dataset.vtAudio);if(e)speak(pairsFor(e).map(p=>p.target).join('; ').replace(/\s*\([^)]*\)/g,'').replace(/[;/]/g,', '),true);});}
    function deckHtml(groups){return `<div class="vt-decks">${groups.map(d=>`<button class="vt-deck" data-vt-deck="${d.lessonId}"><span><strong>${esc(title(d.lessonId))}</strong><small>${d.lessonId===0?T.legacyHint:T.openDeck}</small></span><span class="vt-deck-count">${d.entries.length} ${countLabel(d.entries.length)}</span></button>`).join('')}</div>`;}
    function openDeck(id,immediately=false){settings.mode='mistakes';settings.lesson=String(id);settings.query='';shown=60;save();list();if(immediately)start();else view.querySelector('#vtStart')?.focus();}
    function wireDecks(immediately=false){view.querySelectorAll('[data-vt-deck]').forEach(b=>b.onclick=()=>openDeck(Number(b.dataset.vtDeck),immediately));}
    function list(){
      const mistakes=settings.mode==='mistakes',count=decks().reduce((n,d)=>n+d.entries.length,0);
      view.innerHTML=`<section class="vt" data-i18n-ignore><header class="vt-head"><div><div class="eyebrow">A1 · ${course==='fr'?'FRANÇAIS':'DEUTSCH'}</div><h2>${T.title}</h2><p class="muted">${mistakes?T.deckIntro:T.intro}</p></div>${onBack?`<button class="tiny-btn" id="vtExit">← ${T.exit}</button>`:''}</header><div class="vt-tabs" role="group" aria-label="${T.kind}"><button id="vtWords" aria-pressed="${!mistakes}">${T.words}</button><button id="vtMistakes" aria-pressed="${mistakes}">${T.decks}<span class="vt-badge">${count}</span></button></div><section class="card vt-controls"><label class="vt-search" ${isOverview()?'hidden':''}>${T.search}<input id="vtSearch" type="search" value="${esc(settings.query)}" autocomplete="off"></label><div class="vt-filters"><label>${T.lesson}<select id="vtLesson"><option value="all">${T.all}</option>${!mistakes?`<option value="learned">${T.learned}</option>`:''}${mistakes&&(settings.lesson==='0'||decks().some(d=>d.lessonId===0))?`<option value="0">${T.legacyDeck}</option>`:''}${lessons.map(l=>`<option value="${l.id}">${l.id} · ${esc(l.title)}</option>`).join('')}</select></label><label ${mistakes?'hidden':''}>${T.status}<select id="vtStatus">${['any','new','weak','known'].map(v=>`<option value="${v}">${T[v]}</option>`).join('')}</select></label></div><div class="vt-training" ${isOverview()?'hidden':''}><label>${T.direction}<select id="vtDirection"><option value="forward">${course==='fr'?'FR → DE':'DE → FR'}</option><option value="reverse">${course==='fr'?'DE → FR':'FR → DE'}</option></select></label><label>${T.size}<select id="vtSize"><option value="10">10 ${T.round}</option><option value="20">20 ${T.round}</option></select></label><button class="primary-btn" id="vtStart">${mistakes?T.practiseDeck:T.start}</button></div>${canResume()?`<button class="secondary-btn" id="vtResume">${T.resume} · ${root.session.index+1}/${root.session.cards.length}</button>`:''}</section><p class="muted vt-count" id="vtCount" role="status"></p><div id="vtList" class="vt-list"></div><p class="muted vt-note">${mistakes?T.deckRule:T.progress}<br>${T.scope}</p>${onExercises?`<button class="tiny-btn" id="vtExercises">${T.other} →</button>`:''}</section>`;
      for(const name of ['Lesson','Status','Direction','Size']){const el=view.querySelector('#vt'+name),field=name.toLowerCase();el.value=settings[field];el.onchange=()=>{settings[field]=field==='size'?Number(el.value):el.value;shown=60;save();if(field==='lesson'){list();view.querySelector('#vtLesson').focus();}else results();};}
      view.querySelector('#vtSearch').oninput=e=>{settings.query=e.target.value;shown=60;save();results();};
      for(const [id,mode]of [['vtWords','words'],['vtMistakes','mistakes']])view.querySelector('#'+id).onclick=()=>{settings.mode=mode;settings.query='';if(mode==='mistakes')settings.lesson='all';else if(settings.lesson==='0')settings.lesson='all';save();list();view.querySelector('#'+id).focus();};
      view.querySelector('#vtStart').onclick=start;
      view.querySelector('#vtResume')?.addEventListener('click',round);
      if(onBack)view.querySelector('#vtExit').onclick=onBack;
      if(onExercises)view.querySelector('#vtExercises').onclick=onExercises;
      results();
    }
    function results(){
      const entries=selection(),overview=isOverview();view.querySelector('#vtCount').textContent=overview?(decks().length?T.pickDeck:T.noMistakes):entries.length+' '+countLabel(entries.length);
      view.querySelector('#vtStart').disabled=!entries.length||overview;
      const container=view.querySelector('#vtList');container.classList.toggle('is-decks',overview);
      container.innerHTML=overview?deckHtml(decks()):entries.length?entries.slice(0,shown).map(e=>`<article class="vt-entry"><div>${pairsFor(e).map(p=>`<div class="vt-pair"><strong lang="${course}">${esc(p.target)}</strong><span lang="${course==='fr'?'de':'fr'}">${esc(p.meaning)}</span></div>`).join('')}${e.note?`<small>${T.plural}: ${esc(e.note)}</small>`:''}<small class="vt-meta">${settings.lesson==='0'?T.legacyDeck:T.lesson+' '+(e.lessons.includes(Number(settings.lesson))?esc(settings.lesson):e.lessons.join(', '))} · ${T[status(e)]}</small></div>${audio(e)}</article>`).join('')+(entries.length>shown?`<button id="vtMore" class="secondary-btn">${T.more}</button>`:''):`<p class="vt-empty">${settings.mode==='mistakes'?T.noMistakes:T.empty}</p>`;
      wireAudio(entries);wireDecks();view.querySelector('#vtMore')?.addEventListener('click',()=>{shown+=60;results();});
    }
    function start(){
      const entries=selection();if(!entries.length||isOverview())return;
      if(root.session?.version===2&&root.session.index<root.session.cards.length&&!window.confirm(T.roundNote))return;
      const priority=e=>{const s=progress(e);return !s?1:s.streak===0?0:s.streak<2?2:3;};
      const shuffled=entries.map(e=>({e,r:Math.random()})).sort((a,b)=>priority(a.e)-priority(b.e)||(progress(a.e)?.last||0)-(progress(b.e)?.last||0)||a.r-b.r);
      const lessonFor=e=>e.lessonId??(e.lessons.includes(Number(settings.lesson))?Number(settings.lesson):(e.studyLessons?.length?e.studyLessons:e.lessons).find(id=>settings.lesson!=='learned'||(state.doneLessons||[]).includes(id)));
      root.session={version:2,cards:shuffled.slice(0,Number(settings.size)).map(x=>({...x.e,lessonId:lessonFor(x.e)})),direction:settings.direction,mode:settings.mode,index:0,ratings:[],draft:'',revealed:false};save();round();
    }
    function round(){
      const s=root.session;if(!s||s.version!==2)return list();
      const e=s.cards[s.index],notice=s.notice?`<p class="vt-notice" role="status">${T[s.notice.type]} · ${esc(title(s.notice.lessonId))}</p>`:'';
      if(!e){
        const ids=new Set(s.cards.map(c=>c.lessonId)),remaining=decks().filter(d=>ids.has(d.lessonId));
        view.innerHTML=`<section class="vt card center" data-i18n-ignore><h2>${T.done}</h2><p class="vt-prompt">${s.ratings.filter(Boolean).length} / ${s.cards.length}</p><p>${T.result}</p>${notice}${remaining.length?`<h3>${T.decks}</h3>${deckHtml(remaining)}<p class="muted">${T.deckRule}</p>`:''}<div class="button-row"><button class="primary-btn" id="vtBack">${T.back}</button></div></section>`;view.querySelector('#vtBack').onclick=list;wireDecks(true);return;
      }
      const reverse=s.direction==='reverse';
      view.innerHTML=`<section class="vt" data-i18n-ignore><div class="between"><button class="tiny-btn" id="vtBack">← ${T.back}</button><span>${s.index+1} / ${s.cards.length}</span></div><progress value="${s.index}" max="${s.cards.length}" aria-label="${T.remaining}"></progress>${notice}<section class="card vt-card"><p class="eyebrow">${esc(title(e.lessonId))}</p><h2 class="vt-prompt" lang="${reverse?(course==='fr'?'de':'fr'):course}">${esc([...new Set(pairsFor(e).map(p=>reverse?p.meaning:p.target))].join(' ; '))}</h2>${!reverse||s.revealed?audio(e):''}<label>${T.input}<textarea id="vtInput" rows="3" autocomplete="off" spellcheck="false" ${s.revealed?'readonly':''}>${esc(s.draft)}</textarea></label>${s.revealed?`<div class="vt-answer" lang="${reverse?course:(course==='fr'?'de':'fr')}">${esc([...new Set(pairsFor(e).map(p=>reverse?p.target:p.meaning))].join(' ; '))}${e.note?`<small class="vt-plural">${T.plural}: ${esc(e.note)}</small>`:''}</div><p class="muted">${T.self}</p><div class="button-row"><button class="secondary-btn" id="vtAgain">${T.again}</button><button class="primary-btn" id="vtYes">${T.yes}</button></div>`:`<button class="primary-btn" id="vtReveal">${T.answer}</button>`}</section></section>`;
      view.querySelector('#vtBack').onclick=list;view.querySelector('#vtInput').oninput=ev=>{s.draft=ev.target.value;save();};wireAudio([e]);
      if(!s.revealed)view.querySelector('#vtReveal').onclick=()=>{s.revealed=true;save();round();view.querySelector('#vtAgain').focus();};
      else for(const [id,ok]of [['vtAgain',false],['vtYes',true]])view.querySelector('#'+id).onclick=()=>{
        // Lock by position as well as id: an old double-click cannot grade the next card.
        if(root.session!==s||s.cards[s.index]!==e)return;
        const type=rate(root,e,ok);s.notice=type?{type,lessonId:e.lessonId}:null;
        s.ratings.push(ok);s.index++;s.draft='';s.revealed=false;save(true);round();view.querySelector('#vtInput')?.focus();
      };
    }
    const onLanguage=()=>{if(!view.querySelector('.vt')){cleanupLanguage?.();return;}const roundVisible=!!view.querySelector('#vtInput')||!!view.querySelector('.vt-prompt');render({...opts,initialLesson:null,resumeRound:roundVisible});};
    window.addEventListener('a1suite:languagechange',onLanguage);cleanupLanguage=()=>window.removeEventListener('a1suite:languagechange',onLanguage);
    if(opts.resumeRound)round();else list();
  }
  window.A1Vocabulary={buildBank,displayText,displayTarget,displayPairs,searchKey,render,label,prepareState,rate,mistakeDecks};
})();
