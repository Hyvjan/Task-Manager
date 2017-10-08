import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";

import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { User } from './user.model';

@Injectable()
export class UsersService {
	userListChanged = new Subject<User[]>();
	private userList: User[] = [
		new User("testinimi1", "testisuku1", "testi1@testi.com", '1', ['t1','t2'], ['t1','t2']),
		new User("testinimi2", "testisuku2","testi2@testi.com", '2', ['t1'], []),
		new User("testinimi3", "testisuku3", "testi3@testi.com",  '3', ['t2'], []),
	];


  constructor( private http: Http) { }

  	getuserList() {
  		return this.userList.slice();
  	}

  	addUser(user: User) {
  		this.userList.push(user);
  		this.userListChanged.next(this.userList.slice());
  	}

  	getPersonsInTeam(team: any) {
  	const personsInTeam:User[]=[];
  	for(let user of this.userList) {
  			if(user.teamMember.indexOf(team)>-1) {
  				personsInTeam.push(user);
  			}
  	}
  	return personsInTeam
  }

  signup(user:User) {
    const headers = new Headers({'content-type': 'application/json'});
    const body = JSON.stringify(user);
    return this.http.post('http://localhost:3000/user', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error:Response)=>Observable.throw(error.json()));
  }

  login(user:User) {
    const headers = new Headers({'content-type': 'application/json'});
    const body = JSON.stringify(user);
    return this.http.post('http://localhost:3000/login', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error:Response)=>Observable.throw(error.json()));
  }

}
