import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import io from 'socket.io-client'
import { observable, Observable, observeOn } from 'rxjs';

const httpoptions={
  headers : new HttpHeaders({'Content-Type':'application/json'})
}
const url='http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  socket:any
  constructor(private httpclient:HttpClient ) {this.socket=io(url) }
  
  joinRoom(x:any){
    this.socket.emit('join',x)

  }
 
  sendMsg(x:string){
    this.socket.emit('msg',x)
  }
  recieveMsg(){
    return new Observable((observer)=>{
      this.socket.on('msg',(msg:any)=>{
        observer.next(msg)
      })
    })  
  }
}
