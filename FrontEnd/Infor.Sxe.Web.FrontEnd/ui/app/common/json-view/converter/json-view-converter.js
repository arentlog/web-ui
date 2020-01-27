'use strict';

app.factory('JsonViewConverter', function JsonViewConverter($translate, ControlMeta, CustomControls, FieldFormats, Utils) {

   /* Mode constants */
   var DEV = 'dev';
   var EXTEND = 'extend'; // extending a default view
   var EXTEND_NEW = 'extend-new'; // new extension view
   var PERSONALIZE = 'personalize';
   var LIVE = 'live';

   // Field size class maps (medium is the default, except dates are small by default so input size has input-md class)
   var inputSizeClassMap = {XS: 'input-xs', SM: 'input-sm', MD: 'input-md', LG: 'input-lg'};
   var textAreaSizeClassMap = {XS: 'textarea-xs', SM: 'textarea-sm', MD: '', LG: 'textarea-lg', FULL: 'textarea-full'};
   var dropDownSizeClassMap = {XS: 'dropdown-xs', SM: 'dropdown-sm', MD: '', LG: 'dropdown-lg'};

   // Field height class maps
   var textAreaHeightClassMap = {LG: 'textarea-height-lg', XL: 'textarea-height-xl'};

   // Button class map
   var btnClassMap = {
      ICON: 'btn-icon',
      MENU: 'btn-menu',
      PRI: 'btn-primary',
      SEC: 'btn-secondary',
      TER: 'btn-tertiary',
      ACT: 'btn-actions',
      // Note: We don't use the built-in SoHo modal primary button disabling since have our own form validation handling
      MODAL_PRI: 'btn-modal-primary no-validation',
      MODAL_SEC: 'btn-modal'
   };

   // Icon class map (SoHo has styles for certain "alert" icons)
   var iconClassMap = {
      'icon-alert': 'icon-alert',
      'icon-confirm': 'icon-confirm',
      'icon-empty-circle': 'icon-empty-circle',
      'icon-dirty': 'icon-dirty',
      'icon-error': 'icon-error',
      'icon-info': 'icon-info',
      'icon-pending': 'icon-pending',
      'icon-new': 'icon-new',
      'icon-in-progress': 'icon-in-progress',
      'icon-info-field': 'icon-info-field'
   };

   // Column span class map
   var columnClassMap = {
      '1/12': 'one',
      '1/6': 'two',
      '1/4': 'three',
      '1/3': 'four',
      '5/12': 'five',
      '1/2': 'six',
      '7/12': 'seven',
      '2/3': 'eight',
      '3/4': 'nine',
      '5/6': 'ten',
      '11/12': 'eleven',
      '1': 'twelve'
   };

   // Mock grid alignment class map
   var mockGridAlignClass = {CHECKBOX: 'l-center-text', CURRENCY: 'l-right-text', DECIMAL: 'l-right-text', INTEGER: 'l-right-text', PERCENT: 'l-right-text'};

   /**
    * Constructor, with class name
    */
   function JsonViewConverter(viewPath, mode) {
      // Public properties, assigned to the instance ('this')
      this.controlIdToControlMap = {};
      this.controlIdToParentMap = {};
      this.viewPath = viewPath || '';
      this.viewId = null; // Populated upon initial build
      this.transientHtmlIdPrefix = null; // Populated upon initial build

      // Mode
      this.devMode = mode === DEV;
      this.extendMode = mode === EXTEND;
      this.extendNewMode = mode === EXTEND_NEW;
      this.personalizeMode = mode === PERSONALIZE;
      this.liveMode = mode === LIVE;

      // Array of control ids that are included in the view (excludes controls left out via personalization)
      this.controlIds = [];

      /**
       * Initialize the "maxId" which is the highest used id in this view (used to generate next id for new controls).
       *
       * Control ids are integers that are unique for a certain json view.
       * We have rules in place in order to avoid duplicate ids when controls are added through extensibility.
       *
       * Number Ranges:
       *
       * Development (default json): 1-5000 (also for new views via extensions)
       * Extension (customer mods): 5001-10000
       * Personalize (user tweaks): 10001-15000 (for future use in case we want to allow new controls in personalization)
       */
      if (this.devMode || this.extendNewMode) {
         this.maxId = 0; // init to 0 so that first new one will be 1
      } else if (this.extendMode) {
         this.maxId = 5000; // init to 5000 so that first new one will be 5001
      } else if (this.personalizeMode) {
         this.maxId = 10000; // init to 10000 so that first new one will be 10001
      } else {
         this.maxId = 0; // live mode
      }

      //TODO this.getParent(controlId) convenience methods
   }

   /* Public methods */

   /**
    * Initial call to build and return the full HTML
    */
   JsonViewConverter.prototype.getHtml = function (view, webExtRowId, webModRowId) {
      var viewId = view.viewId || '';

      // Store on this converter
      this.viewId = viewId;
      this.webExtRowId = webExtRowId;
      this.webModRowId = webModRowId;

      // Remove module- from viewId for prefix
      var prefix = viewId.substr(viewId.indexOf('-') + 1);

      // Create temporary prefix (since SoHo fields require an id to match with the label)
      // Note: Adding a random number so no one writes code based on these ids
      this.transientHtmlIdPrefix = prefix + '-' + Date.now() + '-';

      return this.buildControl(view);
   };

   JsonViewConverter.prototype.buildControl = function (control, parent) {
      var html;
      var type = control.type;
      var subType = control.subType;

      // Map control id to control object and parent object for easy access by id
      if (!this.liveMode) {
         this.controlIdToControlMap[control.id] = control;
         this.controlIdToParentMap[control.id] = parent;
      }

      // Skip extra/hidden fields when in live mode
      if (control.extra && this.liveMode) {
         return '';
      }

      // Collect ids of in-use controls for view directive
      if (this.liveMode) {
         this.controlIds.push(control.id);
      }

      // Call the build function of the control (for better performance, order this list by most common controls)
      switch (type) {
         case 'FIELD':
            if (subType === 'INFO') {
               html = this.buildInfoField(control, parent); break;
            } else if (subType === 'RADIO_SET') {
               html = this.buildRadioSet(control, parent); break;
            } else {
               html = this.buildField(control, parent); break;
            }
         case 'COL':
            html = this.buildColumn(control, parent); break;
         case 'ROW':
            html = this.buildRow(control, parent); break;
         case 'OPT':
            html = this.buildOption(control, parent); break;
         case 'MENU_OPT':
            html = this.buildMenuOption(control, parent); break;
         case 'BTN':
            html = this.buildButton(control, parent); break;
         case 'BTN_SET':
            html = this.buildButtonSet(control, parent); break;
         case 'EXP_AREA':
            html = this.buildExpandableArea(control, parent); break;
         case 'EXP_VIS_PANE':
            html = this.buildExpandableVisiblePane(control, parent); break;
         case 'COMP_FLD':
            html = this.buildCompoundField(control, parent); break;
         case 'TOOLBAR':
            html = this.buildToolbar(control, parent); break;
         case 'GRID':
            html = this.buildGrid(control, parent); break;
         case 'FIELD_SET':
            html = this.buildFieldSet(control, parent); break;
         case 'TAB':
            html = this.buildTab(control, parent); break;
         case 'TAB_SET':
            html = this.buildTabSet(control, parent); break;
         case 'FORM':
            html = this.buildForm(control, parent); break;
         case 'CARD':
            html = this.buildCard(control, parent); break;
         case 'CONTAINER':
            html = this.buildContainer(control, parent); break;
         case 'CUSTOM':
            html = this.buildCustomControl(control, parent); break;
         case 'VIEW':
            html = this.buildView(control, parent); break;
         case 'VIEW_CNTR':
            html = this.buildViewContainer(control, parent); break;
         case 'SUB_VIEW':
            html = this.buildSubView(control, parent); break;
         case 'MOD_CNTR':
            html = this.buildModuleContainer(control, parent); break;
         case 'MOD_CONTENT':
            html = this.buildModuleContent(control, parent); break;
         case 'MOD_CONTENT_HDR':
            html = this.buildModuleContentHeader(control, parent); break;
         case 'MOD_SIDEBAR':
            html = this.buildModuleSidebar(control, parent); break;
         case 'MOD_SIDEBAR_CONTENT':
            html = this.buildModuleSidebarContent(control, parent); break;
         case 'MOD_SIDEBAR_FOOTER':
            html = this.buildModuleSidebarFooter(control, parent); break;
         case 'LIST_VIEW':
            html = this.buildListView(control, parent); break;
         case 'POPDOWN':
            html = this.buildPopdown(control, parent); break;
         case 'MESSAGE':
            html = this.buildMessage(control, parent); break;
         case 'MODAL':
            html = this.buildModal(control, parent); break;
         case 'MODAL_BODY':
            html = this.buildModalBody(control, parent); break;
         case 'ACTION_PANEL':
            html = this.buildActionPanel(control, parent); break;
         case 'ACTION_PANEL_BODY':
            html = this.buildActionPanelBody(control, parent); break;
         case 'SWAP_LIST':
            html = this.buildSwapList(control, parent); break;
         case 'SWAP_LIST_LIST':
            html = this.buildSwapListList(control, parent); break;
         case 'WIZARD':
            html = this.buildWizard(control, parent); break;
         case 'WIZARD_TICK':
            html = this.buildWizardTick(control, parent); break;
         case 'CONTEXT_FIELD':
            html = this.buildContextField(control, parent); break;
         case 'CHART':
            html = this.buildChart(control, parent); break;
         case 'IMAGE':
            html = this.buildImage(control, parent); break;
         case 'DIRECTIVE':
            html = this.buildDirective(control, parent); break;
         case 'HTML_CONTROL':
            html = this.buildHtmlControl(control, parent); break;
         case 'GRID_COL':
            // This is not used for live mode (only dev, etc.)
            html = this.buildGridColumn(control, parent); break;
         default:
            html = '';
            console.log('Error: A control of type "' + type + '" was found which we do not have an implementation for.');
      }

      return html;
   };

   JsonViewConverter.prototype.buildChildren = function (control) {
      var html = '';
      if (control.children) {
         for (var i = 0; i < control.children.length; i++) {
            html += this.buildControl(control.children[i], control);
         }
      }
      return html;
   };

   JsonViewConverter.prototype.buildView = function (view) {
      // View metadata
      var jsonViewPathData = this.liveMode ? ' data-json-view-path="' + this.viewPath + '" ' : '';
      var jsonViewIdData = this.liveMode ? ' data-json-view-id="' + this.viewId + '" ' : '';
      var webExtData = this.webExtRowId ? ' data-extension-row-id="' + this.webExtRowId + '" ' : '';
      var webModData = this.webModRowId ? ' data-personalization-row-id="' + this.webModRowId + '" ' : '';

      // Conditions, properties, etc.
      var viewDirective = this.liveMode ? ' view ' : '';
      var controlRef = this.liveMode && view.controlRef ? ' data-control-ref="' + view.controlRef + '" ' : '';
      var onReady = this.liveMode && view.eventReady ? ' data-on-ready="' + view.eventReady + '" ' : '';
      var ngShow = this.liveMode && view.conditionShow ? ' ng-show="' + view.conditionShow + '" ' : '';
      var formReadonly = this.liveMode && view.conditionReadonly ? ' form-readonly="' + view.conditionReadonly + '" ' : '';
      var controller = this.liveMode && view.controller ? ' ng-controller="' + view.controller + '" ' : '';
      var hotKeys = this.liveMode && view.hotKeys ? ' hot-keys=\'' + serialize(view.hotKeys, true) + '\' ' : '';

      var html = '<div ' + this.getDataIdAttr(view) + this.getClassAttr(view, 'view') + jsonViewPathData + jsonViewIdData + webExtData + webModData + viewDirective + controlRef + onReady + ngShow + formReadonly + controller + hotKeys + ' initialize ';

      var controlToolbarHtml = this.getControlToolbar(view, true);
      var childrenHtml = this.buildChildren(view);

      // Now that all children have been built, add control ids for view directive
      if (this.liveMode) {
         html += ' data-control-ids="' + JSON.stringify(this.controlIds) + '" ';
      }

      return html + '>' + controlToolbarHtml + childrenHtml + '</div>';
   };

   JsonViewConverter.prototype.buildModal = function (modal) {
      var body = modal.controls ? modal.controls.body : null;
      var btnSet = modal.controls ? modal.controls.btnSet : null;
      var label = escapeHtml(modal.label);
      var isLabelDynamic = label && label.startsWith('{{');
      var translateLabel = !modal.isLabelFromUser && !isLabelDynamic;

      // View metadata
      var jsonViewPathData = this.liveMode ? ' data-json-view-path="' + this.viewPath + '" ' : '';
      var jsonViewIdData = this.liveMode ? ' data-json-view-id="' + this.viewId + '" ' : '';
      var webExtData = this.webExtRowId ? ' data-extension-row-id="' + this.webExtRowId + '" ' : '';
      var webModData = this.webModRowId ? ' data-personalization-row-id="' + this.webModRowId + '" ' : '';

      // Conditions, properties, etc.
      var formReadonly = this.liveMode && modal.conditionReadonly ? ' form-readonly="' + modal.conditionReadonly + '" ' : '';
      var controller = this.liveMode && modal.controller ? ' ng-controller="' + modal.controller + '" ' : '';
      var hotKeys = this.liveMode && modal.hotKeys ? ' hot-keys=\'' + serialize(modal.hotKeys, true) + '\' ' : '';

      // Only add class in live mode because can't see properly in wysiwyg
      var modalClass = this.liveMode ? 'modal' : 'mock-modal';

      var html = '<div ' + this.getDataIdAttr(modal) + this.getClassAttr(modal, modalClass) + jsonViewPathData + jsonViewIdData + webExtData + webModData + hotKeys + ' initialize>';
      html += this.getControlToolbar(modal);

      // All modals automatically come with a form because we want it to wrap the body and the buttons in order for the submit button to work
      // All modals come with busy class so that busy DataService calls can apply indicator to modal if it's open
      html += '<form class="modal-content busy" novalidate data-validate-on="submit" ' + (this.liveMode ? ' form-control ' : '') + formReadonly + controller + ' data-options="{blockUI: true, displayDelay: 100}">';

      // Header
      html += '<div class="modal-header">';
      html += '<h1 class="modal-title" ' + (translateLabel ? 'translate' : '') + '>' + label + '</h1>';

      // Add our view-actions-button to all modals for the user to personalize the view (unless personalizable set to false)
      if (this.liveMode && modal.personalizable !== false) {
         html += '<view-actions-button data-view-path="' + this.viewPath + '"></view-actions-button>';
      }

      html += '</div>';

      html += '<div class="modal-body-wrapper">';

      // Body
      if (body) {
         html += this.buildControl(body, modal);
      }

      html += '</div>';

      // Button set
      if (btnSet) {
         html += this.buildControl(btnSet, modal);
      }

      html += '</form>';

      return html + '</div>';
   };

   JsonViewConverter.prototype.buildModalBody = function (control) {
      var html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'modal-body') + '>';
      html += this.getControlToolbar(control);
      html += this.buildChildren(control);
      return html + '</div>';
   };

   JsonViewConverter.prototype.buildActionPanel = function (control) {
      var body = control.controls ? control.controls.body : null;
      var toolbar = control.controls ? control.controls.toolbar : null;

      // View metadata
      var jsonViewPathData = this.liveMode ? ' data-json-view-path="' + this.viewPath + '" ' : '';
      var jsonViewIdData = this.liveMode ? ' data-json-view-id="' + this.viewId + '" ' : '';
      var webExtData = this.webExtRowId ? ' data-extension-row-id="' + this.webExtRowId + '" ' : '';
      var webModData = this.webModRowId ? ' data-personalization-row-id="' + this.webModRowId + '" ' : '';

      // Conditions, properties, etc.
      var formReadonly = this.liveMode && control.conditionReadonly ? ' form-readonly="' + control.conditionReadonly + '" ' : '';
      var controller = this.liveMode && control.controller ? ' ng-controller="' + control.controller + '" ' : '';
      var hotKeys = this.liveMode && control.hotKeys ? ' hot-keys=\'' + serialize(control.hotKeys, true) + '\' ' : '';

      // Only add modal class in live mode because can't see properly in wysiwyg
      var modalClass = this.liveMode ? 'modal' : 'mock-modal';

      var html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'contextual-action-panel ' + modalClass) + jsonViewPathData + jsonViewIdData + webExtData + webModData + hotKeys + ' initialize>';
      html += this.getControlToolbar(control);

      // All caps automatically come with a form because we want it to wrap the body and the buttons in order for the submit button to work
      // All caps come with busy class so that busy DataService calls can apply indicator to modal if it's open
      html += '<form class="modal-content busy" novalidate data-validate-on="submit" ' + (this.liveMode ? ' form-control ' : '') + formReadonly + controller + ' data-options="{blockUI: true, displayDelay: 100}">';

      // Header & Toolbar
      html += '<div class="modal-header">';
      if (toolbar) {
         html += this.buildControl(toolbar, control);
      }
      html += '</div>';

      // Body
      html += '<div class="modal-body-wrapper">';
      if (body) {
         html += this.buildControl(body, control);
      }
      html += '</div>';

      html += '</form>';

      return html + '</div>';
   };

   JsonViewConverter.prototype.buildActionPanelBody = function (control) {
      var html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'modal-body') + '>';
      html += this.getControlToolbar(control);
      html += this.buildChildren(control);
      return html + '</div>';
   };

   JsonViewConverter.prototype.buildViewContainer = function (control) {
      var html = '';
      var uiViewName = control.viewName || '';

      if (this.liveMode) {
         var ngShow = this.liveMode && control.conditionShow ? ' ng-show="' + control.conditionShow + '" ' : '';

         html += '<div ' + this.getClassAttr(control, 'view-container') + ' ui-view="' + uiViewName + '" ' + ngShow + '></div>';
      } else if (this.devMode || this.extendMode || this.extendNewMode) {
         html += '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'view-container') + '>';
         html += this.getControlToolbar(control);
         html += '<span>View Container' + (uiViewName ? ' (' + uiViewName + ')' : '') + '</span>';
         html += '</div>';
      } else {
         // don't show view containers during personalization (since don't want these moved or modified)
      }

      return html;
   };

   JsonViewConverter.prototype.buildSubView = function (subView) {
      var html = '';
      var viewPath = subView.viewPath;

      if (this.liveMode) {
         var ngShow = this.liveMode && subView.conditionShow ? ' ng-show="' + subView.conditionShow + '" ' : '';
         var ngIf = this.liveMode && subView.conditionInclude ? ' ng-if="' + subView.conditionInclude + '" ' : '';

         // Variable path (curly braces become simple reference) or static path (add single quote string chars)
         var view = viewPath.startsWith('{{') ? viewPath.replace('{{', '').replace('}}', '') : '\'' + viewPath + '\'';

         // Lazy load the sub view (when containing tab activated) unless set to false (the default is yes)
         var lazyLoad = subView.lazyLoad !== false ? ' data-lazy-load="true" ' : '';

         html += '<div ' + this.getClassAttr(subView, 'sub-view') + ' include-view="' + view + '" data-type="' + (subView.subType || '') + '" data-controller="' + (subView.controller || '') + '" ' + lazyLoad + ngShow + ngIf + '></div>';
      } else {
         html += '<div ' + this.getDataIdAttr(subView) + this.getClassAttr(subView, 'sub-view') + '>';
         html += this.getControlToolbar(subView);
         html += '<span translate>wysiwyg.control.sub.view</span>';
         html += '</div>';
      }

      return html;
   };

   JsonViewConverter.prototype.buildCustomControl = function (control) {
      var html;
      var meta = CustomControls[control.subType];

      if (meta) {
         if (this.liveMode) {
            // Use custom build method, or standard usage of a directive
            if (meta.buildControl) {
               html = meta.buildControl(control);
            } else {
               var jsonView = meta.jsonView ? ' data-view="' + meta.jsonView + '" ' : '';
               var viewType = meta.jsonView ? ' data-view-type="JSON" ' : '';
               var controller = meta.controller ? ' data-controller="' + meta.controller + '" ' : '';
               var options = control.options ? ' data-options=\'' + serialize(control.options) + '\' ' : '';
               var ngShow = this.liveMode && control.conditionShow ? ' ng-show="' + control.conditionShow + '" ' : '';
               var ngIf = this.liveMode && control.conditionInclude ? ' ng-if="' + control.conditionInclude + '" ' : '';

               // Use control-specific directive or the standard custom control directive
               var directive = meta.directive || 'custom-control';

               html = '<' + directive + this.getClassAttr(control) + jsonView + viewType + controller + options + ngShow + ngIf + '></' + directive + '>';
            }
         } else {
            html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'custom-control') + '>';
            html += this.getControlToolbar(control);
            html += '<span translate>' + meta.displayName + '</span>';
            if (meta.displayLabelFromInstance) {
               var instanceLabel = Utils.getNestedValue(control, meta.displayLabelFromInstance);
               html += instanceLabel ? ' - <span translate>' + instanceLabel + '</span>' : '';
            }
            html += '</div>';
         }
      } else {
         html = '';
         console.log('Error: A custom control "' + control.subType + '" was found which we do not have an implementation for.');
      }

      return html;
   };

   JsonViewConverter.prototype.buildDirective = function (control) {
      var html;

      if (this.liveMode) {
         var attrs = control.attrs;
         var elementName = control.elementName;
         var ngShow = this.liveMode && control.conditionShow ? ' ng-show="' + control.conditionShow + '" ' : '';

         html = '<' + elementName + this.getClassAttr(control) + ngShow;

         // Add attributes from attrs object
         if (attrs) {
            for (var prop in attrs) {
               if (attrs.hasOwnProperty(prop)) {
                  html += ' ' + prop + '="' + (attrs[prop] || '') + '" ';
               }
            }
         }

         html += '></' + elementName + '>';
      } else {
         html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'directive') + '>';
         html += this.getControlToolbar(control);
         html += '<span translate>' + 'wysiwyg.control.directive</span> <span>(' + control.elementName + ')</span>';
         html += '</div>';
      }

      return html;
   };

   JsonViewConverter.prototype.buildHtmlControl = function (control) {
      var html;

      if (this.liveMode) {
         html = control.value || '';
      } else {
         html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'html-control') + '>';
         html += this.getControlToolbar(control);
         html += '<span translate>wysiwyg.control.html</span>';
         if (control.label) {
            html += ' - <span translate>' + control.label + '</span>';
         }
         html += '</div>';
      }

      return html;
   };

   JsonViewConverter.prototype.buildForm = function (form) {
      // Conditions
      var formDirective = this.liveMode ? ' form-control ' : '';
      var controlRef = this.liveMode && form.controlRef ? ' data-control-ref="' + form.controlRef + '" ' : '';
      var onReady = this.liveMode && form.eventReady ? ' data-on-ready="' + form.eventReady + '" ' : '';
      var formReadonly = this.liveMode && form.conditionReadonly ? ' form-readonly="' + form.conditionReadonly + '" ' : '';
      var ngShow = this.liveMode && form.conditionShow ? ' ng-show="' + form.conditionShow + '" ' : '';

      // Note: We use the html5 "novalidate" attribute on all our forms in order to turn off built-in browser validation.
      //       Soho handles our validation, and there was an issue in IE11 with lookup fields and maxlength validation.

      var html = '<form ' + this.getDataIdAttr(form) + this.getClassAttr(form) + ' novalidate data-validate-on="submit" ' + formDirective + controlRef + onReady + formReadonly + ngShow + '>';
      html += this.getControlToolbar(form, true);
      html += this.buildChildren(form);
      return html + '</form>';
   };

   JsonViewConverter.prototype.buildCard = function (control) {
      var actionsBtn = control.controls ? control.controls.actions : null;
      var label = escapeHtml(control.label);
      var isLabelDynamic = label && label.startsWith('{{');
      var translateLabel = !control.isLabelFromUser && !isLabelDynamic;
      var hasHeader = (label || actionsBtn) ? true : false;

      // Show something for dynamic labels when not live mode
      if (isLabelDynamic && !this.liveMode) {
         label = 'wysiwyg.sample.label.dynamic';
         translateLabel = true;
      }

      // Conditions
      var ngShow = this.liveMode && control.conditionShow ? ' ng-show="' + control.conditionShow + '" ' : '';

      var html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'card') + ngShow + '>';
      html += this.getControlToolbar(control);

      // Header
      if (hasHeader) {
         html += '<div class="card-header">';
         html += '<h2 class="widget-title" ' + (translateLabel ? 'translate' : '') + '>' + (label || '') + '</h2>';

         // Actions button
         if (actionsBtn) {
            html += this.buildControl(actionsBtn, control);
         }

         html += '</div>';
      }

      // Content (markup depends on if has header)
      if (hasHeader) {
         html += '<div class="card-content">';
         html += this.buildChildren(control);
         html += '</div>';
      } else {
         html += this.buildChildren(control);
      }

      return html + '</div>';
   };

   JsonViewConverter.prototype.buildContainer = function (control) {
      // Conditions
      var ngShow = this.liveMode && control.conditionShow ? ' ng-show="' + control.conditionShow + '" ' : '';

      var html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'container') + ngShow + '>';
      html += this.getControlToolbar(control);
      html += this.buildChildren(control);
      return html + '</div>';
   };

   JsonViewConverter.prototype.buildTabSet = function (tabSet) {
      var tabs = tabSet.children;

      // Conditions, properties, etc.
      var tabsDirective = this.liveMode ? ' tabs ' : '';
      var tabSecurityDirective = this.liveMode ? ' tab-security ' : '';
      var ngShow = this.liveMode && tabSet.conditionShow ? ' ng-show="' + tabSet.conditionShow + '" ' : '';
      var controlRef = this.liveMode && tabSet.controlRef ? ' data-control-ref="' + tabSet.controlRef + '" ' : '';
      var onReady = this.liveMode && tabSet.eventReady ? ' data-on-ready="' + tabSet.eventReady + '" ' : '';

      var html = '<div ' + this.getDataIdAttr(tabSet) + this.getClassAttr(tabSet, 'tab-container') + tabsDirective + tabSecurityDirective + ngShow + controlRef + onReady + '>';
      html += this.getControlToolbar(tabSet);

      // Build tab headings
      html += '<ul class="tab-list">';
      if (tabs) {
         for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            var label = escapeHtml(tab.label);
            var isLabelDynamic = label && label.startsWith('{{');
            var translateLabel = !tab.isLabelFromUser && !isLabelDynamic;

            // Show something for dynamic labels when not live mode
            if (isLabelDynamic && !this.liveMode) {
               label = 'wysiwyg.sample.label.dynamic';
               translateLabel = true;
            }

            // Conditions, properties, etc. on individual tabs
            var tabDirective = this.liveMode ? ' tab ' : '';
            var selectedIf = this.liveMode && tab.conditionSelected ? ' selected-if="' + tab.conditionSelected + '" ' : '';
            var onActivated = this.liveMode && tab.eventActivated ? ' data-activated="' + tab.eventActivated + '" ' : '';
            var showIf = this.liveMode && tab.conditionShow ? ' show-if="' + tab.conditionShow + '" ' : '';

            // Attach sub function and tab id to element for use in directives
            var subFunction = tab.subFunction ? ' data-sub-function="' + tab.subFunction + '" ' : '';
            var tabId = tab.tabId ? ' data-tab-id="' + tab.tabId + '" ' : '';

            html += '<li class="tab" ' + tabDirective + subFunction + tabId + selectedIf + showIf + '><a href="#' + this.getHtmlId(tab, true) + '" ' + onActivated + (translateLabel ? 'translate' : '') + '>' + label + '</a></li>';
         }
      }
      html += '</ul>';

      // Build tabs
      html += this.buildChildren(tabSet);

      return html + '</div>';
   };

   JsonViewConverter.prototype.buildTab = function (tab) {
      // Attach sub function name to element for use in directives
      var subFunction = tab.subFunction ? ' data-sub-function="' + tab.subFunction + '" ' : '';

      var html = '<div ' + this.getDataIdAttr(tab) + this.getHtmlId(tab) + this.getClassAttr(tab, 'tab-panel') + subFunction + '>';
      html += this.getControlToolbar(tab);
      html += this.buildChildren(tab);
      return html + '</div>';
   };

   JsonViewConverter.prototype.buildModuleContainer = function (container) {
      var toolbar = container.controls.toolbar;
      var content = container.controls.content;
      var sidebar = container.controls.sidebar;

      // Conditions
      var ngShow = this.liveMode && container.conditionShow ? ' ng-show="' + container.conditionShow + '" ' : '';

      var html = '<div ' + this.getDataIdAttr(container) + this.getClassAttr(container, 'builder-pane') + ngShow + '>';
      html += this.getControlToolbar(container, true);

      // Header
      html += '<div class="builder-header header subheader is-personalizable">';

      // Toolbar
      if (toolbar) {
         html += this.buildControl(toolbar, container);
      }

      html += '</div>';

      // Body
      html += '<div class="builder-content no-scroll ' + (sidebar ? '' : 'no-sidebar') + '">';

      // Content
      if (content) {
         html += this.buildControl(content, container);
      }

      // Side Bar
      if (sidebar) {
         html += this.buildControl(sidebar, container);
      }

      html += '</div>';

      return html + '</div>';
   };

   JsonViewConverter.prototype.buildModuleContent = function (control, parent) {
      var contentHeader = control.controls ? control.controls.contentHeader : null;
      var containerClass = contentHeader ? ' no-scroll has-content-header ' : ' scrollable-y ';
      var label = escapeHtml(control.label);
      var isLabelDynamic = label && label.startsWith('{{');
      var translateLabel = !control.isLabelFromUser && !isLabelDynamic;

      var html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'builder-actions ' + containerClass) + '">';
      html += this.getControlToolbar(control, true);

      // Content header
      if (contentHeader) {
         html += this.buildControl(contentHeader, control);
      }

      // Add scrollable content body if using content header
      if (contentHeader) {
         html += '<div class="module-content-body scrollable-y">';
      }

      // Content title
      if (label) {
         html += '<div class="builder-actions-header"><h3 ' + (translateLabel ? 'translate' : '') + '>' + label + '</h3></div>';
      }

      // Content
      html += '<div class="builder-actions-content">';
      html += this.buildChildren(control);
      html += '</div>';

      if (contentHeader) {
         html += '</div>';
      }

      return html + '</div>';
   };

   JsonViewConverter.prototype.buildModuleContentHeader = function (control, parent) {
      var html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'module-content-header') + '>';
      html += this.getControlToolbar(control, true);
      html += this.buildChildren(control);
      return html + '</div>';
   };

   JsonViewConverter.prototype.buildModuleSidebar = function (control, parent) {
      var content = control.controls ? control.controls.content : null;
      var footer = control.controls ? control.controls.footer : null;
      var label = escapeHtml(control.label);
      var isLabelDynamic = label && label.startsWith('{{');
      var translateLabel = !control.isLabelFromUser && !isLabelDynamic;
      var containerClass = '';

      // Container classes
      if (label) {
         containerClass += ' has-header';
      }
      if (footer) {
         containerClass += ' has-footer';
      }
      if (content) {
         containerClass += ' has-content';
      } else {
         containerClass += ' scrollable';
      }

      // Conditions
      var ngShow = this.liveMode && control.conditionShow ? ' ng-show="' + control.conditionShow + '" ' : '';

      var html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'builder-sidebar ' + containerClass) + ngShow + '>';
      html += this.getControlToolbar(control);

      // Sidebar header (if label is defined on sidebar)
      if (label) {
         html += '<div class="builder-sidebar-header"><h3 ' + (translateLabel ? 'translate' : '') + '>' + label + '</h3></div>';
      }

      // Sidebar content
      if (content) {
         html += this.buildControl(content, control);
      }

      // Children (some module sidebars have normal children controls like an html view, others use the sidebar content named control)
      html += this.buildChildren(control);

      // Sidebar footer
      if (footer) {
         html += this.buildControl(footer, control);
      }

      // Collapse sidebar button
      // Note: the model defaults to base.moduleSidebarCollapsed in order for all views within the tab to synchronize their collapsed/expanded state.
      //       But it can be set to something different per view if synchronization is not wanted.
      if (this.liveMode) {
         var collapsedModel = control.collapsedModel || 'base.moduleSidebarCollapsed';
         html += '<collapsible-section-button data-collapsed-model="' + collapsedModel + '" data-direction="right"></collapsible-section-button>';
      }

      return html + '</div>';
   };

   JsonViewConverter.prototype.buildModuleSidebarContent = function (control, parent) {
      var html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'builder-sidebar-content scrollable') + '>';
      html += this.getControlToolbar(control, true);
      html += this.buildChildren(control);
      return html + '</div>';
   };

   JsonViewConverter.prototype.buildModuleSidebarFooter = function (control, parent) {
      var html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'builder-sidebar-footer scrollable') + '>';
      html += this.getControlToolbar(control, true);
      html += this.buildChildren(control);
      return html + '</div>';
   };

   JsonViewConverter.prototype.buildToolbar = function (toolbar, parent) {
      var isHeaderToolbar = parent.type === 'MOD_CNTR';
      var isActionPanelToolbar = parent.type === 'ACTION_PANEL';
      var isGridToolbar = parent.type === 'GRID';
      var navBtns = toolbar.controls ? toolbar.controls.navBtns : null;
      var label = escapeHtml(toolbar.label);
      var isLabelDynamic = label && label.startsWith('{{');
      var translateLabel = !toolbar.isLabelFromUser && !isLabelDynamic;
      var subLabel = escapeHtml(toolbar.subLabel);
      var isSubLabelDynamic = subLabel && subLabel.startsWith('{{');
      var translateSubLabel = !isSubLabelDynamic;
      var hasTitle = label || navBtns ? true : false;
      var toolbarClass = navBtns ? ' has-title-button ' : '';

      // Show something for dynamic labels when not live mode
      if (isLabelDynamic && !this.liveMode) {
         label = 'wysiwyg.sample.label.dynamic';
         translateLabel = true;
      }
      
      // Conditions, options, etc.
      var toolbarDirective = this.liveMode ? ' toolbar ' : '';
      var ngShow = this.liveMode && toolbar.conditionShow ? ' ng-show="' + toolbar.conditionShow + '" ' : '';

      // We are overriding the default number of displayed buttons (3) in order to show as many as will fit in the space
      var options = ' data-options="{maxVisibleButtons: 50, favorButtonset: false}" ';

      var html = '<div ' + this.getDataIdAttr(toolbar) + this.getClassAttr(toolbar, 'toolbar ' + toolbarClass) + toolbarDirective + options + ngShow + '>';
      html += this.getControlToolbar(toolbar);

      // Add title section (only if needed...otherwise allow buttons to take up full width)
      if (hasTitle) {
         html += '<div class="title">';

         // Navigation button set (i.e. for back button)
         if (navBtns) {
            html += this.buildControl(navBtns, toolbar);
         }

         // Header toolbar or regular toolbar
         if (isHeaderToolbar) {
            html += '<h2>';

            // Title
            html += '<span class="panel-title" ' + (translateLabel ? 'translate' : '') + '>' + (label || '') + '</span>';

            // Sub-title
            if (subLabel) {
               html += '<br /><span class="panel-subhead" ' + (translateSubLabel ? 'translate' : '') + '>' + subLabel + '</span>';
            }

            html += '</h2>';
         } else {
            // Title
            html += '<span ' + (translateLabel ? 'translate' : '') + '>' + (label || '') + '</span>';

            // Sub-title
            if (subLabel) {
               html += ' <span ' + (translateSubLabel ? 'translate' : '') + '>' + subLabel + '</span>';
            }

            // Grid row count
            if (isGridToolbar) {
               var showRowCount = parent.options ? parent.options.showRowCount : undefined;

               // Add if showRowCount is true or default/undefined
               if (showRowCount !== false) {
                  if (this.liveMode) {
                     html += '&nbsp;<span class="datagrid-result-count"></span>';
                  } else {
                     html += '&nbsp;<span class="datagrid-result-count">(1)</span>';
                  }
               }
            }
         }

         html += '</div>';
      }

      // Add child buttons (if no title, then forcing align right so display is consistent with other toolbars)
      html += '<div class="buttonset" ' + (!hasTitle ? 'style="text-align: right;"' : '') + '>';
      html += this.buildChildren(toolbar);

      // Add a personalize button to all module headers and CAPs for the user to personalize the view
      if (this.liveMode && (isHeaderToolbar || isActionPanelToolbar)) {
         html += '<button personalize-button type="button" class="btn-tertiary" ng-click="perbtn.personalizeView(\'' + this.viewPath + '\')"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-settings"></use></svg><span translate>global.personalize</span></button>';

         // Add "Extend" button only to CAPs (since Extensions menu is not accessible by CAPs; we don't add to all to avoid screen clutter)
         if (isActionPanelToolbar) {
            html += '<button extension-menu type="button" class="btn-tertiary" ng-click="extmenu.extendView(\'' + this.viewPath + '\')"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-workflow"></use></svg><span translate>global.extend</span></button>';
         }
      }

      html += '</div>';

      return html + '</div>';
   };

   /**
    * Button Sets have a few different subTypes:
    *
    * 1. Toolbars (right-side) (not currently in use...future consideration)
    * 2. Toolbar navigation (left-side buttons)
    * 3. Modals
    */
   JsonViewConverter.prototype.buildButtonSet = function (btnSet, parent) {
      var cssClass = '';

      if (btnSet.subType === 'TBAR') {
         cssClass = 'buttonset';
      } else if (btnSet.subType === 'TBAR_NAV') {
         cssClass = 'nav-buttonset';
      } else if (btnSet.subType === 'MODAL') {
         cssClass = 'modal-buttonset';
      }

      var html = '<div ' + this.getDataIdAttr(btnSet) + this.getClassAttr(btnSet, cssClass) + '>';
      html += this.getControlToolbar(btnSet);
      html += this.buildChildren(btnSet);
      return html + '</div>';
   };

   JsonViewConverter.prototype.buildButton = function (button, parent) {
      var html = '';
      var subType = button.subType;
      var hasMenu = subType === 'MENU' || subType === 'ACT' || (button.children && button.children.length > 0);
      var popdown = button.controls ? button.controls.popdown : null;
      var label = escapeHtml(button.label);
      var isLabelDynamic = label && label.startsWith('{{');
      var translateLabel = !button.isLabelFromUser && !isLabelDynamic;

      // Show something for dynamic labels when not live mode
      if (isLabelDynamic && !this.liveMode) {
         label = 'wysiwyg.sample.label.dynamic';
         translateLabel = true;
      }

      // Conditions, properties, etc. (use the 'hidden' class instead of ng-show since SoHo toolbars rely on that class)
      var ngClass = this.liveMode && button.conditionShow ? ' ng-class="{\'hidden\': !(' + button.conditionShow + ')}" ' : '';
      var watchVisibility = this.liveMode && button.conditionShow ? ' data-watch-visibility="' + button.conditionShow + '" ' : '';
      var autoFocus = this.liveMode && button.autoFocus ? (button.isAutoFocusFromUser ? ' auto-focus-custom ' : ' auto-focus ') : '';
      var securityLevel = this.liveMode && button.securityLevel ? ' data-security-level="' + button.securityLevel + '" ' : '';
      var resetFormDirective = this.liveMode && button.resetForm ? ' reset-form ' : '';

      // Tooltip (specified tooltip or option to use the label)
      var tooltipAttr = '';
      var tooltip = button.tooltip || (button.isLabelTooltip ? label : null);
      if (tooltip) {
         // May be dynamic reference or static translation key
         var tooltipExp = tooltip.startsWith('{{') ? tooltip : '{{\'' + tooltip + '\' | translate}}';

         // SoHo uses the title attribute for the tooltip
         tooltipAttr = ' title="' + tooltipExp + '" ';
      }

      // Buttons with popdowns need to be marked with an attribute for SoHo
      var popdownAttr = popdown ? ' data-popdown ' : '';

      // Submit validated callback (used by submit buttons)
      var onValidated = this.liveMode && button.eventValidated ? ' data-on-validated="' + button.eventValidated + '" ' : '';

      // Type: submit or button
      var btnType = button.submitForm ? 'submit' : 'button';

      // CSS class (the blank/default type is rendered based on context)
      var cssClass = subType ? btnClassMap[subType] : 'btn';

      // Any type of button can have a menu, so sometimes we need to add the btn-menu class
      if (hasMenu && subType !== 'MENU' && subType !== 'ACT') {
         cssClass += ' btn-menu';
      }

      // Sidebar popdown buttons use a special class to only show them on small screens
      if (this.liveMode && button.sidebarPopdownButton) {
         cssClass += ' hidden-lg hidden-xl';
      }

      // Html
      html += '<button ' + this.getDataIdAttr(button) + ' type="' + btnType + '" ' + this.getClassAttr(button, cssClass) + ngClass + watchVisibility + onValidated + autoFocus + securityLevel + popdownAttr + tooltipAttr + resetFormDirective;

      // Add events and conditions
      if (!this.liveMode) {
         if (!hasMenu) {
            html += ' ng-click="openControlMenu(\'' + button.id + '\')" ';
         }
      } else {
         // Submit event or other events
         if (button.submitForm) {
            // TODO: if submitForm but not submit on enter, do this
            if (false) {
               html += ' onclick="$(this.form).trigger(\'submit\')" ';
            }
         } else {
            if (button.stateRef) {
               html += ' ui-sref="' + button.stateRef + '" ';
            }
            if (button.eventClick) {
               html += ' ng-click="' + button.eventClick + '" ';
            }
         }

         // Disabled condition
         if (button.conditionDisabled) {
            html += ' ng-disabled="' + button.conditionDisabled + '" ';
         }
      }

      html += '>';

      // Add inner content
      if (!subType || subType === 'PRI' || subType === 'SEC' || subType === 'TER' || subType === 'MENU') {
         if (button.icon) {
            html += '<svg class="icon"><use xlink:href="#' + button.icon + '"></use></svg>';
         }
         html += '<span ' + (translateLabel ? 'translate' : '') + '>' + (label || '') + '</span>';
      } else if (subType === 'ICON') {
         html += '<svg class="icon"><use xlink:href="#' + button.icon + '"></use></svg>';
         html += '<span class="audible" ' + (translateLabel ? 'translate' : '') + '>' + (label || '') + '</span>';
      } else if (subType === 'ACT') {
         html += '<svg class="icon"><use xlink:href="#icon-more"></use></svg>';
         // TODO: ap - add audible label and translate?
         //html += '<span class="audible">More Actions</span>';
      } else if (subType === 'MODAL_PRI' || subType === 'MODAL_SEC') {
         // NOTE: using translate as filter because style is wrong if label is in span
         html += translateLabel ? '{{\'' + label + '\' | translate}}' : label;
      }

      html += '</button>';

      // Build popdown (must come right after the button element in order for SoHo to link the click event)
      if (popdown) {
         html += this.buildControl(popdown, button);
      }

      // Menu options
      if (hasMenu) {
         html += '<ul class="popupmenu has-icons">';

         // TODO: do we need these other ul classes for actions buttons?
         //'<ul class="popupmenu actions top">';

         // Add menu button wysiwyg actions at the top of the menu
         if (this.personalizeMode) {
            html += '<li><a ng-click="base.editControl(\'' + button.id + '\')"><svg class="icon"><use xlink:href="#icon-edit"></use></svg><span translate>global.edit</span></a></li>';
            html += '<li class="submenu"><a><svg class="icon"><use xlink:href="#icon-maximize"></use></svg><span translate>global.move</span></a><ul class="popupmenu has-icons"><li><a ng-click="base.moveControl(\'' + button.id + '\', true)"><svg class="icon"><use xlink:href="#icon-left-arrow"></use></svg><span translate>global.back</span></a></li><li><a ng-click="base.moveControl(\'' + button.id + '\', false)"><svg class="icon"><use xlink:href="#icon-right-arrow"></use></svg><span translate>global.forward</span></a></li></ul></li>';
            html += '<li class="separator"></li>';
         } else if (this.devMode || this.extendMode || this.extendNewMode) {
            html += '<li><a ng-click="addControl(\'MENU_OPT\', \'\', \'' + button.id + '\')"><svg class="icon"><use xlink:href="#icon-new-document"></use></svg><span>Add Option</span></a></li>';
            html += '<li><a ng-click="editControl(\'' + button.id + '\')"><svg class="icon"><use xlink:href="#icon-edit"></use></svg><span translate>global.edit</span></a></li>';
            html += '<li class="submenu"><a><svg class="icon"><use xlink:href="#icon-maximize"></use></svg><span translate>global.move</span></a><ul class="popupmenu has-icons"><li><a ng-click="moveControl(\'' + button.id + '\', true)"><svg class="icon"><use xlink:href="#icon-left-arrow"></use></svg><span translate>global.back</span></a></li><li><a ng-click="moveControl(\'' + button.id + '\', false)"><svg class="icon"><use xlink:href="#icon-right-arrow"></use></svg><span translate>global.forward</span></a></li></ul></li>';
            html += '<li><a ng-click="deleteControl(\'' + button.id + '\')"><svg class="icon"><use xlink:href="#icon-delete"></use></svg><span>Delete</span></a></li>';
            html += '<li class="separator"></li>';
         }

         html += this.buildChildren(button);
         html += '</ul>';
      }

      return html;
   };

   JsonViewConverter.prototype.buildPopdown = function (control, parent) {
      var html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'popdown hidden') + '>';
      html += this.getControlToolbar(control);
      html += this.buildChildren(control);
      return html + '</div>';
   };

   JsonViewConverter.prototype.buildMenuOption = function (control) {
      var html = '';
      var label = escapeHtml(control.label);
      var isLabelDynamic = label && label.startsWith('{{');
      var translateLabel = !control.isLabelFromUser && !isLabelDynamic;
      var hasSubMenu = control.subType === 'SUB_MENU' || (control.children && control.children.length);

      // Show something for dynamic labels when not live mode
      if (isLabelDynamic && !this.liveMode) {
         label = 'wysiwyg.sample.label.dynamic';
         translateLabel = true;
      }

      // Class (sub-menu)
      var cssClass = hasSubMenu ? 'submenu' : '';

      // Events
      var uiSref = this.liveMode && control.stateRef ? ' ui-sref="' + control.stateRef + '" ' : '';
      var ngClick;
      if (this.liveMode) {
         ngClick = control.eventClick ? ' ng-click="' + control.eventClick + '" ' : '';
      } else if (!hasSubMenu) {
         // Edit option
         ngClick = ' ng-click="' + (this.personalizeMode ? 'base.' : '') + 'editControl(\'' + control.id + '\')" ';
      }

      // Conditions, properties, etc.
      var securityLevel = this.liveMode && control.securityLevel ? ' data-security-level="' + control.securityLevel + '" ' : '';
      var ngDisabled = this.liveMode && control.conditionDisabled ? ' ng-disabled="' + control.conditionDisabled + '" ' : '';

      // Use ng-class for disabled and visible conditions
      // Note: SoHo uses these classes: 'is-disabled', 'hidden'. They also need the 'disabled' attr on the anchor to prevent click
      var ngClass = '';
      if (this.liveMode && (control.conditionDisabled || control.conditionShow)) {
         var ngClassList = [];
         if (control.conditionDisabled) {
            ngClassList.push('\'is-disabled\': ' + control.conditionDisabled);
         }
         if (control.conditionShow) {
            ngClassList.push('\'hidden\': !(' + control.conditionShow + ')');
         }
         ngClass = ' ng-class="{' + ngClassList.join(', ') + '}" ';
      }

      // Icon
      var svg = control.icon ? '<svg class="icon"><use xlink:href="#' + control.icon + '"></use></svg>' : '';

      // Build HTML
      html += '<li' + this.getDataIdAttr(control) + this.getClassAttr(control, cssClass) + ngClass + securityLevel + '><a ' + ngClick + uiSref + ngDisabled + '>' + svg + '<span ' + (translateLabel ? 'translate' : '') + '>' + label + '</span></a>';

      // Sub-menu options
      if (hasSubMenu) {
         html += '<ul class="popupmenu has-icons">';

         // Add menu button wysiwyg actions at the top of the menu
         if (this.personalizeMode) {
            html += '<li><a ng-click="base.editControl(\'' + control.id + '\')"><svg class="icon"><use xlink:href="#icon-edit"></use></svg><span translate>wysiwyg.edit.control</span></a></li>';
            html += '<li class="separator"></li>';
         } else if (this.devMode || this.extendMode || this.extendNewMode) {
            html += '<li><a ng-click="editControl(\'' + control.id + '\')"><svg class="icon"><use xlink:href="#icon-edit"></use></svg><span>Edit Control</span></a></li>';
            html += '<li><a ng-click="addControl(\'MENU_OPT\', \'\', \'' + control.id + '\')"><svg class="icon"><use xlink:href="#icon-new-document"></use></svg><span>Add Option</span></a></li>';
            html += '<li class="separator"></li>';
         }

         html += this.buildChildren(control);
         html += '</ul>';
      }

      return html + '</li>';
   };

   JsonViewConverter.prototype.buildGrid = function (grid) {
      var options = grid.options || {};
      var children = grid.children || [];
      var toolbar = grid.controls ? grid.controls.toolbar : null;
      var isLookupGrid = grid.subType === 'LOOKUP_GRID';
      var directive = '';

      // Prepare live-mode directive and options (not used for lookup grids that don't define their columns in the view)
      if (this.liveMode && !(isLookupGrid && children.length === 0)) {
         options.columns = [];

         // Create new column objects from JSON columns in order to match the properties of GridService and SoHo
         for (var i = 0; i < children.length; i++) {
            var col = children[i];

            // To improve ui rendering performance we don't pass hidden/extra columns to the grid. Because Soho formats
            // hidden columns and adds them to the DOM (undisplayed) there can be significant performance impact by the
            // inclusion of these columns. Since we don't use Soho's "personalize columns" option, it is safe to not pass hidden columns.
            if (col.extra) {
               continue;
            }

            // Add to view's list of control ids (since grid columns don't go through "buildControl")
            this.controlIds.push(col.id);

            // Use named column identifier if defined, otherwise use control id
            // Note: converting id number to string since SoHo expects string ids
            var id = col.columnId || col.id.toString();

            options.columns.push({
               id: id,
               field: col.model,
               name: col.label,
               type: col.subType,
               editable: col.editable,
               isEditable: col.cellEditable,
               contentVisible: col.contentVisible,
               dataFormat: col.dataFormat,
               subFormat: col.subFormat,
               formatOptions: col.formatOptions,
               customFormatter: col.customFormatter,
               width: col.width,
               click: col.eventClick,
               cellchange: col.eventChange,
               enterEditMode: col.eventEnterEditMode,
               exitEditMode: col.eventExitEditMode,
               sign: col.sign,
               digits: col.digits,
               decimals: col.decimals,
               mask: col.mask,
               maskMode: col.maskMode,
               maxLength: col.maxLength,
               exportable: col.exportable,
               reorderable: col.reorderable,
               sortable: col.sortable,
               defaultSort: col.defaultSort,
               hidden: col.extra, // hidden by default, but able to be added
               isIncluded: col.conditionInclude, // condition for completely including/excluding column
               tooltipType: col.tooltipType,
               tooltip: col.tooltip,
               headerTooltip: col.headerTooltip,
               // TODO: activate this when get it working
               //href: col.href,
               // Add inline drop down options (converted to SoHo format), or lookup options
               options: col.type3 === 'INLINE' ? convertToGridColumnOptions(col) : col.options,
               optionsType: col.type3,
               optionsModel: col.optionsModel,
               optionLabelField: col.optionLabelField,
               optionValueField: col.optionValueField,
               meta: col.meta,
               metaGroup: col.metaGroup,
               blankOption: col.blankOption,
               blankOptionLabel: col.blankOptionLabel
            });
         }

         // Grid directive and options
         directive = ' data-grid data-options=\'' + serialize(options, true) + '\' ';
      }

      // Mock grid directive for wysiwyg grids
      if (!this.liveMode) {
         directive = ' mock-grid ';
      }

      // Control reference for where directive should set control within scope
      var controlRef = grid.controlRef ? ' data-control-ref="' + grid.controlRef + '" ' : '';

      // Dataset binding
      var dataModel = grid.model ? ' data-model="' + grid.model + '" ' : '';

      // Editable grid flag used by the form-readonly directive to know if it's an editable grid (since the editable property may be toggled)
      var allowEdit = this.liveMode && options.editable ? ' data-allow-edit="true" ' : '';

      // Conditions, properties, etc.
      var isEditable = this.liveMode && grid.conditionEditable ? ' data-is-editable="' + grid.conditionEditable + '" ' : '';
      var ngShow = this.liveMode && grid.conditionShow ? ' ng-show="' + grid.conditionShow + '" ' : '';

      // All grids have contained scrolling, with the exception of:
      // - grids that explicitly turn off paging (because those grids have a small, limited number of rows)
      var gridClass = options.paging !== false ? 'datagrid-contained' : '';

      // Grid container
      var html = '<div ' + this.getDataIdAttr(grid) + this.getClassAttr(grid, 'grid-container') + ngShow + '>';

      // Grid toolbar
      if (toolbar) {
         html += this.buildControl(toolbar, grid);
      }

      // Lookup grids rely on id="lookup-datagrid" for the SoHo lookup to find the grid
      var idAttr = this.liveMode && isLookupGrid ? ' id="lookup-datagrid" ' : '';

      // Grid body
      html += '<div class="grid-body ' + gridClass + '" data-init="false" ' + idAttr + controlRef + dataModel + directive + allowEdit + isEditable + '>';
      html += this.getControlToolbar(grid);

      // Show a mock grid when not in live mode
      if (!this.liveMode) {
         html += this.buildMockGrid(grid, options, children);
      }

      return html + '</div></div>';
   };

   JsonViewConverter.prototype.buildGridColumn = function (control) {
      var label = escapeHtml(control.label);
      var isLabelDynamic = label && label.startsWith('{{');
      var translateLabel = !control.isLabelFromUser && !isLabelDynamic;
      var widthStyle = control.width ? ' style="width: ' + control.width + 'px" ' : '';

      // Show something for dynamic labels when not live mode
      if (isLabelDynamic && !this.liveMode) {
         label = 'wysiwyg.sample.label.dynamic';
         translateLabel = true;
      }

      // Default sort direction
      var sortClass = control.defaultSort ? (control.defaultSort === 'asc' ? ' is-sorted-asc' : ' is-sorted-desc') : '';

      var html = '<th ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'is-resizable ' + sortClass) + widthStyle + '>';
      html += this.getControlToolbar(control);

      // Alignment class
      var headerClass = mockGridAlignClass[control.subType] || '';

      html += '<div class="datagrid-column-wrapper ' + headerClass + '">';
      html += '<span class="datagrid-header-text" ' + (translateLabel ? 'translate' : '') + '>' + (label || '') + '</span>';
      if (control.defaultSort) {
         html += '<div class="sort-indicator"><span class="sort-asc"><svg class="icon" focusable="false"><use xlink:href="#icon-dropdown"></use></svg></span><span class="sort-desc"><svg class="icon" focusable="false"><use xlink:href="#icon-dropdown"></use></svg></span></div>';
      }
      html += '</div>';

      return html + '</th>';
   };

   JsonViewConverter.prototype.buildListView = function (control) {
      // Conditions
      var ngShow = this.liveMode && control.conditionShow ? ' ng-show="' + control.conditionShow + '" ' : '';

      var html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'listview') + ngShow + '>';
      html += this.getControlToolbar(control);

      html += '<ul>';

      if (this.liveMode) {
         html += '<li ng-repeat="item in ' + control.model + '">';

         // TODO: figure out how to do list view elements
         html += '<p class="listview-heading">Task #{{item.num}}</p>';
         html += '<p class="listview-subheading">{{item.name}}</p>';
         html += '<p class="listview-micro">Due: {{item.date}}</p>';

         html += '</li>';
      } else {
         // Show a sample list view when not in live mode
         html += '<li>';
         html += '<p class="listview-heading">Task #123</p>';
         html += '<p class="listview-subheading">John Smith</p>';
         html += '<p class="listview-micro">Due: 2/15/2015</p>';
         html += '</li>';
         html += '<li>';
         html += '<p class="listview-heading">Task #456</p>';
         html += '<p class="listview-subheading">Tom Arnold</p>';
         html += '<p class="listview-micro">Due: 3/28/2015</p>';
         html += '</li>';
      }

      return html + '</ul></div>';
   };

   JsonViewConverter.prototype.buildMessage = function (control) {
      var ngShow = this.liveMode && control.conditionShow ? ' ng-show="' + control.conditionShow + '" ' : '';

      var html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'message') + ngShow + ' >';
      html += this.getControlToolbar(control);

      // Icon
      if (control.icon) {
         // Certain "alert" icons have an associated css class
         var iconClass = iconClassMap[control.icon] || '';
         html += '<svg class="icon ' + iconClass + '"><use xlink:href="#' + control.icon + '"></use></svg>';
      }

      // Text (dynamic or translation string)
      if (control.text && control.text.startsWith('{{')) {
         if (this.liveMode) {
            var expression = control.text.replace('{{', '').replace('}}', '');

            // Allow sanitized html in dynamic message strings
            html += '<span ng-bind-html="' + expression + '"></span>';
         } else {
            html += '<span translate>wysiwyg.sample.message.text</span>';
         }
      } else {
         html += '<span translate>' + control.text + '</span>';
      }

      return html + '</div>';
   };

   JsonViewConverter.prototype.buildRow = function (row) {
      var html = '<div ' + this.getDataIdAttr(row) + this.getClassAttr(row, 'row') + '>';
      html += this.getControlToolbar(row);
      html += this.buildChildren(row);
      return html + '</div>';
   };

   JsonViewConverter.prototype.buildColumn = function (column, parent) {
      var columnSpan = columnClassMap[column.subType];

      var html = '<div ' + this.getDataIdAttr(column) + this.getClassAttr(column, columnSpan + ' columns') + '>';
      html += this.getControlToolbar(column);
      html += this.buildChildren(column);
      return html + '</div>';
   };

   JsonViewConverter.prototype.buildExpandableArea = function (control) {
      var visiblePane = control.controls ? control.controls.visiblePane : null;
      var label = escapeHtml(control.label);
      var isLabelDynamic = label && label.startsWith('{{');
      var translateLabel = !control.isLabelFromUser && !isLabelDynamic;

      // Show something for dynamic labels when not live mode
      if (isLabelDynamic && !this.liveMode) {
         label = 'wysiwyg.sample.label.dynamic';
         translateLabel = true;
      }

      // Conditions, properties, etc.
      var expAreaDirective = this.liveMode ? ' expandable-area ' : '';
      var ngShow = this.liveMode && control.conditionShow ? ' ng-show="' + control.conditionShow + '" ' : '';
      var controlRef = this.liveMode && control.controlRef ? ' data-control-ref="' + control.controlRef + '" ' : '';
      var onReady = this.liveMode && control.eventReady ? ' data-on-ready="' + control.eventReady + '" ' : '';
      var onExpand = this.liveMode && control.eventExpand ? ' data-on-expand="' + control.eventExpand + '" ' : '';
      var onCollapse = this.liveMode && control.eventCollapse ? ' data-on-collapse="' + control.eventCollapse + '" ' : '';
      var expandedClass = control.collapsed ? '' : ' is-expanded ';
      var collapsedIf = this.liveMode && control.conditionCollapsed ? ' collapsed-if="' + control.conditionCollapsed + '" ' : '';

      var html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'expandable-area ' + expandedClass) + expAreaDirective + ngShow + controlRef + onReady + onExpand + onCollapse + collapsedIf + '>';

      html += this.getControlToolbar(control);

      // Title
      html += '<div class="expandable-header"><span class="title" ' + (translateLabel ? 'translate' : '') + '>' + (label || '') + '</span></div>';

      // Visible Pane
      if (visiblePane) {
         html += this.buildControl(visiblePane);
      }

      // Children in Pane
      html += '<div class="expandable-pane"><div class="content">';
      html += this.buildChildren(control);
      html += '</div></div>';

      return html + '</div>';
   };

   JsonViewConverter.prototype.buildExpandableVisiblePane = function (control) {
      var html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'expandable-visible-pane') + '>';
      html += this.getControlToolbar(control);

      // Children
      html += '<div class="content">';
      html += this.buildChildren(control);
      html += '</div>';

      return html + '</div>';
   };

   JsonViewConverter.prototype.buildFieldSet = function (fieldSet) {
      var label = escapeHtml(fieldSet.label);
      var isLabelDynamic = label && label.startsWith('{{');
      var translateLabel = !fieldSet.isLabelFromUser && !isLabelDynamic;

      // Show something for dynamic labels when not live mode
      if (isLabelDynamic && !this.liveMode) {
         label = 'wysiwyg.sample.label.dynamic';
         translateLabel = true;
      }

      // Conditions, properties, etc.
      var ngShow = this.liveMode && fieldSet.conditionShow ? ' ng-show="' + fieldSet.conditionShow + '" ' : '';

      var html = '<fieldset ' + this.getDataIdAttr(fieldSet) + this.getClassAttr(fieldSet) + ngShow + '>';

      html += this.getControlToolbar(fieldSet);

      html += '<legend ' + (translateLabel ? 'translate' : '') + '>' + label + '</legend>';

      html += this.buildChildren(fieldSet);

      return html + '</fieldset>';
   };

   JsonViewConverter.prototype.buildCompoundField = function (control) {
      var html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'compound-field') + '>';

      // NOTE: this control purposefully doesn't have conditions and events because their impact on fields could be lost through user personalization

      html += this.getControlToolbar(control);
      html += this.buildChildren(control);

      return html + '</div>';
   };

   JsonViewConverter.prototype.buildRadioSet = function (field, parent) {
      var optionSetDirective = '';
      var useOptSetDir = field.meta && (field.type3 === 'SET' || field.type3 === 'CODES');
      var isManual = field.type3 === 'MANUAL';
      var label = escapeHtml(field.label);
      var isLabelDynamic = label && label.startsWith('{{');
      var translateLabel = !field.isLabelFromUser && !isLabelDynamic;

      // Show something for dynamic labels when not live mode
      if (isLabelDynamic && !this.liveMode) {
         label = 'wysiwyg.sample.label.dynamic';
         translateLabel = true;
      }

      // Option set directive
      if (useOptSetDir) {
         optionSetDirective += ' data-option-set="' + field.meta + '" ';
         optionSetDirective += ' data-option-group="' + (field.metaGroup || '') + '" ';
         optionSetDirective += ' data-type="' + field.type3 + '" ';
         optionSetDirective += ' data-options-model="' + (isManual ? field.optionsModel : 'optionList') + '" ';
      }

      // Containing conditions, properties, etc.
      var ngShow = this.liveMode && field.conditionShow ? ' ng-show="' + field.conditionShow + ' "' : '';
      var autoFocus = this.liveMode && field.autoFocus ? (field.isAutoFocusFromUser ? ' auto-focus-custom ' : ' auto-focus ') : '';
      var focusIf = this.liveMode && field.conditionFocus ? ' focus-if="' + field.conditionFocus + '" ' : '';
      var securityLevel = this.liveMode && field.securityLevel ? ' data-security-level="' + field.securityLevel + '" ' : '';

      // Tooltip
      var tooltipAttr = '';
      if (field.tooltip) {
         // May be dynamic reference or static translation key
         var tooltipExp = field.tooltip.startsWith('{{') ? field.tooltip : '{{\'' + field.tooltip + '\' | translate}}';

         // SoHo uses the title attribute for the tooltip
         tooltipAttr = ' title="' + tooltipExp + '" ';
      }

      var html = '<fieldset ' + this.getDataIdAttr(field) + this.getClassAttr(field, 'radio-group') + optionSetDirective + ngShow + securityLevel + autoFocus + focusIf + tooltipAttr + '>';
      html += this.getControlToolbar(field);

      // Hidden/audible label class
      var labelClass = field.labelHidden ? 'audible' : '';

      // Label
      html += '<legend class="' + labelClass + '" ' + (translateLabel ? 'translate' : '') + '>' + label + '</legend>';

      // Add options according to type
      if (field.type3 === 'INLINE') {
         html += this.buildChildren(field);
      } else if (useOptSetDir || isManual) {
         var labelField = field.optionLabelField || 'label';
         var valueField = field.optionValueField || 'value';

         // Get radio name attribute (ties each option to the set)
         var name = this.transientHtmlIdPrefix + field.id;

         // Get html id that will be unique for each item in the set
         var id = '{{::\'' + name + '-\' + $index}}';

         // Conditions, events, and properties
         var ngModel = this.liveMode && field.model ? ' ng-model="' + field.model + '" ' : '';
         var ngChange = this.liveMode && field.eventChange ? ' ng-change="' + field.eventChange + '" ' : '';
         var ngDisabled = this.liveMode && field.conditionDisabled ? ' ng-disabled="' + field.conditionDisabled + ' "' : '';
         var ngReadonly = this.liveMode && field.conditionReadonly ? ' ng-readonly="' + field.conditionReadonly + ' "' : '';
         var radioOptionDirective = this.liveMode ? ' radio-option ' : '';

         var optionsModel;
         if (isManual) {
            optionsModel = field.optionsModel;
         } else {
            optionsModel = '::optionList';
         }

         // Add ng-repeat option template
         // *** Important! *** We are implementing radio options to function in a case-insensitive way by manipulating
         //                    values in the options list to act like lowercase (but remembering the actual value via
         //                    the 'data-actual-value' attr)
         html += '<div class="field" ng-repeat="opt in ' + optionsModel + '">';
         html += '<input type="radio" id="' + id + '" class="radio" name="' + name + '" ng-value="opt.' + valueField + ' | lowercase" data-actual-value="{{opt.' + valueField + '}}" ' + radioOptionDirective + ngModel + ngChange + ngDisabled + ngReadonly + '/>';
         html += '<label for="' + id + '" class="radio-label" translate>{{::opt.' + labelField + '}}</label>';
         html += '</div>';
      }

      // Add context field
      if (this.liveMode && field.contextEntity) {
         html += buildContextFieldDirective(field);
      }

      return html + '</fieldset>';
   };

   JsonViewConverter.prototype.buildField = function (field, parent) {
      var id = this.getHtmlId(field, true);
      var labelClass = '', inputClass = '', sizeClass = '', dataValidate = '', validationEvents = '', customValidation = '', formatInfo = '';
      var label = escapeHtml(field.label);
      var isLabelDynamic = label && label.startsWith('{{');
      var translateLabel = !field.isLabelFromUser && !isLabelDynamic;
      var isLookup = field.subType === 'LOOKUP';
      var inCompoundField = parent.type === 'COMP_FLD';
      var actionBtn = field.controls ? field.controls.actionBtn : null;

      // Show something for dynamic labels when not live mode
      if (isLabelDynamic && !this.liveMode) {
         label = 'wysiwyg.sample.label.dynamic';
         translateLabel = true;
      }

      // CSS classes by type
      if (field.subType === 'CHECKBOX') {
         inputClass += 'checkbox';
         labelClass += 'checkbox-label';
      } else if (field.subType === 'DROP_DOWN') {
         inputClass += 'dropdown';
         labelClass += 'label';
      } else if (field.subType === 'MULTI_SELECT') {
         inputClass += 'multiselect';
         labelClass += 'label';
      } else if (field.subType === 'DATE') {
         inputClass += 'datepicker';
      } else if (field.subType === 'FILE') {
         labelClass += 'fileupload';
      } else if (field.subType === 'LOOKUP') {
         inputClass += 'lookup busy';
      } else if (field.subType === 'SWITCH') {
         inputClass += 'switch';
      } else if (field.subType === 'TEXT_AREA') {
         inputClass += 'textarea';
      } else if (field.subType === 'TIME') {
         inputClass += 'timepicker';
      }

      // Action(s) button input class
      if (actionBtn) {
         inputClass += ' has-actions';
      }

      // Hidden/audible label class
      if (field.labelHidden) {
         labelClass += ' audible';
      }

      // SoHo uses this dummy label height markup for proper alignment of hidden labels within compound fields
      var dummyLabelHeight = '';
      if (inCompoundField && field.labelHidden) {
         dummyLabelHeight += '<span class="label">&nbsp;</span>';
      }

      // Model binding
      var ngModel;
      if (this.liveMode) {
         if (field.model) {
            // If field bound to a function, use ng-value (since can't do ng-model with functions)
            if (field.model.endsWith(')')) {
               ngModel = ' ng-value="' + field.model + '" ';
            } else {
               ngModel = ' ng-model="' + field.model + '" ';
            }
         } else {
            ngModel = '';
         }
      } else {
         // Use a mock model when in wysiwyg since some directives need ng-model in order to run (like ng-options for display of drop down options)
         ngModel = ' ng-model="mockModel' + field.id + '" ';
      }

      // Important! Because of an incompatibility with the SoHo mask and the 'updateOn' option, we have to add a
      //            'debounce' option of 1 ms so that the angular update is slightly delayed and receives the correct
      //            model value. This is only needed when the 'updateOn' option is used (i.e. 'blur').
      if (this.liveMode && field.modelOptions && field.modelOptions.updateOn && !field.modelOptions.debounce) {
         field.modelOptions.debounce = 1;
      }

      // Conditions, events, and properties
      var ngModelOptions = this.liveMode && field.modelOptions ? ' ng-model-options=\'' + serialize(field.modelOptions) + '\' ' : '';
      var ngChange = this.liveMode && field.eventChange ? ' ng-change="' + field.eventChange + '" ' : '';
      var ngClick = this.liveMode && field.eventClick ? ' ng-click="' + field.eventClick + '" ' : '';
      var ngShow = this.liveMode && field.conditionShow ? ' ng-show="' + field.conditionShow + '" ' : '';
      var autoFocus = this.liveMode && field.autoFocus ? (field.isAutoFocusFromUser ? ' auto-focus-custom ' : ' auto-focus ') : '';
      var focusIf = this.liveMode && field.conditionFocus ? ' focus-if="' + field.conditionFocus + '" ' : '';
      var maxLength = field.maxLength ? ' maxlength="' + field.maxLength + '" ' : '';
      var securityLevel = this.liveMode && field.securityLevel ? ' data-security-level="' + field.securityLevel + '" ' : '';

      // Mask (can be a static mask or an expression to watch; can also add a custom mask definition)
      var isDynamicMask = field.mask && field.mask.startsWith('{{');
      var mask = field.mask ? ' data-mask ' : '';
      var maskExpression = isDynamicMask ? ' data-mask-expression="' + field.mask.replace('{{', '').replace('}}', '') + '" ' : '';
      var customMask = field.customMask ? ' custom-mask="' + field.customMask + '" ' : '';

      // Add mask options
      if (field.mask || field.maskMode) {
         var maskOptions = {
            pattern: !isDynamicMask ? field.mask : undefined,
            mode: field.maskMode || undefined
         };

         mask += ' data-options=\'' + serialize(maskOptions) + '\' ';
      }

      // Required (static or condition)
      var requiredIf = '';
      if (this.liveMode && field.conditionRequired) {
         requiredIf = ' required-if="' + field.conditionRequired + '" ';
      } else if (field.required) {
         labelClass += ' required';
         dataValidate = this.liveMode ? ' data-validate="required" ' : '';
      }

      // Disabled (static or condition)
      var ngDisabled = '';
      if (this.liveMode && field.conditionDisabled) {
         ngDisabled = ' ng-disabled="' + field.conditionDisabled + '" ';
      } else if (field.disabled) {
         ngDisabled = ' ng-disabled="::true" ';
      }

      // Readonly (static or condition)
      var ngReadonly = '';
      if (this.liveMode && field.conditionReadonly) {
         ngReadonly = ' ng-readonly="' + field.conditionReadonly + '" ';
      } else if (field.readonly) {
         ngReadonly = ' ng-readonly="::true" ';
      }

      // Custom validation (this wires into our "custom-rule" in order to call custom functions on a controller)
      if (this.liveMode && field.customValidation) {
         dataValidate = dataValidate ? dataValidate.replace('="', '="custom-rule ') : ' data-validate="custom-rule" ';
         customValidation = ' data-custom-validation="' + field.customValidation + '" ';

         // Add validate on for custom-rule
         if (field.validateOn) {
            var ruleEvents = {
               'required': field.required ? 'change blur' : undefined, // need to add required here, otherwise it doesn't fire
               'custom-rule': field.validateOn
            };
            validationEvents = ' data-validation-events=\'' + serialize(ruleEvents) + '\' ';
         }
      }

      // Lookup directive
      var lookupDirective = '';
      if (this.liveMode && isLookup) {
         lookupDirective = ' lookup="' + (field.meta || '') + '" ';

         if (field.options) {
            lookupDirective += ' data-lookup-options=\'' + serialize(field.options) + '\' ';
         }
      }

      // Date directive
      var dateDirective = this.liveMode && field.subType === 'DATE' ? ' date ' : '';

      // Add format info for directive
      if (field.dataFormat) {
         formatInfo = ' field-format="' + field.dataFormat + '" ';
         if (field.subFormat) formatInfo += ' data-sub-format="' + field.subFormat + '" ';
         if (field.sign) formatInfo += ' data-sign="' + field.sign + '" ';
         if (field.digits) formatInfo += ' data-digits="' + field.digits + '" ';
         if (field.decimals) formatInfo += ' data-decimals="' + field.decimals + '" ';
         if (field.formatOptions) formatInfo += ' data-format-options=\'' + serialize(field.formatOptions) + '\' ';
      }

      // Tooltip
      var tooltipAttr = '';
      if (field.tooltip) {
         // May be dynamic reference or static translation key
         var tooltipExp = field.tooltip.startsWith('{{') ? field.tooltip : '{{\'' + field.tooltip + '\' | translate}}';

         // SoHo uses the title attribute for the tooltip
         tooltipAttr = ' title="' + tooltipExp + '" ';
      }

      // Container class
      var containerClass = (field.subType === 'SWITCH') ? 'switch' : 'field';

      // Attach up class (close to above field)
      if (field.attachUp) {
         containerClass += ' attach-up';
      }

      // Field HTML
      var html = '<div ' + this.getDataIdAttr(field) + this.getClassAttr(field, containerClass) + ngShow + securityLevel + tooltipAttr + '>';
      html += this.getControlToolbar(field);

      if (field.subType === 'CHECKBOX') {
         html += '<input type="checkbox" id="' + id + '" class="' + inputClass + '" ' + ngModel + ngModelOptions + formatInfo + ngChange + ngClick + ngDisabled + ngReadonly + dataValidate + validationEvents + customValidation + autoFocus + focusIf + ' />';
         html += '<label class="' + labelClass + '" for="' + id + '" ' + (translateLabel ? 'translate' : '') + '>' + label + '</label>';
      } else if (field.subType === 'SWITCH') {
         html += '<input type="checkbox" id="' + id + '" class="' + inputClass + '" ' + ngModel + ngModelOptions + formatInfo + ngChange + ngClick + ngDisabled + ngReadonly + dataValidate + validationEvents + customValidation + autoFocus + focusIf + ' />';
         html += '<label class="' + labelClass + '" for="' + id + '" ' + (translateLabel ? 'translate' : '') + '>' + label + '</label>';
      } else if (field.subType === 'DROP_DOWN' || field.subType === 'MULTI_SELECT') {
         var selectContent = '';
         var optionsModel = '';
         var watchOptions = '';
         var optionSetDirective = '';
         var useOptSetDir = field.meta && (field.type3 === 'SET' || field.type3 === 'CODES');
         var isManual = field.type3 === 'MANUAL';
         var isMulti = field.subType === 'MULTI_SELECT';
         var labelField = field.optionLabelField || 'label';
         var valueField = field.optionValueField || 'value';

         // Add blank option (if true or default/undefined)
         // Note: If we wanted the blank option to have a value of null, we could do ng-value="null"
         if (!isMulti && field.blankOption !== false) {
            if (field.blankOptionLabel) {
               selectContent += '<option value="" translate>' + field.blankOptionLabel + '</option>';
            } else {
               // The default display of the blank option label is to show empty
               // Note: SoHo requires an HTML space character for the blank option to show up
               selectContent += '<option value="">&nbsp;</option>';
            }
         }

         // Add options according to type
         if (field.type3 === 'INLINE') {
            selectContent += this.buildChildren(field);
         } else if (useOptSetDir || isManual) {

            // Option set directive
            if (useOptSetDir) {
               optionSetDirective += ' option-set="' + field.meta + '" ';
               optionSetDirective += ' data-option-group="' + (field.metaGroup || '') + '" ';
               optionSetDirective += ' data-type="' + field.type3 + '" ';
            }

            // The reference to the options model list must be specified for custom/manual drop downs.
            // For other drop downs, we use a standardized name (optionList)
            optionsModel = isManual ? field.optionsModel : 'optionList';

            // We can do one-time binding (performance improvement) for the options model list, unless it's a custom/manual drop down
            var oneTimeBinding = !isManual ? '::' : '';

            // Build the ng-repeat option for the list of options
            // *** Important! *** We are implementing drop down options to function in a case-insensitive way by manipulating
            //                    values in the options list to act like lowercase (but retaining the actual values
            //                    in the optionsModel)
            selectContent += '<option ng-repeat="opt in ' + oneTimeBinding + optionsModel + '" ng-value="opt.' + valueField + ' | lowercase">{{opt.' + labelField + '}}</option>';

            // We need to watch the options model for manual/custom drop downs so we can tell SoHo to update
            if (this.liveMode && isManual && optionsModel) {
               watchOptions = ' data-watch-options-model ';
            }
         }

         // All drop downs use the directive (and most rely on these 'data-' attributes)
         var dropDownDirective = ' dropdown ';
         dropDownDirective += optionsModel ? ' data-options-model="' + optionsModel + '" ' : '';
         dropDownDirective += valueField ? ' data-options-value-field="' + valueField + '" ' : '';
         dropDownDirective += ' data-case-insensitive ';

         // We need to handle readonly and disabled in a custom way for drop downs since SoHo uses a custom drop down control
         ngDisabled = ngDisabled.replace('ng-disabled', 'data-is-disabled');
         ngReadonly = ngReadonly.replace('ng-readonly', 'data-is-readonly');

         // Drop downs need extra help in pushing dynamic label changes to the SoHo control, so we pass the label expression to the dropdown directive
         var labelExpression = this.liveMode && isLabelDynamic ? ' data-label-expression="' + label.replace('{{', '').replace('}}', '') + '" ' : '';

         // Drop down size
         sizeClass = field.size ? dropDownSizeClassMap[field.size] : '';

         html += '<label class="' + labelClass + '" for="' + id + '" ' + (translateLabel ? 'translate' : '') + '>' + label + '</label>';
         html += dummyLabelHeight;
         html += '<select ' + (isMulti ? ' multiple ' : '') + ' id="' + id + '" class="' + inputClass + ' ' + sizeClass + '" ' + ngModel + ngModelOptions + ngChange + ngDisabled + ngReadonly + requiredIf + dataValidate + validationEvents + customValidation + dropDownDirective + optionSetDirective + watchOptions + labelExpression + autoFocus + focusIf + '>';
         html += selectContent;
         html += '</select>';
      } else if (field.subType === 'TEXT_AREA') {
         // Text area size
         sizeClass = field.size ? textAreaSizeClassMap[field.size] : '';

         // Text areas can have a special height class
         sizeClass += field.height ? ' ' + textAreaHeightClassMap[field.height] : '';

         html += '<label class="' + labelClass + '" for="' + id + '" ' + (translateLabel ? 'translate' : '') + '>' + label + '</label>';
         html += dummyLabelHeight;
         html += '<textarea id="' + id + '" class="' + inputClass + ' ' + sizeClass + ' resizable" ' + ngModel + ngModelOptions + formatInfo + ngChange + ngClick + ngDisabled + ngReadonly + requiredIf + dataValidate + validationEvents + customValidation + maxLength + mask + maskExpression + customMask + autoFocus + focusIf + '></textarea>';
      } else if (field.subType === 'FILE') {
         var inputType = 'file';
         var fileDirective = this.liveMode ? ' file-input ' : '';
         var multiple = field.multiple ? ' multiple ' : '';

         // File fields need to handle data binding and other conditions in a custom way, so we don't use ng-model, ng-readonly, etc.
         ngModel = ngModel.replace('ng-model', 'data-model');
         ngChange = ngChange.replace('ng-change', 'data-change');
         ngDisabled = ngDisabled.replace('ng-disabled', 'data-is-disabled');
         ngReadonly = ngReadonly.replace('ng-readonly', 'data-is-readonly');

         // Input field size
         sizeClass = field.size ? inputSizeClassMap[field.size] : '';

         html += '<label class="' + labelClass + '">';
         html += '<span class="audible" ' + (translateLabel ? 'translate' : '') + '>' + label + '</span>';
         html += '<input type="' + inputType + '" class="' + inputClass + ' ' + sizeClass + '" ' + multiple + ngModel + ngModelOptions + ngChange + ngClick + ngDisabled + ngReadonly + requiredIf + dataValidate + validationEvents + customValidation + maxLength + mask + maskExpression + customMask + fileDirective + lookupDirective + formatInfo + dateDirective + autoFocus + focusIf + ' />';
         html += '</label>';
      }
      // Others: TEXT_BOX, LOOKUP, DATE, etc.
      else {
         var inputType = field.subType === 'PASSWORD' ? 'password' : 'text';

         // Some field formats need to turn off ng-trim to allow surrounding space chars (like Bin Loc)
         // The ng-trim attr needs to be added here so that angular compiles it (otherwise it's too late)
         var formatMeta = field.dataFormat ? FieldFormats[field.dataFormat] : null;
         var ngTrim = formatMeta && formatMeta.trimInput === false ? ' ng-trim="false" ': '';

         // Lookup fields do some attributes differently since they don't use ng-model
         if (isLookup) {
            // Handle data binding in a custom way
            ngModel = ngModel.replace('ng-model', 'data-model');

            // Handle change event in a custom way
            ngChange = ngChange.replace('ng-change', 'data-on-change');
         }

         // Input field size
         sizeClass = field.size ? inputSizeClassMap[field.size] : '';

         html += '<label class="' + labelClass + '" for="' + id + '" ' + (translateLabel ? 'translate' : '') + '>' + label + '</label>';
         html += dummyLabelHeight;
         html += '<input type="' + inputType + '" id="' + id + '" class="' + inputClass + ' ' + sizeClass + '" ' + ngModel + ngModelOptions + ngChange + ngClick + ngDisabled + ngReadonly + requiredIf + dataValidate + validationEvents + customValidation + maxLength + mask + maskExpression + customMask + lookupDirective + formatInfo + dateDirective + autoFocus + focusIf + ngTrim + ' autocomplete="off" />';
      }

      // Action button
      if (actionBtn) {
         html += this.buildControl(actionBtn, field);
      }

      // Data description
      if (field.dataDesc) {
         if (this.liveMode) {
            html += '<span class="data-description" ng-bind="' + field.dataDesc + '"></span>';
         } else {
            html += '<span class="data-description" translate>wysiwyg.sample.data</span>';
         }
      }

      // Add context field (if entity defined or is lookup since lookups define entities in lookups.js)
      if (this.liveMode && (field.contextEntity || isLookup)) {
         html += buildContextFieldDirective(field, isLookup);
      }

      return html + '</div>';
   };

   JsonViewConverter.prototype.buildInfoField = function (field, parent) {
      var html = '';
      var label = escapeHtml(field.label);
      var isLabelDynamic = label && label.startsWith('{{');
      var translateLabel = !field.isLabelFromUser && !isLabelDynamic;

      // Show something for dynamic labels when not live mode
      if (isLabelDynamic && !this.liveMode) {
         label = 'wysiwyg.sample.label.dynamic';
         translateLabel = true;
      }

      // Events, properties, etc.
      var ngClick = this.liveMode && field.eventClick ? ' ng-click="' + field.eventClick + '" ' : '';
      var ngShow = this.liveMode && field.conditionShow ? ' ng-show="' + field.conditionShow + '" ' : '';
      var securityLevel = this.liveMode && field.securityLevel ? ' data-security-level="' + field.securityLevel + '" ' : '';

      // Data binding
      var dataExpression = '';
      if (this.liveMode) {
         if (field.model) {
            // Use formatter directive if a data format is specified
            if (field.dataFormat) {
               var formatInfo = ' data-formatter="' + field.dataFormat + '" ';
               if (field.subFormat) formatInfo += ' data-sub-format="' + field.subFormat + '" ';
               if (field.formatOptions) formatInfo += ' data-format-options=\'' + serialize(field.formatOptions) + '\' ';

               dataExpression = '<span data-model="' + field.model + '" ' + formatInfo + '></span>';
            } else {
               dataExpression = '<span ng-bind="' + field.model + '"></span>';
            }
         }
      } else {
         dataExpression = '<span translate>wysiwyg.sample.data</span>';
      }

      // Data description binding
      var dataDescription = '';
      if (field.dataDesc) {
         if (this.liveMode) {
            // Separator displays when data description is not empty
            dataDescription += '<span ng-show="' + field.dataDesc + '"> - </span>';
            dataDescription += '<span ng-bind="' + field.dataDesc + '"></span>';
         } else {
            dataDescription = ' - <span translate>wysiwyg.sample.data.description</span>';
         }
      }

      // Tooltip
      var tooltipAttr = '';
      if (field.tooltip) {
         // May be dynamic reference or static translation key
         var tooltipExp = field.tooltip.startsWith('{{') ? field.tooltip : '{{\'' + field.tooltip + '\' | translate}}';

         // SoHo uses the title attribute for the tooltip
         tooltipAttr = ' title="' + tooltipExp + '" ';
      }

      // Label class (optionally hidden/audible)
      var labelClass = field.labelHidden ? 'label audible' : 'label';

      // HTML
      html += '<div' + this.getDataIdAttr(field) + this.getClassAttr(field, 'info-field summary-form field') + ngClick + ngShow + securityLevel + tooltipAttr + '>';
      html += this.getControlToolbar(field);
      html += '<span class="' + labelClass + '">' + this.startHyperlink(field, 'label') + '<span ' + (translateLabel ? 'translate' : '') + '>' + (label || '') + '</span>' + this.endHyperlink(field, 'label') + '</span>';
      html += '<span class="data">' + this.startHyperlink(field, 'data') + dataExpression + dataDescription + this.endHyperlink(field, 'data') + '</span>';

      // Add context field
      if (this.liveMode && field.contextEntity) {
         html += buildContextFieldDirective(field);
      }

      return html + '</div>';
   };

   JsonViewConverter.prototype.buildOption = function (option, parent) {
      var html = '';
      var label = escapeHtml(option.label);
      var isLabelDynamic = label && label.startsWith('{{');
      var translateLabel = !option.isLabelFromUser && !isLabelDynamic;

      // *** Important! *** We are implementing drop down and radio options to function in a case-insensitive way by manipulating
      //                    values in the options list to act like lowercase (but remembering the actual value via
      //                    the 'data-actual-value' attr)
      var lowercaseValue = (typeof option.value === 'string') ? option.value.toLowerCase().replace(/"/g, '&quot;') : option.value;
      var actualValue = ' data-actual-value="' + option.value.replace(/"/g, '&quot;') + '" ';

      // Drop down option
      if (parent.subType === 'DROP_DOWN' || parent.subType === 'MULTI_SELECT') {
         // WYSIWYG edit option
         var ngClick = !this.liveMode ? ' ng-click="editControl(\'' + option.id + '\')" ' : '';
         // Visible condition - using ng-if instead of ng-show since works better with SoHo drop-down
         var ngIf = this.liveMode && option.conditionShow ? ' ng-if="' + option.conditionShow + '" ' : '';

         // HTML
         html += '<option ' + this.getClassAttr(option) + ' value="' + lowercaseValue + '"' + actualValue + ngIf + ngClick + ' ' + (translateLabel ? 'translate' : '') + '>' + label + '</option>';
      }
      // Radio option
      else {
         // Get radio name attribute (ties each option to the set)
         var name = this.transientHtmlIdPrefix + parent.id;

         // Get html id to use
         var id = null;
         if (option.id) {
            id = this.getHtmlId(option, true);
         } else {
            // Shared options don't have an id so we make one that will be unique
            id = this.getHtmlId(parent, true) + '-opt-' + option.value;
         }

         // Conditions, events, and properties
         // TODO: how handle disabled, readonly parent/option???
         var ngModel = this.liveMode && parent.model ? ' ng-model="' + parent.model + '" ' : '';
         var ngChange = this.liveMode && parent.eventChange ? ' ng-change="' + parent.eventChange + '" ' : '';
         var ngDisabled = this.liveMode && parent.conditionDisabled ? ' ng-disabled="' + parent.conditionDisabled + '" ' : '';
         var ngReadonly = this.liveMode && parent.conditionReadonly ? ' ng-readonly="' + parent.conditionReadonly + '" ' : '';
         var ngShow = this.liveMode && option.conditionShow ? ' ng-show="' + option.conditionShow + '" ' : '';
         var radioOptionDirective = this.liveMode ? ' radio-option ' : '';

         // HTML
         html += '<div ' + this.getDataIdAttr(option) + this.getClassAttr(option, 'field radio-option') + ngShow + '>';
         html += this.getControlToolbar(option);
         html += '<input type="radio" id="' + id + '" class="radio" name="' + name + '" value="' + lowercaseValue + '"' + actualValue + radioOptionDirective + ngModel + ngChange + ngDisabled + ngReadonly + '/>';
         html += '<label for="' + id + '" class="radio-label" ' + (translateLabel ? 'translate' : '') + '>' + label + '</label>';
         html += '</div>';
      }

      return html;
   };

   JsonViewConverter.prototype.buildSwapList = function (control) {
      var cssClass = control.children && control.children.length >= 3 ? ' one-third ' : '';

      // Conditions, Properties, etc.
      var directive = this.liveMode ? ' swaplist ' : '';
      var ngShow = this.liveMode && control.conditionShow ? ' ng-show="' + control.conditionShow + '" ' : '';
      var isReadonly = this.liveMode && control.conditionReadonly ? ' data-is-readonly="' + control.conditionReadonly + '" ' : '';
      var onChange = this.liveMode && control.eventChange ? ' data-on-change="' + control.eventChange + '" ' : '';

      // Need to blank out soho template option in order for our angular approach to work
      var options = this.liveMode ? ' data-options=\'{"template": ""}\' ' : '';

      var html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'swaplist ' + cssClass) + directive + options + ngShow + isReadonly + onChange + '>';
      html += this.getControlToolbar(control);

      // Lists
      html += this.buildChildren(control);

      return html + '</div>';
   };

   /**
    * An individual list within a Swap List control
    */
   JsonViewConverter.prototype.buildSwapListList = function (control, parent) {
      var model = control.model;
      var labelField = control.labelField || '';
      var valueField = control.valueField || '';
      var listIndex = parent.children.indexOf(control);
      var hasThree = parent.children.length === 3;
      var isLeft = listIndex === 0;
      var isRight = listIndex === parent.children.length - 1;
      var isMiddle = listIndex !== 0 && listIndex !== parent.children.length - 1;
      var label = escapeHtml(control.label);
      var isLabelDynamic = label && label.startsWith('{{');
      var translateLabel = !control.isLabelFromUser && !isLabelDynamic;

      // SoHo uses specific classes for the left list, right list, middle list
      var cardClass = isLeft ? ' available ' : (isRight && hasThree ? 'full-access' : 'selected');

      // Conditions, Properties, etc.
      var buttonDisabledExp = this.liveMode && parent.conditionReadonly ? ' ng-disabled="' + parent.conditionReadonly + '" ' : '';

      var html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'card ' + cardClass) + '>';
      html += this.getControlToolbar(control);

      html += '<div class="card-header">';
      html += '<h2 class="card-title" ' + (translateLabel ? 'translate' : '') + '>' + label + '</h2>';
      html += '<div class="buttons">';

      // Add move buttons depending on list position and number of lists
      if (isLeft) {
         if (parent.children.length > 1) {
            html += '<button class="btn btn-moveto-selected" type="button" ' + buttonDisabledExp + '><span class="audible" translate>global.move.right</span><svg class="icon"><use xlink:href="#icon-right-arrow"></use></svg></button>';
         }
      } else if (isMiddle) {
         html += '<button class="btn btn-moveto-left" type="button" ' + buttonDisabledExp + '><span class="audible" translate>global.move.left</span><svg class="icon"><use xlink:href="#icon-left-arrow"></use></svg></button>';
         html += '<button class="btn btn-moveto-right" type="button" ' + buttonDisabledExp + '><span class="audible" translate>global.move.right</span><svg class="icon"><use xlink:href="#icon-right-arrow"></use></svg></button>';
      } else if (isRight) {
         var rightBtnClass = hasThree ? ' btn-moveto-selected ' : ' btn-moveto-left ';
         html += '<button class="btn ' + rightBtnClass + '" type="button" ' + buttonDisabledExp + '><span class="audible" translate>global.move.left</span><svg class="icon"><use xlink:href="#icon-left-arrow"></use></svg></button>';
      }

      html += '</div></div>';

      // Info required by directive
      var modelAttr = ' data-model="' + model + '" ';
      var valueAttr = ' data-value-field="' + valueField + '" ';

      html += '<div class="card-content">';
      html += '<div class="listview" data-selectable="multiple" ' + modelAttr + valueAttr + '>';

      // List items
      if (this.liveMode) {
         // List model may be objects (w/ label and value fields), or primitives (strings, numbers)
         var labelRef = labelField ? 'item.' + labelField : 'item';
         var valueRef = valueField ? 'item.' + valueField : 'item';

         html += '<ul data-swap-handle=".handle">';
         html += '<li ng-repeat="item in ' + model + '" data-value="{{' + valueRef + '}}" role="option" tabindex="0">';
         html += '<span class="handle" focusable="false" aria-hidden="true" role="presentation">&#8286;</span>';
         html += '<div class="swaplist-item-content"><p>{{' + labelRef + '}}</p></div>';
         html += '</li>';
         html += '</ul>';
      }

      html += '</div></div>';

      return html + '</div>';
   };

   JsonViewConverter.prototype.buildWizard = function (control) {
      // Conditions
      var ngShow = this.liveMode && control.conditionShow ? ' ng-show="' + control.conditionShow + '" ' : '';

      var html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'wizard') + ngShow + '>';
      html += this.getControlToolbar(control);

      html += '<div class="wizard-header"><div class="bar">';
      html += '<div class="completed-range"></div>';

      // Ticks
      html += this.buildChildren(control);

      html += '</div></div>';

      return html + '</div>';
   };

   JsonViewConverter.prototype.buildWizardTick = function (control) {
      var label = escapeHtml(control.label);
      var isLabelDynamic = label && label.startsWith('{{');
      var translateLabel = !control.isLabelFromUser && !isLabelDynamic;

      // Show something for dynamic labels when not live mode
      if (isLabelDynamic && !this.liveMode) {
         label = 'wysiwyg.sample.label.dynamic';
         translateLabel = true;
      }

      // Conditions, Properties, etc.
      var ngShow = this.liveMode && control.conditionShow ? ' ng-show="' + control.conditionShow + '" ' : '';
      var isCurrent = this.liveMode && control.conditionSelected ? ' is-current="' + control.conditionSelected + '" ' : '';
      var isDisabled = this.liveMode && control.conditionDisabled ? ' is-disabled="' + control.conditionDisabled + '" ' : '';
      var uiSref = this.liveMode && control.stateRef ? ' ui-sref="' + control.stateRef + '" ' : '';

      // Click event
      var ngClick;
      if (this.liveMode) {
         ngClick = control.eventClick ? ' ng-click="' + control.eventClick + '" ' : '';
      } else {
         // Note: in wysiwyg the click needs to open the control menu (since can't have the actions button)
         ngClick = ' ng-click="openControlMenu(\'' + control.id + '\')" ';
      }

      var html = '<a ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'tick') + ' wizard-tick href="" ' + ngClick + uiSref + ngShow + isCurrent + isDisabled + '>';
      html += '<span class="label" ' + (translateLabel ? 'translate' : '') + '>' + label + '</span>';
      return html + '</a>';
   };

   JsonViewConverter.prototype.buildChart = function (control) {
      var html;

      // Chart type: we do subTypes as all caps and underscores, but soho does chart types as lower case and dashes
      //             Ex: PIE -> pie, COMPLETION_TARGET -> completion-target
      var type = control.subType ? control.subType.toLowerCase().replace(/_/g, '-') : '';

      // Properties, conditions, etc.
      var chartDirective = this.liveMode ? ' chart ' : '';
      var ngShow = this.liveMode && control.conditionShow ? ' ng-show="' + control.conditionShow + '" ' : '';
      var height = control.height ? 'height: ' + control.height + '; ' : '';
      var width = control.width ? 'width: ' + control.width + '; ' : '';
      var style = ' style="' + height + width + '" ';

      html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'chart-container') + chartDirective + ' data-type="' + type + '" data-chart-options="' + control.chartOptions + '" data-init="false" ' + style + ngShow + '>';
      html += this.getControlToolbar(control);

      // Add chart icon if not live mode
      if (!this.liveMode) {
         html += '<div style="font-size: 16px; text-align: center; padding-bottom: 15px;" translate>' + control.label + '</div>';
         html += '<svg class="icon icon-empty-state" focusable="false" aria-hidden="true" role="presentation"><use xlink:href="#icon-empty-no-analytics"></use></svg>';
      }

      html += '</div>';

      return html;
   };

   JsonViewConverter.prototype.buildImage = function (control) {
      var html;

      // Properties, conditions, etc.
      var ngShow = this.liveMode && control.conditionShow ? ' ng-show="' + control.conditionShow + '" ' : '';
      var height = control.height ? 'height: ' + control.height + '; ' : '';
      var width = control.width ? 'width: ' + control.width + '; ' : '';
      var style = ' style="' + height + width + '" ';

      html = '<div ' + this.getDataIdAttr(control) + this.getClassAttr(control, 'image-container') + ngShow + '>';
      html += this.getControlToolbar(control);

      // Live image or placeholder for wysiwyg
      if (this.liveMode) {
         html += '<img ng-src="' + control.source + '" alt="{{\'' + control.label + '\' | translate}}" ' + style + '>';
      } else {
         html += '<div style="font-size: 16px; text-align: center; padding-bottom: 10px" translate>' + control.label + '</div>';
         html += '<img src="ui/app/assets/images/image-placeholder.png" alt="{{\'wysiwyg.control.image\' | translate}}" style="margin: auto; display: block; width: 18px;">';
      }

      return html + '</div>';
   };

   JsonViewConverter.prototype.buildContextField = function (control) {
      var html = '';

      // Live mode: build directive
      // Dev mode: show nothing (since context fields are shown in sidebar)
      if (this.liveMode) {
         html += buildContextFieldDirective(control);
      }

      return html;
   };

   JsonViewConverter.prototype.getControlToolbar = function (control, excludeFromPersonalize) {
      // For live mode we don't render the control actions
      // For personalize mode we don't render it for controls that can't be personalized
      if (this.liveMode || (this.personalizeMode && excludeFromPersonalize)) {
         return '';
      } else {
         // TODO: is there a better workaround to CSS select toolbar of a checkbox field?
         var subClass = control.subType === 'CHECKBOX' ? 'checkbox-toolbar' : '';

         return '<div class="control-toolbar ' + subClass + '" title="' + getActionsTooltip(control) + '"><button class="btn-icon btn-menu" data-init="false" ng-click="openControlMenu(\'' + control.id + '\')"><svg class="icon" focusable="false"><use xlink:href="#icon-more"></use></svg></button></div>';
      }
   };

   JsonViewConverter.prototype.getDataIdAttr = function (control) {
      if (!this.liveMode) {
         return ' data-control-id="' + control.id + '" ';
      } else {
         return '';
      }
   };

   // Get the class attribute with additional standard classes required on the container of wysiwyg controls
   JsonViewConverter.prototype.getClassAttr = function (control, startingClass) {
      var classes = '';

      // Add classes passed in
      if (startingClass) {
         classes += startingClass;
      }

      // Add custom css classes defined on this control
      if (control.cssClass) {
         classes += ' ' + control.cssClass;
      }

      // Add extra/hidden class (wysiwyg style purposes only)
      if (control.extra && !this.liveMode) {
         classes += ' extra';
      }

      // Add wysiwyg class when in wysiwyg (used by logic specific to controls in wysiwyg)
      if (!this.liveMode) {
         classes += ' wys-control';
      }

      return ' class="' + classes + '" ';
   };

   JsonViewConverter.prototype.getHtmlId = function (control, idOnly) {
      var value;

      // Use html id (but only when live mode to avoid conflicts with wysiwyg) or a temporary id that will be unique
      if (this.liveMode && control.htmlId) {
         value = control.htmlId;
      } else {
         value = this.transientHtmlIdPrefix + control.id;
      }

      return idOnly ? value : ' id="' + value + '" ';
   };

   /**
    * Return the next available control id number that can be used for this view. See comments in constructor for details.
    */
   JsonViewConverter.prototype.getNextAvailableId = function () {
      return ++this.maxId;
   };

   JsonViewConverter.prototype.getMaxId = function () {
      return this.maxId;
   };

   JsonViewConverter.prototype.setMaxId = function (maxId) {
      this.maxId = maxId;
   };

   JsonViewConverter.prototype.hasId = function (id) {
      return this.controlIdToControlMap.hasOwnProperty(id);
   };

   /**
    * Build starting tag for a hyperlink (if exists)
    */
   JsonViewConverter.prototype.startHyperlink = function (control, linkName) {
      var link = control.hyperlinks ? control.hyperlinks[linkName] : null;

      if (link) {
         var html = '<a href="' + (link.href || '') + '" class="hyperlink" ';

         if (link.stateRef) {
            html += ' ui-sref="' + link.stateRef + '" ';
         }

         if (link.eventClick) {
            html += ' ng-click="' + link.eventClick + '" ';
         }

         return html + '>';
      } else {
         return '';
      }
   };

   /**
    * Build ending tag for a hyperlink (if exists)
    */
   JsonViewConverter.prototype.endHyperlink = function (control, linkName) {
      if (control.hyperlinks && control.hyperlinks[linkName]) {
         return '</a>';
      } else {
         return '';
      }
   };

   /**
    * Build mock grid (used only in wysiwyg)
    */
   JsonViewConverter.prototype.buildMockGrid = function (grid, options, columns) {
      var html = '<div class="datagrid-container is-windows is-gridlist">';
      html += '<div class="datagrid-header"><table role="grid"><thead><tr role="role">';

      // Add an extra header cell for the grid's menu button
      html += '<th style="width: 40px;"><div class="datagrid-column-wrapper "></div></th>';

      // Add an extra header cell for the expander
      if (options.showExpander) {
         html += '<th style="width: 50px;"><div class="datagrid-column-wrapper "></div></th>';
      }
      // Add an extra header cell for the checkboxes
      if (options.showCheckboxes) {
         if (options.selectable === 'multiple') {
            html += '<th style="width: 50px;"><div class="datagrid-checkbox-wrapper l-center-text"><span class="datagrid-header-text"></span><span class="datagrid-checkbox" role="checkbox"></span></div></th>';
         } else {
            html += '<th style="width: 50px;"><div class="datagrid-column-wrapper "></div></th>';
         }
      }
      // Add an extra header cell for the drill-down
      if (options.showDrilldown) {
         html += '<th style="width: 80px;"><div class="datagrid-column-wrapper "></div></th>';
      }

      // Build mock columns
      html += this.buildChildren(grid);

      html += '</tr></thead></table></div>';

      // Data cells (need to immitate soho's horizontal scrolling synchronization)
      var onScroll = 'onscroll="$(this).prev()[0].scrollLeft = this.scrollLeft;"';
      html += '<div class="datagrid-body" ' + onScroll + '><table class="datagrid" role="grid"><tbody><tr role="row" class="datagrid-row">';

      // 1 extra for menu button column
      html += '<td style="width: 40px;" role="gridcell" class="is-readonly"><div class="datagrid-cell-wrapper"></div></td>';

      // Add expander cell
      if (options.showExpander) {
         html += '<td style="width: 50px;" role="gridcell" class="is-readonly l-center-text"><div class="datagrid-cell-wrapper"><button class="btn-icon datagrid-expand-btn"><span class="icon plus-minus"></span></button></div></td>';
      }
      // Add checkbox cell
      if (options.showCheckboxes) {
         html += '<td style="width: 50px;" role="gridcell" class="is-readonly l-center-text"><div class="datagrid-cell-wrapper"><div class="datagrid-checkbox-wrapper"><span role="checkbox" class="datagrid-checkbox"></span></div></div></td>';
      }
      // Add drill-down cell
      if (options.showDrilldown) {
         html += '<td style="width: 80px;" role="gridcell" class="is-readonly l-center-text"><div class="datagrid-cell-wrapper"><button class="btn-icon small datagrid-drilldown"><svg class="icon" focusable="false" aria-hidden="true" role="presentation"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-drilldown"></use></svg><span>Drill down</span></button></div></td>';
      }

      // Build mock data cells
      for (var i = 0; i < columns.length; i++) {
         var col = columns[i];
         var subType = col.subType;
         var dataFormat = col.dataFormat;
         var isHyperlink = subType === 'HYPERLINK';
         var readonlyClass = !col.editable ? ' is-readonly ' : '';
         var style = col.width ? ' style="width: ' + col.width + 'px" ' : '';

         // Hyperlink formatting
         var linkStart = isHyperlink ? '<a class="hyperlink">' : '';
         var linkEnd = isHyperlink ? '</a>' : '';

         if (col.customFormatter) {
            html += '<td role="gridcell" ' + style + ' class="' + readonlyClass + '"><div class="datagrid-cell-wrapper">' + linkStart + 'Custom' + linkEnd + '</div></td>';
         } else if (subType === 'CHECKBOX') {
            html += '<td role="gridcell" ' + style + ' class="' + readonlyClass + 'l-center-text"><div class="datagrid-cell-wrapper"><div class="datagrid-checkbox-wrapper"><span role="checkbox" class="datagrid-checkbox is-checked"></span></div></div></td>';
         } else if (subType === 'DATE') {
            html += '<td role="gridcell" ' + style + ' class="' + readonlyClass + '"><div class="datagrid-cell-wrapper">' + linkStart + '1/15/2015' + linkEnd + '</div></td>';
         } else if (subType === 'DROP_DOWN') {
            html += '<td role="gridcell" ' + style + ' class="' + readonlyClass + '"><div class="datagrid-cell-wrapper">';

            // Build mock drop down control
            html += '<select id="mockDropDown' + col.id + '" class="dropdown dropdown-sm">';

            // Add blank option (if true or default/undefined)
            if (col.blankOption !== false) {
               if (col.blankOptionLabel) {
                  html += '<option value="" translate>' + col.blankOptionLabel + '</option>';
               } else {
                  // The default display of the blank option label is to show empty
                  // Note: SoHo requires an HTML space character for the blank option to show up
                  html += '<option value="">&nbsp;</option>';
               }
            }

            if (col.type3 === 'INLINE') {
               html += this.buildChildren(col);
            }
            html += '</select>';

            html += '</div></td>';
         } else if (subType === 'LOOKUP') {
            html += '<td role="gridcell" ' + style + ' class="' + readonlyClass + 'datagrid-trigger-cell"><div class="datagrid-cell-wrapper"><span class="trigger">Lookup</span><svg role="presentation" aria-hidden="true" focusable="false" class="icon icon-search-list"><use xlink:href="#icon-search-list"/></svg></div></td>';
         } else if (subType === 'TEXT_AREA') {
            html += '<td role="gridcell" ' + style + ' class="' + readonlyClass + '"><div class="datagrid-cell-wrapper">' + linkStart + '<span class="datagrid-textarea">Text area with multiple lines of text &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>' + linkEnd + '</div></td>';
         } else if (subType === 'TIME') {
            html += '<td role="gridcell" ' + style + ' class="' + readonlyClass + '"><div class="datagrid-cell-wrapper">' + linkStart + '12:00 AM' + linkEnd + '</div></td>';

            // Done checking subType...now check dataFormat

         } else if (dataFormat === 'CURRENCY') {
            html += '<td role="gridcell" ' + style + ' class="' + readonlyClass + 'l-right-text"><div class="datagrid-cell-wrapper">' + linkStart + '1.50' + linkEnd + '</div></td>';
         } else if (dataFormat === 'DECIMAL') {
            html += '<td role="gridcell" ' + style + ' class="' + readonlyClass + 'l-right-text"><div class="datagrid-cell-wrapper">' + linkStart + '1,000.1' + linkEnd + '</div></td>';
         } else if (dataFormat === 'DECIMAL_TEXT') {
            html += '<td role="gridcell" ' + style + ' class="' + readonlyClass + '"><div class="datagrid-cell-wrapper">' + linkStart + '1000.1' + linkEnd + '</div></td>';
         } else if (dataFormat === 'ELLIPSIS') {
            html += '<td role="gridcell" ' + style + ' class="' + readonlyClass + '"><div class="datagrid-cell-wrapper">' + linkStart + 'Ellipsis...' + linkEnd + '</div></td>';
         } else if (dataFormat === 'INTEGER') {
            html += '<td role="gridcell" ' + style + ' class="' + readonlyClass + 'l-right-text"><div class="datagrid-cell-wrapper">' + linkStart + '1,000' + linkEnd + '</div></td>';
         } else if (dataFormat === 'INTEGER_TEXT') {
            html += '<td role="gridcell" ' + style + ' class="' + readonlyClass + '"><div class="datagrid-cell-wrapper">' + linkStart + '1000' + linkEnd + '</div></td>';
         } else if (dataFormat === 'PERCENT') {
            html += '<td role="gridcell" ' + style + ' class="' + readonlyClass + 'l-right-text"><div class="datagrid-cell-wrapper">' + linkStart + '50 %' + linkEnd + '</div></td>';
         } else if (dataFormat === 'PHONE') {
            html += '<td role="gridcell" ' + style + ' class="' + readonlyClass + '"><div class="datagrid-cell-wrapper">' + linkStart + '(123) 456-7890' + linkEnd + '</div></td>';
         } else if (dataFormat) {
            // Probably a custom shared type
            html += '<td role="gridcell" ' + style + ' class="' + readonlyClass + '"><div class="datagrid-cell-wrapper">' + linkStart + dataFormat + linkEnd + '</div></td>';
         } else {
            // Assume Text for all others
            html += '<td role="gridcell" ' + style + ' class="' + readonlyClass + '"><div class="datagrid-cell-wrapper">' + linkStart + 'Text' + linkEnd + '</div></td>';
         }
      }
      html += '</tr></tbody></table></div>';

      return html + '</div>';
   };


   // Private methods

   function getActionsTooltip(control) {
      return $translate.instant(ControlMeta[control.type].displayName);
   }

   /**
    * Return a copy of the incoming string that is safe for insertion in the DOM.
    * This is to prevent script injection (XSS) attacks.
    * This implementation encodes all HTML angle brackets, thus changing any HTML to text.
    */
   function escapeHtml(str) {
      if (str) {
         return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      } else {
         return str;
      }
   }

   /**
    * Serialize the object into JSON that is safe for use in an HTML attribute
    * (assuming single quotes will be used for the attribute since JSON has double quotes).
    */
   function serialize(object, replaceCurlyBraces) {
      if (object) {
         // Stringify and then escape all single quotes
         // (and conditionally escape expression binding braces so that Angular won't try to evaluate them)
         if (replaceCurlyBraces) {
            return JSON.stringify(object).replace(/'/g, '&#39;').replace(/{{/g, '{|').replace(/}}/g, '|}');
         } else {
            return JSON.stringify(object).replace(/'/g, '&#39;');
         }
      } else {
         return '';
      }
   }

   /**
    * Build html for context field directive (used by form fields, info fields, and hidden context fields)
     */
   function buildContextFieldDirective(control, isLookup) {
      var html = '<context-field style="display: none;"';
      var model = control.model || '';
      var contextEntity = control.contextEntity || '';

      // If model is a getter/setter model, added invoke parentheses to the model to be watched
      if (control.modelOptions && control.modelOptions.getterSetter) {
         model += '()';
      }

      html += ' data-context-entity="' + contextEntity + '" data-model="' + model +'" ';

      if (control.contextOptions) {
         html += ' data-context-options=\'' + serialize(control.contextOptions, true) + '\' ';
      }
      if (control.contextValues) {
         html += ' data-context-values=\'' + serialize(control.contextValues, true) + '\' ';
      }

      // For lookup fields, add lookup type so can get context entity from lookup definition
      if (isLookup && control.meta) {
         html += ' data-lookup-type="' + control.meta + '" ';
      }

      return html + '/>';
   }

   /**
    * Convert inline children options to SoHo grid column options
    */
   function convertToGridColumnOptions(column) {
      var array = [];
      var children = column.children;

      // Add blank option (if true or default/undefined)
      if (column.blankOption !== false) {
         if (column.blankOptionLabel) {
            array.push({label: column.blankOptionLabel, value: ''});
         } else {
            // The default display of the blank option label is to show empty
            // Note: SoHo requires an HTML space character for the blank option to show up
            array.push({label: '&nbsp;', value: ''});
         }
      }

      if (children) {
         for (var i = 0; i < children.length; i++) {
            var optControl = children[i];

            // Note: converting id number to string since SoHo expects string ids
            var id = optControl.id.toString();

            array.push({
               id: id,
               label: optControl.label || '&nbsp;', // Note: a blank option needs an HTML space in order for SoHo to show it
               value: optControl.value
            });
         }
      }

      return array;
   }

   return JsonViewConverter;
});
