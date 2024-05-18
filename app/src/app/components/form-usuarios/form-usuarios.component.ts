import { Component, Input, OnInit } from "@angular/core";
import { Rol } from "../../Models/RolesViewModel";
import { RolesService } from "../../Services/roles.service";
import { Usuario } from "../../Models/UsuariosViewModel";
import { ToastrService } from "ngx-toastr";
import { UsuariosService } from "../../Services/usuarios.service";
import { APIResponse } from "../../Models/APIResponseViewModel";
import { EmpleadosService } from "../../Services/empleados.service";
// import { MensajesService } from "../../Services/mensajes.service";

@Component({
  selector: "app-modal-content",
  templateUrl: "./form-usuarios.component.html",
  styleUrls: ["./form-usuarios.component.css"],
})
export class FormUsuariosComponent implements OnInit {
  @Input() objetoParaEditar: Usuario;
  roles: Rol[];

  usuario: Usuario = new Usuario();
  confirmarClave: string;

  constructor(
    private rolesService: RolesService,
    private toastr: ToastrService,
    private empleadosService: EmpleadosService,
    private usuariosService: UsuariosService
  ) {}

  isLoading = true;
  ngOnInit(): void {
    console.log(this.objetoParaEditar, "OBJETO PARA EDITAR");

    if (this.objetoParaEditar) {
      this.usuario.Id = this.objetoParaEditar.Id;
      this.usuario.Usuario = this.objetoParaEditar.Usuario;
      this.usuario.DNI = this.objetoParaEditar.DNI;
      this.usuario.Empleado = this.objetoParaEditar.Empleado;
      this.usuario.Rol = this.objetoParaEditar.Rol ?? "- Seleccionar -";
      this.usuario.EsAdmin = this.objetoParaEditar.Admin === "SI";
    } else {
      this.usuario.Usuario = "";
      this.usuario.Rol = "- Seleccionar -";
      this.usuario.DNI = "";
      this.usuario.Empleado = "a";
      this.usuario.EsAdmin = false;
    }

    console.log(this.usuario, "this.usuario");

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
  DNIOnChange(event: any) {
    this.empleadosService.BuscarPorDNI(event.target.value).subscribe(
      (response: APIResponse<any>) => {
        if (response.code >= 200 && response.code <= 300) {
          this.usuario.DNI = event.target.value;
          this.usuario.Empleado = response.data;
        } else {
          this.mostrarWarning("No existe ningun empleado con ese DNI.");
        }
      },
      (error) => {
        this.mostrarError("Error al buscar al empleado por el DNI.");
        console.log(error);
        this.isLoading = false;
      }
    );
  }
  adminToggle() {
    this.usuario.rol_Id = null;
    this.usuario.Rol = "- Seleccionar -";
    this.usuario.EsAdmin = !this.usuario.EsAdmin;
  }

  async guardar() {
    if (!this.usuario.Usuario) {
      this.mostrarWarning("Por favor ingrese el nombre de usuario.");
      return;
    }
    if (!this.usuario.EsAdmin) {
      if (!this.usuario.rol_Id) {
        this.mostrarWarning("Por favor seleccione un rol.");
        return;
      }
    }
    if (!this.objetoParaEditar) {
      if (!this.usuario.Clave) {
        this.mostrarWarning("Por favor ingrese su contraseña.");
        return;
      }
      if (this.usuario.Clave !== this.confirmarClave) {
        this.mostrarWarning("Las contraseñas no coinciden.");
        return;
      }
      await this.usuariosService.Crear(this.usuario).subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess("Usuario creado con éxito.");
          } else {
            this.mostrarError("Ya existe ese usuario.");
          }
        },
        (error) => {
          this.mostrarError("Error al crear el usuario.");
          console.log(error);
          this.isLoading = false;
        }
      );
    } else {
      await this.usuariosService.Editar(this.usuario).subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess("Usuario editado con éxito.");
          } else {
            this.mostrarError("Error al editar el usuario.");
          }
        },
        (error) => {
          this.mostrarError("Error al editar el usuario.");
          console.log(error);
          this.isLoading = false;
        }
      );
    }
  }
  mostrarSuccess(mensaje: string) {
    this.toastr.success(
      `<span class="now-ui-icons ui-1_bell-53"></span> ${mensaje}`,
      "",
      {
        timeOut: 3000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-bottom-right",
      }
    );
  }
  mostrarWarning(mensaje: string) {
    this.toastr.warning(
      `<span class="now-ui-icons ui-1_bell-53"></span> ${mensaje}`,
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
  mostrarError(mensaje: string) {
    this.toastr.error(
      `<span class="now-ui-icons ui-1_bell-53"></span> ${mensaje}`,
      "",
      {
        timeOut: 3000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-error alert-with-icon",
        positionClass: "toast-bottom-right",
      }
    );
  }
}
