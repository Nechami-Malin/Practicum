import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../../components/models/employee.model';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-employee',
  standalone: false,
  templateUrl: './all-employee.component.html',
  styleUrl: './all-employee.component.css'
}) 

export class AllEmployeeComponent implements OnInit {
  public employeeList: Employee[] = [];
  public filteredEmployeeList: Employee[] = [];
  public searchText: string = '';

  constructor(private router: Router, private _employeeService: EmployeeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadEmployee()
  }
  loadEmployee(){
    this._employeeService.getEmployees().subscribe({
      next: (res) => {
        this.employeeList = res.filter(employee => employee.isActive);
        this.filteredEmployeeList = this.employeeList;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  editEmployee(employee: Employee):void{
    this.router.navigate(['employee/edit-employee', employee.id]);
  }

  deleteEmployee(id: number): void {
    Swal.fire({
      title: "Are you sure?", text:"you want to delete this employee?", icon:"warning", showDenyButton: true,
      confirmButtonColor: "#3085d6", cancelButtonColor: "#d33", confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!", text: "This enployee has been deleted.", icon: "success", showConfirmButton:false, timer:2000
        });
        this._employeeService.deleteEmployee(id).subscribe(() => {
          this.loadEmployee();
        });
      } 
      else if (result.isDenied) {
        Swal.fire({
          title:"The operation is cancelled", icon: "info", showConfirmButton: false,  timer: 1500
        });
      }
    });
  }

  filterEmployees(): void {
    this.filteredEmployeeList = this.employeeList.filter(employee =>
      Object.values(employee).some(value => value && value.toString().toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }
}

