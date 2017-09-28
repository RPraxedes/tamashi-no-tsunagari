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
	
	//Character Option
	var titleCharOption = new createjs.Text("Character", "20px Arial", "white");
	titleCharOption.x = 565;
	titleCharOption.y = 450;
	titleCharOption.alpha = 0;
	
	//Lobby Option
	var titleLobbyOption = new createjs.Text("Lobby", "20px Arial", "white");
	titleLobbyOption.x = 565;
	titleLobbyOption.y = 480;
	titleLobbyOption.alpha = 0;
	
	//Options Option
	var titleOptionOption = new createjs.Text("Options", "20px Arial", "white");
	titleOptionOption.x = 565;
	titleOptionOption.y = 510;
	titleOptionOption.alpha = 0;
	
	//Credits Option
	var titleCreditOption = new createjs.Text("Credits", "20px Arial", "white");
	titleCreditOption.x = 565;
	titleCreditOption.y = 540;
	titleCreditOption.alpha = 0;
	
	//Help Option
	var titleHelpOption = new createjs.Text("Help", "20px Arial", "white");
	titleHelpOption.x = 565;
	titleHelpOption.y = 570;
	titleHelpOption.alpha = 0;
	
	//Quit Option
	var titleQuitOption = new createjs.Text("Quit", "20px Arial", "white");
	titleQuitOption.x = 565;
	titleQuitOption.y = 600;
	titleQuitOption.alpha = 0;
	
	stage.addChild(blackScn, BGbitmap,
	titleImg,
	titleCharOption,
	titleLobbyOption,
	titleOptionOption,
	titleCreditOption,
	titleHelpOption,
	titleQuitOption);	// load to app
	
	// sequential ease in loading
	createjs.Tween.get(BGbitmap).to({ alpha: 1 }, 1000, createjs.Ease.getPowInOut(2))
		.call(function(){
			createjs.Tween.get(titleImg).to({ alpha: 1 }, 1000, createjs.Ease.getPowInOut(2))
			.call(function(){
				createjs.Tween.get(titleCharOption).to({ alpha: 1 }, 500, createjs.Ease.getPowInOut(2))
				.call(function(){
					createjs.Tween.get(titleLobbyOption).to({ alpha: 1 }, 500, createjs.Ease.getPowInOut(2))
					.call(function(){
						createjs.Tween.get(titleOptionOption).to({ alpha: 1 }, 500, createjs.Ease.getPowInOut(2))
						.call(function(){
							createjs.Tween.get(titleCreditOption).to({ alpha: 1 }, 500, createjs.Ease.getPowInOut(2))
							.call(function(){
								createjs.Tween.get(titleHelpOption).to({ alpha: 1 }, 500, createjs.Ease.getPowInOut(2))
								.call(function(){
									createjs.Tween.get(titleQuitOption).to({ alpha: 1 }, 500, createjs.Ease.getPowInOut(2));
								});
							});
						});
					});
				});
			});
		});	//quadratic ease in from alpha 0 to 1 in 1000 ms
		
	/* var circle = new createjs.Shape();
	circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
	circle.x = 100;
	circle.y = 100;
	stage.addChild(circle); 
	
	https://medium.freecodecamp.org/building-a-chat-application-with-mean-stack-637254d1136d
	https://code.tutsplus.com/tutorials/real-time-chat-with-nodejs-socketio-and-expressjs--net-31708
	
	http://createjs.com/tutorials/Mouse%20Interaction/
	https://github.com/CreateJS/EaselJS/wiki/Articles-and-Tutorials
	*/
	
	titleCharOption.on("click", function(event){
		titleToBlack();
	});
	titleLobbyOption.on("click", function(event){
		titleToBlack();
	});
	titleOptionOption.on("click", function(event){
		titleToBlack();
	});
	titleCreditOption.on("click", function(event){
		titleToBlack();
	});
	titleHelpOption.on("click", function(event){
		titleToBlack();
	});
	titleQuitOption.on("click", function(event){
		titleToBlack();
	});
	
	function titleToBlack(){
		//fade all except blackScn
		createjs.Tween.get(BGbitmap).to({alpha: 0}, 500, createjs.Ease.getPowInOut(2));
		createjs.Tween.get(titleImg).to({alpha: 0}, 500, createjs.Ease.getPowInOut(2));
		createjs.Tween.get(titleCharOption).to({alpha: 0}, 500, createjs.Ease.getPowInOut(2));
		createjs.Tween.get(titleLobbyOption).to({alpha: 0}, 500, createjs.Ease.getPowInOut(2));
		createjs.Tween.get(titleOptionOption).to({alpha: 0}, 500, createjs.Ease.getPowInOut(2));
		createjs.Tween.get(titleCreditOption).to({alpha: 0}, 500, createjs.Ease.getPowInOut(2));
		createjs.Tween.get(titleHelpOption).to({alpha: 0}, 500, createjs.Ease.getPowInOut(2));
		createjs.Tween.get(titleQuitOption).to({alpha: 0}, 500, createjs.Ease.getPowInOut(2)).call(function(){
			stage.removeChild(BGbitmap, titleImg, titleCharOption, titleLobbyOption, titleOptionOption, titleCreditOption, titleHelpOption, titleQuitOption);	//remove from stage after fade
		});
	}
	stage.update();
}

function stop() {
	createjs.Ticker.removeEventListener("tick", tick);
}