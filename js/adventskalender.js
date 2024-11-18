// Simuliert einen bestimmten Tag im Dezember (nur für Testzwecke): Werte zwischen 1 und 31.
// Ab Wert "25" werden alle Kalendertürchen offen und anklickbar angezeigt.
// ACHTUNG: Vor Produktivsetzung muss der Wert auf 0 gesetzt, oder die Zeile kommentiert werden!
let simulatedDayInDecember = 24;

// Steuert, ob das Popup für vergangene Türchen angezeigt werden soll.
// Wenn "true": Vergangene Türchen lassen sich öffnen
// Wenn "false": Vergangene Türchen lassen sich nicht mehr öffnen
let showPopupForPastDoors = true;

// Wenn "true": Für alle bereits vergangenen (offenen) Türchen wird das jeweilige Bild/Video leicht transparent angezeigt.
// Wenn "false": Die vergangenen Türchen sind alle geschlossen, lassen sich aber öffnen - sofern oben "showPopupForPastDoors"
// auf "true" steht
let showPreviewImagesForPastDoors = true;

/***** AB HIER KEINE ÄNDERUNGEN NÖTIG *****/

const monthNamesGerman = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

document.addEventListener('DOMContentLoaded', () => {
    const basePath = '';
    if (typeof simulatedDayInDecember === 'undefined') {
        simulatedDayInDecember = 0;
    }
    let currentDate = simulatedDayInDecember || new Date().getDate();
    let selectedMonth = simulatedDayInDecember ? 11 : new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const imageModalElement = document.getElementById('imageModal');
    const modalImageContainer = document.getElementById('modalImageContainer');
    const modalVideoContainer = document.getElementById('modalVideoContainer');
    const modalText = document.getElementById('modalText');
    const modalLink = document.getElementById('modalLink');
    const modalTitle = document.getElementById('imageModalLabel');
    const notTimeModal = new bootstrap.Modal(document.getElementById('notTimeModal'));
    const notTimeModalLabel = document.getElementById('notTimeModalLabel');
    const notTimeModalBody = document.getElementById('notTimeModalBody');
    const adventCalendar = document.querySelector('.advent-calendar');

<<<<<<< Updated upstream

// Monatsnamen
const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"];


let selectedMonth = new Date().getMonth();

// Warten, bis das Dokument vollständig geladen ist
document.addEventListener('DOMContentLoaded', () => {
  // Basisverzeichnis für Bilder (leer, da Bilder in adventskalenderdaten.js vollständig referenziert sind)
  const basePath = '';
  
  // Aktuelles Tag
  let currentDate = new Date().getDate();
  
  // HTML-Elemente für das Modal
  const imageModalElement = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalText = document.getElementById('modalText');
  const modalLink = document.getElementById('modalLink');
  const modalTitle = document.getElementById('imageModalLabel');
  
  // Modal für "Nicht zur richtigen Zeit" erstellen
  const notTimeModal = new bootstrap.Modal(document.getElementById('notTimeModal'));
  
  // Adventskalender-Container auswählen
  const adventCalendar = document.querySelector('.advent-calendar');
  
  // Hintergrundbild für den Adventskalender festlegen
  adventCalendar.style.backgroundImage = `url('${backgroundImageUrlLarge}')`;
  
  // Label für den Modal-Link festlegen
  const labelModelMoreInfo = document.querySelector('#modalLink');
  labelModelMoreInfo.innerText = `${labelPopupModelLink}`;
  
  // Alle Türchen auswählen
  const days = document.querySelectorAll('.day');
  
  // Schleife durch alle Türchen
  days.forEach(day => {
    // Türchennummer aus dem Textinhalt extrahieren und in Ganzzahl umwandeln
    const dayNumber = parseInt(day.textContent, 10);
    
    // Informationen für das Türchen aus dem Datenobjekt abrufen
    const dayInfo = dataObject[dayNumber];
    
    // Zeige Bilder für vergangene Tage sofort an wenn showImagesForPastDoors = true
    if (dayInfo && !showImagesForPastDoors && selectedMonth === 11 && dayNumber < currentDate) {
      day.classList.add('opened');
    }
  
    // Event-Handler für das Klicken auf ein Türchen hinzufügen
    day.addEventListener('click', function () {
      const notTimeModalBody = document.getElementById('notTimeModalBody');
      const notTimeModalLabel = document.getElementById('notTimeModalLabel');
      if (selectedMonth <= 10) {
        //Anzeige beim Klick auf ein Türchen wenn der Monat noch nicht Dezember ist, HTML Tags möglich
        notTimeModalBody.innerHTML = `Heute ist der ${currentDate}. ${monthNames[selectedMonth]}! Die Türchen lassen sich erst ab dem 1. Dezember öffnen...`;
        notTimeModalLabel.textContent = headerPopupNotTime;
        notTimeModal.show();
      } else if (selectedMonth === 11 && currentDate >= 25) {
        notTimeModalBody.innerHTML = `Heute ist bereits der ${currentDate}. Dezember, d.h. Weihnachten ist vorüber. Nächstes Jahr öffnet sich unser Kalender wieder! `;
        notTimeModalLabel.textContent = headerPopupNotTime;
        notTimeModal.show();
      } else if (selectedMonth === 11 && dayNumber === currentDate) {
        // Zeige das Bild für das aktuelle Türchen immer nach einem Klick an und füge roten Rand hinzu
        day.classList.add('current');
        day.classList.add('opened');
        day.style.backgroundImage = `url('${basePath}${dayInfo.image}')`;
        showModal(dayNumber, currentDate, dayInfo);
      } else if (selectedMonth === 11 && dayNumber < currentDate) {
        // Zeige das Modal für vergangene Türchen, wenn showModalForPastDoors true ist
        showModal(dayNumber, currentDate, dayInfo);
      } else if (selectedMonth === 11 && dayNumber > currentDate) {
        // Berechne die Anzahl der Tage bis zum Öffnen des Türchens
        const daysUntilOpen = dayNumber - currentDate;
        if (daysUntilOpen === 1) {
          notTimeModalBody.innerHTML = `Morgen ist es endlich soweit und du kannst dieses Türchen öffnen. Bis dahin musst Du aber noch warten...`;
=======
    const backgroundImageLarge = dataObject.backgroundImage.large;
    const backgroundImageSmall = dataObject.backgroundImage.small;
    const defaultVideoThumbnail = dataObject.defaultVideoThumbnail;
    const defaultTagImage = 'bilder/defaultTag.jpg';
    const defaultLinkText = dataObject.defaultLinkText || "Weitere Informationen...";

    function setCalendarBackground() {
        const windowWidth = window.innerWidth;
        adventCalendar.style.backgroundImage = windowWidth >= 992
            ? `url('${backgroundImageLarge}')`
            : `url('${backgroundImageSmall}')`;
    }

    window.addEventListener('DOMContentLoaded', setCalendarBackground);
    window.addEventListener('resize', setCalendarBackground);

    const days = document.querySelectorAll('.day');
    const isDecember = selectedMonth === 11;
    let activeDay = null;

    function getThumbnail(dayInfo) {
        if (dayInfo.video) {
            return dayInfo.video.thumbnailImage || defaultVideoThumbnail || 'bilder/videoplayer.png';
        }
        return dayInfo.image ? `${basePath}${dayInfo.image}` : defaultTagImage;
    }

    function setDayBackground(day, dayInfo) {
        let thumbnail;
        let backgroundImage;

        if (dayInfo.video) {
            thumbnail = dayInfo.video.thumbnailImage || defaultVideoThumbnail || 'bilder/videoplayer.png';
            backgroundImage = `url('${thumbnail}')`;
        } else {
            thumbnail = dayInfo.image ? `${basePath}${dayInfo.image}` : defaultTagImage;
            backgroundImage = `url('${thumbnail}'), url('${defaultTagImage}')`;
        }

        day.style.backgroundImage = backgroundImage;
        day.style.opacity = '0.6';
    }

    days.forEach((day) => {
        const dayNumber = parseInt(day.getAttribute('data-day'), 10);
        const dayInfo = dataObject[dayNumber];

        if (!dayInfo) return;

        if (isDecember && showPreviewImagesForPastDoors && dayNumber < currentDate) {
            setDayBackground(day, dayInfo);
            day.classList.add('opened');
        } else if (isDecember && dayNumber === currentDate) {
            day.classList.add('current');
            day.style.backgroundColor = 'transparent';
            day.style.border = '2px dashed black';
>>>>>>> Stashed changes
        } else {
            day.classList.add('closed');
            day.style.backgroundColor = 'transparent';
        }

        day.addEventListener('click', () => {
            if (selectedMonth <= 10) {
                notTimeModalBody.innerHTML = `Heute ist der ${currentDate}. ${monthNamesGerman[selectedMonth]} ${currentYear}! Die Türchen lassen sich erst ab dem 1. Dezember öffnen...`;
                notTimeModal.show();
            } else if (selectedMonth === 11 && currentDate > 31) {
                notTimeModalBody.innerHTML = `Wusstet du...!? Der Dezember hat schon immer 31 Tage ;-) Bitte den Wert für <em>simulatedDayInDecember</em> ändern.`;
                notTimeModal.show();
            } else if (isDecember && dayNumber < currentDate && !showPopupForPastDoors) {
                notTimeModalLabel.innerHTML = dataObject.texte?.popupHeader_showPopupForPastDoors_false || "Türchen nicht mehr verfügbar";
                notTimeModalBody.innerHTML = dataObject.texte?.popupText_showPopupForPastDoors_false || "Zu spät, dieses Türchen kann nicht mehr geöffnet werden.";
                notTimeModal.show();
            } else if (isDecember && dayNumber <= currentDate) {
                setActiveDay(day);
                setDayBackground(day, dayInfo);
                day.classList.add('opened');
                showModal(dayNumber, dayInfo);
            } else {
                const daysUntilOpen = dayNumber - currentDate;
                if (daysUntilOpen === 1) {
                    notTimeModalBody.innerHTML = `Dieses Türchen kannst du erst morgen öffnen!`;
                } else {
                    notTimeModalBody.innerHTML = `Dieses Türchen kann erst in ${daysUntilOpen} Tagen, am ${dayNumber}. Dezember ${currentYear}, geöffnet werden.`;
                }
                notTimeModal.show();
            }
        });
    });
<<<<<<< Updated upstream
  });
  
  // Funktion zum Anzeigen des Modals für ein Türchen
  function showModal(dayNumber, currentDate, dayInfo) {
    modalTitle.textContent = `Adventskalender Türchen ${dayNumber}`;
    modalImage.src = `${basePath}${dayInfo.image}`;
    modalText.innerHTML = dayInfo.text;
    modalLink.href = dayInfo.link;
    modalLink.target = '_blank';
    modalLink.style.display = dayInfo.link ? 'inline-block' : 'none';
    //check configuration
    if(document.getElementById('showModalForPastDoors') && !document.getElementById('showModalForPastDoors').checked && currentDate != dayNumber) {
      return;
    }
    const imageModal = new bootstrap.Modal(imageModalElement);
    imageModal.show();
  }
  
  // Funktion zum Festlegen des Hintergrundbilds basierend auf der Bildschirmgröße
  function setCalendarBackground() {
    const adventCalendar = document.querySelector('.advent-calendar');
    const windowWidth = window.innerWidth;
  
    if (windowWidth >= 992) { // Ab 992 Pixel Breite
      adventCalendar.style.backgroundImage = `url('${backgroundImageUrlLarge}')`;
    } else {
      adventCalendar.style.backgroundImage = `url('${backgroundImageUrlSmall}')`;
    }
  }
  
  // Event-Handler für das Laden der Seite und das Ändern der Bildschirmgröße
  window.addEventListener('DOMContentLoaded', setCalendarBackground);
  window.addEventListener('resize', setCalendarBackground);

=======

    function setActiveDay(day) {
        if (activeDay) {
            activeDay.classList.remove('active');
            activeDay.style.border = '2px dashed black';
        }
        day.classList.add('active');
        day.style.border = '2px solid #DA1F3D';
        activeDay = day;
    }

    function showModal(dayNumber, dayInfo) {
        modalTitle.textContent = `Adventskalender Türchen ${dayNumber}`;
        modalText.innerHTML = `<p class="popupText">${dayInfo.text || ""}</p>`;

        const linkText = dayInfo.linkText || defaultLinkText;
        modalLink.href = dayInfo.link || "#";
        modalLink.innerText = linkText;
        modalLink.style.display = dayInfo.link ? 'inline-block' : 'none';

        modalImageContainer.innerHTML = '';
        modalVideoContainer.innerHTML = '';

        if (dayInfo.video) {
            const { source, url, controls, loop, width = 560, height = 315 } = dayInfo.video;
            if (source === "youtube") {
                modalVideoContainer.innerHTML = `<iframe width="${width}" height="${height}" src="https://www.youtube.com/embed/${url}?enablejsapi=1&controls=${controls ? 1 : 0}" allowfullscreen></iframe>`;
            } else if (source === "mp4" || source === "mov") {
                modalVideoContainer.innerHTML = `<video width="${width}" height="${height}" class="img-fluid" ${controls ? "controls" : ""} ${loop ? "loop" : ""}><source src="${url}" type="video/${source}">Video-Format wird nicht unterstützt. <a href="${url}" download>Herunterladen</a></video>`;
            }
            modalVideoContainer.style.display = 'block';
            modalImageContainer.style.display = 'none';
        } else {
            const thumbnail = getThumbnail(dayInfo);
            modalImageContainer.innerHTML = `<img src="${thumbnail}" alt="Adventsbild" class="img-fluid" onerror="this.src='${defaultTagImage}'">`;
            modalImageContainer.style.display = 'block';
            modalVideoContainer.style.display = 'none';
        }

        $(imageModalElement).on('hidden.bs.modal', stopVideoPlayback);
        const imageModal = new bootstrap.Modal(imageModalElement);
        imageModal.show();
    }

    function stopVideoPlayback() {
        const youtubeFrame = document.querySelector('iframe');
        const html5Video = document.querySelector('video');

        if (youtubeFrame) {
            youtubeFrame.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
        }
        if (html5Video) {
            html5Video.pause();
        }
    }
>>>>>>> Stashed changes
});
