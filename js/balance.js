$(function(){
			
		//省市区
			$.get( 
				"address.json",
				function(data){
					var html="";
					for (var i = 0; i < data.regions.length; i++) {
					html += "<option class='shengname' value='"+i+"'>"+ data.regions[i].name+"</option>";
					}
					$(html).appendTo(".sheng");
				}
			)
	
		$(".sheng").on("change",function(){
			   
			var indexsheng= $(".sheng option:selected").index()-1;
			$.get(
					"address.json",
					function(data){
						var html="<option>--请选择--</option>";
						for (var i = 0; i < data.regions[indexsheng].regions.length; i++) {
						html += "<option class='shiname' value='"+i+"'>"+ data.regions[indexsheng].regions[i].name+"</option>";
						}
						$(".shi").html(html);					
					}
			)
			
		})
		$(".shi").on("change",function(){
			var indexsheng= $(".sheng option:selected").index()-1,
					indexshi=$(".shi option:selected").index()-1;
				
			$.get(
					"address.json",
					function(data){
						var html="<option>--请选择--</option>";
						for (var i = 0; i < data.regions[indexsheng].regions[indexshi].regions.length; i++) {
						html += "<option class='xianname' value='"+i+"'>"+ data.regions[indexsheng].regions[indexshi].regions[i].name+"</option>";
						}
						$(".qu").html(html);
					
						
					}
				)
			
		})
		
		//点击添加新地址
		$('.djtj').on('click',function(){
			$('#zoom').fadeIn(200);
			$('.txdz').fadeIn(200);
			$('.txt').val('');
			$('.dianhua').val('');
			$('.dizi').val('');
		})
		//电话号码的判断
		$('.dianhua').focusout(function(){
			var  aff =  $('.dianhua').val(),
			    reg = /^1[34578]\d{9}$/g;
				var b = reg.test(aff);
			if(b){
				
				$('.jianyan3').text('')
			}
			if(!b){
				$('.jianyan3').text('请输入正确的11位手机号码')
			}
		})
		
		//姓名的判断
		
		$('.txt').focusout(function(){
			var  afv =  $('.txt').val();
			if(afv === ''){
				$('.jianyan1').text('请输入收件人姓名')
			}else{
				$('.jianyan1').text('')
			}
		})
		
		//详细地址的判断
		$('.dizi').focusout(function(){
			var  afc =  $('.dizi').val();
			if(afc === ''){
				$('.jianyan2').text('请输入详细地址')
			}else{
				$('.jianyan2').text('')
			}
		})
		
		
		
		
		//添加窗口的关闭
		$('.quxiao').on('click',function(){
			$('#zoom').fadeOut(200);
			$('.txdz').fadeOut(200);
			
		})
		
		
		//页面初始化
		$.cookie.json = true;
		var products = $.cookie('places');
			$.each(products, function(index,element) {
				console.log(element.name)
				$('<li class="ads adss"><div class="adsname"><em class="icon4"></em><span>'+element.name+'</span><a href="javascript:;" class="right moren">默认地址</a></div><div class="adsplace"><em class="icon5"></em><span>'+element.shengs+'</span><span>'+element.shis+'</span><span>'+element.qus+'</span><span class="xxdz">'+element.dizhi+'</span></div><div class="adsphone"><em class="icon6"></em><span>'+element.phone+'</span><span class="right"><a href="javascript:;" style="margin-right: 15px;" class="moren1">删除</a></span></div></li>').insertBefore('.adsb').data('product',element)
		});	
		
		
		//判断当前是否有地址
		var  dizi = $('.ads').length;
		console.log(dizi)
		if(dizi<=0){
			$('#zoom').show();
			$('.txdz').show();
			$('.txt').val('');
			$('.dianhua').val('');
			$('.dizi').val('');
		}
		//创建新地址
		
		//获取到用户的地址
		$('.carTkSaveAddImg').on('click',function(){
			var jianYan1 = $('.txt').val(),
				jianYan2 = $('.dizi').val(),
				jianYan3 = $('.dianhua').val(),
				jianYan4 = $('.jianyan3').text();
			if(jianYan1 ==='' || jianYan2==='' || jianYan3 ===''|| jianYan4){
				alert('请完善个人信息');
				return
			}
			$('.ads').remove();
		//新建一个对象储存用户地址信息	
			var place={
					name : $('.txt').val(),
					phone : $('.dianhua').val(),
					dizhi : $('.dizi').val(),
					shengs : $('.sheng option:checked').text(),
					shis : $('.shi option:checked').text(),
					qus : $('.qu option:checked').text()
				}
				console.log(place)
				//将创建的商品对象保存到数组中再保存会cookie
				//先从cookie中读取数组
				$.cookie.json = true; //cookie中存储的value值是对象
				var places=$.cookie("places");
				//判断是否读取到数组
				if(!places){//未读取到，说明是第一次添加购物车，则创建数组对象
					places = [];
				}
					//将当前次添加到购物车的商品保存到数组中
					places.push(place);
				//将数组保存会cookie
				$.cookie("places",places,{expires:7,path:'/'})	
			
		//放到导航的购物车里面
			var products = $.cookie('places');
			$.each(products, function(index,element) {
				console.log(element.name)
				$('<li class="ads adss"><div class="adsname"><em class="icon4"></em><span>'+element.name+'</span><a href="javascript:;" class="right moren">默认地址</a></div><div class="adsplace"><em class="icon5"></em><span>'+element.shengs+'</span><span>'+element.shis+'</span><span>'+element.qus+'</span><span class="xxdz">'+element.dizhi+'</span></div><div class="adsphone"><em class="icon6"></em><span>'+element.phone+'</span><span class="right"><a href="javascript:;" style="margin-right: 15px;" class="moren1">删除</a></span></div></li>').insertBefore('.adsb').data('product',element)
		});	
		
		
		
		
			$('#zoom').fadeOut(200);
			$('.txdz').fadeOut(200);
			
		
	})	
		
		//地址的删除跟改动
		$('.moren1').each(function(){
		$(this).on('click',function(){
			var $row = $(this).parents('.ads');
			delee($row);
			var products = $.cookie('places'),
			len =products.length ;
			if(!products||products.length === 0){
				$('#zoom').fadeIn(200);
				$('.txdz').fadeIn(200);
				$('.txt').val('');
				$('.dianhua').val('');
				$('.dizi').val('');
		
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
					$.cookie('places',products,{expires:7, path:"/"});
					//从页面中删除这个li
					$row.remove();
				
			}		
		
		
		
		
})	


				
























