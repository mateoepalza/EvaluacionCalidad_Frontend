import { EmailValidator } from "@angular/forms";
import { Area } from "../shared/area.model";

export class Employee{
    public id: string;
    public name: string;
    public imagePath: string;
    public area: Area;
    public phone: string;
    public email: string;

    constructor(id: string, name: string, imagePath: string, area: Area, phone: string, email: string){
        this.id = id;
        this.name = name;
        this.imagePath = imagePath;
        this.area = area;
        this.phone = phone;
        this.email = email;
    }
}