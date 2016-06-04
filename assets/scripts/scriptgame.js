var sec;
var score;
var pause;

window.onload = function() {

	document.getElementById("level").innerHTML = "Level " + localStorage.getItem("currentLevel"); 
	
	score = localStorage.getItem("currentScore");
	document.getElementById("score").innerHTML = score; 
     
	sec = 5;
	document.getElementById("second").innerHTML = sec + " seconds";
	
	pause = 0;
	document.getElementById("pause").onclick = function() {	
		if (pause) {
			pause = 0;
		}
		else {
			pause = 1;
		}

	};
	
	window.setInterval(timer, 1000);
	
} 



function timer() {
	
	if (pause == 0) {
		sec = sec - 1;
		document.getElementById("second").innerHTML = sec + " seconds";
	
		if (sec == 0 && localStorage.getItem("currentLevel") == 1) {
			localStorage.setItem("currentLevel", "2");
			localStorage.setItem("currentScore", score);
			window.location.href = "transition.html";
		}
		else if (sec == 0) {
			localStorage.setItem("currentScore", score);
			window.location.href = "finish.html";
		}
	}
	
}
