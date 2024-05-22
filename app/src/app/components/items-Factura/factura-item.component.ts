import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Rol } from "../../Models/RolesViewModel";
import { Item } from "../../Models/ItemsViewModel";
import { RolesService } from "../../Services/roles.service";
import { Usuario } from "../../Models/UsuariosViewModel";
import { ToastrService } from "ngx-toastr";
import { PaisesService } from "../../Services/paises.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsuariosService } from "../../Services/usuarios.service";
import { DEDService } from "../../Services/DeVa-Enc-Item.service";
// import { MensajesService } from "../../Services/mensajes.service";
import { Pais } from "../../Models/PaisesViewModel";
import { FacturaDetalle } from "../../Models/FacDetalleViewModel";
import { CategoriaViewModel } from "../../Models/CategoriasViewModel";

@Component({
  selector: "app-factura-encabezado",
  templateUrl: "./factura-item.component.html",
  styleUrls: ["./factura-item.component.css"],
})
export class FormFacturaitemComponent implements OnInit {
  @Input() usuarioParaEditar: Usuario;
  @Output() onSubmit = new EventEmitter();
  Itemsss: FormGroup;
  roles: Rol[];
  paises: Pais[];

//  numfacc: string;
  //UnidadMedida: string;
  //UnidadMed: string[] = [

  numfacc:string;
  Items:Item[]= [];
  Categorias:CategoriaViewModel[]=[];
  UnidadMedida: string;
  itemselc:string;
  iditems:number;
  idcatselc:number;
  categselc:string;
  UnidadMed:string[]  = [

    "Metro",
    "Pulgada",
    "Litro",
    "Mililitro",
    "Kilogramo",
    "Gramo",
    "Pie cuadrado",
    "Centímetro cúbico",
    "Unidad",
  ];
  paisorigen: string;
  usuario: Usuario = new Usuario();
  confirmarClave: string;
  constructor(
    public activeModal: NgbActiveModal,
    private rolesService: RolesService,
    private toastr: ToastrService,
    private usuariosService: UsuariosService,
    private paisesService: PaisesService,
    private fb: FormBuilder,
    private dedService: DEDService
  ) // private mensajesService:MensajesService
  {}

  isLoading = true;
  ngOnInit(): void {
    this.dedService.numFactura;
    this.paisorigen = "- Seleccionar -";
    this.UnidadMedida = "- Seleccionar -";
    this.numfacc = this.dedService.numFactura;
    console.log(this.numfacc);
    this.paisesService.getData().subscribe(
      (data: Pais[]) => {
        this.paises = data;
        console.log(this.paises);
      },
      (error) => {
        console.log(error);
      }
    );
    this.dedService.getData().subscribe(
      (data: CategoriaViewModel[]) => {
        this.Categorias = data;
        
      },
      (error) => {
        console.log(error);
      }
    );

   
    this.Itemsss = this.fb.group({
      Item_Id: [""],
      FaDe_Cantidad: [""],
      FaDe_UnidadMedida: [""],
      FaDe_Caracteristicas: [""],
      Pais_Id: [""],
      FaDe_ValorUnitario: [""],
      FaDe_TotalFactura: [""],
    });
    this.Itemsss.get("FaDe_ValorUnitario").valueChanges.subscribe(() => {
      this.calcularTotalFactura();
    });

    this.Itemsss.get("FaDe_Cantidad").valueChanges.subscribe(() => {
      this.calcularTotalFactura();
    });
  }

  calcularTotalFactura() {
    const valorUnitario = this.Itemsss.get("FaDe_ValorUnitario").value;
    const cantidad = this.Itemsss.get("FaDe_Cantidad").value;

    const totalFactura = valorUnitario * cantidad;

    this.Itemsss.get("FaDe_TotalFactura").setValue(totalFactura);
  }
  agregarItem() {
    if (this.Itemsss.valid) {

      //let nuevoItem: Item = {
        //Item_Id: this.Itemsss.get("Item_Id").value,
        //FaDe_Cantidad: this.Itemsss.get("FaDe_Cantidad").value,
        //FaDe_UnidadMedida: this.UnidadMedida,
       // FaDe_Caracteristicas: this.Itemsss.get("FaDe_Caracteristicas").value,

      let nuevoItem: FacturaDetalle = {
        Item_Id: this.iditems,
        FaDe_Id:0,
        Fact_Id:0,
        FaDe_Cantidad: this.Itemsss.get('FaDe_Cantidad').value,
        FaDe_UnidadMedida: this.UnidadMedida, 
        FaDe_Caracteristicas: this.Itemsss.get('FaDe_Caracteristicas').value,

        Fact_NumeroFactura: this.numfacc,
        Pais: this.paisorigen,
        FaDe_ValorUnitario: this.Itemsss.get("FaDe_ValorUnitario").value,
        FaDe_TotalFactura: this.Itemsss.get("FaDe_TotalFactura").value,
        FaDe_Creacion: 0,
        FaDe_FechaCreacion: "",
        Item: "",
        Categoria: "",
        _aranceles: [],
      };

      this.dedService.agregaritem(nuevoItem);
      this.Itemsss.reset();
      this.activeModal.close("Save click");
      console.log("Items después de agregar:", nuevoItem);
      console.log(this.dedService.Items);
    }
  }
  catselec(id: number, des:string){
    this.categselc=des;
    
    this.dedService.getDataItem(id).subscribe(
      (data: Item[]) => {
        this.Items = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ItemSelec(id: number, des: string){
    this.itemselc =des;
    this.iditems = id;
    console.log(this.iditems);
  }


  // agregarItem() {
  //   console.log(this.Itemsss.value);
  //   if (this.Itemsss.valid) {

  //     const nuevoItem: Item = this.Itemsss.value;
  //     this.Items.push(nuevoItem);
  //     console.log(this.Items);

  //     this.Itemsss.reset(); // Opcional: para limpiar el formulario después de agregar el item
  //   }
  // }
  porigens(paisId: number, pais: string) {
    this.paisorigen = pais;
  }
  UnMedSel(pais: string) {
    this.UnidadMedida = pais;
  }
}
