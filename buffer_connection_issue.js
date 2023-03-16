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

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the offset lines
        const lineWidth = 1;
        const offsetDistance = 25;
        for (let i = 1; i < points.length; i++) {
            const p1 = points[i - 1];
            const p2 = points[i];

            // Calculate the angle of the line segment
            const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);

            // Calculate the offset vectors
            const dx = offsetDistance * Math.sin(angle);
            const dy = offsetDistance * -Math.cos(angle);

            // Calculate the new points
            const np1 = { x: p1.x + dx, y: p1.y + dy };
            const np2 = { x: p2.x + dx, y: p2.y + dy };
            const np3 = { x: p2.x - dx, y: p2.y - dy };
            const np4 = { x: p1.x - dx, y: p1.y - dy };

            // Draw the offset lines
            ctx.beginPath();
            ctx.moveTo(np1.x, np1.y);
            ctx.lineTo(np2.x, np2.y);
            ctx.lineWidth = lineWidth;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(np3.x, np3.y);
            ctx.lineTo(np4.x, np4.y);
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        }

        // Draw a circle at each point
        const radius = 25;
        for (let i = 0; i < points.length; i++) {
            const p = points[i];

            ctx.beginPath();
            ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(255, 0, 255, 0.1)";
            ctx.fill();
        }

        // Draw the line
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
});
