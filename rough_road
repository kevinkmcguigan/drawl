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
	points.push({x: lastX, y: lastY});
});

canvas.addEventListener('mousemove', function(event) {
	if (isDrawing) {
		const x = event.offsetX;
		const y = event.offsetY;
		
		// Draw a line from the last position to the current position
		ctx.beginPath();
		ctx.moveTo(lastX, lastY);
		ctx.lineTo(x, y);
		ctx.stroke();
		
		lastX = x;
		lastY = y;
		
		points.push({x: x, y: y});
	}
});

canvas.addEventListener('mouseup', function(event) {
	isDrawing = false;

	// Buffer the line by 50 pixels
	const bufferedPoints = bufferLine(points, 50);
	
	// Draw the buffered line
	ctx.strokeStyle = '#000000';
	ctx.beginPath();
	ctx.moveTo(bufferedPoints[0].x, bufferedPoints[0].y);
	for (let i = 1; i < bufferedPoints.length; i++) {
		ctx.lineTo(bufferedPoints[i].x, bufferedPoints[i].y);
	}
	ctx.stroke();
	
	// Clear the points array
	points = [];
});

function bufferLine(points, bufferDistance) {
	const newPoints = [];
	for (let i = 0; i < points.length; i++) {
		const p1 = points[i];
		const p2 = points[(i + 1) % points.length];
		
		// Calculate the angle of the line segment
		const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
		
		// Calculate the offset vector
		const dx = bufferDistance * Math.sin(angle);
		const dy = bufferDistance * -Math.cos(angle);
		
		// Calculate the new points
		const np1 = { x: p1.x + dx, y: p1.y + dy };
		const np2 = { x: p2.x + dx, y: p2.y + dy };
		
		// Add the new points to the new points array
		newPoints.push(np1);
		newPoints.push(np2);
	}
	
	return newPoints;
}
