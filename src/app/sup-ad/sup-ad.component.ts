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
  db:any
  user_list=['one','two']
  group_list=['group1','group2']
  channel_list=['channel1','channel2']
  state=1
  user_level=4
  constructor(private httpclient:HttpClient, private server:ServiceService) { }
  
  dataSend(x:string){
    this.httpclient.post(url+'/db-rq',x)
  }

  async dbRequest(){
    await this.httpclient.get(url+'/db/rq').subscribe((db:any)=>{
      this.db=db
    })
  }
  ngOnInit(): void {
    this.dbRequest()
  }
  chan(x:number){
   this.user_level=x
  }

  inn(){

  
    console.log(this.db)
  }
}
