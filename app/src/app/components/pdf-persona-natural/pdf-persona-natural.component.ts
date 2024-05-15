import { Component, OnInit, Input } from "@angular/core";
import { PersonaNatural } from "../../Models/PersonaNaturalViewModel";
import html2PDF from 'jspdf-html2canvas';
@Component({
  selector: "app-pdf-persona-natural",
  templateUrl: "./pdf-persona-natural.component.html",
  styleUrls: ["./pdf-persona-natural.component.css"],
})
export class PdfPersonaNaturalComponent implements OnInit {
  @Input() personaNatural:PersonaNatural;

  fecha:string;
  constructor(
  ){}
  ngOnInit(): void {
    console.log(this.personaNatural, 'this.personaNatural');
    const dateObj = new Date();
    const month   = dateObj.getUTCMonth() + 1; 
    const day     = dateObj.getUTCDate();
    const year    = dateObj.getUTCFullYear();

    this.fecha = `${day}-${month}-${year}`;
  }
  async imprimir(){
    const impresion = document.getElementById("impresion")

    impresion.style.background = '#3E3E3E';

    const pdf = await html2PDF(impresion, {
      jsPDF: {
        format: 'letter',
      },
      imageType: 'image/jpeg',
      output: `./${this.fecha}-formulario-persona-natural.pdf`
    });

    impresion.style.background = 'transparent';
  }
}