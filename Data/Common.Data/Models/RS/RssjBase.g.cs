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
       
namespace Infor.Sxe.Common.Data.Models.RS
{
   /// <summary>
   /// Job Group Header File
   /// </summary>
   
   public partial class RssjBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Job Group
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string groupnm { get; set; }

      /// <summary>
      /// Description
      /// </summary>
      [StringValidationAttribute]
      public string jobdesc { get; set; }

      /// <summary>
      /// Last Change Dt
      /// </summary>
      public DateTime? transdt { get; set; }

      /// <summary>
      /// Last Trans Tm
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
      /// Start Date
      /// </summary>
      public DateTime? startdt { get; set; }

      /// <summary>
      /// Start Time
      /// </summary>
      public int starttm { get; set; }

      /// <summary>
      /// Start Type
      /// </summary>
      [StringValidationAttribute]
      public string starttype { get; set; }

      /// <summary>
      /// Run Type
      /// </summary>
      [StringValidationAttribute]
      public string runty { get; set; }

      /// <summary>
      /// Interval
      /// </summary>
      public int interval { get; set; }

      /// <summary>
      /// Last Run Date
      /// </summary>
      public DateTime? lastrundt { get; set; }

      /// <summary>
      /// Last Run Time
      /// </summary>
      [StringValidationAttribute]
      public string lastruntm { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// Day Start Time
      /// </summary>
      public int jobstarttm { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildRssjBaseFromRow<T>(DataRow row) where T:RssjBase, new()
      {
         T entity = new T();
         entity.groupnm = row.IsNull("groupnm") ? string.Empty : row.Field<string>("groupnm");
         entity.jobdesc = row.IsNull("jobdesc") ? string.Empty : row.Field<string>("jobdesc");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
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
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.starttm = row.IsNull("starttm") ? 0 : row.Field<int>("starttm");
         entity.starttype = row.IsNull("starttype") ? string.Empty : row.Field<string>("starttype");
         entity.runty = row.IsNull("runty") ? string.Empty : row.Field<string>("runty");
         entity.interval = row.IsNull("interval") ? 0 : row.Field<int>("interval");
         entity.lastrundt = row.Field<DateTime?>("lastrundt");
         entity.lastruntm = row.IsNull("lastruntm") ? string.Empty : row.Field<string>("lastruntm");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.jobstarttm = row.IsNull("jobstarttm") ? 0 : row.Field<int>("jobstarttm");
         entity.rowID = row.Field<byte[]>("rssjRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromRssjBase(ref DataRow row, RssjBase entity)
      {
         row.SetField("groupnm", entity.groupnm);
         row.SetField("jobdesc", entity.jobdesc);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
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
         row.SetField("startdt", entity.startdt);
         row.SetField("starttm", entity.starttm);
         row.SetField("starttype", entity.starttype);
         row.SetField("runty", entity.runty);
         row.SetField("interval", entity.interval);
         row.SetField("lastrundt", entity.lastrundt);
         row.SetField("lastruntm", entity.lastruntm);
         row.SetField("transproc", entity.transproc);
         row.SetField("jobstarttm", entity.jobstarttm);
         row.SetField("rssjRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, RssjBase entity)
      {
         row.SetField("groupnm", entity.groupnm);
         row.SetField("rssjRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	