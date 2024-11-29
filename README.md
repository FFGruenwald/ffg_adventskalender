# Feuerwehr Adventskalender
Ein einfacher Adventskalender für eure (Feuerwehr-)Webseiten. Urspünglich entwickelt und optimiert für die Verwendung im [LFV-Website-Kits 2.0](https://feuerwehren.bayern/). Der Code im Repo verwendet aber bereits eine aktuelle Bootstrap-Version für die Anzeige. Für die Einbindung im LFV-Website-Kit folgt bitte dieser Anleitung: 
*  [https://www.feuerwehr-gruenwald.de/adventskalender/](https://www.feuerwehr-gruenwald.de/adventskalender/)

![image](https://github.com/user-attachments/assets/74fefeec-af5a-41cc-8f1d-518e115cd0ba)

## Features
* Anzeige von Bild oder Video (`.mp4` oder YouTube-Videos)
* Optionale Beschreibung unter jedem Bild oder Video möglich
* Optionaler Link unter Beschreibung zu beliebiger Webseite möglich
* Flexible Türchenanordnung
* Interaktive Türchen - Status basierend auf aktuellem Datum (offen, geschlossen oder aktiv)
* Barrierefrei (`aria`-Attribute zur Unterstützung von Screenreadern)
* Responsive Design
* Anpassungen erfordern keine tiefen Programmierkenntnisse
* Testmodus um die Türchen für jeden beliebigen Tag im Dezember zu simulieren

## Verwendung im LFV-Website-Kit
Eine detaillierte Anleitung, wie der Kalender auf einer Webseite des LFV-Website-Kit integriert werden kann, findet ihr hier: [https://www.feuerwehr-gruenwald.de/adventskalender/](https://www.feuerwehr-gruenwald.de/adventskalender/). Dort sind die Code-Snippets schon entsprechend vorbereitet und können 1:1 kopiert und verwendet werden.

> **HINWEIS:**
> Das dem [LFV-Website-Kits 2.0](https://feuerwehren.bayern/) zu Grunde liegende [Django CMS](https://www.django-cms.org/de/) verwendet die ältere [Bootstrap 4.6.0](https://getbootstrap.com/docs/4.6/getting-started/introduction/) Version, während der der eingecheckte Code in diesem Repository die neuste Bootstrap Version verwendet.

## Download und Installation
Um den Kalender für euch zu nutzen geht ihr wie folgt vor:
* Github-Projekt auschecken oder das letzte Release herunterladen und entpacken

Öffnet die Datei [adventskalender.html](adventskalender.html) per Doppelklick in einem Browser. Es erscheint ein Kalender mit Beispieldaten, den ihr nach Belieben anpassen könnt.

## Kalender anpassen
Um den Kalender anzupassen und die einzelnen Türchen nach euren Wünschen zu gestalten, öffnet die Datei [adventskalenderdaten.js](js/adventskalenderdaten.js) im Unterverzeichnis `/js` mit einem Texteditor (bspw. Notepad++). Dort findet ihr alle Optionen für die Türcheninhalte, die Hintergrundbilder und zusätzliche Texte.

### Aufbau der `adventskalenderdaten.js`
Dieser Bereich bescheibt die einzelnen Felder in der Datei mit deren Anpassungsmöglichkeiten.

#### Grundlegende Einstellungen
Im oberen Bereich der Datei befinden sich die grundlegenden Einstellungen für Hintergrundbilder, Texte und Standardwerte. Die Erklärungen folgen in der Tabelle unter dem Code-Beispiel:

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
        "popupText_showPopupForPastDoors_false": "Leider bist du zu sp&auml;t. Dieses T&uuml;rchen kann nicht mehr ge&ouml;ffnet werden.",
    },
```

| Parameter  | Beschreibung  | Beispiel  |
|---|---|---|
| `imageBasePath`  | Für lokal gespeicherte Bilder kann ein Basispfad festgelegt werden, der automatisch jedem Bildpfad der einzelnen Türchen vorangestellt wird. Liegen z. B. 24 Bilder im Verzeichnis `images/weihnachten/kalender/2024`, muss dieser Pfad nicht bei jedem Türchen separat angegeben werden. Stattdessen reicht es, den Basispfad über den Parameter zu definieren und nur die Bildnamen der jeweiligen Dateien anzugeben. | `bilder/`|
| `defaultVideoThumbnail`  | Für Türchen mit Videos kann optional ein Vorschaubild angegeben werden. Ist keines definiert, wird ein Standardbild angezeigt. Kommt nur zur Verwendung, wenn [`showPreviewImagesForPastDoors` in der adventskalender.js](https://github.com/FFGruenwald/ffg_adventskalender/blob/239e2bd9cca224ec264c87a636a040a2ec419407/js/adventskalender.js#L19) auf `true` steht.  | `bilder/videoplayer.png`|
| `defaultLinkText`  | Soll ein weiterführender Link in einem Türchen angezeigt werden, kann ein Text für den Button angegeben werden. Fehlt dieser, wird ein Standardtext verwendet. | `Weitere Informationen`|
| `backgroundImage` -> `large` | Definiert das Hintergrundbild für große Bildschirme. | `bilder/hintergrundbild_gross.jpg` oder `https://meine-website.de/images/kalender-hintergrund.jpg`|
| `backgroundImage` -> `small` | Definiert das Hintergrundbild für mobile Endgeräte. Soll für alle Endgeräte das gleiche Bild angezeigt werden, dann beide Parameter (`large` und `small`) auf den gleichen Wert setzen. | `bilder/hintergrundbild_klein.jpg` oder `https://meine-website.de/images/kalender-hintergrund_klein.jpg`|
|`texte` -> `popupHeader_notTimeModal`  | Überschrift des Popups, wenn das angeklickte Türchen noch nicht geöffnet werden darf.  | `Noch etwas Geduld` |
|`texte` -> `popupHeader_showPopupForPastDoors_false`  | Überschrift im Popup, wenn vergangene Türchen nicht mehr geöffnet werden dürfen. Kommt nur zur Verwendung, wenn [`showPopupForPastDoors` in der adventskalender.js](https://github.com/FFGruenwald/ffg_adventskalender/blob/239e2bd9cca224ec264c87a636a040a2ec419407/js/adventskalender.js#L13) auf `true` steht. | `T&uuml;rchen nicht mehr verf&uuml;gbar`|
|`texte` -> `popupText_showPopupForPastDoors_false`  | Text der im Popup angezeigt wird, wenn vergangene Türchen nicht mehr geöffnet werden dürfen. Kommt nur zur Verwendung, wenn [`showPopupForPastDoors` in der adventskalender.js](https://github.com/FFGruenwald/ffg_adventskalender/blob/239e2bd9cca224ec264c87a636a040a2ec419407/js/adventskalender.js#L13) auf `true` steht. | `Leider bist du zu sp&auml;t. Dieses T&uuml;rchen kann nicht mehr ge&ouml;ffnet werden.`|

#### Einstellungen der einzelnen Kalendertürchen

Jedes der 24 Türchen ist separat definiert. Die Schlüssel ("1", "2", usw.) im Objekt repräsentieren die Türchennummern und enthalten jeweils ein Unterobjekt mit den spezifischen Einstellungen für das jeweilige Türchen.

##### Kalendertürchen mit Bildern 
Beispiel für den 1. Dezember:
```
    "1": {  
        "image": "kalender_bild_01.jpg", 
        "text": "Heute ist der erste Dezember!",
        "link": "https://feuerwehr-gruenwald.de/adventskalender/",
        "linkText": "www.feuerwehr-gruenwald.de/adventskalender"
    },
    ...
```
| Parameter  | Beschreibung  |
|---|---|
| `image`  | Enhält die Angabe des Bildes, welches hinter der Tür angezeigt werden soll. Entweder als relative oder absolute Pfadangabe. Bei absoluter Pfadangabe kann zur Vereinfachung der Parameter [`imageBasePath`](https://github.com/mario-fliegner/ffg_adventskalender/blob/dd7fb9f83bbc0e2430a739008c56705dc0cc3a34/js/adventskalender.js#L30) genutzt werden, um wiederholte Pfadangaben für alle 24 Türchen zu vermeiden. |
| `text` | Die Beschreibung, die im Popup unter dem Bild angezeigt werden soll. Der Text kann mit HTML-Tags formatiert werden.  |
| `link`  | Eine URL zu weiteren Informationen. Ist ein `link` angegeben, wird automatisch ein Button unter dem `text` angezeigt, der die URL in einem neuen Fenster öffnet. |
| `linkText`  | Das Text (Label) für den Button.<br/>Falls ein `link` angegeben wurde, aber kein `linkText` vorhanden ist, wird der Standardtext aus dem Parameter [`defaultLinkText`](https://github.com/FFGruenwald/ffg_adventskalender/blob/239e2bd9cca224ec264c87a636a040a2ec419407/js/adventskalenderdaten.js#L4) für den Button verwendet. |

##### Kalendertürchen mit Videos 
Beispiel für den 2. Dezember. Das Video wird in einem Unterobjekt `video` angegeben:
```
    "2": { 
        "video": {
            "source": "youtube",
            "url": "IwBiZtfjioU",
            "thumbnailImage": "kalender_bild_02.jpg",
            "controls": true,
            "width": "100%",
            "height": 450
        },
        "text": "<strong>Dieses ist ein Youtube Video!</strong>",
        "link": "",
        "linkText": ""
    },
    ...
```
| Parameter  | Beschreibung  |
|---|---|
| `video` -> `source`  | Die Quelle des Videos. Mögliche Werte: `youtube` oder `mp4`! |
| `video` -> `url`  | Wenn `"source": "youtube"`, muss die **11-stellige Video-ID** des Youtube-Videos angegeben werden.<br/>Wenn `"source": "mp4"`, muss die vollständige URL zu dem MP4-Video angegeben werden (inkl. https://). |
| `video` -> `thumbnailImage` | Der Pfad zu einem Bild, welches anstatt des [defaultVideoThumbnail](https://github.com/FFGruenwald/ffg_adventskalender/blob/239e2bd9cca224ec264c87a636a040a2ec419407/js/adventskalenderdaten.js#L3) hinter der Tür angezeigt werden soll. Wird nur berücksichtigt, wenn auch [`showPreviewImagesForPastDoors` in der adventskalender.js](https://github.com/FFGruenwald/ffg_adventskalender/blob/239e2bd9cca224ec264c87a636a040a2ec419407/js/adventskalender.js#L19) auf `true` steht. |
| `video` -> `controls`  | Wenn `true` werden die Steuerelemente zum Abspielen (Play/Pause, Lautstärke, Zeitleiste) angezeigt. Bei dem Wert `false` werden sie ausgeblendet. |
| `video` -> `width`  | Überschreibt die Anzeigebreite des Videos (bei Youtube standardmäßig 560px). Um das Video in voller Breite des Popups anzuzeigen, den Wert "100%" (in doppelten Anführungszeichen) angeben. |
| `video` -> `height`  | Überschreibt die Anzeigehöhe des Videos (bei Youtube standardmäßig 315px). |
| `text` | Eine Beschreibung unter dem Video (analog zu Bildern). Der Text kann mit HTML-Tags formatiert werden.  |
| `link`  | Eine URL zu weiteren Informationen. Ist ein `link` angegeben, wird automatisch ein Button unter dem `text` angezeigt, der die URL in einem neuen Fenster öffnet. |
| `linkText`  | Das Text (Label) für den Button.<br/>Falls ein `link` angegeben wurde, aber kein `linkText` vorhanden ist, wird der Standardtext aus dem Parameter [`defaultLinkText`](https://github.com/FFGruenwald/ffg_adventskalender/blob/239e2bd9cca224ec264c87a636a040a2ec419407/js/adventskalenderdaten.js#L4) für den Button verwendet. |
## Weitere Anpassungsmöglichkeiten
In der Datei [adventskalender.js](https://github.com/mario-fliegner/ffg_adventskalender/blob/dd7fb9f83bbc0e2430a739008c56705dc0cc3a34/js/adventskalender.js#L30) gibt es noch die folgenden Anpassungsmöglichkeiten, um das Verhalten des Kalenders zu steuern:

| Parameter  | Wert |Beschreibung  |
|---|---|---|
| `simulatedDayInDecember `| `0`.. `31` | Simuliert einen bestimmten Tag im Dezember um den Kalender zu testen! <br/>`0`: Normales Kalenderverhalten (bezogen auf den aktuellen Tag)= **PRODUKTIVEINSATZ**<br/>`1`..`24`: Bis zu diesem Tag lassen sich testweise alle Türchen öffnen und das Verhalten testen. Der angegebene Tag selbst zeigt kein Vorschaubild (falls `showPopupForPastDoors ` auf `true` steht).<br/>`25`..`31`: Alle Kalendertürchen sind offen und alle Vorschaubilder werden angezeigt (falls `showPopupForPastDoors ` auf `true` steht)|
| `showPopupForPastDoors ` | `true` oder `false` | Steuert, ob das Popup für vergangene Türchen angezeigt werden soll. Bei `false` lassen sich Türchen, die bereits vergangen sind, nicht mehr öffnen und es erscheint eine Meldung die in [`popupHeader_showPopupForPastDoors_false`](https://github.com/FFGruenwald/ffg_adventskalender/blob/239e2bd9cca224ec264c87a636a040a2ec419407/js/adventskalenderdaten.js#L11) und [`popupText_showPopupForPastDoors_false`](https://github.com/FFGruenwald/ffg_adventskalender/blob/239e2bd9cca224ec264c87a636a040a2ec419407/js/adventskalenderdaten.js#L12) geändert werden kann. |
| `showPreviewImagesForPastDoors`  | `true` oder `false` | Steuert, ob für vergangenen Tage die Bilder als Vorschaubilder (40% Transparenz) hinter den Kalendertürchen angezeigt werden sollen. |

## Usability
Verschiedene Ansichten:
![image](https://github.com/user-attachments/assets/7f24611e-12c1-4467-95cc-3b94b53e42b2)
