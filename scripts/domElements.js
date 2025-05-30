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
const weekPreviewOnHomePage = document.getElementsByClassName("WeekCompleteDisplay")
// --- week buttons
const startTodayBtn = document.getElementById("startToday")
const startNextMondayBtn = document.getElementById("startNextMonday")
const userWeekDescription = document.getElementById("userWeekDescription")
const userWeekColor= document.getElementById("userWeekColor")
const clearLocalStorageBtn= document.getElementById("resetLocalStorage")

const taskDescription = document.getElementById("newHabitDescription");
const taskHour = document.getElementById("newHabitHour");
const addTaskButton = document.getElementById("addHabitBtn");
const tasksWiewContainer = document.getElementById("tasksWiewContainer");


const sortBtnImg = document.getElementById("imgSorting")
const sortBtn = document.getElementById("weekFilters")

export {
            homePage, 
            homePageLink, 
            weekPreviewOnHomePage,
            weekSection, 
            weeksViewContainer,
            themeSectionLink,
            loginPageLink,
            registrationPageLink,
            editTaskLink,
            daySection,
            loginSection,
            registrationSection,
            themeSection,
            editTaskModale,
            addWeekModale,
            addWeekButton,
            exitAddWeekModale,
            startTodayBtn,
            startNextMondayBtn,
            userWeekDescription,
            userWeekColor,
            clearLocalStorageBtn,
            taskHour,
            addTaskButton,
            tasksWiewContainer,
            sortBtnImg,
            sortBtn,
            
        }