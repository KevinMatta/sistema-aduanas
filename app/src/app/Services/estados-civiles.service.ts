import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { APIResponse } from '../Models/APIResponseViewModel';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { EstadoCivil } from '../Models/EstadosCivilesViewModel';

@Injectable({
    providedIn: 'root'
})
export class EstadosCivilesService implements DataService {
    constructor(private http: HttpClient) {}

    Url = environment.urlAPI + "/API/EstadoCivil/List";

    getData(): Observable<any[]> {
        return this.getEstadosCiviles();
    }

    getEstadosCiviles(): Observable<EstadoCivil[]> {
        return this.http.get<APIResponse<EstadoCivil[]>>(this.Url).pipe(
            map(response => this.mapResponse(response.data))
        );
    }

    private mapResponse(data: any[]): EstadoCivil[] {
        return data.map(item => {
            const model: EstadoCivil = {
                Id: item.esCi_Id,
                ['Estado Civil']: item.esCi_Descripcion
            };
            return model;
        });
    }
}
