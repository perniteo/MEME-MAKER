const saveBtn = document.getElementById("save")
const textInput = document.getElementById("text") 
const fileInput = document.getElementById("file")
const eraseBtn = document.getElementById("erase-btn")
const clearBtn = document.getElementById("clear-btn")
const modeBtn = document.getElementById("mode-btn")
const colorOptions = Array.from(document.querySelectorAll(".color-option"))
const lineColor = document.getElementById("line-color")
const lineWidth = document.getElementById("line-width")
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 800
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value
ctx.lineCap = "round"
let isPainting = false
let isFilling = false

function onMove(event){
  if(isPainting){
    ctx.lineTo(event.offsetX, event.offsetY)
    ctx.stroke()
    return
  }
  ctx.beginPath()
  ctx.moveTo(event.offsetX, event.offsetY)
}
function startPainting(){
isPainting= true
}
function cancelPainting(){
  isPainting = false
}

function onLineWidthChange(event){
  ctx.lineWidth = event.target.value
}
function onLineColorChange(event){
  ctx.strokeStyle = event.target.value
  ctx.fillStyle = event.target.value
}
function onColorCilck(event){
  const colorValue = event.target.dataset.color
  ctx.strokeStyle = colorValue
  ctx.fillStyle = colorValue
  lineColor.value = colorValue
}
function onModeClick(){
  if(isFilling) {
    isFilling=false
    modeBtn.innerText="Fill"
  }
    else{
      isFilling=true
      modeBtn.innerText="Draw"
    }
  }

function onCanvasClick(){
  if(isFilling){
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
  }
}
function onClearClick(){
  ctx.fillStyle="white"
  ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
  
}
function onEraseClick(){
  ctx.strokeStyle="white"
  isFilling = false
  modeBtn.innerText = "Fill"
}
function onFileChange(event){
const file = event.target.files[0]
const url = URL.createObjectURL(file)
const img = new Image()
img.src = url
img.onload = function(){
  ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  fileInput.value = null
  
}
}
function onDoubleClick(event){
  if(text !== ""){
  ctx.save()
  const text = textInput.value
  ctx.font = "50px serif"
  ctx.strokeText(text,event.offsetX, event.offsetY, 200)
  ctx.restore()}
}

function onSaveClick(){
  const url = canvas.toDataURL()
  const a = document.createElement("a")
  a.href = url
  a.download = "myDrawing.png"
  a.click()
  console.log(a)
}
canvas.addEventListener("dblclick", onDoubleClick)
canvas.addEventListener("mousemove", onMove)
canvas.addEventListener("mousedown", startPainting)
canvas.addEventListener("mouseup", cancelPainting)
canvas.addEventListener("mouseleave", cancelPainting)
canvas.addEventListener("click", onCanvasClick)

lineWidth.addEventListener("change", onLineWidthChange)
lineColor.addEventListener("change", onLineColorChange)
colorOptions.forEach(color => color.addEventListener("click", onColorCilck))

modeBtn.addEventListener("click", onModeClick)
clearBtn.addEventListener("click", onClearClick)
eraseBtn.addEventListener("click", onEraseClick)
fileInput.addEventListener("change", onFileChange)
saveBtn.addEventListener("click", onSaveClick)
// const colors = [
//   "#ff3838",
//   "#ffb8b8",
//   "#c56cf0",
//   "#ff9f1a",
//   "#fff200",
//   "#32ff7e",
//   "#7efff5",
//   "#18dcff",
//   "#7d5fff",
// ]


// function onMove(event){
//   ctx.beginPath()

//   ctx.moveTo(Math.floor(Math.random()*800),Math.floor(Math.random()*800))
//   const color = colors[Math.floor(Math.random() * colors.length)]
//   ctx.strokeStyle =color
// ctx.lineTo(event.offsetX, event.offsetY)
// ctx.stroke()
// }

// function onClick(){
//   ctx.beginPath()
//   const randint = Math.floor(Math.random()*800)

//   ctx.moveTo(randint,randint)
// }

// canvas.addEventListener("mousemove", onMove)
// canvas.addEventListener("click", onClick)

