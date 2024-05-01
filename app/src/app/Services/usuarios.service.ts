import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataService } from './data.service'; // Import the DataService interface
import { Usuario } from '../Models/UsuariosViewModel';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService implements DataService {
    constructor(private http: HttpClient) {}

    Url = "https://jsonplaceholder.typicode.com/posts";

    getData(): Observable<any[]> {
        return this.getUsuarios();
    }

    getUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.Url);
    }
}
