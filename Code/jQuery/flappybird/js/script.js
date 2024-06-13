$(function () {
    // Select với $
    // Khai báo các object
    var container = $('#container');
    var bird = $('#bird');
    var pole = $('.pole');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var score = $('#score');
    //mục đích của cả game này chỉ là handle sự kiện và thay đổi css. Với jQuery điều này có thể xử lý gọn gàng dễ dàng

    // Thao tác với class style
    // Chuyển các thông tin của object sang dạng số thực
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('height'));
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());
    var speed = 10; 
    //css, height, width lấy thỏa thích
    //ta lấy các hằng số ở đây thôi

    // Một số trạng thái trong game
    var go_up = false;
    var score_updated = false;
    var game_over = false;

    // Hàm bắt đầu game
    function playGame() {
        // Realtime cho game 
        var the_game = setInterval(function () {
            if (collision(bird, pole_1) || // Nếu chú chim va chạm với ống trên
                collision(bird, pole_2) || // Hoặc chú chim va chạm với ông dưới
                parseInt(bird.css('top')) <= 0 || // Hoặc chú chim va chạp với khung game trên
                parseInt(bird.css('top')) > container_height - bird_height // Hoặc chú chim va chạm với khung game dưới
                )
            {
                stop_the_game(); // Chạy hàm thua game
            }
            else
            {
                // Lấy vị trị hiện tại của ống nước
                var pole_current_position = parseInt(pole.css('right'));
                // Cập nhập điểm khi chú chim vượt qua 1 cặp ống
                if (pole_current_position > container_width - bird_left)
                {
                    if (score_updated === false)
                    {
                        score.text(parseInt(score.text()) + 1); // Cộng 1 điểm
                        score_updated = true;
                    }
                }

                // Kiểm tra các ống đã đi ra khỏi khung game 
                if (pole_current_position > container_width) {
                    var new_height = parseInt(Math.random() * 100); 
                    // Tạo chiều cao các ống nước ngẫu nhiên
                    pole_1.css('height', pole_initial_height + new_height);
                    pole_2.css('height', pole_initial_height - new_height);
                    score_updated = false;
                    pole_current_position = pole_initial_position; // Gán vị trị hiện tại = vị trí ban đầu của ống nước
                }

                // Di chuyển ống nước
                pole.css('right', pole_current_position + speed);

                // Nếu không điều khiển chú chim bay lên
                if (go_up === false) {
                    go_down(); // Hàm di chuyển chú chim rơi xuống
                }
            }
        }, 40);
    }

    // Khi nhả chuột ra trong khung game
    $('#container').mouseup(function (e) {    
        clearInterval(go_up); // Xoá realtime hành động bay lên cho chú chim
        go_up = false;
    });

    // Khi nhấp chuột vào trong khung game
    $('#container').mousedown(function (e) {
        go_up = setInterval(up, 40); // Realtime hành động bay lên cho chú chim
    });

    // Hàm chỉnh nhanh các thuộc tính css
    // Khi nhấn vào Chơi game
    $('#play_btn').click(function() {
        playGame(); // Chạy hàm bắt đầu chơi game
        $(this).hide(); // Ẩn nút chơi game
    });    

    // Hàm di chuyển chú chim rơi xuống
    function go_down() {
        bird.css('top', parseInt(bird.css('top')) + 10);
        bird.css('transform', 'rotate(50deg)'); // Nghiêng object chú chim 50 độ
    }

    // Hàm di chuyển chú chim bay lên
    function up() {
        bird.css('top', parseInt(bird.css('top')) - 20);
        bird.css('transform', 'rotate(-10deg)'); // Nghiêng object chú chim -10 độ
    }

    // Hàm thua game
    function stop_the_game() {
        clearInterval(playGame()); // Xoá realtime chơi game
        game_over = true;
        $('#restart_btn').slideDown(); // Hiện nút chơi lại
    }

    // Khi click vào nút Chơi lại
    $('#restart_btn').click(function () {
        location.reload(); // Tải lại trang
    });

    // Lấy vị trí các thẻ
    // Hàm va chạm giữa 2 object
    function collision($div1, $div2) {
        // Khai báo các thông số của 2 object
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        // Nếu xảy ra va chạm
        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
            return false;
        }
        // Ngược lại không va chạm
        else
        {
            return true;
        }
    }
    //offset, outerHeight, outerWidth
});
//khi script đến file này ở giao diện nó sẽ tự biên dịch bên trong. Ở đây hàm này đáng lẽ k chạy 
//nhưng mục đích là $(<function>) thì nó phải biên dịch function để lấy giá trị trả về cho $ của jQuery nên coi 
//là chạy hàm. Lúc đó bên trong có các sự kiện sẽ kích hoạt. K thích ta viết ở ngoài cx đc, chả cần cho function
//vào $ làm gì

//Khi ta nhét vào hàm như v thì các function thực hiện chức năng nó chỉ tồn tại cục bộ trong hàm số và cụ thể là 
//ra ngoài thì các biến số và hàm chỉ còn giữ trong event. Nếu ta bỏ $ function ở ngoài cùng thì người dùng có thể
//hack game bằng console của browser bằng các sửa đổi các tham số global. Dùng như v có ý nghĩa bảo mật đó

//Điều quan trọng khi làm game này cũng như là các game trước ta từng làm đó là vc render liên tục. Ở game C++ ta làm
//thì hình ảnh và mọi thứ được render ra theo từng mili giây do ta tùy chỉnh, về sau các thông số đó ta hiểu là FPS
//của game. Khi ta thao tác phức tạp nhưng render sau số milis quá nhỏ có thể làm lag game
//Cơ chế chung: Đầu tiên là nhét vào 1 vòng while và chỉ exit khi người dùng thoát hoặc ấn exit, trong vòng while đó
//ta bắt sự kiện liên tục(vòng while có thể thực hiện mọi lúc or bắt sau vài chục milis tùy ngôn ngữ) kèm với render
//liên tục ra màn hình. Cả cái game phải code gói trong 1 vòng while như v.
//Game này ez nên k cần vòng while như thế mà chỉ setInterval và if else để xử lý liên tục cái gì thì trigger cái gì
//kèm với sự kiện bắt bên ngoài thoải mái. Vc bắt sự kiện bên ngoài xong xư lý thay đổi var gì đó xong bên trong vòng
//while có thể dùng để xử lý theo sự thay đổi

//Để tạo game này cần phải phác logic ra