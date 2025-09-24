import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.mode';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  isCreateEmployee: boolean = true;
  employee: any;

  skills: string[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.employee = this.activateRouter.snapshot.data['employee'];
    console.log(this.employee);

    if (this.employee && this.employee.employeeId > 0) {
      this.isCreateEmployee = false;
      if (this.employee.employeeSkill != '') {
        this.skills = [];
        this.skills = this.employee.employeeSkill.split(',');
      }
    } else {
      this.isCreateEmployee = true;
    }
  }
  checkSkills(skill: string) {
    return (
      this.employee.employeeSkill != null &&
      this.employee.employeeSkill.includes(skill)
    );
  }
  saveEmployee(employeeForm: NgForm): void {
    if (this.isCreateEmployee) {
      this.employeeService.saveEmployee(this.employee).subscribe({
        next: (res: Employee) => {
          console.log(res);
          employeeForm.reset();
          this.employee.employeeGender = '';
          this.router.navigate(['/employee-list']);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    } else {
      this.employeeService.updateEmployee(this.employee).subscribe({
        next: (res: Employee) => {
          this.router.navigate(['/employee-list']);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    }
  }

  selectGender(geneder: string): void {
    this.employee.employeeGender = geneder;
  }
  onSkillChanges(event: any): void {
    console.log(event);
    if (event.checked) {
      this.skills.push(event.source.value);
    } else {
      this.skills.forEach((item, index) => {
        if (item == event.source.value) {
          this.skills.splice(index, 1);
        }
      });
    }
    this.employee.employeeSkill = this.skills.toString();
  }
}
