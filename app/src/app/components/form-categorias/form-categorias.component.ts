import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Pais } from "../../Models/PaisesViewModel";
import { ToastrService } from "ngx-toastr";
import { Categoria } from "../../Models/CategoriasViewModel";
import { CategoriasService } from "../../Services/categorias.service";

@Component({
  selector: "app-form-categorias",
  templateUrl: "./form-categorias.component.html",
  styleUrls: ["./form-categorias.component.css"],
})
export class FormCategoriasComponent implements OnInit {
  @Input() objetoParaEditar: Categoria;

  categoria: Categoria = new Categoria();

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private categoriasService: CategoriasService
  ) {}

  isLoading = true;
  ngOnInit(): void {
    if (this.objetoParaEditar) {
      this.categoria.Id = this.objetoParaEditar.Id;
      this.categoria.Categoria = this.objetoParaEditar.Categoria;
    } else {
      this.categoria.Categoria = "";
    }
  }

  categoriaOnChange(event: any) {
    this.categoria.Categoria = event.target.value;
  }

  async guardar() {
    if (!this.categoria.Categoria) {
      this.mostrarWarning("Por favor ingrese el nombre de la categoría.");
      return;
    }
    if (!this.objetoParaEditar) {
      await this.categoriasService.Crear(this.categoria).subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess("Categoría creada con éxito.");
            this.activeModal.close(true);
          } else {
            this.mostrarError("Ya existe esta categoría.");
          }
        },
        (error) => {
          this.mostrarError("Error al crear la categoría.");
          console.log(error);
          this.isLoading = false;
        }
      );
    } else {
      await this.categoriasService.Editar(this.categoria).subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess("Categoría editada con éxito.");
            this.activeModal.close(true);
          } else {
            this.activeModal.close(false);
            this.mostrarError("Error al editar la categoría.");
          }
        },
        (error) => {
          this.mostrarError("Error al editar la categoría.");
          console.log(error);
          this.isLoading = false;
        }
      );
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
