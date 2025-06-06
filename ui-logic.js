var loaded = [];

// Function to load a JS file
async function loadScript(url) {
    return await new Promise((resolve, reject) => {
        if (loaded.includes(url)) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = url;
        script.addEventListener('load', () => resolve());
        script.addEventListener('error', () => reject());
        document.body.appendChild(script);
        loaded.push(url);
    });
}
