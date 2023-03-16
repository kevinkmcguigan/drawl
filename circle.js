const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('click', function(event) {
	const x = event.offsetX;
	const y = event.offsetY;
	const radius = 50;

	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.stroke();
});
