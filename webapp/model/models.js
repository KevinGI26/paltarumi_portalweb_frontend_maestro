sap.ui.define(["sap/ui/model/json/JSONModel", "sap/ui/Device"], function (
  JSONModel,
  Device
) {
  "use strict";

  return {
    createDeviceModel: function () {
      var oModel = new JSONModel(Device);
      oModel.setDefaultBindingMode("OneWay");
      return oModel;
    },

    createLocalModel: function () {
      var oData = {
        // Master list
        aTablaMaestra: [
          {
            ID: 94,
            codigo: "TM0017",
            descripcion: "Validaciones Registro",
            ID_ESTADO: 1,
            estado: "Activo",
            CREATED_AT: "2024-08-02T00:38:39.380Z"
          },
          {
            ID: 83,
            codigo: "TM0002",
            descripcion: "Tipo Archivo",
            ID_ESTADO: 1,
            estado: "Activo",
            CREATED_AT: "2024-07-01T16:32:55.489Z"
          },
          {
            ID: 82,
            codigo: "TM0001",
            descripcion: "Tipos de Transacción",
            ID_ESTADO: 1,
            estado: "Activo",
            CREATED_AT: "2024-07-01T16:32:55.489Z"
          }
        ],

        // Detail list
        aParametros: [
          {
            ID: 1,
            CODIGO_MAESTRO_DETALLE: "01",
            DESCRIPCION: "Activo",
            CAMPO: "Estado",
            VALOR: "A",
            CODIGO_PADRE: null,
            ID_ESTADO: 1,
            estado: "Activo",
            MAESTRO_CABECERA_ID: 94
          },
          {
            ID: 2,
            CODIGO_MAESTRO_DETALLE: "02",
            DESCRIPCION: "Inactivo",
            CAMPO: "Estado",
            VALOR: "I",
            CODIGO_PADRE: null,
            ID_ESTADO: 1,
            estado: "Activo",
            MAESTRO_CABECERA_ID: 94
          },
          {
            ID: 3,
            CODIGO_MAESTRO_DETALLE: "PDF",
            DESCRIPCION: "Documento PDF",
            CAMPO: "Tipo",
            VALOR: "application/pdf",
            CODIGO_PADRE: null,
            ID_ESTADO: 1,
            estado: "Activo",
            MAESTRO_CABECERA_ID: 83
          }
        ],

        // Selected master
        oMaestroSeleccionado: {
          ID: null,
          codigo: "",
          descripcion: ""
        },

        // Form data
        oParametroNuevo: {
          codigoParametro: "",
          descripcionParametro: "",
          campoParametro: "",
          descripcionFull: "",
          id_padre: null,
          valorParametro: "",
          maxLengthDescripcion: 300
        },

        // Search & pagination
        filtroBuscarTablaMaestra: "",
        filtroBuscarDetalle: "",
        paginaActualObtenerCabecera: 1,
        visibleButton: true,
        enabledButtons: true,

        // UI States
        firstLoad: true,
        tablaSeleccionada: null,
        codigoTabla: "",
        descripcionTabla: "",

        // Lists
        listaEstadosRegistro: [
          { key: "1", text: "Activo" },
          { key: "0", text: "Inactivo" }
        ],

        aCodigosAdicionales: [],
        aTablaValoresAdicionalesAsignados: [],
        aCodigosAdicionalesSeleccionados: [],

        // Info
        infoUsuario: {
          email: "user@paltarumi.com",
          nombre: "Usuario Test"
        },

        // Empresa
        codSocElegida: "PALTARUMI"
      };

      return new JSONModel(oData);
    },

    createGlobalModel: function () {
      var oData = {
        modelSociedades: [
          {
            id: 1,
            codigo: "PALTARUMI",
            descripcion: "PALTARUMI S.A.C.",
            empresa: "Pesca y Recursos Marítimos"
          }
        ],
        modelSociedadesGlobalAdministrador: [],
        infoGlobalUsuario: {},
        token: ""
      };

      return new JSONModel(oData);
    }
  };
});
