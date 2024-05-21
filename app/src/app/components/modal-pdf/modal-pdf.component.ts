import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Rol } from "../../Models/RolesViewModel";
import { RolesService } from "../../Services/roles.service";
import { Usuario } from "../../Models/UsuariosViewModel";
import { ToastrService } from "ngx-toastr";
import { UsuariosService } from "../../Services/usuarios.service";
import { SafeResourceUrl } from "@angular/platform-browser";
// import { MensajesService } from "../../Services/mensajes.service";

@Component({
  selector: "app-modal-pdf",
  templateUrl: "./modal-pdf.component.html",
  styleUrls: ["./modal-pdf.component.css"],
})
export class ModalPdfComponent implements OnInit {
  @Input() pdfUrl: SafeResourceUrl;

  constructor(
    public activeModal: NgbActiveModal
  ) { }
  ngOnInit(): void {
  }
}
