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
  constructor(private http: HttpClient) { }

  BaseUrl = environment.urlAPI + "/API/Usuario/";

  getData(): Observable<any[]> {
    return this.getUsuarios();
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http
      .get<APIResponse<Usuario[]>>(this.BaseUrl + "List")
      .pipe(map((response) => this.mapResponse(response.data)));
  }

  Editar(val: any): void {
    console.log(val + "DESDE EL SERVICIO");
  }


  Crear(usuario:any): Observable<any> {
    console.log(this.BaseUrl + "Crear", 'url');
    
    new FormData()
    return this.http
      .post<any>(this.BaseUrl + "Crear", usuario, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(map(response=>response));
  }

  private mapResponse(data: any[]): Usuario[] {
    return data.map((item) => {
      const model: Usuario = {
        Id: item.usua_Id,
        Usuario: item.usua_Usuario,
        Rol: item.rol_Descripcion,
        Admin: item.usua_IsAdmin ? 'SI' : 'NO'
      };
      return model;
    });
  }
}
