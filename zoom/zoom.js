/**
 * Created by ruby on 2014/9/21.
 */
var canvas=document.getElementById('canvas'),
    image=new Image(),
    context=canvas.getContext('2d'),
    canvasWidth=canvas.width,
    canvasHeight=canvas.height,
    offscreenCanvas=document.createElement('canvas'),
    offscreenContext=offscreenCanvas.getContext('2d');
    offscreenCanvas.width=canvasWidth;
    offscreenCanvas.height=canvasHeight;
image.src='images/scenery.jpg';
function drawScaled(zoom){
    context.clearRect(0,0,canvasWidth,canvasHeight);

    watermark();
    context.drawImage(offscreenCanvas,0,0,canvasWidth,canvasHeight,canvasWidth/2*(1-zoom),canvasHeight/2*(1-zoom),canvasWidth*zoom,canvasHeight*zoom)
}
function watermark(zoom){
    offscreenContext.drawImage(image,0,0,canvasWidth,canvasHeight,0,0,canvasWidth,canvasHeight);
    var lineOne='Copyright',
        lineTwo='Ruby',
        FONT_HEIGHT=40,
        textMetrics1,
        textMetrics2;
    offscreenContext.save();
    offscreenContext.font=FONT_HEIGHT+'px Arial';

    textMetrics1=offscreenContext.measureText(lineOne);

    offscreenContext.globalAlpha=0.5;
    offscreenContext.translate(canvas.width/2,canvas.height*3/4-FONT_HEIGHT/2);

    offscreenContext.fillText(lineOne,0,0);
    offscreenContext.strokeText(lineOne,0,0);

    textMetrics2=offscreenContext.measureText(lineTwo);
    offscreenContext.fillText(lineTwo,(textMetrics1.width-textMetrics2.width)/2,FONT_HEIGHT);
    offscreenContext.strokeText(lineTwo,(textMetrics1.width-textMetrics2.width)/2,FONT_HEIGHT);

    offscreenContext.restore();

}

image.onload=function(e){
    drawScaled(1);
}
var range=document.getElementById("myrange");
range.onchange=function(e){
    var zoom= e.target.value;
    drawScaled(zoom);
}
