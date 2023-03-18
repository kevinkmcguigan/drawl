const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('mousedown', function(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  const radius = 50;
  const smallRadius = 12;
  const numVertices = 3;
  
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();

  const angleIncrement = (2 * Math.PI) / numVertices;
  let currentAngle = 0;

  canvas.addEventListener('mousemove', function(event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;
    const dx = mouseX - x;
    const dy = mouseY - y;
    const angle = Math.atan2(dy, dx);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    for (let i = 0; i < numVertices; i++) {
      const vertexX = x + radius * Math.cos(currentAngle + angle);
      const vertexY = y + radius * Math.sin(currentAngle + angle);
      ctx.beginPath();
      ctx.arc(vertexX, vertexY, smallRadius, 0, 2 * Math.PI);
      ctx.fill();
      currentAngle += angleIncrement;
    }
  });
});
