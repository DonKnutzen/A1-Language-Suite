/* Final writing exam (FR-A1, FR-A2, DE-A1): unlocks after every lesson is done.
   The learner writes a free message like in an A1/A2 exam, drafts are saved,
   and the text is self-assessed against criteria and a model answer.
   State lives at state.writingExam: {version, unlockedAt, active, drafts, history}. */
(() => {
  'use strict';
  const VERSION=1;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const words=text=>String(text||'').split(/\s+/).filter(w=>/[\p{L}\p{N}]/u.test(w)).length;

  // Exam formats: A1 = short message with 3 content points, A2 = e-mail with 4 content points.
  const COURSES={
    'francais-a1':{target:'fr',level:'A1',exam:'DELF A1',minWords:30,targetWords:40,minutes:20,accents:['é','è','ê','à','â','ç','ù','û','ô','î','ï','ë','œ','É','À','Ç','«','»','’'],tasks:[
      {id:'fr-a1-vacances',title:{de:'Urlaubsgrüße',en:'Holiday message',fr:'Message de vacances'},register:'tu',
        situation:'Vous êtes en vacances. Vous écrivez un message à votre ami français Paul.',
        points:['Dites où vous êtes et avec qui.','Dites quel temps il fait.','Racontez ce que vous faites le matin et le soir.'],
        gloss:{de:'Du bist im Urlaub und schreibst deinem französischen Freund Paul: wo und mit wem du bist, wie das Wetter ist und was du morgens und abends machst.',en:'You are on holiday and write to your French friend Paul: where and with whom you are, what the weather is like and what you do in the morning and evening.'},
        model:'Salut Paul !\nJe suis à Nice avec ma sœur. Il fait beau et chaud, il fait 28 degrés. Le matin, nous allons à la plage. Le soir, nous mangeons au restaurant et nous faisons une promenade.\nÀ bientôt !\nAnna'},
      {id:'fr-a1-diner',title:{de:'Einladung absagen',en:'Declining an invitation',fr:'Refuser une invitation'},register:'tu',
        situation:'Votre collègue Marc vous invite à dîner vendredi soir. Vous ne pouvez pas venir. Vous lui répondez.',
        points:['Remerciez Marc pour l’invitation.','Dites pourquoi vous ne pouvez pas venir.','Proposez un autre jour et une heure.'],
        gloss:{de:'Dein Kollege Marc lädt dich für Freitagabend zum Essen ein. Du kannst nicht kommen. Bedanke dich, sag, warum du nicht kommen kannst, und schlag einen anderen Tag mit Uhrzeit vor.',en:'Your colleague Marc invites you to dinner on Friday evening. You cannot come. Thank him, say why you cannot come and suggest another day and time.'},
        model:'Bonjour Marc,\nmerci beaucoup pour ton invitation ! Malheureusement, vendredi soir, je ne peux pas venir : ma mère arrive à Paris et je vais à la gare. Est-ce que tu es libre samedi à midi ? On peut manger ensemble au café.\nBonne journée,\nLéa'},
      {id:'fr-a1-appartement',title:{de:'Neue Wohnung',en:'New flat',fr:'Nouvel appartement'},register:'tu',
        situation:'Vous habitez dans un nouvel appartement. Vous écrivez un e-mail à votre amie Claire.',
        points:['Décrivez votre appartement (pièces, taille).','Parlez de votre quartier.','Invitez Claire : donnez un jour et une heure.'],
        gloss:{de:'Du wohnst in einer neuen Wohnung und schreibst deiner Freundin Claire eine E-Mail: Beschreibe die Wohnung, erzähle vom Viertel und lade Claire mit Tag und Uhrzeit ein.',en:'You live in a new flat and write an e-mail to your friend Claire: describe the flat, talk about the neighbourhood and invite Claire with a day and time.'},
        model:'Chère Claire,\nj’ai un nouvel appartement ! Il a trois pièces : une cuisine, un salon et une chambre. Il est petit mais très clair. Mon quartier est calme et il y a une boulangerie et un parc. Tu viens dimanche à 15 heures ?\nBises,\nTom'}
    ]},
    'francais-a2':{target:'fr',level:'A2',exam:'TELC Français A2 / DELF A2',minWords:60,targetWords:70,minutes:30,accents:['é','è','ê','à','â','ç','ù','û','ô','î','ï','ë','œ','É','À','Ç','«','»','’'],tasks:[
      {id:'fr-a2-weekend',title:{de:'Mein letztes Wochenende',en:'My last weekend',fr:'Mon dernier week-end'},register:'tu',
        situation:'Votre ami Thomas vous demande des nouvelles. Vous lui écrivez un e-mail sur votre dernier week-end.',
        points:['Dites où vous êtes allé(e) et avec qui.','Racontez ce que vous avez fait.','Décrivez le temps et l’ambiance (imparfait).','Donnez votre opinion et posez une question à Thomas.'],
        gloss:{de:'Dein Freund Thomas fragt, wie es dir geht. Schreib ihm über dein letztes Wochenende: wohin und mit wem, was ihr gemacht habt, wie Wetter und Stimmung waren (Imparfait), deine Meinung und eine Frage an Thomas.',en:'Your friend Thomas asks for news. Write about your last weekend: where you went and with whom, what you did, what the weather and atmosphere were like (imparfait), your opinion and a question for Thomas.'},
        model:'Salut Thomas,\nmerci pour ton message ! Le week-end dernier, je suis allée à Annecy avec mon frère. Samedi, nous avons loué des vélos et nous avons fait le tour du lac. Il faisait très beau et il y avait beaucoup de monde au marché. Dimanche, nous avons mangé une fondue. C’était vraiment génial, je veux y retourner ! Et toi, qu’est-ce que tu as fait ce week-end ?\nÀ bientôt,\nJulie'},
      {id:'fr-a2-fete',title:{de:'Absage mit Gegenvorschlag',en:'Apology and new plan',fr:'S’excuser et proposer'},register:'tu',
        situation:'Votre amie Sophie vous invite à sa fête samedi soir. Vous ne pouvez pas venir. Vous lui écrivez un e-mail.',
        points:['Remerciez Sophie pour l’invitation.','Excusez-vous et expliquez pourquoi vous ne pouvez pas venir.','Proposez une autre sortie ensemble (jour, heure, activité).','Demandez-lui de vous répondre.'],
        gloss:{de:'Deine Freundin Sophie lädt dich zu ihrer Feier am Samstagabend ein. Du kannst nicht kommen. Bedanke dich, entschuldige dich mit Grund, schlag eine andere gemeinsame Unternehmung vor (Tag, Uhrzeit, Aktivität) und bitte um Antwort.',en:'Your friend Sophie invites you to her party on Saturday evening. You cannot come. Thank her, apologise and explain why, suggest another outing together (day, time, activity) and ask her to reply.'},
        model:'Chère Sophie,\nmerci beaucoup pour ton invitation, c’est très gentil ! Malheureusement, je ne pourrai pas venir samedi soir parce que je travaille jusqu’à minuit. Je suis vraiment désolé, c’est dommage ! Est-ce que tu veux aller au cinéma avec moi dimanche après-midi ? Le film commence à 16 heures et ensuite, on pourra boire un café. Dis-moi si ça te va !\nBises,\nMarc'},
      {id:'fr-a2-region',title:{de:'Reisetipps für einen Freund',en:'Travel tips for a friend',fr:'Conseils de voyage'},register:'tu',
        situation:'Votre ami français Lucas veut visiter votre région cet été. Vous lui écrivez un e-mail avec des conseils.',
        points:['Dites quel est le meilleur moment pour venir et quel temps il fait.','Présentez l’endroit le plus beau de votre région (superlatif).','Conseillez-lui un plat à goûter.','Proposez de vous retrouver (jour, lieu).'],
        gloss:{de:'Dein französischer Freund Lucas will diesen Sommer deine Region besuchen. Schreib ihm Tipps: beste Reisezeit und Wetter, der schönste Ort (Superlativ), ein Gericht zum Probieren und ein Treffen (Tag, Ort).',en:'Your French friend Lucas wants to visit your region this summer. Write him tips: the best time to come and the weather, the most beautiful place (superlative), a dish to try and a suggestion to meet (day, place).'},
        model:'Salut Lucas,\nquelle bonne idée ! Le meilleur moment pour venir, c’est en juillet : il fait chaud, environ 25 degrés, mais il pleut parfois. L’endroit le plus beau de ma région, c’est le lac de Constance. Tu peux faire du bateau et te baigner. Tu dois goûter les Maultaschen, c’est un plat typique et délicieux. On peut se retrouver samedi 12 juillet à la gare de Constance ?\nAmitiés,\nLena'}
    ]},
    'deutsch-a1':{target:'de',level:'A1',exam:'Goethe-Zertifikat A1',minWords:30,targetWords:40,minutes:20,accents:['ä','ö','ü','ß','Ä','Ö','Ü','€','„','“'],tasks:[
      {id:'de-a1-kurs',title:{fr:'Absent au cours',en:'Missing class',de:'Nicht im Kurs'},register:'Sie',
        situation:'Sie können morgen nicht zum Deutschkurs kommen. Schreiben Sie eine E-Mail an Ihre Lehrerin, Frau Weber.',
        points:['Warum kommen Sie nicht?','Fragen Sie nach den Hausaufgaben.','Wann kommen Sie wieder?'],
        gloss:{fr:'Tu ne peux pas venir au cours d’allemand demain. Écris un e-mail à ton enseignante, Mme Weber (vouvoiement) : explique pourquoi, demande les devoirs et dis quand tu reviens.',en:'You cannot come to German class tomorrow. Write an e-mail to your teacher, Frau Weber (formal “Sie”): say why, ask about the homework and say when you will be back.'},
        model:'Liebe Frau Weber,\nich kann morgen leider nicht zum Deutschkurs kommen. Ich bin krank und muss zum Arzt. Was sind die Hausaufgaben? Können Sie mir bitte die Seiten schreiben? Am Donnerstag komme ich wieder.\nViele Grüße\nPaul Martin'},
      {id:'de-a1-geburtstag',title:{fr:'Invitation d’anniversaire',en:'Birthday invitation',de:'Geburtstagseinladung'},register:'du',
        situation:'Ihr Freund Jonas hat am Samstag Geburtstag und lädt Sie zur Party ein. Antworten Sie Jonas.',
        points:['Danken Sie für die Einladung.','Sie kommen, aber später. Warum?','Fragen Sie: Was können Sie mitbringen?'],
        gloss:{fr:'Ton ami Jonas fête son anniversaire samedi et t’invite. Réponds-lui (tutoiement) : remercie-le, dis que tu viens mais plus tard et pourquoi, et demande ce que tu peux apporter.',en:'Your friend Jonas has his birthday on Saturday and invites you. Reply (informal “du”): thank him, say you are coming but later and why, and ask what you can bring.'},
        model:'Lieber Jonas,\nvielen Dank für deine Einladung! Ich komme gern zu deiner Party. Aber ich arbeite am Samstag bis 19 Uhr. Ich komme dann um 20 Uhr. Was kann ich mitbringen? Vielleicht einen Salat oder Getränke?\nBis Samstag!\nClaire'},
      {id:'de-a1-wohnung',title:{fr:'Visiter un appartement',en:'Flat viewing',de:'Wohnung besichtigen'},register:'Sie',
        situation:'Sie suchen eine Wohnung und haben eine Anzeige gelesen. Schreiben Sie an den Vermieter, Herrn Krause.',
        points:['Sie interessieren sich für die Wohnung.','Fragen Sie nach der Miete.','Wann können Sie die Wohnung ansehen?'],
        gloss:{fr:'Tu cherches un appartement et tu as lu une annonce. Écris au propriétaire, M. Krause (vouvoiement) : dis que l’appartement t’intéresse, demande le loyer et dis quand tu peux le visiter.',en:'You are looking for a flat and have read an advert. Write to the landlord, Herr Krause (formal “Sie”): say you are interested, ask about the rent and say when you can view the flat.'},
        model:'Sehr geehrter Herr Krause,\nich habe Ihre Anzeige gelesen. Ich interessiere mich für die Wohnung. Wie hoch ist die Miete? Sind die Nebenkosten inklusive? Ich kann die Wohnung am Montag oder Dienstag ab 17 Uhr ansehen.\nMit freundlichen Grüßen\nNina Roy'}
    ]}
  };

  const T={
    de:{title:'Schreibprüfung',aim:'Ziel: etwa {t} Wörter, mindestens {min}. Achte auf Anrede und Schluss.',chars:'Sonderzeichen einfügen',eyebrow:'ABSCHLUSS · SCHREIBEN',locked:'Freigeschaltet, wenn alle {n} Lektionen abgeschlossen sind.',lessonsDone:'{d}/{n} Lektionen abgeschlossen',ready:'Bereit: Schreibe eine Nachricht wie in der {exam}-Prüfung.',start:'Schreibprüfung starten',resume:'Entwurf fortsetzen',assess:'Selbstbewertung fortsetzen',open:'Schreibprüfung öffnen',lockedBtn:'Noch gesperrt',draftInfo:'Entwurf gespeichert · {w} Wörter',lastResult:'Letztes Ergebnis: {p}/{m} Punkte',passedTag:'bestanden',notPassedTag:'noch nicht bestanden',
      introTitle:'Deine Schreibprüfung',intro:'Wie in der {exam}-Prüfung schreibst du eine kurze Nachricht zu {k} Inhaltspunkten. Ziel: etwa {t} Wörter, mindestens {min}. Orientierung: etwa {m} Minuten, ohne Zeitlimit. Schreibe ohne Hilfsmittel. Dein Entwurf wird automatisch gespeichert.',
      rulesTitle:'So bestehst du',rules:'Mindestens {min} Wörter, mindestens 70 % der Punkte in deiner Selbstbewertung und kein Kriterium mit 0 Punkten.',choose:'Wähle eine Aufgabe',chooseHint:'In der Prüfung bekommst du eine Aufgabe. Hier wählst du selbst – jede Aufgabe kannst du später erneut schreiben.',draftBadge:'Entwurf · {w} Wörter',taskIn:'Aufgabe (in der Zielsprache, wie in der Prüfung)',translation:'Übersetzung der Aufgabe anzeigen',yourText:'Dein Text',words:'Wörter',minHint:'mindestens {min}',saved:'Entwurf gespeichert',saving:'Wird gespeichert …',saveError:'Speichern fehlgeschlagen. Bitte Text sichern.',back:'Zurück',home:'Zur Startseite',overview:'Zur Übersicht',submit:'Text abgeben',confirm:'Verbindlich abgeben? Du hast {w} Wörter geschrieben (mindestens {min}).{short} Danach kannst du den Text nicht mehr ändern und bewertest ihn selbst.',shortWarn:' Die Mindestwortzahl ist noch nicht erreicht – die Prüfung gilt dann als nicht bestanden.',keepEditing:'Weiter schreiben',confirmSubmit:'Jetzt abgeben',
      assessTitle:'Bewerte deinen Text selbst',assessIntro:'Vergleiche deinen Text mit dem Mustertext. Andere passende Formulierungen sind richtig. Kleine Fehler sind erlaubt, wenn die Nachricht verständlich bleibt. Dein Text wird nicht automatisch korrigiert.',modelTitle:'Mustertext (eine mögliche Lösung)',ownTitle:'Dein abgegebener Text',rate:'Bitte selbst bewerten',save:'Selbstbewertung speichern & Ergebnis',missingRatings:'Bitte bewerte alle Kriterien.',
      formCrit:'Textsorte: Anrede, Schluss und passende Anredeform ({reg})',langCrit:'Sprache: verständliche Sätze, passender Wortschatz, einfache Verbindungen (et, mais, parce que …)',langCritDe:'Sprache: verständliche Sätze, passender Wortschatz, Verb an Position 2',r0:'0 · fehlt oder unverständlich',r1:'1 · teilweise erfüllt / teilweise verständlich',r2:'2 · erfüllt und verständlich',
      resultTitle:'Ergebnis der Schreibprüfung',passed:'✓ BESTANDEN',notPassed:'NOCH NICHT BESTANDEN',points:'Punkte (Selbstbewertung)',checkWords:'Mindestwortzahl ({w}/{min} Wörter)',checkPoints:'Mindestens 70 % der Punkte',checkZero:'Kein Kriterium mit 0 Punkten',selfNote:'Das ist eine Selbstbewertung für dein Training und kein offizieller Sprachnachweis.',again:'Neuer Versuch',history:'Frühere Versuche',view:'Ansehen',task:'Aufgabe',tipsFail:'Tipp: Arbeite jeden Inhaltspunkt in einem eigenen Satz ab und prüfe Anrede und Schluss.',register:{tu:'tu',du:'du',Sie:'Sie'}},
    en:{title:'Writing exam',aim:'Aim for about {t} words, at least {min}. Include a greeting and a closing.',chars:'Insert special characters',eyebrow:'FINAL · WRITING',locked:'Unlocks once all {n} lessons are complete.',lessonsDone:'{d}/{n} lessons complete',ready:'Ready: write a message like in the {exam} exam.',start:'Start writing exam',resume:'Continue draft',assess:'Continue self-assessment',open:'Open writing exam',lockedBtn:'Still locked',draftInfo:'Draft saved · {w} words',lastResult:'Last result: {p}/{m} points',passedTag:'passed',notPassedTag:'not passed yet',
      introTitle:'Your writing exam',intro:'As in the {exam} exam, you write a short message covering {k} content points. Aim for about {t} words, at least {min}. Indicative time: about {m} minutes, no time limit. Write without aids. Your draft is saved automatically.',
      rulesTitle:'How to pass',rules:'At least {min} words, at least 70% of the points in your self-assessment and no criterion scored 0.',choose:'Choose a task',chooseHint:'In the exam you get one task. Here you choose – you can write every task again later.',draftBadge:'Draft · {w} words',taskIn:'Task (in the target language, as in the exam)',translation:'Show translation of the task',yourText:'Your text',words:'words',minHint:'at least {min}',saved:'Draft saved',saving:'Saving …',saveError:'Saving failed. Please keep a copy of your text.',back:'Back',home:'Back to home',overview:'Back to overview',submit:'Submit text',confirm:'Submit now? You have written {w} words (minimum {min}).{short} You cannot edit the text afterwards and will assess it yourself.',shortWarn:' The minimum word count has not been reached – the exam will count as not passed.',keepEditing:'Keep writing',confirmSubmit:'Submit now',
      assessTitle:'Assess your text',assessIntro:'Compare your text with the model text. Other suitable wording is valid. Small errors are acceptable if the message remains understandable. Your text is not automatically corrected.',modelTitle:'Model text (one possible answer)',ownTitle:'Your submitted text',rate:'Assess your answer',save:'Save self-assessment & view result',missingRatings:'Please assess every criterion.',
      formCrit:'Text type: greeting, closing and the right form of address ({reg})',langCrit:'Language: understandable sentences, suitable vocabulary, simple connectors (et, mais, parce que …)',langCritDe:'Language: understandable sentences, suitable vocabulary, verb in second position',r0:'0 · missing or unclear',r1:'1 · partly fulfilled / partly understandable',r2:'2 · fulfilled and understandable',
      resultTitle:'Writing exam result',passed:'✓ PASSED',notPassed:'NOT PASSED YET',points:'Points (self-assessment)',checkWords:'Minimum word count ({w}/{min} words)',checkPoints:'At least 70% of the points',checkZero:'No criterion scored 0',selfNote:'This is a self-assessment for your practice, not an official language certificate.',again:'New attempt',history:'Previous attempts',view:'View',task:'Task',tipsFail:'Tip: cover each content point in its own sentence and check your greeting and closing.',register:{tu:'tu',du:'du',Sie:'Sie'}},
    fr:{title:'Épreuve d’écriture',aim:'Objectif : environ {t} mots, au moins {min}. Pense à la salutation et à la formule finale.',chars:'Insérer des caractères spéciaux',eyebrow:'BILAN FINAL · ÉCRIRE',locked:'Débloquée quand les {n} leçons sont terminées.',lessonsDone:'{d}/{n} leçons terminées',ready:'Prêt·e : écris un message comme à l’examen {exam}.',start:'Commencer l’épreuve',resume:'Reprendre le brouillon',assess:'Reprendre l’auto-évaluation',open:'Ouvrir l’épreuve d’écriture',lockedBtn:'Encore verrouillée',draftInfo:'Brouillon enregistré · {w} mots',lastResult:'Dernier résultat : {p}/{m} points',passedTag:'réussie',notPassedTag:'pas encore réussie',
      introTitle:'Ton épreuve d’écriture',intro:'Comme à l’examen {exam}, tu écris un court message sur {k} points de contenu. Objectif : environ {t} mots, au moins {min}. Durée indicative : environ {m} minutes, sans limite de temps. Écris sans aide. Ton brouillon est enregistré automatiquement.',
      rulesTitle:'Pour réussir',rules:'Au moins {min} mots, au moins 70 % des points dans ton auto-évaluation et aucun critère à 0.',choose:'Choisis un sujet',chooseHint:'À l’examen, tu reçois un seul sujet. Ici, tu choisis – tu peux refaire chaque sujet plus tard.',draftBadge:'Brouillon · {w} mots',taskIn:'Sujet (dans la langue cible, comme à l’examen)',translation:'Afficher la traduction du sujet',yourText:'Ton texte',words:'mots',minHint:'au moins {min}',saved:'Brouillon enregistré',saving:'Enregistrement …',saveError:'Échec de l’enregistrement. Garde une copie de ton texte.',back:'Retour',home:'Retour à l’accueil',overview:'Retour à l’aperçu',submit:'Rendre le texte',confirm:'Rendre maintenant ? Tu as écrit {w} mots (minimum {min}).{short} Ensuite, tu ne peux plus modifier le texte et tu l’évalues toi-même.',shortWarn:' Le nombre minimum de mots n’est pas atteint – l’épreuve compte alors comme non réussie.',keepEditing:'Continuer à écrire',confirmSubmit:'Rendre maintenant',
      assessTitle:'Évalue ton texte',assessIntro:'Compare ton texte avec le modèle. D’autres formulations adaptées sont correctes. De petites fautes sont acceptées si le message reste compréhensible. Ton texte n’est pas corrigé automatiquement.',modelTitle:'Texte modèle (une réponse possible)',ownTitle:'Ton texte rendu',rate:'À évaluer toi-même',save:'Enregistrer l’auto-évaluation et voir le résultat',missingRatings:'Évalue tous les critères, s’il te plaît.',
      formCrit:'Type de texte : salutation, formule finale et bonne forme d’adresse ({reg})',langCrit:'Langue : phrases compréhensibles, vocabulaire adapté, connecteurs simples',langCritDe:'Langue : phrases compréhensibles, vocabulaire adapté, verbe en deuxième position',r0:'0 · absent ou incompréhensible',r1:'1 · en partie réalisé / en partie compréhensible',r2:'2 · réalisé et compréhensible',
      resultTitle:'Résultat de l’épreuve d’écriture',passed:'✓ RÉUSSIE',notPassed:'PAS ENCORE RÉUSSIE',points:'Points (auto-évaluation)',checkWords:'Nombre minimum de mots ({w}/{min} mots)',checkPoints:'Au moins 70 % des points',checkZero:'Aucun critère à 0',selfNote:'C’est une auto-évaluation pour t’entraîner, pas un certificat de langue officiel.',again:'Nouvel essai',history:'Essais précédents',view:'Voir',task:'Sujet',tipsFail:'Conseil : traite chaque point de contenu dans une phrase à part et vérifie la salutation et la formule finale.',register:{tu:'tu',du:'du (tutoiement)',Sie:'Sie (vouvoiement)'}}
  };
  const fill=(s,v)=>String(s).replace(/\{(\w+)\}/g,(_,k)=>v[k]??'');
  const cleanLang=lang=>T[lang]?lang:'de';
  const course=id=>COURSES[id];
  const task=(courseId,taskId)=>course(courseId)?.tasks.find(t=>t.id===taskId);
  function criteria(courseId,t,lang='de'){
    const L=T[cleanLang(lang)],c=course(courseId);
    return [...t.points,fill(L.formCrit,{reg:L.register[t.register]||t.register}),c.target==='de'?L.langCritDe:L.langCrit];
  }
  function evaluate(courseId,taskId,text,ratings){
    const c=course(courseId),t=task(courseId,taskId);if(!c||!t)return null;
    const n=t.points.length+2,max=n*2,list=Array.isArray(ratings)?ratings.slice(0,n):[];
    const complete=list.length===n&&list.every(r=>Number.isInteger(r)&&r>=0&&r<=2);
    const points=list.reduce((s,r)=>s+(Number.isInteger(r)?r:0),0),count=words(text);
    const enoughWords=count>=c.minWords,enoughPoints=points*10>=max*7,noZero=complete&&list.every(r=>r>0);
    return {complete,points,max,words:count,minWords:c.minWords,enoughWords,enoughPoints,noZero,passed:complete&&enoughWords&&enoughPoints&&noZero};
  }
  function ensure(state){
    const w=state.writingExam&&typeof state.writingExam==='object'?state.writingExam:(state.writingExam={});
    w.version=VERSION;if(!w.drafts||typeof w.drafts!=='object')w.drafts={};if(!Array.isArray(w.history))w.history=[];if(w.active===undefined)w.active=null;
    return w;
  }
  const lessonsDone=(state,lessons)=>(lessons||[]).filter(l=>(state.doneLessons||[]).includes(l.id)).length;
  function isUnlocked(state,lessons){
    const n=(lessons||[]).length;
    return !!state.writingExam?.unlockedAt||(n>0&&lessonsDone(state,lessons)===n);
  }
  function startTask(state,courseId,taskId,now=Date.now()){
    if(!task(courseId,taskId))return null;
    const w=ensure(state),a=w.active;
    if(a&&a.taskId===taskId)return a;
    if(a&&!a.submittedAt){if(a.text?.trim())w.drafts[a.taskId]={text:a.text,updatedAt:a.updatedAt||now};}
    else if(a&&a.submittedAt)return a; // a submitted text must be assessed first
    const draft=w.drafts[taskId];delete w.drafts[taskId];
    w.active={taskId,text:draft?.text||'',startedAt:now,updatedAt:draft?.updatedAt||now,ratings:[]};
    return w.active;
  }
  function updateDraft(state,text,now=Date.now()){
    const a=ensure(state).active;if(!a||a.submittedAt)return false;
    a.text=String(text).slice(0,6000);a.updatedAt=now;return true;
  }
  function submit(state,now=Date.now()){
    const a=ensure(state).active;if(!a||a.submittedAt||!a.text?.trim())return false;
    a.submittedAt=now;a.ratings=[];return true;
  }
  function complete(state,courseId,ratings,now=Date.now()){
    const w=ensure(state),a=w.active;if(!a?.submittedAt)return null;
    const result=evaluate(courseId,a.taskId,a.text,ratings);if(!result?.complete)return null;
    const entry={version:VERSION,taskId:a.taskId,text:a.text,ratings:[...ratings],startedAt:a.startedAt,submittedAt:a.submittedAt,completedAt:now,points:result.points,max:result.max,words:result.words,passed:result.passed};
    w.history.push(entry);w.active=null;if(result.passed&&!w.passedAt)w.passedAt=now;
    return entry;
  }

  const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${name==='lock'?'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>':name==='arrow'?'<path d="M5 12h14m-6-6 6 6-6 6"/>':'<path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>'}</svg>`;

  function homeHtml(state,{course:courseId,lessons=[],lang='de'}={}){
    const c=course(courseId);if(!c)return '';
    const L=T[cleanLang(lang)],n=lessons.length,d=lessonsDone(state,lessons),open=isUnlocked(state,lessons),w=state.writingExam||{},a=w.active,last=(w.history||[])[w.history?.length-1];
    const status=!open?fill(L.lessonsDone,{d,n}):a&&a.submittedAt?L.assess:a?fill(L.draftInfo,{w:words(a.text)}):last?`${fill(L.lastResult,{p:last.points,m:last.max})} · ${last.passed?L.passedTag:L.notPassedTag}`:fill(L.ready,{exam:c.exam});
    const label=!open?L.lockedBtn:a?.submittedAt?L.assess:a?L.resume:last?L.open:L.start;
    return `<section class="card writing-exam-card is-${open?'open':'locked'}" data-writing-exam-home data-i18n-ignore aria-labelledby="writingExamHomeTitle"><header class="writing-exam-heading"><span class="writing-exam-symbol">${icon(open?'pen':'lock')}</span><div><span class="writing-exam-eyebrow">${esc(L.eyebrow)} · ${c.level}</span><h2 id="writingExamHomeTitle">${esc(L.title)}</h2></div></header><p class="writing-exam-status">${esc(status)}</p>${open?'':`<p class="writing-exam-hint">${esc(fill(L.locked,{n}))}</p><div class="progress writing-exam-progress" aria-hidden="true"><div style="width:${n?Math.round(d/n*100):0}%"></div></div>`}<button type="button" class="writing-exam-open" id="homeWritingExam" ${open?'':'disabled aria-disabled="true"'}><span>${esc(label)}</span><span class="writing-exam-arrow">${icon('arrow')}</span></button></section>`;
  }

  // Wires the home card. Returns nothing; the exam view replaces the home view.
  function wireHome(view,{course:courseId,state,save,lessons=[],lang,onBack,beforeOpen}={}){
    const btn=view?.querySelector('#homeWritingExam');if(!btn)return;
    if(isUnlocked(state,lessons)&&!state.writingExam?.unlockedAt){ensure(state).unlockedAt=Date.now();save?.();}
    btn.addEventListener('click',()=>{if(!isUnlocked(state,lessons))return;beforeOpen?.();render({view,course:courseId,state,save,lessons,lang,onBack});});
  }

  function render({view,course:courseId,state,save,lessons=[],lang='de',onBack}={}){
    const c=course(courseId);if(!view||!c)return;
    const getLang=()=>cleanLang(typeof lang==='function'?lang():lang);
    const w=ensure(state);let screen=w.active?(w.active.submittedAt?'assess':'write'):'overview',resultIndex=null,confirmOpen=false,saveTimer=null,ratings=[];
    const L=()=>T[getLang()];
    const persist=()=>{clearTimeout(saveTimer);saveTimer=null;try{save?.();return true;}catch(e){return false;}};
    const leave=()=>{if(saveTimer)persist();cleanup();onBack?.();};
    function onLanguage(){if(!view.querySelector('[data-writing-exam]')){cleanup();return;}draw();}
    function onHide(){if(saveTimer)persist();}
    function cleanup(){window.removeEventListener('a1suite:languagechange',onLanguage);document.removeEventListener('visibilitychange',onHide);window.removeEventListener('pagehide',onHide);}
    window.addEventListener('a1suite:languagechange',onLanguage);document.addEventListener('visibilitychange',onHide);window.addEventListener('pagehide',onHide);
    const gloss=t=>t.gloss[getLang()]||t.gloss.en||'';
    const taskBlock=t=>`<div class="writing-exam-task"><span class="writing-exam-label">${esc(L().taskIn)}</span><p lang="${c.target}">${esc(t.situation)}</p><ol lang="${c.target}">${t.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ol>${gloss(t)?`<details class="writing-exam-gloss"><summary>${esc(L().translation)}</summary><p>${esc(gloss(t))}</p></details>`:''}</div>`;
    const shell=inner=>`<div class="writing-exam" data-writing-exam data-i18n-ignore>${inner}</div>`;
    const title=t=>esc(t.title[getLang()]||t.title.en);
    function overview(){
      const l=L(),a=w.active;
      return shell(`<section class="card writing-exam-intro"><span class="writing-exam-eyebrow">${esc(l.eyebrow)} · ${c.exam}</span><h2>${esc(l.introTitle)}</h2><p>${esc(fill(l.intro,{exam:c.exam,k:c.tasks[0].points.length,t:c.targetWords,min:c.minWords,m:c.minutes}))}</p><h3>${esc(l.rulesTitle)}</h3><p>${esc(fill(l.rules,{min:c.minWords}))}</p></section>
        <section class="card"><h3>${esc(l.choose)}</h3><p class="muted">${esc(l.chooseHint)}</p><div class="writing-exam-choices">${c.tasks.map(t=>{const draft=a?.taskId===t.id&&!a.submittedAt?a.text:w.drafts[t.id]?.text;const best=w.history.filter(h=>h.taskId===t.id).reduce((b,h)=>!b||h.points/h.max>b.points/b.max?h:b,null);return `<button type="button" class="writing-exam-choice" data-wx-task="${esc(t.id)}"><strong>${title(t)}</strong><span lang="${c.target}">${esc(t.situation)}</span>${draft?.trim()?`<em>${esc(fill(l.draftBadge,{w:words(draft)}))}</em>`:''}${best?`<small>${best.passed?'✓ ':''}${best.points}/${best.max}</small>`:''}</button>`;}).join('')}</div></section>
        ${w.history.length?`<section class="card"><h3>${esc(l.history)}</h3><ul class="writing-exam-history">${w.history.map((h,i)=>({h,i})).reverse().map(({h,i})=>{const t=task(courseId,h.taskId);return `<li><span>${new Date(h.completedAt).toLocaleDateString(getLang()==='en'?'en-GB':getLang())} · ${t?title(t):esc(h.taskId)}</span><strong>${h.points}/${h.max} · ${esc(h.passed?l.passedTag:l.notPassedTag)}</strong><button type="button" class="tiny-btn" data-wx-result="${i}">${esc(l.view)}</button></li>`;}).join('')}</ul></section>`:''}
        <button type="button" class="secondary-btn writing-exam-back" id="wxHome">← ${esc(l.home)}</button>`);
    }
    function write(){
      const l=L(),a=w.active,t=task(courseId,a.taskId),count=words(a.text);
      return shell(`<section class="card"><span class="writing-exam-eyebrow">${esc(l.title)} · ${c.exam}</span><h2>${title(t)}</h2>${taskBlock(t)}<p class="muted">${esc(fill(l.aim,{t:c.targetWords,min:c.minWords}))}</p>
        <div class="writing-exam-accents" role="group" aria-label="${esc(l.chars)}">${c.accents.map(ch=>`<button type="button" class="writing-exam-key" data-wx-char="${esc(ch)}" lang="${c.target}">${esc(ch)}</button>`).join('')}</div>
        <label class="writing-exam-label" for="wxText">${esc(l.yourText)}</label><textarea id="wxText" class="writing-exam-text" lang="${c.target}" rows="10" maxlength="6000" autocomplete="off" spellcheck="false">${esc(a.text)}</textarea>
        <div class="writing-exam-meta"><span id="wxCount" class="${count>=c.minWords?'is-enough':''}" aria-live="polite">${count} ${esc(l.words)} · ${esc(fill(l.minHint,{min:c.minWords}))}</span><span id="wxSaved" role="status">${a.text?esc(l.saved):''}</span></div>
        <div id="wxConfirm" class="writing-exam-confirm" role="alert">${confirmOpen?confirmHtml():''}</div>
        <div class="writing-exam-actions"><button type="button" class="secondary-btn" id="wxOverview">← ${esc(l.overview)}</button><button type="button" class="primary-btn" id="wxSubmit" ${a.text.trim()?'':'disabled'}>${esc(l.submit)}</button></div></section>`);
    }
    function confirmHtml(){
      const l=L(),count=words(w.active.text);
      return `<p>${esc(fill(l.confirm,{w:count,min:c.minWords,short:count<c.minWords?l.shortWarn:''}))}</p><div class="writing-exam-actions"><button type="button" class="secondary-btn" id="wxCancel">${esc(l.keepEditing)}</button><button type="button" class="primary-btn" id="wxConfirmSubmit">${esc(l.confirmSubmit)}</button></div>`;
    }
    function assess(){
      const l=L(),a=w.active,t=task(courseId,a.taskId),crit=criteria(courseId,t,getLang());
      return shell(`<section class="card"><span class="writing-exam-eyebrow">${esc(l.title)} · ${c.exam}</span><h2>${esc(l.assessTitle)}</h2>${taskBlock(t)}<div class="writing-exam-compare"><div><span class="writing-exam-label">${esc(l.ownTitle)} · ${words(a.text)} ${esc(l.words)}</span><p class="writing-exam-own" lang="${c.target}">${esc(a.text)}</p></div><div><span class="writing-exam-label">${esc(l.modelTitle)}</span><p class="writing-exam-model" lang="${c.target}">${esc(t.model)}</p></div></div><p>${esc(l.assessIntro)}</p>
        <div class="writing-exam-rubric">${crit.map((label,i)=>`<label><span><b>${i+1}.</b> <span ${i<t.points.length?`lang="${c.target}"`:''}>${esc(label)}</span></span><select data-wx-rating="${i}"><option value="">${esc(l.rate)}</option>${[2,1,0].map(n=>`<option value="${n}" ${ratings[i]===n?'selected':''}>${esc(l['r'+n])}</option>`).join('')}</select></label>`).join('')}</div>
        <p class="writing-exam-error" id="wxRatingError" role="alert"></p><button type="button" class="primary-btn" id="wxComplete">${esc(l.save)} →</button></section>`);
    }
    function result(){
      const l=L(),h=w.history[resultIndex],t=task(courseId,h.taskId),r=evaluate(courseId,h.taskId,h.text,h.ratings)||{...h,enoughWords:h.words>=c.minWords,enoughPoints:h.points*10>=h.max*7,noZero:h.ratings.every(x=>x>0)};
      const crit=t?criteria(courseId,t,getLang()):[];
      const check=(ok,text)=>`<li class="${ok?'is-ok':'is-miss'}"><span aria-hidden="true">${ok?'✓':'✗'}</span>${esc(text)}</li>`;
      return shell(`<section class="card writing-exam-result ${h.passed?'is-passed':''}"><span class="writing-exam-eyebrow">${esc(h.passed?l.passed:l.notPassed)}</span><h2>${esc(l.resultTitle)}</h2>${t?`<p class="muted">${esc(l.task)}: ${title(t)}</p>`:''}<div class="writing-exam-score"><strong>${h.points}<small>/${h.max}</small></strong><span>${esc(l.points)}</span></div>
        <ul class="writing-exam-checks">${check(r.enoughWords,fill(l.checkWords,{w:h.words,min:c.minWords}))}${check(r.enoughPoints,l.checkPoints)}${check(r.noZero,l.checkZero)}</ul>
        ${crit.length?`<ol class="writing-exam-breakdown">${crit.map((label,i)=>`<li><span>${esc(label)}</span><b>${h.ratings[i]}/2</b></li>`).join('')}</ol>`:''}
        ${h.passed?'':`<p>${esc(l.tipsFail)}</p>`}<div class="writing-exam-compare"><div><span class="writing-exam-label">${esc(l.ownTitle)}</span><p class="writing-exam-own" lang="${c.target}">${esc(h.text)}</p></div>${t?`<div><span class="writing-exam-label">${esc(l.modelTitle)}</span><p class="writing-exam-model" lang="${c.target}">${esc(t.model)}</p></div>`:''}</div>
        <p class="muted">${esc(l.selfNote)}</p><div class="writing-exam-actions"><button type="button" class="secondary-btn" id="wxOverview">${esc(l.overview)}</button><button type="button" class="primary-btn" id="wxAgain">${esc(l.again)}</button></div></section><button type="button" class="secondary-btn writing-exam-back" id="wxHome">← ${esc(l.home)}</button>`);
    }
    function go(next){screen=next;confirmOpen=false;draw();window.scrollTo?.({top:0,behavior:'smooth'});}
    function draw(){
      if(screen==='write'&&!w.active)screen='overview';
      if(screen==='assess'&&!w.active?.submittedAt)screen=w.active?'write':'overview';
      if(screen==='result'&&!w.history[resultIndex])screen='overview';
      view.innerHTML=({overview,write,assess,result}[screen])();
      const $=s=>view.querySelector(s);
      $('#wxHome')?.addEventListener('click',leave);
      $('#wxOverview')?.addEventListener('click',()=>{if(saveTimer)persist();go('overview');});
      $('#wxAgain')?.addEventListener('click',()=>go('overview'));
      view.querySelectorAll('[data-wx-task]').forEach(b=>b.addEventListener('click',()=>{const a=startTask(state,courseId,b.dataset.wxTask);persist();if(a?.submittedAt){ratings=[];go('assess');}else go('write');}));
      view.querySelectorAll('[data-wx-result]').forEach(b=>b.addEventListener('click',()=>{resultIndex=+b.dataset.wxResult;go('result');}));
      const area=$('#wxText');
      if(area){
        const status=$('#wxSaved'),count=$('#wxCount'),submitBtn=$('#wxSubmit');
        const changed=()=>{updateDraft(state,area.value);const n=words(area.value);count.textContent=`${n} ${L().words} · ${fill(L().minHint,{min:c.minWords})}`;count.classList.toggle('is-enough',n>=c.minWords);submitBtn.disabled=!area.value.trim();status.textContent=L().saving;clearTimeout(saveTimer);saveTimer=setTimeout(()=>{status.textContent=persist()?L().saved:L().saveError;},500);if(confirmOpen){$('#wxConfirm').innerHTML=confirmHtml();wireConfirm();}};
        area.addEventListener('input',changed);
        area.addEventListener('blur',()=>{if(saveTimer)status.textContent=persist()?L().saved:L().saveError;});
        view.querySelectorAll('[data-wx-char]').forEach(b=>b.addEventListener('click',()=>{const s=area.selectionStart??area.value.length,e=area.selectionEnd??s;area.value=area.value.slice(0,s)+b.dataset.wxChar+area.value.slice(e);area.focus();area.setSelectionRange?.(s+b.dataset.wxChar.length,s+b.dataset.wxChar.length);changed();}));
        submitBtn.addEventListener('click',()=>{if(!area.value.trim())return;confirmOpen=true;$('#wxConfirm').innerHTML=confirmHtml();wireConfirm();$('#wxConfirmSubmit')?.focus();});
      }
      function wireConfirm(){
        $('#wxCancel')?.addEventListener('click',()=>{confirmOpen=false;$('#wxConfirm').innerHTML='';area?.focus();});
        $('#wxConfirmSubmit')?.addEventListener('click',()=>{updateDraft(state,area.value);if(submit(state)){ratings=[];persist();go('assess');}});
      }
      wireConfirm();
      view.querySelectorAll('[data-wx-rating]').forEach(sel=>sel.addEventListener('change',()=>{const i=+sel.dataset.wxRating;ratings[i]=sel.value===''?undefined:+sel.value;}));
      $('#wxComplete')?.addEventListener('click',()=>{
        const t=task(courseId,w.active.taskId),n=t.points.length+2,list=Array.from({length:n},(_,i)=>ratings[i]);
        if(list.some(r=>!Number.isInteger(r))){$('#wxRatingError').textContent=L().missingRatings;return;}
        const entry=complete(state,courseId,list);if(!entry)return;persist();resultIndex=w.history.length-1;go('result');
      });
    }
    draw();
    return cleanup;
  }

  window.A1WritingExam={VERSION,COURSES,words,criteria,evaluate,ensure,isUnlocked,startTask,updateDraft,submit,complete,homeHtml,wireHome,render};
})();
