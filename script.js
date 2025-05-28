import {renderHabits, addTask, showOnlySection, createNewWeekFromToday, createNewWeekFromNextMonday, addNewWeekFromToday} from './scripts/functions.js'
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
    const weekPage = document.getElementById("weekSection")
    const daySection = document.getElementById("daySection")
    const loginSection = document.getElementById("loginSection")
    const registrationSection = document.getElementById("registrationSection")
    const themeSection = document.getElementById("themeSection")
    const editTaskModale = document.getElementById("editTaskModale")
    const addWeekModale = document.getElementById("weekModal")
    const addWeekButton = document.getElementById("addWeekBtn")
    const exitAddWeekModale = document.getElementById("exitAddWeekModale")
    const weeksViewContainer = document.getElementById("weeksViewContainer")
    const startTodayBtn = document.getElementById("startToday")

    //tasks 
    const habitDescription = document.getElementById("newHabitDescription");
    const habitHour = document.getElementById("newHabitHour");
    const addButton = document.getElementById("addHabitBtn");
    const containerList = document.getElementById("ListContainer");

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
            localStorage.setItem("theme", "light-theme");
        } else {
            document.body.classList.remove("light-theme");
            document.body.classList.add("dark-theme");
            localStorage.setItem("theme", "dark-theme");
        }
    });

    // --------------------------------------------------------- WEEKS --------------------------------------------------------------------
    const savedWeeks = localStorage.getItem("weeks");
    var weekList = []
    if (savedWeeks) {
      try {
        const parsed = JSON.parse(savedWeeks);
        console.log(parsed)
        if (Array.isArray(parsed)) {
          weekList = parsed.map(w => Week.fromJSON(w));
        } else {
          console.warn("Formato non valido per weeks:", parsed);
        }
        } catch (e) {
          console.error("Errore nel parsing di weeks:", e);
        }
    }

    console.log("Array su localStorage: " + savedWeeks)

    addWeekButton.addEventListener("click", () => {
      addWeekModale.classList.remove("hidden")
    })

    exitAddWeekModale.addEventListener("click", () => {
      addWeekModale.classList.add("hidden")
    })

    startTodayBtn.addEventListener("click", () => {
      addNewWeekFromToday(weekList, addWeekModale)
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



