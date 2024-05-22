
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-declaracion-valor',
  templateUrl: './form-declaracion-valor.component.html',
  styleUrls: ['./form-declaracion-valor.component.css']
})
export class FormDeclaracionValorComponent implements OnInit {
  aduin: number;
  adudes: number;
  declaracionDeValorForm: FormGroup;
  display: any = "false";
  aduanas: Aduana[];
  paises: Pais[];
  factura: Factura[] = [];
  Deva: DeclaracionDeValor[];
  paisselectInfoGeneral: number;
  paisselectInfoGeneralTexto: string;
  paisselectInterme: string;
  paisselectCARC: string;
  FormaEnvioSelect: string;
  EstadoSelctInfoGen: string;
  EmbarSelecAduana: string;
  EstadoSelctInterm: string;
  ciuSelctInfoGen: string;
  ciuSelctInterm: string;
  estados: Estado[];
  ciudades: Ciudad[];
  nivelcomercial: string[] = ["Distribuidor", "Minorista", "Mayorista", "Otro"];
  SiNo: string[] = ["Si", "No"];
  FormaP: string[] = ["Cheque Bancario/Personal", "Carta Credito", "Efectivo", "Giro Bancario", "Pago Anticipado", "Pago Electronico", "Transferencia Bancaria"];
  pagoefecSel: string;
  FormaPago: string;
  situacioncomercial: string[] = ["Distribuidor", "Mayorista", "Fabricante", "Productor", "Revendedor", "Otro"];
  FormaEnvio: string[] = ["Fraccionado", "Total", "Parcial", "Fraccionado", "Otro"];
  siruacioncomselected: string;
  nivelselected: string;
  paiselect: string;
  paiselecttrans: string;
  Monedas: string[] = ["Dolar", "Lempira", "Yuan", "Rublos", "Libras Esterlinas"];
  MonedaSel: string;
  fechaacep:string;
  estadoselec: string;
  aduselect: string;
  aduseling: string;
  ciuselec: string;
  closeResult = '';
  // formDeva: FormGroup;

  constructor(private modalService: NgbModal, private paisesService: PaisesService,
    private aduanasService: AduanasService, private estadosService: EstadosService
    ,
    private fb: FormBuilder,
    private ciudadesService: CiudadesService,
    public dedService: DEDService
  ) { }

  ngOnInit() {


    this.factura = this.dedService.Encabezado;


    this.paiselect = "- Seleccionar -";
    this.aduselect = "- Seleccionar -";
    this.aduseling = "- Seleccionar -";
    this.estadoselec = "- Seleccionar -";
    this.ciuselec = "- Seleccionar -";
    this.nivelselected = "- Seleccionar -";
    this.MonedaSel = "- Seleccionar -";
    this.EmbarSelecAduana = "- Seleccionar -";
    this.paisselectInfoGeneralTexto = "- Seleccionar -";
    this.paisselectInfoGeneral;
    this.EstadoSelctInfoGen = "- Seleccionar -";
    this.ciuSelctInfoGen = "- Seleccionar -";
    this.siruacioncomselected = "- Seleccionar -";
    this.paisselectInterme = "- Seleccionar -";
    this.EstadoSelctInterm = "- Seleccionar -";
    this.ciuSelctInterm = "- Seleccionar -";
    this.paisselectCARC = "- Seleccionar -";
    this.FormaEnvioSelect = "- Seleccionar -";
    this.pagoefecSel = "- Seleccionar -";
    this.paiselecttrans = "- Seleccionar -";
    this.FormaPago = "- Seleccionar -";

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
      DeVa_AduanaIngreso: ['',],
      DeVa_AduanaDespacho: ['',],
      DeVa_FechaAceptacion: [''],
      DeVa_RtnImportador: ['', Validators.required],
      DeVa_LugarEntrega: [''],
      DeVa_PaisEntrega: [''],

      DeVa_NumeroContrado: [''],
      DeVa_FechaContrado: [''],
      DeVa_PaisEmbarque: [''],
      Deva_LugarEmbarque: [''],
      DeVa_PaisExportacion: [''],
      DeVa_FechaExportacion: [''],
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
      DeVa_Creacion: [''],
      DeVa_FechaCreacion: [''],
      DeVa_Modifica: [''],
      DeVa_FechaModifica: ['']
    });

    this.declaracionDeValorForm.get('DeVa_PagosIndirectosDescuentosRetroactivos').valueChanges.subscribe(() => {
      this.calcularTotalFactura();
    });

    this.declaracionDeValorForm.get('DeVa_MontoCondicionContraprestacion').valueChanges.subscribe(() => {
      this.TotalAjustes();
    });
    this.declaracionDeValorForm.get('DeVa_MontoReversionCasilla').valueChanges.subscribe(() => {
      this.TotalAjustes();
    });
    this.declaracionDeValorForm.get('DeVa_GastosComisiones').valueChanges.subscribe(() => {
      this.TotalAjustes();
    });
    this.declaracionDeValorForm.get('DeVa_GastosEnvasesEmbalajes').valueChanges.subscribe(() => {
      this.TotalAjustes();
    });
    this.declaracionDeValorForm.get('DeVa_GastosTransporteMercaderia').valueChanges.subscribe(() => {
      this.TotalAjustes();
    });
    this.declaracionDeValorForm.get('DeVa_GastosCargaDescarga').valueChanges.subscribe(() => {
      this.TotalAjustes();
    });
    this.declaracionDeValorForm.get('DeVa_CostosSeguro').valueChanges.subscribe(() => {
      this.TotalAjustes();
    });
    // TOTAL DEDUCCIONES
    this.declaracionDeValorForm.get('DeVa_GastosConstruccionArmado').valueChanges.subscribe(() => {
      this.TotalDeducciones();
    });
    this.declaracionDeValorForm.get('DeVa_CostosTransportePosterior').valueChanges.subscribe(() => {
      this.TotalDeducciones();
    });
    this.declaracionDeValorForm.get('DeVa_DerechosImpuestos').valueChanges.subscribe(() => {
      this.TotalDeducciones();
    });
    this.declaracionDeValorForm.get('DeVa_MontoIntereses').valueChanges.subscribe(() => {
      this.TotalDeducciones();
    });
    this.declaracionDeValorForm.get('DeVa_OtrasDeducciones').valueChanges.subscribe(() => {
      this.TotalDeducciones();
    });
  }
  // TotalAjustes() {

  //   const totajus = 0;
  //   const monto = parseFloat(this.declaracionDeValorForm.get('DeVa_MontoCondicionContraprestacion').value ?? 0);
  //   const gastoscons = parseFloat(this.declaracionDeValorForm.get('DeVa_MontoReversionCasilla').value ?? 0);
  //   const costotransp = parseFloat(this.declaracionDeValorForm.get('DeVa_GastosComisiones').value    ?? 0);
  //   const derechos = parseFloat(this.declaracionDeValorForm.get('DeVa_GastosEnvasesEmbalajes').value ?? 0);
  //   const montoIntereses = parseFloat(this.declaracionDeValorForm.get('DeVa_GastosTransporteMercaderia').value ?? 0);
  //   const OtrasDeducciones = parseFloat(this.declaracionDeValorForm.get('DeVa_GastosCargaDescarga').value ?? 0);
  //   const costoseguro = parseFloat(this.declaracionDeValorForm.get('DeVa_CostosSeguro').value ?? 0);
    

  //   const totalFactura = totajus + monto+ gastoscons + costotransp + derechos + montoIntereses + OtrasDeducciones + costoseguro ;

  //   // Usar interpolación de cadenas para convertir el valor numérico a cadena de texto
  //   this.declaracionDeValorForm.get('DeVa_TotalAjustes').setValue(`${totalFactura}`);

  // }
  TotalDeducciones() {
    const totajus = 0;

    const parseSafeFloat = (value) => parseFloat(value) || 0;

    const gastoscons = parseSafeFloat(this.declaracionDeValorForm.get('DeVa_GastosConstruccionArmado').value);
    const costotransp = parseSafeFloat(this.declaracionDeValorForm.get('DeVa_CostosTransportePosterior').value);
    const derechos = parseSafeFloat(this.declaracionDeValorForm.get('DeVa_DerechosImpuestos').value);
    const montoIntereses = parseSafeFloat(this.declaracionDeValorForm.get('DeVa_MontoIntereses').value);
    const OtrasDeducciones = parseSafeFloat(this.declaracionDeValorForm.get('DeVa_OtrasDeducciones').value);
   

    const totalFactura = totajus  + gastoscons + costotransp + derechos + montoIntereses + OtrasDeducciones ;
    
    const valoraduana =  parseSafeFloat(this.declaracionDeValorForm.get('DeVa_TotalAjustes').value ) + parseSafeFloat(this.declaracionDeValorForm.get('DeVa_PrecioRealPagado').value) - totalFactura;
    this.declaracionDeValorForm.get('DeVa_ValorAduana').setValue(`${valoraduana} `);


    this.declaracionDeValorForm.get('DeVa_TotalDeducciones').setValue(`${totalFactura}`);
}
  TotalAjustes() {
    const totajus = 0;

    const parseSafeFloat = (value) => parseFloat(value) || 0;

    const monto = parseSafeFloat(this.declaracionDeValorForm.get('DeVa_MontoCondicionContraprestacion').value);
    const gastoscons = parseSafeFloat(this.declaracionDeValorForm.get('DeVa_MontoReversionCasilla').value);
    const costotransp = parseSafeFloat(this.declaracionDeValorForm.get('DeVa_GastosComisiones').value);
    const derechos = parseSafeFloat(this.declaracionDeValorForm.get('DeVa_GastosEnvasesEmbalajes').value);
    const montoIntereses = parseSafeFloat(this.declaracionDeValorForm.get('DeVa_GastosTransporteMercaderia').value);
    const OtrasDeducciones = parseSafeFloat(this.declaracionDeValorForm.get('DeVa_GastosCargaDescarga').value);
    const costoseguro = parseSafeFloat(this.declaracionDeValorForm.get('DeVa_CostosSeguro').value);

    const totalFactura = totajus + monto + gastoscons + costotransp + derechos + montoIntereses + OtrasDeducciones + costoseguro;

    this.declaracionDeValorForm.get('DeVa_TotalAjustes').setValue(`${totalFactura}`);
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
  onDateSelect(date: NgbDateStruct) {
    // Aquí puedes hacer lo que necesites con la fecha seleccionada
    console.log(date); // Esto imprimirá la fecha seleccionada en la consola
    // this.FactEnc.patchValue({
    //   Fact_Fecha: date
    // });
    if (date!= null) {
      // (dateSelect)="onDateSelect($event)"
      // this.fechafac = date;
      // Verificar si el FormControl existe y está definido
      this.fechaacep = `${date.year}-${this.formatTwoDigits(date.month)}-${this.formatTwoDigits(date.day)}`;
      //  this.fechafac  = `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;
      console.log(this.fechaacep); 
      
    } else {
      console.error('FormControl Fact_Fecha is undefined or null');
    }
  }
  formatTwoDigits(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  GuardarDeva() {
    if (this.declaracionDeValorForm.valid) {
      let nuevoDeva: DeclaracionDeValor = {
        // DeVa_RtnImportador: this.declaracionDeValorForm.get('DeVa_RtnImportador').value,
        // DeVa_AduanaIngreso: parseInt(this.aduseling),
        // DeVa_AduanaDespacho: parseInt(this.aduseling),
        // DeVa_LugarEntrega: this.declaracionDeValorForm.get('DeVa_LugarEntrega').value,
        DeVa_AduanaIngreso: this.aduin,
        DeVa_AduanaDespacho: this.adudes,
        DeVa_FechaAceptacion: this.fechaacep,
        DeVa_RtnImportador: this.declaracionDeValorForm.get('DeVa_RtnImportador').value,
        DeVa_LugarEntrega: this.declaracionDeValorForm.get('DeVa_LugarEntrega').value,

        DeVa_PaisEntrega: parseInt(this.paiselect),

        DeVa_NumeroContrado: this.declaracionDeValorForm.get('DeVa_NumeroContrado').value,
        DeVa_FechaContrado: '2024-05-01',

        DeVa_PaisEmbarque: parseInt(this.declaracionDeValorForm.get('DeVa_PaisEmbarque').value),

        Deva_LugarEmbarque: parseInt(this.declaracionDeValorForm.get('Deva_LugarEmbarque').value),

        DeVa_PaisExportacion: parseInt(this.declaracionDeValorForm.get('DeVa_PaisExportacion').value),

        DeVa_FechaExportacion:  '2024-05-01',
        DeVa_Restricciones: this.declaracionDeValorForm.get('DeVa_Restricciones').value,
        DeVa_CondicionContraprestacion: this.declaracionDeValorForm.get('DeVa_CondicionContraprestacion').value,
        DeVa_MontoReversion: parseFloat(this.declaracionDeValorForm.get('DeVa_MontoReversion').value),
        DeVa_TipoVinculacion: this.declaracionDeValorForm.get('DeVa_TipoVinculacion').value,
        DeVa_InfluenciaPrecio: this.declaracionDeValorForm.get('DeVa_InfluenciaPrecio').value === 'true',
        DeVa_PagosIndirectosDescuentos: this.declaracionDeValorForm.get('DeVa_PagosIndirectosDescuentos').value,
        DeVa_CanonDerechosLicencia: this.declaracionDeValorForm.get('DeVa_CanonDerechosLicencia').value,
        DeVa_PrecioFactura: parseFloat(this.declaracionDeValorForm.get('DeVa_PrecioFactura').value),
        DeVa_PagosIndirectosDescuentosRetroactivos: parseFloat(this.declaracionDeValorForm.get('DeVa_PagosIndirectosDescuentosRetroactivos').value),
        DeVa_PrecioRealPagado: parseFloat(this.declaracionDeValorForm.get('DeVa_PrecioRealPagado').value),
        DeVa_MontoCondicionContraprestacion: parseFloat(this.declaracionDeValorForm.get('DeVa_MontoCondicionContraprestacion').value),
        DeVa_MontoReversionCasilla: parseFloat(this.declaracionDeValorForm.get('DeVa_MontoReversionCasilla').value),
        DeVa_GastosComisiones: parseFloat(this.declaracionDeValorForm.get('DeVa_GastosComisiones').value),
        DeVa_GastosEnvasesEmbalajes: parseFloat(this.declaracionDeValorForm.get('DeVa_GastosEnvasesEmbalajes').value),
        DeVa_ValorMaterialesConsumidos: parseFloat(this.declaracionDeValorForm.get('DeVa_ValorMaterialesConsumidos').value),
        DeVa_ValorHerramientas: parseFloat(this.declaracionDeValorForm.get('DeVa_ValorHerramientas').value),
        DeVa_ValorMaterialesConsumidos2: parseFloat(this.declaracionDeValorForm.get('DeVa_ValorMaterialesConsumidos2').value),
        DeVa_ValorIngenieriaCreacion: parseFloat(this.declaracionDeValorForm.get('DeVa_ValorIngenieriaCreacion').value),
        DeVa_ValorCanoDerechosLicencia: parseFloat(this.declaracionDeValorForm.get('DeVa_ValorCanoDerechosLicencia').value),
        DeVa_GastosTransporteMercaderia: parseFloat(this.declaracionDeValorForm.get('DeVa_GastosTransporteMercaderia').value),
        DeVa_GastosCargaDescarga: parseFloat(this.declaracionDeValorForm.get('DeVa_GastosCargaDescarga').value),
        DeVa_CostosSeguro: parseFloat(this.declaracionDeValorForm.get('DeVa_CostosSeguro').value),
        DeVa_TotalAjustes: parseFloat(this.declaracionDeValorForm.get('DeVa_TotalAjustes').value),
        DeVa_GastosConstruccionArmado: parseFloat(this.declaracionDeValorForm.get('DeVa_GastosConstruccionArmado').value),
        DeVa_CostosTransportePosterior: parseFloat(this.declaracionDeValorForm.get('DeVa_CostosTransportePosterior').value),
        DeVa_DerechosImpuestos: parseFloat(this.declaracionDeValorForm.get('DeVa_DerechosImpuestos').value),
        DeVa_MontoIntereses: parseFloat(this.declaracionDeValorForm.get('DeVa_MontoIntereses').value),
        DeVa_OtrasDeducciones: parseFloat(this.declaracionDeValorForm.get('DeVa_OtrasDeducciones').value),
        DeVa_TotalDeducciones: parseFloat(this.declaracionDeValorForm.get('DeVa_TotalDeducciones').value),
        DeVa_ValorAduana: parseFloat(this.declaracionDeValorForm.get('DeVa_ValorAduana').value),
        DeVa_Estado: this.declaracionDeValorForm.get('DeVa_Estado').value === 'true',
        DeVa_Creacion: 1,
        DeVa_FechaCreacion: '2024-05-21',
        DeVa_Modifica: parseInt(this.declaracionDeValorForm.get('DeVa_Modifica').value),
        DeVa_FechaModifica: '2024-05-21'


      }
      // this.dedService.agregarDeva(nuevoDeva);
      console.log(nuevoDeva, 'nuevoDeva');
      this.dedService.agregarDeva(nuevoDeva)
      // window.location.reload();
    }
    else {
      console.log('El formulario no está completo');
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
    this.adudes = adus;

  }
  aduSelectIn(adus: number, adu: string) {
    this.aduseling = adus.toString();
    this.aduin = adus;

  }
  estadoSelec(esID: number, esd: string) {
    this.estadoselec = esd;
  }
  ciudadSelec(idc: number, ciu: string) {
    this.ciuselec = ciu;
  }
  nivelSelec(ciu: string) {
    this.nivelselected = ciu;
  }
  paisInfoGeneralSelec(PaisID: number, pais: string) {
    this.paisselectInfoGeneral = PaisID;
    this.paisselectInfoGeneralTexto = pais;
  }
  EstaInfoGeneralSelec(paisId: number, pais: string) {
    this.EstadoSelctInfoGen = pais;
  }
  ciuInfoGeneralSelec(PaisID: number, pais: string) {
    this.ciuSelctInfoGen = pais;
  }
  siruacionselec(pais: string) {
    this.siruacioncomselected = pais;
  }
  paisselecInterm(PaisID: number, pais: string) {
    this.paisselectInterme = pais;
  }
  estselecInterm(PaisID: number, pais: string) {
    this.EstadoSelctInterm = pais;
  }
  CiuselecInterm(PaisID: number, pais: string) {
    this.ciuSelctInterm = pais;
  }
  paisSelectCarac(paisId: number, pais: string) {
    this.paisselectCARC = pais;
  }
  FormaEnvioS(pais: string) {
    this.FormaEnvioSelect = pais;
  }
  PagoEfecS(pais: string) {
    this.pagoefecSel = pais;
  }
  FormaPagoS(pai: string) {
    this.FormaPago = pai;
  }
  PaisSelectrans(pIs: number, pai: string) {
    this.paiselecttrans = pai;
  }
  MonSl(pai: string) {
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

  input24change(event: any) {
    this.input24 = event.target.value;
  }

  input25: string = "- SELECCIONE -";

  input25change(event: any) {
    this.input25 = event.target.value;
  }

  input26: string = "- SELECCIONE -";

  input26change(event: any) {
    this.input26 = event.target.value;
  }

  input27: string = "- SELECCIONE -";

  input27change(event: any) {
    this.input27 = event.target.value;
  }

  input28: string = "- SELECCIONE -";

  input28change(event: any) {
    this.input28 = event.target.value;
  }

  input29: string = "- SELECCIONE -";

  input29change(event: any) {
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