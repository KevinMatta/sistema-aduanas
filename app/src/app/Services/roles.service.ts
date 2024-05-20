import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
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

  private objetoParaEditar = new BehaviorSubject<any>(null);
  data$ = this.objetoParaEditar.asObservable();

  setObjetoParaEditar(data: any) {
    this.objetoParaEditar.next(data);
  }

  getObjetoParaEditar() {
    return this.objetoParaEditar.value;
  }

  BaseUrl = environment.urlAPI + "/API/Rol/";

  getData(): Observable<any[]> {
    return this.getRoles();
  }

  getRoles(): Observable<Rol[]> {
    return this.http
      .get<APIResponse<Rol[]>>(this.BaseUrl + "List")
      .pipe(map((response) => this.mapResponse(response.data)));
  }

  ToggleEstado(id: number, estado: boolean): Observable<any> {
    return this.http.put<any>(
      `${
        this.BaseUrl + "ToggleEstado/"
      }?Rol_Id=${id}&Usua_Modifica=1&estado=${estado}
      `,
      { observe: "response" }
    );
  }

  Crear(
    rol_Descripcion: string,
    pantallasPorAgregar: number[]
  ): Observable<any> {
    const json = {
      rol_Id: 0,
      rol_Descripcion,
      pantallasPorAgregar,
      Rol_Creacion: 1,
      Rol_FechaCreacion: new Date().toISOString(),
      Rol_Modifica: 1,
      Rol_FechaModifica: new Date().toISOString(),
    };
    return this.http
      .post<any>(this.BaseUrl + "Crear", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  private mapResponse(data: any[]): Rol[] {
    return data.map((item) => {
      const model: Rol = {
        Id: item.rol_Id,
        Rol: item.rol_Descripcion,
        _Activo: item.rol_Estado,
        _pantallas: item.pantallasPorAgregar,
      };
      return model;
    });
  }
}
