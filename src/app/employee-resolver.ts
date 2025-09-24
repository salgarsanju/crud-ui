import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouteConfigLoadEnd,
  RouterStateSnapshot,
} from '@angular/router';
import { EmployeeService } from './employee.service';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from './employee.mode';

export const EmployeeResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  employeeService: EmployeeService = inject(EmployeeService)
): Observable<Employee> => {
  const employeeId = route.paramMap.get('employeeId');
  if (employeeId) {
    return employeeService.getEmployee(Number(employeeId));
  } else {
    const employee: Employee = {
      employeeId: '',
      employeeName: '',
      employeeContactNumber: '',
      employeeAddress: '',
      employeeGender: '',
      employeeDepartment: '',
      employeeSkill: '',
    };
    return of(employee);
  }
};
