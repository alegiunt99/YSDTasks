import * as elements from "./domElements.js";
import * as constant from "./constants.js";
import { Week } from "../items/Week.js";
export function showSavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    const savedLogo = localStorage.getItem("logo-src")
    const savedSortBtnSrc = localStorage.getItem("sort-png-src")
    if (savedTheme) {
      elements.domBody.classList.add(savedTheme);
      if (savedLogo) {
        elements.logoImg.src = savedLogo;
      }
      if (savedLogo) {
        elements.sortBtnImg.src = savedSortBtnSrc;
      }
    } else {
      elements.domBody.classList.add("dark-theme");
      elements.logoImg.src = constant.LOGO_TEMA_SCURO; // default
      elements.sortBtnImg.src = constant.SORT_UP_TEMA_SCURO
    }
    
}

export function getWeekListFromStorage() {
  const savedWeeks = localStorage.getItem("weeks");
  var weekList = []
    if (savedWeeks) {
        try {
          const parsed = JSON.parse(savedWeeks) || [];
          if (Array.isArray(parsed)) {
            parsed.forEach(week => {
              week.days.forEach(day => {
                day.date = new Date(day.date); // 🔁 converte la stringa in oggetto Date
              });
            });
            // weekList = parsed.map(w => Week.fromJSON(w)).sort((a, b) => a.startDate - b.startDate)
            weekList = parsed.map(w => Week.fromJSON(w))
            
            return weekList

          } else {
            console.warn("Formato non valido per weeks:", parsed);
          }
          } catch (e) {
            console.error("Errore nel parsing di weeks:", e);
          }
    }
  
    
  /*const parsed = JSON.parse(localStorage.getItem("weeks")) || [];
  parsed.forEach(week => {
    week.days.forEach(day => {
      day.date = new Date(day.date);
    });
  });
  return parsed;*/
}