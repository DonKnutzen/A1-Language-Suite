/* Coverage-oriented grammar drills, with explicit ownership/meaning clues. */
(() => {
  const unique=values=>[...new Set(values)];
  function form(q,answer,o,meaning,meaningEn,rule='',ruleEn='',coverage=''){
    return {kind:'form',q,answer,o:unique([answer,...o]).slice(0,3),meaning,meaningEn,audio:q.replace('___',answer).replace(/([’'])\s+/g,'$1'),explanation:q.replace('___',answer)+(rule?' — '+rule:''),explanationEn:q.replace('___',answer)+(ruleEn?' — '+ruleEn:''),coverage};
  }
  function possessives(){
    const rows=[['je',['mon','ma','mes'],['mein Vater','meine Mutter','meine Eltern'],'my'],['tu',['ton','ta','tes'],['dein Vater','deine Mutter','deine Eltern'],'your (tu)'],['il/elle',['son','sa','ses'],['sein/ihr Vater (Besitzer: eine Person)','seine/ihre Mutter (Besitzer: eine Person)','seine/ihre Eltern (Besitzer: eine Person)'],'his/her'],['nous',['notre','notre','nos'],['unser Vater','unsere Mutter','unsere Eltern'],'our'],['vous',['votre','votre','vos'],['Ihr/euer Vater (vous)','Ihre/eure Mutter (vous)','Ihre/eure Eltern (vous)'],'your (vous)'],['ils/elles',['leur','leur','leurs'],['ihr Vater (Besitzer: mehrere Personen)','ihre Mutter (Besitzer: mehrere Personen)','ihre Eltern (Besitzer: mehrere Personen)'],'their']];
    const nouns=['père','mère','parents'],english=['father','mother','parents'],out=[];
    rows.forEach(([owner,values,meanings,en],r)=>nouns.forEach((noun,c)=>{
      const answer=values[c],sameOwner=unique(values).filter(v=>v!==answer),otherOwner=rows[(r+1)%rows.length][1][c];
      const wrong=unique([...sameOwner,otherOwner,'ses','leur']).filter(v=>v!==answer).slice(0,2);
      out.push(form((c===2?'Ce sont':'C’est')+' ___ '+noun+'.',answer,wrong,meanings[c],en+' '+english[c],owner+' · '+(c===0?'maskulin':c===1?'feminin':'Plural'),owner+' · '+(c===0?'masculine':c===1?'feminine':'plural'),owner+':'+c));
    }));
    for(const [owner,answer,de,en]of [['je','mon','meine Freundin','my female friend'],['tu','ton','deine Freundin','your female friend (tu)'],['il/elle','son','seine/ihre Freundin (ein Besitzer)','his/her female friend']])out.push(form('C’est ___ amie.',answer,[{mon:'ma',ton:'ta',son:'sa'}[answer],{mon:'mes',ton:'tes',son:'ses'}[answer]],de,en,'Vor einem weiblichen Nomen mit Vokal steht mon, ton oder son.','Before a feminine noun starting with a vowel, use mon, ton or son.',owner+':vowel'));
    out.push(form('Ce sont ___ enfants.','leurs',['leur','ses'],'ihre Kinder (mehrere Besitzer)','their children','Mehrere Besitzer und mehrere Kinder: leurs enfants.','Plural owners and plural children: leurs enfants.','ils/elles:children'));
    out.push(form('C’est ___ sœur.','leur',['leurs','sa'],'ihre Schwester (mehrere Besitzer)','their sister','Die Zahl der besessenen Dinge entscheidet über leur/leurs.','The number of things possessed determines leur/leurs.','ils/elles:sister'));
    out.push(form('C’est ___ mère.','sa',['son','ses'],'seine Mutter (Besitzer: Paul)','his mother (owner: Paul)','Die Form richtet sich nach mère, nicht nach Paul.','The form agrees with mère, not with Paul.','il:mother'));
    return out;
  }
  function family(){
    const out=[];
    for(const [noun,plural,de,en]of [['mon frère',false,'mein Bruder','my brother'],['ma sœur',false,'meine Schwester','my sister'],['mes parents',true,'meine Eltern','my parents'],['mes enfants',true,'meine Kinder','my children'],['mon père',false,'mein Vater','my father'],['mes sœurs',true,'meine Schwestern','my sisters']])out.push(form((plural?'Ce ___ ':'C’___ ')+noun+'.',plural?'sont':'est',plural?['est','sommes']:['sont','es'],(plural?'Das sind ':'Das ist ')+de+' · schriftlicher Standard',(plural?'These are ':'This is ')+en+' · standard written French','C’est steht im Singular, ce sont im Plural.','Use c’est for singular and ce sont for plural.'));
    for(const [q,answer,o,de,en]of [['Ma sœur est ___.','petite',['petit','petits'],'Meine Schwester ist klein.','My sister is small.'],['Mon frère est ___.','petit',['petite','petits'],'Mein Bruder ist klein.','My brother is small.'],['Ma mère est ___.','mariée',['marié','mariés'],'Meine Mutter ist verheiratet.','My mother is married.'],['Mon père est ___.','marié',['mariée','mariés'],'Mein Vater ist verheiratet.','My father is married.'],['Ma sœur est ___.','calme',['sympa','petite'],'Meine Schwester ist ruhig.','My sister is calm.'],['Mon frère est ___.','sympa',['calme','petit'],'Mein Bruder ist nett.','My brother is nice.']])out.push(form(q,answer,o,de,en));
    return out;
  }
  function adjectiveAgreement(){
    const out=[];for(const [noun,ending,de,en]of [['un pantalon','', 'eine Hose','trousers'],['une veste','e','eine Jacke','a jacket'],['des pantalons','s','Hosen','pairs of trousers'],['des vestes','es','Jacken','jackets']])for(const [stem,german,english]of [['bleu','blau','blue'],['noir','schwarz','black'],['vert','grün','green']])out.push(form(noun+' ___.',stem+ending,['','e','s','es'].map(e=>stem+e).filter(v=>v!==stem+ending),german+' · '+de,english+' · '+en,'Das Adjektiv stimmt mit dem Nomen in Geschlecht und Zahl überein.','The adjective agrees with the noun in gender and number.'));
    return out;
  }
  function ordering(){
    return [
      form('Je ___ un café, s’il vous plaît.','voudrais',['voudrait','voudrions'],'Ich hätte gern einen Kaffee, bitte.','I would like a coffee, please.','Die höfliche Wendung mit je lautet je voudrais.','The polite phrase with je is je voudrais.','order:polite'),
      form('Je voudrais un café ___ un croissant.','et',['est','es'],'Ich hätte gern einen Kaffee und ein Croissant.','I would like a coffee and a croissant.','Et verbindet zwei Wünsche; est und es sind Verbformen.','Et joins two requests; est and es are verb forms.','order:and'),
      form('Une soupe, s’il ___ plaît.','vous',['tu','votre'],'Eine Suppe, bitte.','A soup, please.','Die höfliche Wendung lautet s’il vous plaît.','The polite phrase is s’il vous plaît.','order:please'),
      form('C’est ___ ?','combien',['comment','quand'],'Du fragst nach dem Preis.','You ask for the price.','Combien fragt hier nach dem Preis.','Combien asks for the price here.','order:price'),
      form('Qu’est-ce qu’il y a ___ dessert ?','comme',['avec','sans'],'Du fragst, was es als Nachtisch gibt.','You ask what is available for dessert.','Comme dessert bedeutet hier als Nachtisch.','Comme dessert means for dessert here.','order:dessert'),
      form('Une soupe ___ viande, s’il vous plaît.','sans',['avec','pour'],'Du möchtest eine Suppe ohne Fleisch.','You want a soup without meat.','Sans viande bedeutet ohne Fleisch; avec bedeutet mit.','Sans viande means without meat; avec means with.','order:without'),
      form('___, s’il vous plaît.','L’addition',['La addition','Le addition'],'Du hast gegessen und bittest um die Rechnung.','You have eaten and ask for the bill.','Vor addition wird la zu l’ verkürzt: l’addition.','Before addition, la becomes l’: l’addition.','order:bill'),
      form('Welche Bestellung enthält einen Kaffee und ein Croissant?','Je voudrais un café et un croissant, s’il vous plaît.',['Je voudrais un café et une salade, s’il vous plaît.','Je voudrais une soupe et un croissant, s’il vous plaît.'],'Bestelle beide gewünschten Dinge.','Order both requested items.','Café et croissant nennt beide gewünschten Dinge.','Café et croissant names both requested items.','order:combine')
    ].map(task=>({...task,audio:task.q.includes('___')?task.audio:task.answer}));
  }
  // Generic translation cards used unrelated phrases as distractors. Grammar drills
  // now hide one taught form; every option belongs to the same authored contrast.
  function fromPairs(unit,lessonId){
    const result=[],seen=new Set();
    const verbGroups=[
      ['suis','es','est','sommes','êtes','sont'],['ai','as','a','avons','avez','ont'],
      ['peux','peut','pouvons','pouvez','peuvent'],['dois','doit','devons','devez','doivent'],
      ['vais','vas','va','allons','allez','vont'],['viens','vient','venons','venez','viennent'],
      ['habite','habites','habitons','habitez','habitent'],['travaille','travailles','travaillons','travaillez','travaillent'],['parle','parles','parlons','parlez','parlent'],
      ['commence','commences','commençons','commencez','commencent'],['aime','aimes','aimons','aimez','aiment'],
      ['voudrais','voudrait','voudrions'],['prends','prend','prenons','prenez','prennent'],
      ['veux','veut','voulons','voulez','veulent'],['cherche','cherches','cherchons','cherchez','cherchent'],
      ['regarde','regardes','regardons','regardez','regardent'],['cuisine','cuisines','cuisinons','cuisinez','cuisinent'],
      ['rappelle','rappelles','rappelons','rappelez','rappellent'],['fait','fais','font'],['pleut','pleuvent','pleuvoir'],['repose','reposes','reposons','reposez','reposent'],['reste','restes','restons','restez','restent'],['rentre','rentres','rentrons','rentrez','rentrent'],
      ['partir','pars','part','partons','partez','partent'],['visité','visiter','visite'],['mangé','manger','mange'],
      ['regardé','regarder','regarde'],['travaillé','travailler','travaille'],['arrivée','arrivé','arriver'],
      ['allée','allé','aller'],['partis','parties','partir']
    ];
    const weekdays=['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'];
    const months=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
    function add(fr,de,start,length,answer,options,rule='',ruleEn=''){
      if(start===0&&/^[A-ZÀÂÉÈÊÎÔÙÜ]/u.test(answer))options=options.map(x=>x[0].toUpperCase()+x.slice(1));
      const o=[answer,...options.filter(x=>x!==answer)].slice(0,3);if(new Set(o).size!==3)return;
      const q=start===0&&length===fr.length?'Welche französische Angabe passt?':fr.slice(0,start)+'___'+fr.slice(start+length);const identity=JSON.stringify([q,answer,de]);if(seen.has(identity))return;seen.add(identity);
      result.push({kind:'form',q,answer,o,audio:fr,meaning:de,meaningEn:window.A1FrenchI18n?.translate(de)||de,explanation:fr+(rule?' — '+rule:''),explanationEn:fr+(ruleEn?' — '+ruleEn:''),coverage:'phrase:'+JSON.stringify([q,answer,de])});
    }
    for(const [raw,de]of unit.pairs||[]){
      const fr=String(raw).trim();if(!fr||/[/→…]| :$/.test(fr)||(lessonId===9&&unit.key==='r0')||(lessonId===24&&['r0','r1'].includes(unit.key)))continue;
      let match;
      if(lessonId===22&&unit.key==='r0'&&(match=fr.match(/\b(visité|regardé|travaillé)\b/u))){const a=match[1];add(fr,de,match.index,a.length,a,[a.slice(0,-1)+'er',a.slice(0,-1)+'e']);continue;}

      const semantic=[
        [/\b(prénom)\b/u,['nom de famille','numéro de téléphone']],
        [/\b(nom de famille)\b/u,['prénom','numéro de téléphone']],
        [/\b(code postal)\b/u,['numéro de téléphone','nom de famille']],
        [/\b(métier)\b/u,['nom','numéro de téléphone']],
        [/\b(médecin|développeur|étudiant)\b/u,['médecin','développeur','étudiant']],
        [/\b(mal au dos|mal à la tête|de la fièvre)\b/u,['mal au dos','mal à la tête','de la fièvre']],
        [/\b(au total)\b/u,['par kilo','par personne']],
        [/\b(inclus)\b/u,['gratuit','complet']]
      ];
      let targeted=false;
      for(const [pattern,alternatives]of semantic){if((match=fr.match(pattern))){add(fr,de,match.index,match[0].length,match[0],alternatives);targeted=true;break;}}
      if(targeted)continue;
      const field=fr.match(/^(Nom|Prénom|Âge|Téléphone|E-mail)\s*:/u);
      if(field){const alternatives={Nom:['Prénom','Signature'],Prénom:['Nom','Signature'],'Âge':['Téléphone','E-mail'],'Téléphone':['E-mail','Âge'],'E-mail':['Téléphone','Âge']};add(fr,de,0,field[1].length,field[1],alternatives[field[1]]);continue;}
      if((match=fr.match(/\b(un peu|beaucoup|trop) (de |d’)/u))){const value=match[2].trim(),start=match.index+match[0].length-match[2].length;add(fr,de,start,value.length,value,value==='d’'?['de','du']:['du','des']);continue;}
      if((match=fr.match(/ (moins le quart|et demie|et quart|trente)([.!?]|$)/u))){const value=match[1],alternatives=value==='moins le quart'?['et quart','et demie']:value==='et demie'?['et quart','moins le quart']:value==='et quart'?['et demie','moins le quart']:['treize','quarante'];add(fr,de,match.index+1,value.length,value,alternatives);continue;}
      // The first quantity exercise must test de/d’, not the obvious type of food.
      if((match=fr.match(/\b(?:kilos?|grammes|litres?|bouteilles?) (de |d’)/u))){
        const value=match[1].trim(),start=match.index+match[0].length-match[1].length;
        add(fr,de,start,value.length,value,value==='d’'?['de','du']:['du','des'],'Nach einer Mengenangabe steht de, vor Vokal d’.','After a quantity, use de; before a vowel, use d’.');continue;
      }
      if((match=fr.match(/dix-neuf euros (cinquante)/u))){add(fr,de,match.index+match[0].length-match[1].length,match[1].length,match[1],['quinze','soixante']);continue;}
      if((match=fr.match(/\b(par) carte\b/u))){add(fr,de,match.index,match[1].length,match[1],['en','à'],'Mit Karte bezahlen: payer par carte.','Pay by card: payer par carte.');continue;}
      if((match=fr.match(/\b(trop) cher\b/u))){add(fr,de,match.index,match[1].length,match[1],['très','peu'],'Trop bedeutet zu viel; très bedeutet sehr.','Trop means too much; très means very.');continue;}
      if((match=fr.match(/\b(taille) (\d+)/u))){add(fr,de,match.index,match[1].length,match[1],['prix','total']);continue;}
      if((match=fr.match(/\bdu (lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche) (au) /iu))){const start=match.index+match[0].lastIndexOf('au');add(fr,de,start,2,'au',['à','aux']);continue;}
      if((match=fr.match(/^(Où|Quand|Comment|Combien|Pourquoi|Qui)\b/u))){const groups=match[1]==='Qui'?['Que','Quel']:['Où','Quand','Comment','Combien','Pourquoi'];add(fr,de,0,match[1].length,match[1],groups);continue;}
      if((match=fr.match(/\b(depuis|dans|il y a) (?=(?:un|une|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|\d+) (?:jours?|ans?|mois|semaines?|minutes?|heures?)\b)/iu))){add(fr,de,match.index,match[1].length,match[1],['depuis','dans','il y a']);continue;}
      if((match=fr.match(/\b(jamais|pas)\b/u))){add(fr,de,match.index,match[0].length,match[0],['pas','jamais','toujours']);continue;}
      // Prepositions are tested only in lessons that teach them.
      if(lessonId>=8&&(match=fr.match(/\b(au|aux|en|à|du|des|de) (Paris|Lyon|France|Allemagne|Canada|États-Unis|musée|gare|toilettes|cinéma|football|tennis)\b/u))){const group=['au','aux','à','en'].includes(match[1])?['à','au','aux','en']:match[2]==='États-Unis'?['de','du','des']:['de','du','d’'];add(fr,de,match.index,match[1].length,match[1],group);continue;}
      if((match=fr.match(/\b(sur|sous|devant|derrière|dans) (?:la|le|l’|les)/u))){add(fr,de,match.index,match[1].length,match[1],['sur','sous','devant','derrière','dans']);continue;}
      if((match=fr.match(/^(un|une|le|la|les|des|ce|cet|cette|ces) /u))){const group=['un','une','des'].includes(match[1])?['un','une','des']:['le','la','les'].includes(match[1])?['le','la','les']:['ce','cet','cette','ces'];add(fr,de,0,match[1].length,match[1],group);continue;}
      let added=false;
      for(const group of verbGroups){
        for(const value of group){
          const start=fr.toLocaleLowerCase('fr').indexOf(value);if(start<0||/[\p{L}]/u.test(fr[start-1]||'')||/[\p{L}]/u.test(fr[start+value.length]||''))continue;
          if(fr===value)continue;add(fr,de,start,value.length,fr.slice(start,start+value.length),group.filter(x=>x!==value).sort((a,b)=>{const distance=x=>{const rows=Array.from({length:value.length+1},(_,i)=>i);for(let i=1;i<=x.length;i++){let prior=rows[0];rows[0]=i;for(let j=1;j<=value.length;j++){const old=rows[j];rows[j]=Math.min(rows[j]+1,rows[j-1]+1,prior+(x[i-1]===value[j-1]?0:1));prior=old;}}return rows[value.length];};return distance(a)-distance(b);}));added=true;break;
        }
        if(added)break;
      }
      if(added)continue;
      const category=weekdays.includes(fr)?weekdays:months.includes(fr)?months:null;
      if(category){const index=category.indexOf(fr);add(fr,de,0,fr.length,fr,[category[(index+1)%category.length],category[(index+category.length-1)%category.length]]);continue;}
      const close={
        'dix-sept':['dix-sept','soixante-dix','sept'],'vingt et un':['vingt et un','douze','trente et un'],'trente':['trente','treize','quarante'],
        'quarante':['quarante','quatorze','quatre-vingts'],'cinquante':['cinquante','quinze','soixante'],'soixante':['soixante','seize','cinquante'],
        'soixante-dix':['soixante-dix','soixante','quatre-vingts'],'soixante et onze':['soixante et onze','soixante et un','quatre-vingt-un'],
        'quatre-vingts':['quatre-vingts','quarante','quatre-vingt-dix'],'quatre-vingt-un':['quatre-vingt-un','quatre-vingt-onze','soixante et onze'],
        'quatre-vingt-dix':['quatre-vingt-dix','quatre-vingts','soixante-dix'],'cent':['cent','cinquante','soixante'],
        'd’abord':['d’abord','ensuite','enfin'],'ensuite':['ensuite','d’abord','enfin'],'enfin':['enfin','ensuite','d’abord'],
        'Nom':['Nom','Prénom','Signature'],'Prénom':['Prénom','Nom','Signature'],'Âge':['Âge','Nationalité','Téléphone'],
        'Téléphone':['Téléphone','Adresse','E-mail'],'E-mail':['E-mail','Téléphone','Adresse'],'Nationalité':['Nationalité','Adresse','Signature'],'Signature':['Signature','Nom','Prénom']
      };
      if(close[fr]){add(fr,de,0,fr.length,fr,close[fr]);continue;}
      // Unsupported recognition cards stay in the reference/vocabulary list; they
      // must not reappear with unrelated sentences as distractors.
    }
    return result;
  }
  function focusedTopics(lessonId,unit){
    const f=(q,answer,o,de,en,rule='',ruleEn='')=>{const task={...form(q,answer,o,de,en,rule,ruleEn,'topic:'+lessonId+':'+unit.key+':'+q+':'+answer),qualityVersion:147};if(!q.includes('___')){task.audio=answer;task.explanation=answer+(rule?' — '+rule:'');task.explanationEn=answer+(ruleEn?' — '+ruleEn:'');}return task;};
    if(lessonId===4&&unit.key==='u3')return [
      f('Rendez-vous mardi ___ quinze heures.','à',['au','en'],'Treffen am Dienstag um 15 Uhr.','Meet on Tuesday at 15:00.'),
      f('On se voit ___ la bibliothèque.','devant',['sous','sur'],'Wir sehen uns vor der Bibliothek.','See you in front of the library.'),
      f('Je suis libre ___ quinze heures.','à partir de',['avant','jusqu’à'],'Ich habe ab 15 Uhr Zeit.','I am free from 15:00 onwards.'),
      f('Je viens plus ___.','tard',['tôt','demain'],'Ich komme später.','I am coming later.'),
      f('Welche Form passt?','D’accord, mardi à quinze heures devant la bibliothèque.',['D’accord, mercredi à quinze heures devant la bibliothèque.','D’accord, mardi à seize heures devant la bibliothèque.'],'Bestätige Dienstag, 15 Uhr, vor der Bibliothek.','Confirm Tuesday, 15:00, in front of the library.')
    ];
    if(lessonId===10&&unit.key==='u2')return [
      f('Quel est votre ___ ?','métier',['nom','prénom'],'Du fragst nach dem Beruf.','Ask about the person’s occupation.'),
      f('___ travaillez-vous ?','Où',['Quand','Comment'],'Du fragst nach dem Arbeitsort.','Ask where the person works.'),
      f('Vous travaillez ___ jours ?','quels',['quel','quelle'],'Du fragst nach den Arbeitstagen.','Ask which days the person works.'),
      f('Je travaille ___ lundi au vendredi.','du',['le','au'],'Ich arbeite von Montag bis Freitag.','I work from Monday to Friday.'),
      f('Welche Form passt?','Je travaille à Halifax.',['Je travaille le lundi.','J’aime mon travail.'],'Du antwortest auf die Frage nach dem Arbeitsort.','Answer the question about the place of work.')
    ];
    if(lessonId===24&&unit.key==='u0')return [
      f('Nous partons ___ juillet.','en',['à','au'],'Wir fahren im Juli ab.','We are leaving in July.'),
      f('Nous allons à Paris ___ train.','en',['à','au'],'Wir fahren mit dem Zug nach Paris.','We are travelling to Paris by train.'),
      f('Nous restons ___ jours.','trois',['treize','trente'],'Wir bleiben drei Tage.','We are staying for three days.'),
      f('Nous allons manger au restaurant ___ visiter la ville.','et',['est','es'],'Wir werden im Restaurant essen und die Stadt besichtigen.','We are going to eat at a restaurant and visit the city.'),
      f('Nous rentrons vendredi ___.','soir',['matin','midi'],'Wir kommen Freitagabend zurück.','We are returning on Friday evening.')
    ];
    if(lessonId===9&&unit.key==='r1')return [
      f('___ est la pharmacie ?','Où',['Quand','Comment'],'Wo ist die Apotheke?','Where is the pharmacy?'),
      f('C’est à dix minutes à ___.','pied',['bus','train'],'Es ist zehn Minuten zu Fuß entfernt.','It is ten minutes away on foot.'),
      f('Le train part du ___ deux.','quai',['bus','train'],'Der Zug fährt von Gleis zwei ab.','The train leaves from platform two.'),
      f('___ de bus','un arrêt',['un quai','une gare'],'eine Bushaltestelle','a bus stop'),
      f('Welche Form passt?','Où est l’arrêt de bus ?',['À quelle heure part le bus ?','C’est quelle ligne de bus ?'],'Du suchst den Ort der Bushaltestelle.','You are looking for the location of the bus stop.')
    ];
    if(lessonId===11&&unit.key==='r1')return [
      f('Je suis en train de ___.','travailler',['travaille','travaillé'],'Ich arbeite gerade.','I am working right now.'),
      f('Léa est en train ___ manger.','de',['à','pour'],'Léa isst gerade.','Léa is eating right now.'),
      f('Nous sommes en train ___écrire.','d’',['de','à'],'Wir schreiben gerade.','We are writing right now.'),
      f('Paul et Léa ___ en train de lire.','sont',['est','sommes'],'Paul und Léa lesen gerade.','Paul and Léa are reading right now.'),
      f('Welche Form passt?','Je suis en train de manger.',['Je suis en train manger.','Je suis en train de mange.'],'Ich esse gerade. Achte auf den vollständigen Baustein und die Grundform.','I am eating right now. Check the complete expression and the infinitive.')
    ];
    if(lessonId===13&&unit.key==='r2')return [
      f('Welche Form passt?','une petite veste bleue',['une petit veste bleue','une petite veste bleu'],'eine kleine blaue Jacke · schriftlicher Standard','a small blue jacket · standard written French'),
      f('Welche Form passt?','un petit pantalon noir',['un petite pantalon noir','un petit pantalon noire'],'eine kleine schwarze Hose · schriftlicher Standard','small black trousers · standard written French'),
      f('Une ___ veste bleue.','petite',['petit','petits'],'Eine kleine blaue Jacke.','A small blue jacket.'),
      f('Une petite veste ___.','bleue',['bleu','bleus'],'Eine kleine blaue Jacke.','A small blue jacket.'),
      f('Welche Form passt?','une petite robe noire',['une robe petite noire','une noire petite robe'],'die übliche neutrale Reihenfolge: ein kleines schwarzes Kleid','the usual neutral order: a small black dress')
    ];
    if(lessonId===17&&unit.key==='u0')return [
      f('___ est votre nom ?','Quel',['Quelle','Quels'],'Wie lautet Ihr Nachname?','What is your family name?'),
      f('___ est votre adresse ?','Quelle',['Quel','Quelles'],'Wie lautet Ihre Adresse?','What is your address?'),
      f('___ : française','Nationalité',['Signature','Adresse'],'Staatsangehörigkeit: französisch','Nationality: French'),
      f('Nom : Martin. ___ : Léa.','Prénom',['Signature','Nationalité'],'Nachname: Martin. Vorname: Léa.','Family name: Martin. First name: Léa.'),
      f('Que dois-je ___ ici ?','écrire',['écris','écrit'],'Was muss ich hier schreiben?','What must I write here?')
    ];
    if(lessonId===17&&unit.key==='u1')return [
      f('___ sont les horaires du cours ?','Quels',['Quel','Quelles'],'Wie sind die Unterrichtszeiten?','What are the class times?'),
      f('___ est la date de début ?','Quelle',['Quel','Quels'],'Wann ist das Startdatum?','What is the start date?'),
      f('___ est le prix du cours ?','Quel',['Quelle','Quels'],'Wie hoch ist der Kurspreis?','What is the course price?'),
      f('Merci de me ___.','répondre',['répondez','répondu'],'Bitte antworten Sie mir.','Please reply to me.'),
      f('Welche Form passt?','Je vous écris pour demander des informations.',['Je vous écris pour confirmer mon inscription.','Je vous écris pour annuler mon inscription.'],'Du möchtest Informationen, keine Anmeldung bestätigen oder absagen.','You want information, not to confirm or cancel a registration.')
    ];
    if(lessonId===18&&unit.key==='r1')return [
      f('Pouvez-vous ___ votre nom ?','répéter',['répétez','répété'],'Können Sie Ihren Namen wiederholen?','Can you repeat your name?'),
      f('Pourriez-vous ___ plus lentement ?','parler',['parlez','parlé'],'Könnten Sie langsamer sprechen?','Could you speak more slowly?'),
      f('Vous pouvez m’___ ?','aider',['aidez','aidé'],'Können Sie mir helfen?','Can you help me?'),
      f('Pouvez-vous ___ votre nom ?','épeler',['répéter','écrire'],'Du brauchst die einzelnen Buchstaben des Namens.','You need the individual letters of the name.'),
      f('Welche Form passt?','Pouvez-vous parler plus lentement ?',['Pouvez-vous parler plus fort ?','Pouvez-vous répéter votre nom ?'],'Die Person spricht zu schnell. Bitte sie, das Tempo zu verringern.','The person is speaking too fast. Ask them to reduce their speed.')
    ];
    if(lessonId===19&&unit.key==='r3')return [
      f('C’___ une clé.','est',['sont','es'],'Das ist ein Schlüssel.','This is a key.'),
      f('Ce ___ des livres.','sont',['est','sommes'],'Das sind Bücher.','These are books.'),
      f('Welche Form passt?','Voici mon passeport.',['Voici est mon passeport.','Voici sont mon passeport.'],'Du reichst deinen Pass: Hier ist mein Pass.','Hand over your passport: Here is my passport.','Nach voici steht direkt die Nominalgruppe.','Voici is followed directly by the noun phrase.'),
      f('Welche Form passt?','Voilà le musée.',['Voilà est le musée.','Voilà sont le musée.'],'Dort ist das Museum.','There is the museum.','Nach voilà steht direkt die Nominalgruppe.','Voilà is followed directly by the noun phrase.'),
      f('Welche Form passt?','Ce sont mes clés.',['C’est mes clés.','Ce sont ma clé.'],'Das sind meine Schlüssel · schriftlicher Standard','These are my keys · standard written French')
    ];
    if(lessonId===21&&unit.key==='r1')return [
      f('Welche Form passt?','Est-ce que vous travaillez ?',['Où est-ce que vous travaillez ?','Quand est-ce que vous travaillez ?'],'Du fragst nur, ob die Person arbeitet.','Ask only whether the person works.'),
      f('___ est-ce que vous habitez ?','Où',['Quand','Pourquoi'],'Du fragst nach dem Wohnort.','Ask where the person lives.'),
      f('___ est-ce que tu fais ?','Qu’',['Qui','Où'],'Du fragst: Was machst du?','Ask: What are you doing?'),
      f('___ quand habitez-vous ici ?','Depuis',['Dans','Après'],'Du fragst: Seit wann wohnen Sie hier?','Ask: How long have you lived here?'),
      f('Welche Form passt?','Qu’est-ce que tu fais le week-end ?',['Où est-ce que tu travailles le week-end ?','Quand est-ce que tu travailles ?'],'Du fragst offen nach den Wochenendaktivitäten.','Ask an open question about weekend activities.')
    ];
    if(lessonId===21&&unit.key==='r2')return [
      f('___ ? — C’est Marie.','Qui est-ce',['Qu’est-ce que c’est','Où est-ce'],'Du fragst nach einer Person.','Ask who a person is.'),
      f('___ ? — C’est un livre.','Qu’est-ce que c’est',['Qui est-ce','Où est-ce'],'Du fragst nach einer Sache.','Ask what a thing is.'),
      f('___ ? — C’est mon frère.','Qui est-ce',['Qu’est-ce que c’est','Quand est-ce'],'Du fragst nach der Identität einer Person.','Ask for a person’s identity.'),
      f('___ ? — C’est une clé.','Qu’est-ce que c’est',['Qui est-ce','Où est-ce'],'Du fragst, was ein Gegenstand ist.','Ask what an object is.')
    ];
    if(lessonId===22&&unit.key==='r2')return [
      f('Léa est ___ à huit heures.','arrivée',['arrivé','arriver'],'Léa ist um acht Uhr angekommen.','Léa arrived at eight.'),
      f('Paul est ___ au cinéma.','allé',['allée','aller'],'Paul ist ins Kino gegangen.','Paul went to the cinema.'),
      f('Léa et Marie sont ___.','parties',['partis','partir'],'Léa und Marie sind abgefahren.','Léa and Marie have left.'),
      f('Paul et Léa sont ___.','partis',['parties','partir'],'Paul und Léa sind abgefahren, gemischte Gruppe.','Paul and Léa have left, mixed group.'),
      f('Léa ___ arrivée à Paris.','est',['a','es'],'Léa ist in Paris angekommen.','Léa arrived in Paris.')
    ];
    if(lessonId===22&&unit.key==='r3')return [
      f('Je viens ___ manger.','de',['à','pour'],'Ich habe gerade gegessen.','I have just eaten.'),
      f('Elle vient ___arriver.','d’',['de','à'],'Sie ist gerade angekommen.','She has just arrived.'),
      f('Nous ___ de rentrer.','venons',['venez','viennent'],'Wir sind gerade zurückgekommen.','We have just returned.'),
      f('Vous venez de ___.','manger',['mangez','mangé'],'Sie haben gerade gegessen.','You have just eaten.'),
      f('Paul ___ de visiter un musée.','vient',['viens','venons'],'Paul hat gerade ein Museum besucht.','Paul has just visited a museum.')
    ];
    if(lessonId===23&&unit.key==='r2')return [
      f('Je n’ai pas ___ farine.','de',['de la','du'],'Ich habe kein Mehl.','I have no flour.'),
      f('Je ne mets pas ___ sel.','de',['du','des'],'Ich gebe kein Salz dazu.','I am not adding salt.'),
      f('Je n’ai pas ___eau.','d’',['de','de l’'],'Ich habe kein Wasser.','I have no water.'),
      f('Nous n’avons pas ___ légumes.','de',['des','du'],'Wir haben kein Gemüse.','We have no vegetables.')
    ];
    if(lessonId===23&&unit.key==='r4')return [
      f('Un couteau pour ___ les tomates.','couper',['coupe','coupé'],'Ein Messer, um die Tomaten zu schneiden.','A knife to cut the tomatoes.'),
      f('Une cuillère pour ___ la soupe.','mélanger',['mélange','mélangé'],'Ein Löffel, um die Suppe zu mischen.','A spoon to mix the soup.'),
      f('Il faut ___ le lait.','ajouter',['ajoute','ajouté'],'Man muss die Milch hinzufügen.','You need to add the milk.'),
      f('___ les tomates, puis ajoutez le fromage.','Coupez',['Couper','Coupé'],'Schneiden Sie die Tomaten, dann geben Sie den Käse dazu.','Cut the tomatoes, then add the cheese.'),
      f('___ avec une cuillère.','Mélangez',['Mélanger','Mélangé'],'Mischen Sie mit einem Löffel.','Mix with a spoon.')
    ];
    if(lessonId===7&&unit.key==='r0')return [
      f('Un kilo ___ pommes, s’il vous plaît.','de',['du','des'],'Ein Kilo Äpfel, bitte.','A kilo of apples, please.','Nach einer konkreten Menge steht de.','Use de after a specified quantity.'),
      f('Deux bouteilles ___eau.','d’',['de','du'],'Zwei Flaschen Wasser.','Two bottles of water.','Vor dem Vokal in eau steht d’.','Before the vowel in eau, use d’.'),
      f('Cinq cents grammes ___ tomates.','de',['des','de la'],'Fünfhundert Gramm Tomaten.','Five hundred grams of tomatoes.'),
      f('Un litre ___ lait.','de',['du','de la'],'Ein Liter Milch.','A litre of milk.'),
      {...f('Welche Mengenangabe ist grammatisch korrekt?','deux kilos de pommes',['deux kilo de pommes','deux kilos des pommes'],'Zwei Kilo Äpfel.','Two kilos of apples.'),audio:'deux kilos de pommes'},
      {...f('Bestelle 500 Gramm Tomaten.','cinq cents grammes de tomates',['deux cents grammes de tomates','cinq cents grammes de fromage'],'Achte auf Zahl und Lebensmittel.','Check both the number and the food.'),audio:'cinq cents grammes de tomates'},
      {...f('Bestelle 200 Gramm Käse.','deux cents grammes de fromage',['cinq cents grammes de fromage','deux cents grammes de tomates'],'Achte auf Zahl und Lebensmittel.','Check both the number and the food.'),audio:'deux cents grammes de fromage'},
      {...f('Du brauchst zwei Flaschen Wasser. Welche Mengenangabe passt?','deux bouteilles d’eau',['douze bouteilles d’eau','deux litres d’eau'],'Zahl und Einheit müssen passen.','Both number and unit must match.'),audio:'deux bouteilles d’eau'},
      {...f('Du brauchst einen Liter Milch. Welche Mengenangabe passt?','un litre de lait',['un litre d’eau','un kilo de lait'],'Achte auf Einheit und Lebensmittel.','Check the unit and the food.'),audio:'un litre de lait'}
    ];
    if(lessonId===7&&unit.key==='r1')return [
      {...f('Du fragst nach dem Gesamtpreis deines Einkaufs.','C’est combien au total ?',['C’est combien par kilo ?','C’est combien par personne ?'],'Frage nach dem ganzen Einkauf.','Ask about the whole purchase.'),audio:'C’est combien au total ?'},
      f('Ça coûte dix-neuf euros ___.','cinquante',['quinze','soixante'],'Das kostet 19,50 Euro.','It costs 19.50 euros.'),
      {...f('___ ça coûte ?','Combien',['Comment','Quand'],'Wie viel kostet das?','How much does it cost?','Combien fragt nach dem Preis.','Combien asks for the price.'),legacyTask:{q:'Ça coûte ___ euros cinquante.',answer:'dix-neuf'}},
      f('Je peux payer ___ carte ?','par',['en','à'],'Kann ich mit Karte bezahlen?','Can I pay by card?','Die Wendung lautet payer par carte.','The phrase is payer par carte.'),
      f('C’est ___ cher.','trop',['très','peu'],'Das ist zu teuer.','It is too expensive.','Trop bedeutet zu; très bedeutet sehr.','Trop means too; très means very.'),
      f('Je ___ celui-ci.','prends',['prend','prenons'],'Ich nehme dieses hier.','I will take this one.'),
      f('Vous avez ___ taille 40 ?','une',['un','des'],'Haben Sie Größe 40?','Do you have size 40?','Die gelernte Wendung verwendet une taille.','The taught expression uses une taille.')
    ];
    if(lessonId===19&&unit.key==='r1')return [['un livre','des livres','des livre','un livres'],['une clé','des clés','des clé','une clés'],['une baguette','des baguettes','des baguette','une baguettes'],['un café','des cafés','des café','un cafés']].map(([one,many,w1,w2])=>({...f('Setze in den Plural: '+one,many,[w1,w2],'Mehrere Dinge statt eines einzelnen.','More than one item.'),audio:many}));
    if(lessonId===19&&unit.key==='r2')return [['livre','le','das Buch','the book'],['clé','la','der Schlüssel','the key'],['passeport','le','der Pass','the passport'],['table','la','der Tisch','the table']].map(([noun,article,de,en])=>f('___ '+noun,article,['le','la','les'].filter(a=>a!==article),de,en));
    if(lessonId===21&&unit.key==='r4')return [
      f('___, j’habite ici. Et toi ?','Moi',['Toi','Lui'],'Ich wohne hier. Und du?','I live here. And you?'),
      f('Moi, j’habite ici. Et ___ ?','toi',['moi','lui'],'Ich wohne hier. Und du?','I live here. And you?'),
      f('Je travaille avec ___.','lui',['elle','eux'],'Ich arbeite mit Paul.','I work with Paul.'),
      f('Je travaille avec ___.','elle',['lui','eux'],'Ich arbeite mit Marie.','I work with Marie.'),
      f('Je travaille avec ___.','eux',['lui','elle'],'Ich arbeite mit Paul und Marc.','I work with Paul and Marc.'),
      f('Je travaille avec ___.','elles',['elle','lui'],'Ich arbeite mit Marie und Léa.','I work with Marie and Léa.')
    ];
    if(lessonId===22&&unit.key==='r1')return [
      f('___, j’ai travaillé.','Hier',['Demain','Toujours'],'Gestern habe ich gearbeitet.','Yesterday I worked.'),
      f('___, je vais voir des amis.','Demain',['Hier','Jamais'],'Morgen werde ich Freunde treffen.','Tomorrow I will see friends.'),
      f('___, je prends le petit-déjeuner.','D’abord',['Ensuite','Enfin'],'Zuerst frühstücke ich.','First I have breakfast.'),
      f('___, je vais au travail.','Ensuite',['D’abord','Enfin'],'Danach gehe ich zur Arbeit.','Then I go to work.'),
      f('___, je rentre à la maison.','Enfin',['D’abord','Ensuite'],'Zum Schluss gehe ich nach Hause.','Finally I go home.')
    ];
    return null;
  }
  function improve(lesson,unit,tasks){
    const authored=focusedTopics(lesson.id,unit);if(authored)return authored;
    if(lesson.id===6&&unit.title==='Höflich bestellen')return ordering();
    if(/Possessivbegleiter/i.test(unit.title))return possessives();
    if(lesson.id===5&&unit.key==='r1')return family().map(t=>{const m=t.q.match(/^(?:C’|Ce )___ (.+)$/);return m?{...t,legacyTask:{q:'___ '+m[1],answer:t.answer==='est'?'C’est':'Ce sont'}}:t;});
    if(lesson.id===13&&unit.key==='r1')return adjectiveAgreement();
    tasks=tasks.map(task=>task.q==='Vous pouvez ___, s’il vous plaît ?'&&task.answer==='épeler'?{...task,o:['épeler','épelez','épelle'],legacyTask:{q:task.q,answer:task.answer}}:task);
    const replacements={
      'Je voudrais un café.':{q:'Welche Aussage verwendet die höfliche Wunschform von vouloir?',o:['Je voudrais un café.','Je veux un café.','Je prends un café.']},
      'Combien ça coûte ?':{o:['Combien ça coûte ?','Combien de pommes voulez-vous ?','Combien de personnes ?']},
      'Je voudrais un médicament contre le rhume.':{q:'Du möchtest ein Mittel gegen Erkältung kaufen. Welche Bitte passt?',o:['Je voudrais un médicament contre le rhume.','Je voudrais un rendez-vous chez le médecin.','Je voudrais l’adresse de la pharmacie.']},
      'On peut reporter le rendez-vous à demain ?':{q:'Du möchtest den Termin auf morgen verschieben. Welche Frage passt?',o:['On peut reporter le rendez-vous à demain ?','On peut annuler le rendez-vous ?','On se retrouve aujourd’hui ?']},
      'Je vous écris pour demander des informations.':{o:['Je vous écris pour demander des informations.','Je vous écris pour donner mes informations.','Je vous écris pour demander un rendez-vous.']},
      'Voici mon passeport.':{o:['Voici mon passeport.','Voici mon billet.','Voici mes clés.']}
    };
    return tasks.map(task=>task.kind==='form'&&replacements[task.answer]?{...task,...replacements[task.answer]}:task);
  }
  function select(tasks,shuffle){
    // Include every distinct form/coverage cell; avoid showing an identical solved
    // sentence twice merely because it came from a table and a specification.
    const seen=new Set(),forms=tasks.filter(t=>t.kind==='form').filter(t=>{const key=t.coverage||t.audio||t.q;if(seen.has(key))return false;seen.add(key);return true;});
    const vocabulary=tasks.filter(t=>t.kind==='vocabulary');
    const selected=shuffle([...forms,...vocabulary.slice(0,Math.max(0,12-forms.length))]);
    return window.FR_A1_MASTERY?.spreadAnswers?window.FR_A1_MASTERY.spreadAnswers(selected):selected;
  }
  const extraTopics=[4,7,9,10,11,13,17,18,19,21,22,23,24].flatMap(id=>['r0','r1','r2','r3','r4','u0','u1','u2','u3'].flatMap(key=>focusedTopics(id,{key})||[]));
  window.FR_A1_GRAMMAR_EN=Object.fromEntries([...possessives(),...family(),...adjectiveAgreement(),...ordering(),...extraTopics].flatMap(t=>[[t.meaning,t.meaningEn],[t.explanation,t.explanationEn]]));
  window.FR_A1_GRAMMAR_PRACTICE={improve,select,possessives,ordering,fromPairs,focusedTopics};
})();
