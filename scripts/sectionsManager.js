import * as elements from './domElements.js'
import { showOnlySection, renderWeeks, renderTasks, addNewWeekFromToday, addNewWeekFromNextMonday, addTask, sortWeeks } from "./functions.js";
import * as constant from "./constants.js";
import { getWeekListFromStorage, deleteAllWeeks } from "./localStorageManager.js";
export const allSections = [
        elements.homePage, elements.singleWeekSection, elements.daySection, elements.loginSection,
        elements.registrationSection, elements.themeSection, elements.editTaskModale
      ];

export function switchSections(isAscending) {
    elements.homePageLink.addEventListener("click", () => {

      
    // Mostra la sezione homePage
      showOnlySection(elements.homePage, allSections);

    // Aggiorna dati e UI per la home
      loadHomePageData(isAscending);
    });

    elements.loginPageLink.addEventListener("click", () => showOnlySection(elements.loginSection, allSections));
    elements.registrationPageLink.addEventListener("click", () => showOnlySection(elements.registrationSection, allSections));
    elements.themeSectionLink.addEventListener("click", () => showOnlySection(elements.themeSection, allSections));
}
      
export function loadHomePageData(isAscending) {

    var weeks = getWeekListFromStorage()|| []
    
    var sortedWeeks = sortWeeks(weeks, isAscending)

    elements.weeksViewContainer.innerHTML = ""; // svuota
    renderWeeks(sortedWeeks, elements.weeksViewContainer)  
    console.log(weeks)


    console.log("settimane aggiornate: ", weeks)

    elements.addWeekButton.addEventListener("click", () => {
      elements.addWeekModale.classList.remove("hidden")
    })

    elements.exitAddWeekModale.addEventListener("click", () => {
      elements.addWeekModale.classList.add("hidden")
    })

    elements.startTodayBtn.addEventListener("click", () => {
      addNewWeekFromToday(sortedWeeks, elements.addWeekModale,elements.weeksViewContainer,elements.userWeekColor, elements.userWeekDescription)
    })

    elements.startNextMondayBtn.addEventListener("click", () => {
      addNewWeekFromNextMonday(sortedWeeks, elements.addWeekModale, weeksViewContainer,elements.userWeekColor, elements.userWeekDescription)
    })

    deleteAllWeeks(weeks)
}