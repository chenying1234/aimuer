$(function(){
//点击value消失
	$('#txt').focus(function(){
		$('.uerserror p').text('')
		if($('#txt').val() === '请输入手机号'){
			$('#txt').val('')
		}
		if($('#txt').val() !== '请输入手机号'){
			$('#txt').css({
					'color':'#000',
					'border-color':'#7a7a7a',
					'border-weight':"1px",
					'border-style':"solid"
				})
		}
		
	})
	
	//当user失去焦点的时候
	$('#txt').focusout(function(){
		$.cookie.json = true;
		var vatxt = $('#txt').val(),
			reg = /^1[34578]\d{9}$/g,
			bbb = $.cookie('userl');
			console.log(bbb);
			
			if(vatxt === ''){
			$('#txt').val('请输入手机号')
			$('#txt').css({
					'color':'rgb(153,153,153)',
					'border-color':'#D93246',
					'border-weight':"1px",
					'border-style':"solid"
				})
		}
		
		if(vatxt === ''){
			
			$('.uerserror p').text('请输入登录名')
		}
		if(vatxt === '请输入手机号'){
			$('.uerserror p').text('')
			$('#txt').css({
					'color':'rgb(153,153,153)',
					'border-color':'#D93246',
					'border-weight':"1px",
					'border-style':"solid"
				})
		}
		
		
		var b = reg.test(vatxt);
		if(b){
			
			$('.uerserror p').text('')
		}
		if(!b){
			$('.uerserror p').text('请输入正确的11位手机号码')
		}
		
		for(var attr in bbb){
				if(bbb[attr].user === vatxt){
					console.log($('.uerserror p'));
					$('.uerserror p').text('该用户名已存在');
					console.log("in");
				};
			}
		
		
	})
	
	$('#pasword1').focusout(function(){
		var reg = /^\w{6,12}$/g,
			ttt = $('#pasword1').val();
		if($('#pasword1').val() === ''){
			$('.passerror1 p').text('请输入6-12位密码且不能有特殊符号(区分大小写)')
		}
		var b = reg.test(ttt);
		if(b){
			$('.passerror1 p').text('')       
		}
		if(!b){
			$('.passerror1 p').text('请输入正确的密码格式')
		}
		if($('#pasword2').val() !== $('#pasword1').val() ){
			$('.passerror2 p').text('两次密码不一致')
		}
		if($('#pasword2').val() === $('#pasword1').val() ){
			$('.passerror2 p').text('')
		}
	})
	
	$('#pasword2').focusout(function(){
		if($('#pasword2').val() === ''){
			$('.passerror2 p').text('请输入6-12位密码且不能有特殊符号(区分大小写)')
		}
		
		if($('#pasword2').val() !== $('#pasword1').val() ){
			$('.passerror2 p').text('两次密码不一致')
		}
		if($('#pasword2').val() === $('#pasword1').val() ){
			$('.passerror2 p').text('')
		}
		
	})
	
	//验证码的验证规则
	$('.zhucheButton').on('click',function(){
		var lol = $('#yanzhema').val(),
			
			olo = $('.yzm').attr('title');
		if(lol !== olo){
			$('.yzmerror p').text('验证码错误')
					}
		if(lol === olo){
			$('.yzmerror p').text('')
		}
	})
	
	//判断是否注册成功的条件
	$('.zhucheButton').on('click',function(){
		if($('.passerror2 p').text()=== '' &&$('.passerror1 p').text() === '' &&$('.uerserror p').text() === '' &&$('.yzmerror p').text() === ''){
			//账号信息存入cookie里面
				var users = {
					user : $('#txt').val(),
					pas  : $('#pasword1').val()
				}
				$.cookie.json = true; //cookie中存储的value值是对象
				var userl=$.cookie("userl");
				//判断是否读取到数组
				if(!userl){//未读取到，说明是第一次添加购物车，则创建数组对象
					userl = [];
				}
				//判断数组是否存在之前选购商品
				var index = findIndex(users.user,userl);
				console.log(users.user)
				if(index === -1){
					console.log('1')
					//将当前次添加到购物车的商品保存到数组中
					userl.push(users);
				}else{
					console.log('2')
				}
				console.log(userl)
				//
				//将数组保存会cookie
				$.cookie("userl",userl,{expires:7,path:'/'})	
				
				
			window.location.href='../indesx.html'
		}
	})
	
				function findIndex(id,products){
							for(var attr in products){
								
								if(products[attr].user === id){
									return attr;
								}
							}
								return -1;
						}		
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})