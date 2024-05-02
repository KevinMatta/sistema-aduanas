import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { APIResponse } from '../Models/APIResponseViewModel';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Estado } from '../Models/EstadosViewModel';
import { Ciudad } from '../Models/CiudadesViewModel';

@Injectable({
    providedIn: 'root'
})
export class CiudadesService implements DataService {
    constructor(private http: HttpClient) {}

    Url = environment.urlAPI + "/API/Ciudad/List";

    getData(): Observable<any[]> {
        return this.getCiudades();
    }

    getCiudades(): Observable<Ciudad[]> {
        return this.http.get<APIResponse<Ciudad[]>>(this.Url).pipe(
            map(response => this.mapResponse(response.data))
        );
    }

    private mapResponse(data: any[]): Ciudad[] {
        return data.map(item => {
            const model: Ciudad = {
                Id: item.esta_Id,
                Ciudad: item.ciud_Descripcion,
                Estado: item.esta_Descripcion
            };
            return model;
        });
    }
}
