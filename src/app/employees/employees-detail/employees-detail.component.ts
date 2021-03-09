import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AreaService } from 'src/app/shared/area.service';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees-detail',
  templateUrl: './employees-detail.component.html',
  styleUrls: ['./employees-detail.component.css']
})
export class EmployeesDetailComponent implements OnInit, OnDestroy {
  //TODO change the HTML because it is just a detail, add an option to edit and another option to create new
  /**
   * The actual employee
   */
  employee: Employee;
  /**
   * the employee form
   */
  employeeForm: FormGroup;
  /**
   * Edit mode
   */
  editMode: boolean = false;
  /**
   * Subscription from the ResolverService
   */
  subscribeEmployee: Subscription;


  constructor(private route: ActivatedRoute, private router: Router, private employeeService:EmployeeService) { }

  ngOnInit(): void {
    /**
     * We are using a resolver to get the information of the employee selected
     */
    this.subscribeEmployee = this.route.data.subscribe((data) =>{
      
      /**
       * Get the info of the employee
       */
      this.employee = data['employee'];
    });
  }

  ngOnDestroy(){
    this.subscribeEmployee.unsubscribe();
  }
  
  onDelete(){
    this.employeeService.deleteEmployee(this.route.snapshot.params['id']);
    this.router.navigate(['employees']);
  }
}
