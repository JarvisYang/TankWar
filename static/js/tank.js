const Up    = 38;
const Left  = 37;
const Right = 39;
const Down  = 40;
const Space = 32;
const noDir = 0;
var me;
var enemy    = new Array(3);
var keycode  = noDir;
var imgSteel = new Image();
var imgWall  = new Image();

//0:nothing 1:me  2:enemy[0] 3:enemy[1]  4:enemy[2] 9:bullet
var map = new Array(66);
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
				case Up   : if(this.Y>= 5) 	judgeY -= 1;
							if(((map[judgeX][judgeY] != 0)&&(map[judgeX][judgeY] != 1))
								||((map[judgeX+4][judgeY] != 0)&&(map[judgeX+4][judgeY] != 1))) {
									return 0;
								}
							break;

				case Down : if(this.Y<=55) 	judgeY += 5;
							if(((map[judgeX][judgeY] != 0)&&(map[judgeX][judgeY] != 1))
								||((map[judgeX+4][judgeY] != 0)&&(map[judgeX+4][judgeY] != 1))) {
									return 0;
								}
							break;

				case Left :if(this.X>=5)  	judgeX -= 1;
							if(((map[judgeX][judgeY] != 0)&&(map[judgeX][judgeY] != 1))
								||((map[judgeX][judgeY+4] != 0)&&(map[judgeX][judgeY+4] != 1))) {
									return 0;
								}	
							break;

				case Right:if(this.X<=55) 	judgeX += 5;
							if(((map[judgeX][judgeY] != 0)&&(map[judgeX][judgeY] != 1))
								||((map[judgeX][judgeY+4] != 0)&&(map[judgeX][judgeY+4] != 1))) {
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

function tankEnemy(beginX,beginY,direction,life,thewhichTank,theimgU,theimgD,theimgL,theimgR,theimgB){
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
	this.whichTank  = thewhichTank
	this.dirJudge   = 0;
	this.slow       = 1;
	this.enemyFired = thewhichTank*13;
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
			var key = noDir;
			var followX = me.X - this.X;
			var followY = me.Y - this.Y;

		switch(this.whichTank){
			case 2:if(followX>0) {
						key = Right;
					}else if(followX < 0) {
							key = Left;
						}else if(followY > 0) {
								key = Down;
							}else if(followY < 0){
								key = Up;
							}
					break;

			case 3:if(followY>0) {
						key = Down;
					}else if(followY < 0) {
							key = Up;
						}else if(followX > 0) {
								key = Right;
							}else if(followX < 0){
								key = Left;
							}
					break;

			case 4:if(followY>0) {
						key = Down;
					}else if(followX < 0) {
							key = Left;
						}else if(followX > 0) {
								key = Right;
							}else if(followY < 0){
								key = Up;
							}
					break;
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
			this.writeMap(this.whichTank);
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
			this.writeMap(this.whichTank);
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
			this.writeMap(this.whichTank);
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
			this.writeMap(this.whichTank);
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
				case Up   : if(this.Y>= 5) 	judgeY -= 1;
							if(((map[judgeX][judgeY] != 0)&&(map[judgeX][judgeY] != this.whichTank))
								||((map[judgeX+4][judgeY] != 0)&&(map[judgeX+4][judgeY] != this.whichTank))) {
									return 0;
								}
							break;

				case Down : if(this.Y<=55) 	judgeY += 5;
							if(((map[judgeX][judgeY] != 0)&&(map[judgeX][judgeY] != this.whichTank))
								||((map[judgeX+4][judgeY] != 0)&&(map[judgeX+4][judgeY] != this.whichTank))) {
									return 0;
								}
							break;

				case Left :if(this.X>=5)  	judgeX -= 1;
							if(((map[judgeX][judgeY] != 0)&&(map[judgeX][judgeY] != this.whichTank))
								||((map[judgeX][judgeY+4] != 0)&&(map[judgeX][judgeY+4] != this.whichTank))) {
									return 0;
								}	
							break;

				case Right:if(this.X<=55) 	judgeX += 5;
							if(((map[judgeX][judgeY] != 0)&&(map[judgeX][judgeY] != this.whichTank))
								||((map[judgeX][judgeY+4] != 0)&&(map[judgeX][judgeY+4] != this.whichTank))) {
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
		map[this.X][this.Y] = 0;
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
		if(this.X<=0||this.X>=64||this.Y>=64||this.Y<=0){
			return 0;
		}
		else{
			return 1;
		}
	}	
}

function init(){
	var map2 = new Array(66);
	var i;
	me       = initTankMe();
	enemy[0] = initTankEnemy(0,0,3,2);
	enemy[1] = initTankEnemy(30,0,3,3);
	enemy[2] = initTankEnemy(59,0,3,4);

	imgWall.src = "../static/img/wall.gif"
	imgSteel.src = "../static/img/steel.gif"

	drawMap();

	for (var i = 0; i <66; ++i) {
		map[i] = new Array(66);
	};

	for(var i = 0; i <66; ++i)
		for(var j = 0; j <66; ++j)
			map[i][j] = 0;

	me.writeMap(1);
	for(var i = 0;i < 3;++i){
		enemy[i].writeMap(i+2);
	}
	
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

	return new tankMe(20,60,Up,10,imgU,imgD,imgL,imgR,imgB);
}

function initTankEnemy(beginX,beginY,life,whichTank){
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

	return new tankEnemy(beginX,beginY,Down,life,whichTank,imgU,imgD,imgL,imgR,imgB);
}

function control(){
	if(me.life > 0){
		me.keyChoice(keycode);
	}

	for(var i = 0;i < 3;++i){
		if(enemy[i].life > 0){
			enemy[i].keyChoice();
		}
	}
	
	bulletMoveJudge();

	draw();
	
	setTimeout("control()",30);	
}

function bulletMoveJudge(){
	keycode = noDir;
	if(me.bullet.fired) {
		me.bullet.move();
		if( map[me.bullet.X][me.bullet.Y] != 1){
			switch(map[me.bullet.X][me.bullet.Y]){
				case 0 :if(me.bullet.judge()) {
							map[me.bullet.X][me.bullet.Y] = 9;
						}
						break;

				case 2 :--enemy[0].life;
						if(enemy[0].life<=0){
							enemy[0].writeMap(0)
						}
						me.bullet.fired = 0;
						break;

				case 3 :--enemy[1].life;
						if(enemy[1].life<=0){
							enemy[1].writeMap(0)
						}
						me.bullet.fired = 0;
						break;

				case 4 :--enemy[2].life;
						if(enemy[2].life<=0){
							enemy[2].writeMap(0)
						}
						me.bullet.fired = 0;
						break;
			}
		}
	}

	for(var i = 0;i < 3;++i){
		if(enemy[i].bullet.fired) {
			enemy[i].bullet.move();
			if(map[enemy[i].bullet.X][enemy[i].bullet.Y] != 2 ){
				switch(map[enemy[i].bullet.X][enemy[i].bullet.Y]){
					case 0 :if(enemy[i].bullet.judge()){
								map[enemy[i].bullet.X][enemy[i].bullet.Y] = 9;
							} 
							break;

					case 1 :--me.life;
							if(me.life<=0){
								me.writeMap(0);
							}
							enemy[i].bullet.fired = 0;
							break;

					case 2 :
					case 3 :
					case 4 :enemy[i].bullet.fired = 0;break;
					case 9 :me.bullet.fired = 0;
							enemy[i].bullet.fired = 0;
							map[me.bullet.X][me.bullet.Y] = 0;
							break;
				}
			}

		}
	}
}

function draw(){
		var canvas = document.getElementById("main").getContext("2d");
			canvas.clearRect(0,0,650,650);
			if(me.life > 0){
				canvas.drawImage(me.getImg(),me.X*10,me.Y*10,50,50);
			}
			
			if(me.bullet.fired){
				canvas.drawImage(me.bullet.img,me.bullet.X*10,me.bullet.Y*10,10,10);
			}
			

			for(var i = 0;i < 3;++i){
				if(enemy[i].life > 0){
					canvas.drawImage(enemy[i].getImg(),enemy[i].X*10,enemy[i].Y*10,50,50);
				}

				if(enemy[i].bullet.fired){
					canvas.drawImage(enemy[i].bullet.img,enemy[i].bullet.X*10,enemy[i].bullet.Y*10,10,10);
				}
			}
}



