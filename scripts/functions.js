

import { Week } from "../items/Week.js";
import { Day } from "../items/Day.js";
//tasks

export function renderHabits(habitsContainer, containerList) {
    containerList.innerHTML = ""; // svuota la lista prima di ricostruirla
  
    habitsContainer.forEach(habit => {
      const habitDiv = document.createElement("div");
      habitDiv.className = "habitCompleteDisplay";

      
      const pHabitDescr = document.createElement("p");
      pHabitDescr.className = "habitDescr";
      pHabitDescr.textContent = habit.ora + " - " + habit.descrizione;

      
      const habitDeleteButton = document.createElement("button");
      habitDeleteButton.className = "habitDelete";
      habitDeleteButton.innerHTML = "&#x1F5D1;";
  
      // 🗑️ Cancella se clicchi su di lui
      habitDeleteButton.addEventListener("click", () => {
        deleteTask(habit,habitsContainer,containerList)
      });

      habitDiv.appendChild(pHabitDescr)
      habitDiv.appendChild(habitDeleteButton)

      containerList.appendChild(habitDiv)
    });
  }

export function addTask(habitDescription, habitHour, addButton, habitsContainer, containerList) {
    addButton.addEventListener("click", () => {
      try {
        
        
        if (habitDescription.value.trim().length === 0 && habitHour.value.trim().length === 0) {
          throw new Error("devi inserire un orario e la descrizione deve avere almeno una lettera");
        }else if (habitHour.value.trim().length === 0) {
          throw new Error("devi inserire un orario");
        }else if (habitDescription.value.trim().length === 0) {
          throw new Error("La descrizione deve avere almeno una lettera");
        }

        const newHabit = {
          ora: habitHour.value,
          descrizione: habitDescription.value
        };
      
        habitsContainer.push(newHabit);
      
        // 🔽 Ordina per orario
        habitsContainer.sort((a, b) => a.ora.localeCompare(b.ora));
    
        // 🔐 Aggiorna il localStorage
        localStorage.setItem("habits", JSON.stringify(habitsContainer));
    
        // 🔄 Pulisci e ricostruisci il DOM
        renderHabits(habitsContainer, containerList);
      
        // 🧼 Reset campi input
        habitDescription.value = "";
        habitHour.value = "";
        

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
          habitDescription.value = "";
          habitHour.value = "";
      }  
      
      
      });
  }

export function deleteTask(habit, habitsContainer, containerList) {

  try {
    // 🗑️ Cancella se clicchi su di lui
        
        const indexHabit = habitsContainer.indexOf(habit);
        
        if (indexHabit !== -1) {
          
          habitsContainer.splice(indexHabit, 1);
          localStorage.setItem("habits", JSON.stringify(habitsContainer));
          renderHabits(habitsContainer, containerList); // aggiorna la lista dopo l'eliminazione

        }
   
    

  } catch (error) {
    error.message = "Errore nell'eliminazione della Task"
    const errorDiv = document.createElement("div");
          errorDiv.className = "errorMessageDelete";
          errorDiv.textContent = error.message

          addButton.parentElement.appendChild(errorDiv);

          // (Opzionale) Rimuovilo dopo qualche secondo per non lasciarlo fisso
          setTimeout(() => {
              errorDiv.remove();
          }, 3000);

          // 🧼 Reset campi input
          habitDescription.value = "";
          habitHour.value = "";
    }  
}

// views  
export function showOnlySection(section, allSections) {
  
  allSections.forEach(sec => sec.style.display = "none");
  section.style.display = "block";
}

export function createNewWeekFromToday() {

  const start = new Date(); // oggi
  const end = new Date();
  end.setDate(start.getDate() + (7 - start.getDay())); // domenica corrente
  const title = `SETTIMANA ${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
  const color = "#00AA00" // verde
  const week = new Week(start, end, title, color, [])
  const days = generateDaysForWeek(start, end, week)
  week.days = days
  
  return week
}

export function createNewWeekFromNextMonday() {

  const today = new Date();
  const nextMonday = new Date();
  const day = today.getDay();
  const daysUntilNextMonday = (8 - day) % 7 || 7; // minimo 1, massimo 7
  nextMonday.setDate(today.getDate() + daysUntilNextMonday);
  const nextSunday = new Date(nextMonday);
  nextSunday.setDate(nextMonday.getDate() + 6);

  const title = `SETTIMANA ${nextMonday.toLocaleDateString()} - ${nextSunday.toLocaleDateString()}`;
  const color = "#00AA00";
  const week = new Week(nextMonday, nextSunday, title, color, []);
  const days = generateDaysForWeek(nextMonday, nextSunday, week);
  week.days = days;
  return week
}

export function generateDaysForWeek(startDate, endDate, weekRef) {

  const days = []
  const current = new Date(startDate)

  const dayNames = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"]

  while (current <= endDate) {

    const name = dayNames[current.getDay()]
    const newDay = new Day(new Date(current), name, [], false, weekRef)
    days.push(newDay)
    current.setDate(current.getDate()+1)
    
  }
  
  return days

}




export function addNewWeekFromToday(weeksList, addWeekModale) {

        const newWeek = createNewWeekFromToday()

        weeksList.push(newWeek);
      
        // 🔽 Ordina per orario
        //weeksList.sort((a, b) => a.ora.localeCompare(b.ora));
    
        // 🔐 Aggiorna il localStorage
        const salvate = weeksList.map(week => week.toJSON());
        localStorage.setItem("weeks", JSON.stringify(salvate));
    
        addWeekModale.classList.add("hidden")

        console.log(weeksList)
        // 🔄 Pulisci e ricostruisci il DOM
        // renderHabits(habitsContainer, containerList);
      
       
        


}