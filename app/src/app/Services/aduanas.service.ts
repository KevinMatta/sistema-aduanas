import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { APIResponse } from '../Models/APIResponseViewModel';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Aduana } from '../Models/AduanasViewModel';

@Injectable({
    providedIn: 'root'
})
export class AduanasService implements DataService {
    constructor(private http: HttpClient) {}

    Url = environment.urlAPI + "/API/Aduana/List";

    getData(): Observable<any[]> {
        return this.getAduanas();
    }

    getAduanas(): Observable<Aduana[]> {
        return this.http.get<APIResponse<Aduana[]>>(this.Url).pipe(
            map(response => this.mapResponse(response.data))
        );
    }

    private mapResponse(data: any[]): Aduana[] {
        return data.map(item => {
            const model: Aduana = {
                Id: item.adua_Id,
                Aduana: item.adua_Descripcion
            };
            return model;
        });
    }
}
