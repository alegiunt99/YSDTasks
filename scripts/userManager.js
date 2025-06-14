import { User } from '../items/User.js'
import * as elements from './domElements.js'
import { loadHomePageData, showUserVisual, switchSections } from "./sectionsManager.js";
import * as functions from './functions.js';
import {userSubSections} from "./sectionsManager.js"
import { getLoggedIn, saveUserListToStorage } from './localStorageManager.js';


export function createNewUser(savedUsers){


    try {
        

        console.log("savedUsers",savedUsers)
        console.log("newUserId",elements.newUserId.value)

        if(savedUsers.some(user => user.userid === elements.newUserId.value)){
            throw new Error("user già presente")
        }else if (elements.newUserId.value.trim().length === 0) {
          throw new Error("la userid deve avere almeno una lettera");
        }

        if(savedUsers.some(user => user.email === elements.newEmailUser.value)){
            throw new Error("email già presente")
        }else if (elements.newEmailUser.value.trim().length === 0) {
            throw new Error("L'indirizzo email deve avere almeno una lettera");
        }else if(!elements.newEmailUser.value.includes('@')){
            throw new Error("L'indirizzo email deve avere almeno una '@' ");
        }


        if (elements.newUserName.value.trim().length === 0) {
          throw new Error("Il nome deve avere almeno una lettera");
        }
        if (elements.newUserSurname.value.trim().length === 0) {
          throw new Error("Il cognome deve avere almeno una lettera");
        }
        
        if (elements.newUserPassword.value.trim().length === 0) {
          throw new Error("La descrizione deve avere almeno una lettera");
        }

        let id = savedUsers.length
    
        const userid = elements.newUserId.value
        const name = elements.newUserName.value
        const surname = elements.newUserSurname.value
        const emailAddress = elements.newEmailUser.value
        const password = elements.newUserPassword.value
        
        const newUser = new User(id,name, surname, userid,emailAddress,password, [],false)

        return newUser
        

    } catch (error) {
        const errorDiv = document.createElement("div");
          errorDiv.className = "errorMessage";
          errorDiv.color ="red"
          errorDiv.textContent = error.message

          elements.errorDivRegistration.appendChild(errorDiv);

          // (Opzionale) Rimuovilo dopo qualche secondo per non lasciarlo fisso
          setTimeout(() => {
              errorDiv.remove();
          }, 3000);

          // 🧼 Reset campi input
          azzeraTestoInput(
        
            elements.newUserId,
            elements.newUserName,
            elements.newUserSurname,
            elements.newEmailUser,
            elements.newUserPassword
        )
    }

    return null
    
}

export function addNewUser(savedUsers){

    const newUser = createNewUser(savedUsers)
    try {
        
        if(newUser === null){
            throw new Error("User non valida")
        }

        savedUsers.push(newUser)


        console.log("addNewUser, savedUsers: ", savedUsers)
        //saveUserListToStorage(savedUsers)
        localStorage.setItem("users", JSON.stringify(savedUsers))
        
        console.log("addNewUser, NewUser: ", newUser)
        newUser.isLogged = true;
        localStorage.setItem("logged", JSON.stringify(newUser))
        renderUserView(newUser.userid,savedUsers);
        azzeraTestoInput(
        
            elements.newUserId,
            elements.newUserName,
            elements.newUserSurname,
            elements.newEmailUser,
            elements.newUserPassword
        )

    } catch (error) {
        
        const errorDiv = document.createElement("div");
          errorDiv.className = "errorMessage";
          errorDiv.color ="red"
          errorDiv.textContent = error.message

          elements.errorDivRegistration.appendChild(errorDiv);

          // (Opzionale) Rimuovilo dopo qualche secondo per non lasciarlo fisso
          setTimeout(() => {
              errorDiv.remove();
          }, 3000);

          // 🧼 Reset campi input
          azzeraTestoInput(
        
            elements.newUserId,
            elements.newUserName,
            elements.newUserSurname,
            elements.newEmailUser,
            elements.newUserPassword
        )
    }

    }


export function renderUserView(userId, users){
    
    console.log("users.some(user => user.userid === userId)", users.some(user => user.userid === userId))
    console.log(userId)
    console.log("renderUserView, users",users)
    if(users.some(user => user.userid === userId)){

        const userIndex = users.findIndex((user, index) => user.userid === userId)
        console.log("user selezionato",users[userIndex])
        functions.showOnlySection(elements.userHomeSection, userSubSections);
        elements.userHomeTitle.innerText = "Benvenuto su YSDTASK " + users[userIndex].name + "!"
        switchSections(users[userIndex],users)
        loadHomePageData(userId, true)
        
        

        

    }




    

}
    


export function azzeraTestoInput(...input){

    input.forEach(i => {
        i.value = ""
    });

}


export function loginUser(users){
    try {
        

        if(users.some(user => user.userid === elements.userId.value) === false){
            console.log("elements.userId.value",elements.userId.value)
            console.log("user ricercato",users.find(user => user.userid === elements.userId.value===false))
            console.log("users.some(user => user.userid === elements.userId.value===false)",users.some(user => user.userid === elements.userId.value===false))
            throw new Error("userid non registrata") 
        }else if (elements.userId.value.trim().length === 0) {
          throw new Error("la userid deve avere almeno una lettera");
        }

        const indexUser = users.findIndex((u, index) => u.userid === elements.userId.value)
        console.log("indexdUser", indexUser)
        if (indexUser === -1) return;

        if(elements.password.value !== users[indexUser].password){
          
          throw new Error("La password è errata");
        }else if (elements.password.value.trim().length === 0) {
          throw new Error("La password deve avere almeno una lettera");
        }
        
        users[indexUser].isLogged = true;
        localStorage.setItem("logged", JSON.stringify(users[indexUser]))
        saveUserListToStorage(users)
        renderUserView(users[indexUser].userid,users);
        loadHomePageData(getLoggedIn(), true)
        azzeraTestoInput(
        
            elements.userId,
            elements.password
        )
    } catch (error) {
        const errorDiv = document.createElement("div");
          errorDiv.className = "errorMessage";
          errorDiv.color ="red"
          errorDiv.textContent = error.message
          console.log(users.some(user => user.userid === elements.userId.value===false))
          elements.errorDivLogin.appendChild(errorDiv);

          // (Opzionale) Rimuovilo dopo qualche secondo per non lasciarlo fisso
          setTimeout(() => {
              errorDiv.remove();
          }, 3000);

          // 🧼 Reset campi input
          azzeraTestoInput(
        
            elements.userId,
            elements.password
        )
    }
}