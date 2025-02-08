let history = [];

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function clearEntry() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        let expression = document.getElementById('display').value;
        
        // Convert percentage (e.g., "50%" → "50/100")
        expression = expression.replace(/(\d+)%/g, "($1/100)");

        let result = eval(expression);
        history.push(expression + ' = ' + result);
        document.getElementById('display').value = result;
    } catch (error) {
        alert('Invalid Input');
    }
}

function viewHistory() {
    alert(history.join('\n'));
}

const toggleMode = document.getElementById('toggle-mode');
const container = document.querySelector('.container');

toggleMode.addEventListener('change', function () {
    container.classList.toggle('dark-mode');
});

document.addEventListener('keydown', function (event) {
    handleKeyPress(event.key);
});

function handleKeyPress(key) {
    if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        clearEntry();
    } else if (key === 'Escape') {
        clearDisplay();
    }
}
