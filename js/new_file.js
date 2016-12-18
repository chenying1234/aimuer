document.onclick=function(){
	var pk=[];
	for(var i=0;i<13;i++){
		if(i<12){
			var iNum=[2,3,4,5,6,7,8,9,10,'j','q','k','a'],
				k=parseInt(Math.random()*13)
				g=iNum[k];
			pk.push(g);
			iNum.slice(k,1)
		}

	}
	console.log(pk);
	console.log(iNum);
}
