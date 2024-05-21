import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { APIResponse } from "../Models/APIResponseViewModel";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Arancel } from "../Models/ArancelesViewModel";

@Injectable({
  providedIn: "root",
})
export class ArancelesService implements DataService {
  constructor(private http: HttpClient) {}

  BaseUrl = environment.urlAPI + "/API/Arancel/";

  getData(): Observable<any[]> {
    return this.getAranceles();
  }

  getAranceles(): Observable<Arancel[]> {
    return this.http
      .get<APIResponse<Arancel[]>>(this.BaseUrl + "List")
      .pipe(map((response) => this.mapResponse(response.data)));
  }

  ToggleEstado(id: number, estado: boolean): Observable<any> {
    return this.http.put<any>(
      `${
        this.BaseUrl + "ToggleEstado/"
      }?Usua_Id=${id}&Usua_Modifica=1&estado=${estado}
      `,
      { observe: "response" }
    );
  }

  Editar(aran: Arancel): Observable<any> {
    const json = {
      aran_Id: aran.Id,
      aran_Descripcion: aran.Arancel,
      aran_Porcentaje: aran.Porcentaje,
      aran_Estado: true,
      aran_Creacion: 1,
      aran_FechaCreacion: new Date().toISOString(),
      aran_Modifica: 1,
      aran_FechaModifica: new Date().toISOString(),
    };
    return this.http
      .put<any>(this.BaseUrl + "Actualizar", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  Crear(aran: Arancel): Observable<any> {
    const json = {
      aran_Id: 0,
      aran_Descripcion: aran.Arancel,
      aran_Porcentaje: aran.Porcentaje,
      aran_Estado: true,
      aran_Creacion: 1,
      aran_FechaCreacion: new Date().toISOString(),
      aran_Modifica: 1,
      aran_FechaModifica: new Date().toISOString(),
    };
    return this.http
      .post<any>(this.BaseUrl + "Crear", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  private mapResponse(data: any[]): Arancel[] {
    return data.map((item) => {
      const model: Arancel = {
        Id: item.aran_Id,
        Arancel: item.aran_Descripcion,
        Porcentaje: item.aran_Porcentaje,
        _Estado:  item.aran_Estado
      };
      return model;
    });
  }
}
