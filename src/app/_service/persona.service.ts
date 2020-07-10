import { environment } from './../../environments/environment';
import { Persona } from './../_model/persona';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService extends GenericService<Persona>{

  private personaCambio = new Subject<Persona[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected httpClient: HttpClient) {
    super(httpClient, `${environment.HOST}/personas`);
  }

  setPersonaCambio(personas: Persona[]): void {
    this.personaCambio.next(personas);
  }

  getPersonaCambio(): Observable<Persona[]> {
    return this.personaCambio.asObservable();
  }

  setMensajeCambio(mensaje: string): void {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio(): Observable<string> {
    return this.mensajeCambio.asObservable();
  }
}
