 function init() {
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
	
	var buttonWidth = 199
	var buttonHeight = 31;
	var menuX = 510;
	var menuY = 450;
	
	//Black screen
	var blackScn = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, 1280, 720));

	//Background image
	var BGbitmap = new createjs.Bitmap("../assets/img/background.png");
		BGbitmap.x = 0;
		BGbitmap.y = 0;
		BGbitmap.alpha = 0;

	//Title Image
	var titleImg = new createjs.Bitmap("../assets/img/title.png");
		titleImg.x = 323;
		titleImg.y = 152;
		titleImg.alpha = 0;

	//Menu pointer
	var mPoint = new createjs.Text("w", "34px Wingdings", "black");
		mPoint.alpha = 0;
		mPoint.x = menuX;
	
	//Character Button
	var charButton = new createjs.Container();
	var charHB = new createjs.Shape(new createjs.Graphics().beginFill("#FFF").drawRect(0, 0, buttonWidth, buttonHeight));
	var titleChar = new createjs.Text("Character", "20px Arial", "black");
	charButton.addChild(charHB, titleChar);
		charButton.x = menuX;
		charButton.y = menuY;
		charButton.alpha = 0;
		titleChar.x = buttonWidth/4;
		titleChar.y = buttonHeight/8;

	//Lobby Option
	var lobbyButton = new createjs.Container();
	var lobbHB = new createjs.Shape(new createjs.Graphics().beginFill("#FFF").drawRect(0, 0, 199, 31));
	var titleLobby = new createjs.Text("Chatv2", "20px Arial", "black");
	lobbyButton.addChild(lobbHB, titleLobby);
		lobbyButton.x = menuX;
		lobbyButton.y = menuY + buttonHeight;
		lobbyButton.alpha = 0;
		titleLobby.x = buttonWidth/4;
		titleLobby.y = buttonHeight/8;

	//Options Option
	var optionButton = new createjs.Container();
	var optHB = new createjs.Shape(new createjs.Graphics().beginFill("#FFF").drawRect(0, 0, 199, 31));
	var titleOption = new createjs.Text("Options", "20px Arial", "black");
	optionButton.addChild(optHB, titleOption);
		optionButton.x = menuX;
		optionButton.y = menuY + buttonHeight * 2;
		optionButton.alpha = 0;
		titleOption.x = buttonWidth/4;
		titleOption.y = buttonHeight/8;

	//Credits Option
	var creditButton = new createjs.Container();
	var credHB = new createjs.Shape(new createjs.Graphics().beginFill("#FFF").drawRect(0, 0, 199, 31));
	var titleCredits = new createjs.Text("Credits", "20px Arial", "black");
	creditButton.addChild(credHB, titleCredits);
		creditButton.hitArea = credHB;
		creditButton.x = menuX;
		creditButton.y = menuY + buttonHeight * 3;
		creditButton.alpha = 0;
		titleCredits.x = buttonWidth/4;
		titleCredits.y = buttonHeight/8;

	//Credits Option
	var helpButton = new createjs.Container();
	var helpHB = new createjs.Shape(new createjs.Graphics().beginFill("#FFF").drawRect(0, 0, 199, 31));
	var titleHelp = new createjs.Text("Help", "20px Arial", "black");
	helpButton.addChild(helpHB, titleHelp);
		helpButton.x = menuX;
		helpButton.y = menuY + buttonHeight * 4;
		helpButton.alpha = 0;
		titleHelp.x = buttonWidth/4;
		titleHelp.y = buttonHeight/8;
		

	stage.addChild(blackScn, BGbitmap,
		titleImg,
		charButton,
		lobbyButton,
		optionButton,
		creditButton,
		helpButton,
		mPoint
	);	// load to app

	//simultaneous fade in
	createjs.Tween.get(BGbitmap).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(titleImg).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(charButton).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(lobbyButton).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(optionButton).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(creditButton).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	createjs.Tween.get(helpButton).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
	
	// sequential ease in loading
	/* createjs.Tween.get(BGbitmap).to({ alpha: 1 }, 1000, createjs.Ease.getPowInOut(2))
		.call(function(){
			createjs.Tween.get(titleImg).to({ alpha: 1 }, 1000, createjs.Ease.getPowInOut(2))
			.call(function(){
				createjs.Tween.get(titleCharOption).to({ alpha: 1 }, 500, createjs.Ease.getPowInOut(2))
				.call(function(){
					createjs.Tween.get(lobbyButton).to({ alpha: 1 }, 500, createjs.Ease.getPowInOut(2))
					.call(function(){
						createjs.Tween.get(optionButton).to({ alpha: 1 }, 500, createjs.Ease.getPowInOut(2))
						.call(function(){
							createjs.Tween.get(creditButton).to({ alpha: 1 }, 500, createjs.Ease.getPowInOut(2))
							.call(function(){
								createjs.Tween.get(helpButton).to({ alpha: 1 }, 500, createjs.Ease.getPowInOut(2));
							});
						});
					});
				});
			});
		});	//quadratic ease in from alpha 0 to 1 in 1000 ms
 */
	/*
	https://medium.freecodecamp.org/building-a-chat-application-with-mean-stack-637254d1136d
	https://code.tutsplus.com/tutorials/real-time-chat-with-nodejs-socketio-and-expressjs--net-31708

	http://createjs.com/tutorials/Mouse%20Interaction/
	https://github.com/CreateJS/EaselJS/wiki/Articles-and-Tutorials
	*/
	// mouseover events
	charButton.on("mouseover", function(event){
		mPointAppear(this.y);
	});
	charButton.on("mouseout", function(event){
		mPoint.alpha = 0;
	});
	
	lobbyButton.on("mouseover", function(event){
		mPointAppear(this.y);
	});
	lobbyButton.on("mouseout", function(event){
		mPoint.alpha = 0;
	});
	
	optionButton.on("mouseover", function(event){
		mPointAppear(this.y);
	});
	optionButton.on("mouseout", function(event){
		mPoint.alpha = 0;
	});
	
	creditButton.on("mouseover", function(event){
		mPointAppear(this.y);
	});
	creditButton.on("mouseout", function(event){
		mPoint.alpha = 0;
	});
	
	helpButton.on("mouseover", function(event){
		mPointAppear(this.y);
	});
	helpButton.on("mouseout", function(event){
		mPoint.alpha = 0;
	});
	
	// click events
	charButton.on("click", function(event){
		titleToBlack();
		window.location.replace("char.html");	// redirect to char.html
		// CharScreen();
	});
	lobbyButton.on("click", function(event){
		titleToBlack();
		window.location.replace("chat.html");
	});
	optionButton.on("click", function(event){
		titleToBlack();
	});
	creditButton.on("click", function(event){
		titleToBlack();
	});
	helpButton.on("click", function(event){
		titleToBlack();
	});
	
	function mPointAppear(buttonY){
		mPoint.y = buttonY - 4;
		mPoint.alpha = 1;
	}

	function titleToBlack(){
		//fade all except blackScn
		createjs.Tween.get(BGbitmap).to({alpha: 0}, 500, createjs.Ease.getPowInOut(2));
		createjs.Tween.get(titleImg).to({alpha: 0}, 500, createjs.Ease.getPowInOut(2));
		createjs.Tween.get(charButton).to({alpha: 0}, 500, createjs.Ease.getPowInOut(2));
		createjs.Tween.get(lobbyButton).to({alpha: 0}, 500, createjs.Ease.getPowInOut(2));
		createjs.Tween.get(optionButton).to({alpha: 0}, 500, createjs.Ease.getPowInOut(2));
		createjs.Tween.get(creditButton).to({alpha: 0}, 500, createjs.Ease.getPowInOut(2));
		createjs.Tween.get(helpButton).to({alpha: 0}, 500, createjs.Ease.getPowInOut(2)).call(function(){
			stage.removeChild(BGbitmap, titleImg, charButton, lobbyButton, optionButton, creditButton, helpButton);	//remove from stage after fade
		});
	}
	stage.update();

 }
 
function stop() {
	createjs.Ticker.removeEventListener("tick", tick);
}

