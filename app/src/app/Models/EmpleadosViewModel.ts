export class Empleado {
  Id: number;
  DNI: string;
  Empleado: string;
  Sexo: string;
  Email: string;
  ["Estado Civil"]: string;
  Empresa: string;
  _Usuarios?: string[];
  _Activo?: boolean;
  empl_Creacion?: number;
  empl_FechaCreacion?: string;
  empl_Modifica?: number;
  empl_FechaModifica?: string;
  Creacion?: string;
  Modifica?: string;
}
