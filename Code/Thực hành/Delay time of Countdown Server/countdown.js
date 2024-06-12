// Thao tác với Math / làm tròn
function toUnit(time, a, b) {
    return String(Math.floor((time % a) / b)).padStart(2, '0');
}

// Đổi time sang ngày giờ phút giây
function formatTimer(time) {
    if (Number.isNaN(parseInt(time, 10))) {
        return '';
    }
    const days = Math.floor(time / 86400);
    const hours = toUnit(time, 86400, 3600);
    const minutes = toUnit(time, 3600, 60);
    const seconds = toUnit(time, 60, 1);

    if (days > 0) {
        return `${days} ${days > 1 ? 'days' : 'day'} ${hours}:${minutes}:${seconds}`;
    }

    if (hours > 0) {
        return `${hours}:${minutes}:${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

/*
Cơ chế xử lý coundown:
const deadline = new Date('2021/12/31 00:00:00');//ta đang xử lý ở client giả sử deadline này được gửi đến từ server
let remainingTime = (deadline - new Date) / 1000;
//khi tính toán với date nó sẽ thao tác trên mili giây. Tương tự ta cũng dùng để so sánh 2 date với nhau bằng >=

setInterval(function () {
    //k nên dùng remaining-- vì có chuẩn 1s hay k phụ thuộc vào browser chạy lag như thế nào
    remainingTime = (deadline - new Date)/1000; //cách này cũng không được khi user bị lệch h vì new Date sẽ lấy giờ
    //trên máy của ta
    console.log(formatTimer(remainingTime));
}, 1000);
*/
/*
//Để giải quyết chỉ cần, dù server và client có giờ như thế nào thì thời gian còn lại vẫn là remaining time. Kể cả
//server là 3h, ô A là 4h, ô B là 5h => vẫn phải chạy đủ remaining time mới tới giờ. Khi đó thứ ta nhận được từ server
//kp là mấy giờ mà là thời gian còn lại là bnh giây => phải xử lý phía server như v. Lưu ý client đang chạy file này
const remainingTime = 10000;//còn 10000s nx
const deadline = new Date(new Date().getTime() + remainingTime*1000);
//phải convert ra milis. Hàm getTime lấy milis hiện tại. thiếu getTime k đc vì dùng new Date() + 1 số int nó k hiểu là
//đang tính toán với milis.
setInterval(function () {
    const timeRemain = (deadline - new Date)/1000;
    console.log(formatTimer(timeRemain));
}, 1000);
*/
//Bài toán: server tính toán và trả về thời gian còn lại cho tới đúng 2021/12/31 00:00:00 k lệch 1s và mặc dịnh đồng hồ
//của server là đúng. Vì server đồng hồ sai thì chả có căn cứ gì nx r
//Như v vẫn chưa được vì thực tế còn độ trễ giữa client và server nx nên bị lệch mấy s.Để làm nó hoàn hảo ta cần tính
//độ trễ giữa client và server và remaining time sẽ ít đi: remainingTime - (thời gian client nhận - thời gian client 
//gửi request đi)/2. Đây là thuật toán gần giống với SNTP(Simple Network Time Protocol) là 1 trong các IP protocol để máy 
//tính đồng bộ thời gian với server

// // Query API trong JS thuần
// // Dùng XMLHttpRequest có sẵn của JS: cách query kiểu cũ của browser
// // Xử lý body request
// function getDateDiff(serverURL) {
//     return new Promise((resolve, reject) => {
//         let requestTime;
//         let responseTime;
//         const req = new XMLHttpRequest();
//         req.onreadystatechange = () => {
//             if (req.readyState === XMLHttpRequest.HEADERS_RECEIVED && req.status === 200) {
//                 responseTime = Date.now();
//                 console.log("Success with: " + req.responseText);
//             }
//         };
//         req.onload = () => { // or req.addEventListener("load", <hàm>);
//             if (req.status === 200) {
//                 var data = JSON.parse(req.responseText);
//                 const remainingTime = data.remainingTime
//                 resolve(remainingTime - (responseTime - requestTime)/2000);
//                 //sử dụng http server ta có thể lấy Date như thế này-> khởi tạo biến Date từ nó r thao tác tiếp
//                 //khi đó phải dùng protocol là HEAD
//             } else {
//                 reject(new Error({
//                     status: req.status,
//                     statusText: req.statusText,
//                 }));
//             }
//         };
//         req.open('GET', serverURL);
//         //HEAD nó giống get nhưng k có body. nếu dùng head ở đây thì k thể lấy responseText như trên đc
//         //Ta có thể làm như ví dụ mẫu, dùng Head và chỉ cần gửi qua header cái time là đc, k cần express như này
//         requestTime = Date.now();
//         req.send();
//     });
// }

// Dùng XMLHttpRequest với HEAD và lấy Header
function getDateDiff(serverURL) {
    return new Promise((resolve, reject) => {
        let requestTime;
        let responseTime;
        const req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === XMLHttpRequest.HEADERS_RECEIVED && req.status === 200) {
                responseTime = Date.now();
            }
        };
        req.onload = () => {
            if (req.status === 200) {
                const serverDateStr = req.getResponseHeader('remainingTime');
                const serverTime = new Date(Math.floor(serverDateStr)).getTime();
                resolve(serverTime - (responseTime - requestTime)/2000);
            } else {
                reject(new Error({
                    status: req.status,
                    statusText: req.statusText,
                }));
            }
        };
        req.open('HEAD', serverURL);
        // req.setRequestHeader('cache-control', 'no-cache'); // Access-Control-Allow-Origin cản cache-control
        requestTime = Date.now();
        req.send();
    });
}

// Nhớ dùng bất đồng bộ mới được
getDateDiff('http://localhost:4000/').then((remainingTime) => {
    const deadline = new Date(new Date().getTime() + remainingTime*1000);
    setInterval(function () {
        const remainingTime = (deadline - new Date())/1000;
        console.log(formatTimer(remainingTime));
    }, 1000);
});
