const request=require('request')


const forecast=(latitude,longitude,callback)=>{
    url='https://api.weatherstack.com/current?access_key=ae1503e55b68b13dae9cbaf9e03a963d&query=' + latitude+','+longitude
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect weather service!',undefined)
        }else if(body.error){
            const msg=body.error.type
            callback('Unable to find location!.Cause: '+msg,undefined)
        }else{
            const description=body.current.weather_descriptions[0]
            const temperature=body.current.temperature
            const feelslike=body.current.feelslike
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature +" degress out.But It is Feels like "+body.current.feelslike+" degress out.")
        }
    })
}
module.exports=forecast