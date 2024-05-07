import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { Pantalla } from "../Models/PantallasViewModel";
import { APIResponse } from "../Models/APIResponseViewModel";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Esquema } from "../Models/EsquemasViewModel";

@Injectable({
  providedIn: "root",
})
export class PantallasService implements DataService {
  constructor(private http: HttpClient) {}

  Url = environment.urlAPI + "/API/Pantalla/List";

  getData(): Observable<any[]> {
    return this.getPantallas();
  }

  getPantallas(): Observable<Pantalla[]> {
    return this.http
      .get<APIResponse<Pantalla[]>>(this.Url)
      .pipe(map((response) => this.mapResponse(response.data)));
  }

  private mapResponse(data: any[]): Pantalla[] {
    return data.map((item) => {
      const model: Pantalla = {
        Id: item.pant_Id,
        Pantalla: item.pant_Descripcion,
        Esqu_Id: item.esqu_Id,
      };
      return model;
    });
  }

  Eliminar(val: any): Observable<any> {
    console.log(val + "Para Eliminar");
    return this.http.delete<any>(
      `${environment.urlAPI}/API/Pantalla/Eliminar/?Pant_Id=${val}&Pant_Modifica=1
        `,
      { observe: "response" }
    );
  }

  getEsquemasData(): Observable<any[]> {
    return this.getEsquemas();
  }

  getEsquemas(): Observable<Esquema[]> {
    return this.http
      .get<APIResponse<Esquema[]>>(this.Url + "Esquemas")
      .pipe(map((response) => this.mapEsquemasResponse(response.data)));
  }

  private mapEsquemasResponse(data: any[]): Esquema[] {
    return data.map((item) => {
      const model: Esquema = {
        Id: item.esqu_Id,
        Esquema: item.esqu_Descripcion,
        NumPantallas: 0,
      };
      return model;
    });
  }
}
