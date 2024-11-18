// Simuliert einen bestimmten Tag im Dezember (nur für Testzwecke).
let simulatedDayInDecember = 24;

// Steuert, ob das Popup für vergangene Türchen angezeigt werden soll.
let showPopupForPastDoors = true;

// Zeigt Vorschaubilder für vergangene Türchen an, wenn "true".
let showPreviewImagesForPastDoors = true;

/***** AB HIER KEINE ÄNDERUNGEN NÖTIG *****/

const monthNamesGerman = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

document.addEventListener('DOMContentLoaded', () => {
    // Initialisierung des basePath mit Prüfung auf Slash am Ende
    let basePath = dataObject.imageBasePath || '';
    if (basePath && !basePath.endsWith('/')) {
        basePath += '/';
    }
    // Wenn simulatedDayInDecember oben kommentiert wurde, also //let simulatedDayInDecember = 24; dann setze auf 0.
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
    const notTimeModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('notTimeModal'));
    const notTimeModalLabel = document.getElementById('notTimeModalLabel');
    const notTimeModalBody = document.getElementById('notTimeModalBody');
    const adventCalendar = document.querySelector('.advent-calendar');

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

    function isExternalUrl(url) {
        return typeof url === 'string' && (url.startsWith('https://') || url.startsWith('http://') || url.startsWith('www.'));
    }
    

    function getThumbnail(dayInfo) {
        if (dayInfo.video) {
            const videoThumbnail = dayInfo.video.thumbnailImage;
            return isExternalUrl(videoThumbnail)
                ? videoThumbnail
                : (videoThumbnail ? `${basePath}${videoThumbnail}` : defaultVideoThumbnail || 'bilder/videoplayer.png');
        }
    
        const image = dayInfo.image;
        return isExternalUrl(image) ? image : (image ? `${basePath}${image}` : defaultTagImage);
    }

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
                notTimeModalBody.innerHTML = `Heute ist der ${currentDate}. ${monthNamesGerman[selectedMonth]} ${currentYear}! Die Türchen lassen sich erst ab dem 1. Dezember öffnen...`;
                notTimeModal.show();
            } else if (selectedMonth === 11 && currentDate > 31) {
                notTimeModalLabel.innerHTML = `Uppsi`;
                notTimeModalBody.innerHTML = `Wusstest du...!? Der Dezember hat nur 31 Tage ;-) Bitte den Wert für <em>simulatedDayInDecember</em> ändern.`;
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
                notTimeModalLabel.innerHTML = dataObject.texte?.popupHeader_notTimeModal || "Gedult ist noch gefragt.";
                notTimeModalBody.innerHTML = daysUntilOpen === 1
                    ? "Dieses Türchen kannst du erst morgen öffnen!"
                    : `Dieses Türchen kann erst in ${daysUntilOpen} Tagen, am ${dayNumber}. Dezember ${currentYear}, geöffnet werden.`;
                notTimeModal.show();
            }
        });
    });

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
        modalTitle.innerHTML = `Adventskalender Türchen ${dayNumber}`;
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
                modalVideoContainer.innerHTML = `<video width="${width}" height="${height}" class="img-fluid" ${controls ? "controls" : ""} ${loop ? "loop" : ""}><source src="${url}" type="video/${source}"></video>`;
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
    }
});
