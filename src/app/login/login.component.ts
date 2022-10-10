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
  user={id:'',pw:''}//userinfo
  constructor(private httpclient:HttpClient, private router:Router) { }
  db:any
  ngOnInit(): void {
    this.dbRequest()
    
  }

  async dbRequest(){//get database from server
    await this.httpclient.get(url+'/db/rq').subscribe((db:any)=>{
      console.log(db)
      localStorage.setItem('db',JSON.stringify(db))
      if(localStorage.getItem('id')){
        this.router.navigateByUrl('/supad')
      }
    })
  }

  login(){//login / send login data to server and get validation from server
    this.httpclient.post(url+'/login',this.user,httpoptions).subscribe((data:any)=>{
      if(data.valid==true){
        localStorage.setItem('id',data.id)
        localStorage.setItem('level',data.level)
        this.router.navigateByUrl('/supad')
      }else{alert('Invalid User')}
  })
  }
}
