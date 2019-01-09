function saveLocalStorage () {
	var storage = {}
	for (var key in window.localStorage) {
		if (['length', 'key', 'getItem', 'setItem', 'removeItem', 'clear'].indexOf(key) === -1){
			storage[key] = window.localStorage.getItem(key)
		}
	}
	chrome.runtime.sendMessage({
			mode: "SAVE_LOCAL_STORAGE",
			data: storage
		}, function(response) {
			if (response && response.complete) {
				console.log('Saved')
			}
		}
	);
}
function exportLocalStorage (storage) {
	for (var key in storage) {
		window.localStorage.setItem(key, storage[key])
	}
}

function initEventListener() {
	chrome.runtime.onMessage.addListener( function (request, sender, sendResponse)
	{
		if (!request) {
			return sendResponse(null)
		}
		if( request.mode === "RESTORE_LOCAL_STORAGE" )
		{
			chrome.runtime.sendMessage({
				mode: "GET_LOCAL_STORAGE"
			}, function (response) {
				exportLocalStorage(response.data)
				sendResponse({
					complete: true
				})
			})
		} else if ( request.mode === 'SNAPSHOT_LOCAL_STORAGE') {
			saveLocalStorage()
			return sendResponse({
				complete: true
			})
		}
	});
}
initEventListener()
