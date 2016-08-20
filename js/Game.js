var PlatfomerGame = PlatformerGame || {};

//title screen
PlatformerGame.Game = function(){};

PlatformerGame.Game.prototype = {
    create: function() {

        this.button = this.game.add.button(this.game.world.width/2 -95, 50, 'button', this.jump, this, 0, 0, 1, 0);


        this.pole = this.game.add.sprite(this.game.world.width/2, 176, 'pole');
        this.pole.anchor.setTo(0.5, 0);
        this.game.physics.arcade.enable(this.pole);
        this.pole.body.immovable = true;
        
        this.pole2 = this.game.add.sprite(this.game.world.width/2, 173, 'empty');
        this.pole2.anchor.setTo(0.5, 0);
        this.game.physics.arcade.enable(this.pole2);
        this.pole2.body.immovable = true;
        this.pole2.body.setSize(4,2,0,0);
        

        this.player1 = this.game.add.sprite(49, 200, 'player1');
        this.player1.frame = 0; 

        //  We need to enable physics on the player
        this.game.physics.arcade.enable(this.player1);
        //this.game.camera.setSize(this.game.world.width, this.game.world.height);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player1.body.bounce.y = 0;
        this.player1.body.gravity.y = 400;
        this.player1.anchor.setTo(0.5);
        this.player1.body.collideWorldBounds = true;

        //this.game.camera.follow(this.player);

        //  Our two animations, walking left and right.
        this.player1.animations.add('left', [0, 1], 10, true);
        this.player1.animations.add('right', [0, 1], 10, true);

        this.player2 = this.game.add.sprite(349, 200, 'player2');
        this.player2.frame = 0; 

        //  We need to enable physics on the player
        this.game.physics.arcade.enable(this.player2);
        //this.game.camera.setSize(this.game.world.width, this.game.world.height);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player2.body.bounce.y = 0;
        this.player2.body.gravity.y = 400;
        this.player2.anchor.setTo(0.5);
        this.player2.body.collideWorldBounds = true;

        //this.game.camera.follow(this.player);

        //  Our two animations, walking left and right.
        this.player2.animations.add('left', [0, 1], 10, true);
        this.player2.animations.add('right', [0, 1], 10, true);


        this.ball = this.game.add.sprite(249, 20, 'ball');
        this.ball.frame = 0; 

        //  We need to enable physics on the player
        this.game.physics.arcade.enable(this.ball);
        //this.game.camera.setSize(this.game.world.width, this.game.world.height);

        //  Player physics properties. Give the little guy a slight bounce.
        this.ball.body.bounce.y = 0;
        this.ball.body.gravity.y = 400;
        this.ball.anchor.setTo(0.5);
        this.ball.body.collideWorldBounds = true;

        //this.game.camera.follow(this.player);

        //  Our two animations, walking left and right.
        this.ball.animations.add('left', [0, 1], 10, true);
        this.ball.animations.add('right', [0, 1], 10, true);


        //  The score
        this.scoreText = this.game.add.text(160, 6, 'Arcade Volleyball', { fontSize: '22px', fill: '#aaa' });
        //this.scoreText.fixedToCamera = true;
        this.player1score = 0;
        this.player2score = 0;
        this.player1scoreText = this.game.add.text(90, 6, this.player1score, { fontSize: '22px', fill: '#aaa' });
        this.player2scoreText = this.game.add.text(400, 6, this.player2score, { fontSize: '22px', fill: '#aaa' });

        //  Our controls.
//        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        this.timer = 0;
        this.ball.body.velocity.x = -100;
        this.ball.body.velocity.y = -100;

        this.showDebug = false; 
    },

    update: function() {

        if (this.ball.x < 30) {
            this.ball.body.velocity.x = Math.abs(this.ball.body.velocity.x);
        }
        if (this.ball.x > 470) {
            this.ball.body.velocity.x = -Math.abs(this.ball.body.velocity.x);
        }
        this.timer++;
        //  Collide the player and the stars with the platforms
        this.game.physics.arcade.collide(this.player1, this.pole);
        this.game.physics.arcade.collide(this.player2, this.pole);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.game.physics.arcade.overlap(this.player1, this.ball, this.bounce, null, this);
        this.game.physics.arcade.overlap(this.player2, this.ball, this.bounce, null, this);
        this.game.physics.arcade.overlap(this.pole, this.ball, this.bounce_side, null, this);
        this.game.physics.arcade.overlap(this.pole2, this.ball, this.bounce_up, null, this);


        //  Reset the players velocity (movement)
        this.player1.body.velocity.x = 0;
        this.player2.body.velocity.x = 0;


        if (this.player1.x > this.ball.x)
        {
            //  Move to the left
            //this.player.scale.setTo(-1, 1);
            this.player1.body.velocity.x = -150;

            this.player1.animations.play('left');
        }
        else if (this.player1.x < this.ball.x)
        {
            //  Move to the right
//            this.player.scale.setTo(1, 1);
            this.player1.body.velocity.x = 150;

            this.player1.animations.play('right');
        }
        else
        {
            //  Stand still
            this.player1.animations.stop();

            this.player1.frame = 0;
        }

        if (this.player2.x > this.ball.x && this.game.rnd.integerInRange(0, 300) < 100)
        {
            //  Move to the left
            //this.player.scale.setTo(-1, 1);
            this.player2.body.velocity.x = -150;

            this.player2.animations.play('left');
        }
        else if (this.player2.x < this.ball.x && this.game.rnd.integerInRange(0, 300) < 100)
        {
            //  Move to the right
//            this.player.scale.setTo(1, 1);
            this.player2.body.velocity.x = 150;

            this.player2.animations.play('right');
        }

        if (this.game.rnd.integerInRange(0, 200) < 10) {
            if (this.player2.body.blocked.down)
            {
                this.player2.body.velocity.y = -300;
            }
        }

        if (this.ball.y > 325) {
            if (this.ball.x < this.game.world.width/2) {
                this.player2score += 1;
                this.player2scoreText.text = this.player2score;
                this.ball.body.velocity.x = this.game.rnd.integerInRange(-80, -200);
                this.ball.body.velocity.y = this.game.rnd.integerInRange(-80, -200);
                this.ball.x = 249;
                this.ball.y = 20;
            }
            else {
                this.player1score += 1;
                this.player1scoreText.text = this.player1score;
                this.ball.body.velocity.x = this.game.rnd.integerInRange(80, 200);
                this.ball.body.velocity.y = this.game.rnd.integerInRange(80, 200);
                this.ball.x = 249;
                this.ball.y = 20;

            }

        }
        
    },
    bounce : function(player, ball) {

        this.ball.body.velocity.y = Math.min(-1*(Math.abs(player.body.velocity.y)+30), (-1*ball.body.velocity.y) + player.body.velocity.y);

    },
    bounce_side : function(pole, ball) {

        this.ball.body.velocity.x *= -1
    },
    bounce_up : function(pole, ball) {

        this.ball.body.velocity.y *= -1;

    },
    jump : function() {
                //  Allow the player to jump if they are touching the ground.
        if (this.player1.body.blocked.down)
        {
            this.player1.body.velocity.y = -300;
        }

    },

    render : function() {
  //                  this.game.debug.body(this.pole2);

    },
};