var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var ballX = 5;
var ballY = 10;

var speedX = 5;
var speedY = 5;

const PADDLE_HEIGHT = 70
var playerY = 250;
var computerY = 250;

window.onload = function() {

    var frames = 30;
    setInterval(function() {
        animateBall();
        drawObjects();
    }, 1000/frames)

    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = mouseLocation(evt);
        playerY = mousePos - (PADDLE_HEIGHT / 2);
    });
}

function drawObjects() {

    colorRectangles(0, 0, canvas.width, canvas.height, 'black');
    colorRectangles(0, playerY, 10, PADDLE_HEIGHT, 'white');
    colorRectangles(canvas.width - 10, computerY, 10, PADDLE_HEIGHT, 'white');
    colorCircles(ballX, ballY, 8, 'white');

}

function animateBall() {

    ballX += speedX;
    ballY += speedY;

    if(ballX > canvas.width - 4) {
        speedX = -speedX;
    }
    if(ballX < 4) {
        speedX = -speedX;
    }
    if(ballY > canvas.height - 4) {
        speedY = -speedY;
    }
    if(ballY < 4) {
        speedY = -speedY;
    }

}

function mouseLocation(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    return (evt.clientY - rect.top - root.scrollTop);
}

function colorRectangles(x, y, height, width, color) {
    context.fillStyle = color;
    context.fillRect(x, y, height, width);
}

function colorCircles(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, true);
    context.fill();
}
