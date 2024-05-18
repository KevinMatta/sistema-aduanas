import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { APIResponse } from "../Models/APIResponseViewModel";
import { Usuario } from "../Models/UsuariosViewModel";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormUsuariosComponent } from "../components/form-usuarios/form-usuarios.component";

@Injectable({
  providedIn: "root",
})
export class UsuariosService implements DataService {
  constructor(private http: HttpClient) {}

  BaseUrl = environment.urlAPI + "/API/Usuario/";

  getData(): Observable<any[]> {
    return this.getUsuarios();
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http
      .get<APIResponse<Usuario[]>>(this.BaseUrl + "List")
      .pipe(map((response) => this.mapResponse(response.data)));
  }

  Eliminar(val: any): Observable<any> {
    console.log(val + "Para Eliminar");
    return this.http.delete<any>(
      `${this.BaseUrl + "Eliminar/"}?Usua_Id=${val}&Usua_Modifica=1
      `,
      { observe: "response" }
    );
  }

  Editar(usuario: any): Observable<any> {
    const json = {
      Usua_Id: usuario.Id,
      Usua_Usuario: usuario.Usuario,
      Usua_Clave: usuario.Clave ?? "AAA",
      Rol_Id: usuario.rol_Id,
      Usua_IsAdmin: usuario.EsAdmin ?? false,
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
      .put<any>(this.BaseUrl + "Actualizar", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  Crear(usuario: any): Observable<any> {
    const json = {
      Usua_Id: 0,
      Usua_Usuario: usuario.Usuario,
      Usua_Clave: usuario.Clave,
      Rol_Id: usuario.rol_Id,
      Usua_IsAdmin: usuario.EsAdmin ?? false,
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

  private mapResponse(data: any[]): Usuario[] {
    return data.map((item) => {
      const model: Usuario = {
        Id: item.usua_Id,
        Usuario: item.usua_Usuario,
        Rol: item.rol_Descripcion,
        Empleado: item.Empl_NombreCompleto,
        DNI: item.Empl_NombreCompleto,
        Admin: item.usua_IsAdmin ? "SI" : "NO",
      };
      return model;
    });
  }
}
