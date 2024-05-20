import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable, Input } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class CorreosService {
  constructor(private http: HttpClient) {}

  BaseUrl = environment.urlAPI + "/API/";

  enviarCorreo(endpoint, correo: string, codigo: string): Observable<any> {
    return this.http
      .post<any>(
        this.BaseUrl +
          `${endpoint}EnviarCodigo?correo=${correo}&codigo=${codigo}`,
        {
          // headers: new HttpHeaders({ "Content-Type": "application/json" }),
        }
      )
      .pipe(map((response) => response));
  }
}
