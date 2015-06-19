Template.drawdemo.rendered = drawstuff();

function drawstuff(){
     console.log("drawstuff");
     drawSpace = document.getElementById("drawSpace");
     drawTriangle();
     // drawContext.fillStyle = "#c4affa";
     // drawContext.fillRect(10,10,100,100);
     // drawContext.fillRect(50,50,550,250);
}

function drawTriangle(){
     var drawContext = drawSpace.getContext("2d");
     drawContext.strokeStyle = "#ffffff";
     drawContext.lineTo(100,100);
     drawContext.lineTo(150,100);
     drawContext.lineTo(125,150);
     drawContext.lineTo(100,100);
     drawContext.stroke();
}