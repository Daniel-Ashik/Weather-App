const request=require('request')
const forecast=(latitude,longitude,callback)=>{

    const url='https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=1fcfc5ae4f0d2e2fc8d0735a06703087'
    // const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1fcfc5ae4f0d2e2fc8d0735a06703087`
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to find connection',undefined)
        }else if(body.error){
            callback('Unable to find the Location',undefined)
        }else{
            console.log(body.main.temp_max)
            callback(undefined,
                'It is currently: '+body.main.temp+'Minimum temperature:'+body.main.temp_min+'Maximum temperature:'+body.main.temp_max)
            
        }
    })
}
module.exports=forecast