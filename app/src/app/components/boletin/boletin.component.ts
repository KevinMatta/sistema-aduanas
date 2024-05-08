import { Component, OnInit } from '@angular/core';
// import * as html2pdf from "html2pdf.js";

@Component({
  selector: 'app-boletin',
  templateUrl: './boletin.component.html',
  styleUrls: ['./boletin.component.css']
})
export class BoletinComponent implements OnInit {
  blobUrl: string;

  ngOnInit() {
  }

  convertHtml2Pdf(){
    const options = {
      filename: 'boletin',
      image: {type: 'jpeg'},
      html2canvas: {},
      jsPDF: {orientation: 'landscape'},
    };
    const content: Element = document.getElementById('boletin');
    // html2pdf().from(content).set(options).toPdf().get('pdf').then((pdf) => {
    //   const blob = new Blob([pdf.output('blob')], {type: 'application/pdf'});
    //   this.blobUrl = URL.createObjectURL(blob);
    //   console.log(this.blobUrl); 
    // });
  }
}