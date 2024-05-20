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
  constructor(private http: HttpClient) {}

  BaseUrl = environment.urlAPI + "/API/ComercianteIndividual/";

  enviarCorreo(correo: string, codigo: string): Observable<any> {
    return this.http
      .post<any>(
        this.BaseUrl + `EnviarCodigo?correo=${correo}&codigo=${codigo}`,
        {
          // headers: new HttpHeaders({ "Content-Type": "application/json" }),
        }
      )
      .pipe(map((response) => response));
  }
  Crear(coIn: ComercianteIndividual): Observable<any> {
    const json = {
      coIn_Id: 0,
      coIn_RtnSolicitante: coIn.RtnSolicitante,
      peNa_Id: 20,
      coIn_Aldea: "string",
      coIn_CalleYavenida: "string",
      coIn_BarrioOcolonia: "string",
      coIn_EdificioYnum: "string",
      coIn_PuntosDeReferencia: "string",
      coIn_Declaracion: "string",
      coIn_RepresentanteLegal: coIn.foRe,
      esCi_RepresentanteLegal: coIn.esCi_Id_RepresentanteLegal,
      prof_RepresentanteLegal: coIn.prof_Id_RepresentanteLegal,
      ciud_RepresentanteLegal: coIn.ciud_Id_RepresentanteLegal,
      esCi_Id: coIn.esCi_Id,
      prof_Id: coIn.prof_Id,
      ciud_Id: coIn.ciud_Id,
      adua_Id: coIn.adua_Id,
      coIn_AldeaRepresentanteLegal: "string",
      coIn_CalleYavenidaRepresentanteLegal: "string",
      coIn_BarrioOcoloniaRepresentanteLegal: "string",
      coIn_EdificioYnumRepresentanteLegal: "string",
      coIn_PuntosDeReferenciaRepresentanteLegal: "string",
      coIn_RtnRepresentanteLegal: coIn.Rtn_RepresentanteLegal,
      coIn_DNIRepresentanteLegal: coIn.Dni_RepresentanteLegal,
      coIn_Rtn: coIn.Rtn,
      coIn_DNI: coIn.Dni,
      coIn_Direccion: coIn.DireccionCompleta,
      coIn_DireccionRepresentanteLegal:
        coIn.DireccionCompleta_RepresentanteLegal,
      coIn_TelefonoFijo: coIn.TelefonoFijo,
      coIn_TelefonoCelular: coIn.TelefonoCelular,
      coIn_Correo: coIn.Correo,
      coIn_CorreoAlternativo: coIn.CorreoAlternativo,
      coIn_RtnUrl: coIn.RtnUrl,
      coIn_RtnRepresentanteLegalUrl: coIn.RtnUrl_RepresentanteLegal,
      coIn_DNIUrl: coIn.DniUrl,
      coIn_DNIRepresentanteLegalUrl: coIn.DniUrl_RepresentanteLegal,
      coIn_DeclaracionUrl: coIn.DeclaracionUrl,
      coIn_Estado: true,
      coIn_Creacion: 1,
      coIn_FechaCreacion: new Date().toISOString(),
      coIn_Modifica: 1,
      coIn_FechaModifica: new Date().toISOString(),
    };
    return this.http
      .post<any>(this.BaseUrl + "Crear", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }
}
