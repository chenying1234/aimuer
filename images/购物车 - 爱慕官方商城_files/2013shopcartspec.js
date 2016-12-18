/*
 *新改版的颜色尺码区域
 *@author liujia
*/
var global_spec_arr = new Object();
var current_product={};//当前选中的商品
function load_goods_specs( goods_id, product_id ){
  current_product.id  = product_id
  $.get("/goods/"+goods_id+"/goodsspecs",function(ret){
    if ( ret.status != "ok") 
    {
      alert(ret.data)
      return;
    }
    var specs_data = ret.data;
    global_spec_arr[goods_id] = {
      specs : specs_data.specs, //specs=1为颜色 
      spec_values : specs_data.spec_values,//颜色尺寸对象
      products : specs_data.products,//颜色尺码组合对应的product
      sort_color_spec: specs_data.color_spec_arr //颜色按照下面尺码个数排序
    }
    for( var index in global_spec_arr[goods_id].products){
      if( global_spec_arr[goods_id].products[index].id == product_id ){
        current_product.spec_value_ids = global_spec_arr[goods_id].products[index]._spec_value_ids;
      }
    }
    for( var i in  specs_data.color_spec_arr){ //有库存并且按照该颜色下面尺码个数排序的颜色数组
      var color_id = specs_data.color_spec_arr[i].id;

      for( var index in specs_data.spec_values ){ //颜色、尺码对象
        var spec_obj = specs_data.spec_values[ index ];
        if( spec_obj.spec_id == 1 && color_id == spec_obj.id  ){ //spec_id =1获得的是颜色
          var id = spec_obj.id; //颜色对应的id
          var col_html = '';
          if( id ==  current_product.spec_value_ids[1] ){//用户当前选中的颜色
            col_html ='<a class="col_icon swtxclick" id="col_'+id+'" href="javascript:void(0);">'
                        +'<img colId="'+id+'"  onclick=" ChangeColor('+goods_id+','+id+')" title="'+spec_obj.new_alias+'('+spec_obj.new_spec_value+')" alt="'+spec_obj.new_alias+'('+spec_obj.new_spec_value+')" src="http://img.aimer.com.cn/'+spec_obj.new_file_path+'" />'
                        +'<em class="carCUlDdGou"></em></a>'
            ChangeColor( goods_id, id  );//动态加载尺码
          }else{
            col_html = '<a class="col_icon" id="col_'+id+'" href="javascript:void(0);">'
                        +'<img colId="'+id+'"  onclick=" ChangeColor('+goods_id+','+id+')" title="'+spec_obj.new_alias+'('+spec_obj.new_spec_value+')" alt="'+spec_obj.new_alias+'('+spec_obj.new_spec_value+')" src="http://img.aimer.com.cn/'+spec_obj.new_file_path+'" />'
                        +'<em></em></a>'
          }
          $(".carCUlDd").append( $(col_html) );
          break;
        }
      }
    }
    if(  $(".carCUlDd ").find("a").hasClass("swtxclick") == false ){//如果用户当前选中的颜色失效，选中第一个颜色作为第一个加载的
      $(".carCUlDd ").find("a").eq(0).addClass("swtxclick").find("em").addClass("carCUlDdGou");
      var firstColorId =  $(".carCUlDd ").find("a").eq(0).find("img").attr("colId");
      ChangeColor( goods_id, firstColorId );//动态加载尺码
    }
  },"json")
}
/*
 * 改变颜色,动态加载颜色下面的尺码
 * @param goods_id 对应商品id
 * @param $obj_id 颜色id
 */
function ChangeColor( goods_id, $obj_id ){
  $("#col_"+$obj_id).addClass("swtxclick").find("em").addClass("carCUlDdGou");
  $("#col_"+$obj_id).siblings().removeClass("swtxclick").find("em").removeClass("carCUlDdGou");
  $(".carCUlSize").empty();
  var goods_spec = global_spec_arr[goods_id];
  var products = goods_spec.products;
  var spec_values = goods_spec.spec_values;
  var specs = goods_spec.specs;
  for( var index in products ){
    var product = products[index];
    var spec_value_ids = product._spec_value_ids;
    if( product.count > 0 && spec_value_ids[1] == $obj_id  ){ //有库存
      var size_id;
      for( var _spec_id in spec_value_ids ){
        if( _spec_id != 1 )
          size_id = spec_value_ids[ _spec_id ];
      }
      var size_html = '';
      for(var i in spec_values ){
        var spec_value = spec_values[i];
        if( size_id == spec_value.id ){
          if( product.id == current_product.id){
             size_html += '<a class="spec_value swtxclick carCUlSelected" id="size_'+product.id+'" href="javascript:void(0);" '
                        +'onclick="setSize('+product.id+')" product_id="'+product.id+'" spec_id='+spec_value.spec_id+' '
                        +'spec_value_id='+spec_value.id+' alias="'+spec_value.new_alias+'">'+spec_value.new_alias+'<em class="carCUlDdGou"></em></a>';
          }else{
             size_html += '<a class="spec_value" id="size_'+product.id+'" href="javascript:void(0);" '
                        +'onclick="setSize('+product.id+')" product_id="'+product.id+'" spec_id='+spec_value.spec_id+' '
                        +'spec_value_id='+spec_value.id+' alias="'+spec_value.new_alias+'">'+spec_value.new_alias+'<em></em></a>';
          }
        }
      }
      $(".carCUlSize").append( $(size_html) );
    } 
  }
  if(  $(".carCUlSize").find("a").hasClass("swtxclick") == false ){
    $(".carCUlSize").find("a").eq(0).addClass("carCUlSelected").find("em").addClass("carCUlDdGou");
  }
  if( $(".carCUlDd").html()=="" && $(".carCUlSize").html()=="" ){ //没有颜色或者没有尺码
    $(".carCColour").removeClass("carBgColor01");
    $(".carConSize").hide();
    ShowMessage.Msg.alert("该宝贝已经失效，无法修改颜色尺码");
  }
}

function setSize( productId){
  $("#size_"+productId).addClass("carCUlSelected").find("em").addClass("carCUlDdGou");
  $("#size_"+productId).siblings().removeClass("carCUlSelected").find("em").removeClass("carCUlDdGou");
}


