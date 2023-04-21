let hero = document.querySelector('#hero-slider'),
      main = document.querySelector('#slides-main'),
      aux = document.querySelector('#slides-aux'),
      current = document.querySelector('#slider-nav .current'),
      items = document.querySelectorAll('[data-index]'),
      total = items.length / 2,
      handle = null,
      idle = true,
      activeIndex = -1,
      interval = 3500;
      items = Array.from(items);

$( document ).ready(function() {
    const loaded = function () {
        slider.hero.classList.add('loaded');
    }
});

function calcMaxHeight(items) {
    let maxHeight = 0;

    items.forEach(item => {
        const h = item.clientHeight;
        maxHeight = h > maxHeight ? h : maxHeight;
    });
    return maxHeight;
}

function removeClasses(nodeList) {
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].classList.remove('active');
        nodeList[i].classList.remove('prev');
    }
}

function addClasses(nodeList, cssClasses) {
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].classList.add(...cssClasses);
    }
}

function setHeight(holder, items) {
    const h = calcMaxHeight(items);
    holder.style.height = `${h}px`;
}

function leadingZero(arguments) {
    return arguments < 10 ? '0' + arguments : arguments;
}

function setCurrent() {
    current.innerText = leadingZero(activeIndex + 1);
}

function changeSlide(direction) {
    idle = false;
    hero.classList.remove('prev', 'next');
    if (direction == 'next') {
        activeIndex = (activeIndex + 1) % total;
        hero.classList.add('next');
    } else {
        activeIndex = (activeIndex - 1 + total) % total;
        hero.classList.add('prev');
    }

    //reset classes
    removeClasses(items);

    //set prev  
    function prevItems(){
        let newarr = [];
        items.filter(item => {
            let prevIndex;
            if (hero.classList.contains('prev')) {
                prevIndex = activeIndex == total - 1 ? 0 : activeIndex + 1;
            } else {
                prevIndex = activeIndex == 0 ? total - 1 : activeIndex - 1;
            }
            if(item.dataset.index == prevIndex){
                newarr.push(item);
            }
        });
        return newarr
    }
    

    //set active
    function activeItems(){
        let newarr = [];
        items.filter(item => {
            if(item.dataset.index == activeIndex){
                newarr.push(item);
            }
            // return item.dataset.index == activeIndex;
        });
        return newarr
    }
    addClasses(prevItems(), ['prev']);
    addClasses(activeItems(), ['active']);
    setCurrent();

    // const activeImageItem = main.querySelector('.active');
    // activeImageItem.addEventListener('transitionend', waitForIdle, {
    //     once: true
    // });
}

function resize() {
    setHeight(aux, aux.querySelectorAll('.slide-title'));
}

function load() {
    setHeight(aux, aux.querySelectorAll('.slide-title'));
    hero.classList.add('ready');
    hero.classList.add('loaded');
    nextSlide()
    // loadingAnimation();
}

function previousSlide(){
    changeSlide('prev');
}

function nextSlide(){
    changeSlide('next');
}

window.addEventListener('load', load());
window.addEventListener("resize", resize());

const handelVisibilityChange =()=>{
    if(document.visibilityState === "hidden"){
        console.log("user left the page");
    }
    else{
        console.log("user opened the page")
    }
}

$( document ).ready(function() {
    document.addEventListener("visibilitychange", handelVisibilityChange);
});


//to hide the code to view from shortcut keys 

