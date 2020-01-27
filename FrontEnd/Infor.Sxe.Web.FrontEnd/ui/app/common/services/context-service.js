'use strict';

/**
 * Service for managing application context in order to notify context apps
 *
 * The structure of the context state map is like this = {
        'arsc': {},
        'arsc.detail': {},
        'arsc.detail.edit': {},
        'arele': {},
        'arele.detail': {
            isPublishPending: false,
            screenIdSuffix: '',
            entities: {
               4: {
                  entityKey: 'Arss',
                  contextEntity: {...}, // ContextEntities.Arss
                  data: {
                     key1: '',
                     key2: ''
                  }
               },
               7: {
                  entityKey: 'Icsd',
                  contextEntity: {...}, // ContextEntities.Icsd
                  data: {
                     key1: ''
                  }
               },
               21: {
                  entityKey: 'Icsd',
                  contextEntity: {...}, // ContextEntities.Icsd
                  data: {
                     key1: ''
                  }
               }
            }
        }
    };
 */
app.service('ContextService', function ContextService($state, $translate, AppInfoService, ConfigService, ContextEntities, DataService, Constants, CacheService, ReportService, Utils) {
   var self = this;

   // Map to store context for each state
   var contextMap = {};

   // The last context that was published
   var lastContext = { entities: [], screenId: '' };

   // The logicalId to send on the business context messages (comes from Ming.le via a url param on the iframe window)
   var logicalId = AppInfoService.getUrlParam('LogicalId');

   // Flag for logging enabled/disabled
   var loggingEnabled = sessionStorage['SXE_ENABLE_CONTEXT_LOGGING'] === 'true';

   // Map to store context for each state
   var majorBucket = 'B';

   // Delay between scheduling a context publish and performing it (in milliseconds)
   // The purpose of the delay is to give time for screens and fields to update so we reduce the number of messages sent
   self.publishDelay = 400;

   /* Public API */

   /**
    * API for adding an entity to the context of the current state
    * @param contextEntity - key to the ContextEntity
    * @param data - message data to be published
    * @param options - additional options
     */
   this.addEntity = function (contextEntity, data, options) {
      var stateName = resolveStateName($state.current.name);
      var entity = {
         entityKey: contextEntity,
         contextEntity: ContextEntities[contextEntity],
         data: data,
         options: options
      };

      return addEntityToStateContext(stateName, entity);
   };

   /**
    * API for adding to particular state
    * @param stateOrStateName
    * @param contextEntity - key to the ContextEntity
    * @param data - message data to be published
    * @param options - additional options
   */
   this.addEntityToState = function (stateOrStateName, contextEntity, data, options) {
      var stateName = resolveStateName(stateOrStateName);
      var entity = {
         entityKey: contextEntity,
         contextEntity: ContextEntities[contextEntity],
         data: data,
         options: options
      };

      return addEntityToStateContext(stateName, entity);
   };

   /**
    * API for adding a custom entity to the context of the current state. This is for entities that have custom
    * message data and are not defined in context-entities.js.
    * @param messageType - the message type ('OutgoingIAData', 'ViewSxeEntities', etc.)
    * @param data - message data to be published
    * @param options - additional options
    */
   this.addCustomEntity = function (messageType, data, options) {
      var stateName = resolveStateName($state.current.name);

      //add screenId so we can send back messages to active screen
      data.screenId = stateName.split('.')[0];

      var entity = {
         entityKey: messageType,
         messageType: messageType,
         data: data,
         options: options
      };

      return addEntityToStateContext(stateName, entity);
   };

   /**
    * API for adding a custom entity to a particular state.
    * @param stateOrStateName
    * @param messageType - the message type ('OutgoingIAData', 'ViewSxeEntities', etc.)
    * @param data - message data to be published
    * @param options - additional options
    */
   this.addCustomEntityToState = function (stateOrStateName, messageType, data, options) {
      var stateName = resolveStateName(stateOrStateName);
      var entity = {
         entityKey: messageType,
         messageType: messageType,
         data: data,
         options: options
      };

      return addEntityToStateContext(stateName, entity);
   };

   /**
    * API for removing an entity from the context of the current state
    * @param entityId - the id assigned when this entity was added
    */
   this.removeEntity = function (entityId) {
      var stateName = resolveStateName($state.current.name);

      removeEntityFromStateContext(stateName, entityId);
   };

   /**
    * API for removing from particular state
    * @param stateOrStateName
    * @param entityId - the id assigned when this entity was added
    */
   this.removeEntityFromState = function (stateOrStateName, entityId) {
      var stateName = resolveStateName(stateOrStateName);

      removeEntityFromStateContext(stateName, entityId);
   };

   /**
    * Clear the context for a particular state
    * Note: we purposely don't use the resolveState logic here
    */
   this.clearState = function (stateOrStateName) {
      var stateName = (typeof stateOrStateName === 'object') ? stateOrStateName.name : stateOrStateName;

      delete contextMap[stateName];
   };

   /**
    * Clear the context for all states in the tree of baseStateName (happens when a tab closes)
    */
   this.clearStateTree = function (baseStateName) {
      var state;
      var prefix = baseStateName + '.';

      // Clear base state
      delete contextMap[baseStateName];

      // Clear all children of base state (those with a name of <base>.xxx)
      for (state in contextMap) {
         if (contextMap.hasOwnProperty(state) && state.startsWith(prefix)) {
            delete contextMap[state];
         }
      }
   };

   /**
    * API for clearing local and optionally business context cache.
    * @param serverAlso - Clear the server cache
    */
   this.clearCache = function (serverAlso) {
      CacheService.flush(false, majorBucket);
      if (serverAlso) {
         DataService.get('api/businesscontext/clearcontextcache');
      }
   };

   /**
    * Publish a clear context message (should happen when switching between tabs)
    */
   this.clearContext = function () {
      infor.companyon.client.sendMessage('SxeClear', {timestamp: Date.now()});
   };

   /**
    * Publish a clear context message for the Dimension Calculator (i.e. when
    * a line is added and/or reset/initialized.
    */
   this.clearDimensionCalculatorContext = function () {
      infor.companyon.client.sendMessage('SxeClearDimensionCalculator', { timestamp: Date.now() });
   };

   /**
    * Set the current suffix for the screen id of a state (used for tabs, sastt, and other special cases)
    */
   this.setScreenIdSuffix = function (suffix, stateOrStateName) {
      var stateName = resolveStateName(stateOrStateName);
      var stateContext = getStateContextObject(stateName);

      // Set suffix on this state's context for use when publishing
      stateContext.screenIdSuffix = suffix;

      // Publish context to Ming.le
      schedulePublish(stateName);
   };

   /**
    * Switch to the context of a particular state
    */
   this.switchToState = function (stateOrStateName) {
      var stateName = resolveStateName(stateOrStateName);

      // Publish bookmark to Ming.le
      publishBookmark(stateName);

      // Publish context to Ming.le
      schedulePublish(stateName);
   };

   /**
    * Build the screen ID to be used in the business context message for the given state and an optional suffix
    */
   this.getScreenId = function (state, suffix) {
      var screenId, url;
      var stateData = state.data || {};

      // Use custom screenId if defined on state
      // Note: we use "hasOwnProperty" to ensure it's not a screenId inherited from a parent state's data
      if (stateData.hasOwnProperty('screenId')) {
         screenId = stateData.screenId;
      } else {
         // Build state screen ID from url
         url = $state.href(state.name);

         // If state is a multiple state (numbered oeet2, oeet3, etc.), then remove the number from the url
         // so that the screenId properly matches the ICUA documentation
         if (stateData.allowMultiple) {
            var baseState = state.name.split('.')[0];
            var numberEnd = baseState.match(/\d+$/);

            if (numberEnd) {
               url = url.replace(numberEnd[0], '');
            }
         }

         // Modify the url to be clean and consistent for use as the screen ID
         // - add sx_ prefix
         // - remove beginning '#/'
         // - remove ending param portion after '?'
         // - remove duplicate slashes
         // - remove trailing slashes
         // - replace slashes with dashes
         screenId = 'sx_' + url.replace('#/', '').split('?')[0].replace(/\/\//g, '/').replace(/\/$/, '').replace(/\//g, '-');
      }

      // Append suffix if there is one
      if (suffix) {
         screenId += '-' + suffix;
      }

      return screenId;
   };

   this.isLoggingEnabled = function () {
      return loggingEnabled;
   };

   this.toggleLogging = function (isEnable) {
      loggingEnabled = isEnable;
      sessionStorage['SXE_ENABLE_CONTEXT_LOGGING'] = isEnable;
   };


   /* Private methods */

   function getStateContextObject(stateName) {
      var stateContext = contextMap[stateName];

      // Initialize context object for this state if doesn't exist
      if (!stateContext) {
         stateContext = {
            isPublishPending: false,
            entities: {}
         };
         contextMap[stateName] = stateContext;
      }

      return stateContext;
   }

   function resolveStateName(stateOrStateName) {
      var stateName = (typeof stateOrStateName === 'object') ? stateOrStateName.name : stateOrStateName;
      var state = $state.get(stateName);

      // We have special handling for our ".edit" states where they revert to the context of the parent state ("detail")
      // instead of having their own context. This is because .edit states don't have their own view (they continue to show the parent view).
      if (!state.views && stateName.endsWith('.edit')) {
         stateName = stateName.substring(0, stateName.length - 5);
      }

      return stateName;
   }

   function addEntityToStateContext(stateName, entity) {
      var stateContext = getStateContextObject(stateName);
      var entityId = Utils.getTransientId();

      // Add to context
      stateContext.entities[entityId] = entity;

      // Publish context to Ming.le
      // Note: We always publish the current state, not necessarily the state tied to the context field that
      //       invoked the adding. This is because a context field may be in a base state view (left sidebar), and
      //       we need to publish the actual current state (which inherits from base), not just the base state.
      var stateToPublish = resolveStateName($state.current.name);
      schedulePublish(stateToPublish);

      return entityId;
   }

   function removeEntityFromStateContext(stateName, entityId) {
      var stateContext = contextMap[stateName];

      if (stateContext) {
         delete stateContext.entities[entityId];
      }

      // Note: we are not publishing context after a remove because the web parts don't support a remove call,
      //       but if we wanted to, we could send the SxeClear message, and then publish context to achieve the same.
   }

   /**
    * Schedule a publish to happen for the given state
    */
   function schedulePublish(stateName) {
      var stateContext = getStateContextObject(stateName);

      // Check if a publish is already pending
      if (!stateContext.isPublishPending) {
         stateContext.isPublishPending = true;

         // Perform publish after a short delay
         // We delay so that...
         // 1. The entities gathered from the current context fields (lookups, etc.) can be sent together in one message
         // 2. We reduce redundant messages that would be sent if we publish the new context immediately after any entity is added/removed
         setTimeout(function () {
            publishContext(stateName);
            stateContext.isPublishPending = false;
         }, self.publishDelay);
      }
   }

   /**
    * Send latest Ming.le messages for the given state (which inherits from parent states too)
    */
   function publishContext(stateName) {
      var sxeEntities = [];
      var customEntities = [];
      var businessEntities = [];
      var state = $state.get(stateName);
      var stateContext = getStateContextObject(stateName);
      var screenId = self.getScreenId(state, stateContext.screenIdSuffix);

      // Get final entity list to publish
      // 1. Include context of ancestor states
      //    - parent states (like base) may have entities that should still be considered "in-context"
      // 2. Filter out duplicate values
      //    - two fields on the screen may have same entity type and same key values, but don't want to publish that record twice
      var entities = getEntityListToPublish(stateName);

      // Sort list by entity type to prepare for equality check
      entities.sort(compareEntities);

      // Do not proceed with publish if context is same as the last context that was published
      if (isEqualToLastContext(entities, screenId)) {
         if (loggingEnabled) {
            console.log('CONTEXT (' + stateName + '):');
            console.log('   Same as previous');
         }
         return;
      }

      // Remember this context for next check
      lastContext.screenId = screenId;
      lastContext.entities = entities;

      // Process each entity in the context
      for (var i = 0; i < entities.length; i++) {
         var entity = entities[i];
         var contextEntity = entity.contextEntity;
         var entityData = entity.data;
         var options = entity.options || {};

         // Build entity message data
         if (contextEntity) {
            var defaultData = contextEntity.defaultMessageData ? angular.copy(contextEntity.defaultMessageData) : null;

            // Transform key data into message data, or use standard transformation
            if (contextEntity.transformKeyData) {
               entityData = contextEntity.transformKeyData(entityData);
            } else {
               entityData = {
                  primaryKey: entityData.key1,
                  secondaryKey: entityData.key2
               };
            }

            // Extend default data with entity data
            if (defaultData) {
               entityData = Utils.extend(defaultData, entityData);
            }
         }

         // Add to sxe entity list (if is an sxe entity)
         if (contextEntity && contextEntity.sxeEntity) {
            var baseData = {
               entity: contextEntity.entityName,
               timestamp: Date.now(),
               // The screenId in ViewSxeEntities is simply the base state (arsc, oeet, oeet2, etc.), which distinguishes the tab the message belongs to
               screenId: stateName.split('.')[0]
            };

            // Add entity data to base message data
            Utils.extend(baseData, entityData);

            sxeEntities.push(baseData);
         }

         // Add to custom entity list (if ContextEntity has a specific messageType defined, or is a custom entity)
         if (contextEntity && contextEntity.messageType) {
            customEntities.push({ messageType: contextEntity.messageType, data: entityData });
         } else if (!contextEntity && entity.messageType) {
            customEntities.push({ messageType: entity.messageType, data: entity.data });
         }

         // Add to business entity list (if is a business entity and we are not suppressing business context)
         if (contextEntity && contextEntity.businessEntity && !ConfigService.isSuppressBusinessContext()) {
            var baseBusinessData = {
               entityName: contextEntity.entityName
            };

            if (options.overrideDrillBack) {
               baseBusinessData.ViewId = options.overrideDrillBack;
            }

            // Add untransformed entity data (key1, key2, etc.) to base business data
            Utils.extend(baseBusinessData, entity.data);

            businessEntities.push(baseBusinessData);
         }
      }

      // Send sxe entity message (if any entity data to send)
      if (sxeEntities.length) {
         // Send respondingToTabActivated along with the data.
         // If the user is simply returning to an already opened tab, the notes web part should not auto-open the note popup for required notes. 
         infor.companyon.client.sendMessage('ViewSxeEntities', { data: sxeEntities, switchingTabs: self.respondingToTabActivated });
      }
      if (self.respondingToTabActivated) {
         self.respondingToTabActivated = false;
      }

      // Send custom entity messages
      if (customEntities.length) {
         for (var i = 0; i < customEntities.length; i++) {
            var customMessage = customEntities[i];
            infor.companyon.client.sendMessage(customMessage.messageType, customMessage.data);
         }
      }

      // Log to console
      if (loggingEnabled) {
         console.log('CONTEXT (' + stateName + '):');
         logEntities(sxeEntities, 'SX.e Entities');
         logEntities(businessEntities, 'Business Entities');
         logEntities(customEntities, 'Custom Entities');
         if (entities.length === 0) {
            console.log('   None');
         }
      }

      // Process business context entities
      if (businessEntities.length) {
         var cachedData = CacheService.get(false, majorBucket, 'C', businessEntities);

         // Get Business Context messages via api call by passing list of entities and key values
         if (cachedData === null) {
            DataService.post('api/businesscontext/getcontext?logicalId=' + logicalId, { data: businessEntities }, function (data) {
               CacheService.set(false, majorBucket, 'C', businessEntities, data, 60);
               sendBusinessMessage(screenId, data);
            });
         } else {
            sendBusinessMessage(screenId, cachedData);
         }
      } else if (!ConfigService.isSuppressBusinessContext()) {
         var emptyWrapper = {
            address: null,
            businesscontextmessage: { entities: [] }
         };

         // We still send the business context message even if there are no entities.
         // This acts as a "clear" message so business context apps clear their content when entities go out of context.
         // It is also important to always publish the screenId (for the ICUA app).
         sendBusinessMessage(screenId, emptyWrapper);
      }
   }

   /**
    * Send business context message
   */
   function sendBusinessMessage(screenId, messageWrapper) {
      var addrMsg = messageWrapper.address;
      var busMsg = messageWrapper.businesscontextmessage;

      // Send business context message
      if (busMsg) {
         busMsg.screenId = screenId;
         busMsg.logicalId = logicalId;

         busMsg.originatingTime = Date.now();
         busMsg.contextId = busMsg.originatingTime.toString() + Utils.pad(Utils.getRandom(1000, 999999), 6, '0');

         infor.companyon.client.sendMessage('inforBusinessContext', busMsg);

         // Log business message
         if (loggingEnabled) {
            console.log('   Business Context Message:', busMsg);
         }
      }

      // Send address message
      if (addrMsg) {
         infor.companyon.client.sendMessage('address', addrMsg);

         // Log address message
         if (loggingEnabled) {
            console.log('   Address Context Message:', addrMsg);
         }
      }
   }

   /**
    * Send bookmark message for the given state used by Ming.le
    */
   function publishBookmark(stateName) {
      var state = $state.get(stateName);
      var tabTitle = state.data ? state.data.tabTitle : '';
      var stateParts = stateName.split('.');
      var baseState = stateParts[0];
      var part2 = stateParts[1];
      var pageTitle;

      // Don't publish if not yet logged in
      if (baseState === 'login') {
         return;
      }

      // Build page title (report functions are handled slightly differently)
      if (ReportService.isReportFunction(baseState)) {
         pageTitle = $translate.instant(tabTitle) + ' - ' + baseState;
      } else {
         pageTitle = $translate.instant(tabTitle) + (part2 ? ' - ' + part2.charAt(0).toUpperCase() + part2.slice(1) : '');
      }

      var bookmark = {
         name: pageTitle,
         description: pageTitle,
         absoluteURL: 'false',
         shortcutContext: stateName
      };

      infor.companyon.client.sendMessage('setShortcutContext', bookmark);
   }

   /**
    * Get final entity list to publish
    * 1. Include context of all ancestor states
    * 2. Filter out duplicate values before publishing entity list
    *    Note: two fields on the screen may have same entity type and same key values, but don't want to publish that record twice
    */
   function getEntityListToPublish(stateName) {
      var entityId, entity, entities = {}, finalList = [];
      var state = $state.get(stateName);

      // Include the context of this state and all ancestor states
      // Note: need to check state.name here because ui router has a blank root state object
      while (state && state.name) {
         var stateContext = contextMap[state.name];

         // Add state's entities (if there are any)
         if (stateContext && stateContext.entities) {
            Utils.extend(entities, stateContext.entities);
         }

         // Get parent to try next
         state = $state.get('^', state.name);
      }

      // Filter out duplicate values
      for (entityId in entities) {
         if (entities.hasOwnProperty(entityId)) {
            entity = entities[entityId];

            if (!isDuplicateEntity(finalList, entity)) {
               finalList.push(entity);
            }
         }
      }

      return finalList;
   }

   /**
    * Check if the entities list already has entityToCheck (exact match of entity type and data/key values)
    */
   function isDuplicateEntity(entities, entityToCheck) {
      var entity;

      for (var i = 0; i < entities.length; i++) {
         entity = entities[i];

         // If entityKey matches and data matches, then we know it's a duplicate
         // Note: We are still doing loose type equality checking since user-entered values into numeric lookups aren't always converted to numbers in our code
         if (entity.entityKey === entityToCheck.entityKey && !Utils.deepCompare(entity.data, entityToCheck.data, true)) {
            return true;
         }
      }

      return false;
   }

   /**
    * Check if context is equivalent to the last context published
     */
   function isEqualToLastContext(entities, screenId) {
      var lastEntities = lastContext.entities;

      // If different screenId, contexts are not equal
      if (screenId !== lastContext.screenId) {
         return false;
      }

      // If different number of entities, contexts are not equal
      if (entities.length !== lastEntities.length) {
         return false;
      }

      // Compare entities in each list (sorted by entityKey), and if any differences then contexts are not equal
      for (var i = 0; i < entities.length; i++) {
         var entity1 = entities[i];
         var entity2 = lastEntities[i];

         // If different entity or differences in key data, then we've found that contexts are not equal
         if (entity1.entityKey !== entity2.entityKey || Utils.deepCompare(entity1.data, entity2.data, true)) {
            return false;
         }
      }

      return true;
   }

   /**
    * Compare entities for sorting list of entities
     */
   function compareEntities(obj1, obj2) {
      if (obj1.entityKey < obj2.entityKey) {
         return -1;
      }
      if (obj1.entityKey > obj2.entityKey) {
         return 1;
      }
      return 0;
   }

   /**
    * Log each entity's data
    */
   function logEntities(entityDataList, label) {
      if (entityDataList && entityDataList.length) {
         console.log('   ' + label + ':');
         entityDataList.forEach(function (entityData) {
            console.log('      ' + JSON.stringify(entityData));
         });
      }
   }

});
