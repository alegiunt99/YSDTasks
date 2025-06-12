import { Day } from "./Day.js"

export class Task {
    
    #id
    #description
    #time
    #done
    #dayRef
    #weekRef
    #notes

    constructor(id, description, time, done = false, dayRef, weekRef, notes = "" ) {
        
        this.#id = id;
        this.#description = description;
        this.#time = time
        this.#done = done
        this.#dayRef = dayRef
        this.#weekRef = weekRef
        this.#notes = notes

    }

    //get e set
    get id(){

        return this.#id
    }

    
    //get e set
    get description(){

        return this.#description
    }

    /**
     * @param {String} value
     */
    set description(value){

        this.#description = value
    }


    //get e set
    get time(){

        return this.#time
    }

    /**
     * @param {String} value
     */
    set time(value){

        this.#time = value
    }
    //get e set
    get done(){

        return this.#done
    }

    /**
     * @param {boolean} value
     */
    set done(value){

        this.#done = value
    }

    //get e set GIORNO DI RIFERIMENTO
    get dayRef() {
        return this.#dayRef;
    }

    /**
    * @param {string} value
    */
    set dayRef(value) {
        this.#dayRef = value;
    }


    //get e set SETTIMANA DI RIFERIMENTO
    get weekRef() {
        return this.#weekRef;
    }

    /**
    * @param {Week} value
    */
    set weekRef(value) {
        this.#weekRef = value;
    }


    //get e set NOTE
    get notes() {
        return this.#notes;
    }

    /**
    * @param {String} value
    */
    set notes(value) {
        this.#notes = value;
    }

    // methods 
    // id, description, time, done = false, dayRef, weekRef, notes
    static fromJSON(obj) {
        return new Task(obj.id, obj.description, obj.time, obj.done, obj.dayRef, obj.weekRef, obj.notes)
    }

    toJSON() {
        return {
            id: this.#id,
            description: this.#description,
            time: this.#time ,
            done: this.#done,
            notes: this.#notes || ""
        };
    }
}