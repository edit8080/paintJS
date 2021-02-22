const canvas = document.querySelector("#js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".js-color");
const range = document.querySelector("#js-range");
const modeBtn = document.querySelector("#js-mode");
const saveBtn = document.querySelector("#js-save");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 저장 시 background가 transparent한 문제 해결
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

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
// context menu 차단
function handleContextMenu(event){
    event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu",handleContextMenu);
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
    modeBtn.innerText = "Fill";
  } else {
    filling = true;
    modeBtn.innerText = "Paint";
  }
}
if (modeBtn) {
    modeBtn.addEventListener("click", handleModeClick);
}

function handleSaveClick(event){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}