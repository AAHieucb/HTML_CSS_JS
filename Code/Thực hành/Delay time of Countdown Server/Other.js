// Thao tác với console

console.clear();//clear k chỉ xóa hiển thị mà clear cả tính chất như count, group
console.groupCollapsed("chỉ là tự động collapse");
console.debug("debug hiện chữ màu xanh");
console.groupEnd();
//master mọi thể loại console => ng ta thg dùng nó để tạo ra các logger
console.log("Object value: %o with string substitution", {
    string: "str",
    number: 10
});
console.log("Example %cCSS-styled%c %clog!",
    "color: red; font-family: monoscope;",
    "",
    "color: green; font-size: large; font-weight: bold");
//%c: string code css ; %o: object ; %d: integer; %s: string; %f: floating-point number
//console.log(<content chứa các para %>, lần lượt truyền các para đó) => như kiểu printf của C
//Khi dùng %c thì các giá trị hiển thị phía sau %c sẽ mang code css ta mong muốn cho đến khi gặp 1 %c tiếp theo
//Nếu ta k muốn dùng css nx thì đặt %c tiếp theo là rỗng là đc

console.group("group 1");
console.log("Inside 1st group");
console.group();
console.log("Inside 2nd group");
console.groupEnd();
console.groupEnd();
console.log("Outer scope");

console.trace("Logging the way down here!");
//theo dấu trong file báo rằng đã đến vị trí nào của file

console.warn("This is a warning!");
console.error("This is an error!");
console.info("This is very informative!");
console.assert(true, "This won't be logged!");
console.assert(false, "This will be logged!");//assert là false thì sẽ hiển thị như 1 error

console.time();//bắt đầu bấm giờ
console.timeLog();//hiển thị giờ
console.timeEnd();//hiển thị giờ và kết thúc vc bấm giờ

console.count(); // default: 1
console.count(); // default: 2
console.count(); // default: 3
console.countReset();
console.count();

//truyền tham số như là id v khi cần đếm số lần 
console.count("for");
console.count("if");
console.count("if");
console.countReset("if");
console.count("for");
console.count("if");
console.count("if");
console.countReset("if");
console.count("for");
console.countReset("for");
console.count();

console.table([[0,1,2,3,4], [5,6,7,8,9]]);