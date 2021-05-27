var canvas = document.querySelector("canvas");

//width & height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//rectangle
c.fillStyle = "rgba(255, 0, 0, 0.1)";
c.fillRect(100, 100, 100, 100);
c.fillStyle = "rgba(255, 0, 0, 0.5)";
c.fillRect(200, 200, 100, 100);
c.fillStyle = "rgba(255, 0, 0, 1)";
c.fillRect(300, 300, 100, 100);

//line
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 50);
c.lineTo(400, 300);
c.strokeStyle = "blue";
c.stroke();


//arc & circle
c.beginPath();
c.arc(300, 300, 30, 0, Math.PI*2, false);
c.strokeStyle = "orange"
c.stroke();

for(var i=0; i<300; i++){
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI*2, false);
    c.strokeStyle = "orange"
    c.stroke();
}
