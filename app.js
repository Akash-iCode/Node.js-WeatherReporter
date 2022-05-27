const express=require("express");
const https=require("https");
var bodyParser = require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    console.log(req.body.userName)
    var query = req.body.cityName;
    var userNm = req.body.userName;
    var unit = "metric";
    var apiKey = "1c21caaeec991c5c77477dbf269362d9";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey;
    
    https.get(url, function(response){
        console.log("Server Response Status Code is : "+response.statusCode) 
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            //console.log(weatherData)
            const temp=weatherData.main.temp;
            console.log("Temperature in Degree Celcous is : "+(temp));
            const weatherDescription = weatherData.weather[0].description
            const icon=weatherData.weather[0].icon
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write(" <h1>Het There !!! , " + userNm+ " heres what you requested : </h1><b><hr><br>")
            res.write("<h1>Weather Description for " +query+ " Region is :  "+weatherDescription+"</h1>")
            res.write("<b><hr><br><h2>Temprature Description for "+ query+" Region is : "+ temp+" Degree Celcius</h2>")
            res.write("<b><hr><br><img src="+imageURL+">");
            res.send()
          })
          const object={
            name:"Akash ",
            favouriteFood:"Ichiraku Ramen"
          }
          console.log(JSON.stringify(object));
    } )
});

app.listen(3000,function(){
  console.log("Server is running on port 3000.");
})
