// Basic

// Dịch chuyển tới vị trí nào trong page
// Ấn button thì rong 1500ms tới thì scroll vào thẻ đích, và sau đó sẽ chơi nhạc ngay khi scroll xong tới thẻ đích
function moveToImage( elem ) {
    setTimeout( function () {
        // Hàm jquery: (selector).animate({ styles }, speed, easing, callback) => giá trị của scrollTop trong styles là
        // kc của nơi cần scroll tới đến vị trí 0 của thẻ html thì lấy bằng hàm ('div' + elem).offset().top
        // Hàm này lấy thẻ div có class elem và lấy kc tới top
        $( 'html, body' ).animate({ scrollTop: $('div' + elem).offset().top }, 1500);
    }, 0);
}

// Kiểm soát vị trí scrollbar
$(document).ready(function () {
    // Tự động scrol khi vào lần đầu tiên, k cần tạo video, nhưng k stop được
    // $("html, body").animate({scrollTop: $(document).height()}, 50000);
    
    // $("ul li").click(function () {
    //     setTimeout(function () {
    //     }, 300);
    // });
    
    $(window).scroll(function() {
        $("li").removeClass("active");
        
        // Xử lý scroll đến thẻ nào thì làm gì
        // Math.abs($(window).scrollTop() từ vị trí scroll trên cùng đến 0 của html - vị trí trên cùng của thẻ forest
        // đến vị trí 0 của html) < nửa kích thước window tức thẻ nào chiếm > 1/2 màn hình thì menu nhô thẻ đó
        if(Math.abs($(window).scrollTop() - $("div.forest").offset().top) < $(window).height()/2) {
            if($("audio").attr("src") != "/forest.mp3") {
                $("audio").attr("src", "/forest.mp3");
            }
            $("li.forest").addClass("active");
        }
        else if(Math.abs($(window).scrollTop() - $("div.eagle").offset().top) < $(window).height()/2) {
            if($("audio").attr("src") != "/eagle.mp3") {
                $("audio").attr("src", "/eagle.mp3");
            }
            $("li.eagle").addClass("active");
        }
        else if(Math.abs($(window).scrollTop() - $("div.rhino").offset().top) < $(window).height()/2) {
            if($("audio").attr("src") != "/rhino.mp3") {
                $("audio").attr("src", "/rhino.mp3");
            }
            $("li.rhino").addClass("active");
        }
        else if(Math.abs($(window).scrollTop() - $("div.owl").offset().top) < $(window).height()/2) {
            if($("audio").attr("src") != "/owl.mp3") {
                $("audio").attr("src", "/owl.mp3");
            }
            $("li.owl").addClass("active");
        }
        else if(Math.abs($(window).scrollTop() - $("div.lion").offset().top) < $(window).height()/2) {
            if($("audio").attr("src") != "/lion.mp3") {
                $("audio").attr("src", "/lion.mp3");
            }
            $("li.lion").addClass("active");
        }
        else if(Math.abs($(window).scrollTop() - $("div.bear").offset().top) < $(window).height()/2) {
            if($("audio").attr("src") != "/bear.mp3") {
                $("audio").attr("src", "/bear.mp3");
            }
            $("li.bear").addClass("active");
        }
        else if(Math.abs($(window).scrollTop() - $("div.back").offset().top) < $(window).height()/2) {
            if($("audio").attr("src") != "/back.mp3") {
                $("audio").attr("src", "/back.mp3");
            }
            $("li.back").addClass("active");
        }
    });
});

// Đổi style bằng JS
function toggleMuteAudio(){
    $("audio").prop("muted",!$("audio").prop("muted")); // bật thành tắt, tắt thành bật
    if($("audio").prop("muted")) {
        $(".volume i").removeClass("fa-volume-up");
        $(".volume i").addClass("fa-volume-off");
    }
    else {
        $(".volume i").removeClass("fa-volume-off"); // class có sẵn của font-awesome
        $(".volume i").addClass("fa-volume-up");
    }
}

// default chạy 1 lần
if($("audio").attr("src") != "/forest.mp3") {
    $("audio").attr("src", "/forest.mp3");
}

function goHome() {
    moveToImage(".forest");
}