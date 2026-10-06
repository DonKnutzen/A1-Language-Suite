/* Optional lesson-specific background information. Kept collapsed to avoid overloading the lesson. */
(() => {
  'use strict';
  const I={
    francais:{
      2:[
        ['Buchstabieren: wichtige Buchstabennamen',`<p>Beim Buchstabieren sagst du den <strong>Namen des Buchstabens</strong>. Besonders nützlich: <strong>G = gé</strong>, <strong>J = ji</strong>, <strong>H = hache</strong>, <strong>Q = qu</strong>, <strong>W = double vé</strong> und <strong>Y = i grec</strong>.</p><p>Akzente kannst du mitnennen: <strong>é = e accent aigu</strong>, <strong>è = e accent grave</strong>, <strong>ç = c cédille</strong>.</p>`]
      ],
      3:[
        ['Zahlen bis 69: das Grundmuster',`<p>Lerne <strong>0–20</strong> sicher. Danach werden die Zehner regelmäßig kombiniert: <em>vingt-deux</em> (22), <em>trente et un</em> (31), <em>quarante-deux</em> (42). Bei 21, 31, 41, 51 und 61 steht normalerweise <strong>et un</strong>.</p>`],
        ['70–99: die besondere Zahlenlogik',`<p><strong>70 = soixante-dix</strong> (60 + 10), <strong>80 = quatre-vingts</strong> (4 × 20), <strong>90 = quatre-vingt-dix</strong> (80 + 10). Bei genau 80 steht ein <strong>-s</strong>; mit weiterer Zahl fällt es weg: <em>quatre-vingt-un</em>.</p>`],
        ['Telefonnummern verstehen',`<p>In Frankreich werden Telefonnummern häufig in Zweiergruppen gesprochen: <em>06 12 20 30 40</em> → <em>zéro six, douze, vingt, trente, quarante</em>. Deshalb solltest du sowohl einzelne Ziffern als auch kleine Zahlengruppen erkennen.</p>`]
      ],
      4:[
        ['Uhrzeit: drei häufige Formen',`<p><em>quatre heures et quart</em> = 4:15, <em>quatre heures et demie</em> = 4:30, <em>cinq heures moins le quart</em> = 4:45. Für einen Termin steht <strong>à</strong>: <em>à dix heures</em> = „um zehn Uhr“.</p>`]
      ],
      6:[
        ['Höflich im Restaurant bestellen',`<p><strong>Je voudrais…</strong> = „Ich hätte gern…“ und <strong>s’il vous plaît</strong> = „bitte“. Für die Rechnung reicht <em>L’addition, s’il vous plaît.</em> Für eine einfache Vorliebe kannst du sagen: <em>Mon plat préféré, c’est la pizza.</em> = „Mein Lieblingsgericht ist Pizza.“</p>`]
      ],
      7:[
        ['Preise richtig verstehen',`<p><em>19,50 €</em> kann als <em>dix-neuf euros cinquante</em> gesprochen werden. Für die Frage nach dem Preis ist <strong>Combien ça coûte ?</strong> die einfachste sichere Form.</p>`]
      ],
      9:[
        ['Wegbeschreibung als Reihenfolge verstehen',`<p>Höre auf die Reihenfolge: <strong>d’abord</strong> = zuerst, <strong>puis</strong> = dann, <strong>ensuite</strong> = danach. Typische Anweisungen sind <em>allez tout droit</em>, <em>tournez à gauche / à droite</em> und <em>prenez la ligne 8</em>.</p>`]
      ],
      10:[
        ['travailler als regelmäßiges -er-Verb',`<p>Bei regelmäßigen <strong>-er-Verben</strong> fällt <em>-er</em> weg. Für diese Lektion reichen vor allem: <em>je travaille</em>, <em>tu travailles</em>, <em>il/elle travaille</em>, <em>nous travaillons</em>, <em>vous travaillez</em>, <em>ils/elles travaillent</em>.</p>`]
      ],
      12:[
        ['avoir mal à: die Formen',`<p><strong>à + le → au</strong>: <em>J’ai mal au dos.</em> · <strong>à la</strong> bleibt: <em>J’ai mal à la tête.</em> · <strong>à + les → aux</strong>: <em>J’ai mal aux dents.</em></p>`]
      ],
      13:[
        ['Wetter: welches Muster?',`<p><strong>il fait</strong> + Beschreibung: <em>il fait froid / chaud / beau</em>. <strong>il y a</strong> + Nomen: <em>il y a du vent</em>. Für Regen benutzt du das eigene Verb <em>il pleut</em>.</p>`]
      ],
      14:[
        ['Vorlieben und Aktivitäten unterscheiden',`<p><strong>aimer + Nomen:</strong> <em>J’aime le football.</em> · <strong>aimer + Infinitiv:</strong> <em>J’aime voyager.</em> Für Aktivitäten begegnen dir häufig <em>faire du sport</em> und <em>jouer au tennis</em>.</p>`]
      ],
      16:[
        ['Zusage und Absage als feste Sätze',`<p><em>Oui, avec plaisir.</em> = „Ja, gerne.“ · <em>Ça me va.</em> = „Das passt mir.“ · <em>Je suis désolé, je ne peux pas venir.</em> = „Tut mir leid, ich kann nicht kommen.“</p>`]
      ],
      17:[
        ['Typische Formularfelder',`<div class="grammar-table-wrap"><table class="grammar-table"><tbody><tr><td><strong>Nom</strong></td><td>Nachname</td></tr><tr><td><strong>Prénom</strong></td><td>Vorname</td></tr><tr><td><strong>Date de naissance</strong></td><td>Geburtsdatum</td></tr><tr><td><strong>Nationalité</strong></td><td>Staatsangehörigkeit</td></tr><tr><td><strong>Adresse électronique</strong></td><td>E-Mail-Adresse</td></tr><tr><td><strong>Signature</strong></td><td>Unterschrift</td></tr></tbody></table></div>`],
        ['Kurze Nachricht: was wirklich nötig ist',`<p>Für A1 reicht eine klare Struktur: <strong>Anrede → wichtige Information → ggf. Frage/Bitte → Gruß</strong>. Kurze, korrekte Sätze sind besser als komplizierte Formulierungen.</p>`]
      ],
      18:[
        ['Vier Sätze für Verständnisprobleme',`<p><em>Pouvez-vous répéter, s’il vous plaît ?</em> = „Können Sie bitte wiederholen?“ · <em>Plus lentement, s’il vous plaît.</em> = „Bitte langsamer.“ · <em>Qu’est-ce que ça veut dire ?</em> = „Was bedeutet das?“ · <em>Comment dit-on … en français ?</em> = „Wie sagt man … auf Französisch?“</p>`]
      ],
      22:[
        ['Passé composé: nur das Muster dieser Lektion',`<p>Für die hier geübten abgeschlossenen Handlungen verwendest du <strong>avoir + Partizip</strong>: <em>j’ai travaillé</em>, <em>nous avons mangé</em>, <em>elle a visité</em>. Du musst in dieser Lektion noch nicht alle Vergangenheitsformen und Ausnahmen beherrschen.</p>`]
      ],
      23:[
        ['Rezeptmengen lesen',`<p><strong>Konkrete Menge + de:</strong> <em>200 grammes de farine, un litre de lait</em>. <strong>Nicht abgezählte Menge:</strong> <em>du sucre, de la farine, de l’eau</em>. In Anweisungen begegnen dir Formen wie <em>ajoutez</em> („geben Sie hinzu“) und <em>mélangez</em> („mischen Sie“).</p>`]
      ],
      24:[
        ['Länder: Ziel und Herkunft',`<p><strong>Ziel:</strong> <em>en France, en Allemagne, au Canada, aux États-Unis</em>. <strong>Herkunft:</strong> <em>de France, d’Allemagne, du Canada, des États-Unis</em>. Lerne Ziel und Herkunft als zwei getrennte Muster.</p>`]
      ]
    },
    spanisch:{
      2:[['Spanisches Alphabet: Zeichen, die du erkennen solltest',`<p><strong>h</strong> wird nicht gesprochen. <strong>j</strong> hat einen kräftigen Reibelaut. <strong>ñ</strong> ist ein eigener Buchstabe. Akzente wie <strong>á, é, í, ó, ú</strong> markieren die Betonung; <strong>ü</strong> zeigt in Kombinationen wie <em>güe/güi</em>, dass das u hörbar bleibt.</p>`]],
      3:[
        ['Zahlen bis 29',`<p><strong>0–15</strong> lernst du am besten als Grundformen. 16–19 werden zusammengeschrieben: <em>dieciséis, diecisiete…</em>. Auch 21–29 werden zusammengeschrieben: <em>veintiuno, veintidós…</em>.</p>`],
        ['Ab 30: Zehner + y + Einer',`<div class="grammar-table-wrap"><table class="grammar-table"><tbody><tr><td>31</td><td><strong>treinta y uno</strong></td></tr><tr><td>42</td><td><strong>cuarenta y dos</strong></td></tr><tr><td>57</td><td><strong>cincuenta y siete</strong></td></tr><tr><td>68</td><td><strong>sesenta y ocho</strong></td></tr></tbody></table></div><p>Die Zehner selbst sind <em>treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa</em>. 100 allein ist <strong>cien</strong>.</p>`],
        ['Alter und Telefonnummer',`<p>Alter steht mit <strong>tener</strong>: <em>Tengo treinta y un años.</em> Telefonnummern werden je nach Region in einzelnen Ziffern oder Gruppen gesprochen. Wichtig ist deshalb, sowohl einzelne Zahlen als auch Gruppen sicher zu verstehen.</p>`]
      ],
      7:[['Uhrzeit auf Spanisch',`<p>Für 1 Uhr steht <strong>Es la una</strong>, sonst <strong>Son las…</strong>. Häufig sind <em>y cuarto</em>, <em>y media</em> und <em>menos cuarto</em>. Für einen Termin: <em>a las diez</em>.</p>`]],
      9:[['Preise nennen',`<p>Für Preise brauchst du vor allem <em>cuesta / cuestan</em> und die Zahlen. Bei Dezimalbeträgen kann man Euro und Cent getrennt nennen, z. B. <em>diecinueve euros con cincuenta céntimos</em>.</p>`]],
      11:[['Wegbeschreibung in Schritten',`<p>Typische Anweisungen sind <em>siga todo recto</em>, <em>gire a la derecha/izquierda</em>, <em>tome el autobús…</em>. Ortsangaben wie <em>al lado de, enfrente de, cerca de</em> helfen, das Ziel zu beschreiben.</p>`]],
      14:[['Wetterformen unterscheiden',`<p><strong>hace</strong>: <em>hace frío/calor/sol</em>. <strong>está</strong>: Zustände wie <em>está nublado</em>. Eigene Verben: <em>llueve</em> (es regnet), <em>nieva</em> (es schneit).</p>`]],
      23:[['Formularsprache',`<p>Typische Felder sind <em>nombre y apellidos</em>, <em>dirección</em>, <em>correo electrónico</em>, <em>fecha de nacimiento</em> und <em>nacionalidad</em>. In Anzeigen sind kurze, unvollständige Sätze normal.</p>`]],
      24:[['Prüfungsanweisungen als feste Wörter lernen',`<p>Erkenne Verben wie <em>lea</em> (lesen Sie), <em>escuche</em> (hören Sie), <em>marque</em> (ankreuzen/markieren Sie), <em>escriba</em> (schreiben Sie) und <em>hable</em> (sprechen Sie). So verstehst du die Aufgabe, bevor du den Inhalt löst.</p>`]]
    },
    'deutsch-fr':{
      2:[['Alphabet allemand et signes spéciaux',`<p>En allemand, <strong>ä, ö, ü</strong> sont des voyelles distinctes et <strong>ß</strong> s’appelle <em>Eszett</em> ou <em>scharfes S</em>. En épelant, tu peux préciser <em>mit Umlaut</em>, <em>mit Doppel-L</em> ou utiliser des mots-repères comme <em>A wie Anton</em>.</p>`]],
      3:[
        ['Former les nombres allemands',`<p>Apprends d’abord 0–20. À partir de 21, l’allemand dit <strong>l’unité avant la dizaine</strong> : <em>ein-und-zwanzig</em>, littéralement « un-et-vingt ».</p><div class="grammar-table-wrap"><table class="grammar-table"><tbody><tr><td>21</td><td><strong>einundzwanzig</strong></td></tr><tr><td>32</td><td><strong>zweiunddreißig</strong></td></tr><tr><td>47</td><td><strong>siebenundvierzig</strong></td></tr><tr><td>58</td><td><strong>achtundfünfzig</strong></td></tr></tbody></table></div>`],
        ['Formes à mémoriser',`<p>Quelques formes changent légèrement : <strong>sechzehn</strong> (pas *sechszehn), <strong>siebzehn</strong> (pas *siebenzehn), <strong>dreißig</strong> avec ß. Dans les composés, <em>eins</em> devient généralement <strong>ein-</strong> : <em>einundzwanzig</em>.</p>`],
        ['Téléphone et date',`<p>Un numéro de téléphone peut être dicté chiffre par chiffre. Pour une date avec <strong>am</strong>, on emploie un ordinal : <em>am siebzehnten April</em>.</p>`]
      ],
      4:[['Lire l’heure allemande',`<p><strong>halb fünf</strong> signifie 4 h 30, car l’allemand pense « à mi-chemin vers cinq heures ». Pour un rendez-vous précis, utilise <em>um</em>; pour un jour, <em>am</em>.</p>`]],
      6:[['Commander sans apprendre tout l’accusatif',`<p>À ce niveau, retiens surtout le changement masculin : <em>ein Kaffee → einen Kaffee</em>. Féminin et neutre restent ici <em>eine Suppe</em> et <em>ein Wasser</em>.</p>`]],
      9:[['Comprendre un itinéraire',`<p>Une instruction polie commence souvent par le verbe : <em>Gehen Sie…, Nehmen Sie…, Fahren Sie…</em>. Les étapes s’enchaînent avec <em>dann</em> ou <em>danach</em>.</p>`]],
      13:[['Verbes séparables dans les horaires de voyage',`<p><em>abfahren</em> devient <em>Der Zug fährt um 9 Uhr <strong>ab</strong></em>; <em>ankommen</em> devient <em>Der Zug kommt um 11 Uhr <strong>an</strong></em>. Avec un modal, l’infinitif reste entier à la fin.</p>`]],
      16:[['Lire des panneaux sans phrase complète',`<p>Les panneaux omettent souvent l’article ou le verbe : <em>Heute geschlossen</em>, <em>Kein Eingang</em>, <em>Nur für Kunden</em>. Il faut les comprendre comme des messages fonctionnels, pas comme des phrases de manuel.</p>`]],
      18:[['Verbes d’instruction à reconnaître',`<p>Dans un exercice, repère d’abord l’action demandée : <em>Lesen Sie</em>, <em>Hören Sie</em>, <em>Schreiben Sie</em>, <em>Kreuzen Sie an</em>, <em>Ordnen Sie zu</em>. Comprendre la consigne évite de perdre des points sans problème de langue.</p>`]]
    },
    'deutsch-tr':{
      2:[['Alman alfabesi ve özel işaretler',`<p><strong>ä, ö, ü</strong> ayrı seslerdir; <strong>ß</strong> harfine <em>Eszett</em> veya <em>scharfes S</em> denir. Harf harf söylerken <em>mit Umlaut</em>, <em>mit Doppel-L</em> veya <em>A wie Anton</em> gibi ifadeler kullanılabilir.</p>`]],
      3:[
        ['Almanca sayılar nasıl kurulur?',`<p>Önce 0–20’yi öğren. 21’den sonra Almanca, <strong>önce birleri sonra und ve onlar basamağını</strong> söyler: <em>ein-und-zwanzig</em>.</p><div class="grammar-table-wrap"><table class="grammar-table"><tbody><tr><td>21</td><td><strong>einundzwanzig</strong></td></tr><tr><td>32</td><td><strong>zweiunddreißig</strong></td></tr><tr><td>47</td><td><strong>siebenundvierzig</strong></td></tr><tr><td>58</td><td><strong>achtundfünfzig</strong></td></tr></tbody></table></div>`],
        ['Ezberlenmesi gereken biçimler',`<p><strong>sechzehn</strong> (*sechszehn değil), <strong>siebzehn</strong> (*siebenzehn değil) ve <strong>dreißig</strong> yazımlarına dikkat et. Birleşik sayıda <em>eins</em> genellikle <strong>ein-</strong> olur: <em>einundzwanzig</em>.</p>`],
        ['Telefon ve tarih',`<p>Telefon numaraları rakam rakam söylenebilir. Tarihte <strong>am</strong> ile sıra sayısı kullanılır: <em>am siebzehnten April</em>.</p>`]
      ],
      4:[['Almancada saat mantığı',`<p><strong>halb fünf</strong>, 4.30 demektir; ifade “beşe yarım” mantığıyla kurulur. Kesin saat için <em>um</em>, gün için <em>am</em> kullanılır.</p>`]],
      6:[['Siparişte Akkusativ için temel kural',`<p>A1 düzeyinde özellikle eril değişimi hatırla: <em>ein Kaffee → einen Kaffee</em>. Dişil ve nötr örnekler burada <em>eine Suppe</em> ve <em>ein Wasser</em> olarak kalır.</p>`]],
      9:[['Yol tarifini adım adım anlama',`<p>Kibar yol tarifinde fiil başta gelir: <em>Gehen Sie…, Nehmen Sie…, Fahren Sie…</em>. Adımlar <em>dann</em> ve <em>danach</em> ile birbirine bağlanabilir.</p>`]],
      13:[['Seyahatte ayrılabilen fiiller',`<p><em>abfahren</em>: <em>Der Zug fährt um 9 Uhr <strong>ab</strong>.</em> · <em>ankommen</em>: <em>Der Zug kommt um 11 Uhr <strong>an</strong>.</em> Modal fiil varsa mastar bölünmeden sonda kalır.</p>`]],
      16:[['Tabelalarda eksik cümleler normaldir',`<p><em>Heute geschlossen</em>, <em>Kein Eingang</em>, <em>Nur für Kunden</em> gibi tabelalarda artikel veya fiil bulunmayabilir. Bunları tam cümleye çevirmek yerine mesajın işlevini anlamaya odaklan.</p>`]],
      18:[['Sınav yönergelerinde önemli fiiller',`<p>Önce görev fiilini tanı: <em>Lesen Sie</em>, <em>Hören Sie</em>, <em>Schreiben Sie</em>, <em>Kreuzen Sie an</em>, <em>Ordnen Sie zu</em>. Böylece dil sorusunu çözmeden önce senden ne istendiğini bilirsin.</p>`]],
      19:[['Günlük rutinde sıralama',`<p><em>zuerst</em> (önce), <em>dann</em> (sonra), <em>danach</em> (ondan sonra) ve <em>am Ende</em> (sonunda) bir günü mantıklı sırayla anlatmana yardım eder. Ayrılabilen fiilin ön eki yine cümlenin sonunda kalır.</p>`]],
      21:[['Form ve resmi işlem sözcükleri',`<p><em>Name</em> soyadı da içerebilir; <em>Vorname</em> ad, <em>Anschrift</em> adres, <em>Geburtsdatum</em> doğum tarihi, <em>Unterschrift</em> imzadır. Resmî yerlerde <strong>Sie</strong> hitabını kullan.</p>`]],
      23:[['Sorun bildirirken basit kalıp',`<p>Önce sorunu söyle: <em>Die Waschmaschine ist kaputt.</em> Sonra sonucu veya isteği ekle: <em>Sie funktioniert nicht. Können Sie mir helfen?</em> A1’de kısa ve açık cümleler yeterlidir.</p>`]]
    }
  };

  function render(course,id){
    const items=I[course]?.[id]||[];
    return items.map(([title,body])=>`<details class="grammar-detail lesson-topic-detail"><summary>${title}</summary><div class="grammar-detail-body">${body}</div></details>`).join('');
  }
  window.A1LessonTopicInfo={render};
})();
