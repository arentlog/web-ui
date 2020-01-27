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
   /// R&D Telemarketing Report List temporary file
   /// </summary>
   
   public partial class CmrpBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Prospect #
      /// </summary>
      public decimal prosno { get; set; }

      /// <summary>
      /// Product #
      /// </summary>
      [StringValidationAttribute]
      public string prod { get; set; }

      /// <summary>
      /// Proposal #
      /// </summary>
      public decimal proposalno { get; set; }

      /// <summary>
      /// Contact
      /// </summary>
      [StringValidationAttribute]
      public string name { get; set; }

      /// <summary>
      /// Salesrep
      /// </summary>
      [StringValidationAttribute]
      public string slsrep { get; set; }

      /// <summary>
      /// schstartdt
      /// </summary>
      public DateTime? schstartdt { get; set; }

      /// <summary>
      /// schstarttm
      /// </summary>
      [StringValidationAttribute]
      public string schstarttm { get; set; }

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
      [Key,StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildCmrpBaseFromRow<T>(DataRow row) where T:CmrpBase, new()
      {
         T entity = new T();
         entity.prosno = row.IsNull("prosno") ? decimal.Zero : row.Field<decimal>("prosno");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.proposalno = row.IsNull("proposalno") ? decimal.Zero : row.Field<decimal>("proposalno");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.slsrep = row.IsNull("slsrep") ? string.Empty : row.Field<string>("slsrep");
         entity.schstartdt = row.Field<DateTime?>("schstartdt");
         entity.schstarttm = row.IsNull("schstarttm") ? string.Empty : row.Field<string>("schstarttm");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowID = row.Field<byte[]>("cmrpRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCmrpBase(ref DataRow row, CmrpBase entity)
      {
         row.SetField("prosno", entity.prosno);
         row.SetField("prod", entity.prod);
         row.SetField("proposalno", entity.proposalno);
         row.SetField("name", entity.name);
         row.SetField("slsrep", entity.slsrep);
         row.SetField("schstartdt", entity.schstartdt);
         row.SetField("schstarttm", entity.schstarttm);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("cmrpRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, CmrpBase entity)
      {
         row.SetField("cmrpRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	