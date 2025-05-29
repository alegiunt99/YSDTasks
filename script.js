import {renderHabits, addTask, showOnlySection, createNewWeekFromToday, createNewWeekFromNextMonday, addNewWeekFromToday,  addNewWeekFromNextMonday, renderWeeks} from './scripts/functions.js'
import { Week } from "../items/Week.js";
// import { Day } from "../Classes/Day.js";
// Prendo gli elementi HTML
// links
document.addEventListener("DOMContentLoaded", () => {
    // tutto il codice dentro questo blocco
    const homePageLink = document.getElementById("toHomePage")
    const themeSectionLink = document.getElementById("toTheme")
    const loginPageLink = document.getElementById("toLogin")
    const registrationPageLink = document.getElementById("toSignup")
    const editTaskLink = document.getElementById("toEditTask")

    //PAGINE DA ATTIVARE E DISATTIVARE
    const homePage = document.getElementById("homeSection")
    const weekSection = document.getElementById("weekSection")
    const daySection = document.getElementById("daySection")
    const loginSection = document.getElementById("loginSection")
    const registrationSection = document.getElementById("registrationSection")
    const themeSection = document.getElementById("themeSection")
    const editTaskModale = document.getElementById("editTaskModale")
    //weeks button and elements
    const addWeekModale = document.getElementById("weekModal")
    const addWeekButton = document.getElementById("addWeekBtn")
    const exitAddWeekModale = document.getElementById("exitAddWeekModale")
    const weeksViewContainer = document.getElementById("weeksViewContainer")
    // --- week buttons
    const startTodayBtn = document.getElementById("startToday")
    const startNextMondayBtn = document.getElementById("startNextMonday")
    const userWeekDescription = document.getElementById("userWeekDescription")
    const userWeekColor= document.getElementById("userWeekColor")
    const clearLocalStorageBtn= document.getElementById("resetLocalStorage")
    
    //tasks 
    const habitDescription = document.getElementById("newHabitDescription");
    const habitHour = document.getElementById("newHabitHour");
    const addButton = document.getElementById("addHabitBtn");
    const tasksWiewContainer = document.getElementById("tasksWiewContainer");


    const sortBtnImg = document.getElementById("imgSorting")
    const sortBtn = document.getElementById("weekFilters")

    const allSections = [
        homePage, daySection, loginSection,
        registrationSection, themeSection, editTaskModale
      ];
    
    homePageLink.addEventListener("click", () => showOnlySection(homePage, allSections));
    loginPageLink.addEventListener("click", () => showOnlySection(loginSection, allSections));
    registrationPageLink.addEventListener("click", () => showOnlySection(registrationSection, allSections));
    themeSectionLink.addEventListener("click", () => showOnlySection(themeSection, allSections));
    
    // --------------------------------------------------------- THEME --------------------------------------------------------------------
    // aggiungere il cambio di tema con le classi
    const switchThemeBtn = document.getElementById("switchThemeBtn");
    
    // Carica il tema salvato in precedenza
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    } else {
        // Di default parte con dark-theme
        document.body.classList.add("dark-theme");
    }

    switchThemeBtn.addEventListener("click", () => {
        if (document.body.classList.contains("dark-theme")) {
            document.body.classList.remove("dark-theme");
            document.body.classList.add("light-theme");
            sortBtnImg.src = "https://img.icons8.com/fluency-systems-filled/48/161727/sort-amount-up.png"
            homePageLink.src = "./foto/logo_app_schermo_chiaro.png"
            localStorage.setItem("theme", "light-theme");
            
        } else {
            document.body.classList.remove("light-theme");
            document.body.classList.add("dark-theme");
            localStorage.setItem("theme", "dark-theme");
            homePageLink.src = "./foto/logo_app.png"
            sortBtnImg.src = "https://img.icons8.com/fluency-systems-filled/48/AEAEAE/sort-amount-up.png"
        }
    });

    var up = true

    sortBtn.addEventListener("click", () => {
        if (up === true) {
          if (document.body.classList.contains("dark-theme")) {
            sortBtnImg.src = "https://img.icons8.com/fluency-systems-filled/48/AEAEAE/generic-sorting.png"
            up = false
          }else{
            sortBtnImg.src = "https://img.icons8.com/fluency-systems-filled/48/161727/generic-sorting.png"
            up = false
          }
            
            
        } else {

          if (document.body.classList.contains("dark-theme")) {
            sortBtnImg.src = "https://img.icons8.com/fluency-systems-filled/48/AEAEAE/sort-amount-up.png"
            up=true
          } else {
            sortBtnImg.src = "https://img.icons8.com/fluency-systems-filled/48/161727/sort-amount-up.png"
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
          renderWeeks(weekList, weeksViewContainer)
        } else {
          console.warn("Formato non valido per weeks:", parsed);
        }
        } catch (e) {
          console.error("Errore nel parsing di weeks:", e);
        }
    }


    addWeekButton.addEventListener("click", () => {
      addWeekModale.classList.remove("hidden")
    })

    exitAddWeekModale.addEventListener("click", () => {
      addWeekModale.classList.add("hidden")
    })

    startTodayBtn.addEventListener("click", () => {
      addNewWeekFromToday(weekList, addWeekModale,weeksViewContainer,userWeekColor, userWeekDescription)
      console.log("Array su localStorage: " + savedWeeks)
    })

    startNextMondayBtn.addEventListener("click", () => {
      addNewWeekFromNextMonday(weekList, addWeekModale, weeksViewContainer,userWeekColor, userWeekDescription)
      console.log("Array su localStorage: " + savedWeeks)
    })

    clearLocalStorageBtn.addEventListener("click", () => {
      localStorage.clear()
      weekList.length = 0; // 🧹 Svuota anche l'array in memoria
      weeksViewContainer.innerHTML = ""; // 🧹 Svuota anche il DOM (opzionale ma sicuro)
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



