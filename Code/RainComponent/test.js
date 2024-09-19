// Responsive css / Dùng JS để responsive
// Khi style nhiều => đổi hắn file thay vì gán từng thuộc tính
window.onload = (event) =>{ 
    // Load lần đầu
    var width = $(window).width();
    if (width <= 768){
        $('body').append('<link rel="stylesheet" href="mobile.css">');
    }
    else{
        $('body').append('<link rel="stylesheet" href="test2.css">');
    }

    // window phải load thành công mới gán sự kiện chứ
    $(window).resize(function(){
        var width = $(window).width();
        if (width <= 768){
            $('body').append('<link rel="stylesheet" href="mobile.css">');
        }
        else{
            $('body').append('<link rel="stylesheet" href="test2.css">');
        }
    });

    // Còn vấn đề về check thiết bị người dùng đang dùng vì responsive phụ thuộc vào loại thiết bị và kích thước
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows/i.test(navigator.userAgent) ) {
        console.log(navigator.userAgent);
    }
};