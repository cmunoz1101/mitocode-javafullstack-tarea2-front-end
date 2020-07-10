import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Venta } from '../_model/venta';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService extends GenericService<Venta>{

  private VentaCambio = new Subject<Venta []>();
  private mensajeCambio = new Subject<string>();

  constructor(protected httpClient: HttpClient) {
    super(httpClient, `${environment.HOST}/ventas`);
  }

  setVentaCambio(Ventas: Venta[]): void {
    this.VentaCambio.next(Ventas);
  }

  getVentaCambio(): Observable<Venta[]> {
    return this.VentaCambio.asObservable();
  }

  setMensajeCambio(mensaje: string): void {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio(): Observable<string> {
    return this.mensajeCambio.asObservable();
  }

}
