import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { Usuario } from "../Models/UsuariosViewModel";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private userSubject: BehaviorSubject<Usuario>;
  public user: Observable<Usuario>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<Usuario>(
      JSON.parse(localStorage.getItem("user"))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): Usuario {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.urlAPI}API/Usuario/Login`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem("user", JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
    this.userSubject.next(null);
    this.router.navigate(["/login"]);
  }
}
