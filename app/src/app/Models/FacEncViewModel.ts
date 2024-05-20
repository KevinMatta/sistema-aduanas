export class Factura {
    Fact_Id: number; // Identificador de la factura
    Fact_NumeroFactura: string; // Número de factura
    Fact_Fecha?: string; // Fecha de la factura
    Deva_Id: number; // ID de la entidad relacionada (por ejemplo, el ID del proveedor)

    Fact_Estado?: boolean; // Estado de la factura (activo o inactivo)
    Fact_Creacion: number; // Usuario que creó el registro de la factura
    Fact_FechaCreacion: string; // Fecha de creación del registro de la factura
    Fact_Modifica?: number; // Usuario que modificó el registro de la factura
    Fact_FechaModifica?: string; // Fecha de modificación del registro de la factura
}