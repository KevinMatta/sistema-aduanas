import { Location } from "@angular/common";
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
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
export class RolesPorPantallaComponent implements OnInit, AfterViewChecked {
  objetoParaEditar: Rol;

  rol: Rol = new Rol();
  pantallas: Pantalla[];
  esquemas: Esquema[];

  isLoading: boolean = true;

  @ViewChild("Sist_CkBox") sistCkBox: ElementRef;
  @ViewChildren("Esqu_CkBox") esquCkBoxes: QueryList<ElementRef>;

  constructor(
    private rolesService: RolesService,
    private pantallasService: PantallasService,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.rol.Rol = "";
    this.rol._pantallas = [];

    this.objetoParaEditar = this.rolesService.getObjetoParaEditar();

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
            this.cdr.detectChanges();
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

  ngAfterViewChecked(): void {
    const sistCkBoxElement = this.sistCkBox.nativeElement;
    if (this.esquCkBoxes && this.esquCkBoxes.length > 0) {
      this.esquCkBoxes.map((el) => {
        const pantCkBoxesDentroDeEsqu =
          el.nativeElement.parentElement.children[2].querySelectorAll(
            ".Pant_CkBox"
          );
        if (
          pantCkBoxesDentroDeEsqu.length > 0 &&
          Array.from(pantCkBoxesDentroDeEsqu).every(
            (esquCk: any) => esquCk.checked
          )
        ) {
          el.nativeElement.checked = true;
        }
      });
      if (
        this.esquCkBoxes.toArray().length > 0 &&
        this.esquCkBoxes.toArray().every((el) => el.nativeElement.checked)
      ) {
        sistCkBoxElement.checked = true;
      }
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
      this.rol._pantallas = this.pantallas.map((pant) => pant.Id);
    } else {
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });
      this.rol._pantallas = [];
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
        const index = this.rol._pantallas.indexOf(parseInt(checkbox.id));
        if (index === -1) {
          this.rol._pantallas.push(parseInt(checkbox.id));
        }
      });
    } else {
      sistCkBox.checked = false;

      pantCkBoxesDentroDeEsqu.forEach((checkbox) => {
        checkbox.checked = false;
        const index = this.rol._pantallas.indexOf(parseInt(checkbox.id));
        if (index !== -1) {
          this.rol._pantallas.splice(index, 1);
        }
      });
    }
  }

  pantCkBoxChange(event: any) {
    const ckBox = event.target;
    const index = this.rol._pantallas.indexOf(ckBox.id);
    if (index === -1) {
      this.rol._pantallas.push(parseInt(ckBox.id));
    } else {
      this.rol._pantallas.splice(index, 1);
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
    if (this.objetoParaEditar) {
      this.rolesService.Editar(this.rol).subscribe(
        (data: APIResponse<any>) => {
          if (data.code >= 200 && data.code < 300) {
            this.mostrarSuccess("Rol editado con éxito!");
            this.location.back();
          } else {
            this.mostrarError("Ha ocurrido un error al intentar editar el rol");
          }
        },
        (error) => {
          console.log(error, "error al editar el rol");
          this.mostrarError("Ha ocurrido un error al intentar editar el rol");
        }
      );
      return;
    }
    this.rolesService.Crear(this.rol).subscribe(
      (data: APIResponse<any>) => {
        if (data.code >= 200 && data.code < 300) {
          this.mostrarSuccess("Rol creado con éxito!");
          this.location.back();
        } else {
          this.mostrarError("Ha ocurrido un error al intentar editar el rol");
        }
      },
      (error) => {
        console.log(error, "error al crear el rol");
        this.mostrarError("Ha ocurrido un error al intentar editar el rol");
      }
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
