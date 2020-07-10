import { Producto } from './producto';
import { Persona } from './persona';
import { Venta } from './venta';
export class DetalleVenta {

    idDetalleVenta: number;
    venta: Venta;
    producto: Producto;
    cantidad: number;

}
