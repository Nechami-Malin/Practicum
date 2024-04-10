import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../../services/employee.service';
import { RoleService } from '../../../services/role.service';
import { Employee } from '../../../components/models/employee.model';
import { Role } from '../../../components/models/role.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  roleList: Role[] = [];
  EmployeeRolesArray!: FormArray;
  selectedRoles = new Set<number>();
  roleListTemp: Role[] = [];
  index!: number;
  closeResult = '';
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private roleService: RoleService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      idNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      entryWorkDate: ['', Validators.required],
      roles: this.formBuilder.array([], Validators.required)
    });
    this.loadRoleList();
  }

  loadRoleList(): void {
    this.roleService.getRoles().subscribe({
      next: (res) => {
        this.roleList = res;
        this.index = this.roleList.length;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  get rolesFormArray() {
    return this.employeeForm.get('roles') as FormArray;
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


  saveEmployee(): void {
    let formData: Employee = this.employeeForm.value;
    formData.gender = this.employeeForm.value.gender == "male" ? 1 : 2;
    this.employeeService.addEmployee(formData).subscribe({
      next: (response) => {
        Swal.fire({
          title: "Thank you!",
          text: "The employee was successfully added!",
          icon: "success"
        });
        this.router.navigate(["employee/all-employee"]);
      },
      error: (error: any) => {
        Swal.fire({
          title: "Error!",
          text: "Failed to add the employee!",
          icon: "error"
        });
      }
    });
  }
}
