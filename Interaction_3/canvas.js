var canvas = document.querySelector("canvas");

//width & height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// function Circle(x, y, dx, dy, radius){
//     this.x = x;
//     this.y = y;
//     this.dx = dx;
//     this.dy = dy;
//     this.radius = radius;
//     this.draw = function(){
//         c.beginPath();
//         c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
//         c.strokeStyle = "orange"
//         c.stroke();
//     }

//     this.update = function(){
//         if(this.x+this.radius > window.innerWidth || this.x-radius < 0) this.dx=-this.dx;
//         if(this.y+this.radius > window.innerHeight || this.y-radius < 0) this.dy=-this.dy;
//         this.x += this.dx;
//         this.y += this.dy;
//         this.draw();
//     }
// }

// var circle = new Circle(200, 200, 4, 4, 30);


// var x = Math.random() * window.innerWidth;
// var y = Math.random() * window.innerHeight;
// var dx = (Math.random() - 0.5) * 8;
// var dy = (Math.random() - 0.5) * 8;
// var radius = 30;
// function animate() {
//     requestAnimationFrame(animate);
//     c.clearRect(0, 0, window.innerWidth, window.innerHeight);

//     circle.update();

//     c.beginPath();
//     c.arc(x, y, radius, 0, Math.PI*2, false);
//     c.strokeStyle = "orange"
//     c.stroke();

//     if(x+radius > window.innerWidth || x-radius < 0) dx=-dx;
//     if(y+radius > window.innerHeight || y-radius < 0) dy=-dy;
//     x += dx;
//     y += dy;
// }
// animate();

var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius = 40;
var minRadius = 2;

var colorArray = [
    '#ffaa33',
    '#99ffaaa',
    '#00ff00',
    '#4411aa',
    '#ff1100'
];

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function(event){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.strokeStyle = "pink";
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function(){
        if(this.x+this.radius > window.innerWidth || this.x-radius < 0) this.dx=-this.dx;
        if(this.y+this.radius > window.innerHeight || this.y-radius < 0) this.dy=-this.dy;
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if(Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50){
            if(this.radius < maxRadius) this.radius += 1;
        }
        else if(this.radius > this.minRadius){
            this.radius -= 1;
        }


        this.draw();
    }
}

var circleArray = [];
function init(){
    circleArray = [];
    for(var i=0; i<800; i++){
        var x = Math.random() * (window.innerWidth-radius*2)+radius;
        var y = Math.random() * (window.innerHeight-radius*2)+radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        var radius = Math.random()*3+1;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for(var i=0; i<circleArray.length; i++){
        circleArray[i].update();
    }
}
init();
animate();

