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
  function improve(lesson,unit,tasks){
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
    return shuffle([...forms,...vocabulary.slice(0,Math.max(0,12-forms.length))]);
  }
  window.FR_A1_GRAMMAR_EN=Object.fromEntries([...possessives(),...family(),...adjectiveAgreement(),...ordering()].flatMap(t=>[[t.meaning,t.meaningEn],[t.explanation,t.explanationEn]]));
  window.FR_A1_GRAMMAR_PRACTICE={improve,select,possessives,ordering};
})();
