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

function start() {
  showScreen('gameScreen');

  const gridp1 = document.getElementById("grid-p1");
  const gridp2 = document.getElementById("grid-p2");

  const gridNumber = Number(document.getElementById("gridSize").value);
  const gridTotalSize = gridNumber * gridNumber;

  gridp1.innerHTML = "";
  gridp2.innerHTML = "";

  gridp1.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`; // Here I set the size (Y x Y) of the grid
  gridp2.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`;

  for (let i = 0; i < gridTotalSize; i++) { //This loop creates the "water" blocks
    const water1 = document.createElement("div");
    water1.classList.add("water");

    const water2 = document.createElement("div");
    water2.classList.add("water");

    gridp1.appendChild(water1); //Here I'm adding the water div to the grid element 
    gridp2.appendChild(water2);
  }

  const ships_number = Math.round(gridTotalSize * 0.2);
  placingBoats(ships_number);
}

function placingBoats(stn) {
  showPlayerSide(1);
  showToast(1, "PLACE YOUR BOATS");
  console.log(stn);

  let shipsTotalNumber = stn;
  showPlayerInfo(1, "Your remaining ships:", shipsTotalNumber);
}
