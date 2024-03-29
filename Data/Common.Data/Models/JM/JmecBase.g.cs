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
       
namespace Infor.Sxe.Common.Data.Models.JM
{
   /// <summary>
   /// Job Management Entry Change Order Request
   /// </summary>
   
   public partial class JmecBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Job Identifier
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string jobid { get; set; }

      /// <summary>
      /// Revision #
      /// </summary>
      [Key,Order]
      public int jobrevno { get; set; }

      /// <summary>
      /// Change Request #
      /// </summary>
      [Key,Order]
      public int changereqno { get; set; }

      /// <summary>
      /// Status Type
      /// </summary>
      [StringValidationAttribute]
      public string statustype { get; set; }

      /// <summary>
      /// Open Initials
      /// </summary>
      [StringValidationAttribute]
      public string openinit { get; set; }

      /// <summary>
      /// Create Date
      /// </summary>
      public DateTime? createdt { get; set; }

      /// <summary>
      /// Cancel Date
      /// </summary>
      public DateTime? canceldt { get; set; }

      /// <summary>
      /// Approval Date
      /// </summary>
      public DateTime? apprdt { get; set; }

      /// <summary>
      /// Complete Date
      /// </summary>
      public DateTime? completedt { get; set; }

      /// <summary>
      /// Customer Approval Name
      /// </summary>
      [StringValidationAttribute]
      public string apprcustname { get; set; }

      /// <summary>
      /// Internal Approval Name
      /// </summary>
      [StringValidationAttribute]
      public string apprintrname { get; set; }

      /// <summary>
      /// Approval Description
      /// </summary>
      [StringValidationAttribute]
      public string apprdesc { get; set; }

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
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildJmecBaseFromRow<T>(DataRow row) where T:JmecBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.jobid = row.IsNull("jobid") ? string.Empty : row.Field<string>("jobid");
         entity.jobrevno = row.IsNull("jobrevno") ? 0 : row.Field<int>("jobrevno");
         entity.changereqno = row.IsNull("changereqno") ? 0 : row.Field<int>("changereqno");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.openinit = row.IsNull("openinit") ? string.Empty : row.Field<string>("openinit");
         entity.createdt = row.Field<DateTime?>("createdt");
         entity.canceldt = row.Field<DateTime?>("canceldt");
         entity.apprdt = row.Field<DateTime?>("apprdt");
         entity.completedt = row.Field<DateTime?>("completedt");
         entity.apprcustname = row.IsNull("apprcustname") ? string.Empty : row.Field<string>("apprcustname");
         entity.apprintrname = row.IsNull("apprintrname") ? string.Empty : row.Field<string>("apprintrname");
         entity.apprdesc = row.IsNull("apprdesc") ? string.Empty : row.Field<string>("apprdesc");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowID = row.Field<byte[]>("jmecRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromJmecBase(ref DataRow row, JmecBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("jobid", entity.jobid);
         row.SetField("jobrevno", entity.jobrevno);
         row.SetField("changereqno", entity.changereqno);
         row.SetField("statustype", entity.statustype);
         row.SetField("openinit", entity.openinit);
         row.SetField("createdt", entity.createdt);
         row.SetField("canceldt", entity.canceldt);
         row.SetField("apprdt", entity.apprdt);
         row.SetField("completedt", entity.completedt);
         row.SetField("apprcustname", entity.apprcustname);
         row.SetField("apprintrname", entity.apprintrname);
         row.SetField("apprdesc", entity.apprdesc);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("transproc", entity.transproc);
         row.SetField("operinit", entity.operinit);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("jmecRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, JmecBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("jobid", entity.jobid);
         row.SetField("jobrevno", entity.jobrevno);
         row.SetField("changereqno", entity.changereqno);
         row.SetField("jmecRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	