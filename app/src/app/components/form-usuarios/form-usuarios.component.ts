import { Component, Input, OnInit } from "@angular/core";
import {
  NgbActiveModal,
  NgbDateStruct,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { Rol } from "../../Models/RolesViewModel";
import { RolesService } from "../../Services/roles.service";
import { Usuario } from "../../Models/UsuariosViewModel";
import { ToastrService } from "ngx-toastr";
import { UsuariosService } from "../../Services/usuarios.service";

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
    public activeModal: NgbActiveModal,
    private rolesService: RolesService,
    private toastr: ToastrService,
    private usuariosService: UsuariosService
  ) {}

  isLoading = true;
  ngOnInit(): void {
    this.usuario.Rol = "- Seleccionar -";
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
  adminToggle() {
    this.usuario.rol_Id = null;
    this.usuario.Rol = "- Seleccionar -";
    this.usuario.EsAdmin = !this.usuario.EsAdmin;
  }

  async guardar() {
    console.log(this.usuario);
    
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
    if (!this.usuario.Clave) {
      this.mostrarWarning('Por favor ingrese su contraseña.');
      return;
    }
    if (this.usuario.Clave !== this.confirmarClave) {
      this.mostrarWarning('Las contraseñas no coinciden.');
      return;
    }

    const json = {
      Usua_Id: 0,
      Usua_Usuario: this.usuario.Usuario,
      Usua_Clave: this.usuario.Clave,
      Rol_Id: this.usuario.rol_Id ?? 0,
      Usua_IsAdmin: this.usuario.EsAdmin ?? false,
      Usua_Estado: true,
      Usua_Creacion: 1,
      Usua_FechaCreacion: Date.now(),
      Usua_Modifica: 1,
      Usua_FechaModifica: Date.now(),
      Rol_Descripcion: "string",
      Creacion: "string",
      Modifica: "string"
    }
    
    const response = await this.usuariosService.Crear(json);
    console.log(response, 'response');
    
    this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Usuario guardado con éxito.', '', {
      timeOut: 3000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-success alert-with-icon",
      positionClass: 'toast-bottom-right'
    });
  }
  mostrarWarning(mensaje: string){
    this.toastr.warning(`<span class="now-ui-icons ui-1_bell-53"></span> ${mensaje}`, '', {
      timeOut: 3000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-warning alert-with-icon",
      positionClass: 'toast-bottom-right'
    });
  }
}
