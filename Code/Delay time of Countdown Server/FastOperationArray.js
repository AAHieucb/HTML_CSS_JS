// Mảng và object và hàm => hay

// Xóa trùng lặp
let number = [1, 2, 3, 4, 2];
number = Array.from(new Set(number));
var number2 = [...new Set(number)];
console.log(number);
console.log(number2);

// Dùng ... bất cứ khi nào muốn có data dạng data1,data2,data3. VD:
number2 = [...number, ...number2];
console.log(number2.reverse());

// Check => kp lúc nào cũng for loop trong js
const isPos = (number) => {
    return number > 0;
}
console.log(number.every(isPos)); // Or dùng some với isNeg

// Cast tất cả phần tử của mảng về 1 kiểu dữ liệu nhanh nhất
let number3 = ["1", "2", 3];
number3 = number3.map(Number); // .map(<tên kiểu dữ liệu>) để cast về 1 kiểu như v
console.log(number3)

// Tạo 1 array bằng hàm from từ 1 cái gì đó(1 kiểu khác(nên dùng ... hơn), từ 1 function) 
// TH này Ta có thể dùng thay thế cho map
var fruits = [{
        kind: 'Apple',
        delicious: "yes"
    },
    {
        kind: 'Banana',
        delicious: "yes"
    },
    {
        kind: 'Avocado',
        delicious: "no"
    },
]
var fruitsArray = Array.from(fruits, (ele, index) => ({kind: ele.kind}));// [ 'Apple', 'Banana', 'Avocado' ]
console.log(fruitsArray);

// Cách làm rỗng array nhanh nhất
number.length = 0;
console.log(number);

// Tính tổng các phần tử array nghiêm cấm dùng for nhé :))
console.log(number2.reduce((x,y) => x+y));
// Or dùng kiểm tra phần tử nào có hay k=> dùng for với js rất ít khi
console.log(number2.indexOf(1)); // Trả về cái đầu tiên
console.log(number2.lastIndexOf(1)); // Trả về cái cuối cùng

// Người ta thg dùng hàm fill để mock data nhanh, VD tạo 1 array có 1000 phần tử nhanh nhất
var array = new Array(1000).fill("Data"); // Phải khai báo bth để có 1000 phần tử trống trc
console.log(array);
