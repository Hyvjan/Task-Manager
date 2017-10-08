export class Task {

	constructor(public taskName: string,
				public taskDescription: string,
				public created: Date,
				public domain: string,
				public whosResponsibility?: string,
				public duedate?: Date,
				public status?: number,
				public hoursUsed?: number,
				public finished?: Date,
				public taskId?: string) {}

}