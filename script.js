const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


canvas.width = 400;
canvas.height = 400;

const box = 20;
let snake = [{ x: 200, y: 200 }];
let food = { x: Math.floor(Math.random() * canvas.width / box) * box, y: Math.floor(Math.random() * canvas.height / box) * box };
let direction = 'RIGHT';
let score = 0;

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'lime';
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(segment.x, segment.y, box, box);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);
}
function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 25); }

function updateGame() {
    const head = { ...snake[0] };

    if (direction === 'UP') head.y -= box;
    if (direction === 'DOWN') head.y += box;
    if (direction === 'LEFT') head.x -= box;
    if (direction === 'RIGHT') head.x += box;

    //snake pass the walls 
    if (head.x < 0) head.x = canvas.width - box;
    if (head.x >= canvas.width) head.x = 0;
    if (head.y < 0) head.y = canvas.height - box;
    if (head.y >= canvas.height) head.y = 0;

    if  (snake.some(segment => segment.x === head.x && segment.y === head.y))  
      {
        clearInterval(gameInterval);
        alert('Game Over! Your score: ' + score);
        return;
        }

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * canvas.width / box) * box,
            y: Math.floor(Math.random() * canvas.height / box) * box
        };
    } else {
        snake.pop(); 
    }
    snake.unshift(head); 
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    updateGame();
    drawScore();
}

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

const gameInterval = setInterval(drawGame, 100);
function changeDirection(newDirection) {
    if (newDirection === 'UP' && direction !== 'DOWN') direction = 'UP';
    if (newDirection === 'DOWN' && direction !== 'UP') direction = 'DOWN';
    if (newDirection === 'LEFT' && direction !== 'RIGHT') direction = 'LEFT';
    if (newDirection === 'RIGHT' && direction !== 'LEFT') direction = 'RIGHT';
}
