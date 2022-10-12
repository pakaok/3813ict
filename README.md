# 3813ict_Assignment
https://github.com/pakaok/3813ict

**s5228571 Jaeseok Kim**
-------------

# Organization of my Github

As this is an individual tasks(assignment), I have used only **main** branch in repository named **3813ict** of github. Its updated when every functions or html components defined. However, there are several updates in one commit as Angular keep using cmd because of "ng serve", which means I cannot often do git commit.

All commits were done when I have functions or meaningful implementation including installation of node modules. functions or implementation in progress were not committed.

# Data Structures

MongoDB
collections: user, groups, grouplist, userimage, history

---


> Collection: User
> 
> _id : user, {info:
 1. **[** Username,  
 2. Useremail,  
 3. ID,  
 4. Role,  
 5. {Group that user belongs to: Channel that user belongs to}, 
 6. [Group that user has been assigned as Group Assistant] **]**
}

represents all users which contain Super admin,
Group admin, Group Assistant, and standard user. 

Super and Group admin have **no** 5 and 6 as those are able to **access all channels and groups** because of Authorisation to create them.

**4. Role** represents as follows: Super Admin as 4, Group admin as 3, Group assistant as 2, Standard user as 1. 

Username and Email are used as ID and PW in Login Page for user authentication.

---

> Collection : group
> 
> _id: groups , info :{"g1":["1","2"],"g2":["1","2"]}

In this collection, each key represents group and each value as Array represents channels that belong to each group, within database.

---

> Collection : grouplist
> _id: grouplist, info: ["g1","g2"]

This grouplist represents all groups within database.

---
> Collection: Userimage
> _id: userimage, info:{ {system:"localhost:3000/image/system.png"} }

This collection represents userimage used in chats or profile. Image url is in object which would be called by backend side.

---
> Collection: history
> _id: chat_room_name, info: { msg: '', img: false, username: '', path: ''}

This collections is used to store each chat history. **msg** represents message, **img** represents whether image file has been contained in message, and **path** represents where image file is located (only used when **img** is **true**)



## Rest API

Three of routes have been used, which are as follows:

 - **/login**
 -  **/db/rs**
 - **/db/rq**
 - **/db/rq/history**
 - **/db/rs/history**
 - **/image/:p**
 - **/api/img**
----
Variables

    const  db = mongo.db('dbs')
    user_db = db.collection('user')
    groups_db=db.collection('groups')
    grouplist_db=db.collection('grouplist')
    history_db=db.collection('history')
    userimage_db=db.collection('userimage')
----


> **/login**

    app.post('/login',async  function(req,res){
    let  login_info = await  user_db.findOne({})
    login_info.info.forEach(e  => {
    if(e[0]==req.body.id&&e[1]==req.body.pw){
    res.send({valid:true,id:e[0],level:e[3]})
    }});})

Description: 
req represents request from client side and res represents response from server side. Once server recieved request from client with data, it will call object from mongoDB and compare data from client side to data from mongoDB. If there is any same data in both of client and server, then server will send an object which consists of valid:true, user id, user level(role).
This route is used for user authentication (Login)

---
>**/db/rq**

    app.get('/db/rq',async  function(req,res){
    g = await  groups_db.findOne({})
    front_db.groups = g.info
    gl= await  grouplist_db.findOne({})
    front_db.grouplist=gl.info
    us= await  user_db.findOne({})
    front_db.user=us.info
    img = await  userimage_db.findOne({})
    front_db.userimage=img.info
    res.send(front_db)
    console.log('Data Sent')
    })

Description: 
If server recieved request from client, it will send object file to client after combining into one object file named "front_db".
This is used for client to get database after user authentication.

---
>**/db/rs**

    app.post('/db/rs',async  function(req,res){
     user_db.updateOne({_id:'user'},{$set:{info:req.body.user}}).then(
      grouplist_db.updateOne({_id:'grouplist'},$set:info:req.body.grouplist}}).then(
       groups_db.updateOne({_id:'groups'},{$set:{info:req.body.groups}}).then(
    userimage_db.updateOne({_id:'userimage'},{$set:{info:req.body.userimage}}).then(
    console.log('Data Recieved')
    ))))})

Description:
if server recieved request from client with data, server will store(write) data into corresponding collections after breaking it down into individual documents.
This is used to store database.

---

> **/db/rs/history**

    app.post('/db/rs/history',async  function(req,res){
    let  history = await  history_db.findOne({_id:req.body._id})
    if (history!=null){
    history_db.updateOne({_id:req.body._id},{$set:{info:req.body.info}}).then(
    console.log('update chat'))
    }else  if (history==null){
    history_db.insertOne({_id:req.body._id,info:req.body.info},(err,result)=>{
    console.log('insert chat')
    })}})

Description:
 If there is any updated chat, then it will be stored via this route. If it is already exists, then updated, if not, inserted as new document.

---

> **/db/rq/history**

    app.post('/db/rq/history',async  function(req,res){
    let  history = await  history_db.findOne({_id:req.body._id})
    res.send(history)
    console.log('history requested')
    })

Description:
if client joined any room for chat, server will send corresponding chat history into client via this route.

---

> **/image/:p**

    app.get('/image/:p',function(req,res){
    console.log(req.params.p)
    res.sendFile(__dirname+'/img/'+req.params.p);
    })
Description:
If client request any image for profile setting or image chat, then this route would be used to send requested one

---
## Angular Architecture

 - app component 
 - sup-ad component
 - login component
 - server-service service

When Angular serves, it directs to app component. However, as User Login is necessary, it has been modified to directs to login component right after directing to app component. Therefore, there is no action in app component except for routing to login component. In login component, when user authenticated, it directs to sup-ad component. In sup-ad component, there are different content views, which user can see, based on user role. Unless user logs out, whenever restarting Angular page, Angular will directs user to sup-ad component because user's information is stored in local storage.
Service has been used for socket.io. Every functions relevant to socket.io will be called via service.

In Sup-ad component, ngSwitch is used to navigate to other sections. There are 5 cases of ngSwitch.
1. In case of 4, it is used for displaying components which **super admin** can only use, which is assignment to group admin or removing users.
2. In case of 3, it is used for displaying components which **group admin or the equivalent user** can only use, which is as follows: 
    - Create group
    - Create channel
    - Create user
    - Manage User in group
    - Assign user as group assistant
3. In case of 2, it is used for displaying components which **group assistant or the equivalent user** can only use, such as management of standard users in given groups 
4. In case of 1, it is used for chat function. User can select group and channel according to its role. Once joined chats by selecting channel and group, corresponding chat history will be displayed.
5. In case of 0, it is used for profile image setting. Users can set up their profile image in this section, which will be used as identifier in chat section.
---
## Unit test 

1. Open the command prompt
2. Go to server folder
3. **npm test**