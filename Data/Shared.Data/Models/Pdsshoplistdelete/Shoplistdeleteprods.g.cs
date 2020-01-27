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

namespace Infor.Sxe.Shared.Data.Models.Pdsshoplistdelete
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsshoplistdelete.Shoplistdeleteprods")]
   public partial class Shoplistdeleteprods : ModelBase
   {
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string pvShoplistRowid { get; set; }


      public static Shoplistdeleteprods BuildShoplistdeleteprodsFromRow(DataRow row)
      {
         Shoplistdeleteprods entity = new Shoplistdeleteprods();
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.pvShoplistRowid = row.Field<byte[]>("pv_shoplist-rowid").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromShoplistdeleteprods(ref DataRow row, Shoplistdeleteprods entity)
      {
         row.SetField("seqno", entity.seqno);
         row.SetField("pv_shoplist-rowid", entity.pvShoplistRowid.ToByteArray());

      }
   
   }
}
#pragma warning restore 1591