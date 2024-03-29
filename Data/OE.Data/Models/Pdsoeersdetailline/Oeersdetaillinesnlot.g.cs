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
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeersdetailline.Oeersdetaillinesnlot")]
   public partial class Oeersdetaillinesnlot : ModelBase
   {
      public int lineno { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string serlottype { get; set; }
      [StringValidationAttribute]
      public string snlotno { get; set; }
      public decimal qtysel { get; set; }
      public decimal qtybo { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeersdetaillinesnlot BuildOeersdetaillinesnlotFromRow(DataRow row)
      {
         Oeersdetaillinesnlot entity = new Oeersdetaillinesnlot();
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.serlottype = row.IsNull("serlottype") ? string.Empty : row.Field<string>("serlottype");
         entity.snlotno = row.IsNull("snlotno") ? string.Empty : row.Field<string>("snlotno");
         entity.qtysel = row.IsNull("qtysel") ? decimal.Zero : row.Field<decimal>("qtysel");
         entity.qtybo = row.IsNull("qtybo") ? decimal.Zero : row.Field<decimal>("qtybo");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeersdetaillinesnlot(ref DataRow row, Oeersdetaillinesnlot entity)
      {
         row.SetField("lineno", entity.lineno);
         row.SetField("seqno", entity.seqno);
         row.SetField("serlottype", entity.serlottype);
         row.SetField("snlotno", entity.snlotno);
         row.SetField("qtysel", entity.qtysel);
         row.SetField("qtybo", entity.qtybo);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
