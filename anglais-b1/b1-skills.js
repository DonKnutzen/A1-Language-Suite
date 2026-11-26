/* Independent B1 texts: regular listening, two harder recordings and reading.
   Questions contrast plausible meanings; only the recording determines facts. */
(() => {
  const lessons=window.EN_B1_AUTHORING.lessons;
  const scenes={},reading=[];
  const fields=s=>s.trim().split('\n').map(row=>{const[q,a,b,c]=row.trim().split('|');return {label:q,q,answer:a.split('~')[0],accept:a.split('~').slice(1),options:[a.split('~')[0],b,c],o:[a.split('~')[0],b,c]};});
  const scene=(speech,questions)=>({turns:speech.split('\n').map(line=>({speaker:line[0]==='f'?'A':'B',gender:line[0]==='f'?'female':'male',text:line.slice(2)})),fields:fields(questions)});
  function add(id,task,points,model,text,questions,...audio){
    const l=lessons.find(l=>l.id===id);l.points=points.split('|');l.model=model;
    l.transfer={speaking:'Sprich 1–2 Minuten: '+task+' Begründe deine Antwort und ergänze ein Beispiel.',writing:'Schreibe ungefähr 100 Wörter. '+task};
    l.writingTask=task;
    scenes[id]=[scene(audio[0],audio[1]),scene(audio[2],audio[3]),scene(audio[4],audio[5])];
    reading.push({id,text,fields:fields(questions)});
  }
  add(1,'Antworte Alex auf die Frage nach deinem Alltag und einem neuen Hobby. Beschreibe deine übliche Woche, eine vorübergehende Aktivität und deine Gründe dafür.',
  'Beschreibe mindestens eine Gewohnheit.|Nenne eine aktuelle oder vorübergehende Aktivität.|Begründe dein Interesse und stelle eine passende Rückfrage.',
  `Hi Alex, Thanks for asking about my week. I usually work in a small office near my home, so I walk there most mornings. At weekends, I enjoy meeting friends and listening to music. This month, however, I'm taking a photography course. I'm learning how to take pictures outdoors, although the weather isn't always helpful. I chose it because I want to notice more about the place where I live. Our group is friendly, and we sometimes practise together after class. What do you usually do in your free time? Would you like to join us for a walk? Best wishes, Robin`,
  `Nora joined a local choir because she wanted to meet people after moving house. She expected singing lessons, but the group spends most evenings preparing for community performances. At first she was disappointed: she wanted help with her voice rather than a busy calendar. Now she enjoys the shared purpose, although she still takes a separate singing lesson once a month. She says the choir hasn't made her a great singer, but it has made the new town feel like home. She recommends trying a group twice before deciding whether it suits you.`,
  `Why did Nora originally join?|To meet people|To prepare for a professional audition|To teach singing
  What changed about her attitude?|She began to value the group's shared purpose|She stopped enjoying performances|She decided singing lessons were useless
  What is her advice?|Give a group more than one chance|Choose only groups you already know|Avoid groups with performances`,
  `f:I normally work five days a week, but I'm working four days this month because I'm helping at a community garden. I joined to spend more time outdoors, rather than to learn about vegetables. We meet on Wednesday evenings, although Saturday used to be our usual day. I enjoy working with other people most. The tools are old, but that doesn't bother me. What I find difficult is getting there before it gets dark.`,
  `Why did the speaker join?|To spend time outdoors|To become a professional gardener|To sell vegetables
  When does the group meet now?|Wednesday evenings|Saturday mornings|Friday evenings
  What does she enjoy most?|Working with other people|Using modern tools|Working alone
  What is the main difficulty?|Arriving before dark|Paying for equipment|Finding enough plants`,
  `m:I usually play football after work, but this term I'm trying a drama class. I wanted to become more confident when speaking to groups. The class is on Thursday, not Tuesday as the website first said. I expected to learn lines immediately, but we began with movement games. They felt strange at first. Now I enjoy them because nobody worries about making mistakes. I still find remembering people's names harder than performing.`,
  `What new activity is he doing?|a drama class~drama|football coaching|a language class
  Why did he choose it?|to become more confident~confidence|to get fit|to earn money
  Which day is the class?|Thursday|Tuesday|Saturday
  What does he find hardest?|remembering names~remembering people's names|performing|movement games`,
  `f:My book group normally meets at the library, but we're meeting online while the building is being repaired. I thought I would dislike it because I spend all day at a computer. However, more members can join now, including a friend who moved away. We discuss one novel each month. We don't choose books by voting; each member takes a turn. The next discussion is on the twelfth, and I'm leading it for the first time.`,
  `Where does the group meet temporarily?|online|at a café|in a school
  What is one benefit of the change?|more members can join~more people can join|books are cheaper|meetings are shorter
  How are books selected?|members take turns~by taking turns|by voting|by the librarian
  What will the speaker do next time?|lead the discussion~lead it|choose every book|repair the building`);

  add(2,'Antworte einer Sprachpartnerin über deine Lern- und Arbeitserfahrung. Nenne eine Erfahrung, ein Ereignis mit Zeitpunkt und dein nächstes Ziel.',
  'Nenne Erfahrung mit Gegenwartsbezug.|Ergänze ein abgeschlossenes Beispiel und Dauer.|Erkläre ein Ziel und frage nach der Erfahrung der anderen Person.',
  `Hi Sara, I've worked in customer service for three years, and I've learned a lot about communicating with different people. Last September, I helped a visitor who couldn't find his hotel. We spoke in English, and I managed to explain the route without using my phone. That experience encouraged me to study more regularly. I've attended an evening course since January, but I haven't taken an exam yet. My next goal is to speak more naturally in meetings. I'm planning to practise with a colleague during lunch. Have you ever needed English at work? I'd love to hear about your experience. Best wishes, Lee`,
  `When Ben lost his job, he signed up for an online design course. He had expected the videos to be the most useful part. Instead, the weekly feedback from other learners helped him improve fastest. He completed the course in June and applied for several jobs, but he didn't find work immediately. He now works part time for a small company while building a portfolio. He doesn't regret the course, though he warns people not to expect a certificate alone to guarantee a job. Practical examples of your work matter too.`,
  `What helped Ben most?|Feedback from other learners|Watching videos alone|Getting a certificate quickly
  What is he doing now?|Working part time and developing examples of his work|Waiting to start the course|Teaching design full time
  What does he warn against?|Expecting a certificate to guarantee employment|Studying with other learners|Applying to small companies`,
  `m:I've worked at this café since April. Before that, I studied engineering, but I left the course last year because I realised I preferred practical work. I've already completed food safety training here. I haven't learned to manage the orders yet; that's next month's goal. The evening shifts are tiring, although I like the team. I'm applying for an apprenticeship now, and the manager has offered to write a reference for me.`,
  `When did he start at the café?|April|Last January|Last year in September
  Why did he leave his course?|He preferred practical work|He moved abroad|He couldn't afford the books
  What has he already completed?|Food safety training|Order management training|An apprenticeship
  What support has the manager offered?|A reference|A university place|A pay rise`,
  `f:I've been a library assistant for five years. I started after completing a history degree, and I expected it to be a temporary job. However, I discovered that helping people find information was more satisfying than I had imagined. Last winter I organised my first digital skills workshop. Only six people came, but all of them asked for another session. I've just been asked to plan a monthly programme. I haven't decided on every topic yet.`,
  `How long has she worked there?|five years~5 years|six months|two years
  What did she originally expect?|a temporary job~temporary work|a management position|a teaching career
  What did she organise last winter?|a digital skills workshop~digital skills workshop|a history exhibition|a book sale
  What remains undecided?|the topics~topics|the library address|her degree subject`,
  `m:I applied for a training place in July and had an interview two weeks later. I was nervous because I'd never had an interview in English before. The first question was about teamwork, so I described a project from my previous job rather than giving a general answer. That helped me relax. They've already offered me a place, but I haven't started yet. The training begins in January, and I need to arrange accommodation before then.`,
  `When did he apply?|July|January|March
  What was new for him?|an interview in English~English interview|working in a team|applying online
  What helped him relax?|describing a real project~a real example|reading a prepared speech|asking about the salary
  What does he still need to arrange?|accommodation~a place to live|another interview|a reference`);

  add(3,'Schreibe Jamie eine E-Mail zur Planung eines gemeinsamen Abendessens: schlage Essen vor, berücksichtige eine Nussallergie und kläre Einkauf oder Reservierung.',
  'Schlage eine Mahlzeit oder ein Lokal vor.|Berücksichtige die Nussallergie ausdrücklich.|Vereinbare einen praktischen nächsten Schritt mit Rückfrage.',
  `Hi Jamie, How about having dinner at my place on Saturday? I'd rather cook together than go to an expensive restaurant. We could make a vegetable curry with rice, although we should check every ingredient because of your nut allergy. I already have some rice and a few vegetables, but there isn't much milk left. Could you bring a bottle and perhaps some fruit for dessert? I'll buy the other ingredients on Friday. If you'd prefer to eat out, we can call the new café and ask about their allergy information before booking. Would six o'clock suit you? Let me know what you think. Best wishes, Morgan`,
  `Green Table now offers two evening menus. The cheaper menu includes a main course and tap water, while dessert costs extra. The second menu includes a main course, dessert and a hot drink. Both have vegetarian choices. Customers with allergies are asked to contact the café before booking because ingredients may change daily. Groups of more than six cannot use the online form and must phone instead. A reviewer liked the friendly staff but said the room became noisy after eight. She recommends an early table if you want a quiet conversation.`,
  `What is included in both menus?|A main course|Dessert|A hot drink
  What should a customer with an allergy do?|Contact the café before booking|Choose any vegetarian dish without asking|Wait until after ordering
  Who would prefer an early booking?|Someone wanting a quiet conversation|Someone wanting a late party|Someone ordering only coffee`,
  `f:Shall we eat out for your birthday?
m:I'd rather cook at home. Restaurants are crowded on Fridays.
f:How about making pasta? We have plenty of tomatoes.
m:Good idea, but remember that Maya is allergic to nuts. Let's check the sauce ingredients.
f:I'll make it myself, so we can be sure. Could you buy a little cheese and some salad?
m:Yes. We don't need dessert; Maya has offered to bring a cake.`,
  `Where will they eat?|At home|At a restaurant|At Maya's workplace
  What will the main meal be?|Pasta|Curry|Soup
  What needs checking?|Sauce ingredients|The restaurant address|The cake price
  Who will provide dessert?|Maya|The first speaker|A restaurant`,
  `m:We need to change our dinner booking. Two colleagues can't come, so there will be five of us instead of seven. The restaurant can keep our table, but they need us to arrive at half past six rather than seven. I asked about vegetarian food, and they have several choices. They also said we should mention any allergies when we order. I'm going to phone again because I'd prefer to check those details before we arrive.`,
  `How many guests will attend?|five~5|seven|six
  What is the new arrival time?|6:30~18:30~half past six|7:00|6:00
  What food choices are available?|vegetarian choices~vegetarian food|only meat dishes|only sandwiches
  Why will he phone again?|to check allergy details~allergies|to cancel completely|to request a bigger table`,
  `f:I thought the cooking class would be mainly demonstrations, but everyone prepares a complete meal in pairs. This week we made soup using vegetables that shops would otherwise throw away. I was surprised how fresh they were. We didn't follow exact quantities; the teacher wanted us to taste and adjust the seasoning. The best part was eating together afterwards. Next time I'd bring a container, because we made much more than we could eat.`,
  `How do participants work?|in pairs~pairs|alone|in groups of six
  Where did the vegetables come from?|shops~local shops|private gardens|a restaurant kitchen
  What did the teacher encourage?|tasting and adjusting seasoning~tasting the food|measuring every gram|following a video
  What would she bring next time?|a container~container|a recipe book|her own knife`);

  add(4,'Schreibe eine Geschichte, die mit „I was waiting for the bus when I heard my name.“ beginnt. Erzähle die Begegnung und ihr Ende.',
  'Übernimm den vorgegebenen Anfang und entwickle ihn sinnvoll.|Verbinde Hintergrund und Ereignisse mit passenden Zeiten.|Erzähle ein nachvollziehbares Ende.',
  `I was waiting for the bus when I heard my name. At first I didn't recognise the woman across the road, but then she waved and I realised it was my old school friend, Emma. We hadn't spoken for years. While we were talking, my bus arrived, but I decided to take the next one. Emma was visiting her parents and had a free afternoon. We went to a nearby café and shared stories about our lives. Suddenly, I remembered an appointment and checked the time. Fortunately, I still had twenty minutes. We exchanged numbers before leaving and promised to meet again soon.`,
  `A delayed train brought two strangers together last month. Oliver offered his spare phone charger to a woman whose battery had died. As they talked, they discovered that both had grown up in the same small village. They didn't know each other, but their parents had been neighbours. Oliver later described the conversation as a reminder that an inconvenience can have an unexpected benefit. He still dislikes train delays, he says, but now he is less likely to put on his headphones immediately when plans go wrong.`,
  `Why did the conversation begin?|Oliver offered a charger|The woman asked about his village|They recognised each other
  What did they discover?|Their parents had lived near each other|They had attended the same class|They worked for the same company
  How has Oliver changed?|He's more open to talking during delays|He enjoys every train delay|He has stopped travelling by train`,
  `m:I was cycling home when I saw an old friend outside the station. At first I thought he was waiting for someone, but he had missed the last bus. I couldn't give him a lift on my bike, so we walked to a café while he called his sister. She was working nearby and offered to collect him after her shift. We spent an hour catching up. In the end, missing the bus gave us a chance to talk.`,
  `What was the speaker doing?|Cycling home|Waiting for a bus|Driving to work
  Why was his friend at the station?|He had missed the last bus|He was meeting his sister|He was buying a bicycle
  Where did they wait?|At a café|Inside a taxi|At the friend's home
  Who collected the friend?|His sister|The speaker's father|A colleague`,
  `f:I was looking for a museum when the rain started. I went into a small shop to ask for directions, but the owner thought I wanted to buy an umbrella. While he was showing me several, I noticed a photograph of the museum behind him and pointed at it. He laughed and explained that it had moved across town. Fortunately, his daughter was going that way and offered to show me the right bus stop.`,
  `What was she trying to find?|a museum~museum|a hotel|an umbrella shop
  What did the owner misunderstand?|why she had entered~her reason for entering|her name|the price she offered
  What helped her explain?|a photograph~a photo of the museum|a map on her phone|a guidebook
  Who showed her the bus stop?|the owner's daughter~his daughter|the owner himself|another tourist`,
  `m:We were waiting for our luggage when a man took my suitcase by mistake. I followed him, but before I reached him, he opened it and realised it wasn't his. We both laughed because our cases were identical, even down to the green ribbon on the handle. His bag appeared a few minutes later. Afterwards we compared our luggage labels carefully. Since then, I've used a bright orange strap so I can recognise mine more easily.`,
  `Where did the mistake happen?|at baggage collection~at the airport|on a train|in a hotel
  How did the man notice the mistake?|he opened the suitcase~by opening it|the speaker shouted|staff stopped him
  What made the bags particularly similar?|a green ribbon~green ribbons|different labels|orange straps
  What does the speaker use now?|an orange strap~a bright orange strap|a green suitcase|a larger label`);

  add(5,'Gib einer Freundin, die zum ersten Mal allein reist, per E-Mail Rat zu Geld, Regeln und einem sinnvollen Budget.',
  'Nenne eine Pflicht und ein Verbot eindeutig.|Gib mindestens zwei begründete Ratschläge.|Ergänze eine praktische Möglichkeit und eine Rückfrage.',
  `Hi Eva, It's exciting that you're travelling on your own. You should check your bank's charges before you leave, because withdrawing small amounts abroad can be expensive. You must keep your PIN secret, and you shouldn't carry all your cash in one place. At our local museum, you don't have to pay for entry, although special exhibitions cost extra. I'd suggest setting a daily budget for food and transport so that you can enjoy the trip without worrying. You can borrow my small travel bag if you need one. Have you checked whether your card works abroad? Let me know if I can help. Best wishes, Chris`,
  `City Museum has changed its ticket system. General admission remains free, but visitors must reserve a time online. There is no need to print the confirmation; showing it on a phone is enough. Photography is permitted in the main collection, but flash must not be used. Large bags have to be left in lockers, which require a refundable coin deposit. A donation box stands near the exit, but giving money is entirely optional. Staff say the new system is intended to reduce queues rather than limit the number of free places.`,
  `What must every visitor do?|Reserve a time|Print a ticket|Make a donation
  Which action is forbidden?|Using flash|Taking any photograph|Showing a phone confirmation
  Why was the system changed?|To reduce queues|To make admission expensive|To stop all free visits`,
  `f:Do I have to bring cash for the trip?
m:Not for the hotel; you can pay by card. But the village bus only accepts coins.
f:And is the walking tour compulsory?
m:No, you don't have to join it. You can explore on your own. You mustn't enter the old tower, though, because it's unsafe.
f:Thanks. I'll keep some money for the bus and skip the tower. Should I keep my hotel receipt?
m:Yes, in case you need proof of payment.`,
  `What requires cash?|The village bus|The hotel|The walking tour
  Is the walking tour compulsory?|No, it's optional|Yes, for everyone|Only for hotel guests
  What is forbidden?|Entering the old tower|Exploring independently|Paying by card
  Why keep the receipt?|As proof of payment|To get free bus travel|To enter the tower`,
  `m:I used to withdraw cash every day when I travelled, but the fees soon added up. Now I check the charges before choosing a machine and take out enough for several days. I still avoid carrying a large amount. Last month I borrowed money from a colleague when my card stopped working. I paid her back the next morning. My main advice is to have a second payment method, rather than depend on one card.`,
  `What caused extra costs?|withdrawal fees~fees|hotel meals|currency souvenirs
  What does he check now?|cash machine charges~charges|restaurant menus|train timetables
  Who helped when his card failed?|a colleague~colleague|a bank manager|a family member
  What is his main advice?|have a second payment method~use two payment methods|carry all savings in cash|withdraw money daily`,
  `f:The repair shop said I didn't have to pay because the fault was covered by the guarantee. However, they needed my original receipt, and a bank statement wasn't enough. I found it in an old email. They offered a replacement rather than repairing the device, which suited me because I needed it for work. I should have backed up my files earlier; transferring them from the damaged device was the only difficult part.`,
  `Why was there no charge?|the guarantee~it was covered by the guarantee|a special sale|a personal favour
  What proof did the shop require?|the original receipt~receipt|a bank statement|an identity card
  What solution was offered?|a replacement~replacement|a paid upgrade|a loan device only
  What had she failed to do earlier?|back up her files~make a backup|charge the battery|register her address`);

  add(6,'Schreibe einen kurzen Artikel für einen Freizeitblog: Vergleiche zwei Möglichkeiten, aktiver zu werden, und empfehle eine mit Gründen.',
  'Vergleiche mindestens zwei Optionen sinnvoll.|Verwende einen Vergleich und eine Aussage mit too oder enough.|Begründe eine Empfehlung mit einem konkreten Beispiel.',
  `A Better Way to Get Moving. Would you like to become more active without spending much money? I've tried both a gym and a local walking group. The gym has more equipment, but the membership is too expensive for my budget. The walking group is much cheaper and less crowded than I expected. You don't need to be fit enough for a long hike at the beginning; there is a short route for new members. I prefer exercising outdoors because I feel more relaxed afterwards. Last week we walked by the river and stopped for tea. If you enjoy conversation as well as exercise, I'd recommend giving it a try.`,
  `Aisha compared three fitness centres before joining one. The nearest was the most expensive, while the cheapest had no evening classes. She chose a centre farther away because its swimming pool opened early. After a month, however, she realised that the long journey discouraged her from going. She now pays slightly more for the nearest centre and attends twice as often. She says choosing the best equipment matters less than finding a routine you can maintain. Her advice is to try a journey at the time you would actually travel, rather than judge only by distance.`,
  `Why did Aisha first choose the distant centre?|It had an early-opening pool|It was the nearest|It had the cheapest evening classes
  Why did she change?|The journey discouraged regular visits|The pool closed permanently|The equipment became unsafe
  What does she value most now?|A routine she can keep|The largest choice of machines|The lowest possible fee`,
  `m:I tried the new sports centre yesterday. It's larger than the old one, but the changing rooms are actually smaller. The morning swimming session was quiet enough for me to practise comfortably. I wouldn't go in the evening because there are too many people then. The monthly fee is slightly higher, although classes are included. I'd rather pay a little more than queue for every machine. I'm going back on Monday to try a class.`,
  `What is smaller in the new centre?|The changing rooms|The swimming pool|The main exercise room
  When did he swim?|In the morning|In the evening|At lunchtime
  Why avoid evenings?|Too many people|No classes|Higher daily prices
  How does he feel about the fee?|The extra cost may be worthwhile|It is completely unaffordable|It is lower than before`,
  `f:I wanted to cycle to work, but I thought the hills would be too difficult. A colleague showed me a route beside the canal. It's slightly longer than the main road, yet much flatter and quieter. At first I wasn't fast enough to get to work without leaving early. After a few weeks, the journey became easier. I still take the bus when it's icy, but I prefer cycling because I arrive feeling more awake.`,
  `What worried her initially?|the hills~hills|the price of parking|the length of the working day
  What is the canal route like?|flatter and quieter~quiet and flat|shorter and steeper|busier and faster
  What changed with practice?|the journey became easier~it got easier|the route became shorter|her work started later
  When does she use the bus?|when it's icy~in icy weather|every Friday|when she wakes early`,
  `m:Our team compared two walking routes for the weekend. The coastal path has better views, but it's too exposed if the wind is strong. The forest route is less spectacular, although it has enough shelter and several places to stop. We chose the forest this time because one member is recovering from an injury. We can still enjoy the coast another month. The important thing was finding a route everyone could manage, rather than choosing the most dramatic one.`,
  `What is the advantage of the coastal route?|better views~the views|more shelter|more cafés
  What is its main drawback?|exposure to wind~strong wind|expensive entry|poor signs
  Which route did they choose?|the forest~forest route|the coast|a city walk
  Why was suitability especially important?|someone was recovering from injury~an injured member|the group had no map|everyone wanted a race`);
  window.EN_B1_SKILLS={add,scenes,reading};
})();
