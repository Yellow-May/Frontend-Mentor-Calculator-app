"use strict";
const body = document.body;
const currentTheme = "1";
const changeTheme = (theme) => (body.className = `theme-${theme}`);
document.addEventListener("DOMContentLoaded", () => changeTheme(currentTheme));
const themeChanger = document.getElementById("theme-changer");
if (themeChanger)
    themeChanger.addEventListener("change", e => {
        const target = e.target;
        changeTheme(target.value);
    });
