import { Component, OnInit } from "@angular/core";
import {jsPDF} from "jspdf";
import { UtilitariosService } from "../../Services/utilitarios.service";
import { SafeResourceUrl } from "@angular/platform-browser";
import html2PDF from 'jspdf-html2canvas';

@Component({
  selector: "app-boletin",
  templateUrl: "./boletin.component.html",
  styleUrls: ["./boletin.component.css"],
})
export class BoletinComponent implements OnInit {
  blobUrl: SafeResourceUrl;

  constructor(private utilitariosService:UtilitariosService){}
  doc = new jsPDF();
  ngOnInit() {
    this.doc.text("Hello world!", 10, 10);
  }
  
  async descargar(){
    const boletin = document.getElementById("boletin")

    const pdf = await html2PDF(boletin, {
      jsPDF: {
        format: 'a4',
      },
      imageType: 'image/jpeg',
      output: './pdf/generate.pdf'
    });

    pdf.setFillColor(13,13,13);
    pdf.rect(0, 495, 800, 350, "F");

    this.blobUrl = this.utilitariosService.sanitizarBlobURl(URL.createObjectURL(pdf.output("blob")));
    console.log(this.blobUrl, 'blobUrl');
    
  };
}
