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
	ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
	ctx.beginPath();
	ctx.moveTo(points[0][0], points[0][1]);
	for (let i = 1; i < points.length; i++) {
		ctx.lineTo(points[i][0], points[i][1]);
	}
	ctx.closePath();
	ctx.fill();
	
	// Calculate the centroid of the polygon
	let centroidX = 0;
	let centroidY = 0;
	for (let i = 0; i < points.length; i++) {
		centroidX += points[i][0];
		centroidY += points[i][1];
	}
	centroidX /= points.length;
	centroidY /= points.length;
	
	// Draw the centroid point
	ctx.fillStyle = 'black';
	ctx.beginPath();
	ctx.arc(centroidX, centroidY, 5, 0, 2 * Math.PI);
	ctx.fill();
}
