import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Router } from '@angular/router';

const httpoptions={
  headers : new HttpHeaders({'Content-Type':'application/json'})
}
const url='http://localhost:3000'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user={id:'',pw:''}
  constructor(private httpclient:HttpClient, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('id')){
      this.router.navigateByUrl('/supad')
    }
  }
  login(){
    this.httpclient.post(url+'/login',this.user,httpoptions).subscribe((data:any)=>{
      if(data.valid==true){
        localStorage.setItem('id',data.id)
        localStorage.setItem('level',data.level)
        this.router.navigateByUrl('/supad')
      }else{alert('Invalid User')}
  })
  }
}
