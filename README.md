# Feuerwehr Adventskalender
Ein einfacher Adventskalender für die Webseite der speziell für die Verwendung im CMS des LFV-Website-Kits 2.0 entwickelt wurde, das auf Django CMS basiert. Er nutzt Bootstrap 4.6.0, entsprechend der Version, die im LFV-Website-Kit verwendet wird. Die Anzeige ist voll responsiv, d.h. vor allem auch für kleinere Endgeäte optimiert.

* Türchen lassen sich beliebig anordnen (einfach "umkopieren")
* Bilder lassen sich in modalem Popup in Originalgröße öffnen
* Zoom Effekt der Türchen beim darüberfahren mit der Maus
* Klickt man auf eine Tür, die noch nicht geöffnet werden kann, erscheint ein entsprechender Text
* Die Tür des aktuellen Tages muss angeklickt werden, damit sich geöffnet wird

## Verwendung im LFV-Website-Kit
Eine genaue Anleitung, wie ihr den Kalender, bzw. die einzelnen Skripte einbauen müsst, wenn eure Webseite mit dem LFV-Website-Kit läuft, findet ihr hier: [https://www.feuerwehr-gruenwald.de/adventskalender/](https://www.feuerwehr-gruenwald.de/adventskalender/)

## Verwendung Standalone
Projekt auschecken und anschließend die [adventskalender.html](adventskalender.html) öffnen. Die [adventskalender_konfigurator.html](adventskalender_konfigurator.html) enthält einen kleinen Testbereich, mit dem sich verschiedene Einstellungen des Kalenders testen lassen - hauptsächlich kann der aktuelle Monat auf *Dezember* geändert werden, sodass sich die Türchen öffnen lassen.

## Anpassungsmöglichkeiten
TBD
Für alle bereits geöffneten Türchen wird das dahinterliegende Bild standardmäßig mit einer Deckkraft von 40% angezeigt, ist aber auch (noch) im Popup-Fenster aufrufbar. Beide Einstellungen – die Anzeige des Bildes und die Popup-Funktion – lassen sich individuell anpassen. Je nach Bildschirmgröße des Endgerätes können auch zwei unterschiedliche Bilder angzeigt werden.

Der Adventskalender ermöglicht es, für jedes Türchen ein Bild zu hinterlegen, welches erst am jeweiligen Tag bei einem Klick auf die Tür angezeigt wird. Nach dem Klick auf das Bild öffnet dieses in einem Popup-Fenster im Originalformat. Zusätzlich kann für jedes Bild ein Text (mit Html-Tags) definiert werden, der unterhalb des Bildes erscheint. Es besteht auch die Möglichkeit, einen "Weitere Informationen..."-Link einzufügen, der mit einer URL verknüpft werden kann. Diese drei genannten Einstellungen lassen sich alle in der Datei [adventskalenderdaten.js](/js/adventskalenderdaten.js) anpassen.


## Usability
Anzeige des Kalenders mit Defaulteinstellungen auf Desktopbildschirmen: 
![image](https://github.com/mario-fliegner/ffg_adventskalender/assets/58735999/969c98a9-4d92-4e86-8ed2-53cc5a0192de)

Anzeige des Kalenders mit Defaulteinstellungen auf mobilen Endgeräten:
![image](https://github.com/mario-fliegner/ffg_adventskalender/assets/58735999/c6a07d07-eadf-4556-af22-bdb7526855f7)


