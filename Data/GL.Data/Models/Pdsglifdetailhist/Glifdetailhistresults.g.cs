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

namespace Infor.Sxe.GL.Data.Models.Pdsglifdetailhist
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglifdetailhist.Glifdetailhistresults")]
   public partial class Glifdetailhistresults : ModelBase
   {
      public int yr { get; set; }
      public decimal ptd { get; set; }
      public decimal bptd { get; set; }
      public decimal ptdpctchg { get; set; }
      public decimal ptdpctbdgt { get; set; }
      public decimal ytd { get; set; }
      public decimal bytd { get; set; }
      public decimal ytdpctchg { get; set; }
      public decimal ytdpctbdgt { get; set; }


      public static Glifdetailhistresults BuildGlifdetailhistresultsFromRow(DataRow row)
      {
         Glifdetailhistresults entity = new Glifdetailhistresults();
         entity.yr = row.IsNull("yr") ? 0 : row.Field<int>("yr");
         entity.ptd = row.IsNull("ptd") ? decimal.Zero : row.Field<decimal>("ptd");
         entity.bptd = row.IsNull("bptd") ? decimal.Zero : row.Field<decimal>("bptd");
         entity.ptdpctchg = row.IsNull("ptdpctchg") ? decimal.Zero : row.Field<decimal>("ptdpctchg");
         entity.ptdpctbdgt = row.IsNull("ptdpctbdgt") ? decimal.Zero : row.Field<decimal>("ptdpctbdgt");
         entity.ytd = row.IsNull("ytd") ? decimal.Zero : row.Field<decimal>("ytd");
         entity.bytd = row.IsNull("bytd") ? decimal.Zero : row.Field<decimal>("bytd");
         entity.ytdpctchg = row.IsNull("ytdpctchg") ? decimal.Zero : row.Field<decimal>("ytdpctchg");
         entity.ytdpctbdgt = row.IsNull("ytdpctbdgt") ? decimal.Zero : row.Field<decimal>("ytdpctbdgt");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlifdetailhistresults(ref DataRow row, Glifdetailhistresults entity)
      {
         row.SetField("yr", entity.yr);
         row.SetField("ptd", entity.ptd);
         row.SetField("bptd", entity.bptd);
         row.SetField("ptdpctchg", entity.ptdpctchg);
         row.SetField("ptdpctbdgt", entity.ptdpctbdgt);
         row.SetField("ytd", entity.ytd);
         row.SetField("bytd", entity.bytd);
         row.SetField("ytdpctchg", entity.ytdpctchg);
         row.SetField("ytdpctbdgt", entity.ytdpctbdgt);

      }
   
   }
}
#pragma warning restore 1591
