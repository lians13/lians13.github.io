//var grid = $('#grid');
var grid=document.getElementById("grid");
var ctx =grid.getContext('2d');

var gridColor= "#666";

var girdSize = vm.blockSize;

var canvasWidth = ctx.canvas.width;
var canvasHeight = ctx.canvas.height;

var xLineTotals = Math.floor(canvasHeight / girdSize);

for (var i = 0; i < xLineTotals; i++) {
    ctx.beginPath(); 
    ctx.moveTo(0, girdSize * i); 
    ctx.lineTo(canvasWidth, girdSize * i - 0.5);
    ctx.strokeStyle = gridColor; 
    ctx.stroke();
}

var yLineTotals = Math.floor(canvasWidth / girdSize);

for (var i = 0; i < yLineTotals; i++) {
    ctx.beginPath(); 
    ctx.moveTo( girdSize * i,0); 
    ctx.lineTo(girdSize * i - 0.5,canvasHeight);
    ctx.strokeStyle = gridColor; 
    ctx.stroke();
}