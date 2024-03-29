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

namespace Infor.Sxe.Shared.Data.Models.Pdsreptwizardfinish
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsreptwizardfinish.Reptwizardfinishranges")]
   public partial class Reptwizardfinishranges : ModelBase
   {
      public int rangenumber { get; set; }
      [StringValidationAttribute]
      public string rangename { get; set; }
      [StringValidationAttribute]
      public string rangebegvalue { get; set; }
      [StringValidationAttribute]
      public string rangeendvalue { get; set; }


      public static Reptwizardfinishranges BuildReptwizardfinishrangesFromRow(DataRow row)
      {
         Reptwizardfinishranges entity = new Reptwizardfinishranges();
         entity.rangenumber = row.IsNull("rangenumber") ? 0 : row.Field<int>("rangenumber");
         entity.rangename = row.IsNull("rangename") ? string.Empty : row.Field<string>("rangename");
         entity.rangebegvalue = row.IsNull("rangebegvalue") ? string.Empty : row.Field<string>("rangebegvalue");
         entity.rangeendvalue = row.IsNull("rangeendvalue") ? string.Empty : row.Field<string>("rangeendvalue");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromReptwizardfinishranges(ref DataRow row, Reptwizardfinishranges entity)
      {
         row.SetField("rangenumber", entity.rangenumber);
         row.SetField("rangename", entity.rangename);
         row.SetField("rangebegvalue", entity.rangebegvalue);
         row.SetField("rangeendvalue", entity.rangeendvalue);

      }
   
   }
}
#pragma warning restore 1591
