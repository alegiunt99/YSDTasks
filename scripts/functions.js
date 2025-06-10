
import { allSections, userSubSections} from "./sectionsManager.js"
import * as elements from './domElements.js'
import { Week } from "../items/Week.js";
import { Day } from "../items/Day.js";
import { Task } from "../items/Task.js";
import { getWeekListFromStorage, deleteAllWeeks } from "./localStorageManager.js";
//tasks

export function renderTasks(dayRef, tasksViewContainer) {
    
      tasksViewContainer.innerHTML = "";
      elements.singleDayTitle.innerText = `${dayRef.dayName} - ${dayRef.date.toLocaleDateString("it-IT")}`;

  if (Array.isArray(dayRef.tasks)) {
    dayRef.tasks.sort((a, b) => a.time.localeCompare(b.time));
    dayRef.tasks.forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "taskCompleteDisplay";

      const ptaskDescr = document.createElement("p");
      ptaskDescr.className = "taskDescr";
      ptaskDescr.textContent = `${task.time} - ${task.description}`;

      const taskDeleteButton = document.createElement("button");
      taskDeleteButton.className = "taskDelete";
      taskDeleteButton.innerHTML = "&#x1F5D1;";

      // ✅ Invece di passare dayRef, passiamo la sua data
      taskDeleteButton.addEventListener("click", () => {
        deleteTask(dayRef.date, index, tasksViewContainer);
      });

      taskDiv.appendChild(ptaskDescr);
      taskDiv.appendChild(taskDeleteButton);
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

        
        const id = new Date()
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
        renderTasks(dayRef, containerList);
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


export function deleteTask(dayDate, taskIndex, tasksViewContainer) {
  

  try {

    var weekList = getWeekListFromStorage()

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

    // Elimina la task
    day.tasks.splice(taskIndex, 1);

    // Aggiorna il localStorage
    localStorage.setItem("weeks", JSON.stringify(weekList));

    const updatedWeekList = getWeekListFromStorage()
    // Rirenderizza
    renderTasks(day, tasksViewContainer, updatedWeekList);

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

// views  
export function showOnlySection(section, allSections) {
  
  allSections.forEach(sec => sec.style.display = "none");
  section.style.display = "block";
}

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


export function addNewWeekFromToday(weeksList, addWeekModale, weeksViewContainer,userWeekColor, userWeekDescription) {
        console.log("addNewWeekFromToday riceve:", userWeekColor.value, userWeekDescription.value);
        const newWeek = createNewWeekFromToday(userWeekColor.value, userWeekDescription.value)

        weeksList.push(newWeek);
      
        // 🔽 Ordina per orario
         weeksList.sort((a, b) => a.title.localeCompare(b.title));
    
        // 🔐 Aggiorna il localStorage
        const salvate = weeksList.map(week => week.toJSON());
        localStorage.setItem("weeks", JSON.stringify(salvate));
    
        addWeekModale.classList.add("hidden")

        // 🔄 Pulisci e ricostruisci il DOM
        renderWeeks(weeksList,weeksViewContainer)
      
       
        userWeekColor.value = "#000000"
        userWeekDescription.value = ""
}

export function resetImputs(input){

  input = ""
}

export function addNewWeekFromNextMonday(weeksList, addWeekModale, weeksViewContainer,userWeekColor, userWeekDescription) {

        const newWeek = createNewWeekFromNextMonday(userWeekColor.value, userWeekDescription.value)

        weeksList.push(newWeek);
      
        // 🔽 Ordina per orario
        weeksList.sort((a, b) => a.title.localeCompare(b.title));
    
        // 🔐 Aggiorna il localStorage
        const salvate = weeksList.map(week => week.toJSON());
        localStorage.setItem("weeks", JSON.stringify(salvate));
    
        addWeekModale.classList.add("hidden")

        // 🔄 Pulisci e ricostruisci il DOM
        renderWeeks(weeksList,weeksViewContainer)

        userWeekColor.value = "#000000"
        userWeekDescription.value = ""

}

export function renderWeeks(weekList, weeksViewContainer) {
    
  let indice = null
  let idWeek = null
    weeksViewContainer.innerHTML = ""; // svuota la lista prima di ricostruirla
    weekList.forEach((week, index) => {

      
      const weekDiv = document.createElement("div");
      weekDiv.className = "weekCompleteDisplay";
      weekDiv.id = index
      weekDiv.title = week.title

      
      const pWeekTile = document.createElement("p");
      pWeekTile.className = "weekTitle";
      pWeekTile.textContent = week.title;

      
      const pWeekColor = document.createElement("p");
      pWeekColor.className = "weekColor";
      pWeekColor.style.backgroundColor = week.color

      const pEditWeekButton = document.createElement("p");
      pEditWeekButton.className = "pEditWeekButton";
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
        indice = index
        idWeek = week.id
        // Rimanda l'apertura della modale alla prossima iterazione del ciclo event-loop
        setTimeout(() => {
          elements.editWeekModale.classList.remove("hidden");
        }, 0);
      });

      



      // ✅ Aggiungi qui il tuo event listener
      weekDiv.addEventListener("click", (event) => {
        console.log("div CLICCATo", indice);
        showOnlySection(userSubSections[1],userSubSections)
        renderWeekDays(weekList[index], elements.daysViewContainer,elements.taskDescription, elements.taskHour, elements.tasksViewContainer, elements.addTaskButton, weekList)
            // fai il cambio sezione o altra logica
      });
      
          
    });

    elements.saveEditWeekBtn.addEventListener("click", () => {
        
        console.log("ho cliccato la settimana:" + indice )  
        editWeek(elements.editedWeekTitle.value, elements.editedWeekColor.value, indice, weekList, idWeek)
        elements.editWeekModale.classList.add("hidden")
        
        weekList.sort((a, b) => a.title.localeCompare(b.title) )
        renderWeeks(weekList,weeksViewContainer)
      })
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


export function sortWeeks(weeks, isAscending) {
  return weeks.sort((a, b) => {
    const nameA = a.title;
    const nameB = b.title;

    return isAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });
}


//----------------------------------------------------------------- EDITS

export function editWeek(editedTitle, editedColor, index, weekList, idWeek) {

  console.log("lista weeks da editare", weekList)
  console.log("week index", index)
  console.log("week da editare", weekList[index])
  
  console.log("id week da editare", weekList[index].id, " e ", idWeek)
  if (weekList[index].id === idWeek) {
    weekList[index].title = editedTitle
    weekList[index].color = editedColor
  }

  localStorage.setItem("weeks", JSON.stringify(weekList))
}

export function setupUIEventListeners() {
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

    elements.startTodayBtn.addEventListener("click", () => {
        console.log(weeks)
        addNewWeekFromToday(weeks, elements.addWeekModale, elements.weeksViewContainer, elements.userWeekColor, elements.userWeekDescription);
    });

    elements.startNextMondayBtn.addEventListener("click", () => {
      
        console.log(weeks)
        addNewWeekFromNextMonday(weeks, elements.addWeekModale, elements.weeksViewContainer, elements.userWeekColor, elements.userWeekDescription);
    });

    deleteAllWeeks(weeks)
}

export function generateWeekId() {

  return Date.now()
  
}