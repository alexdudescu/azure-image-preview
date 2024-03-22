import ImageViewer from 'awesome-image-viewer';

let viewer;

chrome.runtime.onMessage.addListener((message) => {

    if (message.action !== "preview_image") {
        return;
    }

    viewer = null;

    viewer = new ImageViewer({
        images: [{
            mainUrl: message.url
        }],
    });

});