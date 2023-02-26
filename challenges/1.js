// This is a list of alert popups with the text to say when Chacha will select an element of the legend
var prompts = [
    "Alors, pour le premier mot, ça serait :",
    "Et le 2eme mot est :",
    "Para el numero 3, la palabra es :",
    "Khobz pour le 4 :",
    "5 :",
    "pOUR LE NUMÉRO SISSE :",
    "Ah donc tu es déjà au dernier mot toi ? Bah donne le, vas-y :"
];

// This are coordinates for the words:
// The key of this map is the index of the word, in the legend list
// The values correspond to the indexes of the beggining and of the end of the word, in the table
// For example, the 1st word will take all cells of the table of the 3rd row (index 2), between the indexes 1 and 9.
var coordinatesOfWords = {
    1: [[2, 1], [2, 9]],
    2: [[1, 8], [5, 8]],
    3: [[5, 3], [5, 8]],
    4: [[5, 5], [9, 5]],
    5: [[5, 7], [10, 7]],
    6: [[7, 3], [7, 8]],
    7: [[10, 7], [10, 12]]
}

var tbody = document.getElementsByTagName('tbody')[0];


for (var i = 1; i < 8; i++) {
    document.getElementById(i).addEventListener('click', FillTable, false);
}


function FillTable(e) {

    var id = e.target.id;
    var response = prompt(prompts[id - 1]).toUpperCase();
    var wordIndexes = coordinatesOfWords[id];
    var wordLength = 1 + (wordIndexes[1][0] - wordIndexes[0][0]) + (wordIndexes[1][1] - wordIndexes[0][1]);

    if (response === null) return;
    if (response === "") return;

    for (var i = response.length; i < wordLength; i++) {
        response += "_";
    }


    for (var i = wordIndexes[0][0], k = 0; i <= wordIndexes[1][0]; i++)  {
        for (var j = wordIndexes[0][1]; j <= wordIndexes[1][1]; j++) {

            tbody.rows[i].cells[j].innerText = response[k];
            k++;
        }
    }

    console.log(k, response.length);
    // If we've reached both of the boundaries, we've properly filled the table.
    if (response.length >= wordLength) return;
    
    for (var i = wordIndexes[0][0], k = 0; i <= wordIndexes[1][0]; i++) {
        for (var j = wordIndexes[0][1]; j <= wordIndexes[1][1]; j++) {

            tbody.rows[i].cells[j].innerText = "_";
        }
    }

}