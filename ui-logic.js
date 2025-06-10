
setupFrame(document.getElementById("little-engine-frame"), 'program.js', 'little-engine-img.png');

function setupFrame(frame, asset, png) {
    frame.onmouseover = _ => showOverlay(frame);
    frame.onmouseout = _ => hideOverlay(frame);
    frame.onclick = _ => loadScript(frame, asset);

    frame.querySelector('.contents');

    var canvas = frame.querySelector('.contents');
    var context = canvas.getContext('2d'); 
    var img = new Image();
    img.src = png;
    img.onload = () => context.drawImage(img, 0, 0, canvas.width, canvas.height);
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
async function loadScript(frame, url) {
    return await new Promise((resolve, reject) => {
        frame.onmouseover = () => {};
        frame.onmouseout = () => {};
        frame.onclick = () => {};

        console.log("initialised");
        // Module.ccall('remove_focus', 'void', []);

        // window.addEventListener('keydown', function(evt) {
        //     console.log("msg");
        //     evt = evt || window.event;
        //     var isEscape = false;
        //     if ("key" in evt) {
        //         isEscape = (evt.key === "Escape" || evt.key === "Esc");
        //     } else {
        //         isEscape = (evt.keyCode === 27);
        //     }
            
        //     if (isEscape) {
        //         console.log("Escape pressed");
        //     }
        // });
        const script = document.createElement('script');
        script.src = url;
        script.addEventListener('load', () => resolve());
        script.addEventListener('error', () => reject());
        document.body.appendChild(script);

        requirejs(['little-engine'],
        function (engine) {
            var container = document.querySelector("#little-engine-frame");
            container.style.height = (container.clientWidth * 9 / 16) + "px";
            var canvas = document.querySelector("#little-engine-frame canvas");
            var littleEngine = engine({ canvas: canvas });
            canvas.style.width = container.clientWidth + "px";
            canvas.style.height = container.clientHeight + "px";
        });
    })
}

function resizeCanvas(frame) {
    frame.style.height = (frame.clientWidth * 9 / 16) + "px";
    var canvas = frame.querySelector("canvas");
    canvas.style.width = frame.clientWidth + "px";
    canvas.style.height = frame.clientHeight + "px";
}