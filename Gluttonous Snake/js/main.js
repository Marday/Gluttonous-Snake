(function(){
	var oDiv=document.getElementById("main"),
    snakes=[],
    food=[],
    w=document.getElementById("main").clientWidth/30-1,
    h=document.getElementById("main").clientHeight/30-1,
    onewDiv=null;
    for (var i = 0; i < 5; i++) {
    	oNewDiv=document.createElement("div");
        oNewDiv.style.background="url(image/snake"+i+".png)";
        oDiv.appendChild(oNewDiv);
        snakes[i]={o:oNewDiv,dir:"l",x:7+i,y:0,type:"snake"};
        setPos(snakes[i])
    }
    function setPos(obj){
    	obj.o.style.top=obj.y*30+"px";
    	obj.o.style.left=obj.x*30+"px";
    	if(obj.type=="snake"){
    		obj.o.className=obj.dir;    
    	}
    }
    var timer=setInterval(function(){
    	for (var l=snakes.length,i = l-1; i > 0; i--) {
    		snakes[i].x=snakes[i-1].x;
    		snakes[i].y=snakes[i-1].y;
    		snakes[i].dir=snakes[i-1].dir;
    	};
    	var dir=snakes[0].dir;
    	switch(dir){
    		case "l": 
    		    snakes[0].x--;
    		    break;
    		case "r": 
    		    snakes[0].x++;
    		    break;
            case "t":
                snakes[0].y--;
                break;
            case "b":
                snakes[0].y++;
                break;
    	}
    	var x=snakes[0].x,
    	y=snakes[0].y;
    	if(x<0 || x>w || y<0 ||y>h){
    		alert("撞墙了！");
    		clearInterval(timer);
    		return    //当满足这个条件后不再执行后面程序
    	}
    	for (var i = 1; i < l; i++) {
    		if(x==snakes[i].x && y==snakes[i].y){
    			alert("吃自己干什么～");
    			clearInterval(timer);
    			return
    		}
     	}
     	if(x==food[0].x && y==food[0].y){
     		snakes.splice(l-3,0,food[0]);
     		food.shift();
     		if(food.length==0){
     			creatFood();
     		}
     	}
     	for(var i=1;i<food.length;i++){
     		if(x==food[i].x && y==food[i].y){
     			alert("请按成语顺序吃")
     			clearInterval(timer)
     		}
     	}
     	for(var i=0;i<snakes.length; i++){
     		setPos(snakes[i])
     	}
    },200)
    document.onkeydown = function(ev){
		var oEvent = ev || window.event;
		switch(oEvent.keyCode){
			case 37:		//←
			    dir='l';
			    snakes[0].dir='l';
			    break;
			case 38:		//↑
				dir='t';
				snakes[0].dir='t';
				break;
			case 39:		//→
				dir='r';
				snakes[0].dir='r';
				break;
			case 40:		//↓
				dir='b';
				snakes[0].dir='b';
				break;
		}
	};
    var nowRow=0;
    function creatFood(){
    	while(food.length<4){
    	    var food_x=parseInt(Math.random()*w),
    	    food_y=parseInt(Math.random()*h),
    	    allow=false;
    	    for (var i = 0; i < snakes.length; i++) {
    	    	if(snakes[i].x==food_x && snakes[i].y==food_y){
    	    		allow=true;
    	    	}
    	    };
    	    for (var i = 0; i < food.length; i++) {
    	    	if(food_x==food[i].x && food_y==food[i].y){
    	    		allow=true
    	    	}
    	    };
    	    if(!allow){
    	    	if (nowRow==15)alert("恭喜闯关成功");
    	        var nowDiv=document.createElement("div"),
                length=food.length;
                nowDiv.style.background="url(image/iconBg.jpg) -"+length*30+"px -"+nowRow*30+"px"
                oDiv.appendChild(nowDiv);
          	    food[length]={x:food_x,y:food_y,o:nowDiv,type:"food"};
         	    setPos(food[length])
         	    
         	}

    	 }
    	 nowRow++;
    }
    creatFood()
})()