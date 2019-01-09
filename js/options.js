
function loaded(){

	//var options = getOptions();
	var user_email_name = getStorage('user_email_name');
	var user_email_domain = getStorage('user_email_domain');
	if (user_email_name != null){
		_id('address_name').value = user_email_name;
	}
	if (user_email_domain != null){
		var obj = _id('address_domain');
		
		for (var i = 0; i < obj.length; i++) {
			if (obj.options[i].text == user_email_domain){
				obj.options[i].setAttribute('selected', 'selected');
				break;
			}
		}
	}
	
	document.getElementById('save_button').addEventListener('click', save_proc);
}
function _id(id){
	return document.getElementById(id);
}


function save_proc(){
	var address_name = _id('address_name').value;
	var address_domain = _id('address_domain').value;
	if (address_name == ''){
		alert('이메일 주소를 입력해 주세요');
		return;
	}
	var address = address_name + "@" + address_domain;
	
	
	setStorage('user_email_name', address_name);
	setStorage('user_email_domain', address_domain);
	setStorage('user_email', address);
	
	alert('저장되었습니다.');
	chrome.runtime.reload()
}

function setStorage(key, value){
	if ('localStorage' in window){
		return window.localStorage.setItem(key, value);
	}
}
function getStorage(key){
	if ('localStorage' in window){
		return window.localStorage.getItem(key);
	}
}
function removeStorage(key){
	if ('localStorage' in window){
		return window.localStorage.removeItem(key);
	}
}
document.addEventListener('DOMContentLoaded', loaded);