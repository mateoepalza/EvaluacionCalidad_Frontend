import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/shared/area.model';
import { AreaService } from 'src/app/shared/area.service';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

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

  constructor(private route: ActivatedRoute, private areaService: AreaService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    /**
     * Get all the areas
     */
    this.subscriber = this.areaService.getAreas().subscribe( (data) =>{
        this.areasList = data;
    });
    
    /**
     * We create the elements of our formGroup
     */
    this.employeeForm = new FormGroup({
      /**
       * We create the controls that we defined in the HMTL
       */
      "id": new FormControl(),
      "username": new FormControl(),
      "area": new FormControl(0),
      "cargo": new FormControl(),
      "proceso": new FormControl(),
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
        "id": this.employee._id,
        "username": this.employee.nombre,
        "area": this.employee.area._id,
        "cargo": this.employee.cargo,
        "proceso": this.employee.proceso,
        "telefono": this.employee.telefono,
        "email": this.employee.email,
        "imagePath": this.employee.imagePath
      })
      
    }
  }

  onSubmit() {
    /**
     * Create the new employee
     */
    const newEmployee = new Employee(
      this.employeeForm.value['id'],
      this.employeeForm.value['username'],
      this.employeeForm.value['imagePath'],
      this.employeeForm.value['area'],
      this.employeeForm.value['cargo'],
      this.employeeForm.value['proceso'],
      this.employeeForm.value['telefono'],
      this.employeeForm.value['email'],
    );

    if(this.editMode){
      this.employeeService.updateEmployee(newEmployee);
    }else{
      this.employeeService.createEmployee(newEmployee);
    }
  }
  
  handleImage(event: any){
    this.image = event.target.files[0];
  }

}
