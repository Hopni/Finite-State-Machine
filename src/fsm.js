class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(arguments.length === 0){
            return Error;
        } else {
        this.state = config.initial;
        this.previousStates = [];
        this.count = 0;
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(state === 'normal' || state === 'busy' || state === 'sleeping' || state === 'hungry'){
             this.previousStates[this.count] = this.state;
             this.count++;
            this.state = state;
        } else {
            return Error;
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        switch(event){
           case 'study' : if(this.getState() === 'normal'){
               // this.previousStates.push(this.state);
               this.changeState('busy');
           } else {
               return Error;
           }
           break;
           case 'get_tired' : if(this.getState() === 'busy'){
            // this.previousStates.push(this.state);
           this.changeState('sleeping'); 
           } else {
               return Error;
           }
           break;
           case 'get_hungry' : if((this.getState() === 'busy') || (this.getState() === 'sleeping')){
             //this.previousStates.push(this.state);
           this.changeState('hungry'); 
           } else {
               return Error;
           }
           break;
           case 'eat' : if(this.getState() === 'hungry'){
            // this.previousStates.push(this.state);
            this.changeState('normal'); 
           } else {
               return Error;
           }
           break;
           case 'get_up' : if(this.getState() === 'sleeping'){
            // this.previousStates.push(this.state);
           this.changeState('normal'); 
           } else {
               return Error;
           }
           break;
           default: return Error;
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.previousStates = [];
        this.state = 'normal';
        this.count = 0;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        switch(event){
            case 'get_hungry': return ['busy', 'sleeping'];
            break;
            case 'study': return ['normal'];
            break;
            case 'get_tired' : return ['busy'];
            break;
            case 'eat' : return ['hungry'];
            break;
            case 'get_up' : return ['sleeping'];
            break;
            default: if(arguments.length === 0){
                return ['normal', 'busy', 'hungry', 'sleeping'];
            } else {
                return Error;
            }
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        this.previousStates[this.count] = this.state;
        if(!(this.count === 0) && !(this.previousStates.length === 0)){
            this.state = this.previousStates[--this.count];
            //this.count--;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.previousStates.length <= this.count+1 || this.previousStates.length === 0){
            return false;
        } else {
        this.count++;
        this.state = this.previousStates[this.count];
        return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.previousStates = [];
        this.count = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

      
          
