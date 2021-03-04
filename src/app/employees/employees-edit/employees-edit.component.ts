import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/shared/area.model';
import { AreaService } from 'src/app/shared/area.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employees-edit',
  templateUrl: './employees-edit.component.html',
  styleUrls: ['./employees-edit.component.css']
})
export class EmployeesEditComponent implements OnInit, OnDestroy {

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
   * Areas list
   */
  areasList: Area[];
  /**
   * Object to prevent memory leak
   */
  subscriber: Subscription;
  /**
   * 
   */
  image: any;

  constructor(private route: ActivatedRoute, private areaService: AreaService) { }

  ngOnInit(): void {
    /**
     * Get all the areas
     */
    this.subscriber = this.areaService.areaListener.subscribe((data) =>{
      this.areasList = data;
    });

    this.areasList = this.areaService.getAreas();
    
    /**
     * We create the elements of our formGroup
     */
    this.employeeForm = new FormGroup({
      /**
       * We create the controls that we defined in the HMTL
       */
      "username": new FormControl(),
      "area": new FormControl(0),
      "telefono": new FormControl(),
      "email": new FormControl(),
      "imagePath": new FormControl()
    })

    /**
     * We are using a resolver to get the information of the employee selected
     */
    this.route.data.subscribe((data) => {

      /**
       * Get the info of the employee
       */
      this.employee = data['employee'];
      /**
       * We check if the employee is null 
       */
      this.editMode = data['employee'] != null;
      this.initForm();
    });
  }

  ngOnDestroy(){
    /**
     * This prevent memory leak
     */
    this.subscriber.unsubscribe();
  }

  initForm() {
    if (this.editMode) {
      this.employeeForm.setValue({
        "username": this.employee.name,
        "area": this.employee.area.id,
        "telefono": this.employee.phone,
        "email": this.employee.email,
        "imagePath": ""
      })
    }
  }

  onSubmit() {

  }
  
  handleImage(event: any){
    this.image = event.target.files[0];
    console.log(this.image);
  }

}
