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
	
	var ecvalr = 0;	// eye color values RGB format
	var ecvalg = 0;
	var ecvalb = 0;
	
	var hcvalr = 0;	// hair color values RGB format
	var hcvalg = 0;
	var hcvalb = 0;
	
	var CharBG = new createjs.Bitmap("../assets/img/char-background.png");
		CharBG.x = 0;
		CharBG.y = 0;
		CharBG.alpha = 0;

	var CharTitleImg = new createjs.Bitmap("../assets/img/char-title.png");
		CharTitleImg.x = 30;
		CharTitleImg.y = 50;
		CharTitleImg.alpha = 0;

	var BackHome = new createjs.Text("Back to Home", "32px Arial", "white");	//link that goes back to home
		BackHome.x = 960;
		BackHome.y = 30;
		
		// Character Menu Container
	var CharMenu = new createjs.Container();
	var CharMenuBG = new createjs.Bitmap("../assets/img/char-menu-bg.png");
		
		// Item descriptions
	var HeadItemTxt = new createjs.Text("Name\n\nEye Color\n\n\n\n\n\n\nHead\n\nHair Color\n\n\n\n\n\n\nBody\n\nExpression", "20px Arial", "black");
		HeadItemTxt.x = 50;
		HeadItemTxt.y = 50;
		
		// Item pickers
	var HeadItemLeft = new createjs.Bitmap("../assets/img/char-arrow-left.png");
		HeadItemLeft.x = leftArrowX;
		HeadItemLeft.y = 233;
	var HeadItem = new createjs.Text("Type "+faceNum, "20px Arial", "black").set({
			textAlign: "center",
			x: (rightArrowX - leftArrowX) + 80,
			y: 233
		});
	var HeadItemRight = new createjs.Bitmap("../assets/img/char-arrow-right.png");
		HeadItemRight.x = rightArrowX;
		HeadItemRight.y = 233;
		
	var BodyItemLeft = new createjs.Bitmap("../assets/img/char-arrow-left.png");
		BodyItemLeft.x = leftArrowX;
		BodyItemLeft.y = 413;
	var BodyItem = new createjs.Text("Type "+faceNum, "20px Arial", "black").set({
			textAlign: "center",
			x: (rightArrowX - leftArrowX) + 80,
			y: 413
		});
	var BodyItemRight = new createjs.Bitmap("../assets/img/char-arrow-right.png");
		BodyItemRight.x = rightArrowX;
		BodyItemRight.y = 413;
		
	var ExpItemLeft = new createjs.Bitmap("../assets/img/char-arrow-left.png");
		ExpItemLeft.x = leftArrowX;
		ExpItemLeft.y = 453;
	var ExpItem = new createjs.Text("Type "+faceNum, "20px Arial", "black").set({
			textAlign: "center",
			x: (rightArrowX - leftArrowX) + 80,
			y: 453
		});
	var ExpItemRight = new createjs.Bitmap("../assets/img/char-arrow-right.png");
		ExpItemRight.x = rightArrowX;
		ExpItemRight.y = 453;
	
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
		
		
		//eye color slider red(not in CharMenu container)
	var ecsliderr = new createjs.Container();
	var ecrailr = new createjs.Shape(new createjs.Graphics().beginStroke("#555").setStrokeStyle(1).beginFill("#3c3c3c").drawRect(0, 7, 255, 6));
	var echandler = new createjs.Shape(new createjs.Graphics().beginStroke("#3c3c3c").setStrokeStyle(1).beginFill("#e6e6e6").drawRect(-4, 0, 8, 20));
		ecsliderr.alpha = 0;
		ecsliderr.x = 848;
		ecsliderr.y = 193;
	var ecTextr = new createjs.Text("Red: "+ecvalr, "20px Arial", "black");
		ecTextr.x = 265;
		ecTextr.y = 0;
		ecsliderr.addChild(ecrailr, echandler, ecTextr);
		
		//eye color slider green(not in CharMenu container)
	var ecsliderg = new createjs.Container();
	var ecrailg = new createjs.Shape(new createjs.Graphics().beginStroke("#555").setStrokeStyle(1).beginFill("#3c3c3c").drawRect(0, 7, 255, 6));
	var echandleg = new createjs.Shape(new createjs.Graphics().beginStroke("#3c3c3c").setStrokeStyle(1).beginFill("#e6e6e6").drawRect(-4, 0, 8, 20));
		ecsliderg.alpha = 0;
		ecsliderg.x = 848;
		ecsliderg.y = 233;
	var ecTextg = new createjs.Text("Green: "+ecvalg, "20px Arial", "black");
		ecTextg.x = 265;
		ecTextg.y = 0;
		ecsliderg.addChild(ecrailg, echandleg, ecTextg);
		
		//eye color slider blue(not in CharMenu container)
	var ecsliderb = new createjs.Container();
	var ecrailb = new createjs.Shape(new createjs.Graphics().beginStroke("#555").setStrokeStyle(1).beginFill("#3c3c3c").drawRect(0, 7, 255, 6));
	var echandleb = new createjs.Shape(new createjs.Graphics().beginStroke("#3c3c3c").setStrokeStyle(1).beginFill("#e6e6e6").drawRect(-4, 0, 8, 20));
		ecsliderb.alpha = 0;
		ecsliderb.x = 848;
		ecsliderb.y = 273;
	var ecTextb = new createjs.Text("Blue: "+ecvalb, "20px Arial", "black");
		ecTextb.x = 265;
		ecTextb.y = 0;
		ecsliderb.addChild(ecrailb, echandleb, ecTextb);
		
		//hair color slider red (not in CharMenu container)
	var hcsliderr = new createjs.Container();	//hair color slider
	var hcrailr = new createjs.Shape(new createjs.Graphics().beginStroke("#555").setStrokeStyle(1).beginFill("#3c3c3c").drawRect(0, 7, 255, 6));
	var hchandler = new createjs.Shape(new createjs.Graphics().beginStroke("#3c3c3c").setStrokeStyle(1).beginFill("#e6e6e6").drawRect(-4, 0, 8, 20));
		hcsliderr.alpha = 0;
		hcsliderr.x = 848;
		hcsliderr.y = 373;
	var hcTextr = new createjs.Text("Red: "+hcvalr, "20px Arial", "black");
		hcTextr.x = 265;
		hcsliderr.addChild(hcrailr, hchandler, hcTextr);
		
		//hair color slider red (not in CharMenu container)
	var hcsliderg = new createjs.Container();	//hair color slider
	var hcrailg = new createjs.Shape(new createjs.Graphics().beginStroke("#555").setStrokeStyle(1).beginFill("#3c3c3c").drawRect(0, 7, 255, 6));
	var hchandleg = new createjs.Shape(new createjs.Graphics().beginStroke("#3c3c3c").setStrokeStyle(1).beginFill("#e6e6e6").drawRect(-4, 0, 8, 20));
		hcsliderg.alpha = 0;
		hcsliderg.x = 848;
		hcsliderg.y = 413;
	var hcTextg = new createjs.Text("Green: "+hcvalg, "20px Arial", "black");
		hcTextg.x = 265;
		hcsliderg.addChild(hcrailg, hchandleg, hcTextg);
		
		//hair color slider red (not in CharMenu container)
	var hcsliderb = new createjs.Container();	//hair color slider
	var hcrailb = new createjs.Shape(new createjs.Graphics().beginStroke("#555").setStrokeStyle(1).beginFill("#3c3c3c").drawRect(0, 7, 255, 6));
	var hchandleb = new createjs.Shape(new createjs.Graphics().beginStroke("#3c3c3c").setStrokeStyle(1).beginFill("#e6e6e6").drawRect(-4, 0, 8, 20));
		hcsliderb.alpha = 0;
		hcsliderb.x = 848;
		hcsliderb.y = 453;
	var hcTextb = new createjs.Text("Blue: "+hcvalb, "20px Arial", "black");
		hcTextb.x = 265;
		hcsliderb.addChild(hcrailb, hchandleb, hcTextb);
		
	// character container
	var CharImg = new createjs.Container();
		CharImg.alpha = 0;
		CharImg.x = xpos;
		CharImg.y = ypos;
		
	var headImg = new createjs.Bitmap("../assets/img/char/face_1_"+faceNum+".png");
	var bodyImg = new createjs.Bitmap("../assets/img/char/body_1_"+bodyNum+".png");
	var expImg = new createjs.Bitmap("../assets/img/char/exp_1_"+expNum+".png");
	var EyeColorRect = new createjs.Shape(new createjs.Graphics().beginFill("rgba("+hcvalr+", 0, 0, 1)").drawRect(192, 200, 100, 35));	//rectangle position is variable for every character
		
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
		ecsliderr,
		ecsliderg,
		ecsliderb,
		hcsliderr,
		hcsliderg,
		hcsliderb,
		CharImg,
		BackHome
	);

	createjs.Tween.get(CharBG).to({alpha: 1}, 1000, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(CharTitleImg).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(CharMenu).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(HeadItemTxt).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(ecsliderr).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(ecsliderg).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(ecsliderb).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(hcsliderr).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(hcsliderg).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(hcsliderb).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
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
	echandler.on("mousedown", function (event) {
		this.parent.addChild(this);
		this.offset = {x: this.x - event.stageX};
	});
	echandleg.on("mousedown", function (event) {
		this.parent.addChild(this);
		this.offset = {x: this.x - event.stageX};
	});
	echandleb.on("mousedown", function (event) {
		this.parent.addChild(this);
		this.offset = {x: this.x - event.stageX};
	});
	
	hchandler.on("mousedown", function (event) {
		this.parent.addChild(this);
		this.offset = {x: this.x - event.stageX};
	});
	hchandleg.on("mousedown", function (event) {
		this.parent.addChild(this);
		this.offset = {x: this.x - event.stageX};
	});
	hchandleb.on("mousedown", function (event) {
		this.parent.addChild(this);
		this.offset = {x: this.x - event.stageX};
	});
	
	// pressmove events
	echandler.on("pressmove", function (event) {
		this.x = event.stageX + this.offset.x;
		if(this.x<=-4) this.x = 0;
		if(this.x>=255) this.x = 255;
		ecvalr = echandler.x;
			ecsliderr.removeChild(ecTextr);
		ecTextr = new createjs.Text("Red: "+ecvalr, "20px Arial", "black");
			ecTextr.x = 265;
			
			ecsliderr.addChild(ecTextr);
		
		CharImg.removeChild(EyeColorRect);
		EyeColorRect = new createjs.Shape(new createjs.Graphics().beginFill("rgba("+ecvalr+", "+ecvalg+", "+ecvalb+", 1)").drawRect(192, 200, 100, 35));
		CharImg.addChild(EyeColorRect);
		refreshChildIndices();
		// indicate that the stage should be updated on the next tick:
		update = true;
	});
	
	echandleg.on("pressmove", function (event) {
		this.x = event.stageX + this.offset.x;
		if(this.x<=-4) this.x = 0;
		if(this.x>=255) this.x = 255;
		ecvalg = echandleg.x;
			ecsliderg.removeChild(ecTextg);
		ecTextg = new createjs.Text("Green: "+ecvalg, "20px Arial", "black");
			ecTextg.x = 265;
			
			ecsliderg.addChild(ecTextg);
		
		CharImg.removeChild(EyeColorRect);
		EyeColorRect = new createjs.Shape(new createjs.Graphics().beginFill("rgba("+ecvalr+", "+ecvalg+", "+ecvalb+", 1)").drawRect(192, 200, 100, 35));
		CharImg.addChild(EyeColorRect);
		refreshChildIndices();
		// indicate that the stage should be updated on the next tick:
		update = true;
	});
	
	echandleb.on("pressmove", function (event) {
		this.x = event.stageX + this.offset.x;
		if(this.x<=-4) this.x = 0;
		if(this.x>=255) this.x = 255;
		ecvalb = echandleb.x;
			ecsliderb.removeChild(ecTextb);
		ecTextb = new createjs.Text("Blue: "+ecvalb, "20px Arial", "black");
			ecTextb.x = 265;
			
			ecsliderb.addChild(ecTextb);
		
		CharImg.removeChild(EyeColorRect);
		EyeColorRect = new createjs.Shape(new createjs.Graphics().beginFill("rgba("+ecvalr+", "+ecvalg+", "+ecvalb+", 1)").drawRect(192, 200, 100, 35));
		CharImg.addChild(EyeColorRect);
		refreshChildIndices();
		// indicate that the stage should be updated on the next tick:
		update = true;
	});
	
	hchandler.on("pressmove", function (event) {
		this.x = event.stageX + this.offset.x;
		if(this.x<=-4) this.x = 0;
		if(this.x>=255) this.x = 255;
		hcvalr = hchandler.x;
		
			hcsliderr.removeChild(hcTextr);
		hcTextr = new createjs.Text("Red: "+hcvalr, "20px Arial", "black");
			hcTextr.x = 265;
			
			hcsliderr.addChild(hcTextr);
		// indicate that the stage should be updated on the next tick:
		update = true;
	});
	
	hchandleg.on("pressmove", function (event) {
		this.x = event.stageX + this.offset.x;
		if(this.x<=-4) this.x = 0;
		if(this.x>=255) this.x = 255;
		hcvalg = hchandleg.x;
		
			hcsliderg.removeChild(hcTextg);
		hcTextg = new createjs.Text("Green: "+hcvalg, "20px Arial", "black");
			hcTextg.x = 265;
			
			hcsliderg.addChild(hcTextg);
		// indicate that the stage should be updated on the next tick:
		update = true;
	});
	
	hchandleb.on("pressmove", function (event) {
		this.x = event.stageX + this.offset.x;
		if(this.x<=-4) this.x = 0;
		if(this.x>=255) this.x = 255;
		hcvalb = hchandleb.x;
		
			hcsliderb.removeChild(hcTextb);
		hcTextb = new createjs.Text("Blue: "+hcvalb, "20px Arial", "black");
			hcTextb.x = 265;
			
			hcsliderb.addChild(hcTextb);
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