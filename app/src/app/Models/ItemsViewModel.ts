type ArancelIdPorcentajeTuple = [number, number];
export class Item {

    item_Id: number; // Identificador del item
    cate_Id: number; // ID de la categoría del item
    item_Descripcion:string;
    item_Estado: boolean; // Estado del item
    item_Creacion: number; // Usuario que creó el registro del item
    item_FechaCreacion: string; // Fecha de creación del registro del item
    item_Modifica: number; // Usuario que modificó el registro del item
    item_FechaModifica: string; // Fecha de modificación del registro del item

}

