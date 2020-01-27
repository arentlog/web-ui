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

namespace Infor.Sxe.PO.Data.Models.Pdspoeicancelwork
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdspoeicancelwork.Poeicancelwork")]
   public partial class Poeicancelwork : ModelBase
   {
      public int pono { get; set; }
      public int posuf { get; set; }
      public int jrnlno { get; set; }
      public bool correctionfl { get; set; }
      public int stagecd { get; set; }
      [StringValidationAttribute]
      public string stagecdx { get; set; }
      [StringValidationAttribute]
      public string statusinfo { get; set; }
      public int amounti { get; set; }
      [StringValidationAttribute]
      public string batchdatcd { get; set; }
      public bool receiverfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Poeicancelwork BuildPoeicancelworkFromRow(DataRow row)
      {
         Poeicancelwork entity = new Poeicancelwork();
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.correctionfl = row.Field<bool>("correctionfl");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.stagecdx = row.IsNull("stagecdx") ? string.Empty : row.Field<string>("stagecdx");
         entity.statusinfo = row.IsNull("statusinfo") ? string.Empty : row.Field<string>("statusinfo");
         entity.amounti = row.IsNull("amounti") ? 0 : row.Field<int>("amounti");
         entity.batchdatcd = row.IsNull("batchdatcd") ? string.Empty : row.Field<string>("batchdatcd");
         entity.receiverfl = row.Field<bool>("receiverfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPoeicancelwork(ref DataRow row, Poeicancelwork entity)
      {
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("correctionfl", entity.correctionfl);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("stagecdx", entity.stagecdx);
         row.SetField("statusinfo", entity.statusinfo);
         row.SetField("amounti", entity.amounti);
         row.SetField("batchdatcd", entity.batchdatcd);
         row.SetField("receiverfl", entity.receiverfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
