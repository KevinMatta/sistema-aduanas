
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PaisesService } from "../../Services/paises.service";
import { AduanasService } from "../../Services/aduanas.service";
import { Pais } from "../../Models/PaisesViewModel";
import { Aduana } from "../../Models/AduanasViewModel";
@Component({
  selector: 'app-form-declaracion-valor',
  templateUrl: './form-declaracion-valor.component.html',
  styleUrls: ['./form-declaracion-valor.component.css']
})
export class FormDeclaracionValorComponent implements OnInit {

  display:any ="false";
  aduanas:Aduana[];
  paises: Pais[];
  paiselect:string;
  aduselect:string;
  closeResult = '';

  constructor(private modalService: NgbModal, private paisesService: PaisesService, private aduanasService: AduanasService) {}
  ngOnInit() {
    this.paiselect = "- Seleccionar -";
    this.paisesService.getData().subscribe(
      (data: Pais[]) => {
        this.paises = data;
      },
      (error) => {
        console.log(error);
      }
    );

    this.aduanasService.getData().subscribe(
      (data: Aduana[]) => {
        this.aduanas = data;
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