export class CategoriaViewModel {
    Cate_Id: number; // Identificador de la categoría
    Cate_Descripcion: string; // Descripción de la categoría
    Cate_Estado: boolean; // Estado de la categoría
    Cate_Creacion: number; // Usuario que creó la categoría
    Cate_FechaCreacion: string; // Fecha de creación de la categoría
    Cate_Modifica?: number; // Usuario que modificó la categoría
    Cate_FechaModifica?: string; // Fecha de modificación de la categoría
}