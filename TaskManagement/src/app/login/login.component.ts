import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';

import { User } from "../users/user.model";
import { UsersService} from "../users/users.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	signinForm: FormGroup;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {

  	this.signinForm = new FormGroup({
  		email: new FormControl(null, [Validators.required, Validators.email]),
  		password: new FormControl(null, Validators.required),
  	});
  }

  onSubmit() {
  	const user = new User('','',this.signinForm.value.email,'',[],[],this.signinForm.value.password);
  	this.usersService.login(user)
  		.subscribe(
  			data => {
  				localStorage.setItem('token', data.token);
  				localStorage.setItem('user', data.userId);
  				this.router.navigateByUrl('/');
  			},
  			error => console.error(error)
  			);
  	this.signinForm.reset();

  }

}
