var global_spec_arr = new Object();

/*
 * 选择规格
 */
function goods_spec_form( goods_id, gift_index, promotion_id ){
   var id = $("input[type=radio]:checked").val();
   var gift_index =  $("input[type=radio]:checked").attr("index");
   $("#addToCart_"+id+"_"+gift_index).click(function(){
    var specs_data = global_spec_arr[id]
    for ( var i = 0; i < specs_data.specs.length; i++ ) 
    {
      var spec = specs_data.specs[i]
  
      if ( $(".spec_value[spec_id="+spec.id+"].color_on,.spec_value[spec_id="+spec.id+"].size_on").length == 0 ) {
        if ( spec.id == 1 )
          ShowMessage.Msg.alert( "请选择颜色" )
        else
          ShowMessage.Msg.alert( "请选择尺码" )
        return;
      }
    }
    var selected_specs = {}
    $(".spec_value.color_on,.spec_value.size_on").each(function(){
      var spec_id = $(this).attr("spec_id")
      var spec_value_id = $(this).attr("spec_value_id")
      selected_specs[spec_id] = spec_value_id
    })
    // 找到所选规格对应的货品,添加到购物车
    for ( var i = 0 ; i < specs_data.products.length; i++ )
    {
      var matched = 0
      var product = specs_data.products[i]
      for ( var spec_id in product._spec_value_ids ) {
        if ( selected_specs[spec_id] == product._spec_value_ids[spec_id] )
          matched ++
        else
          continue;
        if ( matched == specs_data.specs.length )
        {
          shopCartAddGift( product.id, promotion_id, 1 );
          return;
        }
      }
    }
  })

  $.get( "/goods/" + goods_id + "/goodsspecs", function(ret){
    if ( ret.status != "ok") 
    {
      alert(ret.data)
      return;
    }

    var specs_data = ret.data;

    global_spec_arr[goods_id] = {
      specs : specs_data.specs,
      spec_values : specs_data.spec_values,
      products : specs_data.products
    }

    var first_spec = specs_data.specs[0]

    for ( var i = 0 ; i < specs_data.specs.length; i++ ) {
      if ( specs_data.specs[i].id == 1 )
        $(".color_title").parent().show()
      else
        $(".size_title").parent().show()
    }

    // 生成规格值按钮(颜色,尺码)
    for ( var spec_value_id in specs_data.spec_values ) 
    {
      var spec_value = specs_data.spec_values[ spec_value_id ]

      // Color
      if ( spec_value.spec_id == 1 ) 
      {
        var aHtml = '<a href="javascript:void(0)" onfocus="this.blur();">'
                      +'<img title="'+spec_value.new_alias+'('+spec_value.new_spec_value+')" alt="'+spec_value.new_alias+'('+spec_value.new_spec_value+')" src="http://img.aimer.com.cn/'+spec_value.new_file_path+'" />'
                    +'</a>'

        var li = $( '<li class="spec_value" spec_id='+spec_value.spec_id+' spec_value_id='+spec_value_id+'>'+aHtml+'</li>' )

        $(".gift_color_column ul").append( li )
      }
      // Size
      else 
      {
        var a = $( '<a class="spec_value" href="javascript:void(0);" spec_id='+spec_value.spec_id+' spec_value_id='+spec_value_id+'>'+spec_value.new_alias+'</a>' )
        $(".gift_size_column .giftCm").append( a )
      }
    }

    // 设置规格值按钮点击动作
    $(".spec_value").each(function(){

      var spec_id = $(this).attr( "spec_id" )
      var spec_value_id = $(this).attr( "spec_value_id" )

      // 隐藏没有库存
      var count = 0
      for( var product_index in specs_data.products ) 
      {
        var product = specs_data.products[ product_index ]

        if ( product._spec_value_ids[spec_id] == spec_value_id ) 
          count += product.count
      }

      if ( count == 0 )
      {
        $(this).remove()
        return
      }

      $(this).click( function(){

        var spec_type = spec_id == 1 ? "color" : 'size'

        var selected_class = spec_type + '_on'
        $(this).addClass(selected_class).siblings().removeClass( selected_class )

        if ( spec_id == first_spec.id )
        for( var product_index in specs_data.products ) 
        {
          var product = specs_data.products[ product_index ]

          if ( product._spec_value_ids[spec_id] != spec_value_id )
            continue;

          for ( var _spec_id in product._spec_value_ids ) {
            if ( _spec_id != spec_id ) {
              if ( product.count == 0 ) {
                $("[spec_id="+_spec_id+"][spec_value_id="+product._spec_value_ids[_spec_id]+"]").hide().removeClass("color_on size_on")
              } else {
                $("[spec_id="+_spec_id+"][spec_value_id="+product._spec_value_ids[_spec_id]+"]").show()
              }
            }
          }
        }
        $("."+spec_type+"_title").text( specs_data.spec_values[ spec_value_id ].new_alias )
        $(".color_on").length == 0 && $(".color_title").text( "未选择" )
        $(".size_on").length == 0 && $(".size_title").text( "未选择" )
      })
    });
  },"json");
  
}


