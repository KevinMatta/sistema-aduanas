import { Component, OnInit, SecurityContext, Input } from "@angular/core";
import { UtilitariosService } from "../../Services/utilitarios.service";
import { ToastrService } from "ngx-toastr";
import { PersonaNatural } from "../../Models/PersonaNaturalViewModel";
import { Estado } from "../../Models/EstadosViewModel";
import { Ciudad } from "../../Models/CiudadesViewModel";
import { EstadoCivil } from "../../Models/EstadosCivilesViewModel";
import { Aduana } from "../../Models/AduanasViewModel";
import { EstadosService } from "../../Services/estados.service";
import { CiudadesService } from "../../Services/ciudades.service";
import { AduanasService } from "../../Services/aduanas.service";
import { EstadosCivilesService } from "../../Services/estados-civiles.service";
import { ProfesionesService } from "../../Services/profesiones.service";
import { Profesion } from "../../Models/ProfesionesViewModel";
import { PersonaNaturalService } from "../../Services/personaNatural.service";
import { ModalPdfComponent } from "../modal-pdf/modal-pdf.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SafeResourceUrl } from "@angular/platform-browser";
import {jsPDF} from "jspdf";
import html2PDF from 'jspdf-html2canvas';
@Component({
  selector: "app-pdf-persona-natural",
  templateUrl: "./pdf-persona-natural.component.html",
  styleUrls: ["./pdf-persona-natural.component.css"],
})
export class PdfPersonaNaturalComponent implements OnInit {
  @Input() personaNatural:PersonaNatural;
  blobUrl:SafeResourceUrl;
  ngOnInit(): void {
    
  }
}