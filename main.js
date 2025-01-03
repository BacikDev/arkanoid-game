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

//Variable de la paleta
const paddleHeight = 10;
const paddleWidth = 50;

let paddleX = (canvas.width - paddleWidth) / 2
let paddleY = canvas.height - paddleHeight - 10

let rightPressed = false
let leftPressed = false

const PADDLE_SENSIBILITY = 8

//Dibujando la pelotita
function drawBall() {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.closePath()
}

function drawPaddle(){
    ctx.fillStyle = '#09f'
    ctx.fillRect(
        paddleX, //La coordenada X
        paddleY, //La coordenada Y
        paddleWidth, //El ancho del dibujo 
        paddleHeight)//El alto del dibujo
}
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

    //Rebotar en la parte de arriba
    if(y + dy < ballRadius){
        dy = -dy
    }

    //Game over
    if(y + dy > canvas.height - ballRadius){
        document.location.reload();
    }

    x += dx
    y += dy
}

function paddleMovement(){
    if(rightPressed && paddleX < canvas.width - paddleWidth){
        paddleX += PADDLE_SENSIBILITY
    }else if (leftPressed && paddleX > 0){
    paddleX -= PADDLE_SENSIBILITY
}    
}

//Funcion para limpiar el recorrido de la pelotita
function cleanCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function initEvents(){
    document.addEventListener("keydown", keyDownHandler)
    document.addEventListener("keyup", keyUpHandler)

    function keyDownHandler(event){
        const { key } = event
        if (key === 'Right' || key === 'ArrowRight'){
            rightPressed = true
        }else if (key === 'Left' || key === 'ArrowLeft'){
            leftPressed = true
        }
    }

    function keyUpHandler(event){
        const {key} = event
        if(key === 'Right' || key === 'ArrowRight'){
            rightPressed = false
        }else if (key === 'Left' || key === 'ArrowLeft'){
            leftPressed = false
        }
    }
}

function draw(){
    //Dibujar los elementos
    cleanCanvas()
    drawBall()
    drawPaddle()
    drawBricks()
    
    collisionDetection()
    ballMovement()
    paddleMovement()
    //paddleMovement()

    window.requestAnimationFrame(draw)
}

draw()
initEvents()