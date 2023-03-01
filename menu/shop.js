var images = document.querySelectorAll('img'), image;
var promptHint, imgId, solutions, jsonStr;


fetch('solutions.json')
    .then(response => response.json())
    .then(jsonResponse => {
        solutions = eval(jsonResponse);


    });

for (var i = 0; i < images.length; i++) {

    images[i].addEventListener('click', PromptHint, false);

    // If the hint has already been found
    if (localStorage.getItem(i + 1) === "ok") {
        images[i].setAttribute('style', 'filter: none;');
        images[i].removeEventListener('click', PromptHint, false);
    }
}

function PromptHint(event) {
    promptHint = prompt('Indice : ');
    imgId = event.srcElement.id;

    // If the hint is correct
    if (promptHint === solutions[imgId]) {
        event.srcElement.setAttribute('style', 'filter: none;');
        event.srcElement.removeEventListener('click', PromptHint, false);
        localStorage.setItem(imgId, 'ok');
    }

}