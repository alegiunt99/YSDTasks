
import { allSections} from "./sectionsManager.js"
import * as elements from './domElements.js'
import { Week } from "../items/Week.js";
import { Day } from "../items/Day.js";
import { Task } from "../items/Task.js";
//tasks

export function renderTasks(dayRef, tasksViewContainer, weekList) {
    
      tasksViewContainer.innerHTML = "";
  elements.singleDayTitle.innerText = `${dayRef.dayName} - ${dayRef.date.toLocaleDateString("it-IT")}`;

  if (Array.isArray(dayRef.tasks)) {
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

      console.log(taskDescription.value)

      try {
        
        
        
        if (taskDescription.value.trim().length === 0 && taskHour.value.trim().length === 0) {
          throw new Error("devi inserire un orario e la descrizione deve avere almeno una lettera");
        }else if (taskHour.value.trim().length === 0) {
          throw new Error("devi inserire un orario");
        }else if (taskDescription.value.trim().length === 0) {
          throw new Error("La descrizione deve avere almeno una lettera");
        }

        
        const id = dayRef.tasks.length+1
        const description = taskDescription.value
        const time = taskHour.value
        const done = false
        const notes = ""
        

        
        const newtask = new Task(id, description, time,done,notes)
        
        newtask.dayRef = dayRef.dayName
        dayRef.tasks.push(newtask);
        console.log(dayRef.tasks)
        // 🔽 Ordina per orario
        //dayWeeks.sort((a, b) => a.time.localeCompare(b.ora));
    
        // 🔐 Aggiorna il localStorage
        localStorage.setItem("weeks", JSON.stringify(weekList.map(week => week.toJSON())))
        
        // 🔄 Pulisci e ricostruisci il DOM
        renderTasks(dayRef, containerList);
        // 🧼 Reset campi input
        taskDescription.value = "";
        taskHour.value = "";
        
        
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
          taskHour.value = "";
      }  
      
      
      
  }


export function deleteTask(dayDate, taskIndex, tasksViewContainer) {
  

  const savedWeeks = localStorage.getItem("weeks");
    var weekList = []
    if (savedWeeks) {
      
        const parsed = JSON.parse(savedWeeks) || [];
        if (Array.isArray(parsed)) {
          parsed.forEach(week => {
            week.days.forEach(day => {
              day.date = new Date(day.date); // 🔁 converte la stringa in oggetto Date
            });
          });
        }

        weekList = parsed.map(w => Week.fromJSON(w))

    }

    console.log("✅ deleteTask chiamata con:", { weekList });
  
  try {
     const dayDateString = new Date(dayDate).toDateString();

    // Trova la settimana e il giorno
    const week = weekList.find(week =>
      week.days.some(day => new Date(day.date).toDateString() === dayDateString)
    );

    if (!week) throw new Error("Settimana non trovata");
    console.log("✅ deleteTask chiamata con:", { week});
    const day = week.days.find(day =>
      new Date(day.date).toDateString() === dayDateString
    );

    if (!day) throw new Error("Giorno non trovato");

    if (!Array.isArray(day.tasks)) throw new Error("Tasks non è un array");

    // Elimina la task
    day.tasks.splice(taskIndex, 1);

    // Aggiorna il localStorage
    localStorage.setItem("weeks", JSON.stringify(weekList));

    const updatedWeekList = JSON.parse(localStorage.getItem("weeks"));
    updatedWeekList.forEach(week => {
        week.days.forEach(day => {
            day.date = new Date(day.date); // riconversione a Date
        });
    });
    // Rirenderizza
    renderTasks(day, tasksViewContainer, weekList);

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
  if (userWeekDescription.value === "" || userWeekDescription.value.trim().length === 0) {
        title = `SETTIMANA ${start.toLocaleDateString("it-IT")} - ${end.toLocaleDateString("it-IT")}`
  }else{
        title = userWeekDescription.value
  }
 
  const color = userWeekColor.value // verde
  const week = new Week(start, end, title, color, [])
  const days = generateDaysForWeek(start, end, week, tasks)
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
  if (userWeekDescription.value === "" || userWeekDescription.value.trim().length === 0) {
        title = `SETTIMANA ${nextMonday.toLocaleDateString()} - ${nextSunday.toLocaleDateString()}`
  }else{
        title = userWeekDescription.value
  }
 
  const color = userWeekColor.value // verde
  const week = new Week(nextMonday, nextSunday, title, color, []);
  const days = generateDaysForWeek(nextMonday, nextSunday, week, tasks);
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

        const newWeek = createNewWeekFromToday(userWeekColor, userWeekDescription)

        weeksList.push(newWeek);
      
        // 🔽 Ordina per orario
        //weeksList.sort((a, b) => a.ora.localeCompare(b.ora));
    
        // 🔐 Aggiorna il localStorage
        const salvate = weeksList.map(week => week.toJSON());
        localStorage.setItem("weeks", JSON.stringify(salvate));
    
        addWeekModale.classList.add("hidden")

        console.log(weeksList)
        // 🔄 Pulisci e ricostruisci il DOM
        renderWeeks(weeksList,weeksViewContainer)
      
       
        
        userWeekColor.value = "#000000"
        userWeekDescription.value = ""

}

export function addNewWeekFromNextMonday(weeksList, addWeekModale, weeksViewContainer,userWeekColor, userWeekDescription) {

        const newWeek = createNewWeekFromNextMonday(userWeekColor, userWeekDescription)

        weeksList.push(newWeek);
      
        // 🔽 Ordina per orario
        //weeksList.sort((a, b) => a.ora.localeCompare(b.ora));
    
        // 🔐 Aggiorna il localStorage
        const salvate = weeksList.map(week => week.toJSON());
        localStorage.setItem("weeks", JSON.stringify(salvate));
    
        addWeekModale.classList.add("hidden")

        console.log(weeksList)
        // 🔄 Pulisci e ricostruisci il DOM
        renderWeeks(weeksList,weeksViewContainer)

        userWeekColor.value = "#000000"
        userWeekDescription.value = ""

}

export function renderWeeks(weekList, weeksViewContainer) {
    weeksViewContainer.innerHTML = ""; // svuota la lista prima di ricostruirla
    console.log("weekList: "+ JSON.stringify(weekList, null, 2))
    weekList.forEach((week, index) => {
      const weekDiv = document.createElement("div");
      weekDiv.className = "weekCompleteDisplay";
      weekDiv.id = index

      
      const pWeekTile = document.createElement("p");
      pWeekTile.className = "weekTitle";
      pWeekTile.textContent = week.title;

      
      const pWeekColor = document.createElement("p");
      pWeekColor.className = "weekColor";
      pWeekColor.style.backgroundColor = week.color
  
      // 🗑️ Cancella se clicchi su di lui
      /*taskDeleteButton.addEventListener("click", () => {
        deleteTask(week,weekList,weeksViewContainer)
      });*/

      weekDiv.appendChild(pWeekTile)
      weekDiv.appendChild(pWeekColor)

      weeksViewContainer.appendChild(weekDiv)

      // ✅ Aggiungi qui il tuo event listener
      weekDiv.addEventListener("click", () => {
            console.log("Hai cliccato sulla settimana:", weekDiv.id);
            showOnlySection(allSections[1],allSections)
            renderWeekDays(weekList[index], elements.daysViewContainer,elements.taskDescription, elements.taskHour, elements.tasksViewContainer, elements.addTaskButton, weekList)
            console.log("weekList: "+ console.log("weekList: "+ JSON.stringify(weekList, null, 2)))
            // fai il cambio sezione o altra logica
      });
    });
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
      console.log(selectedWeek.days)
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
            console.log("Hai cliccato sul giorno:", day.dayName, "con id: ", index, "della settimana: ", selectedWeek.title);
            showOnlySection(allSections[2],allSections)
            renderTasks(selectedWeek.days[index], elements.tasksViewContainer,weekList)
            
            if (currentTaskHandler) {
              addButton.removeEventListener("click", currentTaskHandler);
            }

            currentTaskHandler = () => {
                addTask(taskDescription, taskHour, addButton, tasksViewContainer, day, weekList);
            };

            addButton.addEventListener("click", currentTaskHandler);
        });

        

            // fai il cambio sezione o altra logica
              //elements.addTaskButton.addEventListener("click", () => {
          
              //addTask(taskDescription, taskHour, addButton, tasksViewContainer,selectedWeek.days[index])
              
              //taskDescription, taskHour, addButton, containerList, dayRef
              //})
        });

        /*console.log("idDay: "+ idDay)

        elements.addTaskButton.addEventListener("click", () => {
          
          addTask(taskDescription, taskHour, addButton, tasksViewContainer,selectedWeek.days[idDay])
          return
        
        })*/
      
    ;
  }

 /* export function sortAndRenderWeeks(weekList, up) {
  const savedWeeks = localStorage.getItem("weeks");
  if (savedWeeks) {
    const parsed = JSON.parse(savedWeeks);
    if (Array.isArray(parsed)) {
      weekList = parsed.map(w => Week.fromJSON(w));

      weekList.sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return up ? dateA - dateB : dateB - dateA;
      });

      renderWeeks(weekList, elements.weeksViewContainer);
    }
  }
}*/