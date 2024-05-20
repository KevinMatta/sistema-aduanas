export class FacturaDetalle {
    FaDe_Id: number; // Identificador del detalle de factura
    Fact_Id: number; // ID de la factura asociada
    Item_Id: number; // ID del item asociado
    FaDe_NumeroItem: number; // Número del ítem en la factura
    FaDe_Cantidad: number; // Cantidad del ítem en la factura
    FaDe_UnidadMedida: string; // Unidad de medida del ítem
    FaDe_Caracteristicas: string; // Características del ítem
    Pais_Id: number; // ID del país asociado
    FaDe_ValorUnitario: number; // Valor unitario del ítem
    FaDe_TotalFactura: number; // Total de la factura para este ítem

    FaDe_Estado?: boolean; // Estado del detalle de factura (activo o inactivo)
    FaDe_Creacion: number; // Usuario que creó el registro del detalle de factura
    FaDe_FechaCreacion: string; // Fecha de creación del registro del detalle de factura
    FaDe_Modifica?: number; // Usuario que modificó el registro del detalle de factura
    FaDe_FechaModifica?: string; // Fecha de modificación del registro del detalle de factura
}