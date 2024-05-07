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
// import { FormUsuariosComponent } from '../form-usuarios/form-usuarios.component';

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

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    console.log(this.titulo);
    modalRef.componentInstance.titulo = this.titulo;
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

@Component({
  selector: "ngbd-modal-content",
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-basic-title">Nuevo {{ titulo }}</h4>
    </div>
    <div class="modal-body"></div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="activeModal.close('Close click')"
      >
        Close
      </button>
    </div>
  `,
})
export class NgbdModalContent {
  @Input() titulo;

  constructor(public activeModal: NgbActiveModal) {}
}
