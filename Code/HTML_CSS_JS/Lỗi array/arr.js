// Mảng và object và hàm

// Bản chất gán = là gán địa chỉ
var arr1 = [1, 2, 3];
var arr2 = arr1;
arr1.push(4);
console.log(arr2);

// nhưng khi gán arr=[] thì éo
arr1 = [];
console.log(arr1, arr2);
// NN là vì nó gán = [] nó là tạo 1 instance mới cho arr đó. Như kiểu gán địa chỉ trong C++ thì đây, arr1 gán 
// địa chỉ sang NULL chứ arr2 vẫn trỏ vào địa chỉ cũ. Trừ khi thay đổi giá trị mới ảnh hưởng

//Tương tự object cũng v
var obj1 = { number: 1, text: "Hello" };
var obj2 = obj1;
obj1["additionalProps"] = "more";
console.log(obj2);

obj1 = {};
console.log(obj1, obj2);

//Cách gán rỗng cho arr chuẩn
var arr3 = [1, 2, 3];
var arr4 = arr3;
arr4.length = 0;
console.log(arr3, arr4);
//or
var arr5 = [1, 2, 3];
var arr6 = arr5;
// arr5.splice(0, arr5.length);
arr6.splice(0, arr5.length);
console.log(arr5, arr6);
// Thực chất nếu mảng chỉ có 1 reference thì gán = [] là xong thì mảng trong bộ nhớ k còn reference nào trỏ tới sẽ bị
// GC xóa

//clear object
var obj3 = { number: 1, text: "Hello" };
var obj4 = obj1;
for (const prop of Object.getOwnPropertyNames(obj3)) {//lấy key đó
    delete obj3[prop];
}
console.log(obj3, obj4);

// => nch là gán array empty thì dùng length = 0 là chuẩn nhất. Còn object thì dùng vòng for các key nhé


// # ES6 snippet

// Lấy Base URL
const getBaseURL = url => url.replace(/[?#].*$/, '');
getBaseURL('http://url.com/page?name=Adam&surname=Smith'); // 'http://url.com/page'

// Check absolute url
const isAbsoluteURL = str => /^[a-z][a-z0-9+.-]*:/.test(str);
isAbsoluteURL('https://google.com'); // true
isAbsoluteURL('ftp://www.myserver.net'); // true
isAbsoluteURL('/foo/bar'); // false

// Lấy params url dạng object
const getURLParameters = url => 
    (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
        (a, v) => ( (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a )
        , {}
    );
getURLParameters('google.com'); // {}
getURLParameters('http://url.com/page?name=Adam&surname=Smith'); // {name: 'Adam', surname: 'Smith'}

// Check 1 thẻ chứa thẻ khác
const elementContains = (parent, child) =>
    parent !== child && parent.contains(child);
elementContains(document.querySelector('head'), document.querySelector('title')); // true
elementContains(document.querySelector('body'), document.querySelector('body')); // false

// Lấy mọi cha của thẻ khác
const getAncestors = el => {
    let ancestors = [];
    while (el) {
        ancestors.unshift(el);
        el = el.parentNode;
    }
    return ancestors;
};
getAncestors(document.querySelector('nav')); // [document, html, body, header, nav]

// Scroll smoothly tới 1 thẻ
const smoothScroll = element =>
    document.querySelector(element)?.scrollIntoView({
        behavior: 'smooth'
    });
smoothScroll('#fooBar'); // scrolls smoothly to the element with the id fooBar
smoothScroll('.fooBar'); // scrolls smoothly to the first element with a class of fooBar

// Bắt sự kiện khi con chuột click ra ngoài 1 thẻ
const onClickOutside = (element, callback) => {
    document.addEventListener('click', e => {
        if (!element.contains(e.target)) callback();
    });
};
onClickOutside('#my-element', () => console.log('Hello'));

// Tự gen số random
const UUIDGeneratorBrowser = () =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
UUIDGeneratorBrowser();

// Lấy text được chọn
const getSelectedText = () => window.getSelection().toString();
getSelectedText();

// Hàm gọi để copy text vào clipboard
const copyToClipboard = str => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(str);
    return Promise.reject('The Clipboard API is not available.');
};
copyToClipboard("Test");

// Thêm style vào thẻ nào
const addStyles = (el, styles) => { 
    if(el) Object.assign(el.style, styles); 
};
addStyles(document.getElementById('my-element'), {
    background: 'red',
    color: '#ffff00',
    fontSize: '3rem'
});

// Check phím capslock có được bật
const el = document.getElementById('password');
el.addEventListener('keyup', e => console.log(e.getModifierState('CapsLock')));

// Check Date valid
const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());
isDateValid('December 17, 1995 03:24:00'); // true
isDateValid('1995-12-17T03:24:00'); // true
isDateValid('1995-12-17 T03:24:00'); // false
isDateValid('Duck'); // false
isDateValid(1995, 11, 17); // true
isDateValid(1995, 11, 17, 'Duck'); // false
isDateValid({}); // false

// Lấy time từ date
const getColonTimeFromDate = date => date.toTimeString().slice(0, 8);
console.log(new Date());
console.log(getColonTimeFromDate(new Date())); // '08:38:00'

// Lấy unix timestamp từ Date
const getTimestamp = (date = new Date()) => Math.floor(date.getTime() / 1000);
console.log(getTimestamp());

// Lấy language hiện tại người dùng đang dùng
const detectLanguage = (defaultLang = 'en-US') =>
    navigator.language || (Array.isArray(navigator.languages) && navigator.languages[0]) || defaultLang;
detectLanguage(); // 'nl-NL'

// Lấy chế độ color scheme của người dùng, người dùng bật dark mode chẳng hạn
const prefersDarkColorScheme = () =>
    window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
prefersDarkColorScheme(); // true

// Check device support touch event
const supportsTouchEvents = () =>
    window && 'ontouchstart' in window;
supportsTouchEvents(); // true