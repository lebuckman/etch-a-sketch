const DEFAULT_GRID_SIZE = 16;
const container = document.querySelector(".container");
const copyInput = document.querySelector("#copy-input");
const resetBtn = document.querySelector("#reset-btn");
const sizePrompt = document.querySelector("#size-prompt");
const sizeSubmit = document.querySelector("#size-submit");
const sizeInput = document.querySelector("#size-input");

sizeInput.addEventListener("focus", entryHint);
sizeInput.addEventListener("keyup", displayGridSize);
sizeSubmit.addEventListener("click", createGrid);
resetBtn.addEventListener("click", resetGrid);

// Create a 16x16 drawable grid on window load
window.addEventListener("load", () => {
    createGrid();
    draw();
});

function changeColor() {
    let blackRadio = document.getElementById("black-pen");
    let redRadio = document.getElementById("red-pen");
    let blueRadio = document.getElementById("blue-pen");
    let rainbow = document.getElementById("rainbow-pen");
    let eraserRadio = document.getElementById("eraser-pen");

    if (blackRadio.checked) {
        this.style.backgroundColor = "#2e2b2b";
    } else if (redRadio.checked) {
        this.style.backgroundColor = "#da2d2d";
    } else if (blueRadio.checked) {
        this.style.backgroundColor = "#3f33dd";
    } else if (eraserRadio.checked) {
        this.style.backgroundColor = "";
    } else if (rainbow.checked) {
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        this.style.backgroundColor = "#" + randomColor;
    }
}

// Create a grid with nested divs and flex-box
function createGrid() {
    let sizeInputValue = sizeInput.value;
    if (sizeInputValue < 0 || sizeInputValue > 99 || isNaN(sizeInputValue)) {
        sizePrompt.textContent = "Make sure it's a number from 2 to 99!";
    } else {
        sizePrompt.textContent = "";
        copyInput.textContent = "";
        sizeInput.value = "";
        container.innerHTML = "";
        if (
            sizeInputValue == 0 ||
            sizeInputValue > 99 ||
            sizeInputValue == ""
        ) {
            for (let i = 0; i < 16; i++) {
                let row = document.createElement("div");
                row.classList.add("row");
                container.appendChild(row);
                for (let j = 0; j < 16; j++) {
                    let column = document.createElement("div");
                    column.classList.add("column");
                    row.appendChild(column);
                }
            }
        } else {
            for (let i = 0; i < sizeInputValue; i++) {
                let row = document.createElement("div");
                row.classList.add("row");
                container.appendChild(row);
                for (let j = 0; j < sizeInputValue; j++) {
                    let column = document.createElement("div");
                    column.classList.add("column");
                    row.appendChild(column);
                }
            }
        }
    }
    draw();
}

// Display to user the square grid size as # x #
function displayGridSize() {
    let sizeInputValue = sizeInput.value;
    copyInput.textContent = `x ${sizeInputValue}`;
}

// Add event listeners to the created divs with class "column"
function draw() {
    const columns = document.querySelectorAll(".column");

    columns.forEach((column) => {
        column.addEventListener("mouseover", changeColor);
    });
}

function entryHint() {
    sizePrompt.textContent = `Enter a number between 2 and 99.`;
}

function resetGrid() {
    const columns = document.querySelectorAll(".column");

    columns.forEach((column) => {
        column.style.backgroundColor = "";
    });
}
