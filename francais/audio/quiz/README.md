# Sounds für den Millionen-Turm

Lege hier MP3-Dateien mit genau diesen Namen ab (klein geschrieben, mit Bindestrich). Jede Datei ist optional: Fehlt sie, bleibt es an dieser Stelle still. Das Quiz spielt keine eingebauten Töne und keine Stimme – nur diese Dateien.

Nur Sounds verwenden, die du nutzen darfst – z. B. eigene Aufnahmen oder lizenzfreie Dateien (Pixabay, Freesound mit CC0). Keine Musik aus Fernsehsendungen, Filmen oder Spielen: Die Website ist öffentlich.

## Gewinnbereiche

| Bereich | Fragen | Gewinnstufen |
|---|---|---|
| 1 | 1–4 | 50 € – 500 € |
| 2 | 5–7 | 1.000 € – 25.000 € |
| 3 | 8–10 | 100.000 € – 1 Million € |

## Dateien

| Datei | Wann sie spielt |
|---|---|
| `schleife-1.mp3` | Dauerschleife während Bereich 1 |
| `schleife-2.mp3` | Dauerschleife während Bereich 2 |
| `schleife-3.mp3` | Dauerschleife während Bereich 3 |
| `festgelegt.mp3` | Antwort wird festgelegt – die Schleife stoppt |
| `richtig-1.mp3` / `richtig-2.mp3` / `richtig-3.mp3` | richtige Antwort im jeweiligen Bereich |
| `falsch-1.mp3` / `falsch-2.mp3` / `falsch-3.mp3` | falsche Antwort im jeweiligen Bereich |
| `joker.mp3` | ein Joker wird benutzt – spielt **über** allen anderen Sounds, nichts wird gestoppt |
| `start.mp3` | optional: beim Spielstart vor der ersten Schleife |
| `aussteigen.mp3` | optional: Spieler steigt mit dem Gewinn aus |

## Ablauf

1. Spielstart → `schleife-1` läuft (nach `start.mp3`, falls vorhanden).
2. „Antwort festlegen“ → Schleife stoppt, `festgelegt.mp3` spielt.
3. 3 Sekunden später → Auflösung mit `richtig-X` oder `falsch-X` des aktuellen Bereichs.
4. Richtig: Wenn der Richtig-Sound zu Ende ist, kurze Pause, dann wieder die Schleife – nach Frage 4 `schleife-2`, nach Frage 7 `schleife-3`.
5. Falsch: Das Spiel endet nach dem Falsch-Sound.

Tipps: MP3, möglichst unter 1 MB pro Datei; Schleifen sollten nahtlos ineinander übergehen. Nach dem Hochladen die Seite einmal neu laden. Der Knopf „Töne“ im Spiel schaltet alle Sounds stumm.
