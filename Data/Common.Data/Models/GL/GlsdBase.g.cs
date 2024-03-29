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
   /// GL Automatic Distributions
   /// </summary>
   
   public partial class GlsdBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Group Name
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string groupnm { get; set; }

      /// <summary>
      /// Set #
      /// </summary>
      [Key,Order]
      public int setno { get; set; }

      /// <summary>
      /// Transaction #
      /// </summary>
      [Key,Order]
      public int transno { get; set; }

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Div#
      /// </summary>
      public int gldivno { get; set; }

      /// <summary>
      /// Dept#
      /// </summary>
      public int gldeptno { get; set; }

      /// <summary>
      /// Acct#
      /// </summary>
      public int glacctno { get; set; }

      /// <summary>
      /// Sub#
      /// </summary>
      public int glsubno { get; set; }

      /// <summary>
      /// % of Master Balance
      /// </summary>
      public decimal percent { get; set; }

      /// <summary>
      /// Maximum Amount
      /// </summary>
      public decimal maxamount { get; set; }

      /// <summary>
      /// Opposite
      /// </summary>
      public bool oppositefl { get; set; }

      /// <summary>
      /// Reference
      /// </summary>
      [StringValidationAttribute]
      public string refer { get; set; }

      /// <summary>
      /// Group Type
      /// </summary>
      public bool reversefl { get; set; }

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
      /// Last Change By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

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
      public static T BuildGlsdBaseFromRow<T>(DataRow row) where T:GlsdBase, new()
      {
         T entity = new T();
         entity.groupnm = row.IsNull("groupnm") ? string.Empty : row.Field<string>("groupnm");
         entity.setno = row.IsNull("setno") ? 0 : row.Field<int>("setno");
         entity.transno = row.IsNull("transno") ? 0 : row.Field<int>("transno");
         entity.gldivno = row.IsNull("gldivno") ? 0 : row.Field<int>("gldivno");
         entity.gldeptno = row.IsNull("gldeptno") ? 0 : row.Field<int>("gldeptno");
         entity.glacctno = row.IsNull("glacctno") ? 0 : row.Field<int>("glacctno");
         entity.glsubno = row.IsNull("glsubno") ? 0 : row.Field<int>("glsubno");
         entity.percent = row.IsNull("percent") ? decimal.Zero : row.Field<decimal>("percent");
         entity.maxamount = row.IsNull("maxamount") ? decimal.Zero : row.Field<decimal>("maxamount");
         entity.oppositefl = row.Field<bool>("oppositefl");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.reversefl = row.Field<bool>("reversefl");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
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
         entity.rowID = row.Field<byte[]>("glsdRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlsdBase(ref DataRow row, GlsdBase entity)
      {
         row.SetField("groupnm", entity.groupnm);
         row.SetField("setno", entity.setno);
         row.SetField("transno", entity.transno);
         row.SetField("gldivno", entity.gldivno);
         row.SetField("gldeptno", entity.gldeptno);
         row.SetField("glacctno", entity.glacctno);
         row.SetField("glsubno", entity.glsubno);
         row.SetField("percent", entity.percent);
         row.SetField("maxamount", entity.maxamount);
         row.SetField("oppositefl", entity.oppositefl);
         row.SetField("refer", entity.refer);
         row.SetField("reversefl", entity.reversefl);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("cono", entity.cono);
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
         row.SetField("glsdRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, GlsdBase entity)
      {
         row.SetField("groupnm", entity.groupnm);
         row.SetField("setno", entity.setno);
         row.SetField("transno", entity.transno);
         row.SetField("cono", entity.cono);
         row.SetField("glsdRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	