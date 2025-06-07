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

// Start the main app logic.
requirejs(['little-engine'],
function (engine) {
    var container = document.querySelector("#little-engine-frame");
    container.style.height = (container.clientWidth * 9 / 16) + "px";
    var canvas = document.querySelector("#little-engine-frame canvas");
    var littleEngine = engine({ canvas: canvas });
    canvas.style.width = container.clientWidth + "px";
    canvas.style.height = container.clientHeight + "px";
});