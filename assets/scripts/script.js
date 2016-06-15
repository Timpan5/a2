var currentLevel;
var currentScore;

var sec;
var score;
var pause;

var test;
var test2;
var test3;
var BH;


window.onload = function() {
	
	window.setInterval(timer, 1000);
	init();

  
} 

function init() {
	if (localStorage.getItem("highscore") == null) {
		localStorage.setItem("highscore", "0");
	}

	
	document.getElementById("highscore").innerHTML = localStorage.getItem("highscore"); 
	
	document.getElementById("titlescreen").style.display = "initial";
	document.body.style.backgroundPosition = "initial";
	
	document.getElementById("gamescreen").style.display = "none";
	document.getElementById("transition1").style.display = "none";
	document.getElementById("transition2").style.display = "none";
	
	currentLevel = 1;
	currentScore = 200;
	
	document.getElementById("Canvas").style.display = "none";

	

}


function firstLevel() {
	
	document.getElementById("gamescreen").style.display = "initial";
	document.getElementById("Canvas").style.display = "initial";
	document.getElementById("titlescreen").style.display = "none";
	document.body.style.backgroundPosition = "-9999px"; 
	//document.body.style.backgroundImage = "none";
	
	document.getElementById("level").innerHTML = "Level " + currentLevel; 
	
	document.getElementById("score").innerHTML = currentScore; 
     
	sec = 3;
	document.getElementById("second").innerHTML = sec + " seconds";
	
	pause = 0;
	document.getElementById("pause").onclick = function() {	
		var img = document.getElementById('pausebutton');
		if (pause) {
			pause = 0;
			img.src = "assets/images/pause.png";
		}
		else {
			pause = 1;
			img.src = "assets/images/resume.png";
		}

	};
	


	test = new component(30, 30, "red", Math.floor(Math.random() * 350) + 50, Math.floor(Math.random() * 200) + 50);
    test2 = new component(30, 30, "blue", Math.floor(Math.random() * 350) + 50, Math.floor(Math.random() * 200) + 50);
    test3 = new component(30, 30, "green", Math.floor(Math.random() * 350) + 50, Math.floor(Math.random() * 200) + 50);
    BH = new hole(200, 100);
    myGameArea.start();
	
}





function timer() {
	
	if (pause == 0) {
		sec = sec - 1;
		document.getElementById("second").innerHTML = sec + " seconds";
	
		if (sec == 0 && currentLevel == 1) {
			currentLevel = 2;
			localStorage.setItem("currentScore", score);
			tran1();
		}
		else if (sec == 0 && currentLevel == 2) {
			localStorage.setItem("currentScore", score);
			tran2();
		}
	}

	
}

function tran1() {
	document.getElementById("gamescreen").style.display = "none";
	
	//document.getElementById("Canvas").style.display = "none";
	//document.getElementById("Canvas").style.width = "1px";
	//document.getElementById("Canvas").style.height = "1px";
	myGameArea.clear();
	
	document.getElementById("transition1").style.display = "initial";

	document.getElementById("currentscore").innerHTML = currentScore; 

}

function secondLevel() {
	document.getElementById("transition1").style.display = "none";
	
	document.getElementById("gamescreen").style.display = "initial";
	
	document.getElementById("Canvas").style.display = "initial";
	
	currentLevel = 2;
	
	document.getElementById("level").innerHTML = "Level " + currentLevel; 
	
	document.getElementById("score").innerHTML = currentScore; 
     
	sec = 3;
	document.getElementById("second").innerHTML = sec + " seconds";
	
	pause = 0;
	document.getElementById("pause").onclick = function() {	
		var img = document.getElementById('pausebutton');
		if (pause) {
			pause = 0;
			img.src = "assets/images/pause.png";
		}
		else {
			pause = 1;
			img.src = "assets/images/resume.png";
		}

	};
	
	myGameArea.start();
}

function tran2() {
	document.getElementById("gamescreen").style.display = "none";
	//document.getElementById("Canvas").style.width = "1px";
	//document.getElementById("Canvas").style.height = "1px";
	myGameArea.clear();
	
	document.getElementById("transition2").style.display = "initial";
	
	document.getElementById("finalscore").innerHTML = currentScore; 
	
	if (localStorage.getItem("highscore") < currentScore)
		localStorage.setItem("highscore", currentScore);
}


var myGameArea = {
    canvas : document.getElementById("Canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(1, 1, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {

    this.type = type;
    this.width = width;
    this.height = height;
    this.speed = 5;
    this.angle = Math.floor(Math.random() * 360) + 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);        
        ctx.restore();   
        

    }
    this.newPos = function() {
        if (this.y < 10 || this.y > 260 || this.x < 10 || this.x > 470) {
            this.angle = this.angle + 180;
        }  
        this.x += this.speed * Math.sin(this.angle);
        this.y += this.speed * Math.cos(this.angle);
        if (eventH(test, BH) == false) {
            test.speed = 0;
        }
    }
}

function hole(x, y) {

    this.width = 50;
    this.height = 50;
    this.EH = 100;
    this.x = x;
    this.y = y; 
    this.update = function() {
        ctx = myGameArea.context;
        
        ctx.fillStyle = "gray";
        ctx.fillRect(this.x - 25, this.y - 25, this.width + 50, this.height + 50);   
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);      
    } 
}

function eventH (a, b){
    var aleft = a.x;
    var aright = a.x + (a.width);
    var atop = a.y;
    var abottom = a.y + (a.height);
    var bleft = 100;
    var bright = b.x + (b.width);
    var btop = b.y;
    var bbottom = b.y + (b.height);
    var crash = true;
    if (aleft < bright && atop < bbottom && aright > bleft && abottom > btop) {
        crash = false;
    }
    return crash;
}

function updateGameArea() {
    myGameArea.clear();
    
    test.newPos();
    test2.newPos();
    test3.newPos();
    test.update();
    test2.update();
    test3.update();
    BH.update();
}