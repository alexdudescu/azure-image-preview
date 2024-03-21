import ImageViewer from 'awesome-image-viewer';

let viewer;

chrome.runtime.onMessage.addListener((message, sender) => {
    viewer = null;

    if (message.action === "preview_image") {
        console.log("Previewing image: " + message.url);

        viewer = new ImageViewer({
            images: [{
                mainUrl: message.url
            }],
        });
    }
});