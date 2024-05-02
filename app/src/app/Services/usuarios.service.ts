import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { APIResponse } from '../Models/APIResponseViewModel';
import { Usuario } from '../Models/UsuariosViewModel';
import { environment } from '../../environments/environment' 
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService implements DataService {
    constructor(private http: HttpClient) {}

    Url = environment.urlAPI + "/API/Usuario/List";

    Editar(val: any):void{
        console.log(val + 'DESDE EL SERVICIO');
    }

    getData(): Observable<any[]> {
        return this.getUsuarios();
    }

    getUsuarios(): Observable<Usuario[]> {
        return this.http.get<APIResponse<Usuario[]>>(this.Url).pipe(
            map(response => this.mapResponse(response.data))
        );
    }

    private mapResponse(data: any[]): Usuario[] {
        return data.map(item => {
            const model: Usuario = {
                Id: item.usua_Id,
                Usuario: item.usua_Usuario,
                Rol: item.rol_Descripcion,
                Admin: item.usua_IsAdmin,
                Estado: item.usua_Estado,
            };
            return model;
        });
    }
}
