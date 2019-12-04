'use strict'

var gIdx;
var gFont = 'Impact';
var gIsEdit = false;
var gFontSize = '50';
var gTxtColor = 'white';
var gTxtColorStroke = 'black';
var gIsStroke = true;
var gCurrTxt;
var gClickCount = 1;


function init() {
    createImgs()
    renderImgs();
    initCanvas()
}


function renderImgs(name) {
    var elImgs = document.querySelector('.imgs')
    gImgs.map(function (img) {
        elImgs.innerHTML += `<img class="img" onclick="getImg(this.id)" id="${img.id}" src="${img.url}">`
    })
}

function renderMeme() {
}
function initRender(){
    var background = new Image();
    background.src = `${getImg()}`;
    gCtx.drawImage(background, 0, 0);
    gCtx.font = `${gFontSize}px ${gFont}`;

}
function initCanvas() {
    var background = new Image();
    background.src = `${getImg()}`;
    gCanvas = document.querySelector('#canvas-body');
    gCanvas.style.letterSpacing = '1px';

    gCanvas.width = background.width;
    gCanvas.height = background.height

    gCtx = gCanvas.getContext('2d')
    gCtx.fillRect(0, 0, background.width, gCanvas.height);

    gCtx.drawImage(background, 0, 0);
    gCtx.font = "50px Impact";
}
function onClickCount(){
    var y;
    

    if(gClickCount <= 1) {
        y = 50;
        return y;
    }
    if(gClickCount === 2) {
        y = 300; 
        return y;
    }


}
function onAddTxt() {


    gClickCount++;
    document.querySelector('#addTxt').value = '';

    renderLines()



}

function renderLines(){
    gTxt.map(function(txt){
        var str = txt.str;
        var x = txt.posX;
        var y = txt.posY;
        var font = txt.font
        gCtx.font = font;
        gCtx.fillStyle = txt.color;

        if(txt.isStorke){
            setStroke(str,x,y)
        } else {
            gCtx.fillText(str, x, y)
        }
    })
}
function renderLine(txt){
        var str = txt.str;
        var x = txt.posX;
        var y = txt.posY;
        var font = txt.font
        gCtx.font = font;
        gCtx.fillStyle = txt.color;

        if(txt.isStorke){
            setStroke(str,x,y)
        } else {
            gCtx.fillText(str, x, y)
        }
}


function onGetFont(el) {
    gFont = el;
}
function onShadowON() {
    gIsStroke = true;
}


function setStroke(txt,x,y){
    gCtx.strokeStyle = "black";

    gCtx.font = `${gFontSize}px ${gFont}`;

    gCtx.lineWidth = 2.5;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);

}

function onDeleteTxt(){
    if(!gIsEdit) return;

    gClickCount = 1;


    deleteTxt(gCurrTxt.gIdx)
    initRender()
    gIsEdit = false;
    renderLines()
    
}

function onInput() {
    var el = document.querySelector('#addTxt').value
    if(gIsEdit) return;




    initRender()
    renderLines()
    

    gCtx.font = `${gFontSize}px ${gFont}`;
    gCtx.fillStyle = `${gTxtColor}`;



    if(gIsStroke){
        setStroke(el,10,onClickCount())
    } else {
        gCtx.fillText(el,10,onClickCount())
    }





    var txt = {
        id: getTXTnextId(),
        str: el,
        strW: calStrWidth(),
        strH: gFontSize,
        posX: 10,
        posY: onClickCount(),
        color: `${gTxtColor}`,
        font: `${gFontSize}px ${gFont}`,
        isStorke: `${gIsStroke}`
    }
    gTxt.push(txt)
    gClickCount++;

    var elInput = document.querySelector('#addTxt')

    elInput.value = ``;



}

function canvasClicked(ev) {
    gTxt.find((txt,idx) => {
        if ( 
            ev.offsetX > txt.posX && ev.offsetX < txt.posX + txt.strW &&
            ev.offsetY > (txt.posY - txt.strH) &&  ev.offsetY < txt.posY){
            gIsEdit = true
            gCurrTxt = txt;
            gIdx = idx
            txtEdit(txt)
        }
    })

}



function markTxt(txt){
    var x = txt.posX -5
    var y = txt.posY + 5
    var w = txt.strW +10
    var h = -50 
    gCtx.rect(x, y, w, h);
    gCtx.stroke();
}
function calStrWidth(){
    var str = document.querySelector('#addTxt').value
    var w =  gCtx.measureText(str).width;
     return w;
 }

function txtEdit(obj){
    markTxt(obj)
    var elInput = document.querySelector('#addTxt');
    elInput.placeholder = `Edit Text`;
    // initRender()
    elInput.value = ``;
    elInput.placeholder = `${obj.str}`;

    var alal = elInput.value;
    console.log(alal)
}

function onEdit(el){
    if(!gIsEdit)return;

    var str = el;
    editTxtByIdx(gIdx,str)
    gIsEdit = false;
    var elInput = document.querySelector('#addTxt');
    elInput.value = ``;
    elInput.placeholder = `add text`;

  



    initRender()
    renderLines()


}



function onMakeMail() {
    var mailSubject = document.querySelector('.mailSubject').value;
    var mailTxt = document.querySelector('.mailTxt').value;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=hillel.eli396@gmail.com,maorrbarel@gmail.com&su=${mailSubject}&b
ody=${mailTxt}`);
}
