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

  BaseUrl = environment.urlAPI + "/API/Pais/List";

  getData(): Observable<any[]> {
    return this.getPaises();
  }

  getPaises(): Observable<Pais[]> {
    return this.http
      .get<APIResponse<Pais[]>>(this.BaseUrl)
      .pipe(map((response) => this.mapResponse(response.data)));
  }

  Eliminar(val: any): Observable<any> {
    console.log(val + "Para Eliminar");
    return this.http.delete<any>(
      `${environment.urlAPI}/API/Pais/Eliminar/?Pais_Id=${val}&Pais_Modifica=1
        `,
      { observe: "response" }
    );
  }

  Editar(pais: any): Observable<any> {
    const json = {
      Pais_Id: pais.Id,
      Pais_Usuario: pais.Pais,
      Pais_Estado: true,
      Pais_Creacion: 1,
      Pais_FechaCreacion: new Date().toISOString(),
      Pais_Modifica: 1,
      Pais_FechaModifica: new Date().toISOString(),
      Rol_Descripcion: "string",
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
      Usua_Id: 0,
      Usua_Usuario: pais.Pais,
      Usua_Estado: true,
      Usua_Creacion: 1,
      Usua_FechaCreacion: new Date().toISOString(),
      Usua_Modifica: 1,
      Usua_FechaModifica: new Date().toISOString(),
      Rol_Descripcion: "string",
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
