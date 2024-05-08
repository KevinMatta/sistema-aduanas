import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { APIResponse } from "../Models/APIResponseViewModel";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Pais } from "../Models/PaisesViewModel";

@Injectable({
  providedIn: "root",
})
export class PaisesService implements DataService {
  constructor(private http: HttpClient) {}

  BaseUrl = environment.urlAPI + "/API/Pais/";

  getData(): Observable<any[]> {
    return this.getPaises();
  }

  getPaises(): Observable<Pais[]> {
    return this.http
      .get<APIResponse<Pais[]>>(this.BaseUrl + "List")
      .pipe(map((response) => this.mapResponse(response.data)));
  }

  Eliminar(val: any): Observable<any> {
    console.log(val + "Para Eliminar");
    return this.http.delete<any>(
      `${this.BaseUrl + "Eliminar/"}?Pais_Id=${val}&Pais_Modifica=1
        `,
      { observe: "response" }
    );
  }

  Editar(pais: any): Observable<any> {
    const json = {
      pais_Id: pais.Id,
      pais_Descripcion: pais.Pais,
      pais_Estado: true,
      pais_Creacion: 1,
      pais_FechaCreacion: new Date().toISOString(),
      pais_Modifica: 1,
      pais_FechaModifica: new Date().toISOString(),
      Creacion: "string",
      Modifica: "string",
    };
    return this.http
      .put<any>(this.BaseUrl + "Actualizar", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  Crear(pais: any): Observable<any> {
    const json = {
      // "pais_Id": 0,
      // "pais_Descripcion": "string",
      // "pais_Estado": true,
      // "pais_Creacion": 0,
      // "pais_FechaCreacion": "2024-05-08T20:58:00.424Z",
      // "pais_Modifica": 0,
      // "pais_FechaModifica": "2024-05-08T20:58:00.424Z",
      // "creacion": "string",
      // "modifica": "string"
      pais_Id: 0,
      pais_Descripcion: pais.Pais,
      pais_Estado: true,
      pais_Creacion: 1,
      pais_FechaCreacion: new Date().toISOString(),
      pais_Modifica: 1,
      pais_FechaModifica: new Date().toISOString(),
      Creacion: "string",
      Modifica: "string",
    };
    return this.http
      .post<any>(this.BaseUrl + "Crear", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  private mapResponse(data: any[]): Pais[] {
    return data.map((item) => {
      const model: Pais = {
        Id: item.pais_Id,
        Pais: item.pais_Descripcion,
      };
      return model;
    });
  }
}
