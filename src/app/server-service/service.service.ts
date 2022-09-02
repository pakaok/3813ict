import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
const httpoptions={
  headers : new HttpHeaders({'Content-Type':'application/json'})
}
const url='http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpclient:HttpClient) { }
  
  dataSend(x:string){
    this.httpclient.post(url+'/db-rq',x)
  }

  dbRequest(){
    this.httpclient.post(url+'/db-rq','',httpoptions).subscribe((db:any)=>{
      return db
    })
  }
}
