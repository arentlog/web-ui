'use strict';

/**
 * Meta data for templates of commonly used controls
 */
app.factory('ControlTemplatesMeta', function ControlTemplatesMeta() {

   return {
      OkBtn: {
         "id": "OkBtn",
         "type": "BTN",
         "subType": "TER",
         "icon": "icon-confirm",
         "label": "global.ok",
         "submitForm": true,
         "eventValidated": "alias.submit()"
      },
      CancelBtn: {
         "id": "CancelBtn",
         "type": "BTN",
         "subType": "TER",
         "icon": "icon-cancel",
         "label": "global.cancel"
      },
      NewBtn: {
         "id": "NewBtn",
         "type": "BTN",
         "subType": "TER",
         "icon": "icon-new-document",
         "label": "global.new",
         "stateRef": "^.create",
         "securityLevel": 4
      },
      EditBtn: {
         "id": "EditBtn",
         "type": "BTN",
         "subType": "TER",
         "icon": "icon-edit",
         "label": "global.edit",
         "stateRef": ".edit",
         "securityLevel": 3
      },
      CopyBtn: {
         "id": "CopyBtn",
         "type": "BTN",
         "subType": "TER",
         "icon": "icon-copy",
         "label": "global.copy",
         "eventClick": "changealias.copy()",
         "securityLevel": 4
      },
      DeleteBtn: {
         "id": "DeleteBtn",
         "type": "BTN",
         "subType": "TER",
         "icon": "icon-delete",
         "label": "global.delete",
         "eventClick": "changealias.delete()",
         "securityLevel": 5
      },
      SaveBtn: {
         "id": "SaveBtn",
         "type": "BTN",
         "subType": "TER",
         "icon": "icon-save",
         "label": "global.save",
         "submitForm": true,
         "eventValidated": "changealias.submit()",
         "securityLevel": 3
      },
      ResetBtn: {
         "id": "ResetBtn",
         "type": "BTN",
         "subType": "TER",
         "icon": "icon-reset",
         "label": "global.reset",
         "eventClick": "changealias.reset()"
      },
      AddBtn: {
         "id": "AddBtn",
         "type": "BTN",
         "subType": "MENU",
         "label": "global.add",
         "children": []
      },
      CancelFormBtn: {
         "id": "CancelFormBtn",
         "type": "BTN",
         "subType": "SEC",
         "label": "global.cancel"
      },
      SearchBtn: {
         "id": "SearchBtn",
         "type": "BTN",
         "subType": "PRI",
         "label": "global.search",
         "submitForm": true,
         "eventValidated": "alias.submit()"
      },
      ResetSearchBtn: {
         "id": "ResetSearchBtn",
         "type": "BTN",
         "subType": "TER",
         "label": "global.reset",
         "eventClick": "alias.clear()"
      }
   };

});
