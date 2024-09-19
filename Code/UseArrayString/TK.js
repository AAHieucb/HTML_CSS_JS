// Hằng số
console.log(typeof null);
console.log(Number.MIN_VALUE);
console.log(Number.MIN_SAFE_INTEGER);
console.log(isNaN("Hello")); // Check có phải số k
console.log(Number(10).valueOf());

// Chuyển đổi
console.log(Number(101.23955).toFixed(2)); // Dùng khi muốn lấy bnh phần thập phân
console.log(Number(101.23955).toPrecision(3)); // Dùng khi muốn lấy độ dài chỉ đến bnh chữ số cả nguyên và thập phân
console.log(Number(101.23955).toString(2)); // Đổi cơ số

// Làm tròn
console.log(Math.round(Math.random())); // Làm tròn xấp xỉ
console.log(Math.floor(Math.random())); // Luôn xuống
console.log(Math.ceil(Math.random())); // Luôn lên


// Thao tác với string / Tìm kiếm
console.log("Ie ie ie ie".indexOf("ie", 4)); // Tìm 1 cái từ vị trí nào
console.log("Ie ie ie ie".lastIndexOf("ie")); // Chỉ tìm 1 cái từ cuối
console.log("Ie ie ie ie".match(/ie/gim)); // Tìm tất cả
console.log([..."Ie ie ie ie".matchAll(/ie/gim)]); // Tìm tất cả chi tiết hơn
console.log("Ie ie ie ie".search(/ie/gim) != -1); // Có hay k
console.log("Ie ie ie ie".includes("ie", 4)); // Có hay k từ index nào => thế hoàn toàn search, dùng với mọi iterable
const re = new RegExp("ie", "gmi");
const string = "Ie ie ie ie";
console.log(re.test(string)); // Tìm lần lượt có hay k
console.log(re.lastIndex); // Tìm lần lượt in ra index bắt đầu
console.log(re.test(string));
console.log(re.lastIndex);
const re2 = new RegExp("(ie)", "gmi");
console.log(re2.exec("Ie ie ie ie")); // Tìm lần lượt lấy ra string thỏa mãn regexp trong từng cụm ()
console.log(re2.exec("Ie ie ie ie"));

// Thao tác với các biến global
console.log(window.innerWidth);
console.log(window.screen.width);
console.log(window.screen.availWidth);
console.log(document.documentElement.clientWidth);
console.log(document.body.clientWidth); // Thẻ body lúc nào cũng nhỏ hơn thẻ html. width chuẩn là thẻ html cx là innerWidth


// Dùng yield
function* test12() {
    yield 1;
    yield 2;
}

function* test1() {
    yield 'he'; // yield bình thường
    yield*'he'; // yield 1 iterator

    yield test12().next(); // yield bình thường
    yield* test12(); // yield 1 iterator
    // yield bình thường phải dùng next khi gọi function* vì nó là 1 iterator mà yield bình thường k chơi với iterator
}
const varTest = test1();
console.log(varTest.next());
console.log(varTest.next());
console.log(varTest.next());
console.log(varTest.next());
console.log(varTest.next());
console.log(varTest.next());
console.log(varTest.next());


// Các kiểu duyệt
// Sinh array mới
var map1 = [1, 2, 3].map(x => x + x);
var map2 = Array.from([1, 2, 3], x => x + x); // Thg thì người ta dùng map nhiều hơn do lấy được cả index, arr nếu muốn
console.log(map1);
console.log(map2);

// Các loại vòng for thg dùng
let user = {
    name: "John",
    age: 30,
    isAdmin: true
};
for (let key in user) { // Mặc định dùng Object.keys(user)
    console.log(`${key} - ${user[key]}`);
}
let users = [1, 2, 3, 4];
for (let key of users.entries()) { // Mấy cái entries, keys, values phải dùng for of
    console.log(`${key}`);
}
for (let [key, value] of Object.entries(user)) {
    console.log(`${key} - ${value}`);
} // Dù sao thì forEach vẫn là hot nhất với mảng sau đó đến for of dùng cho các kiểu khác
var iterable = users[Symbol.iterator]();
console.log(iterable.next());
console.log(iterable.next());
console.log(iterable.next());
console.log(iterable.next());
console.log(iterable.next());


// Mảng và object và hàm
// Bản chất giá trị hay địa chỉ. Vào hàm thay đổi hay không cũng tương tự các ngôn ngữ khác
var var1 = 1;
var var2 = [1,2,3];
var var3 = { name: "hieu", age: 18};

var var1Test1 = var1; // Gán giá trị
var var2Test1 = var2; // Gán địa chỉ
var var3Test1 = var3; // Gán địa chỉ

// Cách copy giá trị hay địa chỉ của object
var var3Test3 = {...var3, id: 1}; // copy => nên dùng nhất
var var3Test9 = new Object(var3); // copy
var var3Test4 = JSON.parse(JSON.stringify(var3)); // copy, có thể k ra đúng object bđ
var var3Test5 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(var3)); // copy rất chặt, k cần thiết
var var3Test2 = Object.assign({}, var3); // copy

var var3Test7 = Object.assign(var3, {name: "Hello"}); // Gán địa chỉ, đổi cả var3 nên var3 === var3Test7

var var3Test6 = Object.create(var3); // var3 trở thành thuộc tính prototype của var3Test6
var var3Test8 = Object.getOwnPropertyNames(var3); // copy nhưng chỉ lấy mỗi key
var var3Test9 = Object.getOwnPropertyDescriptors(var3); // copy nhưng k cần thiết

var {name: tName, age: tAge} = var3; // copy có thể đổi sang tên khác => nên dùng
var {name, ...other} = var3; // copy nhưng dùng cùng tên, nếu có biến tên đó sẵn r thì k đc

// Cách copy giá trị hay địa chỉ của mảng
var var2Test2 = [...var2, 4]; // copy, nên dùng nhất => k dung với multidimension array. Nếu thế sẽ phải dùng for
// Cách này tốt hơn là dùng .push, kể cả khi concat 2 mảng [...a, ...b]
// Refer tới ### Module JS trong React

var [a,, c] = var2; // copy

// Cách destructure với hàm
// Còn cách dùng {field1, field2} nữa
function function1(a, ...b) {
    console.log(a, b);
    for (let x of arguments) {
        console.log(x);
    }
}
function1(1,2,3, {name: "hieu"});
// => Đó là tất cả, các cách gán không liệt kê ở đây thg sẽ k được dùng trong thực tê

// Dùng logic circuit
var var4 = 10;
var var5 = var4 && 11 || 12;
//A && B thì A tồn tại lấy B, A k tồn tại thì undefined
//A || B thì A tồn tại lấy A, A k tồn tại thì B

// Cắt tách string hay mảng
var str = "Hello World";
var arr = [1,2,3,4,5];
console.log(str.slice(2,4)); // Cả string, array
console.log(arr.slice(2,4));

console.log(str.substring(2,4)); // Dùng slice thôi

var arrTest = arr.splice(2,2); // 2 tham số or 4 tham số đều được. Cắt TT trên array cũ, trả về phần cắt
console.log(arr);
console.log(arrTest);


// # Immutability code: Code kiểu luôn dùng const
// VD đổi thuộc tính:
const a = {name: "foo"}; 
a.name = "doi duoc";
console.log(a); 

// VD thêm thuộc tính: 
const b = Object.assign({}, a, {name: "bar", age: 1}, {id: 9}); // { name: 'bar', age: 1, id: 9 }
// Dùng spread ok nhưng k hỗ trợ trên mọi trình duyệt nên phải thêm Babel mới được
const d = { ...a, name: 'bar', age: 1, id: 9 }
console.log(d) // { name: 'bar', age: 1, id: 9 }
console.log(d === a) // false


// Xóa phần tử mảng
const tete = [0, 1, 2, 3, 4]

// Xóa phần tử ở đầu mảng
// Không nên: tete.shift() vì đổi trực tiếp
const te1 = tete.filter((_, index) => index !== 0) // [1, 2, 3, 4] 😃

// Xóa phần tử ở cuối mảng
// Không nên: tete.pop()
const te2 = tete.filter((_, index, arr) => index != arr.length - 1) // [0, 1, 2, 3] 😃

// Xóa phần tử ở vị trí bất kỳ
// Không nên: tete.splice(3, 1)
const te3 = tete.filter((_, index) => index !== 3) // [0, 1, 2, 4] 😃

// Thay đổi dữ liệu mảng thì dùng map
// sort cũng phải copy
const e = [
    { id: 1, name: 'Foo' },
    { id: 2, name: 'Bar' },
    { id: 3, name: 'Baz' },
]
const f = [...a].sort((x, y) => y.id - x.id);
const g = [...a].reverse();