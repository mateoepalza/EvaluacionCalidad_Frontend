import { EmailValidator } from "@angular/forms";
import { Area } from "../shared/area.model";

export class Employee{
    public _id: string;
    public nombre: string;
    public imagePath: string;
    public area: Area;
    public cargo: string;
    public proceso: string;
    public telefono: string;
    public email: string;

    constructor(_id: string, nombre: string, imagePath: string, area: Area, cargo:string, proceso: string, telefono: string, email: string){
        this._id = _id;
        this.nombre = nombre;
        this.imagePath = imagePath;
        this.area = area;
        this.cargo = cargo;
        this.proceso = proceso;
        this.telefono = telefono;
        this.email = email;
    }
}