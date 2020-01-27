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
       
namespace Infor.Sxe.Common.Data.Models.SW
{
   /// <summary>
   /// Weekly schedule information for a technician.   
   /// </summary>
   
   public partial class SwsssBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Technician
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string tech { get; set; }

      /// <summary>
      /// Week Start Date
      /// </summary>
      [Key,Order]
      public DateTime? wkstartdt { get; set; }

      /// <summary>
      /// Lunch Hours
      /// </summary>
      public decimal lunchhrs { get; set; }

      /// <summary>
      /// OT Code
      /// </summary>
      [StringValidationAttribute]
      public string ottype { get; set; }

      /// <summary>
      /// Function Name
      /// </summary>
      [StringValidationAttribute]
      public string ourproc { get; set; }

      /// <summary>
      /// Rate Adjustment Code Option
      /// </summary>
      [StringValidationAttribute]
      public string ratetype1 { get; set; }
      [StringValidationAttribute]
      public string ratetype2 { get; set; }
      [StringValidationAttribute]
      public string ratetype3 { get; set; }
      [StringValidationAttribute]
      public string ratetype4 { get; set; }
      [StringValidationAttribute]
      public string ratetype5 { get; set; }
      [StringValidationAttribute]
      public string ratetype6 { get; set; }
      [StringValidationAttribute]
      public string ratetype7 { get; set; }
      [StringValidationAttribute]
      public string ratetype8 { get; set; }
      [StringValidationAttribute]
      public string ratetype9 { get; set; }

      /// <summary>
      /// Authorized Rate Option
      /// </summary>
      public bool ratetypefl1 { get; set; }
      public bool ratetypefl2 { get; set; }
      public bool ratetypefl3 { get; set; }
      public bool ratetypefl4 { get; set; }
      public bool ratetypefl5 { get; set; }
      public bool ratetypefl6 { get; set; }
      public bool ratetypefl7 { get; set; }
      public bool ratetypefl8 { get; set; }
      public bool ratetypefl9 { get; set; }

      /// <summary>
      /// Shift
      /// </summary>
      public int shift { get; set; }

      /// <summary>
      /// Shift Per Day
      /// </summary>
      public int shiftday1 { get; set; }
      public int shiftday2 { get; set; }
      public int shiftday3 { get; set; }
      public int shiftday4 { get; set; }
      public int shiftday5 { get; set; }
      public int shiftday6 { get; set; }
      public int shiftday7 { get; set; }

      /// <summary>
      /// Shift End Time
      /// </summary>
      [StringValidationAttribute]
      public string shiftendtm { get; set; }

      /// <summary>
      /// Shift Hours
      /// </summary>
      public decimal shifthrs { get; set; }

      /// <summary>
      /// Shift Start Time
      /// </summary>
      [StringValidationAttribute]
      public string shiftstarttm { get; set; }

      /// <summary>
      /// Whse Per Day
      /// </summary>
      [StringValidationAttribute]
      public string whseday1 { get; set; }
      [StringValidationAttribute]
      public string whseday2 { get; set; }
      [StringValidationAttribute]
      public string whseday3 { get; set; }
      [StringValidationAttribute]
      public string whseday4 { get; set; }
      [StringValidationAttribute]
      public string whseday5 { get; set; }
      [StringValidationAttribute]
      public string whseday6 { get; set; }
      [StringValidationAttribute]
      public string whseday7 { get; set; }

      /// <summary>
      /// Last Change Dt
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
      /// Day Start Time
      /// </summary>
      [StringValidationAttribute]
      public string daystarttm { get; set; }

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
      public static T BuildSwsssBaseFromRow<T>(DataRow row) where T:SwsssBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.lunchhrs = row.IsNull("lunchhrs") ? decimal.Zero : row.Field<decimal>("lunchhrs");
         entity.ottype = row.IsNull("ottype") ? string.Empty : row.Field<string>("ottype");
         entity.ourproc = row.IsNull("ourproc") ? string.Empty : row.Field<string>("ourproc");
         entity.ratetype1 = row.IsNull("ratetype1") ? string.Empty : row.Field<string>("ratetype1");
         entity.ratetype2 = row.IsNull("ratetype2") ? string.Empty : row.Field<string>("ratetype2");
         entity.ratetype3 = row.IsNull("ratetype3") ? string.Empty : row.Field<string>("ratetype3");
         entity.ratetype4 = row.IsNull("ratetype4") ? string.Empty : row.Field<string>("ratetype4");
         entity.ratetype5 = row.IsNull("ratetype5") ? string.Empty : row.Field<string>("ratetype5");
         entity.ratetype6 = row.IsNull("ratetype6") ? string.Empty : row.Field<string>("ratetype6");
         entity.ratetype7 = row.IsNull("ratetype7") ? string.Empty : row.Field<string>("ratetype7");
         entity.ratetype8 = row.IsNull("ratetype8") ? string.Empty : row.Field<string>("ratetype8");
         entity.ratetype9 = row.IsNull("ratetype9") ? string.Empty : row.Field<string>("ratetype9");
         entity.ratetypefl1 = row.Field<bool>("ratetypefl1");
         entity.ratetypefl2 = row.Field<bool>("ratetypefl2");
         entity.ratetypefl3 = row.Field<bool>("ratetypefl3");
         entity.ratetypefl4 = row.Field<bool>("ratetypefl4");
         entity.ratetypefl5 = row.Field<bool>("ratetypefl5");
         entity.ratetypefl6 = row.Field<bool>("ratetypefl6");
         entity.ratetypefl7 = row.Field<bool>("ratetypefl7");
         entity.ratetypefl8 = row.Field<bool>("ratetypefl8");
         entity.ratetypefl9 = row.Field<bool>("ratetypefl9");
         entity.shift = row.IsNull("shift") ? 0 : row.Field<int>("shift");
         entity.shiftday1 = row.IsNull("shiftday1") ? 0 : row.Field<int>("shiftday1");
         entity.shiftday2 = row.IsNull("shiftday2") ? 0 : row.Field<int>("shiftday2");
         entity.shiftday3 = row.IsNull("shiftday3") ? 0 : row.Field<int>("shiftday3");
         entity.shiftday4 = row.IsNull("shiftday4") ? 0 : row.Field<int>("shiftday4");
         entity.shiftday5 = row.IsNull("shiftday5") ? 0 : row.Field<int>("shiftday5");
         entity.shiftday6 = row.IsNull("shiftday6") ? 0 : row.Field<int>("shiftday6");
         entity.shiftday7 = row.IsNull("shiftday7") ? 0 : row.Field<int>("shiftday7");
         entity.shiftendtm = row.IsNull("shiftendtm") ? string.Empty : row.Field<string>("shiftendtm");
         entity.shifthrs = row.IsNull("shifthrs") ? decimal.Zero : row.Field<decimal>("shifthrs");
         entity.shiftstarttm = row.IsNull("shiftstarttm") ? string.Empty : row.Field<string>("shiftstarttm");
         entity.tech = row.IsNull("tech") ? string.Empty : row.Field<string>("tech");
         entity.whseday1 = row.IsNull("whseday1") ? string.Empty : row.Field<string>("whseday1");
         entity.whseday2 = row.IsNull("whseday2") ? string.Empty : row.Field<string>("whseday2");
         entity.whseday3 = row.IsNull("whseday3") ? string.Empty : row.Field<string>("whseday3");
         entity.whseday4 = row.IsNull("whseday4") ? string.Empty : row.Field<string>("whseday4");
         entity.whseday5 = row.IsNull("whseday5") ? string.Empty : row.Field<string>("whseday5");
         entity.whseday6 = row.IsNull("whseday6") ? string.Empty : row.Field<string>("whseday6");
         entity.whseday7 = row.IsNull("whseday7") ? string.Empty : row.Field<string>("whseday7");
         entity.wkstartdt = row.Field<DateTime?>("wkstartdt");
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
         entity.daystarttm = row.IsNull("daystarttm") ? string.Empty : row.Field<string>("daystarttm");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.rowID = row.Field<byte[]>("swsssRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSwsssBase(ref DataRow row, SwsssBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("lunchhrs", entity.lunchhrs);
         row.SetField("ottype", entity.ottype);
         row.SetField("ourproc", entity.ourproc);
         row.SetField("ratetype1", entity.ratetype1);
         row.SetField("ratetype2", entity.ratetype2);
         row.SetField("ratetype3", entity.ratetype3);
         row.SetField("ratetype4", entity.ratetype4);
         row.SetField("ratetype5", entity.ratetype5);
         row.SetField("ratetype6", entity.ratetype6);
         row.SetField("ratetype7", entity.ratetype7);
         row.SetField("ratetype8", entity.ratetype8);
         row.SetField("ratetype9", entity.ratetype9);
         row.SetField("ratetypefl1", entity.ratetypefl1);
         row.SetField("ratetypefl2", entity.ratetypefl2);
         row.SetField("ratetypefl3", entity.ratetypefl3);
         row.SetField("ratetypefl4", entity.ratetypefl4);
         row.SetField("ratetypefl5", entity.ratetypefl5);
         row.SetField("ratetypefl6", entity.ratetypefl6);
         row.SetField("ratetypefl7", entity.ratetypefl7);
         row.SetField("ratetypefl8", entity.ratetypefl8);
         row.SetField("ratetypefl9", entity.ratetypefl9);
         row.SetField("shift", entity.shift);
         row.SetField("shiftday1", entity.shiftday1);
         row.SetField("shiftday2", entity.shiftday2);
         row.SetField("shiftday3", entity.shiftday3);
         row.SetField("shiftday4", entity.shiftday4);
         row.SetField("shiftday5", entity.shiftday5);
         row.SetField("shiftday6", entity.shiftday6);
         row.SetField("shiftday7", entity.shiftday7);
         row.SetField("shiftendtm", entity.shiftendtm);
         row.SetField("shifthrs", entity.shifthrs);
         row.SetField("shiftstarttm", entity.shiftstarttm);
         row.SetField("tech", entity.tech);
         row.SetField("whseday1", entity.whseday1);
         row.SetField("whseday2", entity.whseday2);
         row.SetField("whseday3", entity.whseday3);
         row.SetField("whseday4", entity.whseday4);
         row.SetField("whseday5", entity.whseday5);
         row.SetField("whseday6", entity.whseday6);
         row.SetField("whseday7", entity.whseday7);
         row.SetField("wkstartdt", entity.wkstartdt);
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
         row.SetField("daystarttm", entity.daystarttm);
         row.SetField("transproc", entity.transproc);
         row.SetField("swsssRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, SwsssBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("tech", entity.tech);
         row.SetField("wkstartdt", entity.wkstartdt);
         row.SetField("swsssRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	