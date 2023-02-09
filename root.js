// Thanks to https://dev.to/ananyaneogi/create-a-dark-light-mode-switch-with-css-variables-34l8 for the help
var darkModeSwitcher = document.getElementById("darkModeCheckbox");
var currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
var challenge1 = document.getElementById("challenge1");

body = document.getElementsByTagName("body")[0];

if (currentTheme) {

    body.setAttribute('data-theme', currentTheme);
    darkModeSwitcher.checked = currentTheme === 'dark';

    if (challenge1) {
        var challenge2_visibility = darkModeSwitcher.checked ? 'visible' : 'hidden';
        challenge1.style.visibility = challenge2_visibility;
    }
}

function changeTheme(check) {

    var theme = check.target.checked ? 'dark' : 'light';
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (challenge1) {
        var challenge2_visibility = check.target.checked ? 'visible' : 'hidden';
        challenge1.style.visibility = challenge2_visibility;
    }
}

darkModeSwitcher.addEventListener('change', changeTheme, false);