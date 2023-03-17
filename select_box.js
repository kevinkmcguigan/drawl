const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let startX, startY, width, height;

canvas.addEventListener('mousedown', function(event) {
	isDrawing = true;
	startX = event.offsetX;
	startY = event.offsetY;
	width = 0;
	height = 0;
});

canvas.addEventListener('mousemove', function(event) {
	if (isDrawing) {
		width = event.offsetX - startX;
		height = event.offsetY - startY;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawRectangle(startX, startY, width, height);
	}
});

canvas.addEventListener('mouseup', function(event) {
	isDrawing = false;
	drawRectangle(startX, startY, width, height);
});

function drawRectangle(x, y, width, height) {
	ctx.beginPath();
	ctx.rect(x, y, width, height);
	ctx.stroke();
}
