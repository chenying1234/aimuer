/**
 * 2014-07
 * 因为新旧版本共存问题，原public.js中的函数不能直接修改，只能在这里重新定义并覆盖掉，因此头部js的加载顺序public.js在前，2014public.js在后。旧版头部没有此js。
 * 函数的调用写入相应的模板文件中，公共的调用写入头部，不要在这里调用。原public.js中存在过多的函数调用
 */



/**
 *  更新购物车
 *  覆盖掉public.js里面的updShopCartMessage方法，因为新版的页面布局不一样，不能直接修改原来的函数
 */
function updShopCartMessage( type, id, product_id )   
{
  var $num = $( "#cart_goods_number" ),//头部购物车商品数量显示
      $num1 = $( "#fscgoodscount" ), //侧边栏购物车商品数量
      $div = $( ".amNavCarMUl" ),//头部购物车商品详情显示栏。 有两个
      buyItNow = function()
      {
        if( "immediate" == type )
          return $.post( "/shopcart/partaccount", { productarr: ["product:" + product_id], type: "immediate" },
        function( ret )
        {
          if( "ok" == ret.status )
          {
            window.location.href = "http://www.aimer.com.cn/" + ret.data.page;
          }
        }, "json" );
        return false;
      };
  return $.Deferred( function( dtd )
  {
    if( $num.length == 0 )
      dtd.reject( false );
    else
      $.when( buyItNow() )
        .then( function( ret )
        {
          //如果直接购买后调用了updShopCartMessage函数，添加商品后跳转，后面的两个then仍然会执行，但不影响if分支，所以不再处理
          if( "ok" == ret.status )
            return location.href = ret.data.page;
          return $.getJSON( "/shopcart/items?gettype=2&" + Math.random() );
        })
        //更新购物车
        .then( function( ret )
        {
          var sum_number = 0,
              html = "<p>您的购物车还是空的哦,快去选购吧</p>";
          if( "ok" == ret.status )
          {
            $( ret.data ).map( function( k, v ){ sum_number += parseInt( v.number ); } );
            $num.text( sum_number );
            $num1.text( sum_number );
            if( sum_number > 0 )
            {
              html = $( ret.data.slice( 0, 6 ) ).map( function( key, item )
              {
                var url = item.type != "suit" ? "/goods/" + item.goods_id : "/suit/" + item.id;
                var str = "<li><div class='amNavCarMImg02'><a href='" + url + "' target='_blank'><img src='" + item.mini_img + "' /></a></div><div class='amNavCarMName amNavCarTW padTop4'><a class='amNavMMz amNavCarTW' href='" + url + "' target='_blank'>" + item.name + "</a>";
                if( item.type == "suit" )
                {
                  str += "<p>(套装)</p>";
                }
                else if( item.type == "package" )
                {
                  str += "<p>(礼包)</p>";
                }
                else
                {
                  str += "<p class='amNavMMz amNavCarTW gray'>颜色：" + item.colortext + " 尺码：" + item.sizetext + "</p>";
                }
                str += "</div><div class='amNavMCz padTop4'><div class='black'>¥" + item.price + "</div><a onclick=\"shopCartDelete('" + item.uk + "')\">删除</a></div></li>";
                return str;
              }).get().join( "" );
              $div.next().show();
            }
            else
             $div.next().hide();
            $div.html( html );
            $( $div.get( 0 ) ).find( ".amNavCarTW" ).removeClass( "amNavCarTW" );//头部有两个购物车栏，去掉第一个中多余的样式
          }
          dtd.resolve( true );
        })
        //添加购物车后的效果
        .then( function()
        {
          if( "1" == type )
          {
            //使用的是fly效果，需要回复最初状态
            $( "#" + id ).show().next().hide();
            flyanimote.start = "flystart";
            flyanimote.end = "suspendobj";
            flyanimote.fobj = "flyobj";
            flyanimote.number = $( "#goodCount" ).val();
            flyanimote.init();
          }
        })
  })
}



/**
 * 包装public.js中的ShowMessage.Msg 返回Deferred对象
 */

ShowMessage.MyMsg = function(){
  var app = {};
  app.alert = function( msg, title, width, height )
  {
    return $.Deferred( function( dtd )
    {
      ShowMessage.Msg.alert( msg, function(){ dtd.reject( false ) }, width, height, title );
    })
  }
  app.msg = function( msg, title, width, height )
  {
    return $.Deferred( function( dtd )
    {
      ShowMessage.Msg.alert( msg, function(){ dtd.resolve( true ) }, width, height, title );
    })
  }
  app.confirm = function( msg, title, width, height )
  {
    return $.Deferred( function( dtd )
    {
      ShowMessage.Msg.confirm( msg, function(){ dtd.resolve( true ) }, width, height, title);
    })
  }
  app.deletetips = function( msg, position )
  {
    return $.Deferred( function( dtd )
    {
      ShowMessage.Msg.deletetips( msg, function(){ dtd.resolve( true ) }, position );
    })
  }
  return app;
}()


/**
 * 更新用户状态
 * 覆盖掉public.js中的statusUpdate函数
 * 原来的函数会申城侧边悬浮框，这里去掉了
 * 原函数中时间转问候语在getGreetings函数中
 */
function statusUpdate()
{
  return $.Deferred( function( dtd )
  {
    $.when( $.post( "/webservice/passport/status", "", "", "json") )
      .then( function( ret )
      {
        if( "ok" == ret.status )
        {
          //对public中的全局变量CURRENT_USER，out_user_id进行赋值
          CURRENT_USER = ret.data;
          out_user_id = CURRENT_USER.out_user_id;
          var name = CURRENT_USER.nickname = ret.data.nickname.replace( /^(\d{3}|.+)(\d+|.{3})(\d{4}|@.+)$/, "$1****$3" );
          $( ".amNavTopLogin" ).html( "<li>" + getGreetings() + ",<a href='/account/'>" + name + "</a>   <a href='/passport/logout'>退出</a></li>" );
          dtd.resolve( true );
        }
        else
          dtd.reject( false );
      } );
  });
}

/**
 * 根据时间转换问候语
 */
function getGreetings()
{
  var hours = ( new Date() ).getHours()
  if( hours >= 0 && hours < 5 )
    return "夜深了,注意休息";
  else if( hours >= 5 && hours < 8 )
    return "早上好";
  else if( hours >= 8 && hours < 11 )
    return "上午好";
  else if( hours >= 11 && hours < 14 )
    return "中午好";
  else if( hours >= 14 && hours < 19 )
    return "下午好";
  else
    return "晚上好";
}

/**
 * 插入侧边悬浮框
 * @param flag  用户是否登陆
 */
function getSlideNav( flag )
{
  var str = flag ? '<a href="/shopcart" class="pBloclIcon pBCar" id="suspendobj"><em class="pBCarem" id="fscgoodscount">0</em></a>'
          : '<a href="javascript:newLogin()" class="pBloclIcon pBCar02" id="suspendobj"><em class="pBCarem" id="fscgoodscount">0</em></a>';
  return $.Deferred( function( dtd )
  {
    $( "#floatshopcart" ).html(
    '<div style="width:86px; overflow:hidden"><img src="http://img.aimer.com.cn/theme/2012spring/images/login_new/pc_app.jpg?{%$IMAGE_VERSION%}"></div><a id="nalkerbtn" title="在线客服" onclick="javascript:NTKF.im_openInPageChat( \'kf_9993_1359006694030\' );" href="javascript:void(0)" class="pBloclIcon pBKef"></a>'
    + str + '<a href="javascript:window.scrollTo( 0, 0 );" class="pBloclIcon pBDb"></a><div class="pBloclNumer" id="showAddNum">+1</div>'
    );
    dtd.resolve( true );
  })
}

/**
 * 监听ajax请求，开始的时候加遮罩层，完成后去掉
 */
//$(function()
//{
//  var $div = $( '<div style="display:none;left:0;top:0;position:fixed;width:100%;height:100%;z-index:20001;"><div style="position:absolute; width:100%; height:100%; z-index:20002;background-color:#000; filter:alpha(Opacity=10);-moz-opacity:0.1;opacity: 0.1; "></div><p style="position: absolute; left:48%; top:48%; color:#000; z-index:20005;"></p><div>' ).appendTo( 'html' );
//  $( this ).ajaxStart(function(){ $div.show(); } );
//  $( this ).ajaxComplete(function(){ $div.hide(); } );
//})

/** 判断专题 右边浮动id 是否存在 如果存在 默认的隐藏  **/
$(function(){
    if($("#ztRight").length > 0 ){
        $(".publicBlock").hide();
    }
})