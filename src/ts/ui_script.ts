// grab the screen components from the ui
const screenMain = document.getElementById("currentVal");
const screenPrev = document.getElementById("previousVal");

// create values that hold the typed 'num' and the 'op' clicked after any 'op' element has be clicked
let valX = 0;
let prevOp = "";

// create reuseable function for performing the arithmetic calculations
const add = (num1: number, num2: number) => num1 + num2;
const sub = (num1: number, num2: number) => num1 - num2;
const mul = (num1: number, num2: number) => num1 * num2;
const div = (num1: number, num2: number) => num1 / num2;

// create a function with a switch that returns the result from
// the desired function (any above) depending on the 'opType' and values passed in
const handleOps = (opType: string, num1: number, num2: number) => {
	switch (opType) {
		case "+":
			return add(num1, num2);
		case "-":
			return sub(num1, num2);
		case "/":
			return div(num1, num2);
		case "x":
			return mul(num1, num2);
		default:
			return 0;
	}
};

// create a function that performs the switch cases of each type of 'num' events
const handleKeys = (e: Event, type: "num" | "op" | "spec") => {
	const target = e.target as HTMLSpanElement;
	let val = target.innerText;

	if (screenMain && screenPrev)
		switch (type) {
			case "num":
				screenMain.innerText === "0"
					? (screenMain.innerText = val)
					: (screenMain.innerText = screenMain.innerText + val);
				break;
			case "op":
				valX !== 0 &&
					prevOp !== "" &&
					(screenMain.innerText = handleOps(prevOp, valX, parseFloat(screenMain.innerText)).toString());
				valX = parseFloat(screenMain.innerText);
				prevOp = val;
				screenMain.innerText = "0";
				screenPrev.innerText = `${valX.toString()} ${val}`;
				break;
			case "spec":
				if (val === "DEL")
					screenMain.innerText.length === 1
						? (screenMain.innerText = "0")
						: (screenMain.innerText = screenMain.innerText.slice(0, -1));
				else {
					screenMain.innerText = "0";
					screenPrev.innerText = "0";
					valX = 0;
					prevOp = "";
				}
				break;
			default:
				break;
		}
};

// create a result function
const handleRes = () => {
	if (screenMain && screenPrev) {
		screenMain.innerText = handleOps(prevOp, valX, parseFloat(screenMain.innerText)).toString();
		screenPrev.innerText = "0";
		prevOp = "";
	}
};

// grab the 'nums','ops', 'special' and 'result' 'keys' elements
const nums = [...document.getElementsByClassName("num")];
const ops = [...document.getElementsByClassName("op")];
const specs = [...document.getElementsByClassName("special")];
const res = document.querySelector(".result");

// create their respective EventListeners
nums.forEach(num => num.addEventListener("click", e => handleKeys(e, "num")));
ops.forEach(op => op.addEventListener("click", e => handleKeys(e, "op")));
specs.forEach(spec => spec.addEventListener("click", e => handleKeys(e, "spec")));
res?.addEventListener("click", handleRes);
