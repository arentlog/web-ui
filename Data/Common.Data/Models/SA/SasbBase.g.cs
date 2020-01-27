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
       
namespace Infor.Sxe.Common.Data.Models.SA
{
   /// <summary>
   /// System Administrator Setup Balance Changes
   /// </summary>
   
   public partial class SasbBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Function
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string currproc { get; set; }

      /// <summary>
      /// Date
      /// </summary>
      [Key,Order]
      public DateTime? enterdt { get; set; }

      /// <summary>
      /// Time
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string entertm { get; set; }

      /// <summary>
      /// Primary Key
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string primarykey { get; set; }

      /// <summary>
      /// Secondary Key
      /// </summary>
      [StringValidationAttribute]
      public string secondkey { get; set; }

      /// <summary>
      /// Operator
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// Operator
      /// </summary>
      [StringValidationAttribute]
      public string operinit2 { get; set; }

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
      /// Field (1 - 14)
      /// </summary>
      public decimal chgbal1 { get; set; }
      public decimal chgbal2 { get; set; }
      public decimal chgbal3 { get; set; }
      public decimal chgbal4 { get; set; }
      public decimal chgbal5 { get; set; }
      public decimal chgbal6 { get; set; }
      public decimal chgbal7 { get; set; }
      public decimal chgbal8 { get; set; }
      public decimal chgbal9 { get; set; }
      public decimal chgbal10 { get; set; }
      public decimal chgbal11 { get; set; }
      public decimal chgbal12 { get; set; }
      public decimal chgbal13 { get; set; }
      public decimal chgbal14 { get; set; }
      public decimal chgbal15 { get; set; }
      public decimal chgbal16 { get; set; }
      public decimal chgbal17 { get; set; }
      public decimal chgbal18 { get; set; }
      public decimal chgbal19 { get; set; }
      public decimal chgbal20 { get; set; }

      /// <summary>
      /// Error #
      /// </summary>
      public int errorno { get; set; }

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
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildSasbBaseFromRow<T>(DataRow row) where T:SasbBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.currproc = row.IsNull("currproc") ? string.Empty : row.Field<string>("currproc");
         entity.enterdt = row.Field<DateTime?>("enterdt");
         entity.entertm = row.IsNull("entertm") ? string.Empty : row.Field<string>("entertm");
         entity.primarykey = row.IsNull("primarykey") ? string.Empty : row.Field<string>("primarykey");
         entity.secondkey = row.IsNull("secondkey") ? string.Empty : row.Field<string>("secondkey");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.operinit2 = row.IsNull("operinit2") ? string.Empty : row.Field<string>("operinit2");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.chgbal1 = row.IsNull("chgbal1") ? decimal.Zero : row.Field<decimal>("chgbal1");
         entity.chgbal2 = row.IsNull("chgbal2") ? decimal.Zero : row.Field<decimal>("chgbal2");
         entity.chgbal3 = row.IsNull("chgbal3") ? decimal.Zero : row.Field<decimal>("chgbal3");
         entity.chgbal4 = row.IsNull("chgbal4") ? decimal.Zero : row.Field<decimal>("chgbal4");
         entity.chgbal5 = row.IsNull("chgbal5") ? decimal.Zero : row.Field<decimal>("chgbal5");
         entity.chgbal6 = row.IsNull("chgbal6") ? decimal.Zero : row.Field<decimal>("chgbal6");
         entity.chgbal7 = row.IsNull("chgbal7") ? decimal.Zero : row.Field<decimal>("chgbal7");
         entity.chgbal8 = row.IsNull("chgbal8") ? decimal.Zero : row.Field<decimal>("chgbal8");
         entity.chgbal9 = row.IsNull("chgbal9") ? decimal.Zero : row.Field<decimal>("chgbal9");
         entity.chgbal10 = row.IsNull("chgbal10") ? decimal.Zero : row.Field<decimal>("chgbal10");
         entity.chgbal11 = row.IsNull("chgbal11") ? decimal.Zero : row.Field<decimal>("chgbal11");
         entity.chgbal12 = row.IsNull("chgbal12") ? decimal.Zero : row.Field<decimal>("chgbal12");
         entity.chgbal13 = row.IsNull("chgbal13") ? decimal.Zero : row.Field<decimal>("chgbal13");
         entity.chgbal14 = row.IsNull("chgbal14") ? decimal.Zero : row.Field<decimal>("chgbal14");
         entity.chgbal15 = row.IsNull("chgbal15") ? decimal.Zero : row.Field<decimal>("chgbal15");
         entity.chgbal16 = row.IsNull("chgbal16") ? decimal.Zero : row.Field<decimal>("chgbal16");
         entity.chgbal17 = row.IsNull("chgbal17") ? decimal.Zero : row.Field<decimal>("chgbal17");
         entity.chgbal18 = row.IsNull("chgbal18") ? decimal.Zero : row.Field<decimal>("chgbal18");
         entity.chgbal19 = row.IsNull("chgbal19") ? decimal.Zero : row.Field<decimal>("chgbal19");
         entity.chgbal20 = row.IsNull("chgbal20") ? decimal.Zero : row.Field<decimal>("chgbal20");
         entity.errorno = row.IsNull("errorno") ? 0 : row.Field<int>("errorno");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.rowID = row.Field<byte[]>("sasbRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSasbBase(ref DataRow row, SasbBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("currproc", entity.currproc);
         row.SetField("enterdt", entity.enterdt);
         row.SetField("entertm", entity.entertm);
         row.SetField("primarykey", entity.primarykey);
         row.SetField("secondkey", entity.secondkey);
         row.SetField("operinit", entity.operinit);
         row.SetField("operinit2", entity.operinit2);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("chgbal1", entity.chgbal1);
         row.SetField("chgbal2", entity.chgbal2);
         row.SetField("chgbal3", entity.chgbal3);
         row.SetField("chgbal4", entity.chgbal4);
         row.SetField("chgbal5", entity.chgbal5);
         row.SetField("chgbal6", entity.chgbal6);
         row.SetField("chgbal7", entity.chgbal7);
         row.SetField("chgbal8", entity.chgbal8);
         row.SetField("chgbal9", entity.chgbal9);
         row.SetField("chgbal10", entity.chgbal10);
         row.SetField("chgbal11", entity.chgbal11);
         row.SetField("chgbal12", entity.chgbal12);
         row.SetField("chgbal13", entity.chgbal13);
         row.SetField("chgbal14", entity.chgbal14);
         row.SetField("chgbal15", entity.chgbal15);
         row.SetField("chgbal16", entity.chgbal16);
         row.SetField("chgbal17", entity.chgbal17);
         row.SetField("chgbal18", entity.chgbal18);
         row.SetField("chgbal19", entity.chgbal19);
         row.SetField("chgbal20", entity.chgbal20);
         row.SetField("errorno", entity.errorno);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("transproc", entity.transproc);
         row.SetField("sasbRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, SasbBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("currproc", entity.currproc);
         row.SetField("enterdt", entity.enterdt);
         row.SetField("entertm", entity.entertm);
         row.SetField("primarykey", entity.primarykey);
         row.SetField("sasbRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	