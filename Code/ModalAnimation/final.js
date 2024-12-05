// Thao tác với JSON
var student_string = '{"name" : "Nguyen Van Cuong", "age" : "26"}';
var student_obj = JSON.parse(student_string);
console.log('--OBJECT--');
console.log(student_obj);
console.log('--STRING--');
console.log(JSON.stringify(student_obj));

// Master dùng stringify và parse
var data = {
  name: 'Marcus',
  passion: 'Future Studio',
  likes: [{
    tag: 'Node.js',
    level: 10
  }],
  today: new Date(),
  func: function () {}
}
// JSON.stringify chuyển 1 kiểu object thành json string. Trường value nó nhận đa số các kiểu dữ liệu đều đc nhưng có 1 số kiểu mà json k nhận làm giá trị thì phải chuyển thành chuỗi trước như kiểu function, xong muốn parse lại ra function phải dùng Function constructor
data.func = data.func.toString();
console.log(JSON.stringify(data, null, 2));

console.log(JSON.stringify(data, (key, value) => {
  if (key === "name")
    return value + " nè!";
  return value;
}), 2);
// Đối số 2 của stringify là 1 hàm số nhận key, value return giá trị mới của value
// Nếu truyền null sẽ bỏ qua, nếu nhận 1 object lỗi như lặp vòng, infinity, null thì sẽ trả ra null(optional)

var object = {};
object.prop = object; // VD 1 lỗi object lặp vòng
// Đối số 3 là spacer, là khoảng cách giữa các thành phần trong json, nếu nhỏ hơn 1 or k truyền thì sẽ k có kc, nếu lớn hơn 10 thì set max kc vẫn là 10. Có params 3 thì sẽ tự xuống dòng và có kc, k có 3 thì k xuống dòng luôn

const obj = {
  a: 1,
  b: 2,
  c: 4,
  d: {
    e: 4
  }
};
console.log(JSON.stringify(obj, function boTenHamDuoc(key, val) {
  if (typeof val === 'number')
    return val + 1;
  return val;
}));
// Kể cả các thứ lồng bên trong như e lồng trong d nhưng val là number cx bị ảnh hưởng, nó gọi recursive
// Có thể đặt tên hàm như này or bỏ tên hàm or dùng arrow func

// JSON.parse(value, reviver); với 2 là 1 hàm như replacer đối số 2 của stringify bên trên

// # Mảng object và hàm / flat 1 mảng / Dùng spread operator
function flatten(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr)
    console.log(arr);
  }
  return arr
}
let arr = [1, 2, [3, 4], [5, [6, 7]]]
console.log(flatten(arr))

// # Dùng promise
        
// Promise với function lồng function () => () => {}

// function lồng function bình thường thì trả ra function như bth
const a = x => y => z => console.log(x,y,z);
a(1); // k in gì
console.log(a);
console.log(a(1));

// function trả ra 1 promise:
// const test = (x) => new Promise((resolve, reject) => {
//   console.log(x);
//   resolve(10); // nếu k có resolve, hàm then dưới k được thực hiện vì return ở đây k tính là resolve, chỉ có return trong hàm then mới tính là resolve thôi
//   return 10;
// }).then(x => console.log(x)); // Lúc khai báo thì k chạy luôn hàm nên k thực hiện promise
// console.log("X");
// test(1); // Thực hiện hàm sẽ thực hiện luôn promise
// console.log(test); // Trả ra cả function bth
// console.log(test(1)); // Trả ra promise trạng thái pending
// console.log(test(1).then(console.log)); // in ra undefined vì hàm then cuối k resolve gì cả

// function lồng trả ra promise ở cuối => promise k bh được thực hiện ở dưới vì ta k gọi hàm trong
// const test = (x) => () => new Promise((resolve, reject) => {
//   console.log(x);
//   resolve(10);
//   return 10;
// }).then(x => console.log(x))
// console.log(test(1));

// Biến là promise luôn thì:
// const test = new Promise((resolve, reject) => { // Do promise ở ngay cấp độ ngoài cùng nên sẽ thực hiện luôn
//   resolve(10);
// }).then(x => console.log(x))
// console.log(test); // Trả ra promise trạng thái pending vì ở trên thực hiện chưa xong
// Nếu dùng async await cái promise này và bỏ .then đi thì biến test sẽ lấy được giá trị 10

// Dùng async chuẩn hơn Promise vì nó k thực hiện luôn
// const test = (x) => async () => {
//   console.log(x);
// }
// test(1)(); // Phải gọi mới thực hiện
// console.log(test); // Trả function lồng function
// console.log(test(1)); // Trả ra 1 function, phải gọi mới thực hiện bất đồng bộ

// function trả ra promise lồng Promise:
// const test = () => new Promise(
//     (resolve, reject) => {
//         resolve(new Promise(
//             (resolve2, reject2) => resolve2(10)
//         ).then(console.log))
//     }
// )
// test(); // phải gọi như này là trả ra 1 promise thì thành cấp độ ngoài cùng nên thực hiện luôn và cứ thế các 

// Mảng Promise race tìm ra cái đầu tiên trả về true là lấy.
// Cơ chế: truyền vào 1 mảng boolean -> map để biến thành mảng các promise trả ra các giá trị đó thời gian random
// -> Xử lý khi từng promise bên trong mảng chạy xong thì chỉ resolve khi nó trả ra true, còn trả ra false thì reject
// -> Dạng này kp là lấy được giá trị nhanh nhất mà là "lấy giá trị nhanh nhất nhưng phải trả ra true" nên chỉ khi tất cả trả ra false, ta mới lấy false nên phải thêm 1 đoạn Promise.all trả ra false ở dưới tức là tự động resolve(false) để lấy giá trị false
function firstTrue(promises) {
    const newPromises = promises.map(p => new Promise(
        (resolve, reject) => p.then(v => v && resolve(true), reject) // bỏ && resolve(true) cũng được, nó như return v luôn thôi. Return với resolve vốn dĩ giống nhau, đều trả ra giá trị r chạy vào .then
    ));
    newPromises.push(Promise.all(promises).then(() => false));
    return Promise.race(newPromises);
}

var test = values => firstTrue(
    values.map((v) => new Promise((resolve) => {
        setTimeout(() => resolve(v), Math.round(Math.random() * 1000));
    }))
).then((ret) => console.log("Promise race của ", values, " cho ra", ret));

test([false, false, false]);
test([true, true, true]);
test([true, false, false]);
test([false, true, false]);
test([false, false, true]);

// # Mảng và object và hàm / Shuffle 1 array 
// C1: sort với 0.5 - Math.random() 
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
array.sort((a, b) => 0.5 - Math.random());
console.log(array);

// C2: Dùng Fisher-Yates algorith
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // bản ES6 cho phép swap 2 biến ez hơn
  }
}
const array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
shuffleArray(array2);
console.log(array2);