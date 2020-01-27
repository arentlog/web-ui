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

namespace Infor.Sxe.OE.Data.Models.Pdsoefloorplan
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoefloorplan.Oefloorplan")]
   public partial class Oefloorplan : ModelBase
   {
      public decimal fpcustno { get; set; }
      public bool floorplanfl { get; set; }
      public int invno { get; set; }
      public int invsuf { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oefloorplan BuildOefloorplanFromRow(DataRow row)
      {
         Oefloorplan entity = new Oefloorplan();
         entity.fpcustno = row.IsNull("fpcustno") ? decimal.Zero : row.Field<decimal>("fpcustno");
         entity.floorplanfl = row.Field<bool>("floorplanfl");
         entity.invno = row.IsNull("invno") ? 0 : row.Field<int>("invno");
         entity.invsuf = row.IsNull("invsuf") ? 0 : row.Field<int>("invsuf");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOefloorplan(ref DataRow row, Oefloorplan entity)
      {
         row.SetField("fpcustno", entity.fpcustno);
         row.SetField("floorplanfl", entity.floorplanfl);
         row.SetField("invno", entity.invno);
         row.SetField("invsuf", entity.invsuf);
         row.SetField("transtype", entity.transtype);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
