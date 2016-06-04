window.onload = function() {
	
	if (localStorage.getItem("highscore") == null) {
		localStorage.setItem("highscore", "0");
	}

	document.getElementById("highscore").innerHTML = localStorage.getItem("highscore"); 
  
} 


function firstLevel() {
	localStorage.setItem("currentLevel", "1");
	localStorage.setItem("currentScore", "200");
}