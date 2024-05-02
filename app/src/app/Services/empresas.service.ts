import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { APIResponse } from '../Models/APIResponseViewModel';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Aduana } from '../Models/AduanasViewModel';
import { Empresa } from '../Models/EmpresasViewModel';

@Injectable({
    providedIn: 'root'
})
export class EmpresasService implements DataService {
    constructor(private http: HttpClient) {}

    Url = environment.urlAPI + "/API/Empresa/List";

    getData(): Observable<any[]> {
        return this.getEmpresas();
    }

    getEmpresas(): Observable<Empresa[]> {
        return this.http.get<APIResponse<Empresa[]>>(this.Url).pipe(
            map(response => this.mapResponse(response.data))
        );
    }

    private mapResponse(data: any[]): Empresa[] {
        return data.map(item => {
            const model: Empresa = {
                Id: item.adua_Id,
                Empresa: item.empr_Descripcion,
                Ciudad: item.ciud_Descripcion
            };
            return model;
        });
    }
}
