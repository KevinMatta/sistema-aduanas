import { DeclaracionDeValor } from "./DeVaViewModel";
import { FacturaDetalle } from "./FacDetalleViewModel";
import { Factura } from "./FacEncViewModel";

export class request{
    deVaViewModel: DeclaracionDeValor;
    facturaEncViewModel: Factura;
    facturaDetalleViewModel: FacturaDetalle[];
}