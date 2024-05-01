import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { UsuariosService } from '../../Services/usuarios.service';
import { RolesService } from '../../Services/roles.service'; // Import RolesService

@Component({
  selector: 'app-index-lista',
  templateUrl: './index-lista.component.html',
  styleUrls: ['./index-lista.component.css']
})
export class IndexListaComponent implements OnInit {

  titulo:string;
  lista: any[];
  columnas: string[] = [];
  service: DataService;

  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private rolesService: RolesService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const titulo = data['titulo'];
      this.titulo = titulo;
      this.service = this.getService(titulo);
      this.service.getData().subscribe((data: any[]) => {
        this.lista = data;
        if (this.lista.length > 0) {
          this.columnas = Object.keys(this.lista[0]);
        }
      }, error => {
        console.log(error);
      });
    });
  }

  obtenerColumnas(): string[] {
    return this.columnas;
  }

  private getService(type: string): DataService {
    switch (type) {
      case 'Usuarios':
        return this.usuariosService;
      case 'Roles':
        return this.rolesService;
      default:
        throw new Error('Invalid service type');
    }
  }
}
