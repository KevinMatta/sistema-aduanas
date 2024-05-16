import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { APIResponse } from "../Models/APIResponseViewModel";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Estado } from "../Models/EstadosViewModel";
import { Arancel } from "../Models/ArancelesViewModel";

@Injectable({
  providedIn: "root",
})
export class ArancelesService implements DataService {
  constructor(private http: HttpClient) {}

  BaseUrl = environment.urlAPI + "/API/Arancel/";

  getData(): Observable<any[]> {
    return this.getEstados();
  }

  getEstados(): Observable<Estado[]> {
    return this.http
      .get<APIResponse<Estado[]>>(this.BaseUrl + "List")
      .pipe(map((response) => this.mapResponse(response.data)));
  }

  Eliminar(val: any): Observable<any> {
    console.log(val + "Para Eliminar");
    return this.http.delete<any>(
      `${this.BaseUrl + "Eliminar/"}?id=${val}&usuario=1
        `,
      { observe: "response" }
    );
  }

  Editar(aran: Arancel): Observable<any> {
    const json = {
      "aran_Id": 0,
      "aran_Descripcion": aran.Arancel,
      "aran_Porcentaje": aran.Porcentaje,
      "aran_Estado": true,
      "aran_Creacion": 0,
      "aran_FechaCreacion": new Date().toISOString(),
      "aran_Modifica": 0,
      "aran_FechaModifica": new Date().toISOString()
    };
    return this.http
      .put<any>(this.BaseUrl + "Actualizar", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  Crear(aran: Arancel): Observable<any> {
    const json = {
        "aran_Id": 0,
        "aran_Descripcion": aran.Arancel,
        "aran_Porcentaje": aran.Porcentaje,
        "aran_Estado": true,
        "aran_Creacion": 0,
        "aran_FechaCreacion": new Date().toISOString(),
        "aran_Modifica": 0,
        "aran_FechaModifica": new Date().toISOString()
    };
    return this.http
      .post<any>(this.BaseUrl + "Crear", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  private mapResponse(data: any[]): Estado[] {
    return data.map((item) => {
      const model: Estado = {
        Id: item.esta_Id,
        Estado: item.esta_Descripcion,
        pais_Id: item.pais_Id,
        Pais: item.pais_Descripcion,
      };
      return model;
    });
  }
}
