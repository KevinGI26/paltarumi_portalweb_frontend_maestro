sap.ui.define([], function () {
  return {
    success: function (idTransaccion, message, data) {
      return { code: 1, message: message, idtransaccion: idTransaccion, results: data };
    },
    error: function (idTransaccion, message, data) {
      return { code: -1, message: message, idtransaccion: idTransaccion, results: data };
    },
    errorServicio: function (error, headers) {
      return { code: -1, message: "Error en el servicio", results: null };
    },
    errorNoAutorizado: function (idTransaccion, message, data) {
      return { code: -99, message: message, idtransaccion: idTransaccion, results: data };
    }
  };
});
