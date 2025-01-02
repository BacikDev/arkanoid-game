const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

//Tamañaño del canvas
canvas.width = 448
canvas.height = 400

//Variables de la pelotita
const ballRadius = 4;

//Posición donde va a aparecer la pelotita
let x = canvas.width / 2
let y = canvas.height - 30

//velocidad de la pelotita
let dx = 2
let dy = -2

//Dibujando la pelotita
function drawBall() {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.closePath()
}

function drawPaddle(){}
function drawBricks(){}

function collisionDetection(){}

//Movimiento de la pelotita
function ballMovement(){
    //Rebotar en las paredes
    if(
        x + dx > canvas.width - ballRadius || //Pared derecha
        x + dx < ballRadius //Pared izuierda

    ){
        dx = -dx
    }

    x += dx
    y += dy
}

function paddleMovement(){}

//Funcion para limpiar el recorrido de la pelotita
function cleanCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function draw(){
    //Dibujar los elementos
    
    cleanCanvas()
    drawBall()
    drawPaddle()
    drawBricks()
    
    collisionDetection()
    ballMovement()
    //paddleMovement()

    window.requestAnimationFrame(draw)
}

draw()