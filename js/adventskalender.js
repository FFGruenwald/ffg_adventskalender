// Steuert, ob das Modal für vergangene Türchen angezeigt werden soll
let showModalForPastDoors = true;

// Steuert, ob Bilder für vergangene Türchen angezeigt werden sollen
let showImagesForPastDoors = true;

// URL des Hintergrundbilds für große Bildschirme
const backgroundImageUrlLarge = 'bilder/hintergrundbild_gross.jpg';

// URL des Hintergrundbilds für kleine Bildschirme
const backgroundImageUrlSmall = 'bilder/hintergrundbild_klein.jpg';

// Label für den Modal-Link
const labelPopupModelLink = "Weitere Informationen...";

// Warten, bis das Dokument vollständig geladen ist
document.addEventListener('DOMContentLoaded', () => {
  // Basisverzeichnis für Bilder (leer, da Bilder in adventskalenderdaten.js vollständig referenziert sind)
  const basePath = '';
  
  // Aktuelles Jahr, Monat und Tag
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDate = new Date().getDate();
  
  // HTML-Elemente für das Modal
  const imageModalElement = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalText = document.getElementById('modalText');
  const modalLink = document.getElementById('modalLink');
  const modalTitle = document.getElementById('imageModalLabel');
  
  // Modal für "Nicht zur richtigen Zeit" erstellen
  const notTimeModal = new bootstrap.Modal(document.getElementById('notTimeModal'));
  
  // Monatsnamen
  const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"];
  
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
    
    // Datum für den Adventstag erstellen
    const adventDate = new Date(currentYear, 11, dayNumber);
    
    // Formatiertes Datum erstellen
    const formattedDate = `${adventDate.getDate()}. ${monthNames[adventDate.getMonth()]} ${adventDate.getFullYear()}`;
  
    // Zeige Bilder für vergangene Tage sofort an
    if (dayInfo && currentMonth === 11 && dayNumber < currentDate) {
      day.classList.add('opened');
      if (showImagesForPastDoors) {
        day.style.backgroundImage = `url('${basePath}${dayInfo.image}')`;
      }
    }
  
    // Event-Handler für das Klicken auf ein Türchen hinzufügen
    day.addEventListener('click', function () {
      if (currentMonth === 11 && dayNumber === currentDate) {
        // Zeige das Bild für das aktuelle Türchen an und öffne das Modal
        day.classList.add('current');
        day.style.backgroundImage = `url('${basePath}${dayInfo.image}')`;
        showModal(dayNumber, formattedDate, dayInfo);
      } else if (currentMonth === 11 && dayNumber < currentDate && showModalForPastDoors) {
        // Zeige das Modal für vergangene Türchen, wenn showModalForPastDoors true ist
        showModal(dayNumber, formattedDate, dayInfo);
      } else if (currentMonth === 11 && dayNumber > currentDate) {
        // Berechne die Anzahl der Tage bis zum Öffnen des Türchens
        const daysUntilOpen = dayNumber - currentDate;
        const notTimeModalBody = document.getElementById('notTimeModalBody');
        if (daysUntilOpen === 1) {
          notTimeModalBody.textContent = `Morgen ist es endlich soweit und du kannst dieses Türchen öffnen. Bis dahin musst Du aber noch warten...`;
        } else {
          if (dayNumber === 24) {
            notTimeModalBody.textContent = `Schön wäre es sicherlich, wenn heute schon Weihnachten wäre! Aber bis dahin musst Du noch ${daysUntilOpen} Tage warten.`;
          } else {
            notTimeModalBody.textContent = `Noch etwas Geduld is angesagt! Du musst noch ${daysUntilOpen} Tage warten, bis du dieses Türchen öffnen kannst.`;
          }
        }
        notTimeModal.show();
      }
    });
  });
  
  // Funktion zum Anzeigen des Modals für ein Türchen
  function showModal(dayNumber, formattedDate, dayInfo) {
    modalTitle.textContent = `Adventskalender Türchen ${dayNumber} (${formattedDate})`;
    modalImage.src = `${basePath}${dayInfo.image}`;
    modalText.textContent = dayInfo.text;
    modalLink.href = dayInfo.link;
    modalLink.target = '_blank';
    modalLink.style.display = dayInfo.link ? 'inline-block' : 'none';
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
