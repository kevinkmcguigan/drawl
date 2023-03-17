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
		
		// Compute and draw the convex hull
		const hull = computeConvexHull(circles);
		drawConvexHull(hull);
	}
});

canvas.addEventListener('mouseup', function(event) {
	isDrawing = false;
});

function computeConvexHull(points) {
	// Compute the convex hull of the given points using the Gift Wrapping Algorithm
	const n = points.length;
	const hull = [];

	// Find the leftmost point
	let leftmostIndex = 0;
	for (let i = 1; i < n; i++) {
		if (points[i].x < points[leftmostIndex].x) {
			leftmostIndex = i;
		}
	}

	// Start at the leftmost point and wrap around the points to find the convex hull
	let currentIndex = leftmostIndex;
	do {
		hull.push(points[currentIndex]);
		let nextIndex = (currentIndex + 1) % n;
		for (let i = 0; i < n; i++) {
			if (crossProduct(points[currentIndex], points[i], points[nextIndex]) > 0) {
				nextIndex = i;
			}
		}
		currentIndex = nextIndex;
	} while (currentIndex != leftmostIndex);

	return hull;
}

function crossProduct(p1, p2, p3) {
	return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
}

function drawConvexHull(hull) {
	// Draw the convex hull as a closed polygon
	ctx.strokeStyle = "gray";
	ctx.beginPath();
	ctx.moveTo(hull[0].x, hull[0].y);
	for (let i = 1; i < hull.length; i++) {
		ctx.lineTo(hull[i].x, hull[i].y);
	}
	ctx.closePath();
	ctx.stroke();
}
