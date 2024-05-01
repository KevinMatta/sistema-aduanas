import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Rol } from '../Models/RolesViewModel';

@Injectable({
    providedIn: 'root'
})
export class RolesService implements DataService {
    constructor(private http:HttpClient) {}

    Url = "https://jsonplaceholder.typicode.com/posts/1/comments";

    getData(): Observable<any[]> {
        return this.getRoles();
    }

    getRoles(): Observable<Rol[]> {
        return this.http.get<Rol[]>(this.Url);
    }
}