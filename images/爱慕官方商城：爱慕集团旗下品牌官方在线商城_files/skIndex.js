/**
 * 首页轮播函数
 */
$.fn.lazyhover = function( fuc_on, de_on, de_out )
{
  var self = $( this ),
      flag = 1,
      h,
      time_on  = de_on  || 0,
      time_out = de_out || 500;
  var handle = function(elm)
      {
        clearTimeout(h);
        if(!flag) self.removeData('timer');
        return flag ? fuc_on.apply(elm) : null;
      },
      timer = function(elm)
      {
        h && clearTimeout(h);
        h = setTimeout(function() { handle(elm);  }, flag ? time_on : time_out);
        self.data('timer', h);
      };
  self.hover(	function(){	flag = 1 ; timer(this);	}, function(){	flag = 0 ;	timer(this);	}	);
}
function HtmlSlidePlayer( config )
{
  var t,
      defaults = { fontsize : 12, right : 10, bottom : 15, time : 5000, autosize : 0, slidearrow : false };
  var app = { n : 0, j : 0, first_show : 1, count : $("#mtsBanner" + " li").length, config : $.extend( defaults, config ) };

  app.factory = function()
      {
        $( "#mtsBanner" ).css( { position : "relative", zIndex : "0", overflow : "hidden", height : $("#mtsBanner" + " ul").height() + "px" } ).prepend( "<div class='slide_control'></div>" );
        $( "#mtsBanner ul" ).css( { position : "relative", zIndex : "0", margin : "0", padding : "0", overflow : "hidden", width : "100%" } );
        $( "#mtsBanner li" ).css( { position:"absolute", top : "0", left : "0", width : "100%", height : "100%" , overflow : "hidden" } )
          .hide()
          .each( function( i ){ $( "#mtsBanner .slide_control" ).append( "<a>" + ( i + 1 ) + "</a>" ); });
        app.resetclass( "#mtsBanner .slide_control a", 0 );
        var img = $( "#mtsBanner li").first().find('img');
        if ( img.length > 0 && !!img.attr('lazyload') )
          $.each( img, function(){ $(this).attr("src",$(this).attr("lazyload")).removeAttr("lazyload"); } );
        app.slide();
        t = setInterval( app.autoplay, app.config.time);
        $( "#mtsBanner .slide_control a").eq(0).triggerHandler( 'mouseover' );
        $( ".slide_control" ).css( { marginLeft : -$( ".slide_control" ).width() / 2 } );
      };
  var prev_button = $( '<em class="slidearrow slidearrow_l"></em>' );
  var next_button = $( '<em class="slidearrow slidearrow_r"></em>' );
  $( "#mtsBanner" ).append( prev_button ).append( next_button );
  next_button.on( 'click', function()
  {
    if( ++app.n >= app.count )
      app.n = 0;
    $( "#mtsBanner" + " .slide_control a" ).eq( app.n ).triggerHandler( 'mouseover' );
  });
  prev_button.on( 'click',function()
  {
    if( app.n == 0 )
      app.n = app.count;
    $( "#mtsBanner" + " .slide_control a" ).eq( --app.n ).triggerHandler( 'mouseover' );
  });


  //图片渐影
  app.slide = function()
  {

    $("#mtsBanner" + " .slide_control a").lazyhover( function()
    {
      app.j = $( this ).text() - 1;
      app.n = app.j;
      if( app.j >= app.count )return;

      //防止闪一下
      if( app.first_show ) 
      {
        app.first_show = 0;
        $("#mtsBanner" + " li:eq(" + app.j + ")").show().siblings("li").hide();
      }
      else
      {
        var li =$("#mtsBanner" + " li:eq(" + app.j + ")");
        var next_li ;
        if ( app.count >= app.j + 1 )
          next_li = $("#mtsBanner" + " li:eq(" + (app.j+1) + ")");


        li.fadeIn("200").siblings("li").fadeOut("200");
        //添加图片延迟加载
        var img=$("img[lazyload]",li);
        $.each(img,function(){ $(this).attr("src",$(this).attr("lazyload")).removeAttr("lazyload");	});
        //背景图延迟加载
        var bg_src = li.attr("lazyload");
        if( bg_src != undefined )
        {
          li.css('background-image','url('+bg_src+')').removeAttr("lazyload");

          if ( next_li != undefined && next_li.length >= 1 )
          {
            var next_bg_src = next_li.attr("lazyload");
            if ( next_bg_src != undefined )
              next_li.css('background-image','url('+next_bg_src+')').removeAttr("lazyload");
          }
        }
      }
      app.resetclass( "#mtsBanner" + " .slide_control a",app.j );
    }, 200, 500 );
  }

  //滑过停止
  $("#mtsBanner").mouseover( function(){ clearInterval(t); } );
  $("#mtsBanner").mouseout(function(){ t = setInterval(app.autoplay,app.config.time) } );
  //自动播放
  app.autoplay = function()
  {
    app.n = app.n >= (app.count - 1) ? 0 : ++app.n;
    $("#mtsBanner" + " .slide_control a").eq(app.n).triggerHandler('mouseover');
  }
  //翻页函数
  app.resetclass =function(obj,i)
  {
    $(obj).removeClass('mall_dot_hover').addClass('mall_dot');
    $(obj).eq(i).addClass('mall_dot_hover');
    if(!window.XMLHttpRequest)
      $('.img_slider_trigger').css("zoom","1");
  }
  app.factory();
}