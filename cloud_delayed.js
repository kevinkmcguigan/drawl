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

	// Draw circles around each vertex in the line with radius equal to the size of the line segment
	ctx.fillStyle = '#000000';
	for (let i = 1; i < points.length - 1; i++) {
		const p1 = points[i - 1];
		const p2 = points[i];
		const p3 = points[i + 1];
		const dist1 = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
		const dist2 = Math.sqrt((p3.x - p2.x) ** 2 + (p3.y - p2.y) ** 2);
		const radius = (dist1 + dist2) / 2;
		ctx.beginPath();
		ctx.arc(p2.x, p2.y, radius, 0, 2 * Math.PI);
		ctx.fill();
	}
	
	// Clear the points array
	points = [];
});
