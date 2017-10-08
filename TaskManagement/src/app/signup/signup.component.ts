import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { User } from "../users/user.model";
import { UsersService} from "../users/users.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	signupForm: FormGroup;

	
  constructor( private usersService: UsersService) { }

  ngOnInit() {

  	this.signupForm = new FormGroup({
  		firstName: new FormControl(null, Validators.required),
  		lastName: new FormControl(null, Validators.required),
  		email: new FormControl(null, [Validators.required, Validators.email]),
  		password: new FormControl(null, Validators.required),
  	});
  }

  onSubmit() {
		const user = new User(this.signupForm.value.firstName, this.signupForm.value.lastName, this.signupForm.value.email,'',[],[], this.signupForm.value.password);
		this.usersService.signup(user)
			.subscribe(
				data => console.log(data),
				error => console.log(error)
				);
		this.signupForm.reset();
	}

}
