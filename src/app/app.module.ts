import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesEditComponent } from './employees/employees-edit/employees-edit.component';
import { EmployeesDetailComponent } from './employees/employees-detail/employees-detail.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StatisticsDetatilComponent } from './statistics/statistics-detatil/statistics-detatil.component';
import { AppRoutingModule } from './app-routing.module';
import { GeneralStatisticsComponent } from './statistics/general-statistics/general-statistics.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { EmployeesItemComponent } from './employees/employees-list/employees-item/employees-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmployeesComponent,
    EmployeesEditComponent,
    EmployeesDetailComponent,
    StatisticsComponent,
    StatisticsDetatilComponent,
    GeneralStatisticsComponent,
    EmployeesListComponent,
    EmployeesItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
