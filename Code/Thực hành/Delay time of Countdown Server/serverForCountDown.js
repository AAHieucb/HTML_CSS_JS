// Dùng http server và header
const deadline = new Date("2023/12/31 00:00:00");
var http = require("http");
http.createServer(function (req, res) {
    // Phải set header cho response trước khi send request
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, {
        "Content-Type": "text/html",
        // 'Date': 'Tue, 15 Nov 2023 08:12:31 GMT',
        "remainingTime": ((deadline - new Date())/1000).toString(),
        'Access-Control-Expose-Headers': '*'
    })
    res.write("Hello");
    // Date là 1 trường của header. Server phải cho phép client truy cập vào nó bằng header Access-Control-Expose-Headers
    // thì mới đc. 1 số trường ta phải làm như v. Cả Access-Control-Allow-Origin nữa
    res.end();
}).listen(4000);
// http server bị hạn chế vì nó chỉ cho gửi lại text html nên nếu ta muốn gửi 1 object thì éo đc. Kiểu gửi lại để client
// là browser load chạy thôi, k dùng để test các kiểu gửi object hay j đc
// Ở đây hay ở chỗ ta gửi object thông qua trường header của nó. Header k gửi được nh dữ liệu

// Dùng express server 
// const express = require('express');
// const app = express();
// app.get('/', function (req, res) {
//     res.send({
//         remainingTime: (deadline - new Date())/1000
//     });
// });
// app.listen(4000, function () {
//     console.log('Server is running..');
// }); //chú ý phải trùng cái port mà client dùng proxy
