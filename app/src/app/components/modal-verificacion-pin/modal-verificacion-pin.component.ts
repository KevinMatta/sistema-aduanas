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

  inputArr = ["-", "-", "-", "-", "-", "-"];

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}

  digitInput(event: any, index: number): void {
    const nextInput = event.target.nextElementSibling;
    const previousInput = event.target.previousElementSibling;

    if (!event.target.value) {
      if (previousInput) {
        previousInput.focus();
        this.inputArr[index] = "-";
      }
    } else if (nextInput) {
      this.inputArr[index] = event.target.value;
      nextInput.focus();
    } else {
      this.inputArr[index] = event.target.value;
    }
    console.log(this.inputArr, "inputArr");
  }

  verificar() {
    if (this.inputArr.join("") === this.codigo) {
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
