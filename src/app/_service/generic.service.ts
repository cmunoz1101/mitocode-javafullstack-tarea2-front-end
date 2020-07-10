import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  constructor(protected httpClient: HttpClient,
              @Inject(String) protected url: string) { }

  listar(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url);
  }

  listarPorId(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.url}/${id}`);
  }

  registrar(t: T): Observable<any> {
    return this.httpClient.post(this.url, t);
  }

  modificar(t: T): Observable<any> {
    return this.httpClient.put(this.url, t);
  }

  eliminar(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
