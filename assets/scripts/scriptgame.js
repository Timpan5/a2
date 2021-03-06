var sec;
var score;
var pause;
var PAUSE;

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

	document.getElementById("level").innerHTML = "Level " + localStorage.getItem("currentLevel"); 
	
	score = localStorage.getItem("currentScore");
	document.getElementById("score").innerHTML = score; 
     
	sec = 1000;
	document.getElementById("second").innerHTML = sec + " seconds";
	
	pause = 0;
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
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);        
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
            score -= 50; //add score
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
                localStorage.getItem("currentScore") += 5;
            } else if (this.type == 2){
                localStorage.getItem("currentScore") += 10;
            } else if (this.type == 3){
                localStorage.getItem("currentScore") += 15;
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
        if (localStorage.getItem("currentLevel") == 2){
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
