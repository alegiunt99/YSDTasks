import {renderHabits} from './scripts/functions.js'
import {addTask} from './scripts/functions.js'
import {showOnlySection} from './scripts/functions.js'
// Prendo gli elementi HTML
// links
const weekPageLink = document.getElementById("toWeek")
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

//tasks 
const habitDescription = document.getElementById("newHabitDescription");
const habitHour = document.getElementById("newHabitHour");
const addButton = document.getElementById("addHabitBtn");
const containerList = document.getElementById("ListContainer");

const allSections = [
    homePage, weekPage, daySection, loginSection,
    registrationSection, themeSection, editTaskModale
  ];

homePageLink.addEventListener("click", () => showOnlySection(homePage, allSections));
weekPageLink.addEventListener("click", () => showOnlySection(weekPage, allSections));
loginPageLink.addEventListener("click", () => showOnlySection(loginSection, allSections));
registrationPageLink.addEventListener("click", () => showOnlySection(registrationSection, allSections));
themeSectionLink.addEventListener("click", () => showOnlySection(themeSection, allSections));


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



// Caricamento iniziale da localStorage
const savedHabits = localStorage.getItem("habits");
console.log(savedHabits)

var habitsContainer = []
if (savedHabits) {
  habitsContainer = JSON.parse(savedHabits);
  habitsContainer.sort((a, b) => a.ora.localeCompare(b.ora)); // ordina anche al load  
  renderHabits(habitsContainer, containerList)
}

addTask(habitDescription, habitHour, addButton, habitsContainer, containerList)

