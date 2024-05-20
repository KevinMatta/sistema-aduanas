--LISTAR
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
    LEFT JOIN Acce.tbRoles rol ON usua.Rol_Id = rol.Rol_Id
    LEFT JOIN [Acce].[tbUsuarios] usua1 on usua1.Usua_Id = usua.Usua_Creacion
    LEFT JOIN [Acce].[tbUsuarios] usua2 on usua2.Usua_Id = usua.Usua_Modifica
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
		   adu.CIud_Id,
		   c.Ciud_Descripcion,
           adu.[Adua_Estado],
           adu.[Adua_Creacion],
           usua1.Usua_Usuario AS Creacion,
           adu.[Adua_FechaCreacion],
           adu.[Adua_Modifica],
           usua2.Usua_Usuario AS Modifica,
           adu.[Adua_FechaModifica]
    FROM [Adua].[tbAduanas] adu
	LEFT JOIN Gral.tbCiudades c ON c.Ciud_Id = adu.Ciud_Id
    LEFT JOIN [Acce].[tbUsuarios] usua1 ON adu.Adua_Creacion = usua1.Usua_Id
    LEFT JOIN [Acce].[tbUsuarios] usua2 ON adu.Adua_Modifica = usua2.Usua_Id
    WHERE adu.Adua_Estado = 1;
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_Profesiones_listar
AS
BEGIN
    SELECT 
        prof.Prof_Id, 
        prof.Prof_Descripcion, 
        prof.Prof_Estado, 
        prof.Prof_Creacion, 
        usua1.Usua_Usuario AS Creacion,
        prof.Prof_FechaCreacion, 
        prof.Prof_Modifica, 
        usua2.Usua_Usuario AS Modifica,
        prof.Prof_FechaModifica
    FROM Gral.tbProfesiones prof
    LEFT JOIN Acce.tbUsuarios usua1 ON prof.Prof_Creacion = usua1.Usua_Id
    LEFT JOIN Acce.tbUsuarios usua2 ON prof.Prof_Modifica = usua2.Usua_Id
    WHERE prof.Prof_Estado = 1;
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_Oficinas_listar
AS
BEGIN
    SELECT 
        ofi.Ofic_Id, 
        ofi.Ofic_Descripcion, 
		ofi.Adua_Id,
		adua.Adua_Descripcion,
        ofi.Ofic_Estado, 
        ofi.Ofic_Creacion, 
        usua1.Usua_Usuario AS Creacion,
        ofi.Ofic_FechaCreacion, 
        ofi.Ofic_Modifica, 
        usua2.Usua_Usuario AS Modifica,
        ofi.Ofic_FechaModifica
    FROM Gral.tbOficinas ofi
	LEFT JOIN Adua.tbAduanas adua ON ofi.Adua_Id = adua.Adua_Id
    LEFT JOIN Acce.tbUsuarios usua1 ON ofi.Ofic_Creacion = usua1.Usua_Id
    LEFT JOIN Acce.tbUsuarios usua2 ON ofi.Ofic_Modifica = usua2.Usua_Id
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_PersonasNaturales_listar
AS
BEGIN
    SELECT 
        PeNa_Id, 
        PeNa_Rtn, 
        PeNa_RtnUrlPdf, 
        PeNa_DNI, 
        PeNa_DNIurlPdf, 
        PeNa_NumReciboPublico, 
        PeNa_NumReciboPublicoUrlPdf, 
        pena.Ofic_Id,
		Ofic_Descripcion,
        esci.EsCi_Id,
		EsCi_Descripcion,
        pena.Prof_Id,
		Prof_Descripcion,
        Ciud_Id, 
        PeNa_Direccion, 
        PeNa_TelefonoFijo, 
        PeNa_TelefonoCelular, 
        PeNa_Correo, 
        PeNa_CodigoCorreo, 
        PeNa_CorreoAlternativa, 
        PeNa_CodigoCorreoAlternativa, 
        PeNa_Estado, 
        PeNa_Creacion, 
        usua1.Usua_Usuario AS Creacion,
        PeNa_FechaCreacion, 
        PeNa_Modifica, 
        usua2.Usua_Usuario AS Modifica,
        PeNa_FechaModifica
    FROM Gral.tbPersonasNaturales pena
	LEFT JOIN Gral.tbProfesiones prof On pena.Prof_Id = prof.Prof_Id
	LEFT JOIN Gral.tbOficinas ofic ON pena.Ofic_Id = ofic.Ofic_Id
	LEFT JOIN Gral.tbEstadosCiviles esci ON esci.EsCi_Id = pena.EsCi_Id
    LEFT JOIN Acce.tbUsuarios usua1 ON pena.PeNa_Creacion = usua1.Usua_Id
    LEFT JOIN Acce.tbUsuarios usua2 ON pena.PeNa_Modifica = usua2.Usua_Id
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_ComerciantesIndividuales_listar
AS
BEGIN
    SELECT 
        CoIn_Id, 
        CoIn_RtnSolicitante, 
        com.PeNa_Id, 
		PeNa_Nombre,
		Pena_Apellido,
        PeNa_Rtn, 
        PeNa_DNI, 
        CoIn_Aldea, 
        CoIn_CalleYavenida, 
        CoIn_BarrioOcolonia, 
        CoIn_EdificioYnum, 
        CoIn_PuntosDeReferencia, 
        CoIn_Declaracion, 
        CoIn_RepresentanteLegal, 
        EsCi_RepresentanteLegal, 
		EsCi_Descripcion,
        Prof_RepresentanteLegal, 
		Prof_Descripcion,
        Ciud_RepresentanteLegal, 
		Ciud_Descripcion
        CoIn_AldeaRepresentanteLegal, 
        CoIn_CalleYavenidaRepresentanteLegal, 
        CoIn_BarrioOcoloniaRepresentanteLegal, 
        CoIn_EdificioYnumRepresentanteLegal, 
        CoIn_PuntosDeReferenciaRepresentanteLegal, 
        CoIn_RtnRepresentanteLegal, 
        CoIn_DNIRepresentanteLegal, 
        CoIn_Estado, 
        CoIn_Creacion, 
        usua1.Usua_Usuario AS Creacion,
        CoIn_FechaCreacion, 
        CoIn_Modifica, 
        usua2.Usua_Usuario AS Modifica,
        CoIn_FechaModifica
    FROM Gral.tbComerciantesIndividuales com
    LEFT JOIN Gral.tbPersonasNaturales pen ON com.PeNa_Id = pen.PeNa_Id
	LEFT JOIN Gral.tbEstadosCiviles esci ON esci.EsCi_Id = com.EsCi_RepresentanteLegal
	LEFT JOIN Gral.tbProfesiones prof ON prof.Prof_Id = com.Prof_RepresentanteLegal
	LEFT JOIN Gral.tbCiudades ciud ON com.Ciud_RepresentanteLegal = ciud.Ciud_Descripcion
    LEFT JOIN Acce.tbUsuarios usua1 ON com.CoIn_Creacion = usua1.Usua_Id
    LEFT JOIN Acce.tbUsuarios usua2 ON com.CoIn_Modifica = usua2.Usua_Id
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_PersonasJuridicas_listar
AS
BEGIN
    SELECT 
        PeJu_Id, 
        PeJu_RtnSolicitante,
		pej.PeNa_Id,
		PeNa_Nombre,
		Pena_Apellido,
        PeJu_Aldea, 
        PeJu_CalleYavenida, 
        PeJu_BarrioOcolonia, 
        PeJu_EdificioYnum, 
        PeJu_PuntosDeReferencia, 
        PeJu_Escritura, 
        pen.PeNa_Rtn, 
        pen.PeNa_DNI, 
        EsCi_RepresentanteLegal, 
        Prof_RepresentanteLegal, 
        Ciud_RepresentanteLegal, 
        PeJu_AldeaRepresentanteLegal, 
        PeJu_CalleYavenidaRepresentanteLegal, 
        PeJu_BarrioOcoloniaRepresentanteLegal, 
        PeJu_EdificioYnumRepresentanteLegal, 
        PeJu_PuntosDeReferenciaRepresentanteLegal, 
        PeJu_RtnRepresentanteLegal, 
        PeJu_DNIRepresentanteLegal, 
        PeJu_Estado, 
        PeJu_Creacion, 
        usua1.Usua_Usuario AS Creacion,
        PeJu_FechaCreacion, 
        PeJu_Modifica, 
        usua2.Usua_Usuario AS Modifica,
        PeJu_FechaModifica
    FROM Gral.tbPersonasJuridicas pej
    LEFT JOIN Gral.tbPersonasNaturales pen ON pej.PeNa_Id = pen.PeNa_Id
	LEFT JOIN Gral.tbEstadosCiviles esci ON esci.EsCi_Id = pej.EsCi_RepresentanteLegal
	LEFT JOIN Gral.tbProfesiones prof ON prof.Prof_Id = pej.Prof_RepresentanteLegal
	LEFT JOIN Gral.tbCiudades ciud ON pej.Ciud_RepresentanteLegal = ciud.Ciud_Descripcion
    LEFT JOIN Acce.tbUsuarios usua1 ON pej.PeJu_Creacion = usua1.Usua_Id
    LEFT JOIN Acce.tbUsuarios usua2 ON pej.PeJu_Modifica = usua2.Usua_Id
END;
GO


--BUSCAR
CREATE OR ALTER PROCEDURE [Acce].[sp_Usuarios_buscar]
    @Usua_Id INT
AS
BEGIN
    SELECT 
        u.Usua_Id, 
        u.Usua_Usuario, 
        r.Rol_Descripcion,
        u.Usua_IsAdmin, 
        u.Usua_Estado, 
        u.Usua_Creacion, 
        cu.Usua_Usuario AS Creacion, 
        u.Usua_FechaCreacion, 
        u.Usua_Modifica, 
        mu.Usua_Usuario AS Modificacion, 
        u.Usua_FechaModifica
    FROM [Acce].[tbUsuarios] u
    LEFT JOIN [Acce].[tbRoles] r ON u.Rol_Id = r.Rol_Id
    LEFT JOIN [Acce].[tbUsuarios] cu ON u.Usua_Creacion = cu.Usua_Id
    LEFT JOIN [Acce].[tbUsuarios] mu ON u.Usua_Modifica = mu.Usua_Id
    WHERE u.Usua_Id = @Usua_Id;
END;
GO

CREATE OR ALTER PROCEDURE [Acce].[sp_Roles_buscar]
    @Rol_Id INT
AS
BEGIN
    SELECT 
		rol.Rol_Id, 
		Rol_Descripcion, 
		Rol_Creacion, 
		usua1.Usua_Usuario as Creacion,
		Rol_FechaCreacion, 
		Rol_Modifica, 
		usua2.Usua_Usuario as Modifica,
		Rol_FechaModifica
    FROM [Acce].[tbRoles] rol
	LEFT JOIN Acce.tbUsuarios usua1 ON rol.Rol_Creacion = usua1.Usua_Id
    LEFT JOIN Acce.tbUsuarios usua2 ON rol.Rol_Modifica = usua2.Usua_Id
    WHERE rol.Rol_Id = @Rol_Id AND Rol_Estado = 1;
END
GO

CREATE OR ALTER PROCEDURE [Acce].[sp_Pantallas_buscar]
    @Pant_Id INT
AS
BEGIN
    SELECT 
        Pant_Id, 
        Pant_Descripcion, 
        Pant_Estado, 
        Pant_Creacion, 
        usua1.Usua_Usuario AS Creacion,
        Pant_FechaCreacion, 
        Pant_Modifica, 
        usua2.Usua_Usuario AS Modifica,
        Pant_FechaModifica
    FROM [Acce].[tbPantallas]
    LEFT JOIN [Acce].[tbUsuarios] usua1 ON [Acce].[tbPantallas].Pant_Creacion = usua1.Usua_Id
    LEFT JOIN [Acce].[tbUsuarios] usua2 ON [Acce].[tbPantallas].Pant_Modifica = usua2.Usua_Id
    WHERE Pant_Id = @Pant_Id;
END;
GO


CREATE OR ALTER PROCEDURE [Gral].[sp_Paises_buscar]
    @Pais_Id INT
AS
BEGIN
    SELECT 
        Pais_Id, 
        Pais_Descripcion, 
        Pais_Estado, 
        Pais_Creacion, 
        usua1.Usua_Usuario AS Creacion,
        Pais_FechaCreacion, 
        Pais_Modifica, 
        usua2.Usua_Usuario AS Modifica,
        Pais_FechaModifica
    FROM [Gral].[tbPaises]
    LEFT JOIN [Acce].[tbUsuarios] usua1 ON [Gral].[tbPaises].Pais_Creacion = usua1.Usua_Id
    LEFT JOIN [Acce].[tbUsuarios] usua2 ON [Gral].[tbPaises].Pais_Modifica = usua2.Usua_Id
    WHERE Pais_Id = @Pais_Id;
END;
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_Estados_buscar]
    @Esta_Id INT
AS
BEGIN
    SELECT 
        Esta_Id, 
        Esta_Descripcion, 
        tbEstados.Pais_Id,
		p.Pais_Descripcion,
        Esta_Estado, 
        Esta_Creacion, 
        usua1.Usua_Usuario AS Creacion,
        Esta_FechaCreacion, 
        Esta_Modifica, 
        usua2.Usua_Usuario AS Modifica,
        Esta_FechaModifica
    FROM [Gral].[tbEstados] 
	LEFT JOIN Gral.tbPaises p On tbEstados.Pais_Id = p.Pais_Id
    LEFT JOIN [Acce].[tbUsuarios] usua1 ON [Gral].[tbEstados].Esta_Creacion = usua1.Usua_Id
    LEFT JOIN [Acce].[tbUsuarios] usua2 ON [Gral].[tbEstados].Esta_Modifica = usua2.Usua_Id
    WHERE Esta_Id = @Esta_Id;
END;
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_Ciudades_buscar]
    @Ciud_Id INT
AS
BEGIN
    SELECT 
        c.Ciud_Id, 
        c.Ciud_Descripcion, 
        c.Esta_Id, 
        e.Esta_Descripcion,
        c.Ciud_Estado, 
        c.Ciud_Creacion, 
        u1.Usua_Usuario AS Creacion,
        c.Ciud_FechaCreacion, 
        c.Ciud_Modifica, 
        u2.Usua_Usuario AS Modifica,
        c.Ciud_FechaModifica
    FROM [Gral].[tbCiudades] c
    LEFT JOIN [Gral].[tbEstados] e ON c.Esta_Id = e.Esta_Id
    LEFT JOIN [Acce].[tbUsuarios] u1 ON c.Ciud_Creacion = u1.Usua_Id
    LEFT JOIN [Acce].[tbUsuarios] u2 ON c.Ciud_Modifica = u2.Usua_Id
    WHERE c.Ciud_Id = @Ciud_Id;
END;
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_Empresas_buscar]
    @Empr_Id INT
AS
BEGIN
    SELECT 
        Empr_Id, 
        Empr_Descripcion, 
        Empr_Estado, 
        Empr_Creacion, 
        usua1.Usua_Usuario AS Creacion,
        Empr_FechaCreacion, 
        Empr_Modifica, 
        usua2.Usua_Usuario AS Modifica,
        Empr_FechaModifica
    FROM [Gral].[tbEmpresas]
    LEFT JOIN [Acce].[tbUsuarios] usua1 ON [Gral].[tbEmpresas].Empr_Creacion = usua1.Usua_Id
    LEFT JOIN [Acce].[tbUsuarios] usua2 ON [Gral].[tbEmpresas].Empr_Modifica = usua2.Usua_Id
    WHERE Empr_Id = @Empr_Id;
END;
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_EstadosCiviles_buscar]
    @EsCi_Id INT
AS
BEGIN
    SELECT 
        EsCi_Id, 
        EsCi_Descripcion, 
        EsCi_Estado, 
        EsCi_Creacion, 
        usua1.Usua_Usuario AS Creacion,
        EsCi_FechaCreacion, 
        EsCi_Modifica, 
        usua2.Usua_Usuario AS Modifica,
        EsCi_FechaModifica
    FROM [Gral].[tbEstadosCiviles]
    LEFT JOIN [Acce].[tbUsuarios] usua1 ON [Gral].[tbEstadosCiviles].EsCi_Creacion = usua1.Usua_Id
    LEFT JOIN [Acce].[tbUsuarios] usua2 ON [Gral].[tbEstadosCiviles].EsCi_Modifica = usua2.Usua_Id
    WHERE EsCi_Id = @EsCi_Id;
END;
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_Empleados_buscar]
    @Empl_Id INT
AS
BEGIN
    SELECT 
        Empl_Id, 
        Empl_Rtn, 
        Empl_PrimerNombre, 
        Empl_PrimerApellido, 
        Empl_Sexo, 
        emp.Usua_Id, 
        EsCi_Id, 
        emp.Empr_Id, 
		e.Empr_Descripcion,
        Empl_Estado, 
        Empl_Creacion, 
        usua1.Usua_Usuario AS Creacion,
        Empl_FechaCreacion, 
        Empl_Modifica, 
        usua2.Usua_Usuario AS Modifica,
        Empl_FechaModifica
    FROM [Gral].[tbEmpleados] emp
	LEFT JOIN [Gral].[tbEmpresas] e ON e.Empr_Id = emp.Empr_Id
    LEFT JOIN [Acce].[tbUsuarios] usua1 ON emp.Empl_Creacion = usua1.Usua_Id
    LEFT JOIN [Acce].[tbUsuarios] usua2 ON emp.Empl_Modifica = usua2.Usua_Id
    WHERE Empl_Id = @Empl_Id;
END;
GO

CREATE OR ALTER PROCEDURE [Adua].[sp_Aduanas_buscar]
    @Adua_Id INT
AS
BEGIN
    SELECT 
        Adua_Id, 
        Adua_Descripcion, 
		[Adua].[tbAduanas].Ciud_Id,
		c.Ciud_Descripcion,
        Adua_Estado, 
        Adua_Creacion, 
        usua1.Usua_Usuario AS Creacion,
        Adua_FechaCreacion, 
        Adua_Modifica, 
        usua2.Usua_Usuario AS Modifica,
        Adua_FechaModifica
    FROM [Adua].[tbAduanas]
	LEFT JOIN Gral.tbCiudades c ON c.Ciud_Id = [Adua].[tbAduanas].Ciud_Id
    LEFT JOIN [Acce].[tbUsuarios] usua1 ON [Adua].[tbAduanas].Adua_Creacion = usua1.Usua_Id
    LEFT JOIN [Acce].[tbUsuarios] usua2 ON [Adua].[tbAduanas].Adua_Modifica = usua2.Usua_Id
    WHERE Adua_Id = @Adua_Id;
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_Profesiones_buscar
    @Prof_Id INT
AS
BEGIN
    SELECT 
        Prof_Id, 
        Prof_Descripcion, 
        Prof_Estado, 
        Prof_Creacion, 
        usua1.Usua_Usuario AS Creacion,
        Prof_FechaCreacion, 
        Prof_Modifica, 
        usua2.Usua_Usuario AS Modifica,
        Prof_FechaModifica
    FROM Gral.tbProfesiones
    LEFT JOIN Acce.tbUsuarios usua1 ON Gral.tbProfesiones.Prof_Creacion = usua1.Usua_Id
    LEFT JOIN Acce.tbUsuarios usua2 ON Gral.tbProfesiones.Prof_Modifica = usua2.Usua_Id
    WHERE Prof_Id = @Prof_Id;
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_Oficinas_buscar
    @Ofic_Id INT
AS
BEGIN
    SELECT 
        Ofic_Id, 
        Ofic_Descripcion, 
        ofi.Adua_Id,
		a.Adua_Descripcion,
        Ofic_Estado, 
        Ofic_Creacion, 
        usua1.Usua_Usuario AS Creacion,
        Ofic_FechaCreacion, 
        Ofic_Modifica, 
        usua2.Usua_Usuario AS Modifica,
        Ofic_FechaModifica
    FROM Gral.tbOficinas ofi
	LEFT JOIN Adua.tbAduanas a ON a.Adua_Id = ofi.Adua_Id
    LEFT JOIN Acce.tbUsuarios usua1 ON ofi.Ofic_Creacion = usua1.Usua_Id
    LEFT JOIN Acce.tbUsuarios usua2 ON ofi.Ofic_Modifica = usua2.Usua_Id
    WHERE Ofic_Id = @Ofic_Id;
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_PersonasNaturales_buscar
    @PeNa_Id INT
AS
BEGIN
    SELECT 
        pn.PeNa_Id, 
        pn.PeNa_Nombre,
        pn.PeNa_Apellido,
        pn.PeNa_Rtn, 
        pn.PeNa_RtnUrlPdf, 
        pn.PeNa_DNI, 
        pn.PeNa_DNIurlPdf, 
        pn.PeNa_NumReciboPublico, 
        pn.PeNa_NumReciboPublicoUrlPdf, 
        pn.Ofic_Id,
        ofic.Ofic_Descripcion,
        pn.EsCi_Id,
        esci.EsCi_Descripcion,
        pn.Prof_Id,
        prof.Prof_Descripcion,
        pn.Ciud_Id, 
		Ciud_Descripcion,
        pn.PeNa_Direccion, 
        pn.PeNa_TelefonoFijo, 
        pn.PeNa_TelefonoCelular, 
        pn.PeNa_Correo, 
        pn.PeNa_CodigoCorreo, 
        pn.PeNa_CorreoAlternativa, 
        pn.PeNa_CodigoCorreoAlternativa, 
        pn.PeNa_Estado, 
        pn.PeNa_Creacion, 
        usua1.Usua_Usuario AS Creacion,
        pn.PeNa_FechaCreacion, 
        pn.PeNa_Modifica, 
        usua2.Usua_Usuario AS Modifica,
        pn.PeNa_FechaModifica
    FROM Gral.tbPersonasNaturales pn
    LEFT JOIN Acce.tbUsuarios usua1 ON pn.PeNa_Creacion = usua1.Usua_Id
    LEFT JOIN Acce.tbUsuarios usua2 ON pn.PeNa_Modifica = usua2.Usua_Id
    LEFT JOIN Gral.tbOficinas ofic ON pn.Ofic_Id = ofic.Ofic_Id
    LEFT JOIN Gral.tbEstadosCiviles esci ON pn.EsCi_Id = esci.EsCi_Id
    LEFT JOIN Gral.tbProfesiones prof ON pn.Prof_Id = prof.Prof_Id
    LEFT JOIN Gral.tbCiudades ciud ON pn.Ciud_Id = ciud.Ciud_Id
    WHERE pn.PeNa_Id = @PeNa_Id;
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_ComerciantesIndividuales_buscar
    @CoIn_Id INT
AS
BEGIN
    SELECT 
        ci.CoIn_Id,
        ci.CoIn_RtnSolicitante,
        ci.PeNa_Id,
        pn.PeNa_Nombre,
        pn.PeNa_Apellido,
		pn.PeNa_DNI, 
        pn.PeNa_DNIurlPdf, 
        pn.PeNa_NumReciboPublico, 
        pn.PeNa_NumReciboPublicoUrlPdf,
        ci.CoIn_Aldea,
        ci.CoIn_CalleYavenida,
        ci.CoIn_BarrioOcolonia,
        ci.CoIn_EdificioYnum,
        ci.CoIn_PuntosDeReferencia,
        ci.CoIn_Declaracion,
        ci.CoIn_RepresentanteLegal,
        ci.EsCi_RepresentanteLegal,
        esci.EsCi_Descripcion AS EsCi_DescripcionRepresentanteLegal,
        ci.Prof_RepresentanteLegal,
        prof.Prof_Descripcion AS Prof_DescripcionRepresentanteLegal,
        ci.Ciud_RepresentanteLegal,
        ciud.Ciud_Descripcion AS Ciud_DescripcionRepresentanteLegal,
        ci.CoIn_AldeaRepresentanteLegal,
        ci.CoIn_CalleYavenidaRepresentanteLegal,
        ci.CoIn_BarrioOcoloniaRepresentanteLegal,
        ci.CoIn_EdificioYnumRepresentanteLegal,
        ci.CoIn_PuntosDeReferenciaRepresentanteLegal,
        ci.CoIn_RtnRepresentanteLegal,
        ci.CoIn_DNIRepresentanteLegal,
        ci.CoIn_Estado,
        ci.CoIn_Creacion,
        usua1.Usua_Usuario AS Creacion,
        ci.CoIn_FechaCreacion,
        ci.CoIn_Modifica,
        usua2.Usua_Usuario AS Modifica,
        ci.CoIn_FechaModifica
    FROM Gral.tbComerciantesIndividuales ci
    LEFT JOIN Gral.tbPersonasNaturales pn ON ci.PeNa_Id = pn.PeNa_Id
    LEFT JOIN Gral.tbEstadosCiviles esci ON ci.EsCi_RepresentanteLegal = esci.EsCi_Id
    LEFT JOIN Gral.tbProfesiones prof ON ci.Prof_RepresentanteLegal = prof.Prof_Id
    LEFT JOIN Gral.tbCiudades ciud ON ci.Ciud_RepresentanteLegal = ciud.Ciud_Id
    LEFT JOIN Acce.tbUsuarios usua1 ON ci.CoIn_Creacion = usua1.Usua_Id
    LEFT JOIN Acce.tbUsuarios usua2 ON ci.CoIn_Modifica = usua2.Usua_Id
    WHERE ci.CoIn_Id = @CoIn_Id;
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_PersonasJuridicas_buscar
    @PeJu_Id INT
AS
BEGIN
    SELECT 
        pj.PeJu_Id,
        pj.PeJu_RtnSolicitante,
        pn.PeNa_Nombre,
        pn.PeNa_Apellido,
		pn.PeNa_DNI, 
        pn.PeNa_DNIurlPdf, 
        pn.PeNa_NumReciboPublico, 
        pn.PeNa_NumReciboPublicoUrlPdf,
        pj.PeJu_Aldea,
        pj.PeJu_CalleYavenida,
        pj.PeJu_BarrioOcolonia,
        pj.PeJu_EdificioYnum,
        pj.PeJu_PuntosDeReferencia,
        pj.PeJu_Escritura,
        pj.PeNa_Id,
        pj.EsCi_RepresentanteLegal,
        esci.EsCi_Descripcion AS EsCi_DescripcionRepresentanteLegal,
        pj.Prof_RepresentanteLegal,
        prof.Prof_Descripcion AS Prof_DescripcionRepresentanteLegal,
        pj.Ciud_RepresentanteLegal,
        ciud.Ciud_Descripcion AS Ciud_DescripcionRepresentanteLegal,
        pj.PeJu_AldeaRepresentanteLegal,
        pj.PeJu_CalleYavenidaRepresentanteLegal,
        pj.PeJu_BarrioOcoloniaRepresentanteLegal,
        pj.PeJu_EdificioYnumRepresentanteLegal,
        pj.PeJu_PuntosDeReferenciaRepresentanteLegal,
        pj.PeJu_RtnRepresentanteLegal,
        pj.PeJu_DNIRepresentanteLegal,
        pj.PeJu_Estado,
        pj.PeJu_Creacion,
        usua1.Usua_Usuario AS Creacion,
        pj.PeJu_FechaCreacion,
        pj.PeJu_Modifica,
        usua2.Usua_Usuario AS Modifica,
        pj.PeJu_FechaModifica
    FROM Gral.tbPersonasJuridicas pj
    LEFT JOIN Gral.tbPersonasNaturales pn ON pj.PeNa_Id = pn.PeNa_Id
    LEFT JOIN Gral.tbEstadosCiviles esci ON pj.EsCi_RepresentanteLegal = esci.EsCi_Id
    LEFT JOIN Gral.tbProfesiones prof ON pj.Prof_RepresentanteLegal = prof.Prof_Id
    LEFT JOIN Gral.tbCiudades ciud ON pj.Ciud_RepresentanteLegal = ciud.Ciud_Id
    LEFT JOIN Acce.tbUsuarios usua1 ON pj.PeJu_Creacion = usua1.Usua_Id
    LEFT JOIN Acce.tbUsuarios usua2 ON pj.PeJu_Modifica = usua2.Usua_Id
    WHERE pj.PeJu_Id = @PeJu_Id;
END;
GO

--CREAR
CREATE OR ALTER PROCEDURE [Acce].[sp_Usuarios_crear]
    @Usua_Usuario VARCHAR(50),
    @Usua_Clave VARCHAR(50),
    @Rol_Id INT,
    @Usua_IsAdmin BIT,
    @Usua_Creacion INT,
    @Usua_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Acce].[tbUsuarios] (Usua_Usuario, Usua_Clave, Rol_Id, Usua_IsAdmin, Usua_Creacion, Usua_FechaCreacion)
        VALUES (@Usua_Usuario, HASHBYTES('SHA2_512', @Usua_Clave), @Rol_Id, @Usua_IsAdmin, @Usua_Creacion, @Usua_FechaCreacion);
        
        SELECT 1 AS Resultado;
        
        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT -1 AS Resultado;
        ROLLBACK;
    END CATCH
END;
GO

CREATE OR ALTER PROCEDURE [Acce].[sp_Roles_crear]
    @Rol_Descripcion VARCHAR(50),
    @Rol_Creacion INT,
    @Rol_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Acce].[tbRoles] (Rol_Descripcion, Rol_Creacion, Rol_FechaCreacion) VALUES (@Rol_Descripcion, @Rol_Creacion, @Rol_FechaCreacion);
        DECLARE @ID INT;
        SET @ID = SCOPE_IDENTITY();
        SELECT @ID AS Resultado;

        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT -1 AS Resultado;
        ROLLBACK;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Acce].[sp_Pantallas_crear]
    @Pant_Descripcion varchar(50),
    @Pant_Creacion int,
    @Pant_FechaCreacion datetime
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Acce].[tbPantallas] (Pant_Descripcion, Pant_Creacion, Pant_FechaCreacion)
        VALUES (@Pant_Descripcion, @Pant_Creacion, @Pant_FechaCreacion);
        SELECT 1 AS Resultado;

        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT -1 AS Resultado;
        ROLLBACK;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Acce].[sp_PantallasPorRol_crear]
    @Rol_Id int,
    @Pant_Id int,
    @PaRo_Creacion int,
    @PaRo_FechaCreacion datetime
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Acce].[tbPantallasPorRoles] (Rol_Id, Pant_Id, PaRo_Creacion, PaRo_FechaCreacion)
        VALUES (@Rol_Id, @Pant_Id, @PaRo_Creacion, @PaRo_FechaCreacion);
        SELECT 1 AS Resultado;

        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT -1 AS Resultado;
        ROLLBACK;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_Paises_crear]
    @Pais_Descripcion varchar(50),
    @Pais_Creacion int,
    @Pais_FechaCreacion datetime
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Gral].[tbPaises] (Pais_Descripcion, Pais_Creacion, Pais_FechaCreacion)
        VALUES (@Pais_Descripcion, @Pais_Creacion, @Pais_FechaCreacion);

        select 1 as Result

        COMMIT;
    END TRY
    BEGIN CATCH
        select -1 as Result;
        ROLLBACK;
    END CATCH
END;
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_Estados_crear]
    @Esta_Descripcion varchar(50),
    @Pais_Id int,
    @Esta_Creacion int,
    @Esta_FechaCreacion datetime
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Gral].[tbEstados] (Esta_Descripcion, Pais_Id, Esta_Creacion, Esta_FechaCreacion)
        VALUES (@Esta_Descripcion, @Pais_Id, @Esta_Creacion, @Esta_FechaCreacion);

        SELECT 1 AS Result;

        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT -1 AS Result;
        ROLLBACK;
    END CATCH
END;
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_Ciudades_crear]
    @Ciud_Descripcion varchar(50),
    @Esta_Id int,
    @Ciud_Creacion int,
    @Ciud_FechaCreacion datetime
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Gral].[tbCiudades] (Ciud_Descripcion, Esta_Id, Ciud_Creacion, Ciud_FechaCreacion)
        VALUES (@Ciud_Descripcion, @Esta_Id, @Ciud_Creacion, @Ciud_FechaCreacion);

        SELECT 1 AS Result;

        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT -1 AS Result;
        ROLLBACK;
    END CATCH
END;
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_Empresas_crear]
    @Empr_Descripcion varchar(50),
    @Empr_Creacion int,
    @Empr_FechaCreacion datetime
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Gral].[tbEmpresas] (Empr_Descripcion, Empr_Creacion, Empr_FechaCreacion)
        VALUES (@Empr_Descripcion, @Empr_Creacion, @Empr_FechaCreacion);

        SELECT 1 AS Result;

        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT -1 AS Result;
        ROLLBACK;
    END CATCH
END;
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_EstadosCiviles_crear]
    @EsCi_Descripcion varchar(50),
    @EsCi_Creacion int,
    @EsCi_FechaCreacion datetime
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Gral].[tbEstadosCiviles] (EsCi_Descripcion, EsCi_Creacion, EsCi_FechaCreacion)
        VALUES (@EsCi_Descripcion, @EsCi_Creacion, @EsCi_FechaCreacion);

        SELECT 1 AS Result;

        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT -1 AS Result;
        ROLLBACK;
    END CATCH
END;
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_Empleados_crear]
    @Empl_Rtn varchar(50),
    @Empl_PrimerNombre varchar(50),
    @Empl_PrimerApellido varchar(50),
    @Empl_Sexo char(1),
    @Usua_Id int,
    @EsCi_Id int,
    @Empr_Id int,
    @Empl_Creacion int,
    @Empl_FechaCreacion datetime
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Gral].[tbEmpleados] (Empl_Rtn, Empl_PrimerNombre, Empl_PrimerApellido, Empl_Sexo, Usua_Id, EsCi_Id, Empr_Id, Empl_Creacion, Empl_FechaCreacion)
        VALUES (@Empl_Rtn, @Empl_PrimerNombre, @Empl_PrimerApellido, @Empl_Sexo, @Usua_Id, @EsCi_Id, @Empr_Id, @Empl_Creacion, @Empl_FechaCreacion);

        SELECT 1 AS Result;

        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT -1 AS Result;
        ROLLBACK;
    END CATCH
END;
GO

CREATE OR ALTER PROCEDURE [Adua].[sp_Aduanas_crear]
    @Adua_Descripcion varchar(50),
	@Ciud_Id int,
    @Adua_Creacion int,
    @Adua_FechaCreacion datetime
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Adua].[tbAduanas] (Adua_Descripcion, Ciud_Id, Adua_Creacion, Adua_FechaCreacion)
        VALUES (@Adua_Descripcion, @Ciud_Id, @Adua_Creacion, @Adua_FechaCreacion);

        SELECT 1 AS Result;

        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT -1 AS Result;
        ROLLBACK;
    END CATCH
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_Profesiones_crear
    @Prof_Descripcion varchar(50),
    @Prof_Creacion int,
    @Prof_FechaCreacion datetime
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO Gral.tbProfesiones (Prof_Descripcion, Prof_Creacion, Prof_FechaCreacion)
        VALUES (@Prof_Descripcion, @Prof_Creacion, @Prof_FechaCreacion);

        SELECT 1 AS Result;

        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT -1 AS Result;
        ROLLBACK;
    END CATCH
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_Oficinas_crear
    @Ofic_Descripcion varchar(100),
    @Adua_Id int,
    @Ofic_Creacion int,
    @Ofic_FechaCreacion datetime
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO Gral.tbOficinas (Ofic_Descripcion, Adua_Id, Ofic_Creacion, Ofic_FechaCreacion)
        VALUES (@Ofic_Descripcion, @Adua_Id, @Ofic_Creacion, @Ofic_FechaCreacion);

        SELECT 1 AS Result;

        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT -1 AS Result;
        ROLLBACK;
    END CATCH
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_PersonasNaturales_crear
    @PeNa_Nombre varchar(50),
    @PeNa_Apellido varchar(50),
    @PeNa_Rtn varchar(50),
    @PeNa_RtnUrlPdf varchar(50),
    @PeNa_DNI varchar(50),
    @PeNa_DNIurlPdf varchar(50),
    @PeNa_NumReciboPublico varchar(50),
    @PeNa_NumReciboPublicoUrlPdf varchar(50),
    @Ofic_Id int,
    @EsCi_Id int,
    @Prof_Id int,
    @Ciud_Id int,
    @PeNa_Direccion varchar(50),
    @PeNa_TelefonoFijo varchar(50),
    @PeNa_TelefonoCelular varchar(50),
    @PeNa_Correo varchar(50),
    @PeNa_CodigoCorreo varchar(50),
    @PeNa_CorreoAlternativa varchar(50),
    @PeNa_CodigoCorreoAlternativa varchar(50),
    @PeNa_Estado bit = 1,
    @PeNa_Creacion int,
    @PeNa_FechaCreacion datetime
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO Gral.tbPersonasNaturales (
            PeNa_Nombre, 
            PeNa_Apellido, 
            PeNa_Rtn, 
            PeNa_RtnUrlPdf, 
            PeNa_DNI, 
            PeNa_DNIurlPdf, 
            PeNa_NumReciboPublico, 
            PeNa_NumReciboPublicoUrlPdf, 
            Ofic_Id, 
            EsCi_Id, 
            Prof_Id, 
            Ciud_Id, 
            PeNa_Direccion, 
            PeNa_TelefonoFijo, 
            PeNa_TelefonoCelular, 
            PeNa_Correo, 
            PeNa_CodigoCorreo, 
            PeNa_CorreoAlternativa, 
            PeNa_CodigoCorreoAlternativa, 
            PeNa_Estado, 
            PeNa_Creacion, 
            PeNa_FechaCreacion
        ) VALUES (
            @PeNa_Nombre, 
            @PeNa_Apellido, 
            @PeNa_Rtn, 
            @PeNa_RtnUrlPdf, 
            @PeNa_DNI, 
            @PeNa_DNIurlPdf, 
            @PeNa_NumReciboPublico, 
            @PeNa_NumReciboPublicoUrlPdf, 
            @Ofic_Id, 
            @EsCi_Id, 
            @Prof_Id, 
            @Ciud_Id, 
            @PeNa_Direccion, 
            @PeNa_TelefonoFijo, 
            @PeNa_TelefonoCelular, 
            @PeNa_Correo, 
            @PeNa_CodigoCorreo, 
            @PeNa_CorreoAlternativa, 
            @PeNa_CodigoCorreoAlternativa, 
            @PeNa_Estado, 
            @PeNa_Creacion, 
            @PeNa_FechaCreacion
        );
		DECLARE @ID int
        SET @ID = SCOPE_IDENTITY();
		SELECT @ID	AS Result;

        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT -1 AS RESULT;
        ROLLBACK;
    END CATCH
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_ComerciantesIndividuales_crear
    @CoIn_RtnSolicitante varchar(50),
    @PeNa_Id INT,
    @CoIn_Aldea varchar(50),
    @CoIn_CalleYavenida varchar(50),
    @CoIn_BarrioOcolonia varchar(50),
    @CoIn_EdificioYnum varchar(50),
    @CoIn_PuntosDeReferencia varchar(50),
    @CoIn_Declaracion varchar(50),
    @CoIn_RepresentanteLegal bit = 0,
    @EsCi_RepresentanteLegal int = NULL,
    @Prof_RepresentanteLegal int = NULL,
    @Ciud_RepresentanteLegal int = NULL,
    @CoIn_AldeaRepresentanteLegal varchar(50) = NULL,
    @CoIn_CalleYavenidaRepresentanteLegal varchar(50) = NULL,
    @CoIn_BarrioOcoloniaRepresentanteLegal varchar(50) = NULL,
    @CoIn_EdificioYnumRepresentanteLegal varchar(50) = NULL,
    @CoIn_PuntosDeReferenciaRepresentanteLegal varchar(50) = NULL,
    @CoIn_RtnRepresentanteLegal varchar(50) = NULL,
    @CoIn_DNIRepresentanteLegal varchar(50) = NULL,
    @CoIn_Creacion int,
    @CoIn_FechaCreacion datetime
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO Gral.tbComerciantesIndividuales (
            CoIn_RtnSolicitante,
            PeNa_Id,
            CoIn_Aldea,
            CoIn_CalleYavenida,
            CoIn_BarrioOcolonia,
            CoIn_EdificioYnum,
            CoIn_PuntosDeReferencia,
            CoIn_Declaracion,
            CoIn_RepresentanteLegal,
            EsCi_RepresentanteLegal,
            Prof_RepresentanteLegal,
            Ciud_RepresentanteLegal,
            CoIn_AldeaRepresentanteLegal,
            CoIn_CalleYavenidaRepresentanteLegal,
            CoIn_BarrioOcoloniaRepresentanteLegal,
            CoIn_EdificioYnumRepresentanteLegal,
            CoIn_PuntosDeReferenciaRepresentanteLegal,
            CoIn_RtnRepresentanteLegal,
            CoIn_DNIRepresentanteLegal,
            CoIn_Creacion,
            CoIn_FechaCreacion
        ) VALUES (
            @CoIn_RtnSolicitante,
            @PeNa_Id,
            @CoIn_Aldea,
            @CoIn_CalleYavenida,
            @CoIn_BarrioOcolonia,
            @CoIn_EdificioYnum,
            @CoIn_PuntosDeReferencia,
            @CoIn_Declaracion,
            @CoIn_RepresentanteLegal,
            @EsCi_RepresentanteLegal,
            @Prof_RepresentanteLegal,
            @Ciud_RepresentanteLegal,
            @CoIn_AldeaRepresentanteLegal,
            @CoIn_CalleYavenidaRepresentanteLegal,
            @CoIn_BarrioOcoloniaRepresentanteLegal,
            @CoIn_EdificioYnumRepresentanteLegal,
            @CoIn_PuntosDeReferenciaRepresentanteLegal,
            @CoIn_RtnRepresentanteLegal,
            @CoIn_DNIRepresentanteLegal,
            @CoIn_Creacion,
            @CoIn_FechaCreacion
        );
		DECLARE @ID INT
        SET @ID = SCOPE_IDENTITY();
		SELECT @ID AS Result;

        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT -1 AS Result;
        ROLLBACK;
    END CATCH
END;
GO

CREATE OR ALTER PROCEDURE Gral.sp_PersonasJuridicas_crear
    @PeJu_RtnSolicitante VARCHAR(50),
    @PeJu_Aldea VARCHAR(50) = NULL,
    @PeJu_CalleYavenida VARCHAR(50) = NULL,
    @PeJu_BarrioOcolonia VARCHAR(50),
    @PeJu_EdificioYnum VARCHAR(50),
    @PeJu_PuntosDeReferencia VARCHAR(50) = NULL,
    @PeJu_Escritura VARCHAR(50) = NULL,
    @PeNa_Id INT,
    @EsCi_RepresentanteLegal INT = NULL,
    @Prof_RepresentanteLegal INT = NULL,
    @Ciud_RepresentanteLegal INT = NULL,
    @PeJu_AldeaRepresentanteLegal VARCHAR(50) = NULL,
    @PeJu_CalleYavenidaRepresentanteLegal VARCHAR(50) = NULL,
    @PeJu_BarrioOcoloniaRepresentanteLegal VARCHAR(50) = NULL,
    @PeJu_EdificioYnumRepresentanteLegal VARCHAR(50) = NULL,
    @PeJu_PuntosDeReferenciaRepresentanteLegal VARCHAR(50) = NULL,
    @PeJu_RtnRepresentanteLegal VARCHAR(50) = NULL,
    @PeJu_DNIRepresentanteLegal VARCHAR(50) = NULL,
    @PeJu_Creacion INT,
    @PeJu_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO Gral.tbPersonasJuridicas (
					PeJu_RtnSolicitante, 
					PeJu_Aldea, 
					PeJu_CalleYavenida, 
					PeJu_BarrioOcolonia, 
					PeJu_EdificioYnum, 
					PeJu_PuntosDeReferencia, 
					PeJu_Escritura, 
					PeNa_Id, 
					EsCi_RepresentanteLegal, 
					Prof_RepresentanteLegal, 
					Ciud_RepresentanteLegal, 
					PeJu_AldeaRepresentanteLegal, 
					PeJu_CalleYavenidaRepresentanteLegal, 
					PeJu_BarrioOcoloniaRepresentanteLegal, 
					PeJu_EdificioYnumRepresentanteLegal, 
					PeJu_PuntosDeReferenciaRepresentanteLegal, 
					PeJu_RtnRepresentanteLegal, 
					PeJu_DNIRepresentanteLegal,
					PeJu_Creacion, 
					PeJu_FechaCreacion
					) VALUES (
					@PeJu_RtnSolicitante, 
					@PeJu_Aldea, 
					@PeJu_CalleYavenida, 
					@PeJu_BarrioOcolonia, 
					@PeJu_EdificioYnum, 
					@PeJu_PuntosDeReferencia, 
					@PeJu_Escritura, 
					@PeNa_Id, 
					@EsCi_RepresentanteLegal, 
					@Prof_RepresentanteLegal, 
					@Ciud_RepresentanteLegal, 
					@PeJu_AldeaRepresentanteLegal,
					@PeJu_CalleYavenidaRepresentanteLegal, 
					@PeJu_BarrioOcoloniaRepresentanteLegal, 
					@PeJu_EdificioYnumRepresentanteLegal, 
					@PeJu_PuntosDeReferenciaRepresentanteLegal, 
					@PeJu_RtnRepresentanteLegal, 
					@PeJu_DNIRepresentanteLegal,
					@PeJu_Creacion, 
					@PeJu_FechaCreacion
					);
		DECLARE @ID INT
        SET @ID = SCOPE_IDENTITY();
		SELECT @ID AS Result;
        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;

        SELECT -1 AS result;
    END CATCH
END;
GO

--actualizar
CREATE OR ALTER PROCEDURE [Acce].[sp_Usuarios_actualizar]
    @Usua_Id INT,
    @Usua_Usuario VARCHAR(50),
    @Usua_Clave VARCHAR(MAX),
    @Rol_Id INT,
    @Usua_IsAdmin BIT,
    @Usua_Modifica INT,
    @Usua_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Acce].[tbUsuarios]
        SET
            [Usua_Usuario] = @Usua_Usuario,
            [Usua_Clave] = HASHBYTES('SHA2_512', @Usua_Clave),
            [Rol_Id] = @Rol_Id,
            [Usua_IsAdmin] = @Usua_IsAdmin,
            [Usua_Modifica] = @Usua_Modifica,
            [Usua_FechaModifica] = @Usua_FechaModifica
        WHERE
            [Usua_Id] = @Usua_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Acce].[sp_Roles_actualizar]
    @Rol_Id INT,
    @Rol_Descripcion VARCHAR(50),
    @Rol_Modifica INT,
    @Rol_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Acce].[tbRoles]
        SET
            [Rol_Descripcion] = @Rol_Descripcion,
            [Rol_Modifica] = @Rol_Modifica,
            [Rol_FechaModifica] = @Rol_FechaModifica
        WHERE
            [Rol_Id] = @Rol_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Acce].[sp_Pantallas_actualizar]
    @Pant_Id INT,
    @Pant_Descripcion VARCHAR(50),
    @Pant_Modifica INT,
    @Pant_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Acce].[tbPantallas]
        SET
            [Pant_Descripcion] = @Pant_Descripcion,
            [Pant_Modifica] = @Pant_Modifica,
            [Pant_FechaModifica] = @Pant_FechaModifica
        WHERE
            [Pant_Id] = @Pant_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_Paises_actualizar]
    @Pais_Id INT,
    @Pais_Descripcion VARCHAR(50),
    @Pais_Modifica INT,
    @Pais_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Gral].[tbPaises]
        SET
            [Pais_Descripcion] = @Pais_Descripcion,
            [Pais_Modifica] = @Pais_Modifica,
            [Pais_FechaModifica] = @Pais_FechaModifica
        WHERE
            [Pais_Id] = @Pais_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_Estados_actualizar]
    @Esta_Id INT,
    @Esta_Descripcion VARCHAR(50),
    @Pais_Id INT,
    @Esta_Modifica INT,
    @Esta_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Gral].[tbEstados]
        SET
            [Esta_Descripcion] = @Esta_Descripcion,
            [Pais_Id] = @Pais_Id,
            [Esta_Modifica] = @Esta_Modifica,
            [Esta_FechaModifica] = @Esta_FechaModifica
        WHERE
            [Esta_Id] = @Esta_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_Ciudades_actualizar]
    @Ciud_Id INT,
    @Ciud_Descripcion VARCHAR(50),
    @Esta_Id INT,
    @Ciud_Modifica INT,
    @Ciud_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Gral].[tbCiudades]
        SET
            [Ciud_Descripcion] = @Ciud_Descripcion,
            [Esta_Id] = @Esta_Id,
            [Ciud_Modifica] = @Ciud_Modifica,
            [Ciud_FechaModifica] = @Ciud_FechaModifica
        WHERE
            [Ciud_Id] = @Ciud_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_Empresas_actualizar]
    @Empr_Id INT,
    @Empr_Descripcion VARCHAR(50),
    @Empr_Modifica INT,
    @Empr_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Gral].[tbEmpresas]
        SET
            [Empr_Descripcion] = @Empr_Descripcion,
            [Empr_Modifica] = @Empr_Modifica,
            [Empr_FechaModifica] = @Empr_FechaModifica
        WHERE
            [Empr_Id] = @Empr_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_EstadosCiviles_actualizar]
    @EsCi_Id INT,
    @EsCi_Descripcion VARCHAR(50),
    @EsCi_Modifica INT,
    @EsCi_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Gral].[tbEstadosCiviles]
        SET
            [EsCi_Descripcion] = @EsCi_Descripcion,
            [EsCi_Modifica] = @EsCi_Modifica,
            [EsCi_FechaModifica] = @EsCi_FechaModifica
        WHERE
            [EsCi_Id] = @EsCi_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_Empleados_actualizar]
    @Empl_Id INT,
    @Empl_Rtn VARCHAR(50),
    @Empl_PrimerNombre VARCHAR(50),
    @Empl_PrimerApellido VARCHAR(50),
    @Empl_Sexo CHAR(1),
    @Usua_Id INT,
    @EsCi_Id INT,
    @Empr_Id INT,
    @Empl_Modifica INT,
    @Empl_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Gral].[tbEmpleados]
        SET
            [Empl_Rtn] = @Empl_Rtn,
            [Empl_PrimerNombre] = @Empl_PrimerNombre,
            [Empl_PrimerApellido] = @Empl_PrimerApellido,
            [Empl_Sexo] = @Empl_Sexo,
            [Usua_Id] = @Usua_Id,
            [EsCi_Id] = @EsCi_Id,
            [Empr_Id] = @Empr_Id,
            [Empl_Modifica] = @Empl_Modifica,
            [Empl_FechaModifica] = @Empl_FechaModifica
        WHERE
            [Empl_Id] = @Empl_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Adua].[sp_Aduanas_actualizar]
    @Adua_Id INT,
    @Adua_Descripcion VARCHAR(50),
    @Ciud_Id INT,
    @Adua_Modifica INT,
    @Adua_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Adua].[tbAduanas]
        SET
            [Adua_Descripcion] = @Adua_Descripcion,
            [Ciud_Id] = @Ciud_Id,
            [Adua_Modifica] = @Adua_Modifica,
            [Adua_FechaModifica] = @Adua_FechaModifica
        WHERE
            [Adua_Id] = @Adua_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE Gral.sp_Profesiones_actualizar
    @Prof_Id INT,
    @Prof_Descripcion VARCHAR(50),
    @Prof_Modifica INT,
    @Prof_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE Gral.tbProfesiones
        SET
            Prof_Descripcion = @Prof_Descripcion,
            Prof_Modifica = @Prof_Modifica,
            Prof_FechaModifica = @Prof_FechaModifica
        WHERE
            Prof_Id = @Prof_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE Gral.sp_Oficinas_actualizar
    @Ofic_Id INT,
    @Ofic_Descripcion VARCHAR(100),
    @Adua_Id INT,
    @Ofic_Modifica INT,
    @Ofic_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE Gral.tbOficinas
        SET
            Ofic_Descripcion = @Ofic_Descripcion,
            Adua_Id = @Adua_Id,
            Ofic_Modifica = @Ofic_Modifica,
            Ofic_FechaModifica = @Ofic_FechaModifica
        WHERE
            Ofic_Id = @Ofic_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE Gral.sp_PersonasNaturales_actualizar
    @PeNa_Id INT,
    @PeNa_Nombre VARCHAR(50),
    @PeNa_Apellido VARCHAR(50),
    @PeNa_Rtn VARCHAR(50),
    @PeNa_RtnUrlPdf VARCHAR(50),
    @PeNa_DNI VARCHAR(50),
    @PeNa_DNIurlPdf VARCHAR(50),
    @PeNa_NumReciboPublico VARCHAR(50),
    @PeNa_NumReciboPublicoUrlPdf VARCHAR(50),
    @Ofic_Id INT,
    @EsCi_Id INT,
    @Prof_Id INT,
    @Ciud_Id INT,
    @PeNa_Direccion VARCHAR(50),
    @PeNa_TelefonoFijo VARCHAR(50),
    @PeNa_TelefonoCelular VARCHAR(50),
    @PeNa_Correo VARCHAR(50),
    @PeNa_CodigoCorreo VARCHAR(50),
    @PeNa_CorreoAlternativa VARCHAR(50),
    @PeNa_CodigoCorreoAlternativa VARCHAR(50),
    @PeNa_Modifica INT,
    @PeNa_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE Gral.tbPersonasNaturales
        SET
            PeNa_Nombre = @PeNa_Nombre,
            PeNa_Apellido = @PeNa_Apellido,
            PeNa_Rtn = @PeNa_Rtn,
            PeNa_RtnUrlPdf = @PeNa_RtnUrlPdf,
            PeNa_DNI = @PeNa_DNI,
            PeNa_DNIurlPdf = @PeNa_DNIurlPdf,
            PeNa_NumReciboPublico = @PeNa_NumReciboPublico,
            PeNa_NumReciboPublicoUrlPdf = @PeNa_NumReciboPublicoUrlPdf,
            Ofic_Id = @Ofic_Id,
            EsCi_Id = @EsCi_Id,
            Prof_Id = @Prof_Id,
            Ciud_Id = @Ciud_Id,
            PeNa_Direccion = @PeNa_Direccion,
            PeNa_TelefonoFijo = @PeNa_TelefonoFijo,
            PeNa_TelefonoCelular = @PeNa_TelefonoCelular,
            PeNa_Correo = @PeNa_Correo,
            PeNa_CodigoCorreo = @PeNa_CodigoCorreo,
            PeNa_CorreoAlternativa = @PeNa_CorreoAlternativa,
            PeNa_CodigoCorreoAlternativa = @PeNa_CodigoCorreoAlternativa,
            PeNa_Modifica = @PeNa_Modifica,
            PeNa_FechaModifica = @PeNa_FechaModifica
        WHERE
            PeNa_Id = @PeNa_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE Gral.sp_ComerciantesIndividuales_actualizar
    @CoIn_Id INT,
    @CoIn_RtnSolicitante VARCHAR(50),
    @PeNa_Id INT,
    @CoIn_Aldea VARCHAR(50),
    @CoIn_CalleYavenida VARCHAR(50),
    @CoIn_BarrioOcolonia VARCHAR(50),
    @CoIn_EdificioYnum VARCHAR(50),
    @CoIn_PuntosDeReferencia VARCHAR(50),
    @CoIn_Declaracion VARCHAR(50),
    @CoIn_RepresentanteLegal BIT,
    @EsCi_RepresentanteLegal INT,
    @Prof_RepresentanteLegal INT,
    @Ciud_RepresentanteLegal INT,
    @CoIn_AldeaRepresentanteLegal VARCHAR(50),
    @CoIn_CalleYavenidaRepresentanteLegal VARCHAR(50),
    @CoIn_BarrioOcoloniaRepresentanteLegal VARCHAR(50),
    @CoIn_EdificioYnumRepresentanteLegal VARCHAR(50),
    @CoIn_PuntosDeReferenciaRepresentanteLegal VARCHAR(50),
    @CoIn_RtnRepresentanteLegal VARCHAR(50),
    @CoIn_DNIRepresentanteLegal VARCHAR(50),
    @CoIn_Modifica INT,
    @CoIn_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE Gral.tbComerciantesIndividuales
        SET
            CoIn_RtnSolicitante = @CoIn_RtnSolicitante,
            PeNa_Id = @PeNa_Id,
            CoIn_Aldea = @CoIn_Aldea,
            CoIn_CalleYavenida = @CoIn_CalleYavenida,
            CoIn_BarrioOcolonia = @CoIn_BarrioOcolonia,
            CoIn_EdificioYnum = @CoIn_EdificioYnum,
            CoIn_PuntosDeReferencia = @CoIn_PuntosDeReferencia,
            CoIn_Declaracion = @CoIn_Declaracion,
            CoIn_RepresentanteLegal = @CoIn_RepresentanteLegal,
            EsCi_RepresentanteLegal = @EsCi_RepresentanteLegal,
            Prof_RepresentanteLegal = @Prof_RepresentanteLegal,
            Ciud_RepresentanteLegal = @Ciud_RepresentanteLegal,
            CoIn_AldeaRepresentanteLegal = @CoIn_AldeaRepresentanteLegal,
            CoIn_CalleYavenidaRepresentanteLegal = @CoIn_CalleYavenidaRepresentanteLegal,
            CoIn_BarrioOcoloniaRepresentanteLegal = @CoIn_BarrioOcoloniaRepresentanteLegal,
            CoIn_EdificioYnumRepresentanteLegal = @CoIn_EdificioYnumRepresentanteLegal,
            CoIn_PuntosDeReferenciaRepresentanteLegal = @CoIn_PuntosDeReferenciaRepresentanteLegal,
            CoIn_RtnRepresentanteLegal = @CoIn_RtnRepresentanteLegal,
            CoIn_DNIRepresentanteLegal = @CoIn_DNIRepresentanteLegal,
            CoIn_Modifica = @CoIn_Modifica,
            CoIn_FechaModifica = @CoIn_FechaModifica
        WHERE
            CoIn_Id = @CoIn_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_PersonasJuridicas_actualizar]
    @PeJu_Id INT,
    @PeJu_RtnSolicitante VARCHAR(50),
    @PeJu_Aldea VARCHAR(50),
    @PeJu_CalleYavenida VARCHAR(50),
    @PeJu_BarrioOcolonia VARCHAR(50),
    @PeJu_EdificioYnum VARCHAR(50),
    @PeJu_PuntosDeReferencia VARCHAR(50),
    @PeJu_Escritura VARCHAR(50),
    @PeNa_Id INT,
    @EsCi_RepresentanteLegal INT,
    @Prof_RepresentanteLegal INT,
    @Ciud_RepresentanteLegal INT,
    @PeJu_AldeaRepresentanteLegal VARCHAR(50),
    @PeJu_CalleYavenidaRepresentanteLegal VARCHAR(50),
    @PeJu_BarrioOcoloniaRepresentanteLegal VARCHAR(50),
    @PeJu_EdificioYnumRepresentanteLegal VARCHAR(50),
    @PeJu_PuntosDeReferenciaRepresentanteLegal VARCHAR(50),
    @PeJu_RtnRepresentanteLegal VARCHAR(50),
    @PeJu_DNIRepresentanteLegal VARCHAR(50),
    @PeJu_Estado BIT,
    @PeJu_Modifica INT,
    @PeJu_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Gral].[tbPersonasJuridicas]
        SET PeJu_RtnSolicitante = @PeJu_RtnSolicitante,
            PeJu_Aldea = @PeJu_Aldea,
            PeJu_CalleYavenida = @PeJu_CalleYavenida,
            PeJu_BarrioOcolonia = @PeJu_BarrioOcolonia,
            PeJu_EdificioYnum = @PeJu_EdificioYnum,
            PeJu_PuntosDeReferencia = @PeJu_PuntosDeReferencia,
            PeJu_Escritura = @PeJu_Escritura,
            PeNa_Id = @PeNa_Id,
            EsCi_RepresentanteLegal = @EsCi_RepresentanteLegal,
            Prof_RepresentanteLegal = @Prof_RepresentanteLegal,
            Ciud_RepresentanteLegal = @Ciud_RepresentanteLegal,
            PeJu_AldeaRepresentanteLegal = @PeJu_AldeaRepresentanteLegal,
            PeJu_CalleYavenidaRepresentanteLegal = @PeJu_CalleYavenidaRepresentanteLegal,
            PeJu_BarrioOcoloniaRepresentanteLegal = @PeJu_BarrioOcoloniaRepresentanteLegal,
            PeJu_EdificioYnumRepresentanteLegal = @PeJu_EdificioYnumRepresentanteLegal,
            PeJu_PuntosDeReferenciaRepresentanteLegal = @PeJu_PuntosDeReferenciaRepresentanteLegal,
            PeJu_RtnRepresentanteLegal = @PeJu_RtnRepresentanteLegal,
            PeJu_DNIRepresentanteLegal = @PeJu_DNIRepresentanteLegal,
            PeJu_Estado = @PeJu_Estado,
            PeJu_Modifica = @PeJu_Modifica,
            PeJu_FechaModifica = @PeJu_FechaModifica
        WHERE PeJu_Id = @PeJu_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

--ELIMINAR
CREATE OR ALTER PROCEDURE [Acce].[sp_Usuarios_eliminar]
    @Usua_Id INT,
    @Usua_Modifica INT,
    @Usua_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Acce].[tbUsuarios]
        SET Usua_Estado = 0,
            Usua_Modifica = @Usua_Modifica,
            Usua_FechaModifica = @Usua_FechaModifica
        WHERE Usua_Id = @Usua_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        SELECT -1 AS Resultado;
        ROLLBACK;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Acce].[sp_Roles_eliminar]
    @Rol_Id INT,
    @Rol_Modificacion INT,
    @Rol_FechaModificacion DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Acce].[tbRoles]
        SET Rol_Estado = 0,
            Rol_Modifica = @Rol_Modificacion,
            Rol_FechaModifica = @Rol_FechaModificacion
        WHERE Rol_Id = @Rol_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Acce].[sp_Pantallas_eliminar]
    @Pant_Id INT,
    @Pant_Modificacion INT,
    @Pant_FechaModificacion DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Acce].[tbPantallas]
        SET Pant_Estado = 0,
            Pant_Modifica = @Pant_Modificacion,
            Pant_FechaModifica = @Pant_FechaModificacion
        WHERE Pant_Id = @Pant_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Acce].[sp_PantallasPorRoles_eliminar]
    @Rol_Id INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        DELETE FROM [Acce].[tbPantallasPorRoles]
        WHERE Rol_Id = @Rol_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_Paises_eliminar]
    @Pais_Id INT,
    @Pais_Modifica INT,
    @Pais_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Gral].[tbPaises]
        SET Pais_Estado = 0,
            Pais_Modifica = @Pais_Modifica,
            Pais_FechaModifica = @Pais_FechaModifica
        WHERE Pais_Id = @Pais_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_Estados_eliminar]
    @Esta_Id INT,
    @Esta_Modifica INT,
    @Esta_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Gral].[tbEstados]
        SET Esta_Estado = 0,
            Esta_Modifica = @Esta_Modifica,
            Esta_FechaModifica = @Esta_FechaModifica
        WHERE Esta_Id = @Esta_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_Ciudades_eliminar]
    @Ciud_Id INT,
    @Ciud_Modifica INT,
    @Ciud_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Gral].[tbCiudades]
        SET Ciud_Estado = 0,
            Ciud_Modifica = @Ciud_Modifica,
            Ciud_FechaModifica = @Ciud_FechaModifica
        WHERE Ciud_Id = @Ciud_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_Empresas_eliminar]
    @Empr_Id INT,
    @Empr_Modifica INT,
    @Empr_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Gral].[tbEmpresas]
        SET Empr_Estado = 0,
            Empr_Modifica = @Empr_Modifica,
            Empr_FechaModifica = @Empr_FechaModifica
        WHERE Empr_Id = @Empr_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_EstadosCiviles_eliminar]
    @EsCi_Id INT,
    @EsCi_Modifica INT,
    @EsCi_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Gral].[tbEstadosCiviles]
        SET EsCi_Estado = 0,
            EsCi_Modifica = @EsCi_Modifica,
            EsCi_FechaModifica = @EsCi_FechaModifica
        WHERE EsCi_Id = @EsCi_Id;

        COMMIT;
        SELECT 1 AS Resultado; -- Éxito
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado; -- Error
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Gral].[sp_Empleados_eliminar]
    @Empl_Id INT,
    @Empl_Modifica INT,
    @Empl_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Gral].[tbEmpleados]
        SET Empl_Estado = 0,
            Empl_Modifica = @Empl_Modifica,
            Empl_FechaModifica = @Empl_FechaModifica
        WHERE Empl_Id = @Empl_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE [Adua].[sp_Aduanas_eliminar]
    @Adua_Id INT,
    @Adua_Modifica INT,
    @Adua_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Adua].[tbAduanas]
        SET Adua_Estado = 0,
            Adua_Modifica = @Adua_Modifica,
            Adua_FechaModifica = @Adua_FechaModifica
        WHERE Adua_Id = @Adua_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE Gral.sp_Profesiones_eliminar
    @Prof_Id INT,
    @Prof_Modifica INT,
    @Prof_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE Gral.tbProfesiones
        SET Prof_Estado = 0,
            Prof_Modifica = @Prof_Modifica,
            Prof_FechaModifica = @Prof_FechaModifica
        WHERE Prof_Id = @Prof_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE Gral.sp_Oficinas_eliminar
    @Ofic_Id INT,
    @Ofic_Modifica INT,
    @Ofic_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE Gral.tbOficinas
        SET Ofic_Estado = 0,
            Ofic_Modifica = @Ofic_Modifica,
            Ofic_FechaModifica = @Ofic_FechaModifica
        WHERE Ofic_Id = @Ofic_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado; 
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE Gral.sp_PersonasNaturales_eliminar
    @PeNa_Id INT,
    @PeNa_Modifica INT,
    @PeNa_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE Gral.tbPersonasNaturales
        SET PeNa_Estado = 0,
            PeNa_Modifica = @PeNa_Modifica,
            PeNa_FechaModifica = @PeNa_FechaModifica
        WHERE PeNa_Id = @PeNa_Id;

        COMMIT;
        SELECT 1 AS Resultado; 
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE Gral.sp_ComerciantesIndividuales_eliminar
    @CoIn_Id INT,
    @CoIn_Modifica INT,
    @CoIn_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE Gral.tbComerciantesIndividuales
        SET CoIn_Estado = 0,
            CoIn_Modifica = @CoIn_Modifica,
            CoIn_FechaModifica = @CoIn_FechaModifica
        WHERE CoIn_Id = @CoIn_Id;

        COMMIT;
        SELECT 1 AS Resultado; -- Éxito
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado; -- Error
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE Gral.sp_PersonasJuridicas_eliminar
    @PeJu_Id INT,
    @PeJu_Modifica INT,
    @PeJu_FechaModifica DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE Gral.tbPersonasJuridicas
        SET PeJu_Estado = 0,
            PeJu_Modifica = @PeJu_Modifica,
            PeJu_FechaModifica = @PeJu_FechaModifica
        WHERE PeJu_Id = @PeJu_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END
GO
