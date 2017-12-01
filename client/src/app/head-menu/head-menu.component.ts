import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'


@Component({
  selector: 'app-head-menu',
  templateUrl: './head-menu.component.html',
  styleUrls: ['./head-menu.component.css']
})
export class HeadMenuComponent  { 

  constructor(private http:HttpClient) { 
  
  }

}
