import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { APIResponse } from '../Models/APIResponseViewModel';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Estado } from '../Models/EstadosViewModel';
import { Empleado } from '../Models/EmpleadosViewModel';

@Injectable({
    providedIn: 'root'
})
export class EmpleadosService implements DataService {
    constructor(private http: HttpClient) {}

    Url = environment.urlAPI + "/API/Empleado/List";

    getData(): Observable<any[]> {
        return this.getEmpleados();
    }

    getEmpleados(): Observable<Empleado[]> {
        return this.http.get<APIResponse<Empleado[]>>(this.Url).pipe(
            map(response => this.mapResponse(response.data))
        );
    }

    private mapResponse(data: any[]): Empleado[] {
        return data.map(item => {
            const model: Empleado = {
                Id: item.empl_Id,
                Rtn: item.empl_Rtn,
                Empleado: item.empl_PrimerNombre + item.empl_PrimerApellido,
                Sexo: item.empl_Sexo,
                Usuario: item.usua_Usuario,
                ['Estado Civil']: item.esCi_Descripcion,
                Empresa: item.empr_Descripcion
            };
            return model;
        });
    }
}
