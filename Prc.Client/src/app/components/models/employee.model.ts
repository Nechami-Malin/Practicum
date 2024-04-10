import { EmployeeRole } from "./employeeRole.model"

export class Employee{
    id!:number
    idNumber!: string
    firstName!:string
    lastName!:string
    gender!:number
    birthDate!:Date
    entryWorkDate!:Date
    isActive!:Boolean
    roles!:EmployeeRole[];
}