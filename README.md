# Feuerwehr Adventskalender
Ein einfacher Adventskalender für die Webseite der speziell für die Verwendung im CMS des LFV-Website-Kits 2.0 entwickelt wurde, das auf Django CMS basiert. Er nutzt Bootstrap 4.6.0, entsprechend der Version, die im LFV-Website-Kit verwendet wird. Der Kalender kann aber auch komplett Standalone verwendet werden.

Der Adventskalender ermöglicht es, für jedes Türchen ein Bild zu hinterlegen, welches erst am jeweiligen Tag bei einem Klick auf die Tür angezeigt wird. Nach dem Klick auf das Bild öffnet dieses in einem Popup-Fenster im Originalformat. Zusätzlich kann für jedes Bild ein Text (mit Html-Tags) definiert werden, der unterhalb des Bildes erscheint. Es besteht auch die Möglichkeit, einen "Weitere Informationen..."-Link einzufügen, der mit einer URL verknüpft werden kann. Diese drei genannten Einstellungen lassen sich alle in der Datei [adventskalenderdaten.js](/js/adventskalenderdaten.js) anpassen.

Für alle bereits geöffneten Türchen wird das dahinterliegende Bild standardmäßig mit einer Deckkraft von 40% angezeigt, ist aber auch (noch) im Popup-Fenster aufrufbar. Beide Einstellungen – die Anzeige des Bildes und die Popup-Funktion – lassen sich individuell anpassen.

## Verwendung Standalone
Projekt auf die lokale Platte kopieren und anschließend die [adventskalender.html](adventskalender.html) öffnen.

## Verwendung im LFV-Website-Kit
Eine genaue Anleitung für den Einsatz im LFV-Website-Kit findet ihr hier: 

## Anpassungsmöglichkeiten
TBD

