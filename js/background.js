chrome.runtime.onMessage.addListener( function (request, sender, sendResponse)
{
  if (!request) {
    return sendResponse(null)
  }
  if(request.mode === "GET_LOCAL_STORAGE" )
  {
    var host = sender.url.split('/')[2]
    var storage = JSON.parse(window.localStorage.getItem('storage_' + host) || '')
    sendResponse({
      mode: "LOAD",
      data: storage.data,
      info: storage.info
    })
  } else if ( request && request.mode === 'SAVE_LOCAL_STORAGE') {
    var host = sender.url.split('/')[2]
    window.localStorage.setItem(
      'storage_' + host,
      JSON.stringify({
        data: request.data,
        info: {
          host: host,
          date: new Date()
        }
      })
    )
    return sendResponse({
      complete: true
    })
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log(tabId, tab, changeInfo)
  if (tab.status == 'complete') {
    chrome.tabs.executeScript(tabId, { file: "./js/jquery.min.js" }, function() {
      chrome.tabs.executeScript(tabId, { file: "./js/script.js" });
    });
  }
});
