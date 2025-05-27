export class Day {

    /*  date (Date)
        La data esatta di quel giorno (es. 2025-06-02).

        dayName (string)
        Il nome del giorno (es. "Lunedì", "Martedì"…), opzionale se lo ricavi da date.

        tasks (Task[])
        Un array di oggetti Task, per rappresentare le attività associate a quel giorno.

        completed (boolean)
        (Opzionale) Se tutte le task del giorno sono state completate, utile per statistiche o interfaccia.

        note (string)
        (Facoltativo) Un campo per eventuali annotazioni libere dell’utente sul giorno.

        weekRef (Week)
        (Opzionale) Riferimento alla Week a cui appartiene — utile se in futuro ti servirà risalire alla settimana. */

    #date
    #dayName
    #tasks
    #completed
    #weekRef


    constructor(date, dayName, tasks, completed, weekRef) {
        
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

    /** @param {boolean} value */
    set weekRef(value){
        this.#weekRef = value
    }
}