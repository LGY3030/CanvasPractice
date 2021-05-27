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


function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.strokeStyle = "orange"
        c.stroke();
    }

    this.update = function(){
        if(this.x+this.radius > window.innerWidth || this.x-radius < 0) this.dx=-this.dx;
        if(this.y+this.radius > window.innerHeight || this.y-radius < 0) this.dy=-this.dy;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

var circleArray = [];
for(var i=0; i<100; i++){
    var x = Math.random() * (window.innerWidth-radius*2)+radius;
    var y = Math.random() * (window.innerHeight-radius*2)+radius;
    var dx = (Math.random() - 0.5) * 8;
    var dy = (Math.random() - 0.5) * 8;
    var radius = 30;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for(var i=0; i<circleArray.length; i++){
        circleArray[i].update();
    }
}
animate();

