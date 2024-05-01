CREATE OR ALTER   PROCEDURE [Acce].[sp_Usuarios_listar]
AS
BEGIN
    SELECT usua.[Usua_Id],
           usua.[Usua_Usuario],
           usua.[Rol_Id],
           rol.Rol_Descripcion,
           usua.[Usua_IsAdmin],
           usua.[Usua_Estado],
           usua.[Usua_Creacion],
           usua1.Usua_Usuario as Creacion,
           usua.[Usua_FechaCreacion],
           usua.[Usua_Modifica],
           usua2.Usua_Usuario as Modifica,
           usua.[Usua_FechaModifica]
    FROM [Acce].[tbUsuarios] usua
    JOIN Acce.tbRoles rol ON usua.Rol_Id = rol.Rol_Id
    JOIN [Acce].[tbUsuarios] usua1 on usua.Usua_Id = usua1.Usua_Creacion
    LEFT JOIN [Acce].[tbUsuarios] usua2 on usua.Usua_Id = usua2.Usua_Modifica
    WHERE usua.Usua_Estado = 1
END;
GO

CREATE OR ALTER PROCEDURE Acce.sp_Roles_listar
AS
BEGIN
    SELECT rol.[Rol_Id],
           rol.[Rol_Descripcion],
           rol.[Rol_Estado],
           rol.[Rol_Creacion],
           rol1.Usua_Usuario AS Creacion,
           rol.[Rol_FechaCreacion],
           rol.[Rol_Modifica],
           rol2.Usua_Usuario AS Modifica,
           rol.[Rol_FechaModifica]
    FROM [Acce].[tbRoles] rol
    LEFT JOIN [Acce].[tbUsuarios] rol1 ON rol.Rol_Creacion = rol1.Usua_Id
    LEFT JOIN [Acce].[tbUsuarios] rol2 ON rol.Rol_Modifica = rol2.Usua_Id
	WHERE rol.Rol_Estado = 1
END;
GO

CREATE OR ALTER PROCEDURE Acce.sp_Pantallas_listar
AS
BEGIN
    SELECT pant.[Pant_Id],
           pant.[Pant_Descripcion],
           pant.[Pant_Estado],
           pant.[Pant_Creacion],
           usua1.Usua_Usuario AS Creacion,
           pant.[Pant_FechaCreacion],
           pant.[Pant_Modifica],
           usua2.Usua_Usuario AS Modifica,
           pant.[Pant_FechaModifica]
    FROM [Acce].[tbPantallas] pant
    LEFT JOIN [Acce].[tbUsuarios] usua1 ON pant.Pant_Creacion = usua1.Usua_Id
    LEFT JOIN [Acce].[tbUsuarios] usua2 ON pant.Pant_Modifica = usua2.Usua_Id
	WHERE pant.Pant_Estado = 1
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_Paises_listar
AS
BEGIN
    SELECT pais.[Pais_Id],
           pais.[Pais_Descripcion],
           pais.[Pais_Estado],
           pais.[Pais_Creacion],
           usua1.Usua_Usuario AS Creacion,
           pais.[Pais_FechaCreacion],
           pais.[Pais_Modifica],
           usua2.Usua_Usuario AS Modifica,
           pais.[Pais_FechaModifica]
    FROM [Gral].[tbPaises] pais
    LEFT JOIN [Acce].[tbUsuarios] usua1 ON pais.Pais_Creacion = usua1.Usua_Id
    LEFT JOIN [Acce].[tbUsuarios] usua2 ON pais.Pais_Modifica = usua2.Usua_Id
    WHERE pais.Pais_Estado = 1;
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_Estados_listar
AS
BEGIN
    SELECT esta.[Esta_Id],
           esta.[Esta_Descripcion],
           esta.[Pais_Id],
		   pais.Pais_Descripcion,
           esta.[Esta_Estado],
           esta.[Esta_Creacion],
           usua1.Usua_Usuario AS Creacion,
           esta.[Esta_FechaCreacion],
           esta.[Esta_Modifica],
           usua2.Usua_Usuario AS Modifica,
           esta.[Esta_FechaModifica]
    FROM [Gral].[tbEstados] esta
	JOIN Gral.tbPaises pais ON esta.Pais_Id = pais.Pais_Id
    LEFT JOIN [Acce].[tbUsuarios] usua1 ON esta.Esta_Creacion = usua1.Usua_Id
    LEFT JOIN [Acce].[tbUsuarios] usua2 ON esta.Esta_Modifica = usua2.Usua_Id
    WHERE esta.Esta_Estado = 1;
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_Ciudades_listar
AS
BEGIN
    SELECT ciud.[Ciud_Id],
           ciud.[Ciud_Descripcion],
           ciud.[Esta_Id],
		   esta.Esta_Descripcion,
           ciud.[Ciud_Estado],
           ciud.[Ciud_Creacion],
           usua1.Usua_Usuario AS Creacion,
           ciud.[Ciud_FechaCreacion],
           ciud.[Ciud_Modifica],
           usua2.Usua_Usuario AS Modifica,
           ciud.[Ciud_FechaModifica]
    FROM [Gral].[tbCiudades] ciud
	JOIN Gral.tbEstados esta ON ciud.Esta_Id = esta.Esta_Id
    LEFT JOIN [Acce].[tbUsuarios] usua1 ON ciud.Ciud_Creacion = usua1.Usua_Id
    LEFT JOIN [Acce].[tbUsuarios] usua2 ON ciud.Ciud_Modifica = usua2.Usua_Id
    WHERE ciud.Ciud_Estado = 1;
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_Empresas_listar
AS
BEGIN
    SELECT empr.[Empr_Id],
           empr.[Empr_Descripcion],
           empr.[Empr_Estado],
           empr.[Empr_Creacion],
           usua1.Usua_Usuario AS Creacion,
           empr.[Empr_FechaCreacion],
           empr.[Empr_Modifica],
           usua2.Usua_Usuario AS Modifica,
           empr.[Empr_FechaModifica]
    FROM [Gral].[tbEmpresas] empr
    LEFT JOIN [Acce].[tbUsuarios] usua1 ON empr.Empr_Creacion = usua1.Usua_Id
    LEFT JOIN [Acce].[tbUsuarios] usua2 ON empr.Empr_Modifica = usua2.Usua_Id
    WHERE empr.Empr_Estado = 1;
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_EstadosCiviles_listar
AS
BEGIN
    SELECT EsCi_Id,
           EsCi_Descripcion,
           EsCi_Estado,
           EsCi_Creacion,
           usua1.Usua_Usuario AS Creacion,
           EsCi_FechaCreacion,
           EsCi_Modifica,
           usua2.Usua_Usuario AS Modifica,
           EsCi_FechaModifica
    FROM Gral.tbEstadosCiviles AS ec
    LEFT JOIN Acce.tbUsuarios AS usua1 ON ec.EsCi_Creacion = usua1.Usua_Id
    LEFT JOIN Acce.tbUsuarios AS usua2 ON ec.EsCi_Modifica = usua2.Usua_Id
    WHERE EsCi_Estado = 1;
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_Empleados_listar
AS
BEGIN
    SELECT emp.[Empl_Id],
           emp.[Empl_Rtn],
           emp.[Empl_PrimerNombre],
           emp.[Empl_PrimerApellido],
           emp.[Empl_Sexo],
           emp.[Usua_Id],
		   usua3.Usua_Usuario,
           emp.[EsCi_Id],
		   esci.EsCi_Descripcion,
           emp.[Empr_Id],
		   empr.Empr_Descripcion,
           emp.[Empl_Estado],
           emp.[Empl_Creacion],
           usua1.Usua_Usuario AS Creacion,
           emp.[Empl_FechaCreacion],
           emp.[Empl_Modifica],
           usua2.Usua_Usuario AS Modifica,
           emp.[Empl_FechaModifica]
    FROM [Gral].[tbEmpleados] emp
	JOIN Gral.tbEstadosCiviles esci ON emp.EsCi_Id = esci.EsCi_Id
	JOIN Acce.tbUsuarios usua3 ON emp.Usua_Id = usua3.Usua_Id
	JOIN Gral.tbEmpresas empr ON emp.Empr_Id = empr.Empr_Id
    LEFT JOIN [Acce].[tbUsuarios] usua1 ON emp.Empl_Creacion = usua1.Usua_Id
    LEFT JOIN [Acce].[tbUsuarios] usua2 ON emp.Empl_Modifica = usua2.Usua_Id
    WHERE emp.Empl_Estado = 1;
END;
GO

CREATE OR ALTER PROCEDURE Adua.sp_Aduanas_listar
AS
BEGIN
    SELECT adu.[Adua_Id],
           adu.[Adua_Descripcion],
           adu.[Adua_Estado],
           adu.[Adua_Creacion],
           usua1.Usua_Usuario AS Creacion,
           adu.[Adua_FechaCreacion],
           adu.[Adua_Modifica],
           usua2.Usua_Usuario AS Modifica,
           adu.[Adua_FechaModifica]
    FROM [Adua].[tbAduanas] adu
    LEFT JOIN [Acce].[tbUsuarios] usua1 ON adu.Adua_Creacion = usua1.Usua_Id
    LEFT JOIN [Acce].[tbUsuarios] usua2 ON adu.Adua_Modifica = usua2.Usua_Id
    WHERE adu.Adua_Estado = 1;
END;
