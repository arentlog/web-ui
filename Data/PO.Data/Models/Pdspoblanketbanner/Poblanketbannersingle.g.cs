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

namespace Infor.Sxe.PO.Data.Models.Pdspoblanketbanner
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdspoblanketbanner.Poblanketbannersingle")]
   public partial class Poblanketbannersingle : ModelBase
   {
      public int pono { get; set; }
      public int posuf { get; set; }
      [StringValidationAttribute]
      public string ponotesfl { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string vendnotesfl { get; set; }
      public int shipfmno { get; set; }
      [StringValidationAttribute]
      public string shiptowhse { get; set; }
      [StringValidationAttribute]
      public string billtowhse { get; set; }
      [StringValidationAttribute]
      public string boflag { get; set; }
      [StringValidationAttribute]
      public string stage { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      [StringValidationAttribute]
      public string openinit { get; set; }
      [StringValidationAttribute]
      public string apsvrowid { get; set; }
      [StringValidationAttribute]
      public string apssrowid { get; set; }


      public static Poblanketbannersingle BuildPoblanketbannersingleFromRow(DataRow row)
      {
         Poblanketbannersingle entity = new Poblanketbannersingle();
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.ponotesfl = row.IsNull("ponotesfl") ? string.Empty : row.Field<string>("ponotesfl");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.vendnotesfl = row.IsNull("vendnotesfl") ? string.Empty : row.Field<string>("vendnotesfl");
         entity.shipfmno = row.IsNull("shipfmno") ? 0 : row.Field<int>("shipfmno");
         entity.shiptowhse = row.IsNull("shiptowhse") ? string.Empty : row.Field<string>("shiptowhse");
         entity.billtowhse = row.IsNull("billtowhse") ? string.Empty : row.Field<string>("billtowhse");
         entity.boflag = row.IsNull("boflag") ? string.Empty : row.Field<string>("boflag");
         entity.stage = row.IsNull("stage") ? string.Empty : row.Field<string>("stage");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.openinit = row.IsNull("openinit") ? string.Empty : row.Field<string>("openinit");
         entity.apsvrowid = row.Field<byte[]>("apsvrowid").ToStringEncoded();
         entity.apssrowid = row.Field<byte[]>("apssrowid").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPoblanketbannersingle(ref DataRow row, Poblanketbannersingle entity)
      {
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("ponotesfl", entity.ponotesfl);
         row.SetField("transtype", entity.transtype);
         row.SetField("vendno", entity.vendno);
         row.SetField("vendnotesfl", entity.vendnotesfl);
         row.SetField("shipfmno", entity.shipfmno);
         row.SetField("shiptowhse", entity.shiptowhse);
         row.SetField("billtowhse", entity.billtowhse);
         row.SetField("boflag", entity.boflag);
         row.SetField("stage", entity.stage);
         row.SetField("name", entity.name);
         row.SetField("openinit", entity.openinit);
         row.SetField("apsvrowid", entity.apsvrowid.ToByteArray());
         row.SetField("apssrowid", entity.apssrowid.ToByteArray());

      }
   
   }
}
#pragma warning restore 1591
