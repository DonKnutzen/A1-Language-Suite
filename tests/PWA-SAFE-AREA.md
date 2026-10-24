# Obere Leiste unter der iPhone-Statusanzeige

Ausgangsstand: `cc66f539f7fcee92eccc43a9f63022373f4e179a`.

Bestätigte Ursache im Französischkurs: Die mobile Regel `padding:10px 14px` überschreibt den in der Basisregel vorgesehenen `safe-area-inset-top`. Bei installiertem Start vom Home-Bildschirm passen Uhrzeit und obere Bedienelemente dadurch auf dieselbe Fläche. Im Deutschkurs gab es bereits eine spätere Korrektur für oben; beide Kurse verwenden nun konsistente sichere Abstände auch links/rechts für Querformat.

Die bestehende mobile Positionierung bleibt im normalen Dokumentfluss: Die obere Leiste scrollt mit der Seite. Desktop behält seine bestehende sticky Positionierung. Viewport-Metadaten und Home-Bildschirm-Installation bleiben unverändert. Keine festen gerätespezifischen Statusleistenhöhen, keine Änderungen an Profil, Lernstand oder Kursinhalten. C1 und Spanisch unverändert.

Grundlage: [WebKit: Designing Websites for iPhone X](https://webkit.org/blog/7929/designing-websites-for-iphone-x/) beschreibt das Zusammenspiel von `viewport-fit=cover` und sicheren Inhaltsabständen über `env(safe-area-inset-*)`.

`pwa-safe-area-browser.cjs` prüft beide echten HTML-/CSS-Shells in Chromium: 20 Kombinationen aus hell/dunkel, 320/390/844/1280 Pixeln und simulierten oberen/seitlichen Safe-Area-Werten. Kontrolliert werden die berechneten Abstände, Hit-Tests der Kopfbuttons, horizontaler Überlauf und normales Scrollen auf Mobilbreiten. Alle Prüfungen bestanden. Mobile Screenshots visuell kontrolliert.

Die vorhandene Chromium-Version unterstützt keine native Safe-Area-Emulation. Der Test ersetzt deshalb ausschließlich im ausgelieferten Test-CSS die env-Werte durch steuerbare CSS-Variablen. App-Skripte und Anmeldung werden nicht ausgeführt; dynamische Kopfbuttons erhalten Layout-Platzhalter. Das prüft die tatsächliche CSS-Kaskade, simuliert jedoch kein installiertes iOS/WebKit. Eine Prüfung auf einem echten iPhone ist hier nicht möglich und wird nicht behauptet.
