const Up    = 38;
const Left  = 37;
const Right = 39;
const Down  = 40;
const Space = 32;
var me;
var keycode;

function tankMe(beginX,beginY,direction,life,theimgU,theimgD,theimgL,theimgR){
	this.imgU      = theimgU;
	this.imgD      = theimgD;
	this.imgL      = theimgL;
	this.imgR      = theimgR;
	this.beginX    = beginX;
	this.beginY    = beginY;
	this.X         = beginX;
	this.Y         = beginY;
	this.exX       = 0;
	this.exY       = 0;
	this.direction = direction; 
	this.score     = 0;
	this.life      = life;

	this.getImg = function(){
		switch(this.direction){
			case Up   :return this.imgU;
			case Down :return this.imgD;
			case Left :return this.imgL;
			case Right:return this.imgR;
		}
	} 

	this.getY = function(){
		return this.Y;
	} 

	this.getX = function(){
		return this.X;
	} 

	this.keyChoice = function(key) {
		switch(key){
			case Left  : this.moveLeft();break;
			case Up    : this.moveUp();break;
			case Right : this.moveRight();break;
			case Down  : this.moveDown();break;
			case Space : this.fire();break;
		}
	}

	this.moveLeft = function(){
		if(this.X > 0 && this.direction ==Left) {
			this.exX  = 25;
			this.X   -= 25;
		}
		else{
			this.direction = Left;
			this.exX       = 0;
		}
		
	}

	this.moveUp = function(){
		if(this.Y > 0  && this.direction == Up) {
			this.exY = 25;
			this.Y   -= 25;
		}
		else{
			this.direction = Up;
			this.exY = 0;
		}
		
	}

	this.moveRight = function(){
		if(this.X < 600  && this.direction == Right) {
			this.exX = -25;
			this.X   += 25;
		}
		else{
			this.direction = Right;
			this.exX       = 0;
		}
	}

	this.moveDown = function(){
		if(this.Y < 600  && this.direction == Down) {
			this.exY = -25;
			this.Y   += 25;
		}
		else{
			this.direction = Down;
			this.exY = 0;
		}
		
	}

	this.fire = function(){

	}
}

function control(){
	var imgU = new Image();
	var imgD = new Image();
	var imgL = new Image();
	var imgR = new Image();
	imgU.src = '../static/img/meU.gif';
	imgD.src = '../static/img/meD.gif';
	imgL.src = '../static/img/meL.gif';
	imgR.src = '../static/img/meR.gif';
	me = initTankMe();
	draw(me);
	move(me);


	
}

function draw(me){
		var canvas = document.getElementById("main").getContext("2d");
		if(me.exX) {
			for(var i = 0;i<10;++i){
				setTimeout(function(){
					canvas.clearRect(me.exX+me.X,me.Y,50,50);
					if(me.exX>0) me.exX -=2.5;
					else me.exX +=2.5
					canvas.drawImage(me.getImg(),me.X+me.exX,me.Y,50,50);
				},100);
			}
		}else if(me.exY){
			for(var i = 0;i<10;++i){
				setTimeout(function(){
					canvas.clearRect(me.X,me.Y+me.exY,50,50);
					if(me.exY>0) me.exY -=2.5;
					else me.exY +=2.5
					canvas.drawImage(me.getImg(),me.X,me.Y+me.exY,50,50);
				},100);
			}
		}else{
			canvas.drawImage(me.getImg(),me.X,me.Y,50,50);
		}
		//canvas.clearRect(me.exX+me.X,me.Y,50,50);
		//canvas.drawImage(me.getImg(),me.X,me.Y,50,50);
}

function initTankMe(){
	var imgU = new Image();
	var imgD = new Image();
	var imgL = new Image();
	var imgR = new Image();
	imgU.src = '../static/img/meU.gif';
	imgD.src = '../static/img/meD.gif';
	imgL.src = '../static/img/meL.gif';
	imgR.src = '../static/img/meR.gif';

	return new tankMe(200,600,Up,100,imgU,imgD,imgL,imgR);
}

function move(me){
	var key = Up;
	key = listenKey ();
	
	if(key == Up||key == Down||key == Right||key ==Left){
		me.keyChoice(key);
		draw(me);
	}
	setTimeout("move(me)",100);
}


function getKey(e){ 
	//e = e || event; 
	keycode = e.which;

} 

// 把keyup事件绑定到document中 
function listenKey () { 
	keycode = 0
	if (document.addEventListener) { 
		document.addEventListener("keyup",getKey,false); 
		} 
	else if (document.attachEvent) { 
			document.attachEvent("onkeyup",getKey); 
		} 

	if(!(keycode == Up||keycode == Down||keycode == Right||keycode ==Left)){
		keycode = 0;
	}
	return keycode;
} 