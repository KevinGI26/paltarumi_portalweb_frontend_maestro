sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("paltarumi.portalweb.maestro.controller.App", {
    onInit: function () {
      var oRouter = this.getOwnerComponent().getRouter();
      oRouter.attachRouteMatched(this.onRouteMatched, this);
    },

    onRouteMatched: function (oEvent) {
      var sRouteName = oEvent.getParameter("name");
      // Handle route changes if needed
      // console.log("Route matched: " + sRouteName);
    }
  });
});
