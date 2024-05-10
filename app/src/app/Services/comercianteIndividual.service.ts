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
import { ComercianteIndividual } from "../Models/ComercianteIndividualViewModel";

@Injectable({
  providedIn: "root",
})
export class ComercianteIndividualService {
  constructor(private http: HttpClient) { }

  BaseUrl = environment.urlAPI + "/API/ComercianteIndividual/";

  Crear(coIn: ComercianteIndividual): Observable<any> {
    const json =
    {
    };
    return this.http
      .post<any>(this.BaseUrl + "Crear", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }
}
