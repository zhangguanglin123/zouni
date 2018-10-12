
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
	let maxtemper=[];
    let lowtemper=[];
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
		
		//一周天气
		
		let weekweather=tianqi.weather.forecast_list;
		console.log(weekweather);
		weekweather.forEach(function(v){
			let str4=`
			<li>
				<p class="p9">${(v.date).slice(5,7)}/${(v.date).slice(8,10)}</p>
				<p class="p0">${v.condition}</p>
				<div class="biao">
					<img src="img/${v.weather_icon_id}.png"/>
				</div>
			</li>
			`
			$(".u1").append(str4);
			let str5=`
			<li>
				<div class="biao">
					<img src="img/${v.weather_icon_id}.png"/>
				</div>
				<p class="p0">${v.condition}</p>
				<p class="p8">${v.wind_direction}</p>
				<p class="p9">${v.wind_level}级</p>
			</li>
			`
			$(".u2").append(str5);
			maxtemper[maxtemper.length]=v.high_temperature;
            lowtemper[lowtemper.length]=v.low_temperature;
		})
	}
	console.log(maxtemper,lowtemper);
	
	
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
    				$(".weather2 ul").html("");
    				$(".u1").html("");
    				$(".u2").html("");
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
    		for(let i in city){
		        for(let j in city[i]){
		           if(text==j){
		               ajaxs(text);
		               return;
		           }
		        }
		
		      }
		      if(text!==""){
		          alert("该城市不存在");
		        }
    	})
    	
    	
    	
    	  var myChart = echarts.init(document.getElementById('main'));
      
        // 指定图表的配置项和数据
       myChart.setOption({
          title: {
        // text: '未来一周气温变化',
        // subtext: '纯属虚构'
    },
   
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'],
        show: false
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} °C'
        },
        show: false
    },
    //折线距离周围的距离
    grid:{
            left: '-1%',
            top : '15%',
            left: '0',
            bottom: '-15%',
            containLabel:true
        },
    series: [
        {
            name:'最高气温',
            type:'line',
            data: maxtemper,
            itemStyle : { normal: {label : {show: true},lineStyle : {color : '#FFB74D'}}},
            
        },
        {
            name:'最低气温',
            type:'line',
            data: lowtemper,
            itemStyle : { normal: {label : {show: true},lineStyle : {color : '#4FC3F7'}}},
    
        }
    ],


  })
   
    }
	
      

















//1.获取默认城市的天气信息
//2.获取所有城市的信息
//3.点击每个城市可以获取当前城市的天气信息
//4.在搜索框内输入要搜索的城市,点击搜索按钮即可进行搜索