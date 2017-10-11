function init(){
	var stage = new createjs.Stage("demoCanvas");	// initialize app

	// enable touch interactions if supported on the current device:
	createjs.Touch.enable(stage);
	// enable mouseover events
	stage.enableMouseOver(20);

	// enabled mouse over / out events
	stage.enableMouseOver();
	stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas

	createjs.Ticker.setFPS(60);	// set FPS to 60
	createjs.Ticker.on("tick", stage);	// provides a centralized tick or heartbeat broadcast
	function tick(event) {
		// this set makes it so the stage only re-renders when an event handler indicates a change has happened.
		if (update) {
			update = false; // only update once
			stage.update(event);
		}
	}

	var leftArrowX = 197;
	var rightArrowX = 435;
	var itemHeight = 40;
	var faceMax = 4;	//max number of face assets, should be retrieved from the db
	var bodyMax = 4;
	var expMax = 5;
	
		// default parts and variables for character
	var faceNum = 1;	//this should be retrieved from the db
	var bodyNum = 1;
	var expNum = 1;
	var xpos = 150;
	var ypos = 95;
	var scale = 0.7;
	
	var ecval = 0;	// eye color value (blue only for now)
	var hcval = 1;	// hair color value (hue only for now)
	
	var CharBG = new createjs.Bitmap("../assets/img/char-background.png");
		CharBG.x = 0;
		CharBG.y = 0;
		CharBG.alpha = 0;

	var CharTitleImg = new createjs.Bitmap("../assets/img/char-title.png");
		CharTitleImg.x = 30;
		CharTitleImg.y =50;
		CharTitleImg.alpha = 0;

	var BackHome = new createjs.Text("Back to Home", "32px Arial", "white");	//link that goes back to home
		BackHome.x = 960;
		BackHome.y = 30;
		
		// Character Menu Container
	var CharMenu = new createjs.Container();
	var CharMenuBG = new createjs.Bitmap("../assets/img/char-menu-bg.png");
		
		// Item descriptions
	var HeadItemTxt = new createjs.Text("Name\n\nEye Color\n\nHead\n\nHair Color\n\nBody\n\n\n\nExpression", "20px Arial", "black");
		HeadItemTxt.x = 50;
		HeadItemTxt.y = 50;
		
		// Item pickers
	var HeadItemLeft = new createjs.Bitmap("../assets/img/char-arrow-left.png");
		HeadItemLeft.x = leftArrowX;
		HeadItemLeft.y = 133;
	var HeadItem = new createjs.Text("Type "+faceNum, "20px Arial", "black").set({
			textAlign: "center",
			x: (rightArrowX - leftArrowX) + 80,
			y: 133
		});
	var HeadItemRight = new createjs.Bitmap("../assets/img/char-arrow-right.png");
		HeadItemRight.x = rightArrowX;
		HeadItemRight.y = 133;
		
	var BodyItemLeft = new createjs.Bitmap("../assets/img/char-arrow-left.png");
		BodyItemLeft.x = leftArrowX;
		BodyItemLeft.y = 133 + itemHeight*2;
	var BodyItem = new createjs.Text("Type "+faceNum, "20px Arial", "black").set({
			textAlign: "center",
			x: (rightArrowX - leftArrowX) + 80,
			y: 133 + itemHeight*2
		});
	var BodyItemRight = new createjs.Bitmap("../assets/img/char-arrow-right.png");
		BodyItemRight.x = rightArrowX;
		BodyItemRight.y = 133 + itemHeight*2;
		
	var ExpItemLeft = new createjs.Bitmap("../assets/img/char-arrow-left.png");
		ExpItemLeft.x = leftArrowX;
		ExpItemLeft.y = 133 + itemHeight*4;
	var ExpItem = new createjs.Text("Type "+faceNum, "20px Arial", "black").set({
			textAlign: "center",
			x: (rightArrowX - leftArrowX) + 80,
			y: 133 + itemHeight*4
		});
	var ExpItemRight = new createjs.Bitmap("../assets/img/char-arrow-right.png");
		ExpItemRight.x = rightArrowX;
		ExpItemRight.y = 133 + itemHeight*4;
	
	createjs.Tween.get(HeadItemLeft).to({scaleX: 0.37, scaleY: 0.37});
	createjs.Tween.get(HeadItemRight).to({scaleX: 0.37, scaleY: 0.37});
	createjs.Tween.get(BodyItemLeft).to({scaleX: 0.37, scaleY: 0.37});
	createjs.Tween.get(BodyItemRight).to({scaleX: 0.37, scaleY: 0.37});
	createjs.Tween.get(ExpItemLeft).to({scaleX: 0.37, scaleY: 0.37});
	createjs.Tween.get(ExpItemRight).to({scaleX: 0.37, scaleY: 0.37});

		CharMenu.x = 650;
		CharMenu.y = 100;
		CharMenu.alpha = 0;
		CharMenu.addChild(CharMenuBG, HeadItemTxt, HeadItemLeft, HeadItemRight, BodyItemLeft, BodyItemRight, ExpItemLeft, ExpItemRight, HeadItem, BodyItem, ExpItem);	// add menus to container
		
		//eye color slider (not in CharMenu container)
	var ecslider = new createjs.Container();	//hair color slider
	var ecrail = new createjs.Shape(new createjs.Graphics().beginStroke("#555").setStrokeStyle(1).beginFill("#3c3c3c").drawRect(0, 7, 255, 6));
	var echandle = new createjs.Shape(new createjs.Graphics().beginStroke("#3c3c3c").setStrokeStyle(1).beginFill("#e6e6e6").drawRect(-4, 0, 8, 20));
		ecslider.alpha = 0;
		ecslider.x = 848;
		ecslider.y = 193;
	var ecText = new createjs.Text("Blue: "+ecval, "20px Arial", "black");
		ecText.x = 281;
		ecText.y = 0;
		
		ecslider.addChild(ecrail, echandle, ecText);
		
		//hair color slider (not in CharMenu container)
	var hcslider = new createjs.Container();	//hair color slider
	var hcrail = new createjs.Shape(new createjs.Graphics().beginStroke("#555").setStrokeStyle(1).beginFill("#3c3c3c").drawRect(0, 7, 255, 6));
	var hchandle = new createjs.Shape(new createjs.Graphics().beginStroke("#3c3c3c").setStrokeStyle(1).beginFill("#e6e6e6").drawRect(-4, 0, 8, 20));
		hcslider.alpha = 0;
		hcslider.x = 848;
		hcslider.y = 273;
	var hcText = new createjs.Text("Hue: "+ecval, "20px Arial", "black");
		hcText.x = 281;
		
		hcslider.addChild(hcrail, hchandle, hcText);
		
	// character container
	var CharImg = new createjs.Container();
		CharImg.alpha = 0;
		CharImg.x = xpos;
		CharImg.y = ypos;
		
	var headImg = new createjs.Bitmap("../assets/img/char/face_1_"+faceNum+".png");
	var bodyImg = new createjs.Bitmap("../assets/img/char/body_1_"+bodyNum+".png");
	var expImg = new createjs.Bitmap("../assets/img/char/exp_1_"+expNum+".png");
	var EyeColorRect = new createjs.Shape(new createjs.Graphics().beginFill("rgba(0, 0, "+ecval+", 1)").drawRect(192, 200, 100, 35));	//rectangle position is variable for every character
		
		CharImg.addChild(headImg, bodyImg, expImg, EyeColorRect);
		CharImg.setChildIndex(headImg, 1);
		CharImg.setChildIndex(expImg, 3);
		CharImg.setChildIndex(bodyImg, 2);
		CharImg.setChildIndex(EyeColorRect, 2);
	createjs.Tween.get(CharImg).to({scaleX: scale, scaleY: scale}).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	
	stage.addChild(
		CharBG,
		CharTitleImg,
		CharMenu,
		ecslider,
		hcslider,
		CharImg,
		BackHome
	);

	createjs.Tween.get(CharBG).to({alpha: 1}, 1000, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(CharTitleImg).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(CharMenu).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(HeadItemTxt).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(ecslider).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(hcslider).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(CharImg).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	
	stage.update();
	
	// Click events
	BackHome.on("click", function(event){
		window.location.replace("/");
	});
	
	HeadItemRight.on("click", function(event){
		faceNum++;
		if(faceNum==faceMax+1){	//cycle back
			faceNum = 1;
		}
		CharImg.removeChild(headImg);
		headImg = new createjs.Bitmap("../assets/img/char/face_1_"+faceNum+".png");
		HeadItem.text = "Type "+faceNum;	// supposed to retrieve name from db
		CharImg.addChild(headImg);
		refreshChildIndices();
	});
	HeadItemLeft.on("click", function(event){
		faceNum--;
		if(faceNum==0){	//cycle back
			faceNum = faceMax;
		}
		CharImg.removeChild(headImg);
		headImg = new createjs.Bitmap("../assets/img/char/face_1_"+faceNum+".png");
		HeadItem.text = "Type "+faceNum;
		CharImg.addChild(headImg);
		refreshChildIndices();
	});
	
	BodyItemRight.on("click", function(event){
		bodyNum++;
		if(bodyNum==bodyMax+1){	//cycle back
			bodyNum = 1;
		}
		CharImg.removeChild(bodyImg);
		bodyImg = new createjs.Bitmap("../assets/img/char/body_1_"+bodyNum+".png");
		BodyItem.text = "Type "+bodyNum;
		CharImg.addChild(bodyImg);
		refreshChildIndices();
	});
	BodyItemLeft.on("click", function(event){
		bodyNum--;
		if(bodyNum==0){	//cycle back
			bodyNum = bodyMax;
		}
		CharImg.removeChild(bodyImg);
		bodyImg = new createjs.Bitmap("../assets/img/char/body_1_"+bodyNum+".png");
		BodyItem.text = "Type "+bodyNum;
		CharImg.addChild(bodyImg);
		refreshChildIndices();
	});
	
	ExpItemRight.on("click", function(event){
		expNum++;
		if(expNum==expMax+1){	//cycle back
			expNum = 1;
		}
		CharImg.removeChild(expImg);
		expImg = new createjs.Bitmap("../assets/img/char/exp_1_"+expNum+".png");
		ExpItem.text = "Type "+expNum;
		CharImg.addChild(expImg);
		refreshChildIndices();
	});
	ExpItemLeft.on("click", function(event){
		expNum--;
		if(expNum==0){	//cycle back
			expNum = expMax;
		}
		CharImg.removeChild(expImg);
		expImg = new createjs.Bitmap("../assets/img/char/exp_1_"+expNum+".png");
		ExpItem.text = "Type "+expNum;
		CharImg.addChild(expImg);
		refreshChildIndices();
	});
	
	// mousedown events
	echandle.on("mousedown", function (event) {
		this.parent.addChild(this);
		this.offset = {x: this.x - event.stageX};
	});
	hchandle.on("mousedown", function (event) {
		this.parent.addChild(this);
		this.offset = {x: this.x - event.stageX};
	});
	
	// pressmove events
	echandle.on("pressmove", function (event) {
		this.x = event.stageX + this.offset.x;
		if(this.x<=-4) this.x = 0;
		if(this.x>=255) this.x = 255;
		ecval = echandle.x;
			ecslider.removeChild(ecText);
		ecText = new createjs.Text("Blue: "+ecval, "20px Arial", "black");
			ecText.x = 281;
			
			ecslider.addChild(ecText);
		
		CharImg.removeChild(EyeColorRect);
		EyeColorRect = new createjs.Shape(new createjs.Graphics().beginFill("rgba(0, 0, "+ecval+", 1)").drawRect(192, 200, 100, 35));
		CharImg.addChild(EyeColorRect);
		refreshChildIndices();
		// indicate that the stage should be updated on the next tick:
		update = true;
	});
	hchandle.on("pressmove", function (event) {
		this.x = event.stageX + this.offset.x;
		if(this.x<=-4) this.x = 0;
		if(this.x>=255) this.x = 255;
		hcval = hchandle.x + 1;
		
			hcslider.removeChild(hcText);
		hcText = new createjs.Text("Hue: "+hcval, "20px Arial", "black");
			hcText.x = 281;
			
			hcslider.addChild(hcText);
		// indicate that the stage should be updated on the next tick:
		update = true;
	});
	function refreshChildIndices(){
		CharImg.setChildIndex(headImg, 1);
		CharImg.setChildIndex(expImg, 3);
		CharImg.setChildIndex(bodyImg, 2);
		CharImg.setChildIndex(EyeColorRect, 2);
		stage.update();
	}
}

function stop() {
	createjs.Ticker.removeEventListener("tick", tick);
}