import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/contacto`;

  constructor(private http: HttpClient) { }

  enviarMensaje(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }
}
