const path=require('path');
const hbs=require('hbs');
const express=require('express'); //This is to import express
const geocode = require('../../weather-app/utils/geocode');
const forecast = require('../../weather-app/utils/forecast');
const app=express() //This is for initialising a instance of a express for our app
//For Customise Server static service path using app.use().For more perfection use a variable
// app.use(express.static(path.join(__dirname,'../public')))
const port=process.env.PORT||3000

//Define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// app.set('views',path.join(__dirname,'../views'))
//setup static directory to serve
app.use(express.static(publicDirectoryPath))


// app.get('/about',(req,res)=>{
//     res.send([{name:'vishnu'},{name:'aishwarya'},{name:'Ram'}])
// })

// app.get('/weather',(req,res)=>{
//     res.send('<h1>Weather Status</h1>')
// })

//example webpages
//localhost:3000
//localhost:3000/about

//To know about the path we have two java script variables
// console.log(__dirname)
// console.log(__filename)

//We also have core node module named path for finding path of the files to use that first we import it 
//console.log(__dirname)
// console.log(path.join(__dirname,'../views'))

//When we create a public folder which contains index.html file then the below app.get('') from default localhost will never works 

// app.get('',(req,res)=>{
//     res.send('Hello Express!')
// })

// app.get('/help',(req,res)=>{
//     res.send({
//         name:'vishnu',
//         age:24
//     })
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }
    // console.log(req.query.address)
geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                 forecast:forecastdata,
                 location,
                 address:req.query.address
                
            })
        })
    })
    // res.send({
    //     forecast:'Haze',
    //     location:'pattambi',
    //     address:req.query.address
    // })
})

app.get('/product',(req,res)=>{
    // console.log(req.query.search)
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('',(req,res)=>{
     res.render('index',{
        title:'Weather',
        name:'vishnu'
     })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'vishnu'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText:'This is some usefull text',
        name:'vishnu'
    })
})

// app.get('*',(req,res)=>{
//     res.send('404 Page!')
// })
// app.get('/help/*',(req,res)=>{
//     res.send('404 help article page not found!')
// })
// the above method is not working properly ,So we followed in the below method
app.get('/help/{*any}',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'vishnu',
        errormsg:'/help/path double route Not Found!'
    })
})
app.get('/{*any}',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'vishnu',
        errormsg:'Not Found!'
    })
})

app.listen(port,()=>{
    console.log('App is listening on port: '+port)
})


