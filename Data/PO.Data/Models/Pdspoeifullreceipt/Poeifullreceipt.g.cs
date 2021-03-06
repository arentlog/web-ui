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

namespace Infor.Sxe.PO.Data.Models.Pdspoeifullreceipt
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdspoeifullreceipt.Poeifullreceipt")]
   public partial class Poeifullreceipt : ModelBase
   {
      public int pono { get; set; }
      public int posuf { get; set; }
      public int jrnlno { get; set; }
      public int trackno { get; set; }
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


      public static Poeifullreceipt BuildPoeifullreceiptFromRow(DataRow row)
      {
         Poeifullreceipt entity = new Poeifullreceipt();
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.trackno = row.IsNull("trackno") ? 0 : row.Field<int>("trackno");
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
      public static void UpdateRowFromPoeifullreceipt(ref DataRow row, Poeifullreceipt entity)
      {
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("trackno", entity.trackno);
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
