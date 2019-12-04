'use strict'

var gNextId = 0;
var isLeft = false;
var gCanvas;
var gCtx;
var gTxts = []
var gOpen = false;
var gFillterImg = []
var gSortable = []
var gLastTxt;


var gImgs = []
var gCurrTxt = {
    txt: '',
    color: `#fff`,
    font: `Impact`,
    size: 50,
    x: 50,
    y: 70,
    w: '',
    isMark: false,
}

function calcTxtSize(){
    var CanvasSize = gCanvas.width
    var txtSize = CanvasSize / 8
    gCurrTxt.size = txtSize
}
function calcXsize(){
    var CanvasSize = gCanvas.width
    var xSize = CanvasSize / 8
    gCurrTxt.x = xSize
}
function caclYsize(){
    var CanvasSize = gCanvas.height
    var ySize = CanvasSize / 5.6
    gCurrTxt.y = ySize

}

var gCurrImg;

function createImgs(){
    gImgs = [
        createImg('car','car','road'),
        createImg('slap','celeb','batman','cartoons','celeb','slap'),
        createImg('trump','usa','politics',`celeb`,'trump'),
        createImg('eyes','not sure','eyes'),
        createImg('stark','winter','tv shows',`celeb`,'stark'),
        createImg('wolf','cheers','movies','wolf',`celeb`),
        createImg('cry','woman','sad','cry'),
        createImg('advice_dog','dogs','animals'),
        createImg('disaster_girl','kids','fire'),
        createImg('double_facepalm','office','coding',),
        createImg('dwight_schrute','office','tv shows','celeb'),
        createImg('grandma_finds_the_internet','old people','internet'),
        createImg('koala_cant_believe','animals','lazy'),
        createImg('success_kid','kids'),
        createImg('third_world_success','kids','dance'),
        createImg('wonka','tv showss','wonka'),
        createImg('yes_this_is_dog','animals','dogs','phone'),
        createImg('yo_dawg','funny', 'celeb'),
    ]
    return;
}

function createImg(name,...args) {
    var img = {
        id: gNextId++,
        url: `imgs/${name}.jpg`,
        keywords: args
    }
    return img;
}

function initCanvas(elImg) {
    var elCont = document.querySelector('#canvas-conteiner')
    gCanvas = document.querySelector('#canvas-body');
    gCtx = gCanvas.getContext('2d')
    var width = elCont.clientWidth;
    gCanvas.width = width;
    var prop = elImg.naturalWidth / elImg.naturalHeight;
    gCanvas.height = gCanvas.width / prop;
    gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight,
        0, 0, gCanvas.width, gCanvas.height);
    gCurrImg = elImg
}
function setInput(elTxt) {
    gCurrTxt.txt = elTxt
}
function getCurrTxt() {
    return gCurrTxt;
}
function getCurrImg(){
    return gCurrImg;
}
function addTxt(){
    if(!gTxts.length) {
        gTxts.push(gCurrTxt)
    }
    addLine()
}
function addLine(){
    gCurrTxt = {
        txt: '',
        color: `#fff`,
        font: `Impact`,
        size: 50,
        x: 50,
        y: 350,
        w: getTxtWidth()
    } 
    if(gTxts.length){
        var CanvasSize = gCanvas.height
        var ySize = CanvasSize / 8
        var calc = CanvasSize - ySize
        gCurrTxt.y = calc
    } else if(!gTxts.length){
        caclYsize()
    }
    calcXsize()
    calcTxtSize()
}
function getTxts(){
    return gTxts;
}
function deleteTxt(elTxt){
    if(gCurrTxt.txt && !gTxts.length){
        gCurrTxt.txt = ``
    } else if(gCurrTxt.txt && gTxts.length){
        gCurrTxt.txt = ``
    } else if(!gCurrTxt.txt && gTxts.length){
        gCurrTxt.txt = ``
        gTxts = []
        resetTxts()
    }
}
function setCurrTxt(){
    gCurrTxt = gTxts[0]
}
function swapping(){
    gLastTxt = gCurrTxt
    gCurrTxt = gTxts[0]
    gTxts[0] = gLastTxt
}
function resetTxts(){
    gTxts = []
    gCurrTxt = {
        txt: '',
        color: `#fff`,
        font: `Impact`,
        size: 50,
        x: 50,
        y: 70,
        w: getTxtWidth()
    }
    caclYsize()
    calcXsize()
    calcTxtSize()
}
function setFont(elFont){
    gCurrTxt.font = elFont
}
function setColor(elColor){
    gCurrTxt.color = elColor
}
function setTxtLeft(){
    calcXsize()
}
function setTxtCenter(){
    var CanvasSize = gCanvas.width
    var xSize = CanvasSize / 4
    gCurrTxt.x = xSize
}
function setTxtRight(){
    var CanvasSize = gCanvas.width
    var txtSize = CanvasSize / 8
    var w = gCtx.measureText(gCurrTxt.txt).width;
    var calc = CanvasSize - w - txtSize;
    gCurrTxt.x = calc
}
function setTxtUp(){
    gCurrTxt.y -= 10;
}
function setTxtDown(){
    gCurrTxt.y += 10;
}
function setLargeTxt(){
    gCurrTxt.size += 10;
}
function setSmallTxt(){
    gCurrTxt.size -= 10;
}
function getTxtWidth(){
    var w = gCtx.measureText(gCurrTxt.txt).width;
    return w;
}


function searchByKey(elKey){
    var regex = RegExp(elKey);
    gFillterImg = gImgs.filter(img => {
        for(let i = 0; i < img.keywords.length; i++){
            var word = img.keywords[i]

            var x = regex.test(word) 
            if(x) return true

        }
    })
}
function getFillterdImg(){
    return gFillterImg;
}

function mappingKeywords(){
    var objMap = {};
    gImgs.map(img => {
        for(let i = 0; i <img.keywords.length; i++){
            var word = img.keywords[i]
            if(objMap[word]) objMap[word]++
            else objMap[word] = 1
        }
    })
    gSortable = [];
    for (var key in objMap) {
        if(objMap[key] > 1){
        gSortable.push([key, objMap[key]]);}
    }
    gSortable.sort(function(a, b) {
        return b[1] - a[1];
    });
}

function markTxt(currTxt){
    var width = gCtx.measureText(currTxt.txt).width;
    var x = currTxt.x -5
    var y = currTxt.y + 5
    var w = width +20
    var h = -50 
    gCtx.fillStyle = `rgba(66, 134, 244, 0.4)`
    gCtx.fillRect(x, y, w, h);
    gCtx.stroke();
}
function setIsMarkON(){
    gCurrTxt.isMark = true;
}
function setIsMarkOFF(){
    gCurrTxt.isMark = true;
}
function getSortedKeys(){
    return gSortable;
}
