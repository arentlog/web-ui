'use strict';

/**
 * Meta data about different control types.
 */
app.factory('ControlMeta', function ControlMeta() {

   return {
      ACTION_PANEL: {
         displayName: 'wysiwyg.control.contextual.action.panel',
         codeName: 'cap',
         dropInside: false
      },
      ACTION_PANEL_BODY: {
         displayName: 'wysiwyg.control.contextual.action.panel.body',
         codeName: 'capbody',
         dropInside: true
      },
      BTN: {
         displayName: 'wysiwyg.control.button',
         newLabel: 'Button',
         codeName: 'btn',
         dropInside: ['MENU_OPT']
      },
      BTN_SET: {
         displayName: 'wysiwyg.control.button.set',
         codeName: 'btnset',
         dropInside: ['BTN']
      },
      CARD: {
         displayName: 'wysiwyg.control.card',
         newLabel: 'New Card',
         codeName: 'card',
         dropInside: true
      },
      CHART: {
         displayName: 'wysiwyg.control.chart',
         newLabel: 'global.chart',
         codeName: 'chart',
         dropInside: false
      },
      COL: {
         displayName: 'wysiwyg.control.column',
         codeName: 'col',
         dropInside: true
      },
      COMP_FLD: {
         displayName: 'wysiwyg.control.compound.field',
         codeName: 'compfld',
         dropInside: ['BTN', 'FIELD']
      },
      CONTEXT_FIELD: {
         displayName: 'wysiwyg.control.context.field',
         codeName: 'cntxfld',
         dropInside: false
      },
      // A div element for use as a container
      CONTAINER: {
         displayName: 'wysiwyg.control.container',
         codeName: 'cont',
         dropInside: true
      },
      CUSTOM: {
         displayName: 'wysiwyg.control.custom',
         codeName: 'custom',
         dropInside: false
      },
      DIRECTIVE: {
         displayName: 'wysiwyg.control.directive',
         codeName: 'directive',
         dropInside: false
      },
      EXP_AREA: {
         displayName: 'wysiwyg.control.expandable.area',
         newLabel: 'New Expandable Area',
         codeName: 'area',
         dropInside: false, // need to drop above/below (exp areas default with a row and column, so can drop in there)
         namedControls: {
            visiblePane: 'EXP_VIS_PANE'
         }
      },
      EXP_VIS_PANE: {
         displayName: 'wysiwyg.control.expandable.visible.pane',
         codeName: 'vispane',
         dropInside: true
      },
      FIELD: {
         displayName: 'wysiwyg.control.field',
         newLabel: 'New Field',
         codeName: 'field',
         dropInside: false
      },
      FIELD_SET: {
         displayName: 'wysiwyg.control.field.set',
         newLabel: 'New Field Set',
         codeName: 'fieldset',
         dropInside: true
      },
      FORM: {
         displayName: 'wysiwyg.control.form',
         codeName: 'form',
         dropInside: true
      },
      GRID: {
         displayName: 'wysiwyg.control.grid',
         codeName: 'grid',
         dropInside: ['GRID_COL'],
         namedControls: {
            toolbar: 'TOOLBAR'
         }
      },
      GRID_COL: {
         displayName: 'wysiwyg.control.grid.column',
         newLabel: 'Column',
         codeName: 'col',
         dropInside: false,
         allowedParents: ['GRID']
      },
      HTML_CONTROL: {
         displayName: 'wysiwyg.control.html',
         newLabel: 'New Control',
         codeName: 'html',
         dropInside: false
      },
      IMAGE: {
         displayName: 'wysiwyg.control.image',
         newLabel: 'global.image',
         codeName: 'img',
         dropInside: false
      },
      LIST_VIEW: {
         displayName: 'wysiwyg.control.list.view',
         codeName: 'list',
         dropInside: false
      },
      MENU_OPT: {
         displayName: 'wysiwyg.control.menu.option',
         newLabel: 'Option',
         codeName: 'opt',
         dropInside: false,
         allowedParents: ['BTN', 'MENU_OPT']
      },
      MESSAGE: {
         displayName: 'wysiwyg.control.message',
         newLabel: 'New Message',
         codeName: 'msg',
         dropInside: false
      },
      MODAL: {
         displayName: 'wysiwyg.control.modal',
         codeName: 'modal',
         dropInside: false
      },
      MODAL_BODY: {
         displayName: 'wysiwyg.control.modal.body',
         codeName: 'modalbody',
         dropInside: true
      },
      MOD_CNTR: {
         displayName: 'wysiwyg.control.module.container',
         codeName: 'mod',
         dropInside: false,
         namedControls: {
            toolbar: 'TOOLBAR',
            content: 'MOD_CONTENT',
            sidebar: 'MOD_SIDEBAR'
         }
      },
      MOD_CONTENT: {
         displayName: 'wysiwyg.control.module.content',
         codeName: 'content',
         dropInside: true,
         namedControls: {
            contentHeader: 'MOD_CONTENT_HDR'
         }
      },
      MOD_CONTENT_HDR: {
         displayName: 'wysiwyg.control.module.content.header',
         codeName: 'contenthdr',
         dropInside: true
      },
      MOD_SIDEBAR: {
         displayName: 'wysiwyg.control.module.sidebar',
         newLabel: 'New Sidebar',
         codeName: 'sidebar',
         dropInside: true,
         namedControls: {
            content: 'MOD_SIDEBAR_CONTENT',
            footer: 'MOD_SIDEBAR_FOOTER'
         }
      },
      MOD_SIDEBAR_CONTENT: {
         displayName: 'wysiwyg.control.module.sidebar.content',
         codeName: 'sidebarcnt',
         dropInside: true
      },
      MOD_SIDEBAR_FOOTER: {
         displayName: 'wysiwyg.control.module.sidebar.footer',
         codeName: 'sidebarftr',
         dropInside: true
      },
      OPT: {
         displayName: 'wysiwyg.control.option',
         newLabel: 'New Option',
         codeName: 'opt',
         dropInside: false
      },
      POPDOWN: {
         displayName: 'wysiwyg.control.popdown',
         codeName: 'popdown',
         dropInside: true
      },
      ROW: {
         displayName: 'wysiwyg.control.row',
         codeName: 'row',
         dropInside: false
      },
      SUB_VIEW: {
         displayName: 'wysiwyg.control.sub.view',
         codeName: 'subview',
         dropInside: false
      },
      SWAP_LIST: {
         displayName: 'wysiwyg.control.swap.list',
         codeName: 'swaplist',
         dropInside: ['SWAP_LIST_LIST']
      },
      // An individual list within a Swap List control
      SWAP_LIST_LIST: {
         displayName: 'wysiwyg.control.list',
         newLabel: 'New Swap List',
         codeName: 'list',
         allowedParents: ['SWAP_LIST']
      },
      TAB: {
         displayName: 'wysiwyg.control.tab',
         newLabel: 'New Tab',
         codeName: 'tab',
         dropInside: true
      },
      TAB_SET: {
         displayName: 'wysiwyg.control.tab.set',
         codeName: 'tabset',
         dropInside: false
      },
      TOOLBAR: {
         displayName: 'wysiwyg.control.toolbar',
         newLabel: 'New Toolbar',
         codeName: 'toolbar',
         dropInside: ['BTN'],
         namedControls: {
            navBtns: 'BTN_SET'
         }
      },
      VIEW: {
         displayName: 'wysiwyg.control.view',
         codeName: 'view',
         dropInside: true
      },
      VIEW_CNTR: {
         displayName: 'wysiwyg.control.view.container',
         codeName: 'viewcont',
         dropInside: false
      },
      WIZARD: {
         displayName: 'wysiwyg.control.wizard',
         codeName: 'wizard',
         dropInside: ['WIZARD_TICK']
      },
      WIZARD_TICK: {
         displayName: 'wysiwyg.control.wizard.tick',
         newLabel: 'New Wizard Tick',
         codeName: 'tick',
         dropInside: false,
         allowedParents: ['WIZARD']
      }
   };

});
