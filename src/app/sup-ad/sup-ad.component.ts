import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sup-ad',
  templateUrl: './sup-ad.component.html',
  styleUrls: ['./sup-ad.component.css']
})
export class SupAdComponent implements OnInit {
  vv=false
  user_list=['one','two']
  group_list=['group1','group2']
  channel_list=['channel1','channel2']
  constructor() { }
  state=3
  ngOnInit(): void {
  }
  chan(x:number){
    this.state = x
  }
}
