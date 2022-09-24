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
const url= 'mongodb://localhost:27017'
const mongo=new Mongoclient(url)
front_db={};


const io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:4200",
        methods: ['GET','POST']
    }
})

mongo.connect((err)=>{
    const db = mongo.db('dbs')
    user_db = db.collection('user')
    groups_db=db.collection('groups')
    grouplist_db=db.collection('grouplist')
    history_db=db.collection('history')
    userimage_db=db.collection('userimage')

    app.post('/login',async function(req,res){
        let login_info = await user_db.findOne({})
        //console.log(login_info)
        login_info.info.forEach(e => {
            if(e[0]==req.body.id&&e[1]==req.body.pw){
                res.send({valid:true,id:e[0],level:e[3]})
            }
        });
    })
    app.get('/db/rq',async function(req,res){
        g = await groups_db.findOne({})
        front_db.groups = g.info
        gl= await grouplist_db.findOne({})
        front_db.grouplist=gl.info
        us= await user_db.findOne({})
        front_db.user=us.info
        img = await userimage_db.findOne({})
        front_db.userimage=img.info
        res.send(front_db)
        console.log('Data Sent')
    })
    
    app.post('/db/rs',async function(req,res){
           user_db.updateOne({_id:'user'},{$set:{info:req.body.user}}).then(
            grouplist_db.updateOne({_id:'grouplist'},{$set:{info:req.body.grouplist}}).then(
                groups_db.updateOne({_id:'groups'},{$set:{info:req.body.groups}}).then(
                    userimage_db.updateOne({_id:'userimage'},{$set:{info:req.body.userimage}}).then(
                        console.log('Data Recieved')
                    )))
            ) 
           
    })

    app.post('/db/rs/history',async function(req,res){
        let history = await history_db.findOne({_id:req.body._id})
        if (history!=null){
            history_db.updateOne({_id:req.body._id},{$set:{info:req.body.info}}).then(
                console.log('update chat'))
        }else if (history==null){
            history_db.insertOne({_id:req.body._id,info:req.body.info},(err,result)=>{
                console.log('insert chat')
            })
        }
    })

    app.post('/db/rq/history',async function(req,res){
        let history = await history_db.findOne({_id:req.body._id})
        res.send(history)
        console.log('history requested')
        //console.log(history)
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
        io.to(roomName[0]).emit('msg',{msg:'*** '+roomName[1]+': has joined ***',username:'system'})
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
                io.to(leavingRoom).emit('msg',{msg:'*** '+username+ ': left room ***',username:'system'})
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

module.exports = app