sap.ui.define([], function () {
  return {
    setVisibleButton: function (view, visible) {
      view.getModel("localModel").setProperty("/visibleButton", visible);
    }
  };
});
