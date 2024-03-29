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
       
namespace Infor.Sxe.Common.Data.Models.SHARED
{
   /// <summary>
   /// Help File
   /// </summary>
   
   public partial class HlpBase: ModelBase
   {

      /// <summary>
      /// 
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string fieldnm { get; set; }

      /// <summary>
      /// RandD Function
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string ourproc { get; set; }

      /// <summary>
      /// helptext1
      /// </summary>
      [StringValidationAttribute]
      public string helptext1 { get; set; }
      [StringValidationAttribute]
      public string helptext2 { get; set; }
      [StringValidationAttribute]
      public string helptext3 { get; set; }
      [StringValidationAttribute]
      public string helptext4 { get; set; }
      [StringValidationAttribute]
      public string helptext5 { get; set; }
      [StringValidationAttribute]
      public string helptext6 { get; set; }
      [StringValidationAttribute]
      public string helptext7 { get; set; }
      [StringValidationAttribute]
      public string helptext8 { get; set; }
      [StringValidationAttribute]
      public string helptext9 { get; set; }
      [StringValidationAttribute]
      public string helptext10 { get; set; }

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
      public static T BuildHlpBaseFromRow<T>(DataRow row) where T:HlpBase, new()
      {
         T entity = new T();
         entity.fieldnm = row.IsNull("fieldnm") ? string.Empty : row.Field<string>("fieldnm");
         entity.ourproc = row.IsNull("ourproc") ? string.Empty : row.Field<string>("ourproc");
         entity.helptext1 = row.IsNull("helptext1") ? string.Empty : row.Field<string>("helptext1");
         entity.helptext2 = row.IsNull("helptext2") ? string.Empty : row.Field<string>("helptext2");
         entity.helptext3 = row.IsNull("helptext3") ? string.Empty : row.Field<string>("helptext3");
         entity.helptext4 = row.IsNull("helptext4") ? string.Empty : row.Field<string>("helptext4");
         entity.helptext5 = row.IsNull("helptext5") ? string.Empty : row.Field<string>("helptext5");
         entity.helptext6 = row.IsNull("helptext6") ? string.Empty : row.Field<string>("helptext6");
         entity.helptext7 = row.IsNull("helptext7") ? string.Empty : row.Field<string>("helptext7");
         entity.helptext8 = row.IsNull("helptext8") ? string.Empty : row.Field<string>("helptext8");
         entity.helptext9 = row.IsNull("helptext9") ? string.Empty : row.Field<string>("helptext9");
         entity.helptext10 = row.IsNull("helptext10") ? string.Empty : row.Field<string>("helptext10");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.rowID = row.Field<byte[]>("hlpRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromHlpBase(ref DataRow row, HlpBase entity)
      {
         row.SetField("fieldnm", entity.fieldnm);
         row.SetField("ourproc", entity.ourproc);
         row.SetField("helptext1", entity.helptext1);
         row.SetField("helptext2", entity.helptext2);
         row.SetField("helptext3", entity.helptext3);
         row.SetField("helptext4", entity.helptext4);
         row.SetField("helptext5", entity.helptext5);
         row.SetField("helptext6", entity.helptext6);
         row.SetField("helptext7", entity.helptext7);
         row.SetField("helptext8", entity.helptext8);
         row.SetField("helptext9", entity.helptext9);
         row.SetField("helptext10", entity.helptext10);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("transproc", entity.transproc);
         row.SetField("hlpRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, HlpBase entity)
      {
         row.SetField("fieldnm", entity.fieldnm);
         row.SetField("ourproc", entity.ourproc);
         row.SetField("hlpRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	