sap.ui.define([
  "sap/ui/core/UIComponent",
  "maestro/model/models"
], function (UIComponent, models) {
  "use strict";

  return UIComponent.extend("maestro.Component", {
    metadata: {
      manifest: "json"
    },

    /**
     * The component is initialized by UI5 automatically during the first instantiation
     * and calls the init method once.
     * @public
     * @override
     */
    init: function () {
      // call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);

      // set the device model
      this.setModel(models.createDeviceModel(), "device");

      // set local model
      this.setModel(models.createLocalModel(), "localModel");

      // set global model
      this.setModel(models.createGlobalModel(), "globalModel");

      // initialize the router (IMPORTANT for routing to work)
      this.getRouter().initialize();
    }
  });
});
