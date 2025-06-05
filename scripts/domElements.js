// document body
const dom = document
const domBody = document.body
// tutto il codice dentro questo blocco
const homePageLink = document.getElementById("toHomePage")
const logoImg = document.getElementById("logoImg")
const themeSectionLink = document.getElementById("toTheme")
const loginPageLink = document.getElementById("toLogin")
const registrationPageLink = document.getElementById("toSignup")
const editTaskLink = document.getElementById("toEditTask")
//PAGINE DA ATTIVARE E DISATTIVARE
const homePage = document.getElementById("homeSection")
const singleWeekSection = document.getElementById("weekSection")
const daySection = document.getElementById("daySection")
const loginSection = document.getElementById("loginSection")
const registrationSection = document.getElementById("registrationSection")
const themeSection = document.getElementById("themeSection")
const editTaskModale = document.querySelector(".editTaskModale")
//weeks button and elements
const addWeekModale = document.getElementById("weekModal")
const addWeekButton = document.getElementById("addWeekBtn")
const exitAddWeekModale = document.getElementById("exitAddWeekModale")
const weeksViewContainer = document.getElementById("weeksViewContainer")


const daysViewContainer = document.querySelector(".daysViewContainer")
const dayPreviewOnWeekPage = document.getElementsByClassName("dayCompleteDisplay")
// --- week buttons
const startTodayBtn = document.getElementById("startToday")
const startNextMondayBtn = document.getElementById("startNextMonday")
const userWeekDescription = document.getElementById("userWeekDescription")
const userWeekColor= document.getElementById("userWeekColor")
const clearLocalStorageBtn= document.getElementById("resetLocalStorage")

const taskDescription = document.getElementById("newTaskDescription");
const taskHour = document.getElementById("newTaskTime");
const addTaskButton = document.getElementById("addTaskBtn");
const tasksViewContainer = document.getElementById("tasksViewContainer");
const singleDayTitle = document.querySelector(".dayTitle")


const sortBtnImg = document.getElementById("imgSorting")
const sortBtn = document.getElementById("weekFilters")

const switchThemeBtn = document.getElementById("switchThemeBtn");

export {    
            dom,
            domBody,          
            homePage, 
            homePageLink,
            logoImg,
            singleWeekSection, 
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
            taskDescription,
            taskHour,
            addTaskButton,
            tasksViewContainer,
            sortBtnImg,
            sortBtn,
            switchThemeBtn,
            daysViewContainer,
            dayPreviewOnWeekPage,
            singleDayTitle
        }