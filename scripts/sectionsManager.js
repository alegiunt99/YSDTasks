import * as elements from './domElements.js'
import { showOnlySection, renderWeeks, renderAccountInfo, renderTasks, addNewWeekFromToday, addNewWeekFromNextMonday, addTask, sortWeeks } from "./functions.js";
import * as constant from "./constants.js";
import { getWeekListFromStorage, deleteAllWeeks, getUserListFromStorage } from "./localStorageManager.js";

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

    // Imposta eventi e viste specifiche utente
    elements.homePageLink.onclick = () => {
      showOnlySection(elements.userHomeSection, userSubSections);

      elements.userHomeTitle.innerText = "Benvenuto su YSDTASK " + user.name + "!"

      const indexdUser = users.findIndex((u, index) => u.userid === user.userid)
      console.log("indexdUser", indexdUser)
      if (indexdUser === -1) return;
      renderWeeks(users[indexdUser], weeksViewContainer);
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

      user.isLogged = false
      localStorage.setItem("logged", JSON.stringify(null))
      showOnlySection(elements.userViewSection, allSections);
      showOnlySection(elements.userHomeSection, userSubSections);
              // Aggiorna dati e UI per la home
                //loadHomePageData(isAscending);
      elements.userMenuLinks.classList.remove("hidden")
      elements.generalMenuLinks.classList.add("hidden")
    })

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
  }
}

   
  /*elements.loginBtn.addEventListener("click", () => {
      logged = true 
      logged
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
      showOnlySection(elements.userViewSection, allSections);
  showOnlySection(elements.userHomeSection, userSubSections);
              // Aggiorna dati e UI per la home
                //loadHomePageData(isAscending);
  elements.userMenuLinks.classList.remove("hidden")
  elements.generalMenuLinks.classList.add("hidden")
  elements.homePageLink.addEventListener("click", () => {
              // Mostra la sezione homePage
 
              // Aggiorna dati e UI per la home
                  //loadHomePageData(isAscending);
  });
          
  elements.toAccountBtn.addEventListener("click", () =>  {
      showOnlySection(elements.userViewSection, allSections)
      showOnlySection(elements.accountInfoSection, userSubSections)});
  elements.toLogoutBtn.addEventListener("click", () =>  {
      showOnlySection(elements.userViewSection, allSections)
      showOnlySection(elements.logoutSection, userSubSections)});
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
        //loadHomePageData(isAscending
        console.log(" sono loggato!")
        }else{
        showOnlySection(elements.generalViewSection, allSections)
        // Mostra la sezione homePage
        //showOnlySection(elements.generalHomeSection, generalSubSections)
        console.log("non sono loggato!")
}
        
      });
    
    elements.themeSectionLink.addEventListener("click", () => showOnlySection(elements.themeSection, allSections));*/

      
export function loadHomePageData(logged, sorting) {

    var users = getUserListFromStorage()
    const userIndex = users.findIndex((user, index) => user.userid === logged.userid)
    sortWeeks(users, users[userIndex], sorting)

    elements.weeksViewContainer.innerHTML = ""; // svuota
    renderWeeks(users[userIndex], elements.weeksViewContainer)   

}


export function showUserVisual(isLogged){

  

  renderWeeks(user,elements.weeksViewContainer)

}