import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AreaService } from 'src/app/shared/area.service';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees-detail',
  templateUrl: './employees-detail.component.html',
  styleUrls: ['./employees-detail.component.css']
})
export class EmployeesDetailComponent implements OnInit {
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
   * Area
   */

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    /**
     * We are using a resolver to get the information of the employee selected
     */
    this.route.data.subscribe((data) =>{
      
      /**
       * Get the info of the employee
       */
      this.employee = data['employee'];
    });
    
    
  }

}
