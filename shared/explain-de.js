/* German A1 grammar explanations (written in French) for the 💡 answer button. */
(() => {
  'use strict';
  if(!window.A1Explain)return;
  let H;
  const P=['ich','du','er / sie / es','wir','ihr','sie / Sie'];
  const PRON={ich:[0],du:[1],er:[2],es:[2],man:[2],wir:[3],ihr:[4],sie:[2,5]};

  /* ---------- verbs ---------- */
  const IRR={
    sein:{fr:'être',f:'bin bist ist sind seid sind',pp:'gewesen',aux:'sein',note:'<b>sein</b> est complètement irrégulier – à apprendre par cœur.'},
    haben:{fr:'avoir',f:'habe hast hat haben habt haben',pp:'gehabt',note:'<b>haben</b> perd le <b>b</b> avec du et er/sie/es : du ha<b>st</b>, er ha<b>t</b>.'},
    werden:{fr:'devenir',f:'werde wirst wird werden werdet werden',pp:'geworden',aux:'sein',note:'<b>werden</b> est irrégulier : du wirst, er wird.'},
    wissen:{fr:'savoir',f:'weiß weißt weiß wissen wisst wissen',pp:'gewusst',note:'<b>wissen</b> se conjugue comme un verbe de modalité : ich weiß, er weiß (sans -t).'},
    können:{fr:'pouvoir / savoir faire',f:'kann kannst kann können könnt können',pp:'gekonnt',modal:1},
    müssen:{fr:'devoir (obligation)',f:'muss musst muss müssen müsst müssen',pp:'gemusst',modal:1},
    wollen:{fr:'vouloir',f:'will willst will wollen wollt wollen',pp:'gewollt',modal:1},
    dürfen:{fr:'avoir le droit de',f:'darf darfst darf dürfen dürft dürfen',pp:'gedurft',modal:1},
    sollen:{fr:'devoir (conseil, consigne)',f:'soll sollst soll sollen sollt sollen',pp:'gesollt',modal:1},
    mögen:{fr:'aimer bien',f:'mag magst mag mögen mögt mögen',pp:'gemocht',modal:1},
    möchten:{fr:'voudrais (forme polie)',f:'möchte möchtest möchte möchten möchtet möchten',modal:1},
    fahren:{fr:'aller (en véhicule) / conduire',f:'fahre fährst fährt fahren fahrt fahren',pp:'gefahren',aux:'sein',vow:'a → ä'},
    schlafen:{fr:'dormir',f:'schlafe schläfst schläft schlafen schlaft schlafen',pp:'geschlafen',vow:'a → ä'},
    tragen:{fr:'porter',f:'trage trägst trägt tragen tragt tragen',pp:'getragen',vow:'a → ä'},
    waschen:{fr:'laver',f:'wasche wäschst wäscht waschen wascht waschen',pp:'gewaschen',vow:'a → ä'},
    laufen:{fr:'courir / marcher',f:'laufe läufst läuft laufen lauft laufen',pp:'gelaufen',aux:'sein',vow:'au → äu'},
    gefallen:{fr:'plaire',f:'gefalle gefällst gefällt gefallen gefallt gefallen',pp:'gefallen',vow:'a → ä'},
    halten:{fr:'tenir / s’arrêter',f:'halte hältst hält halten haltet halten',pp:'gehalten',vow:'a → ä'},
    essen:{fr:'manger',f:'esse isst isst essen esst essen',pp:'gegessen',vow:'e → i'},
    sprechen:{fr:'parler',f:'spreche sprichst spricht sprechen sprecht sprechen',pp:'gesprochen',vow:'e → i'},
    helfen:{fr:'aider',f:'helfe hilfst hilft helfen helft helfen',pp:'geholfen',vow:'e → i'},
    nehmen:{fr:'prendre',f:'nehme nimmst nimmt nehmen nehmt nehmen',pp:'genommen',vow:'e → i'},
    geben:{fr:'donner',f:'gebe gibst gibt geben gebt geben',pp:'gegeben',vow:'e → i'},
    treffen:{fr:'rencontrer',f:'treffe triffst trifft treffen trefft treffen',pp:'getroffen',vow:'e → i'},
    vergessen:{fr:'oublier',f:'vergesse vergisst vergisst vergessen vergesst vergessen',pp:'vergessen',vow:'e → i'},
    werfen:{fr:'jeter',f:'werfe wirfst wirft werfen werft werfen',pp:'geworfen',vow:'e → i'},
    lesen:{fr:'lire',f:'lese liest liest lesen lest lesen',pp:'gelesen',vow:'e → ie'},
    sehen:{fr:'voir',f:'sehe siehst sieht sehen seht sehen',pp:'gesehen',vow:'e → ie'},
    empfehlen:{fr:'recommander',f:'empfehle empfiehlst empfiehlt empfehlen empfehlt empfehlen',pp:'empfohlen',vow:'e → ie'}
  };
  const REG='wohnen kommen machen lernen spielen kaufen gehen trinken kochen hören brauchen suchen bezahlen bestellen besuchen fragen schreiben bleiben verstehen liegen stehen schwimmen singen rufen sagen zeigen leben lieben studieren telefonieren fotografieren glauben zahlen gehören packen parken schmecken schicken legen stellen holen malen lachen weinen denken bringen kennen nennen ziehen fliegen gewinnen beginnen duschen wünschen kosten arbeiten warten antworten finden öffnen rechnen heiraten heißen tanzen sitzen reisen putzen grüßen informieren buchstabieren gratulieren danken mieten suchen reservieren probieren dauern wandern feiern ändern lächeln sammeln'.split(' ');
  const FR_MEANING={wohnen:'habiter',kommen:'venir',machen:'faire',lernen:'apprendre',spielen:'jouer',kaufen:'acheter',gehen:'aller (à pied)',trinken:'boire',kochen:'cuisiner',hören:'entendre / écouter',brauchen:'avoir besoin de',suchen:'chercher',bezahlen:'payer',bestellen:'commander',besuchen:'rendre visite / visiter',fragen:'demander',schreiben:'écrire',bleiben:'rester',verstehen:'comprendre',liegen:'être couché / se trouver',stehen:'être debout / se trouver',schwimmen:'nager',singen:'chanter',sagen:'dire',zeigen:'montrer',leben:'vivre',lieben:'aimer',studieren:'étudier',telefonieren:'téléphoner',kosten:'coûter',arbeiten:'travailler',warten:'attendre',antworten:'répondre',finden:'trouver',öffnen:'ouvrir',heißen:"s'appeler",tanzen:'danser',sitzen:'être assis',reisen:'voyager',danken:'remercier',mieten:'louer',denken:'penser',bringen:'apporter',kennen:'connaître',fliegen:'prendre l’avion',beginnen:'commencer',zahlen:'payer',schmecken:'avoir bon goût',gehören:'appartenir'};
  // separable verbs: prefix + base verb
  const SEP='auf:stehen an:rufen ein:kaufen an:kommen ab:fahren mit:kommen auf:räumen aus:gehen zu:machen auf:machen mit:bringen ab:holen an:ziehen aus:ziehen um:ziehen zurück:kommen ein:steigen aus:steigen um:steigen mit:nehmen aus:sehen an:fangen ein:laden fern:sehen vor:stellen statt:finden zu:hören auf:hören an:machen aus:machen aus:füllen an:melden ab:geben auf:wachen ein:schlafen mit:machen los:gehen weg:gehen spazieren:gehen kennen:lernen ab:biegen zurück:rufen an:sehen vor:haben ab:sagen'.split(' ').map(x=>x.split(':'));
  const SEP_FR={'aufstehen':'se lever','anrufen':'appeler (téléphone)','einkaufen':'faire les courses','ankommen':'arriver','abfahren':'partir (véhicule)','mitkommen':'venir avec','aufräumen':'ranger','ausgehen':'sortir','zumachen':'fermer','aufmachen':'ouvrir','mitbringen':'apporter','abholen':'aller chercher','anziehen':"s'habiller",'umziehen':'déménager','einsteigen':'monter (dans un véhicule)','aussteigen':'descendre','umsteigen':'changer (de train)','mitnehmen':'emporter','aussehen':'avoir l’air','anfangen':'commencer','einladen':'inviter','fernsehen':'regarder la télé','vorstellen':'présenter','zuhören':'écouter','aufhören':'arrêter','ausfüllen':'remplir','anmelden':'inscrire','abbiegen':'tourner','vorhaben':'prévoir','absagen':'annuler','kennenlernen':'faire la connaissance','einschlafen':"s'endormir",'aufwachen':'se réveiller','stattfinden':'avoir lieu'};
  const VERBS={};
  Object.entries(IRR).forEach(([inf,v])=>VERBS[inf]={inf,...v,type:v.modal?'modal':'irr',forms:v.f.split(' ')});
  function regular(inf){
    const stem=inf.endsWith('ern')||inf.endsWith('eln')?inf.slice(0,-1):inf.slice(0,-2);
    const e=/(t|d|chn|ffn|gn|dm|tm)$/.test(stem)?'e':'';
    const sz=/(s|ß|z|x)$/.test(stem);
    const wirEnd=inf.endsWith('ern')||inf.endsWith('eln')?'n':'en';
    const forms=[stem+'e',stem+(sz?'t':e+'st'),stem+e+'t',stem+wirEnd,stem+e+'t',stem+wirEnd];
    if(inf.endsWith('eln'))forms[0]=stem.slice(0,-2)+'le';
    return {inf,fr:FR_MEANING[inf]||'',type:'reg',stem,forms,e,sz};
  }
  REG.forEach(inf=>{if(!VERBS[inf])VERBS[inf]=regular(inf);});
  SEP.forEach(([pre,base])=>{if(!VERBS[base])VERBS[base]=regular(base);});
  const INDEX={};
  Object.values(VERBS).forEach(v=>v.forms.forEach((f,p)=>(INDEX[f]=INDEX[f]||[]).push({v,p})));
  const PREFIXES=new Set(SEP.map(x=>x[0]));
  const SEP_BY={};SEP.forEach(([pre,base])=>(SEP_BY[base]=SEP_BY[base]||[]).push(pre));
  const SEIN_PP=new Set('gegangen gekommen gefahren geflogen gelaufen geblieben gewesen geworden aufgestanden angekommen abgefahren umgezogen eingestiegen ausgestiegen umgestiegen geschwommen gereist gewandert passiert eingeschlafen aufgewacht mitgekommen zurückgekommen ausgegangen gestorben geboren losgegangen weggegangen spazieren gegangen'.split(' '));
  const PP_IRR={gegangen:'gehen',gekommen:'kommen',gefahren:'fahren',geflogen:'fliegen',gelaufen:'laufen',geblieben:'bleiben',gewesen:'sein',geworden:'werden',gegessen:'essen',getrunken:'trinken',gelesen:'lesen',gesehen:'sehen',geschrieben:'schreiben',gesprochen:'sprechen',genommen:'nehmen',gegeben:'geben',getroffen:'treffen',geschlafen:'schlafen',gefunden:'finden',geholfen:'helfen',gestanden:'stehen',gelegen:'liegen',gesessen:'sitzen',geschwommen:'schwimmen',gesungen:'singen',gerufen:'rufen',gewusst:'wissen',gebracht:'bringen',gedacht:'denken',gekannt:'kennen',verstanden:'verstehen',vergessen:'vergessen',begonnen:'beginnen',gewaschen:'waschen',getragen:'tragen',geheißen:'heißen',gezogen:'ziehen',angerufen:'anrufen',aufgestanden:'aufstehen',eingeladen:'einladen',ferngesehen:'fernsehen',angefangen:'anfangen',mitgenommen:'mitnehmen',mitgebracht:'mitbringen',angekommen:'ankommen',abgefahren:'abfahren',umgezogen:'umziehen',eingestiegen:'einsteigen',ausgestiegen:'aussteigen',umgestiegen:'umsteigen',eingekauft:'einkaufen',aufgeräumt:'aufräumen',gehabt:'haben',empfohlen:'empfehlen',bekommen:'bekommen'};
  function participle(w){
    if(PP_IRR[w])return {inf:PP_IRR[w],strong:!/t$/.test(w)};
    if(/^ge[a-zäöüß]{2,}(t|et)$/.test(w))return {inf:w.replace(/^ge/,'').replace(/e?t$/,'en'),strong:false};
    if(/^[a-zäöüß]+iert$/.test(w))return {inf:w.replace(/t$/,'en'),strong:false};
    for(const pre of PREFIXES)if(w.startsWith(pre+'ge')&&/(t|en)$/.test(w))return {inf:pre+w.slice(pre.length+2).replace(/e?t$/,'en'),strong:/en$/.test(w)};
    if(/^(be|ver|er|ent|emp|zer)[a-zäöüß]+t$/.test(w))return {inf:w.replace(/e?t$/,'en'),strong:false};
    return null;
  }

  /* ---------- articles and cases ---------- */
  const CASES=['Nominatif','Accusatif','Datif'];
  const DEF=[['der','die','das','die'],['den','die','das','die'],['dem','der','dem','den (+n)']];
  const INDEF=[['ein','eine','ein','—'],['einen','eine','ein','—'],['einem','einer','einem','—']];
  const KEIN=[['kein','keine','kein','keine'],['keinen','keine','kein','keine'],['keinem','keiner','keinem','keinen']];
  const GENDERS=['masculin','féminin','neutre','pluriel'];
  function findArticle(word,table){const hits=[];table.forEach((row,r)=>row.forEach((f,c)=>{if(f.split(' ')[0]===word)hits.push([r,c]);}));return hits;}
  const POSS_STEMS={mein:'ich',dein:'du',sein:'er / es',ihr:'sie / ils',unser:'wir',euer:'ihr',eur:'ihr',Ihr:'Sie'};
  function possStem(w){
    for(const s of ['unser','euer','eur','mein','dein','sein','ihr']){
      if(w.toLowerCase().startsWith(s)){const end=w.slice(s.length);if(['','e','en','em','er','es'].includes(end))return {stem:s==='eur'?'euer':s,end};}
    }
    return null;
  }
  const DAT_PREP=new Set(['mit','nach','bei','von','zu','aus','seit','gegenüber','ab','vom','zum','zur','beim']);
  const AKK_PREP=new Set(['für','ohne','durch','gegen','um','bis']);
  const TWO_WAY=new Set(['in','an','auf','über','unter','vor','hinter','neben','zwischen','im','am','ins','ans']);
  const DAT_VERBS=/^(helfe|hilfst|hilft|helfen|helft|gefällt|gefallen|gefalle|gehört|gehören|danke|dankt|danken|antworte|antwortet|antworten|schmeckt|schmecken|passt|passen|gratuliere|gratulieren|tut)$/;
  const MOTION=/^(gehe|gehst|geht|gehen|fahre|fährst|fährt|fahren|fahrt|komme|kommst|kommt|kommen|laufe|läufst|läuft|laufen|fliege|fliegst|fliegt|fliegen|lege|legst|legt|legen|stelle|stellst|stellt|stellen|bringe|bringst|bringt|bringen|setze|setzt|setzen|hänge|hängt|reise|reist|reisen|ziehe|zieht|ziehen)$/;
  const SUFFIX=[[/(ung|heit|keit|schaft|ion|tät|ei|ie|ik|ur)$/,'féminin','die','les suffixes -ung, -heit, -keit, -schaft, -tät, -ei, -ie et -ik indiquent généralement le féminin ; -ion est souvent féminin, notamment -tion (die Information), mais das Stadion fait exception'],[/(chen|lein)$/,'neutre','das','les diminutifs en -chen et -lein sont toujours neutres (das Mädchen, das Brötchen)'],[/(ment|um)$/,'neutre','das','les mots en -ment et -um sont généralement neutres (das Dokument, das Museum)'],[/(ling|ismus|or)$/,'masculin','der','les noms en -ling et -ismus sont généralement masculins ; beaucoup de noms en -or le sont également, mais il existe des exceptions (das Labor)'],[/^(montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag|januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember|frühling|sommer|herbst|winter|morgen|vormittag|mittag|nachmittag|abend)$/,'masculin','der','les jours, les mois, les saisons et les moments de la journée sont masculins (der Montag, der Mai, der Sommer, der Abend) – sauf die Nacht']];
  function genderRule(noun){
    const n=String(noun||'').toLowerCase();if(!n)return '';
    const hit=SUFFIX.find(([re])=>re.test(n));
    return hit?`<p><small>Astuce : ${hit[3]}.</small></p>`:'';
  }
  function caseReason(W,i,form){
    const prev=W[i-1]||'',low=prev.toLowerCase();
    if(DAT_PREP.has(low))return {c:2,why:`Après <b>${prev}</b>, on met toujours le <b>datif</b> (mit, nach, bei, von, zu, aus, seit, gegenüber).`};
    if(AKK_PREP.has(low))return {c:1,why:`Après <b>${prev}</b>, on met toujours l’<b>accusatif</b> (für, ohne, durch, gegen, um).`};
    if(TWO_WAY.has(low))return null;// decided in articleCard from the form (Wo? / Wohin?)
    const verb=W.slice(0,i).reverse().find(w=>INDEX[w.toLowerCase()]||INDEX[w]);
    if(verb&&DAT_VERBS.test(verb.toLowerCase()))return {c:2,why:`Le verbe <b>${verb}</b> se construit avec le <b>datif</b> (comme helfen, gefallen, gehören, danken, antworten, schmecken).`};
    if(i===0||(verb&&/^(ist|sind|bin|bist|seid|heißt|heiße|heißen|wird|werden)$/.test(verb.toLowerCase())&&W.slice(0,i).length<=3))return {c:0,why:'C’est le <b>sujet</b> (ou un attribut après <i>sein / heißen / werden</i>) → <b>nominatif</b>.'};
    if(W.slice(Math.max(0,i-2),i).join(' ').toLowerCase()==='es gibt')return {c:1,why:'Après <b>es gibt</b>, on met toujours l’<b>accusatif</b> : es gibt <b>einen</b> Park.'};
    // Without syntactic dependency information we cannot safely label every noun after a verb
    // as an accusative direct object; e.g. Ich gebe dem Mann ein Buch.
    // An unambiguous article form can still be explained via CASE_HINT.
    if(verb)return null;
    return null;
  }
  // Never show a reason that contradicts the (correct) form: fall back to the general meaning of the case.
  const CASE_HINT=['Le <b>nominatif</b> répond à <b>Wer? / Was?</b> : c’est le sujet.','L’<b>accusatif</b> répond à <b>Wen? / Was?</b> : complément d’objet direct, après für, ohne, durch, gegen, um et après es gibt.','Le <b>datif</b> répond à <b>Wem?</b> (à qui ?) : après mit, nach, bei, von, zu, aus, seit et après des verbes comme helfen, gefallen, gehören, danken, geben (+ personne).'];
  function fitReason(reason,cases){
    if(reason&&cases.includes(reason.c))return reason;
    return cases.length===1?{c:cases[0],why:CASE_HINT[cases[0]]}:null;
  }
  function articleCard(word,W,i,table,label){
    const hits=findArticle(word.toLowerCase(),table);
    const noun=W.slice(i+1,i+4).find(w=>/^[A-ZÄÖÜ]/.test(w))||'';
    let reason=fitReason(caseReason(W,i,word),[...new Set(hits.map(([r])=>r))]);
    const prev=(W[i-1]||'').toLowerCase();
    let twoWay='';
    if(TWO_WAY.has(prev)){
      const datForm=hits.some(([r])=>r===2),akkForm=hits.some(([r])=>r===1);
      twoWay=`<p><b>${W[i-1]}</b> est une préposition mixte : <b>Wo?</b> (lieu où se déroule l’action, même avec mouvement) → <b>datif</b> · <b>Wohin?</b> (destination ou changement de lieu) → <b>accusatif</b>.</p>`;
      reason=datForm&&!akkForm?{c:2,why:'Cette forme indique ici le datif (Wo?).'}:akkForm&&!datForm?{c:1,why:'Cette forme indique ici l’accusatif (Wohin?).'}:null;
    }
    let cells=hits;
    if(reason)cells=hits.filter(([r])=>r===reason.c);
    if(!cells.length)cells=hits;
    // "die" can be feminine or plural: prefer singular unless the sentence is clearly plural
    if(cells.some(([,c])=>c===3)&&cells.some(([,c])=>c!==3)&&!/\b(sind|haben|gibt es viele)\b/i.test(W.join(' ')))cells=cells.filter(([,c])=>c!==3);
    const g=[...new Set(cells.map(([,c])=>GENDERS[c]))];
    let body=`<p><b>${H.esc(word)}</b>${noun?` ${H.esc(noun)}`:''} : ${cells.map(([r,c])=>`${CASES[r].toLowerCase()} ${GENDERS[c]}`).join(' ou ')}.${noun&&g.length===1&&g[0]!=='pluriel'?` <b>${H.esc(noun)}</b> est ${g[0]}.`:''}</p>`;
    if(reason?.why)body+=`<p>${reason.why}</p>`;
    body+=twoWay;
    body+=H.grid(['',...GENDERS],table.map((row,r)=>[CASES[r],...row]),cells.map(([r,c])=>[r,c+1]));
    if(table!==DEF)body+='<p><small>Seul le <b>masculin</b> change entre nominatif et accusatif (ein → ein<b>en</b>, der → de<b>n</b>). Au pluriel, « ein » n’existe pas.</small></p>';
    else body+='<p><small>Au datif pluriel, le nom prend un <b>-n</b> : mit den Kinder<b>n</b>.</small></p>';
    body+=genderRule(noun);
    return H.card(label,body);
  }
  function possessiveCard(word,W,i){
    const {stem,end}=possStem(word);
    const ends=[['–','e','–','e'],['en','e','–','e'],['em','er','em','en']];
    const hits=[];ends.forEach((row,r)=>row.forEach((e,c)=>{if((e==='–'?'':e)===end)hits.push([r,c]);}));
    const reason=fitReason(caseReason(W,i,word),[...new Set(hits.map(([r])=>r))]);
    let cells=reason?hits.filter(([r])=>r===reason.c):hits;if(!cells.length)cells=hits;
    const owner=word[0]==='I'&&stem==='ihr'?'Sie (politesse)':POSS_STEMS[stem];
    let body=`<p><b>${H.esc(word)}</b> = possessif de <b>${owner}</b> (${{mein:'mon/ma',dein:'ton/ta',sein:'son/sa (à lui)',ihr:word[0]==='I'?'votre':'son/sa (à elle) ou leur',unser:'notre',euer:'votre (ihr)'}[stem]}). La terminaison suit l’<b>article indéfini</b> (ein / eine / einen …).</p>`;
    if(reason?.why)body+=`<p>${reason.why}</p>`;
    body+=H.grid(['',...GENDERS],ends.map((row,r)=>[CASES[r],...row.map(e=>(stem==='euer'&&e!=='–'?'eur':stem)+(e==='–'?'':'<span class="gx-end">'+e+'</span>'))]),cells.map(([r,c])=>[r,c+1]));
    if(stem==='euer')body+='<p><small>euer + terminaison perd le e : eu<b>re</b> Wohnung.</small></p>';
    return H.card('Possessif',body);
  }
  const PERS=[['ich','mich','mir'],['du','dich','dir'],['er','ihn','ihm'],['sie','sie','ihr'],['es','es','ihm'],['wir','uns','uns'],['ihr','euch','euch'],['sie','sie','ihnen'],['Sie','Sie','Ihnen']];
  function pronounCard(word,W,i){
    const cells=[];PERS.forEach((row,r)=>row.forEach((f,c)=>{if(f===word||(f.toLowerCase()===word.toLowerCase()&&word!=='Sie'&&word!=='Ihnen'))cells.push([r,c]);}));
    const reason=fitReason(caseReason(W,i,word),[...new Set(cells.map(([,c])=>c))]);
    let use=cells;if(reason&&cells.some(([,c])=>c===reason.c))use=cells.filter(([,c])=>c===reason.c);
    let body=`<p><b>${H.esc(word)}</b> : pronom personnel au ${[...new Set(use.map(([,c])=>CASES[c].toLowerCase()))].join(' / ')}.</p>`;
    if(reason?.why)body+=`<p>${reason.why}</p>`;
    body+=H.grid(['Nominatif','Accusatif','Datif'],PERS,use);
    return H.card('Pronoms personnels',body);
  }

  function verbCard(v,form,rows,W,i){
    let body=`<p><b>${H.esc(form)}</b> = <b>${v.inf}</b>${v.fr?` (${v.fr})`:''}, personne : <b>${rows.map(r=>P[r]).join(' ou ')}</b>.</p>`;
    if(v.type==='reg'){
      body+=`<p>Verbe <b>régulier</b> : radical <b>${v.stem}-</b> + terminaisons <span class="gx-end">-e, -${v.sz?'t':v.e+'st'}, -${v.e}t, -en, -${v.e}t, -en</span>.</p>`;
      if(v.e)body+=`<p>Le radical se termine par <b>-${v.stem.slice(-1)}</b> → on ajoute un <b>e</b> pour pouvoir prononcer : du ${v.stem}<b>e</b>st, er ${v.stem}<b>e</b>t.</p>`;
      if(v.sz)body+=`<p>Le radical se termine par <b>s, ß, z ou x</b> → avec <b>du</b> seulement <b>-t</b> : du ${v.stem}<b>t</b>.</p>`;
    }
    if(v.vow)body+=`<p>Verbe <b>à changement de voyelle</b> (${v.vow}) – seulement avec <b>du</b> et <b>er / sie / es</b> : ${v.forms[1]}, ${v.forms[2]}. Les autres personnes gardent la voyelle de l’infinitif.</p>`;
    if(v.type==='modal')body+=`<p><b>Verbe de modalité</b> : ich et er/sie/es ont la <b>même forme, sans terminaison</b> (ich ${v.forms[0]}, er ${v.forms[2]}). Le deuxième verbe va à la <b>fin</b> de la phrase, à l’<b>infinitif</b> : Ich ${v.forms[0]} heute <i>arbeiten</i>.</p>`;
    if(v.note)body+=`<p>${v.note}</p>`;
    const stemmed=f=>v.type==='reg'&&f.startsWith(v.stem)?v.stem+'<span class="gx-end">'+f.slice(v.stem.length)+'</span>':f;
    body+=H.table(['Personne','Forme'],v.forms.map((f,p)=>[P[p],stemmed(f)]),rows);
    return H.card(`Verbe : ${v.inf}`,body);
  }
  function separableCard(pre,base,W){
    const inf=pre+base;
    return H.card(`Verbe séparable : ${inf}`,`<p><b>${inf}</b>${SEP_FR[inf]?` (${SEP_FR[inf]})`:''} est un verbe <b>séparable</b>. Dans une proposition principale, le verbe conjugué se place en position 2 et le préfixe se détache à la fin.</p>${H.table(['Position 1','Verbe (2)','…','Fin'],[['Ich','stehe','um 7 Uhr','<b>auf</b>'],['Wann','stehst','du','<b>auf</b>?']],[])}<p><small>Ces exemples illustrent <b>aufstehen</b>. Dans la réponse étudiée, le préfixe est <b>${H.esc(pre)}</b>. Avec un verbe de modalité : Ich muss früh <b>aufstehen</b>. Au parfait : Ich bin früh <b>aufgestanden</b>.</small></p>`);
  }
  const conjugate=(base,p)=>VERBS[base]?.forms[p]||base;
  function perfektCard(aux,pp,info,W){
    const isSein=['bin','bist','ist','sind','seid'].includes(aux.toLowerCase());
    let body=`<p><b>Perfekt</b> (passé composé) = <b>${isSein?'sein':'haben'}</b> conjugué en position 2 + <b>participe II</b> à la <b>fin</b> : … ${H.esc(aux)} … <b>${H.esc(pp)}</b>${info?.inf?` (de ${info.inf})`:''}.</p>`;
    body+=H.table(['Type','Participe II','Exemple'],[['régulier','<b>ge</b>-radical-<b>t</b>','gemacht, gewohnt'],['irrégulier','<b>ge</b>-…-<b>en</b> (souvent autre voyelle)','gegessen, getrunken'],['séparable','préfixe + <b>ge</b> + …','eingekauft, aufgestanden'],['-ieren / be- / ver-','<b>sans ge-</b>','studiert, besucht, verstanden']],[]);
    body+=isSein?'<p>Avec <b>sein</b> : les verbes de <b>déplacement</b> (gehen, fahren, kommen, fliegen …) et de <b>changement d’état</b> (aufstehen, einschlafen, werden), plus <b>sein</b> et <b>bleiben</b>.</p>':'<p>La plupart des verbes forment le Perfekt avec <b>haben</b>.</p>';
    return H.card('Perfekt',body);
  }
  function wordOrderCard(sentence,W){
    const words=sentence.replace(/[.!?]+$/,'').split(/\s+/).filter(Boolean);
    const isQ=/\?\s*$/.test(sentence);
    const low=words.map(w=>w.toLowerCase().replace(/[,.!?]/g,''));
    const vi=low.findIndex((w,k)=>k<=5&&INDEX[w]&&!(k>0&&/^[A-ZÄÖÜ]/.test(words[k])));
    if(vi<0)return null;
    const sub=low.findIndex(w=>['weil','dass','wenn','ob','als'].includes(w));
    const lastIdx=words.length-1,last=low[lastIdx];
    const endPart=lastIdx>vi&&(PREFIXES.has(last)||/en$/.test(last)&&low.slice(0,vi+1).some(w=>INDEX[w]?.some(h=>h.v.modal||h.v.inf==='werden'))||participle(last)&&low.slice(vi,vi+1).some(w=>INDEX[w]?.some(h=>h.v.inf==='haben'||h.v.inf==='sein')))?lastIdx:-1;
    const slots=[];
    const pos1=words.slice(0,vi).join(' ');
    if(pos1)slots.push([pos1,vi===0?'':'Position 1']);
    slots.push([words[vi],vi===0?'Verbe (1)':'Verbe (2)',true]);
    const middle=words.slice(vi+1,endPart>0?endPart:undefined).join(' ');
    if(middle)slots.push([middle,'milieu']);
    if(endPart>0)slots.push([words[endPart],'fin',true]);
    let rule;
    const imperative=(vi===0&&!isQ)||(vi===1&&low[0]==='bitte');
    if(vi===0&&isQ)rule='<b>Question oui/non</b> : le verbe conjugué est en <b>première</b> position, le sujet suit : <i>Kommen Sie morgen?</i>';
    else if(imperative)rule='<b>Impératif</b> : le verbe est en première position. Forme polie : verbe + <b>Sie</b> (<i>Kommen Sie bitte!</i>), avec du : radical sans -st (<i>Komm!</i>).';
    else if(isQ)rule='<b>Question avec mot interrogatif</b> (W-Frage) : le mot interrogatif en position 1, le verbe conjugué en <b>position 2</b>.';
    else rule='Dans la phrase principale allemande, le verbe conjugué est toujours en <b>position 2</b>. Si autre chose que le sujet est en position 1 (un complément de temps, de lieu …), le sujet passe <b>après</b> le verbe : <i>Morgen <b>gehe</b> ich ins Kino.</i>';
    if(endPart>0)rule+=' Le deuxième élément du verbe (infinitif, participe ou préfixe séparable) va à la <b>fin</b> : c’est la « parenthèse verbale » (Satzklammer).';
    if(sub>=0)rule+=` Après <b>${words[sub]}</b>, le verbe conjugué va à la <b>fin</b> de la proposition.`;
    const html=`<div class="gx-sentence" lang="de">${slots.map(([t,l,verb])=>`<span class="gx-slot${verb?' gx-verb':''}"><small>${l}</small>${H.esc(t)}</span>`).join('')}</div>`;
    return H.card('Ordre des mots',`<p>${rule}</p>${html}`);
  }
  function negationCard(word){
    return H.card('nicht ou kein ?',`<p><b>kein</b> remplace l’article indéfini (ein) ou l’absence d’article : <i>Ich habe <b>kein</b> Auto. Ich trinke <b>keinen</b> Kaffee.</i> Il se décline comme <b>ein</b>.<br><b>nicht</b> nie un verbe, un adjectif, un nom avec article défini ou un nom propre : <i>Ich komme <b>nicht</b>. Das ist <b>nicht</b> teuer.</i></p>${H.grid(['',...GENDERS],KEIN.map((row,r)=>[CASES[r],...row]),findArticle(String(word).toLowerCase(),KEIN).map(([r,c])=>[r,c+1]))}`);
  }
  const DAYS=['montag','dienstag','mittwoch','donnerstag','freitag','samstag','sonntag','wochenende','morgen','vormittag','mittag','nachmittag','abend'];
  const MONTHS=['januar','februar','märz','april','mai','juni','juli','august','september','oktober','november','dezember','frühling','sommer','herbst','winter'];
  function timePrepCard(word){
    const rows=[['am','jour, date, moment de la journée','am Montag, am 3. Mai, am Abend (mais: in der Nacht)'],['um','heure précise','um 8 Uhr, um halb neun'],['im','mois, saison','im Mai, im Sommer'],['von … bis','durée','von 9 bis 17 Uhr'],['seit + datif','depuis','seit zwei Jahren'],['vor + datif','il y a','vor einer Woche']];
    const r=['am','um','im'].indexOf(word.toLowerCase());
    return H.card('Prépositions de temps',`${H.table(['Préposition','pour','Exemple'],rows,r<0?[]:[r])}<p><small>am = an dem · im = in dem.</small></p>`);
  }
  function placePrepCard(word,W,i){
    const w=word.toLowerCase();
    const rows=[['nach','ville / pays sans article (direction)','nach Berlin, nach Frankreich, nach Hause'],['in (+ acc.)','pays avec article, lieux (direction)','in die Schweiz, ins Kino'],['zu','personnes, lieux, bâtiments (direction)','zum Arzt, zur Bank, zu Hause = chez soi'],['in (+ dat.)','où ? (lieu)','in Berlin, im Kino'],['aus','origine','aus Frankreich, aus der Türkei'],['bei','chez une personne / entreprise','bei meiner Mutter, bei Siemens']];
    const map={nach:0,zum:2,zur:2,zu:2,ins:1,aus:4,bei:5,beim:5,im:3};
    let r=map[w];
    if(w==='in')r=W.slice(i+1,i+2).some(x=>['die','das','den'].includes(x.toLowerCase()))?1:3;
    const contr={zum:'zu + dem',zur:'zu + der',ins:'in + das',im:'in + dem',am:'an + dem',beim:'bei + dem',vom:'von + dem'};
    return H.card(`Préposition : ${word}`,`${contr[w]?`<p><b>${word}</b> = ${contr[w]} (contraction).</p>`:''}${H.table(['Préposition','emploi','Exemple'],rows,r===undefined?[]:[r])}<p><small>Prépositions toujours au <b>datif</b> : mit, nach, bei, von, zu, aus, seit. Toujours à l’<b>accusatif</b> : für, ohne, durch, gegen, um.</small></p>`);
  }
  function numberCard(){
    return H.card('Nombres',`${H.table(['Nombre','Allemand','Astuce'],[['13–19','dreizehn, … sechzehn, siebzehn','sechs → sech-, sieben → sieb-'],['20, 30','zwanzig, dreißig','30 avec <b>ß</b>'],['21','<b>ein</b>und<b>zwanzig</b>','l’unité d’abord : « un-et-vingt »'],['47','siebenundvierzig','7 et 40'],['100','(ein)hundert',''],['1 000','(ein)tausend','']],[])}<p><small>Les nombres s’écrivent en un seul mot : dreihundertfünfundzwanzig (325).</small></p>`);
  }
  function timeCard(){
    return H.card('L’heure',`${H.table(['Heure','familier','officiel'],[['8:00','acht (Uhr)','acht Uhr'],['8:15','Viertel <b>nach</b> acht','acht Uhr fünfzehn'],['8:30','<b>halb neun</b> (!)','acht Uhr dreißig'],['8:45','Viertel <b>vor</b> neun','acht Uhr fünfundvierzig'],['8:50','zehn vor neun','acht Uhr fünfzig'],['20:00','acht (Uhr abends)','zwanzig Uhr']],[])}<p><b>Attention :</b> <i>halb neun</i> = la moitié vers neuf heures = <b>8 h 30</b>. Question : <i>Wie spät ist es? / Wann?</i> – réponse : <b>um</b> acht Uhr.</p>`);
  }
  const QW=[['wer','qui'],['was','quoi / que'],['wo','où (lieu)'],['woher','d’où'],['wohin','où (direction)'],['wann','quand'],['wie','comment'],['wie viel / wie viele','combien'],['wie alt','quel âge'],['warum','pourquoi'],['welcher / welche / welches','quel / quelle']];
  function questionCard(words){
    const hl=QW.map(([w],i)=>words.includes(w.split(' ')[0])&&(w.includes(' ')?words.includes(w.split(' ')[1]):true)?i:-1).filter(i=>i>=0);
    return H.card('Mots interrogatifs',`${H.table(['Allemand','Français'],QW,hl)}<p><small>Wo? = où se trouve … · Wohin? = vers où on va · Woher? = d’où on vient.</small></p>`);
  }
  function sieCard(){
    return H.card('du ou Sie ?',`<p><b>Sie</b> (avec majuscule) = vouvoiement poli, pour une ou plusieurs personnes. Le verbe se conjugue comme avec sie (pluriel) : <i>Woher <b>kommen Sie</b>?</i><br><b>du</b> = tutoiement (amis, famille, enfants) : <i>Woher <b>kommst du</b>?</i></p>`);
  }
  function gernCard(){
    return H.card('gern, lieber, möchte',`${H.table(['Allemand','Français'],[['Ich spiele <b>gern</b> Tennis.','J’aime jouer au tennis. (gern + verbe)'],['Ich trinke <b>lieber</b> Tee.','Je préfère le thé.'],['Ich mag Kaffee.','J’aime le café. (mögen + nom)'],['Ich <b>möchte</b> einen Kaffee.','Je voudrais un café. (forme polie)']],[])}`);
  }
  function esgibtCard(){return H.card('es gibt',`<p><b>es gibt</b> = il y a. Toujours au singulier, suivi de l’<b>accusatif</b> : <i>Es gibt <b>einen</b> Bahnhof. Es gibt keine Bäckerei.</i></p>`);}
  function vocabCard(answer){
    const list=window.A1_VOCABULARY_CONTENT||[];
    const norm=s=>String(s||'').toLowerCase().replace(/[.!?]/g,'').replace(/^(der|die|das)\s+/,'').trim();
    const a=norm(answer);
    const hit=list.find(e=>norm(e.de)===a)||list.find(e=>norm(e.de).split(/\s*\/\s*/).includes(a));
    return hit?H.card('Vocabulaire',`<p><b>${H.esc(hit.de)}</b> = ${H.esc(hit.fr)}</p>`):null;
  }
  function passageCard(ctx){
    const best=ctx.passage&&ctx.answer?H.bestSentence(ctx.passage,ctx.answer,ctx.question,'de'):'';
    return best?H.card('Dans le texte',`<p lang="de">« ${H.esc(best)} »</p><p><small>Ce passage montre pourquoi <b>${H.esc(ctx.answer)}</b> est correct.</small></p>`):null;
  }
  const tokens=text=>String(text||'').replace(/[’']/g,"'").split(/[^A-Za-zÄÖÜäöüß0-9']+/).filter(Boolean);
  function describe(word){
    const w=word.toLowerCase();
    const parts=[];
    const v=INDEX[w];if(v)parts.push(`${v[0].v.inf}, ${[...new Set(v.filter(x=>x.v===v[0].v).map(x=>P[x.p]))].join(' / ')}`);
    [[DEF,'article défini'],[INDEF,'article indéfini'],[KEIN,'kein']].forEach(([t,name])=>{const h=findArticle(w,t);if(h.length)parts.push(`${name}, ${h.map(([r,c])=>CASES[r].toLowerCase()+' '+GENDERS[c]).join(' / ')}`);});
    return parts[0]||'';
  }
  function wrongNote(ctx){
    if(!ctx.chosen)return '';
    const a=tokens(ctx.answer).map(w=>w.toLowerCase());
    const notes=tokens(ctx.chosen).filter(w=>!a.includes(w.toLowerCase())).map(w=>{const d=describe(w);return d?`« ${H.esc(w)} » = ${d}.`:'';}).filter(Boolean);
    return notes.length?`<p class="gx-wrong">Ton choix : ${notes.slice(0,2).join(' ')}</p>`:'';
  }

  /* ---------- main ---------- */
  function explain(ctx,helpers){
    H=helpers;
    const answer=ctx.answer||'';
    const q=ctx.question||'';
    const full=ctx.sentence||(q.includes('___')?q.replace(/^.*?:\s*(?=[^:]*___)/,'').replace(/_{3,}/,answer):answer);
    const aT=tokens(answer);
    let W=tokens(full),offset=-1;
    for(let k=0;k+aT.length<=W.length&&aT.length;k++)if(aT.every((t,j)=>W[k+j].toLowerCase()===t.toLowerCase())){offset=k;break;}
    if(offset<0){W=aT;offset=0;}
    const cards=[],seen=new Set();
    const add=(key,c)=>{if(c&&!seen.has(key)&&cards.length<4){seen.add(key);cards.push(c);}};
    const isSentence=aT.length>=3;

    // The exercise families below ask for a pronoun, an irregular plural or an
    // everyday time expression: these need the actual answer-specific reason,
    // rather than a generic "memorise it" fallback.
    if(/pronom personnel allemand|pronom personnel allemand emploies-tu/i.test(q)&&/^(ich|du|er|sie|es|wir|ihr|Sie)$/.test(answer)){
      const meanings={ich:'je : 1re personne du singulier',du:'tu : 2e personne du singulier (familier)',er:'il : masculin singulier',es:'il/elle : genre neutre, singulier',wir:'nous : 1re personne du pluriel',ihr:'vous : 2e personne du pluriel, familier',sie:'elle au singulier ou ils/elles au pluriel selon le contexte',Sie:'vous : forme de politesse (singulier ou pluriel)'};
      const detail=answer==='sie'&&/Anna et Paul|« ils »/.test(q)?'Ici, Anna et Paul sont plusieurs personnes : sie = ils.':answer==='sie'&&/« elle »/.test(q)?'Ici, Anna est une seule personne : sie = elle.':answer==='ihr'?'Ici, on tutoie deux personnes : ihr. Pour le vouvoiement, on écrit Sie avec une majuscule.':'Choisis le pronom d’après la personne, le nombre et le registre.';
      add('subject-pronoun',H.card('Pronom personnel',`<p><b>${H.esc(answer)}</b> = ${meanings[answer]}.</p><p>${detail}</p>${H.table(['Allemand','Français'],[['ich','je'],['du','tu'],['er / sie / es','il / elle / neutre'],['wir','nous'],['ihr','vous (familier pluriel)'],['sie','ils / elles'],['Sie','vous (poli)']],[])}`));
    }
    const pluralSource=q.match(/pluriel au nominatif de « ([^»]+) »/i);
    if(pluralSource){
      const singular=pluralSource[1];
      const examples={'Kind':'+ -er : Kinder','Buch':'voyelle modifiée (u → ü) + -er','Auto':'+ -s : Autos','Zimmer':'même forme au singulier et au pluriel','Tisch':'+ -e : Tische','Stuhl':'voyelle modifiée (u → ü) + -e','Tag':'+ -e : Tage','Freund':'+ -e : Freunde','Wohnung':'+ -en : Wohnungen','Straße':'+ -n : Straßen','Frau':'+ -en : Frauen','Mann':'voyelle modifiée (a → ä) + -er'};
      add('plural',H.card('Pluriel du nom',`<p><b>${H.esc(singular)} → ${H.esc(answer)}</b>. Formation : <b>${examples[singular]||'forme à apprendre avec le nom'}</b>.</p><p><small>Les pluriels allemands peuvent prendre -e, -er, -n/-en, -s, changer de voyelle (Umlaut), ou rester inchangés. Apprends toujours le pluriel avec le nom.</small></p>`));
    }
    const timeExpr=q.match(/Que signifie « ([^»]+) »/i);
    if(timeExpr&&/^(morgen|heute|gestern|am)\s/i.test(timeExpr[1])){
      const meanings={morgen:'demain',heute:"aujourd’hui",gestern:'hier',früh:'tôt / le matin',Morgen:'matin',Abend:'soir',Nachmittag:'après-midi',Nacht:'nuit',Wochenende:'week-end'};
      const parts=timeExpr[1].split(/\s+/).map(w=>meanings[w]?`<b>${H.esc(w)}</b> = ${meanings[w]}`:'').filter(Boolean);
      add('time-expression',H.card('Expression de temps',`<p><b>${H.esc(timeExpr[1])}</b> = <b>${H.esc(answer)}</b>.</p><p>${parts.join(' · ')}</p><p><small>Avec <b>morgen</b> (« demain »), la minuscule le distingue de <b>Morgen</b> (« matin »). Pour le week-end : <b>am Wochenende</b>.</small></p>`));
    }

    // lettered answers (A / B): compare the situation with the texts
    if(/^[A-F]$/.test(answer.trim())&&ctx.ads?.length){
      const rows=ctx.ads.map(ad=>[`<b>${H.esc(ad.label)}</b>${ad.label===answer.trim()?' ✓':''}`,H.esc(ad.text)]);
      return [H.card('L’annonce qui correspond',`${ctx.situation?`<p><b>Situation:</b> ${H.esc(ctx.situation)}</p>`:''}${H.table(null,rows,ctx.ads.map((ad,i)=>ad.label===answer.trim()?i:-1).filter(i=>i>=0))}<p><small>Conseil : cherche les mots-clés de la situation (quoi ? quand ? où ? pour qui ?) dans les annonces. Souvent les deux annonces parlent du même thème – c’est un détail (jour, heure, offre) qui décide.</small></p>`)];
    }
    // comprehension tasks: the quoted text passage is the real reason, so it comes first
    const yesNo=/^(richtig|falsch|vrai|faux|true|false|ja|nein|oui|non)\.?$/i.test(answer.trim());
    // no single sentence found (e.g. question in another language): show the whole text instead
    if(ctx.comprehension)add('passage',passageCard(ctx)||(ctx.passage?H.card('Le texte complet',`<p lang="de">${H.esc(ctx.passage.slice(0,900))}${ctx.passage.length>900?' …':''}</p><p><small>La réponse <b>${H.esc(answer)}</b> se trouve dans ce texte – relis-le ou réécoute-le attentivement.</small></p>`):null));
    if(yesNo)return [H.card('💡',`<p>L’affirmation « ${H.esc(ctx.question||'')} » est <b>${H.esc(answer)}</b>. Compare-la mot à mot avec le texte ou l’audio – souvent un seul détail change : un nombre, une heure, un lieu, une personne ou un jour.</p>`),...cards];
    // whole-sentence answers: word order first
    if(isSentence)add('order',wordOrderCard(answer,aT));

    aT.forEach((t,ai)=>{
      const i=offset+ai,w=t.toLowerCase();
      // verbs (not capitalised nouns, except sentence start)
      const hits=INDEX[w];
      // an infinitive at the end after a modal verb is not a "wir/sie" form
      if(hits&&/en$/.test(w)&&i===W.length-1&&W.slice(0,i).some(x=>INDEX[x.toLowerCase()]?.some(h=>h.v.modal||h.v.inf==='werden'))){add('order',wordOrderCard(full,W));add('inf',H.card('Infinitif à la fin',`<p><b>${H.esc(t)}</b> est à l’<b>infinitif</b> : après un verbe de modalité (können, müssen, wollen, möchten …), le deuxième verbe va à la <b>fin</b> de la phrase, sans terminaison de personne.</p>`));return;}
      if(hits&&!(i>0&&/^[A-ZÄÖÜ]/.test(t))){
        // separable prefix at the end of the sentence?
        const v=hits[0].v;
        const pre=SEP_BY[v.inf]?.find(p=>W.slice(i+1).map(x=>x.toLowerCase()).includes(p)&&W[W.length-1].toLowerCase()===p);
        if(pre)add('sep',separableCard(pre,v.inf,W));
        // Perfekt: haben/sein + participle at the end
        if(['haben','sein'].includes(v.inf)){const last=W[W.length-1]?.toLowerCase();const info=last&&W.length-1>i?participle(last):null;if(info)add('perfekt',perfektCard(t,last,info,W));}
        const same=hits.filter(h=>h.v===v).map(h=>h.p);
        let rows=null;
        for(let k=i-1;k>=Math.max(0,i-2);k--){const s=W[k];if(s==='Sie'&&k>0&&same.includes(5)){rows=[5];break;}if(PRON[s.toLowerCase()]){rows=PRON[s.toLowerCase()].filter(p=>same.includes(p));break;}}
        if(!rows||!rows.length){const s=W[i+1];if(s==='Sie')rows=[5];else if(s&&PRON[s.toLowerCase()])rows=PRON[s.toLowerCase()].filter(p=>same.includes(p));}
        if(!rows||!rows.length)rows=same;
        add('verb:'+v.inf,verbCard(v,t,rows,W,i));
        if(v.modal&&!isSentence){const inf=W.slice(i+1).reverse().find(x=>/en$/.test(x)&&!/^[A-ZÄÖÜ]/.test(x));if(inf&&W.length>i+2)add('order',wordOrderCard(full,W));}
        return;
      }
      if(PREFIXES.has(w)&&i===W.length-1){const base=W.slice(0,i).map(x=>x.toLowerCase()).find(x=>INDEX[x]&&SEP_BY[INDEX[x][0].v.inf]?.includes(w));if(base)add('sep',separableCard(w,INDEX[base][0].v.inf,W));return;}
      const info=participle(w);
      if(info&&W.slice(0,i).some(x=>['habe','hast','hat','haben','habt','bin','bist','ist','sind','seid'].includes(x.toLowerCase()))){const aux=W.slice(0,i).find(x=>['habe','hast','hat','haben','habt','bin','bist','ist','sind','seid'].includes(x.toLowerCase()));add('perfekt',perfektCard(aux,w,info,W));return;}
      if(findArticle(w,DEF).length){add('art',articleCard(t,W,i,DEF,'Article défini'));return;}
      if(findArticle(w,INDEF).length){add('art',articleCard(t,W,i,INDEF,'Article indéfini'));return;}
      if(findArticle(w,KEIN).length){add('neg',negationCard(w));return;}
      if(w==='nicht'){add('neg',negationCard(''));return;}
      const ps=possStem(t);
      // ihr/sein are possessives only before a noun (ihr Bruder, sein Auto)
      if(ps&&(!['ihr','sein'].includes(w)||/^[A-ZÄÖÜ]/.test(W[i+1]||''))){add('poss',possessiveCard(t,W,i));return;}
      if(PERS.some(r=>r.slice(1).includes(t)||r.slice(1).includes(w))&&!['sie','es','ihr'].includes(w)||t==='Ihnen'){add('pron',pronounCard(t,W,i));return;}
      if(t==='Sie'&&aT.length<=2){add('sie',sieCard());return;}
      if(['am','um','im'].includes(w)&&(DAYS.includes((W[i+1]||'').toLowerCase())||MONTHS.includes((W[i+1]||'').toLowerCase())||/^\d/.test(W[i+1]||'')||['halb','viertel','mitternacht'].includes((W[i+1]||'').toLowerCase())||W.slice(i+1,i+4).some(x=>/^uhr$/i.test(x)))){add('timeprep',timePrepCard(w));if(W.some(x=>/^uhr$/i.test(x)))add('time',timeCard());return;}
      // "Viertel nach / vor vier", "fünf nach acht": nach and vor tell the time here
      const NUMW=/^(eins|ein|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|zwanzig|\d+)$/i;
      if((w==='nach'||w==='vor')&&(W.some(x=>/^(viertel|uhr|halb)$/i.test(x))||NUMW.test(W[i-1]||'')&&NUMW.test(W[i+1]||''))){add('time',timeCard());return;}
      if(['nach','zu','zum','zur','ins','im','aus','bei','beim','in'].includes(w)){add('place',placePrepCard(t,W,i));return;}
      if(w==='als'){add('als',H.card('als + métier',`<p><b>als</b> = « comme / en tant que ». Le métier suit <b>sans article</b> : <i>Ich arbeite <b>als</b> Verkäuferin.</i> Même chose avec sein : <i>Ich bin Lehrer.</i></p><p><small>Au féminin, la plupart des métiers prennent <b>-in</b> : der Verkäufer → die Verkäufer<b>in</b>, der Lehrer → die Lehrer<b>in</b>.</small></p>`));return;}
      if((w==='von'||w==='bis'||w==='ab')&&W.some(x=>/^(uhr|montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag|januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember|\d+)$/i.test(x))){add('vonbis',H.card('von … bis / ab',`<p><b>von</b> (début) … <b>bis</b> (fin) indique une durée : <i>Ich arbeite <b>von</b> acht <b>bis</b> sechzehn Uhr. Das Geschäft ist <b>von</b> Montag <b>bis</b> Freitag geöffnet.</i><br><b>ab</b> = à partir de : <i><b>ab</b> neun Uhr, <b>ab</b> Montag.</i></p>`));return;}
      if(['mit','von','vom','seit','für','ohne','durch','gegen','um'].includes(w)){add('prep',H.card(`Préposition : ${t}`,`<p>${DAT_PREP.has(w)?`<b>${t}</b> est toujours suivi du <b>datif</b> : mit dem Bus, von der Arbeit.`:`<b>${t}</b> est toujours suivi de l’<b>accusatif</b> : für dich, ohne den Mann.`}</p>${H.table(['+ datif','+ accusatif'],[['mit, nach, bei, von, zu, aus, seit, gegenüber','für, ohne, durch, gegen, um']],[])}`));return;}
      if(['wer','was','wo','woher','wohin','wann','wie','warum','welche','welcher','welches','welchen'].includes(w)){add('q',questionCard(aT.map(x=>x.toLowerCase())));return;}
      if(['gern','gerne','lieber','möchte','möchtest','möchten'].includes(w))add('gern',gernCard());
    });
    const low=' '+W.join(' ').toLowerCase()+' ';
    if(/ es gibt /.test(low)&&aT.some(t=>/^(gibt|einen|eine|ein|keinen|keine|kein)$/i.test(t)))add('esgibt',esgibtCard());
    if(/\b(uhr|halb|viertel)\b/i.test(answer+' '+full)||/\d{1,2}[:.]\d{2}/.test(answer+' '+full))add('time',timeCard());
    if(/(zig|ßig|zehn|hundert|tausend)\b/i.test(answer)&&!/(Uhr)/.test(answer)||/\b([2-9]\d)\b/.test(answer)&&!/Uhr/.test(answer))add('num',numberCard());
    if(isSentence&&/\bSie\b/.test(answer)&&ctx.chosen&&/\b(du|dich|dir)\b/.test(ctx.chosen))add('sie',sieCard());
    // a noun as answer: show its gender from the article in the sentence (im = in dem → der/das)
    if(aT.length===1&&/^[A-ZÄÖÜ]/.test(answer)&&offset>0){
      const before=W[offset-1].toLowerCase();
      const g={der:'masculin (der) ou datif féminin',die:'féminin (die) ou pluriel',das:'neutre (das)',den:'masculin à l’accusatif (der → den)',dem:'masculin ou neutre au datif',im:'masculin ou neutre (im = in dem)',am:'masculin ou neutre (am = an dem)',zum:'masculin ou neutre (zum = zu dem)',zur:'féminin (zur = zu der)',ins:'neutre (ins = in das)',ein:'masculin ou neutre',eine:'féminin',einen:'masculin (accusatif)',einem:'masculin ou neutre (datif)',einer:'féminin (datif)'}[before];
      const meaning=vocabCard(answer);
      if(g)add('noun',H.card(`Nom : ${answer}`,`<p>L’article précédent (<b>${H.esc(W[offset-1])}</b>) peut correspondre à ${g}. Il faut tenir compte du cas et du nombre avant de conclure au genre de <b>${H.esc(answer)}</b>.${meaning?' '+meaning.body.replace(/<\/?p>/g,''):''}</p><p><small>En allemand, les noms s’écrivent toujours avec une <b>majuscule</b>. Apprends chaque nom avec son article.</small></p>${genderRule(answer)}`));
    }
    if(!cards.length)add('vocab',vocabCard(answer));
    if(full&&answer&&full!==answer&&full.toLowerCase().includes(answer.toLowerCase())){
      const at=full.toLowerCase().indexOf(answer.toLowerCase());
      cards.push(H.card('Phrase complète',`<p lang="de">${H.esc(full.slice(0,at))}<span class="gx-mark">${H.esc(full.slice(at,at+answer.length))}</span>${H.esc(full.slice(at+answer.length))}</p>`));
    }
    const wrong=wrongNote(ctx);
    if(wrong&&cards.length)cards[0]={...cards[0],body:wrong+cards[0].body};
    return cards;
  }
  window.A1Explain.register('de',{explain,tokens,VERBS,INDEX});
})();
