const canvas = document.querySelector("#js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".js-color");
const range = document.querySelector("#js-range");
const mode = document.querySelector("#js-mode");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let currentColorNode = document.querySelector(".js-color");

// 선 그리기
function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

// 캔버스 채우기
function handleCanvasClick(event) {
  if (filling) ctx.fillRect(0, 0, canvas.width, canvas.height);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

// 색 변경
function handleColorClick(event) {
  currentColorNode.innerText = "";

  currentColorNode = event.target;
  const color = currentColorNode.style.backgroundColor;

  currentColorNode.innerText = "⋁";

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

// Range를 통한 선 두께 조절
function handleRangeChange(event) {
  const lineWidth = event.target.value;
  ctx.lineWidth = lineWidth;
}
if (range) {
  range.addEventListener("input", handleRangeChange);
}
// fill 모드 = 캔버스 채우기 , paint 모드 = 선 그리기 
function handleModeClick(event) {
  if (filling) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}
if (mode) {
  mode.addEventListener("click", handleModeClick);
}
