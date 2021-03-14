import { Component, Input, OnInit } from '@angular/core';
import { Area } from 'src/app/shared/area.model';
import { AreaService } from 'src/app/shared/area.service';
import { Employee } from '../../employee.model';

@Component({
  selector: 'app-employees-item',
  templateUrl: './employees-item.component.html',
  styleUrls: ['./employees-item.component.css']
})
export class EmployeesItemComponent implements OnInit {

  @Input() employee: Employee;
  area: Area;

  constructor() { }

  ngOnInit(): void {
  }

}
