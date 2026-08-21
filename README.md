# Snake Game

A classic Snake game built with vanilla JavaScript, HTML, and CSS — no frameworks, no libraries.

**Play it live:** [snake-game-js-6xk.pages.dev](https://snake-game-js-6xk.pages.dev/)

## Features

- 🐍 Classic snake movement and growth mechanics
- 🏆 High score tracking (persists across games in a session)
- ⏱️ Live game timer
- 🎮 Start screen and game-over modal with restart flow
- ⌨️ Keyboard controls (arrow keys to move, Enter/Space to start)
- 🔊 Sound effects

## Tech Stack

- **HTML** — game structure and modals
- **CSS** — board and UI styling
- **JavaScript** — game loop, collision detection, score/timer logic, DOM manipulation

No frameworks or build tools — pure JS running directly in the browser.

## How to Run Locally

Since this is a static site with no build step, just open it directly:

```bash
git clone https://github.com/Vader-codes/Snake-Game-js-.git
cd Snake-Game-js-
```

Then open `index.html` in your browser, or serve it locally:

```bash
npx serve .
```

## How It Works

- The game board and snake are rendered and updated via direct DOM manipulation on a set interval (the game loop).
- Arrow key events update the snake's direction; the game loop repositions the snake's segments each tick.
- Collision detection checks for the snake hitting the walls or itself to trigger game over.
- Eating food increases the score, extends the snake, and speeds up the game loop for increasing difficulty.
- High score is tracked and displayed alongside the current score.

## Author

**Bipin** — [@Vader-codes](https://github.com/Vader-codes)
