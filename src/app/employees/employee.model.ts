import { EmailValidator } from "@angular/forms";

export class Employee{
    public id: string;
    public name: string;
    public area: string;
    public telefono: string;
    public email: string;

    constructor(id: string, name: string, area: string, telefono: string, email: string){
        this.id = id;
        this.name = name;
        this.area = area;
        this.telefono = telefono;
        this.email = email;
    }
}