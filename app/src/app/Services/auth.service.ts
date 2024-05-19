import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { first, map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { Usuario } from "../Models/UsuariosViewModel";
import { APIResponse } from "../Models/APIResponseViewModel";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private userSubject: BehaviorSubject<Usuario>;
  public user: Observable<Usuario>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<Usuario>(
      JSON.parse(localStorage.getItem("user"))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): Usuario {
    return this.userSubject.value;
  }

  RestablecerClave(PIN: string, clave): Observable<any> {
    return this.http.put<APIResponse<any>>(
      `${environment.urlAPI}/API/Usuario/ReestablecerClave?PIN=${PIN}&clave=${clave}`,
      { observe: "response" }
    );
  }

  enviarPin(usuario: string): Observable<any> {
    return this.http
      .post<APIResponse<any>>(
        `${environment.urlAPI}/API/Usuario/EnviarCodigo?usuario=${usuario}`,
        usuario
      )
      .pipe(first());
  }

  login(username: string, password: string) {
    const json = {
      Usua_Id: 0,
      Usua_Usuario: username,
      Usua_Clave: password,
      Rol_Id: 1,
      Usua_IsAdmin: false,
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
      .post<any>(`${environment.urlAPI}/API/Usuario/IniciarSesion`, json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(
        map((response) => {
          if (response.code >= 200 && response.code < 300) {
            if (response.data.usua_Estado) {
              response.data["expiry"] =
                new Date().getTime() + 8 * 60 * 60 * 1000;
              localStorage.setItem("user", JSON.stringify(response.data));
              this.userSubject.next(response.data);
            }
            return response.data;
          }
          return null;
        })
      );
  }

  logout() {
    localStorage.removeItem("user");
    this.userSubject.next(null);
    this.router.navigate(["/login"]);
  }
}
