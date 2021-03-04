import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EmployeesDetailComponent } from "./employees/employees-detail/employees-detail.component";
import { ResolverService } from "./employees/employees-detail/resolver.service";
import { EmployeesEditComponent } from "./employees/employees-edit/employees-edit.component";
import { EmployeesComponent } from "./employees/employees.component";
import { GeneralStatisticsComponent } from "./statistics/general-statistics/general-statistics.component";
import { StatisticsDetatilComponent } from "./statistics/statistics-detatil/statistics-detatil.component";
import { StatisticsComponent } from "./statistics/statistics.component";

const routes = [
    { path: "",  redirectTo: '/employees', pathMatch: 'full'},
    /**
     * This is the path for adding, modifing and creating employees
     */
    {path: 'employees', component: EmployeesComponent, children:[
        { path: '' , redirectTo: 'new', pathMatch: 'full'},
        { path: 'new', component: EmployeesEditComponent },
        { path: ':id', component: EmployeesDetailComponent, resolve:{employee: ResolverService} },
        { path: ':id/edit', component: EmployeesEditComponent, resolve: {employee: ResolverService}}
    ]},
    /**
     * This is the path for searching the statistic for each employee
     */
    { path: 'stats', component: StatisticsComponent, children:[
        { path: '', component: GeneralStatisticsComponent},
        { path: ':id', component: StatisticsDetatilComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}