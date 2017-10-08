import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TasksComponent } from './tasks/tasks.component';
import { TasksService } from './tasks/tasks.service';
import { UsersComponent } from './users/users.component';
import { UsersService } from './users/users.service';
import { routing } from './app.routing';
import { SummaryComponent } from './summary/summary.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TasksComponent,
    UsersComponent,
    SummaryComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    routing,
    ChartsModule,
    ReactiveFormsModule,
  ],
  providers: [TasksService, UsersService, DatePipe, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
