const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let points = [];

canvas.addEventListener('click', function(event) {
	const x = event.offsetX;
	const y = event.offsetY;
	const radius = 50;
	
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.stroke();
	
	const numVertices = 16;
	const angleIncrement = (2 * Math.PI) / numVertices;
	
	for (let i = 0; i < numVertices; i++) {
		const angle = i * angleIncrement;
		const pointX = x + radius * Math.cos(angle);
		const pointY = y + radius * Math.sin(angle);
		
		points.push({x: pointX, y: pointY});
	}
	
	drawConvexHull(points);
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
