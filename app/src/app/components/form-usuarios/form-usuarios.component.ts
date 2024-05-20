import { Component, Input, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Rol } from "../../Models/RolesViewModel";
import { RolesService } from "../../Services/roles.service";
import { Usuario } from "../../Models/UsuariosViewModel";
import { ToastrService } from "ngx-toastr";
import { UsuariosService } from "../../Services/usuarios.service";
import { APIResponse } from "../../Models/APIResponseViewModel";
import { EmpleadosService } from "../../Services/empleados.service";

@Component({
  selector: "app-modal-content",
  templateUrl: "./form-usuarios.component.html",
  styleUrls: ["./form-usuarios.component.css"],
})
export class FormUsuariosComponent implements OnInit {
  roles: Rol[];

  usuario: Usuario = new Usuario();
  confirmarClave: string;

  constructor(
    private rolesService: RolesService,
    private toastr: ToastrService,
    private empleadosService: EmpleadosService,
    private location: Location,
    private usuariosService: UsuariosService
  ) {}

  isLoading = true;
  ngOnInit(): void {
    this.usuario.Usuario = "";
    this.usuario.Rol = "- Seleccionar -";
    this.usuario.DNI = "";
    this.usuario.Empleado = "";
    this.usuario.EsAdmin = false;

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
    if (event.target.value) {
      this.empleadosService.BuscarPorDNI(event.target.value).subscribe(
        (response: APIResponse<any>) => {
          if (response.data !== null) {
            this.usuario.DNI = event.target.value;
            this.usuario.empl_Id = response.data.empl_Id;
            this.usuario.Empleado =
              response.data.empl_PrimerNombre +
              " " +
              response.data.empl_PrimerApellido;
          } else {
            this.usuario.empl_Id = null;
            this.usuario.Empleado = "";
            this.mostrarWarning("No existe ningun empleado con ese DNI.");
          }
        },
        (error) => {
          this.mostrarError("Error al buscar al empleado por el DNI.");
          console.log(error, "Error al buscar al empleado por el DNI");
          this.isLoading = false;
        }
      );
    }
  }
  adminToggle() {
    this.usuario.rol_Id = null;
    this.usuario.Rol = "- Seleccionar -";
    this.usuario.EsAdmin = !this.usuario.EsAdmin;
  }

  cancelar() {
    this.location.back();
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
    if (!this.usuario.Clave) {
      this.mostrarWarning("Por favor ingrese su contraseña.");
      return;
    }
    if (this.usuario.Clave !== this.confirmarClave) {
      this.mostrarWarning("Las contraseñas no coinciden.");
      return;
    }
    if (!this.usuario.empl_Id) {
      this.mostrarWarning("Por favor ingrese un empleado.");
      return;
    }
    await this.usuariosService.Crear(this.usuario).subscribe(
      (data: any) => {
        if (data.code >= 200 && data.code <= 300) {
          this.mostrarSuccess("Usuario creado con éxito.");
          this.location.back();
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
