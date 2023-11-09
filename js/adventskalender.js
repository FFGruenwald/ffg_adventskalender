// Steuert, ob das Popup für vergangene Türchen angezeigt werden soll
let showModalForPastDoors = true;

// Steuert, ob Bilder für vergangene Türchen angezeigt werden sollen
let showImagesForPastDoors = true;

// URL des Hintergrundbilds für große Bildschirme
const backgroundImageUrlLarge = 'bilder/hintergrundbild_gross.jpg';

// URL des Hintergrundbilds für kleine Bildschirme
const backgroundImageUrlSmall = 'bilder/hintergrundbild_klein.jpg';

// Label für den Button im Popup
const labelPopupModelLink = "Weitere Informationen...";

// Text in Überschrift im Popup wenn Tür noch nicht geöffnet werden kann
const headerPopupNotTime = "Adventskalender";


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
        } else {
          if (dayNumber === 24) {
            notTimeModalBody.innerHTML = `Schön wäre es sicherlich, wenn heute schon Weihnachten wäre! Aber bis dahin musst Du noch ${daysUntilOpen} Tage warten.`;
          } else {
            notTimeModalBody.innerHTML = `Noch etwas Geduld is angesagt! Du musst noch <strong>${daysUntilOpen} Tage</strong> warten, bis du dieses Türchen öffnen kannst.`;
          }
        }
        notTimeModalLabel.textContent = headerPopupNotTime;
        notTimeModal.show();
      }
    });
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

});
