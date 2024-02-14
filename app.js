const default_colour = '#1100FF'; // BLACK
const eraser_colour = '#d9dddc'; // OFF-WHITE
const border_colour = '#999ea1';

class Settings {
    constructor() {
        this.grid_size = 0;
        this.mode = 'paint';
        this.colour = default_colour;
        this.isMouseDown = false;
    }
}
let settings;

// CREATE ELEMENTS
function makeGridLine(square_height, line_num) {
    const grid_line = document.createElement('div');
    grid_line.classList.add('grid-line-container');

    let line_counter = document.createElement('div')
    line_counter.textContent = line_num;
    line_counter.style.height = `${square_height}px`;
    line_counter.style.width = `${square_height}px`;
    line_counter.style.textAlign = "center";

    grid_line.appendChild(line_counter)

    return grid_line;
}

function makeGridSquare(square_height) {
    const grid_square = document.createElement('div');
    grid_square.classList.add('grid-square-container');
    grid_square.style.height = `${square_height}px`;
    grid_square.style.width = `${square_height}px`;

    return grid_square;
}

// QUERY SELECTORS
const body = document.querySelector('body')
let grid_container = document.querySelector('.grid-container');
const size_textbox = document.querySelector('.size-textfield');
const pen_tool_button = document.querySelector('.pen-tool-button');
let colour_picker_tool_button = document.querySelector('.colour-picker-tool-button')
const eraser_tool_button = document.querySelector('.eraser-tool-button');

// ADD EVENT LISTENERS WHERE APPLICABLE
size_textbox.addEventListener('change', () => {
    const grid_size = parseInt(size_textbox.value);
    if (isNaN(grid_size)) { return; }

    console.log(`Generating a grid of size: ${grid_size} X ${grid_size}`);
    // size_textbox.value = `${grid_size}x${grid_size}`
    
    generateGrid(grid_size);
});

pen_tool_button.addEventListener('click', () => {
    settings.mode = "paint";
    console.log("Mode changed: Paint");
});

eraser_tool_button.addEventListener('click', () => {
    settings.mode = "erase";
    console.log("Mode changed: Erase");
});

function makePaintable(grid_square) {
    grid_square.addEventListener('mousedown', () => {
        event.preventDefault();
        settings.isMouseDown = true;

        grid_square.style.backgroundColor = settings.mode == 'erase' ? eraser_colour : settings.colour;
        grid_square.style.borderColor = settings.mode == 'erase' ? border_colour : settings.colour;
    });

    grid_square.addEventListener('mouseup', () => {
        settings.isMouseDown = false;
    });

    grid_square.addEventListener('mouseover', () => {
        if (settings.isMouseDown && settings.mode == "erase") {
            grid_square.style.backgroundColor = eraser_colour;
            grid_square.style.borderColor = border_colour;
        } 
        else if (settings.isMouseDown) { 
            grid_square.style.backgroundColor = settings.colour;
            grid_square.style.borderColor = settings.colour;
        }
    });
}

colour_picker_tool_button.addEventListener('click', () => {
    const colour = colour_picker_tool_button.value;
    settings.colour = colour;
});

document.addEventListener('mouseup', () => {
    settings.isMouseDown = false;
});

// JSCOLORS FUNC
function updateColour(colour_picker_attributes) {
    console.log(colour_picker_attributes)
    const colour = colour_picker_attributes.toHEXString();
    settings.colour = colour;
}

// MAIN FUNCTIONALITY
function generateGrid(size) {
    if (!typeof size == 'number') { console.log("NaN"); return; }

    settings.grid_size = size;

    const new_grid_container = document.createElement('div');
    new_grid_container.classList.add('grid-container');
    grid_container.replaceWith(new_grid_container);

    for (let i=0; i<size; i++) {
        const square_height = 900 / size;
        const grid_line = makeGridLine(square_height, i + 1);

        for (let ii=0; ii<size; ii++) {
            const grid_square = makeGridSquare(square_height);
            makePaintable(grid_square);

            grid_line.appendChild(grid_square);
        }

        new_grid_container.appendChild(grid_line);
    }

    grid_container = new_grid_container;
}

function main() {
    settings = new Settings();

    const grid_size = parseInt(size_textbox.value);
    generateGrid(grid_size);
}

main();
