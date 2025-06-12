import * as elements from './domElements.js'
import { showOnlySection, renderWeeks, renderAccountInfo, renderTasks, addNewWeekFromToday, addNewWeekFromNextMonday, addTask, sortWeeks } from "./functions.js";
import * as constant from "./constants.js";
import { getWeekListFromStorage, deleteAllWeeks, getUserListFromStorage, saveUserListToStorage } from "./localStorageManager.js";

export const allSections = [
        elements.generalViewSection, elements.userViewSection, elements.themeSection
      ];



export const generalSubSections = [
        elements.generalHomeSection,elements.loginSection, elements.registrationSection
      ]
export const userSubSections = [
  elements.userHomeSection, elements.singleWeekSection, elements.daySection, elements.accountInfoSection, elements.logoutSection
]

export function switchSections(user, users) {

  if (user && user.isLogged) {
    // Utente loggato → mostra vista utente

    console.log("switchSections, users:",users)
    showOnlySection(elements.userViewSection, allSections);
    showOnlySection(elements.userHomeSection, userSubSections);

    elements.userMenuLinks.classList.remove("hidden");
    elements.generalMenuLinks.classList.add("hidden");

    loadHomePageData(user, getUserListFromStorage())

    // Imposta eventi e viste specifiche utente
    elements.homePageLink.onclick = () => {
      showOnlySection(elements.userViewSection, allSections)
      showOnlySection(elements.userHomeSection, userSubSections);

      elements.userHomeTitle.innerText = "Benvenuto su YSDTASK " + user.name + "!"

      const indexdUser = users.findIndex((u, index) => u.userid === user.userid)
      console.log("indexdUser", indexdUser)
      if (indexdUser === -1) return;
      loadHomePageData(user, true)
      // Qui puoi caricare dati e aggiornare UI
    };

    elements.toAccountBtn.onclick = () => {
      showOnlySection(elements.userViewSection, allSections);
      showOnlySection(elements.accountInfoSection, userSubSections);
      renderAccountInfo(user)
    };

    elements.toLogoutBtn.onclick = () => {
      showOnlySection(elements.userViewSection, allSections);
      showOnlySection(elements.logoutSection, userSubSections);
    };

    elements.startTodayBtn.addEventListener("click", () => {
        console.log(user.weeks)
        addNewWeekFromToday(user, users, elements.addWeekModale, elements.weeksViewContainer, elements.userWeekColor, elements.userWeekDescription);
    });
            
    elements.startNextMondayBtn.addEventListener("click", () => {
                  
      console.log(user.weeks)
      addNewWeekFromNextMonday(user, users, elements.addWeekModale, elements.weeksViewContainer, elements.userWeekColor, elements.userWeekDescription);
    });

    elements.logoutBtn.addEventListener("click", () => {

      const indexdUser = users.findIndex((u, index) => u.userid === user.userid)
      console.log("indexdUser", indexdUser)
      if (indexdUser === -1) return;
      users[indexdUser].isLogged = false
      //user.isLogged = false
      localStorage.setItem("logged", JSON.stringify(null))
      saveUserListToStorage(users)
      showOnlySection(elements.userViewSection, allSections);
      showOnlySection(elements.userHomeSection, userSubSections);
              // Aggiorna dati e UI per la home
                //loadHomePageData(isAscending);
      elements.userMenuLinks.classList.remove("hidden")
      elements.generalMenuLinks.classList.add("hidden")
    })

    elements.themeSectionLink.addEventListener("click", () => showOnlySection(elements.themeSection, allSections));

  } else {
    // Utente NON loggato → mostra vista generica
    showOnlySection(elements.generalViewSection, allSections);
    showOnlySection(elements.generalHomeSection, generalSubSections);

    elements.userMenuLinks.classList.add("hidden");
    elements.generalMenuLinks.classList.remove("hidden");

    // Eventi pagine login/registrazione/home generica
    elements.loginPageLink.onclick = () => {
      showOnlySection(elements.generalViewSection, allSections);
      showOnlySection(elements.loginSection, generalSubSections);
    };

    elements.registrationPageLink.onclick = () => {
      showOnlySection(elements.generalViewSection, allSections);
      showOnlySection(elements.registrationSection, generalSubSections);
    };

    elements.homePageLink.onclick = () => {
      showOnlySection(elements.generalViewSection, allSections);
      showOnlySection(elements.generalHomeSection, generalSubSections);
    };

    elements.themeSectionLink.addEventListener("click", () => showOnlySection(elements.themeSection, allSections));
  }
}

   


      
export function loadHomePageData(logged, sorting) {

    if(logged === null) return 

    var users = getUserListFromStorage()
    const userIndex = users.findIndex((user, index) => user.userid === logged.userid)
    sortWeeks(users, users[userIndex], sorting)

    elements.weeksViewContainer.innerHTML = ""; // svuota
    renderWeeks(users[userIndex], elements.weeksViewContainer)   

}


export function showUserVisual(isLogged){

  

  renderWeeks(user,elements.weeksViewContainer)

}