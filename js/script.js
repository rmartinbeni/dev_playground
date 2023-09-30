const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
const img = new Image()
const vida = '<img style="width:16px;height:20px" src="img/vida.png">'
const p1vidas = []
const p2vidas = [];

(function iniVidas () {
  for (let i = 0; i < 7; i++) {
    p1vidas.push(vida)
    p2vidas.push(vida)
  }
})()

function muestraVidas (array) {
  const width = array.length * 8
  let table = "<table style='width:" + width + ";height:20px'><tr>"
  for (let i = 0; i < array.length; i++) {
    table += '<td>' + array[i] + '</td>'
  }
  table += '</tr></table>'
  return table
}

document.getElementById('puntosDerecha').innerHTML = muestraVidas(p1vidas)
document.getElementById('puntosIzquierda').innerHTML = muestraVidas(p2vidas)

let dy
let dx
const ballRadius = 10

const aceleration = 1.05
let x = canvas.width / 2
let y = canvas.height / 2

const paddleHeight = 100
const paddleWidth = 20

const paddleRightX = canvas.width - 5
let paddleRightY = canvas.height / 2 - paddleHeight / 2

const paddleLeftX = 5
let paddleLeftY = canvas.height / 2 - paddleHeight / 2

let upPressed = false
let downPressed = false
let wPressed = false
let sPressed = false

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

function keyDownHandler (e) {
  if (e.keyCode === 38) {
    upPressed = true
  } else if (e.keyCode === 40) {
    downPressed = true
  } else if (e.keyCode === 87) {
    wPressed = true
  } else if (e.keyCode === 83) {
    sPressed = true
  }
}

function keyUpHandler (e) {
  if (e.keyCode === 38) {
    upPressed = false
  } else if (e.keyCode === 40) {
    downPressed = false
  } else if (e.keyCode === 87) {
    wPressed = false
  } else if (e.keyCode === 83) {
    sPressed = false
  }
}

function generateStartingAngle () {
  if (Math.random() >= 0.5) {
    dx = 1.5
  } else {
    dx = -1.5
  }
  if (Math.random() >= 0.5) {
    dy = 1
  } else {
    dy = -1
  }
}

function drawBall () {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.closePath()
}

function drawPaddleLeft () {
  ctx.beginPath()
  ctx.rect(paddleLeftX, paddleLeftY, paddleWidth, paddleHeight)
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.closePath()
}

function drawPaddleRight () {
  ctx.beginPath()
  ctx.rect(paddleRightX - paddleWidth, paddleRightY, paddleWidth, paddleHeight)
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.closePath()
}

function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBall()
  drawPaddleRight()
  drawPaddleLeft()
  img.onload = function () {
    ctx.drawImage(img, x, y)
  }

  // Limites
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy
  }

  // Colision sup. dch.
  if (y + dy > paddleRightY && x + dx > canvas.width - paddleWidth) {
    dy = -dy
  }

  // Colision inf. dch.
  if (y < paddleRightY + paddleHeight && x + dx > canvas.width - paddleWidth) {
    dy = -dy
  }

  // Colision sup. izq.
  if (y + dy > paddleLeftY && x + dx < paddleWidth) {
    dy = -dy
  }

  // Colision inf. izq.
  if (y + dy < paddleLeftY && x + dx < paddleWidth) {
    dy = -dy
  }

  // Pared Dch.
  if (x + dx > canvas.width - ballRadius) {
    x = canvas.width / 2
    y = canvas.height / 2
    paddleRightY = canvas.height / 2 - paddleHeight / 2
    paddleLeftY = canvas.height / 2 - paddleHeight / 2
    generateStartingAngle()
    setTimeout(function () {
      pause = setInterval(draw, 5)
    }, 1500)
    setTimeout(function () { clearInterval(pause) }, 6)
    p2vidas.pop()
    document.getElementById('puntosIzquierda').innerHTML = muestraVidas(p2vidas)
    if (p2vidas.length === 0) {
      alert('P1 WINS!!!!!!!!!')
      if (!confirm('Rematch?')) {
        alert("Fuck you, you're gonna play another one!")
      }
      location.reload()
    }

    // Pala Dch
  } else if (y > paddleRightY && y < paddleRightY + paddleHeight && x + dx >= canvas.width - paddleWidth - 10) {
    if (dx < 4) {
      if (dy > 0) {
        if (y - paddleRightY > paddleHeight / 2) {
          dy = +((y - paddleRightY - paddleHeight / 2) / paddleHeight / 2)
        } else {
          dy = +((paddleRightY + paddleHeight / 2 - y) / paddleHeight / 2)
        }
      } else {
        if (y - paddleRightY > paddleHeight / 2) {
          dy = -((y - paddleRightY - paddleHeight / 2) / paddleHeight / 2)
        } else {
          dy = -((paddleRightY + paddleHeight / 2 - y) / paddleHeight / 2)
        }
      }
      dx = -dx * aceleration
    } else {
      if (dy > 0) {
        if (y - paddleRightY > paddleHeight / 2) {
          dy = +((y - paddleRightY - paddleHeight / 2) / paddleHeight / 2)
        } else {
          dy = +((paddleRightY + paddleHeight / 2 - y) / paddleHeight / 2)
        }
      } else {
        if (y - paddleRightY > paddleHeight / 2) {
          dy = -((y - paddleRightY - paddleHeight / 2) / paddleHeight / 2)
        } else {
          dy = -((paddleRightY + paddleHeight / 2 - y) / paddleHeight / 2)
        }
      }
      dx = -dx
    }
  }

  // Pared Izq.
  if (x + dx < ballRadius) {
    x = canvas.width / 2
    y = canvas.height / 2
    paddleRightY = canvas.height / 2 - paddleHeight / 2
    paddleLeftY = canvas.height / 2 - paddleHeight / 2
    generateStartingAngle()
    setTimeout(function () {
      pause = setInterval(draw, 5)
    }, 1500)
    setTimeout(function () { clearInterval(pause) }, 6)
    p1vidas.pop()
    document.getElementById('puntosDerecha').innerHTML = muestraVidas(p1vidas)
    if (p1vidas.length === 0) {
      alert('P2 WINS!!!!!!!!!')
      if (!confirm('Rematch?')) {
        alert("Fuck you, you're gonna play another one!")
      }
      location.reload()
    }

    // Pala Izq
  } else if (y > paddleLeftY && y < paddleLeftY + paddleHeight && x + dx <= paddleWidth + 10) {
    if (dx < 4) {
      if (dy > 0) {
        if (y - paddleLeftY > paddleHeight / 2) {
          dy = +((y - paddleLeftY - paddleHeight / 2) / paddleHeight / 2)
        } else {
          dy = +((paddleLeftY + paddleHeight / 2 - y) / paddleHeight / 2)
        }
      } else {
        if (y - paddleLeftY > paddleHeight / 2) {
          dy = -((y - paddleLeftY - paddleHeight / 2) / paddleHeight / 2)
        } else {
          dy = -((paddleLeftY + paddleHeight / 2 - y) / paddleHeight / 2)
        }
      }
      dx = -dx * aceleration
    } else {
      if (dy > 0) {
        if (y - paddleLeftY > paddleHeight / 2) {
          dy = +((y - paddleLeftY - paddleHeight / 2) / paddleHeight / 2)
        } else {
          dy = +((paddleLeftY + paddleHeight / 2 - y) / paddleHeight / 2)
        }
      } else {
        if (y - paddleLeftY > paddleHeight / 2) {
          dy = -((y - paddleLeftY - paddleHeight / 2) / paddleHeight / 2)
        } else {
          dy = -((paddleLeftY + paddleHeight / 2 - y) / paddleHeight / 2)
        }
      }
      dx = -dx
    }
  }

  if (upPressed && paddleRightY > 0) {
    paddleRightY -= 3
  } else if (downPressed && paddleRightY < canvas.height - paddleHeight) {
    paddleRightY += 3
  }

  if (wPressed && paddleLeftY > 0) {
    paddleLeftY -= 3
  } else if (sPressed && paddleLeftY < canvas.height - paddleHeight) {
    paddleLeftY += 3
  }

  x += dx
  y += dy
}
generateStartingAngle()
draw()
setTimeout(function () { pause = setInterval(draw, 5) }, 1500)
