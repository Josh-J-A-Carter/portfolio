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

// window.createLittleEngine = { canvas: document.querySelector("#canvas") };

// Start the main app logic.
requirejs(['little-engine'],
function (engine) {
    console.log("pls work");
    console.log(document.querySelector("#little-engine-frame canvas"));
    var test = engine({ canvas: document.querySelector("#little-engine-frame canvas") });
    console.log("here");
});