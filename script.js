import {renderTasks, addNewWeekFromToday, addNewWeekFromNextMonday, renderWeeks, addTask} from './scripts/functions.js'
import * as elements from './scripts/domElements.js'
import { Week } from "../items/Week.js";
import * as constant from "./scripts/constants.js";
import { changeTheme } from './scripts/themeManager.js';
import { switchSections} from "./scripts/sectionsManager.js"
import { showSavedTheme } from "./scripts/localStorageManager.js"
import { Task } from './items/Task.js';

document.addEventListener("DOMContentLoaded", () => {
    // cambiare sezione in base ai click
    switchSections()

    // --------------------------------------------------------- THEME --------------------------------------------------------------------
    
    showSavedTheme()
    
    elements.switchThemeBtn.addEventListener("click", () => {
      changeTheme()   
    });

    

    // --------------------------------------------------------- WEEKS LIST--------------------------------------------------------------------
    

    
    const savedWeeks = localStorage.getItem("weeks");
    var weekList = []
    if (savedWeeks) {
      try {
        const parsed = JSON.parse(savedWeeks);
        if (Array.isArray(parsed)) {
          // weekList = parsed.map(w => Week.fromJSON(w)).sort((a, b) => a.startDate - b.startDate)
          weekList = parsed.map(w => Week.fromJSON(w))
          renderWeeks(weekList, elements.weeksViewContainer)
          console.log(weekList)
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
      localStorage.removeItem("weeks")
      weekList.length = 0; // 🧹 Svuota anche l'array in memoria
      elements.weeksViewContainer.innerHTML = ""; // 🧹 Svuota anche il DOM (opzionale ma sicuro)
      renderWeeks(weekList,weeksViewContainer)
      console.log(weekList)
    })

    var up = true

    elements.sortBtn.addEventListener("click", () => {
        if (up === true) {
          if (elements.domBody.classList.contains("dark-theme")) {
            elements.sortBtnImg.src = constant.SORT_DOWN_TEMA_SCURO
            up = false
          }else{
            elements.sortBtnImg.src = constant.SORT_DOWN_TEMA_CHIARO
            up = false
          }
            
            
        } else {

          if (elements.domBody.classList.contains("dark-theme")) {
            elements.sortBtnImg.src = constant.SORT_UP_TEMA_SCURO
            up=true
          } else {
            elements.sortBtnImg.src = constant.SORT_UP_TEMA_CHIARO
            up=true
          }
            
        }
    }); 

    // --------------------------------------------------------- SINGLE WEEK DAYS --------------------------------------------------------------------
    


    // --------------------------------------------------------- TASKS --------------------------------------------------------------------
    // Caricamento iniziale da localStorage
    /*const savedtasks = localStorage.getItem("tasks");
    console.log(savedtasks)
    var tasksContainer = []
    
      
   
    if (savedtasks) {
      const parsed = JSON.parse(savedtasks);
      tasksContainer = parsed.map(t => Task.fromJSON(t))
      console.log(tasksContainer)
      //tasksContainer.sort((a, b) => a.time.localeCompare(b.time)); // ordina anche al load  
      renderTasks(tasksContainer, elements.tasksViewContainer)
    }

    elements.addTaskButton.addEventListener("click", () => {
      addTask(elements.taskDescription, elements.taskHour,elements.addTaskButton, tasksContainer, elements.tasksViewContainer)
    })/*/
    
})



