import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { Rol } from "../Models/RolesViewModel";
import { APIResponse } from "../Models/APIResponseViewModel";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RolesService implements DataService {
  constructor(private http: HttpClient) {}

  Url = environment.urlAPI + "/API/Rol/List";

  getData(): Observable<any[]> {
    return this.getRoles();
  }

  getRoles(): Observable<Rol[]> {
    return this.http
      .get<APIResponse<Rol[]>>(this.Url)
      .pipe(map((response) => this.mapResponse(response.data)));
  }

  Eliminar(val: any): Observable<any> {
    console.log(val + "Para Eliminar");
    return this.http.delete<any>(
      `${environment.urlAPI}/API/Rol/Eliminar/?Rol_Id=${val}&Rol_Modifica=1
        `,
      { observe: "response" }
    );
  }

  private mapResponse(data: any[]): Rol[] {
    return data.map((item) => {
      const model: Rol = {
        Id: item.rol_Id,
        Rol: item.rol_Descripcion,
      };
      return model;
    });
  }
}
