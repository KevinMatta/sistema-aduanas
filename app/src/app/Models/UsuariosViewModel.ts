export class Usuario {
  Id: number;
  Usuario: string;
  Clave?: string;
  rol_Id?: number;
  Rol?: string;
  Admin: boolean;
  Estado: boolean;
  Actions?: string;
  usua_Creacion?: number;
  usua_FechaCreacion?: string;
  usua_Modifica?: number;
  usua_FechaModifica?: string;
  Creacion?: string;
  Modifica?: string;
}
