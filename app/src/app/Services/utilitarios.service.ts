import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { APIResponse } from "../Models/APIResponseViewModel";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Estado } from "../Models/EstadosViewModel";
import { Ciudad } from "../Models/CiudadesViewModel";

@Injectable({
  providedIn: "root",
})
export class UtilitariosService {
  constructor(private http: HttpClient) {}

  previewPdf() {}

  subirArchivo(endpoint: string, formData: FormData): Observable<any> {
    const url = environment.urlAPI + endpoint;
    return this.http.post(url, formData).pipe(map((response) => response));
  }
}
