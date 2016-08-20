var PlatformerGame = PlatformerGame || {};

//loading the game assets
PlatformerGame.Preload = function(){};

PlatformerGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    this.game.load.spritesheet('logo-tiles', 'assets/images/logo-tiles.png', 17, 16);
    this.game.load.spritesheet('tiles', 'assets/images/bitslap-minild62.png', 16, 16);
    this.game.load.image('gamejam', 'assets/images/onehourgamejamlogo.png');
    this.game.load.audio('splash', 'assets/audio/onehourgamejamsplash.ogg');
    this.game.load.spritesheet('player1', 'assets/images/player1.png', 62, 53);
    this.game.load.spritesheet('player2', 'assets/images/player2.png', 62, 53);
    this.game.load.spritesheet('ball', 'assets/images/ball.png', 50, 42);
    this.game.load.spritesheet('button', 'assets/images/button.png', 190, 49);
    this.game.load.image('pole', 'assets/images/pole.png');
    this.game.load.image('empty', 'assets/images/empty.png');
  },
  create: function() {
    var colour = "222";
    var timeout = 2;
    this.state.start('Logo', true, false, colour, timeout);
  }
};
