//import {renderTasks, addNewWeekFromToday, addNewWeekFromNextMonday, renderWeeks, addTask} from './scripts/functions.js'
import * as elements from './scripts/domElements.js'
import { Week } from "../items/Week.js";
import * as constant from "./scripts/constants.js";
import { changeTheme } from './scripts/themeManager.js';
import { switchSections, loadHomePageData} from "./scripts/sectionsManager.js"
import { getLoggedIn, getUserListFromStorage, getWeekListFromStorage, showLog, showSavedTheme } from "./scripts/localStorageManager.js"
import { Task } from './items/Task.js';
import {addNewWeekFromNextMonday, addNewWeekFromToday, renderWeekDays, renderWeeks, setupUIEventListeners} from './scripts/functions.js'

document.addEventListener("DOMContentLoaded", () => {
    
    
    console.log(getUserListFromStorage())
    // --------------------------------------------------------- THEME --------------------------------------------------------------------
    
    showSavedTheme()
    
    elements.switchThemeBtn.addEventListener("click", () => {
      changeTheme()   
    });

  
    // --------------------------------------------------------- WEEKS LIST--------------------------------------------------------------------
    
    
    let up = true

    showLog(getLoggedIn())
    // cambiare sezione in base ai click
    switchSections(getLoggedIn(), getUserListFromStorage())
    


    loadHomePageData(getLoggedIn(), up)

    setupUIEventListeners();
  
    
})



