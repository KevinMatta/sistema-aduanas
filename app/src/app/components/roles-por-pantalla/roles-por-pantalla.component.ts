import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-roles-por-pantalla',
  templateUrl: './roles-por-pantalla.component.html',
  styleUrls: ['./roles-por-pantalla.component.css']
})
export class RolesPorPantallaComponent implements OnInit {

  Rol_Id: number = 0;
  Rol_Descripcion: string | null = null;
  roles: any;
  pantallas: any;
  esquemas: Map<number, string> | null = null;
  paroIEnumerable: any[] | null = null;
  abrirModal: any;
  serializedItem: string = '';
  rol: any = null;
  rolId: number = 0;
  rolDescripcion: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
      this.route.data.subscribe(data => {
          this.Rol_Id = data.model ? data.model.Rol_Id : 0;
          this.Rol_Descripcion = data.model ? data.model.Rol_Descripcion : null;
          this.roles = data.roles;
          this.pantallas = data.pantallas;
          this.esquemas = data.esquemas;
          this.paroIEnumerable = data.paroIEnumerable;
          this.abrirModal = data.abrirModal;
          this.serializedItem = data.serializedItem;
          if (this.serializedItem) {
              this.rol = JSON.parse(this.serializedItem);
          }
      });
  }

  isPantallaChecked(pantallaId: number): boolean {
      return this.paroIEnumerable ? this.paroIEnumerable.some(paro => paro.Rol_Id === this.Rol_Id && paro.Pant_Id === pantallaId) : false;
  }

  onSubmit() {
      // Your form submission logic here
  }
}
