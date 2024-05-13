export class Item {
    Item_Id: number; // Identificador del item
    FaDe_Cantidad: number; // Cantidad del item
    FaDe_UnidadMedida: string; // Unidad de medida del item
    Fact_NumeroFactura:string;
    FaDe_Caracteristicas: string; // Características del item
    Pais: string; // ID del país de origen del item
    FaDe_ValorUnitario: number; // Valor unitario del item
    FaDe_TotalFactura:  number; // Total de la factura
    FaDe_Estado?: boolean; // Estado del item (activo o inactivo)
    FaDe_Creacion: number; // Usuario que creó el registro del item
    FaDe_FechaCreacion: string; // Fecha de creación del registro del item
    FaDe_Modifica?: number; // Usuario que modificó el registro del item
    FaDe_FechaModifica?: string; // Fecha de modificación del registro del item
}