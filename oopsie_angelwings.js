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

        const angle = Math.atan2(y - lastY, x - lastX);
        const offset = 25;
        const rightX = lastX + offset * Math.cos(angle - Math.PI / 2);
        const rightY = lastY + offset * Math.sin(angle - Math.PI / 2);
        const leftX = lastX + offset * Math.cos(angle + Math.PI / 2);
        const leftY = lastY + offset * Math.sin(angle + Math.PI / 2);

        ctx.beginPath();
        ctx.arc(rightX, rightY, 5, "rgba(255, 0, 255, 0.5)");
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(leftX, leftY, 5, "rgba(255, 0, 255, 0.5)");
        ctx.stroke();

        lastX = x;
        lastY = y;
    }
});

canvas.addEventListener('mouseup', function(event) {
    isDrawing = false;

    const angle = Math.atan2(event.offsetY - lastY, event.offsetX - lastX);
    const offset = 25;
    const rightX = lastX + offset * Math.cos(angle - Math.PI / 2);
    const rightY = lastY + offset * Math.sin(angle - Math.PI / 2);
    const leftX = lastX + offset * Math.cos(angle + Math.PI / 2);
    const leftY = lastY + offset * Math.sin(angle + Math.PI / 2);

    ctx.beginPath();
    ctx.arc(rightX, rightY, 5, "rgba(255, 0, 255, 0.5)");
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(leftX, leftY, 5, "rgba(255, 0, 255, 0.5)");
    ctx.stroke();

    const startAngle = Math.atan2(leftY - rightY, leftX - rightX);
    const endAngle = Math.atan2(event.offsetY - lastY, event.offsetX - lastX);
    const radius = 25 / Math.cos(endAngle - startAngle);

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(rightX, rightY);
    ctx.lineTo(leftX, leftY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(rightX, rightY, radius, startAngle, endAngle);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(leftX, leftY, radius, endAngle, startAngle);
    ctx.stroke();

    ctx.lineWidth = 1;
});
