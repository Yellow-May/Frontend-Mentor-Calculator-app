const body = document.body;
const currentTheme = "1";

const changeTheme = (theme: "1" | "2" | "3") => (body.className = `theme-${theme}`);

document.addEventListener("DOMContentLoaded", () => changeTheme(currentTheme));

const themeChanger = document.getElementById("theme-changer");

if (themeChanger)
	themeChanger.addEventListener("change", e => {
		const target = e.target as HTMLInputElement;
		changeTheme(target.value as "1" | "2" | "3");
	});
