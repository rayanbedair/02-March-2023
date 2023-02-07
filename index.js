// Thanks to https://dev.to/ananyaneogi/create-a-dark-light-mode-switch-with-css-variables-34l8 for the help
var darkModeSwitcher = document.getElementById("darkModeCheckbox");
var currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

body = document.getElementsByTagName("body")[0];

if (currentTheme) {

    body.setAttribute('data-theme', currentTheme);
    darkModeSwitcher.checked = currentTheme === 'dark';
}

function changeTheme(check) {

    var theme = check.target.checked ? 'dark' : 'light';
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

darkModeSwitcher.addEventListener('change', changeTheme, false);