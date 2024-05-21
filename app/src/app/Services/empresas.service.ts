import { HttpClient } from "@angular/common/http";
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

  ToggleEstado(id: number, estado: boolean): Observable<any> {
    return this.http.put<any>(
      `${
        this.BaseUrl + "ToggleEstado/"
      }?Usua_Id=${id}&Usua_Modifica=1&estado=${estado}
      `,
      { observe: "response" }
    );
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
        _Activo: item.empr_Estado,
      };
      return model;
    });
  }
}
