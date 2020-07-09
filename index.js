//Import our module to handle operations
//import { add, subtract, multiply, divide } from './modules/operation.js';

/** @class Calculator representing a calculator. */
class Calculator {
    /**
     * Creates an instance of Calculator.
     *
     * @constructor
     * @author: me
     * @param {Object} display - A reference to the dom element to display input and result.
     * @param {Object[]} buttons - A reference to the buttons dom element.
     */
    constructor(display, buttons) {
        /** @private */ this.input = '';
        /** @private */ this.operator = '';
        /** @private */ this.result = 0;
        /** @private */ this.display = display;
        /** @private */ this.buttons = buttons;
        this.decimalIsClicked = false;
    }

    init() {
        this.bindButtonsWithHandler();
        //display 0 by default
        this.displayValue(this.result);
    }

    /**
    * Update the input property
    *
    * @param {string} value - A value to add at the input value.
    * @return {string} Return the value of a button.
    */
    updateInput(value) {
        //update only if the value is a number
        this.input = this.input + value;
        //bind with the view
        this.displayValue(this.input);
        return this.input;
    }

    /**
    * Set a value for the result property
    *
    * @param {number} value - A value number to set.
    * @return {number} Return the value of result.
    */
    setResult(value) {
        this.result = value;
        return this.result;
    }

    /**
    * Get the value of the result property
    *
    * @return {number} Return the value of result.
    */
    getResult() {
        return this.result;
    }

    /**
    * Update the value of the result property according the operator property
    *
    */
    updateResult() {
        //|| '0' => manage if the input string is empty
        let i = parseFloat(this.input || '0');
        let r = this.getResult();
        switch (this.operator) {
            case '':
                this.setResult(i);
                break;
            case 'add':
                this.setResult(r + i);
                break;
            case 'subtract':
                this.setResult(r - i);
                break;
            case 'multiply':
                this.setResult(r * i);
                break;
            case 'divide':
                this.setResult(r / i)
                break;
            case 'clear':
                this.setResult(0)
                break;
        }
        this.clearInput();
        this.displayValue(this.result);
    }

    /**
   * Update the value of the operator property.
   *
   * @param {string} operator - A string that represent the operator.
   */
    updateOperator(operator) {
        switch (operator) {
            case 'decimal':
                console.log('decimal');
                break;
            case 'clear':
                this.clearAll();
                break;
            case 'equals':
                this.clearResult();
                break;
            case 'zero':
                break;
            default:
                this.operator = operator;
                break;
        }
    }


    /**
    * Reset all the dynamic property
    *
    */
    clearAll() {
        this.setResult(0);
        this.clearInput();
        this.operator = '';
        this.decimalIsClicked = false;
        this.displayValue(this.result);
    }

    /**
    * Clear the input property and reset the decimalIsClicked property
    *
    * @return {string[]} Return an array of input.
    */

    clearInput() {
        this.input = '';
        this.decimalIsClicked = false;
    }

    /**
    * Clear the result property - set it to 0. Also clear the operator property.
    *
    */
    clearResult() {
        this.input = this.result;
        this.operator = '';
        this.decimalIsClicked = false;
        this.result = 0;
    }

    /**
    * Display a value on the display element
    *
    * @param {string} value - A value to display.
    * @return {string} Return the value of a button.
    */
    displayValue(value) {
        this.display.html(value);
    }

    /**
    * Get the value of a clicked button
    *
    * @param {Object} button - The button object with need to refer.
    * @return {string} The value of a button.
    */
    getButtonValue(button) {
        return $(button).val();
    }

    /**
    * Return an event handler to attach to a button element
    *
    * @return {Object} Return the function to call when a click event is triggered.
    */
    getClickEventHandler() {
        //here this => Calculator() instance
        let calculator = this;
        return function () {
            let value = calculator.getButtonValue(this);
            let condition = calculator.validInput(calculator.input, value);
            if (condition) {
                if (value === '.') calculator.decimalIsClicked = true;
                calculator.updateInput(value);
            } else if (calculator.input !== '') {
                calculator.updateResult();
                calculator.updateOperator(this.id);
            }
        }
    }

    /**
    * Return an event handler to attach to a button element
    * @param {string} input - the current input value in the data structure.
    * @param {string} val - the value of a clickable element.
    *
    * @return {Object} Return the function to call when a click event is triggered.
    */
    validInput(input, val) {
        if (val === '.') {
            return !this.decimalIsClicked;
        }
        return (
            //it wont begin with by 0 AND
            this.itWontBeginByZero(input, val) &&
            //it is a number OR a '.' AND
            (!isNaN(val) || val === '.')
        );
    }

    /**
    * Return an event handler to attach to a button element
    *
    * @return {Object} Return a boolean who tell us if it wont begin by a 0
    */
    //input current value of input
    //value of the button clicked
    //return true if the input 
    itWontBeginByZero(input, value) {
        //If it's a '0' and the input string is empty => return false
        //else return true
        return !(input.length === 0 && value === '0')
    }

    /**
    * Bind the buttons with an event handler
    */
    bindButtonsWithHandler() {
        for (let button of this.buttons) {
            //set our buttons with an event click handler
            $(button).on('click', this.getClickEventHandler());
        }
    }
}

let displayElement = $('#display');
let buttonElements = $('button');

let calculator = new Calculator(displayElement, buttonElements);
calculator.init();

