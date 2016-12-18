//商品规格的全局变量
var global_spec_arr = new Object();//global_spec_arr[goods_id]{ specs, spec_vlaues, products }

/*
* 加载颜色尺码显示区域
* @param goods_id 商品的id
* @param type 传入的类型,包括goods单品、suit套装 等等
*/
function goods_spec_form( goods_id ,type )
{
  $.get( "/goods/" + goods_id + "/goodsspecs", function( ret )
  {
    if( ret.status == "ok" )
    {
      isfly = ret.data.is_fly;
      if( ( ret.data.special_flag == '1' || ret.data.price != ret.data.old_price || ret.data.price != ret.data.mkt_price ) && type != 'suit' )
      {
        $("#original_price").html( "<span class='showtextdl03'>原价：</span><span><del>￥"+ret.data.mkt_price+"</del></span>" );
        $("#original_price").show();
      }
      //商品促销、特价、新品
      var imgUrl = "";
      if( ( ( ret.data.special_flag == '1' ) || ( ret.data.special_flag == '' ) ) && ( ret.data.mkt_price != ret.data.price ) )
      {
        imgUrl = '<img border="0" src="http://img.aimer.com.cn/theme/2012spring/images/tejia.gif" style="margin-left:20px; padding-top:2px;" />';
      }
      else if( ret.data.mkt_price != ret.data.price )
      {
        imgUrl = '<img border="0" src="http://img.aimer.com.cn/theme/2012spring/images/cuxiao.gif" style="margin-left:20px;padding-top:2px;" />';
      }
      else if( ( ret.data.new_goods <= '40' )&&( ret.data.special_flag != '1' ) )
      {
        imgUrl = '<img border="0" src="http://img.aimer.com.cn/theme/2012spring/images/new.jpg" style="margin-left:20px; padding-top:2px;" />';
      }
      if( "goods" == type )
      { 
        $( "#postPrice" ).html( "￥<em>" + ret.data.price + "</em>");
        $( "#postPrice" ).siblings( "img" ).remove();
        $( "#postPrice" ).after( imgUrl );
      }
      else if( "suit" == type )
      {
        $( "#postPrice" + goods_id ).children( "img" ).remove();
        $( "#postPrice" + goods_id ).append( imgUrl );
      }
      if( ret.data.price != ret.data.mkt_price )
      {
        $("#postPrice").siblings().after( "<span class='pageBoxRaw'>原价：¥<del>" + ret.data.mkt_price + "</del></span>" );
      }
      //商品下架、售完时提示
      if( !ret.data.enabled )
      {
        if( "goods" == type )
        {
          $("#color_title_"+type+goods_id).parent().hide();
          $( ".pageConSizeUl" ).html("商品已下架").css({
            "color": "red", 
            "font-size": "14px"
          });
        }
        else if( "suit" == type )
        {
          $( "#pageSuitInfCon" + goods_id + " li:gt(1)" ).remove();
          $( "#pageSuitInfCon" + goods_id ).append( '<li><div class="showsingtext">商品已下架</div></li>' );
          $( "#suitInfCon" + goods_id + " li:gt(1)" ).remove();
          $( "#suitInfCon" + goods_id ).append( '<li><div class="showsingtext">商品已下架</div></li>' );
        }
        $( ".winxintishi" ).hide();
        $("#size_title_"+type+goods_id).parent().hide();
        $("#goods_stock_area_"+type+goods_id).hide();
        return ;
      }
      else if( !ret.data.total_count )
      {
        $("#color_title_"+type+goods_id).parent().hide();
        switch( pagetype )
        {
          case "suit":
            $( "#suitInfCon" + goods_id + " li:gt(1)" ).remove();
            $( "#suitInfCon" + goods_id ).append( '<li style="color:red;font-size:14px;margin-top: 40px;">该产品已售完</li>' );
            $( ".pageHSNume" ).remove();
            $( ".pageHintButs" ).remove();
            break;
          case "goods":
            if( v_goods_id == goods_id )
            {
              if( miaosha_promotion )
              {
                $( ".pageConSizeUl" ).html( '<div class="showtextbutton"><img src="http://img.aimer.com.cn/theme/2012spring/images/2015front/ms/ms_r5_c7.jpg" /></div>');
              }
              else
              {
                $( ".pageConSizeUl" ).html( '<a class="pageHintSCSP" href="javascript:void(0)" onclick="collect('+ goods_id +');">收藏此商品</a><span class="pageHintYSC"></span><div class="clear"></div><div class="showtextbutton"><span class="showsingtext">该产品已售完</span></div>').css({
                  "color": "red", 
                  "font-size": "14px"
                });
              }
            }
            if( suit_id )
            {
              $( "#pageSuitInfCon" + goods_id + " li:gt(2)" ).remove();
              $( "#pageSuitInfCon" + goods_id ).append( '<li style="color:red;font-size:14px;margin-top: 40px;">该产品已售完</li>' );
              $( "#suitflystart" ).hide();
              $( ".singlesuitright" ).hide();
            }
            $( ".winxintishi" ).hide();
            break;
          default:
            break;
        }
        $("#size_title_"+type+goods_id).parent().hide();
        $("#goods_stock_area_"+type+goods_id).hide();
        return ;
      }

      var specs_data = ret.data;
      var has_color = false;
      var has_size = false;
      $.each(specs_data.spec_values,function( i,obj )
      {
        if( obj.spec_id == 1)
          has_color = true;
        else
          has_size = true;
      });
      global_spec_arr[ goods_id ] = {
        specs : specs_data.specs,
        spec_values : specs_data.spec_values, //所选择商品的颜色尺寸规格
        products :  specs_data.products, //商品每一种颜色尺寸组合所对应的product
        has_color: has_color,
        has_size: has_size,
        products_ids: [],
        goods_tool_tips_type:ret.data.goods_type
      };
      if( has_color && has_size )
      {
        //有颜色有尺码, sort_color_arr是按照颜色下面有库存的尺寸数量大小排序的
        var sort_color_arr = specs_data.color_spec_arr;
        $( "#goods_color_area_"+type+goods_id ).html( "" );
        for( var ind in sort_color_arr )
        {
          $.each(specs_data.spec_values,function( key, obj )
          {
            var sel_flag = false;
            //spec_id = 1代表遍历规格对象是颜色,首先将商品的所有颜色显示出来，再将当前选中颜色相对应的尺码塞到结构中
            if( ( obj.spec_id == 1 ) && ( sort_color_arr[ind]['id']==obj.id ) )
            {
              var color_area_html = $( '<a  id="goods_color_'+type+goods_id+'_'+obj.id+'" image_ids="'+obj.image_ids+'" image_file="" spec_id= "'+obj.id+'"  href="javascript:selectColor('+obj.id+','+goods_id+',\''+type+'\','+true+');" onfocus="this.blur();"><img title="'+obj.new_alias+'('+obj.new_spec_value+')" alt="'+obj.new_alias+'('+obj.new_spec_value+')" src="http://img.aimer.com.cn/'+obj.new_file_path+'" /></a>' );
              $( "#goods_color_area_"+type+goods_id ).append( color_area_html );
              sel_flag = true;
            }
            if( sel_flag == true )
              return false;
          });
       }
        //颜色尺码显示区域初始化，显示第一个颜色下面的尺码
        $( "#goods_color_area_"+type+goods_id ).find("a").eq(0).append( '<em class="pageCUlDdGou"></em>' );
        var first_choose = $( "#goods_color_area_"+type+goods_id ).find("a").eq(0);
        first_choose.addClass( "swtxclick" );
        $( "#color_title_"+type+goods_id ).text( first_choose.find( "img" ).attr( "alt" ) );
        selectColor( first_choose.attr("spec_id"), goods_id, type ,false);
      }
      else if( has_color )
      { //只有颜色
        $( "#goods_color_area_"+type+goods_id ).html( "" );
        $.each(  specs_data.products ,function( key,obj)
        {
          var spec_value_id = obj._spec_value_ids[1];
          for( var index in specs_data.spec_values )
          {
            var spec_value = specs_data.spec_values[index];
            if( spec_value_id == spec_value.id && obj.count> 0 )
            {
              var color_area_html = $( '<a  id="goods_color_'+type+goods_id+'_'+spec_value.id+'" product_id= "'+obj.id+'"  href="javascript:selectColor('+spec_value.id+','+goods_id+',\''+type+'\');" onfocus="this.blur();"><img title="'+spec_value.new_alias+'('+spec_value.new_spec_value+')" alt="'+spec_value.new_alias+'('+spec_value.new_spec_value+')" src="http://img.aimer.com.cn/'+spec_value.new_file_path+'" /></a>' );
              $("#goods_color_area_"+type+goods_id).append( color_area_html );
              break;
            }
          }
        });
        var first_choose = $("#goods_color_area_"+type+goods_id).find("a").eq(0);
        first_choose.addClass("swtxclick");
        $("#color_title_"+type+goods_id).text(first_choose.find("img").attr("alt"));
        $( "#goods_stock_area_" + type + goods_id ).parent().remove();
      }
      else if( has_size )
      {
        //只有尺码
        //颜色区域隐藏
        $( "#goods_color_area_" + type + goods_id ).parent().hide();
        var size_area = $( "#goods_stock_area_"+type+goods_id );
        size_area.html( "" );
        var color_area_html;
        $.each( specs_data.spec_values, function( key,spec_value )
        {
          var spec_id = spec_value.spec_id;
          for ( var index in specs_data.products )
          {
            var product = specs_data.products[index];
            if( product._spec_value_ids[spec_id] == key )
            {
              if( product.count == 0 )
              {
                global_spec_arr[ goods_id ].products_ids.push( "goods_size1_" + type + goods_id + "_" + spec_value.id );
                color_area_html =  $( '<a  product_id="'+product.id+'" class="showtextsizeno" id="goods_size1_'+type+goods_id+'_'+spec_value.id+'" ><del>'+spec_value.new_alias+'</del></a>' );
              }
              else
              {
                global_spec_arr[ goods_id ].products_ids.push( "goods_size_" + type + goods_id + "_" + spec_value.id );
                color_area_html =  $( '<a  product_id="'+product.id+'" onclick="selectSize('+spec_value.id+','+goods_id+',\''+type+'\');showskustock(\''+type+'\','+product.id+');" id="goods_size_'+type+goods_id+'_'+spec_value.id+'" >'+spec_value.new_alias+'</a>' );
              }
              size_area.append( color_area_html );
              break;
            }
          }
        });
      goodsSizeTips( global_spec_arr[ goods_id ] );
      }
    }
    else
    {
      alert( ret.data );
    }
  }, "json" );  
 }
/*
 * 改变颜色时获取到该颜色下面所对应的尺码
 * @param selected_spec_value_id 所选择颜色id
 * @param goods_id 商品id
 * @param type 类型
 * @flag 标志
 */
function selectColor( selected_spec_value_id, goods_id, type ,flag)
{
  var select_spec_arr = global_spec_arr[ goods_id ];
  var select_color = $( "#goods_color_"+type+goods_id+"_"+selected_spec_value_id );
  var size_area = $( "#goods_stock_area_"+type+goods_id );
  var image_ids = select_color.attr("image_ids");
  global_spec_arr[ goods_id ].products_ids = [];
  $( ".showskustock").text( '' );
  $( "#goods_stock_area_"+type+goods_id ).parent().removeClass( "pageCSizeUlClick" );
  $( ".pageHintSize" ).hide();
  //2014.11.28
  if( flag == true )
  {
    if( image_ids != "" )
    {
      var split_image_ids = image_ids.split(",");
      var image_id = split_image_ids[0];
      if( is_fangdajing )
        $("img[rela_image_id='"+image_id+"']").parent("a").click();
      else
        $("img[rela_image_id='"+image_id+"']").parent("a").parent("li").mouseover();
    }
  }
  
  //之前代码
//  //页面初始化的时候，不执行，主要是防止页面初始默认图片与初始选择颜色不一致的问题
//  //图片不全，暂时注销
//  if( flag == true )
//  {
//    //图片关联id不为空，选择颜色与图片相关联
//    if( image_ids != "" )
//    {
//      //如果是初次点击，发送请求，获取到对应的图片路径
//      if( select_color.attr("image_file") == "" )
//      {
//        $.post("/goods/"+image_ids+"/colorrelatedimage",function( ret )
//        {
//          if( ret.status == "ok")
//          {
//            var file_path =  ret.data.path;
//            select_color.attr("image_file",file_path);//将图片路径存在image_file属性中
//            $( "#goods_big_img" ).attr("src",file_path);
//          }
//          else
//            alert(ret.data);
//        },"json");
//      }
//      else
//      {//不是初次点击，直接去img_file中获取路径
//        var file_path =  select_color.attr("image_file");
//        $("#goods_big_img").attr("src",file_path);
//      }
//    }
//  }

  size_area.empty();
  $("#size_title_"+type+goods_id).text("未选择").css("color","#636363");
  //去掉边框和打钩
  select_color.addClass( "swtxclick" );
  $( select_color ).append( '<em class="pageCUlDdGou"></em>' );
  $.each( $( select_color ).siblings(), function( key, obj )
  {
    $( obj ).removeClass( "swtxclick" );
    $( obj ).find( "em" ).remove();
  });
//  $("#color_title_"+type+goods_id).text(select_color.find("img").attr("alt"));
//  $("#color_title_"+type+goods_id).css("color","#D40C19");
  var products = select_spec_arr.products;
  var spec_values = select_spec_arr.spec_values;
  if( select_spec_arr.has_color && select_spec_arr.has_size )
  {
    $.each( spec_values, function( key, spec_value)
    { 
      var spec_id = spec_value.spec_id;
      if( spec_id == 1 )
        return;
      for( var index in products )
      {
        var product = products[index];
        var _spec_value = product._spec_value_ids;
        //向选中的颜色里面塞入对应的尺码
        if( _spec_value[1] == selected_spec_value_id && _spec_value[spec_id] == key ){
           var color_area_html;
           //没有库存
           if( product.count == 0 )
           {
             global_spec_arr[ goods_id ].products_ids.push( "goods_size1_" + type + goods_id + "_" + spec_value.id );
             color_area_html =  $( '<a class="pageCUlNo" product_id="'+product.id+'" class="showtextsizeno" id="goods_size1_'+type+goods_id+'_'+spec_value.id+'" >'+spec_value.new_alias+'</a>' );
           }
           else
           {
             global_spec_arr[ goods_id ].products_ids.push( "goods_size_" + type + goods_id + "_" + spec_value.id );
             color_area_html =  $( '<a  product_id="'+product.id+'" onclick="selectSize('+spec_value.id+','+goods_id+',\''+type+'\');showskustock(\''+type+'\','+product.id+');" id="goods_size_'+type+goods_id+'_'+spec_value.id+'" >'+spec_value.new_alias+'</a>' );
           }
           size_area.append(color_area_html);
           break;
        }
      }
    });
    goodsSizeTips( global_spec_arr[ goods_id ] );
  }  
}
/*
 *选择尺码
*/
function selectSize( spec_value_id, goods_id, type )
{
  var selector = $( "#goods_size_"+type+goods_id+"_"+spec_value_id );
  $( "#goods_size_"+type+goods_id+"_"+spec_value_id ).append( '<em class="pageCUlDdGou"></em>' );
  selector.addClass( "pageCUlSelected" );
  $.each( selector.addClass( "pageCUlSelected" ).siblings(), function( key, obj )
  {
    $( obj ).removeClass( "pageCUlSelected" );
    $( obj ).find( "em" ).remove();
  });
  $( "#goods_stock_area_" + type + goods_id ).parent().removeClass( "pageCSizeUlClick" );
  $( ".pageHintSize" ).hide();
  if( "suit" == type )
  {
    $( "#size_title_" + type + goods_id ).text( selector.attr( "title" ) ).css( "color", "#D40C19" );
    $( "#goods_stock_area_" + type + goods_id ).parent().parent().removeClass( "pageSuitSizeClick" );
  }
}
/*
 * 单品添加，返回选中的颜色尺码对应的product
 */
function getSelectProduct( goods_id, type )
{
  var goods_spec_arr = global_spec_arr[ goods_id ];
  var products = goods_spec_arr.products;
  var select_product;
  if( goods_spec_arr.has_color && goods_spec_arr.has_size)
  {//对于有颜色有尺码情况取product
    var size_area = $("#goods_stock_area_"+type+goods_id+" a");
    if( ! size_area.hasClass( "pageCUlSelected" ) )
    {  //如果没有选择颜色，给提示
      $( size_area ).parent().parent().addClass( "pageCSizeUlClick" );
      $( ".pageHintSize" ).show();
    }
    else
    {
      //选中的product ID值
      select_product = $( "#goods_stock_area_"+type+goods_id+" .pageCUlSelected" ).attr( "product_id" );
    }
  }
  else if( goods_spec_arr.has_color)
  {//对于只有颜色情况取product
    select_product = $( "#goods_color_area_"+type+goods_id+" .swtxclick" ).attr("product_id");
  }
  else if( goods_spec_arr.has_size)
  {//对于只有尺码 情况取product
    select_product = $( "#goods_stock_area_"+type+goods_id+" .showtextsizesele" ).attr("product_id");
  }
  
  for( var key in products )
  {
    var product = products[key];
    if( product.id == select_product )
      return product;
  }
}

/*
 * 套装添加，返回套装中所添加的product
 */
function getSuitSelectProduct()
{
  var products = new Array();
  for( var key in global_spec_arr )
  {
    var product = getSelectProduct( key, 'suit' );
    if( !product )
    {
      $( "#goods_stock_area_suit" + key ).parent().parent().addClass( "pageSuitSizeClick" );
      return false;
    }
    products.push( product );
  }
  return products;
}

$(function()
{
  if(  document.getElementById("trigger13") !=null )
  {
    if(document.all)    
    {
      //IE里面触发
      document.getElementById("trigger13").click();    
    }         
    else  
    {
      //firefox 里面触发
      var event = document.createEvent( "MouseEvents" );  
      event .initEvent( "click", true, true );  
      document.getElementById( "trigger13" ).dispatchEvent(event );  
    }
  }
});

//立即购买
function buyItNow( goods_id )
{
  if ( !CURRENT_USER ) 
  {
    operatorLogin();
    return false;
  }
  $( ".pageLJGM" ).hide().next().show();
  var product = getSelectProduct( goods_id, "goods" );
  if( !product )
  {
    $( ".pageLJGM" ).show().next().hide();
    return false;
  }
  
  shopCartAddProduct( product.id, $( "#goodCount" ).val(), "immediate", "pageLJGM" );
}