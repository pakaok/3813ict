# 3813ict_Assignment


**s5228571 Jaeseok Kim**
-------------

# Organization of my Github

As this is an individual tasks(assignment), I have used only **main** branch in repository named **3813ict** of github. Its updated when every functions or html components defined. However, there are several updates in one commit as Angular keep using cmd because of "ng serve", which means I cannot often do git commit.


# Data Structures

{
**"*user*":[
["super","superemail","Super",4],["gadmin1","gademail","GroupAdmin",3],["user1","user1email","User",2,{"g1":["1"],"g2":["1"]},[]],["gassis1","gassisemail","GroupAssis",2,{"g1":["1"],"g2":[]},["g1"]]
],**
**"*groups*":{"g1":["1","2"],"g2":["1","2"]}**,
**"*grouplist*":["g1","g2"]**
}


> ***user***

represents all users which contain Super admin,

Group admin, Group Assistant, and standard user. Each array within ***user*** reperents as follows:

 1. **[** Username,  
 2. Useremail,  
 3. ID,  
 4. Role,  
 5. {Group that user belongs to: Channel that user belongs to}, 
 6. [Group that user has been assigned as Group Assistant] **]**


Super and Group admin have **no** 5 and 6 as those are able to **access all channels and groups** because of Authorisation to create them.

**4. Role** represents as follows: Super Admin as 4, Group admin as 3, Group assistant as 2, Standard user as 1. 

Username and Email are used as ID and PW in Login Page for user authentication.



> "*groups*":{"g1":["1","2"],"g2":["1","2"]}

In this object, each key represents group and each value as Array represents channels that belong to each group, within database.



> grouplist*":["g1","g2"]

This grouplist represents all groups within database.





## Rest API

Three of routes have been used, which are **/login**,  **/db/rs**,  and **/db/rq**. 



> **/login**
> 
    app.post('/login',function(req,res){
    let  db = JSON.parse(fs.readFileSync('./db.json','utf8'))
    console.log(db)
    db.user.forEach(e  => {
    if(e[0]==req.body.id&&e[1]==req.body.pw){
    res.send({valid:true,id:e[0],level:e[3]})
    }})})
Description: 
req represents request from client side and res represents response from server side. Once server recieved request from client with data, it will call JSON file from './db.json' and compare data from client side to data from JSON file. If there is any same data in both of client and server, then server will send an object which consists of valid:true, user id, user level(role).
This route is used for user authentication (Login)

>**/db/rq**

    app.get('/db/rq',function(req,res){
    fs.readFile('./db.json','utf8',function(err,data){
    res.send(data)
    console.log('Data Sent')
    })})
Description: 
If server recieved request from client, it will send JSON file to client
This is used for client to get database after user authentication.

>**/db/rs**

    app.post('/db/rs',function(req,res){
    fs.writeFileSync('./db.json',JSON.stringify(req.body))
    console.log("Data received")
    })
Description:
if server recieved request from client with data, server will store(write) data into './db.json' after converting it to string.
This is used to store database.
## Angular Architecture

 - app component 
 - sup-ad component
 - login component
 - server-service service

When Angular serves, it directs to app component. However, as User Login is necessary, it has been modified to directs to login component right after directing to app component. Therefore, there is no action in app component except for routing to login component. In login component, when user authenticated, it directs to sup-ad component. In sup-ad component, there are different content views, which user can see, based on user role. Unless user logs out, whenever restarting Angular page, Angular will directs user to sup-ad component because user's information is stored in local storage.
Service has not been used in Phase 1 although it exists.
## Rename a file

You can rename the current file by clicking the file name in the navigation bar or by clicking the **Rename** button in the file explorer.