import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Rol } from "../../Models/RolesViewModel";
import { RolesService } from "../../Services/roles.service";
import { Usuario } from "../../Models/UsuariosViewModel";
import { ToastrService } from "ngx-toastr";
import { UsuariosService } from "../../Services/usuarios.service";
// import { MensajesService } from "../../Services/mensajes.service";

@Component({
  selector: "app-form-paises",
  templateUrl: "./form-paises.component.html",
  styleUrls: ["./form-paises.component.css"],
})
export class FormPaisesComponent implements OnInit {
  @Input() usuarioParaEditar: Usuario;
  roles: Rol[];

  usuario: Usuario = new Usuario();
  confirmarClave: string;

  constructor(
    public activeModal: NgbActiveModal,
    private rolesService: RolesService,
    private toastr: ToastrService,
    private usuariosService: UsuariosService
  ) { }

  isLoading = true;
  ngOnInit(): void {
    console.log(this.usuarioParaEditar);

    if (this.usuarioParaEditar) {
      this.usuario.Id = this.usuarioParaEditar.Id;
      this.usuario.Usuario = this.usuarioParaEditar.Usuario;
      this.usuario.Rol = this.usuarioParaEditar.Rol ?? "- Seleccionar -";
      this.usuario.EsAdmin = this.usuarioParaEditar.Admin === 'SI';
      console.log(this.usuario.EsAdmin, "ESADMIN");

    } else {
      this.usuario.Rol = "- Seleccionar -";
      this.usuario.EsAdmin = false;
    }

    this.rolesService.getData().subscribe(
      (data: Rol[]) => {
        this.roles = data;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  rolSelect(rolId: number, rol: string) {
    this.usuario.rol_Id = rolId;
    this.usuario.Rol = rol;
  }
  usuarioOnChange(event: any) {
    this.usuario.Usuario = event.target.value;
  }
  contraOnChange(event: any) {
    this.usuario.Clave = event.target.value;
  }
  confirmarContraOnChange(event: any) {
    this.confirmarClave = event.target.value;
  }
  adminToggle() {
    this.usuario.rol_Id = null;
    this.usuario.Rol = "- Seleccionar -";
    this.usuario.EsAdmin = !this.usuario.EsAdmin;
  }

  async guardar() {
    if (!this.usuario.Usuario) {
      this.mostrarWarning('Por favor ingrese el nombre de usuario.');
      return;
    }
    if (!this.usuario.EsAdmin) {
      if (!this.usuario.rol_Id) {
        this.mostrarWarning('Por favor seleccione un rol.');
        return;
      }
    }
    if (!this.usuarioParaEditar) {
      if (!this.usuario.Clave) {
        this.mostrarWarning('Por favor ingrese su contraseña.');
        return;
      }
      if (this.usuario.Clave !== this.confirmarClave) {
        this.mostrarWarning('Las contraseñas no coinciden.');
        return;
      }
      await this.usuariosService.Crear(this.usuario).subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess('Usuario creado con éxito.')
            this.activeModal.close(true);
          } else {
            this.activeModal.close(false);
            this.mostrarError('Error al crear el usuario.');
          }
        },
        (error) => {
          this.mostrarError('Error al crear el usuario.');
          console.log(error);
          this.isLoading = false;
        }
      );
    } else {
      await this.usuariosService.Editar(this.usuario).subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess('Usuario editado con éxito.');
            this.activeModal.close(true);
          } else {
            this.activeModal.close(false);
            this.mostrarError('Error al editar el usuario.');
          }
        },
        (error) => {
          this.mostrarError('Error al editar el usuario.');
          console.log(error);
          this.isLoading = false;
        }
      );
    }
  }
  mostrarSuccess(mensaje: string) {
    this.toastr.success(`<span class="now-ui-icons ui-1_bell-53"></span> ${mensaje}`, '', {
      timeOut: 3000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-success alert-with-icon",
      positionClass: 'toast-bottom-right'
    });
  }
  mostrarWarning(mensaje: string) {
    this.toastr.warning(`<span class="now-ui-icons ui-1_bell-53"></span> ${mensaje}`, '', {
      timeOut: 3000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-warning alert-with-icon",
      positionClass: 'toast-bottom-right'
    });
  }
  mostrarError(mensaje: string) {
    this.toastr.error(`<span class="now-ui-icons ui-1_bell-53"></span> ${mensaje}`, '', {
      timeOut: 3000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-error alert-with-icon",
      positionClass: 'toast-bottom-right'
    });
  }
}
