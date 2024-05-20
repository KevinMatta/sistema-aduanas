import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Rol } from "../../Models/RolesViewModel";
import { RolesService } from "../../Services/roles.service";
import { Usuario } from "../../Models/UsuariosViewModel";
import { ToastrService } from "ngx-toastr";
import { UsuariosService } from "../../Services/usuarios.service";
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DEDService } from "../../Services/DeVa-Enc-Item.service";
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
// import { MensajesService } from "../../Services/mensajes.service";
import { FormFacturaitemComponent } from '../items-Factura/factura-item.component';
import { Item } from "../../Models/ItemsViewModel";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Factura } from "../../Models/FacEncViewModel";

@Component({
  selector: "app-factura-encabezado",
  templateUrl: "./factura-encabezado.component.html",
  styleUrls: ["./factura-encabezado.component.css"],
})
export class FormFacturaEncabezadoComponent implements OnInit {
  @Input() usuarioParaEditar: Usuario;
  roles: Rol[];
  Items: Item[] = [];
  FactEnc: FormGroup;
  fechafac: string;
  itemsFiltrados: any[];
  Item: string[] = [
    "Metro", "juja"
  ]
  usuario: Usuario = new Usuario();
  confirmarClave: string;
  constructor(
    public activeModal: NgbActiveModal,
    private rolesService: RolesService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public dedService: DEDService,
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    
  ) { }

  isLoading = true;
  ngOnInit(): void {

    this.Items = this.dedService.Items;
    // console.log(this.Items +'items');
    // console.log(JSON.stringify(this.Items));
    console.log('Se actualizo');
    this.itemsFiltrados = this.dedService.Items.filter(item => item.Fact_NumeroFactura === this.dedService.numFactura);
    console.log(this.dedService.Items + 'service');

    this.FactEnc = this.fb.group({
      Fact_NumeroFactura: ['', Validators.required],
      Fact_Fecha: [''],
      
    });
  }
  openItem() {
    if (this.FactEnc.valid) {
      let nuevoItem: Factura = {
        Fact_NumeroFactura:this.FactEnc.get('Fact_NumeroFactura').value ,
        
        Fact_Fecha: this.fechafac,
        Fact_Id: 0, 
        Deva_Id: 0, 
        Fact_Creacion: 0, 
        Fact_FechaCreacion: new Date().toISOString(), 
      };
      
      this.dedService.agregarEncabezado(nuevoItem);
    let modalRef = this.modalService.open(FormFacturaitemComponent, { size: 'lg' });
    modalRef.result.then((data) => {
      console.log(this.dedService.Items, 'this.dedService.Items AL CERRAR MODAL');      
      this.Items = this.dedService.Items;
      console.log(data);
      
    });
  } else {
    console.log('El formulario no está completo');
  }
    
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
      this.fechafac = `${date.year}-${this.formatTwoDigits(date.month)}-${this.formatTwoDigits(date.day)}`;
      //  this.fechafac  = `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;
      console.log(this.fechafac); 
      this.FactEnc.patchValue({
        Fact_Fecha: date
      });
    } else {
      console.error('FormControl Fact_Fecha is undefined or null');
    }
  }



   formatTwoDigits(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
