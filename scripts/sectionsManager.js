import * as elements from './domElements.js'
import { showOnlySection, renderWeeks, renderTasks, addNewWeekFromToday, addNewWeekFromNextMonday, addTask, sortWeeks } from "./functions.js";
import * as constant from "./constants.js";
import { getWeekListFromStorage, deleteAllWeeks } from "./localStorageManager.js";
export const allSections = [
        elements.generalViewSection, elements.userViewSection, elements.themeSection
      ];



export const generalSubSections = [
        elements.generalHomeSection,elements.loginSection, elements.registrationSection
      ]
export const userSubSections = [
  elements.userHomeSection, elements.singleWeekSection, elements.daySection, elements.editTaskModale, elements.accountInfoSection, elements.logoutSection
]

export function switchSections(isAscending, logged) {
   
  elements.loginBtn.addEventListener("click", () => {
      logged = true 
      localStorage.setItem("logged", JSON.stringify(logged))
    // Mostra la sezione homePage
      showOnlySection(elements.userViewSection, allSections);
      showOnlySection(elements.userHomeSection, userSubSections);
    // Aggiorna dati e UI per la home
      //loadHomePageData(isAscending);
      elements.userMenuLinks.classList.remove("hidden")
      elements.generalMenuLinks.classList.add("hidden")
      elements.homePageLink.addEventListener("click", () => {
    // Mostra la sezione homePage
      showOnlySection(elements.userHomeSection, userSubSections);
    // Aggiorna dati e UI per la home
        //loadHomePageData(isAscending);
      });

      elements.toAccountBtn.addEventListener("click", () =>  {
        showOnlySection(elements.userViewSection, allSections)
        showOnlySection(elements.accountInfoSection, userSubSections)});
      elements.toLogoutBtn.addEventListener("click", () =>  {
        showOnlySection(elements.userViewSection, allSections)
        showOnlySection(elements.logoutSection, userSubSections)});
    })

    elements.logoutBtn.addEventListener("click", () => {
      
      showOnlySection(elements.generalViewSection, allSections);
      logged = false
      localStorage.setItem("logged", JSON.stringify(logged))
      elements.userMenuLinks.classList.add("hidden")
      elements.generalMenuLinks.classList.remove("hidden")
    })

    elements.loginPageLink.addEventListener("click", () => {
      showOnlySection(elements.generalViewSection, allSections)
      showOnlySection(elements.loginSection, generalSubSections)
    
    });
    elements.registrationPageLink.addEventListener("click", () => {
      showOnlySection(elements.generalViewSection, allSections)
      showOnlySection(elements.registrationSection, generalSubSections)});

      
    elements.homePageLink.addEventListener("click", () => {
      
      if (logged) {
        showOnlySection(elements.userViewSection, allSections)
        
        // Aggiorna dati e UI per la home
        //loadHomePageData(isAscending);
        console.log("sono loggato!")
      }else{
        showOnlySection(elements.generalViewSection, allSections)
        // Mostra la sezione homePage
        //showOnlySection(elements.generalHomeSection, generalSubSections)
        console.log("non sono loggato!")
      }
        
      });
    
    elements.themeSectionLink.addEventListener("click", () => showOnlySection(elements.themeSection, allSections));
}
      
export function loadHomePageData(isAscending) {

    var weeks = getWeekListFromStorage() || []
    
    var sortedWeeks = sortWeeks(weeks, isAscending)

    elements.weeksViewContainer.innerHTML = ""; // svuota
    renderWeeks(sortedWeeks, elements.weeksViewContainer)  
    

}