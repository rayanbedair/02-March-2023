var inputs = document.querySelectorAll('input[type=text]');
var tables = document.querySelectorAll('table'), table;

var isVerticalTable, cells, cell, rows, row;

// Map that holds as keys the index of the table and as value the index of the cell item (ex: 0:3 means the 3rd cell of the 0th table must be in red)
var lettersInRed = { 0: 3, 1: 0, 2: 1, 3: 2, 5: 1, 6: 4 }, letterInRed;

// Map that holds as keys the index of the table and as value the place of the letter in the word (ex: 0:2 means the red letter in the 0th table has to be displayed as '2')
var hintsOrder = { 0: 2, 1: 5, 2: 1, 3: 3, 5: 6, 6: 4 };

for (var i = 0; i < inputs.length; i++) {
    isVerticalTable = inputs[i].getAttribute('class') === 'vertical';
    inputs[i].style['inline-size'] = isVerticalTable ? (2 * inputs[i].maxLength - 2.75).toString() + 'ch' : (3 * inputs[i].maxLength + 4).toString() + 'ch';

    // Emptying the text when loading the page
    inputs[i].value = '';

    // Adding parameters for the 'input' event listener
    inputs[i].table = tables[i];
    inputs[i].index = i;

    isVerticalTable ? MakeVerticalTable(tables[i], inputs[i].maxLength) : MakeTable(tables[i], inputs[i].maxLength);
    isVerticalTable ? inputs[i].addEventListener('input', UpdateVerticalTable) : inputs[i].addEventListener('input', UpdateTable)

    if (lettersInRed[i] !== undefined) {

        rows = tables[i].tBodies[0].rows;
        letterInRed = lettersInRed[i];

        cell = isVerticalTable ? rows[letterInRed].cells[0] : rows[0].cells[letterInRed];
        cell.classList.add('red_letter');
    }
}


function MakeTable(table, length) {

    row = table.insertRow()
    for (var i = 0; i < length; i++) {
        cell = row.insertCell();
        cell.innerHTML = '_';
    }
}

function MakeVerticalTable(table, length) {

    for (var i = 0; i < length; i++) {
        row = table.insertRow();
        cell = row.insertCell();
        cell.innerHTML = '_';
    }
}

function UpdateTable(event) {

    cells = event.currentTarget.table.rows[0].cells;
    index = event.currentTarget.index;

    for (i = 0; i < cells.length && i < event.target.value.length; i++) {
        // Checking if the letter to be replaced is a hint or not
        cells[i].innerText = cells[i].classList.contains('red_letter') ? hintsOrder[index].toString() : event.target.value[i].toUpperCase();
    }
    for (i = event.target.value.length; i < cells.length; i++) {
        cells[i].innerText = '_';
    }
}

function UpdateVerticalTable(event) {

    rows = event.currentTarget.table.rows;
    index = event.currentTarget.index;

    for (i = 0; i < rows.length && i < event.target.value.length; i++) {
        // Checking if the letter to be replaced is a hint or not
        rows[i].cells[0].innerText = rows[i].cells[0].classList.contains('red_letter') ? hintsOrder[index].toString() : event.target.value[i].toUpperCase();
    }
    for (i = event.target.value.length; i < rows.length; i++) {
        rows[i].cells[0].innerText = '_';
    }
}