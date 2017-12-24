const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//define unit
const box = 32;

//load files
const playfield = new Image();
playfield.src = "resources/canvas.png";
const foodImg = new Image();
foodImg.src = "resources/fruit_snakegame.png";

let dead = new Audio();
dead.src = "resources/gameover.mp3";
let eat = new Audio();
eat.src = "resources/powerup.mp3";


//create snake
let snake = [];
//snake head
snake[0] = {
    x: 9*box,
    y: 10*box
};

//create food
let food = {
    x: Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

//create score var
let score = 0;

//control the snake
let d;
document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d!="RIGHT") {
        d = "LEFT";
    }else if (key == 38 && d!="DOWN") {
        d = "UP";
    }else if (key == 39 && d!="LEFT") {
        d = "RIGHT";
    }else if (key == 40 && d!="UP") {
        d = "DOWN";
    }
}

//function to check collision with the snake's body
function collision(head, array) {
    for (let i=0; i<array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

//function to draw everything
function draw() {
    //draw the playfield/canvas
    ctx.drawImage(playfield,0,0)
    //loop the snake
    for (let i=0; i<snake.length; i++) {
        //fillStyle is green if it's then snake head, elese it's white
        ctx.fillStyle = (i==0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        //stroke style for each snake part will be red
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    //spawn the fruit
    ctx.drawImage(foodImg, food.x, food.y);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //direction to move
    if (d == 'LEFT') {
        snakeX -= box;
    }
    if (d == 'UP') {
        snakeY -= box;
    }
    if (d == 'RIGHT') {
        snakeX += box;
    }
    if (d == 'DOWN') {
        snakeY += box;
    }

    //increment snake when eating food
    if (snakeX == food.x && snakeY == food.y) {
        score++
        eat.play();
        food = {
            x: Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    
    } else {
        snake.pop()
    }
    
    //add new snake head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //game over
    if (snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake)) {
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead);

    //setup the score formatting
    ctx.fillStyle = "white";
    //size: 45px; font family: Changa one
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}
//call draw() every 100ms
let game = setInterval(draw,100);