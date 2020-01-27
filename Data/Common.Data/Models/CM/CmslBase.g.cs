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
   /// R&D (C/M Correspondence)
   /// </summary>
   
   public partial class CmslBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Correspondence
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string lettercd { get; set; }

      /// <summary>
      /// Description
      /// </summary>
      [StringValidationAttribute]
      public string description { get; set; }

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
      /// Note Line
      /// </summary>
      [StringValidationAttribute]
      public string noteln1 { get; set; }
      [StringValidationAttribute]
      public string noteln2 { get; set; }
      [StringValidationAttribute]
      public string noteln3 { get; set; }
      [StringValidationAttribute]
      public string noteln4 { get; set; }
      [StringValidationAttribute]
      public string noteln5 { get; set; }
      [StringValidationAttribute]
      public string noteln6 { get; set; }
      [StringValidationAttribute]
      public string noteln7 { get; set; }
      [StringValidationAttribute]
      public string noteln8 { get; set; }
      [StringValidationAttribute]
      public string noteln9 { get; set; }
      [StringValidationAttribute]
      public string noteln10 { get; set; }
      [StringValidationAttribute]
      public string noteln11 { get; set; }
      [StringValidationAttribute]
      public string noteln12 { get; set; }
      [StringValidationAttribute]
      public string noteln13 { get; set; }
      [StringValidationAttribute]
      public string noteln14 { get; set; }
      [StringValidationAttribute]
      public string noteln15 { get; set; }
      [StringValidationAttribute]
      public string noteln16 { get; set; }
      [StringValidationAttribute]
      public string noteln17 { get; set; }
      [StringValidationAttribute]
      public string noteln18 { get; set; }

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
      public static T BuildCmslBaseFromRow<T>(DataRow row) where T:CmslBase, new()
      {
         T entity = new T();
         entity.lettercd = row.IsNull("lettercd") ? string.Empty : row.Field<string>("lettercd");
         entity.description = row.IsNull("description") ? string.Empty : row.Field<string>("description");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.noteln1 = row.IsNull("noteln1") ? string.Empty : row.Field<string>("noteln1");
         entity.noteln2 = row.IsNull("noteln2") ? string.Empty : row.Field<string>("noteln2");
         entity.noteln3 = row.IsNull("noteln3") ? string.Empty : row.Field<string>("noteln3");
         entity.noteln4 = row.IsNull("noteln4") ? string.Empty : row.Field<string>("noteln4");
         entity.noteln5 = row.IsNull("noteln5") ? string.Empty : row.Field<string>("noteln5");
         entity.noteln6 = row.IsNull("noteln6") ? string.Empty : row.Field<string>("noteln6");
         entity.noteln7 = row.IsNull("noteln7") ? string.Empty : row.Field<string>("noteln7");
         entity.noteln8 = row.IsNull("noteln8") ? string.Empty : row.Field<string>("noteln8");
         entity.noteln9 = row.IsNull("noteln9") ? string.Empty : row.Field<string>("noteln9");
         entity.noteln10 = row.IsNull("noteln10") ? string.Empty : row.Field<string>("noteln10");
         entity.noteln11 = row.IsNull("noteln11") ? string.Empty : row.Field<string>("noteln11");
         entity.noteln12 = row.IsNull("noteln12") ? string.Empty : row.Field<string>("noteln12");
         entity.noteln13 = row.IsNull("noteln13") ? string.Empty : row.Field<string>("noteln13");
         entity.noteln14 = row.IsNull("noteln14") ? string.Empty : row.Field<string>("noteln14");
         entity.noteln15 = row.IsNull("noteln15") ? string.Empty : row.Field<string>("noteln15");
         entity.noteln16 = row.IsNull("noteln16") ? string.Empty : row.Field<string>("noteln16");
         entity.noteln17 = row.IsNull("noteln17") ? string.Empty : row.Field<string>("noteln17");
         entity.noteln18 = row.IsNull("noteln18") ? string.Empty : row.Field<string>("noteln18");
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
         entity.rowID = row.Field<byte[]>("cmslRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCmslBase(ref DataRow row, CmslBase entity)
      {
         row.SetField("lettercd", entity.lettercd);
         row.SetField("description", entity.description);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("noteln1", entity.noteln1);
         row.SetField("noteln2", entity.noteln2);
         row.SetField("noteln3", entity.noteln3);
         row.SetField("noteln4", entity.noteln4);
         row.SetField("noteln5", entity.noteln5);
         row.SetField("noteln6", entity.noteln6);
         row.SetField("noteln7", entity.noteln7);
         row.SetField("noteln8", entity.noteln8);
         row.SetField("noteln9", entity.noteln9);
         row.SetField("noteln10", entity.noteln10);
         row.SetField("noteln11", entity.noteln11);
         row.SetField("noteln12", entity.noteln12);
         row.SetField("noteln13", entity.noteln13);
         row.SetField("noteln14", entity.noteln14);
         row.SetField("noteln15", entity.noteln15);
         row.SetField("noteln16", entity.noteln16);
         row.SetField("noteln17", entity.noteln17);
         row.SetField("noteln18", entity.noteln18);
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
         row.SetField("cmslRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, CmslBase entity)
      {
         row.SetField("lettercd", entity.lettercd);
         row.SetField("cmslRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	