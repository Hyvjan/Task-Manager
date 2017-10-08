export class User {

	constructor(public firstName: string, 
				public lastName: string, 
				public email: string,
				public id?: string, 
				public teamMember?: string[], 
				public teamLeader?: string[],
				public password?: string,) {}
}