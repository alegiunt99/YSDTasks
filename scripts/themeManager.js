import * as elements from './domElements.js'
import * as constant from "./constants.js"

export function changeTheme(){

    
        if (elements.domBody.classList.contains("dark-theme")) {
            elements.domBody.classList.remove("dark-theme");
            elements.domBody.classList.add("light-theme");
            
            const newLogo = constant.LOGO_TEMA_CHIARO;
            const newSortPngSrc = constant.SORT_UP_TEMA_CHIARO
            elements.logoImg.src = newLogo;
            elements.sortBtnImg.src = newSortPngSrc
            localStorage.setItem("logo-src", newLogo);
            localStorage.setItem("sort-png-src", newSortPngSrc);
            localStorage.setItem("theme", "light-theme");
            
            
        } else {
            elements.domBody.classList.remove("light-theme");
            elements.domBody.classList.add("dark-theme");
            //elements.homePageLink.src = "./foto/logo_app.png"
            const newLogo = constant.LOGO_TEMA_SCURO;
            const newSortPngSrc = constant.SORT_UP_TEMA_SCURO
            elements.logoImg.src = newLogo;
            elements.sortBtnImg.src = newSortPngSrc
            localStorage.setItem("logo-src", newLogo);
            localStorage.setItem("sort-png-src", newSortPngSrc);
            localStorage.setItem("theme", "dark-theme");
            
            
        }

}
    