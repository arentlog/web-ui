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

namespace Infor.Sxe.OE.Data.Models.Pdsoeordercopylinelist
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeordercopylinelist.Oeordercopylinelist")]
   public partial class Oeordercopylinelist : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string dispordno { get; set; }
      public int lineno { get; set; }
      public int newlineno { get; set; }
      public bool copyfl { get; set; }
      [StringValidationAttribute]
      public string botype { get; set; }
      [StringValidationAttribute]
      public string oebotype { get; set; }
      public bool restrictfl { get; set; }
      public bool remancorefl { get; set; }
      public bool impliedcorefl { get; set; }
      [StringValidationAttribute]
      public string bodtransferty { get; set; }
      [StringValidationAttribute]
      public string bodfabwhse { get; set; }
      [StringValidationAttribute]
      public string bodshipviaty { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      public int verno { get; set; }
      [StringValidationAttribute]
      public string cSpecNSType { get; set; }
      [StringValidationAttribute]
      public string cShipProd { get; set; }
      [StringValidationAttribute]
      public string cProdDesc { get; set; }
      public decimal dQtyOrd { get; set; }
      [StringValidationAttribute]
      public string cUnit { get; set; }
      public decimal dNetamt { get; set; }
      [StringValidationAttribute]
      public string cNetamt { get; set; }
      public decimal ofQtyord { get; set; }
      [StringValidationAttribute]
      public string ofSpecnstype { get; set; }
      public int ofSeqno { get; set; }
      public bool ofNspricefl { get; set; }
      public bool ofSubmitfl { get; set; }
      [StringValidationAttribute]
      public string ofOrdertype { get; set; }
      public decimal ofVendno { get; set; }
      [StringValidationAttribute]
      public string ofWhse { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeordercopylinelist BuildOeordercopylinelistFromRow(DataRow row)
      {
         Oeordercopylinelist entity = new Oeordercopylinelist();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.dispordno = row.IsNull("dispordno") ? string.Empty : row.Field<string>("dispordno");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.newlineno = row.IsNull("newlineno") ? 0 : row.Field<int>("newlineno");
         entity.copyfl = row.Field<bool>("copyfl");
         entity.botype = row.IsNull("botype") ? string.Empty : row.Field<string>("botype");
         entity.oebotype = row.IsNull("oebotype") ? string.Empty : row.Field<string>("oebotype");
         entity.restrictfl = row.Field<bool>("restrictfl");
         entity.remancorefl = row.Field<bool>("remancorefl");
         entity.impliedcorefl = row.Field<bool>("impliedcorefl");
         entity.bodtransferty = row.IsNull("bodtransferty") ? string.Empty : row.Field<string>("bodtransferty");
         entity.bodfabwhse = row.IsNull("bodfabwhse") ? string.Empty : row.Field<string>("bodfabwhse");
         entity.bodshipviaty = row.IsNull("bodshipviaty") ? string.Empty : row.Field<string>("bodshipviaty");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.verno = row.IsNull("verno") ? 0 : row.Field<int>("verno");
         entity.cSpecNSType = row.IsNull("cSpecNSType") ? string.Empty : row.Field<string>("cSpecNSType");
         entity.cShipProd = row.IsNull("cShipProd") ? string.Empty : row.Field<string>("cShipProd");
         entity.cProdDesc = row.IsNull("cProdDesc") ? string.Empty : row.Field<string>("cProdDesc");
         entity.dQtyOrd = row.IsNull("dQtyOrd") ? decimal.Zero : row.Field<decimal>("dQtyOrd");
         entity.cUnit = row.IsNull("cUnit") ? string.Empty : row.Field<string>("cUnit");
         entity.dNetamt = row.IsNull("dNetamt") ? decimal.Zero : row.Field<decimal>("dNetamt");
         entity.cNetamt = row.IsNull("cNetamt") ? string.Empty : row.Field<string>("cNetamt");
         entity.ofQtyord = row.IsNull("of-qtyord") ? decimal.Zero : row.Field<decimal>("of-qtyord");
         entity.ofSpecnstype = row.IsNull("of-specnstype") ? string.Empty : row.Field<string>("of-specnstype");
         entity.ofSeqno = row.IsNull("of-seqno") ? 0 : row.Field<int>("of-seqno");
         entity.ofNspricefl = row.Field<bool>("of-nspricefl");
         entity.ofSubmitfl = row.Field<bool>("of-submitfl");
         entity.ofOrdertype = row.IsNull("of-ordertype") ? string.Empty : row.Field<string>("of-ordertype");
         entity.ofVendno = row.IsNull("of-vendno") ? decimal.Zero : row.Field<decimal>("of-vendno");
         entity.ofWhse = row.IsNull("of-whse") ? string.Empty : row.Field<string>("of-whse");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeordercopylinelist(ref DataRow row, Oeordercopylinelist entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("dispordno", entity.dispordno);
         row.SetField("lineno", entity.lineno);
         row.SetField("newlineno", entity.newlineno);
         row.SetField("copyfl", entity.copyfl);
         row.SetField("botype", entity.botype);
         row.SetField("oebotype", entity.oebotype);
         row.SetField("restrictfl", entity.restrictfl);
         row.SetField("remancorefl", entity.remancorefl);
         row.SetField("impliedcorefl", entity.impliedcorefl);
         row.SetField("bodtransferty", entity.bodtransferty);
         row.SetField("bodfabwhse", entity.bodfabwhse);
         row.SetField("bodshipviaty", entity.bodshipviaty);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("verno", entity.verno);
         row.SetField("cSpecNSType", entity.cSpecNSType);
         row.SetField("cShipProd", entity.cShipProd);
         row.SetField("cProdDesc", entity.cProdDesc);
         row.SetField("dQtyOrd", entity.dQtyOrd);
         row.SetField("cUnit", entity.cUnit);
         row.SetField("dNetamt", entity.dNetamt);
         row.SetField("cNetamt", entity.cNetamt);
         row.SetField("of-qtyord", entity.ofQtyord);
         row.SetField("of-specnstype", entity.ofSpecnstype);
         row.SetField("of-seqno", entity.ofSeqno);
         row.SetField("of-nspricefl", entity.ofNspricefl);
         row.SetField("of-submitfl", entity.ofSubmitfl);
         row.SetField("of-ordertype", entity.ofOrdertype);
         row.SetField("of-vendno", entity.ofVendno);
         row.SetField("of-whse", entity.ofWhse);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
