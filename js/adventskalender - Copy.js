// Simuliert einen bestimmten Tag im Dezember (nur für Testzwecke).
// Wenn leer (`null`), wird das aktuelle Datum verwendet.
let simulatedDayInDecember = 24;

// Steuert, ob das Popup für vergangene Türchen angezeigt werden soll
let showModalForPastDoors = true;
let showImagesForPastDoors = true;

const headerPopupNotTime = "Adventskalender";
const monthNamesGerman = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

document.addEventListener('DOMContentLoaded', () => {
    const basePath = '';
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
    const notTimeModalBody = document.getElementById('notTimeModalBody');
    const adventCalendar = document.querySelector('.advent-calendar');

    const backgroundImageLarge = dataObject.backgroundImage.large;
    const backgroundImageSmall = dataObject.backgroundImage.small;
    const defaultVideoThumbnail = dataObject.defaultVideoThumbnail;
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

    days.forEach(day => {
        const dayNumber = parseInt(day.getAttribute('data-day'), 10);
        const dayInfo = dataObject[dayNumber];

        if (!dayInfo) return;

        let thumbnail = defaultVideoThumbnail;
        if (dayInfo.video) {
            thumbnail = dayInfo.video.thumbnailImage || defaultVideoThumbnail;
        } else if (dayInfo.image) {
            thumbnail = `${basePath}${dayInfo.image}`;
        }

        // Setze die Standardanzeige
        if (isDecember && showImagesForPastDoors && dayNumber < currentDate) {
            day.style.backgroundImage = `url('${thumbnail}')`;
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
                notTimeModalBody.innerHTML = `Heute ist der ${currentDate}. ${monthNamesGerman[selectedMonth]} ${currentYear}! Die Türchen lassen sich erst ab dem 1. Dezember öffnen...`;
                notTimeModal.show();
            } else if (selectedMonth === 11 && currentDate >= 25) {
                notTimeModalBody.innerHTML = `Heute ist bereits der ${currentDate}. Dezember ${currentYear}, d.h. Weihnachten ist vorüber. Nächstes Jahr öffnet sich unser Kalender wieder!`;
                notTimeModal.show();
            } else if (isDecember && dayNumber <= currentDate) {
                setActiveDay(day);
                day.style.backgroundImage = `url('${thumbnail}')`;
                day.classList.add('opened');
                showModal(dayNumber, dayInfo);
            } else {
                const daysUntilOpen = dayNumber - currentDate;
                if (daysUntilOpen === 1) {
                    notTimeModalBody.innerHTML = `Dieses Türchen kannst du erst morgen öffnen!`;
                } else {
                    if (dayNumber === 24) {
                        notTimeModalBody.innerHTML = `Der Heilige Abend ist erst in ${daysUntilOpen} Tagen. Du musst dich also noch etwas gedulden...`;
                    } else {
                        notTimeModalBody.innerHTML = `Dieses Türchen kann erst in ${daysUntilOpen} Tagen, am ${dayNumber}. Dezember ${currentYear}, geöffnet werden.`;
                    }
                }
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
        modalTitle.textContent = `Adventskalender Türchen ${dayNumber}`;
        
        // Text in ein <p> mit Klasse "popupText" einschließen
        modalText.innerHTML = `<p class="popupText">${dayInfo.text || ""}</p>`;

        const linkText = dayInfo.linkText || defaultLinkText;
        modalLink.href = dayInfo.link || "#";
        modalLink.innerText = linkText;
        modalLink.style.display = dayInfo.link ? 'inline-block' : 'none';

        modalImageContainer.innerHTML = '';
        modalVideoContainer.innerHTML = '';

        if (dayInfo.video) {
            const { source, url, autoplay, controls, loop, width = 560, height = 315 } = dayInfo.video;

            if (source === "youtube") {
                modalVideoContainer.innerHTML = `<iframe width="${width}" height="${height}" src="https://www.youtube.com/embed/${url}?autoplay=${autoplay ? 1 : 0}&controls=${controls ? 1 : 0}" allowfullscreen></iframe>`;
            } else if (source === "mp4" || source === "mov") {
                modalVideoContainer.innerHTML = `<video width="${width}" height="${height}" class="img-fluid" ${autoplay ? "autoplay" : ""} ${controls ? "controls" : ""} ${loop ? "loop" : ""}><source src="${url}" type="video/${source}">Video-Format wird nicht unterstützt. <a href="${url}" download>Herunterladen</a></video>`;
            }

            modalVideoContainer.style.display = 'block';
            modalImageContainer.style.display = 'none';
        } else if (dayInfo.image) {
            modalImageContainer.innerHTML = `<img src="${basePath}${dayInfo.image}" alt="Adventsbild" class="img-fluid">`;
            modalImageContainer.style.display = 'block';
            modalVideoContainer.style.display = 'none';
        } else {
            modalImageContainer.innerHTML = `<p>Kein Inhalt verfügbar.</p>`;
            modalImageContainer.style.display = 'block';
            modalVideoContainer.style.display = 'none';
        }

        const imageModal = new bootstrap.Modal(imageModalElement);
        imageModal.show();
    }
});
