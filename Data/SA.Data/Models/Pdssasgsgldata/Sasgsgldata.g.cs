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

namespace Infor.Sxe.SA.Data.Models.Pdssasgsgldata
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssasgsgldata.Sasgsgldata")]
   public partial class Sasgsgldata : ModelBase
   {
      public int recty { get; set; }
      public int taxgroup { get; set; }
      [StringValidationAttribute]
      public string statecd { get; set; }
      [StringValidationAttribute]
      public string countycd { get; set; }
      [StringValidationAttribute]
      public string citycd { get; set; }
      [StringValidationAttribute]
      public string othercd { get; set; }
      [StringValidationAttribute]
      public string sasgmRowid { get; set; }
      public int glyear { get; set; }
      [StringValidationAttribute]
      public string salesglno { get; set; }
      [StringValidationAttribute]
      public string useglno { get; set; }
      [StringValidationAttribute]
      public string transitglno { get; set; }
      [StringValidationAttribute]
      public string exciseglno { get; set; }
      [StringValidationAttribute]
      public string cashsalesglno { get; set; }
      [StringValidationAttribute]
      public string cashuseglno { get; set; }
      [StringValidationAttribute]
      public string cashtransitglno { get; set; }
      [StringValidationAttribute]
      public string cashexciseglno { get; set; }
      [StringValidationAttribute]
      public string salesglnodesc { get; set; }
      [StringValidationAttribute]
      public string useglnodesc { get; set; }
      [StringValidationAttribute]
      public string transitglnodesc { get; set; }
      [StringValidationAttribute]
      public string exciseglnodesc { get; set; }
      [StringValidationAttribute]
      public string cashsalesglnodesc { get; set; }
      [StringValidationAttribute]
      public string cashuseglnodesc { get; set; }
      [StringValidationAttribute]
      public string cashtransitglnodesc { get; set; }
      [StringValidationAttribute]
      public string cashexciseglnodesc { get; set; }
      [StringValidationAttribute]
      public string cashbasislabel { get; set; }
      public bool cashhiddenfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sasgsgldata BuildSasgsgldataFromRow(DataRow row)
      {
         Sasgsgldata entity = new Sasgsgldata();
         entity.recty = row.IsNull("recty") ? 0 : row.Field<int>("recty");
         entity.taxgroup = row.IsNull("taxgroup") ? 0 : row.Field<int>("taxgroup");
         entity.statecd = row.IsNull("statecd") ? string.Empty : row.Field<string>("statecd");
         entity.countycd = row.IsNull("countycd") ? string.Empty : row.Field<string>("countycd");
         entity.citycd = row.IsNull("citycd") ? string.Empty : row.Field<string>("citycd");
         entity.othercd = row.IsNull("othercd") ? string.Empty : row.Field<string>("othercd");
         entity.sasgmRowid = row.Field<byte[]>("sasgm-rowid").ToStringEncoded();
         entity.glyear = row.IsNull("glyear") ? 0 : row.Field<int>("glyear");
         entity.salesglno = row.IsNull("salesglno") ? string.Empty : row.Field<string>("salesglno");
         entity.useglno = row.IsNull("useglno") ? string.Empty : row.Field<string>("useglno");
         entity.transitglno = row.IsNull("transitglno") ? string.Empty : row.Field<string>("transitglno");
         entity.exciseglno = row.IsNull("exciseglno") ? string.Empty : row.Field<string>("exciseglno");
         entity.cashsalesglno = row.IsNull("cashsalesglno") ? string.Empty : row.Field<string>("cashsalesglno");
         entity.cashuseglno = row.IsNull("cashuseglno") ? string.Empty : row.Field<string>("cashuseglno");
         entity.cashtransitglno = row.IsNull("cashtransitglno") ? string.Empty : row.Field<string>("cashtransitglno");
         entity.cashexciseglno = row.IsNull("cashexciseglno") ? string.Empty : row.Field<string>("cashexciseglno");
         entity.salesglnodesc = row.IsNull("salesglnodesc") ? string.Empty : row.Field<string>("salesglnodesc");
         entity.useglnodesc = row.IsNull("useglnodesc") ? string.Empty : row.Field<string>("useglnodesc");
         entity.transitglnodesc = row.IsNull("transitglnodesc") ? string.Empty : row.Field<string>("transitglnodesc");
         entity.exciseglnodesc = row.IsNull("exciseglnodesc") ? string.Empty : row.Field<string>("exciseglnodesc");
         entity.cashsalesglnodesc = row.IsNull("cashsalesglnodesc") ? string.Empty : row.Field<string>("cashsalesglnodesc");
         entity.cashuseglnodesc = row.IsNull("cashuseglnodesc") ? string.Empty : row.Field<string>("cashuseglnodesc");
         entity.cashtransitglnodesc = row.IsNull("cashtransitglnodesc") ? string.Empty : row.Field<string>("cashtransitglnodesc");
         entity.cashexciseglnodesc = row.IsNull("cashexciseglnodesc") ? string.Empty : row.Field<string>("cashexciseglnodesc");
         entity.cashbasislabel = row.IsNull("cashbasislabel") ? string.Empty : row.Field<string>("cashbasislabel");
         entity.cashhiddenfl = row.Field<bool>("cashhiddenfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSasgsgldata(ref DataRow row, Sasgsgldata entity)
      {
         row.SetField("recty", entity.recty);
         row.SetField("taxgroup", entity.taxgroup);
         row.SetField("statecd", entity.statecd);
         row.SetField("countycd", entity.countycd);
         row.SetField("citycd", entity.citycd);
         row.SetField("othercd", entity.othercd);
         row.SetField("sasgm-rowid", entity.sasgmRowid.ToByteArray());
         row.SetField("glyear", entity.glyear);
         row.SetField("salesglno", entity.salesglno);
         row.SetField("useglno", entity.useglno);
         row.SetField("transitglno", entity.transitglno);
         row.SetField("exciseglno", entity.exciseglno);
         row.SetField("cashsalesglno", entity.cashsalesglno);
         row.SetField("cashuseglno", entity.cashuseglno);
         row.SetField("cashtransitglno", entity.cashtransitglno);
         row.SetField("cashexciseglno", entity.cashexciseglno);
         row.SetField("salesglnodesc", entity.salesglnodesc);
         row.SetField("useglnodesc", entity.useglnodesc);
         row.SetField("transitglnodesc", entity.transitglnodesc);
         row.SetField("exciseglnodesc", entity.exciseglnodesc);
         row.SetField("cashsalesglnodesc", entity.cashsalesglnodesc);
         row.SetField("cashuseglnodesc", entity.cashuseglnodesc);
         row.SetField("cashtransitglnodesc", entity.cashtransitglnodesc);
         row.SetField("cashexciseglnodesc", entity.cashexciseglnodesc);
         row.SetField("cashbasislabel", entity.cashbasislabel);
         row.SetField("cashhiddenfl", entity.cashhiddenfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
