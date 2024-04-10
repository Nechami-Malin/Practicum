import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import * as XLSX from 'xlsx';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEmployeeComponent } from '../../employee/components/add-employee/add-employee.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule,RouterOutlet],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private router: Router, 
    private employeeService: EmployeeService,
    private modalService: NgbModal,
    public dialog: MatDialog
  ) {}

  openAddEmployeeModal() {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '800px',
      backdropClass: 'dark-backdrop',
    });
  }
  download(): void {
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.exportAsExcelFile(res.filter(emp=>emp.isActive), 'employees');
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  exportAsExcelFile(jsonData: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: 'application/octet-stream'});
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    a.href = URL.createObjectURL(data);
    a.download = `${fileName}_export_${new Date().getTime()}.xlsx`;
    a.click();
    document.body.removeChild(a);
  }
}
