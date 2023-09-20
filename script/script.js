// Initialize the application when the window loads
window.onload = () => {
    // DOM elements
    let continueButton = document.getElementById("intro-button");
    let screen = document.getElementById('calc-screen');
    let buttons = document.getElementsByTagName('button');

    // All buttons excluding these IDs will be assigned number-adding functionality
    const excludedIDs = ['clear', 'equal', 'github', 'exit'];

    // Event listeners
    continueButton.addEventListener("click", doContinueButton);

    // Trigger continueButton function on Enter key
    document.getElementById("user-name-input").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            doContinueButton();
        }
    });

    // // Add number functionality to calculator screen
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if (!excludedIDs.includes(this.id)) {
                let number = this.innerHTML;
                screen.innerHTML += number; 
            }
        });     
    }
      

    // Clear screen
    let clearButton = document.getElementById('clear');
    clearButton.onclick = () => screen.innerHTML = "";


    // Evaluate addition and update screen
    let equalButton = document.getElementById('equal');
    equalButton.onclick = () => {
        let input = screen.innerHTML;

        input = validateNumbers(input);
        let addends = parseInput(input);

        // if there are empty addends, replace with zero
        for (let i = 0; i < addends.length; i++) {
            if (addends[i] == null || addends[i] == undefined) {
                addends[i] = 0;
            }
        }
        var total = addTwoNumbers(addends[0], addends[1]);   
        screen.innerHTML = total;
    }

    // Open github link
    let githubButton = document.getElementById('github');
    githubButton.onclick = () => window.open('https://github.com/SRDMoss/my-adding-machine', '_blank')

    // Exit application
    let exitButton = document.getElementById('exit');
    exitButton.onclick = () => changeDisplays('site-content', 'goodbye');
}


// Add two numbers
function addTwoNumbers(addendOne, addendTwo) {
    if (typeof addendOne !== "number" || typeof addendTwo !== "number") {
        return "Invalid input";
    }

    return addendOne + addendTwo;
}


// Validate input
function validateNumbers(input) {
    if (input == null || input === "") {
        window.alert("The input is empty. Please enter numbers.");
        screen.innerHTML = "";
        return;
    }

    let regex = /^\d+\+\d+$/;

    if (!regex.test(input)) {
        window.alert("This is not the correct format. Remember two numbers with a plus " +
          "between them and then hit the equals button. Nothing else matters. ");
        screen.innerHTML = "";
        return null;
    }
    return input;
}

// Parse input string to numbers
function parseInput(input) {
    if (input == null || input === "") {
        return [0, 0];
      }
    
    let numbers = input.split("+");
    let addendOne = parseInt(numbers[0]);
    let addendTwo = parseInt(numbers[1]);
    if (isNaN(addendOne) || isNaN(addendTwo)) {
        return [0, 0];
    }

    return [addendOne, addendTwo];
}

// Update name display in header
function readName() {
    let userName =  document.getElementById('user-name-input').value;

    if (userName.length > 12) {
        window.alert("Name should be fewer than 12 characters.");
        return;
    }


    let nameSlots = document.getElementsByClassName("user-name");

    if (userName) {
        userName += "'s"
    }

    if (userName) {        
        for (let i = 0; i < nameSlots.length; i++) {
            nameSlots[i].innerHTML = userName;
        }
    }
    addLines();
}

// Toggle display states
function changeDisplays(hide, show) {
    document.getElementById(hide).style.display = "none";
    document.getElementById(show).style.display = "flex";
}

function doContinueButton() {
    let userName = readName();

    changeDisplays('setup-bubble', 'site-content')
    return userName;
}

// Draw decorative lines on calculator
function addLines() {
    lineContainers = document.getElementsByClassName('lines');
    
    for (let i = 0; i < lineContainers.length; i++) {
        let length = '100%';
        let totalLines = 0
        while (totalLines < 8) {
            let hr = document.createElement('hr');
            hr.style.width = length;
            lineContainers[i].appendChild(hr);
            length = parseFloat(length) / 2 + '%';
            totalLines++
        }
    }   
}
