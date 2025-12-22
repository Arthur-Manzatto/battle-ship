function showScreen(screenId) { //Function that shows the different game screens

  document.querySelectorAll(".screen").forEach(screen => { //Here it selects ALL the sections and remove the class ACTIVE(display flex)
    screen.classList.remove("active");
  });

  document.getElementById(screenId).classList.add("active"); //At the end, it enables (Adding the class active) the screen that you've sent as parameter :)
}

function showPlayerSide(player) {
  if (player == 1) {
    document.getElementById("p1S").style.display = "flex";
    document.getElementById("p2S").style.display = "none";
  } else {
    document.getElementById("p1S").style.display = "none";
    document.getElementById("p2S").style.display = "flex";
  }
}


function start() {
  showScreen('gameScreen');

  const gridp1 = document.getElementById("grid-p1");
  const gridp2 = document.getElementById("grid-p2");

  const gridNumber = Number(document.getElementById("gridSize").value);
  const gridTotalSize = gridNumber * gridNumber;

  gridp1.innerHTML = "";
  gridp2.innerHTML = "";

  gridp1.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`;
  gridp2.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`;

  for (let i = 0; i < gridTotalSize; i++) {
    const water1 = document.createElement("div");
    water1.classList.add("water");

    const water2 = document.createElement("div");
    water2.classList.add("water");

    gridp1.appendChild(water1);
    gridp2.appendChild(water2);
  }
}