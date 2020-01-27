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

namespace Infor.Sxe.Shared.Data.Models.Pdscammethodtypes
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdscammethodtypes.Cammethodtypes")]
   public partial class Cammethodtypes : ModelBase
   {
      [StringValidationAttribute]
      public string methodkey { get; set; }
      [StringValidationAttribute]
      public string methodtype { get; set; }
      [StringValidationAttribute]
      public string methoddesc { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Cammethodtypes BuildCammethodtypesFromRow(DataRow row)
      {
         Cammethodtypes entity = new Cammethodtypes();
         entity.methodkey = row.IsNull("methodkey") ? string.Empty : row.Field<string>("methodkey");
         entity.methodtype = row.IsNull("methodtype") ? string.Empty : row.Field<string>("methodtype");
         entity.methoddesc = row.IsNull("methoddesc") ? string.Empty : row.Field<string>("methoddesc");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCammethodtypes(ref DataRow row, Cammethodtypes entity)
      {
         row.SetField("methodkey", entity.methodkey);
         row.SetField("methodtype", entity.methodtype);
         row.SetField("methoddesc", entity.methoddesc);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
