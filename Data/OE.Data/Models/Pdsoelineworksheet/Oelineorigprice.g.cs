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

namespace Infor.Sxe.OE.Data.Models.Pdsoelineworksheet
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoelineworksheet.Oelineorigprice")]
   public partial class Oelineorigprice : ModelBase
   {
      public decimal origprice { get; set; }
      public int seqno { get; set; }


      public static Oelineorigprice BuildOelineorigpriceFromRow(DataRow row)
      {
         Oelineorigprice entity = new Oelineorigprice();
         entity.origprice = row.IsNull("origprice") ? decimal.Zero : row.Field<decimal>("origprice");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOelineorigprice(ref DataRow row, Oelineorigprice entity)
      {
         row.SetField("origprice", entity.origprice);
         row.SetField("seqno", entity.seqno);

      }
   
   }
}
#pragma warning restore 1591
