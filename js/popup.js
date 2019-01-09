
window.addEventListener('load', function () {
    document.getElementById('btn_snapshot').addEventListener('click', function () {
        console.log('btn 1')
        chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
            chrome.tabs.sendMessage(tab[0].id, {
                mode: "SNAPSHOT_LOCAL_STORAGE"
            }, function(response) {
                console.log({
                    RESPONSE: response
                })
            });
        });
    });
    document.getElementById('btn_restore').addEventListener('click', function () {
        console.log('btn 2')
        chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
            chrome.tabs.sendMessage(tab[0].id, {
                mode: "RESTORE_LOCAL_STORAGE"
            }, function(response) { 
                console.log({
                    RESPONSE: response
                })
            });
        });
    });
});

