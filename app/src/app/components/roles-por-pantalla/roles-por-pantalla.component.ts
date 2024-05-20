import { Location } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { Esquema } from "../../Models/EsquemasViewModel";
import { PantallasService } from "../../Services/pantallas.service";
import { Pantalla } from "../../Models/PantallasViewModel";
import { ToastrService } from "ngx-toastr";
import { RolesService } from "../../Services/roles.service";
import { APIResponse } from "../../Models/APIResponseViewModel";
import { Rol } from "../../Models/RolesViewModel";

@Component({
  selector: "app-roles-por-pantalla",
  templateUrl: "./roles-por-pantalla.component.html",
  styleUrls: ["./roles-por-pantalla.component.css"],
})
export class RolesPorPantallaComponent implements OnInit, AfterViewInit {
  objetoParaEditar: Rol;

  rol: Rol = new Rol();
  pantallas: Pantalla[];
  esquemas: Esquema[];

  pantallasPorAgregar: number[] = [];

  isLoading: boolean = true;

  @ViewChild("Sist_CkBox") sistCkBox: ElementRef;
  @ViewChildren("Esqu_CkBox") esquCkBoxes: QueryList<ElementRef>;

  constructor(
    private rolesService: RolesService,
    private pantallasService: PantallasService,
    private location: Location,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.objetoParaEditar = this.rolesService.getObjetoParaEditar();
    console.log(this.objetoParaEditar, "this.objetoParaEditar");

    if (this.objetoParaEditar) {
      this.rol.Id = this.objetoParaEditar.Id;
      this.rol.Rol = this.objetoParaEditar.Rol;
      this.rol._pantallas = this.objetoParaEditar._pantallas;
    }

    this.pantallasService.getEsquemasData().subscribe(
      (data: Esquema[]) => {
        this.esquemas = data;
        this.pantallasService.getData().subscribe(
          (data: Pantalla[]) => {
            this.pantallas = data;
            this.pantallas.forEach((pant) => {
              const index = this.esquemas.findIndex(
                (esqu) => esqu.Id === pant.Esqu_Id
              );
              if (index !== -1) {
                this.esquemas[index].NumPantallas++;
              }
            });
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit(): void {
      const sistCkBoxElement = this.sistCkBox.nativeElement;

      console.log(this.esquCkBoxes, 'this.esquCkBoxes');
      const esquCkBoxesArr = Array.from(this.esquCkBoxes);
      console.log(esquCkBoxesArr, 'esquCkBoxesArr');
  
      this.esquCkBoxes.forEach((esquCkBox: any) => {
        console.log(esquCkBox, 'esquCkBox');
        
        const pantCkBoxesDentroDeEsqu =
          esquCkBox.parentElement.children[2].querySelectorAll(".Pant_CkBox");
        if (
          Array.from(pantCkBoxesDentroDeEsqu).every(
            (esquCk: any) => esquCk.checked
          )
        ) {
          esquCkBox.checked = true;
        }
      });
      
      if (esquCkBoxesArr.length > 0 && esquCkBoxesArr.every((esquCk: any) => esquCk.checked)) {
        sistCkBoxElement.checked = true;
      }
  }

  isPantallaChecked(pantallaId: number): boolean {
    return this.objetoParaEditar
      ? this.objetoParaEditar._pantallas.some((id) => id === pantallaId)
      : false;
  }

  sistCkBoxChange() {
    const sistCkBox: any = document.querySelector(".Sist_CkBox");
    const checkboxes: any = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    );
    if (sistCkBox.checked) {
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = true;
      });
      this.pantallasPorAgregar = this.pantallas.map((pant) => pant.Id);
    } else {
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });
      this.pantallasPorAgregar = [];
    }
  }

  esquCkBoxChange(event: any) {
    const ckBox = event.target;
    const pantCkBoxesDentroDeEsqu =
      ckBox.parentElement.children[2].querySelectorAll(".Pant_CkBox");
    const sistCkBox: any = document.querySelector(".Sist_CkBox");
    const esquCkBoxes = Array.from(document.querySelectorAll(".Esqu_CkBox"));
    if (ckBox.checked) {
      if (esquCkBoxes.every((esquCk: any) => esquCk.checked)) {
        sistCkBox.checked = true;
      }
      pantCkBoxesDentroDeEsqu.forEach((checkbox) => {
        checkbox.checked = true;
        const index = this.pantallasPorAgregar.indexOf(checkbox.id);
        if (index === -1) {
          this.pantallasPorAgregar.push(parseInt(checkbox.id));
        }
      });
    } else {
      sistCkBox.checked = false;
      pantCkBoxesDentroDeEsqu.forEach((checkbox) => {
        checkbox.checked = false;
        const index = this.pantallasPorAgregar.indexOf(checkbox.id);
        if (index !== -1) {
          this.pantallasPorAgregar.splice(index, 1);
        }
      });
    }
  }

  pantCkBoxChange(event: any) {
    const ckBox = event.target;
    const index = this.pantallasPorAgregar.indexOf(ckBox.id);
    if (index === -1) {
      this.pantallasPorAgregar.push(parseInt(ckBox.id));
    } else {
      this.pantallasPorAgregar.splice(index, 1);
    }
  }

  caretClick(event: any) {
    const toggle = event.target.classList.toggle("caretRP-down");
    event.target.parentElement.querySelector(".nested");
    event.target.parentElement
      .querySelector(".nested")
      .classList.toggle("active");
    if (!toggle) {
      const texto = event.target.children[0].textContent;

      const esquema = this.esquemas.find((esqu) => esqu.Esquema === texto);
      event.target.parentElement
        .querySelector(".nested")
        .closest("li").style.marginBottom =
        esquema.NumPantallas * 30 + 10 + "px";
    } else {
      event.target.parentElement
        .querySelector(".nested")
        .closest("li").style.marginBottom = "0";
    }
  }

  rolDescripcionOnChange(event: any) {
    this.rol.Rol = event.target.value;
  }

  guardar() {
    if (!this.rol.Rol) {
      this.mostrarWarning("Por favor ingrese el nombre del rol");
      return;
    }
    this.rolesService.Crear(this.rol.Rol, this.pantallasPorAgregar).subscribe(
      (data: APIResponse<any>) => {
        if (data.code >= 200 && data.code < 300) {
          this.mostrarSuccess("Rol creado con éxito!");
          this.location.back();
        }
      },
      (error) => console.log(error, "error al crear el rol")
    );
  }

  regresar() {
    this.location.back();
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
