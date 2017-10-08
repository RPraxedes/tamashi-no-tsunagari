/* // Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
// canvas.width  = window.innerWidth;
// canvas.height = window.innerHeight;
canvas.width  = 1280;
canvas.height = 720;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "../assets/img/background.png";

// Title image
var titleReady = false;
var titleImage = new Image();
titleImage.onload = function(){
	titleReady = true;
};
titleImage.src = "../assets/img/title.png"

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "../assets/img/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "../assets/img/monster.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if(titleReady){
		ctx.drawImage(titleImage, 323, 262);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
 */

 function init() {
	//EventDispatcher.initialize(MyClass.prototype);	// initialize event dispatcher. handles events
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
	var titleLobby = new createjs.Text("Lobby", "20px Arial", "black");
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
		CharScreen();
	});
	lobbyButton.on("click", function(event){
		titleToBlack();
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

	function CharScreen(){
		var CharBG = new createjs.Bitmap("../assets/img/char-background.png");
			CharBG.x = 0;
			CharBG.y = 0;
			CharBG.alpha = 0;

			var CharTitleImg = new createjs.Bitmap("../assets/img/char-title.png");
			CharTitleImg.x = 30;
			CharTitleImg.y =50;
			CharTitleImg.alpha = 0;

			// Character Menu Container
			var CharMenu = new createjs.Container();
			var CharMenuBG = new createjs.Bitmap("../assets/img/char-menu-bg.png");
			CharMenu.x = 650;
			CharMenu.y = 100;
			CharMenu.alpha = 0;

			
			CharMenu.addChild(CharMenuBG);	// add menus to container
			
			//hair color slider (not in CharMenu container)
			var hcslider = new createjs.Container();	//hair color slider
			var hcrail = new createjs.Shape(new createjs.Graphics().beginStroke("#555").setStrokeStyle(1).beginFill("#3c3c3c").drawRect(0, 7, 255, 6));
			var hchandle = new createjs.Shape(new createjs.Graphics().beginStroke("#3c3c3c").setStrokeStyle(1).beginFill("#e6e6e6").drawRect(-4, 0, 8, 20));
			hcslider.addChild(hcrail, hchandle);
				hcslider.alpha = 0;
				hcslider.x = 848;
				hcslider.y = 273;
				
				
			var CharItemTxt = new createjs.Text("Name\n\nEyes\n\nHead\n\nHair Color\n\n\nExpression", "20px Arial", "black");
			CharItemTxt.x = 700;
			CharItemTxt.y = 150;
			CharItemTxt.alpha = 0;
			
			stage.addChild(
				CharBG,
				CharTitleImg,
				CharMenu,
				CharItemTxt,
				hcslider
			);

			createjs.Tween.get(CharBG).to({alpha: 1}, 1000, createjs.Ease.getPowInOut(2));
			createjs.Tween.get(CharTitleImg).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
			createjs.Tween.get(CharMenu).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
			createjs.Tween.get(CharItemTxt).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
			createjs.Tween.get(hcslider).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
			
			// default parts
			previewPart("body", 1);
			previewPart("face", 1);
			previewPart("exp", 1);
	}

	function previewPart(part, num){
		
		var xpos = 150;
		var ypos = 95;
		var scale = 0.7;
		
		var part = new createjs.Bitmap("../assets/img/char/"+part+"_1_"+num+".png");
		part.x = xpos;
		part.y = ypos;
		part.alpha = 0;
		
		stage.addChild(part);
		
		createjs.Tween.get(part).to({scaleX: scale, scaleY: scale}).to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));
		
		stage.update();
	}
 }
 
function stop() {
	createjs.Ticker.removeEventListener("tick", tick);
}

