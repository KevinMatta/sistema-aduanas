export class DeclaracionDeValor {
    DeVa_Id?: number; // Identificador de la declaración de valor
    DeVa_AduanaIngreso?: number; // Aduana de ingreso
    DeVa_AduanaDespacho?: number; // Aduana de despacho
    DeVa_FechaAceptacion?: string; // Fecha de aceptación
    DeVa_RtnImportador?: string; // RTN del importador

    // Característica de la Transacción
    DeVa_LugarEntrega?: string; // Lugar de entrega
    DeVa_PaisEntrega?: number; // País de entrega
    DeVa_NumeroContrado?: string; // Número de contrato
    DeVa_FechaContrado?: string; // Fecha de contrato
    DeVa_PaisEmbarque?: number; // País de embarque
    Deva_LugarEmbarque?: number; // Lugar de embarque
    DeVa_PaisExportacion?: number; // País de exportación
    DeVa_FechaExportacion?: string; // Fecha de exportación

    // Condiciones de la Transacción
    DeVa_Restricciones?: string; // Restricciones
    DeVa_CondicionContraprestacion?: string; // Condición de contraprestación
    DeVa_MontoReversion?: number; // Monto de reversión
    DeVa_TipoVinculacion?: string; // Tipo de vinculación
    DeVa_InfluenciaPrecio?: boolean; // Influencia en el precio
    DeVa_PagosIndirectosDescuentos?: string; // Pagos indirectos o descuentos
    DeVa_CanonDerechosLicencia?: string; // Canon de derechos de licencia

    // BASE DE CÁLCULO
    DeVa_PrecioFactura?: number; // Precio de la factura
    DeVa_PagosIndirectosDescuentosRetroactivos?: number; // Pagos indirectos o descuentos retroactivos
    DeVa_PrecioRealPagado?: number; // Precio real pagado
    DeVa_MontoCondicionContraprestacion?: number; // Monto de la condición de contraprestación
    DeVa_MontoReversionCasilla?: number; // Monto de reversión de casilla
    DeVa_GastosComisiones?: number; // Gastos de comisiones
    DeVa_GastosEnvasesEmbalajes?: number; // Gastos de envases y embalajes
    DeVa_ValorMaterialesConsumidos?: number; // Valor de materiales consumidos
    DeVa_ValorHerramientas?: number; // Valor de herramientas
    DeVa_ValorMaterialesConsumidos2?: number; // Valor de materiales consumidos 2
    DeVa_ValorIngenieriaCreacion?: number; // Valor de ingeniería de creación
    DeVa_ValorCanoDerechosLicencia?: number; // Valor de canon de derechos de licencia
    DeVa_GastosTransporteMercaderia?: number; // Gastos de transporte de mercadería
    DeVa_GastosCargaDescarga?: number; // Gastos de carga y descarga
    DeVa_CostosSeguro?: number; // Costos de seguro
    DeVa_TotalAjustes?: number; // Total de ajustes
    DeVa_GastosConstruccionArmado?: number; // Gastos de construcción y armado
    DeVa_CostosTransportePosterior?: number; // Costos de transporte posterior
    DeVa_DerechosImpuestos?: number; // Derechos e impuestos
    DeVa_MontoIntereses?: number; // Monto de intereses
    DeVa_OtrasDeducciones?: number; // Otras deducciones
    DeVa_TotalDeducciones?: number; // Total de deducciones
    DeVa_ValorAduana?: number; // Valor en aduana

    DeVa_Estado?: boolean; // Estado de la declaración de valor (activo o inactivo)
    DeVa_Creacion?: number; // Usuario que creó el registro de la declaración de valor
    DeVa_FechaCreacion?: string; // Fecha de creación del registro de la declaración de valor
    DeVa_Modifica?: number; // Usuario que modificó el registro de la declaración de valor
    DeVa_FechaModifica?: string; // Fecha de modificación del registro de la declaración de valor
}