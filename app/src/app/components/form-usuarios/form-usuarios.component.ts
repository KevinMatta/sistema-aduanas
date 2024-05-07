import { Component, Input, OnInit } from "@angular/core";
import {
  NgbActiveModal,
  NgbDateStruct,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { Rol } from "../../Models/RolesViewModel";
import { RolesService } from "../../Services/roles.service";
import { Usuario } from "../../Models/UsuariosViewModel";

@Component({
  selector: "app-modal-content",
  templateUrl: "./form-usuarios.component.html",
  styleUrls: ["./form-usuarios.component.css"],
})
export class FormUsuariosComponent implements OnInit {
  @Input() titulo;
  roles: Rol[];

  usuario: Usuario = new Usuario();

  constructor(
    public activeModal: NgbActiveModal,
    private rolesService: RolesService
  ) {}

  isLoading = true;
  ngOnInit(): void {
    this.usuario.Rol = "- Seleccionar -";
    console.log(this.usuario.Rol);

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
  adminToggle() {
    this.usuario.rol_Id = null;
    this.usuario.Rol = "- Seleccionar -";
    this.usuario.Admin = !this.usuario.Admin;
  }
}
