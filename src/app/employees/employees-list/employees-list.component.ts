import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit, OnDestroy {

  /**
   * List of employees
   */
  employees: Employee[];
  /**
   * subscription used to store the subscription to the employeeListener
   */
  subscription: Subscription;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    /**
     * Get the initial employee
     */
    this.employeeService.getEmployees().subscribe( (data) =>{
      this.employees = data;
    });
    /**
     * Subscription which will tell you when the employee list was updated
     */
    this.subscription = this.employeeService.employeesListener.subscribe((data) => {
      this.employees = data; 
    });
  }
  
  ngOnDestroy(){
    /**
     * Prevents memory leak
     */
    this.subscription.unsubscribe();
  }

}
