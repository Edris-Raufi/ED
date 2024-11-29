const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Check if canvas is found
console.log(canvas, ctx);

// Set the canvas dimensions to match the window
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
console.log(`Canvas size: ${width}x${height}`);

// Utility function to generate a random number between min and max
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Utility function to generate a random RGB color
function randomRGB() {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

// Ball class definition
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  // Method to draw the ball on the canvas
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Method to update the ball's position and handle bouncing off walls
  update() {
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
      this.velX = -this.velX; // Reverse horizontal velocity
    }

    if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
      this.velY = -this.velY; // Reverse vertical velocity
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  // Method to detect collisions with other balls
  collisionDetect(balls) {
    for (const ball of balls) {
      if (this !== ball) { // Avoid self-collision
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          // Change color of both balls if they collide
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// Create an array to hold the balls
const balls = [];
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );
  balls.push(ball);
}

// Animation loop to update and draw the balls
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height); // Clear the canvas with a semi-transparent background

  // Update and draw each ball
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect(balls); // Check for collisions with other balls
  }

  // Request the next frame
  requestAnimationFrame(loop);
}

// Start the animation loop
loop();
