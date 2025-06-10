import { Day } from './Day.js'
export class Week {

    #id
    #startDate
    #endDate
    #title
    #color
    #days

    constructor(startDate, endDate, title, color, days) {
        
        this.#startDate = startDate
        this.#endDate = endDate
        this.#title = title
        this.#color = color
        this.#days = days


    }

    //get e set
    get id(){

        return this.#id
    }

    /**
     * @param {string} value
     */
    set id(value){

        this.#id = value
    }

    //get e set
    get startDate(){

        return this.#startDate
    }

    /**
     * @param {Date} value
     */
    set startDate(value){

        this.#startDate = value
    }
    //get e set
    get endDate(){

        return this.#endDate
    }

    /**
     * @param {Date} value
     */
    set endDate(value){

        this.#endDate = value
    }


    //get e set
    get title(){

        return this.#title
    }

    /**
     * @param {String} value
     */
    set title(value){

        this.#title = value
    }
    //get e set
    get color(){

        return this.#color
    }

    /**
     * @param {String} value
     */
    set color(value){

        this.#color = value
    }

    get days() {
        return this.#days;
    }

    /**
    * @param {Day[]} value
    */
    set days(value) {
        this.#days = value;
    }

    // methods 
    // startDate, endDate, title, color, days

    static fromJSON(obj) {

        
        const start = new Date(obj.startDate)
        const end = new Date(obj.endDate)
        const title = obj.title
        const color = obj.color
        const days = Array.isArray(obj.days) ? obj.days.map(day => Day.fromJSON(day)) : [];
        const week = new Week(start, end, title, color, days)
        week.id = obj.id
        return week

        
    }

    toJSON() {
        return {
            id: this.#id,
            startDate: this.#startDate,
            endDate: this.#endDate,
            title: this.#title,
            color: this.#color,
            days: this.#days
        };
    }
}