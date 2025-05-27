export class Task {
    
    #id
    #desription
    #time
    #done
    #dayRef
    #weekRef
    #notes

    constructor(id, desription, time, done = false, dayRef, weekRef, notes ) {
        
        this.#id = id;
        this.#desription = desription;
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
    get desription(){

        return this.#desription
    }

    /**
     * @param {String} value
     */
    set desription(value){

        this.#desription = value
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
    * @param {Day[]} value
    */
    set dayRef(value) {
        this.#dayRef = value;
    }


    //get e set SETTIMANA DI RIFERIMENTO
    get weekRefRef() {
        return this.#weekRef;
    }

    /**
    * @param {Day[]} value
    */
    set weekRefRef(value) {
        this.#weekRef = value;
    }


    //get e set NOTE
    get notes() {
        return this.#notes;
    }

    /**
    * @param {Day[]} value
    */
    set notes(value) {
        this.#notes = value;
    }
}