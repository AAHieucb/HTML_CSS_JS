var div = document.createElement('div');
div.style = "position: fixed; bottom: 0; right: 0; z-index:9999";
div.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/4uWMALdd55E" frameborder="0" 
allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
//innerHTML của 1 thẻ có thể là code html thẻ khác
//z-index là trục z hiển thị, ta set 999 để đè lên mọi thẻ khác ở vị trí đó

console.log("Hello")
console.log(chrome.runtime)

document.body.appendChild(div);
//tạo 1 thẻ div bao 1 thẻ iframe có style và link như v rồi thêm vào body. Ta đang dùng content script tức truy cập vào
//bất cứ trang web nào thỏa mãn matches sẽ đều chạy cái này