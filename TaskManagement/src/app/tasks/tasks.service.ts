import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';


import { Task } from './task.model';


@Injectable()
export class TasksService {

	taskListChanged = new Subject<Task[]>();
	//private taskList: Task[] =[
	//	new Task('testi task1', 'Ensimmäinen testitask testaamista varten', new Date(), 'userid1', 'responsiblePerson1', new Date(), 0, 0, new Date()),
	//	new Task('testi task1', 'Ensimmäinen testitask testaamista varten', new Date(), 'userid2', 'responsiblePerson2', new Date(), 0, 0, new Date()),
	//	new Task('testi1', 'testaamista varten', new Date(), "t2", "testi3@testi.com", new Date(), 0, 0, new Date()),
	//	new Task('testi2', 'testaamista varten', new Date(), "t2", "testi3@testi.com", new Date(), 0, 0, new Date(2017,6,21)),
	//]

	private taskList: Task[];

	constructor(private http: Http) {}

	getTasks() {
		return this.http.get('http://localhost:3000/task')
			.map((response:Response)=>{
				const tasks = response.json().obj;
				let transformedTasks:Task[] = [];
				for ( let task of tasks) {
					transformedTasks.push(new Task(task.taskName, task.taskDescription, task.created, task.domain, task.whosResponsibility, task.duedate, task.status, task.hoursUsed, task.finished, task._id));
				}
				this.taskList = transformedTasks;
				this.taskListChanged.next(this.taskList.slice());
				console.log("palvelimen palauttama lista taskeja: " + transformedTasks[1].taskId);
				return transformedTasks;
			})
			.catch((error:Response)=>Observable.throw(error.json()));
	};

	addTask(task: Task) {
		const headers = new Headers({'content-type': 'application/json'});
		const body = JSON.stringify(task);
		return this.http.post('http://localhost:3000/task', body, {headers: headers})
			.map((response:Response)=> {
				const result = response.json();
				this.taskList.push(new Task(result.obj.taskName, result.obj.taskDescription, result.obj.created, result.obj.domain, result.obj.whosResponsibility,
											result.obj.duedate, result.obj.status, result.obj.hoursUsed, result.obj.finished, result.obj._id));
				this.taskListChanged.next(this.taskList.slice());
			})
			.catch((error:Response)=>Observable.throw(error.json()));
		//
	};

	editTask(task: Task) {
		const headers = new Headers({'content-type': 'application/json'});
		const body = JSON.stringify(task);
		return this.http.patch('http://localhost:3000/task' + task.taskId, body, {headers: headers})
			.map((response:Response)=> {
				const result = response.json();
				const indeksi:number = this.taskList.findIndex(x => x.taskId == result.obj._id);
				console.log("indeksi jota muutetaan on: " + indeksi);
				this.taskList[indeksi]=(new Task(result.obj.taskName, result.obj.taskDescription, result.obj.created, result.obj.domain, result.obj.whosResponsibility,
											result.obj.duedate, result.obj.status, result.obj.hoursUsed, result.obj.finished, result.obj._id));
				this.taskListChanged.next(this.taskList);
			})
			.catch((error:Response)=>Observable.throw(error.json()));
	};

	deleteTask(task: Task) {
		const index = this.taskList.indexOf(task);
		this.taskList.splice(index,1);
		this.taskListChanged.next(this.taskList.slice());
	};

}