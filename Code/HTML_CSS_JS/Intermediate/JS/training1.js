// Basic
console.log("STAGE ONE");
event1 = () => {
    alert('Alert Content');
}
event2 = () => {
    if(confirm("Prompt Appear"))
        prompt("Prompt Content", "Default string");
}
function test() {
    var frame = document.getElementsByTagName("IFRAME")[0];
    var h = frame.contentWindow.document.getElementsByTagName("img")[0];
    var x = document.importNode(h, true); // Khi dùng node có sẵn nhưng từ 1 thẻ lấy từ resource khác
    document.body.appendChild(x);
    window.print();
}
function submitFunc() {
    document.getElementsByTagName('form')[0].submit(); // submit trong javascript của form
    console.log("Button is clicked");
    return false;
}
function eventMouseOver(e){
    console.log(e.clientX);
    console.log(e.clientY);
}

// Thao tác vói số
var var1 = parseFloat("923.141243px");
const var2 = parseInt("157px",16);

function func1(para1, para2){
    console.log(arguments);
}
func1(var1, var2);

const var3 = new Number(100);
console.log("var3 is equal to 100: ", var3 === 100)
console.log(Number.NaN, + " " + Number.MAX_SAFE_INTEGER);
let var4 = Number.MAX_VALUE * 2;
console.log("var4 is infinity: ", var4 == Infinity, " or NaN: ", isNaN(var4));
// Nên dùng phẩy vì + nó thường kiểu 2 string + lại có thể lỗi ở vài TH
console.log("Constructor of Number: ", var4.constructor);
Number.prototype.name = "hieu";
// var4.age = 18;//sai nhé, Number thì k đc
console.log(var1.toExponential(1), " ", var1.toFixed(2), " ", var1.toString(2), " ", var1.toLocaleString(),
" ", var1.valueOf(), " ", var1.toPrecision(5));
// toPrecision lấy trừ trái qua làm tròn còn 5 chữ số. Nếu phần nguyên > 5 chữ số sẽ hiển thị mũ e

// Thao tác với string
console.log(new Boolean(false).toString());

let var5 = new String("This is a short\n String");
console.log(var5.length, var5.charAt(3), var5.charCodeAt(1), var5.indexOf("s",4), var5.lastIndexOf("s",20));
// lastIndexOf tìm từ cuối lên nên đối số 2 truyền tìm ngược từ bao nhiêu, là case insensitive, k có trả ra -1
var5.concat(", right?"); // Các hàm kiểu này toàn trả ra giá trị chứ k đổi biến ban đầu, có vài hàm đổi biến thôi
if("Test".localeCompare("test")){ // Nó là caseInsensitive
    console.log("test == Test");
}
console.log("var5 match /G/gim:", var5.match(/G/gim));
console.log("var5 matchAll /G/gim:", [...var5.matchAll(/G/gim)]);
// Hàm matchAll trả ra 1 RegExpStringIterator, ta phải convert nó sang 1 array, cách convert cx dị nx
console.log(var5.replace(/s/gm, "S")); // cái này éo thay đổi trực tiếp str đâu nhé mà trả ra 1 string khác đã replace

// Dùng class JS
function Book(title, author){
    this.title = title;
    this.author = author;
    this.price = 1;
    function print(){
        with(this){
            author += " Johnathan.";
            title += "."
        }
    }
    this.print = print;
}
delete Book.price
var var6 = new Book("Lao gia","Hieu");
var6.print();
console.log(var6);

// Basic
// Thao tác với string
console.log(var5.slice(10,20).toLowerCase());
console.log(var5.slice(10,20).toLocaleUpperCase());
console.log(var5.split(" ",3));
console.log(var5.substr(3,10), " ", var5.substring(3,10));
console.log("Search: ", var5.search("his i"));
console.log(var5.padStart(50,"*"));

// Basic
console.log("STAGE TWO");
var var7 = new Array(102, 101, 103, 99);
var7.name = "hieu";
console.log(var7.name);

// Các kiểu duyệt
var7.forEach((element, index, arr) => {
    element = element*2; // đổi element hay arr[index] đều đổi var7 thực tế. Javascript toàn lấy địa chỉ như v
    console.log("Foreach: " + element);
})

// Mảng và object và hàm
// Các kiểu duyệt
function test(x = 1) {
    return (x > 100)
}
console.log(var7.join(" - "));
console.log(var7.every(test));
console.log(var7.some(test));
var7.push(10); // push, pop, shift, unshift thì lại đổi tt trên biến
var7.shift();
var7.unshift(105);
console.log(var7);
console.log(var7.filter(function test(x,index,array){
    if(index > 3)
    return x > 100;
    else return x < 100;
}));
console.log(var7.map((x) => { return Math.sqrt(x); })); // Mất dữ liệu string vì k *2 đc
console.log(var7.reverse());
console.log(var7.sort((a,b) => {
    return b-a;
}));
console.log(JSON.stringify(var7));//JSON là 1 object vai trò convert JS val <-> JSON format
console.log(var7.pop());
console.info(var7);
console.error(var7.reduce((total, x, curIndex, arr)=> {
    return total+=x;
}));
console.warn(var7.copyWithin(2,0,4));

// Basic
document.write("test link".link("#"), "anchor".anchor("a"), "big".big(), "bold".bold(), "sup".sup(), "sub".sub(),
"strike".strike(), "italic".italics(), "small".small());

// Xử lý error
class testError extends TypeError{
    constructor(props){
        super(props);
        this.message = "Hello"
    }
    // Hàm số ở đây là k đc
}
try{
    // throw new testError; // Tốt nhất là éo kế thừa, chỉ đổi thuộc tính thì luôn dưới cho nhanh
    throw new TypeError("Hello");
}
catch (e){
    console.log(e instanceof Error);
    console.log(e); // Cũng ra stack
    console.log(e.stack);
    console.log(e.name);
    console.log(e.message);
}
finally{
    console.log("Finally Error");
}

// Thao tác với Date
console.log("STAGE THREE")
var date = new Date(2021, 7, 26, 9, 54, 50, 50);
console.log("Time: ", date.getTime());
console.log("Year: ", date.getFullYear());
console.log("Timezone: ", date.getTimezoneOffset());
console.log("UTC", date.toUTCString());
console.log(date.toLocaleString("vi-VI")); // or en-US hiện ngày trc h sau

console.log(Date.UTC(2021, 26, 7)); // Tra ra số giây đến ngày củ lìn 
console.log(Date.parse(date)); // Tương tự

// Basic
console.log(Math.PI, Math.SQRT1_2, Math.LOG2E);
console.log("Random: ", Math.random());
console.log("Round: ", Math.round(2.1));
console.log("Ceil: ", Math.ceil(2.1));

// Các kiểu biến thông dụng khác
// RegExp
var regexp = new RegExp("[abc]","gm");
var testRegExp = "a k l lcb";
console.log("Source: ", regexp.source, " ;g: ", regexp.global, " ;m", regexp.multiline, "; i", regexp.ignoreCase);
console.log(regexp.test(testRegExp));
console.log("First: ", regexp.lastIndex); // tính cái đầu tiên là 1
regexp.test(testRegExp);
console.log("Second: ", regexp.lastIndex);
console.log("exec: ", regexp.exec(testRegExp));

// Các kiểu duyệt
var object = new Object({
    name: "Trang",
    age: 18,
})
for(let key in object){
    console.log("Test for in: ", key, " ", object[key]); // chú ý lấy giá trị thì nhét vào [] như này
}

// Basic
// Thao tác với các biến global
console.log("Width: ", window.screen.width);
console.log("Height: ", screen.availWidth);
console.log("Color depth: ", screen.colorDepth);
console.log("pixel depth", screen.pixelDepth);

// with keyword
with(Math){
    console.log("sin(pi/2)=", sin(PI/2));
}

// Basic 
// Có thể dùng eval, parseInt, ``, plus() để tính toán số trong chuỗi string. VD:
document.write(eval(2*3) + "<br/>");

// Dùng class JS
// Dùng hàm số bth trong class
class classTest { // Khác với class React k cần phải viết hoa chữ đầu
    constructor(name){
        this.name = name;
        this.age = 10;
    }
    aPrototypeMethod(){
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
    }
}
var aStudent = new classTest("Hieu");
aStudent.aPrototypeMethod();

// Tổng kết các thứ tront class
class extend extends classTest{
    #job = "IT tester";
    _age;
    constructor(name, age){
        super(name);
        this._age = age;
    }
    aPrototypeMethod() {
        super.aPrototypeMethod();
        console.log("Something: ", this.age, " ", this.#job);
    }

    get age() {
        return this._age;
    }
    set age(age) {
        this._age = age;
    }
    static staticVar = "Johnathan";
    static staticFunction1(){
        console.log("Static func 1: ", this.prototype.constructor.staticVar);
    }
}
console.log(extend);
var extendVar = new extend("Binh", 19);
console.log(extendVar);
extendVar.aPrototypeMethod();
extend.staticFunction2 = () => {
    console.log("Static func 2");
}
extend.staticFunction1();

// Dùng cookie
console.log("STAGE FOUR")
console.log("Support cookie: ", window.cookieEnabled);
// document.cookie = "username=hieunguyen; expires=Sun, 25 Jul 2021 12:00:00 UTC; path=/";
document.cookie = "username=hieunguyen";
console.log("Cookie: ", document.cookie);

// Thao tác thẻ DOM
console.log("document.embeds.length: ", document.embeds.length);
document.open();
document.writeln("Last modified: ", document.lastModified + "<br>");
document.writeln("Title: ", document.title + "<br />");
document.write("URL", document.URL, "<br>");
document.write("Charset: ", document.charset, "<br>");
document.close();

// Thao tác với các biến global
// var windowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
// var w = window.open("https://www.facebook.com", "Name", "width = 100px; height = 100px");
// window.moveTo(500, 100);
// window.resizeBy(1000, 1000);
// window.focus();
// w.close();

console.log("Lang: ", navigator.language);
console.log("App CodeName: ", navigator.appCodeName);
console.log("App version: ", navigator.appVersion);
console.log("Platform: ", navigator.platform);
console.log("User agent: ", navigator.userAgent);
console.log("Product: ", navigator.product);
console.log("Java enabled: ", navigator.javaEnabled);

for(var i = 0; i < navigator.mimeTypes.length; i++){
    console.log("mimetype_type_", navigator.mimeTypes[i].type, "_description_",navigator.mimeTypes[i].description);
}
for(var i = 0; i < navigator.plugins.length; i++){
    console.log("Plugins_name_", navigator.plugins[i].name, "_description_", navigator.plugins[i].description, 
    "_filename_", navigator.plugins[i].filename);
}

// Thao tác với thẻ DOM
document.body.style.backgroundColor = "#efe4e4";
var element = document.createElement('div');
element.id = "idOfBody"
element.innerText = "Content"
document.body.appendChild(element)
console.log(element.id);

console.log(document.implementation);

var commentNode = document.createComment("This is a comment from javascript");
console.log(commentNode.data);
console.log("Active ELement: ", document.activeElement.tagName);
console.log("children[0] luôn là html: ", document.children[0].nodeName);
console.log("State now: ", document.readyState);
console.log("Parent Node: ", element.parentNode);
element.setAttribute("style","background-color: red;"); // Chú ý code html là background-color còn js là backgroundColor
var attributeNode = element.getAttributeNode("style");
console.log(attributeNode); // Thg dùng có Node tức là láy attribute node này gán node khác
console.log(document.body.firstChild); // textNode k set đc thuộc tính

// document.body.firstChild.nextSibling.setAttributeNode(attributeNode.cloneNode(true)); 
// setAttributeNode k dùng cho comment node sẽ lỗi

console.log("documentElement", document.documentElement);
console.log("clientWidth", document.documentElement.clientWidth);

// Dùng storage
console.log("STAGE FIVE");
if(typeof Storage != 'undefined'){
    window.localStorage.setItem("age", 18);
    console.log("Local storage: ", this.localStorage.getItem("age"));
}
window.sessionStorage.setItem('author', "NTH");
window.sessionStorage.removeItem('author');
console.log("Session Storage: ", window.sessionStorage.getItem('author'));

// Closure function
class Closure {
    name = "Hieu";
    testClosure(){
        return () => {
            console.log("Closure: ", this.name); // fix bằng arrow function
        }
    }
}
var varClosure = new Closure; // k có tham số thì chả cần()
var temp = varClosure.testClosure();
temp();

// Dùng call bind
class CallBack {
    name = "hieu"
    testCallBack() {
        console.log("CallBack: ", this.name);
    }
}
var varCallBack = new CallBack;
function temp2 (callback, callbackObject) {
    callback.call(callbackObject);
}
temp2(varCallBack.testCallBack, varCallBack);

class testBind {
    name = "Hieu";
    func1() {
        console.log("Test bind: ", this.name);
    };
    func2(func) {
        func();
    }
    func3(){
        this.func2(this.func1.bind(this));
    }
}
var varBind = new testBind;
varBind.func3();
console.log(Object.getOwnPropertyNames(testBind));

// Thao tác với biến global
window.forward();
window.go(-1);
console.log(window.history.length);