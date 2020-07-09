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
    * @param {string} - A value to add at the input value.
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

    /**
    * Update the value of the result property according the operator property
    *
    * @param {number} - A value number to set.
    * @return {number} Return the value of result.
    */
    updateResult() {
        //|| '0' => manage if the input string is empty
        let i = parseFloat(this.input || '0');
        let r = this.getResult();
        switch (this.operator) {
            case '':
                console.log(i);
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
   * @param {string} - A string that represent the operator.
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
            default:
                this.operator = operator;
                break;
        }
    }

    clearAll() {
        this.setResult(0);
        this.clearInput();
        this.operator = '';
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
    * Clear the result property - set it to 0. Also clear the operator property.
    *
    */
    clearResult() {
        this.input = this.result;
        this.operator = '';
        this.result = 0;
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
    * Get the value of a clicked button
    *
    * @return {Object} The button object with need to refer.
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
            //here this => button element
            let value = calculator.getButtonValue(this);
            //if it doesn't begin with a 0 AND (is a number OR it's the floating operator)
            if (calculator.isBeginByZero(calculator.input, value) && (!isNaN(value) || (value === '.' && !calculator.decimalIsClicked))) {
                //two . in one number should not be accepted
                console.log(value === '.' && !calculator.decimalIsClicked);
                if (value === '.' && !calculator.decimalIsClicked) calculator.decimalIsClicked = true;
                calculator.updateInput(value);
            }
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
    //input current value of input
    //value of the button clicked
    //return true if the input 
    isBeginByZero(input, value) {
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

