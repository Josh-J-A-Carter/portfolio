requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    }
});

var littleEngine;

// Start the main app logic.
requirejs(['little-engine'],
function (engine) {
    // engine({ canvas: document.querySelector("#canvas") })
    littleEngine = engine;
    setupFrame(document.getElementById("little-engine-frame"), engine, 'little-engine-img.png');
});




function setupFrame(frame, factory, png) {
    frame.onmouseover = () => showOverlay(frame);
    frame.onmouseout = () => hideOverlay(frame);

    frame.querySelector(".overlay").onclick = () => instantiate(frame, factory);

    resizeCanvas(frame);
}

function showOverlay(frame) {
    frame.querySelector(".overlay-text").classList.remove("invisible");
    frame.querySelector(".overlay").classList.add("blur");
    frame.querySelector(".overlay").classList.add("pointer");
}

function hideOverlay(frame) {
    frame.querySelector(".overlay-text").classList.add("invisible");
    frame.querySelector(".overlay").classList.remove("blur");
    frame.querySelector(".overlay").classList.remove("pointer");
}

// Function to load a JS file
function instantiate(frame, factory) {
    frame.onmouseover = () => {};
    frame.onmouseout = () => {};

    frame.querySelector(".overlay").remove();
    
    var canvas = frame.querySelector("canvas");
    factory({ canvas: canvas });
    resizeCanvas(frame);
}

function resizeCanvas(frame) {
    frame.style.height = (frame.clientWidth * 9 / 16) + "px";
    var canvas = frame.querySelector("canvas");
    canvas.style.width = frame.clientWidth + "px";
    canvas.style.height = frame.clientHeight + "px";
}