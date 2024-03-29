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

namespace Infor.Sxe.OE.Data.Models.Pdsoelinecommsubtot
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoelinecommsubtot.Oelinecommsubtotsingle")]
   public partial class Oelinecommsubtotsingle : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public int lineno { get; set; }
      [StringValidationAttribute]
      public string msg { get; set; }
      public bool chgmodefl { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string oldlinetype { get; set; }
      public int intseqno { get; set; }
      [StringValidationAttribute]
      public string cbposition { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      [StringValidationAttribute]
      public string descrip1 { get; set; }
      [StringValidationAttribute]
      public string linetype { get; set; }
      public bool updatemode { get; set; }
      [StringValidationAttribute]
      public string repositionrowid { get; set; }
      [StringValidationAttribute]
      public string btnaddsavelabel { get; set; }
      public bool linenoenabled { get; set; }
      public bool linetypeenabled { get; set; }
      public bool descripenabled { get; set; }
      public bool descrip1enabled { get; set; }
      public bool btnaddsaveenabled { get; set; }
      public bool btnclearenabled { get; set; }
      public bool btndeleteenabled { get; set; }
      public bool cbpositionenabled { get; set; }
      public bool intseqnoenabled { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oelinecommsubtotsingle BuildOelinecommsubtotsingleFromRow(DataRow row)
      {
         Oelinecommsubtotsingle entity = new Oelinecommsubtotsingle();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.msg = row.IsNull("msg") ? string.Empty : row.Field<string>("msg");
         entity.chgmodefl = row.Field<bool>("chgmodefl");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.oldlinetype = row.IsNull("oldlinetype") ? string.Empty : row.Field<string>("oldlinetype");
         entity.intseqno = row.IsNull("intseqno") ? 0 : row.Field<int>("intseqno");
         entity.cbposition = row.IsNull("cbposition") ? string.Empty : row.Field<string>("cbposition");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.descrip1 = row.IsNull("descrip1") ? string.Empty : row.Field<string>("descrip1");
         entity.linetype = row.IsNull("linetype") ? string.Empty : row.Field<string>("linetype");
         entity.updatemode = row.Field<bool>("updatemode");
         entity.repositionrowid = row.Field<byte[]>("repositionrowid").ToStringEncoded();
         entity.btnaddsavelabel = row.IsNull("btnaddsavelabel") ? string.Empty : row.Field<string>("btnaddsavelabel");
         entity.linenoenabled = row.Field<bool>("linenoenabled");
         entity.linetypeenabled = row.Field<bool>("linetypeenabled");
         entity.descripenabled = row.Field<bool>("descripenabled");
         entity.descrip1enabled = row.Field<bool>("descrip1enabled");
         entity.btnaddsaveenabled = row.Field<bool>("btnaddsaveenabled");
         entity.btnclearenabled = row.Field<bool>("btnclearenabled");
         entity.btndeleteenabled = row.Field<bool>("btndeleteenabled");
         entity.cbpositionenabled = row.Field<bool>("cbpositionenabled");
         entity.intseqnoenabled = row.Field<bool>("intseqnoenabled");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOelinecommsubtotsingle(ref DataRow row, Oelinecommsubtotsingle entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("msg", entity.msg);
         row.SetField("chgmodefl", entity.chgmodefl);
         row.SetField("seqno", entity.seqno);
         row.SetField("oldlinetype", entity.oldlinetype);
         row.SetField("intseqno", entity.intseqno);
         row.SetField("cbposition", entity.cbposition);
         row.SetField("descrip", entity.descrip);
         row.SetField("descrip1", entity.descrip1);
         row.SetField("linetype", entity.linetype);
         row.SetField("updatemode", entity.updatemode);
         row.SetField("repositionrowid", entity.repositionrowid.ToByteArray());
         row.SetField("btnaddsavelabel", entity.btnaddsavelabel);
         row.SetField("linenoenabled", entity.linenoenabled);
         row.SetField("linetypeenabled", entity.linetypeenabled);
         row.SetField("descripenabled", entity.descripenabled);
         row.SetField("descrip1enabled", entity.descrip1enabled);
         row.SetField("btnaddsaveenabled", entity.btnaddsaveenabled);
         row.SetField("btnclearenabled", entity.btnclearenabled);
         row.SetField("btndeleteenabled", entity.btndeleteenabled);
         row.SetField("cbpositionenabled", entity.cbpositionenabled);
         row.SetField("intseqnoenabled", entity.intseqnoenabled);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
