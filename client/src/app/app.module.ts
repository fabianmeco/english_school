import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'


import { AppComponent } from './app.component';
import { HeadMenuComponent } from './head-menu/head-menu.component';
import { ContentFormComponent } from './content-form/content-form.component';



@NgModule({
  declarations: [
    AppComponent,
    HeadMenuComponent,   
    ContentFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
