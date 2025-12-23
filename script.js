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

function showToast(player, message) { //Show a toast with game tips, so then players know what to do
  toast.classList.add("active"); //Add the class that pop the toast at the screen

  document.getElementById("text1").innerText = "PLAYER " + player;
  document.getElementById("text2").innerText = message;

  // Optional auto-hide after 4s
  setTimeout(() => {
    toast.classList.remove("active");
  }, 10000);
}

function showPlayerInfo(player, message, shipsNumber) {

  const info = document.getElementById(`p${player}-info`);
  const ships = document.getElementById(`p${player}-ships`);
  if (info) info.innerText = message;
  if (ships) ships.innerText = shipsNumber;

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

      cell.addEventListener("click", () => {
        clicked_water(cell);
      });

      board.appendChild(cell);
    }
  }
}


function start() {
  showScreen('gameScreen');

  const gridNumber = Number(document.getElementById("gridSize").value);
  const gridTotalSize = gridNumber * gridNumber;

  createBoard("board-p1", gridNumber);
  createBoard("board-p2", gridNumber);

  ships_number = Math.round(gridTotalSize * 0.2);
  placingBoats(ships_number);
}

var ships_number;
var shipsPlacingNumber;
var isPlacingPhase = true;
var isAttackingPhase = false;

function clicked_water(element) {
  console.log("Row: " + element.getAttribute("row") + "Col: " + element.getAttribute("col"));

  if (isPlacingPhase && shipsPlacingNumber != 0) {
    placingBoats(shipsPlacingNumber - 1);
  }

  if (shipsPlacingNumber === 0) {
    document.getElementById("donep1").style.display = "block";
    document.getElementById("donep2").style.display = "block";
  } else {
    showPlayerInfo(currentPlayer, "Your remaining ships:", shipsPlacingNumber);
  }
}

function donePlacing(btn) {

  if (currentPlayer == 1) {
    document.getElementById("donep1").style.display = "none";
    document.getElementById("donep2").style.display = "none";

    showPlayerSide(2);
    placingBoats(ships_number);
    showPlayerInfo(currentPlayer, "Your remaining ships:", shipsPlacingNumber);
  } else {
    attackingBoats();
  }

}

function placingBoats(stn) {

  if (currentPlayer == 1) {
    showPlayerSide(1);
    showToast(currentPlayer, "PLACE YOUR BOATS");

    shipsPlacingNumber = stn;
    showPlayerInfo(currentPlayer, "Your remaining ships:", shipsPlacingNumber);
  } else {
    showToast(currentPlayer, "PLACE YOUR BOATS");

    shipsPlacingNumber = stn;
    showPlayerInfo(currentPlayer, "Your remaining ships:", shipsPlacingNumber);
  }

}

function attackingBoats() {
  console.log("aaaaaaaaaaaaaaaaa");
};
