chrome.runtime.onInstalled.addListener(function() {
    alert('Hello Extensions');
});
// chrome.runtime truy cập vào background page, nó là API của trình duyệt. onInstalled là khi browser cài cái 
// extension này background tự chạy ngầm còn content_script chạy mỗi khi 1 trang web được load
