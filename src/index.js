import Circle from './circle'
import Stats from 'stats.js'

// const stats = new Stats()
// stats.showPanel(0)
// document.body.appendChild(stats.dom)

const maxCircles = 200
const canvasWidth = innerWidth
const canvasHeight = innerHeight
const canvas = document.getElementById('canvas')
canvas.width = canvasWidth
canvas.height = canvasHeight
const ctx = canvas.getContext('2d')
let circleArray = []

const init = () => {
  const maxRandomCircleTry = 100
  let spaceForNewCircles = true
  for (let i = 0; i < maxCircles; i++) {
    let circleValues = getRandomCircleValues()
    for (let j = 0; j < maxRandomCircleTry + 1; j++) {
      if (false == intersectCircles(circleValues.x, circleValues.y, circleValues.radius)) break
      
      circleValues = getRandomCircleValues()
      if (j == maxRandomCircleTry - 1) {
        spaceForNewCircles = false
      }
    }

    if (false == spaceForNewCircles) { break }
    circleArray.push(
      new Circle(
        circleValues.x,
        circleValues.y,
        circleValues.dx,
        circleValues.dy,
        circleValues.radius,
        circleValues.color,
        i
      )
    )    
  }
  console.log('circles: ' + circleArray.length)
}

const getRandomCircleValues = () => {
  const colors = [
    '#046975',
    '#2EA1D4',
    '#FFDF59',
    '#FF1D47',
    '#8f9663',
    '#8495db',
    '#9dedc6',
    '#c7982a',
    '#d9c40d',
    '#687315',
    '#b3f5f5',
    '#215e8a',
    '#98ad76',
    '#4ce04c',
    '#2d7fcc'
  ]
  //const radius = 20
  const radius = Math.random() * 20 + 1
  const x = Math.random() * (canvas.width - radius  * 2) + radius
  const y = Math.random() * (canvas.height - radius  * 2) + radius
  const dx = (Math.random() - 0.5) * 2
  const dy = (Math.random() - 0.5) * 2
  const color = colors[Math.floor(Math.random() * colors.length)]

  return {x: x, y: y, dx: dx, dy: dy, radius: radius, color: color}
}

const intersectCircles = (x, y, radius) => {
  for(let i=0; i < circleArray.length; i++) {
      const dist = Math.sqrt(Math.pow(x - circleArray[i].x, 2) + Math.pow(y - circleArray[i].y, 2))
      if (dist < radius + circleArray[i].radius + 15) { return true }
  }
  return false
}

const draw = (x, y, radius, color) => {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
}

const handleWallCollisions = (circle) => {
  if (circle.x + circle.radius > canvasWidth || circle.x - circle.radius < 0) {
    circle.dx = -circle.dx
  }

  if (circle.y + circle.radius > canvasHeight || circle.y - circle.radius < 0) {
    circle.dy = -circle.dy
  }
}

const handleCircleCollisions = (circle) => {
  for(let i = 0; i < circleArray.length; i++) {
    if (i !== circle.index) {
      circle.collideWithCircle(circleArray[i])
    }
  }
}

const animate = () => {

  ctx.clearRect(0, 0, canvasWidth, canvasHeight)  
  //stats.begin()

  for (let i = 0; i < circleArray.length; i++) {

    handleCircleCollisions(circleArray[i])
    handleWallCollisions(circleArray[i])

    circleArray[i].x += circleArray[i].dx
    circleArray[i].y += circleArray[i].dy

    draw(circleArray[i].x, circleArray[i].y, circleArray[i].radius, circleArray[i].color)
  }

  //stats.end()
  requestAnimationFrame(animate)
}

init()
animate()