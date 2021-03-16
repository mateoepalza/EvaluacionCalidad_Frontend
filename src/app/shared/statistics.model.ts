export interface Conocimiento{
    practico: number;
    teorico: number;
}
 
export interface SaberHacer{
    calidad: number;
    productividad: number;
    puntualidad: number;
    orientacion: number
}

export interface SaberEstar{
    adaptabilidad: number;
    calidadTrabajo: number;
    autocontrol: number;
    compromiso: number;
    confianza: number;
    constancia: number;
    cooperacion: number;
    disciplina: number;
    honestidad: number;
    relaciones: number;
    responsabilidad: number;
    tolerancia: number;
}

export class Statistic{
    
    constructor(
        public Conocimiento: Conocimiento, 
        public saberHacer: SaberHacer, 
        public saberEstar: SaberEstar
    ){}

}