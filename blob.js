const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let path = [];

canvas.addEventListener('mousedown', function(event) {
	isDrawing = true;
	path = [];
	path.push({ x: event.offsetX, y: event.offsetY });
});

canvas.addEventListener('mousemove', function(event) {
	if (isDrawing) {
		path.push({ x: event.offsetX, y: event.offsetY });
	}
});

canvas.addEventListener('mouseup', function(event) {
	if (isDrawing) {
		isDrawing = false;
		ctx.beginPath();
		ctx.moveTo(path[0].x, path[0].y);
		for (let i = 1; i < path.length; i++) {
			const xc = (path[i].x + path[i - 1].x) / 2;
			const yc = (path[i].y + path[i - 1].y) / 2;
			ctx.quadraticCurveTo(path[i - 1].x, path[i - 1].y, xc, yc);
		}
		ctx.closePath();
		ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
		ctx.fill();
	}
});
