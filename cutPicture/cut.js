/**
 * Created by ruby on 2014/9/21.
 */
var canvas=document.getElementById('canvas'),
    context=canvas.getContext('2d'),
    cw=canvas.width,
    ch=canvas.height,
    image=new Image(),
    offscreenCanvas=document.createElement('canvas'),
    offscreenContext=offscreenCanvas.getContext('2d');
    offscreenCanvas.width=cw;
    offscreenCanvas.height=ch;
image.src='images/beauty.jpg';
image.onload=function(){
    context.drawImage(image,0,0,cw,ch,0,0,cw,ch);
}
function drawFrame(beginX,beginY,endX,endY){
    offscreenContext.lineWidth=1;
    offscreenContext.clearRect(0,0,cw,ch);
    offscreenContext.strokeRect(beginX,beginY,endX-beginX,endY-beginY);
    context.drawImage(image,0,0,cw,ch,0,0,cw,ch);
    context.drawImage(offscreenCanvas,0,0,cw,ch,0,0,cw,ch);
    rect.status=true;
    rect.beginX=beginX;
    rect.beginY=beginY;
    rect.endX=endX;
    rect.endY=endY;
}
function restore(){
    context.clearRect(0,0,cw,ch);
    context.drawImage(image,0,0,cw,ch,0,0,cw,ch);
    rect.status=false;
    offscreenContext.clearRect(0,0,cw,ch);
}
var mousedown=false,
    beginX,
    beginY,
    rect={
        status:false
    },
    sureBtn=document.getElementById('sureBtn');
canvas.onmousedown=function(e){
    beginX= e.offsetX,
    beginY= e.offsetY;
    mousedown=true;
}
canvas.onmouseup=function(e){
    mousedown=false;
    beginX=undefined;
    beginY=undefined;
}
canvas.onmousemove=function(e){
    var endX= e.offsetX,
        endY= e.offsetY;
    if(mousedown){
        if(rect.status && endX>rect.beginX && endX<rect.endX && endY>rect.beginY && endY<rect.endY){
            canvas.style.cursor='pointer';
            context.drawImage(image,0,0,cw,ch,0,0,cw,ch);
            context.drawImage(offscreenCanvas,0,0,cw,ch,endX-beginX,endY-beginY,cw,ch);
        }else{
            canvas.style.cursor='crosshair';
            drawFrame(beginX,beginY,endX,endY);
        }
    }

}
sureBtn.onclick=function(){
    var imageData=context.getImageData(rect.beginX,rect.beginY,rect.endX-rect.beginX,rect.endY-rect.beginY);
    var resultCanvas=document.getElementById('result'),
        resultContext=resultCanvas.getContext('2d');
        resultCanvas.width=rect.endX-rect.beginX;
        resultCanvas.height=rect.endY-rect.beginY;
    resultContext.clearRect(0,0,resultCanvas.width,resultCanvas.height);
    resultContext.putImageData(imageData,0,0,0,0,rect.endX-rect.beginX,rect.endY-rect.beginY);
    var src=resultCanvas.toDataURL('image/png');
    var resultImage=new Image();
    resultImage.src=src;
    var img=document.getElementsByTagName("img")[0];
    if(img){
        document.getElementById('resultWrap').removeChild(img);
    }
    document.getElementById('resultWrap').appendChild(resultImage);
    document.getElementById('resultWrap').style.display='block';
    restore();

}