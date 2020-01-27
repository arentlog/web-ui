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

namespace Infor.Sxe.WT.Data.Models.Pdswtesshiptransfer
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswtesshiptransfer.Wtesshiptransfer")]
   public partial class Wtesshiptransfer : ModelBase
   {
      public int wtno { get; set; }
      public int wtsuf { get; set; }
      public int jrnlno { get; set; }
      [StringValidationAttribute]
      public string rowid { get; set; }
      public bool autoreceivefl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }
      public int stagecd { get; set; }
      [StringValidationAttribute]
      public string stagecdx { get; set; }
      [StringValidationAttribute]
      public string statusinfo { get; set; }


      public static Wtesshiptransfer BuildWtesshiptransferFromRow(DataRow row)
      {
         Wtesshiptransfer entity = new Wtesshiptransfer();
         entity.wtno = row.IsNull("wtno") ? 0 : row.Field<int>("wtno");
         entity.wtsuf = row.IsNull("wtsuf") ? 0 : row.Field<int>("wtsuf");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.rowid = row.Field<byte[]>("rowid").ToStringEncoded();
         entity.autoreceivefl = row.Field<bool>("autoreceivefl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.stagecdx = row.IsNull("stagecdx") ? string.Empty : row.Field<string>("stagecdx");
         entity.statusinfo = row.IsNull("statusinfo") ? string.Empty : row.Field<string>("statusinfo");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWtesshiptransfer(ref DataRow row, Wtesshiptransfer entity)
      {
         row.SetField("wtno", entity.wtno);
         row.SetField("wtsuf", entity.wtsuf);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("rowid", entity.rowid.ToByteArray());
         row.SetField("autoreceivefl", entity.autoreceivefl);
         row.SetField("userfield", entity.userfield);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("stagecdx", entity.stagecdx);
         row.SetField("statusinfo", entity.statusinfo);

      }
   
   }
}
#pragma warning restore 1591
