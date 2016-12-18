//头部效果
$(function(){
	//我的账户的下拉菜单
	$('.navright1').hover(function(){
			$('.navrightMain').show();
			$('.navright1').removeClass('hoversout')
			$('.navright1').addClass('hoversin')
	},function(){
		$('.navrightMain').hide();
		$('.navright1').removeClass('hoversin')
		$('.navright1').addClass('hoversout')
	});
	
	//我的购物车的下拉菜单
	$('.navright2').hover(function(){
			$('.navright2Main').show();
			$('.navright2').removeClass('hoversout');
			$('.navright2').addClass('hoversin');
	},function(){
		$('.navright2Main').hide();
		$('.navright2').removeClass('hoversin');
		$('.navright2').addClass('hoversout');
	})
	
	//搜索框的提交
	$('.logo-txt').focus(function(){
		if($(this).val() === '请输入关键字'){
			$(this).val('')
		}
	});
	$('.logo-txt').focusout(function(){
		if($(this).val() ===''){
			$(this).val('请输入关键字')
		}
	});
	
	//导航条的鼠标移入移除事件
	$('.nav dd').each(function(index,element){
		if(index != 0 ){
			$(this).hover(function(){
				$(this).addClass('hoverdd').siblings().removeClass('hoverdd');
				$(this).children('a').css('color','#fff');
			},function(){
				if(index != 1){
					$(this).children('a').css('color','#000');
					$(this).removeClass('hoverdd');
				}	
			})
		
		}	
			
		
	})
	$('.nav-barnd').hover(function(){
		$(this).children('.barnd').show()
	},function(){
		$(this).children('.barnd').hide();
		$(this).removeClass('hoverdd');
		$(this).children('a').css('color','#000');
		
	})
	
	
	//详细菜单的鼠标移入移除效果
	$('.navs-main li').each(function(index,element){
			var timer = null;
		$(this).hover(function(){
			clearTimeout(timer)
			$(this).children('.detailedmenu').show()
		},function(){
			var that = $(this)
		 timer=setTimeout(function(){
				$(that).children('.detailedmenu').hide()
			},100)
			
		});
		
		$(this).children('.detailedmenu').hover(function(){
			clearTimeout(timer)
			$(this).show();
		},function(){
			setTimeout(function(){
				$(this).children('.detailedmenu').hide();
			},100)
		})	
		
	})
	//购物车的初始化；
	//初始化购物车的数量；
	
	
	$.cookie.json = true; //cookie中存储的value值是对象
	var products = $.cookie('goods');
	if(!products||products.length === 0){
		$('.biaogan').show();
		$('.mycar').hide();
	}else{
		$('.biaogan').hide();
		$('.mycar').show();
	var	len = products.length ;
		
		$('.goods-nums').text(len)
			$.each(products, function(index,element) {
				$('<li class="suregoods"><div class="suregoodsimg"><a href="javascript:;" target="_blank"><img src="'+element.src+'" /></a></div><div class="suregoodsname"><a href="javascript:;" target="_blank">'+element.name+'</a><p>颜色：'+ element.color+' 尺码：'+element.size+'</p></div><div class="suregoodsdel"><p>'+element.price+'*'+element.anmount+'</p><a href="javascript:;" class="dell">删除</a></div></li>').insertBefore('.mycar')
		});
	}
	
	
	
	
	//点击加入导航购物车条
		//保存商品信息到cookie
		$('.pageFRGWC').on('click',function(){
						$('.biaogan').hide();
						$('.mycar').show();
						$('.navright2Main ul li').remove();
						//获取商品的图片SRC，name，尺码, 将其保存在对象的属性当中
						var product={
							src : $('.showmidden').children("img").attr('src'),
							name : $('.name1').text(),
							color :$('.surcolor').children('.inck').children('img').attr('title'),
							anmount :parseInt($('#txt').val()),
							size : $('.cima').children('.inck').text(),
							price: $('.goods-price-txt').children('em').text()
	
						};
						
						
						//将创建的商品对象保存到数组中再保存会cookie
						//先从cookie中读取数组
						$.cookie.json = true; //cookie中存储的value值是对象
						var goods=$.cookie("goods");
						//判断是否读取到数组
						if(!goods){//未读取到，说明是第一次添加购物车，则创建数组对象
							goods = [];
						}
						//判断数组是否存在之前选购商品
						var index = findIndex(product.id,product.color,product.size,goods);
						if(index === -1){
							//将当前次添加到购物车的商品保存到数组中
							goods.push(product);
						}
						else{
							var jia = [];
							jia[index] = parseInt(goods[index].anmount);
							jia[index]+= product.anmount;
							goods[index].anmount = jia[index];
						}
	
						//console.log(products)
						//
						//将数组保存会cookie
						$.cookie("goods",goods,{expires:7,path:'/'})	
					
				//放到导航的购物车里面
					var products = $.cookie('goods'),
						len =products.length ;
						$('.goods-nums').text(len)
					$.each(products, function(index,element) {
						
						$('<li class="suregoods"><div class="suregoodsimg"><a href="javascript:;" target="_blank"><img src="'+element.src+'" /></a></div><div class="suregoodsname"><a href="javascript:;" target="_blank">'+element.name+'</a><p>颜色：'+ element.color+' 尺码：'+element.size+'</p></div><div class="suregoodsdel"><p>'+element.price+'*'+element.anmount+'</p><a href="javascript:;" class="dell">删除</a></div></li>').insertBefore('.mycar').data('product',element)
				});	
				
			
				
				
				
	})
		
		//删除购物车的信息
	$('.dell').each(function(){
		$(this).on('click',function(){
			var $row = $(this).parents('.suregoods');
			delee($row);
			var products = $.cookie('goods'),
			len =products.length ;
			if(!products||products.length === 0){
				$('.biaogan').show();
				$('.mycar').hide();
				$('.goods-nums').text(len)
			}
		});
		
		
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
					//从页面中删除这个li
					$row.remove();
				
			}		
					
				//判断商品是否为重复的	
				function findIndex(id,color,size,products){
							for(var attr in products){
								if(products[attr].id === id&&products[attr].color === color&&products[attr].size === size){
									return attr;
								}
							}
								return -1;
						}		
	
	
	
	
	
	
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
	
	
	
	
	
	
	
	
	
	
	
})	