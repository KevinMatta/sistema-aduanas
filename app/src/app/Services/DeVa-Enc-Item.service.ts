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

  BaseUrl = environment.urlAPI + "/API/Ciudad/";

  getData(): Observable<any[]> {
    return this.getCiudades();
  }

  getCiudades(): Observable<Cate[]> {
    return this.http
      .get<APIResponse<Ciudad[]>>(this.BaseUrl + "List")
      .pipe(map((response) => this.mapResponse(response.data)));
  }

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
      "deVaViewModel": {
        "deVa_Id": 0,
        "deVa_AduanaIngreso": 0,
        "deVa_AduanaDespacho": 0,
        "deVa_FechaAceptacion": "2024-05-20T19:57:54.621Z",
        "deVa_RtnImportador": "string",
        "deVa_LugarEntrega": "string",
        "deVa_PaisEntrega": 0,
        "deVa_NumeroContrado": "string",
        "deVa_FechaContrado": "2024-05-20T19:57:54.621Z",
        "deVa_PaisEmbarque": 0,
        "deva_LugarEmbarque": 0,
        "deVa_PaisExportacion": 0,
        "deVa_FechaExportacion": "2024-05-20T19:57:54.621Z",
        "deVa_Restricciones": "string",
        "deVa_CondicionContraprestacion": "string",
        "deVa_MontoReversion": 0,
        "deVa_TipoVinculacion": "string",
        "deVa_InfluenciaPrecio": true,
        "deVa_PagosIndirectosDescuentos": "string",
        "deVa_CanonDerechosLicencia": "string",
        "deVa_PrecioFactura": 0,
        "deVa_PagosIndirectosDescuentosRetroactivos": 0,
        "deVa_PrecioRealPagado": 0,
        "deVa_MontoCondicionContraprestacion": 0,
        "deVa_MontoReversionCasilla": 0,
        "deVa_GastosComisiones": 0,
        "deVa_GastosEnvasesEmbalajes": 0,
        "deVa_ValorMaterialesConsumidos": 0,
        "deVa_ValorHerramientas": 0,
        "deVa_ValorMaterialesConsumidos2": 0,
        "deVa_ValorIngenieriaCreacion": 0,
        "deVa_ValorCanoDerechosLicencia": 0,
        "deVa_GastosTransporteMercaderia": 0,
        "deVa_GastosCargaDescarga": 0,
        "deVa_CostosSeguro": 0,
        "deVa_TotalAjustes": 0,
        "deVa_GastosConstruccionArmado": 0,
        "deVa_CostosTransportePosterior": 0,
        "deVa_DerechosImpuestos": 0,
        "deVa_MontoIntereses": 0,
        "deVa_OtrasDeducciones": 0,
        "deVa_TotalDeducciones": 0,
        "deVa_ValorAduana": 0,
        "deVa_Estado": true,
        "deVa_Creacion": 0,
        "deVa_FechaCreacion": "2024-05-20T19:57:54.621Z",
        "deVa_Modifica": 0,
        "deVa_FechaModifica": "2024-05-20T19:57:54.621Z"
      },
      "facturaEncViewModel": {
        "fact_Id": 0,
        "fact_NumeroFactura": "string",
        "fact_Fecha": "2024-05-20T19:57:54.621Z",
        "deva_Id": 0,
        "fact_Estado": true,
        "fact_Creacion": 0,
        "fact_FechaCreacion": "2024-05-20T19:57:54.621Z",
        "fact_Modifica": 0,
        "fact_FechaModifica": "2024-05-20T19:57:54.621Z"
      },
      "facturaDetalleViewModel": [
        {
          "faDe_Id": 0,
          "fact_Id": 0,
          "item_Id": 0,
          "faDe_NumeroItem": 0,
          "faDe_Cantidad": 0,
          "faDe_UnidadMedida": "string",
          "faDe_Caracteristicas": "string",
          "pais_Id": 0,
          "faDe_ValorUnitario": 0,
          "faDe_TotalFactura": 0,
          "faDe_Estado": true,
          "faDe_Creacion": 0,
          "faDe_FechaCreacion": "2024-05-20T19:57:54.621Z",
          "faDe_Modifica": 0,
          "faDe_FechaModifica": "2024-05-20T19:57:54.621Z"
        }
      ]
    }
    const request2 = {
      deVaViewModel: this.Deva[0],
      facturaEncViewModel: this.Encabezado[0],
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