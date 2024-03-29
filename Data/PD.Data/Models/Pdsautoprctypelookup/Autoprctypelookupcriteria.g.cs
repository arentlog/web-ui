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

namespace Infor.Sxe.PD.Data.Models.Pdsautoprctypelookup
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdsautoprctypelookup.Autoprctypelookupcriteria")]
   public partial class Autoprctypelookupcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string autotype { get; set; }
      public int recordcountlimit { get; set; }


      public static Autoprctypelookupcriteria BuildAutoprctypelookupcriteriaFromRow(DataRow row)
      {
         Autoprctypelookupcriteria entity = new Autoprctypelookupcriteria();
         entity.autotype = row.IsNull("autotype") ? string.Empty : row.Field<string>("autotype");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAutoprctypelookupcriteria(ref DataRow row, Autoprctypelookupcriteria entity)
      {
         row.SetField("autotype", entity.autotype);
         row.SetField("recordcountlimit", entity.recordcountlimit);

      }
   
   }
}
#pragma warning restore 1591
