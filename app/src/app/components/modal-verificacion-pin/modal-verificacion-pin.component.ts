import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-modal-verificacion-pin",
  templateUrl: "./modal-verificacion-pin.component.html",
  styleUrls: ["./modal-verificacion-pin.component.css"],
})
export class ModalVerificacionPINComponent implements OnInit {
  @Input() codigo: string;

  input: string;

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}

  pinOnChange(event: any): void {
    this.input = event.target.value;
  }

  verificar() {
    if (this.input === this.codigo) {
      this.activeModal.close(true);
    } else {
      this.toastr.error(
        `<span class="now-ui-icons ui-1_bell-53"></span> Codigo de verificación incorrecto`,
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
}
