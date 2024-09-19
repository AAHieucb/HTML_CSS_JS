// Import 1 node của 1 frame
function test(){
    var frame = document.getElementsByTagName("iframe")[0];
    var x = frame.contentWindow.document.getElementsByTagName("div")[0];
    var y = document.importNode(x, true);
    document.body.appendChild(y);
    console.log(frame.nodeType); // loại node theo số
}

// Thao tác với chuột
function mouseMove(event) {
    var x = event.clientX;
    var y = event.clientY;
    document.getElementById("x").innerHTML = x;
    document.getElementById("y").innerHTML = y;
}

// Thao tác với window
var windowPersonal = null;
function newWindow(){
    windowPersonal = window.open("https://www.facebook.com", "facebook window", "width = 100px; height = 100px");
    windowPersonal.document.write("hello"); // window mở ra sẽ chỉ là 1 personal window mà thôi
}
function resizeWindow(){
    windowPersonal.resizeTo(1000, 1000);
    windowPersonal.moveTo(500,100)
	windowPersonal.focus();
}
function replaceWindow(){
    console.log(window.history);
    window.location.replace("https://www.facebook.com");
    window.focus();
}
function forwardWindow(){
    window.history.forward();
    window.focus();
}
function changeWindow(){
    // window.location.href = "https://www.facebook.com";
    // window.location = "https://www.facebook.com";
    window.location.assign = "https://www.facebook.com";
}

function testvoid(){
    javascript:void alert("Warning");
}

// Dùng Rx - thư viện vô dụng
new Rx.Observable((o) => { // Khai báo Observable phải có new
    console.log("CAHDFHKJF");
    window.addEventListener("resize", () => {
        var height = window.innerHeight;
        var width = window.innerWidth;
        o.next({
            width,
            height
        });
        console.log("fjkshfkjahf");
    });
}).subscribe(value => {
    console.log(value.width, value.height);
});
// Tạo biến observer là 1 hàm số thì nó sẽ thực hiện luôn bên trong, thêm event xảy ra thì gọi next, next mà gọi sẽ chạy vào subscribe, hàm trong subscribe thực hiện tiếp như 1 hàm bth.

// Các hàm hay
var objec = {
    name: "hieu",
    age: 19,
    male: true
}
console.log(objec.name.padEnd(15,"x")); // K thay đổi biến mà trả ra giá trị
console.log("'copy'within: ", [1,2,3,4,5,6].copyWithin(3,1,3));

// Các kiểu duyệt
for(var [key,value] of Object.entries(objec))
    console.log("Key: ", key, " - ", value);
for(var value of Object.values(objec))
    console.log("value: ", value);

// Mảng và object / dùng set get của object
var object1 = {
    property1: "Hieu",
    property2: "Trang",
    get listAll(){
        return "Tui là " + this.property1 + " - " + this.property2;
    },
    set _property1(value){
        this.property1 = value; // Chú ý gán buộc có this
    },
    doSth(){
        console.log("do nothing");
    }
    // Hàm getter có thể đặt trùng tên property nhưng setter thì k, hàm setter chỉ thông báo là có biến bị đổi bên trong và ta tự gán, đặt trùng tên sẽ k hđ. 
}
object1._property1 = "hieucuopbien";
console.log(object1.listAll);

// # Dùng descriptor
var descriptor = Object.getOwnPropertyDescriptors(object1);
console.log(descriptor.property1);
console.log(descriptor.doSth);

var user5 = {
    name: "Hieu",
    toString(){
        return this.name;
    }
}
var descriptor = Object.getOwnPropertyDescriptors(user5);
console.log(descriptor.name.writable);
Object.defineProperty(user5,"name",{
    writable: false
})
descriptor = Object.getOwnPropertyDescriptors(user5);
console.log(descriptor.name.writable);
// Gán giá trị bằng defineProperties
var user4 = Object.defineProperties({},Object.getOwnPropertyDescriptors(user5));
console.log(user4);

document.open();
document.writeln(document.URL);
document.close();
console.log(document.defaultView);
console.log(document.documentElement.clientHeight); // thẻ html
console.log(document.implementation);
console.log(document.readyState);

// Dùng cookie
if (window.cookieEnabled){
    document.write("Có bật Cookie" + "<br>");
}
console.log(document.cookie);
// document.cookie = "name=hieu; expires=Thu, 0 Dec 2019 12:00:00 UTC";
// document.cookie="cookie nè"; // cookie nó k cần thiết phải đúng là có dấu = này nọ vẫn lưu được dưới dạng string. 
// Đặt dấu = để khi viết hàm lấy nó dễ thôi

// Dùng class JS
function MustUseNew(){ 
    // Thực chất JS tùy biến cho phép ta tạo function và dùng this như này thoải mái k sai nhưng chuẩn ES6 phải tạo class và giá trị khởi tạo gán trong constructor
    this.nameTest = "Hi";
}
var testNew = MustUseNew();
console.log(window.nameTest); // Gán cho window

// Dùng yield 
function* yieldChild(){
    yield 3;
    yield 4;
    return 1;
    yield 5;
}
function* testYield(a){
    yield [1,2];
    yield* [1,2]; // Khác biệt vì yield từng phần tử còn trên là yield cả arr
    yield* "ab";

    yield yieldChild(); // Éo lấy đc
    yield* yieldChild(); // Có * thì lấy được

    const testInside = yield 6;
    console.log(testInside); // undefined vì yield lấy TT, phải qua function* mới ra đc giá trị

    while(a < 3){
        a++;
        yield 10;
    }
    if(a < 10){ // ĐK khác vòng lặp nhé
        a++;
        yield 9;
    }
}
const yieldVar = testYield(1);
console.log(yieldVar.next().value);
console.log(yieldVar.next().value);
console.log(yieldVar.next().value);
console.log(yieldVar.next().value);
console.log(yieldVar.next().value);
console.log(yieldVar.next().value);
console.log(yieldVar.next().value);
console.log(yieldVar.next().value);
console.log(yieldVar.next().value);
console.log(yieldVar.next().value);
console.log(yieldVar.next().value);
console.log(yieldVar.next().value);
console.log(yieldVar.next().value);

// Dùng vòng lặp in 1 phát hết luôn
for(var k of testYield(1)){
    console.log(k);
}

console.log("START ITERATOR");

var form = new FormData();
form.append("firstName", "Hieu");

var inputTag = document.querySelector("div.test1"); // Cho thấy querySelector là mạnh nhất r
var thTag = document.querySelector("table[border='1'] tr th[align='right']");
console.log(inputTag);
console.log(thTag);

// Dùng class JS
class TestClass{
    constructor(object){
        this.object = object;
    }
    showObject(){
        console.log(TestClass);
        for(var key in this.object){
            console.log(key);
        }
        for(var [key,vale] of Object.entries(this.object)){
            console.log(key + " " + vale)
        }
    }
}
var testClassVar = new TestClass({name: "hieu", age: window.screen.availHeight})
console.log(testClassVar)
testClassVar.showObject();

var q = 10;
var w = eval("q*17") + "</br>";
console.log(w);

console.log(Object.getOwnPropertyNames(TestClass));
console.log(Object.getOwnPropertyNames(TestClass.prototype)); // Có thể xem thuộc tính mọi biến

// Dùng storage
if(typeof sessionStorage != 'undefined'){
    sessionStorage.setItem("author","Hieu");
    console.log(sessionStorage);
    sessionStorage.clear();
}

var class1Var = class class1{
    sayHi(){
        alert("Hi");
    }
}
var tempC1 = new class1Var();
// tempC1.sayHi();
// Đặc biệt là nếu dùng class class1 thì có thể var tempC1 = new class1(); ok luôn nhưng nếu dùng gán class đó cho 1 biến thì lúc đó cái kia k được coi là định nghĩa 1 class nên dùng giống như v là sai mà phải là:
// var tempC1 = new class1Var();=> tức là cái class kia kp định nghĩa global nên có thể bỏ tên class cx đc là
// var class1Var = class {}; var tempC1 = new class1Var; 

class staticClass{
    static staticVar = "181"; // Biến static
    static staticFunc1(){ // Hàm static
        console.log(this);
        console.log(this.staticVar);
    }
}
staticClass.staticFunc1();
staticClass.staticFunc2 = function() { // Hàm static
    console.log("Helllo World")
}
staticClass.staticFunc2();

// Dùng map với symbol
var mapVar = new Map([["Name", "Nguyen Thu Hieu"],["Age", 18]]).set("Job", "IT");
var sym = Symbol("TestSymbol");
mapVar.set(sym, "SYM");
for(let [u,v] of mapVar){
    console.log(`${u} - ${v}`); // K in đc symbol có lỗi
}
