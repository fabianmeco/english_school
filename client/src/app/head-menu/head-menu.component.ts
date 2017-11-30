import { Component } from '@angular/core';

@Component({
  selector: 'app-head-menu',
  templateUrl: './head-menu.component.html',
  styleUrls: ['./head-menu.component.css']
})
export class HeadMenuComponent  {
  save_hidden :boolean = true;
  dismss_hidden:boolean = true;
  new_hidden:boolean = false;
  del_hidden:boolean=true;

  constructor() { }

}
