import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../../Services/data.service";
import { UsuariosService } from "../../Services/usuarios.service";
import { RolesService } from "../../Services/roles.service";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { AduanasService } from "../../Services/aduanas.service";
import { EmpleadosService } from "../../Services/empleados.service";
import { EmpresasService } from "../../Services/empresas.service";
import { PaisesService } from "../../Services/paises.service";
import { EstadosCivilesService } from "../../Services/estados-civiles.service";
import { EstadosService } from "../../Services/estados.service";
import { CiudadesService } from "../../Services/ciudades.service";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Rol } from "../../Models/RolesViewModel";
import { FormUsuariosComponent } from "../form-usuarios/form-usuarios.component";

type ColumnType = { prop: string } | { name: string };

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/roles-por-pantalla",
    title: "Roles por pantalla",
    icon: "",
    class: "",
  },
];

@Component({
  selector: "app-index-lista",
  templateUrl: "./index-lista.component.html",
  styleUrls: ["./index-lista.component.css"],
})
export class IndexListaComponent implements OnInit {
  // openModal() {
  //   //ModalComponent is component name where modal is declare
  //   const modalRef = this.modalService.open(FormUsuariosComponent);
  //   modalRef.result.then((result) => {
  //     console.log(result);
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }

  roles: Rol[];

  open() {
    const modalRef = this.modalService.open(FormUsuariosComponent);
    console.log(this.titulo);
    modalRef.componentInstance.titulo = this.titulo;
    // modalRef.componentInstance.roles = this.roles;
  }

  constructor(
    // public modalService: NgbModal,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private rolesService: RolesService,
    private aduanasService: AduanasService,
    private empleadosService: EmpleadosService,
    private empresasService: EmpresasService,
    private paisesService: PaisesService,
    private estadosService: EstadosService,
    private ciudadesService: CiudadesService,
    private estadosCivilesService: EstadosCivilesService
  ) {}
  @ViewChild(DatatableComponent) table: DatatableComponent;

  titulo: string = "Titulo";
  path: string;
  rows: any[] = [];
  temp = [];
  columns = [];
  service: any;
  isLoading: boolean = true;
  // filterText: string = '';
  ColumnMode = ColumnMode;

  ngOnInit() {
    this.rolesService.getData().subscribe(
      (data: Rol[]) => {
        console.log(data);
        this.roles = data;
        console.log(this.roles, "this.roles");
        // console.log(this.indexComponent.roles, "this.indexComponent.roles");
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );

    this.route.data.subscribe((data) => {
      const titulo = data["titulo"];
      this.titulo = titulo;
      this.service = this.getService(titulo);
      this.service.getData().subscribe(
        (data: any[]) => {
          console.log(data);

          this.rows = this.formatFilas(data);
          this.temp = [...this.rows];
          if (this.rows.length > 0) {
            this.columns = this.formatColumnas(Object.keys(this.rows[0]));
          }
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
      this.rolesService.getData().subscribe(
        (data: Rol[]) => {
          console.log(data);
          this.roles = data;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
    });
  }

  formatFilas(data: any[]): { [key: string]: string }[] {
    return data.map((obj) => {
      const newObj: { [key: string]: string } = {};
      Object.keys(obj).forEach((key) => {
        newObj[key] = obj[key];
      });
      return newObj;
    });
  }

  formatColumnas(keys: string[]): ColumnType[] {
    const result: ColumnType[] = [];
    keys.forEach((key) => {
      result.push({ name: key, prop: key });
    });
    return result;
  }

  private getService(type: string): DataService {
    switch (type) {
      case "Usuarios":
        return this.usuariosService;
      case "Roles":
        this.path = "/roles-por-pantalla";
        return this.rolesService;
      case "Aduanas":
        return this.aduanasService;
      case "Empresas":
        return this.empresasService;
      case "Paises":
        return this.paisesService;
      case "Estados":
        return this.estadosService;
      case "Ciudades":
        return this.ciudadesService;
      case "Empleados":
        return this.empleadosService;
      case "Estados Civiles":
        return this.estadosCivilesService;
      default:
        throw new Error("Invalid service type");
    }
  }

  private preprocessData() {
    this.rows.forEach((item) => {
      this.columns.forEach((prop) => {
        item[prop + "_isBoolean"] = typeof item[prop] === "boolean";
      });
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
      let secondPropValue;
      let count = 0;
      for (const key in d) {
        if (count === 1) {
          secondPropValue = d[key].toString().toLowerCase();
          break;
        }
        count++;
      }

      return secondPropValue && (secondPropValue.indexOf(val) !== -1 || !val);
    });

    this.rows = temp;
    this.table.offset = 0;
  }

  Editar(val: any): void {
    console.log(val);
  }
}

// @Component({
//   selector: "app-modal-content",
//   // template: `
//   //   <ng-container>
//   //     <div class="modal-header">
//   //       <h4 class="modal-title" id="modal-basic-title">Nuevo {{ titulo }}</h4>
//   //       <button
//   //         type="button"
//   //         class="btn btn-sm btn-outline-primary"
//   //         aria-label="Close"
//   //         (click)="activeModal.dismiss('Cross click')"
//   //       >
//   //         <i class="now-ui-icons ui-1_simple-remove"></i>
//   //       </button>
//   //     </div>
//   //     <div class="modal-body">
//   //       <div class="row">
//   //         <div class="col-md-6">
//   //           <div class="form-group">
//   //             <label>Usuario</label>
//   //             <input
//   //               type="text"
//   //               class="form-control"
//   //               placeholder="05012005042021"
//   //               maxlength="20"
//   //             />
//   //           </div>
//   //         </div>
//   //         <div class="col-md-6">
//   //           <div class="form-group">
//   //             <label>Contraseña</label>
//   //             <input
//   //               type="text"
//   //               class="form-control"
//   //               placeholder="*******"
//   //               minlength="6"
//   //             />
//   //           </div>
//   //         </div>
//   //       </div>
//   //       <div class="row">
//   //         <div class="col-md-6">
//   //           <div class="form-group">
//   //             <label>Rol</label>
//   //             <div ngbDropdown class="d-block">
//   //               <button
//   //                 type="button"
//   //                 class="btn btn-primary m-0"
//   //                 id="dropdownMenu1"
//   //                 ngbDropdownToggle
//   //               >
//   //                 - Seleccionar -
//   //               </button>
//   //               <div ngbDropdownMenu aria-labelledby="dropdownMenu1">
//   //                 <button
//   //                   *ngFor="let rol of roles"
//   //                   type="button"
//   //                   class="dropdown-item"
//   //                   (click)="selectRol(rol.Id)"
//   //                 >
//   //                   {{ rol.Rol }}
//   //                 </button>
//   //               </div>
//   //             </div>
//   //           </div>
//   //         </div>
//   //         <ul>
//   //           <li *ngFor="let rol of roles">{{ rol.Rol }}</li>
//   //         </ul>
//   //         <div class="col-md-6">
//   //           <div class="form-group">
//   //             <label for="">Administrador</label>
//   //             <input class="switch-input" type="radio" name="rdo" id="si" />
//   //             <input
//   //               class="switch-input"
//   //               type="radio"
//   //               name="rdo"
//   //               id="no"
//   //               checked
//   //             />
//   //             <div class="switch">
//   //               <label for="si">Sí</label>
//   //               <label for="no">No</label>
//   //               <span></span>
//   //             </div>
//   //           </div>
//   //         </div>
//   //       </div>
//   //     </div>
//   //     <div class="modal-footer">
//   //       <button
//   //         type="button"
//   //         class="btn btn-outline-primary"
//   //         (click)="activeModal.close('Save click')"
//   //       >
//   //         <i
//   //           class="now-ui-icons ui-1_simple-remove"
//   //           style="margin-right: 5px"
//   //         ></i>
//   //         Cancelar
//   //       </button>
//   //       <button class="btn btn-primary">
//   //         <i class="now-ui-icons ui-1_check" style="margin-right: 5px"></i>
//   //         Guardar
//   //       </button>
//   //     </div>
//   // </ng-container>
//   // `,
//   templateUrl: "./form-usuarios.component.html",
//   styleUrls: ["./index-lista.component.css"],
// })
// export class NgbdModalContent implements OnInit {
//   @Input() titulo;
//   // @Input() roles;
//   hola: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
//   roles: Rol[];

//   rolSeleccionado: number;

//   constructor(
//     public activeModal: NgbActiveModal,
//     private rolesService: RolesService
//   ) {}

//   isLoading = true;
//   ngOnInit(): void {
//     // console.log(this.roles);

//     this.rolesService.getData().subscribe(
//       (data: Rol[]) => {
//         console.log(data);
//         this.roles = data;
//         console.log(this.roles, "this.roles");
//         // console.log(this.indexComponent.roles, "this.indexComponent.roles");
//       },
//       (error) => {
//         console.log(error);
//         this.isLoading = false;
//       }
//     );
//   }

//   selectRol(rolId: number) {
//     this.rolSeleccionado = rolId;
//     console.log(this.rolSeleccionado, "rolSeleccionado");
//   }
// }
