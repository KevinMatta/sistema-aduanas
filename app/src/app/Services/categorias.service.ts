import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { APIResponse } from "../Models/APIResponseViewModel";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Categoria } from "../Models/CategoriasViewModel";

@Injectable({
  providedIn: "root",
})
export class CategoriasService implements DataService {
  constructor(private http: HttpClient) {}

  BaseUrl = environment.urlAPI + "/API/Categorias/";

  getData(): Observable<any[]> {
    return this.getCategorias();
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http
      .get<APIResponse<Categoria[]>>(this.BaseUrl + "List")
      .pipe(map((response) => this.mapResponse(response.data)));
  }

  ToggleEstado(id: number, estado: boolean): Observable<any> {
    return this.http.put<any>(
      `${
        this.BaseUrl + "ToggleEstado/"
      }?Cate_Id=${id}&Usua_Modifica=1&estado=${estado}
      `,
      { observe: "response" }
    );
  }

  Editar(categoria: Categoria): Observable<any> {
    const json = {
      cate_Id: categoria.Id,
      cate_Descripcion: categoria.Categoria,
      cate_Estado: true,
      cate_Creacion: 1,
      cate_FechaCreacion: new Date().toISOString(),
      cate_Modifica: 1,
      cate_FechaModifica: new Date().toISOString(),
      Creacion: "string",
      Modifica: "string",
    };
    return this.http
      .put<any>(this.BaseUrl + "Actualizar", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  Crear(categoria: Categoria): Observable<any> {
    const json = {
      cate_Id: 0,
      cate_Descripcion: categoria.Categoria,
      cate_Estado: true,
      cate_Creacion: 1,
      cate_FechaCreacion: new Date().toISOString(),
      cate_Modifica: 1,
      cate_FechaModifica: new Date().toISOString(),
      Creacion: "string",
      Modifica: "string",
    };
    return this.http
      .post<any>(this.BaseUrl + "Crear", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  private mapResponse(data: any[]): Categoria[] {
    return data.map((item) => {
      const model: Categoria = {
        Id: item.cate_Id,
        Categoria: item.cate_Descripcion,
        _Activo: item.cate_Estado,
      };
      return model;
    });
  }
}
