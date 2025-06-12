import { allSections, userSubSections, generalSubSections ,loadHomePageData} from "./sectionsManager.js"
import * as elements from "./domElements.js";
import * as constant from "./constants.js";
import { Week } from "../items/Week.js";
import { showOnlySection, renderWeeks,  renderTasks, addNewWeekFromToday, addNewWeekFromNextMonday, addTask } from "./functions.js";
import { User } from "../items/User.js";
export function showSavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    const savedLogo = localStorage.getItem("logo-src")
    const savedSortBtnSrc = localStorage.getItem("sort-png-src")
    if (savedTheme) {
      elements.domBody.classList.add(savedTheme);
      if (savedLogo) {
        elements.logoImg.src = savedLogo;
      }
      if (savedLogo) {
        elements.sortBtnImg.src = savedSortBtnSrc;
      }
    } else {
      elements.domBody.classList.add("dark-theme");
      elements.logoImg.src = constant.LOGO_TEMA_SCURO; // default
      elements.sortBtnImg.src = constant.SORT_UP_TEMA_SCURO
    }
    
}


export function getUserListFromStorage() {
  const  savedUsers = localStorage.getItem("users");
  var users = []
    if (savedUsers) {
        try {
          const parsed = JSON.parse(savedUsers) || [];
          if (Array.isArray(parsed)) {
            parsed.forEach(user => {
              user.weeks.forEach(week => {
                week.days.forEach(day => {
                  day.date = new Date(day.date); // 🔁 converte la stringa in oggetto Date
              });
              });
            });
            //weekList = parsed.map(w => Week.fromJSON(w)).sort((a, b) => a.startDate - b.startDate)
            users = parsed.map(u => User.fromJSON(u)) 

            return users 

          } else {
            console.warn("Formato non valido per weeks:", parsed);
          }
          } catch (e) {
            console.error("Errore nel parsing di weeks:", e);
          }
    }

    return []
  
    
}


export function getWeekListFromStorage() {
  const savedWeeks = localStorage.getItem("weeks");
  var weekList = []
    if (savedWeeks) {
        try {
          const parsed = JSON.parse(savedWeeks) || [];
          if (Array.isArray(parsed)) {
            parsed.forEach(week => {
              week.days.forEach(day => {
                day.date = new Date(day.date); // 🔁 converte la stringa in oggetto Date
              });
            });
            //weekList = parsed.map(w => Week.fromJSON(w)).sort((a, b) => a.startDate - b.startDate)
            weekList = parsed.map(w => Week.fromJSON(w)) 

            return weekList 

          } else {
            console.warn("Formato non valido per weeks:", parsed);
          }
          } catch (e) {
            console.error("Errore nel parsing di weeks:", e);
          }
    }

    return []
  
    
}

export function deleteAllWeeks(weekList) {
  elements.clearLocalStorageBtn.addEventListener("click", () => {
        localStorage.removeItem("weeks")
        weekList.length = 0; // 🧹 Svuota anche l'array in memoria
        elements.weeksViewContainer.innerHTML = ""; // 🧹 Svuota anche il DOM (opzionale ma sicuro)
        renderWeeks(weekList,weeksViewContainer)
        console.log(weekList)
  })
}

export function showLog(user) {
    
    if (user === null) {
      
      showOnlySection(elements.generalViewSection, allSections);
      elements.userMenuLinks.classList.add("hidden")
      elements.generalMenuLinks.classList.remove("hidden")
      elements.loginPageLink.addEventListener("click", () => {
        showOnlySection(elements.generalHomeSection, allSections)
        showOnlySection(elements.loginSection, generalSubSections)
      })
      elements.registrationPageLink.addEventListener("click", () => {
        showOnlySection(elements.generalHomeSection, allSections)
        showOnlySection(elements.registrationSection, generalSubSections)
        
      });
      elements.homePageLink.addEventListener("click", () => {
        showOnlySection(elements.generalViewSection, allSections)
        // Mostra la sezione homePage
        showOnlySection(elements.generalHomeSection, generalSubSections);
        // Aggiorna dati e UI per la home
        //loadHomePageData(up);
      })
      elements.themeSectionLink.addEventListener("click", () => showOnlySection(elements.themeSection, allSections));
    } else {
      showOnlySection(elements.userViewSection, allSections);
      showOnlySection(elements.userHomeSection, userSubSections); 

      showOnlySection(elements.userHomeSection, userSubSections);
      
      elements.userHomeTitle.innerText = "Benvenuto su YSDTASK " + user.name + "!"
      // Aggiorna dati e UI per la home
      //loadHomePageData(up);
      elements.userMenuLinks.classList.remove("hidden")
      elements.generalMenuLinks.classList.add("hidden")
      elements.homePageLink.addEventListener("click", () => {
          showOnlySection(elements.userViewSection, allSections)
          // Mostra la sezione homePage
          showOnlySection(elements.userHomeSection, userSubSections);
          // Aggiorna dati e UI per la home
          //loadHomePageData(up);
      });


      elements.toAccountBtn.addEventListener("click", () =>{
        showOnlySection(elements.userViewSection, allSections)
        showOnlySection(elements.accountInfoSection, userSubSections)
      });
      elements.toLogoutBtn.addEventListener("click", () =>{
        showOnlySection(elements.userViewSection, allSections)
        showOnlySection(elements.logoutSection, userSubSections)
      });
      
      elements.themeSectionLink.addEventListener("click", () => showOnlySection(elements.themeSection, allSections));
    }
    
}

export function getLoggedIn(){

  const savedLog = localStorage.getItem("logged");
  const parsedLog = JSON.parse(savedLog)

  return parsedLog

}


export function saveUserListToStorage(users) {
  try {
    const plain = users.map(u => u.toJSON());
    localStorage.setItem("users", JSON.stringify(plain));
  } catch (err) {
    console.error("Impossibile serializzare users:", err);
  }
}