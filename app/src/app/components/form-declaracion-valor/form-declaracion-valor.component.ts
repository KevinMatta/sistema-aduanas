
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
import { FormFacturaEncabezadoComponent } from '../factura-encabezado/factura-encabezado.component';
import { FormFacturaitemComponent } from '../items-Factura/factura-item.component';
import { DEDService } from "../../Services/DeVa-Enc-Item.service";
import { Factura } from "../../Models/FacEncViewModel";
import { DeclaracionDeValor } from "../../Models/DeVaViewModel";

@Component({
  selector: 'app-form-declaracion-valor',
  templateUrl: './form-declaracion-valor.component.html',
  styleUrls: ['./form-declaracion-valor.component.css']
})
export class FormDeclaracionValorComponent implements OnInit {
  declaracionDeValorForm:FormGroup;
  display:any ="false";
  aduanas:Aduana[];
  paises: Pais[];
  factura:Factura[]=[];
  Deva:DeclaracionDeValor[];
  paisselectInfoGeneral:string;
  paisselectInterme:string;
  paisselectCARC:string;
  FormaEnvioSelect:string;
  EstadoSelctInfoGen:string;
  EmbarSelecAduana:string;
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
  paiselecttrans:string;
  Monedas: string[] = ["Dolar", "Lempira", "Yuan","Rublos",  "Libras Esterlinas"];
  MonedaSel:string;

  estadoselec:string;
  aduselect:string;
  aduseling:string;
  ciuselec:string;
  closeResult = '';
  // formDeva: FormGroup;

  constructor(private modalService: NgbModal, private paisesService: PaisesService,
     private aduanasService: AduanasService, private estadosService: EstadosService
     , 
     private fb:FormBuilder,
      private ciudadesService:CiudadesService,
     public dedService: DEDService
    ) {}
     
  ngOnInit() {
    
    
    this.factura = this.dedService.Encabezado;


    this.paiselect = "- Seleccionar -";
    this.aduselect = "- Seleccionar -";
    this.aduseling ="- Seleccionar -";
    this.estadoselec ="- Seleccionar -";
    this.ciuselec ="- Seleccionar -";
    this.nivelselected ="- Seleccionar -";
    this.MonedaSel="- Seleccionar -";
    this.EmbarSelecAduana="- Seleccionar -";
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
    this.paiselecttrans= "- Seleccionar -";
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
      // this.formDeva = this.fb.group({


      // })

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
    this.declaracionDeValorForm = this.fb.group({
      DeVa_AduanaIngreso: ['', ],
      DeVa_AduanaDespacho: ['', ],
      DeVa_FechaAceptacion: [''],
      DeVa_RtnImportador: ['', Validators.required ],
      DeVa_LugarEntrega: ['' ],
      DeVa_PaisEntrega: ['' ],
      
      DeVa_NumeroContrado: ['' ],
      DeVa_FechaContrado: ['' ],
      DeVa_PaisEmbarque: ['' ],
      Deva_LugarEmbarque: ['' ],
      DeVa_PaisExportacion: ['' ],
      DeVa_FechaExportacion: ['' ],
      DeVa_Restricciones: [''],
      DeVa_CondicionContraprestacion: [''],
      DeVa_MontoReversion: [''],
      DeVa_TipoVinculacion: [''],
      DeVa_InfluenciaPrecio: [''],
      DeVa_PagosIndirectosDescuentos: [''],
      DeVa_CanonDerechosLicencia: [''],
      DeVa_PrecioFactura: [''],
      DeVa_PagosIndirectosDescuentosRetroactivos: ['', Validators.required],
      DeVa_PrecioRealPagado: ['', Validators.required],
      //
      DeVa_MontoCondicionContraprestacion: [''],

      DeVa_MontoReversionCasilla: [''],
      DeVa_GastosComisiones: [''],
      DeVa_GastosEnvasesEmbalajes: [''],
      DeVa_ValorMaterialesConsumidos: [''],
      DeVa_ValorHerramientas: [''],
      DeVa_ValorMaterialesConsumidos2: [''],
      DeVa_ValorIngenieriaCreacion: [''],
      DeVa_ValorCanoDerechosLicencia: [''],
      //conttttttttttt
      DeVa_GastosTransporteMercaderia: [''],
      DeVa_GastosCargaDescarga: [''],

      DeVa_CostosSeguro: [''],

      DeVa_TotalAjustes: [''],
      DeVa_GastosConstruccionArmado: [''],
      DeVa_CostosTransportePosterior: [''],
      DeVa_DerechosImpuestos: [''],
      DeVa_MontoIntereses: [''],
      DeVa_OtrasDeducciones: [''],
      DeVa_TotalDeducciones: [''],
      DeVa_ValorAduana: [''],
      DeVa_Estado: [true],
      DeVa_Creacion: ['' ],
      DeVa_FechaCreacion: ['' ],
      DeVa_Modifica: [''],
      DeVa_FechaModifica: ['']
    });

    this.declaracionDeValorForm.get('DeVa_PagosIndirectosDescuentosRetroactivos').valueChanges.subscribe(() => {
      this.calcularTotalFactura();
    });
    
  }
  calcularTotalFactura() {
    const precioFac = this.dedService.subtotal;
    const Pagos = parseFloat(this.declaracionDeValorForm.get('DeVa_PagosIndirectosDescuentosRetroactivos').value);
    
    const totalFactura = precioFac + Pagos;
    
    // Usar interpolación de cadenas para convertir el valor numérico a cadena de texto
    this.declaracionDeValorForm.get('DeVa_PrecioRealPagado').setValue(`${totalFactura}`);

    this.declaracionDeValorForm.get('DeVa_PrecioRealPagado').setValue(totalFactura);
  }


  open() {
    
    let modalRef = this.modalService.open(FormFacturaEncabezadoComponent, { size: 'lg' });
    modalRef.result.then((data) => {
      this.factura = this.dedService.Encabezado;
        console.log(this.factura);

      console.log(data);
    });
  }



  GuardarDeva() {
    if (this.declaracionDeValorForm.valid) {
      let nuevoDeva: DeclaracionDeValor = {
        DeVa_RtnImportador: this.declaracionDeValorForm.get('DeVa_RtnImportador').value,
        DeVa_AduanaIngreso: parseInt(this.aduseling),
        DeVa_AduanaDespacho: parseInt(this.aduseling),
        DeVa_LugarEntrega: this.declaracionDeValorForm.get('DeVa_LugarEntrega').value,

        
      
      }
      console.log(nuevoDeva);
      window.location.reload();
    }
    else {
      // Si el FormGroup no está lleno, muestra un mensaje de error o toma la acción correspondiente
      console.log('El formulario no está completo');
      // Puedes mostrar un mensaje de error, deshabilitar el botón de abrir modal, etc.
    }
    
  }
  openItem() {
    let modalRef = this.modalService.open(FormFacturaitemComponent);
    modalRef.result.then((data) => {
      console.log(data);
    });
  }

  paisSelect(paisId: number, pais: string) {
    this.paiselect = paisId.toString();
  }
  aduSelect(adus: number, adu: string) {
    this.aduselect = adus.toString();
  }
  aduSelectIn(adus: number, adu: string) {
    this.aduseling = adus.toString();
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
  PaisSelectrans(pIs:number, pai:string){
    this.paiselecttrans = pai;
  }
  MonSl( pai:string){
    this.MonedaSel = pai;
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
  Embaraduasel(adus: number, adu: string) {
    this.EmbarSelecAduana = adu;
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