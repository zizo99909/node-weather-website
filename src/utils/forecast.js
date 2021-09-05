const request = require ('postman-request')

const forecast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=9b0838ccd0ebe67975c3436ed3b79494&query='+encodeURIComponent(long)+','+encodeURIComponent(lat)+'&units=f'
    request({url,json:true},(error,{body}={})=>{
    if(error){
      callback('unable to connect to weather service!',undefined)
    }else if(body.error){
      callback('unable to find location',undefined)
    }else{
    callback(undefined,body.current.weather_descriptions[0]+'. its currently ' + body.current.temperature + ' degrees out and it feels like '+body.current.feelslike + ' degrees')
    }
    
    
    })
    }    

    module.exports=forecast