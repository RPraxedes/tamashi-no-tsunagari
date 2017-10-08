module.exports = {

	function showScreen(){  // shows the Character Creation Screen
		var BGbitmap = new createjs.Bitmap("../assets/img/char-background.png");
		BGbitmap.x = 0;
		BGbitmap.y = 0;
		BGbitmap.alpha = 0;

		var titleImg = new createjs.Bitmap("../assets/img/char-title.png");
		titleImg.x = 0;
		titleImg.y = 0;
		titleImg.alpha = 0;

		var BGMenu = new createjs.Bitmap("../assets/img/char-menu-bg.png");
		BGMenu.x = 0;
		BGMenu.y = 0;
		BGMenu.alpha = 0;

		stage.addChild(BGBitmap);

		createjs.Tween.get(BGBitmap).to({alpha: 1}, 1000, createjs.Ease.getPowInOut(2));

		stage.update();
	};

}
