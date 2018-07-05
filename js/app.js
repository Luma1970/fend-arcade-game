// array for random position and speed of enemies
let arraY = [61, 132, 223];
let arraySp = [150, 200, 250, 300, 350];

// created Enemy class
class Enemy {
    constructor() {
    // added variables for enemy: image, position, speed and dimensions
    this.sprite = 'images/enemy-bug.png';
    this.x = -10;
    this.y = arraY[Math.floor(Math.random() * arraY.length)];
    this.height = 45;
    this.width = 45;
    this.speed = arraySp[Math.floor(Math.random() * arraySp.length)];
    }

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
        // if enemy reach right limit get out of canvas
        // then enter again at a random Y position and speed from respective arrays
        if(this.x > 505) {
            this.x = -10;
            this.y = arraY[Math.floor(Math.random() * arraY.length)];
            this.speed = arraySp[Math.floor(Math.random() * arraySp.length)];
        }
    }

// Draw the enemy on the screen, required method for game
    render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// created Player class
class Player {
    constructor() {
        this.image = 'images/char-horn-girl.png';
        this.x = 200;
        this.y = 350;
        this.height = 45;
        this.width = 45;
    }
    // implemented the collisions with enemies based on enemy and player dimensions
    //if the collision is true the player return to starting point
    update() {
        for(const enemy of allEnemies) {
            if(enemy.x < this.x + this.width && enemy.x + enemy.width > this.x && enemy.y < this.y + this.height && enemy.y + enemy.height > this.y) {
                this.x = 200;
                this.y = 350;
            }
        //implemented the victory condition with a sound, a stop of the enemies, a change of the player image
            if(this.y <= 0) {
                const sonoro = document.getElementById('suono');
                sonoro.play();
                this.image = 'images/char-princess-girl.png';
                enemy.speed = 0;
            }
        }
    }
// Draw the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.image), this.x, this.y);
    }
    //implemented handleInput method to move the player
    handleInput(key) {
            switch(key) {
                case 'up':
                    if(this.y > 0) {
                        this.y -= 101;
                    }
                break;

                case 'right':
                    if(this.x < 404) {
                        this.x += 101;
                    }
                break;

                case 'down':
                    if(this.y < 404) {
                        this.y += 101;
                    }
                break;

                case 'left':
                    if(this.x > 0) {
                        this.x -= 101;
                    }
            }
        }
    }

// instantiate the objects
let player = new Player();
let nemico1 = new Enemy();
let nemico2 = new Enemy();
let nemico3 = new Enemy();
let allEnemies = [nemico1, nemico2, nemico3];


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

//implemented Play Again button
let reloadPage = document.getElementById('playAgain');
reloadPage.addEventListener('click', function() {
    window.location.reload();
})
