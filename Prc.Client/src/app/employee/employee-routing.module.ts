import { RouterModule, Routes } from "@angular/router";
import { AllEmployeeComponent } from "./components/all-employee/all-employee.component";
import { AddEmployeeComponent } from "./components/add-employee/add-employee.component";
import { EditEmployeeComponent } from "./components/edit-employee/edit-employee.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


const employeeRoutes: Routes = [
    { path: '', redirectTo: 'allEmployees', pathMatch: 'full' },
    { path: 'all-employee', component: AllEmployeeComponent },
    { path: 'add-employee', component: AddEmployeeComponent },
    { path: 'edit-employee/:id', component:EditEmployeeComponent }

  ]
  @NgModule({
    declarations: [],
    imports: [
      CommonModule,
       RouterModule.forChild(employeeRoutes)
    ],  
    exports: [RouterModule]
  
  })
  export class EmployeeRoutingModule { }
  