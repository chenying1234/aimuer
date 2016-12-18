$(function(){
	$('.gun4').hover(function(){
		console.log('in')
		$(this).css('background','url(../images/index16_icon.png) no-repeat -87px -257px')
	},function(){
		$(this).css('background','url(../images/index16_icon.png) no-repeat 0 -257px')
	})
	$('.gun3').hover(function(){
		console.log('in')
		$(this).css('background','url(../images/index16_icon.png) no-repeat -87px -187px')
	},function(){
		$(this).css('background','url(../images/index16_icon.png) no-repeat 0 -187px')
	})
	$('.gun2').hover(function(){
		console.log('in')
		$(this).css('background','url(../images/index16_icon.png) no-repeat -87px -117px')
	},function(){
		$(this).css('background','url(../images/index16_icon.png) no-repeat 0 -117px')
	})
	$('.gun1').hover(function(){
		console.log('in')
		$(this).css('background','url(../images/index16_icon.png) no-repeat -87px -47px')
	},function(){
		$(this).css('background','url(../images/index16_icon.png) no-repeat 0 -47px')
	})
	
//添加购物车的信息到页面上
$.cookie.json = true; //cookie中存储的value值是对象
	var products = $.cookie('goods');
	if(!products||products.length === 0){
		$('.nogoods').show();
	}else{	$.each(products, function(index,element) {
						var tt = element.anmount*element.price
						$('<li><table  cellspacing="0"  cellpadding="0" border="0" class="addshop"  width="986px" ><tbody><tr><td width="45" height="90" align="center" valign="middle"><input type="checkbox" style="cursor: pointer;"  class="cll_abc"/></td><td width="72" align="left" valign="middle"><a href="javascript:;" target="_blank" ><img src="'+element.src+'" class="tdimg" /></a></td><td width="235" align="center" valign="middle" height=""><p><a href="javascript:;" target="_blank">'+element.name+'</a></p></td><td width="166" align="center" valign="middle"><p>颜色：'+element.color+'<br/>尺码：'+element.size+'</p></td><td width="127" align="center" valign="middle"><span class="jian" style="cursor: pointer;"><img src="../images/购物车 - 爱慕官方商城_files/bt_subtract.gif "/> </span><input type="text" value="'+element.anmount+'" size="1" style="color: #7A7A7A; text-align: center;" id="txt" /><span class="add" style="cursor: pointer;"><img src="../images/购物车 - 爱慕官方商城_files/bt_add.gif"  /> </span></td><td width="123" align="center" valign="middle" class="danjia"><span>￥</span><p style="display: inline-block;">'+element.price+'</p></td><td width="91" align="center" valign="middle" class="xiaoji"><span>￥</span><p style="display: inline-block;">'+tt+'</p></td><td align="center"><a href="javascript:;"  target="_blank">移入收藏夹</a><br /><a href="javascript:;"  target="_blank" class="dels">删除</a></td></tr></tbody></table></li>').insertBefore('.weizhi').data('product',element)
				});
	}
	
	
	
	
	
	
	
//购物车的数量的加减
	$('.add').each(function(){
		$(this).on('click',function(){
		var  tt =$(this).siblings('input').val();
		
				tt++;
				
				$(this).siblings('input').val(tt);
				
			//获取到单价
			var danjia = $(this).parent().next().children('p').text();
			//计算小计
			$(this).parent().siblings('.xiaoji').children('p').text(danjia*tt)
			//计算合计
			heji();
			
				
		})
	});
	
	
	$('.jian').each(function(){
		$(this).on('click',function(){
		var  tt =$(this).siblings('input').val();
			if(tt<=1){
				return
			}
				tt--;
				$(this).siblings('input').val(tt);
				
			//获取到单价
			var danjia = $(this).parent().siblings('.danjia').children('p').text();
			//计算小计
			$(this).parent().siblings('.xiaoji').children('p').text(danjia*tt)
			//计算合计
			heji();
				
				
				
				
		})
	})


//全选按钮的效果实现	
	
	$('.cll_all').click(function(){
					var ass = $(this).prop('checked');
					$('.cll_abc').prop('checked',ass);
					heji();
	});
	
	
	$('.cll_abc').click(function(){
		heji()
	})
	
	heji()
	//计算合计金额
	function heji(){
		var total = 0
		$('.cll_abc:checked').parents('tr').find('.xiaoji p').each(function(index,element){
			console.log('1')
			total += parseFloat($(this).text());
		});
		$('.jiageshuzi').text('￥'+total);
	};
				
	//删除
	$('.dels').each(function(){
		$(this).on('click',function(){
			var $row = $(this).parents('li');
				delee($row);
			if(!products||products.length === 0){
		$('.nogoods').show();
	}	
		})
		
				
	})
	
	
	//删除选中的
	$('.delched').click(function(){
					$('.cll_abc:checked').each(function(index,element){
						var $row = $(this).parents('li');
						delee($row);
						if(!products||products.length === 0){
		$('.nogoods').show();
	}
					})
				})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//从COOKIE和页面中删除商品信息
				function delee($row){
					//获取到这行的商品信息
					var par = $row.data('product');
					//判断这行在数组中的位子
					var index = $.inArray(par,products);
					//从数组中删除这个商品信息
					products.splice(index,1);
					//保存剩余商品信息回到cookie中
					$.cookie('goods',products,{expires:7, path:"/"});
					//从页面中删除这行
					$row.remove();
					//判断购物车是否为空
					if(!products||products.length === 0){
				}
					//重新计算合计
					heji();
				};
	
	
	
	
	
	
	
	
	
	
	
	
})


		

















