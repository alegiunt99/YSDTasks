//import {renderTasks, addNewWeekFromToday, addNewWeekFromNextMonday, renderWeeks, addTask} from './scripts/functions.js'
import * as elements from './scripts/domElements.js'
import { Week } from "../items/Week.js";
import * as constant from "./scripts/constants.js";
import { changeTheme } from './scripts/themeManager.js';
import { switchSections, loadHomePageData} from "./scripts/sectionsManager.js"
import { getLoggedIn, getUserListFromStorage, getWeekListFromStorage, showLog, showSavedTheme } from "./scripts/localStorageManager.js"
import { Task } from './items/Task.js';
import {addNewWeekFromNextMonday, addNewWeekFromToday, setupUIEventListeners} from './scripts/functions.js'

document.addEventListener("DOMContentLoaded", () => {
    
    
    const savedUsers = getUserListFromStorage()

    if(Array.isArray(savedUsers)){
      console.log(savedUsers)
    }
    // --------------------------------------------------------- THEME --------------------------------------------------------------------
    
    showSavedTheme()
    
    elements.switchThemeBtn.addEventListener("click", () => {
      changeTheme()   
    });

  
    // --------------------------------------------------------- WEEKS LIST--------------------------------------------------------------------
    
    let loggedIn = getLoggedIn()
    console.log(loggedIn)
    let up = true

    showLog(loggedIn)
    // cambiare sezione in base ai click
    switchSections(loggedIn, savedUsers)
    
    
    loadHomePageData(up);

    
    

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
    

    setupUIEventListeners();
  
    
})



