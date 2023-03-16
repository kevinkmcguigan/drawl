const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let points = [];

canvas.addEventListener('mousedown', function(event) {
	isDrawing = true;
	lastX = event.offsetX;
	lastY = event.offsetY;
	points.push({x: lastX, y: lastY});
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
		
		lastX = x;
		lastY = y;
		
		points.push({x: x, y: y});
	}
});

canvas.addEventListener('mouseup', function(event) {
	isDrawing = false;

	// Buffer the line by 50 pixels
	const bufferedPoints = bufferLine(points, 50, true);
	
	// Draw the buffered polygon
	ctx.fillStyle = '#000000';
	ctx.beginPath();
	ctx.moveTo(bufferedPoints[0].x, bufferedPoints[0].y);
	for (let i = 1; i < bufferedPoints.length; i++) {
		const p1 = bufferedPoints[i - 1];
		const p2 = bufferedPoints[i];
		const dx = p2.x - p1.x;
		const dy = p2.y - p1.y;
		const angle = Math.atan2(dy, dx);
		const radius = 25;
		const cp1x = p1.x + radius * Math.cos(angle - Math.PI / 2);
		const cp1y = p1.y + radius * Math.sin(angle - Math.PI / 2);
		const cp2x = p2.x + radius * Math.cos(angle + Math.PI / 2);
		const cp2y = p2.y + radius * Math.sin(angle + Math.PI / 2);
		ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
	}
	ctx.closePath();
	ctx.fill();
	
	// Clear the points array
	points = [];
});

function bufferLine(points, bufferDistance, closed) {
    const newPoints = [];
    for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length];

        // Calculate the angle of the line segment
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);

        // Calculate the offset vector
        const dx = bufferDistance * Math.sin(angle);
        const dy = bufferDistance * -Math.cos(angle);

        // Calculate the new points
        const np1 = { x: p1.x + dx, y: p1.y + dy };
        const np2 = { x: p2.x + dx, y: p2.y + dy };

        // Add the new points to the new points array
        newPoints.push(np1);
        newPoints.push(np2);
    }

    if (closed) {
        // Calculate the points for the rounded ends
        const firstPoint = newPoints[0];
        const lastPoint = newPoints[newPoints.length - 1];
        const secondLastPoint = newPoints[newPoints.length - 2];
        const angle1 = Math.atan2(secondLastPoint.y - firstPoint.y, secondLastPoint.x - firstPoint.x);
        const angle2 = Math.atan2(firstPoint.y - lastPoint.y, firstPoint.x - lastPoint.x);
        const dx1 = bufferDistance * Math.sin(angle1);
        const dy1 = bufferDistance * -Math.cos(angle1);
        const dx2 = bufferDistance * Math.sin(angle2);
        const dy2 = bufferDistance * -Math.cos(angle2);
        const cp1x = firstPoint.x + dx1;
        const cp1y = firstPoint.y + dy1;
        const cp2x = firstPoint.x - dx1;
        const cp2y = firstPoint.y - dy1;
        const cp3x = lastPoint.x + dx2;
        const cp3y = lastPoint.y + dy2;
        const cp4x = lastPoint.x - dx2;
        const cp4y = lastPoint.y - dy2;

        // Add the control points and the first point to the new points array
        newPoints.unshift({ x: cp1x, y: cp1y });
        newPoints.unshift({ x: cp2x, y: cp2y });
        newPoints.unshift(firstPoint);

        // Add the control points and the last point to the new points array
        newPoints.push({ x: cp3x, y: cp3y });
        newPoints.push({ x: cp4x, y: cp4y });
        newPoints.push(lastPoint);

        // Close the polygon
        newPoints.push(newPoints[0]);
    }

    return newPoints;
}
