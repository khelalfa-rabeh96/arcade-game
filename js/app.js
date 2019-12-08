// Enemies our player must avoid
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
        console.log("Out of the box");
        console.log(this.speed);
    }

    // Reset the player postion when he collides with a player
    if((player.x -60 <= this.x &&  this.x <= player.x+60 ) && (player.y -60 <= this.y &&  this.y <= player.y+60)){
        
        setTimeout(function(){
            player.resetPosition();
        }, 200);
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
    this.sprite = 'images/char-boy.png';
    this.x = posX;
    this.y = posY;
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
    }

    if(keyup == 'up' && this.y > 0){
        this.y -= 83;
        console.log(this.y);
    }

     if(keyup == 'down' && this.y < 370){
        this.y += 83;
    }

};

// Function to reset the player to the initial postion
Player.prototype.resetPosition = function(){
    this.x = 200;
    this.y = 400;
} 

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
var e1 = new Enemy(-140, 58, 300),
    e2 = new Enemy(-140, 141, 300),
    e3 = new Enemy(-140, 224, 300);
var allEnemies = [e1, e2, e3];

var player = new Player(200, 390);
console.log(player);


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
