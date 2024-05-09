import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { APIResponse } from "../Models/APIResponseViewModel";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { EstadoCivil } from "../Models/EstadosCivilesViewModel";

@Injectable({
  providedIn: "root",
})
export class EstadosCivilesService implements DataService {
  constructor(private http: HttpClient) {}

  BaseUrl = environment.urlAPI + "/API/EstadoCivil/";

  getData(): Observable<any[]> {
    return this.getEstadosCiviles();
  }

  getEstadosCiviles(): Observable<EstadoCivil[]> {
    return this.http
      .get<APIResponse<EstadoCivil[]>>(this.BaseUrl + "List/")
      .pipe(map((response) => this.mapResponse(response.data)));
  }

  Eliminar(val: any): Observable<any> {
    console.log(val + "Para Eliminar");
    return this.http.delete<any>(
      `${this.BaseUrl + "Eliminar/"}?id=${val}&usuario=1`,
      { observe: "response" }
    );
  }

  Editar(esta: any): Observable<any> {
    const json = {
      esta_Id: esta.Id,
      pais_Id: esta.pais_Id,
      esta_Descripcion: esta.Estado,
      esta_Estado: true,
      esta_Creacion: 1,
      esta_FechaCreacion: new Date().toISOString(),
      esta_Modifica: 1,
      esta_FechaModifica: new Date().toISOString(),
      pais_Descripcion: esta.Pais ?? "pais_descripcion",
      Creacion: "string",
      Modifica: "string",
    };
    return this.http
      .put<any>(this.BaseUrl + "Actualizar", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  Crear(esta: any): Observable<any> {
    const json = {
      esta_Id: 0,
      pais_Id: esta.pais_Id,
      esta_Descripcion: esta.Estado,
      pais_Estado: true,
      pais_Creacion: 1,
      pais_FechaCreacion: new Date().toISOString(),
      pais_Modifica: 1,
      pais_FechaModifica: new Date().toISOString(),
      pais_Descripcion: esta.Pais ?? "pais_descripcion",
      Creacion: "string",
      Modifica: "string",
    };
    return this.http
      .post<any>(this.BaseUrl + "Crear", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  private mapResponse(data: any[]): EstadoCivil[] {
    return data.map((item) => {
      const model: EstadoCivil = {
        Id: item.esCi_Id,
        ["Estado Civil"]: item.esCi_Descripcion,
      };
      return model;
    });
  }
}
