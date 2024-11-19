# Feuerwehr Adventskalender
Ein einfacher Adventskalender für die Webseite der speziell für die Verwendung im CMS des LFV-Website-Kits 2.0 entwickelt wurde, das auf Django CMS basiert. Er nutzt Bootstrap 4.6.0, entsprechend der Version, die im LFV-Website-Kit verwendet wird. Die Anzeige ist responsiv, d.h. auch für kleinere Endgeäte optimiert.

## Features
* Anzeige von Bild oder Video (`.mp4`, `.mov` bzw. YouTube-Videos)
* Beschreibung unter jedem Bild oder Video möglich
* Optionaler Link zu externer Seite möglich (als "Weitere Informationen")
* Flexible Türchenanordnung
* Interaktive Türchen - Status basierend auf aktuellem Datum (offen, geschlossen oder aktiv)
* Barrierefrei (`aria`-Attribute zur Unterstützung von Screenreadern)
* Responsive Design
* Anpassungen erfordern keine tiefen Programmierkenntnisse
* Testmodus um die Türchen für jeden beliebigen Tag im Dezember zu simulieren


## Verwendung im LFV-Website-Kit
Eine detaillierte Anleitung, wie der Kalender auf einer Webseite des LFV-Website-Kit integriert werden kann, findet ihr hier: [https://www.feuerwehr-gruenwald.de/adventskalender/](https://www.feuerwehr-gruenwald.de/adventskalender/). Dort sind die Code-Snippets schon entsprechend vorbereitet.

## Download und Installation
Um den Kalender für euch zu nutzen geht ihr wie folgt vor:
* Github-Projekt auschecken oder das letzte Release herunterladen und entpacken

Öffnet die Datei [adventskalender.html](adventskalender.html) mit einem Doppelklick in einem Browser und ihr seht den Kalender. Diesen könnt ihr nun anpassen. 

## Kalender anpassen
Um den Kalender anzupassen und die einzelnen Türchen nach euren Wünschen zu füllen, öffnet die Datei [adventskalenderdaten.js](js/adventskalenderdaten.js) im Unterverzeichnis `/js` mit einem Texteditor (bspw. Notepad++). Dort müssen die Änderungen für die einzelnen Türchen vorgenommen werden. Zusätzlich lassen sich dort bspw. auch die Hintergrundbilder definieren. 

### Aufbau der `adventskalenderdaten.js`
Die Beschreibung der einzelnen Felder in der Datei:

#### Grundlegende Einstellungen
Die Beschreibung der Einstellungen, die im oberen Bereich der Datei vorgenommen werden können:

```
    "imageBasePath" : "bilder/",
    "defaultVideoThumbnail": "bilder/videoplayer.png",
    "defaultLinkText": "Weitere Informationen...",
    "backgroundImage": {
        "large": "bilder/hintergrundbild_gross.jpg",
        "small":"bilder/hintergrundbild_klein.jpg"
    },
    "texte": {
        "popupHeader_notTimeModal": "Noch etwas Geduld",
        "popupHeader_showPopupForPastDoors_false": "T&uuml;rchen nicht mehr verf&uuml;gbar",
        "popupText_showPopupForPastDoors_false": "Leider bist du zu sp&auml;t. Dieses T&uuml;rchen ist nicht mehr verf&uuml;gbar.",
    },
```

| Schlüssel / Key  | Beschreibung  | Beispiel  |
|---|---|---|
| `imageBasePath`  | Für lokal gespeicherte Bilder kann hier ein Basispfad angegeben werden, der jedem lokal angegebenen Bild in den Türchen vorangestellt wird. Hat man 24 Bilder im Unterverzeichnis `images/weihnachten/kalender/2024`, müsste man bei allen 24 Bildern diesen Pfad mit angeben. Setzt man ihn über diesen Parameter, muss man bei den Türchen nur den Namen der jeweiligen Bilder in dem Ordner angeben. | `bilder/`|
| `popupHeader_notTimeModal`  | Überschrift des Popups, wenn das angeklickte Türchen noch nicht geöffnet werden darf.  | `bilder/videoplayer.png`|
| `defaultVideoThumbnail`  | Für mit Videos hinterlegte Türchen kann jeweils ein Vorschaubild mitgegeben werden. Wird keins angegeben, erfolgt die Anzeige dieses Bildes.  | `bilder/videoplayer.png`|
| `defaultLinkText`  | Wenn zu einem Türchen ein Link angezeigt werden soll, kann ein Text für den Link mitgegeben werden. Wird keiner angegeben, wird standardmäßig dieser Text für den Button verwendet.  | `Weitere Informationen`|
| `backgroundImage`  | Definiert die Hintergrundbilder des Kalenders. Für kleinere Mobile Endgeräte (`small`) kann ein anderes Bild verwendet werden. | `bilder/hintergrundbild_gross.jpg` oder `https://meine-website.de/images/kalender-hintergrund.jpg`|
| `popupHeader_showPopupForPastDoors_false`  | Überschrift im Popup, wenn vergangene Türchen nicht mehr geöffnet werden dürfen.  | `Türchen nicht mehr verfügbar`|
| `popupText_showPopupForPastDoors_false`  | Text der im Popup angezeigt wird, wenn vergangene Türchen nicht mehr geöffnet werden dürfen.  | `Türchen nicht mehr verfügbar`|

!!! Ab hier TBD!!!

#### Einstellungen zu den einzelnen Türchen

```
    "1": { 
        "image": "/bilder/bild_tuer_1.jpg", 
        "text": "Bildbeschreibung <strong>kann HTML enthalten</strong>", 
        "link": "https://github.com" 
    }
```

| Schlüssel  | Beschreibung  |
|---|---|
| `1` .. `24`  | Leitet das Array für jeden einzelnen Tag des Kalenders ein.  |
| `image`  | Enhält die Angabe des Bildes, welches hinter der Tür angezeigt werden soll. Entweder als relative oder absolute Pfadangabe. Bei absoluter Pfadangabe kann zur Erleichterung auch noch der Parameter [`basePath`](https://github.com/mario-fliegner/ffg_adventskalender/blob/dd7fb9f83bbc0e2430a739008c56705dc0cc3a34/js/adventskalender.js#L30) genutzt werden um nicht 24 Mal die gleichen Pfade einzugeben. |
| `text` | Die Beschreibung, die im Popup unter dem Bild angezeigt werden soll. Kann HTML-Tags enthalten.  |
| `link`  | Eine URL zu weiteren Informationen. Ist ein `link` angegeben, wird automatisch ein Button unter dem `text` angezeigt, der die URL in einem neuen Fenster öffnet. Die Angabe des Button-Labels erfolgt in der [adventskalender.js](https://github.com/mario-fliegner/ffg_adventskalender/blob/dd7fb9f83bbc0e2430a739008c56705dc0cc3a34/js/adventskalender.js#L14C11-L14C11). |
|   |   |   |

## Weitere Anpassungsmöglichkeiten
In der Datei [adventskalender.js](https://github.com/mario-fliegner/ffg_adventskalender/blob/dd7fb9f83bbc0e2430a739008c56705dc0cc3a34/js/adventskalender.js#L30) gibt es noch die folgenden Anpassungsmöglichkeiten, um das Aussehen des Kalenders zu steuern:

| Schlüssel  | Wert |Beschreibung  |
|---|---|---|
| `showModalForPastDoors` | `true` oder `false` | Steuert, ob das Popup für vergangene Türchen angezeigt werden soll. Wenn der Wert auf `false` steht, passiert bei einem Klick auf das Türchen nichts. |
| `showImagesForPastDoors`  | `true` oder `false` | Steuert, ob Bilder für vergangene Türchen mit 40% Deckkraft hinter den Türchen sichtbar sind. |
| `backgroundImageUrlLarge`  | URL | URL des Hintergrundbilds für große Bildschirme. |
| `backgroundImageUrlSmall` | URL | URL des Hintergrundbilds für kleine Bildschirme (mobile Endgeräte). |
| `labelPopupModelLink`  | Text | Label für den Button im Popup. |
| `headerPopupNotTime`  | Text | Text in Überschrift im Popup wenn Tür noch nicht geöffnet werden kann. |

## Usability
Anzeige des Kalenders mit Defaulteinstellungen auf Desktopbildschirmen: 
![image](https://github.com/mario-fliegner/ffg_adventskalender/assets/58735999/969c98a9-4d92-4e86-8ed2-53cc5a0192de)

Anzeige des Kalenders mit Defaulteinstellungen auf mobilen Endgeräten:
![image](https://github.com/mario-fliegner/ffg_adventskalender/assets/58735999/c6a07d07-eadf-4556-af22-bdb7526855f7)


