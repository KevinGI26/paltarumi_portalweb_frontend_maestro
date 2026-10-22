sap.ui.define([], function () {
  return {
    httpPost: async function (url, data, context) {
      return { oAuditResponse: { code: 1, message: "OK" } };
    },
    validarRespuestaServicio: function (response) {
      if (response.code !== 1) {
        sap.m.MessageBox.error("Error: " + response.message);
      }
    }
  };
});
