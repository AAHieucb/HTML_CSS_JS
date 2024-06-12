// # Dùng promise / Dùng promise với map
// Cách tạo hàm sleep
// function sleep(ms) { 
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
// async function test(){
//     const data = [3,2,1];
//     async function asyncFuncNe(id) {
//         await sleep(id*1000);
//         console.log("Finish ", id);
//         return id;
//     }
//     const da = await Promise.all(data.map(id => asyncFuncNe(id)));
//     console.log(da);
//     console.log("test thoi");
// }
// test();

// Promise lồng nhau với map. Cứ hiểu là cứ bất đồng bộ là hàm async thì phải có await, còn 1 list các hàm async thì 
// phải có await Promise.all([])
// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
// async function test(){
//     const data = [[5,6],[3,4],[1,2]];
//     async function asyncFuncNe(id) {
//         await sleep(id*1000);
//         console.log("Finish ", id);
//         return id;
//     }
//     async function test2(item) {
//         return await Promise.all(item.map(async it => {
//             const a = await asyncFuncNe(it);
//             console.log(a);
//             return a;
//         }))
//     }
//     const da = await Promise.all(
//         data.map(async item => {
//             // Éo return await thì bốc cức
//             const b = await test2(item);
//             console.log(b);
//             return b;
//         })
//     );
//     console.log(da);
//     console.log("test thoi");
// }
// test();

// Viết gọn hơn: chờ 5,6 thực hiện xong mới làm [5,6], chờ cảgh [5,6],[3,4],[1,2] thực hiện xong thì data mới xong
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function test(){
    const data = [[5,6],[3,4],[1,2]];
    async function asyncFuncNe(id) {
        await sleep(id*1000);
        console.log("Finish ", id);
        return id;
    }
    const da = await Promise.all(
        data.map(async item => {
            // Dùng return chỉ để lấy ra cho biến da bên ngoài, bỏ đi vẫn thực hiện được 6 hàm bth
            return await Promise.all(item.map(async it => {
                return await asyncFuncNe(it);
            }));
        })
    );
    console.log(da);
    console.log("test thoi");
}
test();

/*
Chốt quy tắc làm việc với Promise:
Nếu mảng nhiều promise thì phải dùng promise all
Nếu return 1 promise phải có await vì nếu k có chắc chắn ra type promise chả làm được gì cả. Nếu như v, bên ngoài hàm gọi nó vẫn phải
bao nó bằng 1 cái await
Thứ tự chạy luôn là tuần tự, khi dùng map sẽ là tuần tự theo index tăng dần. Khi nào gặp hàm promise or async sẽ
ngay lập tức chạy trên 1 luồng riêng nếu k có await
await Promise sẽ chặn k chạy cái dưới đến khi nào cái promise thực hiện xong
Phạm vi promise await chỉ được trong 1 depth. VD gọi: await Promise.all([hàm số]);
=> nếu hàm số lại là promise tiếp sẽ chờ cho promise thực hiện xong là ok. Nếu hàm số là có 1 promise gọi 1 promise khác 
thì cái promise cấp độ 2 nó kệ mẹ, khi promise cấp độ 1 xong là thoát luôn. Do đó nếu muốn chờ promise cấp độ 2 thì luôn 
có await (nếu promise cấp độ 2 chỉ có 1) or await Promise.all([]) tiếp (nếu promsie cấp độ 2 có nhiều)
K quan trọng array.map(async item => {})) hay array.map(item => {<gọi hàm async>}) vì nó cứ làm như quy tắc tuần tự, gặp
promise khi nào thì tách riêng luồng mới và chạy tiếp luồng cũ như bth. Thg dùng cách 1
Dùng map phải có return, éo return thì nó chả biết trả ra cái gì là undefined
map + promise sẽ luôn return ra mảng với các phần tử là đúng thứ tự nên k cần lo
*/

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
// async function test(){
//     const item = [3,2,1];
//     async function asyncFuncNe(id) {
//         await sleep(id*1000);
//         console.log("Finish ", id);
//         return id;
//     }    
//     const da1 = await Promise.all(
//         item.map(it => {
//             return asyncFuncNe(it)
//         })
//     );
//     // const da = await Promise.all(item.map(id => asyncFuncNe(id)));
//     // => Viết kiểu k return sẽ chả có gì, ở đây da sẽ chả có gì. Cái asyncFuncNe return cho chính nó chứ hàm map k return nó nên kết quả
//     // trả ra vẫn là mảng undefined
//     // Giá trị return k await sẽ mãi mãi ra kiểu promise nên phải luôn có
//     console.log(da1);
//     console.log("test thoi");
// }
// test();
