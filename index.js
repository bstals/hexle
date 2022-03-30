const TURNS = 8;
const LENGTH = 6;
const INPUTS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

const EXTRA = ["DELETE", "ENTER"];

const answer = "369ceb";

let activeRow = 0;
let activeCell = 1;
let full = false;

const constructGrid = (numRows, numCells) => {
  const main = document.querySelector("main");
  const grid = document.createElement("div");
  grid.setAttribute("id", "grid");
  for (let i = 0; i < numRows; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < 8; j++) {
      const cell = document.createElement("div");
      if (j === 0) {
        cell.classList.add("cell", "blank");
      } else if (j === 7) {
        cell.classList.add("cell", "color-cell");
      } else {
        cell.classList.add("cell");
      }
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
  main.appendChild(grid);
};

const constructInputs = () => {
  const main = document.querySelector("main");
  const section = document.createElement("div");
  section.setAttribute("id", "input-section");
  let c = 0
  for (let i = 0; i < 4; i++) {
    const row = document.createElement("div");
    row.classList.add('input-row');
    for (let j = 0; j < 4; j++) {
      const cell = document.createElement('div')
      cell.classList.add('input-cell');
      cell.innerText = INPUTS[c];
      c += 1;
      row.appendChild(cell) 
    }
    section.appendChild(row)
  }
  const extra = document.createElement('div')
  extra.classList.add('input-row', 'extra-inputs')
  const deleteKey = document.createElement('div');
  const enterKey = document.createElement('div');
  deleteKey.setAttribute('id', 'delete');
  enterKey.setAttribute('id', 'enter');
  deleteKey.classList.add('input-cell', 'not-input');
  enterKey.classList.add('input-cell', 'not-input');
  deleteKey.innerText = EXTRA[0];
  enterKey.innerText = EXTRA[1];
  extra.appendChild(deleteKey)
  extra.appendChild(enterKey)
  section.appendChild(extra)
  main.appendChild(section);
};

const getAnswerList = () => {
  const list = answer.split("");
  return list;
};

const getCell = (rowIndex, cellIndex) => {
  const grid = document.getElementById("grid");
  const row = grid.getElementsByClassName("row")[rowIndex];
  const cell = row.getElementsByClassName("cell")[cellIndex];
  return cell;
};

const getRowString = () => {
  let str = "";
  for (let i = 1; i <= 6; i++) {
    let cell = getCell(activeRow, i);
    str = str.concat(cell.innerText);
  }
  return str;
};

const getRowList = () => {
  let list = [];
  for (let i = 1; i <= 6; i++) {
    let cell = getCell(activeRow, i);
    list.push(cell.innerText);
  }
  return list;
};

const updateColorCell = (on) => {
  const value = getRowString();
  const hexValue = "#" + value;
  const colorCell = getCell(activeRow, 7);
  if (on) {
    colorCell.setAttribute(
      "style",
      `background-color: ${hexValue}; border: 2px solid #000`
    );
  } else {
    colorCell.setAttribute("style", `background-color: #fff; border: none`);
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
    cell.setAttribute("style", "border: 2px solid #787c7e");
  }
};

const emptyCell = () => {
  if (activeCell > 1 && activeCell <= 7) {
    activeCell -= 1;
    const cell = getCell(activeRow, activeCell);
    cell.innerText = "";
    cell.setAttribute("style", "border: 2px solid #d3d6da");
    updateColorCell(false);
  }
};

const updateCellCSS = (index, result) => {
  const cell = getCell(activeRow, index + 1);
  if (result < 0) {
    cell.setAttribute("style", "color: #ffffff; background-color: #787c7e; border: 2px solid #787c7e");
  } else if (result === index) {
    cell.setAttribute("style", "color: #ffffff; background-color: #6aaa64; border: 2px solid #6aaa64");
  } else if (result >= 0) {
    cell.setAttribute("style", "color: #ffffff; background-color: #c9b458; border: 2px solid #c9b458");
  }
};

const gameWon = () => {
  activeRow = 7;
  activeCell = 7;
  alert("Well Done!!! You guessed it!!");
};

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
  const input = document.getElementById("input-section");
  for (let i = 0; i < 4; i++) {
    let row = input.getElementsByClassName("input-row")[i];
    for (let j = 0; j < 4; j++) {
      let inputCell = row.getElementsByClassName("input-cell")[j];
      inputCell.addEventListener("click", () => {
        fillCell(`${inputCell.innerText}`);
      });
    }
  }
  const deleteKey = document.getElementById("delete");
  deleteKey.addEventListener("click", emptyCell);
  const enterKey = document.getElementById("enter");
  enterKey.addEventListener("click", submitGuess);
};

const generateGame = () => {
  constructGrid(LENGTH, 8);
  constructInputs();
  giveInputsEventListeners();
};

generateGame();
