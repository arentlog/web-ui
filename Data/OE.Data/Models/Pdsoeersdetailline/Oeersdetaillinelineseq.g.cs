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

namespace Infor.Sxe.OE.Data.Models.Pdsoeersdetailline
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeersdetailline.Oeersdetaillinelineseq")]
   public partial class Oeersdetaillinelineseq : ModelBase
   {
      public int lineno { get; set; }
      public decimal qtymult { get; set; }
      public decimal selqtyord { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      public decimal selqtyreq { get; set; }
      public decimal qtysel { get; set; }
      [StringValidationAttribute]
      public string serlottype { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeersdetaillinelineseq BuildOeersdetaillinelineseqFromRow(DataRow row)
      {
         Oeersdetaillinelineseq entity = new Oeersdetaillinelineseq();
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.qtymult = row.IsNull("qtymult") ? decimal.Zero : row.Field<decimal>("qtymult");
         entity.selqtyord = row.IsNull("selqtyord") ? decimal.Zero : row.Field<decimal>("selqtyord");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.selqtyreq = row.IsNull("selqtyreq") ? decimal.Zero : row.Field<decimal>("selqtyreq");
         entity.qtysel = row.IsNull("qtysel") ? decimal.Zero : row.Field<decimal>("qtysel");
         entity.serlottype = row.IsNull("serlottype") ? string.Empty : row.Field<string>("serlottype");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeersdetaillinelineseq(ref DataRow row, Oeersdetaillinelineseq entity)
      {
         row.SetField("lineno", entity.lineno);
         row.SetField("qtymult", entity.qtymult);
         row.SetField("selqtyord", entity.selqtyord);
         row.SetField("seqno", entity.seqno);
         row.SetField("prod", entity.prod);
         row.SetField("selqtyreq", entity.selqtyreq);
         row.SetField("qtysel", entity.qtysel);
         row.SetField("serlottype", entity.serlottype);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
