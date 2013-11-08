const Up    = 38;
const Left  = 37;
const Right = 39;
const Down  = 40;
const Space = 32;
const noDir = 0;
var me;
var enemy;
var keycode = noDir;

//0:nothing 1:me  2:enemy 
var map = new Array(65);
$(document).ready(function(){
	$(document).keydown(function(){
		var e=e||event;
		keycode=e.keyCode||e.which||e.charCode;
	});
	
});


function tankMe(beginX,beginY,direction,life,theimgU,theimgD,theimgL,theimgR,theimgB){
	this.imgU      = theimgU;
	this.imgD      = theimgD;
	this.imgL      = theimgL;
	this.imgR      = theimgR;
	this.speed     = 1;
	this.beginX    = beginX;
	this.beginY    = beginY;
	this.X         = beginX;
	this.Y         = beginY;
	this.exX       = 0;
	this.exY       = 0;
	this.direction = direction; 
	this.dirJudge  = 0;
	this.score     = 0;
	this.life      = life;
	this.bullet    = new bullet(this.X,this.Y,this.direction,theimgB,this);

	this.getImg = function(){
		switch(this.direction){
			case Up   :return this.imgU;
			case Down :return this.imgD;
			case Left :return this.imgL;
			case Right:return this.imgR;
		}
	} 

	this.keyChoice = function(key) {
		switch(key){
			case Left  : this.moveLeft();break;
			case Up    : this.moveUp();break;
			case Right : this.moveRight();break;
			case Down  : this.moveDown();break;
			case Space : if(!this.bullet.fired) this.fire();break;
		}
		
	}

	this.moveLeft = function(){
		if(this.X>0&&this.judge(Left)) {
			this.writeMap(0);
			this.X       -= this.speed;
			this.dirJudge =  0;
			this.writeMap(1);
		}
		else{
			if(this.direction != Left){
				this.dirJudge =  1;
			}
			this.direction = Left;
		}
		
	}

	this.moveUp = function(){
		if(this.Y>0&&this.judge(Up)) {
			this.writeMap(0);
			this.Y       -= this.speed;
			this.dirJudge =  0;
			this.writeMap(1);
		}
		else{
			if(this.direction != Up){
				this.dirJudge =  1;
			}
			this.direction = Up;
		}
		
	}

	this.moveRight = function(){
		if(this.X<60&&this.judge(Right)) {
			this.writeMap(0);
			this.X       += this.speed;
			this.dirJudge =  0;
			this.writeMap(1);
		}
		else{
			if(this.direction != Right){
				this.dirJudge =  1;
			}
			this.direction = Right;
		}
	}

	this.moveDown = function(){
		if(this.Y<60&&this.judge(Down)) {
			this.writeMap(0);
			this.Y += this.speed;
			this.dirJudge =  0;
			this.writeMap(1);
		}
		else{
			if(this.direction != Down){
				this.dirJudge =  1;
			}
			this.direction = Down;
		}
	}

	this.judge = function(direction){
		if (this.direction != direction) {
			return 0;
		}else{
			var judgeX = this.X;
			var judgeY = this.Y;
			switch(direction){
				case Up   : if(this.Y>= 4) 	judgeY -= 1;
							if((map[judgeX][judgeY] != 0)
								&&(map[judgeX][judgeY] != 1)
								&&(map[judgeX+5][judgeY] != 0)
								&&(map[judgeX+5][judgeY] != 1)) {
									return 0;
								}
							break;

				case Down : if(this.Y<=54) 	judgeY += 1;
							if((map[judgeX][judgeY] != 0)
								&&(map[judgeX][judgeY] != 1)
								&&(map[judgeX+5][judgeY] != 0)
								&&(map[judgeX+5][judgeY] != 1)) {
									return 0;
								}
							break;

				case Left :if(this.X>=4)  	judgeX -= 1;
							if((map[judgeX][judgeY] != 0)
								&&(map[judgeX][judgeY] != 1)
								&&(map[judgeX][judgeY+5] != 0)
								&&(map[judgeX][judgeY+5] != 1)) {
									return 0;
								}	
							break;

				case Right:if(this.X<=54) 	judgeX += 1;
							if((map[judgeX][judgeY] != 0)
								&&(map[judgeX][judgeY] != 1)
								&&(map[judgeX+5][judgeY+5] != 0)
								&&(map[judgeX+5][judgeY+5] != 1)) {
									return 0;
							}
							break;
			}
			//if((map[judgeX][judgeY] != 0)&&(map[judgeX][judgeY] != 1)) return 0;
		}
		return 1;
	}

	this.writeMap = function(num){
		for (var i = 0; i< 5;++i) 
			for(var j = 0;j < 5; ++j)
				map[this.X + i][this.Y+j] = num;
	}

	this.fire = function(){
		this.bullet.fired = 1;
		this.bullet.direction = this.direction;
		switch(this.direction){
			case Up   :this.bullet.X = this.X + 2;
					   this.bullet.Y = this.Y;break;
			case Down :this.bullet.X = this.X + 2;
					   this.bullet.Y = this.Y+5;break;
			case Left :this.bullet.X = this.X;
					   this.bullet.Y = this.Y + 2;break;
			case Right:this.bullet.X = this.X + 5;
					   this.bullet.Y = this.Y +2;break;
		}
	}
}

function tankEnemy(beginX,beginY,direction,life,theimgU,theimgD,theimgL,theimgR,theimgB){
	this.imgU       = theimgU;
	this.imgD       = theimgD;
	this.imgL       = theimgL;
	this.imgR       = theimgR;
	this.speed      = 1;
	this.beginX     = beginX;
	this.beginY     = beginY;
	this.X          = beginX;
	this.Y          = beginY;
	this.direction  = direction; 
	this.dirJudge   = 0;
	this.slow       = 1;
	this.enemyFired = 30;
	this.score      = 0;
	this.life       = life;
	this.bullet     = new bullet(this.X,this.Y,this.direction,theimgB,this);

	this.getImg = function(){
		switch(this.direction){
			case Up   :return this.imgU;
			case Down :return this.imgD;
			case Left :return this.imgL;
			case Right:return this.imgR;
		}
	} 

	this.keyChoice = function() {
		if(this.enemyFired) {
			--this.enemyFired;
			
		}else{
			this.enemyFired = 30;
			if(!this.bullet.fired) this.fire();
		}

		if(this.slow){
			var key = Down;
			var followX = me.X - this.X;
			var followY = me.Y - this.Y;
			if(followY>0) {
				key = Down;
			}else if(followY < 0) {
				key = Up;
				}else if(followX > 0) {
					key = Right;
					}else if(followX < 0){
						key = Left;
					}
			switch(key){
				case Left  : this.moveLeft();break;
				case Up    : this.moveUp();break;
				case Right : this.moveRight();break;
				case Down  : this.moveDown();break;
			}
			this.slow = 0;
		}
		else{
			this.slow = 1;
		}
		
	}

	this.moveLeft = function(){
		if(this.X>0&&this.judge(Left)) {
			this.writeMap(0);
			this.X       -= this.speed;
			this.dirJudge =  0;
			this.writeMap(2);
		}
		else{
			if(this.direction != Left){
				this.dirJudge =  1;
			}
			this.direction = Left;
		}
		
	}

	this.moveUp = function(){
		if(this.Y>0&&this.judge(Up)) {
			this.writeMap(0);
			this.Y       -= this.speed;
			this.dirJudge =  0;
			this.writeMap(2);
		}
		else{
			if(this.direction != Up){
				this.dirJudge =  1;
			}
			this.direction = Up;
		}
		
	}

	this.moveRight = function(){
		if(this.X<60&&this.judge(Right)) {
			this.writeMap(0);
			this.X       += this.speed;
			this.dirJudge =  0;
			this.writeMap(2);
		}
		else{
			if(this.direction != Right){
				this.dirJudge =  1;
			}
			this.direction = Right;
		}
	}

	this.moveDown = function(){
		if(this.Y<60&&this.judge(Down)) {
			this.writeMap(0);
			this.Y += this.speed;
			this.dirJudge =  0;
			this.writeMap(2);
		}
		else{
			if(this.direction != Down){
				this.dirJudge =  1;
			}
			this.direction = Down;
		}
	}

	this.judge = function(direction){
		if (this.direction != direction) {
			return 0;
		}else{
			var judgeX = this.X;
			var judgeY = this.Y;
			switch(direction){
				case Up   : if(this.Y>= 4) 	judgeY -= 1;
							if((map[judgeX][judgeY] != 0)
								&&(map[judgeX][judgeY] != 2)
								&&(map[judgeX+5][judgeY] != 0)
								&&(map[judgeX+5][judgeY] != 2)) {
									return 0;
								}
							break;

				case Down : if(this.Y<=54) 	judgeY += 1;
							if((map[judgeX][judgeY] != 0)
								&&(map[judgeX][judgeY] != 2)
								&&(map[judgeX+5][judgeY] != 0)
								&&(map[judgeX+5][judgeY] != 2)) {
									return 0;
								}
							break;

				case Left :if(this.X>=4)  	judgeX -= 1;
							if((map[judgeX][judgeY] != 0)
								&&(map[judgeX][judgeY] != 2)
								&&(map[judgeX][judgeY+5] != 0)
								&&(map[judgeX][judgeY+5] != 2)) {
									return 0;
								}	
							break;

				case Right:if(this.X<=54) 	judgeX += 1;
							if((map[judgeX][judgeY] != 0)
								&&(map[judgeX][judgeY] != 2)
								&&(map[judgeX][judgeY+5] != 0)
								&&(map[judgeX][judgeY+5] != 2)) {
									return 0;
							}
							break;
			}
		}
		return 1;
	}

	this.writeMap = function(num){
		for (var i = 0; i< 5;++i) {
			for(var j = 0;j < 5; ++j){
				map[this.X+i][this.Y+j] = num;
			}
		}
	}

	this.fire = function(){
		this.bullet.fired = 1;
		this.bullet.direction = this.direction;
		switch(this.direction){
			case Up   :this.bullet.X = this.X + 2;
					   this.bullet.Y = this.Y;break;
			case Down :this.bullet.X = this.X + 2;
					   this.bullet.Y = this.Y+5;break;
			case Left :this.bullet.X = this.X;
					   this.bullet.Y = this.Y + 2;break;
			case Right:this.bullet.X = this.X + 5;
					   this.bullet.Y = this.Y +2;break;
		}
	}
}

function bullet(X,Y,direction,theimgB,tank){
	this.X         = X;
	this.Y         = Y;
	this.speed     = 1;
	this.fired	   = 0;
	this.img 	   = theimgB;

	if(direction == Up||direction == Down||direction == Right||direction ==Left){
		this.direction = direction; 
	}else{
		this.direction = noDir;
	}
	

	this.move = function(){
		if(this.judge()){
			switch(this.direction){
				case Up   :this.Y -= this.speed;break;
				case Down :this.Y += this.speed;break;
				case Left :this.X -= this.speed;break;
				case Right:this.X += this.speed;break;
				case noDir:this.X  = tank.X;
						   this.Y  = tank.Y;break;
			}
		}
		else {
			this.fired = 0;
		}
		
	}

	this.judge = function(){
		if(this.X<-1||this.X>65||this.Y>65||this.Y<-1){
			return 0;
		}
		else{
			return 1;
		}
	}	
}

function init(){
	var map2 = new Array(65);
	var i;
	me    = initTankMe();
	enemy = initTankEnemy();

	for (var i = 0; i <65; ++i) {
		map[i] = new Array(65);
	};

	for(var i = 0; i <65; ++i)
		for(var j = 0; j <65; ++j)
			map[i][j] = 0;

	me.writeMap(1);
	enemy.writeMap(2);

	draw();
}

function initTankMe(){
	var imgU = new Image();
	var imgD = new Image();
	var imgL = new Image();
	var imgR = new Image();
	var imgB = new Image();
	imgB.src = '../static/img/bullet.gif';
	imgU.src = '../static/img/meU.gif';
	imgD.src = '../static/img/meD.gif';
	imgL.src = '../static/img/meL.gif';
	imgR.src = '../static/img/meR.gif';

	return new tankMe(20,60,Up,100,imgU,imgD,imgL,imgR,imgB);
}

function initTankEnemy(){
	var imgU = new Image();
	var imgD = new Image();
	var imgL = new Image();
	var imgR = new Image();
	var imgB = new Image();
	imgB.src = '../static/img/bullet.gif';
	imgU.src = '../static/img/enemyU.gif';
	imgD.src = '../static/img/enemyD.gif';
	imgL.src = '../static/img/enemyL.gif';
	imgR.src = '../static/img/enemyR.gif';

	return new tankEnemy(0,0,Down,20,imgU,imgD,imgL,imgR,imgB);
}

function control(){
	me.keyChoice(keycode);
	enemy.keyChoice();
	keycode = noDir;
	if(me.bullet.fired) {
		me.bullet.move();
	}
	if(enemy.bullet.fired) {
		enemy.bullet.move();
	}
	draw();
	
	setTimeout("control()",30);	
}

function draw(){
		var canvas = document.getElementById("main").getContext("2d");
			canvas.clearRect(0,0,650,650);
			canvas.drawImage(me.getImg(),me.X*10,me.Y*10,50,50);
			canvas.drawImage(enemy.getImg(),enemy.X*10,enemy.Y*10,50,50);
			if(me.bullet.fired){
				canvas.drawImage(me.bullet.img,me.bullet.X*10,me.bullet.Y*10,10,10);
			}
			if(enemy.bullet.fired){
				canvas.drawImage(enemy.bullet.img,enemy.bullet.X*10,enemy.bullet.Y*10,10,10);
			}
}



