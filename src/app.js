const path =require('path')
const express =require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast=require('./utils/forecast')

const app =express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath =path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
//setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)
//setup static diretory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
   res.render('index',{
       title: 'Weather',
       name:'ziyad wael'
   })

})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Ziyad Wael'   
    })
})
app.get('/help',(req,res)=>{
res.render('help',{
helpText: 'This page is to help you',
title:'help',
name:'Ziyad Wael'
})

})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error :'you must provide address'
    })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{

        if(error){
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
               return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
                
                 })
            
          })
        })


})


app.get('/help/*',(req,res)=>{
res.render('404',{
    title:'404',
    name:'Ziyad Wael',
    errorMessage: 'Help article not found'
})

})



app.get('*',(req,res)=>{
res.render('404',{
    title:'404',
    name:'Ziyad Wael',
    errorMessage: 'page not found'
})

})

app.listen(port,()=>{
console.log('server is on port '+ port)

})