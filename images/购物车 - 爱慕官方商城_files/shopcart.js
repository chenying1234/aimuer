function shopCartLoad()
{
  $.get("/shopcart/items?"+Math.random(), function(ret)
  {
    if ( ret.status == "ok" ) 
    {
      $("#shopcartAfterLoad").html( ret.data );
    }
  },"json");
  updShopCartMessage();
}

function shopCartDelete( uk )
{
  ShowMessage.Msg.confirm("确定要删除吗？",function()
  {
    $.get("/shopcart/delete?id="+uk+"&"+Math.random(), function(ret)
    {
      if ( ret.status == "ok" ) 
      {
        shopCartLoad();
      }
    },"json")
  });
  updShopCartMessage();
}

function CartDelete( uk ,position)
{
  ShowMessage.Msg.deletetips('您确定要删除此商品吗？',function()
  {
    $.get("/shopcart/delete?id="+uk+"&"+Math.random(), function(ret)
    {
      if ( ret.status == "ok" )
      {
        shopCartLoad();
      }
    },"json")
  },position);
  updShopCartMessage();
}

function shopCartUpdate(type,item_key,number,upd_type)
{
  if( upd_type != 'text' ){
    var sum = $("input[item_key='"+item_key+"']").val();
    sum = parseInt(sum) + parseInt(number);
  }else{
    sum = number;
  }
  
  var url = ""
  switch( type ){
    case 'product':
      url = "/shopcart/updateproduct?uk="+item_key+"&number="+sum+"&"+Math.random()
      break;
    case 'suit':
      url = "/shopcart/updatesuit?uk="+item_key+"&number="+sum+"&"+Math.random()
      break;
    case 'package' : 
      url = "/shopcart/updatepackage?uk="+item_key+"&number="+sum+"&"+Math.random()
      break;
  }
  
  var errmsg = null
  $.ajax({
    url: url,
    async: false,
    dataType: 'json',
    success: function( ret ){
      if ( ret.status == "ok" ) {
        shopCartLoad();
      } else {
        errmsg = ret.data
      }
    }
  });
  
  if ( errmsg )
  {
    ShowMessage.Msg.alert( errmsg )
    return errmsg
  }
  
  updShopCartMessage();
  
  return true;
}

function shopCartUpdateInput(type,id,input_obj){
  var number = $( input_obj ).val();
  var ret = /^[1-9]+$/;
  var item_number = $( input_obj ).attr( "item_number" );
  if( !ret.test( number ) )
  {
    ShowMessage.Msg.alert('请输入数字');
    if( item_number )
    {
      $(input_obj).val( item_number );
    }
    return;
  }
  if ( number == 0 ) {
    ShowMessage.Msg.alert('数量不得小于1');
    $(input_obj).val(1);
    return;
  }
  
  var ret = shopCartUpdate(type,id,number,'text');
  
  if ( ret == '货品库存不足!')
  {
    if( item_number )
    {
      $(input_obj).val( item_number );
    }
    else
    {
      $(input_obj).val(1);
    }
  }
}

/*
 * 购物车修改颜色尺码
 * @param product_id 原商品id
 * @param change_product_id 变换商品id
 * @param changeNumber 改变数量
 */
function changeProductSizeColor( productId, changeProductId, changeNumber ){
  $.get("/shopcart/changeproduct?productid="+productId+"&inc=1&changeid="+changeProductId+"&changenumber="+changeNumber+"&"+Math.random(),function(ret){
  if(ret.status == "ok")
    shopCartLoad();
  else
    ShowMessage.Msg.alert( ret.data );
  },"json");
}
/*
 * 购物车修改套装颜色尺码
 * @param uk 套装uk
 * @param product_id 原商品id
 * @param changeProductId 需要修改商品id
 * @param changeNumber 修改数量
 */
function changeSuitSizeColor( uk, productId, changeProductId, number ){
  var products_url = "";
  if( !uk || uk !=undefined ){
    var ukInfo = uk.split(":");
    var suitId = ukInfo[1];
    for(var i=2;i < ukInfo.length; i++ ){
      if( ukInfo[i] != productId )
         products_url += "&products[]="+ukInfo[i];
    }
    products_url += "&products[]="+changeProductId;
    $.get("/shopcart/changesuit?uk="+uk+"&suitid="+suitId+"&number="+number+"&"+products_url+"&"+Math.random(), function(ret){
      if ( ret.status == "ok" )
        shopCartLoad();
      else 
        ShowMessage.Msg.alert( ret.data );
    },"json");
  }
}

/**
 * 修改礼包中的商品的颜色和尺码
 * @param {type} uk
 * @param {type} source_product_id
 * @param {type} target_product_id
 * @returns {undefined}
 */
function changePackageSizeColor( uk, source_product_id, target_product_id )
{
  if( !uk || !source_product_id || !target_product_id )
  {
    alert( "参数错误" );
    return false;
  }
  if( source_product_id == target_product_id )
  {
    return false;
  }
  $.post("/shopcart/change_package_product_spec?" + Math.random(), { uk : uk, source_product_id : source_product_id, target_product_id : target_product_id }, function(ret){
    if ( ret.status == "ok" )
    {
      shopCartLoad();
    }
    else 
    {
      ShowMessage.Msg.alert( ret.data );
    }
  },"json");
}

/*
*撤销删除单品 
*/
function cancelDelProduct( product_id,number ){
  var ref;
  var Request = new Object();
  Request = GetRequest();
  if ( Request['ref'] == undefined || Request['ref'] == '' ){
    ref = "";
  }
  else{
    ref = Request['ref'];
  }
  $.get("/shopcart/"+product_id+"/addproduct?number="+number+"&ref="+ref+"&inc=1&"+Math.random(), function(ret){
    if( ret.status == "ok" ){
       shopCartLoad();
    }else
       ShowMessage.Msg.alert( ret.data );
  },'json')
}
/*
 * 撤销删除套装
 */
function cancelDelSuit(suit_id,products,number){
  var products_url = "";
  for( key in products ){
    products_url += "&products[]="+products[key];
  }
  $.get("/shopcart/"+suit_id+"/addsuit?number="+number+"&"+products_url+"&"+Math.random(), function(ret){
    if ( ret.status == "ok" ) {
     shopCartLoad();
    } else {
      ShowMessage.Msg.alert( ret.data );
    }
  },"json");
}

function cancelDelPackage( package_id, products, number )
{
  var params = "package_id=" + package_id + "&number=" + number + "&check_flag=0";
  for( var i = 0; i < products.length; i++ )
  {
    var product_id = products[ i ];
    params += "&product_id[]=" + product_id;  
  }
  $.post( "/shopcart/add_package", params, function( ret ){
    if( ret.status == "ok" )
    {
      shopCartLoad();
    }
    else
    {
      ShowMessage.Msg.alert( ret.data );
    }
  }, "json" );
}

function shopCartAddProduct( product_id,number, id , type )
{
  var ref;
  var Request = new Object();
  Request = GetRequest();
  if ( Request['ref'] == undefined || Request['ref'] == '' )
  {
    ref = "";
  }
  else
  {
    ref = Request['ref'];
  }
  $.get("/shopcart/"+product_id+"/addproduct?number="+number+"&ref="+ref+"&inc=1&"+Math.random(), function(ret)
  {
    if ( ret.status == "ok" ) 
    {
      $( "#" + id ).show().next().hide();
      if( 1 != type )
      {
        $.blockUI(
        {
          message: $('#affirm'), 
          css: {
                  top: ($(window).height()-$('#affirm').height()) /2 + 'px',
                  left: ($(window).width() - 450) /2 + 'px', 
                  width: '450px', 
                  padding: '10px' ,
                  cursor : 'auto'}
              });
          $('#block').attr( 'title','点击关闭' ).click($.unblockUI);
          $('.pCloseCion').click( $.unblockUI );
          $( ".pageCartGo" ).click( $.unblockUI );
      }
      else
      {
        flyanimote.start = id;
        flyanimote.end = "suspendobj";
        flyanimote.fobj = "flyobj";
        flyanimote.number = number;
        flyanimote.init();
      }
      updShopCartMessage();
      $("#goods_number").text( ret.data.number );
      $("#goods_price").text( "合计 : ¥ " + ret.data.price );
    }
    else
    {
      alert( ret.data );
      $( "#" +id ).show().next().hide();
    }
  },"json");
}

function updShopCartMessage()
{
  var floatShopCart = '<a id="nalkerbtn" title="在线客服" onclick="javascript:NTKF.im_openInPageChat( \'kf_9993_1359006694030\' );" href="javascript:void(0)" class="pBloclIcon pBKef"></a>';
  if( $( "#cart_goods_number" ).length == 0 )
  {
    floatShopCart += '<a href="javascript:newLogin()" class="pBloclIcon pBCar02" id="suspendobj"><em class="pBCarem">0</em></a>';
    floatShopCart += '<a href="#" class="pBloclIcon pBDb"></a><div class="pBloclNumer" id="showAddNum">+1</div>';
    $( "#floatshopcart" ).html( floatShopCart );
    return false;
  }
  if( !CURRENT_USER )
  {
    floatShopCart += '<a href="javascript:newLogin()" class="pBloclIcon pBCar02" id="suspendobj"><em class="pBCarem">0</em></a>';
    floatShopCart += '<a href="#" class="pBloclIcon pBDb"></a><div class="pBloclNumer" id="showAddNum">+1</div>';
    $( "#floatshopcart" ).html( floatShopCart );
    return false;
  }
  $.post("/shopcart/items?gettype=2&"+Math.random(), function(ret)
  {
    if( "ok" == ret.status )
    {
      var sum_number = 0;
      var html = '<p>&nbsp;&nbsp;最近加入的宝贝</p>';
      $.each(ret.data,function(key,obj)
      {
        sum_number += parseInt(obj.number);
        html += "<table width='300' border='0' align='center' cellpadding='0' cellspacing='0'><tr><td valign='middle'><img src='"+obj.mini_img+"' width='45' height='43' /></td><td class='dropboxmiddle'>";
        //如果不是套装,可以有颜色 尺码
        if( obj.type != 'suit' )
          html +="<p><a href='http://www.aimer.com.cn/goods/"+obj.goods_id+"' target='_blank' title='"+obj.name+"'>"+obj.name+"</a></p><p>颜色分类:"+obj.colortext+"&nbsp;&nbsp;尺码:"+obj.sizetext+"</p>";
        else
          html +="<p><a href='http://www.aimer.com.cn/suit/"+obj.id+"' target='_blank' title='"+obj.name+"'>"+obj.name+"</a></p><p>(套装)</p>";
        html +="</td><td class='dropboxright'><p><span>¥</span>"+obj.price+"</p><p><a href=\"javascript:shopCartDelete('"+obj.uk+"');\">删除</a></td></tr></table>";
      });
      html += "<div class=\"dropcart\"><a href=\"http://www.aimer.com.cn/shopcart\">查看我的购物车</a></div>";

      $( "#cart_goods_number" ).text( sum_number );
      $( "#fscgoodscount" ).text( sum_number );
      if( sum_number == 0 )
        html = "<p>&nbsp;&nbsp;您的购物车还是空的哦,快去选购吧</p>";
      $(".dropbox").html(html);
    }
  },"json");
}
function shopCartAddSuit( suit_id,products,number, isfly )
{
  var products_url = "";
  for( key in products )
  {
    products_url += "&products[]="+products[key].id;
  }
  $.get("/shopcart/"+suit_id+"/addsuit?number="+number+"&"+products_url+"&"+Math.random(), function(ret)
  {
    if ( ret.status == "ok" ) 
    {
      $( "#flystart" ).show();
      $( ".loginButton4" ).hide();
      if( 1 == isfly )
      {
        //使用的是fly效果，需要回复最初状态
        flyanimote.start = "flystart";
        flyanimote.fobj = "flyobj";
        flyanimote.number = $( "#goodCount" ).val();
        flyanimote.init();
      }
      else
      {
        $.blockUI({
          message: $( '#affirm' ), 
          css: {
            top: ( $( window ).height() - $( '#affirm' ).height() ) /2 + 'px',
            left: ( $( window ).width() - $( '#affirm' ).width() ) /2 + 'px', 
            width: '450px', 
            padding: '10px' ,
            cursor : 'auto'
          }
        });
        $('#block').attr('title','点击关闭').click($.unblockUI);
        $('.pCloseCion').click($.unblockUI);
        $('.pageCartGo').click($.unblockUI);
        $("#goods_number").text( " " + ret.data.number + " " );
        $("#goods_price").text( "合计：¥ " + ret.data.price );
      }
      updShopCartMessage();
    }
    else
    {
      $( "#flystart" ).show();
      $( ".loginButton4" ).hide();
      ShowMessage.Msg.alert( ret.data );
    }
  },"json");
}

function shopCartAddGift( product_id,promotion_id,number ){
  $.get("/shopcart/"+product_id+"/addgift?promotion_id="+promotion_id+"&number="+number+"&"+Math.random(), function(ret){
    if ( ret.status == "ok" ) {
      ShowMessage.Msg.alert("添加成功");
      shopCartLoad();
    } else {
      ShowMessage.Msg.alert( ret.data );
    }
  },"json");
}
  //加载地址管理模块
function loadAddress(){
  $.get("/shopcart/confirmaddress?"+Math.random(),function( res){
    if( res.status == "ok"){
      $("#confirmAddress").html( res.data );
    }
    else
      alert( res.data );
  },'json');
}


