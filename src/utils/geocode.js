const request=require('request')
const geocode=(address,callback)=>{
    const url='https://geocode.maps.co/search?q='+address+'&api_key=6669350006c92391879015bsr725f03'
    
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services!',undefined)
        }else if(body.length===0){
            callback('Unable to find location. Try again',undefined)
        }else{
            callback(undefined,{
                latitude:body[1].lat,
                longitude:body[0].lon,
                location:body[1].display_name
                
          })
        }
       

    })
}
module.exports=geocode