
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PaisesService } from "../../Services/paises.service";
import { AduanasService } from "../../Services/aduanas.service";
import { EstadosService } from "../../Services/estados.service";
import { CiudadesService } from "../../Services/ciudades.service";
import { Pais } from "../../Models/PaisesViewModel";
import { Aduana } from "../../Models/AduanasViewModel";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estado } from '../../Models/EstadosViewModel';
import { Ciudad } from '../../Models/CiudadesViewModel';
@Component({
  selector: 'app-form-declaracion-valor',
  templateUrl: './form-declaracion-valor.component.html',
  styleUrls: ['./form-declaracion-valor.component.css']
})
export class FormDeclaracionValorComponent implements OnInit {

  display:any ="false";
  aduanas:Aduana[];
  paises: Pais[];
  paisselectInfoGeneral:string;
  paisselectInterme:string;
  paisselectCARC:string;
  FormaEnvioSelect:string;
  EstadoSelctInfoGen:string;
  EstadoSelctInterm:string;
  ciuSelctInfoGen:string;
  ciuSelctInterm:string;
  estados: Estado[];
  ciudades:Ciudad[];
  nivelcomercial: string[] = ["Distribuidor", "Minorista", "Mayorista", "Otro"];
  SiNo: string[] = ["Si", "No"];
  FormaP: string[] = ["Cheque Bancario/Personal", "Carta Credito", "Efectivo", "Giro Bancario", "Pago Anticipado", "Pago Electronico", "Transferencia Bancaria"];
  pagoefecSel:string;
  FormaPago:string;
  situacioncomercial: string[] = ["Distribuidor", "Mayorista", "Fabricante","Productor", "Revendedor", "Otro"];
  FormaEnvio: string[] = ["Fraccionado", "Total", "Parcial","Fraccionado",  "Otro"];
  siruacioncomselected:string;
  nivelselected:string;
  paiselect:string;
  estadoselec:string;
  aduselect:string;
  aduseling:string;
  ciuselec:string;
  closeResult = '';
  formDeva: FormGroup;

  constructor(private modalService: NgbModal, private paisesService: PaisesService,
     private aduanasService: AduanasService, private estadosService: EstadosService
     , private fb:FormBuilder, private ciudadesService:CiudadesService
    ) {}
     
  ngOnInit() {
    this.paiselect = "- Seleccionar -";
    this.aduselect = "- Seleccionar -";
    this.aduseling ="- Seleccionar -";
    this.estadoselec ="- Seleccionar -";
    this.ciuselec ="- Seleccionar -";
    this.nivelselected ="- Seleccionar -";
    this.paisselectInfoGeneral ="- Seleccionar -";
    this.EstadoSelctInfoGen ="- Seleccionar -";
    this.ciuSelctInfoGen = "- Seleccionar -";
    this.siruacioncomselected= "- Seleccionar -";
    this.paisselectInterme= "- Seleccionar -";
    this.EstadoSelctInterm= "- Seleccionar -";
    this.ciuSelctInterm = "- Seleccionar -";
    this.paisselectCARC = "- Seleccionar -";
    this.FormaEnvioSelect = "- Seleccionar -";
    this.pagoefecSel= "- Seleccionar -";
    this.FormaPago= "- Seleccionar -";
    this.paisesService.getData().subscribe(
      (data: Pais[]) => {
        this.paises = data;
      },
      (error) => {
        console.log(error);
      }
    );
   

    
    this.ciudadesService.getData().subscribe(
      (data: Ciudad[]) => {
        this.ciudades = data;
      },
      (error) => {
        console.log(error);
      }
    );
    
    //formgroup 
      this.formDeva = this.fb.group({


      })

    //---endformgroup

    this.aduanasService.getData().subscribe(
      (data: Aduana[]) => {
        this.aduanas = data;
      },
      (error) => {
        console.log(error);
      }
    );

    this.estadosService.getData().subscribe(
      (data: Estado[]) => {
        this.estados = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }



  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  paisSelect(paisId: number, pais: string) {
    this.paiselect = pais;
  }
  aduSelect(adus: number, adu: string) {
    this.aduselect = adu;
  }
  aduSelectIn(adus: number, adu: string) {
    this.aduseling = adu;
  }
  estadoSelec(esID: number, esd: string) {
    this.estadoselec = esd;
  }
  ciudadSelec(idc: number, ciu: string) {
    this.ciuselec = ciu;
  }
  nivelSelec( ciu: string) {
    this.nivelselected = ciu;
  }
  paisInfoGeneralSelec( paisId: number, pais: string) {
    this.paisselectInfoGeneral = pais;
  }
  EstaInfoGeneralSelec( paisId: number, pais: string) {
    this.EstadoSelctInfoGen = pais;
  }
  ciuInfoGeneralSelec(PaisID:number, pais:string){ 
    this.ciuSelctInfoGen =pais; 
  }
  siruacionselec(pais:string){
    this.siruacioncomselected =pais;
  }
  paisselecInterm(PaisID:number,pais:string){
    this.paisselectInterme =pais;
  }
  estselecInterm(PaisID:number,pais:string){
    this.EstadoSelctInterm =pais;
  }
  CiuselecInterm(PaisID:number,pais:string){
    this.ciuSelctInterm =pais;
  }
  paisSelectCarac(paisId: number, pais: string) {
    this.paisselectCARC = pais;
  }
  FormaEnvioS( pais: string) {
    this.FormaEnvioSelect = pais;
  }
  PagoEfecS( pais: string) {
    this.pagoefecSel = pais;
  }
  FormaPagoS(pai:string){
    this.FormaPago = pai;
  }
  private getDismissReason(reason: any): string {   
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  input24: string = "- SELECCIONE -";

  input24change(event:any) {
    this.input24 = event.target.value;
  }

  input25: string = "- SELECCIONE -";

  input25change(event:any) {
    this.input25 = event.target.value;
  }

  input26: string = "- SELECCIONE -";

  input26change(event:any) {
    this.input26 = event.target.value;
  }

  input27: string = "- SELECCIONE -";

  input27change(event:any) {
    this.input27 = event.target.value;
  }

  input28: string = "- SELECCIONE -";

  input28change(event:any) {
    this.input28 = event.target.value;
  }

  input29: string = "- SELECCIONE -";

  input29change(event:any) {
    this.input29 = event.target.value;
  }
}

// @Component({
//   selector: 'dialog-elements-example-dialog',
//   template: `<h1 mat-dialog-title>Dialog with elements</h1>
//   <div mat-dialog-content>This dialog showcases the title, close, content and actions elements.</div>
//   <div mat-dialog-actions>
//     <button mat-button mat-dialog-close>Close</button>
//   </div>`,
// })
// export class DialogElementsExampleDialog {}