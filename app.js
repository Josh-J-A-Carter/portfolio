
// The 'preload' class is used to stop animations from running on page load
setTimeout(() => document.body.classList.remove('preload'), 500);

setupFrame(document.getElementById("chronodrive-frame"), 'chronodrive', 'Build.loader.js', unity = true);
setupFrame(document.getElementById("little-engine-frame"), 'engine', 'little-engine.js');



function setupFrame(frame, folder, file, unity = false) {
    frame.onmouseover = () => showOverlay(frame);
    frame.onmouseout = () => hideOverlay(frame);
    frame.onclick = () => instantiate(frame, folder, file, unity);

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

function instantiate(frame, folder, file, unity) {
    frame.onmouseover = null;
    frame.onmouseout = null;
    frame.onclick = null;

    frame.querySelector(".overlay-text").classList.add("invisible");
    frame.querySelector(".spinner").classList.remove("invisible");

    if (unity == false) {
        import(`./${folder}/${file}`).then(module => {
            var canvas = frame.querySelector("canvas");
            var locateFile = (path, prefix) => {
                console.log(prefix, path);
                return `./${folder}/${path}`;
            }

            module.default({ canvas: canvas, locateFile: locateFile }).then(engine => {
                resizeCanvas(frame);
                frame.querySelector(".overlay").remove();
    
                // Weird stuff with focus; don't know how to fix atm :(
                // engine.ccall('remove_focus', 'void', []);
            });
        });
    }

    else {
        var buildUrl = folder;
        var loaderUrl = buildUrl + "/Build.loader.js";
        var config = {
            dataUrl: buildUrl + "/Build.data.unityweb",
            frameworkUrl: buildUrl + "/Build.framework.js.unityweb",
            codeUrl: buildUrl + "/Build.wasm.unityweb",
            streamingAssetsUrl: "StreamingAssets",
            companyName: "Chronodrive",
            productName: "Chronodrive",
            productVersion: "1.0",
        };

        var canvas = frame.querySelector("canvas");
        var script = document.createElement("script");
        script.src = loaderUrl;
        script.onload = () => {
            createUnityInstance(canvas, config, _ => {}).then((unityInstance) => {
                    // fullscreenButton.onclick = () => {
                    //      unityInstance.SetFullscreen(1);
                    // };
                    resizeCanvas(frame);
                    frame.querySelector(".overlay").remove();
                }).catch((message) => {
                    alert(message);
                });
                };

        document.body.appendChild(script);
    }
}

function resizeCanvas(frame) {
    frame.offsetHeight = (frame.offsetWidth * 9 / 16) + "px";
    var canvas = frame.querySelector("canvas");
    canvas.offsetWidth = frame.offsetWidth + "px";
    canvas.offsetHeight = frame.offsetHeight + "px";

    canvas.width = frame.offsetWidth;
    canvas.height = frame.offsetHeight;
}