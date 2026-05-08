const board = document.querySelector(".board");
const blockHeight = 30;
const blockWidth = 30;

const modal = document.querySelector(".modal");

const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");

const startButton = document.querySelector(".btn-start");
const restartButton = document.querySelector(".btn-restart");

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

const highScoreElement = document.querySelector("#high-score");
const timeElement = document.querySelector("#time");
const scoreElement = document.querySelector("#score");

const foodAudio = new Audio("./audio/food.mp3");
const gameOverAudio = new Audio("./audio/gameover.mp3");
let highScore = Number(localStorage.getItem("highScore")) || 0;
let time = `00-00`;
let score = 0;
// create a random location of food item on x and y plane on the board
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};
// create a array of blocks
let blocks = [];

let snake = [{ x: 4, y: 3 }];
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${row}-${col}`] = block;
  }
}
let direction = "down";
let intervalId = null;
let timerIntevalId = null;
function render() {
  // update highScore when game renders
  highScoreElement.innerText = highScore;

  let head = null;
  blocks[`${food.x}-${food.y}`].classList.add("food");

  if (direction == "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction == "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction == "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  } else if (direction == "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  }

  // snake body collison
  if (snake.some((segment) => segment.x == head.x && segment.y == head.y)) {
    // make the game over sound
    gameOverAudio.currentTime = 0;
    gameOverAudio.play();
    clearInterval(intervalId);
    modal.style.display = "flex";
    startGameModal.style.display = "none";
    gameOverModal.style.display = "flex";
    return;
  }
  // wall collison
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    // make the game over sound
    gameOverAudio.currentTime = 0;
    gameOverAudio.play();
    // clear the array or the board
    clearInterval(intervalId);
    modal.style.display = "flex";
    startGameModal.style.display = "none";
    gameOverModal.style.display = "flex";
    return;
  }
  // food consumption and increasing the height
  if (head.x == food.x && head.y == food.y) {
    // maeke a sound of eatin food
    foodAudio.currentTime = 0;
    foodAudio.play();
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    snake.unshift(head);
    score += 10;
    scoreElement.innerText = score;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore.toString());
    }
  }

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });
  snake.unshift(head);
  snake.pop();
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  });
}
function restartGame() {
  // pause the audio
  gameOverAudio.pause();
  gameOverAudio.currentTime = 0;
  scoreElement.innerText = 0;
  blocks[`${food.x}-${food.y}`].classList.remove("food");

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });

  score = 0;
  time = `00-00`;
  direction = "down";

  modal.style.display = "none";
  snake = [{ x: 4, y: 3 }];
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };
  intervalId = setInterval(() => {
    render();
  }, 200);
}

restartButton.addEventListener("click", restartGame);

startButton.addEventListener("click", () => {
  modal.style.display = "none";
  intervalId = setInterval(() => {
    render();
  }, 200);
  timerIntevalId = setInterval(() => {
    let [m, sec] = time.split("-").map(Number);
    if (sec == 59) {
      m++;
      sec = 0;
    } else {
      sec++;
    }
    time = `${m}-${sec}`;
    timeElement.innerText = time;
  }, 1000);
});

addEventListener("keydown", (event) => {
  let keyPress = event.key;
  if (keyPress == "ArrowUp") {
    direction = "up";
  } else if (keyPress == "ArrowDown") {
    direction = "down";
  }
  if (keyPress == "ArrowLeft") {
    direction = "left";
  }
  if (keyPress == "ArrowRight") {
    direction = "right";
  }
});
