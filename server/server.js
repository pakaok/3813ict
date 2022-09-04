var express = require('express')
var app = express()
var cors = require('cors')
var fs = require('fs')
var http = require('http').Server(app)
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:4200",
        methods: ['GET','POST']
    }
})

app.use(cors())
http.listen(3000,()=>{
    var d = new Date()
    var n = d.getHours()
    var m = d.getMinutes()
    console.log('Server has been started at : ' + n + ' : '+ m)
})

app.post('/login',function(req,res){
    let db = JSON.parse(fs.readFileSync('./db.json','utf8'))
    console.log(db)
    db.user.forEach(e => {
        console.log(e)
        if(e[0]==req.body.id&&e[1]==req.body.pw){
            res.send({valid:true,id:e[0],level:e[3]})
        }
    });
})
app.get('/db/rq',function(req,res){

    fs.readFile('./db.json','utf8',function(err,data){
        res.send(data)
        console.log('Data Sent')
    })

})

app.post('/db/rs',function(req,res){
       
       
        fs.writeFileSync('./db.json',JSON.stringify(req.body))
        console.log("Data received")


})


// app.post('/api/auth',function(req,res){
//     let users= [{username:'Al',birthdate:'1900/01/1',age:'3',email:'a', password:'s',valid:false}]

//     if (!req.body){
//         return res.sendStatus(400)
//     }

//     var customer = {}
//     customer.email=req.body.email
//     customer.password=req.body.password
//     customer.valid = false
//     console.log(customer)
//     find =  users.some(e => (e.email==customer.email&&e.password==customer.password))
    
//         if (find){
//             users.forEach(e=>{
//                 if (e.email==customer.email&&e.password==customer.password){
//                 customer = e
//                 customer.valid = true
//             }
//         })
//         }

// io.on('connection',(socket)=>{
//     console.log('Connected on server.js'+',  '+socket.id)

//     socket.on('msg',(msg)=>{
//         io.emit('msg',msg)
//     })
// })

// var server = http.listen(3000,function(){
//     console.log('server listening')
// })

// app.post('/api/auth',function(req,res){
//     let users= [{username:'Al',birthdate:'1900/01/1',age:'3',email:'a', password:'s',valid:false}]

//     if (!req.body){
//         return res.sendStatus(400)
//     }

//     var customer = {}
//     customer.email=req.body.email
//     customer.password=req.body.password
//     customer.valid = false
//     console.log(customer)
//     find =  users.some(e => (e.email==customer.email&&e.password==customer.password))
    
//         if (find){
//             users.forEach(e=>{
//                 if (e.email==customer.email&&e.password==customer.password){
//                 customer = e
//                 customer.valid = true
//             }
//         })
//         }
    
    
//     res.send(customer)

// })