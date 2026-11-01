/* French A1 grammar explanations (written in German) for the 💡 answer button. */
(() => {
  'use strict';
  if(!window.A1Explain)return;
  const P=['je','tu','il / elle / on','nous','vous','ils / elles'];
  const PRON={je:[0],"j'":[0],tu:[1],il:[2],elle:[2],on:[2],nous:[3],vous:[4],ils:[5],elles:[5]};
  const REFL={me:[0],"m'":[0],te:[1],"t'":[1],se:[2,5],"s'":[2,5]};

  /* ---------- verbs ---------- */
  // forms: je tu il nous vous ils · pp: participe passé · aux: Hilfsverb im passé composé
  const IRR={
    'être':{de:'sein',f:'suis es est sommes êtes sont',pp:'été'},
    'avoir':{de:'haben',f:'ai as a avons avez ont',pp:'eu'},
    'aller':{de:'gehen / fahren',f:'vais vas va allons allez vont',pp:'allé',aux:'être'},
    'faire':{de:'machen / tun',f:'fais fais fait faisons faites font',pp:'fait'},
    'venir':{de:'kommen',f:'viens viens vient venons venez viennent',pp:'venu',aux:'être'},
    'revenir':{de:'zurückkommen',f:'reviens reviens revient revenons revenez reviennent',pp:'revenu',aux:'être'},
    'devenir':{de:'werden',f:'deviens deviens devient devenons devenez deviennent',pp:'devenu',aux:'être'},
    'prendre':{de:'nehmen',f:'prends prends prend prenons prenez prennent',pp:'pris'},
    'apprendre':{de:'lernen',f:'apprends apprends apprend apprenons apprenez apprennent',pp:'appris'},
    'comprendre':{de:'verstehen',f:'comprends comprends comprend comprenons comprenez comprennent',pp:'compris'},
    'pouvoir':{de:'können',f:'peux peux peut pouvons pouvez peuvent',pp:'pu',modal:1},
    'vouloir':{de:'wollen',f:'veux veux veut voulons voulez veulent',pp:'voulu',modal:1},
    'devoir':{de:'müssen',f:'dois dois doit devons devez doivent',pp:'dû',modal:1},
    'savoir':{de:'wissen / können',f:'sais sais sait savons savez savent',pp:'su'},
    'connaître':{de:'kennen',f:'connais connais connaît connaissons connaissez connaissent',pp:'connu'},
    'dire':{de:'sagen',f:'dis dis dit disons dites disent',pp:'dit'},
    'voir':{de:'sehen',f:'vois vois voit voyons voyez voient',pp:'vu'},
    'croire':{de:'glauben',f:'crois crois croit croyons croyez croient',pp:'cru'},
    'mettre':{de:'legen / anziehen',f:'mets mets met mettons mettez mettent',pp:'mis'},
    'partir':{de:'abfahren / weggehen',f:'pars pars part partons partez partent',pp:'parti',aux:'être'},
    'sortir':{de:'ausgehen',f:'sors sors sort sortons sortez sortent',pp:'sorti',aux:'être'},
    'dormir':{de:'schlafen',f:'dors dors dort dormons dormez dorment',pp:'dormi'},
    'sentir':{de:'fühlen / riechen',f:'sens sens sent sentons sentez sentent',pp:'senti'},
    'servir':{de:'servieren',f:'sers sers sert servons servez servent',pp:'servi'},
    'lire':{de:'lesen',f:'lis lis lit lisons lisez lisent',pp:'lu'},
    'écrire':{de:'schreiben',f:'écris écris écrit écrivons écrivez écrivent',pp:'écrit'},
    'boire':{de:'trinken',f:'bois bois boit buvons buvez boivent',pp:'bu'},
    'ouvrir':{de:'öffnen',f:'ouvre ouvres ouvre ouvrons ouvrez ouvrent',pp:'ouvert'},
    'offrir':{de:'schenken',f:'offre offres offre offrons offrez offrent',pp:'offert'},
    'recevoir':{de:'bekommen',f:'reçois reçois reçoit recevons recevez reçoivent',pp:'reçu'},
    'courir':{de:'laufen / rennen',f:'cours cours court courons courez courent',pp:'couru'},
    'vivre':{de:'leben',f:'vis vis vit vivons vivez vivent',pp:'vécu'},
    'conduire':{de:'fahren (Auto)',f:'conduis conduis conduit conduisons conduisez conduisent',pp:'conduit'},
    'suivre':{de:'folgen',f:'suis suis suit suivons suivez suivent',pp:'suivi'},
    'naître':{de:'geboren werden',f:'nais nais naît naissons naissez naissent',pp:'né',aux:'être'},
    'mourir':{de:'sterben',f:'meurs meurs meurt mourons mourez meurent',pp:'mort',aux:'être'},
    'falloir':{de:'müssen (es ist nötig)',f:'- - faut - - -',pp:'fallu',only:'il faut'},
    'pleuvoir':{de:'regnen',f:'- - pleut - - -',pp:'plu',only:'il pleut'}
  };
  // -er verbs with a spelling change in the stem
  const SPECIAL_ER={
    "appeler":{de:'(sich) nennen / heißen',f:'appelle appelles appelle appelons appelez appellent',note:'Doppeltes <b>ll</b> bei je, tu, il, ils – bei nous und vous nur ein <b>l</b>. Mit Reflexivpronomen: je <b>m’</b>appelle, tu <b>t’</b>appelles, il <b>s’</b>appelle.'},
    "acheter":{de:'kaufen',f:'achète achètes achète achetons achetez achètent',note:'<b>è</b> (Accent grave) bei je, tu, il, ils – bei nous und vous ohne Akzent.'},
    "lever":{de:'heben / (se lever) aufstehen',f:'lève lèves lève levons levez lèvent',note:'<b>è</b> bei je, tu, il, ils. Reflexiv: je me lève.'},
    "promener":{de:'spazieren gehen (se promener)',f:'promène promènes promène promenons promenez promènent',note:'<b>è</b> bei je, tu, il, ils.'},
    "préférer":{de:'lieber mögen',f:'préfère préfères préfère préférons préférez préfèrent',note:'<b>é → è</b> bei je, tu, il, ils.'},
    "répéter":{de:'wiederholen',f:'répète répètes répète répétons répétez répètent',note:'<b>é → è</b> bei je, tu, il, ils.'},
    "espérer":{de:'hoffen',f:'espère espères espère espérons espérez espèrent',note:'<b>é → è</b> bei je, tu, il, ils.'},
    "manger":{de:'essen',f:'mange manges mange mangeons mangez mangent',note:'nous mang<b>e</b>ons: das <b>e</b> bleibt, damit g weich (wie „sch“) klingt.'},
    "nager":{de:'schwimmen',f:'nage nages nage nageons nagez nagent',note:'nous nag<b>e</b>ons (e bleibt für das weiche g).'},
    "voyager":{de:'reisen',f:'voyage voyages voyage voyageons voyagez voyagent',note:'nous voyag<b>e</b>ons (e bleibt für das weiche g).'},
    "changer":{de:'wechseln / ändern',f:'change changes change changeons changez changent',note:'nous chang<b>e</b>ons.'},
    "ranger":{de:'aufräumen',f:'range ranges range rangeons rangez rangent',note:'nous rang<b>e</b>ons.'},
    "commencer":{de:'anfangen',f:'commence commences commence commençons commencez commencent',note:'nous commen<b>ç</b>ons: <b>ç</b>, damit c wie „s“ klingt.'},
    "payer":{de:'bezahlen',f:'paie paies paie payons payez paient',note:'y → <b>i</b> bei je, tu, il, ils (je paye ist auch erlaubt).'},
    "envoyer":{de:'schicken',f:'envoie envoies envoie envoyons envoyez envoient',note:'y → <b>i</b> bei je, tu, il, ils.'},
    "essayer":{de:'(an)probieren',f:'essaie essaies essaie essayons essayez essaient',note:'y → <b>i</b> bei je, tu, il, ils (j’essaye ist auch erlaubt).'},
    "nettoyer":{de:'putzen',f:'nettoie nettoies nettoie nettoyons nettoyez nettoient',note:'y → <b>i</b> bei je, tu, il, ils.'}
  };
  const ER='parler habiter travailler aimer adorer détester regarder écouter jouer chercher trouver donner demander rester arriver entrer rentrer commander réserver coûter porter chanter danser visiter étudier cuisiner téléphoner fermer tourner continuer traverser louer garer déjeuner dîner aider laver préparer inviter oublier passer penser quitter marcher fumer présenter reposer coucher réveiller brosser doucher habiller amuser occuper excuser dessiner gagner goûter montrer monter tomber retourner décider expliquer emprunter utiliser accepter apporter allumer arrêter compter discuter durer fêter garder imaginer intéresser laisser organiser pratiquer proposer raconter refuser regretter remercier rencontrer rêver saluer sonner terminer toucher vérifier voler aider écouter épeler signer remplir baigner bavarder bricoler camper chauffer cliquer copier crier déménager désirer deviner dîner écouter enregistrer entrer étudier fatiguer gronder klaxonner lancer marquer neiger noter partager photographier pleurer poser pousser prêter prier ramasser recommander regarder relaxer réparer respirer retrouver rouler sauter sembler skier souhaiter surfer tomber trainer travailler tricoter tutoyer vouvoyer valider'.split(' ');
  const IR='finir choisir réussir grandir maigrir grossir remplir réfléchir obéir rougir'.split(' ');
  const RE='attendre vendre répondre entendre descendre perdre rendre'.split(' ');
  const ETRE_PP=new Set('allé venu revenu devenu parti sorti arrivé entré rentré resté tombé monté descendu retourné né mort passé'.split(' '));
  const vowel=w=>/^[aeiouyhâàéèêëîïôûœ]/i.test(w);
  const VERBS={};
  Object.entries(IRR).forEach(([inf,v])=>VERBS[inf]={inf,...v,type:'irr',forms:v.f.split(' ')});
  Object.entries(SPECIAL_ER).forEach(([inf,v])=>VERBS[inf]={inf,...v,type:'er-special',forms:v.f.split(' '),pp:inf.slice(0,-2)+'é'});
  ER.forEach(inf=>{if(VERBS[inf])return;const s=inf.slice(0,-2);VERBS[inf]={inf,type:'er',stem:s,forms:['e','es','e','ons','ez','ent'].map(e=>s+e),pp:s+'é',aux:ETRE_PP.has(s+'é')?'être':undefined};});
  IR.forEach(inf=>{const s=inf.slice(0,-2);VERBS[inf]={inf,type:'ir',stem:s,forms:['is','is','it','issons','issez','issent'].map(e=>s+e),pp:s+'i'};});
  RE.forEach(inf=>{const s=inf.slice(0,-2);VERBS[inf]={inf,type:'re',stem:s,forms:['s','s','','ons','ez','ent'].map(e=>s+e),pp:s+'u',aux:inf==='descendre'?'être':undefined};});
  const DE_MEANING={parler:'sprechen',habiter:'wohnen',travailler:'arbeiten',aimer:'mögen / lieben',adorer:'sehr mögen',détester:'hassen',regarder:'ansehen',écouter:'hören',jouer:'spielen',chercher:'suchen',trouver:'finden',donner:'geben',demander:'fragen',rester:'bleiben',arriver:'ankommen',entrer:'hineingehen',rentrer:'heimkehren',commander:'bestellen',réserver:'reservieren',coûter:'kosten',porter:'tragen',chanter:'singen',danser:'tanzen',visiter:'besichtigen',étudier:'studieren',cuisiner:'kochen',téléphoner:'telefonieren',fermer:'schließen',tourner:'abbiegen',continuer:'weitergehen',traverser:'überqueren',louer:'mieten',déjeuner:'zu Mittag essen',dîner:'zu Abend essen',aider:'helfen',laver:'waschen',préparer:'vorbereiten',inviter:'einladen',oublier:'vergessen',passer:'vorbeigehen / verbringen',penser:'denken',quitter:'verlassen',marcher:'gehen',finir:'beenden',choisir:'wählen',attendre:'warten',vendre:'verkaufen',répondre:'antworten',entendre:'hören',descendre:'aussteigen / hinuntergehen',perdre:'verlieren',présenter:'vorstellen',réveiller:'wecken',coucher:'ins Bett bringen',monter:'einsteigen / hinaufgehen',tomber:'fallen',rencontrer:'treffen',remercier:'danken',fêter:'feiern'};
  const INDEX={};
  Object.values(VERBS).forEach(v=>{
    v.de=v.de||DE_MEANING[v.inf]||'';
    v.forms.forEach((form,p)=>{if(form&&form!=='-')(INDEX[form]=INDEX[form]||[]).push({v,p});});
  });
  const PARTICIPLES={};
  Object.values(VERBS).forEach(v=>{if(v.pp)[v.pp,v.pp+'e',v.pp+'s',v.pp+'es'].forEach(f=>PARTICIPLES[f]=PARTICIPLES[f]||v);});
  const INFINITIVES=new Set(Object.keys(VERBS));

  /* ---------- tokens ---------- */
  function tokens(text){
    return String(text||'').toLowerCase().replace(/[’`´]/g,"'").replace(/\b([jlmtsdnc]|qu|jusqu|lorsqu|puisqu)'/g,"$1' ")
      .split(/[^a-zàâäçéèêëîïôöûùüÿœæ'0-9]+/).map(t=>t.trim()).filter(Boolean);
  }
  const lowerText=t=>' '+tokens(t).join(' ')+' ';

  /* ---------- explanation builders ---------- */
  // Regular verbs show the ending in colour so the learner sees stem + ending.
  function verbTable(v,rows){
    return H.table(['Person','Form'],v.forms.map((form,p)=>{
      if(!form||form==='-')return [P[p],'—'];
      const shown=v.stem&&form.startsWith(v.stem)?v.stem+'<span class="gx-end">'+form.slice(v.stem.length)+'</span>':form;
      return [p===0&&vowel(form)?'j’':P[p],shown];
    }),rows);
  }
  function verbCard(v,form,rows,ctxText){
    const people=rows.map(r=>P[r]).join(' bzw. ');
    let intro=`<p><b>${H.esc(form)}</b> ist eine Form von <b>${v.inf}</b>${v.de?` (${v.de})`:''} – Person: <b>${people||'?'}</b>.</p>`;
    let rule='';
    if(v.type==='irr')rule=v.only?`<p>${v.inf} gibt es nur unpersönlich: <b>${v.only}</b>.</p>`:`<p><b>${v.inf}</b> ist <b>unregelmäßig</b> – die Formen musst du auswendig lernen.${v.modal?' Danach folgt ein Verb im <b>Infinitiv</b>: je peux <i>venir</i>.':''}</p>`;
    if(v.type==='er')rule=`<p>Regelmäßiges Verb auf <b>-er</b>: Stamm <b>${v.stem}-</b> + Endung <span class="gx-end">-e, -es, -e, -ons, -ez, -ent</span>. Die Endungen -e, -es und -ent hört man nicht – je parle, tu parles, ils parlent klingen gleich.</p>`;
    if(v.type==='er-special')rule=`<p>Verb auf -er mit Besonderheit: ${v.note}</p>`;
    if(v.type==='ir')rule=`<p>Regelmäßiges Verb auf <b>-ir</b> (wie finir): Stamm <b>${v.stem}-</b> + <span class="gx-end">-is, -is, -it, -issons, -issez, -issent</span>.</p>`;
    if(v.type==='re')rule=`<p>Regelmäßiges Verb auf <b>-re</b>: Stamm <b>${v.stem}-</b> + <span class="gx-end">-s, -s, –, -ons, -ez, -ent</span> (il ${v.stem}: keine Endung).</p>`;
    const elision=/\bj'/.test(ctxText)&&rows.includes(0)?'<p><small>Vor Vokal oder stummem h wird <b>je → j’</b>.</small></p>':'';
    return H.card(`Verb: ${v.inf}`,intro+rule+(v.only?'':verbTable(v,rows))+elision);
  }
  // Subject pronoun before the verb (or after it in an inversion) decides the person.
  function personFromContext(i,toks){
    if(i<0)return null;
    for(let k=i-1;k>=Math.max(0,i-3);k--){
      const t=toks[k];
      if(REFL[t]&&k>0&&PRON[toks[k-1]])return PRON[toks[k-1]];
      if(PRON[t])return PRON[t];
      if(t==="n'"||t==='ne'||REFL[t]||t==='y'||t==='en'||t==='le'||t==='la'||t==='les'||t==='lui'||t==='leur')continue;
      break;
    }
    const after=toks[i+1];// inversion: Pouvez-vous …
    if(after&&PRON[after])return PRON[after];
    return null;
  }

  const ART={
    le:['bestimmt','maskulin Singular'],la:['bestimmt','feminin Singular'],"l'":['bestimmt','vor Vokal / stummem h'],les:['bestimmt','Plural'],
    un:['unbestimmt','maskulin'],une:['unbestimmt','feminin'],des:['unbestimmt / Teilungsartikel','Plural'],
    du:['Teilungsartikel (oder de + le)','maskulin'],'de la':['Teilungsartikel','feminin'],"de l'":['Teilungsartikel','vor Vokal']
  };
  function articleCard(art,noun,toks,i){
    const rows=[
      ['bestimmt (der/die/das)','le','la','l’','les'],
      ['unbestimmt (ein/eine)','un','une','un / une','des'],
      ['Teilungsartikel (etwas)','du','de la','de l’','des']
    ];
    const cell={le:[0,1],la:[0,2],"l'":[0,3],les:[0,4],un:[1,1],une:[1,2],des:[1,4],du:[2,1],'de la':[2,2],"de l'":[2,3]}[art];
    let why='';
    if(art==='la'||art==='une')why=noun?`„${H.esc(noun)}“ ist <b>feminin</b> → <b>${art}</b>.`:'feminines Nomen.';
    else if(art==='le'||art==='un')why=noun?`„${H.esc(noun)}“ ist <b>maskulin</b> → <b>${art}</b>.`:'maskulines Nomen.';
    else if(art==="l'")why=`Vor Vokal oder stummem h werden <b>le</b> und <b>la</b> zu <b>l’</b>${noun?` (l’${H.esc(noun)})`:''}.`;
    else if(art==='les'||art==='des')why=`Plural → <b>${art}</b> (für maskulin und feminin gleich).`;
    else why='Teilungsartikel: eine unbestimmte Menge von etwas, das man nicht zählt (Brot, Wasser, Käse …). Im Deutschen steht oft gar kein Artikel: <i>Je mange du pain</i> = Ich esse Brot.';
    const prev=toks[i-1]||'';
    let extra='';
    if(['le','la','les'].includes(art)&&['aime','aimes','aiment','aimons','aimez','adore','adores','adorent','déteste','détestes','détestent','préfère','préfères','préfèrent'].includes(prev))extra='<p>Nach <b>aimer, adorer, détester, préférer</b> steht der <b>bestimmte</b> Artikel (Vorliebe allgemein): j’aime <b>le</b> café.</p>';
    if((art==='du'||art==='de la'||art==="de l'"||art==='des')&&/^(mange|manges|mangent|mangeons|mangez|bois|boit|boivent|buvons|buvez|prends|prend|prennent|prenons|prenez|achète|achètes|achètent|achetons|achetez|veux|veut|voulons|voulez|veulent|voudrais|fais|fait|faisons|faites|font|a|ai|as|avons|avez|ont)$/.test(prev))extra+='<p>Nach Verben wie <b>manger, boire, prendre, acheter, vouloir, faire</b> steht für eine unbestimmte Menge der Teilungsartikel.</p>';
    return H.card(`Artikel: ${art.replace("'",'’')}`,`<p>${why}</p>${H.grid(['','mask.','fem.','vor Vokal','Plural'],rows,cell?[cell]:[])}${extra}<p><small>Nach Verneinung wird un/une/du/de la/des zu <b>de / d’</b>: je n’ai pas <b>de</b> voiture.</small></p>`);
  }
  function contractionCard(word,toks,i){
    const next=toks[i+1]||'';
    const rows=[['à + le','<b>au</b>'],['à + les','<b>aux</b>'],['à + la','à la'],['à + l’','à l’'],['de + le','<b>du</b>'],['de + les','<b>des</b>'],['de + la','de la'],['de + l’','de l’']];
    const hl={au:[0],aux:[1],du:[4],des:[5]}[word]||[];
    let why=word==='au'?'<b>au</b> = à + le (vor maskulinem Nomen).':word==='aux'?'<b>aux</b> = à + les (Plural).':word==='du'?'<b>du</b> = de + le (vor maskulinem Nomen) – oder Teilungsartikel.':'<b>des</b> = de + les.';
    if((word==='au'||word==='aux')&&COUNTRY_M.has(next))why+=` Bei <b>maskulinen Ländern</b> heißt „in / nach“: <b>${word}</b> ${next}.`;
    return H.card(`Zusammenziehung: ${word}`,`<p>${why} <b>à</b> und <b>de</b> verschmelzen mit le und les, nicht mit la und l’.</p>${H.table(['','ergibt'],rows,hl)}`);
  }
  const COUNTRY_F=new Set('france allemagne italie espagne suisse belgique angleterre autriche chine grèce turquie pologne russie suède norvège irlande tunisie algérie inde corée australie afrique europe asie amérique'.split(' '));
  const COUNTRY_M=new Set('japon canada maroc portugal brésil mexique sénégal danemark luxembourg vietnam liban chili pérou cameroun'.split(' '));
  const COUNTRY_PL=new Set(['états-unis','pays-bas','etats-unis']);
  const MONTHS='janvier février mars avril mai juin juillet août septembre octobre novembre décembre'.split(' ');
  const DAYS='lundi mardi mercredi jeudi vendredi samedi dimanche'.split(' ');
  const SEASONS={printemps:'au printemps',été:'en été',automne:'en automne',hiver:'en hiver'};
  const TRANSPORT_EN=new Set('voiture train bus avion métro taxi tram tramway bateau'.split(' '));
  const TRANSPORT_A=new Set('pied vélo moto cheval'.split(' '));
  function placeCard(word,toks,i){
    const next=toks[i+1]||'',next2=toks[i+2]||'';
    if(word==='en'&&MONTHS.includes(next))return H.card('Zeitangabe: en + Monat',`<p><b>en ${next}</b> = im ${next}. Vor Monaten steht <b>en</b> (oder <i>au mois de</i> ${next}). Monatsnamen schreibt man <b>klein</b>.</p>`);
    if(word==='en'&&SEASONS[next])return seasonsCard(next);
    if(word==='au'&&next==='printemps')return seasonsCard(next);
    if((word==='en'&&TRANSPORT_EN.has(next))||(word==='à'&&TRANSPORT_A.has(next)))return H.card('Verkehrsmittel',`<p><b>en</b> + Fahrzeug, in dem man sitzt: en voiture, en train, en bus, en avion, en métro.<br><b>à</b> + was man selbst bewegt oder worauf man sitzt: à pied, à vélo, à moto.</p>${H.table(['','Beispiele'],[['en','en voiture · en train · en bus · en avion'],['à','à pied · à vélo · à moto']],[word==='en'?0:1])}`);
    const rows=[['Stadt','<b>à</b>','à Paris, à Berlin'],['Land feminin (meist auf -e)','<b>en</b>','en France, en Allemagne'],['Land maskulin','<b>au</b>','au Japon, au Canada'],['Land im Plural','<b>aux</b>','aux États-Unis'],['bei Personen','<b>chez</b>','chez moi, chez le médecin']];
    let hl=[],why='';
    if(word==='à'){hl=[0];why='<b>à</b> + Stadt: „in“ oder „nach“ einer Stadt.';}
    if(word==='en'){hl=[1];why=`<b>en</b> + feminines Land (oder Land, das mit Vokal beginnt)${COUNTRY_F.has(next)?`: ${next} ist feminin`:''}.`;}
    if(word==='au'){hl=[2];why=`<b>au</b> (= à + le) + maskulines Land${COUNTRY_M.has(next)?`: le ${next}`:''}.`;}
    if(word==='aux'){hl=[3];why='<b>aux</b> + Land im Plural.';}
    if(word==='chez'){hl=[4];why='<b>chez</b> + Person = bei / zu jemandem: chez moi = bei mir (zu Hause).';}
    if(word==='à'&&(/^\d/.test(next)||next==='midi'||next==='minuit'||next2==='heure'||next2==='heures'))return H.card('Uhrzeit: à',`<p><b>à</b> + Uhrzeit = um: à huit heures = um acht Uhr, à midi = um zwölf Uhr mittags.</p>`);
    if(word==='à'&&['la',"l'",'le'].includes(next))return H.card('Ort: à la / à l’ / au',`<p><b>à</b> + Ort = in / an / zu: à la gare, à l’école, <b>au</b> cinéma (à + le), <b>aux</b> toilettes (à + les).</p>`);
    return H.card('Präposition: '+word,`<p>${why}</p>${H.table(['Ort','Präposition','Beispiel'],rows,hl)}<p><small>Herkunft mit <b>de</b>: je viens <b>de</b> Paris, <b>d’</b>Italie, <b>du</b> Japon, <b>des</b> États-Unis.</small></p>`);
  }
  function seasonsCard(s){
    return H.card('Jahreszeiten',`<p>${Object.values(SEASONS).map(v=>v.includes(s)?`<b>${v}</b>`:v).join(' · ')}</p><p>Vor Vokal steht <b>en</b> (en été, en automne, en hiver) – nur <b>au</b> printemps.</p>`);
  }
  const POSS=[['je','mon','ma','mes'],['tu','ton','ta','tes'],['il / elle','son','sa','ses'],['nous','notre','notre','nos'],['vous','votre','votre','vos'],['ils / elles','leur','leur','leurs']];
  function possessiveCard(word,noun){
    const r=POSS.findIndex(row=>row.slice(1).includes(word));
    const c=POSS[r].indexOf(word);
    const gender=['notre','votre','leur'].includes(word)?'Singular: maskulin oder feminin':c===1?'maskulin (oder feminin mit Vokal am Anfang)':c===2?'feminin':'Plural';
    let why=`<b>${word}</b> gehört zu <b>${POSS[r][0]}</b> und richtet sich nach dem <b>Nomen</b>${noun?` („${H.esc(noun)}“)`:''}: ${gender}.`;
    if(['mon','ton','son'].includes(word)&&noun&&vowel(noun))why+=` Vor Vokal steht immer <b>${word}</b>, auch bei femininen Wörtern: ${word} amie.`;
    return H.card('Possessivbegleiter',`<p>${why}</p>${H.grid(['Besitzer','mask.','fem.','Plural'],POSS,POSS[r].flatMap((form,i)=>i>0&&form===word?[[r,i]]:[]))}<p><small>Wichtig: <b>son / sa</b> richtet sich nach dem Besitz, nicht nach dem Besitzer – sa mère = seine <i>oder</i> ihre Mutter.</small></p>`);
  }
  function demonstrativeCard(word,noun){
    const rows=[['ce','maskulin','ce livre'],['cet','maskulin vor Vokal / h','cet hôtel, cet ami'],['cette','feminin','cette maison'],['ces','Plural','ces enfants']];
    const r=['ce','cet','cette','ces'].indexOf(word);
    return H.card('Demonstrativbegleiter (dieser/diese)',`<p><b>${word}</b>${noun?` ${H.esc(noun)}`:''}: ${rows[r][1]}.</p>${H.table(['Form','wann?','Beispiel'],rows,[r])}`);
  }
  function quelCard(word,noun){
    const rows=[['quel','maskulin Singular','Quel âge as-tu ?'],['quelle','feminin Singular','Quelle heure est-il ?'],['quels','maskulin Plural','Quels sports ?'],['quelles','feminin Plural','Quelles langues ?']];
    const r=['quel','quelle','quels','quelles'].indexOf(word);
    return H.card('Fragebegleiter quel (welcher)',`<p><b>${word}</b> passt sich dem Nomen an${noun?` – „${H.esc(noun)}“ ist ${rows[r][1]}`:`: ${rows[r][1]}`}. Alle vier Formen klingen gleich.</p>${H.table(['Form','für','Beispiel'],rows,[r])}`);
  }
  const QWORDS=[['où','wo / wohin'],['quand','wann'],['comment','wie'],['combien (de)','wie viel / wie viele'],['pourquoi','warum'],['qui','wer'],['que / qu’est-ce que','was'],['quoi','was (umgangssprachlich, am Ende)'],['d’où','woher']];
  function questionCard(text,toks){
    const hl=[];
    QWORDS.forEach(([w],i)=>{const first=w.split(' ')[0].replace('’',"'");if(toks.includes(first)||(first==="d'où"&&/\bd' où\b/.test(toks.join(' '))))hl.push(i);});
    const est=/\best ce que\b/.test(toks.join(' '));
    let body='<p>Drei Arten, eine Frage zu stellen:</p>'+H.table(['Art','Beispiel'],[['Intonation (Stimme hoch)','Tu viens ?'],['mit <b>est-ce que</b>','<b>Est-ce que</b> tu viens ?'],['Inversion (höflich/schriftlich)','Viens-<b>tu</b> ?']],est?[1]:[]);
    body+='<p><b>Est-ce que</b> macht aus jedem Aussagesatz eine Frage – die Wortstellung bleibt normal. <b>Qu’est-ce que</b> = Was …?</p>';
    if(hl.length)body+=H.table(['Fragewort','Bedeutung'],QWORDS,hl);
    return H.card('Fragen bilden',body);
  }
  function negationCard(toks){
    const s=toks.join(' ');
    const types=[['ne … pas','nicht'],['ne … plus','nicht mehr'],['ne … jamais','nie'],['ne … rien','nichts'],['ne … personne','niemand']];
    const hl=types.map(([t],i)=>s.includes(t.split(' … ')[1])?i:-1).filter(i=>i>=0);
    return H.card('Verneinung',`<p>Die Verneinung umschließt das konjugierte Verb: <b>ne</b> + Verb + <b>pas</b>. Vor Vokal wird <b>ne → n’</b> (je <b>n’</b>aime <b>pas</b>).</p>${H.table(['Form','Bedeutung'],types,hl)}<p>Bei einer verneinten Mengen- oder Existenzangabe werden <b>un, une, du, de la, des</b> meist zu <b>de / d’</b>: J’ai un chien → Je n’ai pas <b>de</b> chien. Ausnahme mit <b>être</b>: Ce n’est pas <b>un</b> chien. Bestimmte Artikel bleiben: Je n’aime pas <b>le</b> café.</p><p><small>Beim passé composé umschließt die Verneinung das Hilfsverb: je <b>n’</b>ai <b>pas</b> mangé.</small></p>`);
  }
  function passeCard(auxForm,pp,v,toks){
    const isEtre=INDEX[auxForm]?.some(x=>x.v.inf==='être');
    const auxV=VERBS[isEtre?'être':'avoir'];
    const p=INDEX[auxForm].find(x=>x.v===auxV)?.p;
    let body=`<p>Passé composé (Vergangenheit) = <b>${isEtre?'être':'avoir'}</b> im Präsens + <b>Partizip</b> (${H.esc(pp)}${v?` von ${v.inf}`:''}).</p>`;
    body+=H.table(['Person','Hilfsverb + Partizip'],auxV.forms.map((f,i)=>[P[i],(i===0&&vowel(f)?'j’':'')+f+' '+(isEtre?(v?.pp||pp)+(i>=3?'(e)s':'(e)'):pp)]),p===undefined?[]:[p]);
    body+='<p>Partizip: -er → <b>-é</b> (parlé) · -ir → <b>-i</b> (fini) · -re → <b>-u</b> (attendu) · unregelmäßig: été, eu, fait, pris, mis, dit, vu, lu, écrit, bu, pu, voulu, dû, su, connu, venu, reçu, ouvert.</p>';
    body+=isEtre?'<p>Mit <b>être</b> bilden bestimmte Verben das passé composé, z. B. <i>aller, venir, arriver, partir, rester, tomber, naître, mourir</i>, sowie reflexive Verben. Bei <i>sortir, monter, descendre, rentrer, retourner, passer</i> kann das Hilfsverb je nach Bedeutung und Satzbau wechseln: <i>Elle est sortie</i>, aber <i>Elle a sorti la poubelle</i>. Das Partizip <b>passt sich an</b>: elle est allé<b>e</b>, ils sont allé<b>s</b>, elles sont allé<b>es</b>.</p>':'<p>Die meisten Verben bilden das passé composé mit <b>avoir</b>; das Partizip bleibt dann unverändert: elle a mangé.</p>';
    return H.card('Passé composé',body);
  }
  function futurCard(form,inf){
    const p=INDEX[form].find(x=>x.v.inf==='aller')?.p;
    return H.card('Futur proche (nahe Zukunft)',`<p><b>aller</b> im Präsens + <b>Infinitiv</b> = etwas wird gleich / bald passieren: je vais <i>${H.esc(inf||'partir')}</i> = ich werde ${inf&&VERBS[inf]?.de?VERBS[inf].de.split(' / ')[0]:'…'}.</p>${verbTable(VERBS.aller,p===undefined?[]:[p])}<p><small>Verneinung: je <b>ne</b> vais <b>pas</b> partir.</small></p>`);
  }
  function modalCard(form,inf){
    const x=INDEX[form].find(e=>e.v.modal)||INDEX[form][0];
    return H.card(`${x.v.inf} + Infinitiv`,`<p>Nach <b>${x.v.inf}</b> (${x.v.de}) steht das zweite Verb im <b>Infinitiv</b>${inf?`: ${H.esc(form)} … <b>${H.esc(inf)}</b>`:''}. Genauso nach aimer, adorer, préférer, savoir, aller.</p>`);
  }
  function reflexiveCard(toks){
    const rows=[['je','me / m’','je me lève'],['tu','te / t’','tu te lèves'],['il / elle / on','se / s’','il se lève'],['nous','nous','nous nous levons'],['vous','vous','vous vous levez'],['ils / elles','se / s’','ils se lèvent']];
    const hl=[];toks.forEach((t,i)=>{if(REFL[t]){const subj=PRON[toks[i-1]];(subj||REFL[t]).forEach(p=>hl.push(p));}});
    return H.card('Reflexive Verben',`<p>Reflexive Verben (se lever, s’appeler, se laver, se promener …) haben ein Reflexivpronomen, das zur Person passt – vor Vokal mit Apostroph: je <b>m’</b>appelle.</p>${H.table(['Person','Pronomen','Beispiel'],rows,[...new Set(hl)])}`);
  }
  function stressedCard(word){
    const rows=[['je','moi'],['tu','toi'],['il','lui'],['elle','elle'],['nous','nous'],['vous','vous'],['ils','eux'],['elles','elles']];
    const r=rows.findIndex(x=>x[1]===word);
    return H.card('Betonte Pronomen',`<p><b>${word}</b> ist ein betontes Pronomen. Man benutzt es nach Präpositionen (chez <b>moi</b>, avec <b>toi</b>), in Kurzantworten (<b>Moi</b> aussi !), zur Betonung (<b>Moi</b>, je …) und nach c’est (c’est <b>lui</b>).</p>${H.table(['Subjekt','betont'],rows,r<0?[]:[r])}`);
  }
  function cestCard(isCest){
    return H.card('c’est oder il / elle est?',`<p><b>C’est</b> + Artikel/Begleiter + Nomen oder Name: <i>C’est un ami. C’est Paul. C’est ma sœur.</i><br><b>Il / Elle est</b> + Adjektiv oder Beruf <b>ohne</b> Artikel: <i>Il est médecin. Elle est sympa.</i></p>${H.table(['','Beispiel'],[['c’est + un / une / le / mon …','C’est un médecin.'],['il / elle est + Beruf / Adjektiv','Il est médecin.']],[isCest?0:1])}`);
  }
  function ilyaCard(){
    return H.card('il y a',`<p><b>Il y a</b> = es gibt / da ist / da sind – gleich für Singular und Plural: <i>Il y a une boulangerie. Il y a des cafés.</i></p><p>Verneinung: <b>il n’y a pas de</b> …: Il n’y a pas <b>de</b> métro.</p><p><small>Mit Zeitangabe bedeutet il y a „vor“: il y a deux jours = vor zwei Tagen.</small></p>`);
  }
  function quantityCard(word){
    return H.card('Mengenangabe + de',`<p>Nach Mengenangaben steht nur <b>de / d’</b> – ohne Artikel: un kilo <b>de</b> tomates, une bouteille <b>d’</b>eau, beaucoup <b>de</b> sucre, un peu <b>de</b> lait, combien <b>de</b> …?</p>${H.table(['Menge','Beispiel'],[['un kilo de','un kilo de pommes'],['un litre de','un litre de lait'],['une bouteille de','une bouteille d’eau'],['un paquet de','un paquet de pâtes'],['beaucoup de / un peu de','beaucoup de monde']],[])}`);
  }
  // [m, f, m pl, f pl, Deutsch]
  const ADJ=[['grand','grande','grands','grandes','groß'],['petit','petite','petits','petites','klein'],['joli','jolie','jolis','jolies','hübsch'],['content','contente','contents','contentes','zufrieden'],['fatigué','fatiguée','fatigués','fatiguées','müde'],['marié','mariée','mariés','mariées','verheiratet'],['prêt','prête','prêts','prêtes','bereit'],['intéressant','intéressante','intéressants','intéressantes','interessant'],['allemand','allemande','allemands','allemandes','deutsch'],['français','française','français','françaises','französisch'],['anglais','anglaise','anglais','anglaises','englisch'],['japonais','japonaise','japonais','japonaises','japanisch'],['chinois','chinoise','chinois','chinoises','chinesisch'],['espagnol','espagnole','espagnols','espagnoles','spanisch'],['américain','américaine','américains','américaines','amerikanisch'],['marocain','marocaine','marocains','marocaines','marokkanisch'],['mexicain','mexicaine','mexicains','mexicaines','mexikanisch'],['suisse','suisse','suisses','suisses','schweizerisch'],['belge','belge','belges','belges','belgisch'],['italien','italienne','italiens','italiennes','italienisch'],['canadien','canadienne','canadiens','canadiennes','kanadisch'],['brésilien','brésilienne','brésiliens','brésiliennes','brasilianisch'],['autrichien','autrichienne','autrichiens','autrichiennes','österreichisch'],['beau','belle','beaux','belles','schön'],['nouveau','nouvelle','nouveaux','nouvelles','neu'],['vieux','vieille','vieux','vieilles','alt'],['bon','bonne','bons','bonnes','gut'],['blanc','blanche','blancs','blanches','weiß'],['long','longue','longs','longues','lang'],['gros','grosse','gros','grosses','dick'],['cher','chère','chers','chères','teuer / lieb'],['premier','première','premiers','premières','erste'],['dernier','dernière','derniers','dernières','letzte'],['heureux','heureuse','heureux','heureuses','glücklich'],['sérieux','sérieuse','sérieux','sérieuses','ernst'],['sportif','sportive','sportifs','sportives','sportlich'],['gentil','gentille','gentils','gentilles','nett'],['noir','noire','noirs','noires','schwarz'],['vert','verte','verts','vertes','grün'],['bleu','bleue','bleus','bleues','blau'],['gris','grise','gris','grises','grau'],['rouge','rouge','rouges','rouges','rot'],['jaune','jaune','jaunes','jaunes','gelb'],['rose','rose','roses','roses','rosa'],['orange','orange','orange','orange','orange (unveränderlich)'],['marron','marron','marron','marron','braun (unveränderlich)'],['jeune','jeune','jeunes','jeunes','jung'],['calme','calme','calmes','calmes','ruhig'],['sympa','sympa','sympas','sympas','sympathisch'],['chaud','chaude','chauds','chaudes','warm'],['froid','froide','froids','froides','kalt'],['ouvert','ouverte','ouverts','ouvertes','offen'],['fermé','fermée','fermés','fermées','geschlossen'],['occupé','occupée','occupés','occupées','besetzt / beschäftigt'],['libre','libre','libres','libres','frei'],['malade','malade','malades','malades','krank'],
    ['étudiant','étudiante','étudiants','étudiantes','Student/in'],['boulanger','boulangère','boulangers','boulangères','Bäcker/in'],['vendeur','vendeuse','vendeurs','vendeuses','Verkäufer/in'],['serveur','serveuse','serveurs','serveuses','Kellner/in'],['acteur','actrice','acteurs','actrices','Schauspieler/in'],['infirmier','infirmière','infirmiers','infirmières','Krankenpfleger/in'],['cuisinier','cuisinière','cuisiniers','cuisinières','Koch/Köchin'],['avocat','avocate','avocats','avocates','Anwalt/Anwältin'],['employé','employée','employés','employées','Angestellte/r'],['musicien','musicienne','musiciens','musiciennes','Musiker/in'],['pharmacien','pharmacienne','pharmaciens','pharmaciennes','Apotheker/in'],['coiffeur','coiffeuse','coiffeurs','coiffeuses','Friseur/in'],['directeur','directrice','directeurs','directrices','Direktor/in'],['ami','amie','amis','amies','Freund/in'],['enchanté','enchantée','enchantés','enchantées','erfreut']];
  const ADJ_INDEX={};ADJ.forEach(row=>row.slice(0,4).forEach((f,i)=>{(ADJ_INDEX[f]=ADJ_INDEX[f]||[]).push([row,i]);}));
  function adjectiveCard(form,row,cols){
    const [m,f]=row;
    let rule;
    if(m===f)rule=`Endet schon auf <b>-e</b> (oder ist unveränderlich) → feminin gleich.`;
    else if(f===m+'e')rule=`feminin: <b>+e</b> (${m} → ${m}<span class="gx-end">e</span>)${/[dtsn]$/.test(m)?' – dadurch wird der Endkonsonant hörbar':''}.`;
    else if(m.endsWith('eux'))rule='-eux → <b>-euse</b>.';
    else if(m.endsWith('if'))rule='-if → <b>-ive</b>.';
    else if(m.endsWith('ien'))rule='-ien → <b>-ienne</b> (n verdoppelt).';
    else if(m.endsWith('er'))rule='-er → <b>-ère</b>.';
    else if(m.endsWith('teur'))rule='-teur → <b>-trice</b>.';
    else if(m.endsWith('eur'))rule='-eur → <b>-euse</b>.';
    else rule=`besondere feminine Form: ${m} → <b>${f}</b>.`;
    const which=cols.map(c=>['maskulin Singular','feminin Singular','maskulin Plural','feminin Plural'][c]).join(' / ');
    let extra=m==='beau'||m==='nouveau'||m==='vieux'?`<p><small>Vor maskulinem Nomen mit Vokal: <b>${m==='beau'?'bel':m==='nouveau'?'nouvel':'vieil'}</b> (un ${m==='beau'?'bel':m==='nouveau'?'nouvel':'vieil'} appartement).</small></p>`:'';
    return H.card(`Angleichung: ${m}`,`<p><b>${H.esc(form)}</b> = ${which}${row[4]?` (${row[4]})`:''}. Adjektive (und viele Berufe/Nationalitäten) richten sich nach Geschlecht und Zahl der Person bzw. des Nomens.</p><p>${rule} Plural: meist <b>+s</b>${m.endsWith('s')||m.endsWith('x')?` – endet schon auf -${m.slice(-1)} → bleibt gleich`:''}.</p>${H.grid(['mask. Sg.','fem. Sg.','mask. Pl.','fem. Pl.'],[row.slice(0,4)],cols.map(c=>[0,c]))}${extra}`);
  }
  const NUM='zéro un une deux trois quatre cinq six sept huit neuf dix onze douze treize quatorze quinze seize vingt trente quarante cinquante soixante cent mille'.split(' ');
  function numberCard(){
    return H.card('Zahlen',`${H.table(['Zahl','Französisch','Merkhilfe'],[['17–19','dix-sept, dix-huit, dix-neuf','10 + 7 …'],['21, 31 …','vingt <b>et</b> un, trente <b>et</b> un','traditionell mit „et“ ohne Bindestriche; auch vingt-et-un ist korrekt'],['22','vingt-deux','Bindestrich'],['70','<b>soixante-dix</b>','60 + 10'],['71','soixante <b>et</b> onze','60 + 11'],['80','<b>quatre-vingts</b>','4 × 20'],['81','quatre-vingt-un','ohne -s, ohne et'],['90','<b>quatre-vingt-dix</b>','4 × 20 + 10'],['100 / 200','cent / deux cents','']],[])}<p><small>In Belgien und der Schweiz: septante (70), nonante (90), in der Schweiz auch huitante (80).</small></p>`);
  }
  function timeCard(){
    return H.card('Uhrzeit',`<p>Frage: <b>Quelle heure est-il ?</b> – Antwort: <b>Il est</b> … heure(s). Im Singular nur bei <b>une heure</b>.</p>${H.table(['Uhr','Alltag','offiziell'],[['8:00','huit heures','huit heures'],['8:15','huit heures <b>et quart</b>','huit heures quinze'],['8:30','huit heures <b>et demie</b>','huit heures trente'],['8:45','neuf heures <b>moins le quart</b>','huit heures quarante-cinq'],['8:50','neuf heures <b>moins dix</b>','huit heures cinquante'],['12:00 / 0:00','<b>midi</b> / <b>minuit</b>','douze heures / zéro heure']],[])}<p><small>„um“ acht Uhr = <b>à</b> huit heures. Geschrieben: 8h15.</small></p>`);
  }
  function dateCard(toks){
    const day=DAYS.find(d=>toks.includes(d)),month=MONTHS.find(m=>toks.includes(m));
    let body='<p>Wochentage und Monate schreibt man <b>klein</b> und ohne Präposition für „am“: <i>Je viens lundi</i> = Ich komme (am) Montag.</p>';
    body+=H.table(['','Bedeutung'],[['lundi','(diesen) Montag'],['<b>le</b> lundi','montags / jeden Montag'],['<b>le</b> 3 mai','am 3. Mai'],['<b>le premier</b> mai','am 1. Mai (nur der 1. ist eine Ordnungszahl)'],['<b>en</b> mai / au mois de mai','im Mai']],[]);
    if(day||month)body+=`<p><small>Hier: <b>${day||month}</b>.</small></p>`;
    return H.card('Datum, Tage und Monate',body);
  }
  function elisionCard(){
    return H.card('Apostroph (Elision)',`<p>Vor Vokal oder stummem h fällt das -e bzw. -a weg: <b>je → j’</b>, <b>le/la → l’</b>, <b>de → d’</b>, <b>ne → n’</b>, <b>que → qu’</b>, <b>me/te/se → m’/t’/s’</b>, <b>ce → c’</b> (c’est).</p>`);
  }
  function vocabCard(answer){
    const list=window.A1_VOCABULARY_CONTENT||[];
    const norm=s=>String(s||'').toLowerCase().replace(/[’']/g,"'").replace(/[.!?]/g,'').trim();
    const a=norm(answer);
    const hit=list.find(e=>norm(e.fr)===a)||list.find(e=>norm(e.fr).split(' / ').includes(a));
    return hit?H.card('Wortschatz',`<p><b>${H.esc(hit.fr)}</b> = ${H.esc(hit.de)}</p>`):null;
  }
  function passageCard(ctx){
    const best=ctx.passage&&ctx.answer?H.bestSentence(ctx.passage,ctx.answer,ctx.question,'fr'):'';
    return best?H.card('Im Text steht',`<p lang="fr">„${H.esc(best)}“</p><p><small>Diese Stelle zeigt, warum <b>${H.esc(ctx.answer)}</b> richtig ist.</small></p>`):null;
  }
  function wrongNote(ctx){
    if(!ctx.chosen)return '';
    const notes=[];
    tokens(ctx.chosen).forEach(t=>{
      if(tokens(ctx.answer).includes(t))return;
      const hits=INDEX[t];
      if(hits){const h=hits[0];notes.push(`„${H.esc(t)}“ wäre ${h.v.inf}, Person: ${[...new Set(hits.filter(x=>x.v===h.v).map(x=>P[x.p]))].join(' / ')}.`);return;}
      if(ART[t])notes.push(`„${H.esc(t)}“ = ${ART[t][0]} Artikel, ${ART[t][1]}.`);
      const own=POSS.findIndex(r=>r.slice(1).includes(t));
      if(own>=0){const c=POSS[own].indexOf(t);notes.push(`„${H.esc(t)}“ = Possessiv für ${POSS[own][0]}, ${['','maskulin','feminin','Plural'][c]}${t==='notre'||t==='votre'||t==='leur'?' Singular':''}.`);}
      const adj=ADJ_INDEX[t];if(adj)notes.push(`„${H.esc(t)}“ = ${['maskulin Singular','feminin Singular','maskulin Plural','feminin Plural'][adj[0][1]]}.`);
    });
    return notes.length?`<p class="gx-wrong">Deine Wahl: ${notes.slice(0,2).join(' ')}</p>`:'';
  }

  /* ---------- main ---------- */
  let H;
  function explain(ctx,helpers){
    H=helpers;
    const answer=ctx.answer||'';
    // When a learner chooses a German translation, analysing those German
    // words as French morphology would be misleading. Explain the actual
    // French audio/source and connect it with the selected German meaning.
    if(!ctx.__sourceTranslation&&ctx.sentence&&answer&&
       (/^Was bedeutet\b/i.test(ctx.question||'')||/„[^“]+“\s*=/.test(ctx.question||''))&&
       ctx.sentence.toLowerCase().trim()!==answer.toLowerCase().trim()){
      const source=ctx.sentence;
      const sourceCards=explain({...ctx,__sourceTranslation:true,answer:source,sentence:source,question:'',chosen:''},helpers);
      return [H.card('Übersetzung und Erklärung',`<p lang="fr"><b>${H.esc(source)}</b></p><p>Das bedeutet: <b>${H.esc(answer)}</b>.</p>`),...sourceCards.slice(0,2)];
    }
    const full=ctx.sentence||((ctx.question||'').includes('___')?(ctx.question||'').replace(/^.*?:\s*(?=[^:]*___)/,'').replace(/_{3,}/,answer):answer);
    const aT=tokens(answer);
    // W is the full solution sentence when it contains the answer; offset is where the answer starts.
    let W=tokens(full),offset=-1;
    for(let k=0;k+aT.length<=W.length&&aT.length;k++)if(aT.every((t,j)=>W[k+j]===t)){offset=k;break;}
    if(offset<0){W=aT;offset=0;}
    const sT=W;
    const all=lowerText(full)+lowerText(answer);
    const cards=[],seen=new Set();
    const add=(key,c)=>{if(c&&!seen.has(key)&&cards.length<4){seen.add(key);cards.push(c);}};
    const PRE_ADJ=new Set('petit petite grand grande bon bonne beau bel belle nouveau nouvel nouvelle vieux vieil vieille joli jolie premier première dernier dernière jeune'.split(' '));
    const nounAfter=i=>{let k=i+1;while(PRE_ADJ.has(W[k]))k++;return W[k]&&!INDEX[W[k]]&&!ART[W[k]]?W[k]:'';};
    const SUBJ=new Set(['je',"j'",'tu','il','elle','on','nous','vous','ils','elles','ne',"n'"]);

    // lettered answers (A / B): compare the situation with the texts
    if(/^[A-F]$/.test(answer.trim())&&ctx.ads?.length){
      const rows=ctx.ads.map(ad=>[`<b>${H.esc(ad.label)}</b>${ad.label===answer.trim()?' ✓':''}`,H.esc(ad.text)]);
      return [H.card('Die passende Anzeige',`${ctx.situation?`<p><b>Situation:</b> ${H.esc(ctx.situation)}</p>`:''}${H.table(null,rows,ctx.ads.map((ad,i)=>ad.label===answer.trim()?i:-1).filter(i=>i>=0))}<p><small>Tipp: Suche die Schlüsselwörter der Situation (Was? Wann? Wo? Für wen?) in den Anzeigen. Oft passen beide Anzeigen zum Thema – entscheidend ist ein Detail wie Tag, Uhrzeit oder Angebot.</small></p>`)];
    }
    // comprehension tasks: the quoted text passage is the real reason, so it comes first
    const yesNo=/^(richtig|falsch|vrai|faux|true|false|ja|nein|oui|non)\.?$/i.test(answer.trim());
    // no single sentence found (e.g. question in another language): show the whole text instead
    if(ctx.comprehension)add('passage',passageCard(ctx)||(ctx.passage?H.card('Der ganze Text',`<p lang="fr">${H.esc(ctx.passage.slice(0,900))}${ctx.passage.length>900?' …':''}</p><p><small>Die Antwort <b>${H.esc(answer)}</b> ergibt sich aus diesem Text – lies bzw. hör ihn noch einmal genau.</small></p>`):null));
    if(yesNo)return [H.card('💡',`<p>Die Aussage „${H.esc(ctx.question||'')}“ ist <b>${H.esc(answer)}</b>. Vergleiche sie genau mit dem Text bzw. Hörtext – meist unterscheidet sich nur ein Detail: Zahl, Uhrzeit, Ort, Person oder Tag.</p>`),...cards];
    // 1. verbs in the answer
    aT.forEach((t,ai)=>{
      const i=offset+ai,hits=INDEX[t];
      // participle after auxiliary → passé composé (not: je suis fatigué = adjective)
      if(hits&&(hits[0].v.inf==='avoir'||hits[0].v.inf==='être')){
        const after=W.slice(i+1,i+4).filter(x=>!['pas','ne',"n'",'jamais','plus','rien','bien','déjà','toujours'].includes(x));
        const pp=after.find(x=>PARTICIPLES[x]);
        if(pp&&!(hits[0].v.inf==='être'&&ADJ_INDEX[pp]))add('pc',passeCard(t,pp,PARTICIPLES[pp],W));
      }
      if(hits&&hits.some(h=>h.v.inf==='aller')){const inf=W.slice(i+1,i+3).find(x=>INFINITIVES.has(x));if(inf)add('futur',futurCard(t,inf));}
      if(hits&&hits.some(h=>h.v.modal)){const inf=W.slice(i+1,i+3).find(x=>INFINITIVES.has(x)||/(er|ir|re)$/.test(x)&&x.length>3);if(inf)add('modal',modalCard(t,inf));}
      if(hits){
        const v=hits[0].v,same=hits.filter(h=>h.v===v).map(h=>h.p);
        let rows=personFromContext(i,W);
        if(rows)rows=rows.filter(r=>same.includes(r));
        if(!rows||!rows.length)rows=same;
        add('verb:'+v.inf,verbCard(v,t,rows,all));
      }
      const pc=PARTICIPLES[t];
      if(pc&&!hits&&!ADJ_INDEX[t]){const aux=W.slice(Math.max(0,i-3),i).reverse().find(x=>INDEX[x]?.some(h=>h.v.inf==='avoir'||h.v.inf==='être'));if(aux)add('pc',passeCard(aux,t,pc,W));}
      if(INFINITIVES.has(t)&&!hits){
        const before=W[i-1];
        if(before&&INDEX[before]?.some(h=>h.v.inf==='aller'))add('futur',futurCard(before,t));
        else if(before&&INDEX[before]?.some(h=>h.v.modal))add('modal',modalCard(before,t));
        else if(!seen.has('modal')&&!seen.has('futur'))add('inf',H.card('Infinitiv',`<p><b>${t}</b> steht im <b>Infinitiv</b> (Grundform), weil davor ein konjugiertes Verb wie aller, pouvoir, vouloir, devoir, aimer oder préférer steht – oder eine Präposition (pour, de, à).</p>`));
      }
    });
    // A pronoun as answer ("Welche Person passt zu « t’appelles »?") → conjugation of the verb in the question.
    if(aT.length&&aT.every(t=>PRON[t])&&!cards.length){
      const qT=tokens(ctx.question);
      const form=qT.find(t=>INDEX[t]);
      if(form){const v=INDEX[form][0].v;add('verb:'+v.inf,verbCard(v,form,PRON[aT[0]].filter(p=>INDEX[form].some(h=>h.v===v&&h.p===p)),all));}
    }
    // 2. small words in the answer
    aT.forEach((t,ai)=>{
      const i=offset+ai;
      if(t==='de'&&aT[ai+1]==='la')add('art',articleCard('de la',nounAfter(i+1),sT,i));
      else if(t==='de'&&aT[ai+1]==="l'")add('art',articleCard("de l'",nounAfter(i+1),sT,i));
      else if(['le','la',"l'",'les','un','une'].includes(t)&&!['quart','demie'].includes(W[i+1])){
        const next=sT[i+1];
        if(next&&INDEX[next]&&!['un','une'].includes(t)&&SUBJ.has(sT[i-1]))add('obj',H.card('Objektpronomen',`<p>Hier ist <b>${t.replace("'",'’')}</b> kein Artikel, sondern ein <b>Objektpronomen</b> vor dem Verb: le = ihn/es, la = sie, les = sie (Plural), l’ vor Vokal.</p>`));
        else add('art',articleCard(t,nounAfter(i),sT,i));
      }
      else if(t==='des'||t==='du'){
        const prev=sT[i-1]||'';
        if(/^(viens|vient|venons|venez|viennent|venu|loin|près|côté|face|sors|sort|part|pars)$/.test(prev)||COUNTRY_M.has(sT[i+1])||COUNTRY_PL.has(sT[i+1]))add('contr',contractionCard(t,sT,i));
        else add('art',articleCard(t,nounAfter(i),sT,i));
      }
      else if(t==='au'||t==='aux'){if(COUNTRY_M.has(sT[i+1])||COUNTRY_PL.has(sT[i+1])||sT[i+1]==='printemps')add('place',placeCard(t,sT,i));else add('contr',contractionCard(t,sT,i));}
      else if(['à','en','chez'].includes(t))add('place:'+t,placeCard(t,sT,i));
      else if(t==='de'||t==="d'"){
        const prev=sT[i-1]||'';
        if(/^(kilo|kilos|litre|litres|bouteille|bouteilles|paquet|paquets|boîte|boîtes|tranche|tranches|morceau|beaucoup|peu|trop|assez|combien|tasse|verre|pot|plaque|douzaine|gramme|grammes|livre)$/.test(prev))add('qty',quantityCard(t));
        else if(/\b(pas|plus|jamais)\b/.test(sT.slice(Math.max(0,i-3),i).join(' ')))add('neg',negationCard(sT));
        else if(/^(viens|vient|venons|venez|viennent|venu|venue|originaire|arrive|arrivent|sors|sort|part|pars)$/.test(prev))add('origin',H.card('Herkunft: de / d’',`<p><b>venir de</b> + Ort = kommen aus: je viens <b>de</b> Paris, <b>d’</b>Italie (vor Vokal), <b>du</b> Japon (de + le), <b>des</b> États-Unis (de + les).</p>`));
        else add('de',H.card('Präposition de',`<p><b>de / d’</b> bedeutet „von / aus“ oder zeigt Zugehörigkeit (le livre <b>de</b> Paul = Pauls Buch). Nach Mengen (un kilo <b>de</b>) und nach Verneinung (pas <b>de</b>) ersetzt es den Artikel.</p>`));
      }
      else if(POSS.some(r=>r.slice(1).includes(t)))add('poss',possessiveCard(t,nounAfter(i)));
      else if(['ce','cet','cette','ces'].includes(t)&&sT[i+1]!=='que'&&sT[i+1]!=='qui')add('dem',demonstrativeCard(t,nounAfter(i)));
      else if(['quel','quelle','quels','quelles'].includes(t))add('quel',quelCard(t,['est','sont'].includes(W[i+1])?nounAfter(i+2):nounAfter(i)));
      else if(['moi','toi','lui','eux'].includes(t))add('stressed',stressedCard(t));
      else if(REFL[t]&&sT[i+1]&&(INDEX[sT[i+1]]||INFINITIVES.has(sT[i+1])))add('refl',reflexiveCard(sT));
      else if(ADJ_INDEX[t]&&!INDEX[t]){const [row]=ADJ_INDEX[t][0];add('adj:'+row[0],adjectiveCard(t,row,ADJ_INDEX[t].filter(x=>x[0]===row).map(x=>x[1])));}
    });
    // 3. sentence patterns
    const s=' '+aT.join(' ')+' ',sf=' '+sT.join(' ')+' ';
    if(/\b(ne|n') .*\b(pas|plus|jamais|rien|personne)\b/.test(s)||(/\b(pas|jamais|plus|rien)\b/.test(s)&&/\b(ne|n')\b/.test(sf)))add('neg',negationCard(sT.length?sT:aT));
    if(/\best ce que\b/.test(s)||/\?\s*$/.test(answer)&&aT.some(t=>QWORDS.some(([w])=>w.split(' ')[0]===t)))add('q',questionCard(answer,aT));
    else if(aT.some(t=>['où','quand','comment','combien','pourquoi','qui','quoi'].includes(t))&&aT.length<=3)add('q',questionCard(answer,aT));
    if(/\bc' est\b|\bce sont\b/.test(s)&&/\b(un|une|le|la|mon|ma|ton|ta|son|sa)\b/.test(s))add('cest',cestCard(true));
    if(/\b(il|elle) est\b/.test(s)&&aT.some(t=>ADJ_INDEX[t]&&ADJ.indexOf(ADJ_INDEX[t][0][0])>=ADJ.findIndex(r=>r[0]==='étudiant')))add('cest',cestCard(false));
    if(/\bil y a\b|\by a\b/.test(s)||(aT.includes('y')&&/\bil y\b/.test(sf)))add('ilya',ilyaCard());
    if(/\b(heure|heures|midi|minuit|quart|demie)\b/.test(s+sf)||/\d{1,2}\s?h\s?\d{0,2}/.test(answer))add('time',timeCard());
    if(aT.some(t=>DAYS.includes(t)||MONTHS.includes(t)))add('date',dateCard(aT));
    if(aT.some(t=>SEASONS[t]))add('season',seasonsCard(aT.find(t=>SEASONS[t])));
    if(aT.some(t=>['soixante','quatre','vingt','vingts','septante','nonante','cent','mille','trente','quarante','cinquante','seize','quinze','quatorze','treize','douze','onze'].includes(t))||/\b(1[7-9]|[2-9]\d)\b/.test(answer))add('num',numberCard());
    if(cards.length<2&&/\b[jlmtsdnc]'|\bqu'/.test(aT.join(' ')))add('elision',elisionCard());
    if(!cards.length)add('vocab',vocabCard(answer));
    // the complete solution sentence, with the answer marked
    if(full&&answer&&full!==answer&&full.toLowerCase().includes(answer.toLowerCase())){
      const at=full.toLowerCase().indexOf(answer.toLowerCase());
      cards.push(H.card('Ganzer Satz',`<p lang="fr">${H.esc(full.slice(0,at))}<span class="gx-mark">${H.esc(full.slice(at,at+answer.length))}</span>${H.esc(full.slice(at+answer.length))}</p>`));
    }
    const wrong=wrongNote(ctx);
    if(wrong&&cards.length)cards[0]={...cards[0],body:wrong+cards[0].body};
    return cards;
  }
  window.A1Explain.register('fr',{explain,tokens,VERBS,INDEX});
})();
