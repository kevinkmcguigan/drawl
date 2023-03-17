// this has some weird bugs depending on the draw direction
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let points = [];

function drawLine() {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
}

function drawConvexHull() {
  // Compute convex hull using Graham's scan algorithm
  let hull = [];
  let minY = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < points.length; i++) {
    if (points[i].y < minY) {
      minY = points[i].y;
    }
  }
  let p0 = {x: points[0].x, y: minY};
  for (let i = 1; i < points.length; i++) {
    if (points[i].y == minY && points[i].x < p0.x) {
      p0 = {x: points[i].x, y: minY};
    }
  }
  hull.push(p0);
  let sortedPoints = points.slice();
  sortedPoints.sort((a, b) => {
    let thetaA = Math.atan2(a.y - p0.y, a.x - p0.x);
    let thetaB = Math.atan2(b.y - p0.y, b.x - p0.x);
    return thetaA - thetaB;
  });
  hull.push(sortedPoints[0]);
  hull.push(sortedPoints[1]);
  for (let i = 2; i < sortedPoints.length; i++) {
    let p1 = sortedPoints[i];
    let p2 = hull.pop();
    let p3 = hull[hull.length - 1];
    while ((p2.x - p3.x) * (p1.y - p3.y) - (p2.y - p3.y) * (p1.x - p3.x) < 0) {
      p2 = hull.pop();
      p3 = hull[hull.length - 1];
    }
    hull.push(p2);
    hull.push(p1);
  }

  // Draw convex hull
  ctx.beginPath();
  ctx.moveTo(hull[0].x, hull[0].y);
  for (let i = 1; i < hull.length; i++) {
    ctx.lineTo(hull[i].x, hull[i].y);
  }
  ctx.closePath();
  ctx.stroke();
}

canvas.addEventListener('mousedown', function(event) {
  isDrawing = true;
  points.push({x: event.offsetX, y: event.offsetY});
});

canvas.addEventListener('mousemove', function(event) {
  if (isDrawing) {
    points.push({x: event.offsetX, y: event.offsetY});
    drawLine();
  }
});

canvas.addEventListener('mouseup', function(event) {
  isDrawing = false;
  drawConvexHull();
});
