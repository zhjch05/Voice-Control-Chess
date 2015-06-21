Template.drawdemo.rendered = function(){
     var context = drawSpace.drawContext("2d");
     var my_gradient = context.createLinearGradient(0,0,300,0);
     my_gradient.addColorStop(0,"black");
     my_gradient.addColorStop(1,"white");
     context.fillStyle = my_gradient;
     context.fillRect(0,0,300,225);
}