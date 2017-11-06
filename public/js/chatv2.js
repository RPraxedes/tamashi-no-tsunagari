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
	
	var ChatBG = new createjs.Bitmap("../assets/img/chat-background.png");
		ChatBG.x = 0;
		ChatBG.y = 0;
		ChatBG.alpha = 0;
	
	stage.addChild(
		ChatBG
	);
	
	createjs.Tween.get(ChatBG).to({alpha: 1}, 1000, createjs.Ease.getPowInOut(2));
}