var inputs = document.querySelectorAll('input[type=text]');

[].forEach.call(inputs, function (input) {
    input.style['inline-size'] = (3 * input.maxLength).toString() + 'ch';
});
