using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Infor.Sxe.Common.Data.Helpers;
using Infor.Sxe.Common.Data.Struct;
using ServiceInterfaceClient.Attributes;

namespace Infor.Sxe.Common.Data.BusinessContext
{
   public class BusinessContextFormatter
   {
      private List<PropInfo> compoundBodIdValues;
      private readonly object entity;
      private readonly int cono;

      public string Noun { get; set; }
      public string EntityType { get; set; }
      public string DrillbackUrl { get; set; }
      public PropInfo Name { get; set; }
      public PropInfo Description { get; set; }
      public PropInfo AccountingEntity { get; set; }
      public PropInfo BodAccountingEntity { get; set; }
      public PropInfo BodLocation { get; set; }
      public PropInfo Location { get; set; }
      public Dictionary<PropInfo, List<Attribute>> BusinessContextData { get; }
      public Dictionary<PropInfo, List<Attribute>> DrillBackParamData { get; }
      public Dictionary<PropInfo, List<Attribute>> BodContextData { get; }
      public List<PropInfo> KeyData { get; }
      public Dictionary<PropInfo, List<Attribute>> IdData { get; }
      public Dictionary<PropInfo, List<Attribute>> BodIdData { get; }
      public IEnumerable<Attribute> EntityTypeData { get; set; }


      public BusinessContextFormatter(object entity, int cono)
      {
         this.entity = entity;
         this.cono = cono;

         this.BusinessContextData = this.GetColumnAttributes(typeof(BusContextAttribute));
         this.DrillBackParamData = this.GetColumnAttributes(typeof(DrillbackParamAttribute));
         this.BodContextData = this.GetColumnAttributes(typeof(BodContextAttribute));
         this.KeyData = this.GetKeyData();
         this.IdData = this.GetColumnAttributes(typeof(IDAttribute));
         this.BodIdData = this.GetColumnAttributes(typeof(BodIDAttribute));
         this.EntityTypeData = this.GetTableAttributes(typeof(EntityTypeAttribute));
         this.ProcessEntityData();
         this.GetBusinessContext();
         this.GetBodContext();
         this.SetCompoundId();
      }

      private void SetCompoundId()
      {
         // Sort the properties by Bod ID Sequence Number
         this.compoundBodIdValues = this.BodIdData.Where(x => x.Value != null).Where(x => x.Value.Any()).OrderBy(
            x => x.Value[0] is BodIDAttribute bodIdAttribute ? bodIdAttribute.Id : 0).Select(x => x.Key).ToList();
      }

      private void GetBodContext()
      {
         foreach (var property in this.BodContextData.Keys.Where(property => property.Prop != null))
         {
            this.BodContextData.TryGetValue(property, out var attributes);

            if (attributes != null)
            {
               var bodAttributes = attributes.Where(x => x != null).Select(x => x as BodContextAttribute).ToList();

               foreach (var attribute in bodAttributes.Where(attribute => attribute != null))
               {
                  switch (attribute.BodPart)
                  {
                     case BodPart.AcctEntity:
                        this.BodAccountingEntity = property;
                        break;
                     case BodPart.Location:
                        this.BodLocation = property;
                        break;
                  }
               }
            }
         }
      }

      private void GetBusinessContext()
      {
         foreach (var property in this.BusinessContextData.Keys)
         {
            // Get the default values which use name, description and cono
            // Business context attributes override these default values
            switch (property.Prop.Name)
            {
               case "cono":
                  this.AccountingEntity = this.AccountingEntity.Prop == null ? new PropInfo(property.Prop, this.entity) : this.AccountingEntity;
                  break;
               case "name":
                  this.Name = this.Name.Prop == null ? new PropInfo(property.Prop, this.entity) : this.Name;
                  break;
               case "descr":
                  this.Description = this.Description.Prop == null ? new PropInfo(property.Prop, this.entity) : this.Description;
                  break;
               case "whse":
                  this.Location = this.Location.Prop == null ? new PropInfo(property.Prop, this.entity) : this.Location;
                  break;
            }

            // Get the business context attributes for the current property
            this.BusinessContextData.TryGetValue(property, out var attributes);

            var busAttributes = attributes.Where(x => x != null).Select(x => x as BusContextAttribute).ToList();

            foreach (var attribute in busAttributes.Where(attribute => attribute != null))
            {
               switch (attribute.BusPart)
               {
                  case BusPart.Name:
                     this.Name = property;
                     break;
                  case BusPart.Descr:
                     this.Description = property;
                     break;
                  case BusPart.AcctEntity:
                     this.AccountingEntity = property;
                     break;
                  case BusPart.Location:
                     this.Location = property;
                     break;
               }
            }
         }
      }

      public string GetBodIds
      {
         get
         {
            var bodId = string.Join("-", this.compoundBodIdValues.Select(id => ClassHelper.GetPropertyValue(id.Prop, this.entity)));
            return !string.IsNullOrEmpty(bodId) ? bodId : "";
         }
      }

      private void ProcessEntityData()
      {
         // Initialize values
         this.EntityType = this.entity.GetType().Name;
         this.DrillbackUrl = "/Search/SearchView";
         this.Noun = string.Empty;

         var entityTypeAttExtract = this.EntityTypeData.Cast<EntityTypeAttribute>().FirstOrDefault(entityTypeAtt => entityTypeAtt != null);
         if (entityTypeAttExtract != null)
         {
            this.EntityType = entityTypeAttExtract.EntityType;
            this.Noun = entityTypeAttExtract.BodNoun;

            // None means no drillback has been entered for this entity, so it will use the search screen as a drillback temporarily
            if (entityTypeAttExtract.DrillBack != "None" && !string.IsNullOrEmpty(entityTypeAttExtract.DrillBack))
            {
               this.DrillbackUrl = entityTypeAttExtract.DrillBack;
            }
         }
      }


      public IEnumerable<object> ReturnKeyAndIDs(bool ignoreKeys)
      {
         var returnList = new List<object>();
         var bConoExist = this.IdData.Keys.Any(x => x.Prop.Name == "cono");
         if (!ignoreKeys && !bConoExist)
         {
            bConoExist = this.KeyData.Any(x => x.Prop.Name == "cono");
         }
         if (!bConoExist)
         {
            returnList.Add(this.cono);
         }
         if (!ignoreKeys)
         {
            returnList.AddRange(this.KeyData.Select(key => key.Value));
         }
         returnList.AddRange(this.IdData.OrderBy(x => ((IDAttribute) x.Value[0]).Id).Select(id => id.Key.Value));
         return returnList;
      }

      private Dictionary<PropInfo, List<Attribute>> GetColumnAttributes(Type attribute)
      {
         return this.entity.GetType().GetProperties()
               .Where(propertyInfo => propertyInfo.GetCustomAttributes(attribute, true).Any())
               .Select(
                  propertyInfo => new { key = propertyInfo, value = propertyInfo.GetCustomAttributes(attribute, true) })
               .ToDictionary(
                  dict => new PropInfo(dict.key, this.entity),
                  dict => dict.value.Where(attr => attr != null).Select(attr => attr as Attribute).ToList());
      }

      private List<PropInfo> GetKeyData()
      {

         var returnList = (from property in this.entity.GetType().GetProperties()
            where Attribute.IsDefined(property, typeof(OrderAttribute))
            orderby ((OrderAttribute)property
               .GetCustomAttributes(typeof(OrderAttribute), false)
               .Single()).Order
            select property).Select(property => new PropInfo(property, this.entity)).ToList();
         if (!returnList.Any())
         {
            returnList = this.GetColumnAttributes(typeof(KeyAttribute)).Select(x => x.Key).ToList();
         }

         return returnList;
      }

      private IEnumerable<Attribute> GetTableAttributes(Type attributeType)
      {
         return
            this.entity.GetType()
               .GetCustomAttributes(attributeType, true)
               .Where(attr => attr != null)
               .Select(attr => attr as Attribute)
               .ToList();
      }
   }
}