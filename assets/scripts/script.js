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

    //create space objects
	ob1 = new space("red", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
    ob2 = new space("blue", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
    ob3 = new space("green", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
    ob4 = new space("purple", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
    ob5 = new space("yellow", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
    ob6 = new space("brown", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
    ob7 = new space("gray", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
    ob8 = new space("white", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
    ob9 = new space("teal", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
    ob10 = new space("orange", Math.floor(Math.random() * 900) + 50, Math.floor(Math.random() * 500) + 50);
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
     

	sec = 80;

	document.getElementById("second").innerHTML = sec + " seconds";
	
	pause = 0;
	document.getElementById("pause").onclick = function() {	
		var img = document.getElementById('pausebutton');
		if (pause) {
			pause = 0;
            GlobalSpeed = 5;
			img.src = "assets/images/pause.png";
			document.getElementById("pauseoverlay").style.display = "none";
		}
		else {
			pause = 1;
            GlobalSpeed = 0;
			img.src = "assets/images/resume.png";
			document.getElementById("pauseoverlay").style.display = "initial";
		}

	};
	
	myGameArea.stop();
    myGameArea.start();
	
}





function timer() {
	
	if (pause == 0) {
		sec -= 1;
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
     

	sec = 80;

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

function space(color, x, y, type) {
    //object for space object
    this.type = type;
    this.width = 50;
    this.height = 50;
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
		
ctx.moveTo(-35+this.x,-134+this.y);
ctx.lineTo(-35+this.x,-134+this.y);
ctx.lineTo(-35+this.x,-135+this.y);
ctx.lineTo(-35+this.x,-136+this.y);
ctx.lineTo(-35+this.x,-137+this.y);
ctx.lineTo(-36+this.x,-137+this.y);
ctx.lineTo(-36+this.x,-138+this.y);
ctx.lineTo(-37+this.x,-138+this.y);
ctx.lineTo(-37+this.x,-139+this.y);
ctx.lineTo(-39+this.x,-142+this.y);
ctx.lineTo(-40+this.x,-142+this.y);
ctx.lineTo(-41+this.x,-142+this.y);
ctx.lineTo(-41+this.x,-143+this.y);
ctx.lineTo(-41+this.x,-144+this.y);
ctx.lineTo(-42+this.x,-144+this.y);
ctx.lineTo(-43+this.x,-144+this.y);
ctx.lineTo(-43+this.x,-145+this.y);
ctx.lineTo(-44+this.x,-145+this.y);
ctx.lineTo(-44+this.x,-146+this.y);
ctx.lineTo(-45+this.x,-146+this.y);
ctx.lineTo(-46+this.x,-146+this.y);
ctx.lineTo(-46+this.x,-147+this.y);
ctx.lineTo(-47+this.x,-147+this.y);
ctx.lineTo(-48+this.x,-147+this.y);
ctx.lineTo(-48+this.x,-148+this.y);
ctx.lineTo(-49+this.x,-148+this.y);
ctx.lineTo(-50+this.x,-148+this.y);
ctx.lineTo(-51+this.x,-148+this.y);
ctx.lineTo(-52+this.x,-148+this.y);
ctx.lineTo(-53+this.x,-148+this.y);
ctx.lineTo(-54+this.x,-148+this.y);
ctx.lineTo(-55+this.x,-148+this.y);
ctx.lineTo(-56+this.x,-148+this.y);
ctx.lineTo(-57+this.x,-148+this.y);
ctx.lineTo(-58+this.x,-148+this.y);
ctx.lineTo(-59+this.x,-148+this.y);
ctx.lineTo(-60+this.x,-148+this.y);
ctx.lineTo(-61+this.x,-148+this.y);
ctx.lineTo(-62+this.x,-148+this.y);
ctx.lineTo(-63+this.x,-148+this.y);
ctx.lineTo(-64+this.x,-148+this.y);
ctx.lineTo(-65+this.x,-148+this.y);
ctx.lineTo(-65+this.x,-147+this.y);
ctx.lineTo(-66+this.x,-147+this.y);
ctx.lineTo(-67+this.x,-147+this.y);
ctx.lineTo(-67+this.x,-146+this.y);
ctx.lineTo(-68+this.x,-146+this.y);
ctx.lineTo(-69+this.x,-146+this.y);
ctx.lineTo(-70+this.x,-145+this.y);
ctx.lineTo(-71+this.x,-144+this.y);
ctx.lineTo(-72+this.x,-144+this.y);
ctx.lineTo(-73+this.x,-144+this.y);
ctx.lineTo(-73+this.x,-143+this.y);
ctx.lineTo(-74+this.x,-143+this.y);
ctx.lineTo(-75+this.x,-143+this.y);
ctx.lineTo(-76+this.x,-143+this.y);
ctx.lineTo(-77+this.x,-143+this.y);
ctx.lineTo(-78+this.x,-143+this.y);
ctx.lineTo(-79+this.x,-142+this.y);
ctx.lineTo(-80+this.x,-142+this.y);
ctx.lineTo(-81+this.x,-142+this.y);
ctx.lineTo(-82+this.x,-142+this.y);
ctx.lineTo(-83+this.x,-141+this.y);
ctx.lineTo(-84+this.x,-141+this.y);
ctx.lineTo(-85+this.x,-141+this.y);
ctx.lineTo(-86+this.x,-141+this.y);
ctx.lineTo(-87+this.x,-141+this.y);
ctx.lineTo(-88+this.x,-141+this.y);
ctx.lineTo(-88+this.x,-140+this.y);
ctx.lineTo(-89+this.x,-139+this.y);
ctx.lineTo(-89+this.x,-138+this.y);
ctx.lineTo(-89+this.x,-137+this.y);
ctx.lineTo(-90+this.x,-137+this.y);
ctx.lineTo(-90+this.x,-136+this.y);
ctx.lineTo(-90+this.x,-135+this.y);
ctx.lineTo(-90+this.x,-134+this.y);
ctx.lineTo(-90+this.x,-133+this.y);
ctx.lineTo(-91+this.x,-133+this.y);
ctx.lineTo(-91+this.x,-132+this.y);
ctx.lineTo(-91+this.x,-131+this.y);
ctx.lineTo(-91+this.x,-130+this.y);
ctx.lineTo(-91+this.x,-129+this.y);
ctx.lineTo(-92+this.x,-129+this.y);
ctx.lineTo(-92+this.x,-128+this.y);
ctx.lineTo(-92+this.x,-127+this.y);
ctx.lineTo(-93+this.x,-127+this.y);
ctx.lineTo(-94+this.x,-127+this.y);
ctx.lineTo(-94+this.x,-126+this.y);
ctx.lineTo(-94+this.x,-125+this.y);
ctx.lineTo(-94+this.x,-124+this.y);
ctx.lineTo(-94+this.x,-123+this.y);
ctx.lineTo(-95+this.x,-123+this.y);
ctx.lineTo(-95+this.x,-122+this.y);
ctx.lineTo(-95+this.x,-121+this.y);
ctx.lineTo(-95+this.x,-120+this.y);
ctx.lineTo(-95+this.x,-119+this.y);
ctx.lineTo(-95+this.x,-118+this.y);
ctx.lineTo(-95+this.x,-117+this.y);
ctx.lineTo(-95+this.x,-115+this.y);
ctx.lineTo(-95+this.x,-114+this.y);
ctx.lineTo(-94+this.x,-114+this.y);
ctx.lineTo(-94+this.x,-113+this.y);
ctx.lineTo(-93+this.x,-112+this.y);
ctx.lineTo(-92+this.x,-112+this.y);
ctx.lineTo(-92+this.x,-111+this.y);
ctx.lineTo(-92+this.x,-110+this.y);
ctx.lineTo(-91+this.x,-109+this.y);
ctx.lineTo(-90+this.x,-109+this.y);
ctx.lineTo(-90+this.x,-108+this.y);
ctx.lineTo(-89+this.x,-108+this.y);
ctx.lineTo(-89+this.x,-107+this.y);
ctx.lineTo(-88+this.x,-107+this.y);
ctx.lineTo(-88+this.x,-106+this.y);
ctx.lineTo(-85+this.x,-103+this.y);
ctx.lineTo(-84+this.x,-103+this.y);
ctx.lineTo(-84+this.x,-102+this.y);
ctx.lineTo(-83+this.x,-102+this.y);
ctx.lineTo(-82+this.x,-102+this.y);
ctx.lineTo(-82+this.x,-101+this.y);
ctx.lineTo(-82+this.x,-100+this.y);
ctx.lineTo(-81+this.x,-100+this.y);
ctx.lineTo(-81+this.x,-99+this.y);
ctx.lineTo(-80+this.x,-99+this.y);
ctx.lineTo(-80+this.x,-98+this.y);
ctx.lineTo(-79+this.x,-98+this.y);
ctx.lineTo(-78+this.x,-98+this.y);
ctx.lineTo(-78+this.x,-97+this.y);
ctx.lineTo(-77+this.x,-97+this.y);
ctx.lineTo(-76+this.x,-97+this.y);
ctx.lineTo(-76+this.x,-96+this.y);
ctx.lineTo(-75+this.x,-96+this.y);
ctx.lineTo(-74+this.x,-96+this.y);
ctx.lineTo(-73+this.x,-96+this.y);
ctx.lineTo(-72+this.x,-96+this.y);
ctx.lineTo(-71+this.x,-96+this.y);
ctx.lineTo(-70+this.x,-96+this.y);
ctx.lineTo(-69+this.x,-96+this.y);
ctx.lineTo(-68+this.x,-96+this.y);
ctx.lineTo(-67+this.x,-96+this.y);
ctx.lineTo(-66+this.x,-96+this.y);
ctx.lineTo(-65+this.x,-96+this.y);
ctx.lineTo(-64+this.x,-96+this.y);
ctx.lineTo(-63+this.x,-96+this.y);
ctx.lineTo(-62+this.x,-96+this.y);
ctx.lineTo(-61+this.x,-96+this.y);
ctx.lineTo(-61+this.x,-97+this.y);
ctx.lineTo(-61+this.x,-98+this.y);
ctx.lineTo(-60+this.x,-98+this.y);
ctx.lineTo(-60+this.x,-99+this.y);
ctx.lineTo(-59+this.x,-99+this.y);
ctx.lineTo(-59+this.x,-100+this.y);
ctx.lineTo(-58+this.x,-100+this.y);
ctx.lineTo(-58+this.x,-101+this.y);
ctx.lineTo(-57+this.x,-101+this.y);
ctx.lineTo(-56+this.x,-101+this.y);
ctx.lineTo(-56+this.x,-102+this.y);
ctx.lineTo(-55+this.x,-102+this.y);
ctx.lineTo(-55+this.x,-103+this.y);
ctx.lineTo(-54+this.x,-103+this.y);
ctx.lineTo(-53+this.x,-103+this.y);
ctx.lineTo(-52+this.x,-104+this.y);
ctx.lineTo(-51+this.x,-104+this.y);
ctx.lineTo(-51+this.x,-105+this.y);
ctx.lineTo(-50+this.x,-105+this.y);
ctx.lineTo(-49+this.x,-105+this.y);
ctx.lineTo(-48+this.x,-105+this.y);
ctx.lineTo(-47+this.x,-105+this.y);
ctx.lineTo(-46+this.x,-105+this.y);
ctx.lineTo(-46+this.x,-106+this.y);
ctx.lineTo(-45+this.x,-106+this.y);
ctx.lineTo(-44+this.x,-106+this.y);
ctx.lineTo(-43+this.x,-106+this.y);
ctx.lineTo(-43+this.x,-107+this.y);
ctx.lineTo(-42+this.x,-107+this.y);
ctx.lineTo(-41+this.x,-107+this.y);
ctx.lineTo(-41+this.x,-108+this.y);
ctx.lineTo(-41+this.x,-109+this.y);
ctx.lineTo(-40+this.x,-109+this.y);
ctx.lineTo(-40+this.x,-110+this.y);
ctx.lineTo(-39+this.x,-110+this.y);
ctx.lineTo(-39+this.x,-111+this.y);
ctx.lineTo(-38+this.x,-111+this.y);
ctx.lineTo(-37+this.x,-111+this.y);
ctx.lineTo(-37+this.x,-112+this.y);
ctx.lineTo(-36+this.x,-112+this.y);
ctx.lineTo(-36+this.x,-113+this.y);
ctx.lineTo(-35+this.x,-113+this.y);
ctx.lineTo(-35+this.x,-114+this.y);
ctx.lineTo(-35+this.x,-115+this.y);
ctx.lineTo(-35+this.x,-116+this.y);
ctx.lineTo(-35+this.x,-117+this.y);
ctx.lineTo(-34+this.x,-117+this.y);
ctx.lineTo(-34+this.x,-118+this.y);
ctx.lineTo(-34+this.x,-119+this.y);
ctx.lineTo(-34+this.x,-120+this.y);
ctx.lineTo(-34+this.x,-121+this.y);
ctx.lineTo(-34+this.x,-122+this.y);
ctx.lineTo(-34+this.x,-123+this.y);
ctx.lineTo(-34+this.x,-124+this.y);
ctx.lineTo(-34+this.x,-125+this.y);
ctx.lineTo(-34+this.x,-126+this.y);
ctx.lineTo(-34+this.x,-127+this.y);
ctx.lineTo(-34+this.x,-128+this.y);
ctx.lineTo(-34+this.x,-129+this.y);
ctx.lineTo(-34+this.x,-130+this.y);
ctx.lineTo(-34+this.x,-131+this.y);
ctx.lineTo(-34+this.x,-132+this.y);
ctx.lineTo(-34+this.x,-133+this.y);
ctx.lineTo(-34+this.x,-134+this.y);
ctx.lineTo(-34+this.x,-135+this.y);
ctx.lineTo(-34+this.x,-136+this.y);
ctx.moveTo(-80+this.x,-130+this.y);
ctx.lineTo(-80+this.x,-130+this.y);
ctx.lineTo(-81+this.x,-129+this.y);
ctx.lineTo(-81+this.x,-128+this.y);
ctx.lineTo(-81+this.x,-127+this.y);
ctx.lineTo(-81+this.x,-126+this.y);
ctx.lineTo(-81+this.x,-125+this.y);
ctx.lineTo(-81+this.x,-124+this.y);
ctx.lineTo(-81+this.x,-123+this.y);
ctx.lineTo(-82+this.x,-123+this.y);
ctx.lineTo(-83+this.x,-122+this.y);
ctx.lineTo(-83+this.x,-121+this.y);
ctx.lineTo(-83+this.x,-120+this.y);
ctx.lineTo(-83+this.x,-119+this.y);
ctx.lineTo(-83+this.x,-118+this.y);
ctx.lineTo(-83+this.x,-117+this.y);
ctx.lineTo(-83+this.x,-116+this.y);
ctx.lineTo(-83+this.x,-115+this.y);
ctx.lineTo(-82+this.x,-114+this.y);
ctx.lineTo(-81+this.x,-114+this.y);
ctx.lineTo(-80+this.x,-114+this.y);
ctx.lineTo(-79+this.x,-114+this.y);
ctx.lineTo(-78+this.x,-114+this.y);
ctx.lineTo(-77+this.x,-114+this.y);
ctx.lineTo(-77+this.x,-115+this.y);
ctx.lineTo(-76+this.x,-115+this.y);
ctx.lineTo(-75+this.x,-115+this.y);
ctx.lineTo(-75+this.x,-116+this.y);
ctx.lineTo(-74+this.x,-116+this.y);
ctx.lineTo(-74+this.x,-117+this.y);
ctx.lineTo(-73+this.x,-117+this.y);
ctx.lineTo(-73+this.x,-118+this.y);
ctx.lineTo(-72+this.x,-119+this.y);
ctx.lineTo(-72+this.x,-120+this.y);
ctx.lineTo(-72+this.x,-121+this.y);
ctx.lineTo(-72+this.x,-122+this.y);
ctx.lineTo(-71+this.x,-122+this.y);
ctx.lineTo(-71+this.x,-123+this.y);
ctx.lineTo(-71+this.x,-124+this.y);
ctx.lineTo(-71+this.x,-125+this.y);
ctx.lineTo(-71+this.x,-126+this.y);
ctx.lineTo(-71+this.x,-127+this.y);
ctx.lineTo(-71+this.x,-128+this.y);
ctx.lineTo(-71+this.x,-129+this.y);
ctx.lineTo(-71+this.x,-130+this.y);
ctx.lineTo(-72+this.x,-130+this.y);
ctx.lineTo(-75+this.x,-130+this.y);
ctx.lineTo(-76+this.x,-130+this.y);
ctx.lineTo(-77+this.x,-130+this.y);
ctx.lineTo(-79+this.x,-130+this.y);
ctx.lineTo(-80+this.x,-130+this.y);
ctx.moveTo(-51+this.x,-119+this.y);
ctx.lineTo(-51+this.x,-119+this.y);
ctx.lineTo(-51+this.x,-120+this.y);
ctx.lineTo(-51+this.x,-121+this.y);
ctx.lineTo(-51+this.x,-122+this.y);
ctx.lineTo(-50+this.x,-122+this.y);
ctx.lineTo(-49+this.x,-122+this.y);
ctx.lineTo(-49+this.x,-123+this.y);
ctx.lineTo(-48+this.x,-123+this.y);
ctx.lineTo(-48+this.x,-124+this.y);
ctx.lineTo(-48+this.x,-125+this.y);
ctx.lineTo(-47+this.x,-125+this.y);
ctx.lineTo(-46+this.x,-125+this.y);
ctx.lineTo(-45+this.x,-125+this.y);
ctx.lineTo(-44+this.x,-125+this.y);
ctx.lineTo(-43+this.x,-125+this.y);
ctx.lineTo(-43+this.x,-124+this.y);
ctx.lineTo(-43+this.x,-123+this.y);
ctx.lineTo(-43+this.x,-122+this.y);
ctx.lineTo(-43+this.x,-121+this.y);
ctx.lineTo(-44+this.x,-121+this.y);
ctx.lineTo(-44+this.x,-120+this.y);
ctx.lineTo(-45+this.x,-120+this.y);
ctx.lineTo(-45+this.x,-119+this.y);
ctx.lineTo(-46+this.x,-119+this.y);
ctx.lineTo(-46+this.x,-118+this.y);
ctx.lineTo(-47+this.x,-118+this.y);
ctx.lineTo(-47+this.x,-117+this.y);
ctx.lineTo(-48+this.x,-117+this.y);
ctx.lineTo(-49+this.x,-117+this.y);
ctx.lineTo(-49+this.x,-118+this.y);
ctx.lineTo(-49+this.x,-119+this.y);
ctx.lineTo(-49+this.x,-120+this.y);
ctx.lineTo(-50+this.x,-120+this.y);















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
        if (this.y < 10 || this.y > 300 || this.x < 10 || this.x > 500) {
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