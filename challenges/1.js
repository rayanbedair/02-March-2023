var inputs = document.querySelectorAll('input[type=text]');
var tables = document.querySelectorAll('table'), table;

var isVerticalTable, cells, cell, rows, row;

for (var i = 0; i < inputs.length; i++) {
    inputs[i].style['inline-size'] = (3 * inputs[i].maxLength).toString() + 'ch';
    isVerticalTable = inputs[i].getAttribute('class') === 'vertical';

    // Emptying the text when loading the page
    inputs[i].value = '';

    // Adding parameter for the 'input' event listener
    inputs[i].table = tables[i];

    isVerticalTable ? MakeVerticalTable(tables[i], inputs[i].maxLength) : MakeTable(tables[i], inputs[i].maxLength);
    isVerticalTable ? inputs[i].addEventListener('input', UpdateVerticalTable) : inputs[i].addEventListener('input', UpdateTable)
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

    for (i = 0; i < cells.length && i < event.target.value.length; i++) {
        cells[i].innerText = event.target.value[i];
    }
    for (i = event.target.value.length; i < cells.length; i++) {
        cells[i].innerText = '_';
    }
}

function UpdateVerticalTable(event) {

    rows = event.currentTarget.table.rows;

    for (i = 0; i < rows.length && i < event.target.value.length; i++) {
        rows[i].cells[0].innerText = event.target.value[i];
    }
    for (i = event.target.value.length; i < rows.length; i++) {
        rows[i].cells[0].innerText = '_';
    }
}