var currentLevel;
var currentScore;

var sec;
var score;
var pause;

var ob1;
var ob2;
var ob3;
var ob4;
var ob5;
var ob6;
var ob7;
var ob8;
var ob9;
var ob10;
var BH = [];
var count = 0;
var BH1;
var BH2;
var BH3;
var one = false;
var GlobalSpeed;



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
	
	
	document.getElementById("Canvas").style.display = "none";
	
	document.getElementById("pauseoverlay").style.display = "none";
	
	document.getElementById("copyright").style.display = "initial";

	currentLevel = 1;
	currentScore = 200;

    GlobalSpeed = 5;
	document.getElementById("pause").onclick = function() {	
		var img = document.getElementById('pausebutton');
		if (pause) {
			pause = 0;
            GlobalSpeed = 1;
			img.src = "assets/images/pause.png";
		}
		else {
			pause = 1;
            GlobalSpeed = 0;
			img.src = "assets/images/resume.png";
		}

	};
	window.setInterval(timer, 1000);

    //create space objects
	ob1 = new space(30, 30, "red", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
    ob2 = new space(30, 30, "blue", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
    ob3 = new space(30, 30, "green", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
    ob4 = new space(30, 30, "purple", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
    ob5 = new space(30, 30, "yellow", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
    ob6 = new space(30, 30, "brown", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
    ob7 = new space(30, 30, "gray", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
    ob8 = new space(30, 30, "white", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
    ob9 = new space(30, 30, "teal", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
    ob10 = new space(30, 30, "orange", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
    myGameArea.start();

    //click handler
    document.getElementById('Canvas').addEventListener('click',function(event){

        for (i = 0; i < count; i++) { 
                BH[i].clicked(event.clientX, event.clientY);
            }
    },false);

	

}


function firstLevel() {
	
	document.getElementById("gamescreen").style.display = "initial";
	document.getElementById("Canvas").style.display = "initial";
	document.getElementById("titlescreen").style.display = "none";
	document.getElementById("copyright").style.display = "none";
	document.body.style.backgroundPosition = "-9999px"; 
	
	//document.body.style.backgroundImage = "none";
	
	document.getElementById("level").innerHTML = "Level " + currentLevel; 
	
	document.getElementById("score").innerHTML = currentScore; 
     
	sec = 60;
	document.getElementById("second").innerHTML = sec + " seconds";
	
	pause = 0;
	document.getElementById("pause").onclick = function() {	
		var img = document.getElementById('pausebutton');
		if (pause) {
			pause = 0;
			img.src = "assets/images/pause.png";
			document.getElementById("pauseoverlay").style.display = "none";
		}
		else {
			pause = 1;
			img.src = "assets/images/resume.png";
			document.getElementById("pauseoverlay").style.display = "initial";
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
			 myGameArea.stop();
			tran1();
		}
		else if (sec == 0 && currentLevel == 2) {
			localStorage.setItem("currentScore", score);
			 myGameArea.stop();
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
     
	sec = 60;
	document.getElementById("second").innerHTML = sec + " seconds";
	
	pause = 0;
	document.getElementById("pause").onclick = function() {	
		var img = document.getElementById('pausebutton');
		if (pause) {
			pause = 0;
			img.src = "assets/images/pause.png";
			document.getElementById("pauseoverlay").style.display = "none";
		}
		else {
			pause = 1;
			img.src = "assets/images/resume.png";
			document.getElementById("pauseoverlay").style.display = "initial";
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
    //set up canvas
    canvas : document.getElementById("Canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 640;
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

function space(width, height, color, x, y, type) {
    //object for space object
    this.type = type;
    this.width = width;
    this.height = height;
    this.speed = GlobalSpeed;
    this.angle = Math.floor(Math.random() * 360) + 0; //direction
    this.x = x;
    this.y = y;    
    this.colour = color;
    this.dx = 11; //difference in x,y from blackhole
    this.dy = 11;
    this.e = false; //encountered event horizon
    this.own = null; //the blackhole thats pulling
    this.update = function() {
        //draw object
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        //ctx.fillStyle = this.colour;
        //ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);   

		ctx.beginPath();
		
ctx.moveTo(65+x,16+y);
ctx.lineTo(65+x,16+y);
ctx.lineTo(65+x,15+y);
ctx.lineTo(65+x,14+y);
ctx.lineTo(65+x,13+y);
ctx.lineTo(64+x,13+y);
ctx.lineTo(64+x,12+y);
ctx.lineTo(63+x,12+y);
ctx.lineTo(63+x,11+y);
ctx.lineTo(61+x,8+y);
ctx.lineTo(60+x,8+y);
ctx.lineTo(59+x,8+y);
ctx.lineTo(59+x,7+y);
ctx.lineTo(59+x,6+y);
ctx.lineTo(58+x,6+y);
ctx.lineTo(57+x,6+y);
ctx.lineTo(57+x,5+y);
ctx.lineTo(56+x,5+y);
ctx.lineTo(56+x,4+y);
ctx.lineTo(55+x,4+y);
ctx.lineTo(54+x,4+y);
ctx.lineTo(54+x,3+y);
ctx.lineTo(53+x,3+y);
ctx.lineTo(52+x,3+y);
ctx.lineTo(52+x,2+y);
ctx.lineTo(51+x,2+y);
ctx.lineTo(50+x,2+y);
ctx.lineTo(49+x,2+y);
ctx.lineTo(48+x,2+y);
ctx.lineTo(47+x,2+y);
ctx.lineTo(46+x,2+y);
ctx.lineTo(45+x,2+y);
ctx.lineTo(44+x,2+y);
ctx.lineTo(43+x,2+y);
ctx.lineTo(42+x,2+y);
ctx.lineTo(41+x,2+y);
ctx.lineTo(40+x,2+y);
ctx.lineTo(39+x,2+y);
ctx.lineTo(38+x,2+y);
ctx.lineTo(37+x,2+y);
ctx.lineTo(36+x,2+y);
ctx.lineTo(35+x,2+y);
ctx.lineTo(35+x,3+y);
ctx.lineTo(34+x,3+y);
ctx.lineTo(33+x,3+y);
ctx.lineTo(33+x,4+y);
ctx.lineTo(32+x,4+y);
ctx.lineTo(31+x,4+y);
ctx.lineTo(30+x,5+y);
ctx.lineTo(29+x,6+y);
ctx.lineTo(28+x,6+y);
ctx.lineTo(27+x,6+y);
ctx.lineTo(27+x,7+y);
ctx.lineTo(26+x,7+y);
ctx.lineTo(25+x,7+y);
ctx.lineTo(24+x,7+y);
ctx.lineTo(23+x,7+y);
ctx.lineTo(22+x,7+y);
ctx.lineTo(21+x,8+y);
ctx.lineTo(20+x,8+y);
ctx.lineTo(19+x,8+y);
ctx.lineTo(18+x,8+y);
ctx.lineTo(17+x,9+y);
ctx.lineTo(16+x,9+y);
ctx.lineTo(15+x,9+y);
ctx.lineTo(14+x,9+y);
ctx.lineTo(13+x,9+y);
ctx.lineTo(12+x,9+y);
ctx.lineTo(12+x,10+y);
ctx.lineTo(11+x,11+y);
ctx.lineTo(11+x,12+y);
ctx.lineTo(11+x,13+y);
ctx.lineTo(10+x,13+y);
ctx.lineTo(10+x,14+y);
ctx.lineTo(10+x,15+y);
ctx.lineTo(10+x,16+y);
ctx.lineTo(10+x,17+y);
ctx.lineTo(9+x,17+y);
ctx.lineTo(9+x,18+y);
ctx.lineTo(9+x,19+y);
ctx.lineTo(9+x,20+y);
ctx.lineTo(9+x,21+y);
ctx.lineTo(8+x,21+y);
ctx.lineTo(8+x,22+y);
ctx.lineTo(8+x,23+y);
ctx.lineTo(7+x,23+y);
ctx.lineTo(6+x,23+y);
ctx.lineTo(6+x,24+y);
ctx.lineTo(6+x,25+y);
ctx.lineTo(6+x,26+y);
ctx.lineTo(6+x,27+y);
ctx.lineTo(5+x,27+y);
ctx.lineTo(5+x,28+y);
ctx.lineTo(5+x,29+y);
ctx.lineTo(5+x,30+y);
ctx.lineTo(5+x,31+y);
ctx.lineTo(5+x,32+y);
ctx.lineTo(5+x,33+y);
ctx.lineTo(5+x,35+y);
ctx.lineTo(5+x,36+y);
ctx.lineTo(6+x,36+y);
ctx.lineTo(6+x,37+y);
ctx.lineTo(7+x,38+y);
ctx.lineTo(8+x,38+y);
ctx.lineTo(8+x,39+y);
ctx.lineTo(8+x,40+y);
ctx.lineTo(9+x,41+y);
ctx.lineTo(10+x,41+y);
ctx.lineTo(10+x,42+y);
ctx.lineTo(11+x,42+y);
ctx.lineTo(11+x,43+y);
ctx.lineTo(12+x,43+y);
ctx.lineTo(12+x,44+y);
ctx.lineTo(15+x,47+y);
ctx.lineTo(16+x,47+y);
ctx.lineTo(16+x,48+y);
ctx.lineTo(17+x,48+y);
ctx.lineTo(18+x,48+y);
ctx.lineTo(18+x,49+y);
ctx.lineTo(18+x,50+y);
ctx.lineTo(19+x,50+y);
ctx.lineTo(19+x,51+y);
ctx.lineTo(20+x,51+y);
ctx.lineTo(20+x,52+y);
ctx.lineTo(21+x,52+y);
ctx.lineTo(22+x,52+y);
ctx.lineTo(22+x,53+y);
ctx.lineTo(23+x,53+y);
ctx.lineTo(24+x,53+y);
ctx.lineTo(24+x,54+y);
ctx.lineTo(25+x,54+y);
ctx.lineTo(26+x,54+y);
ctx.lineTo(27+x,54+y);
ctx.lineTo(28+x,54+y);
ctx.lineTo(29+x,54+y);
ctx.lineTo(30+x,54+y);
ctx.lineTo(31+x,54+y);
ctx.lineTo(32+x,54+y);
ctx.lineTo(33+x,54+y);
ctx.lineTo(34+x,54+y);
ctx.lineTo(35+x,54+y);
ctx.lineTo(36+x,54+y);
ctx.lineTo(37+x,54+y);
ctx.lineTo(38+x,54+y);
ctx.lineTo(39+x,54+y);
ctx.lineTo(39+x,53+y);
ctx.lineTo(39+x,52+y);
ctx.lineTo(40+x,52+y);
ctx.lineTo(40+x,51+y);
ctx.lineTo(41+x,51+y);
ctx.lineTo(41+x,50+y);
ctx.lineTo(42+x,50+y);
ctx.lineTo(42+x,49+y);
ctx.lineTo(43+x,49+y);
ctx.lineTo(44+x,49+y);
ctx.lineTo(44+x,48+y);
ctx.lineTo(45+x,48+y);
ctx.lineTo(45+x,47+y);
ctx.lineTo(46+x,47+y);
ctx.lineTo(47+x,47+y);
ctx.lineTo(48+x,46+y);
ctx.lineTo(49+x,46+y);
ctx.lineTo(49+x,45+y);
ctx.lineTo(50+x,45+y);
ctx.lineTo(51+x,45+y);
ctx.lineTo(52+x,45+y);
ctx.lineTo(53+x,45+y);
ctx.lineTo(54+x,45+y);
ctx.lineTo(54+x,44+y);
ctx.lineTo(55+x,44+y);
ctx.lineTo(56+x,44+y);
ctx.lineTo(57+x,44+y);
ctx.lineTo(57+x,43+y);
ctx.lineTo(58+x,43+y);
ctx.lineTo(59+x,43+y);
ctx.lineTo(59+x,42+y);
ctx.lineTo(59+x,41+y);
ctx.lineTo(60+x,41+y);
ctx.lineTo(60+x,40+y);
ctx.lineTo(61+x,40+y);
ctx.lineTo(61+x,39+y);
ctx.lineTo(62+x,39+y);
ctx.lineTo(63+x,39+y);
ctx.lineTo(63+x,38+y);
ctx.lineTo(64+x,38+y);
ctx.lineTo(64+x,37+y);
ctx.lineTo(65+x,37+y);
ctx.lineTo(65+x,36+y);
ctx.lineTo(65+x,35+y);
ctx.lineTo(65+x,34+y);
ctx.lineTo(65+x,33+y);
ctx.lineTo(66+x,33+y);
ctx.lineTo(66+x,32+y);
ctx.lineTo(66+x,31+y);
ctx.lineTo(66+x,30+y);
ctx.lineTo(66+x,29+y);
ctx.lineTo(66+x,28+y);
ctx.lineTo(66+x,27+y);
ctx.lineTo(66+x,26+y);
ctx.lineTo(66+x,25+y);
ctx.lineTo(66+x,24+y);
ctx.lineTo(66+x,23+y);
ctx.lineTo(66+x,22+y);
ctx.lineTo(66+x,21+y);
ctx.lineTo(66+x,20+y);
ctx.lineTo(66+x,19+y);
ctx.lineTo(66+x,18+y);
ctx.lineTo(66+x,17+y);
ctx.lineTo(66+x,16+y);
ctx.lineTo(66+x,15+y);
ctx.lineTo(66+x,14+y);
ctx.moveTo(20+x,20+y);
ctx.lineTo(20+x,20+y);
ctx.lineTo(19+x,21+y);
ctx.lineTo(19+x,22+y);
ctx.lineTo(19+x,23+y);
ctx.lineTo(19+x,24+y);
ctx.lineTo(19+x,25+y);
ctx.lineTo(19+x,26+y);
ctx.lineTo(19+x,27+y);
ctx.lineTo(18+x,27+y);
ctx.lineTo(17+x,28+y);
ctx.lineTo(17+x,29+y);
ctx.lineTo(17+x,30+y);
ctx.lineTo(17+x,31+y);
ctx.lineTo(17+x,32+y);
ctx.lineTo(17+x,33+y);
ctx.lineTo(17+x,34+y);
ctx.lineTo(17+x,35+y);
ctx.lineTo(18+x,36+y);
ctx.lineTo(19+x,36+y);
ctx.lineTo(20+x,36+y);
ctx.lineTo(21+x,36+y);
ctx.lineTo(22+x,36+y);
ctx.lineTo(23+x,36+y);
ctx.lineTo(23+x,35+y);
ctx.lineTo(24+x,35+y);
ctx.lineTo(25+x,35+y);
ctx.lineTo(25+x,34+y);
ctx.lineTo(26+x,34+y);
ctx.lineTo(26+x,33+y);
ctx.lineTo(27+x,33+y);
ctx.lineTo(27+x,32+y);
ctx.lineTo(28+x,31+y);
ctx.lineTo(28+x,30+y);
ctx.lineTo(28+x,29+y);
ctx.lineTo(28+x,28+y);
ctx.lineTo(29+x,28+y);
ctx.lineTo(29+x,27+y);
ctx.lineTo(29+x,26+y);
ctx.lineTo(29+x,25+y);
ctx.lineTo(29+x,24+y);
ctx.lineTo(29+x,23+y);
ctx.lineTo(29+x,22+y);
ctx.lineTo(29+x,21+y);
ctx.lineTo(29+x,20+y);
ctx.lineTo(28+x,20+y);
ctx.lineTo(25+x,20+y);
ctx.lineTo(24+x,20+y);
ctx.lineTo(23+x,20+y);
ctx.lineTo(21+x,20+y);
ctx.lineTo(20+x,20+y);
ctx.moveTo(49+x,31+y);
ctx.lineTo(49+x,31+y);
ctx.lineTo(49+x,30+y);
ctx.lineTo(49+x,29+y);
ctx.lineTo(49+x,28+y);
ctx.lineTo(50+x,28+y);
ctx.lineTo(51+x,28+y);
ctx.lineTo(51+x,27+y);
ctx.lineTo(52+x,27+y);
ctx.lineTo(52+x,26+y);
ctx.lineTo(52+x,25+y);
ctx.lineTo(53+x,25+y);
ctx.lineTo(54+x,25+y);
ctx.lineTo(55+x,25+y);
ctx.lineTo(56+x,25+y);
ctx.lineTo(57+x,25+y);
ctx.lineTo(57+x,26+y);
ctx.lineTo(57+x,27+y);
ctx.lineTo(57+x,28+y);
ctx.lineTo(57+x,29+y);
ctx.lineTo(56+x,29+y);
ctx.lineTo(56+x,30+y);
ctx.lineTo(55+x,30+y);
ctx.lineTo(55+x,31+y);
ctx.lineTo(54+x,31+y);
ctx.lineTo(54+x,32+y);
ctx.lineTo(53+x,32+y);
ctx.lineTo(53+x,33+y);
ctx.lineTo(52+x,33+y);
ctx.lineTo(51+x,33+y);
ctx.lineTo(51+x,32+y);
ctx.lineTo(51+x,31+y);
ctx.lineTo(51+x,30+y);
ctx.lineTo(50+x,30+y);

		ctx.closePath();
		ctx.lineWidth = 3;
		ctx.fillStyle = 'gray';
		ctx.fill();
		ctx.strokeStyle = 'black';
		ctx.stroke();

		
        ctx.restore();   
    }
    //calculate next position
    this.newPos = function() {
        this.speed = GlobalSpeed;
        for (i = 0; i < count; i++) { 
            if (eventH(this, BH[i]) == true) {
                this.e = true;
                this.own = BH[i];
            } else {
                
            }
        } 
        //bounce back from walls
        if (this.y < 10 || this.y > 600 || this.x < 10 || this.x > 970) {
            this.angle = this.angle + 180;
        }  
        //if engaged in horizon, move towards black hole
        if (this.e == true){
            this.dx = this.own.x + 25 - this.x;
            this.dy = this.own.y + 25 - this.y;
            this.angle = Math.atan2(this.dx, this.dy) * 180/Math.PI;
            if (GlobalSpeed == 0){ //if paused, stop movement
                this.speed = 0;
            } else  {
                this.speed = 0.5 * this.own.type;
            }
            if(this.own.x == -100){ //disengage event horizon if blackhole dissapears
                this.e = false;
            }
            this.x += this.speed * Math.sin(this.angle); //calculate new position using position and speed
            this.y += this.speed * Math.cos(this.angle);

        } else {
            
            this.x += this.speed * Math.sin(this.angle);
            this.y += this.speed * Math.cos(this.angle);
        }

        if (Math.abs(this.dx) <= 10 && Math.abs(this.dy) <= 10 && eventH(this, this.own) == true){
            //when eaten by black hole, 
            this.x = -1000; //remove object
            this.speed = 0; //stop object movement
            this.own.eat += 1; //add a counter to blackhole
            currentScore -= 50; //add score
        }
    }
}

function hole(x, y, type) {
    //blackhole object
    this.width = 50;
    this.height = 50;
    this.x = x;
    this.y = y; 
    this.eat = 0; //counter for blackhole for when its eaten its max objects then dissapears
    this.type = type; //Type of blackhole, fast , slow etc.
    //draw blackhole
    this.update = function() {
        if (this.eat == 3){
            this.x = -100;
        }
        ctx = myGameArea.context;
        if (this.type == 1){
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
        } else if (this.type == 2){
            ctx.fillStyle = 'rgba(100,0,0,0.7)';
        } else if (this.type == 3){
            ctx.fillStyle = 'rgba(100,100,0,0.7)';
        }
        ctx.fillRect(this.x - 25, this.y - 25, this.width + 50, this.height + 50);   
        ctx.fillStyle = 'rgba(225,225,225,0.7)';
        ctx.fillRect(this.x, this.y, this.width, this.height);      
    } 
    //see if blackhole is clicked
    this.clicked = function(mousex, mousey) {
        this.myleft = this.x + 10;
        this.myright = this.x + (this.width) + 10;
        this.mytop = this.y + 10;
        this.mybottom = this.y + (this.height) + 10;
        this.mX = mousex;
        this.mY = mousey;
        if ((this.mY < this.mybottom) && (this.mY > this.mytop) //check location of click falls within black hole
         && (this.mX > this.myleft) && (this.mX < this.myright) 
        ){
            this.x = -100;//remove black hole
            //differing black holes
            if (this.type == 1){
            	currentScore += 5;
            } else if (this.type == 2){
            	currentScore += 10;
            } else if (this.type == 3){
            	currentScore += 15;
            }
        }
    }
}

function eventH (a, b){
    //calculate whether 2 objects are in contact
    var aleft = a.x;
    var atop = a.y;
    var bleft = b.x - 40;
    var bright = b.x + 90;
    var btop = b.y - 40;
    var bbottom = b.y + 90;
    var crash = false;
    if (aleft > bleft && atop > btop && aleft < bright && atop < bbottom){
        crash = true;
    }
    return crash;
}

function gen(){
    //generate black holes every 5 seconds
    if (sec%5 == 0 && one == false){
        BH[count] = new hole(Math.floor(Math.random() * 900), Math.floor(Math.random() * 500), Btype());
        count += 1;
        if (currentLevel == 2){
            BH[count] = new hole(Math.floor(Math.random() * 900), Math.floor(Math.random() * 500), Btype());
        }
        one = true;
    } else if (sec%5 != 0){
        one = false;
    }
}

function Btype(){
    //random generator for blackhole type
    this.rand = Math.floor(Math.random() * 100);
    if (this.rand < 11){
        return 3;
    } else if (this.rand < 40) {
        return 2;
    } else{
        return 1;
    }
}

function updateGameArea() {
    //update each frame
    myGameArea.clear();
    gen();
    for (i = 0; i < count; i++) { 
        BH[i].update();
    } 
    ob1.newPos();
    ob2.newPos();
    ob3.newPos();
    ob4.newPos();
    ob5.newPos();
    ob6.newPos();
    ob7.newPos();
    ob8.newPos();
    ob9.newPos();
    ob10.newPos();
    ob1.update();
    ob2.update();
    ob3.update();
    ob4.update();
    ob5.update();
    ob6.update();
    ob7.update();
    ob8.update();
    ob9.update();
    ob10.update();

    
}