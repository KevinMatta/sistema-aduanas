import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { APIResponse } from "../Models/APIResponseViewModel";
import { environment } from "../../environments/environment";
import { first, map } from "rxjs/operators";
import { Empleado } from "../Models/EmpleadosViewModel";

@Injectable({
  providedIn: "root",
})
export class EmpleadosService implements DataService {
  constructor(private http: HttpClient) {}

  private objetoParaEditar = new BehaviorSubject<Empleado>(null);
  data$ = this.objetoParaEditar.asObservable();

  setObjetoParaEditar(data: Empleado) {
    this.objetoParaEditar.next(data);
  }

  getObjetoParaEditar() {
    return this.objetoParaEditar.value;
  }

  BaseUrl = environment.urlAPI + "/API/Empleado/";

  getData(): Observable<any[]> {
    return this.getEmpleados();
  }

  getEmpleados(): Observable<Empleado[]> {
    return this.http
      .get<APIResponse<Empleado[]>>(this.BaseUrl + "List")
      .pipe(map((response) => this.mapResponse(response.data)));
  }

  BuscarPorDNI(DNI: string): Observable<string | APIResponse<string>> {
    return this.http
      .get<APIResponse<string>>(this.BaseUrl + "BuscarPorDNI/" + DNI)
      .pipe(first());
  }

  ToggleEstado(id: number, estado: boolean): Observable<any> {
    return this.http.put<any>(
      `${
        this.BaseUrl + "ToggleEstado/"
      }?Usua_Id=${id}&Usua_Modifica=1&estado=${estado}
      `,
      { observe: "response" }
    );
  }

  Editar(empl: Empleado): Observable<any> {
    const json = {
      "empl_Id": empl.Id,
      "empl_DNI": empl.DNI,
      "empl_PrimerNombre": empl.Nombre,
      "empl_PrimerApellido": empl.Apellido,
      "empl_Sexo": empl.Sexo[0],
      "esCi_Id": empl._esCi_Id,
      "empr_Id": empl._empr_Id,
      "empl_Estado": true,
      "empl_Creacion": 1,
      "empl_FechaCreacion": "2024-05-21T20:24:51.177Z",
      "empl_Modifica": 1,
      "empl_FechaModifica": "2024-05-21T20:24:51.177Z",
      "empl_Email": empl.Email,
      "usua_Usuario": "string",
      "esCi_Descripcion": "string",
      "empr_Descripcion": "string",
      "creacion": "string",
      "modifica": "string"
    };
    return this.http
      .put<any>(this.BaseUrl + "Actualizar", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  Crear(empl: Empleado): Observable<any> {
    const json = {
      "empl_Id": empl.Id,
      "empl_DNI": empl.DNI,
      "empl_PrimerNombre": empl.Nombre,
      "empl_PrimerApellido": empl.Apellido,
      "empl_Sexo": empl.Sexo[0],
      "esCi_Id": empl._esCi_Id,
      "empr_Id": empl._empr_Id,
      "empl_Estado": true,
      "empl_Creacion": 1,
      "empl_FechaCreacion": "2024-05-21T20:24:51.177Z",
      "empl_Modifica": 1,
      "empl_FechaModifica": "2024-05-21T20:24:51.177Z",
      "empl_Email": empl.Email,
      "usua_Usuario": "string",
      "esCi_Descripcion": "string",
      "empr_Descripcion": "string",
      "creacion": "string",
      "modifica": "string"
    };
    return this.http
      .post<any>(this.BaseUrl + "Crear", json, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .pipe(map((response) => response));
  }

  private mapResponse(data: any[]): Empleado[] {
    return data.map((item) => {
      const model: Empleado = {
        Id: item.empl_Id,
        DNI: item.empl_DNI,
        Nombre: item.empl_PrimerNombre,
        Apellido: item.empl_PrimerApellido,
        Sexo: item.empl_Sexo,
        Email: item.empl_Email,
        _esCi_Id: item.esCi_Id,
        ["Estado Civil"]: item.esCi_Descripcion,
        esta_Id: item.esta_Id,
        Estado_: item.esta_Descripcion,
        ciud_Id: item.ciud_Id,
        Ciudad_: item.ciud_Descripcion,
        _empr_Id: item.empr_Id,
        Empresa: item.empr_Descripcion,
        _Activo: item.empl_Estado,
      };
      return model;
    });
  }
}
