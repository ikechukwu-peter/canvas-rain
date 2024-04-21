const initCanvasSpace = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
const canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");

window.addEventListener("DOMContentLoaded", () => initCanvasSpace());

window.addEventListener("resize", () => {
  initCanvasSpace();
  init();
});

// EVENTS
let mouse = {
  x: 0,
  y: 0,
};

window.addEventListener("mouseover", (event) => {
  const { x, y } = event;
  mouse.x = x;
  mouse.y = y;
});

class Rain {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = "#6699CC";
    c.fill();
  }

  update() {
    if (this.y - this.radius > innerHeight) {
      this.y = -this.radius; // Reset raindrop to the top if it falls off the bottom
    }

    const vx = mouse.x - this.x;
    const vy = mouse.y - this.y;
    const distance = Math.sqrt(vx * vx + vy * vy);

    if (distance < 50) {
      // Adjust horizontal position based on distance
      this.x += (vx / distance) * 2; // Increase 2 for sensitivity
    }

    this.y += this.dy; // Update y-coordinate

    this.draw();
  }
}

let rains = [];

const init = () => {
  rains = [];
  for (let i = 0; i < 100; i++) {
    const radius = Math.random() * 4 + 1;
    let x = Math.random() * innerWidth;
    let y = Math.random() * -innerHeight; // Start above the screen
    let dx = (Math.random() - 0.5) * 2;
    let dy = Math.random() * 2 + 1; // Ensure it always falls down
    const rain = new Rain(x, y, dx, dy, radius);
    rains.push(rain);
  }
};

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  rains.forEach((rain) => rain.update());
}

animate();
init();
