const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', function(event) {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});

canvas.addEventListener('mousemove', function(event) {
    if (isDrawing) {
        const x = event.offsetX;
        const y = event.offsetY;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 0, 255, 0.5)";
        ctx.arc(lastX, lastY, 25, 0, 2 * Math.PI);
        ctx.fill();

        const angle = Math.atan2(y - lastY, x - lastX);
        const point1x = lastX + 25 * Math.cos(angle + Math.PI / 2);
        const point1y = lastY + 25 * Math.sin(angle + Math.PI / 2);
        const point2x = lastX + 25 * Math.cos(angle - Math.PI / 2);
        const point2y = lastY + 25 * Math.sin(angle - Math.PI / 2);

        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(point1x, point1y, 2, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(point2x, point2y, 2, 0, 2 * Math.PI);
        ctx.fill();

        lastX = x;
        lastY = y;
    }
});

canvas.addEventListener('mouseup', function(event) {
    isDrawing = false;

    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 0, 255, 0.5)";
    ctx.arc(lastX, lastY, 25, 0, 2 * Math.PI);
    ctx.fill();

    const angle = Math.atan2(lastY - lastY, event.offsetX - lastX);
    const point1x = lastX + 25 * Math.cos(angle + Math.PI / 2);
    const point1y = lastY + 25 * Math.sin(angle + Math.PI / 2);
    const point2x = lastX + 25 * Math.cos(angle - Math.PI / 2);
    const point2y = lastY + 25 * Math.sin(angle - Math.PI / 2);

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(point1x, point1y, 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(point2x, point2y, 2, 0, 2 * Math.PI);
    ctx.fill();
});
