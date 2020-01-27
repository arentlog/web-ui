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
       
namespace Infor.Sxe.Common.Data.Models.CM
{
   /// <summary>
   /// R&D Customer Marketing Followup List Generation Specs
   /// </summary>
   
   public partial class CmfusBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Assigned Salesrep
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string slsrep { get; set; }

      /// <summary>
      /// forslsrep
      /// </summary>
      [StringValidationAttribute]
      public string forslsrep { get; set; }

      /// <summary>
      /// begdt
      /// </summary>
      public DateTime? begdt { get; set; }

      /// <summary>
      /// enddt
      /// </summary>
      public DateTime? enddt { get; set; }

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
      public static T BuildCmfusBaseFromRow<T>(DataRow row) where T:CmfusBase, new()
      {
         T entity = new T();
         entity.slsrep = row.IsNull("slsrep") ? string.Empty : row.Field<string>("slsrep");
         entity.forslsrep = row.IsNull("forslsrep") ? string.Empty : row.Field<string>("forslsrep");
         entity.begdt = row.Field<DateTime?>("begdt");
         entity.enddt = row.Field<DateTime?>("enddt");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowID = row.Field<byte[]>("cmfusRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCmfusBase(ref DataRow row, CmfusBase entity)
      {
         row.SetField("slsrep", entity.slsrep);
         row.SetField("forslsrep", entity.forslsrep);
         row.SetField("begdt", entity.begdt);
         row.SetField("enddt", entity.enddt);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("cmfusRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, CmfusBase entity)
      {
         row.SetField("slsrep", entity.slsrep);
         row.SetField("cmfusRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	