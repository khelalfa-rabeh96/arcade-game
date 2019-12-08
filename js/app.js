// Enemies our player must avoid
var scoreContainer = document.getElementById('score'),
    livesContainer = document.getElementById('lives');
var Enemy = function(posX, posY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = posX;
    this.y = posY;
    this.speed = speed + randomAdditionalSpeed();
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if(this.x > 550){
        this.x = -140;
        this.speed  = 300 + randomAdditionalSpeed();
    }

    // Reset the player postion when he collides with a player
    if((player.x -60 <= this.x &&  this.x <= player.x+60 ) && (player.y -60 <= this.y &&  this.y <= player.y+60)){            
            
            
            player.resetPosition();
            player.addLife(-1);

            if(player.lives === 0){
                player.gameOver();
            }
            player.resetScore();

    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player Class
Player = function(posX, posY){
    
    this.x = posX;
    this.y = posY;
    this.maxUp = posY;
    this.score = 0;
    this.characters = ['images/char-boy.png', 'images/char-cat-girl.png',
                       'images/char-pink-girl.png', 'images/char-horn-girl.png',
                       'images/char-princess-girl.png'];
    this.currentCharacterIndex = 0;
    this.sprite = this.characters[this.currentCharacterIndex];
    this.lives = 3;
    this.loseGame = false;

}


Player.prototype.update = function() {
    // If the player reach to the water reset it's position
    if(this.y <= -15){
        var $this = this;
        setTimeout(function(){
            $this.resetPosition();
        }, 400);
        
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    Enemy.prototype.render.call(this);
};

// Fucntion to handle the key input event and move the player
Player.prototype.handleInput = function(keyup){
    if(keyup == 'left' && this.x > 0){
        this.x -= 101;
    }

    if(keyup == 'right' && this.x < 305){
        
        this.x += 101;
        
        if(this.x === 402){
            setTimeout(function(){
                player.changeCharacter();
            },200);
        }
    }

    if(keyup == 'up' && this.y > 0){
        this.y -= 83;
        
        if(this.y <= 224 && this.y < this.maxUp){
           player.addScore(10);
           this.maxUp = this.y; 
        }
        
    }

     if(keyup == 'down' && this.y < 370){
        this.y += 83;
    }

};

// Function to reset the player to the initial postion
Player.prototype.resetPosition = function(){
    this.x = 200;
    this.y = 390;
    this.maxUp = this.y;
} 

Player.prototype.addScore = function(someScore) {
    this.score += someScore;
    scoreContainer.textContent = ''+ this.score;
};

Player.prototype.resetScore = function() {
    this.addScore(- this.score);
};

Player.prototype.changeCharacter = function() {
    if(this.currentCharacterIndex === 4){
        this.currentCharacterIndex = 0;

    }else{
        this.currentCharacterIndex +=1;
    }
    this.sprite = this.characters[this.currentCharacterIndex];
};

Player.prototype.addLife = function(nbr) {
    this.lives += nbr;
    livesContainer.textContent = ''+this.lives;
};

Player.prototype.gameOver = function() {
    this.loseGame = false;
    alert('You losed the Game\n Your Score : '+ this.score);
    this.resetPosition();
    this.resetScore();
    this.addLife(3);
};

// Function that return a random speed between -90 and 90
function randomAdditionalSpeed(){
    var increaseOrDecrease = "-+",
        speedStatus = increaseOrDecrease[Math.floor(Math.random() * increaseOrDecrease.length)];
        randomSpeed = -Math.floor(Math.random()*10)*15;
        extraSpeed =  speedStatus === '-' ? -randomSpeed : randomSpeed;

    return extraSpeed;
    
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


//console.log("ctx is : " + ctx);
var e1 = new Enemy(-140, 58, 300),
    e2 = new Enemy(-140, 141, 300),
    e3 = new Enemy(-140, 224, 300);
var allEnemies = [e1, e2, e3];

var player = new Player(200, 390);
console.log(player);

// Add the score to the game
scoreContainer.textContent =''+player.score;
livesContainer.textContent =''+player.lives;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
