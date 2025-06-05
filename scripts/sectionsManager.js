import * as elements from './domElements.js'
import { showOnlySection, renderWeeks, renderTasks, addNewWeekFromToday, addNewWeekFromNextMonday, addTask } from "./functions.js";
import { getWeekListFromStorage, deleteAllWeeks } from "./localStorageManager.js";
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
      
export function loadHomePageData() {


    // 1. Prendi i dati aggiornati da storage o stato in memoria
    const weeks = getWeekListFromStorage() || []; // funzione da implementare

    
    // 2. Pulisci e aggiorna la lista settimane in homePage
    
    elements.weeksViewContainer.innerHTML = ""; // svuota

    renderWeeks(weeks, elements.weeksViewContainer)


    console.log("settimane aggiornate: ", weeks)

    elements.addWeekButton.addEventListener("click", () => {
      elements.addWeekModale.classList.remove("hidden")
    })

    elements.exitAddWeekModale.addEventListener("click", () => {
      elements.addWeekModale.classList.add("hidden")
    })

    elements.startTodayBtn.addEventListener("click", () => {
      addNewWeekFromToday(weeks, elements.addWeekModale,elements.weeksViewContainer,elements.userWeekColor, elements.userWeekDescription)
    })

    elements.startNextMondayBtn.addEventListener("click", () => {
      addNewWeekFromNextMonday(weeks, elements.addWeekModale, weeksViewContainer,elements.userWeekColor, elements.userWeekDescription)
    })

    deleteAllWeeks(weeks)
}