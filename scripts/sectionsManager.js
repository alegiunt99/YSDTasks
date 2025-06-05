import * as elements from './domElements.js'
import { showOnlySection, renderWeeks } from "./functions.js";
import { getWeekListFromStorage } from "./localStorageManager.js";
export const allSections = [
        elements.homePage, elements.singleWeekSection, elements.daySection, elements.loginSection,
        elements.registrationSection, elements.themeSection, elements.editTaskModale
      ];

export function switchSections() {
    elements.homePageLink.addEventListener("click", () => {

      
    // Mostra la sezione homePage
      showOnlySection(elements.homePage, allSections);

    // Aggiorna dati e UI per la home
      loadHomePageData();
    });

    elements.loginPageLink.addEventListener("click", () => showOnlySection(elements.loginSection, allSections));
    elements.registrationPageLink.addEventListener("click", () => showOnlySection(elements.registrationSection, allSections));
    elements.themeSectionLink.addEventListener("click", () => showOnlySection(elements.themeSection, allSections));
}
      
function loadHomePageData() {


    // 1. Prendi i dati aggiornati da storage o stato in memoria
    const weeks = getWeekListFromStorage() || []; // funzione da implementare

    console.log("settimane aggiornate: " + weeks)
    // 2. Pulisci e aggiorna la lista settimane in homePage
    
    elements.weeksViewContainer.innerHTML = ""; // svuota

    renderWeeks(weeks, elements.weeksViewContainer)
}