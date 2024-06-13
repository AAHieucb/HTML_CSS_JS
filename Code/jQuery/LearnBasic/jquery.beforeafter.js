(function ($) {
    $.fn.extend({
        //plugin name - qbeforeafter. Tuân theo cấu trúc này để tạo ra 1 plugin. Các option phải truyền vào khi gọi
        //plugin để tham số cho plugin. Truyền vào extend 1 object, key là 1 function trả ra giá trị là sẽ xử lý từ
        //plugin khi sử dụng. Khi dùng gọi vào hàm key đó là sử dụng với thẻ nào đó, chính là có chữ this
        qbeforeafter: function (options) {
            var defaults = {
                defaultgap: 0,
                leftgap: 0,
                rightgap: 2,
                caption: false,
                reveal: 0.5,
            };

            var options = $.extend(defaults, options);//lấy các options truyền vào 

            return this.each(function () {
                var o = options;
                var i = $(this);
                var img_mask = i.children("img:eq(0)").attr("src");
                var img_bg = i.children("img:eq(1)").attr("src");
                var img_cap_one = i.children("img:eq(0)").attr("alt");

                var width = i.children("img:eq(0)").width();
                var height = i.children("img:eq(0)").height();

                i.children("img").hide();

                i.css({
                    overflow: "hidden",
                    position: "relative"
                });
                i.append('<div class="ba-mask"></div>');
                i.append('<div class="ba-bg"></div>');
                i.append('<div class="ba-caption">' + img_cap_one + "</div>");

                i.children(".ba-mask, .ba-bg").width(width);
                i.children(".ba-mask, .ba-bg").height(height);
                i.children(".ba-mask").animate({
                    width: width - o.defaultgap
                }, 1000);

                i.children(".ba-mask").css("backgroundImage", "url(" + img_mask + ")");
                i.children(".ba-bg").css("backgroundImage", "url(" + img_bg + ")");

                if (o.caption) i.children(".ba-caption").show();
            }).mousemove(function (e) {
                var o = options;
                var i = $(this);

                pos_img = i.offset()["left"];
                pos_mouse = e.pageX;
                new_width = pos_mouse - pos_img;
                img_width = i.width();
                img_cap_one = i.children("img:eq(0)").attr("alt");
                img_cap_two = i.children("img:eq(1)").attr("alt");
                //attr là thuộc tính chứ kp key của css

                if (new_width > o.leftgap && new_width < img_width - o.rightgap) {
                    i.children(".ba-mask").width(new_width);
                }

                if (new_width < img_width * o.reveal) {
                    i.children(".ba-caption").html(img_cap_two);
                } else {
                    i.children(".ba-caption").html(img_cap_one);
                }
            });
        },
    });
})(jQuery);