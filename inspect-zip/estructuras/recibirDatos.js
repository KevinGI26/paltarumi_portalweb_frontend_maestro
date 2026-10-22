sap.ui.define([], function () {
  return {
    obtenerMaestrosCabeceraPaginado: function (maestros) {
      return maestros.map(function(m) {
        return {
          ID: m.ID,
          codigo: m.CODIGO_MAESTRO_CABECERA,
          descripcion: m.DESCRIPCION,
          ID_ESTADO: m.ID_ESTADO,
          estado: m.ID_ESTADO === 1 ? "Activo" : "Inactivo",
          CREATED_AT: m.CREATED_AT
        };
      });
    },
    obtenerMaestrosCabecera: function (maestros) {
      return maestros || [];
    },
    obtenerMaestrosDetalleAdicional: function (datos) {
      return datos || [];
    },
    obtenerDatosMaestrosEstadoRegistro: function (datos) {
      return datos.map(function(d) {
        return { key: d.CODIGO_MAESTRO_DETALLE, text: d.DESCRIPCION };
      });
    },
    obtenerKeysValoresAdicionalesAsignados: function (datos) {
      return datos.map(function(d) { return d.MAESTRO_DETALLE_ADICIONAL_ID; });
    }
  };
});
