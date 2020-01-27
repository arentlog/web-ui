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

namespace Infor.Sxe.Shared.Data.Models.Pdsshoplistpopulate
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsshoplistpopulate.Shoplistpopulatecriteria")]
   public partial class Shoplistpopulatecriteria : ModelBase
   {
      [StringValidationAttribute]
      public string proc { get; set; }
      public bool clearfl { get; set; }
      [StringValidationAttribute]
      public string hdrrowid { get; set; }
      [StringValidationAttribute]
      public string style { get; set; }
      [StringValidationAttribute]
      public string selectioncriteria { get; set; }


      public static Shoplistpopulatecriteria BuildShoplistpopulatecriteriaFromRow(DataRow row)
      {
         Shoplistpopulatecriteria entity = new Shoplistpopulatecriteria();
         entity.proc = row.IsNull("proc") ? string.Empty : row.Field<string>("proc");
         entity.clearfl = row.Field<bool>("clearfl");
         entity.hdrrowid = row.Field<byte[]>("hdrrowid").ToStringEncoded();
         entity.style = row.IsNull("style") ? string.Empty : row.Field<string>("style");
         entity.selectioncriteria = row.IsNull("selectioncriteria") ? string.Empty : row.Field<string>("selectioncriteria");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromShoplistpopulatecriteria(ref DataRow row, Shoplistpopulatecriteria entity)
      {
         row.SetField("proc", entity.proc);
         row.SetField("clearfl", entity.clearfl);
         row.SetField("hdrrowid", entity.hdrrowid.ToByteArray());
         row.SetField("style", entity.style);
         row.SetField("selectioncriteria", entity.selectioncriteria);

      }
   
   }
}
#pragma warning restore 1591