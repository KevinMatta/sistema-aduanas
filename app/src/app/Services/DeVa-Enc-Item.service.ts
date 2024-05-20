import { HttpClient, HttpHeaders  } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DeclaracionDeValor } from "../Models/DeVaViewModel";
import { Factura } from "../Models/FacEncViewModel";
import { Item } from "../Models/ItemsViewModel";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APIResponse } from "../Models/APIResponseViewModel";
import { environment } from "../../environments/environment";
@Injectable({
    providedIn: 'root',
  })
  export class DEDService {    
    constructor(private http: HttpClient) {}
    public Items: Item[] = [];
    Encabezado: Factura[] = [];
    Deva: DeclaracionDeValor[] = [];
    subtotal:number=0;
    numFactura:string;
    
    agregaritem(item: Item) {
        this.Items.push(item);
        console.log(this.Items + "agregado");
        this.subtotal += item.FaDe_TotalFactura; 
    }

    agregarEncabezado(item: Factura) {
        this.Encabezado.push(item);
        this.numFactura=item.Fact_NumeroFactura;
        console.log(this.Encabezado + "agregadoEncabezado");
    }
    agregarDeva(item: DeclaracionDeValor){
        this.Deva.push(item);
        console.log(this.Deva + "agregado");
        this.enviarDatos();   
        
    }
    enviarDatos(): Observable<any> {
        const payload = {
          declaracionDeValor: this.Deva[0], 
          factura: this.Encabezado[0],     
          detallesFactura: this.Items       
        };
        // console.log(payload);
        // return this.http.post('http://api-aduana.somee.com/API/Deva/Crear', payload);  
        console.log("Payload enviado:", payload);

        const url = 'https://localhost:44332/API/Deva/Crear';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(url, payload, { headers: headers }).pipe(
            catchError(error => {
            console.error('Error en la solicitud:', error);
            throw error; // Re-lanza el error para que lo maneje el componente que llama a este método
            })
        );
      }
    
}
