const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
const circleRadius = 2;

canvas.addEventListener('mousedown', function(event) {
	isDrawing = true;
	lastX = event.offsetX;
	lastY = event.offsetY;
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
		
		// Draw a circle at the current position
		ctx.beginPath();
		ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
		ctx.fill();
		
		lastX = x;
		lastY = y;
	}
});

canvas.addEventListener('mouseup', function(event) {
	isDrawing = false;
});
