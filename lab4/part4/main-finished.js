const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Shape class as a base for other objects (ball, evil circle)
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Ball class inherits from Shape class
class Ball extends Shape {
  constructor(x, y, velX, velY, size, color) {
    super(x, y, velX, velY);
    this.size = size;
    this.color = color;
    this.exists = true;  // To track if the ball exists
  }

  // Draw the ball
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Update the ball's position
  update() {
    if (this.x + this.size >= canvas.width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }
    if (this.y + this.size >= canvas.height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  // Check if the ball should be eaten by the evil circle
  checkCollision(evilCircle) {
    const dx = this.x - evilCircle.x;
    const dy = this.y - evilCircle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < this.size + evilCircle.size) {
      this.exists = false;  // Ball gets eaten
    }
  }
}

// EvilCircle class inherits from Shape class
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);  // Movement speed
    this.color = 'white';
    this.size = 10;  // Radius of the evil circle
  }

  // Draw the evil circle
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;  // Thicker outline for visibility
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // Check bounds to ensure the evil circle doesn't go off-screen
  checkBounds() {
    if (this.x - this.size <= 0) {
      this.x = this.size;
    } else if (this.x + this.size >= canvas.width) {
      this.x = canvas.width - this.size;
    }

    if (this.y - this.size <= 0) {
      this.y = this.size;
    } else if (this.y + this.size >= canvas.height) {
      this.y = canvas.height - this.size;
    }
  }

  // Handle movement of the evil circle using WASD keys
  move() {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'a': this.x -= this.velX; break;
        case 'd': this.x += this.velX; break;
        case 'w': this.y -= this.velY; break;
        case 's': this.y += this.velY; break;
      }
    });
  }
}

// Create balls with random attributes
const balls = [];
const evilCircle = new EvilCircle(canvas.width / 2, canvas.height / 2);
evilCircle.move();

// Ball count display element
const ballCountElement = document.getElementById('ballCount');

// Function to generate a new ball
function generateBall() {
    const size = Math.random() * 20 + 10;
    const ball = new Ball(
      Math.random() * (canvas.width - size * 2) + size,
      Math.random() * (canvas.height - size * 2) + size,
      Math.random() * 10 - 5,  // Increased ball speed range (-5 to 5)
      Math.random() * 10 - 5,  // Increased ball speed range (-5 to 5)
      size,
      'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')'
    );
    balls.push(ball);
  }

// Function to update ball count
function updateBallCount() {
  const aliveBalls = balls.filter(ball => ball.exists).length;
  ballCountElement.textContent = `Ball count: ${aliveBalls}`;
}

// Main loop function
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Set background color to black
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Update and draw the evil circle
  evilCircle.checkBounds();
  evilCircle.draw();

  // Update, draw, and check collisions for balls
  balls.forEach((ball) => {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.checkCollision(evilCircle);
    }
  });

  // Update the ball count
  updateBallCount();

  // Request next frame
  requestAnimationFrame(loop);
}

// Generate balls initially
for (let i = 0; i < 10; i++) {
  generateBall();
}

loop();  // Start the animation loop
