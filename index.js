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

function getButtonValue() {
    console.log(typeof $(this).val());
    console.log($(this).val());
}

$(window).on('load', () => {
    console.log('JS Calculator');

    $('button').on('click', getButtonValue);
})

