import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../employee.model';

@Component({
  selector: 'app-employees-item',
  templateUrl: './employees-item.component.html',
  styleUrls: ['./employees-item.component.css']
})
export class EmployeesItemComponent implements OnInit {

  @Input() employee: Employee;

  constructor() { }

  ngOnInit(): void {
  }

}
