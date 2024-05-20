import { Component, Input, OnInit } from "@angular/core";
import { ComercianteIndividual } from "../../Models/ComercianteIndividualViewModel";
import html2PDF from 'jspdf-html2canvas';

@Component({
  selector: "app-pdf-comerciante-individual",
  templateUrl: "./pdf-comerciante-individual.component.html",
  styleUrls: ["./pdf-comerciante-individual.component.css"],
})
export class PdfComercianteIndividualComponent implements OnInit {
  @Input() comercianteIndividual:ComercianteIndividual;
  constructor(
  ){}
  fecha:string;
  ngOnInit(): void {
    console.log(this.comercianteIndividual, 'this.comercianteIndividual');
    const dateObj = new Date();
    const month   = dateObj.getUTCMonth() + 1; 
    const day     = dateObj.getUTCDate();
    const year    = dateObj.getUTCFullYear();

    this.fecha = `${year}-${month}-${day}`;
  }
  async imprimir(){
    const impresion = document.getElementById("impresion")

    impresion.style.background = '#3E3E3E';

    const pdf = await html2PDF(impresion, {
      jsPDF: {
        format: 'letter',
      },
      imageType: 'image/jpeg',
      output: `./${this.fecha}-formulario-comerciante-individual.pdf`
    });

    impresion.style.background = 'transparent';
  }
}
