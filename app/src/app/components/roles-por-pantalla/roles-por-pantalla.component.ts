import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Esquema } from '../../Models/EsquemasViewModel';
import { DataService } from '../../Services/data.service';
import { PantallasService } from '../../Services/pantallas.service';
import { Pantalla } from '../../Models/PantallasViewModel';

@Component({
  selector: 'app-roles-por-pantalla',
  templateUrl: './roles-por-pantalla.component.html',
  styleUrls: ['./roles-por-pantalla.component.css']
})
export class RolesPorPantallaComponent implements OnInit {

  Rol_Id: number = 0;
  Rol_Descripcion: string | null = null;
  roles: any;
  pantallas: Pantalla[];
  esquemas: Esquema[] | null = null;
  paroIEnumerable: any[] | null = null;
  abrirModal: any;
  serializedItem: string = '';
  rol: any = null;
  rolId: number = 0;
  rolDescripcion: string | null = null;

  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pantallasService: PantallasService) { }


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
      this.pantallasService.getEsquemasData().subscribe((data: Esquema[]) => {
        this.esquemas = data;
        // this.isLoading = false;
      }, error => {
        console.log(error);
        // this.isLoading = false;
      });
      this.pantallasService.getData().subscribe((data: Pantalla[]) => {
        this.pantallas = data;
        console.log(this.esquemas, 'esquemas antes del loop');
        this.pantallas.forEach(pant => {
          const index = this.esquemas.findIndex(esqu => esqu.Id === pant.Esqu_Id)
          console.log(index);
          this.esquemas[index].NumPantallas++;
        })
        console.log(this.esquemas, 'esquemas');
        // this.isLoading = false;
      }, error => {
        console.log(error);
        // this.isLoading = false;
      });
    });
  }

  isPantallaChecked(pantallaId: number): boolean {
    return this.paroIEnumerable ? this.paroIEnumerable.some(paro => paro.Rol_Id === this.Rol_Id && paro.Pant_Id === pantallaId) : false;
  }

  sistCkBoxChange(event: any) {
    const sistCkBox:any = document.querySelector('.Sist_CkBox');
    const checkboxes:any = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    if (sistCkBox.checked) {
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = true;
      });
    } else {
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });
    }
  }

  esquCkBoxChange(event: any) {
    const ckBox = event.target;
    const pantCkBoxesDentroDeEsqu = ckBox.parentElement.children[2].querySelectorAll('.Pant_CkBox');
    console.log(pantCkBoxesDentroDeEsqu);
    const sistCkBox:any = document.querySelector('.Sist_CkBox');
    console.log(sistCkBox);
    const esquCkBoxes = Array.from(document.querySelectorAll('.Esqu_CkBox'));
    console.log(sistCkBox);
    if (ckBox.checked) {
      if (esquCkBoxes.every((esquCk:any)=> esquCk.checked)) {
        sistCkBox.checked = true;
      }
      pantCkBoxesDentroDeEsqu.forEach(function (checkbox) {
        checkbox.checked = true;
      });
    } else {
      sistCkBox.checked = false;
      pantCkBoxesDentroDeEsqu.forEach(function (checkbox) {
        checkbox.checked = false;
      });
    }
  }

  caretClick(event: any) {
    const toggle = event.target.classList.toggle("caretRP-down");
    event.target.parentElement.querySelector('.nested');
    event.target.parentElement.querySelector('.nested').classList.toggle('active');
    if (!toggle) {
      const texto = event.target.children[0].textContent;
      const esquema = this.esquemas.find(esqu => esqu.Esquema === texto);
      event.target.parentElement.querySelector('.nested').closest('li').style.marginBottom = ((esquema.NumPantallas * 30) + 10) + 'px';
    } else {
      event.target.parentElement.querySelector('.nested').closest('li').style.marginBottom = '0';
    }
  }

  onSubmit() {
    // Your form submission logic here
  }
}
