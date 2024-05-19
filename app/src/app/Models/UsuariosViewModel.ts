export class Usuario {
  Id: number;
  Usuario: string;
  Clave?: string;
  rol_Id?: number;
  Rol?: string;
  empl_Id?: number;
  DNI?: string;
  Empleado?: string;
  EsAdmin?: boolean;
  Admin: string;
  Actions?: string;
  usua_Creacion?: number;
  usua_FechaCreacion?: string;
  usua_Modifica?: number;
  usua_FechaModifica?: string;
  Creacion?: string;
  Modifica?: string;
  token?: string;
  _Activo?: boolean;
}
