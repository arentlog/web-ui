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
       
namespace Infor.Sxe.Common.Data.Models.GL
{
   /// <summary>
   /// General Ledger Inquiry Financial Statement
   /// </summary>
   
   public partial class GlifBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Design Name
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string groupnm { get; set; }

      /// <summary>
      /// Job Name
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string reportnm { get; set; }

      /// <summary>
      /// 
      /// </summary>
      [Key,Order]
      public int prtlineno { get; set; }

      /// <summary>
      /// Year
      /// </summary>
      [Key,Order]
      public int yr { get; set; }

      /// <summary>
      /// Period
      /// </summary>
      [Key,Order]
      public int period { get; set; }

      /// <summary>
      /// Ty
      /// </summary>
      [StringValidationAttribute]
      public string recordty { get; set; }

      /// <summary>
      /// prtline
      /// </summary>
      [StringValidationAttribute]
      public string prtline { get; set; }

      /// <summary>
      /// stmtty
      /// </summary>
      [StringValidationAttribute]
      public string stmtty { get; set; }

      /// <summary>
      /// seqlineno
      /// </summary>
      public int seqlineno { get; set; }

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
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildGlifBaseFromRow<T>(DataRow row) where T:GlifBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.groupnm = row.IsNull("groupnm") ? string.Empty : row.Field<string>("groupnm");
         entity.reportnm = row.IsNull("reportnm") ? string.Empty : row.Field<string>("reportnm");
         entity.prtlineno = row.IsNull("prtlineno") ? 0 : row.Field<int>("prtlineno");
         entity.recordty = row.IsNull("recordty") ? string.Empty : row.Field<string>("recordty");
         entity.yr = row.IsNull("yr") ? 0 : row.Field<int>("yr");
         entity.period = row.IsNull("period") ? 0 : row.Field<int>("period");
         entity.prtline = row.IsNull("prtline") ? string.Empty : row.Field<string>("prtline");
         entity.stmtty = row.IsNull("stmtty") ? string.Empty : row.Field<string>("stmtty");
         entity.seqlineno = row.IsNull("seqlineno") ? 0 : row.Field<int>("seqlineno");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowID = row.Field<byte[]>("glifRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlifBase(ref DataRow row, GlifBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("groupnm", entity.groupnm);
         row.SetField("reportnm", entity.reportnm);
         row.SetField("prtlineno", entity.prtlineno);
         row.SetField("recordty", entity.recordty);
         row.SetField("yr", entity.yr);
         row.SetField("period", entity.period);
         row.SetField("prtline", entity.prtline);
         row.SetField("stmtty", entity.stmtty);
         row.SetField("seqlineno", entity.seqlineno);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("glifRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, GlifBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("groupnm", entity.groupnm);
         row.SetField("reportnm", entity.reportnm);
         row.SetField("prtlineno", entity.prtlineno);
         row.SetField("yr", entity.yr);
         row.SetField("period", entity.period);
         row.SetField("glifRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	