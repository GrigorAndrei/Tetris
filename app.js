document.addEventListener("DOMContentLoaded", () => {
  // code

  const grid = document.querySelector(".game_grid");
  let squares = Array.from(document.querySelectorAll(".game_grid div"));

  const scoreDisplay = document.querySelector("#score");
  let score = 0;
  const width = 10;
  let speed = 1;

  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    }
    if (e.keyCode === 39) {
      moveRight();
    }
    if (e.keyCode === 38) {
      rotate();
    }
    if (e.keyCode === 40) {
      moveDown();
    }
  }

  document.addEventListener("keydown", control);

  const lPiece = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];
  const zPiece = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tPiece = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oPiece = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iPiece = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const allPieces = [lPiece, zPiece, tPiece, oPiece, iPiece];

  let currPos = 3;
  let currRot = 0;
  let random = Math.floor(Math.random() * allPieces.length);
  console.log(random);
  let currPiece = allPieces[random][currRot];

  function drawPiece() {
    currPiece.forEach((index) => {
      squares[currPos + index].classList.add("piece");
    });
  }

  function undraw() {
    currPiece.forEach((index) => {
      squares[currPos + index].classList.remove("piece");
    });
  }

  timer = setInterval(moveDown, 1000 / speed);

  function moveDown() {
    undraw();
    currPos += width;
    drawPiece();
    freeze();
    addScore();
  }

  function freeze() {
    if (
      currPiece.some((index) =>
        squares[currPos + index + width].classList.contains("taken")
      )
    ) {
      currPiece.forEach((index) =>
        squares[currPos + index].classList.add("taken")
      );
      //start a new tetromino falling
      random = Math.floor(Math.random() * allPieces.length);
      currPiece = allPieces[random][currRot];
      currPos = 4;
      drawPiece();
    }
  }

  function moveLeft() {
    undraw();
    const isAtLeft = currPiece.some((index) => (currPos + index) % width === 0);
    if (!isAtLeft) {
      currPos -= 1;
    }

    if (
      currPiece.some((index) =>
        squares[currPos + index].classList.contains("taken")
      )
    ) {
      currPos += 1;
    }
    drawPiece();
  }

  function moveRight() {
    undraw();
    const isAtRight = currPiece.some(
      (index) => (currPos + index) % width === width - 1
    );
    if (!isAtRight) {
      currPos += 1;
    }

    if (
      currPiece.some((index) =>
        squares[currPos + index].classList.contains("taken")
      )
    ) {
      currPos -= 1;
    }
    drawPiece();
  }

  function rotate() {
    undraw();
    currRot++;
    if (currRot === currPiece.length) {
      currRot = 0;
    }

    currPiece = allPieces[random][currRot];

    drawPiece();
  }

  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];

      if (row.every((index) => squares[index].classList.contains("taken"))) {
        score++;
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classList.remove("taken");
          squares[index].classList.remove("piece");
        });
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
    if (score >= 2) speed = 2.5;
    if (score >= 5) speed = 5;
  }
});
