var express = require('express')
var app = express()
var cors = require('cors')
var fs = require('fs')
var http = require('http').Server(app)
var bodyParser = require('body-parser')

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
console.log(fs.readFileSync('./db.json','utf-8'))
app.post('/db-rq',function(req,res){
    if (!req.body){
        return res.sendStatus(400)
    }
    one=fs.readFileSync('./db.json','utf-8')
    res.send(one)

})

app.post('/db-rs',function(req,res){
    if (!req.body){
        return res.sendStatus(400)
    }else{
        fs.writeFileSync('./db.json',req.body)
    }


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