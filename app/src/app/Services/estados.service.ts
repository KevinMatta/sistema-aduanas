import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { APIResponse } from '../Models/APIResponseViewModel';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Estado } from '../Models/EstadosViewModel';

@Injectable({
    providedIn: 'root'
})
export class EstadosService implements DataService {
    constructor(private http: HttpClient) {}

    Url = environment.urlAPI + "/API/Estado/List";

    getData(): Observable<any[]> {
        return this.getEstados();
    }

    getEstados(): Observable<Estado[]> {
        return this.http.get<APIResponse<Estado[]>>(this.Url).pipe(
            map(response => this.mapResponse(response.data))
        );
    }

    private mapResponse(data: any[]): Estado[] {
        return data.map(item => {
            const model: Estado = {
                Id: item.esta_Id,
                Estado: item.esta_Descripcion,
                Pais: item.pais_Descripcion
            };
            return model;
        });
    }
}
