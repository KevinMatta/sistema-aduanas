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
export class PersonaNaturalService {
  constructor(private http: HttpClient) {}

  BaseUrl = environment.urlAPI + "/API/PersonaNatural/";

  Crear(peNa: any): Observable<any> {
    const json = {
      Usua_Id: 0,
      Usua_Usuario: peNa.Usuario,
      Usua_Clave: peNa.Clave,
      Rol_Id: peNa.rol_Id,
      Usua_IsAdmin: peNa.EsAdmin ?? false,
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
}
