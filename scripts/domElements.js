// document body
const dom = document
const domBody = document.body
// tutto il codice dentro questo blocco

// ------------------------------------- general visualization --------------------------------------

const generalViewSection = dom.querySelector(".generalViewSection")
const homePageLink = document.getElementById("toHomePage")
const welcomeMessage = dom.querySelector("#welcomeMessage")
const logoImg = document.getElementById("logoImg")
const themeSectionLink = document.getElementById("toTheme")
const themeSection = document.getElementById("themeSection")
const generalMenuLinks = dom.getElementById("generalMenuLinks")
// ------------------------------------- general visualization menu --------------------------------------
const loginPageLink = document.getElementById("toLogin")
const registrationPageLink = document.getElementById("toSignup")
const registrationSection = document.getElementById("registrationSection")
//PAGINE DA ATTIVARE E DISATTIVARE
const homePage = document.querySelector(".homeSection")
const generalHomeSection = dom.getElementById("generalHomeSection")

// --------------------------------------- REGISTRAZIONE UTENTE--------------------------------------------------

const newUserName = dom.querySelector("#userName")
const newUserSurname = dom.querySelector("#userSurname")
const newUserId = dom.querySelector("#newUserid")
const newEmailUser = dom.querySelector("#newEmailUser")
const newUserPassword = dom.querySelector("#newUserPassword")
const registrationBtn = dom.querySelector("#registrationBtn")
const errorDivRegistration = dom.querySelector("#errorDivRegistration")

// --------------------------------------- LOGIN UTENTE--------------------------------------------------

const userId = dom.querySelector("#userName")
const password = dom.querySelector("#password")
const loginBtn = document.getElementById("loginBtn")

// ------------------------------------- user visualization --------------------------------------
const userViewSection = dom.querySelector(".userViewSection")
const userHomeSection = dom.getElementById("userHomeSection")
const userMenuLinks = dom.getElementById("userMenuLinks")
const singleWeekSection = document.getElementById("weekSection")
const daySection = document.getElementById("daySection")
const loginSection = document.getElementById("loginSection")
const toAccountBtn = dom.getElementById("toAccountInfo")
const accountInfoSection = dom.getElementById("accountInfoSection")
const toLogoutBtn = dom.getElementById("toLogout")
const logoutSection = dom.getElementById("logoutSection")
const logoutBtn = dom.getElementById("logoutBtn")

// logoutSection logoutBtn
// ------------ edit week -----------------
const editWeekModale = document.querySelector("#editWeekModale")
const editedWeekTitle = document.querySelector("#editedWeekTitle")
const editedWeekColor = document.querySelector("#editedWeekColor")
const exitEditWeekModale = document.querySelector("#exitEditWeekModale")
const saveEditWeekBtn = dom.querySelector("#saveEditWeekBtn")
//weeks button and elements
const addWeekModale = document.getElementById("weekModal")
const addWeekButton = document.getElementById("addWeekBtn")
const exitAddWeekModale = document.getElementById("exitAddWeekModale")
const weeksViewContainer = document.getElementById("weeksViewContainer")


const daysViewContainer = document.querySelector(".daysViewContainer")
const dayPreviewOnWeekPage = document.getElementsByClassName("dayCompleteDisplay")

const editTaskLink = document.getElementById("toEditTask")
// --- week buttons
const startTodayBtn = document.getElementById("startToday")
const startNextMondayBtn = document.getElementById("startNextMonday")
const userWeekDescription = document.getElementById("userWeekDescription")
const userWeekColor= document.getElementById("userWeekColor")
const clearLocalStorageBtn= document.getElementById("resetLocalStorage")
// -------------------------------- TASKS ----------------------------------------
const taskDescription = document.getElementById("newTaskDescription");
const taskHour = document.getElementById("newTaskTime");
const addTaskButton = document.getElementById("addTaskBtn");
const tasksViewContainer = document.getElementById("tasksViewContainer");
const singleDayTitle = document.querySelector(".dayTitle")
// ----------------- EDIT TASK ------------------------
const editTaskModale = document.querySelector("#editTaskModale")
const editedTaskTime = document.querySelector("#editedTaskTime")
const editedTaskDescription = document.querySelector("#editedTaskDescription")
const exitEditTaskModale = document.querySelector("#exitEditTaskModale")
const saveEditTaskBtn = dom.querySelector("#saveEditTaskBtn")
const taskNotes = dom.querySelector("#taskNotes")
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
            singleDayTitle,
            loginBtn,
            generalViewSection,
            userViewSection,
            userHomeSection,
            toAccountBtn,
            accountInfoSection,
            toLogoutBtn,
            logoutSection,
            logoutBtn,
            generalHomeSection,
            generalMenuLinks,
            userMenuLinks,
            editWeekModale,
            editedWeekTitle,
            editedWeekColor,
            exitEditWeekModale,
            saveEditWeekBtn,
            editedTaskTime,
            editedTaskDescription,
            exitEditTaskModale,
            saveEditTaskBtn,
            taskNotes,
            newUserName,
            newUserSurname,
            newUserId,
            newEmailUser,
            newUserPassword,
            registrationBtn,
            userId,
            password,
            welcomeMessage,
            errorDivRegistration
        }