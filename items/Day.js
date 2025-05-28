import { Week } from "./Week.js"
import { Task } from "./Task.js"

export class Day {

    #date
    #dayName
    #tasks
    #completed
    #weekRef


    constructor(date, dayName, tasks = [], completed = false, weekRef) {
        
        this.#date = date;
        this.#dayName = dayName;
        this.#tasks = tasks;
        this.#completed = completed;
        this.#weekRef = weekRef;
    }

    // get e set data esatta di quel giorno
    get date(){
        return this.#date
    }

    /** @param {Date} value */
    set date(value){
        this.#date = value
    }

    // get e set giorno della settimana (Lun, Mar, Mer ecc.)
    get dayName(){
        return this.#dayName
    }

    /** @param {string} value */
    set dayName(value){
        this.#dayName = value
    }
    
    // get e set liste delle tasks giornaliere
    get tasks(){
        return this.#tasks
    }

    /** @param {Task[]} value */
    set tasks(value){
        this.#tasks = value
    }
    

    // get e set Completato si/no
    get completed(){
        return this.#completed
    }

    /** @param {boolean} value */
    set completed(value){
        this.#completed = value
    }

    // get e set SETTIMANA di cui fa parte
    get weekRef(){
        return this.#weekRef
    }

    /** @param {Week} value */
    set weekRef(value){
        this.#weekRef = value
    }

    // date, dayName, tasks = [], completed = false, weekRef

   static fromJSON(obj) {
        const tasks = Array.isArray(obj.tasks) ? obj.tasks.map(task => Task.fromJSON(task)) : [];;
        return new Day(new Date(obj.date), obj.dayName, tasks, obj.completed, obj.weekRef)
    }

    toJSON() {
        return {
            date: this.#date, 
            dayName: this.#dayName,
            tasks: this.#tasks, 
            completed: this.#completed,
        };
    }
}