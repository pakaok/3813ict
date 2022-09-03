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
  db:any = {"user":[["super","superemail","Super",4],
  ["gadmin1","gademail","GroupAdmin",3,{"g1":['1','2'],"g2":['1']}],
  ["gassis1","gassisemail","GroupAssis",2,{"g1":["1"],"g2":["1"]},['g1']]],

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
    assis_a:{u:'none',g:'none',c:'none'},assis_r:{u:'none',g:'none',c:'none'},assis_ch:''
  }
  state=1
  user_level=4
  username='gassis1'
  assis_group=[]
  ch_list:any=[[],[],[],[],[]]
  constructor(private httpclient:HttpClient, private server:ServiceService) { }
  
  Assign_bysuper(x:number){
    for (let i = 0; i < this.db.user.length; i++) {
      if(this.db.user[i][0]==this.inp.super){
        if(x==2||x==3||x==4){
          this.db.user[i][3]=x
        }else{this.db.user.splice(i,1)}
      }
    }
    this.inp.super='none'
  }

  createGroup(){
    if(this.db.grouplist.indexOf(this.inp.createGroup)==-1){
      this.db.grouplist.push(this.inp.createGroup)
      this.db.groups[this.inp.createGroup]=[]
    }else(alert('Already Exists'))
    console.log(this.db)
  }

  createCh(){
    if(this.db.groups[this.inp.createChannel.g].indexOf(this.inp.createChannel.c)==-1){
      this.db.groups[this.inp.createChannel.g].push(this.inp.createChannel.c)
    }else{alert('Already Exists')}
    console.log(this.db)
  }

  user_invitation(){
    if(this.inp.user_inv.u!='=Create='){
      this.db.user.forEach((e: any[]) => {
        if(e[0]==this.inp.user_inv.u){
          e[4][this.inp.user_inv.g].push(this.inp.user_inv.c)
          alert('Invited Successfully')
        }
      });
    }else {
      let info = this.inp.user_inv.new.split('/')
      if (this.db.user.every((e: string[])=>{return info[0]!=e[0]})){
        this.db.user.push([info[0],info[1],info[2],1])
        alert('Created Successfully')
      }
      }
      console.log(this.db)
  }

  user_removefrom(x:number){
    for (let i = 0; i < this.db.user.length; i++) {
        if(x==1&&this.db.user[i][4]&&this.inp.user_rmv.u==this.db.user[i][0]){
          this.db.user[i][4][this.inp.user_rmv.g].splice(
          this.db.user[i][4][this.inp.user_rmv.g].indexOf(this.inp.user_rmv.c),1)
          alert('Removed from channel')
        }else if(x==2&&this.db.user[i][4]&&this.inp.user_rmv.u==this.db.user[i][0]){
          delete this.db.user[i][4][this.inp.user_rmv.g]
          alert('Removed from group')
        }
    }
    console.log(this.db)
  }

  groupchannel_remove(){
    
  }
  user_init(group:any,channel:any,m:any){
    if(m==1){this.user_list=[]}
    if(m==2){this.user_list2=[]}
    if(m==3){this.user_list=[]}
    if(m==4){this.user_list2=[]}
    for (let i = 0; i < this.db.user.length; i++) {
      if(this.db.user[i][4]){
        if(group!='none'&&channel!='none'){
          if(m==1){
            if(this.db.user[i][4][group].indexOf(channel)==-1){
              this.user_list.push(this.db.user[i][0])
            }
          }else if(m==2){
            if(this.db.user[i][4][group].indexOf(channel)!=-1){
              this.user_list2.push(this.db.user[i][0])
            }
          }else if(m==3){
            if(this.db.user[i][4][group].indexOf(channel)==-1 &&this.db.user[i][3]==1){
              this.user_list.push(this.db.user[i][0])
            }
          }else if(m==4){
            if(this.db.user[i][4][group].indexOf(channel)!=-1 &&this.db.user[i][3]==1){
              this.user_list2.push(this.db.user[i][0])
            }
          }
      }
      }
    }
  }

  user_init2(group:any){
    this.user_list_ga=[]
    for (let i = 0; i < this.db.user.length; i++) {
      if(this.db.user[i][4]){
        if(this.db.user[i][4][group]){
          this.user_list_ga.push(this.db.user[i][0])
        }
      }
      
    }
  }

  async dbSend(){
    await this.httpclient.post(url+'/db/rs',this.db,httpoptions).subscribe()
  }

  async dbRequest(){
    await this.httpclient.get(url+'/db/rq').subscribe((db:any)=>{
      this.db=db
      
    })
  }
  ngOnInit(): void {
    this.dbRequest()
    if(this.user_level==2){
      for (let i = 0; i < this.db.user.length; i++) {
        if (this.db.user[i][0]==this.username){
          this.assis_group=this.db.user[i][5]
        }
      }
    }
  }
  chan(x:number){
   this.user_level=x
  }

  inn(){

    
    
     //this.dbSend()
  }
}
