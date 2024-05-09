export class PersonaNatural {
    Id: number;
    RtnSolicitante: string;
    RtnSolicitanteUrl: string;
    DNI: string;
    DNIUrl: string;
    NumReciboPublico: string;
    NumReciboPublicoUrl: string;
    Aduana:string;
    adua_Id: number;
    Estado:string;
    esta_Id: number;
    Ciudad:string;
    ciud_Id: number;
    ['Estado Civil']:string;
    esCi_Id:string;
    DireccionCompleta: string;
    Usuario: string;
    Activo?: boolean;
    peNa_Creacion?: number;
    peNa_FechaCreacion?: string;
    peNa_Modifica?: number;
    peNa_FechaModifica?: string;
    Creacion?: string;
    Modifica?: string;
}