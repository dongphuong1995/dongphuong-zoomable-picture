var thumbImg = document.querySelectorAll('.thumb .item-thumb');
var lengthThumb = thumbImg.length;
var mainImg = document.getElementById('main-img');
var curIndexSide = 1;
var winWidth = this.window.innerWidth;
mainImg.setAttribute('data-num',1);

// Create Note 
const mainZoomImg = document.createElement('div');
const bgZoomImg = document.createElement('div');
const arrowLeft = document.createElement('div');
const arrowRight = document.createElement('div');
const closeZoomImg = document.createElement('div');
const iconZoomZoomImg = document.createElement('div');
const countZoomImg = document.createElement('div');
const listImgZoomImg = document.createElement('div');
const itemImgZoomImg = document.createElement('div');

mainZoomImg.setAttribute('id','zoom-img');
bgZoomImg.setAttribute('class','bg-zoom');
arrowLeft.setAttribute('class','arrow left');
arrowRight.setAttribute('class','arrow right');
closeZoomImg.setAttribute('class','close-zoom');
iconZoomZoomImg.setAttribute('class','zoom-zoom');
countZoomImg.setAttribute('class','count-zoom');
listImgZoomImg.setAttribute('class','list-img-zoom');
itemImgZoomImg.setAttribute('class','item-list-img-zoom');

document.getElementsByTagName('body')[0].append(mainZoomImg);
mainZoomImg.append(bgZoomImg);
mainZoomImg.append(arrowLeft);
mainZoomImg.append(arrowRight);
mainZoomImg.append(closeZoomImg);
mainZoomImg.append(iconZoomZoomImg);
mainZoomImg.append(countZoomImg);
mainZoomImg.append(listImgZoomImg);
countZoomImg.textContent = '1 / ' + lengthThumb;
// Create Note 


// Click Item Thumb
for(var i = 0 ; i < lengthThumb ; i++){
    thumbImg[0].classList.add('active');
    thumbImg[i].addEventListener('click',function(e){
        e.preventDefault();
        var srcImg = this.getAttribute('data-src');
        var numberSide = this.getAttribute('data-num');
        thumbImg.forEach(element => {
            element.classList.remove('active');
        });
        this.classList.add('active');
        mainImg.setAttribute('src',srcImg)
        mainImg.setAttribute('data-num',numberSide)
    });
    listImgZoomImg.innerHTML += '<div class="item-img-zoom"><div><img src="'+thumbImg[i].getAttribute('data-src')+'" /></div></div>';
}
// Click Item Thumb

// Resize Set Width List Img Popup
listImgZoomImg.style.width = winWidth * lengthThumb + 'vw';
window.addEventListener('resize', function(){
    winWidth = this.window.innerWidth;
    listImgZoomImg.style.width = winWidth * lengthThumb + 'vw';
    transaltePopupImg()
});
// Resize Set Width List Img Popup

// Click Main Img
var getIdZoomImg = document.getElementById('zoom-img');


mainImg.addEventListener('click',function(){
    getIdZoomImg.classList.add('active');
    var indexSide = this.getAttribute('data-num');
    changePagination(indexSide)
    curIndexSide = indexSide;
    removeActiveListThumb(curIndexSide - 1);
    transaltePopupImg();
    zoomImage();
});

// Click Main Img


document.querySelector('#zoom-img .close-zoom').addEventListener('click',function(){
    getIdZoomImg.classList.remove('active');
});


document.querySelector('#zoom-img .arrow.right').addEventListener('click',function(){
    slideRight();
});

document.querySelector('#zoom-img .arrow.left').addEventListener('click',function(){
    slideLeft();
});

document.querySelector('#zoom-img .zoom-zoom').addEventListener('click',function(){
    var checkActiveZoom  = hasClass(this,'active');
    if(checkActiveZoom){
        this.classList.remove('active');
        document.querySelector('#zoom-main img').style.transform = 'scale(1)';
    }else{
        this.classList.add('active');
        document.querySelector('#zoom-main img').style.transform = 'scale(1.2)';
    }
});

// Function 
var listThumbPopup = document.querySelectorAll('#zoom-img .list-img-zoom .item-img-zoom');
listThumbPopup[0].setAttribute('id','zoom-main');
function removeActiveListThumb(b){    
    listThumbPopup.forEach(element => {
        element.setAttribute('id','');
    });
    listThumbPopup[b].setAttribute('id','zoom-main');
}

function changePagination(a){
    countZoomImg.textContent = a + ' / ' + lengthThumb;
}

function transaltePopupImg(){
    listImgZoomImg.style.transform = 'translate3d(-'+(curIndexSide - 1) * winWidth +'px, 0px, 0px)';
}

function slideLeft(){
    curIndexSide =  parseInt(curIndexSide) - 1;
    if(curIndexSide < 1 ){
        curIndexSide = lengthThumb;
    }
    changePagination(curIndexSide)
    removeActiveListThumb(curIndexSide - 1)
    transaltePopupImg();
    zoomImage();
}

function slideRight(){
    curIndexSide =  parseInt(curIndexSide) + 1;
    if(curIndexSide > lengthThumb){
        curIndexSide = 1;
    }
    changePagination(curIndexSide)
    removeActiveListThumb(curIndexSide - 1)
    transaltePopupImg()
    zoomImage();
}

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}
// Function 
// Keyup 
window.addEventListener('keydown',function(e){
    switch(e.keyCode) {
        case 37:
            slideLeft();
            break;
        case 39:
            slideRight();
            break;
        case 27:
            getIdZoomImg.classList.remove('active');
            break;
        default:

    }
});
// Keyup 


// Zoom 
function zoomImage(){
    var isDrag = false;
    var x_cursor,y_cursor;
    document.querySelectorAll('.item-img-zoom div img').forEach(element => {
        element.style.transform = 'translate3d(0px, 0px, 0px)';
    });
    document.getElementById('zoom-main').addEventListener('mousedown',function(){
        isDrag = true;
        x_cursor = window.event.clientX ;
        y_cursor = window.event.clientY;
    });
    document.getElementById('zoom-main').addEventListener('mousemove',function(){
        var x  = window.event.clientX - x_cursor;
        var y  = window.event.clientY - y_cursor;
        checkZoom = hasClass(mainZoomImg,'zoom-is');
        if(isDrag && winWidth <= 768){
            document.querySelector('#zoom-main img').style.transform = 'translate3d('+(x) +'px, '+(y)+'px, 0px) scale(1.2)';
        }
    });
    document.getElementById('zoom-main').addEventListener('mouseup',function(){
        isDrag = false;
        var checkActiveZoom  = hasClass(document.querySelector('#zoom-img .zoom-zoom'),'active');
        if(checkActiveZoom){
            document.querySelector('#zoom-main img').style.transform = 'translate3d(0px, 0px, 0px) scale(1.2)';
        }else{
            document.querySelector('#zoom-main img').style.transform = 'translate3d(0px, 0px, 0px)';
        }
    });
}

// Zoom 


