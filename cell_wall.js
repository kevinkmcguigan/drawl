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
		
		// Convert circles to points
		let points = [];
		for (let i = 0; i < circles.length; i++) {
			const numVertices = 16;
			const angleIncrement = (2 * Math.PI) / numVertices;
			for (let j = 0; j < numVertices; j++) {
				const angle = j * angleIncrement;
				const pointX = circles[i].x + circles[i].r * Math.cos(angle);
				const pointY = circles[i].y + circles[i].r * Math.sin(angle);
				points.push({x: pointX, y: pointY});
			}
		}
		
		// Compute and draw the belt hull
		//const hull = computeBeltHull(points);
		//drawBeltHull(hull);
    
    drawConvexHull(points)
	}
});

canvas.addEventListener('mouseup', function(event) {
	isDrawing = false;
});

function drawConvexHull(points) {
	// Sort points by x-coordinate
	points.sort(function(a, b) {
		if (a.x === b.x) {
			return a.y - b.y;
		}
		return a.x - b.x;
	});
	
	// Find upper hull
	const upperHull = [];
	for (let i = 0; i < points.length; i++) {
		while (upperHull.length >= 2 &&
			crossProduct(upperHull[upperHull.length-2], upperHull[upperHull.length-1], points[i]) <= 0) {
			upperHull.pop();
		}
		upperHull.push(points[i]);
	}
	
	// Find lower hull
	const lowerHull = [];
	for (let i = points.length - 1; i >= 0; i--) {
		while (lowerHull.length >= 2 &&
			crossProduct(lowerHull[lowerHull.length-2], lowerHull[lowerHull.length-1], points[i]) <= 0) {
			lowerHull.pop();
		}
		lowerHull.push(points[i]);
	}
	
	// Combine upper and lower hulls (except for duplicate endpoints)
	const hull = upperHull.concat(lowerHull.slice(1, -1));
	
	// Draw the convex hull
	ctx.strokeStyle = 'grey';
	ctx.beginPath();
	ctx.moveTo(hull[0].x, hull[0].y);
	for (let i = 1; i < hull.length; i++) {
		ctx.lineTo(hull[i].x, hull[i].y);
	}
	ctx.closePath();
	ctx.stroke();
}

function crossProduct(p1, p2, p3) {
	return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
}
