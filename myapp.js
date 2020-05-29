let numberOfDivs;
let gridContainer = document.querySelector('#grid-container');
let gridItem = [];

/* this function creates the "sketchpad". It
- prompts for user input,
- sets the css grid columns to the number given by user input,
- runs a function which creates the grid items
- returns the value of numberofdivs to global scope*/
function createSketchPad(){
    let numberOfColumns = prompt('how many columns and rows would you like?');
    gridContainer.style.cssText = `grid-template-columns: repeat(${numberOfColumns}, 1fr)`;
    numberOfDivs = numberOfColumns * numberOfColumns;
    
    function createGridItemDiv(x){
        for (i = 0; i < x; i++){    
            gridItem[i] = document.createElement('div');
            gridItem[i].classList.add('griditem');
            gridItem[i].setAttribute('id', `item${[i]}`);
            gridContainer.appendChild(gridItem[i]);
        }
    }
    createGridItemDiv(numberOfDivs);
    return numberOfDivs;
}
createSketchPad();

/* this function sets the event listeners for each grid item*/
function setEventListenerToDivs(){
    for (i = 0; i < numberOfDivs; i++){
        gridItem[i] = document.querySelector(`#item${i}`);
        gridItem[i].addEventListener('mouseover', changeBackGroundColor); 
    }
}
setEventListenerToDivs();

/* this function is called on buttonclick, it toggles to either an even or uneven number */
let toggle = 0;
function toggleRandomColor(){
    toggle = toggle + 1;
    return toggle;
}

/* this function is called on mouseover and changes backgroundcolor of grid item.
if toggle is even it gives black, else it gives random color*/
function changeBackGroundColor(){
    if(toggle % 2 == 0){
    this.style.backgroundColor = "black";
    } else {
        let rgb
        function randomColorGenerator(){
            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            rgb = `${r}, ${g}, ${b}`
            return rgb;
        }
        randomColorGenerator();
        this.style.backgroundColor = `rgb(${rgb})`;
        }
}    

/* this function is called on click and deletes all formerly created grid items to clear the grid. */
function removeAllGridItems(){
    for(i = 0; i < numberOfDivs; i++){
    gridItem[i] = document.querySelector(`#item${i}`);
    gridContainer.removeChild(gridItem[i]);
    }
}

/* this function is called on click and changes button text and style */
function toggleButtonText(){
    if(toggle % 2 == 0){
        randomButton.textContent = 'use random color';
        randomButton.style.cssText = `background: #19b490`;
    } else {
        randomButton.textContent = 'GO BACK TO BLACK!';
        randomButton.style.cssText = `background: black`;
    }
}

let resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', removeAllGridItems);
resetButton.addEventListener('click', createSketchPad);
resetButton.addEventListener('click', setEventListenerToDivs);

let randomButton = document.querySelector('#random');
randomButton.addEventListener('click', toggleRandomColor);
randomButton.addEventListener('click', toggleButtonText)


