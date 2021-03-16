import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Statistic } from "../shared/statistics.model";

@Injectable({
   providedIn: 'root' 
})
export class StatisticsService{

    statisticsList = [];

    constructor(private http: HttpClient){}
   
    getStats(){
       
    }
    
    getStat(id: number){
        
    }
    
    createStat(id: number, stat: Statistic){
      return this.http.post(
         "",
         stat
      )
    }

    updateStat(id: number, stat: any){

    }
    
    deleteStat(id: number){

    }
}