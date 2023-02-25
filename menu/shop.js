var images = document.querySelectorAll('img'), image;
var promptHint, imgId, solutions, jsonStr;

fetch('solutions.json')
    .then(response => response.json())
    .then(jsonResponse => {
        solutions = eval(jsonResponse);

        for (image of images) {
            image.addEventListener('click', PromptHint, false);
        }
    });


function PromptHint(event) {
    promptHint = prompt('Indice : ');
    imgId = event.srcElement.id;

    if (promptHint === solutions[imgId]) {
        event.srcElement.setAttribute('style', 'filter: none;');
        event.srcElement.removeEventListener('click', PromptHint, false);
    }

}