
import { allSections, loadHomePageData, userSubSections} from "./sectionsManager.js"
import * as elements from './domElements.js'
import { Week } from "../items/Week.js";
import { Day } from "../items/Day.js";
import { Task } from "../items/Task.js";
import { getWeekListFromStorage, deleteAllWeeks, getUserListFromStorage, getLoggedIn } from "./localStorageManager.js";
import { addNewUser } from "./userManager.js";
import { User } from "../items/User.js";
import { saveUserListToStorage } from './localStorageManager.js';
import * as constant from "./constants.js";
//------------------------------------------- TASKS ------------------------------------------
let idTask = null
let daySelected = null
let dayDateSelected = null
export function renderTasks(dayRef, tasksViewContainer, weekList) {
    
      tasksViewContainer.innerHTML = "";
      elements.singleDayTitle.innerText = `${dayRef.dayName} - ${dayRef.date.toLocaleDateString("it-IT")}`;

  if (Array.isArray(dayRef.tasks)) {
    dayRef.tasks.sort((a, b) => a.time.localeCompare(b.time));
    dayRef.tasks.forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "taskCompleteDisplay";

      const taskEditDeleteDiv= document.createElement("div");
      taskEditDeleteDiv.className = "taskEditDeleteDiv";


      const ptaskDescr = document.createElement("p");
      ptaskDescr.className = "taskDescr";
      ptaskDescr.textContent = `${task.time} - ${task.description}`;

      const pEditTaskButton = document.createElement("p");
      pEditTaskButton.id = "pEditTaskButton";
      pEditTaskButton.classList.add("editBtn")
      pEditTaskButton.classList.add("btn")
      pEditTaskButton.title = "Modifica task";
      pEditTaskButton.innerHTML = "&#128736;"

      const taskDeleteButton = document.createElement("p");
      taskDeleteButton.id = "taskDelete";
      taskDeleteButton.classList.add("deleteBtn")
      taskDeleteButton.classList.add("btn")
      taskDeleteButton.innerHTML = "&#x1F5D1;";

      // ✅ Invece di passare dayRef, passiamo la sua data
      taskDeleteButton.addEventListener("click", () => {
        deleteTask(dayRef.date, index, tasksViewContainer, weekList);
      });

      pEditTaskButton.addEventListener("click", (event) => {
    
        console.log("MODIFICA task CLICCATA", task.id);
        console.log("dayRef", dayRef);
        console.log("dayRef.date", dayRef.date);

        elements.editedTaskTime.value = task.time
        elements.editedTaskDescription.value = task.description
        elements.taskNotes.value = task.notes
        idTask = task.id
        daySelected = dayRef
        dayDateSelected = dayRef.date
        console.log("idTask =", idTask);
        // Rimanda l'apertura della modale alla prossima iterazione del ciclo event-loop
        elements.editTaskModale.classList.remove("hidden");
      });

      
      taskEditDeleteDiv.appendChild(pEditTaskButton);
      taskEditDeleteDiv.appendChild(taskDeleteButton);

      
      taskDiv.appendChild(ptaskDescr);
      taskDiv.appendChild(taskEditDeleteDiv);
      tasksViewContainer.appendChild(taskDiv);

      ptaskDescr.addEventListener("click", () => {
        task.done = !task.done;
        ptaskDescr.classList.toggle("done", task.done);
      });
    });
  }
      
    
  }

export function addTask(taskDescription, taskHour, addButton, containerList, dayRef,weekList) {

      

      try {
        
        
        
        if (taskDescription.value.trim().length === 0 && taskHour.value.trim().length === 0) {
          throw new Error("devi inserire un orario e la descrizione deve avere almeno una lettera");
        }else if (taskHour.value.trim().length === 0) {
          throw new Error("devi inserire un orario");
        }else if (taskDescription.value.trim().length === 0) {
          throw new Error("La descrizione deve avere almeno una lettera");
        }

        
        const id = Date.now()
        console.log("su addTask(), id =", id)
        const description = taskDescription.value
        const time = taskHour.value
        const done = false
        const notes = ""
        

        
        const newtask = new Task(id, description, time,done,notes)
        
        newtask.dayRef = dayRef.dayName
        dayRef.tasks.push(newtask);
        // 🔽 Ordina per orario
        dayRef.tasks.sort((a, b) => a.time.localeCompare(b.time));
    
        // 🔐 Aggiorna il localStorage
        localStorage.setItem("weeks", JSON.stringify(weekList.map(week => week.toJSON())))
        // 🔄 Pulisci e ricostruisci il DOM
        renderTasks(dayRef, containerList, weekList);
        // 🧼 Reset campi input
        taskDescription.value = "";
        taskHour.value = "00:00";
        
        
      } catch (error) {
          const errorDiv = document.createElement("div");
          errorDiv.className = "errorMessage";
          errorDiv.textContent = error.message

          addButton.parentElement.appendChild(errorDiv);

          // (Opzionale) Rimuovilo dopo qualche secondo per non lasciarlo fisso
          setTimeout(() => {
              errorDiv.remove();
          }, 3000);

          // 🧼 Reset campi input
          taskDescription.value = "";
          taskHour.value = "00:00";
      }  
      
      
      
  }


export function deleteTask(dayDate, taskIndex, tasksViewContainer, weekList) {
  

  try {

    const dayDateString = new Date(dayDate).toDateString();

    // Trova la settimana e il giorno
    const week = weekList.find(week =>
      week.days.some(day => new Date(day.date).toDateString() === dayDateString)
    );

    if (!week) throw new Error("Settimana non trovata");
    const day = week.days.find(day =>
      new Date(day.date).toDateString() === dayDateString
    );

    if (!day) throw new Error("Giorno non trovato");

    if (!Array.isArray(day.tasks)) throw new Error("Tasks non è un array");

    console.log("task da eliminare",day.tasks[taskIndex])
    // Elimina la task
    day.tasks.splice(taskIndex, 1);

    // Aggiorna il localStorage
    // 🔐 Aggiorna il localStorage
    localStorage.setItem("weeks", JSON.stringify(weekList))
    // Rirenderizza
    renderTasks(day, tasksViewContainer,weekList);

  } catch (error) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "errorMessageDelete";
    errorDiv.textContent = error.message + error.stack;
    tasksViewContainer.appendChild(errorDiv);

    setTimeout(() => {
      errorDiv.remove();
    }, 3000);
  }
}

elements.saveEditTaskBtn.addEventListener("click", () => {
    console.log("ho cliccato la task:", idTask);
    var weekList = getWeekListFromStorage()
    
    if (idTask !== null) {
      editTask(dayDateSelected, elements.editedTaskTime.value, elements.editedTaskDescription.value, elements.taskNotes.value , idTask, weekList);
      elements.editTaskModale.classList.add("hidden");
      const updatedDay = getDayByDate(weekList, dayDateSelected);
      if (updatedDay) {
        console.log(updatedDay)
        renderTasks(updatedDay, elements.tasksViewContainer, weekList);
      } else {
        console.warn("Giorno aggiornato non trovato!");
      } 
    } else {
      console.warn("Nessuna settimana selezionata per la modifica");
    }
    
})

export function editTask(dayDate, editedTime, editedDescr, editedNotes,idTask, weekList) {

  try {

    const dayDateString = new Date(dayDate).toDateString();

    // Trova la settimana e il giorno
    const week = weekList.find(week =>
      week.days.some(day => new Date(day.date).toDateString() === dayDateString)
    );

    if (!week) throw new Error("Settimana non trovata");
    const day = week.days.find(day =>
      new Date(day.date).toDateString() === dayDateString
    );

    if (!day) throw new Error("Giorno non trovato");

    if (!Array.isArray(day.tasks)) throw new Error("Tasks non è un array");

    const taskToEdit = day.tasks.find(t => t.id === idTask);

    if (taskToEdit) {
      taskToEdit.time = editedTime;
      taskToEdit.description = editedDescr;
      taskToEdit.notes = editedNotes
      localStorage.setItem("users", JSON.stringify(weekList));
    } else {
      console.warn("Task da modificare non trovata con ID:", idTask);
    }

  } catch (error) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "errorMessageDelete";
    errorDiv.textContent = error.message;
    tasksViewContainer.appendChild(errorDiv);

    setTimeout(() => {
      errorDiv.remove();
    }, 3000);
  }
}


export function getDayByDate(weekList, targetDate) {
  const targetDateStr = new Date(targetDate).toDateString();

  for (const week of weekList) {
    const day = week.days.find(d => new Date(d.date).toDateString() === targetDateStr);
    if (day) return day;
  }

  return null; // Nessun giorno trovato
}


// ----------------------------------------------- views  ---------------------------------------------------------- 
export function showOnlySection(section, allSections) {
  
  allSections.forEach(sec => sec.style.display = "none");
  section.style.display = "block";
}

// ----------------------------------------------- WEEKS  ---------------------------------------
export function createNewWeekFromToday(userWeekColor, userWeekDescription, tasks) {

  const start = new Date(); // oggi
  const end = new Date();
  end.setDate(start.getDate() + (7 - start.getDay())); // domenica corrente
  var title = ""
  if (userWeekDescription === "" || userWeekDescription.trim().length === 0) {
        title = `SETTIMANA ${start.toLocaleDateString("it-IT")} - ${end.toLocaleDateString("it-IT")}`
  }else{
        title = userWeekDescription
        console.log(title)
  }
  console.log(userWeekDescription)
  console.log("titolo week: ", title)
  const color = userWeekColor // verde
  const week = new Week(start, end, title, color, [])
  const days = generateDaysForWeek(start, end, week, tasks)
  week.id = generateWeekId()
  week.days = days
  
  return week
}

export function createNewWeekFromNextMonday(userWeekColor, userWeekDescription,tasks) {

  const today = new Date();
  const nextMonday = new Date();
  const day = today.getDay();
  const daysUntilNextMonday = (8 - day) % 7 || 7; // minimo 1, massimo 7
  nextMonday.setDate(today.getDate() + daysUntilNextMonday);
  const nextSunday = new Date(nextMonday);
  nextSunday.setDate(nextMonday.getDate() + 6);
  var title = ""
  if (userWeekDescription === "" || userWeekDescription.trim().length === 0) {
        title = `SETTIMANA ${nextMonday.toLocaleDateString()} - ${nextSunday.toLocaleDateString()}`

  }else{
        title = userWeekDescription
  }
  
  const id = generateWeekId()
  const color = userWeekColor // verde
  const week = new Week(nextMonday, nextSunday, title, color, []);
  const days = generateDaysForWeek(nextMonday, nextSunday, week, tasks);
  week.id = id 
  week.days = days;
  return week
}

export function generateDaysForWeek(startDate, endDate, weekRef) {

  const days = []
  const current = new Date(startDate)

  const dayNames = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"]

  while (current <= endDate) {

    const name = dayNames[current.getDay()]
    const newDay = new Day(new Date(current), name, [], false, weekRef)
    days.push(newDay)
    current.setDate(current.getDate()+1)
    
  }
  
  return days

}


export function addNewWeekFromToday(userRef, users, addWeekModale, weeksViewContainer,userWeekColor, userWeekDescription) {
        console.log("addNewWeekFromToday riceve:", userWeekColor.value, userWeekDescription.value);
        const newWeek = createNewWeekFromToday(userWeekColor.value, userWeekDescription.value)
        console.log("userRef",  userRef)

        
        const indexdUser = users.findIndex((user, index) => user.userid === userRef.userid)
        console.log("indexdUser", indexdUser)
        if (indexdUser === -1) return;
        // Trova e aggiorna l'utente direttamente nella lista
        
        
        
        users[indexdUser].weeks.push(newWeek);
        users[indexdUser].weeks.sort((a, b) => a.title.localeCompare(b.title));

        saveUserListToStorage(users);
        addWeekModale.classList.add("hidden");
        renderWeeks(users[indexdUser], weeksViewContainer);

        userWeekColor.value = "#000000";
        userWeekDescription.value = "";

        /*userRef.weeks.push(newWeek);
      
        // 🔽 Ordina per orario
        userRef.weeks.sort((a, b) => a.title.localeCompare(b.title));
    
        // 🔐 Aggiorna il localStorage
        saveUserListToStorage(users)
    
        addWeekModale.classList.add("hidden")

        // 🔄 Pulisci e ricostruisci il DOM
        renderWeeks(userRef,weeksViewContainer)
      
       
        userWeekColor.value = "#000000"
        userWeekDescription.value = ""*/
}

export function resetImputs(input){

  input = ""
}

export function addNewWeekFromNextMonday(userRef, users, addWeekModale, weeksViewContainer,userWeekColor, userWeekDescription) {

        const newWeek = createNewWeekFromNextMonday(userWeekColor.value, userWeekDescription.value)

        const indexdUser = users.findIndex((user, index) => user.userid === userRef.userid)
        console.log("indexdUser", indexdUser)
        if (indexdUser === -1) return;
        // Trova e aggiorna l'utente direttamente nella lista
        
        
        
        users[indexdUser].weeks.push(newWeek);
        users[indexdUser].weeks.sort((a, b) => a.title.localeCompare(b.title));

        saveUserListToStorage(users);
        addWeekModale.classList.add("hidden");
        renderWeeks(users[indexdUser], weeksViewContainer);

        userWeekColor.value = "#000000"
        userWeekDescription.value = ""

}

let idWeek = null

export function renderWeeks(userRef, weeksViewContainer) {

  console.log("renderWeeks, userRef", userRef)
  if(Array.isArray(userRef.weeks)){

      if(userRef.weeks.length > 0){

        weeksViewContainer.innerHTML = ""; // svuota la lista prima di ricostruirla
        userRef.weeks.forEach((week, index) => {

      
        const weekDiv = document.createElement("div");
        weekDiv.className = "weekCompleteDisplay";
        weekDiv.dataset.id = week.id
        weekDiv.title = week.title

      
        const pWeekTile = document.createElement("p");
        pWeekTile.className = "weekTitle";
        pWeekTile.textContent = week.title;

      
        const pWeekColor = document.createElement("p");
        pWeekColor.className = "weekColor";
        pWeekColor.style.backgroundColor = week.color

        const pEditWeekButton = document.createElement("p");
        pEditWeekButton.className = "pEditWeekButton";
        pEditWeekButton.classList.add("editBtn")
        pEditWeekButton.classList.add("btn")
        pEditWeekButton.title = "Modifica settimana";
        pEditWeekButton.innerHTML = "&#128736;"
  
        elements.editedWeekTitle.value = week.title
        elements.editedWeekColor.value = week.color
      // 🗑️ Cancella se clicchi su di lui
      /*taskDeleteButton.addEventListener("click", () => {
        deleteTask(week,weekList,weeksViewContainer)
      });*/

        weekDiv.appendChild(pWeekTile)
        weekDiv.appendChild(pWeekColor)
        weekDiv.appendChild(pEditWeekButton)

        weeksViewContainer.appendChild(weekDiv)

        pEditWeekButton.addEventListener("click", (event) => {
          event.stopPropagation(); // 👈 Prima cosa!
          console.log("MODIFICA SETTIMANA CLICCATA", week.id);

          elements.editedWeekTitle.value = week.title
          elements.editedWeekColor.value = week.color
        
          idWeek = week.id
          // Rimanda l'apertura della modale alla prossima iterazione del ciclo event-loop
          setTimeout(() => {
            elements.editWeekModale.classList.remove("hidden");
          }, 0);
        });

      



      // ✅ Aggiungi qui il tuo event listener
      weekDiv.addEventListener("click", (event) => {
        console.log("div CLICCATo", week.id);
        showOnlySection(userSubSections[1],userSubSections)
        renderWeekDays(userRef.weeks[index], elements.daysViewContainer,elements.taskDescription, elements.taskHour, elements.tasksViewContainer, elements.addTaskButton, userRef.weeks)
            // fai il cambio sezione o altra logica
      });
      
          
    });

    
  }



    }





  }
    

 

    elements.saveEditWeekBtn.addEventListener("click", () => {
        console.log("ho cliccato la settimana:", idWeek);
        if (idWeek !== null) {
          editWeek(elements.editedWeekTitle.value, elements.editedWeekColor.value,getWeekListFromStorage(), idWeek);
          elements.editWeekModale.classList.add("hidden");
          const sortedWeek = getWeekListFromStorage().sort((a, b) => a.title.localeCompare(b.title))
          renderWeeks(sortedWeek, elements.weeksViewContainer); // attenzione che qui devi avere weeksViewContainer definito correttamente
        } else {
          console.warn("Nessuna settimana selezionata per la modifica");
        }
    })


export function sortWeeks(users, weeks, sorting) {
  weeks.sort((a, b) => {

    const nameA = a.title;
    const nameB = b.title;

    if(sorting){

      nameA.localeCompare(nameB)
      saveUserListToStorage(users)
    }else{

      nameB.localeCompare(nameA);
      saveUserListToStorage(users)
    } 
    
  });
}


export function editWeek(editedTitle, editedColor, weekList, idWeek) {

  const weekToEdit = weekList.find(w => w.id === idWeek);

  if (weekToEdit) {
    weekToEdit.title = editedTitle;
    weekToEdit.color = editedColor;
    localStorage.setItem("weeks", JSON.stringify(weekList));
  } else {
    console.warn("Settimana da modificare non trovata con ID:", idWeek);
  }
}

  
// ----------------------------------------- DAYS ------------------------------------------
let currentTaskHandler = null;
export function renderWeekDays(selectedWeek, daysViewContainer,taskDescription,taskHour,tasksViewContainer,addButton,weekList) {
      daysViewContainer.innerHTML = ""; // svuota la lista prima di ricostruirla
      const singleWeekTitle = document.createElement("h1");
      singleWeekTitle.className = "singleWeekTitle";
      singleWeekTitle.innerText = selectedWeek.title
      daysViewContainer.appendChild(singleWeekTitle)

      var idDay = 0
      selectedWeek.days.forEach((day, index) => {



        const dayDiv = document.createElement("div");
        dayDiv.className = "dayCompleteDisplay";
        dayDiv.id=index
        
      
        const pDayName = document.createElement("p");
        pDayName.className = "dayName";
        pDayName.textContent = day.dayName

        const pDayDate = document.createElement("p");
        pDayDate.className = "dayDate";
        pDayDate.textContent = day.date.toLocaleDateString('it-IT');

        dayDiv.appendChild(pDayName)
        dayDiv.appendChild(pDayDate)

        
        daysViewContainer.appendChild(dayDiv)
        
        
        
        // ✅ Aggiungi qui il tuo event listener
        dayDiv.addEventListener("click", () => {
            
            idDay=index
            showOnlySection(userSubSections[2],userSubSections)
            renderTasks(selectedWeek.days[index], elements.tasksViewContainer,weekList)
            
            if (currentTaskHandler) {
              addButton.removeEventListener("click", currentTaskHandler);
            }

            currentTaskHandler = () => {
                addTask(taskDescription, taskHour, addButton, tasksViewContainer, day, weekList);
            };

            addButton.addEventListener("click", currentTaskHandler);
        });

        });

      
    ;
  }




export function setupUIEventListeners() {
    let savedUsers = getUserListFromStorage()
    const weeks = getWeekListFromStorage()
   
    elements.addWeekButton.addEventListener("click", () => {
        elements.addWeekModale.classList.remove("hidden");
    });

    elements.exitAddWeekModale.addEventListener("click", () => {
        elements.addWeekModale.classList.add("hidden");
    });

    elements.exitEditWeekModale.addEventListener("click", () => {
        elements.editWeekModale.classList.add("hidden");
    });

    elements.exitEditTaskModale.addEventListener("click", () => {
        elements.editTaskModale.classList.add("hidden");
    });

    

    elements.registrationBtn.addEventListener("click", () =>{
      
      console.log(savedUsers)
      addNewUser(savedUsers)
    })

    deleteAllWeeks(weeks)

    elements.welcomeMessage.addEventListener("click", () =>{
      localStorage.removeItem("users")
      savedUsers.length = 0
      console.log(savedUsers)
    })
    let up = true
    elements.sortBtn.addEventListener("click", () => {
        if (up === true) {
          if (elements.domBody.classList.contains("dark-theme")) {
            elements.sortBtnImg.src = constant.SORT_DOWN_TEMA_SCURO
            up = false
          }else{
            elements.sortBtnImg.src = constant.SORT_DOWN_TEMA_CHIARO
            up = false
          }
            
          loadHomePageData(getLoggedIn(), up)    
        } else {

          if (elements.domBody.classList.contains("dark-theme")) {
            elements.sortBtnImg.src = constant.SORT_UP_TEMA_SCURO
            up=true
          } else {
            elements.sortBtnImg.src = constant.SORT_UP_TEMA_CHIARO
            up=true
          }

          loadHomePageData(getLoggedIn(), up) 
        }
    });

}

export function generateWeekId() {

  return Date.now()
  
}

export function renderAccountInfo(user){

 elements.nameAccount.innerText = user.name
 elements.surnameAccount.innerText = user.surname
 elements.useridAccount.innerText = user.userid
 elements.emailAccount.innerText = user.email
 elements.passwordAccount.innerText = user.password

}