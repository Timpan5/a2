var sec;
var score;
var pause;

var test;
var test2;
var test3;
var BH;
window.onload = function() {

	document.getElementById("level").innerHTML = "Level " + localStorage.getItem("currentLevel"); 
	
	score = localStorage.getItem("currentScore");
	document.getElementById("score").innerHTML = score; 
     
	sec = 999;
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
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    this.colour = color;
    this.dx = 0;
    this.dy = 0;
    this.e = false;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);        
        ctx.restore();   
        

    }
    this.newPos = function() {
        if (this.y < 10 || this.y > 260 || this.x < 10 || this.x > 470) {
            this.angle = this.angle + 180;
        }  
        
        if (eventH(this, BH) == true) {
            this.e = true;
        }
        if (this.e == true){
            this.dx = BH.x - this.x;
            this.dy = BH.y - this.y;
            this.angle = Math.atan2(this.dx, this.dy) * 180/Math.PI;
            this.speed = 0.5;
            this.x += this.speed * Math.sin(this.angle);
            this.y += this.speed * Math.cos(this.angle);

        } else {
            this.speed = 5;
            this.x += this.speed * Math.sin(this.angle);
            this.y += this.speed * Math.cos(this.angle);
        }

        if (this.x == BH.x){
                this.colour = "black";
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
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(this.x - 25, this.y - 25, this.width + 50, this.height + 50);   
        ctx.fillStyle = 'rgba(225,225,225,0.7)';
        ctx.fillRect(this.x, this.y, this.width, this.height);      
    } 
}

function eventH (a, b){
    var aleft = a.x;
    var atop = a.y;
    var bleft = b.x - 45;
    var bright = b.x + 90;
    var btop = b.y - 45;
    var bbottom = b.y + 90;
    var crash = false;
    if (aleft > bleft && atop > btop && aleft < bright && atop < bbottom){
        crash = true;
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
