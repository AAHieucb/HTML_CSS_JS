// Thao tác với console
console.group();
console.log("%c%d%o","font-size: larger; font-weight: bolder; color: red", 18, {
    name: "Hieu",
    age: 18
});
console.group();
console.trace("Coming here");
console.groupEnd();
console.time();
console.timeLog();
console.groupEnd();
console.timeEnd();
console.timeStamp("Time stamp");//k nên dùng vì k chuẩn, 1 số trình duyệt sẽ k hđ
console.assert(1+1!=2, "1+1!=2 is false");
console.count("Hello");
console.countReset("Hello");
console.count("Hello");
console.table([[1,2],[1,2,3],[1,2,3,4],[]]);