import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.css']
})
export class ContentFormComponent implements OnInit {
  teacher:teacher;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
interface teacher{
  fullname: string;
  cid: string;
  birthday: Date;
  phone_number: string;
  address: string;
  email:string;
}
