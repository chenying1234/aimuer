$(function(){
	//鼠标移入全部菜单的移入移除
	$('.navstart').hover(function(){
		 $('.navs-main').show()
		 $('.jian-down-baise').removeClass('jian-down-baise').addClass('jian-up-baise')
	},function(){
		$('.jian-up-baise').removeClass('jian-up-baise').addClass('jian-down-baise')
		Itime=setTimeout(function(){
			$('.navs-main').hide()
		},100)
		
	});
	
	$('.navs-main').hover(function(){
		clearTimeout(Itime);
		$(this).show();
	},function(){
		
	})
	
	//模拟选择付款方式与送货地点的下拉框
	$('#online').on('click',function(event){
		var Price = $('.price-sty')
		if(Price.css('display') == 'none'){
			$('.price-sty').show()
		}else{
			$('.price-sty').hide()
		}
		event.stopPropagation();
	});
	
	
	$(document).on('click',function(){
		$('.price-sty').hide()
	})
	
	
	$('.price-sty li a').on('click',function(){
		var TXT = $(this).text();
		$('#online span').text(TXT);
		$(this).addClass('sur').parent().siblings().children().removeClass('sur')
		$('.price-sty').hide();
		event.stopPropagation();
	})

	$('.price-sty').on('click',function(){
		$(this).show()
		event.stopPropagation();
	})
	
	//选择送货地点的下拉框
	$('#place').on('click',function(event){
		var Price = $('.place')
		if(Price.css('display') == 'none'){
			$('.place').show()
		}else{
			$('.place').hide()
		}
		event.stopPropagation();
	});
	
	
	$(document).on('click',function(){
		$('.place').hide()
	})
	
	
	$('.place li a').on('click',function(){
		var TXT = $(this).text();
		$('#place span').text(TXT);
		$(this).addClass('sur').parent().siblings().children().removeClass('sur')
		$('.place').hide();
		event.stopPropagation();
	})

	$('.place').on('click',function(){
		$(this).show()
		event.stopPropagation();
	})

	//选择颜色的样式改变
		$('.surcolor a').each(function(index,element){
			$(this).click(function(){
				$(this).addClass('inck').siblings('a').removeClass('inck')
				$(this).children('em').addClass('sru').parent().siblings('a').children('em').removeClass('sru')
			})
		})
	
	//选择尺码的样式改变
		$('.cima a').each(function(index,element){
			$(this).click(function(){
				$(this).addClass('inck').siblings('a').removeClass('inck')
				$(this).children('em').addClass('sru').parent().siblings('a').children('em').removeClass('sru')
			})
		})
	
	
	//尺码表的显示
	$('.cmbdl').on('click',function(){
		$('#zoom').show();
		$('#cmblist').show();
	})
	
	$('#zoom').on('click',function(){
		$('#zoom').fadeOut(200);
		$('#cmblist').fadeOut(200);
		$('.queren').fadeOut(200);
	})
	
	$('.x').on('click',function(){
		$('#zoom').fadeOut(200);
		$('#cmblist').fadeOut(200);
	})
	
	
	
	//放大镜
	//鼠标移入显示出遮罩层与放大镜
	$('.showmidden').hover(function(){
		$('.move,.bigwindow').css("display","block")
		$(this).children('img').css('opacity','0.4')
		
	},function(){
		$('.move,.bigwindow').css('display','none')
		$(this).children('img').css('opacity','1')
	}).on('mousemove',function(event){
			$('.move').offset({
				top:event.pageY - $('.move').outerHeight()/2,
				left:event.pageX - $('.move').outerWidth()/2
			});
			
			//获得.pop相对有定位的父元素。middle的相对定位位置
			var position = $('.move').position(),
				middlewidth =  $('.showmidden').outerWidth(),
				middleHeight = $('.showmidden').outerHeight(),
				_top = position.top,
				_left = position.left;
				bigWidth = $('.bigwindow').width(),
				bigHeight = $('.bigwindow').height(),
				reaX = bigWidth / $('.move').outerWidth() ,
				reaY = bigHeight / $('.move').outerHeight();
				console.log(reaX,reaY)
				
				//判断范围
				if(_top<0){
				_top = 0;}
				else if(_top > middleHeight - $('.move').outerHeight())
				{_top = middleHeight - $('.move').outerHeight()};
				if(_left<0)
				{_left = 0;}
				else if(_left>middlewidth - $('.move').outerWidth())
				{_left = middlewidth - $('.move').outerWidth()};
				
				$('.move').css({
					left:_left,
					top :_top
				})
				
				//改变遮罩层的的图片位置
				$('.move img').css({
					left:-_left,
					top :-_top
				})
				
				//改变大图的图片位置
				$('.bigwindow img').css({
					left:-_left*reaX,
					top :-_top*reaY
				})
		
	})
	
	//商品数量的改变
	//加
		
	$('#txt').focusout(function(){
		var ss = $('#txt').val()
		if($('#txt').val() === ''){
			$('#txt').val(1)
		}
		if(!Number($('#txt').val())){
			alert('请输入有效数字')
			$('#txt').val(1)
		}
	});
	//加
	$('.add').on('click',function(){
		var ss = $('#txt').val()
		ss++
		$('#txt').val(ss)
	})
	//减
	$('.jian').on('click',function(){
		var ss = $('#txt').val()
		if(ss<=1){
			return
		}
		ss--
		$('#txt').val(ss)
	})
	
	//推荐商品选择颜色
	$('.zsxl li').each(function(){
		$(this).hover(function(){
			console.log($(this).children('.colorXZ'))
			$(this).children('.SPZS').children('.colorXZ').show()
		},function(){
			$(this).children('.SPZS').children('.colorXZ').hide();
		})
	})
	
	//s数据导航条的样式
	$('.cright-nav li').each(function(){
		$(this).hover(function(event){
			$(this).addClass('cright-navstd').siblings().removeClass('cright-navstd')
		},function(){
			$(this).removeClass('cright-navstd')
			
		});
		event.stopPropagation()
	});
	
	$('.cright-nav a').each(function(index,element){
		var navtop = $('.cright-nav').offset().top;
		$(this).on('click', function(event){
			$(this).parent().addClass('cright-navst').siblings().removeClass('cright-navst');
			$('.nav-list li').eq(index).show().siblings().hide();
			$(window).scrollTop(navtop - $('.cright-nav').height() )
			event.stopPropagation()
	})
		
	})
	
	//滚动事件
	//获取导航的高度top
	var    navtop = $('.cright-nav').offset().top;
	
		$(window).on("scroll", function(){
			var scl = $(this).scrollTop();
			if(scl >= navtop){
				
				$('.cright-nav').css('position','fixed')
			}
			if(scl < navtop){
				
				$('.cright-nav').css('position','static')
			}
		})
		
	//点击小图改变商品详情的图片跟放大镜
		
	$('.showsmoll li').each(function(index,element){
		$(this).on('click',function(){
			var sSrc = $(this).children('a').children('img').attr('src');
			console.log(sSrc)
			$('.showmidden').children('img').attr('src',sSrc);
			$('.move').children('img').attr('src',sSrc);
			$('.bigwindow').children('img').attr('src',sSrc)
		})
	})
		
		
	//加入购物车成功表现	
	$('.pageFRGWC').on('click',function(){
		var sr = $('#txt').val()
			pri = $('.goods-price-txt em').text()
		$('#zoom').show();
		$('.queren').show();
		$('.sl').text(sr)
		$('.jg').text("￥"+sr*pri)
		
	})
	$('.guanbi,.hou1').on('click',function(){
		$('#zoom').hide();
		$('.queren').hide();
	})
	
	
	
	
	
	
	
			
	
})


