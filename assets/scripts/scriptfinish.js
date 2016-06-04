window.onload = function() {

	document.getElementById("currentscore").innerHTML = localStorage.getItem("currentScore"); 
	
	if (localStorage.getItem("highscore") < localStorage.getItem("currentScore")) {
		localStorage.setItem("highscore", localStorage.getItem("currentScore"));
	}
	
} 