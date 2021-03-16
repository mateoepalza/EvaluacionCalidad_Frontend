import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/employees/employee.model';

@Component({
  selector: 'app-create-statistic',
  templateUrl: './create-statistic.component.html',
  styleUrls: ['./create-statistic.component.css']
})
export class CreateStatisticComponent implements OnInit, OnDestroy {

  /**
   * Employee
   */
  employee: Employee;
  /**
   * employee subscriber
   */
  employeeSub: Subscription;
  /**
   * 
   */
  statForm: FormGroup;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    /**
     * Get the employee from the resolver
     */
    this.employeeSub = this.route.data.subscribe((data) => {
      this.employee = data['employee'];
    })

    /**
     * Create form
     */
    this.statForm = new FormGroup({
      "Conocimiento": new FormGroup({
        "practico": new FormControl(),
        "teorico": new FormControl()
      }),
      "SaberHacer": new FormGroup({
        "calidad": new FormControl(),
        "productividad": new FormControl(),
        "puntualidad": new FormControl(),
        "orientacion": new FormControl()
      }),
      "SaberEstar": new FormGroup({
        "adaptabilidad": new FormControl(),
        "calidadTrabajo": new FormControl(),
        "autocontrol": new FormControl(),
        "compromiso": new FormControl(),
        "confianza": new FormControl(),
        "constancia": new FormControl(),
        "cooperacion": new FormControl(),
        "disciplina": new FormControl(),
        "honestidad": new FormControl(),
        "relaciones": new FormControl(),
        "responsabilidad": new FormControl(),
        "tolerancia": new FormControl() 
      })
    })
  }

  ngOnDestroy(): void {
    this.employeeSub.unsubscribe();
  }

  onSubmit(){
    console.log(this.statForm);
  }
}
