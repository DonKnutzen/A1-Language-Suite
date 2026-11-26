/* Compile authored content to the existing lesson, review and hard-mode APIs. */
(() => {
  'use strict';
  const lessons=window.EN_B1_AUTHORING.lessons,{scenes,reading}=window.EN_B1_SKILLS;
  const specs={},hard={},comprehension={},vocabulary=[],plan={},entries=[],meanings={};
  const contractions={"don't":'do not',"doesn't":'does not',"isn't":'is not',"aren't":'are not',"can't":'cannot',"won't":'will not',"wouldn't":'would not',"mustn't":'must not',"haven't":'have not',"hasn't":'has not',"didn't":'did not'};
  function variants(answer){
    const out=new Set();
    for(const[short,long]of Object.entries(contractions)){
      if(answer.includes(short))out.add(answer.replace(short,long));
      if(answer.includes(long))out.add(answer.replace(long,short));
    }
    if(answer.includes('practising'))out.add(answer.replace('practising','practicing'));
    return [...out];
  }
  // Curated equivalents are tied to a particular sentence and its German meaning.
  const equivalents={
    '1-t0-6':['are rehearsing'], '1-t1-6':['Even though'], '1-t1-9':['Nevertheless','Still'],
    '2-t0-7':["haven't received","have not got","haven't got","have not gotten","haven't gotten"],
    '2-t0-8':['finished'], '4-t1-8':['Luckily'],
    '5-t0-7':['may','are allowed to'], '5-t0-8':["needn't",'need not','do not need to',"don't need to"],
    '6-t0-9':['more difficult','more challenging'], '7-t0-9':['might','could'],
    '9-t1-6':['tired','worn out'], '9-t1-8':['about','at','by'], '9-t1-9':['helping'],
    '10-t0-6':['gets in'], '11-t0-7':['was'], '11-t1-9':['close to'],
    '12-t0-9':['to email'], '13-t0-8':['buy'], 
    '14-t0-6':['could'], '14-t1-8':['Nevertheless','Still'],
    '15-t0-8':['been'], '15-t1-9':['may','might'],
    '16-t0-6':['if'], '17-t0-7':['got','gotten'],
    '18-t0-7':['released'], '19-t0-7':['one another'],
    '20-t1-9':['for'], '21-t1-7':['upon'], '21-t1-9':['on'],
    '22-t0-8':['if'], '22-t1-6':['Also','Furthermore','Moreover'],
    '24-t1-7':['in which']
  };
  const task=(r,l,t,i)=>{
    const [prompt,answer,b,c,meaning]=r,audio=prompt.replace('___',answer);
    return {type:'choice',kind:'form',q:'Complète : '+prompt,prompt,answer,o:[answer,b,c],a:0,context:meaning,meaning,audio,hint:t.rule.split('\n')[0],answerLang:'en',
      accept:[...variants(answer),...(equivalents[`${l.id}-${t.key}-${i}`]||[]),...((l.id===8||l.id===12)&&['who','which','that'].includes(answer)?(answer==='who'?['that']:answer==='which'?['that']:['which']):[])],
      family:`b1-${l.id}-${t.key}`,checkKey:`b1-${l.id}-${t.key}-${i}`,explanation:`${audio} = ${meaning} ${t.rule.split('\n')[0]}`};
  };
  // Nearby meanings from the same situation, rather than unrelated joke answers.
  const listeningAlternatives={
    1:{0:['To learn about vegetables','To meet gardening experts'],3:['Using the old tools','Working fewer days']},
    2:{3:['A place on a training course','A different shift pattern']},
    3:{0:["At Maya's home",'At a restaurant'],2:['The salad ingredients','The dessert ingredients']},
    4:{1:['He was waiting to collect someone','He was meeting his sister'],3:['The speaker','A colleague']},
    6:{3:['He thinks the classes should cost extra','He prefers the old centre because it costs less']},
    7:{1:['An afternoon exhibition closure','An afternoon bus cancellation'],2:['Buy a ticket at the station','Arrive without a reservation'],3:['The buses take longer than driving','The car parks are too far away']},
    9:{1:['Confident','Embarrassed'],3:['Less time spent travelling to lessons','Less money spent buying a car']},
    10:{1:['The train fare includes parking','The hotel has no parking spaces'],3:['By email','Through the course organiser']},
    11:{0:['In an isolated coastal house','In a quiet city centre'],3:['Look for a quieter shop nearby','Arrange a viewing of another flat']},
    12:{0:['To train as a repair worker','To take a job with a neighbour'],2:['Studying with a neighbour at home','Taking a more advanced class'],3:['More time to study on his own','A group where everyone speaks his language']},
    13:{3:['Call only at weekends','Send an email instead']},
    14:{0:['Shorter journeys','Easier deliveries'],1:['Parking for customers','The safety of the cycle lane'],2:['Delivery times outside shop hours','A different route for the cycle lane'],3:['Willing to give up deliveries','Determined to remove this cycle lane']},
    15:{1:['Asking a colleague to speak to the manager','Changing shifts without consulting the manager'],2:['Attending the meeting together','Helping prepare a written request'],3:['Wait for the manager to change the rota','Ask a colleague to arrange the meeting']},
    16:{3:['The platform number was for a different train','His ticket requires a different route']},
    17:{2:['The organiser','The meeting speaker'],3:['The date in the old email','The details of the main decision']},
    18:{0:['One park this month','Both parks this week'],1:['Gloves and safety instructions','A collection bag and special tools'],3:['Which paths produce the most rubbish','Which group collects the heaviest bags']},
    19:{0:["Selling new children's bikes","Repairing adults' bikes"],1:['Teaching repairs and organising appointments','Repairing bikes and ordering parts'],3:['The website was temporarily unavailable','The change was too late to post online']},
    20:{0:["The kettle's lid","The kettle's base"],1:['A receipt and a photo','A photo of the packaging only'],3:['It must be returned to the manufacturer','It is needed to identify the order']},
    21:{1:['Extra speaking sessions','Individual lessons'],2:['A different payment date','A place on a waiting list'],3:['Writing feedback matters more than the timetable','The cheaper course is worth missing some lessons']},
    22:{3:['The choice of greeting','The order of the questions']},
    23:{0:['A museum visit','A walk in the park'],1:['Limited time to talk','The price of concert tickets']},
    24:{0:['Explaining a grammar rule','Following a conversation in class'],3:['Preparing a complete script','Remembering words for familiar situations']}
  };
  const formTables={
    1:[['Habitude / état','present simple','She works. / Does she work?'],['Maintenant / temporaire','am/is/are + -ing','She is working. / Is she working?']],
    2:[['Moment terminé','past simple','I worked there last year.'],['Expérience jusqu’à maintenant','have/has + participe','I have worked abroad.'],['Durée jusqu’à maintenant','for + durée / since + point de départ','I have lived here for two years / since 2024.']],
    5:[['Obligation','must / have to','You must pay.'],['Interdiction','must not / mustn’t','You mustn’t enter.'],['Pas nécessaire','do not have to','You don’t have to pay.']],
    13:[['Avant, mais plus maintenant','used to + forme de base','I used to write letters.'],['Question / négation','did + use to','Did you use to write? / I didn’t use to write.'],['Être habitué à','be used to + -ing','I am used to writing emails.']],
    16:[['Question directe','mot interrogatif + auxiliaire + sujet','Where does the train stop?'],['Question indirecte','mot interrogatif + sujet + verbe','Do you know where the train stops?'],['Question fermée indirecte','if/whether + sujet + verbe','Do you know if it stops here?']],
    17:[['Arrière-plan','was/were + -ing','I was waiting.'],['Événement','past simple','The bus arrived.'],['Encore avant','had + participe','I had bought a ticket.']]
  };
  const speakingTasks=[
    'Parle à Alex de ton quotidien et d’un nouveau loisir. Cite des habitudes, une activité actuelle et tes raisons.',
    'Raconte à une partenaire d’échange ton expérience d’études et de travail. Cite un événement daté, une durée et ton prochain objectif.',
    'Organise un dîner avec Jamie. Propose un repas, tiens compte de l’allergie aux noix et règle les courses ou la réservation.',
    'Raconte une histoire qui commence par « I was waiting for the bus when I heard my name. ». Décris la rencontre et sa fin.',
    'Conseille une amie avant son premier voyage seule : argent, règles et budget raisonnable.',
    'Compare deux façons d’être plus actif et recommandes-en une.',
    'Fais des recommandations à un invité pour visiter la ville. Tiens compte de la pluie, de la circulation et d’un éventuel changement de programme.',
    'Décris un objet utile : matériau, fonction, origine et valeur personnelle.',
    'Excuse-toi auprès d’une amie pour un rendez-vous manqué. Explique la raison et fixe un nouveau rendez-vous.',
    'À la réception d’un hôtel, demande à modifier ta réservation. Indique les anciennes et les nouvelles dates, pose des questions sur les équipements et le prix.',
    'Compare deux appartements selon l’emplacement et le coût. Dis ce que tu choisirais avec plus d’argent et demande conseil.',
    'Parle d’une personne qui t’inspire. Décris son parcours, une réussite et ton propre objectif.',
    'Explique à un ami comment ta façon de communiquer a changé depuis ton enfance. Transmets le message d’une autre personne.',
    'Discute de la question : faut-il limiter les voitures en centre-ville ? Présente les deux côtés et propose un compromis.',
    'Réagis face à une amie épuisée par de longues journées de travail. Demande-lui ce qui lui pèse, fais des suggestions prudentes et propose ton aide.',
    'Demande poliment à un service d’information voyageurs l’heure de départ, la correspondance et la validité de ton billet.',
    'Raconte une histoire qui commence par « By the time we arrived, everyone had gone. ». Rapporte aussi une demande ou une consigne.',
    'Présente une proposition pour réduire les déchets. Explique la mesure, les personnes concernées, l’effet attendu et une difficulté.',
    'Invite une amie à un projet collectif. Explique le but, les tâches et comment vous pouvez vous entraider.',
    'Fais une réclamation factuelle au sujet d’une livraison endommagée. Cite la commande, les dégâts, la preuve et la solution souhaitée.',
    'Conseille une amie qui choisit un cours. Compare deux offres selon l’horaire, le prix et ses besoins.',
    'Réponds à Alex, qui t’invite à un week-end linguistique. Choisis une activité en justifiant et pose une question sur l’hébergement.',
    'Alex propose un concert samedi. Compare le parc, le musée et le concert. Réagis à sa proposition, compare les options et demande-lui son avis.',
    'Fais le bilan avec ta partenaire d’apprentissage : illustre tes progrès, cite une difficulté et convenez d’un plan d’entraînement concret.'
  ];
  for(const l of lessons){
    if(formTables[l.id])l.topics[0].formTable={caption:'Forme et sens comparés',headings:['Emploi','Forme','Exemple'],rows:formTables[l.id]};
    l.transfer.speaking='Parle 1 à 2 minutes : '+speakingTasks[l.id-1]+' Ajoute un exemple et une question en retour. Tu peux inventer les autres informations.';
    l.speakingModel=l.model.replace(/^(?:Hi [^,]+|Dear [^,]+),\s*/, '').replace(/ (?:Best wishes|Kind regards), [^.]+$/, '').replace(/I'm writing about/, "I'd like to ask about").replace(/I have attached a copy of my receipt/, 'I have a copy of my receipt');
    l.transfer.writing='Écris 90 à 110 mots (objectif : environ 100). '+l.writingTask+' Tu peux inventer les autres informations (par ex. noms, dates et lieux).';
    l.quiz=l.phraseRows.map(([target,meaning,b,c])=>({q:`Que veut dire « ${target} » ?`,o:[meaning,b,c],a:0,audio:target,explanation:meaning}));
    const check=l.contexts.map(([q,answer,b,c],i)=>({type:'choice',q,answer,o:[answer,b,c],audio:answer,explanation:answer,family:`b1-${l.id}-communication-${i}`}));
    l.topics.forEach((t,ti)=>{
      t.key='t'+ti;t.practice=t.rows.slice(0,6).map((r,i)=>task(r,l,t,i));
      t.transfer=t.rows.slice(6).map((r,i)=>task(r,l,t,i+6));
      check.push(...t.transfer.map(q=>({...q,type:'gap',o:undefined})));
    });
    specs[l.id]={goals:l.goals,checkTasks:check,tasks:l.topics.flatMap(t=>t.transfer),checkTransfers:[]};
    const gaps=[],text=l.cloze.replace(/\{([^{}]+)\}/g,(_,value)=>{const[a,hint]=value.split('|');gaps.push({answers:a.split('~'),hint,strictAccents:true});return `{{${gaps.length-1}}}`;});
    const regular=scenes[l.id][0],legacy={version:1,title:l.title,...JSON.parse(JSON.stringify(regular))};
    const alternatives=listeningAlternatives[l.id];
    if(alternatives){
      regular.fields=regular.fields.map((f,i)=>{const wrong=alternatives[i];return wrong?{...f,options:[f.answer,...wrong],o:[f.answer,...wrong]}:f;});
      if(l.id===19){const f=regular.fields[1],answer='Organising appointments and looking after tools';regular.fields[1]={...f,answer,options:[answer,...f.options.slice(1)],o:[answer,...f.options.slice(1)]};}
      if(l.id===7)regular.fields[1]={...regular.fields[1],label:'What might happen after lunch?',q:'What might happen after lunch?'};
    }
    comprehension[l.id]={version:alternatives?2:1,title:l.title,...regular,legacyContent:legacy};
    hard[l.id]={version:1,minutes:[30,40],text,gaps,objectives:l.goals,
      listening:scenes[l.id].slice(1).map(s=>({turns:s.turns,text:s.turns.map(t=>t.text).join(' '),questions:s.fields.map((f,i)=>({q:f.label,answers:[f.answer,...f.accept],...(i===3?{options:f.options}:{}),strictAccents:true}))})),
      writing:{situation:l.writingTask,points:l.points,model:l.model,minWords:90,targetWords:100}};
    const words=l.vocabulary.map(([en])=>en);
    plan[l.id]={regular:words,hard:[],hardOnly:[],stages:{listen:words.slice(0,6),'grammar:0':words.slice(6,13),'grammar:1':words.slice(13),comprehension:[],hard:[]}};
    for(const [en,de]of l.vocabulary){
      if(!meanings[en]){meanings[en]=de;entries.push({en,de,enLessons:[l.id],deLessons:[]});}
      else {
        const entry=entries.find(e=>e.en===en);entry.enLessons.push(l.id);
        if(!entry.de.split(' / ').includes(de)&&entry.de!==de){entry.de+=' / '+de;meanings[en]=entry.de;}
      }
      vocabulary.push({en,de,enLessons:[l.id],deLessons:[]});
    }
  }
  // Keep the original text available even for attempts created before snapshots existed.
  const old19=JSON.parse(JSON.stringify(hard[19]));
  old19.text=old19.text.replace('The light is still on. Before leaving,','Before leaving,');
  const old8=JSON.parse(JSON.stringify(hard[8]));
  old8.listening[0].questions[0].q='Where had the table been used?';
  old8.listening[0].questions[0].answers=['a café','in a café'];
  const old23=JSON.parse(JSON.stringify(hard[23]));
  old23.writing.situation=old23.writing.situation.replace('Alex propose un concert samedi. Compare le parc, le musée et le concert, réagis à sa proposition', 'Compare le parc, le musée et le concert, réagis à son idée');
  window.EN_A1_HARD_VERSIONS={1:{8:old8,19:old19,23:old23}};
  hard[23].version=2;hard[23].compatibleVersions=[1];
  hard[8].version=2;hard[8].compatibleVersions=[1];
  hard[19].version=2;hard[19].compatibleVersions=[1];
  window.EN_A1_DATA={lessons};window.EN_A1_MASTERY_SPECS=specs;window.EN_A1_HARD_CONTENT=hard;
  window.EN_A1_HARD_AUDIO={turns:(_id,data,i)=>data.listening[i].turns};
  window.A1_COMPREHENSION_CONTENT=comprehension;window.EN_A1_READING=reading;
  window.EN_A1_VOCABULARY={plan,entries,meanings};window.A1_VOCABULARY_CONTENT=entries;
  window.A1LessonVocabularyPlan={en:plan};window.A1LessonLexicon={entries:{en:entries.map(e=>[e.en,e.enLessons,[],e.de])}};
  window.EN_A1_FOUNDATIONS={en:Object.fromEntries(lessons.map(l=>[l.id,{words:l.vocabulary}]))};
})();
