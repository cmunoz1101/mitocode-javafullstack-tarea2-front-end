import { environment } from './../../environments/environment';
import { Producto } from './../_model/producto';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends GenericService<Producto>{

  private ProductoCambio = new Subject<Producto[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected httpClient: HttpClient) {
    super(httpClient, `${environment.HOST}/productos`);
  }

  setProductoCambio(Productos: Producto[]): void {
    this.ProductoCambio.next(Productos);
  }

  getProductoCambio(): Observable<Producto[]> {
    return this.ProductoCambio.asObservable();
  }

  setMensajeCambio(mensaje: string): void {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio(): Observable<string> {
    return this.mensajeCambio.asObservable();
  }

}
