import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { HeadMenuComponent } from './head-menu/head-menu.component';
import { DropdownBasicComponent } from './dropdown-basic/dropdown-basic.component';



@NgModule({
  declarations: [
    AppComponent,
    HeadMenuComponent,
    DropdownBasicComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
