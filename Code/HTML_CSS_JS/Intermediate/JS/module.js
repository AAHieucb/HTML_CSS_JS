// Export import

// 'use strict';
//export bth thì chỉ cần thêm từ khóa đằng trc còn lại là như bth
//export default thì k cần đặt tên, nếu đặt tên thì cx k đc dùng khi import tức import k đc dùng tên của export default
//export default chỉ đc dùng với 1 thứ trong class và import k cần dùng {} như export bth-> k tuân theo là lỗi
//export default k dùng với 1 biến. 
//export default đặt tên là TH nếu cần dùng hàm đó trong file này thì gọi mà thôi
export default function nameOfExportFunction(thing) {
    console.log("Hello from module: ", thing);
}

export var nameOfExportVar = "Hieucuopbien123@gmail.com";