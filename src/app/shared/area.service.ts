import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Area } from "./area.model";

@Injectable({
    providedIn: 'root'
})
export class AreaService{
    
    areas: Area[] =[
        new Area('1', 'Corte'),
        new Area('2', 'Recursos humanos'),
        new Area('3', 'Contaduria')
    ] 

    areaListener = new Subject<Area[]>();

    constructor(){
        
    }
    
    getAreas(){
        return this.areas.slice();
    }
    
    getArea(id:string){
        /**
         * Search an Area by it's id
         */
        const area = this.areas.find(elem => elem.id == id);
        return area;
    }
}