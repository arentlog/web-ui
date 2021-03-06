//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 13370 $
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
//
//     (c) Infor Global Solutions 2018
// 
//------------------------------------------------------------------------------

#pragma warning disable 1591
using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using HelpPageErrorSimulator.HelpArea.Areas.HelpPage.ModelDescriptions;
using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Interfaces;

namespace Infor.Sxe.Shared.Data.Models.Pdsgetaddrcontact
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsgetaddrcontact.Getaddrcontactcriteria")]
   public partial class Getaddrcontactcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string paramdata { get; set; }
      [StringValidationAttribute]
      public string tablename { get; set; }
      [StringValidationAttribute]
      public string type { get; set; }
      public bool updatefl { get; set; }


      public static Getaddrcontactcriteria BuildGetaddrcontactcriteriaFromRow(DataRow row)
      {
         Getaddrcontactcriteria entity = new Getaddrcontactcriteria();
         entity.paramdata = row.IsNull("paramdata") ? string.Empty : row.Field<string>("paramdata");
         entity.tablename = row.IsNull("tablename") ? string.Empty : row.Field<string>("tablename");
         entity.type = row.IsNull("type") ? string.Empty : row.Field<string>("type");
         entity.updatefl = row.Field<bool>("updatefl");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGetaddrcontactcriteria(ref DataRow row, Getaddrcontactcriteria entity)
      {
         row.SetField("paramdata", entity.paramdata);
         row.SetField("tablename", entity.tablename);
         row.SetField("type", entity.type);
         row.SetField("updatefl", entity.updatefl);

      }
   
   }
}
#pragma warning restore 1591
