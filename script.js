function showScreen(screenId) { //Function that shows the different game screens

  document.querySelectorAll(".screen").forEach(screen => { //Here it selects ALL the sections and remove the class ACTIVE(display flex)
    screen.classList.remove("active");
  });

  document.getElementById(screenId).classList.add("active"); //At the end, it enables (Adding the class active) the screen that you've sent as parameter :)
}

var currentPlayer = 1;
function showPlayerSide(player) { //Function that changes the player sied
  if (player == 1) {
    document.getElementById("p1S").style.display = "flex";
    document.getElementById("p2S").style.display = "none";
    currentPlayer = 1;
  } else {
    document.getElementById("p1S").style.display = "none";
    document.getElementById("p2S").style.display = "flex";
    currentPlayer = 2;
  }
}

const toast = document.querySelector(".toast");

function showToast(player, message, type) { //Show a toast with game tips, so then players know what to do
  toast.classList.add("active"); //Add the class that pop the toast at the screen

  if (type == "warning") {

    toast.classList.add("warning");
    document.getElementById("warning-icon").style.display = "block"
    setTimeout(() => {
      toast.classList.remove("active");
      toast.classList.remove("warning");
      document.getElementById("warning-icon").style.display = "none"
    }, 2500);

  } else if (type == "tip") {

    document.getElementById("tip-icon").style.display = "block"
    setTimeout(() => {
      toast.classList.remove("active");
      document.getElementById("tip-icon").style.display = "none"
    }, 7000);

  }
  document.getElementById("text1").innerText = "PLAYER " + player;
  document.getElementById("text2").innerText = message;

  // Optional auto-hide after 4s


}

function showPlayerInfo(player, message, shipsNumber) {

  const info = document.getElementById(`p${player}-info`);
  const ships = document.getElementById(`p${player}-ships`);
  if (info) info.innerText = message;
  if (ships) ships.innerText = shipsNumber;

}

function start() {
  showScreen('gameScreen');

  const gridNumber = Number(document.getElementById("gridSize").value);
  const gridTotalSize = gridNumber * gridNumber;

  createBoard("board-p1", gridNumber);
  createBoard("board-p2", gridNumber);

  shipsTotalNumber = Math.round(gridTotalSize * 0.2);
  ships_number = shipsTotalNumber;
  placingBoats(ships_number);
}

function createBoard(boardId, gridNumber) {
  const board = document.getElementById(boardId);
  board.innerHTML = "";

  board.style.gridTemplateColumns = `40px repeat(${gridNumber}, 40px)`;
  board.style.gridTemplateRows = `40px repeat(${gridNumber}, 40px)`;

  // canto vazio
  const corner = document.createElement("div");
  corner.classList.add("corner");
  board.appendChild(corner);

  // letras
  for (let i = 65; i < 65 + gridNumber; i++) {
    const letter = document.createElement("div");
    letter.classList.add("label");
    letter.textContent = String.fromCharCode(i);
    board.appendChild(letter);
  }

  // números + água
  for (let row = 0; row < gridNumber; row++) {
    const number = document.createElement("div");
    number.classList.add("label");
    number.textContent = row + 1;
    board.appendChild(number);

    for (let col = 0; col < gridNumber; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell", "water");

      cell.setAttribute("row", row);
      cell.setAttribute("col", col);
      cell.setAttribute("empty", "true"); // setAttribute() always return a boolean (I figured it out the hard way ;-;)

      cell.addEventListener("click", () => {
        clicked_water(cell);
      });

      board.appendChild(cell);
    }
  }

  createMatrixGrid(gridNumber);
}

var p1_matrix = [];
var p2_matrix = [];
function createMatrixGrid(sideSize) { //Create the matrix grid, used to logically "place" the ships

  for (let i = 0; i < sideSize; i++) { // Player 1 Matrix
    p1_matrix[i] = [];
    for (let j = 0; j < sideSize; j++) {
      p1_matrix[i][j] = 0;
    }
  }

  for (let i = 0; i < sideSize; i++) {// Player 2 Matrix
    p2_matrix[i] = [];
    for (let j = 0; j < sideSize; j++) {
      p2_matrix[i][j] = 0;
    }
  }

}

var isPlacingPhase = false;
function placingBoats(stn) {
  isPlacingPhase = true;
  showToast(currentPlayer, "POSICIONE SEUS BARCOS!", "tip");

  shipsPlacingNumber = stn;
  showPlayerInfo(currentPlayer, "Barcos para posicionar:", shipsPlacingNumber);

}

function placeInMatrix(row, col, value, shipsCurrentNumber) {
  if (currentPlayer == 1) {
    p1_matrix[row][col] = value;
    console.log(p1_matrix);

  } else {
    p2_matrix[row][col] = value;
    console.log(p2_matrix);
  }

  shipsPlacingNumber = shipsCurrentNumber;
  showPlayerInfo(currentPlayer, "Barcos para posicionar:", shipsPlacingNumber);
}

function donePlacing(btn) {

  if (currentPlayer == 1) {
    showPlayerSide(2);
    document.getElementById("donep1").style.display = "none";
    document.getElementById("donep2").style.display = "none";

    placingBoats(shipsTotalNumber);
    showPlayerInfo(currentPlayer, "Barcos para posicionar:", shipsTotalNumber);
  } else {
    attackingBoats();
  }

}

var ships_number;
var shipsPlacingNumber;
var isAttackingPhase = false;

function clicked_water(element) {

  let element_row = element.getAttribute("row");
  let element_col = element.getAttribute("col");
  let element_isEmpty = element.getAttribute("empty");


  if (isPlacingPhase) {

    handlePlacingPhase(element_isEmpty, element_row, element_col, element);

  }


}


function handlePlacingPhase(isEmpty, row, col, element) {
  if (isEmpty === "true" && shipsPlacingNumber != 0) {

    placeInMatrix(row, col, 1, shipsPlacingNumber - 1);
    element.setAttribute("empty", "false");

    element.innerHTML = "<i class='fa-solid fa-circle-dot fa-lg' style='color: #c41717;'></i>";

  } else if (isEmpty === "false") {

    placeInMatrix(row, col, 0, shipsPlacingNumber + 1);
    element.setAttribute("empty", "true");

    element.innerHTML = "";

    document.getElementById("donep1").style.display = "none";
    document.getElementById("donep2").style.display = "none";

  } else {
    showToast(currentPlayer, "Você não tem mais barcos", "warning")
  }

  if (shipsPlacingNumber === 0) {
    document.getElementById("donep1").style.display = "block";
    document.getElementById("donep2").style.display = "block";
  }
}


function attackingBoats() {
  console.log("aaaaaaaaaaaaaaaaa");
};
