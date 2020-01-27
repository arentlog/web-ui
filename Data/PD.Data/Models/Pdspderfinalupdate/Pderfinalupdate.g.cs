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

namespace Infor.Sxe.PD.Data.Models.Pdspderfinalupdate
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspderfinalupdate.Pderfinalupdate")]
   public partial class Pderfinalupdate : ModelBase
   {
      public int claimno { get; set; }
      public decimal vendno { get; set; }
      public int jrnlno { get; set; }
      [StringValidationAttribute]
      public string currencyty { get; set; }
      public bool currencytyhidden { get; set; }
      public bool currencytyenabled { get; set; }
      public decimal reconexrate { get; set; }
      public bool reconexrateenabled { get; set; }
      public bool reconexrateupdatefl { get; set; }
      public int secure { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pderfinalupdate BuildPderfinalupdateFromRow(DataRow row)
      {
         Pderfinalupdate entity = new Pderfinalupdate();
         entity.claimno = row.IsNull("claimno") ? 0 : row.Field<int>("claimno");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.currencyty = row.IsNull("currencyty") ? string.Empty : row.Field<string>("currencyty");
         entity.currencytyhidden = row.Field<bool>("currencytyhidden");
         entity.currencytyenabled = row.Field<bool>("currencytyenabled");
         entity.reconexrate = row.IsNull("reconexrate") ? decimal.Zero : row.Field<decimal>("reconexrate");
         entity.reconexrateenabled = row.Field<bool>("reconexrateenabled");
         entity.reconexrateupdatefl = row.Field<bool>("reconexrateupdatefl");
         entity.secure = row.IsNull("secure") ? 0 : row.Field<int>("secure");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPderfinalupdate(ref DataRow row, Pderfinalupdate entity)
      {
         row.SetField("claimno", entity.claimno);
         row.SetField("vendno", entity.vendno);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("currencyty", entity.currencyty);
         row.SetField("currencytyhidden", entity.currencytyhidden);
         row.SetField("currencytyenabled", entity.currencytyenabled);
         row.SetField("reconexrate", entity.reconexrate);
         row.SetField("reconexrateenabled", entity.reconexrateenabled);
         row.SetField("reconexrateupdatefl", entity.reconexrateupdatefl);
         row.SetField("secure", entity.secure);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591