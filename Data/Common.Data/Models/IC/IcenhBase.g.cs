//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 12700 $
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
using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Interfaces;
       
namespace Infor.Sxe.Common.Data.Models.IC
{
   /// <summary>
   /// Headers For Non-stocks & Drops
   /// </summary>
   
   public partial class IcenhBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Product
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string prod { get; set; }

      /// <summary>
      /// Whse
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Category
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string prodcat { get; set; }

      /// <summary>
      /// Type Code
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string typecd { get; set; }

      /// <summary>
      /// Hdr Seq#
      /// </summary>
      [Key,Order]
      public int seqnoh { get; set; }

      /// <summary>
      /// Last Change By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// Last Change Date
      /// </summary>
      public DateTime? transdt { get; set; }

      /// <summary>
      /// Last Change Time
      /// </summary>
      [StringValidationAttribute]
      public string transtm { get; set; }

      /// <summary>
      /// Jrnl #
      /// </summary>
      public int jrnlno { get; set; }

      /// <summary>
      /// Set #
      /// </summary>
      public int setno { get; set; }

      /// <summary>
      /// Received #
      /// </summary>
      public int receiptno { get; set; }

      /// <summary>
      /// Received Suffix
      /// </summary>
      public int receiptsuf { get; set; }

      /// <summary>
      /// Received Type
      /// </summary>
      [StringValidationAttribute]
      public string receiptty { get; set; }

      /// <summary>
      /// Date Opened
      /// </summary>
      public DateTime? opendt { get; set; }

      /// <summary>
      /// Date Closed
      /// </summary>
      public DateTime? closedt { get; set; }

      /// <summary>
      /// Close Type
      /// </summary>
      [StringValidationAttribute]
      public string closety { get; set; }

      /// <summary>
      /// Active
      /// </summary>
      public bool activefl { get; set; }

      /// <summary>
      /// Units
      /// </summary>
      [StringValidationAttribute]
      public string unit { get; set; }

      /// <summary>
      /// Description
      /// </summary>
      [StringValidationAttribute]
      public string descrip1 { get; set; }
      [StringValidationAttribute]
      public string descrip2 { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// User 1
      /// </summary>
      [StringValidationAttribute]
      public string user1 { get; set; }

      /// <summary>
      /// User 2
      /// </summary>
      [StringValidationAttribute]
      public string user2 { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user3 { get; set; }

      /// <summary>
      /// User 4
      /// </summary>
      [StringValidationAttribute]
      public string user4 { get; set; }

      /// <summary>
      /// User 5
      /// </summary>
      [StringValidationAttribute]
      public string user5 { get; set; }

      /// <summary>
      /// User 6
      /// </summary>
      public decimal? user6 { get; set; }

      /// <summary>
      /// User 7
      /// </summary>
      public decimal? user7 { get; set; }

      /// <summary>
      /// User 8
      /// </summary>
      public DateTime? user8 { get; set; }

      /// <summary>
      /// User 9
      /// </summary>
      public DateTime? user9 { get; set; }

      /// <summary>
      /// Bin Loc
      /// </summary>
      [StringValidationAttribute]
      public string binloc1 { get; set; }
      [StringValidationAttribute]
      public string binloc2 { get; set; }

      /// <summary>
      /// ICSW Product
      /// </summary>
      [StringValidationAttribute]
      public string icswprod { get; set; }

      /// <summary>
      /// ICSP Category
      /// </summary>
      [StringValidationAttribute]
      public string icspprodcat { get; set; }

      /// <summary>
      /// NCNR
      /// </summary>
      [StringValidationAttribute]
      public string ncnr { get; set; }

      /// <summary>
      /// ECCN
      /// </summary>
      [StringValidationAttribute]
      public string eccnclasscd { get; set; }

      /// <summary>
      /// ICSP Alternate Product Group
      /// </summary>
      [StringValidationAttribute]
      public string icspaltprodgrp { get; set; }

      /// <summary>
      /// Alternate Product Group
      /// </summary>
      [StringValidationAttribute]
      public string altprodgrp { get; set; }

      /// <summary>
      /// Row Pointer
      /// </summary>
      [StringValidationAttribute]
      public string rowpointer { get; set; }

      /// <summary>
      /// transdttmz
      /// </summary>
      public DateTime? transdttmz { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildIcenhBaseFromRow<T>(DataRow row) where T:IcenhBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.setno = row.IsNull("setno") ? 0 : row.Field<int>("setno");
         entity.typecd = row.IsNull("typecd") ? string.Empty : row.Field<string>("typecd");
         entity.seqnoh = row.IsNull("seqnoh") ? 0 : row.Field<int>("seqnoh");
         entity.receiptno = row.IsNull("receiptno") ? 0 : row.Field<int>("receiptno");
         entity.receiptsuf = row.IsNull("receiptsuf") ? 0 : row.Field<int>("receiptsuf");
         entity.receiptty = row.IsNull("receiptty") ? string.Empty : row.Field<string>("receiptty");
         entity.opendt = row.Field<DateTime?>("opendt");
         entity.closedt = row.Field<DateTime?>("closedt");
         entity.closety = row.IsNull("closety") ? string.Empty : row.Field<string>("closety");
         entity.activefl = row.Field<bool>("activefl");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.descrip1 = row.IsNull("descrip1") ? string.Empty : row.Field<string>("descrip1");
         entity.descrip2 = row.IsNull("descrip2") ? string.Empty : row.Field<string>("descrip2");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.binloc1 = row.IsNull("binloc1") ? string.Empty : row.Field<string>("binloc1");
         entity.binloc2 = row.IsNull("binloc2") ? string.Empty : row.Field<string>("binloc2");
         entity.icswprod = row.IsNull("icswprod") ? string.Empty : row.Field<string>("icswprod");
         entity.icspprodcat = row.IsNull("icspprodcat") ? string.Empty : row.Field<string>("icspprodcat");
         entity.ncnr = row.IsNull("ncnr") ? string.Empty : row.Field<string>("ncnr");
         entity.eccnclasscd = row.IsNull("eccnclasscd") ? string.Empty : row.Field<string>("eccnclasscd");
         entity.icspaltprodgrp = row.IsNull("icspaltprodgrp") ? string.Empty : row.Field<string>("icspaltprodgrp");
         entity.altprodgrp = row.IsNull("altprodgrp") ? string.Empty : row.Field<string>("altprodgrp");
         entity.rowpointer = row.IsNull("rowpointer") ? string.Empty : row.Field<string>("rowpointer");
         entity.transdttmz = row.Field<DateTime?>("transdttmz");
         entity.rowID = row.Field<byte[]>("icenhRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcenhBase(ref DataRow row, IcenhBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("prod", entity.prod);
         row.SetField("whse", entity.whse);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("setno", entity.setno);
         row.SetField("typecd", entity.typecd);
         row.SetField("seqnoh", entity.seqnoh);
         row.SetField("receiptno", entity.receiptno);
         row.SetField("receiptsuf", entity.receiptsuf);
         row.SetField("receiptty", entity.receiptty);
         row.SetField("opendt", entity.opendt);
         row.SetField("closedt", entity.closedt);
         row.SetField("closety", entity.closety);
         row.SetField("activefl", entity.activefl);
         row.SetField("unit", entity.unit);
         row.SetField("descrip1", entity.descrip1);
         row.SetField("descrip2", entity.descrip2);
         row.SetField("transproc", entity.transproc);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("binloc1", entity.binloc1);
         row.SetField("binloc2", entity.binloc2);
         row.SetField("icswprod", entity.icswprod);
         row.SetField("icspprodcat", entity.icspprodcat);
         row.SetField("ncnr", entity.ncnr);
         row.SetField("eccnclasscd", entity.eccnclasscd);
         row.SetField("icspaltprodgrp", entity.icspaltprodgrp);
         row.SetField("altprodgrp", entity.altprodgrp);
         row.SetField("rowpointer", entity.rowpointer);
         row.SetField("transdttmz", entity.transdttmz);
         row.SetField("icenhRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, IcenhBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("prod", entity.prod);
         row.SetField("whse", entity.whse);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("typecd", entity.typecd);
         row.SetField("seqnoh", entity.seqnoh);
         row.SetField("icenhRowID", entity.rowID.ToByteArray());
         row.SetField("rowpointer", entity.rowpointer);

      }   
   }
}
#pragma warning restore 1591
	