import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/employees/employee.model';

@Component({
  selector: 'app-statistics-detatil',
  templateUrl: './statistics-detatil.component.html',
  styleUrls: ['./statistics-detatil.component.css']
})
export class StatisticsDetatilComponent implements OnInit {

  @Input() employee: Employee;

  constructor() { }

  ngOnInit(): void {
  }

}
