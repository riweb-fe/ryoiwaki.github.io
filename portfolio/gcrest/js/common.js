'use strict';

/* スムーススクロール */

$(function(){
    $('a[href^="#"]').click(function() {
        var speed = 400;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $('body,html').animate({scrollTop:position}, speed, 'swing');
        return false;
    });
});


/* News Slide */

new Vue({
    el: "#app",
    components: {
        Hooper: window.Hooper.Hooper,
        Slide: window.Hooper.Slide,
        /* 左右スライド移動ボタン */
        HooperNavigation: window.Hooper.Navigation,
        /* 中央スライド選択ボタン
         HooperPagination: window.Hooper.Pagination, */
        /* スライド進行：線グラフ
        HooperProgress: window.Hooper.Progress, */
    }
  });