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
import { PersonaNatural } from "../Models/PersonaNaturalViewModel";

@Injectable({
  providedIn: "root",
})
export class PersonaNaturalService {
  constructor(private http: HttpClient) { }

  BaseUrl = environment.urlAPI + "/API/PersonaNatural/";

  Crear(peNa: PersonaNatural): Observable<any> {
    const json =
    {
      "peNa_Id": 0,
      "peNa_Rtn": peNa.RtnSolicitante,
      "peNa_RtnUrlPdf": peNa.RtnSolicitanteUrl,
      "peNa_DNI": peNa.DNI,
      "peNa_DNIurlPdf": peNa.DNIUrl,
      "peNa_NumReciboPublico": peNa.NumReciboPublico,
      "peNa_NumReciboPublicoUrlPdf": peNa.NumReciboPublicoUrl,
      "ofic_Id": 0,
      "esCi_Id": peNa.esCi_Id,
      "prof_Id": peNa.prof_Id,
      "ciud_Id": peNa.ciud_Id,
      "peNa_Direccion": peNa.DireccionCompleta,
      "peNa_TelefonoFijo": peNa.TelefonoFijo,
      "peNa_TelefonoCelular": peNa.TelefonoCelular,
      "peNa_Correo": peNa.Correo,
      "peNa_CodigoCorreo": "string",
      "peNa_CorreoAlternativa": peNa.CorreoAlternativo,
      "peNa_CodigoCorreoAlternativa": "string",
      "peNa_Estado": true,
      "peNa_Creacion": 1,
      "peNa_FechaCreacion": "2024-05-10T13:54:24.135Z",
      "peNa_Modifica": 0,
      "peNa_FechaModifica": "2024-05-10T13:54:24.135Z",
      "peNa_Nombre": peNa.Nombre,
      "peNa_Apellido": peNa.Apellido,
      "adua_Id": peNa.adua_Id
    };
    return this.http
      .post<any>(this.BaseUrl + "Crear", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }
}
