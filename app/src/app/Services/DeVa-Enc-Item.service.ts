import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DeclaracionDeValor } from "../Models/DeVaViewModel";
import { Factura } from "../Models/FacEncViewModel";
import { Item } from "../Models/ItemsViewModel";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { catchError } from 'rxjs/operators';
import { APIResponse } from "../Models/APIResponseViewModel";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root',
})
export class DEDService {
  constructor(private http: HttpClient) { }
  public Items: Item[] = [];
  Encabezado: Factura[] = [];
  Deva: DeclaracionDeValor[] = [];
  subtotal: number = 0;
  numFactura: string;

  agregaritem(item: Item) {
    this.Items.push(item);
    console.log(this.Items + "agregado");
    this.subtotal += item.FaDe_TotalFactura;
  }

  agregarEncabezado(item: Factura) {
    this.Encabezado.push(item);
    this.numFactura = item.Fact_NumeroFactura;
    console.log(this.Encabezado + "agregadoEncabezado");
  }
  agregarDeva(item: DeclaracionDeValor) {
    this.Deva.push(item);
    console.log(this.Deva + "agregado");
    this.enviarDatos().subscribe(response => {
      console.log(response, 'res');
    }, err => {
      console.log(err, 'err');

    });   
  }
  enviarDatos(): Observable<any> {
    const request = {
      deVaViewModel: this.Deva,
      facturaEncViewModel: this.Encabezado,
      facturaDetalleViewModel: this.Items
    };

    console.log(request, 'payload');
    return this.http.post('https://localhost:44332/API/Deva/Crear', 
    request, 
      { headers: 
          new HttpHeaders({ "Content-Type": "application/json" }) 
      }).pipe(map((response) => response));

    const url = 'https://localhost:44332/API/Deva/Crear';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("Payload enviado:", this.Deva);

    // return this.http.post(url, payload, { headers: headers }).pipe(
    //     catchError(error => {
    //     console.error('Error en la solicitud:', error);
    //     throw error;
    //     })
    // );
    return this.http.post<any>(`${environment.urlAPI}/API/Deva/Crear
        `, request, {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    })
      .pipe(map((response) => response));

  }
}
