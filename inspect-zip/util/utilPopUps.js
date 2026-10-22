sap.ui.define(["sap/m/MessageBox"], function (MessageBox) {
  return {
    onMessageSuccessDialogPress: function (id, msg, callback) {
      MessageBox.success(msg, { onClose: callback });
    },
    onMessageErrorDialogPress: function (id) {
      MessageBox.error("Error en la operación");
    },
    onMessageWarningDialogPress2: function (id, msg) {
      MessageBox.warning(msg);
    },
    messageBox: function (msg, type, callback) {
      MessageBox.confirm(msg, { onClose: callback });
    }
  };
});
