import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.velocity = {
      x: (Math.random() - 0.5) * 5,
      y: (Math.random() - 0.5) * 5
    }
    this.radius = radius
    this.color = color
    this.mass = 1;
    this.opacity = 0;
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.save();
    c.globalAlpha = this.opacity;
    c.fillStyle = this.color;
    c.fill();
    c.restore();
    c.strokeStyle = this.color
    c.stroke()
    c.closePath()
  }

  update(particles) {
    this.draw();
    for(var i=0; i<particles.length; i++){
      if(this === particles[i]) continue;
      if(utils.distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius*2 < 0){
        resolveCollision(this, particles[i])
      }
    }

    if(this.x - this.radius <= 0 || this.x + this.radius >= canvas.width){
      this.velocity.x = -this.velocity.x;
    }
    if(this.y - this.radius <= 0 || this.y + this.radius >= canvas.height){
      this.velocity.y = -this.velocity.y;
    }

    if(utils.distance(mouse.x, mouse.y, this.x, this.y) < 120 && this.opacity < 0.5){
      this.opacity += 0.05;
    }
    else if(this.opacity > 0){
      this.opacity -= 0.05;
      this.opacity = Math.max(0, this.opacity)
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

function rotate(velocity, angle) {
  const rotatedVelocities = {
      x: velocity.x * Math.cos(angle) + velocity.y * Math.sin(angle),
      y: -velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

      // Grab angle between the two colliding particles
      const angle = Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

      // Store mass in var for better readability in collision equation
      const m1 = particle.mass;
      const m2 = otherParticle.mass;

      // Velocity before equation
      const u1 = rotate(particle.velocity, angle);
      const u2 = rotate(otherParticle.velocity, angle);

      // Velocity after 1d collision equation
      const v1 = {
          x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
          y: u1.y
      };
      const v2 = {
          x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),

          y: u2.y
      };

      // Final velocity after rotating axis back to original location
      const vFinal1 = rotate(v1, -angle);
      const vFinal2 = rotate(v2, -angle);

      // Swap particle velocities for realistic bounce effect
      particle.velocity.x = vFinal1.x;
      particle.velocity.y = vFinal1.y;

      otherParticle.velocity.x = vFinal2.x;
      otherParticle.velocity.y = vFinal2.y;
  }
}

// Implementation
let particles;
function init() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    var radius = 15;
    var x = utils.randomIntFromRange(radius, canvas.width-radius);
    var y = utils.randomIntFromRange(radius, canvas.height-radius);
    var color = utils.randomColor(colors);

    if(i != 0){
      for(var j=0; j<particles.length; j++){
        if(utils.distance(x, y, particles[j].x, particles[j].y) - radius*2 < 0){
          x = utils.randomIntFromRange(radius, canvas.width-radius);
          y = utils.randomIntFromRange(radius, canvas.height-radius);
          j=-1;
        }
      }
    }

    particles.push(new Particle(x, y, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < particles.length; i++) {
    particles[i].update(particles);
  }
}

init()
animate()
