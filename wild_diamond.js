const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let points = [];

canvas.addEventListener('mousedown', function(event) {
	isDrawing = true;
	points.push({x: event.offsetX, y: event.offsetY});
});

canvas.addEventListener('mousemove', function(event) {
	if (isDrawing) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (let i = 0; i < points.length - 1; i++) {
			drawLine(points[i], points[i+1], 'black', 1);
		}
		drawLine(points[points.length-1], {x: event.offsetX, y: event.offsetY}, 'black', 1);
	}
});

canvas.addEventListener('mouseup', function(event) {
	isDrawing = false;
	points.push({x: event.offsetX, y: event.offsetY});

	const hullPoints = convexHull(points);
	drawHull(hullPoints, 'gray', 1);
});

function drawLine(p1, p2, color, width) {
	ctx.beginPath();
	ctx.moveTo(p1.x, p1.y);
	ctx.lineTo(p2.x, p2.y);
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.stroke();
}

function drawHull(points, color, width) {
	ctx.beginPath();
	ctx.moveTo(points[0].x, points[0].y);
	for (let i = 1; i < points.length; i++) {
		ctx.lineTo(points[i].x, points[i].y);
	}
	ctx.closePath();
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.stroke();
}

function crossProduct(p1, p2, p3) {
	return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
}

function convexHull(points) {
	if (points.length < 3) {
		return points;
	}

	points.sort(function(a, b) {
		if (a.x === b.x) {
			return a.y - b.y;
		} else {
			return a.x - b.x;
		}
	});

	const lower = [];
	for (let i = 0; i < points.length; i++) {
		while (lower.length >= 2 && crossProduct(lower[lower.length-2], lower[lower.length-1], points[i]) <= 0) {
			lower.pop();
		}
		lower.push(points[i]);
	}

	const upper = [];
	for (let i = points.length - 1; i >= 0; i--) {
		while (upper.length >= 2 && crossProduct(upper[upper.length-2], upper[upper.length-1], points[i]) <= 0) {
			upper.pop();
		}
		upper.push(points[i]);
	}

	upper.pop();
	lower.pop();

	return lower.concat(upper);
}
