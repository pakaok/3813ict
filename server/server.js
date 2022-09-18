var express = require('express')
var app = express()
var cors = require('cors')
var fs = require('fs')
var http = require('http').Server(app)
var bodyParser = require('body-parser')
var formidable = require('formidable')
const path = require('path')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const Mongoclient= require('mongodb').MongoClient
const mongo=new Mongoclient(url)
const url= 'mongodb://localhost:27017'

const io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:4200",
        methods: ['GET','POST']
    }
})

mongo.connect((err)=>{
    const db = mongo.db('3813ict')
    user_db = db.collection('user')
    groups_db=db.collection('groups')
    grouplist_db=db.collection('grouplist')
    history_db=db.collection('history')

    app.post('/login',function(req,res){
        let db = JSON.parse(fs.readFileSync('./db.json','utf8'))
        console.log(db)
        db.user.forEach(e => {
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
})

app.use(cors())
http.listen(3000,()=>{
    var d = new Date()
    var n = d.getHours()
    var m = d.getMinutes()
    console.log('Server has been started at : ' + n + ' : '+ m)
})

rooms=[['id','roomName','username']]

io.on('connection',(socket)=>{
    socket.on('join',(roomName)=>{
        find=rooms.some((v)=>{return v[0]==socket.id&&v[1]==roomName[0]})
        console.log('o')
        if(!find){
            rooms.push([socket.id,roomName[0],roomName[1]])
        }
        socket.join(roomName[0])
        io.to(roomName[0]).emit('msg',{msg:'*** '+roomName[1]+': has joined ***'})
        console.log(rooms)
    })

    socket.on('msg',(msg)=>{
        for (let i = 0; i < rooms.length; i++) {
            if(rooms[i][0]==socket.id){
                currentRoom=rooms[i][1]
            }
        }
        io.to(currentRoom).emit('msg',msg)
        console.log(msg)

    })

    socket.on('disconnect',(x)=>{
        for (let i = 0; i < rooms.length; i++) {
            if(rooms[i][0]==socket.id){
                leavingRoom = rooms[i][1]
                username=rooms[i][2]
                socket.leave(leavingRoom)
                rooms.splice(i, 1)
                io.to(leavingRoom).emit('msg',{msg:'*** '+username+ ': left room ***'})
                console.log('leavedisconnect')
            }
        }
    })
})


app.use(express.static(path.join(__dirname,'../dist/assignment/')))
app.use('/images',express.static(path.join(__dirname,'./img')))
app.get('/image/:p',function(req,res){
    console.log(req.params.p)
    res.sendFile(__dirname+'/img/'+req.params.p);
    })

app.post('/api/img',function(req,res){
    var form = new formidable.IncomingForm({uploadDir:'./img'})
    form.keepExtensions = true
    console.log('apiimg connect')
    form.on('error',function(err){
        res.send({
            result:'failed',
            data:{},
            numberOfImages:0,
            message:"Cannot upload images. Error is : "+ err
        })
        throw err
    })

    form.on('fileBegin',(name,file)=>{
        file.filepath = form.uploadDir+'/'+file.originalFilename
    })
    
    form.on('file',(field,file)=>{
        res.send({
            result:'OK',
            data:{'filename':file.originalFilename,size:file.size},
            numberOfImages:1,
            message:"ok"
        })
        console.log('formidable image saved')
    })
    form.parse(req)
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