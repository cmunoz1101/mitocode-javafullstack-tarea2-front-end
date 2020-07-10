import { Persona } from './persona';
import { DetalleVenta } from './detalleVenta';

export class Venta {

    idVenta: number;
    fecha: string;
    persona: Persona;
    importe: number;
    detalleVenta: DetalleVenta[];

}
