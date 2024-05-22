import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { APIResponse } from "../Models/APIResponseViewModel";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Aduana } from "../Models/AduanasViewModel";
import { Empresa } from "../Models/EmpresasViewModel";

@Injectable({
  providedIn: "root",
})
export class EmpresasService implements DataService {
  constructor(private http: HttpClient) {}

  BaseUrl = environment.urlAPI + "/API/Empresa/";

  getData(): Observable<any[]> {
    return this.getEmpresas();
  }

  getEmpresas(): Observable<Empresa[]> {
    return this.http
      .get<APIResponse<Empresa[]>>(this.BaseUrl + "List")
      .pipe(map((response) => this.mapResponse(response.data)));
  }

  Eliminar(val: any): Observable<any> {
    return this.http
      .delete<any>(
        `${this.BaseUrl + "Eliminar/"}?id=${val}&usuario=1
        `
      )
      .pipe(map((response) => response));
  }

  Editar(empr: Empresa): Observable<any> {
    const json = {
      empre_Id: empr.Id,
      empr_Descripcion: empr.Empresa,
      esta_Id: empr.esta_Id,
      ciud_Id: empr.ciud_Id,
      esta_Descripcion: empr.Estado,
      ciud_Descripcion: empr.Ciudad,
      empr_Estado: true,
      empr_Creacion: 1,
      empr_FechaCreacion: new Date().toISOString(),
      empr_Modifica: 1,
      empr_FechaModifica: new Date().toISOString(),
      Creacion: "string",
      Modifica: "string",
    };
    return this.http
      .put<any>(this.BaseUrl + "Actualizar", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  Crear(empr: Empresa): Observable<any> {
    const json = {
      empr_Id: 0,
      empr_Descripcion: empr.Empresa,
      esta_Id: empr.esta_Id,
      ciud_Id: empr.ciud_Id,
      esta_Descripcion: empr.Estado,
      ciud_Descripcion: empr.Ciudad,
      empr_Estado: true,
      empr_Creacion: 1,
      empr_FechaCreacion: new Date().toISOString(),
      empr_Modifica: 1,
      empr_FechaModifica: new Date().toISOString(),
      Creacion: "string",
      Modifica: "string",
    };
    return this.http
      .post<any>(this.BaseUrl + "Crear", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  private mapResponse(data: any[]): Empresa[] {
    return data.map((item) => {
      const model: Empresa = {
        Id: item.empr_Id,
        Empresa: item.empr_Descripcion,
        ciud_Id: item.ciud_Id,
        Ciudad: item.ciud_Descripcion,
        esta_Id: item.esta_Id,
        Estado: item.esta_Descripcion,
        _Estado: item.empr_Estado,
      };
      return model;
    });
  }
}
