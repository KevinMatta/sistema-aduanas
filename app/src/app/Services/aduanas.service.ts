import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { APIResponse } from "../Models/APIResponseViewModel";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Aduana } from "../Models/AduanasViewModel";

@Injectable({
  providedIn: "root",
})
export class AduanasService implements DataService {
  constructor(private http: HttpClient) {}

  BaseUrl = environment.urlAPI + "/API/Aduana/";

  getData(): Observable<any[]> {
    return this.getAduanas();
  }

  getAduanas(): Observable<Aduana[]> {
    return this.http
      .get<APIResponse<Aduana[]>>(this.BaseUrl + "List")
      .pipe(map((response) => this.mapResponse(response.data)));
  }

  Eliminar(val: any): Observable<any> {
    console.log(val + "Para Eliminar");
    return this.http.delete<any>(
      `${this.BaseUrl + "Eliminar/" }?id=${val}&usuario=1`,
      { observe: "response" }
    );
  }

  Editar(adua: any): Observable<any> {
    const json = {
      adua_Id: 0,
      esta_Id: adua.esta_Id,
      ciud_Id: adua.ciud_Id,
      esta_Descripcion: adua.Estado,
      ciud_Descripcion: adua.Ciudad,
      adua_Estado: true,
      adua_Creacion: 1,
      adua_FechaCreacion: new Date().toISOString(),
      adua_Modifica: 1,
      adua_FechaModifica: new Date().toISOString(),
      Creacion: "string",
      Modifica: "string",
    };
    return this.http
      .put<any>(this.BaseUrl + "Actualizar", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  Crear(adua: any): Observable<any> {
    const json = {
      adua_Id: 0,
      esta_Id: adua.esta_Id,
      ciud_Id: adua.ciud_Id,
      esta_Descripcion: adua.Estado,
      ciud_Descripcion: adua.Ciudad,
      adua_Estado: true,
      adua_Creacion: 1,
      adua_FechaCreacion: new Date().toISOString(),
      adua_Modifica: 1,
      adua_FechaModifica: new Date().toISOString(),
      Creacion: "string",
      Modifica: "string",
    };
    return this.http
      .post<any>(this.BaseUrl + "Crear", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  private mapResponse(data: any[]): Aduana[] {
    return data.map((item) => {
      const model: Aduana = {
        Id: item.adua_Id,
        Aduana: item.adua_Descripcion,
        Estado: item.esta_Descripcion,
        esta_Id: item.esta_Id,
        Ciudad: item.ciud_Descripcion,
        ciud_Id: item.ciud_Id,
      };
      return model;
    });
  }
}
