const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let circles = [];
let isDrawing = false;

canvas.addEventListener('mousedown', function(event) {
	isDrawing = true;
	circles.push({x: event.offsetX, y: event.offsetY, r: 0});
});

canvas.addEventListener('mousemove', function(event) {
	if (isDrawing) {
		const currentCircle = circles[circles.length - 1];
		const dx = event.offsetX - currentCircle.x;
		const dy = event.offsetY - currentCircle.y;
		currentCircle.r = Math.sqrt(dx * dx + dy * dy);
		
		// Clear the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		// Draw all circles
		for (let i = 0; i < circles.length; i++) {
			ctx.beginPath();
			ctx.arc(circles[i].x, circles[i].y, circles[i].r, 0, 2 * Math.PI);
			ctx.stroke();
		}

	}
});

canvas.addEventListener('mouseup', function(event) {
	isDrawing = false;
});

