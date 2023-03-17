const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let points = [];
let isDrawing = false;

canvas.addEventListener('mousedown', function(event) {
	isDrawing = true;
	points.push([event.offsetX, event.offsetY]);
});

canvas.addEventListener('mousemove', function(event) {
	if (isDrawing) {
		points.push([event.offsetX, event.offsetY]);
		drawBlob();
	}
});

canvas.addEventListener('mouseup', function(event) {
	isDrawing = false;
});

function drawBlob() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	// Draw the polygon
	ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
	ctx.beginPath();
	ctx.moveTo(points[0][0], points[0][1]);
	for (let i = 1; i < points.length; i++) {
		ctx.lineTo(points[i][0], points[i][1]);
	}
	ctx.closePath();
	ctx.fill();
	
	// Calculate the largest circle that fits within the polygon
	let minRadius = Number.MAX_VALUE;
	let centerX = 0;
	let centerY = 0;
	for (let x = 0; x < canvas.width; x++) {
		for (let y = 0; y < canvas.height; y++) {
			if (ctx.isPointInPath(x, y)) {
				let distance = getDistanceToPoint(x, y, points);
				if (distance < minRadius) {
					minRadius = distance;
					centerX = x;
					centerY = y;
				}
			}
		}
	}
	
	// Draw the largest circle that fits within the polygon
	ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
	ctx.beginPath();
	ctx.arc(centerX, centerY, minRadius, 0, 2 * Math.PI);
	ctx.fill();
}

function getDistanceToPoint(x, y, points) {
	let maxDistance = 0;
	for (let i = 0; i < points.length; i++) {
		let point = points[i];
		let distance = Math.sqrt(Math.pow(x - point[0], 2) + Math.pow(y - point[1], 2));
		if (distance > maxDistance) {
			maxDistance = distance;
		}
	}
	return maxDistance;
}
