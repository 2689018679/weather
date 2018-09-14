    let citys
    let city
    $.ajax({
        url:"https://www.toutiao.com/stream/widget/local_weather/city/",
        type:"get",
        dataType:"jsonp",
        success:function (e) {
            citys=e.data
            let str=""
            for(key in citys){
                str+=`<p>${key}</p>`
                str+=`<ul>`
                for(key2 in citys[key]){
                    str+=`<li class="city">${key2}</li>`
                }
                str+=`</ul>`
            }
            $(str).appendTo($(".hotcity"))
        }
    })

        $.ajax({
            url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=太原`,
            type: "get",
            dataType: "jsonp",
            success:function (e) {
                updata(e.data)
    
            }
        })
  


$(function () {

    $(".audioBtn").click(function (e) {
        e.stopPropagation()
        let speech=window.speechSynthesis
        let speechset=new SpeechSynthesisUtterance()
        let text=$("header span").text()+"当前温度"+$(".screen h3 span").text()+"摄氏度"+$(".screen h4 span").text()+$(".screen h5 span").text()+"级"
        speechset.text=text
        speech.speak(speechset)
    })
    $("header").click(function () {
        $(".cityBox").slideDown()
    })
    $(".search a").click(function () {
        $(".cityBox").slideUp()
    })

    $(".cityBox").on("touchstart",function (event) {
        if(event.target.className=="city"){
            city = event.target.innerText
            $.ajax({
                url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${city}`,
                type: "get",
                dataType: "jsonp",
                success:function (e) {
                    updata(e.data)

                }
            })
        }

        $(".cityBox").slideUp()

    })

})

    function updata(data){
        $("header span").text(data.city)
        $(".aqi span").eq(0).text(data.weather.aqi).end().eq(1).text(data.weather.quality_level)
        $(".screen h3 span").text(data.weather.current_temperature)
        $(".screen h4 span").text(data.weather.dat_condition)
        $(".screen h5 span").text(`${data.weather.wind_direction}${data.weather.wind_level}`)
        $(".day .today span").eq(1).text(`${data.weather.dat_high_temperature}/${data.weather.dat_low_temperature}`)
        $(".day .today span").eq(2).text(data.weather.day_condition)
        $(".day .tomorrow span").eq(1).text(`${data.weather.tomorrow_high_temperature}/${data.weather.tomorrow_low_temperature}`)
        $(".day .tomorrow span").eq(2).text(data.weather.tomorrow_condition)

        let str=""
        let week=['日','一','二','三','四','五','六']
        let x=[]
        let high=[]
        let low=[]
        for(obj of data.weather.forecast_list){
            let date=new Date(obj.date).getDay()
            x.push("星期"+week[date])
            high.push(obj.high_temperature)
            low.push(obj.low_temperature)
            str+=`<li>
                    <p class="day1">星期${week[date]}</p>
                    <p class="data">${obj.high_temperature}/${obj.low_temperature}</p>
                    <p class="dayweather">${obj.condition}</p>
                    <img src="img/${obj.weather_icon_id}.png" alt="" class="dayweatherimg">
                    <p class="wind">${obj.wind_direction}</p>
                    <p class="wind"><span>${obj.wind_level}</span>级</p>
                </li>`

        }
        $(".week").append(str)

        var myChart = echarts.init($(".chart")[0]);

        // 指定图表的配置项和数据
        var option = {
            xAxis: {
                data: x,
                show:false
            },
            yAxis: {
                show:false
            },
            grid:{
                left:0,
                right:0,
                top:0,
                bottom:0
            },
            splitLine:{show: false},
            series: [{
                name: '最高温度',
                type: 'line',
                data: high
            },{
                name: '最低温度',
                type: 'line',
                data: low
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

    }


