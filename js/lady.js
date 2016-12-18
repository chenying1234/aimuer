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
	
	//点击展开
	var cle = false;
	console.log(cle)
	$('.dx').each(function(){
		$(this).on('click', function(){
			$(this).parent().next().show();
			$(this).parent().siblings('.list-name').children('a').children('i').addClass('xz');
			cle = true;
			console.log(cle)
			if(cle){
				$('.list-name a').each(function(){
					$(this).hover(function(){
						$(this).children('i').removeClass('xz')
						$(this).children('i').addClass('huaguo')
					},function(){
						$(this).children('i').addClass('xz')
						$(this).children('i').removeClass('huaguo')
					})	
				});
			}
		
				$('.list-name a').on('click',function(){
					$(this).children('i').removeClass('xz')
					$(this).children('i').addClass('xuanzhong')
					
				});
				
				$('.nor').each(function(){
				$(this).on('click', function(){
					$(this).parents('.dxqr').hide();
					$('.list-name a i').removeClass('xz');
					$('.list-name a i').removeClass('xuanzhong');
					cle = false;
			})
				console.log(cle)
		})
			
		});
		
		
		
	})
	
	
	
	
	
})