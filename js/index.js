//当页面加载完成时

	
	//1.获取当前城市的天气信息
	let tianqi;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
		dataType:"jsonp",
		success:function(obj){
			tianqi=obj.data;
			console.log(tianqi);
			updata(tianqi);
		}
	})
	//获取天气数据的函数
	function updata(tianqi){
		//获取当前的城市
		$(".s1").html(tianqi.city);
		//获取当前城市的天气状况
		$(".p2").html(tianqi.weather.quality_level);
		//获取当前的温度
		$(".top4").html(tianqi.weather.current_temperature+"°");
		$(".p3").html(tianqi.weather.current_condition);
		$(".p4").html(tianqi.weather.wind_direction);
		
		//今天天气
		$(".w2 p").html(tianqi.weather.dat_low_temperature+"/"+tianqi.weather.dat_high_temperature+"℃");
		$(".w1 p:nth-child(2)").html(tianqi.weather.dat_condition);
		$(".w2 img").attr("src","./img/"+tianqi.weather.dat_weather_icon_id+".png");
		
		//明日天气
		$(".w4 p").html(tianqi.weather.tomorrow_low_temperature+"/"+tianqi.weather.tomorrow_high_temperature+"℃");
		$(".w3 p:nth-child(2)").html(tianqi.weather.tomorrow_condition);
		$(".w3 img").attr("src","./img/"+tianqi.weather.tomorrow_weather_icon_id+".png");
		
		//未来24小时
		let hweather=tianqi.weather.hourly_forecast;
		hweather.forEach(function(v){
			let str=`
			<li>
				<p class="p6">${v.hour}:00</p>
				<img src="img/${v.weather_icon_id}.png"/>
			    <p class="p7">${v.temperature}°</p>
			</li>
			`
			$(".weather2 ul").append(str);
		})
	}
	
	
	
	//点击城市,出现城市页面
	$(".top1").click(function(){
		$(".location").css({"display":"block"});
		$(".box").css({"display":"none"});
	})
	$(".location>header>i").click(function(){
		$(".location").css({"display":"none"});
		$(".box").css({"display":"block"});
	})
	
	let city;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/city/",
		dataType:"jsonp",
		success:function(obj){
			city=obj.data;
			updataCity(city);
			console.log(obj);
		}
	})
	function updataCity(city){
		let k=0;
		for(let i in city){
			let str2=`
			<li>
					<div class="a4">
						${i}
					</div>
					<div class="a5">
						
					</div>
				</li>
			`
			$(".location ul").append(str2);
			for(let j in city[i]){
				let str3=`
				<div class="wa1">
							${j}
						</div>
				`
				$(".a5").eq(k).append(str3);
			}
			k++;
		}
	}
	 window.onload=function(){
    	$(".wa1").click(function(){
    		$(".location").css({"display":"none"});
    		$(".box").css({"display":"block"});
    		let con=$(this).html();
    		ajaxs(con);
    	})
    	function ajaxs(tianqi1){
    		let url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${tianqi1}`;
    		$.ajax({
    			type:"get",
    			url:url1,
    			dataType:"jsonp",
    			success:function(obj){
    				let tianqi2=obj.data;
    				$("").html("");
    				$("").html("");
    				$("").html("");
    				updata(tianqi2);
    			}
    		})
    	}
    	
    	
    	//在搜索框内输入内容  取消变成搜索
    	$(".a1 input").focus(function(){
    		$(".a1 a").html("搜索");
    	})
    	$(".a1 a").click(function(){
    		$(".location").css({"display":"none"});
    		$(".box").css({"display":"block"});
    		let text=$(".a1 input").val();
    		ajaxs(text);
    	})
    }
	

   

















//1.获取默认城市的天气信息
//2.获取所有城市的信息
//3.点击每个城市可以获取当前城市的天气信息
//4.在搜索框内输入要搜索的城市,点击搜索按钮即可进行搜索