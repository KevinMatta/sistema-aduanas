import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from "@angular/forms";
import { first } from "rxjs/operators";

import { AuthenticationService } from "../../Services/auth.service";
import { Usuario } from "../../Models/UsuariosViewModel";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loading = false;
  usuario: string;
  usuarioError = false;
  clave: string;
  claveError = false;

  mostrarReestablecerForm = false;
  inputArr = ["-", "-", "-", "-", "-", "-"];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.userValue) {
      // this.router.navigate(['/']);
    }
  }

  ngOnInit() {}

  enviarPin() {
    if (!this.usuario) {
      this.usuarioError = true;
      return;
    }
    this.authenticationService.enviarPin(this.usuario).subscribe(
      (data: any) => {
        console.log(data, "data enviar pin");
      },
      (error) => {
        this.toastr.warning(
          `<span class="now-ui-icons ui-1_bell-53"></span> Este usuario no existe`,
          "",
          {
            timeOut: 3000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: "toast-bottom-right",
          }
        );
        console.log(error, "Error enviar pin");
      }
    );
  }

  digitInput(event: any, index: number): void {
    const nextInput = event.target.nextElementSibling;
    const previousInput = event.target.previousElementSibling;

    if (!event.target.value) {
      if (previousInput) {
        previousInput.focus();
        this.inputArr[index] = "-";
      }
    } else if (nextInput) {
      this.inputArr[index] = event.target.value;
      nextInput.focus();
    } else {
      this.inputArr[index] = event.target.value;
    }
    console.log(this.inputArr, "inputArr");
  }

  reestablecerClave(): void {
    this.toastr.success(
      `<span class="now-ui-icons ui-1_bell-53"></span> Contraseña reestablecida!`,
      "",
      {
        timeOut: 3000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-bottom-right",
      }
    );
    this.mostrarReestablecerForm = false;
  }

  usuarioOnChange(event: any) {
    this.usuario = event.target.value;
  }

  claveOnChange(event: any) {
    this.clave = event.target.value;
  }

  login() {
    const itemStr = localStorage.getItem("user");

    if (itemStr) {
      const item = JSON.parse(itemStr);
      if (new Date().getTime() > item.expiry) {
        localStorage.removeItem("user");
      } else {
        this.router.navigateByUrl("/layout/layout/dashboard");
      }
    }
    if (!this.usuario) {
      this.usuarioError = true;
      return;
    } else {
      this.usuarioError = false;
    }
    if (!this.clave) {
      this.claveError = true;
      return;
    } else {
      this.claveError = false;
    }

    this.loading = true;
    this.authenticationService
      .login(this.usuario, this.clave)
      .pipe(first())
      .subscribe({
        next: (data) => {
          if (data === null) {
            this.toastr.error(
              `<span class="now-ui-icons ui-1_bell-53"></span> Ha ocurrido un error en el servidor`,
              "",
              {
                timeOut: 3000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: "toast-bottom-right",
              }
            );
          } else {
            this.router.navigateByUrl("/layout/layout/dashboard");
          }
          this.loading = false;
        },
        error: (error) => {
          console.log(error, "Error login");
          this.loading = false;
        },
      });
  }
}
