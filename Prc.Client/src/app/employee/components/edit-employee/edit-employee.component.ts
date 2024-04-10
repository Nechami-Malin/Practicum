import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Employee } from '../../../components/models/employee.model';
import { Role } from '../../../components/models/role.model';
import { EmployeeRole } from '../../../components/models/employeeRole.model';
import { EmployeeService } from '../../../services/employee.service';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  date = new Date();
  submitted = false;
  roleList: Role[] = [];
  selectedRoles = new Set<number>();
  index!: number;
  roleListTemp: Role[] = [];
  data!:Employee

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.formBuilder.group({
      idNumber: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      entryWorkDate: ['', Validators.required],
      roles: this.formBuilder.array([])
    })

  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getEmployeeDetails(id);
    this.loadRoleList();
    this.changeRole();
  }

  getEmployeeDetails(id: number) {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (res: Employee) => {
        this.data = res;
        this.populateForm();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  loadRoleList(): void {
      this.roleService.getRoles().subscribe({
        next: (res) => {
          this.roleList = res;
          this.index = this.roleList.length - this.employeeForm.value.roles.length;
        },
        error: (error) => {
          console.error(error);
        }
      });
    
  }

  populateForm() {
    if (this.data) {
      this.employeeForm.patchValue({
        idNumber: this.data.idNumber,
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        gender: this.data.gender === 1 ? 'male' : 'female',
        birthDate: this.formatDate(this.data.birthDate),
        entryWorkDate: this.formatDate(this.data.entryWorkDate),
        roles: this.setRoles().value
      });

      this.employeeForm.value.roles.forEach((control: { roleId: any; }) => {
        const roleId = control.roleId
        const role = this.roleList.find(r => r.id == roleId);
        if (role) {
          this.roleListTemp.push(role);
        }
      });
      
    }
    
  }

  get rolesFormArray() {
    return this.employeeForm.get('roles') as FormArray;
  }

  setRoles() {
    const control = this.employeeForm.get('roles') as FormArray;
    control.clear();
    this.data.roles.forEach((role) => {
      control.push(this.fillRoleFormGroup(role)); 
    });
    return control;
  }

  fillRoleFormGroup(role: EmployeeRole): FormGroup {
    return this.formBuilder.group({
      roleId: [role.roleId, Validators.required],
      isAdministrative: [role.isAdministrative, Validators.required],
      startDate: [this.formatDate(role.startDate), Validators.required]
    });
  }

  addRole(): void {
    if (this.index > 0) {
      this.index--;
      this.rolesFormArray.push(this.formBuilder.group({
        roleId: ['', Validators.required],
        isAdministrative: [false],
        startDate: ['', [Validators.required, this.entryDateValidator()]]
      }));
    } else {
      Swal.fire({
        title: "No more roles available",
        text: "",
        icon: "warning"
      });
    }
  }
  entryDateValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const entryDate = new Date(control.value);
      const startOfWorkDate = new Date(this.employeeForm.get('entryWorkDate')?.value);
      return entryDate >= startOfWorkDate ? null : { 'entryDateInvalid': true };
    };
  }

  changeRole(): void {
    this.roleListTemp = [];
    this.rolesFormArray.controls.forEach(control => {
      const roleId = control.get('roleId')?.value;
      const role = this.roleList.find(r => r.id == roleId);
      if (role) {
        this.roleListTemp.push(role);
        
      }
    });
  }

  removeRole(i: number): void {
    if (this.rolesFormArray && this.rolesFormArray.length > i) {
      const removedRole = this.rolesFormArray.at(i);
      if (removedRole) {
        const roleIdControl = removedRole.get('roleId');
        if (roleIdControl) {
          const removedRoleId = roleIdControl.value;
          this.index++;
          this.selectedRoles.delete(removedRoleId);
          this.roleListTemp = this.roleListTemp.filter(role => role.id != removedRoleId);
        }
        this.rolesFormArray.removeAt(i);
      }
    }
  }
  isRoleDisabled(roleId: number): boolean {
    return this.roleListTemp.some(role => role.id == roleId);
  }
  onClose(): void {
    this.router.navigate(["employee/all-employee"])
  }
  onSubmit(): void {
    this.submitted = true;
    const updatedEmployee = this.employeeForm.value;
    updatedEmployee.gender = this.employeeForm.value.gender === "Male" ? 1 : 2,
      this.employeeService.updateEmployee(this.data.id, updatedEmployee).subscribe({
        next: (response) => {
          Swal.fire({
            title: "Update", text: "The employee was successfully updated!", icon: "success", showConfirmButton: false, timer: 2000
          });
          this.router.navigate(["employee/all-employee"])
        },
        error: (error: any) => {
          Swal.fire({
            title: "400 Error", text: "", icon: "error", showConfirmButton: false, timer: 2000
          });
        }
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.employeeForm.controls;
  }

  formatDate(date: any): string {
    if (date) {
      const newDate = new Date(date);
      const year = newDate.getFullYear();
      const month = ('0' + (newDate.getMonth() + 1)).slice(-2);
      const day = ('0' + newDate.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
    return '';
  }

  onReset(): void {
    this.submitted = false;
    this.employeeForm.reset();
  }
}
