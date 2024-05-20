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
import { HttpResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { FormPaisesComponent } from "../form-paises/form-paises.component";
import { FormEstadosComponent } from "../form-estados/form-estados.component";
import { FormCiudadesComponent } from "../form-ciudades/form-ciudades.component";
import { FormAduanasComponent } from "../form-aduanas/form-aduanas.component";
import { FormProfesionesComponent } from "../form-profesiones/form-profesiones.component";
import { FormEstadosCivilesComponent } from "../form-estados-civiles/form-estados-civiles.component";
import { ProfesionesService } from "../../Services/profesiones.service";

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
  roles: Rol[];
  itemToDelete: any;

  modal: any;
  open(Id?: number | string) {
    let modalRef = this.modalService.open(this.modal);
    if (Id) {
      const objetoEncontrado = this.rows.find((obj) => obj.Id === Id);
      modalRef.componentInstance.objetoParaEditar = objetoEncontrado;
    }
    modalRef.result
      .then((data) => {
        if (data === true) {
          this.service.getData().subscribe((data: any[]) => {
            this.rows = this.formatFilas(data);
            this.temp = [...this.rows];
            if (this.rows.length > 0) {
              this.columns = this.formatColumnas(Object.keys(this.rows[0]));
            }
            // this.isLoading = false;
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        // this.isLoading = false;
      });
  }

  constructor(
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
    private profesionesService: ProfesionesService,
    private estadosCivilesService: EstadosCivilesService,
    private toastr: ToastrService
  ) {}
  @ViewChild(DatatableComponent) table: DatatableComponent;

  titulo: string = "Titulo";
  path: string;
  rows: any[] = [];
  temp = [];
  columns = [];
  service: any;
  isLoading: boolean = true;
  ColumnMode = ColumnMode;

  ngOnInit() {
    this.rolesService.getData().subscribe(
      (data: Rol[]) => {
        this.roles = data;
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
    });
  }

  formatFilas(data: any[]): { [key: string]: string }[] {
    return data.map((obj) => {
      const newObj: { [key: string]: string } = {};
      Object.keys(obj).forEach((key) => {
        // Check if the key contains an underscore
        if (!key.includes("_")) {
          newObj[key] = obj[key];
        }
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
        this.modal = FormUsuariosComponent;
        return this.usuariosService;
      case "Roles":
        this.path = "/layout/layout/roles-por-pantalla";
        console.log(this.path, "path");
        return this.rolesService;
      case "Aduanas":
        this.modal = FormAduanasComponent;
        return this.aduanasService;
      case "Empresas":
        this.path = "/layout/layout/form-empresas";
        return this.empresasService;
      case "Paises":
        this.modal = FormPaisesComponent;
        return this.paisesService;
      case "Estados":
        this.modal = FormEstadosComponent;
        return this.estadosService;
      case "Ciudades":
        this.modal = FormCiudadesComponent;
        return this.ciudadesService;
      case "Empleados":
        this.path = "/layout/layout/form-empleados";
        return this.empleadosService;
      case "Profesiones":
        this.modal = FormProfesionesComponent;
        return this.profesionesService;
      case "Estados Civiles":
        this.modal = FormEstadosCivilesComponent;
        return this.estadosCivilesService;
      default:
        throw new Error("Invalid service type");
    }
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

  confirmDeleteModal(row) {
    console.log(row);
    this.itemToDelete = row;
    const modalRef = this.modalService.open(NgbdDeleteConfirmationModal);
    modalRef.result
      .then((result) => {
        if (result === "confirm") {
          this.confirmDelete();
        }
      })
      .catch((error) => {
        console.log("Se cerró el modal sin confirmar la eliminación.");
      });
  }
  confirmDelete() {
    if (this.itemToDelete) {
      switch (this.titulo) {
        case "Usuarios":
          this.usuariosService.Eliminar(this.itemToDelete.Id).subscribe(
            (response: HttpResponse<any>) => {
              if (response.status === 200) {
                this.itemToDelete = null;
                this.toastr.success(
                  '<span class="now-ui-icons ui-1_bell-53"></span> Registro Eliminado correctamente',
                  "Exito",
                  {
                    timeOut: 3000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: "toast-top-right",
                  }
                );
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              } else {
                this.toastr.warning(
                  '<span class="now-ui-icons ui-1_bell-53"></span> Ya existe un registro con el mismoo id',
                  "Alerta",
                  {
                    timeOut: 3000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: "toast-top-right",
                  }
                );
              }
              this.itemToDelete = null;
            },
            (error) => {
              this.toastr.error(
                '<span class="now-ui-icons ui-1_bell-53"></span> No se pudo  realizar la peticionn',
                "Error",
                {
                  timeOut: 3000,
                  closeButton: true,
                  enableHtml: true,
                  toastClass: "alert alert-success alert-with-icon",
                  positionClass: "toast-top-right",
                }
              );
            }
          );
          break;
        case "Roles":
          this.rolesService
            .Eliminar(this.itemToDelete.Id)
            .subscribe((response: HttpResponse<any>) => {
              if (response.status === 200) {
                this.itemToDelete = null;
                this.toastr.success(
                  '<span class="now-ui-icons ui-1_bell-53"></span> Registro Eliminado correctamente',
                  "Exito",
                  {
                    timeOut: 3000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: "toast-top-right",
                  }
                );
                setTimeout(() => {
                  window.location.reload();
                });
              } else {
                this.toastr.warning(
                  '<span class="now-ui-icons ui-1_bell-53"></span> Ya existe un registro con el mismo id',
                  "Alerta",

                  {
                    timeOut: 3000,
                  }
                );
              }
            }),
            (error) => {
              this.toastr.error(
                '<span class="now-ui-icons ui-1_bell-53"></span> No se pudo  realizar la peticionn',
                "Error",
                {
                  timeOut: 3000,
                }
              );
            };
          break;
        case "Aduanas":
          this.aduanasService.Eliminar(this.itemToDelete.Id).subscribe(
            (response: HttpResponse<any>) => {
              if (response.status === 200) {
                this.itemToDelete = null;
                this.toastr.success(
                  '<span class="now-ui-icons ui-1_bell-53"></span> Registro Eliminado correctamente',
                  "Exito",
                  {
                    timeOut: 3000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: "toast-top-right",
                  }
                );
                setTimeout(() => {
                  window.location.reload();
                });
              } else {
                this.toastr.warning(
                  '<span class="now-ui-icons ui-1_bell-53"></span> Ya existe un registro con el mismo id',
                  "Alerta",
                  {
                    timeOut: 3000,
                  }
                );
              }
            },
            (error) => {
              this.toastr.error(
                '<span class="now-ui-icons ui-1_bell-53"></span> No se pudo  realizar la peticionn',
                "Error",
                {
                  timeOut: 3000,
                }
              );
            }
          );
          break;
        case "Paises":
          this.paisesService.Eliminar(this.itemToDelete.Id).subscribe(
            (response: HttpResponse<any>) => {
              console.log(response, "response");
              if (response.body.code >= 200 && response.body.code < 300) {
                this.itemToDelete = null;
                this.mostrarSuccess("País eliminado correctamente.");
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              } else {
                this.mostrarError("Hay Estados que dependen de este país.");
              }
            },
            (error) => {
              this.mostrarError("Error al intentar eliminar el país.");
            }
          );
          break;

        case "Estados":
          this.estadosService
            .Eliminar(this.itemToDelete.Id)
            .subscribe((response: HttpResponse<any>) => {
              if (response.body.code >= 200 && response.body.code < 300) {
                this.itemToDelete = null;
                this.mostrarSuccess("Estado eliminado correctamente.");
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              } else {
                this.mostrarError("Hay Ciudades que dependen de este Estado.");
              }
            }),
            (error) => {
              this.mostrarError("Error al intentar eliminar la ciudad.");
            };
          break;
        case "Estados Civiles":
          this.estadosCivilesService
            .Eliminar(this.itemToDelete.Id)
            .subscribe((response: HttpResponse<any>) => {
              if (response.status === 200) {
                this.itemToDelete = null;
                this.toastr.success(
                  '<span class="now-ui-icons ui-1_bell-53"></span> Registro Eliminado correctamente',
                  "Exito",
                  {
                    timeOut: 3000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: "toast-top-right",
                  }
                );
                setTimeout(() => {
                  window.location.reload();
                });
              } else {
                this.toastr.warning(
                  '<span class="now-ui-icons ui-1_bell-53"></span> Ya existe un registro con el mismo id',
                  "Alerta",
                  {
                    timeOut: 3000,
                  }
                );
              }
            }),
            (error) => {
              this.toastr.error(
                '<span class="now-ui-icons ui-1_bell-53"></span> No se pudo  realizar la peticionn',
                "Error",
                {
                  timeOut: 3000,
                }
              );
            };
          break;
        case "Empresas":
          this.empresasService
            .Eliminar(this.itemToDelete.Id)
            .subscribe((response: HttpResponse<any>) => {
              if (response.status === 200) {
                this.itemToDelete = null;
                this.toastr.success(
                  '<span class="now-ui-icons ui-1_bell-53"></span> Registro Eliminado correctamente',
                  "Exito",
                  {
                    timeOut: 3000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: "toast-top-right",
                  }
                );
                setTimeout(() => {
                  window.location.reload();
                });
              } else {
                this.toastr.warning(
                  '<span class="now-ui-icons ui-1_bell-53"></span> Ya existe un registro con el mismo id',
                  "Alerta",
                  {
                    timeOut: 3000,
                  }
                );
              }
            }),
            (error) => {
              this.toastr.error(
                '<span class="now-ui-icons ui-1_bell-53"></span> No se pudo  realizar la peticionn',
                "Error",
                {
                  timeOut: 3000,
                }
              );
            };
          break;
        case "Empleados":
          this.empleadosService
            .Eliminar(this.itemToDelete.Id)
            .subscribe((response: HttpResponse<any>) => {
              if (response.status === 200) {
                this.itemToDelete = null;
                this.toastr.success(
                  '<span class="now-ui-icons ui-1_bell-53"></span> Registro Eliminado correctamente',
                  "Exito",
                  {
                    timeOut: 3000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: "toast-top-right",
                  }
                );
                setTimeout(() => {
                  window.location.reload();
                });
              } else {
                this.toastr.warning(
                  '<span class="now-ui-icons ui-1_bell-53"></span> Ya existe un registro con el mismo id',
                  "Alerta",
                  {
                    timeOut: 3000,
                  }
                );
              }
            }),
            (error) => {
              this.toastr.error(
                '<span class="now-ui-icons ui-1_bell-53"></span> No se pudo  realizar la peticionn',
                "Error",
                {
                  timeOut: 3000,
                }
              );
            };
          break;
        case "Ciudades":
          this.ciudadesService
            .Eliminar(this.itemToDelete.Id)
            .subscribe((response: HttpResponse<any>) => {
              if (response.body.code >= 200 && response.body.code < 300) {
                this.itemToDelete = null;
                this.mostrarSuccess("Ciudad eliminada correctamente.");
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              } else {
                this.mostrarError("Hay registros que dependen de esta ciudad.");
              }
            }),
            (error) => {
              this.mostrarError("Error al intentar eliminar ciudad.");
            };
        default:
          console.error("Tipo de servicio no manejado para eliminar");
          break;
      }
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
@Component({
  selector: "ngbd-delete-confirmation-modal",
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-basic-title">Eliminar {{ titulo }}</h4>
    </div>
    <div class="modal-body">
      <p>¿Estás seguro de que deseas eliminar este elemento?</p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-danger btn-round"
        (click)="activeModal.close('confirm')"
      >
        Eliminar
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary btn-round"
        (click)="activeModal.dismiss('cancel')"
      >
        Cancelar
      </button>
    </div>
  `,
})
export class NgbdDeleteConfirmationModal {
  @Input() titulo;
  constructor(public activeModal: NgbActiveModal) {}
}
