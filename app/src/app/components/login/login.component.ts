import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../Services/auth.service';
import { Usuario } from '../../Models/UsuariosViewModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  usuario:string;
  usuarioError=false;
  clave:string;
  claveError=false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.userValue) {
      // this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  usuarioOnChange(event:any){
    this.usuario = event.target.value;
  }

  claveOnChange(event:any){
    this.clave = event.target.value;
  }

  login() {
    console.log('a2');
    if (!this.usuario) {
      this.usuarioError = true;
      return;
    } else {
      this.usuarioError = false;
    }
    if (!this.clave) {
      this.claveError = true;
      return;
    } else{
      this.claveError = false;
    }

    this.loading = true;
    this.authenticationService.login(this.usuario, this.clave)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log('a');

          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          console.log(error, 'Error login');          
          this.loading = false;
        }
      });
  }

  // onReset(): void {
  //   this.submitted = false;
  //   this.loginForm.reset();
  // }
}