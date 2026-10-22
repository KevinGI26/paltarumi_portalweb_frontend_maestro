sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/json/JSONModel",
  "sap/m/Dialog",
  "sap/m/Button",
  "sap/m/Text",
  "sap/m/MessageBox",
  "sap/ui/model/Sorter"
], function (
  Controller,
  Filter,
  JSONModel,
  Dialog,
  Button,
  Text,
  MessageBox,
  Sorter
) {
  "use strict";

  return Controller.extend("paltarumi.portalweb.maestro.controller.Home", {
    onInit: function () {
      var oComponent = this.getOwnerComponent();
      var oModel = oComponent.getModel("localModel");
      this.getView().setModel(oModel, "localModel");

      // Initialize local model if not exists
      if (!oModel) {
        oModel = new JSONModel({
          aTablaMaestra: [
            {
              ID: 94,
              codigo: "TM0017",
              descripcion: "Validaciones Registro",
              CODIGO_MAESTRO_CABECERA: "TM0017"
            },
            {
              ID: 95,
              codigo: "TM0002",
              descripcion: "Tipo Archivo",
              CODIGO_MAESTRO_CABECERA: "TM0002"
            },
            {
              ID: 96,
              codigo: "TM0001",
              descripcion: "Tipos de Transacción",
              CODIGO_MAESTRO_CABECERA: "TM0001"
            }
          ],
          aParametros: [
            {
              codigo: "PARAM_001",
              descripcion: "Parámetro de ejemplo 1",
              valor: "Valor 1"
            },
            {
              codigo: "PARAM_002",
              descripcion: "Parámetro de ejemplo 2",
              valor: "Valor 2"
            }
          ],
          oMaestroSeleccionado: {},
          oMaestroNuevo: {},
          filtroBuscarTablaMaestra: "",
          paginaActualObtenerCabecera: 1,
          oControles: {
            btnEliminar: false
          },
          vHomeEnabler: true
        });
        oComponent.setModel(oModel, "localModel");
        this.getView().setModel(oModel, "localModel");
      }
    },

    onMaestroSelect: function (oEvent) {
      var oSource = oEvent.getSource();
      var oBindingContext = oSource.getBindingContext("localModel");

      if (!oBindingContext) {
        MessageBox.error("Error: No hay contexto de binding");
        return;
      }

      var sPath = oBindingContext.getPath();
      var oModel = this.getView().getModel("localModel");
      var oMaestro = oModel.getProperty(sPath);

      if (!oMaestro) {
        MessageBox.error("Error: No se pudo obtener el maestro");
        return;
      }

      console.log("Maestro seleccionado:", oMaestro);

      oModel.setProperty("/oMaestroSeleccionado", oMaestro);
      this.activarControles(1);

      // Navega a la ruta de detalle con el ID
      var oRouter = this.getOwnerComponent().getRouter();
      var iMaestroId = oMaestro.ID;

      if (!iMaestroId) {
        MessageBox.error("Error: El maestro no tiene ID");
        return;
      }

      console.log("Navegando a RouteDetail con ID:", iMaestroId);
      oRouter.navTo("RouteDetail", {
        maestroId: iMaestroId
      }, false);
    },

    onLiveSearch: function (oEvt) {
      var self = this;
      var sQuery = oEvt.getSource().getValue();
      var oModel = this.getView().getModel("localModel");

      if (oEvt.getParameter("clearButtonPressed") == true) {
        oModel.setProperty("/filtroBuscarTablaMaestra", "");
        this.onReloadTablasMaestras();
      } else {
        oModel.setProperty("/filtroBuscarTablaMaestra", sQuery);

        if (sQuery.trim().length > 0) {
          var aFilters = [
            new Filter(
              "codigo",
              "Contains",
              sQuery
            ),
            new Filter(
              "descripcion",
              "Contains",
              sQuery
            )
          ];

          var oBinding = this.getView().byId("list").getBinding("items");
          if (oBinding) {
            oBinding.filter(aFilters, "Application");
          }
        } else {
          var oBinding = this.getView().byId("list").getBinding("items");
          if (oBinding) {
            oBinding.filter([], "Application");
          }
        }
      }
    },

    onAgregarTabla: function () {
      var oModel = this.getView().getModel("localModel");
      oModel.setProperty("/oMaestroNuevo", {});

      MessageBox.information("Agregar nueva tabla");
    },

    onEliminarTabla: function () {
      var oModel = this.getView().getModel("localModel");
      var oMaestroSeleccionado = oModel.getProperty("/oMaestroSeleccionado");

      if (!oMaestroSeleccionado || !oMaestroSeleccionado.ID) {
        MessageBox.error("Debe seleccionar un maestro para eliminar");
        return;
      }

      var oDialog = new Dialog({
        title: "Eliminar tabla",
        type: "Message",
        state: "Warning",
        content: new Text({
          text: "¿Seguro que desea eliminar la maestra '" +
                oMaestroSeleccionado.codigo + "'?"
        }),
        beginButton: new Button({
          text: "Eliminar",
          press: function () {
            var aData = oModel.getProperty("/aTablaMaestra");
            var iIndex = aData.findIndex(function (item) {
              return item.ID === oMaestroSeleccionado.ID;
            });
            if (iIndex > -1) {
              aData.splice(iIndex, 1);
              oModel.setProperty("/aTablaMaestra", aData);
              oModel.setProperty("/oMaestroSeleccionado", {});
              this.activarControles(2);
            }
            oDialog.close();
          }.bind(this)
        }),
        endButton: new Button({
          text: "Cancelar",
          press: function () {
            oDialog.close();
          }
        }),
        afterClose: function () {
          oDialog.destroy();
        }
      });

      oDialog.open();
    },

    onReloadTablasMaestras: function () {
      var oModel = this.getView().getModel("localModel");
      this.getView().byId("list").removeSelections();
      oModel.setProperty("/filtroBuscarTablaMaestra", "");
      oModel.setProperty("/paginaActualObtenerCabecera", 1);
      oModel.setProperty("/oMaestroSeleccionado", {});
      this.activarControles(2);
    },

    activarControles: function (opcion) {
      var oModel = this.getView().getModel("localModel");
      if (opcion === 1) {
        oModel.setProperty("/oControles/btnEliminar", true);
      }
      if (opcion === 2) {
        oModel.setProperty("/oControles/btnEliminar", false);
      }
    }
  });
});
