import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Employee } from "../employee.model";
import { EmployeeService } from "../employee.service";

/**
 * This resolver will search for the employee with the id that is located in the URL
 */
@Injectable({
    providedIn: 'root'
})
export class ResolverService implements Resolve<Employee>{
    /**
     * We inject the EmployeeService in order to search an specific employ
     */
    constructor(private employeeService: EmployeeService ){
    }

    /**
     * We take the id of the object and we search the object in the service
     */
    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee> | Promise<Employee> | Employee{
        return this.employeeService.getEmployee(route.params['id']); 
    }
}