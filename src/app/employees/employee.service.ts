import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Area } from "../shared/area.model";
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
            "https://media-exp1.licdn.com/dms/image/C4E03AQEBheaQPlICkw/profile-displayphoto-shrink_200_200/0/1517069779240?e=1619654400&v=beta&t=0KcrWDfr28DIRIjJPSowIF4UlQ0LnslBsGn7SNqz2Oc",
            new Area("1", "Corte"),
            "Corte trazado",
            "Proceso 1",  
            "3132683259",
            "mateoepalzaramirez@gmail.com"
        ),
        new Employee(
            "2",
            "Gloria Ramirez Duarte",
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBAQEBAVEBAVECAbEBUVDRsQEBAgIB0iIiAdHx8kKDQsJCYxJx8fLTstMT1AMDBDIys9TT9AQDQuNzcBCgoKDg0OGhAQFy4fHR0tLS0tLS0tKy0rLS0tLS0tLS0tLS0tLSstKyssKy0tKy0tLS04LTgrKy0rLS04NysrLf/AABEIAMgAyAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xAA7EAABAwIEBAMGBQMCBwAAAAABAAIRAyEEEjFBBSJRYQYycQcTQoGh8JGxwdHhI1JiFIIVJCUzcnPx/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECBAMF/8QAHxEBAQADAAMBAQEBAAAAAAAAAAECAxEhMUESEyIE/9oADAMBAAIRAxEAPwD1IBEJQhJwIlhKhBGwiE6EiAahKhANQnLA8ReKsNguWo8GoR5Bdw9UCTrcVapi2NjM4AEw0kxoYXjvH/aninyzDgUQT5takfkF5/juNV6hl9R7oNs1QlDpML9fVDKrXaODvQynBfKeC45iqJLqNepTcdS2oQuu8Pe1THYdwFcjFU9w8w8ehQPxXvyFyXhrxzh8c5gpmHuMe7J5xqSfQDddahHoIQlCAEsICVIyQiE6EiAaU0hSJpCQMhCdCEGmASohLCpBEJUIBEickQDUIKqcU4hSw1J9as7LTaJcYn5IDnPaD4pGBo5WOHv3tOX/AAH9xXhdSrWxLnO5nvcZJO/qV0XEq7uMY2rXgsw9g0EySBsuhwfDmUwA1oEDYLlnnxs06exwmH8LVyACO57p1Xw1VGrZXo7KJT3UOy5/0rR/CPMH+Ga0WH0WdieCVWCS0n5L1ipRVOtS7KpsouiPKcJiKlCoH0y5j2mQRZy+l/BfGG4zBUa4cXOLYqTGYOGoMLxrj/BGvaXtbcdFc9k/iT/R4o4Wq6KFY2nRj9j89PwXXHLrJt12PdUqaHJwKpmOCWEgTggwiEqISM2EkJyISBhCE4hCAlQlhCpJEJUIBqQpyaUA0leQe2bxQSRw+kbAg1yNzs1euuK+ePaKwHi1Zpkf1Jd3sP0RV652tzwngDSoNnV1yuipUlUwHkZH9tleplY7fL1Nc4mbTCHBIJ+SaUnVHUAVWtTF1Ze1VKyZVRrM1C8649R93iCW2vI7L0aq6Fw/iln9YHtK6a75Z908PX/Zz4tbjqAp1Hf8zSEVBvUGzx+vddm0rwv2R0mnFVJtUFPMxw2gwR6GV7bSetMedlOVcanhRMKlakR0IhKEEJGRJCchANhCVCQSQhKhUkiEIQCFMcnuUbkBC8rwf2pYZzOJ1XkWc1r2H5QfqF7u9ePe2psV8K7Z1Jw/A/ylXTX7P4digKFN7jbImu8QNb8M9N1QwVHNQw8nlFOT3VPE8V93LWM01AtlnclZueW+ZeG3Q8VMccpaR32W1QxIeCWmVw+DrPqGSIBdFwCD9F0/DKkAtiCLFK+HTC2q/GeMGlMCTGkrDZxDF1DZoa3u6Fd4y0l4A6arEq4WofK4gxcZrg+u6qJz60ff1m3JDhvBkLN8SDMynVA0dDvmjBtrMcA6SNzF/mFqYvCB9Go2NWyPVPvKiy2KXsrqn/iIjQ0nj5WXuWHevCPZoP8AqDXEwBTIP5QvcMOVqnpg2e2tTKnYqlEqywpIThKkalUqJCIToQgGwhKhIHISJQqSEIQgGuUblIVG5AQVF577XeH06uEa8mKtJ+amP7h8Q/C/yXob1ynjbA+9pMMTldB9DZTleTrrpxmWUlcRwJofhKH/AK1G3goBJDRfWTqrPAaJp0RTOrHEet7fRa3ZZr7ejhj2MVvDCDOYjsNFYpDKe51WlUYACT0WXTAcbmJKTrMeKHERJvsUtLAsMED91Z4o1gGtkzhlUXadtCn8GUnSswLNYTSyLK/VMKnUKIjKcjnPDmCytkeZ1X9bL2fC6D0XnXg3AH3pLhytMifovRMMtWue6wf9NnjGfGpRKtsKqUFaYqrMsNTwmMTwkZUiVCRkSoQkCJU0JVSSoQhAIVG5SlRuCAgeqWLpBzS1wkEQVeeq9UJVUec4jCOw9V7XGZdLVJTeuj8QYAVKbiGzUaJad7bLkcPU0Bnss+ePHoatv6WMRVEGSuaxNAPfnZMg/cLfxNPV0ZugWRWxFfRtNrL25lOLRO1Rx2AqPBkEgJ/C89OxZZSYqriCJMDrL5TcJTrFwLniJ0y6qvhZYcahqZmz9hVnkmANTYKxWgAxuUzhdD3lZs6AyfklhO1y2ZcnXTcGwYpNA1cfMYW/hws/DNWlQC2ScjzLbb2tCirTFVoq0xIlhikCiYpAkZUFCRIyoSJUA1KmpVSSpU2UoQAUxyeUwpBE5QVAp3KF4QanVC4njeC9zVlo5HmW9uoXdVQud8V0A6j0IdZc854dtWXMnOmraFWxExIAJ6ELOfiSx0PmR9e6tDGjSYXDlbpmosNZzoLWgbGFbLS2JuUrsW2YBWfi8dcibJ8tFzWqtcGegW14ZYMr3bl0LjqD3VD2ldX4ZxgzmgdcuYfkV01zmTPu7cHWYdq0KIVGgr9ELSxLtJWWKvSVhqmhOwqQFQtUgSMsolCRIFlCRCDNBTkwFOlUkqVIEqACmlKSmOeEAjgoXpK+KY0S4gDuVnO4zScYbLr7NT4FqouW8aVctFjthWGa/W36rbq4gmZkDeNVWrYNuJovpOkte2LfQz2/RK49XheWVxWKwTarbibWO4WHW4TVYeR0jaVu8Pz03OoVbPYYM79CtN2HB/BZPONejyWOHdg8RGg73RS4WXGXmewsF1tTBJgwgGyf6L8xjsw4aIiLKTww0uxzyNBSjtqrHERlBWj4HwUNfWPmqeW8GB9lXrn+kbfGLXwmLdmylh9ZWzQrDey55jyKhvfMdphaQeC2QYtobHvC1MPG/RcFbauOw9cscXAmJ20PqtMcXc3UA9NVNL810QTwVzjePkTLNBeCtGhxZhEulnqlwcrTSKOnWDgCDIOhCeCpBUJJQgzUspJSFypJ+ZNdUA3hQV6waCToFhYiqHklx3tMwOicnT418TxNjd5PqszE8WOWQIk2sVR4pQIIgHTooHunKwTG8fgq4ch3EXnIHkyDc3vp9E7hb2NFyCT/AIyk4oyaUAA9xom0qQgRuOnN00T6fFuvUzAiRBEixHRWeHummwxPWTlFraKpQBvExfQ/urmBpANqDljMSLyb/wApCsvxNwvORUbAeLtIvmO7fRZeEq5hu1ws4bhXfEXGq2YUsOxmVlnvy5jJ1A6KP/StqxVZNN5AzNyE67lctmvvmO+rZ+fFRuCV1MRKecFWEkNzNBgkfsqtfEgBwvI1EXCz3G4+2rHKZemRjaRrVBTYJJN+3dbo4rTw76VBrS9sZfNysm1xukZhXUqTRAbUqeYxzX2n0hFXgWctaLFoBjp81pww5OsuzPt4bSn39QEeVxAgK62n/MXUzMJD3uIu6JEQTAE/JPya6AC1tuwXRyQ1mxEQIOnT7CnFEAZnXMWE2+Z9EPbYRaNs2nc/kpXNlsC8mxzXd/CQVPdS25uT9z8lNVbJAAs3/E9FaDOZrReOpIcSP0RWpwXgQSXQea5tJCZfUeBx76QAN2Xt09F0NGuHAEaESFzNWnsNmwfnqrvBsWTLDt5VFFjfBSqGm5CSEhKYSlJTHFBMziFQvMDQAx37qi5sOI3MHUApzg4E5Z6t79k54ztBYJeNGxLT1n0XSLOq3DgcpDDMkyQs/DiXkmbb+VohadB4e4lpElnMCNIN1UwreZxBJnQkWM/qmEtahmaRo6P9h/lU8CbZSJAItcEd53Wlh45gNgMzR8HpbVZ7qeWpGo1Eu5tPzSOJwRe+blt8Lyp6lZwpvLCM2jQGzfv6aqJotqSIMgjnNtkjDldF9dB8NviTHEWB4e2mwzzFwlzx5r3+qt4eGGCOX4f7zuPTdOZs4jNpdu+0nslc0FpJIkDmeIEwdEBoMM3abtEmPPOw6Fc/juHg4n3pLQ3LNURq6bSPT8lfo1XMIbAI+FpvMbymUWGq55mBmk5rjW4/ZFkvilLcb2M6mHVquciB8IIsBOs9VfByuiLFsBpvPqpxSAAAFgLMOpg6qLEdQ7yuOYnbePRJSWqJBBMT5ge40BVRzDItzRYG4Z+6ssOgFrENa7Q95UdWneLgTe/mJvYoCBsETJIm1s+b/wCFT07kX73bYRqkaJOnMRbRrmAqSk3mElwBG8CMv7pGsYJkk2gRAB0I7FQuAJdAgWF2noJlWcO2COXNflINmiLFVpJOVr85JJJnlJ7x0VfEfUFYS3IIJJ1LN+vyH5qs9kEFpjZkO+q0G0AJAJ7uDrt/HqqdWXcw8pHKZMHvpbdTVxsYOvmaDM2uhZvCiGktn0B3Qoc7PLeKpY+oeVo3N1dcs3Gu57m0a/2904URUHCzSIE2F5BubwmV6RbLh/u5oay2nzlR17GYsfMBoZ3n0VunUDgAYI2bmmRa5norWiw9Fr3e+pkMJBBbmzCbXPdMy+YwXCTI0ItshmHipmEEh39QZI1NiO+isVaMamDFn2AN9AEy4ioAzG88msafEosfSghwsb5gAMz9LhS0W3eMtrlzYlz+6svFiCeXcgge70skpQeQdCDB1tNOydWbIa65Fsrhcu9eyfWZBE25uUA2Nt0+iTpo/KMwuWj0QaFptJ5Tlu4HlF9LqWk6DGhvlbIh+8prmgaCNYZYB/f76pAb2uZ5hmE07bII+rIPKdXc8k2kbK1Qoj3Y5Z/wIAzEHzKtVgtaSczBGUgkl14v1V/Dg5RYmdLAOpAjuqiMmfcOLZm5BMw5k3hLUAc0HzNtlImfUqXExrMtBGVwdJdteE1sz0qEWMFzbFTVxBRJ0+K0zOUdYTiwWGmzGnyk6yh1IZiMsMJ5pFnz0UrCREeYgEMc4DKN0GhLDJbczd0k2noUrwTBBIOzTAMA3U+QEFo5mCQ4GS7qIUdQ7kkAj/xdTEJDiZj5dTJMEkgQbOABgKKhSaxuRoiQXPB8wn0UbKwbUgAuJEgAzAjUd7qRrw4ZgbyQ0m4ab2MdE08KaOjYMAAvcyBMGI+9lBXcIc4kZRYkQM0GI+SsVqeURlyVHzmc0SNdPVQ4loGWYLphoAlplAiiBzAusc1h0Qiu28A31JvHqhQrnXSlZuPguEGHC3ruQtCq6AT0Cyy6WybZrEicwOiI5xLTa17bidy0xmYeqzq1N9CHNOaluQBOtwrlN8O6O1AHxgWuYVstzglp5tHCSWtNlamQ6vLW1KZyiRDYuOxWxAgQLbMIA31CxMRQyuqMALKou1xsypOy1sIXZKeYBzoiR8Fr3+SYQVmFrszTNjzmDkvp99Fab1Ai+lh70wontBBHnGUjLb+p1+aWi7QEZublgD+nb7/FI4c9usXM84LvLbQKqAMu7qeXSCXm6unQS4wIh2YDOdIKgqAzeBUIOW5LfvRIzawNiRmk2IABYIUIdYc1hBz5hz9vvqpwLkDlMgvOWz7KvU5YMECIDLXvqmFhrpibONg3NaAdVcptgx5XWLnBvK7tdUaboNjml0kyOTeFchsWE0wLsLDmJnaVUc8jcQTNhldBDGl3K6N1ABchsa84MnUbKbFyIuTLuwNOyrucC0EmaYAIdnuSDupqsfR8AtmCWgcrcvMIPdDmnSZJJ5hALAdEbgmM1wwgEgev4JXj/abFzsvK7aElkzggEmWSMhDiSToo6tiJsd3AQHXsPqnF525XQQ1pdymDqoKzonKJAddpGpmZEoCrnH+ozGQW0HF5G2g/D9lqYEtOnMSMzhNoi0bXWGSJrPzTLWU2382Z156qHjfiBtFgZTl7i0ZSHWEdfvZFsnkscbleR0YqCTUJLSXWDtLjQfwqDy4kuPK8iGDMSwkTMLmeGcerudTbUcKkmBMSzvKtV/FjGPDKINXoDYNUfuXy6XTlLxue5AkGzRd0wWunbtdCo4TidOpTkAtAMZCBBJQq7EWWeG/xWpDQBqTMdYUNIWMdJcLzpt3QhOenOK76UcsHIYgC2X1MqfD1nSAfMAS0wcl9JQhNXD+JYT3tIuaDmYOUBtyd/ULJ4Pihz0/+24bgaD7lIhOJa9SobOBF7MIMzbVLkk5m25uY5fPb7/BCElQ6meWQ0xltTgN3TiLkA5pPNz3ZIQhI1R5aACYdSAGXVxN7euye5vNBuSDlcG+QIQgIabS2WkxBBLsoAqWWnlzEZhcghpbJA0M9kIVxzyR41mwBaQ4EuyiH9lVY46xBDTlZIh0b/fVCEqrH0VrrkAgukF4Lpy+iS2WAJpgEFuUlxIPdCFKyPJvcmTrZppiFSxVQQDNo5HDVojUyhCA5zF8TIa4g3NYcvWBYysevUy5qtQzuZQhZ9uVuXGvRjJOoKfvHS+Ms2aOg/lPrZKbZPmO06oQo+u2La8OYykxrs5LKzvJLZYLbIQhaML2Mu/CTN//Z",
            new Area("2", "Recursos Humanos"),
            "Gerente de recursos humanos",
            "proceso 3",
            "3124106058",
            "gloriaramired24@hotmail.com"
        ),
        new Employee(
            "3",
            "Alfredo Epalza Leon",
            "data:image/jpeg;base64,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",
            new Area("3", "Cocina"),
            "Chef principal",
            "proceso 4",
            "3133216544",
            "robert05_99@yahoo.es"
        )
    ]
    
    constructor(private http: HttpClient){

    }

    /**
     * Get all the employees
     */
    getEmployees(){
        return this.http.get<{[s:string]: Employee[]}>(
            "http://127.0.0.1:4242/employees/"
            ).pipe(
                map( (data) =>{
                    console.log(data);
                    /**
                     * Creo una lista empleados
                     */
                    const resData: Employee[] = [];

                    /**
                     * Itero sobre cada key del data devuelta por el back
                     */
                    for(let key in data){
                        /**
                         * Revisamos que el data si tenga esa propiedad
                         */
                        if (data.hasOwnProperty(key)){
                            /*
                            const elem = data[key];
                            /**
                             * Iteramos por cada elemento y lo guardamos 
                             
                            elem.forEach(obj =>{
                                resData.push(obj);
                            });
                            */
                            /**
                             * This is the same to the process above
                             */
                            resData.push(...data[key]);
                        } 
                    }
                    
                    return resData;
                })
            );
    }

    /**
     * Get one employee
     */
    getEmployee(id:string){
        /**
         * Search the element by id
         */
        return this.http.get(
            "http://127.0.0.1:4242/employees/"+id
        ).pipe(map(data =>{
            let resEmployee: Employee;
            for(let key in data){
                if(data.hasOwnProperty(key)){
                    resEmployee = data[key];
                }            
            }
            return resEmployee;
        }))
    }

    /**
     * Create a new employee
     */
    createEmployee(employee: Employee){
        /*const postEmployee = {
            "_id": employee._id,
            "nombre": employee.nombre,
            "area": employee.area.id,
            "cargo": employee.cargo,
            "proceso": employee.proceso,
            "email": employee.email,
            "telefono": employee.telefono,
            "imagePath": employee.imagePath
        }*/
        this.http.post(
            "http://127.0.0.1:4242/employees", 
            employee)
            .subscribe((data)=>{
                console.log(data);
            }, (error)=>{
                console.error(error);
            });
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
           obj._id === id; 
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
    
    updateEmployee(employee: Employee){

    }
}