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
   /// System Admin Menu Setup
   /// </summary>
   
   public partial class SassmBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Function Name
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string currproc { get; set; }

      /// <summary>
      /// Transl. Mgr Lang
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string trmgrlang { get; set; }

      /// <summary>
      /// Description
      /// </summary>
      [StringValidationAttribute]
      public string frametitle { get; set; }

      /// <summary>
      /// Menu Title
      /// </summary>
      [StringValidationAttribute]
      public string menutitle { get; set; }

      /// <summary>
      /// Execute Function
      /// </summary>
      [StringValidationAttribute]
      public string callproc { get; set; }

      /// <summary>
      /// Exit Function
      /// </summary>
      [StringValidationAttribute]
      public string exitproc { get; set; }

      /// <summary>
      /// This Function is on Menu
      /// </summary>
      [StringValidationAttribute]
      public string menuproc { get; set; }

      /// <summary>
      /// Menu Position
      /// </summary>
      public int menupos { get; set; }

      /// <summary>
      /// Security Position
      /// </summary>
      public int securpos { get; set; }

      /// <summary>
      /// Last Updated By
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
      /// Ring Title
      /// </summary>
      [StringValidationAttribute]
      public string ringtitle { get; set; }

      /// <summary>
      /// O/S Function
      /// </summary>
      [StringValidationAttribute]
      public string osproc { get; set; }

      /// <summary>
      /// RandD Function
      /// </summary>
      [StringValidationAttribute]
      public string ourproc { get; set; }

      /// <summary>
      /// Standard
      /// </summary>
      [StringValidationAttribute]
      public string standardty { get; set; }

      /// <summary>
      /// GG Info File
      /// </summary>
      [StringValidationAttribute]
      public string gginfo { get; set; }

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
      /// Function Type
      /// </summary>
      [StringValidationAttribute]
      public string functy { get; set; }

      /// <summary>
      /// Inquiry Procedure
      /// </summary>
      [StringValidationAttribute]
      public string inqproc1 { get; set; }
      [StringValidationAttribute]
      public string inqproc2 { get; set; }
      [StringValidationAttribute]
      public string inqproc3 { get; set; }
      [StringValidationAttribute]
      public string inqproc4 { get; set; }
      [StringValidationAttribute]
      public string inqproc5 { get; set; }
      [StringValidationAttribute]
      public string inqproc6 { get; set; }
      [StringValidationAttribute]
      public string inqproc7 { get; set; }

      /// <summary>
      /// Inquiry Title
      /// </summary>
      [StringValidationAttribute]
      public string inqtitle1 { get; set; }
      [StringValidationAttribute]
      public string inqtitle2 { get; set; }
      [StringValidationAttribute]
      public string inqtitle3 { get; set; }
      [StringValidationAttribute]
      public string inqtitle4 { get; set; }
      [StringValidationAttribute]
      public string inqtitle5 { get; set; }
      [StringValidationAttribute]
      public string inqtitle6 { get; set; }
      [StringValidationAttribute]
      public string inqtitle7 { get; set; }

      /// <summary>
      /// Inquiry Type
      /// </summary>
      [StringValidationAttribute]
      public string inqtype1 { get; set; }
      [StringValidationAttribute]
      public string inqtype2 { get; set; }
      [StringValidationAttribute]
      public string inqtype3 { get; set; }
      [StringValidationAttribute]
      public string inqtype4 { get; set; }
      [StringValidationAttribute]
      public string inqtype5 { get; set; }
      [StringValidationAttribute]
      public string inqtype6 { get; set; }
      [StringValidationAttribute]
      public string inqtype7 { get; set; }

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
      public static T BuildSassmBaseFromRow<T>(DataRow row) where T:SassmBase, new()
      {
         T entity = new T();
         entity.currproc = row.IsNull("currproc") ? string.Empty : row.Field<string>("currproc");
         entity.frametitle = row.IsNull("frametitle") ? string.Empty : row.Field<string>("frametitle");
         entity.menutitle = row.IsNull("menutitle") ? string.Empty : row.Field<string>("menutitle");
         entity.callproc = row.IsNull("callproc") ? string.Empty : row.Field<string>("callproc");
         entity.exitproc = row.IsNull("exitproc") ? string.Empty : row.Field<string>("exitproc");
         entity.menuproc = row.IsNull("menuproc") ? string.Empty : row.Field<string>("menuproc");
         entity.menupos = row.IsNull("menupos") ? 0 : row.Field<int>("menupos");
         entity.securpos = row.IsNull("securpos") ? 0 : row.Field<int>("securpos");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.ringtitle = row.IsNull("ringtitle") ? string.Empty : row.Field<string>("ringtitle");
         entity.osproc = row.IsNull("osproc") ? string.Empty : row.Field<string>("osproc");
         entity.ourproc = row.IsNull("ourproc") ? string.Empty : row.Field<string>("ourproc");
         entity.standardty = row.IsNull("standardty") ? string.Empty : row.Field<string>("standardty");
         entity.gginfo = row.IsNull("gginfo") ? string.Empty : row.Field<string>("gginfo");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.functy = row.IsNull("functy") ? string.Empty : row.Field<string>("functy");
         entity.inqproc1 = row.IsNull("inqproc1") ? string.Empty : row.Field<string>("inqproc1");
         entity.inqproc2 = row.IsNull("inqproc2") ? string.Empty : row.Field<string>("inqproc2");
         entity.inqproc3 = row.IsNull("inqproc3") ? string.Empty : row.Field<string>("inqproc3");
         entity.inqproc4 = row.IsNull("inqproc4") ? string.Empty : row.Field<string>("inqproc4");
         entity.inqproc5 = row.IsNull("inqproc5") ? string.Empty : row.Field<string>("inqproc5");
         entity.inqproc6 = row.IsNull("inqproc6") ? string.Empty : row.Field<string>("inqproc6");
         entity.inqproc7 = row.IsNull("inqproc7") ? string.Empty : row.Field<string>("inqproc7");
         entity.inqtitle1 = row.IsNull("inqtitle1") ? string.Empty : row.Field<string>("inqtitle1");
         entity.inqtitle2 = row.IsNull("inqtitle2") ? string.Empty : row.Field<string>("inqtitle2");
         entity.inqtitle3 = row.IsNull("inqtitle3") ? string.Empty : row.Field<string>("inqtitle3");
         entity.inqtitle4 = row.IsNull("inqtitle4") ? string.Empty : row.Field<string>("inqtitle4");
         entity.inqtitle5 = row.IsNull("inqtitle5") ? string.Empty : row.Field<string>("inqtitle5");
         entity.inqtitle6 = row.IsNull("inqtitle6") ? string.Empty : row.Field<string>("inqtitle6");
         entity.inqtitle7 = row.IsNull("inqtitle7") ? string.Empty : row.Field<string>("inqtitle7");
         entity.inqtype1 = row.IsNull("inqtype1") ? string.Empty : row.Field<string>("inqtype1");
         entity.inqtype2 = row.IsNull("inqtype2") ? string.Empty : row.Field<string>("inqtype2");
         entity.inqtype3 = row.IsNull("inqtype3") ? string.Empty : row.Field<string>("inqtype3");
         entity.inqtype4 = row.IsNull("inqtype4") ? string.Empty : row.Field<string>("inqtype4");
         entity.inqtype5 = row.IsNull("inqtype5") ? string.Empty : row.Field<string>("inqtype5");
         entity.inqtype6 = row.IsNull("inqtype6") ? string.Empty : row.Field<string>("inqtype6");
         entity.inqtype7 = row.IsNull("inqtype7") ? string.Empty : row.Field<string>("inqtype7");
         entity.trmgrlang = row.IsNull("trmgrlang") ? string.Empty : row.Field<string>("trmgrlang");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.rowID = row.Field<byte[]>("sassmRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSassmBase(ref DataRow row, SassmBase entity)
      {
         row.SetField("currproc", entity.currproc);
         row.SetField("frametitle", entity.frametitle);
         row.SetField("menutitle", entity.menutitle);
         row.SetField("callproc", entity.callproc);
         row.SetField("exitproc", entity.exitproc);
         row.SetField("menuproc", entity.menuproc);
         row.SetField("menupos", entity.menupos);
         row.SetField("securpos", entity.securpos);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("ringtitle", entity.ringtitle);
         row.SetField("osproc", entity.osproc);
         row.SetField("ourproc", entity.ourproc);
         row.SetField("standardty", entity.standardty);
         row.SetField("gginfo", entity.gginfo);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("functy", entity.functy);
         row.SetField("inqproc1", entity.inqproc1);
         row.SetField("inqproc2", entity.inqproc2);
         row.SetField("inqproc3", entity.inqproc3);
         row.SetField("inqproc4", entity.inqproc4);
         row.SetField("inqproc5", entity.inqproc5);
         row.SetField("inqproc6", entity.inqproc6);
         row.SetField("inqproc7", entity.inqproc7);
         row.SetField("inqtitle1", entity.inqtitle1);
         row.SetField("inqtitle2", entity.inqtitle2);
         row.SetField("inqtitle3", entity.inqtitle3);
         row.SetField("inqtitle4", entity.inqtitle4);
         row.SetField("inqtitle5", entity.inqtitle5);
         row.SetField("inqtitle6", entity.inqtitle6);
         row.SetField("inqtitle7", entity.inqtitle7);
         row.SetField("inqtype1", entity.inqtype1);
         row.SetField("inqtype2", entity.inqtype2);
         row.SetField("inqtype3", entity.inqtype3);
         row.SetField("inqtype4", entity.inqtype4);
         row.SetField("inqtype5", entity.inqtype5);
         row.SetField("inqtype6", entity.inqtype6);
         row.SetField("inqtype7", entity.inqtype7);
         row.SetField("trmgrlang", entity.trmgrlang);
         row.SetField("transproc", entity.transproc);
         row.SetField("sassmRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, SassmBase entity)
      {
         row.SetField("currproc", entity.currproc);
         row.SetField("trmgrlang", entity.trmgrlang);
         row.SetField("sassmRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	