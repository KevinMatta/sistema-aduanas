import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DeclaracionDeValor } from "../Models/DeVaViewModel";
import { Factura } from "../Models/FacEncViewModel";
import { Item } from "../Models/ItemsViewModel";

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
    
}
