import { Component, OnInit, ViewChild } from '@angular/core';
import {DatePipe} from '@angular/common';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { Task } from './task.model';
import { User } from '../users/user.model';
import { TasksService } from './tasks.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

	user: User = new User("testinimi1", "testisuku1", "testi1@testi.com",'' , ['t1','t2'], ['t1', 't2']);

	editedTaskId: string = '';
	taskList: Task[];
	userList: User[];
	personsInTeam: User[];
	@ViewChild('f') addTaskForm: NgForm;

	dateToDay:Date= new Date(Date.now());
	receivedDate: Date = new Date(Date.now());
	initNumber:number=0;

  constructor( 	private tasksService: TasksService,
  				private usersService: UsersService) { }

  ngOnInit() {
  	this.tasksService.getTasks()
      .subscribe(
          (tasks:Task[]) => {
            this.taskList = tasks;
        });

  	this.tasksService.taskListChanged
  		.subscribe(
  			(tasks: Task[]) => {
  				this.taskList = tasks;
  			}
  			);

  	this.userList=this.usersService.getuserList();
  	this.usersService.userListChanged
  		.subscribe(
  			(users: User[]) => {
  				this.userList = users;
  			}
  			);

  }

  addTask() {
  	if (this.editedTaskId=='') {
  	const task:Task = new Task(	this.addTaskForm.value.tasktitle, 
  								this.addTaskForm.value.descriptionarea,
  								this.addTaskForm.value.taskcreated,
  								this.addTaskForm.value.taskgroup,
  								this.addTaskForm.value.responsible,
  								this.addTaskForm.value.duedate,
  								this.addTaskForm.value.taskstatus,
  								this.addTaskForm.value.taskhours,
  								this.addTaskForm.value.taskfinished);
  	this.tasksService.addTask(task)
      .subscribe(
        data=> console.log(data),
        error => console.log(error)
    );
  	this.addTaskForm.resetForm();
  	}
  	else if (this.editedTaskId != '') {
  		const task:Task = new Task(	this.addTaskForm.value.tasktitle, 
  								this.addTaskForm.value.descriptionarea,
  								this.addTaskForm.value.taskcreated,
  								this.addTaskForm.value.taskgroup,
  								this.addTaskForm.value.responsible,
  								this.addTaskForm.value.duedate,
  								this.addTaskForm.value.taskstatus,
  								this.addTaskForm.value.taskhours,
  								this.addTaskForm.value.taskfinished,
                  this.editedTaskId);
      console.log('task description enne patch:ia: ' + task.taskDescription);
  		//this.tasksService.editTask(this.taskList[this.i], task);
      this.tasksService.editTask(task)
        .subscribe(
          data => console.log(data),
          error => console.log(error)
        );
  		this.addTaskForm.resetForm();
  		this.editedTaskId = '';
  		console.log("lista componentissa: "+ this.taskList);
  	}
  };

  getPersonsInTeam(team: any) {
  	this.personsInTeam=this.usersService.getPersonsInTeam(team);
  	
  };

  editTask(task:Task, i:number) {
    this.editedTaskId = this.taskList[i].taskId.slice();
    console.log("editoitava taskId on: " + this.editedTaskId);
  	this.addTaskForm.form.patchValue({
  	tasktitle: task.taskName,
  	descriptionarea: task.taskDescription,
  	taskcreated: task.created,
  	taskgroup: task.domain,
  	responsible: task.whosResponsibility,
  	duedate: task.duedate,
  	taskstatus: task.status,
  	taskhours: task.hoursUsed,
  	taskfinished: task.finished
  	})
  };

  deleteTask(task:Task) {
  	this.tasksService.deleteTask(task);
  };

}
