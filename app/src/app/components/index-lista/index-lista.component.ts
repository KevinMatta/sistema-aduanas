import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { UsuariosService } from '../../Services/usuarios.service';
import { RolesService } from '../../Services/roles.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { AduanasService } from '../../Services/aduanas.service';
import { EmpleadosService } from '../../Services/empleados.service';
import { EmpresasService } from '../../Services/empresas.service';
import { PaisesService } from '../../Services/paises.service';
import { EstadosCivilesService } from '../../Services/estados-civiles.service';
import { EstadosService } from '../../Services/estados.service';
import { CiudadesService } from '../../Services/ciudades.service';

type ColumnType = { prop: string } | { name: string };

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/roles-por-pantalla', title: 'Roles por pantall',  icon: '', class: '' },
];

@Component({
  selector: 'app-index-lista',
  templateUrl: './index-lista.component.html',
  styleUrls: ['./index-lista.component.css']
})
export class IndexListaComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent; 

  titulo: string = "Titulo";
  rows: any[] = [];
  temp = [];
  columns = [];
  service: DataService;
  isLoading: boolean = true;
  // filterText: string = '';
  ColumnMode = ColumnMode;
  constructor(
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
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const titulo = data['titulo'];
      this.titulo = titulo;
      this.service = this.getService(titulo);
      this.service.getData().subscribe((data: any[]) => {
        this.rows = this.formatFilas(data);
        this.temp = [...this.rows];
        if (this.rows.length > 0) {
          this.columns = this.formatColumnas(Object.keys(this.rows[0]));
          console.log(this.columns);
          console.log(this.rows);
          // this.preprocessData();
        }
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.isLoading = false;
      });
    });
  }

  formatFilas(data: any[]): { [key: string]: string }[] {
    return data.map(obj => {
        const newObj: { [key: string]: string } = {};
        Object.keys(obj).forEach(key => {
            newObj[key] = obj[key];
        });
        return newObj;
    });
  }


formatColumnas(keys: string[]): ColumnType[] {
  const result: ColumnType[] = [];
  keys.forEach(key => {
      result.push({ name: key, prop: key });
  });
  return result;
}


  private getService(type: string): DataService {
    switch (type) {
      case 'Usuarios':
        return this.usuariosService;
      case 'Roles':
        return this.rolesService;
      case 'Aduanas':
        return this.aduanasService;
      case 'Empresas':
        return this.empresasService;
      case 'Paises':
        return this.paisesService;
      case 'Estados':
        return this.estadosService;
      case 'Ciudades':
        return this.ciudadesService;
      case 'Empleados':
        return this.empleadosService;  
      case 'Estados Civiles':
        return this.estadosCivilesService;  
      default:
        throw new Error('Invalid service type');
    }
  }

  private preprocessData() {
    this.rows.forEach(item => {
      this.columns.forEach(prop => {
        item[prop + '_isBoolean'] = typeof item[prop] === 'boolean';
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

  Editar(val: any):void{
    console.log(val);
  }
  
}