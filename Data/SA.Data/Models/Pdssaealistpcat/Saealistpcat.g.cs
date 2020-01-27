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

namespace Infor.Sxe.SA.Data.Models.Pdssaealistpcat
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssaealistpcat.Saealistpcat")]
   public partial class Saealistpcat : ModelBase
   {
      [StringValidationAttribute]
      public string listtype { get; set; }
      [StringValidationAttribute]
      public string listvalue { get; set; }
      [StringValidationAttribute]
      public string namedesc { get; set; }
      [StringValidationAttribute]
      public string pcatuser { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Saealistpcat BuildSaealistpcatFromRow(DataRow row)
      {
         Saealistpcat entity = new Saealistpcat();
         entity.listtype = row.IsNull("listtype") ? string.Empty : row.Field<string>("listtype");
         entity.listvalue = row.IsNull("listvalue") ? string.Empty : row.Field<string>("listvalue");
         entity.namedesc = row.IsNull("namedesc") ? string.Empty : row.Field<string>("namedesc");
         entity.pcatuser = row.IsNull("pcatuser") ? string.Empty : row.Field<string>("pcatuser");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSaealistpcat(ref DataRow row, Saealistpcat entity)
      {
         row.SetField("listtype", entity.listtype);
         row.SetField("listvalue", entity.listvalue);
         row.SetField("namedesc", entity.namedesc);
         row.SetField("pcatuser", entity.pcatuser);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
