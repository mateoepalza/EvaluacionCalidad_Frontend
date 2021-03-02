import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Employee } from "./employee.model";


@Injectable({
    providedIn: "root"
})
export class EmployeeService{

    /**
     * Create our listener 
     */
    employeesListener = new Subject<Employee[]>();

    /**
     * List of employees
     */
    private employees: Employee[] = [
        new Employee(
            "1",
            "Mateo Epalza Ramirez",
            "Corte",
            "3132683259",
            "mateoepalzaramirez@gmail.com"
        ),
        new Employee(
            "2",
            "Gloria Ramirez Duarte",
            "Nómina y prestaciones",
            "3124106058",
            "gloriaramired24@hotmail.com"
        ),
        new Employee(
            "3",
            "Alfredo Epalza Leon",
            "Chef",
            "3133216544",
            "robert05_99@yahoo.es"
        )
    ]

    /**
     * Get all the employees
     */
    getEmployees(){
        return this.employees.slice();
    }

    /**
     * Get one employee
     */
    getEmployee(id:string){
        const element = this.employees.find( (obj) =>{
            obj.id === id
        });
        return element
    }

    /**
     * Create a new employee
     */
    createEmployee(employee: Employee){
        /**
         * Add the neew employee to the list
         */
        this.employees.push(employee);

        /**
         * Emit the new list of employees to all the subscribers
         */
        this.employeesListener.next(this.employees.slice());
    }
    
    /**
     *  Delete an specific employee 
     */
    deleteEmployee(id:string){
        /**
         * search for the element that has the id passed
         */
        const element = this.employees.find((obj) =>{
           obj.id === id; 
        });
        
        /**
         * Find the index of the object
         */
        const index = this.employees.indexOf(element);
        
        /**
         * Delete the element using the index
         */
        this.employees.slice(index, 1);

        /**
         * Emit the new list of employees
         */
        this.employeesListener.next(this.employees.slice());
    }
}