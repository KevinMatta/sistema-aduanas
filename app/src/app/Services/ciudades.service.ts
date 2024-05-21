import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { APIResponse } from "../Models/APIResponseViewModel";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
// import { Estado } from "../Models/EstadosViewModel";
import { Ciudad } from "../Models/CiudadesViewModel";

@Injectable({
  providedIn: "root",
})
export class CiudadesService implements DataService {
  constructor(private http: HttpClient) {}

  BaseUrl = environment.urlAPI + "/API/Ciudad/";

  getData(): Observable<any[]> {
    return this.getCiudades();
  }

  getCiudades(): Observable<Ciudad[]> {
    return this.http
      .get<APIResponse<Ciudad[]>>(this.BaseUrl + "List")
      .pipe(map((response) => this.mapResponse(response.data)));
  }

  Eliminar(val: any): Observable<any> {
    console.log(val + "Para Eliminar");
    return this.http
      .delete<any>(`${this.BaseUrl + "Eliminar/"}?id=${val}&usuario=1`)
      .pipe(map((response) => response));
  }

  Editar(ciud: Ciudad): Observable<any> {
    const json = {
      ciud_Id: ciud.Id,
      ciud_Descripcion: ciud.Ciudad,
      pais_Id: ciud.pais_Id,
      esta_Id: ciud.esta_Id,
      esta_Descripcion: ciud.Estado,
      ciud_Estado: true,
      ciud_Creacion: 1,
      ciud_FechaCreacion: new Date().toISOString(),
      ciud_Modifica: 1,
      ciud_FechaModifica: new Date().toISOString(),
      Creacion: "string",
      Modifica: "string",
    };
    return this.http
      .put<any>(this.BaseUrl + "Actualizar", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  Crear(ciud: Ciudad): Observable<any> {
    const json = {
      ciud_Id: 0,
      ciud_Descripcion: ciud.Ciudad,
      pais_Id: ciud.pais_Id,
      esta_Id: ciud.esta_Id,
      esta_Descripcion: ciud.Estado,
      ciud_Estado: true,
      ciud_Creacion: 1,
      ciud_FechaCreacion: new Date().toISOString(),
      ciud_Modifica: 1,
      ciud_FechaModifica: new Date().toISOString(),
      Creacion: "string",
      Modifica: "string",
    };
    return this.http
      .post<any>(this.BaseUrl + "Crear", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  private mapResponse(data: any[]): Ciudad[] {
    return data.map((item) => {
      const model: Ciudad = {
        Id: item.ciud_Id,
        Ciudad: item.ciud_Descripcion,
        esta_Id: item.esta_Id,
        Estado: item.esta_Descripcion,
        pais_Id: item.pais_Id,
        Pais: item.pais_Descripcion,
        _Estado: item.ciud_Estado,
      };
      return model;
    });
  }
}
