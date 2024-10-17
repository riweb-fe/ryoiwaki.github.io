'use strict';

$(function(){

  // slide

  var dir = 1; // スクロールの方向

  var click_unlock = true; // direction button 連続押下防止用

  var count = $(".slider li").length; // スライド総数

  var current = 1; // スライド active

  var next = 2; // スライド inactive

  var interval = 8000; // スクロールのインターバル

  var duration = 480; // スクロールのスピード

  var timer; // タイマー用の変数


  for(var i = 1; i <= count; i++) {
    $('.slider li:nth-child(' + i + ')').addClass('slide' + i);
  };


  // マスク（スタート時のみ）

  $("#mainvisual ul").prepend('<div class="mask">'); // マスクの設置

  $(".mask").animate({"width" : "100%"}, duration, function() {

    $(".slider li").css("opacity", 1);
    $("#tool").css("display", "block");

    $(".mask").animate({"left" : "100%"}, duration, function() {
      $(".mask").remove();
    });

  });


  // direction button の処理

  var appear;

  var dir_switch = 1; // 1：表示 、-1：非表示

  $("#tool").addClass("keep"); // 初期表示の状態

  // 4秒程、押下またはホバーしなかった場合の処理（フェードアウト）
  var appear = setTimeout(function(){
    dir_switch = -1;
    $("#tool button").animate({"opacity": 0}, 300);
    $("#tool").removeClass("keep");
  },4800);

  // スマホ・タブレットの場合
  function dir_sp() {

    $("#tool").not('.keep').removeClass(); 
    $("#tool").addClass("sp_tool");

    function keep_rem() {

      if($("#tool").hasClass("keep")) {
        clearTimeout(appear);
        $("#tool").removeClass("keep");
      }

    };

    $("#mainvisual img").on('click', function() {

      keep_rem();

      if(dir_switch !== 1) {
        dir_switch = 1;
        $(".sp_tool button").stop().animate({"opacity": 1}, 300);
        $(".sp_tool button").attr("disabled", false);
      } else {
        dir_switch = -1;
        $(".sp_tool button").stop().animate({"opacity": 0}, 300);
        $(".sp_tool button").attr("disabled", true);
      }

    });

    // next
    $(".next").on("click", function() {

      keep_rem();

      if(click_unlock) {

        click_unlock = false;

        dir = 1;
        clearInterval(timer);
        timer = setInterval(slideTimer, interval);
        slideTimer(); // 処理終了後 true

      } else {

        click_unlock = false;

      }

    });

    // prev
    $(".prev").on("click", function() {

      keep_rem();

      if(click_unlock) {

        click_unlock = false;

        dir = -1;
        clearInterval(timer);
        timer = setInterval(slideTimer, interval);
        slideTimer(); // 処理終了後 true

      } else {

        click_unlock = false;

      }

    });

  };

  // ＰＣの場合
  function dir_pc() {

    $("#tool").not('.keep').removeClass(); 
    $("#tool").addClass("pc_tool");

    $("#mainvisual img, .pc_tool").hover(function() {

      if($("#tool").hasClass("keep")) {
        clearTimeout(appear);
        $("#tool").removeClass("keep");
      }

      dir_switch = 1;
      $(".pc_tool button").stop().animate({"opacity": 1}, 300);

    },function() {

      dir_switch = -1;
      $(".pc_tool button").stop().animate({"opacity": 0}, 300);

    });

    // next
    $(".next").on("click", function() {

      if(click_unlock) {

        click_unlock = false;

        dir = 1;
        clearInterval(timer);
        timer = setInterval(slideTimer, interval);
        slideTimer(); // 処理終了後 true

      } else {

        click_unlock = false;

      }

    });

    // prev
    $(".prev").on("click", function() {

      if(click_unlock) {

        click_unlock = false;

        dir = -1;
        clearInterval(timer);
        timer = setInterval(slideTimer, interval);
        slideTimer(); // 処理終了後 true

      } else {

        click_unlock = false;

      }

    });

  };

  if(window.matchMedia('(max-width: 1023px)').matches) {
    dir_sp();
  } else if(window.matchMedia('(min-width: 1024px)').matches) {
    dir_pc();
  }


  // キャプションの処理

  // match height
  function caption_h() {

    var section_h = 0;

    $(".c_sections section").each(function(){

      if($(this).height() > section_h){
        section_h = $(this).height();
      }

    });

    $("#mainvisual_caption").css("height", section_h);

  };

  caption_h();

  // レスポンシブに応じたテキスト表示
  function re_text() {

    if(window.matchMedia('(max-width: 517px)').matches) {
      $(".daido_retext").text("大同生命 標準保障額シュミレーション お客さま...");
    } else if(window.matchMedia('(min-width: 518px)').matches) {
      $(".daido_retext").text("大同生命 標準保障額シュミレーション お客さま情報 内容確認...");
    }

    if(window.matchMedia('(min-width: 1024px)').matches) {
      $(".daido_retext").text("大同生命 標準保障額シュミレーション お客さま情報 内容確認 | 大同生命");
    }

    if(window.matchMedia('(max-width: 375px)').matches) {
      $(".w_retext").text("リーフレットや雑誌の表紙、ロゴなどこれまでに制作した作品をご紹介して...");
    } else {
      $(".w_retext").text("リーフレットや雑誌の表紙、ロゴなどこれまでに制作した作品をご紹介しております。");
    }

  };

  re_text();

  $(window).on('load resize', function() {
    caption_h();
    re_text();
  });

  // 初期動作
  $(".c_fadeIn").css("position", "absolute");
  $(".c_fadeIn").animate({"opacity": 1, "left" : 0}, duration
);


  // 実行処理
  timer = setInterval(slideTimer, interval);

  function slideTimer() {
 
    if(dir == 1) {

      $(".slider li").removeClass();
      $("#mainvisual").removeClass("rewind");
      $(".slider li:nth-child(" + current + ")").addClass("active");
      $(".slider li:nth-child(" + next + ")").addClass("inactive");


      // キャプションセクション分右へスクロール
 
      $("#mainvisual_caption").removeClass("c_rewind");
      $(".c_fadeIn").animate({"opacity": 0}, duration
, function() {
        $(this).css("left", "-10px");
      });

      $(".c_fadeIn").removeClass("c_fadeIn");

      $(".c_sections section:nth-child(" + next + ")").css("display", "block");

      $(".c_sections section:nth-child(" + current + ")").css("display", "none");

      $(".c_sections section:nth-child(" + next + ")").addClass("c_fadeIn");

      $(".c_fadeIn").animate({"opacity": 1, "left" : 0}, duration
, function() {
        click_unlock = true;
      });

      current = next;
      next = ++next;

      if(next > count) {
        next = 1;
      }


    } else {

      next = current;
      current = --current;
      if(current < 1) {
        current = 3;
      }

      $("#mainvisual").removeClass("rewind");
      $(".slider li").removeClass();
      $("#mainvisual").addClass("rewind");
      $(".slider li:nth-child(" + current + ")").addClass("active");
      $(".slider li:nth-child(" + next + ")").addClass("inactive");


      // キャプションセクション分左へスクロール

      $("#mainvisual_caption").removeClass("c_rewind");
      $("#mainvisual_caption").addClass("c_rewind");
      $(".c_sections section:nth-child(" + current + ")").css("left", "10px");

      $(".c_fadeIn").animate({"opacity": 0}, duration
, function() {
        $(this).css("left", "-10px");
      });

      $(".c_fadeIn").removeClass("c_fadeIn");

      $(".c_sections section:nth-child(" + current + ")").css("display", "block");

      $(".c_sections section:nth-child(" + next + ")").css("display", "none");

      $(".c_sections section:nth-child(" + current + ")").addClass("c_fadeIn");

      $(".c_fadeIn").animate({"opacity": 1, "left" : 0}, duration, function() {
        click_unlock = true;
      });

      dir = 1;

    }

  };


  // aside

  var articles = $("article").length;

  function f_aside() {

    var r_int = $("main").offset().left;

    $("aside").css("right", r_int);

    $(window).scroll(function() {

      if(window.matchMedia('(min-width: 834px)').matches) {

        if($(window).scrollTop() > $("main").offset().top) {
          $("aside").addClass("a_fixed");
        } else {
          $("aside").removeClass("a_fixed");
        }

        if($(window).scrollTop() > $("article:nth-child(" + articles + ")").offset().top) {
          $("aside").fadeOut();
        } else {
          $("aside").fadeIn();
        }

      }

    });

  };

  f_aside();

  $(window).on('load resize', function() {
    f_aside();
  });


  $("aside").animate({"opacity" :  1}, duration);

  $(window).scroll(function(){

    for(var i = 1; i <= articles; i++){

      if($("article:nth-child(" + i + ")").offset().top < $(window).scrollTop() + 250){
        $("aside ul li").removeClass("a_active");
        $("aside ul li:nth-child(" + i + ")").addClass("a_active");
      }

    }

    if(window.matchMedia('(min-height: 1366px)').matches) {

      for(var i = 1; i <= articles; i++){
        if($("article:nth-child(" + i + ")").offset().top < $(window).scrollTop() + 350){
          $("aside ul li").removeClass("a_active");
          $("aside ul li:nth-child(" + i + ")").addClass("a_active");
        }

      }

    }

  });


  // global_navigation

  var nav_position; // スクロールトップにあわせる

  function nav_top() {

    $("body, html").css("overflow", "hidden");

    $(".g-nav").fadeIn(function() {
      $("#nav_button").addClass("close_btn");
      $(this).css("background-color", "rgba(55, 55, 55, .6)");
      $(this).children("nav").css("right", 0);
    })

    nav_position = $(window).scrollTop();
    $('body').addClass('fixed').css({'top': -nav_position});

  };

  $("#nav_button").on('click', function() {

    if(!$(this).hasClass("close_btn")) {

      if($(window).scrollTop() > 0) {

        $('body,html').animate({scrollTop: 0}, 300, 'swing', function() {
          nav_top();
        });

        $(".g-nav li a").on('click', function() {
          $("#nav_button").removeClass("close_btn");
          $(".g-nav").css("background-color", "transparent");
          $(".g-nav").children("nav").css("right", "-25%");
          $(".g-nav").hide();
          $("body, html").css("overflow", "");
          $('body').removeClass('fixed').css({'top': 0});
          window.scrollTo( 0 , nav_position);
        });

      } else {

        nav_top();

        $(".g-nav li a").on('click', function() {
          $("#nav_button").removeClass("close_btn");
          $(".g-nav").css("background-color", "transparent");
          $(".g-nav").children("nav").css("right", "-25%");
          $(".g-nav").hide();
          $("body, html").css("overflow", "");
          $('body').removeClass('fixed').css({'top': 0});
          window.scrollTo( 0 , nav_position);
        });

      }

    } else {

      $(this).removeClass("close_btn");
      $(".g-nav").css("background-color", "transparent");
      $(".g-nav").children("nav").css("right", "-25%");
      $(".g-nav").fadeOut();
      $("body, html").css("overflow", "");
      $('body').removeClass('fixed').css({'top': 0});
      window.scrollTo( 0 , nav_position);

    }

  });


  // Smooth

  $('a[href^="#"]').on('click', function() {
    var speed = 600;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $('html,body').animate({scrollTop:position}, speed, 'swing');
    return false;
  });


  // Toggle

  var w_switch = 1;

  $(".w_button").on('click', function() {

    $(".w_more").slideToggle();

    w_switch *= -1;

    if(w_switch == -1) {
      $(this).text("close");
    } else {
      $(this).text("more");
    }

  });

  var g_switch = 1;

  $(".g_button").on('click', function() {

    $(".g_more").slideToggle();

    g_switch *= -1;

    if(g_switch == -1) {
      $(this).text("close");
    } else {
      $(this).text("more");
    }

  });


  // Zoom (Graphic Leaflet)

  var m_position;

  $(".zoom").on('click', function() {

    $("body").addClass("visibility-hidden");

    $("body").append('<div class="modal_bg"></div><div class="modal"><article><div class="m_top"><h5 class="m_border">Graphic design</h5><button class="m_close">close</button></div><div class="l_main"><section class="l_detail"><h6>Leaflet</h6><p>A4 Size（ 297mm × 210mm ）<br>total： 6 page</p></section><div class="leaflet"><div class="out_side"><img src="images/fashio_out.jpg" alt="リーフレット外面" width="842" height="595"><span>Out Side（Ｗ：97mm / 100mm / 100mm ）</span></div><div class="in_side"><img src="images/fashio_in.jpg" alt="パンフレット内面" width="842" height="595"><span>In Side（Ｗ：100mm / 100mm / 97mm ）</span></div></div></div></article></div>');

    $(".modal_bg").hide();
    $(".modal").hide();

    $(".modal_bg").css("top", $(window).scrollTop() - 3 + "px");

    $(".modal").css("top", $(window).scrollTop() - 3 + "px");
 
    m_position = $(window).scrollTop();

    $('body').addClass('m_fixed').css({'top': -m_position});

    $(".modal_bg").fadeIn(300);
    $(".modal").fadeIn(300);

    $(".m_top button").on('click', function() {

      $('body').removeClass('visibility-hidden').removeClass('m_fixed').css({'top': 0});

      window.scrollTo( 0 , m_position);

      $(".modal").fadeOut(300, function() {
        $(".modal").remove();
      });

      $(".modal_bg").fadeOut(300, function() {
        $(".modal_bg").remove();
      });

    });

  });

});