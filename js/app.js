// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x =+ this.speed * dt;

    if (this.x > 510) {
      this.x = -50;
      this.speed = 100+Math.floor(Math.random() * 222);
    }

    if(player.x < this.x + 20 && player.x + 80 > this.x &&
      player.y < this.y + 60 && 60 + player.y > this.y){
        player.x = 202;
        player.y = 405;
      }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var player = function(x,y){
    this.x = x;
    this.y =y;
    this.player = 'images/char-horn-girl.png';
}

player.prototype.update = function(dt) {

}

player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

player.prototype.handleInput = function(keyPress){
  if(keyPress == 'left' && this.x > 0){
    this.x -= 102;
  }
  if(keyPress == 'right' && this.x < 405){
    this.x += 102;
  }
  if(keyPress == 'up' && this.y > 0){
    this.x -= 83;
  }
  if(keyPress == 'down' && this.y < 405){
    this.x += 83;
  }
  if(this.y < 0) {
    setTimeout(funtion(){
      player.x = 202;
      player.y = 405;
    }, 600);
  }
}

var allEnemies = [];
var enemyLocation = [63, 147, 230];

enemyLocation.forEach(function (locationY){
  enemy = new Enemy(0, locationY, 200);
  allEnemies.push(enemy);
});
var player = new Player(202, 405);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
