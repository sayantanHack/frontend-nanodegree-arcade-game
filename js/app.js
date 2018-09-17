
 // Get Random Number
let randomNumber = () => Math.floor((Math.random() * 3) + 1);

// Win Modal
var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
};

function windowOnClick(e) {
    if (e.target === modal) {
        toggleModal();
    }
};

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

class Enemy{
    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.x = 0;
        this.y = randomNumber()*70;
        this.speed = randomNumber()*100;
    }

    update(dt) {
        // multiplying any movement by the dt parameter
        // ensures the game runs at the same speed for
        // all computers.
        if(this.x >= 500){
            this.x = 0;
            this.y = randomNumber()*70;
        }
        this.x += this.speed * dt;
    }

    render(){

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// player class
class Player{
    constructor(){
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 410;
        this.speed = 20;
        this.win = 0;
        this.life = 5;
        this.game = true;
    }

    reset(){
        this.x = 200;
		this.y = 410;
    }

    gameReset(){
        this.life = 5;
		this.win = 0;
		this.game = true;
		this.reset();
    }

    scoreWin(){
        this.win += 10;
        toggleModal();
        this.reset();

    }

    scoreLost(){
        this.win -= 5;
	    this.life -= 1;
    }

    checkCollisions(){
        for (var i = 0; i < allEnemies.length; i++) {
            if ((allEnemies[i].x) <= (this.x + 75) &&
                (allEnemies[i].x) >= (this.x - 75) &&
                (allEnemies[i].y)<= (this.y + 36) &&
                (allEnemies[i].y) >= (this.y - 36)) {
                        this.scoreLost();
                        alert('Ohh Noo !! \n You Just crashed . \n Play again')
                        this.reset();
            }
        }
    }

    checkForWinner(){
        if (this.y <=10){
            this.scoreWin();
        }
    }

    update(){
        this.checkCollisions();
        this.checkForWinner();
        if (this.game === true){
            this.checkGameOver();
        }
        if(this.y <= 5){
            this.reset();
        }
    }

    checkGameOver(){
        if (this.life === 0){
            alert('Ah Ho! You missed it.\n Keep trying');
            this.game = false;
            this.gameReset();
		}
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(inputKey){
        switch (inputKey) {
            case 'left':
              this.x <= 10 ? this.x = 0 : this.x -= 100;
              break;
            case 'right':
              this.x >= 400 ? this.x = 400 : this.x += 100;
              break;
            case 'up':
              this.y <= 10 ? this.y = -10 : this.y -= 40;
              break;
            case 'down':
              this.y >= 400 ? this.y = 400 : this.y += 80;
              break;
          }
    }
};



// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// instantiating objects.
// All enemy objects are placed in an array called allEnemies
// player object is placed in a variable called player

const allEnemies = [
                    new Enemy(),
                    new Enemy(),
                    new Enemy()
                ];
const player = new Player();
