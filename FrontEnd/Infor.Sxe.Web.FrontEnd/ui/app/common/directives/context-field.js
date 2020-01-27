'use strict';

/**
 * Directive for handling context entity data for a particular field and passing to ContextService.
 */
app.directive('contextField', function contextField($state, ContextEntities, ContextService, Lookups, TabService) {

   return {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {
         var contextEntityKey = getContextEntityKey(attrs);
         var contextEntity = contextEntityKey ? ContextEntities[contextEntityKey] : null;
         var options = attrs.contextOptions ? JSON.parse(attrs.contextOptions) : {};
         var values = attrs.contextValues ? JSON.parse(attrs.contextValues) : {};

         // Do not proceed if no context entity found, or if field is statically deactivated
         if (!contextEntity || options.deactivated === true) {
            return;
         }

         var keyModels = getKeyModels(values, attrs);
         var stateName = getStateName(element, scope);
         var entityId = null;

         // If there is not an expression defined for each key field, do not proceed (it means the key values aren't properly completed)
         if (keyModels.length !== contextEntity.keyFields.length) {
            return;
         }

         // Watch all key models (array of model expressions)
         scope.$watchGroup(keyModels, function (newValues) {
            var i, value, field, data = {}, isKeyDataSufficient = true;

            // Do not proceed if field is currently deactivated (by evaluating condition)
            if (options.deactivated && scope.$eval(options.deactivated)) {
               return;
            }

            // Build key data
            for (i = 0; i < newValues.length; i++) {
               value = newValues[i];
               field = contextEntity.keyFields[i];

               // Add key value if has value, is optional, or is 0 and allowing zero as key
               if (value || field.optional || (field.allowZero && value === 0)) {
                  data['key' + (i + 1)] = value;
               } else {
                  isKeyDataSufficient = false;
                  break;
               }
            }

            // Add to context if there is enough key data present to be a valid record, otherwise remove
            if (isKeyDataSufficient) {

               // First, remove old record if present
               if (entityId) {
                  ContextService.removeEntityFromState(stateName, entityId);
               }

               // Add and hold onto new entityId
               entityId = ContextService.addEntityToState(stateName, contextEntityKey, data, options);
            } else if (entityId) {
               ContextService.removeEntityFromState(stateName, entityId);
               entityId = null;
            }
         });
      }
   };

   function getContextEntityKey(attrs) {
      var entityKey;

      // For lookup fields, get context entity from lookup definition
      if (attrs.lookupType) {
         var lookup = Lookups[attrs.lookupType];
         entityKey = lookup ? lookup.contextEntity : null;
      } else {
         entityKey = attrs.contextEntity;
      }

      return entityKey;
   }

   /**
    * Get key models (values of key1, key2, etc.) as an array so can watch all expressions via scope.$watchGroup.
    *
    * From: { key1: 'dtl.arss.custno', key2: 'dtl.arss.shipto', key4: 'dtl.arss.anotherkey' }
    *
    * To: ['dtl.arss.custno', 'dtl.arss.shipto', undefined, 'dtl.arss.anotherkey']
     */
   function getKeyModels(values, attrs) {
      var prop, keyModels = [];

      // Use model as key1 (unless overridden with a specified key1 expression)
      if (!values.key1) {
         values.key1 = attrs.model;
      }

      // Build array
      for (prop in values) {
         if (values.hasOwnProperty(prop) && prop.startsWith('key')) {
            var keyNum = parseInt(prop.replace('key', ''), 10);
            keyModels[keyNum - 1] = values[prop];
         }
      }

      return keyModels;
   }

   /**
    * Get the state name that this context field is associated with. It is usually the current state, unless the view
    * was brought in by the base state.
    */
   function getStateName(element, scope) {
      var stateName;

      // If element is in the sidebar, then we know it was brought in via the base state
      if (element.closest('section.sidebar').length) {
         stateName = TabService.getBaseStateName(scope);
      } else {
         stateName = $state.current.name;
      }

      return stateName;
   }
});
