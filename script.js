import {showOnlySection, addNewWeekFromToday, addNewWeekFromNextMonday, renderWeeks} from './scripts/functions.js'
import * as elements from './scripts/domElements.js'
import { Week } from "../items/Week.js";
import * as constant from "./scripts/constants.js";
import { changeTheme } from './scripts/changeTheme.js';

document.addEventListener("DOMContentLoaded", () => {

    
    const allSections = [
        elements.homePage, daySection, elements.loginSection,
        elements.registrationSection, elements.themeSection, editTaskModale
      ];
    
    elements.homePageLink.addEventListener("click", () => showOnlySection(elements.homePage, allSections));
    elements.loginPageLink.addEventListener("click", () => showOnlySection(elements.loginSection, allSections));
    elements.registrationPageLink.addEventListener("click", () => showOnlySection(elements.registrationSection, allSections));
    elements.themeSectionLink.addEventListener("click", () => showOnlySection(elements.themeSection, allSections));
    

    // --------------------------------------------------------- THEME --------------------------------------------------------------------
    //aggiungere il cambio di tema con le classi
    
    
    // Carica il tema salvato in precedenza
    const savedTheme = localStorage.getItem("theme");
    const savedLogo = localStorage.getItem("logo-src")
    const savedSortBtnSrc = localStorage.getItem("sort-png-src")
    if (savedTheme) {
      document.body.classList.add(savedTheme);
      if (savedLogo) {
        elements.homePageLink.src = savedLogo;
      }
      if (savedLogo) {
        elements.sortBtnImg.src = savedSortBtnSrc;
      }
    } else {
      document.body.classList.add("dark-theme");
      elements.homePageLink.src = constant.LOGO_TEMA_SCURO; // default
      elements.sortBtnImg.src = constant.SORT_UP_TEMA_SCURO
    }

    elements.switchThemeBtn.addEventListener("click", () => {
      changeTheme()   
    });

    var up = true

    elements.sortBtn.addEventListener("click", () => {
        if (up === true) {
          if (document.body.classList.contains("dark-theme")) {
            elements.sortBtnImg.src = constant.SORT_DOWN_TEMA_SCURO
            up = false
          }else{
            elements.sortBtnImg.src = constant.SORT_DOWN_TEMA_CHIARO
            up = false
          }
            
            
        } else {

          if (document.body.classList.contains("dark-theme")) {
            elements.sortBtnImg.src = constant.SORT_UP_TEMA_SCURO
            up=true
          } else {
            elements.sortBtnImg.src = constant.SORT_UP_TEMA_CHIARO
            up=true
          }
            
        }
    }); 

    // --------------------------------------------------------- WEEKS --------------------------------------------------------------------
    

    
    const savedWeeks = localStorage.getItem("weeks");
    var weekList = []
    if (savedWeeks) {
      try {
        const parsed = JSON.parse(savedWeeks);
        if (Array.isArray(parsed)) {
          weekList = parsed.map(w => Week.fromJSON(w));
          renderWeeks(weekList, elements.weeksViewContainer)
        } else {
          console.warn("Formato non valido per weeks:", parsed);
        }
        } catch (e) {
          console.error("Errore nel parsing di weeks:", e);
        }
    }


    elements.addWeekButton.addEventListener("click", () => {
      elements.addWeekModale.classList.remove("hidden")
    })

    elements.exitAddWeekModale.addEventListener("click", () => {
      elements.addWeekModale.classList.add("hidden")
    })

    elements.startTodayBtn.addEventListener("click", () => {
      addNewWeekFromToday(weekList, elements.addWeekModale,elements.weeksViewContainer,elements.userWeekColor, elements.userWeekDescription)
    })

    elements.startNextMondayBtn.addEventListener("click", () => {
      addNewWeekFromNextMonday(weekList, elements.addWeekModale, weeksViewContainer,elements.userWeekColor, elements.userWeekDescription)
    })

    elements.clearLocalStorageBtn.addEventListener("click", () => {
      localStorage.clear()
      weekList.length = 0; // 🧹 Svuota anche l'array in memoria
      elements.weeksViewContainer.innerHTML = ""; // 🧹 Svuota anche il DOM (opzionale ma sicuro)
      renderWeeks(weekList,weeksViewContainer)
      console.log(weekList)
    })

    // --------------------------------------------------------- TASKS --------------------------------------------------------------------
    // Caricamento iniziale da localStorage
    /* const savedHabits = localStorage.getItem("habits");
    console.log(savedHabits)

    var habitsContainer = []
    if (savedHabits) {
      habitsContainer = JSON.parse(savedHabits);
      habitsContainer.sort((a, b) => a.ora.localeCompare(b.ora)); // ordina anche al load  
      renderHabits(habitsContainer, containerList)
    }

    addTask(habitDescription, habitHour, addButton, habitsContainer, containerList) */
})



