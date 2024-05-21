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
export class ItemsService implements DataService {
  constructor(private http: HttpClient) {}

  private objetoParaEditar = new BehaviorSubject<Rol>(null);
  data$ = this.objetoParaEditar.asObservable();

  setObjetoParaEditar(data: Rol) {
    this.objetoParaEditar.next(data);
  }

  getObjetoParaEditar() {
    return this.objetoParaEditar.value;
  }

  BaseUrl = environment.urlAPI + "/API/Productos/";

  getData(): Observable<any[]> {
    return this.getItems();
  }

  getItems(): Observable<any[]> {
    return this.http
      .get<APIResponse<any[]>>(this.BaseUrl + "List")
      .pipe(map((response) => this.mapResponse(response.data)));
  }

  ToggleEstado(id: number, estado: boolean): Observable<any> {
    return this.http.put<any>(
      `${
        this.BaseUrl + "ToggleEstado/"
      }?Item_Id=${id}&Usua_Modifica=1&estado=${estado}
      `,
      { observe: "response" }
    );
  }

  Editar(item: any): Observable<any> {
    const json = {
      item_Id: item.Id,
      item_Descripcion: item.Rol,
      arancelesPorAgregar: item._aranceles,
      item_Creacion: 1,
      item_FechaCreacion: new Date().toISOString(),
      item_Modifica: 1,
      item_FechaModifica: new Date().toISOString(),
    };
    return this.http
      .put<any>(this.BaseUrl + "Actualizar", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  Crear(item: any): Observable<any> {
    const json = {
      item_Id: 0,
      item_Descripcion: item.Item,
      arancelesPorAgregar: item._aranceles,
      item_Creacion: 1,
      item_FechaCreacion: new Date().toISOString(),
      item_Modifica: 1,
      item_FechaModifica: new Date().toISOString(),
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
