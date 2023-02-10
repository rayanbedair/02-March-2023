var inputs = document.querySelectorAll('input[type=text]');

[].forEach.call(inputs, function (input) {
    console.log(input);
    input.style['inline-size'] = (3 * input.maxlength - 1).toString + 'ch';
    console.log(input.style['inline-size']);
});
