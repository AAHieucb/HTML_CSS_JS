// Mảng và object và hàm
// Tổng kết destructuring assignment
console.log("STAGE 1");
var desAssignmentArr = [1, 2, 3];
var [a, , b, c, d = 10] = desAssignmentArr;
console.log(a, b, c, d);
var testFlat = [[a, [b, c, 1]], d];
console.log(testFlat.flat()); // k đổi TT object
console.log(testFlat);

var desAssignmentObj = {
    name: 'hieu',
    age: 1,
    job: 'IT'
}
var {name, y, z = 10, ...x} = desAssignmentObj;
console.log(name, y , x, z);
var AllInOneObject = { name, y, z, x};
console.log("All in one: ", AllInOneObject);

var desAssignmentPara = function(a, b, c, ...d) {
    console.log(a, b, c);
    for(var i in d) {
        console.log(d[i]);
    }
    for(var i of d.entries()) { // Bắt buộc dùng vong for of, dùng for in là sai
        console.log("for of entries: ", i);
    }
    for(var [a,b] of d.entries()) {
        console.log("for of entries[a, b]: ", a, " ", b);
    }
    for(var i of d.values()) {
        console.log("for of values: ", i);
    }
}
desAssignmentPara(1,2,3,4,5,6);

// Basic
// Dùng Set
var testSet = new Set([1,2,3,4,4]);
testSet.add(5);
if(testSet.has(2))
    testSet.delete(2);
for(let number of testSet)
    console.log(number)

var arrFromSet = [...testSet];
console.log(arrFromSet);
testSet.clear();
console.log("Size: ", testSet.size);

// Dùng Map
var varMap = new Map([
    [ "Name", "Hieu" ],
    [ "Age", 18 ]
]);
varMap.set(NaN, "hieucuopbien123@gmail.com").set("job","IT");
if(varMap.has("Name"))
    varMap.delete("Name");
console.log("Size of map: ", varMap.size);

for(var i of varMap.keys()){
    console.log(i);
}
for(var i of varMap.values()){
    console.log(i);
}
for(var i of varMap.entries()){
    console.log(i[0], " - ", i[1]);
}
console.log("Get value age: ", varMap.get("Age"));
// varMap.clear();

var changeMapToMap = new Map([...varMap].map(
    ([key, val]) => {
        return [key, key + " - " + val];
    }
))
console.log(changeMapToMap);

// Dùng WeakMap
console.log("STAGE 2");
var key1 = Object.create({});
var varWeakMap = new WeakMap([
    [ key1, "key number 1"],
    [ {}, "key number 2"],
]).set({ name: "hieu" },18);
console.log(varWeakMap); 
// Chỉ có 1 phần tử key1, 2 phần tử còn lại tự động bị xóa bởi GC vì k có biến nào reference tới

// Dùng WeakSet
var varWeakSet = new WeakSet([{ name: "hieu" }, { age: 18 }])
console.log(varWeakSet);

// Usecase dùng Weak: lưu người => số lượt người đó visit web
// 📁 visitsCount.js
let visitsCountMap = new WeakMap();
function countUser(user) { // increase the visits count
    let count = visitsCountMap.get(user) || 0;
    visitsCountMap.set(user, count + 1);
}
// 📁 main.js
let john = { name: "John" };
countUser(john); // count his visits
// later john leaves us
john = null; 
// John đã tự xóa ở biến trong file visitsCount.js

// Dùng Symbol
var varSymbol = Symbol();
console.log("String: ", String(varSymbol));
console.log("Boolean: ", Boolean(varSymbol));
varWeakMap.set({
    [varSymbol]: "Test"
}, "Test value"); // Cx k được lưu trong map nữa vì k có reference đến cả key object của map
console.log("Symbol is key of weak map: ", varWeakMap);

// Dùng promise
var promise = new Promise((resolve, reject) => {
    reject("message");
})
promise.then(() => {
    console.log("Function1");
    return false;
})
.then(() => {
    console.log("Function2");
    return true;
})

.catch((err) => {
    console.log("Catch1: ", err);
    return false;
})
.then((content) => {
    console.log("Function3: ", content);
    return false;
})
.then(() => {
    console.log("Function4");
    return "test para";
})
.then((mess) => {
    console.log("Function5: ", mess);
    return true; // return true false luôn coi là thành công truyền tham số tiếp
})

// gọi return new Promise để gọi tiếp bằng resolve hay reject
var promiseUD = new Promise((resolve, reject) => {
    resolve("Hieu");
})
promiseUD.then((mess) => {
    return new Promise((resolve, reject) => {
        if(mess === "Hieu")
            resolve();
        else
            reject();
    })
})
.then(() => {
    console.log("Function2 ver 2");
    return new Promise((resolve, reject) => {
        reject();
    })
})
.catch((err) => {
    return new Promise((resolve, reject) => {
        reject();
    }) 
})
.then((content) => {
    console.log("Function3 ver 2: ", content);
    return false;
})
.then(() => {
    console.log("Function4 ver 2");
    return "test para";
})
.then((mess) => {
    console.log("Function5 ver 2: ", mess);
    return true;
})
.catch(err => {}) // Luôn có 1 cái catch ở cuối
// Như ở trên thì Function2 ver 2 r catch lại reject tiếp thì kết thúc luôn => master promise

// Mảng và object và hàm
function checkArgument() { // Éo có vẫn truyền, vẫn truy cập đc luôn
    for(var x of arguments)
        console.log(x);

    var iterable = arguments[Symbol.iterator]();
    var temp = iterable.next();
    while(temp.done == false){
        console.log("Iterator: ", temp.value);
        temp = iterable.next();
    }
}
checkArgument(1, 2, 3, 9, 5);

var newArray = new Array(4,3,2,1);
console.log(newArray); // In ra biến array
console.log(...newArray); // Chỉ in ra các giá trị
console.log("includes in ES7: ", newArray.includes(2,1));

newArray.splice(1, 1, "Lemon", "Kiwi"); // đổi TT
console.log(newArray.slice(0, 4)); // k đổi trực tiếp

// Basic
console.log("2 mũ 5", 2**5);

// Dùng Promise
console.log("STAGE 3");
async function testAsynchronous() {
    var check = 0;
    var first = await new Promise((resolve,reject) => {
        resolve(check);
    }).then(check => {
        check++;
        console.log("After plus one: ", check);
        return check;
    })

    // Ở đây dùng Promise.resolve(first).then là để sau khi first hoàn thành xong thì lấy GT trả về truyền vào hàm 
    // then. Ta có thể nối tiếp .then cho bên trên nhưng đây là cách để viết tách cục then ra 1 hàm riêng
    // Thực chất làm v ở đây là k cần thiết vì biến check là biến của cả hàm nên luôn dùng được, còn đảm bảo hoàn thành
    // xong thì có await rồi nên k cần
    var second = await Promise.resolve(first).then(check => {
        check*=2;
        console.log("After multiple by 2: ", check);
        return check;
    })

    var thirdOperation = async (check) => {
        return new Promise((resolve, reject) => {
            resolve(check);
        }).then(check => {
            if(check > 4)
                console.log("Check > 4");
            else 
                console.log("Check <= 4");
            return check;
        })
    }
    try{
        var finalRes = await thirdOperation(second);
        document.getElementById("check").innerHTML = `<h1>${finalRes}</h1>`;
    }catch(e){
        console.log(e);
    }
}
try{
    testAsynchronous()
}catch(e) {console.log(e)}

// Các hàm async với thời gian
function testTimeOut(){
    console.log("Timeout each 2s");
}
var intervalID = setInterval(testTimeOut, 2000);
function clearIntervalClock() {
    clearInterval(intervalID);
    console.log("Cleared")
}
setTimeout(clearIntervalClock, 8000);

// Thao tác thẻ DOM
console.log("Image tag: ", document.images.length);

var att = document.createAttribute("href"); // 1 biến attribute chỉ lưu đc 1 attribute
att.value = "#";
var ele = document.createElement('a');
ele.setAttributeNode(att);
ele.textContent = "Click Link";
document.body.appendChild(ele);

var fragment = document.createDocumentFragment();
var animals = ['cat', 'dog','lizard'];
animals.forEach((animal) => {
    var liTag = document.createElement('li');
    var textNode = document.createTextNode(animal);
    liTag.appendChild(textNode);
    fragment.appendChild(liTag);
})
document.body.appendChild(fragment);
console.log("Tìm theo tên: ", document.getElementsByName('hieu').length);

console.log("Image first: ", document.querySelector('img'));
console.log("Find by class: ", document.getElementsByClassName('test')[0].className);
console.log("Value of input: ", document.forms[0].Name.value);
document.forms[0].Name.focus();
// Chú ý 1 trang web chỉ focus đc vào 1 thứ -> Ở th này nó focus vào input trong iframe nhé vì nó load sau nên lấy sau

document.getElementById("check").replaceChild(document.createTextNode("Content"),
                                            document.getElementById("check").childNodes[0]);

// console.log("Query all: ", document.querySelectorAll("body div"));
console.log("nodeValue: ", document.getElementById("check").childNodes[0].nodeValue);
// nodeValue trả ra giá trị text của 1 node. Chú ý giá trị text của 1 node phải là 1 textNode ms dc. Nếu là 1 element
// node bth thì nodeValue sẽ return null. Ở đây ta phải lấy textNode qua childNodes[0] r mới lấy giá trị text của nó 

// Dùng sự kiện JS
document.getElementsByTagName('a')[0].onclick = () => {
    console.log("Link is clicked");
    return false;
};
function eventFunc() {
    alert(this);
    return false;
};
document.getElementById("inputButton").addEventListener('click',eventFunc);
document.getElementById("inputButton").removeEventListener('click',eventFunc);
