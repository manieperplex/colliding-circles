export default class Circle {
  constructor(x, y, dx, dy, radius, color, index) {
      this.x = x
      this.y = y
      this.dx = dx
      this.dy = dy
      this.radius = radius
      this.color = color
      this.index = index
  }

  closestpintOnLine = (lx1, ly1, lx2, ly2, x0, y0) => { 
    const A1 = ly2 - ly1; 
    const B1 = lx1 - lx2; 
    const C1 = (ly2 - ly1)*lx1 + (lx1 - lx2)*ly1; 
    const C2 = -B1*x0 + A1*y0; 
    const det = A1*A1 - -B1*B1; 
    let cx = 0; 
    let cy = 0; 
    if(det != 0) { 
      cx = (A1*C1 - B1*C2) / det 
      cy = (A1*C2 - -B1*C1) / det 
    }
    else { 
      cx = x0; 
      cy = y0; 
    } 
    return {x: cx, y: cy}; 
  }

  calcDistance = (x1, x2, y1, y2) => {
    return  Math.sqrt(
      Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
    )
  }

  collideWithCircle = (circle) => {    
    const distNext = this.calcDistance(
      this.x + this.dx, circle.x, this.y + this.dy, circle.y
    )
    // const distNext = Math.sqrt(
    //   Math.pow(this.x + this.dx - circle.x, 2) + Math.pow(this.y + this.dy - circle.y, 2)
    // )

    //if (distNext - (this.radius + circle.radius) > 0) { return false}
    if (distNext > (this.radius + circle.radius)) { return false}


    const dist = this.calcDistance(this.x, circle.x, this.y, circle.y)
    // const dist = Math.sqrt(
    //   Math.pow(this.x - circle.x, 2) + Math.pow(this.y - circle.y, 2)
    // )
    
    // https://ericleong.me/research/circle-circle/
    const nx = (circle.x - this.x) / dist
    const ny = (circle.y - this.y) / dist
    
    const maxMass = 21
    const m1 = maxMass - this.radius
    const m2 = maxMass - circle.radius

    const p = 2 * (this.dx * nx + this.dy * ny - circle.dx * nx - circle.dy * ny) / (m1 + m2)

    const vx1 = this.dx - p * m1 * nx
    const vy1 = this.dy - p * m1 * ny

    const vx2 = circle.dx + p * m2 * nx
    const vy2 = circle.dy + p * m2 * ny

    this.dx = vx1
    this.dy = vy1
    circle.dx = vx2
    circle.dy = vy2
  }
}