import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sup-ad',
  templateUrl: './sup-ad.component.html',
  styleUrls: ['./sup-ad.component.css']
})
export class SupAdComponent implements OnInit {
  vv=false
  user_list=['one','two']
  constructor() { }
  color=1
  ngOnInit(): void {
  }

}
