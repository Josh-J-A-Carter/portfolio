
setupFrame(document.getElementById("little-engine-frame"), './little-engine.js', 'little-engine-img.png');


function setupFrame(frame, file, png) {
    frame.onmouseover = () => showOverlay(frame);
    frame.onmouseout = () => hideOverlay(frame);
    frame.onclick = () => instantiate(frame, file);

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

function instantiate(frame, file) {
    frame.onmouseover = null;
    frame.onmouseout = null;
    frame.onclick = null;

    frame.querySelector(".overlay-text").classList.add("invisible");
    frame.querySelector(".spinner").classList.remove("invisible");

    import(file).then(module => {
        var c = frame.querySelector("canvas");
        module.default({ canvas: c, focusin: c, focusout: c }).then(engine => {
            resizeCanvas(frame);
            frame.querySelector(".overlay").remove();

            // Weird stuff with focus; don't know how to fix atm :(
            // engine.ccall('remove_focus', 'void', []);
        });
    });
}

function resizeCanvas(frame) {
    frame.style.height = (frame.clientWidth * 9 / 16) + "px";
    var canvas = frame.querySelector("canvas");
    canvas.style.width = frame.clientWidth + "px";
    canvas.style.height = frame.clientHeight + "px";
}