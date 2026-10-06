# Aufgaben, Lektionsabschluss und Aussprache – v21

Stand: 6. Oktober 2026. Grundlage ist die bereitgestellte `A1-Language-Suite-main(4).zip`.

## Klarere gemischte Übungen

Lückentexte zeigen eine konkrete Frage, den Satz mit Lücke und die passende Bedeutung in der Oberflächensprache. Die Bedeutung stammt immer aus demselben Satz. Listen mit Schrägstrichen, Buchstabenreihen und reine Satzzeichen werden nicht mehr als fehlende Wörter verwendet. Übersetzungen haben eine eigene Frage; beim Sortieren ist die gewünschte Bedeutung sichtbar. Höraufgaben zeigen ihre Frage und funktionieren über den Hörbutton auch dann, wenn Auto-Audio ausgeschaltet ist.

Die zehn Aufgaben bleiben unterschiedlich: Auswahl, Lücke, Satzreihenfolge, Hören und Übersetzung. Bestehende Übungspools und Kursinhalte wurden übernommen.

## Drei Teile pro Lektion

In allen vier Kursen folgt nach der zehnten Übung direkt der Bereich **Sprechen und Schreiben** der aktuellen Lektion. Neue Lektionen werden erst abgeschlossen, wenn:

1. der beste Quizwert mindestens 70 % beträgt,
2. die Sprechaufgabe laut bearbeitet und anschließend selbst geprüft wurde,
3. die Schreibaufgabe ausreichend bearbeitet, mit dem Beispiel verglichen und selbst geprüft wurde.

Unter der Sprechaufgabe führt ein Button zur Schreibaufgabe. Erst am Ende steht der Button zur nächsten Lektion. Bei weniger als 70 % kann das Quiz wiederholt werden; die erledigten Selbstaufgaben bleiben gespeichert.

Der Alltagsdialog steht nicht mehr unverbunden am Ende des Lerninhalts. Er befindet sich jetzt im Bereich **Sprechen und Schreiben üben** und ist dort als **Hilfe · Beispieldialog** eingeklappt. Die Lernenden können ihn bei beiden freien Aufgaben als Erinnerung öffnen und jede Dialogzeile weiterhin anhören.

Sprechen funktioniert mit Aufnahme oder ohne Mikrofon. „Überspringen“ zählt nicht mehr als erledigte Sprechaufgabe. Eine nicht leere Aufnahme erhält weiterhin den üblichen Tagesaktivitätsnachweis, beendet aber allein weder die Sprechaufgabe noch die Lektion. Freie Antworten werden durch den Lernenden geprüft, nicht automatisch benotet.

Schreibentwürfe und Aufgabenstatus liegen unter `lessonWork` im bisherigen Kurszustand. Sie bleiben beim Neuladen erhalten und werden im vorhandenen Cloud-Fortschritt mitgespeichert. Aufgaben mit ausdrücklich genannter Wortzahl verlangen diese Mindestzahl; andere Aufgaben verlangen eine kurze sinnvolle Eingabe und die Bestätigung aller Aufgabenpunkte. Die französische Namens-Hörübung benötigt nur den gehörten Nachnamen.

Bereits abgeschlossene Lektionen behalten ihren Status. Profil- und Fortschrittsschlüssel, Datenbankkonfiguration, Lernserie und deren Regeln wurden beibehalten. Mikrofonaufnahmen sind weiterhin vorübergehend und werden nicht als Audiodateien mit dem Projekt ausgeliefert oder in die Cloud hochgeladen.

## Hörbare Aussprache

Alle 24 französischen Aussprachebereiche besitzen einzelne Hörbuttons für konkrete Wörter oder Wortgruppen. Sie lesen keine Überschrift oder Lautschrift vor. Beispiele sind `tu / tout`, `rue / roue`, `petit / petite` und `les amis / les livres`.

In Lektion 2 gibt es 26 einzeln hörbare französische Buchstabennamen, hervorgehobene schwierige Buchstaben, acht hörbare Akzentnamen und ein Eingabefeld zum Buchstabieren des eigenen Namens. Eine Buchstabenfolge wird in getrennten Sprechabschnitten vorgelesen. Die Schreibaufgabe enthält eine Hörübung für den Nachnamen Martin. Die beiden Deutschkurse erhalten zusätzlich Hörbuttons für besondere deutsche Buchstabennamen.

## Kostenlose Browserstimmen

Über das neue Symbol mit den Schallwellen oben öffnet sich **Stimme & Audio**: passende verfügbare Stimmen auswählen, Hörprobe anhören, Tempo ändern und Stimmen neu laden. Die Auswahl wird pro Lernsprache auf diesem Gerät gespeichert; eine fehlende gespeicherte Stimme fällt auf die automatische Auswahl zurück.

Die automatische Auswahl auf Windows verwendet weiterhin die bisherige erste passende Browserstimme. Auf Apple-Geräten werden höhere Qualitätsstufen auch anhand der internen Stimmkennung erkannt, sodass Enhanced-/Premium-Varianten mit gleichem Anzeigenamen Vorrang bekommen. Die erste Wiedergabe startet direkt beim Klick; Buchstabieren läuft als abbrechbare Folge.

Es wurden keine TTS-Modelle, Audiodateien, externen Sprachdienste oder kostenpflichtigen APIs hinzugefügt. Die hörbare Qualität hängt weiterhin von den tatsächlich angebotenen Browserstimmen ab. Manche Apple-Versionen verbergen hochwertige installierte Stimmen. Die App kann solche Stimmen nicht freischalten. Der Hinweis im Stimmenmenü erklärt die Apple-Einstellungen und diese Grenze, ohne eine Verbesserung durch Installation zu garantieren.

Quellen für diese Grenze und die Systemoptionen:

- [WebKit: nicht alle installierten Stimmen verfügbar](https://bugs.webkit.org/show_bug.cgi?id=290497)
- [Apple: Stimme auf dem Mac ändern](https://support.apple.com/guide/mac-help/change-the-voice-your-mac-uses-to-speak-text-mchlp2290/mac)
- [Apple: Inhalte auf dem iPhone vorlesen](https://support.apple.com/guide/iphone/hear-whats-on-the-screen-or-typed-iph96b214f0/ios)
- [MDN: vom Browser angebotene Stimmen](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices)

## Upload und Prüfung

Den vollständigen ZIP-Inhalt ins bestehende Projekt übernehmen. Besonders wichtig sind die neuen Dateien `shared/lesson-flow.js`, `shared/pronunciation.js` und `shared/course-updates.css` sowie die aktualisierten HTML-, App- und Worker-Dateien aller vier Kurse. Die geänderten Ressourcen verwenden `dialog-21`; die vier Kurscaches wurden erhöht. `shared/config.js` und `shared/supabase.sql` bleiben unverändert.

Geprüft wurden alle 96 Lektionen mit ihren zehn generierten Aufgaben, beide Selbstaufgaben, gesperrter/freigegebener Abschluss, alte Erfolge, Neuladen und der neue Status im Cloud-Speicherpayload. Mikrofonprüfungen decken Abbruch, leere/nicht leere Aufnahme, Wiedergabe, Selbstprüfung, Streak und Ressourcenfreigabe ab. Browserprüfungen decken 320–1280 Pixel, beide Farbschemata, Navigation und Offline-Cache ab. Stimmwahl und Buchstabenfolgen wurden mit nachgebildeten Apple- und Windows-Stimmlisten geprüft.

Die Tests liefen lokal in Chromium und mit simulierten Sprach-/Aufnahmefunktionen. Die tatsächliche Stimmqualität und die Mikrofonhardware auf einem echten Mac oder iPhone müssen dort beurteilt werden. Es wurden keine Änderungen an der produktiven Supabase-Datenbank ausgeführt.
