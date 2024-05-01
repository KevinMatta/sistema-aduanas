import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { APIResponse } from '../Models/APIResponseViewModel';
import { Usuario } from '../Models/UsuariosViewModel';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService implements DataService {
    constructor(private http: HttpClient) {}

    Url = "http://api-aduana.somee.com/API/Usuario/List";

    getData(): Observable<any[]> {
        return this.getUsuarios();
    }

    getUsuarios(): Observable<Usuario[]> {
        return this.http.get<APIResponse<Usuario[]>>(this.Url).pipe(
            map(response => response.data.reduce((acc, curr) => acc.concat(curr), []))
        );
    }
}
