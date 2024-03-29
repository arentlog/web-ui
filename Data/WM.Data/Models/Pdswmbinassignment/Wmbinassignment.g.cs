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

namespace Infor.Sxe.WM.Data.Models.Pdswmbinassignment
{
   [ModelName("Infor.Sxe.WM.Data.Models.Pdswmbinassignment.Wmbinassignment")]
   public partial class Wmbinassignment : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string formtitletype { get; set; }
      [StringValidationAttribute]
      public string createtitletype { get; set; }
      [StringValidationAttribute]
      public string wmadjtype { get; set; }
      public bool returnfl { get; set; }
      public decimal proofqty { get; set; }
      public decimal proofqtyinit { get; set; }
      [StringValidationAttribute]
      public string kprodty { get; set; }
      [StringValidationAttribute]
      public string kpprod { get; set; }
      [StringValidationAttribute]
      public string stockunit { get; set; }
      [StringValidationAttribute]
      public string buysellunit { get; set; }
      public decimal wmqtyship { get; set; }
      public decimal wmqtyshipinit { get; set; }
      public decimal wmqtyrcv { get; set; }
      public decimal wmqtyrcvinit { get; set; }
      public decimal stkqtyship { get; set; }
      public decimal stkqtyrcv { get; set; }
      public decimal dPWStkQtyRcv { get; set; }
      public bool kitfl { get; set; }
      [StringValidationAttribute]
      public string ordertype { get; set; }
      [StringValidationAttribute]
      public string recordtype { get; set; }
      [StringValidationAttribute]
      public string recordRowid { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string potype { get; set; }
      public bool autoassignenabled { get; set; }
      public bool deallocateenabled { get; set; }
      public bool uIUpdatesWMQty { get; set; }
      public bool buysellqtyenabled { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wmbinassignment BuildWmbinassignmentFromRow(DataRow row)
      {
         Wmbinassignment entity = new Wmbinassignment();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.formtitletype = row.IsNull("formtitletype") ? string.Empty : row.Field<string>("formtitletype");
         entity.createtitletype = row.IsNull("createtitletype") ? string.Empty : row.Field<string>("createtitletype");
         entity.wmadjtype = row.IsNull("wmadjtype") ? string.Empty : row.Field<string>("wmadjtype");
         entity.returnfl = row.Field<bool>("returnfl");
         entity.proofqty = row.IsNull("proofqty") ? decimal.Zero : row.Field<decimal>("proofqty");
         entity.proofqtyinit = row.IsNull("proofqtyinit") ? decimal.Zero : row.Field<decimal>("proofqtyinit");
         entity.kprodty = row.IsNull("kprodty") ? string.Empty : row.Field<string>("kprodty");
         entity.kpprod = row.IsNull("kpprod") ? string.Empty : row.Field<string>("kpprod");
         entity.stockunit = row.IsNull("stockunit") ? string.Empty : row.Field<string>("stockunit");
         entity.buysellunit = row.IsNull("buysellunit") ? string.Empty : row.Field<string>("buysellunit");
         entity.wmqtyship = row.IsNull("wmqtyship") ? decimal.Zero : row.Field<decimal>("wmqtyship");
         entity.wmqtyshipinit = row.IsNull("wmqtyshipinit") ? decimal.Zero : row.Field<decimal>("wmqtyshipinit");
         entity.wmqtyrcv = row.IsNull("wmqtyrcv") ? decimal.Zero : row.Field<decimal>("wmqtyrcv");
         entity.wmqtyrcvinit = row.IsNull("wmqtyrcvinit") ? decimal.Zero : row.Field<decimal>("wmqtyrcvinit");
         entity.stkqtyship = row.IsNull("stkqtyship") ? decimal.Zero : row.Field<decimal>("stkqtyship");
         entity.stkqtyrcv = row.IsNull("stkqtyrcv") ? decimal.Zero : row.Field<decimal>("stkqtyrcv");
         entity.dPWStkQtyRcv = row.IsNull("dPWStkQtyRcv") ? decimal.Zero : row.Field<decimal>("dPWStkQtyRcv");
         entity.kitfl = row.Field<bool>("kitfl");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.recordtype = row.IsNull("recordtype") ? string.Empty : row.Field<string>("recordtype");
         entity.recordRowid = row.Field<byte[]>("record-rowid").ToStringEncoded();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.potype = row.IsNull("potype") ? string.Empty : row.Field<string>("potype");
         entity.autoassignenabled = row.Field<bool>("autoassignenabled");
         entity.deallocateenabled = row.Field<bool>("deallocateenabled");
         entity.uIUpdatesWMQty = row.Field<bool>("UIUpdatesWMQty");
         entity.buysellqtyenabled = row.Field<bool>("buysellqtyenabled");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWmbinassignment(ref DataRow row, Wmbinassignment entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("formtitletype", entity.formtitletype);
         row.SetField("createtitletype", entity.createtitletype);
         row.SetField("wmadjtype", entity.wmadjtype);
         row.SetField("returnfl", entity.returnfl);
         row.SetField("proofqty", entity.proofqty);
         row.SetField("proofqtyinit", entity.proofqtyinit);
         row.SetField("kprodty", entity.kprodty);
         row.SetField("kpprod", entity.kpprod);
         row.SetField("stockunit", entity.stockunit);
         row.SetField("buysellunit", entity.buysellunit);
         row.SetField("wmqtyship", entity.wmqtyship);
         row.SetField("wmqtyshipinit", entity.wmqtyshipinit);
         row.SetField("wmqtyrcv", entity.wmqtyrcv);
         row.SetField("wmqtyrcvinit", entity.wmqtyrcvinit);
         row.SetField("stkqtyship", entity.stkqtyship);
         row.SetField("stkqtyrcv", entity.stkqtyrcv);
         row.SetField("dPWStkQtyRcv", entity.dPWStkQtyRcv);
         row.SetField("kitfl", entity.kitfl);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("recordtype", entity.recordtype);
         row.SetField("record-rowid", entity.recordRowid.ToByteArray());
         row.SetField("whse", entity.whse);
         row.SetField("potype", entity.potype);
         row.SetField("autoassignenabled", entity.autoassignenabled);
         row.SetField("deallocateenabled", entity.deallocateenabled);
         row.SetField("UIUpdatesWMQty", entity.uIUpdatesWMQty);
         row.SetField("buysellqtyenabled", entity.buysellqtyenabled);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
