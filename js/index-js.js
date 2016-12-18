$(function(){
	//侧翼
	var winHeight = $(window).height(), // 窗口的高度
		headerHeight = $("#nav").height(); // 头部的高度

			$(window).on("scroll", function(){
				
					// 获取滚动距离
					var scrollTop = $(this).scrollTop();
					// 判断导航的显示与隐藏
					if (scrollTop > headerHeight - winHeight) {
						$(".xuanfu").stop(true).fadeIn();
					} else {
						$(".xuanfu").stop(true).fadeOut();
						return;
					}
			});
			
	//轮播图
	var $lis = $(".banner>li"),// 所有在 #box 下的 li
		len = $lis.length, // li 的个数
		index = 1, // 保存的是下一张显示的图片的索引
		timer = null, // 计时器 ID
		currentIndex = 5;//初始化时候的当前的index
		nextIndex = 0;	//下一张的index
		winWidth = $(window).width(),
		clikWidth = $('.clik').width();
		
		$('.clik').css('left',(winWidth/2-clikWidth/2))	
		// 添加小圆点
		var html = "";
		for (var i = 1; i <= len; i++) {
			html +='<a class="clik-li">'+i+'</a>'
			
		};
		//鼠标移入图片的时候的自动轮播停止
		$("#banner").hover(function(){
			clearInterval(timer)
		},function(){
			timer =	setInterval(move,2000);
		})
		
		//鼠标移入小圆点的时候
		$(html).appendTo('.clik').on('mouseenter',function(){
			index = $(this).index();
			nextIndex = index;
			$(this).addClass('banner-curr').siblings().removeClass('banner-curr');
			move();	
		});
		
		//左右箭头的控制图片的
		$('.banner-left').on('click',function(){
			nextIndex = currentIndex -1;
			if(nextIndex<0){
				nextIndex = 5
			}
			move();
		});
		$('.banner-right').on('click',function(){
			move()
		})

		var circles = $('.clik-li');//获取当前小圆点的合集
			move();//初始化运动的开始
			timer =	setInterval(move,2000);
			function move() {
				//当前页面的轮播图的淡出与下一张轮播图的淡入
				$(".banner>li").eq(currentIndex).stop(true).fadeOut(500);
				$(".banner>li").eq(nextIndex).stop(true).fadeIn(500);
				//小圆点样式的同步改变
				for (var i = 0; i < len; i++) {
					circles[i].className = "clik-li";
				};
				
				circles[nextIndex].className = "clik-li banner-curr";
				
				currentIndex = nextIndex;
				nextIndex++;
				
				if (nextIndex >= len){
					nextIndex = 0;
				}	
			}
		
		
		//热门推荐里面的动态效果
		$('.movepic').hover(function(){
			$(this).animate({right:0},500)
		},function(){
			$(this).animate({right:-20},500)
		})
		
		//品牌列表里面动态效果
		//鼠标移入商品图片显示商品文本
		$('.brand-list dd').each(function(index,element){
			
			$(this).hover(function(){
			$(this).children().children('.brand-txt').fadeIn(400);
			},function(){
			
			$(this).children().children('.brand-txt').fadeOut(400);
			}
			)
		})
		
		
		
		
		
		
		

		
			
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})




















































