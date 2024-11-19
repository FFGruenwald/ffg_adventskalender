// Simuliert einen bestimmten Tag im Dezember (nur für Testzwecke).
// VOR PRODUKTIVSETZUNG SICHERSTELLEN, dass die nächste Zeile entweder 
// kommentiert ist oder der Wert auf 0 setzen. 
// Mögliche Werte: 0 (=normales Kalenderverhalten), oder 1..24 um einen 
// Tag im Dezember zu simulieren, damit der Kalender getesetet werden kann.
let simulatedDayInDecember = 0;

// Steuert, ob das Popup für vergangene Türchen angezeigt werden soll.
// Wenn "false", lassen sich Türchen, die bereits vergangen mit einem
// Klick sind nicht mehr öffnen und es erscheint eine Meldung. Der Text
// der Meldung lässt sich in adventskalenderdaten.js unter
// dataObject.texte.popupText_showPopupForPastDoors_false ändern
let showPopupForPastDoors = true;

// Zeigt Vorschaubilder für vergangene Türchen an. Wenn "true", schimmern
// die Bilder hinter den bereits geöffneten Türchen transparent durch. 
// Wenn "false", schimmern keine Bilder durch, sondern die Türchen sehen
// ganz normal aus, wie als wenn sie noch nicht geöffnet wurden.
let showPreviewImagesForPastDoors = true;

/***** AB HIER KEINE ÄNDERUNGEN NÖTIG *****/

/**
 * Monatsnamen auf Deutsch.
 */
const monthNamesGerman = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
];

document.addEventListener('DOMContentLoaded', () => {

     //Initialisiert den Basis-Pfad (`basePath`) für lokale Bilder und prüft, ob er mit einem Slash endet.
    let basePath = dataObject.imageBasePath || '';
    if (basePath && !basePath.endsWith('/')) {
        basePath += '/';
    }

    // Wenn `simulatedDayInDecember` nicht definiert ist, wird er auf 0 gesetzt.
    if (typeof simulatedDayInDecember === 'undefined') {
        simulatedDayInDecember = 0;
    }

    const currentDate = simulatedDayInDecember || new Date().getDate();
    const selectedMonth = simulatedDayInDecember ? 11 : new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const imageModalElement = document.getElementById('imageModal');
    const modalImageContainer = document.getElementById('modalImageContainer');
    const modalVideoContainer = document.getElementById('modalVideoContainer');
    const modalText = document.getElementById('modalText');
    const modalLink = document.getElementById('modalLink');
    const modalTitle = document.getElementById('imageModalLabel');
    const notTimeModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('notTimeModal'));
    const notTimeModalLabel = document.getElementById('notTimeModalLabel');
    const notTimeModalBody = document.getElementById('notTimeModalBody');
    const adventCalendar = document.querySelector('.advent-calendar');

    const backgroundImageLarge = dataObject.backgroundImage.large;
    const backgroundImageSmall = dataObject.backgroundImage.small;
    const defaultVideoThumbnail = dataObject.defaultVideoThumbnail;
    const defaultTagImage = 'bilder/defaultTag.jpg';
    const defaultLinkText = dataObject.defaultLinkText || "Weitere Informationen...";

    /**
     * Setzt das Hintergrundbild für den Adventskalender basierend auf der Fensterbreite.
     * TODO: Über Bootstrap Klassen abdecken
     */
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

    /**
     * Prüft, ob eine URL extern ist (http, https oder www).
     * @param {string} url - Die zu prüfende URL.
     * @returns {boolean} - True, wenn die URL extern ist, andernfalls false.
     */
    function isExternalUrl(url) {
        return typeof url === 'string' && (url.startsWith('https://') || url.startsWith('http://') || url.startsWith('www.'));
    }

    /**
     * Liefert das passende Thumbnail für ein Türchen.
     * @param {Object} dayInfo - Die Informationen des Türchens.
     * @returns {string} - Die URL des Thumbnails.
     */
    function getThumbnail(dayInfo) {
        if (dayInfo.video) {
            const videoThumbnail = dayInfo.video.thumbnailImage;
            return isExternalUrl(videoThumbnail)
                ? videoThumbnail
                : (videoThumbnail ? `${basePath}${videoThumbnail}` : defaultVideoThumbnail || 'videoplayer.png');
        }

        const image = dayInfo.image;
        return isExternalUrl(image) ? image : (image ? `${basePath}${image}` : defaultTagImage);
    }

    /**
     * Setzt das Hintergrundbild eines Türchens.
     * @param {HTMLElement} day - Das DOM-Element des Türchens.
     * @param {Object} dayInfo - Die Informationen des Türchens.
     */
    function setDayBackground(day, dayInfo) {
        let thumbnail;
        let backgroundImage;

        if (dayInfo.video) {
            thumbnail = getThumbnail(dayInfo);
            backgroundImage = `url('${thumbnail}')`;
        } else {
            thumbnail = getThumbnail(dayInfo);
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
        } else {
            day.classList.add('closed');
            day.style.backgroundColor = 'transparent';
        }

        day.addEventListener('click', () => {
            if (selectedMonth <= 10) {
                notTimeModalLabel.innerHTML = dataObject.texte?.popupHeader_notTimeModal || "Gedult ist noch gefragt.";
                notTimeModalBody.innerHTML = `Heute ist der ${currentDate}. ${monthNamesGerman[selectedMonth]} ${currentYear}! Die T&uuml;rchen lassen sich erst ab dem 1. Dezember &ouml;ffnen...`;
                notTimeModal.show();
            } else if (selectedMonth === 11 && currentDate > 31) {
                notTimeModalLabel.innerHTML = `Uppsi`;
                notTimeModalBody.innerHTML = `Wusstest du...!? Der Dezember hat nur 31 Tage ;-) Bitte den Wert für <em>simulatedDayInDecember</em> &auml;ndern.`;
                notTimeModal.show();
            } else if (isDecember && dayNumber < currentDate && !showPopupForPastDoors) {
                notTimeModalLabel.innerHTML = dataObject.texte?.popupHeader_showPopupForPastDoors_false || "T&uuml;rchen nicht mehr verfügbar";
                notTimeModalBody.innerHTML = dataObject.texte?.popupText_showPopupForPastDoors_false || "Zu sp&auml;t, dieses T&uuml;rchen kann nicht mehr ge&ouml;ffnet werden.";
                notTimeModal.show();
            } else if (isDecember && dayNumber <= currentDate) {
                setActiveDay(day);
                setDayBackground(day, dayInfo);
                day.classList.add('opened');
                showModal(dayNumber, dayInfo);
            } else {
                const daysUntilOpen = dayNumber - currentDate;
                notTimeModalLabel.innerHTML = dataObject.texte?.popupHeader_notTimeModal || "Gedult ist noch gefragt.";
                notTimeModalBody.innerHTML = daysUntilOpen === 1
                    ? "Dieses T&uuml;rchen kannst du erst morgen &ouml;ffnen!"
                    : `Dieses T&uuml;rchen kann erst in ${daysUntilOpen} Tagen, am ${dayNumber}. Dezember ${currentYear}, ge&ouml;ffnet werden.`;
                notTimeModal.show();
            }
        });
    });

    /**
     * Markiert ein Türchen als aktiv.
     * @param {HTMLElement} day - Das DOM-Element des Türchens.
     */
    function setActiveDay(day) {
        if (activeDay) {
            activeDay.classList.remove('active');
            activeDay.style.border = '2px dashed black';
        }
        day.classList.add('active');
        day.style.border = '2px solid #DA1F3D';
        activeDay = day;
    }

    /**
     * Zeigt das Modal für ein geöffnetes Türchen an.
     * @param {number} dayNumber - Die Nummer des Türchens.
     * @param {Object} dayInfo - Die Informationen des Türchens.
     */
    function showModal(dayNumber, dayInfo) {
        modalTitle.innerHTML = `Adventskalender T&uuml;rchen ${dayNumber}`;
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
                modalVideoContainer.innerHTML = `<iframe id="youtubeFrame" width="${width}" height="${height}" src="https://www.youtube.com/embed/${url}?enablejsapi=1&controls=${controls ? 1 : 0}" allowfullscreen></iframe>`;
            } else if (source === "mp4" || source === "mov") {
                modalVideoContainer.innerHTML = `<video id="html5Video" width="${width}" height="${height}" class="img-fluid" ${controls ? "controls" : ""} ${loop ? "loop" : ""}><source src="${url}" type="video/${source}"></video>`;
            }
            modalVideoContainer.style.display = 'block';
            modalImageContainer.style.display = 'none';
        } else {
            const thumbnail = getThumbnail(dayInfo);
            modalImageContainer.innerHTML = `<img src="${thumbnail}" alt="Adventskalenderbild" class="img-fluid" onerror="this.src='${defaultTagImage}'">`;
            modalImageContainer.style.display = 'block';
            modalVideoContainer.style.display = 'none';
        }
    
        const imageModal = bootstrap.Modal.getOrCreateInstance(imageModalElement);
        imageModal.show();
    
        // Event listener for modal close to stop video playback
        imageModalElement.addEventListener('hidden.bs.modal', stopVideoPlayback);
    }
    
    /**
     * Stoppt die Videowiedergabe, wenn das Modal geschlossen wird.
     */
    function stopVideoPlayback() {
        const youtubeFrame = document.getElementById('youtubeFrame');
        const html5Video = document.getElementById('html5Video');
    
        if (youtubeFrame) {
            youtubeFrame.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
        }
        if (html5Video) {
            html5Video.pause();
        }
    }
});
