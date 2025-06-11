import { User } from '../items/User.js'
import * as elements from './domElements.js'


export function createNewUser(savedUsers){

    /**#name
    #surname
    #userid
    #email
    #password
    #weeks
    #isLogged */

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
    savedUsers.push(newUser)
    console.log(savedUsers)

    localStorage.setItem("users", JSON.stringify(savedUsers))

    azzeraTestoInput(
        
        elements.newUserId,
        elements.newUserName,
        elements.newUserSurname,
        elements.newEmailUser,
        elements.newUserPassword
    )

}

export function azzeraTestoInput(...input){

    input.forEach(i => {
        i.value = ""
    });

}