sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox",
  "sap/m/Dialog",
  "sap/m/Button",
  "sap/m/Label",
  "sap/m/Input",
  "sap/m/TextArea",
  "sap/m/Select",
  "sap/ui/core/Item",
  "sap/m/VBox"
], function (
  Controller,
  JSONModel,
  MessageBox,
  Dialog,
  Button,
  Label,
  Input,
  TextArea,
  Select,
  Item,
  VBox
) {
  "use strict";

  return Controller.extend("paltarumi.portalweb.maestro.controller.Detail", {
    
    onInit: function () {
      var oComponent = this.getOwnerComponent();
      var oRouter = oComponent.getRouter();
      
      oRouter.getRoute("RouteDetail").attachPatternMatched(this.onRouteMatched, this);

      var oModel = oComponent.getModel("localModel");
      this.getView().setModel(oModel, "localModel");
    },

    onRouteMatched: function (oEvent) {
      var sMaestroId = oEvent.getParameter("arguments").maestroId;
      var oModel = this.getView().getModel("localModel");
      var aTablaMaestra = oModel.getProperty("/aTablaMaestra");

      var oMaestro = aTablaMaestra.find(function (item) {
        return item.ID == sMaestroId;
      });

      if (oMaestro) {
        oModel.setProperty("/oMaestroSeleccionado", oMaestro);
      }
    },

    onNavBack: function () {
      var oRouter = this.getOwnerComponent().getRouter();
      oRouter.navTo("RouteHome");
    },

    onEditParametro: function (oEvent) {
      var oSource = oEvent.getSource();
      var oContext = oSource.getBindingContext("localModel");
      var oParametro = oContext.getObject();
      var oMaestro = this.getView().getModel("localModel").getProperty("/oMaestroSeleccionado");
      var self = this;

      var oDialog = new Dialog({
        title: "Modificar parámetro para: " + (oMaestro ? oMaestro.descripcion : ""),
        type: "Standard",
        contentWidth: "500px",
        content: [
          new VBox({
            items: [
              new Label({ text: "Código: *" }),
              new Input({
                value: oParametro.CODIGO_MAESTRO_DETALLE,
                enabled: false
              }),
              new Label({ text: "Descripción:" }),
              new TextArea({
                value: oParametro.DESCRIPCION,
                rows: 3
              }),
              new Label({ text: "Campo:" }),
              new Input({
                value: oParametro.CAMPO
              }),
              new Label({ text: "Padre:" }),
              new Input({
                value: oParametro.PADRE || ""
              }),
              new Label({ text: "Valor:" }),
              new Input({
                value: oParametro.VALOR
              }),
              new Label({ text: "Estado:" }),
              new Select({
                items: [
                  new Item({ key: "Activo", text: "Activo" }),
                  new Item({ key: "Inactivo", text: "Inactivo" })
                ],
                selectedKey: "Activo"
              })
            ]
          }).addStyleClass("sapUiSmallMargin")
        ],
        beginButton: new Button({
          text: "Guardar",
          press: function () {
            MessageBox.success("Parámetro guardado correctamente");
            oDialog.close();
          }
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

    onTabSelect: function (oEvent) {
      var sKey = oEvent.getParameter("key");
    },

    onAgregarParametro: function () {
      MessageBox.information("Agregar nuevo parámetro");
    },

    onEliminarParametro: function () {
      MessageBox.confirm("¿Está seguro que desea eliminar este parámetro?");
    }
  });
});
