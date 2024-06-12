// Basic / Thao tác với window
function openWindow(){
    var windowChild = window.open("https://facebook.com","test window","width=500px;height=500px;menubar=1")
    windowChild.focus();
    return false;
}

// Import export
function testDyImport(){
    import("./dynamicImport.js").then(importVar=>{
        importVar.default();//để lấy default
        importVar.hello("test dynamic import")
    })
}

// Basic 
// Dialog cơ bản
var buttonConfirm = document.createElement("button")
buttonConfirm.innerText = "Confirm Dialog"
// document.body.appendChild(buttonConfirm);//or append
document.body.insertBefore(buttonConfirm, document.body.childNodes[0])//luôn thêm vào đầu
// Đây là cách thêm vào đầu trong js chứ trong html thì phải chỉnh position
buttonConfirm.addEventListener("click",() => {
    var boolConfirm = confirm("Are you ok?")
    if(boolConfirm)
        console.log(typeof boolConfirm)
})

// Handle window error
window.onerror = (msg, url, line) => {
    alert("msg: " + msg);
    alert("url: " + url);
    alert("line: " + line)
}

// Thao tác với string
var testString = new String("This this is the string for testing this");
console.log("Slice: " + testString.slice(2,-2));
console.log("Match: " + testString.match(/(this)+/mgi));
console.log("Replace: " + testString.replace(/(this)/mgi,"$',$1"));
console.log("Replace: " + testString.replace(/(this)+/mgi, x => x.toLocaleUpperCase()))
console.log("Substring: " + testString.substring(2,10));

// Mảng và object / Các thao tác với mảng 
var testSome = new Array(1,2,3);
console.log(testSome.some((num) => {return num < 2}));

// Thao tác với string / Search bằng RegExp
var testReg = new RegExp(/this/gmi);
while(testReg.test(testString)){
    console.log("Pos: " + testReg.lastIndex); 
}

// Dùng yield
function* childFunc(){
    yield 1
    yield 2
}
function* testYieldFunc(text){
    yield text;
    console.log('Run next');
    yield* childFunc();
    yield* ["Hello","World"];
}
var varOfYieldFunc = testYieldFunc(18);
console.log(varOfYieldFunc.next().value);
console.log(varOfYieldFunc.next());
console.log(varOfYieldFunc.next());
console.log(varOfYieldFunc.next());
console.log(varOfYieldFunc.next());
console.log(varOfYieldFunc.next());

for(let mess of testYieldFunc(18)){
    console.log(mess);
} // K cần gọi next nx nhé(cơ chế saga cx như v, k cần gọi next mà đưa vào vòng loop cũng là 1 cách duyệt liên tiếp)

// Basic 
// Tổng kết các kiểu lấy kích thước
console.log("Avail: " + screen.availWidth); // width tổng có thể dùng, resize nó vẫn k đổi
console.log("Width: " + window.screen.width);
console.log("Inner: " + window.innerWidth); 
console.log("Client width: " + document.body.clientWidth + " " + document.documentElement.clientWidth);

// Các kiểu duyệt 
var testObject = { name: "Hieu", age: 18};
for(var key in testObject){
    console.log(testObject[key]); // duyệt object ra key
}

// Dùng storage
if(typeof Storage !== "undefined"){
    console.log("Support: " + typeof Storage);
    sessionStorage.setItem("Password", "123456");
    if(sessionStorage.getItem("Password") == "123456")
        console.log(sessionStorage.key(0) + " " + sessionStorage.key(1)); // [0] lưu của hệ thống
    sessionStorage.clear();
}

// Dùng class JS / Tạo singleton class
var UserSing = new function(name){
    this.name = "";
    this.age = null;
    this.getInfo = function(age){
        this.age = age;
        console.log(this.age);
    }
    this.printInfo = function(){
        this.name = name;
        console.log(this.name);
    }
}
UserSing.getInfo(18);
//singleton thì chỉ đc tạo 1 class như thế này, k dùng class này làm gì đc nx

// Dùng class JS
// Tính trừu tượng
class Human {
    #age; // private
    _name; // protected
    check; // public

    constructor(name, age) {
        this._name = name;
        this.#age = age;
        this.check = 10;
    }
    get name() {
        return "Test: " + this._name; // chạy vào mỗi khi lấy name
    }
    sayHi() {
        console.log(`Xin chào, tôi là ${this.name}, ${this.#age} tuổi`);
    }
}
let h = new Human("Cường", 19);
h.sayHi();
h.name = "Nguyễn"; 
h.sayHi();
h.check = 20;
console.log(h);

// Mảng và object và hàm
// Tạo mảng và objec từ mảng và object khác
// Lấy các phần tử của mảng và object vào các biến
var arr1 = [1, 2, 3];
var testvar1 = [...arr1, 4];
var [a, , b, c = "default value"] = arr1;
console.log(testvar1);
console.log(a + " " + b + " " + c);

var obj1 = {a:1, b:2, c:3};
var testvar2 = {...obj1};
var {a:x, b:y, c:z} = obj1;
console.log(testvar2);
console.log(x + " " + y + " " + z);

var {a,b,...i} = obj1;
console.log(a + " " + b + " " + i) // Cách trên thì tên biến linh động hơn

function func1(a,...b){
    console.log(a);
    console.log(b)
}
func1(1,2,3,4)

// Các kiểu duyệt
for(let [u,i] of [1, 2].entries()){
    console.log(u + " " + i);
}

// Mảng và object và hàm / Dùng [] làm key của object
var prop1 = "ABC";
var prop2 = 123;
var prop3 = Symbol("456");
var obj = {
    [prop1]: "abc",
    [prop2]: "123",
    [prop3]: 456
} // Với cách này ta có thể biến trường key của object là bất cứ cái gì
console.log(obj.ABC + " " + obj[prop2] + " " + obj[prop3]); // Chú ý chỉ string thì chấm được chứ k đc dùng obj.123

var test10 = {
    title: "Hello"
}
console.log(test10["title"]) // Dùng như này tương đương với test10.title, k đc dùng test10[title]
// Tức VD: var name = "key"; => .key = [name] = ["key"]

console.log([..."Hello"]);

// Dùng promise
var promise = new Promise(function (resolve, reject) {
    reject('Error!');
    resolve('Success!');
});
promise.then(
    function (success) {
        console.log("a: " + success);
    },
    function (error) {
        console.log("b: " + error);
    }
).catch(function (message) {
    console.log("c: ", message);
});
//chạy b k chạy c vì then 2 hàm thì hàm 2 vai trò như catch r

// Basic
function getValue(){
    var x, y, z;
    x = void(y=5, z=7);
    console.log("x, z = " + x + " " + z)
} // Chỉ là return undefined, éo có vẹo gì
getValue();

// Basic / Dùng logic
function changeColor(color){
    // var color = color || "yellow"
    // A || default => A k tồn tại(undefined là false, ngược lại là true) thì lấy default, A tồn tại thì lấy A
    // A && B => A k tồn tại thì là undefined, A tồn tại thì lấy B(lấy cái thứ 2)
    // A && B || C => A và B cùng tồn tại thì lấy B, k tồn tại(k cùng true) thì lấy C
    var color = "green" && color || "yellow"
    // Color tồn tại thì lấy color, k thì lấy yellow -> green dùng ở đây thừa vì luôn tồn tại nên dùng như này vô dung
    // Nếu đổi chỗ green và color thì color tồn tại sẽ lấy green, color k tồn tại lấy yellow thì có ích hơn
    console.log(color);
}
changeColor("red")
changeColor();

// Các kiểu duyệt
const object1 = {
    a: 'somestring',
    b: 42,
    c: false
};
console.log(Object.values(object1));//trả ra 1 mảng, tương tự Object.entries(<>)// or object1.entries()

// Basic
var func = console.log;
func("Hello from short arrow");
//arrow func rút ngắn cực đại khi chỉ có 1 đối số và gọi 1 hàm truyền vào đối số đó thì chỉ cần khai báo mỗi hàm

// Thao tác với String
console.log("Test".localeCompare("test"));

// Basic
console.log(new String("Test") instanceof String)
// "Test" thì k là 1 instanceof String mà phải cast sang ms đc, nhưng new String("Test") thì có. Do đó k thể check
// 1 biến có phải string hay không bằng kiểu này được

// Dùng class JS
// Tính kế thừa
class Parent{
    constructor(){
        this.name = "Hieu";
    }
    getName(){
        return this.name
    }
    inP(){
        console.log("Parent")
        console.log(this.name)
    }
}
class Child extends Parent{
    inChild(){
        super.inP(); 
        console.log(super.getName());
        // super chỉ dùng để gọi hàm nên phải tạo getName để gọi được super.getName(), nhưng name là biến public nên
        // lấy TT được luôn.
    }
}
var child = new Child();
child.inChild();
