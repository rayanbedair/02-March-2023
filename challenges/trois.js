// Code found on https://code.tutsplus.com/tutorials/create-an-html5-canvas-tile-swapping-puzzle--active-10747

const PUZZLE_HOVER_TINT = "#009900";
const img = new Image();
const canvas = document.querySelector("#canvas");
const stage = canvas.getContext("2d");
let difficulty = 2;
let pieces;
let puzzleWidth;
let puzzleHeight;
let pieceWidth;
let pieceHeight;
let currentPiece;
let currentDropPiece;
let mouse;
img.addEventListener("load", onImage, false);
img.src = "https://asyncbanana.github.io/html5-canvas-puzzle/mke.jpg";

function initPuzzle() {
  pieces = [];
  mouse = {
    x: 0,
    y: 0
  };

  currentPiece = null;
  currentDropPiece = null;
  stage.drawImage(img, 0, 0, puzzleWidth, puzzleHeight, 0, 0, puzzleWidth, puzzleHeight);
  buildPieces();
}

function setCanvas() {
  canvas.width = puzzleWidth;
  canvas.height = puzzleHeight;
  canvas.style.border = "1px solid black";
}

function onImage() {
  pieceWidth = Math.floor(img.width / difficulty);
  pieceHeight = Math.floor(img.height / difficulty);
  puzzleWidth = pieceWidth * difficulty;
  puzzleHeight = pieceHeight * difficulty;
  setCanvas();
  initPuzzle();
}


function buildPieces() {
  let i;
  let piece;
  let xPos = 0;
  let yPos = 0;

  for (i = 0; i < difficulty * difficulty; i++) {
    piece = {};
    piece.sx = xPos;
    piece.sy = yPos;
    pieces.push(piece);
    xPos += pieceWidth;

    if (xPos >= puzzleWidth) {
      xPos = 0;
      yPos += pieceHeight;
    }
  }

  shufflePuzzle();
}

function shufflePuzzle() {
  pieces = shuffleArray(pieces);
  stage.clearRect(0, 0, puzzleWidth, puzzleHeight);

  let xPos = 0;
  let yPos = 0;

  for (const piece of pieces) {
    piece.xPos = xPos;
    piece.yPos = yPos;

    stage.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, xPos, yPos, pieceWidth, pieceHeight);
    stage.strokeRect(xPos, yPos, pieceWidth, pieceHeight);

    xPos += pieceWidth;

    if (xPos >= puzzleWidth) {
      xPos = 0;
      yPos += pieceHeight;
    }
  }
  document.onpointerdown = onPuzzleClick;
}

function checkPieceClicked() {
  for (const piece of pieces) {

    if (!(mouse.x < piece.xPos || mouse.x > piece.xPos + pieceWidth ||
      mouse.y < piece.yPos || mouse.y > piece.yPos + pieceHeight)) {
      return piece;
    }
  }

  return null;
}

function updatePuzzle(e) {
  currentDropPiece = null;

  if (e.layerX || e.layerX == 0) {
    mouse.x = e.layerX - canvas.offsetLeft;
    mouse.y = e.layerY - canvas.offsetTop;

  } else if (e.offsetX || e.offsetX == 0) {
    mouse.x = e.offsetX - canvas.offsetLeft;
    mouse.y = e.offsetY - canvas.offsetTop;
  }

  stage.clearRect(0, 0, puzzleWidth, puzzleHeight);

  for (const piece of pieces) {
    stage.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, piece.xPos, piece.yPos, pieceWidth, pieceHeight);
    stage.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);

    if (currentDropPiece == null) {
      if (!(mouse.x < piece.xPos || mouse.x > piece.xPos + pieceWidth ||
        mouse.y < piece.yPos || mouse.y > piece.yPos + pieceHeight)) {

        currentDropPiece = piece;
        stage.save();
        stage.globalAlpha = 0.4;
        stage.fillStyle = PUZZLE_HOVER_TINT;
        stage.fillRect(currentDropPiece.xPos, currentDropPiece.yPos, pieceWidth, pieceHeight);
        stage.restore();
      }
    }
  }

  stage.save();
  stage.globalAlpha = 0.6;
  stage.drawImage(img, currentPiece.sx, currentPiece.sy, pieceWidth, pieceHeight, mouse.x - pieceWidth / 2, mouse.y - pieceHeight / 2, pieceWidth, pieceHeight);
  stage.restore();
  stage.strokeRect(mouse.x - pieceWidth / 2, mouse.y - pieceHeight / 2, pieceWidth, pieceHeight);
}

function onPuzzleClick(e) {

  if (e.layerX || e.layerX === 0) {
    mouse.x = e.layerX - canvas.offsetLeft;
    mouse.y = e.layerY - canvas.offsetTop;

  } else if (e.offsetX || e.offsetX === 0) {
    mouse.x = e.offsetX - canvas.offsetLeft;
    mouse.y = e.offsetY - canvas.offsetTop;

  }

  currentPiece = checkPieceClicked();

  if (currentPiece !== null) {

    stage.clearRect(currentPiece.xPos, currentPiece.yPos, pieceWidth, pieceHeight);
    stage.save();
    stage.globalAlpha = 0.9;
    stage.drawImage(img, currentPiece.sx, currentPiece.sy, pieceWidth, pieceHeight, mouse.x - pieceWidth / 2, mouse.y - pieceHeight / 2, pieceWidth, pieceHeight);
    stage.restore();
    document.onpointermove = updatePuzzle;
    document.onpointerup = pieceDropped;
  }
}

function gameOver() {
  document.onpointerdown = null;
  document.onpointermove = null;
  document.onpointerup = null;

  canvas.addEventListener('click', explode);
}

function pieceDropped(e) {
  document.onpointermove = null;
  document.onpointerup = null;

  if (currentDropPiece !== null) {

    let tmp = {
      xPos: currentPiece.xPos,
      yPos: currentPiece.yPos
    };

    currentPiece.xPos = currentDropPiece.xPos;
    currentPiece.yPos = currentDropPiece.yPos;
    currentDropPiece.xPos = tmp.xPos;
    currentDropPiece.yPos = tmp.yPos;
  }

  resetPuzzleAndCheckWin();
}

function resetPuzzleAndCheckWin() {
  stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
  let gameWin = true;

  for (piece of pieces) {

    stage.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, piece.xPos, piece.yPos, pieceWidth, pieceHeight);
    stage.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);

    if (piece.xPos != piece.sx || piece.yPos != piece.sy) {
      gameWin = false;
    }
  }

  if (gameWin) {
    setTimeout(gameOver, 500);
  }
}

function shuffleArray(o) {
  for (
    var j, x, i = o.length;
    i;
    j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
}


// And this part was stolen from https://codepen.io/nicksheffield/pen/NNEoLg

function explode(e) {
  var x = e.clientX;
  var y = e.clientY;

  var c = document.createElement('canvas');
  var ctx = c.getContext('2d');
  var ratio = window.devicePixelRatio;
  var particles = [];

  document.body.appendChild(c);

  c.style.position = 'absolute';
  c.style.left = (x - 100) + 'px';
  c.style.top = (y - 100) + 'px';
  c.style.pointerEvents = 'none';
  c.style.width = 400 + 'px';
  c.style.height = 400 + 'px';
  c.width = 200 * ratio;
  c.height = 200 * ratio;

  function Particle() {
    return {
      x: c.width / 2,
      y: c.height / 2,
      radius: r(20, 30),
      color: 'rgb(' + [r(0, 255), r(0, 255), r(0, 255)].join(',') + ')',
      rotation: r(0, 360, true),
      speed: r(8, 12),
      friction: 0.9,
      opacity: r(0, 0.5, true),
      yVel: 0,
      gravity: 0.1
    }
  }

  for (var i = 0; ++i < 40;) {
    particles.push(Particle());
  }

  function render() {
    ctx.clearRect(0, 0, c.width, c.height);

    particles.forEach(function (p, i) {

      angleTools.moveOnAngle(p, p.speed);

      p.opacity -= 0.01;
      p.speed *= p.friction;
      p.radius *= p.friction;

      p.yVel += p.gravity;
      p.y += p.yVel;

      if (p.opacity < 0) return;
      if (p.radius < 0) return;

      ctx.beginPath();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
      ctx.fill();
    });
  }

  (function renderLoop() {
    requestAnimationFrame(renderLoop);
    render();
  })()

  setTimeout(function () { document.body.removeChild(c) }, 3000);
}

var angleTools = { getAngle: function (t, n) { var a = n.x - t.x, e = n.y - t.y; return Math.atan2(e, a) / Math.PI * 180 }, getDistance: function (t, n) { var a = t.x - n.x, e = t.y - n.y; return Math.sqrt(a * a + e * e) }, moveOnAngle: function (t, n) { var a = this.getOneFrameDistance(t, n); t.x += a.x, t.y += a.y }, getOneFrameDistance: function (t, n) { return { x: n * Math.cos(t.rotation * Math.PI / 180), y: n * Math.sin(t.rotation * Math.PI / 180) } } };
function r(a, b, c) { return parseFloat((Math.random() * ((a ? a : 1) - (b ? b : 0)) + (b ? b : 0)).toFixed(c ? c : 0)); }


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}