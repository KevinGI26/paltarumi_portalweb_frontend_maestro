sap.ui.define([], function () {
  return {
    registrarTabla: function (data) {
      return {
        maestroCabecera: {
          CODIGO_MAESTRO_CABECERA: data.codigoTabla,
          DESCRIPCION: data.descripcionTabla,
          ID_ESTADO: 1
        }
      };
    },
    editarTabla: function (data) {
      return {
        maestroCabecera: {
          ID: data.idMaestra,
          DESCRIPCION: data.descripcionTabla,
          ID_ESTADO: 1,
          CODIGO_MAESTRO_CABECERA: data.codigoTabla
        }
      };
    },
    registrarParametro: function (oParametroNuevo, data) {
      return {
        maestroDetalle: {
          CODIGO_MAESTRO_DETALLE: oParametroNuevo.codigoParametro,
          DESCRIPCION: oParametroNuevo.descripcionParametro,
          MAESTRO_CABECERA_ID: oParametroNuevo.idMaestro,
          CAMPO: oParametroNuevo.campoParametro,
          VALOR: oParametroNuevo.valorParametro,
          CODIGO_PADRE: oParametroNuevo.id_padre,
          ID_ESTADO: 1
        },
        maestroDetalleValor: { registrar: [] }
      };
    },
    editarParametro: function (oParametroModificar, data) {
      return {
        maestroDetalle: {
          ID: oParametroModificar.id,
          CODIGO_MAESTRO_DETALLE: oParametroModificar.codigoMaestroDetalle,
          DESCRIPCION: oParametroModificar.descripcion,
          MAESTRO_CABECERA_ID: oParametroModificar.idMaestro,
          CAMPO: oParametroModificar.campo,
          VALOR: oParametroModificar.valor,
          ID_ESTADO: parseInt(oParametroModificar.idEstado),
          CODIGO_PADRE: oParametroModificar.id_padre
        },
        maestroDetalleValor: { registrar: [] }
      };
    }
  };
});
