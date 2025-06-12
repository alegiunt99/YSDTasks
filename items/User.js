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
    // 👇 Aggiungi questi metodi getter
  get userid() {
    return this.#userid;
  }

  get email() {
    return this.#email;
  }

  get name() {
    return this.#name;
  }

  get surname() {
    return this.#surname;
  }

  get id() {
    return this.#id;
  }

  get password() {
    return this.#password;
  }

  get weeks() {
    return this.#weeks;
  }

  get isLogged() {
    return this.#isLogged;
  }

    
    // --- Setter ---
  set id(value) {
    this.#id = value;
  }

  set name(value) {
    this.#name = value;
  }

  set surname(value) {
    this.#surname = value;
  }

  set userid(value) {
    this.#userid = value;
  }

  set email(value) {
    this.#email = value;
  }

  set password(value) {
    this.#password = value;
  }

  set weeks(value) {
    this.#weeks = value;
  }

  set isLogged(value) {
    this.#isLogged = value;
  }
    
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
