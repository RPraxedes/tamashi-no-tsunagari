function init(){
	
	/*
	
	CHAT PART
	
	
	*/
	// https://socket.io/
  
	/*
	
	
	VISUALS PART
	
	
	*/
	
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
	var xpos = 150;
	var ypos = 95;
	var scale = 0.7;
	var expNum=1;
	var faceNum=1;
	var bodyNum=1;
	var expMax = 5;
	
	var ChatBG = new createjs.Bitmap("../assets/img/chat-background.png");
		ChatBG.x = 0;
		ChatBG.y = 0;
		ChatBG.alpha = 0;
	
	var CharImg = new createjs.Container();
		CharImg.alpha = 0;
		CharImg.x = xpos;
		CharImg.y = ypos;
	
	var expImg = new createjs.Bitmap("../assets/img/char/exp_1_"+expNum+".png");
	var headImg = new createjs.Bitmap("../assets/img/char/face_1_"+faceNum+".png");
	var bodyImg = new createjs.Bitmap("../assets/img/char/body_1_"+bodyNum+".png");
		CharImg.addChild(headImg, bodyImg, expImg);
		CharImg.setChildIndex(headImg, 1);
		CharImg.setChildIndex(expImg, 3);
		CharImg.setChildIndex(bodyImg, 2);
	
	
	stage.addChild(
		ChatBG,
		CharImg
	);
	
	function changeEmote(){
		expNum++;
		if(expNum==expMax+1){	//cycle back
			expNum = 1;
		}
		CharImg.removeChild(expImg);
		expImg = new createjs.Bitmap("../assets/img/char/exp_1_"+expNum+".png");
		CharImg.addChild(expImg);
		refreshChildIndices();
	}
	
	function refreshChildIndices(){
		CharImg.setChildIndex(headImg, 1);
		CharImg.setChildIndex(expImg, 3);
		CharImg.setChildIndex(bodyImg, 2);
		stage.update();
	}
	
	createjs.Tween.get(ChatBG).to({alpha: 1}, 1000, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(CharImg).to({scaleX: scale, scaleY: scale}).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	
	stage.update();
	
	return this;
}

var x = init();