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

	// Draw small circles around each vertex in the line
	ctx.fillStyle = '#000000';
	for (let i = 0; i < points.length; i++) {
		const point = points[i];
		ctx.beginPath();
		ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
		ctx.fill();
	}
	
	// Clear the points array
	points = [];
});
