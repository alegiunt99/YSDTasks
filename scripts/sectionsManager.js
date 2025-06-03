import * as elements from './domElements.js'
import { showOnlySection } from "./functions.js";
const allSections = [
        elements.homePage, elements.daySection, elements.loginSection,
        elements.registrationSection, elements.themeSection, elements.editTaskModale
      ];

export function switchSections() {
    elements.homePageLink.addEventListener("click", () => showOnlySection(elements.homePage, allSections));
    elements.loginPageLink.addEventListener("click", () => showOnlySection(elements.loginSection, allSections));
    elements.registrationPageLink.addEventListener("click", () => showOnlySection(elements.registrationSection, allSections));
    elements.themeSectionLink.addEventListener("click", () => showOnlySection(elements.themeSection, allSections));
}
      
