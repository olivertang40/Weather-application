const express = require('express');
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "563f7d8ccb2688d73c985dc1ae6422ce";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?units="+unit+"&appid=" + apiKey + "&q="+query;

  https.get(url, function(response) {
    console.log(response.statusCode);

  response.on("data", function(data) {
  const weatherData = JSON.parse(data);
  const weatherDescription = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;
  const temp = weatherData.main.temp;
  const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";


  res.write("<h1>The temperature in "+ query + " is " + temp + " degress Celcius.</h1>");
  res.write("<p>The weather is currently " + weatherDescription+".</p>");
  res.write("<img src=" + imageURL+ " alt='weather-img'></img>");
  res.send();
})

  })
})

app.listen(3000, function() {
})
