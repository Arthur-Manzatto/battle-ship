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
