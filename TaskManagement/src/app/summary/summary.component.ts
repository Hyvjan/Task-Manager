import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {DatePipe} from '@angular/common';

import { Task } from '../tasks/task.model';
import { User } from '../users/user.model';
import { TasksService } from '../tasks/tasks.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

	user: User = new User("testinimi1", "testisuku1", "testi1@testi.com", '1', ['t1','t2'], ['t1', 't2']);
	taskList: Task[];
	userList: User[];
	personsInTeam: User[]=[];
	@ViewChild('f') selectTeamForm: NgForm;
	public pieChartLabels:string[] = [];
  	public finishedChartData:number[] = [];
  	public unfinishedChartData:number[] = [];
  	public finishedLateChartData:number[] = [];
  	public daysToComplishChartData:number[] = [];
  	public pieChartType:string = 'pie';
  	public pieChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
};

  constructor(	private tasksService: TasksService,
  				private usersService: UsersService,
  				private datePipe: DatePipe) { }

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
  };

  onSubmit() {
  	this.personsInTeam=this.usersService.getPersonsInTeam(this.selectTeamForm.value.taskgroup);
  	//calulate open and finished tasks/person in team
  	this.pieChartLabels=[];
  	this.finishedChartData=[];
  	this.unfinishedChartData=[];
  	this.finishedLateChartData=[];
  	this.daysToComplishChartData= [];
  	let helpLabel: string[]=[];
  	for(let person of this.personsInTeam) {
  		helpLabel.push(person.email);
  		let finished: number = 0;
  		let unfinished: number = 0;
  		let finishedLate: number = 0;
  		let dayCount: any = 0;
  		for(let task of this.taskList) {
  			if (task.whosResponsibility==person.email && !task.finished
  				  && task.created>=this.selectTeamForm.value.startdate && task.created<=this.selectTeamForm.value.enddate) {
  				//
  				unfinished=unfinished+1;
  			}
  			if (task.whosResponsibility==person.email && task.finished
  				&& task.finished>=this.selectTeamForm.value.startdate && task.finished<=this.selectTeamForm.value.enddate) {
  				finished=finished+1;
  				let finishedDate: any = this.datePipe.transform(task.finished, 'medium');
  				let created: any = this.datePipe.transform(task.created, 'medium');
  				dayCount=(finishedDate.valueOf()-created.valueOf())/(24*3600*1000);
  				console.log("daycount: "+ dayCount);
  				if(task.duedate && task.finished>task.duedate) {
  					finishedLate=finishedLate+1;
  				}
  			}
  			
  		}
  		this.finishedChartData.push(finished);
  		this.unfinishedChartData.push(unfinished);
  		if(finishedLate==NaN || finished==0) {
  			this.finishedLateChartData.push(0);
  		} else {
  			this.finishedLateChartData.push((finishedLate/finished)*100);
  		}
  		this.daysToComplishChartData.push(dayCount);
  		console.log("valmistuneet: "+this.finishedChartData);
  		console.log("keskeneräiset: "+this.unfinishedChartData);
  		console.log("myöhässä valmistuneet: "+this.finishedLateChartData);
  		console.log("DAys to finish: " + this.daysToComplishChartData);
  		console.log("erotus natiivipäivillä: " + Math.round((this.taskList[0].finished.valueOf()-this.taskList[3].finished.valueOf())/(24*3600*1000)));
  		//console.log("lisätyn task:n päivämäärän muoto" + this.taskList[4].finished);
  		console.log("nimellisen muodon päivämäärä" + this.taskList[3].finished);
  		console.log("datepipe transform " + this.datePipe.transform(this.taskList[4].finished, 'medium'));
  		//ng2-charts:n bugin takia labelit täytyy päivittää datan jälkeen,
  		//tai muuten labelit eivät päivity. Siksi kikkailu alla ajastuksen kanssa
  		

  	}
  setTimeout(()=> {
  			this.pieChartLabels=helpLabel;
  		}, 1000);
  };



}
