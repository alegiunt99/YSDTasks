import * as elements from "./domElements.js";
import * as constant from "./constants.js";

export function showSavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    const savedLogo = localStorage.getItem("logo-src")
    const savedSortBtnSrc = localStorage.getItem("sort-png-src")
    if (savedTheme) {
      elements.domBody.classList.add(savedTheme);
      if (savedLogo) {
        elements.homePageLink.src = savedLogo;
      }
      if (savedLogo) {
        elements.sortBtnImg.src = savedSortBtnSrc;
      }
    } else {
      elements.domBody.classList.add("dark-theme");
      elements.homePageLink.src = constant.LOGO_TEMA_SCURO; // default
      elements.sortBtnImg.src = constant.SORT_UP_TEMA_SCURO
    }
    
}