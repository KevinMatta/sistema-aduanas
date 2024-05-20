import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { CorreosService } from "../../Services/correos.service";
import { ToastrService } from "ngx-toastr";
import { ModalVerificacionPINComponent } from "../modal-verificacion-pin/modal-verificacion-pin.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-form-contacto",
  templateUrl: "./form-contacto.component.html",
  styleUrls: ["./form-contacto.component.css"],
})
export class FormContactoComponent implements OnInit {
  @Input("entidad") entidad: string = "DE LA ???";
  @Output() telefonoFijoEmpresa: EventEmitter<string> = new EventEmitter();
  @Output() telefonoFijo: EventEmitter<string> = new EventEmitter();
  @Output() telefonoCelular: EventEmitter<string> = new EventEmitter();
  @Output() correo: EventEmitter<string> = new EventEmitter();
  @Output() correoAlternativo: EventEmitter<string> = new EventEmitter();

  correoTemp: string;
  correoAlternativoTemp: string;
  codigo: string;
  codigoAlternativo: string;

  objCreado = false;

  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private correosService: CorreosService
  ) {}

  ngOnInit() {}

  telefonoFijoEmpresaOnChange(event: any) {
    this.telefonoFijoEmpresa.emit(event.target.value);
  }
  telefonoFijoOnChange(event: any) {
    this.telefonoFijo.emit(event.target.value);
  }

  telefonoCelularOnChange(event: any) {
    this.telefonoCelular.emit(event.target.value);
  }

  correoOnChange(event: any) {
    this.correoTemp = event.target.value;
  }
  correoAlternativoOnChange(event: any) {
    this.correoAlternativoTemp = event.target.value;
    // this.correoAlternativo.emit(event.target.value);
  }

  open(EsCorreoAlternativo: boolean) {
    let modalRef = this.modalService.open(ModalVerificacionPINComponent, {
      size: "lg",
    });
    modalRef.componentInstance.codigo = EsCorreoAlternativo
      ? this.codigoAlternativo
      : this.codigo;
    modalRef.result
      .then((data) => {
        console.log(data, "data");

        if (data === true) {
          this.mostrarSuccess(
            EsCorreoAlternativo
              ? "Correo alternativo validado"
              : "Correo validado"
          );

          EsCorreoAlternativo
            ? this.correo.emit(this.correoTemp)
            : this.correoAlternativo.emit(this.correoAlternativoTemp);
        }
      })
      .catch((err) => {
        // console.log(err);
        // this.isLoading = false;
      });
  }

  verificarCorreo(event: any) {
    if (event.target.value === this.codigo) {
      this.correo.emit(event.target.value);
    } else {
    }
  }
  enviarCorreo(EsCorreoAlternativo: boolean) {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    if (EsCorreoAlternativo) {
      if (!this.codigoAlternativo) {
        this.codigoAlternativo = randomNumber.toString();

        this.correosService
          .enviarCorreo(
            "personaNatural/",
            this.correoAlternativoTemp,
            this.codigoAlternativo
          )
          .subscribe(
            (data: any) => {
              if (data.code >= 200 && data.code <= 300) {
                this.mostrarSuccess("Correo enviado!");
                this.open(EsCorreoAlternativo);
              } else {
                this.mostrarError("Error al enviar el correo.");
              }
            },
            (error) => {
              this.mostrarError("Error al enviar el correo.");
              console.log(error);
            }
          );
      } else {
        this.open(EsCorreoAlternativo);
      }
    } else {
      if (!this.codigo) {
        this.codigo = randomNumber.toString();

        this.correosService
          .enviarCorreo("personaNatural/", this.correoTemp, this.codigo)
          .subscribe(
            (data: any) => {
              if (data.code >= 200 && data.code <= 300) {
                this.mostrarSuccess("Correo enviado!");
                this.open(EsCorreoAlternativo);
              } else {
                this.mostrarError("Error al enviar el correo.");
              }
            },
            (error) => {
              this.mostrarError("Error al enviar el correo.");
              console.log(error);
            }
          );
      } else {
        this.open(EsCorreoAlternativo);
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
