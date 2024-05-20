import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

import { AuthenticationService } from "../../Services/auth.service";
import { ToastrService } from "ngx-toastr";
import { APIResponse } from "../../Models/APIResponseViewModel";

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
  nuevaClave: string;
  nuevaClaveError = false;
  confirmarNuevaClave: string;
  confirmarNuevaClaveError = false;
  claveError = false;
  loadingPIN = false;


  mostrarReestablecerForm = false;
  inputArr = ["-", "-", "-", "-", "-", "-"];
  pinError = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.userValue) {
      // this.router.navigate(['/']);
    }

  }

  ngOnInit() {
    this.usuario = "";
  }

  mostrarLoginForm() {
    this.mostrarReestablecerForm = false;
  }
  enviarPin() {
    if (!this.usuario) {
      this.usuarioError = true;
      return;
    } else {
      this.usuarioError = false;
    }
    this.loadingPIN = true;
    this.authenticationService.enviarPin(this.usuario).subscribe(
      (data: any) => {
        if (data.code >= 200 && data.code < 300) {
          this.toastr.success(
            `<span class="now-ui-icons ui-1_bell-53"></span> PIN enviado al correo del usuario.`,
            "",
            {
              timeOut: 3000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-success alert-with-icon",
              positionClass: "toast-bottom-right",
            }
          );
          this.mostrarReestablecerForm = true;
          this.loadingPIN = false;
        }
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
        this.loadingPIN = false;
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
  }

  nuevaClaveOnChange(event: any) {
    this.nuevaClave = event.target.value;
  }

  confirmarNuevaClaveOnChange(event: any) {
    this.confirmarNuevaClave = event.target.value;
  }

  reestablecerClave(): void {
    if (this.inputArr.includes("-")) {
      this.pinError = true;
      return;
    } else {
      this.pinError = false;
    }
    if (!this.nuevaClave) {
      this.nuevaClaveError = true;
      return;
    } else {
      this.nuevaClaveError = false;
    }

    if (
      !this.confirmarNuevaClave ||
      this.confirmarNuevaClave !== this.nuevaClave
    ) {
      this.confirmarNuevaClaveError = true;
      return;
    } else {
      this.confirmarNuevaClaveError = false;
    }

    this.authenticationService
      .RestablecerClave(this.inputArr.join(""), this.nuevaClave)
      .subscribe(
        (response: APIResponse<any>) => {
          if (response.code >= 200 && response.code < 300) {
            this.mostrarReestablecerForm = false;
            this.toastr.success(
              `<span class="now-ui-icons ui-1_bell-53"></span> Contraseña reestablecida`,
              ``,
              {
                timeOut: 3000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-success alert-with-icon",
                positionClass: "toast-top-right",
              }
            );
            this.mostrarReestablecerForm = false;
          } else {
            this.toastr.error(
              `<span class="now-ui-icons ui-1_bell-53"></span> PIN INCORRECTO`,
              "Error",
              {
                timeOut: 3000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: "toast-top-right",
              }
            );
          }
        },
        (error) => {
          this.toastr.error(
            `<span class="now-ui-icons ui-1_bell-53"></span> PIN INCORRECTO`,
            "Error",
            {
              timeOut: 3000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-error alert-with-icon",
              positionClass: "toast-top-right",
            }
          );
        }
      );
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
        item.usua_Usuario.toLowerCase() === this.usuario.toLowerCase()
          ? this.router.navigateByUrl("/layout/layout/dashboard")
          : localStorage.removeItem("user");
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
              `<span class="now-ui-icons ui-1_bell-53"></span> Credenciales incorrectas`,
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
            if (data.rol_Estado || data.usua_IsAdmin) {
              if (data.usua_Estado) {
                this.router.navigateByUrl("/layout/layout/dashboard");
              } else {
                this.toastr.warning(
                  `<span class="now-ui-icons ui-1_bell-53"></span> Su usuario está inhabilitado`,
                  "",
                  {
                    timeOut: 3000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-warning alert-with-icon",
                    positionClass: "toast-bottom-right",
                  }
                );
              }
            } else {
              this.toastr.warning(
                `<span class="now-ui-icons ui-1_bell-53"></span> Su usuario está inhabilitado`,
                "",
                {
                  timeOut: 3000,
                  closeButton: true,
                  enableHtml: true,
                  toastClass: "alert alert-warning alert-with-icon",
                  positionClass: "toast-bottom-right",
                }
              );
            }
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
