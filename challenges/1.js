var inputs = document.querySelectorAll('input[type=text]'), input_class;
var tables = document.querySelectorAll('table');

var td = document.createElement('td'), cell;
var tr = document.createElement('tr'), row;

function MakeTable(table, length) {

    row = table.insertRow()
    for (var i = 0; i < length; i++) {
        cell = row.insertCell();
        cell.innerHTML = 'a';

    }

}

function MakeVerticalTable(table, length) {

    for (var i = 0; i < length; i++) {
        row = table.insertRow();
        cell = row.insertCell();
        cell.innerHTML = 'z';

    }

}


for (var i = 0; i < inputs.length; i++) {
    inputs[i].style['inline-size'] = (3 * inputs[i].maxLength).toString() + 'ch';
    isVerticalTable = inputs[i].getAttribute('class') === 'vertical';

    isVerticalTable ? MakeVerticalTable(tables[i], inputs[i].maxLength) : MakeTable(tables[i], inputs[i].maxLength);

}

// [].forEach.call(inputs, function (input) {
//     input.style['inline-size'] = (3 * input.maxLength).toString() + 'ch';

//     for (var i = 0; i < input.maxLength; i++) {
//         table.insertCell();
//     }
// });
