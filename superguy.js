const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let points = [];

canvas.addEventListener('mousedown', function(event) {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});

canvas.addEventListener('mousemove', function(event) {
    if (isDrawing) {
        const x = event.offsetX;
        const y = event.offsetY;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        const radius = 25;
        const numVertices = 16;
        const angleIncrement = (2 * Math.PI) / numVertices;

        for (let i = 0; i < numVertices; i++) {
            const angle = i * angleIncrement;
            const pointX = lastX + radius * Math.cos(angle);
            const pointY = lastY + radius * Math.sin(angle);

            points.push({x: pointX, y: pointY});
        }

        lastX = x;
        lastY = y;
    }
});

canvas.addEventListener('mouseup', function(event) {
    isDrawing = false;

    const x = event.offsetX;
    const y = event.offsetY;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    const radius = 25;
    const numVertices = 16;
    const angleIncrement = (2 * Math.PI) / numVertices;

    for (let i = 0; i < numVertices; i++) {
        const angle = i * angleIncrement;
        const pointX = x + radius * Math.cos(angle);
        const pointY = y + radius * Math.sin(angle);

        points.push({x: pointX, y: pointY});
    }

    // Compute the outer edge of the shape
    const hull = computeConvexHull(points);

    // Draw the outer edge of the shape
    drawConvexHull(hull);

    points = [];
});

function computeConvexHull(points) {
  // Sort the points by x-coordinate
  points.sort((a, b) => a.x - b.x);
  
  // Find upper and lower hulls
  const upperHull = [];
  const lowerHull = [];
  
  for (let i = 0; i < points.length; i++) {
    while (upperHull.length >= 2 &&
           crossProduct(upperHull[upperHull.length - 2], upperHull[upperHull.length - 1], points[i]) <= 0) {
      upperHull.pop();
    }
    upperHull.push(points[i]);
  }
  
  for (let i = points.length - 1; i >= 0; i--) {
    while (lowerHull.length >= 2 &&
           crossProduct(lowerHull[lowerHull.length - 2], lowerHull[lowerHull.length - 1], points[i]) <= 0) {
      lowerHull.pop();
    }
    lowerHull.push(points[i]);
  }
  
  // Remove duplicate points between the two hulls
  lowerHull.splice(0, 1);
  lowerHull.splice(lowerHull.length - 1, 1);
  
  // Concatenate the two hulls
  return upperHull.concat(lowerHull);
}

function drawConvexHull(hull) {
  ctx.beginPath();
  ctx.moveTo(hull[0].x, hull[0].y);
  
  for (let i = 1; i < hull.length; i++) {
    ctx.lineTo(hull[i].x, hull[i].y);
  }
  
  ctx.closePath();
  ctx.stroke();
}

function crossProduct(p1, p2, p3) {
	return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
}
