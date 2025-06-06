
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

        frame.querySelector(".overlay-text").classList.add("invisible");
        frame.querySelector(".overlay").classList.remove("pointer");
        frame.querySelector(".spinner").classList.remove("invisible");

        var canvasElement = frame.querySelector('canvas');

        canvasElement.addEventListener('webglcontextlost', (e) => {
            alert('WebGL context lost. You will need to reload the page.');
            e.preventDefault();
        }, false);

        var Module = {
            ///////// Calling C++ code here
            onRuntimeInitialized: function() {
                console.log("initialised");
                Module.ccall('remove_focus', 'void', []);

                window.addEventListener('keydown', function(evt) {
                    console.log("msg");
                    evt = evt || window.event;
                    var isEscape = false;
                    if ("key" in evt) {
                        isEscape = (evt.key === "Escape" || evt.key === "Esc");
                    } else {
                        isEscape = (evt.keyCode === 27);
                    }
                    
                    if (isEscape) {
                        console.log("Escape pressed");
                    }
                }, true);

                frame.querySelector(".overlay").remove();
            },

            print(...args) {
                console.log(...args);
                if (outputElement) {
                    var text = args.join(' ');
                    outputElement.value += text + "\n";
                    outputElement.scrollTop = outputElement.scrollHeight; // focus on bottom
                }
            },
            canvas: canvasElement,
            totalDependencies: 0,
            monitorRunDependencies(left) {
            this.totalDependencies = Math.max(this.totalDependencies, left);
            }
        };

        const script = document.createElement('script');
        script.src = url;
        script.addEventListener('load', () => resolve());
        script.addEventListener('error', () => reject());
        document.body.appendChild(script);
    });
}
