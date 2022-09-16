import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../server-service/service.service';
import {HttpClient,HttpHeaders} from '@angular/common/http'

const httpoptions={
  headers : new HttpHeaders({'Content-Type':'application/json'})
}
const url='http://localhost:3000'
@Component({
  selector: 'app-sup-ad',
  templateUrl: './sup-ad.component.html',
  styleUrls: ['./sup-ad.component.css']
})
export class SupAdComponent implements OnInit {
  db:any = {"user":[["super","supere","Super",4],
  ["gadmin1","gadmine","GroupAdmin",3],
  ["gassis1","gassise","GroupAssis",2,{"g1":["1"],"g2":["1"]},['g1']]],
  "groups":{"g1":['1','2'],"g2":[]},"grouplist":['g1','g2']}

  user_list:any=[]
  user_list2:any=[]
  user_list3:any=[]
  user_list4:any=[]
  user_list_ga:any=[]
  inp={
    super:'none',
    createGroup:'',createChannel:{c:'',g:'none'},user_inv:{new:'',u:'none',g:'none',c:'none'},
    user_rmv:{u:'none',g:'none',c:'none'}, GC_rmv: {c:'none',g:'none'}, groupA:{u:'none',g:'none'},
    assis_a:{u:'none',g:'none',c:'none'},assis_r:{u:'none',g:'none',c:'none'},assis_ch:'',
    join_channel:'',join_group:''
  }
  state=1
  user_level:any=0
  username:any=''
  assis_group=[]
  chat_title='Chat'
  ch_list:any=[[],[],[],[],[]]
  level=''
  user_groupshow:any=['Group : Channel']
  chat_group:any={}
  chat_grouplist:any
  chat_channel:any=[]
  chat_msg:any=[]
  constructor(private httpclient:HttpClient, private chats:ServiceService) { }
  
  joinChat(){
    this.chat_msg=[]
    this.chats.joinRoom(this.inp.join_group+'/'+this.inp.join_channel)
    this.chats.recieveMsg().subscribe((m)=>{this.chat_msg.push(m)})
  }

  sendMsg(){
    this.chats.
  }

  Assign_bysuper(x:number){
    for (let i = 0; i < this.db.user.length; i++) {
      if(this.db.user[i][0]==this.inp.super){
        if(x==3||x==4){
          this.db.user[i][3]=x
          if(this.db.user[i][5]){this.db.user[i].splice(5,1)}
          if(this.db.user[i][4]){this.db.user[i].splice(4,1)}
          alert('Assigned')
        }else{this.db.user.splice(i,1);alert('User Removed')}
      }
    }
    this.inp.super='none'
    console.log(this.db)
    this.dbSend()
  }

  createGroup(){
    if(this.db.grouplist.indexOf(this.inp.createGroup)==-1){
      this.db.grouplist.push(this.inp.createGroup)
      this.db.groups[this.inp.createGroup]=[]
      alert('Group Created successfully')
    }else(alert('Already Exists'))
    console.log(this.db)
    this.dbSend()
  }

  createCh(group:string,channel:string){
    if(this.db.groups[group].indexOf(channel)==-1){
      this.db.groups[group].push(channel)
      alert('Channel Created successfully')
    }else{alert('Already Exists')}
    console.log(this.db)
    this.dbSend()
  }

  user_invitation(){
    if(this.inp.user_inv.u!='=Create='&&this.inp.user_inv.c!='none'){
      this.db.user.forEach((e: any[]) => {
        if(e[0]==this.inp.user_inv.u){
          if(e[4][this.inp.user_inv.g]){
            e[4][this.inp.user_inv.g].push(this.inp.user_inv.c)
            alert('Invited Successfully')
          }else{
            e[4][this.inp.user_inv.g]=[]
            e[4][this.inp.user_inv.g].push(this.inp.user_inv.c)
            alert('Invited Successfully')
          }
        }
      });this.user_init(this.inp.user_inv.g,this.inp.user_inv.c,1)
    }else if(this.inp.user_inv.u=='=Create='){
      let info = this.inp.user_inv.new.split('/')
      if (this.db.user.every((e: string[])=>{return info[0]!=e[0]})){

        this.db.user.push([info[0],info[1],info[2],1,{},[]])
        alert('Created Successfully')
      }
      }
      console.log(this.db)
      this.dbSend()
  }

  user_removefrom(x:number){
    for (let i = 0; i < this.db.user.length; i++) {
        if(x==1&&this.db.user[i][4]&&this.inp.user_rmv.u==this.db.user[i][0]){
          this.db.user[i][4][this.inp.user_rmv.g].splice(
          this.db.user[i][4][this.inp.user_rmv.g].indexOf(this.inp.user_rmv.c),1)
          alert('Removed from channel')
          this.user_init(this.inp.user_rmv.g,this.inp.user_rmv.c,2)
        }else if(x==2&&this.db.user[i][4]&&this.inp.user_rmv.u==this.db.user[i][0]){
          delete this.db.user[i][4][this.inp.user_rmv.g]
          alert('Removed from group')
          this.user_init(this.inp.user_rmv.g,this.inp.user_rmv.c,2)
        }
    }
    console.log(this.db)
    this.dbSend()
  }

  groupchannel_remove(x:number){
    if(x==1){
      this.db.groups[this.inp.GC_rmv.g].splice(this.db.groups[this.inp.GC_rmv.g].indexOf(this.inp.GC_rmv.c),1)
      for (let i = 0; i < this.db.user.length; i++) {
       
        if(this.db.user[i][4]&&this.db.user[i][4][this.inp.GC_rmv.g]){
          if(this.db.user[i][4][this.inp.GC_rmv.g].indexOf(this.inp.GC_rmv.c)!=1){
            this.db.user[i][4][this.inp.GC_rmv.g].splice(this.db.user[i][4][this.inp.GC_rmv.g].indexOf(this.inp.GC_rmv.c),1)
          }
        }
      }
      alert('Channel Removed')
      
    }else if(x==2){
      delete this.db.groups[this.inp.GC_rmv.g]
      this.db.grouplist.splice(this.db.grouplist.indexOf(this.inp.GC_rmv.g),1)
      for (let i = 0; i < this.db.user.length; i++) {
        if(this.db.user[i][4]&&this.db.user[i][4][this.inp.GC_rmv.g]){
          delete this.db.user[i][4][this.inp.GC_rmv.g]
        }
        if(this.db.user[i][5]&&this.db.user[i][5]){
          if(this.db.user[i][5].indexOf(this.inp.GC_rmv.g)!=-1){
            this.db.user[i][5].splice(this.db.user[i][5].indexOf(this.inp.GC_rmv.g),1)
          }
        }
      }  
    }
    console.log(this.db)
    this.inp.GC_rmv.g='none'
    this.inp.GC_rmv.c='none'
    alert('Group Removed')
    this.dbSend()
  }

  groupAssis_control(group:string,user:string){
    for (let i = 0; i < this.db.user.length; i++) {
      if(this.db.user[i][0]==user){
        this.db.user[i][3]=2
        this.db.user[i][5].push(group)
        if(Object.keys(this.db.user[i][4]).indexOf(group)==-1){this.db.user[i][4][group]=[]}
        alert('Success')
      }
      
    }
    this.user_init2(this.inp.groupA.g)
    console.log(this.db)
    this.dbSend()
  }

  Assis_Add_Remove(group:string,channel:string,user:string,x:number){
    if(x==1){
      for (let i = 0; i < this.db.user.length; i++) {
        if(this.db.user[i][0]==user){
          this.db.user[i][4][group].push(channel)
        }
      }alert('Added')
    }else if(x==2){
      for (let i = 0; i < this.db.user.length; i++) {
        if(this.db.user[i][0]==user){
          this.db.user[i][4][group].splice(this.db.user[i][4][group].indexOf(channel),1)
        }alert('Removed')
      }
    }
    console.log(this.db)
    this.dbSend()
  }

  user_init(group:any,channel:any,m:any){
    if(m==1){this.user_list=[]}
    if(m==2){this.user_list2=[]}
    if(m==3){this.user_list=[]}
    if(m==4){this.user_list2=[]}
    for (let i = 0; i < this.db.user.length; i++) {
      if(this.db.user[i][4]){
        if(group!='none'){
          if(m==1){
            try{
            if(this.db.user[i][4][group].indexOf(channel)==-1){
              this.user_list.push(this.db.user[i][0])
            }}catch{this.user_list.push(this.db.user[i][0])}
          }else if(m==2){
            if(channel!='none'&&this.db.user[i][4][group]&&this.db.user[i][4][group].indexOf(channel)!=-1){
              this.user_list2.push(this.db.user[i][0])
            }else if(channel==='none'&&this.db.user[i][4][group]){this.user_list2.push(this.db.user[i][0])}
          }else if(m==3){
            if(this.db.user[i][4][group]){
            if(this.db.user[i][4][group].indexOf(channel)==-1 &&this.db.user[i][3]==1){
              this.user_list.push(this.db.user[i][0])
              
            }}console.log('sd')
          }else if(m==4){
            if(this.db.user[i][4][group]){
            if(this.db.user[i][4][group].indexOf(channel)!=-1 &&this.db.user[i][3]==1){
              this.user_list2.push(this.db.user[i][0])
            }}
          }
      }
      }
    }
  }

  user_init2(group:any){
    this.user_list_ga=[]
    for (let i = 0; i < this.db.user.length; i++) {
      if(this.db.user[i][4]){
        if(this.db.user[i][4][group]&&this.db.user[i][5]&&this.db.user[i][5].indexOf(group)==-1){
          this.user_list_ga.push(this.db.user[i][0])
        }
      }
    }
    
  }

  async dbSend(){
    await this.httpclient.post(url+'/db/rs',this.db,httpoptions).subscribe()
    this.group_showontop()
  }

  

  logout(){
    localStorage.clear()
  }
  
  ngOnInit(): void {
    // this.dbRequest()
    this.user_level=localStorage.getItem('level')
    this.username=localStorage.getItem('id')
    let x:any=localStorage.getItem('db')
    this.db=JSON.parse(x)
    
   setTimeout(() => {
    console.log(this.db)
    if(this.user_level==2){
      for (let i = 0; i < this.db.user.length; i++) {
        if (this.db.user[i][0]==this.username){
          this.assis_group=this.db.user[i][5]
        }
      }
    }else {this.assis_group=this.db.grouplist}
    if(this.user_level==1){this.level='Normal User'}
    if(this.user_level==2){this.level='Group Assistant'}
    if(this.user_level==3){this.level='Group Admin'}
    if(this.user_level==4){this.level='Super Admin'}
    this.group_showontop()
   }, 500);

  }
  

  channel_show(x:string){
    this.chat_channel=[]
    this.chat_channel=this.chat_group[x]

  }
  group_showontop(){
    this.chat_group={}
    this.user_groupshow=['Group : Channel']
    if(this.user_level>=3){
      let groupname=Object.keys(this.db.groups)
      groupname.forEach((x:any)=>{this.chat_group[x]=[]})
      for (let i = 0; i < groupname.length; i++) {
        this.user_groupshow.push(groupname[i]+' : '+
        JSON.stringify(this.db.groups[groupname[i]]).replace('[','').replace(']','').replace(/"/g,''))
        this.chat_group[groupname[i]]=this.db.groups[groupname[i]]
      }      
    }else if(this.user_level<=2){
      for (let i = 0; i < this.db.user.length; i++) {
        if (this.db.user[i][0]==this.username){
          let group = Object.keys(this.db.user[i][4])
          group.forEach((x)=>{this.chat_group[x]=[]})
          for (let i2 = 0; i2 < group.length; i2++) {
            if(this.db.user[i][5].indexOf(group[i2])!=-1){
              this.user_groupshow.push(group[i2]+' : Assistant')
              this.chat_group[group[i2]].push(this.db.groups[group[i2]])
            }else{
              this.user_groupshow.push(group[i2]+' : '+JSON.stringify(this.db.user[i][4][group[i2]])
              .replace('[','').replace(']','').replace(/"/g,''))
              this.chat_group[group[i2]].push(this.db.user[i][4][group[i2]])
            }
            
          }
        }
        
      }
    }
    this.chat_grouplist=Object.keys(this.chat_group)
    console.log(this.chat_grouplist)
  }
}

// else if(this.user_level==1){
//   for (let i = 0; i < this.db.user.length; i++) {
//     if(this.db.user[i][0]==this.username){
//       let group = Object.keys(this.db.user[i][4])
//       for (let i2 = 0; i2 < group.length; i2++) {
//         this.user_groupshow.push(JSON.stringify(group[i2]+' : '+this.db.user[i][4][group[i2]]
//           ).replace('[','').replace(']','').replace(/"/g,''))
//       }
//     }
//   }
// }