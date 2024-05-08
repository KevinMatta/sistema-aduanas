CREATE DATABASE dbAduana
GO
USE dbAduana
GO
CREATE SCHEMA [Acce]
GO

CREATE SCHEMA [Gral]
GO

CREATE SCHEMA [Adua]
GO

CREATE TABLE [Acce].[tbUsuarios] (
  [Usua_Id] int PRIMARY KEY IDENTITY(1, 1),
  [Usua_Usuario] varchar(50) NOT NULL,
  [Usua_Clave] varbinary(max) NOT NULL,
  [Rol_Id] int,
  [Usua_IsAdmin] bit,
  [Usua_Estado] bit DEFAULT (1),
  [Usua_Creacion] int NOT NULL,
  [Usua_FechaCreacion] datetime NOT NULL,
  [Usua_Modifica] int,
  [Usua_FechaModifica] datetime
)
GO

CREATE TABLE [Acce].[tbRoles] (
  [Rol_Id] int PRIMARY KEY IDENTITY(1, 1),
  [Rol_Descripcion] varchar(50) NOT NULL,
  [Rol_Estado] bit DEFAULT (1),
  [Rol_Creacion] int NOT NULL,
  [Rol_FechaCreacion] datetime NOT NULL,
  [Rol_Modifica] int,
  [Rol_FechaModifica] datetime
)
GO

CREATE TABLE [Acce].[tbPantallas] (
  [Pant_Id] int PRIMARY KEY IDENTITY(1, 1),
  [Pant_Descripcion] varchar(50) NOT NULL,
  [Pant_Estado] bit DEFAULT (1),
  [Pant_Creacion] int NOT NULL,
  [Pant_FechaCreacion] datetime NOT NULL,
  [Pant_Modifica] int,
  [Pant_FechaModifica] datetime
)
GO

CREATE TABLE [Acce].[tbPantallasPorRoles] (
  [PaRo_Id] int PRIMARY KEY IDENTITY(1, 1),
  [Pant_Id] int NOT NULL,
  [Rol_Id] int NOT NULL,
  [PaRo_Estado] bit DEFAULT (1),
  [PaRo_Creacion] int NOT NULL,
  [PaRo_FechaCreacion] datetime NOT NULL,
  [PaRo_Modifica] int,
  [PaRo_FechaModifica] datetime
)
GO

CREATE TABLE [Gral].[tbPaises] (
  [Pais_Id] int PRIMARY KEY IDENTITY(1, 1),
  [Pais_Descripcion] varchar(50) NOT NULL,
  [Pais_Estado] bit DEFAULT (1),
  [Pais_Creacion] int NOT NULL,
  [Pais_FechaCreacion] datetime NOT NULL,
  [Pais_Modifica] int,
  [Pais_FechaModifica] datetime
)
GO

CREATE TABLE [Gral].[tbEstados] (
  [Esta_Id] int PRIMARY KEY IDENTITY(1, 1),
  [Esta_Descripcion] varchar(50) NOT NULL,
  [Pais_Id] int,
  [Esta_Estado] bit DEFAULT (1),
  [Esta_Creacion] int NOT NULL,
  [Esta_FechaCreacion] datetime NOT NULL,
  [Esta_Modifica] int,
  [Esta_FechaModifica] datetime
)
GO

CREATE TABLE [Gral].[tbCiudades] (
  [Ciud_Id] int PRIMARY KEY IDENTITY(1, 1),
  [Ciud_Descripcion] varchar(50) NOT NULL,
  [Esta_Id] int NOT NULL,
  [Ciud_Estado] bit DEFAULT (1),
  [Ciud_Creacion] int NOT NULL,
  [Ciud_FechaCreacion] datetime NOT NULL,
  [Ciud_Modifica] int,
  [Ciud_FechaModifica] datetime
)
GO

CREATE TABLE [Gral].[tbEmpresas] (
  [Empr_Id] int PRIMARY KEY IDENTITY(1, 1),
  [Empr_Descripcion] varchar(50) NOT NULL,
  [Empr_Estado] bit DEFAULT (1),
  [Empr_Creacion] int NOT NULL,
  [Empr_FechaCreacion] datetime NOT NULL,
  [Empr_Modifica] int,
  [Empr_FechaModifica] datetime
)
GO

CREATE TABLE [Gral].[tbEstadosCiviles] (
  [EsCi_Id] int PRIMARY KEY IDENTITY(1, 1),
  [EsCi_Descripcion] varchar(50) NOT NULL,
  [EsCi_Estado] bit DEFAULT (1),
  [EsCi_Creacion] int NOT NULL,
  [EsCi_FechaCreacion] datetime NOT NULL,
  [EsCi_Modifica] int,
  [EsCi_FechaModifica] datetime
)
GO

CREATE TABLE [Gral].[tbEmpleados] (
  [Empl_Id] int PRIMARY KEY IDENTITY(1, 1),
  [Empl_Rtn] varchar(50) UNIQUE NOT NULL,
  [Empl_PrimerNombre] varchar(50) NOT NULL,
  [Empl_PrimerApellido] varchar(50) NOT NULL,
  [Empl_Sexo] char(1),
  [Usua_Id] int NOT NULL,
  [EsCi_Id] int NOT NULL,
  [Empr_Id] int NOT NULL,
  [Empl_Estado] bit DEFAULT (1),
  [Empl_Creacion] int NOT NULL,
  [Empl_FechaCreacion] datetime NOT NULL,
  [Empl_Modifica] int,
  [Empl_FechaModifica] datetime
)
GO

CREATE TABLE [Adua].[tbAduanas] (
  [Adua_Id] int PRIMARY KEY IDENTITY(1, 1),
  [Adua_Descripcion] varchar(50) NOT NULL,
  Ciud_Id int,
  [Adua_Estado] bit DEFAULT (1),
  [Adua_Creacion] int NOT NULL,
  [Adua_FechaCreacion] datetime NOT NULL,
  [Adua_Modifica] int,
  [Adua_FechaModifica] datetime
)
GO

--tablas extras
CREATE TABLE Gral.tbProfesiones (
  Prof_Id int PRIMARY KEY IDENTITY(1, 1),
  Prof_Descripcion varchar(50) NOT NULL,
  Prof_Estado bit default 1,
  Prof_Creacion int NOT NULL,
  Prof_FechaCreacion datetime NOT NULL,
  Prof_Modifica int,
  Prof_FechaModifica datetime
);
GO

CREATE TABLE Gral.tbOficinas (
  Ofic_Id int PRIMARY KEY IDENTITY(1, 1),
  Ofic_Descripcion varchar(100) NOT NULL,
  Adua_Id int NOT NULL,
  Ofic_Estado bit default 1,
  Ofic_Creacion int NOT NULL,
  Ofic_FechaCreacion datetime NOT NULL,
  Ofic_Modifica int,
  Ofic_FechaModifica datetime
);
GO

CREATE TABLE Gral.tbPersonasNaturales (
  PeNa_Id int PRIMARY KEY IDENTITY(1, 1),
  PeNa_Nombre varchar(50) NOT NULL,
  PeNa_Apellido varchar(50) NOT NULL,
  PeNa_Rtn varchar(50) NOT NULL,
  PeNa_RtnUrlPdf varchar(50),
  PeNa_DNI varchar(50) NOT NULL,
  PeNa_DNIurlPdf varchar(50),
  PeNa_NumReciboPublico varchar(50) NOT NULL,
  PeNa_NumReciboPublicoUrlPdf varchar(50),
  Ofic_Id int NOT NULL,
  EsCi_Id int NOT NULL,
  Prof_Id int NOT NULL,
  Ciud_Id int NOT NULL,
  PeNa_Direccion varchar(50) NOT NULL,
  PeNa_TelefonoFijo varchar(50),
  PeNa_TelefonoCelular varchar(50),
  PeNa_Correo varchar(50),
  PeNa_CodigoCorreo varchar(50),
  PeNa_CorreoAlternativa varchar(50),
  PeNa_CodigoCorreoAlternativa varchar(50),
  PeNa_Estado bit default 1,
  PeNa_Creacion int NOT NULL,
  PeNa_FechaCreacion datetime NOT NULL,
  PeNa_Modifica int,
  PeNa_FechaModifica datetime
);
GO

CREATE TABLE Gral.tbComerciantesIndividuales (
  CoIn_Id int PRIMARY KEY IDENTITY(1, 1),
  CoIn_RtnSolicitante varchar(50) NOT NULL,
  PeNa_Id INT NOT NULL,
  CoIn_Aldea varchar(50),
  CoIn_CalleYavenida varchar(50),
  CoIn_BarrioOcolonia varchar(50) NOT NULL,
  CoIn_EdificioYnum varchar(50) NOT NULL,
  CoIn_PuntosDeReferencia varchar(50),
  CoIn_Declaracion varchar(50) NOT NULL,
  CoIn_RepresentanteLegal bit,

  --opcionales
  EsCi_RepresentanteLegal int,
  Prof_RepresentanteLegal int,
  Ciud_RepresentanteLegal int,
  CoIn_AldeaRepresentanteLegal varchar(50),
  CoIn_CalleYavenidaRepresentanteLegal varchar(50),
  CoIn_BarrioOcoloniaRepresentanteLegal varchar(50),
  CoIn_EdificioYnumRepresentanteLegal varchar(50),
  CoIn_PuntosDeReferenciaRepresentanteLegal varchar(50),
  CoIn_RtnRepresentanteLegal varchar(50),
  CoIn_DNIRepresentanteLegal varchar(50),

  --auditoria
  CoIn_Estado bit default 1,
  CoIn_Creacion int NOT NULL,
  CoIn_FechaCreacion datetime NOT NULL,
  CoIn_Modifica int,
  CoIn_FechaModifica datetime
);
GO

CREATE TABLE Gral.tbPersonasJuridicas (
  PeJu_Id int PRIMARY KEY IDENTITY(1, 1),
  PeJu_RtnSolicitante varchar(50) NOT NULL,
  PeJu_Aldea varchar(50),
  PeJu_CalleYavenida varchar(50),
  PeJu_BarrioOcolonia varchar(50) NOT NULL,
  PeJu_EdificioYnum varchar(50) NOT NULL,
  PeJu_PuntosDeReferencia varchar(50),
  PeJu_Escritura varchar(50),
  PeNa_Id INT NOT NULL,

  --opcionales
  EsCi_RepresentanteLegal int,
  Prof_RepresentanteLegal int,
  Ciud_RepresentanteLegal int,
  PeJu_AldeaRepresentanteLegal varchar(50),
  PeJu_CalleYavenidaRepresentanteLegal varchar(50),
  PeJu_BarrioOcoloniaRepresentanteLegal varchar(50),
  PeJu_EdificioYnumRepresentanteLegal varchar(50),
  PeJu_PuntosDeReferenciaRepresentanteLegal varchar(50),
  PeJu_RtnRepresentanteLegal varchar(50),
  PeJu_DNIRepresentanteLegal varchar(50),

  --PeJu_Rtn varchar(50),
  --auditoria
  PeJu_Estado bit default 1,
  PeJu_Creacion int NOT NULL,
  PeJu_FechaCreacion datetime NOT NULL,
  PeJu_Modifica int,
  PeJu_FechaModifica datetime
);
GO

--INSERTS PARA QUE FUNCIONE LA BASE DE DATOS
INSERT INTO Gral.tbPaises (Pais_Descripcion, Pais_Creacion, Pais_FechaCreacion)
VALUES 
('Honduras', 1, '2024-04-30T08:00:00'),
('Brasil', 1, '2024-04-29T12:30:00'),
('Chile', 1, '2024-04-28T09:15:00'),
('Colombia', 1, '2024-04-27T11:00:00'),
('Peru', 1, '2024-04-26T14:45:00'),
('Mexico', 1, '2024-04-25T16:30:00'),
('Italia', 1, '2024-04-24T17:20:00'),
('Estados Unidos', 1, '2024-04-23T18:00:00'),
('Canada', 1, '2024-04-22T19:30:00'),
('Francia', 1, '2024-04-21T20:45:00');
GO

INSERT INTO [Gral].[tbEstados] ([Esta_Descripcion], [Pais_Id], [Esta_Creacion], [Esta_FechaCreacion])
VALUES 
('Copan', 1,  1, GETDATE()),
('Colon', 1, 1,  GETDATE()),
('Choluteca', 1, 1, GETDATE()),
('Gracias a Dios', 1, 1, GETDATE()),
('Intibuca', 1, 1, GETDATE()),
('Cortes', 1, 1, GETDATE()),
('Francisco Morazan', 1, 1, GETDATE());
GO

INSERT INTO [Gral].[tbCiudades] ([Ciud_Descripcion], [Esta_Id], [Ciud_Creacion], [Ciud_FechaCreacion])
VALUES
('Santa Rosa de Copan', 1, 1, GETDATE()),
('trujillo', 2, 1, GETDATE()),
('Choluteca', 3, 1, GETDATE()),
('Puerto Lempira', 4, 1, GETDATE()),
('La Esperanza', 5, 1, GETDATE()),
('San Pedro Sula', 6, 1, GETDATE()),
('Tegucigalpa', 7, 1, GETDATE());
GO

INSERT INTO Gral.tbEstadosCiviles (EsCi_Descripcion, EsCi_Creacion, EsCi_FechaCreacion)
VALUES  ('Soltero(a)', 1, getdate()),
		('Casado(a)', 1, getdate()),
		('Divorciado(a)', 1, getdate()),
		('Viudo(a)', 1, getdate()),
		('Union libre', 1, getdate());
GO

INSERT INTO [Acce].[tbRoles] ([Rol_Descripcion], [Rol_Creacion], [Rol_FechaCreacion])
VALUES 
('Editor', 1, '2024-04-28T09:15:00'),
('Supervisor', 1, '2024-04-27T11:00:00'),
('Auditor', 1, '2024-04-26T14:45:00');
GO

INSERT INTO [Acce].[tbPantallas] ([Pant_Descripcion], [Pant_Creacion], [Pant_FechaCreacion])
VALUES 
('Usuarios', 1, GETDATE()),
('Roles', 1, GETDATE()),
('Paises', 1, GETDATE()),
('Estados', 1, GETDATE()),
('Ciudades', 1, GETDATE()),
('Empresas', 1, GETDATE()),
('Aduanas', 1, GETDATE()),
('Estados Civiles', 1, GETDATE()),
('Empleados', 1, GETDATE());
GO

INSERT INTO [Gral].[tbEmpresas] ([Empr_Descripcion], [Empr_Creacion], [Empr_FechaCreacion])
VALUES 
('Empresa Aduanera Honduras S.A. de C.V.', 1, '2024-04-30T08:00:00'),
('Aduanas y Logística de Honduras S.A.', 1, '2024-04-29T12:30:00'),
('Transaduanas de Honduras', 1, '2024-04-28T09:15:00'),
('Agencia Aduanera Hondureña', 1, '2024-04-27T11:00:00'),
('Servicio Aduanero de Honduras', 1, '2024-04-26T14:45:00');
GO

INSERT INTO [Adua].[tbAduanas] ([Adua_Descripcion], [Adua_Creacion], [Adua_FechaCreacion])
VALUES 
('Aduana de Puerto Cortes', 1, '2024-04-30T08:00:00'),
('Aduana de San Lorenzo', 1, '2024-04-29T12:30:00'),
('Aduana de Aguan', 1, '2024-04-28T09:15:00'),
('Aduana de Guasaule', 1, '2024-04-27T11:00:00'),
('Aduana de El Florido', 1, '2024-04-26T14:45:00');
GO

INSERT INTO Acce.tbUsuarios (Usua_Usuario, Usua_Clave, Usua_IsAdmin, Usua_Creacion, Usua_FechaCreacion)
VALUES  ('kevin', HASHBYTES('SHA2_512', 'kevin'), 1, 1, getdate()),
		('victor', HASHBYTES('SHA2_512', '123'), 1, 1, getdate());
GO

INSERT INTO [Gral].[tbEmpleados] ([Empl_Rtn], [Empl_PrimerNombre], [Empl_PrimerApellido], [Empl_Sexo], [Usua_Id], [EsCi_Id], [Empr_Id], [EmpL_Creacion], [EmpL_FechaCreacion])
VALUES 
('0501200120525', 'Kevin', 'Mata', 'M', 1, 1, 1, 1, '2024-04-30T08:00:00'),
('0101199800005', 'Victor', 'Espinoza', 'M', 2, 2, 1, 1, '2024-04-26T14:45:00');


ALTER TABLE [Gral].[tbCiudades] ADD FOREIGN KEY ([Esta_Id]) REFERENCES [Gral].[tbEstados] ([Esta_Id])
GO

ALTER TABLE [Gral].[tbEmpleados] ADD FOREIGN KEY ([EsCi_Id]) REFERENCES [Gral].[tbEstadosCiviles] ([EsCi_Id])
GO

ALTER TABLE [Gral].[tbEmpleados] ADD FOREIGN KEY ([Usua_Id]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Acce].[tbUsuarios] ADD FOREIGN KEY ([Rol_Id]) REFERENCES [Acce].[tbRoles] ([Rol_Id])
GO

ALTER TABLE [Acce].[tbPantallasPorRoles] ADD FOREIGN KEY ([Pant_Id]) REFERENCES [Acce].[tbPantallas] ([Pant_Id])
GO

ALTER TABLE [Acce].[tbPantallasPorRoles] ADD FOREIGN KEY ([Rol_Id]) REFERENCES [Acce].[tbRoles] ([Rol_Id])
GO

ALTER TABLE [Acce].[tbUsuarios] ADD FOREIGN KEY ([Usua_Creacion]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Acce].[tbUsuarios] ADD FOREIGN KEY ([Usua_Modifica]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Acce].[tbRoles] ADD FOREIGN KEY ([Rol_Creacion]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Acce].[tbRoles] ADD FOREIGN KEY ([Rol_Modifica]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Acce].[tbPantallas] ADD FOREIGN KEY ([Pant_Creacion]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Acce].[tbPantallas] ADD FOREIGN KEY ([Pant_Modifica]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Acce].[tbPantallasPorRoles] ADD FOREIGN KEY ([PaRo_Creacion]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Acce].[tbPantallasPorRoles] ADD FOREIGN KEY ([PaRo_Modifica]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbEstados] ADD FOREIGN KEY ([Esta_Creacion]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbEstados] ADD FOREIGN KEY ([Esta_Modifica]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbCiudades] ADD FOREIGN KEY ([Ciud_Creacion]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbCiudades] ADD FOREIGN KEY ([Ciud_Modifica]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbEstadosCiviles] ADD FOREIGN KEY ([EsCi_Creacion]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbEstadosCiviles] ADD FOREIGN KEY ([EsCi_Modifica]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbEmpleados] ADD FOREIGN KEY ([Empl_Creacion]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbEmpleados] ADD FOREIGN KEY ([Empl_Modifica]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Adua].[tbAduanas] ADD FOREIGN KEY ([Ciud_Id]) REFERENCES [Gral].[tbCiudades] ([Ciud_Id])
GO

ALTER TABLE [Adua].[tbAduanas] ADD FOREIGN KEY ([Adua_Creacion]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Adua].[tbAduanas] ADD FOREIGN KEY ([Adua_Modifica]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbEmpresas] ADD FOREIGN KEY ([Empr_Creacion]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbEmpresas] ADD FOREIGN KEY ([Empr_Modifica]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbPaises] ADD FOREIGN KEY ([Pais_Creacion]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbPaises] ADD FOREIGN KEY ([Pais_Modifica]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbEmpleados] ADD FOREIGN KEY ([Empr_Id]) REFERENCES [Gral].[tbEmpresas] ([Empr_Id])
GO

ALTER TABLE [Gral].[tbEstados] ADD FOREIGN KEY ([Pais_Id]) REFERENCES [Gral].[tbPaises] ([Pais_Id])
GO

--relaciones extra
ALTER TABLE [Gral].[tbProfesiones] ADD FOREIGN KEY ([Prof_Creacion]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbProfesiones] ADD FOREIGN KEY ([Prof_Modifica]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbOficinas] ADD FOREIGN KEY ([Ofic_Creacion]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbOficinas] ADD FOREIGN KEY ([Ofic_Modifica]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbOficinas] ADD FOREIGN KEY ([Adua_Id]) REFERENCES [Adua].[tbAduanas] ([Adua_Id])
GO

ALTER TABLE [Gral].[tbPersonasNaturales] ADD FOREIGN KEY ([PeNa_Creacion]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbPersonasNaturales] ADD FOREIGN KEY ([PeNa_Modifica]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbPersonasNaturales] ADD FOREIGN KEY ([EsCi_Id]) REFERENCES [Gral].[tbEstadosCiviles] ([EsCi_Id])
GO

ALTER TABLE [Gral].[tbPersonasNaturales] ADD FOREIGN KEY ([Ofic_Id]) REFERENCES [Gral].[tbOficinas] ([Ofic_Id])
GO

ALTER TABLE [Gral].[tbPersonasNaturales] ADD FOREIGN KEY ([Ciud_Id]) REFERENCES [Gral].[tbCiudades] ([Ciud_Id])
GO

ALTER TABLE [Gral].[tbPersonasNaturales] ADD FOREIGN KEY ([Prof_Id]) REFERENCES [Gral].[tbProfesiones] ([Prof_Id])
GO

ALTER TABLE [Gral].[tbComerciantesIndividuales] ADD FOREIGN KEY ([PeNa_Id]) REFERENCES [Gral].[tbPersonasNaturales] ([PeNa_Id])
GO

ALTER TABLE [Gral].[tbComerciantesIndividuales] ADD FOREIGN KEY ([EsCi_RepresentanteLegal]) REFERENCES [Gral].[tbEstadosCiviles] ([EsCi_Id])
GO

ALTER TABLE [Gral].[tbComerciantesIndividuales] ADD FOREIGN KEY ([Ciud_RepresentanteLegal]) REFERENCES [Gral].[tbCiudades] ([Ciud_Id])
GO

ALTER TABLE [Gral].[tbComerciantesIndividuales] ADD FOREIGN KEY ([Prof_RepresentanteLegal]) REFERENCES [Gral].[tbProfesiones] ([Prof_Id])
GO

ALTER TABLE [Gral].[tbComerciantesIndividuales] ADD FOREIGN KEY ([CoIn_Creacion]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbComerciantesIndividuales] ADD FOREIGN KEY ([CoIn_Modifica]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbPersonasJuridicas] ADD FOREIGN KEY ([PeNa_Id]) REFERENCES [Gral].[tbPersonasNaturales] ([PeNa_Id])
GO

ALTER TABLE [Gral].[tbPersonasJuridicas] ADD FOREIGN KEY ([EsCi_RepresentanteLegal]) REFERENCES [Gral].[tbEstadosCiviles] ([EsCi_Id])
GO

ALTER TABLE [Gral].[tbPersonasJuridicas] ADD FOREIGN KEY ([Prof_RepresentanteLegal]) REFERENCES [Gral].[tbProfesiones] ([Prof_Id])
GO

ALTER TABLE [Gral].[tbPersonasJuridicas] ADD FOREIGN KEY ([Ciud_RepresentanteLegal]) REFERENCES [Gral].[tbCiudades] ([Ciud_Id])
GO

ALTER TABLE [Gral].[tbPersonasJuridicas] ADD FOREIGN KEY ([PeJu_Creacion]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO

ALTER TABLE [Gral].[tbPersonasJuridicas] ADD FOREIGN KEY ([PeJu_Modifica]) REFERENCES [Acce].[tbUsuarios] ([Usua_Id])
GO