using System;
using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.Shared
{
   public class Item
   {
      [StringValidation]
      public string createdBy { get; set; }
      [StringValidation]
      public string createdByName { get; set; }
      public DateTime createdTS { get; set; }
      [StringValidation]
      public string lastChangedBy { get; set; }
      [StringValidation]
      public string lastChangedByName { get; set; }
      public DateTime lastChangedTS { get; set; }
      [StringValidation]
      public string filename { get; set; }
      [StringValidation]
      public string size { get; set; }
      [StringValidation]
      public string pid { get; set; }
      [StringValidation]
      public string id { get; set; }
      [StringValidation]
      public string version { get; set; }
      [StringValidation]
      public string reprItem { get; set; }
      [StringValidation]
      public string entityName { get; set; }
      public Attrs attrs { get; set; }
      public Resrs resrs { get; set; }
      public Acl acl { get; set; }
   }
}