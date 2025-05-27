export class Week {

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
}