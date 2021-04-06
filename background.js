chrome.storage.sync.set({
    key: tid}, () => {
    console.log("values et to;" + tid
    )
})


chrome.storage.sync.get(['key'], function(result) {
    console.log('Value currently is ' + result.key);
});