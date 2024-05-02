import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { APIResponse } from '../Models/APIResponseViewModel';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Pais } from '../Models/PaisesViewModel';

@Injectable({
    providedIn: 'root'
})
export class PaisesService implements DataService {
    constructor(private http: HttpClient) {}

    Url = environment.urlAPI + "/API/Pais/List";

    getData(): Observable<any[]> {
        return this.getPaises();
    }

    getPaises(): Observable<Pais[]> {
        return this.http.get<APIResponse<Pais[]>>(this.Url).pipe(
            map(response => this.mapResponse(response.data))
        );
    }

    private mapResponse(data: any[]): Pais[] {
        return data.map(item => {
            const model: Pais = {
                Id: item.pais_Id,
                Pais: item.pais_Descripcion
            };
            return model;
        });
    }
}
