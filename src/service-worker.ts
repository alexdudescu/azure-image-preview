const regex = /https:\/\/(.*)?.visualstudio.com\/_apis\/resources\/Containers\/(.*)(\.png|\.jpg|\.jpeg|\.webp)/;

// Prevent download of images and show them in browser instead
chrome.downloads.onCreated.addListener((item) => {
    chrome.storage.session.get(['enabled'], (value) => {

        if (!value.enabled || !item.url.match(regex)) {
            return;
        }

        chrome.downloads.cancel(item.id);

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id!, {
                action: "preview_image",
                url: item.url
            });
        });

        if (item.state == "complete") {
            chrome.downloads.removeFile(item.id);
        }
    })
}
)

// Handle badge state
chrome.storage.session.onChanged.addListener((changes) => {
    const enabled = changes.enabled.newValue;

    if (enabled) {
        chrome.action.setBadgeText({ text: "ON" });
        chrome.action.setBadgeBackgroundColor({ color: "#0A0" });
        chrome.action.setTitle({ title: "Previewing images in browser. Click to enable download." })
    }
    else {
        chrome.action.setBadgeText({ text: "" });
        chrome.action.setTitle({ title: "Downloading images. Click to preview images in browser." })
    }
});

// React to extension icon click
chrome.action.onClicked.addListener(() => {
    chrome.storage.session.get(['enabled'], (result) => {
        chrome.storage.session.set({
            enabled: !result.enabled,
        });
    })
})

// Start with disabled state
chrome.storage.session.set({ enabled: false })