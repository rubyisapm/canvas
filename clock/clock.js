/**
 * Created by ruby on 2014/9/22.
 */
var canvas=document.getElementById('canvas'),
    context=canvas.getContext('2d'),
    cw=canvas.width,
    ch=canvas.height,
    pointerR=180;
function drawCircle(){
    context.strokeStyle='#a8e0f1';
    context.fillStyle='#b9efff';
    context.arc(1/2*cw,1/2*ch,200,0,Math.PI*2,false);
    context.fill();
    context.stroke();
}
function drawCenter(){
    context.beginPath();
    context.fillStyle='#3197b5';
    context.arc(1/2*cw,1/2*ch,5,0,Math.PI*2,false);
    context.fill();
    context.restore();
}
function drawHour(h,m){
    context.beginPath();
    context.strokeStyle='#3197b5';
    context.moveTo(1/2*cw,1/2*ch);
    context.lineTo(1/2*cw+Math.sin((h+m/60)*30*Math.PI/180)*pointerR/3,1/2*ch-Math.cos((h+m/60)*30*Math.PI/180)*pointerR/3);
    context.stroke();
}
function drawMinute(m,s){
    context.beginPath();
    context.strokeStyle='#3197b5';
    context.moveTo(1/2*cw,1/2*ch);
    context.lineTo(1/2*cw+Math.sin((m+s/60)*6*Math.PI/180)*pointerR/2,1/2*ch-Math.cos((m+s/60)*6*Math.PI/180)*pointerR/2);
    context.stroke();
}
function drawSecond(s){
    context.beginPath();
    context.strokeStyle='#3197b5';
    context.moveTo(1/2*cw,1/2*ch);
    context.lineTo(1/2*cw+Math.sin(s*360/60*Math.PI/180)*pointerR,1/2*ch-Math.cos(s*360/60*Math.PI/180)*pointerR);
    context.stroke();
}
drawCircle();
drawCenter();
drawHour(10,31);
drawMinute(31,15);
drawSecond(15)