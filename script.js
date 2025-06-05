import {renderTasks, addNewWeekFromToday, addNewWeekFromNextMonday, renderWeeks, addTask} from './scripts/functions.js'
import * as elements from './scripts/domElements.js'
import { Week } from "../items/Week.js";
import * as constant from "./scripts/constants.js";
import { changeTheme } from './scripts/themeManager.js';
import { switchSections, loadHomePageData} from "./scripts/sectionsManager.js"
import { getWeekListFromStorage, showSavedTheme } from "./scripts/localStorageManager.js"
import { Task } from './items/Task.js';

document.addEventListener("DOMContentLoaded", () => {
    

    // --------------------------------------------------------- THEME --------------------------------------------------------------------
    
    showSavedTheme()
    
    elements.switchThemeBtn.addEventListener("click", () => {
      changeTheme()   
    });

    

    // --------------------------------------------------------- WEEKS LIST--------------------------------------------------------------------
    

    let up = true
    // cambiare sezione in base ai click
    switchSections(up)
    loadHomePageData(up);

    /*elements.sortBtn.addEventListener("click", () => {
      up = !up; // inverti ordine
      loadHomePageData(up); // ricarica la home con nuovo ordine
    });*/

    
    

    elements.sortBtn.addEventListener("click", () => {
        if (up === true) {
          if (elements.domBody.classList.contains("dark-theme")) {
            elements.sortBtnImg.src = constant.SORT_DOWN_TEMA_SCURO
            up = false
          }else{
            elements.sortBtnImg.src = constant.SORT_DOWN_TEMA_CHIARO
            up = false
          }
            
        loadHomePageData(up)    
        } else {

          if (elements.domBody.classList.contains("dark-theme")) {
            elements.sortBtnImg.src = constant.SORT_UP_TEMA_SCURO
            up=true
          } else {
            elements.sortBtnImg.src = constant.SORT_UP_TEMA_CHIARO
            up=true
          }

        loadHomePageData(up)    
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



