//!!!!!!!!
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

// Cơ ché: server sẽ k gửi deadline cho client vì múi giờ khác nhau, server chỉ gửi remaining time thôi.
// Với hệ thống yêu cầu độ chính xác phải xử lý delay tốc độ mạng giữa client và server nữa 
// Real remaining time = remainingTime - (thời gian client nhận - thời gian client gửi request đi)/2

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
                resolve(serverTime - (responseTime - requestTime)/2000); // Thuật toán đồng bộ thời gian SNTP(Simple Network Time Protocol)
            } else {
                reject(new Error({
                    status: req.status,
                    statusText: req.statusText,
                }));
            }
        };
        req.open('HEAD', serverURL);
        // HEAD là giao thức giống GET nhưng k có body. Bản chất giao thức này là gửi hết data qua header, bh toàn dùng GET thôi.
        // req.setRequestHeader('cache-control', 'no-cache'); // Cản cache-control
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
