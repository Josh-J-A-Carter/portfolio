var buildUrl = window.loadData.folder;
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

var canvas = document.getElementById("unity-canvas");

canvas.addEventListener("wheel", () => canvas.style.pointerEvents = "none");
document.addEventListener("click", () => canvas.style.pointerEvents = "all");

var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
    createUnityInstance(canvas, config, _ => {}).then((unityInstance) => {
            // fullscreenButton.onclick = () => {
            //      unityInstance.SetFullscreen(1);
            // };
            // resizeCanvas(frame);
            // frame.querySelector(".overlay").remove();
            window.loadData.cleanup();
        }).catch((message) => {
            alert(message);
        });
    };

document.body.appendChild(script);