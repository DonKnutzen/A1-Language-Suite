/* Original Cambridge-oriented format practice. Adaptations are named in the UI. */
(() => {
const packs=[];
const choice=(q,answer,wrong,why)=>({q,answer,options:[answer,...wrong],why});
const gap=(q,answer,why,accept=[])=>({q,answer,accept,why});
const add=(id,title,instructions,text,questions,audio=[])=>packs.push({id,title,instructions,text,questions,audio});
add('r1','Reading 1 · Kurze Mitteilungen','Lies jede Mitteilung und wähle ihre Hauptaussage.','',[
choice('Library notice: Return books through the side entrance while repairs continue. The main doors are closed.','Use a different entrance to return books.',['Keep all books until repairs end.','The entire library service has stopped.'],'Der Aushang nennt einen alternativen Eingang, kein Ende der Rückgabe.'),
choice('Hi Jo, I can collect you from the station if your train arrives before six. Otherwise, please take a taxi.','Jo needs another way to travel if the train arrives late.',['Jo must take a taxi at any arrival time.','The sender cannot collect Jo before six.'],'Die Abholung hängt ausdrücklich von der Ankunftszeit ab.'),
choice('Workshop: Materials provided. Bring clothes you do not mind getting dirty.','Participants should wear suitable clothes.',['Participants must buy their own materials.','Only dirty clothes will be accepted.'],'Material ist vorhanden; die Bitte betrifft Kleidung für die Arbeit.'),
choice('Tickets bought online include entry to the garden, but guided tours must be booked separately.','A guided tour requires an additional booking.',['Online tickets exclude the garden.','Every ticket includes a guided tour.'],'Separat buchen bedeutet nicht automatisch einen bestimmten Zusatzpreis.'),
choice('Sam, I have left your parcel with Noor next door. Please collect it before she leaves on Friday.','Sam should get the parcel from a neighbour before Friday.',['The parcel will arrive after Friday.','Noor needs Sam to post the parcel.'],'Das Paket wurde bereits bei der Nachbarin hinterlegt.')]);
const offers=`A · Riverside Art: Saturday mornings, painting outdoors, all materials supplied. Beginners welcome. £12 per meeting. No indoor alternative in rain.
B · Library Conversation: Tuesday evenings, free English speaking practice for intermediate adults. Step-free access. No written homework.
C · Fast Fitness: Daily lunchtime running group for experienced runners. Free. Routes include steep hills.
D · Kitchen Together: Sunday afternoons, vegetarian cooking for beginners. Work in pairs. Ingredients included in the £15 fee.
E · Online Writing: Thursday evenings, B1 emails and stories with tutor feedback. £20 monthly. Recordings available after meetings.
F · Advanced Art: Wednesday afternoons, professional portfolio preparation. Own materials required. £40 per meeting.
G · Gentle Walks: Monday mornings, short flat routes with regular rest stops. Free. Led by a local volunteer.
H · City History: Friday evenings, expert lectures followed by questions. £8. Requires confident listening; no language teaching.`;
const match=(q,a,why)=>({...choice(q,a,['A','B','C','D','E','F','G','H'].filter(x=>x!==a),why),unique:true});
add('r2','Reading 2 · Passende Angebote','Ordne jeder Person das Angebot zu, das ALLE Anforderungen erfüllt. Die acht Angebote dürfen zur Orientierung mehrfach angesehen werden.',offers,[
match('Lena works by day, needs free intermediate speaking practice and uses a wheelchair.','B','Nur B kombiniert Abendtermin, Kostenfreiheit, Sprechtraining und stufenlosen Zugang.'),
match('Omar wants feedback on B1 writing after work and sometimes misses live meetings.','E','E bietet Schreibfeedback und Aufzeichnungen am Abend.'),
match('Pia is free on Sunday afternoons and wants to learn vegetarian cooking with someone else.','D','D erfüllt Tag, Niveau, Thema und Zusammenarbeit.'),
match('Ray is a beginner who can pay a small fee and wants to paint outside at weekends.','A','A ist ein Anfängerangebot im Freien am Samstag.'),
match('Bo wants a free weekday-morning walk, cannot manage hills and needs breaks.','G','G bietet flache kurze Wege mit Pausen am Montagmorgen.')]);
const long=`When I moved to a new town, I thought joining a community project would be a quick way to make friends. A neighbour suggested the repair café, where volunteers help people mend everyday objects. I imagined friendly conversations over coffee. On my first visit, however, everyone seemed too busy to talk. I stood beside a table for twenty minutes and went home feeling that I didn't belong.

A week later, the organiser phoned to ask why I hadn't returned. I explained how I had felt. She was surprised: the team had assumed I was confidently observing because I hadn't asked for a task. She invited me to try again, this time helping her welcome visitors. I agreed, though I wasn't expecting much.

At the entrance, I soon discovered that many visitors felt as uncertain as I did. Some were embarrassed about bringing a cheap broken object. Others worried that they would be expected to repair it themselves. I could explain that the point was to learn together, not to prove anything. It was easier to talk when I had a useful role.

Over the next few months, I learned simple repairs and got to know the team. I still don't understand every tool, and I probably never will. That no longer bothers me. The café needs people who can listen and organise as much as people who can fix machines.

I used to think a welcoming group would notice every newcomer immediately. Now I understand that friendly people can still miss someone who needs help. Our team has introduced a named welcome volunteer for each session. I am glad I returned, but I am also glad I explained what had gone wrong. Giving a place a second chance shouldn't mean pretending the first experience was perfect.`;
add('r3','Reading 3 · Längerer Text','Lies den Bericht. Achte auf Details, Entwicklung und Haltung der schreibenden Person.',long,[
choice('Why did the writer first join?','To make social connections',['To prove technical expertise','To find paid work'],'Das ursprüngliche Ziel war, neue Freunde zu finden.'),
choice('What caused the first misunderstanding?','The team misinterpreted the writer’s silence',['The organiser refused help','The writer criticised the tools'],'Das stille Beobachten wurde als Selbstsicherheit verstanden.'),
choice('Why did the entrance role help?','It provided a clear purpose for conversation',['It avoided all contact with visitors','It required advanced repair skills'],'Eine konkrete hilfreiche Aufgabe erleichterte Gespräche.'),
choice('How does the writer now feel about limited technical knowledge?','It does not prevent a valuable contribution',['It makes volunteering pointless','It must be hidden from everyone'],'Organisation und Zuhören werden ebenfalls gebraucht.'),
choice('Which statement best represents the writer’s final view?','Trying again and giving honest feedback can improve a group',['Every bad experience should be ignored','Newcomers alone are responsible for feeling welcome'],'Der Text verbindet zweite Chance und berechtigte Rückmeldung.')]);
const sentences=[
'A · This made it difficult for people who worked during the day to attend.',
'B · The new time was popular, but it created a different problem.',
'C · To solve this, members began working in pairs.',
'D · Seeing those examples helped beginners feel less nervous.',
'E · That is why the group now asks for feedback after every session.',
'F · The building had been demolished ten years earlier.',
'G · Nobody in the town had ever used a camera.',
'H · She therefore sold all the books immediately.'
];
add('r4','Reading 4 · Fehlende Sätze','Wähle für jede Lücke einen Satz aus A–H. Drei Sätze bleiben übrig.',
`Our photography club originally met at two on Wednesday afternoons. [1] We therefore moved the meetings to the evening. [2] The room was now too crowded for the tutor to help everyone individually. [3] Experienced photographers could then explain simple techniques while the tutor discussed harder questions.
We also put a selection of early attempts beside finished pictures. [4] They could see that progress usually involved mistakes. Not every change worked immediately, and members sometimes had different needs. [5] We have learned that a useful club keeps listening rather than assume one arrangement will suit everyone forever.

${sentences.join('\n')}`,
['A','B','C','D','E'].map((a,i)=>choice('Lücke '+(i+1),a,['A','B','C','D','E','F','G','H'].filter(x=>x!==a),[
'Die Tageszeit erklärt direkt die Schwierigkeiten Berufstätiger.',
'The new time bezieht sich auf den Abend; danach folgt das neue Raumproblem.',
'This verweist auf die fehlende individuelle Betreuung; Paare lösen sie.',
'Those examples verweist auf die gezeigten frühen und fertigen Bilder.',
'That is why verbindet unterschiedliche Bedürfnisse mit regelmäßiger Rückmeldung.'
][i])));
add('r5','Reading 5 · Wortwahl im Kontext','Wähle das Wort, das in Bedeutung und fester Verbindung passt.',
'Last year I decided to [1] part in a local project. At first, I found it difficult to [2] a decision about my role. A volunteer gave me useful [3] and suggested helping at reception. I soon [4] progress because I practised every week. Now I look [5] to each meeting. The experience has had a positive [6] on my confidence.',[
choice('Lücke 1','take',['make','do','give'],'take part in = teilnehmen an'),
choice('Lücke 2','make',['do','get','hold'],'make a decision = eine Entscheidung treffen'),
choice('Lücke 3','advice',['advise','advices','advising'],'Advice ist hier ein unzählbares Nomen; advise ist ein Verb.'),
choice('Lücke 4','made',['did','took','gave'],'make progress = Fortschritte machen'),
choice('Lücke 5','forward',['ahead','after','around'],'look forward to = sich freuen auf'),
choice('Lücke 6','effect',['effort','event','affect'],'Have an effect on = eine Wirkung haben auf; affect ist hier das Verb.')]);
add('r6','Reading 6 · Ein Wort pro Lücke','Setze genau EIN Wort je Lücke ein. Achte auf Struktur und Zusammenhang.',
'I have lived here [1] 2022. At first, I did not know [2] to meet people. A neighbour invited me to a group [3] meets every Friday. I was nervous, [4] everyone was friendly. If I stayed at home every week, I [5] not know them now. I look forward [6] seeing them each week.',[
gap('Lücke 1','since','Seit einem Anfangszeitpunkt steht since.'),
gap('Lücke 2','how','How to meet people = wie man Leute kennenlernen kann.', ['where']),
gap('Lücke 3','which','Das Relativpronomen ist Subjekt zu group.', ['that']),
gap('Lücke 4','but','Der Gegensatz verbindet zwei Hauptsätze.', ['yet']),
gap('Lücke 5','would','Hypothetisches Ergebnis in der Gegenwart: would not know.'),
gap('Lücke 6','to','Feste Verbindung look forward to.')]);
const visual=[
['How will they travel?','m:I planned to drive, but the car is being repaired. The train would be faster, yet the station is too far away. We have decided to take the bus from outside the library.','🚌 Bus','🚆 Train','🚗 Car','Die endgültige Entscheidung ist der Bus.'],
['What will she bring?','f:I was going to bake a cake, but I haven’t got enough time. They already have plenty of bread. I’ll take some apples from our garden instead.','🍎 Apples','🍰 Cake','🍞 Bread','Instead markiert die tatsächliche Änderung zu Äpfeln.'],
['Where will they meet?','m:The café is closed today. Let’s meet outside the library rather than at the cinema, because it’s nearer the bus stop.','📚 Library','☕ Café','🎬 Cinema','Der neue Treffpunkt liegt vor der Bibliothek.'],
['What activity did he choose?','m:I considered swimming, but the pool was crowded. Running felt too tiring after work, so I went for a gentle cycle ride by the river.','🚲 Cycling','🏊 Swimming','🏃 Running','Er berichtet die tatsächlich gewählte Radtour.'],
['What did she buy?','f:The umbrella looked useful, but I already had one. I tried on a hat, then realised I needed gloves more. I bought the warmest pair.','🧤 Gloves','☂️ Umbrella','👒 Hat','A pair verweist hier auf die zuletzt benötigten Handschuhe.'],
['Which animal was in the garden?','m:I heard a noise and expected to see the neighbour’s dog. It wasn’t the cat either. A fox was standing beside the shed before it ran away.','🦊 Fox','🐕 Dog','🐈 Cat','Hund und Katze werden ausgeschlossen.'],
['What is the weather like now?','f:It rained all morning, and snow is possible tonight. At the moment the clouds have cleared and there’s bright sunshine, so let’s go out now.','☀️ Sunny','🌧️ Rainy','🌨️ Snowy','Gefragt ist jetzt, nicht der Morgen oder die Nacht.']
];
add('l1','Listening 1 · Kurze Hörsituationen','Sieben kurze Texte. Hier ersetzen beschriftete Symbole die Prüfungsbilder. Du kannst jede Aufnahme zweimal starten.','',visual.map(([q,,a,b,c,why],audioIndex)=>({...choice(q,a,[b,c],why),audioIndex})),visual.map(([,s])=>s));
const selected=[13,14,15,16,17,18].map(id=>window.EN_B1_SKILLS.scenes[id][0]);
add('l2','Listening 2 · Sinn und Absicht','Sechs kurze Aufnahmen aus dem Kurs. Wähle die passende Aussage. Wiederholte Kursaufnahmen dienen der Formatübung, nicht als unabhängiger Prüfungstest.','',selected.map((s,i)=>({...choice(s.fields[0].label,s.fields[0].answer,s.fields[0].options.slice(1),'Die Aussage ergibt sich aus dem jeweiligen Hörtext.'),audioIndex:i})),selected.map(s=>s.turns));
add('l3','Listening 3 · Notizen ergänzen','Höre die Ansage zweimal. Ergänze kurze Angaben; Zahlen dürfen als Ziffern geschrieben werden.','Community repair afternoon · Information sheet',[
gap('Day of the event','Saturday','Der aktuelle Veranstaltungstag ist Samstag.'),
gap('Place: community ...','hall','Es findet in der community hall statt.'),
gap('Starting time','10:30','Der Beginn wurde von zehn auf halb elf verschoben.',['10.30','half past ten','ten thirty']),
gap('Bring proof of ... for electrical items','purchase','Kaufbeleg: proof of purchase.'),
gap('Maximum number of items per person','two','Pro Person zwei Gegenstände.',['2']),
gap('Register by','Thursday','Die Anmeldung endet Donnerstag.')],
['f:Here is the final information for our repair afternoon. It will take place on Saturday, not Sunday as first advertised. We are using the community hall because the library is being painted. Doors will open at half past ten; the earlier announcement said ten, but volunteers need more preparation time. If you bring an electrical item, please bring proof of purchase if you still have it. We cannot promise a repair, but we can often explain the problem. Each person may bring a maximum of two items so everyone has a fair chance. There is no entry charge, although donations are welcome. Please register by Thursday. That gives us Friday to arrange the right tools and volunteers. You can register by phone or through the community centre website.']);
add('l4','Listening 4 · Interview und Haltung','Höre das Interview zweimal und achte auf Gründe, Gefühle und veränderte Ansichten.','Interview: A new walking group',[
choice('Why did Nina first join?','To meet local people',['To train for a race','To learn to read maps'],'Sie nennt neue Kontakte, nicht Wettkampf oder Kartenlesen.'),
choice('What surprised her on the first walk?','The relaxed pace',['The expensive equipment','The large distance'],'Sie hatte ein höheres Tempo erwartet.'),
choice('Why did she almost stop?','She worried about asking others to wait',['She disliked everyone','She moved abroad'],'Sie hatte Sorge, andere aufzuhalten.'),
choice('What helped her continue?','The leader explained the group’s purpose',['She bought a faster bicycle','A friend paid her to stay'],'Die Erklärung, dass die Gemeinschaft zählt, änderte ihre Sicht.'),
choice('What has she learned about equipment?','Basic suitable items are enough',['The newest equipment is essential','Equipment never matters'],'Sie nennt passende Schuhe und Wetterschutz, aber keine teuren Produkte.'),
choice('What does she recommend to newcomers?','Explain what support they need',['Pretend to be experienced','Avoid asking questions'],'Offene Kommunikation ermöglicht passende Unterstützung.')],
['m:Why did you join the walking group, Nina?\nf:I had just moved here and wanted to meet people. I wasn’t training for anything. I expected everyone to walk quickly, so the relaxed pace surprised me.\nm:Did you feel comfortable straight away?\nf:Not entirely. On the second walk I needed more breaks and worried that I was making everyone wait. I almost stopped going. But the leader explained that the group existed to help people enjoy being outside together, not to finish first.\nm:Did that change your view?\nf:Yes. I realised I could say what I needed instead of pretending I was fine. Other members then admitted they liked the breaks too.\nm:Do people need much equipment?\nf:Suitable shoes and something for the weather matter. But you don’t need the newest or most expensive things. I borrowed a jacket for the first month.\nm:What would you say to a new member?\nf:Tell the leader about any worries. You don’t need to apologise for being new. A useful group can only support people when it understands what they need.']);
window.EN_B1_EXAM={packs};
})();
