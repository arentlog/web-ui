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

namespace Infor.Sxe.WT.Data.Models.Pdswteicancelreceipt
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswteicancelreceipt.Wteicancelreceipt")]
   public partial class Wteicancelreceipt : ModelBase
   {
      public int wtno { get; set; }
      public int wtsuf { get; set; }
      public int stagecd { get; set; }
      [StringValidationAttribute]
      public string stagecdx { get; set; }
      [StringValidationAttribute]
      public string laststgcdx { get; set; }
      [StringValidationAttribute]
      public string botxt { get; set; }
      [StringValidationAttribute]
      public string wteicanceluserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wteicancelreceipt BuildWteicancelreceiptFromRow(DataRow row)
      {
         Wteicancelreceipt entity = new Wteicancelreceipt();
         entity.wtno = row.IsNull("wtno") ? 0 : row.Field<int>("wtno");
         entity.wtsuf = row.IsNull("wtsuf") ? 0 : row.Field<int>("wtsuf");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.stagecdx = row.IsNull("stagecdx") ? string.Empty : row.Field<string>("stagecdx");
         entity.laststgcdx = row.IsNull("laststgcdx") ? string.Empty : row.Field<string>("laststgcdx");
         entity.botxt = row.IsNull("botxt") ? string.Empty : row.Field<string>("botxt");
         entity.wteicanceluserfield = row.IsNull("wteicanceluserfield") ? string.Empty : row.Field<string>("wteicanceluserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWteicancelreceipt(ref DataRow row, Wteicancelreceipt entity)
      {
         row.SetField("wtno", entity.wtno);
         row.SetField("wtsuf", entity.wtsuf);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("stagecdx", entity.stagecdx);
         row.SetField("laststgcdx", entity.laststgcdx);
         row.SetField("botxt", entity.botxt);
         row.SetField("wteicanceluserfield", entity.wteicanceluserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591