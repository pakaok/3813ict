import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SupAdComponent } from './sup-ad/sup-ad.component';
import { GroupAdComponent } from './group-ad/group-ad.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { GroupAssisComponent } from './group-assis/group-assis.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SupAdComponent,
    GroupAdComponent,
    UsersComponent,
    LoginComponent,
    GroupAssisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }