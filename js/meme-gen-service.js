'use strict'

var gNextId = 1;
var gImgs = [];

var gCanvas;
var gCtx;

var gTXTnextId = 1;
var gTxt = [];
var gOpen = false;


function createImgs(){
    gImgs = [
        createImg('car','cars','road'),
        createImg('slap','batman','cartoons'),
        createImg('trump','usa','politics'),
        createImg('eyes','not sure'),
        createImg('stark','winter','tv shows'),
        createImg('wolf','cheers','movies'),
        createImg('cry','woman','sad'),
        createImg('advice_dog','dogs','animals'),
        createImg('disaster_girl','kids','fire'),
        createImg('double_facepalm','office','coding'),
        createImg('dwight_schrute','office','tv shows'),
        createImg('grandma_finds_the_internet','old people','internet'),
        createImg('koala_cant_believe','animals','lazy'),
        createImg('success_kid','kids'),
        createImg('third_world_success','kids','dance'),
        createImg('wonka','tv showss'),
        createImg('yes_this_is_dog','animals','dogs','phone'),
        createImg('yo_dawg','celeb','funny'),
    ]
    return;
}

function createImg(name) {
    var img = {
        id: gNextId++,
        url: `imgs/${name}.jpg`,
        keywords: arguments
    }
    return img;
}

var gMeme = {
    selectedImgId: 5,
    txts: [
        {line: 'i never ever',
        size: 20,
        align: 'left',
        color: 'black'
    }], 
}

function getImg(el=1){
    return gImgs[el].url;
}

function downloadCanvas(elLink) {
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'my-img.jpg';
}

function closeEdit(el) {
 
}


function getTXTnextId(){
    return gTXTnextId++;
}
    
function deleteTxt(id){
    gTxt.splice(id,1)
}
function editTxtByIdx(idx,str){
    gTxt[idx].str = str;
}


