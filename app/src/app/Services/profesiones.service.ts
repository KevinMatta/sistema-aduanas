import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { APIResponse } from "../Models/APIResponseViewModel";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Pais } from "../Models/PaisesViewModel";
import { Profesion } from "../Models/ProfesionesViewModel";

@Injectable({
  providedIn: "root",
})
export class ProfesionesService implements DataService {
  constructor(private http: HttpClient) {}

  BaseUrl = environment.urlAPI + "/API/Profesion/";

  getData(): Observable<any[]> {
    return this.getPaises();
  }

  getPaises(): Observable<Profesion[]> {
    return this.http
      .get<APIResponse<Profesion[]>>(this.BaseUrl + "List")
      .pipe(map((response) => this.mapResponse(response.data)));
  }

  Eliminar(val: any): Observable<any> {
    console.log(val + "Para Eliminar");
    return this.http
      .delete<any>(
        `${this.BaseUrl + "Eliminar/"}?id=${val}&usuario=1
        `
      )
      .pipe(map((response) => response));
  }

  Editar(prof: any): Observable<any> {
    const json = {
      prof_Id: prof.Id,
      prof_Descripcion: prof.Profesion,
      prof_Estado: true,
      prof_Creacion: 1,
      prof_FechaCreacion: new Date().toISOString(),
      prof_Modifica: 1,
      prof_FechaModifica: new Date().toISOString(),
      Creacion: "string",
      Modifica: "string",
    };
    return this.http
      .put<any>(this.BaseUrl + "Actualizar", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  Crear(prof: any): Observable<any> {
    const json = {
      prof_Id: 0,
      prof_Descripcion: prof.Profesion,
      prof_Estado: true,
      prof_Creacion: 1,
      prof_FechaCreacion: new Date().toISOString(),
      prof_Modifica: 1,
      prof_FechaModifica: new Date().toISOString(),
      Creacion: "string",
      Modifica: "string",
    };
    return this.http
      .post<any>(this.BaseUrl + "Crear", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  private mapResponse(data: any[]): Profesion[] {
    return data.map((item) => {
      const model: Profesion = {
        Id: item.prof_Id,
        Profesion: item.prof_Descripcion,
        _Estado: item.prof_Estado,
      };
      return model;
    });
  }
}
