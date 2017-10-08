import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './tasks/tasks.component';
import { SummaryComponent } from './summary/summary.component';
import { SignupComponent } from './signup/signup.component';
import {LoginComponent} from './login/login.component';

const APP_ROUTES: Routes = [
	{ path: '', redirectTo: '/tasks', pathMatch: 'full'},
	{ path: 'tasks', component: TasksComponent},
	{ path: 'summary', component: SummaryComponent},
	{ path: 'signup', component: SignupComponent},
	{ path: 'login', component: LoginComponent},

]; 

export const routing = RouterModule.forRoot(APP_ROUTES);