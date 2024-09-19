// # Basic / Các thao tác DOM cơ bản

// Select với $
$("div:animated"); // Thẻ HTML đang có hiệu ứng animate
// $("div:eq(index)"); // Phần tử thứ index trong n phần tử trả về
// index có thể là even, odd, 2n+1, 3n+1, 3n,.. nếu thích index theo quy tắc nào
$("div:even");
$("div:first");
$("div:focus");
// $("div:gt(index)"); // Mọi phần tử vị trí sau index trong n phần tử trả về
$("div:header");
$("div:lang(value)");
$("div:last")
$("div:not(.red)"); // Thẻ div k có class red
$("div:root");

$("div:first-child");
$("div:first-of-type");
$("div:last-of-type");
// $("div:nth-child(index)");
// $("div:nth-last-child(index)");
// $("div:nth-last-of-type(index)");
// $("div:nth-of-type(index)");
$("div:only-child");
$("div:only-of-type");

$("p:containes(is)");
$("div:empty");
$("div:has(div)");
$("div:parent");

$(':button')	
$(':checkbox')
$(':checked')	
$(':disabled')	
$(':enabled')	
$(':file')
$(':focus')
$(':image')	
$(':input.username')
$(':password')
$(':radio')	
$(':reset')	
$(':selected')
$(':submit')
$(':text').css('border', 'solid 2px yellow'); // Lấy và thêm thuộc tính css

$('[title|="value"]')
$('[title*="value"]') // Tồn tại chữ value trong chuỗi là được
$('[title~="value"]') // Xuất hiện chữ value ngăn cách với các chữ khác(kiểu \bvalue\b ấy)
$('[title$="value"]')
$('[title="value"]');
$('[title!="value"]')
$('[title]')
$('a[title|="freetuts"]').addClass('selected');
$('a[name][title="freetuts"]').addClass('selected'); // Có cả 2 thuộc tính và title thì phải bằng freetuts

$("#contain > li").addClass('active');
$("#contain li ul li").addClass('active'); // Tất cả các thẻ li lồng trong ul lồng trong li lồng trong #contain

$("div:hidden").show();
$(".active:visible");

// Bắt sự kiện
$(document).ready(function(){ // Sự kiện onload của JS
    // alert('Trình duyệt đã tải xong!');
});
$( "html #btn" ).on( "click", function() { }); //.event() or .on("event") đều được
$('html #btn').off("click", "html #btn", function(){ });

$("p").dblclick(function(){
    $(this).slideUp(); // this là thẻ này, slideUp x slideDown là ẩn hay hiện thẻ nào
    // $(selector).slideUp/Down(speed,easing,callback); có thể bỏ qua easing mà speed r callback luôn
});
$('input[type="text"]').keypress(function(){ // or dùng keydown,keyup
    $("span").text(i += 1); // gán text
    $("p").show().fadeOut();
    // $(selector).fadeIn(speed,callback);
    // $(selector).fadeOut(speed,easing,callback)
});
$(window).resize(function() {
    $(window).bind("resize", function(){
        $("p").text("Window width: " + $(window).width() + ", " + "Window height: " + $(window).height());
    });
}); // window document có sẵn thì lấy TT
$(window).scroll(function() { // Thẻ đó phải có thanh scroll vì hiển thị k hết mới phát ra event
    $("p").show().fadeOut("slow"); // show và hide chỉ là chỉnh sửa css display thẻ đó thôi
    // $(selector).hide/show(speed,callback); // speed tốc độ ẩn k dùng mặc định là 0, hide xong thì làm gì
    $("p").show('fast'); // dùng số or dùng fast/slow là 200/600 milis
});
/*
bind() bổ sung sự kiện vào đối tượng
contextmenu() click chuột phải
delegate() Bổ sung sự kiện vào đối tượng cả trước và sau khi thêm bằng Javascript
die() xóa sự kiện 
error()	xảy ra khi có lỗi
focusin() Giống focus nhưng bổ sung thêm điều kiện là sự kiện đang ở trạng thái mới vào
focusout() Giống focus nhưn bổ sung thêm điều kiện là sự kiện đang ở trạng thái dừng
live() Bổ sung sự kiện vào đối tượng, từ version 1.7 sẽ thay thế bằng sự kiện on()
load() Xảy ra khi đối tượng bắt đầu load
ready() Xảy ra khi browser đã load xong
toggle() khi click vào
*/

// Thao tác với class style
var object = $('div');
if ($(object[0]).hasClass('red')){ // Tên thẻ muốn thao tác gì với các hàm của jQuery thì lại kẹp nó tiếp vào $
    $(object[0]).removeClass('red').addClass('yellow');
}
$('div').hasClass("title"); // boolean

$(object[1]).html("Text"); // set
console.log($(object[1]).html()); // get

$('#an').attr('type', 'textbox'); // đổi type của thẻ có id là an thành textbox
var type = $('#an').attr('type'); // k có đối số 2 sẽ là lấy thuộc tính type của thẻ
$("#an").removeAttr('type');

$('#an').prop('name'); // prop cũng dùng để get giá trị attribute như attr nhưng nó còn lấy được cả giá trị boolean. VD:
$('#an').prop('checked');

$('#box').not('.red').show();
$('#box').append("<div>Hello</div>");

$('ul').find('span')

// Dùng các hàm JS mà jQuery cung
console.log(("  Hello  ").trim());
console.log($.trim("  Hello  "));
//$ k thôi sẽ chỉ ra 1 biến trống jQuery. Ta có thể dùng các hàm của jQuery cung cấp như này

// Biến trong jQuery
$char = 1; // Biến trong jQuery có thể khai báo nhanh như này tương đương: var $char;
