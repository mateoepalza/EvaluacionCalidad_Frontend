import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Area } from "./area.model";

@Injectable({
    providedIn: 'root'
})
export class AreaService{
    
    /*areas: Area[] =[
        new Area(1, 'Corte'),
        new Area(2, 'Recursos humanos'),
        new Area(3, 'Contaduria')
    ] */
    areas: Area[] = [];

    areaListener = new Subject<Area[]>();

    constructor(private http: HttpClient){
        
    }
    
    getAreas(){
        return this.http.get<{ [s:string]:Area[]}>(
            "http://127.0.0.1:4242/areas",
        ).pipe(
            map((response) =>{
                const resAreas : Area[] = [];
                for(let key in response){
                    if(response.hasOwnProperty(key)){
                        resAreas.push(...response[key]);
                    }
                }
                return resAreas;
            })
        )
        //return this.areas.slice();
    }
    
    getArea(id:number){
        /**
         * Search an Area by it's id
         */
        const area = this.areas.find(elem => elem._id == id);
        return area;
    }
}