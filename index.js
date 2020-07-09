/*/

    * HELP *
    
    => My calculator should contain a clickable element containing an = 
    (equal sign) with a corresponding id="equals"

    => My calculator should contain 10 clickable elements containing one number 
    each from 0-9

    => My calculator should contain 4 clickable elements each containing one of the 4 primary mathematical operators

    => At any time, pressing the clear button clears the input and output values,
    and returns the calculator to its initialized state; 0 should be shown in the element with the id of display

    => 1) As I input numbers, I should be able to see my input in the element 
    with the id of display

    => In any order, I should be able to add, subtract, multiply and divide a
    chain of numbers of any length, and when I hit =, the correct result should be shown in the element with the id of display

    => When inputting numbers, my calculator should not allow a number to begin 
    with multiple zeros (form validation);

    => When the decimal element is clicked, a . should append to the currently 
    displayed value; two . in one number should not be accepted;

/*/


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
    }

    init() {
        this.bindButtonsWithHandler();
        //display 0 by default
        this.displayValue(this.result);
    }

    /**
    * Get the value of a clicked button
    *
    * @return {Object} The button object with need to refer.
    * @return {string} The value of a button.
    */
    getButtonValue(button) {
        return $(button).val();
    }

    /**
    * Update the input property
    *
    * @param {string} - A value to add at the input value.
    * @return {string} Return the value of a button.
    */
    updateInput(value) {
        //update only if the value is a number
        if (!isNaN(value)) this.input = this.input + value;
        //bind with the view
        this.displayValue(this.input);
        return this.input;
    }

    clearResult() {
        this.input = this.result;
        this.operator = '';
        this.result = 0;
    }

    /**
    * Set a value for the result property
    *
    * @param {number} - A value number to set.
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

    updateResult() {
        let i = parseInt(this.input);
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
        }
        this.clearInput();
        this.displayValue(this.result);
    }

    /**
    * Clear the input property
    *
    * @return {string[]} Return an array of input.
    */

    clearInput() {
        this.input = '';
    }

    /**
    * Update the inputs property
    *
    * @return {number[]} Return an array of input.
    */
    updateInputs(operator) {
        console.log(!!this.input);
        if (this.input !== '') this.inputs.push(parseInt(this.input));
        this.clearInput();
        return this.inputs;
    }

    updateOperator(operator) {
        //if there is already an operator => get the result of the operation
        if (operator !== 'equals') this.operator = operator;
        else this.clearResult();;
    }

    /**
    * Get the array of inputs
    *
    * @return {string[]} Return the array of inputs.
    */
    getInputs() {
        return this.inputs;
    }

    /**
    * Display a value on the display element
    *
    * @param {string} - A value to display.
    * @return {string} Return the value of a button.
    */
    displayValue(value) {
        this.display.html(value);
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
            //here this => button element
            let value = calculator.getButtonValue(this);
            //update the input value only if the value is a number
            if (!isNaN(value)) calculator.updateInput(value);
            //otherwise, update result
            else {
                calculator.updateResult();
                //update the array of inputs
                // calculator.updateInputs();
                //update the operator props
                calculator.updateOperator(this.id);
            }


        }
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

