const TURNS = 8;
const LENGTH = 6;

const answer = '369ceb'

let activeRow = 0;
let activeCell = 1;
let full = false;

const getAnswerList = () => {
    const list = answer.split("");
    return list;
}

const getCell = (rowIndex,cellIndex) => {
    const grid = document.getElementById('grid');
    const row = grid.getElementsByClassName('row')[rowIndex];
    const cell = row.getElementsByClassName('cell')[cellIndex];
    return cell
};

const getRowString = () => {
    let str = "";
    for (let i = 1; i <= 6; i++) {
        let cell = getCell(activeRow, i)
        str = str.concat(cell.innerText)
    }
    return str;
};

const getRowList = () => {
    let list = []
    for (let i = 1; i <= 6; i++) {
        let cell = getCell(activeRow, i)
        list.push(cell.innerText)
    }
    return list;
};

const updateColorCell = (on) => {
    const value = getRowString();
    const hexValue = '#' + value;
    const colorCell = getCell(activeRow,7);
    if (on) {
        colorCell.setAttribute('style', `background-color: ${hexValue}; border: 2px solid #000`);
    } else {
        colorCell.setAttribute('style', `background-color: #fff; border: none`)
    }
};

const fillCell = (c) => {
    const cell = getCell(activeRow, activeCell);
    if (activeCell <= 6) {
        cell.innerText = c;
        activeCell += 1;
        if (activeCell === 7) {
            updateColorCell(true);
        }
        cell.setAttribute('style', 'border: 2px solid #787c7e');
    } 
};

const emptyCell = () => {
    if (activeCell > 1 && activeCell <= 7) {
        activeCell -= 1;
        const cell = getCell(activeRow, activeCell);
        cell.innerText = '';
        cell.setAttribute('style', 'border: 2px solid #d3d6da')
        updateColorCell(false)
    }
};

const updateCellCSS = (index, result) => {
    const cell = getCell(activeRow, index+1);
    if (result < 0) {
        cell.setAttribute('style', 'color: #ffffff; background-color: #787c7e');
    } else if (result === index) {
        cell.setAttribute('style', 'color: #ffffff; background-color: #6aaa64');
    } else if (result >= 0) {
        cell.setAttribute('style', 'color: #ffffff; background-color: #c9b458');
    }
};

const gameWon = () => {
    activeRow = 7;
    activeCell = 7;
    alert('Well Done!!! You guessed it!!');
}

const submitGuess = () => {
    if (activeCell > 6) {
        const answerList = getAnswerList();
        const guessList = getRowList();
        let correctCount = 0;
        for (let i = 0; i < 6; i++) {
            let result = answerList.indexOf(guessList[i]);
            if (result === i) {
                correctCount += 1;
            }
            updateCellCSS(i, result);
        }
        if (correctCount === 6) {
            gameWon();
        }
        activeRow += 1;
        activeCell = 1;
    }
};

const giveInputsEventListeners = () => {
    const input = document.getElementById('input-section')
    for (let i = 0; i < 4; i++) {
        let row = input.getElementsByClassName('input-row')[i];
        for (let j = 0; j < 4; j++) {
            let inputCell = row.getElementsByClassName('input-cell')[j];
            inputCell.addEventListener('click', () => { fillCell(`${inputCell.innerText}`)});
        }
    }
    const deleteKey = document.getElementById('delete');
    deleteKey.addEventListener('click', emptyCell);
    const enterKey = document.getElementById('enter');
    enterKey.addEventListener('click', submitGuess);
};

giveInputsEventListeners();
