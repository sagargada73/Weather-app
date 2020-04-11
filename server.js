const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
const geolocation = require('geolocation');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.use(express.json());
app.get('/',function(req,res){
    res.render('index',{weather:null,error:null});
});

app.post('/',function(req,res){
    city = req.body.city;
    lat = req.body.lat;
    lon = req.body.lon;
    apiKey = '3d3d536cd82fbc755ed3debf513b4bac';
    
    if(city==null){
        url = `http://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&units=metric&lat=${lat}&lon=${lon}`
    }
    else{
        url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lat=${lat}&lon=${lon}`
    }
    request(url,function(err,response,body){
        if(err){
            console.log(err);
        }
        else{
            let weather = JSON.parse(body);
            console.log(weather);
            if(weather.main == undefined){
                res.render('index',{weather:null,error:'Not a valid city name'});
            }
            else{
                weathertext=`Its ${weather.main.temp} celcius in ${weather.name}`;
                console.log(weathertext);
                res.render('index',{weather:weathertext,error:null});
            }
        }
    })
});

app.listen(port,function(){
    console.log(`listening on port : ${port}`); 
})