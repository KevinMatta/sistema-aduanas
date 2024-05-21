import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { APIResponse } from "../Models/APIResponseViewModel";
import { environment } from "../../environments/environment";
import { first, map } from "rxjs/operators";
import { Estado } from "../Models/EstadosViewModel";
import { Empleado } from "../Models/EmpleadosViewModel";

@Injectable({
  providedIn: "root",
})
export class EmpleadosService implements DataService {
  constructor(private http: HttpClient) {}

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

  private mapResponse(data: any[]): Empleado[] {
    return data.map((item) => {
      const model: Empleado = {
        Id: item.empl_Id,
        DNI: item.empl_DNI,
        Empleado: item.empl_PrimerNombre + " " + item.empl_PrimerApellido,
        Sexo: item.empl_Sexo,
        Email: item.empl_Email,
        ["Estado Civil"]: item.esCi_Descripcion,
        Empresa: item.empr_Descripcion,
        _Activo: item.empl_Estado,
      };
      return model;
    });
  }
}
