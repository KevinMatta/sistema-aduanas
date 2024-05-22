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
import { ToastrService } from "ngx-toastr";
import { RolesService } from "../../Services/roles.service";
import { APIResponse } from "../../Models/APIResponseViewModel";
import { Item } from "../../Models/ItemsViewModel";
import { Arancel } from "../../Models/ArancelesViewModel";
import { ItemsService } from "../../Services/items.service";
import { ArancelesService } from "../../Services/aranceles.service";

@Component({
  selector: "app-form-items",
  templateUrl: "./form-items.component.html",
  styleUrls: ["./form-items.component.css"],
})
export class FormItemsComponent implements OnInit, AfterViewChecked {
  objetoParaEditar: Item;

  item: Item = new Item();
  aranceles: Arancel[];

  isLoading: boolean = true;

  @ViewChild("Sist_CkBox") sistCkBox: ElementRef;
  @ViewChildren("Aran_CkBox") aranCkBoxes: QueryList<ElementRef>;

  constructor(
    private itemsService: ItemsService,
    private arancelesService: ArancelesService,
    private location: Location,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.item.Item = "";
    this.item._aranceles = [];

    this.objetoParaEditar = this.itemsService.getObjetoParaEditar();

    if (this.objetoParaEditar) {
      this.item.Item_Id = this.objetoParaEditar.Item_Id;
      this.item.Item = this.objetoParaEditar.Item;
      this.item._aranceles = this.objetoParaEditar._aranceles;
    }

    this.arancelesService.getData().subscribe(
      (data: Arancel[]) => {
        this.aranceles = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngAfterViewChecked(): void {
    const sistCkBoxElement = this.sistCkBox.nativeElement;
    if (this.aranCkBoxes && this.aranCkBoxes.length > 0) {
      this.aranCkBoxes.map((el) => {});
    }
  }

  isArancelChecked(arancelId: number): boolean {
    return this.objetoParaEditar
      ? this.objetoParaEditar._aranceles.some((tuple) => tuple[0] === arancelId)
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
      this.item._aranceles = this.aranceles.map((aran) => [aran.Id, 0]);
    } else {
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });
      this.item._aranceles = [];
    }
  }

  pantCkBoxChange(event: any) {
    const ckBox = event.target;
    const index = this.item._aranceles.indexOf(ckBox.id);
    if (index === -1) {
      this.item._aranceles.push([parseInt(ckBox.id), 0]);
    } else {
      this.item._aranceles.splice(index, 1);
    }
  }

  caretClick(event: any) {
    const toggle = event.target.classList.toggle("caretRP-down");
    event.target.parentElement.querySelector(".nested");
    event.target.parentElement
      .querySelector(".nested")
      .classList.toggle("active");
    // if (!toggle) {
    //   const texto = event.target.children[0].textContent;

    //   const arancel = this.aranceles.find((esqu) => esqu.Arancel === texto);
    //   event.target.parentElement
    //     .querySelector(".nested")
    //     .closest("li").style.marginBottom =
    //     arancel.NumPantallas * 30 + 10 + "px";
    // } else {
    //   event.target.parentElement
    //     .querySelector(".nested")
    //     .closest("li").style.marginBottom = "0";
    // }
  }

  itemDescripcionOnChange(event: any) {
    this.item.Item = event.target.value;
  }

  guardar() {
    if (!this.item.Item) {
      this.mostrarWarning("Por favor ingrese el nombre del producto");
      return;
    }
    if (this.objetoParaEditar) {
      this.itemsService.Editar(this.item).subscribe(
        (data: APIResponse<any>) => {
          if (data.code >= 200 && data.code < 300) {
            this.mostrarSuccess("Producto editado con éxito!");
            this.location.back();
          } else {
            this.mostrarError(
              "Ha ocurrido un error al intentar editar el producto"
            );
          }
        },
        (error) => {
          console.log(error, "Error al editar el producto");
          this.mostrarError(
            "Ha ocurrido un error al intentar editar el producto"
          );
        }
      );
      return;
    }
    this.itemsService.Crear(this.item).subscribe(
      (data: APIResponse<any>) => {
        if (data.code >= 200 && data.code < 300) {
          this.mostrarSuccess("Producto creado con éxito!");
          this.location.back();
        } else {
          this.mostrarError(
            "Ha ocurrido un error al intentar editar el producto"
          );
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
