var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

const BALL_RADIUS = 4
const PADDLE_HEIGHT = 70
const PADDLE_WIDTH = 10;
const OFFSET = 20;
const COMPUTER_SPEED = 6;
const WIN_SCORE = 3;

var ballX = 5;
var ballY = 10;

var speedX = 10;
var speedY = 5;

var winScreen = false;

var playerY = 250;
var computerY = 250;

var playerScore = 0;
var computerScore = 0;

window.onload = function() {

    var frames = 30;
    setInterval(function() {
        animateBall();
        drawObjects();
    }, 1000/frames)

    canvas.addEventListener('mousedown', mouseClick);

    canvas.addEventListener('mousemove', function(evt) {
        var mousePosY = mouseLocation(evt);
        playerY = mousePosY - (PADDLE_HEIGHT / 2);
    });
}

function mouseClick() {
    if(winScreen) {
        playerScore = 0;
        computerScore = 0;
        winScreen = false;
    }
}

function drawObjects() {

    if (winScreen) {
        context.fillStyle = 'white'

        if (playerScore >= WIN_SCORE) {
            context.fillText(playerScore, 150, 100);
            context.fillText(computerScore, 450, 100);
            context.fillText("Player Won", 273, 84);
        } else if (computerScore >= WIN_SCORE) {
            context.fillText(playerScore, 150, 100);
            context.fillText(computerScore, 450, 100);
            context.fillText("Computer Won", 265, 84);
        }
        context.fillText("Click to Continue", 260, 205);
        return;
    }

    colorRectangles(0, 0, canvas.width, canvas.height, 'black');
    colorRectangles(0, playerY, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
    colorRectangles(canvas.width - PADDLE_WIDTH, computerY, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
    colorCircles(ballX, ballY, 8, 'white');

    drawNet();

    context.fillStyle = 'white'
    context.fillText(playerScore, 150, 100);
    context.fillText(computerScore, 450, 100);


}

function animateBall() {

    if (winScreen) {
        return;
    }

    moveComputer();

    ballX += speedX;
    ballY += speedY;

    if(ballX > canvas.width - BALL_RADIUS) {
        //player wins
        if (ballY > computerY && ballY < computerY + PADDLE_HEIGHT) {
            speedX = -speedX;

            var deltaY = ballY - (computerY + PADDLE_HEIGHT / 2);
            speedY = deltaY * .35;
        } else {
            playerScore++;
            resetBall();
        }
    }
    if(ballX < BALL_RADIUS) {
        //computer wins
        if (ballY > playerY && ballY < playerY + PADDLE_HEIGHT) {
            speedX = -speedX;

            var deltaY = ballY - (playerY + PADDLE_HEIGHT / 2);
            speedY = deltaY * .35;

        } else {
            computerScore++;
            resetBall();
        }
    }
    if(ballY > canvas.height) {
        speedY = -speedY;
    }
    if(ballY < 0) {
        speedY = -speedY;
    }
}

function drawNet() {
    for (var i = 14; i < canvas.height; i += 40) {
        colorRectangles(canvas.width / 2 - 2, i, 4, 14, 'white');
    }
}

function moveComputer() {
    if(computerY + PADDLE_HEIGHT / 2 < ballY - OFFSET) {
        computerY += COMPUTER_SPEED;
    } else if (computerY + PADDLE_HEIGHT / 2 > ballY + OFFSET) {
        computerY -= COMPUTER_SPEED;
    }
}

function mouseLocation(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    //var mouseX = (evt.clientX - rect.top - root.scrollTop);
    var mouseY = (evt.clientY - rect.top - root.scrollTop);
    return mouseY;
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

function resetBall() {
    if(playerScore >= WIN_SCORE || computerScore >= WIN_SCORE) {
        winScreen = true;
    }

    speedX = -speedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}
