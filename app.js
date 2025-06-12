
// The 'preload' class is used to stop animations from running on page load
setTimeout(() => document.body.classList.remove('preload'), 500);

setupUnityFrame(document.getElementById("chronodrive-frame"), "chronodrive");
setupEmscriptenFrame(document.getElementById("little-engine-frame"), 'engine', 'little-engine.js');


function setupUnityFrame(frame, folder) {
    frame.onmouseover = () => showOverlay(frame);
    frame.onmouseout = () => hideOverlay(frame);
    frame.onclick = () => instantiateUnity(frame, folder);

    frame.offsetHeight = (frame.offsetWidth * 9 / 16) + "px";
}

function instantiateUnity(frame, folder) {
    frame.onmouseover = null;
    frame.onmouseout = null;
    frame.onclick = null;

    frame.querySelector(".overlay-text").classList.add("invisible");
    frame.querySelector(".spinner").classList.remove("invisible");
    var overlay = frame.querySelector(".overlay");

    var child = document.createElement('iframe');
    child.src = "./frame-template.html";
    child.classList.add("contents");
    
    frame.appendChild(child);
    
    child.contentWindow.loadData = {
        folder: folder,
        parent: frame,
        cleanup: () => overlay.remove()
    };
}

function setupEmscriptenFrame(frame, folder, file) {
    frame.onmouseover = () => showOverlay(frame);
    frame.onmouseout = () => hideOverlay(frame);
    frame.onclick = () => instantiateEmscripten(frame, folder, file);

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

function instantiateEmscripten(frame, folder, file) {
    frame.onmouseover = null;
    frame.onmouseout = null;
    frame.onclick = null;

    frame.querySelector(".overlay-text").classList.add("invisible");
    frame.querySelector(".spinner").classList.remove("invisible");

    var canvas = frame.querySelector("canvas");

    canvas.addEventListener("wheel", () => {
        canvas.style.pointerEvents = "none";
    });

    frame.addEventListener("click", () => {
        canvas.style.pointerEvents = "all";
        canvas.requestPointerLock();
    });

    import(`./${folder}/${file}`).then(module => {
        var locateFile = (path, prefix) => {
            console.log(prefix, path);
            return `./${folder}/${path}`;
        }

        module.default({ canvas: canvas, locateFile: locateFile }).then(engine => {
            resizeCanvas(frame);
            frame.querySelector(".overlay").remove();

            // Have to keep track of focus, otherwise we need to press escape twice
            document.addEventListener("pointerlockchange", () => {
                if (document.pointerLockElement === canvas) engine.ccall('focusin', 'void', []);
                else engine.ccall('focusout', 'void', []);
            });
        });
    });
}

function resizeCanvas(frame) {
    frame.offsetHeight = (frame.offsetWidth * 9 / 16) + "px";
    var canvas = frame.querySelector("canvas");
    canvas.offsetWidth = frame.offsetWidth + "px";
    canvas.offsetHeight = frame.offsetHeight + "px";

    canvas.width = frame.offsetWidth;
    canvas.height = frame.offsetHeight;
}