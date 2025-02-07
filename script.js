const display = document.getElementById('display'); // Gets the display input element
const buttons = document.querySelectorAll('.btn'); // Selects all buttons with the class 'btn'
const clearButton = document.getElementById('clear'); // Gets the clear button element
const equalsButton = document.getElementById('equals'); // Gets the equals button element
const infoButton = document.querySelector('.info-button'); // Gets the info button element
const dropdownContent = document.querySelector('.dropdown-content'); // Gets the dropdown content

let currentInput = ''; // Initializes a variable to hold the current input

buttons.forEach(button => { // Loops through each button
    button.addEventListener('click', () => { // Adds a click event listener to each button
        currentInput += button.dataset.value; // Appends the button's value to the current input
        display.value = currentInput; // Updates the display with the current input
    });
});

equalsButton.addEventListener('click', () => { // Adds a click event listener to the equals button
    try {
        // Validate the expression before evaluating
        if (currentInput.trim() === '') {
            throw new Error('No input'); // Throw an error if input is empty
        }
        // Sanitize input to prevent errors
        const sanitizedInput = currentInput.replace(/[^0-9+\-*/().]/g, ''); // Allow only valid characters
        const result = Function('"use strict";return (' + sanitizedInput + ')')(); // Evaluates the sanitized input
        if (result === Infinity || isNaN(result)) {
            throw new Error('Invalid operation'); // Handle division by zero or invalid operations
        }
        display.value = result; // Displays the result in the display
        currentInput = ''; // Resets the current input
    } catch (error) {
        display.value = 'Error'; // Displays 'Error' if evaluation fails
        currentInput = ''; // Resets the current input
    }
});

clearButton.addEventListener('click', () => { // Adds a click event listener to the clear button
    currentInput = ''; // Resets the current input
    display.value = ''; // Clears the display
});

// Toggle dropdown visibility
infoButton.addEventListener('click', () => { // Adds a click event listener to the info button
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block'; // Toggles the dropdown visibility
});

// Keyboard support
document.addEventListener('keydown', (event) => { // Adds a keydown event listener to the document
    if (!isNaN(event.key) || ['+', '-', '*', '/'].includes(event.key)) { // Checks if the key is a number or an operator
        currentInput += event.key; // Appends the key to the current input
        display.value = currentInput; // Updates the display with the current input
    } else if (event.key === 'Enter' || event.key === '=') { // Checks if the Enter key or '=' key is pressed
        try {
            // Validate the expression before evaluating
            if (currentInput.trim() === '') {
                throw new Error('No input'); // Throw an error if input is empty
            }
            // Sanitize input to prevent errors
            const sanitizedInput = currentInput.replace(/[^0-9+\-*/().]/g, ''); // Allow only valid characters
            const result = Function('"use strict";return (' + sanitizedInput + ')')(); // Evaluates the sanitized input
            if (result === Infinity || isNaN(result)) {
                throw new Error('Invalid operation'); // Handle division by zero or invalid operations
            }
            display.value = result; // Displays the result
            currentInput = ''; // Resets the current input
        } catch (error) {
            display.value = 'Error'; // Displays 'Error' if evaluation fails
            currentInput = ''; // Resets the current input
        }
    } else if (event.key === 'Backspace') { // Checks if the Backspace key is pressed
        currentInput = currentInput.slice(0, -1); // Removes the last character from the current input
        display.value = currentInput; // Updates the display with the current input
    } else if (event.key === 'Escape') { // Checks if the Escape key is pressed
        currentInput = ''; // Resets the current input
        display.value = ''; // Clears the display
    }
});

// Function to toggle the navigation bar
const navBar = document.getElementById('navBar');

infoButton.addEventListener('click', () => {
    navBar.classList.toggle('active'); // Toggle the active class to show/hide the nav bar
});
