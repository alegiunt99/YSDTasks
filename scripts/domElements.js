// document body
const dom = document
const domBody = document.body
// tutto il codice dentro questo blocco

// ------------------------------------- general visualization --------------------------------------

const generalViewSection = dom.querySelector(".generalViewSection")
const homePageLink = document.getElementById("toHomePage")
const logoImg = document.getElementById("logoImg")
const themeSectionLink = document.getElementById("toTheme")
const themeSection = document.getElementById("themeSection")
const generalMenuLinks = dom.getElementById("generalMenuLinks")
// ------------------------------------- general visualization menu --------------------------------------
const loginPageLink = document.getElementById("toLogin")
const loginBtn = document.getElementById("loginBtn")
const registrationPageLink = document.getElementById("toSignup")
const registrationSection = document.getElementById("registrationSection")
//PAGINE DA ATTIVARE E DISATTIVARE
const homePage = document.querySelector(".homeSection")
const generalHomeSection = dom.getElementById("generalHomeSection")

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
const editTaskModale = document.querySelector(".editTaskModale")
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
            userMenuLinks
        }