sap.ui.define(["../constantes"], function (constantes) {
  return {
    servicePost: async function (url, oParam, context) {
      // Mock service - sin llamadas reales
      return { code: 1, message: "OK", results: {} };
    },
    servicePut: async function (url, oParam, context) {
      return { code: 1, message: "OK", results: {} };
    },
    serviceDelete: async function (url, oParam, context) {
      return { code: 1, message: "OK", results: {} };
    },
    serviceGet: async function (url, oParam, context) {
      return { code: 1, message: "OK", results: {} };
    },
    serviceGetSeguridad: async function (url, oParam, context) {
      return { code: 1, message: "OK", results: { sToken: "mock_token", oInfoUsuario: {} } };
    }
  };
});
