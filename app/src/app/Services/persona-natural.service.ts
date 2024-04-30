import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core'
import { PersonaNatural } from '../Models/PersonaNaturalViewModel';

@Injectable({
    providedIn: 'root'
})
export class PersonaNaturalService {
    constructor(private http:HttpClient) {}

    Url = "aaaaaaaaaa";

    getPersonasNaturales() {
        return this.http.get<PersonaNatural[]>(this.Url);
    }
}