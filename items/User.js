import { Week } from "./Week.js"
export class User{

    #id
    #name
    #surname
    #userid
    #email
    #password
    #weeks
    #isLogged

    constructor(id, name, surname, userid, email, password, weeks, isLogged){
        this.#id = id
        this.#name = name
        this.#surname = surname
        this.#userid = userid
        this.#email = email
        this.#password = password
        this.#weeks = weeks
        this.#isLogged = isLogged
    }


    // 🟢 Getter
    getId() { return this.#id; }
    getName() { return this.#name; }
    getSurname() { return this.#surname; }
    getuserid() { return this.#userid; }
    getEmail() { return this.#email; }
    getPassword() { return this.#password; }
    getWeeks() { return this.#weeks; }
    isLoggedIn() { return this.#isLogged; }
    
    // 🟠 Setter
    setId(id) { this.#id = id; }
    setName(name) { this.#name = name; }
    setSurname(surname) { this.#surname = surname; }
    setuserid(userid) { this.#userid = userid; }
    setEmail(email) { this.#email = email; }
    setPassword(password) { this.#password = password; }
    setWeeks(weeks) { this.#weeks = weeks; }
    setLoggedIn(status) { this.#isLogged = status; }
    
    // 🔵 Serializzazione per localStorage
    toJSON() {
      return {
        id: this.#id,
        name: this.#name,
        surname: this.#surname,
        userid: this.#userid,
        email: this.#email,
        password: this.#password,
        weeks: this.#weeks, // assicurati che anche le week abbiano toJSON se oggetti
        isLogged: this.#isLogged
      };
    }
  
    // 🟣 Deserializzazione
    static fromJSON(json) {
      return new User(
        json.id,
        json.name,
        json.surname,
        json.userid,
        json.email,
        json.password,
        json.weeks || [],
        json.isLogged || false
      );
    }
}
