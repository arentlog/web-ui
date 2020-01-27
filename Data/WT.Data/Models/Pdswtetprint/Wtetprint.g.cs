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

namespace Infor.Sxe.WT.Data.Models.Pdswtetprint
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswtetprint.Wtetprint")]
   public partial class Wtetprint : ModelBase
   {
      public int wtno { get; set; }
      public int wtsuf { get; set; }
      public bool pickprintfl { get; set; }
      [StringValidationAttribute]
      public string printernm { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wtetprint BuildWtetprintFromRow(DataRow row)
      {
         Wtetprint entity = new Wtetprint();
         entity.wtno = row.IsNull("wtno") ? 0 : row.Field<int>("wtno");
         entity.wtsuf = row.IsNull("wtsuf") ? 0 : row.Field<int>("wtsuf");
         entity.pickprintfl = row.Field<bool>("pickprintfl");
         entity.printernm = row.IsNull("printernm") ? string.Empty : row.Field<string>("printernm");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWtetprint(ref DataRow row, Wtetprint entity)
      {
         row.SetField("wtno", entity.wtno);
         row.SetField("wtsuf", entity.wtsuf);
         row.SetField("pickprintfl", entity.pickprintfl);
         row.SetField("printernm", entity.printernm);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591