sap.ui.define([], function () {
  return {
    idProyecto: "maestro",
    isLocal: false,
    ActivarMockData: false,
    urlApiGatewayLocal: "http://localhost:4004",
    destApiGateway: "./maestro/dest-provwebapigateway/",
    destApiSeguridad: "./seguridad/dest-provwebapigateway/",
    tablaMaestras: ["TM0017"],
    codigosExcluidos: [],
    services: {
      obtenerMaestrosCabeceraPaginado: "/api/base/maestro-cabecera/obtenerMaestrosCabeceraPaginado",
      obtenerMaestrosDetalleAdicional: "/api/base/maestro-detalle-adicional/obtenerMaestrosDetalleAdicional",
      obtenerMaestrosCabeceraAdicionalAsignados: "/api/base/maestro-cabecera-adicional/obtenerMaestrosCabeceraAdicionalAsignados",
      obtenerMaestrosCabeceraXFiltro: "/api/base/maestro-cabecera/obtenerMaestrosCabeceraXFiltro",
      obtenerMaestrosDetalleCamposXCabecera: "/api/base/maestro-detalle/obtenerMaestrosDetalleCamposXCabecera",
      registrarTabla: "/api/base/maestro-cabecera/registrar",
      editarTabla: "/api/base/maestro-cabecera/editar",
      registrarParametro: "/api/base/maestro-detalle/registrar",
      editarParametro: "/api/base/maestro-detalle/editar",
      eliminarParametro: "/api/base/maestro-detalle/eliminar",
      registrarMaestroDetalleBulk: "/api/base/maestro-detalle/registrarMasivo",
      consultarUserApi: "/api/seguridad/consultarUser"
    }
  };
});
